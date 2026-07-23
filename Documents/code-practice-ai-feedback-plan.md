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

## 3. Faz 2 — ✅ KODLAMA TARAFI TAMAMLANDI (2026-07-23)

> Bu bölüm başlangıçta "bu planın kapsamı DIŞINDA, sonraki oturum/lara
> bırakılır" olarak yazılmıştı — kullanıcı sonraki bir oturumda aynı
> branch'te devam edilmesini istedi ve aşağıdaki tamamı bitti.

- Runtime editörlerin (`PyodideEditor`/`TSEditor`/`JSEditor`/`SQLEditor`)
  TAMAMINA opsiyonel `expected` alanı + gerçek stdout karşılaştırması +
  mikro-confetti + üye-only AI açıklama paneli eklendi.
- `pythonData.js`'teki 40 `type:'editor'` bloğunun 35'ine gerçek `expected`
  yazıldı (5'i kasıtlı hariç — set sıralaması/`random`/`datetime.now()`/
  `time.perf_counter()` nedeniyle deterministik olamaz, `NEXT_SESSION.md`'de
  liste var).
- TSEditor/JSEditor/SQLEditor'a aynı mekanizma eklendi ama **rollout hedefi
  YOK** — site genelinde `lang:'typescript'/'javascript'/'sql'` ile TEK BİR
  `type:'editor'` bloğu yok (`/typescript` ve `/sql` zaten `code-playground`
  kullanıyor, `/javascript`'te hiç interaktif pratik yok — bu ayrı, bu
  planın kapsamı dışında bir görev). Mekanizma altyapısal hazırlık olarak
  duruyor, ileride bir blok yazılırsa otomatik çalışacak.
- Yeni `explain-code-output` edge function'ı (üye-only, `explain-code-practice`
  ile aynı desende ama ÇIKTI kıyaslaması için) yazıldı — **HENÜZ DEPLOY
  EDİLMEDİ**, kullanıcı adımı gerekiyor (bkz. §5 Manuel Test Adımları).
