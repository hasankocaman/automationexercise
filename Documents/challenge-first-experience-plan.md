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
>
> **📌 DURUM (2026-07-30, Opus): PHASE 1.5 KAVRAM TOOLTIP OPUS TARAFI (P1.5-O1…O3)
> da TAMAMLANDI ve commit'lendi** (§3.6). Yazılanlar: `src/data/termGlossary.js`
> (~24 tohum terim), `src/components/TermTooltip.jsx` (hover/tap popover +
> `highlightGlossaryTerms` helper), `TopicPage.jsx` `text`/`simple-box` render'ına
> bağlama. Gate'ler yeşil (content-integrity + i18n:0 + build). **SONNET sözlüğü
> yüzlerce terime genişletecek + test yazacak — hazır prompt §7.3'te.**
> **📌 DURUM (2026-07-31, Sonnet): SONNET TARAFI DA TAMAMLANDI.**
> - **Mission rollout (§7.2, P1-S1…S4) TAMAMLANDI:** 6 sayfa (Selenium
>   referans + Playwright + Cypress + Python + SQL + REST Assured), her biri
>   5 adım (locator/selector seçimi + aksiyon + assertion + doğru bekleme/
>   negatif senaryo kararı + uçtan uca birleştirme), `tests/mission-
>   flow.spec.ts` (veri-güdümlü E2E, yerel Chromium'da PASS), CLAUDE.md §5
>   blok listesine `mission` eklendi. **Plan §3.4 "bitti" tanımı KARŞILANDI.**
> - **Tooltip sözlüğü (§7.3, P1.5-S1 + P1.5-S3) TAMAMLANDI:** `termGlossary.js`
>   24 → 57 terime genişletildi (33 yeni: loop, condition, class/object,
>   inheritance, JSON, HTTP status, cookie/session, container, image, pod,
>   thread, async/await, promise, callback, closure, generic, regex, env
>   variable, dependency, repository, deploy, rollback, cache, latency,
>   idempotent, token, schema, webhook, payload, queue, load balancer,
>   log/stack trace, race condition). `tests/term-tooltip.spec.ts` (yeni,
>   veri-güdümlü E2E: hover/focus/ESC/kod-bloğunda-sarılmama, yerel
>   Chromium'da 2/2 PASS). P1.5-S2 (kapsamı callout/info/tip'e genişletme)
>   opsiyonel bırakıldı — kapsam dışı bırakılan bir sonraki oturuma not.
> - **PHASE 1 + PHASE 1.5 TAMAMEN BİTTİ.** Kalan: Phase 2 (Sprint Simulator)
>   ve Phase 3 (adaptif zorluk) — ikisi de ayrı kullanıcı onayı + planlama
>   ister (plan §4/§5), bu oturumun kapsamı dışında.
>
> **📌 DURUM (2026-07-31, Sonnet): MISSION DALGA 2 — 6 sayfaya ikinci görev
> TAMAMLANDI (kullanıcı onayı: "mevcut 6 sayfada, aksiyon sekmelerine +1-2
> görev").** Her sayfaya, referans görevden (locator/selector teması) FARKLI
> bir aksiyon sekmesine ikinci bir mission eklendi (§9.2 Dalga 2 tablosu):
> Selenium/Playwright → Framework Mimarisi (POM refactor), Cypress → Network
> & Intercept (stub/loading/error), Python → Troubleshooting (traceback
> teşhisi), SQL → JOINs (yetim kayıt bulma), REST Assured → Test Zinciri
> (POST→extract→guard→GET). **Toplam mission sayısı: 6 → 12.** Bir gerçek bug
> yakalanıp düzeltildi: Cypress'in Network & Intercept sekmesi (s5) çift-ağaçlı
> olduğundan ilk yazımda görev yalnızca EN ağacına gitmişti — doğrulama
> sırasında yakalanıp TR ağacına da eklendi (§9.2 not). Tüm 6 commit'te
> §1.1 dörtlü kapı + `mission-flow.spec.ts` regresyon testi (Selenium'da artık
> 2 mission var, test doğru olanı bulup PASS oldu) çalıştırıldı, hepsi yeşil.
> §9.2 manuel test rehberi Dalga 2 tablosuyla güncellendi.

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

## 3.6. PHASE 1.5 — Kavram Tooltip'i (Yazılım Bilmeyen Kullanıcı için Günlük-Hayat Benzetmeleri)

**Kaynak:** Kullanıcı gözlemi (2026-07-30): "Hiç yazılım bilmeyen bir kullanıcı
siteyi incelerken yazılım kavramlarını bilmediğinden en basit konuları dahi
anlamıyor." **Hedef:** Yazılım terimlerinin geçtiği yerlerde, o terimin ÜSTÜNE
gelince (hover) / dokununca (mobil) küçük bir açıklama baloncuğu belirsin — teknik
tanım DEĞİL, günlük hayattan basit bir **benzetme** (örn. "fixture = yemek yapmadan
önce malzemeleri tezgaha dizmek"). En iyi UX ile: göze batmayan noktalı alt çizgi,
hover/focus/tap ile açılan, ESC/dışarı-tık ile kapanan, klavye-erişilebilir popover.

**Bu §9.3'ün (4-katmanlı derin analoji) YERİNE GEÇMEZ** — o, yetişkin QA mühendisi
için sayfa içeriğindeki `simple-box` analojisidir. Bu ise inline, tek-cümlelik,
**sıfır-bilgi** kullanıcıya yönelik mikro-tooltip. İkisi bir arada çalışır.

### 3.6.1. Tasarım (bağlayıcı)
- **Merkezî sözlük (tek kaynak):** `src/data/termGlossary.js` — `{ termKey: { term:{tr,en},
  aliases:[...ascii...], short:{tr,en}, analogy:{tr,en} } }`. `analogy` yıldızdır
  (günlük-hayat benzetmesi); `short` tek-cümle sade tanım. **Terimi bir kez tanımla,
  her yerde otomatik vurgulan.**
- **Otomatik vurgulama (auto-highlight):** `highlightGlossaryTerms(text, language, darkMode)`
  düz metni gezip bilinen terimlerin **her metin bloğunda İLK geçtiği yeri** bir
  `<TermTooltip>` ile sarar (kelime-sınırı, büyük/küçük harf duyarsız, blok başına
  en çok ~8 terim → gürültü olmaz). **Yalnızca prose render'larına uygulanır; kod
  blokları/tablolar ASLA sarılmaz.**
- **UX:** noktalı alt çizgi + `cursor: help`; hover VE focus (klavye) VE tap (mobil)
  açar; ESC + dışarı-tık kapatır; `role="tooltip"` + `aria`; dark mode + bilingual
  (dil zaten seçili); 44px dokunma hedefi; popover terimin ÜSTÜnde açılır (layout'u
  itmez), `max-width: min(280px, 80vw)`.
- **i18n:** `aliases` düz string olduğundan **yalnız ASCII** (Türkçe-özel karakterli
  yüzey formu leak taramasını tetikler, §23.1). Türkçe metin `term.tr`/`analogy.tr`/
  `short.tr` içinde (`{tr,en}` objesi — güvenli). `en` tarafları saf İngilizce.

### 3.6.2. OPUS ne yapar (P1.5-O1…O3) — BU OTURUMDA YAPILDI
- **P1.5-O1** `src/data/termGlossary.js` — sözlük + **~24 tohum terim** (locator,
  selector, assertion, fixture, XPath, DOM, API, endpoint, CI/CD, pipeline, commit,
  merge, branch, framework, boolean, null, exception, variable, array, query,
  flaky test, timeout, mock, regression). Sonnet YÜZLERCE terime genişletecek.
- **P1.5-O2** `src/components/TermTooltip.jsx` — `TermTooltip` popover bileşeni +
  `highlightGlossaryTerms` helper (modül seviyesinde tek-sefer regex + yüzey→key
  lookup). Self-contained, yeni CDN/paket yok.
- **P1.5-O3** `src/components/TopicPage.jsx` — `case 'text'` ve `case 'simple-box'`
  render'ına `highlightGlossaryTerms(...)` bağlandı (minimal, düşük risk; kod
  render'ları değişmedi).

### 3.6.3. SONNET ne yapar (P1.5-S1…S3) — SIRADAKİ İŞ (prompt §7.3)
- **S1 — Sözlüğü genişlet:** `termGlossary.js`'e sayfalarda geçen TÜM kavramları
  ekle (dil başına: değişken tipleri, döngü, koşul, sınıf/nesne, kalıtım, JSON,
  HTTP/status kod, cookie/session, container, image, pod, thread, async/await,
  promise, callback, closure, generic, regex, environment variable, dependency,
  repository, deploy, rollback, cache, latency, throughput, idempotent…). Her biri
  günlük-hayat benzetmeli, bilingual, aliases ASCII, tekrar yasağı (§9.4).
- **S2 — Kapsamı genişlet (opsiyonel, dikkatli):** `highlightGlossaryTerms`'ü
  `callout`/`info`/`tip`/list prose render'larına da bağla (heading'lere BAĞLAMA —
  kısa, kalabalık görünür). Her eklemede kod/tablo render'ına bulaşmadığını doğrula.
- **S3 — Test:** `tests/term-tooltip.spec.ts` — bir ders sayfasında bilinen bir
  terimin noktalı-çizgili sarıldığı, hover/tap ile popover'ın açıldığı ve benzetme
  metnini gösterdiği, ESC ile kapandığı; kod bloğu içindeki aynı kelimenin
  SARILMADIĞI. Yeni route yok → §22.1 değişmez.

**Opus doğrulama (bu oturum):** node --check (termGlossary.js) + content-integrity
+ i18n baseline 0 + build — hepsi geçti.

### 3.6.4. Genişletme (2026-07-31, kullanıcı talebi) — giriş sayfalarında yoğunluk

**Kaynak:** Kullanıcı: "Kavram Tooltip'i özellikle yeni başlayan kullanıcılar için
gerekli. İlk girilen sayfalar (Test Nedir, Manuel Test, Algoritma Temelleri ve
Java/TypeScript/Python) burda açıklamalar daha yoğun olmalı — kullanıcı ilk
öğrendiği derslerde kavramları TAM anlamalı."

**Bulunan kök neden:** `/manual-testing` ve `/algorithms` sayfaları `TopicPage.jsx`
KULLANMIYOR — kendi özel component'leri var (`ManualTestingPage.jsx`,
`AlgorithmsPage.jsx`), bu yüzden `highlightGlossaryTerms` bu iki sayfada HİÇ
çalışmıyordu (ölçüldü: 0 tetikleyici). `/what-is-testing` TopicPage kullandığı
için mekanizma zaten aktifti ama sözlük bu sayfaların özgün kelime dağarcığını
(bug, severity, black box, edge case, algorithm, recursion…) henüz kapsamıyordu.

**Yapılan:**
- `ManualTestingPage.jsx` → `InfoBox` bileşenine (`lesson.analogy/why/realLife`
  metinlerini basan tek nokta) `highlightGlossaryTerms` bağlandı.
- `AlgorithmsPage.jsx` → `LessonCard`'daki `lesson.analogy/why` render'larına
  aynı şekilde bağlandı.
- `termGlossary.js` 57 → 84 terime genişletildi: test temelleri (bug, severity,
  priority, test case, black/white box, smoke/sanity test, unit/integration
  test, requirement, acceptance criteria), manuel test (repro steps, expected/
  actual, exploratory testing, edge/boundary case), algoritma (algorithm,
  recursion, big O, data structure, stack/queue, binary search), dil temelleri
  (syntax, compile/interpret, data type, function, parameter, IDE), ortam
  (production, environment).

**Ölçülen etki (Playwright, gerçek tarayıcı):** `/manual-testing` 0→33,
`/algorithms` 0→7, `/what-is-testing` sekmeleri 1→(1-10) tetikleyici.

**Bilinen kalıcı sınır:** Türkçe eklerin (ör. "testleri", "birim testleri")
`\b` kelime-sınırı regex'iyle tam eşleşmemesi — dil-farkında kök bulma
(stemming) olmadan tam çözülemez, kabul edilen bir kısıtlama (mikro-tooltip,
NLP değil). `/python`, `/typescript`, `/java` zaten TopicPage kullandığından
bu dalga öncesinde de aktifti; §3.6.4 terimleri (data type, function, syntax
vb.) bu üç sayfada da otomatik devreye girdi, ayrı bir wiring gerekmedi.

**Doğrulama:** content-integrity + i18n baseline 0 + build (43 shell) +
`tests/term-tooltip.spec.ts` + `tests/mission-flow.spec.ts` regresyon (3/3 PASS).

### 3.6.5. Genişletme (2026-07-31, kullanıcı talebi) — rehber karakter (mascot)

**Kaynak:** Kullanıcı: "Kullanıcıya bu bilmediği kelimelerde açıklamalar
çıkacağını söyleyen bir balon olsa — sevimli bir animasyon karakteri ve
konuşma balonuyla, sayfanın neresine giderse gitsin kullanıcıyı yönlendirse."
CLAUDE.md §20 ("Disney/Pixar Modu") ruhuna doğrudan uyuyor.

**Kullanıcı kararları (AskUserQuestion, 3 soru):**
1. Konumlanma: **sabit köşe**, scroll'u TAKİP ETMEZ (gerçek scroll-pozisyon
   takibi, mühendislik riskini karşılamayan bir "hoş geldin" özelliği için
   orantısız — `OnboardingTour.jsx`'in "spotlight yerine sabit kart" kararıyla
   AYNI gerekçe, plan §3.6'nın kendi dosya başı yorumunda zaten belgeli).
2. Kapsam: **sadece 3 giriş sayfası** (`/what-is-testing`, `/manual-testing`,
   `/algorithms`) — §3.6.4'te yoğunlaştırılan sayfalarla AYNI.
3. Zamanlama: **her ziyarette küçük bir rozet** olarak durur (localStorage'da
   "bir daha gösterme" YOK), tıklanınca konuşma balonu açılır/kapanır.

**Yapılan:**
- `src/components/TooltipGuideMascot.jsx` (yeni) — self-contained: dil için
  `useLanguage()`, dark mode için `document.documentElement`'teki 'dark-mode'
  class'ını İZLEYEN salt-okunur bir `MutationObserver` (İKİNCİ bir state
  yöneticisi YAZILMAZ, TopicPage/AlgorithmsPage'in zaten yazdığı class okunur).
  🦉 emoji karakter + tıklanınca açılan konuşma balonu (Kavram Tooltip'i
  özelliğini anlatan bilingual metin).
- `TopicPage.jsx`'e DOKUNULMADI (onlarca sayfada paylaşılır, oraya eklersen
  HER teknoloji sayfasında görünürdü — kapsam kararı #2'yi ihlal ederdi).
  Bunun yerine 3 sayfanın KENDİ wrapper component'ine eklendi:
  `WhatIsTestingPage.jsx` (ince TopicPage sarmalayıcı, sibling olarak),
  `ManualTestingPage.jsx` + `AlgorithmsPage.jsx` (kendi ana `return` JSX'lerinin
  sonuna, mevcut 🏠 butonundan hemen sonra).
- **Konum düzeltmesi (gerçek tarayıcı testiyle bulundu):** ilk sürüm sol-alt
  köşedeydi (`bottom:16px, left:16px`) — App.jsx'te GLOBAL render edilen
  `ChatWidget` (`fixed bottom-20 left-4 z-[999]`) ile AYNI sütunda sadece
  20px arayla duruyordu; konuşma balonu AÇILINCA ChatWidget'ın üstüne
  biniyordu (ekran görüntüsüyle doğrulandı). **Düzeltme:** sol kenar
  DİKEY-ORTA konuma taşındı (`position: fixed, left, top:50%,
  translateY(-50%)`) — ChatWidget/CommentsWidget/🏠/📍 gibi TÜM köşe-yığılan
  widget'lardan tamamen bağımsız, z-index 900 (bu widget'ların 999'undan
  DÜŞÜK, herhangi bir gelecekteki proximity'de onlar KAZANIR).
- `tests/tooltip-guide-mascot.spec.ts` (yeni) — 3 sayfada rozet+balon aç/kapa
  + kapsam-dışı sayfada (`/selenium`) hiç görünmeme + ChatWidget'la çakışmama
  (bounding box kesişim kontrolü). **5/5 PASS.**

**Genişletme (2026-07-31, aynı oturum, ikinci kullanıcı talebi) — dikkat
çekme animasyonu:** "Maskot ilk sayfa açılışta yanıp sönsün, kullanıcı bir
defa tıklayınca boyutuna geri dönsün ve sabit kalsın." Eklendi:
- `hasInteracted` state — rozet, kullanıcı İLK tıklayana kadar
  `tooltipGuideAttention` keyframe'i ile sürekli yanıp söner (ölçek 1→1.22 +
  opaklık 1→0.55, 1.1sn döngü); ilk tıklamadan SONRA (o sayfa ziyareti
  boyunca, açık/kapalı fark etmez) animasyon KALICI olarak `none` olur, rozet
  normal boyutuna (44×44) döner.
