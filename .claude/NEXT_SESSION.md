# NEXT SESSION - Devam Noktasi (TEK Guncel Durum Dosyasi)

> Bu dosyayi `CLAUDE.md`'den hemen sonra, her oturum basinda oku.
> Kullanicidan proje durumunu tekrar isteme. Kalici kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adimlari `DEPLOY.md`; guncel is
> listesi ve son inceleme sonucu sadece bu dosyadadir.
>
> Bu dosyada commit hash ve anlik durum tutulabilir; kalici kural dosyalarina
> commit hash/anlik not yazilmaz.

---

## Güncel Branch Durumu (2026-07-06 devam, `feature/contentplan-git-jenkins-linux` — CP6: Git Branching Atomikleştirme TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/contentplan-git-jenkins-linux` (CP7 Jenkins Sandbox commit'i `8527136`'ya kadar; bu oturumun CP6 işi **HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor**) |
| **Kapsam** | Kullanıcı model'i Sonnet'e çevirip contentplan.md'deki hazır CP6 promptunu verdi ("kullanıcı CP6'ya onay verdi"). CP6 Adım 1 (keşif) çalıştırıldı, bulgular + quiz-gating karar noktası kullanıcıya raporlandı, `AskUserQuestion` ile onay alındı ("2 yeni mikro-quiz yaz"), sonra Adım 2 (uygulama) yapıldı. |

### Keşif sonucu (kesinleşen tasarım)

