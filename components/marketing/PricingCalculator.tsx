"use client";

import React, { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Calculator,
  Zap,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface AddOnOption {
  id: "motionGraphics3D" | "thumbnailDesign" | "soundDesignMaster" | "hookVariations";
  title: string;
  pricePerUnit: number;
  description: string;
}

const ADD_ONS: AddOnOption[] = [
  {
    id: "motionGraphics3D",
    title: "3D Kinetic Motion & Kinetic Type",
    pricePerUnit: 75,
    description: "After Effects & Blender 3D titles and customized lower-thirds.",
  },
  {
    id: "thumbnailDesign",
    title: "High-CTR YouTube / Cover Design",
    pricePerUnit: 50,
    description: "Photoshop composite designed for peak CTR on feeds.",
  },
  {
    id: "soundDesignMaster",
    title: "Pro Audio Mix & Foley Mastering",
    pricePerUnit: 40,
    description: "Multi-track soundscapes, risers, whooshes, and dialogue EQ.",
  },
  {
    id: "hookVariations",
    title: "3x Viral Hook Variations",
    pricePerUnit: 45,
    description: "3 distinct 0-3s openings to A/B test on TikTok/Meta feeds.",
  },
];

export function PricingCalculator() {
  const [category, setCategory] = useState<"short_form" | "youtube" | "commercial" | "retainer">("short_form");
  const [quantity, setQuantity] = useState<number>(4);
  const [isRush, setIsRush] = useState<boolean>(false);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({
    motionGraphics3D: true,
    soundDesignMaster: true,
  });
  const [intakeSubmitted, setIntakeSubmitted] = useState<boolean>(false);

  // Base pricing tiers
  const baseRate = useMemo(() => {
    switch (category) {
      case "short_form":
        return 120;
      case "youtube":
        return 380;
      case "commercial":
        return 550;
      case "retainer":
        return 2200; // Flat monthly base package
    }
  }, [category]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculatedTotals = useMemo(() => {
    if (category === "retainer") {
      const deposit = 1100;
      return {
        baseCost: 2200,
        addOnsCost: 0,
        rushCost: 0,
        total: 2200,
        deposit,
      };
    }

    const baseCost = baseRate * quantity;
    const addOnsTotal = ADD_ONS.reduce((acc, addon) => {
      return selectedAddOns[addon.id] ? acc + addon.pricePerUnit * quantity : acc;
    }, 0);

    const subtotal = baseCost + addOnsTotal;
    const rushCost = isRush ? subtotal * 0.25 : 0;
    const total = subtotal + rushCost;
    const deposit = Math.round(total * 0.5);

    return {
      baseCost,
      addOnsCost: addOnsTotal,
      rushCost,
      total,
      deposit,
    };
  }, [category, baseRate, quantity, selectedAddOns, isRush]);

  return (
    <section id="calculator" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-accent-purple uppercase tracking-wider px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
          Transparent Scope Estimator
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-4">
          Estimate Your Production Cost.
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          No vague consultations or hidden fees. Configure your volume, turnaround, and add-ons
          for an instant, guaranteed quote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
          {/* Step 1: Format Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              1. Choose Video Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "short_form", label: "Short-Form Reel", sub: "TikTok / Reels ($120/ea)" },
                { id: "youtube", label: "YouTube Long-Form", sub: "10-25 min cut ($380/ea)" },
                { id: "commercial", label: "Commercial Ad", sub: "Meta / UGC Ads ($550/ea)" },
                { id: "retainer", label: "Monthly Retainer", sub: "20 Reels / mo ($2,200)" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id as any)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    category === item.id
                      ? "bg-primary/20 border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-surface-card border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <div className="font-bold text-sm text-white">{item.label}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Quantity Slider (Hidden for Retainer) */}
          {category !== "retainer" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  2. Monthly Video Deliverables
                </label>
                <span className="text-lg font-black text-primary">
                  {quantity} {quantity === 1 ? "Video" : "Videos"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-card rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-2">
                <span>1 video (Test edit)</span>
                <span>10 videos</span>
                <span>20 videos (Full batch)</span>
              </div>
            </div>
          )}

          {/* Step 3: Turnaround SLA */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              3. Turnaround SLA
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsRush(false)}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  !isRush
                    ? "bg-primary/20 border-primary text-white"
                    : "bg-surface-card border-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent-cyan" /> Standard 48 Hours
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Included in base price</div>
                </div>
              </button>

              <button
                onClick={() => setIsRush(true)}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isRush
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-surface-card border-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Rush 24 Hours
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">+25% Priority surcharge</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 4: Creative Add-Ons */}
          {category !== "retainer" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                4. Select Creative Add-Ons
              </label>
              <div className="space-y-2.5">
                {ADD_ONS.map((addon) => {
                  const isChecked = !!selectedAddOns[addon.id];
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "bg-white/5 border-primary/40 text-white"
                          : "bg-surface-card/60 border-white/5 text-gray-400 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-primary border-primary text-white"
                              : "border-gray-600 bg-surface"
                          }`}
                        >
                          {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{addon.title}</div>
                          <div className="text-[10px] text-gray-400">{addon.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-accent-cyan">
                        +{formatCurrency(addon.pricePerUnit)}/ea
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Summary & Deposit Checkout */}
        <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-white/10 sticky top-28 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" /> Cost Summary
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              Guaranteed Quote
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Base Production ({quantity}x {category.replace("_", " ")})</span>
              <span className="font-semibold text-white">{formatCurrency(calculatedTotals.baseCost)}</span>
            </div>

            {calculatedTotals.addOnsCost > 0 && (
              <div className="flex justify-between text-gray-300">
                <span>Selected Add-Ons</span>
                <span className="font-semibold text-accent-cyan">
                  +{formatCurrency(calculatedTotals.addOnsCost)}
                </span>
              </div>
            )}

            {calculatedTotals.rushCost > 0 && (
              <div className="flex justify-between text-gray-300">
                <span>24-Hour Rush Speed</span>
                <span className="font-semibold text-amber-400">
                  +{formatCurrency(calculatedTotals.rushCost)}
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Estimated Total</span>
              <span className="text-3xl font-black text-white">
                {formatCurrency(calculatedTotals.total)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 50% Deposit to Start:
              </span>
              <span className="font-black text-emerald-400 text-sm">
                {formatCurrency(calculatedTotals.deposit)}
              </span>
            </div>
          </div>

          {intakeSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium">
              🎉 Scope locked! Check your email or use the Client Review Portal demo to test frame-by-frame approval.
            </div>
          ) : (
            <button
              onClick={() => setIntakeSubmitted(true)}
              className="w-full py-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              Lock In Scope & Book Production <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-4">
            <span>✓ 2 Free Revision Rounds</span>
            <span>✓ Frame.io Review OS</span>
            <span>✓ S3 / R2 Raw Ingest</span>
          </div>
        </div>
      </div>
    </section>
  );
}
