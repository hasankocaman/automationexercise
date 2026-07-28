# Öğrenme Bilimi Yükseltmesi — Plan (Prediction & Aktif Öğrenme Dalgası)

> Kaynak: Kullanıcının 2026-07-27 tarihli değerlendirme yazısı ("Siteyi önceki
> hâliyle kıyaslayarak tekrar değerlendirdim…"). Bu plan o yazıyı **birebir
> değil**, projenin mevcut durumuyla harmanlayarak ele alır. Branch:
> `feature/prediction-blocks`.

---

## 0. İLERLEME DURUMU (son güncelleme: 2026-07-28 — bir sonraki oturuma devir)

> Bu bölüm "şimdiye kadar ne yapıldı + sırada ne var" özetidir. Ayrıntı için
> `git log --oneline` (branch `feature/prediction-blocks`) ve aşağıdaki bölümler.

### ✅ TAMAMLANANLAR

**Yeni blok tipleri (3 adet, Opus — bileşen + TopicPage kaydı + Java referansı):**
- `prediction` (`PredictionBlock.jsx`) — "Önce Tahmin Et, Sonra Gör" / active recall (yazı #1)
- `code-trace` (`CodeTraceBlock.jsx`) — satır satır kod yürüyüşü (yazı #2)
- `heap-stack` (`HeapStackBlock.jsx`) — Stack/Heap bellek görselleştirmesi (yazı #3/#4)
- Şemalar bu dosyanın Bölüm 2'sinde. Üçü de `TopicPage.jsx`'te `case` olarak kayıtlı.

**Görev S1 — prediction rollout (Sonnet, 5/5 dil, 17 blok):**
- javaData.js (7): string-concat, int/double bölme, operatör önceliği, switch fall-through, Integer cache, unboxing NPE, array equality
- pythonData.js (3): `is`/`==`, mutable default arg, float precision
- sqlData.js (2): COUNT(*)/NULL, JOIN satır çoğalması (fan-out)
- javascriptData.js (3): hoisting, `==`/`===`, closure+var loop
- typescriptData.js (2): excess property check, structural typing

**Görev S2 — code-trace + heap-stack rollout (Sonnet, 3 dil):**
- javaData.js: for-loop trace + OOP aliasing heap-stack
- pythonData.js: for-loop trace + mutable-default heap-stack
- javascriptData.js: for-loop trace + nesne-referansı heap-stack

**#7 Learning Analytics dashboard (Opus, tamamen local-first, backend YOK):**
- `progressStore.js` → `getLearningAnalytics()`, `reviewQueue.js` → `getMostMissedAreas()`
- `LearningAnalytics.jsx` → HomePage'de ActivityHeatmap'ten sonra render
- Ortalama quiz başarısı + en güçlü/en zayıf konu + en çok hata yapılan alan
- Seeded-localStorage smoke testiyle doğrulandı (accuracy 83%, sıralamalar doğru)

**Doğrulama:** her commit'te `node --check` + `check-content-integrity.mjs` +
`check-i18n-leaks.mjs` (baseline **109** sabit, regresyon yok) + `npm run build` —
hepsi tek tek geçti. Yol boyunca 2 i18n leak yakalanıp düzeltildi (Java switch
demo literalleri, SQL yorum satırı).

### 🔜 SIRADA NE VAR (bir sonraki oturum)

Kalan işlerin tümü **saf-frontend değil** — backend/mimari/product kararı ister,
kullanıcı onayı olmadan tek başına kodlanmaz (§13). Detay Bölüm 5'te.

1. **#6 Adaptif zorluk** — quiz motoruna (TopicPage ~18k satır, çok sayıda E2E
   testi) dokunur; zorluk-etiketli soru havuzu gerekir. Riskli, ayrı planla.
2. **#5 Kişisel AI Mentor** — "hangi konuda zorlanıyorsun" verisi #7 analytics
   ile zaten YERELDE var; asıl konuşan/AI katmanı Supabase tablo+RPC+edge
   function ister.
3. **#8 Portföy/proje üretimi** — en büyük epik (mini framework → POM → API →
   CI → push → portfolyo).
4. **İsteğe bağlı düşük öncelik:** ✅ Java/Python/JS code-trace/heap-stack
   genişletme dalgası 2026-07-28'de yapıldı (commit `5daa148`): Java String Pool
   heap-stack + dizi ters çevirme code-trace, Python list-copy heap-stack, JS
   `.reduce()` code-trace. Kalan: SQL/TS (SQL için heap/stack uymaz; TS = JS).
5. **`main`'e merge/PR kararı** kullanıcıda — branch `feature/prediction-blocks`
   içerik olarak tamamlandı, tüm geçitler yeşil.

---

## 1. Yazının Değerlendirmesi — Gerçekle Kıyas

Yazıda 8 eksik sıralanıyor. Kodu inceledikten sonra her birinin **projedeki
gerçek durumu**:

| # | Yazıdaki eksik | Projedeki gerçek durum | Karar |
|---|----------------|------------------------|-------|
| 1 | **Prediction** ("çıktı ne? / compile olur mu?") | **Gerçek boşluk.** `quiz`, `challenge`, `feynman-checkpoint` var ama "önce tahmin et, sonra gör" (commitment → reveal) diye ayrı bir blok tipi YOKTU. | ✅ **Opus yaptı** (yeni `prediction` bloğu) + Sonnet yaygınlaştıracak |
| 2 | Kod yürütme animasyonu (for → i=0 → i=1…) | Kısmen var: `step-animation`, `trace`, `pytest-execution-visual`, `js-executor`. Genel "satır satır değişken durumu yürüyen" jenerik izleyici yoktu. | ✅ **Opus yaptı** (yeni `code-trace` bileşeni) + Sonnet yaygınlaştıracak |
| 3 | Heap / Stack görselleştirme | `python-memory-visual` (Python değişkenleri), `data-structure` var; ama Java `new Person()` → Stack(reference) + Heap(object) modeli yoktu. | ✅ **Opus yaptı** (yeni `heap-stack` bileşeni) + Sonnet yaygınlaştıracak |
| 4 | Memory viz (ArrayList/HashMap/Queue/Stack animasyon) | `data-structure` + `python-collection-visual` blokları VAR ama az sayfada; `heap-stack` de nesne bazlı bellek için eklendi. | 🔶 Sonnet (veri yaygınlaştırma: `data-structure` + `heap-stack`) |
| 5 | Kişiselleşmiş AI Mentor ("2 haftadır XPath'te zorlanıyorsun") | `QAMentorPage` var ama kişisel zayıflık takibi/hatırlatma yok. Supabase + progress analitiği gerekir. | 🔷 Opus (ayrı mimari görev, backend gerektirir) |
| 6 | Adaptif zorluk | Yok. Quiz zorluğu sabit. | 🔷 Opus (ayrı görev, §18 yedek-soru altyapısı üstüne kurulur) |
| 7 | Learning Analytics dashboard (en güçlü/zayıf konu) | `SkillRadar`, `ActivityHeatmap`, `XpStat` var — parçalar mevcut, birleşik dashboard + konu-bazlı doğruluk agregasyonu yok. | 🔷 Opus/Sonnet karışık (agregasyon Opus, kart UI Sonnet) |
| 8 | Gerçek proje/portföy üretimi | Yok. En büyük/uzun vadeli iş. | 🔷 Roadmap (ayrı epik) |

**Sonuç:** Yazının en güçlü ve en somut noktası **#1 Prediction** — küçük, yüksek
etkili, projenin "sadece data ekle" mimarisine birebir oturan bir boşluktu. Bu
dalga onu kapatır ve #3/#4'ü Sonnet için hazırlar. #2/#5/#6/#8 daha büyük, ayrı
Opus/epik görevleri olarak işaretlendi — bu dalgada kapsam dışı.

## 2. Bu Dalgada Opus'un Yaptıkları (TAMAMLANDI, commit'lendi)

Yeni **`prediction`** blok tipi — "Önce Tahmin Et, Sonra Gör" (aktif hatırlama /
active recall). Öğrenme bilimindeki en güçlü tekniklerden biri: kullanıcı çıktıyı
GÖRMEDEN tahmin etmeye zorlanır (commitment), onaylayınca gerçek sonuç + neden
açıklaması açılır. CLAUDE.md §17 (Prediction) ve §18 (yanlışta moral bozucu
kırmızı ekran yerine mikro-geri bildirim) ile uyumlu.

**Dosyalar:**
- `src/components/PredictionBlock.jsx` — yeni, self-contained bileşen. XP ödülü
  (ilk denemede doğru tahmin), §20 konfeti kutlaması, dark mode + mobil (44px
  touch target), tam bilingual (`{tr,en}`). Yanlış tahminde "Tekrar dene" +
  şık-bazlı `why` açıklaması.
- `src/components/TopicPage.jsx` — `import PredictionBlock` + `case 'prediction'`
  renderer kaydı (`onExerciseCompleted` sinyaliyle sekme tamamlama entegre).
- `src/data/javaData.js` — **referans örnek**: `1 + 2 + "3" + 4 + 5` soldan-sağa
  değerlendirme tuzağı (Strings & Math sekmesi). Çift-ağaçlı `sB` için tek
  `predJavaStringConcat` sabiti, hem `tr` hem `en` blocks dizisine aynı
  referansla konuldu (§9.5 kalıbı).

**Doğrulama (§1.1 checklist — hepsi geçti):**
- `node --check src/data/javaData.js` ✓
- `node scripts/check-content-integrity.mjs` ✓ (sıfır ihlal)
- `node scripts/check-i18n-leaks.mjs` ✓ (regresyon yok, baseline 109 sabit)
- `npm run build` ✓ (43 static shell, SEO geçti)

### `prediction` blok şeması (Sonnet için referans)

```js
{
  type: 'prediction',
  id: 'benzersiz-id',            // ZORUNLU (XP tekilliği; yoksa XP hiç kaydolmaz)
  xpReward: 15,
  relatedTopicId: 'konu-id',     // hangi konunun devamı (önerilir)
  prompt: { tr: 'Bu kodun çıktısı ne olur?', en: 'What does this print?' },
  code: `...` ,                  // string veya {tr,en}; TR yorumlar Türkçe olmalı
  codeLanguage: 'java',          // java|python|javascript|typescript|sql|bash
  options: [
    { id: 'a', label: { tr: '...', en: '...' }, why: { tr:'…', en:'…' } },
    { id: 'b', label: { tr: '...', en: '...' }, correct: true },  // tam 1 tane correct
  ],
  output: { tr: '3345', en: '3345' },   // (ops.) gerçek program çıktısı
  reveal: { tr: 'Neden bu sonuç…', en: 'Why this result…' },  // ZORUNLU açıklama
}
```

**Kurallar:**
- `options` içinde **tam olarak bir** `correct: true` olmalı.
- `reveal` her zaman "NEDEN" anlatmalı (sadece doğru şıkkı tekrar etme).
- Yanlış şıklara `why` eklemek güçlü tavsiye — kullanıcı yanılınca o çeldiricinin
  neden yanlış olduğunu görür (§18 mikro-geri bildirim).
- Kod `{tr,en}` ise TR yorumlar Türkçe, EN yorumlar İngilizce (§8). Tek string
  ise yorumlar teknik terim/çıktı olmalı ya da `englishToTurkishCodeComments`'te
  karşılığı olmalı.
- `prediction` bloğu **quiz gibi** konu anlatımından SONRA gelir (§9.1) — asla
  ilk blok olamaz.

### Opus Dalga 2 — `code-trace` ve `heap-stack` (TAMAMLANDI, commit'lendi)

İki yeni self-contained bileşen daha eklendi (backend gerektirmez, "Opus bileşen
yazar → Sonnet data ekler" kalıbı):

- `src/components/CodeTraceBlock.jsx` — **`code-trace`**: kodu satır satır YÜRÜR;
  aktif satır vurgulu, değişken tablosu her adımda güncellenir (değişen değer sarı
  parlar), opsiyonel çıktı paneli, ▶ oynat / ⏮⏭ adımla / ↺ sıfırla. (feedback #2)
- `src/components/HeapStackBlock.jsx` — **`heap-stack`**: Stack (yerel değişkenler,
  primitive vs referans) | Heap (nesneler) iki kolon; referans→nesne renk
  eşleşmesi + işaret edilen nesne parlaması ile aliasing'i gösterir. (feedback #3/#4)
- `TopicPage.jsx` — her ikisi için import + `case` kaydı.
- `javaData.js` referans örnekleri: `traceJavaForLoop` (for döngüsü, S-C Akış
  Kontrolü) ve `heapStackJava` (`new Person()` + `q = p` aliasing, S2 OOP). İkisi
  de çift-ağaçlı bölümlere tek sabit + iki ağaç referansıyla konuldu.

**Not (şema):** `code-trace` ve `heap-stack` bloklarında `code` alanı **düz string
olmalı** (renderer `.split('\n')` yapar, `{tr,en}` DESTEKLENMEZ) — bu yüzden kodu
**yorumsuz** tut (i18n taraması TR sızıntısı sanmasın), tüm açıklamayı bilingual
`note` alanlarına koy.

#### `code-trace` şeması
```js
{
  type: 'code-trace',
  title: { tr, en },
  code: 'çok satırlı kaynak (yorumsuz)',
  codeLanguage: 'java',
  steps: [
    { line: 3, vars: { i: '0', sum: '0' }, output: '', note: { tr, en } },
    // line = 1-indexli vurgulanacak satır; vars = o adımki değişkenler
    // (değişen değer otomatik sarı parlar); output = (ops.) birikmiş çıktı
  ],
}
```

#### `heap-stack` şeması
```js
{
  type: 'heap-stack',
  title: { tr, en },
  code: 'çok satırlı kaynak (yorumsuz)',
  codeLanguage: 'java',
  steps: [
    {
      line: 2, note: { tr, en },
      stack: [
        { name: 'age', value: '30', kind: 'primitive' },
        { name: 'p', ref: 'obj1', kind: 'ref' },   // ref → heap[].id ile eşleşir
      ],
      heap: [ { id: 'obj1', type: 'Person', fields: { name: '"Ada"', age: '30' } } ],
    },
  ],
}
```

## 3. Sonnet Görevleri (prompt Bölüm 4'te)

### Görev S1 — `prediction` bloğunu tüm teknoloji sayfalarına yaygınlaştır
Referans uygulama Python rollout kalıbıyla aynı (§9.2): bileşen hazır, sadece
`*Data.js`'e veri eklenir. Öncelik: **Java** (en çok tahmin fırsatı olan tuzaklar),
sonra Python, SQL, JavaScript, TypeScript. Her teknoloji sayfasının **her ana
konu sekmesine en az 1** `prediction` bloğu — özellikle "gotcha" içeren yerlere:
- Java: `Integer` cache (`==` vs `.equals`, 127 vs 128), `int`/`double` bölme,
  operatör önceliği, autoboxing, `String` havuzu, `switch` fall-through, ArrayList
  vs array, ternary tip yükseltme.
- Python: mutable default arg, `is` vs `==`, integer cache, liste referans kopyası,
  `0.1 + 0.2`, list comprehension kapsamı.
- SQL: `NULL` karşılaştırma (`= NULL` vs `IS NULL`), `COUNT(*)` vs `COUNT(col)`,
  `JOIN` satır sayısı, `GROUP BY` + agregasyon.
- JS/TS: `==` vs `===`, hoisting, closure/loop `var`, `typeof null`, `[] + {}`.

### Görev S2 — `code-trace` + `heap-stack` yaygınlaştır (feedback #2, #3, #4)
Bileşenler HAZIR (`CodeTraceBlock`, `HeapStackBlock`). Java referansları örnek.
- `code-trace`: her sayfada döngü/algoritma anlatan kod bloğunun ardına satır satır
  yürüyüş ekle (Java for/while, Python for, SQL yok — algoritmik akış olan yerler).
- `heap-stack`: nesne/referans/aliasing anlatan yerlere (Java `new`, `= p`, Python
  liste referans kopyası). ArrayList/HashMap/Queue/Stack için mevcut `data-structure`
  bloğunu da veri olarak yay. Yeni bileşen YAZMA — yetmezse Opus'a bırak, uydurma.

## 4. Sonnet için HAZIR PROMPT

> Aşağıdaki prompt'u Sonnet oturumuna olduğu gibi yapıştır.

---

**PROMPT (Sonnet — prediction rollout):**

Branch: `feature/prediction-blocks` (zaten açık, üstünde çalış). Bu projede yeni
bir `prediction` ("Önce Tahmin Et") blok tipi eklendi — bileşen ve renderer HAZIR
(`src/components/PredictionBlock.jsx`, `TopicPage.jsx`'te `case 'prediction'`
kayıtlı). Senin işin YENİ BİLEŞEN YAZMAK DEĞİL — sadece `src/data/*Data.js`
dosyalarına veri olarak `prediction` blokları eklemek.

Referans örneği oku: `src/data/javaData.js` içinde `predJavaStringConcat` sabiti
ve `Documents/learning-science-upgrade-plan.md` Bölüm 2'deki şema.

Yap:
1. **javaData.js** ile başla. Her ana konu sekmesine (Strings zaten var; onu
   ATLAMA, diğerlerine ekle) klasik bir Java "gotcha" için 1 `prediction` bloğu
   ekle: Integer cache (127 vs 128 `==`), int/double bölme, operatör önceliği,
   autoboxing, switch fall-through, ArrayList vs array. Blok, ilgili konunun kod
   anlatımından SONRA gelmeli (§9.1 — asla ilk blok değil).
2. Çift-ağaçlı dosyalarda (javaData `sB`/`sC`… gibi ayrı `tr`/`en` blocks) bloğu
   TEK bilingual sabit yapıp İKİ ağaca da aynı referansla koy (§9.5, §23.4).
   Tek-ağaçlı dosyada (`{tr,en}` alanlı tek blocks) tek yere koy.
3. Şema kuralları: her blokta benzersiz `id` (XP için ZORUNLU), tam 1 `correct`,
   `reveal` mutlaka NEDEN anlatsın, yanlış şıklara mümkünse `why`. TR yorumlar
   Türkçe (§8). `relatedTopicId` ekle.
4. javaData bitince Python → SQL → JavaScript → TypeScript sırasıyla devam et.

Prediction rollout bitince, aynı sayfalarda **Görev S2**'ye geç: `code-trace`
(döngü/algoritma anlatan kod bloklarının ardına satır satır yürüyüş) ve
`heap-stack` (nesne/referans/aliasing anlatan yerlere). Şemalar bu dosyanın
Bölüm 2'sinde; referanslar `javaData.js` içinde `traceJavaForLoop` ve
`heapStackJava`. `code`/`heap-stack` bloklarında `code` alanı **düz string,
yorumsuz** olmalı (renderer `{tr,en}` desteklemez, açıklama `note`'larda).

Her dosyadan sonra ZORUNLU (§1.1): `node --check src/data/<dosya>.js` →
`node scripts/check-content-integrity.mjs` → `node scripts/check-i18n-leaks.mjs`
→ `npm run build`. Dördü de geçmeden "bitti" deme. Parça parça ilerle, her
teknoloji sayfasından sonra ayrı commit at (`feat(prediction): java sayfası
tahmin blokları`). Bittiğinde `NEXT_SESSION.md`'yi güncelle.

---

## 5. Bu Dalga Kapsamı DIŞI (ayrı görevler — Opus bileşen işi BİTTİ, geriye backend/epik kaldı)

Opus'un bu daldaki tüm self-contained bileşen işi tamamlandı (`prediction`,
`code-trace`, `heap-stack`). Kalanlar backend/mimari/product kararı gerektirir ve
kullanıcının açık onayı olmadan tek başına kodlanmamalı (§13):

- **#5 Kişisel AI Mentor** — Supabase progress analitiği + konu-bazlı zayıflık
  takibi + hatırlatma. Yeni tablo/RPC + edge function gerektirir → ayrı görev.
- **#6 Adaptif zorluk** — §18 yedek-soru altyapısı üstüne kullanıcı başarı
  geçmişine göre zorluk seçimi → ayrı görev.
- **#7 Learning Analytics dashboard** — ✅ **TAMAMLANDI (Opus).** `getLearningAnalytics()`
  (progressStore.js) + `getMostMissedAreas()` (reviewQueue.js) agregasyonları +
  `LearningAnalytics.jsx` panosu (HomePage'de, ActivityHeatmap'ten sonra). Tamamen
  local-first: ortalama quiz başarısı, en güçlü/en zayıf konu, en çok hata yapılan
  alan. Mevcut `SkillRadar`/`JobReadinessCard` (QAMentorPage, kariyer-haritası
  gate'i) ile çakışmaz — bu pano ana sayfada harita kurmadan görünür.
- **#8 Portföy/proje üretimi** — mini framework → POM → API test → CI → push akışı;
  en büyük epik, ayrı planlama gerekir.
