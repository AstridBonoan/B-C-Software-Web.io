import { useState, type FormEvent } from 'react';
import { submitReview } from '../../lib/supabase';
import { Button } from '../ui/Button';

interface ReviewFormProps {
  onSubmitted?: () => void;
}

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'] as const;

export function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  const displayRating = hoverRating || rating;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (rating < 1) {
      setError('Please choose a star rating.');
      return;
    }
    if (name.trim().length < 1) {
      setError('Please enter your name.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please write a bit more about your experience.');
      return;
    }

    setSubmitting(true);

    try {
      await submitReview({ name, company, rating, message });
      setSucceeded(true);
      setName('');
      setCompany('');
      setRating(0);
      setHoverRating(0);
      setMessage('');
      onSubmitted?.();
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(text);
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-xl font-semibold text-ink dark:text-white">Thanks for your review</p>
        <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
          Thanks for sharing—we appreciate your feedback.
        </p>
        <button
          type="button"
          onClick={() => setSucceeded(false)}
          className="mt-6 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8" noValidate>
      <div className="text-center">
        <p className="text-sm font-medium text-ink dark:text-white">Rate your experience</p>
        <div
          className="mt-3 flex items-center justify-center gap-1"
          role="radiogroup"
          aria-label="Star rating"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((value) => {
            const filled = value <= displayRating;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} star${value === 1 ? '' : 's'}`}
                onMouseEnter={() => setHoverRating(value)}
                onFocus={() => setHoverRating(value)}
                onBlur={() => setHoverRating(0)}
                onClick={() => setRating(value)}
                className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <svg
                  className={`h-9 w-9 sm:h-10 sm:w-10 ${
                    filled ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            );
          })}
        </div>
        <p className="mt-2 min-h-[1.25rem] text-sm text-ink-muted dark:text-slate-400">
          {displayRating > 0 ? ratingLabels[displayRating] : ' '}
        </p>
      </div>

      <div>
        <textarea
          id="review-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-base text-ink placeholder:text-slate-400 focus:border-ink focus:outline-none focus:ring-0 dark:border-white/20 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
          placeholder="Share details of your own experience at this place"
        />
      </div>

      <div className="space-y-4">
        <input
          id="review-name"
          name="name"
          type="text"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-base text-ink placeholder:text-slate-400 focus:border-ink focus:outline-none focus:ring-0 dark:border-white/20 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
          placeholder="Your name"
          autoComplete="name"
        />
        <input
          id="review-company"
          name="company"
          type="text"
          maxLength={120}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-base text-ink placeholder:text-slate-400 focus:border-ink focus:outline-none focus:ring-0 dark:border-white/20 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
          placeholder="Business name (optional)"
          autoComplete="organization"
        />
      </div>

      {error ? <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p> : null}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={submitting} className="min-w-[8rem]">
          {submitting ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  );
}
