const schemaSql = `-- LearnQA.dev simple backend schema
-- Nerede çalıştırılır: Supabase Dashboard > SQL Editor > New query.
-- Neden önce bu dosya: Policy, trigger ve uygulama kodu önce tablo ister.
-- Yazılmazsa: React tarafında kaydedilecek kalıcı bir yer olmadığı için login dışındaki her şey unutulur.

-- profiles: auth.users teknik kullanıcı kaydının uygulamada göstereceğimiz profil kartı.
create table public.profiles (
  -- id, Supabase Auth içindeki auth.users(id) ile birebir aynı kullanıcı kimliğidir.
  -- primary key: Her profilin tek ve benzersiz olmasını sağlar.
  -- references auth.users(id): Profil satırını gerçek login kullanıcısına bağlar.
  -- on delete cascade: Kullanıcı silinirse profili de otomatik silinir; yetim kayıt kalmaz.
  -- Yazılmazsa: Profil ile login olan kullanıcı eşleşmez, başka kullanıcı verisiyle karışma riski doğar.
  id uuid primary key references auth.users(id) on delete cascade,

  -- Ekranda görünen ad. Google adını veya email'i burada saklarız.
  -- Yazılmazsa: sohbet ve feedback alanlarında kullanıcıyı okunabilir adla gösteremeyiz.
  display_name text,

  -- Google profil fotoğrafı gibi avatar adresi.
  -- Yazılmazsa: kullanıcı kartında görsel kişiselleştirme olmaz.
  avatar_url text,

  -- Profilin oluştuğu zaman. default now() database saatini otomatik yazar.
  -- Yazılmazsa: kaydın ne zaman açıldığını takip edemeyiz.
  created_at timestamptz not null default now()
);

-- user_progress: Öğrencinin hangi derste, hangi konuda, nerede kaldığını saklar.
create table public.user_progress (
  -- Otomatik artan teknik satır kimliği. Uygulama bunu üretmez, database üretir.
  -- Yazılmazsa: satırı loglarda ve admin ekranında tekil takip etmek zorlaşır.
  id bigint generated always as identity primary key,

  -- Bu ilerleme hangi kullanıcıya ait?
  -- not null: Kullanıcısız progress kaydı oluşmasını engeller.
  -- on delete cascade: Kullanıcı silinirse progress verisi de temizlenir.
  -- Yazılmazsa: kayıtların sahibi belli olmaz ve RLS güvenliği kurulamaz.
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Dersin route/slug değeri. Örnek: selenium, sql, backend.
  -- Yazılmazsa: kullanıcıyı hangi derse döndüreceğimizi bilemeyiz.
  lesson_slug text not null,

  -- Ders içindeki konu/sekme kimliği. Örnek: explicit-wait, tables, auth.
  -- Yazılmazsa: kullanıcı ders içinde en son hangi konuda kaldı bilgisi kaybolur.
  topic_slug text not null,

  -- started veya completed dışında yanlış durum girilmesini engeller.
  -- Yazılmazsa: done, finish, bitirdim gibi karışık değerler raporları bozar.
  status text not null default 'started' check (status in ('started', 'completed')),

  -- Sayfa içi pozisyon, aktif tab, video saniyesi gibi esnek detayları json olarak tutar.
  -- Yazılmazsa: sadece konu bilinir; konu içindeki tam konum kaybolur.
  last_position jsonb not null default '{}'::jsonb,

  -- Konu tamamlandıysa tamamlanma zamanı.
  -- Yazılmazsa: rozet ve istatistiklerde tamamlama tarihini gösteremeyiz.
  completed_at timestamptz,

  -- En son güncelleme zamanı. Geri dönen kullanıcıyı en güncel kayda göre başlatırız.
  -- Yazılmazsa: kaldığı son yeri sıralamak mümkün olmaz.
  updated_at timestamptz not null default now(),

  -- Aynı kullanıcı + aynı ders + aynı konu için tek satır olmalı.
  -- upsert bu kurala bakarak yeni satır açmak yerine mevcut satırı günceller.
  -- Yazılmazsa: aynı konu her kaydedildiğinde çoğalan duplicate progress satırları oluşur.
  unique (user_id, lesson_slug, topic_slug)
);

-- badges: Verilebilecek rozetlerin katalog tablosu.
create table public.badges (
  -- Rozetin sabit kimliği. Kod tarafında first-topic gibi bu id kullanılır.
  -- Yazılmazsa: rozetleri güvenilir şekilde seçmek ve tekrar vermemek zorlaşır.
  id text primary key,

  -- Rozetin kullanıcıya görünen adı.
  -- Yazılmazsa: rozet kartında başlık gösteremeyiz.
  title text not null,

  -- Rozetin neden verildiğini anlatan kısa metin.
  -- Yazılmazsa: kullanıcı rozeti niçin kazandığını anlamaz.
  description text not null,

  -- Rozet ikonu. default ile boş bırakılırsa bile güvenli bir ikon görünür.
  -- Yazılmazsa: rozet listesi görsel olarak zayıf kalır.
  icon text not null default '🏅',

  -- Kaç tamamlanan konu gerektiğini anlatan kural alanı.
  -- Yazılmazsa: rozetin hangi başarı seviyesine ait olduğunu raporlayamayız.
  required_completed_topics int not null default 1
);

-- user_badges: Hangi kullanıcı hangi rozeti aldı?
create table public.user_badges (
  -- Her rozet kazanımı için teknik satır kimliği.
  -- Yazılmazsa: admin ekranında rozet kayıtlarını tek tek izlemek zorlaşır.
  id bigint generated always as identity primary key,

  -- Rozeti alan kullanıcı.
  -- Yazılmazsa: rozetin kime ait olduğu bilinmez.
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Alınan rozetin badges tablosundaki id değeri.
  -- Yazılmazsa: olmayan veya yanlış rozetler kullanıcıya bağlanabilir.
  badge_id text not null references public.badges(id) on delete cascade,

  -- Rozetin verildiği zaman.
  -- Yazılmazsa: kullanıcı başarı geçmişini zaman çizelgesi olarak göremez.
  awarded_at timestamptz not null default now(),

  -- Aynı kullanıcı aynı rozeti sadece bir kez almalı.
  -- Yazılmazsa: aynı rozeti tekrar tekrar veren duplicate kayıtlar oluşur.
  unique (user_id, badge_id)
);

-- feedback: Üye olan kişilerin görüş, eleştiri ve önerileri.
create table public.feedback (
  -- Otomatik feedback satır kimliği.
  -- Yazılmazsa: tek bir feedback kaydını takip etmek ve yönetmek zorlaşır.
  id bigint generated always as identity primary key,

  -- Feedback'i yazan kullanıcı.
  -- Yazılmazsa: gerektiğinde kullanıcıya geri dönüş yapamayız.
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Feedback türü. check ile sadece izinli kategoriler kabul edilir.
  -- Yazılmazsa: typo ve karışık kategori verisi oluşur.
  type text not null check (type in ('suggestion', 'bug', 'praise', 'other')),

  -- Mesaj metni. 10-2000 karakter arası zorunlu tuttuk.
  -- Yazılmazsa: boş mesaj veya aşırı uzun metin database'i kirletir.
  message text not null check (char_length(message) between 10 and 2000),

  -- Feedback hangi sayfadan geldi? Örnek: /backend, /selenium.
  -- Yazılmazsa: hangi sayfanın iyileştirileceğini anlamak zorlaşır.
  page_path text,

  -- Feedback'in yazılma zamanı.
  -- Yazılmazsa: yeni/eskı önerileri ayırt edemeyiz.
  created_at timestamptz not null default now()
);

-- chat_messages: O anda online üyelerin birbirine yazdığı sohbet mesajları.
create table public.chat_messages (
  -- Her mesaj için teknik satır kimliği.
  -- Yazılmazsa: mesajı sıralamak, silmek veya debug etmek zorlaşır.
  id bigint generated always as identity primary key,

  -- Mesajı gönderen kullanıcı.
  -- Yazılmazsa: güvenli sohbet ve kendi mesajını silme kuralı kurulamaz.
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Mesaj listesinde göstereceğimiz ad. Snapshot olarak saklanır.
  -- Yazılmazsa: eski mesajlarda isim göstermek için her seferinde profile join gerekir.
  display_name text,

  -- Mesaj içeriği. 1-500 karakter aralığı spam ve boş mesajı azaltır.
  -- Yazılmazsa: boş veya çok uzun mesajlar chat deneyimini bozar.
  message text not null check (char_length(message) between 1 and 500),

  -- Mesaj zamanı. Sıralama ve "az önce" göstergesi için gerekir.
  -- Yazılmazsa: sohbet sırası güvenilir olmaz.
  created_at timestamptz not null default now()
);

-- Başlangıç rozetlerini ekleriz.
-- on conflict do nothing: Bu SQL'i ikinci kez çalıştırırsan duplicate hatası vermez.
-- Yazılmazsa: tekrar çalıştırmada migration durur ve rozet katalogu elle temizlenmek zorunda kalır.
insert into public.badges (id, title, description, icon, required_completed_topics)
values
  ('first-topic', 'İlk Konu', 'İlk konusunu tamamlayan kullanıcı.', '🌱', 1),
  ('five-topics', 'İstikrarlı Öğrenci', '5 konuyu tamamlayan kullanıcı.', '🔥', 5),
  ('backend-starter', 'Backend Starter', 'Backend sayfasındaki ana akışı tamamlayan kullanıcı.', '🧩', 1)
on conflict (id) do nothing;`;

const rlsSql = `-- RLS, tablonun kapısına güvenlik görevlisi koyar.
-- RLS açılınca policy yazmadığın işlem otomatik engellenir.
-- Yazılmazsa: publishable key kullanan client yanlış policy ile fazla veri okuyabilir.
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_badges enable row level security;
alter table public.feedback enable row level security;
alter table public.chat_messages enable row level security;
alter table public.badges enable row level security;

-- Giriş yapan herkes profil adlarını okuyabilir; chat içinde isim göstermek için gerekir.
-- Yazılmazsa: kullanıcı listesinde veya sohbette display_name çekmek zorlaşır.
create policy "profiles are readable by signed in users"
on public.profiles for select to authenticated using (true);

-- Kullanıcı sadece kendi profilini güncelleyebilir.
-- using: var olan satır üzerinde işlem yapma izni.
-- with check: güncellenen yeni satırın da aynı kullanıcıya ait kalmasını zorunlu tutar.
-- Yazılmazsa: kullanıcı başka birinin profil adını değiştirebilir veya kendini başkası gibi gösterebilir.
create policy "users update own profile"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- auth.uid(), Supabase session içindeki giriş yapan kullanıcının id değeridir.
-- Bu policy sadece kendi progress satırlarını okutur.
-- Yazılmazsa: kullanıcı başkasının kaldığı dersleri görebilir.
create policy "users read own progress"
on public.user_progress for select to authenticated
using ((select auth.uid()) = user_id);

-- Insert sırasında user_id mutlaka giriş yapan kullanıcıyla aynı olmalı.
-- Yazılmazsa: kötü niyetli biri başkasının adına progress yazabilir.
create policy "users write own progress"
on public.user_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

-- Update sırasında hem eski satır hem yeni değerler aynı kullanıcıya ait kalmalı.
-- Yazılmazsa: bir kullanıcı başka kullanıcının progress kaydını completed yapabilir.
create policy "users update own progress"
on public.user_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Rozet katalogu ortak bilgidir; giriş yapan herkes okuyabilir.
-- Yazılmazsa: rozet listesi UI'da gösterilemez.
create policy "signed in users read badge catalog"
on public.badges for select to authenticated using (true);

-- Kullanıcı sadece kendi kazandığı rozetleri okuyabilir.
-- Yazılmazsa: başka kullanıcıların rozet geçmişi açığa çıkabilir.
create policy "users read own badges"
on public.user_badges for select to authenticated
using ((select auth.uid()) = user_id);

-- Feedback yazarken user_id giriş yapan kullanıcıyla eşleşmeli.
-- Yazılmazsa: biri başkası adına sahte öneri/şikayet gönderebilir.
create policy "users write own feedback"
on public.feedback for insert to authenticated
with check ((select auth.uid()) = user_id);

-- Kullanıcı isterse kendi eski feedback kayıtlarını görebilir.
-- Yazılmazsa: profil ekranında "gönderdiğim öneriler" listesi yapılamaz.
create policy "users read own feedback"
on public.feedback for select to authenticated
using ((select auth.uid()) = user_id);

-- Chat ortak alandır; giriş yapan herkes mesajları okuyabilir.
-- Yazılmazsa: realtime mesaj gelse bile geçmiş sohbet listesi dolmaz.
create policy "signed in users read chat"
on public.chat_messages for select to authenticated using (true);

-- Mesaj gönderen user_id kendi session id'si olmalı.
-- Yazılmazsa: biri başka kullanıcının adıyla mesaj göndermeye çalışabilir.
create policy "signed in users send chat"
on public.chat_messages for insert to authenticated
with check ((select auth.uid()) = user_id);

-- Kullanıcı sadece kendi mesajını silebilir.
-- Yazılmazsa: herkesin mesajını silme riski veya hiç mesaj silememe sorunu doğar.
create policy "users delete own chat messages"
on public.chat_messages for delete to authenticated
using ((select auth.uid()) = user_id);`;

const profileTriggerSql = `-- Yeni Google kullanıcısı oluştuğunda otomatik public.profiles satırı açar.
-- Yazılmazsa: auth.users içinde kullanıcı olur ama uygulama profil adı/avatar bulamaz.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
-- security definer: Fonksiyon, tabloya insert etmek için kendi yetkisiyle çalışır.
-- set search_path = public: Hangi schema kullanılacağını netleştirir; yanlış tabloya gitmeyi önler.
-- Yazılmazsa: trigger auth.users içinden profiles tablosuna yazarken yetki veya schema hatası alabilir.
security definer set search_path = public
as $$
begin
  -- new, auth.users tablosuna yeni eklenen kullanıcı satırıdır.
  -- raw_user_meta_data Google'dan gelen ad/avatar gibi ek bilgileri taşır.
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    -- full_name yoksa email kullanılır; böylece ekranda boş isim kalmaz.
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Trigger fonksiyonları işlenen satırı geri döndürmelidir.
  -- Yazılmazsa: trigger beklenen şekilde tamamlanmayabilir.
  return new;
end;
$$;

-- Aynı trigger daha önce varsa sileriz.
-- Yazılmazsa: tekrar çalıştırınca trigger already exists hatası alırsın.
drop trigger if exists on_auth_user_created on auth.users;

-- auth.users içine her yeni kullanıcı insert edildiğinde profil fonksiyonunu çalıştır.
-- Yazılmazsa: Google login sonrası profiles satırı otomatik oluşmaz.
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();`;

const realtimeSql = `-- chat_messages tablosunu Supabase Realtime yayınına ekler.
-- Yazılmazsa: insert edilen yeni chat mesajları diğer açık tarayıcılara anlık düşmez.
alter publication supabase_realtime add table public.chat_messages;

-- İsteğe bağlı: progress değişince başka açık sekme de anında güncellensin.
-- Yazılmazsa: progress yine kaydedilir ama diğer sekme refresh olmadan bunu görmeyebilir.
alter publication supabase_realtime add table public.user_progress;`;

const supabaseClientCode = `// src/lib/supabaseClient.js
// Supabase SDK'dan createClient alırız; bu bizim backend kapımızdır.
// Yazılmazsa: React uygulaması Supabase Auth, Database ve Realtime'a bağlanamaz.
import { createClient } from '@supabase/supabase-js';

// VITE_ ile başlayan env değişkenleri Vite tarafından tarayıcı koduna açılır.
// Yazılmazsa: URL'yi kodun içine gömmek zorunda kalırsın ve ortam değiştirmek zorlaşır.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Publishable key client tarafında kullanılabilir; service_role key ASLA buraya yazılmaz.
// Yazılmazsa: Supabase isteği kimden geldiğini ve hangi projeye gideceğini bilemez.
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Tek bir supabase nesnesi oluşturup tüm feature dosyalarında kullanırız.
// Yazılmazsa: her dosyada bağlantıyı tekrar kurar, kodu dağınık hale getirirsin.
export const supabase = createClient(supabaseUrl, supabaseKey);`;

const authCode = `// src/features/auth/authApi.js
// Ortak Supabase client'ı kullanırız; her yerde aynı session bilgisini görürüz.
// Yazılmazsa: Auth kodu database client'ından kopuk kalır.
import { supabase } from '../../lib/supabaseClient';

const AUTH_CALLBACK_PATH = '/auth/callback';

export const oauthProviders = [
  { id: 'google', label: 'Google' },
  { id: 'github', label: 'GitHub' },
  // Microsoft, Supabase Auth içinde provider: 'azure' olarak çağrılır.
  // Yazılmazsa: provider: 'microsoft' denendiğinde Supabase desteklenen sağlayıcıyı bulamaz.
  { id: 'azure', label: 'Microsoft' },
];

export function getAuthRedirectUrl(next = '/') {
  // next sadece site içi route olmalı; dış URL kabul etmiyoruz.
  // Yazılmazsa: kötü niyetli biri login sonrası kullanıcıyı başka siteye yönlendirebilir.
  const safeNext = typeof next === 'string' && next.startsWith('/') ? next : '/';

  // Supabase Auth işleminden sonra dönülecek tam URL.
  // Yazılmazsa: OAuth ve Magic Link dönüşü yanlış sayfaya veya localhost'a gidebilir.
  return window.location.origin + AUTH_CALLBACK_PATH + '?next=' + encodeURIComponent(safeNext);
}

export async function signInWithOAuthProvider(provider, next = '/') {
  const options = {
    redirectTo: getAuthRedirectUrl(next),
  };

  // Azure/Microsoft için email/profile bilgilerini net istemek iyi pratiktir.
  // Yazılmazsa: bazı tenant ayarlarında email bilgisi eksik dönebilir.
  if (provider === 'azure') {
    options.scopes = 'openid email profile';
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    // google, github veya azure.
    // Yazılmazsa: hangi sosyal girişin açılacağı bilinmez.
    provider,
    options,
  });

  if (error) throw error;
  return data;
}

export function signInWithGoogle(next) {
  return signInWithOAuthProvider('google', next);
}

export function signInWithGitHub(next) {
  return signInWithOAuthProvider('github', next);
}

export function signInWithMicrosoft(next) {
  return signInWithOAuthProvider('azure', next);
}

export async function sendMagicLink({ fullName, email, next = '/' }) {
  const cleanedFullName = fullName.trim().replace(/\\s+/g, ' ');
  const cleanedEmail = email.trim().toLowerCase();

  if (cleanedFullName.length < 2) {
    throw new Error('Ad Soyad en az 2 karakter olmalı.');
  }
  if (!cleanedEmail.includes('@')) {
    throw new Error('Geçerli bir e-posta yazmalısın.');
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email: cleanedEmail,
    options: {
      // Yeni kullanıcı yoksa otomatik oluşturur.
      // Yazılmazsa: daha önce kayıt olmayan kullanıcı Magic Link alamayabilir.
      shouldCreateUser: true,

      // Magic Link tıklanınca döneceği adres.
      // Yazılmazsa: kullanıcı linke tıklasa bile GitHub Pages route'una doğru dönemeyebilir.
      emailRedirectTo: getAuthRedirectUrl(next),

      // Bu obje auth.users.raw_user_meta_data içine yazılır.
      // Trigger doğrulama sonrası buradan full_name değerini public.profiles'a kopyalar.
      // Yazılmazsa: şifresiz kayıt olan kullanıcının Ad Soyad bilgisi kaybolur.
      data: {
        full_name: cleanedFullName,
        display_name: cleanedFullName,
        signup_method: 'magic_link',
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function getCurrentSession() {
  // Tarayıcıdaki mevcut Supabase session bilgisini okur.
  // Yazılmazsa: uygulama "bu kullanıcı giriş yaptı mı?" sorusunu cevaplayamaz.
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  // Supabase session'ı temizler.
  // Yazılmazsa: kullanıcı "çıkış yap" dediğinde hâlâ girişli kalır.
  return supabase.auth.signOut();
}`;

const authProfileTriggerSql = `-- Modern Auth profil senkronizasyonu.
-- Amaç: OAuth veya Magic Link ile doğrulanan kullanıcıyı public.profiles tablosuna kopyalamak.
-- Not: Magic Link isteğinde auth.users satırı erken oluşabilir; profile kopyalama email_confirmed_at dolunca yapılır.

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists email text;

create or replace function public.handle_verified_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  resolved_full_name text;
  resolved_avatar_url text;
  -- src/lib/avatarEmojis.js içindeki AVATAR_EMOJIS listesiyle birebir aynı sırada tutulmalı.
  default_avatar_emoji text;
begin
  -- Magic Link henüz tıklanmadıysa profile satırı üretme.
  -- Yazılmazsa: e-postasını doğrulamamış kişiler profiles içinde aktif kullanıcı gibi görünebilir.
  if new.email_confirmed_at is null then
    return new;
  end if;

  -- OAuth sağlayıcıları farklı metadata isimleri döndürebilir.
  -- Magic Link formu full_name değerini options.data içinde gönderir.
  resolved_full_name := nullif(coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'user_name',
    split_part(new.email, '@', 1)
  ), '');

  resolved_avatar_url := nullif(coalesce(
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'picture'
  ), '');

  -- İlk girişte rastgele bir emoji avatar atarız; Google fotoğrafı yüklenemese
  -- veya hiç olmasa bile kullanıcı baştan düzgün görünen bir avatara sahip olur.
  -- Yazılmazsa: yeni kullanıcı profil resmi gelene kadar boş/baş harf avatarla kalır.
  default_avatar_emoji := (array[
    '👩', '👨', '🧑', '👩‍🦰', '👨‍🦰', '👩‍🦱', '👨‍🦱', '👩‍🦳', '👨‍🦳',
    '👩‍🦲', '👨‍🦲', '🤓', '😎', '👩‍💻', '👨‍💻', '🕵️‍♀️', '🕵️‍♂️'
  ])[1 + floor(random() * 17)::int];

  insert into public.profiles (id, full_name, display_name, email, avatar_url, avatar_emoji)
  values (
    new.id,
    resolved_full_name,
    resolved_full_name,
    new.email,
    resolved_avatar_url,
    default_avatar_emoji
  )
  on conflict (id) do update
  set full_name = coalesce(excluded.full_name, public.profiles.full_name),
      display_name = coalesce(excluded.display_name, public.profiles.display_name),
      email = coalesce(excluded.email, public.profiles.email),
      avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
      -- Var olan kullanıcının kendi seçtiği emoji'yi asla ezme; sadece hâlâ boşsa doldur.
      avatar_emoji = coalesce(public.profiles.avatar_emoji, excluded.avatar_emoji);

  return new;
end;
$$;

-- Eski "kullanıcı oluştuğu an profile aç" triggerını kaldırıyoruz.
-- Yazılmazsa: Magic Link tıklanmadan profile satırı oluşabilir.
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_auth_user_verified on auth.users;

create trigger on_auth_user_verified
after insert or update of email_confirmed_at on auth.users
for each row execute procedure public.handle_verified_user();`;

const authCallbackCode = `// src/pages/AuthCallback.jsx
// Route: /auth/callback
// OAuth ve Magic Link dönüşünde session'ı tamamlar, sonra güvenli next route'a yönlendirir.
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Giriş doğrulanıyor...');

  useEffect(() => {
    let alive = true;

    async function finishAuth() {
      try {
        const code = searchParams.get('code');
        const rawNext = searchParams.get('next') || '/';
        const safeNext = rawNext.startsWith('/') ? rawNext : '/';

        // PKCE dönüşünde URL içinde code gelir; session'a çevirmemiz gerekir.
        // Yazılmazsa: bazı OAuth/Magic Link dönüşlerinde kullanıcı session alamaz.
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!data.session) {
          throw new Error('Session bulunamadı. Link süresi dolmuş olabilir.');
        }

        if (alive) {
          navigate(safeNext, { replace: true });
        }
      } catch (error) {
        if (alive) {
          setMessage(error.message || 'Giriş tamamlanamadı.');
        }
      }
    }

    finishAuth();
    return () => { alive = false; };
  }, [navigate, searchParams]);

  return (
    <main className="min-h-screen grid place-items-center bg-slate-950 text-white px-4">
      <section className="w-full max-w-md rounded-xl border border-cyan-800 bg-slate-900 p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-cyan-400/20 grid place-items-center">
          🔐
        </div>
        <h1 className="text-xl font-bold">LearnQA.dev Auth</h1>
        <p className="mt-3 text-sm text-slate-300">{message}</p>
      </section>
    </main>
  );
}`;

const magicLinkFormCode = `// src/features/auth/AuthPanel.jsx
import { useState } from 'react';
import {
  oauthProviders,
  sendMagicLink,
  signInWithOAuthProvider,
} from './authApi';

export default function AuthPanel({ next = '/backend' }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  async function handleOAuth(provider) {
    setErrorMessage('');
    await signInWithOAuthProvider(provider, next);
  }

  async function handleMagicLinkSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await sendMagicLink({ fullName, email, next });
      setStatus('sent');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Aktivasyon bağlantısı gönderilemedi.');
    }
  }

  if (status === 'sent') {
    return (
      <section className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950">
        <div className="mb-3 text-3xl">✉️</div>
        <h2 className="text-lg font-bold">E-postanı kontrol et</h2>
        <p className="mt-2 text-sm">
          {email} adresine aktivasyon bağlantısı gönderdik. Linke tıkladığında e-postan doğrulanır ve LearnQA.dev oturumun açılır.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 rounded-lg border border-emerald-700 px-3 py-2 text-sm font-semibold"
        >
          Farklı e-posta yaz
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Giriş yap veya kayıt ol</h2>
      <p className="mt-1 text-sm text-slate-600">
        Sosyal hesapla hemen gir veya şifresiz Magic Link ile e-postanı doğrula.
      </p>

      <div className="mt-5 grid gap-2">
        {oauthProviders.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => handleOAuth(provider.id)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            {provider.label} ile devam et
          </button>
        ))}
      </div>

      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        veya
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleMagicLinkSubmit} className="grid gap-3">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Ad Soyad
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            autoComplete="name"
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
            placeholder="Ada Lovelace"
          />
        </label>

        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          E-posta
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            autoComplete="email"
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
            placeholder="ada@example.com"
          />
        </label>

        {status === 'error' && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {status === 'sending' ? 'Aktivasyon bağlantısı gönderiliyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </section>
  );
}`;

const authRedirectChecklistCode = `# Supabase Dashboard > Authentication > URL Configuration
# Site URL:
https://learnqa.dev

# Redirect URLs allow list:
https://learnqa.dev/auth/callback
https://learnqa.dev/**
http://localhost:5173/auth/callback
http://localhost:5173/**

# OAuth provider callback tarafı:
# Google/GitHub/Microsoft developer console içinde Authorized redirect URI olarak
# Supabase Dashboard > Authentication > Providers ekranındaki callback URL yazılır.
# Örnek format:
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`;

const progressCode = `// src/features/progress/progressApi.js
// Progress API, kullanıcının kaldığı yeri database'e yazan küçük servis katmanıdır.
// Yazılmazsa: her component Supabase sorgusunu kendi içinde tekrar eder.
import { supabase } from '../../lib/supabaseClient';

export async function saveProgress({ userId, lessonSlug, topicSlug, status, lastPosition }) {
  // Database kolon adları snake_case olduğu için row objesini tabloya göre kurarız.
  // Yazılmazsa: Supabase yanlış kolon adları yüzünden insert/update hatası verir.
  const row = {
    // RLS policy bu alanı auth.uid() ile karşılaştırır.
    // Yazılmazsa: kayıt sahibini bilemeyiz ve insert policy geçmez.
    user_id: userId,

    // Hangi ders? Örnek: selenium, sql, backend.
    // Yazılmazsa: kullanıcı uygulamaya dönünce hangi derse gideceğini bilemeyiz.
    lesson_slug: lessonSlug,

    // Hangi konu/sekme?
    // Yazılmazsa: kullanıcı dersin içinde tam kaldığı noktaya dönemez.
    topic_slug: topicSlug,

    // started veya completed. Database check constraint bu değerleri doğrular.
    // Yazılmazsa: rozet ve tamamlama raporu hangi kayıt tamamlandı anlayamaz.
    status,

    // Scroll, aktif tab, quiz sonucu gibi esnek detaylar.
    // Yazılmazsa: konu bilinir ama sayfa içi ayrıntı kaybolur.
    last_position: lastPosition,

    // Sadece tamamlandıysa tarih yazılır.
    // Yazılmazsa: tamamlanan konunun ne zaman bittiğini gösteremeyiz.
    completed_at: status === 'completed' ? new Date().toISOString() : null,

    // Resume için "en son güncellenen kayıt" sıralamasında kullanılır.
    // Yazılmazsa: geri dönüşte eski bir kayıt açılabilir.
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    // Hangi tabloya yazacağımızı seçeriz.
    // Yazılmazsa: Supabase isteği nereye gideceğini bilemez.
    .from('user_progress')

    // upsert: varsa güncelle, yoksa ekle.
    // onConflict, unique (user_id, lesson_slug, topic_slug) kuralını hedefler.
    // Yazılmazsa: aynı konu için her kayıtta yeni satır oluşabilir.
    .upsert(row, { onConflict: 'user_id,lesson_slug,topic_slug' })

    // Kaydedilen son hali UI'a geri döndürür.
    // Yazılmazsa: UI başarılı kaydı hemen gösteremeyebilir.
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loadResumePoint(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    // Şimdilik tüm kolonları alıyoruz; production'da sadece gereken kolonlar seçilebilir.
    // Yazılmazsa: route, topic ve last_position bilgisini okuyamayız.
    .select('*')
    // Sadece giriş yapan kullanıcının kayıtları.
    // Yazılmazsa: yanlış kullanıcının progress bilgisi gelebilir.
    .eq('user_id', userId)
    // En güncel kayıt en üste gelsin.
    // Yazılmazsa: kullanıcı son kaldığı yer yerine eski bir konudan devam edebilir.
    .order('updated_at', { ascending: false })
    .limit(1)
    // Kayıt yoksa hata değil null dönsün.
    // Yazılmazsa: ilk kez gelen kullanıcıda gereksiz hata gösterilir.
    .maybeSingle();

  if (error) throw error;
  return data;
}`;

const badgeCode = `// src/features/badges/badgeApi.js
// Badge API, tamamlanan konu sayısına göre rozet verme işini tek yerde toplar.
// Yazılmazsa: rozet kuralları farklı component'lere dağılır.
import { supabase } from '../../lib/supabaseClient';

export async function awardFirstTopicBadge(userId) {
  const { count, error: countError } = await supabase
    .from('user_progress')
    // head true: satırları indirme, sadece exact count iste.
    // Yazılmazsa: gereksiz veri çekerek uygulamayı yavaşlatırsın.
    .select('id', { count: 'exact', head: true })
    // Sadece bu kullanıcının tamamladığı kayıtları say.
    // Yazılmazsa: tüm kullanıcıların toplamı bu kullanıcıya rozet verebilir.
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (countError) throw countError;

  // Henüz tamamlanan konu yoksa rozet verme.
  // Yazılmazsa: kullanıcı hiçbir şey bitirmeden rozet alabilir.
  if (!count || count < 1) return null;

  const { data, error } = await supabase
    .from('user_badges')
    // upsert + onConflict aynı rozeti ikinci kez yazmayı engeller.
    // Yazılmazsa: kullanıcı aynı rozeti tekrar tekrar alabilir.
    .upsert({ user_id: userId, badge_id: 'first-topic' }, { onConflict: 'user_id,badge_id' })
    .select('badge_id, awarded_at')
    .single();

  if (error) throw error;
  return data;
}`;

const feedbackCode = `// src/features/feedback/feedbackApi.js
// Feedback API, öneri/eleştiri formundan gelen metni database'e kaydeder.
// Yazılmazsa: kullanıcı görüşleri sadece tarayıcıda kalır ve kaybolur.
import { supabase } from '../../lib/supabaseClient';

export async function submitFeedback({ userId, type, message, pagePath }) {
  // Baş/son boşlukları temizleriz.
  // Yazılmazsa: "   güzel fikir   " gibi kirli veri saklanır.
  const cleaned = message.trim();

  // Client tarafında hızlı kontrol; database de check constraint ile tekrar korur.
  // Yazılmazsa: kullanıcı boş veya anlamsız kısa mesaj gönderebilir.
  if (cleaned.length < 10) throw new Error('Feedback en az 10 karakter olmalı.');

  const { data, error } = await supabase
    .from('feedback')
    .insert({
      // RLS policy bu kullanıcıyı auth.uid() ile eşleştirir.
      // Yazılmazsa: insert güvenlik kontrolünden geçmez.
      user_id: userId,
      // suggestion, bug, praise veya other.
      // Yazılmazsa: admin panelinde feedback sınıflandırması yapılamaz.
      type,
      // Temizlenmiş mesajı saklarız.
      message: cleaned,
      // Hangi sayfadan geldiğini bilmek iyileştirme önceliği verir.
      // Yazılmazsa: problemi hangi içerikte arayacağımızı bilemeyiz.
      page_path: pagePath,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}`;

