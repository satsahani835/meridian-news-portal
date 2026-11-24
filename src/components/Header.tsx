import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Sun,
  Moon,
  Bookmark,
  RefreshCw,
  Globe2,
  Radio,
  Tv2,
} from 'lucide-react';
import { CATEGORIES, SOURCE_GROUPS } from '../data/categories';
import { useNews } from '../context/NewsContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenDirectory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenDirectory,
}) => {
  const {
    activeCategory,
    setActiveCategory,
    activeSourceGroup,
    setActiveSourceGroup,
    activeSourceName,
    setActiveSourceName,
    bookmarks,
    theme,
    toggleTheme,
    liveWireCount,
    sourcesCount,
    liveWireLoading,
    refreshLiveWire,
  } = useNews();

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#f7f4ee]/90 dark:bg-[#07090f]/88 border-b border-slate-500/15">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Masthead Bar */}
        <div className="h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Date & Global Editions */}
          <div className="hidden lg:flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {todayFormatted}
            </span>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                US · UK · EU · Nepal · India · AU
              </span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-[11px] text-rose-500 font-semibold">60+ Live Outlets</span>
            </div>
          </div>

          {/* Center: Official MRDN News Portal Logo */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setActiveSourceGroup('All Channels');
              setActiveSourceName(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="MRDN News Portal — Go to Front Page"
            className="flex items-center justify-center group cursor-pointer focus:outline-none"
          >
            <div className="rounded-2xl transition-transform duration-300 group-hover:scale-[1.03] dark:bg-white/95 dark:px-3.5 dark:py-1 dark:shadow-lg dark:shadow-black/30 dark:ring-1 dark:ring-white/20">
              <img
                src="/images/mrdn-logo.png"
                alt="MRDN News Portal — Trusted News. Anytime. Anywhere."
                width={156}
                height={78}
                className="h-12 sm:h-14 w-auto object-contain select-none"
              />
            </div>
            <span className="sr-only">MRDN News Portal</span>
          </button>

          {/* Right: Reader Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
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

            {/* All Channels Directory */}
            <button
              type="button"
              onClick={onOpenDirectory}
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-rose-500/35 bg-rose-500/10 hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
            >
              <Tv2 className="w-4 h-4" />
              <span className="hidden sm:inline">Channels</span>
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
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 rounded-xl border border-slate-500/20 bg-white/70 dark:bg-white/5 hover:border-rose-500/50 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Refresh Live Wire */}
            <button
              type="button"
              onClick={() => refreshLiveWire()}
              disabled={liveWireLoading}
              aria-label="Refresh today's live news feeds"
              title="Auto-updates every 5 minutes — click to refresh now"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${liveWireLoading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">
                {liveWireCount > 0 ? `Live (${liveWireCount})` : 'Syncing…'}
              </span>
            </button>
          </div>
        </div>

        {/* Category Navigation Strip */}
        <nav
          aria-label="News Desks"
          className="flex items-center justify-between gap-4 py-2 border-t border-slate-500/15 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-1">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id && !activeSourceName;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveSourceGroup('All Channels');
                    setActiveSourceName(null);
                  }}
                  className={`relative shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
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
        </nav>

        {/* Source Group Filter Strip */}
        <div
          aria-label="Filter by Media Group"
          className="flex items-center justify-between gap-3 py-2 border-t border-slate-500/10 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-1.5">
            {SOURCE_GROUPS.map((group) => {
              const active = activeSourceGroup === group && !activeSourceName;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    setActiveSourceGroup(group);
                    setActiveSourceName(null);
                    if (group !== 'All Channels') setActiveCategory('all');
                  }}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white shadow-sm'
                      : 'border-slate-500/20 text-slate-600 dark:text-slate-300 hover:border-rose-500/50 hover:text-rose-500'
                  }`}
                >
                  {group}
                </button>
              );
            })}
            <button
              type="button"
              onClick={onOpenDirectory}
              className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-rose-500/35 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
            >
              + All 60+ Outlets
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>{sourcesCount > 0 ? `${sourcesCount} Outlets Synced` : 'Syncing…'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
