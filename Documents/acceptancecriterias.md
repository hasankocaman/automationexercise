# LearnQA.dev — Platform Geliştirme Özeti & Sistem Kabul Kriterleri

## Proje Bağlamı

- **Site:** learnqa.dev — QA/test otomasyonu eğitim platformu
- **Stack:** React 18 + Vite 5, JSX/JS, react-router-dom (**TypeScript YOK**)
- **Mimari:** Block-type sistemi — `TopicPage.jsx` içindeki switch/case pattern
- **Kapsam:** Tüm geliştirmeler şimdilik **sadece Python sayfası** için yapıldı; onaylandıktan sonra tüm sayfalara yayılacak
- **i18n:** Tüm metin içerikleri bilingual (tr/en) olmak zorunda — CLAUDE.md §7-8

---

## 📋 Sistem Kabul Kriterleri (Acceptance Criteria)

> Bu kriterler tüm ders sayfaları için geçerlidir (Python, Postman, Java ve diğerleri).

### 🔴 Major (Kritik) Kriterler

#### AC 01 — Navigasyon ve Temel Etkileşim
Kullanıcı, ana sayfada yer alan tüm butonlara ve tıklanabilir ögelere sorunsuz şekilde tıklayabilmeli ve ilgili aksiyonlar tetiklenmelidir.

---

#### AC 02 — Quiz Mekanizması ve Hata Toleransı
- Kullanıcı, mülakat hazırlık sayfalarındaki sekmelerde bulunan tüm quiz sorularını yanıtlayabilmelidir.
- **Hata durumu:** Kullanıcı yanlış cevap verirse sistem **bir defaya mahsus** farklı bir ekstra quiz sorusu göstermeli ve kullanıcı bunu cevaplayabilmelidir.

---

#### AC 03 — Çoklu Dil Desteği (i18n)

**Sayfa dili = Türkçe:**
- Quiz soruları ve cevaplar Türkçe olmalıdır
- Sektörde yerleşik İngilizce terimler çevrilmez; format: `İngilizce Terim (Türkçe Karşılığı)`
- Kod bloklarındaki yorum satırları Türkçe olmalıdır (kalıplaşmış terim kuralı geçerli)

**Sayfa dili = İngilizce:**
- İçeriklerde ve yorum satırlarında hiçbir Türkçe kelime/cümle kullanılmamalıdır

**Teknik uygulama:** Tüm metinler `{ tr: '...', en: '...' }` formatında — `pick(lang, obj)` ile lokalize edilir

---

#### AC 04 — Mülakat Sorularına Erişim Bariyeri (Gatekeeping)
- Quiz sorularının **en az %60'ı** doğru cevaplanmadan mülakat soruları kilitli kalmalıdır
- Başarı oranı **≥ %60** olduğunda mülakat soruları görünür ve erişilebilir hale gelmelidir
- Kilitli durum görsel olarak açıkça belirtilmelidir (kilit ikonu, açıklama metni vb.)

---

#### AC 05 — AI Destekli Quiz Açıklamaları
- Kullanıcı "Cevabı Kontrol Et" butonuna tıkladıktan sonra **"AI'dan Ek Açıklama İste"** butonu görünür olmalıdır
- AI yanıtı doğrudan ilgili soruyla ilişkili olmalıdır
- Sayfa dili Türkçe → AI yanıtı Türkçe; İngilizce → İngilizce

**Teknik:** Anthropic API — `src/lib/ai.js` üzerinden çağrılacak; model: `claude-sonnet-4-6`

---

#### AC 06 — Mülakat Sayfası İçerik ve AI Değerlendirme Döngüsü
- Her sayfada **en az 50 mülakat sorusu** bulunmalıdır
- Kullanıcı soruyu okuduktan sonra cevabını yazabileceği bir text input alanı açılmalıdır
- Kullanıcı cevabını gönderdiğinde AI tarafından değerlendirilmeli; değerlendirme tamamlandıktan sonra sorunun ideal cevabı gösterilmelidir

