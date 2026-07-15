export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  
  // Correct fixtures schedule for LFC Men's First Team (Summer 2026)
  const fixtures = [
    {
      id: 1,
      homeTeam: "Liverpool",
      awayTeam: "Brentford",
      homeScore: 1,
      awayScore: 1,
      status: "FINISHED",
      date: "2026-05-24T15:00:00Z", // Final match of Premier League 2025/26
      competition: "Premier League"
    },
    {
      id: 2,
      homeTeam: "Sunderland",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-07-25T22:00:00Z", // USA tour friendly
      competition: "Men's First Team - Friendly"
    },
    {
      id: 3,
      homeTeam: "Liverpool",
      awayTeam: "Wrexham",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-07-29T23:30:00Z", // USA Tour
      competition: "Men's First Team - USA Tour"
    },
    {
      id: 4,
      homeTeam: "Leeds United",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-02T20:00:00Z", // USA Tour
      competition: "Men's First Team - USA Tour"
    },
    {
      id: 5,
      homeTeam: "Liverpool",
      awayTeam: "AS Monaco",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-09T13:30:00Z",
      competition: "Men's First Team - Friendly"
    },
    {
      id: 6,
      homeTeam: "Liverpool",
      awayTeam: "Como 1907",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-16T17:00:00Z",
      competition: "Men's First Team - Friendly"
    },
    {
      id: 7,
      homeTeam: "Newcastle United",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-23T15:30:00Z",
      competition: "Premier League"
    },
    {
      id: 8,
      homeTeam: "Liverpool",
      awayTeam: "Nottingham Forest",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-29T11:30:00Z",
      competition: "Premier League"
    }
  ];

  // Identify finished/live matches vs upcoming scheduled matches
  const pastOrLiveMatches = [];
  const upcomingMatches = [];

  for (const match of fixtures) {
    const matchDate = new Date(match.date);
    const timeDiffMs = now.getTime() - matchDate.getTime();

    // If kickoff has occurred
    if (timeDiffMs >= 0) {
      if (timeDiffMs < 105 * 60 * 1000) { // 90 min game + 15 min halftime
        pastOrLiveMatches.push({ ...match, status: "LIVE", elapsedMs: timeDiffMs });
      } else {
        pastOrLiveMatches.push({ ...match, status: "FINISHED" });
      }
    } else {
      upcomingMatches.push(match);
    }
  }

  // Get the single latest match with a score (either currently live or most recently finished)
  const latestMatch = pastOrLiveMatches.length > 0 ? pastOrLiveMatches[pastOrLiveMatches.length - 1] : null;

  // Get the next upcoming scheduled match
  const nextUpcomingMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;

  // Decision logic: which match do we display?
  // 1. Prioritize any currently LIVE match
  const liveMatch = pastOrLiveMatches.find(m => m.status === "LIVE");
  let matchToDisplay = liveMatch || nextUpcomingMatch || latestMatch;

  // Fallback to avoid null displays
  if (!matchToDisplay) {
    matchToDisplay = fixtures[0];
  }

  // Format outputs for UI consumption
  const displayDate = new Date(matchToDisplay.date);
  const matchStatus = matchToDisplay.status;
  let homeScore = matchToDisplay.homeScore ?? 0;
  let awayScore = matchToDisplay.awayScore ?? 0;
  let matchTimeLabel = matchStatus === "FINISHED" ? "FT" : displayDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " GMT";

  if (matchStatus === "LIVE") {
    const minsElapsed = Math.floor(matchToDisplay.elapsedMs / 60000);
    if (minsElapsed < 45) {
      matchTimeLabel = `${minsElapsed}'`;
      homeScore = 1; // Live simulation scores
      awayScore = 0;
    } else if (minsElapsed >= 45 && minsElapsed < 60) {
      matchTimeLabel = "HT";
      homeScore = 1;
      awayScore = 0;
    } else if (minsElapsed >= 60 && minsElapsed < 90) {
      matchTimeLabel = `${minsElapsed - 15}'`;
      homeScore = 2;
      awayScore = 1;
    } else {
      matchTimeLabel = "90+'";
      homeScore = 2;
      awayScore = 1;
    }
  }

  const result = {
    status: matchStatus,
    homeTeam: matchToDisplay.homeTeam,
    awayTeam: matchToDisplay.awayTeam,
    homeScore: homeScore,
    awayScore: awayScore,
    matchTime: matchTimeLabel,
    opponentName: matchToDisplay.homeTeam === "Liverpool" ? matchToDisplay.awayTeam : matchToDisplay.homeTeam,
    isHome: matchToDisplay.homeTeam === "Liverpool",
    competition: matchToDisplay.competition,
    formattedDate: displayDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
    kickoffISO: matchToDisplay.date
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0, must-revalidate"
    }
  });
}
