# QA Sprint Simulator + Açık Kalemler Planı

> **Branch:** `feature/sprint-simulator`
> **Oluşturuldu:** 2026-08-01
> **Öncülü:** `Documents/challenge-first-experience-plan.md` (Phase 1 + 1.5 BİTTİ, `main`'de)
> **Kapsam:** Bu plan, `Documents/` altındaki 20 plan dosyasının denetimi sonucu
> **gerçekten açık kalan** işleri tek yerde toplar ve Opus/Sonnet görev dağılımı
> yapar. Kapanmış planlar (video rollout, animation-per-topic, sandbox/framework,
> retention, qa-builder, learning-os Faz 1-2, i18n cleanup, gauge, api-testing,
> qa-frontend) burada TEKRAR EDİLMEZ.

---

## 0. İLERLEME DURUMU

| Faz | Konu | Sahip | Durum |
|-----|------|-------|-------|
| **Faz 1** | QA Sprint Simulator (`/sprint`) — çekirdek | **Opus** | ✅ **TAMAMLANDI** (O1-O8) |
| **Faz 1-S** | Sprint içerik genişletme + HomePage girişi | Sonnet | ✅ **TAMAMLANDI** (S1, bkz. NEXT_SESSION.md) |
| **Faz 2** | Career Map Faz 2 (milestone + paylaşılabilir harita) | Sonnet | ✅ **TAMAMLANDI** (S3.1+S3.2, bkz. NEXT_SESSION.md; S3.3 opsiyonel/atlandı) |
| **Faz 3** | Deploy/doğrulama açık uçları | **Kullanıcı (Hasan)** | 🔜 Liste §5'te |
| **Faz 4** | Test kapsamı boşlukları (mobil/çapraz tarayıcı) | Sonnet | ✅ **TAMAMLANDI** (S4.1+S4.2, bkz. NEXT_SESSION.md) |
| **Faz 5** | Adaptif zorluk | — | ⏸️ Ayrı plan ister (§7) |

---

## 1. Neden Sprint Simulator? (Faz 1 gerekçesi)

Kullanıcının stratejik yazısındaki çekirdek cümle: **"Ben burada ders okumuyorum,
burada QA oluyorum."** Phase 1 bu hissi *blok düzeyinde* verdi (`mission` görev
zinciri, 12 görev, 6 sayfa). Ama görev hâlâ bir DERS SAYFASININ İÇİNDE yaşıyor —
kullanıcı `/selenium`'a girip Locators sekmesini açıp görevi buluyor. Yani çerçeve
hâlâ "ders".

Sprint Simulator çerçeveyi tersine çevirir: kullanıcı bir **şirkete** girer, bir
**sprint** açılır, **bug** düşer, onu **QA iş akışıyla** kapatır:

```
Sprint açıldı → Bug düştü → Analiz → Test Case → Otomasyon → CI → Merge → Sprint kapandı
```

**Kritik mimari karar:** Bu faz **YENİ SANDBOX YAZMAZ, YENİ QUIZ MOTORU YAZMAZ.**
Phase 1'in `mission` primitifi zaten "adım adım kilit açan, takılınca mini-lesson
veren, gömülü bloğu `renderBlock`'tan geçiren" makinedir. Sprint Simulator onu
sadece **hikâye + pano + ekonomi** ile sarar.

**Bir bug = bir mission.** İki seviyeli iç içe geçme (bug → missions[] → steps[])
bilinçli olarak REDDEDİLDİ: bir mission zaten 3-8 adım destekliyor, QA iş akışının
5 aşaması (Analiz/Test Case/Otomasyon/CI/Merge) bu adımlara birebir oturuyor.
Fazladan bir sarmalama katmanı kullanıcıyı da kodu da gereksiz derinleştirirdi.

---

## 2. Mimari (Faz 1)

### 2.1. Veri şeması — `src/data/sprintsData.js`

