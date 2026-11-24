import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Bookmark, ArrowRight, Radio, Eye, Newspaper } from 'lucide-react';
import type { Article } from '../types/news';
import { CATEGORY_MAP } from '../data/categories';
import { useNews } from '../context/NewsContext';

interface HeroSpotlightProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

const GlobalPulseVisual: React.FC = () => {
  const hubs = [
    { name: 'NYC', x: 78, y: 52, delay: 0 },
    { name: 'WDC', x: 68, y: 64, delay: 0.35 },
    { name: 'LDN', x: 146, y: 40, delay: 0.7 },
    { name: 'DEL', x: 214, y: 62, delay: 1.05 },
    { name: 'KTM', x: 229, y: 58, delay: 1.4 },
    { name: 'TYO', x: 274, y: 54, delay: 1.75 },
  ];

  return (
    <div className="relative rounded-2xl border border-slate-500/20 dark:border-white/10 bg-slate-950 text-white p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
            Live Global Wire Network
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">KTM · DEL · NYC · WDC</span>
      </div>

      <svg viewBox="0 0 320 132" className="w-full h-28" role="img" aria-label="Live global newsroom network visualization">
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="#334155" strokeWidth="0.6" strokeOpacity="0.45">
          <line x1="0" y1="33" x2="320" y2="33" />
          <line x1="0" y1="66" x2="320" y2="66" />
          <line x1="0" y1="99" x2="320" y2="99" />
          <line x1="64" y1="0" x2="64" y2="132" />
          <line x1="128" y1="0" x2="128" y2="132" />
          <line x1="192" y1="0" x2="192" y2="132" />
          <line x1="256" y1="0" x2="256" y2="132" />
        </g>

        <g fill="#1e293b" opacity="0.85">
          <path d="M36 32 L94 26 L106 58 L78 72 L58 62 Z" />
          <path d="M78 76 L102 82 L94 118 L76 112 Z" />
          <path d="M134 28 L178 24 L182 54 L142 56 Z" />
          <path d="M142 62 L182 62 L176 106 L152 104 Z" />
          <path d="M186 28 L274 30 L282 72 L212 76 L186 58 Z" />
          <path d="M248 92 L288 94 L284 118 L252 116 Z" />
        </g>

        <motion.path
          d="M78 52 Q146 14 229 58 T274 54"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          initial={{ pathLength: 0.2, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.path
          d="M68 64 Q142 22 214 62"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          strokeDasharray="3 5"
          initial={{ pathLength: 0.1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {hubs.map((hub) => (
          <g key={hub.name} transform={`translate(${hub.x}, ${hub.y})`}>
            <motion.circle
              r="9"
              fill="#f43f5e"
              initial={{ scale: 0.4, opacity: 0.5 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 2.2, delay: hub.delay, repeat: Infinity }}
            />
            <circle r="3" fill="#f43f5e" />
            <text x="6" y="3" fill="#cbd5e1" fontSize="8" fontFamily="JetBrains Mono, monospace">
              {hub.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
}) => {
  const { isBookmarked, toggleBookmark } = useNews();
  const catMeta = CATEGORY_MAP[leadArticle.category] || CATEGORY_MAP.world;
  const saved = isBookmarked(leadArticle.id);

  return (
    <section aria-label="Featured Headlines" className="grid lg:grid-cols-12 gap-6 items-stretch">
      {/* Primary Lead Story (8 Cols) */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-8 group relative rounded-3xl overflow-hidden border border-slate-500/20 dark:border-white/10 bg-slate-950 text-white shadow-2xl shadow-black/20 flex flex-col justify-end min-h-[470px] sm:min-h-[540px]"
      >
        <img
          src={leadArticle.image}
          alt={leadArticle.title}
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            if (leadArticle.fallbackImage) (e.currentTarget as HTMLImageElement).src = leadArticle.fallbackImage;
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/75 to-[#050811]/20" />

        {/* Top Floating Badges */}
        <div className="relative z-10 flex items-center justify-between p-6 sm:p-8 mb-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg shadow-rose-600/40">
              <Radio className="w-3 h-3 animate-pulse" />
              Top Story
            </span>
            {leadArticle.sourceName && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
                <Newspaper className="w-3 h-3" />
                {leadArticle.sourceName}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
              {catMeta.label}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(leadArticle.id);
            }}
            aria-label={saved ? 'Remove lead story from bookmarks' : 'Save lead story'}
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors cursor-pointer ${
              saved
                ? 'bg-rose-600 border-rose-500 text-white'
                : 'bg-black/45 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Editorial Copy */}
        <div
          onClick={() => onSelectArticle(leadArticle)}
          className="relative z-10 p-6 sm:p-8 lg:p-10 cursor-pointer"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] tracking-tight text-white group-hover:text-rose-200 transition-colors">
            {leadArticle.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-200/90 max-w-2xl leading-relaxed line-clamp-3">
            {leadArticle.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-xs font-extrabold text-white">
                {leadArticle.author.avatarInitials}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{leadArticle.author.name}</div>
                <div className="text-[11px] text-slate-300 flex items-center gap-2">
                  <span>{leadArticle.sourceName || leadArticle.author.role}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {leadArticle.readTimeMinutes} min read
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline-flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {(leadArticle.views / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 font-bold text-xs group-hover:bg-rose-500 group-hover:text-white transition-colors">
              Read Full Story
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.article>

      {/* Right Rail of Hero: Global Telemetry Graphic + 2 Top Stories (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
        <GlobalPulseVisual />

        <div className="flex-1 flex flex-col gap-4">
          {secondaryArticles.slice(0, 2).map((item, index) => {
            const c = CATEGORY_MAP[item.category] || CATEGORY_MAP.world;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.1 }}
                onClick={() => onSelectArticle(item)}
                className="group flex-1 rounded-2xl border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0e1422] p-4 hover:border-rose-500/50 transition-all cursor-pointer flex gap-4 items-center shadow-sm hover:shadow-xl hover:shadow-black/10"
              >
                <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      if (item.fallbackImage) (e.currentTarget as HTMLImageElement).src = item.fallbackImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${c.badgeClass}`}
                    >
                      {item.sourceName || c.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.readTimeMinutes}m
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold leading-snug text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
