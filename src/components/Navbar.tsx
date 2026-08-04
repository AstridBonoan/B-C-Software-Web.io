import { useEffect, useState } from 'react';
import { BRAND } from '../data/site';
import { Button } from './ui/Button';

interface NavbarProps {
  pathname: string;
  onNavigate: (path: string) => void;
}

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/my-work', label: 'Our Work' },
  { path: '/demos', label: 'Demos' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
] as const;

export function Navbar({ pathname, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoMarkSrc = `${import.meta.env.BASE_URL}logo-mark-light.png`;

  const closeMenu = () => setIsMenuOpen(false);

  const goToHome = () => {
    closeMenu();
    if (pathname !== '/') {
      onNavigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (path: string) => {
    onNavigate(path);
    closeMenu();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const navLinkClass = (path: string) =>
    'block w-full rounded-lg px-4 py-3.5 text-left text-base font-medium transition-colors ' +
    (pathname === path
      ? 'bg-slate-100 text-ink'
      : 'text-ink hover:bg-slate-50');

  return (
    <>
      <header className="fixed top-0 z-50 w-full nav-bar">
        <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-3 px-4 sm:h-16 sm:px-5 lg:gap-4 lg:px-6 xl:px-8">
          <button
            type="button"
            onClick={goToHome}
            className="flex min-w-0 shrink-0 items-center gap-2"
          >
            <img src={logoMarkSrc} alt="" className="h-8 w-auto shrink-0" />
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink whitespace-nowrap lg:inline">
              B&amp;C Software
            </span>
            <span className="sr-only">{BRAND.name}</span>
          </button>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center md:flex"
            aria-label="Main"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-0 lg:gap-x-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => onNavigate(link.path)}
                    className={
                      'whitespace-nowrap rounded-md px-2 py-1.5 text-sm font-medium transition-colors lg:px-2.5 lg:text-[15px] xl:px-3 ' +
                      (isActive ? 'text-ink' : 'text-ink-muted hover:text-ink')
                    }
                  >
                    {link.label}
                    <span
                      className={
                        'mt-1 block h-px w-full ' +
                        (isActive ? 'bg-brand-600' : 'bg-transparent')
                      }
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button
              onClick={() => onNavigate('/contact')}
              className="hidden px-3 py-2 text-xs md:inline-flex lg:px-4 lg:text-sm"
            >
              Start a Project
            </Button>

            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
              className="inline-flex rounded-lg border border-slate-200 p-2.5 text-ink transition-colors hover:bg-slate-50 md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={isMenuOpen ? 0 : -1}
        />

        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <img src={logoMarkSrc} alt="" className="h-8 w-auto" />
              <span className="font-display font-semibold text-ink">Menu</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-ink-muted hover:bg-slate-100"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <button type="button" onClick={() => handleNavigate(link.path)} className={navLinkClass(link.path)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-slate-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button onClick={() => handleNavigate('/contact')} className="w-full">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
