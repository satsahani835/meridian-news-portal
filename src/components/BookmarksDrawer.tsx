import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import type { Article } from '../types/news';
import { useNews } from '../context/NewsContext';

interface BookmarksDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  open,
  onClose,
  onSelectArticle,
}) => {
  const { articles, bookmarks, toggleBookmark } = useNews();
  const savedArticles = articles.filter((a) => bookmarks.includes(a.id));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Saved Reading List"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-end"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-white dark:bg-[#0b101d] border-l border-slate-500/20 flex flex-col shadow-2xl"
          >
            <div className="px-5 py-4 border-b border-slate-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-rose-500" />
                <h2 className="text-sm font-extrabold">Saved Reading List ({savedArticles.length})</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close reading list"
                className="p-2 rounded-xl hover:bg-slate-500/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {savedArticles.length === 0 ? (
                <div className="py-16 text-center px-6">
                  <Bookmark className="w-10 h-10 mx-auto text-slate-400/50 mb-3" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Your reading list is empty
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Tap the bookmark icon on any dispatch to save it for distraction-free reading later.
                  </p>
                </div>
              ) : (
                savedArticles.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-500/20 bg-slate-50/70 dark:bg-[#0f1626] flex items-start gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase text-rose-500 font-bold">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectArticle(item);
                          onClose();
                        }}
                        className="block text-left font-serif text-sm font-bold hover:text-rose-500 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {item.title}
                      </button>
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectArticle(item);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500 cursor-pointer"
                        >
                          Read now <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleBookmark(item.id)}
                          aria-label={`Remove ${item.title}`}
                          className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