- **Bulunan gerçek bug (keyframes kapsamı):** `@keyframes` tanımı önce SADECE
  balonun içinde render ediliyordu (`{open && (...)}` bloğunda) — ama rozet
  balon hiç AÇILMADAN önce (kapalıyken) zaten yanıp sönmesi gerekiyordu.
  Keyframe tanımı, HER ZAMAN render edilen dış container'a taşınarak
  düzeltildi.
- **Bulunan gerçek bug (Playwright actionability):** rozet SÜREKLİ pulse
  ettiğinden, Playwright'ın `click()` işlemindeki "stable" (elementin
  hareketsiz olması) actionability kontrolü İLK tıklamadan önce asla geçmiyor
  — test zaman aşımına uğruyordu. Gerçek kullanıcı tıklaması bundan
  ETKİLENMEZ (tarayıcı olayı anında iletir); test'te İLK tıklama
  `{ force: true }` ile yapılarak düzeltildi (fonksiyonel bir sorun DEĞİL,
  sadece test-tooling'in katı bekleme davranışını atlatma).
- `tests/tooltip-guide-mascot.spec.ts`'e yeni test eklendi: animasyonun
  tıklamadan önce çalıştığını, tıklamadan sonra kalıcı olarak durduğunu ve
  boyutun 44×44'e döndüğünü doğrular. **6/6 PASS** (temiz/tek-worker koşum;
  art arda çok test koşulduğunda dev server meşgul olup transient timeout
  verebiliyor — bu bilinen bir CI/local-koşum notu, mascot mantığıyla ilgisi
  yok).

