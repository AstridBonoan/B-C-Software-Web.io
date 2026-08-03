import { BRAND } from '../../data/site';
import { AnimatedSection } from '../ui/AnimatedSection';
import { ContactFormFields } from '../ui/ContactFormFields';

interface CTASectionProps {
  onNavigate: (path: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-padding pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900/80">
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 dark:border-white/10 sm:p-10 lg:border-b-0 lg:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                  Get started
                </p>
                <h2
                  id="contact-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Let&rsquo;s modernize your business
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300">
                  Share your goals—I&rsquo;ll respond with clear next steps. Free consultation, no
                  obligation.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Email {BRAND.email}
                  </a>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                  >
                    Instagram {BRAND.instagramHandle}
                  </a>
                  <a
                    href={BRAND.calendlyPlaceholder}
                    className="text-center text-sm text-slate-500 transition-colors hover:text-slate-300"
                  >
                    Schedule a call (coming soon)
                  </a>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                  Request a consultation
                </h3>
                <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                  Tell me about your business—I typically reply within 1–2 business days.
                </p>
                <ContactFormFields compact subject="Consultation request" />
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="mt-4 w-full text-center text-sm font-medium text-slate-500 underline-offset-2 hover:text-brand-600 hover:underline dark:text-slate-400 dark:hover:text-brand-400"
                >
                  Prefer the full contact page?
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