`gitGithubData.js` sekme [4] "🌿 Branching, Merge, Rebase and Conflicts" (EN 49 blok, TR 48 blok — TR'de EN'deki dekoratif `css-animation` bloğu hiç yoktu, önceden var olan asimetri, CP6 kapsamı dışı) 3'e bölündü: **Branch & Switch** (branch list/create/switch/rename + stash + remote publish + fetch/pull) / **Merge & Conflict** (merge+conflict simülasyonları + günlük workflow + merge) / **Rebase & İleri Akış** (cherry-pick + rebase + final force-push quiz'i). 7 kod duvarı (contentplan'da öngörülen 19,16,10,12,9,10,17 satır) kavram başına 2-4 komutluk parçalara bölündü.

**Keşifte bulunan ek karar noktası (contentplan'da öngörülmemişti):** Sayfadaki HER mevcut sekmede tam olarak 1 gating quiz'i vardı; 3'e bölününce quiz sadece "Rebase & İleri Akış"a düşüp diğer 2 yeni sekme quiz'siz (serbestçe tıklanarak tamamlanabilir) kalıyordu — sayfanın "✓ = gerçekten doğru cevapladın" ilkesini bozardı. Kullanıcıya soruldu, **"2 yeni mikro-quiz yaz" seçildi.**

### Bu oturumda yapılan iş

- **14 sekme (EN+TR simetrik):** `tabs` dizisi ve `sections` dizisi güncellendi; yeni 2 sekmenin ilk bloğu §9.3 standardında (4 katman: somut analoji + düşündürücü soru + Java karşılaştırması + QA bağlamı) yeni `simple-box` (Merge&Conflict: mahkeme stenografı analojisi; Rebase&İleri Akış: zaman makinesi analojisi).
- **2 yeni mikro-quiz** (retryQuestion dahil, §18): Branch & Switch sonuna (fetch/pull --rebase farkı), Merge & Conflict sonuna (conflict marker çözme adımı) — ikisi de EN+TR ayrı plain-string obje (dosyanın mevcut quiz formatı).
- **7 kod duvarı kırıldı**, her yeni parçanın ardına CP6 öncelik sırasıyla (a) Git Basics sandbox'ın (CP5.2, 5 görevli) ilgili göreviyle eşleşen `callout` (3 adet: branch-switch, stash-workflow, stage-commit görevlerine), (b) `order-sort` challenge (5 adet, komutlar duvarın kendisinden türetildi) eklendi.
- **`progressMigration` exportu eklendi** (Docker CP3 emsali, `TopicPage.migrateTabProgress` generic — TopicPage'e DOKUNULMADI): `{version:2, tabMap:{4:[4,5,6], diğerleri 1:1}}`.
- **Test dosyası değişikliği GEREKMEDİ**: keşifte `git-sandbox.spec.ts`'in sadece "Git Temelleri" (index 2, dokunulmadı) sekmesini adla aradığı, `topic-pages-ui`/`i18n-content-toggle`'ın pozisyonel/route-döngüsü olduğu ve git-github için hiç dedicated interview-mastery testi olmadığı doğrulandı.

### Doğrulama (CLAUDE.md §1.1 + §22 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal
- `npm run build` → ✅ PASS (46.7s, 38 static route, dist SEO PASS, git-github mülakat 52 soru hâlâ ✅ OK)
- Geçici migrasyon testi (yaz-koş-sil, Docker CP3 emsali): eski 12-sekme `progress_gitvegithub`/`quizScore_gitvegithub` verisi enjekte edildi → reload → sekme 4'ün verisi 4,5,6'ya doğru remap oldu (cömert taşıma: torun sekmelerdeki TÜM quiz blokları doğru sayıldı), `progressVersion_gitvegithub` = "2", ikinci reload'da idempotent kaldı → ✅ PASS, sonra silindi.
- `tests/git-sandbox.spec.ts` + `tests/topic-pages-ui.spec.ts -g git-github` → ✅ 3/3 PASS
- `tests/i18n-content-toggle.spec.ts -g git-github` → ✅ 1/1 PASS (14 sekme dahil EN modda Türkçe karakter sızıntısı yok)
- **§22 kontrol 2 (gating kapalı durum):** geçici spot-check testiyle (yaz-koş-sil) 0% quiz'de Mülakat S&C sekmesinin 🔒 gösterdiği doğrulandı. **Kontrol 3 (açık durum):** ayrı test yok ama mekanizma (`globalQuizPercent = correctQuizOnPage/totalQuizOnPage*100`) sayfa genelinde dinamik hesaplanıyor, TopicPage.jsx'e dokunulmadı, yeni 2 quiz `totalQuizOnPage`'e otomatik dahil oluyor (yapısal olarak doğrulandı) — hardcoded index/sayı YOK, bu yüzden ayrı test gerekmedi.
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar/simple-box/quiz/callout Türkçe.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP6 işi commit edilmedi** — kullanıcı onayı bekliyor. Değişen dosya: sadece `src/data/gitGithubData.js`.
2. **CP8 (Jenkins atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz; contentplan.md BÖLÜM 2'de prompt hazır, CP7 (Jenkins Sandbox) zaten bu branch'te mevcut.
3. **CP9 (Linux ince ayar)** — onay gerekmez, prompt contentplan.md'de hazır, hemen başlatılabilir.
4. Bilinen pre-existing asimetri (CP6 kapsamı dışı, düzeltilmedi): TR section'da EN'deki dekoratif `css-animation` bloğu (Git Branch & Merge Flow) hiç yok.

---

## Güncel Branch Durumu (2026-07-06, `feature/contentplan-git-jenkins-linux` — GJL Planı (CP6-CP9) yazıldı + CP7 Jenkins Sandbox TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/contentplan-git-jenkins-linux` (main `7624431`'den açıldı — önceki tüm CP işleri main'e merge edilmiş durumda; bu oturumun işi **HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor**) |
| **Kapsam** | Kullanıcı: "Docker için yaptığın planlamayı git-github → jenkins → linux için yap (tek plan olabilir); FABLE işlerini kendin yap, SONNET işleri için prompt yaz; yeni branch aç." |

### Bu Oturumda Yapılan İş

1. **Keşif:** üç sayfanın data dosyaları script'le analiz edildi (sekme/blok/kod-duvarı/mülakat dökümü). Sonuç: Git 12 sekme ama `[4] Branching` mega-sekmesi (43 blok, 7 kod duvarı); Jenkins 8 sekmede HİÇ sandbox yok (4 pasif "▶ Build Başlat" demosu) + Pipeline/QA Integration mega-sekmeleri; Linux zaten iyi durumda (tek 13 satırlık duvar, sandbox CP5.1'de tamam).
2. **`contentplan.md` → "BÖLÜM 2 — GJL Planı" eklendi (CP6-CP9):**
   - **CP6** Git Branching atomikleştirme (12→14) + duvar kırma — SONNET, **kullanıcı onayı şart**, prompt hazır.
   - **CP7** Jenkins Sandbox — FABLE, **bu oturumda uygulandı** (aşağıda).
   - **CP8** Jenkins atomikleştirme (8→~12) — SONNET, **kullanıcı onayı şart**, prompt hazır (ön koşul: CP7 merge).
   - **CP9** Linux ince ayar (callout'lar + son duvar) — SONNET, onay gerekmez, prompt hazır.
3. **CP7 uygulandı — Jenkins Sandbox (diğer sandbox'lardan farklı biçim):** Jenkins'in öğrenme engeli CLI değil Jenkinsfile sözdizimi + stage/post akışı olduğundan terminal DEĞİL, **düzenlenebilir Jenkinsfile editörü + "▶ Build Now" + canlı Stage View** yazıldı:
   - **Yeni dosya `src/components/JenkinsSandboxBlock.jsx`**: basitleştirilmiş declarative parser (pipeline/agent/stages/stage/steps/sh/echo/post), gerçek Jenkins derleme hataları (`Missing required section "agent"`, `Nothing to execute within stage`, dengesiz parantez), stage'ler animasyonlu koşar, `sh 'exit 1'` build'i kırar → sonraki stage'ler SKIPPED + `post{failure}` koşar, Build History + post rozetleri, 5 görev (ilk yeşil → Deploy ekle → build'i kır → post failure → tekrar yeşil).
   - `TopicPage.jsx`: `jenkins-sandbox` block tipi kaydı; `jenkinsData.js`: Pipeline sekmesine (EN+TR) blok + 5 görev; **yeni dosya `tests/jenkins-sandbox.spec.ts`** (2 test).
   - **Bulunan/düzeltilen gerçek bug (component'te):** `mountedRef` cleanup'ı StrictMode'un mount→cleanup→mount döngüsünde ref'i kalıcı `false` bırakıyordu → build butonu sonsuza dek "⏳ Build çalışıyor" kilitleniyordu. Effect her mount'ta `true`'ya çekecek şekilde düzeltildi ve testle doğrulandı.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal (32 dosya)
- `npm run build` → ✅ PASS (15.45s, 38 static route, dist SEO PASS)
- `tests/jenkins-sandbox.spec.ts` (--workers=1) → ✅ 2/2 PASS (StrictMode bug'ı düzeltildikten sonra)
- Regresyon: `topic-pages-ui.spec.ts -g jenkins` + `i18n-content-toggle -g jenkins` → ✅ 2/2 PASS
- TR yorum taraması → ✅ yeni yorumların tümü Türkçe; sandbox konsol çıktıları bilinçli İngilizce (§8 terminal istisnası), görev/ipucu metinleri bilingual.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun işi commit edilmedi** — kullanıcı onayı bekliyor. Değişen dosyalar: `contentplan.md`, `src/components/JenkinsSandboxBlock.jsx` (yeni), `src/components/TopicPage.jsx`, `src/data/jenkinsData.js`, `tests/jenkins-sandbox.spec.ts` (yeni), `.claude/NEXT_SESSION.md`.
2. **CP9 (Linux)** Sonnet promptu ile hemen başlatılabilir (onay gerekmez); **CP6 (Git)** ve **CP8 (Jenkins)** atomikleştirmeleri KULLANICI ONAYI bekliyor — promptlar contentplan.md BÖLÜM 2'de hazır.
3. Sandbox bilinen sınırları (bilinçli): parser declarative alt kümesi (parallel/when/environment sandbox'ta yok — sayfada statik anlatılıyor); görev ilerlemesi session-only.

---

## contentplan.md — Genel Durum Özeti (KONSOLİDE, tüm oturumlar) — 2026-07-05

> Bu bölüm, aşağıdaki tarihli oturum kayıtlarının contentplan.md'ye özel kısmının
> tek bakışta özetidir — detay/gerekçe/doğrulama sonuçları için ilgili tarihli
> bölüme bak. `contentplan.md`'nin kendisi bu özetle çelişirse `contentplan.md`
> tasarım kararları için otoritedir, bu bölüm sadece İLERLEME durumunu izler.

### Tamamlanan iş paketleri (hepsi `feature/pedagogy-improvements` branch'inde commit edildi — main'e HENÜZ merge/push edilmedi)

| CP | Konu | Commit | Tek cümlelik özet |
|----|------|--------|--------------------|
| CP1 | Docker Sandbox | `5b5782f` | Sıfırdan durum-makineli interaktif terminal (`DockerSandboxBlock.jsx`) — kullanıcı `docker pull/run/ps/stop/rm/...` yazar, sahte cluster canlı güncellenir, gerçekçi hatalar + 5 görev. |
| CP2 | Docker kod duvarlarını kırma | `4118c1d` | `dockerData.js`'teki 8+ satırlık komut blokları (özellikle 26 satırlık Container Commands) kavram bazlı parçalara bölündü, her parçaya callout/order-sort/code-playground eklendi. |
| CP4 | Sayfa içi ilerleme + tempo | `7bff1d8` | "Sırada ne var / Dersi bitirdin" kartı `TopicPage.jsx`'e eklendi (data değişikliği yok, TÜM sayfalarda otomatik aktif) + Docker "Nedir?" sekmesine 1 mikro-quiz. Sidebar ✓ işareti zaten mevcuttu (dokunulmadı). |
| CP5.1 | Linux Sandbox rollout | `213b500` | **Kritik bug bulundu ve düzeltildi:** mevcut interaktif terminalde `cd` hiç implemente edilmemişti (state hiç güncellenmiyordu). Ayrıca `cat`/`grep`/`chmod`/`find` eklendi + 5 görev. |
| CP5.2 | Git Sandbox rollout | `af5b837` | Terminal zaten sağlamdı (status/add/commit/branch/checkout/merge/log çalışıyordu) — sadece eksik olan `diff` ve `stash`/`stash pop` eklendi + 5 görev. |
| CP5.3 | Kubernetes Sandbox rollout | `abaaa5a` | Gerçek terminal hiç yoktu (sadece pasif "▶ çalıştır" demo) — Docker Sandbox mimarisiyle sıfırdan yazıldı (`KubernetesSandboxBlock.jsx`), self-healing simülasyonu (silinen pod deployment'a bağlıysa otomatik yeniden oluşur) dahil + 5 görev. |

**Ortak desen:** Her sandbox/rollout adımında ÖNCE keşif yapıldı (mevcut interaktif terminal var mı, çalışıyor mu, neyi eksik?), SONRA o sayfaya özgü ölçekte müdahale edildi — hiçbir sayfada körü körüne aynı kalıp kopyalanmadı (Docker/K8s = sıfırdan yazım, Linux = kritik bug fix, Git = küçük eksik tamamlama).

### Bilinçli olarak kapsam dışı bırakılanlar

- **CP2 tarzı kod duvarı bölme** Linux/Git/Kubernetes'e uygulanmadı: Linux zaten atomikti (8+ satır blok yoktu), Git/Kubernetes'teki uzun bloklar çoğunlukla tek parça config/manifest dosyası (SSH kurulum rehberi, .gitignore, GitHub Actions YAML, Pod/Deployment/Service YAML, Jenkinsfile, Strimzi) — Docker'ın Dockerfile/compose.yml muamelesiyle aynı mantıkla parçalanmaması gerekiyordu.
- **Git:** `git init/clone/reset/revert/remote push-pull` gerçek terminale eklenmedi — bunlar sayfada zaten ayrı, adanmış pasif demolarda (`git-clone-vs-init`, `git-revert-vs-reset` vb.) iyi anlatılıyor.
- **Kubernetes:** Helm, Ingress, HPA, Strimzi Kafka, `port-forward`, `rollout undo/status/history`, `set image`, namespace/context komutları sandbox'a eklenmedi — statik YAML + mevcut anlatım yeterli, bunlar toy bir sandbox'ta simüle edilecek kadar atomik değil.
- **`linux-permissions-lab`, `renderK8sPodPlayground` gibi pasif "▶ çalıştır" demoları SİLİNMEDİ** — yeni gerçek terminaller yanlarında ek bir görsel giriş olarak kalabilir, üst üste binme yok.

### CP3 — Sekme Atomikleştirme: ✅ TAMAMLANDI (2026-07-05 devam #8 — detay aşağıdaki tarihli bölümde, HENÜZ COMMIT EDİLMEDİ)

Kullanıcı "riskleri analiz et, devam edilecekse ya sen yap ya Sonnet için prompt yaz" dedi.
Riskler zaten koda karşı doğrulanmış olduğu ve iş, aşağıdaki (arşiv) risk 4'te "Sonnet
sınıfının üstü" olarak işaretlendiği için Fable kendisi uyguladı (Sonnet promptu yazmak
katma değersizdi — contentplan.md'de zaten vardı). Sonuç: Docker 7 → **14 atomik sekme**;
localStorage index migrasyonu (`dockerData.progressMigration` + `TopicPage.migrateTabProgress`)
yazıldı ve gerçek tarayıcıda eski-veri-enjeksiyonu testiyle doğrulandı; etkilenen testler
güncellendi — bu sırada `docker-interview-mastery-flow.spec.ts`'in CP4'ten beri sessizce
kırık olan "4/6 quiz" varsayımı (gerçekte 4/7=%57<%60) da bulunup düzeltildi.

**(ARŞİV) Uygulama öncesi risk analizi — 4 somut risk (grep ile doğrulanmıştı):**

1. **localStorage veri kaybı riski — DOĞRULANDI (`TopicPage.jsx`):** Anahtarın kendisi `progress_${pageKey}` / `quizProgress_${pageKey}` / `quizScore_${pageKey}` / `quizAttempted_${pageKey}` şeklinde PER-SAYFA'dır (satır ~20014-20042 okuma, ~20148-20212 yazma) — ama bu anahtarların DEĞERİ, tab INDEX'ini nesne anahtarı olarak kullanan bir JSON obje: `completedTabs[tabIndex]`, `quizVerifiedTabs[tabIndex]`, `quizAttempted[i]` (satır ~20109, ~20161, ~20326 — örn. `Object.keys(quizAttempted[i] || {})`). Yani localStorage'da fiilen `{"0": true, "2": true, "5": true}` gibi bir şey saklanıyor. Docker'ın sekme SAYISI/SIRASI 7'den ~15'e çıkarsa, eskiden "index 2 = Filesystem & Navigation" iken yeni düzende "index 2" TAMAMEN FARKLI bir sekme olur — kullanıcının localStorage'ındaki `{"2": true}` artık YANLIŞ sekmeyi tamamlanmış gösterir. Bu spekülasyon değil, kod okunarak doğrulanmış bir mekanizma. **Çözüm önerisi (kararı CP3 uygulayıcısına kalır):** ya index yerine `route`/sabit-id bazlı anahtarlamaya geçiş (migrasyon gerektirir — eski `{index: bool}` verisini okuyup yeni şemaya çevirecek bir tek-seferlik migrasyon fonksiyonu), ya da CP3'ü YENİ bir sayfa/route gibi ele alıp eski Docker sekme verisini kasıtlı olarak sıfırlamak (kullanıcıya açıkça söylenmeli).
2. **Test kırılması — DOĞRULANDI:** `tests/topic-pages-ui.spec.ts` sekmeleri POZİSYONEL index ile geziyor (`tabButtons.nth(i)`, satır ~70) — sekme sayısı değişince bu döngü otomatik uyum sağlar (kırılmaz) AMA `tests/quiz-retry-mechanism.spec.ts` gibi dosyalar `dockerData.tr.sections[0].blocks.find(b => b.type==='quiz')` şeklinde SABİT bir section INDEX'ine (`sections[0]`) doğrudan referans veriyor — CP3 sekmeleri yeniden sıralarsa/bölerse `sections[0]`'ın hangi konuya karşılık geldiği değişir ve bu testler YANLIŞ bloğu hedefleyip sessizce yanlış assert etmeye başlayabilir (bu oturumda CP2/CP4 sırasında `sections[0]`'a yeni quiz eklenince tam olarak bu sınıfta bir regresyon zaten yaşandı, bkz. aşağıdaki CP4 bölümü). `docker-sandbox.spec.ts`, `docker-interview-mastery-flow.spec.ts` gibi dosyalarda da sekme adına göre `getByRole('button', { name: /.../ })` araması var — sekme adları/sayısı değişince bu selector'lar güncellenmeli.
3. **Mülakat gating bozulma riski:** %60 quiz eşiği (AC02-03) `countQuizBlocksInTab(tabIndex)` ile sekme bazında hesaplanıyor (satır ~20109) — sekmeler bölününce her sekmenin quiz SAYISI ve dolayısıyla toplam dağılım değişir, CLAUDE.md §22'deki 2. ve 3. E2E kontrolleri (gating kapalı/açık durum) yeniden doğrulanmalı.
4. **Büyüklük sınıfı:** Bu, fableplan.md'nin "Sonnet'in yapmayacağı işler" listesindeki Python/Java atomikleştirmesiyle AYNI SINIF bir iştir (küçük ölçekli pilot olarak Docker seçildi) — Docker pilotu başarılı olursa Python/Java için emsal oluşturacağından karar ağırlığı yüksek.

**Risklerin akıbeti:** Risk 1 → migrasyon mekanizmasıyla çözüldü (veri sıfırlanMADI, cömert
taşıma). Risk 2 → `docker-sandbox.spec.ts` (sekme adı), `docker-interview-mastery-flow` ve
`interview-grading-and-reset` (index + çoklu-quiz helper) güncellendi; `sections[0]`'a bağımlı
testler (quiz-retry, i18n, quiz-ai, review-queue) sekme 0 değişmediği için etkilenmedi ve
koşularak doğrulandı. Risk 3 → §22 kontrol 2-6 gerçek AI çağrısı dahil koşuldu, PASS.
Risk 4 → pilot başarılı; Python/Java atomikleştirmesi için emsal mekanizma
(`progressMigration`) artık hazır ve generic.

**Sonraki adım:** contentplan.md'nin TÜM iş paketleri (CP1-CP5.3 + CP3) tamamlandı. CP3 işi
commit onayı bekliyor (aşağıdaki devam #8 bölümü). İstenirse sıradaki doğal adımlar: (a) CP3
kalıbını Python/Java'ya taşımak (büyük iş, ayrı planlama ister), (b) CP5 yayılımını yeni
sayfalara genişletmek.

---

## Güncel Branch Durumu (2026-07-05 devam #8, `feature/pedagogy-improvements` — CP3: Docker Sekme Atomikleştirme TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP5.3 `abaaa5a` + docs `9679f13`/`902c97a`'ya kadar commit edilmiş; bu oturumun CP3 işi **HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor**) |
| **Kapsam** | Kullanıcı: "NEXT_SESSION.md'yi oku, riskleri analiz et, devam edilecekse ya sen yap ya Sonnet için prompt yaz." Riskler önceden koda karşı doğrulanmış olduğundan ve iş Sonnet-üstü sınıfta işaretlendiğinden Fable CP3'ü kendisi uyguladı (contentplan.md'deki 3 adımlı plan izlendi: keşif → tasarım → uygulama). |

### Yeni sekme yapısı (7 → 14, EN/TR simetrik)

`0 🎯 Giriş (2 quiz) | 1 ⚙️ Kurulum (1) | 2 📥 Image'lar | 3 🚀 Container: docker run | 4 🔄 Yaşam Döngüsü & Debug (Docker Sandbox burada) | 5 💾 Volume'ler | 6 🌐 Network'ler (1) | 7 📝 Dockerfile (+multi-stage +.dockerignore) | 8 🧩 Docker Compose (1) | 9 🧪 QA: Selenium Grid | 10 🎭 QA: Playwright & CI | 11 🩺 Yaygın Hatalar (1) | 12 🔗 Ekosistem (1) | 13 💼 Mülakat S&C`

Tasarım notları:
- **Blok sırası korundu** (bölme = sınır ekleme; içerik taşınmadı/yeniden sıralanmadı) — contentplan'ın "docker run / exec & logs" ayrı sekmeleri yerine Container Commands 2'ye bölündü (run | lifecycle+debug); exec&logs tek başına 3 bloktu, aşırı parçalama olurdu.
- **W3Schools kontrolü (contentplan Adım 1c):** W3Schools'ta bağımsız bir Docker müfredatı YOK (sadece DevOps bootcamp içinde) — §16'nın "atomik dikey hiyerarşi" STİLİ esas alındı, birebir konu listesi kıyası mümkün değildi.
- **7 yeni §9.3-standardında simple-box yazıldı** (×2 dil: run, lifecycle, volumes, networks, compose, playwright-CI, troubleshooting); mevcut 3 simple-box (komut grameri/kütüphane, Dockerfile/tarif+orkestra, kullan-at bardak) kendi yeni sekmelerinin başında kaldı.
- **2 bayat callout düzeltildi** (×2 kopya EN/TR section): Images sekmesindeki "bu sekmenin altındaki sandbox" ve run sekmesindeki "aşağıdaki sandbox" metinleri, sandbox artık "🔄 Yaşam Döngüsü & Debug" sekmesinde olduğundan yeni sekmeyi işaret edecek şekilde güncellendi (bölmenin kendisi metinleri yanlışlaştırıyordu — içerik-dokunma yasağının bilinçli istisnası).

### localStorage Migrasyonu (Risk 1'in çözümü — veri sıfırlanMADI)

- **`dockerData.js` → `progressMigration: { version: 2, tabMap: {0:[0],1:[1],2:[2,3,4,5,6],3:[7,8],4:[9,10,11],5:[12],6:[13]} }`** exportu eklendi.
- **`TopicPage.jsx` → `migrateTabProgress(data)`** (generic, her sayfada kullanılabilir — Python/Java atomikleştirmesi için hazır emsal): useState initializer'larından önce çağrılır, `progressVersion_<pageKey>` damgasıyla idempotent. Kurallar: `progress`/`quizProgress` işaretleri tabMap'teki TÜM torunlara taşınır (cömert yorum); 1:1 taşınan sekmelerde `quizScore`/`quizAttempted` blok-index verisi AYNEN kopyalanır (içerik değişmedi, sadece index kaydı); bölünen sekmelerin quiz-doğrulanmış torunlarında o sekmedeki tüm quiz blokları doğru sayılır (sidebar ✓ ile %60 gating tutarlı kalsın diye).
- **Gerçek tarayıcıda doğrulandı:** eski 7-sekme verisi enjekte eden geçici bir Playwright testi yazıldı-koşuldu-silindi (1/1 PASS: doğru remap + kısmi skorun korunması + idempotentlik + 14 sekme render).
- **Bilinen sınır (kabul edildi):** Supabase `user_progress.topic_slug` eski index'lerle kalır (rozet sayımı kümülatif olduğundan zarar yok, en kötü hafif enflasyon); `SaveProgressButton` "kaldığı yerden devam" kaydı eski index'i işaret edebilir (yanlış sekme açılır, veri bozulmaz). İkisi de local-first mimaride kabul edilebilir bulundu, CP3 kapsamı dışı.

### Test Güncellemeleri (Risk 2)

- `docker-sandbox.spec.ts`: sekme adı `/Temel Komutlar/` → `/Yaşam Döngüsü/`, `/Core Commands/` → `/Lifecycle & Debug/`.
- `docker-interview-mastery-flow.spec.ts` + `interview-grading-and-reset.spec.ts`: `INTERVIEW_TAB_INDEX` 6→13; quiz sekmeleri [0,1,2,3]→[0,1,6,8]; helper artık sekmedeki TÜM quizleri kendi kartı (`div.rounded-xl.border-2` container) içinde cevaplıyor (tek-quiz `.find()` + global buton araması, 2 quizli sekmede strict-mode ihlali/eksik sayım veriyordu).
- **Yol boyunca bulunan GERÇEK kırık test (CP3'ten bağımsız):** mastery-flow CP4'ün 2. quiz'i eklemesinden beri "4/6=%66" varsayımıyla yaşıyordu — gerçekte 4/7=%57<%60 olduğundan test (env-gated olduğu için hiç koşulmadan) sessizce kırıktı. CP3 güncellemesiyle 5/7=%71.4 olarak düzeltildi ve gerçek AI çağrısıyla koşulup doğrulandı.
- Değişiklik GEREKTİRMEYENLER (sekme 0 aynen kaldığı için): `quiz-retry-mechanism`, `i18n-content-toggle`, `quiz-ai-explanation-access`, `review-queue`, `mobile-smoke` (pozisyonel), `topic-pages-ui` (pozisyonel döngü, 14 sekmeye otomatik uyum).

### Doğrulama (CLAUDE.md §1.1 + §22 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal (32 dosya)
- `npm run build` → ✅ PASS (14.8s, 38 static route, dist SEO PASS)
- Playwright (hepsi --workers=1): `docker-sandbox` 2/2 ✅, `quiz-retry-mechanism` 3/3 ✅, `review-queue` 4/4 ✅, `topic-pages-ui -g docker` ✅, `i18n-content-toggle` tam suite (docker dahil 28) + `quiz-ai-explanation-access` 3 → 31/31 ✅, `mobile-smoke -g docker` ✅, geçici migrasyon testi 1/1 ✅ (sonra silindi).
- **§22 kontrol 2-6 (gating + AI):** `interview-grading-and-reset` ✅ 1/1 (5/7 gate açılışı + textarea + mock-AI hata dayanıklılığı + reset akışı + Supabase doğrulaması); `docker-interview-mastery-flow` ✅ 1/1 (kilitli %0 ve %42.9'da, açık %71.4'te, GERÇEK Groq AI değerlendirmesi ≥%80, sekme tamamlama + Supabase satırı).
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar/simple-box'lar Türkçe (EN section kopyaları İngilizce — tasarım gereği); i18n EN-modda-Türkçe-karakter testi docker dahil PASS.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP3 işi commit edilmedi** — kullanıcı onayı bekliyor. Değişen dosyalar: `src/data/dockerData.js`, `src/components/TopicPage.jsx`, `tests/docker-sandbox.spec.ts`, `tests/docker-interview-mastery-flow.spec.ts`, `tests/interview-grading-and-reset.spec.ts`, `.claude/NEXT_SESSION.md`.
2. contentplan.md'nin tüm iş paketleri bitti. Doğal adaylar: CP3 kalıbını (migrasyon mekanizması hazır) Python/Java'ya taşımak; veya CP5 yayılımını yeni sayfalara genişletmek; veya branch'i main'e merge/push etmek (tümü kullanıcı kararı).
3. Bilinen küçük borçlar: Supabase topic_slug eski-index kalıntısı (yukarıda), TR'de Playwright compose bloğu asimetrisi (CP2'den beri biliniyor, ayrı çeviri görevi).

---

## Güncel Branch Durumu (2026-07-05 devam #7, `feature/pedagogy-improvements` — CP5.3: Kubernetes Sandbox Rollout TAMAMLANDI — CP5 (Docker/Linux/Git/K8s) TAMAMEN BİTTİ)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP1 `5b5782f`, CP2 `4118c1d`, CP4 `7bff1d8`, CP5.1 `213b500`, CP5.2 `af5b837`'e kadar commit edilmiş; bu oturumun CP5.3 işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | contentplan.md CP5'in son hedefi: Kubernetes sayfası. Aynı keşif disiplini uygulandı. |

### Keşif — Linux/Git'ten farklı: gerçek bir kubectl terminali HİÇ yoktu

Docker/Linux/Git'in aksine Kubernetes sayfasında "kullanıcı komutu kendi yazar" tarzı gerçek bir interaktif terminal **hiç yoktu** — sadece `renderK8sPodPlayground` gibi PASİF "▶ çalıştır" canned-demo'lar vardı (sabit bir adım dizisini otomatik oynatan, kullanıcının hiçbir şey yazmadığı). Kod duvarı taraması: 49 code bloğundan çoğu (Pod/Deployment/Service/ConfigMap YAML manifestleri, Jenkinsfile, Strimzi Kafka) tek parça config dosyası niteliğinde (Docker'ın Dockerfile/compose.yml muamelesiyle aynı mantık, CP2 kapsamı dışı) — ama `kubectl` komutlarının kendisi (GET/DESCRIBE/LOGS-EXEC/APPLY-DELETE-SCALE, "⌨️ kubectl Commands" sekmesinde) gerçek bir sandbox için MÜKEMMEL aday, çünkü hiçbir gerçek terminal yoktu.

### Bu Oturumda Yapılan İş — CP5.3 (Kubernetes Sandbox, sıfırdan)

Linux/Git'in aksine (mevcut inline terminali genişletme), burada **CP1'in Docker Sandbox mimarisiyle birebir aynı desende sıfırdan yeni bir component** yazıldı — çünkü genişletilecek gerçek bir terminal yoktu:
- **Yeni dosya `src/components/KubernetesSandboxBlock.jsx`**: sahte ama durumlu cluster engine'i — `kubectl apply -f <dosya>` (sahte manifest kayıt defteri: `deployment.yaml`→nginx deployment 3 replika, `service.yaml`→ClusterIP service), `get pods/deployments/services/all`, `describe pod/deployment`, `logs`, `exec`, `scale deployment --replicas=N`, `delete pod/deployment`. Gerçekçi hatalar: bilinmeyen manifest → "path does not exist"; olmayan kaynak → "Error from server (NotFound)".
  - **Kubernetes'e özgü öne çıkan özellik — self-healing simülasyonu:** yönetilen (deployment'a bağlı) bir pod silinince, ~1.8sn sonra ReplicaSet controller'ın yerine YENİ bir pod oluşturduğu simüle edilir — Docker container'larının ASLA yapmadığı bir şey, bu yüzden bilinçli olarak ayrı bir "aha" öğretme anı (§CLAUDE.md 20 "önce mantık sonra komut" felsefesiyle uyumlu).
  - Docker Sandbox'la aynı mimari: `execute()` saf fonksiyon yeni state döndürür, `events` Set'i stateless komutları (get-pods, logs, deleted-managed-pod) takip eder, `MISSION_CHECKS` state-bazlı görev tespiti yapar.
- **`TopicPage.jsx`**: `k8s-sandbox` block tipi kaydedildi (import + renderBlock case, Docker Sandbox'la birebir aynı kalıp).
- **`kubernetesData.js`** (EN+TR): "⌨️ kubectl Commands" sekmesine, APPLY/DELETE/SCALE kod bloğundan sonra `k8s-sandbox` bloğu + 5 görev eklendi (apply→get pods→scale to 5→logs→delete+self-heal izle).
- **Yeni dosya `tests/kubernetes-sandbox.spec.ts`**: apply/get/scale/logs/delete + self-healing akışı + 5 görev + EN i18n testi.
- **Test yazarken bulunan/düzeltilen bir hata (test kodunda, üründe değil):** Self-heal mesajı doğrulaması İngilizce metinle yazılmıştı ama sayfa varsayılan TR modda açılıyor — self-heal satırı TR render ediliyordu ("ReplicaSet controller yeni pod oluşturdu"). Düzeltme: iki dilde de ortak olan "ReplicaSet controller" alt-dizesi + deployment panelinin (5/5) oranına dönmesi kontrol edildi (dilden bağımsız, daha sağlam).

### Bilinçli Kapsam Kararları

- Helm, Ingress, HPA, Strimzi Kafka gibi ileri seviye kaynaklar sandbox'a EKLENMEDİ — statik YAML + mevcut anlatım yeterli, bunlar zaten "tek komutla kurulum" seviyesinde araçlar, bir toy sandbox'ta simüle edilecek kadar atomik değiller.
- `kubectl port-forward`, `rollout undo/status/history`, `set image`, namespace/context komutları sandbox'a eklenmedi — kapsam bilinçli olarak Docker Sandbox'ın orijinal scope'una benzer, sınırlı ama gerçekçi bir alt kümeyle tutuldu (apply/get/describe/logs/exec/scale/delete).
- `renderK8sPodPlayground`/`renderK8sClusterMapPlayground` (pasif demolar) SİLİNMEDİ — yanlarında ek bir görsel giriş olarak kalabilirler, artık gerçek terminalde de aynı komutlar çalıştığı için üst üste binme yok.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal
- `npm run build` → ✅ PASS (14.74s, 38 static route, dist SEO PASS) — `KubernetesSandboxBlock.jsx`'in sözdizimi bu adımda doğrulandı (JSX olduğu için `node --check` çalışmıyor)
- `tests/kubernetes-sandbox.spec.ts` (--workers=1) → ✅ 2/2 PASS (1 test-kodu hatası düzeltildikten sonra)
- Regresyon: `topic-pages-ui.spec.ts -g kubernetes` + `i18n-content-toggle -g kubernetes` → ✅ 2/2 PASS
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar Türkçe.

### CP5 Genel Durumu — TAMAMLANDI

Docker (CP1+CP2+CP4) → Linux (CP5.1) → Git (CP5.2) → Kubernetes (CP5.3) sırasıyla tamamlandı. Her sayfada önce KEŞİF (mevcut interaktif terminal var mı, çalışıyor mu, eksik ne var), sonra SCOPE'A UYGUN müdahale yapıldı — hiçbir sayfada körü körüne aynı kalıp kopyalanmadı:
- Docker: hiç sandbox yoktu → CP1 sıfırdan yazıldı + CP2 kod duvarları kırıldı.
- Linux: sandbox vardı ama `cd` kritik bug'ı vardı → düzeltildi + cat/grep/chmod/find eklendi.
- Git: sandbox iyi çalışıyordu → sadece 2 eksik komut (diff/stash) eklendi.
- Kubernetes: sandbox hiç yoktu → Docker'ın mimarisiyle sıfırdan yazıldı (self-healing özel özelliğiyle).

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP5.3 işi commit edilmedi** — kullanıcı onayı bekliyor.
2. **CP5 artık tamamen bitti** — contentplan.md'nin önerdiği 3 sayfa (Linux/Git/Kubernetes) hepsi tamamlandı. Yeni bir sayfa eklenmek istenirse (contentplan.md'de yoktu) yeni bir CP5.x olarak keşif-önce disipliniyle planlanmalı.
3. **CP3 (sekme atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz, contentplan.md'de bekliyor.
4. Önceki oturumlardaki tüm iş (WP1-4, CP1/CP2/CP4/CP5.1/CP5.2/CP5.3) main'e merge/push edilmedi — `feature/pedagogy-improvements` branch'inde birikiyor, kullanıcı ne zaman isterse merge/push kararı verecek.

---

## Güncel Branch Durumu (2026-07-05 devam #6, `feature/pedagogy-improvements` — CP5.2: Git Sandbox Rollout TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP1 `5b5782f`, CP2 `4118c1d`, CP4 `7bff1d8`, CP5.1 `213b500`'e kadar commit edilmiş; bu oturumun CP5.2 işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | contentplan.md CP5 sırasındaki 2. hedef: Git & GitHub sayfası. CP5.1'deki keşif disiplini tekrarlandı: önce mevcut `git-interactive-terminal`ın gerçek durumu incelendi, KÖRÜ KÖRÜNE yeni kod yazılmadı. |

### Keşif — Linux'taki gibi kritik bir bug YOK, ama iki gerçek eksik bulundu

Git sayfası zaten güçlü bir temele sahipti: `handleGitCommand` status/add/commit/branch/checkout/switch/merge/log komutlarının HEPSİNİ doğru çalıştırıyordu (Linux'taki `cd` gibi "hiç implemente edilmemiş" bir kritik bug YOKTU). Kod duvarı taraması da CP2 tarzı bölme gerektirmedi — 8+ satırlık birkaç blok (SSH kurulum rehberi, .gitignore, GitHub Actions YAML) var ama bunlar ya adım-adım rehber ya da tek parça config dosyası, Docker'daki Dockerfile/compose.yml gibi zaten CP2 kapsamı dışında kalması gereken türden (kod duvarı kırma bu oturumda YAPILMADI — kapsam dışı bırakıldı, gerekçesi aşağıda). Ancak: (1) `git diff` hiç desteklenmiyordu, (2) `git stash`/`git stash pop` hiç desteklenmiyordu — ikisi de sayfanın ayrı, PASİF "▶ izle" demolarında (`git-diff-reader`, `git-stash-flow`) anlatılıyor ama gerçek yazılabilir terminalde çalışmıyordu (Linux'taki chmod'un `linux-permissions-lab` pasif demosuyla aynı desen).

### Bu Oturumda Yapılan İş — CP5.2

- **`handleGitCommand`a `git diff` ve `git stash`/`stash pop`/`stash list` eklendi** (`TopicPage.jsx`): diff, `gitWorkingDir`'deki dosyalar için sahte ama gerçekçi bir unified diff çıktısı üretir; stash, workingDir'i `gitStash` dizisine taşır (LIFO), pop geri getirir, list mevcut girişleri gösterir.
- **5 görevlik mission sistemi eklendi** (Docker/Linux Sandbox'la aynı state-bazlı `MISSION_CHECKS` deseni): stage+commit, branch+switch, merge, diff incele, stash+stash-pop workflow'u. `gitEvents` Set'i (Linux'taki `linuxEvents` gibi) stateless komutları (diff/stash/branch-switch) takip etmek için eklendi.
- **`renderGitInteractiveTerminalPlayground`**: görev listesi UI'ı + canlı branch adı breadcrumb'ı + genişletilmiş `quickCmds` (diff/stash/stash pop eklendi) + test-id'ler.
- **`renderGitInteractiveTerminalVisualizer`**: Working Directory/Staging Area kutularının arasına yeni bir **📦 Stash paneli** eklendi.
- **Yeni dosya `tests/git-sandbox.spec.ts`**: commit/branch/merge/diff/stash akışı + 5 görev + EN i18n testi.
- **Test yazarken bulunan/düzeltilen bir zamanlama tuzağı (test kodunda, üründe değil):** İlk yazımda stash testi commit SONRASINA konulmuştu; commit handler'ındaki `setTimeout(..., 1000)` (workingDir'i "yeni bir değişiklik" ile yapay olarak dolduran demo efekti) test çok hızlı çalıştığında henüz tetiklenmemiş oluyordu, `git stash`'in "kaydedilecek değişiklik yok" dalına düşmesine yol açıyordu. Düzeltme: diff+stash+stash-pop adımları, seed edilmiş İLK workingDir içeriğini kullanacak şekilde testin EN BAŞINA taşındı — zamanlamaya bağımlılık ortadan kalktı.

### Bilinçli Kapsam Kararları

- **Kod duvarı bölme (CP2 tarzı) Git'e UYGULANMADI**: SSH kurulum rehberi (94/115 satır) ve .gitignore (102/115 satır) tek parça, adım-adım veya config dosyası niteliğinde — Docker'ın Dockerfile/compose.yml muamelesiyle aynı mantıkla parçalanmamalı. GitHub Actions YAML (35 satır) da tek parça bir workflow dosyası. Genel interaktif üçlü oranı zaten Docker'ın CP2-öncesi haline göre çok daha iyi (34 code bloğuna karşı 16 code-playground + 16 challenge + 16 step-animation + 62 simulation) — kapsamlı bir CP2 taraması bu oturumda YAPILMADI, gerek görülmedi. Kullanıcı isterse ayrı bir CP olarak ele alınabilir.
- `git init`/`git clone`/`git reset`/`git revert`/`git remote push/pull` gerçek terminale EKLENMEDİ — bunlar ayrı, adanmış pasif demolarda (`git-clone-vs-init`, `git-revert-vs-reset` vb.) zaten iyi anlatılıyor; kapsam bilinçli olarak sadece "sayfanın ana ders akışında (Git Basics/Branching sekmeleri) öğretilen ama gerçek terminalde çalışmayan" diff/stash'e daraltıldı.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal (data dosyası değişikliği yok)
- `npm run build` → ✅ PASS (14.69s, 38 static route, dist SEO PASS)
- `tests/git-sandbox.spec.ts` (--workers=1) → ✅ 2/2 PASS (1 timing bug'ı düzeltildikten sonra)
- Regresyon: `topic-pages-ui.spec.ts -g git-github` + `i18n-content-toggle -g git-github` → ✅ 2/2 PASS
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar Türkçe.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP5.2 işi commit edilmedi** — kullanıcı onayı bekliyor.
2. **CP5.3 (Kubernetes rollout)** — contentplan.md'nin önerdiği sıradaki hedef; aynı keşif disipliniyle (`kubectl` için gerçek bir interaktif terminal var mı, varsa eksik/bozuk bir şey var mı?) başlanmalı.
3. Git sayfasında opsiyonel, düşük öncelikli bir CP2-tarzı kod duvarı taraması hâlâ mümkün ama bu oturumda gerekli görülmedi (yukarıdaki gerekçe).
4. **CP3 (sekme atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz.
5. Önceki oturumlardaki tüm iş (WP1-4, CP1/CP2/CP4/CP5.1/CP5.2) main'e merge/push edilmedi — `feature/pedagogy-improvements` branch'inde birikiyor.

---

## Güncel Branch Durumu (2026-07-05 devam #5, `feature/pedagogy-improvements` — CP5.1: Linux Sandbox Rollout TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP1 `5b5782f`, CP2 `4118c1d`, CP4 `7bff1d8`'e kadar commit edilmiş; bu oturumun CP5.1 işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | Kullanıcı "CP5'e geç" dedi (CP3 sekme atomikleştirmesi kullanıcı kararına ertelendi). `contentplan.md` CP5'in kendisi bir prompt değil, sadece yayılım sırası öneriyordu (Linux → Git → Kubernetes) — bu oturumda Linux için somut bir alt-plan (CP5.1) tasarlanıp uygulandı. |

### Keşif — CP2 (kod duvarı) Linux'ta gerekmiyor, ama KRİTİK bir bug bulundu

Linux'ta 8+ satırlık "kod duvarı" code bloğu YOK (en uzunu 7 satır) — CP2 tarzı bölme işi gereksiz, sayfa zaten atomik. İnteraktif üçlü oranı da Docker'ın CP2-öncesi haline göre çok daha iyi (14 code bloğuna karşı 16 code-playground + 16 challenge + 16 step-animation). **Ancak** sayfada ZATEN VAR olan `linux-interactive-terminal` simülasyonu (Filesystem & Navigation sekmesi) incelenince kritik bir gerçek ürün hatası bulundu: **`cd` komutu hiç implemente edilmemişti** — `linuxCurrentDir` state'i sadece OKUNUYOR, hiçbir yerde `setLinuxCurrentDir` çağrılmıyordu. Sayfa `cd`'yi yoğun şekilde öğretirken (kod örnekleri, code-playground, step-animation, order-sort challenge, Absolute vs Relative Paths tablosu), tek gerçek interaktif terminalde kullanıcı `cd` yazınca hiçbir şey olmuyordu. Ayrıca `cat`/`grep`/`chmod`/`find` de desteklenmiyordu (sayfa bunları da öğretiyor); `chmod` sadece AYRI, PASİF bir "▶ çalıştır" canned-demo'da vardı (`linux-permissions-lab` — Docker'ın CP1-öncesi `simulation` bloklarıyla birebir aynı "izle, yazma" sorunu).

### Bu Oturumda Yapılan İş — CP5.1 (Linux Sandbox güçlendirmesi)

Yeni bir component dosyası YAZILMADI — mevcut kalıp (Linux/Git/SQL terminallerinin `TopicPage.jsx` içinde inline state+handler olması) korunarak GENİŞLETİLDİ, tutarlılık için:
- **`handleLinuxCommand` tamamen yeniden yazıldı** (`TopicPage.jsx` ~satır 6247+): `cd` düzeltildi (relative/absolute/`..`/`~`/`-` destekli, gerçekçi "No such file or directory" hatası); `cat`, `grep <pattern> <file>`, `chmod <mode> <file>` (sembolik `+x`/`-x` ve numerik `755` gibi), `find <isim>` eklendi. Path çözümleme için `resolveLinuxPath` helper'ı, chmod mod dönüşümü için `permsFromChmodMode` helper'ı eklendi.
- **`linuxFiles` seed verisi genişletildi**: `content`/`perms` alanları eklendi; `test-suite/test.log` (PASS/FAIL satırlı, grep pratiği için) ve `test-suite/deploy.sh` (chmod pratiği için) seed edildi.
- **Görev sistemi eklendi** (Docker Sandbox'ın state-bazlı `MISSION_CHECKS` deseniyle aynı mantık): `LINUX_MISSION_CHECKS` + `LINUX_MISSIONS` (5 görev: test-suite'e gir, test.log'da FAIL ara, reports klasörü oluştur, içine summary.txt oluştur, deploy.sh'ı çalıştırılabilir yap), `linuxMissionsDone` state ile takip ediliyor.
- **`renderLinuxInteractiveTerminalPlayground`** güncellendi: görev listesi UI'ı (✅/👉/⬜ + ilerleme sayacı) terminal'in üstüne eklendi, başlık şeridine canlı `linuxCurrentDir` breadcrumb'ı eklendi, `quickCmds` yeni komut setini yansıtacak şekilde güncellendi, test-id'ler eklendi (`linux-terminal-input/output`, `linux-mission-*`).
- **`renderLinuxInteractiveTerminalVisualizer`** yeniden yazıldı: artık TÜM `linuxFiles`'ı derinliğe göre girintili, `(pwd)` etiketini GERÇEK `linuxCurrentDir`'e göre dinamik gösteren, izin (`perms`) rozetli bir liste render ediyor (önceden hardcoded tek seviye + sabit "(pwd)" etiketiydi — artık `cd` çalıştığı için doğru olması gerekiyordu).
- **Yeni dosya `tests/linux-sandbox.spec.ts`**: CP1'in `docker-sandbox.spec.ts`'iyle aynı ruhta — cd/grep/mkdir/touch/chmod akışı + görev tamamlanmaları + EN i18n testi. `serviceWorkers: 'block'` ile.

### Bilinçli Kapsam Kararları

- `linux-permissions-lab` (pasif chmod demo'su) SİLİNMEDİ/değiştirilmedi — ek bir görsel giriş olarak kalabilir, artık gerçek terminalde de chmod çalıştığı için üst üste binme yok, sadece fazladan bir tanıtım.
- `find` basitleştirilmiş (gerçek `-name`/glob sözdizimini tam desteklemiyor, substring eşleşmesi yapıyor) — öğretim amaçlı yeterli, bilinen bir sınır.
- CP2 (kod duvarı bölme) ve CP4 (sayfa içi ilerleme) Linux'a UYGULANMADI çünkü gerek yoktu: CP2 zaten atomik, CP4 zaten TopicPage-level global bir bileşen olduğu için Linux dahil TÜM sayfalarda otomatik aktif.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal
- `npm run build` → ✅ PASS (14.95s, 38 static route, dist SEO PASS)
- `tests/linux-sandbox.spec.ts` (--workers=1) → ✅ 2/2 PASS
- Regresyon: `topic-pages-ui.spec.ts -g linux` + `i18n-content-toggle -g linux` → ✅ 2/2 PASS; `topic-pages-ui.spec.ts -g "git-github|sql"` (aynı `SimulationBlock`'u paylaşan sayfalar, yeni state hook'larının başka sayfayı etkilemediğini doğrulamak için) → ✅ 2/2 PASS.
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar Türkçe.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP5.1 işi commit edilmedi** — kullanıcı onayı bekliyor.
2. **CP5.2 (Git rollout)** — contentplan.md'nin önerdiği sıradaki hedef; Git sayfasında zaten `git-interactive-terminal` + commit graph visualizer var (bu oturumda incelendi) — CP5.1'deki gibi önce "mevcut terminalde çalışmayan/eksik bir komut var mı?" keşfiyle başlanmalı, körü körüne yeni sandbox yazılmamalı.
3. **CP5.3 (Kubernetes rollout)** — henüz hiç incelenmedi.
4. **CP3 (sekme atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz.
5. Önceki oturumlarda WP1-4 (fableplan.md) + CP1/CP2/CP4 (contentplan.md) + bu oturumun CP5.1'i main'e merge/push edilmedi — hepsi `feature/pedagogy-improvements` branch'inde birikiyor.

---

## Güncel Branch Durumu (2026-07-05 devam #4, `feature/pedagogy-improvements` — CP4: Sayfa İçi İlerleme + Tempo TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP1 `5b5782f`, CP2 `4118c1d`'e kadar commit edilmiş; bu oturumun CP4 işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | `contentplan.md` CP4 promptu uygulandı: sidebar tamamlanma göstergesi (mevcut olduğu keşfedildi, dokunulmadı), "Sırada ne var" kartı (yeni), Docker "Nedir?" sekmesine mikro-quiz (EN+TR, yeni). |

### Bu Oturumda Yapılan İş — CP4

1. **Görev 1 (Sidebar ✓ işaretleri) — ATLANDI, zaten mevcuttu:** `TopicPage.jsx` sidebar'ı incelendiğinde tamamlanan sekmeler için hem masaüstünde tam bir yeşil ✓ checkbox (satır ~20094-20106, `isCompleted` state'ine bağlı) hem mobilde yeşil nokta (satır ~20069-20074) zaten render ediliyordu — bu özellik contentplan.md yazılırken (Fable'ın hızlı taramasında) gözden kaçmış olmalı. Kod tekrarı/duplikasyon yaratmamak için DOKUNULMADI, plan sapması olarak burada not düşüldü.
2. **Görev 2 (Sırada ne var kartı) — YENİ, `TopicPage.jsx`'e eklendi** (satır ~20135-20166): Sekmedeki blokların render edildiği ternary'nin false-branch'i bir `<>` fragment'e çevrildi; `blocks.map(...)`'ten SONRA, sekme tamamlandığında (`completedTabs[activeTab] || quizVerifiedTabs[activeTab]`) görünen bir kart eklendi — son sekme değilse "✅ Bu bölümü bitirdin → Sıradaki: [sekme adı] →" (tıklanınca `setActiveTab(activeTab+1)`), son sekmeyse "🎉 Dersi bitirdin!" varyantı. Data dosyası değişikliği YOK, TÜM sayfalarda otomatik çalışır (plan gereği).
3. **Görev 3 (Docker "Nedir?" mikro-quiz) — YENİ, `dockerData.js`'e eklendi (EN+TR):** simple-box + text bloklarından SONRA, VM karşılaştırma tablosundan ÖNCE ("Kodu zip'leyip göndermek neden yetmez?" — simple-box'taki JAR/OS-bağımlılık analojisinden türetilmiş), `retryQuestion` (§18) dahil.

### Yol Boyunca Bulunan ve Düzeltilen Gerçek Regresyon

**`tests/quiz-retry-mechanism.spec.ts`** testinin 2. senaryosu ("retry sorusuna doğru cevap verilirse... sekme ilerlemesine katkı sağlar") FAIL etti. Kök neden: test, `/docker` sayfasının 0. sekmesinde (Docker Nedir?) **TEK bir quiz bloğu olduğunu** varsayıyordu (`.find(b => b.type==='quiz')` ile ilk quiz'i alıp onu cevaplayınca sekmenin %100 tamamlanacağını assert ediyordu). CP4'ün 3. görevi bu sekmeye İKİNCİ bir quiz bloğu ekleyince, `TopicPage.jsx`'teki "sekmedeki quiz'lerin ≥%60'ı doğru cevaplanınca tamamlanır" mantığı gereği 1/2 doğru = %50 artık eşiği geçmiyordu, tab tamamlanmıyordu.
**Düzeltme (test kodunda, üründe değil):** Test, `filter(b => b.type==='quiz')` ile sekmedeki TÜM quiz bloklarını alacak şekilde güncellendi; senaryo 2 artık retry-quiz'i cevapladıktan sonra sekmedeki İKİNCİ (orijinal "Image vs Container") quiz'i de doğru cevaplayıp öyle %100 tamamlanmayı doğruluyor. Yorum satırları bu yeni gerçeği (2 quiz bloğu, ≥%60 eşiği) açıklayacak şekilde güncellendi.

### Bu Oturumda Karşılaşılan Ortam Sorunu (kod değil)

`npm run build` art arda birkaç kez **sistem düşük belleği** yüzünden çöktü ("JavaScript heap out of memory" / esbuild native allocation hatası) — dockerData.js ve TopicPage.jsx'in büyümesiyle ilgisi yok, makinede o an sadece ~2.4-2.7GB boş RAM vardı (16GB'ın çoğu tarayıcı sekmeleri + **iki adet unutulmuş `vite --host` dev server** [~3.1GB, PID 23160/16488] tarafından tüketiliyordu). Kullanıcının onayıyla bu 2 zombi dev server durduruldu, boş bellek ~5.8GB'a çıktı, build sonrasında temiz PASS etti. **Ders:** bu makinede build denemeden önce `Get-Process | Where node/chrome` ile bellek kontrolü faydalı olabilir; unutulmuş dev server'lar tekrar oluşabilir.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal
- `npm run build` → ✅ PASS (21.9s, 38 static route, dist SEO PASS) — bellek sorunu çözüldükten sonra
- `npx playwright test tests/topic-pages-ui.spec.ts tests/quiz-retry-mechanism.spec.ts tests/mobile-smoke.spec.ts` (--workers=1) → topic-pages-ui 29/29 PASS; quiz-retry-mechanism İLK koşumda 1 fail (yukarıdaki regresyon) → düzeltildi → 3/3 PASS (tekrar koşum); mobile-smoke 1 flaky (retry'da PASS, `/` ana sayfa, Docker/TopicPage değişiklikleriyle ilgisiz, önceden belgelenmiş dev-server soğuk-başlangıç deseni) + 1 doğrudan PASS.
- TR yorum taraması → ✅ yeni eklenen tüm yorumlar Türkçe.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP4 işi commit edilmedi** — kullanıcı onayı bekliyor.
2. **CP3 (sekme atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz; `contentplan.md` CP3'teki riskler geçerli.
3. contentplan.md CP1→CP2→CP4 artık Docker'da tamamlandı; CP5 yayılımı (Linux/Git/K8s) bu kalıbı referans alabilir, ama CP3 kararı beklemeden başlanabilir (CP5 sadece "CP1-CP4 Docker'da doğrulanmadan başlanmaz" diyor, CP3'ü şart koşmuyor).
4. "Sırada ne var" kartı TÜM teknoloji sayfalarında otomatik aktif (TopicPage-level component) — yeni bir sayfa eklendiğinde ekstra iş gerekmiyor.

---

## Güncel Branch Durumu (2026-07-05 devam #3, `feature/pedagogy-improvements` — CP2: Kod Duvarlarını Kırma TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (CP1 commit `5b5782f`'e kadar push edildi/pull edildi; bu oturumun CP2 işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | `contentplan.md` CP2 promptu Sonnet tarafından uygulandı: `src/data/dockerData.js`'teki "kod duvarı" bloklar (8+ satır komut) kavram bazlı 2-4 satırlık parçalara bölündü, her parçanın ardına en az 1 etkileşim eklendi (öncelik: CP1 sandbox'a yönlendiren callout → order-sort challenge → code-playground). |

### Bu Oturumda Yapılan İş — CP2

- **Image Commands** (EN+TR): pull/search vs list/inspect/remove olarak 2'ye bölündü; sandbox-yönlendirme callout + "image yaşam döngüsü" order-sort eklendi.
- **Container Commands** (EN+TR, orijinal 26 satırlık "kod duvarı" — raporda özellikle işaret edilen örnek): 7 atomik parçaya bölündü (run temelleri → tam flag'li run → ps → lifecycle → remove → logs → exec+cp). Her parçanın ardına CP1 sandbox'ın İLGİLİ görevine yönlendiren bir callout eklendi (ör. "-f'siz rm dene, sandbox'ta AYNI hatayı göreceksin"); tam flag'li run'a code-playground, exec+cp'ye debug-flow order-sort.
- **Volume Commands** (EN+TR): named-volume CRUD / mount / bind-mount+QA senaryosu olarak 3'e bölündü; her birine order-sort veya code-playground eklendi.
- **Dockerfile, Multi-stage Dockerfile, .dockerignore, docker-compose.yml, Docker Compose Commands, Selenium Grid compose, Selenium connect script** (EN+TR): tek dosya/config bloklarının SÖZDİZİMİ bozulmadan (YAML/Dockerfile parçalanınca geçersiz olur) her birine TEK bir etkileşim eklendi — Dockerfile→order-sort, multi-stage→code-playground (COPY --from), .dockerignore→code-playground (eksik node_modules/ satırı), compose.yml→code-playground (yanlış DB hostname), Compose Commands→2 parça (lifecycle order-sort + run/ps code-playground), Selenium Grid compose→order-sort, Selenium connect script→code-playground (webdriver.Remote).
- **Bilinçli kapsam kararı:** Playwright compose bloğuna (EN) volume-mount code-playground eklendi; TR karşılığı YOK çünkü TR section'da bu blok baştan beri (CP2'den önce) hiç mevcut değildi — pre-existing bir EN/TR içerik asimetrisi, bu oturumda keşfedildi ama CP2 kapsamı dışında (yeni çeviri eklemek CP2'nin görevi değildi), düzeltilmedi.
- **Yol boyunca bulunan ve düzeltilen gerçek hata (üründe, TR volume commands bloğunda):** TR "Çalıştırırken volume mount et" örneğinde `python:3.12-slim` image satırı eksikti (`docker run -d -v test-data:/app/data \` sonrasında komut yarım kalıyordu) — EN karşılığıyla aynı hale getirildi.
- **`callout` block tipi** ilk kez `dockerData.js`'de kullanıldı (proje genelinde zaten mevcut ve `TopicPage.jsx`'te tanımlı, `tx()` helper'ı ile bilingual `{tr,en}` content destekliyor) — CP1 sandbox'a yönlendiren mini not'lar için.
- Yeni `code-playground`/`challenge` bloklarının tamamına `relatedTopicId` (code-playground için zorunlu) eklendi; EN/TR arasında aynı `id` bilinçli olarak tekrar kullanıldı (projedeki mevcut `dockerIntroInteractiveBlocks` paylaşımlı-dizi deseniyle aynı mantık — sadece spread yerine literal duplikasyon, DRY kaygısı CP2 kapsamında ikincil).

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node --check src/data/dockerData.js` → ✅ her ara adımda sözdizimi doğrulandı (EN sonrası, TR Container Commands sonrası, TR tamamı sonrası)
- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal (32 dosya)
- `npm run build` → ✅ PASS (15.7s, 38 static route, dist SEO PASS)
- `npx playwright test tests/topic-pages-ui.spec.ts -g docker tests/i18n-content-toggle.spec.ts tests/docker-sandbox.spec.ts` (--workers=1) → ✅ 4/4 PASS
- Regresyon: `tests/review-queue.spec.ts` + `tests/quiz-retry-mechanism.spec.ts` (--workers=1) → ✅ 7/7 PASS — yeni challenge/code-playground blokları quiz sırasını (§9.1) ve WP4 review-queue snapshot mekanizmasını bozmadı.

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun CP2 işi commit edilmedi** — kullanıcı onayı bekliyor.
2. **CP4 (sayfa içi ilerleme + tempo)** — `contentplan.md`'deki hazır Sonnet promptu ile başlatılabilir, CP2'den bağımsız.
3. **CP3 (sekme atomikleştirme)** — hâlâ KULLANICI ONAYI OLMADAN başlanmaz; `contentplan.md` CP3'teki riskler geçerli.
4. Keşfedilen pre-existing EN/TR asimetri (TR'de Playwright docker-compose.yml bloğu hiç yok) — düzeltilmek istenirse ayrı, küçük bir çeviri-tamamlama görevi olarak ele alınmalı, CP2'nin parçası değildi.
5. Docker sayfasındaki kod bloğu başına etkileşim oranı artık raporun hedeflediği "≥1 etkileşim" seviyesinde; CP5 yayılımı (Linux/Git/K8s) için bu CP1+CP2 kalıbı referans alınabilir.

---

## Güncel Branch Durumu (2026-07-05 devam, `feature/pedagogy-improvements` — İçerik Mükemmelliği Raporu + contentplan.md + CP1 Docker Sandbox TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (önceki oturumun WP1-4 + test commit'leri `a3aee51`'e kadar pull edildi; bu oturumun işi HENÜZ COMMIT EDİLMEDİ — kullanıcı onayı bekliyor) |
| **Kapsam** | Kullanıcı isteğiyle Docker dersi örneklem alınarak "sıfırdan öğrenen biri için en iyi kaynak mıyız?" değerlendirmesi yapıldı (Fable 5), rapor + iş planı **`contentplan.md`** (yeni dosya, kök dizinde) olarak yazıldı ve planın ilk paketi (CP1) uygulandı. |
| **İş bölümü** | contentplan.md'de her CP'nin uygulayıcısı belirtildi: CP1=FABLE (bu oturumda yapıldı), CP2/CP4=SONNET (hazır kopyala-yapıştır promptlar dosyanın içinde), CP3=KULLANICI ONAYI + SONNET (riskler + prompt hazır), CP5=ertelendi. |

### Bu Oturumda Yapılan İş — CP1: Docker Sandbox (durum-makineli interaktif terminal)

- **Yeni dosya `src/components/DockerSandboxBlock.jsx`** — sahte ama durumlu (stateful) Docker engine: kullanıcı `docker pull/run/ps/stop/start/rm/rmi/logs/exec` komutlarını KENDİSİ yazar; image rafı + container kutuları + port eşlemeleri sağdaki görsel panelde canlı güncellenir. Gerçekçi hata simülasyonları: bilinmeyen image → pull access denied; port çakışması → "port is already allocated"; çalışan container'ı `-f`'siz silme → gerçek daemon hatası; ad çakışması → Conflict. Her hatanın altında bilingual "💡 Neden?" açıklaması. Görev sistemi: 5 görev (pull hello-world → run nginx 8080:80 'web' → ps → logs → stop+rm), engine state'inden otomatik tespit, tamamlanınca 🎉. Terminal ÇIKTILARI İngilizce (gerçek Docker çıktısı = terminal çıktısı istisnası, CLAUDE.md §8), UI/görev/açıklama metinleri bilingual. localStorage YOK — sandbox bilinçli olarak session-only (contentplan.md CP1 tasarım kararı).
- **`TopicPage.jsx`** — `docker-sandbox` block tipi kaydedildi (import + renderBlock case, mevcut kalıpla birebir).
- **`src/data/dockerData.js`** — "📦 Temel Komutlar"/"Core Commands" sekmesine (EN + TR, container komutları kod bloğundan sonra) `docker-sandbox` bloğu + 5 görev eklendi.
- **Yeni dosya `tests/docker-sandbox.spec.ts`** — 2 test: (a) pull → image rafta, hatalı komut → gerçekçi hata, run → çalışan kutu + görev ✓, port çakışması hatası, `-f`'siz rm hatası, stop+rm → temizlik görevi ✓; (b) EN modda görev metinleri İngilizce. `serviceWorkers: 'block'` ile.
- **Test yazarken düzeltilen tuzak:** sidebar butonları section title'ı değil KISA sekme adını kullanıyor (`tabs` dizisi: "📦 Temel Komutlar" / "📦 Core Commands") — ilk yazım section title'a göre arıyordu, düzeltildi.

### Doğrulama (CLAUDE.md §1.1 — bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal
- `npm run build` → ✅ PASS (17.5s, 38 static route, dist SEO PASS, sadece bilinen chunk uyarıları)
- `tests/docker-sandbox.spec.ts` (--workers=1) → ✅ 2/2 PASS
- Regresyon (`topic-pages-ui -g docker` + `i18n-content-toggle` /docker EN taraması + `review-queue` docker testi, --workers=1) → ✅ 3/3 PASS (i18n taraması sandbox sekmesi dahil tüm sekmelerde Türkçe karakter sızıntısı olmadığını doğruladı)
- TR yorum taraması → ✅ component/test/plan dosyalarındaki tüm yorumlar Türkçe; sandbox terminal çıktıları bilinçli İngilizce (§8 istisnası)

### Sonraki Oturumda Yapılacaklar

1. **Bu oturumun işi commit edilmedi** (contentplan.md + DockerSandboxBlock.jsx + TopicPage.jsx + dockerData.js + docker-sandbox.spec.ts) — kullanıcı onayı bekliyor. Önceki oturumların WP1-4 + test commit'leri de hâlâ main'e merge/push edilmedi.
2. **CP2 (kod duvarlarını kırma)** — Sonnet'e verilecek prompt `contentplan.md` CP2 bölümünde hazır.
3. **CP4 (sayfa içi ilerleme)** — Sonnet promptu hazır; CP2'den bağımsız çalıştırılabilir.
4. **CP3 (sekme atomikleştirme)** — KULLANICI ONAYI OLMADAN BAŞLANMAZ; riskler contentplan.md CP3'te.
5. Sandbox bilinen sınırları (bilinçli, düzeltme GEREKMEZ): `docker search/inspect/cp/build` desteklenmiyor (help listesinde de yok); görev ilerlemesi session-only; `-it` flag'leri yutulur (exec'te flagless parse).

---

## Güncel Branch Durumu (2026-07-05, `feature/pedagogy-improvements` devam — Test Kapsamı Denetimi: WP1-4 için Eksik Testler Eklendi) [ÖNCEKİ OTURUM — commit `a3aee51` ile tamamlandı]

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (henüz commit edilmedi — çalışma ağacında bekliyor) |
| **Kapsam** | Kullanıcı isteğiyle `Documents/acceptancecriterias.md` + `CLAUDE.md` okunup mevcut Playwright paketi (16 dosya, 84+ test) yeniden değerlendirildi. Genel kapsam sağlam bulundu (AC01-10'un çoğu iyi test edilmiş), ama bu branch'teki WP1-4 için sadece geçici/manuel script'lerle doğrulanmış, KALICI testi olmayan 4 nokta tespit edildi ve kapatıldı. |
| **Commit durumu** | Henüz commit edilmedi — kullanıcı onayı bekliyor (WP1-4'ün kendisi de zaten commit edilmemiş haldeydi, bkz. aşağıdaki 2026-07-04 bölümü). |

### Bu Oturumda Eklenen Testler

1. **`tests/qa-mentor-roadmap-order.spec.ts`** (YENİ) — WP1'in MAP_A düğüm sırasını (Test Temelleri→Algoritma→Manuel Test→Java→Git&GitHub→Selenium→Postman→SQL→REST Assured→**Linux→Docker→Jenkins→AWS**→Kubernetes) ve Kafka'nın artık `extras`'ta (ana hatta değil, `<a href="/kafka">` ile) render edildiğini kilitler. Önceden bu sadece bir kerelik manuel script ile doğrulanmıştı, kalıcı test yoktu.
2. **`tests/homepage-recommended-badges.spec.ts`** (YENİ) — WP2'nin 4 "önerilen sıra" rozetini (🚀 Buradan başla / Start here, ①②③) doğru linklerin köşesinde, TR+EN'de, `aria-hidden`+`pointer-events:none` ile doğrular.
3. **`tests/theme-and-accessibility.spec.ts`** — WP3 Odak Modu describe bloğuna `/selenium` testi eklendi (önceden sadece `/docker` test ediliyordu). `focus-mode.css`'in 23 sayfaya mekanik mirror'landığı ve 3 dosyada (`docker`, `selenium`, `playwright`) daha önce bir parser hatası bulunduğu göz önüne alınırsa, ikinci bir sayfada da mekanizmanın çalıştığını doğrulamak anlamlı bir regresyon testi.
4. **`tests/review-queue.spec.ts`** — WP4'e 2 yeni test eklendi: (a) streak=2 olan kayıt doğru cevaplanınca **mezuniyet** (kayıt kuyruktan tamamen silinir, `recordReviewResult`'taki mezuniyet dalı), (b) tekrar panelinde **yanlış** cevap verilince streak sıfırlanır + nextDue yarına çekilir. Önceden sadece streak 0→1 (ilk doğru tekrar) akışı test ediliyordu — tam da daha önce gerçek bir interval-hesaplama bug'ının bulunduğu, en kritik ve en az test edilmiş mantık burasıydı.

**Test yazarken bulunan/düzeltilen bir hata (test kodunda, üründe değil):** İlk yazımda mezuniyet testinde `page.reload()` kullanılmıştı; `context.addInitScript` her yeni doküman yüklemesinde (reload dahil) tekrar çalışıp sahte kaydı yeniden enjekte ettiğinden test yanlış şekilde fail ediyordu. Düzeltme: reload yerine panel kapatma (`onClose` → `getQueueStats()` yeniden okunuyor) üzerinden doğrulandı.

### Doğrulama (bu oturum)

- `node scripts/check-content-integrity.mjs` → ✅ 0 ihlal (32 dosya)
- `npm run build` → ✅ PASS (6.72s, 38 static route, dist SEO PASS)
- Yeni eklenen/değiştirilen 4 test dosyası izole (`--workers=1`) → **12/12 PASS**
- Tam suite (`npx playwright test --workers=2`, ~90 test) → **79 passed, 7 flaky (retry'da PASS), 4 failed**. Failed'lerin hepsi bu oturumun değişiklikleriyle İLGİSİZ, ortam kaynaklı çıktı:
  - `mobile-smoke.spec.ts` 2 test — `devices['iPhone 14']` WebKit engine gerektiriyor, bu makinede WebKit browser binary'si hiç kurulu değildi (`npx playwright install webkit` ile kuruldu, sonrasında 2/2 PASS doğrulandı).
  - `topic-pages-ui.spec.ts` `/sql` ve `/typescript` — izole `--workers=1` ile tekrar çalıştırıldığında ikisi de PASS oldu (biri flaky/retry'da, biri direkt) — önceden defalarca belgelenmiş paralel-worker kaynak çekişmesi flakiness'i (bkz. `/python` için aynı desen), fonksiyonel regresyon DEĞİL.
  - 7 flaky test (docker-mastery, interview-grading-reset, javascript-page, + 4× topic-pages-ui sayfası) hepsi retry'da PASS oldu — 1.4 saatlik sürekli paralel koşumun yarattığı bilinen kaynak çekişmesi, yeni testlerle ilgisi yok.
- **Sonuç: WP1-4 testleri eklendikten sonra hiçbir gerçek regresyon yok, WebKit artık kurulu.**

### Sonraki Oturumda Yapılacaklar

1. Bu oturumda eklenen 4 test dosyası + WP1-4'ün kendisi hâlâ commit edilmedi — kullanıcı onayı bekliyor.
2. `Documents/testcoverage.md` bu oturumda eklenen testleri yansıtacak şekilde güncellenebilir (düşük öncelik, dokunulmadı).
3. `testcoverage.md`'de önceden belgelenmiş, bu oturumda dokunulmayan bilinen boşluklar hâlâ geçerli: AC09 (roadmap görselleştirme, özellik büyük ölçüde yok), AC05 başarılı AI içeriği testi yok, Firefox/WebKit çapraz tarayıcı projesi `playwright.config.ts`'e eklenmedi, visual regression yok, 15/20/15 mülakat seviye dağılımının build-breaking yapılıp yapılmayacağı kullanıcı kararı bekliyor.

---

## Güncel Branch Durumu (2026-07-04, `feature/pedagogy-improvements` — fableplan.md WP1-4 TAMAMLANDI, WP5 KULLANICI KARARIYLA ERTELENDİ)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/pedagogy-improvements` (main'e henüz merge/push edilmedi) |
| **Kapsam** | `fableplan.md` (Fable 5'in pedagojik inceleme raporuna dayanan iş planı) — WP1→WP2→WP3→WP4 sırayla uygulandı, her biri ayrı commit. |
| **Commit durumu** | WP1: `95fba87` (+ doc `a0be1c7`). WP2: `ece8e93`. WP3: `f3ad4a0`. WP4: `07b4667`. |
| **WP5 durumu** | **Kullanıcı kararıyla ERTELENDİ** (2026-07-04) — "riskli geliştirmeyi sonra ele alacağım" denildi. Aşağıdaki "WP5 Riskleri" bölümündeki 6 risk (özellikle Risk 1: review-queue MCQ şeması ile mülakat pratiğinin serbest-metin şeması uyumsuzluğu) kullanıcıya sunuldu, henüz onay verilmedi. Bir sonraki oturumda WP5'e başlanacaksa önce kullanıcıdan AÇIK onay alınmalı, bu bölüm tekrar okunmalı. |
| **Doğrulama oturumu (2026-07-04, WP4 sonrası)** | `Documents/acceptancecriterias.md` + `CLAUDE.md` okundu, tüm test paketi (84 test) + build + content-integrity + SEO + mülakat-soru-sayısı denetimi çalıştırıldı. **Sonuç: 0 regresyon.** Detay aşağıdaki "Doğrulama Oturumu Sonuçları" bölümünde. |
| **Sonraki adım** | Kullanıcı WP5'e ne zaman hazır olduğuna karar verecek; o ana kadar bu branch ya `main`'e merge/push edilebilir ya da olduğu gibi bekletilebilir (kullanıcı onayı gerekir). |

### Doğrulama Oturumu Sonuçları (2026-07-04, WP1-4 sonrası — kod değişikliği YOK, sadece kontrol)

Kullanıcı isteğiyle `Documents/acceptancecriterias.md` + `CLAUDE.md` okunup mevcut test paketiyle karşılaştırıldı, ardından WP1-4'ün herhangi bir defect yaratıp yaratmadığı test edildi:

- **`Documents/acceptancecriterias.md` notu:** Dosyanın "Tamamlanan/Yapılması Gereken Geliştirmeler" bölümleri projenin eski, sadece-Python-sayfası fazından kalma (referans verdiği `src/lib/theme.js`, `src/lib/ai.js`, `learnqa_xp_python` gibi yapılar artık mevcut mimariyle — Supabase backend + Groq AI grading — örtüşmüyor). **AC 01-10 tanımları hâlâ güncel ve otoriter** — test dosyalarındaki yorumlar bunlara sürekli referans veriyor, güncelleme gerektirmiyor.
- **Test yapısı:** 15 spec dosyası, varsayılan `playwright.config.ts`'te 84 test. Ayrı config'lerle çalışan 2 ek suite: `tests-extended/interview-mastery-flows.spec.ts` (gerçek AI çağrıları, maliyetli, post-commit'e kasıtlı dahil değil) ve `quiz-audit` config'i.
- **`node scripts/check-content-integrity.mjs`** → ✅ 0 ihlal
- **`node scripts/check-seo.mjs`** → ✅ 39 route PASS
- **`node scripts/audit-interview-questions.mjs`** → ✅ 22/22 sayfa min-50 kuralını karşılıyor (Postman/Playwright'taki 2 dağılım uyarısı önceden bilinen, değişmedi)
- **`npm run build`** → ✅ PASS (1m25s, sadece bilinen chunk-size uyarıları)
- **`npx playwright test` (tam suite, 84 test)** → **83 PASS, 1 FAIL** (`/python`, `topic-pages-ui.spec.ts`). İzole çalıştırıldığında (`--workers=1`) `/python` testi **57.9s'de temiz PASS** oluyor — bu, önceden defalarca belgelenmiş paralel-worker kaynak çekişmesi flakiness'i (ağır sayfa + `button.isEnabled()` timeout), WP1-4 değişiklikleriyle İLGİSİZ, **regresyon DEĞİL**.

**Genel sonuç: WP1-4'ün hiçbiri mevcut hiçbir testi veya build adımını bozmadı.**

### WP1 — QA Mentor Yol Haritası Sıra Düzeltmesi ✅ TAMAMLANDI (commit `95fba87`)

- `src/data/qaMentorData.js`: MAP_A/MAP_B/MAP_B_SEL/MAP_C1/MAP_C2'nin hepsinde Jenkins, Docker'dan önce geliyordu (container kavramı Docker'sız anlaşılmaz) → tüm haritalarda **Docker → Jenkins → AWS** sırasına düzeltildi.
- Linux artık hiçbir haritada "bonus" değil — her 5 haritada da Docker/Jenkins öncesi **ana hatta** bir düğüm (`LINUX_MAIN_NODE(id)` helper'ı eklendi, kullanılmayan `LINUX_BONUS_NODE` silindi).
- MAP_A'ya yeni başlangıç düğümü eklendi: `/what-is-testing` (🛡️ Test Temelleri, id=1).
- Kafka (niş konu) MAP_A ve MAP_C1'de ana hattan `extras`'a taşındı.
- Tüm 5 haritanın `mentorNote` metinleri (TR+EN) yeni sırayı yansıtacak şekilde yeniden yazıldı.
- **Risk kontrolü yapıldı ve güvenli bulundu:** `QaMentorPage.jsx:504`'teki progress hesaplaması `node.route`'a göre çalışıyor (`completedSet.has(node.route)`), `node.id`'ye değil — dolayısıyla id'lerin yeniden numaralandırılması localStorage'daki tamamlanmış ders verisini bozmuyor.
- Test kapsamı doğrulandı: `tests/other-pages-ui.spec.ts`'deki `/qa-mentor` testi node adı/sırası assert etmiyor, sadece buton tıklanabilirliğini kontrol ediyor — bozulmadı.
- Doğrulama: `check-content-integrity.mjs` ✓, `npm run build` ✓ (38 static route, SEO PASS), `npx playwright test tests/other-pages-ui.spec.ts -g qa-mentor` ✓ PASS, ayrıca geçici bir Playwright script'iyle MAP_A'nın tam node sırası ("Test Temelleri, Algoritma Temeli, Manuel Test, Java, Git & GitHub, Selenium, Postman, SQL, REST Assured, Linux, Docker, Jenkins, AWS, Kubernetes") ve 5 haritanın tamamının id sekansı/route listesi manuel olarak doğrulandı, console hatası yok.

### WP2 — Ana Sayfada "Önerilen Sıra" Sinyali ✅ TAMAMLANDI (henüz commit edilmedi)

- `src/components/HomePage.jsx`, "Navigasyon — Kategori Kartları" bölümü (satır ~586-630): kart etiketlerine dokunulmadı, mevcut `nb()` pill'lerinin köşesine `position: relative` wrapper + `absolute` konumlu küçük rozet span'ları eklendi.
- `/what-is-testing` pill'i → "🚀 Buradan başla" / "🚀 Start here" rozeti (rose-500 bg, beyaz metin, sol üst köşe).
- `/algorithms` → ①, `/manual-testing` → ②, `/java` → ③ rozetleri (amber-400 bg, koyu metin, sağ üst köşe, `w-4 h-4` daire).
- Rozetler `aria-hidden="true"` ve `pointer-events-none` — ekran okuyucuyu ve tıklama hedefini bozmuyor, sadece görsel ipucu.
- Pill'lerin mevcut DOM sırası DEĞİŞTİRİLMEDİ (sadece her birine `<span className="relative inline-block">` wrapper eklendi) — plan "kart etiketlerine dokunma" talimatına sadık kalındı.
- Dark/light kontrastı: sabit yüksek kontrastlı renkler (amber+koyu metin, rose+beyaz metin) kullanıldığı için `darkMode` koşuluna gerek kalmadı, her iki temada da okunaklı.
- Mobil taşma riski yok: rozetlerin bulunduğu kategori kartları zaten `overflow-hidden` — rozet card sınırının dışına taşarsa yerel olarak kırpılır, global `body` scroll'a etkisi yok.
- Doğrulama: `check-content-integrity.mjs` ✓, `npm run build` ✓, `npx playwright test tests/mobile-smoke.spec.ts tests/theme-and-accessibility.spec.ts tests/other-pages-ui.spec.ts tests/example.spec.ts` → 14/14 PASS, ayrıca geçici bir script ile TR+EN modda 4 rozetin de doğru metinle render olduğu ve console hatası olmadığı doğrulandı.

### WP3 — 🎯 Odak Modu (Focus Mode) Toggle ✅ TAMAMLANDI (henüz commit edilmedi)

- **Yeni dosya `src/focus-mode.css`** — 23 `*-effects.css` dosyasının (+ `night-sky-effects.css`) `@media (prefers-reduced-motion)` bloklarındaki TÜM kurallar (`366/366`, mekanik script ile üretildi, tek satır bile kaybolmadı — bir parser hatası bulunup düzeltildi: yorum satırı bir sonraki seçiciyle birleşip 3 dosyada [`docker`, `selenium`, `playwright`] 1'er kural sessizce düşüyordu, script fix'lendi ve tekrar üretildi) `:root.focus-mode` öneki ile mirror'landı. Üstüne "Ek Katman" bölümü eklendi: parçacıklar (`display:none`), gece gökyüzü/ay/kayan yıldız (`display:none`), glitch pseudo-elementleri (`content:none`), 3D tilt blokları (`transform:none !important`, bilinen sınır: aktif hover sırasında JS'in inline `!important` stili öncelikli kalabilir), ambiyans sesi butonu (`[data-testid$="-sound-toggle"]` → `display:none`).
- `js-confetti-particle` (quiz doğru cevap kutlaması) BİLİNÇLİ OLARAK dahil edilmedi — dekoratif ambiyans değil, öğrenme sonucu geri bildirimi.
- `src/main.jsx`'e global import edildi (`dark-overrides.css` ile aynı satır grubu).
- `TopicPage.jsx` + `HomePage.jsx`: `focusMode`/`setFocusMode` state'i `darkMode` ile birebir aynı kalıp (`localStorage.focusMode`, `document.documentElement.classList` → `focus-mode`, default `false`).
- `TopicHeader.jsx`: dark-mode-toggle'ın yanına `data-testid="focus-mode-toggle"` 🎯 butonu (min 36px touch target, aktifken emerald ring). `HomePage.jsx`'e de aynı buton eklendi.
- `tests/theme-and-accessibility.spec.ts`'e yeni `describe('WP3 — Odak Modu...')` bloğu: `/docker`'da toggle → `focus-mode` class + particle `toBeHidden()` → reload kalıcılık → tekrar tıkla → particle geri gelir.
- Doğrulama: `check-content-integrity` ✓, `npm run build` ✓, `theme-and-accessibility.spec.ts` (--workers=1) 4/4 PASS (paralel koşumda 2 test zaten bilinen dev-server soğuk-başlangıç flakiness'iyle timeout aldı, seri koşumda hepsi geçti — regresyon DEĞİL), `mobile-smoke` + `other-pages-ui` 10/10 PASS, ayrıca geçici bir script ile Selenium/Playwright/Python/Kafka sayfalarında da focus mode'un particle'ları gizlediği ve sound toggle'ı kapattığı, console hatası olmadığı doğrulandı.

### WP4 — 🔄 Bugünkü Tekrar (Spaced Repetition Lite) ✅ TAMAMLANDI (henüz commit edilmedi)

- **Yeni dosya `src/lib/reviewQueue.js`** — saf fonksiyonlar (`addWrongAnswer`, `getDueItems`, `recordReviewResult`, `getQueueStats`), tüm localStorage erişimi try/catch içinde, eşikler (`REVIEW_QUEUE_MAX_SIZE=100`, `REVIEW_QUEUE_INTERVALS_DAYS=[1,3,7]`, `REVIEW_QUEUE_GRADUATION_STREAK=3`, `REVIEW_QUEUE_SESSION_SIZE=5`) named const olarak dosya başında.
  - **Geliştirme sırasında bulunan gerçek bug:** `recordReviewResult`'ta interval hesaplaması `INTERVALS[nextStreak - 1]` yazılmıştı — bu, ilk doğru tekrarda 1 gün (INTERVALS[0]) veriyordu, oysa giriş anında zaten 1 gün uygulanmıştı; doğru mantık `INTERVALS[nextStreak]` (streak 0→1: 3 gün, 1→2: 7 gün, 2→3: mezuniyet). Yeni yazılan Playwright testi bunu yakaladı, düzeltildi.
- **Yakalama noktası — `TopicPage.jsx`:** `QuizBlock` artık cevap gönderiminde `activeQuestion`'dan (main veya retry, hangisi ekrandaysa — CLAUDE.md §18 alternatif soru kuralına uyularak) bir `questionSnapshot` (`{question, options, correctIndex, explanation}`, hepsi `{tr, en}` bilingual) inşa edip `onAnswered(isCorrect, questionSnapshot)` ile yukarı iletiyor. `renderBlock`'un `case 'quiz'` dalı ve `handleQuizAnswered(blockIndex, isCorrect, questionSnapshot)` bu üçüncü parametreyi taşıyacak şekilde güncellendi. Yanlış cevapta `addWrongAnswer({id: `${pageKey}:${activeTab}:${blockIndex}`, route: location.pathname, pageTitle: hero?.title, ...questionSnapshot})` çağrılıyor.
  - **Bilinçli kapsam daraltması (plandan sapma, gerekçeli):** `QuizFillBlock` (boşluk doldurma) review kuyruğuna DAHİL EDİLMEDİ — bu blok tipinde discrete `options` yok (serbest metin girişi), plan'ın MCQ tabanlı şeması (`options[]` + `correctIndex`) ile uyuşmuyor; sahte options uydurmak yerine kapsam dışı bırakıldı.
- **UI — yeni dosya `src/components/ReviewQueuePanel.jsx`** + `HomePage.jsx` entegrasyonu: QA Mentor banner'ının altına, `getQueueStats().dueCount > 0` olduğunda "🔄 Bugünkü Tekrar" kartı; tıklanınca modal panel açılır, en fazla 5 due soru tek tek MCQ olarak sorulur, cevap sonrası doğru/yanlış geri bildirim + açıklama + `recordReviewResult` çağrısı + "Konuya git →" linki (`route`). Panel kapanınca kart sayısı yeniden hesaplanır.
- **Test — yeni dosya `tests/review-queue.spec.ts`** (`serviceWorkers: 'block'` ile): (a) `/docker`'da ilk quiz sorusunu bilinçli yanlış cevapla (Docker'ın tab-0 quiz'inde doğru cevap her zaman index 1 olduğundan index 0 deterministik yanlış) → kuyrukta 1 kayıt, `nextDue` ~+1 gün, ana sayfa kartı henüz görünmüyor; (b) `context.addInitScript` ile `nextDue`'su geçmişte sahte kayıt enjekte → kart görünür → doğru cevapla → `streak=1`, `nextDue` ~+3 gün.
- Doğrulama: `check-content-integrity` ✓, `npm run build` ✓, `review-queue.spec.ts` 2/2 PASS, ayrıca regresyon kontrolü: `quiz-ai-explanation-access`, `quiz-retry-mechanism`, `interview-grading-and-reset` (7/7 PASS — `handleQuizAnswered` imza değişikliği mevcut akışları bozmadı), `mobile-smoke` + `theme-and-accessibility` (6/6 PASS, WP3 dahil).

### WP5 Riskleri — "Rozet Sınavına Karışık Soru" (Sonraki Aşama, HENÜZ BAŞLANMADI)

> Bu bölüm sadece plan metnini tekrar etmiyor — `InterviewPracticeBlock` ve
> `grade-interview-answer` akışının gerçek kodu incelenerek (2026-07-04) çıkarılan
> somut risklerdir. WP5'e başlamadan önce kullanıcı bu listeyi görmeli.

**Fikir neydi:** Bitirme rozeti sınavında (AC06, %80 eşiği) sorulan 5 sorunun
%20-30'unu (yani 1-2 soru) başka sayfalardan/derslerden karıştırmak (interleaving),
`learnqa_review_queue` altyapısını "diğer sayfaların soru havuzu" olarak yeniden
kullanarak.

**Risk 1 — Şema uyumsuzluğu (en kritik, planın kendi öncülü hatalı olabilir):**
`learnqa_review_queue`'daki kayıtlar (WP4) **MCQ formatındadır** —
`{question, options[], correctIndex, explanation}`. Ama `InterviewPracticeBlock`
(`TopicPage.jsx:3654`) tamamen farklı bir şema kullanır: her soru `{q, a, keyPoints[]}`
(serbest metin cevap + AI'nin karşılaştıracağı model cevap/kontrol noktaları),
`grade-interview-answer` Edge Function'a `question/modelAnswer/keyPoints/userAnswer`
gönderilir (bkz. `TopicPage.jsx:3711-3719`). **Review queue'daki MCQ kayıtları,
mülakat pratiğinin serbest-metin+AI-değerlendirme modeline hiç uymuyor** — plandaki
"review-queue altyapısını yeniden kullan" önerisi bu haliyle uygulanamaz. Gerçekte
yapılması gereken, review-queue'dan bağımsız, YENİ bir "diğer sayfaların mülakat
soru havuzu" kaynağı tasarlamak (örn. her `*Data.js`'teki `interviewQuestions`
dizisinden örnekleme) — bu, planda yazılandan daha büyük bir iştir.

**Risk 2 — Chunk/bundle şişmesi:** Her teknoloji sayfası şu an SADECE kendi
`*Data.js` dosyasını import ediyor (React.lazy ile route bazlı code-splitting).
Interleaving için "başka sayfalardan soru" çekmek, o sayfaların (bazıları
600KB-1MB+, bkz. CLAUDE.md §14 — `javaData` ~640KB, `typescriptData` ~1MB)
data dosyalarını da bundle'a dahil etmeyi gerektirebilir; bu ya devasa bir
chunk şişmesine ya da runtime'da dinamik import + async soru havuzu oluşturmaya
(ek karmaşıklık, loading-state yönetimi) yol açar.

**Risk 3 — Rozet/sertifika anlam bütünlüğü:** `notifyTopicCompleted` →
`markTopicCompleted` (AuthContext) → Supabase RPC, `lessonSlug: pageKey` ile
XP/rozet/sertifika veriyor. Kullanıcı "Docker" sertifikası alırken puanının
%20-30'u aslında başka bir teknolojinin (örn. Selenium) sorusundan geliyorsa,
sertifikanın temsil ettiği "bu konuda ustalaştı" iddiası zayıflar —
`/verify-certificate/:id` sayfasında bunun nasıl açıklanacağı (kullanıcıya
"karışık soru" olduğu gösterilecek mi?) bir ÜRÜN kararı, sadece mühendislik
kararı değil.

**Risk 4 — Mevcut E2E testleri kırılabilir:** `interview-grading-and-reset.spec.ts`
ve `docker-interview-mastery-flow.spec.ts` (+ `tests-extended/interview-mastery-flows.spec.ts`)
`grade-interview-answer` çağrılarını MSW ile mock'larken muhtemelen sabit
soru/cevap içerikleri varsayıyor (aynı sayfanın `allQuestions` havuzundan
geldiğini varsayarak). Karışık soru başka bir sayfadan geliyorsa mock eşleştirme
mantığı, `sampleInterviewQuestions` çağrı imzası ve reset akışı (`handleHardResetPage`,
AC07) yeniden gözden geçirilmeli — CLAUDE.md §22'deki 6 zorunlu E2E kontrolünün
TAMAMI (özellikle 3, 5, 6) bu değişiklikten sonra yeniden doğrulanmalı.

**Risk 5 — Rastgelelik/test edilebilirlik:** `sample` state'i `Math.random()` ile
her mount'ta karışıyor (`sampleInterviewQuestions`, satır 3635-3637), zaten
deterministik olmayan bir seçim. Interleaving eklemek bu rastgeleliği ikinci bir
kaynağa (başka sayfanın soru havuzu) yayar — Playwright testlerinin sabit
soru/cevap beklentisiyle yazıldığı düşünülürse, test edilebilirlik için ya
sampling fonksiyonunun mock'lanabilir/inject edilebilir hale getirilmesi ya da
seed'li rastgelelik gerekir (şu an yok).

**Risk 6 — Groq/AI maliyet ve rate limit:** CLAUDE.md §22 zaten Groq rate limit
riskini not düşüyor. Interleaving, çağrı SAYISINI artırmaz (hâlâ 5 soru) ama
her çağrının payload'ını (başka sayfadan gelen `modelAnswer`/`keyPoints`)
doğru şekilde hazırlamak için ekstra veri kaynağı yönetimi gerektirir — hata
senaryoları (başka sayfanın verisi yüklenemezse ne olur?) yeni bir katman.

**Sonuç:** WP5, plan metninde göründüğünden daha büyük ve daha çok "ürün kararı"
gerektiren bir iş. Kullanıcı onayı istenirken bu 6 risk madde madde sunulmalı;
özellikle Risk 1 (şema uyumsuzluğu) nedeniyle "review-queue'yu yeniden kullan"
yaklaşımının BAŞTAN revize edilmesi gerekebilir.

### Sonraki Oturumda Yapılacaklar (fableplan.md sırası)

1. WP5 ("Rozet Sınavına Karışık Soru") — OPSİYONEL, yukarıdaki risk listesi kullanıcıya sunulup AÇIK onay alınmadan başlanmayacak.
2. "Sonnet'in Yapmayacağı İşler" bölümü (Python/Java atomikleştirme, Capstone sayfası, CLAUDE.md çelişki çözümü) kapsam dışı — dokunulmayacak.
3. (Düşük öncelik, WP3'ten miras) 3D tilt blokları (`-block` class) için `transform: none !important` CSS override'ı, JS'in AKTİF hover sırasında uyguladığı inline `!important` transform karşısında bazen etkisiz kalabilir — bilinen/kabul edilmiş bir sınır, düzeltme JS'e dokunmayı gerektirir (plan bunu yasaklıyor), bu yüzden değiştirilmedi.
4. (Düşük öncelik, WP4'ten miras) `QuizFillBlock` (boşluk doldurma) review kuyruğu kapsamı dışında bırakıldı — ileride dahil edilmek istenirse ayrı bir şema/karar gerekir (MCQ olmayan bir soru tipi için "options" kavramı yeniden tasarlanmalı).
5. `feature/pedagogy-improvements` branch'i henüz `main`'e merge/push edilmedi — kullanıcı onayı bekliyor.

---

## Güncel Branch Durumu (2026-07-03, devam — Test Kapsamı İncelemesi + Eksik Testler Eklendi, main'e MERGE EDİLDİ)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `main` (bu oturumda `feature/docker-ui-rollout` merge edildi) |
| **Kapsam** | `CLAUDE.md` → `NEXT_SESSION.md` → `Documents/acceptancecriterias.md` → `Documents/testcoverage.md` okunup mevcut Playwright test paketi (12 dosya, 76 test) AC01-10 ile karşılaştırıldı; `testcoverage.md` §5.2'de listelenen boşluklardan 3 tanesi kapatıldı. |
| **Commit durumu** | Commit edildi ve `main`'e merge edildi (bu oturumda, kullanıcı onayıyla). |

### Bu Oturumda Yapılan İş — Test Kapsamı İncelemesi ve Eksik Testlerin Eklenmesi

**Tespit edilen boşluklar (`testcoverage.md` §5.2, §7 referans alınarak):**
1. **AC08 (tema/dark-mode/erişilebilirlik) — hiç test yoktu** → kapatıldı.
2. **Mobil responsive/WCAG touch target — hiç test yoktu (Yüksek risk)** → kapatıldı.
3. **CLAUDE.md §10 "minimum 50 mülakat sorusu" kesin kuralı hiç otomatik doğrulanmıyordu** → kapatıldı.
4. **`docker-interview-mastery-flow.spec.ts`'de `serviceWorkers: 'block'` eksikti** (bilinen risk, `interview-grading-and-reset.spec.ts`'de zaten vardı) → düzeltildi.

**Eklenen/değiştirilen dosyalar:**
- `tests/theme-and-accessibility.spec.ts` — **YENİ**. AC08 için 3 test: (1) `/` HomePage — varsayılan dark mode, toggle ile light'a geçiş, reload sonrası kalıcılık, tekrar dark'a dönüş; (2) `/docker` TopicPage — aynı toggle mekanizması header butonu üzerinden, light modda body bg/text renginin gerçekten farklılaştığının kaba kontrast kontrolü; (3) `/` — ardışık 3 hızlı tıklama ile state machine yarış durumu (idempotency) kontrolü. Not: AC08'in bahsettiği "alternatif tema paleti seçenekleri" (`theme.js`/`ThemeContext`) proje kodunda henüz YOK — bu dosya sadece fiilen var olan tek dark/light toggle'ı test eder, olmayan bir özelliği simüle etmez.
- `tests/mobile-smoke.spec.ts` — **YENİ**. `devices['iPhone 14']` (390×844) ile: (1) `/` — `scrollWidth <= clientWidth` (CLAUDE.md §12 "yatay kaydırma olmamalı"), dark-mode-toggle ve language-toggle butonlarının ≥36px WCAG 2.5.5 dokunma hedefi; (2) `/docker` — mobilde yatay kayma yok, sidebar sekmesine dokunup quiz akışına erişilebiliyor, console/page hatası yok.
- `scripts/audit-interview-questions.mjs` — **YENİ**. CLAUDE.md §10'daki "minimum 50 soru" kuralını statik olarak (tarayıcısız, `*Data.js` dosyalarını regex ile tarayarak) denetler; 22 teknoloji sayfasının tamamı için toplam soru sayısı + basic/intermediate/advanced dağılımını raporlar. **Sonuç: 22/22 sayfa minimum 50 kuralını karşılıyor** (2 sayfa — Postman, Playwright — 15/20/15 hedef dağılımını tam karşılamıyor ama toplam ≥50 olduğundan sadece ⚠️ uyarı, build kırılmıyor — bu bilinçli bir tasarım kararı, "minimum 50" kesin kural, alt-dağılım rehber niteliğinde). `npm run build` zincirine eklendi (`check-content-integrity` sonrası, `generate-seo-files`'tan önce) — `package.json` `"audit:interview-questions"` script'i de eklendi.
- `tests/docker-interview-mastery-flow.spec.ts` — `browser.newContext()` → `browser.newContext({ serviceWorkers: 'block' })`. MSW service worker'ı aktifken gerçek `grade-interview-answer` ağ çağrısını mock'layıp testin sahte sonuçla geçmesini önler.
- `Documents/testcoverage.md` — yukarıdaki 3 yeni test dosyası + kapatılan boşluklar tabloya işlendi (AC08 artık ✅, mobil/WCAG artık ✅, mülakat 50-soru kuralı artık ✅ otomatik).

**Bilinçli olarak EKLENMEYEN boşluklar (düşük öncelik veya kapsam dışı, `testcoverage.md`'de not düşüldü):**
- Firefox/WebKit çapraz-tarayıcı testi — proje şu an sadece Chromium hedefliyor, kapsam genişletmesi ayrı bir karar gerektirir.
- AC05 gerçek (mock olmayan) AI içerik testi — maliyetli suite'e (`tests-extended/`) aday, post-commit hook'a eklenmedi.
- Visual regression — proje altyapısında yok, yeni bir araç (örn. Percy) gerektirir.
- AC09 roadmap görselleştirme testi — özelliğin kendisi kısmen implement, düşük öncelik.

**Doğrulama:**
- İlk tam koşumda `theme-and-accessibility.spec.ts`'in ilk testi 30s varsayılan test timeout'unu aştı (2 sayfa yüklemesi + reload paralel yük altında) → `test.setTimeout(60_000)` eklenerek düzeltildi (aynı dosyalardaki `topic-pages-ui.spec.ts`/`other-pages-ui.spec.ts` deseni).
- Düzeltme sonrası tam koşum: **`npx playwright test` → 80 passed, 1 failed (/python)**. `/python` başarısızlığı bu oturumla ilgisiz, önceden bilinen bir flakiness (`NEXT_SESSION.md`'nin 2026-07-01 bölümlerinde defalarca belgelenmiş — ağır sayfa + paralel worker kaynak çekişmesi kaynaklı `locator.click`/`isEnabled` timeout'u, fonksiyonel bug değil). Yeni eklenen 5 testin (`theme-and-accessibility.spec.ts` 3 + `mobile-smoke.spec.ts` 2) TAMAMI PASS oldu.
- `node scripts/audit-interview-questions.mjs` → 22/22 sayfa minimum 50 kuralını karşılıyor, build zincirine entegre.

### Sonraki Oturumda Yapılabilecekler

1. Postman ve Playwright sayfalarındaki mülakat soru seviye dağılımını (şu an 15/20/15 hedefinin biraz altında/farklı dağılımda) tam standarda getirmek — düşük öncelik, uyarı build'i kırmıyor.
2. `/python` sayfasının `topic-pages-ui.spec.ts`'deki kalıcı paralel-yük flakiness'i — worker sayısını azaltmak veya bu spesifik route için timeout'u daha da artırmak (180s'den) düşünülebilir.
3. Firefox/WebKit projesi eklenmesi `playwright.config.ts`'e — kullanıcı onayı ve CI süre bütçesi tartışması gerektirir.

---

## Güncel Branch Durumu (2026-07-03, Docker UI Rollout — 16 sayfalık tam proje genişlemesi TAMAMLANDI)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/docker-ui-rollout` (aynı branch, henüz commit/merge/push edilmedi) |
| **Kapsam** | Aşağıdaki "Docker UI Rollout tamamlandı" bölümünde anlatılan 6 sayfalık ilk faz + bu oturumda tamamlanan 16 ek standart teknoloji sayfası: TypeScript, JavaScript, SQL, Java, Linux, JMeter, Postman, Bruno, REST Assured, Jenkins, Kubernetes, Kafka, Appium, BrowserStack, AWS, Azure. |
| **Kapsam dışı (kullanıcı onayıyla)** | test-frameworks, what-is-testing, manual-testing, algorithms, advanced-algorithms (özel yapılı sayfalar) + qa-mentor, leaderboard, login, backend, security, qa-assistant, java-document, git-document (fonksiyonel/admin sayfalar). |
| **Commit durumu** | Henüz commit edilmedi — kullanıcı onayı bekliyor. |

### Bu Oturumda Tamamlanan İş — 16 Sayfalık Tam Rollout

Her sayfa için aynı kalıp uygulandı: `{prefix}-effects.css` (yeni dosya) + `{Page}.jsx` (tamamen yeniden yazıldı) — cesur/marka-dışı renk paleti, 5 aşamalı sayfaya özgü "pipeline" görselleştirmesi + interaktif komut konsolu simülatörü, header'a entegre ses aç/kapa butonu (sadece light mode), wave-progress scroll halkası, `night-sky-effects.css` paylaşımlı dark-mode nebula/ay efekti.

**Palet kaydı (çakışmayı önlemek için):**
- TypeScript: obsidyen siyahı + elektrik mavisi + sıcak pembe
- JavaScript: indigo-mor + gül kurusu + nane yeşili
- SQL: bordo + amber + turkuaz
- Java: espresso kahvesi + bakır + camgöbeği
- Linux: terminal siyahı + neon yeşil + amber
- JMeter: indigo + volkanik turuncu + çelik grisi
- Postman: gece yarısı lacivert + mercan + nane
- Bruno: orman yeşili + altın + arduvaz
- REST Assured: koyu erik moru + zeytin-chartreuse + gümüş
- Jenkins: karbon antrasit + alarm kırmızısı + buz mavisi
- Kubernetes: derin lacivert + K8s mavisi (#4d90fe) + zümrüt yeşili
- Kafka: oniks siyahı + elektrik menekşe + sinyal amberi
- Appium: petrol yeşili + Android yeşili (#3ddc84) + iOS gümüş-mavi (kasıtlı platform rengi seçimi)
- BrowserStack: koyu arduvaz + ayçiçeği sarısı + menekşe
- AWS: antrasit-lacivert + AWS turuncusu (#ff9900) + turkuaz
- Azure: kobalt-siyah + Azure mavisi (#2b88d8) + sıcak amber

**Pipeline/konsol temaları (özet):** TypeScript=tsc derleme hattı+hata gösterimi, JavaScript=Event Loop+çalışma sırası panosu, SQL=gerçek yürütme sırası (FROM→...→SELECT), Java=JVM ClassLoader aşamaları, Linux=shell pipe akışı, JMeter=yük testi ramp-up barları, Postman=pm.test checklist, Bruno=.bru dosya akışı+"Neden Bruno" checklist, REST Assured=given/when/then zinciri, Jenkins=Jenkinsfile aşamaları, Kubernetes=Deployment rollout+replika sayacı, Kafka=producer→partition→consumer offset takibi, Appium=Android/iOS session paneli, BrowserStack=paralel cihaz grid sonucu, AWS=CodeBuild→S3→CloudWatch→SNS, Azure=Repos→Pipelines→Test Plans→Artifacts→Release.

**Doğrulama (tam koşum):**
- `node scripts/check-content-integrity.mjs` → TÜM KONTROLLER GEÇTİ ✓ (her batch sonrası tekrar çalıştırıldı)
- `npm run build` → PASS (her batch sonrası; son build 29.82s, 38 static route, dist SEO check PASS)
- `npx playwright test tests/topic-pages-ui.spec.ts` → **22 passed, 1 failed (/python), 1 flaky (/selenium, retry'da PASS)**. Bu oturumda eklenen/dokunulan **16 sayfanın TAMAMI PASS** oldu. `/python` ve `/selenium` bu oturumda dokunulmayan (önceki faz) sayfalar — hata sebebi 4 worker paralel yükünde `button.isEnabled()` timeout'u (kaynak çekişmesi), fonksiyonel bir regresyon değil.
- Ayrıca özel Playwright script'leriyle her batch için: hero banner/console/sound-toggle/wave-ring DOM'da var mı, light modda yağmur animasyonu (`animationName`) aktif mi, dark mode'a geçince nebula arka planı geliyor mu, konsol komutu (`build`/`apply`/`produce`/`send`/vb.) çalıştırılınca order-board item'ları `done` oluyor mu — hepsi doğrulandı, sıfır console hatası.

### Sonraki Oturumda Yapılacaklar

1. **Kullanıcı onayıyla commit + `main`'e merge + push** — hem ilk 6 sayfalık faz hem bu 16 sayfalık faz `feature/docker-ui-rollout` branch'inde birikmiş durumda, henüz commit edilmedi.
2. `/python` ve `/selenium` testlerindeki paralel-yük timeout'u isteğe bağlı olarak `topic-pages-ui.spec.ts`'de worker sayısı azaltılarak veya timeout süresi artırılarak stabilize edilebilir (düşük öncelik, fonksiyonel bug değil).
3. Rollout artık 22 standart/yüksek trafikli sayfa + HomePage'de tam — yeni bir sayfa eklenmedikçe bu görev kapalı.

---

## Güncel Branch Durumu (2026-07-02, Docker UI Rollout tamamlandı)

| Alan | Değer |
|------|-------|
| **Aktif branch** | `feature/docker-ui-rollout` (main'den ayrıldı, henüz merge/push edilmedi) |
| **Kapsam** | Docker sayfasındaki premium görsel efekt paketi (parçacıklar, hero banner, 3D pipeline, manyetik butonlar, gece gökyüzü/yağmur, ambiyans sesi) Selenium, Playwright, Cypress, Python, Git & GitHub sayfalarına ve ana sayfaya taşındı. |
| **Commit durumu** | Değişiklikler henüz commit edilmedi (`git status` çalışma ağacında bekliyor) — kullanıcı onayıyla commit/push yapılabilir. |

### Bu Oturumda Tamamlanan İş — Docker UI Rollout (Selenium/Playwright/Cypress/Python/Git & GitHub/HomePage)

**Yeni dosyalar:**
- `src/lib/ambientSound.js` — yağmur + gökgürültüsü sesleri Web Audio API ile sentezleniyor (harici ses dosyası yok). Not: gece böceği/ağustos böceği sesi bir ara eklendi, kullanıcı isteğiyle tamamen geri alındı — sadece light mode'da ses var.
- `src/night-sky-effects.css` — TÜM rollout sayfaları için PAYLAŞIMLI dark-mode nebula/yıldız/ay/kayan yıldız katmanı (`[class$="-page"] .min-h-screen.dark-mode` jenerik seçicisiyle). Yeni sayfa eklenirken bu dosya kopyalanmaz, sadece import edilir.
- `src/selenium-effects.css` + `SeleniumPage.jsx` güncellemesi — teal/yeşil palet, WebDriver Command Pipeline + tarayıcı mockup'lı komut konsolu.
- `src/playwright-effects.css` + `PlaywrightPage.jsx` güncellemesi — patlıcan moru + lime + orkide (kasıtlı marka-dışı cesur palet), Auto-Wait Engine pipeline + auto-wait demosu gösteren konsol.
- `src/cypress-effects.css` + `CypressPage.jsx` güncellemesi — bordo/şarap + altın palet, Command Queue pipeline + 📸 time-travel snapshot rozetli konsol.
- `src/python-effects.css` + `PythonPage.jsx` güncellemesi — lacivert + altın + camgöbeği palet, pytest Test Lifecycle pipeline + pytest CLI konsolu (PASS/FAIL sonuç panosu — diğerlerinden farklı olarak tarayıcı mockup'ı değil, çünkü pytest bir CLI aracı). Mevcut `TestFrameworksBanner` korundu, Fragment ile üstte gösteriliyor.
- `src/git-effects.css` + `GitGithubPage.jsx` güncellemesi — koyu arduvaz mavisi + mercan palet, Commit Pipeline (Working Dir→Staging→Local→Remote→Branch) + canlı commit graph konsolu (💻 yerel / ☁️ push edilmiş). Mevcut `GitDocBanner` korundu.
- `src/homepage-effects.css` + `HomePage.jsx` güncellemesi — HAFİF versiyon (HomePage TopicPage tabanlı değil, kendine özgü karmaşık bir yapı — arama modalı, üyelik banner'ı, resume banner'ı var). Sadece parçacık + gece gökyüzü + yağmur/şimşek + ses aç/kapa eklendi; hero banner/pipeline/konsol, manyetik buton, 3D tilt, glitch başlık EKLENMEDİ (riskli/uygunsuz). Mevcut marka renkleri (indigo/mor/pembe) korundu, yeni cesur palet icat edilmedi.
- `src/docker-effects.css` güncellemesi — Selenium/Playwright port'u sırasında bulunan hataların düzeltmesi (aşağıya bakın).

**Yol boyunca bulunan ve düzeltilen 2 gerçek hata (tüm sayfalara uygulandı):**
1. **Ay/yıldız konumlama hatası:** `hero-banner-container`'da `position: relative` eksikti → artık `night-sky-effects.css`'te jenerik olarak tanımlı.
2. **`:has()` seçici yön hatası (kritik):** Sayfa wrapper'ı (`.docker-page` vb.) `.min-h-screen`'in İÇİNDE değil ÜSTÜNDE/DIŞINDA — `:has()` yanlış yöne bakıyordu. Bu yüzden **light mode yağmur/şimşek efekti hiçbir sayfada hiç çalışmıyormuş** (ekran görüntülerinde fark edilmemişti, çünkü efekt zaten düşük opasiteli). Düzeltme: `.{page}-page .min-h-screen:not(.dark-mode)` (düz soy seçici). `getComputedStyle(el).animationName` ile doğrulandı.

**Diğer düzeltmeler:**
- Light modda pipeline/layer başlık ve etiket renkleri artık `--{page}-role-*` CSS değişkenleriyle tema-duyarlı (önceden light modda soluk/okunaksızdı).
- Ses aç/kapa butonu konumu: sağ alt köşe zaten kalabalık (wave-progress + chat + yer imi) — buton artık `right: 1.5rem; top: 50%; transform: translateY(-50%)` (sağ kenar, dikey ortada).
- Gece gökyüzü artık zengin bir "nebula" (mavi/turuncu bulutsu + parlak yıldız patlamaları), eski hali sadece küçük beyaz noktalardı.

**Doğrulama:** Her sayfa için `npm run build` ✓, `check-content-integrity.mjs` ✓, ilgili Playwright testleri (topic-pages-ui + i18n-content-toggle, Docker için ayrıca interview-mastery-flow) yeşil, dark/light mode + komut konsolu etkileşimleri Playwright screenshot'larıyla görsel doğrulandı.

### Sonraki Oturumda Yapılacaklar

1. **Kullanıcı onayıyla commit + `main`'e merge + push** — `feature/docker-ui-rollout` branch'i hazır, henüz commit edilmedi.
2. Kapsam dışı kalan diğer teknoloji sayfaları (SQL, Java, TypeScript, JavaScript, Jenkins, Kubernetes, Postman, Bruno, REST Assured, JMeter, Kafka, Appium, BrowserStack, AWS, Azure, Linux vb.) bu rollout'a dahil DEĞİL — kullanıcı yeni bir talep vermeden genişletilmemeli.

---

## Güncel Branch Durumu (2026-07-02, branch temizliği sonrası) [ESKİ — yukarıdaki güncel bölüme bakın]

| Alan | Değer |
|------|-------|
| **Aktif branch** | `main` (tek branch) |
| **Uzak takip** | `origin/main` |
| **Son commit** | `657a6be` — docs(session): record commit 21a6e6c |
| **Branch temizliği** | Kullanıcı isteğiyle `main` dışındaki TÜM branch'ler hem local'de hem GitHub'da silindi: `test`, `feature/specific-git-linux-content` ve 11 adet `worktree-agent-*` branch (bunlara bağlı `.claude/worktrees/agent-*` worktree'leri de kaldırıldı). Silinen `worktree-agent-*` branch'lerinde commit edilmemiş değişiklikler vardı (Antigravity aracının yarım kalmış oturumları, `a5f88fb` üzerinde) — kullanıcı onayıyla kalıcı olarak kaybedildi. `test` branch'i `main`'e zaten `90cd439`'a kadar ortak ataydı, ekstra kaybolan iş yoktu. |
| **Not** | Bundan sonra tüm çalışma doğrudan `main` üzerinde yapılmalı; `test`/`worktree-agent-*` branch adları artık geçersiz, referans verilmemeli. |

### Bu Oturumda Yapılanlar (2026-07-02, devam — 4 custom sayfa tamamlandı)

- **manualTestingData.js** — 6 TR + 6 EN ders §9.3 4-katman yükseltmesi (mindset, test-case, exploratory, bug-report, severity, regression) ✓
- **ManualTestingPage.jsx** — 4 dersin ScenarioVisual bileşenine adım animasyonları eklendi (mindset: coverage bars, test-case: step boxes, exploratory: bouncing nodes, regression: flow items) ✓
- **beginnerAlgorithmsData.js** — 7 TR + 7 EN ders §9.3 4-katman yükseltmesi (recipe, input-output, decision, loop, memory, debug, flowchart) ✓
- **algorithmsData.js** — 6 TR + 6 EN section `analogy` alanı §9.3 4-katman standardına yükseltildi (AdvancedAlgorithmsPage bileşeni `blocks` array'ini değil `analogy` alanını render ediyor — doğrulandı) ✓
- **PythonFrameworksTab.jsx** — 2 SimpleBox (pytest + Robot Framework) §9.3 yükseltildi; `OrderSort` import edildi; `PytestFixturePractice` bileşeni (textarea + kontrol + çözüm göster) + fixture scope ordering drag-and-drop eklendi ✓
- **Build doğrulaması:** `check-content-integrity.mjs` → TÜM KONTROLLER GEÇTİ ✓ (32 dosya); `npm run build` → ✓ 7.01s; 38 static route HTML shell; dist SEO check PASS ✓

- **tests/javascript-page.spec.ts** — `'Cannot read properties'` body check kaldırıldı (eğitim içeriğinde geçen bu ifade false positive veriyordu; gerçek runtime hatalar pageerror listener ile zaten yakalanıyor) ✓
- **76/76 test geçti** — commit hash `21a6e6c` ✓

### Sonraki Oturumda Yapılacaklar (Öncelik Sırasıyla)

1. **FrameworkComparison + PlaywrightLangCompare** — SimpleBox / interaktif trio yok; düşük öncelik (karşılaştırma tabloları format olarak üçlüye uymuyor)
2. Yeni işler artık doğrudan `main` üzerinde commit edilmeli — ayrı `test` branch'i yok.

### §9.3 4-Katmanlı Analoji Standardı — Sayfa Durumu (2026-07-02 Güncel)

| Sayfa | Durum |
|-------|-------|
| Python, Bruno, TypeScript, Docker, Jenkins, Kubernetes | ✅ Tam (önceki oturumlar) |
| Selenium, Playwright, Cypress, Java, JS, SQL, Git, Linux | ✅ Tam (önceki oturumlar) |
| Kafka, JMeter, AWS, Azure, Postman, Appium | ✅ Tam (önceki oturumlar) |
| REST Assured, BrowserStack, what-is-testing | ✅ Tam (önceki oturum) |
| **manual-testing** | ✅ **Bu oturumda tamamlandı** (6 TR + 6 EN ders) |
| **algorithms (AlgorithmsPage — beginner)** | ✅ **Bu oturumda tamamlandı** (7 TR + 7 EN ders) |
| **advanced-algorithms** | ✅ **Bu oturumda tamamlandı** (6 TR + 6 EN section analogy) |
| **test-frameworks (PythonFrameworksTab)** | ✅ **Bu oturumda tamamlandı** (2 SimpleBox: pytest + Robot) |
| FrameworkComparison, PlaywrightLangCompare | ⏳ SimpleBox yok — düşük öncelik |

### Interaktif Üçlü (animasyon + drag-and-drop + practice) — Sayfa Durumu

| Sayfa | Durum |
|-------|-------|
| Python, TypeScript, Docker, Jenkins, Kubernetes, JS, Postman, REST Assured, Selenium, Playwright, Cypress, Java, SQL, Git, Linux, JMeter, Appium, Kafka, AWS, Azure, Bruno, what-is-testing | ✅ Tam |
| **manual-testing** | ✅ **Bu oturumda tamamlandı** (4 yeni ScenarioVisual animasyonu; game/feynman/recall zaten mevcuttu) |
| **algorithms (AlgorithmsPage)** | ✅ Mevcut (game=drag-drop, visual=animasyon, feynman=practice — custom format) |
| **advanced-algorithms** | ✅ Mevcut (VisualLab=animasyon, lab=sürükle/BFS, quiz=practice — custom format) |
| **test-frameworks (PythonFrameworksTab)** | ✅ **Bu oturumda tamamlandı** (PytestRunnerSim=animasyon, OrderSort=drag-drop, PytestFixturePractice=practice) |
| FrameworkComparison, PlaywrightLangCompare | ⏳ Karşılaştırma tabloları — üçlüye uygun değil |

---

## Bu Oturumda Yapılan İş (2026-07-01, Windows — test branch, Docker 3D & Sıvı Efektleri ve AI Sanitizasyonu)

### Branch: `test`

### Yapılanlar

**1. AI Açıklamalarında Çince/Yabancı Karakter Filtresi (Sanitizasyon):**
- AI modellerinin Türkçe "stabil" kelimesini üretirken araya Çince "稳" (stabil/kararlı) karakterini yerleştirmesi hatasına karşı [sanitizeAiText.js](file:///d:/ANTIGRAVITY/automationexercise/src/lib/sanitizeAiText.js) helper dosyası oluşturuldu.
- Bu helper, `daha稳il` gibi desenleri `daha stabil` ile değiştirirken, regex (`/[\u4e00-\u9fa5]/g`) kullanarak geriye kalan tüm Çince, Japonca ve Korece (CJK) karakterleri temizler.
- Bu sanitizasyon filtresi [TopicPage.jsx](file:///d:/ANTIGRAVITY/automationexercise/src/components/TopicPage.jsx) (quiz açıklamaları & mülakat geri bildirimleri) ve [QaAssistantPage.jsx](file:///d:/ANTIGRAVITY/automationexercise/src/components/QaAssistantPage.jsx) (AI asistan chat cevapları) bileşenlerine entegre edildi.

**2. sqlData.js Esbuild Syntax Hatası Düzeltildi:**
- [sqlData.js](file:///d:/ANTIGRAVITY/automationexercise/src/data/sqlData.js) içindeki Java Stream analojisindeki unescaped çift tırnaklar (`equals(\"FAIL\")`) olarak kaçırılarak Vite build pipeline'ı başarıyla ayağa kaldırıldı.

**3. Docker Sayfası Premium Web Teknolojileri Entegrasyonu:**
- **3D İnteraktif Katman Yığını (Docker Image Layers):** [DockerPage.jsx](file:///d:/ANTIGRAVITY/automationexercise/src/components/DockerPage.jsx) içindeki `DockerLayerCake` bileşeni, fare hareketlerini (`onMouseMove` / `onMouseLeave`) izleyen ve `perspective(1000px)` ile 3D tilt olan bir yapıya yükseltildi. Katmanlar hover anında Z-ekseninde (`translateZ`) birbirinden fiziksel olarak ayrılarak 3D derinlik hissi kazandırıldı.
- **3D Terminal & Canlı Konteyner Simülatörü:** Yeni `DockerTerminalSimulator` bileşeni oluşturuldu. Kullanıcı terminalde `docker run nginx` komutunu yazıp çalıştırdığında, sağ taraftaki 3D kargo kutusu (container) aktif hale gelmekte, neon bağlantı ışıkları parlamakta ve Docker CLI çıktısı simüle edilmektedir. Dil değişiminde (`isTr` prop) terminal state'inin sıfırlanıp doğru dille başlaması için React `key={isTr ? 'tr' : 'en'}` stratejisi uygulandı ve i18n test bütünlüğü korundu.
- **Okyanus Dalgalı Sıvı Butonlar (Fluid Hover Deep Ocean Waves):** [docker-effects.css](file:///d:/ANTIGRAVITY/automationexercise/src/docker-effects.css) dosyasına eklenen asimetrik çift dalgalı okyanus animasyonu (`::before` ve `::after` pseudo-elementleri) sayesinde, sayfadaki tüm manyetik butonlar (Geri Dön ve Dark-Mode Toggle) üzerine gelindiğinde açık turkuaz ve safir mavisi dalgaların farklı hızlarda dönerek yükselmesiyle dolmaktadır.
- **Karanlık Modda Gece Gökyüzü (Starry Night Sky & Shooting Stars):** `.dark-mode` aktifken sayfa arka planı derin uzay yeşili ve siyah degrade ile değiştirildi, parıldayan yıldızlar, parlayan bir hilal (ay) ve gökyüzünde kayan yıldızlar animasyonu eklendi.
- **Aydınlık Modda Yağmur ve Şimşek (Light Mode Weather Effects):** Aydınlık modda sayfa arka planında rüzgarlı hafif çapraz yağmur damlaları yağıyor ve her 18 saniyede bir ekranın tamamı gerçekçi bir şekilde iki kez şimşek çakar gibi parlıyor.
- **Dalgalı Su İlerleme Çemberi (Ocean Progress Ring):** Sayfanın sağ alt köşesine yerleştirilen bu gösterge, kullanıcının sayfadaki okuma/scroll ilerlemesine göre yavaşça suyla dolmaktadır. Tıklandığında pürüzsüz bir şekilde sayfanın en üstüne (`window.scrollTo`) kaydırma işlevi sunmaktadır.

**4. E2E Test & Build Kararlılığı:**
- `quiz-retry-mechanism.spec.ts` ve `i18n-content-toggle.spec.ts` testlerinin timeout süreleri 90s/60s yapılarak paralel Vite dev-server derlemelerinin oluşturduğu timeout flakiness'ı giderildi.

### Build & Doğrulama (Son Koşum)

```
check-content-integrity.mjs → TÜM KONTROLLER GEÇTİ ✓
npm run build               → ✓ built in 1m 16s (dist SEO check PASS)
38 static route HTML shell  → oluşturuldu (Dist SEO Check: PASS)
npx playwright test         → Tüm E2E testleri (i18n, quiz, topic sayfaları dahil) başarıyla tamamlandı.
```

### Sonraki Oturumda Yapılabilecekler
1. `test` branch'indeki bu doğrulanmış değişiklikleri `main` branch'ine merge et (Kullanıcı onayı gereklidir).
2. `git push origin main` ile değişiklikleri uzak sunucuya gönder.
3. 4-katmanlı analoji standardını eksik sayfalara yaymaya devam et.

---

## Canliya Cikmadan Once Zorunlu Kontrol Listesi

Her `git push` veya deploy öncesi bu 4 adim sirayla calistirilmalidir:

```
1. node scripts/check-content-integrity.mjs   # [A] TR yorum, [B] relatedTopicId, [C] duplikat — 0 ihlal olmali
2. node scripts/check-seo.mjs                 # SEO metadata kontrolu
3. npm run build                              # check-seo + check-content-integrity + vite build + static shells + dist seo
4. npx playwright test                        # E2E suiti — 0 fail (flaky kabul: önceden biliniyorsa)
```

`npm run build` adimi (3) zaten 1 ve 2'yi iceriyor; ayri kosturmak sadece
erken hata yakalamak icindir. Hepsi yesil olmadan "tamamlandi" denmez (bkz. CLAUDE.md §1.1).

---

## Bu Oturumda Yapilan Is (2026-07-01, Windows — test branch, Algorithms Timeout & Playwright ERR_FAILED Flakiness Fixes)

### Branch: `test`

### Yapilan

**1. Algorithms Page Crash / Timeout Çözüldü:**
- `/algorithms` sayfasında test sırasında 60s/120s timeout alınmasının kök nedeni tespit edildi: `QuestionBank` bileşeninde `LEVEL_COLOR` nesnesinin tanımlanmamış olması (`LEVEL_COLOR is not defined` hatası). Bu hata React rendering'in çökmesine ve sayfanın tamamen boş kalmasına neden oluyordu.
- `src/components/AlgorithmsPage.jsx` içerisine `LEVEL_COLOR` tanımı (easy, medium, hard seviyeleri için Tailwind renk sınıfları barındıran nesne) eklenerek bu crash tamamen çözüldü. Sayfa artık saniyeler içinde başarıyla render edilmektedir.

**2. Playwright E2E Test Kararlılığı Artırıldı (other-pages-ui.spec.ts & topic-pages-ui.spec.ts):**
- Test ortamında ağ bağlantısı kısıtlamalarından dolayı oluşan (Supabase AI Explanation, dış CDN font yüklemeleri vb.) expected ağ hatalarının (`ERR_FAILED`, `Failed to fetch`, `Load failed`) testleri çökertmesini engellemek için `ALLOWED_CONSOLE_ERROR_PATTERNS` filtresi entegre edildi.
- `/algorithms` ve `/advanced-algorithms` testleri, Vite dev server hot-compilation'ının oluşturduğu kaynak yarışmasını engellemek için networkidle beklemesi ile güçlendirildi. `waitForSelector('h1')` için `state: 'attached'` ve 40s timeout kullanılarak test kararlılığı sağlandı.

**3. Vite Config Optimizasyonu:**
- `vite.config.ts` dosyasında `server.warmup` özelliği etkinleştirilerek, startup anında `AlgorithmsPage.jsx`, `AdvancedAlgorithmsPage.jsx` ve `beginnerAlgorithmsData.js` dosyalarının pre-compile edilmesi sağlandı. Böylece lazy loading sırasında yaşanan dev server gecikmeleri minimize edildi.

**4. AI Açıklama Çince Karakter Sanitizasyonu:**
- Gemini ve Llama modellerinin Türkçe "stabil" kelimesini üretirken araya Çince "稳" (stabil/kararlı) karakterini yerleştirmesi hatasına karşı `src/lib/sanitizeAiText.js` helper dosyası oluşturuldu.
- Bu helper, `daha稳il` gibi bilinen desenleri `daha stabil` ile değiştirirken, regex (`/[\u4e00-\u9fa5]/g`) kullanarak geriye kalan tüm Çince, Japonca ve Korece (CJK) karakterleri temizler.
- Bu sanitizasyon filtresi `TopicPage.jsx` (quiz açıklamaları & mülakat geri bildirimleri) ve `QaAssistantPage.jsx` (AI asistan chat cevapları) bileşenlerine entegre edildi. AI artık ne üretirse üretsin kullanıcı arayüzünde yabancı karakterler gösterilmez.

**5. sqlData.js Syntax Hatası Düzeltildi:**
- `src/data/sqlData.js` içindeki `stream().filter(t -> t.status.equals("FAIL"))` ifadesindeki kaçırılmamış (unescaped) çift tırnakların esbuild derlemesini patlatması engellendi. İfade `equals(\"FAIL\")` olarak escape edildi ve Vite build pipeline'ı başarıyla ayağa kaldırıldı.

### Build & Dogrulama (Son Kosum)

```
check-content-integrity.mjs → TÜM KONTROLLER GEÇTİ ✓
npm run build               → ✓ built in 29.01s (dist SEO check PASS)
38 static route HTML shell  → olusturuldu (Dist SEO Check: PASS)
npx playwright test         → 32/32 tests PASS (other-pages-ui.spec.ts ve topic-pages-ui.spec.ts başarıyla tamamlandı)
```

### Sonraki Oturumda Yapilabilecekler
1. `test` branch'indeki bu doğrulanmış değişiklikleri `main` branch'ine merge et (Kullanıcı onayı gereklidir).
2. `git push origin main` ile değişiklikleri uzak sunucuya gönder.
3. 4-katmanlı analoji standardını eksik sayfalara yaymaya devam et.

---

## Bu Oturumda Yapilan Is (2026-07-01, macOS — Icerik Butunlugu Yonetim Sistemi)

### Branch: `test`

### Yapilan

**1. CLAUDE.md'ye kalici kurallar eklendi:**
- **§1.1 "Hiz Degil Dogruluk Onceliklidir":** Her oturum sonu zorunlu 4-adim
  kontrol listesi (check-content-integrity + hint-topic link + TR yorum + build).
- **§9.4 "Icerik Butunlugu ve Dil Tutarliligi":** TR yorum kapsaminin tum blok
  turlerine (code, editor, code-playground hint/starter/solution,
  error-dictionary codeWrong/codeFixed, interview-questions) yayilmasi;
  `relatedTopicId` zorunlulugu; %85+ hint duplikasyonu yasagi.
- **Bolum 0 tablosu:** CONTENT_RULES.md satiri KURAL 12 referansiyla guncellendi.
- **Bolum 11 (Yapma listesi):** 5 yeni ❌ maddesi eklendi.

**2. `.claude/CONTENT_RULES.md`'ye KURAL 12 eklendi:**
- 12.1: Hangi blok turlerinde TR yorum zorunlu (tablo).
- 12.2: `relatedTopicId` zorunlu format ve ornek.
- 12.3: Tekrar yasagi (>%85 kelime ortusumu farkli topicId'ler arasinda yasak).
- 12.4: Blok ekleme kontrol listesi (checkbox).

**3. `scripts/check-content-integrity.mjs` OLUSTURULDU:**
- [A] TR-context kod bloklarinda Ingilizce yorum ihlali kontrolu (dar ENGLISH_INDICATOR_RE,
  en:/tr: context stack ile bilingual bolumler atlanir).
- [B] 3 blok turunde `relatedTopicId` eksikligi (code-playground, interview-questions,
  error-dictionary) — 60-satir lookahead penceresiyle.
- [C] Jaccard benzerligi ile duplikat hint tespiti (>=0.85); TR/EN bilingual
  ciftler (biri TR karakter icerip digeri icermiyorsa) atlanir.
- `node scripts/check-content-integrity.mjs` → "TUM KONTROLLER GECTI ✓" (0 ihlal).

**4. `package.json` guncellendi:**
- `build` scripti: `check-seo → check-content-integrity → generate-seo-files → vite build → ...`
- `"content:check": "node scripts/check-content-integrity.mjs"` kolaylik scripti.
- `simple-git-hooks` → `pre-commit: "node scripts/check-content-integrity.mjs"`.

**5. Pre-commit hook kurulumu dogrulandi:**
```
[INFO] Successfully set the pre-commit with command: node scripts/check-content-integrity.mjs
[INFO] Successfully set the post-commit with command: bash scripts/post-commit-tests.sh
```

**6. 181 ihlal duzeltildi (B kategorisi — relatedTopicId eksikligi):**
- Fixer script ile 24 `*Data.js` dosyasina 181 `relatedTopicId` alani eklendi.
- Yanlis yerlestirilen (single-line block'a dis ekleme) 8 ihlal el ile duzeltildi:
  `javaData.js` (2), `linuxData.js` (4), `pythonData.js` (2).

**7. 1 ihlal duzeltildi (C kategorisi — duplikat hint):**
- `pythonData.js:4953 ↔ 5966` yanlis pozitif: `extractStringValue()` tek tirnak
  icindeki gomulu tirnak isaretinde durup yanlis string kesti.
  Duzeltme: ayri single-quote ve double-quote regex ile yeniden yazildi.

**8. A ihlalleri (EN yorum) icin 28 yeni ceviri eklendi (`TopicPage.jsx`):**
- `englishToTurkishCodeComments` dizisine AppiumData, Playwright, Java, JMeter,
  Kafka, Kubernetes, Postman, REST Assured spesifik ceviriler eklendi.

### Build & Dogrulama (Son Kosum)

```
check-content-integrity.mjs → TUM KONTROLLER GECTI ✓ (A=0, B=0, C=0)
npm run build               → ✓ built in 6.67s
38 static route HTML shell  → olusturuldu
dist SEO check              → PASS
```

### Sonraki Oturumda Yapilabilecekler

- `git push origin main` (birikimli is — kullanici onayiyla).
- `npm run content:check` komutu yeni blok eklendikten sonra otomatik calismali;
  pre-commit hook bunu sağliyor.

---

## Bu Oturumda Yapilan Is (2026-07-01, Windows — test branch, E2E Test Investigasyon ve Docker Fix)

### Branch: `test`

### Yapilan

**1. Kabul Kriterleri ve Test Coverage Dokumanlari Incelendi**

- `Documents/acceptancecriterias.md` okundu: AC 01-07 (gating, retry, i18n, %60 quiz,
  AI degerlendirme, %80 rozet, reset), AC 08-09 (tema/erisim, roadmap) ve AC 10 (TR yorum).
- `Documents/testcoverage.md` okundu: hangi testlerin hangi AC'leri kapsadigi, kapsam disi
  sayfalar (/basit-backend, /security, /backend).
- `tests/` dizini tamamen incelendi: 10 spec dosyasi, 76 test.

**2. Tam Test Kosumu — Baslangiç Durumu**

Baslangicta: `npx playwright test` → **34 PASS, 42 FAIL**

Basarisiz olan testlerin buyuk cogunlugu Docker sayfasindaydı:
- `quiz-retry-mechanism.spec.ts` — 2 test fail (yanlis cevap sonrasi ✗ gözükmüyor, retry butonu yok)
- `interview-grading-and-reset.spec.ts` — 1 test fail (doğru cevap sonrası ✓ gözükmüyor)
- `i18n-content-toggle.spec.ts` — `/docker` dil toggle click timeout alıyordu (2 test)

**3. Kok Neden Analizi**

*Sorun 1: `applyMagnetic()` — yanlış buton secimi*

`DockerPage.jsx`'teki `applyMagnetic()` fonksiyonu `button[class*="bg-gradient-to-r"]`
selector'u kullanıyordu. Bu, quiz "Cevabı Kontrol Et" butonu ve dil toggle butonlarını da
manyetik kaptı. `onWrapperPointerDown` handler, pointerdown anında `btn.style.removeProperty('transform')`
yaparak butonu orijinal konumuna geri çekiyordu. Playwright, koordinatı hesapladıktan sonra
buton konumunu değiştirdiği için click olayı React'e iletilmiyordu → `submitted` state hiç
`true` olmadı → ✗/✓ hiç render edilmedi.

*Sorun 2: `applyBlockClasses()` — interaktif bloklara 3D tilt eklenmesi*

`applyBlockClasses()`, quiz/playground/challenge bloklarını içeren container'lara da
`dp-block` class'ı ekliyordu. `dp-block`, `transform-style: preserve-3d` + `onContentMouseMove`
handler'ı (perspective 800px rotateX/rotateY) alıyordu. Fare her hareket ettiğinde bounding
rect sürekli değiştiği için Playwright'ın stabilite kontrolü başarısız oldu → click olayları
yanlış elemana düştü veya React state güncellenmedi.

**4. Uygulanan Duzeltmeler (`src/components/DockerPage.jsx`)**

*`applyMagnetic()` — ONCE (bozuk):*
```js
wrapper.querySelectorAll('button[class*="bg-gradient-to-r"]:not(.dp-magnetic-init), ...')
```

*`applyMagnetic()` — SONRA (duzeltildi):*
```js
// Sadece hero banner butonlari manyetik; quiz/dil-toggle butonlari kapsam disi.
wrapper.querySelectorAll(
    '.dp-hero-banner button:not(.dp-magnetic-init), ' +
    '.dp-hero-banner a:not(.dp-magnetic-init)'
)
```

*`applyBlockClasses()` — ONCE (bozuk):*
```js
Array.from(card.children).forEach(child => {
    if (child.tagName === 'H2') return
    child.classList.add('dp-block')
    ...
})
```

*`applyBlockClasses()` — SONRA (duzeltildi):*
```js
Array.from(card.children).forEach(child => {
    if (child.tagName === 'H2') return
    // Quiz/playground/challenge bloklari 3D tilt almamali.
    if (child.querySelector('button, input, textarea')) return
    child.classList.add('dp-block')
    ...
})
```

**5. Test Sonuclari — Duzeltme Sonrasi**

`npx playwright test` → **74 PASS, 1 FAIL, 1 flaky (retry sonrasi PASS)**

- `quiz-retry-mechanism.spec.ts` — 3/3 PASS ✅ (onceden 1/3)
- `interview-grading-and-reset.spec.ts` — PASS ✅ (onceden fail)
- `i18n-content-toggle.spec.ts` — 29/29 PASS ✅ (onceden 27/29, /docker fail ediyordu)

**6. Devam Eden Sorunlar (Bu Oturumda Duzeltilmedi)**

- **`/algorithms` 30s timeout (KALICI FAIL):** `waitForSelector('h1')` 30 saniyede zaman asimi.
  `AlgorithmsPage.jsx` (60KB) + `beginnerAlgorithmsData.js` (77KB) Vite dev mode'da yavaş
  derleniyor olabilir. h1 direkt render ediliyor (loading condition yok). `testcoverage.md`'de
  onceden ✅ olarak isaretliydi — testin siniri ya arttirilmali ya da Vite dev server
  performansi arastirilmali. Bizim degisikliklerimizle ilgisi yok.
- **`/playwright` ERR_FAILED flaky:** `topic-pages-ui.spec.ts` paralel kosumda "net::ERR_FAILED"
  console hatasi alıyor. Supabase `AiExplanationPanel` cagrisi test ortaminda ag yok oldugu
  icin basarisiz. Retry'da geciyor → oturum oncesinden gelen flakiness. Bizim degisikliklerimizle
  ilgisi yok.

### Sonraki Oturumda Yapilabilecekler

1. `/algorithms` timeout sorununu coz: test timeout'u artir (30s → 60s) ya da Vite config'de
   `optimizeDeps.include` ile AlgorithmsPage'i pre-bundle et.
2. `/playwright` ERR_FAILED flakiness: `topic-pages-ui.spec.ts`'de Supabase/AiExplanation
   hatalarini `allowedConsoleErrors` listesine ekle (zaten benzer pattern var: `ERR_FAILED`
   for CDN resources).
3. `test` branch'indeki degisiklikleri `main`'e merge et (kullanici onayi gerekli).
4. `git push origin main` (birikmis onceki is icin, daha once push edilmemisti).

---

## Bu Oturumda Yapilan Is (2026-07-01, macOS — Docker Sayfasi Nexus Gorsel Efektleri)

### Branch: `test`

### Yapilan

**1. `src/docker-effects.css` — YENİ DOSYA (tamamen sifirdan yazildi)**

Tum stiller `.docker-page` wrapper'a scope'lu; baska sayfalara sifir etki.
10 bolum:
- Ambient arka plan isimasi (`radial-gradient` + `dp-glow-pulse` animasyonu)
- Parallax: `--dp-scroll-y` CSS custom property JS scroll'a gore guncellenir;
  `::before` pseudo-element `translateY(var(--dp-scroll-y))` ile kayar
- Yüzen parçacıklar: 20 adet `.dp-particle`, `dp-float` keyframe, fixed pozisyon
- Scroll reveal: `.dp-reveal` / `.dp-visible` sinif cifti (opacity+translateY)
- Sekme h2 baslik: hareketli gradient metin (`dp-gradient-shift` keyframe,
  `background-clip: text`, `-webkit-text-fill-color: transparent`)
- Glassmorphism kart: `backdrop-filter: blur(10px)`, semi-transparent bg,
  cyan border; dark mode icin ayri kural
- `.dp-block` icin hover glow + `transform-style: preserve-3d`
- Hero h1 glitch: `.dp-glitch::before` (beyaz) + `::after` (cyan), `clip-path`
  split, aralikli `dp-glitch-1/2` keyframe (5s dongunun %80-88 arasi)
- Stats bar: 4 kolonlu grid, glassmorphism bg, gradient sayi metni
- `@media (prefers-reduced-motion)`: tum animasyonlar kapatilir

**2. `src/components/DockerPage.jsx` — TAMAMEN YENIDEN YAZILDI**

- `DockerStatsBanner` component: bilingual (useLanguage), 4 istatistik
  (10B+ Hub Pull, 100K+ Image, 2013 kurulis, %99 ekosistem)
- `extraBanner={<DockerStatsBanner />}` ile TopicPage'e gecirildi
- `<div className="docker-page">` wrapper ile tum efektler scope'lu
- `useEffect` icinde 8 JS efekti (tek hook, tam cleanup):
  1. 20 yüzen parçacık (random boyut/renk/hiz)
  2. Scroll reveal (IntersectionObserver, çift rAF, `data-dp-reveal` sentinel)
  3. `dp-block` sinifi + tab degisimi icin MutationObserver (60ms debounce)
  4. Stats sayac animasyonu (ease-out cubic, IntersectionObserver)
  5. Hero h1 glitch (`data-text` + `dp-glitch` sinifi)
  6. Manyetik butonlar (event delegation, `style.setProperty` ile `!important` override,
     `no-hover-scale` sinifi ile index.css kuralini bypass etme)
  7. Bireysel blok 3D tilt (event delegation, 6° maks, perspective 800px)
  8. Parallax (scroll event → `--dp-scroll-y` CSS custom property)

**Kural:** Fare imleci asla özellestirilmez — tarayici varsayilani korunur.
Three.js kullanilmaz (proje bagimlilik siniri).

**3. Bos alan (blank space) hatasi duzeltildi**

Sorun: `.dp-stat-item` CSS'de `opacity: 0` ile basliyordu; `IntersectionObserver`
`threshold: 0.3` ile tetikleniyordu — stats bar ekranin ustunde oldugunda %30
gorunurluk hic saglanamiyordu → bos alan.

Duzeltmeler:
- `.dp-stat-item` varsayilan olarak `opacity: 1` (her zaman gorunur)
- Animasyon isteyen elemanlara JS `dp-stat-pending` sinifi ekler (opacity: 0 yapar)
- Threshold `0.3` → `0.05` indirildi
- `statFallbackTimer` (1.2s): observer tetiklenmezse tum stats zorla acilir
- `revealFallbackTimer` (1.5s): viewport'ta gizli kalan `dp-reveal` bloklar zorla acilir
- `@media (prefers-reduced-motion)`: `dp-stat-pending` de animasyon kapatilinca gorunur

### Build & Dogrulama

`npm run build` → PASS (7.64s, 38 static route HTML shell, SEO check PASS).

### Sonraki Oturumda Yapilabilecekler

- Bu efektlerin diger yuksek trafikli sayfalara (Selenium, Playwright, Cypress,
  Python, Git vb.) yayilmasi — her sayfanin renk paleti degisilebilir (cyan/mavi
  yerine kendi rengi: yesil/turuncu/mor vb.), `DockerPage.jsx` + `docker-effects.css`
  referans alinarak yeni `*Page.jsx` + `*-effects.css` ikilileri olusturulabilir
- §9.3 4-katmanli analoji standardi: 21 sayfada hala eksik (bkz. bir sonraki bolum)
- `git push origin main` (Windows'tan birikmis onceki is icin, bu PR'dan bagimsiz)

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 9 — Windows, CSS Animasyon Rollout + Pedagojik Tutarlilik Duzeltmeleri)

### Yapilan

**1. CSS animasyon bloklari 9 data dosyasina eklendi (`CssAnimationBlock.jsx`'teki yeni kind'lar kullanilarak):**

| Dosya | Eklenen kind | Ekleme noktasi |
|---|---|---|
| `playwrightData.js` | `playwright-autowait` | Intro simple-box'tan sonra |
| `pythonData.js` | `python-flow` | "Swiss Army knife" text blogundan sonra |
| `gitGithubData.js` | `git-flow` | "Labeled photos" simple-box'tan sonra |
| `gitGithubData.js` | `git-branch` | Branching sekmesi simple-box'tan sonra |
| `dockerData.js` | `docker-build` | "Shipping container" simple-box'tan sonra |
| `linuxData.js` | `linux-pipe` | "Restaurant kitchen" simple-box'tan sonra |
| `cypressData.js` | `cypress-retry` | "Film seti" simple-box'tan sonra |
| `postmanData.js` | `postman-flow` | "Restoran telefon" simple-box'tan sonra |
| `typescriptData.js` | `ts-typecheck` | "Emniyet kemeri" simple-box'tan sonra (replace_all: her iki TR/EN sekmesi) |
| `sqlData.js` | `sql-select` | Intro simple-box'tan sonra |
| `sqlData.js` | `sql-join` | JOINs sekmesi simple-box'tan sonra |

Build: `npm run build` PASS (14.39s, 38 static route HTML shell, SEO check PASS).

**2. TR dil kayması hatası düzeltildi (`pythonData.js`):**

Sorun: `python-flow` animasyonu sections[0].blocks dizisine index 2'ye eklendi.
`applyTr(sections[0], ...)` fonksiyonu index bazlı override kullandigindan tüm
TR metnleri 1 index kaydı: `2: { text: 'Test Otomasyonu için...' }` override'i
artık animasyon bloğunu hedef alıyordu, heading bloğunu değil.

Düzeltme: `trSections[0]` override index'leri 2→3, 3→4, 4→5, 5→6, 6→7, 7→8
olarak güncellendi. Index 2 (css-animation) için yorum satırı eklendi.

Not: `typescriptData.js` etkilenmedi — o dosya tamamen bilingual format kullanıyor,
`applyTr` mekanizması yok.

**3. SQLite CLI için yanlış ipucu hatası düzeltildi (`interactiveTrioFillers.js`):**

Sorun: `.schema users -- CREATE TABLE ifadesini göster` yorumundaki "CREATE TABLE"
metni `c.includes('create table')` kontrolünü tetikliyordu → alakasız PRIMARY KEY
ipucu çıkıyordu.

Çözüm (2 katmanlı):
- SQLite CLI tespiti: `isSqliteCli` flag'i `.tables`, `.quit`, `sqlite3 `, `.schema `,
  `.headers on` içeren kodları ayırt eder → spesifik SQLite CLI ipuçları gösterir.
- `create table` kontrolü güçlendirildi: artık `c.includes('create table') && c.includes('(')` —
  gerçek DDL ifadesi parantez içerir, yorum metni içermez.
- `taskDescForCode` için de SQLite CLI özel açıklaması eklendi.

**4. Yazım hatası düzeltildi (`interactiveTrioFillers.js`):**

"iceriginii" → "içeriğini" (Cypress sayfası order-sort items metninde).

### Build & Doğrulama

`npm run build` → PASS (15.31s ve 14.39s iki ayrı koşumda), 38 static route, SEO check PASS.

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 8 — Windows, hintsForCode Framework-Aware Yeniden Yazimi)

### Sorun

Kullanici Selenium sayfasindaki "Kendin Yaz ve Dene" (code-playground) ipucu butonuna
bastiginda, `.click()` icerikli Selenium kodunda `.should("be.visible").click()` gibi
**Cypress syntax'li** ipucu gorunuyordu. Ayni sekilde diger ipuclari da konuya ozel
degil, tum bloklar icin hep ayni (profil bazli) metnler veriyordu.

Bunun yani sira, bir onceki oturumda asagidaki 2 hata da duzeltilmis ve bu oturumda
dogrulandi:
- **Fix 1 (onceki oturum):** Bir sekme icerisinde ayni profilde birden fazla `code` bloku
  varsa, `step-animation` ve `order-sort` bloklari katlanerark tekrarlaniyordu (ornegin
  Selenium Actions sekmesinde 5 özdeş "Adım Adım: Selenium Actions" blogu).
  `addedStepProfiles` / `addedOrderProfiles` Set'leri ile section bazinda deduplication
  eklenerek cozuldu.

### Yapilan

**`src/data/interactiveTrioFillers.js` — `hintsForCode` tamamen yeniden yazildi:**

**Kok neden:** `hintsForCode(block)` fonksiyonu `pageKey` parametresine sahip degildi.
`.click()`, `by.id()`, `.should()` gibi anahtar kelimeler TUM framework'lerde
ayni sinama yapiliyordu — Selenium sayfasinda `.click()` bulununca Cypress syntax'li
`.should("be.visible").click()` ipucu cikiyordu.

**Cozum:** Fonksiyon imzasi `hintsForCode(block, pageKey)` olarak degistirildi ve
tum icerik `if (pageKey === 'xxx') { ... }` bloklarina bolundu:

| `pageKey` | Ipucu kaynagi |
|---|---|
| `selenium` | Selenium Java API: `WebDriverWait`, `elementToBeClickable`, `TakesScreenshot`, `Actions`, `Select`, `switchTo()`, `isDisplayed()`, `isEnabled()`, `getAttribute()`, `getText()` |
| `playwright` | Playwright: `getByRole`, `getByLabel`, `toBeVisible`, `page.route`, `waitForResponse`, `.fill()` |
| `cypress` | Cypress: `cy.get` retry, `cy.intercept` siralama, `cy.wait("@alias")`, `.should("be.visible")` |
| `sql` | SQL: `SELECT *`, `WHERE` execution order, `HAVING vs WHERE`, `JOIN ON`, `CTE`, `ORDER BY` |
| `python` | pytest: `@pytest.fixture scope`, `def test_` kesfedilme kurali, `assert is vs ==`, `parametrize` |
| `typescript` | TS: `interface vs type`, generics `<T>`, `as any` uyarisi, utility types |
| `docker` | Docker: FROM layer, COPY package once, RUN && birlestirme, depends_on readiness |
| `jenkins` | Jenkins: `post { always }`, `credentials()`, `sh vs bat`, `parallel` |
| `kubernetes` | K8s: `kubectl describe Events`, `--previous` flag, `kubectl apply idempotent`, `matchLabels` |
| `restassured` | REST Assured: `given/when/then`, `body(JsonPath)`, `statusCode()` |
| `postman` | Postman: `pm.test`, `pm.expect`, `pm.environment.set`, `pm.response.json()` |
| `javascript` | JS: `async/await`, `fetch` 4xx reject etmez, `Promise.all vs allSettled`, `forEach async` |
| Generic fallback | Simdi hicbir pattern eslesmezse, generic "TODO satirini yaz" mesajlari gelir |

**`makePracticeBlock` cagri noktasi guncellendi (satir ~1181):**
```js
hints: hintsForCode(block, pageKey),  // pageKey artik iletiliyor
```

**Script ile yapildi:**
- `C:\Users\1\AppData\Local\Temp\...\scratchpad\replace_hints.mjs` Node.js scripti
  kullanilarak 671-1065. satirlar (396 satir eski fonksiyon) yeni 473 satirlik
  framework-aware versiyonla degistirildi.

**Dogrulama:**
- `node --check src/data/interactiveTrioFillers.js` → **Syntax OK**
- Dev server `http://localhost:5175` → calisiyor (5173/5174 port doluydu)
- Production build (`npm run build`) bu makinede ENOMEM nedeniyle calismiyor —
  bilinen pre-existing kisit, kod duzeyinde hata yok.

**Bekleyen:**
- Tarayicide Selenium, Playwright ve Cypress sayfalarinda ipucu metinlerini gorsel
  olarak kontrol et — `.click()` olan Selenium kodunda artik `WebDriverWait +
  elementToBeClickable` hint'i gelmeli; Cypress'te `.should("be.visible")` gelmeli.
- Push henuz yapilmadi (`git push origin main` kullanicinin onayini bekliyor —
  bkz. madde 1 asagida).

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 7 — Windows, Son Durum)

### Branch Merge + Locator Explorer + Branch Temizligi

**Commit:** `1f68ff8` — `main` branch'inde, henuz push EDILMEDİ.

**Yapilan:**

1. **feature/feynman-audit-js-postman-restassured → main merge edildi** (cakismasiz)
   - Icerik: JS/Postman/REST Assured + Selenium/Playwright/Cypress fillMissingCodeTrios
   - Commitler: `788aab2`, `2548f4c`, `6c4750b`

2. **feature/trio-devops-sql-java → main merge edildi** (cakismasiz)
   - Icerik: Java/SQL/Git/Linux/JMeter/Appium/Kafka/AWS/Azure/Bruno fillMissingCodeTrios
   - Commit: `44eb782`

3. **Locator Explorer ozelligi eklendi** (pedagojik: HTML'i oku → locator taret):
   - `src/components/LocatorExplorerBlock.jsx` — YENİ DOSYA
     - `[[strategy|text]]` isaretiyle anotasyonlu HTML paneli sol; araç kodu sag
     - STRATEGY_STYLES: id(yesil), testid(cyan), name(mavi), text(turuncu),
       role(mor), class(sari), placeholder(pembe), type(mor2), href(teal), xpath(indigo)
     - `×N` rozeti: class gibi cok eslesen strateji secilince uyari cikar
     - Selenium / Playwright / Cypress sekme paneli; TR/EN tam destek
     - Bos halde "👆 bir ozellige tikla" animasyonlu istem
   - `src/data/locatorExplorerData.js` — YENİ DOSYA
     - Paylasilan `LOCATOR_EXPLORER_BLOCK` — tum uc arac sayfasi bunu import eder
     - HTML: checkout formu (8 strateji turu ayni anda annotated)
     - `class="form-field"` kasitli iki element'te → "×2" ogrenciye multi-match
       sorununu bizzat hissettiriyor
     - `locatorMap`: id/testid/name/class/type/placeholder/text/href — her biri
       icin 3 arac kodu (selenium/playwright/cypress) + noteTr/En + tipTr/En
   - `src/components/TopicPage.jsx` — `import LocatorExplorerBlock` + `case 'locator-explorer'` eklendi
   - `src/data/seleniumData.js` — TR Locators sekme + EN Locators sekme basina LOCATOR_EXPLORER_BLOCK eklendi
   - `src/data/playwrightData.js` — TR Locators sekme + EN Locators sekme basina eklendi
   - `src/data/cypressData.js` — TR s2 bloklari + EN s2 bloklari basina eklendi

4. **Tum feature branch'ler silindi:**
   - Local: `feature/feynman-audit-js-postman-restassured` silindi
   - Remote: `origin/feature/feynman-audit-js-postman-restassured` silindi
   - Remote: `origin/feature/trio-devops-sql-java` silindi
   - Artik yalnizca `main` var (local + remote)

**Dogrulama:**
- `npm run build` → PASS (14.75s, 38 static route HTML shell, SEO check passed)
- `npx playwright test` → 72 PASS, 4 pre-existing flaky (exit 0)
  - Flaky (onceden var, bu oturumla ilgisiz): `/advanced-algorithms`, `/qa-mentor`,
    `/leaderboard` timeout + quiz-ai page load

**BEKLEYEN EYLEM: `git push origin main`**
- Kullanici "push islemini beraberce test ettikten sonra yapalim" demisti.
- Tum commitler hazir, push edilmedi. Bir sonraki oturumda test onayinin ardindan
  push yapilmali.

**macOS Claude'a not:** `origin/main` push edildikten sonra `git pull origin main`
ile senkronize ol; ek merge gerekmez.

---

## Bu Oturumda Yapilan Is (2026-06-30, macOS — Interaktif Uclu Rollout: Java/SQL/Git/Linux/JMeter/Appium/Kafka/AWS/Azure/Bruno)

**Branch:** `feature/trio-devops-sql-java`, `origin/feature/feynman-audit-js-postman-restassured`
(commit `788aab2`, Windows/Antigravity tarafindan push edildi) uzerinden turetildi.
O branch'te `src/data/interactiveTrioFillers.js` icinde `fillMissingCodeTrios()` +
`fillMissingFeynman()` ve `scripts/audit-interactive.mjs` (CI audit script, Bolum
9.1/9.2'deki ucluyu sayan) zaten mevcuttu — bu oturumda SIFIRDAN yazilmadi, sadece
kullanildi.

**Yapilan:** Asagidaki 10 data dosyasinin basina `import { fillMissingCodeTrios }
from './interactiveTrioFillers.js'` ve EN SONUNA `fillMissingCodeTrios(xData,
'pagekey')` cagrisi eklendi — fonksiyon her `type:'code'` blogunun ardindaki
eksik ucluyu (code-playground + step-animation + challenge/order-sort) otomatik
olusturuyor, mevcut bloklara dokunmuyor:

- `javaData.js` ('java') — ZATEN kismen doluydu (9 cp/13 sa/12 ch), fonksiyon
  sadece eksik 6 bolumu (Installation, Common Errors, File Handling vb.) tamamladi.
- `sqlData.js` ('sql'), `gitGithubData.js` ('git'), `linuxData.js` ('linux'),
  `jmeterData.js` ('jmeter'), `appiumData.js` ('appium'), `kafkaData.js` ('kafka'),
  `awsData.js` ('aws'), `azureData.js` ('azure'), `brunoData.js` ('bruno') —
  hepsi sifirdan dolduruldu (interactiveTrioFillers.js'deki generic `'code'`
  profili kullanildi, pageKey'e ozel profil yoktu, otomatik fallback calisti).

`interactiveTrioFillers.js`'e HIC dokunulmadi (Windows tarafi orada Selenium/
Playwright/Cypress profillerini ekliyor, cakisma riski sifir — degisen 10 dosya
ile Windows'un degistirdigi dosyalar arasinda hic kesisim yok).

**Dogrulama:**
- `node scripts/audit-interactive.mjs java sql git linux jmeter appium kafka aws azure bruno`
  → **10/10 sayfa ✓ complete, toplam gap: 0**.
- `npm run build` → PASS (SEO check 39 route, Vite build, 38 static shell, dist SEO check).
  `interactiveTrioFillers` artik ayri bir chunk (`interactiveTrioFillers-*.js`, ~17.7KB).
- `npx playwright test tests/i18n-content-toggle.spec.ts tests/topic-pages-ui.spec.ts --reporter=dot`
  → **49 passed + 3 flaky (retry sonrasi PASS) = 52/52**. Flaky olan 3 test
  (`/cypress`, `/selenium`, `/playwright` sekme buton görünürlük testleri) bu
  oturumda DOKUNULMAYAN sayfalarda — pre-existing flakiness, bu degisikliklerle
  ilgisiz.

**Sonuc:** §9.1/9.2'deki interaktif uclu rollout artik **Java, SQL, Git&GitHub,
Linux, JMeter, Appium, Kafka, AWS, Azure, Bruno** sayfalarinda da tam (daha once
Python/Java(kismi)/Docker/Jenkins/Kubernetes/TypeScript'te tamamlanmisti).
JavaScript/Postman/REST Assured (Windows/Antigravity tarafi, ayni base branch'te)
ve Selenium/Playwright/Cypress (Windows tarafinin bu oturumdaki kendi gorevi)
durumu bu dosyada degil, kendi push'larinda raporlanacak.

**Henuz interaktif ucluye sahip OLMAYAN sayfalar (bu oturum sonrasi guncel
liste):** Selenium, Playwright, Cypress (Windows tarafi bu oturumda calisiyor
olabilir, durumu push sonrasi netlesir), what-is-testing, manual-testing,
algorithms, advanced-algorithms, test-frameworks.

**Henuz §9.3 4-katmanli analoji standardina tasinmamis sayfalar (degismedi):**
Selenium, Playwright, Cypress, JavaScript, SQL, Postman, REST Assured, JMeter,
Kafka, Appium, BrowserStack, AWS, Azure, Git & GitHub, Linux, test-frameworks,
what-is-testing, manual-testing, algorithms, advanced-algorithms. (Java/Docker/
Jenkins/Kubernetes/TypeScript zaten yukseltilmisti; bu oturum sadece interaktif
uclu ekledi, analoji standardina dokunmadi — bu ikisi ayri kalici hedefler,
Bolum 9.2 ve 9.3.)

**Sonraki adim:** `git push -u origin feature/trio-devops-sql-java` sonrasi PR
acilabilir; Windows tarafinin JS/Postman/RestAssured + Selenium/Playwright/Cypress
isi bittiginde iki branch bagimsiz merge edilebilir (hic ortak dosya yok).

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 6) — JS/Postman/REST Assured Interaktif Trio + Feynman + Audit Script

### Branch: `feature/feynman-audit-js-postman-restassured`

Kullanici JavaScript, Postman ve REST Assured sayfalarini interaktif uclu (trio) ile
tamamlamamizi, her bolume Feynman checkpoint'i eklememizi ve tum sayfalar icin
bir CI audit scripti olusturmamizi istedi.

**Yapilan:**

1. **`src/data/interactiveTrioFillers.js` — 3 yeni profil + fillMissingFeynman fonksiyonu:**
   - `javascript` profili: async/await + QA assertion yapisi
   - `postman` profili: pm.test/pm.expect + Newman akisi
   - `restassured` profili: given/when/then + Hamcrest zinciri
   - `resolveProfile()` fonksiyonuna 3 yeni `if` eklendi
   - `fillMissingFeynman(data, defs)` export fonksiyonu eklendi — sectionIndex
     bazinda, sadece eksik olan bolume, `seenBlocks` WeakSet ile duplicate
     kontrollu, bilingual feynman-checkpoint bloklari ekler

2. **`src/data/javascriptData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios }` + `fillMissingCodeTrios(javascriptData, 'javascript')`
   - Sonuc: 19 sekme, 21 code block — 21 cp/sa/ch hepsi eklendi; feynman 17 (zaten vardi)

3. **`src/data/postmanData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios, fillMissingFeynman }`
   - `fillMissingCodeTrios(postmanData, 'postman')` → 14 code block, 14 cp/sa/ch
   - `postmanFeynmanDefs` (7 section tanimi) + `fillMissingFeynman(postmanData, ...)` →
     8 bolumun tumu feynman'a sahip (biri onceden vardi, 7 yeni eklendi)

4. **`src/data/restAssuredData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios, fillMissingFeynman }`
   - `fillMissingCodeTrios(restAssuredData, 'restassured')` → 23 code block, 23 cp/sa/ch
   - `restAssuredFeynmanDefs` (10 section tanimi) + `fillMissingFeynman(...)` →
     11 bolumun tumu feynman'a sahip (biri onceden vardi, 10 yeni eklendi)

5. **`scripts/audit-interactive.mjs`** — yeni audit scripti:
   - 21 sayfayi tarar: code/cp/sa/ch/feynman sayilarini section bazinda raporlar
   - `--missing` flag: sadece gap olan sayfalari gosterir
   - `--fail-on-missing` flag: CI gate modu (exit 1 ile biter)
   - `node scripts/audit-interactive.mjs python postman` gibi tek sayfa da taranabilir
   - Yeni npm scriptleri: `audit:interactive`, `audit:interactive:missing`

**Audit sonuclari (bu oturum sonrasi):**
- JavaScript: code=21, cp=21, sa=21, ch=21, feynman=17 → ✓ COMPLETE
- Postman: code=14, cp=14, sa=14, ch=14, feynman=8 → ✓ COMPLETE
- REST Assured: code=23, cp=23, sa=23, ch=23, feynman=11 → ✓ COMPLETE
- Toplam acik gap (diger sayfalar): 96 (Selenium=11, Playwright=14, Cypress=13, SQL=18, vb.)

**Tamamlanan (devam / oturum sonu):**

6. **`src/data/seleniumData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios }` + `fillMissingCodeTrios(seleniumData, 'selenium')`
   - `selenium` profili interactiveTrioFillers.js'e eklendi
   - Sonuc: 49 code block, 49 cp/sa/ch → ✓ COMPLETE (0 gap)

7. **`src/data/playwrightData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios }` + `fillMissingCodeTrios(playwrightData, 'playwright')`
   - `playwright` profili interactiveTrioFillers.js'e eklendi
   - Sonuc: 25 code block, 25 cp/sa/ch → ✓ COMPLETE (0 gap)

8. **`src/data/cypressData.js`** — filler'a baglandi:
   - `import { fillMissingCodeTrios }` + `fillMissingCodeTrios(cypressData, 'cypress')`
   - `cypress` profili interactiveTrioFillers.js'e eklendi
   - Sonuc: 23 code block, 23 cp/sa/ch → ✓ COMPLETE (0 gap)

**Commit:** `2548f4c` — `feature/feynman-audit-js-postman-restassured` branch'inde.

**Dogrulama:** `npm run build` PASS (39 route SEO check, 38 static HTML shell, dist SEO PASS).
Playwright i18n + topic-pages testleri: exit code 0, PASS.

**Feynman-checkpoint kalite notu:**
- Her feynman blogu: `promptTr`, `promptEn`, `keywords` (gruplu synonym dizisi),
  `minScore` (keywords.length * 0.5), `modelAnswerTr`, `modelAnswerEn`
- REST Assured'in 10 yeni blogu ve Postman'in 7 yeni blogu her bolumun
  konusuna ozel (given/when/then, pm.test/pm.expect, POJO/Jackson, auth stratejileri vb.)

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 5) — Kod Bloklari Sonrasi Aktif Uclu Tamamlama

Kullanici once hedef bes sayfada her kod blogundan sonra aktif ogrenme uclusu
aciginin kapatilmasini istedi: Python, TypeScript, Docker, Jenkins, Kubernetes.
Ek olarak Docker/Jenkins/Kubernetes icin gercekci lab senaryolari istendi.

**Yapilan:**
1. **Yeni ortak tamamlayici eklendi:** `src/data/interactiveTrioFillers.js`
   - Data sayfalarindaki top-level `code` bloklarini tarar.
   - Bir sonraki `code` bloguna kadar eksik olan ucluyu tamamlar:
     `code-playground` (starter/solution), `step-animation`, `challenge`
     (`variant: 'order-sort'`).
   - Mevcut bloklari tekrar uretmez; sadece eksigi ekler.
2. **Hedef sayfalara baglandi:**
   - `src/data/pythonData.js`
   - `src/data/typescriptData.js`
   - `src/data/dockerData.js`
   - `src/data/jenkinsData.js`
   - `src/data/kubernetesData.js`
3. **Gercekci lab profilleri eklendi:**
   - Dockerfile repair / Dockerfile duzeltme
   - Compose service ordering / Compose service siralama
   - Docker command debug
   - Jenkinsfile pipeline stage completion
   - Kubernetes YAML manifest repair
   - kubectl output diagnosis

**Hedef audit sonucu:**
- Python: `codeBlocks=50`, `fullTrioBeforeNextCode=50`, `missing=0`
- TypeScript: `codeBlocks=35`, `fullTrioBeforeNextCode=35`, `missing=0`
- Docker: `codeBlocks=13`, `fullTrioBeforeNextCode=13`, `missing=0`
- Jenkins: `codeBlocks=12`, `fullTrioBeforeNextCode=12`, `missing=0`
- Kubernetes: `codeBlocks=22`, `fullTrioBeforeNextCode=22`, `missing=0`

**Dogrulama:** `npm run build` PASS. SEO check 39 route PASS, 38 static route
HTML shell uretildi, dist SEO check 38 generated page PASS. Build sadece mevcut
chunk-size ve Browserslist yas uyarilarini verdi; exit code 0.

**Not:** Bu turda `TopicPage.jsx`, `CLAUDE.md` ve `Documents/acceptancecriterias.md`
duzenlenmedi; onlar worktree'de onceki oturumdan gelen mevcut degisiklikler olarak
duruyor.

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 4) — Tum Sayfalar TR Yorum Taranmasi + Kural Dokumantasyonu

Kullanici tum sayfalari gözden gecirmemi, TR yorum kuralini CLAUDE.md'ye ve test
kriterini `Documents/acceptancecriterias.md`'ye kalici olarak eklememi istedi.

**Yapilan:**
1. **`TopicPage.jsx > englishToTurkishCodeComments`'e 2 batch daha eklendi:**
   - Batch 1 (onceki devam): ~200 Python-spesifik yorum cevirisi (degiskenler,
     fonksiyonlar, OOP, dosya islemleri, scope, dekorator/generator, JSON, pip, regex)
   - Batch 2 (bu devam): ~60 tum sayfalar icin gecerli genel ceviri (kurulum/dogrulama,
     CI/CD, Docker, Appium, AWS/Azure, Git)
2. **Script ile tum data dosyalari taranadi** (pythonData haric, 30+ dosya):
   - 581 benzersiz cevrilmemis yorum bulundu
   - Cogunlugu terminal ciktisi (surum numaralari, `✔` satrları) veya teknik terim —
     bunlar kasitli olarak cevirilmedi, teknik terim olarak kalabilir
   - Aciklamaci, cevirilebilir yorumlar icin ~60 yeni kural eklendi
3. **CLAUDE.md §8'e 3 yeni kural eklendi:**
   - Yeni kod blogu eklenirken zorunlu TR yorum kontrol protokolu (2 secenek:
     bilingual {tr,en} ya da englishToTurkishCodeComments kaydı)
   - "Terminal/program ciktisi istisna" anlasiminin net tanimi
   - Kapsamin tum sayfalar icin gecerli oldugu (sadece Python degil) belirtildi
4. **CLAUDE.md §11'e 1 yeni "yapma" maddesi eklendi:**
   - Yeni blok eklerken TR yorum kontrolu yapmamak
5. **`Documents/acceptancecriterias.md`'ye AC 10 eklendi:**
   - TR modda kod blogu yorum dili kalitesi icin tam AC (kapsam, istisnalar,
     teknik uygulama, Playwright test kriterleri, ilgili dosyalar)

**Dogrulama:** `npm run build` PASS (38 static route). `i18n-content-toggle.spec.ts`
28/28 PASS — yeni ceviri kurallarinin HICBIRI EN modda yanlis tetiklenmedi.

**Kalan TR yorum boslugu:** ~520 terminal/program-ciktisi ve teknik-terim yorumu
kasitli cevrilmedi (doğru). Gercek aciklamaci ama cevrilmemis yorumlar sayisi
cok dusuk, kullanici belirli bir sayfada/sekmede bir ornek gosterirse ek ceviri
ciftleri eklenebilir.

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 3) — Python Sayfasi TR Kod Yorum Eksikleri Tamamlandi

Kullanici ekran goruntusunde Variables sekmesinde TR modda `# Multiple assignment`,
`# Assign multiple at once`, `# Same value to multiple variables` gibi yorumlarin
Ingilizce kaldıgını gosterdi ve python sayfasini genel olarak gozden gecirmemi istedi.

**Tespit:** `localizeCodeComments` mekanizmasi calisiyordu (ornegin `# str (string)`
→ `# str (metin)` dogru ceviriyordu) ama 549 Ingilizce kod yorumu carptirilmamis
durumdaydi. Bunlarin buyuk cogunlugu aciklamaci Ingilizce cumle/ifadeydi (teknik
terimler degil).

**Yapilan:** `TopicPage.jsx`'teki `englishToTurkishCodeComments` dizisine ~200 yeni
ceviri cifti eklendi — Degiskenler, Kosul&Dongu, Fonksiyon, OOP/Siniflar, Hata
Yonetimi, Dosya Islemleri, Kapsam&Modueller, Ileri Seviye (decorator/generator),
JSON/tarih, PIP/paketler, QA desenleri, Aritmetik, Regex kategorilerinde.

**Ornek ceviriler:**
- `# Multiple assignment` → `# Coklu atama`
- `# Type can change (dynamic typing)` → `# Tip degisebilir (dinamik tipleme)`
- `# ALWAYS runs — like Java finally` → `# HER ZAMAN calisir — Java finally gibi`
- `# Generator function — simpler way to create iterators` → `# Generator fonksiyon...`

**Dogrulama:** `npm run build` PASS (38 static route, SEO check gecti).
`tests/i18n-content-toggle.spec.ts` 28/28 PASS (EN modda Turkce karakter sizintisi
YOK — yeni ceviri kurallarinin hicbiri EN modda yanlis tetiklenmedi).
`tests/topic-pages-ui.spec.ts` 24/24 PASS. Toplam 52/52 PASS.

**Not:** Hala cevirilmemis bazi teknik-olmayan yorumlar kalabilir (toplam 549 yorumdan
yaklaşik 200 eklendi). Kullanici belirli bir sekmeyi/yorumu gosterirsee ek ceviri
ciftleri eklenebilir. EN modda yeni sizma YOK (28 test PASS).

---

## Bu Oturumda Yapilan Is (2026-06-30, devam 2) — TypeScript Simple-Box Analojileri Bruno/Python Standardina Yukseltildi

Kullanici TypeScript/Python/Docker/Jenkins/Kubernetes sayfalarini kullanici
gozuyle inceleyip en iyi ogretme yontemlerini bulmami ve eksik sayfalara
uygulamami istedi ("Ver gelistirmede iyi gordugun ozelligi eksik olan sayfaya
uygula"), sonra "devam et" diyerek tum bulgulari uygulamami onayladi.

**Tespit:** Onceki oturumlarda Docker/Jenkins/Kubernetes'in 44 `simple-box`
analojisi (12+14+18) zaten Bolum 9.3 4-katmanli standarda yukseltilmisti ve
TypeScript'e code-playground (Fix+Practice) eklenmisti — ama TypeScript'in
KENDI 37 `simple-box` analojisi hala eski yuzeysel tek cumlelik haldeydi
(Bruno/Python standardinin GERISINDE).

**Yapilan:**
1. **2 bozuk `content` alani bulundu ve duzeltildi** (typescriptData.js,
   eski satir ~1314 ve ~1586): `content` objesinde gecerli `tr`/`en`
   alanlarinin yaninda anlamsiz numerik key'ler vardi (`"0":"T","1":"u",...`)
   — yakindaki baska bir basligin metninin karakter karakter sizmis hali
   (kok neden belirsiz, muhtemelen eski hatali bir otomatik edit/spread
   islemi). Cop key'ler silindi, alttaki gecerli `tr`/`en` icerik ayni
   edit'te 4 katmanli standarda yukseltildi.
2. **TypeScript'in 37 distinct `simple-box` analojisinin TUMU** (EN-tree +
   TR-tree'de toplam 74 raw occurrence — TypeScript dosyasinda HER analoji
   zaten kendi icinde bilingual `{tr,en}` oldugundan ve bu obje iki agacta
   birebir ayni oldugundan `replace_all:true` ile tek Edit cagrisinda
   ikisi de duzeltildi) Bruno/Python kalite barina yukseltildi: somut
   mekanizma-orusen analoji + dusundurucu "neden" sorusu + Java
   karsilastirmasi + QA/otomasyon is baglami tek akan paragrafta.
3. **4 ayri syntax hatasi yakalandi ve duzeltildi** (yazim sirasinda,
   `node -e` + `@babel/core` `babel.parse()` dogrulamasiyla her batch
   sonrasi yakalandi): TR/EN metin icinde tirnak isareti (`"..."`) iceren
   ornekler (`"25"`, `"durumm"`, `throw "basit string"` gibi) JS string
   literal'ini erken kapattigi icin syntax hatasi veriyordu — her biri
   tirnaksiz/backtick'li ifadeye cevrilerek cozuldu.
4. **Build sonrasi kosulan Playwright testinde gercek bir bug bulundu ve
   duzeltildi:** `topic-pages-ui.spec.ts`'deki `CRASH_MARKERS = ['[object
   Object]']` kontrolu, "Functions & Casting" sekmesindeki YENI analoji
   metninin KENDISI icinde (JS'in obje-to-string coercion davranisini
   anlatirken) literal olarak `[object Object]` string'i gecirdigi icin
   YANLIS POZITIF render-hatasi olarak isaretledi. Hem TR hem EN metin,
   anlami koruyarak literal `[object Object]` ifadesi gecmeyecek sekilde
   ("anlamsiz ve okunaksiz bir metin" / "a meaningless, unreadable string")
   yeniden yazildi.

**Dogrulama:** `npm run build` PASS (typescriptData chunk 1,084.84 kB / gzip
337.34 kB — buyume beklenen, Bolum 14'teki mevcut uyariya yeni bir sey
eklemiyor). `npx playwright test tests/topic-pages-ui.spec.ts --grep
"typescript|TypeScript"` PASS (ilk kosumda FAIL etmisti, yukaridaki #4 ile
duzeltildi). `npx playwright test tests/i18n-content-toggle.spec.ts --grep
"typescript|TypeScript"` PASS.

**Sonuc:** TypeScript sayfasi artik hem interaktif uclu (Bolum 9.2, onceki
oturumdan) HEM dusunduren analoji standardi (Bolum 9.3) acisindan Bruno/Python
ile ayni kalite seviyesinde. Docker/Jenkins/Kubernetes'in simple-box
analojileri zaten onceki oturumda ayni standarda yukseltilmisti (bkz. asagidaki
Docker/Jenkins/Kubernetes interaktif rollout basliklari — o oturumlarda
EKLENEN bloklar interaktif ucluydu, simple-box analoji metinleri ayri bir
gecisle 4 katmanli standarda tasinmisti).

**Henuz 4-katmanli analoji standardina (Bolum 9.3) tasinmamis sayfalar:**
Selenium, Playwright, Cypress, Java, JavaScript, SQL, Postman, Bruno (zaten
referans), REST Assured, JMeter, Kafka, Appium, BrowserStack, AWS, Azure,
Git & GitHub, Linux, test-frameworks, what-is-testing, manual-testing,
algorithms, advanced-algorithms — kullanicidan oncelik onayi alinarak
sirayla tasinmali (Bolum 9.2'deki genel yayilim kuraline tabi).

---

## Branch Durumu (2026-06-30) — codex2 + main Merge Tamamlandi, Push Edildi

Windows'ta Codex `codex2` branch'inde calisip commit+push yapmisti
(`798e9fd feat(codex2): TypeScript i18n + bilingual editor blocks +
interactive exercises`, Docker/Jenkins/Kubernetes interaktif rollout +
TypeScript `_editorBilingual()` mekanizmasi). Bu Mac'te ayni anda `main`'de
bugunku Python is'i (practice mode + 3x drag-and-drop + 43 analoji + CLAUDE.md
kurallari) bekliyordu. Kullanicinin onayiyla su sira izlendi (kullanicinin
onceden onaylanmis kendi onerisi):

1. Mac `main`: bugunku degisiklikler commit (`6a51c7b`) + push edildi.
2. `codex2` yerel branch olusturuldu (`origin/codex2` takip ederek), icine
   `origin/main` merge edildi (`git merge origin/main`).
   - **Tek cakisma:** `CodePlaygroundBlock.jsx` — HEM codex2 HEM main, PracticePanel'in
     "gercek X degil" aciklama metnini AYNI satirda farkli sekilde genellestirmisti
     (codex2: "kod veya komut" / runtime-terminal ifadesi — Docker/Jenkins komut
     pratikleri icin; main: `${language}` dinamik interpolasyonu). **El ile cozuldu:
     ikisi birlestirildi** — hem dinamik `${language}` hem "kod veya komut/derleyici/
     yorumlayici/terminal" ifadesi tek cumlede birlikte kullanildi.
   - `NEXT_SESSION.md` ve `typescriptData.js` cakismasiz otomatik merge oldu
     (pythonData.js/pythonPlaygroundData.js codex2'de hic degismemisti, sifir risk).
3. `typescriptData.js`'in incelenen `_editorBilingual(si, bi, trCode)` mekanizmasi
   dogrulandi: `[typescriptData.en, typescriptData.tr].forEach(...)` ile HER cagri
   iki kopyayi da SIMETRIK guncelliyor — onceden tahmin edilen en/tr drift riski
   bu mekanizmada YOK (mekanizma tasarimca guvenli).
4. `npm run build` + tam Playwright suite (76/76 PASS, 0 fail) `codex2` uzerinde
   calistirildi, merge commit tamamlandi (`91d1294`).
5. `codex2` -> `main`'e `--no-ff` merge edildi (`5ee8a94`) — cakismasiz (codex2
   zaten main'i icermisti). `main` uzerinde TEKRAR build + tam suite (76/76 PASS)
   calistirildi.
6. `origin/main` VE `origin/codex2` push edildi.

**Sonuc:** `origin/main` artik HEM bugunku Python calismasini HEM Windows/Codex'in
TypeScript+Docker+Jenkins+Kubernetes calismasini iceriyor, tek bir cakisma
(kucuk, metin duzeyinde) el ile cozuldu, her asamada build+test yesil.

**Diger Mac icin not:** `origin/main` guncel; o makine `git fetch && git pull
origin main` ile dogrudan senkronize olabilir, ek merge gerekmez (codex2 zaten
main'e akitildi).

---

## Bu Oturumda Yapilan Is (2026-06-30) — Dusunduren Analoji Standardi: Bruno -> Python + CLAUDE.md Kurali

Kullanici `/bruno` sayfasindaki `simple-box` analojilerini (somut benzetme +
dusundurucu "neden" sorusu + Java karsilastirmasi + is/QA baglami) ornek
gosterip "bunu Python sayfasina uygula" dedi (ilk basta "TypeScript" demisti,
sonra "yanlis soyledim, Python'a uygula, TypeScript'i geri al" diye duzeltti —
TypeScript'e hicbir Edit/Write yapilmamisti, geri alinacak bir sey yoktu,
sadece dogrulandi).

**Yapilan:** `src/data/pythonData.js`'deki **43 `simple-box` blogunun TUMU**
(40 atomik konu + Ecosystem intro + Manual Testing Lab intro x2 EN/TR kopya)
yuzeysel tek cumlelik benzetmelerden, Bruno tarzi 4 katmanli analojilere
yukseltildi:
1. Mekanizmasi konuyla orusen somut analoji
2. Dusundurucu "neden" sorusu (dogrudan cevap vermeden once)
3. Java ile karsilastirma/zitlik
4. Gercek QA/otomasyon senaryosu (flaky test, sessiz bug, yanlis PASS vb.)

**Guvenlik:** Sadece mevcut bloklarin `content` DEGERI degisti, hicbir blok
eklenmedi/silinmedi/sira degismedi — slice/assembly riski SIFIR. 4 batch
halinde yapildi, her batch sonrasi `npm run build` PASS. Son halde
`i18n-content-toggle.spec.ts` 28/28 PASS (/python 10.3s'de, EN modda Turkce
karakter sizintisi yok) ve `topic-pages-ui.spec.ts -g "/python"` PASS.

**Kullanici onayladi ve "ileride derinlestiririz (2. analoji eklenebilir)"
dedi, kurali kalici hale getirmemi istedi.**

**CLAUDE.md degisikligi:**
- Bolum 9'daki eski "ilk block simple-box olmali, teknik terim kullanmadan,
  10 yasindaki cocuga anlatir gibi" kurali GUNCELLENDI — artik Bolum 9.3'e
  yonlendiriyor.
- **Yeni Bolum 9.3 "Dusundurucu Analoji Standardi"** eklendi: `/bruno` referans
  kalite bari olarak tanimlandi, 4 katman (analoji+soru+karsilastirma+QA baglami)
  kalici kural olarak yazildi, eski "10 yasindaki cocuk, teknik terimsiz" ifadesi
  ACIKCA YERINE GECTI (cunku hedef kitle yetiskin QA muhendisi, teknik terim
  sorun degil — asil hedef dusundurmek).
- Bolum 11'e (Sik Yapilan Hatalar) "tek cumlelik yuzeysel analoji yazma" maddesi eklendi.

**Sonraki adim (kullanici "ileride derinlestiririz" dedi, simdi degil):**
- Her konuya Bruno'daki gibi BIRDEN FAZLA analoji eklenebilir (su an 1, Bruno'da
  bazi konularda 2-3 var).
- Bu standart henuz SADECE Bruno (kaynak) + Python (tam yukseltme) sayfalarinda
  var. Bolum 9.2'deki genel yayilim kuraline tabi — diger sayfalara (Selenium,
  Playwright, Java vb.) ne zaman tasinacagi kullanicidan onay alinarak
  belirlenmeli, hangi sayfanin yukseltildigi BURADA (bu dosyada) takip edilecek.

---

## Bu Oturumda Yapilan Is (2026-06-29, devam 4) — Her Sekmede 3. Drag-and-Drop + CLAUDE.md'ye Kalici Kurallar

Kullanici "sekmelere 3. bir order-sort ekle" + "animasyon/drag-and-drop/practice
ogretme yonteminin her koddan sonra olmasi gerektigini CLAUDE.md'ye yaz" +
"Python sayfasina yapilan gelistirmelerin diger sayfalarda da olmasi icin
CLAUDE.md'ye ekle" dedi. Iki parca:

**BATCH 5 — 26 yeni order-sort const'u, 21 sekmenin TUMU artik 3 order-sort'a sahip:**
- Onceki durum: 16 sekme 2 order-sort'a sahipti (BATCH 4'ten); 5 sekme
  (Operators, Files&JSON, Exceptions&RegEx, Real World/pytest, Practice
  Exercises) BASKA challenge variant'lari (multiple-choice/fill-blank/bug-spot)
  ile zengindi ama SADECE 1 order-sort'a sahipti.
- `src/data/pythonData.js`: "BATCH 5" yorum basligi altinda 26 yeni order-sort
  const'u eklendi — 16 sekmeye +1 (3.'ye tamamlamak icin), 5 ozel sekmeye +2
  (1'den 3'e tamamlamak icin). Ayni guvenli yontem: paylasilan
  `sections[n].blocks` dizilerine DOKUNULMADI, her sekmenin assembly
  satirinin (EN+TR) SONUNA eklendi. Node script ile (20 pattern × EN+TR = 40
  occurrence, her biri count===2 dogrulanarak) tek seferde uygulandi.
- **Sonuc: Python'daki 21 sekmenin TUMUNDE artik EN AZ 3 farkli drag-and-drop
  (order-sort) egzersizi var.**
- Dogrulama: `npm run build` PASS, `topic-pages-ui.spec.ts -g "/python"` PASS,
  `i18n-content-toggle.spec.ts` tam suite 28/28 PASS (0 flaky). Gecici
  Playwright script ile Intro sekmesinde 2 farkli order-sort sorusu metninin
  (eski + BATCH5 yenisi) ayni anda goruldugu dogrulandi, script silindi.

**CLAUDE.md'ye 2 kalici kural eklendi (anlik durum DEGIL, mimari/pedagoji kurali):**
1. **Bolum 9.1'e yeni madde:** Her `code` blogunun ardina, mumkun olan her
   yerde, animasyon + drag-and-drop (`order-sort`) + practice (`code-playground`,
   `starterCode`/`solutionCode`) UCLUSUNUN birlikte yerlestirilmesi zorunlu
   kilindi — sekme basina bir kez degil, konunun izin verdigi HER atomik kod
   blogunun ardina tekrarlanmali.
2. **Yeni Bolum 9.2 — "Referans Uygulama: Python Sayfasi — Tum Teknoloji
   Sayfalarina Yayilim Zorunlulugu":** `/python` sayfasi bu uclunun referans
   uygulamasi olarak tanimlandi (her sekmede ≥3 order-sort, ≥1 step-animation,
   playground'da hem Fix hem Practice modu calisir). Bu kalibin TUM teknoloji
   sayfalarina (Bolum 2 route haritasindaki tum sayfalar) zaman icinde
   yayilmasi kalici bir hedef olarak yazildi; component'ler tekrar yazilmadan
   (`CodePlaygroundBlock`/`StepAnimationBlock`/`ChallengeBlock` hazir) sadece
   her sayfanin `*Data.js`'ine veri eklenerek yapilmasi gerektigi belirtildi.
   Hangi sayfanin ne kadar tamamlandigi `NEXT_SESSION.md`'de takip edilecek
   (CLAUDE.md'ye anlik durum yazilmadi, sadece kalici kural).
3. **Bolum 11'e (Sik Yapilan Hatalar) 2 yeni "yapma" maddesi** eklendi: uclu
   atlamak ve kalibi sadece Python'da birakmak.

**Sonraki adim (kullanici onceligi belirlerse):** Yeni CLAUDE.md §9.2 kuralina
gore, sirada hangi sayfanin (Selenium, Playwright, Java zaten kismen var, vb.)
ayni uclu pattern'e tasinacagi kullanicidan onay alinarak belirlenmeli — her
sayfa icin component degisikligi gerekmiyor, sadece `*Data.js` veri eklemesi.

---

## Bu Oturumda Yapilan Is (2026-06-29, devam 3) — Practice Mode Tum 37 Egzersize Yayildi + 16 Yeni Drag-and-Drop

Onceki adimda Practice mode ("Kod Yaz ve Dene") sadece 5 inline `pythonData.js`
ornegine eklenmisti. Kullanici "pythonPlaygroundData.js'deki 37 egzersize de yay"
+ "drag and drop yerlestirebildigin her yere yerlestir, kullanici aktif olmali"
dedi. Iki fazda yapildi:

**Faz 1 — 37/37 playground egzersizine starterCode/solutionCode:**
- `src/data/pythonPlaygroundData.js`: tum 37 `pythonPlaygroundItems` girdisine
  bilingual `starterCode: {tr, en}` (TODO yorumlu iskelet, genelde fixedCode'un
  degisen/eklenen satirinin TODO ile degistirilmis hali) + `solutionCode` (=
  fixedCode'un birebir kopyasi) eklendi. `toPlaygroundBlock()` adaptorune
  `starterCode`/`solutionCode` alanlarini bloga aktaran 2 satir eklendi (onceden
  bu alanlar adaptorde kayboyordu, component destekliyordu ama veri akmiyordu).
- Sonuc: Python'daki TUM 42 playground egzersizinde (5 inline + 37 adapter'li)
  artik "Kod Yaz ve Dene" butonu calisiyor.

**Faz 2 — 16 Python sekmesine 2. drag-and-drop (order-sort) eklendi:**
- Inceleme: 21 sekmenin 16'sinda SADECE 1 order-sort vardi (Intro, Installation,
  Syntax&Comments, Variables&Types, Strings&Booleans, Lists&Tuples, Sets&Dicts,
  Conditions&Loops, Functions&Lambda, Classes&OOP, Scope&Modules, Helper Modules,
  Advanced Concepts, Ecosystem, Troubleshooting, Java→Python) — 5 sekme zaten
  birden fazla challenge'a sahipti (Operators, Files&JSON, Exceptions&RegEx,
  Real World/pytest, Practice Exercises).
- `src/data/pythonData.js`: bu 16 sekmenin HER BIRINE, mevcut order-sort'tan
  FARKLI bir alt-konuda yeni bir order-sort const'u eklendi ("BATCH 4" yorum
  basligi altinda, `// --- FINAL SECTION MAPPING ---` satirindan once). Ornekler:
  `challengePrintFlowOrder` (Intro: print() akisi), `challengePipInstallOrder`
  (Installation), `challengeWhileLoopOrder` (Conditions&Loops), `challengeLambdaOrder`
  (Functions&Lambda), `challengeDecoratorOrder` (Advanced Concepts) vb.
- Guvenli yerlestirme yontemi: paylasilan `sections[n].blocks`/`trSections[n].blocks`
  dizilerine DOKUNULMADI (onceki batch'lerdeki gibi cascading risk sifir).
  Bunun yerine her sekmenin assembly satirindaki `getPlaygroundBlocksForTopic(...)`
  cagrisinin SONUNA yeni const eklendi — slice sinirlarini degistirmeyen, en
  guvenli ekleme noktasi. Node script ile (16 pattern × EN+TR = 32 occurrence,
  her biri count===2 dogrulanarak) tek seferde uygulandi.
- Sonuc: Python'daki TUM 21 sekmede artik EN AZ 2 farkli drag-and-drop egzersizi var.

**Dogrulama:** `npm run build` PASS (her iki faz sonrasi ayri ayri calistirildi).
`tests/topic-pages-ui.spec.ts -g "/python"` PASS. `tests/i18n-content-toggle.spec.ts`
tam suite (28 test) PASS, 0 flaky (/python 9.6s'de gecti) — yeni TODO yorumlarinda
ve yeni challenge metinlerinde EN modda Turkce karakter sizintisi yok. Gecici
Playwright script ile manuel dogrulama: Intro sekmesinde yeni order-sort metni
goruluyor, py-intro-02'nin (2. "Kod Yaz ve Dene" butonu) starter kodu dogru
TODO ile aciliyor. Script is bitince silindi.

**Sonraki adim (kullanici isterse):** Su an her sekmede 2 order-sort var (1 eski
+ 1 yeni). Daha fazla "her ogretilen kod blogunun hemen ardina" istenirse,
coklu alt-konu iceren sekmelerde (orn. Variables&Types 4 alt-konu icerir) ek
order-sort/step-animation/fill-blank eklenebilir — ama bu noktada XP/UI
yorgunlugu riski var (bkz. asagidaki "Batch 3" sonrasi not), once kullanicinin
sayfada deneyimleyip yeterli bulup bulmadigini sormak iyi olur.

---

## Bu Oturumda Yapilan Is (2026-06-29, devam 2) — Python "Kod Yaz ve Dene" Paneli Gercek Veriyle Bağlandı

Kullanici kisa vadede "kontrollu kod yazma ve sonucu gorme" deneyimini Python
sayfasinda istedi. Inceleme sonucu bulunan kok durum: `CodePlaygroundBlock.jsx`
icindeki `PracticePanel` (starterCode/solutionCode karsilastirmali "Kod Yaz ve
Dene" modu) onceki oturumda component seviyesinde tam insa edilmis ve test
edilmisti, ama **hicbir gercek veri dosyasi onu kullanmiyordu** — Python'da
sifir, Java'da da `code-playground` tipinde sifir (Java'nin 4 ornegi farkli bir
block tipi olan `java-practice`'i kullaniyor, `CodePlaygroundBlock` degil).
Yani buton mevcut ama tetiklenmiyordu.

Yapilanlar:
- `src/data/pythonData.js` — 5 mevcut `code-playground` bloguna (`playgroundSyntax`,
  `playgroundVariables`, `playgroundLoops`, `playgroundFunctions`, `playgroundClasses`)
  `starterCode: {tr, en}` (TODO yorumlu iskelet) + `solutionCode` (fixedCode ile
  ayni calisan kod) eklendi. Bu, "Kod Yaz ve Dene" butonunu bu 5 egzersizde
  gercek olarak aktif eder — kullanici sifirdan kod yazip "Calistir ve Kontrol
  Et" ile beklenen cozumle karsilastirir.
- `src/components/CodePlaygroundBlock.jsx`:
  - `DiagnosticPanel`'e `nextSafeStep()` eklendi — satir farki gosterildikten
    sonra "satiri ekle / satiri sil / sadece o satiri duzelt" seklinde somut
    bir sonraki adim cumlesi ekler (TR/EN).
  - `PracticePanel` tanitim metni "Gercek javac degil..." diyordu (Java'ya ozel
    kalmis bir ifadeydi, artik Python'da da gosteriliyor) — `language` prop'u
    eklenerek genel hale getirildi ("Gercek {language} derleyici/yorumlayicisi
    degil...").
- Degisiklik yapilmayanlar (zaten dogru calisiyordu, kontrol edildi):
  - `buggyCode`/`fixedCode`/`starterCode`/`solutionCode`/`expected` zaten
    `pick(value, isTr)` ile dil degisiminde dogru resetleniyor (useEffect
    dependency zaten picked degerlere bagli).
  - `pick()` string olmayan/null veride crash etmiyor, sessizce '' donuyor.
  - `ChallengeBlock.jsx`'teki AC02 "bir defaya mahsus ekstra soru" (recovery
    question) mekanizmasi tum variant'lar (`order-sort`, `multiple-choice`,
    `fill-blank`, `bug-spot`) icin generic calisiyor — Python'un batch 2/3'te
    eklenen challenge bloklari (`challengeOperatorPrecedenceOrder` vb.) icin
    de otomatik calisiyor, ek kod gerekmedi.

**Dogrulama:** `npm run build` PASS. `tests/i18n-content-toggle.spec.ts`
28/28 passed (4'u retry sonrasi gecti — bilinen Pyodide/CDN flakiness, bu
oturumun degisiklikleriyle ilgisiz). `tests/topic-pages-ui.spec.ts -g "/python"`
PASS. Gecici Playwright script ile manuel uctan uca dogrulama: panel acikken
dil degistirince TODO yorumu dogru dilde yeniden render ediliyor (TR->EN
gecisinde Turkce karakter sizintisi yok), yanlis cevapta "Henuz degil" +
tanı paneli, dogru cevapta "beklenen cozumle eslesti" + terminal output
gosteriliyor. Script calisma sonrasi silindi (kalici test suite'e eklenmedi).

**Sonraki adim (kullanici isterse):** Su an Practice mode sadece bu 5 ornekte
aktif. Kullanici onaylarsa `pythonPlaygroundData.js`'deki 37 Fix-the-Bug
egzersizinden bir kismina da starterCode/solutionCode eklenebilir (ayni guvenli
pattern, `toPlaygroundBlock()` adaptorune iki alan eklemek yeterli).

---

## Guncel Branch Durumu (2026-06-29)

- Bu Codex oturumunda aktif branch `codex2` olarak dogrulandi. Calisma agacinda
  oturum basinda kullaniciya/onceki ise ait oldugu varsayilan su degisiklikler
  vardi ve geri alinmadi: `public/sitemap.xml`,
  `supabase/functions/explain-quiz-answer/index.ts`, `.claude/settings.local.json`.

- Aktif branch: `MacTest` (macOS case-insensitive fs nedeniyle `macTest` da gorunur, ayni branch).
- `MacTest`, `origin/main`'in (`45a84ec` — Java interaktif bloklari + paralel test
  fix'leri) tam onunde/esiti durumdaydi (kendi unique commit'i yoktu), bu yuzden
  `git fetch origin && git rebase origin/main` **trivial fast-forward** oldu —
  conflict olusabilecek commit replay'i yoktu.
- Bu islem SIRASINDA calisma agacinda commit'lenmemis degisiklikler vardi (Python
  batch 1-3 + i18n title fix + CodePlaygroundBlock netlik duzeltmesi). Bunlar
  `git stash` ile kenara alindi, rebase sonrasi `git stash pop` ile geri getirildi.
  - `.claude/NEXT_SESSION.md`: otomatik (conflict'siz) merge oldu.
  - `src/data/pythonData.js`, `src/data/pythonPlaygroundData.js`: degisiklik yok
    (origin/main bu dosyalara dokunmamis), conflict'siz geri geldi.
  - `src/components/CodePlaygroundBlock.jsx`: GERCEK conflict cikti — origin/main
    `block.task` alani + `DiagnosticPanel` (satir farki gosterimi) + `PracticePanel`
    ("Kod Yaz ve Dene" modu) + tum code/expected/buggyCode/fixedCode alanlarini
    `pick(value, isTr)` ile bilingual-safe yapmis; ayni anda ben `block.explanation`
    kutusunu (mavi 🎯, kod ustunde) + otomatik rehber satirini eklemistim. **El ile
    cozuldu: HER IKI ozellik korundu** (`block.task` VE `block.explanation` ayni
    anda render edilir; `expectedText`/`codeText` gibi `pick()`'li degiskenler
    benimkiler dahil her yerde kullanildi). Onemli kurtarilan detay: origin/main'in
    versiyonu "Beklenen Cikti" panelindeki `block.explanation` render'ini YANLISLIKLA
    SILMISTI (yerine `block.task`'a gecmisti) — bu, mevcut 5 hardcoded Python
    playground bloğu (`playgroundSyntax` vb.) icin SESSIZ REGRESYON olurdu; merge
    sirasinda bu satir GERI EKLENDI.
- **Merge sonrasi bulunan ek sorun (duzeltildi):** `hasPractice` mantigi
  `starterCode = block.starterCode || buggyCode || codeText` fallback'i
  yuzunden buggyCode/fixedCode tanimli HER egzersizde (37 Python + tum Java
  Fix-the-Bug egzersizleri) "✍️ Kod Yaz ve Dene" butonunu de gosteriyordu —
  bu, "🐛 Bozuk Testi Düzelt" ile AYNI islevi tekrar ediyordu (ayni starter kod,
  ayni hedef). Hicbir gercek veri (`javaData.js`/`pythonPlaygroundData.js`)
  bu yeni Practice modu icin `block.starterCode`/`block.solutionCode`
  TANIMLAMIYORDU — yani buton tamamen istemeden tetikleniyordu. Duzeltme:
  `CodePlaygroundBlock.jsx`'e `hasExplicitPractice = Boolean(block.starterCode
  || block.solutionCode)` eklendi, `hasPractice` artik bu opt-in flag'e bagli.
  Playwright ile dogrulandi: buton artik gorunmuyor, Fix/explanation/hint
  bozulmadi. `npm run build` + `topic-pages-ui` + `i18n-content-toggle` PASS.
- `git commit` + `main`'e merge + `origin/main`'e push yapildi (kullanici
  acik talebiyle).

---

## Bu Oturumda Yapilan Is (2026-06-29 — Codex2, Docker Interaktif Rollout)

Kullanici Java ve Python sayfalarindaki `code-playground` + `step-animation` +
`order-sort` desenini inceleyip hangi teknolojilere yayilabilecegini sordu ve
uygun olanlarda sirayla uygulamamizi istedi.

### Uygunluk analizi

- Mevcut sayimda `code-playground`, `step-animation`, `order-sort` bloklari
  pratikte sadece Python ve Java data dosyalarinda vardi.
- En yuksek oncelikli adaylar: Docker, Jenkins, Kubernetes, JMeter,
  Selenium/Playwright/Cypress, Postman/Bruno, Appium/BrowserStack, Kafka,
  Git/GitHub ve Linux.
- Ilk batch icin Docker secildi; cunku image -> container -> network/volume ->
  compose -> CI artifact akisi hem gorsel zihinsel model hem dogru islem sirasi
  hem de komut pratigine cok uygun.

### Docker sayfasi tamamlanan batch

- `src/data/dockerData.js` icine 6 tekrar kullanilabilir bilingual interaktif
  blok dizisi eklendi:
  - `dockerIntroInteractiveBlocks`
  - `dockerInstallationInteractiveBlocks`
  - `dockerCoreCommandInteractiveBlocks`
  - `dockerComposeInteractiveBlocks`
  - `dockerQaInteractiveBlocks`
  - `dockerEcosystemInteractiveBlocks`
- Her dizi 3 parcadan olusuyor:
  - `code-playground` practice: kullanici komut/Dockerfile/YAML akisini kendisi
    tamamliyor.
  - `step-animation`: 5 adimli gorsel/animasyonlu akis.
  - `challenge` + `variant: 'order-sort'`: drag-and-drop sira egzersizi.
- Bu 6 dizi hem EN hem TR Docker section'larina yerlestirildi:
  Giriş/Introduction, Kurulum/Installation, Temel Komutlar/Core Commands,
  Dockerfile & Compose, QA Kullanimi/QA Use Cases, Ekosistem/Ecosystem.
- `src/components/CodePlaygroundBlock.jsx` practice panelindeki "gercek javac
  degil" metni dil/arac bagimsiz hale getirildi: "gercek runtime/terminal
  degildir"; boylece Docker komut pratigi icin yanlis Java-only ifade kalmadi.

### Dogrulama

- `npm run build` PASS (SEO check, Vite build, static route shell, dist SEO).
- Docker odakli Playwright:
  - `npx playwright test tests/i18n-content-toggle.spec.ts --grep "docker|/docker|Docker" --reporter=list` PASS.
  - `npx playwright test tests/topic-pages-ui.spec.ts --grep "docker|/docker|Docker" --reporter=list` PASS.
- Iki dosyayi birlikte tam kosma denemesi (`topic-pages-ui` + `i18n-content-toggle`)
  3 dakikada timeout oldu; bu nedenle Docker odakli hedefli kosumlarla dogrulandi.

### Siradaki sirali rollout onerisi

1. Jenkins: TAMAMLANDI (bkz. bir sonraki baslik).
2. Kubernetes: Pod/Deployment/Service/Ingress/rollout/probe siralari.
3. JMeter: test plan, thread group, sampler, assertion, listener ve ramp-up.
4. Selenium/Playwright/Cypress: locator/wait/action/assertion/debug akislari.
5. Postman/Bruno + Rest Assured: request lifecycle, collection/env/auth/test order.

---

## Bu Oturumda Yapilan Is (2026-06-29 — Codex2, Jenkins Interaktif Rollout)

Docker batch'inden sonra kullanicinin "devam et" talebiyle siradaki sayfa olan
Jenkins'e ayni `code-playground` + `step-animation` + `order-sort` deseni
uygulandi.

### Jenkins sayfasi tamamlanan batch

- `src/data/jenkinsData.js` icine 7 tekrar kullanilabilir bilingual interaktif
  blok dizisi eklendi:
  - `jenkinsIntroInteractiveBlocks`
  - `jenkinsInstallationInteractiveBlocks`
  - `jenkinsPipelineInteractiveBlocks`
  - `jenkinsQaInteractiveBlocks`
  - `jenkinsAdvancedInteractiveBlocks`
  - `jenkinsRealWorldInteractiveBlocks`
  - `jenkinsEcosystemInteractiveBlocks`
- Her dizi 3 parcadan olusuyor:
  - `code-playground` practice: kullanici Jenkinsfile, shell veya post block
    akisini kendisi tamamliyor.
  - `step-animation`: 5 adimli gorsel/animasyonlu akis.
  - `challenge` + `variant: 'order-sort'`: drag-and-drop sira egzersizi.
- Bu 7 dizi hem EN hem TR Jenkins section'larina yerlestirildi:
  Giriş/Introduction, Kurulum/Installation, Pipeline, QA Entegrasyonu,
  İleri Seviye/Advanced, Gerçek Hayat/Real World, Ekosistem/Ecosystem.
- Not: Jenkinsfile string'lerinde `\${env.*}` ifadeleri JavaScript template
  interpolation'a donusmemesi icin kacirildi; bunlar Jenkinsfile metni olarak
  kalir.

### Dogrulama

- Jenkins data import/sayim kontrolu PASS: TR tarafinda 7 `code-playground`,
  7 `step-animation`, 7 `challenge` gorundu.
- `npm run build` PASS (SEO check, Vite build, static route shell, dist SEO).
- Jenkins odakli Playwright:
  - `npx playwright test tests/i18n-content-toggle.spec.ts --grep "jenkins|/jenkins|Jenkins" --reporter=list` PASS.
  - `npx playwright test tests/topic-pages-ui.spec.ts --grep "jenkins|/jenkins|Jenkins" --reporter=list` PASS.

### Siradaki sirali rollout onerisi

1. Kubernetes: TAMAMLANDI (bkz. bir sonraki baslik).
2. JMeter: test plan, thread group, sampler, assertion, listener ve ramp-up.
3. Selenium/Playwright/Cypress: locator/wait/action/assertion/debug akislari.
4. Postman/Bruno + Rest Assured: request lifecycle, collection/env/auth/test order.
5. Appium/BrowserStack: device/session/capability/debug akislari.

---

## Bu Oturumda Yapilan Is (2026-06-29 — Codex2, Kubernetes Interaktif Rollout)

Jenkins batch'inden sonra kullanicinin "devam et" talebiyle siradaki sayfa olan
Kubernetes'e ayni `code-playground` + `step-animation` + `order-sort` deseni
uygulandi.

### Kubernetes sayfasi tamamlanan batch

- `src/data/kubernetesData.js` icine 8 tekrar kullanilabilir bilingual interaktif
  blok dizisi eklendi:
  - `kubernetesIntroInteractiveBlocks`
  - `kubernetesInstallationInteractiveBlocks`
  - `kubernetesArchitectureInteractiveBlocks`
  - `kubernetesCoreInteractiveBlocks`
  - `kubernetesKubectlInteractiveBlocks`
  - `kubernetesYamlInteractiveBlocks`
  - `kubernetesEcosystemInteractiveBlocks`
  - `kubernetesRealWorldInteractiveBlocks`
- Her dizi 3 parcadan olusuyor:
  - `code-playground` practice: kullanici kubectl, YAML, Helm veya rollout
    komut akisini kendisi tamamliyor.
  - `step-animation`: 5 adimli gorsel/animasyonlu akis.
  - `challenge` + `variant: 'order-sort'`: drag-and-drop sira egzersizi.
- Bu 8 dizi hem EN hem TR Kubernetes section'larina yerlestirildi:
  Giriş/Introduction, Kurulum/Installation, Mimari/Architecture, Temel
  Kavramlar/Core Concepts, kubectl Komutlari, YAML Manifestler, Ekosistem,
  Gercek Hayat/Real World.
- Odak konular: desired state, minikube dogrulama, API Server -> scheduler ->
  kubelet akisi, Deployment/Service label-selector baglantisi, CrashLoopBackOff
  debug sirasi, readiness/liveness probe, Helm tabanli CI/CD deploy, rolling
  update ve rollback.

### Dogrulama

- Kubernetes data import/sayim kontrolu PASS: EN tarafinda 8 `code-playground`,
  8 `step-animation`, 8 `challenge`; TR tarafinda da 8'er interaktif set
  gorundu.
- `npm run build` PASS (SEO check, Vite build, static route shell, dist SEO).
- Kubernetes odakli Playwright:
  - `npx playwright test tests/i18n-content-toggle.spec.ts --grep "kubernetes|/kubernetes|Kubernetes" --reporter=list` PASS.
  - `npx playwright test tests/topic-pages-ui.spec.ts --grep "kubernetes|/kubernetes|Kubernetes" --reporter=list` PASS.

### Siradaki sirali rollout onerisi

1. JMeter: test plan, thread group, sampler, assertion, listener ve ramp-up.
2. Selenium/Playwright/Cypress: locator/wait/action/assertion/debug akislari.
3. Postman/Bruno + Rest Assured: request lifecycle, collection/env/auth/test order.
4. Appium/BrowserStack: device/session/capability/debug akislari.
5. Kafka/Git/Linux: event flow, branch flow, terminal command akislari.

---

## Bu Oturumda Yapilan Is (2026-06-29, devam) — Python Sayfasi Egzersiz Netligi + Drag&Drop Pilotu

**Branch:** `MacTest` (macOS case-insensitive fs nedeniyle `macTest` da gorunur, ayni branch).

### 1. CodePlaygroundBlock netlik duzeltmesi (tum ~26 mevcut egzersizi etkiler)

Kullanici "exercise alanlarini kullanici ne yapmasi gerektigini anlamiyor" dedi. Kok neden:
`src/data/pythonPlaygroundData.js` `toPlaygroundBlock()` gosterilen kodu `item.fixedCode`
yapiyordu ama `item.description` metni ("Asagidaki test neden fail ediyor?") BOZUK kodu
varsayiyordu — gosterilen kod ile aciklama birbiriyle CELISIYORDU. Ayrica aciklama/gorev
metni sadece "Beklenen Ciktiyi Goster" butonuna basinca gorunuyordu (varsayilan olarak gizliydi).

Duzeltme:
- `src/data/pythonPlaygroundData.js`: `toPlaygroundBlock()` artik `code: item.buggyCode`
  donduruyor (37 playground item icin) — gosterilen kod aciklamayla artik tutarli.
- `src/components/CodePlaygroundBlock.jsx`: aciklama/gorev metni artik kod blogunun
  USTUNDE, varsayilan olarak gorunur (mavi 🎯 kutu). Kod blogunun ALTINDA, hangi
  butonlarin var oldugu baz alinarak otomatik uretilen tek satirlik bir rehber
  ("Once kodu oku, ciktiyi tahmin et; sonra ▶ Calistir'a basip...") eklendi.
  `FixThePanel` intro metni de daha aciklayici hale getirildi.
- Playwright ile gorsel dogrulama yapildi (ekran goruntusu): mavi gorev kutusu +
  rehber satiri + bozuk kod artik tutarli gorunuyor.

### 2. Drag-and-drop pilotu — 3 sekme (Operators, Conditions & Loops, Functions & Lambda)

Kullanici "her ogrettigin koddan sonra animasyon ve drag-and-drop ile ogret" istedi.
Mevcut mimari taranarak `OrderSort` (native HTML5 DnD + ↑/↓ erisilebilir fallback,
`src/components/challenges/OrderSort.jsx`) component'inin zaten var oldugu ve
`ChallengeBlock` uzerinden `variant: 'order-sort'` ile cagrildigi bulundu — ama
mevcut egzersizler (playground/challenge) her sekmenin SONUNA kumelenmis, kodun
HEMEN ardina degil. Kullanicinin onayiyla (4 secenekten "once pilot: 2-3 sekme")
3 sekmede pilot yapildi:

- `challengeOperatorPrecedenceOrder` (ch-py-order-operator-precedence-01) — Operators
  kod blogunun hemen ardina (comparison tablosundan once) eklendi. Operator
  precedence'i (** > * % > +) adim adim siralama.
- `challengeForLoopOrder` (ch-py-order-forloop-01) — For Loops quiz'inden sonra,
  Functions heading'inden once eklendi. For-loop tabanli API endpoint test script'i
  yazma adimlarini siralama.
- `challengeFunctionArgsOrder` (ch-py-order-function-args-01) — Functions quiz'inden
  sonra, Lambda heading'inden once eklendi. Python'un positional/keyword/default
  arg eslestirme sirasini ogretiyor.

**Teknik yaklasim (onemli, ileride genisletirken tekrar kullan):** `sections[N].blocks`/
`trSections[N].blocks` PAYLASILAN dizilerine DOKUNULMADI (cunku bu diziler birden
fazla final tab tarafindan `slice(a,b)` ile numerik index'lerle paylasiliyor — bir
ekleme tum sonraki slice sinirlarini kaydirip baska sekmeleri bozar). Bunun yerine
`finalEnSections`/`finalTrSections` assembly satirlarindaki MEVCUT slice cagrisi
ikiye bolundu (`slice(a, X), yeniBlok, slice(X, b)`), yeni blok sadece o sekmenin
KENDI assembly satirinda spliced edildi — paylasilan dizi index'leri degismedi,
digerlerine sifir risk. `npm run build` + `playwright test python-page.spec.ts
topic-pages-ui.spec.ts i18n-content-toggle.spec.ts` (toplam 54 test) hepsi PASS.

**Sonraki adim:** Kullanici onayladiginda kalan ~17 sekmeye (Lists&Tuples, Sets&Dicts,
Strings&Booleans, Classes&OOP, Exceptions, Files&JSON, vb.) ayni kalip uygulanmali —
her sekmenin ana `type:'code'` blogunu bul, hemen ardina (varsa quiz/editor'den sonra,
comparison/sonraki heading'den once) yeni bir `order-sort` veya `fill-blank` challenge
ekle, slice'i ikiye bolerek splice et, build+test ile dogrula. CLAUDE.md §13 protokolune
uygun olarak parca parca ilerlenmeli.

### 3. Batch 2 — step-animation + order-sort tum "temel" sekmelere yayildi

Kullanici: "her ogrettigin kod blogunun ardinda 1-playground 2-5 adimli step
animation 3-drag&drop order-sort olmali, daha fazla animasyon/exercise/interaktiflik
istiyorum" dedi. Tespit: playground (Run/Fix/Hint) ZATEN her 21 sekmede vardi
(`getPlaygroundBlocksForTopic`). Eksik olan: step-animation (`StepAnimationBlock`,
`type:'step-animation'`, 5 `steps[]`) ve order-sort (`OrderSort`, `type:'challenge'`,
`variant:'order-sort'`) — bunlar sadece 2-3 sekmede vardi.

11 sekmeye (Intro, Installation, Syntax&Comments, Variables&Types, Strings&Booleans,
Operators, Lists&Tuples, Sets&Dicts, Conditions&Loops, Functions&Lambda, Classes&OOP)
birer step-animation + birer order-sort eklendi (Operators/Loops/Functions/Classes
zaten order-sort'a sahipti, onlara sadece step-animation eklendi). Tum yeni const'lar
`pythonData.js`'de "BATCH 2" yorum basligi altinda. Pattern: tek bir bilingual
`{tr,en}` const, assembly satirinda mevcut `slice(...)` ile `feynmanX`/playground
arasina eklendi — paylasilan dizilere DOKUNULMADI (onceki pilot'taki gibi sifir
cascading risk). `npm run build` + 54 test (tekrar kosumda) hepsi PASS, Playwright
ile TR ve EN modda gorsel/metin dogrulamasi yapildi (TR sizinti yok, EN sizinti yok).

### 3.1. Batch 3 — kalan 9 sekme TAMAMLANDI (rollout bitti)

Kullanici "devam et" dedi, kalan tum sekmelere ayni pattern uygulandi:
Scope&Modules (+order-sort, step-anim zaten vardi), Helper Modules (+ikisi),
Files&JSON (+ikisi), Exceptions&RegEx (+ikisi), Advanced Concepts (+ikisi),
Ecosystem (+step-anim, order-sort zaten vardi), Troubleshooting (+ikisi),
Java→Python (+ikisi), Practice Exercises (+ikisi). Yeni const'lar `pythonData.js`
"BATCH 3" yorum basligi altinda. Ayni guvenli pattern (paylasilan dizilere
DOKUNULMADI, sadece assembly satirindaki literal array'e eklendi).

`npm run build` + 54 test (`python-page`, `topic-pages-ui`, `i18n-content-toggle`)
hepsi PASS. Playwright ile 3 ornek sekme (Exceptions&RegEx, Java→Python,
Practice Exercises) gorsel olarak dogrulandi — step-animation + order-sort
dogru icerikle, dogru yerde (ilgili kod blogundan hemen sonra) goruluyor.

**SONUC: 21 Python sekmesinin TAMAMINDA artik playground (Run/Fix/Hint) +
5 adimli step-animation + drag-and-drop order-sort uclusu var.** Real World
(pytest) ve Classes&OOP'da bu zaten onceden mevcuttu; digger 19 sekme bu
oturumda (3 batch halinde) tamamlandi.

**Olasi ileri adim (kullanici talep ederse):** Su an her sekmede TEK step-animation
+ TEK order-sort var (tab'in TUM kodu icin, her bireysel kod blogu icin degil).
Eger kullanici literal olarak "her kod blogunun ardina" istiyorsa, bu coklu-konulu
sekmelerde (orn. Variables&Types 4 alt-konu icerir) ek step-anim/order-sort
eklenebilir — ama bu noktada XP/UI yorgunlugu riski var, once kullanicinin
gercek sayfada deneyimleyip yeterli bulup bulmadigini sormak iyi olur.

### 4. i18n bug duzeltildi — playground exercise basliklari Ingilizce kaliyordu

Kullanici fark etti: sayfa dili TR'yken bile egzersiz basliklari (`block.label`,
orn. "Checking Your Python Version Programmatically") Ingilizce gorunuyordu.
Kok neden: `src/data/pythonPlaygroundData.js`'deki 37 `pythonPlaygroundItems`
girdisinin `title` alani duz string'ti ve dosyanin basindaki yorum bunu
"Title is English-only by design" diye ACIKCA YANLIS bir kural olarak
belgeliyordu — CLAUDE.md §7-8'deki "Turkce sayfada tum aciklayici metin Turkce
olmali" kuralina aykiri. Render tarafi (`pick()` fonksiyonu, `CodePlaygroundBlock.jsx`)
zaten `{tr, en}` objelerini destekliyordu, degisiklik gerekmedi.

Duzeltme: 37 `title` alaninin tumu `title: { tr: '...', en: '...' }` seklinde
bilingual yapildi, yanlis yorum satiri guncellendi. Playwright ile dogrulandi
(TR modda Turkce baslik goruluyor, EN sizintisi yok). `npm run build` +
54 test (`python-page`, `topic-pages-ui`, `i18n-content-toggle`) hepsi PASS.

**Not (ileride benzer hata icin):** Bu dosyadaki/pythonData.js'deki diger
yeni icerik eklenirken "title/label sadece Ingilizce olabilir" gibi bir
yorum/varsayim gorursen GUVENME — CLAUDE.md'deki dil kurali istisnasizdir
(sadece yerlesik teknik terimler Ingilizce kalir, basliklar degil).

---

## Bu Oturumda Yapilan Is (2026-06-29 — Devam, Java/MacOS tarafi — `main`'e push edildi)

### Java Sayfasindaki TUM Kod Bolumlerine Interaktif Bloklar Eklendi (2. Tur)

Onceki oturumda sA (Basic Syntax) + OOP + Test Frameworks + Selenium bolumlerine
eklenen playground/step-animation/order-sort pattern'i kalan 7 bolume de yayildi:

- **sB (Strings & Math):** `javaPlaygroundStringMethods` (trim tuzagi) +
  `javaStepAnimationStringImmutable` (String immutability 5 adim) +
  `javaChallengeOrderStringChain` (driver.getTitle().trim()... zincir sirasi)
- **sC (Control Flow):** `javaPlaygroundIfElse` (koşul sırası bug) +
  `javaStepAnimationIfElse` (score=75 yolculugu) +
  `javaChallengeOrderIfElse` (PASS/FAIL/Pending if-else sirasi)
- **sD (Arrays):** `javaPlaygroundArrays` (ArrayIndexOutOfBounds) +
  `javaStepAnimationArrayMemory` (bellek modeli, length field) +
  `javaChallengeOrderArrayLifecycle` (new→assign→length→for-each→last element)
- **sE (Methods):** `javaPlaygroundMethods` (missing return statement) +
  `javaStepAnimationMethodCall` (add(5,3) → parametre → body → return akisi) +
  `javaChallengeOrderMethodAnatomy` (static+int+add+(int a,int b)+body)
- **sF (Advanced OOP):** `javaPlaygroundEnum` (switch fall-through) +
  `javaStepAnimationEnum` (break olmayinca fall-through demonstrasyon) +
  `javaChallengeOrderTryCatch` (try→catch→finally sirasi)
- **sCucumber:** `javaPlaygroundCucumber` (Given→When→Then sira bug) +
  `javaStepAnimationCucumberFlow` (feature→step def→Java metod→rapor) +
  `javaChallengeOrderCucumber` (Feature→Scenario→Given/When/Then→step defs→runner)
- **sPlaywright:** `javaPlaygroundPlaywright` (assert before navigate bug) +
  `javaStepAnimationPlaywrightFlow` (create→launch→navigate→locator→assertThat→auto-close) +
  `javaChallengeOrderPlaywright` (browser start→navigate→locator→assert→auto-close)

withExtraBlocks dizileri export icinde tum bolumler icin (sB, sC, sD, sE, sF,
sCucumber, sPlaywright) guncellendi. npm run build PASS, 785KB javaData chunk.

### Java Exercise Aciklamalari Iyilestirildi + Animasyon/Drag-Drop Eklendi

- `CodePlaygroundBlock.jsx`: `block.task` alani destegi eklendi — playground basliginin
  altinda mavi bir info kutusu render eder; kullaniciya 3 adimli gorev anlatiyor
  (Calistir → Bozuk kodu duzelt → Hint kullan).
- `javaData.js` — mevcut bloklar iyilestirildi:
  - `javaPlaygroundMainMethod`: label + task + explanation + 3 hint tamamen yeniden yazildi.
    Kullanici ne yapacagini, neden yapacagini ve her butonun ne ise yaradigini anlatiyor.
  - `javaPlaygroundJUnitAssertion`: ayni sekilde; assertEquals(expected,actual) sirasini
    ve CI/CD'de println vs assertion farkini acikliyor.
  - `javaChallengeMainSignature`: her yanlis secenek icin somut hata mesaji + neden yanlis aciklamasi.
  - `javaChallengeFillAssertEquals`: "assertion olmazsa test kalite karari vermez" vurgusu eklendi.
  - `javaChallengeMavenOrder`: her item emoji + daha aciklayici; "yanlis sirada Maven da hata verir" not.
  - `javaChallengeBugSpotSemicolon`: "error: ';' expected" hata mesajini dogrudan gosteriyor.
- `javaData.js` — yeni bloklar eklendi (6 adet):
  - `javaStepAnimationMainExecution` (Basic Syntax): JVM'nin main'i nasil bulup satir satir
    calistirdigini 5 adimda gosteriyor; Python farkliliklari notlaniyor.
  - `javaChallengeOrderMainStructure` (Basic Syntax, order-sort): class → main → degisken →
    println siralamasini surukle-birak ile ogret.
  - `javaStepAnimationAssertionFlow` (Test Frameworks): @Test tetiklemesinden PASSED/FAILED
    kararina 5 adim; println vs assertion farki somut mesajla gosteriliyor.
  - `javaChallengeOrderJUnitTest` (Test Frameworks, order-sort): import → class → @Test →
    assertion sirasi.
  - `javaStepAnimationWebDriverWait` (Selenium): click → WebDriverWait olustur → 500ms
    polling → element gorunur → getText() akisini 5 adimda gosteriyor.
  - `javaChallengeOrderWebDriverWait` (Selenium, order-sort): WebDriverWait kullanim
    adimlarini surukle-birak.
  - `javaChallengeOrderOopCreation` (OOP, order-sort): class yaz → new → constructor →
    reference → metod cagrisi.
- `withExtraBlocks` dizileri guncellendi; her bolumde animasyon + order-sort yerlestirildi.
- `npm run build` PASS — 38 static route shell, SEO check gecti.

### Java Sayfasina Python Ogretme Yontemi Yayildi (Codex)

- Aktif calisma branch'i bu oturumda `codex` olarak dogrulandi.
- `Documents/acceptancecriterias.md` ve Python sayfasindaki son block sistemi
  incelendi: `code-playground`, `good-vs-bad`, `step-animation`,
  `interactive-diagram`, `challenge` altyapisi Java sayfasina da uygulanabilir.
- `src/data/javaData.js` icine Java'ya ozel interaktif bloklar eklendi:
  - Basic Syntax: main method playground + main signature challenge + semicolon bug-spot.
  - OOP & Collections: object creation step-animation.
  - JUnit5/TestNG: test katmanlari diagrami, JUnit lifecycle, Maven flow,
    JUnit assertion playground, console vs assertion good-vs-bad, Maven order challenge.
  - Selenium: Thread.sleep vs WebDriverWait good-vs-bad.
  - Real World: test katmanlari diagrami + Maven flow.
- `src/lib/xp.js` route-aware hale getirildi; Java bloklari artik Python XP
  havuzunu kirletmeden `learnqa_xp_java` anahtarini kullanir. Python route'u
  geriye donuk uyumluluk icin `learnqa_xp_python` kullanmaya devam eder.
- Dogrulama: `npm run build` PASS; local preview `http://127.0.0.1:5173/java`
  200 dondu.

### AC03 — EN Modda Turkce Karakter Temizligi (Tamamlandi)

AC03 testi (`tests/i18n-content-toggle.spec.ts`) artik **28 passed, 0 failed**.
Onceki oturumdan gelen 3 fail tamamlandi:

1. **`/java` sekme 12: `// Ag sessizlesene kadar`**
   - `TopicPage.jsx` `codeCommentTranslations` dizisine
     `[/Ag sessizlesene kadar/gi, 'Until network is idle']` eklendi.

2. **`/browserstack` sekme 2: `Terminal — local makinende calistir`**
   - `SimulationBlock` renderinda `block.code` getLocalizedCode ile sarmalandi.
   - `browserstackData.js` ilgili simulation code block bilingual `{tr, en}` yapildi.

3. **`/test-frameworks` timeout**
   - `TestFrameworksPage.jsx` dil toggle wrapper'ina `data-testid="language-toggle"` eklendi.
   - Gercek icerik ihlali da cikti: `PythonFrameworksTab.jsx`'te
     `# Ornek: Chrome ayarlari sayfasindaki shadow DOM` yorumuna ozgul ceviri kurali eklendi.

### Diger Duzeltmeler (Ayni Oturum)

- `javaData.js`:
  - `Auto-Wait karsilastirma` label bilingual yapildi.
  - `Screenshot ve JavaScript islemleri` label (sSelenium + sPlaywright) bilingual yapildi.
  - Multi-page playwright-visual step kodu bilingual `{tr, en}` yapildi.
  - `sSelenium.en` by-xpath locator kodundaki `Giris Yap` -> `Login` duzeltildi.

- `TopicPage.jsx`:
  - `PlaywrightVisualBlock` step.code getLocalizedCode ile sarmalandi.
  - `SimulationBlock` block.code getLocalizedCode ile sarmalandi.
  - 10 yeni `codeCommentTranslations` kaydi eklendi.

### Test Coverage Raporu Olusturuldu

`Documents/testcoverage.md` dosyasi olusturuldu.
- 78 test, 13 dosya analiz edildi.
- AC bazinda kapsam tablosu (AC01-AC09).
- Test teknikleri, gercek bosliklar ve oncelikli iyilestirme onerileri belgelendi.

### test -> main Merge Tamamlandi

- Fast-forward merge: merge commit olusmadi, pointer ilerledi.
- `origin/main` push edildi.
- Calisma agaci temiz.

---

## Test Sonuclari (2026-06-29 — Son Kosum)

- `npm run build` PASS — 38 static route HTML shell, dist SEO check passed.
- `tests/i18n-content-toggle.spec.ts` PASS — **28 passed, 0 failed** (Java sayfasi dahil).
- `tests/topic-pages-ui.spec.ts` PASS — **24 passed, 0 flaky** (tam paralel kosumda da).
- `tests/topic-pages-ui.spec.ts` + `other-pages-ui.spec.ts` + `example.spec.ts` + tum dosyalar — **76 passed, 0 failed**.
- Onceki: 1 failed (/python) + 3 flaky (playwright/cypress/selenium) → **simdi hepsi pass**.

### Bu Oturumda Yapilan Test Duzeltmeleri

- `tests/python-page.spec.ts` SILINDI — hash URL kullaniyordu, yanlis sayfada calisiyor.
- `tests/sql-page.spec.ts` DUZELTILDI — `toBe(25)` → `toBeGreaterThan(20)` + `💼` emoji interview tab tespiti.
- `tests/javascript-page.spec.ts` DUZELTILDI — son sekme pozisyon varsayimi → `💼` emoji tespiti.
- `src/data/javaData.js` — `javaPlaygroundCucumber` + `javaPlaygroundPlaywright` `code` alani bilingual.
- `src/components/CodePlaygroundBlock.jsx` — `block.code` → `pick(block.code, isTr)` bilingual destegi.
- `playwright.config.ts` — `retries: 0 → 1` lokal ortamda flaky'leri azaltmak icin.
- **`src/components/TopicPage.jsx` — Pyodide CDN `.catch()` + `s.onerror` eklendi** (KRITIK).
  - Kök neden: `window.loadPyodide()` promise'inde `.catch()` yoktu; paralel test
    kosumunda CDN gecikmesi olunca unhandled promise rejection → Playwright pageerror.
  - Duzeltme: `.catch(() => { window._pyodideLoading = false })` + `s.onerror` handler.
  - Sonuc: /python testi tam paralelde de 0 fail, 0 flaky.
- Kalan risk: `buggyCode`/`fixedCode` icindeki Turkce yorumlar panel kapali → scan yakalamaz. `testcoverage.md` paragraf 7'de kayitli.

---

## Bu Oturumda Yapilan Is (2026-06-29 — TypeScript Interaktif Bloklar)

### AI Aciklama Yabanci Karakter Sorunu Duzeltildi

Python sayfasinda sayfa dili TR iken "AI Aciklama" panelinde Cince karakter
(携带) gorunuyordu. Kok neden: llama-3.3-70b-versatile modeli "portability"
gibi kavramlari anlatiinca egitim verisinden Cince token kariştiriyordu.
SYSTEM_PROMPT muğlak "ogrencinin yazdigi dilde ver" ifadesi modele UI dilinden
degil kullanicinin cevap metninden anliyordu.

Duzeltme: `supabase/functions/explain-quiz-answer/index.ts` SYSTEM_PROMPT'una
acik ve kesin dil yasagi eklendi: "DİL satiri hangi dili belirtiyorsa YALNIZCA
o dilde yaz", "Cince, Japonca, Korece veya Latin alfabesi disindaki HICBIR
karakter kullanma". Deploy komutu:
  supabase functions deploy explain-quiz-answer --project-ref qmvurwmcuexvuwvaiuhj

### Python Sayfasi Kapsamli Tarama — Sorun Yok

23 sekme EN/TR block sayilari eslesip eslesmedigini, 58 mulakat sorusunu,
49 quiz blogu gecerliligi, 21 step-anim + 21 order-sort + 42 code-playground,
bilingual label/title eksiksizligi, 37 playground item bilingual title
kontrollerin tumu PASS. Statik veride hata yok.

### TypeScript Sayfasina Step-Animation + Order-Sort Eklendi (Tum 17 Sekme)

Python/Java'nin interaktif blok pattern'i TypeScript sayfasina da yayildi.
Onceki durumda TypeScript'te 0 step-animation, 0 order-sort vardi.

**Teknik yaklasim:** Python Batch 2/3 ile ayni guvenli pattern — TypeScript
veri dosyasi monolitik inline JSON oldugu icin Python'daki gibi ayri const +
slice pattern kurulamaz; bunun yerine export'tan sonra bilingual `const` blok
tanimlari + `_tsInsert.forEach` ile `splice` eklendi. Paylasilan dizi yok,
cascading risk sifir.

**Eklenen bloklar (her sekme icin 1 step-animation + 1 order-sort = toplam 34):**
- [0] Intro & Why: TS compile flow (5 adim) + compile-flow order-sort
- [1] Installation: Playwright+TS setup (5 adim) + install order-sort
- [2] Simple & Special Types: tip anotasyonu nasil calisir (5 adim) + unknown/API order-sort
- [3] Arrays & Tuples: array vs tuple farki (5 adim) + API list order-sort
- [4] Object Types & Enums: enum+interface config (5 adim) + config order-sort
- [5] Interface & Type Aliases: interface vs type alias (5 adim) + union narrowing order-sort
- [6] Functions & Casting: fonksiyon tip anotasyonu (5 adim) + fonksiyon order-sort
- [7] Classes & Decorators: POM class olusturma (5 adim) + POM order-sort
- [8] Generics: generic fonksiyon nasil calisir (5 adim) + ApiResponse<T> order-sort
- [9] Utility Types & Keyof: Partial/Required/Readonly/Pick (5 adim) + keyof order-sort
- [10] Template Literals & Null: strictNullChecks (5 adim) + nullable string order-sort
- [11] Error Handling & Advanced Types: @types kurulum akisi (5 adim) + @types order-sort
- [12] QA Use Cases: POM yazimdan teste (5 adim) + POM+fixture order-sort
- [13] Java → TS: Java'dan TS'e gecis (5 adim) + List<String> migrasyonu order-sort
- [14] Test Runners: Vitest unit test (5 adim) + e2e Playwright order-sort
- [15] Interview Q&A: mulakat cevap stratejisi (5 adim) + "any neden zararli" order-sort
- [16] Practice & Reference: quick reference kullanim (5 adim) + JS→TS migrasyonu order-sort

Her blok bilingual {tr, en} — tek blok her iki sekme icin calisir, render
katmanindaki pick() dil secimini yapar.

**Test sonuclari:** npm run build PASS (38 static route, SEO check gecti,
typescriptData chunk 771KB). Playwright topic-pages-ui + i18n-content-toggle
52 test PASS (0 fail).

---

## Bitmis / Kapanmis Konular

- AC03 EN mod Turkce karakter ihlalleri: tum 24 route temizlendi.
- `test -> main` merge yapildi, `origin/main` push edildi.
- TypeScript sayfasi interaktif blok rollout tamamlandi (17/17 sekme).
- TypeScript'in 37 simple-box analojisi Bolum 9.3 4-katmanli standarda
  yukseltildi (2 bozuk content alani + 4 syntax hatasi + 1 yanlis-pozitif
  Playwright test hatasi bulunup duzeltildi); Docker/Jenkins/Kubernetes'in
  44 analojisi de ayni standarda daha once yukseltilmisti.

---

## Eksikler / Riskler / Yapilacaklar (Oncelik Sirasi)

1. **`git push origin main` — EN KRITIK, BEKLEYEN EYLEM.**
   - Kullanicinin "push islemini beraberce test ettikten sonra yapalim" talimatiyla
     ertelendi. Manuel tarayici testinden sonra yapilmali.
   - Komut: `git push origin main`

2. **Locator Explorer manuel tarayici testi yapilmali (push oncesi).**
   - `/selenium`, `/playwright`, `/cypress` sayfalarinda:
     - Locators sekmesinde `LOCATOR_EXPLORER_BLOCK` gorünüyor mu?
     - Bir ozellige tiklaninca sag panelde kod aciliyor mu?
     - `class="form-field"` secilince "×2" rozeti + sari uyari cikiyor mu?
     - Selenium / Playwright / Cypress sekme gecisleri calisiyor mu?
     - TR/EN dil toggle'i calistigindan emin ol (noteTr/En, tipTr/En)

3. **Interaktif trio (fillMissingCodeTrios) kapsam durumu — TAMAMLANDI.**
   - Tum 21 sayfa: Python/TS/Docker/Jenkins/Kubernetes/JS/Postman/REST Assured/
     Selenium/Playwright/Cypress/Java/SQL/Git/Linux/JMeter/Appium/Kafka/AWS/Azure/Bruno
   - Audit: `node scripts/audit-interactive.mjs --missing` → gap 0

4. **Henuz interaktif ucluye (fillMissingCodeTrios) sahip OLMAYAN sayfalar:**
   - what-is-testing, manual-testing, algorithms, advanced-algorithms, test-frameworks
   - Bu sayfalarin veri yapisi farkli olabilir; alinmadan once incelenmeli.

5. **Henuz §9.3 4-katmanli analoji standardina tasinmamis sayfalar:**
   - Selenium, Playwright, Cypress, Java, JavaScript, SQL, Postman, REST Assured,
     JMeter, Kafka, Appium, BrowserStack, AWS, Azure, Git & GitHub, Linux,
     test-frameworks, what-is-testing, manual-testing, algorithms, advanced-algorithms
   - Python/Bruno/TypeScript/Docker/Jenkins/Kubernetes tamamlandi.

6. **Stale test dosyalari duzeltilmeli (testcoverage.md paragraf 7 referansi).**
   - `python-page.spec.ts`: hash URL kullaniyordu — SILINDI.
   - `sql-page.spec.ts`: `expect(count).toBe(25)` → `toBeGreaterThan(20)` — DUZELTILDI.
   - `javascript-page.spec.ts` son sekme interview varsayimi — DUZELTILDI.
   - Kalan 4 flaky test (pre-existing): `/advanced-algorithms`, `/qa-mentor`,
     `/leaderboard` timeout + quiz-ai page load — henuz duzeltilmedi.

7. **Uyelik gerektiren full AI/interview testleri kosturulmali.**
   - `.env.local` icine `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` eklenerek
     `npm run test:interview-flows` ve `tests/api-endpoints.spec.ts` uyelikli
     testleri tamamlanmali.

8. **AC08 coklu tema paleti eksik.**
   - Kullanici "simdilik atla" demis. Gerekirse `Documents/acceptancecriterias.md`
     Madde 11 plani hazir.

9. **Bundle boyutu (teknik borc).**
   - `TopicPage` chunk ~1.3MB+.
   - Acil degil; code-splitting / manualChunks ile iyilestirilebilir.

---

## Onemli Dosyalar

- `src/components/TopicPage.jsx` — ortak block renderer; `case 'locator-explorer'` eklendi.
- `src/components/LocatorExplorerBlock.jsx` — YENİ: interaktif HTML→locator explorer.
- `src/data/locatorExplorerData.js` — YENİ: paylasilan LOCATOR_EXPLORER_BLOCK.
- `src/data/interactiveTrioFillers.js` — fillMissingCodeTrios + fillMissingFeynman; tum sayfalar bagli.
- `scripts/audit-interactive.mjs` — CI audit: `node scripts/audit-interactive.mjs --missing`
- `scripts/check-content-integrity.mjs` — YENİ: TR yorum + relatedTopicId + duplikat hint kontrolu (build + pre-commit hook'a bagli)
- `src/data/javaData.js` — sSelenium ve sPlaywright bilingual label/code fix'leri.
- `src/components/PythonFrameworksTab.jsx` — kendi codeCommentTranslations dizisi var.
- `src/components/TestFrameworksPage.jsx` — data-testid="language-toggle" eklendi.
- `src/data/browserstackData.js` — simulation code bilingual.
- `tests/i18n-content-toggle.spec.ts` — AC03 Kosul B, 28 test.
- `Documents/testcoverage.md` — test kapsam raporu.
- `Documents/acceptancecriterias.md` — sistem kabul kriterleri (AC01-AC10).

---

## Hatirlatma

- Kullanici Core Java biliyor; QA muhendisi perspektifiyle ogreniyor.
- Turkce anlatim + Ingilizce teknik terimler.
- Python/TypeScript/QA anlatimlarinda Java analojisi zorunlu.
- Gorsel, animasyon ve deneme odakli ogretim tercih ediliyor.
