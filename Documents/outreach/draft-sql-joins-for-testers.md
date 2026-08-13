# Draft — dev.to / Medium — SQL JOINs for Testers

**Working title:** SQL JOINs, Explained the Way a Tester Actually Needs Them

---

## Yayınlama talimatı (canonical)

Bu yazı iki sürüm içerir: aşağıdaki **Türkçe teaser** (Medium Türkiye ve
Türkçe QA topluluklarına özel) ve altındaki **İngilizce tam metin** (dev.to /
uluslararası Medium için). Hangi platforma yayınlanırsa yayınlansın:

- Platform `canonical_url` alanı destekliyorsa (dev.to bunu destekler),
  Türkçe teaser için `https://learnqa.dev/sql/sql-joins`, İngilizce tam
  metin için `https://learnqa.dev/en/sql/sql-joins` girilmeli.
- Desteklemiyorsa (çoğu Medium hesabı desteklemez), yazının SONUNDA "asıl
  yazı burada" linkini bırakmak yeterli — TAM METNİ canonical'sız
  yayınlama, yalnızca teaser'ı yayınla.

Bu ayrım önemli: 8 haftalık yeni bir alan adı, tam metnini canonical
belirtmeden başka bir platforma kopyalarsa, o platformun otoritesi daha
yüksek olduğu için arama motoru "asıl" içeriği ORADA sanır ve
learnqa.dev'deki sürüm zarar görür.

---

## Türkçe Teaser — Medium Türkiye / Türkçe QA toplulukları

**Başlık önerisi:** SQL JOIN'leri Bir Test Mühendisinin Gerçekten İhtiyacı Olduğu Şekilde

Çoğu SQL eğitimi JOIN'i bir veritabanı tasarım konusu olarak öğretir: şemayı
normalize et, veriyi tablolara böl, sonra raporlama için tekrar birleştir.
Bu doğru ama bir QA mühendisinin bunu bilmesi gereken asıl sebep bu değil.

Bir test mühendisinin JOIN'e ihtiyacı vardır çünkü test ettiğin şey — "bu API
isteği siparişi gerçekten doğru oluşturdu mu?" — genelde birden fazla tabloda
yaşar. Sipariş başlığı bir tabloda, satır kalemleri başka bir tabloda,
müşteri kaydı üçüncü bir tabloda. Tek seferde tek tablo sorgulayabiliyorsan,
isteğin iddia ettiğini gerçekten yapıp yapmadığını doğrulayamazsın.

**Sürekli kullanacağın JOIN: INNER JOIN**

```sql
SELECT orders.id, orders.status, customers.email
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
WHERE orders.id = 4821;
```

Bu, "4821 numaralı siparişin durumu ne, hangi müşteri verdi?" sorusunu tek
sorguda cevaplar — iki ayrı istek atıp ID'leri elle eşleştirmek yerine.
Backend doğrulama testlerinin neredeyse tamamında yazacağın JOIN budur.

**Gerçekten hata bulan JOIN: LEFT JOIN**

```sql
SELECT orders.id, order_items.id AS item_id
FROM orders
LEFT JOIN order_items ON order_items.order_id = orders.id
WHERE orders.id = 4821;
```

`INNER JOIN` yalnızca iki tarafın da eşleştiği satırları döndürür. `LEFT
JOIN` ise sol tablodaki HER satırı, eşleşme olsa da olmasa da tutar — ve
test için değerli kılan tam olarak bu. Satır kalemi olması gereken bir
sipariş için `order_items.id` `NULL` dönüyorsa, gerçek bir defect bulmuş
olursun: sipariş oluşturuldu ama kalemleri hiç yazılmadı. `INNER JOIN` bu
siparişi sonuçlardan tamamen SESSİZCE gizlerdi, çünkü yalnızca eşleşenleri
gösterir. Veri doğrulamasında "eksik", filtrelenmesi gereken değil GÖRMEN
gereken bir sonuçtur.