```js
export const sprintsData = {
  sprints: [
    {
      id: 'sprint-1',
      code: 'SPRINT-24',                 // panoda görünen sprint kodu
      title: { tr, en },
      goal: { tr, en },                  // sprint hedefi (tek cümle)
      company: { tr, en },               // şirket/ekip çerçevesi (hikâye)
      xpBonus: 60,                       // sprint KAPANDIĞINDA verilen ek XP
      retro: { tr, en },                 // sprint retrospektifi (kapanış metni)
      bugs: [
        {
          id: 'lqa-101',
          key: 'LQA-101',                // Jira-vari anahtar (görsel)
          severity: 'critical'|'major'|'minor',
          title: { tr, en },
          reporter: { tr, en },          // bug'ı kim açtı (hikâye)
          summary: { tr, en },           // bug raporu gövdesi
          mission: { type: 'mission', ... }   // Phase 1 şeması, 5 adım
        },
      ],
    },
  ],
}
```

`mission` şeması Phase 1'den DEĞİŞMEDİ (`challenge-first-experience-plan.md` §3.2).
Aynı `scripts/audit-learning-blocks.mjs` değişmezleri geçerlidir: benzersiz `id`,
`relatedTopicId`, ≥3 adım, her adımda `brief`/`miniLesson`/type'lı `block`.

### 2.2. Tamamlanma kaynağı: TEK doğruluk noktası

Bir bug "Done" mı? → `xp.js`'in `getCompletedExercises()` listesinde o bug'ın
`mission.id`'si var mı? **Ayrı bir "bug tamamlandı" state'i TUTULMAZ.**
`MissionBlock` görev bitince zaten `markExerciseComplete(mission.id)` çağırıyor.
İkinci bir doğruluk kaynağı tutmak, iki state'in kaçınılmaz olarak birbirinden
kayması demekti (`CLAUDE.md` §23.4'ün "drift" dersi).

`sprintStore.js` yalnızca **panonun kendi durumunu** tutar:
- hangi bug'lar kullanıcı tarafından "In Progress"e ÇEKİLDİ (bilinçli bir eylem —
  Kanban hissinin çekirdeği),
- hangi sprint'ler KAPATILDI (kapanış töreni bir kez oynasın diye).

### 2.3. Bileşenler

| Dosya | Sorumluluk |
|-------|-----------|
| `src/lib/sprintStore.js` | local-first pano durumu (`learnqa_sprint_board`), bug/sprint durum türetme, sprint kapatma |
| `src/components/SprintBoard.jsx` | Kanban panosu (Backlog/In Progress/Done) + bug kartı |
| `src/components/SprintPage.jsx` | sayfa kabuğu, sprint seçici, bug detay paneli, MissionBlock host'u, sprint kapanış töreni |
| `src/components/TopicPage.jsx` | **tek satır değişiklik:** `renderBlock` `export` edildi |

`renderBlock`'un export edilmesi bu fazın en kritik kaldıracıdır: Sprint sayfası
`code-playground`, `prediction`, `editor` gibi ~60 blok tipini **yeniden yazmadan**
kullanabilir. Yeni bir renderer yazmak Phase 1'in "YENİ SANDBOX YAZMA" ilkesinin
doğrudan ihlali olurdu.

### 2.4. Rota ekleme (CLAUDE.md §2 kuralı)

`/sprint` — `App.jsx` (lazy + Route) · `src/utils/seo.js` `ROUTE_SEO` ·
`scripts/generate-static-routes.mjs` `specialRouteContent` · `CLAUDE.md` route
haritası. §22.1 istisnası **DEĞİL** — normal test kapsamındadır.

---

## 3. OPUS GÖREVLERİ (bu oturumda kodlandı)

| # | Görev | Dosya | Durum |
|---|-------|-------|-------|
| **O1** | Sprint pano durumu deposu (local-first) | `src/lib/sprintStore.js` (yeni) | ✅ |
| **O2** | `renderBlock` export'u | `src/components/TopicPage.jsx` | ✅ |
| **O3** | Kanban panosu + bug kartı | `src/components/SprintBoard.jsx` (yeni) | ✅ |
| **O4** | Sayfa kabuğu + bug detayı + kapanış töreni | `src/components/SprintPage.jsx` (yeni) | ✅ |
| **O5** | Sprint 1 referans içeriği (2 bug × 5 adım) | `src/data/sprintsData.js` (yeni) | ✅ |
| **O6** | Rota bağlama (App/seo/static-shell/CLAUDE.md) | 4 dosya | ✅ |
| **O7** | Denetim script'i bağlama | `audit-learning-blocks.mjs`, `check-i18n-leaks.mjs` | ✅ |
| **O8** | E2E testi | `tests/sprint-flow.spec.ts` (yeni) | ✅ |

