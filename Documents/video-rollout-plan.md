# Video-Scene (Film Bloğu) Yayılım Planı — Dalga 2

> **Tarih:** 2026-07-14 · **Branch:** `feature/llm-agents-interactive-pilot` devamı
> **Önkoşul:** Dalga 1 tamamlandı ve commit edildi (`509ea5a`) — `VideoSceneBlock`
> bileşeni + 5 film canlı (/llm-agents, /playwright, /docker, /sql, /claude-ai).
> Bileşen ve veri şemasının tek doğru referansı: `src/components/VideoSceneBlock.jsx`
> + `llmAgentsData.js` içindeki `ragPipelineFilm`. Ayrıca bkz. `PILOT_PLAN_ve_PROMPT.md`.
>
> **Kullanıcı hedefi:** "Mümkün olduğunca her sayfada video ve animasyon olsun."
> Bu dalga 6 sayfayı kapsar; kalan sayfalar Bölüm 6'daki backlog'da sıralanır.
> Canlı ilerleme durumu bu dosyada DEĞİL, `.claude/NEXT_SESSION.md`'de tutulur.

---

## 1. Yapısal Keşif — Kritik Bulgu

Hedef 6 sayfanın İKİSİ TopicPage kullanmıyor. `video-scene` bloğu şu an sadece
`TopicPage.jsx` `renderBlock`'unda kayıtlı olduğundan, özel sayfalarda ekstra
(ama küçük) bir entegrasyon adımı gerekir:

| Sayfa | Yapı | Veri dosyası | Entegrasyon |
|---|---|---|---|
| `/git-github` | ✅ TopicPage | `gitGithubData.js` (EN+TR ayrı sections) | Sadece veri ekle |
| `/linux` | ✅ TopicPage | `linuxData.js` (EN+TR ayrı sections) | Sadece veri ekle |
| `/docker` | ✅ TopicPage | `dockerData.js` (EN+TR ayrı; 1 film zaten var) | Sadece veri ekle (2. film) |
| `/algorithms` | ❌ ÖZEL sayfa | `beginnerAlgorithmsData.js` (`[language].lessons`) | `AlgorithmsPage.jsx`'e 1 satır render + veri |
| `/manual-testing` | ❌ ÖZEL sayfa | `manualTestingData.js` (`[language].lessons`) | `ManualTestingPage.jsx`'e 1 satır render + veri |
| `/gauge` | ✅ TopicPage | `gaugeData.js` (**tek ağaç, bilingual field'lar** — EN/TR ayrımı YOK) | Sadece veri ekle (tek yere) |

**Özel sayfa entegrasyon kalıbı (mimari karar):** `VideoSceneBlock` kendi
kendine yeten bir bileşendir (`block`, `darkMode`, `language` prop'ları dışında
bağımlılığı yok; XP'yi URL path'inden türeyen topic key ile `lib/xp.js`
üzerinden kendisi halleder). Bu yüzden özel sayfalara TopicPage taşımak YERİNE:

1. İlgili lesson verisine opsiyonel **`film`** alanı eklenir (film objesi,
   bilingual olduğu için tek sabit TR+EN ağaçlarının ikisine de aynı referansla konur).
2. Sayfa bileşeninde lesson gövdesi render edilirken tek satır eklenir:
   ```jsx
   {lesson.film && <VideoSceneBlock block={lesson.film} darkMode={darkMode} language={language} />}
   ```
   Bu, veri-güdümlü mimariyi korur: ileride başka bir lesson'a film eklemek
   yine sadece veri işi olur.

---

## 2. Film Spesifikasyonları (6 film)

Ortak zorunluluklar (Dalga 1 ile aynı): 5-8 sahne · `caption: {tr,en}` zorunlu ·
`id` benzersiz (XP tekilliği) · `xpReward` 10-15 · `sceneDurationMs: 3400` ·
aktör hareketi veri akışını GÖSTERMELİ (süs değil) · TR caption'larda teknik
terimler İngilizce kalır, açıklama cümleleri Türkçe (CLAUDE.md §8) · `code`
alanı `{tr,en}` bilingual, TR tarafındaki yorumlar Türkçe · film konu
anlatımının İÇİNE, quiz/challenge/lab'dan ÖNCE konur (CLAUDE.md §9.1).

### 2.1 `/git-github` — "🎬 Bir Commit'in Yolculuğu"
- **id:** `git-commit-journey-film` · xp 15
- **Yerleşim:** "⌨️ Git Temelleri: status, add, commit, diff, log" sekmesi
  (EN ~satır 1563, TR ~3923) — status/add/commit anlatan kod bloğunun ardına.
- **Aktörler:** 📝 Working Directory'deki dosya · 🎬 Staging Area · 📦 Commit
  (snapshot) · 🗄️ Local Repo (.git) · ☁️ Remote (GitHub) · 👻 Untracked dosya ·
  🏷️ HEAD işaretçisi
- **Sahne akışı (7):** dosya düzenlenir (working dir'de kırmızı) → `git status`
  farkı gösterir → `git add` dosyayı staging'e taşır (untracked hayalet geride
  kalır — .gitignore bağlantısı) → `git commit` staging'i snapshot'a dondurur →
  commit local repo zincirine eklenir, HEAD ilerler → `git push` zinciri
  remote'a kopyalar → final: "üç bölge" özeti — working/staging/repo ayrımının
  QA'de neden kritik olduğu (yarım işi commit'lememe).

