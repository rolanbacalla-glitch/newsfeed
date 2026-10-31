"use client";

import React, { useState } from "react";
import { UserSearch, Filter, Sliders, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

// 6 Attributes for Liverpool Recruitment Radar
export const RADAR_AXES = [
  { key: "goalThreat", label: "Goal Threat (xG / Sh)" },
  { key: "progCarries", label: "Progressive Carries" },
  { key: "creativePassing", label: "Creative Passing (xA)" },
  { key: "pressingIntensity", label: "Counter-Pressing (PAdj)" },
  { key: "defInterceptions", label: "Defensive Interceptions" },
  { key: "aerialDominance", label: "Aerial Win Rate %" },
];

// Candidates and LFC Benchmarks (Current 2026/27 Squad)
export const PROFILE_POOL = [
  // Current Liverpool Benchmarks
  {
    id: "szoboszlai",
    name: "Dominik Szoboszlai (#8)",
    club: "Liverpool FC",
    role: "LFC Attacking Midfield Benchmark",
    age: 26,
    marketVal: "£85m",
    pressing: 8.9,
    progPasses: 8.2,
    stats: { goalThreat: 80, progCarries: 86, creativePassing: 89, pressingIntensity: 94, defInterceptions: 76, aerialDominance: 68 },
    profileType: "benchmark",
  },
  {
    id: "gravenberch",
    name: "Ryan Gravenberch (#38)",
    club: "Liverpool FC",
    role: "LFC No.6 / Double Pivot Controller",
    age: 24,
    marketVal: "£80m",
    pressing: 9.1,
    progPasses: 8.6,
    stats: { goalThreat: 62, progCarries: 96, creativePassing: 84, pressingIntensity: 93, defInterceptions: 90, aerialDominance: 78 },
    profileType: "benchmark",
  },
  {
    id: "chiesa",
    name: "Federico Chiesa (#14)",
    club: "Liverpool FC",
    role: "LFC High-Pace Dynamic Winger",
    age: 29,
    marketVal: "£45m",
    pressing: 8.2,
    progPasses: 7.5,
    stats: { goalThreat: 86, progCarries: 92, creativePassing: 82, pressingIntensity: 84, defInterceptions: 56, aerialDominance: 50 },
    profileType: "benchmark",
  },
  {
    id: "bradley",
    name: "Conor Bradley (#84)",
    club: "Liverpool FC",
    role: "LFC High-Energy Right Back",
    age: 23,
    marketVal: "£45m",
    pressing: 9.4,
    progPasses: 7.8,
    stats: { goalThreat: 60, progCarries: 88, creativePassing: 81, pressingIntensity: 96, defInterceptions: 88, aerialDominance: 72 },
    profileType: "benchmark",
  },
  {
    id: "salah",
    name: "Mohamed Salah (#11)",
    club: "Liverpool FC",
    role: "LFC Elite Goal Threat Reference",
    age: 34,
    marketVal: "£55m",
    pressing: 6.2,
    progPasses: 6.9,
    stats: { goalThreat: 98, progCarries: 90, creativePassing: 94, pressingIntensity: 66, defInterceptions: 42, aerialDominance: 40 },
    profileType: "benchmark",
  },

  // Active Transfer Targets / FSG Recruitment Watchlist
  {
    id: "wirtz",
    name: "Florian Wirtz",
    club: "Bayer Leverkusen",
    role: "Playmaker / Half-Space Creator",
    age: 23,
    marketVal: "£110m",
    pressing: 8.6,
    progPasses: 9.3,
    stats: { goalThreat: 90, progCarries: 97, creativePassing: 98, pressingIntensity: 86, defInterceptions: 64, aerialDominance: 48 },
    profileType: "target",
    fitScore: 97,
  },
  {
    id: "larsson",
    name: "Hugo Larsson",
    club: "Eintracht Frankfurt",
    role: "Box-to-Box Engine",
    age: 22,
    marketVal: "£42m",
    pressing: 9.3,
    progPasses: 7.8,
    stats: { goalThreat: 66, progCarries: 82, creativePassing: 80, pressingIntensity: 95, defInterceptions: 87, aerialDominance: 74 },
    profileType: "target",
    fitScore: 94,
  },
  {
    id: "kerkez",
    name: "Milos Kerkez",
    club: "AFC Bournemouth",
    role: "Left-Back / High-Intensity Overlap",
    age: 22,
    marketVal: "£40m",
    pressing: 8.9,
    progPasses: 8.1,
    stats: { goalThreat: 54, progCarries: 89, creativePassing: 77, pressingIntensity: 92, defInterceptions: 84, aerialDominance: 70 },
    profileType: "target",
    fitScore: 93,
  },
  {
    id: "frimpong",
    name: "Jeremie Frimpong",
    club: "Bayer Leverkusen",
    role: "Direct Wing-Back / Transition Threat",
    age: 25,
    marketVal: "£50m",
    pressing: 8.3,
    progPasses: 8.4,
    stats: { goalThreat: 84, progCarries: 98, creativePassing: 86, pressingIntensity: 81, defInterceptions: 62, aerialDominance: 44 },
    profileType: "target",
    fitScore: 90,
  },
  {
    id: "kudus",
    name: "Mohammed Kudus",
    club: "West Ham United",
    role: "Inverted Winger / Ball Carrier",
    age: 26,
    marketVal: "£75m",
    pressing: 7.9,
    progPasses: 7.4,
    stats: { goalThreat: 85, progCarries: 96, creativePassing: 78, pressingIntensity: 82, defInterceptions: 66, aerialDominance: 66 },
    profileType: "target",
    fitScore: 89,
  },
];

export default function TransferScoutView() {
  const [targetId, setTargetId] = useState("wirtz");
  const [benchmarkId, setBenchmarkId] = useState("szoboszlai");

  // Interactive Recruitment Sliders
  const [minPressing, setMinPressing] = useState(7.5);
  const [maxAge, setMaxAge] = useState(25);
  const [minProgPasses, setMinProgPasses] = useState(7.0);

  const targetPlayer = PROFILE_POOL.find((p) => p.id === targetId) || PROFILE_POOL[5];
  const benchmarkPlayer = PROFILE_POOL.find((p) => p.id === benchmarkId) || PROFILE_POOL[0];

  const centreX = 150;
  const centreY = 150;
  const maxR = 105;
  const totalAxes = RADAR_AXES.length;

  const getCoordinates = (value, index) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * maxR;
    const x = centreX + r * Math.cos(angle);
    const y = centreY + r * Math.sin(angle);
    return { x, y, angle };
  };

  const targetPoints = RADAR_AXES.map((axis, i) => getCoordinates(targetPlayer.stats[axis.key], i));
  const benchmarkPoints = RADAR_AXES.map((axis, i) => getCoordinates(benchmarkPlayer.stats[axis.key], i));

  const targetPolygon = targetPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const benchmarkPolygon = benchmarkPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const filteredCandidates = PROFILE_POOL.filter(
    (p) => p.profileType === "target" && p.pressing >= minPressing && p.age <= maxAge && p.progPasses >= minProgPasses
  );

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 overflow-y-auto pr-1">
      {/* 2/3 Left Column: Dual Comparison & 6-Axis Radar Canvas */}
      <div className="flex-1 lg:w-2/3 flex flex-col gap-4">
        {/* Dropdown Selector Header */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2">
            <label className="text-[10px] uppercase font-bold text-[#00B2A9] tracking-wider block mb-1">
              Active Scout Target (Teal Polygon)
            </label>
            <div className="relative">
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full bg-[#0D0D10] text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-[#262630] appearance-none focus:outline-none focus:border-[#00B2A9] cursor-pointer"
              >
                {PROFILE_POOL.filter((p) => p.profileType === "target").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.club} • Age {p.age})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label className="text-[10px] uppercase font-bold text-[#C8102E] tracking-wider block mb-1">
              Current LFC Benchmark (Red Polygon)
            </label>
            <div className="relative">
              <select
                value={benchmarkId}
                onChange={(e) => setBenchmarkId(e.target.value)}
                className="w-full bg-[#0D0D10] text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-[#262630] appearance-none focus:outline-none focus:border-[#C8102E] cursor-pointer"
              >
                {PROFILE_POOL.filter((p) => p.profileType === "benchmark").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#9CA3AF] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Radar Graphic Canvas */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 flex-1 flex flex-col items-center justify-center relative min-h-[360px]">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F6EB61]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              6-Axis Tactical Percentile Radar Matrix
            </span>
          </div>

          {/* Inline SVG Radar Wheel */}
          <svg viewBox="0 0 300 300" className="w-full max-w-[420px] max-h-[380px]">
            {[20, 40, 60, 80, 100].map((level) => (
              <polygon
                key={level}
                points={RADAR_AXES.map((_, i) => {
                  const p = getCoordinates(level, i);
                  return `${p.x},${p.y}`;
                }).join(" ")}
                fill="none"
                stroke="#262630"
                strokeWidth="1"
                strokeDasharray={level === 60 ? "2, 2" : undefined}
              />
            ))}

            {RADAR_AXES.map((_, i) => {
              const p = getCoordinates(100, i);
              return (
                <line
                  key={i}
                  x1={centreX}
                  y1={centreY}
                  x2={p.x}
                  y2={p.y}
                  stroke="#262630"
                  strokeWidth="1"
                />
              );
            })}

            {/* Benchmark Polygon (LFC Red) */}
            <polygon
              points={benchmarkPolygon}
              fill="#C8102E"
              fillOpacity="0.25"
              stroke="#C8102E"
              strokeWidth="2"
            />
            {benchmarkPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3" fill="#C8102E" stroke="#FFFFFF" strokeWidth="0.8" />
            ))}

            {/* Target Polygon (Anfield Teal) */}
            <polygon
              points={targetPolygon}
              fill="#00B2A9"
              fillOpacity="0.32"
              stroke="#00B2A9"
              strokeWidth="2.4"
            />
            {targetPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#00B2A9" stroke="#FFFFFF" strokeWidth="1" />
            ))}

            {/* Axis Labels */}
            {RADAR_AXES.map((axis, i) => {
              const p = getCoordinates(118, i);
              return (
                <text
                  key={i}
                  x={p.x}
                  y={p.y + 3}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="7.5"
                  fontWeight="bold"
                  className="select-none"
                >
                  {axis.label}
                </text>
              );
            })}
          </svg>

          {/* Bottom legend */}
          <div className="flex items-center gap-6 text-xs mt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00B2A9]"></span>
              <span className="font-bold text-white">{targetPlayer.name} (Target)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C8102E]"></span>
              <span className="font-bold text-white">{benchmarkPlayer.name} (LFC Squad)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1/3 Right Column: Edwards/Hughes Tactical Sliders & Filtered Shortlist */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        {/* Tactical Trait Sliders */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-[#C8102E]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              LFC Recruitment Filters
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#9CA3AF]">Counter-Pressing Rate (PAdj)</span>
                <span className="text-[#00B2A9] font-mono font-bold">&gt; {minPressing.toFixed(1)}/90</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="9.5"
                step="0.1"
                value={minPressing}
                onChange={(e) => setMinPressing(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#0D0D10] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#9CA3AF]">Max Age Ceiling (FSG Profile)</span>
                <span className="text-[#F6EB61] font-mono font-bold">&le; {maxAge} yrs</span>
              </div>
              <input
                type="range"
                min="19"
                max="28"
                step="1"
                value={maxAge}
                onChange={(e) => setMaxAge(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-[#0D0D10] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-[#9CA3AF]">Prog. Passes / 90</span>
                <span className="text-[#00B2A9] font-mono font-bold">&gt; {minProgPasses.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="9.0"
                step="0.2"
                value={minProgPasses}
                onChange={(e) => setMinProgPasses(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#0D0D10] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Filtered Shortlist Table */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#00B2A9]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Qualified Targets ({filteredCandidates.length})
              </h3>
            </div>
            <span className="text-[10px] text-[#9CA3AF]">Edwards/Hughes Index</span>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1">
            {filteredCandidates.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#9CA3AF]">
                No scouted targets meet these strict pressing thresholds. Try easing the sliders.
              </div>
            ) : (
              filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => setTargetId(candidate.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    targetId === candidate.id
                      ? "bg-[#0D0D10] border-[#00B2A9] ring-1 ring-[#00B2A9]"
                      : "bg-[#0D0D10] border-[#262630] hover:border-[#383846]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{candidate.name}</span>
                    <span className="text-[10px] font-mono font-bold text-[#F6EB61] bg-[#F6EB61]/10 px-2 py-0.5 rounded border border-[#F6EB61]/30">
                      {candidate.fitScore}% LFC FIT
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] mb-1">
                    <span>{candidate.club}</span>
                    <span className="text-white font-mono">{candidate.marketVal}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#00B2A9] font-mono">
                    <span>Press: {candidate.pressing}/90</span>
                    <span>•</span>
                    <span>Prog: {candidate.progPasses}/90</span>
                    <span>•</span>
                    <span>Age: {candidate.age}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