**Doğrulama:** content-integrity + i18n baseline 0 + build (43 shell) +
`tests/tooltip-guide-mascot.spec.ts` (6/6) + `term-tooltip.spec.ts` +
`mission-flow.spec.ts` regresyon (3/3) — hepsi geçti.

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

### 7.3. SONNET için (Kavram Tooltip sözlüğü — P1.5-S1…S3)

> Branch: `feature/challenge-first`. Opus tarafı (TermTooltip + highlightGlossaryTerms
> + termGlossary seed + text/simple-box bağlama) BİTTİ — bunları YENİDEN YAZMA. Planın
> **§3.6** bölümünü oku.
>
> Yap (her biri ayrı commit):
> 1. **S1 — `src/data/termGlossary.js` sözlüğünü genişlet.** Sitedeki sayfalarda geçen
>    ve yazılım bilmeyen birinin anlamayacağı TÜM kavramları ekle (bkz. §3.6.3 liste).
>    Her giriş: `term:{tr,en}`, `aliases:[…ASCII yüzey formları…]`, `short:{tr,en}`
>    (tek cümle sade tanım), `analogy:{tr,en}` (GÜNLÜK-HAYAT benzetmesi — yıldız bu).
>    Kurallar: `en` tarafı saf İngilizce; `aliases` YALNIZ ASCII (Türkçe-özel karakter
>    i18n leak tetikler, §23.1); aynı/benzer benzetmeyi farklı terimde TEKRARLAMA (§9.4);
>    "test" gibi aşırı yaygın kelimeleri sözlüğe EKLEME (her yerde vurgulanır, gürültü olur).
> 2. **S2 (opsiyonel) — kapsamı genişlet:** `highlightGlossaryTerms`'ü `callout`/`info`/
>    `tip`/list prose render'larına da bağla (TopicPage). Heading'lere BAĞLAMA. Her
>    eklemeden sonra kod/tablo render'larına bulaşmadığını gözle doğrula.
> 3. **S3 — `tests/term-tooltip.spec.ts`:** bilinen terimin sarıldığı + hover/tap ile
>    benzetmenin göründüğü + ESC ile kapandığı + kod bloğundaki aynı kelimenin
>    SARILMADIĞI. Yeni route yok → §22.1 değişmez.
>
> Her dosyadan sonra ZORUNLU (§1.1): `node --check src/data/termGlossary.js` →
> content-integrity → i18n:check (baseline 0) → build. Dördü geçmeden "bitti" deme.

