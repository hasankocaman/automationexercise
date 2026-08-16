# REST Assured — Java API test paketi

Postman koleksiyonuyla **aynı akışı** doğrulayan Java paketi. İkisi bilerek
paralel tutuldu: aynı sistemi iki farklı araçla test etmek, aracın hangi işi
kolaylaştırdığını ve neyi gizlediğini yan yana gösterir.

## Gereksinimler

| | |
|---|---|
| JDK | 17+ |
| Maven | 3.8+ |
| Yığın | `docker compose up -d` ile ayakta |

```bash
java -version    # 17 veya üstü
mvn -v
```

## Koşum

```bash
cd qa-shop/rest-assured
mvn test
```

Farklı bir adrese koşturmak için:

```bash
mvn test -Dqashop.baseUrl=http://localhost:4000
```

Tek bir sınıf:

```bash
mvn test -Dtest=OrderLifecycleTest
```

## Yığın kapalıyken ne olur?

Onlarca anlamsız bağlantı hatası yerine her sınıf **tek ve net** bir mesajla
durur:

```
Yigina ulasilamadi: http://localhost:4000
Once ayaga kaldir:  cd qa-shop && docker compose up -d
```

Bu bilinçli: hata mesajının kendisi de bir arayüzdür. Ayrıca API ayakta ama
veritabanı ölüyse mesaj bunu ayırt eder — "servis mi öldü, DB mi öldü" sorusu
ilk saniyede cevaplanır.

## Sınıflar

| Sınıf | Ne doğrular |
|---|---|
| `BaseTest` | Ortak kurulum: sağlık kontrolü, kendi sandbox'ını açma, giriş |
| `AuthTest` | Giriş, token'ın doğru kullanıcıyı temsil etmesi, zayıf parola / geçersiz e-posta / mükerrer kayıt reddi, **logout'un oturumu gerçekten iptal etmesi** |
| `CatalogTest` | Sayfalama sözleşmesi, **sıralamanın gerçekten uygulanması**, pasif ürün filtresi, satılabilir adet hesabı, kısa arama terimi reddi |
| `OrderLifecycleTest` | Sepet → sipariş → ödeme → kargo → teslim → iade zinciri, mutabakat, stok hareketi, 6 negatif senaryo |
| `BugFlagTest` | **Diğer testlerin geçerliliğini** sınar: kusuru açıp gerçekten bozulduğunu kanıtlar |

## İzolasyon nasıl sağlanıyor?

Her koşum **kendi sandbox'ını açar** (`BaseTest.kurulum`). Alternatif,
paylaşılan bir alanı her koşumdan önce sıfırlamaktı; o yol paralel koşumu
imkânsız kılar ve "benim testim başkasının verisini bozdu" sınıfından hatalar
üretir. Burada izolasyon kurulumla değil **tasarımla** sağlanıyor.

`BugFlagTest` bir adım daha ileri gider ve **kendi ayrı sandbox'ını** açar:
paylaşılan alanda kusur açsaydı, koşum sırasına bağlı olarak başka sınıfları
düşürür ve teşhisi çok zor bir kırılganlık üretirdi.

## Neden `OrderLifecycleTest` sıralı koşuyor?

Genel kural "her test bağımsız olmalı"dır ve doğrudur. Ama orada test edilen
şey tek tek adımlar değil, adımlar arasındaki **geçişlerdir**. Bir durum
makinesini bağımsız testlerle doğrulamak, her testin kendi kurulumunda aynı
zinciri baştan kurmasını gerektirir — o zaman da asıl test edilen şey kurulum
kodu olur.

## Testinin gerçekten baktığını kanıtla

`BugFlagTest` bunu otomatik yapar, ama elle de deneyebilirsin:

```bash
KEY=<sandbox anahtarin>
curl -X PATCH http://localhost:4000/api/v1/sandbox/bugs -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' -d '{"discount_twice":true}'
```

Sonra `OrderLifecycleTest`'i koştur: **"Sipariş oluşur ve mutabakat tutar"**
testi kırmızıya dönmeli. Dönmüyorsa o test, baktığını sandığın şeye bakmıyor.

| Anahtar | Kırmızıya dönmesi gereken test |
|---|---|
| `skip_reserve` | `03 · Sepete eklemek stoğu REZERVE eder` |
| `skip_stock_decrement` | `07 · Stok düşer, rezervasyon serbest kalır` |
| `discount_twice` | `06 · Sipariş oluşur ve mutabakat tutar` |
| `wrong_line_total` | `08 · Fatura kendi tutarlılığını beyan eder` |
| `weak_password_accepted` | `AuthTest → Zayıf parolayla kayıt 422 ile reddedilir` |
| `no_stock_restore_on_cancel` | `16 · İade edilir ve stok geri yüklenir` |

## Postman ile karşılaştırma

| | Postman / Newman | REST Assured |
|---|---|---|
| Değer taşıma | `pm.environment.set(...)` | `static` alanlar |
| Doğrulama | `pm.expect(...)` (Chai) | Hamcrest matcher + JUnit assert |
| Sıralama | Koleksiyondaki istek sırası | `@Order` + `@TestMethodOrder` |
| Raporlama | `newman-reporter-htmlextra` | Surefire raporu (`target/surefire-reports`) |
| Güçlü yanı | Hızlı keşif, sözleşmeden üretim | Tip güvenliği, karmaşık mantık, IDE desteği |
