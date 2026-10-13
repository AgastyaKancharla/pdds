# Prohibited / non-executable SQL scripts

This directory is **not** scanned by the Supabase CLI (`supabase db push` /
`supabase migration up` only reads `supabase/migrations/`). Files here are
documentation of dangerous operations that must never run as an ordinary
migration.

## 004_destructive_column_purge_PROHIBITED.sql

Moved out of `supabase/migrations/` on 2026-10-12 (PDDS Phase 5.4 audit).

Previously this file lived at
`supabase/migrations/004_destructive_column_purge_PROHIBITED.sql`, in the
same directory the Supabase CLI auto-discovers and applies in filename
order. Although the script self-aborts via `RAISE EXCEPTION` before its
(commented-out) `DROP COLUMN` statements could run, its *location* meant a
routine `supabase db push` against that directory would attempt to execute
it alongside the real `004_add_diagnostic_tier_and_demo_flag.sql` and
`004_rollback_diagnostic_tier.sql` migrations — an unnecessary hazard if
anyone ever "fixes" the exception without also fixing the location.

Its original warning header and full SQL content are preserved unchanged
in this directory. Do not move it back into `supabase/migrations/`. If
column removal is ever genuinely required, follow the four-step procedure
documented inside the file itself (cold backup, compliance/ML-consumer
check, written sign-off, then manual execution outside the migration
tool).
