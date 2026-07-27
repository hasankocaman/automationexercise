# Öğrenme Bilimi Yükseltmesi — Plan (Prediction & Aktif Öğrenme Dalgası)

> Kaynak: Kullanıcının 2026-07-27 tarihli değerlendirme yazısı ("Siteyi önceki
> hâliyle kıyaslayarak tekrar değerlendirdim…"). Bu plan o yazıyı **birebir
> değil**, projenin mevcut durumuyla harmanlayarak ele alır. Branch:
> `feature/prediction-blocks`.

## 1. Yazının Değerlendirmesi — Gerçekle Kıyas

Yazıda 8 eksik sıralanıyor. Kodu inceledikten sonra her birinin **projedeki
gerçek durumu**:

| # | Yazıdaki eksik | Projedeki gerçek durum | Karar |
|---|----------------|------------------------|-------|
| 1 | **Prediction** ("çıktı ne? / compile olur mu?") | **Gerçek boşluk.** `quiz`, `challenge`, `feynman-checkpoint` var ama "önce tahmin et, sonra gör" (commitment → reveal) diye ayrı bir blok tipi YOKTU. | ✅ **Opus yaptı** (yeni `prediction` bloğu) + Sonnet yaygınlaştıracak |
| 2 | Kod yürütme animasyonu (for → i=0 → i=1…) | Kısmen var: `step-animation`, `trace`, `pytest-execution-visual`, `js-executor`. Genel "satır satır değişken durumu yürüyen" jenerik izleyici yok. | 🔷 Opus (yeni `code-trace` bileşeni) — bu daldan SONRA |
| 3 | Heap / Stack görselleştirme | `python-memory-visual` (Python değişkenleri), `data-structure` var; ama Java `new Person()` → Stack(reference) + Heap(object) modeli yok. | 🔶 Sonnet (mevcut `data-structure`/`python-memory-visual` verisini Java'ya genişletme) |
| 4 | Memory viz (ArrayList/HashMap/Queue/Stack animasyon) | `data-structure` + `python-collection-visual` blokları VAR ama az sayfada. | 🔶 Sonnet (veri yaygınlaştırma) |
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

### Görev S2 — Heap/Stack + Memory viz (feedback #3, #4) genişlet
Mevcut `data-structure` ve `python-memory-visual` bloklarını Java'ya yay: `new
Person()` → Stack(reference) + Heap(object) ayrımı, ArrayList/HashMap/Queue/Stack
animasyonlu kartları. Yeni bileşen YAZMA — önce mevcut blokların şemasını `--list`
ile incele, veri olarak ekle. (Mevcut bileşen yetmezse Opus'a bırak, uydurma.)

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

Her dosyadan sonra ZORUNLU (§1.1): `node --check src/data/<dosya>.js` →
`node scripts/check-content-integrity.mjs` → `node scripts/check-i18n-leaks.mjs`
→ `npm run build`. Dördü de geçmeden "bitti" deme. Parça parça ilerle, her
teknoloji sayfasından sonra ayrı commit at (`feat(prediction): java sayfası
tahmin blokları`). Bittiğinde `NEXT_SESSION.md`'yi güncelle.

---

## 5. Bu Dalga Kapsamı DIŞI (ayrı görevler)

- **#2 Kod yürütme izleyici (`code-trace`)** — yeni Opus bileşeni.
- **#5 Kişisel AI Mentor** — Supabase progress analitiği + hatırlatma; Opus + backend.
- **#6 Adaptif zorluk** — §18 yedek-soru altyapısı üstüne; ayrı Opus görevi.
- **#7 Learning Analytics dashboard** — agregasyon (Opus) + kart UI (Sonnet).
- **#8 Portföy/proje üretimi** — ayrı epik.
