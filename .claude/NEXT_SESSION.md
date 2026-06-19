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

## 🌐 CANLI DEPLOYMENT BİLGİLERİ (2026-06-18)

| Alan | Değer |
|------|-------|
| **Canlı URL** | https://learnqa.dev |
| **Hosting** | GitHub Pages (GitHub Actions ile gerçek `npm run build` deploy) |
| **Eski Netlify subdomain** | https://sprightly-cactus-c9482b.netlify.app (Netlify kredisi bittiği için production deploy devre dışı kalabilir) |
| **Domain registrar** | Porkbun — yenileme $12.87/yıl (2027-06-16) |
| **GitHub repo** | https://github.com/hasankocaman/automationexercise (public) |
| **GitHub Pages URL** | https://hasankocaman.github.io/automationexercise/ (custom domain `learnqa.dev` ile yayın hedefi) |

### Deploy Akışı
- `git push origin main` → GitHub Actions `Deploy LearnQA.dev to GitHub Pages` workflow'unu çalıştırır.
- Workflow: checkout → Node 20 → `npm ci` → `npm run build` → `dist/404.html` fallback → Pages artifact upload → GitHub Pages deploy.
- `DEPLOY.md` dosyasında GitHub Pages + DNS kurulum adımları belgelenmiştir.

### Kritik Yapılandırma
- `vite.config.js` → `base: '/'` (custom domain root yayını için)
- `public/CNAME` → `learnqa.dev`
- `.github/workflows/deploy.yml` → gerçek Vite build'i GitHub Pages'e deploy eder
- GitHub Pages'te Netlify tarzı server fallback yoktur; `scripts/generate-static-routes.mjs` route shell'leri üretir ve workflow `dist/index.html` dosyasını `dist/404.html` olarak kopyalar.

---

## ⚠️ GÜNCEL DURUM — GIT, SEO, STRAY DOSYALAR (2026-06-19 itibarıyla doğrulandı)

**Bu bölüm önemli — her oturum başında oku, üstüne yaz/güncelle.**

### Git durumu
- **Branch durumu:** `git status -sb` çıktısı `main...origin/main` gösteriyor; şu an ahead/behind işareti yok.
- **Son görülen commit'ler:**
  - `8ec78fa` feat(sitemap): add all missing applications and pages to site map
  - `f570de5` feat(selenium): modernize page with BiDi, Virtual Auth, IDE, and Grid 4
  - `7b7a204` feat(playwright): add 8 new tabs covering assertions, test org, POM, debugging, codegen, MCP, parallel/CI-CD, and auth
  - `8f298ac` feat(git-github): add .gitignore practice sections
  - `516622d` feat(qa-mentor): add Git-GitHub, Linux bonus and Linux recommendation to all roadmaps
- `Documents/_Java notlar.md` yerel çalışma notudur; `.gitignore` içinde `Documents/_Java notlar.md` olarak ignore ediliyor ve `git check-ignore -v -- "Documents/_Java notlar.md"` ile doğrulandı. Her commit/stage öncesi bu kural tekrar kontrol edilmeli.
- **Dokunulmayan yerel dosya:** `.claude/settings.local.json` untracked görünüyor; bu oturumda dokunulmadı.
- **Git uyarısı:** `git status` ve `git check-ignore` sırasında `C:\Users\1/.config/git/ignore` için `Permission denied` uyarısı görünüyor; komutların ana çıktısını bozmadı.
- **GitHub Pages deploy notu:** `.github/workflows/deploy.yml` artık redirect HTML değil, gerçek `npm run build` çıktısını yayınlar. `concurrency.group: pages` aynı anda birden fazla Pages deploy çakışmasını azaltır. `workflow_dispatch` açık olduğu için Actions ekranından manuel deploy tetiklenebilir.

### SEO/routing altyapısı — gerçek ve commit'li
`BrowserRouter` (`src/main.jsx`), `src/components/SeoMeta.jsx`, `scripts/check-seo.mjs`, `scripts/check-dist-seo.mjs`, `scripts/generate-seo-files.mjs` committed ve push'lu. `/algorithms`, `/advanced-algorithms`, `/manual-testing` ve `/cypress` route'ları `7f526fd` ile; algoritma soru bankası ve HomePage roadmap fix'i `797aa6d` ile commit'li/push'lu. Bu oturumda `/git-document` route'u çalışma ağacına eklendi; `npm run build` **29 route** için SEO/static shell kontrolünü başarıyla geçiriyor. Mimari detayları `codexSeo.md`'de (kalıcı referans olarak).

**SEO canlı doğrulama durumu — bir sonraki oturumda tekrar kontrol edilmeli (push yeni yapıldı):**
- `https://learnqa.dev/robots.txt` ve `/sitemap.xml` 200 dönüyor mu?
- `https://learnqa.dev/cypress`, `/algorithms`, `/advanced-algorithms`, `/manual-testing` canlıda doğru render oluyor mu? (ilk kez bu push ile canlıya çıkıyor)
- `https://learnqa.dev/comparison.html` → `/test-frameworks` client-side redirect ile gidiyor mu? (GitHub Pages server 301 sağlamaz)
- **Henüz yapılmamış (hesap yetkisi gerektirir):** Google Search Console domain property + DNS verification + sitemap submission + URL Inspection. Checklist: `codexSeo.md` → "Google Search Console — Tekrar Kullanılabilir Checklist".

