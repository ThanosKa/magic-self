-- Supabase stops granting Data API access to new public tables on 2026-10-30.
-- On a fresh project, preview branch or `db reset`, every table is new, so the
-- server-side service-role client needs explicit grants.
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

-- app/sitemap.ts reads usernames with the anon key.
grant select on public.usernames to anon;