### 2.2 `/linux` — "🎬 Bir Pipe Zincirinin Yolculuğu"
- **id:** `linux-pipe-chain-film` · xp 15
- **Yerleşim:** "📝 Text & Pipes / Metin İşleme & Pipe'lar" sekmesi
  (EN ~905, TR ~2241) — pipe anlatan kod bloğunun ardına.
- **Aktörler:** 📄 test.log (10.000 satır) · 🔍 grep ERROR · 📉 Filtrelenmiş
  satırlar · 🔀 sort · 🧮 uniq -c · 📊 Sonuç (hata özeti) · 💾 > rapor.txt
- **Sahne akışı (7):** QA senaryosu — CI koşumundan devasa log düştü → `cat
  test.log` her şeyi akıtır (işe yaramaz) → `| grep ERROR` sadece hata
  satırlarını geçirir (pipe = veri borusu) → `| sort` aynı hataları yan yana
  getirir → `| uniq -c` tekrar sayısını çıkarır → `> rapor.txt` çıktıyı dosyaya
  yönlendirir → final: tek satırlık zincir = beş ayrı programın işbirliği; her
  program tek iş yapar, pipe onları bağlar (Unix felsefesi + Java Stream API
  analojisi: `stream().filter().sorted().collect()`).

### 2.3 `/docker` — "🎬 docker compose up: Servislerin Uyanışı" (sayfanın 2. filmi)
- **id:** `docker-compose-startup-film` · xp 12
- **Yerleşim:** "🧩 Docker Compose" sekmesi (EN ~1699, TR ~3772) —
  compose.yml kod bloğunun ardına. (Dockerfile sekmesindeki mevcut
  `docker-dockerfile-to-container-film` ile karışmaz; farklı sekme, farklı id.)
- **Aktörler:** 📜 compose.yml · 🌐 Network · 🗄️ db container · 🩺 Healthcheck ·
  🚀 app container · 🧪 test-runner container · 💥 Flaky FAIL (hayalet)
