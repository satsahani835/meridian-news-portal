# THE MERIDIAN — Free English Global News Portal & Ad Monetization Platform

A magazine-grade, free English news web application engineered with bespoke editorial graphics, Framer Motion animations, live RSS English wire aggregation, and a complete multi-network ad revenue platform.

## Key Features

### Editorial & Graphics
- **Bespoke Visuals & Motion**: High-resolution photorealistic editorial photography + custom architectural SVG illustrations, animated Global Newsroom Telemetry radar, seamless breaking news marquee, and live global market sparklines.
- **Live English News Wire (`/api/live-news`)**: Automatically aggregates real-time free English RSS feeds (BBC World/Tech/Business/Science/Sport, NPR, NASA, The Guardian) with 10-minute server-side caching and graceful curated fallback.
- **Immersive Article Reader**: Reading progress bar, drop-cap editorial typography, Web Speech API "Listen to Story" audio player with equalizer animation, font-size switcher, bookmarks, comments, and `Ctrl+K` command search.
- **Dual Themes**: Switch seamlessly between **Midnight Obsidian** (dark) and **Broadsheet Ivory** (light).

### Ad Revenue & Monetization Engine
- **6 High-Yield Zero-CLS IAB Ad Placements**:
  1. Top Leaderboard Banner (`728×90` / `320×50`)
  2. Right-Rail Sticky Medium Rectangle (`300×250`)
  3. Right-Rail Sticky Half-Page (`300×600`)
  4. In-Feed Native Sponsored Cards (responsive)
  5. In-Article Mid-Read Banner (fluid)
  6. Dismissible Sticky Anchor Footer Bar
- **Google AdSense & Google Ad Manager (GPT) Ready**: Enter your `ca-pub-...` Publisher ID and Ad Unit Slot IDs right inside the built-in **Publisher Ad Revenue Studio** (or via `ADSENSE_PUB_ID` env var).
- **Direct-Sold Sponsor & Affiliate Campaign Manager**: Create, toggle, and delete direct sponsor campaigns (100% revenue share) with custom CPM/CPC rates and live placement targeting.
- **IAB Viewability & Telemetry**: Tracks impressions, IAB Active View (≥50% visible for ≥1s), verified clicks, CTR, eCPM, and estimated earnings in real time.
- **GDPR / CCPA Consent Mode v2 & Dynamic `/ads.txt`**: Built-in privacy consent banner and live `/ads.txt` endpoint.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production Build & Server

```bash
npm run build
ADSENSE_PUB_ID=ca-pub-YOUR_PUBLISHER_ID npm start
```

## Deploy to Vercel (via GitHub)

This repository includes native Vercel Serverless Functions (`api/live-news.js`, `api/ads/event.js`, `api/ads/stats.js`), static `/ads.txt`, and `vercel.json`:

1. Push this directory to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/new) (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
3. Click **Deploy** — your live English news portal, RSS wire API, and `/ads.txt` go live automatically.