const chatCode = `// src/features/chat/chatApi.js
// Chat API, eski mesajları yükler, yeni mesaj gönderir ve realtime aboneliği açar.
// Yazılmazsa: online kullanıcılar birbirini anlık göremez.
import { supabase } from '../../lib/supabaseClient';

export async function loadRecentMessages() {
  const { data, error } = await supabase
    .from('chat_messages')
    // Sadece UI'da göstereceğimiz kolonları seçeriz.
    // Yazılmazsa: gereksiz alanlar çekilir ve performans düşebilir.
    .select('id, display_name, message, created_at')
    // Son mesajları hızlı bulmak için newest first çekeriz.
    // Yazılmazsa: eski mesajlar öne gelebilir.
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  // Ekranda eski -> yeni sırası daha okunur olduğu için ters çeviririz.
  // Yazılmazsa: sohbet akışı kullanıcıya ters görünebilir.
  return data.reverse();
}

export async function sendMessage({ userId, displayName, message }) {
  const { error } = await supabase.from('chat_messages').insert({
    // RLS bu alanı auth.uid() ile kontrol eder.
    // Yazılmazsa: mesaj insert policy'den geçmez.
    user_id: userId,
    // O anki görünen adı mesajla birlikte saklarız.
    // Yazılmazsa: mesaj listesi her seferinde profiles tablosuna ihtiyaç duyar.
    display_name: displayName,
    // Boşlukları temizleyip göndeririz.
    // Yazılmazsa: boş görünen mesajlar chat'i kirletebilir.
    message: message.trim(),
  });
  if (error) throw error;
}

export function subscribeToChat(onMessage) {
  return supabase
    // Bu aboneliğin adı. Birden çok kanalı ayırmak için kullanılır.
    // Yazılmazsa: Realtime bağlantısını yönetmek ve kapatmak zorlaşır.
    .channel('learnqa-chat')
    .on(
      // Postgres tablosundaki değişiklikleri dinle.
      // Yazılmazsa: yeni mesaj için sayfayı yenilemek gerekir.
      'postgres_changes',
      // Sadece public.chat_messages INSERT olayları gelsin.
      // Yazılmazsa: gereksiz tablo/değişiklik eventleri dinlenebilir.
      { event: 'INSERT', schema: 'public', table: 'chat_messages' },
      // payload.new yeni eklenen mesaj satırıdır.
      // Yazılmazsa: gelen mesajı React state'e ekleyemeyiz.
      (payload) => onMessage(payload.new)
    )
    // Aboneliği başlatır.
    // Yazılmazsa: kanal tanımlanır ama dinleme başlamaz.
    .subscribe();
}`;

const envCode = `# .env.local
# Supabase Project Settings > API ekranındaki Project URL.
# Yazılmazsa: React uygulaması hangi Supabase projesine bağlanacağını bilemez.
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co

# Publishable key: tarayıcı tarafında kullanılabilir.
# Dikkat: service_role key buraya yazılmaz; o admin anahtarıdır.
# Yazılmazsa: Supabase client yetkili istek başlatamaz.
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxx`;

const installCode = `# Supabase JavaScript SDK'yı projeye ekler.
# Yazılmazsa: import { createClient } satırı module not found hatası verir.
npm install @supabase/supabase-js

# Vite geliştirme sunucusunu çalıştırır.
# Yazılmazsa: localde login/progress akışını tarayıcıda test edemezsin.
npm run dev`;

const supabaseFunctionConfigCode = `# supabase/config.toml
# Bu dosya Edge Function davranışını deploy ortamında kalıcı hale getirir.
# Yazılmazsa: Stripe/iZico webhook istekleri Supabase JWT taşımadığı için 401 ile koduna ulaşmadan reddedilebilir.

[functions.create-stripe-checkout]
verify_jwt = true

[functions.create-iyzico-checkout]
verify_jwt = true

# Webhook endpointleri public çağrılır; güvenlik JWT ile değil provider imzasıyla sağlanır.
# Yazılmazsa: Stripe ve iZico webhooklarında Authorization: Bearer <Supabase JWT> olmadığı için gateway 401 döner.
[functions.stripe-webhook]
verify_jwt = false

[functions.iyzico-webhook]
verify_jwt = false`;

const premiumSchemaSql = `-- Premium üyelik ve paywall şeması.
-- Nerede çalıştırılır: Supabase Dashboard > SQL Editor > New query.
-- Amaç: 1 dolar veya yerel karşılığı ödeme yapan kullanıcıya tüm içerik erişimi vermek.
-- Güvenlik: is_premium alanını React değil, sadece webhook Edge Function günceller.

-- Gerekirse uuid üretimi için pgcrypto açılır.
-- Yazılmazsa: payment_intents.id için gen_random_uuid() çalışmayabilir.
create extension if not exists pgcrypto;

-- profiles tablosuna premium durumunu ekliyoruz.
-- is_premium: hızlı UI ve RLS kontrolü için ana bayrak.
-- premium_until: süreli üyelik istiyorsan bitiş tarihi; null ise süresiz kabul edilebilir.
-- payment_provider: premiumu hangi sağlayıcı verdi? stripe, iyzico veya manual.
alter table public.profiles
  add column if not exists is_premium boolean not null default false,
  add column if not exists premium_started_at timestamptz,
  add column if not exists premium_until timestamptz,
  add column if not exists payment_provider text check (payment_provider in ('stripe', 'iyzico', 'manual')),
  add column if not exists stripe_customer_id text,
  add column if not exists iyzico_customer_reference text,
  add column if not exists premium_updated_at timestamptz;

-- Kritik: kullanıcı kendi profilini güncellerken premium kolonlarını değiştirememeli.
-- RLS satır seçer; kolon güvenliği için grant/revoke kullanıyoruz.
-- Yazılmazsa: mevcut "users update own profile" policy ile kullanıcı is_premium değerini elle true yapmaya çalışabilir.
revoke update on public.profiles from authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;

-- lessons: hangi ders ücretsiz, hangi ders premium? Bunu database bilsin.
-- Client-side slug listesi sadece UI ipucu olabilir; gerçek bariyer burada olmalı.
create table if not exists public.lessons (
  lesson_slug text primary key,
  title text not null,
  sort_order int not null,
  is_free boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Örnek ilk 3 ücretsiz ders. Gerçek müfredat sırası farklıysa sort_order ve is_free değerlerini değiştir.
insert into public.lessons (lesson_slug, title, sort_order, is_free)
values
  ('selenium', 'Selenium', 1, true),
  ('playwright', 'Playwright', 2, true),
  ('cypress', 'Cypress', 3, true),
  ('python', 'Python', 4, false),
  ('typescript', 'TypeScript', 5, false),
  ('sql', 'SQL', 6, false),
  ('backend', 'Basit Backend', 7, false)
on conflict (lesson_slug) do update
set title = excluded.title,
    sort_order = excluded.sort_order,
    is_free = excluded.is_free,
    is_active = true;

-- lesson_contents: korumak istediğin video URL, markdown, özel içerik veya dosya referansı burada tutulur.
-- Statik GitHub Pages dosyasına koyduğun şey gizli değildir; premium içerik DB veya private Storage arkasında olmalı.
create table if not exists public.lesson_contents (
  id bigint generated always as identity primary key,
  lesson_slug text not null references public.lessons(lesson_slug) on delete cascade,
  topic_slug text not null,
  content_type text not null check (content_type in ('markdown', 'video_url', 'storage_path')),
  content_body text not null,
  created_at timestamptz not null default now(),
  unique (lesson_slug, topic_slug, content_type)
);

-- payment_intents: ödeme başlatılırken kullanıcı ile provider referansını eşleştirir.
-- iZico webhook içinde user_id yerine paymentConversationId gelir; user_id buradan bulunur.
create table if not exists public.payment_intents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('stripe', 'iyzico')),
  -- Stripe için Checkout Session id, iZico için Checkout Form token tutulur.
  -- Yazılmazsa: provider tarafındaki ödeme oturumu ile bizim kayıt eşleşmez.
  provider_reference text unique,
  -- iZico paymentConversationId bu alanla eşleşir.
  -- create-iyzico-checkout bu alanı yazmazsa iyzico-webhook user_id bulamaz.
  conversation_id text unique,
  amount_minor int not null,
  currency text not null,
  status text not null default 'created' check (status in ('created', 'paid', 'failed', 'expired')),
  checkout_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- payment_events: webhook eventlerini idempotent işler.
-- unique(provider, provider_event_id): Stripe/iZico aynı webhooku tekrar gönderirse premiumu tekrar tekrar yazmayız.
create table if not exists public.payment_events (
  id bigint generated always as identity primary key,
  provider text not null check (provider in ('stripe', 'iyzico')),
  provider_event_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  amount_minor int,
  currency text,
  status text not null,
  raw_payload jsonb not null,
  processed_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create index if not exists idx_lessons_free_order on public.lessons (is_free, sort_order);
create index if not exists idx_lesson_contents_lesson_topic on public.lesson_contents (lesson_slug, topic_slug);
create index if not exists idx_payment_intents_user_provider on public.payment_intents (user_id, provider);

-- Premium kontrolünü tek fonksiyonda topluyoruz.
-- security definer: RLS policy içinde profiles okurken recursive policy tuzağına düşmemek için.
-- exists: kullanıcı yoksa false döner.
create or replace function public.is_premium_user(check_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = check_user_id
      and p.is_premium = true
      and (p.premium_until is null or p.premium_until > now())
  );
$$;

-- Ders erişim kontrolü: ücretsiz ders herkese, kilitli ders sadece premium kullanıcıya.
create or replace function public.can_access_lesson(check_lesson_slug text, check_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.lessons l
    where l.lesson_slug = check_lesson_slug
      and l.is_active = true
      and (
        l.is_free = true
        or (check_user_id is not null and public.is_premium_user(check_user_id))
      )
  );
$$;

revoke all on function public.is_premium_user(uuid) from public;
revoke all on function public.can_access_lesson(text, uuid) from public;
grant execute on function public.is_premium_user(uuid) to anon, authenticated;
grant execute on function public.can_access_lesson(text, uuid) to anon, authenticated;`;

const premiumRlsSql = `-- Premium paywall RLS kuralları.
-- Önce yeni tabloları kilitle.
alter table public.lessons enable row level security;
alter table public.lesson_contents enable row level security;
alter table public.payment_intents enable row level security;
alter table public.payment_events enable row level security;

-- Ders başlıkları/müfredat herkese görünebilir.
-- Böylece standart üye kilitli dersin başlığını görür ama içeriği alamaz.
drop policy if exists "lesson catalog is public" on public.lessons;
create policy "lesson catalog is public"
on public.lessons for select to anon, authenticated
using (is_active = true);

-- İçerik asıl korunan veri. Ücretsiz dersler herkese, premium dersler sadece premium üyeye.
-- Client-side modal sadece UX; gerçek güvenlik bu policy.
drop policy if exists "lesson content follows paywall" on public.lesson_contents;
create policy "lesson content follows paywall"
on public.lesson_contents for select to anon, authenticated
using (public.can_access_lesson(lesson_slug, (select auth.uid())));

-- Payment intent: kullanıcı sadece kendi başlattığı ödeme kayıtlarını görebilir.
-- Insert/update işlemini normal client değil Edge Function service role yapar.
drop policy if exists "users read own payment intents" on public.payment_intents;
create policy "users read own payment intents"
on public.payment_intents for select to authenticated
using ((select auth.uid()) = user_id);

-- payment_events ham webhook kayıtları client'a açılmaz.
-- Policy yazmıyoruz: RLS açık + policy yok = browser erişemez.

-- Karar (2026-06-22): user_progress, lessons/can_access_lesson'a BAĞLI DEĞİLDİR.
-- "Kaldığım yeri kaydet" özelliği site genelinde (Java, JMeter, Docker dahil ~30 sayfa)
-- çalışmalı; bu sayfaların hiçbiri premium "lessons" tablosunda kayıtlı değil. Paywall
-- sadece kilitli ders İÇERİĞİNİ (lesson_contents) korur, progress kaydını korumaz.
-- Yazılmazsa: can_access_lesson() lessons tablosunda olmayan her sayfa için false
-- döner ve "kaldığım yeri kaydet" o sayfalarda RLS hatasıyla başarısız olur.
drop policy if exists "users read own progress" on public.user_progress;
drop policy if exists "users write own progress" on public.user_progress;
drop policy if exists "users update own progress" on public.user_progress;
drop policy if exists "users read own allowed progress" on public.user_progress;
drop policy if exists "users insert own allowed progress" on public.user_progress;
drop policy if exists "users update own allowed progress" on public.user_progress;

create policy "users read own progress"
on public.user_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "users insert own progress"
on public.user_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "users update own progress"
on public.user_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Karar (2026-06-21): Rozetler, feedback ve chat ÜCRETSİZ üyelere de açıktır.
-- Paywall sadece kilitli ders İÇERİĞİNİ (lesson_contents) korur — yukarıdaki
-- "lesson content follows paywall" policy'si.
-- Yazılmazsa: prod'da premium hiç satılmadığı için rozet/feedback/chat fiilen kimseye açılmaz.
drop policy if exists "users read own badges" on public.user_badges;
create policy "users read own badges"
on public.user_badges for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "users write own feedback" on public.feedback;
drop policy if exists "users read own feedback" on public.feedback;

create policy "users write own feedback"
on public.feedback for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "users read own feedback"
on public.feedback for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "signed in users read chat" on public.chat_messages;
drop policy if exists "signed in users send chat" on public.chat_messages;
drop policy if exists "users delete own chat messages" on public.chat_messages;

create policy "signed in users read chat"
on public.chat_messages for select to authenticated using (true);

create policy "signed in users send chat"
on public.chat_messages for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "users delete own chat messages"
on public.chat_messages for delete to authenticated
using ((select auth.uid()) = user_id);`;

const stripeCheckoutFunctionCode = `// supabase/functions/create-stripe-checkout/index.ts
// Amaç: React sadece bu Edge Function'ı çağırır; Stripe secret key tarayıcıya hiç gitmez.
import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20',
});

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Kullanıcıyı Authorization header içindeki Supabase JWT ile doğrula.
  // Yazılmazsa: ödeme session'ı sahipsiz başlar ve webhook user_id bulamaz.
  const authHeader = request.headers.get('Authorization') ?? '';
  const supabaseUser = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: userData, error: userError } = await supabaseUser.auth.getUser();
  if (userError || !userData.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Admin client sadece Edge Function içinde kullanılır; RLS bypass eder.
  // Yazılmazsa: payment_intents kaydını güvenli şekilde server tarafında oluşturamayız.
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const userId = userData.user.id;
  const origin = request.headers.get('Origin') ?? 'https://learnqa.dev';

  const { data: intent, error: intentError } = await supabaseAdmin
    .from('payment_intents')
    .insert({
      user_id: userId,
      provider: 'stripe',
      amount_minor: 100,
      currency: 'usd',
      status: 'created',
    })
    .select('id')
    .single();

  if (intentError) {
    return new Response(intentError.message, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: origin + '/backend?payment=success',
    cancel_url: origin + '/backend?payment=cancel',
    client_reference_id: userId,
    metadata: {
      user_id: userId,
      payment_intent_id: intent.id,
      product: 'learnqa_premium',
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: { name: 'LearnQA.dev Premium Membership' },
        },
        quantity: 1,
      },
    ],
  });

  await supabaseAdmin
    .from('payment_intents')
    .update({ provider_reference: session.id, checkout_url: session.url })
    .eq('id', intent.id);

  return Response.json({ url: session.url });
});`;

const iyzicoCheckoutFunctionCode = `// supabase/functions/create-iyzico-checkout/index.ts
// Amaç: iZico Checkout Form oturumunu server-side başlatmak.
// Kart bilgisi iZico sayfasında kalır; IYZICO_API_KEY ve IYZICO_SECRET_KEY tarayıcıya çıkmaz.
import { createClient } from 'npm:@supabase/supabase-js@2';

const IYZICO_BASE_URL = Deno.env.get('IYZICO_BASE_URL') ?? 'https://sandbox-api.iyzipay.com';
const CHECKOUT_INITIALIZE_PATH = '/payment/iyzipos/checkoutform/initialize/auth/ecom';

async function hmacSha256Hex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function createIyzicoAuthorization(path: string, body: string) {
  const apiKey = Deno.env.get('IYZICO_API_KEY')!;
  const secretKey = Deno.env.get('IYZICO_SECRET_KEY')!;
  const randomKey = String(Date.now()) + crypto.randomUUID().replaceAll('-', '');

  // iZico HMACSHA256 Auth: HMACSHA256(randomKey + uri.path + request.body, secretKey)
  // Yazılmazsa: CF-Initialize isteği iZico tarafından unauthorized döner.
  const signature = await hmacSha256Hex(secretKey, randomKey + path + body);
  const authorizationString =
    'apiKey:' + apiKey + '&randomKey:' + randomKey + '&signature:' + signature;

  return {
    authorization: 'IYZWSv2 ' + btoa(authorizationString),
    randomKey,
  };
}

function moneyToMinorUnit(value: string) {
  return Math.round(Number(value) * 100);
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const authHeader = request.headers.get('Authorization') ?? '';
  const supabaseUser = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: userData, error: userError } = await supabaseUser.auth.getUser();
  if (userError || !userData.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const bodyFromClient = await request.json().catch(() => ({}));
  const buyer = bodyFromClient.buyer ?? {};
  const requiredBuyerFields = ['name', 'surname', 'identityNumber', 'email', 'gsmNumber', 'address', 'city', 'country'];
  const missing = requiredBuyerFields.filter((field) => !buyer[field]);
  if (missing.length) {
    return Response.json({ error: 'Missing iyzico buyer fields', missing }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const userId = userData.user.id;
  const origin = request.headers.get('Origin') ?? 'https://learnqa.dev';
  const conversationId = crypto.randomUUID();
  const price = Deno.env.get('IYZICO_PREMIUM_PRICE') ?? '35.00';
  const currency = Deno.env.get('IYZICO_PREMIUM_CURRENCY') ?? 'TRY';
  const callbackUrl = Deno.env.get('IYZICO_CALLBACK_URL') ?? origin + '/backend?payment=iyzico-return';

  const { data: intent, error: intentError } = await supabaseAdmin
    .from('payment_intents')
    .insert({
      user_id: userId,
      provider: 'iyzico',
      conversation_id: conversationId,
      amount_minor: moneyToMinorUnit(price),
      currency,
      status: 'created',
    })
    .select('id, conversation_id')
    .single();

  if (intentError) {
    return new Response(intentError.message, { status: 500 });
  }

  const iyzicoPayload = {
    locale: 'tr',
    conversationId,
    price,
    paidPrice: price,
    currency,
    basketId: 'learnqa-premium-' + intent.id,
    paymentGroup: 'PRODUCT',
    callbackUrl,
    enabledInstallments: [1],
    buyer: {
      id: userId,
      name: buyer.name,
      surname: buyer.surname,
      identityNumber: buyer.identityNumber,
      email: buyer.email,
      gsmNumber: buyer.gsmNumber,
      registrationAddress: buyer.address,
      city: buyer.city,
      country: buyer.country,
      zipCode: buyer.zipCode ?? '34000',
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1',
    },
    billingAddress: {
      address: buyer.address,
      contactName: buyer.name + ' ' + buyer.surname,
      city: buyer.city,
      country: buyer.country,
      zipCode: buyer.zipCode ?? '34000',
    },
    basketItems: [
      {
        id: 'learnqa-premium',
        name: 'LearnQA.dev Premium Membership',
        category1: 'Education',
        itemType: 'VIRTUAL',
        price,
      },
    ],
  };

  const requestBody = JSON.stringify(iyzicoPayload);
  const auth = await createIyzicoAuthorization(CHECKOUT_INITIALIZE_PATH, requestBody);

  const iyzicoResponse = await fetch(IYZICO_BASE_URL + CHECKOUT_INITIALIZE_PATH, {
    method: 'POST',
    headers: {
      Authorization: auth.authorization,
      'x-iyzi-rnd': auth.randomKey,
      'Content-Type': 'application/json',
    },
    body: requestBody,
  });

  const checkout = await iyzicoResponse.json();
  if (!iyzicoResponse.ok || checkout.status !== 'success') {
    await supabaseAdmin
      .from('payment_intents')
      .update({ status: 'failed', updated_at: new Date().toISOString() })
      .eq('id', intent.id);

    return Response.json({ error: 'iyzico checkout initialize failed', details: checkout }, { status: 502 });
  }

  await supabaseAdmin
    .from('payment_intents')
    .update({
      provider_reference: checkout.token,
      checkout_url: checkout.paymentPageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', intent.id);

  return Response.json({
    url: checkout.paymentPageUrl,
    token: checkout.token,
    conversationId: intent.conversation_id,
  });
});`;

const stripeWebhookFunctionCode = `// supabase/functions/stripe-webhook/index.ts
// Stripe Dashboard webhook URL:
// https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook
// Dinlenecek event: checkout.session.completed
import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20',
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

function premiumUntilOneYear() {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = request.headers.get('Stripe-Signature');
  const body = await request.text();

  let event: Stripe.Event;
  try {
    // Raw body + Stripe-Signature olmadan webhook kabul edilmez.
    // Yazılmazsa: saldırgan sahte JSON POST edip kendini premium yapabilir.
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    );
  } catch (error) {
    return new Response('Invalid Stripe signature', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return Response.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.user_id ?? session.client_reference_id;
  const amount = session.amount_total ?? 0;
  const currency = session.currency ?? 'usd';

  if (!userId || session.payment_status !== 'paid' || amount < 100 || currency !== 'usd') {
    return new Response('Payment is not valid for premium', { status: 400 });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { error: eventError } = await supabaseAdmin.from('payment_events').insert({
    provider: 'stripe',
    provider_event_id: event.id,
    user_id: userId,
    amount_minor: amount,
    currency,
    status: 'paid',
    raw_payload: JSON.parse(body),
  });

  if (eventError?.code === '23505') {
    return Response.json({ ok: true, duplicate: true });
  }
  if (eventError) {
    return new Response(eventError.message, { status: 500 });
  }

  await supabaseAdmin
    .from('payment_intents')
    .update({ status: 'paid', updated_at: new Date().toISOString() })
    .eq('provider_reference', session.id);

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({
      is_premium: true,
      premium_started_at: new Date().toISOString(),
      premium_until: premiumUntilOneYear(),
      payment_provider: 'stripe',
      premium_updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (profileError) {
    return new Response(profileError.message, { status: 500 });
  }

  return Response.json({ ok: true });
});`;

const iyzicoWebhookFunctionCode = `// supabase/functions/iyzico-webhook/index.ts
// iZico Merchant Portal webhook URL:
// https://YOUR_PROJECT_REF.supabase.co/functions/v1/iyzico-webhook
// Not: iZico hesabında X-IYZ-SIGNATURE-V3 aktif olmalı.
import { createClient } from 'npm:@supabase/supabase-js@2';

const IYZICO_BASE_URL = Deno.env.get('IYZICO_BASE_URL') ?? 'https://sandbox-api.iyzipay.com';
const CHECKOUT_RETRIEVE_PATH = '/payment/iyzipos/checkoutform/auth/ecom/detail';

async function hmacSha256Hex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const left = encoder.encode(a.trim().toLowerCase());
  const right = encoder.encode(b.trim().toLowerCase());
  let diff = left.length ^ right.length;
  const max = Math.max(left.length, right.length);

  for (let i = 0; i < max; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }

  return diff === 0;
}

async function createIyzicoAuthorization(path: string, body: string) {
  const apiKey = Deno.env.get('IYZICO_API_KEY')!;
  const secretKey = Deno.env.get('IYZICO_SECRET_KEY')!;
  const randomKey = String(Date.now()) + crypto.randomUUID().replaceAll('-', '');
  const signature = await hmacSha256Hex(secretKey, randomKey + path + body);
  const authorizationString =
    'apiKey:' + apiKey + '&randomKey:' + randomKey + '&signature:' + signature;

  return {
    authorization: 'IYZWSv2 ' + btoa(authorizationString),
    randomKey,
  };
}

function moneyToMinorUnit(value: unknown) {
  return Math.round(Number(value) * 100);
}

async function retrieveCheckoutResult(token: string, conversationId: string) {
  const requestBody = JSON.stringify({
    locale: 'tr',
    conversationId,
    token,
  });
  const auth = await createIyzicoAuthorization(CHECKOUT_RETRIEVE_PATH, requestBody);

  const response = await fetch(IYZICO_BASE_URL + CHECKOUT_RETRIEVE_PATH, {
    method: 'POST',
    headers: {
      Authorization: auth.authorization,
      'x-iyzi-rnd': auth.randomKey,
      'Content-Type': 'application/json',
    },
    body: requestBody,
  });

  const result = await response.json();
  if (!response.ok || result.status !== 'success') {
    throw new Error('iyzico retrieve failed');
  }

  return result;
}

function premiumUntilOneYear() {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const rawBody = await request.text();
  const payload = JSON.parse(rawBody);
  const receivedSignature = request.headers.get('X-IYZ-SIGNATURE-V3') ?? '';
  const secretKey = Deno.env.get('IYZICO_SECRET_KEY')!;

  // Direct format: secretKey + iyziEventType + paymentId + paymentConversationId + status
  // HPP/Checkout Form format: secretKey + iyziEventType + iyziPaymentId + token + paymentConversationId + status
  // Resmi dokümanda sonuç HEX encoded HMAC-SHA256 olmalı.
  const isHpp = Boolean(payload.token);
  const signatureMessage = isHpp
    ? secretKey + payload.iyziEventType + payload.iyziPaymentId + payload.token + payload.paymentConversationId + payload.status
    : secretKey + payload.iyziEventType + payload.paymentId + payload.paymentConversationId + payload.status;

  const expectedSignature = await hmacSha256Hex(secretKey, signatureMessage);
  if (!timingSafeEqual(expectedSignature, receivedSignature)) {
    return new Response('Invalid iyzico signature', { status: 400 });
  }

  if (payload.status !== 'SUCCESS') {
    return Response.json({ ok: true, ignored: payload.status });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: intent, error: intentError } = await supabaseAdmin
    .from('payment_intents')
    .select('id, user_id, amount_minor, currency')
    .eq('conversation_id', payload.paymentConversationId)
    .eq('provider', 'iyzico')
    .single();

  if (intentError || !intent) {
    return new Response('Unknown payment conversation', { status: 400 });
  }

  // Checkout Form webhook token taşır. Token ile CF-Retrieve yapıp tutar/para birimini tekrar doğrularız.
  // Yazılmazsa: sadece webhook SUCCESS değerine güvenmiş oluruz.
  if (!payload.token) {
    return new Response('Missing iyzico checkout token', { status: 400 });
  }

  let retrieveResult;
  try {
    retrieveResult = await retrieveCheckoutResult(payload.token, payload.paymentConversationId);
  } catch {
    return new Response('Could not verify iyzico payment result', { status: 400 });
  }

  const paidMinor = moneyToMinorUnit(retrieveResult.paidPrice);
  const currency = String(retrieveResult.currency ?? '').toUpperCase();
  const fraudApproved = retrieveResult.fraudStatus === 1 || retrieveResult.fraudStatus === '1';

  if (
    retrieveResult.paymentStatus !== 'SUCCESS'
    || !fraudApproved
    || paidMinor < intent.amount_minor
    || currency !== String(intent.currency).toUpperCase()
  ) {
    return new Response('iyzico payment amount/currency/fraud check failed', { status: 400 });
  }

  const providerEventId = payload.iyziReferenceCode ?? payload.iyziPaymentId ?? retrieveResult.paymentId;
  const { error: eventError } = await supabaseAdmin.from('payment_events').insert({
    provider: 'iyzico',
    provider_event_id: String(providerEventId),
    user_id: intent.user_id,
    amount_minor: paidMinor,
    currency,
    status: 'paid',
    raw_payload: { webhook: payload, retrieve: retrieveResult },
  });

  if (eventError?.code === '23505') {
    return Response.json({ ok: true, duplicate: true });
  }
  if (eventError) {
    return new Response(eventError.message, { status: 500 });
  }

  await supabaseAdmin
    .from('payment_intents')
    .update({ status: 'paid', updated_at: new Date().toISOString() })
    .eq('id', intent.id);

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({
      is_premium: true,
      premium_started_at: new Date().toISOString(),
      premium_until: premiumUntilOneYear(),
      payment_provider: 'iyzico',
      premium_updated_at: new Date().toISOString(),
    })
    .eq('id', intent.user_id);

  if (profileError) {
    return new Response(profileError.message, { status: 500 });
  }

  return Response.json({ ok: true });
});`;

const paywallFrontendCode = `// src/features/premium/premiumApi.js
// Bu kod sadece UI deneyimi içindir; gerçek güvenlik Supabase RLS tarafındadır.
import { supabase } from '../../lib/supabaseClient';

export async function loadMyProfile() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, avatar_url, is_premium, premium_until, payment_provider')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export function hasActivePremium(profile) {
  if (!profile?.is_premium) return false;
  if (!profile.premium_until) return true;
  return new Date(profile.premium_until).getTime() > Date.now();
}

// İlk 3 ders UI ipucu. Asıl yetki lessons + lesson_contents RLS ile korunur.
export const FREE_LESSON_SLUGS = ['selenium', 'playwright', 'cypress'];

export function canOpenLessonInUi(lessonSlug, profile) {
  return FREE_LESSON_SLUGS.includes(lessonSlug) || hasActivePremium(profile);
}

export async function loadLessonContent(lessonSlug, topicSlug) {
  const { data, error } = await supabase
    .from('lesson_contents')
    .select('content_type, content_body')
    .eq('lesson_slug', lessonSlug)
    .eq('topic_slug', topicSlug);

  if (error) throw error;
  return data;
}

export async function startStripePremiumCheckout() {
  const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
    body: { product: 'learnqa_premium' },
  });

  if (error) throw error;
  window.location.href = data.url;
}

export async function startIyzicoPremiumCheckout(buyer) {
  // buyer alanları iZico Checkout Form için gereklidir.
  // Örnek: { name, surname, identityNumber, email, gsmNumber, address, city, country, zipCode }
  // Yazılmazsa: create-iyzico-checkout Edge Function eksik buyer bilgisiyle 400 döner.
  const { data, error } = await supabase.functions.invoke('create-iyzico-checkout', {
    body: {
      product: 'learnqa_premium',
      buyer,
    },
  });

  if (error) throw error;
  window.location.href = data.url;
}`;

