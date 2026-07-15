# Video-Scene (Film Bloğu) Yayılım Planı — Dalga 2 + Dalga 3 (Pilot Derinleştirme)

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

---

## 7. DALGA 3 — Pilot Derinleştirme: `/git-github` + `/gauge` (2026-07-15)

> **Kullanıcı hedefi:** git-github ve gauge pilot sayfa seçildi. Bu iki sayfada
> (1) her dikey sekmede en az 1 video + 1 animasyon, (2) her sekmede en az 1
> sandbox, (3) uzun vadede her öğretilen konudan sonra hem animasyon hem video.
> Dalga 3, (1) ve (2)'yi ZORUNLU tamamlar; (3) "Katman 2" olarak Bölüm 7.5'te
> ayrı bir dalgaya bırakılır (gerekçe orada).

### 7.1 Tanımlar (bu plan boyunca bağlayıcı)

- **Video** = `video-scene` bloğu (VideoSceneBlock filmi). Başka hiçbir blok
  video sayılmaz.
- **Animasyon** = `step-animation` | `simulation` | `animated-timeline` |
  `css-animation`. (CLAUDE.md §9.1 animasyon tanımıyla uyumlu; git-github'daki
  zengin `simulation` blokları animasyon SAYILIR.)
- **Sandbox** = kullanıcı girdisi alan + sonucu değerlendiren interaktif blok:
  `code-playground` | `git-practice` | `editor` | `java-practice`.
  `simulation` sandbox SAYILMAZ (izleme ağırlıklı, girdi değerlendirmez).
- **Auto-fill uyarısı:** `fillMissingCodeTrios` (interactiveTrioFillers.js)
  SADECE `type: 'code'` bloğu olan ve dili bash/shell/text OLMAYAN yerlere
  otomatik playground/step/order üretir. Kodsuz sekmelere (ör. hata sözlüğü,
  mülakat) hiçbir şey üretmez — oralara blok ELLE yazılır ve elle yazılan her
  `code-playground`'a `relatedTopicId` ZORUNLUDUR (CLAUDE.md §9.4;
  check-content-integrity.mjs kaynak metinde arar, auto bloklar muaftır).

### 7.2 Envanter — eksik matrisi (2026-07-15 tespiti)

**`/gauge` (8 sekme, TEK ağaç):** her sekmede video ✓ + animasyon ✓ (commit
`d97cc16` ile tamamlandı). Eksik SADECE sandbox, 3 sekmede (bu sekmelerde
`code` bloğu olmadığı için auto-fill devreye giremiyor):

| Gauge sekmesi | Video | Animasyon | Sandbox |
|---|---|---|---|
| 🏠 Neden Gauge? | ✅ | ✅ | ❌ **EKSİK** |
| ⚙️ Kurulum | ✅ | ✅ | ✅ (auto) |
| 📝 Spec & Step | ✅ | ✅ | ✅ (auto) |
| 🎯 By Locator | ✅ | ✅ | ✅ (auto) |
| 🗂️ JSON Depo | ✅ | ✅ | ✅ (auto) |
| 🌍 Ekosistem & CI/CD | ✅ | ✅ | ✅ (auto) |
| 🚨 Gerçek Hayat | ✅ | ✅ | ❌ **EKSİK** |
| 💼 Mülakat | ✅ | ✅ | ❌ **EKSİK** |

**`/git-github` (14 sekme, EN+TR AYRI sections — her blok sabiti İKİ ağaca da
konur):** animasyon ve sandbox tarafı güçlü (simulation + git-practice zengin),
asıl açık VIDEO — 14 sekmenin 13'ünde film yok:

| git-github sekmesi | Video | Animasyon | Sandbox |
|---|---|---|---|
| 🎯 Giriş (What are Git/GitHub) | ❌ | ✅ sim×3 | ✅ git-practice |
| ⚙️ Kurulum | ❌ | ✅ sim×6 | ✅ git-practice×2 |
| ⌨️ Git Temelleri | ✅ (`git-commit-journey-film`) | ✅ | ✅ |
| 🚫 .gitignore | ❌ | ✅ sim×2 | ✅ git-practice×3 |
| 🌿 Branch & Switch | ❌ | ✅ step×3 | ✅ playground×3 |
| 🔀 Merge & Conflict | ❌ | ✅ | ✅ |
| 🧬 Rebase & İleri Akış | ❌ | ✅ step×2 | ✅ |
| 🐙 GitHub Akışı | ❌ | ✅ sim×1 | ✅ git-practice |
| 🧾 Pull Request | ❌ | ✅ sim×2 | ✅ git-practice×3 |
| 🚀 Actions | ❌ | ✅ | ✅ |
| 🌐 Pages | ❌ | ✅ | ✅ |
| ⚠️ İş Riskleri | ❌ | ✅ | ✅ |
| 🚨 Hata Sözlüğü | ❌ | ❌ **EKSİK** | ❌ **EKSİK** |
| 💼 Mülakat | ❌ | ❌ **EKSİK** | ❌ **EKSİK** |

**Toplam Dalga 3 işi:** 13 git-github filmi + 2 git-github animasyonu +
2 git-github sandbox'ı + 3 gauge sandbox'ı.

### 7.3 İş Bölümü

| Kim | Ne |
|---|---|
| **Fable** ✅ (bu oturumda kodlandı) | (a) gauge 3 sandbox (🏠/🚨/💼), (b) git-github 🚨 Hata Sözlüğü TAM paketi (film + step-animation + sandbox), (c) git-github 💼 Mülakat TAM paketi (film + step-animation + sandbox) — iki sekmeyi %100'e çekip Sonnet'e birebir referans örnek bırakır |
| **Sonnet Prompt A** (Bölüm 8) | git-github 6 film: 🎯 Giriş, ⚙️ Kurulum, 🚫 .gitignore, 🌿 Branch, 🔀 Merge, 🧬 Rebase |
| **Sonnet Prompt B** (Bölüm 9) | git-github 5 film: 🐙 GitHub Akışı, 🧾 PR, 🚀 Actions, 🌐 Pages, ⚠️ Riskler + `tests/video-scene.spec.ts` genişletme + `NEXT_SESSION.md` |

Sıra: Fable ✅ → Prompt A → Prompt B. Aynı dosyada eş zamanlı iki araç YASAK
(promptkurallar.md) — A ve B'yi AYNI ANDA çalıştırma, ikisi de
`gitGithubData.js`'e dokunuyor.

### 7.4 Film Spesifikasyonları — Sonnet'in 11 filmi

