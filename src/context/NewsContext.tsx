import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { Article, CategoryId } from '../types/news';
import { EDITORIAL_ARTICLES } from '../data/articles';

const BOOKMARKS_KEY = 'meridian_bookmarks_v1';
const THEME_KEY = 'meridian_theme_v1';
const AUTO_REFRESH_MS = 5 * 60 * 1000; // Auto-refresh live news every 5 minutes

interface NewsContextValue {
  articles: Article[];
  liveWireCount: number;
  sourcesCount: number;
  sourceCounts: Record<string, number>;
  liveWireLoading: boolean;
  lastSyncedAt: string | null;
  refreshLiveWire: () => Promise<void>;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  activeSourceGroup: string;
  setActiveSourceGroup: (group: string) => void;
  activeSourceName: string | null;
  setActiveSourceName: (name: string | null) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NewsContext = createContext<NewsContextValue | null>(null);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [liveArticles, setLiveArticles] = useState<Article[]>([]);
  const [sourcesCount, setSourcesCount] = useState(0);
  const [liveWireLoading, setLiveWireLoading] = useState(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [activeSourceGroup, setActiveSourceGroup] = useState<string>('All Channels');
  const [activeSourceName, setActiveSourceName] = useState<string | null>(null);

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage errors
    }
  }, [bookmarks]);

  const fetchLiveWire = useCallback(async (force = false) => {
    setLiveWireLoading(true);
    try {
      const res = await fetch(`/api/live-news${force ? '?refresh=1' : ''}`);
      if (!res.ok) throw new Error('Live wire fetch failed');
      const data = await res.json();
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        setLiveArticles(data.articles);
        setSourcesCount(Number(data.sourcesCount) || 0);
        setLastSyncedAt(data.fetchedAt || new Date().toISOString());
      }
    } catch {
      // Fall back smoothly to curated offline articles
    } finally {
      setLiveWireLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveWire(false);
    const interval = setInterval(() => {
      fetchLiveWire(false);
    }, AUTO_REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchLiveWire]);

  const articles = useMemo(() => {
    if (liveArticles.length > 0) return liveArticles;
    return EDITORIAL_ARTICLES;
  }, [liveArticles]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of articles) {
      if (a.sourceName) {
        counts[a.sourceName] = (counts[a.sourceName] || 0) + 1;
      }
    }
    return counts;
  }, [articles]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]));
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <NewsContext.Provider
      value={{
        articles,
        liveWireCount: liveArticles.length,
        sourcesCount,
        sourceCounts,
        liveWireLoading,
        lastSyncedAt,
        refreshLiveWire: () => fetchLiveWire(true),
        activeCategory,
        setActiveCategory,
        activeSourceGroup,
        setActiveSourceGroup,
        activeSourceName,
        setActiveSourceName,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
}
