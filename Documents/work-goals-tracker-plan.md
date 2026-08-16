# İş Hedefleri Altyapısı Planı — `/work-goals`

> **Durum:** 📝 Taslak, KOD YAZILMADI (2026-08-16 itibarıyla). Yazım: 2026-08-15.
>
> Bu plandan hiçbir dosya üretilmedi. Aynı oturumda öncelik QA Shop pratik
> ortamına verildi (`qa-shop-practice-platform-plan.md`) — gerekçe: kullanıcının
> yöneticisine göstereceği somut kanıt orada üretiliyor ve dönem sonuna ~4,5 ay
> kalmıştı.
>
> **Başlamadan önce Faz 0'daki üç sorunun cevabı gerekiyor** (ikisi yöneticiyle):
> KSF 2 ve 4'ün alt ağırlık kırılımı, M4.2'nin sayısal hedefi, ve M2.1'in
> paydası ("yazdığı manuel senaryolar" bu dönem yazılanlar mı, devralınan
> havuz da dahil mi). Üçüncüsü bilinmeden hiçbir oran hesaplanamaz.
>
> Erişim katmanı kararı verildi ve gerekçesi `access-tiers-plan.md` §6'da:
> sayfa 🔴 **admin** olacak — veri zaten yerel olduğu için değil, sayfanın
> **içeriği** (işverenin KPI metni) boş bir sayfada bile yayınlanacağı için.
> **Kapsam:** Kullanıcının işyeri performans hedeflerini (2026, 4 KSF) bu
> platformda ölçülebilir, kanıtlanabilir ve *desteklenebilir* kılan altyapı.
> **Ön koşul:** Bölüm 2'deki ağırlık kırılımı yöneticiyle teyit edilmeli —
> uygulama bunu ayarlanabilir yapar ama varsayılanlar bizim yorumumuzdur.

---

## 0. Bu altyapı ne YAPAR, ne YAPMAZ (dürüst çerçeve)

Uygulama işi senin yerine yapamaz. Yapabileceği üç şey var ve üçü de gerçek:

| Yapar | Nasıl |
|---|---|
| **Ölçer** — hedefin bugün yüzde kaçında olduğunu her an gösterir | Atomik kanıt kayıtlarından türetilen skor motoru (Bölüm 3-4) |
| **Erken uyarır** — takvim temposuyla ilerleme temposunu karşılaştırır | "Yılın %62'si geçti, endpoint hedefinin %31'i tamam" (Bölüm 5.1) |
| **Öğretir + hızlandırır** — her hedefin gerektirdiği beceriyi besleyen lab | Mevcut ders sayfalarına eklenen 6 lab (Bölüm 7) |
| **Kanıt paketler** — değerlendirme görüşmesine hazır aylık rapor | Markdown/CSV dışa aktarım, her satır Jira key/PR linkiyle (Bölüm 6) |

**Yapmaz:** Resmî değerlendirme bu uygulama değildir. Hedef tablosundaki
ölçüm yöntemi *"Test Yönetim Aracı / Proje Yönetim Aracı Aylık Raporlar"* —
yani resmî kaynak Jira/Azure DevOps. Bu yüzden altyapının tek bir tasarım
kuralı var ve pazarlık edilemez:

> **Her kanıt kaydı, resmî raporda çapraz doğrulanabilir bir referans
> taşımalıdır** (Jira issue key, PR/MR linki, pipeline run no). Referanssız
> kayıt silinmez ama **ayrı sayılır** ve raporda "doğrulanamaz" olarak
> görünür. Böylece görüşmede asla fazla iddia etmezsin.

---

## 1. Hedeflerin makineye okunabilir hâli

Tablodan birebir alınan resmî tanım:

| # | KSF | Birim | Tip | Hedef | Ağırlık |
|---|-----|-------|-----|-------|---------|
| 1 | Test Yönetim Araçlarına Uyum | % | + | 100 | 20 |
| 2 | Manuel Senaryoların Otomasyona Kazandırılması | % | + | 100 | 30 |
| 3 | API Test Otomasyonu (30 Endpoint) | Adet | + | 30 | 20 |
| 4 | Otomasyon Test Geliştirme ve Debug Desteği | Adet | + | 36 | 30 |

