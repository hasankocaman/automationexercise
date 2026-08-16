-- ============================================================================
-- QA Shop — tohum veri (ŞABLON sandbox'a yüklenir)
--
-- BELİRLENİMCİ: hiçbir yerde random() yok. Tüm dağılımlar modüler aritmetikle
-- üretilir — aynı dosya her makinede aynı veriyi kurar. Testler rastgele
-- veriye dayanamaz; "bazen 12 satır dönüyor" diyen bir sorgu hiçbir şeyi
-- doğrulamaz.
--
-- Tek istisna ZAMAN DAMGALARI: now() üstünden göreli üretilir (now() - 30 gün
-- gibi). Sabit tarih yazılsaydı "son 30 günün siparişleri" sorgusu bir yıl
-- sonra boş dönerdi. Yapı belirlenimci, takvim canlı.
--
-- TUTARLILIK: sipariş toplamları ELLE yazılmaz, satırlardan HESAPLANIR.
-- Böylece tohum veri kendi mutabakat kuralını ihlal etmez. Kirli veri görmek
-- isteyen validation-queries.sql'deki kusur enjeksiyon bölümünü kullanır.
--
-- Demo parolası (tüm tohum kullanıcılar): Password123!
-- ============================================================================

\set TPL '00000000-0000-0000-0000-000000000000'

-- ─── Şablon sandbox ─────────────────────────────────────────────────────────
insert into sandbox (id, api_key, label, is_template, expires_at)
values (:'TPL', 'template-not-usable', 'Şablon (klonlama kaynağı)', true, now() + interval '100 years');

-- ─── Markalar (8) ───────────────────────────────────────────────────────────
insert into brands (sandbox_id, name) values
    (:'TPL', 'Adidas'), (:'TPL', 'H&M'),   (:'TPL', 'Levis'),  (:'TPL', 'Madame'),
    (:'TPL', 'Mango'),  (:'TPL', 'Nike'),  (:'TPL', 'Polo'),   (:'TPL', 'Zara');

-- ─── Kategoriler: 4 üst + 8 alt ─────────────────────────────────────────────
insert into categories (sandbox_id, name, slug, parent_id) values
    (:'TPL', 'Clothing',    'clothing',    null),
    (:'TPL', 'Shoes',       'shoes',       null),
    (:'TPL', 'Accessories', 'accessories', null),
    (:'TPL', 'Outerwear',   'outerwear',   null);

insert into categories (sandbox_id, name, slug, parent_id)
select :'TPL', c.name, c.slug, p.id
  from (values
        ('T-Shirts', 'tshirts',  'clothing'),
        ('Shirts',   'shirts',   'clothing'),
        ('Dresses',  'dresses',  'clothing'),
        ('Jeans',    'jeans',    'clothing'),
        ('Sneakers', 'sneakers', 'shoes'),
        ('Boots',    'boots',    'shoes'),
        ('Bags',     'bags',     'accessories'),
        ('Coats',    'coats',    'outerwear')
       ) as c(name, slug, parent_slug)
  join categories p on p.sandbox_id = :'TPL' and p.slug = c.parent_slug;

-- ─── Ürünler (120) ──────────────────────────────────────────────────────────
-- Dikişler:  i % 13 = 0  → pasif ürün (soft delete)  → 9 ürün
--            i % 11 = 0  → markasız ürün (NULL FK)   → 10 ürün
insert into products (sandbox_id, sku, name, description, category_id, brand_id,
                      price, currency, is_active, created_at)
with cats as (
    select id, row_number() over (order by slug) - 1 as rn
      from categories where sandbox_id = :'TPL' and parent_id is not null
),
brs as (
    select id, row_number() over (order by name) - 1 as rn
      from brands where sandbox_id = :'TPL'
),
gen as (
    select t.i,
           (array['Classic','Slim Fit','Oversize','Vintage',
                  'Premium','Basic','Sport','Casual'])[1 + (t.i % 8)]        as adj,
           (array['Black','White','Blue','Red',
                  'Grey','Green','Beige','Navy'])[1 + ((t.i * 3) % 8)]       as col,
           (array['T-Shirt','Shirt','Dress','Jeans',
                  'Sneakers','Boots','Bag','Coat'])[1 + (t.i % 8)]           as typ,
           (t.i % 8)                                                          as cat_rn,
           ((t.i * 5) % 8)                                                    as br_rn
      from generate_series(1, 120) as t(i)
)
select :'TPL',
       'SKU-' || lpad(g.i::text, 4, '0'),
       g.adj || ' ' || g.col || ' ' || g.typ,
       g.adj || ' ' || g.typ || ' — QA Shop demo ürünü #' || g.i,
       c.id,
       case when g.i % 11 = 0 then null else b.id end,
       ((100 + ((g.i * 37) % 900))::numeric + 0.99),
       'TRY',
       (g.i % 13) <> 0,
       now() - ((g.i % 90) || ' days')::interval
  from gen g
  join cats c on c.rn = g.cat_rn
  join brs  b on b.rn = g.br_rn;

-- ─── Varyantlar (120 × 3 = 360) ─────────────────────────────────────────────
insert into product_variants (sandbox_id, product_id, size, color, sku, price_delta)
select :'TPL',
       p.id,
       (array['S','M','L'])[v.k + 1],
       -- Renk, ürün adından split_part ile ÇEKİLMEZ: 'Slim Fit' gibi iki
       -- kelimeli sıfatlarda yanlış parçayı alırdı. SKU'daki sıra numarasından
       -- ürün adıyla AYNI formülle yeniden üretilir.
       (array['Black','White','Blue','Red','Grey','Green','Beige','Navy'])
           [1 + ((substring(p.sku from 5)::int * 3) % 8)],
       p.sku || '-' || (array['S','M','L'])[v.k + 1],
       (v.k * 15)::numeric
  from products p
  cross join generate_series(0, 2) as v(k)
 where p.sandbox_id = :'TPL';

-- ─── Stok ───────────────────────────────────────────────────────────────────
-- Dikiş: rn % 17 = 0 → stok 0 (tükendi senaryosu) → ~21 varyant
--        rn % 23 = 0 → stok 1 (son ürün / yarış koşulu senaryosu)
insert into inventory (variant_id, sandbox_id, stock_qty, reserved_qty)
select v.id,
       :'TPL',
       case
           when v.rn % 17 = 0 then 0
           when v.rn % 23 = 0 then 1
           else 5 + ((v.rn * 7) % 45)
       end,
       0
  from (select id, row_number() over (order by id) - 1 as rn
          from product_variants where sandbox_id = :'TPL') v;

-- ─── Kuponlar (12) ──────────────────────────────────────────────────────────
-- Her satır bilinçli bir test durumu. Geçersizlik nedenleri BİRBİRİNDEN
-- FARKLI: süre bitmiş / henüz başlamamış / limit dolmuş / alt tutar yetersiz.
-- Hepsi "geçersiz" olsaydı hangi kuralın çalıştığı ayırt edilemezdi.
insert into coupons (sandbox_id, code, kind, value, min_total, valid_from, valid_to, max_uses, used_count) values
    (:'TPL', 'WELCOME10',  'percent', 10,    0,    now() - interval '60 days', now() + interval '120 days', 1000, 42),
    (:'TPL', 'SAVE50',     'fixed',   50,  300,    now() - interval '30 days', now() + interval '60 days',   500, 118),
    (:'TPL', 'BIGSPENDER', 'fixed',  200, 1500,    now() - interval '10 days', now() + interval '90 days',   100, 7),
    (:'TPL', 'SUMMER25',   'percent', 25,  500,    now() - interval '5 days',  now() + interval '25 days',   200, 33),
    (:'TPL', 'FREESHIP',   'fixed',   30,    0,    now() - interval '90 days', now() + interval '200 days', null, 260),
    -- Geçersizler (her biri FARKLI bir nedenle):
    (:'TPL', 'EXPIRED20',  'percent', 20,    0,    now() - interval '120 days', now() - interval '10 days', 1000, 88),   -- süresi bitti
    (:'TPL', 'OLDCAMPAIGN','fixed',  100,  200,    now() - interval '400 days', now() - interval '300 days', 500, 500),  -- hem bitti hem dolu
    (:'TPL', 'FUTURE15',   'percent', 15,    0,    now() + interval '15 days',  now() + interval '45 days',  300, 0),    -- henüz başlamadı
    (:'TPL', 'MAXEDOUT',   'percent', 30,    0,    now() - interval '20 days',  now() + interval '20 days',    5, 5),    -- limit doldu
    (:'TPL', 'ALMOSTGONE', 'percent', 40,    0,    now() - interval '3 days',   now() + interval '30 days',   10, 9),    -- 1 hak kaldı
    (:'TPL', 'VIP1000',    'fixed',  400, 4000,    now() - interval '15 days',  now() + interval '60 days',    50, 2),   -- alt tutar çok yüksek
    (:'TPL', 'NOLIMIT',    'percent',  5,    0,    null,                        null,                        null, 900); -- tarihsiz, sınırsız

-- ─── Kullanıcılar (40) ──────────────────────────────────────────────────────
-- Parola: Password123!  (aynı scrypt hash'i, tüm kullanıcılarda)
-- Dikiş: i % 19 = 0 → pasif kullanıcı (login reddedilmeli) → 2 kullanıcı
insert into users (sandbox_id, email, password_hash, name, is_active, created_at)
select :'TPL',
       'user' || t.i || '@qashop.test',
       'scrypt$5165a1b2c3d4e5f60718293a4b5c6d7e$a15106d900bb30d10db1a1f2ce6dc2b9b4f7e1de87bc2dae19a51b6d6594a91cee7f86095ec0b743c771f0360e81ffa094ebad23328fa090c3e2664375c8fc6d',
       'Test User ' || t.i,
       (t.i % 19) <> 0,
       now() - ((t.i * 6) || ' days')::interval
  from generate_series(1, 40) as t(i);

-- Bilinen demo hesabı — dokümantasyonda ve örneklerde bu kullanılır.
insert into users (sandbox_id, email, password_hash, name, is_active, created_at)
values (:'TPL', 'demo@qashop.test',
        'scrypt$5165a1b2c3d4e5f60718293a4b5c6d7e$a15106d900bb30d10db1a1f2ce6dc2b9b4f7e1de87bc2dae19a51b6d6594a91cee7f86095ec0b743c771f0360e81ffa094ebad23328fa090c3e2664375c8fc6d',
        'Demo User', true, now() - interval '200 days');

-- ─── Adresler ───────────────────────────────────────────────────────────────
insert into addresses (sandbox_id, user_id, label, line1, city, country, postal_code, is_default)
select :'TPL', u.id, 'home',
       'Sokak No ' || u.rn || ', Daire ' || (1 + (u.rn % 12)),
       (array['Istanbul','Ankara','Izmir','Bursa','Antalya'])[1 + (u.rn % 5)],
       'TR',
       lpad(((34000 + u.rn * 7) % 81000)::text, 5, '0'),
       true
  from (select id, row_number() over (order by id) - 1 as rn
          from users where sandbox_id = :'TPL') u;

-- ─── Siparişler (150) ───────────────────────────────────────────────────────
-- Önce toplamlar 0 ile açılır; satırlar girildikten SONRA hesaplanır.
insert into orders (sandbox_id, order_no, user_id, status, subtotal, discount_total,
                    shipping_total, grand_total, coupon_code, placed_at)
with usrs as (
    select id, row_number() over (order by id) - 1 as rn
      from users where sandbox_id = :'TPL'
)
select :'TPL',
       'ORD-' || (1000 + t.i)::text,
       u.id,
       case
           when t.i % 37 = 0 then 'returned'
           when t.i % 10 <= 3 then 'delivered'
           when t.i % 10 <= 5 then 'shipped'
           when t.i % 10 <= 7 then 'paid'
           when t.i % 10 = 8  then 'placed'
           else 'cancelled'
       end,
       0, 0, 0, 0,
       case when t.i % 6 = 0 then 'WELCOME10' else null end,
       now() - ((t.i * 6 % 180) || ' days')::interval - ((t.i % 24) || ' hours')::interval
  from generate_series(1, 150) as t(i)
  join usrs u on u.rn = (t.i * 7) % 41;

-- ─── Sipariş satırları (sipariş başına 1-3) ─────────────────────────────────
insert into order_items (sandbox_id, order_id, variant_id, name_snapshot, qty, unit_price, line_total)
with ords as (
    select id, row_number() over (order by order_no) - 1 as seq
      from orders where sandbox_id = :'TPL'
),
vars as (
    select v.id as variant_id,
           p.name,
           (p.price + v.price_delta) as unit_price,
           row_number() over (order by v.id) - 1 as rn
      from product_variants v
      join products p on p.id = v.product_id
     where v.sandbox_id = :'TPL'
),
picks as (
    select o.id as order_id,
           ((o.seq * 11 + k.k * 7) % 360) as vrn,
           (1 + ((o.seq + k.k) % 3))      as qty
      from ords o
      cross join generate_series(0, 2) as k(k)
     where k.k <= (o.seq % 3)
)
select :'TPL', pk.order_id, v.variant_id, v.name, pk.qty, v.unit_price,
       round(v.unit_price * pk.qty, 2)
  from picks pk
  join vars v on v.rn = pk.vrn;

-- ─── Sipariş toplamlarını satırlardan hesapla ───────────────────────────────
-- subtotal = Σ line_total · indirim kuponluysa %10 · 500 TL üstü kargo bedava
update orders o
   set subtotal       = t.s,
       discount_total = case when o.coupon_code is not null then round(t.s * 0.10, 2) else 0 end,
       shipping_total = case when t.s >= 500 then 0 else 29.90 end,
       grand_total    = t.s
                        - (case when o.coupon_code is not null then round(t.s * 0.10, 2) else 0 end)
                        + (case when t.s >= 500 then 0 else 29.90 end)
  from (select order_id, sum(line_total) as s
          from order_items where sandbox_id = :'TPL'
         group by order_id) t
 where o.id = t.order_id
   and o.sandbox_id = :'TPL';

-- ─── Ödemeler ───────────────────────────────────────────────────────────────
-- İptal edilenlerde ödeme yok; iade edilenlerde 'refunded'.
insert into payments (sandbox_id, order_id, method, status, amount, txn_ref, created_at)
select :'TPL', o.id,
       (array['card','transfer','cod'])[1 + (o.rn % 3)],
       case o.status
           when 'returned' then 'refunded'
           when 'placed'   then 'pending'
           else 'success'
       end,
       o.grand_total,
       'TXN-' || lpad((100000 + o.rn * 37)::text, 8, '0'),
       o.placed_at + interval '4 minutes'
  from (select id, status, grand_total, placed_at,
               row_number() over (order by order_no) - 1 as rn
          from orders where sandbox_id = :'TPL') o
 where o.status <> 'cancelled';

-- ─── Kargolar ───────────────────────────────────────────────────────────────
insert into shipments (sandbox_id, order_id, carrier, tracking_no, status, shipped_at)
select :'TPL', o.id,
       (array['Yurtici','Aras','MNG','UPS'])[1 + (o.rn % 4)],
       'TRK' || lpad((5000000 + o.rn * 91)::text, 10, '0'),
       case o.status
           when 'delivered' then 'delivered'
           when 'returned'  then 'returned'
           else 'in_transit'
       end,
       o.placed_at + interval '1 day'
  from (select id, status, placed_at,
               row_number() over (order by order_no) - 1 as rn
          from orders where sandbox_id = :'TPL') o
 where o.status in ('shipped','delivered','returned');

-- ─── Yorumlar (200) ─────────────────────────────────────────────────────────
-- Dikiş: yalnızca 'approved' olanlar ürün sayfasında görünmeli ve ortalama
-- puana girmeli. ~%70 approved, %20 pending, %10 rejected.
insert into reviews (sandbox_id, product_id, user_id, rating, comment, status, created_at)
with prods as (
    select id, row_number() over (order by sku) - 1 as rn
      from products where sandbox_id = :'TPL'
),
usrs as (
    select id, row_number() over (order by id) - 1 as rn
      from users where sandbox_id = :'TPL'
)
select :'TPL', p.id, u.id,
       1 + ((t.i * 7) % 5),
       (array['Beklediğim gibi çıktı.','Kargo hızlıydı.','Beden küçük geldi.',
              'Fiyat/performans iyi.','Rengi fotoğraftaki gibi değil.',
              'Tekrar alırım.','Kumaş kalitesi ortalama.'])[1 + (t.i % 7)],
       case
           when t.i % 10 <= 6 then 'approved'
           when t.i % 10 <= 8 then 'pending'
           else 'rejected'
       end,
       now() - ((t.i % 150) || ' days')::interval
  from generate_series(1, 200) as t(i)
  join prods p on p.rn = (t.i * 13) % 120
  join usrs  u on u.rn = (t.i * 3)  % 41;

-- ─── Denetim kaydı (300 satır) ──────────────────────────────────────────────
-- Log analizi pratiğinin malzemesi. correlation_id ile bir isteğin zinciri
-- takip edilir; ~%8 ERROR, ~%12 WARN.
insert into audit_log (sandbox_id, at, level, actor, action, entity, entity_id, correlation_id, detail)
select :'TPL',
       now() - ((t.i * 13 % 200) || ' hours')::interval,
       case
           when t.i % 25 = 0 then 'ERROR'
           when t.i % 8  = 0 then 'WARN'
           else 'INFO'
       end,
       'user' || (1 + (t.i % 40)) || '@qashop.test',
       (array['auth.login','cart.add_item','cart.remove_item','order.create',
              'order.cancel','payment.charge','catalog.search','review.create'])[1 + (t.i % 8)],
       (array['user','cart','cart','order','order','payment','product','review'])[1 + (t.i % 8)],
       (1000 + (t.i * 7) % 500)::text,
       'corr-' || lpad(((t.i - 1) / 3 + 1)::text, 6, '0'),   -- 3 satır aynı zincirde
       jsonb_build_object(
           'durationMs', 20 + (t.i * 17) % 900,
           'statusCode', case
                             when t.i % 25 = 0 then 500
                             when t.i % 8  = 0 then 409
                             else 200
                         end,
           'ip', '10.0.' || (t.i % 255) || '.' || ((t.i * 3) % 255)
       )
  from generate_series(1, 300) as t(i);

-- ─── Tohum özeti ────────────────────────────────────────────────────────────
do $$
declare r record;
begin
    select
        (select count(*) from products         where sandbox_id = '00000000-0000-0000-0000-000000000000') as products,
        (select count(*) from product_variants where sandbox_id = '00000000-0000-0000-0000-000000000000') as variants,
        (select count(*) from users            where sandbox_id = '00000000-0000-0000-0000-000000000000') as users,
        (select count(*) from orders           where sandbox_id = '00000000-0000-0000-0000-000000000000') as orders,
        (select count(*) from order_items      where sandbox_id = '00000000-0000-0000-0000-000000000000') as order_items,
        (select count(*) from reviews          where sandbox_id = '00000000-0000-0000-0000-000000000000') as reviews,
        (select count(*) from audit_log        where sandbox_id = '00000000-0000-0000-0000-000000000000') as logs
    into r;
    raise notice 'QA Shop tohum veri hazır: % ürün, % varyant, % kullanıcı, % sipariş, % sipariş satırı, % yorum, % log',
        r.products, r.variants, r.users, r.orders, r.order_items, r.reviews, r.logs;
end $$;