---

#### AC 07 — Kurs Bitirme ve Reset Senaryoları

**Başarı durumu (≥ %80):**
- Kullanıcı mülakat sorularının en az %80'ini doğru cevaplarsa başarı bildirilir
- Profile **"Bitirme Rozeti" (Completion Badge)** tanımlanır

**Başarısızlık durumu (< %80):**
- Bitirme rozeti verilmez, kullanıcı bilgilendirilir
- Sistem tüm cevapları sıfırlayarak baştan başlayabileceğini bildirir
- Kullanıcı onaylarsa **Reset butonu** aktifleşir
- Reset: tüm quiz ve mülakat cevapları **hard-reset** edilir → kullanıcı **ilk sekmeye** yönlendirilir

**localStorage etkileri:** `learnqa_xp_python` içindeki `completed` listesi ve quiz state'leri sıfırlanır; XP sıfırlanmaz (tartışmaya açık)

---

### 🟡 Minor (İkincil) Kriterler

#### AC 08 — UI/UX: Tema ve Erişilebilirlik
- Light/Dark mode geçişlerinde gözü yormayan renk kombinasyonları kullanılmalıdır
- Fontlar tüm ekranlarda yüksek okunabilirliğe sahip olmalıdır
- Kullanıcıya **alternatif renk paleti seçenekleri (temalar)** sunulmalıdır
- Tema seçildiğinde sayfa arka planı ve font renkleri dinamik olarak değişmelidir

---

#### AC 09 — Yol Haritası (Roadmap) ve İlerleme Takibi
- Kullanıcı kariyer yolu seçtiyse güncel ilerleme (progress bar veya checkpoint) görselleştirilmelidir
- Tamamlanan dersler/konular kullanıcı panelinde net şekilde gösterilmelidir

---

#### AC 10 — TR Modda Kod Bloğu Yorum Dili Kalitesi

**Kapsam:** TÜM teknoloji sayfaları (Python, Selenium, Playwright, Cypress, TypeScript, Docker, Jenkins, Kubernetes, Git, Linux, SQL, Java, Postman, Bruno vb.)

**Sayfa dili = Türkçe:**
- `code` ve `editor` bloklarındaki açıklayıcı yorum satırları (`#`, `//`, `/* */`, `--`) Türkçe olmalıdır
- **İngilizce kalabilecek istisnalar:**
  - Yerleşik yazılım terimleri (`fixture`, `assert`, `CI/CD`, `JOIN`, `NULL`, `pipeline`, vb.)
  - Gerçek terminal/program çıktısı satırları (versiyon numaraları, hata kodları, `✔ JAVA_HOME is set` gibi sistem çıktıları)
  - Değişken/fonksiyon/sınıf isimleri

**Sayfa dili = İngilizce:**
- Yorum satırlarında Türkçe özel karakter (`ğ`, `ü`, `ş`, `ı`, `ö`, `ç`) bulunmamalıdır
- Bu kural `tests/i18n-content-toggle.spec.ts` ile otomatik doğrulanır (28 test, tüm sayfalar)

**Teknik uygulama:**
- Düz string `code` blokları: `TopicPage.jsx > englishToTurkishCodeComments` dizisindeki çeviri kuralları `localizeCodeComments` mekanizmasıyla çalışma zamanında uygulanır
- Bilingual `{tr, en}` `code` blokları: TR/EN içerik ayrı ayrı tutulur, `getLocalizedCode` doğrudan doğru versiyonu döndürür
- Yeni yorum ifadesi eklenirken ya `englishToTurkishCodeComments`'e çeviri çifti eklenmeli ya da blok `{tr, en}` formatına dönüştürülmelidir

**Test kriterleri (Playwright):**
1. `/python` sayfası, "Variables & Types" sekmesi, TR modda:
   - `# Multiple assignment` metni görünmemeli
   - `# Çoklu atama` metni görünmeli
