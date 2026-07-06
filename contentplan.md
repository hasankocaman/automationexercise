# CONTENTPLAN.md — Ders İçeriği Mükemmelliği Planı (Docker Pilot)

> **Bu dosya nedir:** Fable 5'in 2026-07-05 tarihli içerik değerlendirme raporuna
> (Docker dersi örneklem alınarak "sıfırdan öğrenen biri için en iyi kaynak mıyız?"
> sorusunun cevabı) dayanan iş planı. `fableplan.md` ile aynı format ve disiplindedir.
>
> **İş bölümü:** Her iş paketinin (CP) başında UYGULAYICI belirtilmiştir:
> - **FABLE** — tasarım yoğun, hata riski yüksek paketler; Fable 5 kendisi uygular.
> - **SONNET** — tasarım kararları bu dosyada VERİLMİŞ, mekanik uygulanabilir
>   paketler; paketin sonundaki hazır prompt Sonnet'e verilerek yaptırılır.
> - **KULLANICI ONAYI GEREKLİ** — başlamadan önce kullanıcıdan açık onay alınır.
>
> **Okuma sırası:** Önce `CLAUDE.md` (anayasa), sonra `.claude/NEXT_SESSION.md`,
> sonra bu dosya. `CLAUDE.md` §1.1'deki 4 maddelik doğrulama checklist'i her CP
> sonunda ZORUNLUDUR.

---

## Raporun Özeti (planın gerekçesi)

**Tespit:** Docker dersi iyi bir kaynak ama "insanlar neden videoyu bırakıp bizi
seçsin?" sorusuna bugün net cevap veremiyor. Güçlü yanlar: §9.3 kalitesinde
analojiler, benzersiz QA odağı (Selenium Grid, CI, gerçek DB), quiz/retry/Feynman/
spaced-repetition altyapısı. Zayıf yanlar:

1. **7 mega-sekme** §16 W3Schools atomik standardını ihlal ediyor ("Temel Docker
   Komutları" tek sekmede 20+ komut).
2. **Kod duvarları:** tek `code` bloğunda 15 komut; kod bloklarının ~%75'inin
   ardında hiçbir etkileşim yok (§9.1 üçlü oranı tutmuyor).
3. **En kritik boşluk:** Docker'ın tarayıcıda gerçek runtime'ı yok (Python=Pyodide,
   SQL=sql.js var) ve mevcut `simulation` blokları "▶ Run Demo" tuşlu pasif
   senaryolar — kullanıcı İZLİYOR, YAZMIYOR. Video izlemekten farkı yok.
4. İlk sekmenin temposu yeni başlayana göre hızlı, mikro-kontrol yok.
5. Sayfa içi ilerleme hissi yok ("neredeyim, sırada ne var").

**Konumlandırma cümlesi (tüm CP'lerin hedefi):** "Videoda Docker'ı İZLERSİN;
burada tarayıcından çıkmadan, hiçbir şey kurmadan Docker'ı ÇALIŞTIRIRSIN, yanlış
yaparsın, sistem sana neden yanlış olduğunu gösterir ve yanlışların 3 gün sonra
karşına tekrar çıkar."

---

## Genel Kurallar (her CP için geçerli)

1. **Bir oturumda bir iş paketi.** Bitir, doğrula, kullanıcı onayıyla commit et.
2. `TopicPage.jsx` ~20.000 satırdır — asla baştan sona okuma; grep ile hedef bul.
3. Her CP sonunda: `node scripts/check-content-integrity.mjs` → `npm run build` →
   ilgili Playwright testleri. TR yorum kuralı (CLAUDE.md §8) her yeni yorum satırı
   için geçerli.
4. Yeni UI metinleri **bilingual** (`{tr, en}` veya `language === 'tr'`).
5. `git push` ve commit için kullanıcı onayı iste. İş bitince `NEXT_SESSION.md`'ye işle.
6. Önerilen sıra: CP1 → CP2 → CP4 → CP3 → CP5. (CP3 en riskli olduğu için sona
   yakın; CP1 hiçbir mevcut yapıyı bozmadan en büyük farkı yaratır.)

---

## CP1 — Docker Sandbox: Durum-Makineli İnteraktif Terminal
**UYGULAYICI: FABLE** (tasarım yoğun — komut grammar'ı, engine state, görev tespiti)

**Neden:** Platformun videolara karşı asıl silahı "aktif deneme"dir ama Docker'da
gerçek runtime olmadığı için mevcut simülasyonlar pasif kalıyor. Tarayıcıda sahte
ama durumlu (stateful) bir Docker engine simüle edilebilir: kullanıcı komutu
KENDİSİ yazar, engine state'i (image listesi, çalışan container'lar, port
eşlemeleri) görsel panelde canlı güncellenir, hatalar gerçekçi mesajlarla döner.

**Tasarım kararları (verildi):**

- **Yeni dosya `src/components/DockerSandboxBlock.jsx`** — TopicPage'e ayrı dosyadan
  import edilir (`CodePlaygroundBlock` kalıbı). Block tipi: **`docker-sandbox`**.
- **Engine state (React state, localStorage YOK — sandbox geçicidir):**
  `{ images: [{name, tag, size}], containers: [{id, name, image, status, ports}] }`
- **Desteklenen komutlar:** `docker pull`, `docker images` / `docker image ls`,
  `docker run [-d] [-p H:C] [--name N]`, `docker ps [-a]`, `docker stop`,
  `docker start`, `docker rm [-f]`, `docker rmi`, `docker logs`, `docker exec`,
  `help`, `clear`.
- **Sahte registry (bilinen image'lar):** `hello-world`, `nginx`, `python`,
  `postgres`, `selenium/standalone-chrome`. Bilinmeyen image → gerçekçi
  "pull access denied / repository does not exist" hatası.
- **Gerçekçi davranışlar (öğretici hata simülasyonu):**
  - `run` edilmemiş image → önce otomatik pull (gerçek Docker gibi, katman
    animasyonuyla).
  - Aynı host portu ikinci kez → `port is already allocated` hatası.
  - Çalışan container'ı `rm` (-f'siz) → gerçek hata mesajı; `-f` ile silinir.
  - Olmayan container'a `stop`/`logs` → `No such container`.
  - Aynı `--name` ikinci kez → `Conflict. The container name ... is already in use`.
- **Görsel panel (sağda, inline SVG/CSS — dış görsel YOK):** IMAGES rafı (kutu
  ikonları) + CONTAINERS alanı (running=yeşil nabız animasyonu, exited=gri) +
  host→container port bağlantı çizgileri. Hatalı komutta panel kenarı kırmızı
  parlar ("Cızz!" — CLAUDE.md §20), görev tamamlanınca konfeti benzeri CSS kutlaması.
- **Görev sistemi (mission):** Blok verisinde `missions` dizisi; her görev
  `{id, text: {tr, en}, check}` — `check` component içinde görev id'sine göre
  engine state'inden otomatik tespit edilir (örn. "nginx'i 8080'e bağlayarak
  çalıştır" → `containers.some(c => c.image==='nginx' && c.ports['8080'])`).
  Tamamlanan görev ✓ işaretlenir, sıradaki vurgulanır. İlerleme session-only.
- **Varsayılan görev seti (Temel Komutlar sekmesi):**
  1. `hello-world` image'ını pull et
  2. `nginx`'i arka planda (-d), 8080:80 port eşlemesiyle, `web` adıyla çalıştır
  3. Çalışan container'ları listele (`docker ps`)
  4. `web` container'ının loglarına bak
  5. `web`'i durdur ve sil
- **Bilingual:** tüm UI metinleri `{tr, en}`; terminal ÇIKTILARI İngilizce kalır
  (gerçek Docker çıktısı = terminal çıktısı istisnası, CLAUDE.md §8), ama görev
  metinleri, ipuçları ve hata AÇIKLAMALARI (çıktının altında "💡 Neden?" satırı)
  Türkçe/İngilizce.
- **Focus-mode etkileşimi:** sandbox'ın nabız/kutlama animasyonları öğrenme geri
  bildirimi sayıldığından (`js-confetti-particle` emsali) `focus-mode.css`'e
  EKLENMEZ.
- **Yerleşim:** `dockerData.js` → "📦 Temel Docker Komutları" sekmesi (hem EN hem
  TR section), ilk `code` bloğundan sonra. `relatedTopicId` bu blok tipi için
  zorunlu değil (integrity script sadece code-playground/interview-questions/
  error-dictionary'yi denetler) ama tutarlılık için eklenebilir.
- **Test — yeni dosya `tests/docker-sandbox.spec.ts`:** (a) `docker pull nginx`
  yaz → IMAGES rafında nginx görünür; (b) `docker run -d -p 8080:80 --name web
  nginx` → çalışan container kutusu + görev ✓; (c) hatalı komut (`docker rn`) →
  hata mesajı + öneri görünür; (d) çalışan container'ı `-f`'siz `rm` → gerçekçi
  hata. `serviceWorkers: 'block'` kullan.

**Doğrulama:** integrity ✓, build ✓, yeni spec + `topic-pages-ui.spec.ts -g docker`
+ `i18n-content-toggle` Docker kısmı ✓.

---

## CP2 — Kod Duvarlarını Kırma + Üçlü Tamamlama (Docker)
**UYGULAYICI: SONNET** (mekanik — kurallar ve hedef oran verildi)

**Neden:** §9.1 "her atomik kod bloğu sonrası üçlü" kuralına karşın Docker'da dil
başına ~13 kod bloğuna 3 playground + 3 drag-drop + 3 animasyon düşüyor.
15 komutluk bloklar tek nefeste okunamaz.

**Kurallar (verildi):**
1. `dockerData.js`'te 8+ satır komut içeren her `code` bloğu, KAVRAM başına
   (image komutları / container yaşam döngüsü / debug komutları / temizlik)
   2-4 komutluk ayrı bloklara bölünür; her parçanın kendi `label`'ı olur.
2. Her yeni parçanın ardına üçlüden en az BİRİ eklenir; öncelik sırası:
   (a) CP1 sandbox'a yönlendiren mini görev callout'u ("🧪 Şimdi yukarıdaki
   sandbox'ta dene: ..."), (b) `challenge` variant `order-sort` (komut sıralama),
   (c) `code-playground` (bozuk komutu düzelt). Hedef: kod bloğu başına ≥1 etkileşim.
3. Yeni `code-playground`/`error-dictionary` bloklarına `relatedTopicId` ZORUNLU;
   hint metinleri benzersiz olmalı (%85 benzerlik yasağı, §9.4).
4. TR bölümdeki tüm yeni yorum satırları Türkçe; EN/TR section'lar simetrik.
5. Blok bölme sırasında mevcut quiz/simulation bloklarının SIRASI korunur
   (quiz asla anlatımdan önce gelmez, §9.1).

### SONNET PROMPTU (CP2) — kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md'nin CP2
bölümünü oku ve SADECE CP2'yi uygula.

Görev: src/data/dockerData.js'teki kod duvarlarını kır. 8+ satır komut içeren
her 'code' bloğunu kavram başına 2-4 komutluk bloklara böl (her parçaya kendi
label'ı). Her parçanın ardına CP2 kurallarındaki öncelik sırasıyla en az bir
etkileşim bloğu ekle (sandbox yönlendirme callout'u / order-sort challenge /
code-playground). EN ve TR section'ları simetrik tut. Yeni code-playground ve
error-dictionary bloklarına relatedTopicId ekle; hint metinlerini benzersiz yaz.
TR bölümdeki tüm yorum satırları Türkçe olacak.

Bitirmeden önce CLAUDE.md §1.1 checklist'ini çalıştır:
node scripts/check-content-integrity.mjs (0 ihlal) + npm run build (PASS) +
npx playwright test tests/topic-pages-ui.spec.ts -g docker +
tests/i18n-content-toggle.spec.ts. Sonuçları NEXT_SESSION.md'ye işle.
Commit için kullanıcı onayı iste.
```

---

## CP3 — Docker Sekme Atomikleştirme (§16 W3Schools Standardı)
**UYGULAYICI: SONNET — ANCAK KULLANICI ONAYI OLMADAN BAŞLANMAZ**

**Neden:** 7 mega-sekme yerine W3Schools tarzı atomik başlıklar (§16). Yeni
başlayan "Temel Komutlar" duvarına çarpmak yerine küçük, sindirilebilir adımlarla
ilerler.

**Hedef sekme listesi (tasarım kararı — W3Schools Docker müfredatıyla kıyaslanarak
son hali verilecek):** Docker Nedir / Kurulum / Image'lar / Container'lar /
docker run / exec & logs / Dockerfile / Docker Compose / Volumes / Networks /
QA: Selenium Grid / QA: CI'da Docker / Yaygın Hatalar / Ekosistem / Mülakat
(≈15 sekme).

**Riskler (bu yüzden onay şart):**
1. localStorage'daki sekme-bazlı progress/quiz anahtarları `pageKey:tabIndex`
   içeriyorsa index kayması eski kullanıcı verisini bozar — önce anahtar formatı
   grep'lenip doğrulanmalı; gerekirse migrasyon ya da anahtarın korunması.
2. Sekme yapısına/sekme sayısına bakan Playwright testleri
   (`topic-pages-ui.spec.ts`, `docker-interview-mastery-flow.spec.ts`,
   `docker-mastery` vb.) güncellenmeli.
3. Mülakat gating (%60 quiz eşiği, AC02-03) sekme başına quiz dağılımı
   değişince yeniden doğrulanmalı — CLAUDE.md §22 kontrolleri 2, 3 zorunlu.
4. Bu, fableplan.md'nin "Sonnet'in yapmayacağı işler" listesindeki Python/Java
   atomikleştirmesiyle aynı sınıf bir iştir; Docker daha küçük olduğu için pilot
   olarak seçildi. Docker pilotu başarılı olursa Python/Java için emsal olur.

### SONNET PROMPTU (CP3) — kullanıcı onayından SONRA kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md CP3'ü oku.
Kullanıcı CP3'e onay verdi. SADECE CP3'ü uygula.

Adım 1 — Keşif (kod yazmadan): (a) localStorage quiz/progress anahtar formatını
grep'le bul (pageKey/tabIndex kullanımı); index kayması riski varsa bana seçenek
sun, kod yazma. (b) tests/ altında Docker sekme yapısına bağımlı assert'leri
listele. (c) W3Schools Docker müfredatını kontrol et, contentplan.md'deki 15
sekmelik listeyle farkları raporla.

Adım 2 — Kullanıcıya keşif raporunu sun, sekme listesinin son halini onaylat.

Adım 3 — dockerData.js'i yeni sekme yapısına böl (blok İÇERİKLERİNE dokunma,
sadece yeniden grupla; her sekmenin ilk bloğu simple-box olmalı — eksikse §9.3
standardında yenisini yaz). EN/TR simetrisi korunur. Etkilenen testleri güncelle.

Doğrulama: CLAUDE.md §1.1 checklist + §22 kontrol 2-3 (mülakat gating) +
npx playwright test (docker ile ilgili tüm spec'ler). NEXT_SESSION.md'ye işle.
```

---

## CP4 — Sayfa İçi İlerleme + Tempo Yumuşatma
**UYGULAYICI: SONNET**

**Tasarım kararları (verildi):**
1. **Sidebar ✓ işaretleri:** Bir sekmedeki tüm quiz'ler doğru cevaplanmışsa
   sidebar'da o sekmenin yanına küçük yeşil ✓ (mevcut quiz state'i zaten
   localStorage'da — yeni anahtar İCAT ETME, mevcut anahtarı OKU).
2. **"Sırada ne var" kartı:** Sekmenin son bloğundan sonra otomatik render edilen
   küçük bilingual kart: "✅ Bu bölümü bitirdin → Sıradaki: [sekme adı]". Component
   TopicPage'de bir kez yazılır, tüm sayfalarda otomatik çalışır (data değişikliği
   gerektirmez).
3. **Tempo:** Docker "Nedir?" sekmesinde VM karşılaştırma tablosundan ÖNCE 1
   mikro-quiz eklenir ("Kodu zip'leyip göndermek neden yetmez?" — cevap şıkları
   simple-box'taki analojiden). Quiz'in anlatımdan sonra gelme kuralı (§9.1)
   korunur: simple-box + text bloklarından sonra, tablodan önce.

### SONNET PROMPTU (CP4) — kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md CP4'ü oku ve
SADECE CP4'ü uygula.

Görev: (1) TopicPage.jsx sidebar'ına sekme-tamamlandı ✓ işareti ekle — quiz
state'inin localStorage'da nasıl tutulduğunu grep'le bul, MEVCUT anahtarı oku,
yeni anahtar icat etme. (2) Sekme sonuna otomatik "Sırada ne var" bilingual
kartı ekle (TopicPage'de tek component, data dosyası değişikliği yok; son
sekmede "🎉 Dersi bitirdin" varyantı). (3) dockerData.js "Docker Nedir?"
sekmesine (EN+TR) VM tablosundan önce, simple-box/text'ten sonra 1 mikro-quiz
ekle — soru contentplan.md CP4'te tanımlı, retryQuestion'ı da yaz (§18).

TopicPage.jsx'i baştan sona OKUMA — grep ile hedef bul. Doğrulama: CLAUDE.md
§1.1 checklist + tests/topic-pages-ui.spec.ts + tests/quiz-retry-mechanism.spec.ts
+ tests/mobile-smoke.spec.ts. NEXT_SESSION.md'ye işle. Commit için onay iste.
```

---

## CP5 — Yayılım (Docker kalıbının diğer sayfalara taşınması)
**UYGULAYICI: sonra kararlaştırılacak — CP1-CP4 Docker'da doğrulanmadan BAŞLANMAZ**

Docker'da doğrulanan kalıp (sandbox + görev sistemi + kırılmış kod blokları +
sayfa içi ilerleme) §9.2 mantığıyla diğer sayfalara taşınır. Doğal sıra:
1. **Linux** — aynı terminal-sandbox altyapısı (`ls/cd/grep/chmod` state makinesi
   dosya sistemi simülasyonuyla) en kolay buraya taşınır.
2. **Git & GitHub** — commit graph görseli zaten var; `git add/commit/branch/merge`
   sandbox'ı.
3. **Kubernetes** — `kubectl` sandbox'ı (Docker sandbox engine'inin genişletmesi).

Her sayfa ayrı CP olarak planlanır; sandbox engine'i o zaman ortak bir
`src/lib/` modülüne çıkarılabilir (şimdiden soyutlama YAPMA — önce Docker'da
kanıtla).

---

## BÖLÜM 2 — GJL Planı: Git & GitHub → Jenkins → Linux (2026-07-06)

> Docker pilotu (CP1-CP5) tamamlandıktan sonra kullanıcı isteğiyle aynı planlama
> disiplini üç sayfaya uygulandı. Keşif (2026-07-06, `analyze-pages.mjs` ile üç
> data dosyasının sekme/blok/kod-duvarı dökümü) şu tabloyu verdi:
>
> | Sayfa | Sekme | Sandbox | Kod duvarı (8+ satır) | En büyük boşluk |
> |-------|-------|---------|------------------------|-----------------|
> | git-github | 12 | ✅ CP5.2'de tamam | Sekme[4]'te 7 adet (9-19 satır komut duvarı) + config'ler | `[4] Branching/Merge/Rebase/Conflict` mega-sekmesi (43 blok) |
> | jenkins | 8 | ❌ HİÇ YOK (sadece pasif "▶ Build Başlat" demoları) | Jenkinsfile'lar (24-46 satır, tek dosya = bölünmez) | Gerçek, YAZILABİLİR pipeline deneyimi yok — Docker'ın CP1 öncesi durumu |
> | linux | 10 | ✅ CP5.1'de tamam | 1 adet (13 satır, Real-World QA) | Küçük: sandbox'a yönlendiren callout'lar yok, 1 duvar |
>
> Docker emsalleri artık generic: `TopicPage.migrateTabProgress` + data dosyasına
> `progressMigration` exportu (CP3), sandbox mimarisi (CP1/CP5.3), callout'lu
> duvar kırma (CP2). Aşağıdaki paketler bu emsalleri uygular.

---

## CP6 — Git & GitHub: Branching Mega-Sekme Atomikleştirme + Kod Duvarı Kırma
**UYGULAYICI: SONNET — ANCAK KULLANICI ONAYI OLMADAN BAŞLANMAZ** (CP3 emsali:
localStorage migrasyonu + test güncellemesi içerir; mekanizma kanıtlandığı için
artık Sonnet yapabilir ama başlama kararı kullanıcınındır.)

**Tasarım kararları (verildi):**
1. **12 → 14 sekme:** Sadece `[4] 🌿 Branching, Merge, Rebase ve Conflict`
   bölünür (43 blok, 8 code + 6 playground + 6 challenge + 6 step-animation).
   Hedef bölünme: `🌿 Branch & Switch` / `🔀 Merge & Conflict` / `🧬 Rebase &
   İleri Akış`. Kesin sınırlar keşifte blok listesine bakılarak çizilir; blok
   SIRASI korunur (bölme = sınır ekleme, içerik taşınmaz — CP3 kuralı).
   Diğer 11 sekme zaten atomik, DOKUNULMAZ.
2. **`gitGithubData.js`'e `progressMigration` exportu:**
   `{ version: 2, tabMap: {0:[0],1:[1],2:[2],3:[3],4:[4,5,6],5:[7],6:[8],7:[9],8:[10],9:[11],10:[12],11:[13]} }`
   (bölünme 3'lü değilse tabMap buna göre güncellenir). `TopicPage.migrateTabProgress`
   zaten generic — TopicPage'de kod değişikliği GEREKMEZ.
3. **Eski sekme [4]'teki 7 komut duvarı** (19,16,10,12,9,10,17 satır) kavram
   başına 2-4 komutluk parçalara bölünür (CP2 kuralları aynen). Her parçanın
   ardına öncelik sırasıyla: (a) Git Basics sekmesindeki GERÇEK terminale
   (CP5.2 sandbox, 5 görevli) yönlendiren callout — özellikle branch/merge/diff/
   stash görevleriyle örtüşen yerlerde, (b) `order-sort` challenge, (c)
   `code-playground` (`relatedTopicId` zorunlu, hint benzersiz).
4. **Bölünmeyen duvarlar (bilinçli istisna, Docker Dockerfile emsali):**
   `.gitignore` (35 satır, tek config), Pages workflow (40), Actions YAML (10),
   Kurulum adım rehberleri (11,15), PR örneği (9), Risks (10) — bunlar tek
   dosya/adım-rehberi; sadece ardında hiç etkileşim yoksa BİR etkileşim eklenir.
5. Yeni sekmelerin ilk bloğu `simple-box` olmalı — bölünen 2 yeni sekme için
   §9.3 standardında (4 katman) yeni simple-box yazılır (×2 dil).
6. **Test etkisi (keşifte doğrulanacak):** `tests/` altında gitGithub
   `sections[4]`/sekme-index/sekme-adı bağımlılıkları grep'lenir
   (`INTERVIEW_TAB_INDEX` benzeri sabitler, `getByRole('button', {name: ...})`
   sekme aramaları). Mülakat sekmesi 11→13'e kayar — gating testleri güncellenir.

### SONNET PROMPTU (CP6) — kullanıcı onayından SONRA kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md CP6'yı oku.
Kullanıcı CP6'ya onay verdi. SADECE CP6'yı uygula.

Adım 1 — Keşif (kod yazmadan): (a) src/data/gitGithubData.js sekme [4]'ün
(Branching/Merge/Rebase/Conflict, EN+TR) blok listesini çıkar, CP6'daki 3'lü
bölünme için kesin blok sınırlarını belirle. (b) tests/ altında git-github
sekme index'ine/adına/sections[4]'e bağımlı assert'leri grep'le listele
(mülakat sekmesi 11→13 kayacak). (c) Bulguları ve kesin tabMap'i bana raporla,
onayımı al.

Adım 2 — Uygula: sekmeyi böl (blok sırası korunur, içerik taşınmaz; 2 yeni
sekme başına §9.3 standardında simple-box ×2 dil), gitGithubData.js'e
progressMigration exportunu ekle (TopicPage.migrateTabProgress generic,
TopicPage'e DOKUNMA), eski [4]'teki 7 komut duvarını CP6 kural 3'e göre kır
(callout'lar Git Basics'teki gerçek terminalin 5 görevine yönlendirsin),
etkilenen testleri güncelle. EN/TR simetrik.

Doğrulama: CLAUDE.md §1.1 checklist + §22 kontrol 2-3 (git-github mülakat
gating yeni index'le) + npx playwright test tests/git-sandbox.spec.ts
tests/topic-pages-ui.spec.ts -g git-github + i18n-content-toggle git kısmı.
Eski 12-sekme localStorage verisi enjekte eden geçici bir migrasyon testi
yaz-koş-sil (Docker CP3 emsali). NEXT_SESSION.md'ye işle. Commit için onay iste.
```

---

## CP7 — Jenkins Sandbox: Yazılabilir Jenkinsfile + Canlı Stage View
**UYGULAYICI: FABLE** (tasarım yoğun — Jenkinsfile parser'ı, build engine,
stage görselleştirmesi; Docker CP1 ile aynı sınıf)

**Neden:** Jenkins'te kullanıcının YAZDIĞI hiçbir şey çalışmıyor — mevcut 4
`simulation` bloğu pasif "▶ Build Başlat" demoları (`jenkins-pipeline-visual`).
Jenkins diğer sandbox'lardan farklı: öğrenme engeli bir CLI değil, Jenkinsfile
SÖZDİZİMİ + stage/post akış mantığı. Bu yüzden terminal değil, **düzenlenebilir
Jenkinsfile editörü + "▶ Build Now" + canlı Stage View** simüle edilir:
kullanıcı Jenkinsfile'ı KENDİSİ değiştirir, build'i kendisi kırar, post{failure}
ve SKIPPED stage'leri kendi gözüyle görür, sonra yeşile çevirir.

**Tasarım kararları (verildi):**
- **Yeni dosya `src/components/JenkinsSandboxBlock.jsx`** — block tipi
  **`jenkins-sandbox`** (TopicPage import + renderBlock case, K8s kalıbı).
- **Sol panel:** monospace `<textarea>` (starter Jenkinsfile: agent any + Build
  + Test stage'leri, post YOK — görevler ekletecek) + "▶ Build Now" butonu.
- **Parser (basitleştirilmiş declarative subset):** `pipeline{}`, `agent any`,
  `stages{}`, `stage('Ad'){}`, `steps{}`, `sh '...'`, `echo '...'`,
  `post{ always/success/failure{} }`. Gerçekçi hatalar (gerçek Jenkins
  mesajları örnek alınır): `agent` silinirse → `WorkflowScript: 1: Missing
  required section "agent"`; `stages` yoksa → `Missing required section
  "stages"`; steps'siz stage → `Nothing to execute within stage "X"`; dengesiz
  süslü parantez → Groovy `unexpected token` hatası. Hata altında bilingual
  "💡 Neden?" satırı; hatalı build history'ye FAILURE olarak düşer.
- **Build engine:** stage'ler sırayla, kısa gecikmeli (≈500ms) animasyonla
  koşar. `sh` simülasyonu: `exit 1`/`false` içeren komut → stage FAIL, sonraki
  stage'ler SKIPPED, `post{failure}` koşar; diğer komutlar bilinen sahte
  çıktılarla başarılı (`npm install` → "added 1290 packages...", `npm test` /
  `pytest` → sahte test özeti). Konsol çıktısı gerçek Jenkins log biçiminde
  (`[Pipeline] stage (Build)`, `+ npm install`, `Finished: SUCCESS/FAILURE`)
  ve İngilizce (terminal çıktısı istisnası, CLAUDE.md §8).
- **Sağ panel:** Stage View — bağlantı çizgili stage baloncukları (pending gri
  / running mavi nabız / success yeşil / failed kırmızı + "Cızz" flash /
  skipped çizgili gri) + post rozetleri (always/success/failure koştu mu) +
  Build History listesi (#1 ✅ SUCCESS, #2 ❌ FAILURE — kırılan stage adıyla).
  Başarıda konfeti benzeri kutlama, hatada panel kenarı kırmızı parlar (§20).
- **5 görev (state-bazlı `MISSION_CHECKS`, Docker deseni):**
  1. `first-green` — Starter Jenkinsfile'ı olduğu gibi çalıştır, ilk yeşil build'i al.
  2. `add-deploy` — `Deploy` adında 3. bir stage ekle, build yeşil bitsin.
  3. `break-build` — Test stage'ine `sh 'exit 1'` ekleyerek build'i KIR;
     Deploy'un SKIPPED kaldığını gör.
  4. `post-failure` — `post { failure { echo ... } }` ekle; kırık build'de
     koştuğunu gör.
  5. `back-to-green` — Build'i tekrar yeşile çevir (history'de FAILURE'dan
     SONRA gelen bir SUCCESS).
- **Yerleşim:** `jenkinsData.js` → "🔁 Pipeline" sekmesi (EN satır ~1222 sonrası,
  TR simetrik): İlk Jenkinsfile `code` bloğu → pasif simulation → SANDBOX
  (pasif demo SİLİNMEZ, Docker/K8s emsali). State session-only, localStorage YOK.
- **Test — yeni dosya `tests/jenkins-sandbox.spec.ts`:** (a) TR: Build Now →
  SUCCESS + görev 1 ✓; textarea'ya `exit 1` enjekte et → FAILURE + SKIPPED
  stage + post rozetleri; düzeltip yeşile çevir → görev 5 ✓; (b) `agent any`
  silinmiş dosya → gerçekçi "Missing required section" hatası; (c) EN modda
  görev metinleri İngilizce. `serviceWorkers: 'block'`.

**Doğrulama:** integrity ✓, build ✓, yeni spec + `topic-pages-ui -g jenkins` +
`i18n-content-toggle` jenkins kısmı ✓.

---

## CP8 — Jenkins Sekme Atomikleştirme (8 → ~12)
**UYGULAYICI: SONNET — ANCAK KULLANICI ONAYI OLMADAN BAŞLANMAZ**

**Tasarım kararları (verildi):**
1. Bölünecek mega-sekmeler: `[2] Pipeline Basics` (38/25/29 satır Jenkinsfile +
   env/credentials konuları) → `🔁 İlk Jenkinsfile` / `🔐 Environment &
   Credentials` (+ CP7 sandbox'ı İlk Jenkinsfile'da kalır); `[3] QA Tool
   Integration` (46/37/41/36 satırlık 4 dev Jenkinsfile — muhtemelen araç
   başına) → araç bazlı 2-3 sekme (kesin sınır keşifte); `[4] Advanced`
   (30/29) → gerekirse 2'ye. Hedef ≈12 sekme; [0],[1],[5],[6],[7] DOKUNULMAZ.
2. Jenkinsfile duvarları TEK DOSYA config'dir — BÖLÜNMEZ (Docker
   Dockerfile/compose emsali). Zaten her birinin ardında code-playground var
   (keşifte doğrulandı: [2] 3 code/3 playground, [3] 4/4) — yeni etkileşim
   sadece hiç etkileşimsiz kalan parça olursa eklenir; CP7 sandbox'a
   yönlendiren callout'lar Pipeline/QA sekmelerine serpiştirilir.
3. `jenkinsData.js`'e `progressMigration` exportu (kesin tabMap keşif sonrası;
   TopicPage'e DOKUNULMAZ).
4. Yeni sekme başlarına §9.3 simple-box (×2 dil); mülakat sekmesi index'i
   kayar → gating testleri güncellenir.

### SONNET PROMPTU (CP8) — kullanıcı onayından SONRA kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md CP8'i oku.
Kullanıcı CP8'e onay verdi. SADECE CP8'i uygula.

Adım 1 — Keşif (kod yazmadan): (a) src/data/jenkinsData.js sekme [2],[3],[4]
(EN+TR) blok listelerini çıkar; CP8 kural 1'deki hedefe göre kesin bölünme
sınırlarını ve tabMap'i belirle (blok sırası korunur, içerik taşınmaz).
(b) tests/ altında jenkins sekme index/adı bağımlılıklarını grep'le listele.
(c) Raporla, onayımı al.

Adım 2 — Uygula: sekmeleri böl, yeni sekme başlarına §9.3 standardında
simple-box (×2 dil) yaz, jenkinsData.js'e progressMigration exportu ekle
(TopicPage.migrateTabProgress generic — TopicPage'e DOKUNMA), CP7 sandbox'a
yönlendiren callout'ları pipeline/QA sekmelerine ekle, etkilenen testleri
güncelle. Jenkinsfile bloklarını BÖLME (tek dosya config). EN/TR simetrik;
TR yorumlar Türkçe.

Doğrulama: CLAUDE.md §1.1 checklist + §22 kontrol 2-3 (jenkins gating yeni
index'le) + npx playwright test tests/jenkins-sandbox.spec.ts
tests/topic-pages-ui.spec.ts -g jenkins + i18n-content-toggle jenkins kısmı.
Eski 8-sekme localStorage verisi enjekte eden geçici migrasyon testi
yaz-koş-sil. NEXT_SESSION.md'ye işle. Commit için onay iste.
```

---

## CP9 — Linux İnce Ayar: Sandbox Callout'ları + Son Duvar
**UYGULAYICI: SONNET** (küçük, mekanik — onay gerekmez)

**Tasarım kararları (verildi):**
1. Linux'ta atomikleştirme YAPILMAZ (10 sekme zaten atomik — bilinçli karar).
2. `[6] Real-World QA` sekmesindeki 13 satırlık tek kod duvarı kavram başına
   2-3 parçaya bölünür (CP2 kuralları; TR yorumlar Türkçe, EN/TR simetrik).
3. **Sandbox yönlendirme callout'ları (Docker CP2 deseni):** `[3] Permissions &
   Users` sekmesine chmod anlatımından sonra ("🧪 Filesystem & Navigation
   sekmesindeki gerçek terminalde dene: deploy.sh'ı çalıştırılabilir yap" —
   sandbox görevi 5) ve `[4] Text & Pipes` sekmesine grep anlatımından sonra
   ("test.log'da FAIL satırlarını ara" — sandbox görevi 2) birer bilingual
   callout eklenir. Sekme adları birebir mevcut adlardan alınır.
4. Yeni code-playground eklenirse `relatedTopicId` zorunlu, hint benzersiz.

### SONNET PROMPTU (CP9) — kopyala-yapıştır

```
CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku, sonra contentplan.md CP9'u oku ve
SADECE CP9'u uygula.

Görev: (1) src/data/linuxData.js [6] Real-World QA sekmesindeki 13 satırlık
code bloğunu kavram başına 2-3 parçaya böl, her parçaya kendi label'ı +
ardına en az 1 etkileşim (callout/order-sort/code-playground önceliğiyle).
(2) [3] Permissions & Users ve [4] Text & Pipes sekmelerine, Filesystem &
Navigation sekmesindeki gerçek terminalin ilgili görevlerine (chmod deploy.sh
/ grep FAIL) yönlendiren birer bilingual callout ekle. EN/TR simetrik, TR
yorumlar Türkçe, yeni code-playground'lara relatedTopicId.

Doğrulama: CLAUDE.md §1.1 checklist + npx playwright test
tests/linux-sandbox.spec.ts tests/topic-pages-ui.spec.ts -g linux +
i18n-content-toggle linux kısmı. NEXT_SESSION.md'ye işle. Commit için onay iste.
```

---

## GJL Uygulama Sırası ve Durum

| CP | Sayfa | Uygulayıcı | Durum |
|----|-------|-----------|----------|
| CP7 | Jenkins sandbox | **FABLE** | ✅ TAMAMLANDI (commit `8527136`) |
| CP6 | Git atomikleştirme | SONNET | ✅ TAMAMLANDI (2026-07-06 — kullanıcı onayı sonrası uygulandı, henüz commit edilmedi) |
| CP8 | Jenkins atomikleştirme | SONNET | **kullanıcı onayı bekliyor** + CP7 merge edilmiş olmalı (callout'lar sandbox'a işaret ediyor) |
| CP9 | Linux ince ayar | SONNET | ✅ TAMAMLANDI (2026-07-06 — onay gerekmedi, henüz commit edilmedi) |

---

## İş Paketi Kapanış Ritüeli (her CP sonunda, atlanamaz)

```
1. node scripts/check-content-integrity.mjs   # 0 ihlal
2. npm run build                              # PASS (SEO + static shells dahil)
3. npx playwright test <ilgili spec'ler>      # bilinen /python flakiness istisna
4. TR yorum taraması                          # bu CP'de eklenen her yorum Türkçe mi?
5. NEXT_SESSION.md güncelle                   # yapılan, kalan, bilinen riskler
6. Kullanıcı onayıyla commit                  # mesaj sonuna Co-Authored-By satırı
```
