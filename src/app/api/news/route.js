import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

// ─── Curated Direct RSS Feeds ────────────────────────────────────────────────
// These 12 sources are fetched in parallel alongside Google News.
// Each has a confirmed native RSS feed. If any single feed fails, the rest
// continue — the app degrades gracefully.
const DIRECT_LFC_FEEDS = [
  { name: "Liverpool Echo",     url: "https://www.liverpoolecho.co.uk/all-about/liverpool-fc?service=rss" },
  { name: "This Is Anfield",    url: "https://www.thisisanfield.com/feed/" },
  { name: "Empire of the Kop",  url: "https://empireofthekop.com/feed/" },
  { name: "The Guardian",       url: "https://www.theguardian.com/football/liverpool/rss" },
  { name: "Liverpool.com",      url: "https://www.liverpool.com/liverpool-fc-news/?service=rss" },
  { name: "Anfield Watch",      url: "https://anfieldwatch.co.uk/feed/" },
  { name: "Anfield Online",     url: "https://anfield-online.co.uk/feed/" },
  { name: "The Anfield Wrap",   url: "https://www.theanfieldwrap.com/feed/" },
  { name: "Tribal Football",    url: "https://www.tribalfootball.com/rss/clubs/liverpool-fc" },
  { name: "Liverpool Offside",  url: "https://liverpooloffside.sbnation.com/rss/index.xml" },
  { name: "Football365",        url: "https://www.football365.com/feed" },
  { name: "Caught Offside",     url: "https://www.caughtoffside.com/category/liverpool/feed/" },
];

// ─── Stop Words ───────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "the", "a", "an", "in", "on", "at", "for", "to", "with", "is", "are", "of", "and", "after",
  "about", "from", "by", "that", "this", "it", "its", "as", "at", "but", "or", "new", "how",
  "why", "who", "what", "where", "has", "have", "been", "will", "be", "over", "more", "out"
]);

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ─── Utility: clean description/summary text ─────────────────────────────────
function cleanSummary(html, primaryHeadline) {
  if (!html) return "";
  let text = html.replace(/<[^>]*>/g, "");
  // Strip publisher name prefixes that Google News adds
  text = text.replace(/^[^-]+-\s*/, "");
  text = text.replace(/\s+/g, " ").trim();

  if (text.toLowerCase().includes(primaryHeadline.toLowerCase().substring(0, 20))) {
    return "Latest updates and reports regarding this story as coverage develops.";
  }

  const words = text.split(" ");
  if (words.length > 22) {
    return words.slice(0, 20).join(" ") + "...";
  }
  return text || "Alternative coverage and updates from multiple news outlets.";
}

// ─── Utility: keyword-based category classifier ───────────────────────────────
function categorizeHeadline(title, description) {
  const text = (title + " " + (description || "")).toLowerCase();

  if (text.match(/\b(injury|injuries|hamstring|knee|ankle|ligament|scan|calf|muscle|sidelined|out for|recovery|physio|fitness|fit|illness|fever|diagnosed)\b/)) {
    return "Injury";
  }
  if (text.match(/\b(transfer|sign|signing|bid|fee|agreement|terms|medical|scout|rumour|rumor|exit|departure|joined|loan|contract extension|clause|linked with|buy|sell|transfers)\b/)) {
    return "Transfer";
  }
  if (text.match(/\b(match|defeat|win|draw|victory|beat|score|goal|goals|vs|highlights|clash|fixture|stadium|referee|penalty|kick-off|report|player ratings|beat)\b/)) {
    return "Match Report";
  }
  if (text.match(/\b(opinion|column|verdict|view|editorial|critic|praise|expert|insist|claim|debate|deserve|ideal|should|must)\b/)) {
    return "Opinion";
  }
  if (text.match(/\b(tactics|analysis|deeper|deep dive|stat|stats|structure|system|press|role|slot|tactical|scouting report)\b/)) {
    return "Analysis";
  }
  return "Club News";
}

// ─── Utility: word overlap for clustering ─────────────────────────────────────
function getOverlapCount(title1, title2) {
  const words1 = title1.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w && !STOP_WORDS.has(w));
  const words2 = title2.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w && !STOP_WORDS.has(w));
  const set1 = new Set(words1);
  let overlap = 0;
  for (const w of words2) {
    if (set1.has(w)) overlap++;
  }
  return overlap;
}

