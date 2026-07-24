import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

// ─── Curated Direct RSS Feeds ────────────────────────────────────────────────
// These 12 sources are fetched in parallel alongside Google News.
// Each has a confirmed native RSS feed. If any single feed fails, the rest
// continue — the app degrades gracefully.
const RSS_FEEDS = [
  { name: "Liverpool FC",       url: "https://backend.liverpoolfc.com/rss.xml" },
  { name: "This Is Anfield",    url: "https://www.thisisanfield.com/feed/" },
  { name: "The Anfield Wrap",   url: "https://www.theanfieldwrap.com/feed/" },
  { name: "Anfield Watch",      url: "https://anfieldwatch.co.uk/feed/" },
  { name: "Anfield Online",     url: "https://anfield-online.co.uk/feed/" },
  { name: "Empire of the Kop",  url: "https://empireofthekop.com/feed/" },
  { name: "Liverpool Offside",  url: "https://liverpooloffside.sbnation.com/rss/current.xml" },
  { name: "Sky Sports",         url: "https://www.skysports.com/rss/12040" },
  { name: "Caught Offside",     url: "https://www.caughtoffside.com/category/liverpool/feed/" },
  { name: "Google News LFC",    url: "https://news.google.com/rss/search?q=Liverpool%20FC&hl=en-GB&gl=GB&ceid=GB:en" },
];

// ─── Stop Words ───────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "the", "a", "an", "in", "on", "at", "for", "to", "with", "is", "are", "of", "and", "after",
  "about", "from", "by", "that", "this", "it", "its", "as", "at", "but", "or", "new", "how",
  "why", "who", "what", "where", "has", "have", "been", "will", "be", "over", "more", "out"
]);

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ─── Utility: decode HTML / XML entities ──────────────────────────────────────
function decodeHtmlEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#(\d+);/g, (match, dec) => {
      try {
        return String.fromCodePoint(parseInt(dec, 10));
      } catch {
        return match;
      }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return match;
      }
    })
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');
}

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

