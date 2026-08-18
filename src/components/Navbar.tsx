import { useEffect, useState } from 'react';
import { BRAND } from '../data/site';
import { Button } from './ui/Button';

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
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
  { path: '/cost-estimator', label: 'Cost Estimator' },
  { path: '/contact', label: 'Contact' },
] as const;

export function Navbar({ isDark, onThemeToggle, pathname, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoMarkSrc = `${import.meta.env.BASE_URL}logo-mark-${isDark ? 'dark' : 'light'}.png?v=3`;

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
      ? 'bg-slate-100 text-ink dark:bg-white/10 dark:text-white'
      : 'text-ink hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-white/5');

  return (
    <>
      <header className="fixed top-0 z-50 w-full nav-bar">
        <div className="mx-auto flex min-h-14 max-w-[90rem] items-center gap-3 px-4 py-2 sm:min-h-16 sm:px-5 lg:gap-4 lg:px-6 xl:px-8">
          <button
            type="button"
            onClick={goToHome}
            className="flex shrink-0 items-center gap-2"
          >
            <img src={logoMarkSrc} alt="" className="h-9 w-auto shrink-0" />
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
                      'whitespace-nowrap rounded-md px-1.5 py-1.5 text-[13px] font-medium transition-colors lg:px-2 lg:text-sm xl:px-2.5 xl:text-[15px] ' +
                      (isActive
                        ? 'text-ink dark:text-white'
                        : 'text-ink-muted hover:text-ink dark:text-slate-400 dark:hover:text-white')
                    }
                  >
                    {link.label}
                    <span
                      className={
                        'mt-1 block h-px w-full ' +
                        (isActive ? 'bg-brand-600 dark:bg-brand-400' : 'bg-transparent')
                      }
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              onClick={onThemeToggle}
              type="button"
              className="hidden rounded-lg border border-slate-200 p-2.5 text-ink-muted transition-colors hover:bg-slate-50 hover:text-ink dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 md:flex"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 13.536l.707.707a1 1 0 001.414-1.414l-.707-.707zm2.828 2.829a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <Button
              onClick={() => onNavigate('/contact')}
              className="hidden px-3 py-2 text-xs md:inline-flex lg:px-4 lg:text-sm"
            >
              Start a Project
            </Button>

            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
              className="inline-flex rounded-lg border border-slate-200 p-2.5 text-ink transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10 md:hidden"
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
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-ink ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <img src={logoMarkSrc} alt="" className="h-9 w-auto" />
              <span className="font-display font-semibold text-ink dark:text-white">Menu</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-ink-muted hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
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

          <div className="space-y-3 border-t border-slate-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white/10">
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            >
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
            <Button onClick={() => handleNavigate('/contact')} className="w-full">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
