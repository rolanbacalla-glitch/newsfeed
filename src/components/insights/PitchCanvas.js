"use client";

import React, { useState } from "react";
import { Users, Eye, Sparkles } from "lucide-react";

export default function PitchCanvas({
  activeMatch,
  overlayMode,
  selectedPlayer,
  setSelectedPlayer,
}) {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const activePlayerId = selectedPlayer?.id || hoveredPlayer?.id || null;

  const startingXI = activeMatch?.startingXI || [];
  const passLinks = activeMatch?.passLinks || [];
  const shots = activeMatch?.shots || [];

  const getPlayer = (id) => startingXI.find((p) => p.id === id);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex flex-col justify-between rounded-2xl bg-[#08140E] border border-[#262630] overflow-hidden shadow-2xl p-2.5 sm:p-4 md:p-5 select-none">
      {/* Top Overlay Badge Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between z-10 gap-2 mb-2">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0D0D10]/85 border border-[#262630] backdrop-blur-md self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#00B2A9] animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
            {activeMatch?.title} • {overlayMode === "pass" ? "Pass Network" : overlayMode === "heat" ? "Attacking Heatmap" : "Shots & xG Map"}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="text-[10px] sm:text-[11px] font-semibold text-[#9CA3AF] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0D0D10]/80 border border-[#262630]">
            The Kop: <span className="text-[#C8102E] font-bold">Right ➔</span>
          </div>
          {selectedPlayer && (
            <button
              onClick={() => setSelectedPlayer(null)}
              className="text-[10px] text-[#00B2A9] hover:underline cursor-pointer bg-[#00B2A9]/10 px-2 py-0.5 rounded border border-[#00B2A9]/30"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-x-auto">
        <svg
          viewBox="0 0 105 68"
          className="w-full h-auto min-w-[320px] max-h-[480px] object-contain drop-shadow-[0_0_20px_rgba(0,178,169,0.06)]"
        >
          <defs>
            <linearGradient id="turfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#08140E" />
              <stop offset="50%" stopColor="#0A1912" />
              <stop offset="100%" stopColor="#08140E" />
            </linearGradient>

            <radialGradient id="heatKopRight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8102E" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#FF5055" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#00B2A9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#08140E" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="heatKopLeft" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8102E" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FF5055" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#08140E" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="heatBoxCentre" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F6EB61" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#C8102E" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#C8102E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#08140E" stopOpacity="0" />
            </radialGradient>

            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#C8102E" floodOpacity="0.7" />
            </filter>
            <filter id="activeNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00B2A9" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Turf Base */}
          <rect x="0" y="0" width="105" height="68" fill="url(#turfGrad)" rx="2" />

          {/* Mow Lines */}
          {[...Array(9)].map((_, i) => (
            <rect
              key={i}
              x={i * 11.66}
              y="0"
              width="5.83"
              height="68"
              fill="#FFFFFF"
              fillOpacity="0.015"
            />
          ))}

          {/* Pitch Lines */}
          <g stroke="#00B2A9" strokeOpacity="0.32" strokeWidth="0.5" fill="none">
            <rect x="2" y="2" width="101" height="64" rx="1" />
            <line x1="52.5" y1="2" x2="52.5" y2="66" />
            <circle cx="52.5" cy="34" r="9.15" />
            <circle cx="52.5" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            {/* Left penalty box */}
            <rect x="2" y="13.84" width="16.5" height="40.32" />
            <rect x="2" y="24.84" width="5.5" height="18.32" />
            <path d="M 18.5 28.5 A 9.15 9.15 0 0 1 18.5 39.5" />
            <circle cx="11" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            {/* The Kop penalty box */}
            <rect x="86.5" y="13.84" width="16.5" height="40.32" />
            <rect x="97.5" y="24.84" width="5.5" height="18.32" />
            <path d="M 86.5 28.5 A 9.15 9.15 0 0 0 86.5 39.5" />
            <circle cx="94" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            <rect x="0.5" y="30.34" width="1.5" height="7.32" strokeOpacity="0.4" />
            <rect x="103" y="30.34" width="1.5" height="7.32" strokeOpacity="0.4" />
          </g>

          {/* Stand Watermarks */}
          <text x="8" y="8" fill="#00B2A9" fillOpacity="0.2" fontSize="2.8" fontWeight="bold">
            ANFIELD ROAD STAND
          </text>
          <text x="75" y="8" fill="#C8102E" fillOpacity="0.3" fontSize="2.8" fontWeight="bold">
            THE KOP STAND ➔
          </text>

          {/* ═══════ OVERLAY 1: PASS NETWORK ═══════ */}
          {overlayMode === "pass" && (
            <g id="pass-network-layer">
              {passLinks.map((link, idx) => {
                const p1 = getPlayer(link.from);
                const p2 = getPlayer(link.to);
                if (!p1 || !p2) return null;

                const isConnected = activePlayerId === link.from || activePlayerId === link.to;
                const isDimmed = activePlayerId && !isConnected;
                const baseStroke = Math.min(Math.max(link.count / 8, 0.6), 3.2);

                return (
                  <line
                    key={idx}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isConnected ? "#00B2A9" : "#C8102E"}
                    strokeOpacity={isDimmed ? 0.08 : isConnected ? 0.95 : 0.45}
                    strokeWidth={isConnected ? baseStroke * 1.5 : baseStroke}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                );
              })}

              {startingXI.map((player) => {
                const isActive = activePlayerId === player.id;
                const radius = 2.2 + (player.touches / 100) * 1.4;

                return (
                  <g
                    key={player.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedPlayer(selectedPlayer?.id === player.id ? null : player)}
                    onMouseEnter={() => setHoveredPlayer(player)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                  >
                    {isActive && (
                      <circle
                        cx={player.x}
                        cy={player.y}
                        r={radius + 2.5}
                        fill="none"
                        stroke="#00B2A9"
                        strokeWidth="0.6"
                        strokeDasharray="1.5, 1"
                        className="animate-spin"
                        style={{ transformOrigin: `${player.x}px ${player.y}px`, animationDuration: "6s" }}
                      />
                    )}

                    <circle
                      cx={player.x}
                      cy={player.y}
                      r={radius}
                      fill={isActive ? "#00B2A9" : "#C8102E"}
                      stroke="#FFFFFF"
                      strokeWidth={isActive ? "0.9" : "0.5"}
                      filter={isActive ? "url(#activeNodeGlow)" : "url(#nodeGlow)"}
                    />

                    <text
                      x={player.x}
                      y={player.y + 0.8}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="1.8"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {player.number}
                    </text>

                    <text
                      x={player.x}
                      y={player.y + radius + 2.8}
                      textAnchor="middle"
                      fill={isActive ? "#00B2A9" : "#FFFFFF"}
                      fontSize="1.9"
                      fontWeight="bold"
                      className="pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      {player.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* ═══════ OVERLAY 2: ATTACKING HEATMAP ═══════ */}
          {overlayMode === "heat" && (
            <g id="heatmap-layer">
              <ellipse cx="80" cy="54" rx="16" ry="10" fill="url(#heatKopRight)" />
              <ellipse cx="76" cy="16" rx="14" ry="9" fill="url(#heatKopLeft)" />
              <circle cx="89" cy="34" r="11" fill="url(#heatBoxCentre)" />
              <ellipse cx="48" cy="34" rx="12" ry="14" fill="#00B2A9" fillOpacity="0.12" />

              <text x="80" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="2.2" fontWeight="bold">
                Half-Space Penetration
              </text>
              <text x="76" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="2.2" fontWeight="bold">
                Cutback Channel
              </text>
            </g>
          )}

          {/* ═══════ OVERLAY 3: SHOTS & xG MAP ═══════ */}
          {overlayMode === "shots" && (
            <g id="shots-layer">
              {shots.map((shot) => {
                const radius = 1.4 + shot.xG * 3.8;
                const isGoal = shot.outcome === "goal";
                return (
                  <g key={shot.id} className="cursor-pointer group">
                    <circle
                      cx={shot.x}
                      cy={shot.y}
                      r={radius}
                      fill={isGoal ? "#C8102E" : "#9CA3AF"}
                      fillOpacity={isGoal ? 0.9 : 0.6}
                      stroke={isGoal ? "#F6EB61" : "#FFFFFF"}
                      strokeWidth={isGoal ? "0.8" : "0.4"}
                    />
                    <text
                      x={shot.x}
                      y={shot.y + radius + 2.2}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="1.6"
                      fontWeight="bold"
                    >
                      {shot.player} ({shot.xG.toFixed(2)})
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Legend & Selected Player Peek */}
      <div className="z-10 mt-2 pt-2 border-t border-[#262630] flex flex-col sm:flex-row sm:items-center justify-between text-[10px] sm:text-xs text-[#9CA3AF] gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></span>
            <span>LFC Player</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-[#C8102E]"></span>
            <span>Passing Dyad</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B2A9]"></span>
            <span>Spotlight</span>
          </div>
        </div>

        {selectedPlayer && (
          <div className="flex items-center gap-1.5 bg-[#141419] px-2 py-1 rounded border border-[#262630] text-white self-start sm:self-auto flex-wrap">
            <span className="text-[#C8102E] font-bold">#{selectedPlayer.number} {selectedPlayer.name}</span>
            <span className="text-[#9CA3AF]">|</span>
            <span className="text-[#00B2A9] font-mono">OBV: +{selectedPlayer.obv.toFixed(2)}</span>
            <span className="text-[#9CA3AF]">|</span>
            <span>Acc: {selectedPlayer.comp}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
