import React from 'react';
import { Globe2, Radio, ShieldCheck } from 'lucide-react';
import { CATEGORIES, SOURCE_GROUPS } from '../data/categories';
import { useNews } from '../context/NewsContext';
import type { LegalPageId } from './LegalModal';

interface FooterProps {
  onOpenLegal: (page: LegalPageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { setActiveCategory, setActiveSourceGroup } = useNews();

  return (
    <footer className="mt-20 border-t border-slate-500/20 bg-white/80 dark:bg-[#050810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-slate-500/15">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                THE MERIDIAN
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Free 24/7 live English news portal updating automatically every 5 minutes from Nepali English
              e-newspapers, The New York Times, Times of India, NDTV Profit, Fox News, Wall Street Journal, New York
              Post, and leading right-wing &amp; international channels.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                Nepal · India · US · Global
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-500" />
                Auto-Updated Live Wire
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
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(c.id);
                      setActiveSourceGroup('All Sources');
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

          <div className="md:col-span-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
              Live Media Channels
            </h3>
            <div className="flex flex-wrap gap-2">
              {SOURCE_GROUPS.filter((g) => g !== 'All Sources').map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSourceGroup(group);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-500/20 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-rose-500/50 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} THE MERIDIAN. Free English News Portal.</span>
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