### Stray/uncommitted dosyalar
- **Şu anki `git status --short`:** `M .claude/NEXT_SESSION.md`, `M dist/index.html`, `M src/data/cypressData.js`, `?? .claude/settings.local.json`.
- **Bu oturumda bilinçli güncellenen dosya:** `.claude/NEXT_SESSION.md` — Git/GitHub Pull Request sekmesi doğrulama kaydı ve scenario envanteri.
- **Build kaynaklı dosya:** `dist/index.html` `npm run build` sonrası değişmiş görünüyor; build çıktısı olduğu için stage/commit öncesi özellikle kontrol edilmeli.
- **Dokunulmayan yerel değişiklik:** `src/data/cypressData.js` bu turda düzenlenmedi; önceki/kullanıcı değişikliği olarak korunmalı.
- **Untracked yerel ayar dosyası:** `.claude/settings.local.json` dokunulmadı. `Documents/_Java notlar.md` ignore edilen yerel not dosyasıdır.

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 29. kısım — Git/GitHub Pull Request sekmesi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `http://localhost:5173/git-github` adresinde `GitHub Akışı` sekmesinin hemen altına `Pull Request` sekmesi eklenecek; GitHub'da Pull Request nedir, nasıl açılır, code review nasıl yapılır, approve/request changes kararları ne anlama gelir, conflict PR içinde/localde nasıl çözülür gibi konular gerçek GitHub arayüzüne benzeyen görseller, animasyonlar ve try-it-yourself pratikleriyle anlatılacaktır. | ✅ |
| **Sekme ve içerik yerleşimi:** `src/data/gitGithubData.js` içinde TR/EN tab listesine `🧾 Pull Request` sekmesi `🐙 GitHub Akışı/GitHub Workflow` ile `🚀 Actions` arasına yerleştirildi. TR ve EN içerik 12 tab / 12 section olarak eşleşiyor. Pull Request bölümü `simple-box`, GitHub UI simülasyonları, amaç/risk tabloları, code review açıklaması, conflict çözüm akışı, uyarı kutuları, quiz ve 3 adet `git-practice` alanı içeriyor. | ✅ |
| **Görsel/animasyon geliştirmesi:** `src/components/TopicPage.jsx` içinde iki yeni gerçek GitHub arayüzü benzeri simülasyon bağlandı: `github-pull-request-ui-tour` ve `github-pr-review-conflict-ui`. İlk simülasyon Pull requests tabı → New pull request → base/compare → Create pull request → Conversation/Files changed/Checks → Merge pull request akışını gösteriyor. İkinci simülasyon Files changed → line comment → Review changes → Request changes → conflict → local çözüm → test → push → Approved/Required checks/No conflicts → Merge pull request akışını gösteriyor. | ✅ |
| **Try-it-yourself:** Üç pratik alanı eklendi/doğrulandı: PR açma ekranındaki doğru sıra (`Pull requests tab`, `New pull request`, `base: main`, `compare: feature/...`, title/description/reviewer/checks), code review approve sırası (`Files changed`, line comment, review, Approve, Submit review) ve conflict'i localde güvenli çözme sırası (`git fetch origin`, `git switch feature/...`, `git merge origin/main`, dosyayı düzelt, test, `git add`, `git commit`, `git push`). Kullanıcı butona basınca başarı çıktısını görüyor. | ✅ |
| **Doğrulama:** `node` import kontrolüyle TR/EN tab ve section sayıları, Pull Request index'i, iki scenario ve 3 practice doğrulandı. `npm run build` başarıyla geçti (29 route SEO check + sitemap/robots + Vite build + static route shell + dist SEO). In-app Browser ile `/git-github` üzerinde PR sekmesi açıldı; ilk animasyonda `Files changed`, `Review changes`, `Checks`, `qa-lead ✓`, `Pull request successfully merged and closed`, `Merge pull request` göründü; ikinci animasyonda `Request changes`, `Approved`, `Required checks passed`, `No conflicts`, `Merge pull request` doğrulandı. Üç try-it-yourself alanı çalıştırıldı ve `PR hazır: base main`, `Review tamam`, `Conflict güvenli çözüldü` çıktılarını verdi. 390px mobil kontrolde PR sekmesi ikon-only `🧾` olarak açıldı, gerçek yatay scroll oluşmadı (`scrollX` 0), console error/warn yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 28. kısım — Site Haritası (Sitemap) Güncellemesi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `http://localhost:5173/what-is-testing` sayfasındaki site haritası incelenecek ve projemizdeki her uygulama (sayfa/route) site haritasına eklenecektir. Hepsi hakkında kısa kısa Türkçe ve İngilizce tanıtımlar yazılacaktır. | ✅ |
| **Site Haritası Geliştirmesi (`src/data/whatIsTestingData.js`):** Projedeki tüm 29 route/sayfa taranarak site haritasında eksik olan 8 sayfa tespit edildi: `Cypress` (/cypress), `Git & GitHub` (/git-github), `Linux Temelleri` (/linux), `Yazılım Testi & QA Temelleri` (/what-is-testing), `Manuel Test Temelleri` (/manual-testing), `Temel Algoritmalar` (/algorithms), `İleri Seviye Algoritmalar` (/advanced-algorithms) ve `QA Mentor (AI)` (/qa-mentor). | ✅ |
| **Yeni Kategorizasyon ve Kapsam:** Site haritası tamamen yeniden yapılandırılarak 11 mantıksal kategoriye bölündü: 🛡️ Test Temelleri & Manuel Test, 🎨 UI / Web Test Otomasyonu (Cypress eklendi), 🔌 API Testi, 🗄️ Database Testi, 📱 Mobil Test, ⚡ Performans & Bulut Test Çalıştırma, 🐳 DevOps, CI/CD & Cloud (Git & GitHub ve Linux eklendi), 💻 Programlama Dilleri, 🧩 Algoritmalar & Problem Çözme (Temel ve İleri algoritmalar eklendi), 🗺️ Kariyer & Rehberlik (QA Mentor eklendi) ve 📚 Karşılaştırma & Referans. | ✅ |
| **İki Dilli Tanıtımlar (TR/EN):** Eklenen her uygulama için `tr` ve `en` dillerinde kısa, açıklayıcı tanıtım metinleri yazıldı. UI grid kolon genişlikleri uyumlu hale getirildi (Cypress eklenince UI grid 3 sütun yapıldı). | ✅ |
| **Doğrulama:** `npm run build` komutu çalıştırıldı. Rota sayısı 29 olarak doğrulandı. SEO kontrolleri (`check-seo` ve `check-dist-seo`), Vite derlemesi ve statik HTML shell üretimi (`generate-static-routes`) başarıyla tamamlandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 27. kısım — Selenium sayfası: selenium.dev ile eksik konu kapatma)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `https://www.selenium.dev/` sitesindeki CDP, WebDriver BiDi, Virtual Authenticator, Selenium IDE ve Selenium Grid 4 konularındaki eksikler bulunacak, küçük parçalara bölünerek her biri görsel, animasyon ve try-it-yourself (Java/Selenium odaklı) ile tamamlanacaktır. | ✅ |
| **İçerik Geliştirme (`src/data/seleniumData.js`):** 4 yeni sekme eklendi (s8: CDP & WebDriver BiDi, s9: Virtual Authenticator & Gelişmiş Özellikler, s10: Selenium IDE — Kayıt & Oynatmanın Ötesi, s11: Selenium Grid 4 & Dağıtık Otomasyon). S7 (Ecosystem) revize edildi. S12 (Hatalar) ve S13 (Mülakat) sekmeleri kaydırıldı. S13 mülakat soru havuzuna yeni konularla ilgili senaryo bazlı sorular eklenerek toplam soru sayısı 50'ye tamamlandı. | ✅ |
| **Simülasyon/Arayüz Geliştirme (`src/components/TopicPage.jsx`):** 4 yeni görsel/animasyonlu `simulation` senaryosu eklendi: `selenium-bidi-cdp` (real-time Console Listener, Network Mock, Paris Geo), `selenium-virtual-auth` (WebAuthn/Passkey, print PDF, Wheel Scroll), `selenium-ide-flow` (Record, Control Flow, Export JUnit5), `selenium-grid-architecture` (Router, Distributor, Session Map, Docker Node). Her senaryo sol demo ve sağ DOM/otomasyon durum paneli (`renderDomVisualizer`) ile eşlendi, Java analojileri eklendi. | ✅ |
| **Doğrulama:** `npm run build` çalıştırıldı. Rota sayısı 29 olarak doğrulandı. SEO ve static HTML shell üretim adımlarının hepsi başarıyla tamamlandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 26. kısım — Cypress sayfası: docs.cypress.io ile eksik konu kapatma)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `https://docs.cypress.io/app/get-started/why-cypress` ve dokümantasyonun sol menüsündeki diğer konular incelenip mevcut `/cypress` sayfasındaki eksik konular bulunacak, küçük parçalara bölünüp her biri görsel+animasyon+try-it-yourself ile (gerçek Cypress arayüzü kullanılarak) tamamlanacaktı. | ✅ |
| **Gap analizi:** WebFetch ile docs.cypress.io sidebar haritası (Get Started, Core Concepts, Component Testing, Guides, Continuous Integration, Tooling, References) çıkarıldı ve 7 alt-sayfa (writing-and-organizing-tests, variables-and-aliases, test-isolation, component-testing/get-started, stubs-spies-and-clocks, debugging, continuous-integration/github-actions) detaylı okundu. Mevcut `cypressData.js`'deki 11 sekme (Nedir, Kurulum, Temel Komutlar, Aksiyonlar&Drag-Drop, Zaman Yolculuğu, Network&Intercept, Gerçek Hayat, Ekosistem, Karşılaştırma, Yaygın Hatalar, 50 Mülakat) ile karşılaştırıldı. **Tamamen eksik bulunanlar:** Writing & Organizing Tests (describe/hooks/custom commands), Variables/Aliases & Test Isolation (.then()/.as()/cy.session()), Component Testing (cy.mount()), Stubs/Spies/Clock & Fixtures, Debugging & Selector Playground, CI/CD & Cross Browser Testing. | ✅ |
| **6 yeni sekme eklendi (`src/data/cypressData.js`, s11-s16), Network & Intercept'in hemen sonrasına yerleştirildi:** 🗂️ Test Organizasyonu (describe/context/it, 4 hook + çalışma sayısı tablosu, .only/.skip, Cypress.Commands.add, JUnit5 hook karşılaştırması), 🔗 Aliases & Isolation (.then() closure, .as() alias, this.alias vs cy.get('@alias'), test isolation davranışı, cy.session() login cache), 🧩 Component Testing (cy.mount() React Counter örneği, E2E vs CT tablosu, Mockito izole servis testi analojisi), 🎭 Stub/Spy/Clock (cy.stub()/cy.spy()/cy.clock()-cy.tick()/cy.fixture(), Mockito mock()/spy() karşılaştırması), 🐞 Debugging (cy.debug()/cy.pause()/debugger, Selector Playground), ⚙️ CI/CD & Cross Browser (GitHub Actions YAML, --browser matrix, Maven Surefire parallel karşılaştırması). Toplam sekme sayısı 11 → **17**. Her sekme `simple-box` ile başlıyor, Java karşılaştırma (`java-compare`) içeriyor, en az 1 tablo, 1 `simulation` görseli ve 1 `git-practice` try-it-yourself pratiği var (CLAUDE.md Bölüm 9 kuralına uygun). | ✅ |
| **6 yeni görsel/animasyonlu `simulation` scenario eklendi (`src/components/TopicPage.jsx`):** `cypress-test-structure` (before/beforeEach/it/afterEach/after sırasını gerçek Cypress command-log stilinde gösteren çalışma sayacı), `cypress-session-cache` (1. test gerçek login yapar → 2. test cy.session() ile anında dashboard'a "zıplar"), `cypress-component-mount` (SADECE bir Counter component'i mock Cypress penceresinde mount edilip tıklanır, spy log'u görünür), `cypress-stub-clock` (cy.clock()/cy.tick() ile 5 saniyelik setTimeout'un anında atlanması), `cypress-selector-playground` (gerçek Cypress Selector Playground arayüzünün mockup'ı — tıklanan elemana göre en iyi selector + eşleşme sayısı canlı güncelleniyor, kullanıcı doğrudan tıklayarak deniyor), `cypress-ci-pipeline` (GitHub Actions tarzı checkout→install→3 paralel tarayıcı (Chrome/Firefox/Edge)→Cypress Cloud kaydı akışı). Her scenario'nun sağ panelde (`renderDomVisualizer`) Java/Selenium/Mockito/Maven karşılaştırmalı açıklaması var. | ✅ |
| **Doğrulama — build:** `npm run build` 29 route için başarıyla geçti (check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo), `cypressData` chunk'ı ~140KB'tan **223KB**'a çıktı. | ✅ |
| **Doğrulama — canlı tarayıcı (Playwright script, dev server zaten 5173'te açıktı):** 6 yeni sekmenin hepsi tıklanıp içerik render kontrolü yapıldı, her sekmede simulation/Run butonu (Debugging sekmesinde 3 tıklanabilir eleman) test edildi, her sekmede `git-practice` try-it-yourself textarea + "Komutları Kontrol Et" butonu çalıştırılıp doğru ✓/× geri bildirim ve terminal preview üretildiği doğrulandı (örn. Test Organizasyonu sekmesinde kasıtlı karışık sıra doğru şekilde "❌ Sırada eksik..." olarak tespit edildi), dil toggle (TR→EN) içerik ve başlıkları doğru çevirdi, 390px mobil viewport'ta yatay taşma 0, **console error/warn sıfır**. Selector Playground ve CI/CD simülasyonlarının ekran görüntüleri alınıp gerçek Cypress arayüzüne benzer görsel doğrulandı. | ✅ |
| **Aynı oturumda devam — 7. yeni sekme (s17):** Kullanıcı ardından "Cypress'te olan ama Selenium/Playwright/diğer test araçlarında OLMAYAN bir locator ya da özellik varsa ekle" dedi. WebFetch ile docs.cypress.io'nun introduction/get/cypress-studio sayfaları doğrulandı: Cypress'in sorgu motoru gerçek jQuery (Sizzle) olduğu için `:contains()`, `:eq(n)`, `:first/:last` gibi pseudo-class'lar CSS3 standardında YOK ama cy.get() içinde doğrudan çalışıyor (resmi örnekte `ul li:first` doğrulandı); ayrıca `.invoke()`/`.its()` (jQuery metot/property zincirleme) ve **Cypress Studio** (Test Runner içinden ÇALIŞAN bir teste tıklayarak adım ekleme — Playwright codegen'in ayrı script üretmesinden ve Selenium IDE'nin ayrı eklenti olmasından farklı) Cypress'e özel bulundu. `src/data/cypressData.js`'e **🦄 Sadece Cypress'te Olan Özellikler** sekmesi (s17) eklendi: jQuery pseudo-class kod örnekleri, Selenium/Playwright/Cypress karşılaştırma tablosu, `.invoke()`/`.its()` örnekleri, XPath-vs-jQuery `java-compare`, Cypress Studio vs Codegen vs Selenium IDE tablosu, selector güvenilirlik önceliği try-it-yourself'i (data-cy → :contains() → :checked → :eq, en kırılgandan en güvenliye sıralama). Toplam sekme sayısı 17 → **18**, Network & Intercept grubunun (CI/CD'den sonra, Gerçek Hayat'tan önce) son sekmesi olarak yerleşti. | ✅ |
| **Yeni görsel/animasyonlu `simulation` scenario (`cypress-jquery-selectors`, `TopicPage.jsx`):** Gerçek bir meyve listesi (Apple/Banana(gizli)/Cherry/Date(checked)/Elderberry) üzerinde 6 tıklanabilir pseudo-class butonu (:first/:last/:visible/:contains()/:eq(2)/:checked) — her tıklamada eşleşen eleman(lar) yeşil highlight olur, alt panelde gerçek `cy.get()` satırı ve eşleşme sayısı görünür, sağ panelde o pseudo-class'ın Selenium/Playwright'ta nasıl (daha uzun/farklı sözdizimiyle) yapılması gerektiği Java/Selenium karşılaştırmasıyla açıklanır. | ✅ |
| **Doğrulama — build:** `npm run build` 29 route için tekrar başarılı geçti, `cypressData` chunk'ı 223KB'tan **240KB**'a çıktı. | ✅ |
| **Doğrulama — canlı tarayıcı:** Yeni sekme bulundu ve tıklanınca render oldu (jQuery ve "Cypress Studio" metinleri doğrulandı), 6 pseudo-class butonunun hepsi tıklanıp ekran görüntüsü alındı (`:contains()` tıklandığında Cherry doğru highlight oldu, Banana `display:none` etiketiyle soluk/çizili göründü, Date checkbox'ı ☑️ işaretli göründü — görsel doğru), try-it-yourself "Komutları Kontrol Et" butonu çalıştı ve öncelik sıralaması sonucu üretti, dil toggle EN başlığı ("Cypress-Only Superpowers") doğru gösterdi, **console error/warn sıfır**. | ✅ |
| **Çalışma ağacı notu:** Bu oturumda değiştirilen dosyalar: `src/data/cypressData.js`, `src/components/TopicPage.jsx`, `.claude/NEXT_SESSION.md`. Commit/push yapılmadı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 25. kısım — Playwright sayfası: CosmoCode getting-started serisiyle eksik konu kapatma)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `https://playwright.io/playwright/nodejs/getting-started` (CosmoCode'un Playwright Node.js öğretici serisi — resmi playwright.dev değil) tek tek incelenip `/playwright` sayfasındaki eksik konular bulunacak, küçük parçalara bölünüp her biri görsel+animasyon+try-it-yourself ile tamamlanacaktı. | ✅ |
| **Gap analizi:** WebFetch ile 15 alt-sayfa (getting-started, locators, actions, assertions, navigation-waiting, test-organization, fixtures, page-object-model, debugging, traces-screenshots, authentication, mocking-apis, api-testing, parallel-cross-browser, ci-cd) okundu. `playwrightData.js`'deki 10 mevcut sekme (Nedir, Kurulum, Aksiyonlar, Locator, Wait, iframe/Alert, Network/Dosya, Gerçek Hayat, Hatalar, Mülakat) ile karşılaştırıldı. **Tamamen eksik bulunanlar:** Writing Good Assertions, Test Organization (describe/hooks/naming/skip-only-tag), Fixtures & Test Isolation, Page Object Model, Debugging (UI Mode/Inspector), Traces/Screenshots/Videos, Parallel & Cross-Browser, CI/CD. Mocking/Auth kısmen vardı ama ayrı derinlikli sekme yoktu. | ✅ |
| **6 yeni sekme eklendi (`src/data/playwrightData.js`, s10-s15):** ✅ Assertions (expect, web-first vs generic, soft assertion, custom timeout), 🗂️ Test Organizasyonu & Fixtures (describe/beforeEach/afterEach/skip-only-tag tablo + fixture dependency injection), 📦 Page Object Model (LoginPage örneği, POM olmadan/ile karşılaştırma, en iyi pratikler tablosu, "POM her zaman gerekli mi" uyarısı), 🐞 Debugging & Trace (UI Mode gerçek arayüz mockup'ı + Trace Viewer, screenshot/video stratejisi tablosu), ⚡ Paralel & CI/CD (workers, sharding, cross-browser projects, GitHub Actions YAML, serial-vs-parallel animasyonu), 🔐 Auth & Session (storageState 3 adım kurulumu, çoklu rol, API ile login, UI-login-vs-storageState animasyonu). Toplam sekme sayısı 10 → **16**. Her sekme `simple-box` (günlük hayat benzetmesi) ile başlıyor, Java/Selenium karşılaştırma callout'u, tablo, kod örneği, görsel/animasyon, `git-practice` try-it-yourself ve quiz içeriyor (CLAUDE.md Bölüm 9 kuralına uygun). | ✅ |
| **4 yeni `playwright-visual` concept eklendi (`src/components/TopicPage.jsx`):** `assertion-retry` (auto-retry polling animasyonu, AutoWaitVisual'in assertion versiyonu), `fixture-di` (test imzası → Fixture Factory → use() enjeksiyonu → teardown akışı), `pom-flow` (POM yok/kod tekrarı → extract → 20 dosya tek sınıfı paylaşıyor → UI değişince tek satır düzeltme), `ui-mode` (gerçek Playwright UI Mode arayüzünün mockup'ı: sol test ağacı, adım listesi yeşil✓/kırmızı✗, time-travel snapshot, hata paneli — kullanıcının "gerçekte playwright arayüzünü kullan" isteği buna karşılık geliyor). Mevcut `trace` (Trace Viewer) ve `animated-timeline` (serial-vs-parallel, UI-login-vs-storageState racing-bar) block tipleri yeniden kullanıldı, gereksiz yeni component yazılmadı. | ✅ |
| **Doğrulama — build:** `npm run build` 29 route için başarılı geçti (check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo), `playwrightData.js` chunk'ı 235KB'a çıktı (önceden küçüktü), build uyarısı sadece bilinen `javaData`/`TopicPage` chunk boyutu uyarısı. | ✅ |
| **Doğrulama — canlı tarayıcı (Playwright script, dev server zaten 5173'te açıktı):** 16 sekmenin hepsi sayfa metninde bulundu, "Assertions" sekmesine tıklanınca simple-box/tablo/playwright-visual/kod/git-practice/quiz blokları render oldu, 5 yeni sekmenin hepsi (Test Organizasyonu, POM, Debugging & Trace, Paralel & CI/CD, Auth & Session) boş sayfa/console hatası vermeden açıldı, dil `ENG`'e çevrilince Assertions başlığı ve içeriği İngilizce'ye döndü. Ayrıca 4 yeni `playwright-visual` concept'in TÜM step-tab butonları (toplam 21 buton, 4 sekmede) tek tek tıklanarak state geçişlerinde hiçbir console/page hatası üretmediği doğrulandı. | ✅ |
| **Bilinçli ertelenen iş:** `/playwright` sayfasındaki yeni 6 sekmenin 50 soruluk mülakat havuzuna (s9) ekstra soru eklenmedi — POM ve fixtures için zaten mevcut sorular vardı (intermediate seviyede), Assertions/Debugging/CI-CD/Auth için ayrı mülakat sorusu eklenmedi (CLAUDE.md Bölüm 10 minimum 50 kuralı zaten sağlanıyor, bu opsiyonel bir zenginleştirme olarak bir sonraki oturuma bırakılabilir). | ⏳ |
| **Aynı oturumda devam — 2 ek sekme:** Kullanıcı ardından "Codegen nasıl kullanılır" ve "Playwright MCP nedir/özellikleri/nasıl kurulur" konularının da aynı yöntemle (görsel+animasyon+try-it-yourself) eklenmesini istedi. `src/data/playwrightData.js`'e **🎬 Codegen** (s16 — npx playwright codegen komut/flag tablosu, `codegen-flow` animasyonu: launch→recording→assert→save, Selenium IDE karşılaştırması, --save-storage/--load-storage ile auth kaydı uyarısı) ve **🔌 Playwright MCP** (s17 — MCP protokolü tanımı, @playwright/mcp kurulumu adım adım — `installation` block + Claude Desktop/Claude Code config JSON örneği, flag tablosu, `mcp-flow` animasyonu: prompt→tool-call→accessibility snapshot→ref ile aksiyon, snapshot mode vs vision mode, güvenlik uyarısı) eklendi. Toplam sekme sayısı 16 → **18**. `TopicPage.jsx`'e iki yeni `playwright-visual` concept eklendi: `codegen-flow` (gerçek tarayıcı + Inspector penceresi mockup'ı, canlı kod satırı ekleme animasyonu) ve `mcp-flow` (kullanıcı promptu → MCP server → accessibility tree → ref ile click sonucu akışı). Sekme sırası: ...Debugging & Trace → **Codegen** → **Playwright MCP** → Paralel & CI/CD... | ✅ |
| **Doğrulama (devam):** `npm run build` 29 route için tekrar başarılı geçti. Playwright script ile canlı doğrulama: her iki yeni sekme bulundu, tıklanınca boş sayfa/console hatası yok, her ikisindeki playwright-visual step butonları (4+4) tek tek tıklanıp state geçişlerinde hata üretmediği doğrulandı, MCP sekmesinde `installation` block'unun doğru şema (`cmd`/`explanation`, ilk denemede yanlış `command`/`output`/`verify` alanları kullanılmıştı, düzeltildi) ile render olduğu, try-it-yourself ve quiz metinlerinin göründüğü teyit edildi. Commit/push yapılmadı — bu oturumda değiştirilen dosyalar: `src/data/playwrightData.js`, `src/components/TopicPage.jsx`. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 24. kısım — Git/GitHub Actions, Pages ve Settings arayüz eğitimi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Git/GitHub sayfasındaki `Actions` ve `Pages` sekmelerinde GitHub arayüzüne benzeyen görsel anlatım istendi. Actions, Pages ve Settings içindeki butonların ne işe yaradığı; Actions ve Pages'in nasıl kullanılacağı; Settings altında collaborator ekleme, repo public/private yapma, branch rules, secrets, webhooks, environments ve Pages ayarlarının adım adım anlatılması istendi. | ✅ |
| **Actions geliştirmesi:** `src/data/gitGithubData.js` Actions sekmesine GitHub Actions ekran turu eklendi. Üst `Actions` tabı, `New workflow`, `All workflows`, workflow listesi, run satırı, yeşil/kırmızı status icon, `Filter workflow runs`, artifacts, failed job logs, rerun ve cache/runner/usage alanları tabloyla açıklandı. `TopicPage.jsx` içinde `github-actions-ui-tour` simülasyonu eklendi: GitHub benzeri koyu arayüz, sol workflow menüsü, run listesi, failed log, artifact ve `Re-run failed jobs` akışı animasyonla gösteriliyor. | ✅ |
| **Pages geliştirmesi:** Pages sekmesine GitHub Settings → Pages ekranına benzeyen `github-pages-settings-ui` simülasyonu eklendi. `Visit site`, `Unpublish site`, `Source`, `Custom domain`, `Save`, `Remove`, `DNS Check in Progress`, `Enforce HTTPS` kontrollerinin amacı ve gerçek iş uyarıları açıklandı. Animasyonda Settings tabı → Pages menüsü → GitHub Actions source → custom domain → HTTPS → canlı site kontrolü ilerliyor. | ✅ |
| **Settings geliştirmesi:** Pages sekmesine ayrıca `github-repo-settings-tour` simülasyonu eklendi. Repository Settings içinde `Collaborators` / `Add people`, `General` / `Change visibility`, `Branches` / branch protection rule, `Secrets and variables` / `New repository secret`, Actions permissions, webhooks, environments ve Pages source adım adım anlatılıyor. Final görseline `Settings kontrol özeti` eklendi; kullanıcı animasyon bitince Add people, Change visibility, Branch protection rule, New repository secret ve Pages source kontrollerini tek kartta görüyor. | ✅ |
| **Try-it-yourself:** Üç yeni `git-practice` alanı eklendi: Actions run inceleme sırası, Pages ayarını güvenli sırayla yapma, Settings içinde güvenli kontrol sırası. Kullanıcı arayüz adımlarını textarea içinde deneyip doğru sırayı gördüğünde terminal preview ve güvenli akış mesajı alıyor. | ✅ |
| **Doğrulama:** `npm run build` başarılı (29 route SEO/static shell chain). In-app Browser ile `/git-github` TR tarafında Actions sekmesi doğrulandı: yeni Actions turu, tablo, run animasyonu, `Re-run failed jobs`, artifact ve practice başarı mesajı çalışıyor. Pages sekmesinde Pages arayüz turu, Settings arayüz turu, final `Settings kontrol özeti`, iki practice başarı mesajı ve 390px mobil viewport yatay taşma kontrolü doğrulandı. Console error/warn yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 23. kısım — Git/GitHub `.gitignore` sekmesi review ve güçlendirme)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Kullanıcı Git/GitHub sayfasındaki `.gitignore` sekmesini incelememi; eksik, yanlış veya daha iyi olabilecek noktalar varsa düzeltip geliştirmemi istedi. Odak: yeni başlayan kullanıcı `.gitignore` mantığını görsel olarak anlamalı, denemeli ve gerçek iş risklerini açıkça görmeli. | ✅ |
| **Bulunan eksikler:** `.gitignore` için iki özel playground fonksiyonu (`gitignore-create-and-match`, `gitignore-already-tracked-fix`) yazılmıştı ama render listesine bağlı değildi; bu yüzden özel animasyonların ekranda çalışmama riski vardı. Ayrıca içerikte `.env.example` gibi commit edilmesi gereken sample config ayrımı, `git check-ignore -v` ile kural kanıtlama, `git status --ignored --short` ile ignored dosyaları görünür yapma ve secret history/rotate uyarısı yeterince net değildi. | ✅ |
| **İçerik geliştirme:** `src/data/gitGithubData.js` EN/TR `.gitignore` sekmesine "commit mi ignore mu?" karar kartları eklendi. Git Bash/macOS/Linux, Windows CMD, PowerShell, IntelliJ, VS Code ve template sitesiyle `.gitignore` oluşturma yolları ayrıştırıldı. Pattern tablosuna `.env*` + `!.env.example` eklendi; QA automation `.gitignore` örneği `build/`, `reports/`, `.env*`, `!.env.example`, `*.tmp`, `*.swp` ile genişletildi. Secret daha önce push edildiyse `.gitignore`'ın history'yi silmediği, token/key rotate gerektiği açıkça yazıldı. | ✅ |
| **Animasyon/UI geliştirme:** `src/components/TopicPage.jsx` içinde gitignore scenario'ları render listesine bağlandı. `.gitignore` filtreleme animasyonu artık `.env.example` dosyasını commit edilebilir, `node_modules/`, `target/`, `playwright-report/`, `.env`, `app.log` dosyalarını ignored gösteriyor; normal `git status --short` ile `git status --ignored --short` çıktıları ayrı ayrı görünüyor. Rescue animasyonu `git rm --cached .env`, `git check-ignore -v .env` ve "secret history'de görünmüşse rotate et" uyarısını final state'te gösteriyor. Sağ DOM/state paneline tracked/untracked, index, history riski ve güvenli komut açıklamaları eklendi. | ✅ |
| **Try-it-yourself:** Var olan iki pratik güncellendi ve yeni `gitignoreVerifyPractice` eklendi. Kullanıcı artık `.gitignore` oluştururken `.env*`, `!.env.example`, `git check-ignore -v .env`, commit ve status sırasını deniyor; ayrıca ayrı pratikte `git check-ignore -v`, `git status --ignored --short`, normal `git status --short` farkını görüyor. Rescue pratiğinde `git rm .env`, `git add .env` ve gerçek secret yazma gibi riskli girişlere özel uyarılar eklendi. | ✅ |
| **Doğrulama:** `npm run build` başarılı (29 route SEO/static shell chain). In-app Browser ile `/git-github` TR `.gitignore` sekmesi doğrulandı: yeni karar kartları, `.env.example`, `git check-ignore -v`, `git status --ignored --short`, rotate/revoke uyarısı, iki animasyon ve üç practice alanı görünüyor. İki animasyon çalıştırıldı; filtreleme animasyonu normal/ignored status çıktısını doğru gösterdi, rescue animasyonu `git rm --cached .env`, check-ignore çıktısı ve rotate uyarısını gösterdi. Üç practice alanı doğru sırayla başarı verdi. Console error/warn yok. 390px viewport kontrolünde `documentElement` yatay taşma göstermedi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 22. kısım — `/git-document` Chapter 14-61 kök neden tespiti ve parser fix)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `http://localhost:5174/git-document` geliştirmesi yarım kalmıştı (12. kısımda tespit edilmiş ⚠️): sadece 13 chapter görünüyordu, TR/EN eşit değildi. Kullanıcıdan kök nedeni araştırmam istendi. | ✅ |
| **Kök neden bulundu (12. kısımdaki teşhisten daha temel):** `Documents/GitNotesForProfessionals.md` (kullanıcının "orijinal içerik" dediği kaynak) o ana kadar gerçekten eksikti — TOC 61 chapter listeliyordu ama gövde metninde sadece **Chapter 1-13** gerçek içerik olarak vardı; Chapter 13'ten sonraki ~628KB'lık kısmın **%99'u** 6 adet base64 görsel blob'uydu, gerçek metin yoktu. Bu bir parser bug'ı değil, kaynak veri eksikliğiydi. | ✅ |
| **Kullanıcı kaynağı güncelledi:** Kullanıcı `Documents/GitNotesForProfessionals.md` dosyasına PDF'in tam içeriğini kopyaladı (334KB, 5752 satır, 0 görsel blob, TOC'ta ve gövdede tam 61 chapter / 640 section eşleşmesi doğrulandı). Dosya `public/documents/GitNotesForProfessionals.md`'ye kopyalandı (byte-eşit doğrulandı). | ✅ |
| **İkinci kök neden bulundu ve düzeltildi:** PDF→Markdown çıkarımı uzun chapter/section başlıklarını ikinci fiziksel satıra sarıyordu (hard-wrap); parser sadece ilk satırı görüp başlığı kesik alıyordu (8 chapter + 33 section başlığı kesikti, örn. "Chapter 21: .mailmap file: Associating" → devamı "contributor and email aliases" ayrı satırda kalıyordu). `src/components/GitDocPage.jsx` içine `buildTocTitleMaps()` ve `resolveWrappedTitle()` eklendi: TOC'taki (nokta-dolgulu) satırlardan kanonik tam başlık çıkarılıyor, gövdede kesik başlık bulunca TOC'tan tam başlıkla değiştiriliyor ve sarılan devam satırı içerikten atlanıyor (content'e sızmıyor). Chapter 35 gibi tirenin düştüğü ("filterbranch" vs "filter-branch") tek-satırlık bozulmalar için normalize fonksiyonu alfasayısal-dışı karakterleri tamamen siliyor. | ✅ |
| **Doğrulama:** `npm run build` 29 route için başarılı. Playwright ile `/git-document` test edildi: sidebar'da tam 61 chapter (1'den 61: di-tree'ye) görünüyor, önceden kesik olan 8 chapter başlığının hepsi (21, 35, 40, 41, 51, 54, 55, 60) artık tam ve TR çeviri sözlüğünden doğru Türkçe karşılığı buluyor (örn. "35. Geçmişi Yeniden Yazmak (filter-branch)"), arama ile test edilen section başlıkları (21.1, 43.2, 60.1 vb.) tam metinle dönüyor, Chapter 14 (Branching) artık gerçek İngilizce gövde içeriği gösteriyor ("Bu bölüm henüz Türkçe'ye çevrilmemiştir" fallback banner'ı ile, mevcut tasarım gereği), section içeriğinde sarılan başlık satırı tekrarı yok, console error/warn yok. | ✅ |
| **Bilinçli ertelenen iş — TR çeviri kapsamı:** TR dosyası (`public/documents/GitNotesForProfessionals_tr.md`) hâlâ sadece Chapter 1-13'ün çevirisini içeriyor; Chapter 14-61 TR modda mevcut fallback mekanizmasıyla (İngilizce içerik + çevrilmiş başlık + "henüz çevrilmedi" banner'ı) gösteriliyor — bu bir hata değil, var olan tasarım. Chapter 14-61'in tam Türkçe çevirisi yapılmadı (61 chapter'lık büyük bir çeviri işi, kullanıcıyla kapsam onayı sonrası ayrı bir oturumda ele alınmalı). `src/locales/*.json` içindeki "60+ Chapters"/"60+ Bölüm" banner metni gerçek sayıyla (61) hâlâ tutarlı, değiştirilmedi. | ⏳ |
| **"Geliştirme aşamasında" rozeti eklendi (`/git-github` banner):** Kullanıcı, Git/GitHub sayfasındaki "Git® Notes for Professionals Kitabı" banner'ına (`GitDocBanner`, `src/components/GitGithubPage.jsx`) TR çevirisi Chapter 14-61 için henüz tamamlanmadığını belirten görsel bir not istedi. `src/locales/en.json`/`tr.json`'a `gitBanner.tagWip` eklendi (`🚧 Under Development` / `🚧 Geliştirme Aşamasında`), banner'a amber/sarı renkli ayrı bir rozet olarak eklendi (diğer rozetlerden farklı stil, dikkat çeksin diye). Playwright ile TR ve EN modda screenshot alınıp rozetin doğru göründüğü ve diğer rozetlerle çakışmadığı doğrulandı, console hatası yok. | ✅ |
| **"Geliştirme aşamasında" uyarı şeridi eklendi (`/git-document` sayfasının üstü):** Kullanıcı bu kez doğrudan `/git-document` sayfasının kendisinin üstüne, kullanıcının dikkatini çekecek şekilde yanıp sönen (blink) bir uyarı istedi. `src/components/GitDocPage.jsx` içinde `<header>` ile içerik konteyneri arasına tam genişlikte amber/sarı bir şerit eklendi; metin Tailwind `animate-pulse` ile yanıp sönüyor, TR/EN ayrı metin (`Bu sayfa geliştirme aşamasındadır — içerik ve çeviriler güncelleniyor.` / `This page is under development — content and translations are being updated.`), dark/light mode renk uyumlu. Playwright ile TR ve EN ekran görüntüsü alınıp doğrulandı, console hatası yok. | ✅ |
| **Çalışma ağacı notu:** Bu oturumda değiştirilen dosyalar: `Documents/GitNotesForProfessionals.md` (kullanıcı tarafından, ben sadece okudum/doğruladım), `public/documents/GitNotesForProfessionals.md` (yeni içerikle senkronize edildi), `src/components/GitDocPage.jsx` (parser fix + sayfa üstü WIP şeridi), `src/components/GitGithubPage.jsx`, `src/locales/en.json`, `src/locales/tr.json` (WIP rozeti). Commit'lendi: `4d132e3` (ilk parser fix + rozet), WIP şeridi ek commit olarak eklenecek. Push yapılmadı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 21. kısım — QA Mentor Yol Haritası Güncellemeleri)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** `http://localhost:5174/qa-mentor` sayfasındaki tüm yol haritalarında programlama dillerinden sonra Git & GitHub sayfasını yerleştir, her yol haritasına Linux'u bonus olarak ekle, mentor tavsiyelerinde ise Jenkins/Docker/Kubernetes'ten önce Linux'a da bakılabileceğini belirt. | ✅ |
| **Git-GitHub Entegrasyonu:** `src/data/qaMentorData.js` içinde `GIT_GITHUB_NODE(id)` ortak düğüm şablonu oluşturuldu. `MAP_A`, `MAP_B`, `MAP_B_SEL`, `MAP_C1` ve `MAP_C2` yol haritalarında dillerin hemen ardına eklendi; sonraki adım ID'leri sıralı bir şekilde kaydırıldı. | ✅ |
| **Linux Bonus & Tavsiye Entegrasyonu:** `LINUX_BONUS_NODE` (rota: `/linux`) ortak gelişim düğümü tanımlandı ve tüm yol haritalarının `extras` bölümüne bonus olarak eklendi. Ayrıca beş haritanın TR ve EN mentor notlarına DevOps araçları öncesinde Linux sayfasına bakılması gerektiği tavsiyesi yerleştirildi. | ✅ |
| **Doğrulama:** `npm run build` komutu çalıştırıldı ve başarıyla tamamlandı. 29 route için SEO, sitemap, prod bundle ve static HTML shell üretim adımlarının hepsi başarıyla doğrulandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 20. kısım — Yeni `/linux` sayfası eklendi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Yeni bir teknoloji sayfası: Linux. CLAUDE.md'deki kurallara uygun (her sekme `simple-box` ile başlar, görsel+animasyon+try-it-yourself zorunlu, min 50 mülakat sorusu 15/20/15, min 8 hata sözlüğü, Java analojisi her açıklamada) en iyi öğretme yöntemiyle anlatılacak. | ✅ |
| **Yeni route ve dosyalar:** `/linux` route'u eklendi. `src/data/linuxData.js` (yeni, ~1500+ satır, `en`/`tr` ağaçları + paylaşılan `linuxInterviewQuestions`/`linuxErrors` dizileri) ve `src/components/LinuxPage.jsx` (DockerPage.jsx kalıbında ince wrapper) oluşturuldu. `src/App.jsx`, `src/utils/seo.js`, `src/utils/searchIndex.js`, `scripts/generate-static-routes.mjs`, `src/components/HomePage.jsx` (nav kartı + footer linki, DevOps & Cloud grubuna eklendi) güncellendi. | ✅ |
| **İçerik kapsamı:** 10 sekme — Giriş, Kurulum (WSL2/macOS/cloud VM), Dosya Sistemi & Navigasyon, İzinler & Kullanıcılar, Metin İşleme & Pipe'lar, Süreçler & Servisler, Gerçek Hayat QA, Ekosistem, Hata Sözlüğü, Mülakat S&C. Her sekme `simple-box` ile başlıyor, Java analojisi her mülakat cevabında var, Windows/Linux komut karşılaştırma tabloları, gerçek QA senaryoları (cron+PATH outage, disk dolması, Selenium Grid port çakışması, OOM killer, exec format error arm64 vb.) işlendi. | ✅ |
| **Yeni simülasyonlar:** `TopicPage.jsx` içine iki yeni scenario eklendi: `linux-terminal-basics` (pwd→ls→cd→cat→grep canlı terminal + path breadcrumb) ve `linux-permissions-lab` (ls -l → chmod +x → permission denied'dan başarıya, rwx kırılımı sağ panelde canlı güncelleniyor). İkisi de sol Playground + sağ DOM/state paneli + Java analojisi notuyla diğer scenario'larla aynı kalıpta. | ✅ |
| **Try-it-yourself:** Mevcut genel amaçlı `git-practice` block tipi (regex tabanlı adım kontrolü + dangerousPatterns) Linux komut pratiği için yeniden kullanıldı — Kurulum, Dosya Sistemi, İzinler, Metin İşleme ve Süreçler sekmelerinde 5 farklı pratik alanı var; `rm -rf /`, `chmod -R 777`, fork bomb gibi tehlikeli komutlar için özel uyarılar eklendi. | ✅ |
| **Mülakat ve hata sözlüğü:** 50 mülakat sorusu (15 basic + 20 intermediate + 15 advanced), her biri Java analojili ve gerçek QA/CI senaryosu içeriyor (örn. arm64 exec format error, OOM killer, fork bomb, set -euo pipefail, ephemeral CI agent SSH stratejisi). 8 gerçek hata senaryosu (`command not found`, `Permission denied`, `No such file or directory`, `exec format error`, `No space left on device`, `Too many open files`, `Address already in use`, bash syntax error). | ✅ |
| **Doğrulama:** `npm run build` 29 route için başarılı (check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo). `node --check` ile syntax doğrulandı (iki apostrof-escape hatası bulunup düzeltildi). Playwright ile `/linux` canlı test edildi: TR/EN sidebar 10 sekme doğru, simple-box görünüyor, iki yeni simülasyon (Dizin Gezintisi, Permission Denied Atölyesi) animasyon butonlarıyla çalışıp doğru son state'e ulaşıyor, dil toggle TR↔EN tüm metni değiştiriyor, Interview Q&A sekmesinde Basic/Intermediate/Advanced üç seviye de görünüyor, console error/warn yok. | ✅ |
| **Çalışma ağacı notu:** Bu görev sırasında repo üzerinde eşzamanlı başka değişiklikler de gözlemlendi (`CLAUDE.md`, `scripts/generate-seo-files.mjs`, `src/data/whatIsTestingData.js`, `src/locales/en.json`, `src/locales/tr.json`, `Documents/`, `public/documents/GitNotesForProfessionals*.md`, `src/components/GitDocPage.jsx` modified/untracked) — bunlara bu görev kapsamında dokunulmadı, muhtemelen paralel bir oturum/araçtan kaynaklanıyor. Commit/push yapılmadı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 19. kısım — Git Bash klasörde açma ve temel terminal alışkanlığı)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Kullanıcı Git kurulumundan sonra yeni başlayanlara Git Bash/CMD/IDE terminalini doğru klasörde açmayı, sadece Git değil temel terminal komutlarını da görerek ve deneyerek öğretmek istedi. Odak: Explorer adres çubuğuna `cmd` yazma, klasörde `Git Bash Here` açma, IDE terminalinde aynı proje klasöründe çalışmaya başlama, komut yazınca terminal çıktısını okuma. | ✅ |
| **İçerik ekleme:** `src/data/gitGithubData.js` Kurulum sekmesine EN/TR yeni bölüm eklendi: "Git kurulduktan sonra: terminali proje klasöründe aç". İçerik yalnızca terminali doğru yerde açma ve temel komut çıktısını okuma konusuna odaklanıyor; Windows Explorer, Git Bash Here ve IDE terminal yolu ayrı kartlarla anlatılıyor. | ✅ |
| **Yeni animasyonlar:** `src/components/TopicPage.jsx` içine iki yeni scenario eklendi: `git-bash-open-folder` Windows klasöründe adres çubuğuna `cmd` yazma, `Git Bash Here` ve IDE terminal akışını gösteriyor; `git-bash-command-runner` `pwd`, `ls`/`dir`, `cd`, `mkdir`, `touch`, `echo`, `cat`/`type`, `ipconfig`, `git --version` komutlarını terminal geçmişi ve beklenen çıktılarıyla gösteriyor. Her ikisinin sağ DOM/state açıklama paneli var. | ✅ |
| **Try-it-yourself:** `gitBashDailyCommandsPractice` eklendi. Kullanıcı `pwd` → `ls` → `mkdir terminal-demo` → `cd terminal-demo` → `touch notes.txt` → `echo "ilk terminal notum" > notes.txt` → `cat notes.txt` → `cd ..` → `ipconfig` sırasını yazınca başarı alıyor. Amaç: terminale eli alışsın, hangi komutun ekranda ne değiştirdiğini görsün. | ✅ |
| **Doğrulama:** `npm run build` başarılıydı (28 route SEO/static shell chain). In-app Browser ile `/git-github` TR Kurulum sekmesi doğrulandı: yeni başlıklar, Explorer/Git Bash/IDE kartları, iki animasyon ve try-it-yourself alanı görünüyor. `git-bash-open-folder` animasyonunda adres çubuğu `cmd`, CMD prompt, `Git Bash Here`, `$ pwd` ve IDE terminal çıktıları doğrulandı. `git-bash-command-runner` animasyonunda `pwd`, `ls`, `cd`, `mkdir`, dosya oluşturma/okuma, `ipconfig` ve `git --version` hem komut hem çıktı olarak göründü. Practice doğru sırayla başarı verdi. Console error/warn yok. 390px viewport kontrolünde `documentElement` yatay taşma göstermedi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 18. kısım — Terminal, Git Bash ve komut rehberi görsel/pratik ekleme)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Kullanıcının `terminal_ve_komut_rehberi_v2.html` taslağı incelendi. Amaç: Git’i daha kolay kullanabilmek için Git Bash, CMD, PowerShell, macOS/Linux terminal ve IDE terminal farklarını sade, görsel, animasyonlu ve denenebilir şekilde öğretmek. | ✅ |
| **İçerik ekleme:** `src/data/gitGithubData.js` Kurulum sekmesinin başına EN/TR yeni terminal araçları dersi eklendi. Anlatım sırası: terminal pencere vs shell motoru vs Git programı → Git Bash/PowerShell/CMD/macOS Terminal/Linux Terminal/IDE Terminal seçim kartları → güvenli ilk terminal turu pratiği → mevcut Windows/macOS/Linux Git kurulumu. Geniş tablolar mobilde taşmasın diye responsive `grid` kartlarına çevrildi. | ✅ |
| **Yeni animasyonlar:** `src/components/TopicPage.jsx` içine iki yeni scenario eklendi: `git-terminal-shell-map` komutun terminal → shell → Git → `.git` → output yolculuğunu gösteriyor; `git-terminal-install-use` indir → kur → aç → `git --version` ile doğrula → VS Code/IntelliJ terminalinde kullan akışını gösteriyor. Her ikisinin de sağ DOM/state açıklama paneli var. | ✅ |
| **Try-it-yourself:** `terminalToolsPractice` eklendi. Kullanıcı komutları `pwd` → `ls`/`dir` → `mkdir git-practice` → `cd git-practice` → `git --version` → `git init` → `git status` sırasına koyunca başarı alıyor. Amaç: Git komutlarından önce doğru klasör ve kurulum doğrulama alışkanlığı kazandırmak. | ✅ |
| **Doğrulama:** `npm run build` başarılı (28 route SEO/static shell chain). In-app Browser ile `/git-github` TR Kurulum sekmesi doğrulandı: yeni başlıklar, kartlar, iki animasyon ve try-it-yourself alanı görünüyor. İki animasyon çalıştırıldı; terminal/shell/Git akışı ve kurulum turu doğru çıktı verdi. Practice doğru sırayla başarı verdi. Console error/warn yok. 390px viewport kontrolünde yeni kartlar taşma üretmedi; görülen genişlik sinyali mevcut HTTPS/SSH uzun bash comment satırları ve üst kontrol grubundan geliyor, document root yatay taşma göstermiyor. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 17. kısım — Git stash TR eşitleme ve öğretme kuralları)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Git/GitHub Branching içindeki `git stash` konusu Türkçe tarafta eksikti. Kullanıcı, öğretim kurallarının da kalıcı hale gelmesini istedi: odak dışına çıkma, görsel/animasyon/pratik zorunlu olsun, kullanıcı denesin ve sonucu görsün. | ✅ |
| **Stash içerik eşitleme:** `src/data/gitGithubData.js` TR Branching bölümüne `git stash: commit etmeden yarım işi geçici rafa koy` başlığı, `git-stash-flow` animasyonu, komut/amaç tablosu, `gitStashPractice` try-it-yourself pratiği ve gerçek iş uyarısı eklendi. EN/TR iki dilde `git-stash-flow` kullanımı `node -e` kontrolüyle 1/1 doğrulandı. | ✅ |
| **Kalıcı öğretme kuralları:** `CLAUDE.md` Bölüm 9 altına `9.1. Öğretme Yöntemi ve Odak Kuralları` eklendi. Kurallar: odak dışına çıkmama, önce mantık sonra komut, görsel + animasyon + deneme zorunluluğu, sonucun görünür olması, her geliştirmeden sonra kendi kendini denetleme ve “daha iyi olabilir mi” kontrolü. Anlık durum veya commit hash `CLAUDE.md` içine yazılmadı. | ✅ |
| **Kendi geliştirme kontrolü:** Eklenen stash konusu yalnızca branch değiştirirken yarım işi geçici rafa alma akışına odaklandı; yan konu eklenmedi. Kullanıcı animasyonda working tree/stash shelf durumunu görüyor, try-it-yourself alanında doğru komut sırasını giriyor ve başarı/eksik adım sonucunu görüyor. | ✅ |
| **Doğrulama:** `npm run build` başarılı (28 route SEO/static shell chain). In-app Browser ile `/git-github` TR Branching sekmesi doğrulandı: stash başlığı, animasyon, komut tablosu, uyarı ve try-it-yourself alanı görünüyor. Animasyon çalıştırıldı; `git stash` sonrası shelf doluyor, `git stash pop` sonrası iş geri dönüyor. Practice doğru sırayla başarı verdi: `git stash` → `git switch main` → `git switch feature/login` → `git stash pop`. Console error/warn yok. 390px viewport'ta kök sayfa yatay taşma göstermedi; geniş bash satırları kendi kod alanında yatay kaydırmalı kalıyor. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 16. kısım — Antigravity: Git/GitHub 7 Yeni Simülasyon ve İçerik Genişletmesi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı Yönü:** Git/GitHub görsel öğrenme sayfasının daha öğretici ve zengin hale getirilmesi; git kurulumundan başlayarak adım adım hesap açma, klonlama, gizli klasörler, diff okuma, log geçmişi, stashing ve revert vs reset farkının açıklanması. | ✅ |
| **İçerik Ekleme:** [gitGithubData.js](file:///d:/ANTIGRAVITY/automationexercise/src/data/gitGithubData.js) dosyasındaki Kurulum, Git Temelleri, Branching ve Riskler sekmelerine hem Türkçe hem İngilizce detaylı rehberler, uyarılar ve 3 yeni `git-practice` (Try-It-Yourself) sıraya koyma egzersizi eklendi. | ✅ |
| **Simülasyon Geliştirmeleri:** [TopicPage.jsx](file:///d:/ANTIGRAVITY/automationexercise/src/components/TopicPage.jsx) bileşeni içerisine 7 yeni animasyonlu simülasyon (`github-account-repo-setup`, `git-clone-vs-init`, `git-dot-folder`, `git-diff-reader`, `git-log-timeline`, `git-stash-flow`, `git-revert-vs-reset`), DOM/state görselleştiricileri ve senaryo yönlendiricileri başarıyla entegre edildi. | ✅ |
| **Doğrulama:** `npm run build` komutu çalıştırılarak 28 route'luk SEO statik shell üretimi ve dist SEO kontrollerinin sorunsuz geçtiği kanıtlandı. Tarayıcı üzerinden Türkçe ve İngilizce dillerindeki tüm yeni simülasyon adımları ve kod pratikleri doğrulandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 15. kısım — Git/GitHub kavram sırası ve neden-sonuç haritası)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Kullanıcı Git/GitHub sayfasında komutlardan önce kavram sırası istedi: önce ne gelir, neden yapılır, yapılmazsa ne olur; `git init`, `git add`, `git commit`, remote/origin, branch, push, fetch, merge, pull, conflict gibi kavramlar açık ve adım adım anlatılmalı. | ✅ |
| **İçerik ekleme:** `src/data/gitGithubData.js` Giriş sekmesine EN/TR yeni “komutlardan önce sıralamayı anla” bölümü eklendi. Her adım için “işlem / amaç / yapılmazsa veya karışırsa ne olur” tablosu yazıldı. `clone`, `push`, `fetch`, `merge`, `pull`, `branch`, `conflict` kavramları ayrı anlam/fark tablosuyla açıklandı. `git init` ile yeni local proje, `git clone` ile GitHub’da zaten var olan repo ayrımı netleştirildi. | ✅ |
| **Yeni animasyon:** `TopicPage.jsx` içine `git-concept-order-map` scenario eklendi. Animasyon local klasör → `.git` → status → stage → commit → origin → push main → feature branch → push feature → fetch/merge/pull → conflict akışını görsel local/GitHub kartları ve terminal çıktılarıyla gösteriyor. Sağ DOM/state paneli her adımın amacını ve atlanırsa oluşacak riski anlatıyor. | ✅ |
| **Try-it-yourself:** Yeni `git-practice` alanı eklendi. Kullanıcı komutları `git init` → `git status` → `git add README.md` → initial commit → `git remote add origin ...` → `git push -u origin main/master` → `git switch -c feature/login-tests` → feature commit → `git push -u origin feature/login-tests` → `git fetch origin` → `git merge origin/main` sırasına koyunca başarı alıyor. | ✅ |
| **Sıra tutarlılığı:** Giriş artık Step 1 Git zihinsel modeli, Step 2 GitHub takım alanı, Step 3 komutlardan önce sıra haritası olarak ilerliyor. Git Temelleri sekmesindeki `git-three-areas` başlığı Step 4, `git-remote-origin-setup` başlığı Step 5 yapıldı. | ✅ |
| **Doğrulama:** `npm run build` başarılı (28 route SEO/static shell chain). In-app Browser ile `/git-github` doğrulandı: EN/TR yeni kavram haritası, amaç/yapılmazsa tablosu, clone/push/fetch/merge/pull kavramları, animasyon ve practice alanı görünüyor. Animasyon çalıştırıldı; terminal akışı doğru sırada oluştu. Practice alanı doğru komut sırasıyla success verdi. Git Temelleri Step 4/5 başlıkları TR modda doğrulandı. Mobil 390px viewport’ta yatay taşma 0. Console error/warn yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 14. kısım — Git origin remote setup/list remotes görsel-pratik ekleme)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Kullanıcının görsellerindeki konu Git Temelleri içinde ayrı bir ders olarak ele alındı: localde en az 1 commit oluşturduktan sonra `git remote add origin [REMOTE_URL]`, `git remote`, `git remote -v` / `git remote --verbose`, `git push -u origin main/master`, login/credential manager davranışı. | ✅ |
| **İçerik ekleme:** `src/data/gitGithubData.js` Git Temelleri sekmesine EN/TR yeni anlatım eklendi. `origin` sadece GitHub repo adresini tanıtır, tek başına upload yapmaz; `git remote -v` fetch/push URL’lerini gösterir; modern varsayılan branch için `main`, eski repo gerçekten öyleyse `master` kullanılır; yanlış URL için `git remote set-url origin [REMOTE_URL]` notu yazıldı. | ✅ |
| **Yeni animasyon:** `TopicPage.jsx` içine `git-remote-origin-setup` scenario eklendi. Animasyon local repo’da ilk commit snapshotı, GitHub repo URL’sinin `origin` olarak bağlanması, `git remote -v` ile URL kontrolü, `git push -u origin main` ile upstream kurulması ve Windows Credential Manager/macOS Keychain login saklama notunu görsel kartlar ve terminal akışıyla gösteriyor. Sağ DOM/state paneli aynı adımları açıklıyor. | ✅ |
| **Try-it-yourself:** Yeni `git-practice` alanı eklendi. Kullanıcı komutları `git status` → `git add ...` → `git commit -m ...` → `git remote add origin ...` → `git remote -v` veya `--verbose` → `git push -u origin main/master` sırasına koyunca başarı alıyor. HTTPS ve SSH GitHub remote URL varyantları kabul ediliyor; token/şifreyi URL içine yazma uyarısı eklendi. | ✅ |
| **Doğrulama:** `npm run build` başarılı (28 route SEO/static shell chain). In-app Browser ile `/git-github` Git Temelleri sekmesi doğrulandı: TR ve EN içerik, yeni başlık, `git remote add origin`, `git remote -v`, `git remote --verbose`, `git push -u origin main`, Credential Manager/Keychain uyarısı ve practice alanı görünüyor. Animasyon çalıştırıldı; terminalde `git log`, `git remote add origin`, `git remote -v`, `git push -u origin main`, sonraki `git push` notu oluştu. Practice alanı doğru komut sırasıyla success verdi. Mobil 390px viewport’ta yatay taşma 0. Console error/warn yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-19, 13. kısım — Git remote branch publish görsel/pratik ekleme)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü:** Git doküman sayfası şimdilik ertelendi. Branching sekmesine kullanıcının notundaki "local branch'i remote'da ilk kez açma" konusu eklenecek; görsel animasyon ve try-it-yourself alanı olmalı. | ✅ |
| **İçerik ekleme:** `src/data/gitGithubData.js` Branching sekmesine EN/TR yeni remote publish bölümü eklendi. Konu: `git switch hasan`, `git push -u origin hasan`, alternatif olarak `git push -u https://github.com/hasankocaman/deneme2.git hasan`, `git branch -vv` ile upstream kontrolü ve sonraki pushlarda sadece `git push` kullanımı. "İlk publish yöntemlerinden sadece birini bir kez kullan" uyarısı açık yazıldı. | ✅ |
| **Yeni animasyon:** `TopicPage.jsx` içine `git-remote-branch-publish` scenario eklendi. Animasyon local `hasan` branch'inin GitHub tarafında `origin/hasan` remote branch'e dönüşmesini, iki ilk publish yöntemini, upstream bağını ve sonraki kısa `git push` akışını gösteriyor. Sağ DOM/state paneli de aynı adımları açıklıyor. | ✅ |
| **Try-it-yourself:** Yeni `git-practice` alanı eklendi. Kullanıcı komutları `git switch hasan` → `git push -u origin hasan` veya direkt URL yöntemi → `git branch -vv` → `git push` sırasına koyunca başarı alıyor. Regex ayrıca `hasan2` ve `feature/hasan` varyantlarını kabul edecek şekilde yazıldı. | ✅ |
| **Doğrulama:** `npm run build` başarılı (28 route SEO/static shell chain). In-app Browser ile `/git-github` Branching sekmesi doğrulandı: yeni remote publish başlığı, uyarı, iki yöntem komutu, animasyon ve try-it-yourself alanı görünüyor. Animasyon çalıştırıldı; terminalde `git switch hasan`, `git push -u origin hasan`, `git branch -vv`, `git push` akışı oluştu. Practice alanı doğru komut sırasıyla success verdi. TR modda başlık/uyarı/pratik görünüyor. Mobil 390px viewport'ta Branching içeriğinde yatay taşma 0. Console error/warn yok. | ✅ |