### 3.1. "Bitti" tanımı (Faz 1 Opus tarafı)

- [x] `/sprint` rotası açılıyor, pano 3 kolonlu render ediliyor.
- [x] Bug kartı "Sprint'e al" ile Backlog → In Progress'e geçiyor.
- [x] Bug detayında MissionBlock çalışıyor; adımlar sırayla kilit açıyor.
- [x] Görev bitince kart Done'a geçiyor (XP tek doğruluk kaynağından türetiliyor).
- [x] Tüm bug'lar bitince "Sprint'i kapat" açılıyor → XP bonusu + konfeti + retro.
- [x] TR/EN tam bilingual; `check-i18n-leaks` STRICT_ZERO.
- [x] `audit-learning-blocks` mission değişmezleri geçiyor.
- [x] `npm run build` + content-integrity temiz.

---

## 4. SONNET GÖREVLERİ (özet — promptlar §6'da)

| # | Görev | Neden Sonnet? |
|---|-------|---------------|
| **S1** | Sprint 1'e 2 bug daha + Sprint 2 (API/performans temalı) | Mekanik içerik çoğaltma, mimari karar yok |
| **S2** | HomePage'e "Sprint'e gir" giriş kartı | Mevcut kart kalıbının kopyası |
| **S3** | Career Map Faz 2 — milestone/rozet + paylaşılabilir harita | Kapsamı net, mevcut `careerMapProfile.js` üstüne |
| **S4** | Test kapsamı: mobil viewport + çapraz tarayıcı | Playwright config + liste genişletme |

---

## 5. KULLANICI (HASAN) GÖREVLERİ — deploy/doğrulama açık uçları

Bunlar **kod işi değil**, credential/panel işidir; AI aracı yapamaz (CLAUDE.md §13).

1. **`explain-code-output` edge function deploy'u** — `code-practice-ai-feedback-plan.md`
   "HENÜZ DEPLOY EDİLMEDİ" diyor, sonrasında teyit eden bir not bulunamadı.
   → `supabase functions deploy explain-code-output --project-ref <ref>` (test + prod).
2. **Social-proof RPC yeniden çalıştırma** — `retention-and-motivation-plan.md` C.2:
   imza değişikliği sonrası SQL prod/test'te yeniden koşulmayı bekliyor.
3. **`mentor-advice` deploy teyidi** — `NEXT_SESSION.md`'de "teyit edilmedi" notu duruyor.
4. **Trending-skills aktivasyonu** — `trending-skills-plan.md`'deki 7 maddelik
   "Kullanıcı Yapılacaklar" (RapidAPI key, Supabase secrets, GH Actions secrets,
   ilk manuel tetikleme). Widget'ın prod'da boş dönüp dönmediği doğrulanmalı.

---

## 6. HAZIR PROMPTLAR

### 6.1. SONNET — Sprint içerik genişletme (S1 + S2)

