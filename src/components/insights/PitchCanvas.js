"use client";

import React, { useState } from "react";
import { Users, Eye, Sparkles } from "lucide-react";

// Standard Pitch dimensions: 105m length x 68m width
// Standard horizontal orientation: Liverpool attacking right towards The Kop
export const LFC_STARTING_XI = [
  { id: "alisson", name: "Alisson", number: 1, pos: "GK", x: 7, y: 34, touches: 48, obv: 0.24, passes: 39, comp: 89.7 },
  { id: "trent", name: "Alexander-Arnold", number: 66, pos: "RB / Inverted", x: 38, y: 56, touches: 89, obv: 0.94, passes: 74, comp: 82.4 },
  { id: "konate", name: "Konaté", number: 5, pos: "CB", x: 26, y: 44, touches: 76, obv: 0.38, passes: 68, comp: 94.1 },
  { id: "vandijk", name: "Van Dijk", number: 4, pos: "CB", x: 24, y: 24, touches: 84, obv: 0.52, passes: 81, comp: 93.8 },
  { id: "robertson", name: "Robertson", number: 26, pos: "LB", x: 36, y: 12, touches: 72, obv: 0.45, passes: 62, comp: 85.5 },
  { id: "gravenberch", name: "Gravenberch", number: 38, pos: "DM", x: 44, y: 36, touches: 82, obv: 0.78, passes: 71, comp: 91.5 },
  { id: "macallister", name: "Mac Allister", number: 10, pos: "CM", x: 55, y: 26, touches: 79, obv: 0.81, passes: 69, comp: 89.9 },
  { id: "szoboszlai", name: "Szoboszlai", number: 8, pos: "AM", x: 68, y: 46, touches: 68, obv: 0.69, passes: 54, comp: 83.3 },
  { id: "salah", name: "Salah", number: 11, pos: "RW", x: 82, y: 58, touches: 64, obv: 1.15, passes: 41, comp: 78.0 },
  { id: "diaz", name: "Díaz", number: 7, pos: "LW", x: 80, y: 14, touches: 61, obv: 0.89, passes: 38, comp: 81.6 },
  { id: "gakpo", name: "Gakpo", number: 18, pos: "CF", x: 86, y: 34, touches: 49, obv: 0.72, passes: 31, comp: 80.6 },
];

export const PASS_NETWORK_LINKS = [
  { from: "alisson", to: "vandijk", count: 14 },
  { from: "alisson", to: "konate", count: 12 },
  { from: "alisson", to: "gravenberch", count: 8 },
  { from: "vandijk", to: "konate", count: 18 },
  { from: "vandijk", to: "robertson", count: 24 },
  { from: "vandijk", to: "gravenberch", count: 19 },
  { from: "vandijk", to: "macallister", count: 16 },
  { from: "konate", to: "trent", count: 22 },
  { from: "konate", to: "gravenberch", count: 15 },
  { from: "trent", to: "gravenberch", count: 21 },
  { from: "trent", to: "szoboszlai", count: 25 },
  { from: "trent", to: "salah", count: 28 },
  { from: "robertson", to: "macallister", count: 17 },
  { from: "robertson", to: "diaz", count: 23 },
  { from: "gravenberch", to: "macallister", count: 29 },
  { from: "gravenberch", to: "szoboszlai", count: 22 },
  { from: "macallister", to: "szoboszlai", count: 18 },
  { from: "macallister", to: "diaz", count: 19 },
  { from: "szoboszlai", to: "salah", count: 20 },
  { from: "szoboszlai", to: "gakpo", count: 14 },
  { from: "diaz", to: "gakpo", count: 12 },
  { from: "salah", to: "gakpo", count: 15 },
];

export const SHOTS_DATA = [
  { id: 1, x: 91, y: 40, xG: 0.42, outcome: "goal", player: "Salah (34')", desc: "Curled into top corner after Trent inside overload" },
  { id: 2, x: 89, y: 31, xG: 0.31, outcome: "goal", player: "Gakpo (68')", desc: "Header at near post from Robertson cross" },
  { id: 3, x: 84, y: 22, xG: 0.18, outcome: "saved", player: "Díaz (19')", desc: "Low driven shot parried by goalkeeper" },
  { id: 4, x: 78, y: 36, xG: 0.08, outcome: "blocked", player: "Szoboszlai (44')", desc: "Long-range strike deflected wide" },
  { id: 5, x: 94, y: 34, xG: 0.58, outcome: "saved", player: "Salah (52')", desc: "1v1 chance smothered by keeper" },
  { id: 6, x: 88, y: 48, xG: 0.12, outcome: "missed", player: "Alexander-Arnold (73')", desc: "Free-kick narrowly over the bar" },
];

