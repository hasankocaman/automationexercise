# Postman / Newman paketi

Bu klasörde **koşmaya hazır** bir regresyon paketi var:

| Dosya | Ne |
|---|---|
| `qa-shop.postman_collection.json` | 6 klasör, 26 istek, hepsi doğrulamalı |
| `qa-shop.postman_environment.json` | `baseUrl` + zincirde taşınan değişkenler |

## Neden sözleşmeden üretilen koleksiyondan farklı?

`Import > Link` ile `openapi.yaml`'dan **44 ucun hepsini** tek tıkla
üretebilirsin — ama o koleksiyon birbirinden bağımsız, doğrulamasız isteklerden
oluşur. Buradaki paketin değeri başka: istekler **birbirine bağlı bir akış**
kurar, her adım bir öncekinin ürettiği değeri kullanır ve her istek gerçek bir
iddia taşır.

İkisi birbirinin yerine geçmez: sözleşmeden üretilen koleksiyon **keşif**
içindir, bu paket **regresyon** içindir.

## Tekrar edilebilirlik nasıl sağlanıyor?

Paket ilk istekte **yeni bir sandbox açar**. Yani her koşum temiz veriden
başlar; "önce sıfırla" adımına ihtiyaç duymaz ve iki koşum birbirini etkilemez.
Temiz durum kurulumla değil **tasarımla** garanti ediliyor.

## Kurulum ve koşum

```bash
# Newman bir Node.js aracıdır
npm install -g newman newman-reporter-htmlextra

# Yığının ayakta olduğunu doğrula (Windows'ta curl.exe)
curl.exe http://localhost:4000/health

# Koş
newman run qa-shop.postman_collection.json -e qa-shop.postman_environment.json --reporters cli,htmlextra --reporter-htmlextra-export rapor.html
```

Çıkış kodu **0 değilse** en az bir doğrulama başarısız demektir — bir pipeline
adımı tam olarak buna bakar. Windows'ta çıkış kodunu görmek için:

```powershell
echo $LASTEXITCODE
```

## Paketin içindekiler

| Klasör | Ne kanıtlar |
|---|---|
| 1 · Kurulum | Yığın ayakta, tohum veri klonlanmış (120 ürün / 150 sipariş) |
| 2 · Kimlik | Giriş çalışıyor, token doğru kullanıcıyı temsil ediyor, zayıf parola reddediliyor |
| 3 · Katalog | Sayfalama sözleşmesi eksiksiz, **sıralama gerçekten uygulanmış**, pasif ürün listede yok |
| 4 · Sepet | Ara toplam satırlardan hesaplanıyor, **stok rezerve ediliyor**, kupon oranı doğru, süresi geçmiş kupon ayrı kodla reddediliyor |
| 5 · Sipariş | Mutabakat tutuyor, stok düşüyor, fatura tutarlı, **ödemesiz kargo engelleniyor**, mükerrer ödeme reddediliyor, kargolanmış sipariş iptal edilemiyor |
| 6 · Kusur | Katalog okunuyor, uydurma anahtar reddediliyor, sıfırlama kusurları kapatıyor |

Koleksiyon düzeyinde **her isteğe** uygulanan üç ortak doğrulama var: cevap
süresi, correlation id başlığı, ve hata durumunda gövdenin tek tip sözleşmeye
uyması.

## Testinin gerçekten baktığını kanıtla

Paket ilk koşumda **tamamen yeşil** döner. Bu iyi bir şey ama tehlikeli bir his:
her zaman yeşil kalan bir test ile hiçbir şeye bakmayan bozuk bir test, rapor
ekranında birbirinin aynısıdır.

Kanıtlamak için bir kusur aç ve tekrar koş:

```bash
KEY=<sandbox anahtarin>

# Stok düşürmeyi kapat
curl -X PATCH http://localhost:4000/api/v1/sandbox/bugs -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' -d '{"skip_stock_decrement":true}'
```

Hangi anahtarın hangi doğrulamayı düşürmesi gerektiği:

| Anahtar | Düşmesi gereken doğrulama |
|---|---|
| `skip_reserve` | 4 · Sepet → "Satılabilir adet 2 azaldı" |
| `skip_stock_decrement` | 5 · Sipariş → "Stok gerçekten düştü" |
| `discount_twice` | 5 · Sipariş → "Mutabakat: genel toplam bileşenleriyle tutuyor" |
| `wrong_line_total` | 5 · Sipariş → "Fatura kendi tutarlılığını beyan ediyor" |
| `weak_password_accepted` | 2 · Kimlik → "Zayıf parola 422 ile reddedildi" |

Beklenen doğrulama düşmüyorsa, o test bakmadığını sandığın şeye bakıyor
demektir. Kusuru kapatmak için `false` gönder ya da `POST /sandbox/reset` çağır.

> Not: `qa-shop/api` içindeki `npm test`, bu koleksiyonun sözleşmeyle uyumunu ve
> her isteğin doğrulama taşıdığını **Docker olmadan** denetler. Koleksiyonu
> düzenlersen önce onu koştur.
