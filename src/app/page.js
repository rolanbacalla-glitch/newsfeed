"use client";

import React, { useState } from "react";
import Header from "../components/insights/Header";
import PitchCanvas from "../components/insights/PitchCanvas";
import MomentumChart from "../components/insights/MomentumChart";
import TimeMachineView from "../components/insights/TimeMachineView";
import TransferScoutView from "../components/insights/TransferScoutView";

export default function AnfieldInsightsDashboard() {
  const [activeTab, setActiveTab] = useState("boot-room");
  const [overlayMode, setOverlayMode] = useState("pass"); // 'pass' | 'heat' | 'shots'
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <main className="min-h-screen lg:h-screen w-full flex flex-col bg-[#0D0D10] text-white overflow-x-hidden lg:overflow-hidden select-none">
      {/* 1. Persistent Sticky Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Body Dashboard Viewport */}
      <div className="flex-1 p-3 md:p-5 flex flex-col overflow-y-auto lg:overflow-hidden">
        {/* Tab 1: Boot Room Live (Tactical Visualisation + Momentum Split) */}
        {activeTab === "boot-room" && (
          <div className="w-full h-full flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-hidden">
            {/* Left 2/3 Tactical Pitch Canvas */}
            <div className="flex-1 lg:w-2/3 h-[460px] lg:h-full">
              <PitchCanvas
                overlayMode={overlayMode}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
              />
            </div>

            {/* Right 1/3 Metrics & Match Momentum Controller */}
            <div className="lg:w-1/3 overflow-y-auto">
              <MomentumChart
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
