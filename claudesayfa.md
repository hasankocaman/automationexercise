# CLAUDESAYFA.md — "Claude AI for Testers" Sayfası İş Planı

> **Bu dosya nedir:** `/claude-ai` route'unda yayınlanacak yeni öğrenme sayfasının
> ("Bir tester Claude yapay zekayı junior'dan senior'a nasıl kullanır") tasarım ve
> iş planı. `contentplan.md` / `fableplan.md` ile aynı format ve disiplindedir.
>
> **İş bölümü:** Her iş paketinin (CS = Claude Sayfası) başında UYGULAYICI yazar:
> - **FABLE** — mimari/etkileşimli bileşen gibi tasarım yoğun işler; Fable 5 uygular.
> - **SONNET** — tasarım kararları BU DOSYADA verilmiş, mekanik uygulanabilir
>   içerik paketleri; paketin sonundaki hazır prompt Sonnet'e verilir.
>
> **Okuma sırası:** Önce `CLAUDE.md` (anayasa), sonra `.claude/NEXT_SESSION.md`,
> sonra bu dosya. `CLAUDE.md` §1.1'deki 4 maddelik doğrulama checklist'i her CS
> paketi sonunda ZORUNLUDUR.

---

## Sayfanın Konumlandırması (tüm paketlerin hedefi)

**Tek cümle:** "YouTube'da 'AI ile test' videoları İZLERSİN; burada tarayıcından
çıkmadan kötü prompt yazarsın, simüle Claude'dan jenerik cevap alırsın, prompt'unu
4 bileşenle güçlendirirsin ve cevabın gözünün önünde nasıl profesyonelleştiğini
GÖRÜRSÜN — junior'dan senior'a her seviyede."

**Ana arama niyeti (SEO):** "Claude AI for QA testers / AI destekli test otomasyonu".
Problem odaklı alt başlıklar: prompt engineering for testers, AI test case
generation, Claude ile Playwright testi yazma, MCP browser automation.

**Hedef kullanıcı farkı:** Bu sayfa bir programlama dili öğretmiyor — bir İŞ AKIŞI
öğretiyor. Bu yüzden W3Schools müfredat birebirliği (§16 konu eksiksizliği) burada
"resmi Claude/Anthropic dokümantasyon başlıkları + gerçek QA iş akışları" olarak
yorumlanır; sekme atomikliği (§16 kural 2) aynen geçerlidir.

---

## Nihai Sekme Mimarisi (13 sekme — junior → senior sırası)

| # | Sekme | Seviye | Paket | Durum |
|---|-------|--------|-------|-------|
| 0 | 🎯 Giriş: AI Destekli Test | Junior | CS1 (FABLE) | ✅ bu oturumda yazıldı |
| 1 | ✍️ Prompt Mühendisliği | Junior | CS1 (FABLE) | ✅ bu oturumda yazıldı (Prompt Lab dahil) |
| 2 | ⚙️ Erişim & Kurulum | Junior | CS2 (SONNET) | ⬜ |
| 3 | 📋 Test Case Üretimi | Junior→Mid | CS2 (SONNET) | ⬜ |
| 4 | 🐛 Bug Analizi & Rapor | Mid | CS2 (SONNET) | ⬜ |
| 5 | 🧬 Test Verisi Üretimi | Mid | CS2 (SONNET) | ⬜ |
| 6 | 🤖 UI Otomasyonu: Selenium & Playwright | Mid | CS3 (SONNET) | ⬜ |
| 7 | 🔌 API Testinde Claude | Mid | CS3 (SONNET) | ⬜ |
| 8 | 💻 Claude Code: Terminalde Ajan | Mid→Senior | CS3 (SONNET) | ⬜ |
| 9 | 🔗 MCP (Model Context Protocol) | Senior | CS3 (SONNET) | ⬜ |
| 10 | 🏗️ CI/CD & Ekipte AI | Senior | CS4 (SONNET) | ⬜ |
| 11 | 🚨 Riskler & Yaygın Hatalar | Tümü | CS4 (SONNET) | ⬜ |
| 12 | 💼 Mülakat Soruları & Cevapları | Tümü | CS5 (SONNET) | ⬜ |

