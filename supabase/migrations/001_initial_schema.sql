-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Crops table
create table if not exists public.crops (
  id text primary key,
  name_en text not null,
  name_te text not null,
  category text not null default 'General',
  tier integer not null default 1,
  ap_regions text[] default null,
  growing_season text default null,
  image_url text default null,
  created_at timestamptz not null default now()
);

-- Diseases table
create table if not exists public.diseases (
  id text primary key,
  crop_id text references public.crops(id) on delete set null,
  name_en text not null,
  name_te text not null,
  type text not null,
  symptoms_en text not null,
  symptoms_te text not null,
  affected_parts text[] default null,
  urgency_level text not null default 'Medium',
  urgency_color text not null default 'yellow' check (urgency_color in ('red', 'yellow', 'green')),
  ap_specific_tip_en text default null,
  ap_specific_tip_te text default null,
  created_at timestamptz not null default now()
);

-- Treatments table
create table if not exists public.treatments (
  id text primary key,
  disease_id text references public.diseases(id) on delete cascade,
  type text not null check (type in ('organic', 'chemical', 'preventive')),
  step_number integer not null default 1,
  instruction_en text not null,
  instruction_te text not null,
  product_name text default null,
  created_at timestamptz not null default now()
);

-- Users table
create table if not exists public.app_users (
  id text primary key,
  phone text default null,
  name text default null,
  language_preference text default 'en',
  location_district text default null,
  created_at timestamptz not null default now()
);

-- Scan history table
create table if not exists public.scan_history (
  id text primary key default 'scan_' || extract(epoch from now())::text,
  user_id text default null,
  image_url text default null,
  crop_detected_id text references public.crops(id) on delete set null,
  disease_detected_id text references public.diseases(id) on delete set null,
  confidence_score numeric(4,2) default null,
  urgency_color text default null check (urgency_color in ('red', 'yellow', 'green')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.crops enable row level security;
alter table public.diseases enable row level security;
alter table public.treatments enable row level security;
alter table public.scan_history enable row level security;

-- Public read access for crops, diseases, treatments
create policy "Public read crops" on public.crops for select using (true);
create policy "Public read diseases" on public.diseases for select using (true);
create policy "Public read treatments" on public.treatments for select using (true);

-- Users can insert and read their own scan history
create policy "Users can insert scan_history" on public.scan_history for insert with check (true);
create policy "Users can read own scan_history" on public.scan_history for select using (true);

-- Create storage bucket for crop images
insert into storage.buckets (id, name, public) values ('crop-scans', 'crop-scans', true)
on conflict (id) do nothing;

-- Allow public uploads to crop-scans bucket
create policy "Public upload crop scans" on storage.objects for insert with check (bucket_id = 'crop-scans');
create policy "Public read crop scans" on storage.objects for select using (bucket_id = 'crop-scans');
