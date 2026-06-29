# LearnQA.dev — Test Coverage Raporu

> **Son güncelleme:** 2026-06-29  
> **Test Framework:** Playwright 1.57  
> **Tarayıcı:** Chromium (Desktop Chrome)  
> **Toplam test sayısı:** 78 test · 13 dosya  
> **Base URL:** `http://localhost:5173` (Vite dev server)

---

## 1. Özet Tablo — AC Bazında Kapsam Durumu

| AC | Açıklama | Kapsam Durumu | İlgili Dosya |
|----|----------|--------------|--------------|
| AC01 | Navigasyon & buton tıklanabilirliği | ✅ Tam | `topic-pages-ui.spec.ts`, `other-pages-ui.spec.ts` |
| AC02 | Quiz yanlış cevap → alternatif soru (bir defaya mahsus) | ✅ Tam | `quiz-retry-mechanism.spec.ts` |
| AC03 | Çoklu dil desteği (TR/EN toggle, localStorage, içerik tarama) | ✅ Tam | `i18n-content-toggle.spec.ts` |
| AC04 | Mülakat erişim bariyeri (%60 quiz eşiği) | ✅ Kısmen | `docker-interview-mastery-flow.spec.ts`, `sql-page.spec.ts`, `javascript-page.spec.ts`, `typescript-page.spec.ts` |
| AC05 | AI quiz açıklaması butonu (anonim kilit + üye hata akışı) | ⚠️ Kısmi | `quiz-ai-explanation-access.spec.ts` |
| AC06 | Mülakat AI değerlendirme döngüsü (input validasyon + hata dayanıklılığı) | ✅ Tam | `docker-interview-mastery-flow.spec.ts`, `interview-grading-and-reset.spec.ts` |
| AC07 | Kurs bitirme rozeti (%80 eşiği) + reset mekanizması | ✅ Kısmen | `docker-interview-mastery-flow.spec.ts`, `interview-grading-and-reset.spec.ts` |
| AC08 | Tema / dark mode / erişilebilirlik | ❌ Boşluk | Test yok |
| AC09 | Yol haritası ve ilerleme takibi görselleştirme | ❌ Boşluk | Test yok |

---

## 2. Test Dosyaları — Detaylı Analiz

### 2.1 `example.spec.ts` — Sanity Smoke

**Ne test eder:** Ana sayfanın (`/`) yüklenip yüklenmediğini doğrular.

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1 | `homepage has title and loads` | `goto('/')` → başlık kontrolü → `body` görünürlüğü | Title var, body render edilmiş | Smoke test |

**Değerlendirme:** En zayıf test. Title assertion'ı `/./` regex ile çalışır — her karakter geçer, boş sayfa bile geçebilir. URL temiz path'e geçildikten bu yana hash URL `/automationexercise/#/` kullanılmıyor; test güncellenmedi.

---

### 2.2 `topic-pages-ui.spec.ts` — AC01: Tüm TopicPage Route'ları

**Ne test eder:** 24 ders sayfasının tüm sidebar sekmelerini gezer; render crash, buton görünürlüğü, disabled buton tespiti.

**Kapsam:** `/jmeter`, `/sql`, `/typescript`, `/javascript`, `/python`, `/test-frameworks`, `/postman`, `/bruno`, `/jenkins`, `/docker`, `/rest-assured`, `/kubernetes`, `/kafka`, `/appium`, `/playwright`, `/cypress`, `/selenium`, `/aws`, `/azure`, `/browserstack`, `/git-github`, `/linux`, `/java`, `/what-is-testing`

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1–24 | `/{route} — her sekme render olur` | Sayfaya git → `h1` bekle → her sidebar sekmesine sırayla tıkla → body text tara → content butonlarını say | Sekme sayısı > 0; `[object Object]` yok; tüm butonlar görünür; console/pageerror = 0 | Parametrik döngü, crash detection, console error capture |

**Assertion'lar:**
- `tabCount > 0` — sidebar var
- Her sekme butonu: `isVisible()` + `isEnabled()`
- Body text: `[object Object]` içermemeli (stringification crash sinyali)
- `pageErrors.length === 0` (console error + pageerror listener)
- Content butonları: `isVisible()` (disabled olanlar bilgi amaçlı annotation)