Sorun şu: 2 ve 4 numaralı hedefler **bileşik**. KPI metni tek bir yüzde
istiyor ama içinde birbirinden bağımsız 4 (ve 2) yükümlülük var. Tek bir
"%" alanı bunları ölçemez — bu yüzden altyapı her KSF'yi alt metriklere
böler.

---

## 2. Alt metrik kırılımı ve formüller

> ⚠️ **Ağırlık dağılımı bizim yorumumuz.** KPI metni alt ağırlık vermiyor.
> Aşağıdaki dağılım savunulabilir bir okuma ama **yöneticiyle teyit
> edilmeli**. Uygulama `settings.weightsOverride` ile bunu değiştirilebilir
> tutar; teyit gelince tek satır değişir, kod değişmez.

### KSF 1 — Test Yönetim Araçlarına Uyum (20 puan)

| Kod | Metrik | Formül | Hedef | Puan |
|-----|--------|--------|-------|------|
| M1.1 | Senaryo ↔ araç bağlanma oranı | `bağlıSenaryo / toplamSenaryo` | 1.00 | 14 |
| M1.2 | Git workflow hakimiyeti | `kanıtlıMadde / 8` (rubrik) | 1.00 | 6 |

**M1.2 rubriği** (her madde bir kanıt linki ister — "biliyorum" demek
yetmez):
1. Feature branch adlandırma standardına uygun ≥10 branch
2. Rebase ile lineer geçmiş tutulmuş ≥3 PR
3. Merge conflict'i tek başına çözülmüş ≥3 vaka
4. PR review'de verilmiş ≥10 yorum
5. `git bisect` veya `git log -S` ile bir regresyonun kaynağı bulunmuş
6. Yanlış commit'ten `revert`/`reset` ile dönülmüş bir vaka
7. Commit mesajı standardı (issue key referanslı) ≥20 commit
8. Tag/release veya cherry-pick ile hotfix akışına katılım

### KSF 2 — Manuel Senaryoların Otomasyona Kazandırılması (30 puan)

| Kod | Metrik | Formül | Hedef | Puan |
|-----|--------|--------|-------|------|
| M2.1 | Otomasyona kazandırma oranı | `otomatikSenaryo / yazılanManuelSenaryo` | 0.40–0.50 bandı | 12 |
| M2.2 | Pipeline entegrasyonu | `min(pipelineSayısı / 2, 1)` | 2 (ilk 3 ay) | 6 |
| M2.3 | Sprint başına SQL doğrulaması | `uyumluSprint / toplamSprint` | 1.00 | 6 |
| M2.4 | Log analiziyle kök neden | `logKökNedenli / bulunanBug` | 0.70 | 6 |

