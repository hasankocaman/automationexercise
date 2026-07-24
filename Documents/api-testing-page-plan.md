# `/api-testing` Sayfası — Plan + Değerlendirme

> **Branch:** `feature/api-testing-page`
> **Durum:** Faz 0 (analiz/onay) — henüz kod yazılmadı.
> **Hazırlayan:** Claude Code oturumu, 2026-07-24.
> Bu dosya iki bölümden oluşur: (A) planın kritik değerlendirmesi ve mevcut
> koda göre doğrulanmış tespitler, (B) kullanıcının verdiği orijinal prompt
> (referans olarak aynen saklanır). Kodlamaya başlamadan önce (A) bölümündeki
> "Açık Kararlar" başlığındaki sorular kullanıcıyla netleştirilmelidir.

---

## A. Değerlendirme (Claude Code)

### A.0. Mevcut koda göre doğrulanmış tespitler

Planı yorumlamadan önce depoda şunları doğruladım:

| Kontrol | Sonuç |
|---|---|
| `src/data/apiTestingData.js` var mı? | **Yok** — temiz yeni sayfa, çakışma yok. |
| `App.jsx` / `seo.js` içinde `api-testing` referansı? | **Yok** — route sıfırdan eklenecek. |
| Çakışma kaynağı sayfalar (`postman`, `restAssured`, `bruno`) | **Üçü de mevcut** (3595 / 4737 / 2801 satır). |
| Pilot referanslar (`gauge`, `gitGithub`) | Mevcut, `video-scene` kullanıyor (gauge 8, gitGithub 14 film). |
| **En yakın "kardeş" veri dosyası yapısı** | **`gaugeData.js` → TEK AĞAÇLI** (`sections` paylaşımlı, her alan `{tr,en}`). `postmanData.js` ise ÇİFT AĞAÇLI (`en:{...}`/`tr:{...}` ayrı section ağaçları). |

**Kod okuması sonrası düzeltme:** İlk bakışta `postmanData.js` tek-ağaç
sandım; export'u okuyunca yanıldığım ortaya çıktı — `postmanData` **çift
ağaçlıdır** (`export const postmanData = { en: {hero,tabs,sections}, tr:
{hero,tabs,sections} }`, iki ayrı section ağacı; sadece film/interaktif
sabitler `{tr,en}` paylaşımlı). `gaugeData` ise **tek ağaçlıdır**
(`{ tr:{hero,tabs,sections}, en:{hero,tabs,sections} }` — `sections` İKİ tarafta
da AYNI referans, tüm metin `{tr,en}`).

**Karar (5.1 sorusunun cevabı): kardeş = `gaugeData.js` (tek ağaç).** Gerekçe:
(a) çift-ağaç, index-override / çift-bakım riskini taşır (bkz. memory:
`applyTr-mechanism-risks` — içerik genişleyince ağaçlar sessizce kayar);
(b) CLAUDE.md 9.5 tek-ağaç örneği olarak açıkça `gaugeData`'yı gösterir;
(c) tek ağaçta `video-scene` sabiti **tek yere** konur — çift-ağaç "iki ağaca
da aynı referans" tuzağı hiç oluşmaz.

