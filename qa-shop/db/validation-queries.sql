-- ============================================================================
-- QA Shop — VERİ DOĞRULAMA SORGU KÜTÜPHANESİ
--
-- Bu dosya bir "SQL test paketi"dir. Her sorgunun sözleşmesi aynı:
--
--        0 satır  = GEÇTİ        ·        ≥1 satır = KALDI
--
-- Böylece hepsi tek bir özet sorguda toplanabilir (Bölüm Z) ve bir ekran
-- görüntüsü olarak paylaşılabilir.
--
-- KULLANIM: sorguların hepsinde :sandbox parametresi var. psql'de:
--     \set sandbox '00000000-0000-0000-0000-000000000000'
-- DBeaver'da parametre desteklenmiyorsa değeri elle yapıştır.
--
-- ⚠ ÖNEMLİ: Her zaman yeşil kalan bir kontrol ile hiçbir şeye bakmayan bir
-- kontrol, rapor ekranında birbirinin aynısıdır. Bir sorgunun gerçekten
-- çalıştığını görmenin tek yolu, bozuk durumu bilerek üretip KIRMIZIYA
-- döndüğünü görmektir — Bölüm F bunun içindir. Bir sorguya güvenmeden
-- önce oradan geçir.
--
-- Bu paket bir başlangıç noktasıdır, tam bir kapsam listesi değil. Şemada
-- burada hiç sorgusu olmayan kurallar var; onları kendin yazacaksın.
-- ============================================================================

\set sandbox '00000000-0000-0000-0000-000000000000'


-- ════════════════════════════════════════════════════════════════════════════
-- A. MUTABAKAT — arayüzün ASLA gösteremeyeceği hatalar
-- ════════════════════════════════════════════════════════════════════════════

-- A1 · Sipariş toplamı kendi bileşenleriyle tutmuyor
-- Ne bakar: siparişin genel toplamı, kendi bileşenlerinden (ara toplam, indirim,
-- kargo) türetiliyor mu. Arayüz grand_total'ı olduğu gibi basar, yani bu eşitliği
-- ekrana bakarak doğrulayamazsın.
select o.order_no,
       o.subtotal, o.discount_total, o.shipping_total, o.grand_total,
       (o.subtotal - o.discount_total + o.shipping_total) as beklenen
  from orders o
 where o.sandbox_id = :'sandbox'
   and o.grand_total <> (o.subtotal - o.discount_total + o.shipping_total);


-- A2 · Sipariş ara toplamı, satırların toplamına eşit değil
-- Ne bakar: sipariş başlığında yazan ara toplam, o siparişin satır
-- toplamlarının toplamıyla aynı mı.
select o.order_no,
       o.subtotal                    as baslikta_yazan,
       coalesce(sum(oi.line_total),0) as satirlarin_toplami,
       o.subtotal - coalesce(sum(oi.line_total),0) as fark
  from orders o
  left join order_items oi on oi.order_id = o.id
 where o.sandbox_id = :'sandbox'
 group by o.id, o.order_no, o.subtotal
having o.subtotal <> coalesce(sum(oi.line_total), 0);


-- A3 · Satır toplamı, adet × birim fiyata eşit değil
-- Ne bakar: her sipariş satırının kendi toplamı, o satırın adedi ile birim
-- fiyatının çarpımına eşit mi.
select o.order_no, oi.name_snapshot, oi.qty, oi.unit_price, oi.line_total,
       round(oi.qty * oi.unit_price, 2) as beklenen
  from order_items oi
  join orders o on o.id = oi.order_id
 where oi.sandbox_id = :'sandbox'
   and oi.line_total <> round(oi.qty * oi.unit_price, 2);


-- A4 · Ödeme tutarı sipariş tutarını tutmuyor
-- Ne bakar: başarılı ya da iade edilmiş bir ödemenin tutarı, bağlı olduğu
-- siparişin genel toplamıyla aynı mı.
select o.order_no, o.grand_total, p.amount, p.status
  from payments p
  join orders o on o.id = p.order_id
 where p.sandbox_id = :'sandbox'
   and p.status in ('success','refunded')
   and p.amount <> o.grand_total;


