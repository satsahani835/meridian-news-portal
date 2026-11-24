import type { Article } from '../types/news';

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString();

// Instant fallback edition shown briefly while live RSS feeds hydrate (or if offline)
export const EDITORIAL_ARTICLES: Article[] = [
  {
    id: 'ed-nordic-quantum-ai',
    slug: 'global-ai-infrastructure-expansion-2026',
    title: 'Global AI Supercomputing Corridors Expand Across Asia, Europe, and North America',
    subtitle:
      'Next-generation hydroelectric and clean-energy compute clusters accelerate sovereign artificial intelligence networks worldwide.',
    excerpt:
      'High-efficiency computing hubs pair optical interconnects with renewable grids to meet surging enterprise demand.',
    category: 'technology',
    author: {
      name: 'Meridian Tech Desk',
      role: 'Technology Desk',
      avatarInitials: 'MT',
      location: 'Global',
    },
    publishedAt: hoursAgo(1),
    readTimeMinutes: 4,
    image: '/images/hero-ai-datacenter.jpg',
    imageCaption: 'Modern glass supercomputing facility integrated with renewable energy infrastructure.',
    isFeatured: true,
    isBreaking: true,
    sourceName: 'The Meridian',
    sourceGroup: 'New York Times',
    tags: ['AI', 'Technology', 'Infrastructure'],
    content: [
      'Live headlines from The Kathmandu Post, OnlineKhabar, The New York Times, Times of India, NDTV Profit, Fox News, and Wall Street Journal sync automatically every 5 minutes.',
      'Across major financial and technology capitals, cloud providers and semiconductor foundries are racing to deploy optical interconnects and grid-scale renewable power to sustain rapid enterprise adoption.',
    ],
    views: 18920,
  },
  {
    id: 'ed-markets-update',
    slug: 'global-markets-nepse-nifty-wall-street-briefing',
    title: 'Global Markets Briefing: NEPSE, Nifty 50, Sensex, and Wall Street Track Industrial Earnings',
    subtitle:
      'Regional and Wall Street indexes focus on central-bank guidance, energy prices, and quarterly corporate profits.',
    excerpt:
      'Investors across Kathmandu, Mumbai, and New York monitor inflation prints, treasury yields, and earnings momentum.',
    category: 'business',
    author: {
      name: 'Meridian Markets Desk',
      role: 'Markets & Profit',
      avatarInitials: 'MM',
      location: 'Mumbai & New York',
    },
    publishedAt: hoursAgo(2),
    readTimeMinutes: 3,
    image: '/images/markets-skyline.jpg',
    imageCaption: 'Global financial district skyline at market open.',
    isBreaking: true,
    sourceName: 'NDTV Profit',
    sourceGroup: 'NDTV Profit',
    tags: ['Markets', 'NEPSE', 'Nifty 50', 'Wall Street'],
    content: [
      'Financial desks across South Asia and North America are tracking corporate margin resilience alongside stabilizing sovereign yields.',
      'Refresh or select any outlet above to browse the latest live reports from NDTV Profit, Fox Business, Times of India Business, and The Wall Street Journal.',
    ],
    views: 15450,
  },
  {
    id: 'ed-south-asia-diplomacy',
    slug: 'nepal-india-regional-trade-corridor-highlights',
    title: 'Nepal & South Asia Trade Corridors Accelerate Cross-Border Energy and Digital Connectivity',
    subtitle:
      'Regional ministries advance power-trade agreements, digital payments interoperability, and transit infrastructure.',
    excerpt:
      'Cross-border transmission lines and unified digital settlement corridors boost commerce across Nepal and India.',
    category: 'nepal',
    author: {
      name: 'South Asia Wire',
      role: 'Nepal Press',
      avatarInitials: 'NP',
      location: 'Kathmandu',
    },
    publishedAt: hoursAgo(3),
    readTimeMinutes: 3,
    image: '/images/world-summit.svg',
    imageCaption: 'Regional diplomatic and economic summit overview.',
    sourceName: 'The Kathmandu Post',
    sourceGroup: 'Nepal Press',
    tags: ['Nepal', 'South Asia', 'Trade'],
    content: [
      'Cross-border hydropower exports and digital retail payment links are reshaping regional trade volumes between Kathmandu and New Delhi.',
      'Select the Nepal tab to browse real-time English stories from The Kathmandu Post, OnlineKhabar, Nepali Times, Khabarhub, and The Rising Nepal.',
    ],
    views: 14180,
  },
  {
    id: 'ed-sports-championships',
    slug: 'international-cricket-football-athletics-wrap',
    title: 'International Sports Wrap: Championship Fixtures, Cricket Series, and Athletics Highlights',
    subtitle:
      'Follow live tournament updates, match analyses, and global sporting headlines across cricket, football, and athletics.',
    excerpt:
      'Evening floodlight fixtures and series deciders headline today’s international sporting calendar.',
    category: 'sports',
    author: {
      name: 'Sports Desk',
      role: 'Sports Wire',
      avatarInitials: 'SD',
      location: 'Global',
    },
    publishedAt: hoursAgo(4),
    readTimeMinutes: 3,
    image: '/images/sports-stadium.jpg',
    imageCaption: 'Championship stadium illuminated for evening fixtures.',
    sourceName: 'Times of India',
    sourceGroup: 'Times of India',
    tags: ['Sports', 'Cricket', 'Athletics'],
    content: [
      'Real-time sports coverage updates automatically from Times of India Sports and international wire desks.',
    ],
    views: 11840,
  },
];
