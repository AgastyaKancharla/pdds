-- Migration 004 Rollback: Non-destructive rollback for diagnostic_tier and is_demo_sample
-- Date: 2026-10-10
-- SAFETY GUARANTEE: NON-DESTRUCTIVE ROLLBACK ONLY.
--
-- DO NOT DROP COLUMNS. Dropping columns permanently destroys all stored provenance metadata
-- and demo sample audit history for existing rows.
--
-- This rollback relaxes constraints to allow legacy application versions to insert or update
-- rows without requiring diagnostic provenance, while preserving all existing data intact.

-- 1. Drop check constraint on diagnostic_tier to allow any legacy tier value or null
alter table public.scan_history
  drop constraint if exists check_diagnostic_tier;

-- 2. Relax NOT NULL constraints so legacy inserts without provenance fields succeed
alter table public.scan_history
  alter column diagnostic_tier drop not null,
  alter column is_demo_sample drop not null;

-- 3. Relax default values if desired (keep default or drop default; dropping default prevents implicit tier assignment)
alter table public.scan_history
  alter column diagnostic_tier drop default,
  alter column is_demo_sample drop default;

comment on column public.scan_history.diagnostic_tier is 
  'Provenance tier (relaxed during rollback 004: column preserved to prevent permanent data loss)';
comment on column public.scan_history.is_demo_sample is 
  'Demo flag (relaxed during rollback 004: column preserved to prevent permanent data loss)';
