import React from "react";
import { Smartphone, Youtube, Tv, Sparkles, Layers, Sliders, CheckCircle } from "lucide-react";

export function BentoServices() {
  return (
    <section id="services" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
          Core Production Capabilities
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-4">
          Engineered for Retention & Velocity.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          We don't just cut clips together. We craft visual hooks, psychological pacing, and
          high-conversion soundscapes engineered for each specific algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Short-Form Virality */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">
              TikTok / Reels / Shorts
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">Short-Form Virality</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              0-3 second retention hooks, kinetic typography, dynamic zoom cuts, and sound-effect
              syncs designed to keep audience watch-time above 85%.
            </p>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom animated subtitle presets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> B-roll sourcing & sound design
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Multi-hook variation testing
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: YouTube Long-Form */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between md:col-span-2 bg-gradient-to-br from-surface to-surface-card">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
              <Youtube className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-bold">
              Documentary & Deep-Dive
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-accent-purple uppercase tracking-wider">
              High-Watchtime Engineering
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1 mb-3">
              YouTube Mastery & Storytelling
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xl">
              Turn complex long-form scripts into engaging visual essays. We handle multi-track audio
              ducking, motion graphic maps, archive footage synthesis, and 4K export presets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="block text-white font-bold text-lg">60%+</span>
                <span className="text-gray-400">Avg Retention on 20min+</span>
              </div>
              <div>
                <span className="block text-white font-bold text-lg">48h</span>
                <span className="text-gray-400">First-Cut Turnaround</span>
              </div>
              <div>
                <span className="block text-white font-bold text-lg">DaVinci 19</span>
                <span className="text-gray-400">Pro Color Pipeline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Paid Commercial Ads */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
              <Tv className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-bold">
              High-ROAS Creatives
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">
              Meta, TikTok & YouTube Ads
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1 mb-3">
              Direct-Response Commercial Ads
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xl">
              E-commerce brands and SaaS startups rely on our rapid iteration model: we deliver
              multiple hook variations, fast-paced product benefit callouts, and clean CTAs.
            </p>
          </div>
        </div>

        {/* Card 4: Color Grading & 3D */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Post-Production Polish
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">VFX & Color Mastery</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              From cinematic film grain and skin tone correction to 3D product tracking and camera
              match-moving.
            </p>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> S-Log / C-Log to Rec.709
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> After Effects 3D Camera Tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