2. `/python` sayfası, TR modda, tüm sekmelerde:
   - Kod bloklarında `# Check type`, `# Basic function`, `# ALWAYS runs — like Java finally` gibi açıklayıcı İngilizce yorumlar görünmemeli
3. Tüm sayfalar, EN modda:
   - Yorum satırlarında `ğ`, `ü`, `ş`, `ı`, `ö`, `ç` karakterleri bulunmamalı (mevcut `i18n-content-toggle.spec.ts` bu kontrolü yapıyor)

**Test dosyası:** `tests/i18n-content-toggle.spec.ts` (EN mod zaten kapsanıyor) + gerekirse `tests/tr-code-comments.spec.ts` (TR mod pozitif doğrulama için — opsiyonel, öncelik düşük)

**İlgili CLAUDE.md bölümleri:** §8 (Türkçe yorum kuralı + yeni blok ekleme protokolü), §11 (yapma listesi)

---

#### AC 11 — Sekme Alt Gezinme (Prev/Next) Doğruluğu

**Kapsam:** TopicPage tabanlı TÜM teknoloji sayfaları (Docker, Python, Selenium,
Playwright, Cypress, SQL, TypeScript, JavaScript, Java, Git & GitHub, Linux,
Kubernetes, Jenkins, Postman, Bruno, REST Assured, JMeter, Kafka, Appium,
BrowserStack, AWS, Azure, what-is-testing, test-frameworks vb.)

- Her sekmenin altındaki "← Önceki sekme" ve "Sonraki sekme →" gezinme
  butonları, o an aktif olan sekmenin GERÇEK bir önceki/bir sonraki komşusunun
  adını göstermelidir.