const schemaGuideBlock = {
  type: 'code-guide',
  icon: '🔎',
  title: { tr: 'Kod Rehberi: tablo satırları', en: 'Code Guide: table lines' },
  items: [
    {
      line: 'id uuid primary key references auth.users(id) on delete cascade',
      meaning: {
        tr: 'Profil satırının kimliğini Supabase Auth kullanıcısına birebir bağlar.',
        en: 'Links the profile row id directly to the Supabase Auth user id.',
      },
      why: {
        tr: 'Google ile giriş yapan kişiyle public profil bilgisini güvenli eşleştirir.',
        en: 'Safely connects the Google login user to the public profile data.',
      },
      missing: {
        tr: 'Profil kaydı sahipsiz kalabilir; kullanıcı silindiğinde eski profil database içinde kalır.',
        en: 'Profile rows can become ownerless; deleted users may leave stale profiles behind.',
      },
    },
    {
      line: 'unique (user_id, lesson_slug, topic_slug)',
      meaning: {
        tr: 'Bir kullanıcının aynı ders ve aynı konu için yalnızca bir progress satırı olmasını sağlar.',
        en: 'Allows only one progress row for the same user, lesson, and topic.',
      },
      why: {
        tr: 'upsert bu benzersiz kurala bakıp mevcut satırı günceller.',
        en: 'upsert uses this uniqueness rule to update the existing row.',
      },
      missing: {
        tr: 'Her kaydetmede yeni satır açılır; kaldığı yer hesaplaması karışır.',
        en: 'Every save can create another row; resume logic becomes confusing.',
      },
    },
    {
      line: "status text not null default 'started' check (...)",
      meaning: {
        tr: 'Progress durumunu sadece started veya completed değerleriyle sınırlar.',
        en: 'Restricts progress status to started or completed.',
      },
      why: {
        tr: 'Rozet ve raporlama kodu tutarlı durum değerlerine ihtiyaç duyar.',
        en: 'Badge and reporting code needs consistent status values.',
      },
      missing: {
        tr: 'finish, done, bitirdim gibi karışık değerler rozet mantığını bozar.',
        en: 'Mixed values such as finish or done can break badge logic.',
      },
    },
    {
      line: "last_position jsonb not null default '{}'::jsonb",
      meaning: {
        tr: 'Scroll, aktif tab veya quiz durumu gibi esnek konum bilgisini JSON olarak saklar.',
        en: 'Stores flexible resume details like scroll, active tab, or quiz state as JSON.',
      },
      why: {
        tr: 'Sadece konu değil, konu içindeki tam nokta da geri yüklenebilir.',
        en: 'The app can restore the exact place inside the topic, not only the topic itself.',
      },
      missing: {
        tr: 'Kullanıcı doğru konuya gelse bile sayfa içinde kaldığı ayrıntı kaybolur.',
        en: 'The user may return to the right topic but lose the exact in-page position.',
      },
    },
    {
      line: "message text not null check (char_length(message) between 1 and 500)",
      meaning: {
        tr: 'Chat mesajını zorunlu yapar ve uzunluğunu güvenli aralıkta tutar.',
        en: 'Requires a chat message and keeps its length in a safe range.',
      },
      why: {
        tr: 'Boş veya aşırı uzun mesajların sohbet deneyimini bozmasını engeller.',
        en: 'Prevents empty or overly long messages from harming the chat experience.',
      },
      missing: {
        tr: 'Chat boş kayıtlarla veya dev metinlerle kirlenebilir.',
        en: 'Chat can be polluted with empty rows or huge text messages.',
      },
    },
    {
      line: 'on conflict (id) do nothing',
      meaning: {
        tr: 'Aynı rozet id zaten varsa insert işlemini sessizce atlar.',
        en: 'Skips the insert when the same badge id already exists.',
      },
      why: {
        tr: 'SQL dosyasını tekrar çalıştırırken migration akışını güvenli tutar.',
        en: 'Keeps the migration flow safe when the SQL file is run again.',
      },
      missing: {
        tr: 'İkinci çalıştırmada duplicate key hatası alırsın ve kurulum durur.',
        en: 'Running it a second time throws a duplicate key error and setup stops.',
      },
    },
  ],
};

const rlsGuideBlock = {
  type: 'code-guide',
  icon: '🛡️',
  title: { tr: 'Kod Rehberi: güvenlik policy mantığı', en: 'Code Guide: security policy logic' },
  items: [
    {
      line: 'alter table ... enable row level security',
      meaning: {
        tr: 'Tablodaki her satır için policy kontrolünü açar.',
        en: 'Turns on policy checks for every row in the table.',
      },
      why: {
        tr: 'Client tarafında publishable key kullanırken asıl güvenliği database sağlar.',
        en: 'The database provides the real protection while the client uses a publishable key.',
      },
      missing: {
        tr: 'Policy yazsan bile aktif olmayabilir; veri beklediğinden daha açık kalabilir.',
        en: 'Policies may not protect anything; data can stay more open than expected.',
      },
    },
    {
      line: 'using ((select auth.uid()) = user_id)',
      meaning: {
        tr: 'Okuma/güncelleme isteyen kişinin kendi satırına baktığını kontrol eder.',
        en: 'Checks that the requester is reading or updating their own row.',
      },
      why: {
        tr: 'Kullanıcı sadece kendi progress, badge ve feedback kayıtlarını görmelidir.',
        en: 'Users should only see their own progress, badge, and feedback rows.',
      },
      missing: {
        tr: 'Başka kullanıcıların öğrenme geçmişi açığa çıkabilir.',
        en: 'Other users learning history can be exposed.',
      },
    },
    {
      line: 'with check ((select auth.uid()) = user_id)',
      meaning: {
        tr: 'Insert/update sonrası oluşacak yeni satırın da aynı kullanıcıya ait kalmasını sağlar.',
        en: 'Ensures the new inserted or updated row still belongs to the same user.',
      },
      why: {
        tr: 'Birinin başka user_id ile sahte kayıt yazmasını engeller.',
        en: 'Blocks someone from writing fake rows under another user id.',
      },
      missing: {
        tr: 'Kullanıcı kendi isteğinde user_id değiştirerek başkası adına veri yazabilir.',
        en: 'A user could change user_id in a request and write data for someone else.',
      },
    },
    {
      line: 'using (true)',
      meaning: {
        tr: 'Giriş yapan herkesin bu ortak veriyi okuyabileceğini söyler.',
        en: 'Allows every signed-in user to read shared data.',
      },
      why: {
        tr: 'Rozet katalogu ve chat geçmişi ortak görünür olmalıdır.',
        en: 'Badge catalog and chat history are meant to be shared.',
      },
      missing: {
        tr: 'Ortak liste UI tarafında boş görünebilir.',
        en: 'Shared lists may appear empty in the UI.',
      },
    },
  ],
};

const triggerGuideBlock = {
  type: 'code-guide',
  icon: '⚙️',
  title: { tr: 'Kod Rehberi: otomatik profil triggerı', en: 'Code Guide: automatic profile trigger' },
  items: [
    {
      line: 'security definer set search_path = public',
      meaning: {
        tr: 'Fonksiyonun güvenli yetkiyle ve doğru schema içinde çalışmasını sağlar.',
        en: 'Runs the function with safe permissions and the intended schema.',
      },
      why: {
        tr: 'auth.users olayından public.profiles tablosuna otomatik insert gerekir.',
        en: 'An auth.users event must automatically insert into public.profiles.',
      },
      missing: {
        tr: 'Trigger çalışırken permission veya yanlış schema hatası alabilirsin.',
        en: 'The trigger can fail with permission or wrong-schema errors.',
      },
    },
    {
      line: "coalesce(new.raw_user_meta_data->>'full_name', new.email)",
      meaning: {
        tr: 'Google adı varsa onu, yoksa email değerini display_name olarak kullanır.',
        en: 'Uses the Google full name when available, otherwise the email.',
      },
      why: {
        tr: 'Kullanıcı kartı ve sohbet mesajlarında boş isim görünmez.',
        en: 'Profile cards and chat messages avoid blank display names.',
      },
      missing: {
        tr: 'Ad gelmeyen hesaplarda kullanıcı isimsiz görünebilir.',
        en: 'Accounts without a name can appear anonymous.',
      },
    },
    {
      line: 'drop trigger if exists ...',
      meaning: {
        tr: 'Aynı trigger varsa önce kaldırır.',
        en: 'Removes the trigger first if it already exists.',
      },
      why: {
        tr: 'SQL dosyasını tekrar çalıştırmayı güvenli hale getirir.',
        en: 'Makes rerunning the SQL file safe.',
      },
      missing: {
        tr: 'İkinci çalıştırmada trigger already exists hatası alırsın.',
        en: 'A second run can fail with trigger already exists.',
      },
    },
    {
      line: 'after insert on auth.users',
      meaning: {
        tr: 'Yeni Auth kullanıcısı oluşur oluşmaz profil fonksiyonunu tetikler.',
        en: 'Triggers the profile function right after a new Auth user is created.',
      },
      why: {
        tr: 'Google login sonrası profile satırı elle oluşturulmadan hazır olur.',
        en: 'A profile row is ready after Google login without manual work.',
      },
      missing: {
        tr: 'Kullanıcı giriş yapar ama profile tablosunda satır oluşmaz.',
        en: 'The user can sign in but no profile row appears.',
      },
    },
  ],
};

const realtimeGuideBlock = {
  type: 'code-guide',
  icon: '📡',
  title: { tr: 'Kod Rehberi: realtime yayını', en: 'Code Guide: realtime publication' },
  items: [
    {
      line: 'alter publication supabase_realtime add table public.chat_messages',
      meaning: {
        tr: 'chat_messages tablosundaki yeni kayıtları Realtime kanalına açar.',
        en: 'Exposes new chat_messages rows to the Realtime channel.',
      },
      why: {
        tr: 'Online üyeler mesajı sayfa yenilemeden görmelidir.',
        en: 'Online users should see messages without refreshing.',
      },
      missing: {
        tr: 'Mesaj databasee yazılır ama diğer kullanıcıların ekranına anlık düşmez.',
        en: 'The message is saved, but other users do not receive it instantly.',
      },
    },
    {
      line: 'alter publication ... public.user_progress',
      meaning: {
        tr: 'Progress değişimlerini de realtime izlenebilir yapar.',
        en: 'Makes progress changes observable through realtime too.',
      },
      why: {
        tr: 'Aynı hesabın başka açık sekmesi progress değişimini hemen görebilir.',
        en: 'Another open tab for the same account can notice progress changes immediately.',
      },
      missing: {
        tr: 'Progress yine kaydedilir; sadece diğer sekmeler refresh olmadan görmez.',
        en: 'Progress is still saved; other tabs just will not see it until refresh.',
      },
    },
  ],
};

const authGuideBlock = {
  type: 'code-guide',
  icon: '🔐',
  title: { tr: 'Kod Rehberi: OAuth + Magic Link', en: 'Code Guide: OAuth + Magic Link' },
  items: [
    {
      line: "provider: 'google' | 'github' | 'azure'",
      meaning: {
        tr: 'Supabase hangi sosyal giriş sağlayıcısına gideceğini bu değerle anlar.',
        en: 'Supabase uses this value to choose the social login provider.',
      },
      why: {
        tr: 'Google, GitHub ve Microsoft butonları aynı fonksiyondan güvenli şekilde çalışır; Microsoft için provider adı azure olmalıdır.',
        en: 'Google, GitHub, and Microsoft buttons can share one safe function; Microsoft uses the azure provider id.',
      },
      missing: {
        tr: 'Yanlış provider adı OAuth ekranını açmaz veya Supabase hata döndürür.',
        en: 'A wrong provider id will not open the OAuth screen or Supabase will return an error.',
      },
    },
    {
      line: 'options.data.full_name',
      meaning: {
        tr: 'Şifresiz e-posta kaydındaki Ad Soyad bilgisini auth.users.raw_user_meta_data içine yazar.',
        en: 'Stores the full name from passwordless email signup in auth.users.raw_user_meta_data.',
      },
      why: {
        tr: 'Kullanıcıdan şifre istemeden sadece ad ve e-posta alırız; trigger daha sonra bu adı profiles tablosuna kopyalar.',
        en: 'We collect only name and email without a password; the trigger later copies the name into profiles.',
      },
      missing: {
        tr: 'Magic Link ile gelen kullanıcının profilinde Ad Soyad boş kalabilir.',
        en: 'A Magic Link user profile can end up without a full name.',
      },
    },
    {
      line: 'emailRedirectTo: getAuthRedirectUrl(next)',
      meaning: {
        tr: 'Magic Link tıklanınca kullanıcının hangi route’a döneceğini belirler.',
        en: 'Defines which route the user returns to after clicking the Magic Link.',
      },
      why: {
        tr: 'GitHub Pages üzerinde /auth/callback route’una güvenli dönüş gerekir.',
        en: 'A safe return to /auth/callback is required on GitHub Pages.',
      },
      missing: {
        tr: 'Kullanıcı linke tıkladığında yanlış sayfaya veya Supabase default URL’ye gidebilir.',
        en: 'The user can land on the wrong page or the Supabase default URL after clicking.',
      },
    },
    {
      line: 'exchangeCodeForSession(code)',
      meaning: {
        tr: 'PKCE dönüşünde URL’deki code değerini gerçek Supabase session’a çevirir.',
        en: 'Converts the PKCE code in the URL into a real Supabase session.',
      },
      why: {
        tr: 'OAuth veya Magic Link sonrası kullanıcıyı girişli kabul etmek için session oluşmalıdır.',
        en: 'A session must exist before the app treats the user as signed in.',
      },
      missing: {
        tr: 'Callback sayfası açılır ama kullanıcı uygulamada giriş yapmamış görünür.',
        en: 'The callback page opens, but the user may still appear signed out.',
      },
    },
    {
      line: 'email_confirmed_at is null then return new',
      meaning: {
        tr: 'E-posta doğrulanmadan profile satırı üretmeyi durdurur.',
        en: 'Stops profile creation until the email is confirmed.',
      },
      why: {
        tr: 'Magic Link isteği gönderildiğinde kullanıcı henüz linke tıklamamış olabilir.',
        en: 'When a Magic Link is requested, the user may not have clicked it yet.',
      },
      missing: {
        tr: 'Aktive olmamış kullanıcılar profiles tablosunda aktif kullanıcı gibi görünebilir.',
        en: 'Unactivated users can appear like active users in profiles.',
      },
    },
  ],
};

const authRedirectGuideBlock = {
  type: 'code-guide',
  icon: '🧭',
  title: { tr: 'Kod Rehberi: redirect ayarları', en: 'Code Guide: redirect settings' },
  items: [
    {
      line: 'Site URL: https://learnqa.dev',
      meaning: {
        tr: 'Supabase’in varsayılan geri dönüş adresidir.',
        en: 'The default return URL for Supabase Auth.',
      },
      why: {
        tr: 'Magic Link ve OAuth dönüşleri production domainini bilmelidir.',
        en: 'Magic Link and OAuth flows must know the production domain.',
      },
      missing: {
        tr: 'Linkler localhost veya yanlış Supabase default adresine dönebilir.',
        en: 'Links can return to localhost or an incorrect Supabase default URL.',
      },
    },
    {
      line: 'https://learnqa.dev/auth/callback',
      meaning: {
        tr: 'OAuth ve Magic Link sonrası session tamamlayan frontend route’udur.',
        en: 'The frontend route that completes the session after OAuth and Magic Link.',
      },
      why: {
        tr: 'redirectTo/emailRedirectTo içinde kullanılan URL allow list içinde olmalıdır.',
        en: 'The URL used by redirectTo/emailRedirectTo must be in the allow list.',
      },
      missing: {
        tr: 'Supabase redirect URL not allowed hatası verir.',
        en: 'Supabase returns a redirect URL not allowed error.',
      },
    },
    {
      line: 'Provider callback: /auth/v1/callback',
      meaning: {
        tr: 'Google, GitHub ve Microsoft developer console içine yazılan Supabase callback adresidir.',
        en: 'The Supabase callback URL entered in Google, GitHub, and Microsoft developer consoles.',
      },
      why: {
        tr: 'Sosyal sağlayıcı önce Supabase Auth’a döner; Supabase sonra frontend callback’e yollar.',
        en: 'The social provider returns to Supabase Auth first; Supabase then redirects to the frontend callback.',
      },
      missing: {
        tr: 'OAuth provider redirect_uri_mismatch veya invalid redirect hatası üretir.',
        en: 'The OAuth provider returns redirect_uri_mismatch or invalid redirect.',
      },
    },
  ],
};

const authPracticeBlock = {
  type: 'backend-practice',
  icon: '✅',
  title: { tr: 'Try It Yourself: Modern Auth sırasını kur', en: 'Try It Yourself: Build modern auth order' },
  intro: {
    tr: 'OAuth ve Magic Link akışında doğru sıra olmazsa giriş çalışır gibi görünür ama callback, profil veya aktivasyon bozulur.',
    en: 'Without the right order, auth may look wired but callback, profile, or activation can break.',
  },
  starterCode: {
    tr: `React AuthPanel bileşenini ekle
Supabase URL Configuration içine /auth/callback ekle
Google/GitHub/Microsoft providerları enable et
auth.users -> profiles trigger SQL'ini çalıştır
OAuth ve Magic Link için authApi.js fonksiyonlarını ekle
/auth/callback route'unu App.jsx içine bağla
Magic Link gönderince aktivasyon bekleme ekranını göster`,
    en: `Add the React AuthPanel component
Add /auth/callback to Supabase URL Configuration
Enable Google/GitHub/Microsoft providers
Run the auth.users -> profiles trigger SQL
Add authApi.js functions for OAuth and Magic Link
Wire the /auth/callback route in App.jsx
Show activation waiting screen after Magic Link request`,
  },
  expectedSteps: [
    { label: { tr: 'Önce providerları aç', en: 'Enable providers first' }, pattern: 'provider', example: 'Google/GitHub/Microsoft providerları enable et' },
    { label: { tr: 'Redirect allow-list ekle', en: 'Add redirect allow-list' }, pattern: 'URL Configuration|/auth/callback', example: 'Supabase URL Configuration içine /auth/callback ekle' },
    { label: { tr: 'Profile trigger çalıştır', en: 'Run profile trigger' }, pattern: 'trigger SQL', example: "auth.users -> profiles trigger SQL'ini çalıştır" },
    { label: { tr: 'Auth API fonksiyonlarını ekle', en: 'Add Auth API functions' }, pattern: 'authApi\\.js', example: 'authApi.js fonksiyonlarını ekle' },
    { label: { tr: 'Callback route bağla', en: 'Wire callback route' }, pattern: '/auth/callback route', example: "/auth/callback route'unu App.jsx içine bağla" },
    { label: { tr: 'AuthPanel ekle', en: 'Add AuthPanel' }, pattern: 'AuthPanel', example: 'React AuthPanel bileşenini ekle' },
    { label: { tr: 'Bekleme ekranını göster', en: 'Show waiting screen' }, pattern: 'aktivasyon bekleme|activation waiting', example: 'Aktivasyon bekleme ekranını göster' },
  ],
  successOutput: {
    tr: 'Doğru sıra: provider + redirect + trigger önce, sonra API ve UI. Bu sırayla hem sosyal giriş hem Magic Link temiz çalışır.',
    en: 'Correct order: provider + redirect + trigger first, then API and UI. This makes both social login and Magic Link work cleanly.',
  },
  retryOutput: {
    tr: 'Sıra riskli. Redirect allow-list veya trigger eksikse kullanıcı linke tıklasa bile session/profil akışı kırılabilir.',
    en: 'Risky order. Without redirect allow-list or trigger, session/profile flow can break after the user clicks the link.',
  },
};

const progressGuideBlock = {
  type: 'code-guide',
  icon: '📍',
  title: { tr: 'Kod Rehberi: kaldığı yeri kaydetme', en: 'Code Guide: saving resume point' },
  items: [
    {
      line: 'user_id / lesson_slug / topic_slug',
      meaning: {
        tr: 'Progress satırının sahibini, dersini ve konusunu belirleyen üçlüdür.',
        en: 'The trio that identifies owner, lesson, and topic for a progress row.',
      },
      why: {
        tr: 'Kullanıcının tam olarak nerede kaldığını bulmak için üç bilgi birlikte gerekir.',
        en: 'All three are needed to find exactly where the user stopped.',
      },
      missing: {
        tr: 'Resume özelliği yanlış ders veya yanlış konuya götürebilir.',
        en: 'Resume can send the user to the wrong lesson or topic.',
      },
    },
    {
      line: ".upsert(row, { onConflict: 'user_id,lesson_slug,topic_slug' })",
      meaning: {
        tr: 'Aynı konu varsa günceller, yoksa yeni progress satırı ekler.',
        en: 'Updates the same topic when it exists, otherwise inserts a new progress row.',
      },
      why: {
        tr: 'Kullanıcı aynı konuyu defalarca kaydettiğinde database şişmez.',
        en: 'The database does not bloat when the same topic is saved many times.',
      },
      missing: {
        tr: 'Duplicate kayıtlar yüzünden son kaldığı yeri seçmek zorlaşır.',
        en: 'Duplicate rows make choosing the latest resume point harder.',
      },
    },
    {
      line: ".order('updated_at', { ascending: false }).limit(1)",
      meaning: {
        tr: 'En son güncellenen progress satırını bulur.',
        en: 'Finds the most recently updated progress row.',
      },
      why: {
        tr: 'Uygulamaya dönen kullanıcıya en güncel kaldığı yer açılmalıdır.',
        en: 'Returning users should land on their newest resume point.',
      },
      missing: {
        tr: 'Eski bir ders kaydı açılıp kullanıcı şaşırabilir.',
        en: 'An older lesson record can open and confuse the user.',
      },
    },
    {
      line: '.maybeSingle()',
      meaning: {
        tr: 'Kayıt yoksa hata fırlatmadan null döndürür.',
        en: 'Returns null instead of throwing when no row exists.',
      },
      why: {
        tr: 'İlk kez gelen kullanıcı için progress olmaması normaldir.',
        en: 'Having no progress is normal for a first-time user.',
      },
      missing: {
        tr: 'Yeni kullanıcı gereksiz hata ekranı görebilir.',
        en: 'New users can see an unnecessary error state.',
      },
    },
  ],
};

const badgeGuideBlock = {
  type: 'code-guide',
  icon: '🏅',
  title: { tr: 'Kod Rehberi: rozet verme', en: 'Code Guide: awarding badges' },
  items: [
    {
      line: ".select('id', { count: 'exact', head: true })",
      meaning: {
        tr: 'Tamamlanan konu sayısını alır ama satırların tamamını indirmez.',
        en: 'Gets the completed topic count without downloading all rows.',
      },
      why: {
        tr: 'Rozet kararı için sayı yeterlidir; daha hızlı ve temizdir.',
        en: 'A count is enough for the badge decision, so this is faster and cleaner.',
      },
      missing: {
        tr: 'Gereksiz veri çekilir ve büyük kullanıcıda yavaşlama olur.',
        en: 'Unnecessary data is fetched and can slow down large accounts.',
      },
    },
    {
      line: ".eq('user_id', userId).eq('status', 'completed')",
      meaning: {
        tr: 'Sadece bu kullanıcının bitirdiği konuları sayar.',
        en: 'Counts only topics completed by this user.',
      },
      why: {
        tr: 'Rozet kişisel başarıya göre verilmelidir.',
        en: 'Badges must be based on personal achievement.',
      },
      missing: {
        tr: 'Başka kullanıcıların tamamlamaları bu kullanıcıya rozet kazandırabilir.',
        en: 'Other users completions can award this user a badge.',
      },
    },
    {
      line: "onConflict: 'user_id,badge_id'",
      meaning: {
        tr: 'Aynı kullanıcıya aynı rozeti tekrar yazmayı engeller.',
        en: 'Prevents writing the same badge twice for the same user.',
      },
      why: {
        tr: 'Rozet listesi temiz ve benzersiz kalır.',
        en: 'The badge list stays clean and unique.',
      },
      missing: {
        tr: 'Her tamamlamada aynı rozet yeniden eklenebilir.',
        en: 'The same badge can be inserted again on every completion.',
      },
    },
  ],
};

const feedbackGuideBlock = {
  type: 'code-guide',
  icon: '💬',
  title: { tr: 'Kod Rehberi: feedback kaydetme', en: 'Code Guide: saving feedback' },
  items: [
    {
      line: 'const cleaned = message.trim()',
      meaning: {
        tr: 'Mesajın başındaki ve sonundaki boşlukları temizler.',
        en: 'Removes leading and trailing spaces from the message.',
      },
      why: {
        tr: 'Database içinde daha temiz, okunabilir feedback saklanır.',
        en: 'Feedback is stored cleaner and easier to read.',
      },
      missing: {
        tr: 'Boşluklarla dolu veya kirli mesajlar kaydedilir.',
        en: 'Messages full of extra spaces or noise are stored.',
      },
    },
    {
      line: 'if (cleaned.length < 10) throw new Error(...)',
      meaning: {
        tr: 'Çok kısa feedbackleri kullanıcıya hemen geri bildirir.',
        en: 'Immediately rejects feedback that is too short.',
      },
      why: {
        tr: 'Öneri/eleştiri anlamlı olacak kadar açıklama içermelidir.',
        en: 'Feedback should include enough detail to be useful.',
      },
      missing: {
        tr: 'ok, iyi, kötü gibi işlemeye değmeyen kayıtlar artar.',
        en: 'Low-value entries like ok, good, bad can pile up.',
      },
    },
    {
      line: 'page_path: pagePath',
      meaning: {
        tr: 'Feedbackin hangi sayfadan geldiğini kaydeder.',
        en: 'Stores which page the feedback came from.',
      },
      why: {
        tr: 'Sorun veya öneri doğrudan ilgili içeriğe bağlanır.',
        en: 'The issue or suggestion is tied to the relevant content.',
      },
      missing: {
        tr: 'Hangi ders veya sayfanın düzeltilmesi gerektiği belirsizleşir.',
        en: 'It becomes unclear which lesson or page needs improvement.',
      },
    },
  ],
};

const chatGuideBlock = {
  type: 'code-guide',
  icon: '📣',
  title: { tr: 'Kod Rehberi: canlı sohbet', en: 'Code Guide: live chat' },
  items: [
    {
      line: ".order('created_at', { ascending: false }).limit(50)",
      meaning: {
        tr: 'En yeni 50 mesajı hızlıca çeker.',
        en: 'Fetches the latest 50 messages quickly.',
      },
      why: {
        tr: 'Chat açılışında tüm geçmişi indirmek yerine hızlı bir pencere gösterir.',
        en: 'Chat shows a fast recent window instead of downloading all history.',
      },
      missing: {
        tr: 'Çok eski mesajlar yüklenebilir veya sohbet yavaş açılır.',
        en: 'Very old messages may load and chat can open slowly.',
      },
    },
    {
      line: 'return data.reverse()',
      meaning: {
        tr: 'Ekranda mesajları eski üstte, yeni altta olacak şekilde çevirir.',
        en: 'Displays messages from older at top to newer at bottom.',
      },
      why: {
        tr: 'Kullanıcı sohbet akışını doğal sırada okur.',
        en: 'Users read the chat flow in a natural order.',
      },
      missing: {
        tr: 'En yeni mesaj üstte görünür ve konuşma akışı ters hissedilir.',
        en: 'Newest messages appear first and the conversation feels reversed.',
      },
    },
    {
      line: ".channel('learnqa-chat').on('postgres_changes', ...)",
      meaning: {
        tr: 'Yeni chat insert olaylarını dinleyen realtime aboneliği kurar.',
        en: 'Creates a realtime subscription for new chat insert events.',
      },
      why: {
        tr: 'Online üyeler yeni mesajı sayfa yenilemeden görür.',
        en: 'Online users see new messages without refreshing.',
      },
      missing: {
        tr: 'Mesaj kaydedilir ama diğer ekrana anlık gelmez.',
        en: 'The message is saved but does not arrive live on other screens.',
      },
    },
    {
      line: '(payload) => onMessage(payload.new)',
      meaning: {
        tr: 'Realtime event içindeki yeni satırı React state güncellemesine gönderir.',
        en: 'Sends the new row from the realtime event into the React state update.',
      },
      why: {
        tr: 'Ekrandaki mesaj listesi yeni kaydı hemen ekleyebilir.',
        en: 'The visible message list can append the new row immediately.',
      },
      missing: {
        tr: 'Event gelse bile UI tarafında mesaj görünmeyebilir.',
        en: 'The event can arrive but the UI may not show the message.',
      },
    },
  ],
};

const installGuideBlock = {
  type: 'code-guide',
  icon: '🧰',
  title: { tr: 'Kod Rehberi: kurulum ve env', en: 'Code Guide: setup and env' },
  items: [
    {
      line: 'VITE_SUPABASE_URL',
      meaning: {
        tr: 'React uygulamasının bağlanacağı Supabase proje adresidir.',
        en: 'The Supabase project URL the React app connects to.',
      },
      why: {
        tr: 'Client isteklerinin doğru backend projesine gitmesi gerekir.',
        en: 'Client requests must go to the correct backend project.',
      },
      missing: {
        tr: 'Supabase client undefined URL ile çalışır ve bağlantı hatası alırsın.',
        en: 'The Supabase client runs with an undefined URL and connection fails.',
      },
    },
    {
      line: 'VITE_SUPABASE_PUBLISHABLE_KEY',
      meaning: {
        tr: 'Tarayıcı tarafında kullanılabilen public proje anahtarıdır.',
        en: 'The public project key that can be used in the browser.',
      },
      why: {
        tr: 'RLS policyleri gerçek güvenliği sağlarken client Supabase ile konuşabilir.',
        en: 'The client can talk to Supabase while RLS policies provide real security.',
      },
      missing: {
        tr: 'API istekleri yetkilendirilemez; service_role yazarsan çok büyük güvenlik açığı olur.',
        en: 'API requests cannot be authorized; using service_role here is a major security leak.',
      },
    },
    {
      line: 'npm install @supabase/supabase-js',
      meaning: {
        tr: 'Supabase JavaScript SDK paketini projeye ekler.',
        en: 'Adds the Supabase JavaScript SDK package to the project.',
      },
      why: {
        tr: 'createClient, auth, database ve realtime fonksiyonları bu paketten gelir.',
        en: 'createClient, auth, database, and realtime functions come from this package.',
      },
      missing: {
        tr: 'import satırı module not found hatası verir.',
        en: 'The import line fails with module not found.',
      },
    },
    {
      line: 'npm run dev',
      meaning: {
        tr: 'Vite geliştirme sunucusunu açar.',
        en: 'Starts the Vite development server.',
      },
      why: {
        tr: 'Google login, callback ve progress akışını local tarayıcıda denersin.',
        en: 'You can test Google login, callback, and progress locally in the browser.',
      },
      missing: {
        tr: 'Kod yazılır ama tarayıcıda çalışıp çalışmadığını göremezsin.',
        en: 'The code exists, but you cannot verify it in the browser.',
      },
    },
  ],
};

const premiumSchemaGuideBlock = {
  type: 'code-guide',
  icon: '💳',
  title: { tr: 'Kod Rehberi: premium şema', en: 'Code Guide: premium schema' },
  items: [
    {
      line: 'is_premium / premium_until / payment_provider',
      meaning: {
        tr: 'Kullanıcının premium olup olmadığını, süresini ve hangi ödeme sağlayıcısından geldiğini tutar.',
        en: 'Stores whether the user is premium, until when, and which payment provider granted it.',
      },
      why: {
        tr: 'UI, RLS ve destek süreçleri aynı premium kaynağına bakar.',
        en: 'UI, RLS, and support workflows read the same premium source of truth.',
      },
      missing: {
        tr: 'Ödeme başarılı olsa bile kullanıcıya hangi erişimin verileceği net olmaz.',
        en: 'Even after a successful payment, the app has no clear entitlement to grant.',
      },
    },
    {
      line: 'revoke update on public.profiles from authenticated',
      meaning: {
        tr: 'Kullanıcının kendi premium kolonlarını tarayıcıdan güncellemesini engeller.',
        en: 'Prevents users from updating their own premium columns from the browser.',
      },
      why: {
        tr: 'RLS satır seviyesidir; premium gibi hassas kolonlar ayrıca korunmalıdır.',
        en: 'RLS is row-level; sensitive premium columns need extra protection.',
      },
      missing: {
        tr: 'Kullanıcı kendi profile update isteğine is_premium true eklemeyi deneyebilir.',
        en: 'A user could try adding is_premium true to their own profile update request.',
      },
    },
    {
      line: 'lessons.is_free',
      meaning: {
        tr: 'İlk 3 dersin ücretsiz, diğerlerinin premium olduğunu database içinde belirtir.',
        en: 'Marks the first three lessons as free and the rest as premium in the database.',
      },
      why: {
        tr: 'Client-side slug listesine güvenmeden gerçek erişim kuralı kurulur.',
        en: 'The real access rule exists without trusting a client-side slug list.',
      },
      missing: {
        tr: 'Kilit mantığı sadece React içinde kalır ve network isteğiyle bypass edilebilir.',
        en: 'The lock stays only in React and can be bypassed with network requests.',
      },
    },
    {
      line: 'payment_events unique(provider, provider_event_id)',
      meaning: {
        tr: 'Aynı webhook eventinin yalnızca bir kez işlenmesini sağlar.',
        en: 'Ensures the same webhook event is processed only once.',
      },
      why: {
        tr: 'Stripe ve iZico başarısız cevapta webhooku tekrar gönderebilir.',
        en: 'Stripe and iyzico can retry webhook delivery after unsuccessful responses.',
      },
      missing: {
        tr: 'Aynı ödeme olayı birden fazla kez premium güncellemesi veya kayıt üretebilir.',
        en: 'The same payment event can produce multiple premium updates or records.',
      },
    },
    {
      line: 'security definer public.is_premium_user(...)',
      meaning: {
        tr: 'RLS policy içinde premium kontrolünü tek, performanslı ve recursive olmayan fonksiyonda toplar.',
        en: 'Centralizes premium checks in a performant non-recursive function for RLS policies.',
      },
      why: {
        tr: 'Policy içinden profiles tablosunu tekrar tekrar ve karmaşık şekilde sorgulamamak gerekir.',
        en: 'Policies should avoid repeatedly querying profiles in complex recursive ways.',
      },
      missing: {
        tr: 'RLS yazımı karmaşıklaşır, performans düşer veya recursive policy hataları doğar.',
        en: 'RLS becomes complex, slower, or vulnerable to recursive policy errors.',
      },
    },
  ],
};