**TopicPage tüketimi (doğrulandı):** `content = data[language]`, oradan
`{ hero, tabs, sections }`. **Sidebar DÜZ liste** — gruplu/iç içe sidebar
desteği YOK; `tabs.map` her section'ı bir sekme yapar, `tabs.length ===
sections.length` olmalı. Sonuç: ~50 atomik konu (Bölüm 16 W3Schools kuralı)
= ~57 düz sekme; grup hissi, sekme etiketlerine grup-öneki (`A1 ·`, `B2 ·`)
konarak verilir. Yeni component YAZILMAZ (Bölüm 5).

**Diyagramlar:** `postmanData.js`'in dosya başındaki inline-SVG sabit deseni
(`httpFlowSvg` vb.) bu sayfada da kullanılır (Bölüm 8 "dış görsel yok").

### A.1. Planın güçlü yanları

1. **CLAUDE.md'ye gerçekten bağlı.** Prompt, kuralları isimden değil numaradan
   referanslıyor (Bölüm 9.3, 9.4, 9.5, 10, 16, 17...) ve her kuralı sayfaya
   nasıl uygulanacağına dair somut karşılık veriyor. Bu, "kurallara uydum"
   iddiasını denetlenebilir kılıyor.
2. **Tek domain omurgası (`/api/v1/bugs`) doğru pedagojik karar.** Aynı model
   ve endpoint'lerin Java → Express → NestJS → Swagger → Postman → REST Assured
   → Playwright boyunca taşınması, "araç değişti, iş değişmedi" kavrayışını
   kuruyor. QA'in kendi dünyasından (bug tracker) domain seçmesi öğrenme yükünü
   sıfırlıyor — isabetli.
3. **"Defect Doğum Anı" imza özelliği sayfayı gerçekten farklılaştırıyor.**
   `/postman` ve `/rest-assured` "aracı" öğretiyor; bu sayfa "bug'ın kodda
   nerede doğduğunu" öğretiyor. Bu, mevcut sayfalarla çakışmayan **gerçek bir
   boşluğu** kapatıyor — sayfanın var olma gerekçesi sağlam.
4. **Çakışma kuralı açıkça yazılmış** ve iç-link stratejisiyle (hem buradan
   oraya hem oradan buraya) SEO + pedagoji açısından doğru kurulmuş.
5. **Faz faz ilerleme + her faz sonu 4+4 maddelik checklist**, CLAUDE.md
   Bölüm 1.1 ve 13'e tam uyuyor. Büyük veri dosyalarında bu şart.

### A.2. Riskler ve dikkat noktaları

1. **KAPSAM ÇOK BÜYÜK — en büyük risk bu.** 11 grup (A–K), ~50 atomik başlık, 9
   zorunlu `video-scene` film, ≥18 "Defect Doğum Anı" kutusu, ≥12 error-dictionary
   girişi, ≥50 mülakat sorusu. Her başlık için 2-2-2-2 (Bölüm 17) + üçlü (Bölüm
   9.1) + Feynman (Bölüm 19) uygulanırsa bu **tek oturumda bitmez** ve muhtemelen
   `postmanData.js`'in (3595 satır) 2-3 katı bir dosya çıkar. Sonuç: `javaData`
   gibi bir "büyük chunk" uyarısı (CLAUDE.md Bölüm 14) ve zor bakım.
   - **KARAR (A.3/2):** GRUP C ve D v1'de kalır ama **kısa/basit** anlatılır;
     derin ayrıntı v2'ye ertelenir. Bu, kapsamı büyütse de metin yükünü düşük
     tutarak dengeyi kısmen korur.
2. **Film sayısı → sekme düzeyi (KARAR A.3/1).** Kullanıcı "her sekmede ≥1,
   mümkünse her konuya özel film" dedi. Prompt'taki 9 film "amiral" filmler
   olarak tam üretilir; kalan her sekme kendi konusuna bağlı 5-6 sahnelik hafif
   bir film alır. Bu, en büyük emek kalemi — ~50 sekme ≈ ~50 film. Faz faz
   üretilmeli, film `id`'leri `api-` prefix'li ve benzersiz olmalı (XP
   tekilliği). Her sayfa fazından sonra `NEXT_SESSION.md`'de hangi sekmelerin
   filmi bitti işaretlenir.
3. **`fillMissingCodeTrios` yalnızca `type:'code'` + dili bash/shell/text
   OLMAYAN bloklara animasyon üretir** (memory: fillMissingCodeTrios-deficit).
   GRUP A (kavramlar), E (Network), F (Swagger okuma), J (hata sözlüğü), K
   (mülakat) büyük ölçüde **kodsuz** — bunlarda animasyon/sandbox **elle**
   yazılmalı ve her elle `code-playground`'a `relatedTopicId` **zorunlu**
   (Bölüm 9.4). Bu, otomatik doldurucuya güvenilemeyecek en az 5 grup demek —
   kapsamı ayrıca büyütür.
4. **415/422/CORS/`ECONNREFUSED` gibi hataların bir kısmı sunucu-tarafı
   davranış.** Bunları interaktif sandbox'ta gerçekten "çalıştırmak" mümkün
   değil (canlı backend yok). `code-playground` bunlarda "beklenen çözümle
   metin karşılaştırması" moduna düşer (Bölüm 9.1 zaten buna izin veriyor) —
   ama kullanıcıya "gerçekten çalışan" hissi vermez. Simülasyon/animasyon
   ağırlıklı gitmek gerekir; bu bir kısıt, plan bunu öngörmemiş.
5. **`tests/video-scene.spec.ts`'e eklenecek test** filmlerin `id`'lerinin
   benzersizliğine bağlı (XP tekilliği). 9 filmin `id`'leri projedeki mevcut
   ~50+ film id'siyle çakışmamalı — `api-` prefix'i ile namespacing önerilir.

### A.3. Kullanıcı Kararları (2026-07-24 — NETLEŞTİ, bağlayıcı)

Aşağıdaki üç karar kullanıcı tarafından verildi ve bu sayfa için bağlayıcıdır:

1. **Film yoğunluğu → maksimum.** Her dikey sekmede **en az 1 `video-scene`**
   olmalı; mümkün olan her yerde **o sekmede anlatılan her konuyla ilişkili**
   ayrı bir film hedeflenir. Yani "grup başına 1 film" yeterli DEĞİL — hedef
   sekme (konu) düzeyinde film. Pratik uygulama: A.2'deki 9 "amiral" film tam
   üretilir; kalan sekmeler için her sekmenin GERÇEK içeriğine (o sekmedeki kod
   bloğu/mekanizma) bağlı, 5-6 sahnelik daha hafif filmler eklenir. Konudan
   kopuk süs film YASAK (Bölüm 9.5) — sekme kodsuz bile olsa film o sekmenin
   kavramını (ör. "bir 4xx status kodunun anlamı", "Network Timing sekmesinde
   TTFB") görselleştirmeli.
2. **Express (C) + NestJS (D) v1'de KALIYOR — ama basit ve kısa.** Ana omurga
   (`/api/v1/bugs` aynı model/endpoint) her iki framework'te de kurulur, ancak
   anlatım **kısa ve öz** tutulur (derin best-practice / edge-case v2'ye
   ertelenir). Amaç: tester "aynı iş, farklı sözdizimi" görsün. Bu grupların
   sekmelerinde de film+animasyon+sandbox zorunlu (karar 1 ve 3 gereği), ama
   metin yükü düşük.
3. **Kodsuz gruplarda (A, E, F, J, K) animasyon VE sandbox ZORUNLU.** Amaç
   görsel + pratiğe dayalı eğitim. `fillMissingCodeTrios` bu gruplarda
   çalışmayacağı için (kodsuz/bash) her animasyon ve sandbox **elle** yazılır;
   her `code-playground`'a `relatedTopicId` zorunlu (Bölüm 9.4). Kodsuz konular
   için sandbox, "gerçek runtime" yerine **beklenen çözümle metin/seçim
   karşılaştırması** modunda kurulur (Bölüm 9.1 buna izin verir) — ör. "şu
   response için doğru status kodunu seç", "bu Swagger şemasından eksik test
   senaryosunu tamamla", "bu cURL'ü doğru Postman assertion'ına eşle".

**Kapsam sonucu:** Bu üç karar kapsamı A.2'de uyardığım üst sınıra çekiyor —
tek oturumda bitmez. Bu yüzden **faz faz ilerleme (Bölüm 6) zorunlu**; her faz
sonunda Bölüm 1.1 + bu dosyadaki Bölüm 7 checklist'i koşulur ve kalite
kullanıcıyla kalibre edilir. Film sayısı grup düzeyi yerine sekme düzeyi
hedeflendiğinden, `video-scene` `id` çakışmasını önlemek için tüm filmler
`api-` prefix'i ile isimlendirilir.

### A.4. Onaylanan teknik kararlar (değişmeyecek)

- Veri dosyası: **tek ağaçlı bilingual**, `postmanData.js` kardeş alınacak.
- `video-scene` sabitleri **tek yere** konacak (ayrı ağaç yok).
- Diyagramlar `postmanData.js`'teki inline-SVG sabit desenini kullanacak
  (yeni component yok — Bölüm 5).
- Route ekleme zinciri: `App.jsx` (lazy) + `seo.js` (`ROUTE_SEO`) +
  `generate-static-routes.mjs` + ana sayfa kartı + `video-scene.spec.ts`.
- SEO arama niyeti: *"API testing tutorial for QA engineers"* / *"API nasıl
  test edilir"* — problem odaklı, sadece araç adı değil (Bölüm 6).

### A.5. Genel yargı

Plan **kaliteli, kural-farkında ve gerçek bir boşluğu kapatıyor** — uygulanmaya
değer. Tek ciddi risk **kapsam**: olduğu gibi tek seferde bitirilemez, ve
Express/NestJS tam gruplarının çekirdek vaate katkısı marjinal. Kapsamı v1/v2
olarak bölüp Faz 1+2'yi bitirdikten sonra kaliteyi kullanıcıyla kalibre etmek
en sağlıklı yol. "Defect Doğum Anı" özelliğinden ödün verilmemeli — sayfanın
kimliği o.

---

## C. Model İş Bölümü — Opus / Sonnet (2026-07-24, bağlayıcı)

**İlke:** Opus, tekrar kullanılacak TÜM şablonları/desenleri en yüksek kalitede
kurar (yargı-yoğun iş); Sonnet bu şablonları kalan gruplara **çoğaltır**
(yüksek hacim, desen-takibi). Opus iki şablonu da tamamlar: **kodsuz konu**
şablonu (GRUP A) ve **kodlu konu + Defect Doğum Anı** şablonu (GRUP B). Böylece
Sonnet'in C–K için ihtiyaç duyduğu her iki kalıp da hazır olur.

### Opus tarafından kodlanacaklar (bu oturum)
| Faz | Kapsam | Ne kurar (şablon değeri) |
|---|---|---|
| Faz 1 | İskelet ✅ **BİTTİ** | Route zinciri, tek-ağaç veri, 57 atomik sekme, SEO, kart |
| Faz 2 | **GRUP A — Temeller (7 konu)** | KODSUZ konu şablonu: 9.3 analoji, video-scene film, `step-animation`+`challenge`+`code-playground` (seç/eşleştir modu) trio, quiz sırası, Feynman, 2-2-2-2 |
| Faz 3 | **GRUP B — Java/Spring (8 konu)** | KODLU konu + **Defect Doğum Anı** imza şablonu: kod bloğu + Java film + kod-tabanlı trio + `error`-vari defect `simple-box` |
| Faz 10 | Final denetim (Sonnet BİTİNCE, tekrar Opus) | 9.5 denetimi, `video-scene.spec.ts`, `NEXT_SESSION.md` |

Opus, Faz 2 ve Faz 3'ü bitirip kullanıcıya haber verir; kullanıcı modeli
**Sonnet**'e alıp aşağıdaki promptlarla Faz 4–9'u sürdürür.

### Sonnet tarafından kodlanacaklar
| Faz | Kapsam | Prompt |
|---|---|---|
| Faz 4 | GRUP C (Express, **kısa**) + GRUP D (NestJS, **kısa**) + 3-framework karşılaştırma tablosu | §D.1 |
| Faz 5 | GRUP E — DevTools Network (kodsuz) | §D.2 |
| Faz 6 | GRUP F — Swagger / OpenAPI | §D.3 |
| Faz 7 | GRUP G (Postman) + H (REST Assured) + I (Playwright) — mevcut sayfalara link | §D.4 |
| Faz 8 | GRUP J — `error-dictionary` (≥12 hata) | §D.5 |
| Faz 9 | GRUP K — Mülakat (≥50 soru) | §D.6 |

---

## D. Sonnet Promptları (Faz 4–9)

> **Her prompt için ortak kural (hepsinde geçerli — tekrar yazılmaz):**
> 1. İşe başlamadan `CLAUDE.md` (Bölüm 8, 9, 9.1, 9.3, 9.4, 9.5, 10, 16, 17, 18, 19) ve `Documents/api-testing-page-plan.md`'yi oku.
> 2. **Şablon = `src/data/apiTestingData.js` içindeki GRUP A ve GRUP B.** Yeni desen icat etme; oradaki blok kalıplarını (film sabiti, `simple-box` 4-katman, trio, Defect Doğum Anı) **birebir kopyala**, sadece konuya göre içeriği değiştir.
> 3. **Tek ağaç:** section'ları `sections` dizisine ekle; her metin `{tr,en}`; film sabitini dosya başında tanımlayıp section'a **tek referansla** koy (çift ağaç YOK).
> 4. **Yeni component YAZMA** — sadece `apiTestingData.js`'e veri ekle. Diyagram gerekiyorsa inline SVG (Bölüm 8).
> 5. İlgili placeholder `mk()` section'ını **tam içerikle değiştir** (o grubun `groupX` tanımını literal section dizisine çevir).
> 6. **Omurga sabit:** tek örnek API `/api/v1/bugs`, model `{id, title(3-120), severity(LOW/MEDIUM/HIGH/CRITICAL), status(OPEN/IN_PROGRESS/CLOSED), reporter(email), createdAt(ISO-8601)}`.
> 7. **`relatedTopicId` zorunlu** her `code-playground`/`interview-questions`/`error-dictionary`'de. Film `id`'leri `api-` önekli, benzersiz.
> 8. TR yorumlar Türkçe (Bölüm 8); Java analojisi zorunlu (Express/NestJS/Playwright/TS). **Kod blokları BILINGUAL olmalı** — `code: { tr: \`…Türkçe yorumlar…\`, en: \`…İngilizce yorumlar…\` }` (GRUP A/B'deki her `type:'code'` bloğu bu formatta; düz string + Türkçe yorum EN modda sızıntı yapar, YASAK). ASCII-normalize et (ö→o, ş→s) — TURKISH_ONLY_CHARS `[ığş]` EN'de bulunmamalı.
> 9. **Her sekmede ≥1 `video-scene` + ≥1 animasyon + ≥1 sandbox** (Bölüm 9.5); mümkünse her konuya özel film.
> 10. Bitince **kendin çalıştır:** `node scripts/check-content-integrity.mjs` (0 ihlal) + `npm run build` (yeşil); sonucu raporla, doğrulamadan "bitti" deme (Bölüm 1.1).

### D.1 — Faz 4: GRUP C (Express) + GRUP D (NestJS) + karşılaştırma tablosu

```
apiTestingData.js'te GRUP C (C1–C6, Express.js) ve GRUP D (D1–D5, NestJS)
placeholder section'larını tam içerikle değiştir. Aynı /api/v1/bugs API'sini
önce Express, sonra NestJS ile KISA ve ÖZ kur — derin best-practice v2'ye
ertelenir, amaç "aynı iş, farklı sözdizimi" (Bölüm A.3/2).

Her atomik konu (C1..D5) için GRUP B şablonunu izle:
- İlk blok `simple-box` (Bölüm 9.3 dört katman: somut analoji + "neden" sorusu
  + Java/Spring karşılaştırması + QA bağlamı). Express/NestJS'i MUTLAKA Spring
  Boot ile karşılaştır (Java analojisi zorunlu).
- Konuyu kuran `code` bloğu (Express: JS; NestJS: TS) — /api/v1/bugs'un o
  katmanı. TR yorumlar Türkçe.
- Kod-tabanlı trio: `step-animation` + `challenge` (order-sort) + `code-playground`
  (starterCode/solutionCode, relatedTopicId).
- **Defect Doğum Anı** `simple-box` (emoji 🐞): "geliştirici bu satırı unutsaydı
  hangi bug doğardı, tester hangi katmanda yakalar". C grubunda ≥5, D grubunda ≥5.
- Konu anlatımından SONRA `quiz` (Bölüm 9.1 sırası).
- Her sekmeye konuya özel `video-scene` (api- önekli id). Zorunlu amiral filmler:
  "Middleware Zinciri" (C3), "Nest'in Pipe Hattı" (D3).
- Her grubun sonuna 1 Feynman checkpoint.

C6'da ve D5'te 3-framework karşılaştırma tablosunu (Spring Boot | Express | NestJS)
kur: Route tanımı, Body okuma, Validation, Hata yönetimi, DI satırları — plan
§4'teki iskeletle başla, satırları genişlet.
```

### D.2 — Faz 5: GRUP E (DevTools Network)

```
apiTestingData.js'te GRUP E (E1–E6) placeholder'larını tam içerikle değiştir.
Bu grup KODSUZ — GRUP A (kodsuz) şablonunu izle. Konu: tarayıcı DevTools
Network panelinde /api/v1/bugs isteklerini okumak ve defect yakalamak.

Her konu için:
- `simple-box` 4 katman (Network paneli neyin analojisi? Java'da bir
  HttpClient log'u/interceptor ile karşılaştır; QA bağlamı: "UI'da çalışıyor
  ama Network'te sessiz 500").
- Anlatım `text` + inline SVG diyagram (Network satırı/timing şeması — dış
  görsel YOK, Bölüm 8).
- Kodsuz sandbox: `code-playground` "seç/eşleştir/tamamla" modunda (ör. "bu
  timing değerlerine göre yavaşlık kimin suçu: sunucu mu ağ mı?" seçmeli;
  relatedTopicId). En az 1 sandbox/sekme.
- Animasyon: `step-animation` veya `simulation` (bir isteğin Network'te
  belirmesi, timing barının dolması).
- Amiral film (zorunlu): "Network Panelinde Bir Bug" (E5) — kullanıcı butona
  basar, sessiz 500 belirir, tester yakalar. Diğer sekmelere de konuya özel film.
- E5'te ≥5 defect senaryosu (sessiz 500, çift POST, N+1, response'ta sızan
  passwordHash, Cache-Control eksikliği) — her biri "hangi katmanda yakalanır".
- Quiz + grup sonu Feynman.
```

### D.3 — Faz 6: GRUP F (Swagger / OpenAPI)

```
apiTestingData.js'te GRUP F (F1–F6) placeholder'larını tam içerikle değiştir.
Konu: /api/v1/bugs'un OpenAPI/Swagger sözleşmesi ve contract defect'leri.
Kısmen kodsuz (spec/şema okuma) — GRUP A + gerektiğinde GRUP B şablonu.

Her konu için:
- `simple-box` 4 katman (OpenAPI = sözleşme; Java'da interface/JavaDoc
  analojisi; QA bağlamı: "doküman 200 diyor API 201 dönüyor").
- Spec/şema örnekleri `code` bloğu (YAML/JSON) — TR yorumlar Türkçe.
- Sandbox: `code-playground` "bu Swagger şemasından eksik test senaryosunu/
  required alanı tamamla" modu (relatedTopicId).
- Animasyon: `step-animation` (spec → Swagger UI → Try it out akışı).
- Amiral film (zorunlu): "Sözleşme Bozuldu" (F5) — doküman ile gerçek
  response'un ayrışma anı.
- F5'te contract defect'leri: doküman/gerçek uyumsuzluğu, enum drift, required
  yalanı — her biri "tester nasıl yakalar".
- F6: Swagger'dan test senaryosu checklist'i türetme (drag-and-drop `challenge`).
- Quiz + grup sonu Feynman.
```

### D.4 — Faz 7: GRUP G (Postman) + H (REST Assured) + I (Playwright)

```
apiTestingData.js'te GRUP G (G1–G6), H (H1–H6), I (I1–I5) placeholder'larını
tam içerikle değiştir. Aynı /api/v1/bugs'u sırayla Postman, REST Assured (Java),
Playwright (TS) ile test et. GRUP B (kodlu) şablonunu izle.

ÇAKIŞMA KURALI (ZORUNLU): /postman, /rest-assured, /bruno sayfalarındaki DERİN
araç anlatımını BURADA TEKRARLAMA. Bu gruplar "aynı endpoint'i şimdi bu araçla
test edelim" seviyesinde kalır; derin anlatım için o sayfalara iç link + not ver
("Postman'ın tüm detayı için → /postman"). Tekrarlanan içerik varsa sil, link koy.

Her konu için: simple-box (4 katman, Java analojisi), test kodu (`code`,
TR yorum Türkçe), kod-tabanlı trio (relatedTopicId), quiz.
Amiral filmler (zorunlu): "Zincirleme Test" (G4), "given/when/then" (H1),
"API ile Kur UI'da Doğrula" (I3). Diğer sekmelere konuya özel film.
I5: REST Assured ↔ Playwright karşılaştırması (Java geliştiricisi gözüyle).
Her grubun sonuna Feynman. Ayrıca /postman, /rest-assured sayfalarından BURAYA
"önce API'nin nasıl geliştirildiğini gör → /api-testing" linki eklenmeli
(SEO iç bağlantı + pedagojik akış, plan §5).
```

### D.5 — Faz 8: GRUP J (error-dictionary)

```
apiTestingData.js'te GRUP J placeholder'ını `error-dictionary` bloğu içeren tam
section ile değiştir. Minimum 12 GERÇEK hata (Bölüm 9): 415 Unsupported Media
Type, 400 vs 422, CORS preflight, ECONNREFUSED, 401 vs 403, trailing slash 404,
Content-Type eksikliğinden boş body, tarih formatı parse hatası, null vs alan
yokluğu, timeout, gzip/encoding, "Postman'de çalışıp otomasyonda düşen test".

Her hata: belirti + kök neden + codeWrong/codeFixed (TR yorum Türkçe) +
"tester hangi katmanda yakalar". error-dictionary bloğuna `relatedTopicId`
ZORUNLU. Bu sekme kodsuz olduğundan (Bölüm 9.5) sekmeye ELLE ≥1 video-scene
("Bir Hatanın Teşhis Sırası" gibi) + ≥1 animasyon + ≥1 sandbox ("bu hata
mesajına göre doğru katmanı seç") eklenmeli.
```

### D.6 — Faz 9: GRUP K (Mülakat)

```
apiTestingData.js'te GRUP K placeholder'ını `interview-questions` bloğu içeren
tam section ile değiştir. Minimum 50 soru (Bölüm 10): 15 Basic / 20 Intermediate
/ 15 Advanced. "X nedir?" YASAK — senaryo tabanlı zorunlu. Her cevap 3-6 cümle,
Java karşılaştırması içermeli, cevaplardaki kod TR yorumları Türkçe.
Kalite barı: "Swagger 200 diyor, API 201 dönüyor, geliştirici 'kod doğru,
doküman eski' diyor. Bunu bug olarak açar mısın? Neden?"

interview-questions bloğuna `relatedTopicId` ZORUNLU. Bu sekme quiz-gating (%60)
arkasında kalır — beklenen davranış (Bölüm 9.5). Sekmeye ELLE ≥1 video-scene
("Mülakat Katmanları: API vs UI Testi") + ≥1 animasyon + ≥1 sandbox eklenmeli.
Bitince Faz 10 (Opus) devralır: 9.5 denetimi + video-scene.spec.ts + NEXT_SESSION.
```

---

## B. Orijinal Prompt (kullanıcı tarafından verilen, referans)

# PROMPT — `/api-testing` Sayfası (API'yi Geliştiricinin Omzundan İzleyen Tester Yolculuğu)

> Bu promptu Claude Code / Antigravity / Windsurf oturumuna olduğu gibi yapıştır.

---

## 0. Oturum Protokolü (İşe Başlamadan Önce)

Kodlamaya başlamadan önce şu dosyaları oku ve bana **tek paragraflık** bir "anladım" özeti ver:

1. `CLAUDE.md` — anayasa (özellikle Bölüm 8, 9, 9.1, 9.3, 9.4, 9.5, 9.6, 10, 16, 17, 18, 19)
2. `.claude/NEXT_SESSION.md` — güncel durum
3. `.claude/CONTENT_RULES.md` — block formatları, KURAL 12
4. `.claude/UI_STANDARDS.md`, `.claude/COMPONENT_LIBRARY.md` — hazır bileşen envanteri
5. `.claude/INTERVIEW_TEMPLATE.md` — mülakat formatı
6. `src/data/gaugeData.js` ve `src/data/gitGithubData.js` — Bölüm 9.5 pilot referansı (`video-scene` şeması)
7. `src/data/pythonData.js` — Bölüm 9.2 referans uygulaması (playground + step-animation + drag-and-drop)
8. `src/data/postmanData.js`, `src/data/restAssuredData.js`, `src/data/brunoData.js` — **çakışma kontrolü için**

**Kodlamaya başlamadan önce onay al.** Etkilenecek dosyaların listesini ve sekme planını bana göster, "başla" demeden kod yazma (CLAUDE.md Bölüm 21 Analiz Protokolü).

---

## 1. Görev Tanımı

`/api-testing` route'unda yeni bir sayfa oluştur: **"API Testing — Geliştiriciden Test Otomasyonuna"**.

### Sayfanın çözdüğü problem

Hedef kullanıcı, hayatında hiç API görmemiş bir tester. Bugünkü sayfalar (`/postman`, `/rest-assured`, `/bruno`) ona **araçları** öğretiyor ama şu soruyu cevaplamıyor:

> "Bu endpoint nereden geldi? Geliştirici bunu yazarken ne düşündü? Kodun hangi satırı yanlış olursa hangi bug bana düşer?"

Bu sayfa o boşluğu kapatır. Öğretim mantığı: **testere önce API'yi kendi elleriyle yazdır, sonra test ettir.** Tester kutunun içini gördükten sonra kara kutu testi yapmaz — hedefli test yapar.

### Çakışma kuralı (ZORUNLU)

- `/postman`, `/rest-assured`, `/bruno` sayfalarındaki **derin araç anlatımını burada tekrarlama.** Bu sayfada o araçlar yalnızca "aynı endpoint'i şimdi bu araçla test edelim" seviyesinde, **yolculuğun bir durağı** olarak yer alır. Derin anlatım için ilgili sayfaya `relatedTopicId` / iç link ver.
- `/basit-backend` sayfası E-Ticaret SQL + Next.js API lab'ı anlatıyor. Bu sayfa **farklı bir domain** kullanmalı (aşağıdaki tek domain kuralına bak) ve DB kurulumuna girmemeli.

### Tek domain kuralı (ZORUNLU — sayfanın omurgası)

Sayfanın **tamamı boyunca tek bir örnek API** kullanılır ve terk edilmez:

**`/api/v1/bugs` — Bug Tracker API** (QA'in kendi dünyası; öğrenme yükü sıfır)

| Endpoint | Amaç |
|---|---|
| `GET /api/v1/bugs` | Liste + `?status=`, `?severity=`, `?page=`, `?size=` |
| `GET /api/v1/bugs/{id}` | Tek kayıt |
| `POST /api/v1/bugs` | Yeni bug (validation'ın gösterileceği yer) |
| `PUT /api/v1/bugs/{id}` | Tam güncelleme |
| `PATCH /api/v1/bugs/{id}/status` | Kısmi güncelleme (PUT/PATCH farkının gösterileceği yer) |
| `DELETE /api/v1/bugs/{id}` | Silme (idempotency'nin gösterileceği yer) |

Model: `id`, `title` (3-120 char, zorunlu), `severity` (enum: LOW/MEDIUM/HIGH/CRITICAL), `status` (enum: OPEN/IN_PROGRESS/CLOSED), `reporter` (email format), `createdAt` (ISO-8601).

**Aynı model, aynı endpoint'ler; Java'da, Express'te, NestJS'te, Swagger'da, Postman'de, REST Assured'da ve Playwright'ta baştan sona takip edilir.** Tester böylece "araç değişti, iş değişmedi" fikrini kavrar.

---

## 2. Sayfanın İmza Özelliği: "Defect Doğum Anı"

Bu sayfayı diğerlerinden ayıran şey budur, **atlanamaz**:

Geliştirme bölümlerinde (Bölüm 1-3) her kod bloğundan sonra bir **`simple-box`** (emoji: 🐞) gelir ve şunu yapar:

1. **Doğru kod** az önce yazıldı.
2. Kutu şunu sorar: *"Geliştirici bu satırda şunu unutsaydı ne olurdu?"*
3. **Doğan defect somut olarak yazılır** — hangi request, hangi beklenen, hangi gerçekleşen.
4. **Testerin o defect'i hangi katmanda yakalayacağı** söylenir (Network mi, Swagger contract mı, Postman assertion mı, REST Assured mı).

Örnek (kalite barı bu):

```
🐞 Defect Doğum Anı — @Valid unutulursa

Kod: public ResponseEntity<Bug> create(@RequestBody BugRequest req)
     → @Valid annotation'ı YOK.

Ne olur: POST /api/v1/bugs { "title": "" } isteği 400 Bad Request yerine
         201 Created döner ve veritabanına boş başlıklı bir bug yazılır.

Neden sinsi: UI'daki JavaScript zaten boş başlığı engelliyor. Manuel test
             PASS verir. Ama mobil uygulama veya Postman doğrudan API'ye
             vurduğunda kayıt açılır — production'da "boş bug" kirliliği.

Tester nerede yakalar: Postman'de UI'ı bypass edip boş title göndererek.
                       Bu, "UI valide ediyor" güveninin neden yanlış
                       olduğunun kanıtıdır.
```

Bu kutu **her geliştirme adımında** olacak. Toplamda en az **18 farklı Defect Doğum Anı** kutusu (Java 8, Express 5, NestJS 5).

---

## 3. Sekme Yapısı (Sol Dikey Sidebar — W3Schools Atomik Kuralı, Bölüm 16)

"Basit/Orta/İleri" gibi yapay kategori **YASAK**. Atomik başlıklar:

### GRUP A — Temeller (API'yi hiç görmemiş tester için)
- A1. API Nedir? — İstemci, Sunucu, Sözleşme
- A2. HTTP Request Anatomisi (method, URL, header, body)
- A3. HTTP Response Anatomisi (status, header, body)
- A4. HTTP Metotları: GET / POST / PUT / PATCH / DELETE
- A5. Status Kodları: 2xx / 3xx / 4xx / 5xx ve testerin yorumu
- A6. Header'lar: Content-Type, Accept, Authorization, Cache-Control
- A7. JSON Yapısı: object, array, nested, null vs eksik alan

### GRUP B — API'yi Java + Spring Boot ile Sıfırdan Yazmak
- B1. Proje İskeleti: Maven, `spring-boot-starter-web`, çalıştırma
- B2. Model/Entity: `Bug` sınıfı, enum'lar, alan tipleri
- B3. Repository Katmanı: in-memory `Map<Long, Bug>`
- B4. Service Katmanı: iş kuralları nerede yaşar
- B5. Controller: `@RestController`, `@GetMapping`, path variable, query param
- B6. POST + `@Valid`: Bean Validation (`@NotBlank`, `@Email`, `@Size`)
- B7. Exception Handling: `@RestControllerAdvice`, 404 vs 500 farkı
- B8. Status Kodu ve `ResponseEntity`: 200 mü 201 mi 204 mü?

### GRUP C — Aynı API'yi Express.js ile Yazmak
- C1. Kurulum: `npm init`, `express`, `nodemon`, ilk sunucu
- C2. Route Tanımı: `app.get`, `app.post`, `req.params`, `req.query`
- C3. Middleware Zinciri: `express.json()`, logger, sıra neden önemli
- C4. Validation: `express-validator` / `zod` ile aynı kuralları kurmak
- C5. Error Handling Middleware: 4 parametreli `(err, req, res, next)`
- C6. Java ↔ Express Karşılaştırma Tablosu (annotation vs middleware)

### GRUP D — Aynı API'yi NestJS ile Yazmak
- D1. Nest CLI ve Modül Mimarisi (`module` / `controller` / `service`)
- D2. Controller Decorator'ları: `@Get()`, `@Post()`, `@Param()`, `@Body()`
- D3. DTO + `class-validator` + `ValidationPipe`
- D4. Exception Filter ve `HttpException`
- D5. NestJS ↔ Spring Boot Karşılaştırması (DI container, decorator ≈ annotation)

### GRUP E — DevTools Network: Tarayıcıda API'yi Görmek
- E1. Network Paneli Anatomisi (sütunlar: Name, Status, Type, Size, Time)
- E2. Fetch/XHR Filtresi: gürültüyü ayıklamak
- E3. Bir İsteği Okumak: Headers / Payload / Preview / Response / Timing
- E4. Timing Sekmesi: TTFB, Waiting, Content Download — yavaşlık kimin suçu?
- E5. Network'ten Defect Yakalama (sessiz 500, çift POST, N+1 istek, response'ta sızan `passwordHash`, `Cache-Control` eksikliği)
- E6. Copy as cURL → Postman'e Import: köprüyü kurmak

### GRUP F — Swagger / OpenAPI
- F1. OpenAPI Spec Nedir? Sözleşme kavramı
- F2. Spring'de `springdoc-openapi`, NestJS'te `@nestjs/swagger` ile üretimi
- F3. Swagger UI'da "Try it out" — ilk elle testin
- F4. Schema Okuma: required, type, enum, example
- F5. **Contract Defect'leri:** doküman 200 diyor API 201 dönüyor; enum'a yeni değer eklenmiş dokümana yazılmamış; `required` alan aslında opsiyonel
- F6. Swagger'dan Test Senaryosu Türetmek (checklist üretimi)

### GRUP G — Postman ile Test
- G1. Collection ve Klasör Yapısı (endpoint'lere göre değil, akışa göre)
- G2. Environment + Variable: `{{baseUrl}}`, `{{bugId}}`
- G3. `pm.test` ile Assertion: status, body, schema, response time
- G4. Pre-request Script ve Test Zinciri (POST'tan gelen `id`'yi GET'e taşımak)
- G5. Negatif Test Setleri (boş title, geçersiz enum, olmayan id, yanlış tip)
- G6. Collection Runner + Newman ile CI'da koşmak
- *(Derin Postman anlatımı için `/postman` sayfasına yönlendir.)*

### GRUP H — REST Assured ile Otomasyon (Java)
- H1. Bağımlılıklar ve İlk Test: `given().when().then()`
- H2. Response Doğrulama: `statusCode`, `body(hasItem)`, `jsonPath`
- H3. POJO Serialization/Deserialization (`Bug` sınıfını tekrar kullanmak)
- H4. JSON Schema Validation ile contract testi
- H5. `RequestSpecification` ile tekrarı yok etmek (API için POM karşılığı)
- H6. JUnit 5/TestNG entegrasyonu + CI
- *(Derin anlatım için `/rest-assured` sayfasına yönlendir.)*

### GRUP I — Playwright ile API Testi (TypeScript)
- I1. `request` fixture ve `APIRequestContext`
- I2. `expect(response).toBeOK()` ve JSON assertion
- I3. **Hibrit Güç:** UI testinin setup'ını API ile kurmak (bug'ı API'yle yarat, UI'da doğrula)
- I4. `storageState` ile API üzerinden login olup UI testini hızlandırmak
- I5. REST Assured ↔ Playwright Karşılaştırması (Java geliştiricisi gözüyle)

### GRUP J — Yaygın Hatalar (`error-dictionary`, minimum 12 gerçek hata)
415 Unsupported Media Type, 400 vs 422 karışıklığı, CORS preflight hatası, `ECONNREFUSED`, 401 vs 403 farkı, trailing slash 404'ü, `Content-Type` eksikliğinden gelen boş body, tarih formatı parse hatası, `null` vs alan yokluğu, timeout, gzip/encoding sorunu, Postman'de çalışıp otomasyonda düşen test.

### GRUP K — Mülakat Soruları (minimum 50 — CLAUDE.md Bölüm 10)
15 Basic / 20 Intermediate / 15 Advanced. "X nedir?" **yasak**, senaryo tabanlı zorunlu. Örnek kalite barı: *"Swagger 200 diyor, API 201 dönüyor, geliştirici 'kod doğru, doküman eski' diyor. Bunu bug olarak açar mısın? Neden?"*

---

## 4. İçerik Kalite Kuralları (CLAUDE.md'ye Bağlı — Her Biri Zorunlu)

| Kural | Kaynak | Bu sayfada nasıl uygulanır |
|---|---|---|
| Her konunun **ilk bloğu `simple-box`** ve 4 katmanlı analoji | Bölüm 9, 9.3 | Somut analoji + düşündürücü "neden" sorusu + Java karşılaştırması + QA/iş bağlamı. Tek cümlelik benzetme YASAK. |
| Her sekmede **≥1 `video-scene` + ≥1 animasyon + ≥1 sandbox** | Bölüm 9.5 | Aşağıdaki film listesine bak. |
| Her kod bloğundan sonra **animasyon + drag-and-drop + practice** üçlüsü | Bölüm 9.1, 9.2 | `step-animation` + `challenge` (`variant: 'order-sort'`) + `code-playground` |
| **2-2-2-2 kuralı** | Bölüm 17 | Atomik konu başına 2 analoji, 2 akıl yürütme, 2 LEGO anlatımı, 2 quiz |
| **Feynman Checkpoint** | Bölüm 19 | Her GRUP'un sonunda 1 adet |
| **Yedek quiz sorusu** | Bölüm 18 | Yanlış cevapta alternatif soru |
| **Quiz asla ilk blok olamaz** | Bölüm 9.1 | Anlatım → animasyon → quiz sırası |
| **`relatedTopicId` zorunlu** | Bölüm 9.4 | `code-playground`, `interview-questions`, `error-dictionary` bloklarının hepsinde |
| **Bilingual `{tr, en}`** | Bölüm 8 | Tüm içerik; TR'de yorum satırları Türkçe, teknik terimler İngilizce |
| **TR kod yorumları Türkçe** | Bölüm 8, 9.4 | `starterCode`, `solutionCode`, `hint`, `codeWrong`, `codeFixed` dahil |
| **Java analojisi zorunlu** | Bölüm 15 | Express/NestJS/Playwright/TS anlatımlarının hepsinde |
| **Dış görsel yok** | Bölüm 8, 11 | Diyagramlar inline SVG / CSS-only |
| **Yeni component yazma** | Bölüm 5, 9.6 | Sadece `*Data.js`'e veri ekle |

### Zorunlu `video-scene` filmleri (her biri 5-8 sahne, `sceneDurationMs: 3400`, `xpReward` 10-15, benzersiz `id`)

1. **"Bir İsteğin Yolculuğu"** — tarayıcıdan Controller → Service → Repository → response'a dönüş (GRUP A)
2. **"@Valid Kapıda Duruyor"** — geçersiz payload'ın validation katmanında durdurulması vs durdurulmaması (GRUP B)
3. **"Middleware Zinciri"** — Express'te isteğin middleware'lerden sırayla geçişi, sıra bozulunca ne olur (GRUP C)
4. **"Nest'in Pipe Hattı"** — DTO → ValidationPipe → Controller → Exception Filter (GRUP D)
5. **"Network Panelinde Bir Bug"** — kullanıcı butona basar, Network'te sessiz 500 belirir, tester onu yakalar (GRUP E)
6. **"Sözleşme Bozuldu"** — Swagger doküman ile gerçek response'un ayrışma anı (GRUP F)
7. **"Zincirleme Test"** — POST'tan dönen id'nin Postman değişkenine yazılıp GET'e taşınması (GRUP G)
8. **"given / when / then"** — REST Assured cümlesinin üç parçasının çalışması (GRUP H)
9. **"API ile Kur, UI'da Doğrula"** — Playwright'ta hibrit setup akışı (GRUP I)

**Kritik:** Film, sekmenin gerçek içeriğine bağlı olmalı — konudan kopuk film uydurma (Bölüm 9.5). Veri dosyası **EN+TR ayrı ağaçlı mı tek ağaçlı mı** önce tespit et; ayrı ağaçlıysa film sabitini **iki ağaca da aynı referansla** koy.

### Zorunlu karşılaştırma tablosu

Her sayfada bir kez, üç framework yan yana:

| Konu | Spring Boot (Java) | Express.js | NestJS |
|---|---|---|---|
| Route tanımı | `@GetMapping("/bugs")` | `app.get('/bugs', ...)` | `@Get()` |
| Body okuma | `@RequestBody` | `req.body` + `express.json()` | `@Body()` |
| Validation | `@Valid` + Bean Validation | `express-validator` / `zod` | `ValidationPipe` + `class-validator` |
| Hata yönetimi | `@RestControllerAdvice` | error middleware | Exception Filter |
| DI | Spring IoC | manuel / factory | Nest IoC container |

(Tabloyu bu iskeletle başlat, satır sayısını genişlet.)

---

## 5. Teknik Uygulama Adımları

1. `src/data/apiTestingData.js` oluştur (mevcut en yakın data dosyasının yapısını taklit et — önce hangisinin yapısına uyacağını söyle).
2. `src/components/ApiTestingPage.jsx` — `TopicPage.jsx` kalıbını kullan, **sol dikey sidebar** (yatay tab bar YASAK).
3. `src/App.jsx` — route + `React.lazy` import.
4. `src/utils/seo.js` — `ROUTE_SEO` girişi. Hedef arama niyeti: *"API testing tutorial for QA engineers"*, *"API nasıl test edilir"*. Sadece araç adı değil, problem odaklı başlık (Bölüm 6).
5. `scripts/generate-static-routes.mjs` — statik fallback içeriği.
6. `tests/video-scene.spec.ts` — bu sayfa için en az 1 temsili render testi (Bölüm 9.5).
7. Ana sayfa/menü kartına ekle (mevcut kart kalıbını taklit et).

**Zorunlu:** `/postman`, `/rest-assured`, `/bruno` sayfalarına bu sayfadan iç link ver ve o sayfalardan da buraya "önce API'nin nasıl geliştirildiğini gör" linki ekle (SEO iç bağlantı + pedagojik akış).

---

## 6. Çalışma Düzeni — Faz Faz İlerle (Bölüm 13)

Tek seferde hepsini yazmaya çalışma. Her fazın sonunda **CLAUDE.md Bölüm 1.1'deki 4 maddelik checklist'i çalıştır** ve sonucu raporla, sonra bir sonraki faz için onay bekle.

- **Faz 0:** Analiz + sekme planı onayı (kod yok)
- **Faz 1:** İskelet — route, component, boş data dosyası, SEO, build yeşil
- **Faz 2:** GRUP A (Temeller) — tam içerik + film + animasyon + sandbox
- **Faz 3:** GRUP B (Java/Spring) — Defect Doğum Anı kutuları dahil
- **Faz 4:** GRUP C + D (Express + NestJS) + karşılaştırma tablosu
- **Faz 5:** GRUP E (DevTools Network)
- **Faz 6:** GRUP F (Swagger)
- **Faz 7:** GRUP G + H + I (Postman, REST Assured, Playwright)
- **Faz 8:** GRUP J (error-dictionary, 12 hata)
- **Faz 9:** GRUP K (50 mülakat sorusu)
- **Faz 10:** Bölüm 9.5 denetimi (her sekmede video+animasyon+sandbox var mı?), E2E testi, `NEXT_SESSION.md` güncellemesi

---

## 7. Her Faz Sonunda Zorunlu Rapor (CLAUDE.md Bölüm 1.1)

Şu 4 maddeyi **kendin çalıştırmadan** "tamamladım / hazır / bitti" yazma:

1. `node scripts/check-content-integrity.mjs` → sıfır ihlal mi?
2. Eklenen her `code-playground`/hint/practice bloğu gerçekten **bir önceki koda mı ait**? Tek tek doğrula.
3. TR bağlamda eklenen **tüm** yorum satırları (`#`, `//`, `/* */`) Türkçe mi? İngilizce kalan var mı?
4. `npm run build` hatasız mı?

Ek olarak bu sayfaya özel:

5. Her sekmede ≥1 `video-scene` + ≥1 animasyon + ≥1 sandbox var mı? (Bölüm 9.5)
6. Her `code-playground` / `interview-questions` / `error-dictionary` bloğunda `relatedTopicId` var mı? (Bölüm 9.4)
7. Her geliştirme adımında "Defect Doğum Anı" kutusu var mı? (toplam ≥18)
8. `/postman`, `/rest-assured`, `/bruno` içeriği burada tekrarlanmış mı? Tekrar varsa sil, link ver.

Emin olmadığın nokta varsa "tamamladım" yerine **"şunu kontrol etmen gerekebilir: ..."** yaz.

---

## 8. Başarı Ölçütü

Sayfa bittiğinde, API'yi hiç görmemiş bir tester bu sayfayı baştan sona okuduğunda şunları yapabilmeli:

- Bir endpoint'in kodda hangi katmandan geçtiğini çizebilmeli
- Geliştiricinin hangi satırı unutmasının hangi bug'ı doğuracağını tahmin edebilmeli
- DevTools Network'te bir isteği açıp status, header, payload ve timing'i yorumlayabilmeli
- Swagger dokümanına bakıp test senaryosu listesi çıkarabilmeli
- Aynı senaryoyu Postman, REST Assured ve Playwright'ta yazabilmeli
- Bir bug raporunda "UI'da çalışıyor ama API seviyesinde şu kırık" diyebilmeli
