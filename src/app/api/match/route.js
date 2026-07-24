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
      competition: "Premier League",
      venue: "Anfield"
    },
    {
      id: 2,
      homeTeam: "Sunderland",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-07-25T22:00:00Z", // USA tour friendly
      competition: "Men's First Team - Friendly",
      venue: "GEODIS Park"
    },
    {
      id: 3,
      homeTeam: "Liverpool",
      awayTeam: "Wrexham",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-07-29T23:30:00Z", // USA Tour
      competition: "Men's First Team - USA Tour",
      venue: "Lincoln Financial Field"
    },
    {
      id: 4,
      homeTeam: "Leeds United",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-02T20:00:00Z", // USA Tour
      competition: "Men's First Team - USA Tour",
      venue: "MetLife Stadium"
    },
    {
      id: 5,
      homeTeam: "Liverpool",
      awayTeam: "AS Monaco",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-09T13:30:00Z",
      competition: "Men's First Team - Friendly",
      venue: "Anfield"
    },
    {
      id: 6,
      homeTeam: "Liverpool",
      awayTeam: "Como 1907",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-16T17:00:00Z",
      competition: "Men's First Team - Friendly",
      venue: "Anfield"
    },
    {
      id: 7,
      homeTeam: "Newcastle United",
      awayTeam: "Liverpool",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-23T15:30:00Z",
      competition: "Premier League",
      venue: "St James' Park"
    },
    {
      id: 8,
      homeTeam: "Liverpool",
      awayTeam: "Nottingham Forest",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      date: "2026-08-29T11:30:00Z",
      competition: "Premier League",
      venue: "Anfield"
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
    kickoffISO: matchToDisplay.date,
    venue: matchToDisplay.venue || "Anfield",
    stats: {
      general: [
        { label: "POSSESSION", home: "37.2%", away: "62.8%", homeVal: 37.2, awayVal: 62.8 },
        { label: "DUELS SUCCESS RATE", home: "55.1%", away: "44.9%", homeVal: 55.1, awayVal: 44.9 },
        { label: "AERIAL DUELS WON", home: "56.5%", away: "43.5%", homeVal: 56.5, awayVal: 43.5 },
        { label: "INTERCEPTIONS", home: "16", away: "10", homeVal: 16, awayVal: 10 },
        { label: "OFFSIDES", home: "3", away: "3", homeVal: 3, awayVal: 3 },
        { label: "CORNERS WON", home: "3", away: "2", homeVal: 3, awayVal: 2 },
      ],
      distribution: [
        { label: "PASS ACCURACY", home: "82%", away: "89%", homeVal: 82, awayVal: 89 },
        { label: "ACCURATE PASSES", home: "340", away: "512", homeVal: 340, awayVal: 512 },
        { label: "LONG BALLS", home: "45", away: "28", homeVal: 45, awayVal: 28 },
        { label: "CROSSES", home: "12", away: "19", homeVal: 12, awayVal: 19 },
      ],
      attack: [
        { label: "SHOTS ON TARGET", home: "6", away: "8", homeVal: 6, awayVal: 8 },
        { label: "TOTAL SHOTS", home: "11", away: "17", homeVal: 11, awayVal: 17 },
        { label: "EXPECTED GOALS (xG)", home: "1.84", away: "2.41", homeVal: 1.84, awayVal: 2.41 },
        { label: "BIG CHANCES CREATED", home: "2", away: "4", homeVal: 2, awayVal: 4 },
      ],
      defence: [
        { label: "TACKLES WON", home: "14", away: "18", homeVal: 14, awayVal: 18 },
        { label: "CLEARANCES", home: "22", away: "11", homeVal: 22, awayVal: 11 },
        { label: "SAVED SHOTS", home: "6", away: "3", homeVal: 3, awayVal: 3 },
      ],
      discipline: [
        { label: "FOULS COMMITTED", home: "11", away: "8", homeVal: 11, awayVal: 8 },
        { label: "YELLOW CARDS", home: "2", away: "1", homeVal: 2, awayVal: 1 },
        { label: "RED CARDS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      ],
      var: [
        { label: "VAR REVIEWS", home: "1", away: "1", homeVal: 1, awayVal: 1 },
        { label: "DECISIONS OVERTURNED", home: "0", away: "1", homeVal: 0, awayVal: 1 },
      ]
    }
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0, must-revalidate"
    }
  });
}
