"use client";

import React, { useState } from "react";

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

  const getBadgeStyles = (category) => {
    switch (category.toLowerCase()) {
      case "transfer":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "injury":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "analysis":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "opinion":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "match report":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "club news":
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
      default:
        return "bg-border-color text-text-muted border-transparent";
    }
  };

  const isHot = story.urgency_level === "high";
  const hasSecondarySources = story.secondary_sources && story.secondary_sources.length > 0;

  // ─── Hot / Hero Editorial Card ───────────────────────────────────────────────
  if (isHot) {
    return (
      <article
        className="card-hot relative w-full bg-gradient-to-br from-bg-card to-red-500/[0.02] dark:to-red-500/[0.04] backdrop-blur-md border border-border-color border-l-4 border-l-red-600 dark:border-l-red-500 hover:border-red-500/30 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5 group"
      >
        {/* Top meta row: label + timestamp */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] tracking-widest font-black uppercase text-red-600 dark:text-red-500 animate-pulse">
              HOT COVERAGE
            </span>
            <span className="text-[10px] tracking-wider font-extrabold uppercase bg-border-color text-text-muted px-2 py-0.5 rounded">
              {story.sub_topic}
            </span>
          </div>
          <span className="text-xs font-semibold text-text-muted shrink-0">
            {getRelativeTime(story.primary_source.published_at)}
          </span>
        </div>

        {/* Headline */}
        <a
          href={story.primary_source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="font-heading text-xl md:text-2xl font-black text-text-primary leading-tight hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
            {story.primary_headline}
          </h3>
        </a>

        {/* Summary */}
        <p className="text-sm md:text-base leading-relaxed text-text-secondary">
          {story.summary}
        </p>

        {/* Footer: source + expand button */}
        <div className="card-footer-row">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center font-bold text-red-600 dark:text-red-500 text-xs shrink-0 select-none">
              {story.primary_source.name.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                Source Desk
              </p>
              <p className="text-xs text-text-primary font-bold">
                {story.primary_source.name}
              </p>
            </div>
          </div>

          {hasSecondarySources && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isExpanded
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-bg-app border border-border-color text-text-secondary hover:border-text-primary"
              }`}
            >
              <span>
                {isExpanded
                  ? "Close desk"
                  : `+ ${story.secondary_sources.length} report hubs`}
              </span>
              <span className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                ↓
              </span>
            </button>
          )}
        </div>

        {/* Coverage accordion */}
        {hasSecondarySources && isExpanded && (
          <div className="card-sources">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-text-muted" style={{ marginBottom: "0.75rem" }}>
              Alternate coverage feeds
            </h4>
            <ul>
              {story.secondary_sources.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={sec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1 text-xs hover:text-red-500 transition-colors duration-150"
                  >
                    <span className="font-bold text-text-primary">{sec.name}</span>
                    <span className="text-text-muted text-[11px] truncate sm:max-w-md">
                      {story.primary_headline.substring(0, 55)}…
                    </span>
                    <span className="text-[10px] text-text-muted shrink-0 hidden sm:block">
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

  // ─── Standard Grid Card ──────────────────────────────────────────────────────
  return (
    <article className="card-standard bg-bg-card backdrop-blur-md border border-border-color hover:border-border-active rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent-glow/5 group">

      {/* Body: badge row + headline + summary */}
      <div className="card-body">
        {/* Badge row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-wider ${getBadgeStyles(story.category)}`}>
              {story.category}
            </span>
            <span className="text-[9px] font-bold text-text-muted bg-bg-app px-2 py-0.5 rounded">
              {story.sub_topic}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-text-muted shrink-0">
            {getRelativeTime(story.primary_source.published_at)}
          </span>
        </div>

        {/* Headline */}
        <a
          href={story.primary_source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="font-heading text-sm md:text-base font-extrabold text-text-primary leading-snug line-clamp-3 group-hover:text-accent transition-colors duration-200">
            {story.primary_headline}
          </h3>
        </a>

        {/* Summary */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
          {story.summary}
        </p>
      </div>

      {/* Footer: source + expand */}
      <div className="card-footer">
        <div className="card-footer-row">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-sm"></span>
            <span className="text-[10px] text-text-muted font-bold truncate" style={{ maxWidth: "120px" }}>
              {story.primary_source.name}
            </span>
          </div>

          {hasSecondarySources && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-bg-app border border-border-color text-text-secondary hover:border-text-primary cursor-pointer transition-all duration-150 shrink-0"
            >
              <span>{isExpanded ? "Hide" : `+${story.secondary_sources.length} outlets`}</span>
              <span className={`transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}>↓</span>
            </button>
          )}
        </div>

        {/* Secondary coverage dropdown */}
        {hasSecondarySources && isExpanded && (
          <div className="card-sources">
            <ul>
              {story.secondary_sources.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={sec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-[10px] py-1 hover:text-accent transition-colors duration-150"
                  >
                    <span className="font-bold text-text-primary" style={{ minWidth: "80px" }}>
                      {sec.name}
                    </span>
                    <span className="text-text-muted truncate flex-1">
                      Read full coverage
                    </span>
                    <span className="text-text-muted text-[9px] shrink-0">
                      {getRelativeTime(sec.published_at)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </article>
  );
}
