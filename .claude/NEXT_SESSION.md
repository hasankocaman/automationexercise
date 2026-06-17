# NEXT SESSION — Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan tekrar açıklama isteme. Bu dosya hem **içerik/feature**
> hem **SEO/routing/deploy** durumunu tek yerde takip eder — `codexSeo.md`
> artık sadece SEO'nun kalıcı kural/mimari referansıdır, durum günlüğü
> değildir. Git commit hash gibi anlık bilgiler SADECE burada yazılır,
> `CLAUDE.md`/`AGENTS.md`/`codexSeo.md`'ye yazılmaz (bkz. `CLAUDE.md` Bölüm 0).

---

## 🎯 AKTİF FELSEFE

**"Gör, Anla, Dene ve Test Et."** — Her konu için:
1. **Animasyonlu simülasyon** (önce gör)
2. **DOM / state görselleştirme** (arka planda ne oluyor)
3. **Otomasyon kodu** (nasıl test ederim)

---

## 🌐 CANLI DEPLOYMENT BİLGİLERİ (2026-06-16)

| Alan | Değer |
|------|-------|
| **Canlı URL** | https://learnqa.dev |
| **Hosting** | Netlify (ücretsiz tier, private repo destekler) |
| **Netlify subdomain** | https://sprightly-cactus-c9482b.netlify.app |
| **Domain registrar** | Porkbun — yenileme $12.87/yıl (2027-06-16) |
| **GitHub repo** | https://github.com/hasankocaman/automationexercise (public) |
| **Eski URL** | https://hasankocaman.github.io/automationexercise/ → learnqa.dev'e yönlendirir |

### Deploy Akışı
- `git push origin main` → Netlify otomatik build + deploy eder (~18 saniye)
- GitHub Pages: sadece `learnqa.dev`'e yönlendiren tek HTML sayfası yayınlar
- `DEPLOY.md` dosyasında tüm kurulum adımları belgelenmiştir