## ⚠️ Bu Oturumda Kontrol Edilenler (2026-06-18, 12. kısım — Antigravity Git Doküman Review)

| Görev | Durum |
|-------|-------|
| **NEXT_SESSION okundu:** Güncel çalışma ağacında `/git-github` görsel öğrenme sayfası, branch/merge/conflict genişletmeleri ve Antigravity tarafından eklenen `/git-document` route'u bulunuyor. | ✅ |
| **Antigravity çıktısı kontrol edildi:** `src/components/GitDocPage.jsx`, `src/components/GitGithubPage.jsx`, `public/documents/GitNotesForProfessionals.md`, `public/documents/GitNotesForProfessionals_tr.md`, SEO/static route entegrasyonları ve tarayıcıda `/git-document` incelendi. Banner tıklaması `/git-document` route'una gidiyor; route render oluyor ve console error/warn yok. | ✅ |
| **Kritik eksik:** Önceki 10. kısımda yazan "61 bölüm eksiksiz Türkçe kılavuz" notu doğrulanmadı. Parser ve tarayıcı sonucu şu an yalnızca 13 chapter gösteriyor; `/git-document` içinde Chapter 14 Branching ve sonrası kullanıcıya görünmüyor. İngilizce dosyada 14-61 arası başlıkların çoğu gerçek gövde değil, içindekiler satırlarında `...` ile geçiyor ve `GitDocPage` parser'ı bunları bilerek dışlıyor. | ⚠️ |
| **TR/EN içerik eşitliği sorunu:** Türkçe dosya 737KB olsa da sadece 13 `Chapter` başlığı içeriyor ve birçok bölümde İngilizce cümleler/yarım çeviri var; örnek: `public/documents/GitNotesForProfessionals_tr.md` Section 1.2 hâlâ "The **git clone** command..." diye başlıyor. Bu nedenle "Türkçe ve İngilizce kapsam eşitlendi" iddiası geçerli değil. | ⚠️ |
| **UI tutarsızlığı:** Git/GitHub ana sayfasındaki referans kartı kullanıcıya "60+ Chapters" mesajı veriyor; fakat tıklanan `/git-document` sayfası 13 chapter ile bitiyor. Kart metni veya doküman içeriği düzeltilmeden bu haliyle yanıltıcı. | ⚠️ |
| **Bir sonraki doğru iş:** Kaynak markdown/PDF extraction yeniden düzenlenmeli; EN tarafında gerçek 61 chapter gövdesi parser'ın anlayacağı açık `Chapter`/`Section` satırlarına ayrılmalı, TR dosyası aynı chapter/section ID'leriyle eşitlenmeli, build öncesi chapter/section parity check eklenmeli ve banner chapter sayısı gerçek veriyle uyumlu yapılmalı. | ⏳ |
| **Doğrulama:** Browser ile `/git-document` TR/EN kontrol edildi: Chapter 13 var, Chapter 14 yok. Git/GitHub sayfasındaki banner tıklaması route'a gidiyor. Bu review sırasında yeni build çalıştırılmadı; mevcut çalışma ağacındaki son bilinen `npm run build` sonucu 28 route için başarılıydı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 11. kısım — Git/GitHub Branch-Merge-Conflict görsel genişletme)

