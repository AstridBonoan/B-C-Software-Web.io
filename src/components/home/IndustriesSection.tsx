import { INDUSTRIES } from '../../data/site';
import { SectionHeader } from '../ui/SectionHeader';

export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="section-padding border-y border-slate-200/80 bg-surface dark:border-white/10 dark:bg-ink/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="industries-heading">
          <SectionHeader
            eyebrow="Industries"
            title="Built for the businesses we know best"
            description="Whether you run a shop, restaurant, or service company—we design for how your customers actually find and choose you."
            align="left"
          />
        </div>

        <ul className="flex flex-wrap gap-x-3 gap-y-3">
          {INDUSTRIES.map((industry) => (
            <li
              key={industry.name}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            >
              {industry.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
