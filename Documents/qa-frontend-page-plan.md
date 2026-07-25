# `/qa-frontend` Sayfası — Plan + Görev Dağılımı (Opus / Sonnet)

> **Branch:** `frontenddevelopment-for-qa`
> **Durum:** ✅ **TAMAMLANDI** (2026-07-25) — Faz 1 iskelet (Opus) + GRUP A-J tam içerik (Opus GRUP A1/F pano/H lab referansları + Sonnet A2-A6, B-J) + D-S11 kapanış denetimi (§9.5 açığı GRUP I/J'de bulunup kapatıldı, content-integrity/i18n/build ilk kez tam çalıştırıldı, üçü de yeşil). Branch `frontenddevelopment-for-qa`, `main`'e merge kararı kullanıcıda.
> **Hazırlayan:** Claude Code (Opus) oturumu, 2026-07-25 (iskelet). GRUP A2-A6 → J + D-S11: Claude Code (Sonnet) oturumu, 2026-07-25.
> **Kaynak prompt:** Kullanıcının verdiği `/qa-frontend` promptu (bu dosyanın §E'sinde referans olarak saklanır).

Bu dosya 6 bölümden oluşur:
- **§A** — Mevcut koda göre doğrulanmış tespitler + prompta yapılan iyileştirmeler.
- **§B** — Opus'un kodladığı işler (bu commit).
- **§C** — Sonnet'in kodlayacağı işler (faz faz).
- **§D** — Sonnet için hazır promptlar (kopyala-yapıştır).
- **§E** — Orijinal prompt (referans).
- **§F** — Manuel test rehberi (sayfa bittikten sonra elle nasıl doğrulanır).

---

## §A. Değerlendirme — Kod Okuması ve Prompt İyileştirmeleri

### A.0. Depoda doğrulanan tespitler

| Kontrol | Sonuç |
|---|---|
| `src/data/qaFrontendData.js` var mı? | **Yok** — temiz yeni sayfa, çakışma yok. |
| `App.jsx` / `seo.js` / `generate-static-routes.mjs`'de `qa-frontend`? | **Yok** — sıfırdan eklenecek. |
| En yakın kardeş veri dosyası yapısı | **`gaugeData.js` / `apiTestingData.js` → TEK AĞAÇLI** (`{ tr:{hero,tabs,sections}, en:{...} }`, `sections` iki dile AYNI referans, her metin `{tr,en}`). Bu sayfa da **tek ağaçlı** kurulur. |
| Locator anlatımı zaten nerede? | `/selenium`, `/playwright`, `/cypress` locator **syntax'ını** araç bazında veriyor. Ortak `LOCATOR_EXPLORER_BLOCK` (`src/data/locatorExplorerData.js`) üçünde de paylaşılıyor. Bu sayfa **syntax tekrar etmez**, "neden bu DOM oluştu → hangi locator kırılmaz" mantığını verir, o sayfalara link atar. |
| `/javascript` DOM/event/async veriyor mu? | Evet — bu sayfadaki DOM anlatımı **locator gözüyle** olacak, genel JS tekrarı değil; çakışan yerde link. |

### A.1. Prompta yapılan iyileştirmeler (kod okuması sonrası — kullanıcı "gerekirse geliştir" dedi)

1. **İmza "Kaynak→DOM→Locator" üçlü panosu ASCII kutu OLARAK yazılmaz.** Promptun §2'sindeki ASCII kutu yalnızca *kavramsal şema*dır. CLAUDE.md §9.6 devasa ASCII `code` bloğunu YASAKLAR. Uygulama: her pano bir **`grid` bloğu `cols: 3`** (Sütun 1 = Kaynak, Sütun 2 = Gerçek DOM, Sütun 3 = Tester'ın Kararı) + hemen altında **`simple-box` (emoji 🎯) "Developer'dan Ne İste"** kutusu. Tek bileşen yazılmaz (CLAUDE.md §5).
2. **Hazır locator bileşenleri yeniden yazılmaz — kullanılır.** Depoda zaten var ve `TopicPage.jsx`'te kayıtlı:
   - `type: 'locator-explorer'` (`LocatorExplorerBlock.jsx`) — HTML içine `[[strateji|metin]]` işaretleri gömülür, kullanıcı attribute'a tıklar, hangi attribute hangi locator'ı verir ve dayanıklılık önceliği (id/testid=1 … xpath=4) görünür. **"Locator Laboratuvarı" ve tüm B/C/H sekmelerinin ana interaktif bloğu budur.**
   - `type: 'locator-visual'` (`LocatorVisualBlock.jsx`), `type: 'framework-puzzle'` (`FrameworkPuzzleBlock.jsx`), `DOMInspector.jsx` — destekleyici görseller.
   - "Yeni deploy → class hash değişti, locator hâlâ tutuyor mu?" kırılganlık dersi: `code-playground` (`solutionCode` = beklenen dayanıklı locator, hash class cevabı düşük puan) + bir `step-animation` ile canlandırılır. Gerçek runtime yerine metin/regex karşılaştırması (CLAUDE.md §9.1 practice kuralı).
3. **`i18n` sıfır-tolerans:** yeni sayfa `scripts/check-i18n-leaks.mjs` içinde baseline 0'dır — EN alanlarında Türkçe-özgü karakter (`çöüğşıİĞŞÇÖÜ`) OLURSA build kırılır. Sayfa tamamlanınca dosya `STRICT_ZERO_FILES`'a, sekme-trio tamamlanınca `TRIO_COMPLETE_PAGES`'e eklenir (CLAUDE.md §23.1).
4. **`relatedTopicId` zorunlu** her `code-playground` / `interview-questions` / `error-dictionary` bloğunda (CLAUDE.md §9.4) — yoksa `check-content-integrity.mjs` build'i kırar.
5. **Tek örnek uygulama ("Bug Tracker Board")** `/api-testing`'in Bug API'siyle aynı domain (id, title, severity, status, reporter) — süreklilik korunur, sayfa boyunca terk edilmez.

### A.2. Kullanılacak block tipleri (hepsi hazır, sadece `*Data.js`'e veri)

`simple-box` · `text` · `heading` · `grid` (cols:3 pano) · `code` · `code-playground` · `locator-explorer` · `locator-visual` · `framework-puzzle` · `table` · `quiz` · `challenge` (order-sort drag-drop) · `step-animation` · `simulation` · `animated-timeline` · `video-scene` · `feynman-checkpoint` · `error-dictionary` · `interview-questions` · `python-flow-diagram` (Kaynak→DOM akış diyagramı).

---

## §B. OPUS — Bu Commit'te Kodlananlar

**Amaç:** Sayfayı build-yeşil, gerçekten gezilebilir hale getirmek ve Sonnet'in kopyalayacağı **her benzersiz kalıbın referans örneğini** koymak.

1. **Wiring (tam):**
   - `src/App.jsx` — `React.lazy` import + `<Route path="/qa-frontend">`.
   - `src/utils/seo.js` — `ROUTE_SEO` girişi (title `LearnQA.dev`, description 80-180 char).
   - `scripts/generate-static-routes.mjs` — `DATA_MODULES` girişi.
   - `src/components/QaFrontendPage.jsx` — `TopicPage` sarmalayıcı (gradient).
   - `src/components/HomePage.jsx` — kart etiketi + sidebar link.
   - `scripts/check-i18n-leaks.mjs` — `STRICT_ZERO_FILES`'a `qaFrontendData.js` eklenir.
   - `tests/video-scene.spec.ts` — `/qa-frontend` için ≥1 render testi.
2. **`src/data/qaFrontendData.js` (tek ağaçlı):**
   - `hero` (tr/en), `tabs` = `sections.map(...)`, `export` + `fillMissingCodeTrios(...)` + `fillMissingFeynman(...)`.
   - **10 GRUP (A-J)** section olarak var; **her biri 4-katmanlı `simple-box` (CLAUDE.md §9.3) açılışıyla** dolu → sayfa boş değil, kalite barı belli.
   - **GRUP A tam referans atom (A1):** `simple-box` → `text` → `video-scene` film ("Kaynak Koddan Sayfaya") → `step-animation` → `locator-explorer` sandbox → `quiz` → GRUP sonu `feynman-checkpoint`.
   - **İmza pano referansı (GRUP F içinde):** 1 tam `grid cols:3` "Kaynak→DOM→Locator" panosu (React CSS Module hash örneği) + altında 🎯 `simple-box` "Developer'dan Ne İste".
   - **Locator Lab referansı (GRUP H içinde):** 1 `locator-explorer` bloğu (Bug Tracker DOM parçası) + kırılganlık `code-playground`'u.

Bu commit tek başına build'den geçer; Sonnet eksik atomları doldurur.

---

## §C. SONNET — Faz Faz Kodlanacaklar

Her faz sonunda **CLAUDE.md §1.1 (4 madde) + prompt §7 (10 ek kontrol)**. Referans atom Opus'un GRUP A1'idir — kalıbı birebir kopyala, içeriği konuya uyarla.

- **✅ Faz S1 — GRUP A tamamlama (A2-A6):** TAMAMLANDI (2026-07-25). A2 (DOM ağacı, step-animation + ilişkisel locate code-playground), A3 (CSSOM/Render Tree, step-animation + attached-vs-visible code-playground), A4 (Render'ın 5 Adımı video-scene + order-sort challenge), A5 (Reflow/Repaint, step-animation + sleep-vs-assertion code-playground), A6 (DevTools, step-animation + Copy-selector-düzeltme code-playground). Her başlıkta quiz+retryQuestion (§18). Doğrulama: check-content-integrity ✓ · i18n:check (regresyon yok) ✓ · npm run build ✓.
- **Faz S2 — GRUP B (HTML, B1-B5):** her başlık; `locator-explorer` yoğun; `id vs class vs data-testid` dayanıklılık `table` + `challenge`. ≥1 video-scene.
- **Faz S3 — GRUP C (CSS, C1-C6):** "Class Hash'i Neden Değişir" filmi (C3); hash/utility/runtime class → locate kırılganlığı; her başlıkta pano yok ama C3/C5'te var.
- **Faz S4 — GRUP D (JS, D1-D5):** DOM manipülasyon, event, async/fetch timing, mutation/wait. "Veri Gelince DOM Doluyor" filmi (D3).
- **Faz S5 — GRUP E (Frontend↔Backend, E1-E5):** `/api-testing` köprüsü, CSR/SSR/SSG, hydration. "Veri Gelince DOM Doluyor" (E2) + hydration simülasyonu.
- **Faz S6 — GRUP F (React, F1-F7):** her önemli bileşen için **Kaynak→DOM→Locator panosu** (grid cols:3 + 🎯). "Component Bir Fonksiyondur" filmi (F5). Java analojisi zorunlu (component≈metot, prop≈parametre, state≈instance field). Syntax derinliği için `/playwright`,`/cypress` linki.
- **Faz S7 — GRUP G (Angular, G1-G6):** panolar + React karşılaştırması; `_ngcontent-xxx` neden locate edilmez; `[attr.data-testid]` binding. "`*ngIf` Kapıyı Açıp Kapıyor" filmi (G3).
- **Faz S8 — GRUP H (Locator Ustalığı — SAYFANIN KALBİ, H1-H8):** dayanıklılık hiyerarşisi, antipattern'ler, "Aynı Elemente 5 Locator" (`locator-explorer`/`code-playground`), conditional/dynamic locate, list/tablo satırı, shadow DOM/iframe, "Developer'dan Ne İstenir", locator code review. "5 Locator Yarışı" filmi (sayfanın en kritik filmi). Locator Lab "yeni deploy" kırılganlık simülasyonu tam.
- **Faz S9 — GRUP I (`error-dictionary`, min 12 hata):** NoSuchElement, StaleElement, hash class, conditional wait'siz locate, iframe unutma, shadow DOM, index'e bağlı satır, display:none tıklama, hydration öncesi tıklama, `*ngIf` DOM sanma, text locate i18n kırılması, absolute XPath. "Stale Element" filmi. Her `error-dictionary`'de `relatedTopicId`.
- **Faz S10 — GRUP J (mülakat, min 50):** 15 Basic / 20 Intermediate / 15 Advanced, senaryo tabanlı (CLAUDE.md §10), her cevap 3-6 cümle + Java analojisi + gerekirse kod. `relatedTopicId` zorunlu.
- **Faz S11 — Kapanış:** `STRICT_ZERO_FILES` + `TRIO_COMPLETE_PAGES` (i18n) teyidi; §9.5 denetimi (her sekmede ≥1 video + animasyon + sandbox); `tests/video-scene.spec.ts` kapsamı; `NEXT_SESSION.md` güncelle.

---

## §D. Sonnet İçin Hazır Promptlar

> Her promptun başına şu ortak protokol eklenir:

**ORTAK PROTOKOL (her Sonnet fazında):**
> Önce oku: `CLAUDE.md` (§8, §9.1, §9.3, §9.4, §9.5, §9.6, §10, §16, §17, §19), `Documents/qa-frontend-page-plan.md` (bu dosya), `src/data/qaFrontendData.js` (Opus'un GRUP A1 referans atomu ve GRUP F pano referansı — kalıbı buradan kopyala). Veri dosyası **tek ağaçlı** (`{tr,en}` alanlar). Yeni bileşen YAZMA, sadece `qaFrontendData.js`'in ilgili section'ına veri ekle. EN alanlarında Türkçe-özgü karakter (çöüğşı) BIRAKMA — build kırılır (`npm run i18n:check`). Her `code-playground`/`interview-questions`/`error-dictionary`'ye `relatedTopicId` koy. Bittiğinde: `node scripts/check-content-integrity.mjs`, `npm run i18n:check`, `npm run build` → üçü de yeşil olmadan "bitti" deme.

---

### D-S1 — GRUP A tamamlama (A2-A6)
> `qaFrontendData.js`'te GRUP A section'ının A1 atomu Opus tarafından tamamlandı (simple-box → text → video-scene → step-animation → locator-explorer → quiz → feynman). A2-A6 başlıklarını (A2 DOM Ağacı Anatomisi, A3 CSSOM/Render Tree, A4 Render Ne Demek [Parse→Style→Layout→Paint→Composite], A5 Reflow/Repaint, A6 DevTools Elements Paneli) **aynı atom kalıbıyla** doldur. A4'e "Render'ın 5 Adımı" `video-scene` filmini ekle (5-8 sahne, `sceneDurationMs:3400`, `xpReward` 10-15, benzersiz `id`, `caption:{tr,en}`). Her atomik başlıkta CLAUDE.md §17 "2-2-2-2" (2 analoji, 2 akıl yürütme, 2 LEGO, 2 quiz) sağlanmalı. Bu sayfanın DOM anlatımı **locator gözüyle** — genel JS/DOM tekrarı yapma, `/javascript`'e link ver.

### D-S2 — GRUP B (HTML: Locator'ın Ham Maddesi)
> GRUP B (B1 Semantik Elementler, B2 Attribute'lar, B3 `id` vs `class` vs `data-testid`, B4 Form Elementleri, B5 Accessibility Tree) — her başlıkta atom kalıbı. B3'te dayanıklılık `table`'ı (attribute → deploy'da değişir mi → locate önerisi) + `challenge` (`variant:'order-sort'`, dayanıklılık sırasına diz). `locator-explorer` bloğunu Bug Tracker HTML'iyle yoğun kullan. ≥1 `video-scene`. Selenium/Playwright syntax'ını TEKRAR ETME, o sayfalara link.

### D-S3 — GRUP C (CSS: Neden Locator'ı Kırar)
> GRUP C (C1 Selector Mantığı, C2 Specificity/Cascade, C3 CSS Modules/Scoped hash, C4 Utility CSS/Tailwind, C5 Runtime Styling styled-components/emotion, C6 Pseudo-element/state). C3'e "Class Hash'i Neden Değişir" `video-scene` filmi (build'de `btn`→`Btn_btn__x7f2a`). C3 ve C5'e **Kaynak→DOM→Locator panosu** (grid cols:3 + 🎯). Ana ders: class'a göre locate neden kırılır, ne istenir.

### D-S4 — GRUP D (JavaScript: DOM'u Kim Değiştiriyor)
> GRUP D (D1 DOM Manipülasyonu, D2 Event Listener, D3 Async/Fetch, D4 Mutation/wait, D5 `data-*` okuma). D3'e "Veri Gelince DOM Doluyor" filmi. D4'te `sleep` neden yanlış, `wait` neden doğru — `step-animation` + `code-playground`. Locate timing sorununa odak.

### D-S5 — GRUP E (Frontend & Backend Nasıl Konuşur)
> GRUP E (E1 fetch/XHR `/api/v1/bugs`, E2 Response→State→Render, E3 CSR/SSR/SSG, E4 Hydration, E5 Loading/Error/Empty state). `/api-testing` sayfasına köprü linkleri. E4 hydration "sinsi bug" simülasyonu (HTML var, JS bağlanmadan buton çalışmaz). E3 render türü → locate zamanlaması `table`.

### D-S6 — GRUP F (React: Kaynağı Okumak)
> GRUP F (F1 Component=fonksiyon, F2 JSX okuma, F3 Props/State, F4 Conditional render, F5 List render/key, F6 `data-testid` React'te, F7 Sağlam Locator Stratejisi). Opus F içine 1 referans **Kaynak→DOM→Locator panosu** koydu — her önemli bileşen (BugCard, Modal, StatusBadge, Toast) için birer pano daha ekle (grid cols:3 + 🎯 simple-box). "Component Bir Fonksiyondur" filmi (F5 civarı). **Java analojisi zorunlu**: component≈metot/sınıf, prop≈parametre, state≈instance field, re-render≈yeniden çağırma. Syntax derinliği `/playwright`,`/cypress`.

### D-S7 — GRUP G (Angular: Kaynağı Okumak)
> GRUP G (G1 Component+Template ayrımı .ts/.html, G2 Template syntax `{{}}`/`[prop]`/`(event)`/`*ngIf`/`*ngFor`, G3 `*ngIf`/`*ngFor` ↔ React, G4 `_ngcontent-xxx`/`_nghost-xxx`, G5 `data-testid`/`[attr.data-testid]`, G6 Sağlam Locator Stratejisi). Her önemli bileşen için pano. "`*ngIf` Kapıyı Açıp Kapıyor" filmi. React karşılaştırması zorunlu.

### D-S8 — GRUP H (Locator Ustalığı — SAYFANIN KALBİ)
> GRUP H (H1 Dayanıklılık hiyerarşisi `data-testid`>`role`+`name`>stabil `id`>text>CSS>XPath-index, H2 Antipattern'ler, H3 Aynı elemente 5 locator, H4 Conditional/dynamic locate, H5 List/tablo tekil satır [index YASAK], H6 Shadow DOM/iframe, H7 Developer'dan ne istenir, H8 Locator code review). Opus H'ye 1 `locator-explorer` + kırılganlık `code-playground` referansı koydu. "5 Locator Yarışı" filmini (sayfanın en kritik filmi — aynı butona 5 locator, deploy sonrası hangisi hayatta) ekle. Locator Lab "yeni deploy simülasyonu" tam çalışmalı (hash değişince kullanıcı locator'ı tutuyor mu).

### D-S9 — GRUP I (`error-dictionary`, min 12 hata)
> GRUP I'ya min 12 gerçek hata: NoSuchElementException (render olmamış), StaleElementReferenceException, hash class'a bağlanıp build'de kırılma, conditional element'i wait'siz locate, iframe unutma, shadow DOM'a normal selector, index'e bağlı satır sıralama değişince kayması, `display:none` tıklama, hydration bitmeden tıklama, Angular `*ngIf`'li elementi DOM'da sanma, text locate i18n (TR/EN) kırılması, absolute XPath ufak DOM değişiminde patlama. Format: `error-dictionary` (`codeWrong`/`codeFixed` bilingual, TR yorum Türkçe), her biri `relatedTopicId`. "Stale Element" filmi.

### D-S10 — GRUP J (mülakat, min 50)
> GRUP J'ye min 50 mülakat sorusu: 15 Basic / 20 Intermediate / 15 Advanced. "X nedir?" YASAK — senaryo tabanlı (CLAUDE.md §10). Örnek bar: *"Test bir gün geçti bir gün kaldı; element `class='sc-bdfBwQ'` her deploy'da değişiyor, developer 'kodum aynı' diyor. Kime ne dersin, kalıcı çözüm?"*. Her cevap 3-6 cümle + Java analojisi + gerekirse kod. `interview-questions` bloğu `relatedTopicId` taşımalı. Mülakat sekmesi %60 quiz-gating arkasında kalır (beklenen).

### D-S11 — Kapanış denetimi
> Tüm sekmelerde §9.5 (≥1 video + ≥1 animasyon + ≥1 sandbox) doğrula. `scripts/check-i18n-leaks.mjs`'te `qaFrontendData.js`'i `TRIO_COMPLETE_PAGES`'e ekle (STRICT_ZERO'da zaten var). `tests/video-scene.spec.ts` kapsamını gözden geçir. `NEXT_SESSION.md`'yi güncelle (sayfa tamamlandı, açık işler). `node scripts/check-content-integrity.mjs` + `npm run build` yeşil.

---

## §E. Orijinal Prompt (Referans)

Kullanıcının verdiği `/qa-frontend` promptu bu planın kaynağıdır; tam metin oturum geçmişindedir. Özet omurga: (1) tester'ı frontend developer'ın omzundan baktırmak — ortak dil + locator ustalığı; (2) tek örnek uygulama "Bug Tracker Board" (React/Angular/saf HTML aynı çıktı, farklı kaynak); (3) imza "Kaynak→DOM→Locator" üçlü panosu (min 8 durum) + her panoda 🎯 "Developer'dan Ne İste"; (4) `/selenium`,`/playwright`,`/cypress` syntax'ını tekrar etmeme, "neden/hangi locator"a odak. Başarı ölçütü prompt §8'de.

---

## §F. Manuel Test Rehberi

> Sayfa içerik olarak TAMAMLANDI (D-S11). Bu bölüm, otomatik script'lerin (content-integrity, i18n:check, build, audit-interview-questions) YAKALAYAMADIĞI şeyleri — görsel doğruluk, etkileşim akışı, gerçek tarayıcı davranışı — elle doğrulamak için adım adım bir rehberdir. Yeni bir oturumda bu sayfaya dönen biri (Claude Code veya kullanıcı) buradan başlamalı.

### F.0. Kurulum

```bash
npm run dev
# Tarayıcıda: http://localhost:5173/qa-frontend
```

Konsolu (DevTools → Console) AÇIK tut — testin tamamı boyunca kırmızı bir hata/uyarı çıkmamalı (React key uyarısı, `undefined` prop uyarısı, 404 network isteği gibi).

### F.1. Genel Sayfa İskeleti (her sekmede ortak — 2 dakika)

1. Sayfa açıldığında sol tarafta **dikey sidebar** görünmeli (yatay tab bar DEĞİL) — 10 grup (🌐 A ... 💼 J) sırayla listelenir.
2. Sağ üstte **dil toggle** (TR/EN) var mı, tıklanınca içerik GERÇEKTEN değişiyor mu (sadece başlık değil, `simple-box` metinleri de) kontrol et.
3. Sayfayı aşağı kaydır — üstte bir **scroll progress bar** ilerlemeli.
4. Sağ altta sabit bir 🏠 **home butonu** olmalı, tıklanınca `/` adresine dönmeli.
5. Dark mode toggle'ı aç/kapa — sayfanın TÜM bloklarının (grid, table, code, video-scene) okunur kaldığını (siyah yazı siyah zemin gibi bir çakışma olmadığını) kontrol et.
6. Mobil genişlikte (DevTools → responsive, 375px) sidebar bir hamburger/açılır menüye dönüşmeli, yatay kaydırma (body scroll-x) OLMAMALI.

### F.2. Ana Sayfa Kartı (1 dakika)

1. `/` adresine git, "Test Araçları" kart grubunu bul (⚡ PERFORMANS & API grubunda DEĞİL — bilinçli olarak oraya taşındı, bkz. commit `d8f9c4b`).
2. "🖥️ QA için Frontend" kartına tıkla → `/qa-frontend`'e yönlendirmeli.
3. Alt bilgi (footer) listesinde de aynı linkin Playwright'ın yanında göründüğünü doğrula.

### F.3. GRUP A — Tarayıcı Nasıl Çalışır (5 dakika, REFERANS ATOM kalitesini burada kalibre et)

1. A1'deki **"Kaynak Koddan Sayfaya"** video-scene filmini oynat: ▶ butonuna bas, 6 sahnenin adım adım geçtiğini, altyazının (caption) her sahnede değiştiğini izle. ⏮/⏭ ile manuel gezinmeyi dene. Son sahnede ⏭ butonunun PASİF (disabled, ama görünür — dark mode'da da) olduğunu doğrula.
2. Hemen altındaki step-animation'da ("Kaynak Kod ile Canlı DOM") adımlar arası geçişi test et.
3. **Locator Explorer** (BugCard DOM'u) — renkli attribute'lara (`data-testid`, `class`, `id` vb.) tek tek tıkla; her birinde sağda dayanıklılık notu + Selenium/Playwright/Cypress kod örneği DEĞİŞMELİ.
4. Quiz'i YANLIŞ cevapla — bir `retryQuestion`'ın (yedek soru) göründüğünü doğrula, ardından DOĞRU cevapla geç.
5. A4'teki **"Render'ın 5 Adımı"** filmini + order-sort challenge'ı (sürükle-bırak ile Parse/Style/Layout/Paint/Composite'i sırala) dene — hem fare ile sürükleyerek hem klavye (↑/↓) ile.
6. Grup sonundaki **feynman-checkpoint**'e bir cevap yaz (5 yaşındaki birine anlatır gibi) ve AI değerlendirmesinin (veya mock/regex kontrolünün) bir sonuç döndürdüğünü doğrula.

### F.4. GRUP B-G — Atomik Başlıklar (her biri ~3 dakika, örnek akış aynı)

Her grup için aynı kısa döngüyü uygula: **oku → animasyon/film oynat → sandbox'ta "Kendin Dene"yi hem yanlış hem doğru cevapla dene → quiz'i çöz.**

Özellikle bunları doğrula:
- **B3** — dayanıklılık tablosu + order-sort challenge'ın (attribute'ları dayanıklılığa göre sürükleyerek sırala) doğru sırada kabul ettiğini.
- **C3** — "Class Hash'i Neden Değişir?" filmi + hemen altındaki `grid` panosunun (Kaynak/DOM/Karar 3 sütunu) mobilde de (dar ekranda) okunabilir kaldığını (yan yana değil alt alta dizilmeli).
- **D3** — "Fetch Bitmeden Locate Etmek" filmini oynat, D4'teki "Kendin Dene"de `sleep` içeren starter kodu çözüp assertion tabanlı çözüme benzer bir cevap yazınca başarı mesajının çıktığını.
- **E2** — "Veri Gelince DOM Doluyor" filmi; E4'teki hydration step-animation'ı.
- **F4/F5/F6** — Modal/StatusBadge/Toast panolarının HER BİRİNİN altında ayrı bir 🎯 "Developer'dan Ne İste" kutusu görünmeli (F7'deki BugCard panosuyla birlikte toplam 4 pano).
- **G3** — "*ngIf Kapıyı Açıp Kapıyor" filmi + React karşılaştırma tablosu yan yana okunabilir mi.

### F.5. GRUP H — Locator Ustalığı, SAYFANIN KALBİ (10 dakika, EN DETAYLI TEST BURADA)

1. **"5 Locator Yarışı"** filmini (H3) baştan sona izle — 7 sahnenin XPath'in SESSİZCE yanlış elemente düşmesi ile hash class'ın AÇIK hata vermesi arasındaki farkı görsel olarak net gösterdiğini doğrula.
2. **Locator Laboratuvarı**'nda (H1) her attribute'a tıklayıp dayanıklılık notlarını oku.
3. **"Kendin Dene: Deploy'da Hayatta Kalan Locator'ı Seç"** playground'unu (H3) çöz — hash class'a bağlı starter kodu `data-testid`/`getByRole` ile değiştirip başarı mesajını al.
4. H5'teki **"index YASAK"** playground'unda `.nth(4)` gibi bir index çözümü dene — ipucunun bunu neden reddetmesi gerektiğini (veya hint'in doğru yönlendirdiğini) doğrula, sonra `hasText` ilişkisel çözümle geç.
5. H7/H8'deki tabloları (Developer'dan Ne İste, Code Review checklist) oku — mobilde yatay scroll konteynerinin (`overflow-x-auto`) çalıştığını doğrula.

### F.6. GRUP I — Yaygın Hatalar (5 dakika)

1. **"Stale Element" filmini** oynat.
2. `error-dictionary` bloğunda **en az 12 hatanın** listelendiğini say (NoSuchElement, StaleElement, hash class, conditional wait'siz, iframe, shadow DOM, index kayması, display:none, hydration, Angular *ngIf, i18n text, absolute XPath).
3. Birkaç hatanın `codeWrong`/`codeFixed` kod bloklarını aç — TR modda yorumların Türkçe (aksanlı, `görünürlüğü` gibi — `gorunurlugu` DEĞİL), EN modda İngilizce olduğunu doğrula.
4. Hata-teşhis step-animation'ı ve "Kendin Dene: StaleElementReferenceException'ı Kalıcı Olarak Düzelt" playground'unu dene.

### F.7. GRUP J — Mülakat Soruları + Quiz Gating (EN KRİTİK AKIŞ TESTİ — 10 dakika)

Bu, CLAUDE.md §22'deki zorunlu E2E kontrol listesinin (madde 2-6) manuel karşılığıdır:

1. **Gating KAPALI durumu:** Sayfaya YENİ bir oturumda (localStorage temizlenmiş / gizli sekme) gir, hiçbir quiz'i çözmeden doğrudan GRUP J'ye git — mülakat sorularının **görünmediğini/kilitli** olduğunu doğrula.
2. Sırayla GRUP A'dan başlayarak quiz'leri çöz (yanlış cevaplarda retryQuestion çıkabilir, doğru cevapla devam et) — toplam quiz'lerin **%60'ına** ulaşınca (tam sayıyı görmek için tarayıcı konsolunda ilerlemeyi loglayan bir mekanizma varsa ona bak, yoksa tüm quiz'leri çözmek en garantili yoldur) GRUP J'nin **AÇILDIĞINI** doğrula.
3. GRUP J'de "Mülakatta Senaryo Sorusuna Cevap Verme Akışı" filmini + "Kendin Dene: Zayıf Cevabı Güçlü Cevaba Dönüştür" playground'unu dene.
4. `interview-questions` bloğunda toplam **50 soru** olduğunu, bir soruya tıklayınca **cevap yazılabilecek bir input/textarea** çıktığını doğrula.
5. Bir soruya kısa/zayıf bir cevap yaz, gönder — **AI değerlendirmesinin** (`grade-interview-answer` Edge Function, internet/Groq bağlantısı gerektirir) bir puan/sonuç döndürdüğünü doğrula. **Not:** Bu adım gerçek bir AI çağrısı yapar (rate-limit riski) — sık tekrarlama.
6. Soruların **%80'ine** doğru/yeterli cevap verildiğinde bir **bitirme rozeti** çıktığını doğrula (bu adım zaman alır, sadece bir kez tam koşum yapılması yeterli).

### F.8. Çapraz Link ve SEO Kontrolü (3 dakika)

1. Sayfa içindeki `/selenium`, `/playwright`, `/cypress`, `/javascript`, `/api-testing` linklerinin HER BİRİNE tıkla — 404 vermediğini, doğru sayfaya gittiğini doğrula.
2. Tarayıcı sekme başlığının (`<title>`) "Frontend for QA..." içerdiğini, view-source'ta `<meta name="description">`nin dolu olduğunu kontrol et.
3. `/qa-frontend` doğrudan URL ile (sayfayı yenileyerek, SPA navigasyonu OLMADAN) açıldığında da düzgün yüklendiğini doğrula (statik shell + hydration, GitHub Pages senaryosu).

### F.9. Bilinen ve Endişelenmeyecek Uyarılar

- Build çıktısında `QaFrontendPage` chunk'ının 500 kB üzerinde olduğu uyarısı (515.59 kB) — **build'i bozmaz**, CLAUDE.md §14/§23.8 kapsamındaki bilinen bir durumdur.
- `scripts/post-commit-tests.sh: No such file or directory` — commit sonrası görülen bir hook uyarısıdır, commit'i etkilemez.

### F.10. Bir Şey Bozuk Görünüyorsa

Önce CLAUDE.md §23 (En Sık Karşılaşılan Hatalar) bölümüne bak — özellikle §23.1 (EN modda TR sızıntısı) ve §23.7 (video-scene son sahne buton görünürlüğü) bu sayfada da geçerli kalıplardır. Bulduğun her yeni tekrarlayan hatayı oraya (CLAUDE.md, bu dosyaya değil) ekle.
