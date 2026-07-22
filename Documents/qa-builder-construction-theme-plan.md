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
| **1** | `VerticalBrickTower.jsx`'i `QAMentorPage.jsx`'e bağla (mevcut `MindMapNode` kişiselleştirilmiş yol haritasının YANINA, site-geneli "kaç tuğla örüldü" özeti olarak — birbirinin YERİNE değil, ikisi FARKLI şeyi gösteriyor: MindMapNode = kullanıcının seçtiği kariyer yolu, Tower = TÜM site genelindeki ilerleme) | ✅ Tamamlandı |
| **2** | 5 kullanılmayan dosyayı sil: `BrickBadge.jsx`, `BrickProgressBar.jsx`, `BuildingRoadmap.jsx`, `ConstructionLamp.jsx`, `InspectionReportQuizResult.jsx` + `index.css`'teki karşılık gelen kullanılmayan class'lar | ✅ Tamamlandı |
| **3** | **Bug fix — Çift CTA:** `VerticalBrickPlacementCard`'ın kendi "Sıradaki Tuğlaya Geç →" butonu kaldırıldı, tek navigasyon kaynağı `tab-nav-next-suggestion` (AC11 testleriyle korunuyor) | ✅ Tamamlandı |
| **4** | **Bug fix — Konfeti tekrarı:** `TopicPage.jsx`'e `celebratedTabsRef` (`useRef(new Set())`) eklendi — konfeti sekme başına bu sayfa görüntüleme oturumunda SADECE ilk tamamlamada patlar | ✅ Tamamlandı |
| **5** | Test borcu: `tests/lesson-completion.spec.ts`'teki `'bitirdin'` beklentisi `'dizdin'`e güncellendi | ✅ Tamamlandı |
| **6** | **Bug fix — Tower sıralaması ("gözü korkutuyordu"):** `VerticalBrickTower.jsx`'teki `.reverse()` kaldırıldı — liste artık DOĞAL sırada (Temel önce), kullanıcı harita oluşur oluşmaz Java/Git/Linux gibi tanıdık konuları görür, Kafka/JMeter gibi ileri seviye konulara ancak aşağı kaydırınca ulaşır. "Zemin Temeli" banner'ı başa, "Kule Yükseliyor" banner'ı sona taşındı. | ✅ Tamamlandı |
| **7** | **Geri alındı — Tower tamamen kaldırıldı:** Kullanıcı `/qa-mentor`'daki "ANA YOL" (kişiselleştirilmiş `MindMapNode` listesi) ekran görüntüsünü verip "bu tuğlaları tamamen kaldır, sadece bu kalsın" dedi — `VerticalBrickTower` bölümü (Aşama 1'de eklenmişti, Aşama 6'da sıralaması düzeltilmişti) `QAMentorPage.jsx`'ten SÖKÜLDÜ, `VerticalBrickTower.jsx` dosyası SİLİNDİ (artık kullanılmıyordu, ölü kod bırakılmadı — geçmişi git history'de duruyor, istenirse geri getirilebilir). `/qa-mentor` artık SADECE kişiselleştirilmiş `MindMapNode` yol haritasını (kendi tuğla rozetleri/renkleriyle, o KALDI) + Skill Radar + Job Readiness kartlarını gösteriyor. | ✅ Tamamlandı |

### Kısıtlar (değişmedi)
- Dış kütüphane/CDN yok (CLAUDE.md §8) — tüm görsel efektler inline CSS/SVG.
- Bilingual (`{tr, en}` veya `isTr` dalı) — tüm yeni/değişen metinler.

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
