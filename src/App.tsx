import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Mail, CheckCircle2, Sparkles, ArrowRight, Newspaper, ChevronDown } from 'lucide-react';
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
import { ChannelDirectoryModal } from './components/ChannelDirectoryModal';
import { Footer } from './components/Footer';
import { LegalModal, type LegalPageId } from './components/LegalModal';
import { AdBanner } from './components/ads/AdBanner';
import { ConsentBanner } from './components/ads/ConsentBanner';

const PAGE_SIZE = 24;

export default function App() {
  const {
    articles,
    activeCategory,
    activeSourceGroup,
    setActiveSourceGroup,
    activeSourceName,
    setActiveSourceName,
    setActiveCategory,
  } = useNews();

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPageId>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, activeSourceGroup, activeSourceName]);

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
    if (activeSourceName) {
      return list.filter((a) => a.sourceName === activeSourceName);
    }
    if (activeCategory !== 'all') {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (activeSourceGroup !== 'All Channels') {
      list = list.filter((a) => a.sourceGroup === activeSourceGroup);
    }
    return list;
  }, [articles, activeCategory, activeSourceGroup, activeSourceName]);

  const showHero = activeCategory === 'all' && activeSourceGroup === 'All Channels' && !activeSourceName;
  const leadArticle = filteredArticles[0] || articles[0];
  const secondaryHero = filteredArticles.slice(1, 3);
  const allGridArticles = showHero ? filteredArticles.slice(3) : filteredArticles;
  const visibleGridArticles = allGridArticles.slice(0, visibleCount);
  const remainingCount = Math.max(0, allGridArticles.length - visibleGridArticles.length);

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

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveSourceGroup('All Channels');
    setActiveSourceName(null);
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

      {/* Editorial Masthead, Desks & 60+ Channel Controls */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenDirectory={() => setDirectoryOpen(true)}
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
            key={`${activeCategory}-${activeSourceGroup}-${activeSourceName || 'none'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-500/20 dark:border-white/10 bg-white/80 dark:bg-[#0d1322]/90 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {activeSourceName ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    <Newspaper className="w-3.5 h-3.5" />
                    Channel Spotlight
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${activeCategoryMeta.badgeClass}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeCategoryMeta.label} Desk
                  </span>
                )}
                {activeSourceGroup !== 'All Channels' && !activeSourceName && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    <Newspaper className="w-3.5 h-3.5" />
                    {activeSourceGroup}
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl text-slate-900 dark:text-white">
                {activeSourceName
                  ? `${activeSourceName} — Live Feed`
                  : activeSourceGroup !== 'All Channels'
                    ? `${activeSourceGroup} — Live Coverage`
                    : `${activeCategoryMeta.label} Coverage`}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                {activeSourceName
                  ? `Showing the newest live headlines syndicated from ${activeSourceName}.`
                  : activeCategoryMeta.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-500">
                {filteredArticles.length} live stories
              </span>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-3.5 py-2 rounded-xl border border-slate-500/25 text-xs font-bold hover:bg-slate-500/10 cursor-pointer"
              >
                Back to Front Page
              </button>
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
                  {showHero ? "Today's Live Global Dispatches" : 'Latest Headlines'}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Auto-refreshes every 5 min
              </span>
            </div>

            {visibleGridArticles.length === 0 ? (
              <div className="p-10 rounded-2xl border border-slate-500/20 bg-white dark:bg-[#0e1422] text-center space-y-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  No live items currently returned for this channel filter. Try refreshing or switching outlets.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Show All Live Stories
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectoryOpen(true)}
                    className="px-4 py-2 rounded-xl border border-slate-500/25 text-xs font-bold cursor-pointer"
                  >
                    Browse 60+ Channels
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  {visibleGridArticles.map((article, idx) => (
                    <React.Fragment key={article.id}>
                      <ArticleCard article={article} index={idx} onSelect={setSelectedArticle} />
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

                {/* Load More Pagination Button */}
                {remainingCount > 0 && (
                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-500/25 bg-white dark:bg-[#0e1422] hover:border-rose-500 hover:text-rose-500 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                    >
                      Load More Stories ({remainingCount} remaining)
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Right 4 Columns: Trending, Newsletter & Optional Manual AdSense Display Units */}
          <aside aria-label="Trending and Briefing Sidebar" className="lg:col-span-4 space-y-6 lg:sticky lg:top-44">
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
                US, UK, Europe, Nepal &amp; India headlines in one briefing.
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Essential daily coverage from 60+ global newspapers and broadcast channels — always free.
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

            <AdBanner
              adSlot={import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_TALL}
              format="vertical"
              minHeightClass="min-h-[400px]"
              label="Sidebar vertical advertisement"
            />
          </aside>
        </div>
      </main>

      <Footer
        onOpenLegal={setLegalPage}
        onOpenDirectory={() => setDirectoryOpen(true)}
      />

      {/* Google AdSense Cookie Consent Banner */}
      <ConsentBanner />

      {/* Full Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        relatedArticles={relatedArticles}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={setSelectedArticle}
      />

      {/* All 60+ Channels Directory Modal */}
      <ChannelDirectoryModal open={directoryOpen} onClose={() => setDirectoryOpen(false)} />

      {/* About / Privacy Policy / Terms / Contact Modal */}
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