- **Sahne akışı (7):** `docker compose up` okunur → önce network kurulur (tüm
  servislerin ortak sokağı) → db başlar ama HAZIR DEĞİL (starting) → healthcheck
  db'yi yoklar, healthy olana kadar bekler → `depends_on: condition:
  service_healthy` sayesinde app ancak ŞİMDİ başlar → test-runner en son kalkar,
  testler yeşil → final (kontrast sahnesi): healthcheck OLMASAYDI test-runner
  db hazır olmadan başlar, "connection refused" ile flaky FAIL — Dockerfile
  sekmesindeki simple-box'un anlattığı kabusun görsel kanıtı.

### 2.4 `/algorithms` — "🎬 Linear Search: Kayıp Değeri Bulmak" (ÖZEL sayfa)
- **id:** `algorithms-linear-search-film` · xp 12
- **Yerleşim:** `beginnerAlgorithmsData.js` → `loop` dersi (TR ~649 civarı EN
  ağacında; TR ağacındaki karşılığına da aynı sabit) — döngü dersinin somut,
  gerçek-algoritma uygulaması olarak. `AlgorithmsPage.jsx`'e Bölüm 1'deki tek
  satırlık `lesson.film` render'ı eklenir.
- **Aktörler:** 🎯 Aranan değer (42) · 📦×5 Dizi elemanları (kutu 0..4) · 👆
  İmleç (döngü değişkeni i) · ❌ Eşleşmedi · ✅ Bulundu (index 3) · 🔁 Döngü sayacı
- **Sahne akışı (7):** problem tanıtımı (dizide 42'yi bul; dizi: [7, 19, 3, 42,
  88]) → i=0: imleç ilk kutuya, 7 ≠ 42, kutu soluklaşır → i=1: 19 ≠ 42 → i=2:
  3 ≠ 42 (sabır = döngünün işi; koşul her adımda tekrar kontrol edilir — loop
  dersinin `checkEachTime` maddesiyle birebir bağ) → i=3: 42 == 42, kutu yeşil
  parlar, döngü `break` ile durur → kalan kutuya HİÇ bakılmadı (erken çıkışın
  değeri) → final: en kötü durumda N adım = O(n); "dizi 1 milyon elemanlıysa?"
  sorusuyla advanced-algorithms sayfasına (binary search) köprü.

### 2.5 `/manual-testing` — "🎬 Bir Bug'ın Yaşam Döngüsü" (ÖZEL sayfa)
- **id:** `manual-bug-lifecycle-film` · xp 12
- **Yerleşim:** `manualTestingData.js` → `bug-report` dersi (id TR 217 / EN 619
  civarı; iki dile aynı sabit) — bug raporu yazımı anlatıldıktan sonra raporun
  BAŞINA ne geldiğini gösterir. `ManualTestingPage.jsx`'e tek satırlık
  `lesson.film` render'ı eklenir.
- **Aktörler:** 🔍 Tester (keşif) · 📝 Bug Raporu (New) · 🗂️ Triage (önceliklendirme) ·
  👨‍💻 Developer (In Progress) · 🔧 Fix (Resolved) · 🧪 Retest · ✅ Closed · 🔁 Reopened (hayalet)
- **Sahne akışı (8):** keşif — tester ödeme sayfasında hatayı bulur → rapor
  yazılır (New durumu; iyi raporun 3 bileşeni: adımlar+beklenen+gerçekleşen) →
  triage: severity/priority'ye göre sıraya girer → developer alır (In Progress)
  → fix gelir (Resolved — ama bug henüz KAPANMADI) → retest: tester AYNI
  adımlarla doğrular → geçtiyse Closed, konfeti → final (kontrast): retest
  geçmezse Reopened — "developer çözdüm dedi" ile "gerçekten çözüldü" arasındaki
  farkı yalnızca tester'ın retest'i kanıtlar; bug'ı kapatan kod değil, testtir.

### 2.6 `/gauge` — "🎬 gauge run: Bir Spec'in Koşum Zinciri"
- **id:** `gauge-run-chain-film` · xp 15
- **Yerleşim:** `gaugeData.js` → "📝 Spec & Step Temelleri" bölümü (~612) —
  spec anatomisi + @Step anlatımından sonra, quiz'lerden önce. **DİKKAT:**
  gaugeData tek ağaçtır (bilingual field'lar), film SADECE BİR YERE eklenir —
  gitGithub/linux'taki gibi iki kez eklemeye kalkma.
- **Aktörler:** 📄 login.spec (Markdown) · 🔎 Parser · 🗂️ Step Registry · ☕ Java
  @Step implementasyonu · 🌐 WebDriver/Browser · 📊 HTML Rapor · 👻 Unimplemented
  Step (hayalet)
- **Sahne akışı (7):** `gauge run specs/` → parser Markdown spec'i okur, step
  cümlelerini çıkarır → her cümle step registry'de aranır (metin ↔ @Step
  anotasyonu eşleşmesi — Cucumber regex'inden farkı) → eşleşen Java metodu
  çalışır → metod WebDriver'ı sürer, browser'da gerçek aksiyon → sonuç HTML
  rapora yazılır → final (kontrast): registry'de karşılığı OLMAYAN cümle
  hayalete gider — "unimplemented step" hatasının mekanizması; spec yazarı ile
  step yazarının sözleşmesi.

---

## 3. İş Bölümü

| Kim | Ne | Neden |
|---|---|---|
| **Fable** | (a) `AlgorithmsPage.jsx` + `ManualTestingPage.jsx` özel-sayfa entegrasyonu (import + `lesson.film` render satırı), (b) bu iki sayfanın film verileri (2.4, 2.5), (c) doğrulama | Bileşen/sayfa koduna dokunan tek iş paketi bu; riskli kısım tek elde kalsın |
| **Sonnet** | 4 TopicPage filmi: git-github (2.1), linux (2.2), docker-compose (2.3), gauge (2.6) + `tests/video-scene.spec.ts`'e hafif render kontrolleri + `NEXT_SESSION.md` | Saf veri işi; Dalga 1'de aynı işi başarıyla yaptı |

Sıra önerisi: önce Fable paketi (entegrasyon kalıbı kurulup doğrulanır), sonra
Sonnet paketi. Aynı dosyada iki aracın eş zamanlı çalışması YASAK
(promptkurallar.md §8) — paketler dosya bazında ayrıktır, çakışma yok.

---

## 4. SONNET PROMPT (Dalga 2 — kopyala-yapıştır)

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Önce CLAUDE.md'yi ve .claude/NEXT_SESSION.md'yi oku (oturum protokolü).
Sonra Documents/video-rollout-plan.md'yi oku — bu görev o planın "Sonnet"
payıdır (Bölüm 3). Veri şemasının tek doğru referansı:
src/components/VideoSceneBlock.jsx + llmAgentsData.js'teki ragPipelineFilm.

## GÖREV A — 4 film verisi (SADECE *Data.js dosyalarına veri ekle,
bileşene ve sayfa component'lerine DOKUNMA). Her filmin spesifikasyonu
(id, aktörler, sahne akışı, yerleşim noktası) planın Bölüm 2'sinde HAZIR —
uydurma, oradakini uygula:
1. gitGithubData.js → 2.1 "Bir Commit'in Yolculuğu"
   (EN ve TR sections AYRI — paylaşılan sabiti İKİSİNE de ekle)
2. linuxData.js → 2.2 "Bir Pipe Zincirinin Yolculuğu" (EN+TR iki yer)
3. dockerData.js → 2.3 "docker compose up: Servislerin Uyanışı"
   (sayfada zaten dockerfileToContainerFilm var — ona DOKUNMA, bu ayrı
   bir film, Compose sekmesine gider; EN+TR iki yer)
4. gaugeData.js → 2.6 "gauge run: Bir Spec'in Koşum Zinciri"
   (DİKKAT: gaugeData TEK ağaç, bilingual field'lı — film SADECE BİR yere)

## GÖREV B — tests/video-scene.spec.ts'i genişlet
Mevcut pilot testine dokunmadan, yeni bir test ekle: /git-github, /linux,
/docker (Compose sekmesi) ve /gauge sayfalarında ilgili sekmeye tıklayınca
video-scene-block'un görünür olduğunu doğrula. Docker'da Compose sekmesinde
İKİ değil BİR film olduğuna dikkat (Dockerfile sekmesindeki ayrı).
/basit-backend, /security, /backend'i EKLEME (CLAUDE.md §22.1).

## GÖREV C — .claude/NEXT_SESSION.md'deki Dalga 2 tablosunu güncelle.

## BİTİRMEDEN ÖNCE (CLAUDE.md §1.1 — atlanamaz):
1. node scripts/check-content-integrity.mjs → sıfır ihlal
2. Her caption/code'un TR tarafını tek tek oku — İngilizce açıklama
   cümlesi kalmasın (teknik terimler İngilizce KALIR)
3. npm run build → hatasız
4. npx playwright test tests/video-scene.spec.ts → geçiyor
Doğrulanmadan "tamamlandı" deme.
```

