import { useEffect, useState } from 'react';
import { fetchApprovedReviews, isSupabaseConfigured } from '../../lib/supabase';
import type { Review } from '../../types/review';
import { ReviewsCarousel } from '../reviews/ReviewsCarousel';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

interface ReviewsSectionProps {
  onNavigate: (path: string) => void;
}

export function ReviewsSection({ onNavigate }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchApprovedReviews(12);
        if (!cancelled) setReviews(data);
      } catch {
        if (!cancelled) setReviews([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="section-padding border-y border-slate-200/80 bg-surface"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reviews"
          title="Trusted by growing businesses"
          description="Real feedback from clients after launch—published only after we review each submission."
          align="left"
        />

        {loading ? (
          <p className="text-sm text-ink-muted">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <ReviewsCarousel reviews={reviews} />
        ) : (
          <p id="reviews-heading" className="max-w-xl text-base leading-relaxed text-ink-muted">
            Client reviews will appear here once approved. If you&rsquo;ve worked with us, we&rsquo;d
            love to hear how it went.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => onNavigate('/reviews')}>Read all reviews</Button>
          <Button variant="secondary" onClick={() => onNavigate('/reviews')}>
            Write a review
          </Button>
        </div>
      </div>
    </section>
  );
}
