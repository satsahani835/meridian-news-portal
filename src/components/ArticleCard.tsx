import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Clock, ArrowUpRight, Newspaper } from 'lucide-react';
import type { Article } from '../types/news';
import { CATEGORY_MAP } from '../data/categories';
import { useNews } from '../context/NewsContext';

interface ArticleCardProps {
  article: Article;
  index: number;
  onSelect: (article: Article) => void;
}

function formatRelativeTime(iso: string): string {
  const diffMin = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (diffMin < 60) return `${diffMin}m ago`;
  const hrs = Math.floor(diffMin / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, onSelect }) => {
  const { isBookmarked, toggleBookmark } = useNews();
  const saved = isBookmarked(article.id);
  const catMeta = CATEGORY_MAP[article.category] || CATEGORY_MAP.world;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.04, 0.22) }}
      className="group rounded-2xl border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0e1422] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-black/15 hover:border-rose-500/45 transition-all duration-300"
    >
      {/* Image Container */}
      <div
        onClick={() => onSelect(article)}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (article.fallbackImage) (e.currentTarget as HTMLImageElement).src = article.fallbackImage;
          }}
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Source & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pr-11">
          {article.sourceName && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide backdrop-blur-md bg-slate-950/85 text-amber-300 border border-white/15">
              <Newspaper className="w-2.5 h-2.5" />
              {article.sourceName}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-slate-950/75 text-white border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catMeta.accent }} />
            {catMeta.label}
          </span>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(article.id);
          }}
          aria-label={saved ? `Remove "${article.title}" from bookmarks` : `Save "${article.title}"`}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors cursor-pointer ${
            saved
              ? 'bg-rose-600 border-rose-500 text-white'
              : 'bg-slate-950/60 border-white/20 text-white hover:bg-rose-600'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body Copy */}
      <div onClick={() => onSelect(article)} className="p-5 flex-1 flex flex-col justify-between cursor-pointer">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors line-clamp-3">
            {article.title}
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-500/15 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 w-6 h-6 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-200 font-bold text-[10px] flex items-center justify-center">
              {article.author.avatarInitials}
            </span>
            <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
              {article.author.name}
            </span>
            <span>·</span>
            <span className="shrink-0">{formatRelativeTime(article.publishedAt)}</span>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 font-mono">
            <Clock className="w-3 h-3" />
            <span>{article.readTimeMinutes}m</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-rose-500" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};
