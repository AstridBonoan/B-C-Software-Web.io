import { ESTIMATOR_COPY } from '../../data/estimator';
import type { EstimateResult } from '../../lib/calculateEstimate';
import { Button } from '../ui/Button';

interface EstimateResultsProps {
  result: EstimateResult;
  onQuote: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export function EstimateResults({ result, onQuote, onRestart, onBack }: EstimateResultsProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
        {ESTIMATOR_COPY.resultsHeading}
      </p>
      <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
        {result.displayPrice}
      </p>
      {result.supportingPrice ? (
        <p className="mt-2 text-lg font-medium text-ink-muted dark:text-slate-400">{result.supportingPrice}</p>
      ) : null}
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted dark:text-slate-400">
        {ESTIMATOR_COPY.estimateNote}
      </p>

      {result.customQuote && result.customQuoteNote ? (
        <p className="mt-4 border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-ink dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          {result.customQuoteNote}
        </p>
      ) : null}

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-slate-400">
            Project Type
          </h3>
          <p className="mt-2 font-display text-lg font-semibold text-ink dark:text-white">{result.packageLabel}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-slate-400">
            Recurring
          </h3>
          <p className="mt-2 text-sm text-ink dark:text-slate-200">
            Hosting: {result.hostingDisplay}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-slate-400">
          Selected Features
        </h3>
        <ul className="mt-3 space-y-2">
          {result.selectedFeatures.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted dark:text-slate-300">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600 dark:bg-brand-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {result.customNotes.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-slate-400">
            Additional notes
          </h3>
          <ul className="mt-3 space-y-2">
            {result.customNotes.map((note) => (
              <li key={note} className="text-sm leading-relaxed text-ink-muted dark:text-slate-300">
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10 border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
        <p className="font-semibold text-ink dark:text-white">{ESTIMATOR_COPY.disclaimerTitle}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
          {ESTIMATOR_COPY.disclaimerBody}
        </p>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button variant="secondary" onClick={onRestart}>
            Start over
          </Button>
        </div>
        <Button onClick={onQuote} className="sm:min-w-[12rem]">
          Get Your Official Quote
        </Button>
      </div>
    </div>
  );
}
