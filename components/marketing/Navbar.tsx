"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Sparkles, Layers, ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3.5 rounded-2xl border border-white/10 shadow-2xl">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent-purple flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              EditKaro<span className="text-primary text-2xl leading-none">.</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-1">
              Creative Agency OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#showreel" className="hover:text-white transition-colors">
            Showreel
          </a>
          <a href="#color-grading" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            Color Grading
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            Pricing Calculator
          </a>
        </nav>

        {/* Quick Portal Switchers */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/review/demo"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-accent-emerald" />
            Client Review (Demo)
          </Link>
          <Link
            href="/pipeline"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-accent-purple" />
            Agency Pipeline
          </Link>
          <a
            href="#calculator"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-accent-purple hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            Start Project <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel p-6 rounded-2xl flex flex-col gap-4 text-center border border-white/10">
          <a
            href="#showreel"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 py-2 hover:text-white"
          >
            Showreel
          </a>
          <a
            href="#color-grading"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 py-2 hover:text-white"
          >
            Color Grading Scrubber
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 py-2 hover:text-white"
          >
            Capabilities
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 py-2 hover:text-white"
          >
            Pricing Engine
          </a>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/review/demo"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 text-gray-200"
            >
              Open Client Review Studio
            </Link>
            <Link
              href="/pipeline"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 text-gray-200"
            >
              Open Agency Pipeline
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
