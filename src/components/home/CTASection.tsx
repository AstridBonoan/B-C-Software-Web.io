import { motion, useReducedMotion } from 'framer-motion';

interface CTASectionProps {
  onNavigate: (path: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-24"
      >
        <div className="max-w-xl">
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Let&rsquo;s modernize your business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Share your goals—we&rsquo;ll respond with clear next steps. Free consultation, no obligation.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Start Your Project
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/cost-estimator')}
            className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Estimate your project
          </button>
        </div>
      </motion.div>
    </section>
  );
}
