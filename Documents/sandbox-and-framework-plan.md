# Sandbox Evrenselleştirme + Framework Mimarisi Modülü — Ortak Plan

> Bu dosya iki ayrı isteği tek plana bağlar: (1) her sekmede her konudan sonra
> sandbox/practice eklenmesi, (2) framework kurulması gereken sayfalara
> (Selenium, Playwright, Cypress, REST Assured, Appium, Gauge) SOLID/POM
> tabanlı mimari öğretim modülü eklenmesi. `CLAUDE.md` §0 kuralına göre bu
> dosya **kalıcı bir yayılım planıdır** (`video-sitewide-plan.md` ile aynı
> tür) — anlık durum takibi yine `.claude/NEXT_SESSION.md`'dedir, bu dosyada
> commit hash / "şu an ne yapıyoruz" bilgisi TUTULMAZ.

## 0. Süre Karşılaştırması — Hangisi Daha Kısa?

Kod tabanı taraması sonucu (2026-07-20):

| Kriter | 1) Sandbox Evrenselleştirme | 2) Framework Mimarisi Modülü |
|---|---|---|
| Dokunulacak sayfa sayısı | 30+ data dosyası (tüm site) | 6 sayfa (Selenium, Playwright, Cypress, REST Assured, Appium, Gauge) |
| Mevcut durum | Kısmi — örn. Selenium 129 `code` blokuna karşı 4 `code-playground`, Java 157 koda karşı 15, JavaScript/SQL'de neredeyse hiç yok | Sıfır — sitede hiçbir sayfada Adım1-5 tarzı mindmap+SOLID+POM mimari modülü yok, sadece dağınık tek cümlelik POM değinmeleri var |
| Yeni component gerekiyor mu | Hayır — `CodePlaygroundBlock`/`StepAnimationBlock`/`ChallengeBlock` hazır | Hayır — ASCII mindmap `code`(text) veya `simple-box` içinde, sınıf ilişkileri mevcut bloklarla anlatılabilir |
| İş karakteri | Mekanik, tekrarlı, ama hacim ÇOK büyük (yüzlerce eksik blok) | Yoğun tasarım/pedagoji gerektirir ama hacim küçük (6 sayfa × 5 adım) |
| Tahmini bitirilebilirlik | Uzun soluklu, sekans sekans ilerleyen kalıcı hedef (§9.2 zaten böyle tanımlıyor) | Kapsamı net, tek oturumda pilot + birkaç oturumda 6 sayfa tamamlanabilir |

**Sonuç:** Framework Mimarisi Modülü (madde 2) daha kısa sürede
**tamamlanmış** sayılabilir bir teslim olur (dar kapsam, yeni component yok).
Sandbox Evrenselleştirme (madde 1) ise CLAUDE.md §9.2'nin zaten tanımladığı
gibi kalıcı/kademeli bir hedeftir — bitmez, ilerletilir. Bu yüzden:

**Öneri:** Önce Faz A (Framework Mimarisi, pilot + 5 sayfa) bitirilir —
kısa, kendi içinde kapanan bir teslim. Ardından Faz B (Sandbox
Evrenselleştirme) sayfa sayfa, paralel Sonnet oturumlarıyla sürdürülür ve
`NEXT_SESSION.md`'de ilerleme yüzdesi takip edilir.

---

## 1. Faz A — Framework Mimarisi Modülü (SOLID + POM + Mindmap)

### 1.1 Kapsam ve Hedef Sayfalar

Kullanıcının verdiği referans prompt (Adım 1-5: Büyük Resim Mindmap → Core/Base
Katmanı → POM Katmanı → SOLID Uygulaması → Test/Data Katmanı) her hedef
sayfada o ARACIN GERÇEK API'sine göre uyarlanarak uygulanır — kopya-yapıştır
şablon DEĞİL, her sayfa kendi mekanizmasını yansıtmalı:

