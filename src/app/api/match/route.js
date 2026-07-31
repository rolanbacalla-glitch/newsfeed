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
  let homeScore = 0;
  let awayScore = 0;
  let matchTimeLabel = matchStatus === "FINISHED" ? "FT" : displayDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " GMT";
  let matchStats = getZeroStats();

  if (matchStatus === "LIVE") {
    const minsElapsed = Math.floor(matchToDisplay.elapsedMs / 60000);
    if (minsElapsed < 45) {
      matchTimeLabel = `${minsElapsed}'`;
      homeScore = 1; // Live simulation score
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
    matchStats = getLiveStats(matchToDisplay.elapsedMs);
  } else if (matchStatus === "FINISHED") {
    homeScore = matchToDisplay.homeScore ?? 0;
    awayScore = matchToDisplay.awayScore ?? 0;
    matchStats = getFinishedStats();
  } else {
    // SCHEDULED match: game yet to be played
    homeScore = 0;
    awayScore = 0;
    matchStats = getZeroStats();
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
    stats: matchStats
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0, must-revalidate"
    }
  });
}

function getZeroStats() {
  return {
    general: [
      { label: "POSSESSION", home: "0%", away: "0%", homeVal: 0, awayVal: 0 },
      { label: "DUELS SUCCESS RATE", home: "0%", away: "0%", homeVal: 0, awayVal: 0 },
      { label: "AERIAL DUELS WON", home: "0%", away: "0%", homeVal: 0, awayVal: 0 },
      { label: "INTERCEPTIONS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "OFFSIDES", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "CORNERS WON", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    distribution: [
      { label: "PASS ACCURACY", home: "0%", away: "0%", homeVal: 0, awayVal: 0 },
      { label: "ACCURATE PASSES", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "LONG BALLS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "CROSSES", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    attack: [
      { label: "SHOTS ON TARGET", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "TOTAL SHOTS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "EXPECTED GOALS (xG)", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "BIG CHANCES CREATED", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    defence: [
      { label: "TACKLES WON", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "CLEARANCES", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "SAVED SHOTS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    discipline: [
      { label: "FOULS COMMITTED", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "YELLOW CARDS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "RED CARDS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    var: [
      { label: "VAR REVIEWS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "DECISIONS OVERTURNED", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ]
  };
}

function getLiveStats(elapsedMs) {
  const minsElapsed = Math.min(90, Math.max(1, Math.floor(elapsedMs / 60000)));
  const factor = minsElapsed / 90;

  const homeShots = Math.round(11 * factor);
  const awayShots = Math.round(17 * factor);
  const homeOnTarget = Math.round(6 * factor);
  const awayOnTarget = Math.round(8 * factor);
  const homePasses = Math.round(340 * factor);
  const awayPasses = Math.round(512 * factor);
  const homeFouls = Math.round(11 * factor);
  const awayFouls = Math.round(8 * factor);
  const homeCorners = Math.round(3 * factor);
  const awayCorners = Math.round(2 * factor);
  const homeXG = (1.84 * factor).toFixed(2);
  const awayXG = (2.41 * factor).toFixed(2);

  return {
    general: [
      { label: "POSSESSION", home: "37.2%", away: "62.8%", homeVal: 37.2, awayVal: 62.8 },
      { label: "DUELS SUCCESS RATE", home: "55.1%", away: "44.9%", homeVal: 55.1, awayVal: 44.9 },
      { label: "AERIAL DUELS WON", home: "56.5%", away: "43.5%", homeVal: 56.5, awayVal: 43.5 },
      { label: "INTERCEPTIONS", home: `${Math.round(16 * factor)}`, away: `${Math.round(10 * factor)}`, homeVal: Math.round(16 * factor), awayVal: Math.round(10 * factor) },
      { label: "OFFSIDES", home: `${Math.round(3 * factor)}`, away: `${Math.round(3 * factor)}`, homeVal: Math.round(3 * factor), awayVal: Math.round(3 * factor) },
      { label: "CORNERS WON", home: `${homeCorners}`, away: `${awayCorners}`, homeVal: homeCorners, awayVal: awayCorners },
    ],
    distribution: [
      { label: "PASS ACCURACY", home: minsElapsed > 0 ? "82%" : "0%", away: minsElapsed > 0 ? "89%" : "0%", homeVal: 82, awayVal: 89 },
      { label: "ACCURATE PASSES", home: `${homePasses}`, away: `${awayPasses}`, homeVal: homePasses, awayVal: awayPasses },
      { label: "LONG BALLS", home: `${Math.round(45 * factor)}`, away: `${Math.round(28 * factor)}`, homeVal: Math.round(45 * factor), awayVal: Math.round(28 * factor) },
      { label: "CROSSES", home: `${Math.round(12 * factor)}`, away: `${Math.round(19 * factor)}`, homeVal: Math.round(12 * factor), awayVal: Math.round(19 * factor) },
    ],
    attack: [
      { label: "SHOTS ON TARGET", home: `${homeOnTarget}`, away: `${awayOnTarget}`, homeVal: homeOnTarget, awayVal: awayOnTarget },
      { label: "TOTAL SHOTS", home: `${homeShots}`, away: `${awayShots}`, homeVal: homeShots, awayVal: awayShots },
      { label: "EXPECTED GOALS (xG)", home: `${homeXG}`, away: `${awayXG}`, homeVal: parseFloat(homeXG), awayVal: parseFloat(awayXG) },
      { label: "BIG CHANCES CREATED", home: `${Math.round(2 * factor)}`, away: `${Math.round(4 * factor)}`, homeVal: Math.round(2 * factor), awayVal: Math.round(4 * factor) },
    ],
    defence: [
      { label: "TACKLES WON", home: `${Math.round(14 * factor)}`, away: `${Math.round(18 * factor)}`, homeVal: Math.round(14 * factor), awayVal: Math.round(18 * factor) },
      { label: "CLEARANCES", home: `${Math.round(22 * factor)}`, away: `${Math.round(11 * factor)}`, homeVal: Math.round(22 * factor), awayVal: Math.round(11 * factor) },
      { label: "SAVED SHOTS", home: `${Math.round(6 * factor)}`, away: `${Math.round(3 * factor)}`, homeVal: Math.round(6 * factor), awayVal: Math.round(3 * factor) },
    ],
    discipline: [
      { label: "FOULS COMMITTED", home: `${homeFouls}`, away: `${awayFouls}`, homeVal: homeFouls, awayVal: awayFouls },
      { label: "YELLOW CARDS", home: `${Math.round(2 * factor)}`, away: `${Math.round(1 * factor)}`, homeVal: Math.round(2 * factor), awayVal: Math.round(1 * factor) },
      { label: "RED CARDS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    var: [
      { label: "VAR REVIEWS", home: factor > 0.5 ? "1" : "0", away: factor > 0.5 ? "1" : "0", homeVal: factor > 0.5 ? 1 : 0, awayVal: factor > 0.5 ? 1 : 0 },
      { label: "DECISIONS OVERTURNED", home: "0", away: factor > 0.7 ? "1" : "0", homeVal: 0, awayVal: factor > 0.7 ? 1 : 0 },
    ]
  };
}

function getFinishedStats() {
  return {
    general: [
      { label: "POSSESSION", home: "51.0%", away: "49.0%", homeVal: 51, awayVal: 49 },
      { label: "DUELS SUCCESS RATE", home: "52.0%", away: "48.0%", homeVal: 52, awayVal: 48 },
      { label: "AERIAL DUELS WON", home: "54.0%", away: "46.0%", homeVal: 54, awayVal: 46 },
      { label: "INTERCEPTIONS", home: "12", away: "14", homeVal: 12, awayVal: 14 },
      { label: "OFFSIDES", home: "2", away: "1", homeVal: 2, awayVal: 1 },
      { label: "CORNERS WON", home: "5", away: "4", homeVal: 5, awayVal: 4 },
    ],
    distribution: [
      { label: "PASS ACCURACY", home: "85%", away: "84%", homeVal: 85, awayVal: 84 },
      { label: "ACCURATE PASSES", home: "420", away: "405", homeVal: 420, awayVal: 405 },
      { label: "LONG BALLS", home: "32", away: "38", homeVal: 32, awayVal: 38 },
      { label: "CROSSES", home: "16", away: "14", homeVal: 16, awayVal: 14 },
    ],
    attack: [
      { label: "SHOTS ON TARGET", home: "5", away: "4", homeVal: 5, awayVal: 4 },
      { label: "TOTAL SHOTS", home: "14", away: "11", homeVal: 14, awayVal: 11 },
      { label: "EXPECTED GOALS (xG)", home: "1.45", away: "1.20", homeVal: 1.45, awayVal: 1.20 },
      { label: "BIG CHANCES CREATED", home: "3", away: "2", homeVal: 3, awayVal: 2 },
    ],
    defence: [
      { label: "TACKLES WON", home: "15", away: "17", homeVal: 15, awayVal: 17 },
      { label: "CLEARANCES", home: "18", away: "20", homeVal: 18, awayVal: 20 },
      { label: "SAVED SHOTS", home: "3", away: "4", homeVal: 3, awayVal: 4 },
    ],
    discipline: [
      { label: "FOULS COMMITTED", home: "9", away: "12", homeVal: 9, awayVal: 12 },
      { label: "YELLOW CARDS", home: "1", away: "2", homeVal: 1, awayVal: 2 },
      { label: "RED CARDS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ],
    var: [
      { label: "VAR REVIEWS", home: "0", away: "0", homeVal: 0, awayVal: 0 },
      { label: "DECISIONS OVERTURNED", home: "0", away: "0", homeVal: 0, awayVal: 0 },
    ]
  };
}