> Branch: `feature/sprint-simulator`. Önce `Documents/sprint-simulator-and-open-items-plan.md`
> §2 (mimari/şema) ve `src/data/sprintsData.js`'deki İKİ referans bug'ı oku —
> yazacağın her şey o kalıbın birebir devamıdır.
>
> **Görev S1:** `sprintsData.js`'e Sprint 1 için 2 bug daha ekle (toplam 4), sonra
> `sprint-2` adında ikinci bir sprint ekle (2-3 bug). Kurallar:
> - Her bug = 1 `mission`, TAM 5 adım ve adımlar QA iş akışını izlemeli:
>   **Analiz → Test Case → Otomasyon → CI → Merge**. Adım sırasını değiştirme.
> - Gömülü bloklar SADECE mevcut tiplerden olsun (`prediction`, `code-playground`).
>   **YENİ BLOK TİPİ YAZMA, YENİ BİLEŞEN YAZMA.**
> - Her `mission` ve her gömülü blok benzersiz `id` + `relatedTopicId` taşımalı
>   (yoksa `audit-learning-blocks` ve `check-content-integrity` build'i kırar).
> - Sprint 2 teması Sprint 1'den FARKLI olsun: Sprint 1 UI/fonksiyonel hata odaklı,
>   Sprint 2 **API + performans** odaklı (ör. 500 dönen endpoint, N+1 sorgu,
>   yavaş yanıt süresi). REST Assured/Postman/JMeter bilgisini kullan.
> - TAM bilingual (`{tr, en}`): TR açıklama cümleleri Türkçe, teknik terimler
>   (`assertion`, `endpoint`, `pipeline`, `merge`) İngilizce kalır (CLAUDE.md §8).
>   `code` alanlarında TR yorumlar Türkçe. `sprintsData.js` STRICT_ZERO listesinde —
>   EN tarafında TEK bir Türkçe karakter build'i kırar.
> - Apostrof tuzağı: tek tırnaklı string içinde `'` daima `\'` (CLAUDE.md §23.2).
>
> **Görev S2:** `src/components/HomePage.jsx`'e "QA Sprint Simülatörü" giriş kartı
> ekle — mevcut kart/link kalıbını kopyala, yeni tasarım icat etme. Bilingual.
>
> **Her adımdan sonra ZORUNLU (CLAUDE.md §1.1):** `node --check src/data/sprintsData.js`
> → `node scripts/check-content-integrity.mjs` → `npm run i18n:check` →
> `npm run audit:learning-blocks` → `npm run build`. Beşi de temiz değilse
> "tamamladım" DEME. Sonra `.claude/NEXT_SESSION.md`'yi güncelle ve commit at.

### 6.2. SONNET — Career Map Faz 2 (S3)

> Branch: `feature/sprint-simulator` (veya kullanıcı isterse ayrı branch).
> Önce `Documents/career-map-feature-plan.md` §Faz 2'yi ve mevcut
> `src/utils/careerMapProfile.js` + `src/components/QAMentorPage.jsx`'i oku.
> MVP (v2 sorular, localStorage kalıcılığı, `estimatedHours`, `trackMapEvent`)
> ZATEN BİTMİŞ — onları yeniden yazma, üstüne kur.
>
> **S3.1 — Milestone/rozet sistemi:** Haritada belirli eşiklere (ör. %25/%50/%75/%100
> tamamlanma, veya bir "blok"un tüm adımları) ulaşınca rozet ver. Rozetler
> local-first (`localStorage`), mevcut `xp.js`/`progressStore.js` kalıbını takip etsin.
> `trackMapEvent('milestone_earned', {...})` ile mevcut event akışına bağla.
> Rozet kazanınca `ConfettiExplosion` (mevcut bileşen) tetikle.
>
> **S3.2 — Ders sayfasında "haritanda neredesin" breadcrumb'ı:** `TopicHeader`
> zaten `showQaMentorLink` prop'unu destekliyor — bunun yanına, kullanıcının
> haritası varsa "Haritanda X/Y adımdasın" mini göstergesi ekle. **`TopicPage.jsx`'in
> quiz motoruna DOKUNMA** (18k satır, çok E2E testi) — sadece header seviyesinde kal.
>
> **S3.3 (opsiyonel, en son):** Paylaşılabilir harita görseli. Dış paket EKLEME
> (CLAUDE.md §8) — `<canvas>` ile inline çizim + `toDataURL()` indirme yeterli.
>
> **Doğrulama:** content-integrity + i18n:check + build + mevcut
> `tests/qa-mentor-progress-tracking.spec.ts` regresyonu. Sonra NEXT_SESSION.md + commit.

### 6.3. SONNET — Test kapsamı boşlukları (S4)

> Önce `Documents/testcoverage.md`'nin "⏳ Bekliyor" bölümünü oku (dosya
> 2026-07-03 tarihli ve BAYAT — test suite o zamandan beri 15→31 dosyaya çıktı;
> önce hangi maddelerin HÂLÂ açık olduğunu `tests/` klasörünü tarayarak DOĞRULA,
> körlemesine uygulama).
>
> **S4.1 — Mobil viewport kapsamı:** Şu an sadece `/` ve `/docker` mobilde test
> ediliyor. Mevcut mobil test dosyasını bul, route listesini en az 8 temsili
> sayfaya çıkar (dil sayfaları + araç sayfaları karışık). **§22.1 istisna listesini
> (`/basit-backend`, `/security`, `/backend`) EKLEME.**
>
> **S4.2 — Çapraz tarayıcı:** `playwright.config.ts`'e Firefox (ve mümkünse WebKit)
> project'i ekle. **UYARI:** CI süresi katlanır — yeni project'i varsayılan
> `npm run test:e2e` koşumuna DEĞİL, ayrı bir script'e (`test:cross-browser`) bağla
> ve CLAUDE.md §22'deki "temsili sayfa" mantığını izle.
>
> **Doğrulama:** eklediğin testleri yerelde GERÇEKTEN koştur ve sonucu raporla
> (kaç PASS/FAIL). Koşmadan "eklendi" deme. Sonra NEXT_SESSION.md + commit.

