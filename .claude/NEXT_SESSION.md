# NEXT SESSION — Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan tekrar açıklama isteme. Bu dosya hem **içerik/feature**
> hem **SEO/routing/deploy** durumunu tek yerde takip eder — `codexSeo.md`
> artık sadece SEO'nun kalıcı kural/mimari referansıdır, durum günlüğü
> değildir. Git commit hash gibi anlık bilgiler SADECE burada yazılır,
> `CLAUDE.md`/`AGENTS.md`/`codexSeo.md`'ye yazılmaz (bkz. `CLAUDE.md` Bölüm 0).
>
> **Bu dosya kasıtlı olarak kısa tutulur.** Sadece hâlâ AÇIK olan işler ve en
> son oturumun özeti burada kalır. Kapanmış/tamamlanmış işlerin detaylı geçmişi
> için `git log` ve commit mesajlarına bak — onlar otoritedir, burada
> tekrarlanmaz. Bir madde tamamlandığında bu dosyadan silinir, biriktirilmez.

---

## 🔧 AÇIK MADDELER (öncelik sırasıyla)

1. **Supabase RLS SQL'leri henüz çalıştırılmadı (kullanıcı işi):** Hem
   `learnqa-test` hem `learnqa-prod` projelerinde, Supabase Dashboard → SQL
   Editor'den ayrı ayrı:
   ```sql
   create policy "users delete own progress"
   on public.user_progress
   for delete
   using (auth.uid() = user_id);
   ```
   çalıştırılmadan AC07 "Sayfayı Sıfırla" akışının Supabase tarafı sessizce
   başarısız olur (kod zaten hazır, `AuthContext.resetLessonProgress()`).
   Ayrıca `user_badges` tablosunda INSERT/upsert için
   `auth.uid() = user_id` şartlı bir RLS policy'si olup olmadığı kontrol
   edilmeli — bir test sırasında `42501 row-level security policy` hatası
   yakalandı (`AuthContext.jsx` ~205-214 hatayı yutuyor, kullanıcı eşiği
   geçtiğinde rozeti sessizce alamayabilir).
2. **Yeni Python interaktif özellikleri henüz resmi test suite'inden geçmedi:**
   Bu oturumda eklenen her şey (madde 6'daki liste) sadece elle yazılan
   Playwright betikleriyle canlı doğrulandı — `npm run test:e2e` ve
   `npm run test:quiz-audit` resmi suite'leri bu özelliklere karşı HENÜZ
   çalıştırılmadı. Commit sonrası post-commit hook (`scripts/post-commit-tests.sh`)
   otomatik tetiklenecek; çıkan sonuç burada güncellenmeli. Özellikle quiz
   gating sayımının (`countQuizBlocksInTab`) yeni `challenge`/`code-playground`
   block tiplerini quiz olarak SAYMADIĞI (yanlışlıkla mülakat kilidini
   etkilemediği) doğrulanmalı.
3. **`/basit-backend` EN içerik eksik (ÖNEMSİZ, dokunma):** tab 0 ve tab 3'te
   TR'de quiz bloğu varken EN'de hiç yok. Kalıcı olarak test kapsamı dışı
   (`CLAUDE.md` §22.1). Kullanıcı talimatı: bu sayfayı sadece kendisi
   görüyor, EN eksikliği önemli değil — zaman harcanmasın.
4. **AC08 — "özelleştirilebilir renk paleti / alternatif temalar" eksik
   (kullanıcı kararıyla şimdilik ATLANIYOR):** Platformda sadece dark/light
   mode var, AC dokümanı çoklu tema paleti istiyor. Kullanıcı 2026-06-27'de
   "şimdilik atla" dedi — dark/light yeterli kabul ediliyor, kod yazılmadı,
   AC dokümanı da değiştirilmedi.
5. **`npm run test:quiz-audit` CI'a bağlı değil** — şu an sadece elle
   çalıştırılıyor, istenirse periyodik bir GitHub Actions adımına bağlanabilir.
6. **Yeni özellikler sadece `/python` sayfasında — diğer sayfalara henüz
   yayılmadı:** Manual Testing Lab, Code Playground, paylaşılan XP sistemi,
   görsel/animasyonlu bloklar (good-vs-bad / step-animation / interactive-diagram)
   ve Challenge sistemi şimdilik kasıtlı olarak Python'a özel. Kullanıcı
   isterse aynı block tipleri başka tech sayfalarına (Selenium, Playwright,
   Java vb.) da eklenebilir — mimari hazır, sadece veri/içerik eklemek yeterli.
7. **Bundle boyutu** — `TopicPage` chunk ~1.3MB+, `typescriptData`/`javaData`/
   `sqlData` her biri 500KB+ (bilinen uyarı, `CLAUDE.md` §14 — build'i bozmuyor,
   zorunlu değil ama code-splitting adayı).

---

## ✅ Son Oturum (2026-06-28) — Python Sayfasına 4 Büyük İnteraktif Özellik

Bu oturumda `/python` sayfasına sırasıyla şu özellikler eklendi (her biri ayrı
ayrı canlı Playwright doğrulamasıyla test edildi, build her adımda yeşil):

1. **Manual Testing Lab** (`ManualTestingLabBlock.jsx`, `BuggyLoginForm.jsx`,
   `data/manualTestingLabBugs.js`) — kasıtlı 5 bug içeren bir login formu;
   kullanıcı bug report yazıp kural-bazlı (LLM çağrısı yok) bir
   `BugEvaluator` tarafından puanlanıyor. Yeni tab: "🐞 Manuel Test Lab".
2. **Code Playground** (`CodePlaygroundBlock.jsx`, `data/pythonPlaygroundData.js`)
   — Run / Show Expected Output / Fix the Failing Test / Hint sistemi.
   21 "kod müfredatı" tab'ının HER BİRİNE en az 2 alıştırma eklendi (toplam
   42 alıştırma — 5'i daha önceden vardı, 37'si bu oturumda eklendi).
   Her buggy/fixed Python çifti gerçek `python3` ile mekanik olarak
   doğrulandı (fixed → expectedOutput tam eşleşiyor, buggy → fail ediyor).