---

## 8. Karar Kapıları (§13/§21)

Opus kodlamaya başlamadan SEN'in onaylaman gereken tek ürün kararı (§3.3):
**görevler sayfa-içi mi (öneri) yoksa ayrı "Görevler" sekmesi mi?** Backend
gerektirmediğinden başka elle altyapı adımı yok. Phase 2 (yeni `/sprint` rotası)
ve Phase 3 (quiz motoru) ayrı onay + ayrı planlama ister — Phase 1 bitip sana
gösterildikten sonra.

---

## 9. Manuel Test Rehberi (Phase 1 + Phase 1.5)

> Phase 1 + Phase 1.5 içerik olarak TAMAMLANDI (§0). Bu bölüm, otomatik
> script'lerin (content-integrity, i18n:check, build, audit-learning-blocks)
> ve otomatik testlerin (`tests/mission-flow.spec.ts`,
> `tests/term-tooltip.spec.ts`) YAKALAYAMADIĞI şeyleri — görsel doğruluk,
> gerçek kullanıcı hissi, dark mode/mobil/dil geçişleri — elle doğrulamak
> için adım adım bir rehberdir. Yeni bir oturumda buraya dönen biri (Claude
> Code veya kullanıcı) buradan başlamalı. `qa-frontend-page-plan.md §F` ile
> aynı kalıp.