const premiumRlsGuideBlock = {
  type: 'code-guide',
  icon: '🛡️',
  title: { tr: 'Kod Rehberi: premium RLS', en: 'Code Guide: premium RLS' },
  items: [
    {
      line: 'lesson catalog is public',
      meaning: {
        tr: 'Ders başlıklarını herkese gösterir.',
        en: 'Shows lesson titles to everyone.',
      },
      why: {
        tr: 'Freemium modelde kullanıcı kilitli müfredatı görüp premiuma geçmeye karar verebilir.',
        en: 'In freemium, users can see the locked curriculum and decide to upgrade.',
      },
      missing: {
        tr: 'Kilitli dersler tamamen görünmez olur; kullanıcı ne satın aldığını anlayamaz.',
        en: 'Locked lessons disappear entirely; users cannot understand what they buy.',
      },
    },
    {
      line: 'lesson content follows paywall',
      meaning: {
        tr: 'İçerik satırını sadece ücretsiz ders veya premium kullanıcı için döndürür.',
        en: 'Returns content rows only for free lessons or premium users.',
      },
      why: {
        tr: 'Gerçek içerik kaynağı korunur; React kilidi bypass edilse bile veri gelmez.',
        en: 'The real content source is protected even if the React lock is bypassed.',
      },
      missing: {
        tr: 'Kullanıcı network panelinden kilitli içeriği çekebilir.',
        en: 'A user can fetch locked content from the network panel.',
      },
    },
    {
      line: 'payment_events policy yok',
      meaning: {
        tr: 'RLS açık ama policy yoksa browser bu tabloyu okuyamaz.',
        en: 'With RLS on and no policy, the browser cannot read this table.',
      },
      why: {
        tr: 'Webhook ham payloadları, ödeme referansları ve debug verileri gizli kalmalıdır.',
        en: 'Webhook payloads, payment references, and debug data must stay private.',
      },
      missing: {
        tr: 'Ödeme eventleri client tarafına sızabilir.',
        en: 'Payment events can leak to the client.',
      },
    },
    {
      line: 'user_badges / feedback / chat_messages → sadece auth.uid() = user_id',
      meaning: {
        tr: 'Rozet, feedback ve chat policy’leri `is_premium_user()` kontrolü içermez; sadece kendi satırına bakan herhangi bir üye erişebilir.',
        en: 'Badge, feedback, and chat policies skip the is_premium_user() check; any signed-in member can access their own rows.',
      },
      why: {
        tr: '2026-06-21 kararı: prod’da premium hiç satılmıyor. Bu modülleri premium’a bağlarsak prod’da kimse onlara erişemez. Asıl paywall sadece `lesson_contents`/ilerlemede kalır.',
        en: 'Decision on 2026-06-21: premium is never sold in prod. Gating these modules on premium would make them unreachable in prod. The real paywall stays only on lesson_contents/progress.',
      },
      missing: {
        tr: 'Bu satır olmadan (yani is_premium_user() geri eklenirse) prod’daki ücretsiz üyeler rozet kazanamaz, feedback yazamaz, sohbete giremez.',
        en: 'Without this (i.e. if is_premium_user() were added back), free members in prod could not earn badges, send feedback, or join chat.',
      },
    },
  ],
};

const webhookGuideBlock = {
  type: 'code-guide',
  icon: '🔐',
  title: { tr: 'Kod Rehberi: webhook güvenliği', en: 'Code Guide: webhook security' },
  items: [
    {
      line: 'request.text() + Stripe-Signature',
      meaning: {
        tr: 'Stripe imza doğrulaması raw body ile yapılır.',
        en: 'Stripe signature verification uses the raw request body.',
      },
      why: {
        tr: 'JSON parse edilmiş body imzayı bozabilir; sahte webhook engellenemez.',
        en: 'A parsed JSON body can break verification and fake webhooks may slip through.',
      },
      missing: {
        tr: 'Saldırgan düz POST isteğiyle premium vermeyi deneyebilir.',
        en: 'An attacker can try to grant premium with a plain POST request.',
      },
    },
    {
      line: 'X-IYZ-SIGNATURE-V3',
      meaning: {
        tr: 'iZico webhook kaynağını HMAC-SHA256 ile doğrular.',
        en: 'Verifies the iyzico webhook source with HMAC-SHA256.',
      },
      why: {
        tr: 'iZico gönderdiğini söyleyen her isteğe güvenilmez.',
        en: 'Not every request claiming to be iyzico should be trusted.',
      },
      missing: {
        tr: 'paymentConversationId bilen biri sahte SUCCESS payload gönderebilir.',
        en: 'Someone who knows a paymentConversationId could send a fake SUCCESS payload.',
      },
    },
    {
      line: 'verify_jwt = false',
      meaning: {
        tr: 'Stripe/iZico webhook fonksiyonlarının Supabase JWT istemeden çağrılmasını sağlar.',
        en: 'Allows Stripe/iyzico webhook functions to be invoked without a Supabase JWT.',
      },
      why: {
        tr: 'Ödeme sağlayıcıları Authorization: Bearer <Supabase JWT> headerı göndermez.',
        en: 'Payment providers do not send an Authorization: Bearer <Supabase JWT> header.',
      },
      missing: {
        tr: 'Webhook isteği koduna ulaşmadan Supabase gateway tarafında 401 ile reddedilir.',
        en: 'The webhook is rejected with 401 at the Supabase gateway before your code runs.',
      },
    },
    {
      line: 'timingSafeEqual(expectedSignature, receivedSignature)',
      meaning: {
        tr: 'iZico imzasını süre bilgisi sızdırmadan karşılaştırır.',
        en: 'Compares the iyzico signature without leaking timing information.',
      },
      why: {
        tr: 'Manuel HMAC doğrulamasında düz string karşılaştırma yerine sabit zamana yakın kontrol tercih edilir.',
        en: 'Manual HMAC verification should prefer near constant-time comparison over plain string checks.',
      },
      missing: {
        tr: 'Pratik risk küçük olsa da imza doğrulaması gereksiz yere zayıflar.',
        en: 'The practical risk is small, but signature verification is unnecessarily weaker.',
      },
    },
    {
      line: 'retrieveCheckoutResult(payload.token, ...)',
      meaning: {
        tr: 'iZico Checkout Form token ile ödeme sonucunu tekrar sorgular.',
        en: 'Queries the iyzico Checkout Form result again using the token.',
      },
      why: {
        tr: 'Webhook SUCCESS değerinin yanında tutar, para birimi, paymentStatus ve fraudStatus doğrulanır.',
        en: 'Alongside webhook SUCCESS, amount, currency, paymentStatus, and fraudStatus are verified.',
      },
      missing: {
        tr: 'Yanlış tutar veya riskli ödeme premium açabilir.',
        en: 'An incorrect amount or risky payment could unlock premium.',
      },
    },
    {
      line: 'SUPABASE_SERVICE_ROLE_KEY',
      meaning: {
        tr: 'Premium kolonlarını güncelleyen admin anahtarıdır ve sadece Edge Function içinde yaşar.',
        en: 'The admin key that updates premium columns and lives only inside Edge Functions.',
      },
      why: {
        tr: 'Webhook RLS bypass ederek güvenilir server-side güncelleme yapmalıdır.',
        en: 'The webhook must bypass RLS for trusted server-side updates.',
      },
      missing: {
        tr: 'Clienta koyarsan tüm database güvenliği çöker; hiç kullanmazsan webhook profile güncelleyemeyebilir.',
        en: 'Putting it in the client breaks database security; not using it may prevent webhook updates.',
      },
    },
    {
      line: 'eventError?.code === 23505',
      meaning: {
        tr: 'Duplicate webhook eventini başarılı ama tekrar işlenmiş kabul eder.',
        en: 'Treats a duplicate webhook event as already processed.',
      },
      why: {
        tr: 'Provider retry yaptığında aynı ödeme ikinci kez işlenmemelidir.',
        en: 'When providers retry, the same payment should not be processed twice.',
      },
      missing: {
        tr: 'Retry mekanizması duplicate kayıt ve hatalı state üretebilir.',
        en: 'Retries can create duplicate records and incorrect state.',
      },
    },
  ],
};

const paywallGuideBlock = {
  type: 'code-guide',
  icon: '🔒',
  title: { tr: 'Kod Rehberi: frontend paywall', en: 'Code Guide: frontend paywall' },
  items: [
    {
      line: 'loadMyProfile()',
      meaning: {
        tr: 'Session kullanıcısının premium durumunu profiles tablosundan okur.',
        en: 'Reads the session user premium status from profiles.',
      },
      why: {
        tr: 'Header, kilit modalı ve ödeme butonu aynı state ile çalışır.',
        en: 'Header, lock modal, and payment button use the same state.',
      },
      missing: {
        tr: 'UI kullanıcının premium olup olmadığını tahmin etmeye başlar.',
        en: 'The UI starts guessing whether the user is premium.',
      },
    },
    {
      line: 'FREE_LESSON_SLUGS',
      meaning: {
        tr: 'İlk 3 dersi UI tarafında kilitsiz göstermek için ipucudur.',
        en: 'A UI hint for showing the first three lessons as unlocked.',
      },
      why: {
        tr: 'Kullanıcı deneyimi hızlı olur; ama güvenlik buna dayanmaz.',
        en: 'The UX is fast, but security does not depend on it.',
      },
      missing: {
        tr: 'UI tüm dersleri kilitli gösterebilir; RLS yine doğru çalışır.',
        en: 'The UI may show all lessons locked; RLS can still be correct.',
      },
    },
    {
      line: 'lesson_contents select',
      meaning: {
        tr: 'Kilitli içeriği Supabase RLS kontrolünden geçirerek ister.',
        en: 'Requests locked content through Supabase RLS checks.',
      },
      why: {
        tr: 'Veri kaynaktan korunur, sadece component gizlemekle yetinilmez.',
        en: 'Data is protected at the source, not merely hidden by a component.',
      },
      missing: {
        tr: 'Kullanıcı route değiştirerek veya fetch yazarak içerik alabilir.',
        en: 'A user can fetch content by changing routes or writing requests.',
      },
    },
    {
      line: "supabase.functions.invoke('create-stripe-checkout')",
      meaning: {
        tr: 'Ödemeyi server-side Edge Function üzerinden başlatır.',
        en: 'Starts payment through a server-side Edge Function.',
      },
      why: {
        tr: 'Stripe/iZico secret key ve ödeme referansı tarayıcıya çıkmaz.',
        en: 'Stripe/iyzico secrets and payment references do not leak to the browser.',
      },
      missing: {
        tr: 'Secret key clienta konursa ödeme hesabı ve database ciddi risk altına girer.',
        en: 'Putting secrets in the client puts the payment account and database at serious risk.',
      },
    },
    {
      line: "supabase.functions.invoke('create-iyzico-checkout')",
      meaning: {
        tr: 'iZico Checkout Form oturumunu server-side başlatır ve payment_intents satırını conversation_id ile eşler.',
        en: 'Starts the iyzico Checkout Form server-side and matches the payment_intents row with conversation_id.',
      },
      why: {
        tr: 'Webhook payloadındaki paymentConversationId ancak bu satır önceden oluşturulursa user_id bulabilir.',
        en: 'The webhook can find user_id from paymentConversationId only if this row exists first.',
      },
      missing: {
        tr: 'iZico webhook her zaman Unknown payment conversation hatasına düşer.',
        en: 'The iyzico webhook always falls into Unknown payment conversation.',
      },
    },
  ],
};

const backendOpenApiSpec = `openapi: 3.0.3
info:
  title: LearnQA.dev Backend API (real, live surface only)
  version: "1.0"
  description: >
    This documents only the endpoints that are REALLY deployed and called by the
    React app today. There is no hand-written Spring-Boot-style controller layer:
    every /rest/v1/<table> path below is auto-generated by Supabase's PostgREST
    layer straight from Postgres; /functions/v1/* paths are 3 real Deno Edge
    Functions in supabase/functions/. Tutorial-only examples shown elsewhere on
    this page (feedback, payment_intents, payment_events, lessons,
    lesson_contents, create-stripe-checkout, create-iyzico-checkout, webhooks)
    are intentionally NOT included here because they are not deployed.
servers:
  - url: https://YOUR_PROJECT_REF.supabase.co
    description: learnqa-test or learnqa-prod (each environment has its own project ref)
security:
  - ApiKeyAuth: []
    BearerAuth: []
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: apikey
      description: Supabase publishable (anon) key. Required on every request.
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: >
        Signed-in user's Supabase session JWT. Public RPCs (get_leaderboard,
        get_certificate) work with just the anon key; profiles/user_progress/
        certificates return empty results without this, because of RLS.
  schemas:
    Profile:
      type: object
      properties:
        id: { type: string, format: uuid }
        display_name: { type: string, nullable: true }
        email: { type: string, nullable: true }
        avatar_url: { type: string, nullable: true }
        avatar_emoji: { type: string, nullable: true }
        is_admin: { type: boolean }
        is_premium: { type: boolean }
        premium_until: { type: string, format: date-time, nullable: true }
        career_goal: { type: string, nullable: true }
        xp: { type: integer }
    UserProgress:
      type: object
      properties:
        id: { type: integer }
        user_id: { type: string, format: uuid }
        lesson_slug: { type: string, example: selenium }
        topic_slug: { type: string, example: explicit-wait }
        status: { type: string, enum: [started, completed] }
        last_position: { type: object, additionalProperties: true }
        completed_at: { type: string, format: date-time, nullable: true }
        updated_at: { type: string, format: date-time }
    Badge:
      type: object
      properties:
        id: { type: string }
        title: { type: string }
        icon: { type: string }
        description: { type: string }
        required_completed_topics: { type: integer }
    UserBadge:
      type: object
      properties:
        badge_id: { type: string }
        awarded_at: { type: string, format: date-time }
        badges: { $ref: '#/components/schemas/Badge' }
    Certificate:
      type: object
      properties:
        id: { type: string, format: uuid }
        user_id: { type: string, format: uuid }
        career_goal: { type: string }
        display_name: { type: string }
        created_at: { type: string, format: date-time }
    ChatMessage:
      type: object
      properties:
        id: { type: integer }
        user_id: { type: string, format: uuid }
        display_name: { type: string, nullable: true }
        message: { type: string, maxLength: 500 }
        created_at: { type: string, format: date-time }
    LessonComment:
      type: object
      properties:
        id: { type: integer }
        user_id: { type: string, format: uuid }
        display_name: { type: string, nullable: true }
        avatar_url: { type: string, nullable: true }
        avatar_emoji: { type: string, nullable: true }
        page_path: { type: string, example: /selenium }
        comment: { type: string }
        created_at: { type: string, format: date-time }
    GradeVerdict:
      type: object
      properties:
        totalPoints: { type: integer }
        coveredPoints: { type: integer }
        percent: { type: integer }
        missedPoints: { type: array, items: { type: string } }
        feedback: { type: string }
        disputeResponse: { type: string, nullable: true }
    Error:
      type: object
      properties:
        error: { type: string }
paths:
  /rest/v1/profiles:
    get:
      summary: Read your own profile (PostgREST auto-generated)
      description: Real caller: src/context/AuthContext.jsx -> loadProfile(). RLS only returns the row where auth.uid() = id.
      parameters:
        - in: query
          name: select
          schema: { type: string }
          example: id,display_name,email,avatar_url,avatar_emoji,is_admin,is_premium,premium_until,career_goal,xp
        - in: query
          name: id
          schema: { type: string }
          example: eq.b3f1-some-uuid
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/Profile' } }
    patch:
      summary: Update career_goal or avatar_emoji
      description: Real caller: AuthContext.jsx -> setCareerGoal() / setAvatarEmoji(). RLS with check (auth.uid() = id) blocks updating anyone else's row.
      parameters:
        - in: query
          name: id
          required: true
          schema: { type: string }
          example: eq.b3f1-some-uuid
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                career_goal: { type: string }
                avatar_emoji: { type: string }
      responses:
        '200':
          description: Updated row (with header Prefer return=representation)

  /rest/v1/user_progress:
    get:
      summary: Read resume point / completed topics
      description: 'Real callers: getResumePoint(), getCompletedRoutePaths(), getStreak().'
      parameters:
        - in: query
          name: user_id
          schema: { type: string }
          example: eq.b3f1-some-uuid
        - in: query
          name: status
          schema: { type: string }
          example: eq.completed
        - in: query
          name: order
          schema: { type: string }
          example: updated_at.desc
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/UserProgress' } }
    post:
      summary: Save progress (upsert)
      description: >
        Real caller: saveProgress(). Uses header Prefer resolution=merge-duplicates
        plus query on_conflict=user_id,lesson_slug,topic_slug for "update if exists,
        insert otherwise" behavior.
      parameters:
        - in: query
          name: on_conflict
          schema: { type: string }
          example: user_id,lesson_slug,topic_slug
        - in: header
          name: Prefer
          schema: { type: string }
          example: resolution=merge-duplicates,return=representation
      requestBody:
        content:
          application/json:
            schema: { $ref: '#/components/schemas/UserProgress' }
      responses:
        '201':
          description: Created or updated

  /rest/v1/badges:
    get:
      summary: Read the fixed badge catalog
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/Badge' } }

  /rest/v1/user_badges:
    get:
      summary: Read badges you have earned (joined with badges)
      description: 'Real caller: loadBadges(). select=badge_id,awarded_at,badges(title,icon,description)'
      parameters:
        - in: query
          name: select
          schema: { type: string }
          example: badge_id,awarded_at,badges(title,icon,description)
        - in: query
          name: user_id
          schema: { type: string }
          example: eq.b3f1-some-uuid
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/UserBadge' } }
    post:
      summary: Write newly earned badges (upsert, ignoreDuplicates)
      description: 'Real caller: markTopicCompleted(). on_conflict=user_id,badge_id'
      parameters:
        - in: query
          name: on_conflict
          schema: { type: string }
          example: user_id,badge_id
      requestBody:
        content:
          application/json:
            schema:
              type: array
              items:
                type: object
                properties:
                  user_id: { type: string }
                  badge_id: { type: string }
      responses:
        '201':
          description: Created

  /rest/v1/certificates:
    post:
      summary: Claim a certificate for a completed career roadmap (upsert)
      description: 'Real caller: claimCertificate(). on_conflict=user_id,career_goal, ignoreDuplicates'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                user_id: { type: string }
                career_goal: { type: string }
                display_name: { type: string }
      responses:
        '201':
          description: Created

  /rest/v1/chat_messages:
    get:
      summary: Read recent chat messages (public to any signed-in member)
      description: 'Real caller: src/lib/chatApi.js -> loadRecentMessages()'
      parameters:
        - in: query
          name: select
          schema: { type: string }
          example: id,user_id,display_name,message,created_at
        - in: query
          name: order
          schema: { type: string }
          example: created_at.desc
        - in: query
          name: limit
          schema: { type: integer }
          example: 50
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/ChatMessage' } }
    post:
      summary: Send a chat message
      description: 'Real caller: sendChatMessage(). The new row is also pushed instantly to the Realtime channel.'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                user_id: { type: string }
                display_name: { type: string, nullable: true }
                message: { type: string, maxLength: 500 }
      responses:
        '201':
          description: Created

  /rest/v1/lesson_comments:
    get:
      summary: Read comments for one lesson page (public)
      description: 'Real caller: src/lib/commentsApi.js -> loadComments()'
      parameters:
        - in: query
          name: page_path
          schema: { type: string }
          example: eq./selenium
        - in: query
          name: order
          schema: { type: string }
          example: created_at.desc
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/LessonComment' } }
    post:
      summary: Submit a comment (members only)
      description: 'Real caller: submitComment()'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                user_id: { type: string }
                display_name: { type: string, nullable: true }
                avatar_url: { type: string, nullable: true }
                avatar_emoji: { type: string, nullable: true }
                page_path: { type: string }
                comment: { type: string }
      responses:
        '201':
          description: Created

  /rest/v1/rpc/increment_user_xp:
    post:
      summary: Increment a user's XP server-side (security definer)
      description: 'Real caller: AuthContext.jsx -> awardXp(). The client cannot UPDATE profiles.xp directly; this RPC is the only path.'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                user_id: { type: string }
                amount: { type: integer }
      responses:
        '200':
          description: The new xp value (returned as a plain scalar integer)

  /rest/v1/rpc/get_leaderboard:
    post:
      summary: Get the top N users by XP (public, security definer)
      description: 'Real caller: LeaderboardPage.jsx. Avoids a broad public SELECT policy on profiles by returning only the columns the leaderboard needs.'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                p_limit: { type: integer, example: 10 }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    display_name: { type: string }
                    avatar_emoji: { type: string, nullable: true }
                    avatar_url: { type: string, nullable: true }
                    xp: { type: integer }

  /rest/v1/rpc/get_certificate:
    post:
      summary: Get one certificate by id, for anyone (public, security definer)
      description: 'Real caller: VerifyCertificatePage.jsx (/verify-certificate/:id). Avoids making the whole certificates table public.'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                p_id: { type: string }
      responses:
        '200':
          description: OK (single-element array, or empty array if not found)
          content:
            application/json:
              schema: { type: array, items: { $ref: '#/components/schemas/Certificate' } }

  /functions/v1/qa-assistant:
    post:
      summary: General QA/test-automation chat assistant (Edge Function, members only)
      description: 'Real caller: QaAssistantPage.jsx. The Groq API key is only ever read inside this function, server-side.'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [messages]
              properties:
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role: { type: string, enum: [user, assistant] }
                      content: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  reply: { type: string }
        '401':
          description: Not signed in / missing Authorization header
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Error' }

  /functions/v1/explain-quiz-answer:
    post:
      summary: AI explanation tailored to the user's chosen quiz answer (members only, opt-in)
      description: 'Real caller: TopicPage.jsx -> AiExplanationPanel ("ask AI for an extra explanation" button).'
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [question, correctAnswer, userAnswer]
              properties:
                question: { type: string }
                correctAnswer: { type: string }
                userAnswer: { type: string }
                isCorrect: { type: boolean }
                staticExplanation: { type: string }
                lang: { type: string, enum: [tr, en] }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  explanation: { type: string }

  /functions/v1/grade-interview-answer:
    post:
      summary: Objectively grade a free-text interview answer (single / batch / dispute, members only)
      description: >
        Real caller: TopicPage.jsx (Interview Practice). Sending items[] triggers batch
        mode (up to 5 questions in one Groq call); omitting it triggers single mode
        (question/modelAnswer/userAnswer plus an optional dispute).
      requestBody:
        content:
          application/json:
            schema:
              oneOf:
                - type: object
                  required: [items]
                  properties:
                    items:
                      type: array
                      items:
                        type: object
                        properties:
                          question: { type: string }
                          modelAnswer: { type: string }
                          keyPoints: { type: array, items: { type: string } }
                          userAnswer: { type: string }
                    lang: { type: string, enum: [tr, en] }
                - type: object
                  required: [question, modelAnswer, userAnswer]
                  properties:
                    question: { type: string }
                    modelAnswer: { type: string }
                    keyPoints: { type: array, items: { type: string } }
                    userAnswer: { type: string }
                    lang: { type: string, enum: [tr, en] }
                    dispute:
                      type: object
                      properties:
                        previousVerdict: { $ref: '#/components/schemas/GradeVerdict' }
                        rebuttal: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                oneOf:
                  - type: object
                    properties:
                      results:
                        type: array
                        items: { $ref: '#/components/schemas/GradeVerdict' }
                  - $ref: '#/components/schemas/GradeVerdict'
`;

