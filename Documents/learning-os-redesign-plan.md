# Learning OS Redesign Planı — LearnQA "İnteraktif Öğrenme İşletim Sistemi"

> **Bu dosya nedir:** Kullanıcının 2026-07-19 tarihli "LearnQA Product Redesign
> Prompt" talimatının Fable 5 tarafından proje gerçekleriyle karşılaştırılmış,
> fazlara bölünmüş uygulama planıdır. Tasarım kararları burada VERİLMİŞTİR.
> §8'de Fable/Sonnet görev dağılımı, §9'da kopyala-yapıştır hazır Sonnet
> promptları vardır.
>
> **Okuma sırası:** Önce `CLAUDE.md` (anayasa), sonra `.claude/NEXT_SESSION.md`,
> sonra bu dosya. `CLAUDE.md` §1.1'deki 4 maddelik doğrulama checklist'i her iş
> paketinin sonunda ZORUNLUDUR.
>
> **Branch:** `feature/learning-os-redesign` (main'den açıldı; career-map-v2
> commit'leri main'de olduğu için bu plan onların üzerine kuruludur).

---

## 1. Prompt Değerlendirmesi — Uygun mu?

**Karar: Prompt vizyon olarak UYGUN, ama "her şeyi yeniden tasarla" talimatı
olduğu gibi uygulanamaz.** Nedenleri:

1. Prompt "content is not the problem, engagement is" diyor — doğru teşhis.
   Ancak istediği şeylerin **yarıdan fazlası bu projede zaten var** (aşağıdaki
   envanter tablosu). Sıfırdan redesign, çalışan ve test edilen (178 E2E test)
   sistemleri riske atar.
2. Prompt bir "product design document" istiyor; bu proje ise **anayasal
   kurallarla (CLAUDE.md) yönetilen, data-driven, canlı bir kod tabanı**.
   Doğru çıktı: mevcut mimariye eklemlenen, fazlı bir uygulama planı — bu dosya.
3. Prompttaki bazı istekler CLAUDE.md ile zaten örtüşüyor ("no meaningless XP"
   ↔ §20 "her etkileşim öğretmeli"), bazıları çelişiyor (skill unlock/hard-lock
   ↔ §5 "progress üyeliksiz, local-first, kullanıcı özgür"). Çelişenler §3'te
   açıkça reddedildi veya yumuşatıldı.

**Sonuç:** Prompt, "Learning OS" hedefini üç faza indirger: **Faz 1 = Günlük
Döngü (dashboard + streak + günlük hedef + heatmap)**, **Faz 2 = Ustalık ve
İş-Hazırlık (mastery, skill radar, job readiness)**, **Faz 3 = Adaptif katman
(prediction, mikro-oturum, adaptif zorluk, capstone)**.

### 1.1 Envanter: Prompt İsteği → Mevcut Durum → Karar