### 9.0. Kurulum

```bash
npm run dev
# Tarayıcıda: http://localhost:5173
```

Konsolu (DevTools → Console) AÇIK tut — testin tamamı boyunca kırmızı bir
hata/uyarı çıkmamalı (React key uyarısı, `undefined` prop uyarısı, 404
network isteği gibi).

Otomatik testleri de elle tetiklemek istersen (aynı şeyi tarayıcıda görmeden
önce/sonra doğrulamak için):

```bash
npx playwright test tests/mission-flow.spec.ts --project=chromium
npx playwright test tests/term-tooltip.spec.ts --project=chromium
```

### 9.1. Genel Mission Akışı (6 sayfada da AYNI desen — her sayfa ~4 dakika)

Aşağıdaki adım dizisini HER görev sayfasında aynen uygula (sayfaya özel
detaylar §9.2'de):

1. Sayfayı aç, sol sidebar'dan §9.2 tablosundaki sekmeye tıkla, aşağı kaydırıp
   **🎯 Görev** başlıklı kartı bul.
2. Kartın üstünde senaryo metni (örn. "Bugün bir e-ticaret sitesinin login
   sayfasını test edeceksin...") ve mor bir **persona rozeti** ("QA Engineer ·
   Sprint 4") görünmeli.
3. İlerleme çubuğu **"0/5 adım"** göstermeli; **sadece 1. adım** açık
   (numaralı daire dolu renkli), **2-5. adımlar 🔒 kilitli** ve soluk
   (opacity düşük) görünmeli.
4. 1. adımda **"💡 Takıldın mı? Mini-lesson aç"** düğmesine bas — bir açıklama
   metni açılmalı; tekrar basınca kapanmalı.
5. 1. adımı tamamla:
   - **Adım bir tahmin (prediction) ise:** ÖNCE bilerek YANLIŞ bir şık seç,
     "Tahminimi Onayla"ya bas — turuncu bir "Yakındın..." mesajı + seçtiğin
     yanlış şıkkın `why` açıklaması + "↻ Tekrar dene" düğmesi görünmeli
     (§18 mikro-geri bildirim, kırmızı moral bozucu ekran YOK). Tekrar dene,
     bu kez DOĞRU şıkkı seç, onayla — yeşil "Doğru tahmin!" + `reveal`
     açıklaması çıkmalı.
   - **Adım bir kod yazma (code-playground) ise:** metin kutusuna kendi
     çözümünü yazmayı DENE (asıl kullanıcı deneyimi budur). Bilerek yanlış
     bir şey yaz, "▶ Çalıştır ve Kontrol Et"e bas — kırmızı "Henüz değil..."
     + hangi satırın farklı olduğunu gösteren tanı paneli çıkmalı. İki
     başarısız denemeden sonra **"Çözümü Uygula"** düğmesinin belirdiğini
     doğrula, tıkla — kutu otomatik doğru çözümle dolmalı; "Çalıştır ve
     Kontrol Et"e tekrar bas — yeşil "Doğru!" mesajı çıkmalı.
6. 1. adımın artık **✓ (yeşil)** göründüğünü, **2. adımın kilidinin açıldığını**
   (🔒 kalkmış, kenarlık rengi mora döndü) doğrula.
7. Adım 4-6'yı adım 2, 3, 4, 5 için TEKRARLA (aynı yöntemler: prediction →
   yanlış+doğru dene, code-playground → yanlış dene + çözümü uygula).
8. 5. adım da bitince: **"🏆 Görev tamamlandı! Bir QA gibi uçtan uca çözdün."**
   banner'ı + altında **debrief** metni (gerçek QA bağlamına bağlayan
   kapanış) görünmeli. Konfeti animasyonunun oynadığını doğrula.