- İlk sekmede "← Önceki" butonu, son sekmede "Sonraki →" butonu HİÇ
  render edilmemelidir (gizli değil, DOM'da bulunmamalı).
- "← Önceki" ve "Sonraki →" butonları **asla aynı metni** göstermemelidir.
- Bu kural, sekmenin altındaki yeşil "✅ Bu bölümü bitirdin → Sıradaki: X"
  kartı için de geçerlidir (aynı `tabs[activeTab±1]` mantığını kullanır).

**Bulgu (2026-07-05):** Kullanıcı, `/docker` sayfasında sekme sırası ne olursa
olsun alt gezinme butonlarının hep "Image'lar" gösterdiğini bildirdi
(ekran görüntüsüyle). Kapsamlı inceleme (kod okuma + TR/EN/masaüstü/mobil
canlı Playwright testi + `src/data/*Data.js` genelinde `tabs` dizilerinde
mükerrer sekme adı taraması) mevcut `main` HEAD'inde bu davranışı YENİDEN
ÜRETEMEDİ — muhtemelen deploy/cache zamanlama sorunuydu. Kök neden kesin
doğrulanamadığından, kalıcı bir regresyon testi eklendi (aşağıya bak) —
bu sınıf bir hata gelecekte HERHANGİ bir sayfada oluşursa artık build/commit
aşamasında yakalanır.

**Teknik uygulama:**
- `TopicPage.jsx` ve `TestFrameworksPage.jsx`'teki pagination butonlarına
  `data-testid="tab-nav-prev"` / `data-testid="tab-nav-next"` eklendi
  (görsel/davranışsal değişiklik yok, sadece test kancası).
- `TopicPage.jsx`'teki "Sıradaki" tamamlama kartına `data-testid="tab-nav-next-suggestion"` eklendi.

**Test dosyası:** `tests/topic-pages-ui.spec.ts` — her route için, sekme
döngüsünün HER adımında prev/next butonlarının doğru komşu sekmeyi
gösterdiği ve birbirinden farklı olduğu doğrulanır. Bu dosya `npm run test:e2e`
kapsamında olduğundan **her commit sonrası `post-commit` hook'u ile otomatik
çalışır** (bkz. CLAUDE.md §22, `scripts/post-commit-tests.sh`).

---

## ✅ Tamamlanan Geliştirmeler

### 1. Manual Testing Lab
**Dosyalar:**
- `src/components/ManualTestingLabBlock.jsx` — ana bileşen (BuggyLoginApp, BugReportForm, BugEvaluator, LabScoreboard)
- `src/data/manualTestingLabBugs.js` — bug kataloğu ve puanlama mantığı
- `src/components/BuggyLoginForm.jsx` — hatalı demo login formu

**Ne yapar:**
- Kullanıcıya kasıtlı hatalı bir login formu gösterir
- Kullanıcı test eder, bug bulur, bug report yazar
- Sistem rule-based olarak puanlar (başlık 0–20, adımlar 0–30, beklenen/gerçek 0–30, severity 0–20)
- XP kazandırır, bulunan bug'ları yeşil ✅ olarak işaretler

**5 Kasıtlı Bug:**
1. Geçersiz email kabul ediliyor
2. "Şifremi Unuttum" → 404
3. Double submit (debounce yok)
4. Her zaman aynı generic hata mesajı
5. Boş şifrede yanlış hata mesajı

**pythonData.js'e eklenen sekme:** `🐞 Manuel Test Lab`

**İlgili AC'ler:** AC 01, AC 07

---

### 2. Kod Playground (Run / Fix / Hint Butonları)
**Dosyalar:**
- `src/components/CodePlaygroundBlock.jsx` — ana playground bileşeni
- `src/data/pythonPlaygroundData.js` — 42 egzersiz (5 orijinal + 37 yeni)

**Ne yapar:**
- Python sayfasındaki 21 kod sekmesinin tamamında çalışır
- Her egzersizde 4 buton:
  - **▶ Run** → typewriter animasyonuyla terminal output gösterir
  - **👁 Show Expected Output** → anında output + açıklama (XP yok)
  - **🐛 Fix the Failing Test** → düzenlenebilir textarea, 2 yanlış denemede "Çözümü Göster" çıkar
  - **💡 Hint** → 1→2→3 sırayla, öncekiler görünür kalır

**Adapter:** `toPlaygroundBlock()` fonksiyonu veri formatını bileşenin beklediğine dönüştürür

**Hariç tutulan sekmeler:** Manual Testing Lab, Interview Q&A

**pythonData.js'e eklenen sekme:** `⚡ Kod Playground`

**İlgili AC'ler:** AC 01, AC 03

---

### 3. XP Sistemi Entegrasyonu
**Dosyalar:**
- `src/lib/xp.js` — tek kaynak (getXP, addXP, getCompletedExercises, markExerciseComplete)
- `src/components/XpStat.jsx` — XpStatCard ve XpSummaryBar bileşenleri + useCountUp hook

**Ne yapar:**
- Manual Testing Lab ve Code Playground aynı XP havuzunu kullanır
- localStorage key: `learnqa_xp_python` — `{xp, completed}` formatında
- Migration: eski localStorage verisini otomatik taşır, kayıp yok
- Pub/Sub senkronizasyon: aynı sayfada birden fazla blok varsa hepsi anlık güncellenir (native CustomEvent)
- Floating "+N XP" toast animasyonu ve count-up her iki bileşende çalışır

**XP Kuralları (Playground):**
- ▶ Run + doğru → xpReward kazan (ilk kez)
- 🐛 Fix + doğru → xpReward kazan (ilk kez)
- 👁 Show Expected Output → XP yok
- 💡 Her hint → kazanılacak XP'den -5 (minimum 0)
- Aynı egzersiz tekrar → XP verilmez

**İlgili AC'ler:** AC 07 (reset senaryosunda completed listesi sıfırlanmalı)

---

### 4. Görsel & Animasyonlu Açıklamalar
**Dosyalar:**
- `src/components/GoodVsBadBlock.jsx`
- `src/components/StepAnimationBlock.jsx`
- `src/components/InteractiveDiagramBlock.jsx`

**TopicPage.jsx'e eklenen case'ler:** `good-vs-bad`, `step-animation`, `interactive-diagram`

#### GoodVsBadBlock
- Yan yana kötü/iyi kod karşılaştırması
- Hover: karşı taraf soluklaşır, üzerindeki parlar
- "Farkı Göster": değişen satırlar highlight (dış kütüphane yok, custom diff)
- Mobilde üst/alt layout

**4 Python örneği:** assert vs print, sleep vs WebDriverWait, hardcoded veri vs fixture, genel except vs spesifik exception

#### StepAnimationBlock
- ▶ Oynat → adımlar 600ms aralıkla aktif olur, pulse animasyonu, tamamlanana ✅
- Herhangi adıma tıklayınca detay açılır, ↺ Tekrar butonu

**2 Python akışı:** pytest execution, Python import/sys.modules cache

#### InteractiveDiagramBlock
- SVG tabanlı tıklanabilir piramit
- Bilingual stats: `pick()` ile lokalize edilir — direkt render edilmez

**1 diyagram:** Test Pyramid (E2E → Integration → Unit)

**İlgili AC'ler:** AC 03, AC 08

---

## 🔄 Yapılması Gereken Geliştirmeler

### 5. Challenge & Görev Sistemi ← **SIRADA**
**Hedef:** Her konu başlığının sonuna 1 dakikalık mini görevler

**Dosyalar oluşturulacak:**
- `src/components/ChallengeBlock.jsx` — ana bileşen
- `src/components/challenges/MultipleChoice.jsx`
- `src/components/challenges/OrderSort.jsx`
- `src/components/challenges/FillBlank.jsx`
- `src/components/challenges/BugSpot.jsx`

**4 Görev Tipi:**

| Tip | Açıklama |
|-----|----------|
| `multiple-choice` | Çoktan seçmeli, yanlışta neden yanlış açıklanır |
| `order-sort` | Adımları doğru sıraya sürükle-bırak (native drag-and-drop API) |
| `fill-blank` | Kod içinde boşluğa doğru kelimeyi yaz |
| `bug-spot` | Hatalı satıra tıkla |

**Veri şeması:** Her variant için ayrı schema, tümü bilingual (tr/en), `xpReward` alanı var

**XP entegrasyonu:** `src/lib/xp.js` — markExerciseComplete ile tekrar XP yok

**UX:** Yanlışta shake animasyonu, doğruda XpStat.jsx'ten XP toast, zorluk rozeti (Kolay/Orta/Zor)

**Eklenecek içerik:**
- 6× multiple-choice (assert, fixture scope, parametrize, conftest, mark, exception)
- 3× order-sort (pytest sırası, inheritance, CI pipeline)
- 4× fill-blank (assert, fixture decorator, parametrize, with statement)
- 3× bug-spot (assert operatörü, fixture scope, exception)

**TopicPage.jsx'e eklenecek case:** `challenge`

**İlgili AC'ler:** AC 01, AC 02 (yanlış cevapta ekstra soru), AC 03, AC 07 (reset'te sıfırlanmalı)

