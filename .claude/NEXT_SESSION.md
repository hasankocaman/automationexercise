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

**i18n Türkçe-sızıntı düzeltmeleri (EN modda Türkçe metin gösteren gerçek
bug'lar, kullanıcı raporundan + ek tarama ile bulundu):**
- `pythonData.js` — `error-dictionary` bloğunda `error: 'FAILED vs ERROR
  ayrımı'` plain string'di, `ErrorDictionaryBlock` bunu `tx()`'siz basıyordu
  → bilingual yapıldı + `TopicPage.jsx`'teki render satırı `tx(err.error,
  language)` kullanacak şekilde düzeltildi (bu fonksiyon artık her sayfada
  bilingual `error` alanını destekler). Ayrıca "☕ Java → Python" sekmesindeki
  16 heading + 1 giriş paragrafı tamamen Türkçe-only'di (EN sayfada da
  Türkçe görünüyordu) — hepsi bilingual yapıldı.
- `typescriptData.js` — "Java Biliyorsan" (`java-compare`) bloklarının
  `why`/`note` alanlarının `en` değeri yanlışlıkla Türkçe metin içeriyordu
  (9 farklı blok: Type declarations, Basic Types, Interface, Class, Access
  Modifiers, Generics, Enum, Null Safety, Union Types, Async/Await — dosyada
  2 kez tekrarlanmış haliyle 18 lokasyon). Doğru İngilizce metin zaten
  kullanılmayan `why_en`/`note_en` alanlarında duruyordu (render hiç
  okumuyordu) — oradan taşındı, dead `_en` alanları silindi.
- `sqlData.js` — JOIN görsel rehberi açıklama metninde EN cümle içinde
  Türkçe buton adı geçiyordu ("Eşleşmeleri Göster"/"Sonucu Göster" yerine
  gerçek buton metni "Show Matches"/"Show Result" olmalıydı) + DBeaver
  sekmesinde 6 öğelik bir `grid` bloğu (label+desc) tamamen Türkçe'ydi ve
  EN-only diziye (`finalEnSections`) aitti → ikisi de düzeltildi.
- **Not — false-positive'ler bulundu ve geri alınmadı (zararsız, dokunulmadı):**
  postman/jmeter'da benzer görünen 6 `error:` etiketi bulundu ama bunlar
  dosyanın `tr.sections`'ına ait olduğu doğrulandı (yani zaten sadece
  Türkçe kullanıcıya gösteriliyor, EN kullanıcı hiç görmüyor) — bilingual'a
  çevrilmeleri zararsız ama gereksizdi. aws/azure/docker/kafka/kubernetes/
  jenkins'te bulunan "benzer" 13 etiket de aynı şekilde TAMAMEN
  `tr.sections` içinde — **gerçek bug değiller, ek aksiyon gerekmiyor.**
  (Bu dosyaların `cause`/`solution` alanlarının çoğu zaten sadece `{tr:...}`
  şeklinde — `en` karşılığı yok — ama bu ayrı, çok daha büyük bir içerik
  yazma görevi, bu oturumun kapsamı dışında bırakıldı, kullanıcıya
  raporlandı ama henüz talep edilmedi.)

`npm run build` (38 route, SEO check) ve ilgili Playwright testleri
(`topic-pages-ui`, `sql-page`, `typescript-page`, `python-page` — 28/28)
yeşil.

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
