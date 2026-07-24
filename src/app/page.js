"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import styles from "./page.module.css";

// ─── Team data: real crest URLs + theme-aware name colours ────────────────────
// Crest images: football-data.org public CDN (free, no auth needed).
// darkText  = vivid shade for dark backgrounds
// lightText = deep/muted shade for light backgrounds
const TEAM_DATA = {
  liverpool: { crest: "https://crests.football-data.org/64.png", darkText: "#FF4D6A", lightText: "#A00D24", glow: "rgba(200,16,46,0.5)" },
  sunderland: { crest: "https://crests.football-data.org/394.png", darkText: "#FF5566", lightText: "#9A000E", glow: "rgba(235,23,43,0.45)" },
  wrexham: { crest: "https://crests.football-data.org/8650.png", darkText: "#FF6B80", lightText: "#9B0000", glow: "rgba(220,20,60,0.4)" },
  arsenal: { crest: "https://crests.football-data.org/57.png", darkText: "#FF5055", lightText: "#9A0005", glow: "rgba(239,1,7,0.45)" },
  leeds: { crest: "https://crests.football-data.org/341.png", darkText: "#FFD700", lightText: "#1D428A", glow: "rgba(255,205,0,0.5)" },
  monaco: { crest: "https://crests.football-data.org/1903.png", darkText: "#FF5566", lightText: "#8B000C", glow: "rgba(206,17,38,0.45)" },
  como: { crest: "https://crests.football-data.org/5890.png", darkText: "#6699FF", lightText: "#001A66", glow: "rgba(0,51,153,0.45)" },
  newcastle: { crest: "https://crests.football-data.org/67.png", darkText: "#E0E0E0", lightText: "#241F20", glow: "rgba(200,200,200,0.3)" },
  nottingham: { crest: "https://crests.football-data.org/351.png", darkText: "#FF5555", lightText: "#880000", glow: "rgba(221,0,0,0.45)" },
  forest: { crest: "https://crests.football-data.org/351.png", darkText: "#FF5555", lightText: "#880000", glow: "rgba(221,0,0,0.45)" },
  default: { crest: null, darkText: "#9CA3AF", lightText: "#374151", glow: "rgba(107,114,128,0.3)" },
};

function getTeamData(teamName) {
  const n = (teamName || "").toLowerCase();
  for (const [key, val] of Object.entries(TEAM_DATA)) {
    if (key !== "default" && n.includes(key)) return val;
  }
  return TEAM_DATA.default;
}

function getTeamNameColor(data, isDark) {
  return isDark ? data.darkText : data.lightText;
}

// ─── TeamCrest: real badge image with coloured glow ───────────────────────────
const TeamCrest = ({ teamName }) => {
  const data = getTeamData(teamName);
  const [imgError, setImgError] = React.useState(false);

  if (data.crest && !imgError) {
    return (
      <div
        className="w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110"
        style={{ filter: `drop-shadow(0 0 8px ${data.glow})` }}
      >
        <img
          src={data.crest}
          alt={`${teamName} crest`}
          width={38}
          height={38}
          className="object-contain block"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: generic shield
  return (
    <div
      className="w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110"
      style={{ filter: `drop-shadow(0 0 6px ${data.glow})` }}
    >
      <svg width="38" height="38" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="#374151" />
        <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#9CA3AF" strokeWidth="1.5" />
      </svg>
    </div>
  );
};


const formatKickoffDate = (isoString) => {
  if (!isoString) return "";
  try {
    const displayDate = new Date(isoString);
    const weekday = displayDate.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
    const day = displayDate.getDate();
    const month = displayDate.toLocaleDateString("en-GB", { month: "long" }).toUpperCase();
    const hoursMins = displayDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });
    return `${weekday} ${day} ${month} — ${hoursMins}`;
  } catch (e) {
    return "";
  }
};