-- ════════════════════════════════════════════════════════════════════════════
-- B. REFERANS BÜTÜNLÜĞÜ VE KİRACI İZOLASYONU
-- ════════════════════════════════════════════════════════════════════════════

-- B1 · Kiracı sızıntısı: sipariş satırı, siparişten BAŞKA bir sandbox'a ait
-- Ne bakar: bir sipariş satırının tenant kapsamı, bağlı olduğu siparişin
-- tenant kapsamıyla aynı mı.
-- FK bu soruya cevap VERMEZ: FK yalnızca "bir yere bağlı mı" diye bakar,
-- "DOĞRU tenant kapsamına mı bağlı" diye bakmaz.
select o.order_no, oi.id as order_item_id,
       o.sandbox_id as siparis_sandbox, oi.sandbox_id as satir_sandbox
  from order_items oi
  join orders o on o.id = oi.order_id
 where oi.sandbox_id <> o.sandbox_id;

-- B2 · Aynı sızıntı, sepet tarafında
-- Ne bakar: bir sepet satırının tenant kapsamı, bağlı olduğu sepetin
-- tenant kapsamıyla aynı mı.
select c.id as cart_id, ci.id as cart_item_id,
       c.sandbox_id as sepet_sandbox, ci.sandbox_id as satir_sandbox
  from cart_items ci
  join carts c on c.id = ci.cart_id
 where ci.sandbox_id <> c.sandbox_id;

-- B3 · Varyantı başka bir tenant kullanıcısının ürününe bağlı
-- Ne bakar: bir varyantın tenant kapsamı, bağlı olduğu ürünün kapsamıyla aynı mı.
select v.sku, v.sandbox_id as varyant_sandbox, p.sandbox_id as urun_sandbox
  from product_variants v
  join products p on p.id = v.product_id
 where v.sandbox_id <> p.sandbox_id;

-- B4 · Satırı olmayan sipariş (boş sipariş)
-- Ne bakar: hiç satırı olmayan bir sipariş başlığı var mı.
select o.order_no, o.status, o.grand_total, o.placed_at
  from orders o
  left join order_items oi on oi.order_id = o.id
 where o.sandbox_id = :'sandbox'
   and oi.id is null;

-- B5 · Stoğu olmayan varyant (envanter kaydı hiç açılmamış)
-- Ne bakar: her varyantın bir envanter kaydı var mı.
-- LEFT JOIN + IS NULL kalıbı: "olması gereken ama olmayan" satırı bulmanın yolu.
select v.sku, p.name
  from product_variants v
  join products p on p.id = v.product_id
  left join inventory i on i.variant_id = v.id
 where v.sandbox_id = :'sandbox'
   and i.variant_id is null;


-- ════════════════════════════════════════════════════════════════════════════
-- C. İŞ KURALI İHLALLERİ
-- ════════════════════════════════════════════════════════════════════════════

-- C1 · Rezerve adet, mevcut stoktan fazla (oversell)
-- Ne bakar: bir varyantta rezerve edilmiş adet, eldeki stok adedini aşıyor mu.
select p.name, v.sku, i.stock_qty, i.reserved_qty
  from inventory i
  join product_variants v on v.id = i.variant_id
  join products p on p.id = v.product_id
 where i.sandbox_id = :'sandbox'
   and i.reserved_qty > i.stock_qty;


-- C2 · Kupon kullanım limiti aşılmış
-- Ne bakar: bir kuponun kullanım sayısı, tanımlı üst sınırını aşmış mı.
select code, max_uses, used_count, used_count - max_uses as asim
  from coupons
 where sandbox_id = :'sandbox'
   and max_uses is not null
   and used_count > max_uses;