**Test Tekniği:** Parametrik E2E döngüsü, hata yakalama, pasif gözlem (disabled button → fail değil, annotation).

**Not:** Bu test ders sayfalarında içerik doğruluğunu test ETMEZ — sadece render sağlığını kontrol eder.

---

### 2.3 `python-page.spec.ts` — Eski Smoke (Stale)

**Ne test eder:** Python ve TypeScript sayfalarının sekmelerinin crash olmadan yüklenmesi.

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1 | Python Foundations tab loads | Hash URL ile git (`/#/python`) → tab tıkla → body > 500 karakter | Crash yok, tablo hücresi görünür | Crash detection |
| 2 | TypeScript Foundations tab loads | Hash URL ile git (`/#/typescript`) → tab tıkla | Crash yok | Crash detection |

**Değerlendirme:** **Stale — iki kritik sorun:**
1. `/#/python` hash URL eski format; uygulama artık `/python` temiz path kullanıyor. Bu testler `/automationexercise/#/python` adresine gidiyor ve dev server'da o route yok. Testler **yanlış sayfada** çalışıyor.
2. `topic-pages-ui.spec.ts` zaten bu sayfaları kapsıyor. Örtüşen kapsam.

---

### 2.4 `sql-page.spec.ts` — SQL Sayfası Sekme ve Gating

**Ne test eder:** SQL sayfasının 25 sekmesini teker teker açar; crash ve interview lock kontrolü.

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1 | SQL tabs load and render without crash | `/sql` → `h1` bekle → 25 tab say → her taba tıkla → son tab (interview) lock mesajı, diğerleri unlock | Crash yok, sekme sayısı = 25, son tab kilit gösteriyor | Parametrik tab traversal, boundary (son tab özel) |

**Kırılganlık:** `expect(count).toBe(25)` — sekme eklenirse/silinirse test kırılır. Daha sağlam alternatif: `toBeTruthy()` veya `toBeGreaterThan(20)`.

**Selector:** `div[class*="w-52"] button` — `topic-pages-ui.spec.ts`'deki `flex-shrink-0 + sticky` kombinasyonundan farklı, daha az sağlam.

---

### 2.5 `javascript-page.spec.ts` — JavaScript Sayfası Sekme ve Gating

**Ne test eder:** JavaScript sayfasının tüm sekmelerini gezer; son sekme interview lock kontrolü.

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1 | JavaScript tabs load without crash | `/javascript` → tüm tablar → son tab kilit, diğerleri açık | Crash yok, interview lock doğru | Tab traversal, gating state |

**Kırılganlık:** `sql-page.spec.ts` ile aynı: son sekme her zaman interview sekmesi değilse, `i < count - 1` koşulu yanlış sekmeyi interview olarak işaretler. `typescript-page.spec.ts`'deki `💼 emoji` tespiti daha sağlam.

---

### 2.6 `typescript-page.spec.ts` — TypeScript Sayfası (Gelişmiş)

**Ne test eder:** TypeScript sayfasının tüm sekmelerini gezer; `💼` emoji ile interview tab tespiti; Kurulum sekmesi içerik kontrolü.

| # | Test Adı | Adımlar | Beklenen Sonuç | Teknik |
|---|----------|---------|----------------|--------|
| 1 | TypeScript tabs load without crash | `/typescript` → `💼` tab bul → tüm tablar → interview tab kilit; kurulum tab adım içerikleri doldu | Crash yok, interview lock, kurulum adımları > 5 karakter | Tab traversal, icon-based tab discovery, content assertion |

**Güçlü yön:** Tab discovery için pozisyon yerine emoji kullanımı — veri değişse de doğru sekmeyi bulur.

---

### 2.7 `api-endpoints.spec.ts` — Backend API Happy Path

**Ne test eder:** Supabase RPC ve Edge Function endpoint'lerinin HTTP 200 dönüp doğru response body ürettiğini doğrular.

| # | Grup | Test | Adımlar | Beklenen Sonuç | Teknik |
|---|------|------|---------|----------------|--------|
| 1 | Public | `get_leaderboard` | Anon header ile POST `/rpc/get_leaderboard` | 200 + dizi döner | API test (HTTP) |
| 2 | Auth (üye) | `qa-assistant` | Login → token al → POST qa-assistant | 200 + `body.reply` string | Auth + API test |
| 3 | Auth (üye) | `explain-quiz-answer` | Login → POST explain-quiz-answer | 200 + `body.explanation` string | Auth + API test |
| 4 | Auth (üye) | `grade-interview-answer` | Login → POST grade-interview-answer | 200 + `totalPoints, coveredPoints, percent` number | Auth + API test |

