# SEO Faz 2 Planı — Dil-Ayrık URL, Zengin Snippet, Performans

> **Branch:** `feature/seo-phase-2`
> **Oluşturuldu:** 2026-08-01
> **Öncülü:** `codexSeo.md` (kalıcı SEO mimarisi — bu plan onu DEĞİŞTİRMEZ, ÜSTÜNE kurar),
> `Documents/sprint-simulator-and-open-items-plan.md` (içerik/özellik borcunun kapandığı yer)
> **Kapsam:** İçerik borcu kapandıktan sonra kalan **en yüksek getirili** işler.
> CLAUDE.md misyonunun "Google aramalarında öne çıkan" yarısını hedefler.

---

## 0. İLERLEME DURUMU

| Faz | Konu | Sahip | Durum |
|-----|------|-------|-------|
| **O1** | `seo.js` iki dilli veri modeli + TR metadata (44 route) | **Opus** | ✅ TAMAMLANDI |
| **O2** | `/en` prefix routing + URL-otoriter dil (`main.jsx`, `LanguageContext`) | **Opus** | ✅ TAMAMLANDI |
| **O3** | `SeoMeta.jsx` — dile göre meta + `hreflang` + `<html lang>` | **Opus** | ✅ TAMAMLANDI |
| **O4** | `generate-seo-files.mjs` — iki dilli sitemap + `xhtml:link` alternates | **Opus** | ✅ TAMAMLANDI |
| **O5** | `generate-static-routes.mjs` — iki dilde statik shell | **Opus** | ✅ TAMAMLANDI |
| **O6** | JSON-LD zenginleştirme — `FAQPage` + `Course` | **Opus** | ✅ TAMAMLANDI |
| **O7** | `check-seo.mjs` / `check-dist-seo.mjs` — iki dil hard-fail kontrolleri | **Opus** | ✅ TAMAMLANDI |
| **O8** | `tests/seo-i18n-routing.spec.ts` + regresyon koşumu | **Opus** | ✅ TAMAMLANDI |
| **S1** | Performans: veri dosyalarını sekme bazında kod bölme | Sonnet | 🔜 Prompt §7.1 |
| **S2** | `mission` yayılımı (6/25 sayfa → yüksek trafikli 6 sayfa daha) | Sonnet | 🔜 Prompt §7.2 |
| **S3** | Çerezsiz web analytics (Plausible/Umami) + olay ölçümü | Sonnet | 🔜 Prompt §7.3 |
| **S4** | TR metadata kalite geçişi + mülakat dağılım düzeltmesi | Sonnet | 🔜 Prompt §7.4 |

---

## 1. Teşhis — Neden bu plan var

2026-08-01'de yapılan ölçüm, içerik tarafının **kapandığını** gösterdi:

| Denetim | Sonuç |
|---|---|
| Mülakat soruları (§10) | 25 sayfa, hepsi ≥50 (2 sayfada seviye dağılımı uyarısı) |
| Animasyon kapsamı | 571 kod bloğu / 744 animasyon → %100, 0 açık |
| İnteraktif üçlü (§9.1) | 25 sayfa, 0 boşluk |
| i18n sızıntısı | baseline **0** |
| Test | 39 spec + 3 ayrı config |

Yani "daha çok içerik" artık en yüksek getirili iş DEĞİL. Ölçümde çıkan üç
gerçek açık şunlar:

### 1.1. Türkçe içerik Google'da hiç yok (KRİTİK)

- `index.html:2` → `<html lang="en">`
- `src/utils/seo.js` → **44 route'un tamamının** title/description'ı İngilizce
- `scripts/generate-static-routes.mjs` → `textValue()` daima `value.en || value.tr`
  döndürüyor; yani statik shell gövdesi de İngilizce
- Buna karşılık `LanguageContext` varsayılanı **`tr`**

**Sonuç:** Google her sayfayı İngilizce sanıyor ve "selenium tutorial" gibi
doymuş bir aramada yarıştırıyor. Kullanıcı tıklayıp geldiğinde Türkçe bir sayfa
görüyor (meta ile içerik uyuşmuyor). Asıl fırsat olan **"selenium nedir",
"playwright türkçe eğitim", "qa mülakat soruları"** sorgularında indekslenecek
Türkçe bir URL **hiç yok**. Sitedeki içeriğin yarısı arama motoru için görünmez.

