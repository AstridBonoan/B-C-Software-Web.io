interface EstimatorProgressProps {
  current: number;
  total: number;
  label: string;
}

export function EstimatorProgress({ current, total, label }: EstimatorProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-ink dark:text-white">{label}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-slate-400">
          Step {current} of {total}
        </p>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Step ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300 dark:bg-brand-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
