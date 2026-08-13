# SEO Görünürlük Raporu — learnqa.dev

**Tarih:** 2026-08-13

**Kapsam:** Google web araması üzerinden İngilizce ve Türkçe sorgularla learnqa.dev'in görünürlük/sıralama durumu.

**Yöntem notu:** Sonuçlar bir web arama API'si üzerinden alınmıştır; Google'ın resmi arama sonuç sayfasıyla (SERP) birebir aynı olmayabilir ve sayısal pozisyon (1., 2., 47. sıra gibi) bilgisi vermez. Kesin pozisyon/tıklama/gösterim verisi için Google Search Console "Performance" ve "Coverage" raporlarına bakılmalıdır.

---

## 1. Site İndeksleme Durumu

**Sorgu:** `site:learnqa.dev`

- Google yalnızca **1 sayfayı** sonuç olarak döndürdü: `/llm-agents/deterministic-vs-stochastic-testing/`.
- Ana sayfa (`/`), `/selenium`, `/playwright`, `/jira` gibi kilit route'lardan **hiçbiri** bu sorguda çıkmadı.
- Sonuç: sitenin Google indeksindeki görünürlüğü şu an çok sınırlı.

**Sorgu:** `site:learnqa.dev selenium`

- learnqa.dev'e ait **hiçbir sayfa** dönmedi. Sonuçların tamamı selenium.dev, Wikipedia, ToolsQA gibi üçüncü taraf sitelerden geldi.

**Sorgu:** `site:learnqa.dev playwright`

- learnqa.dev'den yalnızca aynı LLM Agents sayfası (`/llm-agents/deterministic-vs-stochastic-testing/`) çıktı. `/playwright` sayfasının kendisi dönmedi.

---

## 2. Marka Adı Araması

**Sorgu:** `learnqa.dev`

- learnqa.dev **hiç görünmedi.**
- Sonuçların tamamı alakasız bir başka siteye ait: **learnqa.ru** (Rusça bir yazılım test eğitim platformu — career.habr.com, learnqa.ru, YouTube kanalı @learnqa).
- Sonuç: marka adı aramasında bile site isim benzerliği nedeniyle learnqa.ru ile karışıyor ve görünmüyor.

---

## 3. Rekabetçi İngilizce Sorgular

| Sorgu | learnqa.dev göründü mü? | Üstte çıkan siteler |
|---|---|---|
| "Selenium WebDriver tutorial for QA engineers" | Hayır | janbasktraining.com, codementor.io, guru99.com, udemy.com, softwaretestingmaterial.com, yrkan.com, qapot.com, testmuai.com |
| "QA automation learning platform" | Hayır | platform.qa.com, janbasktraining.com, sulekha.com, qa.com, careerist.com, mate.academy, codingtemple.com |

---

## 4. Rekabetçi Türkçe Sorgular

| Sorgu | learnqa.dev göründü mü? | Üstte çıkan siteler |
|---|---|---|
| "Selenium eğitimi QA mühendisleri için" | Hayır | patika.dev, mobilhanem.com, virgosol.com, udemy.com, testeryou.com, zeinmedya.com |
| "QA otomasyon öğrenme platformu Türkçe" | Hayır | startupgazetesi.com, microsoft.com (Power Automate), appmaster.io, unityverseacademy.com, vinya.com.tr, zaptest.com |
| "Jira QA JQL Scrum Kanban Türkçe eğitim öğren" | Hayır | medium.com (Batuhan Akpunar, Volkan Şenkardeşler), bmo.org.tr, lavapools.com, bilginc.com, udemy.com, btakademi.com, atlassian.com |

---

## 5. Siteye Özgü Benzersiz İçerik Sorguları

| Sorgu | learnqa.dev göründü mü? | Üstte çıkan siteler |
|---|---|---|
| "Jira for QA JQL Scrum Kanban tutorial" | Hayır | atlassian.com, planyway.com, producthq.org, titanapps.io, techagilist.com |
| "QA Sprint Simulator Kanban bug tasks learnqa" | Hayır | deviqa.com, medium.com, quashbugs.com, bugherd.com, kanbanize.com, mindfulqa.com |
| "Bruno API client Git-native test otomasyon Türkçe" | Hayır | usebruno.com, sourceforge.net, github.com, bruno-docs.vercel.app, producthunt.com, codoid.com, qaskills.sh |

---

## 6. Genel Değerlendirme

- learnqa.dev, denenen **hiçbir rekabetçi sorguda** (İngilizce veya Türkçe) ilk sonuçlarda görünmedi.
- `site:learnqa.dev` sorgusu sitenin Google indeksinde **son derece az sayfayla** temsil edildiğini gösteriyor — indekslenen tek sayfa `/llm-agents/deterministic-vs-stochastic-testing/`.
- Marka adı aramasında (`learnqa.dev`) bile site görünmüyor; bunun yerine isim benzerliği taşıyan alakasız bir site (**learnqa.ru**) çıkıyor.
- Rakip olarak öne çıkan siteler: janbasktraining.com, guru99.com, qa.com, careerist.com, mate.academy (İngilizce); patika.dev, mobilhanem.com, testeryou.com, udemy.com, btakademi.com (Türkçe).

---

## 7. Kapsam Dışı Bırakılanlar

Raporun 1-6. bölümleri yalnızca arama görünürlüğü ölçümüdür; kök neden analizi ve aksiyon planı ölçümün parçası değildir. Bunlar **8. bölümden itibaren** ayrı bir belge olarak eklenmiştir (2026-08-13, aynı gün).

---
---

# İKİNCİ BÖLÜM — Kök Neden Analizi ve Sıralama Planı

**Hazırlanma tarihi:** 2026-08-13
**Kapsam:** Yukarıdaki ölçümün nedeni + learnqa.dev'i arama sonuçlarında öne çıkarma planı.
**Yöntem:** Rapordaki iddialar canlı site, repo, sitemap ve GitHub API üzerinden bağımsız olarak doğrulandı. Aşağıdaki her teşhis bir kanıta dayanır, tahmine değil.

---

## 8. Kök Neden Analizi — Sorun Teknik SEO DEĞİL

Önce en önemli bulgu: **teknik SEO altyapısı sağlam ve çalışıyor.** Bu, planın yönünü tamamen değiştirir; çünkü "indekslenmiyoruz" denince ilk refleks teknik altyapıyı elden geçirmektir ve burada elden geçirilecek bir şey yok.

### 8.1. Doğrulanan: altyapı çalışıyor

Canlı siteden çekilen kanıtlar:

| Kontrol | Sonuç | Kanıt |
|---|---|---|
| Sayfa gerçekten yayında mı? | Evet | `https://learnqa.dev/selenium` → 2000+ kelime gerçek içerik, boş JS kabuğu değil |
| Başlık route'a özel mi? | Evet | "Selenium Nedir? WebDriver Eğitimi (Java, Python) \| LearnQA.dev" |
| Dil-ayrık URL çalışıyor mu? | Evet | `/en/selenium` → "Selenium WebDriver Tutorial for QA Engineers", tamamen İngilizce içerik |
| Sitemap geçerli mi? | Evet | 794 URL, `hreflang` alternates, `lastmod`, `priority` — geçerli XML |
| robots.txt engelliyor mu? | Hayır | `Allow: /` + sitemap referansı |
| Yapılandırılmış veri var mı? | Evet | `Organization`, `Person`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Course` |
| Yazar/yayıncı kimliği var mı? | Evet | Şema ve görünür künye tek kaynaktan besleniyor |

**Sonuç:** Google'ın bu siteyi indeksleyememesi için teknik bir engel yok. Sorun başka yerde.

### 8.2. Gerçek kök neden — üç maddede

#### KÖK NEDEN 1: Domain 8 haftalık ve dış dünyada HİÇ referansı yok (en kritik)

- `public/CNAME` dosyası repoya **2026-06-18**'de eklendi. Yani `learnqa.dev` alan adı bugün itibarıyla yaklaşık **8 haftalık**.
- Şema dosyasında (`src/utils/authorship.js`) siteyi doğrulayan iki dış kaynak beyan ediliyor: GitHub reposu ve LinkedIn profili. GitHub reposunun gerçek durumu API'den kontrol edildi:

```
name: automationexercise
description: null          <- bos
homepage: null             <- learnqa.dev linki YOK
topics: []                 <- bos
stargazers_count: 0
```

Yani şema Google'a "beni şu GitHub reposu doğruluyor" diyor, o repo ise siteye geri link vermiyor, hatta ne olduğunu bile anlatmıyor. **Tek yönlü, karşılıksız bir sinyal — Google için değeri sıfıra yakın.**

- Doğrulama araması: `"learnqa.dev" QA Learning Platform Hasan Kocaman` sorgusu **sıfır** ilgili sonuç döndürdü. Site adının tırnak içinde geçtiği tek bir dış sayfa bile yok.

**Bunun sonucu doğrudan indekslemeyi vuruyor:** Google yeni bir domaine ayırdığı tarama bütçesini (crawl budget) o domainin güvenilirliğine göre belirler. Hiçbir yerden link almayan 8 haftalık bir domaine 794 URL'lik bir sitemap sunulduğunda Google tipik davranışı sergiler: birkaç sayfayı tarar, gerisini **"Keşfedildi – şu anda dizine eklenmedi"** kuyruğunda bekletir. Raporun 1. bölümündeki "794 URL'den 1 tanesi indekslendi" tablosu tam olarak bu tablodur.

`Documents/outreach/` altında dört tanıtım taslağı (GitHub About metni + 3 blog yazısı) **2026-08-02'de yazılmış ama hiçbiri yayınlanmamış** — `.claude/NEXT_SESSION.md` bunu üç ayrı oturumdur açık iş olarak taşıyor. Bu, planın en yüksek getirili ve en düşük maliyetli kalemidir.

#### KÖK NEDEN 2: Marka adı zaten başka bir varlık tarafından işgal edilmiş

Raporun 2. bölümü doğru: `learnqa.dev` aramasında **learnqa.ru** çıkıyor. Doğrulama araması bunu teyit etti — `site:learnqa.dev` sorgusunda bile sonuçların çoğu learnqa.ru'nun Habr kariyer sayfası, YouTube kanalı ve benzer isimli platformlar.

Bunun nedeni isim benzerliği değil, **varlık (entity) otoritesi**: learnqa.ru yıllardır yayında, Habr üzerinde eğitim merkezi kaydı var, YouTube kanalı var. Google "learnqa" dizisini gördüğünde tanıdığı varlığa gidiyor. learnqa.dev henüz Google'ın bilgi grafiğinde **bir varlık değil** — sadece birkaç URL.

**Kritik çıkarım:** Marka araması ("learnqa.dev") sıralaması, rekabetçi sorguların ön koşuludur. Google kendi markanda seni bulamıyorsa, "selenium eğitimi" gibi sorgularda hiç bulmaz. Bu yüzden plan marka sorgusunu 1. faza koyuyor.

#### KÖK NEDEN 3: Ölçüm yok — kör uçuyoruz

- Google Search Console'da sitemap'in gönderilip gönderilmediği, property'nin doğrulanıp doğrulanmadığı belgelerde teyit edilmiyor.
- `.claude/NEXT_SESSION.md`'de Plausible analytics hesabının **hâlâ açılmadığı** üç oturumdur yazılı.
- Bu raporun kendisi bir arama API'si üzerinden alınmış; kendi yöntem notunda belirttiği gibi gerçek pozisyon/gösterim verisi vermiyor.

Yani şu an "hangi sorguda kaçıncı sıradayız, hangi sayfa taranmış ama indekslenmemiş, hangi sayfa indekslenmiş ama tıklanmıyor" sorularının **hiçbirinin cevabı yok**. Ölçüm kurulmadan yapılacak her optimizasyon tahmin olur.

### 8.3. Kök neden OLMAYAN şeyler (bunlara zaman harcama)

Aşağıdakiler sık yapılan yanlış teşhislerdir ve bu sitede sorun değildir:

- "React SPA olduğu için Google göremiyor" — her route için gerçek içerikli statik HTML üretiliyor, doğrulandı.
- "Metadata eksik" — her route'ta iki dilde başlık/açıklama/canonical var, build bunu zorluyor.
- "Sitemap yok/bozuk" — 794 URL'lik geçerli sitemap yayında.
- "İçerik yetersiz" — sayfa başına 2000+ kelime, quiz, mülakat soruları, interaktif blok var. İçerik derinliği rakiplerin çoğundan **fazla**.

**Site içerik ve altyapı olarak hazır; eksik olan tek şey dış dünyanın ondan haberdar olması.**

---

## 9. Gerçekçi Hedef Belirleme — "İlk Sıra" Ne Demek?

"İlk sıralarda çıkmak" tek bir hedef değildir; sorgu tipine göre zorluk 100 kat değişir. Aşağıdaki ayrım yapılmazsa plan başarısız görünür, oysa doğru yerde başarılıdır.

| Sorgu tipi | Örnek | Gerçekçi süre | Zorluk |
|---|---|---|---|
| **A. Marka sorgusu** | `learnqa.dev`, `learnqa dev selenium` | **2-6 hafta** | Kolay — sadece varlık sinyali gerekir |
| **B. Türkçe uzun kuyruk** | `selenium explicit wait nedir`, `jira jql örnekleri`, `pytest fixture scope nedir` | **2-5 ay** | Orta — rekabet zayıf, içerik zaten hazır |
| **C. Türkçe orta kuyruk** | `selenium wait stratejileri`, `playwright locator kullanımı` | **4-8 ay** | Zor |
| **D. Türkçe ana sorgu** | `selenium eğitimi`, `qa otomasyon öğren` | **8-14 ay** | Çok zor — patika.dev, udemy, btakademi |
| **E. İngilizce ana sorgu** | `selenium webdriver tutorial` | **gerçekçi değil (12+ ay)** | guru99, browserstack, testsigma — 10+ yıllık domainler, binlerce backlink |

**Stratejik karar:** Kaynak **A → B → C** sırasına yoğunlaştırılmalı. D ve E kendiliğinden, B ve C'deki başarının birikimiyle gelir; doğrudan hedeflenirse harcanan emek boşa gider.

**Neden Türkçe önce:** Rapordaki 4. bölüm tabloları Türkçe sorgularda rakiplerin patika.dev, mobilhanem, testeryou gibi siteler olduğunu gösteriyor — bunlar guru99/BrowserStack ölçeğinde değil. Ayrıca sitenin içeriği zaten Türkçe-öncelikli (çıplak URL = Türkçe) ve Türkçe QA içeriğinde derinlik boşluğu var. İngilizce tarafta ise dünyanın en doymuş içerik pazarlarından birine giriyoruz.

---

## 10. Plan — 4 Faz

Her fazda **kim yapacak** (kullanıcı aksiyonu mu, kod işi mi) ve **çıkış kriteri** (fazın bittiğini nasıl anlarız) belirtilmiştir. Fazlar sıralıdır: Faz 0 tamamlanmadan Faz 1'in etkisi ölçülemez.

### FAZ 0 — Ölçümü Kur (1 gün, tamamı kullanıcı aksiyonu, KOD İŞİ YOK)

Bu faz olmadan geri kalan her şey körlemesine yapılır. En küçük faz ama **en kritik sıralamada.**

| # | İş | Nerede | Çıkış kriteri |
|---|---|---|---|
| 0.1 | `learnqa.dev` domain property olarak eklenip DNS TXT ile doğrulanır | Google Search Console | Property "Doğrulandı" |
| 0.2 | `https://learnqa.dev/sitemap.xml` gönderilir | GSC → Sitemaps | Durum "Başarılı", ~794 URL keşfedildi |
| 0.3 | Bing Webmaster Tools'a site eklenir (GSC'den içe aktarmayla 2 dakika) | Bing WMT | Sitemap kabul edildi |
| 0.4 | 8 kilit URL için "URL Denetimi" + "Dizine Eklenmesini İste" | GSC | 8 istek kuyruğa girdi |
| 0.5 | Plausible (veya GA4) hesabı açılır, script siteye eklenir | Kod + hesap | İlk ziyaret verisi düşüyor |

