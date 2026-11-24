import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Shield,
  TrendingUp,
  ArrowLeftRight,
  Plane,
  Cpu,
  Landmark,
} from 'lucide-react';
import type { AffiliateIconName, AffiliateOffer } from '../data/affiliates';

interface AffiliateCardProps {
  offer: AffiliateOffer;
  variant?: 'sidebar' | 'inline';
  className?: string;
}

const ICONS: Record<AffiliateIconName, React.ReactNode> = {
  shield: <Shield className="w-4 h-4" />,
  trending: <TrendingUp className="w-4 h-4" />,
  remit: <ArrowLeftRight className="w-4 h-4" />,
  plane: <Plane className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  landmark: <Landmark className="w-4 h-4" />,
};

export const AffiliateCard: React.FC<AffiliateCardProps> = ({
  offer,
  variant = 'sidebar',
  className = '',
}) => {
  if (variant === 'inline') {
    return (
      <motion.aside
        key={offer.id}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
        aria-label={`Partner recommendation: ${offer.partner}`}
        className={`group rounded-2xl border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0e1422] p-4 sm:p-5 shadow-sm hover:border-rose-500/40 transition-all ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div
              className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${offer.accentClass} text-white flex items-center justify-center shadow-md`}
            >
              {ICONS[offer.icon]}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded-full bg-slate-500/12 text-slate-600 dark:text-slate-300 font-bold">
                  {offer.badge}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{offer.partner}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">· {offer.highlight}</span>
              </div>
              <h3 className="mt-1 font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {offer.headline}
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {offer.description}
              </p>
            </div>
          </div>

          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${offer.accentClass} text-white text-xs font-extrabold shadow-md transition-transform duration-200 group-hover:scale-[1.02]`}
          >
            {offer.ctaLabel}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-500/10 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Affiliate Partner Link · MRDN may earn a commission at no extra cost to you.</span>
          <span className="font-mono uppercase hidden sm:inline">Reader Offer</span>
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      key={offer.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-label={`Partner recommendation: ${offer.partner}`}
      className={`group rounded-2xl border border-slate-500/20 dark:border-white/10 bg-white dark:bg-[#0e1422] overflow-hidden shadow-sm hover:border-rose-500/45 transition-all ${className}`}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${offer.accentClass}`} />
      <div className="p-5 space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${offer.accentClass} text-white flex items-center justify-center shadow-sm`}
            >
              {ICONS[offer.icon]}
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                {offer.partner}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                {offer.badge}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
            {offer.highlight}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {offer.headline}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {offer.description}
        </p>

        <a
          href={offer.url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${offer.accentClass} text-white text-xs font-extrabold shadow-md transition-transform duration-200 group-hover:scale-[1.01]`}
        >
          {offer.ctaLabel}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <p className="text-[10px] text-slate-400 leading-snug pt-1 border-t border-slate-500/10">
          Affiliate Disclosure: MRDN may earn a referral commission if you sign up through this link, at zero extra cost to you.
        </p>
      </div>
    </motion.aside>
  );
};
