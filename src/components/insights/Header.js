"use client";

import React, { useState, useEffect } from "react";
import { Shield, Activity, Clock, UserSearch, Radio, Calendar, ChevronRight } from "lucide-react";

export default function Header({ activeTab, setActiveTab }) {
  const [matchData, setMatchData] = useState({
    nextMatch: null,
    lastMatch: null,
  });

  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        const res = await fetch("/api/live-fixtures");
        if (res.ok) {
          const data = await res.json();
          setMatchData({
            nextMatch: data.nextMatch || (data.matches && data.matches.find(m => m.status === "SCHEDULED")),
            lastMatch: data.lastMatch || (data.matches && data.matches.filter(m => m.status === "FINISHED").pop()),
          });
        }
      } catch (e) {
        // Silent degrade
      }
    }
    fetchLiveStatus();
  }, []);

  const tabs = [
    { id: "boot-room", label: "Boot Room Live", icon: Activity, emoji: "🏟️" },
    { id: "time-machine", label: "Anfield Time Machine", icon: Clock, emoji: "⏳" },
    { id: "transfer-scout", label: "Transfer Scout", icon: UserSearch, emoji: "🔍" },
  ];

  const nextMatch = matchData.nextMatch;
  const lastMatch = matchData.lastMatch;

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D10]/95 backdrop-blur-md border-b border-[#262630] px-3 sm:px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Brand & Badge */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#C8102E] to-[#800A1D] shadow-[0_0_15px_rgba(200,16,46,0.5)] border border-[#C8102E]/40 shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B2A9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-[#00B2A9]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg md:text-xl font-black tracking-wider text-white font-[family-name:var(--font-lfc-serif)]">
                ANFIELD <span className="text-[#C8102E]">INSIGHTS</span>
              </h1>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase rounded bg-[#00B2A9]/15 text-[#00B2A9] border border-[#00B2A9]/30">
                LFC 2026/27
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#9CA3AF] tracking-wide hidden xs:block">
              LFC Advanced Tactical & Recruitment Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Live Match Ticker with Real-Time LFC Fixtures */}
      <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#141419] border border-[#262630] text-xs">
        <Radio className="w-3.5 h-3.5 text-[#C8102E] animate-pulse shrink-0" />
        
        {nextMatch ? (
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F6EB61] tracking-wider uppercase text-[10px] bg-[#F6EB61]/10 px-2 py-0.5 rounded border border-[#F6EB61]/25">
              NEXT MATCH
            </span>
            <span className="font-bold text-white">
              {nextMatch.homeTeam} vs {nextMatch.awayTeam}
            </span>
            <span className="text-[#9CA3AF]">•</span>
            <span className="text-[#00B2A9] font-mono font-medium">{nextMatch.competition}</span>
            <span className="text-[#9CA3AF]">•</span>
            <span className="text-[#9CA3AF] font-mono text-[11px]">{nextMatch.venue}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">ANFIELD • THE KOP STAND</span>
            <span className="text-[#9CA3AF]">•</span>
            <span className="text-[#00B2A9] font-mono font-medium">SHAPE: 4-3-3 (3-2-4-1 BUILD-UP)</span>
          </div>
        )}

        {lastMatch && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#262630] text-[11px] text-[#9CA3AF]">
            <span>Last:</span>
            <span className="text-white font-mono font-semibold">
              {lastMatch.homeTeam} {lastMatch.homeScore}-{lastMatch.awayScore} {lastMatch.awayTeam}
            </span>
          </div>
        )}
      </div>

      {/* Tab Nav Controls */}
      <nav className="flex items-center gap-1 p-1 rounded-xl bg-[#141419] border border-[#262630] w-full sm:w-auto justify-between sm:justify-start overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-gradient-to-r from-[#C8102E] to-[#990C22] text-white shadow-[0_2px_10px_rgba(200,16,46,0.4)] border border-[#C8102E]/60"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#202028]"
              }`}
            >
              <span className="text-sm">{tab.emoji}</span>
              <span className="inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