-- C3 · Süresi geçmiş kuponla verilmiş sipariş
-- Ne bakar: indirim almış siparişlerde kupon, siparişin verildiği ANDA
-- geçerlilik aralığının içinde miydi.
-- Zaman mantığı testi: kuponun sipariş ANINDA geçerli olması gerekir,
-- bugün geçerli olması değil. `now()` ile karşılaştırmak sessiz bir hata olurdu.
select o.order_no, o.coupon_code, o.placed_at,
       c.valid_from, c.valid_to, o.discount_total
  from orders o
  join coupons c on c.code = o.coupon_code and c.sandbox_id = o.sandbox_id
 where o.sandbox_id = :'sandbox'
   and o.discount_total > 0
   and (
        (c.valid_to   is not null and o.placed_at > c.valid_to)
     or (c.valid_from is not null and o.placed_at < c.valid_from)
   );


-- C4 · Kupon alt tutar şartı sağlanmadan indirim uygulanmış
-- Ne bakar: indirim uygulanmış siparişlerde sepet tutarı, kuponun istediği
-- alt sınırı karşılıyor mu.
select o.order_no, o.coupon_code, o.subtotal, c.min_total
  from orders o
  join coupons c on c.code = o.coupon_code and c.sandbox_id = o.sandbox_id
 where o.sandbox_id = :'sandbox'
   and o.discount_total > 0
   and o.subtotal < c.min_total;


-- C5 · İptal edilmiş siparişin kargosu var
-- Ne bakar: iptal edilmiş bir siparişe bağlı kargo kaydı var mı.
select o.order_no, o.status, s.status as kargo_durumu, s.tracking_no
  from orders o
  join shipments s on s.order_id = o.id
 where o.sandbox_id = :'sandbox'
   and o.status = 'cancelled';


-- C6 · Kargolanmış ama ödemesi başarılı olmayan sipariş
-- Ne bakar: kargolanmış ya da teslim edilmiş her siparişin başarılı bir
-- ödemesi var mı.
select o.order_no, o.status as siparis, p.status as odeme, o.grand_total
  from orders o
  left join payments p on p.order_id = o.id
 where o.sandbox_id = :'sandbox'
   and o.status in ('shipped','delivered')
   and (p.id is null or p.status <> 'success');


-- C7 · Onaylanmamış yorum, ürünün ortalama puanını etkiliyor mu?
-- Ne bakar: yalnızca onaylı yorumlardan hesaplanan ortalama ile tüm
-- yorumlardan hesaplanan ortalama arasında fark olan ürünleri listeler.
-- Bu bir ihlal listesi DEĞİLDİR; iki sayının ayrıştığı ürünleri gösterir.
select p.sku, p.name,
       round(avg(r.rating) filter (where r.status = 'approved'), 2) as onayli_ortalama,
       round(avg(r.rating), 2)                                     as tum_yorumlar_ortalamasi,
       count(*) filter (where r.status <> 'approved')              as onaysiz_adet
  from products p
  join reviews r on r.product_id = p.id
 where p.sandbox_id = :'sandbox'
 group by p.id, p.sku, p.name
having count(*) filter (where r.status <> 'approved') > 0
   and round(avg(r.rating) filter (where r.status = 'approved'), 2)
       is distinct from round(avg(r.rating), 2)
 order by onaysiz_adet desc
 limit 20;


-- C8 · Pasif ürünün siparişi var mı? (soft delete davranışı)
-- Ne bakar: pasif (soft delete edilmiş) ürünlerden geçmişte sipariş verilmiş
-- olanları listeler. Bu bir ihlal listesi DEĞİLDİR — kural "pasif ürün
-- katalogda görünmez ama geçmiş siparişlerde durur" der, yani satır dönmesi
-- beklenen bir durumdur.
select p.sku, p.name, p.is_active, count(distinct o.id) as siparis_sayisi
  from products p
  join product_variants v on v.product_id = p.id
  join order_items oi on oi.variant_id = v.id
  join orders o on o.id = oi.order_id
 where p.sandbox_id = :'sandbox'
   and p.is_active = false
 group by p.id, p.sku, p.name, p.is_active;


-- ════════════════════════════════════════════════════════════════════════════
-- D. VERİ KALİTESİ
-- ════════════════════════════════════════════════════════════════════════════