function MatchCenterBanner({ match, countdownValues }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Auto-expand stats dashboard if match is LIVE
  useEffect(() => {
    if (match?.status === "LIVE") {
      setIsExpanded(true);
    }
  }, [match?.status]);

  if (!match) return null;

  const currentStats = match.stats?.[activeTab] || match.stats?.general || [];
  const tabs = [
    { id: "general", label: "GENERAL" },
    { id: "distribution", label: "DISTRIBUTION" },
    { id: "attack", label: "ATTACK" },
    { id: "defence", label: "DEFENCE" },
    { id: "discipline", label: "DISCIPLINE" },
    { id: "var", label: "VAR" },
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-red-600/90 via-red-700/90 to-red-800/90 dark:from-red-950/85 dark:via-red-900/85 dark:to-neutral-950/90 backdrop-blur-md rounded-2xl border border-red-500/20 overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 mb-20">
      {/* Banner Header Bar with Toggle */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-b border-white/10 bg-black/25">
        <div className="flex items-center gap-4">
          <span
            className="rounded-full text-[9px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/15 shadow-inner inline-flex items-center justify-center whitespace-nowrap leading-none shrink-0"
            style={{ padding: "10px 20px" }}
          >
            {match.competition}
          </span>
          <span className="text-[10px] text-red-100 dark:text-red-300 font-bold uppercase tracking-wider hidden sm:inline">
            {formatKickoffDate(match.kickoffISO)}
          </span>
          {match.status === "LIVE" && (
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full animate-pulse shadow-md">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              LIVE • {match.matchTime}
            </span>
          )}
        </div>

        {/* Sleek Toggle Button: [ Compact Score ] / [ Expand Stats ] */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all duration-200 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm cursor-pointer"
        >
          <span>{isExpanded ? "Compact Score" : "Expand Stats"}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* COMPACT VIEW (Design 1 Header Ticker with Generous Consistent Padding) */}
      {!isExpanded ? (
        <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 text-center relative">
          {/* Teams & Scoreboard horizontal ticker Centered */}
          <div className="flex items-center gap-4 sm:gap-8 justify-center max-w-2xl w-full mx-auto">
            {/* Home team */}
            <div className="flex items-center gap-3 justify-end flex-1 min-w-0">
              <span className="text-base sm:text-lg font-black text-white truncate text-right">
                {match.homeTeam}
              </span>
              <TeamCrest teamName={match.homeTeam} size="md" />
            </div>

            {/* Score / VS capsule */}
            <div className="shrink-0 flex items-center justify-center">
              {match.status === "LIVE" || match.status === "FINISHED" ? (
                <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-5 py-2 rounded-xl font-mono text-lg sm:text-xl font-black text-white shadow-inner">
                  <span>{match.homeScore}</span>
                  <span className="text-white/40 font-normal">:</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <div className="bg-black/30 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-black text-white uppercase tracking-widest">
                  VS
                </div>
              )}
            </div>

            {/* Away team */}
            <div className="flex items-center gap-3 justify-start flex-1 min-w-0">
              <TeamCrest teamName={match.awayTeam} size="md" />
              <span className="text-base sm:text-lg font-black text-white truncate text-left">
                {match.awayTeam}
              </span>
            </div>
          </div>

          {/* Status / Countdown segment */}
          <div className="shrink-0 flex items-center gap-2 md:absolute md:right-8">
            {match.status === "SCHEDULED" && countdownValues ? (
              <div className="flex items-center gap-2.5">
                <span className="text-[9px] font-black text-white/60 tracking-wider">KICKOFF IN:</span>
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 font-mono text-xs font-bold text-white">
                  <span>{countdownValues.days}d</span>
                  <span>{countdownValues.hours}h</span>
                  <span>{countdownValues.minutes}m</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white">
                <span className={`w-1.5 h-1.5 rounded-full ${match.status === "LIVE" ? "bg-red-500 animate-pulse" : "bg-white/40"}`}></span>
                <span>{match.status === "LIVE" ? "LIVE" : "FT"}</span>
                {match.matchTime && <span className="text-white/60 border-l border-white/20 pl-1.5">{match.matchTime}</span>}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* EXPANDED MATCH STATS DASHBOARD (Design 2) */
        <div className="p-5 md:p-8 flex flex-col items-center justify-center gap-6">
          {/* Header Title: MATCH STATS */}
          <div className="flex flex-col items-center text-center gap-1">
            <h2 className="text-sm md:text-base font-black text-white uppercase tracking-widest">
              MATCH STATS
            </h2>
          </div>

          {/* Top Scoreboard Section matching Design 2 */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3 bg-black/20 p-5 rounded-2xl border border-white/10 shadow-lg">
            <div className="w-full flex items-center justify-between gap-4">
              {/* Home Crest */}
              <div className="shrink-0">
                <TeamCrest teamName={match.homeTeam} size="lg" />
              </div>

              {/* Centered Team Names & Score */}
              <div className="flex items-center gap-3 font-heading font-black text-white text-base sm:text-xl justify-center flex-1">
                <span className="truncate text-right max-w-[120px] sm:max-w-none">{match.homeTeam}</span>
                <div className="flex items-center gap-2 bg-neutral-900/90 px-3.5 py-1.5 rounded-xl border border-white/15 shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">{match.homeScore}</span>
                  <span className="text-white/30 text-lg font-light">:</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">{match.awayScore}</span>
                </div>
                <span className="truncate text-left max-w-[120px] sm:max-w-none">{match.awayTeam}</span>
              </div>

              {/* Away Crest */}
              <div className="shrink-0">
                <TeamCrest teamName={match.awayTeam} size="lg" />
              </div>
            </div>

            {/* Competition & Date Centered Sub-header */}
            <div className="flex flex-col items-center gap-0.5 text-center pt-1 border-t border-white/5 w-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-200/90 dark:text-red-300/90">
                {match.competition}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">
                {formatKickoffDate(match.kickoffISO)}
              </span>
            </div>
          </div>

          {/* Interactive Category Tabs Centered: GENERAL, DISTRIBUTION, ATTACK, DEFENCE, DISCIPLINE, VAR */}
          <div className="w-full max-w-2xl flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-center border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                    : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Real-time Match Statistics Comparison Bars Centered */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full pt-1">
            {currentStats.map((st, i) => (
              <div key={i} className="flex flex-col items-center gap-1 w-full">
                {/* Metric Label Centered */}
                <span className="text-[10px] uppercase font-black tracking-widest text-white/90 text-center">
                  {st.label}
                </span>

                {/* Progress Bar & Values Row */}
                <div className="flex items-center gap-4 w-full">
                  <span className="font-mono text-white font-black text-sm w-12 text-right shrink-0">{st.home}</span>
                  
                  {/* Split Dual-Color Progress Bar */}
                  <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden flex items-center p-0.5 border border-white/10 shadow-inner">
                    <div
                      className="h-full bg-red-500 rounded-l-full transition-all duration-500"
                      style={{ width: `${(st.homeVal / (st.homeVal + st.awayVal || 1)) * 100}%` }}
                    />
                    <div
                      className="h-full bg-zinc-900/90 rounded-r-full transition-all duration-500"
                      style={{ width: `${(st.awayVal / (st.homeVal + st.awayVal || 1)) * 100}%` }}
                    />
                  </div>

                  <span className="font-mono text-white font-black text-sm w-12 text-left shrink-0">{st.away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Live Feed Data State
  const [feed, setFeed] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(300);

  // Scoreboard match state
  const [match, setMatch] = useState(null);

  // Fetch live match scoreboard
  useEffect(() => {
    let active = true;
    const fetchMatch = async () => {
      try {
        const res = await fetch("/api/match");
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setMatch(data);
          }
        }
      } catch (err) {
        console.error("Error fetching match scores:", err);
      }
    };

    if (mounted) {
      fetchMatch();
      // Poll scoreboard every 1 minute
      const interval = setInterval(fetchMatch, 60000);
      return () => {
        active = false;
        clearInterval(interval);
      };
    }
  }, [mounted]);

  // Client-side match countdown logic
  const [countdownValues, setCountdownValues] = useState(null);

  useEffect(() => {
    if (!match || match.status !== "SCHEDULED" || !match.kickoffISO) {
      setCountdownValues(null);
      return;
    }

    const targetTime = new Date(match.kickoffISO).getTime();

    const updateCountdown = () => {
      const nowTime = new Date().getTime();
      const diff = targetTime - nowTime;

      if (diff <= 0) {
        setCountdownValues(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdownValues({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [match]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize theme from localStorage on client side mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, []);

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  };

  // Fetch live feed data when activeTopic or mount status changes
  useEffect(() => {
    let active = true;

    const fetchNews = async (isSilent = false) => {
      if (!isSilent) {
        setLoading(true);
        setError(null);
      } else {
        setIsRefreshing(true);
      }
      try {
        const queryTopic = activeTopic === "all" ? "Liverpool FC" : activeTopic;
        const res = await fetch(`/api/news?topic=${encodeURIComponent(queryTopic)}`);
        if (!res.ok) {
          throw new Error(`Failed to load feeds: Server returned code ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        if (active) {
          setFeed(data);
          setLastUpdated(new Date());
          setRefreshCountdown(300);
        }
      } catch (err) {
        console.error(err);
        if (!isSilent && active) {
          setError(err.message || "An unexpected error occurred while fetching news.");
        }
      } finally {
        if (!isSilent && active) {
          setLoading(false);
        }
        if (active) {
          setIsRefreshing(false);
        }
      }
    };

    if (mounted) {
      fetchNews(false);

      // Poll silently every 5 minutes (300,000 ms)
      const interval = setInterval(() => {
        fetchNews(true);
      }, 5 * 60 * 1000);

      return () => {
        active = false;
        clearInterval(interval);
      };
    }
  }, [activeTopic, mounted]);

  // Countdown timer — ticks every second, resets when refreshCountdown is reset
  useEffect(() => {
    if (refreshCountdown <= 0) return;
    const t = setTimeout(() => setRefreshCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(t);
  }, [refreshCountdown]);

  // Manual refresh handler
  const handleManualRefresh = async () => {
    if (isRefreshing || loading) return;
    setIsRefreshing(true);
    try {
      const queryTopic = activeTopic === "all" ? "Liverpool FC" : activeTopic;
      const res = await fetch(`/api/news?topic=${encodeURIComponent(queryTopic)}`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setFeed(data);
      setLastUpdated(new Date());
      setRefreshCountdown(300);
    } catch (err) {
      console.error("Manual refresh error:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Helper to format the last-updated time
  const formatLastUpdated = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  // Helper to format countdown as mm:ss
  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Client-side search and category filtering
  const filteredFeed = feed.filter((story) => {
    // Category filter
    const matchesCategory =
      activeCategory === "All" ||
      story.category.toLowerCase() === activeCategory.toLowerCase();

    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      story.primary_headline.toLowerCase().includes(searchLower) ||
      story.summary.toLowerCase().includes(searchLower) ||
      story.primary_source.name.toLowerCase().includes(searchLower) ||
      story.category.toLowerCase().includes(searchLower) ||
      story.sub_topic.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  // Chronological categorisation buckets
  const hotCoverage = filteredFeed.filter((story) => story.urgency_level === "high");
  const standardFeed = filteredFeed.filter((story) => story.urgency_level !== "high");

  // Calculate statistics from the fetched feed
  const totalNarratives = feed.length;
  const totalPublishers = new Set(
    feed.flatMap((s) => [s.primary_source.name, ...s.secondary_sources.map((sec) => sec.name)])
  ).size;

  if (!mounted) {
    return <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}></div>;
  }

  return (
    <div className="app-container">
      <Navbar
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        theme={theme}
        setTheme={handleSetTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        isRefreshing={isRefreshing}
        totalNarratives={totalNarratives}
        totalPublishers={totalPublishers}
        lastUpdated={lastUpdated}
        refreshCountdown={refreshCountdown}
        handleManualRefresh={handleManualRefresh}
      />

      <main className="flex-1 flex flex-col relative bg-bg-app min-w-0">

        {/* Main Feed Container */}
        <section className="container-bounded flex-1" style={{ paddingTop: "2.5rem", paddingBottom: "3rem" }}>

          {/* Feed Header */}
          <div style={{ marginBottom: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border-color)" }}>
            <h2 className="font-heading text-2xl md:text-3xl font-black tracking-tight text-text-primary">
              {activeTopic === "all" ? "The Anfield Feed" : activeTopic}
            </h2>
            <p className="text-xs md:text-sm text-text-muted mt-1 font-medium">
              Aggregated real-time coverage from Anfield and global sports desks.
            </p>

            {/* Display active filter tags if applicable */}
            {(activeTopic !== "all" || activeCategory !== "All" || searchQuery !== "") && (
              <div className="flex flex-wrap gap-2" style={{ marginTop: '1rem' }}>
                {activeTopic !== "all" && (
                  <span className="bg-accent-glow text-accent border border-border-active/40 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    Topic: {activeTopic}
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="bg-accent-glow text-accent border border-border-active/40 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    Type: {activeCategory}
                  </span>
                )}
                {searchQuery !== "" && (
                  <span className="bg-accent-glow text-accent border border-border-active/40 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    Search: "{searchQuery}"
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Broadcast Scoreboard Banner with Expand/Collapse Match Center */}
          <MatchCenterBanner match={match} countdownValues={countdownValues} />

          {/* Feed Content rendering states */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.5rem" }}>
              <div className="h-44 rounded-2xl bg-bg-card animate-pulse border border-border-color"></div>
              <div className="h-44 rounded-2xl bg-bg-card animate-pulse border border-border-color"></div>
              <div className="h-44 rounded-2xl bg-bg-card animate-pulse border border-border-color"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-2xl text-center">
              <h3 className="font-heading text-lg font-bold mb-2">Failed to load feeds</h3>
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredFeed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center text-text-muted">
              <div className="text-5xl mb-4">🔴</div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">No matching LFC headlines</h3>
              <p className="text-sm max-w-sm leading-relaxed">
                We couldn't find any clustered narratives matching your search criteria. Walk on with hope, or try resetting the search bar.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {/* Render Hot Coverage Bucket */}
              {hotCoverage.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Section label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                    <span className="font-heading text-xs font-black uppercase tracking-widest text-accent" style={{ flexShrink: 0 }}>
                      🔥 Hot Coverage
                    </span>
                    <div style={{ height: "1px", background: "var(--border-color)", flex: 1 }}></div>
                  </div>
                  {/* Hot cards — stacked with 20px gap */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {hotCoverage.map((story) => (
                      <StoryCard key={story.narrative_id} story={story} />
                    ))}
                  </div>
                </div>
              )}

              {/* Render Standard Timeline Bucket */}
              {standardFeed.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* Section label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                    <span className="font-heading text-xs font-black uppercase tracking-widest text-accent" style={{ flexShrink: 0 }}>
                      🕒 LFC Timeline Stream
                    </span>
                    <div style={{ height: "1px", background: "var(--border-color)", flex: 1 }}></div>
                  </div>
                  {/* 3-col responsive grid */}
                  <div className="feed-grid">
                    {standardFeed.map((story) => (
                      <StoryCard key={story.narrative_id} story={story} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
