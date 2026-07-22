# Kod Pratiği: Doğruda Konfeti, Yanlışta Üyelere Özel AI Açıklama — Plan

> `CLAUDE.md` §0 kuralına göre bu dosya **kalıcı bir yayılım planıdır**
> (`video-sitewide-plan.md`, `sandbox-and-framework-plan.md` ile aynı tür).
> Anlık durum takibi `.claude/NEXT_SESSION.md`'dedir, bu dosyada commit hash
> veya "şu an ne yapıyoruz" bilgisi TUTULMAZ.

## 0. Tetikleyici ve Mevcut Durum Analizi

Kullanıcı, `/gauge` framework mimarisi sekmesindeki scripted-terminal +
checklist görselini örnek göstererek şunu istedi: **kod yazılan HER yerde**
kullanıcı kodunu yazsın, sonucu görsün; doğruysa konfeti patlasın, yanlışsa
AI devreye girip açıklama yapsın.

Kod tabanı taraması sonucu (2026-07-22):

- Bu desen zaten [CodePlaygroundBlock.jsx](../src/components/CodePlaygroundBlock.jsx)
  içinde var (`PracticePanel`/`FixThePanel` + `TerminalRun` = scripted terminal,
  `DiagnosticPanel`/`firstDifferentLine` = checklist/autograder). Site genelinde
  `code-playground` bloğu olan tüm sayfalarda zaten kullanılıyor.
- **Eksik 1 — Confetti yok.** Doğru cevapta sadece yeşil metin kutusu var,
  [ConfettiExplosion.jsx](../src/components/ConfettiExplosion.jsx) hiç tetiklenmiyor.
- **Eksik 2 — Yanlışta AI yok.** `DiagnosticPanel` tamamen deterministik
  (string satır karşılaştırması), Groq/AI çağrısı yapmıyor.
- **Backend deseni zaten var, kopyalanabilir:** `explain-quiz-answer`,
  `judge-eval`, `grade-interview-answer` edge fonksiyonları + `TopicPage.jsx`
  içindeki `AiExplanationPanel` bileşeni — `useAuth()` → `session` yoksa kilit
  mesajı, varsa buton → `supabase.functions.invoke(...)` → `sanitizeAiText`.
  Bu proje zaten "AI özellikleri sadece üyelere özel" politikasını üç yerde
  uyguluyor; yeni özellik bu politikayı BOZMAZ, aynısını tekrar eder.
- **Runtime editörlerdeki daha derin boşluk (kapsam dışı bırakıldı — bkz. §3):**
  `PyodideEditor`/`TSEditor`/`JSEditor` ([TopicPage.jsx](../src/components/TopicPage.jsx))
  `onFirstSuccess` callback'ini "exception atmadan çalıştı" anlamında
  tetikliyor, "doğru cevap" anlamında değil — bu blok tipinde `expected` alanı
  hiç yok. Bunu düzeltmek her sayfada içerik yazımı gerektiren ayrı bir
  fazdır, bu planın Faz 1'inde YAPILMAZ.

## 1. Faz 1 — CodePlaygroundBlock (merkezi bileşen, tek değişiklik → site geneli yayılır)

Bu bileşen zaten `code-playground` bloğu olan her sayfada kullanıldığı için
buradaki değişiklik ekstra içerik yazmadan otomatik yayılır.

### 1.1 Yeni edge function — `explain-code-practice`
- Konum: `supabase/functions/explain-code-practice/index.ts`
- Model alınan dosya: `explain-quiz-answer/index.ts` (birebir aynı iskelet:
  CORS, `createClient` + `auth.getUser()` üye kontrolü, `_shared/groq.ts`
  `callGroq`, kesin TR/EN dil kuralı — Latin dışı alfabe yasak).
- Girdi: `{ task, language, solutionCode, userCode, diagnosticLine, lang }`
  (`diagnosticLine` = mevcut `firstDifferentLine` çıktısı, AI'ya referans
  olarak verilir, AI bunu tekrar etmez üzerine inşa eder — `explain-quiz-answer`
  içindeki "STATİK AÇIKLAMA... tekrar etme, üzerine inşa et" deseniyle aynı).