### Kritik Yapılandırma
- `vite.config.js` → `base: '/'` (Netlify için, GitHub Pages'den değiştirildi)
- `netlify.toml` → build config + SPA redirect kuralı
- `.github/workflows/deploy.yml` → artık sadece redirect HTML deploy eder (build yok)

---

## ⚠️ GÜNCEL DURUM — GIT, SEO, STRAY DOSYALAR (2026-06-17 itibarıyla doğrulandı)

**Bu bölüm önemli — her oturum başında oku, üstüne yaz/güncelle.**

### Git durumu
- **Son local commit:** `7f526fd feat: add Cypress page, beginner/advanced Algorithms pages, and Manual Testing workshop`. Kullanıcı onayıyla commit edilip **push edildi** — local ve origin/main senkron.
- Bu commit, Codex'in önceki bir oturumda ürettiği `/algorithms` (`AlgorithmsPage.jsx`, `beginnerAlgorithmsData.js`), `/advanced-algorithms` (`AdvancedAlgorithmsPage.jsx`, `algorithmsData.js`) ve `/manual-testing` (`ManualTestingPage.jsx`, `manualTestingData.js`, locale girişleri) sayfalarıyla, Claude Code'un bu oturumda ürettiği `/cypress` sayfasını (10. kısım, aşağıda) TEK commit'te birleştirdi — kullanıcı "sorun yoksa NEXT_SESSION.md güncelle, commit ve push" dedi, ayrı ayrı commit istemedi.
- Push edilen commit zinciri (önceki oturum): `755f81a` (Java mülakat fix) → `fb9e3b0` (`/what-is-testing` sayfası + Site Haritası) → `7f526fd` (bu oturum — Cypress + Algorithms + Manual Testing, detay yukarıda).
- Netlify otomatik build tetiklendi (~18sn) — bir sonraki oturumda `https://learnqa.dev/cypress`, `/algorithms`, `/advanced-algorithms`, `/manual-testing` canlıda doğrulanmalı.
- **Dokunulmayan yerel dosya:** `.claude/settings.local.json` untracked görünüyor; bu oturumda dokunulmadı.

### SEO/routing altyapısı — gerçek ve commit'li
`BrowserRouter` (`src/main.jsx`), `src/components/SeoMeta.jsx`, `scripts/check-seo.mjs`, `scripts/check-dist-seo.mjs`, `scripts/generate-seo-files.mjs` committed ve push'lu. `/algorithms`, `/advanced-algorithms`, `/manual-testing` ve `/cypress` route'ları artık `7f526fd` ile `App.jsx`, `src/utils/seo.js`, `scripts/generate-static-routes.mjs`, `public/sitemap.xml` ve `src/utils/searchIndex.js` zincirine commit'li/push'lu şekilde bağlı. `npm run build` **25 route** için SEO/static shell kontrolünü başarıyla geçiriyor. Mimari detayları `codexSeo.md`'de (kalıcı referans olarak).

**SEO canlı doğrulama durumu — bir sonraki oturumda tekrar kontrol edilmeli (push yeni yapıldı):**
- `https://learnqa.dev/robots.txt` ve `/sitemap.xml` 200 dönüyor mu?
- `https://learnqa.dev/cypress`, `/algorithms`, `/advanced-algorithms`, `/manual-testing` canlıda doğru render oluyor mu? (ilk kez bu push ile canlıya çıkıyor)
- `https://learnqa.dev/test-frameworks.html` → `/test-frameworks` 301 ile yönleniyor mu? (`e6d1dd9`'da eklendi)
- `https://learnqa.dev/comparison.html` → `/test-frameworks` 301 ile yönleniyor mu?
- **Henüz yapılmamış (hesap yetkisi gerektirir):** Google Search Console domain property + DNS verification + sitemap submission + URL Inspection. Checklist: `codexSeo.md` → "Google Search Console — Tekrar Kullanılabilir Checklist".

### Stray/uncommitted dosyalar
Önceki oturumlardan kalan, hiçbir yerden import/referans edilmeyen üç grup dosya 7. kısım sonunda kullanıcı onayıyla silinmişti: paralel TSX rewrite, tek-seferlik içerik script'leri ve kök `documents/` duplikasyonu. `/algorithms`, `/advanced-algorithms`, `/manual-testing` ve `/cypress` artık `7f526fd` ile commit'li — stray değiller. Tek kalan untracked dosya `.claude/settings.local.json` (yerel ayar dosyası, dokunulmadı).

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 10. kısım — Cypress sayfası, drag-order block, time-travel simülasyonu)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `CLAUDE.md` ve `.claude/NEXT_SESSION.md` okundu, kullanıcıya güncel durum özetlendi. Kullanıcı yeni bir Cypress sayfası istedi: örnekler, görseller, animasyonlar, gerekirse drag-and-drop ile aktif öğrenme, gerçek hayat örnekleri. | ✅ |
| **Yeni route ve sayfa:** `/cypress` eklendi — `src/components/CypressPage.jsx` (Playwright sayfası kalıbını taklit eder), `src/data/cypressData.js` (yeni dosya, ~1850 satır). `src/App.jsx`, `src/utils/seo.js`, `src/utils/searchIndex.js`, `scripts/generate-static-routes.mjs` ilgili girişlerle güncellendi. | ✅ |
| **İçerik kapsamı — 11 sekme (TR+EN ayrı yazıldı):** Cypress Nedir/Mimari, Kurulum, Temel Komutlar & Selector, Aksiyonlar & Drag-Drop, Zaman Yolculuğu & Retry-ability, Network & cy.intercept(), Gerçek Hayat, Ekosistem, Cypress vs Selenium vs Playwright, Yaygın Hatalar (10 hata, `error-dictionary`), 50 Mülakat Sorusu (15 Basic + 20 Intermediate + 15 Advanced, CLAUDE.md Bölüm 10 kuralına uygun, her cevapta Java karşılaştırması inline). | ✅ |
| **Yeni interaktif block tipi: `drag-order`** (`TopicPage.jsx`, yeni `DragOrderBlock` komponenti) — kullanıcı native HTML5 drag-and-drop VEYA tıkla-değiştir (touch-uyumlu) ile karışık komut kartlarını doğru sıraya diziyor; "Sırayı Kontrol Et" ile satır satır doğru/yanlış geri bildirim, doğru olunca tamamlanan kod bloğu gösteriliyor. Aksiyonlar sekmesinde Cypress login testi kurma alıştırması olarak kullanıldı — kullanıcının "drag and drop ile aktif öğrenme" talebini doğrudan karşılıyor. | ✅ |
| **Yeni `simulation` senaryosu: `cypress-time-travel`** (`TopicPage.jsx`, `renderCypressTimeTravelPlayground` + `renderDomVisualizer` case) — Cypress Test Runner command log'unu taklit eden bir "▶ Run" düğmesi, adım adım yeşil tikleyen komutlar ve test bitince geçmiş bir komuta tıklayınca sağdaki mini-browser panelinin o anki DOM durumuna ("time travel") geri sarması. Cypress'in en ayırt edici özelliğini gerçekten interaktif gösteriyor. | ✅ |
| **`drag-drop` senaryosu yeniden kullanıldı:** Selenium sayfasındaki mevcut generic `drag-drop` DOM-event simülasyonu, Cypress'in native HTML5 drag-and-drop ile yaşadığı gerçek bir sorunu (sentetik event tetikleme, `.trigger()`/`cypress-real-events` çözümü) anlatmak için Aksiyonlar sekmesinde tekrar kullanıldı — yeni bileşen yazmadan gerçek bir Cypress gotcha'sını gösterdi. | ✅ |
| **Doğrulama — `npm run build`:** `check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo` zinciri 25 route için başarıyla geçti, `cypressData` ayrı bir chunk olarak (~140KB) doğru code-split edildi. | ✅ |
| **Doğrulama — tarayıcı (Playwright script, `@playwright/test` zaten devDependency):** `npm run dev` ile dev server başlatıldı, `/cypress` ziyaret edildi: 0 console/page hatası. Drag-order alıştırmasında iki kart değiştirilip "Sırayı Kontrol Et"e basıldı — yanlış sıra kırmızı X ile doğru tespit edildi. Zaman Yolculuğu sekmesinde "▶ Run" tıklanıp simülasyon sonuna kadar izlendi (7/7 komut yeşil tik), sonra `cy.visit('/login')` satırına tıklanarak time-travel test edildi — sağ panel dashboard'dan login formuna doğru şekilde geri sardı. Dil değiştirme (TR→ENG) doğrulandı, içerik tam İngilizce render oluyor. Geçici doğrulama script'leri ve screenshot'lar temizlendi, repoya commit edilmedi. | ✅ |

> **Yeni dosyalar:** `src/components/CypressPage.jsx`, `src/data/cypressData.js`.
> **Düzenlenen paylaşılan dosyalar:** `src/App.jsx`, `src/utils/seo.js`, `src/utils/searchIndex.js`, `scripts/generate-static-routes.mjs`, `src/components/TopicPage.jsx` (sadece ekleme — mevcut block/scenario'lara dokunulmadı).
> **Bug fix (kullanıcı tespit etti):** `HomePage.jsx`'teki "Test Araçları" kartında Cypress butonu hâlâ eski bağımsız siteye (`https://hasankocaman.github.io/teach-Cypress/`, `<a href>`) gidiyordu — yeni `/cypress` sayfası eklenmesine rağmen bu link güncellenmemişti. `<Link to="/cypress" data-testid="nav-cypress">🌲 Cypress</Link>` olarak düzeltildi, diğer dahili linklerin (Selenium, Playwright, REST Assured) kalıbına uyduruldu. `npm run build` tekrar başarılı (25 route).
> **Commit/push (sonradan eklendi):** Kullanıcı "Codex manuel test ve algoritma sayfalarını da geliştirdi, sorun yoksa NEXT_SESSION.md güncelle, commit ve push" dedi. Tüm çalışma ağacı (Cypress + Algorithms + Manual Testing) `7f526fd` tek commit'inde birleştirilip push edildi — kullanıcı ayrı commit istemedi.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 9. kısım — Manuel test interaktif öğrenme sayfası)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `CLAUDE.md` ve `.claude/NEXT_SESSION.md` okundu. Güncel durum özetlendi: canlı site Netlify'da, son push `fb9e3b0`, çalışma ağacında önceki `/algorithms` ve `/advanced-algorithms` değişiklikleri ile yerel/untracked dosyalar var. Kalıcı kural dosyalarına (`CLAUDE.md`, `AGENTS.md`, `codexSeo.md`) anlık durum yazılmadı. | ✅ |
| **Yeni route ve sayfa:** `/manual-testing` route'u eklendi. `src/components/ManualTestingPage.jsx` özel interaktif sayfa olarak oluşturuldu; içerik `src/data/manualTestingData.js` içinde TR/EN ayrı tutuluyor. | ✅ |
| **İçerik kapsamı:** Manuel test bakış açısı, test case yazımı, exploratory testing, bug report, severity/priority etkisi ve regression/smoke kararları gerçek hayat örnekleriyle anlatıldı. Her derste Java analojisi var: JUnit Arrange/Act/Assert, stack trace, exception impact, test suite/regression benzetmeleri. | ✅ |
| **Görsel ve aktif öğrenme:** Observe → Compare → Report → Retest akış animasyonu, checkout/bug/severity görselleri, risk checklist oyunu, login test case sıralama drag/drop + yukarı/aşağı kontrolleri, risk rotası seçimi, bug report tamamlama, severity kartlarını kolonlara taşıma/seçme ve final mini quiz eklendi. | ✅ |
| **Ana sayfa entegrasyonu:** HomePage öğrenme yolu kartlarına "Manuel Test Atölyesi / Manual Testing Workshop" kartı eklendi. Test Araçları kategorisine `/manual-testing` linki eklendi, footer Test Araçları listesi ve teknoloji sayacı 22+ olarak güncellendi. | ✅ |
| **SEO/search/static entegrasyonu:** `src/utils/seo.js` içine `/manual-testing` metadata eklendi; `src/utils/searchIndex.js` ve `scripts/generate-static-routes.mjs` yeni data dosyasını okuyacak şekilde bağlandı. `public/sitemap.xml` build ile 25 route'a güncellendi. | ✅ |
| **Bug fix:** Browser doğrulamasında `Maximum update depth exceeded` uyarısı yakalandı. Oyun tamamlanma callback'i idempotent hale getirildi ve effect bağımlılıkları düzeltilerek tekrar eden state update döngüsü kaldırıldı. | ✅ |
| **UI düzeltmesi:** Kullanıcı geri bildirimiyle `/manual-testing` sağ alt home butonu geçici `H` metninden diğer sayfalardaki gibi `🏠` ikonuna çevrildi. | ✅ |
| **Doğrulama:** `npm run build` iki kez başarıyla geçti: `check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo`, toplam 25 route. Bilinen uyarılar devam ediyor: eski Browserslist/caniuse-lite verisi ve büyük `javaData` chunk uyarısı. | ✅ |
| **Browser doğrulaması:** In-app Browser ile `/manual-testing` doğrulandı. Desktop: doğru SEO title/description, 6 ders, 6 nav butonu, yatay taşma yok. Checklist oyunu tamamlanınca ilerleme 1/6 oldu; severity kartları doğru sınıflandırılınca ilerleme 2/6 oldu. Fresh console error/warn yok. Mobil 390px viewport'ta 6 ders/6 nav render oldu, yatay taşma yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 8. kısım — Algoritmalar görsel öğrenme sayfası)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `CLAUDE.md`, `.claude/NEXT_SESSION.md`, içerik/UI kuralları ve SEO mimarisi okundu. Güncel durum özeti kullanıcıya verildi: son push `fb9e3b0`, canlı site Netlify'da, önceki ana iş `/what-is-testing`, GSC/deploy canlı doğrulamaları hâlâ manuel/hesap yetkisi gerektiriyor. | ✅ |
| **Route ayrımı:** `/algorithms` artık sıfırdan algoritma temeli sayfası. Önceki gelişmiş QA algoritma atölyesi korunarak `src/components/AdvancedAlgorithmsPage.jsx` adıyla `/advanced-algorithms` route'una taşındı. Yeni başlangıç içeriği `src/data/beginnerAlgorithmsData.js`, ileri seviye içerik `src/data/algorithmsData.js` kaynaklarını kullanıyor. | ✅ |
| **Başlangıç seviyesi içerik ve etkileşim:** `/algorithms` hiç yazılım bilmeyen kullanıcı için 7 basit dersten oluşuyor: tarif/sıra, input-process-output, karar, loop, hafıza/variable, debug ve flowchart. Anlatım basit analojilerle kuruldu; her dersin görseli ve küçük oyunu var. | ✅ |
| **Görsel öğrenme oyunları:** Tost sırası kartları sürükle-bırak + yukarı/aşağı kontrolleriyle taşınabiliyor; input makinesi doğru girdiyi seçtiriyor; karar oyunu hava durumuna göre output üretiyor; loop oyunu 5 yıldızı yakıyor; memory oyunu skor kutusunu güncelliyor; debug oyunu yanlış adımı bulduruyor; flowchart oyunu eksik kutuyu seçtiriyor. | ✅ |
| **Ana sayfa entegrasyonu:** HomePage algoritma kartı ve Diller kategorisindeki `/algorithms` linki başlangıç seviyesine göre yeniden metinlendi (`Algoritma Temeli` / `Algorithm Basics`). Önceki glassmorphism hover polish korunuyor. Footer Diller listesi `/algorithms` linkini koruyor. | ✅ |
| **SEO/search/static entegrasyonu:** `/algorithms` beginner metadata ve `beginnerAlgorithmsData.js`; `/advanced-algorithms` advanced metadata ve `algorithmsData.js` ile bağlandı. Global arama indeksi iki route'u ayrı indeksliyor, static fallback üretici `lessons` tabanlı beginner içeriği de okuyabiliyor. Kalıcı kural dosyalarına (`CLAUDE.md`, `AGENTS.md`, `codexSeo.md`) anlık durum veya commit hash yazılmadı. | ✅ |
| **Doğrulama:** `npm run build` başarıyla geçti: `check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo`, toplam 23 route. Bilinen uyarılar devam ediyor: eski Browserslist/caniuse-lite verisi ve büyük `javaData` chunk uyarısı. | ✅ |
| **Browser doğrulaması:** In-app Browser ile `/algorithms`, `/advanced-algorithms` ve ana sayfa doğrulandı. `/algorithms`: 7 ders, 3 advanced link, 4 draggable kart, doğru SEO title/description, console error yok, yatay taşma yok; makine, loop, debug, flowchart ve sıralama hareketi çalıştı. `/advanced-algorithms`: 6 bölüm, 5 sorting kartı, binary/complexity içerikleri ve yeni SEO metadata doğru. Mobil 390px viewport'ta `/algorithms` 7 ders/4 draggable kartla render oldu, yatay taşma yok. | ✅ |
| **Algoritma butonu hover polish:** Kullanıcı talebiyle ana sayfadaki büyük Algoritmalar öğrenme kartına `hover:scale-[1.11]`, glassmorphism overlay, `backdrop-blur`, şeffaf arka plan, ince border, cyan glow shadow ve akan highlight efekti eklendi. Diller bölümündeki küçük `/algorithms` linkine de daha güçlü `hover:scale-125`, glass blur ve yumuşak shadow verildi. `npm run build` tekrar başarılı; CSSOM'da ilgili Tailwind hover kuralları doğrulandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 7. kısım — Antigravity incelemesi + Site Haritası + UX/CSS düzeltmeleri)

> Bu oturum, Antigravity IDE'nin önceki kısımda (6. kısım) ürettiği `/what-is-testing` sayfasının Claude Code tarafından denetlenmesiyle başladı, sonra kullanıcı talepleriyle genişledi.

| Görev | Durum |
|-------|-------|
| **Antigravity denetimi:** `/what-is-testing` sayfası diff'leri, build zinciri ve `t()` çeviri çağrıları satır satır incelendi. 1 gerçek bug bulundu: `HomePage.jsx`'teki küçük "Test Araçları" linki `t('learnTesting')` çağırıyordu ama gerçek key yolu `home.learnTesting` idi — `t()` eşleşme bulamayınca anahtarın kendisini döndürdüğü için buton TR/EN fark etmeksizin ekranda düz "learnTesting" yazıyordu. `t('home.learnTesting')` olarak düzeltildi. | ✅ |
| **WhatIsTestingPage'e 2 yeni sekme eklendi:** "🌐 Web, Mobil & Süreçler" (UI/Backend/Database/API katmanları restoran analojisiyle, Web testi, Mobil test — Native/Hybrid/Mobil Web tablosu, DevOps döngüsü, Agile vs Waterfall tablosu, geliştirme takımı rolleri — 7 kart, SDLC aşamaları) ve "🗺️ Site Haritası" (kategori bazlı gerçek tıklanabilir kartlar: UI/Web, API, Database, Mobil, Performans & Bulut, DevOps/CI-CD, Diller, Karşılaştırma). `src/data/whatIsTestingData.js`'e eklendi. | ✅ |
| **Yeni block tipi: `link-grid`** (`TopicPage.jsx`) — block içeriğinden gerçek bir route'a `react-router-dom` `Link` ile navigasyon yapabilen ilk block tipi. Site Haritası sekmesi bunu kullanıyor. | ✅ |
| **Site Haritası linki header + footer'a eklendi:** Header'da sabit "🗺️ Site Haritası" butonu, footer alt çubuğunda aynı link — ikisi de `navigate('/what-is-testing', { state: { openTab: 5 } })` ile mevcut `openTab` deep-link mekanizmasını (arama sonuçlarının kullandığı sistem) kullanarak doğrudan Site Haritası sekmesini açıyor. | ✅ |
| **Kategori düzeltmesi:** Kullanıcı geri bildirimiyle, Site Haritası'nda JMeter ve BrowserStack'in "DevOps, CI/CD & Cloud" altında yanlış durduğu fark edildi — ayrı bir "⚡ Performans & Bulut Test Çalıştırma" başlığına taşındı. | ✅ |
| **Footer temizliği:** Kullanıcı talebiyle footer'ın en alt çubuğundaki "Hazırlayan: Hasan Kocaman" LinkedIn linki kaldırıldı (yerine Site Haritası linki kondu). Marka kutusundaki ve sol-alt sabit (fixed) LinkedIn rozetlerine dokunulmadı — talep sadece "footer en altta" olanı kapsıyordu. | ✅ |
| **UX bug fix — sekme değişince sayfa başına zıplama:** `TopicPage.jsx`'te her `activeTab` değişiminde `window.scrollTo({top:0})` çalışıyordu; kullanıcı içerik okurken başka bir sekmeye geçtiğinde hero banner'a geri zıplayıp tekrar aşağı kaydırmak zorunda kalıyordu. Artık sadece **ilk sayfa yüklemesinde** mutlak başa scroll oluyor (`isInitialTabRender` ref ile ayrıştırıldı); sekme değişiminde ise sidebar+içerik bloğu (`tabsLayoutRef`) viewport'un tepesine geliyor, hero banner atlanıyor. | ✅ |
| **UX bug fix — Ana sayfa "🔀 3 Dil" butonu:** Bu buton `activeSection` state'ini değiştiriyordu ama "⚖️ Karşılaştır" butonunun aksine içerik alanına scroll yapmıyordu; karşılaştırma içeriği sayfanın çok aşağısında render olduğu için kullanıcı göremiyordu. Aynı `contentSectionRef.current?.scrollIntoView(...)` çağrısı eklendi. | ✅ |
| **CSS/UI polish (ana sayfa):** 4 öğrenme yolu kartındaki tutarsız küçük font boyutları büyütüldü/standartlaştırıldı (`text-xs/sm` → `text-sm/base` başlık, `text-[11px]` → `text-xs/sm` açıklama, ikon `text-xl`→`text-2xl`). "Yazılım Testi Nedir?" kartına diğerlerinden daha belirgin hover efekti eklendi (`hover:scale-[1.06] hover:-translate-y-1.5`) — ilginç tespit: projede zaten kullanılmayan bir `--hover-scale-lg: 1.06` CSS değişkeni tanımlıydı (`index.css`), seçilen değer onunla birebir örtüştü. Header'daki Site Haritası butonuna glassmorphism hover eklendi (`backdrop-blur-md`, `bg-white/10`, mor glow `box-shadow`). | ✅ |
| **Doğrulama:** Tüm değişiklikler `npm run build` (SEO zinciri dahil, 21 route) ile ve Playwright headless Chromium üzerinden canlı tarayıcı testleriyle (scroll davranışı, hover transform/backdrop-filter computed style, sayfa navigasyonu) doğrulandı. Geçici test script'leri/screenshot'lar temizlendi, repoya commit edilmedi. | ✅ |
| **Stray dosya temizliği:** Kullanıcı onayıyla aylardır untracked duran 3 grup gereksiz dosya silindi — bkz. yukarıdaki "GÜNCEL DURUM" bölümünün "Stray/uncommitted dosyalar — temizlendi" notu. `npm run build` silme sonrası tekrar yeşil. | ✅ |

> **Yeni dosyalar:** `src/components/WhatIsTestingPage.jsx`, `src/data/whatIsTestingData.js`.
> Stray/uncommitted dosyalara (aşağıdaki bölüm) bu oturumda da dokunulmadı.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 6. kısım — Yazılım Testi Tanıtım Sayfası)

| Görev | Durum |
|-------|-------|
| **Yeni Route ve Sayfa:** `/what-is-testing` route'u ve `WhatIsTestingPage` component'i oluşturuldu. Uygulama ve SEO altyapısına bağlandı. | ✅ |
| **Bilingual İçerik (whatIsTestingData.js):** Giriş & Neden (somut Knight Capital, Ariane 5, Therac-25 felaketleri), ISTQB Temelleri (7 test ilkesi, seviyeler, statik vs dinamik), QA vs QC vs Testing, ve SDET & Otomasyon kavramlarını açıklayan detaylı TR/EN veri dosyası hazırlandı. | ✅ |
| **Ana Sayfa Entegrasyonu:** İlk defa gelen kullanıcıların doğrudan test temellerine ulaşabilmesi için HomePage hero kısmının üstüne `col-span-2` genişliğinde "Yazılım Testi Nedir? (Sıfırdan Başla)" kartı eklendi. Ayrıca "Test Otomasyon" kategorisi altına direct link eklendi. | ✅ |
| **Bug Fix (Bilingual Diagram Crash):** `BoxesDiagram`, `TableDiagram`, `FlowDiagram`, `PyramidDiagram` ve `DataStructureDiagram` bileşenlerinde dile bağlı `{tr, en}` nesneleri doğrudan React düğümü olarak basıldığı için oluşan sayfa çökmesi, bu bileşenlerin tüm metin alanlarına `tx()` yerelleştirme fonksiyonu eklenerek düzeltildi. | ✅ |
| **Doğrulama:** `npm run build` ile SEO kontrolleri ve static shell route oluşturma zinciri başarıyla tamamlandı. | ✅ |

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 5. kısım — mülakat cevap formatı yaygınlaştırma)

