export type CategoryId =
  | 'all'
  | 'world'
  | 'technology'
  | 'business'
  | 'science'
  | 'climate'
  | 'culture'
  | 'sports';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  accent: string;
  badgeClass: string;
  description: string;
}

export interface Author {
  name: string;
  role: string;
  avatarInitials: string;
  location?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: Exclude<CategoryId, 'all'>;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  fallbackImage?: string;
  imageCaption: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
  isLiveWire?: boolean;
  externalUrl?: string;
  sourceName?: string;
  tags: string[];
  content: string[];
  keyTakeaways?: string[];
  views: number;
}

export type AdPlacement =
  | 'top-leaderboard'
  | 'sidebar-rectangle'
  | 'sidebar-skyscraper'
  | 'in-feed-native'
  | 'in-article-mid'
  | 'sticky-footer';

export type AdMode = 'demo-direct' | 'adsense-live' | 'hybrid';

export interface DirectSponsorCampaign {
  id: string;
  sponsorName: string;
  badgeText: string;
  headline: string;
  description: string;
  ctaLabel: string;
  destinationUrl: string;
  accentFrom: string;
  accentTo: string;
  placements: AdPlacement[];
  cpm: number; // $ per 1,000 impressions
  cpc: number; // $ per click
  active: boolean;
  categoryTag: string;
}

export interface AdSlotConfig {
  id: AdPlacement;
  label: string;
  dimensions: string;
  adsenseSlotId: string;
  gptUnitPath: string;
  enabled: boolean;
  baseCpm: number;
  baseCpc: number;
}

export interface AdMonetizationConfig {
  mode: AdMode;
  adsensePublisherId: string; // e.g. ca-pub-1234567890123456
  gptNetworkCode: string; // e.g. /22639388115/meridian_top
  autoRefreshSeconds: number; // 0 = off
  lazyLoadAds: boolean;
  enableStickyFooter: boolean;
  enableInFeedNative: boolean;
  enableInArticleAds: boolean;
  consentStatus: 'pending' | 'accepted-all' | 'essential-only';
  slots: Record<AdPlacement, AdSlotConfig>;
  campaigns: DirectSponsorCampaign[];
}

export interface SlotMetrics {
  impressions: number;
  viewableImpressions: number;
  clicks: number;
  revenue: number;
}

export interface AdAnalyticsState {
  totalImpressions: number;
  totalViewableImpressions: number;
  totalClicks: number;
  totalRevenue: number;
  bySlot: Record<string, SlotMetrics>;
  history: Array<{ time: string; revenue: number; impressions: number; clicks: number }>;
}

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePct: number;
  sparkline: number[];
}
