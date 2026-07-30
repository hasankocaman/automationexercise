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

**Prediction DOYURMA dalgası (Opus, 2026-07-28 — kullanıcı "aynı sayfalarda
maksimum sayıda ekle" dedi):** İlk rollout'un (17 blok) üzerine dil sayfalarının
kalan gotcha'ya değer TÜM sekmeleri kapsandı. +24 prediction (2 dalga toplamı 42):
- **SQL** (8): NULL comparison, COUNT/NULL, JOIN fan-out, HAVING/WHERE, DISTINCT
  çoklu-sütun, WHERE'siz UPDATE, NOT IN+NULL, BETWEEN dahil-uç.
- **Java** (10): string concat, int/double bölme, operatör önceliği, switch
  fall-through, Integer cache, unboxing NPE, array equality, ConcurrentModification,
  int taşması wrap, finally return ezme.
- **Python** (8): is/==, mutable default, float precision, list mult paylaşımı,
  for...else, 1/1.0/True dict anahtarı, class-level mutable paylaşım, UnboundLocalError.
- **JavaScript** (9): hoisting, ==/===, closure+var, .sort() sözlüksel, typeof
  null/[]/NaN, "5"+1 vs "5"-1, setTimeout(0) makrotask, Promise mikrotask, this→TypeError.
- **TypeScript** (7): excess property, structural typing, any/unknown, as assertion,
  tuple.push bypass, ?? vs ||, catch e:unknown.
- Ayrıca code-trace/heap-stack genişletme (commit `5daa148`): Java String Pool
  heap-stack + dizi ters çevirme trace, Python list-copy heap-stack, JS .reduce() trace.
- Boş kalan sekmeler (kurulum/mülakat/pratik/QA-use-cases + Generics/Utility Types)
  ya kavramsal olarak "çıktıyı tahmin et" formatına uymuyor ya da düşük değerli —
  bilinçli bırakıldı. Her sayfa ayrı commit; tüm geçitler yeşil.

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
4. **İsteğe bağlı düşük öncelik:** ✅ code-trace/heap-stack genişletme + prediction
   DOYURMA dalgası 2026-07-28'de yapıldı (yukarı bak). Dil sayfalarında prediction
   gotcha kapsamı doygunlaştı (java=10, js=9, python=8, sql=8, ts=7). Kalan uygun
   sekme yok; ilerleyecek yer araç sayfaları (git/linux/docker — seçili prediction)
   ama düşük öncelik.
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
  **Ayrıntılı uygulama planı + rol dağılımı (Sen/Opus/Sonnet) için Bölüm 6'ya bak.**
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

---

## 6. #5 Kişisel AI Mentor — Ayrıntılı Uygulama Planı (Sen / Opus / Sonnet)

> **Hedef (kullanıcının yazısındaki cümle):** Site, "2 haftadır XPath'te
> zorlanıyorsun, hadi şu 3 alıştırmayı yapalım" diyebilen, kişiye özel, zaman
> içinde takip eden bir mentor gibi davransın. Bugün site zayıflığı YALNIZCA anlık
> gösteriyor (`LearningAnalytics.jsx` → en zayıf konu / en çok hata). Eksik olan iki
> şey: **(a) zamanı** ("2 haftadır" demek için tarihli geçmiş lazım) ve **(b)
> konuşan/öğüt veren AI katmanı**.

### 6.0. Mevcut durum — neyin üstüne kuruyoruz (körlemesine başlama)

Bu özellik SIFIRDAN değil, hazır parçaların üstüne kurulur. Önce bunları oku:

| Parça | Dosya | Ne veriyor |
|-------|-------|------------|
| Anlık analitik | `src/lib/progressStore.js` → `getLearningAnalytics()` | `{ hasData, quizAccuracy, strongest, weakest, mostMissed, reviewDue, ... }` — hepsi localStorage'dan SALT-OKUNUR türetiliyor, backend yok |
| En çok hata alanları | `src/lib/reviewQueue.js` → `getMostMissedAreas(n)` | `[{ route, pageTitle, wrongCount }]` |
| Pano UI | `src/components/LearningAnalytics.jsx` | HomePage'de render, tamamen local-first |
| Supabase client | `src/lib/supabaseClient.js` | `supabase`, `isSupabaseConfigured`, `isPremiumEnabled` (env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) |
| Auth | `src/context/AuthContext.jsx` → `useAuth()` | oturum/kullanıcı |
| Edge function KALIBI | `supabase/functions/grade-interview-answer/index.ts` | CORS + `supabase.auth.getUser()` üye kontrolü + `callGroq()` + JSON — **birebir kopyalanacak iskelet** |
| Groq helper | `supabase/functions/_shared/groq.ts` | `callGroq(apiKey, messages)`, model `llama-3.3-70b-versatile`, secret `GROQ_API_KEY` (ZATEN kurulu) |
| SQL şema KALIBI | `supabase/social_proof_schema.sql`, `supabase/map_events_schema.sql` | RLS + `security definer` RPC + `grant execute` — repo'da migration YOK, SQL Editor'da elle çalıştırılıyor |

### 6.1. Mimari karar — ÖNERİLEN yaklaşım (hibrit: yerel-öncelikli tespit + opsiyonel AI katmanı)

Projenin "üyelik opsiyonel bir katmandır, ön koşul değildir" ilkesine (CLAUDE.md
§5) sadık kalmak için özelliği **iki katmana** böl:

- **Katman A — Zaman-serili zayıflık tespiti (YEREL, üyeliksiz, herkese açık):**
  `getLearningAnalytics()` çıktısının **tarihli anlık görüntülerini (snapshot)**
  localStorage'da bir halka-tampon (ring buffer) olarak biriktir. Böylece "2
  haftadır bu konu zayıf listende" gibi ZAMAN ifadeleri **backend olmadan**
  hesaplanır. Kalıcı zayıflık = "aynı konu son N snapshot'ta / M gündür zayıf
  listede". Bu katman anonim kullanıcıda da çalışır (§5).
- **Katman B — Konuşan AI mentor (üyelik gerektirir, opsiyonel):** Zayıflık
  özetini alıp kişiye özel, motive edici, TR/EN öğüt üreten bir **edge function**
  (`mentor-advice`). API anahtarı client'a konamayacağı için AI çağrısı ZORUNLU
  olarak edge function'dan geçer (tıpkı `grade-interview-answer` gibi üye-only).
  Üye değilse: Katman A'nın **deterministik şablon öğütleri** (AI'sız, kural
  tabanlı) gösterilir — yani özellik üyeliksiz de bir değer verir, AI sadece onu
  zenginleştirir.

