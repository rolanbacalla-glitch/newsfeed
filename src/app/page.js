"use client";

import React, { useState } from "react";
import Header from "../components/insights/Header";
import PitchCanvas from "../components/insights/PitchCanvas";
import MomentumChart from "../components/insights/MomentumChart";
import TimeMachineView from "../components/insights/TimeMachineView";
import TransferScoutView from "../components/insights/TransferScoutView";
import { MATCH_LIBRARY } from "../data/matchLibrary";
import { Calendar, Radio, ChevronRight, Sparkles } from "lucide-react";

export default function AnfieldInsightsDashboard() {
  const [activeTab, setActiveTab] = useState("boot-room");
  const [selectedMatchId, setSelectedMatchId] = useState(MATCH_LIBRARY[0].id);
  const [overlayMode, setOverlayMode] = useState("pass"); // 'pass' | 'heat' | 'shots'
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const activeMatch = MATCH_LIBRARY.find((m) => m.id === selectedMatchId) || MATCH_LIBRARY[0];

  return (
    <main className="min-h-screen lg:h-screen w-full flex flex-col bg-[#0D0D10] text-white overflow-x-hidden lg:overflow-hidden select-none">
      {/* 1. Persistent Sticky Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Body Dashboard Viewport */}
      <div className="flex-1 p-3 md:p-5 flex flex-col overflow-y-auto lg:overflow-hidden gap-3">
        {/* Universal Fixture Ribbon (Visible in Boot Room Live) */}
        {activeTab === "boot-room" && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
            <span className="text-[11px] font-bold uppercase text-[#9CA3AF] tracking-wider shrink-0 flex items-center gap-1.5 pl-1">
              <Calendar className="w-3.5 h-3.5 text-[#00B2A9]" />
              Match Centre:
            </span>

            {MATCH_LIBRARY.map((m) => {
              const isSelected = m.id === selectedMatchId;
              const isUpcoming = m.type === "UPCOMING";

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMatchId(m.id);
                    setSelectedPlayer(null);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected
                      ? "bg-[#141419] border-[#C8102E] text-white shadow-[0_0_12px_rgba(200,16,46,0.35)] ring-1 ring-[#C8102E]"
                      : "bg-[#0D0D10] border-[#262630] text-[#9CA3AF] hover:text-white hover:border-[#383846]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isUpcoming ? "bg-[#F6EB61] animate-ping" : "bg-[#00B2A9]"
                    }`}
                  ></span>
                  <span>{m.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0D0D10] text-[#9CA3AF] border border-[#262630]">
                    {m.statusText}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 1: Boot Room Live (Tactical Visualisation + Momentum Split) */}
        {activeTab === "boot-room" && (
          <div className="w-full flex-1 flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-hidden min-h-0">
            {/* Left 2/3 Tactical Pitch Canvas */}
            <div className="flex-1 lg:w-2/3 h-[460px] lg:h-full">
              <PitchCanvas
                activeMatch={activeMatch}
                overlayMode={overlayMode}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
              />
            </div>

            {/* Right 1/3 Metrics & Match Momentum Controller */}
            <div className="lg:w-1/3 overflow-y-auto">
              <MomentumChart
                activeMatch={activeMatch}
                overlayMode={overlayMode}
                setOverlayMode={setOverlayMode}
                selectedPlayer={selectedPlayer}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Anfield Time Machine */}
        {activeTab === "time-machine" && <TimeMachineView />}

        {/* Tab 3: Transfer Scout Simulator */}
        {activeTab === "transfer-scout" && <TransferScoutView />}
      </div>
    </main>
  );
}