-- D1 · Büyük/küçük harf farkıyla tekrar eden e-posta
-- Ne bakar: yalnızca büyük/küçük harf yazımıyla ayrışan e-postaları gruplar.
-- Veritabanının UNIQUE kısıtı harf duyarlıdır; bir uygulamanın aynı varsayımla
-- çalışıp çalışmadığı ayrı bir sorudur.
select lower(email) as normalize_email, count(*) as adet,
       string_agg(email, ' | ') as varyantlar
  from users
 where sandbox_id = :'sandbox'
 group by lower(email)
having count(*) > 1;


-- D2 · Markası olmayan ürünler (NULL FK)
-- Ne bakar: marka bağlantısı NULL olan ürünlerin sayısı. Bu bir ihlal listesi
-- DEĞİLDİR, rapordur: INNER JOIN kullanan bir listede bu ürünler SESSİZCE
-- kaybolur — JOIN tipini test etmenin en somut yolu bu sayıyı bilmektir.
select count(*) as markasiz_urun_sayisi
  from products
 where sandbox_id = :'sandbox'
   and brand_id is null
having count(*) > 0;


-- D3 · Fiyatı sıfır veya negatif ürün
-- Ne bakar: fiyatı sıfır ya da negatif olan ürünler.
select sku, name, price
  from products
 where sandbox_id = :'sandbox'
   and price <= 0;


-- D4 · Varsayılan adresi olmayan veya birden fazla olan kullanıcı
-- Ne bakar: her kullanıcının varsayılan adres sayısı tam olarak bir mi.
select u.email,
       count(*) filter (where a.is_default) as varsayilan_adres_sayisi
  from users u
  left join addresses a on a.user_id = u.id
 where u.sandbox_id = :'sandbox'
 group by u.id, u.email
having count(*) filter (where a.is_default) <> 1;


-- D5 · Gelecek tarihli sipariş
-- Ne bakar: sipariş tarihi şu andan ileride olan kayıtlar.
select order_no, placed_at
  from orders
 where sandbox_id = :'sandbox'
   and placed_at > now();


-- ════════════════════════════════════════════════════════════════════════════
-- E. LOG ANALİZİ — kök neden bulma pratiği
-- ════════════════════════════════════════════════════════════════════════════

-- E1 · Hangi işlem en çok hata veriyor?
-- Ne bakar: işlem (action) başına toplam ve hatalı istek sayısını, hata
-- yüzdesine göre sıralar.
-- Bir bug'ın kök nedenine giden ilk adım: hatanın NEREDE yoğunlaştığı.
select action,
       count(*)                                  as toplam,
       count(*) filter (where level = 'ERROR')    as hata,
       round(100.0 * count(*) filter (where level = 'ERROR') / count(*), 1) as hata_yuzdesi
  from audit_log
 where sandbox_id = :'sandbox'
 group by action
 order by hata_yuzdesi desc, toplam desc;


-- E2 · Bir hatanın tam zinciri (correlation_id ile)
-- Ne bakar: tek bir correlation_id'nin tüm log satırlarını zaman sırasıyla getirir.
-- Tek bir log satırı hiçbir şey anlatmaz; anlatan şey ZİNCİRDİR.
-- Önce E1'den bir hata bul, correlation_id'sini buraya koy.
select at, level, actor, action, entity, entity_id,
       detail->>'statusCode' as status,
       detail->>'durationMs' as sure_ms
  from audit_log
 where sandbox_id = :'sandbox'
   and correlation_id = (
        select correlation_id from audit_log
         where sandbox_id = :'sandbox' and level = 'ERROR'
         order by at desc limit 1
   )
 order by at;


