-- Migration 007: Create client_errors table for lightweight client-side error logging
-- Description: Before this, an uncaught error in a farmer's browser was invisible to us --
--              no crash reporting, no monitoring, nothing. This adds a minimal, zero-cost
--              (no third-party service) write-only logging table: the app's ErrorBoundary and
--              global window.onerror/unhandledrejection handlers (see src/lib/errorLogging.ts)
--              insert a row here on an uncaught error, so real failures are visible to the
--              team instead of silently breaking a farmer's session with no trace.
--
--              Write-only by design: clients (anon or authenticated) may INSERT, never
--              SELECT/UPDATE/DELETE their own or anyone else's error rows -- this is a report-in
--              box, not a readable log, and reading it requires the dashboard / service role.
-- Date: 2026-10-16

create table if not exists public.client_errors (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id text default null,
  message text not null,
  stack text default null,
  source text default null,
  url text default null,
  user_agent text default null,
  context jsonb default null
);

comment on table public.client_errors is
  'Write-only client-side error log from ErrorBoundary / window.onerror / unhandledrejection. Clients can insert but never read; inspect via the Supabase dashboard or service role.';
comment on column public.client_errors.source is
  'Where the error was caught: "error_boundary", "window_onerror", or "unhandled_rejection".';

alter table public.client_errors enable row level security;

drop policy if exists "Anyone can report a client error" on public.client_errors;
create policy "Anyone can report a client error"
  on public.client_errors
  for insert
  to anon, authenticated
  with check (true);

revoke select, update, delete on table public.client_errors from anon, authenticated;
grant insert on table public.client_errors to anon, authenticated;

create index if not exists client_errors_created_at_idx on public.client_errors (created_at desc);