9. DevTools → Console'da şunu çalıştır (route adını §9.2'den al, örn.
   `selenium`):
   ```js
   JSON.parse(localStorage.getItem('learnqa_xp_selenium'))
   ```
   `completed` dizisinde mission id'nin (§9.2 tablosu) olduğunu, `xp`
   değerinin arttığını doğrula.
10. Sayfayı YENİLE (F5) — görevin hâlâ tamamlanmış göründüğünü (adımlar
    kilitsiz, hepsi ✓, banner hâlâ görünür) doğrula — kalıcılık kontrolü.
11. Sağ üstten **dil toggle**'ı EN yap — senaryo, adım brief'leri,
    mini-lesson'lar, debrief, buton metinleri (`Mini-lesson aç` →
    `Open mini-lesson` gibi) HEPSİ İngilizce olmalı, hiçbir Türkçe kalıntı
    görünmemeli.
12. **Dark mode**'u aç/kapa — kart arka planı, metin renkleri, ilerleme
    çubuğu okunur kalmalı (siyah yazı siyah zemin çakışması yok).
13. DevTools → responsive mode, **375px** genişlik — adım kartları alt alta
    dizilmeli (yatay taşma yok), düğmeler parmakla basılabilir boyutta
    (~44px) kalmalı.

### 9.2. Sayfaya Özel Detaylar (12 görev — 6 sayfa × 2 görev)