**0.4'teki 8 URL (öncelik sırasıyla):**

```
https://learnqa.dev/                    <- ana sayfa, marka sorgusu icin ZORUNLU
https://learnqa.dev/selenium
https://learnqa.dev/jira
https://learnqa.dev/playwright
https://learnqa.dev/python
https://learnqa.dev/sql
https://learnqa.dev/what-is-testing
https://learnqa.dev/manual-testing
```

Ana sayfanın indekslenmemiş olması muhtemelen mevcut durumun en zararlı parçası: marka sorgusunda çıkacak sayfa odur ve `site:learnqa.dev` sonuçlarında görünmüyor.

**Faz 0 çıkış kriteri:** GSC → Sayfalar raporu açılabiliyor ve "Dizine eklenmedi" nedenlerini (`Keşfedildi – dizine eklenmedi`, `Tarandı – dizine eklenmedi`, `Kullanıcı tarafından seçilen canonical yok`) sayısal olarak görebiliyoruz. Bu rakamlar Faz 1'in hedefini belirleyecek.

---

### FAZ 1 — Varlık Olmak: Dış Sinyal ve Marka Sorgusu (1-2 hafta, çoğu kullanıcı aksiyonu)

Amaç: Google'ın gözünde learnqa.dev'i "birkaç URL"den "bir varlık"a dönüştürmek. Kök neden 1 ve 2'yi doğrudan hedefler.

#### 1.1. Karşılıklı link zincirini kur (30 dakika, en yüksek getiri/maliyet oranı)

`Documents/outreach/github-repo-about.md` içindeki metinler zaten hazır, sadece uygulanmamış:

| İş | Nerede | Neden |
|---|---|---|
| Repo "About" açıklaması yazılır | GitHub → Settings → General | Şemadaki `sameAs` iddiasını karşılıklı hale getirir |
| Website alanına `https://learnqa.dev` girilir | Aynı yer | **Bu tek alan, şemadaki en zayıf halkayı kapatır** |
| 12 topic etiketi eklenir | Aynı yer | GitHub'ın konu sayfalarından keşif |
| README'nin en üstüne canlı site linki + marka açıklaması | `README.md` | GitHub README'leri Google tarafından indekslenir |
| LinkedIn profiline site linki + bir tanıtım gönderisi | LinkedIn | Şemadaki ikinci `sameAs`'i karşılıklı yapar |

Bu beş adım tamamlandığında Google, `learnqa.dev` ↔ GitHub ↔ LinkedIn üçgenini kapalı bir varlık grafiği olarak görmeye başlar. Şu anda bu üçgen tek yönlü ve kopuk.

#### 1.2. İlk gerçek dış linkleri üret (1-2 hafta)

`Documents/outreach/` altında **üç yazı taslağı hazır ve yayınlanmayı bekliyor**:

- `draft-selenium-wait-strategies.md`
- `draft-sql-joins-for-testers.md`
- `draft-playwright-vs-selenium.md`

Her biri, ilgili learnqa.dev sayfasına link veren bir "teaser" olarak yayınlanmalı. Önerilen kanallar (Türkçe öncelikli):

| Kanal | Neden | Beklenen etki |
|---|---|---|
| **Medium (Türkçe)** | Rapordaki 4. bölüm, `Jira QA JQL` sorgusunda ilk sıraların Medium yazılarına ait olduğunu gösteriyor — bu kanalın o sorgularda çalıştığının kanıtı | Orta |
| **dev.to** | Kolay, hızlı indeksleniyor, `canonical_url` desteği var | Orta |
| **Türkçe QA toplulukları** (LinkedIn grupları, Discord/Slack QA kanalları) | Gerçek insan trafiği + marka bilinirliği | Yüksek (dolaylı) |
| **r/QualityAssurance, r/selenium** | Kendi kendini tanıtmak değil, "şu ücretsiz kaynağı yaptım" formatında | Değişken |

**Kritik teknik detay:** Medium/dev.to'ya yazının TAMAMINI kopyalama. Ya kısaltılmış versiyon + "devamı için" linki ver, ya da platformun `canonical_url` alanını learnqa.dev'deki asıl sayfaya ayarla. Aksi halde 8 haftalık domain, Medium'la içerik kopyası çekişmesine girer ve Medium kazanır.

#### 1.3. Marka varlığını netleştir (kod işi — küçük)

learnqa.ru karışıklığını azaltmak için:

- Ana sayfada ve şemada marka adı **"LearnQA.dev"** olarak, `.dev` uzantısı dahil ve tutarlı geçmeli (halihazırda öyle — korunmalı).
- `Organization` şemasına `description` ve `foundingDate` alanları eklenmeli (şu an yok) — varlık tanımını güçlendirir.
- `alternateName: 'QA Learning Platform'` eklenerek Google'a markanın ikinci adı bildirilmeli.

