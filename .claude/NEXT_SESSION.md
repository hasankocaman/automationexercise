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
2. **`/basit-backend` EN içerik eksik:** tab 0 ve tab 3'te TR'de quiz bloğu
   varken EN'de hiç yok. Kalıcı olarak test kapsamı dışı (`CLAUDE.md` §22.1),
   ama gerçek bir içerik eksikliği olarak duruyor.
3. **AC08 netleştirme gerekiyor:** Acceptance criteria "özelleştirilebilir
   renk paleti / alternatif temalar" istiyor, platformda şu an sadece
   dark/light mode var. Kullanıcıyla kapsam/öncelik teyit edilmeli.
4. **`npm run test:quiz-audit` CI'a bağlı değil** — şu an sadece elle
   çalıştırılıyor, istenirse periyodik bir GitHub Actions adımına bağlanabilir.
5. **`npm run test:quiz-audit`'te 4 sayfa kırmızı (önceden var olan, bu
   oturumda dokunulmamış dosyalar):** `/java`, `/javascript`, `/kafka` —
   bu oturumda hiç değiştirilmedi, AC02 retry mekanizması testinde "Farklı
   bir soru dene" butonu bulunamıyor. `/jmeter` da kırmızı ama bu oturumda
   sadece tek bir alakasız `error-dictionary` etiketi değişti (quiz/retry
   mantığıyla ilgisi yok) — pre-existing bir bug, bu oturumun kapsamı
   dışında, ayrı incelenmeli.
5. **Bundle boyutu** — `TopicPage` chunk ~1.27MB, `typescriptData`/`javaData`/
   `sqlData` her biri 500KB+ (bilinen uyarı, `CLAUDE.md` §14 — build'i bozmuyor,
   zorunlu değil ama code-splitting adayı).

---

## ✅ Son Oturum (2026-06-27) — CLAUDE.md/NEXT_SESSION.md Denetimi + i18n İçerik Düzeltmeleri

Kullanıcı isteğiyle: (1) bu dosya kısaltıldı (aşağıdaki tüm ayrıntılı geçmiş
silindi — `git log` otoritedir), (2) `CLAUDE.md` Bölüm 2 route haritası
güncellendi (kodda olan ama dokümanda hiç listelenmemiş 18 route eklendi:
`/javascript`, `/bruno`, `/cypress`, `/git-github`, `/linux`, `/git-document`,
`/what-is-testing`, `/security`, `/manual-testing`, `/algorithms`,
`/advanced-algorithms`, `/qa-mentor`, `/basit-backend`, `/leaderboard`,
`/verify-certificate/:id`, `/qa-assistant`, `/login`, `/auth/callback`),
(3) `tests/topic-pages-ui.spec.ts`'teki `TOPIC_ROUTES` listesinden
`/basit-backend` çıkarıldı (CLAUDE.md §22.1 ile çelişiyordu — kural
"hiçbir otomatik suite'e dahil değil" diyordu ama bu dosyada hâlâ vardı).

**i18n Türkçe-sızıntı düzeltmeleri.** İlk commit'in post-commit hook'u
(`npm run test:e2e`) `tests/i18n-content-toggle.spec.ts`'teki AC03 Koşul B
testinde (EN modda 6 örnek sayfada Türkçeye özgü karakter taraması)
python/sql/typescript'te EK gerçek sızıntılar buldu — kullanıcının raporladığı
3 örnek sadece bir kısmıydı. Her round'da test tekrar koşulup kalan ihlal
giderildi, sonunda **10/10 i18n testi yeşil**:
- **Render mimarisi bug'ı (asıl kök neden, 2 yerde):** `ComparisonBlock`'taki
  `left`/`right` kod örnekleri `getLocalizedCode()`'dan hiç geçmiyordu (ham
  `side.code` basılıyordu) → düzeltildi. `ErrorDictionaryBlock`'taki
  `err.error` etiketi `tx()`'siz basılıyordu → düzeltildi. Bu ikisi
  düzeltilince, var olan `codeCommentTranslations` (TR→EN kod yorumu
  sözlüğü, `TopicPage.jsx` satır ~14) mekanizması bu alanlar için de
  otomatik çalışmaya başladı.
