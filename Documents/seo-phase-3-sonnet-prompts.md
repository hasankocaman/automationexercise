# SEO Faz 3 — Sonnet Görev Promptları

> **Branch:** `feature/seo-phase-3-serp-rankings`
> **Ana plan:** `Documents/seo-phase-3-plan.md` (§0 görev dağılımı tablosu)
> **Kullanım:** Aşağıdaki her blok TEK BAŞINA yapıştırılabilir. Sırayla değil,
> bağımlılığı karşılananlar paralel de çalıştırılabilir.
>
> **Bağımlılık durumu (2026-08-02):**
> - **S1 — HAZIR.** `seoAnswer` altyapısı tamamlandı; `/selenium` referans
>   uygulaması yayında (`src/data/seleniumData.js` içinde `seoAnswer` alanına
>   bak, aynı kalıbı uygula).
> - **S2 — BEKLİYOR.** `FAQPage` altyapısı (kilitsiz kaynak + görünürlük
>   guard'ı) Opus tarafında henüz yazılmadı.
> - **S3 — BEKLİYOR.** `/test-automation` route'u ve sayfa iskeleti henüz yok.
> - **S4, S5 — HAZIR**, bağımlılıkları yok.

---

## HER PROMPT İÇİN ORTAK KURALLAR (kopyalanan bloklarda tekrarlanıyor)

1. `CLAUDE.md` §1.1 dört maddelik doğruluk checklist'i çalıştırılmadan
   "tamamlandı" denmez: içerik bütünlüğü, ipucu-konu bağı, TR yorum taraması,
   `npm run build`.
2. Bir `*Data.js` dosyasını her düzenlemeden SONRA, build beklemeden
   `node --check src/data/<dosya>.js` çalıştır (apostrof/backtick kaçış hatası
   en sık kırılma sebebi — `CLAUDE.md` §23.2).
3. Tüm kullanıcıya görünen metin iki dilli: `{ tr: '...', en: '...' }`.
   EN tarafında Türkçe karakter kalmayacak (`npm run i18n:check`).
4. İçeriğe plan dosyası adı, `§` bölüm numarası, faz/görev kodu YAZILMAZ
   (`CLAUDE.md` §24). Kuralın kendisini anlat, kaynağını değil.
5. Teknik terimler İngilizce kalır (`locator`, `fixture`, `assertion`,
   `pipeline`, `SELECT`, `JOIN`). Açıklama cümleleri Türkçedir.

---

## S1 — `seoAnswer`: "X nedir?" sorusunun doğrudan cevabı

> ✅ **Önkoşul karşılandı.** Altyapı hazır ve `/selenium` referans uygulaması
> yayında. `src/data/seleniumData.js` içindeki `seoAnswer` alanını örnek al.

```
GÖREV: 9 ders sayfasına `seoAnswer` alanı ekle (Selenium ÖRNEK olarak zaten
eklendi — onu tekrar yazma, kalıp olarak kullan).

NEDEN: Google "selenium nedir" gibi sorgularda öne çıkan cevap kutusu için
sayfanın en üstünde, 40-70 kelimelik, doğrudan tanım arıyor. Bizim sayfalarımız
şu an analoji ile açılıyor — pedagojik olarak doğru ama sorguyu ilk cümlede
cevaplamıyor. `seoAnswer` bu boşluğu kapatır ve analoji kutusunu DEĞİŞTİRMEZ,
onun ÜSTÜNE eklenir.

DOSYALAR (öncelik sırasıyla, her biri ayrı commit):
  src/data/playwrightData.js    → "playwright nedir"
  src/data/cypressData.js       → "cypress nedir"
  src/data/pythonData.js        → "python ile test otomasyonu"
  src/data/sqlData.js           → "sql nedir / testçi için sql"
  src/data/javaData.js          → "qa için java"
  src/data/dockerData.js        → "docker nedir"
  src/data/jenkinsData.js       → "jenkins nedir"
  src/data/apiTestingData.js    → "api testi nasıl yapılır"
  src/data/whatIsTestingData.js → "yazılım testi nedir"

BİÇİM: Her veri dosyasının `tr` ve `en` ağacında, `hero` nesnesinin YANINA:

  seoAnswer: {
    tr: 'Selenium, web tarayıcılarını gerçek bir kullanıcının yaptığı gibi ...',
    en: 'Selenium is a W3C-standard protocol that drives real browsers ...',
  }

KURALLAR:
  • İLK CÜMLE tanımdır ve sorguyu doğrudan cevaplar: "Selenium, ...dır."
    "Bu sayfada öğreneceksin", "Merhaba", "Test otomasyonu dünyasında..." gibi
    ısıtma cümlesi YASAK.
  • 40-70 kelime. Kısası cevapsız, uzunu kırpılır.
  • İkinci/üçüncü cümle: ne işe yarar + en yaygın kullanım alanı.
  • Teknik terim İngilizce, anlatım Türkçe.
  • EN metni TR'nin birebir çevirisi olmak zorunda değil ama AYNI tanımı
    vermeli.
  • Rakiplerden kopyalama yok — kendi cümlelerinle yaz.

KABUL:
  • 9 dosyanın hepsinde `tr` ve `en` ağacında `seoAnswer` var.
  • `node --check` her dosyada temiz.
  • `npm run build` geçiyor — build sonunda "Answer-first paragraphs: 10 sayfa"
    yazmalı (şu an 1). Bu satır, metnin statik HTML'de gerçekten basıldığını
    doğrular; sayı beklenenden azsa alan yanlış yere konmuş demektir.
  • Sayfa tarayıcıda açıldığında cevap paragrafı hero'nun hemen altında GÖRÜNÜR
    (gizli metin değil — görünmeyen metni arama motoruna sunmak politika ihlali).
```

---

## S2 — Sayfa başına kilitsiz "Sık Sorulan Sorular" bloğu

> ⚠ **Önkoşul:** Opus tarafındaki `FAQPage` altyapısı (şemanın kilitsiz
> kaynaktan üretilmesi + görünürlük guard'ı) tamamlanmış olmalı.

```
GÖREV: 10 ders sayfasına, quiz kilidinin ARKASINDA OLMAYAN, 5-8 soruluk bir
"Sık Sorulan Sorular" bölümü ekle.

NEDEN: Her sayfada 50 mülakat sorusu var ama hepsi %60 quiz barajının arkasında.
Kullanıcının göremediği içeriği arama motoruna yapılandırılmış veri olarak
sunmak politika ihlalidir ve manuel ceza riski taşır. Bu yüzden şemaya kaynak
olacak, HERKESE AÇIK bir soru-cevap bölümü gerekiyor. Ana sayfadaki ısınma
turu bunun doğru kalıbıdır: ekranda görünen metin ile şema BİREBİR aynıdır.

DOSYALAR: S1 ile aynı 10 veri dosyası.

YERLEŞİM: Sayfanın İLK sekmesinin (giriş bölümü) sonuna, quiz bloğundan ÖNCE.
Mülakat sekmesine KOYMA — orası kilitli.

BİÇİM: Mevcut `interview-questions` blok tipini KULLANMA (o gating'e tabi).
Bunun yerine `simple-box` + `text` blokları ya da sayfada zaten kayıtlı,
kilitsiz render edilen bir blok tipi kullan. Blok tipi seçimini yapmadan önce
o sayfanın kendi veri dosyasındaki mevcut kullanımlara bak.

SORU SEÇİMİ (gerçek arama sorgularından türet):
  • "X nedir?"  • "X ile Y arasındaki fark nedir?"  • "X öğrenmek ne kadar
  sürer?"  • "X ücretsiz mi?"  • "X hangi dilleri destekler?"
  • "X yerine ne kullanılır?"  • sayfadaki en sık hatalardan 1-2 tanesi.

KURALLAR:
  • Cevaplar 2-4 cümle, kendi kendine yeterli (sayfanın geri kalanını okumadan
    anlaşılmalı).
  • Sorular ve cevaplar iki dilli.
  • Aynı soru iki farklı sayfada TEKRARLANMAZ (her sayfa kendi konusunun
    sorularını cevaplar).
  • Java karşılaştırması uygun düştüğü yerde eklenir.

KABUL:
  • Sayfa GİRİŞ YAPMADAN, quiz çözmeden açıldığında sorular görünüyor.
  • `npm run build` geçiyor; `check-dist-seo.mjs` FAQ görünürlük kontrolünü
    geçiyor.
  • `node --check` temiz.
```

---

## S3 — `/test-automation` hub sayfasının içeriği

> ⚠ **Önkoşul:** Opus tarafında route, metadata ve sayfa iskeleti hazır olmalı.

```
GÖREV: `/test-automation` sayfasının ders içeriğini yaz (src/data/testAutomationData.js).

NEDEN: "test otomasyonu" sorgusunun şu an sahibi olan bir sayfamız yok; ana
sayfa ile framework karşılaştırma sayfası bu sorguyu bölüşüyor ve ikisi de
kazanmıyor. Bu sayfa o sorgunun TEK sahibi olacak ve sitedeki derin sayfalara
dağıtan merkez görevi görecek.

RAKİP ANALİZİ (Google'da ilk sırada olanlar): kurumsal blog yazıları ve kariyer
siteleri. Hepsi aynı kalıpta: tanım + "avantajları" listesi + kısa kapanış.
Hiçbirinde uygulanabilir karar desteği, maliyet gerçeği veya çalışan bir örnek
yok. Bizim üstünlüğümüz burada olacak.

SEKME YAPISI (her sekme dikey sidebar'da ayrı bölüm):
  1. Test otomasyonu nedir  — doğrudan tanım + manuel testle farkı
  2. Ne zaman otomatikleştirilir, ne zaman EDİLMEZ — karar ağacı
  3. Araç seçimi — Selenium / Playwright / Cypress / Appium hangisi ne zaman
  4. İlk otomasyon testin — çalışan, kopyalanabilir örnek
  5. Maliyet ve ROI — bakım maliyeti, kırılgan (flaky) test gerçeği
  6. Otomasyon neden başarısız olur — 6 gerçek başarısızlık kalıbı
  7. Kariyer — test otomasyon mühendisi ne yapar, hangi yolla başlanır
  8. Sık sorulan sorular (kilitsiz)

ZORUNLU STANDARTLAR:
  • Her sekmede en az 1 film bloğu + 1 animasyon + 1 sandbox
    (`CLAUDE.md` §9.5 tanımları bağlayıcı).
  • Her bölümün ilk bloğu `simple-box` ve 4 katmanlı analoji standardını
    karşılıyor (somut analoji + düşündürücü "neden" sorusu + Java/karşılaştırma
    + gerçek QA bağlamı — `CLAUDE.md` §9.3).
  • Quiz blokları konu anlatımından SONRA gelir.
  • Her sekmeden ilgili derin sayfaya iç bağlantı ver (bu sayfanın asıl işi
    dağıtmak): Selenium, Playwright, Cypress, Python, API testi, Jenkins.
  • Mülakat sekmesi bu sayfada ZORUNLU DEĞİL (hub sayfası, ders sayfası değil).
  • Yeni bileşen YAZILMAZ — mevcut blok tipleri veri olarak kullanılır.

KABUL:
  • `npm run build` geçiyor (SEO, içerik bütünlüğü, i18n kontrolleri dahil).
  • `node --check src/data/testAutomationData.js` temiz.
  • Sayfa TR ve EN açılıyor, sekmeler arası gezinti çalışıyor.
```

---

## S4 — Mevcut sayfaların sorgu hizalaması

```
GÖREV: Dört sayfanın metadata'sını ve giriş metnini gerçek arama sorgularıyla
hizala.

NEDEN: Bu sayfalar iyi içeriğe sahip ama başlıkları marka/ürün dilinde yazılmış.
İnsanlar "yazılım test uzmanı nasıl olunur" arıyor; bizim başlığımız
"QA Mentor" diyor. Google başlık ile sorguyu eşleştiremiyor.

DOSYA: src/utils/seo.js — ilgili dört `ROUTE_SEO` girdisi.

  /qa-mentor        → hedef sorgular: "yazılım test uzmanı nasıl olunur",
                      "testerlık öğren", "qa mühendisi nasıl olunur"
  /what-is-testing  → "yazılım testi nedir", "test türleri nelerdir"
  /manual-testing   → "manuel test nedir", "manuel test senaryosu örneği"
  /test-frameworks  → "playwright vs selenium" (EN tarafta en gerçekçi
                      ilk-10 şansımız — EN başlıkta bu ifade AYNEN geçmeli)

KURALLAR:
  • `title` ve `description` HEM İngilizce (üst seviye alanlar) HEM Türkçe
    (`tr` alt objesi) güncellenir. TR, EN'in kopyası olamaz.
  • `title` içinde `LearnQA.dev` geçmeli, toplam ~60 karakteri aşmamalı.
  • `description` 80-180 karakter.
  • Hedef sorgu description'ın İLK yarısında geçmeli.
  • Hiçbir iki route aynı title/description'ı taşıyamaz (build kırılır).

EK İŞ (/qa-mentor için): sayfanın en üstüne, sihirbazı BAŞLATMADAN görünen,
"Sıfırdan QA mühendisi olmak: 6 aşama" özet bölümü ekle (her aşama 1-2 cümle).
Şu an tüm içerik sihirbazın arkasında; arama motoru ve ilk kez gelen ziyaretçi
sayfanın ne vaat ettiğini göremiyor.

KABUL:
  • `npm run seo:check` geçiyor.
  • `npm run build` geçiyor.
  • Kanibalizasyon yok: iki sayfa aynı ana sorguyu hedeflemiyor.
```

---

## S5 — Dış otorite metinleri

```
GÖREV: Site dışı sinyalleri güçlendiren metinleri hazırla.

NEDEN: Teknik SEO ve içerik tamamlandığında geriye kalan tek fark dış
otoritedir. Rakiplerin (kariyer siteleri, kurumsal bloglar) tek gerçek
üstünlüğü budur ve kodla kapatılamaz.

ÇIKTILAR:
  1. README.md üst bölümü: canlı site linki, tek cümlelik marka açıklaması,
     ne öğretildiğinin listesi, ekran görüntüsü yer tutucusu. TR + EN.
  2. GitHub repo `About` metni (350 karakter sınırı) ve topic önerileri.
  3. Üç çapduzenli tanıtım yazısı TASLAĞI (dev.to / Medium / LinkedIn için),
     her biri sitedeki bir derin sekmeden türetilmiş ÖZET + siteye yönlendiren
     kapanış. Tam kopya DEĞİL — özet + "devamı ve interaktif alıştırmalar
     sitede" kalıbı. Önerilen konular:
       • Selenium wait stratejileri: neden Thread.sleep testini yalancı yapar
       • SQL JOIN'leri test mühendisi gözüyle
       • Playwright ve Selenium arasında gerçekten fark eden 5 şey
  4. Yazıların her birinin sonuna, ilgili sekme URL'ine kanonik link notu.

KURALLAR:
  • Metinler pazarlama dilinde değil, mühendis diliyle yazılır.
  • Abartılı vaat yok ("3 günde uzman ol" gibi).
  • Yazılar site içeriğinin BİREBİR kopyası olmamalı (kendi kendini kopyalayan
    içerik iki tarafta da değer kaybettirir).

KABUL:
  • README güncellendi ve build'i etkilemiyor.
  • Üç taslak `Documents/outreach/` altında ayrı dosyalarda.
  • Hiçbir metinde iç koordinasyon jargonu yok.
```

---

## Sonnet çalışırken sık düşülen tuzaklar (bu projede gerçekten oldu)

| Tuzak | Sonuç | Kaçınma |
|---|---|---|
| Tek tırnaklı string içinde kaçırılmış apostrof (`'bug'a'`) | build "Unexpected token" ile patlar | Her düzenlemeden sonra `node --check` |
| Backtick string içine backtick yazmak | aynı | Vurgu gerekiyorsa tek tırnaklı string kullan |
| `code-playground` / `error-dictionary` bloğuna `relatedTopicId` koymamak | içerik bütünlüğü kontrolü build'i kırar | Blok eklerken alanı ilk yaz |
| EN metinde Türkçe karakter bırakmak | `i18n:check` kırar | `npm run i18n:check` |
| Aynı ipucu/metni iki konuda tekrar etmek | bütünlük kontrolü kırar | Yeni metin yazmadan önce ara |
| Çift ağaçlı veri dosyasında yalnız bir ağaca eklemek | öbür dilde içerik görünmez | Dosyanın tek mi çift ağaçlı olduğunu ÖNCE tespit et |
