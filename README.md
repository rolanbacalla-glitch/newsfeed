# ANFIELD INSIGHTS // LFC Tactical Data Engine

A high-performance Single Page Application (SPA) tactical intelligence and player recruitment dashboard built strictly for **Liverpool FC** supporters, Kopites, and sports data scientists.

![Anfield Insights](https://img.shields.io/badge/LFC-Anfield_Insights-C8102E?style=for-the-badge&logo=liverpoolfc&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-React_19-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-00B2A9?style=for-the-badge&logo=tailwindcss)

---

## 🔴 Features & Operational Workspaces

### 1. 🏟️ [ Boot Room Live ] — Tactical Match Analysis
- **Vector Pitch Canvas**: Normalised $(105\text{m} \times 68\text{m})$ pitch attacking towards **The Kop Stand** on the right.
- **Pass Network Layer**: Liverpool Starting XI plotted by tactical touch locations with passing lines scaled by dyad frequency. Interactive node spotlighting highlights individual pass completion rates and On-Ball Value (OBV).
- **Attacking Half-Space Heatmap**: Highlights tactical overloads in the Salah/Alexander-Arnold channel and isolated left cutback corridors.
- **Shots & xG Map**: Expected Goals shot plotting with radius scaled by probability and colour-coded by outcome.
- **Match Momentum Area Wave**: Inline SVG cubic Bézier momentum chart ($-100$ to $+100$ territory dominance) with pinned match milestones.
- **Key LFC Metrics**: Field Tilt ($71.4\%$), Defensive PPDA ($7.2$), Team xG differential, and Gegenpress turnovers.

### 2. ⏳ [ Anfield Time Machine ] — Historic StatsBomb Engine
Replay iconic Liverpool campaigns with xG comparisons, PPDA pressure metrics, and **On-Ball Value (OBV)** contributor leaderboards:
- **2005 Istanbul UCL Final** vs AC Milan (3-3, 3-2 pens)
- **2019 UCL Semi-Final** vs FC Barcelona (4-0)
- **2019 Madrid UCL Final** vs Tottenham Hotspur (2-0)
- **2020 Premier League Title Coronation** vs Chelsea (5-3)

### 3. 🔍 [ Transfer Scout ] — Player Recruitment Simulator
- **Dual Selector & 6-Axis Radar Wheel**: Compare shortlisted targets against Liverpool squad benchmarks on a pure SVG radar matrix (*Goal Threat, Progressive Carries, Creative Passing, Counter-Pressing PAdj, Defensive Interceptions, Aerial Win %*).
- **Recruitment Filters**: Dynamic sliders for *Counter-Pressing Rate*, *FSG Max Age Ceiling*, and *Progressive Passes/90* driving real-time talent shortlists with *LFC Fit %* index scores.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + Anfield Dark Theme Tokens
- **Icons**: Lucide React
- **Visualisations**: Pure Math-Driven React SVG Components (Zero external charting library overhead)
- **Locale**: British English (`en-GB`) standard

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view Anfield Insights.

---

## 🏆 Honours & Club Lore
*"At a football club, there's a holy trinity – the players, the manager and the supporters. Directors don't come into it. They are only there to sign the cheques."* — Bill Shankly
