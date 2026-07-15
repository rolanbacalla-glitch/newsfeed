"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoryCard from "../components/StoryCard";
import styles from "./page.module.css";

const TeamCrest = ({ teamName }) => {
  const name = teamName ? teamName.toLowerCase() : "";
  if (name.includes("liverpool")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 20%)" />
          <path d="M16 3.5C11 3.5 8 6.5 8 11.5c0 7 5 14 8 16.5 3-2.5 8-9.5 8-16.5 0-5-3-8-8-8z" fill="#fff" opacity="0.15" />
          {/* Stylized Liverbird silhouette in monochrome */}
          <path d="M16 8.5c-.3 0-.6.1-.7.4-.2.4-.2.8-.1 1.2l.3.8-.5.4c-.4.3-.5.7-.3 1.1.2.4.6.6 1 .5l.7-.1.2.6c.1.4.5.7.9.6.4-.1.6-.5.5-.9l-.2-.8.5-.3c.4-.3.5-.7.3-1.1-.1-.3-.4-.5-.7-.6l-.7.1-.2-.6c-.1-.4-.5-.7-.9-.6z" fill="hsl(0, 0%, 90%)" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("sunderland")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 30%)" />
          {/* Monochrome stripes */}
          <path d="M11 6v14M16 4.5v17.5M21 6v14" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 60%)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("wrexham")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 40%)" />
          <circle cx="16" cy="16.5" r="5" fill="hsl(0, 0%, 20%)" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("arsenal")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 25%)" />
          {/* Cannon shape */}
          <path d="M11 16h8M19 14.5v3M13 14.5v3" stroke="hsl(0, 0%, 90%)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2.5" stroke="hsl(0, 0%, 90%)" strokeWidth="1.5" fill="none" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("leeds")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="#ffffff" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 20%)" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (name.includes("monaco")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 35%)" />
          <path d="M7 11l18 18V11H7z" fill="#ffffff" opacity="0.3" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 60%)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("como")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 15%)" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("newcastle")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="#ffffff" />
          <path d="M10 6v14M16 4.5v17.5M22 6v14" stroke="hsl(0, 0%, 10%)" strokeWidth="3" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 50%)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (name.includes("nottingham") || name.includes("forest")) {
    return (
      <div className={styles.crestWrapper}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 30%)" />
          {/* Tree shape */}
          <path d="M16 8l-5 6h3v5h4v-5h3l-5-6z" fill="#ffffff" />
          <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  return (
    <div className={styles.crestWrapper}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" fill="hsl(0, 0%, 50%)" />
        <path d="M16 2.5C10 2.5 7 5.5 7 11c0 8 6 15.5 9 18.5 3-3 9-10.5 9-18.5 0-5.5-3-8.5-9-8.5z" stroke="hsl(0, 0%, 80%)" strokeWidth="1.5" />
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
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  
  // Live Feed Data State
  const [feed, setFeed] = useState([]);
  
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
    const savedTheme = localStorage.getItem("theme") || "light";
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
            <span className={styles.statusDot}></span>
            <span className={styles.statsText}>
              Anfield Engine: {loading ? <strong>Updating Feed...</strong> : <strong>Live Stream</strong>} &bull; Clustered{" "}
              <strong>{totalNarratives}</strong> LFC narratives from{" "}
              <strong>{totalPublishers}</strong> newsrooms
            </span>
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