> ⚠️ **AC 02 notu:** Challenge'da yanlış cevapta "bir defaya mahsus ekstra soru" mekanizması uygulanmalı. `ChallengeBlock` state'inde `extraQuestionShown` flag'i tutulacak.

---

### 6. Quiz Gatekeeping + Mülakat Erişim Bariyeri ← **YENİ**
**Hedef:** AC 04 gereği quiz başarı oranı %60'ın altındaysa mülakat sekmesi kilitli kalmalı

**Yapılacaklar:**
- Quiz tamamlanma ve başarı oranını hesaplayan `src/lib/progress.js` oluşturulacak
  - `getQuizSuccessRate(pageKey)` → 0–100 arası yüzde döner
  - `isInterviewUnlocked(pageKey)` → boolean
- Mülakat sekmesi kilitliyken: kilit ikonu + "Quiz'lerin %60'ını tamamla" açıklama metni
- Başarı oranı %60'a ulaşınca kilit kalkar, sekme erişilebilir olur

**localStorage key:** `learnqa_progress_python` — `{quizResults: {questionId: boolean}}`

**İlgili AC'ler:** AC 04

---

### 7. AI Destekli Quiz Açıklamaları ← **YENİ**
**Hedef:** AC 05 gereği "Cevabı Kontrol Et" sonrası "AI'dan Ek Açıklama İste" butonu