Ortak kurallar Bölüm 2 girişindeki ile AYNI (5-8 sahne, bilingual caption/code,
benzersiz id, xp 12-15, `sceneDurationMs: 3400`, TR'de teknik terim İngilizce).
gitGithub kalıbı: film sabiti dosyanın BAŞINDA tanımlanır (mevcut
`commitJourneyFilm` gibi), EN ve TR section'larının İKİSİNE de aynı referans
konur. Yerleşim: sekmenin ana konu anlatımının (kod bloğu/simulation)
ardına, quiz/challenge'dan ÖNCE (CLAUDE.md §9.1).

**A1. 🎯 Giriş — `git-version-chaos-film` (xp 12)**
- Aktörler: 📁 rapor_final.zip · 📁 rapor_final_v2_SON.zip · 😱 Kaybolan emek ·
  📸 Git snapshot zinciri · 🏷️ HEAD · ☁️ GitHub · 👥 Takım
- Akış (7): versiyonsuz dünya — dosya kopyalarıyla kaos → yanlış dosyada
  çalışıldı, emek kayboldu (kontrast) → `git init` ile zaman makinesi kurulur →
  her commit bir snapshot, zincir büyür → HEAD istenen ana götürür (geri dönüş
  güvenliği) → GitHub = zincirin buluttaki kopyası + işbirliği katmanı → final:
  Git ≠ GitHub ayrımı (motor vs showroom) + QA bağı (test kodu da koddur,
  versiyonsuz test reposu = kanıtsız QA).

**A2. ⚙️ Kurulum — `git-identity-config-film` (xp 12)**
- Aktörler: 💻 Yeni makine · 📦 Git installer · 🪪 user.name/user.email ·
  🗂️ Config katmanları (system→global→local) · ✍️ İlk commit · ❓ Kimliksiz
  commit (hayalet)
- Akış (7): temiz makineye kurulum → `git --version` doğrulaması → kimlik
  ayarı: `git config --global user.name/email` → config'in 3 katmanı ve
  öncelik sırası (local > global > system) → ilk commit'te kimlik damgalanır →
  kontrast: kimlik ayarlanmasaydı commit'ler "unknown" düşer, blame/audit
  çöker → final: QA bağı — kim hangi testi değiştirdi sorusunun cevabı config'te
  başlar.

**A3. 🚫 .gitignore — `gitignore-filter-film` (xp 12)**
- Aktörler: 📸 screenshots/ · 🎥 videos/ · 🔑 .env · 📄 test-results/ ·
  🛡️ .gitignore filtresi · 🎬 Staging · 💥 Sızan secret (hayalet)
- Akış (7): test koşumu bitti — ekran görüntüleri, videolar, raporlar, .env
  üretildi → `git add .` hepsini staging'e süpürmek üzere → .gitignore filtresi
  devreye girer: eşleşen path'ler kapıda döner → sadece kaynak kod staging'e
  geçer → kural anatomisi (`*.png`, `node_modules/`, `!keep.png` istisnası) →
  kontrast: filtre OLMASAYDI .env remote'a çıkar — API key artık herkese açık,
  rotasyon + incident → final: ignore SONRADAN eklemek yetmez, cache'ten
  çıkarma gerekir (`git rm --cached`).

**A4. 🌿 Branch — `git-branch-parallel-film` (xp 15)**
- Aktörler: 🌳 main zinciri · 🌿 feature/login-tests · 🏷️ HEAD · 📦 Dal
  commit'leri · 📥 stash rafı · 🔀 switch
- Akış (7): main'de stabil zincir → `git branch feature/login-tests` sadece
  yeni bir işaretçi yaratır (kopya DEĞİL — ucuzluğun sırrı) → `git switch` ile
  HEAD dala geçer → dalda commit'ler birikir, main KIRLENMEZ → acil işte yarım
  iş `git stash` rafına kalkar, main'e temiz dönülür → stash pop ile iş geri
  gelir → final: dal = paralel evren; QA bağı — riskli locator refactor'ü
  main'deki yeşil suite'i bozmadan dalda denenir.

**A5. 🔀 Merge — `git-merge-two-faces-film` (xp 15)**
- Aktörler: 🌳 main · 🌿 feature dalı · ⏩ Fast-forward oku · 🔗 Merge commit ·
  ⚔️ Conflict marker'ları · 🧑‍⚖️ İnsan kararı
- Akış (7): senaryo 1 — main hiç ilerlememiş: merge = fast-forward, işaretçi
  öne kayar, YENİ commit yok → senaryo 2 — iki dal da ilerlemiş: ortak ata
  bulunur, 3-yönlü merge → aynı dosyanın FARKLI satırları: Git otomatik
  birleştirir → AYNI satırlar: `<<<<<<<`/`=======`/`>>>>>>>` ile durur →
  insan doğru içeriği seçer, marker'ları siler, `git add` + `git commit` →
  merge commit'in 2 ebeveyni vardır (tarih birleşmeyi hatırlar) → final:
  conflict bir HATA değil, Git'in "iki doğrudan birini sen seç" demesi —
  panik yerine prosedür.

**A6. 🧬 Rebase — `git-rebase-replay-film` (xp 15)**
- Aktörler: 🌳 main (ilerlemiş) · 🌿 feature commit'leri (C1, C2) · 🔁 Replay
  mekanizması · 🆕 C1', C2' (yeni hash) · 📜 Doğrusal tarih · 💥 Paylaşılan
  dalda rebase (hayalet)
- Akış (7): feature dalı eski main'den ayrılmış, main ilerlemiş → merge yerine
  rebase seçilir → C1 kopyalanıp main'in ucuna yeniden uygulanır → C1' oluşur:
  İÇERİK aynı, HASH FARKLI (kimlik değişti!) → C2 → C2' aynı şekilde → sonuç:
  dümdüz doğrusal tarih, merge commit yok → kontrast: push edilmiş paylaşılan
  dalda rebase = takım arkadaşlarının referansları çöp olur, "asla paylaşılanı
  rebase etme" kuralının mekanizması → final: merge tarihi KORUR, rebase
  tarihi YENİDEN YAZAR — ekip sözleşmesi hangisiyse o.

**B1. 🐙 GitHub Akışı — `git-remote-sync-film` (xp 12)**
- Aktörler: 🗄️ Local repo · ☁️ origin (GitHub) · 📤 push · 📥 fetch ·
  🔀 pull (fetch+merge) · 🏷️ origin/main işaretçisi · 👥 Takım commit'i
- Akış (7): `git remote add origin` — local zincire uzak adres tanıtılır →
  push: local commit'ler buluta kopyalanır → takım arkadaşı da push'lar; local
  artık GERİDE ama bunu BİLMİYOR → fetch: uzaktaki yenilik indirilir ama
  working tree'ye DOKUNULMAZ (origin/main işaretçisi ilerler) → pull =
  fetch + merge tek adımda → final: origin/main = "uzaktaki main'in son
  bilinen fotoğrafı"; QA bağı — sabah ilk iş `git pull`, akşam son iş
  `git push` ritmi merge cehennemini önler.

**B2. 🧾 Pull Request — `github-pr-lifecycle-film` (xp 15)**
- Aktörler: 🌿 feature dalı · 📬 PR · 🤖 CI check'leri · 👀 Reviewer ·
  🔧 Düzeltme commit'i · ✅ Approve · 🔀 Merge butonu
- Akış (7): dal push'lanır, PR açılır (başlık + açıklama + diff) → CI otomatik
  koşar — kırmızıysa review'a gerek kalmadan geri döner → reviewer diff'i okur,
  satıra yorum bırakır, "Request changes" → yazar düzeltme commit'i push'lar,
  PR OTOMATİK güncellenir (yeni PR gerekmez!) → approve gelir, check'ler
  yeşil → merge (squash/merge/rebase seçenekleri bir cümleyle) → final: PR bir
  kalite kapısıdır — kod + test kanıtı + insan onayı aynı kapıdan geçer;
  QA bağı — test kodu da PR'sız main'e girmez.

**B3. 🚀 Actions — `github-actions-trigger-film` (xp 15)**
- Aktörler: 📤 push event · 📄 workflow.yml · 🖥️ Runner (ubuntu-latest) ·
  📦 checkout+setup adımları · 🧪 Test adımı · 📊 Artifact/rapor · ❌/✅ Status
  check
- Akış (7): push gelir — GitHub event üretir → `.github/workflows/*.yml`
  dosyaları taranır, `on: push` eşleşir → taze runner VM ayağa kalkar (her
  koşumda SIFIRDAN — "bende çalışıyor"un panzehiri) → adımlar sırayla:
  checkout → setup-node → install → test → testler kırmızıysa adım zinciri
  durur, commit'e ❌ düşer → yeşilse artifact (rapor) yüklenir, ✅ status →
  final: CI = her push'ta tarafsız bir robotun testleri TEMİZ ortamda
  koşması; PR sekmesindeki "checks" işte bu filmin çıktısı.

**B4. 🌐 Pages — `github-pages-deploy-film` (xp 12)**
- Aktörler: 📦 dist/ build çıktısı · 🤖 Actions deploy job'u · 🗜️ Artifact ·
  🌍 Pages CDN · 🔗 Custom domain (DNS) · 👻 404 (SPA fallback hayaleti)
- Akış (7): `npm run build` → dist/ üretilir → deploy job artifact'i paketler
  → Pages CDN'e yayılır, site URL'de canlı → custom domain: DNS CNAME kaydı
  URL'yi güzelleştirir → kontrast: SPA'da kullanıcı `/selenium`'u DOĞRUDAN
  açar — sunucuda öyle bir dosya YOK, 404 → çözüm: 404.html fallback +
  statik shell'ler (bu projenin gerçek mimarisi!) → final: GitHub Pages
  server-side redirect bilmez; SPA yayınlıyorsan fallback stratejisi zorunlu.

**B5. ⚠️ İş Riskleri — `git-force-push-rescue-film` (xp 15)**
- Aktörler: 💻 Senin local'in (eski) · ☁️ origin/main (takımın 3 yeni
  commit'i) · 💥 `push --force` · 😱 Ezilen commit'ler · 🧾 reflog ·
  🛟 `--force-with-lease`
- Akış (7): local'in geride, push reddedildi (non-fast-forward) → yanlış
  refleks: `git push --force` → takımın 3 commit'i remote'tan SİLİNDİ
  (görsel: commit'ler uçuruma düşer) → panik — ama Git unutmaz: `git reflog`
  eski ucu gösterir → `git reset --hard <hash>` + normal push ile kurtarma →
  doğru araç: `--force-with-lease` — "uzak, benim bildiğim durumdaysa zorla"
  (kilitli emniyet) → final: force push bir silah değil neşterdir; korunan
  main + PR akışı (bu sekmenin diğer konuları) tam da bu kazayı engellemek
  için var.

### 7.5 Katman 2 — "Her konudan sonra animasyon + video" (Dalga 4 adayı, BU dalgada YAPILMAZ)

Kullanıcının 3. hedefi (her öğretilen atomik konudan sonra hem animasyon hem
video) bu iki sayfada ~40+ ek film demektir (git-github'da sekme başına 3-8
kod bloğu var). Bu dalgada YAPILMAMASININ gerekçesi: (a) `gitGithubData.js`
zaten ~6.000 satır, 13 film ~+2.000 satır ekleyecek — chunk boyutu ve sayfa
yükü ölçülmeden 40 film daha eklemek performans riski; (b) CLAUDE.md §9.1
"odak dışına çıkma" — her kod bloğu sonrası zorunlu film, sekmeyi izleme
maratonuna çevirebilir; önce Katman 1'in kullanıcı deneyimi görülmeli.
Katman 1 bitince: sekme başına EN UZUN anlatımlı 1-2 ek konuya film+animasyon
eklenerek kademeli yoğunlaştırma yapılır (aday liste o gün envanterden çıkarılır).

---

## 8. SONNET PROMPT A — git-github ilk 6 film (kopyala-yapıştır)

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Önce CLAUDE.md'yi ve .claude/NEXT_SESSION.md'yi oku (oturum protokolü).
Sonra Documents/video-rollout-plan.md Bölüm 7'yi oku — bu görev o planın
"Sonnet Prompt A" payıdır (Bölüm 7.3). Veri şemasının tek doğru referansı:
src/components/VideoSceneBlock.jsx + gitGithubData.js'in başındaki mevcut
film sabitleri (commitJourneyFilm, gitErrorDiagnosisFilm).

## GÖREV — 6 film verisi (SADECE src/data/gitGithubData.js'e veri ekle;
bileşene, sayfa component'lerine, başka data dosyasına DOKUNMA).
Her filmin spesifikasyonu (id, xp, aktörler, sahne akışı, yerleşim) planın
Bölüm 7.4'ünde HAZIR — uydurma, oradakini uygula:
1. A1 git-version-chaos-film      → 🎯 Giriş sekmesi
2. A2 git-identity-config-film    → ⚙️ Kurulum sekmesi
3. A3 gitignore-filter-film       → 🚫 .gitignore sekmesi
4. A4 git-branch-parallel-film    → 🌿 Branch & Switch sekmesi
5. A5 git-merge-two-faces-film    → 🔀 Merge & Conflict sekmesi
6. A6 git-rebase-replay-film      → 🧬 Rebase & İleri Akış sekmesi

Kalıp: her film sabiti dosyanın BAŞINA (mevcut film sabitlerinin yanına)
tanımlanır ve hem EN hem TR section'ına AYNI referansla konur — gitGithubData
EN+TR AYRI ağaçtır, tek yere koyarsan öbür dilde film görünmez. Yerleşim:
sekmenin ana konu anlatım bloğunun (kod/simulation) hemen ARDINA,
quiz/challenge'dan ÖNCE (CLAUDE.md §9.1). Caption'lar {tr,en} bilingual;
TR tarafında açıklama cümleleri Türkçe, teknik terimler (commit, staging,
fast-forward, conflict, rebase, hash vb.) İngilizce KALIR (CLAUDE.md §8).
code alanı varsa {tr,en} bilingual, TR yorumlar Türkçe.

## BİTİRMEDEN ÖNCE (CLAUDE.md §1.1 — atlanamaz):
1. node scripts/check-content-integrity.mjs → sıfır ihlal
2. Her filmin TR caption/code'unu tek tek oku — İngilizce açıklama cümlesi
   kalmasın
3. npm run build → hatasız
4. Hızlı runtime smoke: vite preview ile /git-github'da en az 2 sekmede
   video-scene-block'un render olduğunu doğrula
Doğrulanmadan "tamamlandı" deme. NEXT_SESSION.md'ye kısa durum notu düş
(hangi filmler eklendi, Prompt B'nin beklediği).
```

---

## 9. SONNET PROMPT B — git-github son 5 film + test + durum (kopyala-yapıştır)

> **ÖNKOŞUL:** Prompt A tamamlanmış ve commit edilmiş olmalı — ikisi de
> gitGithubData.js'e dokunur, paralel ÇALIŞTIRMA.

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Önce CLAUDE.md'yi ve .claude/NEXT_SESSION.md'yi oku (oturum protokolü).
Sonra Documents/video-rollout-plan.md Bölüm 7'yi oku — bu görev o planın
"Sonnet Prompt B" payıdır (Bölüm 7.3). Veri şeması referansı:
src/components/VideoSceneBlock.jsx + gitGithubData.js'teki mevcut filmler.

## GÖREV A — 5 film verisi (SADECE src/data/gitGithubData.js;
spesifikasyonlar planın Bölüm 7.4'ünde HAZIR):
1. B1 git-remote-sync-film        → 🐙 GitHub Akışı sekmesi
2. B2 github-pr-lifecycle-film    → 🧾 Pull Request sekmesi
3. B3 github-actions-trigger-film → 🚀 Actions sekmesi
4. B4 github-pages-deploy-film    → 🌐 Pages sekmesi
5. B5 git-force-push-rescue-film  → ⚠️ İş Riskleri sekmesi
Kalıp Prompt A ile aynı: sabit dosya başında, EN+TR İKİ section'a da aynı
referans, yerleşim konu anlatımının ardı + quiz/challenge öncesi.

## GÖREV B — tests/video-scene.spec.ts genişletme
Mevcut testlere dokunmadan yeni bir describe bloğu: /git-github'da temsili
3 sekme (ör. 🎯 Giriş, 🔀 Merge, 🚨 Hata Sözlüğü) + /gauge'da 1 sekmeye
tıklayınca video-scene-block görünür. Hata Sözlüğü ve Mülakat sekmelerinde
DİKKAT: mülakat sekmesi quiz-gating (%60) ile kilitlidir — o sekmeyi test
edeceksen önce gating'i localStorage ile açan mevcut test yardımcılarını
kullan, yoksa o sekmeyi atlayıp yerine kilitsiz bir sekme seç.
/basit-backend, /security, /backend'i EKLEME (CLAUDE.md §22.1).

## GÖREV C — .claude/NEXT_SESSION.md güncelle: Dalga 3 tablosu (14 sekme ×
video/animasyon/sandbox durumu), kalan iş = YOK ya da liste.

## BİTİRMEDEN ÖNCE (CLAUDE.md §1.1 — atlanamaz):
1. node scripts/check-content-integrity.mjs → sıfır ihlal
2. TR caption/code taraması — İngilizce açıklama cümlesi kalmasın
3. npm run build → hatasız
4. npx playwright test tests/video-scene.spec.ts --workers=1 → geçiyor
   (4 worker'da bilinen dev-server ilk derleme timeout'u var — bkz.
   NEXT_SESSION.md; --workers=1 kabul edilen koşum şeklidir)
Doğrulanmadan "tamamlandı" deme.
```

---

## 10. Dalga 3 Kontrol Listesi

```
[x] gauge 🏠/🚨/💼 sandbox'ları (Fable — gauge-why-first-spec-practice,
    gauge-step-mismatch-fix-practice, gauge-interview-stale-fix-practice)
[x] git-github 🚨 tam paket: git-error-diagnosis-film +
    git-error-diagnosis-steps + git-error-practice-01 (Fable)
[x] git-github 💼 tam paket: git-interview-answer-film +
    git-interview-answer-steps + git-interview-practice-01 (Fable)
[ ] Prompt A: 6 film (🎯/⚙️/🚫/🌿/🔀/🧬)
[ ] Prompt B: 5 film (🐙/🧾/🚀/🌐/⚠️) + test + NEXT_SESSION
[ ] Son durum: 14/14 git-github sekmesi + 8/8 gauge sekmesi video+animasyon+sandbox
[ ] check-content-integrity + npm run build temiz
```
