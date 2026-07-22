-- supabase/social_proof_schema.sql
--
-- Ambient sosyal kanıt sayacı (retention-and-motivation-plan.md Aşama C,
-- Bandura'nın Sosyal Öğrenme Teorisi — "bu dersi X kişi bitirdi").
-- Repo'da migration geçmişi tutulmuyor (map_events_schema.sql'deki notla
-- aynı ilke) — bu dosya Supabase SQL Editor'da BİR KEZ elle çalıştırılır.
--
-- ÖN KOŞUL: map_events_schema.sql zaten çalıştırılmış olmalı (bu dosya o
-- tabloyu okur, yeni bir tablo YARATMAZ).
--
-- Neden RPC gerekiyor (ham SELECT client'a açılamaz): map_events_schema.sql
-- BİLİNÇLİ olarak "client'lar yalnızca insert edebilir" politikasını
-- uyguluyor (satırındaki not: "Okuma politikası bilinçli olarak YOK").
-- Bu fonksiyon `security definer` ile RLS'i, yalnızca TEK bir agregat sayı
-- (kişisel veri/satır İÇERMEYEN) döndürmek için atlar — ham satırlar veya
-- anon_id'ler asla client'a dönmez.
--
-- Event kaynağı: src/components/LessonFinishBadge.jsx, ders "done" durumuna
-- girdiğinde trackMapEvent('lesson_completed', { route }) çağırır (mevcut
-- fire-and-forget kalıbı, src/utils/mapEvents.js). Aynı kullanıcı bir dersi
-- birden çok kez bitirmiş görünse bile COUNT(DISTINCT anon_id) kullanıldığı
-- için sayı ŞİŞMEZ.

create or replace function get_lesson_completion_count(p_route text)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(distinct anon_id)::integer
  from map_events
  where event_name = 'lesson_completed'
    and payload->>'route' = p_route;
$$;

grant execute on function get_lesson_completion_count(text) to anon, authenticated;
