# Google Search Console — Yapılacaklar ve Kontrol Listesi

**Son güncelleme:** 2026-08-15
**Mülk:** `https://learnqa.dev/` (URL öneki mülkü)
**Bu dosya kimin için:** Hasan. Elle, tarayıcıdan yapılacak adımlar — hiçbiri
koddan yapılamaz, hesap yetkisi gerektirir.

> Neden bu dosya var: arama görünürlüğü çalışmasının kod tarafı bitti ve
> yayında. Geriye kalan adımlar yapılmadan **ölçülebilir hiçbir sonuç
> oluşmaz** — kod, sıralamanın önündeki engelleri kaldırır, sıralamayı
> üreten şey bu adımlar.

---

## ✅ Tamamlananlar

- [x] **Sahiplik doğrulaması** — 2026-08-14, "HTML etiketi" yöntemiyle.
      Token `index.html` head'inde duruyor.
      ⚠️ **O meta etiketini silme.** Doğrulama kalıcı değildir; etiket
      kaldırılırsa Google mülkü bir süre sonra doğrulanmamış sayar ve
      buradaki tüm veri (indeksleme raporu dahil) kesilir. Koda da bu uyarı
      yorum olarak bırakıldı.

---

## 1. Site haritalarını gönder

**Site Haritaları** ekranı → "Yeni site haritası ekleyin". Alanın başında
`https://learnqa.dev/` yazılı gelir; **tam URL yapıştırma, sadece dosya adını
yaz.**

- [ ] `sitemap-tr-hubs.xml`
- [ ] `sitemap-en-hubs.xml`

**`sitemap.xml`'i (indeks) ŞİMDİLİK GÖNDERME.** Gerekçe: indeks toplam 794
URL taşıyor ve bunun ~%89'u bölüm (sekme) sayfası — 710 bölüm / 42 ana
sayfa. Yeni bir alan adının tarama bütçesi kısıtlıdır; hepsi birden
sunulursa Google bütçeyi bölüm sayfalarına dağıtır ve asıl indekslenmesini
istediğin ana sayfalar geride kalır. Önce ana sayfaları geçir, sonra
bölümleri ekle.

**Beklenen sonuç:** durum `Başarılı`, keşfedilen URL sayısı her iki dosya
için de **42**. Hemen görünmeyebilir, birkaç saat sürebilir.

---

## 2. Kilit sayfalar için dizine ekleme iste

Üstteki **URL denetimi** kutusuna sırayla yapıştır → "Dizine eklenmesini
iste".

- [ ] `https://learnqa.dev/` ← **ilk sırada olmalı**
- [ ] `https://learnqa.dev/selenium`
- [ ] `https://learnqa.dev/jira`
- [ ] `https://learnqa.dev/playwright`
- [ ] `https://learnqa.dev/python`
- [ ] `https://learnqa.dev/sql`
- [ ] `https://learnqa.dev/what-is-testing`
- [ ] `https://learnqa.dev/manual-testing`

Ana sayfa neden ilk: marka aramasında (`learnqa.dev`) çıkacak sayfa odur ve
ölçüm sırasında indekste **olmadığı** görüldü. Marka sorgusunda çıkamayan
bir site, rekabetçi sorgularda hiç çıkamaz.

**"URL Google'da değil" yazması normaldir** — bu bir hata değil, henüz
indekslenmediğinin ifadesi. Önemli olan "Canlı testi"nin sayfayı
taranabilir göstermesi.

---

## 3. Diğer hesap adımları

Bunlar Search Console'dan bağımsız ama etkisi daha büyük — sitenin dışarıda
tek bir referansı yok ve indekslenmemesinin asıl nedeni bu.

- [ ] **GitHub repo ayarları** (Settings → General → About kutusu):
      açıklama + **Website alanına `https://learnqa.dev`** + konu etiketleri.
      Hazır metinler: `Documents/outreach/github-repo-about.md`.
      Neden önemli: sitenin yapılandırılmış verisi "beni şu GitHub reposu
      doğruluyor" diyor, ama repo şu an siteye geri link vermiyor — tek
      yönlü, karşılıksız bir iddia. Bu alan o zincirin en zayıf halkası ve
      kapatması 1 dakika.
- [ ] **LinkedIn** — profile site linki + bir tanıtım gönderisi.
- [ ] **Bing Webmaster Tools** — Search Console'dan içe aktarmayla ~2 dakika.
- [ ] **Plausible/GA4 hesabı** — açılınca `VITE_PLAUSIBLE_DOMAIN` değişkeni
      yayın ortamına eklenecek. Ölçüm kancası kodda hazır ve kapalı duruyor;
      hesap açılmadan hiçbir istek gitmiyor.
