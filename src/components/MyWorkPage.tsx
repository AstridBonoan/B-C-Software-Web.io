import { CLIENT_WORK } from '../data/site';
import { AnimatedSection } from './ui/AnimatedSection';
import { Button } from './ui/Button';

const cardShell =
  'card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80';

interface MyWorkPageProps {
  onNavigate: (path: string) => void;
}

export function MyWorkPage({ onNavigate }: MyWorkPageProps) {
  const imageBase = `${import.meta.env.BASE_URL}my-work/`;

  return (
    <section className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          My Work
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Client projects I&rsquo;ve shipped
        </h1>
        <p className="mb-10 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          Real builds for paying clients—live tools, integrations, and design decisions behind each
          project.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENT_WORK.map((project, index) => (
            <AnimatedSection key={project.href} delay={index * 0.05}>
              <article className={cardShell}>
                <div className="relative flex aspect-[16/10] w-full shrink-0 items-center justify-center overflow-hidden bg-slate-100 p-2 dark:bg-slate-800 sm:p-3">
                  <img
                    src={`${imageBase}${project.image}`}
                    alt={project.imageAlt}
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-600/90 px-2.5 py-1 text-[0.65rem] font-semibold text-white sm:text-xs">
                    Live
                  </span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                    {project.client}
                  </p>
                  <h2 className="mb-1 text-lg font-bold leading-snug text-slate-900 dark:text-white sm:text-xl">
                    {project.title}
                  </h2>
                  <p className="mb-2 text-xs font-medium text-slate-500">{project.industry}</p>
                  <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Challenge: </span>
                    {project.problem}
                  </p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 sm:w-fit"
                  >
                    View live project
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center dark:border-white/15 dark:bg-slate-900/40">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Want something similar?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-400">
            Tell me about your business and goals—I&rsquo;ll recommend the right mix of website,
            tools, and automation.
          </p>
          <Button onClick={() => onNavigate('/contact')} className="mt-5">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