**Sekme ekleme kuralı:** Yeni sekmeler HER ZAMAN mevcut son sekmenin ARKASINA
eklenir (yukarıdaki sıra korunur). Sayfa, CS5 bitmeden **main'e merge edilmez /
prod'a çıkmaz** — bu sayede sekme index'leri kullanıcı localStorage'ına hiç eski
haliyle yazılmayacağından `progressMigration` mekanizmasına GEREK YOKTUR. Tüm CS
paketleri `feature/claude-ai-page` branch'inde birikir.

---

## Genel Kurallar (her CS paketi için geçerli)

1. **Bir oturumda bir paket.** Bitir, CLAUDE.md §1.1 checklist'ini koş, kullanıcı
   onayıyla commit et, `NEXT_SESSION.md`'ye işle.
2. Dosyalar: içerik SADECE `src/data/claudeAiData.js`'e yazılır (bilingual:
   `en.sections[i]` ↔ `tr.sections[i]` simetrik). Component'e dokunulmaz.
3. **Blok formatları** (mevcut emsaller):
   - `simple-box` → §9.3'ün 4 katmanı zorunlu (somut analoji + "neden" sorusu +
     Java karşılaştırması + QA/iş bağlamı). Her sekmenin İLK bloğu budur.
   - `quiz` → dil başına düz string (EN section'da EN, TR section'da TR),
     `retryQuestion` ZORUNLU (§18). Quiz asla anlatımdan önce gelemez (§9.1).
   - `challenge` (`variant: 'order-sort'`), `step-animation`, `code-playground`,
     `claude-prompt-lab` → bilingual-per-block (`{tr, en}` alanlar), her iki
     section'da AYNI const paylaşılır (jenkinsData'daki desen).
   - `code-playground` / `interview-questions` / `error-dictionary` →
     `relatedTopicId` ZORUNLU (§9.4, build kırar).
   - `code` blokları `{tr, en}` bilingual yazılır; TR versiyonda TÜM açıklama
     yorumları Türkçe (§8). Bu sayfada "kod" çoğunlukla PROMPT METNİdir — prompt
     örnekleri de TR sayfada Türkçe yazılır (İngilizce prompt varyantı EN
     section'da durur; "İngilizce prompt yazmak" konusu sekme 2'de ayrıca anlatılır).
4. **İnteraktif üçlü (§9.1):** Her atomik kod/prompt bloğunun ardında animasyon +
   drag-and-drop + practice'ten mümkün olanlar tekrarlanır. Bu sayfanın "practice"
   karşılığı çoğunlukla `code-playground` (prompt yeniden yazdırma, starter =
   zayıf prompt, solution = güçlü prompt) ve sekme 1'deki `claude-prompt-lab`'dır.
5. **Hint benzersizliği (§9.4):** `check-content-integrity.mjs` %85 benzer
   hint'leri yakalar — her code-playground hint'i o konuya ÖZGÜ yazılır.
6. **Model isimleri güncelliği:** İçerikte model adları geçecekse genel yaz
   ("Claude'un hızlı/küçük ve güçlü/büyük modelleri", "Claude Code CLI") —
   sürüm numarası sabitleme, sayfa çabuk eskir. Ürün adları (claude.ai, Claude
   Code, MCP, Anthropic API) aynen İngilizce kalır (§8 dil kuralı).
7. Her CS sonunda doğrulama: `node scripts/check-content-integrity.mjs` →
   `npm run build` → ilgili Playwright testleri → TR yorum taraması.

---

## CS1 — İskelet + Prompt Lab + İlk 2 Sekme
**UYGULAYICI: FABLE — ✅ BU OTURUMDA TAMAMLANDI**

Yapılanlar:
1. **Route iskeleti:** `src/App.jsx` (`/claude-ai` + lazy `ClaudeAiPage`),
   `src/utils/seo.js` (ROUTE_SEO girişi), `src/components/ClaudeAiPage.jsx`
   (TopicPage sarmalayıcı), `scripts/generate-static-routes.mjs` (`DATA_MODULES`
   girişi).