---

## 7. Faz 5 — Adaptif Zorluk (bilinçli olarak ERTELENDİ)

Üç ayrı planda (challenge-first §5, learning-os Faz 3, learning-science #6) aynı
madde olarak duruyor ve üçünde de **"riskli, ayrı plan ister"** diye işaretli.
Gerekçe: `TopicPage.jsx` ~21.700 satır ve quiz motoru onlarca E2E testinin
altında. Bu planın kapsamına ALINMADI.

Ön koşul olarak Faz 1 bir şey KAZANDIRIR: `skillSignals.js` artık sprint
görevlerinden de sinyal topluyor. Adaptif zorluk yazıldığında "kullanıcı gerçekten
neyi çözebiliyor" verisi ders tamamlamadan değil, çözülen görevden gelecek.

---

## 8. Karar Kapıları

- **Merge kararı kullanıcıda** (CLAUDE.md §21): bu branch `main`'e girmeden önce
  Hasan `/sprint` sayfasını elle gezip onaylamalı.
- **Manuel test rehberi:** §9.
- Yeni rota eklendi → `CLAUDE.md` §2 route haritası güncellendi (O6).

---

## 9. Manuel Test Rehberi — `/sprint`

**Kurulum:** `npm run dev` → `http://localhost:5173/sprint`

1. **Pano:** Üç kolon görünüyor mu (Backlog / In Progress / Done)? İlk açılışta
   tüm bug kartları Backlog'da mı?
2. **Sprint'e alma:** Bir bug kartındaki "Sprint'e al" düğmesine bas → kart
   In Progress kolonuna geçmeli, detay paneli açılmalı.
3. **Bug raporu:** Detayda bug key (LQA-101), severity rozeti, raporlayan kişi ve
   özet görünüyor mu?
4. **Görev akışı:** MissionBlock'ta yalnızca 1. adım açık, diğerleri 🔒 kilitli mi?
   1. adımı çöz → 2. adım açılmalı. "💡 Takıldın mı? Mini-lesson aç" çalışıyor mu?
5. **Done geçişi:** 5 adımı da bitir → kart Done kolonuna geçmeli, üstünde ✓ olmalı.
6. **Sprint kapatma:** TÜM bug'ları bitir → "Sprint'i kapat" düğmesi aktifleşmeli.
   Bas → konfeti + XP bonusu + retro metni.
7. **Kalıcılık:** Sayfayı F5 ile yenile → Done bug'lar Done kalmalı (localStorage).
8. **Dil:** Sağ üstten EN'e geç → panodaki HER metin İngilizce olmalı, tek Türkçe
   kelime kalmamalı (bug başlıkları, mini-lesson'lar, kod yorumları dahil).
9. **Mobil:** DevTools'ta 375px genişliğe geç → kolonlar alt alta dizilmeli, yatay
   kaydırma OLMAMALI (CLAUDE.md §12).
