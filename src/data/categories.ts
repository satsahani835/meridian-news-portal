import type { CategoryMeta, MarketTickerItem } from '../types/news';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    label: 'Front Page',
    accent: '#f43f5e',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    description: 'Curated global briefing across every desk',
  },
  {
    id: 'world',
    label: 'World',
    accent: '#38bdf8',
    badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    description: 'Geopolitics, diplomacy, and international dispatches',
  },
  {
    id: 'technology',
    label: 'Technology',
    accent: '#a855f7',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    description: 'Artificial intelligence, semiconductors, and frontier computing',
  },
  {
    id: 'business',
    label: 'Markets',
    accent: '#f59e0b',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    description: 'Global finance, central banks, and corporate strategy',
  },
  {
    id: 'science',
    label: 'Science',
    accent: '#14b8a6',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    description: 'Deep space, quantum physics, and biomedical breakthroughs',
  },
  {
    id: 'climate',
    label: 'Climate',
    accent: '#10b981',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    description: 'Clean energy infrastructure, grids, and planetary resilience',
  },
  {
    id: 'culture',
    label: 'Culture',
    accent: '#ec4899',
    badgeClass: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    description: 'Architecture, cinema, design, and contemporary arts',
  },
  {
    id: 'sports',
    label: 'Sports',
    accent: '#f97316',
    badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    description: 'Championship athletics, football, motorsport, and analytics',
  },
];

export const CATEGORY_MAP: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export const MARKET_TICKERS: MarketTickerItem[] = [
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
    symbol: 'FTSE',
    name: 'FTSE 100',
    price: '8,842.70',
    change: '+0.42%',
    changePct: 0.42,
    sparkline: [8802, 8795, 8810, 8818, 8824, 8830, 8836, 8842],
  },
  {
    symbol: 'N225',
    name: 'Nikkei 225',
    price: '41,210.80',
    change: '-0.28%',
    changePct: -0.28,
    sparkline: [41380, 41350, 41310, 41335, 41290, 41260, 41230, 41210],
  },
  {
    symbol: 'XAU',
    name: 'Gold Spot',
    price: '$2,984.50',
    change: '+0.61%',
    changePct: 0.61,
    sparkline: [2958, 2962, 2960, 2969, 2973, 2977, 2980, 2984],
  },
  {
    symbol: 'BRENT',
    name: 'Brent Crude',
    price: '$71.40',
    change: '-1.12%',
    changePct: -1.12,
    sparkline: [72.9, 72.6, 72.4, 72.1, 71.9, 71.8, 71.6, 71.4],
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
