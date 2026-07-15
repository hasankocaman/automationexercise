# Video + Animasyon + Sandbox — Site Geneli Yayılım Planı (Dalga 4+)

> **Amaç:** Pilot sayfalarda (`/git-github` 14/14, `/gauge` 8/8) tamamlanan
> "her dikey sekmede ≥1 video + ≥1 animasyon + ≥1 sandbox" standardını
> (CLAUDE.md **Bölüm 9.5**) kalan tüm içerik sayfalarına sırayla yaymak.
>
> **Kalıcı kurallar:** CLAUDE.md §9.5 (standart + film kuralları) ve §9.1/9.2
> (interaktif üçlü). **Veri şeması + film spesifikasyon formatı:**
> `Documents/video-rollout-plan.md` (Bölüm 2 ve 7.4'teki spesifikasyonlar
> örnek formattır). **Canlı ilerleme durumu bu dosyada DEĞİL,
> `.claude/NEXT_SESSION.md`'de tutulur** — bu dosya sırayı ve yöntemi tanımlar.

---

## 1. Envanter — Başlangıç Durumu (2026-07-15 tespiti)

Tespit komutu: `grep -c "type: 'video-scene'" src/data/*.js` + sekme sayımı.
Animasyon/sandbox durumu sayfa bazında dalga başlangıcında çıkarılır (kod
bloklu sekmelerde `fillMissingCodeTrios` auto-fill'i çoğunu zaten karşılar;
asıl açık genelde VİDEO tarafındadır — git-github'da da öyleydi).

| Sayfa | Veri dosyası | Sekme | Film | Not |
|---|---|---|---|---|
| /git-github | gitGithubData.js | 14 | 14 ✅ | PİLOT — TAMAM (Dalga 3) |
| /gauge | gaugeData.js | 8 | 8 ✅ | PİLOT — TAMAM (tek ağaç!) |
| /docker | dockerData.js | 14 | 2 | Dalga 1+2 filmleri var |
| /linux | linuxData.js | 10 | 1 | Dalga 2 filmi var |
| /playwright | playwrightData.js | 18 | 1 | Dalga 1 filmi var |
| /sql | sqlData.js | ? | 1 | Yapı tespiti gerekli |
| /llm-agents | llmAgentsData.js | 21 | 1 | İlk pilot film burada |
| /claude-ai | claudeAiData.js | 16 | 1 | |
| /manual-testing | manualTestingData.js | lessons | 1 | ÖZEL sayfa (`lesson.film`) |
| /algorithms | beginnerAlgorithmsData.js | lessons | 1 | ÖZEL sayfa (`lesson.film`) |
| /selenium | seleniumData.js | 14 | 0 | |
| /cypress | cypressData.js | 18 | 0 | |
| /python | pythonData.js | ~12 | 0 | Trio referans sayfası |
| /typescript | typescriptData.js | ? | 0 | ⚠️ En büyük chunk (~338KB gzip) |
| /javascript | javascriptData.js | 20 | 0 | |
| /java | javaData.js | 19 | 0 | ⚠️ Büyük chunk (~238KB gzip) |
| /jenkins | jenkinsData.js | 11 | 0 | |
| /kubernetes | kubernetesData.js | 9 | 0 | |
| /kafka | kafkaData.js | 9 | 0 | |
| /postman | postmanData.js | 8 | 0 | |
| /bruno | brunoData.js | 8 | 0 | |
| /rest-assured | restAssuredData.js | ? | 0 | |
| /jmeter | jmeterData.js | 7 | 0 | |
| /appium | appiumData.js | ? | 0 | |
| /browserstack | browserstackData.js | 8 | 0 | |
| /aws | awsData.js | 6 | 0 | |
| /azure | azureData.js | 6 | 0 | |
| /what-is-testing | whatIsTestingData.js | ? | 0 | |
| /test-frameworks | (sayfa içi) | ? | 0 | Yapı tespiti gerekli |
| /advanced-algorithms | (sayfa içi/ayrı) | ? | 0 | ÖZEL sayfa; linear-search filminin binary-search devamı (rollout-plan §2.4 köprüsü) |

**Kapsam dışı (kalıcı):** `/basit-backend`, `/security`, `/backend`
(CLAUDE.md §22.1) · `/java-document`, `/git-document` (doküman okuyucu,
sekme/blok yapısı yok) · `/qa-mentor`, `/leaderboard`, `/qa-assistant`,
`/verify-certificate`, `/login`, `/` (araç/ütilite sayfaları).

---

## 2. Dalga Sırası

Sıralama gerekçesi: (1) kısmen başlanmış sayfalar önce bitirilir (momentum +
kullanıcı deneyimi tutarlılığı), (2) çekirdek QA otomasyon araçları (SEO
misyonunun ana hedefleri) öne alınır, (3) küçük sayfalar tek dalgada
gruplanır, (4) özel yapılı ve performans riskli sayfalar bilinçli olarak
sona bırakılır.

| Dalga | Sayfa(lar) | Tahmini yeni film | Gerekçe |
|---|---|---|---|
| **4** | /linux | ~9 | Kısmen başlanmış, git-github ile aynı kalıp (EN+TR), orta boy — standardın ilk tam tekrarı |
| **5** | /docker | ~12 | Kısmen başlanmış (2 film), DevOps çekirdeği |
| **6** | /selenium | ~14 | En yüksek SEO değerli çekirdek araç |
| **7** | /playwright | ~17 | Çekirdek araç, 1 film mevcut |
| **8** | /python | ~12 | Trio referans sayfası — video katmanı eklenince tam referans olur |
| **9** | /sql | ? | İnteraktif sql.js runtime'lı; önce yapı tespiti |
| **10** | /cypress | ~18 | Çekirdek araç |
| **11** | /javascript | ~20 | W3Schools kapsamlı büyük sayfa |
| **12** | /typescript | ? | ⚠️ Chunk eşiği İZLENEREK (Bölüm 4) |
| **13** | /java | ~19 | ⚠️ Chunk eşiği İZLENEREK (Bölüm 4) |
| **14** | /postman + /bruno + /rest-assured | ~8+8+? | API test üçlüsü — küçük sayfalar, tek dalga |
| **15** | /jenkins + /kubernetes | ~11+9 | CI/CD + orkestrasyon |
| **16** | /kafka + /jmeter | ~9+7 | Mesajlaşma + performans |
| **17** | /appium + /browserstack | ~?+8 | Mobil + cloud test |
| **18** | /aws + /azure | ~6+6 | Cloud sağlayıcılar — en küçük sayfalar |
| **19** | /what-is-testing + /test-frameworks | ? | Kavramsal sayfalar |
| **20** | /manual-testing + /algorithms + /advanced-algorithms | ? | ÖZEL sayfalar (`lesson.film` kalıbı — rollout-plan §1'deki entegrasyon hazır) |
| **21** | /llm-agents + /claude-ai | ~20+15 | En yeni/en büyük sekme sayılı sayfalar; içerik hâlâ evrildiği için en sona |

**Kurallar:**
- Dalgalar SIRAYLA yapılır; bir dalga commit edilmeden sonraki başlamaz.
- Aynı veri dosyasında iki AI aracının eş zamanlı çalışması YASAK
  (promptkurallar.md) — bir dalga birden çok sayfa içeriyorsa dosyalar ayrık
  olduğu için paralel prompt mümkündür, ama tek dosyaya tek araç.
- Büyük sayfalar (sekme ≥ 14) gerekirse iki prompt'a bölünür (Dalga 3'teki
  Prompt A/B kalıbı: ilk yarı → commit → ikinci yarı + test + durum).
- Sıra ihtiyaca göre kullanıcı kararıyla değişebilir; değişiklik bu dosyaya
  işlenir, gerekçesiyle.

---

## 3. Sayfa Başına İş Akışı (her dalgada aynı 5 adım)

1. **Yapı tespiti:** Veri dosyası EN+TR ayrı ağaç mı, tek ağaç mı
   (`grep -cE "^  (en|tr): \{" <dosya>`)? TopicPage mi özel sayfa mı? Sekme
   listesi + sekme başına mevcut video/animasyon/sandbox matrisi çıkarılır
   (rollout-plan §7.2'deki tablo formatında). Matris `NEXT_SESSION.md`'ye
   yazılır.
2. **Film spesifikasyonu (kod YAZMADAN önce):** Sekme başına 1 film;
   her film o sekmenin GERÇEK ana konu anlatımına bağlanır (kod
   bloğu/simulation'ın mekanizması). Format: rollout-plan §7.4 kalıbı —
   id, xp (10-15), aktör listesi, 5-8 sahnelik akış (bir "kontrast/hayalet"
   sahnesi önerilir), yerleşim noktası. `Documents/video-rollout-plan.md`
   Bölüm 6'daki aday konular başlangıç fikridir.
3. **Veri ekleme:** Film sabitleri dosyanın BAŞINA; EN+TR ayrı ağaçsa iki
   section'a da AYNI referans, tek ağaçsa tek yere. Yerleşim: ana konu
   anlatımının ardı, quiz/challenge öncesi (CLAUDE.md §9.1).
4. **Eksik animasyon/sandbox tamamlama:** Auto-fill kapsamı dışında kalan
   (kodsuz) sekmelere elle `step-animation` + `code-playground`
   (`relatedTopicId` ZORUNLU, CLAUDE.md §9.4). Mülakat sekmesindeki bloklar
   gating kilidi arkasında kalır — beklenen davranış.
5. **Doğrulama + durum:** CLAUDE.md §1.1 checklist (integrity → TR tarama →
   build → runtime smoke) + `tests/video-scene.spec.ts`'e o sayfa için
   temsili render testi (+ `--workers=1` koşumu) + build çıktısındaki ilgili
   chunk boyutu notu + `NEXT_SESSION.md` güncellemesi. Doğrulanmadan
   "tamamlandı" denmez.

---

## 4. Performans Eşiği (typescript/java gibi büyük dosyalar için)

Referans: gitGithubData 14 filmle ~477KB min / ~148KB gzip oldu (film başına
kabaca +1.7KB gzip). Kural:

- Bir veri dosyasının **gzip boyutu 350KB'ı aşıyorsa veya aşacaksa**
  (bugün: `typescriptData` ~338KB), o dalgada filmler eklenmeden ÖNCE durum
  kullanıcıya raporlanır ve mimari karar istenir (seçenekler: filmleri ayrı
  lazy chunk'a almak, sekme başına film sayısını düşürmek, olduğu gibi devam).
- Her dalga sonunda ilgili chunk'ın yeni boyutu `NEXT_SESSION.md`'ye not
  edilir — trend görünür kalır.

---

## 5. Parametrik Sonnet Prompt Şablonu (kopyala-doldur)

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Önce CLAUDE.md'yi (özellikle Bölüm 9.5) ve .claude/NEXT_SESSION.md'yi oku.
Sonra Documents/video-sitewide-plan.md'yi (bu görev Dalga <N>) ve
Documents/video-rollout-plan.md'deki film kalıbını oku. Veri şemasının tek
doğru referansı: src/components/VideoSceneBlock.jsx + gitGithubData.js'teki
mevcut film sabitleri.

## GÖREV — /<sayfa> sayfasını Bölüm 9.5 standardına yükselt
(SADECE src/data/<dosya>Data.js'e veri ekle; bileşene DOKUNMA):
1. Yapı tespiti yap (EN+TR ayrı mı tek ağaç mı) ve sekme başına
   video/animasyon/sandbox matrisini çıkar.
2. Film OLMAYAN her sekme için spesifikasyon yaz (id, xp, aktörler,
   5-8 sahne, yerleşim) — sekmenin GERÇEK içeriğine bağla, uydurma.
3. Filmleri ekle: sabitler dosya başında; <EN+TR iki ağaca aynı referans /
   tek ağaçta tek yere>; yerleşim konu anlatımı ardı + quiz öncesi.
4. Eksik animasyon/sandbox varsa elle tamamla (relatedTopicId zorunlu).
5. tests/video-scene.spec.ts'e /<sayfa> için temsili render testi ekle
   (mülakat sekmesini kullanma — quiz-gating kilitli).

## BİTİRMEDEN ÖNCE (CLAUDE.md §1.1 — atlanamaz):
1. node scripts/check-content-integrity.mjs → sıfır ihlal
2. Her filmin TR caption/code'unu tek tek oku — İngilizce açıklama kalmasın
3. npm run build → hatasız (+ <dosya> chunk boyutunu not et)
4. npx playwright test tests/video-scene.spec.ts --workers=1 → geçiyor
Doğrulanmadan "tamamlandı" deme. NEXT_SESSION.md'ye durum tablosu +
chunk notu düş.
```

---

## 6. Dalga Kontrol Listesi (her dalga bitiminde)

```
[ ] Sekme matrisi çıkarıldı ve NEXT_SESSION'a yazıldı
[ ] Film olmayan her sekmeye 1 film eklendi (spesifikasyon → veri sırasıyla)
[ ] Eksik animasyon/sandbox tamamlandı (relatedTopicId'li)
[ ] check-content-integrity + TR taraması + npm run build temiz
[ ] tests/video-scene.spec.ts genişletildi ve --workers=1 ile geçiyor
[ ] Chunk boyutu notu + NEXT_SESSION durum tablosu güncellendi
[ ] Commit atıldı (kullanıcı onayıyla) — sonraki dalga ancak bundan sonra
```
