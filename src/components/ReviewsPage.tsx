import { useEffect, useState } from 'react';
import { fetchApprovedReviews, isSupabaseConfigured } from '../lib/supabase';
import type { Review } from '../types/review';
import { ReviewForm } from './reviews/ReviewForm';
import { ReviewsCarousel } from './reviews/ReviewsCarousel';

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchApprovedReviews();
      setReviews(data);
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unable to load reviews.';
      setError(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReviews();
  }, []);

  return (
    <section className="min-h-screen bg-surface px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-surface-dark sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
            Reviews
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink dark:text-white sm:text-5xl">
            What clients say
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted dark:text-slate-400">
            Share your experience with us—we&rsquo;d love to hear how it went.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="mb-12 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            Reviews are almost ready. Add your Supabase URL and anon key to a local{' '}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-white/10">.env</code> file, then run the
            SQL in <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-white/10">supabase/reviews.sql</code>.
          </div>
        ) : null}

        <div className="mb-16">
          {loading ? (
            <p className="text-center text-sm text-ink-muted dark:text-slate-400">Loading reviews...</p>
          ) : error ? (
            <p className="text-center text-sm text-red-700 dark:text-red-400">{error}</p>
          ) : reviews.length === 0 ? (
            <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              No reviews yet. Be the first to share your experience below.
            </p>
          ) : (
            <ReviewsCarousel reviews={reviews} />
          )}
        </div>

        <div className="border-t border-slate-200 pt-12 dark:border-white/10">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">
              Share your experience with us
            </h2>
            <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
              Tell others what it was like working with B&amp;C Software &amp; Web.
            </p>
          </div>
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