**M2.1 band kuralı:** hedef bir aralık ("%40-50"), tek nokta değil. Skor
`min(oran / 0.40, 1)` — yani %40 tam puandır, üstü bonus değil. Arayüz yine
de bandın neresinde olduğunu gösterir (%43 → "band içinde, alt sınırın 3
puan üstü").

**M2.2 zamanlama:** hedef metni "ilk 3 ayda" diyor. `deadline =
periodStart + 3 ay`. Varsayılan davranış **yumuşak**: gecikme puanı
düşürmez ama panelde kırmızı bayrak çıkar. `settings.deadlineIsHard = true`
yapılırsa deadline'dan sonra eklenen pipeline puana sayılmaz. CI/CD'si
olmayan projeler için `kind: 'local-trigger'` kaydı **tam sayılır** — KPI
metni bu istisnayı açıkça veriyor.

**M2.3 en kritik incelik:** "her sprintte en az 10" bir **yıllık toplam
değildir**. 6 sprintte 60 sorgu yazmış olmak, sprintlerden ikisi 3'te
kaldıysa hedefi tutturmaz. Bu yüzden metrik sprint sprint uyum sayar. Bunu
yanlış modellemek en kolay hata olurdu ve raporda sessizce fazla iddia
üretirdi.

**M2.4 payda tanımı:** "bulunan hatalar" = *senin* bulduğun buglar. Başkasının
açtığı bug'ın kök nedenini bulmak sayaca ekstra girer ama paydayı şişirmez.

### KSF 3 — API Test Otomasyonu (20 puan)

| Kod | Metrik | Formül | Hedef | Puan |
|-----|--------|--------|-------|------|
| M3.1 | Otomatik test edilen endpoint | `min(endpointSayısı / 30, 1)` | 30 | 20 |

**Tekilleştirme kuralı:** anahtar `METHOD + normalize(path)`. `GET /users/42`
ile `GET /users/99` **aynı** endpoint (`GET /users/{id}`); `GET /users` ile
`POST /users` **farklı**. Aynı endpoint'e ikinci test yazmak sayacı artırmaz —
yoksa 30'a ulaşmak kolaylaşır ama hedef anlamını kaybeder.

### KSF 4 — Otomasyon Test Geliştirme ve Debug Desteği (30 puan)

| Kod | Metrik | Formül | Hedef | Puan |
|-----|--------|--------|-------|------|
| M4.1 | Yeni test case | `min(testCase / 36, 1)` | 36 | 22 |
| M4.2 | Debug/selector desteği | `min(kayıt / 12, 1)` | 12 | 8 |

⚠️ **M4.2'nin hedefi (12) KPI metninde YOK** — metin "katkı sağlamak" diyor,
sayı vermiyor. 12 = ayda ~1 belgelenmiş katkı; savunulabilir ama uydurma.
Yöneticiyle teyit edilecek listenin başında bu var.

**Toplam:** 14+6 + 12+6+6+6 + 20 + 22+8 = **100 puan**.

---

## 3. Veri modeli

Tek localStorage anahtarı: `learnqa_work_goals`. Projede kanıtlanmış kalıp
(`sprintStore.js`, `skillSignals.js`) birebir izlenir.

```js
{
  version: 1,
  settings: {
    periodStart: '2026-01-01',
    periodEnd:   '2026-12-31',
    deadlineIsHard: false,
    privacyMode: false,        // true → referans alanları hiç saklanmaz
    weightsOverride: null,     // yönetici teyidi gelince buraya
  },
  sprints:      [{ id, name, start, end }],
  scenarios:    [{ id, ts, sprintId, title?, ref?, linkedToTool: bool, automated: bool }],
  pipelines:    [{ id, ts, name, kind: 'ci'|'local-trigger', firstGreenDate, ref? }],
  sqlChecks:    [{ id, ts, sprintId, purpose, ref? }],
  bugs:         [{ id, ts, sprintId, rootCauseFromLogs: bool, ref? }],
  endpoints:    [{ id, ts, method, path, testRef?, ref? }],
  testCases:    [{ id, ts, sprintId, suite?, ref? }],
  debugAssists: [{ id, ts, kind: 'xpath'|'css'|'other', before?, after?, ref? }],
  gitRubric:    { [maddeId]: { done: bool, ref?, ts } }
}
```

### 3.1. Tek doğruluk noktası kararı

`scenarios` defteri **hem M1.1 hem M2.1**'i besler (`linkedToTool` ve
`automated` aynı satırda). İki ayrı defter tutulsaydı aynı senaryo iki yere
yazılır ve kaçınılmaz olarak birbirinden kayardı — projenin daha önce
`applyTr` ve portfolyo tarafında ödediği bedelin aynısı (CLAUDE.md §23.4).

