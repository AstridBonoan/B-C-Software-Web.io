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
  { path: '/my-work', label: 'My Work' },
  { path: '/demos', label: 'Demos' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
] as const;

export function Navbar({ isDark, onThemeToggle, pathname, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoMarkSrc = `${import.meta.env.BASE_URL}logo-mark-${isDark ? 'dark' : 'light'}.png`;

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
    'block w-full rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors ' +
    (pathname === path
      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
      : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10');

  return (
    <>
      <header className="fixed top-0 z-50 w-full nav-glass">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <button type="button" onClick={goToHome} className="flex min-w-0 shrink items-center gap-2">
            <img src={logoMarkSrc} alt="" className="h-8 w-auto sm:h-9" />
            <span className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
              {BRAND.name}
            </span>
          </button>

          <nav className="hidden items-center gap-6 lg:gap-7 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className={
                  'text-sm font-medium transition-colors ' +
                  (pathname === link.path
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white')
                }
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={onThemeToggle}
              type="button"
              className="hidden rounded-xl border border-slate-200/80 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 md:flex"
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
              className="hidden py-2.5 text-sm md:inline-flex"
            >
              Start a Project
            </Button>

            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
              className="inline-flex rounded-xl border border-slate-200/80 p-2.5 text-slate-900 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10 md:hidden"
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

      {/* Mobile menu — rendered outside header so it can use full viewport height */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
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
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-white/10 dark:bg-slate-950 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <img src={logoMarkSrc} alt="" className="h-8 w-auto" />
              <span className="font-semibold text-slate-900 dark:text-white">Menu</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
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
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
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