Asıl beceri JOIN sözdizimini ezberlemek değil — hangi JOIN'in sorduğun soruyu
cevapladığını bilmektir. "Bir eşleşme var mı?" `INNER JOIN` sorusu. "Bu
taraftaki her satırın eşleşmesi var mı, hangilerinde yok?" `LEFT JOIN`
sorusu. Gerçek backend bug'larının çoğu — kalemsiz oluşturulan sipariş,
profilsiz kullanıcı kaydı, faturasız kalan ödeme — `INNER JOIN`'de hiç
çalıştırmayı akıl etmediğin eksik satırlar olarak değil, `LEFT JOIN`'in sağ
tarafındaki `NULL`'lar olarak ortaya çıkar.

Bir API çağrısının veritabanında beklenen yan etkiyi yarattığını doğrularken
önce `LEFT JOIN` dene — sana hem "satır var" hem "ilişkili satır eksik"
bilgisini tek sorguda verir.

`GROUP BY`+`HAVING` ile toplu doğrulama, subquery'ler ve bu sorguları
doğrudan çalıştırabileceğin tarayıcı içi SQL sandbox dahil daha uzun anlatımı
[LearnQA.dev'deki SQL JOIN'ler bölümünde](https://learnqa.dev/sql/sql-joins)
bulabilirsin — [tüm SQL kursu](https://learnqa.dev/sql) ücretsiz ve
interaktif.

---

## İngilizce Tam Metin (dev.to / uluslararası Medium)

Most SQL tutorials teach JOINs as a database design topic: normalize your
schema, split data across tables, then JOIN it back together for reporting.
That's true, but it's not why a QA engineer needs to know this.

A tester needs JOINs because the thing you're actually testing — "did this
API request correctly create an order?" — usually lives in more than one
table. The order header is in one table, its line items are in another, the
customer record is in a third. If you can only query one table at a time,
you can't actually verify the request did what it claimed.

## The one JOIN you'll use constantly: INNER JOIN

```sql
SELECT orders.id, orders.status, customers.email
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
WHERE orders.id = 4821;
```

This answers: "for order 4821, what's the status, and which customer placed
it?" — one query, instead of two round trips and matching IDs by hand. This
is the JOIN you'll write in almost every backend-validation test.

## The one that actually finds bugs: LEFT JOIN

```sql
SELECT orders.id, order_items.id AS item_id
FROM orders
LEFT JOIN order_items ON order_items.order_id = orders.id
WHERE orders.id = 4821;
```

`INNER JOIN` only returns rows where both sides match. `LEFT JOIN` keeps
every row from the left table regardless of whether a match exists — and
that's exactly what makes it useful for testing. If `order_items.id` comes
back `NULL` for an order that should have line items, you've just found a
real defect: the order was created, but the items never got written. An
`INNER JOIN` would have silently hidden that order from your results
entirely, because it only shows matches. For test data validation, "missing"
is a result you need to see, not one you want filtered out.

## Why this matters more than knowing the syntax

The actual skill isn't memorizing JOIN syntax — it's knowing which JOIN
answers the question you're actually asking. "Does a match exist?" is an
`INNER JOIN` question. "Does every row on this side have a match, and where
doesn't it?" is a `LEFT JOIN` question. Most real backend bugs — an order
created without items, a user record without a profile, a payment without a
linked invoice — surface as `NULL`s on the right side of a `LEFT JOIN`, not as
missing rows from an `INNER JOIN` you never thought to run.

## A useful habit

When validating that an API call had the expected side effect on the
database, default to `LEFT JOIN` first — it tells you both "the row exists"
and "the related row is missing," in one query. Switch to `INNER JOIN` once
you're specifically confirming that a relationship exists and don't care
about the orphan case.

---

*The full walkthrough — including `GROUP BY`+`HAVING` for aggregate
validation, subqueries, and a browser-based SQL sandbox you can run these
exact queries in — is part of a free SQL-for-QA course at LearnQA.dev.*

Canonical / full version: `https://learnqa.dev/en/sql/sql-joins`
