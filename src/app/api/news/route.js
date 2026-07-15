import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

const STOP_WORDS = new Set([
  "the", "a", "an", "in", "on", "at", "for", "to", "with", "is", "are", "of", "and", "after",
  "about", "from", "by", "that", "this", "it", "its", "as", "at", "but", "or", "new", "how",
  "why", "who", "what", "where", "has", "have", "been", "will", "be", "over", "more", "out"
]);

// Utility to clean description snippets
function cleanSummary(html, primaryHeadline) {
  if (!html) return "";
  // Strip HTML tags
  let text = html.replace(/<[^>]*>/g, "");
  // Strip publisher names or dates that Google News adds
  text = text.replace(/^[^-]+-\s*/, "");
  text = text.replace(/\s+/g, " ").trim();
  
  // If the summary is identical or too similar to the headline, provide a clean fall-back
  if (text.toLowerCase().includes(primaryHeadline.toLowerCase().substring(0, 20))) {
    return `Latest updates and reports regarding this story as coverage develops.`;
  }

  const words = text.split(" ");
  if (words.length > 22) {
    return words.slice(0, 20).join(" ") + "...";
  }
  return text || `Alternative coverage and updates from multiple news outlets.`;
}

// Keyword-based category classifier
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

// Compute word overlap to detect similar stories
function getOverlapCount(title1, title2) {
  const words1 = title1.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w && !STOP_WORDS.has(w));
  const words2 = title2.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w && !STOP_WORDS.has(w));
  const set1 = new Set(words1);
  let overlap = 0;
  for (const w of words2) {
    if (set1.has(w)) {
      overlap++;
    }
  }
  return overlap;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Liverpool FC";
  
  try {
    const googleNewsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-GB&gl=GB&ceid=GB:en`;
    
    const response = await fetch(googleNewsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google News RSS: ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonObj = parser.parse(xmlText);
    
    const items = jsonObj.rss?.channel?.item || [];
    const rawArticles = (Array.isArray(items) ? items : [items]).filter(Boolean);

    // 1. Parse and extract metadata from Google News feed
    const parsedArticles = rawArticles.map((item) => {
      const rawTitle = item.title || "";
      // Google News format is: "Headline - Source"
      const lastDashIdx = rawTitle.lastIndexOf(" - ");
      let cleanTitle = rawTitle;
      let sourceName = "Google News";
      if (lastDashIdx !== -1) {
        cleanTitle = rawTitle.substring(0, lastDashIdx).trim();
        sourceName = rawTitle.substring(lastDashIdx + 3).trim();
      }

      return {
        title: cleanTitle,
        source: sourceName,
        url: item.link || "",
        published_at: item.pubDate || new Date().toISOString(),
        description: item.description || ""
      };
    });

    // 2. Perform clustering (Deduplication / Grouping)
    const clusters = [];

    for (const article of parsedArticles) {
      let matchedCluster = null;

      for (const cluster of clusters) {
        // Must be within 36 hours to be clustered
        const timeDiff = Math.abs(new Date(article.published_at).getTime() - new Date(cluster.primary_source.published_at).getTime());
        const withinTimeframe = timeDiff < 36 * 60 * 60 * 1000;

        if (withinTimeframe) {
          const overlap = getOverlapCount(article.title, cluster.primary_headline);
          // If they share 3 or more significant words, they are clustered
          if (overlap >= 3) {
            matchedCluster = cluster;
            break;
          }
        }
      }

      if (matchedCluster) {
        // Add to secondary sources if it's not from the exact same publisher
        const exists = matchedCluster.secondary_sources.some((s) => s.name === article.source) || matchedCluster.primary_source.name === article.source;
        if (!exists) {
          matchedCluster.secondary_sources.push({
            name: article.source,
            url: article.url,
            published_at: article.published_at
          });
        }
      } else {
        // Create a new cluster
        const category = categorizeHeadline(article.title, article.description);
        const narrative_id = article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").substring(0, 50);

        clusters.push({
          narrative_id,
          primary_headline: article.title,
          category,
          sub_topic: topic,
          summary: cleanSummary(article.description, article.title),
          primary_source: {
            name: article.source,
            url: article.url,
            published_at: article.published_at
          },
          secondary_sources: [],
          urgency_level: article.title.toLowerCase().match(/\b(breaking|urgent|injury|strain|ruled out|scan|bid|deal|confirmed|official)\b/) ? "high" : "low"
        });
      }
    }

    return new Response(JSON.stringify(clusters), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error parsing news route:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
