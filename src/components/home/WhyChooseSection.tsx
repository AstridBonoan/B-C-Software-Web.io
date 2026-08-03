import { WHY_CHOOSE } from '../../data/site';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

export function WhyChooseSection() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="section-padding border-t border-slate-200/80 bg-slate-50/50 dark:border-white/5 dark:bg-slate-900/25"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            align="left"
            eyebrow="Why B&C Software & Web"
            title="Focused on your growth—not jargon"
            description="I combine modern design, reliable technology, and direct communication so you always know where your project stands."
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {WHY_CHOOSE.map((item, index) => (
              <AnimatedSection key={item} delay={index * 0.04}>
                <li className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white dark:bg-brand-500">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span
                    id={index === 0 ? 'why-heading' : undefined}
                    className="text-sm font-semibold text-slate-800 dark:text-slate-100"
                  >
                    {item}
                  </span>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