**Yapılacaklar:**
- `src/lib/ai.js` oluşturulacak — Anthropic API wrapper
  - `getQuizExplanation(question, userAnswer, correctAnswer, lang)` → string
  - `evaluateInterviewAnswer(question, userAnswer, lang)` → `{score, feedback, idealAnswer}`
- Quiz bileşenlerine "AI'dan Ek Açıklama İste" butonu eklenecek
- Yüklenirken skeleton/spinner gösterilecek
- Dil: sayfa diline göre otomatik (tr/en)

**Model:** `claude-sonnet-4-6`

**İlgili AC'ler:** AC 05, AC 06

---

### 8. Mülakat Sayfası — AI Değerlendirme Döngüsü ← **YENİ**
**Hedef:** AC 06 gereği kullanıcı cevabı AI tarafından değerlendirilmeli

**Yapılacaklar:**
- Her mülakat sorusunun altına text input alanı eklenecek
- Kullanıcı cevabı gönderdiğinde `ai.js → evaluateInterviewAnswer()` çağrılacak
- AI değerlendirmesi tamamlandıktan sonra ideal cevap gösterilecek
- En az 50 soru kontrolü: `pythonData.js` interview sekmesi kontrol edilecek, eksikse tamamlanacak
- AC 07 başarı hesabı bu cevaplara göre yapılacak

**İlgili AC'ler:** AC 04 (gatekeeping), AC 06, AC 07

---

### 9. Kurs Bitirme Rozeti ve Reset Mekanizması ← **YENİ**
**Hedef:** AC 07 gereği %80 başarıda rozet, altında reset seçeneği

**Yapılacaklar:**
- `src/lib/progress.js`'e şunlar eklenecek:
  - `getInterviewSuccessRate(pageKey)` → 0–100
  - `awardCompletionBadge(pageKey)` → localStorage'a yazar
  - `hardReset(pageKey)` → quiz cevapları + mülakat cevapları + completed listesi sıfırlar
