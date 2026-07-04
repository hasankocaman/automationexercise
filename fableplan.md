# FABLEPLAN.md — Pedagojik İyileştirme Uygulama Planı (Sonnet için)

> **Bu dosya nedir:** Fable 5 modelinin 2026-07-03 tarihli pedagojik inceleme raporuna
> dayanan, Sonnet modelinin uygulaması için hazırlanmış iş planı. Tasarım kararları
> burada VERİLMİŞTİR — Sonnet'in görevi tasarlamak değil, bu planı uygulamaktır.
> Plandan sapmak gerekirse (kod gerçeği planla çelişiyorsa) sapmayı uygula ama
> `NEXT_SESSION.md`'ye nedenini yaz.
>
> **Okuma sırası:** Önce `CLAUDE.md` (anayasa), sonra `.claude/NEXT_SESSION.md`,
> sonra bu dosya. `CLAUDE.md` §1.1'deki 4 maddelik doğrulama checklist'i her iş
> paketinin sonunda ZORUNLUDUR.

---

## Genel Kurallar (her iş paketi için geçerli)

1. **Bir oturumda bir iş paketi (WP).** Bitir, doğrula, commit et (kullanıcı onayıyla), sonra diğerine geç. WP'ler bağımsızdır; sırayla gitmek zorunda değilsin ama önerilen sıra: WP1 → WP2 → WP3 → WP4.
2. **`TopicPage.jsx` ~20.000 satırdır — asla baştan sona okuma.** Grep ile hedef bul, dar aralık oku. Bu planda ihtiyacın olan satır numaraları verilmiştir (küçük kaymalar olabilir, pattern'le doğrula).
3. Her WP sonunda: `node scripts/check-content-integrity.mjs` → `npm run build` → `npx playwright test` (bilinen istisna: `/python` paralel-yük flakiness'i, `NEXT_SESSION.md`'de belgeli). TR yorum kuralı (CLAUDE.md §8) yeni eklenen her yorum satırı için geçerli.
4. Yeni UI metinleri **bilingual** olmalı (`language === 'tr'` kontrolü veya `{tr, en}` objesi — dosyadaki mevcut kalıbı taklit et).
5. `git push` ve `main`'e commit için kullanıcı onayı iste. İş bitince `NEXT_SESSION.md`'ye yapılanları işle.

---

## WP1 — QA Mentor Yol Haritası Sıra Düzeltmesi

**Neden:** MAP_A'da Jenkins (9) ve AWS (10), Docker'dan (11) önce geliyor. Modern CI
pipeline'ları Docker üzerine kuruludur; Jenkins dersindeki agent/container kavramları
Docker bilinmeden anlaşılmaz. Ayrıca Linux "bonus"ta ama mentor notu onu zaten
Jenkins/Docker öncesi tavsiye ediyor — tavsiye edilen şey ana hatta olmalı. Kafka
sıfırdan başlayan biri için ana düğüm olamayacak kadar niş. `/what-is-testing`
sayfası haritada hiç yok ama mantıksal başlangıç noktası o.

**Dosya:** `src/data/qaMentorData.js` (MAP_A: satır ~177-336)

**Yapılacaklar:**

1. MAP_A `nodes` dizisini şu sıraya getir (id'ler 1'den yeniden numaralanır):
   1. **YENİ DÜĞÜM** — `/what-is-testing`: emoji 🛡️, title `{tr: 'Test Temelleri', en: 'Testing Fundamentals'}`, desc `{tr: 'Yazılım testi nedir, QA vs QC, SDLC, test seviyeleri', en: 'What is software testing, QA vs QC, SDLC, test levels'}`, `isMain: true`. Renk için mevcut düğümlerdeki hex+glow kalıbını taklit et (ör. `#0e7490`).
   2. Algoritma Temeli (`/algorithms`)
   3. Manuel Test (`/manual-testing`)
   4. Java (`/java`)
   5. Git & GitHub (`GIT_GITHUB_NODE(5)`)
   6. Selenium (`/selenium`)
   7. Postman (`/postman`)
   8. SQL (`SQL_NODE(8)`)
   9. REST Assured (`/rest-assured`)
   10. **Linux** (`/linux`) — `LINUX_BONUS_NODE`'u ana düğüme çevir: `id`, `glow`, `isMain: true` ekleyerek buraya taşı. `extras`'tan çıkar.
   11. Docker (`/docker`)
   12. Jenkins (`/jenkins`)
   13. AWS (`/aws`)
   14. Kubernetes (`/kubernetes`)
2. **Kafka düğümünü `nodes`'tan çıkar, `extras` dizisine taşı** (Appium/BrowserStack/JMeter formatında: `id`/`glow`/`isMain` olmadan). desc'i koru.
3. **`mentorNote`'u (tr + en) yeni sıraya göre yeniden yaz.** Mevcut metindeki
   "Jenkins → AWS → Docker → Kubernetes → Kafka" zinciri ve "Linux sayfamıza da
   bak" tavsiyesi artık yanlış/gereksiz. Yeni not şunları söylemeli: temel → manuel
   test → Java → Git → UI otomasyon → API → SQL sırasının mantığı; Linux'un artık
   ana hatta olduğu ve NEDEN Docker/Jenkins'ten önce geldiği; **Docker → Jenkins →
   AWS → Kubernetes** zincirinin mantığı (önce container'ı anla, sonra CI'da
   kullan, sonra cloud'a taşı); Kafka'nın artık "kariyer +1" ekstrası olduğu.
4. **Diğer haritaları da aynı mantıkla denetle** (MAP_B satır ~340, MAP_B_SEL ~476,
   MAP_C1 ~622, MAP_C2 ~761): Docker'dan önce Jenkins/AWS/Kubernetes gelen sıra
   varsa aynı düzeltmeyi uygula; Linux bonus'taysa ve haritada Jenkins/Docker
   varsa ana hatta al. Her haritanın mentorNote'unu değiştirdiğin sıraya göre güncelle.

**Dikkat / riskler:**
- `QaMentorPage.jsx`'in node'ları nasıl tükettiğini önce grep'le kontrol et: id'ye,
  diziye index'e veya node SAYISINA bağlı ilerleme (%) hesabı varsa (AC09 roadmap
  ilerleme takibi!) düğüm ekleme/çıkarma o hesabı etkiler. localStorage'da
  tamamlanmış düğüm id'leri saklanıyorsa id kayması eski kullanıcı verisini bozar —
  bu durumda id yerine `route`'u anahtar yap ya da mevcut anahtarlama neyse onu
  koru ve plana not düş.
- `tests/` altında qa-mentor'a dokunan spec var mı grep'le bak (`qa-mentor`,
  `roadmap`, `MAP_A` anahtar kelimeleri); düğüm adı/sayısı assert ediliyorsa güncelle.

**Doğrulama:** build + integrity + `/qa-mentor` sayfasını Playwright ile aç
(mevcut other-pages-ui pattern'i), console hatası yok, harita render oluyor,
düğüm tıklamaları doğru route'a gidiyor.

---

## WP2 — Ana Sayfada "Önerilen Sıra" Sinyali

**Neden:** Ana sayfa kategorik (Diller / Test Araçları / DevOps) — keşif için iyi
ama yeni kullanıcı nereden başlayacağını ancak QA Mentor'a girerse öğreniyor.
Düşük maliyetli düzeltme: başlangıç kartlarına rozet.

**Dosya:** `src/components/HomePage.jsx` (kart listeleri satır ~735-794)

**Yapılacaklar:**

1. Kart etiketlerine dokunma (mevcut Playwright testleri label metnine bakıyor
   olabilir — önce `tests/` içinde bu label'ları grep'le). Bunun yerine kart
   link'inin köşesine küçük bir rozet elemanı ekle:
   - `/what-is-testing` linkine (satır ~612 ve ~831 civarı): `{tr: '🚀 Buradan başla', en: '🚀 Start here'}` rozeti.
   - `/algorithms`, `/manual-testing`, `/java` kartlarına sırasıyla ①, ②, ③
     rozetleri (küçük, köşede, `absolute` konumlu bir `span`; mevcut Tailwind
     kalıplarını taklit et — `text-[10px]`, yuvarlak, yarı saydam arka plan).
2. Rozet stilleri dark/light modda okunaklı olmalı (mevcut kartların dark-mode
   sınıflarını incele, aynı yaklaşımı kullan). Dış görsel dosya YOK (CLAUDE.md §8).
3. Mobilde taşma yaratmamalı (`overflow-x` kuralı, CLAUDE.md §12) —
   `tests/mobile-smoke.spec.ts` geçmeli.

**Doğrulama:** build + `tests/mobile-smoke.spec.ts` + ana sayfa Playwright smoke.

---

## WP3 — 🎯 Odak Modu (Focus Mode) Toggle

**Neden:** Mayer'in coherence ilkesi: konuyla ilgisiz dekoratif animasyon (yağmur,
nebula, glitch, 3D tilt, ambiyans sesi) öğrenmeyi düşürür. Efekt paketi marka
kimliği olarak kalsın ama ders çalışan kullanıcı tek tuşla kapatabilsin.

**Tasarım kararları (verildi, tartışma gerektirmez):**
- localStorage anahtarı: **`focusMode`**, değerler `'true'`/`'false'`, default `'false'` (efektler açık).
- Mekanizma: `darkMode` ile birebir aynı kalıp — `document.documentElement`'e
  **`focus-mode`** class'ı eklenir/çıkarılır. Referans kalıp:
  `TopicPage.jsx` satır ~19737-19747'deki `darkMode` useEffect'i.
- Efektlerin kapatılması **sadece CSS ile** yapılır — JS efekt kodlarına (particle
  oluşturma, manyetik buton vb. useEffect'ler) DOKUNULMAZ. Risk minimizasyonu:
  elemanlar DOM'da kalır, sadece görünmez/hareketsiz olur.

**Yapılacaklar:**

1. **Yeni dosya `src/focus-mode.css`** (`src/index.css`'ten veya `main.jsx`'ten
   import et — `night-sky-effects.css` nasıl import ediliyorsa aynı yol):
   - Her `*-effects.css` dosyasında zaten bir `@media (prefers-reduced-motion)`
     bloğu var ve o blok o sayfanın hangi seçicilerinin animasyonlarını
     kapatacağını LİSTELİYOR. Yapılacak iş mekanik: her effects dosyasının
     reduced-motion bloğundaki kuralları topla ve `focus-mode.css` içinde
     `:root.focus-mode` öneki ile tekrarla. Örnek dönüşüm:
     `@media ... { .dp-particle { animation: none } }` →
     `:root.focus-mode .dp-particle { animation: none; display: none; }`
   - Ek olarak `:root.focus-mode` altında: parçacık/yıldız/ay/yağmur/şimşek
     katmanları `display: none`; glitch pseudo-elementleri (`::before/::after`)
     `content: none`; 3D tilt sınıfları `transform: none !important`;
     ses aç/kapa butonu `display: none` (odak modunda ambiyans sesi anlamsız).
   - Kapsanacak effects dosyaları: `docker-effects.css`, `selenium-effects.css`,
     `playwright-effects.css`, `cypress-effects.css`, `python-effects.css`,
     `git-effects.css`, `homepage-effects.css`, `night-sky-effects.css` + 16
     sayfalık rollout'un dosyaları (`typescript/javascript/sql/java/linux/jmeter/
     postman/bruno/restassured/jenkins/kubernetes/kafka/appium/browserstack/aws/
     azure`-effects.css — tam adları `src/` altında glob'la doğrula).
2. **Toggle butonu:** `TopicPage.jsx` header'ında dark-mode toggle'ın yanına 🎯
   butonu (aria-label bilingual: `{tr: 'Odak modu — dekoratif efektleri kapat',
   en: 'Focus mode — turn off decorative effects'}`). State + useEffect kalıbı
   `darkMode` ile birebir aynı. HomePage'e de aynı buton (oradaki dark mode
   butonunun yanına). Buton aktifken görsel olarak "basılı" görünmeli (mevcut
   toggle'ların aktif stilini taklit et). Min 36px touch target (CLAUDE.md §12).
3. **Test:** `tests/theme-and-accessibility.spec.ts`'e 1 test ekle: `/docker`'da
   odak modu butonuna bas → `document.documentElement` `focus-mode` class'ı
   almalı → bir parçacık elemanının `display: none` olduğunu doğrula → reload →
   kalıcılık → tekrar bas → efekt geri gelmeli.

**Dikkat:** Mevcut testler (`topic-pages-ui.spec.ts` ve rollout doğrulamaları)
efektlerin VARLIĞINI kontrol ediyor olabilir (`animationName` kontrolleri).
Default `focusMode='false'` olduğu sürece bozulmazlar — default'u asla değiştirme.

---

## WP4 — 🔄 "Bugünkü Tekrar" (Spaced Repetition Lite)

**Neden:** Platformun en büyük pedagojik açığı: kullanıcı bir dersi bitirince o
dersin bilgisi bir daha hiç sorgulanmıyor (unutma eğrisi). Yanlış cevaplanan quiz
soruları en değerli tekrar malzemesidir — sadece onları hedefleyen hafif bir
Leitner kutusu kuruyoruz. Backend YOK, üyelik GEREKMEZ (CLAUDE.md §5: progress
local-first).

**Tasarım kararları (verildi):**

- **Kapsam: SADECE yanlış cevaplanan quiz soruları kuyruğa girer.** İlk denemede
  doğru cevaplananlar girmez. (Basitlik + en yüksek değer.)
- **localStorage anahtarı: `learnqa_review_queue`** — tek anahtar, JSON dizi.
- **Kayıt şeması:**
  ```js
  {
    id: `${pageKey}:${tabIndex}:${blockIndex}`,  // tekillik anahtarı
    route: '/docker',                             // "Konuya git" linki için
    pageTitle: '🐳 Docker',                       // kutuda gösterim için
    question: { tr: '...', en: '...' },           // cevap anındaki SNAPSHOT
    options: [{ tr: '...', en: '...' }, ...],     // blok bilingual değilse aynı metin her iki alana
    correctIndex: 2,
    explanation: { tr: '...', en: '...' },        // varsa
    wrongCount: 1,          // toplam yanlış sayısı (istatistik)
    streak: 0,              // üst üste doğru tekrar sayısı
    nextDue: 1751600000000, // epoch ms — bir sonraki gösterim zamanı
    addedAt: 1751500000000,
  }
  ```
- **Zamanlama (Leitner-lite):** kuyruğa girişte `nextDue = şimdi + 1 gün`.
  Tekrarda doğru → `streak++`, aralık: 1 → 3 → 7 gün; `streak === 3` olunca kayıt
  kuyruktan SİLİNİR (mezun oldu). Tekrarda yanlış → `streak = 0`,
  `nextDue = şimdi + 1 gün`, `wrongCount++`.
- **Kapasite:** maksimum 100 kayıt. Doluyken yeni kayıt gelirse en eski `addedAt`
  silinir. Aynı `id` tekrar yanlış cevaplanırsa yeni kayıt AÇILMAZ — mevcut kaydın
  `wrongCount`'u artar, `nextDue` yarına çekilir.
- **Snapshot yaklaşımının bilinçli sınırı:** ders içeriği sonradan değişirse
  kuyruktaki soru eski kalır — kabul edilmiş trade-off, kayıt kendi kendine
  yeterlidir, data dosyasına geri bakmaz. Plana uygun; düzeltmeye çalışma.

**Yapılacaklar:**

1. **Yeni dosya `src/lib/reviewQueue.js`** — saf fonksiyonlar (React'sız):
   `addWrongAnswer(record)`, `getDueItems(now)`, `recordReviewResult(id, isCorrect, now)`,
   `getQueueStats()`. Tüm localStorage erişimi try/catch içinde (mevcut kalıp).
   Yorum satırları Türkçe (CLAUDE.md §8).
2. **Yakalama noktası — `TopicPage.jsx`:** `handleQuizAnswered(blockIndex, isCorrect)`
   (satır ~19865) çağrı zincirini bul: quiz bloğunu render eden component
   (`renderBlock` içindeki quiz case'i) elinde blok VERİSİNE sahip. `isCorrect === false`
   olduğunda `addWrongAnswer(...)` çağır — soru/şık/açıklama alanlarını bloğun
   kendisinden snapshot'la (blok `{tr, en}` bilingual ise ikisini de al; düz string
   ise aynı metni iki alana koy). `handleQuizAnswered`'ın imzasını değiştirmek
   gerekiyorsa değiştirebilirsin (blok referansı parametre olarak eklenebilir) —
   çağıran yerleri grep'le bul, hepsini güncelle.
   **Dikkat:** Yanlış cevapta alternatif soru mekanizması var (CLAUDE.md §18) —
   snapshot'ı KULLANICININ YANLIŞ CEVAPLADIĞI sorudan al, alternatifinden değil.
3. **UI — `HomePage.jsx`:** QA Mentor banner'ının altına koşullu kart:
   `getDueItems(Date.now()).length > 0` ise göster. Kart: "🔄 Bugünkü Tekrar —
   N soru seni bekliyor" (bilingual). Tıklanınca sayfa içinde açılan basit bir
   panel/modal (HomePage'deki mevcut modal/panel kalıbını taklit et): en fazla 5
   due soru, tek tek MCQ olarak; cevap verilince doğru/yanlış geri bildirimi +
   `explanation` + `recordReviewResult` çağrısı + "Konuya git →" linki (`route`).
   Panel kapandığında kart sayısı güncellenir. Süslü animasyon ZORUNLU DEĞİL —
   önce işlevsellik; görsel cila ayrı bir iterasyonda.
4. **Test — yeni dosya `tests/review-queue.spec.ts`:**
   (a) `/docker`'da bir quiz'i bilerek yanlış cevapla → localStorage'da
   `learnqa_review_queue` 1 kayıt içermeli (nextDue yarın olduğu için ana sayfa
   kutusu HENÜZ görünmez — bunu da assert et);
   (b) `page.addInitScript` ile `nextDue`'su geçmişte olan sahte bir kayıt enjekte
   et → ana sayfada kart görünmeli → soruyu doğru cevapla → `streak` 1 olmalı ve
   `nextDue` ~3 gün sonraya kaymalı.
   `serviceWorkers: 'block'` kullan (bilinen MSW tuzağı — `NEXT_SESSION.md`'de belgeli).
5. `reviewQueue.js` içindeki eşikler (1/3/7 gün, 100 kapasite, 5 soru/oturum)
   dosyanın başında named const olarak dursun — ileride ayar kolaylığı.

**Kapsam DIŞI (yapma):** Supabase senkronizasyonu, rozet/XP entegrasyonu,
mülakat sorularının kuyruğa girmesi, bildirimler. Bunlar ayrı karar gerektirir.

---

## WP5 (OPSİYONEL — WP4 bitmeden başlama) — Rozet Sınavına Karışık Soru

Bitirme rozeti sınavına (%80 eşiği, AC06) önceki derslerden %20-30 soru karıştırmak
(interleaving) kalıcılığı artırır. Ancak bu, `learnqa_review_queue`'daki snapshot
altyapısını "diğer sayfaların soru havuzu" olarak yeniden kullanmayı gerektirir ve
rozet akışına (`InterviewPracticeBlock`, `grade-interview-answer`) dokunur — riskli
alan. **WP4 canlıda çalışıp veri biriktirmeye başladıktan sonra, kullanıcıdan ayrıca
onay alarak** ele alınmalı. Şimdilik sadece bu notu bırak.

---

## Sonnet'in YAPMAYACAĞI İşler (Fable/kullanıcı kararı gerektirir)

Bunlar inceleme raporunda tespit edildi ama bilinçli olarak bu planın dışında:

1. **Python/Java sayfalarının atomikleştirilmesi** (§16 ihlali: Foundations/
   Intermediate/Advanced mega-sekmeleri): Yüzlerce bloğun yeniden bölümlenmesi +
   localStorage progress anahtarlarının migrasyonu gerekir — içerik mimarisi
   kararıdır, ayrı ve büyük bir proje olarak planlanmalı.
2. **Capstone (uçtan uca entegre proje) sayfası:** Yeni route + yeni içerik +
   roadmap entegrasyonu — içerik tasarımı Fable/kullanıcı ile yapılmalı.
3. **CLAUDE.md anayasa çelişkilerinin çözümü:** §17 "2 LEGO anlatımı" ↔ §9.3
   "hedef kitle yetişkin QA mühendisi" çelişkisi ve §9.1 "her kod bloğu sonrası
   üçlü" kuralının "her yeni kavram sonrası" olarak gevşetilmesi önerisi —
   anayasayı sadece KULLANICI değiştirebilir. Sonnet bu dosyalara dokunmasın;
   kullanıcıya hatırlatabilir.

---

## İş Paketi Kapanış Ritüeli (her WP sonunda, atlanamaz)

```
1. node scripts/check-content-integrity.mjs   # 0 ihlal
2. npm run build                              # PASS (SEO + static shells dahil)
3. npx playwright test                        # yeni testler + mevcutlar (bilinen /python flakiness istisna)
4. TR yorum taraması                          # bu WP'de eklenen her yorum satırı Türkçe mi?
5. NEXT_SESSION.md güncelle                   # yapılan, kalan, bilinen riskler
6. Kullanıcı onayıyla commit                  # mesaj sonuna Co-Authored-By satırı
```
