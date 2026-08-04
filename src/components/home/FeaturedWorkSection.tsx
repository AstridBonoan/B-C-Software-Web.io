import { CLIENT_WORK } from '../../data/site';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

interface FeaturedWorkSectionProps {
  onNavigate: (path: string) => void;
}

export function FeaturedWorkSection({ onNavigate }: FeaturedWorkSectionProps) {
  const clientImageBase = `${import.meta.env.BASE_URL}my-work/`;

  return (
    <section id="work" aria-labelledby="work-heading" className="section-padding bg-white dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured work"
          title="Results that look ready for real customers"
          description="Live client projects focused on trust, clarity, and business outcomes."
          align="left"
        />

        <div className="space-y-16 sm:space-y-20">
          {CLIENT_WORK.map((project, index) => (
            <AnimatedSection key={project.href} delay={index * 0.05}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <img
                    src={`${clientImageBase}${project.image}`}
                    alt={project.imageAlt}
                    className="aspect-[16/10] w-full object-contain object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                    {project.client} · {project.industry}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-muted dark:text-slate-400">
                    <span className="font-medium text-ink dark:text-slate-200">Challenge: </span>
                    {project.problem}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink-muted dark:text-slate-400">
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline dark:text-white"
                  >
                    View project
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12">
          <Button onClick={() => onNavigate('/my-work')}>All client work</Button>
        </div>
      </div>
    </section>
  );
}
