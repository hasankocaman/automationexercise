# Kişisel QA Kariyer Haritası — Kapsamlı Ürün Özelliği Planı (v2)

> **Durum:** Planlama dokümanı — kod değişikliği içermez.
> **Kapsam:** Ana sayfadaki "Yeni misin? Kişisel QA Kariyer Haritanı Oluştur" kutusu + `/qa-mentor` sayfasının uçtan uca ürünleştirilmesi.
> **Önemli bağlam:** Bu özellik sıfırdan tasarlanmıyor. v1 zaten canlıda:
> sohbet tarzı sihirbaz (`QAMentorPage.jsx`), 5 şablon harita (`qaMentorData.js` — MAP_A, MAP_B, MAP_B_SEL, MAP_C1, MAP_C2),
> üye kullanıcı için ilerleme yüzdesi (`getCompletedRoutePaths`), sertifika (`claimCertificate` + `/verify-certificate/:id`) ve PDF yazdırma.
> Bu doküman v1'in eksiklerini kapatan ve özelliği "sevimli bir sihirbaz"dan "kullanıcıyı aylarca tutan bir ürün omurgasına" dönüştüren planı tanımlar.

---

## 1. Amaç ve Hedefler

### 1.1 Kullanıcı için değer

Hedef kitlemiz (yeni başlayan / junior / otomasyona geçen, çoğunlukla Türk kullanıcı) sitede 30'dan fazla teknoloji sayfasıyla karşılaşıyor. Bu kitlenin en büyük problemi bilgi eksikliği değil, **karar felci ve sıralama belirsizliğidir**: "Java mı Python mu? Önce Selenium mu API mi? Linux gerekli mi?" Bu sorulara yanlış cevap veren kullanıcı ya yanlış sırayla ilerleyip takılır ya da hiç başlayamaz.

Kariyer Haritası özelliğinin kullanıcıya vaadi üç cümledir:

1. **"Sana ne öğrenmen gerektiğini değil, hangi sırayla öğrenmen gerektiğini söylüyorum"** — karar yükünü kaldırır.
2. **"Ne kadar süreceğini biliyorsun"** — belirsizlik kaygısını kaldırır (v2'nin ana yeniliği).
3. **"Nerede olduğunu her gün görüyorsun"** — motivasyonu görünür ilerlemeyle besler.

### 1.2 İş hedefleri (LearnQA.dev için)

| Hedef | Mekanizma |
|-------|-----------|
| **Aktivasyon:** İlk ziyaretçiyi "ilk ders tamamlayan" kullanıcıya çevirmek | Harita, ana sayfadaki 30 kartlık seçim paralizini tek bir "buradan başla" butonuna indirger. |
| **Retention:** Kullanıcının haftalarca geri gelmesi | Harita = kalıcı kişisel pano. "Kaldığın yer: Selenium %40" her dönüşte ilk görülen şey olur. |
| **Üyelik funnel'ı:** Anonim → üye dönüşümü | Harita anonim çalışır (bkz. §5.4); senkronizasyon + sertifika üyelikle gelir → doğal, zorlamasız upgrade nedeni. |
| **SEO/paylaşım:** Organik yayılım | "QA kariyer yol haritası" Türkçe aramada zayıf rekabetli, yüksek niyetli bir sorgu. Paylaşılabilir harita görseli (Faz 2) sosyal yayılım sağlar. |
| **İçerik yatırımının geri dönüşü** | Mevcut 30+ sayfanın her biri haritada bir düğüm — harita, içerik kataloğunun satış vitrinidir. |

---

## 2. Kullanıcı Akışı (User Flow)

### 2.1 Genel akış şeması

```
Ana sayfa kutusu ─► /qa-mentor
                     │
        ┌────────────┴─────────────┐
        │ İlk ziyaret              │ Tekrar ziyaret (localStorage'da harita var)
        ▼                          ▼
   Karşılama + sihirbaz       Doğrudan HARİTA görünümü
   (sohbet balonları, v1       ("Kaldığın yer: ..." + devam butonu;
    kalıbı korunur)             "Haritamı yeniden oluştur" linki köşede)
        │
        ▼
   S1 → S2 → S3 → S4 (aşağıda)
        │
        ▼
   "Haritan hazırlanıyor..." mikro-animasyonu (1-2 sn, algılanan değer)
        │
        ▼
   HARİTA görünümü: başlık + tahmini süre + düğüm zinciri
   + mentor notu + "İlk dersine başla →" tek büyük CTA
```

**Kural (v1'den farklı):** v1'de her ziyarette sihirbaz baştan başlıyor. v2'de cevaplar `localStorage`'a yazılır; dönen kullanıcı sihirbazı değil **haritasını** görür. Sihirbaz "işe alım görüşmesi"dir, bir kez yapılır; harita "çalışma masası"dır, her gün görülür.

### 2.2 Soru seti (v2 — 4 soru)

v1'in 2-4 soruluk ikili ağacı korunur ama iki kritik boyut eklenir: **seviye artık 3 kademeli** ve **haftalık zaman** sorulur. Sohbet balonu + tıklanabilir seçenek kalıbı (tek seçim) aynen devam eder — açık uçlu soru YOK (yeni başlayan kullanıcıyı yazı yazmaya zorlamak terk oranını artırır; tüm sorular tek dokunuşla cevaplanır).

**S1 — Deneyim seviyesi** (tek seçim, 3 seçenek — v1'deki ikili sorunun genişletilmişi)

> "Şu anki durumunu en iyi hangisi anlatıyor?"
- 🌱 **"Tamamen sıfırım"** — yazılım/test geçmişim yok.
- 🧪 **"Manuel test yapıyorum / az kod biliyorum"** — otomasyona geçmek istiyorum. *(YENİ persona — Türkiye'de en kalabalık segment)*
- 💻 **"Kod yazabiliyorum"** — QA otomasyonunu sistemli öğrenmek istiyorum.

**S2 — Dil/stack tercihi** (tek seçim; S1'e göre koşullu)

> "Otomasyon dilin ne olsun?"
- ☕ Java — kurumsal klasik *(Türkiye'de banka/telekom ilanlarının çoğunluğu)*
- 🐍 Python — hızlı ve okunaklı başlangıç
- 🟦 TypeScript — tip güvenli modern stack
- 🤷 **"Kararsızım — sen öner"** *(YENİ: karar felcindeki kullanıcıyı kaybetmemek için mentor 1 paragraf gerekçeyle öneri yapar; S1=sıfır ise öneri Java'dır — mevcut MAP_A gerekçesiyle)*

*(Revizyon 2026-07-19 — ürün kararı: eski "Python / TypeScript" birleşik seçeneği ikiye bölündü. Kullanıcı TEK modern dil seçer; seçilmeyen dil ana yola girmez, haritanın "Ekstra Gelişim Dalları"na "ikinci dil — kariyer +1" olarak taşınır. Gerekçe: birleşik seçenek ~105 saatlik çifte dil yükünü daha ilk otomasyon aracından önce dayatıyordu. Cevap onay balonları araç-nötrdür — S3 sorulmadan Selenium/Playwright adı anılmaz. Eski profillerdeki `lang:'modern'` değeri iki dilli haritasını korur.)*

S1 = "Tamamen sıfırım" ise bu soru v1'deki gibi atlanmaz; "Kararsızım" default vurgulu gösterilir.

**S3 — UI otomasyon aracı** (tek seçim — v1'deki step3/stepBSelenium birleşimi, aynen korunur)

> "UI otomasyonda hangi araçla ilerleyelim?"
- 🔵 Selenium — sektörün klasiği
- 🎭 Playwright — modern ve hızlı
- 🏆 İkisi de — geniş iş havuzu *(v1'deki B_SEL_YES akışının açık seçeneğe dönüşmüş hali)*

Playwright/Cypress karşılaştırma balonu (v1'de var) korunur — kullanıcıya "neden Cypress ana yolda değil" gerekçesi gösterilmeye devam eder.

**S4 — Haftalık zaman** (tek seçim — YENİ, süre tahmininin girdisi)

> "Haftada kaç saat ayırabilirsin? (Dürüst ol — haritanın süre tahmini buna göre hesaplanacak 😊)"
- 🐢 3-5 saat — işin/okulun yanında
- 🚶 6-10 saat — düzenli tempo
- 🏃 10+ saat — tam odak / kariyer değişimi modu

**Sorulmayanlar ve nedenleri:** "Öğrenme stili" (görsel/işitsel vb.) sorulmaz — platformun tüm içeriği zaten görsel+interaktif standartta (CLAUDE.md §9.1), stil sorusu ayrıştırıcı bir aksiyon üretmez ve bilimsel dayanağı zayıftır. "Hedef alan" (mobil/performans/güvenlik) MVP'de sorulmaz — mevcut 5 şablonun kombinasyon sayısını patlatır; Faz 2'de "uzmanlık dalı" olarak haritanın SONUNA eklenir (bkz. §8).

### 2.3 Sihirbaz sonrası ekran

Sıralamayla ne gösterileceği (yukarıdan aşağı):

1. **Harita başlığı + alt başlık** (mevcut) + **YENİ: tahmini süre rozeti** — "📅 Senin temponla: ~7 ay (haftada 6-10 saat)".
2. **Tek büyük CTA:** "🚀 İlk dersine başla: Test Temelleri →" — v1'de bu yok; kullanıcı 14 düğümlü haritaya bakıp "peki şimdi ne yapayım" diye kalıyor. Her zaman **tek bir sonraki adım** vurgulanır.
3. **Düğüm zinciri** (mevcut dikey/akış görünüm) — her düğümde YENİ: tahmini süre etiketi ("~3 hafta") ve durum ikonu (✅ bitti / 🔵 sırada / 🔒 ileride — kilit görsel bir öneridir, tıklamayı engellemez; bkz. §7 risk 4).
4. **Milestone şeridi** (YENİ, Faz 2): "🏁 İlk otomasyon kodunu yazdın", "🏁 İlk API testini koştun" gibi 4-5 ara bayrak.
5. **Mentor notu** (mevcut — kalite barı yüksek, korunur).
6. **Ekstra dallar** (mevcut "Kariyer +1" bölümü, korunur).
7. **Aksiyon satırı:** Yazdır/PDF (mevcut) + "Haritamı paylaş" (Faz 2) + "Baştan başla" (mevcut, ama artık ikincil/küçük — çünkü ana senaryo devam etmek).

---

## 3. Kişiselleştirme Mantığı

### 3.1 Girdi → çıktı matrisi

| Girdi | Neyi değiştirir |
|-------|-----------------|
| S1 Deneyim seviyesi | **Harita ön eki:** Sıfır → Test Temelleri + Algoritma + Manuel Test blokları başa eklenir (mevcut MAP_A davranışı). Manuel testçi → Test Temelleri VE Manuel Test haritaya hiç eklenmez, yalnız "Algoritma (hızlı tempo)" ön eki gelir — **dersler kişinin seviyesine göre gösterilir, bildiği ders haritada yer almaz** (ürün kararı 2026-07-19; ilk plandaki "gözden geçir rozetiyle göster" yaklaşımı iptal edildi). Kod bilen → doğrudan dilden başlar (mevcut MAP_B/C davranışı). |
| S2 Dil | **Ana omurga:** Java → REST Assured dahil Java hattı. Python → pytest hattı, TypeScript ekstra dala; TypeScript → Playwright TS hattı, Python ekstra dala (tek-dil kararı 2026-07-19; şablon MAP_B/MAP_B_SEL aynı kalır, seçilmeyen dil düğümü parametrik katmanda çıkarılır). |
| S3 UI aracı | Selenium / Playwright / ikisi düğümleri (mevcut MAP_C1/C2/B_SEL ayrımı). **Tek-araç ilkesi (2026-07-19):** kullanıcı "ikisi de" DEMEDİKÇE ana yolda tek UI aracı bulunur — modern yolda yalnız Selenium seçilirse Playwright ana yoldan çıkarılıp "ikinci UI aracı — kariyer +1" ekstrasına taşınır. "İkisi de" bilinçli seçiminde araçlar sıralıdır: önce Selenium, hemen ardından Playwright. |
| S4 Haftalık zaman | **Hiçbir düğümü değiştirmez** — yalnızca süre etiketlerini ve toplam tahmini hesaplar. Zaman azsa içerik kısılmaz; süre uzar. ("Az zamanın var, o zaman az öğren" mesajı verilmez — "yavaş ama tam" mesajı verilir.) |

**Mimari ilke:** Kişiselleştirme = **şablon (5 mevcut harita) + parametrik katman (ön ek bloğu, süre etiketleri, durum işaretleri)**. Tam dinamik harita üretimi YAPILMAZ (bkz. §5.2).

### 3.2 Persona örnekleri

**Persona 1 — "Zeynep, 24, İngilizce öğretmeni, kariyer değişimi" (tamamen sıfır)**
- Cevaplar: Sıfırım / Kararsızım (→ Java önerilir) / Selenium / haftada 10+ saat.
- Harita: MAP_A (14 düğüm, Test Temelleri → ... → Kubernetes).
- Süre tahmini: ~%80 tamamlanma hedefiyle ~6-7 ay ("tam odak modu" etiketi).
- İlk CTA: "Test Temelleri → Yazılım testi nedir?"
- Mentor notu vurgusu: "Sıfırdan başlamak dezavantaj değil — bu sıra kanıtlanmış yol" (mevcut MAP_A notu birebir uyuyor).

**Persona 2 — "Murat, 29, 3 yıllık manuel testçi, otomasyona geçiyor" (az bilen — YENİ persona)**
- Cevaplar: Manuel test yapıyorum / Java / İkisi de / haftada 6-10 saat.
- Harita: MAP_C1 tabanı + başa "Algoritma (hızlı tempo)" ön eki; Manuel Test düğümü haritada YER ALMAZ — Murat zaten manuel test biliyor (ürün kararı 2026-07-19).
- Süre tahmini: ~5 ay.
- İlk CTA: "Java → Kurulum".
- Mentor notu vurgusu: "Manuel test deneyimin otomasyonda en büyük avantajın — test senaryosu düşünmeyi zaten biliyorsun, şimdi onu koda çevireceğiz."

**Persona 3 — "Deniz, 26, backend'den QA'e geçen developer" (orta seviye)**
- Cevaplar: Kod yazabiliyorum / Python / Playwright / haftada 3-5 saat.
- Harita: MAP_B tabanı, TypeScript düğümü çıkarılmış hali (9 düğüm; TypeScript "Ekstra Gelişim Dalları"nda).
- Süre tahmini: ~6 ay ("yavaş tempo ama eksiksiz kapsam" etiketi).
- İlk CTA: "Python → pytest".
- Mentor notu vurgusu: mevcut MAP_B notu (modern stack gerekçesi).

---

## 4. Çıktı / Deliverable Tasarımı

### 4.1 Görsel format

Mevcut dikey düğüm zinciri (renkli kart + emoji + glow) korunur — mobilde iyi çalışıyor ve yazdırılabilir. Üzerine üç görsel katman eklenir:

1. **İlerleme omurgası:** Düğümleri birbirine bağlayan dikey çizgi, tamamlanan kısımda dolu renkli (gradient), kalan kısımda soluk/kesikli. Kullanıcı sayfayı açar açmaz "ne kadar yol aldım"ı metin okumadan görür. CSS-only, inline SVG — dış görsel yok (CLAUDE.md §8).
2. **Düğüm durumu:** ✅ tamamlandı (yeşil halka + konfeti mikro-animasyonu ilk görüşte) · 🔵 sıradaki (nabız/pulse animasyonu — gözü doğal olarak sonraki adıma çeker) · soluk = ileride.
3. **Süre etiketi:** Her düğümün köşesinde "~3 hafta" chip'i; başlık altında toplam: "📅 ~7 ay · %35'i bitti · bu tempoda bitiş: Kasım 2026" (bitiş ayı tahmini güçlü bir motivasyon çapasıdır).

### 4.2 Modül önerileri ve süre verisi

Önerilen dersler = mevcut route kataloğu (değişiklik yok; harita düğümleri zaten `/selenium`, `/python` vb. rotalara gidiyor). YENİ olan, her düğüme veri olarak eklenen tahmini efor:

```js
// qaMentorData.js düğüm şemasına eklenecek alan (örnek değerler)
estimatedHours: 25,   // ortalama tamamlama eforu (quiz + pratikler dahil)
```

Süre hesabı: `toplamHafta = Σ(estimatedHours) / haftalıkSaat(S4)`. İlk değerler eldeki en iyi tahminle girilir (sekme sayısı × ortalama sekme süresi), Faz 3'te gerçek kullanıcı verisiyle kalibre edilir (bkz. §9).

### 4.3 Milestone'lar ve rozetler

Mevcut rozet sistemine (ders bitirme %80 rozeti, `claimCertificate`) dokunulmaz; harita bunların ÜZERİNE yol-seviyesi milestone'lar ekler:

| Milestone | Tetik | Neden bu |
|-----------|-------|----------|
| 🏁 "İlk adım" | Haritadaki ilk dersin ilk quizi çözüldü | En kritik an: ilk 24 saatte bir başarı hissi. |
| 🏁 "Kod yazan testçi" | Dil modülü (Java/Python/TS) tamamlandı | Kimlik dönüşümü anı — "artık kod yazıyorum". |
| 🏁 "Otomasyoncu" | Selenium veya Playwright tamamlandı | CV'ye yazılabilir ilk somut beceri. |
| 🏁 "Full-stack tester" | API modülü (Postman/REST Assured) + SQL tamamlandı | UI+API+DB üçlüsü kapandı. |
| 🏆 "SDET yolu tamam" | Ana yol düğümlerinin %80'i bitti | Mevcut sertifika mekanizmasına bağlanır. |

Milestone'lar haritada bayrak olarak görünür; kazanıldığında konfeti (CLAUDE.md §20 standardı — kutlama efektleri zaten proje vizyonu).

### 4.4 İlerleme takibi

- **Kaynak:** Mevcut ders tamamlama verisi (`getCompletedRoutePaths` üyede; anonim kullanıcıda localStorage progress — bkz. §5.4). Harita kendi ilerleme verisi TUTMAZ; ders sayfalarının zaten ürettiği veriyi okur. Tek doğruluk kaynağı ilkesi.
- **Görünürlük:** (a) Haritada omurga + yüzde; (b) ana sayfa kutusunda "Kaldığın yer: Selenium — %40" (bkz. §6.1); (c) her ders sayfasının başında küçük "🗺️ Haritanda 6/14. adımdasın" breadcrumb'ı (Faz 2 — dersten haritaya dönüş köprüsü).

---

## 5. Teknik ve İçerik Gereksinimleri

### 5.1 Kullanılacak mevcut varlıklar (yeniden yazılmaz)

| Varlık | Rolü |
|--------|------|
| `qaMentorData.js` (5 şablon harita, DIALOG metinleri) | Temel veri — şemaya `estimatedHours`, `milestones`, ön ek blokları eklenir. |
| `QAMentorPage.jsx` (sohbet sihirbazı + MindMapView) | UI iskeleti — soru seti ve harita görünümü genişletilir, kalıp korunur. |
| `AuthContext` (`setCareerGoal`, `getCompletedRoutePaths`, `claimCertificate`) | Üye senkronizasyonu + sertifika (mevcut). |
| Ders sayfalarındaki quiz/progress localStorage verisi | Anonim ilerleme kaynağı. |
| `HomePage.jsx` CTA kutusu | Giriş noktası — durumsal hale getirilir (§6.1). |
| SEO altyapısı (`seo.js`, static shell) | `/qa-mentor` zaten route'lu; metadata "QA kariyer yol haritası" sorgusuna göre güncellenir. |

### 5.2 Dinamik mi, şablon tabanlı mı? → **Şablon + parametrik katman**

Karar ve gerekçesi:

- **Tam dinamik (kural motoru/AI ile düğüm listesi üretmek) YAPILMAZ.** Nedenleri: (a) pedagojik sıra uzmanlık işidir — mentor notlarındaki gerekçeler ("Linux, Docker'dan önce gelir çünkü...") elle yazılmış küratörlük ürünü, otomatik üretimde bu kalite korunamaz; (b) 5 şablon zaten hedef kitlenin gerçek yol ayrımlarını kapsıyor; (c) test edilebilirlik — 5 şablon + 3 ön ek varyantı deterministik olarak test edilir, dinamik üretim edilemez.
- **Parametrik katman:** Seviye ön eki, süre etiketleri, durum işaretleri, milestone'lar şablonun üzerine çalışma zamanında bindirilir. Böylece kombinasyon patlaması olmadan kişiselleşme derinleşir.
- **Faz 3'te AI katmanı** şablonu ÜRETMEZ, şablon üstünde KONUŞUR (check-in mesajları, takılma tespiti — bkz. §8).

### 5.3 Veri şeması genişletmesi (öneri)

```js
// Düğüm şemasına eklenen alanlar:
{
    // ...mevcut alanlar (id, emoji, title, desc, route, color, glow, isMain)
    estimatedHours: 25,                       // süre hesabı için
    milestone: { tr: '...', en: '...' },      // bu düğüm bitince açılan bayrak (opsiyonel)
    skipIfLevel: ['manual'],                  // seviye ön-eki mantığı: bu seviyede "biliyorsun" durumuyla başlar
}

// Cevapların kalıcılığı (localStorage):
// key: 'qaMentorProfile'
// value: { version: 2, answers: {level, lang, uiTool, weeklyHours}, mapId, createdAt }
```

`version` alanı zorunlu: soru seti değişirse eski profil migrate edilir veya sihirbaz yeniden istenir — sessiz bozulma olmaz.

### 5.4 Anonim/local-first zorunluluğu

CLAUDE.md §5 gereği progress/rozet üyelik istemez. v1'de harita ilerlemesi `session` şartına bağlı — **bu bir uyumsuzluk ve v2'nin düzeltmesi gereken ilk şeydir.** v2: anonim kullanıcının ders tamamlama verisi localStorage'dan okunarak yüzde hesaplanır; üye olunca Supabase senkronu devreye girer (mevcut davranış). Sertifika üyelikte kalır (doğrulanabilir kimlik gerektirdiği için — bu, üyeliğe geçiş için doğru teşvik noktasıdır).

### 5.5 Genişletilebilirlik

- **Yeni ders sayfası eklenince:** İlgili şablonların `extras` listesine tek obje eklemek yeterli (mevcut kalıp). Ana yola girmesi gerekiyorsa şablonda tek yerde güncellenir.
- **Yeni yol ayrımı (örn. mobil uzmanlığı):** Yeni şablon DEĞİL, mevcut şablonun sonuna eklenen "uzmanlık dalı" paketi olarak modellenir (Faz 2) — şablon sayısı 5'te sabit kalır.
- **i18n:** Tüm yeni metinler `{tr, en}` bilingual (mevcut DIALOG kalıbı). TR metinlerde teknik terimler İngilizce kalır (CLAUDE.md §8).
- **Test:** Sihirbaz akışı + harita render + anonim progress Playwright suite'ine eklenir (CLAUDE.md §22 buton tıklanabilirlik kapsamına `/qa-mentor` dahil edilir).

---

## 6. UX/UI Önerileri

### 6.1 Ana sayfa kutusu — durumsal (stateful) hale getirilmesi

Kutu şu an herkese aynı. v2'de üç durumu olur:

| Durum | Kutu içeriği |
|-------|--------------|
| Harita yok | Mevcut metin + **sosyal kanıt** eklenir: "🗺️ 3 kısa soru · ~1 dakika · binlerce kullanıcı haritasını oluşturdu" ("3 soru"nun yanına "~1 dakika" eklemek tıklama eşiğini düşürür). |
| Harita var, ilerleme var | "🗺️ Haritan seni bekliyor — Kaldığın yer: **Selenium (%40)** · Devam et →" + mini progress bar. Kutu artık bir onboarding daveti değil, **kişisel pano girişi**. |
| Harita %100 | "🏆 Ana yolu bitirdin! Ekstra dallar: Appium, JMeter... →" |

### 6.2 Sihirbaz UX detayları

- Sohbet balonu + typing göstergesi (mevcut) korunur — kişilik veriyor.
- Her cevaptan sonra mentorun **1 cümlelik onayı** ("Harika, manuel test deneyimi büyük avantaj! 💪") — cevabın kaybolmadığı, dinlenildiği hissi.
- Üstte adım göstergesi "2/4" (mevcut progress indicator genişletilir) — bitişin yakın olduğu görünür olmalı.
- Geri düğmesi: yanlış cevap verdiğini fark eden kullanıcı baştan başlamak zorunda kalmamalı (v1'de yalnızca "Baştan Başla" var).
- "Haritan hazırlanıyor... ✨" 1.5 sn'lik bekleme animasyonu — anında beliren sonuç "şablonmuş" hissi verir; kısa bekleme kişiselleştirme algısını güçlendirir (gerçek bir hesaplama da yapılıyor: süre tahmini).

### 6.3 Mobil

- Sihirbaz zaten dikey sohbet — mobilde doğal. Seçenek butonları min 44px yükseklik (WCAG 2.5.5 / CLAUDE.md §12).
- Harita düğümleri tek kolon dikey zincir (mevcut); süre chip'leri kart içinde satır kaydırmadan sığmalı (`text-xs`, `whitespace-nowrap` yok — taşma yerine sarma).
- Yazdır/PDF mobilde ikincil; birincil aksiyon her zaman "Derse devam et".

### 6.4 Motivasyon unsurları

- **Renk dili:** tamamlanan = yeşil/parlak, sıradaki = marka gradient'i (indigo→mor) + pulse, gelecek = soluk. Kırmızı/uyarı rengi haritada HİÇ kullanılmaz — harita asla suçlamaz.
- **Konfeti:** düğüm tamamlama + milestone anlarında (mevcut proje standardı, §20).
- **Streak entegrasyonu:** mevcut XP/streak sistemi (leaderboard) haritaya bağlanır — "🔥 5 gün üst üste çalıştın" haritanın üstünde görünür (Faz 2).
- **Dil tonu:** "Ders 6/14" değil "6 bitti, sıradaki: Selenium 🚀". Eksik değil, birikim vurgulanır. Türkçe samimi "sen" dili (mevcut mentor tonu doğru, korunur).

---

## 7. Potansiyel Riskler ve Çözümleri

| # | Risk | Çözüm |
|---|------|-------|
| 1 | **Harita çok genel kalır** — "zaten bu sırayı roadmap.sh'ta da görürüm" hissi | Farklılaştırıcı harita değil, **haritanın canlı olmasıdır**: gerçek ilerlemeyle dolan omurga, kişiye özel süre/bitiş tarihi, her düğümün sitedeki interaktif derse gitmesi. Mentor notlarındaki "neden bu sıra" gerekçeleri (v1'de zaten güçlü) korunur ve her düğüme yayılır. |
| 2 | **Süre tahmini yanlış çıkar** — kullanıcı geride kalınca moral bozulur | Tahminler aralık olarak verilir ("6-8 ay") ve "senin temponla güncellenir" denir. Geride kalan kullanıcıya asla "geridesin" denmez; tempo düşükse tahmin sessizce uzatılır ve mesaj "yavaş ama ilerliyorsun" olur. Faz 3'te gerçek veriyle kalibrasyon. |
| 3 | **Sihirbaz terk edilir** | 4 soru × tek dokunuş = ~30-45 sn. Her adımda ilerleme göstergesi. Yarıda kalan cevaplar localStorage'a yazılır; dönüşte kaldığı sorudan devam. |
| 4 | **14 düğümlü harita sıfır kullanıcıyı ezer** ("bunların hepsini mi öğreneceğim?!") | (a) Tek CTA ilkesi — ekranın odağı hep bir sonraki tek adım; (b) ilk 3 düğüm "Temel Kamp 🏕️" gibi yakın hedefli bir alt grup olarak çerçevelenir; (c) süre etiketi belirsizliği somutlaştırır ("Kubernetes'e daha çok var, şimdi derdin değil"). Kilit görseli kullanılır ama tıklama ENGELLENMEZ — meraklı kullanıcı ileriye bakabilmeli. |
| 5 | **Kullanıcı yanlış yolu seçer** (Java seçti, pişman) | "Haritamı yeniden oluştur" her zaman erişilebilir; yeniden oluşturmada ders ilerlemesi KAYBOLMAZ (progress route bazlı tutulduğu için ortak dersler otomatik tamamlanmış görünür — bu teknik gerçek, UX'te açıkça söylenir: "İlerlemen güvende"). |
| 6 | **v1→v2 geçişinde mevcut kullanıcı profilleri** | `qaMentorProfile.version` alanı; v1 kullanıcısının kayıtlı hedefi (`setCareerGoal`) varsa harita korunur, yalnızca S4 (zaman) sorusu tek soruluk mini-sihirbazla tamamlatılır. |
| 7 | **Anonim ilerleme cihazda kalır, kullanıcı cihaz değiştirir** | Harita altında zorlamasız bir kanca: "☁️ İlerlemeni kaybetme — ücretsiz üye ol, her cihazda devam et". Üyelik funnel'ının doğal noktası. |
| 8 | **Ölçüm altyapısı yok** — başarı kriterleri ölçülemez | MVP kapsamına minimal event kaydı dahil edilir (bkz. §9) — analytics olmadan çıkan özellik "hissiyatla" yönetilir. |

---

## 8. Roadmap: MVP → Faz 2 → Faz 3

### MVP (v1 → v2 çekirdek — tahmini 1-2 hafta efor)

Amaç: mevcut özelliği "her ziyarette sıfırlanan demo"dan "kalıcı kişisel pano"ya çevirmek.

1. Soru setinin v2'ye genişletilmesi (3'lü seviye + zaman sorusu + "kararsızım" seçeneği + geri düğmesi).
2. Cevapların/haritanın `localStorage` kalıcılığı; dönen kullanıcıya sihirbaz yerine harita.
3. `estimatedHours` verisi + süre etiketleri + toplam süre/bitiş ayı tahmini.
4. Anonim ilerleme okuma (session şartının kaldırılması — CLAUDE.md §5 uyumu).
5. "İlk dersine başla →" tek CTA + düğüm durum görselleri (✅/🔵/soluk) + ilerleme omurgası.
6. Ana sayfa kutusunun 3 durumlu hale getirilmesi.
7. Minimal event ölçümü (sihirbaz başlama/bitirme, ilk ders tıklaması).
8. Playwright testleri: sihirbaz akışı, kalıcılık, anonim progress, kutu durumları.

### Faz 2 (derinleşme — MVP metrikleri okunduktan sonra)

1. **Milestone/bayrak sistemi** + konfeti + mevcut rozet/XP-streak entegrasyonu.
2. **Ders sayfası → harita köprüsü:** ders başında "Haritanda 6/14. adım" breadcrumb'ı.
3. **Uzmanlık dalları:** ana yol %60+ olan kullanıcıya haritanın sonunda seçilebilir dal paketleri (📱 Mobil: Appium+BrowserStack · ⚡ Performans: JMeter · 🔒 Güvenlik). "Hedef alan" kişiselleştirmesi burada, doğru zamanda devreye girer.
4. **Paylaşılabilir harita:** "Haritamı paylaş" → inline SVG'den üretilen PNG/OG görseli — LinkedIn/X paylaşımı (Türk QA topluluğu LinkedIn'de çok aktif; organik edinim kanalı).
5. ~~Manuel-testçi ön eki için içerik rötuşu (Manuel Test düğümünün "gözden geçir" modu).~~ İPTAL (2026-07-19): Manuel Test düğümü manuel-testçi haritasından tamamen çıkarıldı — dersler seviyeye göre gösterilir.

### Faz 3 (akıllı katman — Faz 2 sonrası)

1. **AI mentor check-in:** mevcut Groq Edge Function altyapısıyla (grade-interview-answer kalıbı) haftalık kişisel mesaj: "Bu hafta Selenium wait stratejilerindeydin, XPath quizinde zorlandın — şu pratiği öner...". AI harita ÜRETMEZ, harita üstünde koçluk yapar.
2. **Süre kalibrasyonu:** anonim toplu veriden gerçek modül tamamlama süreleri → `estimatedHours` güncellemesi ("senin gibi başlayanlar bu modülü ortalama 3 haftada bitirdi").
3. **Takılma tespiti:** 14+ gün ilerlemeyen kullanıcıya haritada nazik yeniden-başlama akışı ("kaldığın yerden 10 dakikalık mini adım").
4. **Sertifika + leaderboard derin entegrasyonu:** milestone'ların XP karşılıkları, harita bitirme sertifikasının paylaşım sayfası zenginleştirmesi.

---

## 9. Ölçüm ve Başarı Kriterleri

### 9.1 Ölçüm altyapısı (MVP şartı)

Minimal event seti (Supabase'e basit insert veya mevcut altyapıya uygun hafif çözüm; anonim kullanıcıda rastgele anonim ID):

`map_wizard_started` · `map_wizard_completed` (cevaplarla) · `map_first_lesson_clicked` · `map_revisited` · `map_regenerated` · `milestone_earned` (Faz 2)

### 9.2 Funnel ve hedefler

| Metrik | Tanım | İlk hedef (3 ay) |
|--------|-------|------------------|
| **Sihirbaz tamamlama oranı** | started → completed | > %75 (4 tek-dokunuş soru için düşükse UX sorunu var demektir) |
| **Aktivasyon** | completed → ilk ders tıklaması (aynı oturum) | > %60 |
| **İlk başarı** | Harita oluşturan kullanıcının 48 saat içinde ≥1 quiz çözmesi | > %35 |
| **Retention (asıl kuzey yıldızı)** | Harita sahibi kullanıcının 7 gün içinde siteye dönüp haritasından derse gitmesi | Haritasız kullanıcıya göre belirgin fark (A/B karşılaştırma: harita oluşturan vs oluşturmayan yeni ziyaretçi) |
| **Derinlik** | 30 gün içinde ≥2 modül tamamlayan harita sahibi oranı | > %15 |
| **Üyelik dönüşümü** | Anonim harita sahibi → üye | Genel anonim→üye oranının üstü |
| **Yol değiştirme oranı** | map_regenerated / completed | < %20 (yüksekse S2 soru tasarımı/önerisi yanlış demektir) |

### 9.3 Nitel sinyaller

- Mevcut yorum/feedback sisteminden "harita" geçen geri bildirimlerin aylık taraması.
- Sihirbazda "Kararsızım" seçme oranı — yüksekse (>%40) hedef kitle beklendiği gibi karar felcinde demektir ve öneri metinlerinin kalitesi kritikleşir.
- Milestone kazanım dağılımı (Faz 2): hangi milestone'da kitlesel düşüş varsa, o modülün içeriği/zorluğu gözden geçirilir — harita aynı zamanda **içerik kalitesinin teşhis aracı** olur.

### 9.4 "Başarılı sayarız" tanımı

Özellik, 3. ayın sonunda şu iki koşulu birden sağlıyorsa başarılıdır:

1. Yeni ziyaretçilerin anlamlı bir bölümü (>%20) sihirbazı tamamlıyor **ve** bunların yarısından fazlası ilk derse geçiyor (aktivasyon çalışıyor).
2. Harita sahibi kullanıcıların 7 günlük dönüş oranı, harita oluşturmayan benzer kullanıcılardan istatistiksel olarak belirgin şekilde yüksek (retention çalışıyor).

Aksi halde önce sihirbaz UX'i (koşul 1 başarısızsa) veya harita-panosu değeri (koşul 2 başarısızsa) revize edilir — özellik büyütülmeden önce çekirdek döngü kanıtlanır.

---

## 10. Görev Dağılımı: Fable ↔ Sonnet (MVP Uygulama Planı)

> **İlke:** Mimari kararlar, state machine, veri şeması ve çapraz-dosya entegrasyonu **Fable**'da;
> kalıp takip eden veri girişi, test yazımı ve metin cilası **Sonnet**'te. Sonnet görevleri
> Fable görevleri bittikten SONRA, aşağıdaki hazır promptlarla sırayla çalıştırılır.
> Branch: `feature/career-map-v2`.

### 10.1 Fable görevleri (çekirdek mimari — bu oturumda kodlanır)

| # | Görev | Dosyalar |
|---|-------|----------|
| F1 | `qaMentorData.js` v2: yeni DIALOG akışı (3'lü seviye, "kararsızım" önerisi, zaman sorusu, onay cümleleri), düğümlere `estimatedHours` ilk-geçiş değerleri, `resolveMap(answers)` parametrik katman (seviye ön eki + Java+ikisi overlay), süre hesaplama yardımcıları | `src/data/qaMentorData.js` |
| F2 | Sihirbaz state machine v2: yeni soru akışı S1→S2→S3→S4, geri düğmesi, kararsızım → gerekçeli Java önerisi | `src/components/QAMentorPage.jsx` |
| F3 | `qaMentorProfile` localStorage kalıcılığı (version alanıyla) + dönen kullanıcıya sihirbaz yerine doğrudan harita + v1 `career_goal` migrasyonu (yalnız zaman mini-sorusu) | `QAMentorPage.jsx`, `src/utils/careerMapProfile.js` (yeni) |
| F4 | Anonim ilerleme: tamamlanan route'ların local kaydı (`learnqa_completed_routes`) + üye/anonim birleşik okuma; haritada `session` şartının kaldırılması | `src/context/AuthContext.jsx`, `src/utils/careerMapProfile.js` |
| F5 | Harita görünümü v2: düğüm durum ikonları (✅/sıradaki pulse/soluk), süre chip'leri, toplam süre + tahmini bitiş ayı, "Devam et / İlk dersine başla" tek büyük CTA | `QAMentorPage.jsx` |
| F6 | Ana sayfa kutusunun 3 durumlu hale getirilmesi (harita yok / devam / bitti) | `src/components/HomePage.jsx` |

### 10.2 Sonnet görevleri (Fable sonrası, sırayla)

| # | Görev | Neden Sonnet |
|---|-------|--------------|
| S1 | `estimatedHours` değerlerinin kalibrasyonu: her düğümün saati, ilgili sayfanın gerçek sekme/içerik hacmine bakılarak gözden geçirilir | Kalıp belli, dosya dosya sabırlı veri işi |
| S2 | `tests/career-map.spec.ts` Playwright suite'i: sihirbaz akışları, kalıcılık, kutu durumları, anonim progress | Mevcut test kalıplarını takip eden üretim işi |
| S3 | DIALOG v2 metinlerinin EN çevirisi/cilası + i18n denetimi | Dil işi, mimari risk yok |

### 10.3 Sonnet Promptları (kopyala-yapıştır hazır)

#### Prompt S1 — estimatedHours kalibrasyonu

```text
Proje: LearnQA.dev (React+Vite). Önce CLAUDE.md'yi oku (özellikle §1.1 doğruluk
checklist'i ve §8 TR yorum kuralı). Branch: feature/career-map-v2 üzerinde çalış.

GÖREV: src/data/qaMentorData.js dosyasındaki TÜM harita düğümlerinde (MAP_A,
MAP_B, MAP_B_SEL, MAP_C1, MAP_C2 + ZERO_PREFIX/MANUAL_PREFIX düğümleri ve
ortak node factory'leri: SQL_NODE, GIT_GITHUB_NODE, LINUX_MAIN_NODE) bulunan
`estimatedHours` alanlarını kalibre et. Bu değerler Fable tarafından ilk geçiş
tahmini olarak girildi; senin işin her birini gerçek içerik hacmiyle doğrulamak.

YÖNTEM (her düğüm için):
1. Düğümün route'una karşılık gelen src/data/*Data.js dosyasını aç (örn.
   /selenium → seleniumData.js) ve sekme sayısını + blok yoğunluğunu ölç
   (kabaca: sekme başına 1.5-2.5 saat; quiz/playground yoğun sekmeler üst sınır).
2. Hesabını estimatedHours ile karşılaştır; %25'ten fazla sapma varsa güncelle.
3. Değişiklik gerekçeni kısa bir listeyle raporla (düğüm, eski→yeni, neden).

KURALLAR:
- SADECE estimatedHours sayılarını değiştir. Başka hiçbir alana (title, desc,
  route, color, mentorNote, DIALOG) DOKUNMA.
- Toplam süre gerçekçi kalmalı: MAP_A toplamı 300-420 saat bandında,
  MAP_B 200-300 bandında olmalı; bant dışına çıkıyorsan gerekçelendir.
- Bitince çalıştır ve çıktılarını raporla:
  node scripts/check-content-integrity.mjs  (sıfır ihlal)
  npm run build                             (hatasız)
- CLAUDE.md §1.1 gereği bu iki kontrol geçmeden "tamamladım" deme.
```

#### Prompt S2 — Playwright test suite

```text
Proje: LearnQA.dev (React+Vite). Önce CLAUDE.md'yi oku (özellikle §22 E2E
kuralları ve §22.1 istisna listesi). Branch: feature/career-map-v2.

GÖREV: tests/career-map.spec.ts adında yeni bir Playwright test dosyası yaz.
Önce mevcut test kalıplarını incele: tests/ klasöründeki 1-2 spec dosyasını
oku (özellikle localStorage hazırlığı ve sayfa navigasyon kalıpları) ve AYNI
kalıpları kullan — yeni helper icat etme.

TEST KAPSAMI (hepsi zorunlu):
1. Sihirbaz mutlu yolu: /qa-mentor aç → 4 soruyu sırayla cevapla (seviye:
   "Kod yazabiliyorum" → dil: Java → araç: Selenium → zaman: 6-10 saat) →
   harita render oldu mu (MAP_C1 başlığı + düğüm sayısı + "İlk dersine başla"
   CTA'sı görünür ve tıklanabilir mi).
2. "Kararsızım" akışı: dil sorusunda kararsızım seç → mentor öneri balonu
   görünüyor mu → akış Java yolundan devam ediyor mu.
3. Kalıcılık: sihirbazı tamamla → sayfayı yeniden yükle → sihirbaz DEĞİL,
   doğrudan harita görünüyor mu (localStorage 'qaMentorProfile' anahtarı).
4. Geri düğmesi: 2. soruda geri'ye bas → 1. sorunun seçenekleri tekrar
   görünüyor mu.
5. Ana sayfa kutusu durumları: (a) temiz localStorage ile / aç → kutuda
   "Kişisel QA Kariyer Haritanı Oluştur" metni; (b) qaMentorProfile'ı test
   içinde localStorage'a yazıp / aç → kutuda "Devam et" / kaldığın yer
   ifadesi görünüyor mu.
6. Anonim ilerleme: login OLMADAN, localStorage'a 'learnqa_completed_routes'
   içine haritanın ilk düğüm route'unu yaz → /qa-mentor'da (kayıtlı profille)
   ilerleme yüzdesinin 0'dan büyük gösterildiğini doğrula.

KURALLAR:
- §22.1'deki sayfaları (/basit-backend, /backend, /security) HİÇBİR listeye ekleme.
- Login/AI çağrısı gerektiren senaryo YAZMA — hepsi anonim akış.
- Seçenek butonlarına metinle değil, varsa data-testid ile eriş; yoksa
  QAMentorPage.jsx'e minimal data-testid ekleyebilirsin (başka değişiklik yasak).
- Bitince: npx playwright test tests/career-map.spec.ts --reporter=line
  çıktısını raporla; ayrıca npm run build hatasız geçmeli (CLAUDE.md §1.1).
```

#### Prompt S3 — DIALOG v2 EN çeviri/cila + i18n denetimi

```text
Proje: LearnQA.dev (React+Vite). Önce CLAUDE.md'yi oku (özellikle §8 dil
kuralları). Branch: feature/career-map-v2.

GÖREV: src/data/qaMentorData.js içindeki DIALOG objesinin v2'de eklenen tüm
yeni anahtarlarını (seviye sorusu 3 seçenek, kararsızım önerisi, zaman sorusu,
cevap onay cümleleri, süre/CTA/durum etiketleri — DIALOG.tr'de olup
DIALOG.en'de eksik veya kaba çevrilmiş her şey) ele al:

1. TR ↔ EN anahtar simetrisini doğrula: tr'de olup en'de olmayan anahtar
   build'de sessiz fallback yapar — hepsini tamamla.
2. EN metinleri doğal, motive edici ve TR ile aynı tonda olacak şekilde
   cilala (birebir çeviri değil, aynı enerji).
3. TR metinlerde yerleşik teknik terimlerin (fixture, locator, CI/CD,
   Playwright vb.) İngilizce kaldığını, açıklama cümlelerinin Türkçe
   olduğunu denetle (CLAUDE.md §8).
4. HomePage.jsx ve QAMentorPage.jsx'te v2 ile eklenen kullanıcıya görünür
   TÜM string'lerin language === 'tr' ? ... : ... kalıbıyla bilingual
   olduğunu tara; tek dilli kalan varsa tamamla.

KURALLAR:
- Kod mantığına, akışa, veri şemasına DOKUNMA — sadece metin.
- Bitince çalıştır ve raporla: node scripts/check-content-integrity.mjs ve
  npm run build (CLAUDE.md §1.1 — ikisi geçmeden "tamamladım" deme).
```

---

## Ek: v1 → v2 fark özeti (tek bakışta)

| Boyut | v1 (bugün canlıda) | v2 (bu plan) |
|-------|--------------------|--------------|
| Sorular | 2-4 ikili soru | 4 soru: 3'lü seviye + dil (öneri seçeneğiyle) + araç + zaman |
| Kalıcılık | Her ziyarette sıfırdan | localStorage profili; dönüşte doğrudan harita |
| Süre bilgisi | Yok | Modül başına + toplam + tahmini bitiş ayı |
| İlerleme | Sadece üyede, tek yüzde | Anonim dahil; omurga + düğüm durumları + milestone'lar |
| Sonraki adım | Kullanıcı kendisi bulur | Tek büyük "İlk dersine başla" CTA'sı |
| Ana sayfa kutusu | Statik davet | 3 durumlu kişisel pano girişi |
| Ölçüm | Yok | Event funnel + başarı kriterleri |
