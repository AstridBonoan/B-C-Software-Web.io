import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BRAND, HERO_SLIDES } from '../../data/site';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

const ROTATE_MS = 15000;

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, ROTATE_MS]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-20 dark:border-white/10 dark:bg-surface-dark sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(15,118,110,0.06),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(45,212,191,0.08),_transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-display text-base font-semibold tracking-tight text-brand-600 dark:text-brand-400 sm:text-lg">
            {BRAND.name}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.headline}
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              aria-live="polite"
            >
              <h1
                id="hero-heading"
                className="font-display text-[2.35rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:text-6xl dark:text-white"
              >
                {slide.headline}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-slate-400">
                {slide.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button onClick={() => onNavigate('/contact')} className="w-full px-8 sm:w-auto">
              Start Your Project
            </Button>
            <Button
              variant="secondary"
              onClick={() => onNavigate('/my-work')}
              className="w-full sm:w-auto"
            >
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
