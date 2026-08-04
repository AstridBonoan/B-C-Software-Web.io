import type { Review } from '../../types/review';

function formatReviewDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  truncated?: boolean;
  onReadFull?: (review: Review) => void;
}

export function ReviewCard({ review, truncated = false, onReadFull }: ReviewCardProps) {
  const initial = review.name.trim().charAt(0).toUpperCase() || 'R';
  const preview =
    truncated && review.message.length > 110
      ? `${review.message.slice(0, 110).trimEnd()}…`
      : review.message;
  const dateLabel = formatReviewDate(review.created_at);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white dark:bg-white dark:text-ink"
          aria-hidden
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <StarRow rating={review.rating} />
          <p className="mt-3 text-base leading-relaxed text-ink-muted dark:text-slate-300">
            &ldquo;{preview}&rdquo;
          </p>
          {truncated && onReadFull && review.message.length > 110 ? (
            <button
              type="button"
              onClick={() => onReadFull(review)}
              className="mt-3 text-sm font-semibold text-ink underline-offset-2 hover:underline dark:text-white"
            >
              Read full review
              <span aria-hidden>→</span>
            </button>
          ) : null}
          <p className="mt-5 text-sm font-medium text-ink dark:text-white">
            {review.name}
            {dateLabel ? (
              <span className="font-normal text-ink-muted dark:text-slate-400"> – {dateLabel}</span>
            ) : null}
          </p>
          {review.company ? (
            <p className="mt-0.5 text-sm text-ink-muted dark:text-slate-400">{review.company}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
