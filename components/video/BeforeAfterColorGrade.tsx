"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, SlidersHorizontal, Eye } from "lucide-react";

export function BeforeAfterColorGrade() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="color-grading" className="py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Hollywood Color Science
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Flat LOG to Cinematic Grade.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Drag the interactive divider below to see how our DaVinci Resolve colorists transform
            flat Sony S-Log3 / Canon C-Log footage into rich, filmic imagery.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => (isDragging.current = true)}
          onTouchEnd={() => (isDragging.current = false)}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize glass-panel"
        >
          {/* Layer 2 (Background - Graded Full Color) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85')`,
              filter: "contrast(115%) saturate(135%) brightness(105%)",
            }}
          >
            <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-xl glass-panel text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              DaVinci Resolve 19 (Rec.709 Film LUT)
            </div>
          </div>

          {/* Layer 1 (Clipped Flat LOG Profile) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85')`,
              filter: "contrast(60%) saturate(40%) brightness(125%)",
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-xl glass-panel text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Raw Flat S-Log3 Capture
            </div>
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-30"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-xl flex items-center justify-center font-bold">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Top Instruction Pill */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-2 pointer-events-none">
            <Eye className="w-3.5 h-3.5 text-primary" /> Drag or swipe across to compare
          </div>
        </div>
      </div>
    </section>
  );
}