- Başarı ≥ %80: konfeti animasyonu + "Bitirme Rozeti" gösterimi + rozet localStorage'a kaydedilir
- Başarı < %80: uyarı modalı → kullanıcı onaylarsa Reset butonu aktifleşir → hardReset() → ilk sekmeye yönlendir
- **XP sıfırlanmaz** (sadece quiz/mülakat state'leri sıfırlanır)

**İlgili AC'ler:** AC 07

---

### 10. Rozet Sistemi ← **GÜNCELLENDİ**
**Hedef:** Eylem ve konu bazlı rozetler + Bitirme Rozeti entegrasyonu

**Yapılacaklar:**
- `src/lib/xp.js`'e `getBadges()` ve `checkBadgeUnlock()` eklenecek
- `src/lib/progress.js`'teki `awardCompletionBadge()` ile entegre olacak

**Rozet tipleri:**

| Rozet | Koşul |
|-------|-------|
| 🐛 Bug Avcısı | 5 bug buldu (Manual Testing Lab) |
| ⚡ Kod Ustası | 10 playground egzersizi tamamladı |
| 🔥 7 Gün Streak | 7 gün üst üste giriş |
| 🏆 Python Ustası | Bitirme Rozeti — mülakat %80 başarı (AC 07) |
| 🎯 Mükemmeliyetçi | Tüm quiz'leri %100 doğru tamamladı |

- Rozet vitrini: kullanıcı profilinde sergileme
- Rozet kazanıldığında toast bildirimi

**İlgili AC'ler:** AC 07, AC 09

---

### 11. Tema / Renk Paleti Seçici ← **YENİ**
**Hedef:** AC 08 gereği kullanıcıya alternatif renk temaları sunulmalı

**Yapılacaklar:**
- `src/lib/theme.js` oluşturulacak — `getTheme()`, `setTheme(themeId)`
- localStorage key: `learnqa_theme`
- CSS custom property'ler üzerinden tema değişimi (`document.documentElement.style.setProperty`)
- En az 3 tema: Varsayılan (mevcut), Okyanus (mavi tonlar), Orman (yeşil tonlar)
- Tema seçici UI: ayarlar menüsü veya sayfanın köşesinde küçük palet ikonu

**İlgili AC'ler:** AC 08

---

### 12. AI Evaluator (Test Case Puanlayıcı)
- Kullanıcı test case yazar, AI puanlar
- Kriterler: expected result net mi, preconditions var mı, severity doğru mu, assertion yeterli mi
- `src/lib/ai.js` üzerinden çağrılacak (AC 05-06 ile aynı altyapı)

**İlgili AC'ler:** AC 05, AC 06

---

### 13. İlerleme Takibi ve Roadmap Görselleştirme ← **YENİ**
**Hedef:** AC 09 gereği kullanıcı ilerleme durumunu görmeli

**Yapılacaklar:**
- `src/components/ProgressBar.jsx` — sekme bazında tamamlanma yüzdesi
- `src/components/RoadmapView.jsx` — kariyer yolu checkpoint'leri
- `src/lib/progress.js` ile entegre — her sekmenin tamamlanma durumu

**İlgili AC'ler:** AC 09

---

### 14. Diğer Sayfalara Yayma
Tüm yukarıdaki özellikler şu an sadece Python sayfasında.
Python sayfası test edilip onaylandıktan sonra diğer sayfalara (Playwright, Selenium, API Testing, Postman, Java vb.) yayılacak.

Her sayfa için yapılacak tek şey:
- `[topic]Data.js`'e ilgili block type'ları ve içerikleri eklemek
- Bileşenler zaten mevcut, yeniden yazılmayacak
- `learnqa_xp_python` key'i `learnqa_xp_[topic]` olarak sayfa bazında ayrılacak

---

## Önemli Teknik Notlar

| Konu | Detay |
|------|-------|
| TypeScript | Projede yok — `.jsx` ve `.js` kullan |
| Animasyon | CSS keyframes + native API, dış kütüphane ekleme |
| Drag-and-drop | Native HTML5 API, dış kütüphane yok |
| Kod editörü | Dış kütüphane yok (Monaco, CodeMirror vb. yasak) |
| i18n | Tüm metinler `{ tr: '...', en: '...' }` formatında — `pick(lang, obj)` ile lokalize et |
| localStorage — XP | `learnqa_xp_python` — `{xp, completed}` |
| localStorage — Progress | `learnqa_progress_python` — `{quizResults: {}}` |
| localStorage — Theme | `learnqa_theme` — string (theme id) |
| XP kaynağı | `src/lib/xp.js` — tüm bileşenler buradan import eder |
| Progress kaynağı | `src/lib/progress.js` — quiz başarısı, gatekeeping, reset |
| AI kaynağı | `src/lib/ai.js` — Anthropic API wrapper, model: claude-sonnet-4-6 |
| Animasyon kaynağı | `src/components/XpStat.jsx` — tekrar yazma, import et |
| Block pattern | `TopicPage.jsx` switch/case — her yeni tip buraya eklenir |
| Circular import | `CodePlaygroundBlock` → `CodeBlock` from `TopicPage` — güvenli, render-time only |
| Bilingual stats | `{tr, en}` objeleri direkt render edilmez — `pick()` ile lokalize et (InteractiveDiagramBlock crash örneği) |
| Reset kapsamı | Quiz cevapları + mülakat cevapları + completed listesi sıfırlanır; **XP sıfırlanmaz** |