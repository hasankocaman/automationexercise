# Trend Skill Tracker — Plan

> Dal: `feature/trending-skills-widget` (main'den açıldı, 2026-07-10).
> Bu dosya kalıcı bir kural dosyası değildir — bu özelliğin proje planı ve
> iş bölümüdür. Tamamlanınca `NEXT_SESSION.md`'ye özet taşınır, bu dosya
> referans olarak kalır.

## Amaç

JSearch (RapidAPI) → Supabase Edge Function (günlük, GitHub Actions cron) →
Groq (skill extraction) → `trending_skills` tablosu → learnqa.dev ana
sayfasında "Bu Hafta En Çok Aranan Skill'ler" widget'ı.

## Mimari Kararlar (ilk değerlendirmede düzeltilenler)

1. **Cron: GitHub Actions**, Supabase `pg_cron`/`pg_net` değil. Repo'da
   migration/extension altyapısı yok, `deploy.yml` zaten GitHub Actions'ta —
   aynı yere ek bir scheduled workflow eklemek en az sürtünmeli yol.
2. **Rolling window, sonsuz artan sayaç değil.** Ham log tablosu
   (`job_skill_snapshots`, her koşuda skill-mention başına 1 satır) +
   son 7 günün penceresinden her koşuda **yeniden hesaplanan**
   `trending_skills` (truncate + recompute). Basit `UPSERT frequency+1`
   yaklaşımı skill'leri süresiz biriktirir, "bu hafta trend" değil "en eski
   takip edileni" gösterir — kullanılmadı.
3. **Skill sayımı LLM'e değil, deterministik koda bırakılır.** Groq'a
   ilan başına (birkaç ilanlık batch halinde) sadece "bu ilanların
   skill listesi ne" sorulur; frekans TS tarafında `Map` ile sayılır.
   LLM'e "30 ilan arasında kaç kere geçti, say" dedirtmek güvenilmez.
4. **RLS:** `trending_skills` public SELECT, INSERT/UPDATE/DELETE sadece
   service-role (edge function). Anon key ile yazma kapalı.
5. **Skill → route eşlemesi curated, otomatik değil.** LLM'in ürettiği
   serbest metin skill isimleri mevcut route'larla güvenilir eşleşmez;
   küçük bir `SKILL_ROUTE_MAP` sözlüğü (frontend'de) sadece haritada olan
   skill'leri tıklanabilir yapar, diğerleri düz etiket kalır.

## İş Paketleri

| WP | İçerik | Dosyalar | Kim |
|----|--------|----------|-----|
| A | SQL şema (`job_skill_snapshots`, `trending_skills`, RLS) | `supabase/functions/trending-skills-sync/schema.sql` | **Fable** |
| B | Edge Function: JSearch fetch → Groq batch extraction → deterministik aggregation → 7 günlük recompute | `supabase/functions/trending-skills-sync/index.ts` | **Fable** |
| C | GitHub Actions cron workflow | `.github/workflows/trending-skills-cron.yml` | Sonnet |
| D | Frontend widget + HomePage entegrasyonu + i18n | `src/components/TrendingSkillsWidget.jsx`, `HomePage.jsx`, `LanguageContext.jsx` | Sonnet |
| E | Dokümantasyon güncellemesi (bu dosya + `NEXT_SESSION.md`) | bu dosya, `.claude/NEXT_SESSION.md` | Sonnet (taslak) + Fable (son kontrol) |

**Neden bu bölüm:** WP-A/B, JSearch payload şekli, Groq batching stratejisi
ve rolling-window aggregation mantığı gibi tasarım kararlarının çoğunu
içeriyor — hataya en açık, en çok muhakeme gerektiren kısım burası, o
yüzden Fable tarafından yapılıyor. WP-C/D, WP-A/B netleşmiş şema ve
fonksiyon sözleşmesi üzerine kalıp takip eden, bu repoda zaten örneği bol
olan mekanik iş (mevcut `deploy.yml` deseni, mevcut `HomePage.jsx` kategori
kartı deseni) — Sonnet'e uygun.

---

## WP-A + WP-B Detay (Fable — bu oturumda yapılacak)

### Şema

```sql
create table job_skill_snapshots (
  id bigint generated always as identity primary key,
  run_date date not null default current_date,
  skill_name text not null,
  job_title text not null,
  source text not null default 'jsearch',
  created_at timestamptz not null default now()
);

create index idx_job_skill_snapshots_run_date on job_skill_snapshots(run_date);

create table trending_skills (
  skill_name text primary key,
  frequency int not null,
  last_seen_in text[] not null default '{}',
  window_days int not null default 7,
  updated_at timestamptz not null default now()
);

alter table job_skill_snapshots enable row level security;
alter table trending_skills enable row level security;

create policy "trending_skills public read" on trending_skills
  for select using (true);
-- job_skill_snapshots: hiçbir public policy yok, sadece service-role okur/yazar.
```

### Edge Function akışı (`trending-skills-sync/index.ts`)

1. `RAPIDAPI_KEY` ve `GROQ_API_KEY` env'den oku, yoksa 500 dön.
2. JSearch'e `"QA Engineer OR Test Automation Engineer"` query'siyle istek
   at, 20-30 ilan (title + description) al.
3. İlanları 5'li batch'lere böl; her batch için tek Groq çağrısı —
   prompt: "Bu ilanların her biri için gerekli teknik skill listesini JSON
   dizisi olarak çıkar, sayma yapma, sadece liste ver."
4. Groq'tan gelen `{jobTitle, skills: string[]}[]` sonuçlarını TS'te
   `Map<string, {count, jobTitles: Set}>` ile deterministik say.
5. Bugünün `run_date`'i için `job_skill_snapshots`'a satırları insert et.
6. Son 7 günün (`run_date >= today - 7`) `job_skill_snapshots`'ını
   `skill_name` bazında grupla, `trending_skills` tablosunu bu sonuçla
   **truncate + insert** (recompute) et.
7. Service-role client kullanılır (bu fonksiyon kullanıcı auth'u değil,
   cron secret ile korunur — WP-C'de detay).

---

## Sonnet İçin Görevler ve Prompt

WP-A (`supabase/functions/trending-skills-sync/schema.sql`) ve WP-B
(`supabase/functions/trending-skills-sync/index.ts`) Fable tarafından bu
dalda (`feature/trending-skills-widget`) tamamlandı. Fonksiyonun döndürdüğü
sözleşme: cron başarıyla koşunca `trending_skills` tablosunda
`{ skill_name: string (PK), frequency: number, last_seen_in: string[] (max 5
iş ilanı başlığı), window_days: number (sabit 7), updated_at: timestamptz }`
satırları bulunur, `frequency` azalan sırada okunursa "en trend" skill'ler
üstte çıkar. Aşağıdaki iki görev (WP-C, WP-D) ve WP-E'nin dokümantasyon
kısmı bu sözleşmeye göre, aşağıdaki promptla yeni bir Claude Code (Sonnet)
oturumunda yaptırılabilir:

```
Bu repoda (learnqa.dev / automationexercise) feature/trending-skills-widget
dalındasın. Fable, supabase/functions/trending-skills-sync/ altında schema.sql
ve index.ts dosyalarını zaten yazdı (JSearch + Groq ile günlük "trend QA
skill'leri" hesaplayan bir edge function). Senin işin bu fonksiyonun ÇIKTISINI
tüketen iki parçayı eklemek, fonksiyonun kendi mantığına dokunma:

1. .github/workflows/trending-skills-cron.yml — mevcut .github/workflows/deploy.yml
   dosyasının yanına, günde 1 kez (örn. `cron: '0 6 * * *'`) çalışan bir GitHub
   Actions workflow'u. Tek işi: trending-skills-sync edge function'ının URL'ine
   (https://<PROJECT_REF>.supabase.co/functions/v1/trending-skills-sync) POST
   isteği atmak, header olarak `x-cron-secret: ${{ secrets.CRON_INVOKE_SECRET }}`
   göndermek. PROJECT_REF'i de bir GitHub Actions secret'i olarak oku
   (SUPABASE_PROJECT_REF), hardcode etme. curl veya bir action step'i kullanabilirsin.
   İstek başarısız (HTTP >=400) dönerse workflow FAIL olmalı (fail-fast, sessizce
   yutma) — bu QA/otomasyon öğreten bir site, kendi CI'ında sessiz hata bırakmak
   kabul edilemez.

2. src/components/TrendingSkillsWidget.jsx — HomePage.jsx'teki mevcut kategori
   kartı deseniyle BİREBİR aynı görsel dilde yeni bir bileşen (bkz. HomePage.jsx
   satır ~781-799'daki "Practice Area — full width below" bölümü, aynı desende:
   rounded-xl border, darkMode ? bg-gray-800 border-gray-700 : bg-white
   border-{renk}-100 shadow-sm, başlıkta emoji + text-xs font-bold uppercase).
   - Supabase anon client ile `trending_skills` tablosundan `frequency` DESC
     sıralı ilk 10 satırı çeker (mevcut src/context/AuthContext.jsx veya başka
     bir component'teki supabase client import deseninden kopyala, yeni bir
     client instance icat etme).
   - Her skill bir "tag" olarak render edilir (bar chart değil, mevcut nb()
     helper'ındaki gibi renkli pill/badge — HomePage.jsx'te `nb('emerald')` gibi
     kullanımlara bak, aynı görsel dili kopyala).
   - Küçük bir SKILL_ROUTE_MAP sözlüğü tanımla (örn. "Playwright" → "/playwright",
     "Selenium" → "/selenium", "API Testing" → "/postman", "Docker" → "/docker"
     — mevcut route haritasına göre CLAUDE.md Bölüm 2'yi referans al). SADECE bu
     haritada karşılığı olan skill'ler <Link> olarak tıklanabilir olsun, haritada
     olmayanlar düz <span> tag kalsın — LLM'in ürettiği serbest metin skill
     isimlerini route'lara otomatik eşlemeye ÇALIŞMA, güvenilmez.
   - Widget'ı HomePage.jsx'e, "Practice Area" bölümünden (satır ~799 civarı,
     kapanıştan) hemen sonra, kendi rounded-xl kutusu olarak ekle.
   - Başlık ve tüm UI metinleri için src/locales/tr.json ve en.json'a
     `home.trendingSkills.*` altında yeni key'ler ekle (örn.
     home.trendingSkills.title, home.trendingSkills.subtitle,
     home.trendingSkills.empty — veri henüz hesaplanmadıysa/boşsa gösterilecek
     durum, cron ilk kez koşana kadar tablo boş olacağından bu ZORUNLU).
     HomePage.jsx'teki t('home.category.practice') gibi kullanımları örnek al.
   - Tablo boşsa (ilk cron koşusu henüz olmadıysa) widget'ı hiç göstermeme veya
     boş-durum mesajı gösterme — sayfayı bozan bir hata fırlatmasın.

Bitirince npm run build çalıştır, hatasız geçmeli. CLAUDE.md Bölüm 1.1'deki
4 maddelik checklist bu iş için içerik değişikliği olmadığından (yeni
code/editor bloğu yok) tam uygulanmaz, ama build doğrulaması yine de zorunlu.
```

---

## Kullanıcı Yapılacaklar

Aşağıdakilerin hiçbiri kod tarafında Fable veya Sonnet tarafından
yapılamaz — hesap/credential/dashboard işlemleri:

1. **RapidAPI + JSearch hesabı aç, API key al.**
   - https://rapidapi.com/ üzerinden hesap aç, "JSearch" API'sine abone ol.
   - Ücretsiz tier limitini kayıt sırasında kontrol et (bu plandaki "ayda 500
     istek" varsayımı doğrulanmadı — güncel limit RapidAPI'nin JSearch sayfasında
     yazar). Günlük 1 çağrı (ayda ~30) için ücretsiz tier'ların çoğu fazlasıyla
     yeterli olur, yine de teyit edilmeli.
   - Aldığın key'i not al, aşağıdaki adım 3'te kullanılacak.

2. **Supabase SQL Editor'de şemayı çalıştır.**
   - `supabase/functions/trending-skills-sync/schema.sql` içeriğini Supabase
     dashboard → SQL Editor'e yapıştırıp çalıştır (bu repo migration dosyalarını
     takip etmiyor, diğer tablolar gibi elle uygulanıyor).

3. **Supabase secrets ekle** (proje kök dizininden, Supabase CLI ile):
   ```
   supabase secrets set RAPIDAPI_KEY=<adım 1'deki key> --project-ref <PROJECT_REF>
   supabase secrets set CRON_INVOKE_SECRET=<kendi ürettiğin uzun rastgele bir string> --project-ref <PROJECT_REF>
   ```
   `GROQ_API_KEY` zaten ayarlı (mevcut qa-assistant/grade-interview-answer için) —
   tekrar eklemene gerek yok.

4. **Edge function'ı deploy et:**
   ```
   supabase functions deploy trending-skills-sync --project-ref <PROJECT_REF> --no-verify-jwt
   ```
   `--no-verify-jwt` ZORUNLU — bu fonksiyon Supabase JWT değil, kendi
   `x-cron-secret` header'ıyla korunuyor (bkz. WP-B tasarım notu).

5. **GitHub Actions secrets'a ekle** (repo → Settings → Secrets and variables →
   Actions), WP-C'nin çalışması için:
   - `CRON_INVOKE_SECRET` — adım 3'te ürettiğin aynı değer.
   - `SUPABASE_PROJECT_REF` — Supabase proje referansın.

6. **İlk manuel tetikleme ile doğrula** (cron'un ilk otomatik koşusunu
   beklemeden), örn.:
   ```
   curl -X POST https://<PROJECT_REF>.supabase.co/functions/v1/trending-skills-sync \
     -H "x-cron-secret: <CRON_INVOKE_SECRET>"
   ```
   Yanıt `{"ok": true, ...}` dönmeli ve Supabase dashboard'ta `trending_skills`
   tablosunda satırlar oluşmalı. Bu adım olmadan widget (WP-D) boş görünecektir.

7. **WP-D'nin PR'ını gözden geçirip merge et** — Sonnet WP-C/D'yi bitirince,
   sonucu manuel olarak (görsel + dark mode + mobil) kontrol et, sonra main'e
   merge kararını sen ver.
