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
      'I\u2019m a co-founder of B&C Software & Web, where I help small businesses and growing teams ship websites, apps, and internal tools that actually move the needle \u2014 with clean code, fast pages, and design that earns the user\u2019s trust on the first scroll.',
      'My work spans full-stack web development, workflow automation, and product design. I enjoy partnering with founders who want a thoughtful technical partner, not just a contractor.',
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
      'I\u2019m a co-founder of B&C Software & Web, focused on helping local businesses get found, stay consistent across platforms, and turn online attention into real customers.',
      'I lead brand positioning, local listings, and go-to-market strategy so every site and tool we ship has a clear path to visibility and growth.',
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
    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
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
          <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/20 to-violet-500/20 text-3xl font-bold tracking-wide text-brand-700 dark:text-brand-300">
            {initials}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/20 to-violet-500/20 text-3xl font-bold tracking-wide text-brand-700 dark:text-brand-300">
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
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            About
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            The team behind your upgrade
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Co-founders of B&C Software & Web&mdash;focused on helping local businesses grow online.
          </p>
        </div>

        <div className="mt-10 flex-1 space-y-6">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80"
            >
              <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8">
                <div className="mx-auto w-full max-w-[14rem] md:mx-0 md:max-w-none">
                  <TeamPhoto
                    photoSrc={member.photoSrc}
                    photoAlt={member.photoAlt}
                    initials={member.initials}
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <h2 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                    {member.name}
                  </h2>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:text-sm">
                    {member.title}
                  </p>
                  <a
                    href={member.phoneHref}
                    className="mb-4 inline-flex text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {member.phone}
                  </a>

                  <div className="space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Get in touch
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="rounded-lg border-2 border-slate-900 px-5 py-2.5 font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-white dark:text-white dark:hover:bg-slate-800"
          >
            See what we do
          </button>
        </div>
      </div>
    </section>
  );
}
