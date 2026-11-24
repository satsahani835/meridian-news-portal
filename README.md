# THE MERIDIAN — Free Live English News Portal (Nepal, India, US & Global)

A fast, 100% free English global news portal that automatically updates every 5 minutes from leading newspapers and broadcast channels, monetized cleanly with **Google AdSense**.

## Live Auto-Updating News Sources
- **Nepali English E-Newspapers**: The Kathmandu Post, OnlineKhabar English, Nepali Times, Khabarhub, The Rising Nepal
- **The New York Times**: Front Page, World, Technology
- **Times of India**: Top Stories, Business, Tech, Sports
- **NDTV Profit & NDTV**: Markets & Profit, Top Stories, World
- **Fox News, Fox Business & Right-Wing Channels**: Fox News, Fox Business, New York Post, The Daily Wire, National Review, Washington Examiner, Breitbart
- **The Wall Street Journal**: World News & Markets

## Google AdSense Integration
- **Publisher ID**: `ca-pub-7994439676148929` injected cleanly in [index.html](index.html) (`<head>`) for site-wide Google AdSense & Auto Ads.
- **Authorized Sellers**: [public/ads.txt](public/ads.txt) (and `/ads.txt` on Vercel) serves `google.com, pub-7994439676148929, DIRECT, f08c47fec0942fa0`.
- **Reusable `<AdBanner />` Component**: Located at `src/components/ads/AdBanner.tsx` for manual display, in-feed, or in-article ad slots:
  ```tsx
  import { AdBanner } from './components/ads/AdBanner';

  <AdBanner adSlot="1234567890" format="auto" />
  ```
  Or set optional Vercel environment variables (`VITE_ADSENSE_SLOT_LEADERBOARD`, `VITE_ADSENSE_SLOT_SIDEBAR_MPU`, `VITE_ADSENSE_SLOT_SIDEBAR_TALL`, `VITE_ADSENSE_SLOT_INFEED`, `VITE_ADSENSE_SLOT_INARTICLE`) to activate manual slots across the layout.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Deploy (Vercel + GitHub)

```bash
npm run build
vercel --prod
```