| Görev | Durum |
|-------|-------|
| **Kullanıcı geri bildirimi:** Branch açma, merge yapma ve conflict çözme konuları daha detaylı, daha fazla görsel/animasyonla; özellikle `git branch`, `git branch hasan`, `git checkout -b hasan`, `git switch hasan`, `git branch -m ...` gibi komutların sonucunda ne olduğunu adım adım anlatacak şekilde genişletilmeli. | ✅ |
| **Yeni görsel simülasyonlar:** `TopicPage.jsx` içine üç yeni Git scenario eklendi: `git-branch-lab` (local branch list/create/switch/rename/push), `git-merge-lab` (origin/main güncellemesini feature branch içine alma), `git-conflict-lab` (conflict marker → final davranış → test → add → continue). Her biri sol canlı demo + sağ DOM/state anlatımıyla çalışıyor. | ✅ |
| **Branch komut sözlüğü:** `gitGithubData.js` Branching sekmesine EN/TR komut-sonuç tablosu eklendi: `git branch`, `git branch hasan`, `git checkout -b hasan`, `git switch -c hasan`, `git switch hasan`, `git checkout hasan`, `git branch -m main`, `git branch -m old_name new_name`. | ✅ |
| **Try-it-yourself alanları:** Branch komut mini lab eklendi. Kullanıcı komutları listele → oluştur → geç → rename → tek komutta oluştur+geç sırasına koyuyor; `GitPracticeBlock` doğru sıralamayı kontrol edip başarı/eksik adım çıktısı veriyor. Conflict güvenli bitirme ve branch başlangıç pratikleri de korunuyor. | ✅ |
| **Gerçek iş akışı:** Kullanıcının notundaki güvenli sıra ayrı code block olarak eklendi: önce `git status`, değişikliği commit et, `main` branch’e geç, `git pull --ff-only origin main`, kendi branch’ine dön, `git merge main`, conflict çıkarsa localde çöz/test et. Commit edilmemiş değişiklikle branch değiştirme riskine açık uyarı eklendi. | ✅ |
| **Doğrulama:** `npm run build` başarılı (mevcut çalışma ağacında 28 route SEO/static shell chain). In-app Browser ile `/git-github` Branching sekmesi doğrulandı: yeni branch komut haritası, komut-sonuç tablosu, mini lab, güvenli switch/pull/merge akışı ve TR karşılıkları görünüyor. Branch mini lab doğru komut sırasıyla başarı verdi; branch animasyonu `git branch → git branch hasan → git switch hasan → git branch -m feature/hasan → git push -u origin feature/hasan` terminal akışını gösterdi. Console error/warn yok. | ✅ |
| **Çalışma ağacı notu:** Commit/push yapılmadı. Bu görevde `src/components/TopicPage.jsx` ve `src/data/gitGithubData.js` üzerinde çalışıldı; build artifact/SEO dosyaları build nedeniyle güncellendi. `.claude/settings.local.json` ve çalışma ağacında bulunan Git doküman sayfası/`Documents/` kaynakları bu görev kapsamında elle değiştirilmedi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 10. kısım — Git/GitHub Başvuru Kitabı / Doküman Sayfası)

