export type CategoryId =
  | 'all'
  | 'nepal'
  | 'india'
  | 'business'
  | 'politics'
  | 'world'
  | 'technology'
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
  hasRealImage?: boolean;
  fallbackImage?: string;
  imageCaption: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
  isLiveWire?: boolean;
  externalUrl?: string;
  sourceName?: string;
  sourceGroup?: string;
  tags: string[];
  content: string[];
  keyTakeaways?: string[];
  views: number;
}

export type GoogleAdPlacement =
  | 'top-leaderboard'
  | 'sidebar-rectangle'
  | 'sidebar-skyscraper'
  | 'in-feed'
  | 'in-article'
  | 'sticky-anchor';

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePct: number;
  sparkline: number[];
}
