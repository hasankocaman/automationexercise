# Gauge + Java Sayfası — Plan ve İş Bölümü (Fable / Sonnet)

> **Route:** `/gauge` · **Data:** `src/data/gaugeData.js` · **Component:** `src/components/GaugePage.jsx` · **CSS:** `src/gauge-effects.css`
> Bu dosya kalıcı plan referansıdır (trending-skills-plan.md kalıbı). Anlık durum
> `.claude/NEXT_SESSION.md`'de tutulur, buraya commit hash yazılmaz.

---

## 1. Hedef

Gauge (ThoughtWorks) + Java + Selenium anlatan, CLAUDE.md'deki tüm kalite
standartlarını (simple-box 4 katman §9.3, interaktif üçlü §9.1/9.2, 2-2-2-2 §17,
quiz+retry §18, Feynman §19, min 50 mülakat sorusu §10, error-dictionary min 8,
TR yorum kuralı §8/9.4, SEO §6) karşılayan tam bir teknoloji sayfası. Kullanıcının
özel istekleri: **JSON dosyasından locator okuma ve framework içinde kullanma** ile
**By stratejileri + @FindBy annotation'ının ayrıntılı öğretimi** — ikisi de çekirdek
sekme olarak yazıldı.

## 2. Mimari Kararlar

- `gaugeData.js` restAssuredData kalıbını izler: `{ tr: {hero, tabs, sections}, en: {...} }`,
  bölümler `blocks` dizisi, **tüm kod blokları bilingual `{tr, en}`** (TR yorumlar Türkçe —
  `englishToTurkishCodeComments`'e bağımlılık bilinçli olarak sıfır tutuldu).
- İnteraktif üçlü (practice + step-animation + order-sort) elle yazılmadı;
  `fillMissingCodeTrios(gaugeData, 'gauge')` üretir. Bunun için
  `interactiveTrioFillers.js`'e iki profil eklendi: **`gauge-spec`** (spec→@Step→run→rapor
  akışı) ve **`gauge-locator`** (DOM incele→id/name→css/xpath→DevTools→depo). Bölüm
  başlığında "locator" geçen sekmeler otomatik `gauge-locator` profilini alır.
  `hintsForCode`'a gauge branch'i eklendi (@Step, @FindBy/PageFactory,
  LocatorRepository/ObjectMapper, By.*, hook'lar, spec sözdizimi — kod içeriğine göre hint).
- Feynman checkpoint'leri `fillMissingFeynman` + `gaugeFeynmanDefs` (6 bölümün 6'sı için tanımlı).
- GaugePage.jsx: TopicPage + `extraBanner` (koşum zinciri pipeline'ı, sayaçlı istatistik,
  `gauge run` konsol simülatörü) + scroll-reveal. **Tam görsel efekt paketi (Docker rollout
  kalıbı) bilinçli olarak WP-S3'e bırakıldı.**

## 3. Fable Tarafından Tamamlananlar (bu oturum)