**Dikkat:** Testler 2–4 gerçek Groq AI çağrısı yapar → maliyet. `.env.local` yoksa `test.skip()` ile otomatik atlanır.

**Test Tekniği:** Doğrudan HTTP API testi (Playwright'ın `APIRequestContext` ile), Supabase email/password auth.

---

### 2.8 `docker-interview-mastery-flow.spec.ts` — AC04 + AC06 + AC07 Happy Path

**Ne test eder:** Docker sayfası üzerinden tam öğrenme döngüsünü uçtan uca doğrular.

| # | Senaryo | Adımlar | Beklenen Sonuç | Teknik |
|---|---------|---------|----------------|--------|
| 1 | 0 quiz → kilit | Hiç quiz cevaplamadan interview tab'e tıkla | Lock mesajı görünür | State-based |
| 2 | 2/6 quiz (%33) → hâlâ kilit | 2 quiz doğru → interview tab | Lock mesajı hâlâ görünür | Boundary value (%33 < %60) |
| 3 | 4/6 quiz (%66.7) → açılır | 2 quiz daha doğru → interview tab | Lock mesajı yok; "Mülakat Pratiği" banner görünür | Boundary value (%66.7 ≥ %60) |
| 4 | Textarea input validasyonu | Interview tab açık → 5 textarea var mı | 5 textarea (`Kendi cümlelerinle...` placeholder) | Element count |
| 5 | AI grading → her soru puanlanıyor | dockerData'dan referans cevapları textarealara doldur → Tümünü Değerlendir | HTTP 200, 5 sonuç, her biri `percent` number | Network intercept (response wait), data-driven |
| 6 | Ortalama ≥ %80 → mastery tamamlandı | 5. adım sonrası | "✅ Mülakat Pratiği tamamlandı." görünür | UI state |
| 7 | Backend doğrulaması | Supabase REST: `user_progress` tablosunda `status=completed` | `[{status: 'completed'}]` | Backend API assertion |
| 8 | Rozet toast (opsiyonel) | Badge zaten verilmemişse görünür | `Yeni rozet!` görünürse doğrula | Conditional assertion |

**Güçlü yönler:**
- Auth enjeksiyonu (JWT localStorage ile) — OAuth bypass gerek yok
- Veri odaklı: `dockerData.tr` quiz/interview cevapları test girdisi olarak kullanılıyor
- Backend state doğrulaması: sadece UI değil, Supabase'de gerçek kayıt kontrol ediliyor
- `serviceWorkers: 'block'` yok — bu dosya MSW ile çatışma yaşayabilir (interview-grading-and-reset bundan ders çıkarmış)

---

### 2.9 `interview-grading-and-reset.spec.ts` — AC06 Dayanıklılık + AC07 Reset

**Ne test eder:** Negatif senaryolar ve reset mekanizması.

| # | Senaryo | Adımlar | Beklenen Sonuç | Teknik |
|---|---------|---------|----------------|--------|
| 1 | Boş cevap → "Tümünü Değerlendir" disabled | 0 textarea dolu | Buton disabled | Input validation state |
| 2 | 4/5 dolu → hâlâ disabled | 4 textarea dolu | Hâlâ disabled | Boundary (4 < 5) |
| 3 | 5/5 dolu → enabled | 5. textarea doldur | Enabled | Boundary (5 = 5) |
| 4 | 1. çağrı 500 hatası → kullanıcı tekrar deneyebilir | grade-interview-answer mock 500 → click | "Değerlendirme yapılamadı" mesajı + buton hâlâ enabled | Network mock (page.route) + negative |
| 5 | 2. çağrı düşük skor (%10) → reset teklifi | Mock %10 skor → click | "⚠️ Ortalama %10" + "🔄 Sayfayı Sıfırla" butonu | Mock response + UI state |
| 6 | "Vazgeç" → hiçbir şey sıfırlanmaz | Reset öner → Vazgeç | Modal kapanır, skor görünür, checkbox hâlâ checked | Negative/cancel flow |
| 7 | "Eminim, sıfırla" → UI sıfırlanır | Reset onayla | İlk sekmeye dönüş, checkbox unchecked, interview kilit geri geldi | Hard reset verification |
| 8 | localStorage temizlendi | Reset sonrası | `progress_docker`, `quizProgress_docker`, `quizScore_docker`, `quizAttempted_docker` = null | localStorage state |
| 9 | Backend'de satırlar silindi | Supabase REST: `user_progress` sorgula | `[]` (boş dizi) | Backend API assertion |

**Önemli teknik detay:** `serviceWorkers: 'block'` zorunlu — MSW aktifken `page.route()` mock'lar atlanıyor (Playwright + SW çakışması).

**Bilinen koşul:** Test 9 (Supabase satır silme) `auth.uid() = user_id` şartlı DELETE RLS policy gerektirir. Policy uygulanmamışsa test kasıtlı olarak FAIL eder — bu bir flaky test değil, gerçek regresyon sinyali.

---

### 2.10 `other-pages-ui.spec.ts` — TopicPage Dışı Sayfalar

**Ne test eder:** Ana sayfa, döküman okuyucular, algoritma sayfaları, liderlik tablosu.

| # | Route | Adımlar | Beklenen Sonuç | Teknik |
|---|-------|---------|----------------|--------|
| 1 | `/` | `goto('/')` → `main-title` testid → nav linkler → dark mode toggle → language toggle | Nav link > 0 görünür; dark mode + lang toggle enabled | Navigation, testid selector |
| 2–7 | `/java-document`, `/git-document`, `/manual-testing`, `/algorithms`, `/advanced-algorithms`, `/qa-mentor` | `goto` → `h1` bekle → crash check → tüm görünür butonlar | Crash yok, console error yok | Crash detection, button visibility |
| 8 | `/leaderboard` | `goto` → `h1` → crash check | Crash yok | Crash detection |

---

### 2.11 `quiz-ai-explanation-access.spec.ts` — AC05: AI Açıklama Erişimi

**Ne test eder:** Anonim kullanıcı için AI butonu yerine giriş uyarısı; üye için network hata durumunu.

| # | Senaryo | Adımlar | Beklenen Sonuç | Teknik |
|---|---------|---------|----------------|--------|
| 1 | Anonim + TR: quiz cevapla → AI butonu yok | TR modda quiz doğru cevapla | "AI açıklaması için giriş yapmalısın." görünür; AI butonu YOK | Negative (anon) |
| 2 | Anonim + EN: quiz cevapla → AI butonu yok | EN modda quiz doğru cevapla | "Sign in to see the AI explanation." görünür; AI butonu YOK | Negative (anon) + i18n |
| 3 | Üye + hata simülasyonu | Login → mock 500 → AI butonuna tıkla | "AI açıklaması şu anda yüklenemedi." görünür | Auth inject + network mock |

**Kapsam boşluğu:** Üye için AI'ın BAŞARILI sonuç döndürdüğü senaryo post-commit testlerinde yok. Sadece hata durumu test edilmiş; başarılı AI açıklaması içeriği doğrulanmıyor.

---

### 2.12 `quiz-retry-mechanism.spec.ts` — AC02: Quiz Yeniden Deneme

**Ne test eder:** Yanlış cevap → alternatif soru mekanizması.

| # | Senaryo | Adımlar | Beklenen Sonuç | Teknik |
|---|---------|---------|----------------|--------|
| 1 | Ana soru yanlış → retry açılır → retry yanlış → 2. retry YOK | Yanlış seç → kontrol et → retry buton → yanlış retry | Ana soru yok, retry sorusu var; ikinci "Farklı bir soru dene" GÖRÜNMEZ | Negative chaining |
| 2 | Ana yanlış → retry doğru → sekme tamamlanıyor | Yanlış → retry → doğru retry | Sidebar tab0 checkbox `aria-checked=true` | State change, aria |
| 3 | Ana doğru → retry butonu hiç yok | Doğru cevap → kontrol et | "Farklı bir soru dene" butonu GÖRÜNMEZ | Negative (happy path bypass) |

**Veri bağımlılığı:** `dockerData.tr.sections[0].blocks[0].retryQuestion` alanının varlığına bağlı. Veri değişirse test kırılır — bu kabul edilebilir tasarım (veri odaklı test).

---

### 2.13 `i18n-content-toggle.spec.ts` — AC03: Dil Geçişi + İçerik Tarama

**Ne test eder:** TR/EN toggle davranışı, localStorage kalıcılığı, tüm 24 route'ta EN modda body text'de Türkçe özgün karakter yokluğu.

**Bölüm A — Temel toggle mekanizması (4 test, /docker üzerinde):**

| # | Senaryo | Beklenen Sonuç | Teknik |
|---|---------|----------------|--------|
| 1 | Varsayılan dil TR | Quiz sorusu TR'de; localStorage `language=tr` | State |
| 2 | EN'e geç → quiz EN olur → doğru cevap → Check Answer → localStorage `en` | EN quiz görünür, TR quiz yok | Toggle + state |
| 3 | Reload sonrası kalıcı, geri TR'ye dönülebilir | Reload → EN; TR'ye dön → TR quiz | Persistence |
| 4 | Aynı dile tekrar tıklamak bozmuyor | TR iken TR'ye tıkla → hâlâ TR | Negative/idempotent |

**Bölüm B — Body scan (24 test, tüm routes):**

| # | Senaryo | Adımlar | Beklenen Sonuç | Teknik |
|---|---------|---------|----------------|--------|
| 1–24 | `/{route}` EN modda `ı/ğ/ş` taraması | ENG toggle tıkla → her sekme aç → `body.innerText()` `[ığş]` regex test | violations = [] | Regex scan, parametrik |

**Test Tekniği:** Regex `/[ığş]/` (sadece küçük harf) — false positive riski çok düşük (bu karakterler İngilizce'de kullanılmıyor). Büyük harf Ğ/Ş/İ kapsam dışı (bilinçli karar).

---

## 3. Test Teknikleri — Kullanılan Yaklaşımlar

| Teknik | Nerede Kullanıldı |
|--------|-----------------|
| **E2E Black-box** | topic-pages-ui, other-pages-ui, tüm AC testleri |
| **Veri Odaklı (Data-driven)** | docker-mastery: `dockerData.tr` quiz cevaplarını test girdisi olarak kullanma; quiz-retry: `dockerData.tr.sections[0].blocks` |
| **Sınır Değer Analizi (BVA)** | AC04: %0, %33, %60, %66.7 gating eşikleri; AC07: %80 mastery eşiği; AC06: 4/5 vs 5/5 textarea |
| **Negatif Test** | quiz-retry (2. retry yok), quiz-retry (doğru cevapta retry yok), i18n (aynı dile tıkla), AC06 (boş cevap), AC07 (Vazgeç), AC05 (anon kullanıcı) |
| **Durum Tabanlı (State-based)** | Auth/anon ayrımı, quiz answered/unanswered state, tab completed/incomplete |
| **Network Mock/Intercept** | `page.route()` ile AI çağrıları kesilip deterministik sonuç döndürme; 500 hata simülasyonu; düşük skor simülasyonu |
| **API Test** | api-endpoints.spec.ts: doğrudan Supabase RPC ve Edge Function HTTP çağrıları |
| **Auth Enjeksiyonu** | JWT, email/password login → `localStorage` via `addInitScript` → OAuth bypass |
| **Backend State Doğrulama** | `user_progress` tablosunu Supabase REST ile sorgulama (sadece UI state değil) |
| **Regex/Pattern Tarama** | i18n-content-toggle: `/[ığş]/` ile tüm body text tarama |
| **Crash Detection** | `[object Object]` stringification + console error + pageerror listener |
| **Icon-based Discovery** | typescript-page: `💼` emoji ile interview tab tespiti (index'e bağımlılık yok) |
| **Service Worker Bloklama** | `serviceWorkers: 'block'` — MSW/SW + Playwright route çakışmasından kaçınma |
| **Koşullu Assertion** | Badge toast (kümülatif trigger) — `if await isVisible()` ile opsiyonel kontrol |

---

## 4. Kapsam Haritası — Route × Test Dosyası

| Route | topic-pages-ui | sql-page | js-page | ts-page | i18n | docker-mastery | diğerleri |
|-------|:--------------:|:--------:|:-------:|:-------:|:----:|:--------------:|:---------:|
| `/` | — | — | — | — | — | — | ✅ other-pages |
| `/python` | ✅ | — | — | — | ✅ | — | ⚠️ stale hash url |
| `/typescript` | ✅ | — | — | ✅ | ✅ | — | ⚠️ stale hash url |
| `/sql` | ✅ | ✅ | — | — | ✅ | — | — |
| `/javascript` | ✅ | — | ✅ | — | ✅ | — | — |
| `/docker` | ✅ | — | — | — | ✅ | ✅ | ✅ quiz-retry, quiz-ai, grading-reset |
| `/java` | ✅ | — | — | — | ✅ | — | — |
| `/playwright` | ✅ | — | — | — | ✅ | — | — |
| `/selenium` | ✅ | — | — | — | ✅ | — | — |
| `/cypress` | ✅ | — | — | — | ✅ | — | — |
| `/jenkins` | ✅ | — | — | — | ✅ | — | — |
| `/kubernetes` | ✅ | — | — | — | ✅ | — | — |
| `/aws`, `/azure` | ✅ | — | — | — | ✅ | — | — |
| `/browserstack` | ✅ | — | — | — | ✅ | — | — |
| `/jmeter` | ✅ | — | — | — | ✅ | — | — |
| `/postman`, `/bruno` | ✅ | — | — | — | ✅ | — | — |
| `/kafka`, `/appium` | ✅ | — | — | — | ✅ | — | — |
| `/git-github`, `/linux` | ✅ | — | — | — | ✅ | — | — |
| `/rest-assured` | ✅ | — | — | — | ✅ | — | — |
| `/test-frameworks` | ✅ | — | — | — | ✅ | — | — |
| `/what-is-testing` | ✅ | — | — | — | ✅ | — | — |
| `/java-document`, `/git-document` | — | — | — | — | — | — | ✅ other-pages |
| `/manual-testing`, `/algorithms`, `/advanced-algorithms`, `/qa-mentor` | — | — | — | — | — | — | ✅ other-pages |
| `/leaderboard` | — | — | — | — | — | — | ✅ other-pages |
| `/basit-backend`, `/security`, `/backend` | ❌ kalıcı istisna | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 5. Kalite Güvencesi Değerlendirmesi — Gerçekten QA Verebilir misin?

### 5.1 Gerçek Güvence Verilen Alanlar ✅

| Alan | Güvence Seviyesi | Gerekçe |
|------|-----------------|---------|
| **Render sağlığı — tüm 24 ders sayfası** | Yüksek | 24 sayfanın tüm sekmeleri teker teker render ediliyor; console error yakalanıyor |
| **AC03 (i18n) — EN modda Türkçe karakter yok** | Yüksek | 24 route × her sekme body scan; `/[ığş]/` regex false positive riski çok düşük |
| **AC03 TR/EN toggle mekanizması** | Orta-yüksek | Temel flow + localStorage kalıcılığı + negatif (idempotent) test edildi |
| **AC02 Quiz retry mekanizması** | Yüksek | Pozitif + negatif + boundary (ikinci retry yok) üç test ile kapsamlı |
| **AC04 Quiz gating (%60 eşiği)** | Orta-yüksek | Docker üzerinde %0, %33, %66.7 boundary testleri; SQL/JS/TS sayfalarında yalnızca son sekme kilit kontrol |
| **AC06 Grading dayanıklılığı** | Yüksek | Boş input engeli, transient 500 hatası, düşük skor akışı; her biri ayrı assertion |
| **AC07 Reset mekanizması** | Yüksek | Vazgeç + onayla akışı; UI state + localStorage + Supabase backend üçlü doğrulama |
| **Backend API (happy path)** | Orta | 200 + response schema; hata durumları ve rate limit sınırları test edilmemiş |
| **AC05 AI açıklama — erişim kontrolü** | Orta | Anonim TR+EN + üye hata durumu; başarılı AI içeriği doğrulanmıyor |

### 5.2 Boşluklar ve Riskler ❌⚠️

| Boşluk | Risk Seviyesi | Detay |
|--------|--------------|-------|
| **AC08 — Tema/dark mode/erişilebilirlik** | Orta | Hiç test yok. Dark mode geçişinde renk/okunabilirlik sorunları gözden kaçabilir |
| **AC09 — Roadmap progress** | Düşük | Özellik kısmen implement; test yok |
| **AC05 — AI açıklama başarılı içerik** | Orta | AI'ın ürettiği açıklamanın konu ile ilgili ve dil uyumlu olduğu doğrulanmıyor |
| **python-page.spec.ts — stale hash URL** | Yüksek | `/#/python` eski format. Bu testler yanlış URL'e gidiyor; geçerleri yanlış nedenle geçiyor olabilir |
| **sql/javascript-page.spec.ts — son sekme varsayımı** | Orta | `i < count - 1` koşulu: interview sekmesi her zaman son sekme değilse gating testi yanlış sekmede çalışır |
| **sql-page.spec.ts — hardcoded sayı** | Orta | `expect(count).toBe(25)` — bir sekme eklenince test kırılır |
| **Tarayıcı çaprazlığı** | Yüksek | Yalnızca Chromium. Firefox ve Safari/WebKit test edilmiyor |
| **Mobil responsive** | Yüksek | Playwright'ta mobile viewport testi yok. WCAG touch target (36px) doğrulaması yok |
| **Visual regression** | Orta | Tasarım değişikliklerinde görsel bozulmalar gözden kaçar |
| **Performans/yük** | Düşük | JS chunk boyutu uyarıları var (TopicPage: ~1.3MB); yük testi yok |
| **docker-mastery — MSW çakışması** | Orta | `serviceWorkers: 'block'` yok; MSW aktifse AI çağrıları mock edilemeyebilir |
| **Mülakat 50 soru kuralı (AC06)** | Orta | Her sayfada 50+ mülakat sorusu olduğu otomatik doğrulanmıyor |

---

## 6. Test Konfigürasyonu

| Parametre | Değer | Notlar |
|-----------|-------|--------|
| Framework | Playwright 1.57 | |
| Tarayıcı | Chromium (Desktop Chrome) | Firefox/WebKit yok |
| Paralel | `fullyParallel: true` (lokal) / `workers: 1` (CI) | |
| Retry | 0 (lokal) / 2 (CI) | |
| Reporter | HTML | `playwright-report/` klasörüne |
| Timeout | 30–120s test başına | Ağır sayfalarda `test.setTimeout` ile artırılmış |
| Web server | `npm run dev` (Vite 5173) | CI'da yeniden başlatılır |
| Env yükleme | Node 20.6+ `process.loadEnvFile('.env.local')` | Supabase ve test user credentials |
| Git hook | `simple-git-hooks` → post-commit | `npm run test:e2e` otomatik koşar |

**Ek suite'ler** (bu rapor kapsamında değil):
- `npm run test:interview-flows` → `playwright.interview-flows.config.ts`
- `npm run test:quiz-audit` → `playwright.quiz-audit.config.ts`

---

## 7. Öncelikli İyileştirme Önerileri

| Öncelik | Konu | Aksiyon |
|---------|------|---------|
| 🔴 | `python-page.spec.ts` stale | Hash URL'leri temiz path'e çevir veya `topic-pages-ui.spec.ts` zaten kapsıyor diye dosyayı sil |
| 🔴 | `sql-page.spec.ts` — hardcoded sekme sayısı | `expect(count).toBe(25)` → `toBeGreaterThan(20)` |
| 🔴 | `sql-page.spec.ts` + `javascript-page.spec.ts` — son sekme varsayımı | `💼` emoji ile interview tab tespiti (typescript-page.spec.ts'den kopyala) |
| 🟡 | Chromium-only | `playwright.config.ts`'e Firefox projesi ekle |
| 🟡 | AC05 AI başarılı içerik | Mock yerine gerçek Groq çağrısı ile response ilgililik ve dil testi (maliyetli suite'e taşı) |
| 🟡 | AC08 dark mode | En az: dark mode toggle → body'de `dark-mode` class; `--tw-bg-opacity` değeri değişti mi |
| 🟡 | Mülakat 50 soru kuralı | `interview-questions` block'larını `pages.length >= 50` ile doğrulayan statik audit testi |
| 🟢 | `docker-mastery` — `serviceWorkers: 'block'` | MSW çakışmasına karşı koruma |
| 🟢 | Mobile viewport | `devices['iPhone 14']` ile en az bir kritik flow (quiz cevaplama, dil toggle) |
