# QA Shop — ürün fotoğrafları

Bu klasöre koyduğun fotoğraflar `/qa-shop` vitrininde kullanılır.
Klasör **boşsa** vitrin inline SVG çizimlerine düşer — bu bir arıza değil,
tasarlanmış yedek yoldur (CI'da bu klasör boş kalır).

## Adlandırma

Dosya adı **kategoriyle başlamalı**. Kategoriler uydurulmuş değil; ürün adından
kategori çözen mevcut mantığın (`siluetTipi`) döndürdüğü sekiz değerin aynısı:

```
shirts     tshirts    dresses    coats
jeans      boots      sneakers   bags
```

Bir kategoriye ikinci bir varyant eklemek istersen `-` ile ayır:

```
public/qa-shop/urunler/
  shirts.webp
  shirts-2.webp      ← aynı kategorinin ikinci fotoğrafı
  dresses.webp
  jeans.webp
  ...
```

Adı bu sekizden biriyle başlamayan dosya **sessizce yok sayılmaz** — manifest
komutu uyarı basar, "koydum ama çıkmadı" durumu yaşanmasın.

## Kabul edilen biçimler

`.webp` · `.avif` · `.jpg` · `.jpeg` · `.png`

Öneri: **kare** (ör. 800×800), beyaz/nötr stüdyo zemini. Vitrinde farklı
boyuttaki dosyalar `object-cover` ile aynı orana kırpılır; kare kaynak, kırpma
sırasında ürünün kenarlarının kesilmesini önler.

## Dosya ekledikten sonra

```bash
npm run qa-shop:gorseller
```

Bu komut klasörü tarar ve `src/data/generated/qaShopUrunGorselleri.js`
manifestini yeniden yazar. **Komutu çalıştırmazsan yeni dosyalar görünmez.**

Manifest neden var: bileşen "bu kategorinin fotoğrafı var mı?" sorusunu senkron
bilmek zorunda. Bilmezse dosya olmayan ortamda `<img>` denemesi 404 üretir,
404 da konsola hata yazar ve testlerin "console hatası yok" iddiasını kırar.

## Hangi ürün hangi fotoğrafı alır

Ürün **adından** kategori çözülür (kategori alanından değil — seed verisinde
"Slim Fit Red Shirt" adlı ürünün kategorisi `boots` olabiliyor; ada güvenmek
vitrinde gömlek yazan kartta bot fotoğrafı çıkmasını önlüyor).

Bir kategoride birden çok fotoğraf varsa seçim ürün id'sine göre yapılır —
belirlenimcidir, yani aynı ürün her açılışta aynı fotoğrafı gösterir.