---

## 5. Kontrol Listesi — Dalga 2 Bitince

```
[ ] AlgorithmsPage + ManualTestingPage lesson.film entegrasyonu (Fable)
[ ] algorithms-linear-search-film + manual-bug-lifecycle-film canlı (Fable)
[ ] git/linux/docker-compose/gauge filmleri canlı (Sonnet)
[ ] tests/video-scene.spec.ts genişletildi ve geçiyor
[ ] Her filmde: TR/EN geçişi, pip seek, done rozeti + XP çalışıyor
[ ] 380px mobil taşma kontrolü (en az 1 TopicPage + 1 özel sayfa)
[ ] check-content-integrity + npm run build temiz
[ ] NEXT_SESSION.md Dalga 2 tablosu güncel
```

---

## 6. Dalga 3+ Backlog — "Her Sayfada Video" Uzun Vadeli Hedefi

Video-scene henüz olmayan içerik sayfaları (öncelik: trafik + filmin konuya
katacağı görsel değer). Her biri tek başına bir "sadece veri ekle" işi:

| Sayfa | Aday film konusu |
|---|---|
| `/selenium` | WebDriver komutunun yolculuğu: kod → JSON Wire/W3C → driver → browser |
| `/cypress` | Cypress mimarisi: browser İÇİNDE koşan test vs Selenium'un dışarıdan sürmesi |
| `/python` | pytest fixture çözümleme zinciri (conftest → fixture → test → teardown) |
| `/typescript` | tsc derleme yolculuğu: .ts → tip kontrolü → hata/emit → .js |
| `/javascript` | Event loop filmi: call stack → Web API → task queue → render |
| `/java` | JVM yolculuğu: .java → javac → bytecode → class loader → JIT |
| `/jenkins` | Pipeline koşumu: webhook → agent → stage'ler → post/rapor |
| `/kubernetes` | Pod'un doğuşu: kubectl apply → API server → scheduler → kubelet |
| `/kafka` | Bir mesajın yolculuğu: producer → partition → offset → consumer group |
| `/postman` | Collection runner akışı: env → pre-request → istek → test script |
| `/rest-assured` | given/when/then zincirinin HTTP'ye dönüşümü |
| `/jmeter` | Load testin anatomisi: thread group → sampler → listener → rapor |
| `/appium` | Mobil komutun yolculuğu: test → Appium server → driver → cihaz |
| `/what-is-testing` | Bir gereksinimin test senaryosuna dönüşümü (V-model akışı) |
| `/advanced-algorithms` | Binary search filmi (linear search filminin devamı — 2.4 finalindeki köprü) |

Kapsam dışı (kalıcı): `/basit-backend`, `/security`, `/backend` (CLAUDE.md §22.1).
Bu backlog'dan hangilerinin yapıldığı `NEXT_SESSION.md`'de işaretlenir.
