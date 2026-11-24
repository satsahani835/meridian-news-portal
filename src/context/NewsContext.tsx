import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { Article, CategoryId } from '../types/news';
import { EDITORIAL_ARTICLES } from '../data/articles';

const BOOKMARKS_KEY = 'meridian_bookmarks_v1';
const THEME_KEY = 'meridian_theme_v1';

interface NewsContextValue {
  articles: Article[];
  liveWireCount: number;
  liveWireLoading: boolean;
  lastSyncedAt: string | null;
  includeLiveWire: boolean;
  setIncludeLiveWire: (val: boolean) => void;
  refreshLiveWire: () => Promise<void>;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NewsContext = createContext<NewsContextValue | null>(null);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [liveArticles, setLiveArticles] = useState<Article[]>([]);
  const [liveWireLoading, setLiveWireLoading] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [includeLiveWire, setIncludeLiveWire] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

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
      if (Array.isArray(data.articles)) {
        setLiveArticles(data.articles);
        setLastSyncedAt(data.fetchedAt || new Date().toISOString());
      }
    } catch {
      // Gracefully keep editorial edition if offline
    } finally {
      setLiveWireLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveWire(false);
  }, [fetchLiveWire]);

  const articles = useMemo(() => {
    if (!includeLiveWire || liveArticles.length === 0) return EDITORIAL_ARTICLES;
    return [...EDITORIAL_ARTICLES, ...liveArticles];
  }, [includeLiveWire, liveArticles]);

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
        liveWireLoading,
        lastSyncedAt,
        includeLiveWire,
        setIncludeLiveWire,
        refreshLiveWire: () => fetchLiveWire(true),
        activeCategory,
        setActiveCategory,
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
