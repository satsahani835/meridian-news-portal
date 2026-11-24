import React from 'react';
import { Radio, TrendingUp, TrendingDown } from 'lucide-react';
import type { Article } from '../types/news';
import { MARKET_TICKERS } from '../data/categories';

interface BreakingTickerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

const MiniSparkline: React.FC<{ data: number[]; positive: boolean }> = ({ data, positive }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * 42;
      const y = 14 - ((val - min) / range) * 12;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width="44" height="16" viewBox="0 0 44 16" className="overflow-visible" aria-hidden="true">
      <polyline
        fill="none"
        stroke={positive ? '#10b981' : '#f43f5e'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles, onSelectArticle }) => {
  const tickerItems = articles.slice(0, 8);

  return (
    <div className="border-b border-slate-500/15 bg-slate-950 text-slate-100">
      {/* Row 1: Breaking Wire Marquee */}
      <div className="max-w-[1440px] mx-auto flex items-center overflow-hidden h-9">
        <div className="shrink-0 z-10 flex items-center gap-2 px-3.5 sm:px-5 h-full bg-rose-600 text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Live Wire</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 pl-6">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onClick={() => onSelectArticle(item)}
                className="shrink-0 inline-flex items-center gap-2.5 text-xs text-slate-200 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                  {item.category}
                </span>
                <span className="font-medium">{item.title}</span>
                <span className="text-slate-600">•</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Global Markets & Pulse Sparklines */}
      <div className="border-t border-white/10 bg-[#05070d]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex items-center gap-5 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Global Markets
          </span>
          {MARKET_TICKERS.map((t) => {
            const positive = t.changePct >= 0;
            return (
              <div
                key={t.symbol}
                className="shrink-0 flex items-center gap-2.5 pr-4 border-r border-white/10 last:border-r-0"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-white">{t.symbol}</span>
                    <span className="font-mono text-[11px] text-slate-300">{t.price}</span>
                  </div>
                  <div
                    className={`flex items-center gap-0.5 font-mono text-[10px] font-semibold ${
                      positive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {positive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {t.change}
                  </div>
                </div>
                <MiniSparkline data={t.sparkline} positive={positive} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
