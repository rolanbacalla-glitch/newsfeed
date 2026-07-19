"use client";

import React from "react";

export default function Navbar({
  activeTopic,
  setActiveTopic,
  activeCategory,
  setActiveCategory,
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  loading,
  isRefreshing,
  totalNarratives,
  totalPublishers,
  lastUpdated,
  refreshCountdown,
  handleManualRefresh
}) {
  const topics = [
    {
      id: "all",
      name: "All Topics",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      id: "Liverpool FC",
      name: "Liverpool FC",
      icon: (
        <img
          src="https://crests.football-data.org/64.png"
          alt="Liverpool FC"
          className="w-4 h-4 object-contain"
        />
      )
    },
    {
      id: "Premier League",
      name: "Premier League",
      icon: (
        <img
          src="https://crests.football-data.org/PL.png"
          alt="Premier League"
          className={`w-4 h-4 object-contain ${theme === "dark" ? "invert brightness-[1.5]" : ""}`}
        />
      )
    },
    {
      id: "Champions League",
      name: "Champions League",
      icon: (
        <img
          src="https://crests.football-data.org/CL.png"
          alt="Champions League"
          className={`w-4 h-4 object-contain ${theme === "dark" ? "invert brightness-[1.5]" : ""}`}
        />
      )
    }
  ];

  const categories = [
    "All",
    "Match Report",
    "Transfer",
    "Injury",
    "Club News",
    "Analysis",
    "Opinion"
  ];

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Helper to format last updated time
  const formatLastUpdated = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  // Helper to format countdown
  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <header className="w-full bg-bg-sidebar border-b border-border-color sticky top-0 z-50 transition-colors duration-300">
      {/* Upper row: Brand, Search, Control desk */}
      <div className="container-bounded h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0 group select-none">
          <span className="w-8 h-8 flex items-center justify-center bg-accent-glow rounded-xl p-1.5 border border-border-color transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-sm">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Liver_bird.svg"
              alt="Redline Logo"
              className="w-full h-full object-contain filter invert-[12%] sepia-[95%] saturate-[5453%] hue-rotate-[352deg] brightness-[89%] contrast-[92%]"
            />
          </span>
          <h1 className="font-heading text-lg md:text-xl font-black tracking-tight text-text-primary hidden sm:block">
            RED<span className="text-red-600 dark:text-red-500 font-extrabold">LINE</span>
          </h1>
          <span className="text-[9px] font-black tracking-wider bg-red-600/10 text-red-600 dark:text-red-500 px-2 py-0.5 rounded uppercase border border-red-500/10">
            LFC
          </span>
        </div>

        {/* Unified Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted select-none pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search LFC headlines, sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-app border border-border-color text-text-primary pl-9 pr-4 py-2 rounded-xl text-xs font-sans outline-none focus:border-accent focus:ring-2 focus:ring-accent-glow transition-all duration-200"
            id="search-input-navbar"
          />
        </div>

        {/* Right side desk: Stats indicator & refresh controls & theme */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* Feed engine status details */}
          <div className="hidden lg:flex items-center gap-2.5 text-xs font-semibold text-text-muted bg-bg-app/40 border border-border-color/60 px-3.5 py-1.5 rounded-xl">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isRefreshing ? "bg-blue-400" : ""}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 bg-emerald-500 ${isRefreshing ? "bg-blue-500" : ""}`}></span>
            </span>
            <span>
              {loading ? "Updating Feed..." : "Live Feed"} &bull; <strong className="text-text-secondary">{totalNarratives}</strong> narratives
            </span>
            {!loading && lastUpdated && (
              <span className="text-text-muted border-l border-border-color/80 pl-2.5 ml-1">
                Updated {formatLastUpdated(lastUpdated)} &bull; Next in <span className="font-mono text-red-600 dark:text-red-500 font-bold">{formatCountdown(refreshCountdown)}</span>
              </span>
            )}
          </div>

          {/* Controls: manual refresh button & theme toggle */}
          <div className="flex items-center gap-2">
            <button
              id="navbar-refresh-btn"
              className={`flex items-center justify-center w-9 h-9 rounded-xl border border-border-color bg-bg-app text-text-muted hover:bg-accent-glow hover:text-accent hover:border-border-active active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 ${isRefreshing ? "animate-spin" : ""}`}
              onClick={handleManualRefresh}
              disabled={loading || isRefreshing}
              title="Refresh feed now"
              aria-label="Refresh news feed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-border-color bg-bg-app text-text-primary hover:bg-bg-card-hover hover:border-border-active active:scale-95 transition-all duration-200"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              <span className="text-sm">{theme === "dark" ? "☀️" : "🌙"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower row: Topics tabs (Left) & Category pills (Right) */}
      <div className="border-t border-border-color bg-bg-sidebar/80 backdrop-blur-md">
        <div className="container-bounded flex flex-col lg:flex-row lg:items-center justify-between py-2 gap-3">
          
          {/* Topics Navigation (Left) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-text-muted shrink-0 hidden sm:inline mr-1">
              Topics
            </span>
            <nav className="flex items-center gap-2">
              {topics.map((topic) => {
                const isActive = activeTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-accent-glow text-accent border-border-active font-bold"
                        : "bg-bg-app/40 text-text-secondary border-transparent hover:bg-bg-card hover:text-text-primary hover:border-border-color"
                    }`}
                  >
                    <span className="shrink-0">{topic.icon}</span>
                    <span>{topic.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Category Filter Pills (Right) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar lg:justify-end">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-text-muted shrink-0 mr-1">
              Filters
            </span>
            <div className="flex items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-text-primary text-bg-app border-text-primary font-bold shadow-sm"
                        : "bg-bg-app/40 hover:bg-bg-card text-text-secondary border-transparent hover:border-border-color"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
