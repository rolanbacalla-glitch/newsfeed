export const mockFeed = [
  {
    narrative_id: "liverpool-secure-midfielder-signing",
    primary_headline: "Liverpool secure £45m deal for midfield dynamo to bolster options",
    category: "Transfer",
    sub_topic: "Liverpool FC",
    summary: "The Reds have finalized terms with the player, addressing a crucial defensive midfield gap ahead of the new season.",
    primary_source: {
      name: "The Athletic",
      url: "https://www.theathletic.com/liverpool-midfield-signing",
      published_at: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15m ago
    },
    secondary_sources: [
      {
        name: "BBC Sport",
        url: "https://www.bbc.co.uk/sport/football/liverpool-signing",
        published_at: new Date(Date.now() - 25 * 60 * 1000).toISOString()
      },
      {
        name: "Sky Sports",
        url: "https://www.skysports.com/football/news/liverpool-transfer-done",
        published_at: new Date(Date.now() - 40 * 60 * 1000).toISOString()
      },
      {
        name: "Fabrizio Romano",
        url: "https://twitter.com/fabrizioromano/status/12345",
        published_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "high"
  },
  {
    narrative_id: "trent-injury-update-scans",
    primary_headline: "Trent Alexander-Arnold scans reveal hamstring strain, sidelining him for fortnight",
    category: "Injury",
    sub_topic: "Liverpool FC",
    summary: "Initial assessment indicates a Grade 1 tear, ruled out of crucial upcoming fixtures against Chelsea and Leipzig.",
    primary_source: {
      name: "Times Sport",
      url: "https://www.thetimes.co.uk/sport/trent-injury-scans",
      published_at: new Date(Date.now() - 45 * 60 * 1000).toISOString() // 45m ago
    },
    secondary_sources: [
      {
        name: "Liverpool Echo",
        url: "https://www.liverpoolecho.co.uk/sport/trent-hamstring-injury-latest",
        published_at: new Date(Date.now() - 55 * 60 * 1000).toISOString()
      },
      {
        name: "Sky Sports",
        url: "https://www.skysports.com/football/trent-injury-ruled-out",
        published_at: new Date(Date.now() - 90 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "high"
  },
  {
    narrative_id: "tactical-analysis-slot-high-press",
    primary_headline: "How Slot's revised high-press structure is revitalizing Liverpool's engine room",
    category: "Analysis",
    sub_topic: "Liverpool FC",
    summary: "Deep dive into the tactical adjustments making the Reds more resilient against counter-attacking systems.",
    primary_source: {
      name: "The Athletic",
      url: "https://www.theathletic.com/slots-press-tactical-analysis",
      published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2h ago
    },
    secondary_sources: [
      {
        name: "This Is Anfield",
        url: "https://www.thisisanfield.com/slots-tactics-deep-dive",
        published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "Tactical Journal",
        url: "https://www.tacticaljournal.com/liverpools-new-press",
        published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "medium"
  },
  {
    narrative_id: "champions-league-victory-milan",
    primary_headline: "Liverpool secure statement Champions League victory with brilliant comeback in Milan",
    category: "Match Report",
    sub_topic: "Champions League",
    summary: "Goals from Konate, Van Dijk, and Szoboszlai secure a deserved 3-1 win at San Siro.",
    primary_source: {
      name: "BBC Sport",
      url: "https://www.bbc.co.uk/sport/football/champions-league-milan-liverpool",
      published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4h ago
    },
    secondary_sources: [
      {
        name: "Guardian Sport",
        url: "https://www.theguardian.com/football/milan-liverpool-match-report",
        published_at: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "Sky Sports",
        url: "https://www.skysports.com/football/milan-vs-liverpool-report",
        published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "Independent",
        url: "https://www.independent.co.uk/sport/football/liverpool-milan-champions-league",
        published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "medium"
  },
  {
    narrative_id: "anfield-road-stand-expansion-completed",
    primary_headline: "Anfield Road expansion fully operational as club announces record attendance capacity",
    category: "Club News",
    sub_topic: "Liverpool FC",
    summary: "Final health and safety certificates signed off, pushing capacity past 61,000 for upcoming fixtures.",
    primary_source: {
      name: "Official LFC",
      url: "https://www.liverpoolfc.com/news/anfield-road-stand-record-capacity",
      published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6h ago
    },
    secondary_sources: [
      {
        name: "Liverpool Echo",
        url: "https://www.liverpoolecho.co.uk/sport/anfield-capacity-record-announcement",
        published_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "low"
  },
  {
    narrative_id: "opinion-salah-evolution-playmaker",
    primary_headline: "Salah's playmaking evolution highlights why new Anfield contract is imperative",
    category: "Opinion",
    sub_topic: "Liverpool FC",
    summary: "Analysing Mohamed Salah's shift from pure goalscorer to elite creator, and what it means for negotiations.",
    primary_source: {
      name: "Telegraph Sport",
      url: "https://www.telegraph.co.uk/football/salah-playmaker-evolution-contract",
      published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() // 10h ago
    },
    secondary_sources: [
      {
        name: "Sky Sports",
        url: "https://www.skysports.com/football/news/salah-contract-dilemma",
        published_at: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "Anfield Watch",
        url: "https://www.anfieldwatch.com/salah-creator-stats-analysis",
        published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "medium"
  },
  {
    narrative_id: "premier-league-title-race-assessment",
    primary_headline: "Arsenal vs Man City title dynamics shift after dramatic Emirates showdown",
    category: "Analysis",
    sub_topic: "Premier League",
    summary: "Tactical breakdown of how the tactical draw between contenders changes the title race math.",
    primary_source: {
      name: "Sky Sports",
      url: "https://www.skysports.com/football/arsenal-man-city-title-dynamics",
      published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12h ago
    },
    secondary_sources: [
      {
        name: "BBC Sport",
        url: "https://www.bbc.co.uk/sport/football/arsenal-city-tactical-draw",
        published_at: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "The Athletic",
        url: "https://www.theathletic.com/arsenal-city-title-race-math",
        published_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "high"
  },
  {
    narrative_id: "real-madrid-mbappe-adaptation-tactics",
    primary_headline: "Real Madrid adjust tactical shape to accommodate Mbappe's attacking runs",
    category: "Analysis",
    sub_topic: "Champions League",
    summary: "How Carlo Ancelotti is altering his midfield diamond to unleash the French superstar.",
    primary_source: {
      name: "Marca",
      url: "https://www.marca.com/en/football/real-madrid-mbappe-tactics",
      published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    secondary_sources: [
      {
        name: "L'Equipe",
        url: "https://www.lequipe.fr/football/mbappe-real-madrid-adaptation",
        published_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
      },
      {
        name: "ESPN FC",
        url: "https://www.espn.com/soccer/real-madrid-mbappe-midfield-shift",
        published_at: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString()
      }
    ],
    urgency_level: "low"
  }
];