- Yan bulgu: `javaData.js`'teki 22 `type:'editor', lang:'java'` bloğu yanlış
  bileşene (Pyodide/Python yorumlayıcısı) yönleniyordu, her zaman hata
  veriyordu — düzeltildi (artık `JavaPracticeBlock`'a yönleniyor).
- Ayrı bir kullanıcı bug raporu üzerine (bu planın kapsamı dışında ama aynı
  branch'te düzeltildi): `/qa-mentor` yol haritasında bir ders sadece İLK
  sekmesi/dersi bitince TAMAMI "tamamlandı" gösteriyordu — düzeltildi,
  detay `NEXT_SESSION.md`'de.
- Detaylı teknik anlatım ve hangi dosyaların değiştiği için `NEXT_SESSION.md`
  (bu dosyanın §0 kuralı gereği anlık durum burada değil orada tutulur).

## 4. Test/Doğrulama Politikası (bu planın branch'inde geçerli)

`NEXT_SESSION.md`'deki kalıcı kural aynen uygulanır: feature branch'te her
commit'te sadece `check-content-integrity.mjs` + `npm run build` (hızlı)
zorunlu; tam `npm run test:e2e` paketi SADECE main'e push'tan hemen önce, bir
kere çalıştırılır. Döngü: kodla → `NEXT_SESSION.md` güncelle →
`SKIP_E2E_HOOK=1 git commit` → sıradaki adım.

## 5. Manuel Test Adımları (kullanıcı için — bu plan kapsamındaki her özellik)

> Bu bölüm, Faz 1 + Faz 2 + yan bulgu olarak düzeltilen qa-mentor bug'ının
> nasıl elle doğrulanacağını anlatır. `npm run dev` ile local sunucuyu
> başlattıktan sonra sırasıyla uygulanabilir.

### 5.1 Faz 1 — Kod pratiğinde konfeti + üye-only AI açıklama
Herhangi bir sayfada (örn. `/linux`, `/java`) bir `code-playground` bloğu bul.
1. Doğru cevabı yaz, kontrol et → yeşil onay + mikro-konfeti görülmeli.
2. Yanlış cevap yaz, kontrol et → satır bazlı "Beklenen/Senin kodun" ipucu +
   altında (anonimken) 🔒 kilit mesajı, AI butonu YOK.
3. Gerçek hesapla giriş yap, aynı yanlış cevabı tekrar dene → "🤖 AI'dan kodum
   için ek açıklama iste" butonu görünmeli, tıklayınca kodun özel açıklama
   dönmeli (Groq çağrısı — birkaç saniye sürebilir).

### 5.2 Faz 2 — Python runtime editöründe gerçek çıktı doğrulama
1. `/python` → sol menüden **"Sözdizimi & Yorumlar"** sekmesi.
2. İlk "Try it yourself" editöründe **▶ Run** → yeşil "✅ Doğru! Çıktı
   bekleneni karşılıyor." + mikro-konfeti görülmeli.
3. Kodu boz (bir `print` satırını sil/değiştir), tekrar Run → amber "⚠️ Çıktı
   henüz beklenenle eşleşmiyor." + "Beklenen: ..." metni görülmeli.
4. Anonimken amber kutunun altında sadece 🔒 kilit mesajı olmalı; gerçek
   hesapla giriş yapınca (deploy sonrası, bkz. 5.3) AI butonu görünmeli.
5. Diğer sekmelerde de (örn. "Değişkenler & Tipler", "Dosya & JSON") aynı
   deseni birkaç editörde tekrarla — pythonData.js'teki 35 blok bu şekilde
   çalışıyor olmalı. **İstisna:** "Setler & Sözlükler" (set örneği),
   "Koşul & Döngüler" (retry pattern), "Kapsam & Modüller" (`random` kullanıcı
   üretici), "Yardımcı Modüller" (`datetime.now()`), "İleri Seviye Kavramlar"
   (`time.perf_counter()` timer örneği) bloklarında `expected` KASITLI OLARAK
   yok — bu 5 blokta Run'a basınca sadece çıktı gösterilir, doğru/yanlış
   değerlendirmesi YAPILMAZ (bu bir hata değil, tasarım gereği).

### 5.3 `explain-code-output` deploy (ZORUNLU — deploy edilmeden 5.2 madde 4 test edilemez)
```bash
supabase functions deploy explain-code-output --project-ref qtwargbbwuvrupfyowbg   # learnqa-test
supabase functions deploy explain-code-output --project-ref qmvurwmcuexvuwvaiuhj   # learnqa-prod
```
`GROQ_API_KEY` secret'ı zaten her iki projede de mevcut, ek secret gerekmiyor.
Deploy sonrası 5.2 madde 4'ü gerçek hesapla tekrar dene.

### 5.4 Java editör yönlendirme düzeltmesi
1. `/java` sayfasında herhangi bir `type:'editor'` bloğu bul (örn. "Temel
   Sözdizimi" pratiği — 22 tane var, hepsi aynı bileşeni kullanıyor).
2. Görülmesi gereken: Python değil, **Java statik-analiz kontrolcüsü**
   (turuncu "Kendin Dene" kutusu, `▶ Kontrol Et` butonu, class/main/parantez/
   noktalı virgül kontrolleri). Öncesinde bu blok "her zaman kırmızı hata"
   veriyordu (Java kodu Python yorumlayıcısından geçmeye çalışıyordu).

### 5.5 QA Mentor "tamamlandı" bug fix (yan bulgu, aynı branch'te düzeltildi)
1. `/what-is-testing` sayfasına git, SADECE ilk sekmenin ("Giriş & Neden")
   quiz'ini geç (diğer 5 sekmeye dokunma).
2. `/qa-mentor`'a git (daha önce sihirbazı tamamladıysan roadmap görünür,
   tamamlamadıysan önce 4 soruluk sihirbazı bir kez geç).
3. "Test Temelleri" düğümünün **HALA "tamamlandı" göstermediğini** doğrula
   (bug varken burada yanlışlıkla "tamamlandı" görünüyordu).
4. `/what-is-testing`'e dönüp KALAN tüm sekmelerin quiz'lerini de geç.
5. `/qa-mentor`'a dön → şimdi "Test Temelleri" doğru şekilde "tamamlandı"
   görünmeli. Aynı senaryo `/algorithms` ve `/manual-testing` için de
   tekrarlanabilir (aynı bug, aynı düzeltme oradaki derslere de uygulandı).

### 5.6 TS/JS/SQL editör altyapısı
Şu an test edilecek bir şey YOK — hiçbir sayfada `type:'editor',
lang:'typescript'/'javascript'/'sql'` bloğu yok (bkz. §3). Bu bölüm, ileride
böyle bir blok eklenirse (örn. `/javascript` sayfasına interaktif pratik
yazılırken) 5.2'deki adımların aynısı uygulanabilir demek içindir.
