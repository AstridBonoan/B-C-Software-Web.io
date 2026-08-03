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
    <section id="work" aria-labelledby="work-heading" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured work"
          title="Results that look ready for real customers"
          description="Live client projects focused on trust, clarity, and business outcomes."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {CLIENT_WORK.map((project, index) => (
            <AnimatedSection key={project.href} delay={index * 0.06}>
              <article className="card-hover group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-slate-100 p-2 dark:bg-slate-800 sm:p-3">
                  <img
                    src={`${clientImageBase}${project.image}`}
                    alt={project.imageAlt}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    Live project
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                    {project.client} · {project.industry}
                  </p>
                  <h4 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{project.title}</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Challenge: </span>
                    {project.problem}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    View project
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 flex justify-center">
          <Button onClick={() => onNavigate('/my-work')}>All client work</Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
