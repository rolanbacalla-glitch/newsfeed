"use client";

import React, { useState } from "react";
import { Trophy, History, Award, ChevronRight, Activity, ArrowUpRight } from "lucide-react";

export const HISTORIC_MATCHES = [
  {
    id: "istanbul-2005",
    title: "2005 Istanbul UCL Final",
    opponent: "AC Milan",
    score: "3 - 3 (3 - 2 pens)",
    date: "25 May 2005",
    venue: "Atatürk Olympic Stadium",
    summary: "The Miracle of Istanbul. 3-0 down at half-time, Liverpool staged the greatest comeback in Champions League history with three goals in six furious minutes.",
    teamXg: 2.15,
    opponentXg: 2.84,
    ppda: 11.4,
    possession: 47,
    mvp: "Steven Gerrard",
    topPerformers: [
      { name: "Steven Gerrard", role: "Captain / CM", obv: 1.42, note: "Catalyst header 54', won penalty 60', shifted to RB" },
      { name: "Jerzy Dudek", role: "Goalkeeper", obv: 1.28, note: "Double Shevchenko save 118', two penalty stops" },
      { name: "Vladimír Šmicer", role: "Attacking Mid", obv: 0.88, note: "Long range strike 56', scored crucial shootout pen" },
      { name: "Xabi Alonso", role: "Deep Playmaker", obv: 0.74, note: "Rebound penalty conversion 60', dictated tempo" },
      { name: "Jamie Carragher", role: "Centre Back", obv: 0.69, note: "Heroic cramp-stricken tackles during extra time" },
    ],
  },
  {
    id: "barca-2019",
    title: "2019 UCL Semi-Final (4-0)",
    opponent: "FC Barcelona",
    score: "4 - 0 (4 - 3 agg)",
    date: "7 May 2019",
    venue: "Anfield",
    summary: "'Corner taken quickly... ORIGI!' Overcoming a 3-0 first leg deficit without Salah or Firmino, Anfield witnessed total football heavy metal pressing.",
    teamXg: 3.48,
    opponentXg: 1.12,
    ppda: 6.8,
    possession: 56,
    mvp: "Trent Alexander-Arnold",
    topPerformers: [
      { name: "Trent Alexander-Arnold", role: "Right Back", obv: 1.68, note: "Vision for 4th goal corner, 2 assists, 4 key passes" },
      { name: "Georginio Wijnaldum", role: "Midfielder (Sub)", obv: 1.34, note: "2 goals in 122 seconds off the bench (54', 56')" },
      { name: "Divock Origi", role: "Forward", obv: 1.22, note: "Opening goal 7', historic iconic winner 79'" },
      { name: "Jordan Henderson", role: "Box-to-box CM", obv: 0.95, note: "Relentless press, created Origi's first goal rebound" },
      { name: "Alisson Becker", role: "Goalkeeper", obv: 0.85, note: "Five world-class saves preserving the clean sheet" },
    ],
  },
  {
    id: "madrid-2019",
    title: "2019 Madrid UCL Final",
    opponent: "Tottenham Hotspur",
    score: "2 - 0",
    date: "1 June 2019",
    venue: "Estadio Metropolitano",
    summary: "Liverpool captured their 6th European Cup with ice-cold defensive supremacy and clinical transition execution.",
    teamXg: 1.74,
    opponentXg: 0.94,
    ppda: 8.9,
    possession: 36,
    mvp: "Virgil van Dijk",
    topPerformers: [
      { name: "Virgil van Dijk", role: "Centre Back", obv: 1.38, note: "UEFA Man of the Match, 0 times dribbled past, 100% aerial duels" },
      { name: "Alisson Becker", role: "Goalkeeper", obv: 1.12, note: "8 crucial saves without spilling a rebound" },
      { name: "Divock Origi", role: "Forward", obv: 0.81, note: "Decisive left-foot drive into the far corner 87'" },
      { name: "Mohamed Salah", role: "Right Wing", obv: 0.78, note: "High-pressure penalty converted in minute 2" },
      { name: "Joel Matip", role: "Centre Back", obv: 0.65, note: "Assist for Origi's sealer, impenetrable back line" },
    ],
  },
  {
    id: "chelsea-2020",
    title: "2020 Premier League Coronation (5-3)",
    opponent: "Chelsea",
    score: "5 - 3",
    date: "22 July 2020",
    venue: "Anfield",
    summary: "The night the 30-year wait ended. An electrifying 8-goal thriller crowned by lifting the Premier League trophy on the Kop.",
    teamXg: 2.82,
    opponentXg: 2.05,
    ppda: 9.1,
    possession: 50,
    mvp: "Naby Keïta / Alexander-Arnold",
    topPerformers: [
      { name: "Trent Alexander-Arnold", role: "Right Back", obv: 1.45, note: "Thunderbolt 30-yard free-kick, pinpoint assist for Firmino" },
      { name: "Naby Keïta", role: "Central Mid", obv: 1.18, note: "Cannon strike into the top corner from 25 yards 23'" },
      { name: "Roberto Firmino", role: "False 9", obv: 0.92, note: "Towering header, supreme link-up play" },
      { name: "Georginio Wijnaldum", role: "Central Mid", obv: 0.84, note: "Half-volley goal into the roof of the net 38'" },
      { name: "Alex Oxlade-Chamberlain", role: "Forward (Sub)", obv: 0.76, note: "Swept home rapid counter-attacking 5th goal 84'" },
    ],
  },
];