-- E3 · Yavaş istekler (p95 üstü)
-- Ne bakar: her işlemin kendi p95 eşiğini hesaplar ve o eşiğin üstünde kalan
-- istekleri listeler.
-- Eşik sabit yazılmaz ("1000ms yavaştır" demek keyfîdir); her işlemin KENDİ
-- dağılımından hesaplanır.
--
-- İki teknik not:
--  · percentile_cont bir "ordered-set aggregate"tir ve OVER ile pencere
--    fonksiyonu olarak KULLANILAMAZ — bu yüzden eşik ayrı bir CTE'de
--    GROUP BY ile hesaplanıp geri join ediliyor.
--  · JSON'da alan varlığı `?` operatörüyle DEĞİL, `->> ... is not null` ile
--    kontrol ediliyor: `?` işaretini JDBC (DBeaver, REST Assured) bir
--    parametre yer tutucusu sanıp sorguyu bozar.
with parsed as (
    select action, (detail->>'durationMs')::int as ms
      from audit_log
     where sandbox_id = :'sandbox'
       and detail->>'durationMs' is not null
),
thresholds as (
    select action, percentile_cont(0.95) within group (order by ms) as p95
      from parsed
     group by action
)
select p.action, p.ms, round(t.p95) as p95_esik
  from parsed p
  join thresholds t on t.action = p.action
 where p.ms > t.p95
 order by p.ms desc
 limit 25;


-- E4 · Hata saatlere göre kümeleniyor mu? (deploy/cron korelasyonu)
-- Ne bakar: hataları saat kovalarına bölerek yoğunlaştıkları saatleri gösterir.
select date_trunc('hour', at) as saat,
       count(*) filter (where level = 'ERROR') as hata,
       count(*)                                as toplam
  from audit_log
 where sandbox_id = :'sandbox'
 group by 1
having count(*) filter (where level = 'ERROR') > 0
 order by hata desc
 limit 20;


-- ════════════════════════════════════════════════════════════════════════════
-- G. ANALİZ SORGULARI — pass/fail değil, rapor
-- (Mülakatta ve raporlamada sık istenen kalıplar)
-- ════════════════════════════════════════════════════════════════════════════

-- G1 · Ciroya göre ilk 10 ürün (window function ile sıra numarası)
-- Ne bakar: iptal ve iade dışındaki siparişlerden ürün başına ciroyu hesaplar.
select rank() over (order by sum(oi.line_total) desc) as sira,
       p.sku, p.name,
       sum(oi.qty)        as satilan_adet,
       sum(oi.line_total) as ciro
  from order_items oi
  join product_variants v on v.id = oi.variant_id
  join products p on p.id = v.product_id
  join orders o on o.id = oi.order_id
 where oi.sandbox_id = :'sandbox'
   and o.status not in ('cancelled','returned')
 group by p.id, p.sku, p.name
 order by ciro desc
 limit 10;


-- G2 · Aylık ciro ve sipariş adedi
-- Ne bakar: ay kovalarına göre sipariş adedi, ciro ve ortalama sepet tutarı.
select to_char(date_trunc('month', o.placed_at), 'YYYY-MM') as ay,
       count(*)                as siparis,
       sum(o.grand_total)      as ciro,
       round(avg(o.grand_total), 2) as ortalama_sepet
  from orders o
 where o.sandbox_id = :'sandbox'
   and o.status not in ('cancelled','returned')
 group by 1
 order by 1;


-- G3 · Hiç sipariş vermemiş kullanıcılar (LEFT JOIN + IS NULL)
-- Ne bakar: hiçbir siparişe bağlanmamış kullanıcılar.
select u.email, u.created_at
  from users u
  left join orders o on o.user_id = u.id
 where u.sandbox_id = :'sandbox'
   and o.id is null
 order by u.created_at;


-- G4 · Kategori ağacı (self-join)
-- Ne bakar: üst-alt kategori çiftlerini ve alt kategori başına aktif ürün sayısını.
select parent.name as ust_kategori,
       child.name  as alt_kategori,
       count(p.id) as urun_sayisi
  from categories child
  join categories parent on parent.id = child.parent_id
  left join products p on p.category_id = child.id and p.is_active
 where child.sandbox_id = :'sandbox'
 group by parent.name, child.name
 order by parent.name, child.name;


-- ════════════════════════════════════════════════════════════════════════════
-- Z. TEK EKRANDA TÜM KONTROLLER
--
-- Yukarıdaki pass/fail sorgularını tek tabloya toplar. Değerlendirme
-- görüşmesinde veya sprint sonu raporunda gösterilecek çıktı budur.
-- ════════════════════════════════════════════════════════════════════════════

