-- Run this in the Supabase SQL Editor (Project → SQL → New query).
-- Reviews are submitted as "pending" and only appear publicly after you set status to "approved".

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  company text check (company is null or char_length(trim(company)) <= 120),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- Anyone can submit a review (always starts as pending).
drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews"
  on public.reviews
  for insert
  to anon, authenticated
  with check (status = 'pending');

-- Anyone can read approved reviews only.
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');

-- No public update/delete: approve or reject reviews in the Supabase Table Editor
-- (change status from pending → approved or rejected).
