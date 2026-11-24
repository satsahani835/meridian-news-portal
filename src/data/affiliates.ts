import type { CategoryId } from '../types/news';

export type AffiliateIconName = 'shield' | 'trending' | 'remit' | 'plane' | 'cpu' | 'landmark';

export interface AffiliateOffer {
  id: string;
  envKey: string;
  partner: string;
  badge: string;
  headline: string;
  description: string;
  ctaLabel: string;
  highlight: string;
  url: string;
  icon: AffiliateIconName;
  accentClass: string;
  categories: CategoryId[];
}

export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    id: 'aff-vpn',
    envKey: 'VITE_AFF_VPN_URL',
    partner: 'NordVPN',
    badge: 'Privacy Pick',
    headline: 'Protect Your Privacy & Read Global News Without Tracking',
    description:
      'Encrypted high-speed VPN across 110+ countries with built-in ad & tracker blocking on up to 10 devices.',
    ctaLabel: 'Get NordVPN Deal',
    highlight: 'Up to 70% Off',
    url: import.meta.env.VITE_AFF_VPN_URL || 'https://nordvpn.com/',
    icon: 'shield',
    accentClass: 'from-sky-500 to-indigo-600',
    categories: ['all', 'us-tv', 'us-print', 'us-digital', 'uk', 'world', 'sports'],
  },
  {
    id: 'aff-remit',
    envKey: 'VITE_AFF_REMIT_URL',
    partner: 'Wise',
    badge: 'South Asia Pick',
    headline: 'Send Money to Nepal, India & 160+ Countries at Real Exchange Rates',
    description:
      'Transparent low fees with zero hidden bank markups — trusted by millions of global diaspora families.',
    ctaLabel: 'Check Live Rates',
    highlight: 'Mid-Market FX',
    url: import.meta.env.VITE_AFF_REMIT_URL || 'https://wise.com/',
    icon: 'remit',
    accentClass: 'from-emerald-500 to-teal-600',
    categories: ['nepal', 'india', 'all'],
  },
  {
    id: 'aff-markets',
    envKey: 'VITE_AFF_FINANCE_URL',
    partner: 'TradingView',
    badge: 'Markets Pick',
    headline: 'Track Global Stocks, Nifty 50, S&P 500, Gold & Crypto Live',
    description:
      'Institutional-grade interactive charts, real-time alerts, and stock screeners used by 60M+ investors.',
    ctaLabel: 'Start Free Trial',
    highlight: 'Free Account + $15 Bonus',
    url: import.meta.env.VITE_AFF_FINANCE_URL || 'https://www.tradingview.com/',
    icon: 'trending',
    accentClass: 'from-amber-500 to-rose-600',
    categories: ['business', 'all'],
  },
  {
    id: 'aff-gold',
    envKey: 'VITE_AFF_GOLD_URL',
    partner: 'Interactive Brokers',
    badge: 'Wealth & Hedge',
    headline: 'Invest Across 150 Global Markets, Treasuries & Precious Metals',
    description:
      'Low-commission international brokerage access to US, UK, European, and Asian equities from one account.',
    ctaLabel: 'Explore Account',
    highlight: '150+ Global Markets',
    url: import.meta.env.VITE_AFF_GOLD_URL || 'https://www.interactivebrokers.com/',
    icon: 'landmark',
    accentClass: 'from-amber-600 to-orange-600',
    categories: ['business', 'us-print', 'us-tv', 'us-digital'],
  },
  {
    id: 'aff-travel',
    envKey: 'VITE_AFF_TRAVEL_URL',
    partner: 'Booking.com',
    badge: 'Travel Pick',
    headline: 'Compare Global Flights & Hotels with Free Cancellation',
    description:
      'Instant savings on stays across Kathmandu, New Delhi, London, New York, Europe, and Sydney.',
    ctaLabel: 'Search Deals',
    highlight: 'Genius Member Discounts',
    url: import.meta.env.VITE_AFF_TRAVEL_URL || 'https://www.booking.com/',
    icon: 'plane',
    accentClass: 'from-blue-600 to-cyan-500',
    categories: ['nepal', 'india', 'intl', 'uk', 'sports'],
  },
  {
    id: 'aff-tech',
    envKey: 'VITE_AFF_TECH_URL',
    partner: 'Hostinger',
    badge: 'Tech & Creators',
    headline: 'Launch Fast Websites & AI Apps with Managed Cloud Hosting',
    description:
      '99.9% uptime, free SSL, global CDN, and custom domain included for startups, blogs, and news sites.',
    ctaLabel: 'Claim Offer',
    highlight: 'Up to 75% Off',
    url: import.meta.env.VITE_AFF_TECH_URL || 'https://www.hostinger.com/',
    icon: 'cpu',
    accentClass: 'from-purple-600 to-fuchsia-600',
    categories: ['technology', 'world', 'intl'],
  },
];

export function getOffersForCategory(category: CategoryId, count = 2): AffiliateOffer[] {
  const matched = AFFILIATE_OFFERS.filter((o) => o.categories.includes(category));
  const pool = matched.length >= count ? matched : [...matched, ...AFFILIATE_OFFERS.filter((o) => !matched.includes(o))];
  return pool.slice(0, count);
}
