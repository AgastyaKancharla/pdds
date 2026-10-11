-- WARNING: DESTRUCTIVE ACTION - PROHIBITED UNDER NORMAL OPERATIONS
-- File: 004_destructive_column_purge_PROHIBITED.sql
-- Date: 2026-10-10
--
-- CAUTION: RUNNING THIS SCRIPT PERMANENTLY DESTROYS ALL STORED DIAGNOSTIC TIER
-- AND DEMONSTRATION SAMPLE PROVENANCE DATA FROM THE DATABASE.
--
-- This script MUST NOT be executed in automated migration pipelines or production environments.
-- It is archived here strictly for architectural documentation of why column drops are dangerous.
--
-- If column deletion is ever mandated in the future:
-- 1. Take a verified offline cold backup of public.scan_history table.
-- 2. Validate that no external consumers, compliance audits, or downstream ML evaluations rely on provenance tags.
-- 3. Obtain written engineering sign-off.
-- 4. To execute, comment out the safety guard exception below.

do $$
begin
  raise exception 'EXECUTION PROHIBITED: Dropping provenance columns causes irreversible data loss. Use 004_rollback_diagnostic_tier.sql instead.';
end $$;

-- The following commands are disabled by the exception above:
-- alter table public.scan_history drop constraint if exists check_diagnostic_tier;
-- alter table public.scan_history drop column if exists diagnostic_tier;
-- alter table public.scan_history drop column if exists is_demo_sample;