- [ ] **Tanıtım yazıları** — üç taslak Türkçe teaser + canonical talimatıyla
      yayına hazır: `Documents/outreach/`. Medium/dev.to'ya elle yayınlanır.
      ⚠️ Tam metni canonical belirtmeden başka platforma kopyalama — 8
      haftalık bir alan adı, otoritesi yüksek bir platformla içerik kopyası
      çekişmesine girerse kaybeder.

---

## 4. İlk 2 hafta — ne bekleneceği

**Panik yapılmayacak durum:** Site haritası gönderildikten 1-2 hafta sonra
**"Keşfedildi – şu anda dizine eklenmedi"** sayısı yüzlerle ifade edilecek.
Bu bir arıza değil; 8 haftalık, dışarıdan link almamış bir alan adının normal
karşılığıdır.

**Bakılacak asıl sayı toplam değil, ana sayfa site haritalarının indekslenme
oranıdır.** Site haritası dörde bölünmüş olmasının tek sebebi bu: her grup
kendi "gönderilen / dizine eklenen" sayısını ayrı raporlar, böylece "hangi
grup takıldı?" sorusu cevaplanabilir.

| Zaman | Beklenen |
|---|---|
| 2 hafta | Veri görünmeye başlar; dizine eklenen 1 → 20-50 |
| 6 hafta | Marka aramasında (`learnqa.dev`) 1. sıra; dizine eklenen 100+ |
| 3 ay | Dizine eklenen 300+; ilk markasız Türkçe uzun kuyruk gösterimleri |

Bu çizelge 3. bölümdeki adımların yapılmasına bağlıdır. Yapılmazsa site 12 ay
sonra da bugünkü yerinde olur — teknik altyapı ne kadar iyi olursa olsun.

---

## 5. Ölçüm ritmi

- [ ] **Haftalık** (5 dk) — Sayfalar raporu: dizine eklenen sayısı artıyor mu?
- [ ] **Aylık** (30 dk) — Performans → Sorgular → CSV indir. Üç gruba ayır:
      - *Gösterim var, tıklama yok, sıra 11-30* → **en değerli grup**, küçük
        başlık/içerik iyileştirmesiyle ilk sayfaya taşınabilir
      - *Gösterim var, sıra 30+* → içerik o sorguyu yeterince karşılamıyor
      - *Hedeflenen ama hiç gösterim almayan sorgular* → o konu sayfada yok
      Bu üç grup, sonraki ayın iş listesini kendiliğinden üretir. Sorgu tahmin
      edilmez, ölçülür.
- [ ] **Aylık** (2 saat) — 1 yeni dış tanıtım (yazı/topluluk paylaşımı).
- [ ] **3 aylık** (30 dk) — `Documents/seo-visibility-report-2026-08-13.md`
      içindeki sorguları tekrar çalıştır, ilerlemeyi karşılaştır.

---

## 6. Ana sayfalar oturunca — bölüm site haritalarını ekle

Ana sayfa site haritalarının indekslenme oranı **%70'i geçince**:

- [ ] `sitemap-tr-sections.xml` gönder
- [ ] `sitemap-en-sections.xml` gönder

Oran uzun süre düşük kalırsa bu bir hata değil, **sinyaldir**: bölüm
sayfaları Google'a yeterince özgün görünmüyor demektir; o durumda yeni URL
eklemek yerine mevcut bölüm içeriğini güçlendirmek gerekir.

---

## 7. Sorun giderme

| Gördüğün | Anlamı | Ne yapmalı |
|---|---|---|
| Site haritası "Alınamadı" | Adres yanlış veya sunucu vermiyor | Tarayıcıda `https://learnqa.dev/sitemap-tr-hubs.xml` aç, 200 dönüyor mu bak |
| "Keşfedildi – dizine eklenmedi" | Google gördü ama sıraya koydu | Normal. Dış link ve zaman gerekir; tekrar tekrar dizine ekleme isteme |
| "Tarandı – dizine eklenmedi" | Taradı, değersiz buldu | İçerik derinliği/özgünlüğü sorunu — o sayfayı güçlendir |
| "Kullanıcı tarafından seçilen canonical yok" | Yinelenen içerik şüphesi | Genelde TR/EN eşleşmesiyle ilgili; `hreflang` üretiliyor, birkaç hafta bekle |
| Sahiplik doğrulaması düştü | Meta etiketi silinmiş | `index.html`'deki `google-site-verification` satırını geri koy |

---

## İlgili dosyalar

- `Documents/seo-visibility-report-2026-08-13.md` — ölçüm, kök neden analizi ve planın tamamı
- `codexSeo.md` — Search Console mimarisinin *neden*i (site haritası yapısı, kademeli gönderim gerekçesi)
- `Documents/outreach/` — yayınlanmayı bekleyen tanıtım metinleri