2. **`src/components/ClaudePromptLabBlock.jsx` (YENİ interaktif bileşen):**
   Sayfanın "sandbox"ı. Kullanıcı, ekranda verilen login user-story senaryosu
   için simüle Claude'a gerçek bir prompt yazar. Deterministik analizör 5
   bileşeni tespit eder (rol / bağlam / çıktı formatı / negatif-edge talebi /
   sayısal kısıt), tespit sayısına göre 3 kalite kademesinde simüle cevap üretir
   (jenerik → orta → profesyonel tablo), bileşen checklist'i ve skor göstergesi
   canlı güncellenir, 5 görev (mission) tamamlanır. `TopicPage.jsx`'e
   `claude-prompt-lab` block tipi kaydedildi.
3. **`src/data/claudeAiData.js`:** hero + 2 sekme (Giriş, Prompt Mühendisliği)
   EN+TR simetrik; §9.3 simple-box'lar, step-animation, order-sort, bilingual
   code blokları, code-playground (prompt rewrite), quiz+retryQuestion.
4. **`tests/claude-prompt-lab.spec.ts`:** zayıf prompt → düşük skor/jenerik cevap,
   güçlü prompt → 5/5 bileşen + görevlerin işlenmesi.

---

## CS2 — Junior Katmanı: Kurulum, Test Case, Bug, Test Verisi (sekme 2-5)
**UYGULAYICI: SONNET** — aşağıdaki hazır prompt ile.

