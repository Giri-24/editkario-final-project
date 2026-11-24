"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Clock, CheckCircle2, Video, Eye } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-accent-purple/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-gray-300">
            Accepting Selected Q1 Creator & Brand Retainers
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
            48H SLA
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
          We Craft High-Retention <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Video Edits That Scale
          </span>{" "}
          Brands.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 font-normal leading-relaxed mb-10">
          Transform raw footage into viral short-form assets, cinematic YouTube deep-dives,
          and high-converting commercials — backed by an end-to-end client review OS.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#calculator"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            Estimate Project Cost <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/review/demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-gray-300 hover:text-white glass-panel hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <Video className="w-4 h-4 text-accent-cyan" />
            Explore Frame-by-Frame Client Studio
          </Link>
        </div>

        {/* Live Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-left border border-white/5">
            <div className="flex items-center gap-2 text-accent-purple mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Reach</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">150M+</div>
            <div className="text-xs text-gray-400 mt-0.5">Organic views generated</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left border border-white/5">
            <div className="flex items-center gap-2 text-accent-cyan mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Speed</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">48 Hours</div>
            <div className="text-xs text-gray-400 mt-0.5">Average turnaround time</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left border border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Satisfaction</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
            <div className="text-xs text-gray-400 mt-0.5">First-cut approval rate</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-left border border-white/5">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Retention</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">+84%</div>
            <div className="text-xs text-gray-400 mt-0.5">Avg short-form watch-time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