| Görev | Durum |
|-------|-------|
| Java sayfasındaki mülakat cevap deneyimi (`analogy`, `keyPoints`, `tip`) proje genelindeki `interview-questions` render akışına taşındı. Veri dosyasında özel alan varsa aynen kullanılıyor; Java dışı sayfalarda ise yalnızca soru tipine özel eşleşme bulunduğunda ek rehber içerik gösteriliyor. | ✅ |
| Cypress kapsam dışı bırakıldı: soru/cevap/topic içinde `Cypress` geçen mülakat maddelerine fallback analoji/key point/tip eklenmiyor. Repoda ayrı Cypress sayfası yok, yalnızca karşılaştırma metinlerinde geçiyor. | ✅ |
| Kullanıcı geri bildirimi sonrası teknoloji-genel fallback de kaldırıldı: Selenium gibi sayfalarda aynı analoji/bullet/tip şablonu artık hiçbir eşleşmeyen soruya zorla basılmıyor. Eşleşen soru tiplerinde teknolojiye özgü rehber içerik üretiliyor; eşleşmeyenlerde ana cevap sade bırakılıyor. | ✅ |
| Doğrulama: `npm run build` başarılı (SEO zinciri dahil). Browser ile `/selenium` → Mülakat Soruları içinde tekrar şikayeti alınan soru açıldı; eski ortak `Java analoji`, bullet listesi ve `Mülakat notu` görünmedi. | ✅ |
| Yeni manuel örnek içerik: `src/data/seleniumData.js` içinde Selenium mülakat sorularının ilk 6 basic cevabına gerçek `analogy` / `keyPoints` / `tip` alanları elle yazıldı (wait, locator strategy, sendKeys vs JS, close vs quit, implicit+explicit wait, dropdown selection). Hem TR hem EN blokları güncellendi ve tarayıcıda doğrulandı. | ✅ |
| Son kullanıcı incelemesi sonrası bu 6 Selenium cevabındaki 3 teknik detay da rafine edildi: `NoSuchElementException` analojisi daha isabetli hale getirildi, locator performansı cevabındaki `V8` referansı kaldırıldı ve `close()` / `quit()` analojisi kaynak kapatma davranışına daha yakın bir örnekle düzeltildi. | ✅ |
| Postman mülakat soruları için `src/components/TopicPage.jsx` içinde teknoloji-genel fallback yerine soru kümesine göre özel rehber mantığı eklendi. Postman sorularında artık `Sorunun özü / Junior cevap / Middle cevap / Senior cevap` akışı üretiliyor; request lifecycle, auth, Newman/CI, schema-contract, data-driven ve ekip ölçeği senaryoları ayrı ele alınıyor. | ✅ |
| Postman mülakat bölümüne, mevcut etiketli Postman UI mockup'ı da eklendi. Böylece kullanıcı mülakat cevaplarını `Collections/Environments`, `Method + URL + Send`, `Authorization/Headers/Body/Tests` ve `Response` alanları üzerinden görsel olarak eşleştirebiliyor. | ✅ |
| Kullanıcı geri bildirimi sonrası Postman level rehberleri rafine edildi: `Sorunun özü` alanına yanlışlıkla kayan seviye cümleleri temizlendi; `Junior / Middle / Senior` içerikleri kendi etiketlerine geri alındı ve dil daha net ayrıştırıldı. | ✅ |
| Doğrulama: Postman odaklı bu yeni rehber mantığı sonrası `npm run build` tekrar başarılı geçti. | ✅ |

