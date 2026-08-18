import { ESTIMATOR_COPY } from '../data/estimator';
import { EstimatorWizard } from './estimator/EstimatorWizard';
import { PageShell } from './ui/PageShell';

interface CostEstimatorPageProps {
  onQuote: (payload: { subject: string; message: string }) => void;
}

export function CostEstimatorPage({ onQuote }: CostEstimatorPageProps) {
  return (
    <PageShell
      eyebrow={ESTIMATOR_COPY.eyebrow}
      title={ESTIMATOR_COPY.title}
      description={ESTIMATOR_COPY.description}
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-display text-lg font-semibold text-ink dark:text-white">
          {ESTIMATOR_COPY.positioning}
        </p>
        <p className="mb-10 text-base leading-relaxed text-ink-muted dark:text-slate-400">
          {ESTIMATOR_COPY.customBuilt}
        </p>
        <EstimatorWizard onQuote={onQuote} />
      </div>
    </PageShell>
  );
}