**Neden hibrit?** "2 hafta" iddiası için tek gereken tarihli snapshot — bu tamamen
yerelde çözülür, kimseyi login'e zorlamaz. Supabase yalnızca (1) cihazlar-arası
senkron ve (2) API anahtarını saklayan AI katmanı için gerekir. Bu ayrım aynı
zamanda test/prod feature-flag ayrımına da (§5) uyar.

### 6.2. SEN (Hasan) ne yapmalısın — kararlar + elle altyapı adımları

Bunlar kod DEĞİL; ya senin vereceğin ürün kararların ya da yalnızca senin
erişimindeki (Supabase paneli, secret, deploy) elle adımlar. Opus/Sonnet bunları
senin yerine yapamaz.

**① Ürün kararları — KULLANICI TARAFINDAN KARARLAŞTIRILDI (2026-07-30, sabit):**

1. **Mentor nerede yaşasın? → KARAR: HomePage'de** (önerilen yaklaşım, kullanıcı
   onayladı 2026-07-30). Mentor paneli, HomePage'de mevcut `LearningAnalytics`
   panosunun hemen ALTINA eklenir — kullanıcı analitiğini zaten orada görüyor,
   mentor onun doğal devamı. Yeni route veya `/qa-mentor`'a ekleme YAPILMAZ.
