import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ShieldCheck } from 'lucide-react';
import { useAdMonetization } from '../../context/AdMonetizationContext';

export const ConsentBanner: React.FC = () => {
  const { config, setConsent } = useAdMonetization();

  return (
    <AnimatePresence>
      {config.consentStatus === 'pending' && (
        <motion.aside
          role="dialog"
          aria-label="Privacy and Ad Personalization Consent"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl border border-slate-500/25 dark:border-white/15 bg-white/95 dark:bg-[#0e1525]/95 backdrop-blur-xl p-5 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-9 h-9 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Free Journalism Powered by Transparent Ads
              </h2>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                THE MERIDIAN is 100% free with zero paywalls. We use cookies and Google Consent Mode v2 to serve
                relevant ads and measure IAB viewability. Choose your preference below:
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConsent('accepted-all')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Accept All Ads
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('essential-only')}
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