const trSections = [
  {
    title: '🧭 Backend yol haritası: Bu uygulama neye ihtiyaç duyuyor?',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏫',
        content: 'Şu an LearnQA.dev tek başına çalışan bir defter gibi. Backend ekleyince bu defter her öğrenci için ayrı ayrı saklanan bir öğrenci dosyasına dönüşür: kim giriş yaptı, nerede kaldı, hangi rozeti aldı, ne yorum yazdı, sohbette ne söyledi.',
      },
      {
        type: 'text',
        content: 'Bu sayfadaki hedef gerçek uygulamamız için basit ama büyüyebilir bir backend kurmaktır. Stack olarak Supabase kullanacağız: Auth Google login işini, Postgres kalıcı veriyi, Row Level Security güvenliği, Realtime ise canlı sohbeti sağlar. Java analojisiyle düşün: Supabase bizim için Spring Boot + PostgreSQL + WebSocket + security filter zincirinin başlangıç seviyesinde yönetilen halidir.',
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          { icon: '🔐', label: 'Üyelik', desc: 'Kullanıcı Google, GitHub, Microsoft veya şifresiz Magic Link ile giriş yapar; parola saklamayız.' },
          { icon: '📍', label: 'Kaldığı yer', desc: 'Her lesson/topic için son pozisyon user_progress tablosuna kaydedilir.' },
          { icon: '🏅', label: 'Rozetler', desc: 'Tamamlanan konu sayısına göre badge verilir ve user_badges tablosunda saklanır.' },
          { icon: '💬', label: 'Sohbet ve feedback', desc: 'Feedback kalıcı tabloya, chat mesajları realtime tabloya gider.' },
        ],
      },
      {
        type: 'simulation',
        title: { tr: 'Supabase Dashboard turu: backend parçaları nerede?', en: 'Supabase Dashboard tour: where backend pieces live' },
        description: {
          tr: 'Run butonuna basınca Supabase arayüzünde Project, Table Editor, SQL Editor, Authentication, API Keys ve Realtime bölümlerinin hangi sırayla kullanılacağını görürsün.',
          en: 'Press Run to see the order of Project, Table Editor, SQL Editor, Authentication, API Keys, and Realtime inside the Supabase-style dashboard.',
        },
        scenario: 'supabase-project-ui',
        color: '#3ecf8e',
        icon: '🟢',
      },
      {
        type: 'table',
        headers: ['İhtiyaç', 'Supabase parçası', 'Bizim tablolarımız'],
        rows: [
          ['Sosyal giriş + Magic Link', 'Authentication > Providers + Email OTP', 'auth.users + profiles'],
          ['Kaldığı yerden devam', 'Postgres + RLS', 'user_progress'],
          ['Rozet kazanma', 'Postgres unique kayıtlar', 'badges + user_badges'],
          ['Görüş/öneri', 'Postgres insert formu', 'feedback'],
          ['Online sohbet', 'Realtime Postgres Changes', 'chat_messages'],
        ],
      },
      {
        type: 'quiz',
        question: 'Bu uygulama için Supabase seçmemizin en pratik nedeni nedir?',
        options: [
          { id: 'a', text: 'Sadece statik HTML üretmesi' },
          { id: 'b', text: 'Auth, Postgres, RLS ve Realtime ihtiyacını tek panelden yönetmesi' },
          { id: 'c', text: 'Google hesabı olmadan çalışmaması' },
          { id: 'd', text: 'React yerine Java yazdırması' },
        ],
        correct: 'b',
        explanation: 'Bu proje üyelik, progress, badge, feedback ve chat istiyor. Supabase bu parçaları ayrı ayrı backend yazmadan başlatmamızı sağlar; gerektiğinde daha sonra özel Edge Function veya klasik Node/Spring Boot backend ekleyebiliriz.',
      
        retryQuestion: {
      "question": "Bir web uygulamasında Firebase yerine Supabase tercih edilmesinin temel operasyonel avantajı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Sadece NoSQL yapısını desteklemesi"
            },
            {
                  "id": "b",
                  "text": "İlişkisel veritabanı (Postgres), Auth, Storage ve Realtime servislerini tek bir platformda sunması"
            },
            {
                  "id": "c",
                  "text": "Veritabanı şemasını tamamen manuel olarak her seferinde silip oluşturması"
            },
            {
                  "id": "d",
                  "text": "Sadece Python ile çalışması"
            }
      ],
      "correct": "b",
      "explanation": "Supabase, ilişkisel veritabanı gücü ile Auth ve Realtime gibi modern backend ihtiyaçlarını birleştirerek ayrı ayrı servisler yönetme karmaşasını ortadan kaldırır ve geliştirme hızını artırır."
}
},
    ],
  },
  {
    title: '🏛️ Gerçek Mimari: Büyük Resim',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: 'Bu site bir lokantaya benzer. Mutfakta (veritabanı) yemek malzemeleri hazır bekler; garson (otomatik REST API) siparişi doğrudan mutfaktan masaya taşır, araya bizim yazdığımız ekstra bir aşçı girmez. Sadece özel siparişlerde (AI ile soru değerlendirme, ileride ödeme gibi) mutfağa ek bir uzman aşçı (Edge Function) çağrılır.',
      },
      {
        type: 'text',
        content: 'Bu projede senin kendi yazdığın, Spring Boot tarzı bir "uygulama sunucusu" (Controller + Service + Repository katmanları) YOKTUR. Onun yerine Supabase var: Postgres veritabanı + bu veritabanını otomatik olarak REST API\'ye çeviren bir katman (PostgREST) + özel iş mantığı gerektiğinde (AI çağrısı, secret key kullanımı gibi) devreye giren küçük sunucusuz fonksiyonlar (Edge Functions, Deno/TypeScript) + canlı bildirim katmanı (Realtime). Aşağıdaki tabloda her parçanın senin bildiğin Spring Boot dünyasındaki en yakın eşdeğerini görebilirsin.',
      },
      {
        type: 'simulation',
        title: { tr: 'Supabase Dashboard turu: backend parçaları nerede?', en: 'Supabase Dashboard tour: where backend pieces live' },
        description: {
          tr: 'Aynı tur burada da geçerli: Table Editor (tablolar), SQL Editor, Authentication, API Keys ve Realtime — bu sayfanın "büyük resmi" tam olarak bu beş köşeden oluşuyor.',
          en: 'The same tour applies here: Table Editor (tables), SQL Editor, Authentication, API Keys, and Realtime — the "big picture" of this page is exactly these five corners.',
        },
        scenario: 'supabase-project-ui',
        color: '#3ecf8e',
        icon: '🏛️',
      },
      {
        type: 'table',
        headers: ['Katman', 'Bu projede teknoloji', 'Spring Boot dünyasındaki en yakın eşdeğeri', 'Nerede çalışıyor'],
        rows: [
          ['Veritabanı', 'PostgreSQL (Supabase\'in barındırdığı)', 'Senin @Entity + PostgreSQL kurulumundaki aynı veritabanı motoru', '7 gerçek tablo: profiles, user_progress, badges, user_badges, certificates, chat_messages, lesson_comments'],
          ['Otomatik REST API', 'PostgREST — Supabase her tabloyu kendiliğinden bir REST endpoint\'ine çevirir', '@RestController + Spring Data JPA\'nın hiç kod yazmadan kendiliğinden oluşması gibi', 'React tarafında supabase-js (.from(\'tablo\').select()/.insert()/.upsert()) çağrıları → gerçek HTTP isteği https://PROJE_REF.supabase.co/rest/v1/<tablo>'],
          ['Özel iş mantığı', 'Edge Functions — Deno/TypeScript, sunucusuz fonksiyonlar', '@PostMapping ile senin elle yazdığın özel bir Controller metodu', 'supabase/functions/ klasöründeki 3 gerçek fonksiyon: qa-assistant, grade-interview-answer, explain-quiz-answer'],
          ['Güvenlik', 'Postgres Row Level Security (RLS) + Supabase Auth JWT', 'Spring Security filter zinciri + method-level @PreAuthorize', 'Her tabloya yazılmış create policy ... using (auth.uid() = user_id) kuralları'],
          ['Canlı bildirim', 'Supabase Realtime (Postgres logical replication üzerine kurulu WebSocket)', '@MessageMapping + STOMP/WebSocket', 'chat_messages tablosundaki INSERT olaylarını dinleyen postgres_changes kanalı'],
        ],
      },
      {
        type: 'warning',
        content: 'Karıştırma riski: bu sayfanın 🟢 Supabase & SQL, 💬 Feedback ve 💳 Premium sekmelerinde gördüğün feedback, payment_intents, payment_events, lessons, lesson_contents tabloları VE create-stripe-checkout / create-iyzico-checkout / stripe-webhook / iyzico-webhook fonksiyonları SADECE öğretim amaçlı örnek koddur — supabase/functions/ klasöründe gerçekte yoklar, canlıda hiç deploy edilmediler, hiçbir gerçek component onları çağırmıyor. Aşağıdaki 3 tablo grubu (7 tablo) ve 3 fonksiyon, GERÇEKTEN canlı kullanılan tek backend yüzeyidir.',
      },
      {
        type: 'table',
        headers: ['Tablo (GERÇEK, canlı)', 'Ne saklar', 'Hangi dosya/fonksiyon kullanıyor', 'İşlem'],
        rows: [
          ['profiles', 'Profil kartı: ad, e-posta, avatar, admin/premium bayrağı, career_goal, xp', 'AuthContext.jsx → loadProfile() (select), setCareerGoal()/setAvatarEmoji() (update)', 'select, update'],
          ['user_progress', 'Hangi derste/konuda kalındı, tamamlandı mı, son pozisyon (JSON)', 'AuthContext.jsx → saveProgress() (upsert), getResumePoint()/getCompletedRoutePaths()/getStreak() (select)', 'select, upsert'],
          ['badges', 'Rozet kataloğu — sabit liste, hangi rozet kaç tamamlanan konu gerektiriyor', 'AuthContext.jsx → markTopicCompleted() rozet eşiğini kontrol ederken okur', 'select'],
          ['user_badges', 'Hangi kullanıcı hangi rozeti kazandı', 'AuthContext.jsx → loadBadges() (select + badges join), markTopicCompleted() (upsert)', 'select, upsert'],
          ['certificates', 'Tamamlanan kariyer yol haritası sertifikaları', 'AuthContext.jsx → claimCertificate() (upsert + select)', 'select, upsert'],
          ['chat_messages', 'Online üyelerin birbirine yazdığı canlı sohbet mesajları', 'src/lib/chatApi.js → loadRecentMessages() (select), sendChatMessage() (insert) + Realtime aboneliği', 'select, insert, realtime'],
          ['lesson_comments', 'Her ders sayfasının altındaki yorumlar', 'src/lib/commentsApi.js → loadComments() (select, page_path filtreli), submitComment() (insert)', 'select, insert'],
        ],
      },
      {
        type: 'table',
        headers: ['RPC fonksiyonu (security definer)', 'Parametre', 'Ne yapar', 'Neden RPC, neden düz tablo sorgusu değil'],
        rows: [
          ['increment_user_xp', '{ user_id, amount }', 'Kullanıcının xp puanını sunucu tarafında artırır', 'Fonksiyon içinde auth.uid() = user_id kontrolü var; client tabloya direkt UPDATE atabilseydi kendine sınırsız xp ekleyebilirdi'],
          ['get_leaderboard', '{ p_limit }', 'İlk N kullanıcıyı xp\'ye göre sıralı döner (display_name, avatar, xp)', 'profiles tablosunu herkese açık SELECT yapmadan, sadece liderlik tablosu için gereken kolonları güvenli şekilde döndürür'],
          ['get_certificate', '{ p_id }', 'Tek bir sertifikayı id ile herkese (giriş yapmamış ziyaretçiye dahi) gösterir', '/verify-certificate/:id sayfası public olmalı ama certificates tablosunun tamamını public yapmak istemiyoruz'],
        ],
      },
      {
        type: 'table',
        headers: ['Edge Function (gerçek deploy)', 'Hangi sayfa çağırıyor', 'İstek body', 'AI sağlayıcısı'],
        rows: [
          ['POST /functions/v1/qa-assistant', '/qa-assistant sayfası', '{ messages: [{role, content}, ...] }', 'Groq (llama-3.3-70b-versatile)'],
          ['POST /functions/v1/explain-quiz-answer', 'TopicPage.jsx → AiExplanationPanel ("AI\'dan ek açıklama iste" butonu)', '{ question, correctAnswer, userAnswer, isCorrect, staticExplanation, lang }', 'Groq'],
          ['POST /functions/v1/grade-interview-answer', 'TopicPage.jsx → Mülakat Pratiği (tekli/batch/itiraz)', '{ items:[...] } VEYA { question, modelAnswer, keyPoints, userAnswer, lang, dispute? }', 'Groq'],
        ],
      },
      {
        type: 'quiz',
        question: 'Bir kullanıcı bir dersi "tamamlandı" işaretlediğinde, bu bilgi user_progress tablosuna nasıl ulaşır?',
        options: [
          { id: 'a', text: 'Bir Spring Boot Controller\'a HTTP isteği gider, o da JPA ile veritabanına yazar' },
          { id: 'b', text: 'supabase-js\'in .from(\'user_progress\').upsert(...) çağrısı, Supabase\'in otomatik ürettiği PostgREST REST API\'sine doğrudan bir HTTP isteği yapar — aramızda elle yazılmış bir controller/endpoint yoktur' },
          { id: 'c', text: 'qa-assistant Edge Function\'ı bu isteği karşılar' },
          { id: 'd', text: 'Veritabanına asla yazılmaz, sadece localStorage\'da tutulur' },
        ],
        correct: 'b',
        explanation: 'Bu projede tablo CRUD işlemleri için elle yazılmış bir API katmanı yok. PostgREST, Postgres şemasını okuyup her tablo için otomatik bir REST endpoint üretir; supabase-js sadece bu HTTP isteklerini senin yerine oluşturan bir istemci kütüphanesidir. Edge Function\'lar (qa-assistant gibi) SADECE secret key gerektiren veya basit bir tablo sorgusundan daha karmaşık olan işler için devreye girer — progress kaydetmek bunlardan biri değildir.',
        retryQuestion: {
          question: 'Mülakat cevabı değerlendirme isteği (grade-interview-answer) neden bir tabloya doğrudan INSERT olarak değil, bir Edge Function üzerinden gidiyor?',
          options: [
            { id: 'a', text: 'Çünkü Groq API key\'i sadece sunucu tarafında (Edge Function içinde) saklanabilir; bir tabloya yazıp okumakla AI çağrısı tetiklenemez' },
            { id: 'b', text: 'Çünkü tablo INSERT işlemleri Supabase\'te yasaktır' },
            { id: 'c', text: 'Çünkü Edge Function\'lar tablolardan daha hızlıdır' },
            { id: 'd', text: 'Hiçbir teknik nedeni yok, rastgele böyle yazılmış' },
          ],
          correct: 'a',
          explanation: 'Bir tabloya satır yazmak veya okumak Postgres\'in kendisinde olur; dışarıdaki bir AI servisine (Groq) HTTP isteği atmak için çalışan bir sunucu koduna ihtiyaç vardır. Edge Function tam olarak bu rolü üstlenir: kullanıcının JWT\'sini doğrular, Groq secret key\'ini ortam değişkeninden okur (tarayıcıya hiç göndermez), Groq\'a istek atar ve sonucu JSON olarak döner.',
        },
      },
    ],
  },
  {
    title: '📜 API Swagger / OpenAPI Dokümanı',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📜',
        content: 'Bu, bu backend\'in gerçek bir API menüsüdür — her endpoint\'in ne istediğini ve ne döndürdüğünü tek bir standart formatta (OpenAPI/Swagger) yazılı olarak gösterir. Bir restoranın yemek menüsü gibi: hangi yemeği (endpoint) sipariş edebileceğini, içine ne girdiği (request body) ve nasıl geleceğini (response) önceden bilirsin.',
      },
      {
        type: 'text',
        content: 'Bu dokümanı ekstra bir şifre/giriş ekranı eklemeden burada gösterebiliyoruz, çünkü /backend rotasının TAMAMI zaten RequireAdmin ile korunuyor — admin olmayan veya giriş yapmamış hiçbir ziyaretçi bu sayfayı (ve aşağıdaki spec\'i) hiç göremez. Aşağıdaki spec, "🏛️ Gerçek Mimari" sekmesinde anlatılan 7 tablo + 3 RPC + 3 Edge Function\'ı kapsar; tutorial-amaçlı örnek (Stripe/iZico gibi) endpoint\'leri BİLEREK içermez çünkü onlar canlıda yok.',
      },
      {
        type: 'steps',
        items: [
          { label: 'editor.swagger.io\'ya yapıştır', desc: 'Aşağıdaki YAML\'ı kopyala, tarayıcıda editor.swagger.io açıp sol panele yapıştır — sağda otomatik, tıklanabilir bir API dokümanı oluşur.' },
          { label: 'Postman/Insomnia\'ya import et', desc: 'Postman > Import > Raw text ile aynı YAML\'ı yapıştırırsan, her endpoint hazır bir istek olarak koleksiyona eklenir.' },
          { label: 'YOUR_PROJECT_REF\'i gerçek değerle değiştir', desc: 'servers.url alanındaki https://YOUR_PROJECT_REF.supabase.co kısmını öğrenmek istediğin ortamın (learnqa-test veya learnqa-prod) gerçek proje URL\'iyle değiştir.' },
          { label: 'apikey + Authorization header ikisini de ekle', desc: 'Supabase her isteği HEM apikey (anon/publishable key) HEM Authorization: Bearer <kullanıcı JWT> header\'ı ister — sadece birini eklemek 401/empty-result ile sonuçlanır.' },
        ],
      },
      {
        type: 'code',
        label: 'LearnQA.dev Backend — OpenAPI 3.0 (gerçek, canlı endpoint\'ler)',
        language: 'yaml',
        code: backendOpenApiSpec,
      },
      {
        type: 'warning',
        content: 'apikey header eksikse: Supabase isteği hiç Postgres\'e ulaştırmadan 401 döner. Authorization: Bearer <JWT> header eksikse: apikey tek başına yeterli olduğu için istek başarılı görünür AMA RLS "auth.uid() = ..." kuralı eşleşecek bir kullanıcı bulamadığı için boş bir sonuç ([]) döner — bu sessiz bir hata gibi davranır, "401 almıyorum ama veri de gelmiyor" durumuyla karşılaşırsan önce Authorization header\'ını kontrol et.',
      },
    ],
  },
  {
    title: '🟢 Supabase projesi, tablo şeması ve güvenlik',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗄️',
        content: 'Database bir okul dolabı gibidir. Her öğrencinin ayrı çekmecesi vardır. Row Level Security kilit sistemidir: Hasan kendi çekmecesini açar, başka öğrencinin çekmecesini açamaz.',
      },
      {
        type: 'steps',
        items: [
          { label: 'Supabase hesabı aç', desc: 'supabase.com dashboard içinde New project oluştur. Region olarak kullanıcılarına yakın bir bölge seç.' },
          { label: 'SQL Editor aç', desc: 'Sol menüden SQL Editor > New query seç. Önce tablo şemasını çalıştır.' },
          { label: 'RLS policy çalıştır', desc: 'Tablolar oluşunca ikinci SQL olarak Row Level Security policy’lerini çalıştır.' },
          { label: 'Realtime publication ekle', desc: 'Chat mesajlarını canlı almak için chat_messages tablosunu Realtime’a ekle.' },
        ],
      },
      {
        type: 'table',
        headers: ['SQL bloğu', 'Tek cümlede ne yapar', 'Yapılmazsa ne kaybedersin'],
        rows: [
          ['1) Tablolar (schemaSql)', 'profiles, user_progress, badges, user_badges, feedback, chat_messages tablolarını sıfırdan oluşturur — uygulamanın verisinin yaşayacağı "dolapları" inşa eder.', 'React tarafında kaydedilecek hiçbir kalıcı yer olmaz; login dışındaki her şey (progress, rozet, yorum, mesaj) sayfa kapanınca unutulur.'],
          ['2) Row Level Security (rlsSql)', 'Az önce açılan her tabloya kilit takar ve "kim hangi satırı okuyabilir/yazabilir" kurallarını (policy) tanımlar.', 'Tablolar var ama kilitsiz; herkesin publishable key\'i aynı olduğu için (RLS olmadan) bir kullanıcı başkasının progress/feedback satırını okuyabilir veya değiştirebilir.'],
          ['3) Otomatik profil triggerı (profileTriggerSql / authProfileTriggerSql)', 'auth.users tablosuna yeni bir kullanıcı (Google/GitHub/Magic Link ile) eklendiğinde, public.profiles tablosuna otomatik bir satır açar.', 'Kullanıcı giriş yapar ama uygulama onun adını/avatarını gösterecek bir profil satırı bulamaz — elle SQL ile her kullanıcı için tek tek satır açman gerekirdi.'],
          ['4) Realtime ayarı (realtimeSql)', 'chat_messages (ve isteğe bağlı user_progress) tablosunu Supabase\'in Realtime yayınına ekler.', 'Mesaj veritabanına kaydedilir ama diğer açık tarayıcılara anlık düşmez; kullanıcı sayfayı yenilemeden yeni mesajı göremez.'],
          ['Premium şeması (premiumSchemaSql, "💳 Premium" sekmesinde)', 'lessons, lesson_contents, payment_intents, payment_events tablolarını + profiles\'a is_premium gibi kolonları ekler.', 'Hangi dersin ücretsiz/kilitli olduğunu ve kimin ödeme yaptığını veritabanı bilmez; paywall sadece React tarafında (kolayca atlanabilir) bir kontrol olur.'],
        ],
      },
      {
        type: 'warning',
        content: 'Sıra önemlidir, rastgele değildir: önce tablo (create table), sonra RLS açma (enable row level security), sonra policy (create policy), en son Realtime. Java analojisiyle düşün — önce class\'ı tanımlarsın, sonra ona erişim kontrolü (private/public) eklersin; var olmayan bir class\'ın metodunu override edemezsin.',
      },
      {
        type: 'code',
        label: '1) Tablolar',
        language: 'sql',
        code: schemaSql,
      },
      schemaGuideBlock,
      {
        type: 'code',
        label: '2) Row Level Security',
        language: 'sql',
        code: rlsSql,
      },
      rlsGuideBlock,
      {
        type: 'code',
        label: '3) Yeni Google kullanıcısından otomatik profile oluştur',
        language: 'sql',
        code: profileTriggerSql,
      },
      triggerGuideBlock,
      {
        type: 'code',
        label: '4) Realtime ayarı',
        language: 'sql',
        code: realtimeSql,
      },
      realtimeGuideBlock,
      {
        type: 'backend-practice',
        icon: '🧪',
        title: { tr: 'Try It Yourself: SQL kurulum sırasını kontrol et', en: 'Try It Yourself: Check SQL setup order' },
        intro: {
          tr: 'Aşağıdaki SQL adımlarını doğru sıraya koy. Bu alan gerçek database’e bağlanmaz; yapıştırmadan önce zihinsel modeli kontrol eder.',
          en: 'Put the SQL steps in the correct order. This area does not touch a real database; it checks your mental model before pasting.',
        },
        starterCode: {
          tr: `alter table public.user_progress enable row level security;
create table public.user_progress (...);
create policy "users read own progress" on public.user_progress for select to authenticated using ((select auth.uid()) = user_id);
alter publication supabase_realtime add table public.chat_messages;`,
          en: `alter table public.user_progress enable row level security;
create table public.user_progress (...);
create policy "users read own progress" on public.user_progress for select to authenticated using ((select auth.uid()) = user_id);
alter publication supabase_realtime add table public.chat_messages;`,
        },
        expectedSteps: [
          { label: { tr: 'Önce tabloyu oluştur', en: 'Create the table first' }, pattern: '^create table\\s+public\\.user_progress', example: 'create table public.user_progress (...)' },
          { label: { tr: 'Sonra RLS aç', en: 'Then enable RLS' }, pattern: '^alter table\\s+public\\.user_progress\\s+enable row level security', example: 'alter table public.user_progress enable row level security;' },
          { label: { tr: 'Sonra policy yaz', en: 'Then write the policy' }, pattern: '^create policy', example: 'create policy "users read own progress" ...' },
          { label: { tr: 'En sonda Realtime publication ekle', en: 'Add Realtime publication last' }, pattern: '^alter publication\\s+supabase_realtime\\s+add table', example: 'alter publication supabase_realtime add table public.chat_messages;' },
        ],
        successOutput: {
          tr: 'Doğru sıra: tablo -> RLS -> policy -> Realtime. Bu sırayla ilerlersen Supabase SQL Editor hatalarının çoğunu daha baştan önlersin.',
          en: 'Correct order: table -> RLS -> policy -> Realtime. This avoids most Supabase SQL Editor mistakes early.',
        },
        retryOutput: {
          tr: 'Sıra hatalı. Olmayan tabloya RLS/policy yazamazsın; Java’da class oluşmadan onun methodunu override etmeye çalışmak gibi düşün.',
          en: 'Order is wrong. You cannot add RLS/policies to a table that does not exist; like overriding a method before the class exists in Java.',
        },
      },
      {
        type: 'warning',
        content: 'Publishable key client tarafında kullanılabilir; secret/service_role key asla React koduna, GitHub’a veya tarayıcıya konmaz. Service role Java’daki admin yetkili private service gibi sadece server tarafında yaşar.',
      },
      {
        type: 'quiz',
        question: 'Bir RLS policy’sinde `profiles.is_premium` kontrolünü her policy içine ayrı ayrı inline subquery olarak yazmak yerine `security definer` bir SQL fonksiyonunda (`is_premium_user()`) toplamanın asıl pratik nedeni nedir?',
        options: [
          { id: 'a', text: 'Sadece daha az satır görünsün diye, kozmetik bir tercih' },
          { id: 'b', text: 'Premium kuralı tek yerde değişir; tüm policy’ler aynı mantığı kullanır ve yinelenen/recursive hata riski azalır' },
          { id: 'c', text: 'RLS’i tamamen devre dışı bırakmak için' },
          { id: 'd', text: 'Sadece admin kullanıcılar için çalıştığından' },
        ],
        correct: 'b',
        explanation: 'Aynı kontrol mantığı birden çok policy’ye kopyalanırsa, biri güncellenip diğeri unutulduğunda güvenlik açığı oluşur. Tek bir security definer fonksiyon, Java’da ortak bir authorization service metodunu çağırmak gibidir — tek yerden değişir, her policy aynı doğruyu kullanır.',
      
        retryQuestion: {
      "question": "RLS (Row Level Security) kurallarında veritabanı rollerini (roles) kontrol etmek için her policy içine karmaşık `CASE` ifadeleri yazmak yerine `is_admin()` gibi bir SQL fonksiyonu kullanmanın ana teknik faydası nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Sorgu performansını %90 oranında hızlandırması"
            },
            {
                  "id": "b",
                  "text": "Kuralın tek merkezden yönetilmesini sağlamak, kod tekrarını önlemek ve tutarlılığı artırmak"
            },
            {
                  "id": "c",
                  "text": "Postgres'in sadece bu fonksiyonları çalıştırması, diğer sorguları engellemesi"
            },
            {
                  "id": "d",
                  "text": "Veritabanı tablosundaki satır sayısını azaltması"
            }
      ],
      "correct": "b",
      "explanation": "Merkezi bir yetkilendirme fonksiyonu kullanmak, yetki mantığında bir değişiklik gerektiğinde tek bir yerden güncelleme yapılmasına olanak tanır ve her policy'nin aynı güncel güvenlik kuralını kullandığından emin olmanızı sağlar."
}
},
    ],
  },
  {
    title: '🔐 Modern Auth: Google, GitHub, Microsoft ve Magic Link',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔑',
        content: 'Modern giriş akışında kullanıcıya iki yol sunarız: Google/GitHub/Microsoft ile tek tık sosyal giriş veya şifresiz e-posta Magic Link. Sosyal girişlerde ek aktivasyon kodu istemeyiz; Magic Link kullanan kişi linke tıklayınca e-postası doğrulanır ve session oluşur.',
      },
      {
        type: 'simulation',
        title: { tr: 'OAuth + Magic Link akışı', en: 'OAuth + Magic Link flow' },
        description: {
          tr: 'Sosyal girişte kullanıcı provider ekranından Supabase callback’e, oradan /auth/callback route’una döner. Magic Link akışında form full_name bilgisini user_metadata içine yazar; link tıklanınca trigger profiles satırını oluşturur.',
          en: 'Social login returns from provider to Supabase callback, then to /auth/callback. Magic Link stores full_name in user_metadata; after the link is clicked, the trigger creates the profile row.',
        },
        scenario: 'google-oauth-ui',
        color: '#4285f4',
        icon: '🔐',
      },
      {
        type: 'table',
        headers: ['Giriş türü', 'Supabase fonksiyonu', 'Aktivasyon davranışı'],
        rows: [
          ['Google', "signInWithOAuth({ provider: 'google' })", 'Provider doğruladıktan sonra doğrudan session oluşur.'],
          ['GitHub', "signInWithOAuth({ provider: 'github' })", 'Ek e-posta kodu istemeyiz; OAuth session yeterlidir.'],
          ['Microsoft', "signInWithOAuth({ provider: 'azure' })", 'Supabase’te Microsoft sağlayıcı adı azure’dur.'],
          ['E-posta Magic Link', 'signInWithOtp({ email, options.data.full_name })', 'Kullanıcı linke tıklayınca e-posta doğrulanır ve session açılır.'],
        ],
      },
      {
        type: 'steps',
        items: [
          { label: 'Supabase Dashboard\'da Authentication\'a git', desc: 'Sol menüdeki 🔒 kilit ikonuna tıkla. Burada Users, Sign In / Providers, URL Configuration gibi alt sayfalar açılır — bizim şu an ihtiyacımız olan iki sayfa Sign In / Providers ve URL Configuration.' },
          { label: 'Önce Sign In / Providers sayfasını anla', desc: 'Bu sayfa iki bölümden oluşur: üstte genel "User Signups" anahtarları, altta "Auth Providers" listesi (Email, Google, GitHub, Azure...). Aşağıdaki tabloda her anahtarı tek tek açıklıyoruz.' },
          { label: 'Sonra her sağlayıcıyı (Google/GitHub/Microsoft) tek tek aç', desc: 'Her sağlayıcının kendi developer console\'unda (Google Cloud, GitHub Settings, Azure Portal) bir Client ID + Client Secret üretmen, sonra bunu Supabase\'teki o sağlayıcının satırına yapıştırman gerekir. Detaylı adımlar aşağıda, her sağlayıcı için ayrı ayrı.' },
          { label: 'Son olarak URL Configuration\'ı doğru gir', desc: 'Site URL ve Redirect URLs alanları yanlışsa, sağlayıcı ekranında giriş başarılı olur ama tarayıcı yanlış adrese (örn. localhost) döner. Bu adım çoğu zaman atlanıp en çok sorun çıkaran adımdır.' },
        ],
      },
      {
        type: 'table',
        headers: ['Sign In / Providers > "User Signups" anahtarı', 'Açık (ON) olunca ne olur', 'LearnQA.dev\'de durumu'],
        rows: [
          ['Allow new users to sign up', 'Google/GitHub/Magic Link ile ilk kez gelen herkes otomatik yeni hesap açabilir.', 'AÇIK — herkesin kayıt olabilmesini istiyoruz, davetli/kapalı kayıt modunda değiliz.'],
          ['Allow manual linking', 'Zaten giriş yapmış bir kullanıcı, kendi isteğiyle ikinci bir sağlayıcıyı (örn. Google ile girişliyken GitHub\'ı da) aynı hesaba kendi elleriyle bağlayabilir.', 'KAPALI — bizde aynı e-posta otomatik eşleşiyor (account linking), ek bir "bağla" butonuna gerek yok.'],
          ['Allow anonymous sign-ins', 'Kullanıcı hiçbir hesap açmadan, hiçbir provider seçmeden geçici/misafir bir oturum (session) alabilir.', 'KAPALI — progress, rozet ve sertifika kişiye ait olmalı; kimliksiz oturuma izin vermiyoruz.'],
          ['Confirm email', 'Magic Link/şifresiz kayıt olan kullanıcı, e-postasındaki linke tıklamadan oturum AÇAMAZ.', 'AÇIK — bu zorunlu: handle_verified_user trigger\'ı tam olarak email_confirmed_at dolunca çalışıyor, bu ayar kapalı olsaydı trigger hiç tetiklenmeyebilirdi.'],
        ],
      },
      {
        type: 'warning',
        content: 'Yukarıdaki 4 anahtar SADECE email/Magic Link ve genel kayıt davranışını kontrol eder. Google/GitHub/Microsoft girişini açmaz/kapatmaz — onlar aynı sayfanın altındaki "Auth Providers" listesinde (Email satırının altında) TEK TEK, kendi Enable anahtarlarıyla açılır. Aşağıdaki 3 adımda sırayla bunu yapıyoruz.',
      },
      {
        type: 'steps',
        items: [
          { label: '1) Google Cloud Console\'da proje aç', desc: 'console.cloud.google.com adresine git, üstteki proje seçiciden yeni bir proje oluştur (ücretsiz, kart bilgisi istemez).' },
          { label: '2) OAuth consent screen\'i doldur', desc: 'Sol menüde APIs & Services > OAuth consent screen. User Type: External seç. Uygulama adı (örn. LearnQA.dev) ve kendi e-postanı (destek e-postası olarak) yaz, kaydet.' },
          { label: '3) Credentials > Create Credentials > OAuth client ID', desc: 'Application type olarak Web application seç, bir isim ver (örn. LearnQA Web).' },
          { label: '4) Supabase\'in callback URL\'ini kopyala', desc: 'Önce Supabase Dashboard > Authentication > Sign In / Providers sayfasında Google satırına tıkla; orada "Callback URL (for OAuth)" diye hazır bir adres göreceksin (format: https://PROJE_REF.supabase.co/auth/v1/callback). Bu adresi kopyala.' },
          { label: '5) Bu adresi Google\'da "Authorized redirect URIs"e yapıştır', desc: 'Google, Java\'daki bir listeye (List<String>) eleman eklemek gibi çalışır — istediğin kadar redirect URI ekleyebilirsin. İstersen test ve prod projenin callback\'lerini AYNI Google app\'ine ikisini de ekleyebilirsin.' },
          { label: '6) Client ID + Client Secret\'i kopyala', desc: 'Google sana bu ikisini gösterir; ikisini de Supabase\'teki Google satırına geri dönüp Enable anahtarını açtıktan sonra ilgili kutucuklara yapıştır, Save\'e bas.' },
        ],
      },
      {
        type: 'steps',
        items: [
          { label: '1) GitHub > Settings > Developer settings > OAuth Apps', desc: 'github.com/settings/developers adresine git, "New OAuth App" butonuna bas.' },
          { label: '2) Application name + Homepage URL doldur', desc: 'Application name: LearnQA.dev (ortamı ayırt etmek istiyorsan "LearnQA - Prod" gibi bir ad iyi olur). Homepage URL: https://learnqa.dev.' },
          { label: '3) Authorization callback URL\'i gir', desc: 'Supabase\'teki GitHub satırının "Callback URL (for OAuth)" değerini buraya yapıştır.' },
          { label: '4) DİKKAT — GitHub Google\'dan farklı: tek URL kabul eder', desc: 'Google/Azure\'daki "Authorized redirect URIs" listesinin aksine, GitHub OAuth App burada SADECE TEK BİR callback URL kabul eder, ikinci bir alan yoktur. Bu yüzden test ortamı (learnqa-test) ve prod ortamı (learnqa-prod) için AYRI İKİ GitHub OAuth App açman gerekir — biri test callback\'iyle, biri prod callback\'iyle.' },
          { label: '5) Client secret üret', desc: '"Generate a new client secret" butonuna bas. Bu değer SADECE O AN gösterilir, sayfadan çıkarsan bir daha tam göremezsin — hemen kopyala.' },
          { label: '6) Supabase\'e gir', desc: 'Sign In / Providers > GitHub satırını aç, Enable anahtarını aç, Client ID ve Client Secret\'i yapıştır, Save\'e bas.' },
        ],
      },
      {
        type: 'steps',
        items: [
          { label: '1) portal.azure.com\'da App registrations\'a git', desc: 'Azure Active Directory > App registrations > "New registration".' },
          { label: '2) Redirect URI (Web) alanına Supabase callback\'ini ekle', desc: 'Supabase\'teki Azure satırının callback URL\'ini buraya yapıştır, platform olarak "Web" seç.' },
          { label: '3) Azure da Google gibi BİRDEN FAZLA redirect URI kabul eder', desc: 'Authentication sekmesinde "Add URI" diyerek test ve prod callback\'lerinin ikisini de aynı app\'e ekleyebilirsin — GitHub\'daki gibi ayrı bir app açmana gerek YOK.' },
          { label: '4) Certificates & secrets > New client secret', desc: 'Bir geçerlilik süresi seç (örn. 24 ay), oluşan secret değerini HEMEN kopyala — sayfadan çıkınca bir daha tam görünmez.' },
          { label: '5) Application (client) ID\'yi kopyala', desc: 'Overview sekmesinin en üstünde görünür.' },
          { label: '6) Supabase\'e gir', desc: 'Sign In / Providers > Azure satırını aç, Enable et, Client ID + Client Secret\'i yapıştır, Save\'e bas. Not: ekranda "Microsoft" yazsa da Supabase kod tarafında bu sağlayıcının adı her zaman azure\'dur (signInWithOAuth({ provider: \'azure\' })).' },
        ],
      },
      {
        type: 'table',
        headers: ['URL Configuration alanı', 'Ne işe yarar', 'LearnQA.dev\'deki gerçek değeri'],
        rows: [
          ['Site URL', 'Bir redirectTo isteği hiç belirtilmemişse VEYA aşağıdaki allow-list ile eşleşmiyorsa, Supabase\'in sessizce döneceği varsayılan adres.', 'Prod\'da https://learnqa.dev; yerel geliştirmede http://localhost:5173.'],
          ['Redirect URLs (allow-list)', 'OAuth/Magic Link dönüşünde gidilmesine GERÇEKTEN izin verilen tam adresler listesi. Buradaki ** bir wildcard\'dır, alt route\'ların hepsine (örn. /selenium, /java) izin verir.', 'https://learnqa.dev/auth/callback ve https://learnqa.dev/** — ikisi de ekli olmalı.'],
        ],
      },
      {
        type: 'warning',
        content: 'Gerçek prod hatası (yaşandı, not edildi): learnqa-prod projesinde Site URL hâlâ http://localhost:3000 bırakılmıştı ve Redirect URLs listesinde https://learnqa.dev/auth/callback hiç yoktu. Sonuç: canlı sitede (learnqa.dev) Google ile giriş yapan gerçek bir kullanıcı, tarayıcısında http://localhost:3000/#access_token=...\'a yönlendirildi (ERR_CONNECTION_REFUSED) — çünkü Supabase, allow-list\'te olmayan bir redirectTo gördüğünde sessizce Site URL\'e düşüyor. React kodu (window.location.origin kullanan getRedirectUrl()) baştan beri doğruydu; sorun tamamen bu Dashboard ekranındaki ayardı. Ders: yeni bir prod ortamı açtığında URL Configuration\'ı koddan tahmin etme, Dashboard\'dan elle kontrol et.',
      },
      {
        type: 'text',
        content: 'learnqa-test ve learnqa-prod birbirinden tamamen ayrı iki Supabase projesidir; biri diğerinin credential\'ını otomatik görmez. Google ve Azure aynı OAuth app\'ini hem test hem prod için paylaşabilirsin (çünkü ikisi de birden fazla redirect URI kabul ediyor) — sadece her iki Supabase projesine de aynı Client ID/Secret\'i ayrı ayrı GİRMEN gerekir. GitHub için ise bu paylaşım mümkün değildir: tek callback URL kısıtı yüzünden test ve prod için iki BAĞIMSIZ GitHub OAuth App (iki farklı Client ID/Secret) gerekir.',
      },
      {
        type: 'quiz',
        question: 'learnqa-test için bir GitHub OAuth App kurdun ve çalışıyor. Şimdi aynı uygulamayı learnqa-prod\'da da GitHub ile giriş yaptırmak istiyorsun. Doğru yol nedir?',
        options: [
          { id: 'a', text: 'Var olan GitHub OAuth App\'in "Authorization callback URL" alanına prod callback\'ini de ikinci bir satır olarak ekle' },
          { id: 'b', text: 'GitHub bir OAuth App\'te yalnızca TEK callback URL kabul eder; bu yüzden prod için bağımsız, ikinci bir GitHub OAuth App (kendi callback\'i, kendi Client ID/Secret\'iyle) oluşturup bunu learnqa-prod Supabase\'ine girmek gerekir' },
          { id: 'c', text: 'Hiçbir şey yapmaya gerek yok, GitHub otomatik olarak her Supabase projesini tanır' },
          { id: 'd', text: 'learnqa-test\'in Client Secret\'ini learnqa-prod\'a kopyalamak yeterlidir, callback URL önemli değildir' },
        ],
        correct: 'b',
        explanation: 'Google ve Azure App registration birden fazla redirect URI kabul eder, bu yüzden tek app iki ortamda da paylaşılabilir. GitHub OAuth App ise tasarım olarak tek callback URL alanına sahiptir — ikinci bir URL eklemek için alan yoktur. Bu yüzden GitHub\'da ortam (test/prod) başına ayrı bir OAuth App açmak zorunludur; aksi halde ya test ya da prod callback\'i eşleşmez ve giriş "redirect_uri is not associated with this application" hatasıyla başarısız olur.',
        retryQuestion: {
          question: 'Supabase\'te bir kullanıcı "Microsoft ile giriş yap" butonuna basıyor ama kod tarafında signInWithOAuth çağrısı provider: \'microsoft\' ile yapılmış. Ne olur?',
          options: [
            { id: 'a', text: 'Supabase bunu otomatik olarak azure\'a çevirir, sorun olmaz' },
            { id: 'b', text: 'Supabase desteklenmeyen bir provider adı olduğu için hata döner; Microsoft girişi için doğru provider değeri her zaman "azure"dur' },
            { id: 'c', text: 'Kullanıcı doğrudan Google ekranına yönlendirilir' },
            { id: 'd', text: 'Giriş localhost\'a yönlenir' },
          ],
          correct: 'b',
          explanation: 'Supabase Auth, Microsoft/Azure AD girişini her zaman "azure" provider adıyla tanır. "microsoft" gibi olmayan bir provider adı gönderilirse Supabase bunu tanımaz ve istek hata döner — Dashboard ekranında "Microsoft" yazması, kod tarafında kullanılacak gerçek string\'in de "microsoft" olduğu anlamına gelmez.',
        },
      },
      {
        type: 'code',
        label: '7) Profile trigger: doğrulanan kullanıcıyı public.profiles içine kopyala',
        language: 'sql',
        code: authProfileTriggerSql,
      },
      {
        type: 'code',
        label: '8) Supabase redirect allow-list ayarları',
        language: 'bash',
        code: authRedirectChecklistCode,
      },
      authRedirectGuideBlock,
      {
        type: 'code',
        label: '9) Supabase client',
        language: 'javascript',
        code: supabaseClientCode,
      },
      {
        type: 'code',
        label: '10) OAuth + Magic Link Auth API',
        language: 'javascript',
        code: authCode,
      },
      authGuideBlock,
      {
        type: 'code',
        label: '11) /auth/callback route bileşeni',
        language: 'javascript',
        code: authCallbackCode,
      },
      {
        type: 'code',
        label: '12) AuthPanel: sosyal giriş + şifresiz kayıt + aktivasyon bekleme ekranı',
        language: 'jsx',
        code: magicLinkFormCode,
      },
      authPracticeBlock,
      {
        type: 'warning',
        content: 'Kullanıcıdan şifre istemiyoruz. Bu yüzden klasik formda sadece Ad Soyad + E-posta var. Magic Link gönderiminde response içinde user/session null dönebilir; bu hata değil, kullanıcıya “e-postanı kontrol et” ekranı gösterilmesi gereken normal durumdur.',
      },
      {
        type: 'table',
        headers: ['Açık risk', 'Yanlış yaklaşım', 'Güvenli yaklaşım'],
        rows: [
          ['Magic Link farklı cihaz/tarayıcıda açılır', 'Linkin her cihazda sorunsuz çalışacağını varsayıp kullanıcıyı uyarmamak', 'Kullanıcıya “Linki bu isteği gönderdiğin tarayıcıda aç” uyarısı göster; PKCE code_verifier sadece istek atılan tarayıcıda saklanır, farklı cihazda “invalid code verifier” hatası alınır.'],
          ['Aynı e-posta birden çok sağlayıcıyla giriş yapar', 'Google ile açılan hesabın GitHub veya Magic Link ile otomatik birleştiğini varsaymak', 'Supabase Authentication > Providers içindeki hesap birleştirme (account linking) davranışını gerçek testle doğrula; garanti değilse kullanıcıya tek giriş yöntemi öner veya ayrı hesap oluşabileceğini bilerek tasarla.'],
          ['Magic Link formu herkese açık', 'Rate limit/CAPTCHA eklemeden canlıya almak', 'Supabase’in varsayılan OTP rate limitini kapatma; genel kullanıma açmadan önce Authentication > Settings içine Bot and Abuse Protection (CAPTCHA) ekle — yoksa herkes başkasının e-postasına link spam’leyebilir.'],
        ],
      },
      {
        type: 'quiz',
        question: 'Bir kullanıcı Magic Link isteğini masaüstü tarayıcısından gönderip, e-postasındaki linke telefonunun mail uygulamasından tıklarsa ne olur?',
        options: [
          { id: 'a', text: 'Sorunsuz şekilde giriş yapar' },
          { id: 'b', text: '“invalid code verifier” hatası alır; çünkü PKCE code_verifier sadece isteği başlatan tarayıcıda saklanır' },
          { id: 'c', text: 'Supabase otomatik olarak masaüstü tarayıcısına yönlendirir' },
          { id: 'd', text: 'İki cihaz otomatik olarak eşleştirilir' },
        ],
        correct: 'b',
        explanation: 'PKCE akışında code_verifier sadece isteği başlatan tarayıcının yerel belleğinde tutulur. Linke farklı bir tarayıcı/cihazdan tıklamak, o anahtarı bulamaz. Kullanıcıya “linki istek attığın tarayıcıda aç” uyarısı vermek bu hatayı önler.',
      
        retryQuestion: {
      "question": "Bir kullanıcı e-posta adresi ve şifre ile giriş yaptıktan sonra, sayfa yenilendiğinde 'session' bilgisinin kaybolması veya 'refresh token' hatası alınması durumunda en olası neden nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Tarayıcı çerezlerinin (cookies) veya local storage verilerinin temizlenmiş olması"
            },
            {
                  "id": "b",
                  "text": "Kullanıcının internet hızının çok yavaş olması"
            },
            {
                  "id": "c",
                  "text": "Sunucunun sadece 5 dakika çalışacak şekilde ayarlanmış olması"
            },
            {
                  "id": "d",
                  "text": "Kullanıcının farklı bir klavye düzeni kullanması"
            }
      ],
      "correct": "a",
      "explanation": "Supabase auth istemcisi, oturum bilgilerini tarayıcının local storage veya cookie mekanizmasında tutar. Eğer bu depolama temizlenmişse veya tarayıcı ayarları erişimi kısıtlıyorsa, uygulama oturum bilgisini kaybeder."
}
},
    ],
  },
  {
    title: '📍 Gelişimi kaydetme ve kaldığı yerden devam',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📌',
        content: 'Kaldığın yeri kaydetmek, kitaba ayraç koymak gibidir. Kullanıcı Selenium sekmesinde “Explicit Wait” konusundaysa, backend o ayracı saklar; kullanıcı yarın geldiğinde aynı sayfadan devam eder.',
      },
      {
        type: 'simulation',
        title: { tr: 'Progress kaydı: React state -> Supabase row -> tekrar açınca resume', en: 'Progress save: React state -> Supabase row -> resume on return' },
        description: {
          tr: 'Kullanıcı konu tamamladığında upsert çalışır; user_progress satırı güncellenir; dönüşte en son updated_at satırı okunup kullanıcı doğru route/tab noktasına yönlendirilir.',
          en: 'When a user completes a topic, upsert updates user_progress; on return the latest updated_at row is loaded and the user resumes at the correct route/tab.',
        },
        scenario: 'backend-progress-flow',
        color: '#10b981',
        icon: '📍',
      },
      {
        type: 'code',
        label: 'Progress API',
        language: 'javascript',
        code: progressCode,
      },
      progressGuideBlock,
      {
        type: 'backend-practice',
        icon: '📍',
        title: { tr: 'Try It Yourself: Progress kodunda kritik parçaları bul', en: 'Try It Yourself: Find critical progress code pieces' },
        intro: {
          tr: 'Bu kodda kullanıcının kaldığı yeri güvenli kaydetmek için gerekli parçalar var mı kontrol et.',
          en: 'Check whether this code has the required pieces to safely save where a user stopped.',
        },
        starterCode: progressCode,
        expectedSteps: [
          { label: { tr: 'user_id yazılıyor', en: 'user_id is saved' }, pattern: 'user_id:\\s*userId', example: 'user_id: userId' },
          { label: { tr: 'lesson_slug kaydediliyor', en: 'lesson_slug is saved' }, pattern: 'lesson_slug:\\s*lessonSlug', example: 'lesson_slug: lessonSlug' },
          { label: { tr: 'topic_slug kaydediliyor', en: 'topic_slug is saved' }, pattern: 'topic_slug:\\s*topicSlug', example: 'topic_slug: topicSlug' },
          { label: { tr: 'upsert kullanılıyor', en: 'upsert is used' }, pattern: '\\.upsert\\(', example: '.upsert(row, ...)' },
          { label: { tr: 'onConflict doğru unique alanları söylüyor', en: 'onConflict names the correct unique fields' }, pattern: "onConflict:\\s*'user_id,lesson_slug,topic_slug'", example: "onConflict: 'user_id,lesson_slug,topic_slug'" },
          { label: { tr: 'geri dönüş için updated_at sırasıyla okunuyor', en: 'updated_at is used to resume' }, pattern: "\\.order\\('updated_at'", example: ".order('updated_at', { ascending: false })" },
        ],
        successOutput: {
          tr: 'Progress modeli sağlam: aynı konu tekrar kaydedildiğinde yeni satır yığılmaz, mevcut satır güncellenir.',
          en: 'Progress model is solid: saving the same topic again updates the existing row instead of piling up duplicates.',
        },
        retryOutput: {
          tr: 'Eksik parça var. Progress tablosunda user_id + lesson_slug + topic_slug birlikte benzersiz olmalı; yoksa aynı konu için çok sayıda satır oluşur.',
          en: 'A piece is missing. user_id + lesson_slug + topic_slug must be unique, otherwise one topic creates many rows.',
        },
      },
      {
        type: 'quiz',
        question: 'Kullanıcı aynı dersi/konuyu birden fazla kez “tamamlandı” olarak kaydederse `user_progress` tablosunda ne olmalı?',
        options: [
          { id: 'a', text: 'Her kayıtta yeni bir satır eklenir, eski satırlar durur' },
          { id: 'b', text: '`user_id + lesson_slug + topic_slug` unique kısıtlamasına göre mevcut satır upsert ile güncellenir' },
          { id: 'c', text: 'Eski satır silinir ve hiçbir kayıt kalmaz' },
          { id: 'd', text: 'Kayıt hata verip tamamen engellenir' },
        ],
        correct: 'b',
        explanation: 'Unique kısıtlama olmadan her “tamamlandı” işareti yeni bir satır açar; resume mantığı hangi satırın güncel olduğunu bilemez. Upsert + unique(user_id, lesson_slug, topic_slug), Java’daki bir Map’e aynı key ile tekrar put() yapmak gibi: değer güncellenir, yeni giriş açılmaz.',
      
        retryQuestion: {
      "question": "E-ticaret platformunda bir ürünün 'favoriler' listesine tekrar eklendiği senaryoda, veritabanı tutarlılığı için en iyi yaklaşım hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "Her eklemede yeni bir satır oluşturup eski kayıtları biriktirmek"
            },
            {
                  "id": "b",
                  "text": "user_id ve product_id üzerinde unique constraint kullanarak upsert işlemi gerçekleştirmek"
            },
            {
                  "id": "c",
                  "text": "İşlemi veritabanı yerine sadece frontend tarafında yönetmek"
            },
            {
                  "id": "d",
                  "text": "Daha önce eklenmişse hata döndürerek işlemin başarısız olmasını sağlamak"
            }
      ],
      "correct": "b",
      "explanation": "Unique kısıtlaması (user_id, product_id) ve upsert kullanımı, kullanıcının aynı ürünü defalarca favorilemesini engellerken verinin tekilleştirilmesini sağlar. Bu, Java'da bir Set veri yapısının davranışına benzer; aynı eleman tekrar eklenmez, sadece mevcut olan korunur."
}
},
    ],
  },
  {
    title: '🏅 Ders bitince rozet verme',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏆',
        content: 'Rozet, öğretmenin “bu aşamayı geçtin” damgası gibidir. Kullanıcı ilk konuyu bitirince “İlk Konu” rozeti alır; beş konu bitirince daha güçlü bir rozet kazanır.',
      },
      {
        type: 'text',
        content: 'İlk sürümde rozetleri client tarafında basit kontrolle verebilirsin. Ancak üretimde rozet kuralları önemli hale gelirse bunu Supabase Edge Function veya klasik backend endpoint içine taşı. Çünkü client kodu kullanıcı tarafından değiştirilebilir; Java’da frontend’i güvenlik otoritesi yapmak yerine server-side service layer kullanmaya benzer.',
      },
      {
        type: 'code',
        label: 'Basit badge verme kodu',
        language: 'javascript',
        code: badgeCode,
      },
      badgeGuideBlock,
      {
        type: 'table',
        headers: ['Kural', 'İlk sürüm', 'Daha güvenli sürüm'],
        rows: [
          ['İlk konu rozeti', 'Client count yapar ve user_badges upsert eder', 'Edge Function count yapar, service role ile yazar'],
          ['5 konu rozeti', 'Aynı fonksiyon required_completed_topics değerine bakar', 'Database function veya backend endpoint kontrol eder'],
          ['Hile riski', 'Düşük önemliyse kabul edilebilir', 'Önemliyse client insert kapatılır'],
        ],
      },
      {
        type: 'backend-practice',
        icon: '🏅',
        title: { tr: 'Try It Yourself: Badge kodunu denetle', en: 'Try It Yourself: Review badge code' },
        intro: {
          tr: 'Bir rozet fonksiyonunda en az hangi güvenli parçalar olmalı?',
          en: 'What safe pieces should a badge function include at minimum?',
        },
        starterCode: badgeCode,
        expectedSteps: [
          { label: { tr: 'Tamamlanan konu sayısı kontrol edilir', en: 'Completed topic count is checked' }, pattern: "\\.eq\\('status', 'completed'\\)", example: ".eq('status', 'completed')" },
          { label: { tr: 'Yetersizse rozet verilmez', en: 'No badge is awarded if count is too low' }, pattern: 'if \\(!count \\|\\| count < 1\\) return null', example: 'if (!count || count < 1) return null;' },
            { label: { tr: 'user_badges upsert edilir', en: 'user_badges is upserted' }, pattern: "\\.from\\('user_badges'\\)[\\s\\S]*?\\.upsert", example: ".from('user_badges').upsert(...)" },
          { label: { tr: 'unique çakışma alanı kullanılır', en: 'unique conflict fields are used' }, pattern: "onConflict:\\s*'user_id,badge_id'", example: "onConflict: 'user_id,badge_id'" },
        ],
        successOutput: {
          tr: 'Badge akışı idempotent: kullanıcı aynı rozeti 10 kez kazanamaz, upsert tek kayıt tutar.',
          en: 'Badge flow is idempotent: the user cannot earn the same badge 10 times; upsert keeps one row.',
        },
        retryOutput: {
          tr: 'Badge kodunda kritik kontrol eksik. En sık hata, insert kullanıp aynı rozeti tekrar tekrar üretmektir.',
          en: 'A critical badge check is missing. The common mistake is using insert and generating the same badge repeatedly.',
        },
      },
      {
        type: 'quiz',
        question: 'Bir rozet verme fonksiyonu, upsert yerine düz `insert` kullanırsa ne olur?',
        options: [
          { id: 'a', text: 'Kullanıcı aynı rozeti tekrar tekrar kazanabilir veya duplicate-key hatası alınır' },
          { id: 'b', text: 'Hiçbir şey değişmez, davranış aynıdır' },
          { id: 'c', text: 'Rozet otomatik olarak silinir' },
          { id: 'd', text: 'RLS bu durumu kendiliğinden engeller' },
        ],
        correct: 'a',
        explanation: '`user_badges` üzerinde unique(user_id, badge_id) varsa düz insert ikinci denemede hata fırlatır; yoksa aynı rozet defalarca kaydedilir. Upsert + onConflict, “bu rozet zaten var mı?” sorusunu veritabanına bırakır — Java’da bir Set’e aynı elemanı tekrar eklemeye çalışmak gibi, sonuç hep tek bir kayıt olmalı.',
      
        retryQuestion: {
      "question": "Kullanıcı puanı güncelleme fonksiyonunda `ON CONFLICT` kullanılmadan sürekli `INSERT` yapılması hangi soruna yol açar?",
      "options": [
            {
                  "id": "a",
                  "text": "Veritabanı kilitlenir ve tüm sistem durur"
            },
            {
                  "id": "b",
                  "text": "Kullanıcı hiçbir puan kazanamaz"
            },
            {
                  "id": "c",
                  "text": "Aynı kullanıcı için mükerrer kayıtlar oluşur veya unique constraint varsa hata döndürülür"
            },
            {
                  "id": "d",
                  "text": "Sadece son puan silinir ve puanlar sıfırlanır"
            }
      ],
      "correct": "c",
      "explanation": "Upsert (ON CONFLICT) kullanılmadığında, düz bir INSERT işlemi veritabanında daha önce aynı anahtar (key) ile oluşturulmuş bir kayıt varsa 'Duplicate Key' hatası fırlatır veya kısıtlama yoksa aynı kullanıcıya ait birden fazla puan satırı yaratır. Bu durum, mantıksal verinin kirlenmesine neden olur."
}
},
    ],
  },
  {
    title: '💬 Görüş, eleştiri ve öneri formu',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📝',
        content: 'Feedback kutusu, sınıftaki öneri kutusudur. Kullanıcı “Selenium sayfasında şu bölüm eksik” der; biz bunu database’de saklarız ve hangi sayfadan geldiğini de biliriz.',
      },
      {
        type: 'code',
        label: 'Feedback gönderme API’si',
        language: 'javascript',
        code: feedbackCode,
      },
      feedbackGuideBlock,
      {
        type: 'grid',
        cols: 2,
        items: [
          { icon: '🧾', label: 'type', desc: 'suggestion, bug, praise veya other. Sonradan admin panelinde filtrelemeyi kolaylaştırır.' },
          { icon: '📄', label: 'page_path', desc: 'Kullanıcı hangi sayfadayken feedback yazdı, bunu saklar.' },
          { icon: '🔐', label: 'RLS', desc: 'Kullanıcı sadece kendi feedback kayıtlarını okuyabilir; admin okuması için ayrı server-side yol gerekir.' },
          { icon: '🧹', label: 'Validation', desc: 'Boş veya çok kısa mesajı hem frontend hem database check constraint engeller.' },
        ],
      },
      {
        type: 'backend-practice',
        icon: '📝',
        title: { tr: 'Try It Yourself: Feedback form kontrolü', en: 'Try It Yourself: Feedback form review' },
        intro: {
          tr: 'Feedback kodunda kaydı anlamlı ve güvenli yapan parçaları kontrol et.',
          en: 'Check the pieces that make feedback useful and safe.',
        },
        starterCode: feedbackCode,
        expectedSteps: [
          { label: { tr: 'Mesaj trim ediliyor', en: 'Message is trimmed' }, pattern: 'message\\.trim\\(\\)', example: 'message.trim()' },
          { label: { tr: 'Minimum uzunluk kontrolü var', en: 'Minimum length is checked' }, pattern: 'cleaned\\.length < 10', example: 'if (cleaned.length < 10)' },
          { label: { tr: 'feedback tablosuna insert var', en: 'Insert into feedback exists' }, pattern: "\\.from\\('feedback'\\)\\s*\\n\\s*\\.insert", example: ".from('feedback').insert(...)" },
          { label: { tr: 'page_path saklanıyor', en: 'page_path is saved' }, pattern: 'page_path:\\s*pagePath', example: 'page_path: pagePath' },
        ],
        successOutput: {
          tr: 'Feedback akışı hazır: kullanıcı yorumunu yazınca kimden, hangi sayfadan ve hangi türde geldiğini kaydedebilirsin.',
          en: 'Feedback flow is ready: when the user submits, you save who sent it, from which page, and what type it is.',
        },
        retryOutput: {
          tr: 'Feedback kodunda eksik var. Özellikle page_path ve mesaj uzunluğu ileride triage yaparken çok işe yarar.',
          en: 'Feedback code is missing something. page_path and message length checks help a lot during triage.',
        },
      },
      {
        type: 'quiz',
        question: 'Feedback satırında `page_path` alanını saklamanın asıl pratik faydası nedir?',
        options: [
          { id: 'a', text: 'Sadece dekoratif bir alan, gerçek faydası yok' },
          { id: 'b', text: 'Geri bildirimin hangi sayfadan geldiğini gösterip triage/önceliklendirmeyi kolaylaştırır' },
          { id: 'c', text: 'RLS’i devre dışı bırakır' },
          { id: 'd', text: 'Kullanıcının şifresini doğrular' },
        ],
        correct: 'b',
        explanation: '“Selenium sayfasında şu bölüm eksik” diyen 50 feedback satırı arasında page_path olmadan hangisinin nereden geldiğini bulmak zorlaşır. Bu alan, Java’daki log satırına request path eklemek gibidir — sorun anında debugging/triage süresini kısaltır.',
      
        retryQuestion: {
      "question": "Hata bildirim tablosunda 'user_browser' verisinin tutulması hangi amaca hizmet eder?",
      "options": [
            {
                  "id": "a",
                  "text": "Kullanıcının IP adresini saklayarak güvenliği sağlamak"
            },
            {
                  "id": "b",
                  "text": "Teknik hataların hangi tarayıcıda yaşandığını saptayarak hata ayıklama sürecini hızlandırmak"
            },
            {
                  "id": "c",
                  "text": "RLS (Row Level Security) politikalarını tarayıcıya göre belirlemek"
            },
            {
                  "id": "d",
                  "text": "Sadece istatistiksel raporlarda kullanılacak görsel bir değerdir"
            }
      ],
      "correct": "b",
      "explanation": "Hata bildirimlerinde 'user_browser' veya benzeri metadata alanlarını tutmak, sorunların spesifik tarayıcılardan kaynaklanıp kaynaklanmadığını anlamayı sağlar. Tıpkı bir uygulamada hata loglarına ortam bilgisini eklemek gibi, bu alan sorun giderirken (triage) hangi ortamda test yapılması gerektiğini anında gösterir."
}
},
    ],
  },
  {
    title: '🟣 Online üyeler arası realtime sohbet',
    blocks: [
      {
        type: 'simple-box',
        emoji: '💭',
        content: 'Realtime chat, sınıfta aynı anda bulunan öğrencilerin konuşması gibidir. Biri mesaj yazınca öğretmenin herkese tek tek söylemesine gerek kalmaz; sınıftaki herkes mesajı aynı anda görür.',
      },
      {
        type: 'simulation',
        title: { tr: 'Realtime Chat: insert -> channel -> diğer kullanıcıların ekranı', en: 'Realtime Chat: insert -> channel -> other users screens' },
        description: {
          tr: 'Mesaj Supabase chat_messages tablosuna insert edilir; Realtime channel INSERT event’ini yakalar; diğer tarayıcılar payload.new ile ekrana yeni mesajı basar.',
          en: 'A message is inserted into chat_messages; the Realtime channel catches the INSERT event; other browsers append payload.new to the screen.',
        },
        scenario: 'supabase-realtime-chat',
        color: '#8b5cf6',
        icon: '🟣',
      },
      {
        type: 'code',
        label: 'Chat API',
        language: 'javascript',
        code: chatCode,
      },
      chatGuideBlock,
      {
        type: 'backend-practice',
        icon: '💬',
        title: { tr: 'Try It Yourself: Realtime subscription kontrolü', en: 'Try It Yourself: Realtime subscription review' },
        intro: {
          tr: 'Chat kodunda canlı mesajı getiren parçaları kontrol et.',
          en: 'Check the pieces that make live chat messages arrive.',
        },
        starterCode: chatCode,
        expectedSteps: [
          { label: { tr: 'channel oluşturuluyor', en: 'channel is created' }, pattern: "\\.channel\\('learnqa-chat'\\)", example: ".channel('learnqa-chat')" },
          { label: { tr: 'postgres_changes dinleniyor', en: 'postgres_changes is listened to' }, pattern: "'postgres_changes'", example: "'postgres_changes'" },
          { label: { tr: 'INSERT event’i seçiliyor', en: 'INSERT event is selected' }, pattern: "event:\\s*'INSERT'", example: "event: 'INSERT'" },
          { label: { tr: 'chat_messages tablosu seçiliyor', en: 'chat_messages table is selected' }, pattern: "table:\\s*'chat_messages'", example: "table: 'chat_messages'" },
          { label: { tr: 'payload.new ekrana gönderiliyor', en: 'payload.new is sent to UI' }, pattern: 'onMessage\\(payload\\.new\\)', example: 'onMessage(payload.new)' },
          { label: { tr: 'subscribe çağrılıyor', en: 'subscribe is called' }, pattern: '\\.subscribe\\(\\)', example: '.subscribe()' },
        ],
        successOutput: {
          tr: 'Realtime chat akışı tamam: insert edilen mesaj diğer kullanıcıların açık tarayıcılarına canlı düşer.',
          en: 'Realtime chat flow is complete: inserted messages appear live in other users open browsers.',
        },
        retryOutput: {
          tr: 'Realtime kodunda eksik var. En sık unutulan iki parça: table filtresi ve en sondaki .subscribe() çağrısı.',
          en: 'Realtime code is missing something. The two commonly forgotten pieces are the table filter and the final .subscribe() call.',
        },
      },
      {
        type: 'warning',
        content: 'Sohbeti açmadan önce küçük moderasyon kuralları koy: maksimum 500 karakter, sadece authenticated kullanıcı insert yapabilir, kullanıcı kendi mesajını silebilir. Küfür/spam filtresi gerekiyorsa Edge Function veya backend endpoint eklenir.',
      },
      {
        type: 'quiz',
        question: 'Bir geliştirici `supabase.channel(...).on(\'postgres_changes\', {...}, callback)` yazıp en sonda `.subscribe()` çağırmayı unutursa ne olur?',
        options: [
          { id: 'a', text: 'Mesajlar normal şekilde canlı düşmeye devam eder' },
          { id: 'b', text: 'Kanal hiç aktifleşmez; hiçbir realtime event tetiklenmez' },
          { id: 'c', text: 'Sadece ilk mesaj canlı düşer, sonrakiler düşmez' },
          { id: 'd', text: 'RLS bu durumda hata fırlatır' },
        ],
        correct: 'b',
        explanation: '`.on(...)` sadece dinleyiciyi tanımlar; kanalı gerçekten açan çağrı `.subscribe()`dir. Java’da bir event listener’ı tanımlayıp hiç `addListener()` ile register etmemek gibi düşün — kod derlenir ama hiçbir event hiç ele alınmaz.',
      
        retryQuestion: {
      "question": "Bir geliştirici Supabase üzerinde `channel.on('broadcast', ...)` metodunu kullanıp ardından `.subscribe()` yerine sadece `return` yaparsa ne gerçekleşir?",
      "options": [
            {
                  "id": "a",
                  "text": "Kanal kurulumu tamamlanır ve veriler akmaya başlar"
            },
            {
                  "id": "b",
                  "text": "Kanal bağlantısı hiç kurulmaz; istemci hiçbir veriyi alamaz veya gönderemez"
            },
            {
                  "id": "c",
                  "text": "Sadece ilk veri paketi gönderilir, ardından bağlantı kesilir"
            },
            {
                  "id": "d",
                  "text": "Uygulama arka planda sessizce hata verir ancak çalışmaya devam eder"
            }
      ],
      "correct": "b",
      "explanation": "Supabase Realtime SDK'sında `.subscribe()` çağrısı, soket bağlantısını başlatan ana tetikleyicidir. Bu çağrı yapılmadığı sürece dinleyiciler ve kanallar pasif durumda kalır. Bir lambayı prize takıp anahtarına basmamak gibi, bağlantı kanalı tanımlansa bile aktif bir iletişim yolu açılmaz."
}
},
    ],
  },
  {
    title: '💳 Premium ödeme, webhook ve paywall güvenliği',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔒',
        content: 'Premium üyelikte ana kural şudur: React sadece kullanıcı deneyimini yönetir, gerçek yetki Supabase RLS ve Edge Function tarafında verilir. Kart bilgisi, Stripe secret key, iZico secret key ve service role key asla GitHub Pages içindeki client koduna yazılmaz.',
      },
      {
        type: 'warning',
        content: 'Client-side kilit tek başına güvenlik değildir. Kullanıcı DevTools, route değişikliği veya direkt fetch ile React kontrolünü aşabilir. Bu yüzden video URL, özel markdown veya dosya yolu gibi gerçek içerik lesson_contents tablosu veya private Supabase Storage arkasında RLS ile korunmalıdır.',
      },
      {
        type: 'table',
        headers: ['Akış', 'Güvenli parça', 'Neden?'],
        rows: [
          ['Stripe ödeme başlat', 'create-stripe-checkout Edge Function', 'Secret key tarayıcıya çıkmaz; user_id server tarafında doğrulanır.'],
          ['iZico ödeme başlat', 'create-iyzico-checkout Edge Function', 'conversation_id oluşturulur; webhook paymentConversationId ile kullanıcıyı bulur.'],
          ['Ödeme sonucu', 'stripe-webhook / iyzico-webhook', 'Premium sadece provider imzası doğrulanınca açılır.'],
          ['Webhook erişimi', 'supabase/config.toml verify_jwt=false', 'Provider webhookları Supabase JWT göndermez; doğrulama provider imzasıyla yapılır.'],
          ['Premium state', 'profiles.is_premium + premium_until', 'UI ve RLS aynı kaynaktan karar verir.'],
          ['İçerik bariyeri', 'lesson_contents RLS', 'İlk 3 ders dışındaki içerik premium değilse database’den gelmez.'],
          ['Tekrar webhook', 'payment_events unique(provider, provider_event_id)', 'Provider retry yapsa bile event bir kez işlenir.'],
        ],
      },
      {
        type: 'code',
        label: '1) Premium tablo ve helper fonksiyonları',
        language: 'sql',
        code: premiumSchemaSql,
      },
      premiumSchemaGuideBlock,
      {
        type: 'code',
        label: '2) Premium RLS ve paywall policyleri',
        language: 'sql',
        code: premiumRlsSql,
      },
      premiumRlsGuideBlock,
      {
        type: 'code',
        label: '3) Supabase Function config: webhook JWT kapısı',
        language: 'toml',
        code: supabaseFunctionConfigCode,
      },
      {
        type: 'code',
        label: '4) Stripe checkout session başlatma Edge Function',
        language: 'typescript',
        code: stripeCheckoutFunctionCode,
      },
      {
        type: 'code',
        label: '5) iZico Checkout Form başlatma Edge Function',
        language: 'typescript',
        code: iyzicoCheckoutFunctionCode,
      },
      {
        type: 'code',
        label: '6) Stripe webhook handler',
        language: 'typescript',
        code: stripeWebhookFunctionCode,
      },
      {
        type: 'code',
        label: '7) iZico webhook handler + CF-Retrieve doğrulama',
        language: 'typescript',
        code: iyzicoWebhookFunctionCode,
      },
      webhookGuideBlock,
      {
        type: 'code',
        label: '8) React paywall ve profile state',
        language: 'javascript',
        code: paywallFrontendCode,
      },
      paywallGuideBlock,
      {
        type: 'steps',
        items: [
          { label: 'Secrets ekle', desc: 'Supabase Dashboard > Edge Functions > Secrets içine STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SIGNING_SECRET, IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_PREMIUM_PRICE, IYZICO_PREMIUM_CURRENCY ve SUPABASE_SERVICE_ROLE_KEY değerlerini ekle.' },
          { label: 'SQL migration çalıştır', desc: 'Önce premium schema SQL, sonra premium RLS SQL çalıştır. Policy hatası alırsan eski policy adlarını kontrol et.' },
          { label: 'config.toml ayarla', desc: 'stripe-webhook ve iyzico-webhook için verify_jwt = false yaz. Checkout fonksiyonları authenticated kullanıcıyla çağrıldığı için verify_jwt = true kalır.' },
          { label: 'Edge Functions deploy et', desc: 'create-stripe-checkout, create-iyzico-checkout, stripe-webhook ve iyzico-webhook fonksiyonlarını Supabase CLI veya Dashboard ile yayınla.' },
          { label: 'Provider webhook URL ayarla', desc: 'Stripe Dashboard ve iZico Merchant Portal içinde Supabase Function URL değerlerini webhook endpoint olarak tanımla.' },
          { label: 'RLS test et', desc: 'Premium olmayan kullanıcıyla kilitli lesson_contents select isteği dene; boş veya izin hatası dönmeli. Premium sonrası aynı istek içerik dönmeli.' },
        ],
      },
      {
        type: 'backend-practice',
        icon: '💳',
        title: { tr: 'Try It Yourself: Premium güvenlik sırasını kur', en: 'Try It Yourself: Build premium security order' },
        intro: {
          tr: 'Ödeme entegrasyonunda sıralama çok önemlidir. Aşağıdaki adımları güvenli sıraya getir.',
          en: 'Order matters in payment integration. Put these steps into a safe order.',
        },
        starterCode: {
          tr: `React içine is_premium kontrolü yaz
Stripe/iZico webhook imzasını doğrula
Premium SQL şemasını oluştur
lesson_contents RLS ile içerik bariyeri kur
supabase/config.toml içinde webhooklar için verify_jwt = false yaz
Supabase Edge Function secret değerlerini tanımla
iZico için create-iyzico-checkout ile conversation_id oluştur
iZico webhook içinde CF-Retrieve ile paidPrice/currency kontrol et
Webhook başarılı olunca profiles.is_premium değerini service role ile güncelle
Payment provider webhook URL'lerini Supabase function URL'lerine bağla`,
          en: `Add is_premium checks in React
Verify Stripe/iyzico webhook signatures
Create the premium SQL schema
Protect lesson_contents with RLS
Set verify_jwt = false for webhooks in supabase/config.toml
Define Supabase Edge Function secrets
Create conversation_id with create-iyzico-checkout for iyzico
Check paidPrice/currency with CF-Retrieve inside iyzico webhook
Update profiles.is_premium with service role after successful webhook
Connect provider webhook URLs to Supabase function URLs`,
        },
        expectedSteps: [
          { label: { tr: 'Önce schema', en: 'Schema first' }, pattern: 'Premium SQL|premium SQL|premium sql|schema', example: 'Premium SQL şemasını oluştur' },
          { label: { tr: 'Sonra RLS bariyeri', en: 'Then RLS barrier' }, pattern: 'RLS', example: 'lesson_contents RLS ile içerik bariyeri kur' },
          { label: { tr: 'Webhook JWT kapısını ayarla', en: 'Configure webhook JWT gate' }, pattern: 'verify_jwt\\s*=\\s*false', example: 'verify_jwt = false' },
          { label: { tr: 'Sonra secrets', en: 'Then secrets' }, pattern: 'secret|Secrets|secrets', example: 'Supabase Edge Function secret değerlerini tanımla' },
          { label: { tr: 'iZico checkout intent oluştur', en: 'Create iyzico checkout intent' }, pattern: 'create-iyzico-checkout|conversation_id', example: 'create-iyzico-checkout ile conversation_id oluştur' },
          { label: { tr: 'Sonra webhook URL', en: 'Then webhook URL' }, pattern: 'webhook URL', example: 'Payment provider webhook URLlerini bağla' },
          { label: { tr: 'Sonra imza doğrulama', en: 'Then signature verification' }, pattern: 'imza|signature', example: 'Stripe/iZico webhook imzasını doğrula' },
          { label: { tr: 'iZico tutarını Retrieve ile doğrula', en: 'Verify iyzico amount with Retrieve' }, pattern: 'CF-Retrieve|paidPrice|currency', example: 'CF-Retrieve ile paidPrice/currency kontrol et' },
          { label: { tr: 'Sonra premium güncelle', en: 'Then update premium' }, pattern: 'is_premium', example: 'profiles.is_premium değerini service role ile güncelle' },
          { label: { tr: 'En son React UI', en: 'React UI last' }, pattern: 'React', example: 'React içine is_premium kontrolü yaz' },
        ],
        successOutput: {
          tr: 'Doğru sıra: veri ve güvenlik önce, ödeme kanıtı sonra, React UI en son. Böyle kurarsan client bypass premium içerik açamaz.',
          en: 'Correct order: data and security first, payment proof next, React UI last. Client bypass cannot unlock premium content.',
        },
        retryOutput: {
          tr: 'Sıra riskli. React kilidini önce yaparsan çalışan bir paywall görürsün ama veri kaynağı hâlâ korunmamış olabilir.',
          en: 'Risky order. If React lock comes first, the paywall may look working while the data source remains unprotected.',
        },
      },
      {
        type: 'table',
        headers: ['Açık risk', 'Yanlış yaklaşım', 'Güvenli yaklaşım'],
        rows: [
          ['Webhook manipülasyonu', 'Gelen JSON status SUCCESS ise premium yap', 'Stripe-Signature veya X-IYZ-SIGNATURE-V3 doğrula.'],
          ['RLS bypass', 'Sadece React modal göster', 'lesson_contents ve Storage objelerini RLS ile koru.'],
          ['Secret sızıntısı', 'STRIPE_SECRET_KEY client env içine yaz', 'Secret değerleri yalnız Edge Function secrets içinde tut.'],
          ['Duplicate event', 'Her webhookta update çalıştır', 'payment_events unique constraint ile idempotent işle.'],
          ['Premium kolon güncelleme', 'Kullanıcı profiles update ile her alanı değiştirsin', 'Premium kolonlarını revoke et; sadece Edge Function update etsin.'],
          ['Tutar doğrulama', 'Webhook SUCCESS geldi diye tutarı hiç kontrol etme', 'Stripe amount_total kontrol et; iZico Checkout Form akışında CF-Retrieve ile paidPrice/currency doğrula.'],
        ],
      },
      {
        type: 'quiz',
        question: 'Bir Stripe webhook handler’ı, gelen JSON içindeki `status: success` alanına bakıp imza doğrulaması yapmadan direkt `is_premium = true` yaparsa asıl risk nedir?',
        options: [
          { id: 'a', text: 'Sadece biraz performans kaybı olur' },
          { id: 'b', text: 'Herhangi biri sahte bir POST isteğiyle kendini ücretsiz premium yapabilir' },
          { id: 'c', text: 'Stripe bu durumu otomatik olarak engeller' },
          { id: 'd', text: 'JSON formatı zaten güvenli olduğundan gerçek bir risk yoktur' },
        ],
        correct: 'b',
        explanation: 'Webhook endpoint’i herkese açık bir URL’dir; imza doğrulaması olmadan gelen her POST isteği güvenilir kabul edilir. Bu, Java’da bir REST endpoint’ine gelen her isteği "Authorization header var mı" diye kontrol etmeden admin yetkisi vermek gibidir — saldırgan sadece doğru JSON şeklini taklit ederek premium kazanır.',
      
        retryQuestion: {
      "question": "Eğer bir ödeme sağlayıcı entegrasyonunda (webhook), gelen isteğin `event.type` değerini kontrol edip imzayı (signature verification) doğrulamadan kullanıcıya erişim hakkı tanımlarsanız ne tür bir güvenlik açığı oluşur?",
      "options": [
            {
                  "id": "a",
                  "text": "Veritabanı bağlantı hatası"
            },
            {
                  "id": "b",
                  "text": "Kötü niyetli kişilerin sahte webhook isteği göndererek ödeme yapmadan sistem kaynaklarına erişmesi"
            },
            {
                  "id": "c",
                  "text": "Stripe sunucularının uygulamanızla olan bağlantısının engellenmesi"
            },
            {
                  "id": "d",
                  "text": "Hatalı JSON verisi nedeniyle uygulamanın çökmesi"
            }
      ],
      "correct": "b",
      "explanation": "İmza doğrulaması (signature verification), isteğin gerçekten ödeme sağlayıcısından geldiğini kanıtlayan tek yöntemdir. Bu kontrol yapılmazsa, herhangi bir saldırgan ödeme sisteminizin webhook URL'ini bularak, ödeme başarılıymış gibi sahte istekler (spoofing) gönderebilir ve sisteminizi manipüle edebilir."
}
},
    ],
  },
  {
    title: '🚀 React entegrasyonu, test ve deploy kontrol listesi',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧩',
        content: 'Son adım parçaları LEGO gibi uygulamaya takmaktır: önce paketi kur, sonra env dosyasını ekle, sonra login butonu, sonra progress kaydı, en son build ve production URL ayarlarını kontrol et.',
      },
      {
        type: 'installation',
        steps: [
          { cmd: 'npm install @supabase/supabase-js', explanation: 'React uygulamasının Supabase ile konuşmasını sağlayan official client library kurulur.' },
          { cmd: 'New file: .env.local', explanation: 'Supabase Project URL ve Publishable key buraya yazılır. Bu dosya local kalır; secret key yazılmaz.' },
          { cmd: 'npm run dev', explanation: 'Local uygulamayı çalıştır. Google OAuth için http://localhost:5173 origin olarak eklenmiş olmalı.' },
          { cmd: 'npm run build', explanation: 'Production build ve SEO zinciri geçmeli. Bu projede build route metadata ve static shell kontrolü de yapar.' },
        ],
      },
      {
        type: 'code',
        label: 'Kurulum komutları',
        language: 'bash',
        code: installCode,
      },
      {
        type: 'code',
        label: '.env.local',
        language: 'bash',
        code: envCode,
      },
      installGuideBlock,
      {
        type: 'table',
        headers: ['Test', 'Nasıl doğrularım?', 'Beklenen sonuç'],
        rows: [
          ['Google login', 'Login butonuna bas, Google consent sonrası uygulamaya dön', 'supabase.auth.getSession() null dönmez'],
          ['Progress', 'Bir konuyu tamamla, sayfayı yenile', 'Aynı lesson/topic user_progress içinde güncellenir'],
          ['Resume', 'Çıkış yapmadan siteye geri dön', 'En son updated_at kaydı ile doğru sayfaya yönlenir'],
          ['Badge', 'İlk konuyu tamamla', 'user_badges içinde first-topic tek kayıt olur'],
          ['Feedback', '10+ karakter öneri gönder', 'feedback tablosuna user_id ve page_path ile kayıt düşer'],
          ['Chat', 'İki tarayıcı aç, birinden mesaj gönder', 'Diğer tarayıcı mesajı refresh olmadan görür'],
        ],
      },
      {
        type: 'backend-practice',
        icon: '🚀',
        title: { tr: 'Try It Yourself: React entegrasyon sırası', en: 'Try It Yourself: React integration order' },
        intro: {
          tr: 'Gerçek projeye dokunmadan önce adımları doğru sırala.',
          en: 'Order the steps correctly before touching the real project.',
        },
        starterCode: {
          tr: `Login butonunu bağla
npm install @supabase/supabase-js
.env.local dosyasına VITE_SUPABASE_URL ve VITE_SUPABASE_PUBLISHABLE_KEY yaz
src/lib/supabaseClient.js oluştur
Progress API fonksiyonlarını ekle
npm run build
Google OAuth origin/redirect ayarlarını kontrol et`,
          en: `Wire the login button
npm install @supabase/supabase-js
Write VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY into .env.local
Create src/lib/supabaseClient.js
Add Progress API functions
npm run build
Check Google OAuth origin/redirect settings`,
        },
        expectedSteps: [
          { label: { tr: 'Paketi kur', en: 'Install the package' }, pattern: '^npm install @supabase/supabase-js$', example: 'npm install @supabase/supabase-js' },
          { label: { tr: 'Env değerlerini yaz', en: 'Write env values' }, pattern: 'VITE_SUPABASE_URL.*VITE_SUPABASE_PUBLISHABLE_KEY|VITE_SUPABASE_PUBLISHABLE_KEY.*VITE_SUPABASE_URL', example: '.env.local ...' },
          { label: { tr: 'supabaseClient oluştur', en: 'Create supabaseClient' }, pattern: 'supabaseClient\\.js', example: 'Create src/lib/supabaseClient.js' },
          { label: { tr: 'OAuth origin/redirect kontrol et', en: 'Check OAuth origin/redirect' }, pattern: 'origin/redirect', example: 'Check Google OAuth origin/redirect settings' },
          { label: { tr: 'Login butonunu bağla', en: 'Wire the login button' }, pattern: 'Login', example: 'Wire the login button' },
          { label: { tr: 'Progress API ekle', en: 'Add Progress API' }, pattern: 'Progress API', example: 'Add Progress API functions' },
          { label: { tr: 'Build çalıştır', en: 'Run build' }, pattern: '^npm run build$', example: 'npm run build' },
        ],
        successOutput: {
          tr: 'Entegrasyon sırası doğru. Artık küçük PR’larla auth, progress, badge, feedback ve chat’i tek tek bağlayabilirsin.',
          en: 'Integration order is correct. You can now wire auth, progress, badges, feedback, and chat in small PRs.',
        },
        retryOutput: {
          tr: 'Sıra riskli. Env ve OAuth ayarları tamamlanmadan login butonuna geçersen hatayı UI’da ararsın ama sorun Google/Supabase config olur.',
          en: 'Order is risky. If you wire login before env and OAuth settings, you will debug UI while the real problem is Google/Supabase config.',
        },
      },
      {
        type: 'quiz',
        question: '`SUPABASE_SERVICE_ROLE_KEY` değerini React tarafında `VITE_` ön ekli bir env değişkenine koyarsak ne olur?',
        options: [
          { id: 'a', text: 'Sadece server tarafında çalışır, güvenli kalır' },
          { id: 'b', text: 'Vite build’te tarayıcıya gömülür; RLS’i bypass eden admin key herkese açık hale gelir' },
          { id: 'c', text: 'Build hata verip durur' },
          { id: 'd', text: 'Sadece local dev’de çalışır, production’da hiç çalışmaz' },
        ],
        correct: 'b',
        explanation: '`VITE_` ön eki olan her değişken, Vite tarafından bilerek public JS bundle’ına gömülür — bu yüzden publishable/anon key için güvenlidir ama service_role key için felakettir. Java’da bir admin şifresini frontend’e gömüp “zaten kimse bakmaz” demek gibi düşün; herkes derlenmiş JS dosyasını açıp okuyabilir.',
      
        retryQuestion: {
      "question": "Next.js projesinde `NEXT_PUBLIC_` ön eki ile tanımlanan bir env değişkenine veritabanı `service_role` anahtarını atarsanız sonuç ne olur?",
      "options": [
            {
                  "id": "a",
                  "text": "Sunucu tarafında güvenli bir şekilde saklanır"
            },
            {
                  "id": "b",
                  "text": "Tarayıcıya (client-side) gönderilen tüm dosyalara dahil edilir ve herkes tarafından görülebilir"
            },
            {
                  "id": "c",
                  "text": "Next.js bu değişkeni çalışma zamanında otomatik olarak sansürler"
            },
            {
                  "id": "d",
                  "text": "Sadece `npm run dev` modunda görünür, production build'de gizlenir"
            }
      ],
      "correct": "b",
      "explanation": "Next.js'teki `NEXT_PUBLIC_` ön eki, değişkenin tarayıcı tarafındaki JS bundle'ına dahil edilmesini sağlar. `service_role` yetkisine sahip bir anahtarın bu şekilde ifşa edilmesi, tüm veritabanı kurallarını (RLS) aşan sınırsız bir erişimin kötü niyetli kişilerin eline geçmesi demektir."
}
},
    ],
  },
];