- Çıktı: `{ explanation }` — 2-4 cümle, öğrencinin YAZDIĞI koda özel (genel
  "doğru cevap bu" değil, onun kodundaki spesifik hatayı adresler).
- **Sadece üyeler** — `Authorization` header yoksa/`auth.getUser()` boşsa 401.

### 1.2 Confetti — doğru cevapta
- `PracticePanel` ve `FixThePanel`'in `onPass`/`result==='pass'` yolunda
  `ConfettiExplosion` tetiklenir (mevcut bileşen zaten parametrik:
  `duration`/`particleCount`).
- **Mikro patlama** — sekme tamamlanınca gelen büyük konfetiyle (TopicPage,
  ders bitirme) karışmaması için daha kısa süre + daha az parçacık
  (örn. `duration={1200} particleCount={16}`).

### 1.3 AI açıklama paneli — yanlış cevapta, SADECE üyelere
- `TopicPage.jsx`'teki `AiExplanationPanel` deseni birebir kopyalanır (yeni
  bir component `AiPracticeExplanationPanel`, `CodePlaygroundBlock.jsx`
  içinde tanımlanır):
  - `useAuth()` → `session` yoksa: kilit mesajı ("🔒 AI açıklaması için giriş
    yapmalısın"), buton YOK — mevcut deterministik `DiagnosticPanel` HERKESE
    (üye olmayana da) aynen görünmeye devam eder, bu davranış BOZULMAZ.
  - `session` varsa: "🤖 AI'dan bu kodum için ek açıklama iste" butonu →
    tıklanınca `explain-code-practice` çağrılır → yükleniyor/hata/sonuç
    durumları `AiExplanationPanel` ile aynı görsel dil.
  - Bilinçli olarak OTOMATİK tetiklenmez (aynı gerekçe: ücretsiz Groq kotasını
    her yanlış denemede otomatik tüketmemek — `explain-quiz-answer`'daki
    yorumla aynı).
- Yerleşim: `PracticePanel` ve `FixThePanel`'de mevcut `DiagnosticPanel`'in
  hemen altına.

## 2. Faz 1 Kısıtları (CLAUDE.md uyumu)

- Yeni edge function'ın sistem promptu §8'deki "Türkçe sayfada TÜM açıklama
  cümleleri Türkçe, teknik terimler İngilizce" kuralına ve `explain-quiz-answer`
  içindeki KESİN dil kuralına (Latin dışı alfabe yasak) uymalı.
- Mevcut anonim/deterministik davranış (herkes için çalışan `DiagnosticPanel`)
  KORUNUR — AI paneli EK bir katman, mevcut ücretsiz deneyimi kısıtlamaz
  (CLAUDE.md §5: progress/temel deneyim üyelik şartı olmadan çalışmalı).
- Yeni bileşen/dosya YOK — `ConfettiExplosion`, `useAuth`, `supabase`,
  `sanitizeAiText` zaten var, sadece `CodePlaygroundBlock.jsx`'e import edilir.

## 3. Faz 2 (bu planın kapsamı DIŞINDA, sonraki oturum/lara bırakılır)

- Runtime editörlere (`PyodideEditor`/`TSEditor`/`JSEditor`/`SQLEditor`)
  opsiyonel `expected` alanı + gerçek stdout karşılaştırması eklemek — bu,
  her blok için içerik yazımı gerektirir, tek commit'te bitmez.
- Faz 1 tamamlandıktan sonra hangi sayfaların/blokların Faz 2'ye taşındığı
  `NEXT_SESSION.md`'de sayfa sayfa takip edilir, bu dosyada değil (§0).

## 4. Test/Doğrulama Politikası (bu planın branch'inde geçerli)

`NEXT_SESSION.md`'deki kalıcı kural aynen uygulanır: feature branch'te her
commit'te sadece `check-content-integrity.mjs` + `npm run build` (hızlı)
zorunlu; tam `npm run test:e2e` paketi SADECE main'e push'tan hemen önce, bir
kere çalıştırılır. Döngü: kodla → `NEXT_SESSION.md` güncelle →
`SKIP_E2E_HOOK=1 git commit` → sıradaki adım.
