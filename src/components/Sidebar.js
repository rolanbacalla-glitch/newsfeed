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
    { id: "all", name: "All Topics", icon: "🌐" },
    { id: "Liverpool FC", name: "Liverpool FC", icon: "🔴" },
    { id: "Premier League", name: "Premier League", icon: "🦁" },
    { id: "Champions League", name: "Champions League", icon: "⭐️" }
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
        <span className={styles.logoIcon}>🔴</span>
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
            {theme === "dark" ? "Parchment Light" : "Slate Dark"}
          </span>
        </button>
        <p className={styles.footerCredits}>YOU'LL NEVER WALK ALONE</p>
      </div>
    </aside>
  );
}