2. **Proaktif mi, reaktif mi? → KARAR: PROAKTİF, ama yalnızca uygulama-içi (e-posta
   YOK).** Kullanıcı siteye geldiğinde uygulama kendiliğinden davranır: kalıcı bir
   zayıflık varsa site girişinde uygulama-içi bir **nudge** (kapatılabilir banner /
   nav rozeti) belirir ve `/qa-mentor`'a yönlendirir; `/qa-mentor` açıldığında mentor
   paneli kendiliğinden öne çıkar/açılır. E-posta/SMTP/cron KAPSAM DIŞI (v2).
3. **AI katmanı üye-only mu? → KARAR: EVET, yalnızca üyelere özel** (maliyet koruması,
   `grade-interview-answer` kalıbı). Üye olmayan kullanıcı Katman A'nın deterministik
   şablon öğüdünü görür; AI zenginleştirme katmanı ona HİÇ gösterilmez.
4. **AI katmanının görünürlüğü → KARAR: AI paneli/butonu SADECE üye VE üyelik-aktif
   ortamda render edilir.** Üye değilse "üye ol da AI koçu aç" gibi bir teşvik
   gösterilebilir ama AI çağrısı/çıktısı üye olmayana asla gösterilmez. Bu ortamda
   üyeliğin açık olup olmadığını Opus `isSupabaseConfigured` + `useAuth()` +
   `NEXT_SESSION.md`'deki feature-flag durumuyla teyit eder.

**② Elle altyapı adımları (yalnızca sen yapabilirsin — Opus şema/fonksiyonu YAZAR,
sen ÇALIŞTIRIR/DEPLOY edersin):**

5. **SQL şemasını çalıştır** (yalnızca Katman B / cihaz-senkron istersen): Opus'un
   üreteceği `supabase/mentor_schema.sql` dosyasını **Supabase panosu → SQL
   Editor**'da elle çalıştır (repo'da migration tutulmuyor — §6.0 kalıbı). RLS'in
   açık olduğunu ve kullanıcının yalnızca KENDİ satırını gördüğünü panoda doğrula.
6. **Secret kontrolü:** AI katmanı `GROQ_API_KEY`'i kullanır — bu secret
   `qa-assistant`/`grade-interview-answer` için ZATEN kurulu, yeni secret
   GEREKMEZ. Yeni bir sağlayıcı seçmezsen bu adım "doğrula ve geç".
7. **Edge function deploy:** `supabase functions deploy mentor-advice --project-ref
   <ref>` komutunu SEN çalıştır (Opus kodu yazar, deploy senin kimlik bilgilerini
   ister). Deploy sonrası uygulamadan bir kez tetikleyip 200 döndüğünü gör.
8. **CI kısıtı farkındalığı:** CLAUDE.md §23.8 — GitHub Actions runner'ından canlı
   Supabase Auth çağrıları reddediliyor. Yeni edge function'a bağlı üye-only E2E
   testleri CI'da SKIP edilecek (yerelde çalışır). Bu beklenen; Sonnet testi
   `process.env.GITHUB_ACTIONS === 'true'` guard'ıyla yazacak (mevcut kalıp).

**③ Onay kapıları:** §13/§21 gereği Opus kodlamaya başlamadan sana etkilenen dosya
listesini + veri modelini özetleyip onay alacak. Sen "başla" demeden backend
yazılmaz.

### 6.3. OPUS ne yapmalı — mimari + backend + yeni bileşenler

Opus'un işi: veri modeli, backend (şema + RPC + edge function), yerel snapshot/
tespit mantığı ve yeni React bileşeni. "Opus bileşen/altyapı yazar → Sonnet data/
içerik/test ekler" kalıbı (§9.2) burada da geçerli.