Aynı ilke skor için de geçerli: **hiçbir yerde hesaplanmış yüzde
saklanmaz.** `workGoalsScore.js` her render'da defterlerden yeniden türetir
(`portfolioSnapshot.js` kalıbı: saf okuma, yan etkisiz, bozuk
localStorage'da bile çökmez).

### 3.2. Gizlilik kararı

Bu defterler **işveren verisi** taşır (issue key, endpoint path, bug
başlığı). Kurallar:

- Veri **yalnızca tarayıcıda** (`localStorage`) durur. Supabase'e **asla**
  yazılmaz, analytics'e **asla** gönderilmez, sunucuya hiçbir istek çıkmaz.
- `privacyMode: true` → `ref`, `title`, `path`, `before/after` gibi serbest
  metin alanları **hiç kaydedilmez**, yalnızca sayaçlar tutulur. Skor aynen
  çalışır; sadece "doğrulanabilir kanıt" sayısı 0 kalır.
- Dışa aktarım kullanıcının indirdiği bir dosyadır; hiçbir yere post edilmez.
- Sayfaya kalıcı bir uyarı satırı: gizli/müşteri verisi yapıştırma, issue
  key ve link yeterli.

---

## 4. Skor motoru

```
metrikSkoru  = clamp(gerçek / hedef, 0, 1)          // Orantı Tipi "+" olduğu için
ksfSkoru     = Σ (altMetrikPuanı × metrikSkoru)
toplamSkor   = Σ ksfSkoru                            // 0-100
```

Üç ek çıktı, panelin asıl değeri bunlarda:

1. **Doğrulanabilirlik oranı** — `refliKayıt / toplamKayıt`. Rapor iki sayı
   birden basar: "30/30 endpoint (28'i referanslı)".
2. **Tempo farkı** — Bölüm 5.1.
3. **Risk bayrakları** — deadline geçmiş pipeline, ardışık 2 sprint SQL
   uyumsuzluğu, hiç kayıt girilmemiş 30+ gün.

---

## 5. Sayfa mimarisi — `/work-goals`

Bu bir ders sayfası **değil**; `/portfolio` ve `/sprint` gibi kendi
bileşeni olan bir araç sayfası. `TopicPage`/`blocks` şeması kullanmaz, bu
yüzden §9.5 (her sekmede video+animasyon+sandbox) kapsamına **girmez** —
ama §20 (canlı, animasyonlu arayüz) aynen geçerlidir.

**Sekmeler (sol dikey sidebar, §8):**

| Sekme | İçerik |
|-------|--------|
| 📊 Panel | 4 KSF kartı + ağırlıklı skor halkası + tempo şeridi + risk bayrakları |
| 📒 Defterler | 7 defter, her birinde tek satırlık hızlı ekleme formu |
| 🏃 Sprintler | Sprint listesi; sprint başına SQL/bug uyum rozeti |
| 📤 Rapor | Aylık rapor önizleme + Markdown/CSV indirme |
| 🔗 Kaynaklar | Her KSF'yi besleyen ders sayfası ve lab linkleri (Bölüm 7) |

### 5.1. Tempo şeridi — panelin en değerli parçası

```
beklenenİlerleme = geçenGün / toplamGün        // takvimin yüzdesi
tempoFarkı       = metrikSkoru - beklenenİlerleme
```

- `≥ 0` → yeşil ("önde")
- `-0.10 … 0` → sarı ("takvime yakın")
- `< -0.10` → kırmızı ("geride, şu kadar kayıt açığın var")

Kırmızıda uygulama **somut açığı** yazar: "36 test case hedefinde takvime
göre 21 olmalıydı, 9 var — 12 kayıt geride." Yıl sonunda sürpriz yaşamamanın
tek yolu bu; skor tablosu tek başına bunu söylemez.

---

## 6. Aylık rapor dışa aktarımı

Resmî ölçüm aylık raporlar olduğu için çıktı o ritme göre üretilir.
`toMarkdown()` (portfolyodaki kalıp) + CSV.

```markdown
# İş Hedefleri — 2026 / Ağustos

## Özet
Ağırlıklı skor: 46 / 100 · Takvim: %62 · Tempo: -16 puan (geride)

## KSF 3 — API Test Otomasyonu (20 puan → 9.3)
14 / 30 endpoint (13'ü referanslı)
| Method | Path          | Test        | Referans |
|--------|---------------|-------------|----------|
| GET    | /users/{id}   | UserApiTest | PROJ-412 |
...

## Doğrulanamayan kayıtlar
3 kayıt referanssız — resmî raporda karşılığı gösterilemez.
```

Rapor **uydurma sayı üretmez**: bir metrikte hiç kayıt yoksa "0" değil
"kayıt girilmedi" yazar (portfolyodaki dürüstlük ilkesinin aynısı — ölçülmemiş
ile sıfır aynı şey değildir).

---

## 7. Hedefleri *besleyen* lab'lar (mevcut sayfalara eklenir)

Takip altyapısı hedefi ölçer; asıl hızlandırma bunlarda. Hepsi mevcut
sayfalara **veri olarak** eklenir, yeni sayfa açılmaz.

| Lab | Nereye | Hangi hedefi besler |
|-----|--------|---------------------|
| **İzlenebilirlik kiti** — JQL + Xray/Zephyr REST çağrısıyla "test yönetim aracına bağlanmamış senaryolar" raporu | `/jira` | M1.1 — oranı elle saymak yerine **sorgudan** çıkarır |
| **Git workflow rubriği** — 8 maddenin her biri için gerçek komut akışı ve kanıt üretme yolu | `/git-github` | M1.2 |
| **SQL veri doğrulama kütüphanesi** — 20+ hazır kalıp: satır sayısı mutabakatı, öksüz FK, duplicate key, tarih tutarlılığı, null oranı, tutar toplamı | `/sql` | M2.3 — sprint başına 10 sorgu bu kütüphaneden türetilir |
| **Log analizi → kök neden akışı** — grep/awk kalıpları, stack trace okuma, correlation-id takibi, CI log'unda ilk kırılma noktasını bulma | `/linux` + `/jenkins` | M2.4 |
| **30 Endpoint kampanya iskeleti** — REST Assured ve Playwright API için kopyalanabilir starter + endpoint envanteri şablonu | `/rest-assured` + `/api-testing` | M3.1 |
| **Selector Doctor** — kırık XPath/CSS yapıştır, tanı listesi al (dinamik id, index bağımlılığı, iframe, shadow DOM, gevşek `contains()`) | `/selenium` + `/qa-frontend` | M4.2 |

**Kısıt:** bu lab'lar mevcut blok tipleriyle yazılır (`code-playground`,
`table`, `step-animation`, `python-flow-diagram`). Selector Doctor tek
istisna — girdi alan yeni bir bileşen gerekir, ayrıca planlanmalı.

