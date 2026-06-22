create extension if not exists pgcrypto;

do $$
begin
  if to_regclass('public.prayer_requests') is null then
    raise exception 'A tabela public.prayer_requests nao existe.';
  end if;
end $$;

alter table public.prayer_requests
  add column if not exists id uuid,
  add column if not exists "createdAt" timestamptz default now();

update public.prayer_requests
set id = gen_random_uuid()
where id is null;

update public.prayer_requests
set "createdAt" = now()
where "createdAt" is null;

alter table public.prayer_requests
  alter column id set default gen_random_uuid(),
  alter column id set not null,
  alter column "createdAt" set default now(),
  alter column "createdAt" set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.prayer_requests'::regclass
      and contype = 'p'
  ) then
    alter table public.prayer_requests
      add constraint prayer_requests_pkey primary key (id);
  end if;
end $$;

alter table public.prayer_requests enable row level security;

grant select, insert, update on public.prayer_requests to anon;
grant select, insert, update on public.prayer_requests to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'prayer_requests'
      and policyname = 'Allow public read prayer requests'
  ) then
    create policy "Allow public read prayer requests"
      on public.prayer_requests
      for select
      to anon, authenticated
      using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'prayer_requests'
      and policyname = 'Allow public create prayer requests'
  ) then
    create policy "Allow public create prayer requests"
      on public.prayer_requests
      for insert
      to anon, authenticated
      with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'prayer_requests'
      and policyname = 'Allow public update prayer counts'
  ) then
    create policy "Allow public update prayer counts"
      on public.prayer_requests
      for update
      to anon, authenticated
      using (true)
      with check (true);
  end if;
end $$;

insert into public.prayer_requests (
  id,
  name,
  request,
  "isAnonymous",
  "prayingCount",
  "createdAt",
  category
)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'Shekinah',
    'Ore por direção nas decisões e por constância na rotina devocional.',
    false,
    0,
    '2026-06-22T22:20:00-03:00',
    'direcao'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Shekinah',
    'Orar pela cadeira!!! Para que cada vez mais pessoas consigam conhecer o amor de Cristo',
    false,
    0,
    '2026-06-22T10:30:00-03:00',
    'gratidao'
  )
on conflict (id) do update set
  name = excluded.name,
  request = excluded.request,
  "isAnonymous" = excluded."isAnonymous",
  "createdAt" = excluded."createdAt",
  category = excluded.category;