**O1 — Katman A: Yerel zaman-serili snapshot + kalıcı zayıflık tespiti (backend YOK):**
- Yeni `src/lib/mentorSnapshots.js`:
  - `recordSnapshot(now=Date.now())` — `getLearningAnalytics()` çıktısından KÜÇÜK
    bir özet (`{ ts, weakestRoute, weakestMastery, mostMissed: [{route, wrongCount}], quizAccuracy }`)
    türetip localStorage'da tarihli halka-tampona ekler (örn. son 60 snapshot,
    günde en fazla 1 — aynı gün tekrar çağrılırsa üstüne yaz). Anahtar kalıbı
    mevcut `progressStore` anahtarlarıyla tutarlı olsun.
  - `getPersistentWeakness(now)` — snapshot geçmişini tarayıp "kaç gündür / kaç
    snapshot'tır aynı konu zayıf/en-çok-hata listesinde" bilgisini döner:
    `{ route, pageTitle, daysStruggling, snapshotsSeen, trend: 'improving'|'worsening'|'stuck' }`.
    "2 haftadır XPath'te zorlanıyorsun" cümlesini besleyen ÇEKİRDEK budur.
  - Tamamen local-first, salt-okunur türetme ilkesi (`progressStore.js` yorumundaki
    ilke) korunur; yeni yazılan tek şey snapshot halka-tamponu.
- Snapshot'ı NE tetikler: uygulama açılışında (site girişi / HomePage mount) günde
  bir kez `recordSnapshot()` — Opus bunu HomePage mount'unda küçük bir efektle bağlar.

