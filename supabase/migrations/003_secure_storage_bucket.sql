-- Migration 003: Secure Supabase Storage Bucket & Enforce Owner Isolation
-- Description: Convert crop-scans to private bucket and restrict storage access to {auth.uid()}/ folder.
-- Date: 2026-10-09

-- 1. Ensure bucket exists and is marked private
insert into storage.buckets (id, name, public)
values ('crop-scans', 'crop-scans', false)
on conflict (id) do update set public = false;

update storage.buckets
set public = false
where id = 'crop-scans';

-- 2. Drop existing un-scoped or public policies for crop-scans bucket
drop policy if exists "Public upload crop scans" on storage.objects;
drop policy if exists "Public read crop scans" on storage.objects;
drop policy if exists "Users can upload own crop scans" on storage.objects;
drop policy if exists "Users can select own crop scans" on storage.objects;
drop policy if exists "Users can delete own crop scans" on storage.objects;
drop policy if exists "Users can update own crop scans" on storage.objects;

-- 3. Strict owner isolation policies on storage.objects
-- Rule: The first folder segment of the object path must match the authenticated user's UUID.
-- Target path format: {auth.uid()}/{scan_id}.jpg

-- INSERT: Only the authenticated owner can upload to their user folder
create policy "Users can upload own crop scans"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- SELECT: Only the authenticated owner can read/sign URLs for objects in their user folder
create policy "Users can select own crop scans"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- DELETE: Only the authenticated owner can delete objects in their user folder
create policy "Users can delete own crop scans"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'crop-scans'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- UPDATE: Only the authenticated owner can update objects in their user folder
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
