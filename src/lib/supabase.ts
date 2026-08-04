import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Review, ReviewInsert } from '../types/review';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

export async function fetchApprovedReviews(limit?: number): Promise<Review[]> {
  if (!supabase) return [];

  let query = supabase
    .from('reviews')
    .select('id, name, company, rating, message, status, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Review[];
}

export async function submitReview(input: ReviewInsert): Promise<void> {
  if (!supabase) {
    throw new Error('Reviews are not connected yet. Add your Supabase keys to .env.');
  }

  const { error } = await supabase.from('reviews').insert({
    name: input.name.trim(),
    company: input.company?.trim() || null,
    rating: input.rating,
    message: input.message.trim(),
    status: 'pending',
  });

  if (error) throw error;
}