export default function TimeMachineView() {
  const [selectedMatch, setSelectedMatch] = useState(HISTORIC_MATCHES[0]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 overflow-y-auto pr-1">
      {/* 2/3 Left Column: Match Timeline Explorer */}
      <div className="flex-1 lg:w-2/3 flex flex-col gap-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#141419] to-[#0D0D10] rounded-2xl border border-[#262630] p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#F6EB61]" />
              <h2 className="text-base font-black text-white uppercase tracking-wider font-[family-name:var(--font-lfc-serif)]">
                Historical StatsBomb Open Data Archive
              </h2>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              Select an iconic Liverpool European or domestic campaign to replay tactical data & event metrics.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#F6EB61] bg-[#F6EB61]/10 px-3 py-1 rounded-full border border-[#F6EB61]/30 hidden sm:block">
            4 HISTORIC FIXTURES
          </span>
        </div>

        {/* Fixture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HISTORIC_MATCHES.map((match) => {
            const isSelected = selectedMatch.id === match.id;
            return (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#141419] border-[#C8102E] shadow-[0_0_15px_rgba(200,16,46,0.35)] ring-1 ring-[#C8102E]"
                    : "bg-[#0D0D10] border-[#262630] hover:border-[#383846] hover:bg-[#141419]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#00B2A9] font-bold uppercase tracking-wider">
                      {match.date}
                    </span>
                    <span className="text-xs font-bold text-[#F6EB61] flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      {match.venue}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white mb-1">
                    {match.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-black text-[#C8102E] font-mono">
                      {match.score}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">vs {match.opponent}</span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {match.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#262630] flex items-center justify-between text-[11px]">
                  <span className="text-[#00B2A9] font-mono font-semibold">
                    LFC xG: {match.teamXg.toFixed(2)}
                  </span>
                  <span className="text-white font-semibold flex items-center gap-1 hover:text-[#C8102E]">
                    Inspect Match Data <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Match Narrative & Tactical Breakdown */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C8102E]" />
              Tactical Match Reconstruction // {selectedMatch.title}
            </h4>
            <span className="text-[10px] text-[#00B2A9] font-mono bg-[#00B2A9]/10 px-2 py-0.5 rounded border border-[#00B2A9]/20">
              MOM: {selectedMatch.mvp}
            </span>
          </div>

          <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
            {selectedMatch.summary}
          </p>

          {/* Comparative Data Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-white">Expected Goals (xG) Supremacy</span>
                <span className="text-[#00B2A9] font-mono">
                  LFC {selectedMatch.teamXg} - {selectedMatch.opponentXg} {selectedMatch.opponent}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#0D0D10] rounded-full overflow-hidden flex border border-[#262630]">
                <div
                  className="bg-[#C8102E] h-full transition-all duration-500"
                  style={{
                    width: `${(selectedMatch.teamXg / (selectedMatch.teamXg + selectedMatch.opponentXg)) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-[#383846] h-full transition-all duration-500"
                  style={{
                    width: `${(selectedMatch.opponentXg / (selectedMatch.teamXg + selectedMatch.opponentXg)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-white">Possession Control</span>
                <span className="text-[#F6EB61] font-mono">{selectedMatch.possession}%</span>
              </div>
              <div className="w-full h-2 bg-[#0D0D10] rounded-full overflow-hidden border border-[#262630]">
                <div
                  className="bg-[#00B2A9] h-full transition-all duration-500"
                  style={{ width: `${selectedMatch.possession}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1/3 Right Column: On-Ball Value (OBV) Leaderboard & Historical Metrics */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        {/* Match Key Index Box */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#F6EB61]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Historic Tactical Profile
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#0D0D10] p-3 rounded-xl border border-[#262630]">
              <span className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Defensive PPDA</span>
              <div className="text-lg font-black text-[#00B2A9] font-mono mt-0.5">
                {selectedMatch.ppda}
              </div>
              <span className="text-[9px] text-[#9CA3AF]">Aggressive press intensity</span>
            </div>

            <div className="bg-[#0D0D10] p-3 rounded-xl border border-[#262630]">
              <span className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Match Result</span>
              <div className="text-lg font-black text-[#C8102E] font-mono mt-0.5">
                {selectedMatch.score}
              </div>
              <span className="text-[9px] text-[#F6EB61]">Historic Trophy Win</span>
            </div>
          </div>
        </div>

        {/* Top Performers by On-Ball Value (OBV) */}
        <div className="bg-[#141419] rounded-2xl border border-[#262630] p-4 shadow-lg flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#C8102E]" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                On-Ball Value (OBV) Leaders
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#00B2A9]">Ranked Net Impact</span>
          </div>

          <div className="space-y-2.5">
            {selectedMatch.topPerformers.map((player, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#0D0D10] border border-[#262630] flex flex-col gap-1 hover:border-[#C8102E]/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#141419] border border-[#262630] text-[10px] font-bold font-mono text-white flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{player.name}</span>
                  </div>
                  <span className="text-xs font-mono font-black text-[#00B2A9] bg-[#00B2A9]/10 px-2 py-0.5 rounded border border-[#00B2A9]/20">
                    +{player.obv.toFixed(2)} OBV
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] pl-7">
                  <span>{player.role}</span>
                </div>
                <p className="text-[10px] text-[#9CA3AF] pl-7 italic">
                  {player.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
