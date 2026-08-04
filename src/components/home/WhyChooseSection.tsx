import { WHY_CHOOSE } from '../../data/site';
import { SectionHeader } from '../ui/SectionHeader';

export function WhyChooseSection() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="section-padding border-y border-slate-200/80 bg-surface dark:border-white/10 dark:bg-ink/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            align="left"
            eyebrow="Why B&C Software & Web"
            title="Focused on your growth—not jargon"
            description="We combine modern design, reliable technology, and direct communication so you always know where your project stands."
          />

          <ul className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
            {WHY_CHOOSE.map((item, index) => (
              <li
                key={item}
                id={index === 0 ? 'why-heading' : undefined}
                className="flex items-start gap-4 py-4"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600 dark:bg-brand-400" aria-hidden />
                <span className="text-base font-medium text-ink dark:text-slate-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