select kontrol, ihlal,
       case when ihlal = 0 then 'GEÇTİ' else 'KALDI' end as sonuc
from (
    select 'A1 · Sipariş toplamı bileşenleriyle tutmuyor' as kontrol, count(*) as ihlal
      from orders o
     where o.sandbox_id = :'sandbox'
       and o.grand_total <> (o.subtotal - o.discount_total + o.shipping_total)

    union all
    select 'A2 · Ara toplam, satır toplamına eşit değil',
           count(*)
      from (select o.id
              from orders o
              left join order_items oi on oi.order_id = o.id
             where o.sandbox_id = :'sandbox'
             group by o.id, o.subtotal
            having o.subtotal <> coalesce(sum(oi.line_total), 0)) x

    union all
    select 'A3 · Satır toplamı ≠ adet × birim fiyat',
           count(*)
      from order_items oi
     where oi.sandbox_id = :'sandbox'
       and oi.line_total <> round(oi.qty * oi.unit_price, 2)

    union all
    select 'A4 · Ödeme tutarı sipariş tutarını tutmuyor',
           count(*)
      from payments p join orders o on o.id = p.order_id
     where p.sandbox_id = :'sandbox'
       and p.status in ('success','refunded')
       and p.amount <> o.grand_total

    union all
    select 'B1 · Kiracı sızıntısı (sipariş satırı)',
           count(*)
      from order_items oi join orders o on o.id = oi.order_id
     where oi.sandbox_id <> o.sandbox_id

    union all
    select 'B2 · Kiracı sızıntısı (sepet satırı)',
           count(*)
      from cart_items ci join carts c on c.id = ci.cart_id
     where ci.sandbox_id <> c.sandbox_id

    union all
    select 'B4 · Satırı olmayan sipariş',
           count(*)
      from orders o
      left join order_items oi on oi.order_id = o.id
     where o.sandbox_id = :'sandbox' and oi.id is null

    union all
    select 'B5 · Envanter kaydı olmayan varyant',
           count(*)
      from product_variants v
      left join inventory i on i.variant_id = v.id
     where v.sandbox_id = :'sandbox' and i.variant_id is null

    union all
    select 'C1 · Rezerve adet stoktan fazla',
           count(*)
      from inventory
     where sandbox_id = :'sandbox' and reserved_qty > stock_qty

    union all
    select 'C2 · Kupon kullanım limiti aşılmış',
           count(*)
      from coupons
     where sandbox_id = :'sandbox'
       and max_uses is not null and used_count > max_uses

    union all
    select 'C3 · Süresi geçmiş kuponla indirim',
           count(*)
      from orders o
      join coupons c on c.code = o.coupon_code and c.sandbox_id = o.sandbox_id
     where o.sandbox_id = :'sandbox' and o.discount_total > 0
       and ((c.valid_to is not null and o.placed_at > c.valid_to)
         or (c.valid_from is not null and o.placed_at < c.valid_from))

    union all
    select 'C4 · Alt tutar şartı sağlanmadan indirim',
           count(*)
      from orders o
      join coupons c on c.code = o.coupon_code and c.sandbox_id = o.sandbox_id
     where o.sandbox_id = :'sandbox' and o.discount_total > 0
       and o.subtotal < c.min_total

    union all
    select 'C5 · İptal siparişin kargosu var',
           count(*)
      from orders o join shipments s on s.order_id = o.id
     where o.sandbox_id = :'sandbox' and o.status = 'cancelled'

    union all
    select 'C6 · Ödemesiz kargolanmış sipariş',
           count(*)
      from orders o
      left join payments p on p.order_id = o.id
     where o.sandbox_id = :'sandbox'
       and o.status in ('shipped','delivered')
       and (p.id is null or p.status <> 'success')

    union all
    select 'D1 · Harf farkıyla tekrar eden e-posta',
           count(*)
      from (select lower(email) from users
             where sandbox_id = :'sandbox'
             group by lower(email) having count(*) > 1) y

    union all
    select 'D3 · Fiyatı sıfır/negatif ürün',
           count(*)
      from products where sandbox_id = :'sandbox' and price <= 0

    union all
    select 'D5 · Gelecek tarihli sipariş',
           count(*)
      from orders where sandbox_id = :'sandbox' and placed_at > now()
) checks
order by ihlal desc, kontrol;