3. **Paylaşılan XP sistemi** (`src/lib/xp.js`, `src/components/XpStat.jsx`)
   — tek localStorage key: `learnqa_xp_python` (`{xp, completed}`). Lab ve
   Playground (ve şimdi Challenge sistemi) aynı havuzu kullanıyor;
   `markExerciseComplete(id)` aynı egzersize tekrar XP verilmesini önlüyor;
   `subscribeToXpChanges` ile aynı sekmedeki birden fazla blok canlı senkron.
4. **Görsel/animasyonlu açıklama blokları** — `GoodVsBadBlock.jsx` (iyi/kötü
   kod karşılaştırma + basit satır diff'i), `StepAnimationBlock.jsx`
   (600ms aralıklı adım animasyonu), `InteractiveDiagramBlock.jsx` (SVG test
   piramidi, tıklanabilir katmanlar). Çeşitli tab'lara dağıtıldı.
5. **Challenge & Görev Sistemi** (`ChallengeBlock.jsx` + `challenges/
   {MultipleChoice,OrderSort,FillBlank,BugSpot}.jsx`) — 4 görev tipi, 16
   örnek, 7 farklı tab'a dağıtılmış. Zorluk rozeti `xpReward`'dan türetiliyor
   (≤10 Kolay, ≤15 Orta, >15 Zor — ayrı bir `difficulty` alanı yok).
   Sürükle-bırak (OrderSort) native HTML5 DnD + ↑/↓ buton fallback'i ile.

**Doğrulama sırasında bulunan ve düzeltilen gerçek hatalar (canlı test
olmadan kaçacaktı):**
- `InteractiveDiagramBlock`'taki `stats.speed`/`stats.cost` alanları
  `{tr,en}` nesnesiydi ama `pick()` ile çevrilmeden render ediliyordu →
  "Objects are not valid as a React child" hatası TÜM sayfayı beyaz ekrana
  düşürüyordu (error boundary yok). Düzeltildi.
- `FillBlank`'te `instruction` metni iki kez render oluyordu (hem
  `ChallengeBlock`'un ortak başlığında hem bileşenin kendi içinde).
  Düzeltildi.

**Mimari notu:** Tüm yeni block tipleri (`manual-testing-lab`,
`code-playground`, `good-vs-bad`, `step-animation`, `interactive-diagram`,
`challenge`) `TopicPage.jsx`'in `renderBlock` switch'ine eklendi — mevcut
pattern korundu, yeni route/sayfa açılmadı. `CodeBlock` bileşeni
`TopicPage.jsx`'ten `export` edilerek `CodePlaygroundBlock.jsx` tarafından
yeniden kullanıldı (bilinçli, render-zamanı için güvenli bir circular import).

---

## 🎯 AKTİF FELSEFE

**"Gör, Anla, Dene ve Test Et."** — Her konu için: (1) animasyonlu
simülasyon (önce gör), (2) DOM/state görselleştirme (arka planda ne oluyor),
(3) otomasyon kodu (nasıl test ederim).

---

## Önemli Dosyalar (hızlı referans)

- `src/components/TopicPage.jsx` — tüm block tiplerinin render switch'i
  (`renderBlock`, ~satır 15670+). Yeni block tipi eklerken/ararken buraya bak.
- `src/lib/xp.js` — paylaşılan XP/tamamlanma deposu (`learnqa_xp_python`).
  Yeni bir interaktif/XP veren özellik eklenirse BURADAN `getXP`/`addXP`/
  `markExerciseComplete` kullan, yeni bir localStorage key icat etme.
- `src/components/XpStat.jsx` — XP count-up animasyonu + "+N XP" toast'u
  (`useCountUp`, `XpStatCard`, `XpSummaryBar`). Animasyon kodu BURADA tek
  yerde — kopyalama, import et.
- `src/data/pythonPlaygroundData.js` — Code Playground alıştırma verisi +
  `toPlaygroundBlock`/`getPlaygroundBlocksForTopic` adaptörü.
- `src/utils/searchIndex.js` — global arama indeksi, tüm `*Data.js`
  dosyalarını import eder.
- `DEPLOY.md` — tam deploy dokümantasyonu (Netlify/GitHub Pages/GSC).
- Test hesabı: `hasank4320@gmail.com` (learnqa-test, Email+Google provider,
  `.env.local`'da `TEST_USER_EMAIL`/`TEST_USER_PASSWORD`). Admin hesabı:
  `hasank4311@gmail.com` (`profiles.is_admin = true`).

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi.
- Her anlatımda Java analojisi zorunlu.
- Türkçe açıklama + İngilizce teknik terimler.
- **Görsel + animasyon öncelikli** — metin secondary.
- Token kısıtı varsa adım adım, onay alarak devam et.
