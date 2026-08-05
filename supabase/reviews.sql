-- Run this in the Supabase SQL Editor (Project → SQL → New query).
--
-- Status uses a Postgres ENUM so the Table Editor shows a dropdown:
--   pending  → waiting for your review (default for new submissions)
--   approved → appears publicly on the site
--   rejected → hidden; kept for your records
--
-- Safe to re-run: creates the enum/table if missing, or upgrades an existing
-- text "status" column to the dropdown enum.

-- 1) Enum for the Table Editor dropdown
do $$
begin
  create type public.review_status as enum ('pending', 'approved', 'rejected');
exception
  when duplicate_object then null;
end $$;

-- 2) Table (fresh installs)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  company text check (company is null or char_length(trim(company)) <= 120),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  status public.review_status not null default 'pending'::public.review_status,
  created_at timestamptz not null default now()
);

-- 3) Upgrade existing text status → enum dropdown (no-op if already enum)
--    Policies that reference "status" must be dropped before ALTER TYPE.
do $$
declare
  status_udt text;
begin
  select c.udt_name
    into status_udt
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'reviews'
    and c.column_name = 'status';

  if status_udt is null then
    return;
  end if;

  -- Already the enum — nothing to do
  if status_udt = 'review_status' then
    return;
  end if;

  drop policy if exists "Public can submit reviews" on public.reviews;
  drop policy if exists "Public can read approved reviews" on public.reviews;

  alter table public.reviews drop constraint if exists reviews_status_check;

  alter table public.reviews
    alter column status drop default;

  alter table public.reviews
    alter column status type public.review_status
    using trim(lower(status::text))::public.review_status;

  alter table public.reviews
    alter column status set default 'pending'::public.review_status;

  alter table public.reviews
    alter column status set not null;
end $$;

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- Anyone can submit a review (always starts as pending).
drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews"
  on public.reviews
  for insert
  to anon, authenticated
  with check (status = 'pending'::public.review_status);

-- Anyone can read approved reviews only.
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved'::public.review_status);

-- No public update/delete.
-- Approve in Table Editor: open Reviews → click status → pick Approved from the dropdown.
