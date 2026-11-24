import React, { useEffect, useRef } from 'react';

export const ADSENSE_PUBLISHER_ID =
  import.meta.env.VITE_ADSENSE_PUB_ID || 'ca-pub-7994439676148929';

export interface AdBannerProps {
  /** Numeric Google AdSense ad unit slot ID (e.g. "1234567890") from your AdSense dashboard */
  adSlot?: string;
  /** Optional override for Publisher ID (defaults to ca-pub-7994439676148929) */
  adClient?: string;
  /** AdSense format: "auto", "fluid", "rectangle", "horizontal", or "vertical" */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** Optional AdSense layout, e.g. "in-article" for fluid in-article units */
  layout?: string;
  /** Optional layout key for In-Feed ads (e.g. "-fb+5w+4e-db+86") */
  layoutKey?: string;
  /** Enable full-width responsive behavior on mobile */
  responsive?: boolean;
  /** Minimum height Tailwind class to prevent Cumulative Layout Shift (CLS) */
  minHeightClass?: string;
  /** Optional accessible label */
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>> & {
      requestNonPersonalizedAds?: number;
    };
  }
}

/**
 * Reusable Google AdSense <AdBanner /> component.
 *
 * - Safe with React StrictMode and hydration (pushes once per mounted slot).
 * - When `adSlot` is provided (directly or via VITE_ADSENSE_SLOT_* env vars), renders
 *   the live Google AdSense `<ins class="adsbygoogle">` unit with zero layout shift.
 * - When `adSlot` is omitted, returns null so Google Auto Ads from index.html handle
 *   placements cleanly without throwing AdSense TagErrors in the console.
 */
export const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adClient = ADSENSE_PUBLISHER_ID,
  format = 'auto',
  layout,
  layoutKey,
  responsive = true,
  minHeightClass = 'min-h-[90px]',
  label = 'Advertisement',
  className = '',
}) => {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!adSlot || pushedRef.current) return;
    pushedRef.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore if script is blocked by an ad blocker or still initializing
    }
  }, [adSlot]);

  if (!adSlot) {
    return null;
  }

  return (
    <div
      aria-label={label}
      className={`w-full overflow-hidden rounded-2xl border border-slate-500/15 dark:border-white/10 bg-white/70 dark:bg-[#0c1220]/80 p-2 ${minHeightClass} ${className}`}
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 text-center pb-1">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block', minHeight: format === 'rectangle' ? '250px' : '90px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};