---

## 8. Faz planı

### Faz 0 — Teyit (kod yok)
- Yöneticiyle: KSF 2 ve 4'ün alt ağırlık kırılımı, M4.2'nin sayısal hedefi,
  deadline'ın sert mi yumuşak mı olduğu.
- Kendi tarafında: dönem başlangıcı, sprint uzunluğu, mevcut manuel senaryo
  sayısı (M2.1'in paydası — bu bilinmeden oran hesaplanamaz).

**Çıktı:** `settings` varsayılanları netleşir. Teyit gecikirse Faz 1
varsayılanlarla ilerler, sonradan tek satır değişir.

### Faz 1 — Çekirdek (skor + panel)
- `src/data/goalsData.js` — KSF şablonu + iki dilli arayüz metinleri
- `src/lib/workGoalsStore.js` — okuma/yazma/subscribe, tek anahtar
- `src/lib/workGoalsScore.js` — saf türetme, yan etkisiz
- `src/components/WorkGoalsPage.jsx` — Panel + Defterler sekmesi
- Wiring (Bölüm 9)

**Kabul:** 4 KSF kartı doğru puan basıyor; boş durumda çökmüyor ve "kayıt
girilmedi" diyor; bir endpoint eklenince skor 20/30 → 20×(1/30) kadar artıyor.

### Faz 2 — Sprint + doğrulanabilirlik
- Sprint defteri ve sprint başına uyum hesabı (M2.3)
- `ref` alanı ve "doğrulanamaz kayıt" ayrımı
- Tempo şeridi ve risk bayrakları
- `privacyMode`

**Kabul:** 2 sprint (biri 12, biri 4 SQL) → M2.3 = 0.50. Referanssız kayıt
skoru etkilemiyor ama ayrı sayaçta görünüyor.

### Faz 3 — İçe aktarma + rapor
- Jira/Xray CSV veya JQL sonucu **yapıştır → defter doldur**
- Aylık Markdown + CSV dışa aktarım

**Neden önemli:** self-report en zayıf halka. İçe aktarma, M1.1 ve M3.1'i
elle sayılan bir şeyden **resmî kaynaktan türetilen** bir şeye çevirir.

**Kabul:** 20 satırlık örnek Jira CSV'si yapıştırılınca senaryo defteri
doluyor, tekilleştirme çalışıyor, hatalı satırlar sessizce yutulmayıp
raporlanıyor.

### Faz 4 — Lab'lar
Bölüm 7'deki altı lab, sırayla. Her biri kendi başına değerli, sıra
serbest; önerilen sıra hedef ağırlığına göre: SQL kütüphanesi → 30
endpoint iskeleti → log analizi → izlenebilirlik kiti → Git rubriği →
Selector Doctor.

---

## 9. Wiring kontrol listesi (yeni route eklerken atlanamaz)

| Dosya | Ne eklenecek |
|-------|--------------|
| `src/App.jsx` | `React.lazy` import + `<Route path="/work-goals">` |
| `src/utils/seo.js` | `ROUTE_SEO` girişi — **EN + TR metadata zorunlu** (§6) ve **`noindex: true`** |
| `scripts/generate-static-routes.mjs` | statik kabuk (noindex robots ile) |
| `tests/work-goals.spec.ts` | gerçek test — `check-test-coverage.mjs` istisnası **yazılmayacak** |
| `src/components/HomePage.jsx` | nav linki — **opsiyonel**, kullanıcı kararı |

**Bilinçli olarak yapılmayacaklar:**
- Görünür site haritasına (`whatIsTestingData.js`) **eklenmez** — kişisel
  araç, `noindex` ile tutarlı olmalı.
- `topicDataModules.mjs`, `masteryManifest`, mülakat/showcase script'lerine
  **girmez** — ders sayfası değil.
- `progressStore`/XP sistemine **bağlanmaz** — iş hedefleri öğrenme
  ilerlemesi değildir, karıştırmak ikisini de bozar.

⚠️ **Doğrulanacak risk:** `check-dist-seo.mjs`'teki öksüz sayfa kontrolü
`noindex` sayfaları kapsıyorsa build kırılır. Faz 1'de ilk build'de
görülür; kapsıyorsa `noindex` sayfalar kontrolden muaf tutulur.

---

## 10. Test planı

| Test | Doğrular |
|------|----------|
| Boş durum render | Çökme yok, "kayıt girilmedi" mesajı, uydurma 0 yok |
| Skor aritmetiği | 15/30 endpoint → KSF 3 = 10.0 puan |
| Sprint uyumu | 2 sprint (12 / 4 SQL) → M2.3 = 0.50 |
| Band kuralı | %42 otomasyon → M2.1 tam puan; %20 → yarım |
| Tekilleştirme | `GET /users/1` + `GET /users/2` → 1 endpoint |
| Doğrulanabilirlik | Referanssız kayıt skoru değiştirmiyor, ayrı sayaçta |
| Gizli mod | `privacyMode` açıkken localStorage'da serbest metin yok |
| Dışa aktarım | Markdown iniyor, içinde ölçülmemiş metrik "0" olarak geçmiyor |
| i18n | EN modda Türkçe sızıntısı yok (`i18n-content-toggle` kalıbı) |
| Jargon | `no-internal-jargon` — arayüzde plan/faz kodu yok (§24) |

Ayrıca her fazdan sonra CLAUDE.md §1.1 dörtlüsü: `check-content-integrity`,
ipucu-konu bağı, TR yorum taraması, `npm run build`.

---

## 11. Karar bekleyen sorular

1. **Ağırlık kırılımı** — KSF 2'nin 30 puanı 12/6/6/6 mı? KSF 4'ün 30 puanı
   22/8 mi? (Yönetici teyidi)
2. **M4.2 hedefi** — "debug katkısı" için 12 kayıt makul mü, yoksa sayı yerine
   sadece "yapıldı/yapılmadı" mı?
3. **M2.1 paydası** — "yazdığı manuel senaryolar" yalnızca bu dönem yazılanlar
   mı, yoksa devraldığın mevcut senaryo havuzu da dahil mi? İkisi çok farklı
   sonuç verir.
4. **Sayfa herkese açık mı?** Şu anki tasarım: `noindex` ama URL'i bilen
   herkes kendi hedefleri için kullanabilir (veriler kendi tarayıcısında).
   Alternatif: `RequireAdmin` ile tamamen kapatmak.
5. **Dönem** — 2026 takvim yılı mı, işe başlama tarihinden 12 ay mı? M2.2'nin
   3 aylık deadline'ı buna bağlı.
