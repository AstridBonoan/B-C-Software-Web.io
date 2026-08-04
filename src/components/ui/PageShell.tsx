import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

interface PageShellProps {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageShell({ children, eyebrow, title, description }: PageShellProps) {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-16 transition-colors duration-300 dark:bg-surface-dark sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="left" />
        {children}
      </div>
    </div>
  );
}
