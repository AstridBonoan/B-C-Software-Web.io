import { PROCESS_STEPS } from '../../data/site';
import { SectionHeader } from '../ui/SectionHeader';

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="section-padding bg-white dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="My process"
          title="Simple steps from first call to launch"
          description="A straightforward path designed for busy owners—no confusing project speak."
          align="left"
        />

        <ol className="max-w-2xl space-y-0">
          {PROCESS_STEPS.map((step, index) => {
            const isLast = index === PROCESS_STEPS.length - 1;
            return (
              <li key={step.title} className="relative flex gap-5 sm:gap-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white font-display text-xs font-semibold text-ink dark:border-white/20 dark:bg-surface-dark dark:text-white">
                    {step.step}
                  </span>
                  {!isLast ? (
                    <span className="my-2 w-px flex-1 bg-slate-200 dark:bg-white/15" aria-hidden />
                  ) : null}
                </div>
                <div className={isLast ? 'pb-0' : 'pb-10 sm:pb-12'}>
                  <h3
                    id={index === 0 ? 'process-heading' : undefined}
                    className="font-display text-xl font-semibold text-ink dark:text-white"
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