### 1.2. 1.250+ mülakat sorusu zengin snippet üretmiyor

Üretilen JSON-LD yalnızca `WebSite` + `WebPage` + `BreadcrumbList`.
25 sayfa × 50+ soru-cevap, `FAQPage` şeması için hazır bir veri kaynağı ve
`*Data.js` içinde yapısal olarak duruyor — elle içerik yazmadan üretilebilir.

### 1.3. Bundle boyutu Core Web Vitals'ı düşürüyor

`dist` 21 MB · `TopicPage` chunk'ı **1.6 MB** · `typescriptData` 1.1 MB ·
`javaData` 976 KB · `sqlData` 876 KB. CLAUDE.md §14 bunu "build'i bozmaz" diye
geçiyor — doğru, ama mobil 4G'de LCP'yi ve dolayısıyla sıralamayı bozar.

---

## 2. Mimari Karar — `/en` prefix (Seçenek A)

Üç seçenek değerlendirildi:

| Seçenek | Karar |
|---|---|
| **A. Çıplak path = TR, `/en/*` = EN** | ✅ **SEÇİLDİ** |
| B. `/tr/*` + `/en/*`, çıplak path yönlendirir | ❌ GitHub Pages'te server redirect YOK; client-side redirect SEO'da zayıf ve mevcut URL otoritesini harcar |
| C. `?lang=en` query parametresi | ❌ Google query-parametreli varyantları güvenilir şekilde ayrı sayfa saymaz |

**Seçenek A'nın gerekçesi:**
- Çıplak URL'ler (`/selenium`) zaten indeksli ve otorite biriktirmiş — **korunur**.
- Çıplak URL'in dili varsayılan arayüz diliyle (`tr`) **eşitlenir** — bugünkü
  meta/içerik uyuşmazlığı düzelir.
- `/en/*` yeni ve ek bir URL kümesidir; hiçbir şeyi bozmaz, sadece ekler.
- GitHub Pages'te ek altyapı gerekmez: `dist/en/<route>/index.html` shell'leri
  doğrudan servis edilir.

**Bilinçli kabul edilen risk:** `/selenium`'un title'ı İngilizce'den Türkçe'ye
döndüğü için mevcut İngilizce sıralamalarda geçici dalgalanma olabilir. Ama o
trafik zaten Türkçe bir sayfaya iniyordu (uyuşmazlık) — İngilizce arayan
kullanıcı artık `/en/selenium`'a inecek ve gerçekten İngilizce bir sayfa görecek.
Net etki pozitif.

### 2.1. Uygulama tekniği — `basename`

`main.jsx`'te URL `/en` ile başlıyorsa `<BrowserRouter basename="/en">`.
Böylece:
- **`App.jsx`'e HİÇ dokunulmaz** (43 lazy route ikilenmez). Bu ayrıca
  `check-seo.mjs`'in `<Route path="...">` ayrıştırmasını bozmadan korur.
- Tüm `<Link to="/docker">` kullanımları react-router tarafından otomatik
  `/en/docker` olur — EN gezinti EN'de kalır. (Doğrulandı: kodda router'ı
  atlayan ham `<a href="/...">` veya `window.location.href = '/...'` YOK.)

### 2.2. Dil otoritesi — URL kazanır

| Durum | Dil |
|---|---|
| `/selenium` | **her zaman `tr`** |
| `/en/selenium` | **her zaman `en`** |

`localStorage.language` artık dili **belirlemez**, yalnızca yansıtır (geriye
dönük uyumluluk: onu okuyan mevcut kodlar çalışmaya devam eder).
**Otomatik yönlendirme YAPILMAZ** — localStorage'a bakıp kullanıcıyı `/en`'e
atmak, deterministik olmayan davranış ve 39 E2E spec'inde sürpriz kırılma
üretirdi.

Dil toggle'ı artık **URL değiştirir** (`window.location.assign` ile karşılık
URL'e gider). Tam sayfa yenileme, `basename` mount anında sabitlendiği için
zorunlu; dil değiştirme nadir bir eylem olduğundan kabul edilebilir ve
i18n siteleri için standart davranıştır. Mevcut testler toggle'ı **UI
düğmesinden** kullanıyor (`[data-testid="language-toggle"]`), localStorage'dan
değil — bu yüzden davranış testlerle uyumlu (doğrulandı).

---

## 3. Opus Görevleri (O1-O8) — bu oturumda yapıldı