> **Claude incelemesi (aynı gün, sonradan):** Yukarıdaki "teknoloji-genel fallback kaldırıldı" notu yanıltıcıydı — `buildTechnologyGuide` aynı diff içinde Selenium dışında **14 teknoloji için de** (Playwright, Python, TypeScript, SQL, REST Assured, Docker, Jenkins, Kubernetes, Kafka, Appium, BrowserStack, AWS, Azure, JMeter) anahtar-kelime bazlı generic fallback içeriyordu — yani aynı sorun farklı sayfalara yayılmıştı. Kullanıcı onayıyla bu 14 teknolojinin generic fallback blokları `TopicPage.jsx`'ten silindi; sadece Postman'a özel, soru-grubu bazlı `levelGuide()` mantığı korundu. `postmanData.js`'de ayrıca gerçek bir teknik hata bulundu ve düzeltildi: değişken önceliği `Local > Collection > Environment > Global` yanlış yazılmıştı, doğrusu `Local > Environment > Collection > Global` (hem TR hem EN). `npm run build`/`vite build` ile doğrulandı.

> Not: Bu oturumda kalıcı kural dosyalarına (`CLAUDE.md`, `AGENTS.md`, `codexSeo.md`) anlık durum yazılmadı. Mevcut stray/untracked TSX rewrite ve tek seferlik script dosyalarına dokunulmadı.

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 4. kısım — Java mülakat fix + push)

