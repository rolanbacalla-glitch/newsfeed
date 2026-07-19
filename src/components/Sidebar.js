"use client";

import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({
  activeTopic,
  setActiveTopic,
  activeCategory,
  setActiveCategory,
  theme,
  setTheme
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
          className={styles.navIconSvg}
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
          className={styles.topicLogo}
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
          className={styles.topicLogo}
          style={theme === "dark" ? { filter: "invert(1) brightness(1.5)" } : undefined}
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
          className={styles.topicLogo}
          style={theme === "dark" ? { filter: "invert(1) brightness(1.5)" } : undefined}
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

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Liver_bird.svg"
            alt="Redline Logo"
            className={styles.logoIconImage}
          />
        </span>
        <h1 className={styles.logoText}>
          RED<span>LINE</span>
        </h1>
        <span className={styles.logoTag}>LFC</span>
      </div>

      <nav className={styles.navGroup}>
        <h2 className={styles.navHeading}>Topics</h2>
        <ul className={styles.navList}>
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                className={`${styles.navButton} ${
                  activeTopic === topic.id ? styles.active : ""
                }`}
                onClick={() => setActiveTopic(topic.id)}
              >
                <span className={styles.navIcon}>{topic.icon}</span>
                <span className={styles.navName}>{topic.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <nav className={styles.navGroup}>
        <h2 className={styles.navHeading}>Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryPill} ${
                activeCategory === cat ? styles.activeCategory : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.footer}>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          <span className={styles.themeIcon}>{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className={styles.themeLabel}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
        <p className={styles.footerCredits}>YOU'LL NEVER WALK ALONE</p>
      </div>
    </aside>
  );
}
