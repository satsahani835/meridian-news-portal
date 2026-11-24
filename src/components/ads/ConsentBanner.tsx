import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ShieldCheck } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'meridian_cookie_consent_v2';

type ConsentValue = 'pending' | 'accepted' | 'non-personalized';

export const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentValue>(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved === 'accepted' || saved === 'non-personalized') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'pending';
  });

  useEffect(() => {
    if (consent === 'pending') return;
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, consent);
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = consent === 'non-personalized' ? 1 : 0;
    } catch {
      // Ignore storage errors
    }
  }, [consent]);

  return (
    <AnimatePresence>
      {consent === 'pending' && (
        <motion.aside
          role="dialog"
          aria-label="Cookie and Google Ads Consent"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl border border-slate-500/25 dark:border-white/15 bg-white/95 dark:bg-[#0e1525]/95 backdrop-blur-xl p-5 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Free News Supported by Google Ads
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                THE MERIDIAN is 100% free to read. We and Google AdSense use cookies to deliver relevant ads and
                remember your reading preferences.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConsent('accepted')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('non-personalized')}
                  className="px-3.5 py-2 rounded-xl border border-slate-500/25 hover:bg-slate-500/10 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Non-Personalized Only
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
