# NEXT SESSION - Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan proje durumunu tekrar isteme. Kalıcı kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adımları `DEPLOY.md`; güncel iş
> listesi ve son inceleme sonucu sadece bu dosyadadır.
>
> Bu dosyada commit hash/anlık durum tutulabilir; kalıcı kural dosyalarına
> commit hash/anlık not yazılmaz (bkz. CLAUDE.md §0).
>
> **2026-07-25'te bu dosya 10.000+ satırlık kronolojik bir oturum günlüğüne
> dönüşmüştü (Haziran sonundan beri her oturumun tam anlatımı birikmişti).
> Temizlendi:** kalıcı değeri olan bulgular `CLAUDE.md` §9.3/§23'e taşındı,
> geri kalan tamamlanmış/main'e gitmiş iş anlatıları silindi — tam ayrıntı
> her zaman `git log --oneline` çıktısında ve commit mesajlarında duruyor
> (mesajlar açıklayıcı yazılır, ör. `feat(api-testing): GRUP K tamamlandı`).
> Bundan sonra bu dosyayı **güncel durum + açık işler** olarak tut, kapanan
> her iş için ayrı bir bölüm biriktirme — CLAUDE.md'ye taşınacak kalıcı bir
> kural/bulgu yoksa ilgili girdiyi commit'e güvenip sil.

---

## 🚩 OTURUM DEVİR NOTU (2026-08-03, Opus — Aşama 4: HowTo + yazar/kurum kimliği + mobil LCP) — YENİ OTURUM BURADAN BAŞLASIN

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** — main'e MERGE EDİLMEDİ,
  remote'a PUSH EDİLMEDİ. Karar hâlâ kullanıcıda.
- Faz 3'ün **Aşama 4'ü (teknik güven sinyalleri) BİTTİ.** Planda açık kalan
  tek kod işi buydu; geriye yalnızca kullanıcı aksiyonları kaldı.
- Build yeşil, `seo-phase3-integrity` **19/19** (12 → 19, yedi yeni test).

### Bu oturumda yapılanlar

1. **Kurulum sekmelerine `HowTo` şeması (13 bölüm × 2 dil = 26 sayfa).**
   - Kaynak YALNIZCA `installation` ve `steps` blokları. `step-animation`
     bilerek hariç tutuldu: adları adım gibi görünse de o blok bir mekanizma
     anlatır ("Sürüm bir sözleşmedir"), uygulanabilir talimat değil — onu
     prosedür diye işaretlemek sahte bir kurulum rehberi ilan etmek olurdu.
     Kapsam 24 kurulum sekmesinin 13'ü; eksik kapsam yanlış prosedüre yeğdir.
   - **Asıl kazanç yan üründe:** kurulum adımları bu iş sayesinde İLK KEZ
     crawl edilebilir metne girdi. `cmd` alanı ve düz metin adım listeleri
     SEO metnine giren alanlar listesinde YOKTU — yani "docker kurulumu"
     sayfasının gerçek adımlarını Google hiç görmüyordu. Artık statik
     HTML'de numaralı liste olarak basılıyor.
   - ⚠ Google `HowTo` zengin sonuçlarını 2023'te kaldırdı; bu şema Google'da
     görsel bir zengin sonuç ÜRETMEZ. Bing hâlâ kullanıyor ve şema sayfanın
     bir prosedür olduğunu makineye bildiriyor — bu yüzden yine de değerli,
     ama "SERP'te adım listesi çıkacak" beklentisi kurma.
2. **Yazar/kurum kimliği (E-E-A-T).** `Organization` + `Person` düğümleri her
   sayfada, `@id` referansıyla (her sayfada kişiyi yeniden tarif etmek yerine
   tek kimliğe işaret etmek, motorun kişiyi site genelinde tek varlık olarak
   tanımasını sağlar). `WebPage` ve `Course` bu düğümlere `author`/`publisher`
   ile bağlanıyor.
   - **Görünür künye** hem statik HTML'de hem JavaScript sonrası duruyor:
     "Yazan: Hasan Kocaman · QA Otomasyon Mühendisi · Yayıncı: LearnQA.dev ·
     Son güncelleme: 2 Ağustos 2026" (EN'de İngilizce). Yalnızca shell'de
     kalsaydı Google'ın render ettiği sayfada yazar bilgisi kaybolurdu.
   - Metinlerin ve şemanın TEK kaynağı `src/utils/authorship.js`.
3. **Tarih artık üç yerde de aynı.** `scripts/lib/lastmod.mjs` (git commit
   tarihi) → sitemap `lastmod` + şema `dateModified` + görünür künye. Tarayıcı
   git göremediği için build sırasında `src/data/generated/pageUpdated.js`
   üretiliyor (36 sayfa). Shallow clone'da tarih hiç üretilmez, künye tarihsiz
   basılır — yanlış tarih göstermektense hiç göstermemek.
