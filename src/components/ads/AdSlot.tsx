import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ShieldCheck, Megaphone } from 'lucide-react';
import type { AdPlacement } from '../../types/news';
import { useAdMonetization } from '../../context/AdMonetizationContext';

interface AdSlotProps {
  placement: AdPlacement;
  seed?: number;
  className?: string;
  onOpenPublisherStudio?: () => void;
  onAdClickToast?: (msg: string) => void;
}

const MIN_HEIGHT_BY_PLACEMENT: Record<AdPlacement, string> = {
  'top-leaderboard': 'min-h-[96px]',
  'sidebar-rectangle': 'min-h-[268px]',
  'sidebar-skyscraper': 'min-h-[460px]',
  'in-feed-native': 'min-h-[340px]',
  'in-article-mid': 'min-h-[156px]',
  'sticky-footer': 'min-h-[72px]',
};

export const AdSlot: React.FC<AdSlotProps> = ({
  placement,
  seed = 0,
  className = '',
  onOpenPublisherStudio,
  onAdClickToast,
}) => {
  const {
    config,
    isLiveAdSenseConfigured,
    recordImpression,
    recordViewableImpression,
    recordClick,
    getCampaignForPlacement,
  } = useAdMonetization();

  const slotCfg = config.slots[placement];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pushedAdSenseRef = useRef(false);
  const impressionRecordedRef = useRef(false);
  const viewableRecordedRef = useRef(false);
  const [isVisibleForLazy, setIsVisibleForLazy] = useState(!config.lazyLoadAds || placement === 'top-leaderboard');
  const [isViewable, setIsViewable] = useState(false);

  const campaign = getCampaignForPlacement(placement, seed);
  const useLiveAdSense =
    isLiveAdSenseConfigured &&
    (config.mode === 'adsense-live' || (config.mode === 'hybrid' && placement !== 'in-feed-native'));

  const effectiveCpm = campaign?.cpm ?? slotCfg?.baseCpm ?? 10.5;
  const effectiveCpc = campaign?.cpc ?? slotCfg?.baseCpc ?? 0.85;

  // Lazy load trigger with 250px lookahead to avoid impacting LCP
  useEffect(() => {
    if (isVisibleForLazy || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisibleForLazy(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisibleForLazy]);

  // IAB Viewability Tracking: >= 50% visible for >= 1000ms
  useEffect(() => {
    if (!slotCfg?.enabled || !isVisibleForLazy || !containerRef.current) return;

    if (!impressionRecordedRef.current) {
      impressionRecordedRef.current = true;
      recordImpression(placement, effectiveCpm);
    }

    let dwellTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.intersectionRatio >= 0.5) {
          if (!viewableRecordedRef.current && !dwellTimer) {
            dwellTimer = setTimeout(() => {
              viewableRecordedRef.current = true;
              setIsViewable(true);
              recordViewableImpression(placement);
            }, 1000);
          }
        } else if (dwellTimer) {
          clearTimeout(dwellTimer);
          dwellTimer = null;
        }
      },
      { threshold: [0, 0.5, 0.9] }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [slotCfg?.enabled, isVisibleForLazy, placement, effectiveCpm, recordImpression, recordViewableImpression]);

  // Safe single-push for Google AdSense when configured
  useEffect(() => {
    if (!useLiveAdSense || !isVisibleForLazy || pushedAdSenseRef.current) return;
    pushedAdSenseRef.current = true;
    try {
      const win = window as unknown as { adsbygoogle?: unknown[] };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch {
      // AdSense script blocked or pending approval
    }
  }, [useLiveAdSense, isVisibleForLazy]);

  if (!slotCfg?.enabled) return null;

  const handleSponsorClick = (e: React.MouseEvent) => {
    recordClick(placement, effectiveCpc);
    if (!campaign) return;
    if (campaign.destinationUrl.includes('example.com')) {
      e.preventDefault();
      onAdClickToast?.(
        `Ad click tracked (+$${effectiveCpc.toFixed(2)} est. CPC) — ${campaign.sponsorName} (${slotCfg.label})`
      );
    }
  };

  const reservedHeight = MIN_HEIGHT_BY_PLACEMENT[placement];

  return (
    <div
      ref={containerRef}
      data-ad-placement={placement}
      aria-label={`Advertisement: ${slotCfg.label}`}
      className={`relative w-full ${reservedHeight} ${className}`}
    >
      {!isVisibleForLazy ? (
        <div
          className={`w-full h-full ${reservedHeight} rounded-2xl border border-slate-500/15 ad-shimmer flex items-center justify-center`}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">
            Loading Sponsored Unit
          </span>
        </div>
      ) : useLiveAdSense ? (
        <div className="w-full h-full rounded-2xl border border-slate-500/20 bg-slate-900/40 dark:bg-slate-900/50 p-2 flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full flex items-center justify-between px-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span>Advertisement · Google AdSense</span>
            <span className="text-emerald-400">{slotCfg.dimensions}</span>
          </div>
          <ins
            className="adsbygoogle block w-full"
            style={{ display: 'block', minHeight: placement === 'top-leaderboard' ? '72px' : '220px' }}
            data-ad-client={config.adsensePublisherId}
            data-ad-slot={slotCfg.adsenseSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : campaign ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="group relative w-full h-full rounded-2xl overflow-hidden border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0f1626] shadow-lg shadow-black/5 dark:shadow-black/30"
        >
          {/* Ambient Sponsor Gradient Accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.11] dark:opacity-[0.18] transition-opacity duration-500 group-hover:opacity-25"
            style={{
              background: `linear-gradient(135deg, ${campaign.accentFrom}, ${campaign.accentTo})`,
            }}
          />
          <div
            className="pointer-events-none absolute -top-20 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: campaign.accentFrom }}
          />

          {/* Top Bar: FTC Disclosure + Publisher Quick Access */}
          <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 border-b border-slate-500/10 text-[10px] font-mono uppercase tracking-[0.16em]">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
              >
                <Sparkles className="w-2.5 h-2.5" />
                Ad
              </span>
              <span>{campaign.badgeText}</span>
              {isViewable && (
                <span
                  title="IAB Active View verified"
                  className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Viewable
                </span>
              )}
            </div>
            {onOpenPublisherStudio && (
              <button
                type="button"
                onClick={onOpenPublisherStudio}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer"
                title="Configure this ad unit in Publisher Revenue Studio"
              >
                <Megaphone className="w-3 h-3" />
                <span className="hidden sm:inline">Advertise / Manage</span>
              </button>
            )}
          </div>

          {/* Layout Variant 1: Horizontal Leaderboard / Sticky Footer / In-Article */}
          {placement === 'top-leaderboard' || placement === 'sticky-footer' || placement === 'in-article-mid' ? (
            <a
              href={campaign.destinationUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleSponsorClick}
              className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                placement === 'sticky-footer' ? 'px-4 py-2.5' : 'px-5 py-4'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${campaign.accentFrom}, ${campaign.accentTo})`,
                  }}
                >
                  {campaign.sponsorName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                      {campaign.sponsorName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400">
                      {campaign.categoryTag}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {campaign.headline}
                  </p>
                  {placement !== 'sticky-footer' && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                      {campaign.description}
                    </p>
                  )}
                </div>
              </div>

              <span
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-transform duration-200 group-hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(135deg, ${campaign.accentFrom}, ${campaign.accentTo})`,
                }}
              >
                {campaign.ctaLabel}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ) : (
            /* Layout Variant 2: Card / Sidebar MPU / Skyscraper / In-Feed Native */
            <a
              href={campaign.destinationUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleSponsorClick}
              className="relative z-10 flex flex-col justify-between h-[calc(100%-30px)] p-5 gap-4"
            >
              <div>
                {/* Bespoke Geometric Visual Banner inside Vertical/Native Ad */}
                <div
                  className={`relative w-full ${
                    placement === 'sidebar-skyscraper' ? 'h-44' : 'h-28'
                  } rounded-xl mb-4 overflow-hidden flex flex-col justify-between p-4 text-white`}
                  style={{
                    background: `linear-gradient(135deg, ${campaign.accentFrom}, ${campaign.accentTo})`,
                  }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
                    viewBox="0 0 320 180"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <circle cx="270" cy="30" r="90" fill="white" fillOpacity="0.22" />
                    <circle cx="40" cy="160" r="70" fill="black" fillOpacity="0.18" />
                    <path d="M0 130 Q140 60 320 120" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
                  </svg>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {campaign.categoryTag}
                    </span>
                    <span className="text-xs font-extrabold tracking-tight opacity-90">
                      {campaign.sponsorName}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">
                      Direct Partner Spotlight
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                  {campaign.headline}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-500/15">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Est. eCPM ${effectiveCpm.toFixed(2)}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${campaign.accentFrom}, ${campaign.accentTo})`,
                  }}
                >
                  {campaign.ctaLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          )}
        </motion.div>
      ) : null}
    </div>
  );
};
