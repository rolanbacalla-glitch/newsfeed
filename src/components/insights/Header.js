"use client";

import React from "react";
import { Shield, Activity, Clock, UserSearch, Radio } from "lucide-react";

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "boot-room", label: "Boot Room Live", icon: Activity, emoji: "🏟️" },
    { id: "time-machine", label: "Anfield Time Machine", icon: Clock, emoji: "⏳" },
    { id: "transfer-scout", label: "Transfer Scout", icon: UserSearch, emoji: "🔍" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D10]/95 backdrop-blur-md border-b border-[#262630] px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Badge */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#C8102E] to-[#800A1D] shadow-[0_0_15px_rgba(200,16,46,0.5)] border border-[#C8102E]/40">
          <Shield className="w-5 h-5 text-white stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B2A9] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B2A9]"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-black tracking-wider text-white font-[family-name:var(--font-lfc-serif)]">
              ANFIELD <span className="text-[#C8102E]">INSIGHTS</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded bg-[#00B2A9]/15 text-[#00B2A9] border border-[#00B2A9]/30">
              DATA ENGINE v2.6
            </span>
          </div>
          <p className="text-[11px] text-[#9CA3AF] tracking-wide hidden sm:block">
            Liverpool FC Advanced Tactical & Recruitment Intelligence
          </p>
        </div>
      </div>

      {/* Live Match / Pitch Ticker */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141419] border border-[#262630]">
        <Radio className="w-3.5 h-3.5 text-[#C8102E] animate-pulse" />
        <span className="text-xs font-semibold text-white tracking-wide">
          ANFIELD • THE KOP STAND
        </span>
        <span className="text-xs text-[#9CA3AF]">•</span>
        <span className="text-xs text-[#00B2A9] font-mono font-medium">
          SHAPE: 4-3-3 (3-2-4-1 BUILD-UP)
        </span>
      </div>

      {/* Tab Nav Controls */}
      <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141419] border border-[#262630]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-[#C8102E] to-[#990C22] text-white shadow-[0_2px_10px_rgba(200,16,46,0.4)] border border-[#C8102E]/60"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#202028]"
              }`}
            >
              <span className="text-sm">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
