-- LawyGo marketing site CMS (lawygosite)
-- Service role only; RLS enabled with no public policies.

create table if not exists public.lawygosite_cms_content (
  id text primary key default 'main',
  overrides jsonb not null default '{}'::jsonb,
  version integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by text not null default 'system'
);

alter table public.lawygosite_cms_content enable row level security;

create table if not exists public.lawygosite_cms_history (
  id uuid primary key default gen_random_uuid(),
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.lawygosite_cms_history enable row level security;

create table if not exists public.lawygosite_cms_admin (
  username text primary key,
  salt text not null,
  hash text not null,
  created_at timestamptz not null default now()
);

alter table public.lawygosite_cms_admin enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lawygosite-media',
  'lawygosite-media',
  true,
  104857600,
  array['image/jpeg','image/png','image/webp','image/gif','video/webm','video/mp4','video/quicktime']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public read lawygosite media"
on storage.objects for select
to public
using (bucket_id = 'lawygosite-media');

create policy "Service role upload lawygosite media"
on storage.objects for insert
to authenticated, service_role
with check (bucket_id = 'lawygosite-media');

create policy "Service role update lawygosite media"
on storage.objects for update
to authenticated, service_role
using (bucket_id = 'lawygosite-media');

create policy "Service role delete lawygosite media"
on storage.objects for delete
to authenticated, service_role
using (bucket_id = 'lawygosite-media');
