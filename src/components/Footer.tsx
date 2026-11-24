import React from 'react';
import { DollarSign, Globe2, ShieldCheck, Radio } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useNews } from '../context/NewsContext';

interface FooterProps {
  onOpenPublisherStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPublisherStudio }) => {
  const { setActiveCategory } = useNews();

  return (
    <footer className="mt-20 border-t border-slate-500/20 bg-white/80 dark:bg-[#050810] pb-24">
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
              Independent English-language journalism covering geopolitics, frontier technology, global markets,
              deep space, climate engineering, and culture — 100% free without paywalls, sustained by transparent,
              privacy-respecting advertising.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                Global English Wire
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Google Consent Mode v2
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-500" />
                Live RSS Sync
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">
              Editorial Desks
            </h3>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(c.id);
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
            <div className="p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/8 dark:bg-emerald-500/10 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400">
                Monetization &amp; Partnerships
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ready to earn revenue from your news portal? Configure Google AdSense, launch direct-sold sponsor
                banners, inspect IAB viewability, and download your <code className="font-mono">/ads.txt</code>.
              </p>
              <button
                type="button"
                onClick={onOpenPublisherStudio}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md transition-colors cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                Open Publisher Ad Studio
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} THE MERIDIAN Media Group. Free English News Edition.</span>
          <div className="flex items-center gap-4 font-mono">
            <a href="/ads.txt" target="_blank" rel="noreferrer" className="hover:text-rose-500">
              /ads.txt
            </a>
            <a href="/api/live-news" target="_blank" rel="noreferrer" className="hover:text-rose-500">
              /api/live-news
            </a>
            <button type="button" onClick={onOpenPublisherStudio} className="hover:text-rose-500 cursor-pointer">
              Advertise With Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
