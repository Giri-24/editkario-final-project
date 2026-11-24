"use client";

import React, { useState } from "react";
import { MOCK_PORTFOLIO } from "@/data/mockData";
import { Play, Volume2, VolumeX, Eye, Flame, Tag } from "lucide-react";

export function ReelsShowcase() {
  const [muted, setMuted] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const verticalReels = MOCK_PORTFOLIO.filter(
    (item) => item.aspectRatio === "9:16_VERTICAL"
  );

  return (
    <section id="showreel" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-bold text-accent-cyan uppercase tracking-wider px-3.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
            Interactive Video Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            Recent High-Performance Cuts.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Hover or click any reel to preview the retention pacing and sound design.
          </p>
        </div>

        <button
          onClick={() => setMuted(!muted)}
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
        >
          {muted ? (
            <>
              <VolumeX className="w-4 h-4 text-amber-400" /> Sound Muted (Click to Unmute)
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" /> Sound Active
            </>
          )}
        </button>
      </div>

      {/* Vertical Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {verticalReels.map((reel) => {
          const isPlaying = activeVideoId === reel.id;

          return (
            <div
              key={reel.id}
              onMouseEnter={() => setActiveVideoId(reel.id)}
              onMouseLeave={() => setActiveVideoId(null)}
              className="group glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* 9:16 Aspect Video Container */}
              <div className="relative aspect-[9/16] w-full bg-surface-card overflow-hidden">
                <video
                  src={reel.previewVideoUrl}
                  poster={reel.thumbnailUrl}
                  loop
                  muted={muted}
                  playsInline
                  autoPlay={isPlaying}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Metrics Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full glass-panel text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-accent-cyan" /> {reel.viewsMetric}
                  </span>
                  <span className="px-3 py-1 rounded-full glass-panel text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> {reel.retentionMetric}
                  </span>
                </div>

                {/* Play Hint */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Meta Footer */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-surface">
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">
                    {reel.creatorOrBrand}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{reel.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {reel.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {reel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-medium text-gray-300 border border-white/5 flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-gray-500" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
