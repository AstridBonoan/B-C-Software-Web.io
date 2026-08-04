import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Review } from '../../types/review';
import { ReviewCard } from './ReviewCard';

interface ReviewsCarouselProps {
  reviews: Review[];
  /** Auto-advance interval in ms */
  intervalMs?: number;
}

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCount(3);
      else if (width >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

export function ReviewsCarousel({ reviews, intervalMs = 6000 }: ReviewsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Review | null>(null);
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, reviews.length - visibleCount);
  const gap = 16;

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.clientWidth;
      setSlideWidth((width - gap * (visibleCount - 1)) / visibleCount);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [visibleCount]);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (reduceMotion || paused || reviews.length <= visibleCount) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, reviews.length, visibleCount, maxIndex, intervalMs]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  if (reviews.length === 0) return null;

  const goPrev = () => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const goNext = () => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  const showControls = reviews.length > visibleCount;
  const offset = slideWidth > 0 ? index * (slideWidth + gap) : 0;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {showControls ? (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-ink dark:text-white dark:hover:bg-white/10 sm:-translate-x-3"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : null}

        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap }}
            animate={{ x: -offset }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="shrink-0"
                style={{ width: slideWidth || undefined, flex: slideWidth ? undefined : '1 0 100%' }}
              >
                <ReviewCard review={review} truncated onReadFull={setExpanded} />
              </div>
            ))}
          </motion.div>
        </div>

        {showControls ? (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-ink dark:text-white dark:hover:bg-white/10 sm:translate-x-3"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : null}

        {showControls ? (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={
                  'h-1.5 w-1.5 rounded-full transition-colors ' +
                  (i === index ? 'bg-ink dark:bg-white' : 'bg-slate-300 hover:bg-slate-400 dark:bg-white/25 dark:hover:bg-white/40')
                }
                aria-label={`Go to review set ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/50"
              aria-label="Close review"
              onClick={() => setExpanded(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Full review"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-ink sm:p-8"
            >
              <button
                type="button"
                onClick={() => setExpanded(null)}
                className="absolute right-4 top-4 rounded-lg p-1 text-ink-muted hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
              <ReviewCard review={expanded} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
