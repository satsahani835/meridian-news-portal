import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShieldCheck, Info, Mail, FileText } from 'lucide-react';

export type LegalPageId = 'about' | 'privacy' | 'terms' | 'contact' | null;

interface LegalModalProps {
  page: LegalPageId;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose }) => {
  const titles: Record<Exclude<LegalPageId, null>, { title: string; icon: React.ReactNode }> = {
    about: { title: 'About MRDN News Portal', icon: <Info className="w-4 h-4 text-sky-500" /> },
    privacy: { title: 'Privacy Policy & Google AdSense Disclosure', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    terms: { title: 'Terms of Use & Editorial Disclaimer', icon: <FileText className="w-4 h-4 text-amber-500" /> },
    contact: { title: 'Contact MRDN News Portal', icon: <Mail className="w-4 h-4 text-rose-500" /> },
  };

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={titles[page].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 18, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-500/25 dark:border-white/15 bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {titles[page].icon}
                <h2 className="text-base font-extrabold">{titles[page].title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 rounded-xl hover:bg-slate-500/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {page === 'about' && (
                <>
                  <p>
                    <strong>MRDN News Portal</strong> (<em>Trusted News. Anytime. Anywhere.</em>) is an independent,
                    100% free global news portal aggregating real-time daily coverage from 60+ leading outlets —
                    including Nepali English e-newspapers (<em>The Kathmandu Post, OnlineKhabar, Nepali Times,
                    Khabarhub, The Rising Nepal</em>), major Indian &amp; markets desks (<em>Times of India, NDTV
                    Profit, NDTV</em>), US broadcast &amp; print networks (<em>Fox News, Fox Business, Newsmax, OANN,
                    New York Post, The New York Times, Wall Street Journal, National Review, Reason, Daily Wire,
                    Breitbart</em>), UK media (<em>The Telegraph, Daily Mail, GB News, TalkTV, The Spectator</em>), and
                    international channels across Europe, Canada, and Australia.
                  </p>
                  <p>
                    Our platform updates automatically every few minutes around the clock so readers worldwide can
                    follow breaking headlines, markets, politics, technology, and sports in one fast, free interface.
                  </p>
                </>
              )}

              {page === 'privacy' && (
                <>
                  <p>
                    <strong>Effective Date:</strong> {new Date().getFullYear()} — MRDN News Portal respects your
                    privacy. We do not sell personal data or require user registration to read news.
                  </p>
                  <p>
                    <strong>Google AdSense &amp; Third-Party Cookies:</strong> This website uses Google AdSense
                    (Publisher ID <code className="font-mono text-xs">ca-pub-7994439676148929</code>) to display
                    advertisements that keep news free. Third-party vendors, including Google, use cookies to serve ads
                    based on a user&apos;s prior visits to this website or other websites on the internet.
                  </p>
                  <p>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to our readers based
                    on their visits to this site and/or other sites on the Internet. Users may opt out of personalized
                    advertising at any time by visiting{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-500 underline"
                    >
                      Google Ads Settings
                    </a>{' '}
                    or choosing <em>Non-Personalized Only</em> in our cookie banner.
                  </p>
                  <p>
                    <strong>Local Storage:</strong> Bookmarks, theme preference (Dark/Light mode), and cookie consent
                    choices are stored strictly in your own browser&apos;s local storage.
                  </p>
                </>
              )}

              {page === 'terms' && (
                <>
                  <p>
                    MRDN News Portal provides curated live headlines, summaries, and direct outbound attribution links
                    to official public RSS feeds published by independent news organizations.
                  </p>
                  <p>
                    All trademarks, headlines, photographs, and full articles remain the intellectual property of their
                    respective publishers. Every dispatch clearly attributes its original source and links directly to
                    the publisher&apos;s full story.
                  </p>
                  <p>
                    Market figures and financial news headlines are provided for informational purposes only and do not
                    constitute investment advice.
                  </p>
                </>
              )}

              {page === 'contact' && (
                <>
                  <p>
                    Have a news tip, publisher RSS inquiry, copyright request, or technical feedback? Reach the MRDN
                    editorial &amp; operations desk directly:
                  </p>
                  <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-50 dark:bg-[#0f1626] space-y-1.5 font-mono text-xs">
                    <div>
                      <strong>Editorial &amp; Support:</strong> satsahani0@gmail.com
                    </div>
                    <div>
                      <strong>Website:</strong> https://mrdnews.vercel.app
                    </div>
                    <div>
                      <strong>Authorized Sellers:</strong> https://mrdnews.vercel.app/ads.txt
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