Tasarım kararları (Sonnet değiştirmez):
- Sekme 2 ⚙️ Erişim & Kurulum: claude.ai web (ücretsiz/Pro farkı kavramsal),
  Claude Code CLI kurulumu (`npm install -g @anthropic-ai/claude-code`,
  Windows/macOS/Linux + beklenen çıktı + doğrulama komutu — §9 kurulum standardı),
  IDE eklentileri (VS Code/JetBrains) kavramsal, API key kavramı ve güvenliği
  (asla repo'ya koyma). "Prompt'u hangi dilde yazmalı?" alt konusu: TR/EN
  karşılaştırması, teknik terimlerin İngilizce kalmasının cevap kalitesine etkisi.
- Sekme 3 📋 Test Case Üretimi: user story + AC'den test case çıkartma; eksik
  AC'leri Claude'a SORDURTMA tekniği ("önce belirsizlikleri listele, sonra test
  yaz"); Gherkin formatında üretim; üretilen case'lerin gözden geçirme disiplini
  (oracle problemi — doğruluk ölçütü sende).
- Sekme 4 🐛 Bug Analizi & Rapor: stack trace / console log yapıştırıp kök neden
  hipotezi isteme; flaky test log analizi; profesyonel bug raporu yazdırma
  (severity/priority önerisiyle); "log'daki hassas veriyi (PII, token) TEMİZLEmeden
  yapıştırma" güvenlik uyarısı.
- Sekme 5 🧬 Test Verisi Üretimi: sınır değerleri + equivalence partitioning
  verisi ürettirme; gerçekçi sahte veri (isim/IBAN/TC benzeri format) üretimi ve
  GERÇEK kişisel veri kullanmama kuralı; JSON/CSV/SQL INSERT formatlarında çıktı;
  Java Faker kütüphanesiyle karşılaştırma (ne zaman Faker, ne zaman LLM).
- Her sekme: 1 §9.3 simple-box (İLK blok) + en az 1 step-animation + en az 1
  order-sort + en az 1 code-playground (starter=zayıf prompt, solution=güçlü
  prompt, relatedTopicId + benzersiz hint) + sekme sonunda 1 quiz+retryQuestion.
- Sekme 1'deki Prompt Lab'a çapraz referans vermek isteyen yerlerde `callout`
  bloğu kullanılır (yeni lab yazılmaz).

**SONNET PROMPTU (CS2):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra claudesayfa.md'yi (bu plan) oku.
feature/claude-ai-page branch'inde olduğunu doğrula (değilsen aç/geç).

GÖREV — CS2: src/data/claudeAiData.js dosyasına 4 yeni sekme ekle (mevcut 2
sekmenin ARKASINA, hem en hem tr tarafında simetrik olarak):
  2: '⚙️ Erişim & Kurulum' / '⚙️ Access & Setup'
  3: '📋 Test Case Üretimi' / '📋 Test Case Generation'
  4: '🐛 Bug Analizi & Rapor' / '🐛 Bug Analysis & Reporting'
  5: '🧬 Test Verisi Üretimi' / '🧬 Test Data Generation'
İçerik kapsamı ve konu sınırları claudesayfa.md CS2 bölümünde YAZILI — dışına
çıkma, konu ekleme/çıkarma yapma.

ZORUNLU FORMAT KURALLARI:
1. Her sekmenin İLK bloğu simple-box ve CLAUDE.md §9.3'ün 4 katmanını taşımalı
   (somut mekanizma analojisi + düşündürücü "neden" sorusu + Java karşılaştırması
   + QA/iş bağlamı). Tek cümlelik analoji YETERSİZDİR. Kalite barı:
   src/data/claudeAiData.js'teki mevcut 2 sekmenin simple-box'ları.
2. Her sekmede: ≥1 step-animation, ≥1 challenge(variant:'order-sort'),
   ≥1 code-playground, sekme sonunda 1 quiz + retryQuestion (§18).
   step-animation/challenge/code-playground/callout blokları bilingual-per-block
   yazılır ve const olarak tanımlanıp en+tr section'larda paylaşılır (dosyadaki
   mevcut desen). quiz ve text/simple-box/heading dil başına ayrı yazılır.
3. Her code-playground'da relatedTopicId + id + benzersiz hint zorunlu
   (check-content-integrity.mjs %85 benzer hint'i ve eksik relatedTopicId'yi
   build kırarak reddeder).
4. code blokları {tr, en} bilingual; TR tarafta TÜM yorum ve prompt açıklamaları
   Türkçe (§8). Terminal çıktısı satırları İngilizce kalabilir. Kurulum
   sekmesinde her komuttan sonra "beklenen çıktı" + doğrulama komutu göster (§9).
5. Quiz asla sekmenin ilk bloklarında olmaz — anlatım bittikten sonra (§9.1).
6. EN section'a Türkçe karakter sızdırma (ğüşıöç) — i18n testi bunu yakalar.
7. Model sürüm numarası yazma; "Claude'un hızlı/güçlü modelleri" gibi genel ifade
   kullan. claude.ai, Claude Code, MCP, API gibi ürün/terim adları İngilizce kalır.

BİTİRME KRİTERİ (CLAUDE.md §1.1 — hepsini KENDİN koş, biri bile geçmeden
"tamamlandı" deme):
  a) node scripts/check-content-integrity.mjs → 0 ihlal
  b) npm run build → PASS
  c) npx playwright test tests/claude-prompt-lab.spec.ts → PASS (regresyon)
  d) Eklediğin TÜM TR yorum/metinleri tek tek tekrar oku, İngilizce kalan
     açıklama cümlesi olmadığını doğrula.
