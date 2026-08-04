import { Button } from './ui/Button';

interface AboutMePageProps {
  onNavigate: (path: string) => void;
}

const TEAM = [
  {
    name: 'Astrid Bonoan',
    title: 'Co-Founder & Chief Technology Officer',
    phone: '(917) 500-9756',
    phoneHref: 'tel:+19175009756',
    photoSrc: `${import.meta.env.BASE_URL}about-me.png`,
    photoAlt: 'Astrid Bonoan',
    initials: 'AB',
    bio: [
      'Astrid is a co-founder of B&C Software & Web, where he helps small businesses and growing teams ship websites, apps, and internal tools that actually move the needle \u2014 with clean code, fast pages, and design that earns the user\u2019s trust on the first scroll.',
      'His work spans full-stack web development, workflow automation, and product design. He enjoys partnering with founders who want a thoughtful technical partner, not just a contractor.',
    ],
  },
  {
    name: 'Charlie Flores',
    title: 'Co-Founder & Chief Marketing Officer',
    phone: '(929) 395-2195',
    phoneHref: 'tel:+19293952195',
    photoSrc: null as string | null,
    photoAlt: 'Charlie Flores',
    initials: 'CF',
    bio: [
      'Charlie is a co-founder of B&C Software & Web, focused on helping local businesses get found, stay consistent across platforms, and turn online attention into real customers.',
      'He leads brand positioning, local listings, and go-to-market strategy so every site and tool we ship has a clear path to visibility and growth.',
    ],
  },
] as const;

function TeamPhoto({
  photoSrc,
  photoAlt,
  initials,
}: {
  photoSrc: string | null;
  photoAlt: string;
  initials: string;
}) {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
      {photoSrc ? (
        <>
          <img
            src={photoSrc}
            alt={photoAlt}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              const fallback = event.currentTarget.nextElementSibling;
              if (fallback instanceof HTMLElement) {
                fallback.style.display = 'flex';
              }
            }}
          />
          <div className="hidden h-full w-full items-center justify-center bg-surface font-display text-3xl font-semibold tracking-wide text-ink-muted dark:bg-slate-800 dark:text-slate-400">
            {initials}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface font-display text-3xl font-semibold tracking-wide text-ink-muted dark:bg-slate-800 dark:text-slate-400">
          {initials}
        </div>
      )}
    </div>
  );
}

export function AboutMePage({ onNavigate }: AboutMePageProps) {
  return (
    <section className="flex min-h-screen flex-col bg-surface px-4 pb-14 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
            About
          </p>
          <h1 className="mb-3 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
            The team behind your upgrade
          </h1>
          <p className="max-w-2xl text-lg text-ink-muted dark:text-slate-400">
            Co-founders of B&C Software & Web&mdash;focused on helping local businesses grow online.
          </p>
        </div>

        <div className="mt-12 flex-1 space-y-12">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="grid grid-cols-1 gap-8 border-b border-slate-200 pb-12 last:border-0 dark:border-white/10 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
            >
              <div className="mx-auto w-full max-w-[14rem] md:mx-0 md:max-w-none">
                <TeamPhoto
                  photoSrc={member.photoSrc}
                  photoAlt={member.photoAlt}
                  initials={member.initials}
                />
              </div>

              <div className="flex min-w-0 flex-col">
                <h2 className="font-display text-2xl font-semibold text-ink dark:text-white sm:text-3xl">
                  {member.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {member.title}
                </p>
                <a
                  href={member.phoneHref}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline decoration-brand-600/40 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-700 dark:text-brand-400 dark:decoration-brand-400/50 dark:hover:text-brand-300 dark:hover:decoration-brand-300"
                  aria-label={`Call ${member.name} at ${member.phone}`}
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.44 1.097l.722 2.527a1.5 1.5 0 0 1-.55 1.575l-1.149.862a11.042 11.042 0 0 0 5.097 5.097l.862-1.149a1.5 1.5 0 0 1 1.575-.55l2.527.722A1.5 1.5 0 0 1 18 13.621V16.5a1.5 1.5 0 0 1-1.5 1.5H15C7.82 18 2 12.18 2 5V3.5Z" />
                  </svg>
                  Call {member.phone}
                </a>

                <div className="mt-5 space-y-3 text-base leading-relaxed text-ink-muted dark:text-slate-300">
                  {member.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={() => onNavigate('/contact')}>Get in touch</Button>
          <Button variant="secondary" onClick={() => onNavigate('/services')}>
            See what we do
          </Button>
        </div>
      </div>
    </section>
  );
}
