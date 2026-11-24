import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  DollarSign,
  Eye,
  MousePointerClick,
  TrendingUp,
  Settings2,
  Megaphone,
  FileCode2,
  Calculator,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  RotateCcw,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useAdMonetization } from '../../context/AdMonetizationContext';
import type { AdMode, AdPlacement } from '../../types/news';

interface PublisherDashboardModalProps {
  open: boolean;
  onClose: () => void;
}

type StudioTab = 'overview' | 'networks' | 'campaigns' | 'calculator' | 'adstxt';

const ALL_PLACEMENTS: AdPlacement[] = [
  'top-leaderboard',
  'sidebar-rectangle',
  'sidebar-skyscraper',
  'in-feed-native',
  'in-article-mid',
  'sticky-footer',
];

const GRADIENT_PRESETS = [
  { label: 'Ocean Indigo', from: '#0ea5e9', to: '#6366f1' },
  { label: 'Amber Crimson', from: '#f59e0b', to: '#e11d48' },
  { label: 'Emerald Cyan', from: '#10b981', to: '#0284c7' },
  { label: 'Violet Rose', from: '#a855f7', to: '#ec4899' },
];

export const PublisherDashboardModal: React.FC<PublisherDashboardModalProps> = ({ open, onClose }) => {
  const {
    config,
    analytics,
    isLiveAdSenseConfigured,
    updateConfig,
    updateSlot,
    addCampaign,
    toggleCampaign,
    deleteCampaign,
    resetAnalytics,
    generateAdsTxt,
  } = useAdMonetization();

  const [tab, setTab] = useState<StudioTab>('overview');
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  // Revenue Calculator State
  const [dailyVisitors, setDailyVisitors] = useState(25000);
  const [pagesPerVisit, setPagesPerVisit] = useState(2.8);
  const [rpm, setRpm] = useState(12.5);

  // New Direct Sponsor Campaign Form
  const [sponsorName, setSponsorName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Learn More');
  const [destinationUrl, setDestinationUrl] = useState('https://');
  const [categoryTag, setCategoryTag] = useState('Featured Partner');
  const [cpm, setCpm] = useState(16);
  const [cpc, setCpc] = useState(1.25);
  const [gradientIdx, setGradientIdx] = useState(0);
  const [selectedPlacements, setSelectedPlacements] = useState<AdPlacement[]>([
    'top-leaderboard',
    'in-feed-native',
    'sidebar-rectangle',
  ]);

  const ctr =
    analytics.totalImpressions > 0
      ? ((analytics.totalClicks / analytics.totalImpressions) * 100).toFixed(2)
      : '0.00';
  const viewabilityRate =
    analytics.totalImpressions > 0
      ? Math.min(100, (analytics.totalViewableImpressions / analytics.totalImpressions) * 100).toFixed(1)
      : '0.0';
  const effectiveEcpm =
    analytics.totalImpressions > 0
      ? ((analytics.totalRevenue / analytics.totalImpressions) * 1000).toFixed(2)
      : '0.00';

  const dailyPageviews = Math.round(dailyVisitors * pagesPerVisit);
  const dailyEstRevenue = (dailyPageviews / 1000) * rpm;
  const monthlyEstRevenue = dailyEstRevenue * 30;
  const yearlyEstRevenue = dailyEstRevenue * 365;

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName.trim() || !headline.trim()) return;
    const preset = GRADIENT_PRESETS[gradientIdx];
    addCampaign({
      sponsorName: sponsorName.trim(),
      badgeText: 'Direct Sponsor',
      headline: headline.trim(),
      description: description.trim() || `Exclusive partner offer from ${sponsorName.trim()}.`,
      ctaLabel: ctaLabel.trim() || 'Visit Sponsor',
      destinationUrl: destinationUrl.trim().startsWith('http')
        ? destinationUrl.trim()
        : `https://${destinationUrl.trim() || 'example.com'}`,
      accentFrom: preset.from,
      accentTo: preset.to,
      placements: selectedPlacements.length > 0 ? selectedPlacements : ['top-leaderboard'],
      cpm: Number(cpm) || 15,
      cpc: Number(cpc) || 1.2,
      active: true,
      categoryTag: categoryTag.trim() || 'Partner',
    });
    setSponsorName('');
    setHeadline('');
    setDescription('');
    setDestinationUrl('https://');
  };

  const togglePlacementSelect = (p: AdPlacement) => {
    setSelectedPlacements((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const adsTxtContent = generateAdsTxt();

  const handleCopyAdsTxt = () => {
    navigator.clipboard?.writeText(adsTxtContent);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 2000);
  };

  const handleDownloadAdsTxt = () => {
    const blob = new Blob([adsTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ads.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Build SVG polyline points from analytics.history
  const chartPoints = analytics.history.length > 1 ? analytics.history : [
    { time: 'Start', revenue: 0, impressions: 0, clicks: 0 },
    { time: 'Now', revenue: analytics.totalRevenue, impressions: analytics.totalImpressions, clicks: analytics.totalClicks },
  ];
  const maxRev = Math.max(0.05, ...chartPoints.map((p) => p.revenue));
  const svgPolyline = chartPoints
    .map((pt, i) => {
      const x = (i / Math.max(1, chartPoints.length - 1)) * 460 + 20;
      const y = 135 - (pt.revenue / maxRev) * 105;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Publisher Ad Revenue Studio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-500/25 dark:border-white/15 bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-500/15 bg-slate-50/80 dark:bg-[#0f1628]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold tracking-tight">Publisher Ad Revenue Studio</h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                        isLiveAdSenseConfigured
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : 'bg-amber-500/15 text-amber-500'
                      }`}
                    >
                      <Radio className="w-2.5 h-2.5 animate-pulse" />
                      {isLiveAdSenseConfigured ? 'AdSense Live' : 'Direct / Preview Active'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Connect Google AdSense, manage direct-sold sponsors, and track real-time IAB earnings
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Publisher Studio"
                className="w-9 h-9 rounded-xl border border-slate-500/20 hover:bg-rose-500 hover:text-white hover:border-rose-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 px-6 py-3 border-b border-slate-500/15 overflow-x-auto bg-white dark:bg-[#0b101d]">
              {[
                { id: 'overview', label: 'Live Telemetry', icon: TrendingUp },
                { id: 'networks', label: 'AdSense & Slots', icon: Settings2 },
                { id: 'campaigns', label: `Direct Sponsors (${config.campaigns.length})`, icon: Megaphone },
                { id: 'calculator', label: 'Revenue Calculator', icon: Calculator },
                { id: 'adstxt', label: 'ads.txt & Deploy', icon: FileCode2 },
              ].map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id as StudioTab)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-500/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {tab === 'overview' && (
                <>
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10">
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>Session Est. Revenue</span>
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div className="mt-2 text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                        ${analytics.totalRevenue.toFixed(3)}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        Blended eCPM: ${effectiveEcpm}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                      <div className="flex items-center justify-between text-xs font-semibold text-sky-500">
                        <span>Ad Impressions</span>
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="mt-2 text-2xl font-extrabold font-mono">
                        {analytics.totalImpressions.toLocaleString()}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        IAB Viewable: {analytics.totalViewableImpressions} ({viewabilityRate}%)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-500">
                        <span>Verified Ad Clicks</span>
                        <MousePointerClick className="w-4 h-4" />
                      </div>
                      <div className="mt-2 text-2xl font-extrabold font-mono">
                        {analytics.totalClicks.toLocaleString()}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        Click-Through Rate: {ctr}%
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5">
                      <div className="flex items-center justify-between text-xs font-semibold text-purple-500">
                        <span>Active Ad Slots</span>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="mt-2 text-2xl font-extrabold font-mono">
                        {Object.values(config.slots).filter((s) => s.enabled).length} / 6
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        Zero-CLS Protected
                      </div>
                    </div>
                  </div>

                  {/* Live Animated Earnings Sparkline Chart */}
                  <div className="p-5 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-bold">Real-Time Session Revenue Curve</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Scroll the portal or click any sponsored ad to watch live impression & CPC revenue update
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={resetAnalytics}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-500/25 text-xs font-semibold hover:bg-slate-500/10 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset Stats
                      </button>
                    </div>
                    <svg viewBox="0 0 500 155" className="w-full h-40 overflow-visible">
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="20" y1="30" x2="480" y2="30" stroke="currentColor" strokeOpacity="0.1" />
                      <line x1="20" y1="82" x2="480" y2="82" stroke="currentColor" strokeOpacity="0.1" />
                      <line x1="20" y1="135" x2="480" y2="135" stroke="currentColor" strokeOpacity="0.15" />
                      <polygon
                        points={`20,135 ${svgPolyline} 480,135`}
                        fill="url(#revFill)"
                      />
                      <polyline
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={svgPolyline}
                      />
                    </svg>
                  </div>

                  {/* Per-Slot Breakdown Table */}
                  <div className="rounded-2xl border border-slate-500/20 overflow-hidden">
                    <div className="px-5 py-3 bg-slate-50 dark:bg-[#0f1626] border-b border-slate-500/15 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Placement Performance Breakdown
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-500/15 text-slate-500">
                          <tr>
                            <th className="px-5 py-3">Placement</th>
                            <th className="px-4 py-3">IAB Size</th>
                            <th className="px-4 py-3 text-right">Impressions</th>
                            <th className="px-4 py-3 text-right">Viewable</th>
                            <th className="px-4 py-3 text-right">Clicks</th>
                            <th className="px-5 py-3 text-right">Est. Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-500/10">
                          {ALL_PLACEMENTS.map((slotId) => {
                            const sCfg = config.slots[slotId];
                            const m = analytics.bySlot[slotId] || {
                              impressions: 0,
                              viewableImpressions: 0,
                              clicks: 0,
                              revenue: 0,
                            };
                            return (
                              <tr key={slotId} className="hover:bg-slate-500/5">
                                <td className="px-5 py-3 font-semibold">{sCfg.label}</td>
                                <td className="px-4 py-3 font-mono text-slate-500">{sCfg.dimensions}</td>
                                <td className="px-4 py-3 text-right font-mono">{m.impressions}</td>
                                <td className="px-4 py-3 text-right font-mono text-emerald-500">
                                  {m.viewableImpressions}
                                </td>
                                <td className="px-4 py-3 text-right font-mono text-amber-500">{m.clicks}</td>
                                <td className="px-5 py-3 text-right font-mono font-bold">
                                  ${m.revenue.toFixed(4)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {tab === 'networks' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626] space-y-4">
                    <h3 className="text-sm font-bold">Monetization Mode & Ad Network Credentials</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {(
                        [
                          {
                            id: 'hybrid',
                            title: 'Hybrid (Recommended)',
                            desc: 'Google AdSense display + Direct native sponsors for maximum RPM',
                          },
                          {
                            id: 'adsense-live',
                            title: 'Google AdSense Live',
                            desc: 'Serve programmatic Google AdSense across all enabled slots',
                          },
                          {
                            id: 'demo-direct',
                            title: 'Direct Sponsors Only',
                            desc: 'Keep 100% revenue via direct brand deals & affiliate creatives',
                          },
                        ] as Array<{ id: AdMode; title: string; desc: string }>
                      ).map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => updateConfig({ mode: m.id })}
                          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            config.mode === m.id
                              ? 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500'
                              : 'border-slate-500/20 hover:border-slate-400'
                          }`}
                        >
                          <div className="text-xs font-extrabold">{m.title}</div>
                          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</div>
                        </button>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label
                          htmlFor="adsense-pub-id"
                          className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300"
                        >
                          Google AdSense Publisher ID
                        </label>
                        <input
                          id="adsense-pub-id"
                          type="text"
                          value={config.adsensePublisherId}
                          onChange={(e) => updateConfig({ adsensePublisherId: e.target.value })}
                          placeholder="ca-pub-1234567890123456"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <p className="mt-1 text-[11px] text-slate-500">
                          Replace the placeholder with your real Google AdSense ID to inject `adsbygoogle.js` live.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="gpt-network-code"
                          className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300"
                        >
                          Google Ad Manager (GPT) Network Path
                        </label>
                        <input
                          id="gpt-network-code"
                          type="text"
                          value={config.gptNetworkCode}
                          onChange={(e) => updateConfig({ gptNetworkCode: e.target.value })}
                          placeholder="/12345678/meridian_news"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <p className="mt-1 text-[11px] text-slate-500">
                          Ready for header bidding / Prebid.js / Google Ad Exchange scaling.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      {[
                        { key: 'lazyLoadAds', label: 'Lazy-Load Below-Fold Ads (Faster LCP)' },
                        { key: 'enableStickyFooter', label: 'Sticky Anchor Footer Bar' },
                        { key: 'enableInFeedNative', label: 'In-Feed Native Sponsored Cards' },
                        { key: 'enableInArticleAds', label: 'In-Article Mid-Read Banners' },
                      ].map((opt) => (
                        <label key={opt.key} className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(config[opt.key as keyof typeof config])}
                            onChange={(e) => updateConfig({ [opt.key]: e.target.checked })}
                            className="w-4 h-4 accent-rose-600 rounded"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Individual Slot Controls */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold">Ad Unit Slot IDs & Toggles</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {ALL_PLACEMENTS.map((slotId) => {
                        const slot = config.slots[slotId];
                        return (
                          <div
                            key={slotId}
                            className="p-4 rounded-2xl border border-slate-500/20 bg-white dark:bg-[#0f1626] flex flex-col gap-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs font-bold">{slot.label}</div>
                                <div className="text-[11px] font-mono text-slate-500">{slot.dimensions}</div>
                              </div>
                              <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={slot.enabled}
                                  onChange={(e) => updateSlot(slotId, { enabled: e.target.checked })}
                                  className="w-4 h-4 accent-emerald-500"
                                />
                                {slot.enabled ? 'Active' : 'Paused'}
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-500 shrink-0">Slot ID:</span>
                              <input
                                type="text"
                                value={slot.adsenseSlotId}
                                onChange={(e) => updateSlot(slotId, { adsenseSlotId: e.target.value })}
                                aria-label={`AdSense Slot ID for ${slot.label}`}
                                className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-500/20 bg-slate-50 dark:bg-[#090d18] font-mono text-xs"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'campaigns' && (
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Create Direct Campaign Form */}
                  <form
                    onSubmit={handleAddCampaign}
                    className="lg:col-span-2 p-5 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626] space-y-3.5"
                  >
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Plus className="w-4 h-4 text-rose-500" />
                      Launch Direct Sponsor Campaign
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sell ad inventory directly to brands or insert affiliate links (Amazon, SaaS, finance) and keep
                      100% of earnings.
                    </p>
                    <div>
                      <label htmlFor="camp-sponsor" className="block text-[11px] font-bold mb-1">
                        Sponsor / Brand Name
                      </label>
                      <input
                        id="camp-sponsor"
                        required
                        value={sponsorName}
                        onChange={(e) => setSponsorName(e.target.value)}
                        placeholder="e.g. Nova Cloud AI"
                        className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="camp-headline" className="block text-[11px] font-bold mb-1">
                        Ad Headline
                      </label>
                      <input
                        id="camp-headline"
                        required
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="Start Building Faster — 50% Off Annual Plans"
                        className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="camp-desc" className="block text-[11px] font-bold mb-1">
                        Description
                      </label>
                      <textarea
                        id="camp-desc"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Concise value proposition shown in sidebar and in-feed slots"
                        className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label htmlFor="camp-cta" className="block text-[11px] font-bold mb-1">
                          CTA Button
                        </label>
                        <input
                          id="camp-cta"
                          value={ctaLabel}
                          onChange={(e) => setCtaLabel(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="camp-tag" className="block text-[11px] font-bold mb-1">
                          Category Tag
                        </label>
                        <input
                          id="camp-tag"
                          value={categoryTag}
                          onChange={(e) => setCategoryTag(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="camp-url" className="block text-[11px] font-bold mb-1">
                        Destination / Affiliate URL
                      </label>
                      <input
                        id="camp-url"
                        value={destinationUrl}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                        placeholder="https://partner.com/?ref=meridian"
                        className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label htmlFor="camp-cpm" className="block text-[11px] font-bold mb-1">
                          CPM Rate ($)
                        </label>
                        <input
                          id="camp-cpm"
                          type="number"
                          step="0.5"
                          value={cpm}
                          onChange={(e) => setCpm(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="camp-cpc" className="block text-[11px] font-bold mb-1">
                          CPC Rate ($)
                        </label>
                        <input
                          id="camp-cpc"
                          type="number"
                          step="0.05"
                          value={cpc}
                          onChange={(e) => setCpc(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] font-mono text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold mb-1.5">Theme Color</div>
                      <div className="flex items-center gap-2">
                        {GRADIENT_PRESETS.map((g, idx) => (
                          <button
                            key={g.label}
                            type="button"
                            onClick={() => setGradientIdx(idx)}
                            aria-label={g.label}
                            className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${
                              gradientIdx === idx ? 'ring-2 ring-offset-2 ring-rose-500 scale-110' : ''
                            }`}
                            style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold mb-1.5">Target Placements</div>
                      <div className="flex flex-wrap gap-1.5">
                        {ALL_PLACEMENTS.map((p) => {
                          const on = selectedPlacements.includes(p);
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => togglePlacementSelect(p)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer border ${
                                on
                                  ? 'bg-rose-600 text-white border-rose-600'
                                  : 'border-slate-500/25 text-slate-500'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      Publish Sponsor Live
                    </button>
                  </form>

                  {/* Existing Campaigns List */}
                  <div className="lg:col-span-3 space-y-3">
                    <h3 className="text-sm font-bold">Active Direct & Partner Inventory</h3>
                    {config.campaigns.map((camp) => (
                      <div
                        key={camp.id}
                        className="p-4 rounded-2xl border border-slate-500/20 bg-white dark:bg-[#0f1626] flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: `linear-gradient(135deg, ${camp.accentFrom}, ${camp.accentTo})` }}
                          >
                            {camp.sponsorName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-extrabold">{camp.sponsorName}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
                                ${camp.cpm.toFixed(2)} CPM · ${camp.cpc.toFixed(2)} CPC
                              </span>
                            </div>
                            <p className="text-xs font-semibold mt-1 line-clamp-1">{camp.headline}</p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {camp.placements.map((p) => (
                                <span
                                  key={p}
                                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-500 dark:text-slate-400"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleCampaign(camp.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${
                              camp.active
                                ? 'bg-emerald-500/15 text-emerald-500'
                                : 'bg-slate-500/15 text-slate-400'
                            }`}
                          >
                            {camp.active ? 'Live' : 'Paused'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCampaign(camp.id)}
                            aria-label={`Delete ${camp.sponsorName}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'calculator' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626] space-y-5">
                    <div>
                      <h3 className="text-base font-extrabold">Ad Revenue Growth Estimator</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Model projected English news portal earnings combining Google AdSense + Direct Native Sponsors
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span>Daily Unique Readers</span>
                          <span className="font-mono text-rose-500">{dailyVisitors.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={250000}
                          step={1000}
                          value={dailyVisitors}
                          onChange={(e) => setDailyVisitors(Number(e.target.value))}
                          className="w-full accent-rose-600"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span>Pages / Session</span>
                          <span className="font-mono text-sky-500">{pagesPerVisit.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min={1.2}
                          max={6}
                          step={0.2}
                          value={pagesPerVisit}
                          onChange={(e) => setPagesPerVisit(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span>Blended Page RPM (USD)</span>
                          <span className="font-mono text-emerald-500">${rpm.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min={3}
                          max={35}
                          step={0.5}
                          value={rpm}
                          onChange={(e) => setRpm(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-white dark:bg-[#090d18] border border-slate-500/20">
                        <div className="text-xs text-slate-500 font-semibold">Projected Daily</div>
                        <div className="mt-1 text-2xl font-extrabold font-mono text-emerald-500">
                          ${dailyEstRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {dailyPageviews.toLocaleString()} daily pageviews
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white dark:bg-[#090d18] border border-emerald-500/35 shadow-lg shadow-emerald-500/10">
                        <div className="text-xs text-emerald-500 font-bold">Projected Monthly (30d)</div>
                        <div className="mt-1 text-3xl font-extrabold font-mono text-emerald-500">
                          ${monthlyEstRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">Tier-1 English traffic (US/UK/CA/AU)</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white dark:bg-[#090d18] border border-slate-500/20">
                        <div className="text-xs text-slate-500 font-semibold">Projected Annual (12m)</div>
                        <div className="mt-1 text-2xl font-extrabold font-mono text-amber-500">
                          ${yearlyEstRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">AdSense + Direct Sponsors</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'adstxt' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold">Authorized Digital Sellers (`ads.txt`)</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Required by Google AdSense & programmatic exchanges. Already wired to serve live at `/ads.txt`.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyAdsTxt}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-500/25 text-xs font-bold hover:bg-slate-500/10 cursor-pointer"
                        >
                          {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedAdsTxt ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          onClick={handleDownloadAdsTxt}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download ads.txt
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#070b14] text-emerald-300 font-mono text-xs overflow-x-auto border border-white/10">
                      {adsTxtContent}
                    </pre>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-500/20 bg-white dark:bg-[#0f1626] space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <h4 className="font-extrabold text-slate-900 dark:text-white">
                      3-Step Checklist to Start Earning Real Ad Revenue
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1.5">
                      <li>
                        Deploy this web app to a custom domain (e.g., Vercel, Railway, Cloudflare Pages, or VPS) with{' '}
                        <code className="px-1.5 py-0.5 rounded bg-slate-500/15 font-mono">ADSENSE_PUB_ID=ca-pub-YOUR_ID</code>.
                      </li>
                      <li>
                        Submit your domain in <strong>Google AdSense</strong> (or Ezoic / Mediavine / Raptive), verify{' '}
                        <code className="px-1.5 py-0.5 rounded bg-slate-500/15 font-mono">yourdomain.com/ads.txt</code>, and
                        paste your Publisher ID + Ad Unit Slot IDs in the <strong>AdSense &amp; Slots</strong> tab.
                      </li>
                      <li>
                        Boost RPM by selling direct banner &amp; native sponsor placements right from the{' '}
                        <strong>Direct Sponsors</strong> tab (100% revenue share with zero network commission).
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
