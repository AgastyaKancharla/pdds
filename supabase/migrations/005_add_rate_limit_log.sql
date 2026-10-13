-- Migration 005: Rate-limit log for the detect-crop edge function
-- Description: Backs a simple per-user cooldown on AI scan requests, so one
-- user (or a bot) cannot exhaust the shared OpenRouter free-tier quota or
-- run up costs on a paid model. Written and read only by the edge function
-- using the service-role key, which bypasses RLS entirely -- RLS is still
-- enabled here with zero policies so no anon/authenticated client can ever
-- read or write it directly.
-- Date: 2026-10-13

create table if not exists public.rate_limit_log (
  id bigint generated always as identity primary key,
  user_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_log_user_created
  on public.rate_limit_log (user_id, created_at desc);

alter table public.rate_limit_log enable row level security;
-- Intentionally no policies: only the service role (server-side) can touch this table.

comment on table public.rate_limit_log is
  'Per-user AI-scan request timestamps, used by the detect-crop edge function to enforce a simple rate limit. Not readable or writable by anon/authenticated clients.';