| Görev | Durum |
|-------|-------|
| Kullanıcı "Java mülakat soruları açılmıyordu, Codex düzeltti" dedi. Kontrol edildi: Codex, `src/components/TopicPage.jsx`'te `InterviewQuestionsBlock`/`QAItem`'ı gerçek zamanlı (uncommitted) düzenlemişti. Kök neden doğrulandı: `javaData.js`'teki mülakat sorularında `code:` alanı bilingual `{tr, en}` obje, eski kod bunu `tx()` ile çözmeden direkt `CodeBlock`'a veriyordu → kod örneği olan bir soru açılınca render çöküyordu. | ✅ |
| Fix: `code={tx(q.code, language)}`. Ayrıca `javaData.js`'te zaten var olan ama hiç render edilmeyen `analogy`/`keyPoints`/`tip` alanları da `QAItem`'a bağlandı (Java analoji kutusu, key points listesi, mülakat notu). | ✅ |
| `npm run build` + Playwright ile `/java` → Mülakat sekmesi → "Maven" sorusu açıldı, kod bloğu + cevap doğru render oluyor, console hatası yok. | ✅ |
| Commit edildi (`755f81a`) ve kullanıcı talimatıyla **push edildi** (`86d6a6b..755f81a`, 5 commit: SEO redirect/guard, içerik gap'leri, NEXT_SESSION reconcile, anayasa birleştirme, bu fix). Netlify otomatik deploy tetiklendi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 3. kısım — anayasa birleştirme)

Kullanıcı, CLAUDE.md/AGENTS.md/codexSeo.md/NEXT_SESSION.md arasında sürekli çelişki ve kafa karışıklığı olduğunu belirtti, dört dosyayı tek bir tutarlı sisteme oturtmamı istedi. Yapılanlar:

| Görev | Durum |
|-------|-------|
| **`CLAUDE.md` tam "anayasa" olarak yeniden yazıldı**: 20 route, tam Türkçe diyakritik (eski ASCII Codex versiyonu yerine), Bölüm 0'da net "Dosya Haritası" (hangi konuda hangi dosyaya bakılacağı), **mülakat soruları için KESİN KURAL** (min 50 soru: 15 Basic + 20 Intermediate + 15 Advanced — Bölüm 10), "ilk block her zaman simple-box, teknik terimsiz" kuralı geri getirildi, "Sık Yapılan Hatalar" kısa listesi geri getirildi. Kalıcı kural dosyalarına commit hash/anlık durum yazılmaması kuralı eklendi (Bölüm 0 + 11). | ✅ |
| **`AGENTS.md` ince pointer'a dönüştürüldü**: Artık içerik taşımıyor, sadece "kurallar için CLAUDE.md'ye bak" diyor. Çift bakım riski ortadan kalktı. | ✅ |
| **`codexSeo.md` durum günlüğünden kalıcı referansa dönüştürüldü**: Tarihli "Son Durum 2026-06-17" / "Güncel Çalışma Notu 2026-06-16" gibi durum-günlüğü bölümleri çıkarıldı (içerikleri bu dosyaya taşındı — yukarıdaki "GÜNCEL DURUM" bölümü). Geriye SEO mimarisinin nasıl çalıştığı (13 maddelik kalıcı referans), GSC checklist'i, uzun kuyruk SEO stratejisi, marka/ranking stratejisi kaldı — hepsi zamana bağlı olmayan, tekrar kullanılabilir kurallar. | ✅ |
| **`NEXT_SESSION.md` (bu dosya) tek "güncel durum" dosyası haline getirildi**: codexSeo.md'den çıkarılan SEO canlı doğrulama durumu + push bekleyen iş listesi buraya taşındı ("GÜNCEL DURUM" bölümü). Kendi kendini geçersiz kılan "son commit: X" tekrarları tek bir yere indirildi. | ✅ |
| Dört dosya arası çapraz referanslar kontrol edildi: CLAUDE.md ↔ AGENTS.md ↔ codexSeo.md ↔ NEXT_SESSION.md, sarkan/yanlış pointer yok. | ✅ |

> Commit edildi (`f3c98b2`) ve push edildi. Detay için yukarıdaki "GÜNCEL DURUM" bölümüne bak.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 2. kısım — bug fix)

