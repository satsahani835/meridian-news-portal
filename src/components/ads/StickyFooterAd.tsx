import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AdSlot } from './AdSlot';
import { useAdMonetization } from '../../context/AdMonetizationContext';

interface StickyFooterAdProps {
  onOpenPublisherStudio: () => void;
  onAdClickToast: (msg: string) => void;
}

export const StickyFooterAd: React.FC<StickyFooterAdProps> = ({
  onOpenPublisherStudio,
  onAdClickToast,
}) => {
  const { config } = useAdMonetization();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 360) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!config.enableStickyFooter || !config.slots['sticky-footer']?.enabled || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto relative pointer-events-auto shadow-2xl shadow-black/40 rounded-2xl">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Close sticky advertisement bar"
              className="absolute -top-3 -right-2 z-30 w-7 h-7 rounded-full bg-slate-900 text-slate-200 border border-white/20 hover:bg-rose-600 hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <AdSlot
              placement="sticky-footer"
              seed={3}
              onOpenPublisherStudio={onOpenPublisherStudio}
              onAdClickToast={onAdClickToast}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