**O2 — Katman A deterministik öğüt motoru (AI'sız, herkese açık fallback):**
- `src/lib/mentorAdvice.js` → `buildLocalAdvice(persistentWeakness, analytics, language)`
  — kural tabanlı, bilingual şablon öğütler döndürür (örn. "X konusunda N gündür
  takılıyorsun → şu 3 alıştırma / şu prediction bloğu"). Zayıf konuyu ilgili
  route'a + o route'un pratik/prediction sekmesine link'ler. AI YOKKEN gösterilen
  budur; AI VARKEN bu, edge function'a "ipucu bağlamı" olarak da beslenir.

**O3 — Katman B: Supabase şeması + RPC (yalnızca cihaz-senkron için — opsiyonel):**
- `supabase/mentor_schema.sql` (SQL Editor'da elle çalışacak, §6.0 kalıbı):
  - `mentor_snapshots` tablosu: `user_id uuid references auth.users`, `ts timestamptz`,
    `payload jsonb` (O1'deki özet), `created_at`. RLS: kullanıcı yalnızca kendi
    `user_id`'sini SELECT/INSERT edebilir (`auth.uid() = user_id`).
  - (Ops.) `get_mentor_history(p_days int)` RPC (`security definer`) — kişisel
    veri sızdırmadan yalnızca çağıran kullanıcının snapshot'larını döndürür.
  - `grant execute ... to authenticated`. Migration repo'da tutulmaz; dosya başına
    "SQL Editor'da elle çalıştır" notu (mevcut iki şema dosyasındaki gibi).
- Client tarafı senkron: login olunca yerel snapshot'ları Supabase'e upsert eden +
  Supabase'den çekip yerelle birleştiren ince bir katman (`mentorSnapshots.js`
  içine `syncSnapshots()`); `isSupabaseConfigured && user` değilse hiç çağrılmaz.

**O4 — Katman B: `mentor-advice` edge function (üye-only, AI):**
- `supabase/functions/mentor-advice/index.ts` — `grade-interview-answer`'ı iskelet
  al: CORS + `supabase.auth.getUser()` üye kontrolü + `callGroq()` + JSON. Girdi:
  `{ persistentWeakness, analyticsSummary, recentSnapshots, lang }`. Sistem prompt'u:
  "Sen bir QA öğrenme koçusun; kullanıcının zayıflık verisine bakıp SOMUT, kısa,
  motive edici, aksiyon-odaklı bir öğüt üret (hangi konu, kaç gündür, sıradaki 2-3
  somut adım). Uydurma — sadece verilen veriye dayan." Çıktı katı JSON:
  `{ headline, diagnosis, actions: [{ label, route }], tone }`. Maliyet: tek çağrı,
  temperature düşük (0.3-0.5), `max_tokens` sınırlı. Secret: mevcut `GROQ_API_KEY`.
- Deploy'u SEN yaparsın (§6.2 adım 7); Opus yalnızca kodu ve deploy komutunu verir.

**O5 — Yeni React bileşeni (MentorPanel) — HomePage'e:**
- `src/components/MentorPanel.jsx` — `LearningAnalytics` panosunun stil/dark-mode/
  bilingual/mobil (44px touch target) kalıbını taklit eder. Akış: mount'ta
  `getPersistentWeakness()` + `buildLocalAdvice()` ile ANINDA (AI beklemeden) yerel
  öğüdü gösterir. **Proaktif davranış (karar §6.2-②):** HomePage açıldığında panel
  kendiliğinden öne çıkar/açık gelir (kullanıcı tıklamasını beklemez).
- **AI katmanı görünürlüğü (karar §6.2-③④):** "Daha derin analiz al" butonu ve AI
  çıktısı YALNIZCA `isSupabaseConfigured && user` (üye) iken render edilir; buton
  `mentor-advice` edge function'ını çağırır ve AI öğüdünü yerel öğüdün üstüne
  bindirir (progressive enhancement). Üye değilse bu buton/çıktı HİÇ gösterilmez
  (isteğe bağlı: "üye ol → AI koçu aç" ince teşviki gösterilebilir, AI çağrısı yok).
- Zayıflık yoksa / `hasData:false` ise panel hiç render edilmez (yeni ziyaretçiye
  gürültü olmasın — `LearningAnalytics` ile aynı davranış).
- **Yerleşim (karar §6.2-①):** HomePage'de, `LearningAnalytics` panosunun hemen
  ALTINA. `LearningAnalytics` "en zayıf konu"yu gösterir; MentorPanel onun üstüne
  "N gündür zayıf + sıradaki somut adımlar" katmanını ekler — ikisi doğal bir çift.

**O6 — Proaktif nudge (karar §6.2-②):**
- `src/components/MentorNudge.jsx` (veya mevcut bir global banner/toast kalıbı
  varsa onu kullan) — kullanıcı HomePage DIŞINDAKİ sayfalarda gezerken (ders/test
  sayfaları) `getPersistentWeakness()` kalıcı bir zayıflık döndürürse kapatılabilir
  bir banner/nav rozeti gösterir: "Mentorun seni bekliyor: X konusunda N gündür
  takılıyorsun →" ve HomePage'deki mentor bölümüne (anchor/`<Link to="/#mentor">`
  veya HomePage + scroll) yönlendirir. HomePage'de zaten panel öne çıktığından nudge
  orada gerekmez/gösterilmez. Kapatma durumu localStorage'da tutulur (aynı gün tekrar
  rahatsız etmez). Uygulama-içi YALNIZCA (e-posta yok). Yerel veriyle çalışır —
  üyelik gerektirmez.

**Opus doğrulama (§1.1 — her adımda):** `node --check` (dokunduğu her .js) →
`check-content-integrity.mjs` → `check-i18n-leaks.mjs` (baseline'ı BOZMA) →
`npm run build`. Bileşen bilingual, TR sızıntısı yok.

### 6.4. SONNET ne yapmalı — içerik, wiring cilası, testler

Opus çekirdeği kurduktan SONRA Sonnet devralır (yeni backend/mimari YAZMAZ — §9.2):

**S1 — Deterministik öğüt şablonlarını doldur/zenginleştir:** `mentorAdvice.js`'teki
`buildLocalAdvice` şablon havuzunu genişlet — her ana konu route'u için 2-3 bilingual,
somut, Java analojili (§15) öğüt metni ("XPath'te takıldın → önce `//` vs `/` farkını
şu prediction'da test et, sonra Locator Lab'da dene"). Metinler TR Türkçe / EN İngilizce
(§8); teknik terim İngilizce kalır. Tekrar yasağına (§9.4) dikkat.

**S2 — Bilingual arayüz metinleri + boş/yükleniyor/hata durumları:** `MentorPanel`'in
tüm string'lerini, AI çağrısı sırasındaki yükleniyor animasyonunu (§20 çizgi-film
ruhu, konfeti/parlama uygun yerde), AI hatası/timeout fallback'ini (sessizce yerel
öğüde düş) cilalar.

**S3 — E2E testleri (CI-guard'lı):** `tests/mentor-panel.spec.ts` (test edilen route
HomePage `/` — yeni route açılmadı, §22.1 istisna listesi değişmez):
- Yerel katman (üyeliksiz): seeded-localStorage ile zayıflık kur → HomePage `/`
  açıldığında MentorPanel'in doğru konuyu + "N gündür" ifadesini proaktif gösterdiğini
  doğrula (AI'sız, CI'da tam çalışır). Ayrıca bir ders sayfasında MentorNudge
  banner'ının belirdiğini ve HomePage mentor bölümüne link'lediğini doğrula.
- AI katmanı (üye-only): `describe`'ı `process.env.GITHUB_ACTIONS === 'true'` ile
  SKIP et (§23.8 — CI'da canlı Supabase auth reddediliyor); yerelde çalışır. Üye
  DEĞİLKEN AI butonunun/çıktısının GÖRÜNMEDİĞİNİ de doğrula (karar §6.2-③④).
- §22 buton-tıklanabilirlik kontrolü HomePage için korunur (mevcut HomePage
  testleriyle çakışmadığından emin ol).

**S4 — Snapshot mantığı için birim/smoke doğrulaması:** `getPersistentWeakness`'i
tarih-ötelenmiş seeded snapshot'larla test et (dün/1 hafta/2 hafta önce) →
`daysStruggling` ve `trend` doğru mu. `LearningAnalytics`'in seeded-localStorage
smoke testi (progressStore) buna örnek kalıptır.

**S5 — Dokümantasyon güncelle:** Bitince `NEXT_SESSION.md`'ye durum yaz, gerekirse
CLAUDE.md route haritasına (yeni route açıldıysa) + §22.1'e ekleme yap.

**Sonnet doğrulama:** her dosyadan sonra §1.1 dörtlüsü; her mantıklı parçadan sonra
ayrı commit (`feat(mentor): yerel snapshot tespiti`, `feat(mentor): AI öğüt edge
function`, `test(mentor): panel + snapshot testleri`).

### 6.5. Önerilen sıra (bağımlılık zinciri) ve "önce ne test edilir"

1. **Opus O1+O2** (yerel snapshot + deterministik öğüt) — backend YOK, tek başına
   değer verir, hemen test edilebilir. **İlk teslim edilebilir dilim bu.**
2. **Opus O5+O6** (MentorPanel `/qa-mentor` içinde + proaktif MentorNudge) +
   **Sonnet S1/S2/S4** — yerel + proaktif katman uçtan uca çalışır, üyelik hiç
   gerekmez. Buraya kadar merge edilebilir bir ürün var.
3. **Opus O3+O4** (Supabase şema + edge function) + **Sen §6.2 elle adımlar** —
   AI zenginleştirme ve cihaz-senkron (yalnızca üyelere görünür). Ayrı, sonraki dilim.
4. **Sonnet S3+S5** (testler + dok) — her dilimin ardından ilgili testler.

Bu sıra, "üyeliksiz de çalışan bir dilim önce biter" (§5 ilkesi) ve backend riskini
en sona bırakma prensibine uyar. 1-2 tamamlanınca kullanıcıya gösterilip AI
katmanına (3) geçmeden geri bildirim alınabilir.