> **Genişletme notu (2026-07-31, kullanıcı onayı):** Her sayfaya birer İKİNCİ
> görev eklendi — bir "aksiyon" sekmesine daha (Framework Mimarisi/Network/
> Troubleshooting/JOINs/Test Zinciri), böylece her 6 sayfada da 2'şer mission
> canlı. "Her dikey sekmede" değil, bilinçli olarak SEÇİLİ aksiyon sekmelerine
> sınırlı tutuldu (§1.1 gerekçesi: kavram sekmelerinde zorlama görev, özellik
> sayısını artırıp derinliği sulandırır).

**Dalga 1 — referans görevler (locator/selector teması):**

| Sayfa | Sidebar Sekmesi | Görev Adı | Mission ID | Route (XP anahtarı) |
|---|---|---|---|---|
| `/selenium` | 🎯 Locators | Login sayfasını test et | `selenium-login-mission` | `selenium` |
| `/playwright` | 🎯 Locator Stratejileri | Sepete ürün ekle | `playwright-cart-mission` | `playwright` |
| `/cypress` | 🖱️ Temel Komutlar & Selector Stratejisi | Ürün ara ve sonuçları doğrula | `cypress-search-mission` | `cypress` |
| `/python` | 🛠️ Real World (pytest) / Gerçek Hayat (pytest) | Kullanıcı API'sini pytest ile test et | `python-api-test-mission` | `python` |
| `/sql` | 🟢 SELECT & Sort / SELECT & Sıralama | Ürün fiyat verisini doğrula | `sql-price-validation-mission` | `sql` |
| `/rest-assured` | ✅ Assertions | GET /api/users/2 isteğini test et | `restassured-user-api-mission` | `rest-assured` |

**Dalga 2 — ikinci görevler (farklı tema, her sayfada aksiyon sekmesi):**

| Sayfa | Sidebar Sekmesi | Görev Adı | Mission ID | Route (XP anahtarı) |
|---|---|---|---|---|
| `/selenium` | 🏗️ Framework Mimarisi (SOLID + POM) | Ham testi Page Object Model'e refactor et | `selenium-pom-refactor-mission` | `selenium` |
| `/playwright` | 🏗️ Framework Mimarisi | Ham testi Page Object'e refactor et (TypeScript) | `playwright-pom-refactor-mission` | `playwright` |
| `/cypress` | 🌐 Network & cy.intercept() | Yavaş API'yi stub'la, loading/hata durumunu test et | `cypress-network-stub-mission` | `cypress` |
| `/python` | 🚨 Yaygın Hatalar / Troubleshooting | CI'da patlayan traceback'i oku, kök nedeni bul, düzelt | `python-traceback-debug-mission` | `python` |
| `/sql` | 🟡 SQL JOINs | Sipariş verisinde yetim (orphaned) kayıtları bul | `sql-orphan-orders-mission` | `sql` |
| `/rest-assured` | 🔗 Test Zinciri — Gerçek E2E Senaryolar | Kullanıcı oluştur, id'yi çıkar, GET ile doğrula | `restassured-chain-mission` | `rest-assured` |

Her sayfada §9.1'in genel akışına ek olarak şunlara dikkat et:
- **Selenium/Playwright/Cypress (Dalga 1):** görevler ilgili sayfanın var olan
  Locator/Selector Explorer bloğunun HEMEN ardından gelmeli (aynı sekmede,
  konu anlatımından sonra — §9.1 sıralama kuralı).