- **`codeCommentTranslations`'a ~25 yeni TR→EN çift eklendi** (python'daki
  "karşılığı" kalıpları, sql'deki transaction/JOIN örnek yorumları vb.) —
  **dikkat:** bu dizi sırayla `reduce` ile uygulanıyor, genel kelime kuralları
  (`YANLIŞ`→`WRONG`, `DOĞRU`→`FIXED`, `HATA`→`ERROR`) daha erken sırada
  olduğu için sonraki spesifik pattern'lerin bu DÖNÜŞTÜRÜLMÜŞ hâli
  eşlemesi gerekti (örn. `Açık bırakılan...` pattern'i `YANLIŞ` önekini
  içermemeli, çünkü o zaten `WRONG`'a çevrilmiş olacak).
- **2 hardcoded JSX bug'ı** (`TopicPage.jsx`): `TSLegoClassesVisual`'daki
  `javaCode`/`tsCode` template literal'leri dile bakmadan sabit Türkçeydi →
  `isTr` şartına bağlandı. `python-compile-run` simülasyonundaki "☕ Java
  (Ayrı Derleme Adımı)" etiketi sabitti → `isTr ?` ile düzeltildi.
- **Veri düzeltmeleri:** `pythonData.js`'de "Java → Python" sekmesindeki
  16 heading + 1 giriş paragrafı + 18 satırlık "Quick Comparison Table"
  tamamen Türkçe-only'di → bilingual yapıldı. `sqlData.js`'in "🛠️ DBeaver"
  sekmesinde (kurulum grid'i, "Create DB & Schema" grid'i, Next.js/Prisma
  kod örnekleri, karşılaştırma tablosu, `.env.local` örneği, 3 adet
  "TR / EN" birleşik heading) baştan sona Türkçe-only'di, EN-only diziye
  (`finalEnSections`) ait olduğu için tamamı düzeltildi. `typescriptData.js`'de
  9 "Java Biliyorsan" karşılaştırma bloğunun `why`/`note.en` alanı yanlışlıkla
  Türkçe'ydi (doğru İngilizce metin zaten kullanılmayan `why_en`/`note_en`
  alanlarında duruyordu, oradan taşındı, dead alanlar silindi).
- **Not — gerçek bug OLMAYAN, false-positive olarak doğrulanan bulgular:**
  postman/jmeter'da benzer görünen 6 `error:` etiketi ile aws/azure/docker/
  kafka/kubernetes/jenkins'teki 13 etiket TAMAMEN `tr.sections`'a ait —
  yani zaten sadece Türkçe kullanıcıya gösteriliyor, EN kullanıcı hiç
  görmüyor. Aksiyon gerekmiyor. (Bu dosyaların `cause`/`solution`
  alanlarının çoğu zaten sadece `{tr:...}` — `en` karşılığı yok — ama bu
  ayrı, çok daha büyük bir içerik yazma görevi, bu oturumun kapsamı dışında
  bırakıldı.)

`npm run build` (38 route, SEO check), `npm run test:e2e` (59/60 — sadece
bilinen AC07 RLS-pending testi hariç) ve `tests/i18n-content-toggle.spec.ts`
(10/10) yeşil.

---

## 🎯 AKTİF FELSEFE

**"Gör, Anla, Dene ve Test Et."** — Her konu için: (1) animasyonlu
simülasyon (önce gör), (2) DOM/state görselleştirme (arka planda ne oluyor),
(3) otomasyon kodu (nasıl test ederim).

---

## Önemli Dosyalar (hızlı referans)

- `src/components/TopicPage.jsx` — tüm block tiplerinin render switch'i
  (`renderBlock`, ~satır 15670+). Yeni block tipi eklerken/ararken buraya bak
  — block tipi listesi sık değiştiği için burada veya `CLAUDE.md`'de
  ayrıca elle tutulmuyor, kod tek kaynak.
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
