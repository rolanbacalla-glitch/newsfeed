"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoryCard from "../components/StoryCard";
import styles from "./page.module.css";

// ─── Team colour palette ──────────────────────────────────────────────────────
const TEAM_COLOURS = {
  liverpool:    { primary: "#C8102E", secondary: "#F6EB61", glow: "rgba(200,16,46,0.55)" },
  sunderland:   { primary: "#EB172B", secondary: "#000000", glow: "rgba(235,23,43,0.45)" },
  wrexham:      { primary: "#DC143C", secondary: "#ffffff", glow: "rgba(220,20,60,0.45)" },
  arsenal:      { primary: "#EF0107", secondary: "#ffffff", glow: "rgba(239,1,7,0.45)" },
  leeds:        { primary: "#FFCD00", secondary: "#1D428A", glow: "rgba(255,205,0,0.5)"  },
  monaco:       { primary: "#CE1126", secondary: "#ffffff", glow: "rgba(206,17,38,0.45)" },
  como:         { primary: "#003399", secondary: "#ffffff", glow: "rgba(0,51,153,0.45)"  },
  newcastle:    { primary: "#241F20", secondary: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  nottingham:   { primary: "#DD0000", secondary: "#ffffff", glow: "rgba(221,0,0,0.45)"   },
  forest:       { primary: "#DD0000", secondary: "#ffffff", glow: "rgba(221,0,0,0.45)"   },
  default:      { primary: "#6b7280", secondary: "#ffffff", glow: "rgba(107,114,128,0.3)" },
};

function getTeamColours(teamName) {
  const n = (teamName || "").toLowerCase();
  for (const [key, val] of Object.entries(TEAM_COLOURS)) {
    if (key !== "default" && n.includes(key)) return val;
  }
  return TEAM_COLOURS.default;
}

const TeamCrest = ({ teamName }) => {
  const name = (teamName || "").toLowerCase();
  const colours = getTeamColours(teamName);

  // ── Liverpool ──
  if (name.includes("liverpool")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lfc-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#8B0A1A" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#lfc-shield)" />
          <path d="M16 3.5C11 3.5 8 6.5 8 11.5c0 7 5 14 8 16.5 3-2.5 8-9.5 8-16.5 0-5-3-8-8-8z" fill="#fff" opacity="0.1" />
          {/* Liverbird silhouette */}
          <path d="M16 8.5c-.3 0-.6.1-.7.4-.2.4-.2.8-.1 1.2l.3.8-.5.4c-.4.3-.5.7-.3 1.1.2.4.6.6 1 .5l.7-.1.2.6c.1.4.5.7.9.6.4-.1.6-.5.5-.9l-.2-.8.5-.3c.4-.3.5-.7.3-1.1-.1-.3-.4-.5-.7-.6l-.7.1-.2-.6c-.1-.4-.5-.7-.9-.6z" fill="#F6EB61" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#F6EB61" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // ── Sunderland ──
  if (name.includes("sunderland")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sun-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EB172B" />
              <stop offset="100%" stopColor="#9A0E1A" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#sun-shield)" />
          {/* Black & White vertical stripes clipped */}
          <path d="M11 6v14M16 4.5v17.5M21 6v14" stroke="#000000" strokeWidth="2.5" opacity="0.5" />
          <path d="M9.5 6v14M14.5 4.5v17.5M19.5 6v14" stroke="#ffffff" strokeWidth="1" opacity="0.35" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    );
  }

  // ── Wrexham ──
  if (name.includes("wrexham")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wrx-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DC143C" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#wrx-shield)" />
          <circle cx="16" cy="16.5" r="5" fill="#000000" opacity="0.4" />
          <circle cx="16" cy="16.5" r="3" fill="#ffffff" opacity="0.8" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    );
  }

  // ── Arsenal ──
  if (name.includes("arsenal")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="afc-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF0107" />
              <stop offset="100%" stopColor="#9A0005" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#afc-shield)" />
          {/* Cannon */}
          <path d="M10 16.5h12M21 14.5v4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="16" cy="16.5" rx="3" ry="2.5" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // ── Leeds ──
  if (name.includes("leeds")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lufc-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFCD00" />
              <stop offset="100%" stopColor="#C9A200" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#lufc-shield)" />
          <path d="M12 12h8M12 16h8M12 20h8" stroke="#1D428A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#1D428A" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // ── Monaco ──
  if (name.includes("monaco")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="asm-top" x1="7" y1="2.5" x2="25" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CE1126" />
              <stop offset="100%" stopColor="#8B000C" />
            </linearGradient>
          </defs>
          {/* Top half red */}
          <path d="M7 11c0-5.5 3-8.5 9-8.5s9 3 9 8.5v3H7v-3z" fill="url(#asm-top)" />
          {/* Bottom half white */}
          <path d="M7 14h18c0 8-6 15.5-9 15.5S7 22 7 14z" fill="#ffffff" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#CE1126" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    );
  }

  // ── Como ──
  if (name.includes("como")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="como-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#003399" />
              <stop offset="100%" stopColor="#001A66" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#como-shield)" />
          <path d="M12 10h8M12 15h8M12 20h8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#4477CC" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // ── Newcastle ──
  if (name.includes("newcastle")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left half black, right half white */}
          <clipPath id="nufc-clip">
            <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" />
          </clipPath>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="#ffffff" />
          <rect x="7" y="2.5" width="9" height="28" fill="#241F20" clipPath="url(#nufc-clip)" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#888" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // ── Nottingham Forest ──
  if (name.includes("nottingham") || name.includes("forest")) {
    return (
      <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 6px ${colours.glow})` }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nffc-shield" x1="7" y1="2.5" x2="25" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DD0000" />
              <stop offset="100%" stopColor="#880000" />
            </linearGradient>
          </defs>
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="url(#nffc-shield)" />
          {/* Tree */}
          <path d="M16 8l-4.5 5.5H14v5.5h4V13.5h2.5L16 8z" fill="#ffffff" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // ── Default ──
  return (
    <div className={styles.crestWrapper} style={{ filter: `drop-shadow(0 0 4px ${colours.glow})` }}>
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <Sidebar
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        theme={theme}
        setTheme={handleSetTheme}
      />

      <main className={styles.mainContent}>
        {/* Top Header Bar */}
        <header className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search headlines, sources, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              id="search-input"
            />
          </div>

          <div className={styles.statsIndicator}>
            <span className={`${styles.statusDot} ${isRefreshing ? styles.statusDotRefreshing : ""}`}></span>
            <span className={styles.statsText}>
              Anfield Engine: {loading ? <strong>Updating Feed...</strong> : <strong>Live Stream</strong>} &bull; Clustered{" "}
              <strong>{totalNarratives}</strong> LFC narratives from{" "}
              <strong>{totalPublishers}</strong> newsrooms
            </span>
            {!loading && lastUpdated && (
              <span className={styles.refreshMeta}>
                Updated {formatLastUpdated(lastUpdated)}
                <span className={styles.refreshCountdown}>
                  &nbsp;&bull; next in {formatCountdown(refreshCountdown)}
                </span>
              </span>
            )}
            <button
              id="manual-refresh-btn"
              className={`${styles.refreshBtn} ${isRefreshing ? styles.refreshBtnSpinning : ""}`}
              onClick={handleManualRefresh}
              disabled={loading || isRefreshing}
              title="Refresh feed now"
              aria-label="Refresh news feed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>
        </header>

        {/* Scrollable feed area */}
        <section className={styles.feedScrollContainer}>
          <div className={styles.feedHeader}>
            <div>
              <h2 className={styles.feedTitle}>
                {activeTopic === "all" ? "The Anfield Feed" : activeTopic}
              </h2>
              <p className={styles.feedSubtitle}>
                Aggregated real-time coverage from Anfield and global sports desks.
              </p>
            </div>

            {/* Display active filter tags if applicable */}
            {(activeTopic !== "all" || activeCategory !== "All" || searchQuery !== "") && (
              <div className={styles.activeFiltersRow}>
                {activeTopic !== "all" && (
                  <span className={styles.filterTag}>Topic: {activeTopic}</span>
                )}
                {activeCategory !== "All" && (
                  <span className={styles.filterTag}>Type: {activeCategory}</span>
                )}
                {searchQuery !== "" && (
                  <span className={styles.filterTag}>Search: "{searchQuery}"</span>
                )}
              </div>
            )}
          </div>

          {/* Match Scoreboard Banner */}
          {match && (
            <div className={styles.scoreboardGradientWrap}>
              <div className={styles.scoreboardContainer}>
              <div className={styles.scoreboardHeader}>
                <span className={styles.competitionLabel}>{match.competition}</span>
                <span className={styles.headerDetail}>
                  <span className={styles.headerDetailIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>{" "}
                  {formatKickoffDate(match.kickoffISO)}
                </span>
                {match.venue && (
                  <span className={styles.headerDetail}>
                    <span className={styles.headerDetailIcon}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>{" "}
                    {match.venue.toUpperCase()}
                  </span>
                )}
              </div>

              <div className={styles.scoreboardBody}>
                <div className={styles.teamsStackedList}>
                  <div className={styles.teamRow}>
                    <TeamCrest teamName={match.homeTeam} />
                    <span className={`${styles.teamNameStacked} ${match.homeTeam === "Liverpool" ? styles.highlightLfc : ""}`}>
                      {match.homeTeam}
                    </span>
                    {(match.status === "LIVE" || match.status === "FINISHED") && (
                      <span className={styles.teamScoreStacked}>{match.homeScore}</span>
                    )}
                  </div>
                  <div className={styles.teamRow}>
                    <TeamCrest teamName={match.awayTeam} />
                    <span className={`${styles.teamNameStacked} ${match.awayTeam === "Liverpool" ? styles.highlightLfc : ""}`}>
                      {match.awayTeam}
                    </span>
                    {(match.status === "LIVE" || match.status === "FINISHED") && (
                      <span className={styles.teamScoreStacked}>{match.awayScore}</span>
                    )}
                  </div>
                </div>

                {match.status === "SCHEDULED" && countdownValues ? (
                  <div className={styles.countdownColumn}>
                    <div className={styles.countdownItem}>
                      <span className={styles.countdownCircle}>{countdownValues.days}</span>
                      <span className={styles.countdownLabel}>DAYS</span>
                    </div>
                    <div className={styles.countdownItem}>
                      <span className={styles.countdownCircle}>{countdownValues.hours}</span>
                      <span className={styles.countdownLabel}>HRS</span>
                    </div>
                    <div className={styles.countdownItem}>
                      <span className={styles.countdownCircle}>{countdownValues.minutes}</span>
                      <span className={styles.countdownLabel}>MIN</span>
                    </div>
                    <div className={styles.countdownItem}>
                      <span className={styles.countdownCircle}>{countdownValues.seconds}</span>
                      <span className={styles.countdownLabel}>SEC</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.statusColumn}>
                    {match.status === "LIVE" ? (
                      <span className={styles.liveBadgeLarge}>LIVE</span>
                    ) : (
                      <span className={styles.finishedBadge}>FT</span>
                    )}
                    <span className={styles.matchTimeLabelLarge}>{match.matchTime}</span>
                  </div>
                )}
              </div>
            </div>
            </div>
          )}

          {loading ? (
            <div className={styles.skeletonList}>
              <div className={styles.skeletonCard}></div>
              <div className={styles.skeletonCard}></div>
              <div className={styles.skeletonCard}></div>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <h3 className={styles.errorTitle}>Failed to load feeds</h3>
              <p>{error}</p>
            </div>
          ) : filteredFeed.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔴</div>
              <h3 className={styles.emptyTitle}>No matching LFC headlines</h3>
              <p className={styles.emptyText}>
                We couldn't find any clustered narratives matching your search criteria. Walk on with hope, or try resetting the search bar.
              </p>
            </div>
          ) : (
            <div className={styles.feedList}>
              {/* Render Hot Coverage Bucket */}
              {hotCoverage.length > 0 && (
                <>
                  <div className={styles.timeDivider}>
                    <span className={styles.timeLabel}>🔥 Hot Coverage</span>
                    <span className={styles.timeLine}></span>
                  </div>
                  {hotCoverage.map((story) => (
                    <StoryCard key={story.narrative_id} story={story} />
                  ))}
                </>
              )}

              {/* Render Standard Timeline Bucket */}
              {standardFeed.length > 0 && (
                <>
                  <div className={styles.timeDivider}>
                    <span className={styles.timeLabel}>🕒 LFC Timeline Stream</span>
                    <span className={styles.timeLine}></span>
                  </div>
                  {standardFeed.map((story) => (
                    <StoryCard key={story.narrative_id} story={story} />
                  ))}
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
