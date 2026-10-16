-- Migration 006: Create scan_history + private crop-scans storage bucket
-- Description: Migrations 001-004 (crops/diseases/treatments/app_users/scan_history +
--              RLS + storage bucket) were written against this repo's own schema, but were
--              never actually applied to the live "pdds" Supabase project
--              (magxfdmhnanomqpxwzjv) — it was provisioned with an entirely different,
--              unrelated generic app schema instead (users/profiles/subscriptions/
--              usage_tracking/diseases/detections/plants/chat_sessions), confirmed to hold
--              no real user data (every table empty except `diseases` with 8 seed rows and
--              `plants` with 5).
--
--              Consequence for our actual running app: supabase.from('scan_history').insert
--              (src/lib/storage.ts) silently failed on every real scan (relation does not
--              exist), so cloud history sync never worked at all — gracefully, with no
--              crash and no data loss (local-only save still succeeded), but silently.
--
--              This migration creates ONLY `scan_history` and the `crop-scans` storage
--              bucket — the two things the app's runtime code actually reads/writes
--              (confirmed by grepping every supabase.from(...) call in src/). It does NOT
--              touch, rename, or drop any of the pre-existing tables: `crop_detected_id`/
--              `disease_detected_id` are deliberately plain text columns with NO foreign
--              key to a `crops`/`diseases` table, specifically to avoid colliding with the
--              live project's existing (and differently-shaped) `public.diseases` table.
--              ResultScreen.tsx already has a full graceful local-catalog fallback when a
--              remote crops/diseases read returns nothing, so recreating those tables here
--              would add real risk (dropping someone else's seeded rows) for zero
--              functional benefit.
-- Date: 2026-10-16

-- 1. scan_history table, including the diagnostic_tier/is_demo_sample columns migration 004
--    would have added, baked in from the start since there is no earlier version of this
--    table on this project to migrate forward from.
create table if not exists public.scan_history (
  id text primary key default 'scan_' || extract(epoch from now())::text,
  user_id text default null,
  image_url text default null,
  crop_detected_id text default null,
  disease_detected_id text default null,
  confidence_score numeric(4,2) default null,
  urgency_color text default null check (urgency_color in ('red', 'yellow', 'green')),
  is_demo_sample boolean not null default false,
  diagnostic_tier text not null default 'legacy_or_unknown'
    check (diagnostic_tier in ('ai_preliminary_hypothesis', 'demonstration_sample', 'legacy_or_unknown')),
  created_at timestamptz not null default now()
);

comment on column public.scan_history.diagnostic_tier is
  'Provenance tier: ai_preliminary_hypothesis, demonstration_sample, or legacy_or_unknown. expert_confirmed is strictly prohibited until a verified server workflow is implemented.';
comment on column public.scan_history.is_demo_sample is
  'Flag indicating whether scan was generated from sample demonstration test';
comment on column public.scan_history.crop_detected_id is
  'Text catalog ID (e.g. crop-rice) matching this repo''s bundled TypeScript knowledge catalog. Deliberately NOT a foreign key — the catalog is the local bundle, not a database table, on this project.';
comment on column public.scan_history.disease_detected_id is
  'Text catalog ID (e.g. disease-rice-blast). Deliberately NOT a foreign key, for the same reason as crop_detected_id.';

-- 2. Row-Level Security: strict owner isolation, matching migration 002's intent.
alter table public.scan_history enable row level security;

drop policy if exists "Users can select own scan_history" on public.scan_history;
create policy "Users can select own scan_history"
  on public.scan_history
  for select
  using (auth.uid() is not null and auth.uid()::text = user_id);

drop policy if exists "Users can insert own scan_history" on public.scan_history;
create policy "Users can insert own scan_history"
  on public.scan_history
  for insert
  with check (auth.uid() is not null and auth.uid()::text = user_id);

drop policy if exists "Users can update own scan_history" on public.scan_history;
create policy "Users can update own scan_history"
  on public.scan_history
  for update
  using (auth.uid() is not null and auth.uid()::text = user_id)
  with check (auth.uid() is not null and auth.uid()::text = user_id);

drop policy if exists "Users can delete own scan_history" on public.scan_history;
create policy "Users can delete own scan_history"
  on public.scan_history
  for delete
  using (auth.uid() is not null and auth.uid()::text = user_id);

revoke all on table public.scan_history from anon;
grant select, insert, update, delete on table public.scan_history to authenticated;

create index if not exists scan_history_user_id_idx on public.scan_history (user_id);

-- 3. Private crop-scans storage bucket + owner-isolated policies, matching migration 003.
insert into storage.buckets (id, name, public)
values ('crop-scans', 'crop-scans', false)
on conflict (id) do update set public = false;

drop policy if exists "Users can upload own crop scans" on storage.objects;
create policy "Users can upload own crop scans"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can select own crop scans" on storage.objects;
create policy "Users can select own crop scans"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete own crop scans" on storage.objects;
create policy "Users can delete own crop scans"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can update own crop scans" on storage.objects;
create policy "Users can update own crop scans"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );
