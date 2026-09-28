insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 2097152,
        array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins upload project images" on storage.objects;
drop policy if exists "Admins read project image records" on storage.objects;
drop policy if exists "Admins delete project images" on storage.objects;

create policy "Admins upload project images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'project-images'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins read project image records"
on storage.objects for select to authenticated
using (
  bucket_id = 'project-images'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "Admins delete project images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'project-images'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);