### O1 — `src/utils/seo.js` iki dilli veri modeli
- `LOCALES`, `DEFAULT_LOCALE = 'tr'`, `EN_PREFIX = '/en'`.
- Her `ROUTE_SEO` girdisi `tr: { title, description }` kazanır; mevcut
  `title`/`description` alanları **EN değeri olarak yerinde kalır** (geriye
  dönük uyumluluk — `generate-static-routes.mjs` gibi tüketiciler kırılmaz).
- Yeni yardımcılar: `localeFromPathname`, `stripLocalePrefix`, `localizedPath`,
  `seoFor(path, locale)`, `alternatesFor(path)`.
- `getSeoForPath(pathname)` artık **tam pathname** alır (`/en/...` dahil),
  locale'i kendisi tespit eder ve `{ path, locale, title, description }` döner.
- `canonicalUrl(pathname)` locale prefix'ini koruyarak mutlak URL üretir.

### O2 — `main.jsx` + `LanguageContext`
- `main.jsx`: `/en` prefix tespiti → `basename` + `initialLanguage="en"`.
- `LanguageProvider` opsiyonel `initialLanguage` prop'u alır; verilmezse
  eski davranış (localStorage → `tr`).
- `toggleLanguage()` karşılık URL'e gider (`localStorage`'ı ÖNCE yazar ki
  mevcut kalıcılık testleri geçmeye devam etsin).

### O3 — `SeoMeta.jsx`
- Dile göre title/description/canonical.
- `<html lang>` runtime'da güncellenir.
- `hreflang` alternate link'leri (`tr`, `en`, `x-default`) — dinamik route'larda
  üretilmez.
- `og:locale` + `og:locale:alternate`.

### O4 — `generate-seo-files.mjs`
- Sitemap her indekslenebilir route için **iki URL** üretir (TR + EN) ve her
  girdide `xhtml:link rel="alternate"` alternates blokları bulunur.

### O5 — `generate-static-routes.mjs`
- Shell'ler iki dilde üretilir: TR → `dist/<route>/index.html`,
  EN → `dist/en/<route>/index.html`.
- `textValue(value, locale)` locale-farkında hale getirildi — TR gövde metni
  **mevcut bilingual veriden** üretilir, elle içerik yazılmaz.
- Script içindeki sabit İngilizce arayüz metinleri (`"What you can learn on this
  page"`, `"QA Learning Topics"`, `/test-frameworks` özel içeriği) iki dilli
  yapıldı.
- Her shell'e `<html lang>` + `hreflang` link'leri gömülür.

### O6 — JSON-LD zenginleştirme
- `FAQPage`: `interview-questions` bloklarındaki soru-cevaplardan üretilir
  (locale'e uygun olan seçilir, ilk 10 soru — Google'ın önerdiği sınır civarı).
- `Course`: teknoloji sayfaları için `provider` + `name` + `description`.
- Mevcut `WebPage` + `BreadcrumbList` **korunur** (dist-SEO kontrolleri onlara bakıyor).

### O7 — Doğrulama scriptleri
- `check-seo.mjs`: her route'ta `tr.title`/`tr.description` var mı, uzunluk
  sınırları (title ≥20 & `LearnQA.dev` içerir, description 80-180) **iki dilde**
  de sağlanıyor mu, TR title'da Türkçe içerik var mı.
- `check-dist-seo.mjs`: TR ve EN shell'lerinin **ikisi de** üretilmiş mi,
  doğru `<html lang>`, doğru canonical, `hreflang` çifti eksiksiz mi.

### O8 — Test
- `tests/seo-i18n-routing.spec.ts` (yeni): çıplak path TR, `/en/*` EN, toggle
  URL'i değiştirir, `/en` içinde gezinti `/en`'de kalır, `hreflang` etiketleri
  DOM'da var.

---

## 4. Sonnet Görevleri (S1-S4) — sırada

| # | İş | Neden Sonnet | Risk |
|---|---|---|---|
| **S1** | Performans / kod bölme | Mekanik, tekrarlı, ölçülebilir | Orta — `TopicPage` sekme yükleme sırası |
| **S2** | `mission` yayılımı | Hazır primitif + hazır kalıp, saf veri işi | Düşük |
| **S3** | Analytics | Küçük, izole | Düşük |
| **S4** | TR metadata cilası + mülakat dağılımı | Metin işi | Düşük |

