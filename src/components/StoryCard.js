"use client";

import React, { useState } from "react";
import styles from "./StoryCard.module.css";

function getRelativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function StoryCard({ story }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case "transfer":
        return "badge-transfer";
      case "injury":
        return "badge-injury";
      case "analysis":
        return "badge-analysis";
      case "opinion":
        return "badge-opinion";
      case "match report":
        return "badge-match-report";
      case "club news":
        return "badge-club-news";
      default:
        return "";
    }
  };

  const hasSecondarySources = story.secondary_sources && story.secondary_sources.length > 0;

  return (
    <article className={`${styles.card} glass fade-in`}>
      <div className={styles.cardHeader}>
        <div className={styles.badgeRow}>
          <span className={`badge ${getBadgeClass(story.category)}`}>
            {story.category}
          </span>
          <span className={styles.subTopicBadge}>{story.sub_topic}</span>
        </div>

        <div className={styles.rightHeader}>
          {story.urgency_level === "high" && (
            <span className={styles.urgencyBadge} title="High coverage urgency">
              ⚠️ HOT
            </span>
          )}
          <span className={styles.timeText}>
            {getRelativeTime(story.primary_source.published_at)}
          </span>
        </div>
      </div>

      <a
        href={story.primary_source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.titleLink}
      >
        <h3 className={styles.headline}>{story.primary_headline}</h3>
      </a>

      <p className={styles.summary}>{story.summary}</p>

      <div className={styles.sourceFooter}>
        <div className={styles.primarySourceInfo}>
          <span className={styles.sourceDot}></span>
          <span className={styles.sourceName}>
            Primary Source: <strong>{story.primary_source.name}</strong>
          </span>
        </div>

        {hasSecondarySources && (
          <button
            className={`${styles.expandButton} ${isExpanded ? styles.expanded : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>
              {isExpanded
                ? "Hide coverage"
                : `+ ${story.secondary_sources.length} other sources`}
            </span>
            <span className={styles.arrowIcon}>↓</span>
          </button>
        )}
      </div>

      {hasSecondarySources && isExpanded && (
        <div className={styles.coverageDropdown}>
          <h4 className={styles.dropdownHeading}>Alternate Coverage</h4>
          <ul className={styles.secondaryList}>
            {story.secondary_sources.map((sec, idx) => (
              <li key={idx} className={styles.secondaryItem}>
                <a
                  href={sec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryLink}
                >
                  <span className={styles.secondarySource}>{sec.name}</span>
                  <span className={styles.secondaryTitle}>
                    {story.primary_headline.substring(0, 45)}... (View report)
                  </span>
                  <span className={styles.secondaryTime}>
                    {getRelativeTime(sec.published_at)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
