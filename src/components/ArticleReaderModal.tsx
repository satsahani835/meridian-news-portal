import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Bookmark,
  Share2,
  Check,
  Volume2,
  Square,
  Clock,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Send,
} from 'lucide-react';
import type { Article } from '../types/news';
import { CATEGORY_MAP } from '../data/categories';
import { useNews } from '../context/NewsContext';
import { useAdMonetization } from '../context/AdMonetizationContext';
import { AdSlot } from './ads/AdSlot';

interface ArticleReaderModalProps {
  article: Article | null;
  relatedArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenPublisherStudio: () => void;
  onAdClickToast: (msg: string) => void;
}

interface ReaderComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  relatedArticles,
  onClose,
  onSelectArticle,
  onOpenPublisherStudio,
  onAdClickToast,
}) => {
  const { isBookmarked, toggleBookmark } = useNews();
  const { config } = useAdMonetization();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [comments, setComments] = useState<ReaderComment[]>([
    {
      id: 'c-1',
      author: 'Dr. Claire Henderson',
      text: 'Superb reporting — especially refreshing to read long-form English analysis without hitting a paywall.',
      time: '42m ago',
    },
  ]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // Reset scroll & speech when article changes
  useEffect(() => {
    setReadProgress(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [article?.id]);

  // Escape key closes modal
  useEffect(() => {
    if (!article) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [article, onClose]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setReadProgress(100);
      return;
    }
    setReadProgress(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
  };

  const toggleListen = () => {
    if (!article || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${article.title}. ${article.subtitle}. ${article.content.join(' ')}`
    );
    utterance.lang = 'en-US';
    utterance.rate = 1.02;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const handleShare = () => {
    if (!article) return;
    const shareUrl = `${window.location.origin}/#article-${article.slug}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        author: commentAuthor.trim() || 'Meridian Reader',
        text: commentText.trim(),
        time: 'Just now',
      },
      ...prev,
    ]);
    setCommentText('');
  };

  const fontSizeClass =
    fontScale === 'sm' ? 'text-base leading-7' : fontScale === 'lg' ? 'text-xl leading-9' : 'text-lg leading-8';

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={article.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center sm:p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-full sm:h-[94vh] bg-[#f9f7f2] dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 sm:rounded-3xl border border-slate-500/20 dark:border-white/15 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Reading Progress Bar */}
            <div className="h-1 w-full bg-slate-500/15 shrink-0">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 transition-[width] duration-150"
                style={{ width: `${readProgress}%` }}
              />
            </div>

            {/* Sticky Top Reader Toolbar */}
            <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-slate-500/15 flex items-center justify-between gap-2 bg-white/80 dark:bg-[#0c1222]/90 backdrop-blur-md">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-500 font-bold shrink-0">
                  {(CATEGORY_MAP[article.category] || CATEGORY_MAP.world).label}
                </span>
                <span className="hidden sm:inline text-xs font-mono text-slate-500">
                  {readProgress}% read
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Text-to-Speech Listen Button */}
                <button
                  type="button"
                  onClick={toggleListen}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    speaking
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-slate-500/20 hover:bg-slate-500/10'
                  }`}
                >
                  {speaking ? (
                    <>
                      <Square className="w-3 h-3 fill-current" />
                      <span>Stop</span>
                      <span className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
                        <span className="w-0.5 h-full bg-white eq-bar" />
                        <span className="w-0.5 h-full bg-white eq-bar" style={{ animationDelay: '0.2s' }} />
                        <span className="w-0.5 h-full bg-white eq-bar" style={{ animationDelay: '0.4s' }} />
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Listen</span>
                    </>
                  )}
                </button>

                {/* Font Size Toggle */}
                <button
                  type="button"
                  onClick={() => setFontScale((prev) => (prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm'))}
                  aria-label="Adjust article text size"
                  className="px-2.5 py-1.5 rounded-xl border border-slate-500/20 hover:bg-slate-500/10 text-xs font-mono font-bold cursor-pointer"
                >
                  A{fontScale === 'sm' ? '-' : fontScale === 'lg' ? '+' : ''}
                </button>

                {/* Share */}
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Copy article link"
                  className="p-2 rounded-xl border border-slate-500/20 hover:bg-slate-500/10 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </button>

                {/* Bookmark */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(article.id)}
                  aria-label="Toggle bookmark"
                  className={`p-2 rounded-xl border cursor-pointer ${
                    isBookmarked(article.id)
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'border-slate-500/20 hover:bg-slate-500/10'
                  }`}
                >
                  <Bookmark className="w-4 h-4" fill={isBookmarked(article.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close article reader"
                  className="p-2 rounded-xl border border-slate-500/20 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Content */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-5 sm:px-10 md:px-14 py-8">
              <article className="max-w-3xl mx-auto">
                <h1 className="font-display text-3xl sm:text-5xl leading-[1.08] tracking-tight text-slate-900 dark:text-white">
                  {article.title}
                </h1>
                <p className="mt-4 font-serif text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Author Byline */}
                <div className="mt-6 pb-6 border-b border-slate-500/15 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center">
                      {article.author.avatarInitials}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{article.author.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {article.author.role}
                        {article.author.location ? ` · ${article.author.location}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTimeMinutes} min read
                    </span>
                    <span>·</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>
                </div>

                {/* Editorial Hero Image */}
                <figure className="my-7">
                  <div className="rounded-2xl overflow-hidden border border-slate-500/20 shadow-xl bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      onError={(e) => {
                        if (article.fallbackImage) (e.currentTarget as HTMLImageElement).src = article.fallbackImage;
                      }}
                      className="w-full max-h-[440px] object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 italic">
                    {article.imageCaption}
                  </figcaption>
                </figure>

                {/* Key Takeaways Executive Brief Box */}
                {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                  <div className="my-7 p-5 rounded-2xl border border-amber-500/25 bg-amber-500/8 dark:bg-amber-500/10">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Takeaways
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                      {article.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Paragraphs + High-Yield In-Article Revenue Ad Unit after paragraph 2 */}
                <div className={`font-serif space-y-6 text-slate-800 dark:text-slate-200 ${fontSizeClass}`}>
                  {article.content.map((para, idx) => (
                    <React.Fragment key={idx}>
                      <p className={idx === 0 ? 'article-dropcap' : ''}>{para}</p>
                      {idx === 1 && config.enableInArticleAds && (
                        <div className="my-8 font-sans">
                          <AdSlot
                            placement="in-article-mid"
                            seed={idx + 1}
                            onOpenPublisherStudio={onOpenPublisherStudio}
                            onAdClickToast={onAdClickToast}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Live Wire External Link if RSS Story */}
                {article.externalUrl && (
                  <div className="mt-8 p-4 rounded-2xl border border-sky-500/25 bg-sky-500/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-700 dark:text-slate-200">
                      Original syndicated wire dispatch from <strong>{article.sourceName}</strong>.
                    </div>
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
                    >
                      Read Full Source Dispatch
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-slate-500/15 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-slate-500/10 text-slate-600 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Reader Discussion */}
                <section className="mt-10 pt-8 border-t border-slate-500/15">
                  <h2 className="text-base font-extrabold flex items-center gap-2 mb-4">
                    <MessageSquare className="w-4 h-4 text-rose-500" />
                    Reader Perspectives ({comments.length})
                  </h2>
                  <form onSubmit={handlePostComment} className="space-y-3 mb-6">
                    <div className="grid sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        placeholder="Your name (optional)"
                        aria-label="Your name"
                        className="px-3.5 py-2.5 rounded-xl border border-slate-500/20 bg-white dark:bg-[#0f1626] text-xs"
                      />
                      <div className="sm:col-span-2 flex gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share a thoughtful perspective on this report..."
                          aria-label="Write a comment"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-500/20 bg-white dark:bg-[#0f1626] text-xs"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Post
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-3">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-2xl border border-slate-500/15 bg-white dark:bg-[#0f1626]"
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold">{c.author}</span>
                          <span className="text-slate-500 font-mono text-[11px]">{c.time}</span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Related Coverage */}
                {relatedArticles.length > 0 && (
                  <section className="mt-10 pt-8 border-t border-slate-500/15">
                    <h2 className="text-base font-extrabold mb-4">Continue Reading</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedArticles.slice(0, 2).map((rel) => (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => onSelectArticle(rel)}
                          className="text-left p-4 rounded-2xl border border-slate-500/20 hover:border-rose-500/50 bg-white dark:bg-[#0f1626] transition-all cursor-pointer group"
                        >
                          <span className="text-[10px] font-mono uppercase text-rose-500 font-bold">
                            {rel.category}
                          </span>
                          <div className="mt-1 font-serif text-base font-bold group-hover:text-rose-500 transition-colors line-clamp-2">
                            {rel.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