export default function PitchCanvas({
  overlayMode,
  selectedPlayer,
  setSelectedPlayer,
}) {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const activePlayerId = selectedPlayer?.id || hoveredPlayer?.id || null;

  // Helper to find player coords
  const getPlayer = (id) => LFC_STARTING_XI.find((p) => p.id === id);

  return (
    <div className="relative w-full h-full flex flex-col justify-between rounded-2xl bg-[#08140E] border border-[#262630] overflow-hidden shadow-2xl p-3 md:p-5 select-none">
      {/* Top Overlay Badge Bar */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0D0D10]/85 border border-[#262630] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00B2A9] animate-pulse"></span>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {overlayMode === "pass" && "Pass Network & Positional Average Layer"}
            {overlayMode === "heat" && "Attacking Half-Space Heatmap Overlay"}
            {overlayMode === "shots" && "Shot Locations & Expected Goals (xG) Map"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[11px] font-semibold text-[#9CA3AF] px-2.5 py-1 rounded bg-[#0D0D10]/80 border border-[#262630]">
            Attacking End: <span className="text-[#C8102E] font-bold">The Kop (Right ➔)</span>
          </div>
          {selectedPlayer && (
            <button
              onClick={() => setSelectedPlayer(null)}
              className="text-[10px] text-[#00B2A9] hover:underline cursor-pointer bg-[#00B2A9]/10 px-2 py-0.5 rounded border border-[#00B2A9]/30"
            >
              Reset Focus
            </button>
          )}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <svg
          viewBox="0 0 105 68"
          className="w-full h-full max-h-[500px] object-contain drop-shadow-[0_0_20px_rgba(0,178,169,0.06)]"
        >
          <defs>
            {/* Pitch pattern / gradient */}
            <linearGradient id="turfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#08140E" />
              <stop offset="50%" stopColor="#0A1912" />
              <stop offset="100%" stopColor="#08140E" />
            </linearGradient>

            {/* Heatmap zones gradients */}
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

            {/* Glowing filter for nodes */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#C8102E" floodOpacity="0.7" />
            </filter>
            <filter id="activeNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00B2A9" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Turf base */}
          <rect x="0" y="0" width="105" height="68" fill="url(#turfGrad)" rx="2" />

          {/* Faint Mow Lines */}
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

          {/* Pitch Markings (Teal Faint Vector Lines) */}
          <g stroke="#00B2A9" strokeOpacity="0.32" strokeWidth="0.5" fill="none">
            {/* Boundary */}
            <rect x="2" y="2" width="101" height="64" rx="1" />
            {/* Halfway line */}
            <line x1="52.5" y1="2" x2="52.5" y2="66" />
            {/* Centre circle */}
            <circle cx="52.5" cy="34" r="9.15" />
            <circle cx="52.5" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            {/* Anfield Road End Penalty Box (Left) */}
            <rect x="2" y="13.84" width="16.5" height="40.32" />
            <rect x="2" y="24.84" width="5.5" height="18.32" />
            <path d="M 18.5 28.5 A 9.15 9.15 0 0 1 18.5 39.5" />
            <circle cx="11" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            {/* The Kop Penalty Box (Right) */}
            <rect x="86.5" y="13.84" width="16.5" height="40.32" />
            <rect x="97.5" y="24.84" width="5.5" height="18.32" />
            <path d="M 86.5 28.5 A 9.15 9.15 0 0 0 86.5 39.5" />
            <circle cx="94" cy="34" r="0.6" fill="#00B2A9" fillOpacity="0.5" />

            {/* Goals */}
            <rect x="0.5" y="30.34" width="1.5" height="7.32" strokeOpacity="0.4" />
            <rect x="103" y="30.34" width="1.5" height="7.32" strokeOpacity="0.4" />
          </g>

          {/* Stand Label Watermarks */}
          <text x="8" y="8" fill="#00B2A9" fillOpacity="0.2" fontSize="2.8" fontWeight="bold" letterSpacing="0.2">
            ANFIELD ROAD STAND
          </text>
          <text x="75" y="8" fill="#C8102E" fillOpacity="0.3" fontSize="2.8" fontWeight="bold" letterSpacing="0.2">
            THE KOP STAND ➔
          </text>

          {/* ═══════ OVERLAY MODE 1: PASS NETWORK ═══════ */}
          {overlayMode === "pass" && (
            <g id="pass-network-layer">
              {/* Passing Lanes / Dyads */}
              {PASS_NETWORK_LINKS.map((link, idx) => {
                const p1 = getPlayer(link.from);
                const p2 = getPlayer(link.to);
                if (!p1 || !p2) return null;

                const isConnected =
                  activePlayerId === link.from || activePlayerId === link.to;
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

              {/* Player Nodes */}
              {LFC_STARTING_XI.map((player) => {
                const isActive = activePlayerId === player.id;
                const radius = 2.2 + (player.touches / 100) * 1.4;

                return (
                  <g
                    key={player.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() =>
                      setSelectedPlayer(
                        selectedPlayer?.id === player.id ? null : player
                      )
                    }
                    onMouseEnter={() => setHoveredPlayer(player)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                  >
                    {/* Pulsing ring for active player */}
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

                    {/* Outer Circle Node */}
                    <circle
                      cx={player.x}
                      cy={player.y}
                      r={radius}
                      fill={isActive ? "#00B2A9" : "#C8102E"}
                      stroke="#FFFFFF"
                      strokeWidth={isActive ? "0.9" : "0.5"}
                      filter={isActive ? "url(#activeNodeGlow)" : "url(#nodeGlow)"}
                    />

                    {/* Player Squad Number */}
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

                    {/* Player Name Tag */}
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

          {/* ═══════ OVERLAY MODE 2: ATTACKING HEATMAP ═══════ */}
          {overlayMode === "heat" && (
            <g id="heatmap-layer">
              {/* Right Half-space Salah & Trent Overload */}
              <ellipse cx="80" cy="54" rx="16" ry="10" fill="url(#heatKopRight)" />
              {/* Left Wing Díaz Iso channel */}
              <ellipse cx="76" cy="16" rx="14" ry="9" fill="url(#heatKopLeft)" />
              {/* Golden Central Danger Zone */}
              <circle cx="89" cy="34" r="11" fill="url(#heatBoxCentre)" />
              {/* Build up progression hub */}
              <ellipse cx="48" cy="34" rx="12" ry="14" fill="#00B2A9" fillOpacity="0.12" />

              <text x="80" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="2.2" fontWeight="bold">
                Right Half-Space Overload
              </text>
              <text x="76" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="2.2" fontWeight="bold">
                Isolated Cutback Corridor
              </text>
            </g>
          )}

          {/* ═══════ OVERLAY MODE 3: SHOTS & xG MAP ═══════ */}
          {overlayMode === "shots" && (
            <g id="shots-layer">
              {SHOTS_DATA.map((shot) => {
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

      {/* Legend & Selected Player Quick Peek */}
      <div className="z-10 mt-2 pt-2 border-t border-[#262630] flex flex-wrap items-center justify-between text-xs text-[#9CA3AF] gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></span>
            <span>LFC Player Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#C8102E]"></span>
            <span>Passing Dyad (Thickness = Frequency)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B2A9]"></span>
            <span>Active / Spotlighted Lane</span>
          </div>
        </div>

        {selectedPlayer && (
          <div className="flex items-center gap-2 bg-[#141419] px-2.5 py-1 rounded border border-[#262630] text-white">
            <span className="text-[#C8102E] font-bold">#{selectedPlayer.number} {selectedPlayer.name}</span>
            <span className="text-[#9CA3AF]">|</span>
            <span>{selectedPlayer.pos}</span>
            <span className="text-[#00B2A9] font-mono">OBV: +{selectedPlayer.obv.toFixed(2)}</span>
            <span className="text-[#9CA3AF]">|</span>
            <span>Acc: {selectedPlayer.comp}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
