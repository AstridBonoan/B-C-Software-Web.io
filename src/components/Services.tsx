import { SERVICES } from '../data/site';
import { PageShell } from './ui/PageShell';
import { ServiceIcon } from './ui/ServiceIcon';

export function Services() {
  return (
    <PageShell
      eyebrow="Services"
      title="Solutions that help your business grow"
      description="Every service is explained in plain language—focused on results your customers and team will feel."
    >
      <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6 lg:grid-cols-[auto_minmax(0,16rem)_1fr] lg:items-start"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center text-brand-600 dark:text-brand-400">
              <ServiceIcon name={service.icon} className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:col-start-3">
              {service.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-10 dark:border-white/10">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
          Not sure where to start?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted dark:text-slate-400">
          Tell me about your business and goals—I&rsquo;ll recommend the right mix of website,
          tools, and automation for your budget and timeline.
        </p>
      </div>
    </PageShell>
  );
}
