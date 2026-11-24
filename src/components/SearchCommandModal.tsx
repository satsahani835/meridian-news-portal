import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import type { Article } from '../types/news';

interface SearchCommandModalProps {
  open: boolean;
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  open,
  articles,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles.slice(0, 6);
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.name.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, articles]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search MRDN News Portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
        >
          <motion.div
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -16, scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-slate-500/25 dark:border-white/15 bg-white dark:bg-[#0d1424] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-500/15">
              <Search className="w-5 h-5 text-rose-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search English headlines, desks, authors, or topics (e.g. AI, Geneva, Europa)..."
                aria-label="Search articles"
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-500/10">
              {results.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No articles matched &ldquo;{query}&rdquo;. Try searching for AI, Markets, Climate, or Europa.
                </div>
              ) : (
                results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectArticle(item);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-3.5 hover:bg-rose-500/8 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-rose-500 font-bold">
                        <span>{item.category}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.readTimeMinutes}m
                        </span>
                      </div>
                      <div className="mt-0.5 font-serif text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors line-clamp-1">
                        {item.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 shrink-0" />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