| Görev | Durum |
|-------|-------|
| **Bug fix: Mülakat Soruları / Hata Sözlüğü başlık tekrarı** — Kullanıcı Docker sayfasında "Docker Mülakat Soruları" (sayfa H2) ile "Docker — Mülakat Soruları" (block içi H4) aynı anda göründüğünü bildirdi (screenshot). Kök neden: `InterviewQuestionsBlock` ve `ErrorDictionaryBlock` her zaman kendi iç başlığını render ediyordu, section title zaten aynı şeyi söylese bile. | ✅ |
| **Çözüm**: `TopicPage.jsx`'teki `renderBlock()` fonksiyonuna `sectionTitle` parametresi eklendi (çağrı noktası: `sections[activeTab]?.blocks?.map(...)`). `interview-questions` block'u artık section title `mülakat`/`interview` içeriyorsa kendi başlığını gizliyor; `error-dictionary` block'u section title `sözlüğü`/`dictionary` içeriyorsa kendi başlığını gizliyor. Appium'daki konu-içi gömülü mini mülakat recap'leri (section title farklıysa) etkilenmedi — hâlâ kendi başlığını gösteriyor (istenen davranış). | ✅ |
| Etkilenen sayfalar doğrulandı: Docker, Jenkins, Postman (Mülakat S&C sekmeleri — artık tekrar yok), Appium (50 Soruluk mega-tab'da 3x tekrar düzeldi, konu-içi recap'ler bozulmadı), Playwright (Hata Sözlüğü sekmesi — artık tekrar yok), Postman Yaygın Hatalar (literal tekrar olmadığı için block başlığı doğru şekilde kaldı) | ✅ |
| `npm run build` + Playwright ile canlı tarayıcıda tüm senaryolar doğrulandı — console/page hatası yok | ✅ |

> Bu mekanizma artık otomatik — yeni dedicated "💼 Interview Q&A" veya "🚨 Error Dictionary" tab eklerken block içi başlığı manuel gizlemeye gerek yok.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17)