| Görev | Durum |
|-------|-------|
| **Kullanıcı Talebi:** `Documents/GitNotesForProfessionals.md` dosyasını incele, Java sayfasındaki referans dokümanı gibi bir doküman sayfası geliştir (Türkçe/İngilizce toggle destekli, adım adım öğretici, kurulum ve hesap açma dahil). Mevcut Git/GitHub sayfasını bozmadan bu dokümanı oraya link olarak ekle. | ✅ |
| **Yeni Rotalar & Bileşenler:** `/git-document` rotası eklendi, `<GitDocPage />` bileşeni oluşturuldu. `Documents/GitNotesForProfessionals.md` dosyası `public/documents/GitNotesForProfessionals.md` olarak kopyalandı. | ✅ |
| **Türkçe İçerik Geliştirme:** `public/documents/GitNotesForProfessionals_tr.md` dosyası oluşturuldu; ancak 12. kısım review'unda bu dosyanın eksiksiz 61 bölüm ve TR/EN kapsam eşitliği sağlamadığı doğrulandı. Şu an parser/tarayıcı yalnızca 13 chapter gösteriyor ve TR içerikte İngilizce/yarım çevrilmiş paragraflar var. Bu satırdaki önceki "61 bölüm eksiksiz" iddiası geçersiz sayılmalı. | ⚠️ |
| **Banner Entegrasyonu:** `src/components/GitGithubPage.jsx` içerisine `GitDocBanner` eklenerek Git/GitHub ana sayfasından referans dokümanına geçiş linki sağlandı (Java sayfasındaki banner ile aynı yapıda). | ✅ |
| **SEO & Sitemap Entegrasyonu:** `/git-document` rotası sitemap (`whatIsTestingData.js`), SEO metadata (`seo.js`), statik route shell üretici (`generate-static-routes.mjs`) ve sitemap öncelik ayarlarına (`generate-seo-files.mjs`) entegre edildi. | ✅ |
| **Doğrulama:** `npm run build` başarıyla tamamlandı (check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo zinciri 28 route için sorunsuz geçti). | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 9. kısım — Git/GitHub Giriş checkbox unselect fix)