-- ════════════════════════════════════════════════════════════════════════════
-- F. KUSUR ENJEKSİYONU — "bu sorgu gerçekten bir şey ölçüyor mu?"
--
-- Bir kontrolün doğru çalıştığını kanıtlamanın TEK yolu, bozuk durumu bilerek
-- üretip kırmızıya döndüğünü görmektir. Aşağıdaki her blok bir kusur enjekte
-- eder, ilgili kontrolü çalıştırır ve geri alır.
--
-- Hepsi TRANSACTION içinde ve ROLLBACK ile biter — veri kalıcı olarak
-- bozulmaz. Kalıcı bozmak istersen COMMIT yaz (sonra `POST /sandbox/reset`).
-- ════════════════════════════════════════════════════════════════════════════

-- F1 · A1 kontrolünü kırmızıya düşür: bir siparişin toplamını boz
begin;
    -- NOT: UPDATE, ORDER BY/LIMIT almaz (SELECT'ten farkı budur); tek satır
    -- hedeflemek için alt sorguyla id seçilir.
    update orders
       set grand_total = grand_total + 100
     where id = (select id from orders
                  where sandbox_id = :'sandbox'
                  order by order_no limit 1);

    -- Şimdi A1, 1 satır dönmeli. 0 dönüyorsa A1 BOZUK.
    select 'A1 kontrolü' as test, count(*) as yakalanan,
           case when count(*) > 0 then 'KONTROL ÇALIŞIYOR' else 'KONTROL BOZUK!' end as sonuc
      from orders o
     where o.sandbox_id = :'sandbox'
       and o.grand_total <> (o.subtotal - o.discount_total + o.shipping_total);
rollback;


-- F2 · C1 kontrolünü kırmızıya düşür: oversell üret
begin;
    update inventory
       set reserved_qty = stock_qty + 5
     where sandbox_id = :'sandbox'
       and variant_id = (select min(variant_id) from inventory where sandbox_id = :'sandbox');

    select 'C1 kontrolü' as test, count(*) as yakalanan,
           case when count(*) > 0 then 'KONTROL ÇALIŞIYOR' else 'KONTROL BOZUK!' end as sonuc
      from inventory
     where sandbox_id = :'sandbox' and reserved_qty > stock_qty;
rollback;


-- F3 · B4 kontrolünü kırmızıya düşür: satırsız sipariş üret
begin;
    insert into orders (sandbox_id, order_no, user_id, status,
                        subtotal, discount_total, shipping_total, grand_total)
    select :'sandbox', 'ORD-BROKEN-1', min(id), 'placed', 0, 0, 0, 0
      from users where sandbox_id = :'sandbox';

    select 'B4 kontrolü' as test, count(*) as yakalanan,
           case when count(*) > 0 then 'KONTROL ÇALIŞIYOR' else 'KONTROL BOZUK!' end as sonuc
      from orders o
      left join order_items oi on oi.order_id = o.id
     where o.sandbox_id = :'sandbox' and oi.id is null;
rollback;


-- F4 · D1 kontrolünü kırmızıya düşür: harf farkıyla mükerrer e-posta
begin;
    insert into users (sandbox_id, email, password_hash, name)
    values (:'sandbox', 'DEMO@qashop.test', 'scrypt$00$00', 'Kopya Kullanıcı');

    select 'D1 kontrolü' as test, count(*) as yakalanan,
           case when count(*) > 0 then 'KONTROL ÇALIŞIYOR' else 'KONTROL BOZUK!' end as sonuc
      from (select lower(email) from users
             where sandbox_id = :'sandbox'
             group by lower(email) having count(*) > 1) y;
rollback;
