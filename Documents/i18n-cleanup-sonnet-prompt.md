# Sonnet Görevi: i18n EN-Sızıntısı Temizliği (Gerçek Borç: 365 → hedef minimum)

> Bu dosya Sonnet'e verilecek **hazır görev promptudur**. Opus, altyapıyı ve
> analizi tamamladı; burada senin (Sonnet) yapacağın **mekanik çeviri işi**
> tanımlı. Çift-ağaç yapısı, scanner ve baseline zaten doğru çalışıyor.

---

## 0. Bağlam — neyi düzeltiyorsun (ÖNEMLİ, önce oku)

Site sayfaları çift-ağaçlı veri dosyaları kullanır: `data.tr.sections` (TR modda
gösterilir) ve `data.en.sections` (EN modda gösterilir). `TopicPage` tüm ağacı
dile göre seçer (`data[language]`).

**Sızıntı (leak) = EN modunda görünen Türkçe metin**, yani `data.en` ağacında
kalmış Türkçe içerik. TR ağacındaki Türkçe DOĞRUdur, ona **dokunma**.

Scanner (`scripts/check-i18n-leaks.mjs`) artık **yalnızca EN ağacını** tarar ve
her sızıntıyı **fix önerisiyle etiketler**. Gerçek borç **365** sızıntıdır
(eskiden yanlışlıkla 8351 sayılıyordu — çoğu TR-ağacı yanlış-pozitifiydi, Opus
düzeltti). Senin işin bu 365'in **Sonnet-güvenli 258 tanesini** temizlemek.

---

## 1. Tek komut: sızıntıları etiketli listele

```bash
node scripts/check-i18n-leaks.mjs --list <dosyaAdı>.js
```

Örnek çıktı (her sızıntı = 3 satır: konum + snippet + **fix önerisi**):

```
  1. [code-playground] field=code sections[3].blocks[12].code
     "public class Main { ... // Türkçe yorum ..."
     → {TR,EN}: paylaşımlı blok ama renderer localize eder; { tr: <mevcut>, en: <İngilizce> } yap
```

Fix önerisi (`→` satırı) sana **tam olarak ne yapacağını** söyler. 4 tip vardır:

| Etiket | Ne demek | Ne yaparsın |
|--------|----------|-------------|
| **EN-ÇEVİR** | Alan zaten `{tr,en}`, `en` tarafı Türkçe | Sadece `en` değerini İngilizceye çevir. `tr`'ye dokunma. |
| **YERİNDE-ÇEVİR** | Blok yalnızca EN-ağacında (TR modda görünmez) | Türkçe metni İngilizceye çevir, **düz string bırak** (obje yapma). |
| **{TR,EN}** | Paylaşımlı blok, renderer dile göre basıyor | `field: '...'` → `field: { tr: '<mevcut Türkçe>', en: '<İngilizce çeviri>' }` |
| **⚠ OPUS / DOKUNMA** | Paylaşımlı + renderer HAM basıyor | **ASLA DOKUNMA.** `{tr,en}` yaparsan `[object Object]` render eder. Opus renderer işi. |

> **HAYATİ KURAL:** `⚠ OPUS ... DOKUNMA` etiketli hiçbir sızıntıya dokunma.
> Otomatik kontroller (`i18n:check`) bu hatayı YAKALAYAMAZ — leak sayısı düşse
> bile sayfa `[object Object]` basar. Bu 107 sızıntı Opus'a ayrılmıştır.

---

## 2. Somut örnek (Opus'un yaptığı — kalıbı buradan al)

`kafkaData.js` code-playground'ında paylaşımlı bir blok. **Önce:**

```js
starterCode: `// Hedef: yeni bir consumer group, topic'in TÜM gecmisini bastan okusun
props.put("auto.offset.reset", "?");`,
```

**Sonra ({TR,EN} etiketi olduğu için):**

```js
starterCode: {
  tr: `// Hedef: yeni bir consumer group, topic'in TÜM gecmisini bastan okusun
props.put("auto.offset.reset", "?");`,
  en: `// Goal: a new consumer group should read the ENTIRE history of the topic from the start
props.put("auto.offset.reset", "?");`,
},
```

TR yorumlar Türkçe kaldı, EN yorumlar İngilizce oldu, **kod (identifier/API) değişmedi**.

---

## 3. Çeviri kalite kuralları (CLAUDE.md §8 — bağlayıcı)

- **Sadece açıklama cümleleri ve yorumlar çevrilir.** Kod identifier'ları, API
  isimleri, komutlar, terminal çıktısı **aynı kalır**.