const enSections = [
  {
    title: '🧭 Backend roadmap: what does this app need?',
    blocks: [
      { type: 'simple-box', emoji: '🏫', content: 'Right now LearnQA.dev is like a notebook that lives in the browser. A backend turns it into a student record system: who signed in, where they stopped, which badge they earned, what feedback they sent, and what they wrote in chat.' },
      { type: 'text', content: 'We will use Supabase because it gives this React app Google Auth, Postgres, Row Level Security, and Realtime without writing a custom server first. Java analogy: it is a managed starter version of Spring Boot + PostgreSQL + WebSocket + a security filter chain.' },
      {
        type: 'grid',
        cols: 2,
        items: [
          { icon: '🔐', label: 'Membership', desc: 'Users sign in with Google, GitHub, Microsoft, or passwordless Magic Link; you avoid password handling.' },
          { icon: '📍', label: 'Resume point', desc: 'Each lesson/topic position is stored in user_progress.' },
          { icon: '🏅', label: 'Badges', desc: 'Completed topics produce badge rows in user_badges.' },
          { icon: '💬', label: 'Feedback and chat', desc: 'Feedback is stored; chat uses realtime table events.' },
        ],
      },
      { type: 'simulation', title: { tr: 'Supabase Dashboard turu: backend parçaları nerede?', en: 'Supabase Dashboard tour: where backend pieces live' }, description: { tr: 'Supabase panelindeki ana parçaların sırasını gösterir.', en: 'Shows the order of the main Supabase dashboard pieces.' }, scenario: 'supabase-project-ui', color: '#3ecf8e', icon: '🟢' },
      {
        type: 'table',
        headers: ['Need', 'Supabase piece', 'Tables'],
        rows: [
          ['Social login + Magic Link', 'Authentication > Providers + Email OTP', 'auth.users + profiles'],
          ['Resume learning', 'Postgres + RLS', 'user_progress'],
          ['Badges', 'Postgres unique rows', 'badges + user_badges'],
          ['Feedback', 'Postgres insert form', 'feedback'],
          ['Online chat', 'Realtime Postgres Changes', 'chat_messages'],
        ],
      },
      {
        type: 'quiz',
        question: 'What is the most practical reason for choosing Supabase for this app?',
        options: [
          { id: 'a', text: 'It only generates static HTML' },
          { id: 'b', text: 'It manages Auth, Postgres, RLS, and Realtime needs from one dashboard' },
          { id: 'c', text: 'It refuses to run without a Google account' },
          { id: 'd', text: 'It forces you to write Java instead of React' },
        ],
        correct: 'b',
        explanation: 'This project needs membership, progress, badges, feedback, and chat. Supabase lets us start all of these without writing separate backend services; a custom Edge Function or a classic Node/Spring Boot backend can be added later if needed.',
      
        retryQuestion: {
      "question": "What is the primary architectural advantage of using Supabase for a full-stack project?",
      "options": [
            {
                  "id": "a",
                  "text": "It eliminates the need for any client-side JavaScript"
            },
            {
                  "id": "b",
                  "text": "It provides a unified platform for database management, authentication, and API generation, reducing backend overhead"
            },
            {
                  "id": "c",
                  "text": "It restricts database access to read-only mode by default"
            },
            {
                  "id": "d",
                  "text": "It automatically converts all SQL queries into Python code"
            }
      ],
      "correct": "b",
      "explanation": "Supabase acts as a 'Backend-as-a-Service' (BaaS), providing a managed PostgreSQL instance with built-in authentication, real-time subscriptions, and auto-generated REST/GraphQL APIs, which significantly speeds up development compared to managing separate infrastructure components."
}
},
    ],
  },
  {
    title: '🏛️ Real Architecture: The Big Picture',
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: 'This site is like a restaurant. The kitchen (database) keeps the ingredients ready; the waiter (auto-generated REST API) carries the order straight from the kitchen to the table, with no extra cook in between. Only special orders (AI grading a question, payments later on) call in an extra specialist cook (an Edge Function).',
      },
      {
        type: 'text',
        content: 'This project has no hand-written, Spring-Boot-style "application server" (Controller + Service + Repository layers). Instead it runs on Supabase: a Postgres database + a layer that auto-converts that database into a REST API (PostgREST) + small serverless functions for custom logic (Edge Functions, Deno/TypeScript) + a live notification layer (Realtime). The table below maps each piece to its closest Spring Boot equivalent.',
      },
      {
        type: 'simulation',
        title: { tr: 'Supabase Dashboard turu: backend parçaları nerede?', en: 'Supabase Dashboard tour: where backend pieces live' },
        description: {
          tr: 'Aynı tur burada da geçerli: Table Editor (tablolar), SQL Editor, Authentication, API Keys ve Realtime — bu sayfanın "büyük resmi" tam olarak bu beş köşeden oluşuyor.',
          en: 'The same tour applies here: Table Editor (tables), SQL Editor, Authentication, API Keys, and Realtime — the "big picture" of this page is exactly these five corners.',
        },
        scenario: 'supabase-project-ui',
        color: '#3ecf8e',
        icon: '🏛️',
      },
      {
        type: 'table',
        headers: ['Layer', 'Technology in this project', 'Closest Spring Boot equivalent', 'Where it actually runs'],
        rows: [
          ['Database', 'PostgreSQL (hosted by Supabase)', 'The same database engine behind your @Entity + PostgreSQL setup', '7 real tables: profiles, user_progress, badges, user_badges, certificates, chat_messages, lesson_comments'],
          ['Auto REST API', 'PostgREST — Supabase turns every table into a REST endpoint by itself', 'Like @RestController + Spring Data JPA appearing automatically, with zero code written', 'React side calls supabase-js (.from(\'table\').select()/.insert()/.upsert()) which fires a real HTTP request to https://YOUR_PROJECT_REF.supabase.co/rest/v1/<table>'],
          ['Custom business logic', 'Edge Functions — Deno/TypeScript serverless functions', 'A custom @PostMapping controller method you write by hand', '3 real functions in supabase/functions/: qa-assistant, grade-interview-answer, explain-quiz-answer'],
          ['Security', 'Postgres Row Level Security (RLS) + Supabase Auth JWT', 'Spring Security filter chain + method-level @PreAuthorize', 'create policy ... using (auth.uid() = user_id) rules written on every table'],
          ['Live notifications', 'Supabase Realtime (WebSocket on top of Postgres logical replication)', '@MessageMapping + STOMP/WebSocket', 'The postgres_changes channel listening for INSERTs on chat_messages'],
        ],
      },
      {
        type: 'warning',
        content: 'Do not confuse these with the tutorial examples: the feedback, payment_intents, payment_events, lessons, lesson_contents tables and the create-stripe-checkout / create-iyzico-checkout / stripe-webhook / iyzico-webhook functions shown in the 🟢 Supabase & SQL, 💬 Feedback, and 💳 Premium tabs are teaching-only example code — they do not exist under supabase/functions/, were never deployed live, and no real component calls them. The 7 tables and 3 functions below are the ONLY real, live backend surface.',
      },
      {
        type: 'table',
        headers: ['Table (REAL, live)', 'What it stores', 'File/function that uses it', 'Operations'],
        rows: [
          ['profiles', 'Profile card: name, email, avatar, admin/premium flag, career_goal, xp', 'AuthContext.jsx -> loadProfile() (select), setCareerGoal()/setAvatarEmoji() (update)', 'select, update'],
          ['user_progress', 'Which lesson/topic, completed or not, last position (JSON)', 'AuthContext.jsx -> saveProgress() (upsert), getResumePoint()/getCompletedRoutePaths()/getStreak() (select)', 'select, upsert'],
          ['badges', 'Fixed badge catalog: how many completed topics each badge requires', 'AuthContext.jsx -> markTopicCompleted() reads it to check thresholds', 'select'],
          ['user_badges', 'Which user earned which badge', 'AuthContext.jsx -> loadBadges() (select + badges join), markTopicCompleted() (upsert)', 'select, upsert'],
          ['certificates', 'Certificates for completed career roadmaps', 'AuthContext.jsx -> claimCertificate() (upsert + select)', 'select, upsert'],
          ['chat_messages', 'Live chat between online members', 'src/lib/chatApi.js -> loadRecentMessages() (select), sendChatMessage() (insert) + Realtime subscription', 'select, insert, realtime'],
          ['lesson_comments', 'Comments under each lesson page', 'src/lib/commentsApi.js -> loadComments() (select, filtered by page_path), submitComment() (insert)', 'select, insert'],
        ],
      },
      {
        type: 'table',
        headers: ['RPC function (security definer)', 'Parameters', 'What it does', 'Why an RPC instead of a plain table query'],
        rows: [
          ['increment_user_xp', '{ user_id, amount }', 'Increases a user\'s XP server-side', 'The function checks auth.uid() = user_id; if the client could UPDATE the table directly it could award itself unlimited XP'],
          ['get_leaderboard', '{ p_limit }', 'Returns the top N users by XP (display_name, avatar, xp)', 'Avoids a public SELECT policy on the whole profiles table by safely returning only the columns the leaderboard needs'],
          ['get_certificate', '{ p_id }', 'Shows a single certificate by id, even to a visitor who is not signed in', '/verify-certificate/:id must be public, but the whole certificates table should not be'],
        ],
      },
      {
        type: 'table',
        headers: ['Edge Function (real deploy)', 'Called from', 'Request body', 'AI provider'],
        rows: [
          ['POST /functions/v1/qa-assistant', '/qa-assistant page', '{ messages: [{role, content}, ...] }', 'Groq (llama-3.3-70b-versatile)'],
          ['POST /functions/v1/explain-quiz-answer', 'TopicPage.jsx -> AiExplanationPanel ("ask AI for an extra explanation" button)', '{ question, correctAnswer, userAnswer, isCorrect, staticExplanation, lang }', 'Groq'],
          ['POST /functions/v1/grade-interview-answer', 'TopicPage.jsx -> Interview Practice (single/batch/dispute)', '{ items:[...] } OR { question, modelAnswer, keyPoints, userAnswer, lang, dispute? }', 'Groq'],
        ],
      },
      {
        type: 'quiz',
        question: 'When a user marks a lesson as "completed", how does that fact reach the user_progress table?',
        options: [
          { id: 'a', text: 'An HTTP request hits a Spring Boot Controller, which writes to the database via JPA' },
          { id: 'b', text: 'supabase-js\'s .from(\'user_progress\').upsert(...) call makes a direct HTTP request to Supabase\'s auto-generated PostgREST REST API — there is no hand-written controller/endpoint in between' },
          { id: 'c', text: 'The qa-assistant Edge Function handles the request' },
          { id: 'd', text: 'It is never written to the database, only kept in localStorage' },
        ],
        correct: 'b',
        explanation: 'This project has no hand-written API layer for table CRUD. PostgREST reads the Postgres schema and auto-generates a REST endpoint for every table; supabase-js is just a client library that builds those HTTP requests for you. Edge Functions (like qa-assistant) only get involved when something needs a secret key or logic more complex than a simple table query — saving progress is not one of those cases.',
        retryQuestion: {
          question: 'Why does grading an interview answer (grade-interview-answer) go through an Edge Function instead of a direct table INSERT?',
          options: [
            { id: 'a', text: 'Because the Groq API key can only be kept server-side (inside the Edge Function); writing to or reading from a table cannot trigger an AI call' },
            { id: 'b', text: 'Because table INSERTs are forbidden in Supabase' },
            { id: 'c', text: 'Because Edge Functions are simply faster than tables' },
            { id: 'd', text: 'There is no technical reason, it was just written that way' },
          ],
          correct: 'a',
          explanation: 'Writing or reading a row happens inside Postgres itself; making an HTTP request to an external AI service (Groq) needs running server code. That is exactly the Edge Function\'s role: it verifies the user\'s JWT, reads the Groq secret key from an environment variable (never sending it to the browser), calls Groq, and returns the result as JSON.',
        },
      },
    ],
  },
  {
    title: '📜 API Swagger / OpenAPI Document',
    blocks: [
      {
        type: 'simple-box',
        emoji: '📜',
        content: 'This is a real API menu for this backend — it lists exactly what every endpoint expects and returns, in one standard format (OpenAPI/Swagger). Like a restaurant menu: you know what dish (endpoint) you can order, what goes into it (request body), and how it will arrive (response) before you order.',
      },
      {
        type: 'text',
        content: 'We can show this spec here without adding an extra login screen, because the whole /backend route is already wrapped in RequireAdmin — no non-admin or signed-out visitor can ever see this page (or the spec below) at all. The spec below covers the 7 tables + 3 RPCs + 3 Edge Functions described in the "🏛️ Real Architecture" tab; it deliberately leaves out the tutorial-only endpoints (Stripe/iyzico, etc.) because those do not exist in production.',
      },
      {
        type: 'steps',
        items: [
          { label: 'Paste it into editor.swagger.io', desc: 'Copy the YAML below, open editor.swagger.io, paste it into the left panel — the right side instantly renders a clickable API doc.' },
          { label: 'Import into Postman/Insomnia', desc: 'Postman > Import > Raw text with the same YAML adds every endpoint as a ready-made request in a collection.' },
          { label: 'Replace YOUR_PROJECT_REF with a real value', desc: 'Swap the https://YOUR_PROJECT_REF.supabase.co in servers.url for the real project URL of the environment you want to inspect (learnqa-test or learnqa-prod).' },
          { label: 'Add both the apikey AND Authorization headers', desc: 'Supabase requires BOTH an apikey (anon/publishable key) header AND an Authorization: Bearer <user JWT> header on every request — sending only one results in a 401 or an empty result.' },
        ],
      },
      {
        type: 'code',
        label: 'LearnQA.dev Backend — OpenAPI 3.0 (real, live endpoints)',
        language: 'yaml',
        code: backendOpenApiSpec,
      },
      {
        type: 'warning',
        content: 'Missing apikey header: Supabase returns 401 before the request ever reaches Postgres. Missing Authorization: Bearer <JWT> header: the request can look successful (because the apikey alone is enough to be accepted) BUT the RLS "auth.uid() = ..." rule never matches a user, so you get an empty result ([]) — this behaves like a silent failure. If you ever see "no 401, but also no data", check the Authorization header first.',
      },
    ],
  },
  {
    title: '🟢 Supabase project, schema, and security',
    blocks: [
      { type: 'simple-box', emoji: '🗄️', content: 'A database is like a school locker room. Row Level Security is the lock system: each student can open their own locker, not someone else’s.' },
      { type: 'steps', items: ['Create a Supabase project.', 'Open SQL Editor and run the schema.', 'Run RLS policies.', 'Add realtime publication for chat.'] },
      {
        type: 'table',
        headers: ['SQL block', 'What it does, in one sentence', 'What you lose without it'],
        rows: [
          ['1) Tables (schemaSql)', 'Creates profiles, user_progress, badges, user_badges, feedback, and chat_messages from scratch — builds the "lockers" where the app\'s data will live.', 'There is nowhere for React to persist anything; everything except login (progress, badges, comments, messages) is forgotten when the page closes.'],
          ['2) Row Level Security (rlsSql)', 'Locks every table just created and defines who can read/write which row (policy).', 'Tables exist but are unlocked; since every client shares the same publishable key, one user could read or change another user\'s progress/feedback rows.'],
          ['3) Auto profile trigger (profileTriggerSql / authProfileTriggerSql)', 'Whenever a new user is added to auth.users (via Google/GitHub/Magic Link), automatically inserts a matching row into public.profiles.', 'The user can sign in but the app finds no profile row to show their name/avatar — you would have to insert a row by hand for every single user.'],
          ['4) Realtime (realtimeSql)', 'Adds chat_messages (and optionally user_progress) to Supabase\'s Realtime publication.', 'Messages are saved to the database but never pushed to other open browsers instantly; users only see new messages after refreshing.'],
          ['Premium schema (premiumSchemaSql, in the "💳 Premium" tab)', 'Creates lessons, lesson_contents, payment_intents, payment_events, and adds columns like is_premium to profiles.', 'The database has no idea which lesson is free/locked or who paid; the paywall becomes a React-only check that anyone can bypass.'],
        ],
      },
      {
        type: 'warning',
        content: 'The order matters, it is not arbitrary: table first (create table), then enable RLS, then policies (create policy), then Realtime last. Think of it like Java — you define the class first, then add access control (private/public) to it; you cannot override a method on a class that does not exist yet.',
      },
        { type: 'code', label: '1) Tables', language: 'sql', code: schemaSql },
        schemaGuideBlock,
        { type: 'code', label: '2) Row Level Security', language: 'sql', code: rlsSql },
        rlsGuideBlock,
        { type: 'code', label: '3) Auto profile trigger', language: 'sql', code: profileTriggerSql },
        triggerGuideBlock,
        { type: 'code', label: '4) Realtime', language: 'sql', code: realtimeSql },
        realtimeGuideBlock,
      {
        type: 'quiz',
        question: 'Why centralize the `profiles.is_premium` check inside a `security definer` SQL function (`is_premium_user()`) instead of writing the same subquery inline in every RLS policy?',
        options: [
          { id: 'a', text: 'It produces fewer lines of code, purely cosmetic' },
          { id: 'b', text: 'Every policy reuses the same rule from one place, cutting the risk of duplicated or recursive logic' },
          { id: 'c', text: 'It disables RLS entirely' },
          { id: 'd', text: 'It only works for admin accounts' },
        ],
        correct: 'b',
        explanation: 'If the same check is copied into many policies, updating one and forgetting another creates a security hole. A single security definer function is like calling one shared authorization service method in Java — change it once, every policy uses the same truth.',
      
        retryQuestion: {
      "question": "Why is it considered a best practice to encapsulate complex authorization logic within a PostgreSQL function rather than writing raw, repetitive SQL snippets in RLS policies?",
      "options": [
            {
                  "id": "a",
                  "text": "SQL functions run significantly faster than raw subqueries"
            },
            {
                  "id": "b",
                  "text": "It ensures 'single source of truth' for authorization, simplifying maintenance and preventing logic drift across different policies"
            },
            {
                  "id": "c",
                  "text": "It is the only way to enable Row Level Security on a table"
            },
            {
                  "id": "d",
                  "text": "It automatically bypasses security audits"
            }
      ],
      "correct": "b",
      "explanation": "Centralizing authorization logic in a function adheres to the DRY (Don't Repeat Yourself) principle. If business rules change, you update one function instead of scanning and modifying every individual RLS policy defined across your database schemas."
}
},
    ],
  },
  {
    title: '🔐 Modern Auth: Google, GitHub, Microsoft, and Magic Link',
    blocks: [
      { type: 'simple-box', emoji: '🔑', content: 'Users can sign in with Google, GitHub, Microsoft, or a passwordless email Magic Link. Social logins go straight to a verified Supabase session; email users see an activation waiting state until they click the link.' },
      { type: 'simulation', title: { tr: 'OAuth + Magic Link akışı', en: 'OAuth + Magic Link flow' }, description: { tr: 'OAuth ve Magic Link dönüş akışını gösterir.', en: 'Shows OAuth and Magic Link return flow.' }, scenario: 'google-oauth-ui', color: '#4285f4', icon: '🔐' },
      {
        type: 'table',
        headers: ['Login type', 'Supabase function', 'Activation behavior'],
        rows: [
          ['Google', "signInWithOAuth({ provider: 'google' })", 'Session opens right after the provider confirms the user.'],
          ['GitHub', "signInWithOAuth({ provider: 'github' })", 'No extra email code needed; the OAuth session is enough.'],
          ['Microsoft', "signInWithOAuth({ provider: 'azure' })", "Supabase's provider name for Microsoft is azure."],
          ['Email Magic Link', 'signInWithOtp({ email, options.data.full_name })', 'The email is verified and the session opens once the user clicks the link.'],
        ],
      },
      {
        type: 'steps',
        items: [
          { label: 'Open Authentication in the Supabase Dashboard', desc: 'Click the 🔒 lock icon in the left sidebar. Sub-pages live here: Users, Sign In / Providers, URL Configuration — we need the last two.' },
          { label: 'Understand the Sign In / Providers page first', desc: 'This page has two parts: top-level "User Signups" toggles, and a list of "Auth Providers" below (Email, Google, GitHub, Azure...). The table below explains every toggle.' },
          { label: 'Then enable each provider (Google/GitHub/Microsoft) one by one', desc: 'For each provider you create a Client ID + Client Secret in its own developer console (Google Cloud, GitHub Settings, Azure Portal), then paste it into that provider\'s row in Supabase. Detailed steps for each provider are below.' },
          { label: 'Finally get URL Configuration right', desc: 'If Site URL and Redirect URLs are wrong, the provider screen succeeds but the browser lands on the wrong address (e.g. localhost). This step is the one most often skipped and the one that causes the most real bugs.' },
        ],
      },
      {
        type: 'table',
        headers: ['Sign In / Providers > "User Signups" toggle', 'What happens when ON', 'Status on LearnQA.dev'],
        rows: [
          ['Allow new users to sign up', 'Anyone arriving for the first time via Google/GitHub/Magic Link can automatically create a new account.', 'ON — we want anyone to be able to register, this is not an invite-only signup mode.'],
          ['Allow manual linking', 'A user who is already signed in can deliberately link a second provider (e.g. add GitHub while signed in with Google) to the same account.', 'OFF — Supabase already auto-links accounts that share the same verified email, so no extra "link account" button is needed.'],
          ['Allow anonymous sign-ins', 'A user can get a temporary/guest session without choosing any provider at all.', 'OFF — progress, badges, and certificates must belong to a real identity; we do not allow anonymous sessions.'],
          ['Confirm email', 'A passwordless/Magic Link user CANNOT open a session until they click the link in their email.', 'ON — this is required: the handle_verified_user trigger only fires once email_confirmed_at is set, so this toggle must stay on.'],
        ],
      },
      {
        type: 'warning',
        content: 'The 4 toggles above only control email/Magic Link and general signup behavior. They do not turn Google/GitHub/Microsoft on or off — those live further down the same page, in the "Auth Providers" list (below the Email row), each with its own Enable switch. The next 3 steps walk through enabling each one.',
      },
      {
        type: 'steps',
        items: [
          { label: '1) Create a project in Google Cloud Console', desc: 'Go to console.cloud.google.com, use the project picker at the top to create a new project (free, no card required).' },
          { label: '2) Fill in the OAuth consent screen', desc: 'Left menu: APIs & Services > OAuth consent screen. Pick User Type: External, set an app name (e.g. LearnQA.dev) and your support email, then save.' },
          { label: '3) Credentials > Create Credentials > OAuth client ID', desc: 'Choose Application type: Web application, give it a name (e.g. LearnQA Web).' },
          { label: '4) Copy Supabase\'s callback URL', desc: 'In Supabase Dashboard > Authentication > Sign In / Providers, click the Google row first — you will see a ready-made "Callback URL (for OAuth)" address (format: https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback). Copy it.' },
          { label: '5) Paste it into "Authorized redirect URIs" in Google', desc: 'Google works like adding elements to a Java List<String> — you can add as many redirect URIs as you want. You can add both your test and prod project callbacks to the same Google app if you like.' },
          { label: '6) Copy the Client ID and Client Secret', desc: 'Google shows you both values. Go back to the Google row in Supabase, turn on Enable, paste both values into their fields, then click Save.' },
        ],
      },
      {
        type: 'steps',
        items: [
          { label: '1) GitHub > Settings > Developer settings > OAuth Apps', desc: 'Go to github.com/settings/developers and click "New OAuth App".' },
          { label: '2) Fill in Application name + Homepage URL', desc: 'Application name: LearnQA.dev (or something like "LearnQA - Prod" if you want to tell environments apart). Homepage URL: https://learnqa.dev.' },
          { label: '3) Fill in the Authorization callback URL', desc: 'Paste the "Callback URL (for OAuth)" value shown on the GitHub row in Supabase.' },
          { label: '4) IMPORTANT — unlike Google, GitHub accepts only ONE URL', desc: 'There is no list here like Google/Azure\'s "Authorized redirect URIs" — just a single field. This means you must create TWO SEPARATE GitHub OAuth Apps, one for your test environment (learnqa-test) and one for production (learnqa-prod), each with its own callback URL.' },
          { label: '5) Generate a client secret', desc: 'Click "Generate a new client secret". This value is shown ONLY ONCE — copy it immediately, you cannot see the full value again after leaving the page.' },
          { label: '6) Enter it in Supabase', desc: 'Open Sign In / Providers > GitHub, turn on Enable, paste the Client ID and Client Secret, click Save.' },
        ],
      },
      {
        type: 'steps',
        items: [
          { label: '1) Go to App registrations in portal.azure.com', desc: 'Azure Active Directory > App registrations > "New registration".' },
          { label: '2) Add the Supabase callback as a Redirect URI (Web)', desc: 'Paste Supabase\'s callback URL for the Azure row here, choosing platform "Web".' },
          { label: '3) Azure accepts MULTIPLE redirect URIs, just like Google', desc: 'In the Authentication tab, click "Add URI" to add both your test and prod callbacks to the same app — unlike GitHub, you do NOT need a second, separate app.' },
          { label: '4) Certificates & secrets > New client secret', desc: 'Pick an expiry (e.g. 24 months), then copy the generated secret value IMMEDIATELY — it will not be shown in full again once you leave the page.' },
          { label: '5) Copy the Application (client) ID', desc: 'It is shown at the top of the Overview tab.' },
          { label: '6) Enter it in Supabase', desc: 'Open Sign In / Providers > Azure, turn on Enable, paste the Client ID and Client Secret, click Save. Note: even though the screen says "Microsoft", Supabase\'s provider code name is always azure (signInWithOAuth({ provider: \'azure\' })).' },
        ],
      },
      {
        type: 'table',
        headers: ['URL Configuration field', 'What it does', 'LearnQA.dev\'s real value'],
        rows: [
          ['Site URL', 'The default address Supabase silently falls back to when a redirectTo is not specified, or does not match the allow-list below.', 'https://learnqa.dev in production; http://localhost:5173 in local development.'],
          ['Redirect URLs (allow-list)', 'The exact addresses that are ACTUALLY allowed after an OAuth/Magic Link return. ** is a wildcard that allows every sub-route (e.g. /selenium, /java).', 'https://learnqa.dev/auth/callback and https://learnqa.dev/** — both must be present.'],
        ],
      },
      {
        type: 'warning',
        content: 'A real production bug (it happened, noted here): on the learnqa-prod project, Site URL had been left as http://localhost:3000 and https://learnqa.dev/auth/callback was missing from Redirect URLs. Result: a real user signing in with Google on the live site (learnqa.dev) got redirected to http://localhost:3000/#access_token=... in their browser (ERR_CONNECTION_REFUSED) — because Supabase silently falls back to Site URL whenever the requested redirectTo is not in the allow-list. The React code (getRedirectUrl(), which uses window.location.origin) had been correct all along; the problem was entirely this Dashboard setting. Lesson: when you spin up a new prod environment, check URL Configuration by hand in the Dashboard — never assume it from the code.',
      },
      {
        type: 'text',
        content: 'learnqa-test and learnqa-prod are two completely separate Supabase projects; neither sees the other\'s credentials automatically. Google and Azure can share the same OAuth app between test and prod (because both accept multiple redirect URIs) — you just need to enter the same Client ID/Secret into both Supabase projects separately. GitHub cannot share like this: because of the single-callback-URL limit, you need two INDEPENDENT GitHub OAuth Apps (two different Client ID/Secret pairs) for test and prod.',
      },
      {
        type: 'quiz',
        question: 'You set up a GitHub OAuth App for learnqa-test and it works. Now you want the same app to also support GitHub sign-in on learnqa-prod. What is the correct approach?',
        options: [
          { id: 'a', text: 'Add the prod callback as a second line in the existing GitHub OAuth App\'s "Authorization callback URL" field' },
          { id: 'b', text: 'GitHub OAuth Apps accept only ONE callback URL, so you must create an independent second GitHub OAuth App (its own callback, its own Client ID/Secret) and enter that into learnqa-prod\'s Supabase project' },
          { id: 'c', text: 'Nothing needs to change, GitHub automatically recognizes every Supabase project' },
          { id: 'd', text: 'Copying learnqa-test\'s Client Secret into learnqa-prod is enough, the callback URL does not matter' },
        ],
        correct: 'b',
        explanation: 'Google and Azure App registrations both accept multiple redirect URIs, so one app can be shared across environments. A GitHub OAuth App is designed with a single callback URL field — there is no room for a second one. That is why GitHub requires a separate OAuth App per environment (test/prod); otherwise one of the two callbacks will not match and sign-in fails with "redirect_uri is not associated with this application".',
        retryQuestion: {
          question: 'In Supabase, a user clicks "Sign in with Microsoft" but the code calls signInWithOAuth with provider: \'microsoft\'. What happens?',
          options: [
            { id: 'a', text: 'Supabase automatically converts it to azure, no problem' },
            { id: 'b', text: 'Supabase returns an error because that is not a recognized provider name; the correct value for Microsoft sign-in is always "azure"' },
            { id: 'c', text: 'The user is redirected straight to the Google screen' },
            { id: 'd', text: 'The sign-in redirects to localhost' },
          ],
          correct: 'b',
          explanation: 'Supabase Auth always identifies Microsoft/Azure AD sign-in by the provider name "azure". Sending a name like "microsoft" is not recognized and the request fails — the Dashboard label saying "Microsoft" does not mean the code-level string is "microsoft" too.',
        },
      },
      { type: 'code', label: '7) Profile trigger for verified users', language: 'sql', code: authProfileTriggerSql },
      { type: 'code', label: '8) Redirect allow-list settings', language: 'bash', code: authRedirectChecklistCode },
      authRedirectGuideBlock,
      { type: 'code', label: '9) Supabase client', language: 'javascript', code: supabaseClientCode },
      { type: 'code', label: '10) OAuth + Magic Link Auth API', language: 'javascript', code: authCode },
      authGuideBlock,
      { type: 'code', label: '11) /auth/callback route component', language: 'javascript', code: authCallbackCode },
      { type: 'code', label: '12) AuthPanel: social login + passwordless signup', language: 'jsx', code: magicLinkFormCode },
      authPracticeBlock,
      { type: 'warning', content: 'Magic Link success usually returns user/session as null immediately. That is normal: show a check-your-email screen until the user clicks the activation link.' },
      {
        type: 'table',
        headers: ['Risk', 'Wrong approach', 'Secure approach'],
        rows: [
          ['Magic Link opened on a different device/browser', 'Assume the link always works anywhere without warning the user', 'Tell the user to open the link in the same browser that sent the request; the PKCE code_verifier lives only in that browser, otherwise the exchange fails with "invalid code verifier".'],
          ['The same email signs in through multiple providers', 'Assume Google, GitHub, and Magic Link automatically merge into one account', "Verify Supabase's account linking behavior under Authentication > Providers with a real test; if it is not guaranteed, recommend one login method per user or design for separate accounts."],
          ['The Magic Link form is public', 'Ship it without rate limiting or CAPTCHA', 'Keep Supabase default OTP rate limits enabled and add Bot and Abuse Protection (CAPTCHA) under Authentication > Settings before going public, otherwise anyone can spam links to someone else’s email.'],
        ],
      },
      {
        type: 'quiz',
        question: 'A user requests a Magic Link from their desktop browser, then opens the email and clicks the link from their phone’s mail app. What happens?',
        options: [
          { id: 'a', text: 'They sign in without any issue' },
          { id: 'b', text: 'The exchange fails with "invalid code verifier" because the PKCE code_verifier only exists in the browser that started the request' },
          { id: 'c', text: 'Supabase automatically redirects them back to the desktop browser' },
          { id: 'd', text: 'The two devices get paired automatically' },
        ],
        correct: 'b',
        explanation: 'In the PKCE flow, the code_verifier only lives in the local storage of the browser that started the request. Opening the link from a different browser or device cannot find that key. Telling users to open the link in the same browser that requested it prevents this error.',
      
        retryQuestion: {
      "question": "When using PKCE (Proof Key for Code Exchange) with Supabase Auth, why might a login attempt fail when a user clicks a confirmation link on a device different from the one that triggered the request?",
      "options": [
            {
                  "id": "a",
                  "text": "The email provider blocks different device access"
            },
            {
                  "id": "b",
                  "text": "The code_verifier key is stored locally in the initiating browser's storage, making it inaccessible to the secondary device"
            },
            {
                  "id": "c",
                  "text": "Supabase restricts concurrent logins from different IP addresses"
            },
            {
                  "id": "d",
                  "text": "Magic Links are valid only for exactly 10 seconds"
            }
      ],
      "correct": "b",
      "explanation": "The PKCE flow relies on a 'code verifier' generated and saved in the browser's local storage during the initial request. Since a different device or browser lacks this specific key, the authentication handshake cannot be completed, leading to an invalidation error."
}
},
    ],
  },
  {
    title: '📍 Save progress and resume',
    blocks: [
      { type: 'simple-box', emoji: '📌', content: 'Saving progress is like placing a bookmark in a book. When the user returns, the app opens the right page again.' },
      { type: 'simulation', title: { tr: 'Progress kaydı: React state -> Supabase row -> tekrar açınca resume', en: 'Progress save: React state -> Supabase row -> resume on return' }, description: { tr: 'Progress upsert ve resume akışını gösterir.', en: 'Shows progress upsert and resume flow.' }, scenario: 'backend-progress-flow', color: '#10b981', icon: '📍' },
        { type: 'code', label: 'Progress API', language: 'javascript', code: progressCode },
        progressGuideBlock,
      {
        type: 'quiz',
        question: 'If a user marks the same lesson/topic as completed more than once, what should happen in `user_progress`?',
        options: [
          { id: 'a', text: 'A new row is inserted every time' },
          { id: 'b', text: 'The existing row is updated via upsert based on the user_id + lesson_slug + topic_slug unique constraint' },
          { id: 'c', text: 'The old row is deleted and nothing is saved' },
          { id: 'd', text: 'The save is blocked with an error' },
        ],
        correct: 'b',
        explanation: 'Without a unique constraint, every "completed" mark opens a new row and resume logic cannot tell which row is current. Upsert plus unique(user_id, lesson_slug, topic_slug) is like calling put() on a Java Map with the same key again: the value updates, no new entry appears.',
      
        retryQuestion: {
      "question": "When a student clicks 'Save' on a quiz result multiple times, what is the best database strategy to prevent duplicate result entries for the same user and assessment?",
      "options": [
            {
                  "id": "a",
                  "text": "Append a new record on every save regardless of existence"
            },
            {
                  "id": "b",
                  "text": "Use an upsert operation with a composite unique index on (user_id, assessment_id)"
            },
            {
                  "id": "c",
                  "text": "Delete all previous records before saving the new result"
            },
            {
                  "id": "d",
                  "text": "Ignore subsequent clicks only in the client-side code"
            }
      ],
      "correct": "b",
      "explanation": "Using an upsert with a unique constraint ensures that the state remains consistent. Much like checking if a key exists in a Map, an upsert updates the record if it exists or creates it if it doesn't, preventing data duplication without needing additional application-level logic."
}
},
    ],
  },
  {
    title: '🏅 Award badges',
    blocks: [
      { type: 'simple-box', emoji: '🏆', content: 'A badge is the teacher’s stamp saying “you passed this milestone.”' },
      { type: 'text', content: 'For the first version, a small client-side badge check is enough for learning motivation. If badges become important, move award logic to an Edge Function or backend endpoint.' },
        { type: 'code', label: 'Simple badge code', language: 'javascript', code: badgeCode },
        badgeGuideBlock,
      {
        type: 'quiz',
        question: 'What happens if a badge-awarding function uses plain `insert` instead of an idempotent `upsert`?',
        options: [
          { id: 'a', text: 'The user can earn the same badge multiple times, or the insert throws a duplicate-key error' },
          { id: 'b', text: 'Nothing changes, behavior stays the same' },
          { id: 'c', text: 'The badge gets deleted automatically' },
          { id: 'd', text: 'RLS blocks it on its own' },
        ],
        correct: 'a',
        explanation: 'If user_badges has unique(user_id, badge_id), a plain insert throws on the second attempt; without it, the same badge keeps piling up. Upsert plus onConflict leaves the "does this badge already exist?" question to the database — like trying to add the same element to a Java Set twice, the result should always stay a single entry.',
      
        retryQuestion: {
      "question": "Why is using a plain SQL 'INSERT' problematic for a function that tracks user 'daily streak' updates?",
      "options": [
            {
                  "id": "a",
                  "text": "It will cause an error on repeat attempts or create redundant rows if the unique key is missing"
            },
            {
                  "id": "b",
                  "text": "It will automatically reset the streak to zero"
            },
            {
                  "id": "c",
                  "text": "It is faster than upsert but less secure"
            },
            {
                  "id": "d",
                  "text": "It automatically disables Row Level Security"
            }
      ],
      "correct": "a",
      "explanation": "If the table has a unique constraint, a simple insert will fail with a duplicate key error; if it doesn't, you will end up with multiple records for the same day. Using an upsert with 'ON CONFLICT' allows the database to handle the state transition gracefully, ensuring only one record represents the streak for that specific period."
}
},
    ],
  },
  {
    title: '💬 Feedback form',
    blocks: [
      { type: 'simple-box', emoji: '📝', content: 'Feedback is the suggestion box in the classroom. The user writes what is missing, and the app stores who wrote it and from which page.' },
        { type: 'code', label: 'Feedback API', language: 'javascript', code: feedbackCode },
        feedbackGuideBlock,
      {
        type: 'quiz',
        question: 'What is the real practical benefit of storing `page_path` on a feedback row?',
        options: [
          { id: 'a', text: 'It is purely decorative, no real benefit' },
          { id: 'b', text: 'It shows which page the feedback came from, making triage and prioritization easier' },
          { id: 'c', text: 'It disables RLS' },
          { id: 'd', text: 'It verifies the user’s password' },
        ],
        correct: 'b',
        explanation: 'Among 50 rows saying "this section is missing on the Selenium page," finding which page each one came from without page_path is hard. It is like adding the request path to a Java log line — it shortens debugging and triage time the moment something needs attention.',
      
        retryQuestion: {
      "question": "What is the primary technical advantage of storing the 'user_agent' string along with an error log in a tracking table?",
      "options": [
            {
                  "id": "a",
                  "text": "It replaces the need for server-side logging"
            },
            {
                  "id": "b",
                  "text": "It helps correlate bugs with specific browser versions or device types, drastically improving debugging efficiency"
            },
            {
                  "id": "c",
                  "text": "It automatically patches the user's browser bugs"
            },
            {
                  "id": "d",
                  "text": "It serves no technical purpose other than analytics"
            }
      ],
      "correct": "b",
      "explanation": "Much like attaching a stack trace to an error, metadata like 'user_agent' provides crucial context. When triage is required, knowing that a bug is isolated to a specific browser or version saves hours of investigation by allowing developers to reproduce the issue in the correct environment immediately."
}
},
    ],
  },
  {
    title: '🟣 Realtime chat between online members',
    blocks: [
      { type: 'simple-box', emoji: '💭', content: 'Realtime chat is like students speaking in the same classroom: when one message is sent, everybody sees it without refreshing.' },
      { type: 'simulation', title: { tr: 'Realtime Chat: insert -> channel -> diğer kullanıcıların ekranı', en: 'Realtime Chat: insert -> channel -> other users screens' }, description: { tr: 'Realtime chat event akışını gösterir.', en: 'Shows the realtime chat event flow.' }, scenario: 'supabase-realtime-chat', color: '#8b5cf6', icon: '🟣' },
        { type: 'code', label: 'Chat API', language: 'javascript', code: chatCode },
        chatGuideBlock,
      {
        type: 'quiz',
        question: 'A developer writes `supabase.channel(...).on(\'postgres_changes\', {...}, callback)` but forgets to call `.subscribe()`. What happens?',
        options: [
          { id: 'a', text: 'Messages still arrive live as normal' },
          { id: 'b', text: 'The channel never activates; no realtime event ever fires' },
          { id: 'c', text: 'Only the first message arrives' },
          { id: 'd', text: 'RLS throws an error' },
        ],
        correct: 'b',
        explanation: '`.on(...)` only registers a listener; `.subscribe()` is the call that actually opens the channel. It is like defining an event listener in Java but never calling addListener() to register it — the code compiles, but no event is ever handled.',
      
        retryQuestion: {
      "question": "A developer sets up a Supabase Realtime subscription with `supabase.channel('public:users').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, callback)`. If they fail to append `.subscribe()` to this chain, what is the outcome?",
      "options": [
            {
                  "id": "a",
                  "text": "The subscription is implicitly active by default"
            },
            {
                  "id": "b",
                  "text": "The event listener is defined but never initiates a connection to the realtime server"
            },
            {
                  "id": "c",
                  "text": "The browser console logs an error regarding missing database permissions"
            },
            {
                  "id": "d",
                  "text": "Only historical data is synced, but no new changes"
            }
      ],
      "correct": "b",
      "explanation": "Registering the listener via `.on(...)` merely sets up the logic for handling incoming events. The `.subscribe()` method is the mandatory trigger that establishes the WebSocket connection to the Supabase Realtime server. Without it, the client remains disconnected and silent."
}
},
    ],
  },
  {
    title: '💳 Premium payment, webhook, and paywall security',
    blocks: [
      { type: 'simple-box', emoji: '🔒', content: 'Premium membership rule: React manages UX, but Supabase RLS and Edge Functions grant real access. Card data, Stripe secrets, iyzico secrets, and service-role keys never go into GitHub Pages client code.' },
      { type: 'warning', content: 'A client-side lock is not security. Users can bypass React with DevTools, route changes, or direct fetch calls. Real content must live behind lesson_contents RLS or private Supabase Storage policies.' },
      {
        type: 'table',
        headers: ['Flow', 'Secure piece', 'Why?'],
        rows: [
          ['Start Stripe payment', 'create-stripe-checkout Edge Function', 'Secrets stay server-side and user_id is verified.'],
          ['Start iyzico payment', 'create-iyzico-checkout Edge Function', 'conversation_id is created so the webhook can map paymentConversationId to the user.'],
          ['Payment result', 'stripe-webhook / iyzico-webhook', 'Premium opens only after provider signature verification.'],
          ['Webhook access', 'supabase/config.toml verify_jwt=false', 'Providers do not send Supabase JWTs; provider signatures provide the security.'],
          ['Premium state', 'profiles.is_premium + premium_until', 'UI and RLS read the same source of truth.'],
          ['Content barrier', 'lesson_contents RLS', 'Locked content does not leave the database for non-premium users.'],
          ['Webhook retry', 'payment_events unique(provider, provider_event_id)', 'A provider retry is processed only once.'],
        ],
      },
      { type: 'code', label: '1) Premium tables and helper functions', language: 'sql', code: premiumSchemaSql },
      premiumSchemaGuideBlock,
      { type: 'code', label: '2) Premium RLS and paywall policies', language: 'sql', code: premiumRlsSql },
      premiumRlsGuideBlock,
      { type: 'code', label: '3) Supabase Function config: webhook JWT gate', language: 'toml', code: supabaseFunctionConfigCode },
      { type: 'code', label: '4) Stripe checkout session Edge Function', language: 'typescript', code: stripeCheckoutFunctionCode },
      { type: 'code', label: '5) iyzico Checkout Form Edge Function', language: 'typescript', code: iyzicoCheckoutFunctionCode },
      { type: 'code', label: '6) Stripe webhook handler', language: 'typescript', code: stripeWebhookFunctionCode },
      { type: 'code', label: '7) iyzico webhook handler + CF-Retrieve verification', language: 'typescript', code: iyzicoWebhookFunctionCode },
      webhookGuideBlock,
      { type: 'code', label: '8) React paywall and profile state', language: 'javascript', code: paywallFrontendCode },
      paywallGuideBlock,
      {
        type: 'steps',
        items: [
          'Add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SIGNING_SECRET, IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_PREMIUM_PRICE, IYZICO_PREMIUM_CURRENCY, and SUPABASE_SERVICE_ROLE_KEY as Edge Function secrets.',
          'Run the premium schema SQL, then the premium RLS SQL.',
          'Set verify_jwt = false for stripe-webhook and iyzico-webhook in supabase/config.toml.',
          'Deploy create-stripe-checkout, create-iyzico-checkout, stripe-webhook, and iyzico-webhook functions.',
          'Register Supabase Function URLs in Stripe Dashboard and iyzico Merchant Portal.',
          'Test RLS with a non-premium and premium user.',
        ],
      },
      {
        type: 'table',
        headers: ['Risk', 'Wrong approach', 'Secure approach'],
        rows: [
          ['Webhook manipulation', 'Trust JSON status SUCCESS', 'Verify Stripe-Signature or X-IYZ-SIGNATURE-V3.'],
          ['RLS bypass', 'Show only a React modal', 'Protect lesson_contents and Storage objects with RLS.'],
          ['Secret leak', 'Put STRIPE_SECRET_KEY in client env', 'Keep secrets only in Edge Function secrets.'],
          ['Duplicate event', 'Run update on every webhook', 'Use payment_events unique constraint for idempotency.'],
          ['Premium column tampering', 'Let users update every profile field', 'Revoke premium column updates; only Edge Functions update them.'],
          ['Amount verification', 'Trust SUCCESS without checking amount', 'Check Stripe amount_total; in iyzico Checkout Form, verify paidPrice/currency with CF-Retrieve.'],
        ],
      },
      {
        type: 'quiz',
        question: 'If a Stripe webhook handler trusts a `status: success` field in the raw JSON and sets `is_premium = true` without verifying the signature, what is the real risk?',
        options: [
          { id: 'a', text: 'Only a small performance cost' },
          { id: 'b', text: 'Anyone can grant themselves free premium with a forged POST request' },
          { id: 'c', text: 'Stripe blocks this automatically' },
          { id: 'd', text: 'There is no real risk since the JSON is already safe' },
        ],
        correct: 'b',
        explanation: 'The webhook endpoint is a public URL; without signature verification, every incoming POST is trusted blindly. It is like granting admin rights to any REST request without checking an Authorization header in Java — an attacker only needs to mimic the right JSON shape to earn premium.',
      
        retryQuestion: {
      "question": "An API endpoint for payment processing reads the property `payment_verified = true` from a request body provided by a client to update a database order status. Why is this a major security flaw?",
      "options": [
            {
                  "id": "a",
                  "text": "The database driver cannot handle boolean flags from JSON requests"
            },
            {
                  "id": "b",
                  "text": "It relies on client-provided data instead of validating the transaction with the payment provider's cryptographic signature"
            },
            {
                  "id": "c",
                  "text": "The endpoint will be rate-limited by the server automatically"
            },
            {
                  "id": "d",
                  "text": "JSON bodies are encrypted and therefore impossible to read"
            }
      ],
      "correct": "b",
      "explanation": "Publicly exposed endpoints must never trust client-supplied status flags. By accepting `payment_verified = true` directly from the request, the API allows any user to spoof a successful transaction by crafting a custom HTTP request, bypassing the actual payment verification flow required for secure e-commerce."
}
},
    ],
  },
  {
    title: '🚀 React integration, test, and deploy checklist',
    blocks: [
      { type: 'simple-box', emoji: '🧩', content: 'The final step is plugging the pieces into the app like LEGO: package, env file, client, login, progress, then build.' },
      { type: 'installation', steps: [{ cmd: 'npm install @supabase/supabase-js', explanation: 'Install the official Supabase JavaScript client.' }, { cmd: 'New file: .env.local', explanation: 'Store project URL and publishable key locally.' }, { cmd: 'npm run dev', explanation: 'Run locally and test Google login.' }, { cmd: 'npm run build', explanation: 'Verify production build.' }] },
        { type: 'code', label: 'Install commands', language: 'bash', code: installCode },
        { type: 'code', label: '.env.local', language: 'bash', code: envCode },
        installGuideBlock,
      {
        type: 'quiz',
        question: 'What happens if `SUPABASE_SERVICE_ROLE_KEY` is placed in a `VITE_`-prefixed env variable used by the React app?',
        options: [
          { id: 'a', text: 'It only runs server-side, so it stays safe' },
          { id: 'b', text: 'Vite bakes it into the public browser bundle, exposing the admin key that bypasses RLS to anyone' },
          { id: 'c', text: 'The build fails' },
          { id: 'd', text: 'It only works in local dev, never in production' },
        ],
        correct: 'b',
        explanation: 'Every `VITE_`-prefixed variable is intentionally inlined into the public JS bundle by Vite — fine for a publishable/anon key, disastrous for a service_role key. It is like hardcoding an admin password into the frontend and assuming nobody looks; anyone can open the compiled JS file and read it.',
      
        retryQuestion: {
      "question": "Why is it considered a critical security vulnerability to include a Supabase `service_role` key in a file loaded by Vite with the `VITE_` prefix?",
      "options": [
            {
                  "id": "a",
                  "text": "Vite will automatically encrypt the key during the bundling process"
            },
            {
                  "id": "b",
                  "text": "Vite includes all `VITE_` prefixed variables in the client-side JavaScript bundle, making the admin key visible in browser developer tools"
            },
            {
                  "id": "c",
                  "text": "The application will immediately crash because service roles are forbidden in the browser"
            },
            {
                  "id": "d",
                  "text": "The key will be sent to every user's browser but remain inaccessible to the user"
            }
      ],
      "correct": "b",
      "explanation": "Vite is designed to expose any environment variable prefixed with `VITE_` to the client-side frontend code. The `service_role` key bypasses Row Level Security (RLS) entirely; if it is embedded in the frontend bundle, anyone inspecting the network traffic or source code can acquire full admin access to your database."
}
},
    ],
  },
];

