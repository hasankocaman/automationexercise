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

## ⚠️ GÜNCEL DURUM — GIT, SEO, STRAY DOSYALAR (2026-06-18 itibarıyla doğrulandı)

**Bu bölüm önemli — her oturum başında oku, üstüne yaz/güncelle.**

### Git durumu
- **Son local commit:** `0e3c0a7 feat: rebuild Java setup tab around javac->IntelliJ->Maven flow, add interactive try-it-yourself blocks`. Kullanıcı onayıyla commit edilip **push edildi** — local ve origin/main senkron.
- Bu commit, Codex'in Java Kurulum sekmesi işini (javac/IntelliJ/Maven atölyeleri, `java-practice` alanları, `.gitignore`/`CLAUDE.md` kuralı) ve Claude Code'un bu işi review edip `JavaPracticeBlock` içindeki tekrarlı uyarı kusurunu düzeltmesini TEK commit'te birleştirdi.
- `Documents/_Java notlar.md` yerel çalışma notudur; `.gitignore` içinde `Documents/_Java notlar.md` olarak ignore ediliyor ve `git check-ignore -v -- "Documents/_Java notlar.md"` ile doğrulandı. Her commit/stage öncesi bu kural tekrar kontrol edilmeli.
- **Dokunulmayan yerel dosya:** `.claude/settings.local.json` untracked görünüyor; bu oturumda dokunulmadı.
- **Bilinen GitHub Actions uyarısı (`.github/workflows/deploy.yml` — "Redirect to learnqa.dev"):** Bu workflow sadece `learnqa.dev`'e yönlendiren kozmetik bir GitHub Pages sayfası deploy ediyor, gerçek site Netlify'da ve bundan etkilenmiyor. İki commit art arda push edilirse ("Deployment request failed ... due to in progress deployment") veya aynı run birden fazla kez "Re-run jobs" ile tekrar çalıştırılırsa ("Multiple artifacts named github-pages... Artifact count is 3") hata alınabilir — ikisi de zararsız, fonksiyonel etkisi yok. Çözüm: aynı run'ı tekrar tekrar re-run etmek yerine yeni bir push ile temiz bir run tetiklemek (workflow sadece `on: push` ile tetikleniyor, `workflow_dispatch` yok).

### SEO/routing altyapısı — gerçek ve commit'li
`BrowserRouter` (`src/main.jsx`), `src/components/SeoMeta.jsx`, `scripts/check-seo.mjs`, `scripts/check-dist-seo.mjs`, `scripts/generate-seo-files.mjs` committed ve push'lu. `/algorithms`, `/advanced-algorithms`, `/manual-testing` ve `/cypress` route'ları `7f526fd` ile; algoritma soru bankası ve HomePage roadmap fix'i `797aa6d` ile commit'li/push'lu. `npm run build` **25 route** için SEO/static shell kontrolünü başarıyla geçiriyor. Mimari detayları `codexSeo.md`'de (kalıcı referans olarak).

**SEO canlı doğrulama durumu — bir sonraki oturumda tekrar kontrol edilmeli (push yeni yapıldı):**
- `https://learnqa.dev/robots.txt` ve `/sitemap.xml` 200 dönüyor mu?
- `https://learnqa.dev/cypress`, `/algorithms`, `/advanced-algorithms`, `/manual-testing` canlıda doğru render oluyor mu? (ilk kez bu push ile canlıya çıkıyor)
- `https://learnqa.dev/test-frameworks.html` → `/test-frameworks` 301 ile yönleniyor mu? (`e6d1dd9`'da eklendi)
- `https://learnqa.dev/comparison.html` → `/test-frameworks` 301 ile yönleniyor mu?
- **Henüz yapılmamış (hesap yetkisi gerektirir):** Google Search Console domain property + DNS verification + sitemap submission + URL Inspection. Checklist: `codexSeo.md` → "Google Search Console — Tekrar Kullanılabilir Checklist".

### Stray/uncommitted dosyalar
Önceki oturumlardan kalan, hiçbir yerden import/referans edilmeyen üç grup dosya 7. kısım sonunda kullanıcı onayıyla silinmişti: paralel TSX rewrite, tek-seferlik içerik script'leri ve kök `documents/` duplikasyonu. `/algorithms`, `/advanced-algorithms`, `/manual-testing` ve `/cypress` artık commit'li — stray değiller. Tek kalan untracked dosya `.claude/settings.local.json` (yerel ayar dosyası, dokunulmadı). `Documents/_Java notlar.md` bilinçli olarak ignore edilen yerel not dosyasıdır ve stray/untracked iş listesine alınmamalı.

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

### Build Durumu
- ✅ `npm run build` başarılı (SEO check + static route shell üretimi dahil, güncel toplam 25 route; bkz. `codexSeo.md`)
- ✅ Netlify'da canlı: https://learnqa.dev
- ⚠️ `javaData` chunk hâlâ ~665KB tek başına büyük (route-based code splitting sayesinde ana bundle ~239KB civarında, kritik değil)
- Güncel commit/push durumu için bu dosyanın en üstündeki **"GÜNCEL DURUM"** bölümüne bak (tek kaynak — burada tekrar edilmiyor).

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
