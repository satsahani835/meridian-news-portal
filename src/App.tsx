import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Mail, CheckCircle2, Sparkles, ArrowRight, Newspaper } from 'lucide-react';
import type { Article } from './types/news';
import { CATEGORY_MAP } from './data/categories';
import { useNews } from './context/NewsContext';
import { BreakingTicker } from './components/BreakingTicker';
import { Header } from './components/Header';
import { HeroSpotlight } from './components/HeroSpotlight';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';
import { LegalModal, type LegalPageId } from './components/LegalModal';
import { AdBanner } from './components/ads/AdBanner';
import { ConsentBanner } from './components/ads/ConsentBanner';

export default function App() {
  const { articles, activeCategory, activeSourceGroup, setActiveSourceGroup } = useNews();

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPageId>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Global keyboard shortcuts (Ctrl+K or '/' to open search)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const filteredArticles = useMemo(() => {
    let list = articles;
    if (activeCategory !== 'all') {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (activeSourceGroup !== 'All Sources') {
      list = list.filter((a) => a.sourceGroup === activeSourceGroup);
    }
    return list;
  }, [articles, activeCategory, activeSourceGroup]);

  const showHero = activeCategory === 'all' && activeSourceGroup === 'All Sources';
  const leadArticle = filteredArticles[0] || articles[0];
  const secondaryHero = filteredArticles.slice(1, 3);
  const gridArticles = showHero ? filteredArticles.slice(3) : filteredArticles;

  const trendingArticles = useMemo(
    () => [...articles].sort((a, b) => b.views - a.views).slice(0, 6),
    [articles]
  );

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articles.filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category);
  }, [articles, selectedArticle]);

  const activeCategoryMeta = CATEGORY_MAP[activeCategory] || CATEGORY_MAP.all;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
    setNewsletterEmail('');
    showToast('Subscribed to The Meridian Daily Briefing!');
  };

  return (
    <div className="min-h-screen editorial-mesh grid-backdrop relative">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-rose-600 focus:text-white focus:font-bold"
      >
        Skip to main news content
      </a>

      {/* Live Breaking Wire & Global / South Asia Markets Sparklines */}
      <BreakingTicker articles={articles} onSelectArticle={setSelectedArticle} />

      {/* Editorial Masthead, Category Navigation & Channel Filters */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
        {/* Optional Manual Google AdSense Top Leaderboard Slot */}
        <AdBanner
          adSlot={import.meta.env.VITE_ADSENSE_SLOT_LEADERBOARD}
          format="horizontal"
          minHeightClass="min-h-[96px]"
          label="Top leaderboard advertisement"
        />

        {/* Hero Section on Front Page, or Filtered Desk / Channel Banner */}
        {showHero && leadArticle ? (
          <HeroSpotlight
            leadArticle={leadArticle}
            secondaryArticles={secondaryHero}
            onSelectArticle={setSelectedArticle}
          />
        ) : (
          <motion.section
            key={`${activeCategory}-${activeSourceGroup}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-500/20 dark:border-white/10 bg-white/80 dark:bg-[#0d1322]/90 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${activeCategoryMeta.badgeClass}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeCategoryMeta.label} Desk
                </span>
                {activeSourceGroup !== 'All Sources' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    <Newspaper className="w-3.5 h-3.5" />
                    {activeSourceGroup}
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl text-slate-900 dark:text-white">
                {activeSourceGroup !== 'All Sources'
                  ? `${activeSourceGroup} — Live Coverage`
                  : `${activeCategoryMeta.label} Coverage`}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                {activeCategoryMeta.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-500">
                {filteredArticles.length} live stories
              </span>
              {activeSourceGroup !== 'All Sources' && (
                <button
                  type="button"
                  onClick={() => setActiveSourceGroup('All Sources')}
                  className="px-3 py-1.5 rounded-xl border border-slate-500/25 text-xs font-semibold hover:bg-slate-500/10 cursor-pointer"
                >
                  Show All Channels
                </button>
              )}
            </div>
          </motion.section>
        )}

        {/* Primary Two-Column Magazine Layout (8 Cols Feed + 4 Cols Sidebar) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Latest Stories */}
          <section aria-label="Latest News Feed" className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-rose-600" />
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white">
                  {showHero ? "Today's Live Dispatches" : `Latest Headlines`}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Auto-refreshes every 5 min
              </span>
            </div>

            {gridArticles.length === 0 ? (
              <div className="p-10 rounded-2xl border border-slate-500/20 bg-white dark:bg-[#0e1422] text-center space-y-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  No articles matched this combination of desk and channel right now.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSourceGroup('All Sources')}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                >
                  Reset Channel Filter
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {gridArticles.map((article, idx) => (
                  <React.Fragment key={article.id}>
                    <ArticleCard article={article} index={idx} onSelect={setSelectedArticle} />
                    {/* Optional Manual In-Feed Google AdSense Slot */}
                    {idx === 3 && (
                      <div className="sm:col-span-2">
                        <AdBanner
                          adSlot={import.meta.env.VITE_ADSENSE_SLOT_INFEED}
                          format="fluid"
                          minHeightClass="min-h-[120px]"
                          label="In-feed advertisement"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>

          {/* Right 4 Columns: Trending, Newsletter & Optional Manual AdSense Display Units */}
          <aside aria-label="Trending and Briefing Sidebar" className="lg:col-span-4 space-y-6 lg:sticky lg:top-44">
            {/* Optional Manual Google AdSense Sidebar Rectangle (300x250) */}
            <AdBanner
              adSlot={import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_MPU}
              format="rectangle"
              minHeightClass="min-h-[260px]"
              label="Sidebar display advertisement"
            />

            {/* Most Read / Trending Worldwide */}
            <div className="rounded-2xl border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0e1422] p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-500/15">
                <h3 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Trending Today
                </h3>
                <span className="text-[10px] font-mono text-slate-500">LIVE</span>
              </div>
              <ol className="divide-y divide-slate-500/10">
                {trendingArticles.map((item, idx) => (
                  <li key={item.id} className="py-3 first:pt-1 last:pb-1">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(item)}
                      className="w-full text-left flex items-start gap-3.5 group cursor-pointer"
                    >
                      <span className="font-display text-2xl leading-none text-rose-500/70 group-hover:text-rose-500 shrink-0 w-7">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-serif text-sm font-bold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-rose-500 transition-colors line-clamp-2">
                          {item.title}
                        </div>
                        <div className="mt-1 text-[11px] font-mono text-slate-500">
                          {item.sourceName || item.category}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Free Daily Morning Briefing Newsletter */}
            <div className="rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-600/12 via-amber-500/8 to-transparent dark:from-rose-600/18 dark:via-slate-900 dark:to-slate-950 p-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-rose-500">
                <Mail className="w-4 h-4" />
                Free Daily Briefing
              </div>
              <h3 className="mt-2 font-display text-2xl text-slate-900 dark:text-white leading-tight">
                Nepal, India &amp; Global headlines in one morning email.
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Essential daily English stories from Kathmandu, New Delhi, Wall Street, and Washington — always free.
              </p>
              {newsletterDone ? (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Subscribed! Watch your inbox tomorrow morning.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@domain.com"
                    aria-label="Email address for daily briefing"
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-slate-500/25 bg-white dark:bg-[#090d18] text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Join
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Optional Manual Google AdSense Vertical Display Slot */}
            <AdBanner
              adSlot={import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_TALL}
              format="vertical"
              minHeightClass="min-h-[400px]"
              label="Sidebar vertical advertisement"
            />
          </aside>
        </div>
      </main>

      <Footer onOpenLegal={setLegalPage} />

      {/* Google AdSense Cookie Consent Banner */}
      <ConsentBanner />

      {/* Full Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        relatedArticles={relatedArticles}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={setSelectedArticle}
      />

      {/* About / Privacy Policy / Terms / Contact Modal (for Google AdSense compliance) */}
      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />

      {/* Instant Command Search Modal */}
      <SearchCommandModal
        open={searchOpen}
        articles={articles}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={setSelectedArticle}
      />

      {/* Saved Reading List Drawer */}
      <BookmarksDrawer
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        onSelectArticle={setSelectedArticle}
      />

      {/* Notification Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl bg-slate-950/95 text-white border border-emerald-500/40 shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
