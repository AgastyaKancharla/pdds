-- Migration 002: Secure scan_history Row-Level Security (RLS)
-- Description: Replace insecure 'using (true)' policies with authenticated user isolation.
-- Date: 2026-10-09

-- 1. Drop insecure policies from 001_initial_schema.sql
drop policy if exists "Users can read own scan_history" on public.scan_history;
drop policy if exists "Users can insert scan_history" on public.scan_history;
drop policy if exists "Users can update own scan_history" on public.scan_history;
drop policy if exists "Users can delete own scan_history" on public.scan_history;

-- 2. Enforce Row-Level Security
alter table public.scan_history enable row level security;

-- 3. Strict owner isolation policies
-- Only authenticated users (including anonymous auth sessions) can select their own scans.
create policy "Users can select own scan_history"
  on public.scan_history
  for select
  using (
    auth.uid() is not null 
    and auth.uid()::text = user_id
  );

-- Only authenticated users can insert scans matching their own authenticated user ID.
create policy "Users can insert own scan_history"
  on public.scan_history
  for insert
  with check (
    auth.uid() is not null 
    and auth.uid()::text = user_id
  );

-- Only scan owners can update their own scans.
create policy "Users can update own scan_history"
  on public.scan_history
  for update
  using (
    auth.uid() is not null 
    and auth.uid()::text = user_id
  )
  with check (
    auth.uid() is not null 
    and auth.uid()::text = user_id
  );

-- Only scan owners can delete their own scans.
create policy "Users can delete own scan_history"
  on public.scan_history
  for delete
  using (
    auth.uid() is not null 
    and auth.uid()::text = user_id
  );