Bitince .claude/NEXT_SESSION.md'ye CS2 bölümü ekle (değişen dosyalar + doğrulama
sonuçları + "commit kullanıcı onayı bekliyor" notu). Commit ATMA — kullanıcı
onayı iste.
```

---

## CS3 — Mid/Senior Katmanı: UI Otomasyon, API, Claude Code, MCP (sekme 6-9)
**UYGULAYICI: SONNET** — aşağıdaki hazır prompt ile.

Tasarım kararları:
- Sekme 6 🤖 UI Otomasyonu: HTML snippet'ten locator ürettirme (kırılgan XPath
  yerine data-testid önerisi); Page Object Model iskeleti ürettirme (Java
  Selenium + TS Playwright yan yana — sayfanın Java analojisi kuralı burada
  birebir kod karşılaştırmasına döner); mevcut kırık testi Claude'a düzelttirme
  akışı; "üretilen locator'ı çalıştırmadan güvenme" disiplini.
- Sekme 7 🔌 API Testinde Claude: OpenAPI/endpoint tanımından test senaryosu
  ürettirme; REST Assured (Java) + Postman/Bruno test script'i ürettirme;
  response JSON'ını yapıştırıp assertion önerisi alma; hatalı status code
  senaryolarını (4xx/5xx) sordurma.
- Sekme 8 💻 Claude Code: CLI'ın ajan yapısı (dosya okur, test koşar, düzeltir,
  tekrar koşar); CLAUDE.md proje anayasası kavramı (bu projenin KENDİSİ örnek
  gösterilir — meta ama somut); izin modları ve güvenli kullanım; "testi koş,
  hatayı oku, düzelt" döngüsünün terminal kaydı örneği; komut örnekleri:
  claude "flaky testleri bul", claude -p "..." headless kullanım.
- Sekme 9 🔗 MCP: MCP'nin ne olduğu (araçlara USB-C analojisi resmi dokümanda da
  var — kendi §9.3 analojini yaz, kopyalama); Playwright MCP ile Claude'un
  tarayıcıyı GERÇEKTEN sürmesi; DB MCP ile test verisi doğrulama; güvenlik
  sınırları (hangi MCP server'a ne yetki). mcp add komut örnekleri kavramsal.
- Etkileşim yoğunluğu CS2 ile aynı zorunluluklar. Sekme 8-9'da step-animation'lar
  "Claude Code'un döngüsü" ve "MCP istek akışı"nı adım adım göstermeli.

**SONNET PROMPTU (CS3):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra claudesayfa.md'yi oku.
feature/claude-ai-page branch'inde olduğunu ve CS2'nin bitmiş olduğunu doğrula
(sekme 2-5 claudeAiData.js'te mevcut olmalı; değilse DUR ve kullanıcıya bildir).

GÖREV — CS3: src/data/claudeAiData.js'e 4 yeni sekme ekle (mevcutların ARKASINA,
en+tr simetrik):
  6: '🤖 UI Otomasyonu: Selenium & Playwright' / '🤖 UI Automation: Selenium & Playwright'
  7: '🔌 API Testinde Claude' / '🔌 Claude for API Testing'
  8: '💻 Claude Code: Terminalde Ajan' / '💻 Claude Code: Agent in the Terminal'
  9: '🔗 MCP (Model Context Protocol)' / '🔗 MCP (Model Context Protocol)'
Konu kapsamı claudesayfa.md CS3 bölümünde yazılı — dışına çıkma.

ZORUNLU FORMAT KURALLARI: CS2 promptundaki 7 maddenin AYNISI geçerli (claudesayfa.md
CS2 bölümünden oku ve uygula). Ek olarak:
- Sekme 6'da Java Selenium ve TypeScript Playwright kodu YAN YANA verilecekse
  comparison veya iki ayrı code bloğu kullan; TR tarafta yorumlar Türkçe.
- Sekme 8'de bu projenin kendi CLAUDE.md'sini örnek olarak ANLAT ama dosya
  içeriğini kopyalama; 5-10 satırlık temsili mini örnek yaz.
- MCP sekmesinde spesifik üçüncü parti server adı/sürümü sabitleme; "Playwright
  MCP", "veritabanı MCP server'ı" gibi jenerik anlatım kullan.

BİTİRME KRİTERİ: CS2 promptundaki a-b-c-d maddelerinin aynısı. Bitince
NEXT_SESSION.md'ye CS3 bölümü ekle, commit ATMA, kullanıcı onayı iste.
```

---

## CS4 — Senior Katmanı: CI/CD & Ekip + Riskler/Hatalar (sekme 10-11)
**UYGULAYICI: SONNET** — aşağıdaki hazır prompt ile.