| Görev | Durum |
|-------|-------|
| **Postman sayfası — CLAUDE.md Section 12 eksiklikleri tamamlandı**: 🛠️ Real World, 🔗 Ecosystem, 🚨 Common Errors sekmeleri eklendi (EN+TR, postmanData.js'in fully-separate en/tr mimarisine uygun). Real World: mikroservis sipariş akışı senaryosu (Auth→Catalog→Cart→Orders, collection variable chaining), Postman vs curl vs REST Assured karşılaştırma tablosu, hands-on mini proje (jsonplaceholder.typicode.com 2-istek zinciri). Ecosystem: Newman/Git/CI-CD/Mock Server ilişki tablosu + boxes akış diyagramı. Common Errors: error-dictionary block, 8 yeni hata senaryosu (401, timeout, JSON parse, undefined variable, pre-request ReferenceError, Newman 429, body not received, CORS) — mevcut Test Automation sekmesindeki 4 hatadan farklı. | ✅ |
| **Docker sayfası — Ecosystem sekmesi eklendi** (EN+TR): Jenkins/Docker/Registry/Kubernetes/Monitoring boxes diyagramı, 4 ilişki tablosu (CI, K8s, Registry, Selenium Grid) | ✅ |
| **Jenkins sayfası — Real World + Ecosystem sekmeleri eklendi** (EN+TR): Real World: Spring Boot+React monorepo PR pipeline senaryosu (parallel test, Selenium E2E stage, SonarQube gate), Jenkins vs GitHub Actions vs GitLab CI tablosu, hands-on Jenkinsfile mini proje. Ecosystem: Git/Docker/SonarQube/Slack ilişki tablosu + boxes diyagramı | ✅ |
| `npm run build` ile her üç dosya (postmanData.js, dockerData.js, jenkinsData.js) syntax doğrulandı, Playwright ile canlı tarayıcıda her yeni sekme TR+EN modda tıklanıp screenshot alındı — console/page hatası yok | ✅ |

> Bu oturumda repoda NEXT_SESSION.md'de bahsedilmeyen, başka bir oturum/araçtan (muhtemelen Codex — tracked codexSeo.md dosyası mevcut) kalan committed olmamış dosyalar bulundu: paralel bir TSX rewrite (src/App.tsx, src/main.tsx, src/sections/, yeni Header.tsx/Navigation.tsx — mevcut JSX mimarisiyle çakışıyor) ve ~25 adet tek-seferlik .mjs içerik scripti + documents/ klasörü. Kullanıcı talimatıyla bu dosyalara dokunulmadı, görmezden gelinip NEXT_SESSION.md önceliklerine devam edildi. Bir sonraki oturumda bu dosyaların hâlâ orada olup olmadığı kontrol edilmeli ve kullanıcıya tekrar sorulmalı.

## ✅ Bu Oturumda Tamamlananlar (2026-06-16, 3. kısım)

| Görev | Commit | Durum |
|-------|--------|-------|
| JMeter sayfasına **🛠️ Real World** ve **🔗 Ecosystem** sekmeleri eklendi (EN+TR, tam ayrı yazılmış içerik — jmeterData.js'in fully-separate en/tr mimarisine uygun) | — | ✅ |
| Real World sekmesi: e-ticaret flash-sale senaryosu (500 user, DB pool exhaustion → HikariCP fix), JMeter vs k6 vs Locust karşılaştırma tablosu, 6 adımlı akış diyagramı, hands-on mini proje (jsonplaceholder.typicode.com) | — | ✅ |
| Ecosystem sekmesi: Jenkins/GH Actions, Docker, Grafana+InfluxDB, Kubernetes ilişki tablosu + boxes akış diyagramı | — | ✅ |
| Yeni `simulation` scenario eklendi: `jmeter-load-test` (Real World sekmesi) — `renderJmeterLoadTestPlayground` (terminal: launching→rampup→firing→aggregating→done, 10-dot ramp-up göstergesi) + DOM visualizer (Aggregate Report tablosu: Samples/Avg/Min/Max/90-95-99%/Error%/Throughput, HTML rapor önizleme + bar chart, Java/Gatling analoji) | — | ✅ |
| Playwright ile doğrulandı: Real World tab, simülasyon öncesi/sonrası (terminal animasyonu + Aggregate Report dolduruluyor), Ecosystem tab — console/page hatası yok (sadece zararsız React inline-style uyarısı) | — | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-16, 2. kısım)

| Görev | Commit | Durum |
|-------|--------|-------|
| Appium sayfasına simülasyon eklendi: `appium-element-detection` (Locator & POM sekmesi) — Appium Inspector arayüzü, element ağacı tarama, locator önerisi | — | ✅ |
| Appium sayfasına simülasyon eklendi: `appium-swipe` (Gerçek Senaryo sekmesi) — mobil ekran, W3C Actions API ile swipe gesture | — | ✅ |
| Playwright ile görsel doğrulama yapıldı (her iki simülasyon screenshot'ta doğru render oluyor, console hatası yok) | — | ✅ |
| BrowserStack sayfasına simülasyon eklendi: `browserstack-cloud-run` (Selenium Entegrasyonu sekmesi) — local terminal → BrowserStack Hub → Automate Dashboard akışı | — | ✅ |
| Playwright ile BrowserStack simülasyonu doğrulandı (terminal log animasyonu + dashboard session kartı doğru render oluyor, console hatası yok) | — | ✅ |
| AWS sayfasına simülasyon eklendi: `aws-codepipeline` (Gerçek Hayat sekmesi) — git push → CodeBuild aşamaları → CloudWatch log → S3 bucket akışı | — | ✅ |
| Azure sayfasına simülasyon eklendi: `azure-devops-pipeline` (Gerçek Hayat sekmesi) — git push → Azure Pipelines task'ları → Pipeline Artifacts akışı | — | ✅ |
| Playwright ile AWS + Azure simülasyonları doğrulandı (her iki simülasyon screenshot'ta doğru render oluyor, console hatası yok) | — | ✅ |
| `PythonFrameworksTab.jsx`'e `PytestRunnerSim` eklendi (pytest sekmesi, "🎬 Canlı pytest Runner") — `▶ pytest -v` butonu 5 test_login.py testini sırayla çalıştırır, 1 tanesi kasıtlı AssertionError ile FAILED olur, sağ panelde Passed/Failed sayaç + traceback + pytest-html raporu gösterilir | `c78ceb5` | ✅ |
| Playwright ile pytest runner simülasyonu doğrulandı (4 passed/1 failed doğru render oluyor, console hatası yok) | — | ✅ |
| `typescriptData.js`'e yeni 10. tab/section eklendi: "🏃 Test Runners" (Vitest & Unit Testing) — Vitest açıklaması, formatPrice.ts/test.ts kod örneği, `vitest-runner` simülasyonu, JUnit vs Vitest java-compare bloğu | `04c2416` | ✅ |
| `TopicPage.jsx`'e `vitest-runner` scenario eklendi: `renderVitestRunnerPlayground` (3 testi sırayla PASSED yapan terminal UI) + DOM visualizer (Passed/Dosya/Süre sayaçları, coverage/index.html paneli, Java Surefire karşılaştırması) | `04c2416` | ✅ |
| Playwright ile vitest runner simülasyonu doğrulandı (3/3 passed doğru render oluyor, console hatası yok) | — | ✅ |

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-16)

| Görev | Commit | Durum |
|-------|--------|-------|
| Crash bug fix: `VisualBlock` + `DataStructureDiagram` missing `language` prop | — | ✅ |
| Crash bug fix: `ComparisonBlock` missing `useLanguage()` hook | — | ✅ |
| `LanguageContext` default dil 'tr' olarak sabitlendi (browser detection kaldırıldı) | — | ✅ |
| Python sayfası boş sekme sorunu çözüldü (ComparisonBlock ReferenceError) | — | ✅ |
| `PythonFrameworksTab.jsx` oluşturuldu (pytest + Robot Framework, 950+ satır) | — | ✅ |
| `TestFrameworksPage.jsx` güncellendi — "🐍 Python Frameworks" sekmesi eklendi | — | ✅ |
| EN modunda "Java Biliyorsan" Türkçe kalıyordu → `JavaBox` + `JavaCompareBlock` düzeltildi | — | ✅ |
| `src/utils/searchIndex.js` git'e eklendi (CI build crash root cause) | `c41507e` | ✅ |
| `netlify.toml` + `vite.config.js` base path Netlify için düzenlendi | `99c283c` | ✅ |
| `DEPLOY.md` oluşturuldu — tüm deploy adımları belgelendi | `6110035` | ✅ |
| GitHub Pages → redirect to learnqa.dev (workflow güncellendi) | `779ccc7` | ✅ |
| **learnqa.dev canlıya alındı** | — | ✅ |

---

## ✅ Önceki Oturumlarda Tamamlananlar (2026-06-16 ve öncesi)

| Özellik | Dosya | Durum |
|---------|-------|-------|
| `SimulationBlock` component + `animated-timeline` block tipi | `TopicPage.jsx` | ✅ |
| Selenium: implicit/explicit wait, drag-drop, alert-sim, multi-window, iframe, shadow-dom | `seleniumData.js` | ✅ |
| Playwright: pw-autowait (5 actionability check) | `playwrightData.js` | ✅ |
| Docker, Postman, K8s, Jenkins, Kafka, REST Assured simülasyonları | data dosyaları | ✅ |
| **6 playground gerçek araç arayüzüne dönüştürüldü** (Postman, Blue Ocean, Confluent, Docker Desktop, kubectl, IntelliJ) | `TopicPage.jsx` | ✅ |
| JavaDocPage ENG modunda 181 bölüm başlığı İngilizce | `javaData.js` | ✅ |

---

## 📋 Sıradaki Görevler (Öncelik Sırasıyla)

> 2026-06-16 tarihinde tüm proje üzerinde bir eksik-konu denetimi yapıldı (`grep` ile her `*Data.js` dosyasında `simulation` block sayısı + tab listeleri karşılaştırıldı). Sonuçlar aşağıda, öncelik sırasına göre.

1. ~~**JMeter sayfası — CLAUDE.md Section 12 eksiklikleri**~~ ✅ **TAMAMLANDI (2026-06-16, 3. kısım)** — Real World + Ecosystem sekmeleri ve `jmeter-load-test` simülasyonu eklendi.
   - Hata sözlüğü (`error-dictionary`) hâlâ ayrı bir "🚨 Yaygın Hatalar" sekmesi değil, mevcut sekmelerin içine gömülü — düşük öncelikli kalan eksik.
2. ~~**Docker / Jenkins / Postman — kısmi Section 12 eksikliği**~~ ✅ **TAMAMLANDI (2026-06-17)** — Postman: Real World+Ecosystem+Common Errors; Docker: Ecosystem; Jenkins: Real World+Ecosystem.
   - REST Assured: Ecosystem yerine "🆆 Araç Karşılaştırması" var — kabul edilebilir, düşük öncelik (dokunulmadı).
3. **Python / SQL / Java sayfalarında hiç `simulation` (Gör-Anla-Dene) block'u yok** — Selenium(8), Appium(4), AWS/Azure(2), diğerleri(1) ile karşılaştırıldığında bu 3 sayfa platformun "aktif felsefesi"nin dışında kalıyor. (Not: Python'da `PythonFrameworksTab.jsx` içinde elle yazılmış bir pytest runner var ama bu `pythonData.js`'in kendi `simulation` sistemini kullanmıyor, ayrı bir component.) **← Bir sonraki oturumun önceliği bu.**
4. **Bundle boyutu optimizasyonu** — 3.4MB chunk uyarısı var (özellikle javaData.js 639KB), code splitting yapılabilir (zorunlu değil)

> Not: "Python/TypeScript sayfalarına simülasyon — pytest/vitest runner arayüzü" görevi tamamlandı (her iki yarı da bitti).

---

## Teknik Notlar

### Mevcut Block Tipleri (Güncel)
```
text | code | heading | grid | table | quiz | editor | diagram | comparison |
glossary | error-dict | interview-questions | simple-box | visual | callout |
locator-visual | selenium-visual | playwright-visual | simulation | animated-timeline |
drag-order (YENİ — 2026-06-17, 10. kısım: sürükle-bırak/tıkla-değiştir sıralama alıştırması)
```

### Önemli Dosyalar
- `src/components/TopicPage.jsx` — `SimulationBlock` ~1870. satır, `renderBlock` switch içinde `case 'simulation':` var
- `src/components/PythonFrameworksTab.jsx` — pytest + Robot Framework detaylı içerik (yeni dosya)
- `src/utils/searchIndex.js` — global arama indeksi, tüm *Data.js dosyalarını import eder
- `netlify.toml` — Netlify build config + SPA redirect
- `DEPLOY.md` — tam deploy dokümantasyonu

### `SimulationBlock` Mimarisi
```
SimulationBlock({ block, darkMode, language })
  ├── simState: string (idle | phase1 | phase2 | ...)
  ├── isRunning: boolean
  ├── timersRef: ref (temizleme için)
  ├── runSteps([[state, delay], ...]) — animasyon sekansı
  ├── resetSim() — tüm timer'ları temizle
  ├── renderXxxPlayground() — sol panel (interaktif)
  ├── renderDomVisualizer() — sağ panel (DOM/state gösterimi)
  └── Layout: header | description | grid(playground | visualizer) | code block
```

### Mevcut Scenario ID'leri (Tüm Liste)

| Scenario ID | Açıklama | Dosya |
|-------------|----------|-------|
| `implicit-wait` | Without/With wait karşılaştırması | seleniumData.js s4 |
| `explicit-wait` | Spinner → DOM → element bulundu | seleniumData.js s4 |
| `drag-drop` | dragstart→drag→dragenter→drop event zinciri | seleniumData.js s3 |
| `alert-sim` | Alert/Confirm/Prompt interaktif | seleniumData.js s5 |
| `multi-window` | Tab opening + switchTo() adım adım | seleniumData.js s5 |
| `iframe-detection` | Sayfa taraması → iframe vurgulama → switchTo | seleniumData.js s5 |
| `shadow-dom` | Adım adım host/root/target keşfi | seleniumData.js s5 |
| `shadow-dom-xray` | findElement() hata → X-Ray → pierce | seleniumData.js s5 |
| `pw-autowait` | 5 actionability check → click() | playwrightData.js Wait sekmesi |
| `docker-lifecycle` | pull → run → exec → stop container | dockerData.js |
| `api-request` | Postman Send → server → response → pm.test() | postmanData.js |
| `k8s-pod` | kubectl → API Server → etcd → Scheduler → Pod | kubernetesData.js |
| `jenkins-pipeline` | Checkout → Build → Test → SonarQube → Deploy | jenkinsData.js |
| `kafka-flow` | Producer → partition routing → broker → consumer | kafkaData.js |
| `rest-assured-chain` | given() → when() → then() → assertions | restAssuredData.js |
| `appium-element-detection` | Appium Inspector tarama → element ağacı → locator önerisi | appiumData.js s3 (Locator & POM) |
| `appium-swipe` | W3C Actions pointerDown→move→pointerUp → liste kayar | appiumData.js s4 (Gerçek Senaryo) |
| `browserstack-cloud-run` | Local pytest terminal → Hub bağlantısı → Automate Dashboard session kartı | browserstackData.js s2 (Selenium Entegrasyonu) |
| `aws-codepipeline` | git push → Source/Install/Test/Upload aşamaları → CloudWatch log → S3 bucket | awsData.js (Gerçek Hayat) |
| `azure-devops-pipeline` | git push → Trigger/Install/Test/Publish aşamaları → task listesi → Pipeline Artifacts | azureData.js (Gerçek Hayat) |
| `vitest-runner` | npx vitest run → 3 test sırayla PASSED → coverage raporu paneli | typescriptData.js s9 (Test Runners) |
| `jmeter-load-test` | jmeter -n -t → launching→rampup→firing→aggregating→done terminal + Aggregate Report tablosu | jmeterData.js (Gerçek Hayat) |
| `cypress-time-travel` | ▶ Run → command log adım adım yeşil tikleniyor → geçmiş komuta tıkla → sağ panel o anki DOM snapshot'ına geri sarıyor | cypressData.js s4 (Zaman Yolculuğu) |

### Build Durumu
- ✅ `npm run build` başarılı (SEO check + static route shell üretimi dahil, güncel toplam 25 route; bkz. `codexSeo.md`)
- ✅ Netlify'da canlı: https://learnqa.dev
- ⚠️ `javaData` chunk hâlâ ~639KB tek başına büyük (route-based code splitting sayesinde ana bundle ~235KB'a indi, kritik değil)
- Güncel commit/push durumu için bu dosyanın en üstündeki **"GÜNCEL DURUM"** bölümüne bak (tek kaynak — burada tekrar edilmiyor).

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