| Sayfa | Mimari örneği (o araca özgü) |
|---|---|
| `/selenium` | `BasePage` + `PageFactory` + `@FindBy` proxy mekanizması (gaugeData.js:2172'de zaten kısmen anlatılıyor, oradan referans alınabilir) |
| `/playwright` | Fixture tabanlı POM (`test.extend`), auto-waiting'in DI ile ilişkisi |
| `/cypress` | Command tabanlı POM + "App Actions" pattern'i ile klasik POM'un çatışması (cypressData.js:2138'de zaten karşıt görüş var — bu gerilim modülde ele alınmalı) |
| `/rest-assured` | `BaseTest`/`ConfigReader` + endpoint wrapper (API katmanında POM karşılığı, restAssuredData.js:3144'te taslağı var) |
| `/appium` | `BasePage` + WebDriver protokolü paylaşımı (appiumData.js:1021'de zemin var) |
| `/gauge` | Gauge'a özgü step implementation + POM (gaugeData.js zaten pilot, en olgun altyapıya sahip — İLK pilot burada yapılabilir) |

### 1.2 İçerik Şeması (her sayfada 5 adım, mevcut block tipleriyle)

Yeni component YAZILMAZ. Var olan bloklarla kurulur:

1. **Adım 1 — Büyük Resim Mindmap:** `simple-box` (§9.3'ün 4 katmanına uygun analoji) + ardından ASCII mindmap'i taşıyan `code` bloğu (`language: 'text'`, TR açıklama satırları ile).
2. **Adım 2 — Core/Base Katmanı:** `text` (neden ayrıldığı anlatımı) + `code` (BasePage/BaseTest iskeleti) + **zorunlu üçlü** (§9.1): `step-animation` + `challenge` (order-sort) + `code-playground`.
3. **Adım 3 — POM Katmanı:** aynı üçlü kalıp, sayfa class'ı örneği ile.
4. **Adım 4 — SOLID Uygulaması:** her prensip (SRP/OCP/LSP/ISP/DIP) için kısa `text` + o sayfanın API'sinden somut `code` örneği; `comparison` block ile Java karşılaştırması.
5. **Adım 5 — Test/Data Katmanı:** fixture/config ilişkisi, `code-playground` ile kapanış.
6. Her adımdan sonra 1 küçük `quiz` (konu anlatımından SONRA — §9.1 quiz sıralama kuralı).

Her `code-playground`/`interview-questions`/`error-dictionary` bloğuna
`relatedTopicId` ZORUNLU (§9.4). TR sayfalarda tüm yorumlar Türkçe (§8).

### 1.3 Pilot

**Gauge** sayfası pilot olarak seçildi çünkü mevcut içerikte (gaugeData.js)
POM/PageFactory anlatımı zaten en olgun durumda ve dosya zaten §9.5 video
pilotu (ek yük getirmiyor). Pilotu **Fable** baştan sona üretir, sonra kalan
5 sayfa için şablon/prompt olarak kullanılır.

---

## 2. Faz B — Sandbox Evrenselleştirme (Her Konudan Sonra Practice)

### 2.1 Kapsam

`CLAUDE.md` §9.1/§9.2 zaten bu hedefi tanımlıyor — Python referans sayfa.
Bu faz, aynı standardı geri kalan sayfalara yaymak. Öncelik sırası (mevcut
açığa göre, en büyük boşluktan başlanır):

| Öncelik | Sayfa | code/editor | playground | Açık |
|---|---|---|---|---|
| 1 | Selenium | 129 | 4 | çok yüksek |
| 2 | Java | 157 | 15 | çok yüksek |
| 3 | Playwright | 64 | 4 | çok yüksek |
| 4 | Cypress | 46 | 5 | yüksek |
| 5 | Kubernetes | 49 | 10 | yüksek |
| 6 | Backend | 52 | 0 | yüksek |
| 7 | JavaScript/SQL/TypeScript | 0 (farklı block adlandırması, ayrı doğrulama gerekir) | değişken | doğrulanmalı |

> Not: JavaScript/SQL/TypeScript dosyalarında `grep "type: 'code'"` sıfır
> çıktı verdi — bu muhtemelen farklı tırnak/quote stiliyle yazıldığı
> anlamına gelir, gerçek boşluk Sonnet oturumunda dosya açılıp doğrulanmalı.

### 2.2 Global Kısıt (Fable'ın merkezi koordine etmesi ZORUNLU)

`scripts/check-content-integrity.mjs` TÜM site genelinde hint/practice
metinlerinin %85'ten fazla benzemesini yasaklıyor. Birden fazla paralel
Sonnet oturumu birbirinden habersiz benzer ipucu yazarsa build kırılır. Bu
yüzden:
- Fable, her sayfaya özel bir "ipucu teması" belirler ve bunu ilgili Sonnet
  promptuna yazar (aşağıdaki tablo).
- Her Sonnet oturumu kendi dosyasını bitirdikten sonra
  `node scripts/check-content-integrity.mjs` çalıştırıp sıfır ihlal
  doğrulamadan "bitti" DEMEZ.

**Faz B ipucu teması ataması (dedup çakışmasını önlemek için Faz A §4.1'deki
temalardan KASITLI olarak farklı seçildi — aynı dosyada iki ayrı modül aynı
temayı paylaşırsa iç-dosya benzerlik riski doğar):**

| Sayfa | Faz B ipucu teması | Not |
|---|---|---|
| Selenium | Alert/frame/window handling + Actions class (drag&drop, hover) senaryoları | Faz A'nın locator/explicit-wait temasından KASITLI farklı |
| Java | Collections/OOP (Stream API, generics, inheritance) senaryoları | — |
| Playwright | Network interception (`page.route`) + trace/screenshot debugging senaryoları | Faz A'nın fixture/auto-waiting temasından KASITLI farklı |
| Cypress | `cy.intercept` ile stub/mock senaryoları | Faz A'nın command chain/App Actions temasından KASITLI farklı |
| Kubernetes | Pod/deployment troubleshooting (`kubectl describe`/`logs` okuma) senaryoları | — |
| Backend | Supabase RPC/Edge Function çağrı + hata yönetimi senaryoları | — |
| JavaScript | DOM event/async (Promise, callback) senaryoları | Block adlandırması önce doğrulanmalı (§2.1 not) |
| SQL | JOIN/aggregate/subquery senaryoları | Block adlandırması önce doğrulanmalı (§2.1 not) |
| TypeScript | Generic/type-narrowing/utility-type senaryoları | Block adlandırması önce doğrulanmalı (§2.1 not) |

---

## 3. Görev Dağılımı — Fable vs Sonnet

### 3.1 Fable tarafından yapılması gerekenler (yüksek yargı/tasarım gerektirir)

1. Faz A pilot sayfasının (**Gauge**) 5 adımlık mimari modülünü uçtan uca
   tasarlayıp yazmak — mindmap ASCII, SOLID→Gauge eşlemesi, örnek kod.
2. Faz A için kalan 5 sayfaya (Selenium, Playwright, Cypress, REST Assured,
   Appium) verilecek Sonnet promptlarını, o aracın GERÇEK API'sine göre
   teknik olarak doğru biçimde hazırlamak (aşağıda §4).
3. Faz B için her hedef sayfaya özel "ipucu teması" ataması ve dedup
   çakışmasını önleyecek merkezi liste.
4. Her iki fazda da Sonnet çıktısı geldikten sonra §1.1'deki 4 maddelik
   doğruluk checklist'ini (content-integrity, ipucu-konu bağı, TR yorum
   taraması, build) bizzat çalıştırıp onaylamak — bu adım devredilmez.
5. `NEXT_SESSION.md`'yi her oturum sonunda güncel tutmak (hangi sayfa/faz ne
   durumda).

### 3.2 Sonnet tarafından yapılması gerekenler (mekanik, şablon net)

1. Faz A: Fable'ın onayladığı Gauge pilotunu şablon alıp, kalan 5 sayfaya
   (Selenium, Playwright, Cypress, REST Assured, Appium) o aracın kendi
   API'sine uyarlanmış 5 adımlık mimari modülünü yazmak (prompt §4.1).
2. Faz B: Her data dosyasında `code`/`editor` bloklarının hemen ardında
   §9.1 üçlüsünün (step-animation + challenge + code-playground) eksik
   olduğu yerleri bulup tamamlamak (prompt §4.2), dosya bazlı ilerlemek.

---

## 4. Sonnet Promptları (kopyala-kullan)

### 4.0 Pilot Tamamlandı — Referans (Fable, Gauge)

`src/data/gaugeData.js` içine `sections` dizisinin JSON Locator Deposu (eski
index 4) ile Ekosistem & CI/CD (eski index 5, yeni index 6) arasına yeni bir
section eklendi: başlık `{ tr: '🏗️ Framework Mimarisi (SOLID + POM)', en:
'🏗️ Framework Architecture (SOLID + POM)' }`, `// ── 5: Framework Mimarisi
(SOLID + POM) ──` yorum etiketiyle. `trTabs`/`enTabs` dizilerine aynı
konuma yeni tab metni eklendi; sonraki `// ── N:` yorumları ve
`gaugeFeynmanDefs` içindeki `sectionIndex` değerleri (5→6, 6→7, 7→8)
kaydırıldı, yeni section için `sectionIndex: 5` ile bir Feynman checkpoint
eklendi.

**İçerik deseni (5 adım, hepsi gaugeData.js'in ZATEN kurduğu
`DriverFactory.getDriver()`/`LoginPage`/`ScenarioDataStore` sınıflarını
temel aldı, çelişen yeni isim İCAT EDİLMEDİ):**
1. Büyük Resim Mindmap — simple-box (4 katman) + `code`(language:'text')
   ASCII mindmap + 1 quiz.
2. Core/Base Katmanı — DriverFactory (ThreadLocal<WebDriver>, daha önce
   sayfada "Kurulum'da göreceğiz" denip hiç gösterilmemişti, ilk kez burada
   yazıldı) + BaseTest (@BeforeSuite/@BeforeScenario/@AfterSuite) + üçlü
   (step-animation + challenge order-sort + code-playground) + quiz.
3. POM Katmanı — BasePage (wait/click/type ortak metotları) + LoginPage
   artık `extends BasePage` (öncesinde @FindBy'ı doğrudan kullanıyordu) +
   üçlü + quiz.
4. SOLID Uygulaması — SRP/OCP/LSP/ISP/DIP için ayrı ayrı "İHLAL" + "UYGUN"
   kod çifti + `comparison` bloğu (columns: ['Anti-Pattern', 'SOLID
   Çözümü']) + 1 challenge(multiple-choice, senaryo→prensip eşleştirme) +
   1 code-playground(DIP) + quiz.
5. Test/Data Katmanı — CheckoutSteps: DriverFactory + Page sınıfları +
   `System.getProperty("base.url")` (env/ katmanına bağlı) +
   `ScenarioDataStore` hepsi tek sınıfta birleşiyor + code-playground + son
   senaryo-tabanlı quiz.

**Yapısal not (kritik, Sonnet ATLAMAMALI):** `gaugeData.js` ve
`restAssuredData.js` AYNI kalıbı kullanıyor (`const sections = [...]`
literal dizi + `// ── N: Başlık ──` yorum + `trTabs`/`enTabs` + `sectionIndex`
tabanlı Feynman dizisi) — bu ikisinde yukarıdaki kaydırma deseni birebir
uygulanır. `seleniumData.js`, `playwrightData.js`, `cypressData.js`,
`appiumData.js` FARKLI/daha büyük bir iç yapı kullanıyor (grep ile bu
dosyalarda `// ── N:` yorum deseni VE sectionIndex tabanlı Feynman dizisi
BULUNAMADI) — Sonnet bu 4 dosyada yeni sekmeyi eklemeden önce dosyanın
KENDİ section/tab/(varsa) checkpoint kaydını incelemeli, gaugeData'nın
literal yapısını körü körüne kopyalamamalıdır. Değişmeyen şey İÇERİK
deseni (yukarıdaki 5 adım + blok tipleri), değişen şey o dosyanın hangi
JS iskeletine oturduğudur.

### 4.1 Faz A — Framework Mimarisi Rollout Promptu (parametrik)

```
Sen QA Learning Platform projesinde çalışıyorsun (CLAUDE.md anayasa dosyasını
oku, özellikle §8, §9.1, §9.3, §9.4). Görevin: src/data/{{DOSYA}}.js
dosyasına yeni bir "Framework Mimarisi" alt-modülü eklemek.

Referans pilot: src/data/gaugeData.js içindeki "🏗️ Framework Mimarisi
(SOLID + POM)" bölümü (JSON Locator Deposu ile Ekosistem & CI/CD arasına
eklendi, `// ── 5: Framework Mimarisi (SOLID + POM) ──` yorumuyla işaretli)
— AYNI 5 adımlı yapıyı (Büyük Resim Mindmap → Core/Base Katmanı → POM
Katmanı → SOLID Uygulaması → Test/Data Katmanı) ve AYNI blok bileşimini
(bkz. §4.0 içerik deseni) kopyala AMA içeriği {{ARAÇ}}'ın kendi API'sine
göre yeniden yaz. Kopya-yapıştır şablon metni YASAK — her adım {{ARAÇ}}'a
özgü gerçek kod ve mekanizma içermeli.

ÖNCE {{DOSYA}}.js'in kendi iç yapısını incele (sections nasıl tanımlı,
trTabs/enTabs var mı, sectionIndex tabanlı bir Feynman/checkpoint dizisi
var mı) — gaugeData.js'in literal `// ── N:` yorum + sections dizisi
kalıbını KÖRÜ KÖRÜNE kopyalama, sadece restAssuredData.js bu kalıbı
paylaşıyor; diğer dosyalar farklı bir iç yapıya sahip olabilir. Yeni
sekmeyi mevcut yapıya uygun şekilde ekle; eğer dosyada sectionIndex tabanlı
bir referans dizisi varsa, yeni section'ı ARAYA soktuğun için ondan SONRAKİ
tüm sectionIndex değerlerini kaydırmayı UNUTMA (gaugeData.js pilotunda
5→6, 6→7, 7→8 kaydırıldı, örnek olarak bak).

Zorunlu kurallar:
- Her adım: simple-box (§9.3'ün 4 katmanı: somut analoji + düşündürücü
  "neden" sorusu + Java karşılaştırması + iş/QA bağlamı) + text + code +
  ardından step-animation + challenge(order-sort) + code-playground üçlüsü
  (§9.1). Quiz her zaman anlatımdan SONRA gelir, asla ilk blok olamaz.
- code-playground/interview-questions/error-dictionary bloklarında
  relatedTopicId ZORUNLU (§9.4).
- TR yorumlar Türkçe olmalı (§8) — plain string code bloğu kullanıyorsan
  TopicPage.jsx'teki englishToTurkishCodeComments dizisinde karşılığı
  olduğunu doğrula, yoksa ekle; ya da {tr,en} bilingual formatına çevir.
- İpucu teması: {{IPUCU_TEMASI}} — bu temaya bağlı kal, başka sayfalarda
  kullanılan ipucu metinlerini KOPYALAMA (check-content-integrity.mjs %85
  benzerlik eşiğini kırar). Gauge pilotunda kullanılan somut ipuçları
  (ThreadLocal.remove() sızıntısı, BasePage extends pratiği, DIP constructor
  injection, ScenarioDataStore put/get anahtar eşleşmesi) — bunlarla ayni
  veya cok benzer bir ipucu YAZMA, {{ARAÇ}}'a özgü YENİ bir senaryo bul.

Bitirmeden önce KENDİN çalıştır ve sıfır hata doğrula:
1. node scripts/check-content-integrity.mjs
2. npm run build
3. Eklediğin TÜM TR yorum satırlarını tek tek oku, İngilizce kalan var mı kontrol et.

Bunlardan biri bile geçmeden "tamamladım" deme; "şunu kontrol etmen
gerekebilir: ..." şeklinde raporla.
```

Parametre tablosu:

| {{DOSYA}} | {{ARAÇ}} | {{IPUCU_TEMASI}} | Dosya iskeleti |
|---|---|---|---|
| seleniumData | Selenium WebDriver | locator/explicit-wait senaryoları (Gauge'daki ThreadLocal/BasePage temalarıyla ÇAKIŞMAYAN, WebDriverWait/FluentWait odaklı somut senaryolar) | gaugeData'dan FARKLI iç yapı — önce incele |
| playwrightData | Playwright | fixture/auto-waiting senaryoları (`test.extend` tabanlı DI, Gauge'daki DriverFactory'den farklı bir mekanizma) | gaugeData'dan FARKLI iç yapı — önce incele |
| cypressData | Cypress | command chain/App Actions senaryoları (custom command tabanlı POM, klasik POM'la gerilimi §1.1 tablosunda not edildi) | gaugeData'dan FARKLI iç yapı — önce incele |
| restAssuredData | REST Assured | endpoint wrapper/request spec senaryoları (RequestSpecification/ResponseSpecification tabanlı, UI değil API katmanı) | gaugeData ile AYNI iskelet (`// ── N:` + sections + sectionIndex Feynman) — kaydırma deseni doğrudan uygulanabilir |
| appiumData | Appium | mobile locator/driver capability senaryoları (AppiumDriver capability injection, WebDriver'dan farklı bir DriverFactory varyantı) | gaugeData'dan FARKLI iç yapı — önce incele |

### 4.2 Faz B — Sandbox Boşluk Doldurma Promptu (parametrik)

```
Sen QA Learning Platform projesinde çalışıyorsun (CLAUDE.md §9.1, §9.2,
§9.4'ü oku). Görevin: src/data/{{DOSYA}}.js dosyasında, konu anlatan
type:'code' veya type:'editor' bloklarının hemen ardında §9.1'deki
interaktif öğretme üçlüsünün (step-animation + challenge(order-sort) +
code-playground) EKSİK olduğu yerleri bul ve tamamla.

Referans kalıp: src/data/pythonData.js — CodePlaygroundBlock/
StepAnimationBlock/ChallengeBlock component'leri hazır, YENİDEN YAZMA,
sadece veri ekle.

Zorunlu kurallar:
- Her code-playground'a relatedTopicId ekle (o bloğun hangi konu/kod
  bloğunun devamı olduğunu belirt) — §9.4.
- Aynı/benzer (>%85) hint/practice metnini başka topicId'lerde KULLANMA.
  İpucu teması bu dosya için: {{IPUCU_TEMASI}}.
- TR sayfa bağlamında TÜM yorum satırları (#, //, /* */, --) Türkçe olmalı;
  code-playground/error-dictionary/interview-questions alanları dahil.
- Dosyayı tek seferde bitirmeye çalışma, bölüm bölüm ilerle, her bölümden
  sonra aşağıdaki 4 kontrolü tekrarla.

Bitirmeden önce KENDİN çalıştır ve sıfır hata doğrula:
1. node scripts/check-content-integrity.mjs
2. TR yorum taraması (elle oku)
3. npm run build
4. Eklediğin her yeni bloğun bir önceki kod bloğuyla gerçekten ilişkili
   olduğunu (relatedTopicId doğru mu) kendi kendine sorgula.

Bunlardan biri bile geçmeden "tamamladım" deme.
```

Öncelik sırası: Selenium → Java → Playwright → Cypress → Kubernetes →
Backend → (JavaScript/SQL/TypeScript önce mevcut block adlandırması
doğrulanarak).

---

## 5. Branch ve İlerleme Takibi

- Branch: `feature/sandbox-and-framework-arch` (bu plan onaylandıktan sonra
  `main`'den açıldı).
- İlerleme yüzdesi ve "şu an hangi sayfa/adımdayız" bilgisi SADECE
  `.claude/NEXT_SESSION.md`'de tutulur, bu dosyada değil.
- Bu dosya `CLAUDE.md` §0 tablosuna eklenmelidir (video-rollout-plan.md /
  video-sitewide-plan.md ile aynı kategori: kalıcı yayılım planı referansı).
