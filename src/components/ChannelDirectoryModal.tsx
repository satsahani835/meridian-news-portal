import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Search, Tv2, Globe2, CheckCircle2 } from 'lucide-react';
import { CHANNEL_DIRECTORY } from '../data/categories';
import { useNews } from '../context/NewsContext';

interface ChannelDirectoryModalProps {
  open: boolean;
  onClose: () => void;
}

export const ChannelDirectoryModal: React.FC<ChannelDirectoryModalProps> = ({ open, onClose }) => {
  const {
    sourceCounts,
    activeSourceName,
    setActiveSourceName,
    setActiveCategory,
    setActiveSourceGroup,
  } = useNews();
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHANNEL_DIRECTORY;
    return CHANNEL_DIRECTORY.map((sec) => ({
      ...sec,
      channels: sec.channels.filter(
        (ch) =>
          ch.name.toLowerCase().includes(q) ||
          ch.region.toLowerCase().includes(q) ||
          ch.note.toLowerCase().includes(q) ||
          sec.title.toLowerCase().includes(q)
      ),
    })).filter((sec) => sec.channels.length > 0);
  }, [query]);

  const handleSelectChannel = (name: string) => {
    setActiveCategory('all');
    setActiveSourceGroup('All Channels');
    setActiveSourceName(name);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setActiveCategory('all');
    setActiveSourceGroup('All Channels');
    setActiveSourceName(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="All Live News Channels Directory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ y: 20, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-500/25 dark:border-white/15 bg-white dark:bg-[#0b101d] text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-500/15 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-[#0f1628]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600/15 text-rose-500 flex items-center justify-center">
                  <Tv2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold">Global News Channels Directory (60+)</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select any newspaper, TV network, or digital publication to filter live stories
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeSourceName && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Show All Channels
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close channel directory"
                  className="p-2 rounded-xl border border-slate-500/20 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="px-6 py-3 border-b border-slate-500/15 flex items-center gap-3">
              <Search className="w-4 h-4 text-rose-500 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter channels by name or country (e.g. Fox, Newsmax, Telegraph, Nepal, Sky News, Le Figaro)..."
                aria-label="Filter news channels"
                className="flex-1 bg-transparent text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Channel Sections */}
            <div className="flex-1 overflow-y-auto p-6 space-y-7">
              {filteredSections.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono uppercase tracking-[0.16em] font-bold text-rose-500 flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5" />
                      {section.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {section.channels.length} outlets
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {section.channels.map((ch) => {
                      const count = sourceCounts[ch.name] || 0;
                      const isSelected = activeSourceName === ch.name;
                      return (
                        <button
                          key={ch.name}
                          type="button"
                          onClick={() => handleSelectChannel(ch.name)}
                          className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500'
                              : 'border-slate-500/20 bg-slate-50/70 dark:bg-[#0f1626] hover:border-rose-500/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                              {ch.name}
                            </span>
                            <span
                              className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                count > 0
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-slate-500/15 text-slate-500'
                              }`}
                            >
                              {count > 0 ? `${count} live` : ch.region}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {ch.region} · {ch.note}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
