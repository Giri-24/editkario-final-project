"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { AgencyProject, ProjectStatus } from "@/types";
import {
  Layers,
  ArrowLeft,
  Video,
  Loader2,
  RefreshCw,
} from "lucide-react";

const COLUMNS: { id: ProjectStatus; title: string }[] = [
  { id: "BRIEFING", title: "Asset Ingestion & Briefing" },
  { id: "IN_PROGRESS", title: "In Active Editing" },
  { id: "CLIENT_REVIEW", title: "Client Frame Review" },
  { id: "APPROVED", title: "Approved & Delivered" },
];

export default function DynamicPipelinePage() {
  const [projects, setProjects] = useState<AgencyProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error("Failed to load projects from API", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filterCategory === "ALL") return true;
    return p.category === filterCategory;
  });

  const totalPipelineRevenue = projects.reduce((acc, p) => acc + p.budget, 0);

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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-sm font-bold text-white">Live Agency Operations Pipeline</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProjects}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1.5"
            title="Refresh Data from API"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>

          <div className="flex items-center gap-1 bg-surface-card rounded-xl p-1 border border-white/10 text-xs">
            {["ALL", "Short-Form Reels", "YouTube Long-Form", "Commercial Ads"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === cat
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat === "ALL" ? "All Formats" : cat}
              </button>
            ))}
          </div>

          <Link
            href="/review/proj-101"
            className="px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 text-xs font-semibold text-primary hover:text-white flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5 text-accent-cyan" /> Review Studio
          </Link>
        </div>
      </header>

      {/* KPI Stats Strip */}
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Active Pipeline Projects
            </span>
            <div className="text-2xl font-black text-white">{projects.length} Projects</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Live Pipeline Budget
            </span>
            <div className="text-2xl font-black text-accent-cyan">
              {formatCurrency(totalPipelineRevenue)}
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              API Sync Status
            </span>
            <div className="text-2xl font-black text-emerald-400">Dynamic Live</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              In-House Editors
            </span>
            <div className="text-2xl font-black text-accent-purple">3 Lead Pros</div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
            Loading dynamic pipeline from API...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {COLUMNS.map((column) => {
              const columnProjects = filteredProjects.filter((p) => p.status === column.id);

              return (
                <div
                  key={column.id}
                  className="glass-panel rounded-3xl p-4 border border-white/10 flex flex-col min-h-[500px]"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{column.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-extrabold text-gray-300">
                        {columnProjects.length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    {columnProjects.map((project) => (
                      <div
                        key={project.id}
                        className="glass-card p-4 rounded-2xl border border-white/5 hover:border-primary/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-semibold text-accent-cyan">
                              {project.category}
                            </span>
                            <span className="text-xs font-bold text-emerald-400 font-mono">
                              {formatCurrency(project.budget)}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-1">{project.title}</h4>
                          <div className="text-xs text-gray-400 mb-3">
                            Client: <span className="text-gray-300">{project.clientName}</span> ({project.clientCompany})
                          </div>

                          <div className="w-full h-1.5 bg-surface-card rounded-full overflow-hidden mb-3">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${project.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-gray-500 font-mono">#{project.id}</span>
                          <Link
                            href={`/review/${project.id}`}
                            className="text-[11px] font-bold text-primary hover:text-white flex items-center gap-1"
                          >
                            Review Room <Video className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}

                    {columnProjects.length === 0 && (
                      <div className="h-32 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-xs text-gray-500">
                        No projects in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