| Prompt isteği | Mevcut durum | Karar |
|---|---|---|
| Dashboard (bugünkü hedef, motivasyon) | ❌ YOK — HomePage katalog + 3-durumlu career-map kutusu + koşullu "Bugünkü Tekrar" kartı | **Faz 1 ana işi** |
| Roadmap / skill tree / dependencies | ✅ VAR — `/qa-mentor` v2: sihirbaz, parametrik harita, SIRADAKİ pulse, süre tahmini, tek CTA | Koru; hard-lock EKLEME (§3) |
| Lesson: animasyon, micro quiz, checkpoint | ✅ VAR — §9.1 üçlü (step-animation + drag-drop + playground), video-scene, quiz retry (§18), Feynman (§19), ders bitirme rozeti | Koru; prediction block Faz 3 |
| Practice: XPath, SQL, API, DOM, Git sim | ✅ ÇOĞU VAR — LocatorExplorer, NeuroLocateLab, sql.js, APISimulation, DOMInspector, git-practice, Docker/K8s/Jenkins sandbox | Koru; DevTools sim düşük öncelik (Faz 3+) |
| Streak, heatmap, daily goal, istatistik | ⚠️ KISMİ — XP konu-bazlı local (`learnqa_xp_*`), leaderboard'da XP/streak (Supabase, üye) ama **local streak/hedef/heatmap YOK** | **Faz 1 ana işi** |
| Spaced repetition / retention | ⚠️ KISMİ — `reviewQueue.js` Leitner-lite (yalnız yanlış quiz cevapları) + algorithms/manual-testing sayfa-içi spaced_rep | Faz 2'de genişlet (zayıf konu + interleaving) |
| Mastery / skill radar | ❌ YOK | **Faz 2 ana işi** |
| Job readiness skoru | ❌ YOK | **Faz 2 ana işi** |
| AI: hint, mülakat, açıklama | ✅ VAR — quiz AI açıklaması, `grade-interview-answer`, `/qa-assistant` | Koru; adaptif zorluk Faz 3 |
| Assessment: sınav, sertifika, mülakat sim | ✅ VAR — %60 gating, %80 rozet sınavı, sertifika + doğrulama | Koru |
| Cognitive load / focus | ✅ VAR — 🎯 focus mode, atomik sekmeler (§16), reduced-motion | Koru |
| Mobile 5-15 dk mikro-oturum | ❌ YOK | Faz 3 |
| Real-world capstone proje | ❌ YOK (fableplan.md'de bilinçli dışarıda) | Faz 3, içerik tasarımı kullanıcıyla |

---

## 2. Ürün Vizyonu (Prompt Deliverable 1-4'ün karşılığı)

**Tek cümle:** LearnQA'yı "iyi içerikli ders sitesi"nden, kullanıcının her gün
5 dakikada durumunu görüp ne yapacağını bildiği bir **öğrenme işletim
sistemine** çevirmek — mevcut içerik ve blok altyapısına dokunmadan, üstüne
bir **ilerleme + motivasyon + hatırlama katmanı** ekleyerek.

**Kullanıcının günlük döngüsü (hedef davranış):**
1. Siteye girer → dashboard "Bugün" şeridini görür: streak, günlük hedef
   ilerlemesi, bekleyen tekrar sayısı, kaldığı ders.
2. Önce **Bugünkü Tekrar**'ı bitirir (2-3 dk, retrieval practice).
3. **Devam et** CTA'sı ile kaldığı derse/sekmeye döner (goal gradient).
4. Quiz/playground tamamladıkça günlük hedef bar'ı dolar; hedefe ulaşınca
   kutlama (achievement-tabanlı dopamin, yapay ödül değil).
5. Haftalık heatmap + streak, dönme alışkanlığını görünür kılar.

**İlkeler (CLAUDE.md ile hizalı):**
- Her etkileşim öğretir, ölçer veya pekiştirir — süs gamification yok (§20 + prompt "Avoid" bölümü örtüşüyor).
- Local-first: streak/hedef/heatmap üyeliksiz çalışır; Supabase opsiyonel senkron katmanıdır (§5).
- Kilitleme değil yönlendirme: içerik asla kilitlenmez, "önerilen sıra" sinyalleri güçlendirilir (§3).
- Ölçmeden karar yok: her yeni yüzeye `mapEvents.js` kalıbında event eklenir (§7).

---

## 3. Prompttan REDDEDİLEN / YUMUŞATILAN Kısımlar

1. **Hard skill-lock ("should skills unlock?") → RED.** CLAUDE.md §5 progress'i
   local-first ve özgür tanımlar; mülakat gating (%60) zaten var olan tek
   kilittir ve pedagojik gerekçesi nettir. Yeni kilit yerine **soft-lock**:
   sıradaki düğüm pulse'ı (var), "önce X'i bitirmeni öneririm" mentor notu (var)
   ve dashboard'daki tek CTA (yeni).
2. **Görsel dilin baştan tasarımı → RED.** UI_STANDARDS.md + efekt paketi +
   focus mode dengesi kuruludur; redesign değil, yeni yüzeyler aynı dille eklenir.
3. **"Her 30-60 saniyede etkileşim" → ZATEN KURAL.** §9.1 üçlü kuralı bunun
   daha somut hali; yeni bir şey gerekmiyor, yayılım devam ediyor (§9.2/9.5).
4. **Browser DevTools simülatörü → ERTELENDİ.** DOMInspector + LocatorExplorer
   ihtiyacın %80'ini karşılıyor; yüksek maliyet/düşük marjinal değer.
5. **25 bölümlük tasarım dokümanı formatı → SIKIŞTIRILDI.** Bu dosya o
   bölümlerin proje-gerçekçi karşılığıdır (vizyon §2, IA/journey §2, dashboard
   §5-F1, roadmap §1.1, practice/assessment envanteri §1.1, AI §6, metrikler
   §7, riskler §10, fazlar §5-6, MVP ayrımı §5).

---

## 4. Fable'ın Ek Önerileri (Promptta Olmayanlar)

1. **Merkezi ilerleme adaptörü (ön koşul, Faz 1):** Progress verisi ~15 farklı
   localStorage anahtarına dağılmış (`learnqa_xp_*`, `learnqa_interactive_scores`,
   `learnqa_completed_routes`, `*_completed_lessons`, `learnqa_review_queue`,
   `algorithms_spaced_rep`...). Dashboard bunların ÜZERİNE **salt-okunur bir
   adaptörle** kurulmalı (`progressStore.js`) — migration YOK, mevcut anahtarlar
   bozulmaz, eski sayfalar aynen çalışır. Bu, promptun hiç bahsetmediği ama her
   şeyin önündeki gerçek mühendislik işidir.
2. **Önce ölçüm:** `mapEvents.js` + `map_events` tablosu zaten uçtan uca
   çalışıyor. Aynı kalıpla `dashboard_viewed`, `daily_goal_met`,
   `review_session_completed`, `streak_broken` event'leri eklenir — "completion
   rate arttı mı?" sorusu tahminle değil veriyle cevaplanır.
3. **Streak affı (grace):** 1 günlük kaçırma streak'i sıfırlamaz, "donmuş" gösterir;
   2. gün sıfırlar. Habit literatürü: acımasız sıfırlama bırakmanın 1 numaralı
   sebebi. (Duolingo streak-freeze'in basitleştirilmiş, satın alımsız hali.)
4. **Sekme-seviyesinde "Devam et":** `learnqa_last_position` (route + sekme
   index'i) — CTA kullanıcıyı sayfanın başına değil kaldığı sekmeye götürür.
   Goal gradient'in en ucuz güçlendiricisi.
5. **Günlük hedef birimi "soru/egzersiz", dakika değil:** Süre ölçümü sekmede
   açık bırakılan pencerelerle yalan söyler; cevaplanan quiz + tamamlanan
   playground/challenge sayısı dürüst ve zaten event olarak elimizde.
6. **Prediction block'u yeni sayfa değil yeni BLOCK TİPİ olarak** (`predict-output`,
   Faz 3): kod gösterilir, kullanıcı çıktıyı seçer/yazar, sonra çalıştırılır.
   TopicPage block sistemine eklenir, tüm sayfalar bedavaya kazanır.
7. **AC senkronu:** Faz 1 bitmeden `Documents/acceptancecriterias.md`'ye yeni
   Major AC eklenir (günlük hedef/streak/heatmap davranışı) ve §22 test listesi
   güncellenir — önce AC, sonra test (CLAUDE.md §22 sırası).

---

## 5. Faz 1 — "Günlük Döngü" (MVP)

**Hedef:** Kullanıcı siteye girdiğinde ilk gördüğü şey katalog değil, KENDİ
durumu olsun. Tamamı local-first, üyeliksiz çalışır.

### F1 — `src/lib/progressStore.js` (salt-okunur adaptör) + `src/lib/activityLog.js`
- `progressStore.js`: mevcut anahtarları okuyup normalize eder:
  `getTotalXp()`, `getCompletedRoutes()`, `getPageCompletion(route)`,
  `getReviewStats()` (reviewQueue'dan re-export). Hiçbir mevcut anahtara YAZMAZ.
- `activityLog.js`: YENİ anahtar `learnqa_activity_log` — gün (YYYY-MM-DD) →
  `{ quizzes, exercises, xp }`. Saf fonksiyonlar: `logActivity(kind, amount)`,
  `getDay(date)`, `getLastNDays(n)`, `getStreak()` (grace kurallı, öneri #3),
  `getDailyGoalProgress()`. Eşikler dosya başında named const
  (`DAILY_GOAL_DEFAULT = 10` birim; quiz=1, playground/challenge=2).
  Kapasite: 400 günden eski kayıtlar temizlenir.
- Streak kuralı: `streak = ardışık hedefli günler`; 1 gün boşluk → streak korunur
  ama `frozen: true` döner; 2+ gün boşluk → 0.

### F2 — Yazma noktaları (TopicPage entegrasyonu — riskli bölge, Fable işi)
- `handleQuizAnswered` (quiz cevabı), `CodePlaygroundBlock`/`ChallengeBlock`
  başarı anları ve `markXp` ödeme anına `logActivity(...)` eklenir.
- Kural: XP'nin çifte ödeme koruması (`completed` id listesi) neyi sayıyorsa
  activity de onu sayar — aynı egzersiz iki kez hedef doldurmaz.

### F3 — Dashboard "Bugün" şeridi (`HomePage.jsx` üst bölümü)
Career-map kutusunun HEMEN ÜSTÜNE tek satırlık (mobilde 2 satır) şerit:
- 🔥 **Streak** sayacı (frozen durumunda ❄️ + açıklama tooltip'i).
- 🎯 **Günlük hedef** progress bar (N/10 birim; dolunca konfeti — mevcut
  konfeti kalıbı yeniden kullanılır, yeni bağımlılık yok).
- 🔄 **Bugünkü Tekrar** — mevcut koşullu kart bu şeride taşınır (davranış aynı).
- ▶️ **Devam et** — career-map kutusundaki CTA ile TEK kaynaktan beslenir +
  `learnqa_last_position` varsa sekme-derinlikli link (öneri #4).
- Hiç aktivite yoksa şerit davet moduna düşer ("Bugün 10 soruyla başla").

### F4 — Haftalık mini heatmap
- Şeridin altında son 12 haftanın GitHub-tarzı ızgarası (inline SVG/CSS,
  dış görsel yok — §8). 4 yoğunluk kademesi; dark/light + focus-mode uyumlu.
- Tooltip: gün + birim sayısı (bilingual).

### F5 — Event'ler + AC + testler
- `mapEvents.js`'e 4 yeni event (öneri #2) — şema değişikliği gerekmiyorsa
  mevcut tabloya `event_name` ile; gerekiyorsa `supabase/` altına ek SQL +
  kullanıcıya manuel adım notu.
- `acceptancecriterias.md`'ye Major AC: "günlük hedef + streak + heatmap
  local-first çalışır, grace kuralı, çifte sayım yok".
- Yeni suite `tests/daily-loop.spec.ts` (aşağıda S3). §22.1 istisnaları geçerli.

**Faz 1 kapsam DIŞI:** Supabase streak senkronu (leaderboard streak'i ile
birleştirme ayrı karar), bildirim/e-posta, mobil mikro-oturum.

---

## 6. Faz 2 — "Ustalık ve İş-Hazırlık" (özet; detay planı Faz 1 bitince)

- **Mastery modeli:** konu başına 0-100 skor = quiz doğruluğu (ilk deneme
  ağırlıklı) + tekrar mezuniyeti (reviewQueue streak=3) + playground/challenge
  tamamlama. `progressStore.js`'e `getMastery(route)`.
- **Skill radar:** `/qa-mentor`'a inline SVG radar (dataviz kurallarına uygun,
  6-8 eksen: UI otomasyon, API, SQL, CI/CD, dil, temel kavramlar).
- **Job Readiness skoru:** harita ilerlemesi × mastery ortalaması × mülakat AI
  puan ortalaması → tek yüzde + "seni en çok ilerletecek 3 şey" listesi
  (zayıf konu önerisi, AI'sız — mastery eşiği ile).
- **Retention v2:** mastery < 50 olan tamamlanmış konular dashboard'da "tekrar
  önerisi" olarak döner; fableplan WP5 (rozet sınavına karışık soru /
  interleaving) burada, kullanıcı onayıyla ele alınır.

## 7. Faz 3 — "Adaptif Katman" (özet)

- `predict-output` block tipi (öneri #6) + pilot 2 sayfa (Python, JavaScript).
- Mobil mikro-oturum: dashboard'da "5 dakikalık görev" kartları (1 tekrar
  seansı / 1 sekmenin kalan quizleri).
- Adaptif zorluk: yanlış cevap kalıplarına göre alternatif soru seçimi
  (§18 mekanizmasının veriyle beslenmesi).
- Capstone proje sayfası — içerik tasarımı kullanıcıyla birlikte (fableplan
  kısıtı devam ediyor).

---

## 8. Görev Dağılımı: Fable vs Sonnet

**İlke (career-map-feature-plan.md §10 ile aynı):** Fable = mimari kararlar,
riskli entegrasyonlar (TopicPage ~20k satır), yeni çekirdek dosyalar, formüller.
Sonnet = verilen spec'ten mekanik uygulama, sayfalara yayılım, test yazımı,
i18n cilası, kalibrasyon.

### 8.1 Fable görevleri (sıralı)

| # | Görev | Dosyalar |
|---|---|---|
| F1 | `progressStore.js` + `activityLog.js` çekirdeği (şema, streak/grace algoritması, named const eşikler) | `src/lib/` (yeni 2 dosya) |
| F2 | TopicPage/XP yazma noktaları entegrasyonu (çifte sayım koruması dahil) | `TopicPage.jsx`, `xp.js`, `CodePlaygroundBlock.jsx`, `ChallengeBlock.jsx` |
| F3 | Dashboard "Bugün" şeridi iskeleti + davet/aktif/dolu durum makinesi + Devam-et CTA birleşimi | `HomePage.jsx` |
| F4 | `learnqa_last_position` yazma/okuma (sekme değişiminde kayıt) | `TopicPage.jsx` |
| F5 | AC güncellemesi + §22 senkron notu + NEXT_SESSION işleme | `Documents/acceptancecriterias.md`, `.claude/NEXT_SESSION.md` |
| F6 | (Faz 2 başlarken) mastery formülü + job readiness tasarım kararları | ayrı plan güncellemesi |

### 8.2 Sonnet görevleri (Fable F1-F3 bittikten sonra, sırayla)

| # | Görev | Bağımlılık |
|---|---|---|
| S1 | `logActivity` çağrılarının kalan tüm interaktif bloklara yayılımı (OrderSort, editor, git-practice, sandbox'lar, video-scene XP anı) — F2'deki kalıbı birebir taklit | F1+F2 |
| S2 | Haftalık heatmap komponenti (`ActivityHeatmap.jsx`) — aşağıdaki spec'ten; HomePage şeridine takılması | F1+F3 |
| S3 | `tests/daily-loop.spec.ts` yeni suite (senaryolar §9-S3 promptunda) + mevcut smoke'ların yeşil kaldığının teyidi | F1-F4 |
| S4 | i18n + erişilebilirlik denetimi: yeni tüm metinlerde tr/en simetrisi, aria-label'lar, 36px touch target, mobil taşma kontrolü | S1-S3 |
| S5 | Event yayılımı: 4 yeni event çağrısının doğru anlara bağlanması (`mapEvents.js` kalıbı) | F3 |

---

## 9. Sonnet Promptları (kopyala-yapıştır)

> Ortak önsöz — her promptun başına eklenecek:
>
> ```
> Önce CLAUDE.md'yi, sonra .claude/NEXT_SESSION.md'yi, sonra
> Documents/learning-os-redesign-plan.md'yi oku. Tasarım kararları planda
> VERİLMİŞTİR — tasarlama, uygula. Kod gerçeği planla çelişirse sapmayı uygula
> ve NEXT_SESSION.md'ye nedenini yaz. CLAUDE.md §1.1 checklist'i (integrity →
> ipucu bağı → TR yorum taraması → npm run build) bitirmeden "tamamlandı" deme.
> TopicPage.jsx ~20k satırdır — asla baştan sona okuma, grep ile dar aralık oku.
> Yeni UI metinleri bilingual (tr/en). Commit için kullanıcı onayı iste.
> ```

### S1 Promptu — logActivity yayılımı

```
Görev: Documents/learning-os-redesign-plan.md §8.2-S1.
src/lib/activityLog.js'teki logActivity(kind, amount) çağrısı Fable tarafından
quiz cevabına, CodePlaygroundBlock ve ChallengeBlock başarı anlarına eklendi —
önce bu üç mevcut entegrasyonu grep'le bul ve kalıbı incele (çifte sayım
koruması: XP'nin `completed` id listesi neyi bir kez sayıyorsa activity de onu
bir kez sayar).
Aynı kalıbı şu interaktif bloklara uygula: OrderSort (drag-drop tamamlama),
editor bloğu (başarılı çalıştırma değil, egzersizin İLK başarılı tamamlanışı),
git-practice, DockerSandboxBlock/KubernetesSandboxBlock/JenkinsSandboxBlock
(senaryo tamamlama anı), VideoSceneBlock (XP ödeme anı — xpReward zaten tekil,
onun ödendiği satıra ekle).
YAPMA: Yeni localStorage anahtarı icat etme; activityLog.js'in şemasını
değiştirme; XP miktarlarını değiştirme. Her blokta yalnız İLK tamamlanma
loglanır. Bitince tests/daily-loop.spec.ts varsa koştur, yoksa mevcut
topic-pages smoke'larını koştur.
```

### S2 Promptu — ActivityHeatmap komponenti

```
Görev: Documents/learning-os-redesign-plan.md §8.2-S2.
Yeni dosya src/components/ActivityHeatmap.jsx: src/lib/activityLog.js'teki
getLastNDays(84) verisinden son 12 haftayı GitHub-contribution tarzı ızgara
olarak çizen fonksiyonel komponent.
Spec:
- Saf inline SVG veya CSS grid — dış görsel/dış kütüphane YOK (CLAUDE.md §8).
- 7 satır (Pzt-Paz) × 12 sütun; hücre boyutu mobilde küçülür, yatay taşma
  YASAK (CLAUDE.md §12) — gerekirse mobilde 8 hafta göster.
- 4 yoğunluk kademesi: 0 / 1-4 / 5-9 / 10+ birim. Renkler dark ve light modda
  ayrı ayrı okunaklı olmalı; HomePage'deki mevcut dark-mode class kalıbını kullan.
- Hücre title/tooltip: "12 Tem — 7 birim" formatında, bilingual.
- prefers-reduced-motion ve focus-mode'da animasyonsuz (zaten animasyon şart değil).
- HomePage.jsx'te "Bugün" şeridinin altına tak — Fable'ın bıraktığı
  {/* heatmap-slot */} yorumunu grep'le bul, oraya yerleştir.
Test: tests/daily-loop.spec.ts'e 1 test ekle — page.addInitScript ile
learnqa_activity_log'a 3 günlük sahte veri enjekte et, heatmap'te en az 3
dolu hücre render olduğunu assert et.
```

### S3 Promptu — daily-loop test suite

```
Görev: Documents/learning-os-redesign-plan.md §8.2-S3.
Yeni dosya tests/daily-loop.spec.ts. serviceWorkers: 'block' kullan (bilinen
MSW tuzağı — NEXT_SESSION.md'de belgeli). §22.1 istisna sayfalarını
(/basit-backend, /security, /backend) hiçbir listeye ekleme.
Senaryolar:
1. Temiz profil → ana sayfada "Bugün" şeridi davet modunda; streak 0 gösterilmez
   veya davet metni görünür (Fable'ın implementasyonundaki data-testid'leri
   grep'le bul, yeni testid EKLEME, eksikse Fable'a not düş).
2. /python'da bir quiz'i doğru cevapla → learnqa_activity_log bugünün kaydında
   quizzes >= 1; ana sayfa hedef bar'ı ilerlemiş.
3. Aynı quiz'i tekrar cevapla → activity SAYISI ARTMAZ (çifte sayım koruması).
4. addInitScript ile dünü hedefli, bugünü boş sahte log enjekte et → streak
   görünür ve frozen (❄️) durumda.
5. addInitScript ile 3 gün önce hedefli, arada boş → streak 0.
6. Hedefi tamamla (veya log'u 10 birime enjekte et) → kutlama/dolu durum görünür.
7. learnqa_last_position enjekte et → "Devam et" CTA'sının href'i o route'u
   içeriyor.
Koşum: npx playwright test tests/daily-loop.spec.ts → hepsi yeşil; ardından
npm run build.
```

### S4 Promptu — i18n + erişilebilirlik denetimi

```
Görev: Documents/learning-os-redesign-plan.md §8.2-S4.
Bu branch'te (feature/learning-os-redesign) main'e göre değişen dosyaları
git diff --name-only main ile listele. Yalnız bu dosyalarda:
1. Yeni eklenen her kullanıcı metninin tr/en çiftinin eksiksiz olduğunu doğrula
   (language === 'tr' dalları ve {tr, en} objeleri). Tek dilli kalan varsa düzelt.
2. Yeni butonlarda aria-label (bilingual), min 36px touch target, klavye
   erişimi (tab + enter) kontrol et.
3. Mobil taşma: 375px viewport'ta ana sayfayı Playwright ile aç, yatay scroll
   olmadığını assert eden mevcut mobile-smoke kalıbıyla doğrula.
4. TR yorum taraması: bu branch'te eklenen her kod yorumu Türkçe mi
   (CLAUDE.md §8)? İngilizce kalanları çevir.
Rapor formatı: bulunan/düzeltilen maddelerin listesi + koşulan komut çıktıları.
```

### S5 Promptu — event yayılımı

```
Görev: Documents/learning-os-redesign-plan.md §8.2-S5.
src/utils/mapEvents.js'teki fire-and-forget kalıbını incele (learnqa_anon_id,
sendMapEvent). Aynı kalıpla 4 event bağla:
- dashboard_viewed: HomePage'de "Bugün" şeridi AKTİF durumda (davet modunda
  değilken) ilk render olduğunda, oturum başına 1 kez.
- daily_goal_met: günlük hedef bar'ı 100%'e ulaştığı anda, gün başına 1 kez
  (activityLog'a küçük bir goalMetLogged bayrağı eklenebilir — Fable'ın
  şemasındaki rezerv alana bak, yoksa NEXT_SESSION'a not düş).
- review_session_completed: ReviewQueuePanel'de isDone durumuna items.length > 0
  ile ulaşıldığında.
- streak_broken: getStreak() bir önceki kayıtlı değerden 0'a düştüğünde
  (karşılaştırma için learnqa_activity_log içindeki lastKnownStreak alanı).
Supabase şeması: mevcut map_events tablosu event adı serbest metinse yeni SQL
GEREKMEZ; kısıt varsa supabase/ altına ek SQL dosyası yaz ve kullanıcıya
manuel çalıştırma adımını NEXT_SESSION.md'ye not et. Event'ler hiçbir zaman
UI'ı bloklamaz (fire-and-forget, try/catch).
```

---

## 10. Riskler

1. **TopicPage.jsx ~20k satır:** F2/F4 en riskli işler — bu yüzden Fable'da.
   Grep-dar aralık disiplini; her dokunuştan sonra build + smoke.
2. **localStorage anahtar karmaşası:** Adaptör SALT-OKUNUR kalmalı; tek yazma
   yüzeyi `activityLog.js` + `learnqa_last_position`. Yeni anahtar icadı yasak
   (CLAUDE.md §7).
3. **HomePage testleri:** Mevcut smoke'lar başlık/label metinlerine bakıyor
   olabilir — şerit eklenirken mevcut elementler silinmez, üstüne eklenir;
   career-map kutusu 3-durum testleri (career-map.spec) bozulmamalı.
4. **Çifte sayım:** XP `completed` listesi ile activity log ayrı düşerse hedef
   şişer — F2'de tek kaynaktan (XP ödeme anı) loglanarak çözülür; S1 bu kalıbı
   taklit eder, yeniden icat etmez.
5. **Anayasa uyumu:** "Meaningless XP yok" — günlük hedef yalnız GERÇEK öğrenme
   birimlerinden dolar (quiz/egzersiz); pasif okuma/scroll SAYILMAZ.
6. **Chunk boyutu:** Yeni bileşenler küçük; yine de build sonrası boyut
   NEXT_SESSION'a not edilir (§9.5 alışkanlığı).
7. **Streak hayal kırıklığı:** Grace kuralı (öneri #3) + streak'i kaybettiren
   değil kazandıran metin tonu ("yarın dönersen kaldığın yerden").

## 11. Başarı Metrikleri (Prompt Deliverable 23)

`map_events` verisinden, 4-6 hafta pencerede:
- **Dönüş oranı:** `dashboard_viewed` yapan anon_id'lerin 7 gün içinde tekrar
  görülme yüzdesi (baseline: mevcut `map_revisited`).
- **Günlük döngü tamamlama:** `daily_goal_met` / `dashboard_viewed`.
- **Retention davranışı:** `review_session_completed` haftalık adet.
- **Ders tamamlama:** ders bitirme rozeti event'lerinin (mevcut akış) artışı.
- **Streak dağılımı:** `streak_broken` sıklığı — grace kuralı işe yarıyor mu?

## 12. Faz 1 Uygulama Sonucu — Plandan Sapmalar (2026-07-20 denetimi)

Faz 1 (F1-F5 + S1-S5) tamamlandı ve koda karşı denetlendi. Aşağıdaki bilinçli
sapmalar uygulandı — plan metniyle kod çelişik görünürse KOD doğrudur:

1. **`logActivity(kind, amount)` → `logActivity(kind, id)` (§5-F1):** Çifte
   sayım koruması (S3 test 3) id bazlı tekilleştirme gerektirdi; birim ağırlığı
   `kind`'dan türetilir (quiz=1, exercise=2). İmza değişti, davranış plandaki
   hedefle aynı.
2. **`getPageCompletion(route)` YAZILMADI (§5-F1):** Sayfa tamamlanma yüzdesi
   `progress_<pageKey>` anahtarlarında tutulur ve `pageKey` hero title'dan
   türetilir — salt-okunur adaptör route→pageKey eşlemesini data dosyalarını
   import etmeden bilemez. Faz 1'de hiçbir tüketicisi yoktu; Faz 2'deki
   `getMastery(route)` tasarımıyla birlikte ele alınacak (bkz. §6).
3. **"Bugünkü Tekrar" kartı şeride TAŞINMADI (§5-F3):** Mevcut
   `review-queue-card` testid'lerine 4 test bağlı; kart şeridin hemen altında
   yerinde kaldı, davranış aynı.
4. **Heatmap mobilde 8 haftaya düşmez (§9-S2):** Bunun yerine widget kendi
   `overflow-x-auto` sarmalayıcısında kaydırılır — sayfa geneli yatay taşma
   0px (CLAUDE.md §12 ilkesiyle uyumlu, 375px viewport'ta doğrulandı).
5. **S3 quiz senaryosu /python değil /docker üzerinde (§9-S3):** Davranış
   aynı; /docker quiz'i test için daha deterministik seçildi.
6. **Streak-0 tonu (§10 risk 7):** Birim>0 ama streak 0 iken rozet "🔥 0 gün"
   yerine "🌱 Bugün başladın!" gösterir — kazandıran metin tonu kuralı
   şeride de uygulandı.

Detaylı uygulama notları ve doğrulama kayıtları: `.claude/NEXT_SESSION.md`.

## 13. Kapanış Ritüeli (her iş paketi sonunda, fableplan.md ile aynı)

```
1. node scripts/check-content-integrity.mjs   # 0 ihlal
2. npm run build                              # PASS
3. npx playwright test <ilgili spec>          # yeşil
4. TR yorum taraması                          # yeni yorumlar Türkçe mi?
5. NEXT_SESSION.md güncelle                   # yapılan, kalan, riskler
6. Kullanıcı onayıyla commit                  # Co-Authored-By satırı ile
```