- **Yerleşik teknik terimler İngilizcedir** (zaten): `fixture`, `locator`,
  `assertion`, `selector`, `CI/CD`, `commit`, `SELECT`, `JOIN`, `PRIMARY KEY`…
- EN tarafında **hiç Türkçe kalmayacak** — ASCII-normalize Türkçe dahil
  (`gunceller`, `bakiyor`, `gecmisini` gibi özel karaktersiz Türkçe de çevrilir;
  scanner bunları yakalamaz, **elle dikkat et**).
- Çeviri **anlamı korumalı**, birebir kelime değil.

---

## 4. Dosya sırası ve hedefler

**Önce TAM temizlenebilen dosyalar** (tüm sızıntıları Sonnet-güvenli — bitince
`STRICT_ZERO`'ya eklenir), hafiften ağıra:

| Sıra | Dosya | Sonnet leak | Tam temiz? |
|------|-------|-------------|-----------|
| 1 | linuxData.js | 5 | ✅ |
| 2 | basitBackendData.js | 8 | ✅ |
| 3 | jmeterData.js | 10 | ✅ |
| 4 | playwrightData.js | 11 | ✅ |
| 5 | cypressData.js | 13 | ✅ |
| 6 | typescriptData.js | 13 | ✅ (applyTr — §5'e dikkat) |
| 7 | sqlData.js | 33 | ✅ |
| 8 | pythonData.js | 51 | ✅ (applyTr — §5'e dikkat) |

**Sonra kısmi dosyalar** (Sonnet payını temizle, OPUS leak'leri BIRAK):

| Dosya | Sonnet leak | OPUS (bırak) |
|-------|-------------|--------------|
| backendData.js | 24 | 7 |
| browserstackData.js | 27 | 14 |
| javaData.js | 63 | 86 |

---

## 5. Her dosya için iş akışı (ADIM ADIM)

1. `node scripts/check-i18n-leaks.mjs --list <dosya>.js` → sızıntı listesini al.
2. Her sızıntıyı **fix önerisine göre** düzelt. `⚠ OPUS` olanları **atla**.
3. `node --check src/data/<dosya>.js` → syntax doğrula (§23.2 escape hatası:
   tek-tırnak string'de apostrof `\'`, backtick içinde backtick kullanma).
4. `node scripts/check-i18n-leaks.mjs --list <dosya>.js` → kalan sızıntı sadece
   `⚠ OPUS` etiketliler mi? (Sonnet-güvenli olanların hepsi bitmiş olmalı.)
5. **Dosya TAM temizlendiyse** (OPUS leak yok): `scripts/check-i18n-leaks.mjs`
   içindeki `STRICT_ZERO_FILES` set'ine `'<dosya>.js'` ekle.
6. `node scripts/check-i18n-leaks.mjs --update-baseline` → borcu kalıcı düşür
   (`npm run i18n:baseline` de aynı şey).
7. `npm run build` → tam zincir geçmeli (SEO + content-integrity + i18n + vite).
8. Bir sonraki dosyaya geç.

> **applyTr dosyaları (typescriptData, pythonData):** bunlarda TR, EN'den
> `applyTr` ile türetilir (§23.4). Sen sadece `data.en` ağacındaki Türkçeyi
> çeviriyorsun — bu güvenli, ama düzenlemeden sonra `--list` ile TR ağacına
> yanlışlıkla dokunmadığını (yeni leak/regresyon çıkmadığını) doğrula.

---

## 6. Bitirdiğinde raporla

- Kaç dosya tam temizlendi, baseline kaça düştü (`node -e` ile toplamı yazdır).
- `STRICT_ZERO_FILES`'a hangi dosyalar eklendi.
- Kalan borç = **107 OPUS leak** (playwright-visual, locator-visual,
  error-dictionary codeWrong/codeFixed, backend-practice, java-compare) — bunlar
  Opus'un renderer işidir, sana ait değil.
- `NEXT_SESSION.md`'yi güncelle: hangi dosyalar temizlendi, kalan OPUS işi ne.

---

## 7. Yasak listesi (yapma)

- ❌ `⚠ OPUS / DOKUNMA` etiketli sızıntıya dokunmak.
- ❌ `data.tr` ağacındaki Türkçeyi çevirmek (o TR modda doğru).
- ❌ `EN-ÇEVİR`/`YERİNDE-ÇEVİR` etiketli alanı gereksiz yere `{tr,en}` objesine çevirmek.
- ❌ Kod identifier / API ismi / komut / terminal çıktısını çevirmek.
- ❌ Baseline'ı yükseltmek (`--update-baseline` sadece temizlikten SONRA, düşürmek için).
- ❌ `--list` çıktısındaki fix önerisini görmezden gelip kendi kararınla farklı bir şey yapmak.
