import { CLIENT_WORK } from '../data/site';
import { Button } from './ui/Button';

interface MyWorkPageProps {
  onNavigate: (path: string) => void;
}

export function MyWorkPage({ onNavigate }: MyWorkPageProps) {
  const imageBase = `${import.meta.env.BASE_URL}my-work/`;

  return (
    <section className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
          Our Work
        </p>
        <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
          Client projects we&rsquo;ve shipped
        </h1>
        <p className="mb-12 max-w-3xl text-lg text-ink-muted dark:text-slate-400">
          Real builds for paying clients—live tools, integrations, and design decisions behind each
          project.
        </p>

        <div className="space-y-16 sm:space-y-20">
          {CLIENT_WORK.map((project, index) => (
            <article
              key={project.href}
              className={`grid items-center gap-8 border-b border-slate-200 pb-16 last:border-0 last:pb-0 dark:border-white/10 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <img
                  src={`${imageBase}${project.image}`}
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
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink dark:text-white">
                  {project.title}
                </h2>
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
                  View live project
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-slate-200 pt-12 dark:border-white/10">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">
            Want something similar?
          </h2>
          <p className="mt-2 max-w-lg text-sm text-ink-muted dark:text-slate-400">
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
