interface ChoiceCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
}

export function ChoiceCard({ title, description, selected, onSelect, badge }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        'flex h-full w-full flex-col rounded-lg border p-4 text-left transition-colors sm:p-5 ' +
        (selected
          ? 'border-ink bg-white dark:border-white dark:bg-white/[0.06]'
          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-base font-semibold text-ink dark:text-white">{title}</span>
        {badge ? (
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
            {badge}
          </span>
        ) : null}
      </div>
      {description ? (
        <span className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{description}</span>
      ) : null}
    </button>
  );
}

interface CheckOptionProps {
  title: string;
  checked: boolean;
  included?: boolean;
  onToggle: () => void;
}

export function CheckOption({ title, checked, included = false, onToggle }: CheckOptionProps) {
  if (included) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
        <span className="text-sm font-medium text-ink dark:text-white">{title}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
          Included
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={
        'flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors ' +
        (checked
          ? 'border-ink bg-white dark:border-white dark:bg-white/[0.06]'
          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25')
      }
    >
      <span className="text-sm font-medium text-ink dark:text-white">{title}</span>
      <span
        className={
          'flex h-5 w-5 shrink-0 items-center justify-center rounded border ' +
          (checked
            ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink'
            : 'border-slate-300 dark:border-white/25')
        }
        aria-hidden
      >
        {checked ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </span>
    </button>
  );
}
