-- Migration 005: Per-user daily AI scan quota
-- Description: The detect-crop Edge Function previously accepted any request whose
--              Authorization header merely *looked* like a bearer token, and applied no
--              per-user limit. Two consequences, both of which block real-world use:
--                1. The server-side AI provider key could be spent by anyone who could
--                   guess the function URL.
--                2. The upstream free tier has a hard daily cap, so a single heavy user
--                   (or a script) could exhaust the day's capacity for every farmer.
--              This adds a per-user, per-day counter claimed atomically before each
--              upstream AI call.
-- Date: 2026-10-13

-- 1. Quota ledger. One row per user per local day.
create table if not exists public.ai_scan_quota (
  user_id uuid not null references auth.users (id) on delete cascade,
  quota_date date not null,
  scan_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, quota_date),
  constraint ai_scan_quota_count_non_negative check (scan_count >= 0)
);

comment on table public.ai_scan_quota is
  'Per-user daily counter of AI diagnosis calls. Written only through claim_ai_scan_slot / release_ai_scan_slot, never directly by clients.';

-- 2. Row-Level Security.
-- A farmer may read their own usage (so the UI can show "N scans left today"), but may
-- never write it. All writes go through the SECURITY DEFINER functions below, which are the
-- only place the limit is enforced — a client that could UPDATE this table directly could
-- simply reset its own counter.
alter table public.ai_scan_quota enable row level security;

drop policy if exists "Users can read own ai_scan_quota" on public.ai_scan_quota;
create policy "Users can read own ai_scan_quota"
  on public.ai_scan_quota
  for select
  using (auth.uid() is not null and auth.uid() = user_id);

-- No insert/update/delete policy is defined on purpose: with RLS enabled and no permissive
-- policy, direct client writes are refused.

revoke all on table public.ai_scan_quota from anon, authenticated;
grant select on table public.ai_scan_quota to authenticated;

-- 3. Atomic slot claim.
-- Returns jsonb: { allowed, scans_used, daily_limit, scans_remaining }.
-- The limit is enforced inside a single statement, so two concurrent requests cannot both
-- read "one slot left" and both proceed: the ON CONFLICT ... WHERE predicate makes the
-- increment itself conditional, and a blocked increment returns zero rows.
create or replace function public.claim_ai_scan_slot(p_daily_limit integer)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  -- Day boundary in IST rather than UTC: the users are in Andhra Pradesh, and a quota that
  -- reset at 05:30 local time would look arbitrary to them.
  v_today date := (now() at time zone 'Asia/Kolkata')::date;
  v_used integer;
begin
  if v_user_id is null then
    raise exception 'authentication required' using errcode = '28000';
  end if;

  if p_daily_limit is null or p_daily_limit <= 0 then
    return jsonb_build_object(
      'allowed', false,
      'scans_used', 0,
      'daily_limit', coalesce(p_daily_limit, 0),
      'scans_remaining', 0
    );
  end if;

  insert into public.ai_scan_quota as q (user_id, quota_date, scan_count, updated_at)
  values (v_user_id, v_today, 1, now())
  on conflict (user_id, quota_date) do update
    set scan_count = q.scan_count + 1,
        updated_at = now()
    where q.scan_count < p_daily_limit
  returning scan_count into v_used;

  if v_used is null then
    -- The increment was blocked, so the user is already at the cap. Report the current
    -- value rather than the would-be one.
    select scan_count into v_used
      from public.ai_scan_quota
     where user_id = v_user_id and quota_date = v_today;

    return jsonb_build_object(
      'allowed', false,
      'scans_used', coalesce(v_used, 0),
      'daily_limit', p_daily_limit,
      'scans_remaining', 0
    );
  end if;

  return jsonb_build_object(
    'allowed', true,
    'scans_used', v_used,
    'daily_limit', p_daily_limit,
    'scans_remaining', greatest(p_daily_limit - v_used, 0)
  );
end;
$$;

comment on function public.claim_ai_scan_slot(integer) is
  'Atomically claims one daily AI-scan slot for the calling user. Returns allowed=false when the cap is reached.';

-- 4. Slot refund.
-- A claimed slot is consumed before the upstream AI call, so an upstream failure (the free
-- tier is rate-limited and intermittently unavailable) would otherwise cost the farmer part
-- of their daily allowance for a diagnosis they never received. The Edge Function refunds
-- the slot when the upstream call fails.
create or replace function public.release_ai_scan_slot()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_today date := (now() at time zone 'Asia/Kolkata')::date;
begin
  if v_user_id is null then
    raise exception 'authentication required' using errcode = '28000';
  end if;

  -- greatest(...) keeps the counter from going negative if a refund is ever issued twice.
  update public.ai_scan_quota
     set scan_count = greatest(scan_count - 1, 0),
         updated_at = now()
   where user_id = v_user_id and quota_date = v_today;
end;
$$;

comment on function public.release_ai_scan_slot() is
  'Refunds one daily AI-scan slot for the calling user, used when the upstream AI call fails.';

-- 5. Execution grants. Both functions derive the user from auth.uid(), so a caller can only
-- ever affect their own row regardless of what they pass.
revoke all on function public.claim_ai_scan_slot(integer) from public, anon;
revoke all on function public.release_ai_scan_slot() from public, anon;
grant execute on function public.claim_ai_scan_slot(integer) to authenticated;
grant execute on function public.release_ai_scan_slot() to authenticated;

-- 6. Housekeeping index for pruning old ledger rows.
create index if not exists ai_scan_quota_quota_date_idx on public.ai_scan_quota (quota_date);