- **Python (Dalga 1):** görev, "Real World (pytest)" sekmesinin EN SONUNDA
  (mevcut fixture/parametrize challenge'larından sonra) yer almalı.
- **SQL (Dalga 1):** görev "SELECT & Sort" sekmesinin sonunda,
  `predSqlDistinctMultiCol` prediction'ından hemen sonra gelmeli.
- **REST Assured (Dalga 1):** görev "✅ Assertions" sekmesinin,
  `http-flow-animation` bloğundan hemen sonra, sekmenin en sonunda yer almalı.
- **Selenium/Playwright (Dalga 2):** POM refactor görevi Framework Mimarisi
  sekmesinin EN SONUNDA — mevcut BasePage/fixture içeriğiyle ÇAKIŞMAZ, sade
  class-tabanlı POM kalıbını tamamlar (debrief bir sonraki adımı işaret eder).
- **Cypress (Dalga 2):** ⚠️ bu sekme (Network & Intercept) ÇİFT-AĞAÇLI —
  `s5.tr.blocks` ve `s5.en.blocks` AYRI diziler. Görev HER İKİSİNE de eklendi
  (ilk yazımda sadece EN'e gitmişti, doğrulamada yakalanıp düzeltildi — yeni
  bir görev eklerken bu sekmede iki ağacı da kontrol et).
- **Python (Dalga 2):** traceback görevi "Yaygın Hatalar/Troubleshooting"
  sekmesinin EN SONUNDA, `challengeFlakyInvestigateOrder`'dan sonra.
- **SQL (Dalga 2):** JOIN görevi "SQL JOINs" sekmesinin sonunda,
  `predSqlJoinRowMultiplication` prediction'ından hemen sonra.
- **REST Assured (Dalga 2):** chaining görevi "Test Zinciri" sekmesinin en
  sonunda — sekmenin ZATEN gösterdiği tam `UserCrudE2ETest` (5 adımlı CRUD)
  örneğinin EN KÜÇÜK yapı taşını (POST→extract→guard→GET) uygulamalı yapar.

### 9.3. Kavram Tooltip'i (Phase 1.5) Test Rehberi (~5 dakika)

1. **Herhangi bir teknoloji sayfasına git** (Kavram Tooltip'i SİTE GENELİNDE
   `text`/`simple-box` bloklarına bağlıdır — tek bir sayfayla sınırlı değil).
   Önerilen: `/selenium` → 🎯 Locators sekmesi (açılış `simple-box`'ında
   "Locator", "API", "DOM" gibi birden fazla bilinen terim var).
2. Prose metinde **noktalı alt çizgili** bir kelime bul (örn. "Locator") —
   üstüne gelince imleç `help` (soru işaretli) olmalı.
3. **Hover et** — kelimenin ÜSTÜNDE küçük bir baloncuk açılmalı: 💬 ikonu +
   terim adı + günlük-hayat benzetmesi + altında tek-cümlelik sade tanım.
4. Fareyi UZAKLAŞTIR (baloncuğun dışına) — baloncuk kapanmalı.
5. **Klavye ile:** Tab tuşuyla o kelimeye fokuslan (veya tıklayıp fokusla) —
   baloncuk YİNE açılmalı (fare kullanmadan, erişilebilirlik). Tab ile
   başka bir yere geçince (blur) kapanmalı.
6. Baloncuk açıkken **ESC** tuşuna bas — kapanmalı.
7. Kelimeye **tıkla** (tap simülasyonu) — baloncuk açılmalı/kapanmalı
   (aç/kapa toggle). **Not:** fare ÖNCE o kelimenin üstündeyse (hover ile
   zaten açıksa) hemen ardından tıklamak baloncuğu KAPATIR (toggle) —
   bu beklenen davranıştır, bug değildir.
8. Sayfada bir **kod bloğu** (koyu arka planlı `<pre>` kutusu) bul — içinde
   glossary'de olan bir kelime (örn. "array", "class", "commit") geçse bile
   o kelimenin ALTI ÇİZİLİ OLMAMALI, tıklanabilir olmamalı — mekanizma
   SADECE prose (`text`/`simple-box`) render'larına bağlıdır, kod bloklarına
   ASLA uygulanmaz.
9. Dil toggle'ı EN yap, aynı kelimeye hover et — baloncuktaki benzetme
   metni İngilizce olmalı.
10. Dark mode aç — baloncuk renkleri (arka plan/border/metin) okunur kalmalı.
11. **İsteğe bağlı geniş tarama:** `/python`, `/docker`, `/jenkins` gibi
    farklı sayfalarda da rastgele birkaç `simple-box`/paragraf üzerinde
    aynı davranışı gözle doğrula — mekanizma TÜM sayfalarda aktif olmalı
    (P1.5-S2 — callout/info/tip render'larına genişletme henüz yapılmadı,
    bu blok tiplerinde tooltip GÖRÜNMEZ, bu bilinen bir kapsam sınırıdır).

### 9.4. Bilinen, Endişelenmeyecek Uyarılar

- Build çıktısında `seleniumData` chunk'ının 633 kB, `TopicPage` chunk'ının
  1.6 MB üzerinde olduğu uyarısı — **build'i bozmaz**, CLAUDE.md §14/§23.8
  kapsamındaki bilinen bir durumdur.
- Browserslist/caniuse-lite eski veri uyarısı — build'i bozmaz.
- Playwright test çıktısında `[BABEL] Note: the code generator has
  deoptimised the styling of TopicPage.jsx` notu — sadece dosya boyutuyla
  ilgili bir Babel notudur, test sonucunu etkilemez.

### 9.5. Bir Şey Bozuk Görünüyorsa

Önce CLAUDE.md §23 (En Sık Karşılaşılan Hatalar) bölümüne bak — özellikle
§23.1 (EN modda TR sızıntısı, özellikle ASCII-normalize kör noktası: bu
oturumda 4 `prediction.code` alanında gerçekten yakalandı, bkz. `NEXT_SESSION.md`
2026-07-30/31 girdileri). `mission`/`term-tooltip` için yeni bir tekrarlayan
hata bulursan CLAUDE.md §23'e (bu dosyaya değil) ekle.
