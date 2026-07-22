-- supabase/social_proof_schema.sql
--
-- Ambient sosyal kanıt sayacı (retention-and-motivation-plan.md Aşama C +
-- C.2, Bandura'nın Sosyal Öğrenme Teorisi — "bu dersi X kişi bitirdi").
-- Repo'da migration geçmişi tutulmuyor (map_events_schema.sql'deki notla
-- aynı ilke) — bu dosya Supabase SQL Editor'da elle çalıştırılır. Dosya
-- GÜNCELLENDİYSE (bkz. C.2 — p_window_days parametresi), Supabase'de TEKRAR
-- çalıştırılması gerekir; `drop function` eski tek-parametreli imzayı
-- temizler ki iki farklı overload çakışmasın.
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
--
-- C.2 (2026-07-22): p_window_days eklendi — NULL ise tüm-zamanlar sayısı,
-- bir sayı verilirse (ör. 7) sadece o kadar gün içindeki tamamlamaları
-- sayar. Zaman bazlı sayı "daha canlı/güncel" hissettirir ama düşük
-- trafikli derslerde küçük kalabilir — eşik/fallback kararı client
-- tarafında (src/lib/socialProof.js::getLessonSocialProof) verilir, bu
-- fonksiyon sadece ham sayıyı döner.

drop function if exists get_lesson_completion_count(text);

create or replace function get_lesson_completion_count(p_route text, p_window_days integer default null)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(distinct anon_id)::integer
  from map_events
  where event_name = 'lesson_completed'
    and payload->>'route' = p_route
    and (p_window_days is null or created_at >= now() - (p_window_days || ' days')::interval);
$$;

grant execute on function get_lesson_completion_count(text, integer) to anon, authenticated;