**Faz 1 çıkış kriteri:** `learnqa.dev` aramasında site **ilk sırada**. Bu, planın ilk somut "birinci sıra" kazanımıdır ve 8-10 kalemlik bir iş listesiyle 2-6 haftada ulaşılabilir.

---

### FAZ 2 — İndeksi Açmak: Tarama Bütçesini Doğru Yönlendir (2-4 hafta, kod işi ağırlıklı)

Amaç: 794 URL'nin anlamlı bir kısmının gerçekten dizine girmesi. Faz 1 olmadan bu faz sonuç vermez (Google güvenmediği domaine bütçe ayırmaz), o yüzden **Faz 1 ile paralel değil, sonra** çalıştırılmalı.

#### 2.1. Sitemap'i indeks yapısına böl (kod)

**Sorun:** Şu an tek bir sitemap'te 794 URL var (397 TR + 397 EN; 47 hub + ~350 bölüm sayfası). GSC bunları tek blok olarak raporluyor — "hangi grup indeksleniyor, hangisi takılıyor" ayırt edilemiyor.

**Çözüm:** `scripts/generate-seo-files.mjs` bir sitemap index üretecek şekilde genişletilir:

```
sitemap.xml                 (index)
  sitemap-tr-hubs.xml       (47 Turkce ana sayfa - en yuksek oncelik)
  sitemap-tr-sections.xml   (~350 Turkce bolum sayfasi)
  sitemap-en-hubs.xml       (47 Ingilizce ana sayfa)
  sitemap-en-sections.xml   (~350 Ingilizce bolum sayfasi)
```

**Kazanç:** GSC her alt sitemap için ayrı "gönderilen / dizine eklenen" sayısı gösterir. "Türkçe hub'ların %90'ı indekslendi ama bölüm sayfalarının %5'i indekslendi" gibi bir teşhis, aksiyonu doğrudan yönlendirir. Şu anki tek-sitemap yapısında bu ayrım imkânsız.

#### 2.2. IndexNow entegrasyonu (kod — küçük, tek seferlik)

Bing ve Yandex, IndexNow protokolüyle **anında** bildirim kabul eder. Deploy sonrası değişen URL'ler otomatik bildirilir. Google IndexNow kullanmaz ama:

- Bing'de hızlı indeksleme → ChatGPT/Copilot aramaları Bing indeksini kullanır,
- Bing'de görünürlük, Google için dolaylı bir kalite sinyalidir.

Uygulama: `scripts/` altına bir `ping-indexnow.mjs` + repo köküne anahtar dosyası + deploy workflow'unda bir adım. Yaklaşık 1 saatlik iş.

#### 2.3. İç linkleme yapısını kümelendir (kod — orta)

**Mevcut durum:** Her statik shell'in altında 40+ sayfaya düz link var (`generate-static-routes.mjs` satır ~472). Bu, her sayfayı her sayfaya bağlayan **düz bir yapı**. Google için sinyal değeri düşüktür — hiçbir sayfa "önemli" görünmez.

**Hedef yapı — konu kümeleri (topical clusters):**

```
/selenium (hub, otorite toplayan sayfa)
   /selenium/wait-strategies      <- hub'a geri link + kardeslere link
   /selenium/locators
   /selenium/page-object-model
        (capraz kume linki, SINIRLI)
/playwright (hub)  <- sadece 3-5 ilgili hub'a link
```

Kural: bölüm sayfası → kendi hub'ına + kendi kardeşlerine link verir; hub → kendi bölümlerine + en fazla 5 ilgili hub'a. 40 linklik düz liste kaldırılır. Bu, otoriteyi dağıtmak yerine hub sayfalarında **yoğunlaştırır**.

#### 2.4. Ana sayfa `lastmod` eksiği (kod — 1 satır)

Sitemap'te ana sayfa girdisinde `lastmod` yok (diğer tüm URL'lerde var). Küçük ama ücretsiz bir düzeltme.

#### 2.5. Mobil Core Web Vitals yeniden ölçülmeli (kod + ölçüm)

`.claude/NEXT_SESSION.md` üç oturumdur `npm run seo:lcp` ölçümünün geçersiz olduğunu ve yeniden alınması gerektiğini not ediyor. Google için mobil performans bir sıralama faktörüdür ve bu sitede büyük veri paketleri (`javaData` ~640KB, `typescriptData`, `sqlData`, `apiTestingData` 500KB+) var. Ölçüm alınmadan burada bir sorun olup olmadığı bilinmiyor.

**Faz 2 çıkış kriteri:** GSC → Sayfalar raporunda dizine eklenen URL sayısı **1 → 100+**. Türkçe hub sitemap'inin indekslenme oranı %70'in üzerinde.

---

### FAZ 3 — Sıralama: Sorgu Hedefleme ve İçerik Boşluğu (2-6 ay, sürekli)

Faz 2 sonunda sayfalar indekste olacak ama **sıralanmayacak**. Bu faz sıralama içindir ve GSC verisi olmadan başlatılamaz.

#### 3.1. Gerçek sorguları GSC'den çıkar (aylık ritim)

Ay sonunda GSC → Performans → Sorgular → CSV indir. Aranan desen:

- **Gösterim var, tıklama yok, pozisyon 11-30** → *En değerli grup.* Google sayfayı ilgili buluyor ama 2. sayfada. Küçük içerik/başlık iyileştirmesiyle ilk sayfaya taşınabilir.
- **Gösterim var, pozisyon 30+** → İçerik konuyu yeterince karşılamıyor; ayrı bir bölüm sayfası gerekebilir.
- **Hiç gösterim almayan hedef sorgular** → O sorgu için sayfada içerik yok demektir.

Bu üç grup, sonraki ayın iş listesini **kendiliğinden** üretir. Sorgu tahmin edilmez, ölçülür.

#### 3.2. Uzun kuyruk landing sayfaları

`codexSeo.md` zaten beş aday listelemiş ama hiçbiri uygulanmamış. Faz 3'te GSC verisiyle önceliklendirilerek açılmalı:

```
/selenium-waits            /playwright-locators
/sql-joins-for-testers     /pytest-fixtures
/rest-assured-authentication
```

Ancak Faz 2'de bölüm URL yapısı (`/selenium/wait-strategies`) zaten var. **Önce mevcut bölüm sayfalarının performansı ölçülmeli;** ayrı landing sayfası açmak yerine mevcut bölüm sayfasını güçlendirmek çoğu durumda daha doğrudur. Yeni URL açmak, indeksleme sorunu çözülmeden yeni indekslenmeyecek sayfa üretmek demektir.

#### 3.3. Türkçe sorgu boşluğunu doldur (içerik)

Rapordaki 4. bölüm, Türkçe sorgularda ilk sıraları alan içeriklerin çoğunun **yüzeysel** olduğunu gösteriyor (kurs satış sayfaları, kısa Medium yazıları). Bu sitenin içerik derinliği zaten daha yüksek. Eksik olan, o derinliğin **arama niyetine göre paketlenmesi**:

| Hedef sorgu (Türkçe) | Hangi sayfa karşılıyor | Eksik olan |
|---|---|---|
| `selenium explicit wait nedir` | `/selenium` bölüm sayfası | Başlıkta sorgunun birebir geçmesi |
| `jira jql örnekleri` | `/jira` | Kopyalanabilir JQL örnek listesi |
| `pytest fixture nedir` | `/python` | (muhtemelen hazır, ölçülmeli) |
| `qa mühendisi nasıl olunur` | `/qa-mentor`, `/what-is-testing` | Kariyer odaklı giriş metni |
| `manuel test nedir` | `/manual-testing` | (muhtemelen hazır, ölçülmeli) |

Bu tablodaki "eksik olan" sütunu, GSC verisi geldikten sonra **doldurulacak**; şu an tahmindir.

#### 3.4. İngilizce tarafı bilinçli olarak beklet

İngilizce sayfalar silinmez, sitemap'te kalır, ama Faz 3'te **aktif hedefleme yapılmaz**. Gerekçe: rapordaki 3. bölüm tablosunda rakipler guru99, janbasktraining, qa.com — 10+ yıllık, binlerce backlinkli domainler. Aynı emek Türkçe tarafta 10 kat getiri sağlar. İngilizce trafik, Türkçe başarının yan ürünü olarak gelir.

**Faz 3 çıkış kriteri:** GSC'de markasız (learnqa içermeyen) sorgularda 20+ sorgu 10'dan fazla gösterim alıyor; en az 5 Türkçe uzun kuyruk sorgusunda ortalama pozisyon < 10.

---

### FAZ 4 — Kalıcılık ve Ölçüm Ritmi (sürekli)

| Ritim | İş | Süre |
|---|---|---|
| **Haftalık** | GSC → Sayfalar: dizine eklenen sayısı artıyor mu? | 5 dk |
| **Aylık** | GSC → Sorgular CSV → 3.1'deki üç grup ayrıştırılır → sonraki ayın iş listesi | 30 dk |
| **Aylık** | 1 yeni dış içerik/tanıtım (Medium/dev.to/topluluk) | 2 saat |
| **3 aylık** | Bu raporun 1-6. bölümlerindeki sorgular tekrar çalıştırılır, ilerleme karşılaştırılır | 30 dk |
| **6 aylık** | Mobil CWV yeniden ölçülür (`npm run seo:lcp`) | 15 dk |

---

## 11. Öncelik Sırası — Yarın Ne Yapılmalı

Tüm plan içinde, **etki/emek oranına göre** sıralanmış ilk 10 iş:

| Sıra | İş | Kim | Süre | Etki |
|---|---|---|---|---|
| 1 | GSC property doğrula + sitemap gönder | Kullanıcı | 30 dk | Kritik |
| 2 | GitHub repo: About + **Website alanı** + topics | Kullanıcı | 10 dk | Kritik |
| 3 | 8 kilit URL için "Dizine eklenmesini iste" (ana sayfa dahil) | Kullanıcı | 20 dk | Kritik |
| 4 | LinkedIn profiline site linki + 1 tanıtım gönderisi | Kullanıcı | 30 dk | Yüksek |
| 5 | README'ye canlı site linki + marka açıklaması | Kod | 15 dk | Yüksek |
| 6 | Bing Webmaster Tools (GSC'den içe aktar) | Kullanıcı | 10 dk | Orta |
| 7 | Plausible/GA4 kur — ölçüm başlasın | Kod + hesap | 45 dk | Yüksek |
| 8 | `Organization` şemasına `description` + `alternateName` | Kod | 20 dk | Orta |
| 9 | Hazır 3 outreach taslağını yayınla (canonical'a dikkat) | Kullanıcı | 3 saat | Yüksek |
| 10 | Sitemap'i indeks yapısına böl | Kod | 2 saat | Orta |

**Dikkat çeken nokta:** İlk 10 işin **6'sı kod işi değil, kullanıcı aksiyonu** ve toplam süresi ~5 saat. Kod tarafında yapılacak iş, bu 5 saatlik iş yapılmadan hiçbir sonuç üretmez. Bu, planın en önemli tek cümlesi.

---

## 12. Gerçekçi Beklenti Çizelgesi

| Zaman | Beklenen durum |
|---|---|
| **2 hafta** | GSC veri gösteriyor; dizine eklenen sayfa 1 → 20-50; `learnqa.dev` markası aramada görünmeye başlıyor |
| **6 hafta** | `learnqa.dev` marka sorgusunda **1. sıra**; dizine eklenen 100+; ilk markasız gösterimler (Türkçe uzun kuyruk) |
| **3 ay** | Dizine eklenen 300+; 10-20 Türkçe uzun kuyruk sorgusunda ilk 3 sayfa; ilk organik ziyaretçiler |
| **6 ay** | 5-10 Türkçe uzun kuyruk sorgusunda ilk 10; orta kuyrukta ilk 20 |
| **12 ay** | Türkçe orta kuyrukta ilk 10; ana sorgularda ("selenium eğitimi") ilk 20'ye giriş mümkün |

**Bu çizelge Faz 0 ve Faz 1'in tamamlanmasına bağlıdır.** Dış link ve marka sinyali üretilmezse site 12 ay sonra da bugünkü yerinde olur — teknik altyapı ne kadar iyi olursa olsun. Google'ın sırası değişmez: **Tara → Dizine ekle → Sırala.** Şu an 1. adımda takılıyız ve o adımın anahtarı kodda değil, sitenin dışında.

---

## 13. Bu Planın Kapsam Dışı Bıraktıkları

- **Ücretli reklam (Google Ads):** organik sıralamaya doğrudan katkısı yoktur.
- **Backlink satın alma / link ağları:** Google yaptırımı riski, kalıcı zarar.
- **İngilizce ana sorgu hedefleme:** 9. bölümde gerekçesiyle bilinçli olarak ertelendi.
- **Yeni sayfa/route açma:** indeksleme sorunu çözülmeden yeni URL üretmek, indekslenmeyecek sayfa üretmektir. Faz 2 tamamlanmadan yeni içerik sayfası açılmamalı.

---

## 14. Görev Dağılımı — Opus / Sonnet

Plan iki modele bölünüyor. Bölme ölçütü **"yanlış yapılırsa ne kadar pahalı"**:

| | Opus | Sonnet |
|---|---|---|
| **Ne yapar** | Build zinciri, üretilen dosya şeması, guard/test, geri alınması zor yapı değişiklikleri | Sayfa metni, başlık/açıklama, içerik boşluğu doldurma, tekrarlı düzenleme |
| **Neden** | Sitemap yapısı yanlış üretilirse Google haftalarca yanlış URL kümesi tarar; testler kırılırsa deploy durur | Metin yanlışsa tek dosyada geri alınır, build zincirini etkilemez |
| **Dokunduğu yer** | `scripts/`, `.github/workflows/`, `src/utils/`, `tests/` | `src/data/*Data.js`, `src/utils/seo.js` metin alanları, `Documents/outreach/` |
| **Doğrulama** | `npm run build` + ilgili Playwright paketi yeşil | `check-content-integrity` + `npm run build` |

⚠️ **Çakışma kuralı:** Opus `src/utils/seo.js`'in **yapısına** (yeni alan, filtre, üretim mantığı) dokunur; Sonnet aynı dosyanın **metin alanlarına** (`title`, `description`, `tr: {...}`) dokunur. İkisi aynı anda çalışacaksa Sonnet'e önce O1 bitirilip commit edilmelidir.

### 14.1. OPUS TARAFI — kod işleri

| Kod | İş | Dokunduğu dosyalar | Risk | Çıkış kriteri |
|---|---|---|---|---|
| **O1** | Sitemap'i indeks yapısına böl (4 alt sitemap) | `scripts/generate-seo-files.mjs`, `tests/seo-phase2-coverage.spec.ts`, `tests/seo-phase3-integrity.spec.ts` | 🔴 Yüksek — testler mevcut tek-urlset yapısını doğruluyor | `dist/sitemap.xml` geçerli bir `sitemapindex`, 4 çocuk sitemap toplamı 794 URL, ilgili testler yeşil |
| **O2** | IndexNow entegrasyonu | `scripts/ping-indexnow.mjs` (yeni), `public/<key>.txt` (yeni), `.github/workflows/deploy.yml` | 🟡 Orta | Deploy sonrası Bing IndexNow 200/202 dönüyor |
| **O3** | `Organization` şemasını zenginleştir (`description`, `alternateName`, `foundingDate`) | `src/utils/authorship.js` | 🟢 Düşük | Şema tüm shell'lerde yeni alanlarla çıkıyor, build yeşil |
| **O4** | Ana sayfa `lastmod` eksiği | `scripts/generate-seo-files.mjs` (veya `scripts/lib/lastmod.mjs`) | 🟢 Düşük | Sitemap'te `/` girdisinde `lastmod` var |
| **O5** | README marka bloğu (canlı site linki + açıklama) | `README.md` | 🟢 Düşük | README'nin ilk ekranında `https://learnqa.dev` linki var |
| **O6** | İç linklemeyi konu kümelerine çevir | `scripts/generate-static-routes.mjs`, `scripts/check-dist-seo.mjs` | 🔴 Yüksek — her shell'i etkiler, dist guard'ları link sayısı doğruluyor olabilir | Bölüm shell'i kendi hub'ına + kardeşlerine link veriyor; hub 40 değil ≤10 dış hub linki taşıyor; dist SEO guard'ı yeşil |
| **O7** | Analytics kancası (env-flag'li, hesap açılınca aktif) | `index.html` veya `src/main.jsx`, `.env` örneği | 🟡 Orta | Flag kapalıyken hiçbir istek gitmiyor, açıkken veri düşüyor |

**Opus için sıra (bağımlılık zinciri):**
`O3 → O4 → O5` (bağımsız, hızlı, düşük risk — önce bunlar commit edilir)
→ `O1` (test güncellemesi gerektirir, ayrı commit)
→ `O2` (O1'den sonra, çünkü hangi sitemap'in ping'leneceğini O1 belirler)
→ `O7` (hesap kullanıcı tarafından açılana kadar flag kapalı kalır)
→ `O6` (en riskli, ayrı commit, ayrı doğrulama turu)

### 14.2. SONNET TARAFI — içerik işleri

| Kod | İş | Dokunduğu dosyalar | Neden Sonnet | Çıkış kriteri |
|---|---|---|---|---|
| **S1** | 12 öncelikli sayfanın TR başlık/açıklamasını arama niyetine göre yeniden yaz | `src/utils/seo.js` (yalnızca `tr: {title, description}` alanları) | 12 × 2 alan, tekrarlı, mimari kararı yok | `check-seo` yeşil, TR başlıklar hedef sorguyu birebir içeriyor |
| **S2** | `/jira` sayfasına kopyalanabilir JQL örnek listesi ekle | `src/data/jiraData.js` | Saf içerik ekleme, tek sayfa | Yeni blok render oluyor, `relatedTopicId` var, build yeşil |
| **S3** | `/qa-mentor` + `/what-is-testing` sayfalarına kariyer odaklı giriş metni | `src/data/qaMentorData.js`, `src/data/whatIsTestingData.js` | Saf metin | Analoji derinlik standardı karşılanıyor, build yeşil |
| **S4** | 3 outreach taslağını yayına hazır hale getir (Türkçe versiyon + canonical notu) | `Documents/outreach/*.md` | Build'i hiç etkilemez, salt metin | Her taslağın Türkçe versiyonu ve hedef sayfa linki var |
| **S5** | 8 kilit sayfanın FAQ bloğunu hedef sorgulara göre genişlet | ilgili `src/data/*Data.js` | Tekrarlı, şablonu belli | Her sayfada ≥6 SSS, hepsi iki dilli, build yeşil |

**Sonnet için sıra:** `S1 → S4` (en yüksek getiri, en düşük risk) → `S2 → S3 → S5`.
S1 dışındaki hiçbir Sonnet işi Opus işleriyle aynı dosyaya dokunmaz — paralel koşulabilir.

### 14.3. Hiçbir modelin yapamayacağı işler (yalnızca kullanıcı)

Bunlar hesap yetkisi gerektirir, kod tarafında karşılığı yoktur:

- Google Search Console doğrulama + sitemap gönderimi + indeksleme talebi
- GitHub repo ayarları (About / Website / topics)
- LinkedIn paylaşımı
- Medium / dev.to hesabından yayın
- Bing Webmaster Tools kaydı
- Plausible/GA4 hesabı açılması (O7 kancası hazır olsa bile hesap gerekir)

---

## 15. Sonnet Promptları (kopyala-yapıştır)

> Her prompt kendi içinde bağımsızdır — Sonnet oturumunun bu belgeyi okumuş
> olmasını varsaymaz, gerekli bağlamı kendisi taşır. Her promptun sonunda
> doğrulama adımı vardır; onsuz "tamamlandı" denmemelidir.

### Prompt S1 — TR arama başlıkları

```
LearnQA.dev projesinde çalışıyorsun. Görev: `src/utils/seo.js` dosyasındaki
12 sayfanın SADECE `tr: { title, description }` alanlarını Türkçe arama
niyetine göre yeniden yaz.

Sayfalar: /selenium, /playwright, /cypress, /python, /java, /sql, /jira,
/postman, /docker, /jenkins, /manual-testing, /what-is-testing

Neden: Bu sayfalar Türkçe sorgularda hiç görünmüyor. Mevcut TR başlıklar
genel tanıtım cümleleri; kullanıcının Google'a YAZDIĞI ifadeyi içermiyorlar.

Kurallar:
1. Başlık, hedef Türkçe sorguyu BİREBİR içermeli. Örnek: kullanıcı
   "selenium nedir" yazıyorsa başlıkta "Selenium Nedir?" geçmeli.
2. Başlık 60 karakteri aşmamalı ve "| LearnQA.dev" ile bitmeli (bu zorunlu,
   build kontrolü bunu arıyor).
3. Açıklama 80-180 karakter arasında olmalı (build kontrolü bunu da arıyor).
4. Açıklama soruyu cevaplamalı, sayfayı tanıtmamalı. "Bu sayfada Selenium
   öğreneceksin" DEĞİL; "Selenium, tarayıcıyı gerçek kullanıcı gibi süren
   açık kaynaklı bir otomasyon aracıdır. Kurulum, locator ve wait
   stratejileri örneklerle." gibi.
5. Teknik terimler İngilizce kalır (locator, wait, fixture, assertion).
   Açıklama cümleleri Türkçe olur.
6. İngilizce (`title`/`description`) alanlarına DOKUNMA.
7. TR metin İngilizcenin birebir çevirisi olmak zorunda değil — Türkçe
   arama niyeti farklıysa farklı olmalı.

Doğrulama (atlanamaz):
- `node scripts/check-seo.mjs` sıfır hata
- `npm run build` hatasız
Her ikisi geçmeden "tamamladım" deme.
```

### Prompt S2 — /jira JQL örnek listesi

```
LearnQA.dev projesinde çalışıyorsun. Görev: `src/data/jiraData.js` dosyasına,
JQL sekmesine, kopyalanıp doğrudan Jira'da çalıştırılabilir bir JQL örnek
listesi ekle.

Neden: "jira jql örnekleri" araması yapan bir QA mühendisi hazır, kopyalanabilir
sorgu arıyor. Sayfada JQL anlatımı var ama toplu örnek listesi yok.

İçerik: En az 15 gerçek JQL sorgusu, her biri için ne işe yaradığı. Kapsam:
- Bana atanan açık buglar
- Bu sprint'te kapatılmayan issue'lar
- Son 7 günde reopen edilen buglar
- Belirli bir fix version'daki issue'lar
- Test edilmeyi bekleyenler (status geçişine göre)
- Etiket/component bazlı filtreler
- Tarih fonksiyonları (startOfWeek, -7d)
- ORDER BY kullanımı

Kurallar:
1. Blok tipi: `type: 'code'` (language: 'sql' değil, 'text' kullan — JQL
   Prism'de ayrı bir dil değil) VEYA mevcut sayfada JQL için zaten kullanılan
   blok tipi neyse onu kullan. Önce dosyayı oku, mevcut kalıbı taklit et.
2. Kod bloğu iki dilli olmalı: `{ tr: '...', en: '...' }`. TR versiyonunda
   yorum satırları (`#` veya `--`) TÜRKÇE olmalı.
3. JQL anahtar kelimeleri (AND, OR, ORDER BY, currentUser(), startOfWeek())
   ASLA Türkçeleştirilmez — bunlar dilin kendi sözdizimidir. Türkçeleşen
   sadece yorum/açıklama metnidir.
4. Bu bloktan sonra bir `code-playground` eklersen `relatedTopicId` alanı
   ZORUNLUDUR — yoksa build kırılır.
5. Blok, konu anlatımından SONRA gelmeli; quiz bloğundan ÖNCE.
6. Metinde plan dosyası adı, bölüm numarası (§ işareti) veya görev kodu
   GEÇMEMELİ — kullanıcı bu belgeleri okumuyor.

Doğrulama (atlanamaz):
- `node --check src/data/jiraData.js`
- `node scripts/check-content-integrity.mjs` sıfır ihlal
- `npm run build` hatasız
```

### Prompt S3 — Kariyer odaklı giriş metni

```
LearnQA.dev projesinde çalışıyorsun. Görev: `src/data/qaMentorData.js` ve
`src/data/whatIsTestingData.js` dosyalarına "QA mühendisi nasıl olunur"
sorusunu doğrudan cevaplayan bir açılış bölümü ekle.

Neden: Türkçe'de en çok aranan QA sorularından biri bu ve şu an sitede bu
soruyu doğrudan cevaplayan bir metin yok.

İçerik: Bölümün ilk bloğu `simple-box` olmalı ve şu dört katmanı taşımalı:
1. Somut analoji — mekanizması konuyla birebir örtüşen bir benzetme
   (yüzeysel "X, Y gibidir" cümlesi YETERSİZ)
2. Düşündürücü bir "neden" sorusu — cevabı hemen vermeden akıl yürütmeye zorlayan
3. Karşılaştırma — geliştirici rolüyle test mühendisi rolünün farkı
4. İş dünyası bağlamı — bu farkın gerçek bir projede neye mal olduğu

Ardından: hangi becerilerin hangi sırayla öğrenildiği, manuel testten
otomasyona geçiş, ilk işe girerken beklenen seviye.

Kurallar:
1. Tüm metin iki dilli: `{ tr: '...', en: '...' }`.
2. Türkçe metinde teknik terimler İngilizce kalır (test case, bug, regression,
   automation), açıklama cümleleri Türkçe olur.
3. Kod bloğu eklersen TR versiyonundaki yorumlar Türkçe olmalı.
4. Metinde plan dosyası adı, bölüm numarası veya görev kodu GEÇMEMELİ.
5. Mevcut bölüm sırasını bozma — yeni bölümü ekle, var olanı yeniden düzenleme.

Doğrulama (atlanamaz):
- `node --check` her iki dosya için
- `node scripts/check-content-integrity.mjs` sıfır ihlal
- `npm run build` hatasız
```

### Prompt S4 — Outreach taslaklarını yayına hazırla

```
LearnQA.dev projesinde çalışıyorsun. Görev: `Documents/outreach/` altındaki
üç taslağı (draft-selenium-wait-strategies.md, draft-sql-joins-for-testers.md,
draft-playwright-vs-selenium.md) dış platformlarda yayınlanmaya hazır hale
getir.

Bu iş HİÇBİR kod dosyasına dokunmaz, build'i etkilemez.

Her taslak için üretilecekler:
1. **Türkçe versiyon** — mevcut taslak İngilizceyse, Türkçe bir karşılığı.
   Hedef kanal Medium Türkiye ve Türkçe QA toplulukları.
2. **Kısaltılmış "teaser" versiyonu** — tam metnin yaklaşık %40'ı, sonunda
   learnqa.dev'deki ilgili sayfaya net bir link.
3. **Canonical notu** — dosyanın başına, yayınlayan kişinin uygulayacağı
   talimat: "dev.to'da yayınlarken `canonical_url` alanına şu URL girilecek:
   https://learnqa.dev/..." Bu kritik: tam metin canonical'sız yayınlanırsa
   yeni alan adı, Medium'la içerik kopyası çekişmesine girer ve kaybeder.
4. **Hedef sayfa linki** — yazının hangi learnqa.dev sayfasına trafik
   yönlendirdiği net olmalı, yazı içinde en az 2 doğal link.

Kurallar:
1. Yazılar reklam metni gibi olmamalı — gerçek bir teknik problemi çözmeli,
   link yazının doğal devamı olmalı.
2. Türkçe metinde teknik terimler İngilizce kalır.
3. Yazı içinde plan dosyası adı, bölüm numarası veya görev kodu GEÇMEMELİ —
   bunlar dışarıya yayınlanacak metinler.

Doğrulama: Kod değişikliği olmadığı için build kontrolü gerekmez; ancak
`git status --short` çıktısında YALNIZCA `Documents/outreach/` altındaki
dosyalar görünmeli.
```

### Prompt S5 — FAQ bloklarını genişlet

```
LearnQA.dev projesinde çalışıyorsun. Görev: 8 kilit sayfanın `faq` bloğunu
gerçek arama sorgularına göre genişlet.

Sayfalar: /selenium, /playwright, /python, /sql, /java, /jira, /docker,
/manual-testing

Neden: FAQ blokları arama sonuçlarında genişletilebilir cevap olarak
çıkabilir ve quiz kilidinin ARKASINDA DEĞİLDİR — yani hem kullanıcı hem
arama motoru her zaman görür. Şu an bazı sayfalarda az sayıda soru var.

Hedef: Her sayfada en az 6 soru.

Soru seçimi: Gerçekten aranan sorular olmalı. Örnek desen:
- "<araç> nedir"
- "<araç> nasıl kurulur"
- "<araç> öğrenmek ne kadar sürer"
- "<araç> mı <rakip> mi"
- "<araç> ile ilgili en sık yapılan hata"
- "<araç> mülakatında ne sorulur"

Kurallar:
1. Blok şeması: `{ items: [{ q: {tr, en}, a: {tr, en} }] }` — hem soru hem
   cevap İKİ dilli olmalı.
2. Cevaplar 2-4 cümle. Tek cümlelik cevap yetersiz; 10 cümlelik cevap FAQ
   değil, makale olur.
3. Cevapta somut bilgi olmalı — "duruma göre değişir" tarzı boş cevap yazma.
4. Türkçe cevaplarda teknik terimler İngilizce kalır.
5. Cevap içinde kod örneği varsa TR versiyonundaki yorumlar Türkçe olmalı.
6. Metinde plan dosyası adı, bölüm numarası veya görev kodu GEÇMEMELİ.
7. Mevcut soruları SİLME — üzerine ekle.

Doğrulama (atlanamaz):
- `node --check` dokunduğun her veri dosyası için
- `node scripts/check-content-integrity.mjs` sıfır ihlal
- `npm run build` hatasız
```

---

## 16. Uygulama Durumu — Opus Tarafı (2026-08-13)

Branch: `feature/seo-visibility-fixes`

| Kod | İş | Durum | Not |
|---|---|---|---|
| **O3** | `Organization` şeması zenginleştirildi | ✅ Bitti | `alternateName: 'QA Learning Platform'`, iki dilli `description`, `foundingDate: 2026-06-18`. Şema artık sayfanın diliyle aynı dilde tanım basıyor (`organizationNode(locale)`). |
| **O4** | Ana sayfa `lastmod` | ✅ Bitti | `scripts/lib/lastmod.mjs` → `EXTRA_SOURCES` tablosu. `/` artık `2026-08-11T18:01:01+03:00` taşıyor; daha önce tarihsizdi. |
| **O5** | README marka bloğu | ✅ Zaten yapılmıştı | Doğrulandı: canlı site linki ve iki dilli marka açıklaması README'nin ilk ekranında mevcut. Planın 11. bölümündeki 5. madde bu yüzden düşürüldü. |
| **O1** | Sitemap indeks yapısı | ✅ Bitti | `sitemap.xml` artık `sitemapindex`; dört çocuk (tr/en × hub/section), toplam 794 URL değişmedi. Testler yeni yapıya taşındı. |
| **O2** | IndexNow | ✅ Bitti | `scripts/ping-indexnow.mjs` + `public/<key>.txt` + deploy sonrası workflow adımı. Son 7 günde değişen URL'leri bildirir, deploy'u kırmaz. |
| **O7** | Ölçüm kancası | ✅ Bitti (kapalı) | `src/utils/analytics.js`, `VITE_PLAUSIBLE_DOMAIN` tanımlı değilse hiçbir istek gitmez. Hesap açılınca env değişkeni doldurulacak. |
| **O6** | İç linkleme kümelemesi | ⬜ YAPILMADI | Bilinçli erteleme — gerekçe aşağıda. |

### 16.1. O6 neden ertelendi

İç linklemeyi konu kümelerine çevirmek her statik shell'in alt bağlantı
bloğunu değiştirir ve şu an o bloğu doğrulayan canlı bir bekçi var
(`hub shell'i indekslenebilir bölümlerine link verir`, `hub kilitli ve
hub-kopyası bölümlere link VERMEZ`). Değişiklik doğru yapıldığında bile bu
testlerin beklentisi yeniden yazılmalı — yani hem üretimi hem bekçisini aynı
anda değiştirmek gerekiyor. Bunu diğer altı işle aynı commit'e sıkıştırmak,
bir şey bozulduğunda hangi değişikliğin bozduğunu ayırt edilemez hale
getirirdi.

Ayrıca sıra bakımından da acil değil: düz linkleme yapısı otoriteyi
*dağıtıyor*, ama şu an dağıtılacak otorite yok. Dış link gelmeden önce
kümelemenin ölçülebilir bir etkisi olmayacak.

**Koşul:** Planın 11. bölümündeki 1-4 numaralı kullanıcı adımları
tamamlandıktan sonra, ayrı bir branch'te ele alınmalı.

### 16.2. Doğrulama

- `npm run build` hatasız (47 route × 2 dil = 94 shell, 866 bölüm shell'i, dist SEO kontrolü geçti).
- İçerik bütünlüğü ve i18n sızıntı kontrolleri build zincirinde geçti.
- `tests/seo-phase2-coverage.spec.ts` + `tests/seo-phase3-integrity.spec.ts` → **37/37 geçti**.
- Sitemap sızıntı bekçisinin gerçekten kırmızıya döndüğü kanıtlandı: çocuk
  sitemap'e bilerek korumalı bir route (`/login`) enjekte edildi, test
  başarısız oldu, dosya geri alındı. (Bir bekçinin hep yeşil olması, doğru
  çalıştığı anlamına gelmez — hiçbir şeye bakmıyor da olabilir.)
- IndexNow script'i `--dry-run` ile çalıştırıldı: 7 günlük pencerede 40 URL,
  30 günlük pencerede 782 URL bildirilecek şekilde doğru filtreliyor.

### 16.3. Bu değişikliklerden SONRA kullanıcı tarafında gereken

Kod tarafı hazır ama şu üçü olmadan hiçbiri sonuç üretmez:

1. **Search Console** — alan adı doğrulaması + `sitemap.xml` gönderimi.
   Gönderildikten sonra dört alt sitemap ayrı satır olarak raporlanacak.
2. **GitHub repo ayarları** — About + Website alanı + topics. Şemadaki
   `sameAs` beyanı bu yapılmadan karşılıksız kalıyor.
3. **Plausible hesabı** — açıldığında `VITE_PLAUSIBLE_DOMAIN` değişkeni
   deploy ortamına eklenecek; kanca zaten yerinde.

Ek olarak IndexNow anahtarı yayına çıktıktan sonra
`https://learnqa.dev/bd612d5cca6f783b2753e50f59d60581.txt` adresinin 200
döndüğü tarayıcıdan kontrol edilmelidir — dönmezse bildirimler sessizce
reddedilir.
