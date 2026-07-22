# QA Builder (Tuğla Örme & Yapı Mühendisi) Tasarım Dili ve Bileşen Planı

> **Amaç:** LearnQA.dev platformunun görsel dilini "QA Mühendisi Olarak Bina İnşa Etmek / Tuğla Örmek" metaforu etrafında yenilemek.
> Standart AI-generated tasarım havasından kurtulup platforma özgün bir karakter, yüksek motivasyon ve eğlenceli visual feedback kazandırmak.

---

## 🔄 REVİZYON (2026-07-22, Fable oturumu) — Kapsam Netleştirildi

Bu dosyanın ilk versiyonu (aşağıda §"Orijinal Plan" olarak korunur) 5 ayrı temalı
bileşen öneriyordu. Kod denetiminde şu gerçek ortaya çıktı: bu 5 bileşenden
**sadece 2'si gerçekten uygulamaya bağlandı** (`VerticalBrickPlacementCard` +
`ConfettiExplosion`, TopicPage'de), diğer 5 dosya (~570 satır) yazıldı ama HİÇBİR
yerde import edilmedi — muhtemelen "anasayfadan tüm tuğla efektlerini kaldır"
kararı sırasında (bkz. `.claude/NEXT_SESSION.md` "Antigravity oturumu" notu)
temizlenmeyi unutulmuş kalıntılar.

**Kullanıcının asıl vizyonu netleştirildi (2026-07-22):**
1. **QA Mentor sayfasında 3D tuğla** — kullanıcı ilerledikçe tuğlaları **üst üste
   koysun** ve bunu görüp sevinsin.
2. **Derslerde sekme bitirme** — kullanıcı bir sekmeyi bitirdikçe onu motive
   edecek **tek seferlik** bir konfeti patlaması.

Bu iki hedefin DIŞINDA kalan (İnşaat Lambası/streak, Yapı Denetimi Raporu/quiz,
Tuğla Rozeti/badge, segmented Tuğla Progress Bar) bileşenler kullanıcının asıl
isteğinin parçası değildi — **Fable'ın önerisi: bu 5 dosya silinsin**, çünkü:
- Hiçbiri hiçbir yerde kullanılmıyor (build'e hiçbir etkisi yok, sadece repo'da ölü kod).
- Kullanıcının netleştirdiği 2 hedeften hiçbirine hizmet etmiyorlar.
- İleride gerçekten istenirse, bu dosyanın "Orijinal Plan" bölümü referans
  olarak zaten burada duruyor — yeniden yazmak ucuz, ölü kodu repo'da taşımak
  değil.

**Tek istisna — `VerticalBrickTower.jsx` SİLİNMEDİ, aksine bu revizyonun
merkezine alındı:** Bu dosya da hiçbir yerde kullanılmıyordu, ama içeriği
kullanıcının tam olarak tarif ettiği şeydi — `getCompletedRoutes()`'a göre
23 QA konusunu dikey bir kulede alttan üste dizen, tamamlananları "örülmüş
tuğla" (teal/cyan dolu), tamamlanmayanları "boş tuğla" (slate outline) gösteren
bir bileşen. **Aşama 1'de QA Mentor sayfasına bağlanır.**

### Revize Kapsam — Aşamalar