| İş | Dosya | Durum |
|----|-------|-------|
| 6 çekirdek sekme: Neden Gauge? / Kurulum / Spec & Step / **By ile Locator** / **JSON Locator Deposu** / Gerçek Hayat Sorunları (8'li error-dictionary) | `src/data/gaugeData.js` | ✅ |
| Her sekmede 4 katmanlı simple-box, 2 quiz (+retryQuestion), tablo/grid/callout, bilingual kod | `gaugeData.js` | ✅ |
| gauge-spec / gauge-locator trio profilleri + gauge hint branch'i | `src/data/interactiveTrioFillers.js` | ✅ |
| Sayfa bileşeni + hero banner + konsol simülatörü + çekirdek CSS | `GaugePage.jsx`, `gauge-effects.css` | ✅ |
| Route + SEO + static shell + HomePage (3 nokta: resume map, nav chip, footer) | `App.jsx`, `seo.js`, `generate-static-routes.mjs`, `HomePage.jsx` | ✅ |
| Doğrulama: check-content-integrity ✓, `npm run build` ✓ (41 shell), headless Chromium smoke (H1, banner, sekme geçişi, 0 konsol hatası) ✓ | — | ✅ |

## 4. Sonnet İş Paketleri (sıralı çalıştır, her WP ayrı oturum/commit olabilir)

> **Genel kural (her WP için geçerli):** Başlamadan önce `CLAUDE.md` ve
> `.claude/NEXT_SESSION.md` oku. Bitirmeden önce §1.1'deki 4 maddelik checklist'i
> KENDİN çalıştır: (1) `node scripts/check-content-integrity.mjs`, (2) eklenen her
> hint/practice'in konu bağını tek tek kontrol et, (3) TR bağlamdaki TÜM yorum
> satırlarını tara, (4) `npm run build`. Sonra `.claude/NEXT_SESSION.md`'yi güncelle.

---

### WP-S1 — Mülakat Soruları sekmesi (50 soru) + tab

**Prompt (Sonnet'e aynen verilebilir):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi
(özellikle Bölüm 10, 9.4, 8) ve .claude/INTERVIEW_TEMPLATE.md ile
.claude/CONTENT_RULES.md Kural 6'yı oku.

GÖREV: src/data/gaugeData.js dosyasına 7. bölüm olarak "💼 Mülakat Soruları /
Interview Q&A" sekmesini ekle. Mevcut dosya kalıbını birebir izle
(restAssuredData.js'teki interview-questions bölümü referans).

Gereksinimler:
1. sections dizisine yeni bölüm ekle; trTabs'a '💼 Mülakat Soruları', enTabs'a
   '💼 Interview Q&A' ekle (sıralama: en son sekme).
2. Bölümün İLK bloğu 4 katmanlı bir simple-box olmalı (CLAUDE.md §9.3: somut
   analoji + düşündürücü neden sorusu + Java karşılaştırması + QA bağlamı).
3. Tek bir type: 'interview-questions' bloğu: relatedTopicId: 'gauge-interview',
   topic: 'Gauge', questions dizisinde TAM 50 soru:
   - 15 basic (level: 'basic'): kurulum, spec sözdizimi, @Step, plugin mimarisi,
     gauge run komutları, concept/cpt, veri tablosu.
   - 20 intermediate: hook yaşam döngüsü, DriverFactory/paralel koşum, By öncelik
     stratejisi, @FindBy/PageFactory proxy mekanizması, @FindBys vs @FindAll,
     JSON locator deposu (tip güvenliği trade-off'u, fail-fast, classpath),
     StaleElement/@CacheLookup, tags ile suite bölme, env yönetimi, CI entegrasyonu.
   - 15 advanced: mimari kararlar (Gauge vs Cucumber vs TestNG seçim gerekçesi),
     paralel koşumda state izolasyonu (ScenarioDataStore vs static alanlar),
     flaky test stratejisi, büyük projede locator deposu ölçekleme, custom
     screenshot grabber, gauge-maven-plugin ile pipeline tasarımı, rapor stratejisi.
4. "X nedir?" tarzı salt tanım sorusu YASAK — her soru senaryo tabanlı
   ("Production'da/CI'da ... ile karşılaştın, ne yaparsın?").
5. Her cevap 3-6 cümle, {tr, en} bilingual, uygun yerlerde kısa kod örneği ve
   Java/TestNG karşılaştırması içermeli. Cevap içindeki kod örneklerinde TR
   bağlamda Türkçe yorum (CLAUDE.md §9.4 — interview-questions blokları da kapsamda).
6. gaugeFeynmanDefs'e sectionIndex: 6 için yeni bir Feynman tanımı ekle
   (mevcut 6 tanımın formatını kopyala).
7. Soru metinleri gaugeData.js'teki mevcut quiz/hint metinleriyle %85+ benzerlik
   TAŞIMAMALI (check-content-integrity tekrar yasağı).

Bitirince §1.1 checklist'ini çalıştır ve NEXT_SESSION.md'ye durumu yaz.
Bu sekme eklenince mülakat gating (%60 quiz) TopicPage tarafından otomatik
devreye girer — quiz'lerin bölüm başına 2 adet olduğunu bozma.
```

---

### WP-S2 — "🌍 Ekosistem & CI/CD" sekmesi

**Prompt:**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md
(Bölüm 8, 9, 9.1-9.4, 17, 18) ve Documents/gauge-plan.md'yi oku.

GÖREV: src/data/gaugeData.js'e "Gerçek Hayat Sorunları" sekmesinden ÖNCE
(sections dizisinde index 5'e, tabs dizilerinde aynı konuma) yeni bölüm ekle:
trTabs: '🌍 Ekosistem & CI/CD', enTabs: '🌍 Ecosystem & CI/CD'.
DİKKAT: Araya bölüm eklediğin için mevcut gaugeFeynmanDefs'teki sectionIndex: 5
(Gerçek Hayat) tanımını 6'ya kaydırmayı ve yeni bölüm için sectionIndex: 5
Feynman tanımı eklemeyi unutma.

İçerik (tamamı bilingual, kod blokları {tr, en}, TR yorumlar Türkçe):
1. İlk blok: 4 katmanlı simple-box (§9.3).
2. env/ klasörü ve ortam yönetimi: env/default vs env/test properties,
   gauge run --env test, Java'daki Maven profiles karşılaştırması.
3. GitHub Actions workflow örneği (yaml kod bloğu): checkout → JDK kur →
   gauge CLI + java plugin kur → gauge run → rapor artifact yükle.
4. Jenkins pipeline karşılığı (kısa Jenkinsfile örneği).
5. Paralel koşum derinliği: --parallel -n, süreç bazlı izolasyon,
   ScenarioDataStore/SpecDataStore/SuiteDataStore tablosu (TestNG ThreadLocal
   karşılaştırmasıyla).
6. Rapor ekosistemi: html-report, xml-report (CI/JUnit entegrasyonu),
   spectacle; flaky yeniden koşum: gauge run --failed.
7. En az 2 quiz (+ her birinde retryQuestion, §18) ve 1 karşılaştırma tablosu.
8. Kod bloklarının ardındaki üçlüyü fillMissingCodeTrios('gauge') otomatik
   üretir — elle practice/step/order bloğu YAZMA; ama bash bloklarına üçlü
   üretilmediğini bil, kavramsal akışları java/yaml bloğu olarak ver.

Bitirince §1.1 checklist + NEXT_SESSION.md güncellemesi.
```

---

### WP-S3 — Tam görsel efekt paketi (Docker rollout kalıbı)

**Prompt:**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md Bölüm
20 (Disney/Pixar & LEGO modu) ve .claude/UI_STANDARDS.md'yi oku; referans olarak
src/restassured-effects.css + src/components/RestAssuredPage.jsx'i ve
src/docker-effects.css'i incele.

GÖREV: /gauge sayfasının çekirdek efekt paketini (src/gauge-effects.css +
src/components/GaugePage.jsx) RestAssured/Docker seviyesine yükselt.

Eklenecekler (rollout'un bilinen kuralları — geçmiş oturum derslerinden):
1. Sayfa geneli ambiyans: sabit radial-gradient glow + yüzen partiküller
   (amber/turuncu palet, .gauge-page scope'lu).
2. 10 saniyelik gece/gündüz veya eşdeğer ritmik ambiyans döngüsü — RestAssured'daki
   10s yıldırım döngüsü kalıbı. Ses eklenecekse src/lib/ambientSound.js'i kullan
   ve localStorage 'ambientSoundEnabled' tercihine saygı göster.
3. Hero banner'a ay/yıldız benzeri dekor eklersen .gg-hero-banner-container'da
   position: relative ZORUNLU (Docker rollout'unda yaşanmış konumlama bug'ı).
4. Light mode metin kontrastı role-bazlı CSS değişkenleriyle çözülmeli
   (--gg-role-* değişkenleri zaten var, onları genişlet) — jenerik AI paletinden
   kaçın, mevcut amber/fildişi kimliğini koru.
5. Magnetic buton + ripple + squash etkileşimleri (topic-back-btn ve
   dark-mode-toggle için), blok tilt efekti, glitch H1 — RestAssuredPage'deki
   useEffect kalıbını gg- prefix'iyle taşı; cleanup'ları eksiksiz kur.
6. Scroll progress göstergesi (ra-wave-progress benzeri, amber temalı).
7. prefers-reduced-motion'da TÜM animasyonlar kapanmalı.

Doğrulama: npm run build + Playwright ile TR/EN × light/dark 4 kombinasyonda
görsel kontrol, konsol hatası sıfır. Bitirince NEXT_SESSION.md güncelle.
```

---

### WP-S4 — E2E test kapsamına /gauge'u ekleme (WP-S1 sonrası)

**Prompt:**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md Bölüm
22 (6 zorunlu E2E kontrolü) ve 22.1 (istisna listesi) oku; tests/ klasöründeki
mevcut Playwright suite'lerinin route listelerini incele.

ÖN KOŞUL: WP-S1 (mülakat sekmesi) merge edilmiş olmalı — gating testleri
interview-questions bloğu olmadan anlamsız.

GÖREV:
1. Buton tıklanabilirliği ve i18n (EN modda Türkçe sızıntı) suite'lerinin route
   listelerine '/gauge'u ekle.
2. Mülakat gating (kapalı/açık durum), cevap input alanı, AI değerlendirme ve
   %80 bitirme rozeti kontrollerinin tam koşum suite'ine
   (test:interview-flows) '/gauge'u ekle.
3. Testleri çalıştır; fail varsa kök nedeni düzelt (testleri gevşetme).
4. Hangi suite'lerin /gauge'u kapsadığını NEXT_SESSION.md'ye işle.
```

## 5. Bilinçli Ertelenenler / Notlar

- W3Schools'ta Gauge müfredatı yok (§16 konu-eksiksizliği kuralı burada resmi
  Gauge dokümantasyonu başlıkları üzerinden yorumlandı: kurulum, spec, step,
  concept, tags, hooks, data-driven, env, paralel, rapor — CI/env kısmı WP-S2'de).
- `englishToTurkishCodeComments`'e ekleme yapılmadı; gaugeData tüm kod bloklarını
  bilingual tuttuğu için gerek yok. Yeni blok ekleyen herkes aynı kalıbı izlesin.
- Ana sayfa nav chip'i `nb('orange')` ile eklendi; kategori: Test Otomasyon.
