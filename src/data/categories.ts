import type { CategoryMeta, MarketTickerItem } from '../types/news';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    label: 'Front Page',
    accent: '#f43f5e',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    description: 'Live daily English briefing from Nepal, India, US, and global desks',
  },
  {
    id: 'nepal',
    label: 'Nepal',
    accent: '#dc2626',
    badgeClass: 'bg-red-500/15 text-red-400 border-red-500/30',
    description: 'The Kathmandu Post, OnlineKhabar, Nepali Times, Khabarhub & The Rising Nepal',
  },
  {
    id: 'india',
    label: 'India',
    accent: '#f97316',
    badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    description: 'Times of India & NDTV live top dispatches across South Asia',
  },
  {
    id: 'business',
    label: 'Markets & Profit',
    accent: '#f59e0b',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    description: 'NDTV Profit, Fox Business, Wall Street Journal Markets & Times of India Business',
  },
  {
    id: 'politics',
    label: 'Right-Wing & US',
    accent: '#ef4444',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    description: 'Fox News, New York Post, The Daily Wire, National Review, Washington Examiner & Breitbart',
  },
  {
    id: 'world',
    label: 'World',
    accent: '#38bdf8',
    badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    description: 'The New York Times, Wall Street Journal, Fox News World & NDTV World',
  },
  {
    id: 'technology',
    label: 'Tech',
    accent: '#a855f7',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    description: 'New York Times Technology & Times of India Tech',
  },
  {
    id: 'sports',
    label: 'Sports',
    accent: '#10b981',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    description: 'Cricket, football, global championships & sports headlines',
  },
];

export const SOURCE_GROUPS = [
  'All Sources',
  'Nepal Press',
  'New York Times',
  'Times of India',
  'NDTV Profit',
  'Fox News',
  'Right-Wing Media',
  'WSJ',
] as const;

export const CATEGORY_MAP: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export const MARKET_TICKERS: MarketTickerItem[] = [
  {
    symbol: 'NEPSE',
    name: 'Nepal Stock',
    price: '2,742.18',
    change: '+0.92%',
    changePct: 0.92,
    sparkline: [2705, 2712, 2709, 2721, 2728, 2734, 2739, 2742],
  },
  {
    symbol: 'NIFTY 50',
    name: 'NSE India',
    price: '24,812.60',
    change: '+0.64%',
    changePct: 0.64,
    sparkline: [24640, 24685, 24660, 24710, 24740, 24775, 24795, 24812],
  },
  {
    symbol: 'SENSEX',
    name: 'BSE India',
    price: '81,540.35',
    change: '+0.58%',
    changePct: 0.58,
    sparkline: [81020, 81140, 81110, 81260, 81350, 81410, 81490, 81540],
  },
  {
    symbol: 'SPX',
    name: 'S&P 500',
    price: '6,418.42',
    change: '+0.84%',
    changePct: 0.84,
    sparkline: [6340, 6352, 6348, 6370, 6381, 6394, 6405, 6418],
  },
  {
    symbol: 'NDX',
    name: 'NASDAQ 100',
    price: '22,904.15',
    change: '+1.36%',
    changePct: 1.36,
    sparkline: [22490, 22580, 22610, 22690, 22740, 22810, 22865, 22904],
  },
  {
    symbol: 'GOLD',
    name: 'Gold Spot',
    price: '$2,984.50',
    change: '+0.61%',
    changePct: 0.61,
    sparkline: [2958, 2962, 2960, 2969, 2973, 2977, 2980, 2984],
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$104,820',
    change: '+2.48%',
    changePct: 2.48,
    sparkline: [101200, 101950, 102400, 102100, 103100, 103800, 104300, 104820],
  },
];
