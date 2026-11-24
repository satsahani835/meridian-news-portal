import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Sun,
  Moon,
  Bookmark,
  DollarSign,
  RefreshCw,
  Globe2,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useNews } from '../context/NewsContext';
import { useAdMonetization } from '../context/AdMonetizationContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenPublisherStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenPublisherStudio,
}) => {
  const {
    activeCategory,
    setActiveCategory,
    bookmarks,
    theme,
    toggleTheme,
    liveWireCount,
    liveWireLoading,
    includeLiveWire,
    setIncludeLiveWire,
    refreshLiveWire,
  } = useNews();

  const { analytics } = useAdMonetization();

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#f7f4ee]/88 dark:bg-[#07090f]/86 border-b border-slate-500/15">
      {/* Top Masthead Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Date & Free Edition Badge */}
          <div className="hidden lg:flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {todayFormatted}
            </span>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                Global English Edition
              </span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-[11px] text-rose-500 font-semibold">100% Free Access</span>
            </div>
          </div>

          {/* Center: Iconic Newspaper Masthead */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-start lg:items-center group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] group-hover:scale-125 transition-transform" />
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-none tracking-tight text-slate-900 dark:text-white">
                THE MERIDIAN
              </h1>
            </div>
            <span className="hidden sm:block text-[9px] font-mono uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400 mt-0.5">
              Independent Global Journalism
            </span>
          </button>

          {/* Right: Controls + Publisher Revenue Button */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="inline-flex items-center gap-2 h-10 px-3 sm:px-3.5 rounded-xl border border-slate-500/20 bg-white/70 dark:bg-white/5 hover:border-rose-500/50 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-500/15 text-slate-500 dark:text-slate-400">
                Ctrl K
              </kbd>
            </button>

            {/* Bookmarks */}
            <button
              type="button"
              onClick={onOpenBookmarks}
              aria-label={`Saved articles (${bookmarks.length})`}
              className="relative w-10 h-10 rounded-xl border border-slate-500/20 bg-white/70 dark:bg-white/5 hover:border-rose-500/50 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Theme Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Broadsheet Light Mode' : 'Switch to Midnight Dark Mode'}
              className="w-10 h-10 rounded-xl border border-slate-500/20 bg-white/70 dark:bg-white/5 hover:border-rose-500/50 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Publisher Ad Revenue Studio Trigger */}
            <button
              type="button"
              onClick={onOpenPublisherStudio}
              className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Ad Studio</span>
              <span className="font-mono text-[11px] bg-black/25 px-1.5 py-0.5 rounded-md">
                ${analytics.totalRevenue.toFixed(2)}
              </span>
            </button>
          </div>
        </div>

        {/* Category Navigation Strip + Live RSS Wire Controls */}
        <nav
          aria-label="News Desks"
          className="flex items-center justify-between gap-4 py-2.5 border-t border-slate-500/15 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-1">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    active
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-rose-600 shadow-md shadow-rose-600/30"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIncludeLiveWire(!includeLiveWire)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                includeLiveWire
                  ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-500/20 text-slate-500'
              }`}
              title="Toggle live English RSS wire feeds alongside curated editorial features"
            >
              <Sparkles className="w-3 h-3" />
              Live RSS ({liveWireCount})
            </button>
            <button
              type="button"
              onClick={() => refreshLiveWire()}
              disabled={liveWireLoading}
              aria-label="Refresh live RSS feeds"
              className="p-1.5 rounded-full border border-slate-500/20 hover:bg-slate-500/10 text-slate-500 dark:text-slate-300 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${liveWireLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
