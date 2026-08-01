# Portfolio Builder Planı — `/portfolio`

> **Bu plan `Documents/challenge-first-experience-plan.md` §6'daki "Portfolio
> Generator (#8)" epiğini YENİDEN TANIMLAR.** Eski tanım: *"mini framework →
> POM → API test → CI → push → paylaşılabilir portfolyo; backend + git
> entegrasyonu ister"*. O tanım bilinçli olarak Phase 4'e park edilmişti çünkü
> yeni bir yüzey/özellik yığınıydı — kullanıcının kendi stratejik yazısının
> uyardığı "özellik sayısı, derinlik değil" tuzağı.
>
> **Yeni tanım: Portfolio bir GENERATOR değil, bir AGGREGATOR'dür.** Kullanıcı
> için yeni bir şey üretmez, ZATEN ürettiklerini toplayıp görünür kılar.
> Backend yok, git entegrasyonu yok, yeni sandbox yok. Bu hâliyle epik değil,
> mevcut derinliğin aynasıdır — ve challenge-first zincirinin (görev → sprint
> → **portfolyo**) eksik kalan tek halkasıdır.
>
> Branch: `feature/portfolio-builder` (`main`'den, `6ab2254` üstünde).
> İlgili planlar: `challenge-first-experience-plan.md` (mission primitifi),
> `sprint-simulator-and-open-items-plan.md` (sprint verisi),
> `career-map-feature-plan.md` (milestone/rozet verisi).

---

## 1. Neden bu iş — ve neden ŞİMDİ

Site bugün kullanıcıya gerçek şeyler yaptırıyor: 18 mission (görev zinciri), 6
sprint bug'ı, 29 sayfada quiz/mülakat ustalığı, beceri sinyalleri, milestone
rozetleri, streak. **Ama bunların hiçbiri tek bir yerde "işte yaptıkların"
diye durmuyor.** Kullanıcı `/qa-mentor`'da yol haritasını, `/leaderboard`'da
XP'sini, her ders sayfasında o sayfanın ilerlemesini ayrı ayrı görüyor.

Portfolyo bu dağınıklığı bir çıktıya dönüştürür — ve öğrenme açısından asıl
değeri şu: **kanıt görmek motivasyonu ilerleme çubuğundan daha iyi besler.**
"Sayfanın %62'sini bitirdin" ile "Selenium'da POM refactor'ünü, Cypress'te
network stub'ını ve LQA-103 yarış-durumu bug'ını kapattın" arasındaki fark,
soyut yüzde ile somut eser arasındaki farktır.

**Zincirdeki yeri:** görev (Phase 1) → sprint (Phase 2) → **portfolyo (bu
plan)**. Zincirin sonunda bir çıktı yoksa, sprint kapatmak da bir sayaç
artırmaktan ibaret kalır.

---

## 2. Tasarım İlkeleri (bağlayıcı)

1. **Türet, tutma.** Portfolyo KENDİ ilerleme state'ini TUTMAZ. Her render'da
   mevcut depolardan yeniden hesaplanır. İkinci bir tamamlanma state'i
   kaçınılmaz olarak drift üretir (CLAUDE.md §23.4; `sprintStore.js`'in
   başındaki not aynı dersi anlatır).
   - **Tek istisna:** kimlik alanı (§4.1) — ilerleme verisi değil, kullanıcının
     kendi yazdığı ad/unvan. Gerekçesi ve sınırı §4.1'de.
2. **Frontend-only / local-first.** Backend yok, Supabase yok, üyelik ön koşul
   değil (CLAUDE.md §5). Üye kullanıcı için ekstra bir şey yapmaz — anonim
   kullanıcıyla birebir aynı deneyim.
3. **Yeni bileşen/sandbox YAZMA.** Mevcut bileşenler yeniden kullanılır
   (`TopicHeader`, `ConfettiExplosion`, `TooltipGuideMascot`, `SkillRadar`
   deseni). Yeni bir renderer icat edilmez.
4. **`TopicPage.jsx` quiz motoruna DOKUNULMAZ.** Portfolyo salt-okurdur;
   quiz/mission akışına hiçbir müdahalesi yoktur.
5. **Paylaşılan dosyalara dokunuluyorsa varsayılan davranış birebir korunur**
   (opsiyonel props deseni — `TooltipGuideMascot`'un `emphasizedSize` eklemesi
   referans kalıp: varsayılan `= size`, yani hiçbir mevcut çağrı etkilenmez).
6. **`src/` içinde TypeScript YOK.** GSAP / Framer Motion / dış drag-drop /
   dış kod editörü kütüphanesi YOK. Sadece Tailwind + inline SVG/CSS.
7. **İki dilli `{tr, en}` + STRICT_ZERO.** Metinler `src/data/portfolioData.js`
   dosyasında toplanır (§3.4'teki scanner kısıtı).
8. **Dürüstlük.** Portfolyo sahte kanıt üretmez. "Bu veriler bu tarayıcıda
   saklanan yerel ilerlemenden üretildi" notu sayfada ve export'ta görünür
   olmalıdır — portfolyo bir sertifika değil, bir çalışma günlüğüdür.
9. **WCAG AA kontrast**, token-tabanlı warm/natural palet, mobil öncelikli
   (CLAUDE.md §12).

---

## 3. Mimari — verinin nereden geldiği

### 3.1. ⚠ KRİTİK BULGU — `xp.js` route-kapsamlıdır, portfolyo sayfasında ÇALIŞMAZ

Bu, planın en önemli teknik maddesi. Uygulamaya başlamadan önce okunmalıdır.

[`src/lib/xp.js`](../src/lib/xp.js) depolama anahtarını **bulunulan sayfanın
URL'inden** türetir:

```js
function getTopicKey() {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
    return (firstSegment || 'python')...
}
function getStorageKey() { return `learnqa_xp_${getTopicKey()}` }
```

Yani `getCompletedExercises()` **yalnızca o an bulunulan route'un** tamamlanmış
egzersizlerini döndürür. `/portfolio` sayfasında çağrılırsa
`learnqa_xp_portfolio` anahtarını okur — **her zaman boş.**

Bunun doğrudan sonucu: [`src/lib/sprintStore.js`](../src/lib/sprintStore.js)
içindeki `getBugStatus()`, `isSprintComplete()`, `getSprintProgress()`
fonksiyonlarının hepsi `getCompletedExercises()` üstüne kurulu. **Portfolyo
sayfasından çağrılırlarsa hata vermeden, sessizce "hiçbir bug kapatılmamış"
derler.** Bu sessiz yanlışlık, testle yakalanmazsa fark edilmez.

**Çözüm (O1'de uygulanacak):**
- `xp.js` ve `sprintStore.js` **DEĞİŞTİRİLMEZ.** Route-kapsamlılık bir bug
  değil, tasarım kararı — her ders sayfası kendi XP havuzunu tutuyor ve tüm
  site buna bağımlı.
- Yeni util (`portfolioSnapshot.js`) **tüm `learnqa_xp_*` anahtarlarını tarayıp**
  global bir "tamamlanmış egzersiz id" kümesi kurar. Bu tarama deseni zaten
  projede var ve kanıtlanmış: `progressStore.getTotalXp()` aynısını yapıyor
  (`localStorage.key(i)` döngüsü + `XP_KEY_PREFIX` filtresi).
- Sprint/mission durumu bu global kümeye karşı değerlendirilir; `sprintStore`
  fonksiyonları portfolyodan **çağrılmaz**.

### 3.2. Veri kaynağı envanteri

Aşağıdaki API'lerin hepsi mevcut ve doğrulandı. Yeni depo yazılmayacak.

| Veri | Kaynak | Global mi? | Not |
|------|--------|-----------|-----|
| Toplam XP | `progressStore.getTotalXp()` | ✅ tüm `learnqa_xp_*` taranır | Doğrudan kullanılabilir |
| Tamamlanan ders route'ları | `progressStore.getCompletedRoutes()` | ✅ tek anahtar | |
| Route başına ustalık | `progressStore.getMastery(route)` | ✅ | `null` = hiç başlanmamış (0 DEĞİL) |
| Beceri kategorileri | `progressStore.getSkillRadarData()` | ✅ | 6 eksen, `value: null` = veri yok |
| Mülakat AI puanı | `progressStore.getInterviewStats(route)` | ✅ | `{avgPercent, gradedAt}` |
| Quiz doğruluğu / en güçlü-zayıf | `progressStore.getLearningAnalytics()` | ✅ | `hasData` bayrağı boş durum için hazır |
| Çözülen görev (mission) sinyalleri | `skillSignals.getSkillSignals()` | ✅ tek anahtar | `{missionId, route, skill, ts}` — **zaman damgası var**, kronoloji için tek kaynak |
| Streak / günlük aktivite | `activityLog.getStreak()`, `getActivityStats()` | ✅ | |
| Tekrar kuyruğu / en çok hata | `reviewQueue.getQueueStats()`, `getMostMissedAreas()` | ✅ | |
| Kariyer haritası profili | `careerMapProfile.readMentorProfile()` | ✅ | Yoksa o bölüm gizlenir |
| Milestone rozetleri | `careerMapMilestones.getEarnedMilestones(nodes, routes)` | ✅ | Profil gerektirir |
| **Tamamlanmış egzersiz/mission id'leri** | ⚠ `xp.getCompletedExercises()` | ❌ **ROUTE-KAPSAMLI** | §3.1 — yeni tarayıcı util gerekir |
| **Sprint bug durumu** | ⚠ `sprintStore.getBugStatus()` | ❌ **ROUTE-KAPSAMLI** | §3.1 — yeni util `sprintsData` + global küme ile hesaplar |
| Mission tanımları (başlık/beceri) | `src/data/*Data.js` içindeki `mission` blokları | — | §3.3 |

### 3.3. Mission kataloğu problemi ve çözümü

18 mission var (`node scripts/audit-learning-blocks.mjs` → `mission: 18`), ama
bunlar 7 farklı veri dosyasına dağılmış `blocks` dizilerinin içinde gömülü:
`seleniumData`, `playwrightData`, `cypressData`, `pythonData`, `sqlData`,
`restAssuredData` (12 ders görevi) + `sprintsData` (6 bug görevi).

`skillSignals` bize sadece `missionId` ve `route` veriyor — **başlık yok.**
Portfolyoda "sel-locator-mission" yazamayız, "Login sayfasını test et" yazmamız
gerekir.

Üç seçenek değerlendirildi:

| Seçenek | Değerlendirme |
|---------|---------------|
| Tüm `*Data.js`'leri import edip mission'ları çıkar | ❌ **Reddedildi.** `/portfolio` bundle'ına `javaData` boyutunda 7 devasa chunk bağlar (§14 chunk uyarıları zaten var). Portfolyo hafif bir sayfa olmalı. |
| Build-time manifest üret (`masteryManifest` deseni) | 🟡 En "doğru" ama yeni script + build zinciri değişikliği demek; bu oturumun kapsamını şişirir. |
| **`portfolioData.js`'te elle yazılmış katalog** | ✅ **Seçildi.** 18 kayıt, `missionId → {title, skill, whatYouBuilt}` iki dilli. Sonnet'in doldurması gereken içerik zaten bu (S1). Katalogda olmayan bir `missionId` gelirse **sessizce düşmez** — ham `route` ile jenerik bir kart gösterilir (§5.3 dayanıklılık kuralı). |

**Senkron riski ve önlemi:** yeni bir mission eklenip kataloğa yazılmazsa
portfolyoda jenerik kartla görünür. Bunu erken yakalamak için O6'daki E2E
testi `audit-learning-blocks.mjs`'in bulduğu mission id sayısıyla katalog
boyutunu karşılaştırır ve **eksikse uyarır** (build'i kırmaz — içerik borcu
kod hatası değildir, ama görünmez de kalmamalıdır).

### 3.4. Metinler nerede duracak — i18n scanner kısıtı

`scripts/check-i18n-leaks.mjs` **yalnızca** `src/data/` altındaki `*Data.js`
dosyalarını tarar (satır 234) ve dosyadan adı `Data` ile biten bir export
bekler (satır 248). Metinler bileşen içinde kalırsa **scanner onları hiç
görmez** — `termGlossary.js`'te yaşanan kör noktanın aynısı (CLAUDE.md §23.1).

**Kural:** tüm kullanıcıya görünen metinler `src/data/portfolioData.js`
dosyasında, `export const portfolioData = {...}` altında, `{tr, en}` formatında
tutulur. Dosya `check-i18n-leaks.mjs`'teki `STRICT_ZERO_FILES` setine eklenir —
baştan temiz yazıldığı için sıfır tolerans doğru ayardır.

---

## 4. Sayfa yapısı

Rota: `/portfolio` · Başlık: "QA Portfolyom" / "My QA Portfolio"
Sayfa kabuğu `SprintPage.jsx` kalıbını izler (TopicHeader + ScrollProgressBar +
`useDarkModeState` + fixed home butonu) — CLAUDE.md §8 zorunluları.

### 4.1. Kimlik kartı (Hero) — ve tek state istisnası

Ad + unvan alanı. Boşsa varsayılan: "QA Öğrencisi" / "QA Learner".

**Neden bu tek istisnaya izin veriliyor:** paylaşılabilir bir çıktının (§7)
üstünde isim yoksa portfolyo olarak işlevi yoktur. Bu veri **ilerleme state'i
değil**, kullanıcının kendi yazdığı kimlik — türetilecek bir kaynağı yok, drift
riski de yok (hiçbir yerde ikinci kopyası olmayacak).

- Depo: `learnqa_portfolio_identity` → `{ name, title }`. Tek anahtar.
- Tamamen opsiyonel; boş bırakılırsa sayfa eksiksiz çalışır.
- **Kullanıcı vetosu:** Hasan bunu istemezse alan tamamen kaldırılır, sayfa
  anonim çalışır — mimari hiçbir yerinden etkilenmez.

### 4.2. Rakamlarla özet şeridi

Toplam XP · tamamlanan ders sayısı · çözülen görev sayısı · kapatılan bug ·
quiz doğruluk oranı · en uzun streak. Hepsi §3.2 tablosundan türetilir.

Her rakamın altında **ne anlama geldiği** yazar (ham sayı motive etmiyor —
`getJobReadinessTier`'ın kademeli metin yaklaşımıyla aynı ilke).

### 4.3. "İnşa Ettiklerin" — görev vitrini (portfolyonun kalbi)

Çözülen her mission bir kart: başlık, hangi teknoloji, hangi beceri, **"ne
inşa ettin" özeti** (2-3 cümle, Sonnet S1 içeriği), tamamlanma tarihi
(`skillSignals[].ts`). Karta tıklayınca ilgili derse gider.

Sıralama: en yeni üstte (kronolojik kanıt hissi).

### 4.4. Sprint deneyimi

Kapatılan bug'lar: `LQA-103` gibi gerçek id, severity rozeti, bug başlığı, ve
QA iş akışının hangi adımlarından geçtiği (Analiz → Test Case → Otomasyon → CI
→ Merge). Kapatılan sprint varsa "Sprint 1 tamamlandı" şeridi.

Veri: `sprintsData` + §3.1'deki global tamamlanma kümesi. `/sprint`'e link.

### 4.5. Beceri haritası

`getSkillRadarData()` → 6 eksen, yatay bar olarak (radar SVG'yi yeniden
yazmak yerine — `value: null` olan eksen "henüz veri yok" der, 0 demez).

### 4.6. Ustalık tablosu

Başlanmış her route: mastery %, mülakat puanı (varsa), tamamlandı rozeti.
`getMastery()` `null` dönen route'lar tabloda **hiç görünmez** ("başlamadın"
satırlarıyla tabloyu doldurmak portfolyoyu eksik-listesine çevirir).

### 4.7. Rozetler

`careerMapMilestones.getEarnedMilestones()`. Kariyer haritası profili yoksa
bölüm tamamen gizlenir + `/qa-mentor`'a yönlendiren tek satırlık ipucu.

### 4.8. Dürüstlük notu

Sayfa altında sabit: portfolyonun bu tarayıcıdaki yerel ilerlemeden üretildiği,
sertifika olmadığı. `/verify-certificate` akışıyla karıştırılmamalı.

---

## 5. Boş durum (empty-state) mimarisi

Portfolyo türetilmiş bir görünüm olduğu için **ilk kullanıcıda tamamen boş**
açılır. Bu, sayfanın en kritik tasarım problemi — boş bir portfolyo motive
etmez, caydırır.

### 5.1. Üç kademe

| Kademe | Koşul | Davranış |
|--------|-------|----------|
| **Sıfır** | Hiçbir sinyal yok (`getLearningAnalytics().hasData === false` ve çözülen görev 0) | Bölümler HİÇ render edilmez. Tek bir davet ekranı: portfolyonun ne olduğu + "ilk görevini çöz" CTA'sı (`/selenium` mission'ı) + "sprint'e katıl" CTA'sı (`/sprint`). |
| **Kısmi** | Bazı sinyaller var | Sayfa normal render edilir; **verisi olmayan bölüm gizlenir** (boş kart gösterilmez). Her gizli bölüm için özet şeridinde tek satırlık "şunu da ekleyebilirsin" ipucu. |
| **Dolu** | Görev + ders + sprint verisi var | Tüm bölümler. |

### 5.2. Kural: boş bölüm gizlenir, "0" gösterilmez

`getMastery()`'nin `null` vs `0` ayrımı bu sayfada da korunur — "0 puan" bir
başarısızlık ifadesidir, "henüz veri yok" değildir.

### 5.3. Dayanıklılık

- Katalogda olmayan `missionId` → jenerik kart (§3.3), asla çökme, asla sessiz
  düşürme.
- Bozuk/eksik localStorage → her okuma zaten `try/catch`'li (mevcut depoların
  hepsi bu şekilde yazılmış); util aynı deseni izler.
- `localStorage` tamamen kapalı → sıfır kademesi.

---

## 6. Rota bağlama checklist'i

`/sprint` eklenirken izlenen sıranın aynısı:

1. `src/App.jsx` → `const PortfolioPage = lazy(...)` + `<Route path="/portfolio" ...>`
2. `src/utils/seo.js` → `ROUTE_SEO` girişi (title `LearnQA.dev` içerir,
   description 80–180 karakter)
3. `scripts/generate-static-routes.mjs` → `specialRouteContent` girişi
4. `CLAUDE.md` §2 route haritasına satır
5. **Doğrulama sinyali:** build sonrası statik shell sayısı **44 → 45**

**Statik shell içeriği kararı:** portfolyo içeriği %100 yerel — crawler'a
gösterilecek gerçek veri yok. Shell, sayfanın **ne olduğunu** anlatan tanıtım
metni içerir (özelliğin kendisi: "QA öğrenme portfolyonu tek sayfada topla"),
kullanıcı verisi taklit etmez. `noindex` kullanılmaz; sayfa meşru bir özellik
tanıtımıdır ve `/sprint` shell'i de aynı mantıkla yazılmıştır.

**§22.1 test istisna listesi değişmez** — `/portfolio` normal test kapsamındadır.

---

## 7. Paylaşılabilir çıktı (opsiyonel — ayrı madde)

Öncelik sırası: **önce Markdown**, canvas görseli en son.

- **7.1 — Markdown export (önerilen, düşük risk):** "Markdown olarak kopyala"
  düğmesi; portfolyoyu GitHub README / LinkedIn'e yapıştırılabilir metne
  çevirir. Yeni bağımlılık yok, `navigator.clipboard` + string. Dürüstlük notu
  export'a da girer.
- **7.2 — Paylaşım kartı görseli (opsiyonel, sonraki oturum):** `<canvas>` +
  `toDataURL()` — `career-map-feature-plan.md` §4.4c'de park edilmiş desenin
  aynısı. Aynı desen orada da yapılmadı; burada da **bu oturumun kapsamı
  dışında** tutulur.

---

## 8. OPUS görevleri (bu oturumda bitecek çekirdek)

| # | İş | Dosya | Risk |
|---|-----|-------|------|
| **O1** | Türetme util'i | `src/lib/portfolioSnapshot.js` (yeni) | §3.1'in çözümü — planın en kritik parçası |
| **O2** | Metin/katalog iskeleti | `src/data/portfolioData.js` (yeni) | Sonnet'in dolduracağı yapı; Opus şemayı + birkaç örnek kaydı yazar |
| **O3** | Sayfa kabuğu + bölümler | `src/components/PortfolioPage.jsx` (yeni) | `SprintPage` kalıbı |
| **O4** | Boş durum mimarisi | aynı dosya | §5'in üç kademesi |
| **O5** | Rota bağlama | `App.jsx`, `seo.js`, `generate-static-routes.mjs`, `CLAUDE.md` | Paylaşılan dosyalar — sadece ekleme |
| **O6** | E2E test + diş doğrulaması | `tests/portfolio-page.spec.ts` (yeni) | Boş durum + dolu durum (localStorage tohumlanarak) |
| **O7** | Geçitler + NEXT_SESSION + commit | — | §11 |

**O1 API taslağı** (tek export, saf okuma, yan etkisiz):

```js
// getPortfolioSnapshot() → tek çağrıda tüm türetilmiş görünüm
{
  hasAnyData, tier,            // 'empty' | 'partial' | 'full'
  identity: { name, title },
  stats: { totalXp, completedRoutes, solvedMissions, closedBugs, quizAccuracy, streak },
  missions: [{ missionId, route, title, skill, whatYouBuilt, ts, isKnown }],
  sprints: { closedSprints: [...], closedBugs: [{ id, title, severity, sprintTitle }] },
  skills: [...],               // getSkillRadarData() çıktısı
  mastery: [{ route, mastery, interview }],
  milestones: [...] | null,    // profil yoksa null
}
```

**O6 test kapsamı:**
1. Boş durum: temiz localStorage ile `/portfolio` → davet ekranı görünür, bölüm
   kartları yok.
2. Dolu durum: `learnqa_xp_selenium`, `learnqa_skill_signals`,
   `learnqa_sprint_board` tohumlanır → ilgili mission kartı + kapatılan bug
   görünür. **Bu test §3.1 regresyonunun bekçisidir** — `portfolioSnapshot`
   yanlışlıkla `getCompletedExercises()` kullanmaya dönerse KIRILIR.
3. **Diş doğrulaması:** global tarama geçici olarak route-kapsamlı çağrıya
   çevrilir → test 2 KIRILMALI → geri alınır.

---

## 9. SONNET görevleri — paste-ready promptlar

> Bu promptlar Opus çekirdeği bittikten SONRA, sırayla verilir. Her biri tek
> başına çalıştırılabilir ve kendi doğrulama geçitlerini taşır.

### 9.1. S1 — Mission kataloğu içeriği (18 kayıt)

```
Branch `feature/portfolio-builder` üzerinde çalış. Önce CLAUDE.md, sonra
.claude/NEXT_SESSION.md, sonra Documents/portfolio-builder-plan.md §3.3 ve
§4.3'ü oku.

GÖREV: src/data/portfolioData.js içindeki `missionCatalog` nesnesini 18 mission
kaydının TAMAMI için doldur.

18 mission'ı bul: `node scripts/audit-learning-blocks.mjs` mission sayısını
verir; id'leri bulmak için src/data/ altında `type: 'mission'` bloklarını ara
(seleniumData, playwrightData, cypressData, pythonData, sqlData,
restAssuredData, sprintsData). Her mission'ın `id`, `relatedTopicId`, adımları
ve `debrief` alanı zaten dosyada — okuyup ne öğrettiğini anla.

Her kayıt için üç alan yaz, HEPSİ {tr, en} iki dilli:
  - title: görevin insan-okunur adı (mission'ın kendi başlığından türet)
  - skill: tek satırlık beceri etiketi (ör. "Locator stratejisi ve explicit wait")
  - whatYouBuilt: 2-3 cümle, PORTFOLYO DİLİYLE yazılmış — "şunu öğrendin"
    DEĞİL, "şunu inşa ettin/yaptın" (geçmiş zaman, somut çıktı). Bir işveren
    okusa ne yaptığını anlamalı. Örnek ton: "Login akışını Page Object Model'e
    refactor ettin: locator'ları tek sınıfta topladın, testi sayfa API'si
    üstünden yeniden yazdın ve 10 dosyada değişecek bir bakımı tek dosyaya
    indirdin."

KISITLAR:
- Sadece src/data/portfolioData.js'e dokun. Başka dosya değiştirme.
- TR metinlerde teknik terimler İngilizce kalır (CLAUDE.md §8): locator,
  assertion, fixture, Page Object Model, pipeline, merge...
- Abartma/uydurma yok — kullanıcı gerçekten ne yaptıysa onu yaz. Mission'ın
  adımlarında olmayan bir şeyi "inşa ettin" diye yazma.
- portfolioData.js STRICT_ZERO'dur: EN metinlerde tek bir Türkçe karakter bile
  build'i kırar.

DOĞRULAMA (hepsini ayrı ayrı çalıştır ve sonucu raporla):
  node --check src/data/portfolioData.js
  node scripts/check-content-integrity.mjs
  npm run i18n:check          (baseline 0, regresyon yok)
  npm run build
  npx playwright test tests/portfolio-page.spec.ts
Dördü de geçmeden "tamamladım" deme (CLAUDE.md §1.1).
```

### 9.2. S2 — Sprint bug özetleri + boş durum kopyası

```
Branch `feature/portfolio-builder`. CLAUDE.md → NEXT_SESSION.md →
Documents/portfolio-builder-plan.md §4.4 ve §5'i oku.

GÖREV (iki parça, tek dosya: src/data/portfolioData.js):

1. `bugCatalog`: src/data/sprintsData.js'teki 6 bug'ın (LQA-101..104,
   LQA-201..202) her biri için {tr, en} iki dilli bir `whatYouFixed` özeti yaz —
   2 cümle: bug neydi, sen ne yaptın. Portfolyo dili (geçmiş zaman, somut).
   Bug'ın kendi `report`/`mission.debrief` alanlarını kaynak al.

2. `emptyState`: §5'teki üç kademe için kopya yaz.
   - Sıfır kademesi: portfolyonun ne olduğunu 2-3 cümlede anlatan davet metni +
     iki CTA etiketi (ilk görev / sprint). Ton: suçlayıcı değil davetkâr —
     "henüz bir şey yapmadın" DEĞİL, "portfolyon ilk görevinle başlıyor".
   - Kısmi kademe: her gizli bölüm için tek satırlık "şunu da ekleyebilirsin"
     ipucu (görev/sprint/mülakat/kariyer haritası — 4 ipucu).
   - Dürüstlük notu (§4.8): tek paragraf, portfolyonun yerel ilerlemeden
     üretildiği ve sertifika olmadığı.

KISITLAR: yukarıdaki S1 kısıtlarının aynısı. Sadece portfolioData.js.
DOĞRULAMA: S1'deki 5 komutun aynısı.
```

### 9.3. S3 — Markdown export (plan §7.1)

```
Branch `feature/portfolio-builder`. CLAUDE.md → NEXT_SESSION.md →
Documents/portfolio-builder-plan.md §7.1'i oku.

GÖREV: Portfolyoyu GitHub README / LinkedIn'e yapıştırılabilir Markdown'a
çeviren "Markdown olarak kopyala" özelliğini ekle.

- Şablon metinleri src/data/portfolioData.js'e (`exportTemplate`), üretim
  mantığı src/lib/portfolioSnapshot.js'e yeni bir `toMarkdown(snapshot, lang)`
  export'u olarak.
- Düğme PortfolioPage.jsx'e; navigator.clipboard ile kopyalar, başarı geri
  bildirimi verir (mevcut kopyala düğmesi kalıbını taklit et, yeni tasarım icat
  etme).
- Çıktı iki dilli (sayfa dili neyse o), dürüstlük notunu İÇERİR.
- Boş portfolyoda düğme HİÇ görünmez.

KISITLAR:
- Yeni npm paketi YOK. clipboard API yoksa sessizce textarea fallback.
- getPortfolioSnapshot()'ın türetme mantığına DOKUNMA — toMarkdown yalnızca
  hazır snapshot'ı biçimlendirir.
DOĞRULAMA: S1'deki 5 komut + tests/portfolio-page.spec.ts'e export düğmesi için
bir test ekle (boş portfolyoda görünmüyor / dolu portfolyoda pano metni üretiyor).
```

### 9.4. S4 — Giriş noktaları (HomePage + QA Mentor çapraz link)

```
Branch `feature/portfolio-builder`. CLAUDE.md → NEXT_SESSION.md → plan §4'ü oku.

GÖREV: /portfolio'ya iki giriş noktası ekle.
1. src/components/HomePage.jsx — "QA Portfolyom" kartı. MEVCUT kart kalıbını
   KOPYALA (sprint kartı `resume-banner` deseni, 2026-08-01'de eklendi), yeni
   tasarım icat etme. Ayırt edici renk şeması seç (sprint amber/orange, bu
   farklı olsun).
2. src/components/QAMentorPage.jsx — MilestoneStrip'in yanına tek satırlık
   "kazandıklarını portfolyonda gör" linki.

KISITLAR:
- İkisi de PAYLAŞILAN dosya: sadece EKLE, mevcut hiçbir bloğu yeniden düzenleme.
- İki dilli, mevcut dosyaların dil kalıbıyla.
DOĞRULAMA: S1'deki 5 komut + `npx playwright test tests/homepage-recommended-badges.spec.ts`
(regresyon) + `npx playwright test tests/career-map-milestones.spec.ts` (regresyon).
```

---

## 10. İkincil fikirler — bu oturumda YAPILMIYOR, gerekçesi

### 10.1. Confidence vs Knowledge — ❌ bu planın kapsamı dışı

Fikir: kullanıcının "bildiğini sandığı" ile "gerçekten bildiği" ayrı ölçülsün.

**Neden burada değil:** güven verisi ancak cevap ANINDA toplanabilir ("bu
cevaptan ne kadar eminsin?"). O girdi noktası `TopicPage.jsx`'in quiz motoru —
bu planın §2.4 kısıtı oraya dokunmayı yasaklıyor, ve yasak yerinde: quiz motoru
29 sayfayı ve 346 quiz bloğunu besleyen en riskli paylaşılan yüzey.

Mevcut depolardan **türetilemez** de: `quizAttempted_*`/`quizScore_*` yalnızca
"şu an doğru mu" tutuyor, ilk-deneme bilgisini bile tutmuyor (bkz.
`progressStore.js` satır 108-112'deki not).

**Karar:** ayrı bir oturum, ayrı bir plan, ayrı bir kullanıcı onayı. Quiz
motoruna dokunmak tek başına bir riskli iştir ve portfolyoyla aynı commit'e
girmemelidir.

### 10.2. Second Brain (derse bağlanan notlar) — ❌ bu planın kapsamı dışı

**Neden burada değil:** portfolyonun tüm mimari değeri "sıfır yeni state, her
render'da türet" ilkesinde (§2.1). Notlar ise **kullanıcının yazdığı yeni,
türetilemeyen içerik** — kendi kalıcılık, kota, yedekleme ve kayıp-riski
hikâyesini gerektirir (localStorage temizlenince kullanıcının kendi yazdığı
notlar gider; ilerleme verisinin kaybı ile kişisel notun kaybı aynı ağırlıkta
değildir).

İkisini aynı oturumda karıştırmak çekirdeği bulandırır ve portfolyonun en
savunulabilir özelliğini (tek doğruluk kaynağı) daha ilk günden deler.

**Karar:** ayrı oturum. Yapılırsa doğal yeri portfolyo DEĞİL, ders sayfası
(`TopicPage` yan paneli) — ve orası da quiz motoru dosyası olduğu için ayrı
risk değerlendirmesi ister.

---

## 11. Doğrulama geçitleri (Opus çekirdeği için, CLAUDE.md §1.1)

Her biri **ayrı ayrı** çalıştırılır ve çıktısı raporlanır:

1. `node --check src/data/portfolioData.js`
2. `node scripts/check-content-integrity.mjs` → 0 ihlal
3. `npm run i18n:check` → baseline 0, regresyon yok, `portfolioData.js`
   STRICT_ZERO'da
4. `npm run build` → hatasız, **45 statik shell** (44'ten +1)
5. `npx playwright test tests/portfolio-page.spec.ts` → yeni testler geçer
6. **Yeni testin dişi doğrulanır** (§8/O6.3): global tarama geçici olarak
   bozulur → test KIRILIR → geri alınır. Kırılmıyorsa test işe yaramıyordur.
7. Regresyon: `npx playwright test tests/sprint-flow.spec.ts` (sprint verisini
   okuyoruz, sprint akışını bozmadığımızı doğrula)

Ardından `.claude/NEXT_SESSION.md` güncellenir — **diğer bilgisayarda yapılan
ve NEXT_SESSION'a hiç yazılmamış 4 commit de** (`933fdc9` maskot dedektif,
`3561c98` neuroMode varsayılan kapalı, `c3a1c4e` algoritma mod düğmelerinin
konumu, `e70f834` E2E) o güncellemeye dahil edilir.

---

## 12. Riskler

| Risk | Önlem |
|------|-------|
| **§3.1 route-kapsamı tuzağı** — sessiz boş portfolyo | O1 global tarama + O6 test 2 bekçi; testin dişi doğrulanır |
| Mission kataloğu ile veri dosyaları arası drift | Katalogsuz mission jenerik kartla görünür (§3.3), sayı karşılaştırması uyarır |
| Boş portfolyonun caydırıcılığı | §5 üç kademeli boş durum; sıfır kademesinde bölüm HİÇ render edilmez |
| Bundle şişmesi | `*Data.js` import EDİLMEZ (§3.3), lazy route |
| i18n kör noktası | Metinler `portfolioData.js`'te + STRICT_ZERO (§3.4) |
| Paylaşılan dosya regresyonu (`App.jsx`, `HomePage.jsx`, `QAMentorPage.jsx`) | Sadece ekleme; S4'te regresyon testleri zorunlu |
| Portfolyonun "sertifika" sanılması | §4.8 dürüstlük notu, sayfada ve export'ta |

---

## 13. Manuel Test Rehberi — Opus çekirdeği (O1-O7), ~15 dakika

> Bu rehber, çekirdek uygulandıktan SONRA (commit `df4d403`) yazıldı ve
> aşağıdaki TÜM beklenen değerler gerçek tarayıcıda çalıştırılarak doğrulandı —
> tahmin değil, ölçüm. Bir adımda farklı bir sonuç görüyorsan bu bir bug'dır.
>
> **Sapmalar (planın önceki bölümlerine göre):** shell sayısı 44→45 değil
> **88→90** (dil-ayrık URL'lerden sonra her route iki dilde üretiliyor);
> görev sayısı 18 değil **24** (18 ders görevi + 6 sprint bug'ı); "en uzun
> streak" metriği YOK (`activityLog` tutmuyor), yerine güncel seri + aktif gün
> gösteriliyor; ana sayfa giriş kartı S4'ten çekirdeğe alındı.

### 13.0. Kurulum

```bash
npm run dev          # http://localhost:5173 — hızlı, çoğu adım için yeterli
# veya crawler/SEO adımları için:
npm run build && npm run preview   # http://localhost:4173 (gerçek dist çıktısı)
```

**Her senaryodan önce temiz başla:** DevTools → Application → Storage →
`Clear site data` (veya Console'da `localStorage.clear(); location.reload()`).
Portfolyo TAMAMEN localStorage'dan türetildiği için kirli bir depo yanıltıcı
sonuç verir.

---

### 13.1. Senaryo A — Boş portfolyo (sıfır kademesi), ~2 dk

1. `localStorage.clear(); location.reload()` → `http://localhost:5173/portfolio`
2. **Görmen gereken:** tek bir davet ekranı — "Portfolyon ilk görevinle
   başlıyor" başlığı, altında ne olduğunu anlatan paragraf ve **iki kart**:
   "🎯 İlk görevini çöz" (→ `/selenium`) ve "🐞 Bir sprint'e katıl" (→ `/sprint`).
3. **Görmemen gereken (kritik):** rakam şeridi, kimlik kartı, "Markdown olarak
   kopyala" düğmesi, herhangi bir bölüm başlığı. Sıfır kademesinde bölümler
   "0" ile DEĞİL, **hiç** render edilmez — boş kart yoktur.
4. Sayfanın en altında **dürüstlük notu** görünmeli ("...bir sertifika değil,
   bir çalışma günlüğüdür...") — bu not HER kademede vardır.
5. İki CTA'ya da tıkla; doğru sayfalara gitmeli.

❌ **Bug sayılır:** boş bir "İnşa Ettiklerin" kutusu, "0 görev" yazan bir kart,
ya da dışa aktarım düğmesinin boş portfolyoda görünmesi.

---

### 13.2. Senaryo B — Gerçek yoldan dolu portfolyo (uzun yol, ~8 dk)

Bu, kullanıcının GERÇEKTEN izleyeceği yol. En az bir kez bunu yap — tohumlama
betiği (13.3) yalnızca hızlı tekrar içindir.

1. `localStorage.clear()` → `/selenium` sayfasını aç.
2. Sol menüden **Locators** sekmesine git, "Görev" (mission) bloğunu bul ve
   **5 adımın hepsini** tamamla (her adım doğru cevaplanınca bir sonraki açılır).
3. `/sprint` sayfasına git → Backlog'dan **LQA-101**'i "⬅ Sprint'e al" ile çek →
   "▶ Görevi aç" → 5 adımı tamamla. Kart "Bitti" kolonuna geçmeli.
4. Ana sayfaya dön (🏠) → **teal renkli "🗂️ QA Portfolyonu gör" kartını** gör ve tıkla.
5. **Portfolyoda görmen gerekenler:**
   - Rakam şeridi: Toplam XP > 0, **Çözülen görev: 1**, **Kapatılan bug: 1**.
   - "İnşa Ettiklerin" bölümünde **"Login smoke testi kurdun"** kartı — altında
     beceri etiketi ve 2-3 cümlelik "ne inşa ettin" özeti, sağ üstte bugünün tarihi.
   - "Sprint Deneyimi" bölümünde **LQA-101** kartı, kırmızı `kritik` rozeti ve
     "Analiz → Test Case → Otomasyon → CI → Merge" şeridi.
   - LQA-101 **görev vitrininde DEĞİL**, sadece sprint bölümünde olmalı
     (sprint bug'ları ayrı bölümde gösterilir).

❌ **Bug sayılır (en kritik kontrol):** görevleri gerçekten bitirdiğin hâlde
portfolyonun BOŞ görünmesi. Bu, §3.1'deki route-kapsamı tuzağının geri
geldiği anlamına gelir — `learnqa_xp_selenium` anahtarı doludur ama sayfa
`learnqa_xp_portfolio`'ya bakıyordur. Görmen hâlinde: DevTools → Application →
Local Storage → `learnqa_xp_selenium` içinde `completed` dizisini kontrol et;
doluysa hata portfolyodadır, veri kaybı yoktur.

---

### 13.3. Senaryo C — Tohumlama betiğiyle dolu portfolyo (hızlı yol, ~3 dk)

`/portfolio` açıkken DevTools → Console'a yapıştır, sonra sayfayı yenile:

```js
localStorage.clear();
(() => {
  const D = 86400000, now = Date.now();
  const dk = (off) => new Date(now - off * D).toISOString().slice(0, 10);
  localStorage.setItem('learnqa_xp_selenium', JSON.stringify({ xp: 120, completed: ['selenium-login-mission', 'selenium-pom-refactor-mission'] }));
  localStorage.setItem('learnqa_xp_sql', JSON.stringify({ xp: 60, completed: ['sql-price-validation-mission'] }));
  localStorage.setItem('learnqa_xp_sprint', JSON.stringify({ xp: 100, completed: ['sprint1-lqa-101-mission', 'sprint1-lqa-103-mission'] }));
  localStorage.setItem('learnqa_skill_signals', JSON.stringify({ signals: [
    { missionId: 'selenium-login-mission', route: '/selenium', skill: '/selenium', ts: now - 5 * D },
    { missionId: 'selenium-pom-refactor-mission', route: '/selenium', skill: '/selenium', ts: now - 3 * D },
    { missionId: 'sql-price-validation-mission', route: '/sql', skill: '/sql', ts: now - 2 * D },
    { missionId: 'sprint1-lqa-101-mission', route: '/sprint', skill: '/sprint', ts: now - 1 * D },
    { missionId: 'sprint1-lqa-103-mission', route: '/sprint', skill: '/sprint', ts: now },
  ] }));
  localStorage.setItem('learnqa_sprint_board', JSON.stringify({ pulled: ['lqa-101', 'lqa-103'], closed: [] }));
  localStorage.setItem('learnqa_completed_routes', JSON.stringify(['/selenium', '/sql']));
  localStorage.setItem('quizAttempted_seleniumwebdriver', JSON.stringify({ 0: { q1: 1, q2: 1, q3: 1 }, 1: { q1: 1 } }));
  localStorage.setItem('quizScore_seleniumwebdriver', JSON.stringify({ 0: { q1: 1, q2: 1, q3: 1 } }));
  localStorage.setItem('progress_seleniumwebdriver', JSON.stringify({ 0: true, 1: true, 2: true }));
  localStorage.setItem('quizAttempted_sql', JSON.stringify({ 0: { q1: 1, q2: 1 } }));
  localStorage.setItem('quizScore_sql', JSON.stringify({ 0: { q1: 1 } }));
  localStorage.setItem('progress_sql', JSON.stringify({ 0: true }));
  localStorage.setItem('learnqa_interview_scores', JSON.stringify({ '/selenium': { avgPercent: 82, gradedAt: now } }));
  localStorage.setItem('learnqa_activity_log', JSON.stringify({ days: { [dk(1)]: { quizzes: 6, exercises: 3, xp: 60 }, [dk(0)]: { quizzes: 8, exercises: 2, xp: 80 } }, countedIds: [] }));
  localStorage.setItem('qaMentorProfile', JSON.stringify({ version: 2, mapId: 'A', answers: {}, nodes: [
    { route: '/selenium', title: 'Selenium', emoji: '🕷️' },
    { route: '/sql', title: 'SQL', emoji: '🗄️' },
    { route: '/java', title: 'Java', emoji: '☕' },
  ], createdAt: new Date().toISOString() }));
  localStorage.setItem('learnqa_map_milestones', JSON.stringify(['first-step']));
})();
location.reload();
```

**Beklenen sonuç — bu değerler ölçüldü, birebir eşleşmeli:**

| Alan | Beklenen | Neden bu değer |
|------|----------|----------------|
| Toplam XP | **280** | 120 + 60 + 100 — **üç AYRI konu anahtarından toplanır**; tek anahtar okunsaydı 120 veya 0 çıkardı (§3.1 bekçisi) |
| Çözülen görev | **3** | 2 Selenium + 1 SQL; sprint bug'ları buraya SAYILMAZ |
| Kapatılan bug | **2** | LQA-101 + LQA-103 |
| Tamamlanan ders | **2** | `/selenium` + `/sql` |
| Quiz doğruluğu | **%67** | 4 doğru / 6 denenen |
| Aktif gün | **2** | Aktivite kaydındaki iki gün |
| Görev kartı sayısı | **3** | En yeni üstte: SQL → Selenium POM → Selenium Login |
| Bug kartı sayısı | **2** | LQA-101 `kritik` (kırmızı), LQA-103 `kritik` (kırmızı) |
| Kapatılan sprint şeridi | **görünmez** | `closed: []` — sprint henüz kapatılmadı |
| Kariyer rozetleri | **🏁 İlk adım · 🏁 Otomasyoncu** | ilk düğüm (`/selenium`) bitti + otomasyon rotası bitti |
| Ustalık tablosu | **Selenium %57 (mülakat %82) · SQL %30**, ikisi de `✓ tamamlandı` | sadece BAŞLANMIŞ konular; `/docker` gibi hiç açılmamış sayfa TABLODA OLMAMALI |
| Beceri haritası | UI Otomasyon **%57** · SQL & Veri **%30** · diğer 4 eksen **"henüz veri yok"** | veri yok = 0 DEĞİL |
| İpucu satırı | **hiç yok** | tüm bölümlerin verisi var |

**Ek kontroller:**
- **Sprint kapanış şeridini görmek için:** Console'da
  `const b=JSON.parse(localStorage.learnqa_sprint_board); b.closed=['sprint-1']; localStorage.learnqa_sprint_board=JSON.stringify(b); location.reload()`
  → sprint bölümünün üstünde yeşil **"🏆 SPRINT-24 · Checkout Akışı Kararlılığı — Sprint tamamlandı"** rozeti çıkmalı.
- **Kart linkleri:** bir görev kartındaki "Derse git →" ilgili sayfaya,
  ustalık tablosundaki konu adı da o sayfaya gitmeli.

---

### 13.4. Senaryo D — Kısmi kademe: eksik bölüm gizlenir, ipucu çıkar (~2 dk)

Kısmi kademe, portfolyonun en sık görülecek hâlidir (kullanıcı bir şeyler yaptı
ama her şeyi değil). `localStorage.clear()` sonrası şunu yapıştır:

```js
localStorage.setItem('learnqa_xp_selenium', JSON.stringify({ xp: 120, completed: ['selenium-login-mission'] }));
localStorage.setItem('learnqa_skill_signals', JSON.stringify({ signals: [{ missionId: 'selenium-login-mission', route: '/selenium', skill: '/selenium', ts: Date.now() }] }));
localStorage.setItem('quizAttempted_seleniumwebdriver', JSON.stringify({ 0: { q1: 1, q2: 1 } }));
localStorage.setItem('quizScore_seleniumwebdriver', JSON.stringify({ 0: { q1: 1 } }));
location.reload();
```

**Beklenen — ölçülen üç ipucu, tam bu sırayla:**

1. `💡 Sprint panosunda bir bug kapattığında sprint deneyimin burada listelenir.`
2. `💡 Kariyer haritanı oluşturduğunda kazandığın yol rozetleri burada görünür.`
3. `💡 Mülakat sorularını cevaplayıp değerlendirme aldığında ustalık tablonda mülakat puanın da görünür.`

Sprint bölümü, rozet bölümü ve davet ekranı **hiç render edilmemeli** (0 adet).
"İnşa Ettiklerin" bölümü ise TEK kartla görünmeli.

❌ **Bug sayılır:** boş bir sprint bölümünün başlıkla birlikte görünmesi ya da
"0 bug kapattın" gibi bir metin. Kural: veri yoksa bölüm gizlenir, tek satırlık
davetkâr ipucu kalır.

---

### 13.5. Senaryo E — Katalog dışı görev sessizce düşmemeli (~1 dk)

İleride biri yeni bir görev ekleyip `portfolioData.js` kataloğuna yazmayı
unutursa ne olur? Simüle et:

```js
localStorage.clear();
localStorage.setItem('learnqa_xp_kafka', JSON.stringify({ xp: 30, completed: ['kafka-yeni-gorev'] }));
localStorage.setItem('learnqa_skill_signals', JSON.stringify({ signals: [{ missionId: 'kafka-yeni-gorev', route: '/kafka', skill: '/kafka', ts: Date.now() }] }));
location.reload();
```

**Beklenen:** "Kafka sayfasında bir görev" başlıklı **jenerik bir kart** ve
altında "Bu görev tamamlandı; ayrıntılı özeti henüz yazılmadı." notu.

❌ **Bug sayılır:** kartın hiç görünmemesi (sessiz düşme) veya sayfanın çökmesi.
Kullanıcının emeği hiçbir koşulda kaybolmaz; en kötü ihtimalle jenerik görünür.

---

### 13.6. Senaryo F — Kimlik alanı (tek yazma noktası) (~1 dk)

1. Dolu bir portfolyoda (13.3) üstteki kartta "✏️ Adını ve unvanını düzenle"ye bas.
2. Ad ve unvan yaz → "Kaydet".
3. Kart hemen güncellenmeli. **Sayfayı yenile** → değerler KALICI olmalı.
4. Alanları boşaltıp kaydet → varsayılana ("QA Öğrencisi") dönmeli, sayfa
   eksiksiz çalışmaya devam etmeli.

Bu, portfolyonun ilerleme verisi ÜRETMEYEN tek yazma noktasıdır
(`learnqa_portfolio_identity`); başka hiçbir anahtara yazmaz. Doğrulamak için:
Application → Local Storage'da sayfayı gezerken başka anahtarın değişmediğini gör.

---

### 13.7. Senaryo G — Markdown dışa aktarım (~2 dk)

1. Dolu portfolyoda (13.3) **"📋 Markdown olarak kopyala"**ya bas.
2. Düğme kısa süreliğine **"✓ Panoya kopyalandı"** olmalı.
3. Bir metin editörüne yapıştır. İçermesi gerekenler:
   - `# <adın> — QA Portfolyo` başlığı
   - "Rakamlarla" listesi (XP, görev, bug, ders, quiz doğruluğu)
   - "İnşa Ettiklerim" altında **3 görev** başlığı + beceri + özet
   - "Sprint Deneyimi" altında `**LQA-101**` ve `**LQA-103**` satırları
   - "Ustalık" altında `/selenium — %57 · Mülakat puanı: %82`
   - En altta `---` ve italik **dürüstlük notu**
4. Çıktıyı bir GitHub README önizlemesine yapıştırıp düzgün render olduğunu gör.
5. **Boş portfolyoda düğme HİÇ görünmemeli** (13.1'de doğrulandı).

---

### 13.8. Senaryo H — İki dil, SEO ve statik shell (~3 dk)

1. `/portfolio` (çıplak URL) → **Türkçe**; sağ üstten `ENG` → adres çubuğu
   **`/en/portfolio`** olmalı (sadece içerik değil URL de değişir).
2. `/en/portfolio` dolu hâlde: sayfada **tek bir Türkçe karakter (ı/ğ/ş/ç/ö/ü)
   olmamalı** — görev özetleri, bug açıklamaları, ipuçları ve dürüstlük notu
   dahil. (Bu, otomatik testte de taranıyor.)
3. `/en/portfolio`'dayken 🏠 butonuna bas → `/en`'de kalmalı, `/`'a düşmemeli.
4. **Crawler görüşü** (preview sunucusunda):
   ```bash
   curl -s localhost:4173/portfolio    | head -30   # TR başlık, <html lang="tr">
   curl -s localhost:4173/en/portfolio | head -30   # EN başlık, <html lang="en">
   ```
   Shell, sayfanın NE OLDUĞUNU anlatan tanıtım metni içermeli; **sahte kullanıcı
   verisi ASLA içermemeli** (portfolyo içeriği %100 yereldir, crawler'a
   gösterilecek gerçek veri yoktur).
5. `curl -s localhost:4173/sitemap.xml | grep -c "<url>"` → **90** olmalı
   (45 route × 2 dil).

---

### 13.9. Senaryo I — Mobil ve tema (~1 dk)

1. DevTools → cihaz emülasyonu → **iPhone 14 (390px)** → `/portfolio` (dolu).
2. **Yatay kaydırma OLMAMALI.** Ustalık tablosu kendi içinde yatay kaydırmalı,
   sayfa gövdesi değil.
3. Kartlar tek sütuna inmeli; düğmeler en az 36px dokunma hedefini karşılamalı.
4. Sağ üstten tema düğmesiyle **açık/koyu** arasında geçiş yap — her iki temada
   da metin okunabilir olmalı (özellikle severity rozetleri ve ustalık yüzdeleri).
5. Sağ altta sabit 🏠 düğmesi ve üstte kaydırma ilerleme çubuğu bulunmalı.

---

### 13.10. Testin dişi — otomatik bekçinin gerçekten koruduğunu görmek (opsiyonel, ~2 dk)

En kritik regresyonun (§3.1) testle GERÇEKTEN yakalandığını kendin doğrulamak
istersen:

1. `src/lib/portfolioSnapshot.js` içinde `getAllCompletedExerciseIds()`
   fonksiyonundaki şu satırı:
   ```js
   if (!key || !key.startsWith(XP_KEY_PREFIX)) continue
   ```
   geçici olarak şununla değiştir:
   ```js
   if (key !== `${XP_KEY_PREFIX}portfolio`) continue
   ```
2. `npx playwright test tests/portfolio-page.spec.ts` → **2 test KIRILMALI**
   ("dolu durumda görev kartı..." ve "Markdown dışa aktarımı...").
3. Değişikliği geri al → **8/8 PASS**.

Kırılmıyorsa test işe yaramıyordur ve bu bir bug'dır.

---

### 13.11. Kabul kriteri özeti

Aşağıdakilerin HEPSİ doğruysa çekirdek kabul edilmiştir:

- [ ] Boş portfolyoda hiçbir bölüm/0 değeri render edilmiyor, sadece davet ekranı var.
- [ ] Gerçekten bitirilen bir görev ve kapatılan bir bug portfolyoda görünüyor (§13.2).
- [ ] Tohumlanan verinin rakamları 13.3'teki tabloyla **birebir** eşleşiyor.
- [ ] Kısmi kademede eksik bölüm gizleniyor, yerine ipucu çıkıyor.
- [ ] Katalog dışı görev jenerik kartla görünüyor, kaybolmuyor.
- [ ] Kimlik alanı kaydediliyor ve yenilemeden sonra kalıcı.
- [ ] Markdown çıktısı dürüstlük notunu içeriyor; boş portfolyoda düğme yok.
- [ ] `/en/portfolio` tamamen İngilizce; sitemap 90 URL.
- [ ] Mobilde yatay kaydırma yok; her iki temada okunabilir.
