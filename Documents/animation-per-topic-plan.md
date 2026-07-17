# Animation-Per-Topic Plan — Her Öğretilen Konuya Animasyon (Katman 2)

> **Branch:** `feature/animation-per-topic`
> **Amaç:** CLAUDE.md §9.1'deki "her atomik kod bloğunun ardına animasyon"
> kuralını proje genelinde fiilen %100'e taşımak. §9.5 standardı (sekme başına
> ≥1 video + ≥1 animasyon + ≥1 sandbox) `video-sitewide-plan.md` ile
> tamamlandı; bu plan onun bir üst çözünürlüğü: **sekme başına değil, kod
> bloğu (öğretilen atomik konu) başına ≥1 animasyon.**
>
> Bu dosya planın KALICI referansıdır. Hangi dalganın o an tamamlandığı
> `.claude/NEXT_SESSION.md`'de takip edilir (CLAUDE.md Bölüm 0 kuralı).

---

## 1. Neden Bu Plan? (Mevcut Durumun Kanıtı)

Görsel öğrenme bu projenin temel misyonudur (CLAUDE.md §15: "Görsel +
animasyon önceliklidir — metin secondary"). Mevcut denetim aracı
`audit-interactive.mjs` yalnızca **sekme başına ≥1** animasyon kontrolü
yapar ve bu seviyede proje ~%100 durumda. Ancak kod bloğu seviyesinde
ölçüldüğünde tablo farklı:

**Ölçüm (2026-07-17, `node scripts/audit-animation-coverage.mjs`):**

- Proje geneli: **551 kod bloğu → 487 animasyon → 233 sekme-içi açık**
- `fillMissingCodeTrios` otomatik doldurucusu bu açığı KAPATAMAZ — tasarımı
  gereği (a) section başına aynı profilden en fazla 1 step-animation ekler,
  (b) bash/shell/powershell/text dilindeki kod bloklarını tamamen atlar.
  Yani kalan 233 açık, **elle yazılması gereken, konuya özgü içerik işidir.**

### 1.1 Sayfa Envanteri (açığa göre sıralı)

| Sayfa | Kod bloğu | Animasyon | Açık | Kapsam |
|---|---|---|---|---|
| selenium | 49 | 16 | **36** | %33 |
| java | 49 | 33 | **23** | %67 |
| python ⚠️applyTr | 50 | 41 | **17** | %82 |
| kubernetes | 27 | 13 | **17** | %48 |
| kafka | 23 | 9 | **17** | %39 |
| restassured | 23 | 12 | **14** | %52 |
| appium | 20 | 9 | **14** | %45 |
| jmeter | 18 | 7 | **13** | %39 |
| docker | 24 | 19 | **11** | %79 |
| postman | 14 | 8 | **10** | %57 |
| playwright | 25 | 23 | 7 | %92 |
| sql | 30 | 33 | 7 | %100* |
| azure | 10 | 7 | 7 | %70 |
| linux | 15 | 16 | 6 | %100* |
| aws | 10 | 7 | 6 | %70 |
| javascript | 21 | 31 | 5 | %100* |
| browserstack | 12 | 9 | 5 | %75 |
| claude-ai | 15 | 16 | 5 | %100* |
| git | 24 | 45 | 3 | %100* |
| bruno | 7 | 9 | 3 | %100* |
| llm-agents | 13 | 18 | 3 | %100* |
| jenkins | 12 | 15 | 2 | %100* |
| cypress | 23 | 31 | 2 | %100* |
| typescript | 35 | 54 | 0 | %100 ✓ |
| what-is-testing | 2 | 6 | 0 | %100 ✓ |

`*` Sayfa toplamında animasyon ≥ kod olsa da bazı SEKMELERDE hâlâ açık var
(animasyonlar sekmeler arasında dengesiz dağılmış). Açık her zaman sekme
içinde ölçülür: `deficit = max(0, sekmedeki kod − sekmedeki animasyon)`.

Sekme-sekme güncel açık listesi her zaman şu komuttan alınır (bu tabloyu
elle güncelleme, komutu çalıştır):

```bash
npm run audit:animation:missing            # tüm sayfalar, sadece açıklı sekmeler
node scripts/audit-animation-coverage.mjs selenium --missing   # tek sayfa
node scripts/audit-animation-coverage.mjs --json               # dalga planlama için
```

### 1.2 İlişkili ama ayrı iş: 18 eksik order-sort

`npm run audit:interactive` 18 sekmede eksik `order-sort` (drag-and-drop)
raporluyor (Postman 4, JMeter 5, Git 3, Java 1, JavaScript 1, Docker 1,
Selenium 1, Bruno 1, Linux 1). Bu animasyon değil ama §9.1 üçlüsünün
parçası — bu planın **Dalga B**'sinde Haiku'ya atanmıştır (bkz. §3).

---

## 2. Kurallar (Bağlayıcı — Her Dalgada Geçerli)

1. **Animasyon tanımı** (CLAUDE.md §9.5 ile aynı): `step-animation` |
   `simulation` | `animated-timeline` | `css-animation`. Varsayılan tercih
   **`step-animation`**dır (saf veri, JSX gerektirmez, en ucuz ve en tutarlı).
2. **İçerik bağı zorunlu:** Animasyon, hemen ÜSTÜNDEKİ kod bloğunun anlattığı
   mekanizmayı adım adım görselleştirmeli — konudan kopuk jenerik animasyon
   yazılamaz (§9.5'teki film kuralının animasyon karşılığı).
3. **Yerleşim:** İlgili kod bloğunun hemen ARDINA; quiz/challenge'dan ÖNCE
   (§9.1). Aynı sekmede birden çok açık varsa her animasyon kendi kod
   bloğunun peşine gider — hepsi sekme sonuna yığılmaz.
4. **Bilingual zorunlu:** `title` ve her `steps[]` girdisi `{tr, en}` objesi.
   TR metinlerde açıklama Türkçe, teknik terimler İngilizce kalır (CLAUDE.md
   §8); animasyon adımlarında kod parçası geçiyorsa TR yorumlar Türkçe.
5. **Çift ağaç kuralı:** EN+TR ayrı `sections` ağacı olan veri dosyalarında
   (örn. `kafkaData.js`, `dockerData.js`) animasyon sabiti dosya başında
   tanımlanır ve **iki ağaca da aynı referansla** konur. Tek ağaçlı
   (bilingual field) dosyalarda yalnızca bir yere. İşe başlamadan dosyanın
   yapısı tespit edilir (§9.5 ile aynı kural).
6. **Component YAZILMAZ:** `StepAnimationBlock`, `CssAnimationBlock`,
   `InteractiveDiagramBlock` vb. hazırdır — yalnızca `*Data.js`'e veri
   eklenir. Yeni bir `css-animation` `kind` preset'i gerekiyorsa bu JSX işi
   SADECE Fable'a aittir (bkz. §3).
7. **Referans şema** (`kafkaData.js` içindeki mevcut örnekler kalite barıdır):

```js
const xxxStep = {
  type: 'step-animation',
  title: { tr: 'Soru formunda, merak uyandıran başlık?', en: '...' },
  steps: [
    { tr: 'Adım 1 — mekanizmanın İLK olayı; veri/komut nereden nereye gidiyor açıkça söylenir.', en: '...' },
    { tr: 'Adım 2 — ...', en: '...' },
    // 4-6 adım; her adım tek cümle-iki cümle; NEDEN'i de söyler, sadece NE'yi değil
  ],
}
```

8. **Doğruluk checklist'i (CLAUDE.md §1.1) her dalga sonunda zorunlu:**
   `node scripts/check-content-integrity.mjs` → sıfır ihlal;
   `npm run audit:animation -- <key>` → hedef sekmeler kapanmış;
   TR yorum/metin taraması; `npm run build` yeşil.
9. **Büyük dosya uyarısı:** `javaData`, `pythonData`, `typescriptData` chunk
   boyutu build sonrası izlenir, `NEXT_SESSION.md`'ye not edilir.
10. **⚠️ `pythonData.js` özel riski:** TR içeriği EN'den **index-tabanlı
    `applyTr` override** ile üretilir (satır ~7841+). Araya blok eklemek
    override index'lerini kaydırıp TR'de YANLIŞ blokları bozabilir (geçmişte
    gerçek bug üretti). Bu dosyaya blok ekleme işi SADECE Fable tarafından,
    her ekleme sonrası TR sayfa görsel kontrolüyle yapılır.

---

## 3. Model Dağılımı — Hangi İşi Hangi Model Yapar?

İş, üç yetkinlik seviyesine göre bölünmüştür: **yargı/risk işleri Fable'a,
yaratıcı içerik üretimi Sonnet'e, şablonlu/mekanik işler Haiku'ya.**

### 3.1 Fable (yargı, risk, altyapı) — bu oturumda BAŞLANDI

| İş | Durum |
|---|---|
| `scripts/audit-animation-coverage.mjs` denetim aracı (kod bloğu başına açık ölçümü, `--missing`/`--json`/`--fail-on-missing`) | ✅ Bu oturumda yazıldı |
| `package.json`'a `audit:animation` + `audit:animation:missing` script kayıtları | ✅ Bu oturumda eklendi |
| Bu plan dosyası + parametrik prompt şablonları (§4) | ✅ Bu oturumda yazıldı |
| **Dalga A7:** `pythonData.js` (17 açık) — applyTr index-kayması riski nedeniyle yalnızca Fable | ⬜ |
| Yeni `css-animation` `kind` preset'i gerekirse `CssAnimationBlock.jsx` JSX işi | ⬜ (ihtiyaç çıkarsa) |
| Her dalga sonrası kalite denetimi: rastgele 3 animasyonun "kod bloğuyla gerçekten ilişkili mi?" kontrolü + merge kararı | ⬜ sürekli |
| Plan/`NEXT_SESSION.md` durum güncellemeleri | ⬜ sürekli |

### 3.2 Sonnet (yaratıcı, konuya-bağlı içerik üretimi)

Yüksek/orta açıklı sayfalarda step-animation senaryoları yazmak konu
bilgisi + pedagojik yaratıcılık ister; hacim büyüktür ama pattern nettir —
Sonnet için ideal. Dalgalar (açığa göre sıralı, her dalga ayrı commit):

| Dalga | Sayfa(lar) | Açık | Not |
|---|---|---|---|
| A1 | selenium | 36 | En büyük açık; Locators (-7) ve Actions (-8) sekmeleri öncelikli |
| A2 | kafka + kubernetes | 17+17 | İkisi de EN+TR çift ağaç — kural §2.5 |
| A3 | java | 23 | Büyük dosya — chunk boyutu izlenir (§2.9) |
| A4 | restassured + appium | 14+14 | Appium'da açık ağırlıkla kurulum sekmesinde (-8) |
| A5 | jmeter + postman | 13+10 | JMeter'de shell-ağırlıklı bloklar var; animasyon yine de yazılır (filler atlar, biz atlamayız) |
| A6 | docker + azure + aws | 11+7+6 | Üçü de görece küçük iş |

### 3.3 Haiku (şablonlu, mekanik, düşük-riskli işler)

| Dalga | İş | Hacim |
|---|---|---|
| A8 | Düşük açıklı sayfaların kalan sekmeleri: playwright, sql, azure/aws artıkları, linux, javascript, browserstack, claude-ai, git, bruno, llm-agents, jenkins, cypress | ~48 açık; sekme başına çoğunlukla 1-2 animasyon, mevcut kalıptan kopyala-uyarla |
| B | 18 eksik `order-sort` (bkz. §1.2) — şeması tamamen şablonlu (`challenge` + `variant: 'order-sort'` + `items` + `correctOrder`) | 18 blok |
| — | Her dalga sonrası TR yorum taraması + `relatedTopicId` doğrulama koşumları (`npm run content:check`) | sürekli |

**Haiku çıktısı gözden geçirmesiz merge edilmez** — Fable'ın §3.1'deki
kalite denetimi Haiku dalgaları için de geçerlidir (Sonnet dalgalarından
daha sıkı örneklemle: rastgele 3 değil 5 blok).

### 3.4 Neden bu dağılım?

- **Fable:** applyTr gibi kırılgan mekanizmalar, JSX/component işleri ve
  "bu animasyon gerçekten öğretiyor mu?" yargısı en pahalı hataların olduğu
  yerler — en güçlü modele.
- **Sonnet:** 100+ özgün animasyon senaryosu yazmak yaratıcılık ister ama
  şema sabittir; Sonnet kalite/maliyet dengesinin en iyi noktası.
- **Haiku:** order-sort ve kopyala-uyarla işleri neredeyse deterministik;
  denetim scriptleri (`content:check`, `audit:animation`) hatayı build'de
  yakalar, bu yüzden en ucuz model yeterli.

---

## 4. Parametrik Prompt Şablonları

### 4.1 Sonnet Dalga Promptu (A1-A6)

Aşağıdaki şablonda `{PAGE_KEY}` (örn. `selenium`), `{DATA_FILE}` (örn.
`src/data/seleniumData.js`) doldurulur:

```text
Proje: d:\ANTIGRAVITY\automationexercise (branch: feature/animation-per-topic)

Önce şunları oku (başka dosya okumana gerek yok):
1. CLAUDE.md — Bölüm 1.1, 8, 9.1, 9.5
2. Documents/animation-per-topic-plan.md — Bölüm 2 (kurallar) ve 4.1 (bu şablon)

Görev: {PAGE_KEY} sayfasındaki kod-bloğu-başına animasyon açıklarını kapat.

Adımlar:
1. `node scripts/audit-animation-coverage.mjs {PAGE_KEY} --missing` çalıştır —
   çıktıdaki her sekme ve açık sayısı senin iş listendir.
2. `{DATA_FILE}` dosyasının yapısını tespit et: EN+TR ayrı sections ağacı mı,
   tek ağaç (bilingual field) mı? Çift ağaçsa animasyon sabitlerini dosya
   başında tanımlayıp İKİ ağaca da aynı referansla koy.
3. Açığı olan her sekmede, animasyonsuz kalan HER kod bloğunun hemen ardına
   1 adet `step-animation` bloğu ekle:
   - Animasyon o kod bloğunun anlattığı mekanizmayı 4-6 adımda görselleştirir;
     jenerik/konudan kopuk animasyon YASAK.
   - `title` ve her `steps[]` girdisi `{tr, en}` bilingual; TR'de açıklamalar
     Türkçe, teknik terimler (locator, fixture, offset...) İngilizce kalır.
   - Kalite barı: kafkaData.js'teki mevcut step-animation sabitleri
     (kafkaRetentionReplayStep vb.) — her adım NE olduğunu değil NEDEN
     olduğunu da söyler.
   - Kod bloğu zaten başka bir animasyonun (simulation/css-animation/
     animated-timeline) hemen üstündeyse ona yenisini ekleme — açık sayısı
     kadar ekleme yap, fazlasını değil.
4. Sekme sekme ilerle; her 1-2 sekmede bir şunları çalıştır:
   - `node scripts/check-content-integrity.mjs` → sıfır ihlal
   - `node scripts/audit-animation-coverage.mjs {PAGE_KEY}` → açık düşüyor mu
5. Sayfa bittiğinde: `npm run build` yeşil olmalı. Ardından eklediğin TÜM TR
   metinleri tek tek yeniden oku — İngilizce kalan açıklama cümlesi var mı?
6. CLAUDE.md §1.1'deki 4 madde doğrulanmadan "tamamlandı" yazma. Commit
   mesajı: `feat(animation): {PAGE_KEY} kod-bloğu-başına animasyon açıkları kapatıldı (Dalga {N})`

YAPMA: component/JSX dosyalarına dokunma; video-scene ekleme (o iş bitti);
mevcut blokları silme/taşıma; pythonData.js'e dokunma (Fable'a ayrılmış).
```

### 4.2 Haiku Dalga A8 Promptu (düşük açıklı sayfalar)

```text
Proje: d:\ANTIGRAVITY\automationexercise (branch: feature/animation-per-topic)

Önce oku: Documents/animation-per-topic-plan.md Bölüm 2 (kurallar).

Görev: {PAGE_KEY} sayfasında `node scripts/audit-animation-coverage.mjs
{PAGE_KEY} --missing` çıktısındaki açıkları kapat. Sekme başına genellikle
1-2 animasyon eksik.

Yöntem (kopyala-uyarla — özgün senaryo kurmana gerek yok):
1. Aynı veri dosyasındaki MEVCUT bir step-animation bloğunu şablon al.
2. Açık olan kod bloğunun hemen ardına, o kod bloğunun adımlarını (koddaki
   satır sırasını takip ederek) 4-5 adımda anlatan yeni bir step-animation koy.
3. Her adım {tr, en} bilingual; TR'de açıklama Türkçe, teknik terim İngilizce.
4. Dosya EN+TR çift ağaçlıysa sabiti iki ağaca da aynı referansla koy.

Her sayfadan sonra ZORUNLU:
- `node scripts/check-content-integrity.mjs` → sıfır ihlal
- `node scripts/audit-animation-coverage.mjs {PAGE_KEY}` → deficit:0
- `npm run build` → yeşil

Emin olmadığın sekme olursa ekleme yapma, sekme adını raporla ve geç.
YAPMA: component/JSX dosyası, pythonData.js, mevcut blok silme/taşıma.
```

### 4.3 Haiku Dalga B Promptu (18 order-sort)

```text
Proje: d:\ANTIGRAVITY\automationexercise (branch: feature/animation-per-topic)

Görev: `npm run audit:interactive -- --missing` çıktısında order-sort (ch:0)
eksiği görünen 18 sekmeye birer `challenge` bloğu ekle.

Şablon (aynı dosyadaki mevcut bir challenge/order-sort bloğunu referans al):
- type: 'challenge', variant: 'order-sort'
- Sekmedeki ana kod bloğunun/komut akışının GERÇEK sırasını soran 4-6 item
- title/description/items/success metinleri {tr, en} bilingual
- Yerleşim: sekmenin son quiz'inden önce, ana anlatım bloklarından sonra

Her dosyadan sonra: `node scripts/check-content-integrity.mjs` + ilgili sayfa
için `npm run audit:interactive -- <key>` → gap sayısı düşmüş olmalı.
Bittiğinde `npm run build` yeşil olmalı.
YAPMA: pythonData.js'e dokunma; animasyon bloklarını değiştirme.
```

---

## 5. Tamamlanma Tanımı (Definition of Done)

Plan şu üç koşul sağlandığında biter:

1. `node scripts/audit-animation-coverage.mjs` → **Toplam açık: 0**
   (istenirse `--fail-on-missing` CI gate olarak `build`e eklenebilir —
   karar Fable + kullanıcıda).
2. `npm run audit:interactive` → **Total gaps: 0** (Dalga B sonrası).
3. Tüm dalgalar `npm run build` yeşil + CLAUDE.md §1.1 checklist'i ile
   commit edilmiş; `NEXT_SESSION.md`'de dalga tablosu "tamamlandı" durumda.
