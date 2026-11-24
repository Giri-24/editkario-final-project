import React from "react";
import Link from "next/link";
import { Play, ArrowUpRight, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface pt-16 pb-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <span className="font-extrabold text-2xl text-white">
              EditKaro<span className="text-primary">.</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            Enterprise video production & creative operations platform. Transforming raw footage
            into hyper-engaging digital assets with guaranteed 48-hour SLAs.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Q1 Client Intake: Active
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">TikTok & Reels</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">YouTube Long-Form</a></li>
              <li><a href="#color-grading" className="hover:text-white transition-colors">DaVinci Color Grading</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Paid Ads (Meta/TikTok)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Client Agency OS</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/review/demo" className="hover:text-white transition-colors">Review Studio (Demo)</Link></li>
              <li><Link href="/pipeline" className="hover:text-white transition-colors">Agency Kanban</Link></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Pricing Engine</a></li>
              <li><span className="text-gray-600">S3 / R2 Multipart Ingest</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li>
                <a href="https://github.com/Giri-24/editkario-final-project" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  GitHub Repo <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">contact@editkaro.in</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>
          © {new Date().getFullYear()} EditKaro. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          Architected with Next.js 15, Tailwind & React 19.
        </div>
      </div>
    </footer>
  );
}
