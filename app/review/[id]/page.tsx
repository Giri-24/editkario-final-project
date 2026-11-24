"use client";

import React, { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { formatSeconds } from "@/lib/utils";
import { AgencyProject, CommentPin } from "@/types";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  MessageSquare,
  CheckCircle2,
  Download,
  ArrowLeft,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function DynamicClientReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<AgencyProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRevisionIndex, setActiveRevisionIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(32);
  const [comments, setComments] = useState<CommentPin[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [pendingPinCoords, setPendingPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isSendingComment, setIsSendingComment] = useState(false);

  // Dynamic fetch project from API
  const fetchProjectData = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (data.success && data.project) {
        setProject(data.project);
        if (data.project.revisions?.length > 0) {
          setComments(data.project.revisions[activeRevisionIndex]?.comments || []);
          setDuration(data.project.revisions[activeRevisionIndex]?.durationSeconds || 32);
        }
        if (data.project.status === "APPROVED") {
          setIsApproved(true);
        }
      }
    } catch (e) {
      console.error("Failed to load dynamic project", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [id, activeRevisionIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const stepFrame = (frames: number) => {
    if (!videoRef.current) return;
    const frameDuration = 1 / 30;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(duration, videoRef.current.currentTime + frames * frameDuration)
    );
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setPendingPinCoords({ x, y });
  };

  // Dynamic comment submission to backend
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || isSendingComment) return;

    setIsSendingComment(true);
    try {
      const res = await fetch(`/api/projects/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: project?.clientName || "Client Reviewer",
          timestampSeconds: currentTime,
          content: newCommentText.trim(),
          coords: pendingPinCoords || { x: 50, y: 50 },
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setComments((prev) => [...prev, data.comment]);
        setNewCommentText("");
        setPendingPinCoords(null);
      }
    } catch (err) {
      console.error("Failed to post dynamic comment", err);
    } finally {
      setIsSendingComment(false);
    }
  };

  // Dynamic resolve toggle
  const toggleResolveComment = async (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, isResolved: !c.isResolved } : c))
    );

    try {
      await fetch(`/api/projects/${id}/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
    } catch (err) {
      console.error("Failed to toggle resolve", err);
    }
  };

  // Dynamic project approval
  const handleApprove = async () => {
    setIsApproved(true);
    try {
      await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });
    } catch (err) {
      console.error("Failed to approve project", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-sm">Loading dynamic review studio...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white p-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The requested dynamic review room does not exist.</p>
        <Link href="/" className="px-6 py-2.5 rounded-xl bg-primary text-xs font-bold">
          Return to Agency Home
        </Link>
      </div>
    );
  }

  const currentRevision = project.revisions[activeRevisionIndex] || project.revisions[0];

  return (
    <div className="min-h-screen bg-background text-gray-200 flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {project.title}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Live Room #{project.id}
              </span>
            </h1>
            <div className="text-[11px] text-gray-400">
              Client: <span className="text-gray-300">{project.clientName}</span> ({project.clientCompany}) • Editor:{" "}
              <span className="text-gray-300">{project.assignedEditor?.name || "Marcus Vance"}</span>
            </div>
          </div>
        </div>

        {/* Revision Selector & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-card rounded-xl p-1 border border-white/10">
            {project.revisions?.map((rev, idx) => (
              <button
                key={rev.id}
                onClick={() => setActiveRevisionIndex(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeRevisionIndex === idx
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                v{rev.versionNumber}
              </button>
            ))}
          </div>

          {isApproved ? (
            <div className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Approved for Final Delivery
            </div>
          ) : (
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve Revision
            </button>
          )}

          <Link
            href="/pipeline"
            className="px-3 py-2 rounded-xl glass-card text-xs font-medium text-gray-300 hover:text-white"
          >
            Pipeline
          </Link>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Player & Frame Scrubber */}
        <div className="flex-1 flex flex-col p-6 lg:p-8 bg-[#07080C] overflow-y-auto">
          {/* Video Canvas Container */}
          <div
            onClick={handleVideoClick}
            className="relative w-full aspect-video max-h-[68vh] mx-auto bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center cursor-crosshair group"
          >
            <video
              ref={videoRef}
              src={currentRevision?.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              playsInline
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Visual Markers on Canvas for Current Second */}
            {comments.map((comment) => {
              const isAtCurrentTimestamp = Math.abs(comment.timestampSeconds - currentTime) < 0.8;
              if (!isAtCurrentTimestamp || !comment.coords) return null;

              return (
                <div
                  key={comment.id}
                  style={{ left: `${comment.coords.x}%`, top: `${comment.coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xl animate-bounce">
                    ●
                  </div>
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] text-white">
                    {comment.content}
                  </div>
                </div>
              );
            })}

            {/* Pending Click Pin */}
            {pendingPinCoords && (
              <div
                style={{ left: `${pendingPinCoords.x}%`, top: `${pendingPinCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div className="w-5 h-5 rounded-full bg-accent-purple border-2 border-white animate-ping" />
              </div>
            )}

            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Frame Controls & Scrubber */}
          <div className="max-w-4xl w-full mx-auto mt-6 glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="relative w-full h-3 bg-surface-card rounded-full cursor-pointer overflow-visible group">
              <div
                className="absolute top-0 bottom-0 left-0 bg-primary rounded-full transition-all"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />

              {comments.map((c) => {
                const percent = (c.timestampSeconds / (duration || 1)) * 100;
                return (
                  <button
                    key={c.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      seekTo(c.timestampSeconds);
                    }}
                    style={{ left: `${percent}%` }}
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white transition-transform hover:scale-150 z-20 ${
                      c.isResolved ? "bg-emerald-400" : "bg-accent-purple"
                    }`}
                    title={`${c.content} (${formatSeconds(c.timestampSeconds)})`}
                  />
                );
              })}

              <input
                type="range"
                min="0"
                max={duration || 32}
                step="0.033"
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-hover flex items-center justify-center text-white transition-all shadow-md shadow-primary/20"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => stepFrame(-1)}
                  className="p-2 rounded-lg bg-surface-card hover:bg-white/10 text-gray-400 hover:text-white"
                  title="Previous Frame (1/30s)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => stepFrame(1)}
                  className="p-2 rounded-lg bg-surface-card hover:bg-white/10 text-gray-400 hover:text-white"
                  title="Next Frame (1/30s)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <div className="font-mono text-xs font-bold bg-surface-card px-3 py-1.5 rounded-lg border border-white/10 text-primary">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </div>
              </div>

              <div className="text-[11px] text-gray-400">
                ⚡ Comments persist dynamically to the backend API.
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Comment Feed & Timecode Thread */}
        <div className="w-full lg:w-96 border-l border-white/10 glass-panel flex flex-col justify-between">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Live Feedback ({comments.length})
            </h2>
            <span className="text-[11px] text-gray-500">
              {comments.filter((c) => c.isResolved).length} Resolved
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                onClick={() => seekTo(comment.timestampSeconds)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  comment.isResolved
                    ? "bg-surface-card/40 border-white/5 opacity-60"
                    : "bg-surface-card border-white/10 hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-white">{comment.authorName}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      seekTo(comment.timestampSeconds);
                    }}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold"
                  >
                    {formatSeconds(comment.timestampSeconds)}
                  </button>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-3">{comment.content}</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleResolveComment(comment.id);
                    }}
                    className={`text-[10px] font-semibold flex items-center gap-1.5 transition-colors ${
                      comment.isResolved ? "text-emerald-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {comment.isResolved ? "Resolved" : "Mark as Resolved"}
                  </button>
                  <span className="text-[10px] text-gray-500">{comment.createdAt}</span>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-12 text-xs text-gray-500">
                No feedback markers yet. Click anywhere on the video frame to place a pin.
              </div>
            )}
          </div>

          <form onSubmit={submitComment} className="p-4 border-t border-white/10 bg-surface space-y-2">
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Timestamp: <span className="font-mono text-primary font-bold">{formatSeconds(currentTime)}</span></span>
              {pendingPinCoords && (
                <span className="text-accent-purple text-[10px] font-bold">Pin Ready on Frame</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Leave feedback at current timecode..."
                className="flex-1 bg-surface-card border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={isSendingComment}
                className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center transition-all disabled:opacity-50"
              >
                {isSendingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
