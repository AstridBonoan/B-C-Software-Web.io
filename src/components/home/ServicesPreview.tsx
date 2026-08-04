import { SERVICES } from '../../data/site';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceIcon } from '../ui/ServiceIcon';

interface ServicesPreviewProps {
  onNavigate: (path: string) => void;
}

export function ServicesPreview({ onNavigate }: ServicesPreviewProps) {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-padding bg-white dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Digital solutions that move your business forward"
          description="Practical services with clear outcomes—built for owners who want results, not technical overwhelm."
          align="left"
        />

        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.02}>
              <article className="grid gap-4 py-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-7 lg:grid-cols-[auto_minmax(0,14rem)_1fr] lg:items-start">
                <span className="inline-flex h-10 w-10 items-center justify-center text-brand-600 dark:text-brand-400">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>
                <h3
                  id={index === 0 ? 'services-heading' : undefined}
                  className="font-display text-base font-semibold text-ink dark:text-white sm:text-lg"
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:col-start-3">
                  {service.description}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-10">
          <Button variant="secondary" onClick={() => onNavigate('/services')}>
            View service details
          </Button>
        </div>
      </div>
    </section>
  );
}
