export type CategoryId =
  | 'all'
  | 'nepal'
  | 'india'
  | 'business'
  | 'us-tv'
  | 'us-print'
  | 'us-digital'
  | 'uk'
  | 'intl'
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

export interface ChannelDirectorySection {
  title: string;
  group: string;
  channels: Array<{ name: string; region: string; note: string }>;
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

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePct: number;
  sparkline: number[];
}
