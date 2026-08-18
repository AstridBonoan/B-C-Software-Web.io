import { BRAND, SERVICES } from '../data/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const logoMarkSrc = `${import.meta.env.BASE_URL}logo-mark-dark.png?v=3`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logoMarkSrc} alt="" className="h-10 w-auto" />
              <span className="font-display text-lg font-semibold text-white">{BRAND.name}</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold tracking-wide text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Home', '/'],
                ['Services', '/services'],
                ['Our Work', '/my-work'],
                ['Demos', '/demos'],
                ['Reviews', '/reviews'],
                ['Pricing', '/pricing'],
                ['Cost Estimator', '/cost-estimator'],
                ['About', '/about'],
                ['Contact', '/contact'],
              ].map(([label, path]) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(path)}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold tracking-wide text-white">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {SERVICES.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold tracking-wide text-white">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Instagram {BRAND.instagramHandle}
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="mt-5 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-slate-100"
            >
              Start a project
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>&copy; {year} {BRAND.name}. All rights reserved.</p>
          <p>Built for businesses that deserve a modern digital presence.</p>
        </div>
      </div>
    </footer>
  );
}