// ─── Utility: fetch + parse a single RSS feed ─────────────────────────────────
// Returns an array of normalised article objects, or [] on failure.
async function fetchFeed(feedUrl, sourceName, parser) {
  try {
    const res = await fetch(feedUrl, {
      headers: { "User-Agent": USER_AGENT },
      cache: "no-store",
      signal: AbortSignal.timeout(6000), // 6 s per feed — skip if too slow
    });

    if (!res.ok) {
      console.warn(`[feed] ${sourceName} returned ${res.status} — skipping`);
      return [];
    }

    const xmlText = await res.text();
    const jsonObj = parser.parse(xmlText);

    // Support both RSS 2.0 (<item>) and Atom (<entry>)
    const items =
      jsonObj.rss?.channel?.item ||
      jsonObj.feed?.entry ||
      [];

    const normalised = (Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((item) => ({
        title:        (item.title?.["#text"] ?? item.title ?? "").toString().trim(),
        source:       sourceName,
        url:          item.link?.["@_href"] ?? item.link ?? item.guid ?? "",
        published_at: item.pubDate ?? item.updated ?? item.published ?? new Date().toISOString(),
        description:  (item.description ?? item.summary?.["#text"] ?? item.summary ?? item.content?.["#text"] ?? item.content ?? "").toString(),
      }))
      .filter((a) => a.title); // drop items with no title

    return normalised;
  } catch (err) {
    console.warn(`[feed] ${sourceName} failed: ${err.message} — skipping`);
    return [];
  }
}

// ─── Main GET handler ─────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Liverpool FC";

  const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true });

  try {
    // ── 1. Build the full list of feeds to fetch ──────────────────────────────
    // For the "Liverpool FC" topic we use the curated direct feeds PLUS Google News.
    // For other topics (Premier League, Champions League) we fall back to Google News only,
    // since the direct feeds are LFC-specific.
    const isLfcTopic = topic.toLowerCase().includes("liverpool");

    const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-GB&gl=GB&ceid=GB:en`;
    const googleFeed = { name: "_google", url: googleNewsUrl };

    const feedsToFetch = isLfcTopic
      ? [...DIRECT_LFC_FEEDS, googleFeed]
      : [googleFeed];

    // ── 2. Fetch all feeds in parallel ────────────────────────────────────────
    const feedResults = await Promise.allSettled(
      feedsToFetch.map((feed) => fetchFeed(feed.url, feed.name, parser))
    );

    // ── 3. Flatten results; parse Google News titles separately ───────────────
    const allArticles = [];

    feedResults.forEach((result, idx) => {
      if (result.status !== "fulfilled") return;
      const feedName = feedsToFetch[idx].name;
      const articles = result.value;

      articles.forEach((article) => {
        if (feedName === "_google") {
          // Google News bakes "Headline - Source" into the title
          const rawTitle = article.title;
          const lastDashIdx = rawTitle.lastIndexOf(" - ");
          if (lastDashIdx !== -1) {
            allArticles.push({
              ...article,
              title:  rawTitle.substring(0, lastDashIdx).trim(),
              source: rawTitle.substring(lastDashIdx + 3).trim(),
            });
          } else {
            allArticles.push({ ...article, source: "Google News" });
          }
        } else {
          // Direct feed — source is already set from the config
          allArticles.push(article);
        }
      });
    });

    // ── 4. Deduplicate by URL (direct feeds & Google may overlap) ─────────────
    const seenUrls = new Set();
    const dedupedArticles = allArticles.filter((a) => {
      const key = a.url || a.title;
      if (!key || seenUrls.has(key)) return false;
      seenUrls.add(key);
      return true;
    });

    // ── 5. Cluster similar stories ────────────────────────────────────────────
    const clusters = [];

    for (const article of dedupedArticles) {
      let matchedCluster = null;

      for (const cluster of clusters) {
        const timeDiff = Math.abs(
          new Date(article.published_at).getTime() -
          new Date(cluster.primary_source.published_at).getTime()
        );
        const withinTimeframe = timeDiff < 36 * 60 * 60 * 1000; // 36 hours

        if (withinTimeframe && getOverlapCount(article.title, cluster.primary_headline) >= 3) {
          matchedCluster = cluster;
          break;
        }
      }

      if (matchedCluster) {
        const alreadyListed =
          matchedCluster.secondary_sources.some((s) => s.name === article.source) ||
          matchedCluster.primary_source.name === article.source;
        if (!alreadyListed) {
          matchedCluster.secondary_sources.push({
            name:         article.source,
            url:          article.url,
            published_at: article.published_at,
          });
        }
      } else {
        const category    = categorizeHeadline(article.title, article.description);
        const narrative_id = article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 50);

        clusters.push({
          narrative_id,
          primary_headline: article.title,
          category,
          sub_topic: topic,
          summary:   cleanSummary(article.description, article.title),
          primary_source: {
            name:         article.source,
            url:          article.url,
            published_at: article.published_at,
          },
          secondary_sources: [],
          urgency_level: article.title.toLowerCase().match(
            /\b(breaking|urgent|injury|strain|ruled out|scan|bid|deal|confirmed|official)\b/
          ) ? "high" : "low",
        });
      }
    }

    // ── 6. Sort by most recent primary source ─────────────────────────────────
    clusters.sort(
      (a, b) =>
        new Date(b.primary_source.published_at).getTime() -
        new Date(a.primary_source.published_at).getTime()
    );

    return new Response(JSON.stringify(clusters), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in news route:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