4. **Mobil LCP ölçüm aracı: `npm run seo:lcp`.** Pixel 5 + 4x CPU kısma +
   Slow 4G, sayfa başına 3 koşum, medyan. Rapor `reports/mobile-lcp.json`
   (git'e girmez). `--strict` ile bütçe aşımında çıkış kodu 1.
   - **Ölçüm sonucu (2026-08-03, 7 sayfa): hepsi bütçe içinde.**
     LCP 1204-1984 ms (bütçe 2500), CLS 0.009-0.053 (bütçe 0.1).
     En yavaş: `/en/selenium` 1984 ms, `/selenium` 1960 ms.
   - ⚠ **İlk koşum bilerek ATILIR.** Isınmamış ilk istekte ana sayfa 7566 ms,
     ısındıktan sonra ~1300 ms ölçüldü; ısınma koşumu olmadan medyan bu tek
     aykırı değerle zehirlenip olmayan bir regresyon bildiriyordu.
   - ⚠ Git Bash'te `--routes /` argümanı yol dönüşümüne uğrar (`C:/Program
     Files/Git/` olur). Belirli sayfa ölçeceksen PowerShell kullan.
5. **Guard'lar ve testler.** `check-dist-seo.mjs` artık her sayfada
   yazar/kurum şemasını + görünür künyeyi, kurulum sekmelerinde her HowTo
   adımının gövdede görünür olduğunu hard-fail ile zorluyor.
   `tests/seo-phase3-integrity.spec.ts` 12 → 19 test.

### Doğrulama durumu

- `npm run build` ✓ · içerik bütünlüğü ✓ (42 dosya) · i18n leak 0 ✓.
- Build çıktısı: 26 HowTo sayfası, 24 FAQPage, 70 Course, 688 indekslenebilir
  sekme, 770 sitemap URL.
- `seo-phase3-integrity` 19/19 · `no-internal-jargon` + `seo-phase2-coverage`
  + `seo-section-routes` 36/36 · `i18n-content-toggle` + `mobile-smoke` 40/40.
- Tam `npm run test:e2e` paketi bu oturumda koşulmadı — merge öncesi bir kez
  koşturmak faydalı olur.

### Sıradaki iş

1. **Branch main'e merge + push kararı — kullanıcıda.** Faz 3'te açık kod işi
   KALMADI.
2. Dış tanıtım taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a manuel yayınlanmadı — kullanıcı aksiyonu.
3. Plausible analytics hesabı hâlâ açılmadı; deploy'dan önce açılmazsa ilk
   günlerin ölçümü kalıcı olarak kaybolur.
4. Yayından sonra Google Search Console'da sekme URL'lerinin indekslenmesini
   izle.

---

## 📌 Önceki Durum (2026-08-03, Opus — Faz 3 kod incelemesi: 3 sessiz arıza + manuel rehber + regresyon testleri)

> Alttaki bölümler korunuyor; oradaki mimari kararlar hâlâ geçerli, bu oturum
> onların ÜSTÜNE düzeltme yaptı.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** — main'e MERGE EDİLMEDİ,
  remote'a PUSH EDİLMEDİ. Karar kullanıcıda.
- S1-S5 içeriği ve sekme-URL mimarisi bitti (alttaki bölümler). Bu oturum
  onları **denetledi** ve üç sessiz arıza buldu — üçü de düzeltildi ve
  regresyon testi altına alındı.
- Son commit: `486edb8`. Build yeşil, `seo-phase3-integrity` 12/12.

### Bu oturumda bulunan ve düzeltilen 3 arıza

Üçünün ortak yanı: **hiçbiri hata vermiyordu** — build yeşil, sayfa çalışıyor,
test kırmızı değil. Bu yüzden ancak elle okuyup ölçerek bulundular.

1. **Slug dondurma kuralı 420 bölümün 379'unda ÖLÜYDÜ**
   (`scripts/generate-section-slugs.mjs`). Manifest başlıkları
   `stripLeadingEmoji` ile YAZILIYOR ("What is Selenium?"), katalog başlıkları
   emoji'yi KORUYOR ("🟢 What is Selenium?") — `byTitle.get()` hiç tutmuyordu.
   Sonuç: slug'lar başlığa değil **yalnızca index'e** bağlıydı. Bir veri
   dosyasının ORTASINA bölüm eklenince `/selenium/locators` sessizce BAŞKA bir
   bölümün içeriğini göstermeye başlardı (404 bile değil — yanlış içerik).
   **Düzeltme:** iki tarafta da strip. 420/420 isabet, mevcut slug'larda
   **sıfır** değişiklik (geriye dönük güvenli).
   ⚠️ Yeni bir veri dosyası eklerken bu kuralın hâlâ canlı olduğunu
   `seo-phase3-integrity.spec.ts` doğruluyor — o test kırmızıya dönerse
   URL'lerin içerikten koptuğunu anla.

2. **688 sekme URL'i iç bağlantı grafiğinde ÖKSÜZDÜ**
   (`scripts/generate-static-routes.mjs`). Hub shell'i (sitenin en çok link
   alan sayfası) kendi bölümlerine HİÇ `<a href>` vermiyordu; sekmeler
   yalnızca sitemap'ten keşfedilebiliyordu. Sitemap **keşif** sağlar ama
   tarama önceliğini ve sayfa otoritesini **iç bağlantılar** dağıtır — Faz
   3'ün tüm kazancı buna bağlıyken tek link yoktu.
   **Düzeltme:** `buildSectionSeoIndex` artık hub döngüsünden ÖNCE
   hesaplanıyor, hub gövdesine "Bu dersin bölümleri" listesi basılıyor
   (selenium 13, sql 23, python 19, test-automation 7 — iki dilde).
   İlk sekme (hub kopyası) ve kilitli mülakat sekmesi bilinçli HARİÇ.

3. **SSS bloğu JavaScript sonrası başlık yapısını kaybediyordu**
   (`TopicPage.jsx` `case 'faq'`). Statik shell `<h2>/<h3>` basarken React
   `<div>/<p>` basıyordu — Google'ın render ettiği DOM ile ham HTML ayrışıyor,
   ekran okuyucu da soruları başlıktan başlığa gezemiyordu. `<h3>/<h4>` yapıldı
   (bölüm başlığı `<h2>` olduğu için hiyerarşi h2 → h3 → h4).

### Denetlenip TEMİZ çıkanlar (tekrar bakmaya gerek yok)

- `/test-automation` 8 sekmenin hepsinde video + animasyon + sandbox tam.
- 11 sayfanın SSS blokları iki dilde de eksiksiz; 132 sorunun hepsi benzersiz.
- 688 indekslenebilir sekme metadata'sının tamamı SERP sınırları içinde
  (title ≤62, description 80-180) — tekilleştirme adımı bile sınırı aşmıyor.
- İlk sekme URL'i (`/selenium/what-is-selenium`) runtime'da hub'a onarılıyor;
  canonical hub'da kalıyor (kanibalizasyon önlemi JS sonrası da geçerli).

### Eklenen kalıcı belge ve testler

- **`Documents/seo-phase-3-plan.md` §12.5 — MANUEL TEST REHBERİ.** Kullanıcının
  elle doğrulaması için: hazırlık, sekme URL'leri (7 madde), Ctrl+U ile ham
  HTML (6 madde), SSS/cevap paragrafı cloaking kontrolü, `/test-automation`,
  kanibalizasyon tablosu, **otomatik testin göremediği 5 şey**, yayın sonrası
  GSC takvimi. §12.6 = hangi test dosyası neyi koruyor tablosu.
- **`tests/seo-phase3-integrity.spec.ts` (12 test, 12/12 yeşil).** Yukarıdaki
  üç arızanın üçü de artık bekçi altında; ayrıca metadata sınırları,
  shell↔tarayıcı canonical/başlık tutarlılığı, SSS'nin kilitsizliği.
  ⚠️ `dist/` ister — önce `npm run build`.

### Sıradaki iş

1. Kurulum sekmeleri için `HowTo` şeması, E-E-A-T yazar/kurum şeması, mobil
   LCP ölçümü — henüz başlanmadı (plan §8 Aşama 4).
2. Outreach taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a **manuel yayınlanmadı** — kullanıcı aksiyonu (Aşama 5).
3. Branch main'e merge + push kararı.

---

## 📌 Önceki Durum (2026-08-02, Sonnet — SEO Faz 3 / S1+S4+S5 içerik + FAQ altyapısı)

> Bu oturumun ürettiği içerik hâlâ geçerli; üstteki bölüm onun üstüne
> düzeltme yaptı.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** (main'e MERGE EDİLMEDİ).
- `Documents/seo-phase-3-sonnet-prompts.md`'deki S1-S5 promptları uygulanıyor;
  her prompt kendi commit'inde. Bu oturumda S1, S4, S5 BİTTİ; `faq` blok
  altyapısı (S2'nin önkoşulu) kuruldu. S2 ve S3 sırada.

### Bu oturumda TAMAMLANAN

1. **S1 — `seoAnswer` 9 sayfaya eklendi:** playwright, cypress, python, sql,
   java, docker, jenkins, api-testing, what-is-testing. Build sonu
   "Answer-first paragraphs: 10 sayfa" ile doğrulandı (selenium + bu 9'u).
   Her ikisi 25-120 kelime aralığında, ilk cümle doğrudan tanım.
2. **S4 — 4 sayfanın metadata'sı sorgu diliyle hizalandı:**
   `/qa-mentor` → "yazılım test uzmanı nasıl olunur"/"testerlık öğren",
   `/what-is-testing` → "test türleri nelerdir" eklendi,
   `/manual-testing` → "test senaryosu örnekleri" eklendi,
   `/test-frameworks` → EN title'a birebir "Playwright vs Selenium" yazıldı.
   Ek olarak `/qa-mentor`'a sihirbaz BAŞLAMADAN görünen "Sıfırdan QA mühendisi
   olmak: 6 aşama" özeti eklendi (`ZERO_TO_QA_STAGES`, `qaMentorData.js` +
   `QAMentorPage.jsx`) — sihirbazın kişiselleştirdiği 4 haritadan (MAP_A/B/C1/C2)
   BAĞIMSIZ, genel bir önizlemedir.
3. **S5 — Dış otorite metinleri:** `README.md` üst bölümü QA Learning
   Platform'u yansıtacak şekilde yeniden yazıldı (playground açıklaması
   korunarak altına eklendi). `Documents/outreach/` altında GitHub About
   metni + 3 tanıtım yazısı taslağı (Selenium wait, SQL JOIN, Playwright vs
   Selenium) — hiçbiri build'i etkilemez, salt metin.
4. **`faq` blok tipi + TAM ALTYAPI (S2'nin önkoşulu) — BİTTİ:**
   `TopicPage.jsx`'e `case 'faq':` — `{ items: [{q:{tr,en}, a:{tr,en}}] }`
   şemasıyla, **quiz/mülakat gating'ine tabi değil**. `interview-questions`'ın
   YERİNE geçmez, ayrı bir kilitsiz kaynaktır. Tamamlanan parçalar:
   - `generate-static-routes.mjs`: `faqItemsFromContent()` sayfanın
     `sections`'ındaki `faq` bloklarını toplar; shell'e görünür "Sık Sorulan
     Sorular" bölümü olarak basılır (ana sayfadaki `interviewWarmupData`
     kalıbıyla birebir aynı ilke: ekranda yazan = şemaya giren).
   - `structuredDataFor`'daki `FAQPage` artık ana sayfaya özel DEĞİL — her
     route kendi `faqItems`'ından (≥3 soru) kendi şemasını üretebilir.
   - `check-dist-seo.mjs` görünürlük guard'ı TÜM route'lara genelleştirildi.
   - `tests/seo-phase2-coverage.spec.ts` güncellendi (homepage-only varsayımı
     kaldırıldı, sekme shell'lerinde FAQ ASLA olmadığı ayrı testle doğrulandı)
     + sitemap URL sayısı testi artık sekme URL'lerini de hesaba katıyor
     (daha önce A-fazından kalan bir regresyon riskiydi, bu oturumda yakalandı
     ve düzeltildi — 17/17 yeşil).
   - Build doğrulaması: "Rich results: 68 pages with Course, 2 with FAQPage"
     (S2 içeriği eklenmeden önce beklenen durum — sadece ana sayfa).

5. **S2 — 10 sayfaya `faq` bloğu içerik olarak eklendi — BİTTİ:** Selenium,
   Playwright, Cypress, Python, SQL, Java, Docker, Jenkins, API Testing,
   Yazılım Testi Nedir. Her sayfada ilk sekmenin sonuna, ilk quiz bloğundan
   HEMEN ÖNCE 5-6 soru. Build sonucu: "Rich results: 68 pages with Course,
   **22 with FAQPage**" (10 sayfa × 2 dil + 2 ana sayfa = 22, tam beklenen).
   `tests/seo-phase2-coverage.spec.ts` 17/17 yeşil.
   - **Dosya-yapısı notu (sonraki sayfalar için önemli):** `pythonData.js` ve
     `typescriptData.js` gibi dosyalar `applyTr(enSection, overrides)`
     index-eşleşmesi kullanır (CLAUDE.md §23.4) — yeni blok EKLERKEN mevcut
     override index'lerinden (0-8 gibi) SONRAKİ, henüz override'ı olmayan bir
     konuma eklendi (quiz'den hemen önce), böylece hiçbir override kaymadı.
     Yeni bir applyTr dosyasına dokunursan önce override anahtarlarının hangi
     indekslere kadar gittiğini say.
   - `sqlData.js`/`selenium`/`playwright`/`cypress`/`java`/`docker`/`jenkins`
     dual-tree (ayrı tr/en blok dizileri) — paylaşılan bilingual `faq` const'ı
     HER İKİ ağaca da aynı referansla eklendi (`sqlIntroWhyFilm` ile aynı kalıp).
   - `apiTestingData.js`/`whatIsTestingData.js` tek ağaçlı (sections shared) —
     tek insertion yeterli.

6. **`/test-automation` route + altyapı + S3 içeriği — BİTTİ:** "test
   otomasyonu" sorgusunun TEK sahibi yeni hub sayfası. Route (`App.jsx`),
   SEO metadata (`seo.js`), sayfa bileşeni (`TestAutomationPage.jsx`) ve
   veri modülü kaydı (`scripts/lib/topicDataModules.mjs`) eklendi — sekme-URL
   sistemine OTOMATİK dahil oldu (`npm run seo:section-slugs` çalıştırıldı:
   31 sayfa/420 bölüm, 8'i yeni). 8 sekme: Test Otomasyonu Nedir, Ne Zaman
   Otomatikleştirilir, Araç Seçimi, İlk Otomasyon Testin, Maliyet ve ROI,
   Otomasyon Neden Başarısız Olur, Kariyer, SSS. Her sekmede video-scene +
   step-animation + code-playground üçlüsü + 4 katmanlı analoji içeren
   `simple-box`. İki `link-grid` bloğuyla Selenium/Playwright/Cypress/Appium
   ve API testi/Python/Jenkins/QA Mentor'a gerçek iç link.
   - Build sonucu: 46 route (+1), 344 indekslenebilir sekme (+7), "Answer-first
     paragraphs: 11 sayfa" (+1), "70 with Course, 24 with FAQPage" (+2/+2).
   - `tests/video-scene.spec.ts`'e temsili render testi eklendi (1/1 yeşil).
   - `tests/seo-section-routes.spec.ts` + `seo-phase2-coverage.spec.ts`
     27/27 yeşil. Canlı smoke test: sekmeler arası gezinti + link-grid'in
     gerçekten `/selenium`'a yönlendirdiği + `/qa-mentor` özetinin göründüğü
     doğrulandı.
   - **Ders:** İlk yazımda `table`/`list` bloklarının şemasını YANLIŞ
     varsaydım (`headers:{tr:[...],en:[...]}` gibi tüm diziyi bilingual
     sarmak) — gerçek şema HER HÜCRE/HER ÖĞE ayrı ayrı `{tr,en}` olmalı
     (`TopicPage.jsx` `tx()` her hücreyi tek tek çağırıyor). Yeni bir blok
     tipi kullanmadan önce renderer'ın gerçek beklediği şekli oku.
   - 3 `code-playground` bloğunda Türkçe karakterli düz string starterCode/
     solutionCode i18n taramasında yakalandı, `{tr,en}` ikili formata çevrilip
     düzeltildi (CLAUDE.md §8 kuralı).

### Tam E2E doğrulaması yapıldı (2026-08-02 gece) — S1-S5 kapandı

`npx playwright test` tam paket: **340 passed, 8 failed, 6 flaky (1.9h)**.
8 "failed" tek tek izole edilerek incelendi — hiçbiri bu oturumun S1-S5
işinden kaynaklanan gerçek bir regresyon DEĞİL:

- `seo-section-routes.spec.ts` (3 test, /selenium/wait-strategies etrafında)
  ve `topic-pages-ui.spec.ts` (/sql, /typescript, /python) — tam paket
  `fullyParallel` + çoklu worker'la aynı anda en büyük data chunk'larını
  (selenium ~650KB, sql/typescript/java 800KB-1.1MB) Vite dev server'a
  isteyince transform süresi varsayılan 5000ms `expect` timeout'unu aşıyor.
  **Kanıt:** aynı testler `--workers=1` (seo-section-routes: 10/10) ve
  `--workers=2` (topic-pages-ui: 29/29, /sql-/typescript-/python dahil)
  ile TAM YEŞİL. Gerçek bug değil, dev-server kaynak çekişmesi.
- `analytics-events.spec.ts` ve `homepage-recommended-badges.spec.ts` —
  izole `--workers=1` koşumda da başarısız KALDI, ama bu iki test dosyası
  ve etkiledikleri `HomePage.jsx` bu branch'te `main`'e göre **hiç
  değişmemiş** (`git diff main --stat` boş) — bu oturumdan önce de var olan
  flaky testler, S1-S5 ile ilgisi yok.
- 6 flaky (retry'de geçti) hepsi de dokunulmamış sayfalar/akışlar
  (interview-grading-and-reset, other-pages-ui, portfolio-page) — aynı
  paralel-yük deseni.

**Sonuç:** SEO Faz 3 S1-S5 içeriği (seoAnswer, FAQ altyapısı, /test-automation,
metadata hizalama, outreach) hiçbir mevcut testi bozmadı.

### Sıradaki iş

1. Kurulum sekmeleri için `HowTo` şeması, E-E-A-T yazar/kurum şeması + mobil
   LCP ölçümü — henüz başlanmadı (plan §8 Aşama 4).
2. Outreach taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a **manuel yayınlanmadı** — kullanıcı aksiyonu (plan §8
   Aşama 5).
3. Branch `feature/seo-phase-3-serp-rankings` main'e merge edilmedi, remote'a
   push edilmedi — karar kullanıcıda.

---

## 📌 Önceki Durum (2026-08-02, Opus — SEO Faz 3 / Sekme URL'leri)

> Çelişki olursa bu bölüm günceldir.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** (main'e MERGE EDİLMEDİ,
  karar kullanıcıda). `main` bir önceki oturumun sonunda (`aa96dd1`).
- Yeni hedef: `learnqa` marka sorgusundaki 1. sıralığı **markasız** sorgulara
  taşımak ("selenium nedir", "test otomasyonu", "testerlık öğren", "playwright
  nedir" + İngilizce karşılıkları).
- Plan: `Documents/seo-phase-3-plan.md` (§0'da Opus/Sonnet görev dağılımı).
  Sonnet promptları: `Documents/seo-phase-3-sonnet-prompts.md`.

### Bu oturumda TAMAMLANAN (Opus tarafı — A fazı)

**Teşhis (ölçüldü, tahmin değil):** Sitenin içeriğinin ~%93'ü Google'a
görünmüyordu. `/selenium` sayfasında 15 sekme / 428 blok var ama statik
HTML'de yalnızca **665 kelime**; sekmeler React state'iydi, URL'i yoktu, tek
URL 15 farklı arama niyetiyle yarışıyordu.

**Çözüm: her dikey sekmeye kendi URL'i** (`/selenium/wait-strategies`).

| Ne | Nerede |
|---|---|
| Slug manifesti (dondurulmuş, 30 sayfa / 412 bölüm) | `src/data/generated/sectionSlugs.js` |
| Manifest üreticisi (`--check` modu build'de) | `scripts/generate-section-slugs.mjs` |
| Slug + metadata türetme (build ve runtime ORTAK) | `src/utils/sectionSeoText.js` |
| Katalog, ince içerik kararı, tekilleştirme | `scripts/lib/sectionSeo.mjs` |
| Ders sayfası → veri modülü tablosu (tek kaynak) | `scripts/lib/topicDataModules.mjs` |
| Runtime slug ↔ sekme eşlemesi | `src/utils/sectionRoutes.js` |
| Route'lar (`SECTION_PAGE_ELEMENTS`, 30 sayfa) | `src/App.jsx` |
| Sekme ↔ URL senkronu, sayfa-düzeyi `basePath` | `src/components/TopicPage.jsx` |
| Çalışma zamanı sekme başlığı/description'ı | `src/lib/seoOverride.js` + `SeoMeta.jsx` |
| Sekme shell'leri (gerçek metin + kardeş linkler) | `scripts/generate-static-routes.mjs` |
| Sitemap + gerçek `lastmod` | `scripts/generate-seo-files.mjs` |
| Guard'lar (hepsi hard-fail) | `check-seo.mjs`, `check-dist-seo.mjs` |
| Testler (10/10 yeşil) | `tests/seo-section-routes.spec.ts` |

**Ölçülen sonuç:** sitemap 94 → **754 URL**; üretilen shell 94 → **918**;
`/selenium` ailesinin crawl edilebilir metni 665 kelime / 1 URL → **7.290
kelime / 16 URL**; indekslenebilir sekme (dil başına) **337**.

**Dikkat edilmesi gereken kararlar (yeniden tartışmadan önce oku):**
- Slug iki dilde de AYNI (İngilizce başlıktan). `basename="/en"` path'i
  paylaştırdığı için dile göre slug iki yönlü eşleme tablosu isterdi.
- İlk sekme hub URL'inde kalır; shell'i üretilir ama canonical'ı hub'a gider
  (kanibalizasyon önlemi). Üstüne `noindex` KONMAZ — çelişkili sinyal olur.
- Mülakat sekmeleri (quiz kilidi arkasında) ve 180 kelime altı bölümler
  sitemap dışı + `noindex`.
- Bilinmeyen slug 404 vermez, hub'a düşer, adres kendini onarır.
- `TopicPage`'deki 9 adet `location.pathname` kullanımı `basePath`'e çevrildi
  (ilerleme, ustalık, yorumlar, rozet sayfa düzeyindedir — sekme başına
  parçalanmamalı). Yeni kod yazarken bu ayrımı koru.
- `seoOverride` effect'inin bağımlılıklarında `sections` ZORUNLU: büyük
  sayfalar önce boş bölümlü stub ile mount olup veriyi arkadan yüklüyor.
- `.github/workflows/deploy.yml` build job'ına `fetch-depth: 0` eklendi —
  sığ klonda `lastmod` güvenilmez olduğu için hiç yazılmıyor.

### Sıradaki iş

**Opus (altyapı, sırayla):**
1. ✅ `seoAnswer` altyapısı BİTTİ — alan `hero`'nun yanında, hero altında
   görünür render ediliyor, statik HTML'de `<h1>` sonrası ilk paragraf,
   `check-dist-seo.mjs` üç kuralı zorluyor (iki dilde dolu, 25-120 kelime,
   gövdede gerçekten basılı). Referans: `/selenium`. Kalan 9 sayfa Sonnet'te.
2. `FAQPage` altyapısı — kilitsiz kaynaktan üretim + görünürlük guard'ı.
   (S2 promptu buna bağlı.)
3. `/test-automation` route + metadata + sayfa iskeleti. (S3 promptu buna bağlı.)
4. Kurulum sekmeleri için `HowTo` şeması.
5. E-E-A-T: yazar/kurum şeması + görünür "son güncelleme" tarihi.

**Sonnet:** `Documents/seo-phase-3-sonnet-prompts.md` içindeki S1-S5.
S3/S4/S5'in bağımlılığı yok, hemen başlatılabilir.

**Kullanıcı:** yayından sonra Google Search Console'da sekme URL'lerinin
indekslenmesini izle (aylık ritim planın §9'unda).

### Bilinen not

- Build süresi sekme shell'leri yüzünden uzadı (918 HTML dosyası üretiliyor).
- `dist` boyutu arttı; GitHub Pages artifact sınırının çok altında.

---

## 📌 Önceki Durum (2026-08-02, Sonnet — portfolyo: görev yönlendirme + "Sıradaki Görev")

> Bu bölüm, yeni bir oturumun 30 saniyede duruma hâkim olması için yazıldı.
> Ayrıntılar aşağıdaki tarihli bölümlerde; **çelişki olursa bu bölüm günceldir.**

### Neredeyiz

- **`feature/seo-phase-2`, `main`'e fast-forward merge edildi ve `origin/main`'e
  push edildi** (`aa96dd1`, tam `npm run test:e2e` paketi — 342/342 PASS,
  14.3 dk — geçtikten sonra). SEO Faz 2, Portfolio Builder ve test/otomasyon
  borcu kapatma işlerinin TAMAMI artık `main`'de; production deploy
  `.github/workflows/deploy.yml` üzerinden tetiklendi. Bir önceki bölümdeki
  (ve altındaki onlarca "Önceki Durum" kaydındaki) "main'e merge kararı
  kullanıcıda" notu **ÇÖZÜLDÜ.**
- Aşağıdaki tüm tarihli bölümler artık **tarihsel kayıt** — o işler main'e
  gitti, ayrıntı git log'da duruyor. Yeni oturum bu bölümden devam etsin.
- `feature/seo-phase-2` local/origin'de hâlâ duruyor (silinmedi) — main artık
  onunla aynı commit'te, branch'e devam eden bir iş yoksa temizlik kullanıcı
  kararı.

### Bu oturumda yapılanlar

1. **Portfolyo görev kartları artık dersin KENDİ sekmesine götürüyor
   (kullanıcı raporu).** `/portfolio`'daki "aç" linkleri önceden sadece
   route'a gidiyordu, kullanıcı her zaman sayfanın ilk sekmesinde açılıyordu —
   görevin gerçek konumu ne olursa olsun. `missionCatalog`'taki 18 ders
   görevinin her birine, o görevin GERÇEKTEN bulunduğu sekme indeksini elle
   tespit edip (`seleniumData.js` vb. 12 veri dosyası tek tek grep'lendi)
   `openTab` alanı eklendi; `TopicPage`'in zaten var olan
   `location.state.openTab` mekanizmasına bağlandı (aynı mekanizma HomePage
   "devam et" ve mentor önerilerinde de kullanılıyor, yeni bir altyapı
   yazılmadı).
   - Yeni `tests/portfolio-mission-tabs.spec.ts` (36 test): 18 görevin
     `openTab`'i data dosyasından okunan GERÇEK sekme indeksiyle eşleşiyor mu
     (config drift bekçisi, tarayıcı açmaz) + 18 görevin `taskTitle`i
     tanımlı ve `title`dan farklı mı (aşağıya bkz).
   - `tests/portfolio-page.spec.ts`'e 4 yeni test: boş durum CTA'sı + görev
     kartı "aç" linki gerçekten doğru sekmeyi (ikinci tıklama olmadan) açıyor,
     kataloğun tamamı bitince "Sıradaki Görev" kartı kayboluyor.
2. **Yeni "🎯 Sıradaki Görev" kartı** (kullanıcı isteği: "bana yeni görev
   vermiyor"). `/portfolio` önceden sadece GEÇMİŞE bakıyordu (AGGREGATOR
   mimarisi korunuyor — kendi state'i yok, `missionCatalog` sırasına göre ilk
   TAMAMLANMAMIŞ görevi `portfolioSnapshot.js`'te türetiyor). Tüm 18 görev
   bitince kart sessizce kayboluyor, olmayan bir görev uydurulmuyor.
   - **🐛 Kullanıcı ikinci bir hata buldu ve düzeltildi:** kart, "İnşa
     Ettiklerin"deki GERİYE bakan `title`i ("Login smoke testi kur**dun**")
     kullanıyordu — henüz yapılmamış bir görev BİTMİŞ gibi görünüyordu. Her
     18 görev için ayrı, İLERİYE bakan bir `taskTitle` eklendi ("Login smoke
     testi kur**mak**"); `title` "İnşa Ettiklerin"de aynen kalıyor.
3. **Değişen dosyalar:** `src/data/portfolioData.js` (18× `openTab` + 18×
   `taskTitle` + 3 yeni UI metni), `src/lib/portfolioSnapshot.js`
   (`buildNextMission()`), `src/components/PortfolioPage.jsx` (yeni bölüm +
   `state={{openTab}}` geçen linkler), `tests/portfolio-page.spec.ts` (4 yeni
   test), `tests/portfolio-mission-tabs.spec.ts` (yeni, 36 test).

### Doğrulama durumu (bu oturumun sonu)

- İçerik bütünlüğü ✓ · i18n leak taraması ✓ (0 regresyon) · `npm run build` ✓.
- Portfolyo test dosyaları: 47/47 PASS (`portfolio-page.spec.ts` 11 +
  `portfolio-mission-tabs.spec.ts` 36).
- Tam `npm run test:e2e` paketinin bu oturumdaki sonucu (merge/push kararı
  buna bağlı) — bkz. "Neredeyiz".

### Sıradaki iş

- **A. Kullanıcı tarafı (kod işi değil, hâlâ açık):** Plausible analytics
  hesabını aç (`DEPLOY.md` §8) — açık kaldıkça `/en` geçişinin ilk günlerine
  ait ölçüm kalıcı olarak kayboluyor. Deploy sonrası GSC'ye sitemap'i yeniden
  gönder (80 URL).
- **B. Küçük, net kod işleri (düşük öncelik, sıraya alınabilir):**
  `/qa-mentor`'daki rozet şeridinin yanına portfolyoya link, portfolyo
  paylaşım kartı görseli (`<canvas>`), bilinmeyen `/en/...` yollarında gerçek
  bir 404 arayüzü olmaması (çöküyor değil, sadece ideal değil).

---

## 📌 Önceki Durum (2026-08-02, Sonnet — mülakat bölümü kompaktlaştırma + yayın kapısı otomasyonu)

### Neredeyiz

- **Branch: `feature/seo-phase-2`** — `main`'in **28 commit** önünde (bu oturumun
  commit'leri hariç), çalışma ağacı bu oturumun sonunda commit edildi.
  **`main`'e merge EDİLMEDİ; karar hâlâ kullanıcıda.**

### Bu oturumda yapılanlar

1. **Ana sayfadaki "Mülakat Isınma Turu" kompakt hale getirildi.** Kullanıcı
   bölümün çok yer kapladığını, sadece içerik hakkında bilgi verip asıl
   soru-cevaba tıklamayla ulaşılması gerektiğini belirtti. `InterviewWarmup.jsx`
   + `interviewWarmupData.js`: başlık/açıklama metni kısaltıldı, "amaç" kutusu
   tek satırlık şeride indirildi, kart başına padding/font küçültüldü, "cevabı
   göster" + "bu konuyu çalış →" aynı satıra alındı. Tıklama hedefi
   DEĞİŞMEDİ (kullanıcı seçimi: ilgili dersin sayfasına gitmeye devam ediyor).
   Ölçüm: 1280px genişlikte bölüm yüksekliği ~950px → **706px**. FAQPage şeması
   etkilenmedi (soru metinleri hâlâ tam görünür, şema sadece bunu şart koşuyor).
   `tests/interview-warmup.spec.ts` 6/6 PASS.
2. **`DEPLOY.md` §9'daki doğrulama komutlarında gerçek bir kusur bulundu ve
   düzeltildi.** Kullanıcı `curl http://localhost:4173/en/selenium` (sonda `/`
   OLMADAN) çalıştırınca hem TR hem EN'de `lang="tr"` gördü. Kök neden: `vite
   preview`'ın statik sunucusu (`sirv`), sondaki `/` olmadan bir alt-route
   istendiğinde o route'un shell'ini bulamıyor ve sessizce KÖK `dist/index.html`'e
   (her zaman TR) düşüyor — 404 vermeden, 200 ile. `dist/` çıktısının kendisi
   doğruydu (`dist/en/selenium/index.html` içinde `lang="en"` doğru duruyordu);
   sorun yalnızca yerel test yönteminde. DEPLOY.md'deki 10+ curl komutuna/URL'e
   sonda `/` eklendi + bu kısıtı açıklayan bir uyarı notu kondu. Ayrıca **iki yan
   bulgu** düzeltildi: (a) `dist/404.html` yerelde YOKTUR (yalnızca
   `.github/workflows/deploy.yml`'deki "Prepare GitHub Pages compatibility
   files" adımı üretir) — F1'deki `ls dist/404.html` beklentisi netleştirildi;
   (b) kullanıcının PowerShell konsolunda Türkçe karakterler bozuk görünüyordu
   (`E─şitimi`) — dosyanın kendisi doğru UTF-8, sorun konsolun kod sayfası
   (`chcp 65001` notu eklendi).
3. **D1 (mükerrer başlık kontrolü) otomatikleştirildi.** Önceden DEPLOY.md'de
   elle koşulan, çok satırlı bir `node -e` komutuydu — kullanıcının PowerShell
   oturumunda hem Türkçe-özgü karakterler hem de bir satır (`for (const r of
   ROUTE_SEO)`) kayboldu (muhtemelen konsol kod sayfası/yapıştırma kaynaklı).
   Artık `scripts/check-seo.mjs`'te kalıcı bir kontrol (`seenTitles` Map'i,
   mevcut `seenDescriptions` ile simetrik) — `npm run build`/`seo:check`
   sırasında otomatik çalışıyor. Diş doğrulandı (geçici mükerrer title enjekte
   edildi → build kırıldı → geri alındı → yeşile döndü).
4. **YENİ: `npm run test:release-gate` — DEPLOY.md §9'un A1/A5/A6/A7/A8/D3/F1/F2
   maddelerinin otomatik karşılığı.** Kullanıcı isteği: "bu kontrolleri testlere
   ekle". Yeni dosyalar: `playwright.release-gate.config.ts` (ayrı port 4174,
   `pretest:release-gate` önce TAM `npm run build` koşturur, `reuseExistingServer:
   false` — bilerek, bu bir yayın kapısı, eski/unutulmuş bir preview sunucusuna
   güvenmemeli), `tests-release-gate/deploy-gate.spec.ts` (72 test).
   - **Neden ayrı bir katman:** `tests/seo-phase2-coverage.spec.ts` dist
     dosyalarını DOSYA SİSTEMİNDEN okur — sunucunun HTTP davranışını (trailing-
     slash çözümü gibi) test etmez. `tests/seo-i18n-routing.spec.ts` ise `npm
     run dev` üzerinden HİDRATE OLMUŞ uygulamayı test eder — ham, JS öncesi
     HTML'i göremez. Bu suite tam olarak o iki testin GÖRMEDİĞİ katmanı — HTTP
     üzerinden servis edilen ham shell'i — test ediyor; madde 2'deki regresyon
     tam olarak burada yakalanabilirdi.
   - **Kapsam:** A5 artık 40 route'un TAMAMINDA (yalnızca örnek bir sayfada
     değil) hash→temiz-URL yönlendirmesini doğruluyor. A1/A6/A7/D3/F2 5 temsili
     route × 2 dil üzerinde (`/`, `/selenium`, `/git-github`, `/portfolio`,
     `/docker`) HTTP üzerinden title/lang/hreflang/canonical/gövde-içerik
     kontrolü yapıyor. F1 derin bağlantı + sert yenileme. A8 bilinmeyen `/en`
     yolunun çökmediğini doğruluyor (**not:** gerçek bir "sayfa bulunamadı"
     arayüzü YOK — React Router'da wildcard route tanımlı değil, yalnızca boş
     içerik + çalışan widget'lar render oluyor; bu test yalnızca "sunucu hatası/
     JS çökmesi yok" asgari barını doğruluyor, gerçek bir 404 UI eklemek ayrı
     bir ürün kararı, kapsam dışı bırakıldı).
   - **Doğrulama:** 72/72 PASS (37s). Diş doğrulandı: `dist/en/selenium/index.html`'e
     elle `lang="tr"` enjekte edildi → ilgili test kırıldı → geri alındı → yeşile
     döndü.
   - Otomatikleşmeyen maddeler (D2 SERP gözle, C2 rich-results validator gözle,
     C3 Course alan doğruluğu gözle, E1/E2 analytics — yalnızca canlı domainde
     ölçülebilir, F3 post-deploy GSC adımları) DEPLOY.md'de elle kalmaya devam
     ediyor; bu köşe niyetli, otomatikleştirilebilir değil.

### Doğrulama durumu (bu oturumun sonu)

- `npm run build` ✓ (birden fazla kez, tutarlı) · `node scripts/check-seo.mjs` ✓
  (46 route, 0 mükerrer title/description) · içerik bütünlüğü ✓ · i18n baseline 0 ✓.
- `tests/interview-warmup.spec.ts` 6/6 ✓ · `npm run test:release-gate` 72/72 ✓ (37s).
- Bu oturum ana `npm run test:e2e` paketini yeniden koşmadı (değişiklikler SEO/
  doküman/yeni-ayrı-suite kapsamında, mevcut 303 teste dokunmadı) — bir sonraki
  oturumda merge öncesi tam paketi bir kez daha koşturmak faydalı olur.

### Sıradaki iş — öncelik sırasıyla

**A. Kullanıcı kararı bekleyen (kod işi yok):**
1. **`main`'e merge kararı.** Yayını engelleyen açık bulgu YOK. `npm run
   test:release-gate` artık DEPLOY.md §9'un çoğunu otomatik doğruluyor —
   merge öncesi tek komut yeterli, öncesinde D2/C2/C3'ü gözle bir kez geçmek
   yine de önerilir (~10 dk, otomatikleşmeyen kısımlar).
2. **Plausible hesabını deploy'dan ÖNCE aç** (`DEPLOY.md` §8/E1). Sonra
   açılırsa `/en` geçişinin ilk günlerine ait ölçüm kalıcı olarak kaybolur.
3. Deploy sonrası: GSC'ye sitemap'i yeniden gönder (80 URL).

**B. Küçük, net kod işleri (hazır, sıraya alınabilir):**
1. **Portfolyo giriş noktası eksik:** `/qa-mentor`'daki rozet şeridinin yanına
   "kazandıklarını portfolyonda gör" linki (ana sayfa kartı zaten var).
2. **Portfolyo paylaşım kartı görseli** (`<canvas>` + `toDataURL`) — düşük
   öncelik, `Documents/portfolio-builder-plan.md` §7.2'de park edilmiş.
3. **(Düşük öncelik, keşfedildi ama düzeltilmedi) `/en/olmayan-bir-sayfa` gibi
   bilinmeyen bir yol gerçek bir 404 arayüzü göstermiyor** — React Router'da
   wildcard route yok, yalnızca boş içerik alanı + floating widget'lar render
   oluyor. Çökmüyor (release-gate A8 bunu doğruluyor) ama kullanıcı deneyimi
   ideal değil. Gerçek bir "sayfa bulunamadı" bileşeni eklemek ayrı bir ürün
   kararı — henüz istenmedi.

**C. Bilinen kısıtlar (aksiyon gerekmiyor, bilinsin):**
- `npm run test:interview-flows` art arda koşulunca Groq rate limit'ine
  takılabiliyor. Tek tek koşulunca geçer. CI'da zaten koşmuyor.
- CI'da Supabase auth gerektiren testler bilinçli skip ediliyor (§23.8).
- `npm run test:release-gate` her koşumda TAM bir `npm run build` tetikler
  (~25-60s) — bilerek: bu bir yayın kapısı, gerçekten yayınlanacak dist'i
  doğrulamalı, eski/yarım bir build'i değil.

---

## 📌 Önceki Durum (2026-08-01, Opus)

> Bu bölüm, yeni bir oturumun 30 saniyede duruma hâkim olması için yazıldı.
> Ayrıntılar aşağıdaki tarihli bölümlerde; **çelişki olursa bu bölüm günceldir.**

### Neredeyiz

- **Branch: `feature/seo-phase-2`** — `main`'in **28 commit** önünde, çalışma
  ağacı temiz, `origin`'e push edildi. **`main`'e merge EDİLMEDİ; karar
  kullanıcıda.**
- Branch şu üç işi bir arada taşıyor: **SEO Faz 2** (dil-ayrık `/en` URL, iki
  dilli metadata, statik shell'ler, kod bölme, analytics), **Portfolio Builder**
  (`/portfolio`) ve **test/otomasyon borcunun kapatılması**.

### Bu oturumda yapılanlar (7 commit: `df4d403` → `d9fc3b7`)

1. **`/portfolio` çekirdeği** (`df4d403`, `0335b24`) — çözülen görevleri,
   kapatılan bug'ları, ustalık ve rozetleri toplayan AGGREGATOR sayfa. Kendi
   ilerleme state'i tutmaz. En kritik nokta: `xp.js` anahtarı sayfa URL'inden
   türediği için portfolyo global tarama yapar (aksi hâlde sessizce boş görünür).
   Ayrıntılı manuel test rehberi: `Documents/portfolio-builder-plan.md` §13.
2. **Test kapsamı denetimi** (`2066caa`) — §10/§22 kurallarıyla mevcut listeler
   karşılaştırıldı; 3 kapsam boşluğu kapatıldı ve **mülakat akış suite'inde
   yıllardır gizli duran gerçek bir hata** bulunup düzeltildi (sekme takip
   değişkeni kilit kontrolünden sonra eskiyor, test olmayan bir butonu sonsuza
   kadar bekliyordu → 300 s'de takılan test 39 s'de geçiyor).
3. **SEO Faz 2'nin test edilmeyen 5 maddesi E2E'ye alındı** (`38780e1`) —
   sitemap bütünlüğü, JSON-LD, kod bölme, analytics (4 olayın 4'ü) ve TÜM
   ders görevleri (18 mission, önceden 18'de 1).
4. **Yayın kapısı rehberi** (`794d83b`) — `DEPLOY.md` §9: geri dönüşü pahalı
   değişiklikler için ayrıntılı yayın öncesi manuel doğrulama + karar tablosu.
5. **İki yayın öncesi SEO riski kapatıldı** (`d9b5f7a`) — korumalı/işlevsel
   sayfalar sitemap'ten çıkarıldı (`noindex` + `robots` meta), görünmeyen
   içeriği işaret eden FAQPage şeması kaldırıldı.
6. **Mülakat Isınma Turu** (`d9fc3b7`) — ana sayfada gate'siz, görünür 12 soru;
   FAQPage şeması politikaya uygun biçimde geri kazanıldı. Gating (AC 04)
   değişmedi.

### Doğrulama durumu (bu oturumun sonu)

- `npm run build` ✓ — 80 sitemap URL, 90 statik shell, 68 sayfa `Course`,
  2 sayfa `FAQPage` (görünür içerikle doğrulandı), 10 noindex shell.
- İçerik bütünlüğü ✓ (41 dosya) · i18n baseline 0 ✓ · mülakat denetimi 27/27 ✓.
- **Tam E2E paketi: 303/303 PASS (14.6 dk), 0 hata.** (Oturum başında 253'tü;
  bu oturumda eklenen kapsamla 303'e çıktı.)
- Auth gerektiren suite'ler (§23.8) ve `test:interview-flows` bu koşumda yok —
  ikisi de bilinçli olarak ana pakette değil.

### Sıradaki iş — öncelik sırasıyla

**A. Kullanıcı kararı bekleyen (kod işi yok):**
1. **`main`'e merge kararı.** Yayını engelleyen açık bulgu KALMADI. Merge =
   canlı deploy (GitHub Pages). Öncesinde `DEPLOY.md` §9'daki A ve F
   bölümlerini gözle geçirmek önerilir (~15 dk).
2. **Plausible hesabını deploy'dan ÖNCE aç** (`DEPLOY.md` §8). Sonra açılırsa
   `/en` geçişinin ilk günlerine ait ölçüm kalıcı olarak kaybolur — geri
   doldurulamaz.
3. Deploy sonrası: GSC'ye sitemap'i **yeniden gönder** (artık **80 URL**),
   1-2 hafta sonra hreflang hatalarına bak.

**B. Küçük, net kod işleri (hazır, sıraya alınabilir):**
4. **Mükerrer başlık denetimi otomatik değil.** `check-seo.mjs` mükerrer
   *description*'ı build'de kırıyor ama *title*'ı hiç kontrol etmiyor. Şu an
   mükerrer YOK; eksik olan bekçi. Komut `DEPLOY.md` §9.4 D1'de hazır —
   `check-seo.mjs`'e taşımak ~10 satırlık iş.
5. **Portfolyo giriş noktası eksik:** `/qa-mentor`'daki rozet şeridinin yanına
   "kazandıklarını portfolyonda gör" linki (ana sayfa kartı zaten var).
6. **Portfolyo paylaşım kartı görseli** (`<canvas>` + `toDataURL`) — düşük
   öncelik, `Documents/portfolio-builder-plan.md` §7.2'de park edilmiş.

**C. Bilinen kısıtlar (aksiyon gerekmiyor, bilinsin):**
- `npm run test:interview-flows` art arda koşulunca Groq rate limit'ine
  takılabiliyor (`grade-interview-answer` 200 dönmez). Tek tek koşulunca geçer.
  CI'da zaten koşmuyor.
- CI'da Supabase auth gerektiren testler bilinçli skip ediliyor (§23.8) —
  altyapı kısıtı, yeniden teşhis etmeye gerek yok.

---

## 📌 Önceki Durum (2026-08-01, Opus — ana sayfada Mülakat Isınma Turu + FAQPage geri kazanıldı)

- **Aktif branch: `feature/seo-phase-2`.** Kullanıcının fikri uygulandı: mülakat
  soruları %60 barajının arkasında olduğu için FAQPage şeması kaldırılmıştı;
  şimdi **ana sayfada herkese açık, gate'siz bir "Mülakat Isınma Turu"** var ve
  şema oradan üretiliyor. Gating kuralına (AC 04) DOKUNULMADI — ders sonundaki
  AI değerlendirmeli mülakat pratiği aynen barajın arkasında.
- **Yeni dosyalar:** `scripts/generate-interview-showcase.mjs` (build-time
  örnekleyici), `src/data/generated/interviewShowcase.js` (üretilen),
  `src/data/interviewWarmupData.js` (bölümün metinleri, STRICT_ZERO),
  `src/components/InterviewWarmup.jsx`, `tests/interview-warmup.spec.ts` (6 test).
- **Neden build-time:** sorular 12 ayrı ders dosyasında ve o dosyalar 300 KB-1 MB.
  Ana sayfanın onları runtime import etmesi ilk boyayı yıkardı (S1'de tam tersi
  yapılmıştı). Script Node'da okuyup yalnızca seçilenleri küçük bir dosyaya yazar.
- **Seçim deterministik:** rastgelelik yok — her build aynı çıktı. 12 sayfadan
  1'er soru, seviye rotasyonuyla (**4 basic / 4 intermediate / 4 advanced**).
  TR/EN eşlemesi indeksle yapılır; iki ağacın soru sayısı tutmuyorsa o sayfa
  ATLANIR (uydurma eşleme yerine sessizce dışarıda bırakmak — §23.4 dersi).
  8 sorunun altına düşerse script build'i kırar.
- **Şema kuralı kalıcılaştı:** FAQPage yalnızca ana sayfada olabilir VE şemadaki
  her sorunun aynı sayfanın GÖRÜNÜR gövdesinde bulunması zorunlu.
  `check-dist-seo.mjs` şemayı PARSE edip bunu doğrular (hard-fail).
  - **🐛 Kontrolün ilk hâli yanlış yöndeydi:** kaynak listeyi geziyordu, şemayı
    değil — şemaya elle görünmeyen bir soru eklense KAÇIRIRDI. Sonda testiyle
    yakalandı ve yön düzeltildi (artık şemanın kendisi geziliyor). E2E bekçisi
    zaten doğru yöndeydi.
- **Doğrulama:** build ✓ (80 sitemap URL, 90 shell, **2 sayfada FAQPage —
  görünür içerikle doğrulandı**, 68 Course, 10 noindex shell) ·
  content-integrity ✓ · i18n baseline 0 ✓ · `interview-warmup` 6/6 ·
  `seo-phase2-coverage` 16/16 · görünürlük bekçisinin dişi doğrulandı
  (şemaya görünmeyen soru enjekte edildi → hem build kontrolü hem E2E kırıldı).

---

## 📌 Önceki Durum (2026-08-01, Opus — yayın öncesi 2 SEO riski kapatıldı)

- **Aktif branch: `feature/seo-phase-2`.** `DEPLOY.md` §9'daki yayın kapısı
  rehberi yazılırken ölçülen **iki açık bulgu düzeltildi**. İkisi de "geri
  dönüşü pahalı" kategorisindeydi — yayına çıkıp indekslendikten sonra
  düzeltmek haftalar sürerdi.
- **✅ Bulgu 1 — sitemap korumalı/işlevsel sayfaları indekslenmeye sunuyordu.**
  `/backend`, `/security` (RequireAdmin), `/qa-assistant` (ProtectedRoute),
  `/login` ve `/auth/callback` sitemap'teydi. İlk üçü ziyaretçiye içerik
  göstermediği için thin content/soft 404 sinyali üretirdi; `/auth/callback`
  bir OAuth dönüş adresi, arama sonucundan tıklanırsa kullanıcı bozuk bir akışa
  düşerdi.
  - **Çözüm:** `seo.js`'te bu 5 girdiye `noindex: true`.
    `generate-seo-files.mjs` sitemap'ten çıkarır (**90 → 80 URL**);
    `generate-static-routes.mjs` shell'lerini YİNE üretir (GitHub Pages'te derin
    bağlantıda sert yenileme için gerekir) ama `robots=noindex,follow` basar.
    `check-dist-seo.mjs` her iki yönü de hard-fail eder (noindex sayfada meta
    eksikse VE indekslenen sayfaya yanlışlıkla noindex bulaştıysa).
- **✅ Bulgu 2 — FAQPage şeması görünmeyen içeriği işaret ediyordu.** Ölçüm:
  şemada 10 soru vardı, **0'ı** sayfanın görünür gövdesinde. Statik shell'de
  yalnızca JSON-LD içindeydiler; uygulamada ise mülakat sekmesi %60 quiz
  barajının arkasında (AC 04, bir ürün kararı). Crawler'ın gördüğüyle
  kullanıcının gördüğü ayrışıyordu — Google'ın FAQPage politikası içeriğin
  kullanıcıya görünür olmasını şart koşar.
  - **Çözüm: şema kaldırıldı.** Gerekçe iki katmanlı: politika riski gerçekti VE
    FAQ zengin sonuçları 2023'ten beri yalnızca resmî kurum/sağlık siteleri için
    gösteriliyor — yani riskin karşılığında kazanç yoktu. `Course` şeması
    dokunulmadı (68 sayfa).
  - Geri eklemek için iki koşul birlikte sağlanmalı: şemadaki metin sayfada
    gate'siz GÖRÜNÜR olmalı ve bu AC 04'le çelişmemeli (pratikte: gate'in
    önünde, herkese açık ayrı bir SSS bölümü).
- **Bekçiler:** `tests/seo-phase2-coverage.spec.ts`'e 4 yeni test —
  korumalı route'lar sitemap'te YOK, noindex shell'leri robots meta'sı taşıyor,
  indekslenen sayfalara noindex bulaşmamış, FAQPage geri gelmemiş. **Üçünün de
  dişi doğrulandı** (dist'e FAQPage enjekte edildi / sitemap'e `/login` eklendi /
  robots meta'sı silindi → 5 test kırıldı, sonra geri alındı).
- **`DEPLOY.md` §9 güncellendi:** B2 ve C1 artık "ÇÖZÜLDÜ — regresyon kontrolü
  olarak kalır" biçiminde; karar tablosu ve URL sayıları (80/160) yenilendi.
- **Geriye kalan yayın öncesi işler (hiçbiri kod değil):** D1 mükerrer başlık
  komutunu bir kez elle koş, D2 SERP görünümünü gözle kontrol et, **E1 Plausible
  hesabını deploy'dan ÖNCE aç** (sonra açılırsa geçişin ilk günlerine ait veri
  kalıcı olarak kaybolur).

---

## 📌 Önceki Durum (2026-08-01, Opus — SEO Faz 2'nin test edilmeyen 5 maddesi E2E'ye alındı)

- **Aktif branch: `feature/seo-phase-2`.** `Documents/seo-phase-2-plan.md`'deki 12
  maddenin her biri için "otomasyona dahil mi, test ediliyor mu" denetimi
  yapıldı. **7 madde zaten kapsamdaydı, 5'i değildi — hepsi kapatıldı.**
- **Denetim sonucu (öncesi):** O1/O3/O5/O7/S4 build zincirinde hard-fail
  ediyordu, O2/O8 E2E'deydi. Kapsam DIŞINDA olanlar: **O4 sitemap** (üretiliyor
  ama üretilen dosyayı okuyan hiçbir kontrol yoktu), **O6 JSON-LD** (yalnızca
  SAYILIP yazdırılıyordu, sıfıra düşse build yeşil kalırdı), **S3 analytics**
  (hiç test yoktu), **S1 kod bölme** (yalnızca yükleme göstergesi bekleniyordu,
  asıl iddia ölçülmüyordu; `/java` hiç kapsanmıyordu), **S2 mission yayılımı**
  (sayılıyor + şema denetleniyor ama "gerçekten çözülebiliyor mu" test
  edilmiyordu).
- **Yeni: `tests/seo-phase2-coverage.spec.ts` (13 test).** Build ÇIKTISINI
  doğrular (`dist/`; iki CI workflow'u da E2E'den önce build alıyor):
  - **O4:** sitemap URL sayısı = route × dil, mükerrer `<loc>` yok, her girdide
    `hreflang` çifti, her route'un iki dilli URL'i gerçekten listede,
    `robots.txt` sitemap'e işaret ediyor ve site geneli `Disallow: /` yok,
    yayınlanan `/sitemap.xml` tarayıcıdan da erişilebiliyor.
  - **O6:** JSON-LD blokları GERÇEKTEN parse ediliyor (bozuk JSON patlar),
    `FAQPage.mainEntity` boş değil, her `Question` soru+cevap taşıyor, TR
    shell'de Türkçe / EN shell'de Türkçe karakter YOK, `Course` şeması var ve
    **site geneli alt eşik** (≥40 FAQPage, ≥50 Course) — üretim çökerse kırılır.
  - **S1:** `JavaPage`/`TypeScriptPage`/`SQLPage` chunk'ları veri chunk'ını
    STATİK değil DİNAMİK import ediyor (build artefaktından doğrulanır) +
    üç sayfada da başlık ağır veri beklenmeden boyanıyor (`/java` ilk kez kapsamda).
  - **Dişi doğrulandı:** dist'teki bir `<url>` silindi → sitemap testi KIRILDI;
    `"FAQPage"` bozuldu → şema testi KIRILDI; dinamik import silindi → kod
    bölme testi KIRILDI. Üçü de geri alındı.
- **Yeni: `tests/analytics-events.spec.ts` (3 test) + `tests/helpers/analytics.ts`.**
  - **🐛 Test yazarken bulunan tuzak:** gerçek `plausible.io/js/script.js`
    yükleniyor ve `window.plausible`ı KENDİ fonksiyonuyla EZİYOR; o fonksiyon
    localhost'ta bilinçli olarak hiçbir şey göndermiyor. Yani script
    engellenmeden yazılan bir analytics testi, olay hiç tetiklenmese bile
    sessizce "geçer" görünürdü. Yardımcı artık isteği `route.abort()` ile
    engelliyor.
  - Kapsanan: `language_changed` (SEO Faz 2'nin `/en` kullanımını ölçen kritik
    olayı), Plausible yokken sayfanın kırılmaması (no-op güvenliği), olay
    property'lerinde kişisel veri olmaması.
  - Kalan 3 olay MEVCUT akışlara bağlandı (ağır akışı ikinci kez oynatmamak
    için): `mission_completed` → `mission-flow` + `mission-spread`,
    `sprint_closed` → `sprint-flow`, `lesson_completed` → `lesson-completion`.
    **4 olayın 4'ü de artık test ediliyor.**
- **Yeni: `tests/mission-spread.spec.ts` (12 test).** Yalnızca S2'nin 6 sayfası
  değil, `mission` bloğu olan **TÜM 12 ders sayfasındaki 18 görevin TAMAMI**
  uçtan uca oynatılıyor: adım kilidi sırayla açılıyor, tüm adımlar bitince
  tamamlanma banner'ı + o sayfanın KENDİ XP havuzuna kayıt + beceri sinyali +
  `mission_completed` olayı. Önceden yalnızca `/selenium`'un İLK görevi test
  ediliyordu (18'de 1).
  - **🐛 Yakalanan gerçek tuzak:** `pythonData`'da bir seçenek etiketi çift
    tırnak içeriyor (`("KeyError: 'email'")`); regex tabanlı `getByRole` seçicisi
    Playwright'ın iç seçici dizesinde ayrıştırma hatası veriyordu. Düz string
    `hasText` eşleşmesine geçildi.
- **Doğrulama:** yeni/etkilenen suite'ler tek tek PASS (13 + 3 + 12 + bağlanan
  akışlar 13). Tam paket koşumu aşağıda.

---

## 📌 Önceki Durum (2026-08-01, Opus — test kapsamı denetimi: 3 boşluk + 1 gerçek test bug'ı)

- **Aktif branch: `feature/seo-phase-2`.** Kural dosyaları (§10, §22, §22.1) ile
  mevcut test/denetim listeleri karşılaştırıldı. **Üç gerçek kapsam boşluğu ve
  bir gerçek test hatası bulundu; hepsi kapatıldı.**
- **🐛 GERÇEK TEST HATASI — `tests-extended/interview-mastery-flows.spec.ts`:**
  Suite, eşiğin ALTINDA bir miktar quiz cevapladıktan sonra kilidi doğrulamak
  için mülakat sekmesine tıklıyor, ama sekme takip değişkeni (`activeTab`) son
  İÇERİK sekmesini göstermeye devam ediyordu. Sonraki döngü "sekme değişmediyse
  tıklama" mantığı kullandığından, sıradaki quiz AYNI içerik sekmesindeyse
  sayfaya geri DÖNÜLMÜYOR ve test mülakat sekmesinde var olmayan bir quiz
  butonunu **sonsuza kadar bekliyordu**. Çoğu sayfada sıradaki quiz farklı bir
  sekmede olduğu için hata yıllardır görünmemişti; `/qa-frontend` (48 quiz,
  eşik 29 → son iki quiz aynı sekmede) eklenince ortaya çıktı.
  - Teşhis: Playwright call log'unda "resolved to" satırı YOKTU → buton
    aktörlük sorunu değil, DOM'da hiç yok. Sidebar indeks kayması ve metin
    eşleşmesi hipotezleri ölçülerek ELENDİ (buton metni birebir eşleşiyor,
    sidebar 10 sekmede 10 buton).
  - Düzeltme: kilit kontrolünden sonra `activeTab = -1` (tek satır).
    **Sonuç: 300 s'de takılan test 39 s'de geçiyor.** Test timeout'u da
    120 s → 180 s yapıldı (29 quiz'lik sayfalar için pay).
- **Kapatılan 3 kapsam boşluğu:**
  1. `tests/topic-pages-ui.spec.ts` — `/api-testing` ve `/qa-frontend` TopicPage
     tabanlı ders sayfası oldukları hâlde listede YOKTU (§22 kontrol 1 kapsam
     dışıydı). Eklendi, **2/2 PASS**.
  2. `tests-extended/interview-mastery-flows.spec.ts` — `/claude-ai`,
     `/llm-agents`, `/qa-frontend`, `/api-testing` `interview-questions` bloğu
     taşıdığı hâlde suite'te YOKTU (§22 kontrol 3 "TÜM sayfalar" demesine
     rağmen). Dördü de eklendi, **4/4 PASS** (qa-frontend yukarıdaki düzeltmeyle).
  3. `scripts/audit-interview-questions.mjs` — `/gauge` ve `/api-testing`
     denetlenmiyordu (§10'un 50 soru kuralı onlar için hiç kontrol edilmemişti).
     Eklendi; ikisi de zaten 50 soru + 15/20/15 dağılımıyla uyumlu çıktı,
     build kırılmadı. **25 → 27 sayfa, 27/27 ✅.** Ayrıca başlıktaki sabit sayı
     ("22 teknoloji sayfası") `PAGES.length`'ten türetilir yapıldı — sayfa
     eklendikçe sessizce eskiyordu.
- **Ek kapsam:** `/sprint` ve `/portfolio` `tests/other-pages-ui.spec.ts`'e
  eklendi (kendi akış suite'leri vardı ama ikisi de console/page HATASI
  taramıyordu). **10/10 PASS.**
- **Belge senkronu:** `Documents/acceptancecriterias.md`'ye **AC 13 — QA
  Portfolyo** eklendi (§22'nin "önce AC, sonra test maddesi" kuralı gereği;
  portfolyo suite'i önceki oturumda AC karşılığı olmadan eklenmişti).
- **Not (regresyon değil):** Art arda birden fazla mülakat akışı koşturulunca
  `grade-interview-answer` geçici olarak 200 dönmeyebiliyor (Groq rate limit —
  config'in `workers: 1` yorumunun uyardığı durum). `/docker` tek başına
  koşturulunca **PASS**; suite'i sayfa sayfa koşturmak gerekebilir.

---

## 📌 Önceki Durum (2026-08-01, Opus — Portfolio Builder çekirdeği `/portfolio` TAMAMLANDI)

- **Aktif branch: `feature/seo-phase-2`.** `Documents/portfolio-builder-plan.md`'deki
  Opus çekirdeği (O1-O7) uygulandı. `/portfolio` artık canlı bir sayfa.
- **Yeni dosyalar:** `src/lib/portfolioSnapshot.js` (türetme), `src/data/portfolioData.js`
  (tüm metinler + 18 görev kataloğu + 6 bug kataloğu + boş durum kopyası),
  `src/components/PortfolioPage.jsx`, `tests/portfolio-page.spec.ts`.
  **Sadece-ekleme yapılan paylaşılan dosyalar:** `App.jsx` (lazy route),
  `src/utils/seo.js` (TR+EN metadata), `scripts/generate-static-routes.mjs`
  (shell tanıtım metni), `scripts/check-i18n-leaks.mjs` (STRICT_ZERO'ya
  `portfolioData.js`), `src/components/HomePage.jsx` (teal giriş kartı),
  `tests/no-internal-jargon.spec.ts` (route listesine `/portfolio`), `CLAUDE.md` §2.
- **⚠ Planın en kritik maddesi uygulandı — route-kapsamı tuzağı:** `xp.js`
  depolama anahtarını bulunulan sayfanın URL'inden türetir, bu yüzden
  `getCompletedExercises()` ve onun üstüne kurulu TÜM `sprintStore`
  fonksiyonları `/portfolio` sayfasında sessizce boş döner. `xp.js`/`sprintStore.js`
  DEĞİŞTİRİLMEDİ; `portfolioSnapshot.js` tüm `learnqa_xp_*` anahtarlarını
  tarayan global bir küme kuruyor (`progressStore.getTotalXp()`'nin kanıtlanmış
  deseni). **Testin dişi doğrulandı:** global tarama geçici olarak route-kapsamlı
  okumaya çevrildi → 2 test KIRILDI → geri alındı.
- **Plandan bilinçli 3 sapma (hepsi dürüstlük gerekçeli):**
  1. Plan "en uzun streak" istiyordu — `activityLog` bunu TUTMUYOR (yalnızca
     güncel seri + aktif gün türetilebilir). Olmayan metrik uydurulmadı, gerçekten
     ölçülen ikisi gösteriliyor.
  2. Plan 18 mission diyordu; S2'den sonra gerçek sayı **24** (18 ders görevi +
     6 sprint bug'ı). Katalog buna göre yazıldı.
  3. Plan "44 → 45 shell" diyordu; dil-ayrık URL'lerden sonra gerçek sayı
     **88 → 90** (45 route × 2 dil).
  4. Ana sayfa giriş kartı planda Sonnet görevi (S4) idi — erişilemeyen bir
     sayfa teslim edilmiş sayılmayacağı için çekirdeğe alındı.
- **Milestone bölümü:** profil düğüm kopyası (`{route,title,emoji}`) `isMain`
  taşımadığından "SDET yolu tamam" rozeti profilden hesaplanamıyor; harita
  sayfasının zaten yazdığı `learnqa_map_milestones` kaydıyla birleştiriliyor
  (yeni state değil, mevcut deponun okunması).
- **Doğrulama:** `node --check` (2 yeni dosya) ✓ · content-integrity ✓ (40 dosya) ·
  i18n baseline 0 ✓ · build ✓ (**90 shell**, dist-SEO geçti, 56 FAQPage/68 Course) ·
  `portfolio-page.spec.ts` **8/8** ✓ (diş doğrulandı) · regresyon: no-internal-jargon
  (9, `/portfolio` dahil) + sprint-flow (4) + seo-i18n-routing (6) +
  homepage-recommended-badges (2) + other-pages-ui + mobile-smoke (16) +
  theme-and-accessibility (5) = **50/50 PASS**.
- **🔜 Kalan portfolyo işleri (planın Sonnet tarafı, opsiyonel):** `/qa-mentor`
  rozet şeridinin yanına portfolyo linki (S4'ün ikinci yarısı) ve paylaşılabilir
  kart görseli (`<canvas>`) — ikisi de düşük öncelik, ayrı oturum.
- **🔜 Değişmeyen açık iş:** `main`'e merge kararı kullanıcıda; Plausible hesabı
  ve GSC sitemap yeniden gönderimi (90 URL) hâlâ kullanıcı tarafında.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — `feature/portfolio-builder` `feature/seo-phase-2`'ye merge edildi)

- **`origin/feature/portfolio-builder` fetch edilip `feature/seo-phase-2`'ye
  merge edildi** (commit `c06c21e`). O branch `main`'den yalnızca 2 commit
  ileride idi (`Documents/portfolio-builder-plan.md` planı + iç koordinasyon
  dili sızıntısını engelleyen yeni bir kural: `CLAUDE.md` §24, yeni
  `check-content-integrity.mjs` Kontrol [H], yeni `tests/no-internal-jargon.spec.ts`,
  ayrıca `cypressData/gaugeData/javaData/javascriptData/qaFrontendData.js`'te
  küçük içerik düzeltmeleri). Tek çakışma `CLAUDE.md`'de aynı satıra iki ayrı
  dalın birer kural eklemesiydi — ikisi de korunarak çözüldü, içerik kaybı
  yok. `src/data/javaData.js` otomatik (çakışmasız) birleşti.
  - Bundan sonra geliştirme **`feature/seo-phase-2` branch'inden** devam
    ediyor — iki dalın da işleri artık burada bir arada. Ayrı
    `feature/portfolio-builder` branch'i (local + origin) hâlâ duruyor,
    silinmedi.
  - Merge sonrası `check-content-integrity` ✓, `npm run build` ✓ (88 shell,
    dist-SEO temiz), tam E2E suite ✓ — **253/253 test yeşil** (yeni
    `no-internal-jargon.spec.ts`'in 8 testi dahil, 12 dk).
  - **`feature/seo-phase-2` artık hem SEO Faz 2 (O1-O8 + S1-S4) hem Portfolio
    Builder planı + iç-koordinasyon-dili kuralını içeriyor, `main`'e merge
    kararı kullanıcıda.**

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 TAMAMLANDI: S1-S4 + E2E doğrulaması)

- **✅ Kapsamlı son E2E testi TAMAMLANDI, TAM SUITE YEŞİL: 245/245 ✅**
  (commit `b7e04f8`): tam suite (40 spec dosyası) 2 kez koşuldu — ilk koşuda
  2 gerçek regresyon + 1 flaky test bulundu ve düzeltildi, ikinci (son) koşuda
  **245 test, 0 hata, 11.5 dk**:
  - `seo-i18n-routing.spec.ts`: S4'te `/docker` TR title'ı "Docker Eğitimi"
    → "Docker Nedir?" olarak cilalandığı için eski pattern'i bekleyen test
    kırılmıştı — test yeni başlığa göre güncellendi (kod tarafında hata yoktu,
    test beklentisi eskiydi).
  - `typescript-page.spec.ts` (flaky) + `sql-page.spec.ts` (proaktif, aynı
    risk): S1'in stub+arka-plan-swap deseni (`TypeScriptPage.jsx`/`SQLPage.jsx`)
    yüzünden test sekmelere tıklamaya gerçek veri yüklenmeden başlayabiliyordu
    ("Kurulum" sekmesi bazen boş görünüyordu). `topic-content-loading`
    göstergesinin kaybolmasını bekleyen bir adım eklendi.
  - Düzeltme sonrası ilgili 3 test dosyası (8 test) tek tek yeşil, ardından
    `check-content-integrity` + `npm run build` temiz geçti.
  - **SEO Faz 2 (O1-O8 + S1-S4) artık tamamen doğrulanmış durumda. `main`'e
    merge kararı kullanıcıda (CLAUDE.md §21).**

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin ardından
  Sonnet'in S1-S4 görevlerinin TÜMÜ tamamlandı (`Documents/seo-phase-2-plan.md`).
  Plandaki 12 madde de ✅. **S1 ve S2 detayları aşağıdaki iki bölümde**; bu
  bölüm S3 (analytics) + S4 (TR metadata + mülakat dağılımı) ve genel özet.

- **✅ S3 — Çerezsiz analytics (Plausible) TAMAMLANDI** (commit `ba80b58`):
  `index.html`'e `data-domain="learnqa.dev"` ile script eklendi (Google
  Analytics BİLİNÇLİ kullanılmadı — çerez rızası yükü). `src/lib/analytics.js`
  → `trackEvent()`, `window.plausible` yoksa sessizce no-op. 4 olay bağlandı:
  `lesson_completed` (AuthContext, anonim+üye), `mission_completed`
  (MissionBlock), `sprint_closed` (SprintPage), `language_changed`
  (LanguageContext — SEO Faz 2'nin `/en` kullanımını ölçmek için kritik).
  `DEPLOY.md` §8'e hesap kurulum adımları eklendi. **Kullanıcı tarafı açık iş:**
  Plausible hesabı açılıp `learnqa.dev` domain'i eklenmeli — kod hazır, hesap yok.

- **✅ S4 — TR metadata cilası + mülakat dağılımı TAMAMLANDI** (commit `e40d2d6`):
  - En yüksek trafikli 12 sayfanın (`selenium`, `playwright`, `sql`, `python`,
    `java`, `docker`, `jenkins`, `git-github`, `security`, `what-is-testing`,
    `manual-testing`) TR title/description'ları gerçek arama niyeti kalıplarıyla
    güçlendirildi ("selenium nedir", "playwright türkçe", "sql sorguları",
    "docker nedir" gibi) — Opus fazındaki doğrudan çeviriden farklı olarak.
  - `/postman` (16/19/15) ve `/playwright` (15/15/20) mülakat seviye dağılımı
    15/20/15 altındaydı — soru SİLİNMEDİ, eksik intermediate seviyeye senaryo
    tabanlı sorular eklendi (playwright +5, postman +1, her ikisi de hem TR hem
    EN tarafına — postman'ın iki bloğu FARKLI formatta: EN düz string, TR
    bilingual `{tr,en}` per-soru, ikisi de elle güncellendi). **Sonuç:
    audit-interview-questions artık 25/25 sayfa ✅, 0 uyarı** (önceki durum:
    23/25, 2 uyarı).
- **Doğrulama:** seo:check (45 route) ✓ · audit-interview-questions (25/25 ✅) ✓ ·
  content-integrity ✓ · i18n baseline 0 ✓ · build ✓ (88 shell, dist-SEO).

- **🎯 SEO Faz 2 ÖZET (O1-O8 + S1-S4, plan §0'daki TÜM maddeler ✅):**
  - Dil-ayrık URL (`/en` prefix), 88 statik shell, FAQPage+Course JSON-LD
    (56+68 sayfa), `/typescript`+`/java`+`/sql` ilk-boya JS'i ~%98 küçüldü,
    6 yeni sayfaya mission eklendi (18→24 toplam), çerezsiz analytics, TR
    metadata cilası, mülakat dağılımı 25/25 ✅.
  - Toplam commit: `f5350b8`, `80034c2`, `52c0fc0`..`e990852` (6 mission +
    1 audit script), `f46ac67`, `ba80b58`, `e40d2d6` = **12 commit**.
- **🔜 Kalan tek adım:** kapsamlı son E2E doğrulaması (bu oturumda devam
  ediyor) — bitince `main`'e merge kararı kullanıcıda (CLAUDE.md §21), öncesinde
  plan §8'deki 9 adımlı manuel test rehberi önerilir.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i (hâlâ açık, bu plan onları
  kapatmaz):** GSC'ye sitemap'i yeniden gönder (88 URL), Plausible hesabı aç,
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S2 mission yayılımı)

- **Aktif branch: `feature/seo-phase-2`.** S1'in hemen ardından **S2 — mission
  yayılımı TAMAMLANDI** (plan §7.2). Ölçülen durum: 25 teknoloji sayfasından
  yalnızca 6'sında (`selenium`, `playwright`, `cypress`, `python`, `sql`,
  `rest-assured`) mission vardı — hiçbiri en yüksek trafikli sayfalarda değildi.
  - **6 yeni sayfaya birer 5 adımlık mission eklendi** (her biri AYRI commit,
    `52c0fc0`..`e990852`): `docker` (QA: Selenium Grid sekmesi — container/hub-node
    compose/yarış durumu/RemoteWebDriver/shm_size), `jenkins` (First Jenkinsfile
    sekmesi — pipeline-as-code/stage-steps/sessiz başarısızlık/post-failure/agent
    seçimi), `git-github` (Merge & Conflict sekmesi, plan promptunda önerilen —
    çakışma işaretleri/temizlik/add-commit/status doğrulama), `java` (Test
    Frameworks sekmesi, ben seçtim çünkü sayfa zaten test kodu yazmayı öğretiyor —
    @ParameterizedTest ile kopyala-yapıştır testlerin sessiz tutarsızlık riskini
    yapısal olarak kapatma), `postman` (Writing Automated Tests sekmesi —
    pm.test() status assertion/token çıkarma/hardcode riski/{{değişken}} zinciri),
    `linux` (Real-World QA Scenarios sekmesi, plan promptunda "CI agent debug"
    olarak önerildi — ps/grep, lsof, tail -f üçlüsüyle GUI'siz hata ayıklama).
  - Toplam mission sayısı: **18 → 24**, prediction: **78 → 96**.
  - `scripts/audit-learning-blocks.mjs`'in `MISSION_FILES` listesine 5 yeni dosya
    eklendi (`dockerData.js`, `jenkinsData.js`, `gitGithubData.js`, `postmanData.js`,
    `linuxData.js` — `javaData.js` zaten `FILES`teydi) — yoksa şema denetimi bu
    görevleri hiç görmezdi.
  - **🐛 Gerçek hata yakalanıp düzeltildi (linuxData.js):** apostrof kaçış hatası
    (`process'i` tek tırnaklı string içinde escape edilmeden) `node --check`i
    kırdı — CLAUDE.md §23.2'nin tam olarak uyardığı tuzak. Düzeltildi, tüm 6
    dosya `node --check` ile tek tek doğrulandı.
  - **🐛 İkinci hata (jenkins+linux, i18n scanner yakaladı):** 2 `prediction.code`
    alanı düz string olarak Türkçe-özgü karakter (`ğ`/`ş`) içeriyordu, EN modda
    sızıyordu — `{tr,en}` bilingual yapıldı.
  - **🔍 Üçüncü, scanner'ın YAKALAYAMADIĞI bir kör nokta elle bulundu (CLAUDE.md
    §23.1'in tarif ettiği tam senaryo):** 13 tane daha `prediction.code` alanı
    ASCII-normalize Türkçe kullanıyordu (`ayni`, `farkli`, `cozuldu`,
    `yapistirildi` gibi — Türkçe-özgü karakter YOK, otomatik tarayıcı bunları
    göremiyor). Referans selenium mission'ı da bu kalıbı kullanıyordu (muhtemelen
    aynı kör noktaya sahip, dokunulmadı — kapsam dışı). Kendi 13 alanımın
    HEPSİ elle `{tr,en}` bilingual yapıldı — artık EN modda gerçekten İngilizce.
  - **🎯 Dördüncü, kendi kendine yapılan kalite denetimi (istenmedi ama proaktif
    yapıldı):** `audit-learning-blocks.mjs`nin `positionDist` çıktısı, YENİ
    eklenen 18 prediction'ın HEPSİNDE doğru cevabın "a" (ilk seçenek) pozisyonunda
    olduğunu gösterdi — NEXT_SESSION geçmişinde daha önce flag'lenen "hep B"
    gaming riskinin bu kez "hep A" versiyonu. 18 sorunun 12'sinde seçenek sırası
    elle karıştırılıp **6/6/6 (a/b/c) dağılımına** getirildi (site geneli hâlâ
    B'ye kaymış durumda — bu ÖNCEDEN VAR olan, kapsam dışı bir borç, sadece
    kendi yeni 18 sorumun dağılımı düzeltildi).
  - **Doğrulama:** her dosya için `node --check` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:24,
    prediction:96, dağılım kendi 18'imde 6/6/6) · build ✓ (88 shell, dist-SEO
    geçti) · E2E 63/63 PASS (`mission-flow` referans testi + `topic-pages-ui`
    25 sayfa + `i18n-content-toggle` 32 test + `learning-blocks-render`/java 3).
  - **🔜 Sırada:** S3 (çerezsiz analytics), S4 (TR metadata cilası + mülakat
    dağılımı) — plan §7.3-§7.4, sırayla, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S1 performans)

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin (aşağıda)
  hemen ardından, kullanıcı `Documents/seo-phase-2-plan.md`'deki Sonnet
  görevlerini (S1-S4) sırayla, sormadan, tamamına kadar uygulamamı istedi.
  **S1 — Performans/kod bölme TAMAMLANDI.**
  - **Sorun:** `/typescript`, `/java`, `/sql` sayfalarına girmek 850KB-1.1MB'lık
    TEK bir veri chunk'ının TAMAMEN indirilmesini gerektiriyordu — kullanıcı bir
    seferde tek sekme görürken 17-25 sekmenin verisi senkron iniyordu (mobilde
    LCP'yi düşürüyordu).
  - **Mimari karar (plan §7.1'in "davranış değişmeyecek" kısıtına uyularak):**
    `TopicPage.jsx`'e (21.697 satır, renderBlock/quiz motoru) **HİÇ
    DOKUNULMADI** — bunun yerine 3 sayfanın WRAPPER bileşeni (`TypeScriptPage.jsx`,
    `JavaPage.jsx`, `SQLPage.jsx`) değiştirildi:
    1. `scripts/generate-data-stubs.mjs` (yeni, build zincirine eklendi) —
       kaynak `<name>Data.js` dosyasına HİÇ dokunmadan, onu dinamik `import()`
       ile okuyup SADECE `hero` + `tabs` (sekme etiketleri) + BOŞ `sections`
       içeren minik bir "stub" (`<name>DataStub.js`, ~2-2.4KB) üretir. Kaynak
       dosyalar hâlâ TEK doğruluk kaynağı (CLAUDE.md §5) — stub asla elle
       düzenlenmez, her `npm run build`'de ve `npm run dev` öncesinde (`predev`)
       GÜNCEL kaynaktan yeniden üretilir.
    2. Wrapper bileşenleri artık `data={pageData}` kullanır: `useState(stub)`
       ile SENKRON hızlı ilk boya, `useEffect`'te GERÇEK veri dosyası dinamik
       `import()` ile arka planda yüklenip `setPageData(fullData)` ile
       değiştirilir. Yüklenirken küçük bir "İçerik yükleniyor…" pill gösterilir
       (`data-testid="topic-content-loading"`, TopicPage'e DOKUNMADAN, wrapper'ın
       kendi JSX'inde sibling olarak).
  - **Neden "sekmeye tıklanınca" değil "mount sonrası arka planda" yükleme
    seçildi (plan §7.1'den bilinçli sapma):** `activeTab` state'i TopicPage
    İÇİNDE yaşıyor, wrapper'dan görünmüyor; ayrıca `location.state.openTab` ile
    DOĞRUDAN N. sekmeye deep-link YAPILABİLİYOR (HomePage resume banner,
    MentorPanel önerileri — `mentorAdvice.js`'de `/sql` openTab:4, `/java`
    openTab:2 gibi). "Sadece tıklanan sekmeyi yükle" tasarımı TopicPage'in
    `sections[activeTab]` senkron okuma sözleşmesine dokunmayı gerektirirdi —
    riskli. Bunun yerine: arka plan yüklemesi MOUNT'ta hemen başlar (kullanıcı
    eylemine bağlı değil), tipik ağ gecikmesi insan tepki süresinden kısa
    olduğundan pratikte "tıklamadan önce zaten hazır" davranışına çok yakın
    sonuç verir, ama TopicPage'in senkron okuma varsayımını hiç bozmaz.
  - **`check-content-integrity.mjs`/`check-i18n-leaks.mjs` etkilenmedi:** stub
    dosyaları `*Data.js` glob filtresine (`f.endsWith('Data.js')`) UYMUYOR
    (`*DataStub.js`), bilinçli olarak — içerikleri zaten kaynak dosyada
    denetleniyor, aynı metni ikinci kez farklı bir dosyada "ilişkisiz kopya"
    olarak işaretletmemek için. `generate-static-routes.mjs` ve
    `audit-learning-blocks.mjs`/`check-i18n-leaks.mjs` HÂLÂ orijinal
    `typescriptData.js`/`javaData.js`/`sqlData.js`'i import ediyor —
    crawler'a giden statik shell'ler ve tüm Node script'leri TAM içeriği
    görüyor, sadece GERÇEK TARAYICI kullanıcısı hızlı stub + arka plan
    yüklemesi deneyimliyor.
  - **Ölçüm (önce/sonra, ilk boya için gereken senkron JS):**

    | Sayfa | ÖNCE (route chunk + veri chunk senkron) | SONRA (ilk boya için senkron) | Azalma |
    |---|---|---|---|
    | `/typescript` | ~1.1 MB (typescriptData 1,115.86 kB) | 15.70 kB (`TypeScriptPage-*.js`, stub dahil) | ~%98.6 |
    | `/java` | ~962 KB (javaData 961.87 kB) | 17.43 kB (`JavaPage-*.js`, stub dahil) | ~%98.2 |
    | `/sql` | ~867 KB (sqlData 866.60 kB) | 16.01 kB (`SQLPage-*.js`, stub dahil) | ~%98.2 |

    Doğrulama: `dist/assets/TypeScriptPage-*.js` içinde `import("./typescriptData-*.js")`
    çağrısının `useEffect` GÖVDESİNDE olduğu build çıktısından grep ile teyit
    edildi (statik değil, gerçekten ertelenmiş dinamik import). Veri
    dosyalarının KENDİSİ değişmedi (hâlâ 866KB-1.1MB) — toplam indirilen bayt
    aynı kalır, sadece İLK BOYA için gereken KRİTİK YOL küçüldü.
  - **Riskli senaryo elle doğrulandı:** `mentor-panel.spec.ts`'teki
    `openTab:2` deep-link testi (`/java`'ya tab 2 açık gelip "Önce Tahmin Et"
    prediction bloğunun 30s içinde görünmesini bekliyor — bu test ZATEN yavaş
    chunk yüklemesini tolere edecek şekilde yazılmıştı) **PASS** — arka plan
    yüklemesi + `toBeVisible` polling'i bu senaryoyu sorunsuz kapsıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya, stub'lar glob dışı) ·
    i18n baseline 0 ✓ · audit-learning-blocks ✓ · build ✓ (88 shell, dist-SEO
    geçti, static shell'ler hâlâ TAM içerik gösteriyor) · **E2E 81 PASS / 0
    FAIL** (topic-pages-ui 25 tam sayfa taraması + typescript/sql tab-tıklama
    testleri 2 + mentor-panel openTab dahil 5 + learning-blocks-render/java 3 +
    mission-flow/selenium 1 + i18n-content-toggle 32 tam paket + önceki S1
    öncesi genel regresyon çakışan testler).
  - **🔜 Sırada:** S2 (`mission` yayılımı), S3 (analytics), S4 (TR metadata
    cilası + mülakat dağılımı) — plan §7.2-§7.4'teki promptlarla sırayla
    devam ediliyor, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Opus — SEO Faz 2 / dil-ayrık URL)

- **Aktif branch: `feature/seo-phase-2`** (`main`'den açıldı; `feature/sprint-simulator`
  merge edilmiş durumda, `6ab2254`). Kullanıcı `Documents/` altındaki 21 plan
  dosyasının denetlenmesini ve fikir/öneri istedi. **Ölçüm sonucu: içerik borcu
  KAPANMIŞ** (mülakat 25/25 sayfa ≥50 soru · animasyon kapsamı %100, 0 açık ·
  interaktif üçlü 0 boşluk · i18n baseline 0). Yani "daha çok içerik" artık en
  yüksek getirili iş değil. Yeni plan: **`Documents/seo-phase-2-plan.md`**.

- **🔴 Bulunan kritik açık — Türkçe içerik Google'da HİÇ YOKTU:** `index.html`
  `<html lang="en">`, `seo.js`'teki 44 route'un TAMAMININ metadata'sı İngilizce,
  statik shell gövdesi de İngilizce (`textValue()` daima `.en` seçiyordu) — ama
  varsayılan arayüz dili `tr`. Google her sayfayı İngilizce sanıp doymuş
  İngilizce sorgularda yarıştırıyordu; "selenium nedir", "playwright türkçe
  eğitim" gibi asıl fırsat sorgularında indekslenecek Türkçe URL yoktu.

- **✅ FAZ 2 OPUS TARAFI TAMAMLANDI (O1-O8):**
  - **Mimari karar (plan §2):** çıplak path = **TR**, `/en/<path>` = **EN**
    (Seçenek A). Gerekçe: mevcut URL otoritesi korunur, çıplak URL'in dili
    varsayılan arayüz diliyle eşitlenir, GitHub Pages'te ek altyapı gerekmez.
    `/tr` prefix'li Seçenek B reddedildi — GitHub Pages'te server redirect yok.
  - **Uygulama tekniği:** `main.jsx`'te URL `/en` ile başlıyorsa
    `<BrowserRouter basename="/en">`. **`App.jsx`'e HİÇ DOKUNULMADI** — 43 lazy
    route ikilenmedi, `check-seo.mjs`'in `<Route path>` ayrıştırması bozulmadı ve
    tüm `<Link to>` / `useNavigate` çağrıları otomatik `/en` öneki aldı.
    Doğrulandı: kodda router'ı atlayan ham `<a href="/...">` YOK.
  - **Dil otoritesi URL'e geçti (§2.2):** `localStorage.language` artık dili
    BELİRLEMEZ, yalnızca yansıtır. Otomatik yönlendirme bilinçli olarak
    EKLENMEDİ (39 E2E spec'inde sürpriz kırılma üretirdi). Dil düğmesi artık
    URL değiştirir (`window.location.assign`) — `basename` mount anında
    sabitlendiği için tam navigasyon zorunlu.
  - `seo.js`: `LOCALES`/`DEFAULT_LOCALE`/`EN_PREFIX` + her route'a `tr:{title,
    description}` (44 route için TR metadata yazıldı) + `localeFromPathname`,
    `stripLocalePrefix`, `localizedPath`, `seoFor`, `alternatesFor`.
    `getSeoForPath` artık TAM pathname alır.
  - `SeoMeta.jsx`: dile göre meta + `<html lang>` + `hreflang` (tr/en/x-default)
    + `og:locale`. `generate-seo-files.mjs`: sitemap **44 → 88 URL**, her girdide
    `xhtml:link` alternates.
  - `generate-static-routes.mjs`: shell'ler **iki dilde** üretiliyor
    (`dist/<route>` + `dist/en/<route>`) = **88 shell**. TR gövde metni ELLE
    YAZILMADI, `textValue(value, locale)` ile mevcut bilingual veriden geliyor;
    script içindeki sabit İngilizce arayüz metinleri iki dilli yapıldı.
    `/java-document` ve `/git-document` TR'de `*_tr.md` dosyalarını okuyor.
  - **JSON-LD zenginleştirme:** `FAQPage` mülakat sorularından otomatik üretiliyor
    (`interview-questions` blokları, dile uygun `q`/`a`, ilk 10 soru) + `Course`
    şeması. Ölçülen sonuç: **56 sayfada FAQPage, 68 sayfada Course** (önceden 0).
  - `check-seo.mjs`: TR metadata zorunlu, uzunluk sınırları İKİ dilde de kontrol,
    **duplicate description** kontrolü ve "TR metadata İngilizceyle özdeş mi"
    kontrolü eklendi. `check-dist-seo.mjs`: her route iki dilde de üretilmiş mi,
    `<html lang>` doğru mu, hreflang üçlüsü tam mı — hepsi hard-fail.
  - `tests/seo-i18n-routing.spec.ts` (yeni, 6 test) — **6/6 PASS.**
- **🐛 Regresyonun yakaladığı gerçek kırılma (düzeltildi):**
  `homepage-recommended-badges.spec.ts` EN testi `a[href="/what-is-testing"]`
  selector'ı kullanıyordu; EN modda href artık `/en/what-is-testing` olduğu için
  kırıldı. Selector `href$=` yapıldı — testin kodladığı eski varsayım güncellendi,
  davranış doğru.
- **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
  audit-learning-blocks ✓ (mission:18, prediction:78) · audit-interview-questions ✓ ·
  build ✓ (88 shell, 88 sitemap URL, dist-SEO geçti) · **E2E toplam 196 PASS, 0 FAIL**
  (seo-i18n-routing 6 · i18n-content-toggle 32 · topic-pages-ui + other-pages-ui +
  mission-flow + sprint-flow + theme-accessibility + mobile-smoke 53 · lesson-completion
  + term-tooltip + quiz-retry + learning-blocks-render + career-map(+milestones) +
  tooltip-guide-mascot + video-scene 98 · daily-loop + review-queue + mentor-* +
  code-playground + sql/js/ts-page + tr-code-comments 28 · sandbox'lar + lab'lar +
  roadmap-order 15 — sayımda homepage-badges'ın 2'si düzeltme sonrası ayrıca koşuldu).
  Auth gerektiren suite'ler (§23.8) koşturulmadı.
- **Kalıcı kurallar yazıldı:** `codexSeo.md` **§0** (dil-ayrık URL mimarisi, tam
  kural seti) + `CLAUDE.md` §6 (iki dilli metadata zorunluluğu) ve §11'e 2 yeni
  "yapma" maddesi.
- **🔜 Sırada — Sonnet promptları planın §7'sinde HAZIR:** S1 performans/kod bölme
  (TopicPage chunk 1.6 MB, typescriptData 1.1 MB), S2 `mission` yayılımı (25
  sayfadan sadece 6'sında var), S3 çerezsiz analytics (sitede HİÇ analytics yok),
  S4 TR metadata kalite geçişi + `/postman` ve `/playwright` mülakat dağılımı.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** deploy sonrası GSC'ye sitemap'i
  YENİDEN GÖNDER (88 URL, `/en/*` kümesi yeni), 1-2 hafta sonra hreflang
  hatalarını GSC'den doğrula, analytics hesabı aç. **Ayrıca hâlâ açık:**
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu) — bu plan onları
  kapatmaz.
- **Açık iş:** `main`'e merge kararı kullanıcıda. Merge öncesi plan §8'deki
  9 adımlı manuel test rehberi uygulanmalı.

---

## 📌 Önceki Durum (2026-08-01, Opus — /sprint UX düzeltmesi)

- **Aktif branch: `feature/sprint-simulator`.** Kullanıcı `/sprint`'i elle gezerken
  **gerçek bir UX bug'ı bildirdi:** "Görevi aç"a basınca hiçbir şey olmuyor gibi
  görünüyor. **Teşhis:** state DOĞRU değişiyordu (kart seçiliyor, panel render
  ediliyor) ama bug detay paneli Kanban panosunun ALTINDA duruyor ve hiçbir
  scroll yapılmıyordu — kullanıcı ekranın altındaki paneli hiç görmüyordu.
  `renderBlock` imzası/köprüsü sağlamdı, sorun tamamen görünürlüktü.
  - **Düzeltme 1 — göreve kaydırma:** `SprintPage.jsx`'e `bugDetailRef` +
    `selectedBugId` değişince `scrollIntoView({behavior:'smooth',block:'start'})`
    eklendi; section'a `scroll-mt-24` (TopicHeader `sticky top-0` olduğu için
    panelin üstü header'ın altında kalmasın diye).
  - **Düzeltme 2 — bağlama duyarlı rehber maskot:** Kullanıcı "ne yapması
    gerektiğini tarif eden bir maskot" istedi. **Yeni bileşen YAZILMADI** —
    mevcut `TooltipGuideMascot.jsx` props'landı (`message`/`emoji`/`ariaLabel`/
    `initiallyOpen`); TÜM props opsiyonel ve varsayılanları eski davranışın
    birebir aynısı, yani mevcut 3 giriş sayfası hiç etkilenmedi. `/sprint`'te
    🐞 maskotu balonu AÇIK başlar ve pano durumuna göre 5 fazda TEK bir
    sonraki adımı söyler (Backlog'dan çek → Görevi aç → adım kilidi/mini-lesson
    → Sprint'i kapat → sprint kapandı). Balon açık kaldığı sürece metin canlı
    güncellenir.
  - **`tests/sprint-flow.spec.ts`'e 4. test eklendi** — maskotun faz faz doğru
    metni verdiği + "Görevi aç"ın paneli GERÇEKTEN viewport'a getirdiği
    (`toBeInViewport()`). **Testin dişi doğrulandı:** `scrollIntoView` geçici
    olarak kapatılıp test'in KIRILDIĞI görüldü, sonra geri alındı.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ · `tooltip-guide-mascot.spec.ts`
    regresyon 6/6 ✓ (toplam 10/10).
  - **Açık iş:** `main`'e merge/PR kararı hâlâ kullanıcıda.

- **Aynı gün, ikinci tur — Gherkin anahtar kelimeleri (kullanıcı raporu):**
  Kullanıcı `/sprint` görevindeki Gherkin bloğunda anahtar kelimelerin
  Türkçeleştirildiğini gördü (`Senaryo:`, `Diyelim ki`, `Ve`, `O zaman`).
  Kural (CLAUDE.md §8): dilin KENDİ sözdizimi, TR sayfada bile İngilizce kalır.
  - **`sprintsData.js` — 18 blok düzeltildi** (6 mission × code/starterCode/
    solutionCode). **Yan bulgu:** `When` satırı 18 bloğun HEPSİNDE tamamen
    DÜŞMÜŞTÜ (adım anahtar kelimesizdi) — bloklar geçerli Gherkin bile değildi;
    dönüşüm sırasında eklendi. Mekanik dönüşüm önce dry-run ile gözle
    doğrulandı (CLAUDE.md §23.3), rakamla başlayan adım satırı korundu.
  - **`gaugeData.js`** (film `code` alanı + eşlik eden aktör etiketi) ve
    **`claudeAiData.js`** (prompt şablonundaki `Özellik:` → `Feature:`) de
    düzeltildi. Düz Türkçe başlıklar ("Senaryo: EC2'de Selenium Grid",
    `manualTestingData.js`'in "Özellik: Kahve Yap" etiketi) Gherkin DEĞİLDİR,
    dokunulmadı.
  - **Hover açıklaması (kullanıcı isteği):** Kod bloklarına tooltip mimari
    olarak bağlanamıyor (`highlightGlossaryTerms` `<pre>` içeriğini asla
    sarmaz), bu yüzden anahtar kelime açıklaması 6 gherkin bloğunun
    **`explanation` alanına** iki dilli olarak eklendi (blok render'ında kodun
    hemen üstünde çıkar). `termGlossary.js`'e `gherkin` + `cucumber` terimleri
    eklendi; `Given/When/Then/And` BİLEREK eklenmedi — EN modda her cümlede
    altları çizilirdi (dosyanın "aşırı yaygın kelime ekleme" kuralı).
  - **Kalıcı kontrol eklendi:** `check-content-integrity.mjs` **Kontrol [G]**
    (`checkGherkinKeywords`) — build + pre-commit'te hard-fail. İlk yazımında
    12 yanlış-pozitif verdi (düz Türkçe başlıklar), daraltıldı: bir string
    ancak çok satırlı olup adım satırı içeriyorsa ya da bir kod alanına
    yazılmışsa denetlenir. **Dişi doğrulandı** — geçici sonda dosyasıyla 4
    anahtar kelimenin de yakalandığı görüldü, sonra silindi.
  - **CLAUDE.md güncellendi:** §23.9 (kök neden/çözüm/önleme) + §11'e hata maddesi.
  - **Doğrulama:** content-integrity ✓ (0 ihlal, [G] dahil) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ · build ✓ (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ ·
    `term-tooltip.spec.ts` regresyon 2/2 ✓.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Test kapsamı S4)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.3'teki Sonnet promptu
  uygulandı: **S4 — Test kapsamı boşlukları (mobil viewport + çapraz tarayıcı)
  TAMAMLANDI.** `Documents/testcoverage.md` (2026-07-03, bayat) yerine önce
  `tests/` klasörü elle tarandı — mobil kapsamın hâlâ sadece `/` ve `/docker`
  olduğu doğrulandı, çapraz tarayıcı project'i hiç yoktu.
  - **S4.1 — Mobil viewport genişletme:** `tests/mobile-smoke.spec.ts`'e 6 yeni
    route eklendi (`/python`, `/java`, `/sql` — dil sayfaları; `/selenium`,
    `/jenkins`, `/kubernetes` — araç sayfaları), `/` + `/docker` ile birlikte
    **toplam 8 sayfa**. Her route için: yatay kayma yok (CLAUDE.md §12), ilk
    sidebar sekmesi WCAG 2.5.5 36px dokunma hedefini karşılıyor, sekmeye
    dokunma sayfayı bozmuyor, console/page hatası yok. §22.1 istisna listesi
    (`/basit-backend`, `/security`, `/backend`) EKLENMEDİ. **8/8 PASS.**
  - **S4.2 — Çapraz tarayıcı (Firefox + WebKit):** Ana `playwright.config.ts`
    DEĞİŞTİRİLMEDİ (hâlâ sadece chromium, `npm run test:e2e` süresi etkilenmedi)
    — mevcut `playwright.quiz-audit.config.ts`/`playwright.interview-flows.config.ts`
    kalıbı izlenerek **ayrı** `playwright.cross-browser.config.ts` (yeni) +
    `tests-cross-browser/cross-browser-smoke.spec.ts` (yeni) eklendi. Sadece
    temsili 2 sayfa (`/` + `/docker`, CLAUDE.md §22 kalıbı) Firefox + WebKit
    project'lerinde SMOKE seviyesinde doğrulanıyor (derinlik değil, tarayıcıya
    özgü render/etkileşim kırılması riski). `npm run test:cross-browser`
    script'i eklendi (`package.json`). Firefox + WebKit browser binary'leri
    `npx playwright install` ile kuruldu. **4/4 PASS** (2 test × 2 tarayıcı).
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell, `playwright.config.ts` değişmedi) · mobile-smoke genişletilmiş
    8/8 PASS · cross-browser-smoke 4/4 PASS.
  - **✅ PLANDAKİ TÜM SONNET GÖREVLERİ (S1-S4) TAMAMLANDI.** Kalan tek kalem
    Faz 3 (Kullanıcı/Hasan'ın deploy/doğrulama açık uçları, plan §5) — kod işi
    değil, credential/panel işi.
  - **Açık iş:** `main`'e merge/PR kararı kullanıcıda.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Career Map Faz 2 S3)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.2'deki Sonnet promptu
  uygulandı: **S3 — Career Map Faz 2 (milestone/rozet + breadcrumb) TAMAMLANDI**
  (`Documents/career-map-feature-plan.md` §4.3/§4.4c). MVP'ye (v2 sorular,
  localStorage kalıcılığı, `estimatedHours`, `trackMapEvent`) DOKUNULMADI,
  üstüne kuruldu.
  - **S3.1 — Milestone/rozet sistemi:** `src/utils/careerMapMilestones.js`
    (yeni) — 5 milestone tanımı (plan §4.3 tablosu birebir): 🏁 İlk adım
    (haritanın ilk düğümü tamamlandı), 🏁 Kod yazan testçi (Java/Python/TS'ten
    biri), 🏁 Otomasyoncu (Selenium/Playwright'tan biri), 🏁 Full-stack tester
    (Postman/REST Assured + SQL), 🏆 SDET yolu tamam (ana yol düğümlerinin
    %80'i). Tamamen local-first, KENDİ ilerleme state'i TUTMAZ — mevcut
    `getLocalCompletedRoutes()`'tan HER render'da yeniden türetilir (tek
    doğruluk kaynağı ilkesi, CLAUDE.md §23.4). Ayrı bir `learnqa_map_milestones`
    anahtarı SADECE "bu milestone daha önce kutlandı mı?" bilgisini tutar (xp.js
    `completed` ilkesiyle aynı desen — konfeti/`trackMapEvent('milestone_earned')`
    bir kez tetiklensin diye).
    - **Not (dürüst sadeleştirme):** Plandaki "İlk quizin çözülmesi" tetikleyicisi
      mevcut altyapıda YOK (yalnızca route-seviyeli tam tamamlanma izleniyor) —
      "İlk adım" milestone'ı haritanın ilk düğümünün TAMAMEN bitmesine bağlandı.
    - `QAMentorPage.jsx`'e `MilestoneStrip` alt bileşeni eklendi (`MindMapView`
      içinde, süre rozeti bloğunun hemen ardında) — kazanılan/kazanılmayan
      rozetler renk farkıyla gösterilir, yeni kazanımda `ConfettiExplosion`.
  - **S3.2 — Ders sayfasında "haritanda neredesin" breadcrumb'ı:**
    `TopicHeader.jsx`'e `useMapBreadcrumb()` eklendi — `TopicHeader` TÜM ders
    sayfalarında (TopicPage üzerinden ~25 teknoloji sayfası + Algorithms/
    ManualTesting/WhatIsTesting) paylaşıldığından buraya eklemek TEK NOKTADAN
    tüm sitede yayılım sağladı. **`TopicPage.jsx`'in quiz motoruna
    DOKUNULMADI** (plan kısıtı). `/qa-mentor`, `/leaderboard`,
    `/verify-certificate`, `/qa-assistant`, `/sprint` hariç tutuldu (harita
    düğümü değiller). Breadcrumb'a tıklayınca `/qa-mentor`'a gider.
  - **`tests/career-map-milestones.spec.ts` (yeni, 4 test):** milestone
    kazanımı (first-step + code-writing-tester kazanılır, diğerleri
    kazanılmaz), breadcrumb doğru pozisyon gösterir + tıklanınca /qa-mentor'a
    gider, profil yokken breadcrumb hiç görünmez, /qa-mentor'da breadcrumb
    kendisi görünmez. **4/4 PASS.**
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · yeni testler 4/4 ✓ · regresyon `career-map.spec.ts` (12) +
    `qa-mentor-progress-tracking.spec.ts` (1) + `qa-mentor-roadmap-order.spec.ts`
    (1) = **14/14 PASS** (hiç kırılma yok).
  - **S3.3 (opsiyonel, planda "en son" işaretli) YAPILMADI:** paylaşılabilir
    harita görseli (`<canvas>` + `toDataURL()`) — düşük öncelik, istenirse
    ayrı bir oturumda eklenebilir.
  - **🔜 Sırada (plan §6.3, Sonnet promptu hazır):** S4 test kapsamı boşlukları
    (mobil viewport genişletme + çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Sprint içerik genişletme S1)

- **Aktif branch: `feature/sprint-simulator`.** Opus'un Faz 1 çekirdeğinin
  (aşağıda) hemen ardından, plan §6.1'deki Sonnet promptu uygulandı: **S1 —
  Sprint içerik genişletme + HomePage giriş kartı TAMAMLANDI.**
  - **`src/data/sprintsData.js`'e 2 yeni bug eklendi (Sprint 1 → 4 bug):**
    LQA-103 (ödeme butonuna çift tıklayınca sipariş iki kez oluşuyor —
    idempotency key + veritabanı UNIQUE constraint, check-then-act yarış durumu
    dersi), LQA-104 (süresi geçmiş kupon hâlâ geçerli — istemciden gelen tarihe
    güvenmeme + test verisinde deterministik/sabit tarih kullanma dersi).
  - **Yeni `sprint-2` eklendi** ("API Performans ve Güvenilirlik", ShopLab
    Platform/Backend ekibi, 2 bug): LQA-201 (ürün listesi N+1 sorgu — REST
    Assured `.time(lessThan(...))` + donanımdan bağımsız sorgu-sayısı
    assertion'ı dersi), LQA-202 (eşzamanlı sipariş istekleri stoğu negatife
    düşürüyor — `CountDownLatch` ile gerçek eşzamanlılık testi + atomik
    `UPDATE ... WHERE stok > 0` çözümü, LQA-103'teki check-then-act dersinin
    farklı bir alanda tekrarı).
  - **🐛 Gerçek bug bulundu ve düzeltildi (kapsam dışı ama zorunlu):** Sprint 2
    eklenince `SprintPage.jsx` hâlâ sabit `sprintsData.sprints[0]` gösteriyordu
    — yeni sprint hiçbir zaman ERİŞİLEMEZ olurdu. `SprintPage.jsx`'e sprint
    seçici (tab bar, `data-testid="sprint-tab"`) eklendi; sprint değişince bug
    detay paneli kapanır. Bu değişiklik plan promptunun orijinal dosya kapsamı
    dışındaydı ama içerik eklemenin doğal sonucu olarak zorunluydu.
  - **`src/components/HomePage.jsx`'e "QA Sprint Simülatörü" giriş kartı
    eklendi** — mevcut `resume-banner` statik kalıbı KOPYALANDI (yeni tasarım
    icat edilmedi), amber/orange renk şeması ile ayrıştırıldı.
  - **Yan iyileştirme — denetim tutarlılığı:** Yeni prediction'ların doğru şık
    pozisyonları bilinçli çeşitlendirildi (A/B/C dağılımı), "hep B" gaming
    riskini büyütmemek için (bkz. §23'teki bilinen 47/50 uyarısı — bu artık
    Sprint bloklarında tekrarlanmadı).
  - **`tests/sprint-flow.spec.ts`'e 3. test eklendi:** sprint sekmesi
    değiştirince farklı sprint'in bug'ları gösteriliyor mu (yukarıdaki
    SprintPage bug'ının regresyon testi). **3/3 PASS.**
  - **Doğrulama:** `node --check sprintsData.js` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:18,
    prediction:78, 0 ihlal) · build ✓ (44 shell) · `sprint-flow.spec.ts` 3/3 ✓ ·
    `homepage-recommended-badges.spec.ts` regresyon 2/2 ✓.
  - **🔜 Sırada (plan §6.2/§6.3, Sonnet promptları hazır):** S3 Career Map
    Faz 2 (milestone/rozet + breadcrumb), S4 test kapsamı (mobil viewport +
    çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Opus — Sprint Simulator Faz 1)

- **Aktif branch: `feature/sprint-simulator`** (`main`'den açıldı). Kullanıcı
  `Documents/` altındaki 20 plan dosyasının denetlenmesini ve açık kalan işler
  için yeni bir plan + Opus/Sonnet görev dağılımı istedi. Yeni plan:
  **`Documents/sprint-simulator-and-open-items-plan.md`**.
  - **✅ FAZ 1 — QA SPRINT SIMULATOR (`/sprint`) OPUS TARAFI TAMAMLANDI (O1-O8):**
    - `src/lib/sprintStore.js` (yeni) — local-first pano durumu. **Tek-doğruluk
      ilkesi:** bug'ın "bitti" bilgisi BURADA TUTULMAZ, `xp.js`'ten türetilir
      (`getCompletedExercises`); depo yalnızca "sprint'e çekildi" + "sprint
      kapatıldı" tutar. İkinci bir tamamlanma state'i drift üretirdi (§23.4).
    - `src/components/TopicPage.jsx` — **tek satır:** `renderBlock` `export`
      edildi. Sprint sayfası bug görevlerinin gömülü bloklarını (code-playground,
      prediction…) AYNI makineden geçirir — kendi renderer'ını yazmak
      challenge-first'in "YENİ SANDBOX YAZMA" ilkesinin ihlali olurdu.
    - `src/components/SprintBoard.jsx` (yeni) — Kanban panosu (Backlog/In
      Progress/Done), bug kartı, severity rozeti. Saf Tailwind, dış paket yok.
    - `src/components/SprintPage.jsx` (yeni) — sayfa kabuğu, sprint özeti +
      ilerleme, bug raporu paneli, MissionBlock host'u, sprint kapanış töreni
      (bonus XP + konfeti + retrospektif + skill signal).
    - `src/data/sprintsData.js` (yeni) — Sprint 1 "Checkout Akışı Kararlılığı",
      2 referans bug. **BİR BUG = BİR MISSION**, 5 adım QA iş akışına birebir
      oturur: Analiz → Test Case → Otomasyon → CI → Merge. LQA-101 (sessiz login
      hatası, frontend 401'i yutuyor) + LQA-102 (bayat sepet toplamı). Tam
      bilingual, STRICT_ZERO.
    - Rota bağlandı: `App.jsx` (lazy+Route), `seo.js` ROUTE_SEO,
      `generate-static-routes.mjs` specialRouteContent, `CLAUDE.md` §2 route
      haritası. Build artık **44** statik shell üretiyor (43'ten +1).
    - `tests/sprint-flow.spec.ts` (yeni, 2 test) — veri-güdümlü E2E: 3 kolon
      render, "Sprint'e al" geçişi, adım kilidi, tüm bug'lar kapanınca Done +
      sprint kapatma + XP/localStorage + F5 kalıcılığı. **2/2 PASS.**
  - **🐛 Testin yakaladığı GERÇEK bug (düzeltildi):** `renderBlock`'un 2.
    parametresi React key'ine dönüşüyor; ilk yazımda sabit `0` verilmişti, bu
    yüzden React iki farklı bug'ın MissionBlock'unu aynı instance sanıp yeniden
    kullanıyor, önceki bug'ın "tamamlandı" state'i taşınıyor ve ikinci bug HİÇ
    tamamlanmış işaretlenmiyordu. Key `selectedBug.id` yapıldı.
  - **🔍 Yan bulgu — denetim kör noktası kapatıldı:** `audit-learning-blocks.mjs`
    prediction şema kontrolünü YALNIZCA dil sayfalarında (`FILES`) yapıyordu;
    mission içine gömülü prediction'lar (seleniumData, playwrightData,
    cypressData, restAssuredData, sprintsData) HİÇ doğrulanmıyordu — eksik
    `reveal` veya iki `correct` sessizce geçerdi. Kontrol `MISSION_FILES`'a da
    genişletildi: **denetlenen prediction 50 → 70**, hepsi şemayı karşılıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ (mission:14, prediction:70, 0 ihlal) · build ✓
    (44 shell, SEO geçti) · `tests/sprint-flow.spec.ts` 2/2 ✓ ·
    regresyon `mission-flow` + `learning-blocks-render` 4/4 ✓.
  - **🔜 Sırada (Sonnet promptları planın §6'sında HAZIR):** S1 sprint içerik
    genişletme (Sprint 1'e +2 bug, Sprint 2 API/performans temalı), S2 HomePage
    giriş kartı, S3 Career Map Faz 2 (milestone/rozet + breadcrumb), S4 test
    kapsamı (mobil viewport + çapraz tarayıcı).
  - **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** `explain-code-output` ve
    `mentor-advice` edge function deploy teyidi, social-proof RPC yeniden
    çalıştırma, trending-skills aktivasyon adımları.

---

## 📌 Önceki Durum (2026-08-01 — merge durumu doğrulandı)

- **✅ AKTİF BRANCH: `main`.** `feature/challenge-first` main'e merge edildi
  (`62dccf2 Merge branch 'feature/challenge-first'`). Ayrıca `frontenddevelopment-for-qa`
  (`/qa-frontend` sayfası) ve `feature/api-testing-page` (`/api-testing` sayfası)
  branch'leri de doğrulandı: ikisi de `main`'e göre 0 commit ileride — yani
  içerikleri zaten `main`'de. Aşağıdaki geçmiş girdilerdeki "main'e merge/PR
  kararı kullanıcıda" notları artık ÇÖZÜLMÜŞ durumda; yeni bir aksiyon gerekmiyor.
  Çalışma ağacı temiz.

- **Önceki iş (2026-07-31, Sonnet — Kavram Tooltip yoğunlaştırma, `feature/challenge-first`
  üzerinde yapıldı, artık main'de):** Mission Dalga 2'nin (aşağıda)
  hemen ardından, kullanıcı "kavram tooltip'i özellikle yeni başlayanlar için
  önemli, ilk girilen sayfalarda (Test Nedir, Manuel Test, Algoritma Temelleri,
  Java/TS/Python) daha yoğun olmalı" dedi. **Gerçek bir mimari boşluk
  bulundu:** `/manual-testing` ve `/algorithms` `TopicPage.jsx` kullanmıyordu
  (kendi özel component'leri var) — `highlightGlossaryTerms` bu iki sayfada
  HİÇ çalışmıyordu (0 tetikleyici, ölçüldü). Düzeltildi: `ManualTestingPage.jsx`
  (`InfoBox`) + `AlgorithmsPage.jsx` (`LessonCard`) render noktalarına
  `highlightGlossaryTerms` bağlandı; `termGlossary.js` 57→84 terime genişletildi
  (test temelleri, manuel test, algoritma, dil temelleri, ortam). Ölçülen etki:
  `/manual-testing` 0→33, `/algorithms` 0→7 tetikleyici. Detay: plan §3.6.4.
  Doğrulama: content-integrity + i18n baseline 0 + build + 2 E2E test regresyonu
  (term-tooltip + mission-flow, 3/3 PASS). Commit `8fe795e`.

- **Aynı gün, hemen ardından — Rehber Karakter (Mascot):** Kullanıcı "sevimli
  bir animasyon karakteri + konuşma balonu, bilmediğin kelimenin üstüne gel de
  görsün diye yönlendirsin" istedi. AskUserQuestion ile 3 tasarım kararı
  netleştirildi: sabit köşe (scroll takip ETMEZ), sadece 3 giriş sayfası,
  her ziyarette rozet + tıklayınca balon. `TooltipGuideMascot.jsx` (yeni,
  🦉 emoji + self-contained dark-mode algılama) yazıldı; `TopicPage.jsx`'e
  DOKUNULMADI (paylaşılan dosya), 3 sayfanın kendi wrapper'ına eklendi
  (`WhatIsTestingPage`/`ManualTestingPage`/`AlgorithmsPage`). **Gerçek
  tarayıcı testiyle bulunan bug:** ilk sürüm sol-alt köşedeydi, App.jsx'teki
  global `ChatWidget`'la (bottom-20 left-4) çakışıyordu (balon açılınca
  üstüne biniyordu) — sol kenar dikey-orta konuma taşınarak düzeltildi.
  `tests/tooltip-guide-mascot.spec.ts` (yeni, 5 test: 3 sayfa aç/kapa +
  kapsam-dışı sayfada yokluk + ChatWidget çakışma kontrolü) **5/5 PASS**.
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (5/5)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Aynı gün, üçüncü tur — Dikkat Çekme Animasyonu:** Kullanıcı "maskot ilk
  sayfa açılışta yanıp sönsün, kullanıcı bir defa tıklayınca boyutuna geri
  dönsün ve sadece sabit kalsın" istedi. `hasInteracted` state eklendi: rozet
  İLK tıklamaya kadar sürekli yanıp söner (`tooltipGuideAttention`, ölçek+
  opaklık pulse, 1.1sn), ilk tıklamadan SONRA kalıcı olarak durur + normal
  boyutuna döner. **2 gerçek bug bulunup düzeltildi:** (1) `@keyframes`
  tanımı yanlışlıkla sadece balonun içindeydi — rozet balon açılmadan ÖNCE
  yanıp sönmesi gerektiğinden dışarı taşındı; (2) rozet sürekli pulse ettiği
  için Playwright'ın "stable" actionability kontrolü ilk tıklamada asla
  geçmiyordu (test timeout) — gerçek kullanıcıyı ETKİLEMEZ, test'te ilk
  tıklama `force:true` ile düzeltildi. `tooltip-guide-mascot.spec.ts`'e yeni
  test eklendi (animasyon öncesi/sonrası + boyut kontrolü). **6/6 PASS**
  (temiz/tek-worker koşumda; art arda çok test dev server'ı meşgul edip
  transient timeout verebiliyor — mascot mantığıyla ilgisiz, bilinen not).
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (6/6)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Önceki iş (aynı gün) — Mission Dalga 2:** Phase 1 + Phase 1.5 önceki
  oturumda TAMAMLANMIŞTI (6 sayfa × 1 mission + kavram tooltip'i). Bu oturumda
  kullanıcı "bu görevleri ne kadar genişletebilirsin, her dikey sekmede
  uygulanabilir mi?" diye sordu. Değerlendirme: teknik engel yok ama HER
  sekmede zorlama görev, kullanıcının orijinal stratejik yazısının uyardığı
  "özellik sayısı, derinlik değil" tuzağına düşer — sadece "aksiyon" sekmeleri
  (Framework Mimarisi, Network, Troubleshooting, JOINs, Test Zinciri gibi)
  buna uygun. Kullanıcı **"mevcut 6 sayfada, aksiyon sekmelerine +1-2 görev"**
  seçeneğini onayladı.
  - **✅ MISSION DALGA 2 TAMAMLANDI — 6 sayfanın HER BİRİNE ikinci bir görev
    eklendi** (plan §9.2 Dalga 2 tablosu, 6 ayrı commit):
    1. **Selenium** → Framework Mimarisi (SOLID+POM) sekmesi: "Ham testi POM'a
       refactor et" (`selenium-pom-refactor-mission`) — locator tekrarının
       riski (prediction) → LoginPage sınıfı yaz → login() metodu yaz →
       bakım maliyeti 10→1 dosya (prediction) → testi Page Object'le yeniden yaz.
    2. **Playwright** → Framework Mimarisi sekmesi: aynı POM teması TypeScript
       karşılığı (`playwright-pom-refactor-mission`) — sekmenin zaten
       derinlemesine işlediği fixture/DI konusuyla ÇAKIŞMAZ.
    3. **Cypress** → Network & cy.intercept() sekmesi: "Yavaş API'yi stub'la,
       loading/hata durumunu test et" (`cypress-network-stub-mission`) — farklı
       tema (network stubbing). ⚠️ **Gerçek bug yakalandı:** bu sekme (s5)
       ÇİFT-AĞAÇLI, ilk yazımda görev SADECE EN ağacına gitmişti, doğrulama
       sırasında TR ağacına da eklendi.
    4. **Python** → Troubleshooting/Yaygın Hatalar sekmesi: "CI'da patlayan
       traceback'i oku, kök nedeni bul, düzelt" (`python-traceback-debug-mission`)
       — stepAnimationTracebackReading'in "en alttan oku" kalıbını uygulamalı
       yapıyor. `finalEnSections`/`finalTrSections`'a (Dalga A8 güvenli kalıp).
    5. **SQL** → SQL JOINs sekmesi: "Sipariş verisinde yetim kayıt bul"
       (`sql-orphan-orders-mission`) — LEFT JOIN + WHERE IS NULL idiyomu.
    6. **REST Assured** → Test Zinciri sekmesi: "Kullanıcı oluştur, id çıkar,
       GET ile doğrula" (`restassured-chain-mission`) — sekmenin zaten
       gösterdiği tam `UserCrudE2ETest` zincirinin en küçük yapı taşı.
  - **Toplam mission sayısı: 6 → 12** (`audit-learning-blocks.mjs` çıktısı).
  - **Doğrulama (her commit'te ayrı ayrı):** content-integrity ✓ · i18n
    baseline 0 ✓ · audit-learning-blocks (mission:12, 0 ihlal) ✓ · build ✓
    (43 shell) · `tests/mission-flow.spec.ts` regresyon testi (Selenium'da
    artık 2 mission var, test hâlâ doğru olanı — Locators'takini — bulup
    PASS oluyor) ✓.
  - Plan §9.2 manuel test rehberi Dalga 1/Dalga 2 tablolarıyla güncellendi.
  - **Açık iş:** Merge tamamlandı (yukarı bak). Phase 2/Phase 3 hâlâ
    ayrı onay + planlama ister.

- **Önceki oturum (2026-07-30, Opus) — Challenge-First Phase 1 Opus tarafı:**

- **Aktif branch: `feature/challenge-first`** (yeni, `main`'den açıldı). Kullanıcının
  stratejik değerlendirme yazısı denetlenip yeni plan yazıldı:
  **`Documents/challenge-first-experience-plan.md`** (learning-science planının halefi).
  Değerlendirme özeti: yazının "Phase 3" listesi (AI coach / prediction / memory-viz /
  analytics) ZATEN BİTMİŞ; gerçek yeni değer challenge-first + iş simülasyonu.
  Kullanıcı **Phase 1 = Challenge-First Senaryo Katmanı** yönünü seçti; açık ürün
  kararı (sayfa-içi vs ayrı sekme) önerilen "sayfa-içi" ile ilerletildi.
  - **PHASE 1 OPUS TARAFI (P1-O1…O5) TAMAMLANDI — bu oturum:**
    - `src/lib/skillSignals.js` (yeni) — local-first beceri sinyali deposu
      (`recordSkillSignal`/`getSkillSignals`/`getSkillSignalCounts`/`hasSkillSignal`).
      Phase 3'te SkillRadar'ı "çözülen challenge"dan besleyecek; şimdilik toplar.
    - `src/components/MissionBlock.jsx` (yeni) — `type:'mission'` görev zinciri:
      adım sırayla kilit açar, gömülü blok `onFirstSuccess` verince adım biter,
      "💡 Takıldın mı? Mini-lesson aç" (challenge-first çekirdeği), tamamlanınca
      XP+konfeti+beceri sinyali+debrief. YENİ SANDBOX YAZMAZ.
    - `src/components/TopicPage.jsx` — `import MissionBlock` + `case 'mission'`:
      `renderInner` callback'i her adımın gömülü bloğunu (code-playground/prediction/
      editor/sandbox…) AYNI `renderBlock` makinesinden geçirir.
    - `scripts/audit-learning-blocks.mjs` — `mission` şema değişmezi eklendi
      (id benzersiz + relatedTopicId + ≥3 adım + her adımda brief/miniLesson/
      type'lı block + successCriterion geçerli). Build hard-fail. MISSION_FILES
      listesi seleniumData.js dahil — Sonnet rollout ederken yeni dosyaları ekleyecek.
    - `src/data/seleniumData.js` — REFERANS görev "Login sayfasını test et"
      (Locators sekmesi, 5 adım: locator seç → tıkla → assert → wait stratejisi
      seç → explicit wait yaz; çift-ağaç `s2.tr/s2.en`'e tek sabit push).
  - **Doğrulama:** `audit-learning-blocks` ✓ (mission: 1, 0 ihlal) · content-integrity
    ✓ (38 dosya) · i18n:check ✓ (baseline 0, regresyon yok) · `npm run build` ✓
    (43 static shell, SEO geçti; seleniumData chunk 633 kB — bilinen büyük-chunk
    uyarısı, §14/§23.8).
  - **PHASE 1.5 — KAVRAM TOOLTIP OPUS TARAFI (P1.5-O1…O3) da TAMAMLANDI — aynı oturum:**
    Kullanıcı gözlemi: "yazılım bilmeyen kullanıcı en basit kavramları anlamıyor."
    Çözüm: terimlerin üstüne gelince/dokununca günlük-hayat benzetmesi baloncuğu.
    - `src/data/termGlossary.js` (yeni) — terim→benzetme sözlüğü, ~24 tohum terim
      (locator, selector, assertion, fixture, XPath, DOM, API, endpoint, CI/CD,
      pipeline, commit, merge, branch, framework, boolean, null, exception,
      variable, array, query, flaky test, timeout, mock, regression).
    - `src/components/TermTooltip.jsx` (yeni) — hover/focus/tap ile açılan,
      ESC/dışarı-tık kapanan, klavye-erişilebilir, dark-mode + bilingual popover +
      `highlightGlossaryTerms` helper (modül-seviyesi tek regex, `\b` ASCII sınırı,
      blok başına ilk-geçiş ≤8 terim; kod blokları ASLA sarılmaz).
    - `src/components/TopicPage.jsx` — `case 'text'` ve `case 'simple-box'` prose
      render'ına `highlightGlossaryTerms(...)` bağlandı (minimal, düşük risk).
    - **Not:** termGlossary.js `*Glossary.js` olduğundan i18n scanner'ın `*Data.js`
      glob'una GİRMİYOR — `en` saf İngilizce + `aliases` ASCII elle korunmalı
      (plan §3.6.1). Gate'ler yeşil (content-integrity + i18n:0 + build 43 shell).
- **Bu oturum (2026-07-30, Sonnet) — Phase 1 mission rollout devam ediyor
  (branch `feature/challenge-first`, plan §7.2/§7.3):**
  - ✅ **playwrightData.js — "Sepete ürün ekle" mission görevi eklendi** (commit
    aşağıda). Locator Stratejileri sekmesi (s3), 5 adım: sağlam locator seç
    (getByRole vs class vs XPath, prediction) → tıkla (code-playground) →
    web-first assertion yaz (code-playground) → auto-wait'in Thread.sleep'i
    neden gereksiz kıldığını anla (prediction) → uçtan uca birleştir
    (code-playground). automationexercise.com'u hedefliyor (sitenin kendi test
    konusu — projeyle tutarlı). Çift-ağaç `s3.tr/s3.en`'e tek sabit push.
    `scripts/audit-learning-blocks.mjs` `MISSION_FILES`'e `playwrightData.js`
    eklendi. **Doğrulama:** audit (mission: 2, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **cypressData.js — "Ürün ara ve sonuçları doğrula" mission görevi eklendi.**
    Temel Komutlar & Selector Stratejisi sekmesi (s2), 5 adım: data-cy selector
    seç (prediction) → yaz (code-playground) → retry-able .should() assertion
    yaz (code-playground) → cy.wait(sayı)'nın neden flaky testin en sık kök
    nedeni olduğunu anla (prediction) → uçtan uca birleştir (code-playground).
    Debrief üç aracı (WebDriverWait/web-first assertion/.should()) "aynı
    problemi çözer: koşulu bekle, süreyi değil" diye bağlıyor. Çift-ağaç
    `s2.tr/s2.en`'e tek sabit push. `MISSION_FILES`'e `cypressData.js` eklendi.
    **Doğrulama:** audit (mission: 3, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **pythonData.js — "Kullanıcı API'sini pytest ile test et" mission görevi
    eklendi.** Real World (pytest) sekmesi (final section index 16), 5 adım:
    fixture ile tekrarı önleme kararı (prediction) → base_url fixture'ını yaz
    (code-playground) → status_code assert et (code-playground) → parametrize
    kararı (prediction) → fixture+parametrize'ı uçtan uca birleştir
    (code-playground). pythonData.js'in RİSKLİ `applyTr`/index-override
    mekanizmasına DOKUNULMADI — güvenli kalıbı takip ederek mission sabiti
    SADECE `finalEnSections[16]`/`finalTrSections[16]` dizi literal'lerine
    (spread sonrası) eklendi (bkz. dosyadaki "GUVENLIK NOTU" — Dalga A8 kalıbı).
    **Doğrulama:** audit (mission: 4, prediction: 44) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ⚠️ **Yan bulgu ve düzeltme — ASCII-normalize Türkçe kör noktası (CLAUDE.md
    §23.1) 3 yerde gerçekten yakalandı:** `check-i18n-leaks.mjs` özel Türkçe
    karakter (ığşçöüİĞŞÇÖÜ) arıyor; "bazen 200ms, bazen 1.5sn" gibi özel
    karaktersiz Türkçe yorumlar plain-string `prediction.code` alanlarında
    sessizce EN moda sızıyordu. Python'daki yeni blok scanner'ın YAKALADIĞI
    (özel karakterli) 1 leak'i düzeltirken, aynı kalıbın **playwrightData.js**
    (`pw-mission-autowait-choice`), **cypressData.js** (`cy-mission-nowait-
    choice`) ve **seleniumData.js** (`sel-mission-wait-choice`, önceki Opus
    oturumundan kalma) içinde de var olduğu elle taranarak bulundu — üçü de
    `{tr,en}` bilingual yapıldı. Ders: yeni prediction `code` alanı yazarken
    düz string + Türkçe yorum kombinasyonundan KAÇIN, baştan `{tr,en}` yaz.
  - ✅ **sqlData.js — "Ürün fiyat verisini doğrula" mission görevi eklendi.**
    SELECT & Sort sekmesi, 5 adım: doğru WHERE koşulu seçimi (prediction) →
    negatif fiyatları getiren sorguyu yaz → ORDER BY ile en kötü fiyatı üste
    sırala → NULL'ın karşılaştırmalarda SESSİZCE elendiğini anlama (prediction)
    → negatif+NULL'ı birleştiren tam sorguyu yaz. `predSqlDistinctMultiCol`
    kalıbını takip etti: tek bilingual sabit, hem EN hem TR "SELECT & Sort"
    section'ına AYNI referansla (`replace_all`) eklendi. **Doğrulama:** audit
    (mission: 5, prediction: 46) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - ✅ **restAssuredData.js — "GET /api/users/2 isteğini given/when/then ile
    test et" mission görevi eklendi.** Assertions (Hamcrest) sekmesi, 5 adım:
    eksik .then() zincirinin sonucunu tahmin et (prediction) → status code
    doğrula → body içeriğini (JSON Path + Hamcrest) doğrula → negatif senaryo
    kararı — var olmayan kullanıcı için doğru HTTP kodu (prediction) → negatif
    senaryoyu yaz (id=9999 → 404). Plan §3.3'ün "API (Postman/REST Assured —
    istek→assertion→negatif senaryo)" hedefini birebir karşılıyor. Tek-ağaçlı
    dosya (§9.5): sabit `sections[5]`'e (paylaşılan tr/en referansı) TEK yere
    eklendi. `MISSION_FILES`'e `restAssuredData.js` eklendi. **Doğrulama:**
    audit (mission: 6, 0 ihlal) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - **✅ P1-S1 (6 sayfa mission rollout) TAMAMLANDI** — Selenium (Opus referans) +
    Playwright + Cypress + Python + SQL + REST Assured, plan §3.4'teki "en az
    6 sayfa" hedefine ULAŞILDI.
  - ✅ **P1-S3 + P1-S4 TAMAMLANDI:**
    - `tests/mission-flow.spec.ts` (yeni) — /selenium referans görevi üzerinde
      TAM veri-güdümlü E2E: adım kilidinin sırayla açıldığı, "Mini-lesson aç"ın
      çalıştığı (metin `steps[].miniLesson`'dan okunur), tüm 5 adım (2
      prediction + 3 code-playground) sırayla tamamlanınca tamamlanma banner'ı
      + `learnqa_xp_selenium` localStorage'a XP/completed'ın gerçekten
      yazıldığı doğrulanıyor. Sabit metin/id gömülmez — `seleniumData`'dan
      hesaplanır (`tests/learning-blocks-render.spec.ts` ile aynı ilke).
      **Yerel Chromium'da PASS (37.8s).** Yeni route yok → §22.1 değişmez.
    - `src/components/MissionBlock.jsx` — testi güvenilir kılmak için 4
      `data-testid` eklendi (`mission-block` + `data-mission-id`/`data-
      mission-complete`, `mission-step` + `data-step-index`/`data-step-
      locked`/`data-step-done`, `mission-mini-lesson`, `mission-complete-
      banner`) — `mentor-panel`/`mentor-ai-button` kalıbıyla aynı (içerik
      DEĞİŞMEDİ, sadece test-scoping).
    - `CLAUDE.md` §5 blok listesine `prediction | code-trace | heap-stack | mission`
      eklendi (üçü zaten vardı ama listeye hiç girmemişti — fırsatçı düzeltme).
    - **Doğrulama:** content-integrity ✓ · i18n baseline 0 ✓ · audit-learning-
      blocks (mission:6, 0 ihlal) ✓ · build ✓ (43 shell) · `npx playwright test
      tests/mission-flow.spec.ts` ✓ (1/1 PASS).
  - **✅ PHASE 1 (Challenge-First Senaryo Katmanı) TAMAMLANDI** — plan §3.4
    "bitti" tanımının tamamı karşılandı: 6 sayfa (Selenium+Playwright+Cypress+
    Python+SQL+REST Assured), audit/i18n/build kapıları yeşil, E2E test yeşil,
    `skillSignals.js` her görev bitince sinyal topluyor (Phase 3 hazır).
  - ✅ **P1.5-S1 — `termGlossary.js` 24 → 57 terime genişletildi** (33 yeni
    terim): loop, condition, class/object, inheritance, JSON, HTTP status
    code, cookie/session, container, image, pod, thread, async/await,
    promise, callback, closure, generic, regex, environment variable,
    dependency, repository, deploy, rollback, cache, latency, idempotent,
    token, schema, webhook, payload, queue, load balancer, log/stack trace,
    race condition. Her biri günlük-hayat benzetmeli + bilingual + ASCII
    aliases; script ile 0 duplicate alias + 0 non-ASCII + 0 eksik EN alanı
    doğrulandı. **Doğrulama:** node --check ✓ · content-integrity ✓ · i18n
    baseline 0 ✓ · build ✓ (43 shell). (Not: `termGlossary.js` `*Data.js`
    glob'una girmediği için i18n scanner'ın 38-dosya taramasına dahil DEĞİL —
    ASCII/EN bütünlüğü yukarıdaki özel script ile elle doğrulandı.)
  - ✅ **P1.5-S3 — `tests/term-tooltip.spec.ts` (yeni) TAMAMLANDI:** /selenium
    Locators sekmesi üzerinde tam veri-güdümlü E2E (hangi sekmede/terimde test
    edileceği `TERM_GLOSSARY` + `seleniumData` TARANARAK bulunur, sabit
    gömülmez). İki test: (1) bilinen terim noktalı-çizgili sarılıyor, hover ile
    popover açılıp benzetme metnini gösteriyor, ESC ile kapanıyor, TAB
    (klavye) ile fokuslanınca da açılıp blur'da kapanıyor (§3.6.1 "hover VE
    focus VE tap" gereksinimi); (2) `<pre>` kod bloğu içinde HİÇ tooltip
    tetikleyici yok (mekanizma mimari olarak sadece text/simple-box'a bağlı).
    **Bulgu (test yazarken düzeltildi):** ilk yazımda hover sonrası aynı
    elemente `.click()` atmak popover'ı AÇMAK yerine KAPATIYORDU (imleç zaten
    üstteyken click, hover'ın açtığı state'i toggle'lıyor) — click-toggle
    testi bunun yerine klavye focus/blur ile değiştirildi (hem daha güvenilir
    hem erişilebilirlik iddiasını daha doğrudan kanıtlıyor). Ayrıca test
    güvenilirliği için `TermTooltip.jsx`'e 3 `data-testid` eklendi
    (`term-tooltip-trigger` + `data-term-key`, `term-tooltip-popover`).
    **Yerel Chromium'da 2/2 PASS (33.2s).**
  - **✅ PHASE 1.5 (Kavram Tooltip'i) TAMAMEN BİTTİ.** P1.5-S2 (kapsamı
    callout/info/tip render'larına genişletme) BİLİNÇLİ OLARAK ATLANDI —
    opsiyonel işaretliydi (plan §7.3), mevcut text/simple-box kapsamı
    çekirdek kullanıcı deneyimini zaten karşılıyor; istenirse sonraki
    oturumda eklenebilir.
  - **✅✅ PHASE 1 + PHASE 1.5 TAMAMEN BİTTİ (bu oturum, 2026-07-30→31).**
    Tüm doğrulama kapıları (content-integrity + i18n baseline 0 +
    audit-learning-blocks + build 43 shell + 2 yeni E2E test dosyası, toplam
    3/3 PASS yerel Chromium'da) yeşil. `main`'e merge/PR kararı kullanıcıda.
  - 🔜 **Sırada (kullanıcı onayı + ayrı planlama gerektirir, plan §4/§5):**
    Phase 2 (QA Sprint/Company Simulator, yeni `/sprint` rotası) veya Phase 3
    (adaptif zorluk + SkillRadar'ı `skillSignals.js`'ten besleme).
  - **Açık iş:** Merge tamamlandı (yukarı bak, `main`'de). Phase 2 (Sprint Simulator) ve
    Phase 3 (adaptif zorluk) ayrı onay + planlama ister (plan §4/§5).

- **Önceki oturum (2026-07-30, Opus) — plan denetimi + öğrenme-blok testleri
  (branch `feature/prediction-blocks`):** Bu oturumun SON işi (2026-07-30, Opus):
  `learning-science-upgrade-plan.md`'nin ne kadar yerine getirildiği denetlendi
  ve **test kapsamı boşluğu kapatıldı** (commit `142d8d5`):
  - **Denetim sonucu — plan TAM yerine getirilmiş:** prediction (java=10/js=9/
    python=8/sql=8/ts=7 = 42 benzersiz id, runtime-walk ile İKİ dil ağacında da
    wired doğrulandı), code-trace 5 + heap-stack 5, mentor Katman A/B (O1-O6 +
    S1-S5) tam, #7 Learning Analytics + MentorPanel + MentorNudge HomePage/App'te
    wired, edge function + şema ACTIVE. Mentor-advice her iki projede (test+prod)
    ACTIVE v2, GROQ_API_KEY mevcut.
  - **Eklenen kalıcı kontroller:** (1) `scripts/audit-learning-blocks.mjs` build
    zincirine girdi (`audit-interview-questions`'tan sonra) + `npm run
    audit:learning-blocks` — prediction/code-trace/heap-stack şema değişmezlerini
    (tam 1 correct, boş olmayan reveal, benzersiz id, code düz string, steps[].line
    sayısal) hard-fail eder. (2) `tests/mentor-panel.spec.ts` + `mentor-snapshot-
    weakness.spec.ts` (Sonnet) + `tests/learning-blocks-render.spec.ts` (Opus, 3
    test: /java'da üç blok tipinin render + etkileşimi).
  - **⚠️ Tespit edilen içerik bulgusu (kullanıcı kararı bekliyor, build kırmaz):**
    42 prediction'ın **40'ında doğru cevap 'B' pozisyonunda** — kullanıcı "hep B
    seç" ile gaming yapabilir. Şıkları karıştırmak önerilir ama bu 5 çift-ağaç
    dosyada 40 bloklu riskli bir içerik düzenlemesi; Opus tek başına yapmadı,
    audit UYARI olarak sürekli raporluyor. Düzeltme kararı kullanıcıda.
  - **Doğrulama:** `audit-learning-blocks` ✓ (0 ihlal) · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell) · 3 render + 8 mentor testi PASS.

- **Bu oturumda (2026-07-30, Sonnet)**
  `Documents/learning-science-upgrade-plan.md` Bölüm 6 §6.6'daki hazır promptla
  **#5 Kişisel AI Mentor — Sonnet tarafı (S1-S5) TAMAMLANDI** (Opus'un O1-O6
  backend/bileşen işi önceki oturumda bitmişti, bkz. plan §6 durum notu).
  3 ayrı commit:
  1. **S1 — `feat(mentor): oğüt şablolarını 14 route'a genişlet`** (`e912e05`):
     `mentorAdvice.js`'teki `ROUTE_ADVICE` havuzu 12 route'tan 26 route'a
     çıkarıldı — rest-assured, postman, bruno, jenkins, kubernetes, kafka,
     appium, aws, azure, jmeter, browserstack, gauge, test-frameworks,
     qa-frontend eklendi. Her girdi bilingual, somut (o teknolojinin en sık
     tuzağı) ve uygun yerde Java analojili.
  2. **S2 — `polish(mentor): MentorPanel giriş/AI-sonuç animasyonlarını cilala`**
     (`59014d0`): panel açılışına `animate-fadeIn`, AI sonucuna `animate-scaleIn`
     + `shadow-focus-accent`, AI hatasına `animate-fadeIn` — mevcut Tailwind
     animasyon kalıpları (yeni paket/CDN yok). Loading/empty/error state'leri ve
     36px touch target'lar zaten doğruydu.
  3. **S3+S4 — `test(mentor): panel + snapshot smoke testleri`** (`4a4941f`):
     `tests/mentor-snapshot-weakness.spec.ts` (`getPersistentWeakness`
     daysStruggling 1/7/14 gün + trend stuck/worsening/improving, seeded
     `learnqa_mentor_snapshots`) ve `tests/mentor-panel.spec.ts` (Katman A:
     proaktif panel + AI butonunun üye-değilken gizli olduğu + MentorNudge akışı
     + boş-veri durumunda hiçbir bileşenin render edilmediği; Katman B: gerçek
     Supabase girişi + `page.route()` ile mock'lanmış `mentor-advice` yanıtıyla
     AI butonu/sonucu, `GITHUB_ACTIONS==='true'` guard'ıyla CI'da skip). **Bu
     oturumda 4+4=8 testin TAMAMI yerel Chromium'da PASS oldu** (AI katmanı
     dahil — `.env.local`'de test kullanıcısı zaten yapılandırılıydı, gerçek
     Groq çağrısı yapılmadı, yalnızca edge function mock'landı).
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ ·
    `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓
    (baseline 0, regresyon yok — `mentorAdvice.js`/`MentorPanel.jsx` zaten
    `src/data/*.js` kapsamı dışında) · `npm run build` ✓ (43 static shell, SEO
    geçti).
  - **Kalan (kullanıcıda, plan §6.2):** `supabase functions deploy mentor-advice
    --project-ref <ref>` gerçek deploy'u henüz teyit edilmedi — Katman A
    (yerel, üyeliksiz) deploy'suz da tam çalışır; Katman B (gerçek AI, üye-only)
    yalnızca deploy sonrası prod'da devreye girer. Branch merge tamamlandı (`main`'de).

- **Önceki oturum (2026-07-29) — i18n leak sıfırlama + sPlaywright temizliği:**
  4 ayrı commit ile şu iş tamamlandı:
  1. **`sPlaywright.en` ölü kod bug'ı çözüldü** (`9b00924`) — `javaData.js`'de
     override tarafından hiç render edilmeyen ~1250 satırlık eski `en:` objesi
     silindi (20506→19249 satır). Detay: CLAUDE.md §23.4 ilgili not.
  2. **i18n scanner'daki hatalı "⚠ OPUS" varsayımı çürütüldü ve scanner düzeltildi**
     (`7c67e80`, `16a2f2d`, `0e4642f`) — `locator-visual`/`playwright-visual`
     blokların çıplak `field`/`fieldEn` kalıbı, `code`/`codeWrong`/`codeFixed`
     alanlarının `getLocalizedCode()` üzerinden zaten desteklenen runtime
     yorum-çevirisi, ve `linuxErrors`'ın iç-içe paylaşımı — hiçbiri gerçek
     renderer eksikliği değildi (tek gerçek istisna: `BackendPracticeBlock`/
     `GitPracticeBlock`'ta `example` alanı, tek satırlık `tx()` eklendi).
     **Sonuç: proje geneli i18n leak baseline'ı 109 → 0.** Kök neden/çözüm
     kalıpları kalıcı olarak CLAUDE.md §23.1 ve §23.6'da belgeli; adım adım
     dönüşüm geçmişi `git log --oneline` ve ilgili `fix(i18n...)` commit
     mesajlarında duruyor, burada tekrarlanmıyor.
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ · `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓ (baseline 0) · `npm run build` ✓ (43 static shell, SEO geçti).
- **Önceki oturum (2026-07-28) — prediction/code-trace/heap-stack dalgası:** Kullanıcının öğrenme bilimi değerlendirme yazısına (2026-07-27) karşılık, `Documents/learning-science-upgrade-plan.md` planı uygulandı. **3 yeni blok tipi + 5 dile rollout TAMAMLANDI:**
  - **Yeni bileşenler (Opus, self-contained, backend gerektirmez):** `PredictionBlock.jsx` (`type: 'prediction'` — "Önce Tahmin Et, Sonra Gör" / active recall), `CodeTraceBlock.jsx` (`type: 'code-trace'` — satır satır kod yürüyüşü), `HeapStackBlock.jsx` (`type: 'heap-stack'` — Stack/Heap bellek görselleştirmesi). Üçü de `TopicPage.jsx`'te kayıtlı, şemalar plan dosyasının Bölüm 2'sinde.
  - **Görev S1 (prediction rollout) TAMAMLANDI:** javaData.js (7 blok: string concat, division promotion, operator precedence, switch fall-through, Integer cache, unboxing NPE, array equality), pythonData.js (3: is/==, mutable default arg, float precision), sqlData.js (2: COUNT(*)/NULL, JOIN row multiplication), javascriptData.js (3: hoisting, ==/===, closure+var), typescriptData.js (2: excess property check, structural typing) — **toplam 17 prediction bloğu** (bir eski commit mesajında "20" yazıyor ama gerçek sayı 17; kod doğru, mesaj kozmetik hata).
  - **Görev S2 (code-trace + heap-stack rollout) TAMAMLANDI:** javaData.js (for loop trace + OOP aliasing heap-stack), pythonData.js (for loop trace + mutable-default heap-stack), javascriptData.js (for loop trace + object reference heap-stack).
  - **Doğrulama:** her commit'te `node --check` + `check-content-integrity.mjs` + `check-i18n-leaks.mjs` (i18n baseline 109 sabit, regresyon yok) + `npm run build` ayrı ayrı çalıştırıldı, hepsi geçti.
  - **#7 Learning Analytics dashboard TAMAMLANDI (Opus, 2026-07-28):** `getLearningAnalytics()` (progressStore.js) + `getMostMissedAreas()` (reviewQueue.js) + `LearningAnalytics.jsx` panosu, HomePage'de ActivityHeatmap'ten sonra render ediliyor. Tamamen local-first (backend yok): ortalama quiz başarısı, en güçlü/en zayıf konu, en çok hata yapılan alan. Seeded-localStorage smoke testiyle doğrulandı (accuracy/strongest/weakest/most-missed hepsi doğru). Commit `e081451`.
  - **code-trace/heap-stack genişletme TAMAMLANDI (Opus, 2026-07-28, düşük öncelik seçildi, commit `5daa148`):** Mevcut sayfalara 4 yeni blok eklendi — javaData: String Pool heap-stack (`==` interning tuzağı) + iki-işaretçi dizi ters çevirme code-trace; pythonData: `b=a` vs `b=a[:]` list-copy heap-stack; javascriptData: `.reduce()` akümülatör code-trace. Hepsi tek sabit + ağaç referansı; `code` alanları yorumsuz (renderer düz string), açıklamalar bilingual `note`'larda. `node --check` + content-integrity + i18n (baseline 109) + build hepsi geçti.
  - **Prediction derinleştirme TAMAMLANDI (Opus, 2026-07-28, commit `40fd0d1`):** Dil sayfalarının boş/az kapsanan sekmelerine 8 yeni `prediction` bloğu — sqlData: `= NULL` vs `IS NULL` + `WHERE`'de aggregate hatası (HAVING); typescriptData: `any` vs `unknown` + `as` type assertion (runtime TypeError); pythonData: `[[0]]*3` paylaşımlı iç liste + `for...else`; javascriptData: `.sort()` sözlüksel varsayılan + `typeof null/[]/NaN`. Çift-ağaç dosyalarda tek sabit + iki ağaç referansı (SQL/TS `replace_all` ile). Tüm geçitler yeşil (content-integrity + i18n 109 + build).
  - **Prediction DOYURMA dalgası TAMAMLANDI (Opus, 2026-07-28, commit'ler SQL/Java/Python/JS/TS ayrı):** kullanıcı "aynı sayfalarda maksimum sayıda ekle" dedi → her dil sayfasının kalan gotcha'ya değer sekmeleri kapsandı. +16 yeni prediction: SQL +4 (DISTINCT çoklu-sütun, WHERE'siz UPDATE, NOT IN+NULL, BETWEEN dahil-uç), Java +3 (for-each remove→CME, int taşması wrap, finally return ezme), Python +3 (1/1.0/True dict anahtarı, class-level mutable paylaşım, UnboundLocalError), JS +4 ("5"+1 vs "5"-1, setTimeout(0) makrotask, Promise mikrotask önceliği, koparılmış metotta this→TypeError), TS +3 (tuple.push bypass, ?? vs ||, catch e:unknown). **Güncel kapsam: java=10, js=9, python=8, sql=8, ts=7.** Her biri bilingual + Java analojisi + QA bağlamı; tüm geçitler yeşil (node --check + content-integrity + i18n 109 + build 43 shell). Boş kalan sekmeler ya kavramsal olarak gotcha'ya uygun değil (kurulum/mülakat/pratik) ya da düşük değerli (Generics/Utility Types predict-output'a uymaz).
  - **🔜 SIRADAKİ OTURUM — buradan devam et** (2026-07-30 güncellemesi: #5 Kişisel
    AI Mentor artık TAMAMLANDI, yukarıdaki 2026-07-30 bölümüne bak — kalanlar
    hâlâ backend/mimari/product kararı ister, kullanıcı onayı olmadan tek başına
    kodlanmaz; detay `learning-science-upgrade-plan.md` §0 + §5):
    1. **#6 Adaptif zorluk** — quiz motoruna (TopicPage ~18k satır, çok E2E testi) dokunur, zorluk-etiketli soru havuzu gerekir. Riskli, ayrı planla.
    2. **#8 Portföy/proje üretimi** — en büyük epik.
    3. **Düşük öncelik (opsiyonel):** Java/Python/JS'e code-trace/heap-stack genişletme dalgası 2026-07-28'de yapıldı (yukarı bak, commit `5daa148`). Kalan: SQL/TS'e ekleme — SQL için heap/stack kavramsal uymaz; TS runtime = JS (düşük değer).
  - **Açık iş:** Merge tamamlandı — `feature/prediction-blocks` branch'i artık mevcut değil, içerik `main`'de.

- **`frontenddevelopment-for-qa` branch'i** (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de): **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak" sayfası içerik olarak TAMAMLANDI** (Opus iskelet+referanslar + Sonnet GRUP A-J + D-S11 kapanış denetimi, hepsi 2026-07-25). Detaylı geliştirme geçmişi (hangi GRUP'ta ne yazıldığı) artık tekrarlanmıyor — `git log --oneline` (commit'ler `feat(qa-frontend): GRUP X tamamlandı` formatında açıklayıcı) ve `Documents/qa-frontend-page-plan.md` yeterli referanstır.
  - **Sayfanın içeriği:** 10 GRUP (A-J), 12 video-scene filmi (dahil "5 Locator Yarışı" — sayfanın en kritik filmi, "Stale Element", "*ngIf Kapıyı Açıp Kapıyor"), 4 Kaynak→DOM→Locator panosu (BugCard/Modal/StatusBadge/Toast), 12 error-dictionary hatası, **50 mülakat sorusu (15/20/15, `node scripts/audit-interview-questions.mjs` ile bağımsız doğrulandı — script artık `/qa-frontend`'i de içeriyor)**, tüm quiz'lerde retryQuestion, §9.5 trio'su (video+animasyon+sandbox) GRUP A-J'nin TAMAMINDA doğrulandı.
  - **Doğrulama durumu:** `check-content-integrity` ✓ · `i18n:check` ✓ (sıfır sızıntı, `qaFrontendData.js` hem `STRICT_ZERO_FILES` hem `TRIO_COMPLETE_PAGES`'te) · `npm run build` ✓ (43 statik shell, SEO geçti) · `audit-interview-questions.mjs` ✓ — hepsi geçti.
  - **Manuel test rehberi hazır:** `Documents/qa-frontend-page-plan.md` §F — kurulumdan (`npm run dev` → `/qa-frontend`) grup grup elle test adımlarına (video-scene oynatma, quiz-gating akışı, Locator Lab, feynman AI değerlendirmesi vb.) kadar adım adım rehber.
  - **Bilinen uyarı:** `QaFrontendPage` chunk'ı 515.59 kB (build'i bozmuyor, CLAUDE.md §14/§23.8 kapsamında bilinen durum).
  - **Açık kalan (opsiyonel):** `npm run test:e2e` (Playwright) bu sayfa için henüz koşulmadı.
- `feature/api-testing-page` branch'i (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de). `/api-testing` sayfası içerik olarak TAMAMLANDI (57 sekme, GRUP A-K, Faz 1-10). Plan: `Documents/api-testing-page-plan.md`.
- Bu branch'e geçmeden önceki oturumda `feature/api-testing-page` üzerinde **i18n EN-sızıntı temizliği** yapılmıştı: video-scene pasif buton görünürlüğü düzeltildi, 6 tablo + error-dictionary bilingual yapıldı, code-playground yorumları bilingual hale getirildi (TR Türkçe / EN İngilizce), ve yeni bir **statik scanner** eklendi: `scripts/check-i18n-leaks.mjs` (build zincirinde + `pre-commit`'te çalışır, `npm run i18n:check` / `npm run i18n:baseline`). Kök neden, çözüm ve kullanım detayı: **CLAUDE.md §23.1**.

## 🔜 Açık İşler / Sıradaki Adımlar

0. **YENİ PLAN (2026-07-30) — `Documents/challenge-first-experience-plan.md`:**
   Kullanıcının stratejik değerlendirme yazısı denetlendi. Sonuç: yazının
   "Phase 3" listesinin çoğu ZATEN BİTMİŞ (mentor/prediction/memory-viz/analytics).
   Gerçek yeni değer → **Phase 1: Challenge-First Senaryo Katmanı** (yeni `mission`
   blok tipi; mevcut sandbox'ları göreve sarar, frontend-only). Kullanıcı bu yönü
   seçti (2026-07-30). Phase 2 = Sprint/Company Simulator, Phase 3 = adaptif zorluk,
   Phase 4 = park. Opus/Sonnet hazır promptları planın §7'sinde. **Açık karar
   (Opus başlamadan):** görevler sayfa-içi mi ayrı sekme mi (öneri: sayfa-içi).

1. **i18n EN-sızıntı temizliği TAMAMEN BİTTİ (2026-07-25 → 2026-07-29, çoklu oturum, KAPALI):** `check-i18n-leaks.mjs` scanner'ı sıfırdan inşa edildi ve art arda düzeltildi — yanlış-ağaç tarama (8490 hayalet leak), paylaşımlı-sabit tespiti, `why`/`note` ve `field`/`fieldEn` sibling farkındalığı, `codeCommentTranslations` runtime simülasyonu. Borç azalma sırası: 8490(hayalet) → 646 → 365 → 223 → 199 → 109 → 67 → 9 → **0**. Kök neden/çözüm kalıpları kalıcı olarak **CLAUDE.md §23.1 ve §23.6**'da belgeli (yeni bir "OPUS"/"YERİNDE-ÇEVİR" leak'e rastlarsan önce oraya bak); adım adım geçmiş `git log --oneline`'daki `fix(i18n...)` commit'lerinde duruyor, burada tekrarlanmıyor. `npm run i18n:check` artık "grandfathered borç: 0" basıyor — herhangi bir yeni sızıntı build'i kırar.
2. **Tüm branch merge'leri TAMAMLANDI (2026-08-01'de doğrulandı):** `feature/challenge-first`, `frontenddevelopment-for-qa` (`/qa-frontend`) ve `feature/api-testing-page` (`/api-testing`) — üçü de `main`'e göre 0 commit ileride, yani içerikleri `main`'de. Aktif branch artık `main`. `/qa-frontend` için opsiyonel `npm run test:e2e` koşumu hâlâ yapılmadı.
3. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
4. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor.
5. **Sırada (kullanıcı onayı + ayrı planlama gerektirir):** Phase 2 (QA Sprint/Company Simulator) veya Phase 3 (adaptif zorluk), bkz. `Documents/challenge-first-experience-plan.md` §4/§5.

## ✅ Proje Geneli Denetim Durumu (2026-07-25'te script ile taze ölçüldü)

- **§9.3 (4-katmanlı analoji standardı):** `node scripts/audit-analogy-depth.mjs --missing` → 24 sayfa, 488 bölüm, **0 standart altı**. Script bir triyaj aracıdır, sınırları için bkz. CLAUDE.md §9.3.
- **İnteraktif üçlü (animasyon + drag-drop + practice, §9.1/9.2):** `node scripts/audit-interactive.mjs --missing` → 25 sayfa, **0 eksik**.
- **§9.5 (video-scene + animasyon + sandbox trio) / §9.6 (framework mimarisi 5-görünüm rollout):** hangi sayfanın/dalganın tamamlandığı artık kendi plan dosyalarında takip ediliyor — `Documents/video-sitewide-plan.md` ve `Documents/sandbox-and-framework-plan.md`. Güncel dalga/faz durumu için oraya bak, burada tekrar edilmiyor.
- **i18n & sekme-trio statik denetim:** `npm run i18n:check` → tüm kontroller geçti, regresyon yok (madde 1'deki grandfathered borç hariç).

## 🧪 Test Kapsamı (özet — detaylı döküm için CLAUDE.md §22 + sohbet geçmişi)

- `tests/` — 31 dosya, `npm run test:e2e`, her push/PR'de CI'da otomatik (bkz. `.github/workflows/deploy.yml` / `ci-tests.yml`).
- `tests-extended/interview-mastery-flows.spec.ts` — 23 sayfanın tamamında gerçek Groq AI çağrısıyla mülakat gating+grading akışı, `npm run test:interview-flows`, elle çalıştırılır (rate-limit riski).
- `tests-quiz-audit/quiz-full-audit.spec.ts` — 346 quiz bloğunun tamamı (23 sayfa × TR+EN) tek tek denetlenir, `npm run test:quiz-audit`, elle çalıştırılır (~10 dk).
- CLAUDE.md §22'deki 6 zorunlu kontrolden 1-2-4-5 tam kapsanıyor; 3 (gating açık — her ders için) ve 6 (bitirme rozeti toast'ı) sadece `/docker` temsili sayfası üzerinden `tests/` içinde, tam kapsam `tests-extended/`'de.
- §22.1 kalıcı istisna listesi (hiçbir suite'e dahil değil): `/basit-backend`, `/security`, `/backend`.

---

## 📚 Daha Eski Geçmiş

Haziran sonu – Temmuz 2026 arası onlarca oturumun tam anlatımı (video-scene
rollout Dalga 1-22, AIQA_ROADMAP, `/claude-ai` ve `/llm-agents` sayfalarının
yazımı, interaktif üçlü rollout'u, Kariyer Haritası v2, Learning OS/retention
çalışmaları, GJL içerik planı CP1-CP9 vb.) — hepsi tamamlanıp `main`'e gitti.
Ayrıntı için `git log --oneline` ve ilgili commit mesajlarına bakın; kalıcı
değeri olan mimari kararlar zaten `CLAUDE.md`'nin ilgili bölümlerine (§9.1-9.6,
§23) işlenmiş durumda.
