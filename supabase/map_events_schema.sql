-- supabase/map_events_schema.sql
--
-- Kariyer Haritası minimal event ölçümü (career-map-feature-plan.md §9.1).
-- Repo'da migration geçmişi tutulmuyor (bkz. trending-skills-sync/schema.sql
-- başındaki not) — bu dosya Supabase SQL Editor'da BİR KEZ elle çalıştırılır.
--
-- Event seti: map_wizard_started · map_wizard_completed (cevaplarla) ·
-- map_first_lesson_clicked · map_revisited · map_regenerated.
-- Anonim kullanıcı localStorage'daki rastgele anon_id ile takip edilir;
-- üye oturumu varsa user_id DB tarafında auth.uid() default'uyla dolar.
--
-- Okuma politikası bilinçli olarak YOK: client'lar yalnızca insert edebilir,
-- funnel analizi Supabase Dashboard/SQL Editor'dan (service role) yapılır.
-- Not: with check (true) insert'i anonim spam'e açık bırakır — MVP ölçüm
-- tablosu için kabul edilen risk; hacim sorun olursa rate-limit'li bir Edge
-- Function arkasına alınır.

create table if not exists map_events (
  id bigint generated always as identity primary key,
  anon_id text not null,
  user_id uuid default auth.uid(),
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table map_events enable row level security;

drop policy if exists "map_events_insert" on map_events;
create policy "map_events_insert" on map_events
  for insert to anon, authenticated
  with check (true);

create index if not exists idx_map_events_name_time
  on map_events (event_name, created_at);
