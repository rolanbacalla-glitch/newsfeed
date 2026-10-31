"use client";

import React from "react";
import { Sliders, Flame, Crosshair, BarChart3, TrendingUp, Zap, Target } from "lucide-react";

export default function MomentumChart({
  overlayMode,
  setOverlayMode,
  selectedPlayer,
}) {
  // Momentum datapoints across 90 minutes (-100 to +100 Liverpool territorial pressure)
  const momentumPoints = [
    { min: 0, val: 25 },
    { min: 10, val: 40 },
    { min: 19, val: 65, event: "Díaz Chance (19')" },
    { min: 28, val: 50 },
    { min: 34, val: 92, event: "Salah Goal (34')", isGoal: true },
    { min: 45, val: 60 },
    { min: 52, val: 75, event: "Salah 1v1 (52')" },
    { min: 60, val: 45 },
    { min: 65, val: 30, event: "Subs: Jones / Bradley (65')" },
    { min: 68, val: 88, event: "Gakpo Header (68')", isGoal: true },
    { min: 78, val: 70 },
    { min: 85, val: 55 },
    { min: 90, val: 60 },
  ];

  // Map to SVG coordinates (width: 300, height: 100, zero-line at Y=50)
  // min: 0..90 -> x: 10..290
  // val: -100..+100 -> y: 90..10
  const points = momentumPoints.map((p) => {
    const x = 15 + (p.min / 90) * 270;
    const y = 50 - (p.val / 100) * 40;
    return { ...p, x, y };
  });

  // Build SVG path
  const pathD = points.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    const prev = points[idx - 1];
    const cx1 = (prev.x + p.x) / 2;
    const cy1 = prev.y;
    const cx2 = (prev.x + p.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, "");

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} 50 L ${points[0].x} 50 Z`;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 1. Tactical Metric Overlay Controller */}
      <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-[#C8102E]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Metric Canvas Controller
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setOverlayMode("pass")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all cursor-pointer border ${
              overlayMode === "pass"
                ? "bg-[#C8102E]/15 border-[#C8102E] text-white shadow-[0_0_12px_rgba(200,16,46,0.3)]"
                : "bg-[#0D0D10] border-[#262630] text-[#9CA3AF] hover:text-white hover:border-[#383846]"
            }`}
          >
            <BarChart3 className={`w-4 h-4 mb-1 ${overlayMode === "pass" ? "text-[#C8102E]" : ""}`} />
            <span className="text-[11px] font-bold">Pass Network</span>
          </button>

          <button
            onClick={() => setOverlayMode("heat")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all cursor-pointer border ${
              overlayMode === "heat"
                ? "bg-[#C8102E]/15 border-[#C8102E] text-white shadow-[0_0_12px_rgba(200,16,46,0.3)]"
                : "bg-[#0D0D10] border-[#262630] text-[#9CA3AF] hover:text-white hover:border-[#383846]"
            }`}
          >
            <Flame className={`w-4 h-4 mb-1 ${overlayMode === "heat" ? "text-[#C8102E]" : ""}`} />
            <span className="text-[11px] font-bold">Heatmap</span>
          </button>

          <button
            onClick={() => setOverlayMode("shots")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all cursor-pointer border ${
              overlayMode === "shots"
                ? "bg-[#C8102E]/15 border-[#C8102E] text-white shadow-[0_0_12px_rgba(200,16,46,0.3)]"
                : "bg-[#0D0D10] border-[#262630] text-[#9CA3AF] hover:text-white hover:border-[#383846]"
            }`}
          >
            <Crosshair className={`w-4 h-4 mb-1 ${overlayMode === "shots" ? "text-[#C8102E]" : ""}`} />
            <span className="text-[11px] font-bold">Shots & xG</span>
          </button>
        </div>
      </div>

      {/* 2. Match Momentum & xG Timeline Area Chart */}
      <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00B2A9]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Rolling Match Momentum
            </h3>
          </div>
          <span className="text-[10px] text-[#00B2A9] font-mono font-bold bg-[#00B2A9]/10 px-2 py-0.5 rounded border border-[#00B2A9]/20">
            LIVERPOOL +64% DOMINANCE
          </span>
        </div>

        {/* SVG Area Wave */}
        <div className="relative w-full h-28 bg-[#0D0D10] rounded-xl border border-[#262630] p-2 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 300 100" className="w-full h-full">
            <defs>
              <linearGradient id="momentumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8102E" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#C8102E" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Zero axis */}
            <line x1="15" y1="50" x2="285" y2="50" stroke="#262630" strokeWidth="1" strokeDasharray="3, 3" />

            {/* Area Fill */}
            <path d={areaD} fill="url(#momentumGrad)" />

            {/* Line Curve */}
            <path d={pathD} fill="none" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Key Event Markers */}
            {points.map((p, idx) => {
              if (!p.event) return null;
              return (
                <g key={idx} className="group cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.isGoal ? "4" : "2.5"}
                    fill={p.isGoal ? "#F6EB61" : "#00B2A9"}
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                  <line x1={p.x} y1={p.y} x2={p.x} y2="88" stroke="#FFFFFF" strokeOpacity="0.15" strokeDasharray="1, 2" />
                  <text
                    x={p.x}
                    y={p.isGoal ? p.y - 7 : p.y - 5}
                    textAnchor="middle"
                    fill={p.isGoal ? "#F6EB61" : "#FFFFFF"}
                    fontSize="7"
                    fontWeight="bold"
                    className="select-none"
                  >
                    {p.event}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] mt-2 font-mono px-1">
          <span>0&apos; KICKOFF</span>
          <span>45&apos; HT</span>
          <span>90&apos; FULL-TIME</span>
        </div>
      </div>

      {/* 3. Deep-Dive Match Indicators */}
      <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#F6EB61]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Match Pressure Metrics
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#0D0D10] p-2.5 rounded-xl border border-[#262630]">
            <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold">Total Team xG</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black text-white font-mono">2.68</span>
              <span className="text-[10px] text-[#9CA3AF]">vs 0.72</span>
            </div>
            <span className="text-[9px] text-[#00B2A9] font-medium">+1.96 xG Differential</span>
          </div>

          <div className="bg-[#0D0D10] p-2.5 rounded-xl border border-[#262630]">
            <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold">Field Tilt (%)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black text-[#C8102E] font-mono">71.4%</span>
            </div>
            <span className="text-[9px] text-[#9CA3AF]">Deep final-third territory</span>
          </div>

          <div className="bg-[#0D0D10] p-2.5 rounded-xl border border-[#262630]">
            <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold">Defensive PPDA</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black text-[#00B2A9] font-mono">7.2</span>
              <span className="text-[10px] text-[#9CA3AF]">passes/action</span>
            </div>
            <span className="text-[9px] text-[#00B2A9]">Intense High Press</span>
          </div>

          <div className="bg-[#0D0D10] p-2.5 rounded-xl border border-[#262630]">
            <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold">Counter-Press Regains</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black text-white font-mono">24</span>
              <span className="text-[10px] text-[#F6EB61]">recov.</span>
            </div>
            <span className="text-[9px] text-[#F6EB61]">6 inside attacking 40m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
