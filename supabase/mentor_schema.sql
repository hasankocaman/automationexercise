-- supabase/mentor_schema.sql
--
-- Kişisel AI Mentor — Katman B: cihazlar-arası snapshot senkronu (öğrenme yazısı #5).
-- Plan: Documents/learning-science-upgrade-plan.md Bölüm 6 (O3).
--
-- Repo'da migration geçmişi tutulmuyor (map_events_schema.sql / social_proof_schema.sql
-- ile aynı ilke) — bu dosya Supabase panosu → SQL Editor'da BİR KEZ elle çalıştırılır.
--
-- NE İŞE YARAR: Mentorun zayıflık geçmişi (mentorSnapshots.js) varsayılan olarak
-- TAMAMEN YERELDİR (localStorage) ve üyelik gerektirmez (CLAUDE.md §5). Bu tablo
-- YALNIZCA üye kullanıcının snapshot'larını cihazlar arasında senkron tutmak için
-- OPSİYONELDİR — kurulmasa bile uygulama tam çalışır (client tarafı syncSnapshotsToCloud
-- hatayı sessizce yutar). AI öğüt katmanı (mentor-advice edge function) bu tabloya
-- BAĞLI DEĞİLDİR; edge function veriyi doğrudan client'tan alır.
--
-- RLS: kullanıcı YALNIZCA kendi user_id satırlarını görebilir/yazabilir
-- (auth.uid() = user_id). Kişisel öğrenme verisi başka hiç kimseye açılmaz.

create table if not exists mentor_snapshots (
  user_id uuid not null references auth.users on delete cascade,
  day date not null,                       -- UTC gün etiketi (gün başına tek satır)
  ts timestamptz not null,                 -- snapshot'ın alındığı an
  payload jsonb not null default '{}'::jsonb,  -- mentorSnapshots.js özet objesi
  updated_at timestamptz not null default now(),
  primary key (user_id, day)               -- upsert onConflict: 'user_id,day'
);

alter table mentor_snapshots enable row level security;

drop policy if exists "mentor_snapshots_select_own" on mentor_snapshots;
create policy "mentor_snapshots_select_own" on mentor_snapshots
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "mentor_snapshots_insert_own" on mentor_snapshots;
create policy "mentor_snapshots_insert_own" on mentor_snapshots
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "mentor_snapshots_update_own" on mentor_snapshots;
create policy "mentor_snapshots_update_own" on mentor_snapshots
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "mentor_snapshots_delete_own" on mentor_snapshots;
create policy "mentor_snapshots_delete_own" on mentor_snapshots
  for delete to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_mentor_snapshots_user_ts
  on mentor_snapshots (user_id, ts);