| Görev | Durum |
|-------|-------|
| **Kullanıcı geri bildirimi:** Git/GitHub sayfasında Giriş sekmesi quiz ile tamamlandıktan sonra checkbox geri alınamıyordu; ekranda `1/10 tamamlandı` ve `1 quiz` kalıyordu. | ✅ |
| **Kök neden:** `TopicPage.jsx` içinde sidebar checkbox tıklaması sadece `completedTabs` kaydını değiştiriyordu. Sekme quiz ile tamamlandıysa `quizVerifiedTabs[0]` true kaldığı için Giriş hâlâ tamamlanmış sayılıyordu. | ✅ |
| **Düzeltme:** `toggleTabComplete` artık mevcut durum `completedTabs ∪ quizVerifiedTabs` üzerinden hesaplıyor. Tamamlanmış bir sekmeye tekrar basıldığında hem `completedTabs[tabIndex]` hem `quizVerifiedTabs[tabIndex]` temizleniyor ve iki localStorage anahtarı da güncelleniyor. | ✅ |
| **Doğrulama:** `npm run build` başarılı (27 route SEO/static shell chain). In-app Browser ile `/git-github` mobil viewport'ta test edildi: Giriş quiz'i doğru cevaplandı, checkbox ✓ oldu, checkbox'a tekrar basınca ✓ kalktı ve `Mark completed` durumuna döndü. Console error/warn yok. Dev server `http://127.0.0.1:5173/git-github` üzerinde yeniden açık bırakıldı. | ✅ |
| **Çalışma ağacı notu:** Commit/push yapılmadı. Geçici dev server log dosyaları temizlendi. `.claude/settings.local.json` untracked yerel ayar dosyası olarak dokunulmadan bırakıldı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 8. kısım — Git/GitHub sidebar checkbox/aktif tab uyumu)

| Görev | Durum |
|-------|-------|
| **Kullanıcı geri bildirimi:** Git/GitHub sayfasındaki sol sekme yapısı ve checkbox görünümü diğer sayfalardan farklı görünüyordu; aktif tab yeşil/teal kalıyor, quiz state yüzünden checkbox içinde küçük beyin ikonu görünebiliyordu. | ✅ |
| **Git/GitHub sayfa rengi:** `src/components/GitGithubPage.jsx` içindeki `gradient` Java sayfasındaki aktif tab stiliyle uyumlu olacak şekilde `from-orange-600 to-amber-600` yapıldı; `bgLight` de orange/amber/yellow ailesine çekildi. | ✅ |
| **Ortak checkbox düzeltmesi:** `TopicPage.jsx` sidebar checkbox render'ı sadeleştirildi. `completedTabs` veya `quizVerifiedTabs` true ise checkbox artık standart yeşil check olarak görünüyor; stale quiz state olsa bile beyin ikonu selectbox içinde görünmüyor. Progress count da `completedTabs ∪ quizVerifiedTabs` üzerinden hesaplanıyor. | ✅ |
| **Doğrulama:** `npm run build` başarılı (27 route SEO/static shell chain). In-app Browser ile `/git-github` 390px viewport'ta kontrol edildi: aktif tab class'ı `from-orange-600 to-amber-600`, sidebar checkbox'ta beyin ikonu yok, yatay taşma 0, console error/warn yok. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 7. kısım — Git/GitHub giriş ve kurulum görsel revizyonu)

| Görev | Durum |
|-------|-------|
| **Kullanıcı geri bildirimi:** `/git-github` sayfasının ilk tanıtım akışı komutlara fazla erken giriyordu. Kullanıcı, Git'in ne olduğunu önce uzun görsel/animasyonlu anlatımla; ardından GitHub'ın ne olduğunu yine görsel/animasyonlu anlatımla öğrenmek istedi. Kurulumda da Windows/macOS/Linux ayrı ayrı ve görsel destekli anlatılmalı. | ✅ |
| **Giriş akışı sadeleştirildi:** Giriş sekmesindeki erken `git status/add/commit/push` kod bloğu kaldırıldı. Yeni sıra: `simple-box` → `git-snapshot-story` simülasyonu → kısa zihinsel model metni → `github-collaboration-story` simülasyonu → Git/GitHub/Java analojisi/QA değeri kartları → quiz. Böylece kullanıcı komut ezberine geçmeden önce Git'i proje hafızası, GitHub'ı takım kalite alanı olarak görüyor. | ✅ |
| **Yeni görsel simülasyonlar:** `git-snapshot-story` eklendi (klasör → değişiklik → snapshot rafı → karşılaştırma → güvenli dönüş). `github-collaboration-story` eklendi (local branch → Pull Request → Actions checks → main). Her ikisi de sağ panel DOM/state açıklamalarıyla desteklendi. | ✅ |
| **Kurulum sekmesi yeniden kurgulandı:** Tek karışık kurulum bloğu yerine önce `git-install-os-setup` görsel kurulum haritası eklendi. Ardından Windows, macOS ve Linux için ayrı `installation` blokları yazıldı; her OS kendi kurulum komutu, `git --version` doğrulaması, `user.name`, `user.email`, `init.defaultBranch main` ve config kontrol adımlarıyla anlatılıyor. | ✅ |
| **Kurulumdan ilk repo kodu çıkarıldı:** `mkdir git-lab`, `git init`, ilk commit gibi pratik kodlar kurulum sekmesinden kaldırıldı; kurulum artık yalnızca araç kurulumu, doğrulama ve kimlik ayarı odaklı. Git çalışma alanları simülasyonu `Git Temelleri` sekmesine taşındı. | ✅ |
| **Doğrulama:** `npm run build` başarılı (27 route SEO/static shell chain). In-app Browser ile `/git-github` doğrulandı: EN girişte Step 1/Step 2 görsel simülasyonları render oldu, eski erken komut bloğu ilk 5000 karakterde görünmedi, Git snapshot animasyonu final state'e ulaştı, kurulum sekmesinde Windows/macOS/Linux başlıkları ve kurulum haritası göründü, `mkdir git-lab` artık kurulumda yok, kurulum animasyonu kimlik state'ine ulaştı, console error/warn yok. 390px mobil viewport'ta yatay taşma 0. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 6. kısım — Git ve GitHub görsel öğrenme sayfası)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `CLAUDE.md`, `.claude/NEXT_SESSION.md`, `codexSeo.md`, `.claude/CONTENT_RULES.md` ve `.claude/UI_STANDARDS.md` okundu. Kullanıcıya güncel durum özetlendi: canlı hedef GitHub Pages, push bekleyen önceki local commit'ler, `.claude/settings.local.json` untracked ve `Documents/_Java notlar.md` ignore kuralı. | ✅ |
| **Resmi kaynak kontrolü:** GitHub Actions workflow syntax ve GitHub Pages publishing source davranışı resmi GitHub Docs üzerinden doğrulandı; içerikte güncel Actions/Pages kavramları buna göre yazıldı. | ✅ |
| **Yeni route:** `/git-github` route'u eklendi. Dosyalar: `src/components/GitGithubPage.jsx`, `src/data/gitGithubData.js`, `src/App.jsx`, `src/utils/seo.js`, `src/utils/searchIndex.js`, `scripts/generate-static-routes.mjs`, `src/components/HomePage.jsx`. Ana sayfa DevOps & Cloud kartına ve footer linklerine `Git/GitHub` eklendi. | ✅ |
| **İçerik kapsamı:** Git ve GitHub sayfası Java sayfasındaki "Gör, Anla, Dene" yöntemine uygun olarak 10 sekmeyle yazıldı: Giriş, Kurulum, Git Temelleri, Branching, GitHub Akışı, GitHub Actions, GitHub Pages, Gerçek İş Riskleri, Hata Sözlüğü, Mülakat S&C. Kurulumda Windows/macOS doğrulama adımları, SSH/HTTPS ayrımı, ilk repo akışı; Actions tarafında workflow anatomy, matrix/cache/artifact/secrets; Pages tarafında custom domain, CNAME, SPA fallback ve SEO riskleri anlatıldı. | ✅ |
| **Yeni interaktif block tipi:** `git-practice` eklendi (`TopicPage.jsx`). Kullanıcı textarea içinde Git komut akışı yazıyor; block sıralı expected step kontrolü yapıyor, tehlikeli komutları (`reset --hard`, `push --force`, `clean -f`) uyarıyor ve terminal preview gösteriyor. Sayfada 3 try-it-yourself alanı var: ilk güvenli commit, PR branch hazırlığı, destructive komut öncesi kurtarma planı. | ✅ |
| **Yeni simülasyonlar:** `git-three-areas` (working tree → staging area → local repository → GitHub remote), `github-pr-flow` (branch → commit → push → PR → review → checks → merge) ve `github-actions-pages` (push → workflow trigger → checkout → npm ci → test → build → artifact → Pages deploy → live domain) eklendi. Her biri sağ panel DOM/state görselleştiricisine bağlandı. | ✅ |
| **Hata sözlüğü ve mülakat:** 9 gerçek Git/GitHub hata senaryosu eklendi (`not a git repository`, `pathspec`, non-fast-forward, merge conflict, detached HEAD, SSH publickey, HTTPS auth, GH013 repo rule, unrelated histories). Mülakat sekmesi 52 soru içeriyor: 15 basic, 20 intermediate, 17 advanced; cevaplar gerçek iş güvenliği ve Java analojisiyle yazıldı. | ✅ |
| **Doğrulama — build:** `npm run build` başarılı. Zincir 27 route için geçti: `check-seo` → `generate-seo-files` → Vite prod build → 27 static route HTML shell → `check-dist-seo`. Bilinen uyarılar devam ediyor: eski Browserslist/caniuse-lite ve büyük `javaData` chunk. | ✅ |
| **Doğrulama — browser:** In-app Browser ile `http://127.0.0.1:5173/git-github` test edildi. TR render, 10 sekme, giriş simülasyonu, `git-practice` başarı state'i, Actions→Pages simülasyonu (`learnqa.dev`, `deploy-pages`, `pages: write`) doğrulandı. EN dil geçişinde başlık/subtitle/Actions metni doğru çıktı. Mobil 390px viewport'ta yatay taşma 0. Console error/warn yok. | ✅ |
| **Çalışma ağacı notu:** Bu oturumda commit/push yapılmadı. Bekleyen kaynak değişiklikleri yukarıdaki route/data/component dosyalarıdır. Build `public/sitemap.xml` dosyasını 27 route'a güncelledi ve `dist/index.html` build artifact hash'i değişti. `.claude/settings.local.json` hâlâ untracked ve dokunulmadı. `Documents/_Java notlar.md` ignore kuralı `git -c core.excludesfile= check-ignore -v -- "Documents/_Java notlar.md"` ile tekrar doğrulandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 5. kısım — QA Mentor AI Düzeltmeleri ve Entegrasyonu)

