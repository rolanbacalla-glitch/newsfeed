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

const FALLBACK_IMAGES = {
  transfer: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
  injury: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1000&q=80",
  "match report": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80",
  analysis: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1000&q=80",
  opinion: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=80",
  default: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=80",
};

function getFallbackImage(category) {
  const cat = (category || "").toLowerCase();
  return FALLBACK_IMAGES[cat] || FALLBACK_IMAGES.default;
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
    const cardImage = story.imageUrl || getFallbackImage(story.category);

    return (
      <article
        className="card-hot relative w-full bg-gradient-to-br from-bg-card to-red-500/[0.02] dark:to-red-500/[0.04] backdrop-blur-md border border-border-color border-l-4 border-l-red-600 dark:border-l-red-500 hover:border-red-500/30 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5 group flex flex-col md:flex-row overflow-hidden"
        style={{ padding: 0 }}
      >
        {/* Left Side Thumbnail photo occupying the left side of the card */}
        <div className="card-hot-image-wrapper w-full md:w-5/12 lg:w-4/12 shrink-0 relative overflow-hidden bg-zinc-900 min-h-[240px] md:min-h-full">
          <img
            src={cardImage}
            alt={story.primary_headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 dark:brightness-90"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getFallbackImage(story.category);
            }}
          />
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-bg-card/50 pointer-events-none" />

          {/* Hot Coverage Tag overlay on thumbnail */}
          <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md backdrop-blur-md shadow-md flex items-center gap-1.5 z-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>HOT COVERAGE</span>
          </div>
        </div>

        {/* Right Side Content Panel with 1em spacing from image */}
        <div className="card-hot-content flex-1 flex flex-col justify-between min-w-0 p-5 md:p-6 md:pl-[1em] gap-4">
          {/* Top meta row: topic badge + timestamp */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-wider font-extrabold uppercase bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-2 py-0.5 rounded">
                {story.category || "Hot Story"}
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
            <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-black text-text-primary leading-tight hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200">
              {story.primary_headline}
            </h3>
          </a>

          {/* Summary */}
          <p className="text-xs md:text-sm leading-relaxed text-text-secondary line-clamp-3">
            {story.summary}
          </p>

          {/* Footer: source + expand button */}
          <div className="card-footer-row pt-3 border-t border-border-color flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center font-bold text-red-600 dark:text-red-500 text-xs shrink-0 select-none">
                {story.primary_source.name.charAt(0)}
              </div>
              <div>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                  Source Desk
                </p>
                <p className="text-xs text-text-primary font-bold truncate max-w-[140px] sm:max-w-xs">
                  {story.primary_source.name}
                </p>
              </div>
            </div>

            {hasSecondarySources && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
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
        </div>
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