Tasarım kararları:
- Sekme 10 🏗️ CI/CD & Ekipte AI: PR review'da Claude (GitHub Actions ile otomatik
  inceleme kavramı); commit/PR açıklaması ürettirme; test raporu özetletme;
  ekip prompt kütüphanesi kurma (tekrar kullanılabilir prompt şablonları =
  Java'daki utility sınıfı analojisi); junior'ları AI çıktısını körü körüne
  merge etmekten koruyan ekip kuralları (senior sorumluluğu).
- Sekme 11 🚨 Riskler & Yaygın Hatalar: halüsinasyon (var olmayan API/metod
  uydurma) ve yakalama teknikleri; gizlilik (müşteri verisi/credential'ı prompt'a
  yapıştırmama); telif ve şirket politikası; aşırı bağımlılık (beceri erimesi);
  `error-dictionary` bloğu ile MINIMUM 8 gerçek hata senaryosu — örnekler:
  "Claude var olmayan bir Selenium metodu önerdi", "üretilen XPath ilk DOM
  değişiminde kırıldı", "AI'ın yazdığı assertion her zaman true dönüyordu
  (sahte PASS)", "prompt'a yapıştırılan log'da API token vardı", "üretilen test
  verisi gerçek TC kimlik numarası formatında ve GEÇERLİ çıktı", "Claude eski
  kütüphane sürümünün syntax'ını kullandı", "uzun konuşmada bağlam kaybolup
  önceki kararlar unutuldu", "AI çıktısı code review'suz merge edildi".
  error-dictionary'de relatedTopicId zorunlu; codeWrong/codeFixed alanlarındaki
  TR yorumlar Türkçe.
- Etkileşim zorunlulukları CS2 ile aynı.

**SONNET PROMPTU (CS4):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra claudesayfa.md'yi oku.
feature/claude-ai-page branch'inde olduğunu ve CS3'ün bitmiş olduğunu doğrula
(sekme 6-9 mevcut olmalı; değilse DUR ve kullanıcıya bildir).

GÖREV — CS4: src/data/claudeAiData.js'e 2 yeni sekme ekle (en+tr simetrik):
  10: '🏗️ CI/CD & Ekipte AI' / '🏗️ CI/CD & AI in the Team'
  11: '🚨 Riskler & Yaygın Hatalar' / '🚨 Risks & Common Mistakes'
Konu kapsamı ve 8 hata senaryosu listesi claudesayfa.md CS4 bölümünde yazılı.

ZORUNLU FORMAT KURALLARI: CS2 promptundaki 7 madde aynen geçerli. Ek olarak:
- Sekme 11'de error-dictionary bloğu ≥8 senaryo, relatedTopicId zorunlu,
  codeWrong/codeFixed TR yorumları Türkçe.
- Risk anlatımı korkutma tonunda DEĞİL, "senior böyle korunur" tonunda yazılır;
  her riskin yanında somut korunma tekniği verilir.

BİTİRME KRİTERİ: CS2 promptundaki a-b-c-d maddeleri. Bitince NEXT_SESSION.md'ye
CS4 bölümü ekle, commit ATMA, kullanıcı onayı iste.
```

---

## CS5 — Mülakat Sekmesi (50 soru) + Denetim/Test Entegrasyonu + Yayın Hazırlığı
**UYGULAYICI: SONNET** — aşağıdaki hazır prompt ile. **Kullanıcı onayı: merge/push kararı kullanıcının.**

Tasarım kararları:
- Sekme 12 💼 Mülakat: `interview-questions` bloğu, CLAUDE.md §10 dağılımı
  (15 basic / 20 intermediate / 15 advanced, toplam ≥50). Salt tanım sorusu yasak;
  senaryo tabanlı ("Junior'ın Claude'a yazdırdığı test PR'ında X gördün, ne
  yaparsın?"). Her cevap 3-6 cümle + yerinde Java/klasik-otomasyon karşılaştırması.
  relatedTopicId zorunlu.
- `scripts/audit-interview-questions.mjs` PAGES listesine
  `{ route: '/claude-ai', file: 'claudeAiData.js', exportName: 'claudeAiData' }`
  eklenir (50 soru denetimi build'de otomatik koşmaya başlar).
- Test route listeleri güncellenir: `tests/topic-pages-ui.spec.ts` ve
  `tests/i18n-content-toggle.spec.ts` route dizilerine `/claude-ai` eklenir.
  (`/basit-backend`, `/security`, `/backend` istisnaları §22.1 — bu sayfa istisna
  DEĞİLDİR, tüm suite'lere girer.)
- Mülakat gating (%60) ve rozet (%80) mekanizmaları TopicPage'den otomatik gelir —
  ekstra kod gerekmez; sadece sekmede yeterli quiz olduğu için gating'in kilitli
  başladığı spot-check ile doğrulanır (§22 kontrol 2).

**SONNET PROMPTU (CS5):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi
(özellikle §10 ve §22), sonra .claude/NEXT_SESSION.md'yi, sonra claudesayfa.md'yi
oku. feature/claude-ai-page branch'inde olduğunu ve CS4'ün bitmiş olduğunu
doğrula (sekme 0-11 mevcut; değilse DUR ve kullanıcıya bildir).

GÖREV — CS5 (3 parça):
1. src/data/claudeAiData.js'e son sekmeyi ekle (en+tr simetrik):
   12: '💼 Mülakat Soruları & Cevapları' / '💼 Interview Q&A'
   interview-questions bloğu: ≥50 soru (15 basic / 20 intermediate / 15 advanced),
   relatedTopicId zorunlu, salt tanım sorusu YASAK (senaryo tabanlı), her cevap
   3-6 cümle + Java/klasik-otomasyon karşılaştırması. Konu dağılımı: sayfanın 12
   sekmesinin TAMAMINDAN soru gelsin (prompt mühendisliği, test case üretimi,
   halüsinasyon yakalama, MCP güvenliği, CI'da AI, gizlilik...).
2. scripts/audit-interview-questions.mjs PAGES listesine
   { route: '/claude-ai', file: 'claudeAiData.js', exportName: 'claudeAiData' }
   satırını ekle.
3. tests/topic-pages-ui.spec.ts ve tests/i18n-content-toggle.spec.ts içindeki
   route dizilerine '/claude-ai' ekle.

ZORUNLU FORMAT KURALLARI: CS2 promptundaki 7 madde aynen geçerli (TR cevap
metinleri Türkçe, teknik terimler İngilizce; EN section'a Türkçe karakter yok).

BİTİRME KRİTERİ (hepsi):
  a) node scripts/check-content-integrity.mjs → 0 ihlal
  b) npm run audit:interview-questions → /claude-ai ✅ OK (≥50, dağılım tamam)
  c) npm run build → PASS
  d) npx playwright test tests/topic-pages-ui.spec.ts -g claude-ai → PASS
  e) npx playwright test tests/i18n-content-toggle.spec.ts -g claude-ai → PASS
  f) npx playwright test tests/claude-prompt-lab.spec.ts → PASS
  g) Mülakat gating spot-check: /claude-ai'de quiz'ler 0% iken Mülakat
     sekmesinin kilitli (🔒) göründüğünü doğrula (§22 kontrol 2 deseni).
Bitince NEXT_SESSION.md'ye CS5 bölümü ekle ("sayfa main'e merge'e hazır" notu
dahil), commit ATMA, kullanıcı onayı iste. Merge/push kararı kullanıcınındır.
```

---

## Kapsam Dışı (bilinçli kararlar)

- **Gerçek Claude API çağrısı yapılmaz** — sayfadaki tüm "Claude cevapları"
  deterministik simülasyondur (maliyet, API key, rate limit ve çevrimdışı çalışma
  nedenleriyle). Gerçek AI deneyimi isteyen kullanıcı zaten `/qa-assistant`
  sayfasına yönlendirilir (callout ile).
- **Prompt Lab serbest metin analizi keyword tabanlıdır** — NLP değil. Bu bilinçli:
  deterministik, test edilebilir, çevrimdışı. Sınırı sayfada kullanıcıya da
  söylenir ("bu bir simülasyon").
- **ChatGPT/Gemini karşılaştırma sekmesi yok** — sayfa araç savaşına girmez;
  öğretilen prompt/iş akışı becerileri araçtan bağımsız zaten transfer edilir
  (bir text bloğunda tek paragraf olarak söylenir, ayrı sekme açılmaz).
- **`/claude-ai` sayfası Claude Code'un TÜM özellik dokümantasyonunu kopyalamaz** —
  hedef "tester'ın iş akışı", referans dokümantasyon değil.