| Görev | Durum |
|-------|-------|
| **Java + Playwright Zihin Haritası Düzeltmesi (MAP_C2):** TypeScript düğümü ana yoldan kaldırıldı, Playwright doğrudan Java sonrası aşama olarak konumlandırıldı ve sonraki düğüm ID'leri (REST Assured, SQL, Jenkins, Docker, AWS, Kubernetes) sırayla yeniden numaralandırıldı. | ✅ |
| **Zihin Haritalarına Bonus Eklemeleri:** Tüm zihin haritalarının (`MAP_A`, `MAP_B`, `MAP_B_SEL`, `MAP_C1`, `MAP_C2`) "Ekstra Gelişim Dalları (Opsiyonel)" bölümüne bonus olarak `Appium`, `BrowserStack` ve `JMeter` eklendi. | ✅ |
| **Java + Playwright Mentor Notu:** `MAP_C2` mentor notundaki TypeScript referansı kaldırıldı, Java otomasyoncuları için Appium mobil otomasyon ve JMeter performans testi önerileri eklendi. | ✅ |
| **Dinamik Dil Çevirisi (QA Mentor):** Chat state yapısı ham string yerine translation key bazlı olacak şekilde refaktör edildi. Dil değiştiğinde geçmişteki tüm chat balonlarının anında yeni dile çevrilmesi sağlandı ve karşılama mesajlarının yinelenmesi engellendi. | ✅ |
| **Giriş Yol Haritasının Temizlenmesi:** Anasayfadaki eski "Choose a learning path..." (Yol Haritası Giriş) kartı ve aşama listeleri (`learningPaths`, `roadmapGroups`, `renderPathCard` ve `renderLearningIntro`) kod tabanından tamamen temizlendi. | ✅ |
| **Doğrulama ve Build:** `npm run build` komutu başarıyla çalıştırıldı. 26 route için SEO kontrolleri, sitemap/robots dosya üretimleri, Vite prod build'i, 26 statik HTML shell üretimi ve dist SEO kontrolleri başarıyla tamamlandı. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 4. kısım — GitHub Pages gerçek deploy'a geçiş)

| Görev | Durum |
|-------|-------|
| **Kök neden:** Netlify dashboard'da kredi bittiği için production deploy ve Agent Runner devre dışı görünüyordu; GitHub push doğru olsa bile `learnqa.dev` eski Netlify build'inde kalıyordu. | ✅ |
| **Workflow değişikliği:** `.github/workflows/deploy.yml` redirect HTML üretmek yerine gerçek siteyi build/deploy eder hale getirildi: checkout, Node 20, `npm ci`, `npm run build`, `dist/404.html` fallback, `actions/upload-pages-artifact`, `actions/deploy-pages`. `workflow_dispatch` ve Pages concurrency eklendi. | ✅ |
| **Custom domain:** `public/CNAME` eklendi (`learnqa.dev`). GitHub Pages artifact'i içinde `dist/CNAME` oluştuğu build ile doğrulandı. | ✅ |
| **Legacy HTML temizliği:** `public/comparison.html` eski standalone büyük sayfa olmaktan çıkarılıp `/test-frameworks` canonical/client redirect dosyasına dönüştürüldü. `dist/comparison.html` build çıktısı da aynı redirect'i yansıtıyor. `public/test-frameworks.html` eklenmedi; SEO guard React route'u gölgelediği için doğru model bu değil. | ✅ |
| **Dokümantasyon:** `DEPLOY.md` GitHub Pages + DNS A kayıtları + Pages ayarları ile yeniden yazıldı. `CLAUDE.md` ve `codexSeo.md` kalıcı mimari olarak GitHub Pages static route shell modeline güncellendi; commit hash/anlık durum yazılmadı. | ✅ |
| **Doğrulama:** `npm run build` başarılı (25 route SEO/static shell chain). `dist/CNAME`, `dist/java/index.html` ve `dist/comparison.html` redirect içeriği doğrulandı. | ✅ |

> Canlıya geçiş için push sonrası GitHub repo Settings → Pages → Source: GitHub Actions ve Custom domain `learnqa.dev` kontrol edilmeli.
>
> **Güncel sorun:** `learnqa.dev` şu anda Netlify/NS1 `dns1.p01.nsone.net` gibi Netlify DNS nameserver'ları üzerinden çözülüyor. Bu yüzden site, GitHub Pages'e deploy olsa bile hala Netlify edge üzerinden yayınlanıyor.
>
> Çözüm yolları:
> 1. Netlify DNS paneli üzerinden `learnqa.dev` için GitHub Pages A kayıtlarını ekleyin.
> 2. Ya da domain nameserver'larını Porkbun'a geri verin ve Porkbun DNS üzerinde GitHub Pages A kayıtlarını tanımlayın.
>
> Doğrulama için: `Resolve-DnsName learnqa.dev -Type NS` ve `nslookup -type=A learnqa.dev 8.8.8.8` komutlarını kullanarak nameserver ve A kayıtlarını kontrol edin.

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 3. kısım — Codex'in Java Kurulum çalışmasının review'ı + küçük UX fix)

| Görev | Durum |
|-------|-------|
| **Review:** Codex'in önceki kısımda yaptığı Java Kurulum sekmesi işi (`javac` atölyesi, IDE/IntelliJ anlatımı, Maven lifecycle, `java-practice` try-it-yourself alanları, `.gitignore`/`CLAUDE.md` kuralı) Playwright ile tarayıcıda fiilen test edilerek doğrulandı: 3 simülasyon çalıştırıldı (animasyon + console output doğru), 2 `java-practice` alanı hem hatalı hem doğru kodla test edildi, EN/TR ve dark mode geçişlerinde layout/console hatası yok, `npm run build` 25 route için temiz geçti. | ✅ |
| **Bulunan küçük UX kusuru düzeltildi:** `JavaPracticeBlock` (`TopicPage.jsx`) içinde satır sonu `;` eksikse hem "Satır X: ; ile bitmeli" hatası hem de ayrı "şimdilik sadece println(...); formatını çalıştırıyorum" uyarısı aynı anda çıkıyordu (tekrarlı mesaj). `else if` koşuluna `line.endsWith(';')` eklenerek format uyarısı sadece satır zaten `;` ile bitip başka bir nedenle eşleşmediğinde gösteriliyor artık. | ✅ |
| **Doğrulama:** `npm run build` tekrar başarılı; Playwright ile starter kod (`Merhaba Java")` — kasıtlı eksik `;`) üzerinde "Kontrol Et"e basıldı, sadece eksik-semicolon hatası göründü, format uyarısı tekrar etmedi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-18, 2. kısım — Java Kurulum sekmesi: javac, IntelliJ, Maven atölyesi)

| Görev | Durum |
|-------|-------|
| **Kullanıcı yönü netleştirdi:** Java anlatımı daha adım adım olmalı; önce JDK sonrası `javac` ile `.java` dosyası nasıl derlenir/çalıştırılır, sonra IDE/IntelliJ, en sonda Maven anlatılmalı. Öğrenci kendi `main` metodunu yazabilmeli, `;` alışkanlığı kazanmalı. | ✅ |
| **Kurulum sekmesi yeniden kurgulandı:** `src/data/javaData.js` içinde `s1` başlığı `Java Kurulumu ve İlk Proje` oldu. Eski “JDK + Maven’i hemen kur” akışı düzeltildi: JDK → `javac` → IntelliJ → Maven öğrenme sırası yazıldı. Maven kurulum komutları ilk JDK kurulumundan çıkarıldı, Maven bölümü en sona taşındı. | ✅ |
| **Yeni içerik paketi:** `javaSetupWorkshop` eklendi ve TR/EN Kurulum sekmesine bağlandı. Kapsam: `javac Main.java` vs `java Main`, Windows/macOS/Linux adım adım `Main.java` oluşturma, ilk gün yapılan hatalar, IDE türleri, Cursor gibi AI IDE ile neden erken başlanmaması gerektiği, IntelliJ IDEA indirme/kurulum/ilk proje/class/main/run adımları, Maven’in ne zaman gerekli olduğu ve `mvn package` lifecycle akışı. | ✅ |
| **Yeni interaktif block tipi:** `java-practice` eklendi (`TopicPage.jsx`). Kullanıcı `textarea` içinde `public class Main`, `public static void main(String[] args)`, süslü parantez dengesi ve satır sonu `;` kontrolü alıyor. Basit `System.out.println("...");` çıktısını console preview olarak gösteriyor. Kurulum sekmesinde iki pratik alan var: eksik `main`/`;` düzeltme ve IntelliJ autocomplete öncesi kas hafızası. | ✅ |
| **Yeni simülasyonlar:** `java-javac-workshop` (klasör → Main.java → `javac` → Main.class → `java Main`), `java-intellij-project` (IntelliJ download/new project/JDK/src/class/main/run), `java-maven-lifecycle` (`pom.xml` → compile → test → package → BUILD SUCCESS) eklendi. Her biri sağ panel DOM/state görselleştiricisine bağlandı. | ✅ |
| **Resmi kaynak kontrolü:** IntelliJ anlatımı güncel JetBrains dokümanlarına göre yazıldı: IntelliJ IDEA artık unified product modeliyle geliyor; core kullanım ücretsiz devam edebiliyor, Ultimate özellikleri abonelik/trial ile açılıyor; Java development için IDE içindeki runtime ayrı, standalone JDK gerekiyor; Toolbox App önerilen kurulum yoludur. | ✅ |
| **Doğrulama:** `npm run build` iki kez başarılı (25 route SEO/static chain). Bilinen uyarılar: eski Browserslist/caniuse-lite ve büyüyen `javaData` chunk. `dist/index.html` build hash değişikliği kaynak dışı olduğu için manuel geri alındı, diff’te bırakılmadı. | ✅ |
| **Browser doğrulaması:** In-app Browser ile `http://127.0.0.1:5173/java` Kurulum sekmesi doğrulandı. EN/TR başlıklar, `javac workshop`, `IDE flow`, `mvn package`, iki `java-practice` alanı render oldu. Üç animasyon çalıştırıldı: `Hello Java!`, `Main.class`, `Hello IntelliJ!`, `BUILD SUCCESS` görüldü. `java-practice` eksik `main` ve `;` hatasını yakaladı; doğru kodla `Looks ready to run` + console çıktısı verdi. Mobil 390px viewport Kurulum sekmesinde yatay taşma 0, iki textarea render oldu. Console error/warn yok. | ✅ |

> Bu oturumda commit/push yapılmadı. Bekleyen değişiklikler: `.gitignore`, `CLAUDE.md`, `.claude/NEXT_SESSION.md`, `src/components/TopicPage.jsx`, `src/data/javaData.js`. `Documents/_Java notlar.md` için `git -c core.excludesfile= check-ignore -v "Documents/_Java notlar.md"` doğrulandı.

## ✅ Bu Oturumda Tamamlananlar (2026-06-18 — Java sayfasına görsel/animasyonlu anlatım + yerel not ignore kuralı)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `CLAUDE.md` ve `.claude/NEXT_SESSION.md` okundu. Güncel durum özeti: gerçek son local commit `20323a5`, canlı site Netlify'da, önceki aktif teknik açık Python/SQL/Java sayfalarında `simulation` eksikliğiydi. | ✅ |
| **Yerel Java notu incelendi:** `Documents/_Java notlar.md` yaklaşık 313KB; ilk 7 ders Java giriş/OOP, variables, data types, Scanner, wrapper/string pratikleri ve if/else akışını kalın metin + gömülü görsel referanslarıyla anlatıyor. Yöntem: önce gündelik benzetme/görsel şema, sonra syntax parçalama, sonra örnek. Bu yöntem `/java` sayfasına uygulandı; not dosyası repoya alınmadı. | ✅ |
| **Git ignore kuralı:** `.gitignore` içine `Documents/_Java notlar.md` eklendi. `CLAUDE.md` Bölüm 8'e kalıcı kural yazıldı: bu dosya asla git tarafından takip edilmeyecek; her commit/stage öncesi `.gitignore` ve `git status --short` ile kontrol edilecek. `git check-ignore -v -- "Documents/_Java notlar.md"` doğrulandı. | ✅ |
| **Java sayfası — yeni simülasyonlar:** `TopicPage.jsx` içine üç Java scenario eklendi: `java-compile-run` (.java → javac → .class → JVM → output), `java-stack-heap` (primitive stack value + String heap object), `java-branch-runner` (score=75 için if/else decision ladder). Sağ panelde her scenario için DOM/state görselleştirici eklendi. | ✅ |
| **Java içeriği — görsel anlatım:** `src/data/javaData.js` içine TR/EN bloklar eklendi. Giriş sekmesine compile/run simülasyonu; Temel Sözdizimi sekmesine recipe-card visual + stack/heap simülasyonu; Akış Kontrolü sekmesine decision runner; Arrays sekmesine index görseli; Methods sekmesine method call flow; OOP & Collections sekmesine class → fields/methods → object diyagramı eklendi. | ✅ |
| **Doğrulama:** `npm run build` başarılı (SEO check → generate SEO files → Vite build → static route shells → dist SEO check, 25 route). Bilinen uyarılar aynı: eski Browserslist/caniuse-lite verisi ve büyük `javaData` chunk uyarısı. | ✅ |
| **Browser doğrulaması:** In-app Browser ile `http://localhost:5173/java` reload edildi. Giriş sekmesinde `▶ javac + java` çalıştırıldı, `Merhaba QA!` ve JVM state'i görüldü. Temel Sözdizimi sekmesinde `▶ allocate` çalıştırıldı, `score = 80` ve `#A1: "admin"` görüldü. Akış Kontrolü sekmesinde `▶ karar ver` çalıştırıldı, `score >= 70 true` ve `System.out.println("BB");` görüldü. EN modda `Run the if/else Ladder Live` ve `Evaluation Order` doğrulandı. Console error/warn yok. | ✅ |

> Bu oturumda commit/push yapılmadı. Bekleyen değişiklikler: `.gitignore`, `CLAUDE.md`, `.claude/NEXT_SESSION.md`, `src/components/TopicPage.jsx`, `src/data/javaData.js`. `dist/index.html` build hash değişikliği kaynak dışı olduğu için geri alındı.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 11. kısım — /algorithms sayfasına 50 soruluk pratik soru bankası)