| Aşama | İş | Durum |
|---|---|---|
| **1** | `VerticalBrickTower.jsx`'i `QAMentorPage.jsx`'e bağla (mevcut `MindMapNode` kişiselleştirilmiş yol haritasının YANINA, site-geneli "kaç tuğla örüldü" özeti olarak — birbirinin YERİNE değil, ikisi FARKLI şeyi gösteriyor: MindMapNode = kullanıcının seçtiği kariyer yolu, Tower = TÜM site genelindeki ilerleme) | ⏳ Bu oturumda yapılıyor |
| **2** | 5 kullanılmayan dosyayı sil: `BrickBadge.jsx`, `BrickProgressBar.jsx`, `BuildingRoadmap.jsx`, `ConstructionLamp.jsx`, `InspectionReportQuizResult.jsx` + `index.css`'teki karşılık gelen kullanılmayan class'lar (`.inspection-stamp-passed`, `.inspection-stamp-failed`, `.brick-card` — hiçbir component'te uygulanmamıştı) | ⏳ Bu oturumda yapılıyor |
| **3** | **Bug fix — Çift CTA:** `TopicPage.jsx`'te bir sekme bitince hem `VerticalBrickPlacementCard`'ın kendi "Sıradaki Tuğlaya Geç →" butonu HEM DE önceden var olan `tab-nav-next-suggestion` butonu üst üste render oluyordu — aynı işi yapan iki buton. Çözüm: `VerticalBrickPlacementCard`'dan `onContinue`/kendi buton mantığı çıkarılır, bileşen SADECE kutlama kartı olur; navigasyon tek kaynaktan (`tab-nav-next-suggestion`, zaten AC11 prev/next testleriyle korunan mevcut mekanizma) gelir. | ⏳ Bu oturumda yapılıyor |
| **4** | **Bug fix — Konfeti tekrarı:** `VerticalBrickPlacementCard`'ın `showConfetti` state'i her zaman `true` başlıyordu ve component'in kendisi `activeTab` değiştikçe muhtemelen yeniden mount oluyordu (React, sekme içeriği tamamen değiştiği için bu pozisyondaki elemanı yeniden kullanmıyor) — yani tamamlanmış bir sekmeye HER dönüşte tam ekran konfeti tekrar patlıyordu. Kullanıcının isteği "bir defalık" konfeti (motive edici, spam değil). Çözüm: `TopicPage.jsx`'te sekme başına "bu oturumda zaten kutlandı mı" bilgisini tutan bir `useRef(new Set())` eklenir (parent component sekme değişiminde UNMOUNT OLMAZ, bu yüzden güvenilir bir kayıt yeri) — kart her zaman görünür ama konfeti SADECE ilk kez "tamamlandı" durumuna girildiğinde patlar. | ⏳ Bu oturumda yapılıyor |

### Kısıtlar (değişmedi)
- Dış kütüphane/CDN yok (CLAUDE.md §8) — tüm görsel efektler inline CSS/SVG.
- Bilingual (`{tr, en}` veya `isTr` dalı) — tüm yeni/değişen metinler.
- Mevcut testler (`tests/lesson-completion.spec.ts` "bitirdin" substring'i arıyor,
  yeni metin "tuğlalarını dizdin") bu oturumun kapsamında GÜNCELLENMEDİ — ayrı
  bir görev olarak not düşülür, kullanıcı onayıyla ele alınabilir.

---

## Orijinal Plan (2026-07-22, referans olarak korunur — artık aktif değil)

### 💡 Tasarım Yönü ve Metafor
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

**Durum: ✅ Uygulandı ve KORUNUYOR** — `QAMentorPage.jsx`'teki `MindMapNode` ve
`LessonFinishBadge.jsx` bu paleti kullanıyor, revizyon bunu değiştirmiyor.

### 🏛️ Geliştirilecek Bileşenler (orijinal liste — §Revizyon'a bak)

1. `BrickProgressBar.jsx` — Segmented Tuğla Duvar Progress Bar — **SİLİNDİ (§Revizyon)**
2. `ConstructionLamp.jsx` — İnşaat Lambası (Daily Streak) — **SİLİNDİ (§Revizyon)**
3. `BuildingRoadmap.jsx` — Katmanlı Bina / Tuğla Yol Haritası — **SİLİNDİ (§Revizyon, `VerticalBrickTower` bu rolü üstlendi)**
4. `InspectionReportQuizResult.jsx` — Yapı Denetimi Raporu (Quiz Sonucu) — **SİLİNDİ (§Revizyon)**
5. `BrickBadge.jsx` — Madalyon/Tuğla Rozeti + `.brick-card` — **SİLİNDİ (§Revizyon)**