// ─── Utility: fetch OpenGraph or article body image from original article page
async function fetchOgImage(url) {
  if (!url || !url.startsWith("http")) return null;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return null;
    const html = await res.text();

    // 1. Meta tags: og:image, twitter:image, image_src
    const metaMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i) ||
      html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i);

    if (metaMatch && metaMatch[1]) {
      let img = decodeHtmlEntities(metaMatch[1].trim());
      if (img.startsWith("//")) img = "https:" + img;
      if (img.startsWith("http") && !img.includes("googleusercontent.com") && !img.includes("gstatic.com")) {
        return img;
      }
    }

    // 2. In-body article / main / figure / featured img tags
    const imgMatch =
      html.match(/<article[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i) ||
      html.match(/<main[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i) ||
      html.match(/<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i) ||
      html.match(/<img[^>]+class=["'][^"']*(?:featured|hero|lead|article|header|post)[^"']*["'][^>]+src=["']([^"']+)["']/i);

    if (imgMatch && imgMatch[1]) {
      let img = decodeHtmlEntities(imgMatch[1].trim());
      if (img.startsWith("//")) img = "https:" + img;
      if (img.startsWith("http") && !img.match(/\.(gif|svg)$/i) && !img.includes("pixel") && !img.includes("avatar")) {
        return img;
      }
    }

    return null;
  } catch {
    return null;
  }
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

    const getUrlFromObj = (obj) => {
      if (!obj) return null;
      if (typeof obj === "string") return obj;
      return obj["@_url"] || obj.url || obj["@_href"] || obj.href || null;
    };

    const normalised = (Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((item) => {
        const rawTitle = (item.title?.["#text"] ?? item.title ?? "").toString().trim();
        const rawDesc = (item.description ?? item.summary?.["#text"] ?? item.summary ?? item.content?.["#text"] ?? item.content ?? "").toString();

        let imageUrl = null;

        // 1. Check media:content
        if (item["media:content"]) {
          const mc = Array.isArray(item["media:content"]) ? item["media:content"] : [item["media:content"]];
          for (const m of mc) {
            const url = getUrlFromObj(m);
            if (url && (url.startsWith("http") || url.startsWith("//"))) {
              imageUrl = url;
              break;
            }
          }
        }
        // 2. Check media:thumbnail
        if (!imageUrl && item["media:thumbnail"]) {
          const mt = Array.isArray(item["media:thumbnail"]) ? item["media:thumbnail"] : [item["media:thumbnail"]];
          for (const m of mt) {
            const url = getUrlFromObj(m);
            if (url && (url.startsWith("http") || url.startsWith("//"))) {
              imageUrl = url;
              break;
            }
          }
        }
        // 3. Check media:group
        if (!imageUrl && item["media:group"]) {
          const mg = item["media:group"];
          const mc = mg["media:content"] || mg["media:thumbnail"];
          if (mc) {
            const arr = Array.isArray(mc) ? mc : [mc];
            for (const m of arr) {
              const url = getUrlFromObj(m);
              if (url) { imageUrl = url; break; }
            }
          }
        }
        // 4. Check enclosure
        if (!imageUrl && item["enclosure"]) {
          const encs = Array.isArray(item["enclosure"]) ? item["enclosure"] : [item["enclosure"]];
          for (const enc of encs) {
            const url = getUrlFromObj(enc);
            const type = enc["@_type"] || enc.type || "";
            if (url && (type.startsWith("image/") || url.match(/\.(jpeg|jpg|png|webp|gif)/i))) {
              imageUrl = url;
              break;
            }
          }
        }

        // 5. Parse <img> from HTML contents
        if (!imageUrl) {
          const htmlSources = [
            item["content:encoded"],
            item.content?.["#text"] ?? item.content,
            item.description?.["#text"] ?? item.description,
            item.summary?.["#text"] ?? item.summary,
          ];

          for (const str of htmlSources) {
            if (!str || typeof str !== "string") continue;
            const imgMatch = str.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch && imgMatch[1]) {
              imageUrl = imgMatch[1];
              break;
            }
          }
        }

        if (imageUrl) {
          if (imageUrl.startsWith("//")) imageUrl = "https:" + imageUrl;
          else if (imageUrl.startsWith("/")) {
            try {
              const base = new URL(feedUrl);
              imageUrl = base.origin + imageUrl;
            } catch {}
          }
          imageUrl = decodeHtmlEntities(imageUrl);
        }

        return {
          title:        decodeHtmlEntities(rawTitle),
          source:       sourceName,
          url:          item.link?.["@_href"] ?? item.link ?? item.guid ?? "",
          published_at: item.pubDate ?? item.updated ?? item.published ?? new Date().toISOString(),
          description:  decodeHtmlEntities(rawDesc),
          imageUrl:     imageUrl,
        };
      })
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
    const isLfcTopic = topic.toLowerCase().includes("liverpool");

    const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-GB&gl=GB&ceid=GB:en`;
    const googleFeed = { name: "_google", url: googleNewsUrl };

    const feedsToFetch = isLfcTopic
      ? RSS_FEEDS
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
          allArticles.push(article);
        }
      });
    });

    // ── 4. Deduplicate by URL ─────────────────────────────────────────────────
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
        if (!matchedCluster.imageUrl && article.imageUrl) {
          matchedCluster.imageUrl = article.imageUrl;
        }
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
          imageUrl:  article.imageUrl || null,
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

    // ── 6. Enrich all clusters missing real images via live og/body image fetch ─
    const batchSize = 15;
    for (let i = 0; i < clusters.length; i += batchSize) {
      const batch = clusters.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (cluster) => {
          if (!cluster.imageUrl || cluster.imageUrl.includes("googleusercontent.com") || cluster.imageUrl.includes("gstatic.com")) {
            let ogImg = await fetchOgImage(cluster.primary_source.url);
            if (!ogImg && cluster.secondary_sources && cluster.secondary_sources.length > 0) {
              for (const sec of cluster.secondary_sources) {
                ogImg = await fetchOgImage(sec.url);
                if (ogImg) break;
              }
            }
            if (ogImg) {
              cluster.imageUrl = ogImg;
            }
          }
        })
      );
    }

    // ── 7. Sort by most recent primary source ─────────────────────────────────
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