| Görev | Durum |
|-------|-------|
| **Oturum başlangıcı:** `.claude/NEXT_SESSION.md` okundu, güncel durum kullanıcıya özetlendi. Kullanıcı `https://learnqa.dev/algorithms` (beginner algoritma sayfası) için kolaydan zora 50 algoritma sorusu istedi. | ✅ |
| **Veri (1. versiyon — kavram tekrarı):** `src/data/beginnerAlgorithmsData.js`'e hem `tr` hem `en` için 50'şer soruluk `questions` dizisi eklendi (7 derste işlenen kavramları tekrarlayan "X nedir?" tarzı sorular). | ✅ |
| **Kullanıcı geri bildirimi:** "algoritma sorusu derken bu kadar basit olanları kastetmedim, gerçekten kişiyi kodlamaya/dil öğrenmeye hazırlayacak algoritma soruları üret" dedi. | ✅ |
| **Veri (2. versiyon — gerçek algoritma problemleri, mevcut hal):** 50 soru tamamen yeniden yazıldı (TR+EN ayrı). Artık kavram açıklaması değil, gerçek "algoritmayı tasarla" problemleri: 15 Kolay (en büyük/küçük bulma, basamak sayısı, ortalama, liste ters çevirme), 20 Orta (FizzBuzz, palindrom kontrolü, asallık testi, EBOB/Öklid, bubble sort'u elle adım adım yürütme, binary search'ü elle adım adım yürütme, two-sum, anagram, dengeli parantez/stack, two-pointer reverse) ve 15 Zor (loop+recursion karşılaştırması, Fibonacci, labirent backtracking, merge sort, permütasyon üretimi, BFS ile en kısa yol, eksik sayı bulma, quicksort, operatör önceliği, medyan, 2'nin kuvveti testi, grid yol sayma — Pascal üçgeni mantığı, "neredeyse sıralı" kontrolü). Her cevap somut adım adım algoritma mantığı içeriyor (gerçek kod değil, ama doğrudan koda çevrilebilir seviyede). `page.questionsIntro` etiketi eklendi (sorular bölümünün üstünde amber renkli uyarı kutusu olarak gösteriliyor). | ✅ |
| **UI güncellemesi:** `AlgorithmsPage.jsx`'teki `QuestionBank` component'ine `data.questionsIntro` render bloğu eklendi (varsa amber border-left kutu olarak başlığın altında gösteriliyor). | ✅ |
| **UI:** `src/components/AlgorithmsPage.jsx`'e yeni `QuestionBank` + `QuestionItem` component'leri eklendi — Kolay/Orta/Zor renk kodlu (emerald/amber/rose) gruplar halinde, her soru "Cevabı göster/gizle" akordeon butonuyla açılıp kapanıyor. Sol sidebar nav'a "❓ 50 Soru" butonu eklendi, `#practice-questions` anchor'ına smooth-scroll yapıyor (mevcut `navTo()` fonksiyonu kullanıldı). Bölüm, ders kartlarının (`lessons`) hemen altına, sözlük (`glossary`) bölümünden önce eklendi. | ✅ |
| **Doğrulama:** `npm run build` (SEO zinciri dahil, 25 route) başarılı. Playwright ile `/algorithms` doğrulandı: TR modda "❓ 50 Soru" butonuna tıklanınca bölüm görünüyor, başlık doğru render oluyor, 50 "Cevabı göster" butonu sayıldı, ilk soru açılınca cevap görünüyor — console hatası yok. EN modda da aynı akış (`localStorage.language = 'en'`) doğrulandı: "❓ 50 Algorithm Questions — Easy to Hard" başlığı + 50 "Show answer" butonu + cevap açılımı doğru, console hatası yok. | ✅ |
| **HomePage.jsx — başka bir oturumdan kalan uncommitted değişiklik + bug fix:** Çalışma ağacında bu oturuma ait olmayan ~206 satırlık bir değişiklik bulundu (learning-path kartları artık "roadmap groups" halinde — Başlangıç/Temel pratik/Automation/Gerçek iş/Practice Lab başlıkları altında gruplanıyor, `renderPathCard` + `roadmapGroups` yeni yapı). Kullanıcı bunu da aynı commit'e dahil etmek istedi. İnceleme sırasında **gerçek bir bug** bulundu: aktif kod yolundaki (`renderPathCard`, `renderLearningIntro` tarafından kullanılıyor) ok karakteri mojibake'ydi (`â†’` yerine `→` olmalıydı) — düzeltildi. Ayrıca dosyada hiç çağrılmayan iki ölü fonksiyon vardı (`renderLearningIntroOld`, `renderLearningIntroWithBadgeBug`) — kullanıcı onayıyla silindi. `npm run build` (25 route) tekrar başarılı, Playwright ile ana sayfa doğrulandı: 7 öğrenme kartı, mojibake yok, console hatası yok, screenshot'ta roadmap grupları doğru render oluyor. | ✅ |

> **Yeni içerik:** `src/data/beginnerAlgorithmsData.js` içine `questions` dizisi (tr+en, 50+50 soru). **Yeni component'ler:** `QuestionBank`, `QuestionItem`, `LEVEL_COLOR` (`AlgorithmsPage.jsx` içinde).
> **HomePage.jsx** ayrı bir oturumdan miras kalan roadmap-groups değişikliğini + bu oturumda yapılan bug fix'i (mojibake ok + ölü kod temizliği) içeriyor.
> **Commit edildi ve push edildi: `797aa6d`** (`3a52170..797aa6d`). Netlify otomatik deploy tetiklendi, bir sonraki oturumda `https://learnqa.dev/algorithms` ve ana sayfa canlıda doğrulanmalı.

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
3. **Python / SQL sayfalarında hâlâ `simulation` (Gör-Anla-Dene) block'u yok** — Java tarafı 2026-06-18 oturumlarında 6 `simulation` + 1 `java-practice` block tipiyle güçlendirildi (`java-compile-run`, `java-stack-heap`, `java-branch-runner`, `java-javac-workshop`, `java-intellij-project`, `java-maven-lifecycle`). Python'da `PythonFrameworksTab.jsx` içinde elle yazılmış pytest runner var ama `pythonData.js`'in kendi `simulation` sistemini kullanmıyor; SQL'de de `simulation` yok. **← Bir sonraki oturumun önceliği Python/SQL.**
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
java-practice (YENİ — 2026-06-18, 2. kısım: Java main method + semicolon kontrol alanı)
git-practice (YENİ — 2026-06-18, 6. kısım: Git komut sırası + tehlikeli komut uyarısı)
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
| `java-compile-run` | .java kaynak kod → javac → .class bytecode → JVM → console output | javaData.js s0 (Giriş) |
| `java-stack-heap` | int primitive value stack'te, String reference stack'te, object heap'te gösterilir | javaData.js sA (Temel Sözdizimi) |
| `java-branch-runner` | score=75 için if/else ladder koşulları sırayla değerlendirilir, ilk true branch output üretir | javaData.js sC (Akış Kontrolü) |
| `java-javac-workshop` | JDK sonrası terminal akışı: klasör aç → Main.java yaz → `javac Main.java` → Main.class → `java Main` | javaData.js s1 (Kurulum) |
| `java-intellij-project` | IntelliJ IDEA indirme/ilk proje/JDK seçimi/src/Main.java/main method/Run akışı | javaData.js s1 (Kurulum) |
| `java-maven-lifecycle` | Maven `pom.xml` → compile → test → package → BUILD SUCCESS lifecycle animasyonu | javaData.js s1 (Kurulum) |
| `appium-element-detection` | Appium Inspector tarama → element ağacı → locator önerisi | appiumData.js s3 (Locator & POM) |
| `appium-swipe` | W3C Actions pointerDown→move→pointerUp → liste kayar | appiumData.js s4 (Gerçek Senaryo) |
| `browserstack-cloud-run` | Local pytest terminal → Hub bağlantısı → Automate Dashboard session kartı | browserstackData.js s2 (Selenium Entegrasyonu) |
| `aws-codepipeline` | git push → Source/Install/Test/Upload aşamaları → CloudWatch log → S3 bucket | awsData.js (Gerçek Hayat) |
| `azure-devops-pipeline` | git push → Trigger/Install/Test/Publish aşamaları → task listesi → Pipeline Artifacts | azureData.js (Gerçek Hayat) |
| `vitest-runner` | npx vitest run → 3 test sırayla PASSED → coverage raporu paneli | typescriptData.js s9 (Test Runners) |
| `jmeter-load-test` | jmeter -n -t → launching→rampup→firing→aggregating→done terminal + Aggregate Report tablosu | jmeterData.js (Gerçek Hayat) |
| `cypress-time-travel` | ▶ Run → command log adım adım yeşil tikleniyor → geçmiş komuta tıkla → sağ panel o anki DOM snapshot'ına geri sarıyor | cypressData.js s4 (Zaman Yolculuğu) |
| `git-snapshot-story` | Git'i komutsuz zihinsel modelle anlatır: proje klasörü → değişiklik → snapshot rafı → karşılaştırma → güvenli dönüş | gitGithubData.js (Giriş) |
| `github-collaboration-story` | GitHub'ı takım akışı olarak gösterir: local branch → Pull Request → Actions checks → main | gitGithubData.js (Giriş) |
| `git-concept-order-map` | Komut ezberinden önce Git/GitHub işlem sırasını gösterir: `git init` → `status` → `add` → `commit` → `origin` → `push main` → feature branch → `fetch/merge/pull` → local conflict çözümü | gitGithubData.js (Giriş) |
| `git-terminal-shell-map` | Terminal penceresi, shell motoru ve Git programı farkını; `git status` komutunun terminal → shell → Git → `.git` → output yolculuğunu gösterir | gitGithubData.js (Kurulum) |
| `git-terminal-install-use` | Git Bash/terminal için indir → kur → aç → `git --version` doğrula → IDE terminalde doğru klasörde kullan akışını gösterir | gitGithubData.js (Kurulum) |
| `git-bash-open-folder` | Windows Explorer adres çubuğuna `cmd` yazmayı, klasörde `Git Bash Here` açmayı ve IDE terminalinde aynı proje klasöründe çalışmayı gösterir | gitGithubData.js (Kurulum) |
| `git-bash-command-runner` | `pwd`, `ls`/`dir`, `cd`, `mkdir`, `touch`, `echo`, `cat`/`type`, `ipconfig`, `git --version` komutlarının ekrandaki sonucunu terminal geçmişiyle gösterir | gitGithubData.js (Kurulum) |
| `git-install-os-setup` | Windows/macOS/Linux kurulum yolları → `git --version` doğrulaması → commit kimliği ayarı | gitGithubData.js (Kurulum) |
| `gitignore-create-and-match` | `.gitignore` yazılınca hangi dosyaların normal `git status` çıktısından çıktığını, hangilerinin `git status --ignored --short` ile görüldüğünü gösterir | gitGithubData.js (.gitignore) |
| `gitignore-already-tracked-fix` | Daha önce commit edilmiş `.env` dosyasını `git rm --cached .env` ile Git index'inden çıkarmayı, `git check-ignore -v` ile kanıtlamayı ve secret rotate uyarısını gösterir | gitGithubData.js (.gitignore) |
| `git-three-areas` | working tree → staging area → local repository → GitHub remote snapshot akışı | gitGithubData.js (Giriş) |
| `git-remote-origin-setup` | Local repo ile GitHub repo arasında `origin` bağlantısı kurmayı, `git remote -v` ile URL kontrolünü, ilk `push -u` upstream bağını ve credential manager uyarısını gösterir | gitGithubData.js (Git Temelleri) |
| `git-branch-lab` | `git branch` → `git branch hasan` → `git switch hasan` → `git branch -m feature/hasan` → commit/push akışını görselleştirir | gitGithubData.js (Branching) |
| `git-remote-branch-publish` | Local branch'in GitHub tarafında ilk kez remote branch olarak açılmasını, `push -u` upstream bağını ve sonraki kısa `git push` kullanımını gösterir | gitGithubData.js (Branching) |
| `git-stash-flow` | Commit edilmeye hazır olmayan yarım işi `git stash` ile geçici rafa koymayı, branch değiştirip geri dönünce `git stash pop` ile çalışma alanına almayı gösterir | gitGithubData.js (Branching) |
| `git-merge-lab` | `origin/main` güncellemelerinin feature branch içine merge edilmesini ve testle kanıtlanmasını gösterir | gitGithubData.js (Branching) |
| `git-conflict-lab` | conflict marker → final dosya → test → `git add` → continue akışıyla conflict çözmeyi gösterir | gitGithubData.js (Branching) |
| `github-pr-flow` | feature branch → commit → push → Pull Request → review → checks → merge akışı | gitGithubData.js (GitHub Akışı) |
| `github-pull-request-ui-tour` | GitHub Pull Request arayüzünü gösterir: Pull requests tabı → New pull request → base/compare → Create pull request → Conversation/Files changed/Checks → Merge pull request | gitGithubData.js (Pull Request) |
| `github-pr-review-conflict-ui` | Code review ve conflict akışını gösterir: Files changed → line comment → Request changes → conflict → local çözüm/test/push → Approved/Required checks/No conflicts → Merge pull request | gitGithubData.js (Pull Request) |
| `github-actions-ui-tour` | GitHub Actions arayüzünü gösterir: Actions tabı → workflow listesi → run satırı → failed logs → artifact → rerun | gitGithubData.js (Actions) |
| `github-pages-settings-ui` | GitHub Settings → Pages arayüzünü gösterir: source, custom domain, DNS check, Enforce HTTPS ve Visit site | gitGithubData.js (Pages) |
| `github-repo-settings-tour` | Repository Settings turu: collaborator, visibility, branch protection, secret ve Pages source kontrolleri | gitGithubData.js (Pages) |
| `github-actions-pages` | push → workflow trigger → checkout → npm ci → test → build → Pages artifact → deploy → live domain | gitGithubData.js (Actions) |

### Build Durumu
- ✅ `npm run build` başarılı (SEO check + static route shell üretimi dahil, güncel toplam 29 route; bkz. `codexSeo.md`)
- ✅ Production hedefi: GitHub Pages custom domain `https://learnqa.dev`
- ⚠️ `javaData` chunk hâlâ ~665KB tek başına büyük (route-based code splitting sayesinde ana bundle ~239KB civarında, kritik değil)
- Güncel commit/push durumu için bu dosyanın en üstündeki **"GÜNCEL DURUM"** bölümüne bak (tek kaynak — burada tekrar edilmiyor).

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
