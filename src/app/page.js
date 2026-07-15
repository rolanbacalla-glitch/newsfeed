"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoryCard from "../components/StoryCard";
import styles from "./page.module.css";

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
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    if (!match || match.status !== "SCHEDULED" || !match.kickoffISO) {
      setCountdownText("");
      return;
    }

    const targetTime = new Date(match.kickoffISO).getTime();

    const updateCountdown = () => {
      const nowTime = new Date().getTime();
      const diff = targetTime - nowTime;

      if (diff <= 0) {
        setCountdownText("Match starting...");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let text = "";
      if (days > 0) text += `${days}d `;
      if (hours > 0 || days > 0) text += `${hours}h `;
      text += `${minutes}m ${seconds}s`;
      setCountdownText(text);
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
              <div className={styles.scoreboardMain}>
                <div className={styles.scoreboardLeft}>
                  <span className={styles.scoreboardCompetition}>
                    {match.competition} &bull; {match.formattedDate}
                  </span>
                  <div className={styles.scoreboardTeams}>
                    <span className={`${styles.teamName} ${match.homeTeam === "Liverpool" ? styles.highlightLfc : ""}`}>
                      {match.homeTeam}
                    </span>
                    <span className={styles.scoreDisplay}>
                      {match.status === "SCHEDULED" ? "v" : `${match.homeScore} - ${match.awayScore}`}
                    </span>
                    <span className={`${styles.teamName} ${match.awayTeam === "Liverpool" ? styles.highlightLfc : ""}`}>
                      {match.awayTeam}
                    </span>
                  </div>
                </div>
                <div className={styles.scoreboardRight}>
                  <div className={styles.scoreboardRightRow}>
                    {match.status === "LIVE" && <span className={styles.liveBadge}>LIVE</span>}
                    <span className={styles.timeBadge}>{match.matchTime}</span>
                  </div>
                </div>
              </div>
              {countdownText && (
                <div className={styles.scoreboardCountdownRow}>
                  <span className={styles.countdownIcon}>⏱️</span>
                  <span>Match kicks off in: <strong className={styles.countdownValue}>{countdownText}</strong></span>
                </div>
              )}
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