Hazır promptlar §7'de.

---

## 5. KULLANICI (HASAN) GÖREVLERİ

Bu plandan çıkan, kod tarafında yapılamayacak işler:

1. **Google Search Console'a yeni URL kümesini tanıt:** deploy sonrası
   `https://learnqa.dev/sitemap.xml` yeniden gönderilmeli. GSC → Sitemaps →
   Resubmit. Yeni `/en/*` URL'leri indekslenmeye başlayacak.
2. **GSC "Uluslararası Hedefleme" kontrolü:** `hreflang` hatalarını
   GSC → Legacy tools veya URL Inspection üzerinden 1-2 hafta sonra doğrula.
3. **`Documents/sprint-simulator-and-open-items-plan.md` §5'teki 4 madde**
   (edge function deploy'ları, social-proof RPC, trending-skills aktivasyonu)
   HÂLÂ AÇIK — bu plan onları kapatmaz.
4. **S3 (analytics) için hesap:** Plausible/Umami hesabı + site kaydı (Sonnet
   kodu yazar, domain/script key sende).

---

## 6. Karar Kapıları

- **Merge kararı kullanıcıda** (CLAUDE.md §21). Bu branch `main`'e girmeden önce
  Hasan §8'deki manuel test rehberini uygulamalı.
- **Geri alma planı:** Tek riskli değişiklik `/selenium` title'ının Türkçeleşmesi.
  İstenirse `seo.js`'te `DEFAULT_LOCALE` `'en'` yapılıp `/tr` prefix'ine
  geçilebilir — mimari simetrik yazıldı, tek sabit değişir.

---

## 7. HAZIR SONNET PROMPTLARI

### 7.1. SONNET — S1: Performans / kod bölme

> Branch: `feature/seo-phase-2` (veya kullanıcı isterse `feature/perf-split`).
> Önce `Documents/seo-phase-2-plan.md` §1.3'ü ve `npm run build` çıktısındaki
> chunk boyutlarını KENDİN ölç — plandaki rakamlara körlemesine güvenme.
>
> **Sorun:** `dist/assets/TopicPage-*.js` 1.6 MB, `typescriptData` 1.1 MB,
> `javaData` 976 KB, `sqlData` 876 KB, `pythonData` 844 KB. Kullanıcı bir seferde
> TEK sekme görüyor ama tüm sayfanın verisi ilk yüklemede iniyor. Bu, mobilde
> LCP'yi ve Core Web Vitals üzerinden sıralamayı düşürüyor.
>
> **Görev:** En büyük 3 veri dosyasını (`typescriptData`, `javaData`, `sqlData`)
> sekme (section) bazında böl ve sekmeye tıklanınca yüklenecek hale getir.
> Kurallar:
> - **Davranış DEĞİŞMEYECEK.** İlk açılışta gösterilen sekme senkron gelmeli
>   (LCP'yi bozma), diğerleri `import()` ile tembel yüklensin.
> - Sekme yüklenirken mevcut `RouteFallback` benzeri bir iskelet/spinner göster —
>   yeni tasarım icat etme, `App.jsx`'teki kalıbı kopyala.
> - **`TopicPage.jsx`'in `renderBlock` makinesine ve quiz motoruna DOKUNMA**
>   (21.697 satır, onlarca E2E testi buna bağlı). Sadece veri yükleme katmanı.
> - `scripts/generate-static-routes.mjs` ve `check-i18n-leaks.mjs` bu veri
>   dosyalarını **Node tarafında `import` ediyor** — bölme sonrası bu scriptlerin
>   HÂLÂ tüm sekmeleri görebildiğinden emin ol (agregat bir export bırak).
>   Bu scriptler kırılırsa build kırılır.
>
> **Ölçüm zorunlu:** Önce/sonra chunk boyutlarını tablo halinde raporla.
> İyileşme yoksa değişikliği geri al ve neden işe yaramadığını yaz.
>
> **Doğrulama (CLAUDE.md §1.1):** `node scripts/check-content-integrity.mjs` →
> `npm run i18n:check` → `npm run audit:learning-blocks` → `npm run build` →
> `npx playwright test tests/topic-pages-ui.spec.ts tests/learning-blocks-render.spec.ts tests/i18n-content-toggle.spec.ts`.
> Beşi de temiz değilse "tamamladım" DEME. Sonra `.claude/NEXT_SESSION.md` + commit.

### 7.2. SONNET — S2: `mission` yayılımı

> Branch: `feature/seo-phase-2`. Önce
> `Documents/challenge-first-experience-plan.md` §3.2 (mission şeması) ve
> `src/data/seleniumData.js`'deki REFERANS görevi oku.
>
> **Ölçülen durum:** 25 teknoloji sayfasından yalnızca 6'sında `mission` var
> (`selenium`, `playwright`, `cypress`, `python`, `sql`, `rest-assured` — her
> birinde 2 adet). `mission` bu platformun rakiplerin taklit edemeyeceği tek
> farklılaştırıcısı; yüksek trafikli sayfalarda yok.
>
> **Görev:** Şu 6 sayfaya **birer** gerçek-QA görevi ekle:
> `docker`, `jenkins`, `git-github`, `java`, `postman`, `linux`.
> Kurallar:
> - **YENİ BLOK TİPİ / YENİ BİLEŞEN YAZMA.** `mission`, o sayfanın MEVCUT
>   bloklarını (`code-playground`, `prediction`, `editor`, sandbox'lar) gömer.
> - 3-7 adım; her adımda `brief` + `miniLesson` ("💡 Takıldın mı?"), sonda
>   `debrief` (gerçek QA bağlamı).
> - Görev, o sayfanın **aksiyon sekmesine** konur (ör. Docker → Selenium Grid/
>   Compose, Jenkins → pipeline, Git → merge conflict, Linux → CI agent debug).
>   Zorlama görev üretme — sekme uygun değilse o sayfayı ATLA ve nedenini yaz.
> - Her `mission` ve her gömülü blok benzersiz `id` + `relatedTopicId` taşımalı.
> - Tam bilingual; TR yorumlar Türkçe (CLAUDE.md §8). Apostrof tuzağı: tek
>   tırnaklı string içinde `'` daima `\'` (§23.2).
> - **ÇİFT-AĞAÇ UYARISI (§23.4):** dosyanın tek mi çift mi ağaçlı olduğunu
>   İŞE BAŞLAMADAN tespit et. Çift ağaçlıysa görev sabitini İKİ ağaca da AYNI
>   referansla koy — yoksa görev bir dilde hiç görünmez.
> - `scripts/audit-learning-blocks.mjs` içindeki `MISSION_FILES` listesine yeni
>   dosyaları EKLE, yoksa şema denetimi bu görevleri hiç görmez.
>
> **Doğrulama:** her dosya için `node --check` → `check-content-integrity.mjs` →
> `i18n:check` → `audit:learning-blocks` (mission sayısı artmalı) → `npm run build`
> → `npx playwright test tests/mission-flow.spec.ts`. Her sayfa AYRI commit.

### 7.3. SONNET — S3: Çerezsiz analytics

> Branch: `feature/seo-phase-2`.
>
> **Sorun:** Sitede hiçbir web analytics yok (`gtag`/`plausible`/`umami`
> aramasında sonuç yok). `LearningAnalytics.jsx` yalnızca kullanıcının KENDİ
> ilerlemesini gösteriyor. Yani "hangi sayfada terk ediliyor, `/sprint`'i kaç
> kişi bitiriyor, `/en` sayfaları trafik alıyor mu" ölçülemiyor — SEO Faz 2'nin
> işe yarayıp yaramadığı ölçülemez.
>
> **Görev:**
> 1. Plausible (tercih) veya Umami script'ini `index.html`'e ekle. **Çerezsiz ve
>    KVKK/GDPR uyumlu bir araç seç** — Google Analytics kullanma (çerez rızası
>    banner'ı gerektirir, siteye yük olur).
> 2. Script `<head>`'e `defer` ile girsin; domain/site-id'yi bir ortam değişkeni
>    veya tek bir sabitten oku (kullanıcı kendi key'ini koyacak — README/DEPLOY.md'ye
>    not düş).
> 3. `src/lib/analytics.js` (yeni) — tek bir `trackEvent(name, props)` sarmalayıcı.
>    Araç yüklenmemişse **sessizce no-op** olsun (offline/adblock'ta sayfa
>    KIRILMAMALI). Mevcut `trackMapEvent` kalıbını örnek al.
> 4. Şu 4 olayı bağla: ders tamamlama, `mission` tamamlama, sprint kapatma,
>    dil değiştirme (`tr`→`en` ilgisi SEO Faz 2 için kritik).
>
> **KIRMIZI ÇİZGİ:** Kişisel veri (e-posta, kullanıcı id, serbest metin cevap)
> ASLA event property'si olarak gönderilmez.
>
> **Doğrulama:** `npm run build` + `npx playwright test tests/theme-and-accessibility.spec.ts`
> (script eklemenin sayfayı bozmadığını doğrular) + adblock açıkken sayfanın
> çalıştığını GERÇEK tarayıcıda kontrol et.

### 7.4. SONNET — S4: TR metadata cilası + mülakat dağılımı

> Branch: `feature/seo-phase-2`. Önce `src/utils/seo.js`'teki `tr` bloklarını oku —
> Opus tarafından yazıldılar ama **anahtar kelime araştırmasıyla değil**, doğrudan
> çeviriyle üretildiler.
>
> **Görev A — TR metadata cilası:** Her `tr.title` / `tr.description` için:
> - Türk QA mühendislerinin GERÇEKTEN arayacağı ifadeleri kullan
>   ("selenium nedir", "playwright türkçe", "qa mülakat soruları", "sql sorguları").
> - `tr.title` ≥20 karakter, `LearnQA.dev` içermeli; `tr.description` 80-180 karakter
>   (bu sınırları `check-seo.mjs` hard-fail eder — sınırı aşarsan build kırılır).
> - Teknik terimler Türkçeleştirilmez (CLAUDE.md §8): `locator`, `fixture`,
>   `pipeline`, `assertion` aynen kalır.
> - Aynı description'ı iki route'ta TEKRARLAMA (Google duplicate meta olarak sayar).
>
> **Görev B — mülakat seviye dağılımı:** `node scripts/audit-interview-questions.mjs`
> çıktısında `/postman` (16/19/15) ve `/playwright` (15/15/20) CLAUDE.md §10'daki
> 15/20/15 dağılımını karşılamıyor. Eksik seviyeye soru ekleyerek düzelt —
> **soru silme**, ekle. Yeni sorular §10 kuralına uymalı: "X nedir?" tarzı salt
> tanım sorusu YASAK, senaryo tabanlı olacak, 3-6 cümle cevap + Java karşılaştırması.
>
> **Doğrulama:** `npm run seo:check` → `npm run audit:interview-questions`
> (iki sayfa da ✅ olmalı) → `npm run build`. Sonra NEXT_SESSION.md + commit.

---

## 8. Manuel Test Rehberi — SEO Faz 2 (~6 dakika)

**Kurulum:** `npm run build && npm run preview`

1. **TR çıplak URL:** `http://localhost:4173/selenium` → sayfa **Türkçe** açılmalı,
   sekme başlığı Türkçe olmalı.
2. **EN prefix:** `http://localhost:4173/en/selenium` → sayfa **İngilizce**
   açılmalı, sekme başlığı İngilizce.
3. **Toggle:** TR sayfadayken sağ üstten `ENG`'e bas → URL `/en/selenium` olmalı
   (sadece içerik değil, **adres çubuğu** da değişmeli). `TR`'ye bas → `/selenium`.
4. **EN içinde gezinti:** `/en/selenium`'dayken 🏠 ana sayfa butonuna bas →
   `/en`'e gitmeli, `/` değil. Ana sayfadan bir derse tıkla → `/en/...` kalmalı.
5. **hreflang:** DevTools → Elements → `<head>` içinde
   `<link rel="alternate" hreflang="tr">`, `hreflang="en"`, `hreflang="x-default"`
   üçü de olmalı. `<html lang>` sayfanın diline uymalı.
6. **Statik shell (crawler görüşü):** `curl -s localhost:4173/selenium | head -40`
   → title Türkçe, `<html lang="tr">`. `curl -s localhost:4173/en/selenium` →
   title İngilizce, `<html lang="en">`.
7. **Zengin snippet:** Aynı curl çıktısında `"@type": "FAQPage"` ve `"@type": "Course"`
   görünmeli. Bir mülakat sorusunu kopyalayıp https://validator.schema.org/
   üzerinde doğrula.
8. **Sitemap:** `curl -s localhost:4173/sitemap.xml | grep -c "<url>"` →
   route sayısının **iki katı** olmalı.
9. **Mobil:** 375px genişlikte `/en/docker` → yatay kaydırma OLMAMALI (§12).
