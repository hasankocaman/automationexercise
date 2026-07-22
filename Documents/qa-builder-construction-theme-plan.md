# QA Builder (Tuğla Örme & Yapı Mühendisi) Tasarım Dili ve Bileşen Planı

> **Amaç:** LearnQA.dev platformunun görsel dilini "QA Mühendisi Olarak Bina İnşa Etmek / Tuğla Örmek" metaforu etrafında yenilemek.
> Standart AI-generated tasarım havasından kurtulup platforma özgün bir karakter, yüksek motivasyon ve eğlenceli visual feedback kazandırmak.

---

## 💡 Tasarım Yönü ve Metafor
QA mühendisliği sistem kurmak, katman katman temelleri atmak ve sağlam yapılar inşa etmek demektir.
Bu plan ile platformdaki tüm ilerleme takipleri, rozetler, quiz sonuçları ve yol haritaları **inşaat / yapı ustası** metaforu ile yeniden şekillendirilir.

### Renk Paleti & Tipografi
- **Primary (Temel Renk):** Teal/Cyan (`#14b8a6` / `#06b6d4`) → Güven + Teknik Mühendislik
- **Accent (Vurgu & Tamamlanma):** Amber/Orange (`#f59e0b` / `#fbbf24`) → İnşaat Lambası + Enerji
- **Background (Zemin):** Deep Slate (`#0f172a` / `#1e293b`)
- **Success (Sağlam Yapı):** Emerald (`#10b981`)
- **Tuğla Renkleri:** 
  - Tamamlanan = Vibrant Teal/Cyan Gradient (`from-teal-500 to-cyan-500` + 3D üst parıltı)
  - Devam Eden = Amber Border + Nefes alan glow animation
  - Tamamlanmayan = Deep Slate-800 (`border-slate-700/80` harç çizgileri)

---

## 🏛️ Geliştirilecek Bileşenler

### 1. `BrickProgressBar.jsx` (Segmented Tuğla Duvar Progress Bar)
- **Mevcut:** Düz çizgi progress bar.
- **Yenilik:** Tuğla segmentlerinden oluşan dinamik duvar barı.
- **Detaylar:**
  - Tamamlanan yüzdelere göre segmentler dolan tuğla görünümü alır.
  - Hover yapıldığında tuğla sıra numarası ve % oranı belirir.
  - Yumuşak `brickDrop` ve `brickShine` geçiş animasyonları.

### 2. `ConstructionLamp.jsx` (İnşaat Lambası / Şantiye Feneri - Daily Streak)
- **Mevcut:** Klasik ateş ikonu (`🔥`).
- **Yenilik:** İnşaat uyarı lambası / şantiye feneri (`💡` / `🚧` + animasyonlu sarı-amber parıltı).
- **Detaylar:**
  - Streak aktifken dairesel amber ışık dalgaları (pulse glow).
  - Streak 0 veya dondurulmuşken soğuk şantiye kilit simgesi.
  - Tooltip: "İnşaat Lambası Yanıyor — N Gün Kesintisiz Tuğla Dizdin!"

### 3. `BuildingRoadmap.jsx` (Katmanlı Bina / Tuğla Yol Haritası)
- **Mevcut:** Düz liste veya dairesel radar.
- **Yenilik:** Dikey katlardan oluşan, tuğla tuğla yükselen bir Bina İnşaatı Görselleştirmesi.
- **Detaylar:**
  - Zemin Kat (Zemin/Temel): Java, Git, Linux
  - 1. Kat (Web Automation): Selenium, Playwright, Cypress
  - 2. Kat (API & Backend): Postman, Bruno, REST Assured
  - 3. Kat (DevOps & Mobile): Docker, Jenkins, Kubernetes, Appium
  - Genel Tamamlanma: "%78 Tamamlandı — 3. Kat Örülüyor!"

### 4. `InspectionReportQuizResult.jsx` ("Yapı Denetimi Raporu")
- **Mevcut:** Standart Quiz Sonuç Kartı.
- **Yenilik:** QA Mühendisine Özel "Yapı Denetimi / Statik İnceleme Raporu".
- **Detaylar:**
  - Yeşil kauçuk damga: `[ DENETİMDEN GEÇTİ / ONAYLANDI ]` veya `[ REVİZYON GEREKLİ ]`
  - Doğru cevaplar: **Sağlam Tuğlalar**
  - Yanlış cevaplar: **Çatlak Tuğlalar (Güçlendirme Gerekli)**

### 5. `BrickBadge.jsx` (Madalyon / Tuğla Rozeti) & Tuğla Kartı Stil Doku
- **Brick Card (`.brick-card`):**
  - Ders kartlarına 3D bevel kenar, harç çizgisi vurgusu ve hover yükselme efekti.
- **Brick Badge:**
  - Tamamlanan her katman için kabartmalı altın/teal tuğla madalyonu.

---

## 🛠️ Uygulama Adımları

1. **Adım 1:** CSS Utilities & Animations (`src/index.css`)
   - Brick grid background pattern, 3D brick bevel, site lamp pulse CSS keyframes.
2. **Adım 2:** Core Theme Bileşenlerinin Oluşturulması
   - `src/components/BrickProgressBar.jsx`
   - `src/components/ConstructionLamp.jsx`
   - `src/components/BuildingRoadmap.jsx`
   - `src/components/InspectionReportQuizResult.jsx`
   - `src/components/BrickBadge.jsx`
3. **Adım 3:** Ana Sayfa Entegrasyonu (`src/components/HomePage.jsx`)
   - Daily Strip'te `ConstructionLamp` ve `BrickProgressBar` kullanımı.
   - Roadmap bölümünde `BuildingRoadmap` görünümü seçeneği/entegrasyonu.
   - Ders kartlarında `brick-card` dokusu.
4. **Adım 4:** Konu Sayfası & Quiz Entegrasyonu (`src/components/TopicPage.jsx`)
   - Header progress bar'a `BrickProgressBar` entegrasyonu.
   - Quiz tamamlama sonuçlarına Yapı Denetimi Raporu visual touche'ları.
5. **Adım 5:** Durum Güncellemesi & Git Commit
   - `.claude/NEXT_SESSION.md` dosyasını güncelle.
   - `SKIP_E2E_HOOK=1 git commit` ile commit yap.
