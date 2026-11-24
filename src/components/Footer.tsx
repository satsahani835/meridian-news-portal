import React from 'react';
import { Globe2, Radio, ShieldCheck, Tv2 } from 'lucide-react';
import { CATEGORIES, SOURCE_GROUPS } from '../data/categories';
import { useNews } from '../context/NewsContext';
import type { LegalPageId } from './LegalModal';

interface FooterProps {
  onOpenLegal: (page: LegalPageId) => void;
  onOpenDirectory: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenDirectory }) => {
  const { setActiveCategory, setActiveSourceGroup, setActiveSourceName } = useNews();

  return (
    <footer className="mt-20 border-t border-slate-500/20 bg-white/80 dark:bg-[#050810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-slate-500/15">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-display text-4xl tracking-[0.1em] text-slate-900 dark:text-white leading-none">
                MRDN
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              <strong>MRDN News Portal</strong> — Trusted News. Anytime. Anywhere. Free 24/7 live global news updating
              automatically every 5 minutes across 60+ outlets — including Nepali English e-newspapers, New York Times,
              Times of India, NDTV Profit, Fox News, Newsmax, OANN, New York Post, WSJ Opinion, National Review, Daily
              Wire, Breitbart, The Telegraph, Daily Mail, GB News, Le Figaro, Die Welt, Bild, National Post, Sky News
              Australia, and more.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                Global 60+ Channel Wire
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-500" />
                Auto-Updated Every 5m
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Free Reader Access
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
              News Desks
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {CATEGORIES.slice(0, 10).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(c.id);
                      setActiveSourceGroup('All Channels');
                      setActiveSourceName(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-slate-500">
              Media Networks
            </h3>
            <div className="flex flex-wrap gap-2">
              {SOURCE_GROUPS.filter((g) => g !== 'All Channels').map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSourceGroup(group);
                    setActiveSourceName(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-500/20 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-rose-500/50 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  {group}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenDirectory}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Tv2 className="w-3.5 h-3.5" />
              Browse Full 60+ Channel Directory
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} MRDN News Portal. Trusted News. Anytime. Anywhere.</span>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onOpenLegal('about')} className="hover:text-rose-500 cursor-pointer">
              About Us
            </button>
            <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-rose-500 cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onOpenLegal('terms')} className="hover:text-rose-500 cursor-pointer">
              Terms &amp; Disclaimer
            </button>
            <button type="button" onClick={() => onOpenLegal('contact')} className="hover:text-rose-500 cursor-pointer">
              Contact
            </button>
            <a href="/ads.txt" target="_blank" rel="noreferrer" className="font-mono hover:text-rose-500">
              ads.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
