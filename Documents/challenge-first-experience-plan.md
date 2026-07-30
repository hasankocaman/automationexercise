# Challenge-First & İş Simülasyonu — Deneyim Derinleştirme Planı

> **Kaynak:** Kullanıcının (Hasan) 2026-07-30 tarihli stratejik değerlendirme
> yazısı ("LearnQA bir dokümantasyon sitesi değil, kullanıcıyı her gün geri
> getiren bir Learning OS olsun… ben burada ders okumuyorum, burada QA
> oluyorum"). Bu plan o yazıyı projenin **gerçek güncel durumuyla** harmanlar.
>
> **Önceki plan bitti:** `Documents/learning-science-upgrade-plan.md` (prediction
> + code-trace + heap-stack + Learning Analytics + Kişisel AI Mentor) içerik
> olarak tamamlandı. Bu dosya onun **halefidir** — Phase 3'ün kalanı + Phase 4.
>
> **Branch:** yeni bir dal aç → `feature/challenge-first` (kullanıcı onayı sonrası).

---

## 0. İLERLEME DURUMU (son güncelleme: 2026-07-30 — Opus Phase 1 tarafı BİTTİ)

> Bu bölüm "şimdiye kadar ne yapıldı + sırada ne var" özetidir. Kod başlayınca
> `NEXT_SESSION.md` güncel tutulur; bu dosya kalıcı plandır.

> **📌 DURUM (2026-07-30, Opus): PHASE 1 OPUS TARAFI (P1-O1…O5) TAMAMLANDI ve
> `feature/challenge-first`'e commit'lendi.** Yazılanlar:
> - `src/lib/skillSignals.js` — local-first beceri sinyali deposu (recordSkillSignal /
>   getSkillSignals / getSkillSignalCounts / hasSkillSignal).
> - `src/components/MissionBlock.jsx` — `type:'mission'` görev zinciri bileşeni
>   (adım kilidi + ilerleme + "Mini-lesson aç" + tamamlanma konfetisi + beceri sinyali).
> - `src/components/TopicPage.jsx` — `import MissionBlock` + `case 'mission'`
>   (`renderInner` callback'i gömülü adım bloklarını mevcut `renderBlock`'tan geçirir).
> - `scripts/audit-learning-blocks.mjs` — `mission` şema değişmezi (build hard-fail).
> - `src/data/seleniumData.js` — REFERANS görev "Login sayfasını test et" (5 adım,
>   Locators sekmesine çift-ağaç push).
> Dört §1.1 kapısı da yeşil: audit-learning-blocks ✓ (mission: 1, 0 ihlal) ·
> content-integrity ✓ · i18n baseline 0 ✓ · build ✓ (43 shell).
> **SIRADAKİ İŞ = SONNET (P1-S1…S4), hazır prompt §7.2'de.**

### ✅ TAMAMLANANLAR (önceki dalga — bu planın ön koşulu)
- **Mentor (AI Learning Coach) — Katman A/B** — `MentorPanel` + `MentorNudge` +
  `mentorSnapshots.js` (`getPersistentWeakness`) + `mentor-advice` edge function.
  Yazının "koçluk yapıyor" isteğinin çekirdeği CANLI.
- **Prediction everywhere** — 42 blok (java 10 / js 9 / py 8 / sql 8 / ts 7).
- **Memory/Object viz** — `heap-stack` + `code-trace` bileşenleri + rollout.
- **Learning Analytics** — `LearningAnalytics.jsx` panosu (local-first).

### 🔜 BU PLANIN KAPSAMI (kullanıcı kararı: Phase 1 = Challenge-first)
1. **Phase 1 — Challenge-First Senaryo Katmanı** (ÖNCELİKLİ, §3). Frontend-only.
2. **Phase 2 — QA Sprint/Company Simulator** (§4). Phase 1 primitifi üstüne.
3. **Phase 3 — Adaptif zorluk + beceriyi challenge'lardan besle** (§5).
4. **Phase 4 — Portfolyo / Interview Arena / Bug Hunting / Team** (§6, park edildi).

---

## 1. Yazının Değerlendirmesi — Gerçekle Kıyas

Yazı 5 gözlem + bir Phase 3/4 roadmap'i sıralıyor. Kod incelendiğinde
(2026-07-30 durumu) her birinin **gerçek durumu**:

| Yazıdaki istek | Projedeki gerçek durum | Karar |
|---|---|---|
| **1. Challenge-first** (Challenge → takıldın mı? → mini-lesson → tekrar) | **Gerçek boşluk.** Deneyim hâlâ Lesson → Activities. `ChallengeBlock`, sandbox'lar var ama "görev önce, ders takılınca" akışı YOK. | ✅ **Phase 1 (bu plan)** |
| **2. Görev/senaryo-odaklı gerçek QA** ("Trendyol login'i test et: butonu bul, XPath yaz, assertion, Wait, çalıştır") | **Gerçek boşluk.** İçerik konu-odaklı; `LocatorExplorerBlock`/`BuggyLoginForm`/sandbox'lar var ama çok-adımlı bir GÖREV zincirine sarılmamış. | ✅ **Phase 1 (bu plan)** |
| **3. Koçluk ("bugün Java çalışma, SQL'e dön")** | 🟡 **Büyük ölçüde bitti.** Mentor kalıcı zayıflığı + öğüt veriyor. Eksik olan: **adaptif zorluk** ("başarın %58 → kolay soru"). | 🔷 **Phase 3** |
| **4. Görünür beceri ilerlemesi (challenge'lardan)** | 🟡 **Yarım.** `SkillRadar` var ama tamamlanan DERSLERDEN besleniyor; yazı ÇÖZÜLEN challenge'lardan istiyor. | 🔷 **Phase 3** |
| **5. İş simülasyonu (Sprint → Bug → Analiz → Test Case → Otomasyon → CI → Merge)** | **Gerçek boşluk.** Hiç yok. En büyük "wow" ama en büyük epik. | 🔷 **Phase 2** |
| Phase 3: AI Coach / Prediction / Memory viz / Learning analytics | ✅ **Bitti** (önceki dalga, §0). | — |
| Phase 3: Adaptive difficulty | 🔲 Yok. | 🔷 **Phase 3** |
| Phase 3: Interactive code execution | 🟡 Büyük ölçüde var (Pyodide/sql.js/TS-JS eval + sandbox'lar). | Yeterli |
| Phase 4: Portfolio / Interview Arena / Bug Hunting / Team | 🔲 Yok. | 🔷 **Phase 4 (park)** |

**Sonuç:** Yazının "asıl istediğim bundan farklı" dediği kısım Phase 3 değil —
**Phase 3'ün çoğu bitti.** Gerçek yeni değer üç yerde: (a) deneyimin şeklini
challenge-first'e çevirmek, (b) bunu bir iş simülasyonuna büyütmek, (c) koçu
gerçek sinyale (adaptif zorluk + challenge-bazlı beceri) bağlamak.

### 1.1. Yazının kritik gerilimi ve nasıl çözüyoruz

Yazı bir yandan **"yeni buton/ders ekleme, mevcudu derinleştir"** (kapanış cümlesi:
"eksik olan özellik sayısı değil, deneyimin derinliği"), diğer yandan Phase 4'te
baştan sona **yeni özellik** listeliyor. Bu gerilim bilinçli çözülüyor:

- **Phase 1 yeni SAYFA/özellik değildir** — mevcut sandbox'ları (CodePlayground,
  LocatorExplorer, BuggyLoginForm, prediction, challenge…) bir **görev zincirine
  saran** ince bir sarmalayıcı bloktur. Yani "mevcudu daha akıllı, daha gerçek
  hâle getirmek" — tam da yazının derin öğüdü. Yeni içerik yazılmaz; var olan
  bloklar göreve dizilir.
- **Phase 2 (Sprint Simulator)**, challenge-first primitifin doğal zirvesidir —
  yeni "buton" değil, mevcut senaryoları bir iş akışına dizen bir üst-katman.
- **Phase 4** (Interview Arena / Portfolio / Team) daha çok "özellik sayısı"
  tarafında olduğundan **bilinçli olarak sona** bırakıldı.

---

## 2. Tasarım İlkeleri (bağlayıcı)

1. **Mevcut bileşeni tekrar yazma (§9.2 kalıbı).** Phase 1 sarmalayıcı bloktur;
   adımları MEVCUT blok renderer'larıyla (CodePlayground, prediction, challenge,
   locator-explorer, editor…) render eder. Yeni sandbox türü icat etmez.
2. **Frontend-first, local-first (§5).** Phase 1-2 tamamen localStorage + mevcut
   `lib/xp` üstünde çalışır, backend GEREKTİRMEZ. Üyelik opsiyonel katmandır.
3. **Data-driven (§5).** Senaryolar `src/data/*Data.js` (veya yeni `scenariosData.js`)
   içinde VERİ olarak yaşar. "Opus bileşen yazar → Sonnet senaryo doldurur."
4. **Bilingual + TR yorum (§8).** Tüm görev metinleri `{tr,en}`; kod adımlarında
   TR yorumlar Türkçe.
5. **§9.1 sıralama korunur.** Görev bloğu konu anlatımından sonra gelir; ama
   Phase 2 Simulator'da akış tersine döner (challenge önce, takılınca mini-lesson).
6. **Doğrulama kapıları (§1.1):** her .js sonrası `node --check` →
   `check-content-integrity.mjs` → `check-i18n-leaks.mjs` (baseline 0'ı BOZMA) →
   `npm run build`. Yeni blok tipi için `audit-learning-blocks.mjs`'e şema
   değişmezi eklenir (prediction/code-trace kalıbı).

---

## 3. PHASE 1 — Challenge-First Senaryo Katmanı (ÖNCELİKLİ)

**Hedef (yazıdan):**
```
Challenge  →  Takıldın mı?  →  Mini lesson  →  Tekrar challenge
```
ve görev-odaklı gerçek QA:
> "Bugün Trendyol login sayfasını test edeceğiz. Görevler: Login butonunu bul →
> XPath yaz → Assertion ekle → Explicit Wait kullan → Testi çalıştır."

### 3.1. Yeni blok tipi: `mission` (görev zinciri)

`mission` = sıralı **adımlardan** oluşan bir görev. Her adım:
- kısa bir **brief** (ne yapılacak, neden — §9.1 "önce mantık"),
- MEVCUT bir interaktif bloğu **içine gömer** (adımın kendisi),
- takılınca açılan bir **miniLesson** (reveal — moral bozmadan, §18),
- bir **tamamlanma sinyali** (gömülü blok `onFirstSuccess` verince adım ✅).

Adımlar **sırayla kilit açar** (bir önceki bitmeden sonraki kilitli — 🔒).
Tüm adımlar bitince görev tamamlanır: XP + konfeti (§20) + **beceri sinyali**
(Phase 3'te SkillRadar'ı besleyecek `recordSkillSignal`).

**Wiring inceliği (Opus için kritik):** `MissionBlock`, gömülü adım bloğunu KENDİ
render etmez — `TopicPage.jsx`'teki `case 'mission'` renderer'a bir `renderInner`
prop'u geçer; `MissionBlock` her `step.block`'u bu callback ile MEVCUT
`renderBlock` makinesinden geçirir. Böylece CodePlayground/prediction/locator-
explorer/editor adım olarak DEĞİŞMEDEN çalışır (`onExerciseCompleted` zaten
`onFirstSuccess`'e bağlı — §TopicPage 17914-17918). Yeni sandbox yazılmaz.

### 3.2. `mission` blok şeması (Sonnet + Opus referansı)

```js
{
  type: 'mission',
  id: 'mission-selenium-login',       // ZORUNLU (XP tekilliği)
  xpReward: 40,                        // görev bütünü için (adımlar ayrıca XP verebilir)
  relatedTopicId: 'selenium-locators', // hangi konunun görev karşılığı (ZORUNLU)
  scenario: {                          // "gerçek QA" çerçevesi (§9.3 iş bağlamı)
    tr: 'Bir e-ticaret sitesinin login sayfasını test edeceksin.',
    en: 'You will test the login page of an e-commerce site.',
  },
  persona: { tr: 'QA Engineer — Sprint 4', en: 'QA Engineer — Sprint 4' }, // ops.
  steps: [
    {
      id: 'find-button',
      brief: { tr: 'Login butonunu bul. Neden önce buton?...', en: '...' },
      block: { /* MEVCUT bir blok objesi: type:'locator-explorer' | 'code-playground' | 'prediction' | 'challenge' | 'editor' ... */ },
      miniLesson: {                     // "takıldın mı?" → aç (§18 mikro-geri bildirim)
        tr: '`//button[text()="Giriş"]` mutlak yol yerine...',
        en: '...',
      },
      successCriterion: 'onFirstSuccess', // gömülü blok tamamlanınca ✅ (varsayılan)
    },
    // ... XPath yaz / assertion ekle / explicit wait / çalıştır
  ],
  debrief: {                            // görev bitince: gerçek işte bu ne demekti (§9.3)
    tr: 'Bu 5 adım gerçek bir smoke testinin iskeletidir...',
    en: '...',
  },
}
```

**Kurallar:**
- Her `step.block` MEVCUT bir blok tipi olmalı (yeni tip icat etme). En sık:
  `code-playground` (yaz-ve-dene), `prediction` (önce tahmin et), `challenge`
  (sürükle/eşleştir/bul-hatayı), `locator-explorer`, `editor` (Pyodide/JS/TS/SQL).
- `steps` en az 3, en fazla ~7 (bir sprint görevi kadar — bunaltma, §9.1).
- `miniLesson` her adımda ZORUNLU (challenge-first sözü: takılınca ders orada).
- `debrief` görevi gerçek QA işine bağlar (§9.3 iş bağlamı — "bu smoke test iskeleti").
- Bilingual; kod adımlarında TR yorum Türkçe (§8). `relatedTopicId` ZORUNLU (§9.4).

### 3.3. Rol dağılımı

**SEN (Hasan):**
- **Ürün kararı:** Görevler mevcut konu sayfalarının İÇİNE mi gömülsün (o sekmenin
  konu anlatımından sonra bir `mission` bloğu), yoksa sayfa başına ayrı bir
  **"Görevler / Missions" sekmesi** mi açılsın? (Öneri: **önce sayfa-içi**, konu
  anlatımının doğal devamı; sekme sonra.) → Kod başlamadan onayla.
- Backend YOK → senden elle altyapı adımı GEREKMEZ. Sadece §13/§21 onay kapısı:
  Opus etkilenen dosya listesini sunar, "başla" dersin.

**OPUS (bileşen + altyapı):**
- **P1-O1** `src/components/MissionBlock.jsx` — self-contained; adım kilidi,
  ilerleme çubuğu (adım N/M), "Takıldın mı? → Mini-lesson aç" düğmesi, tamamlanma
  konfetisi (§20), dark-mode + mobil 44px, tam bilingual. `LearningAnalytics`/
  `PredictionBlock` stil kalıbını taklit eder.
- **P1-O2** `TopicPage.jsx` → `import MissionBlock` + `case 'mission'` (renderer'a
  `renderInner` callback'i geçir — §3.1 wiring). `onExerciseCompleted` entegrasyonu.
- **P1-O3** `src/lib/skillSignals.js` (yeni, local-first) → `recordSkillSignal({route, missionId, ts})`
  + `getSkillSignals()`. Phase 3'te SkillRadar'ı besleyecek; şimdilik sadece
  toplar (görev bitince `MissionBlock` çağırır). `progressStore` anahtar kalıbıyla tutarlı.
- **P1-O4** `scripts/audit-learning-blocks.mjs`'e `mission` şema değişmezi ekle
  (steps≥3, her step'te `block` + `miniLesson`, tam-metin `id` benzersizliği,
  `relatedTopicId` var). Build zincirinde hard-fail.
- **P1-O5** REFERANS görev: `src/data/seleniumData.js`'e "Login sayfasını test et"
  görevini yaz (5 adım, mevcut locator/sandbox bloklarını gömerek). Bu, Sonnet'in
  kopyalayacağı örnek.
- Doğrulama (§1.1 her adım): `node --check` → content-integrity → i18n (baseline 0) → build.

**SONNET (senaryo içeriği + test):**
- **P1-S1** Referans görevi (Selenium) örnek alıp diğer teknoloji sayfalarına
  **birer gerçek-QA görevi** ekle. Öncelik: Playwright, Cypress (E2E — en doğal),
  sonra Python (pytest akışı), SQL (veri doğrulama görevi), API (Postman/REST
  Assured — istek→assertion→negatif senaryo). Her görev o sayfanın MEVCUT
  sandbox'larını gömer; yeni sandbox yazma.
- **P1-S2** Her görevin adımlarında `miniLesson` ve `debrief` bilingual + Java
  analojili (§15) + iş bağlamlı (§9.3). Tekrar yasağına dikkat (§9.4).
- **P1-S3** E2E test `tests/mission-flow.spec.ts` (temsili sayfa, §22 kalıbı):
  adım kilidinin sırayla açıldığı, "Mini-lesson aç"ın çalıştığı, tüm adımlar
  bitince tamamlanma + XP'nin geldiği. Yeni route açılmıyor → §22.1 değişmez.
- **P1-S4** `NEXT_SESSION.md` + gerekliyse CLAUDE.md §5 blok-tipi listesine
  `mission` ekle.

### 3.4. Phase 1 "bitti" tanımı
- En az **6 teknoloji sayfasında** birer gerçek-QA görevi (Selenium referans +
  Playwright, Cypress, Python, SQL, API'den 5) canlı.
- `mission` bloğu `audit-learning-blocks` + i18n + build kapılarından geçiyor.
- Adım-kilidi + mini-lesson + tamamlanma akışı E2E testte yeşil.
- `skillSignals.js` görev tamamlanınca sinyal topluyor (Phase 3 için hazır).

---

## 4. PHASE 2 — QA Sprint / Company Simulator (Phase 1 üstüne)

**Hedef (yazıdan):**
```
Yeni Sprint → Bug geldi → Analiz et → Test Case yaz → Otomasyon yaz → CI çalıştır → Merge Request
```
Yani mini bir şirket simülasyonu. Kullanıcı "ders okumuyorum, QA oluyorum" hissini
BURADA yaşar.

**Neden Phase 1 üstüne?** Bir "sprint görevi" = birbirine bağlı `mission`'lar
zinciri + bir hikâye çerçevesi. Phase 1'in `mission` primitifi olmadan sıfırdan
yapılırsa sığ kalır; primitif varsa Simulator onları **diziye + role + XP/streak
ekonomisine** sarar.

**Yeni rota:** `/sprint` (veya `/qa-sim`) — yeni sayfa + `React.lazy` + `seo.js`
`ROUTE_SEO` + static shell (§2 route ekleme kuralı). CLAUDE.md route haritasına
eklenir; §22.1 istisna DEĞİL (normal test kapsamı).

**İskelet (Opus, backend YOK — local-first):**
- `SprintPage.jsx` — sprint panosu: aktif bug kartları, sprint ilerleme, "sprint'i
  kapat" ekonomisi. Kanban-vari 3 kolon (Backlog / In Progress / Done) — inline
  SVG/CSS, dış paket yok (§8).
- Bir sprint = `data/sprintsData.js` içinde `{ id, title, bugs: [{ id, title,
  severity, missions: [<mission zinciri>] }] }`. Her bug, Phase 1 `mission`'larını
  "Analiz → Test Case → Otomasyon → CI → Merge" adımlarına dizer.
- CI/Merge adımları: gerçek CI değil, `JenkinsSandboxBlock`/mevcut CI simülasyon
  bloklarının görev-içi kullanımı (yeşil/kırmızı pipeline animasyonu).
- Tamamlanınca: XP + streak + `recordSkillSignal` + "Sprint kapandı" kutlaması.

**Bu faz kullanıcı onayı + ayrı planlama ister** (yeni rota, daha büyük yüzey).
Phase 1 bitip kullanıcıya gösterildikten SONRA detaylandırılır — şimdilik iskelet.

---

## 5. PHASE 3 — Adaptif Zorluk + Beceriyi Challenge'lardan Besle

Yazının 3. ve 4. gözlemini kapatır. **Orta risk** (quiz motoru TopicPage ~18k
satır + çok E2E testi — §NEXT_SESSION).

- **Adaptif zorluk (#6):** quiz/prediction soru havuzuna `difficulty: 'easy'|'medium'|'hard'`
  etiketi + kullanıcı başarı geçmişine göre seçim. `ChallengeBlock` zaten
  XP'den zorluk türetiyor (`difficultyFromXp`, `ChallengeBlock.jsx:19`) — bu
  emsalin üstüne kurulur. §18 yedek-soru altyapısıyla birleşir ("yanlış → kolay
  alternatif").
- **Beceriyi challenge'lardan besle (#4):** `SkillRadar`'ı tamamlanan derslerden
  DEĞİL, Phase 1'in `skillSignals.js`'inden besle → radar "gerçekten çözülen
  challenge" gösterir. Mentor (`getPersistentWeakness`) da bu sinyali okuyup
  "bugün Java çalışma, SQL challenge'larına dön" diyebilir hâle gelir.

Riskli olduğundan **ayrı planlanır**; Phase 1-2'den sonra.

---

## 6. PHASE 4 — Park Edilen Epikler (yazının Phase 4 listesi)

Bilinçli olarak sona bırakıldı (yazının "özellik sayısı değil derinlik" ilkesi
gereği — bunlar yeni yüzey). Sırası kullanıcı kararı:
- **Portfolio Generator (#8, eski plan)** — mini framework → POM → API test → CI →
  push → paylaşılabilir portfolyo. En büyük epik; backend + git entegrasyonu ister.
- **Interview Arena** — mevcut mülakat gating + `grade-interview-answer` altyapısı
  üstüne zamanlı/rekabetçi bir mülakat modu.
- **Bug Hunting Labs** — mevcut `BuggyLoginForm`/`SecuritySimulations`/`VisualDiffDetectiveBlock`
  üstüne "bul-ve-raporla" laboratuvarı.
- **Team-based Challenges** — çok-kullanıcılı; Supabase realtime + leaderboard
  üstüne. En çok backend isteyen, en son.

---

## 7. Phase 1 için HAZIR PROMPTLAR

### 7.1. OPUS için (bileşen + altyapı — P1-O1…O5)

> Branch: `feature/challenge-first` (yoksa aç). Bu planın (bu dosya) **§2, §3**'ünü
> oku. Görevin: yeni `mission` (görev zinciri) blok tipini kurmak — challenge-first
> deneyim ("Görev → adım → takıldın mı? mini-lesson → tamamla"). YENİ SANDBOX YAZMA;
> `mission` MEVCUT blokları (code-playground, prediction, challenge, locator-explorer,
> editor) adım olarak GÖMER.
>
> Yap (her biri ayrı commit, §1.1 dörtlü kapı sonrası):
> 1. `src/components/MissionBlock.jsx` — self-contained, adım kilidi + ilerleme +
>    "Mini-lesson aç" + tamamlanma konfetisi, dark-mode + 44px mobil, bilingual.
>    Stil kalıbı: `PredictionBlock.jsx` / `LearningAnalytics.jsx`.
> 2. `TopicPage.jsx` → `case 'mission'`; renderer'a `renderInner` callback'i geçir
>    ki `MissionBlock` her `step.block`'u MEVCUT `renderBlock` üzerinden bassın
>    (adımların `onFirstSuccess` → `onExerciseCompleted` entegrasyonunu koru).
> 3. `src/lib/skillSignals.js` → `recordSkillSignal` / `getSkillSignals` (local-first,
>    `progressStore` anahtar kalıbı). Görev bitince `MissionBlock` çağırır.
> 4. `scripts/audit-learning-blocks.mjs`'e `mission` şema değişmezi (steps≥3, her
>    step'te `block`+`miniLesson`, benzersiz `id`, `relatedTopicId`). Build hard-fail.
> 5. REFERANS görev: `seleniumData.js`'e "Login sayfasını test et" (5 adım: buton bul
>    → XPath yaz → assertion → explicit wait → çalıştır) — mevcut locator/sandbox
>    bloklarını gömerek. Şema §3.2'de.
>
> Her dosyadan sonra ZORUNLU: `node --check` → `check-content-integrity.mjs` →
> `check-i18n-leaks.mjs` (baseline 0'ı BOZMA) → `npm run build`. Dördü geçmeden
> "bitti" deme. Bitince Sonnet'e §7.2 promptunu bırak, `NEXT_SESSION.md`'yi güncelle.

### 7.2. SONNET için (senaryo içeriği + test — P1-S1…S4)

> Branch: `feature/challenge-first`. Opus tarafı (MissionBlock + `case 'mission'` +
> skillSignals + audit + Selenium referans görevi) BİTTİ — bunları YENİDEN YAZMA.
> Bu planın **§3.2 şema** + `seleniumData.js`'deki referans görevi oku.
>
> Yap (her biri ayrı commit):
> 1. Diğer teknoloji sayfalarına birer **gerçek-QA görevi** ekle. Öncelik:
>    Playwright → Cypress → Python → SQL → API (Postman/REST Assured). Her görev o
>    sayfanın MEVCUT sandbox'larını gömer (yeni sandbox yazma), 3-7 adım, her adımda
>    `miniLesson` (takılınca ders), sonda `debrief` (gerçek QA bağlamı, §9.3).
> 2. Tüm metinler bilingual, Java analojili (§15), TR yorum Türkçe (§8), tekrar
>    yasağı (§9.4), `relatedTopicId` zorunlu.
> 3. `tests/mission-flow.spec.ts` — temsili sayfada adım-kilidi + mini-lesson +
>    tamamlanma + XP akışı (§22 kalıbı; yeni route yok → §22.1 değişmez).
> 4. `NEXT_SESSION.md` güncelle; CLAUDE.md §5 blok listesine `mission` ekle.
>
> Her dosyadan sonra ZORUNLU (§1.1): `node --check` → content-integrity →
> i18n:check (baseline 0) → build. Parça parça ilerle, her sayfadan sonra ayrı commit.

---

## 8. Karar Kapıları (§13/§21)

Opus kodlamaya başlamadan SEN'in onaylaman gereken tek ürün kararı (§3.3):
**görevler sayfa-içi mi (öneri) yoksa ayrı "Görevler" sekmesi mi?** Backend
gerektirmediğinden başka elle altyapı adımı yok. Phase 2 (yeni `/sprint` rotası)
ve Phase 3 (quiz motoru) ayrı onay + ayrı planlama ister — Phase 1 bitip sana
gösterildikten sonra.