export const backendData = {
  tr: {
    hero: {
      title: '🧩 Basit Backend',
      subtitle: 'Modern Auth, Progress, Rozet, Feedback, Realtime Chat ve Premium Paywall',
      intro: 'LearnQA.dev uygulamasına Supabase ile kişisel kullanıcı deneyimi eklemeyi adım adım öğren: Google/GitHub/Microsoft giriş, Magic Link aktivasyon, kaldığı yerden devam, ders ilerleme kaydı, rozetler, öneri kutusu, online sohbet, sembolik premium ödeme ve güvenli paywall.',
    },
    tabs: ['🧭 Yol Haritası', '🏛️ Gerçek Mimari', '📜 API Swagger', '🟢 Supabase & SQL', '🔐 Auth', '📍 Progress', '🏅 Rozetler', '💬 Feedback', '🟣 Realtime Chat', '💳 Premium', '🚀 Entegrasyon'],
    sections: trSections,
  },
  en: {
    hero: {
      title: '🧩 Simple Backend',
      subtitle: 'Modern Auth, Progress, Badges, Feedback, Realtime Chat, and Premium Paywall',
      intro: 'Learn how to add a personal backend experience to LearnQA.dev with Supabase: Google/GitHub/Microsoft login, Magic Link activation, resume points, progress tracking, badges, feedback, online chat, symbolic premium payment, and secure paywall.',
    },
    tabs: ['🧭 Roadmap', '🏛️ Real Architecture', '📜 API Swagger', '🟢 Supabase & SQL', '🔐 Auth', '📍 Progress', '🏅 Badges', '💬 Feedback', '🟣 Realtime Chat', '💳 Premium', '🚀 Integration'],
    sections: enSections,
  },
};
