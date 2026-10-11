-- Migration 004: Add diagnostic_tier and is_demo_sample to scan_history
-- Description: Preserves diagnostic provenance and demo flags across cloud-synchronized scan history.
-- Date: 2026-10-10
-- Safety: Fully backward compatible. Non-destructive to existing rows.
-- Supported Tiers: Because PDDS currently lacks an authenticated server-side agronomist
-- review workflow, 'expert_confirmed' is strictly prohibited by database constraint.

alter table public.scan_history
  add column if not exists is_demo_sample boolean not null default false,
  add column if not exists diagnostic_tier text not null default 'legacy_or_unknown';

-- Add check constraint for valid diagnostic tiers (strictly currently supported tiers)
alter table public.scan_history
  drop constraint if exists check_diagnostic_tier;

alter table public.scan_history
  add constraint check_diagnostic_tier
  check (diagnostic_tier in (
    'ai_preliminary_hypothesis',
    'demonstration_sample',
    'legacy_or_unknown'
  ));

comment on column public.scan_history.diagnostic_tier is 
  'Provenance tier: ai_preliminary_hypothesis, demonstration_sample, or legacy_or_unknown. expert_confirmed is strictly prohibited until a verified server workflow is implemented.';
comment on column public.scan_history.is_demo_sample is 
  'Flag indicating whether scan was generated from sample demonstration test';
