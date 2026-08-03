interface AboutMePageProps {
  onNavigate: (path: string) => void;
}

export function AboutMePage({ onNavigate }: AboutMePageProps) {
  // Headshot lives at `public/about-me.png`. If the file is ever missing
  // (e.g. mid-deploy), the onError handler below swaps in a placeholder.
  const photoSrc = `${import.meta.env.BASE_URL}about-me.png`;

  return (
    <section className="flex min-h-screen flex-col bg-surface px-4 pb-14 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            About
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            One point of contact for your upgrade
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            The person behind B&C Software & Web—focused on helping local businesses grow online.
          </p>
        </div>

        {/* Card wrapper takes the remaining vertical space and centers the card
            between the title and the bottom of the viewport. */}
        <div className="flex-1 flex items-center">
          <article className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,16rem)_1fr] gap-6 md:gap-8 p-6 sm:p-8">
            {/* Photo card -- stretches to match bio column height on md+ */}
            <div className="w-full max-w-[16rem] mx-auto md:max-w-none md:h-full">
              <div className="aspect-[4/5] md:aspect-auto md:h-full w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center min-h-[14rem]">
                <img
                  src={photoSrc}
                  alt="Astrid Bonoan"
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    // Hide the broken-image icon when no headshot is uploaded yet
                    // and let the dashed placeholder show through.
                    event.currentTarget.style.display = 'none';
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback instanceof HTMLElement) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-medium px-3 text-center">
                  Photo unavailable
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="min-w-0 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                Astrid Bonoan
              </h2>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                Founder &amp; Lead Developer
              </p>

              <div className="space-y-3 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  I&rsquo;m the founder of B&C Software &amp; Web, where I help small businesses
                  and growing teams ship websites, apps, and internal tools that
                  actually move the needle &mdash; with clean code, fast pages, and
                  design that earns the user&rsquo;s trust on the first scroll.
                </p>
                <p>
                  My work spans full-stack web development, workflow automation, and
                  product design. I enjoy partnering with founders who want a
                  thoughtful technical partner, not just a contractor.
                </p>
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Get in touch
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="px-5 py-2.5 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  See what I do
                </button>
              </div>
            </div>
          </div>
          </article>
        </div>
      </div>
    </section>
  );
}
