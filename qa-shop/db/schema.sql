-- ============================================================================
-- QA Shop — şema (PostgreSQL 16)
--
-- Bu dosya TEK KAYNAKTIR. Docker ilk açılışta bunu yükler; ileride tarayıcı
-- içi (sql.js) ve barındırılan katman da bu dosyadan türetilir. Şemayı üç
-- yerde elle tutmak, kaçınılmaz olarak birbirinden kayan üç gerçeklik üretir.
--
-- ÇOK KİRACILILIK: her satır bir `sandbox_id` taşır. Kullanıcı kendi
-- sandbox'ını alır, kendi verisini bozar, `POST /sandbox/reset` ile seed
-- veriye döner. Kimse kimsenin verisini göremez/bozamaz.
--
-- ŞABLON SANDBOX: '00000000-0000-0000-0000-000000000000'. Seed veri buraya
-- yüklenir; her yeni sandbox bu şablonun kopyasıdır (clone_sandbox).
-- ============================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- ─── Sandbox ────────────────────────────────────────────────────────────────
create table sandbox (
    id            uuid primary key default gen_random_uuid(),
    api_key       text unique not null,
    label         text,
    -- Bug anahtarları: ileride kontrollü kusur açmak için (henüz kullanılmıyor).
    bug_flags     jsonb not null default '{}'::jsonb,
    is_template   boolean not null default false,
    created_at    timestamptz not null default now(),
    last_reset_at timestamptz not null default now(),
    expires_at    timestamptz not null default now() + interval '7 days'
);

comment on table sandbox is 'Her pratik kullanıcısının izole veri alanı. Şablon satırı hariç 7 gün sonra silinir.';

-- ─── Kimlik ─────────────────────────────────────────────────────────────────
create table users (
    id            bigserial primary key,
    sandbox_id    uuid not null references sandbox on delete cascade,
    email         text not null,
    password_hash text not null,
    name          text not null,
    is_active     boolean not null default true,
    created_at    timestamptz not null default now(),
    unique (sandbox_id, email)          -- doğal anahtar: klonlama bunun üstünden eşler
);

-- Oturum: JWT stateless olsaydı `logout` sahte bir 204 dönerdi. Burada gerçek
-- bir kayıt var — logout revoke eder, /auth/me artık 401 döner. Test edilebilir
-- bir davranış, dekoratif bir endpoint değil.
create table sessions (
    jti        uuid primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    user_id    bigint not null references users on delete cascade,
    issued_at  timestamptz not null default now(),
    expires_at timestamptz not null,
    revoked_at timestamptz
);

create table addresses (
    id          bigserial primary key,
    sandbox_id  uuid not null references sandbox on delete cascade,
    user_id     bigint not null references users on delete cascade,
    label       text not null default 'home',
    line1       text not null,
    city        text not null,
    country     text not null default 'TR',
    postal_code text,
    is_default  boolean not null default false
);

-- ─── Katalog ────────────────────────────────────────────────────────────────
-- ⚠ İKİ DİLLİ KATALOG: `name` İngilizce, `name_tr` Türkçedir.
--
-- Neden Accept-Language ile içerik pazarlığı DEĞİL: bu bir otomasyon pratiği
-- hedefidir ve öğrenci ekrandaki metinle API'nin döndürdüğünü karşılaştırır.
-- Başlığa göre değişen bir cevap gövdesi, "aynı isteği attım başka şey geldi"
-- diyen bir sınıf hata üretirdi. İki alan da HER cevapta döner; hangisinin
-- gösterileceğine arayüz karar verir. Ekleme yönünde olduğu için `name`e
-- bakan mevcut Postman/REST Assured örnekleri aynen çalışmaya devam eder.
--
-- Marka adları (Nike, Zara) çevrilmez: özel isimdir.
create table categories (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    name       text not null,
    name_tr    text,
    slug       text not null,
    parent_id  bigint references categories on delete set null,  -- self-join pratiği
    unique (sandbox_id, slug)
);

create table brands (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    name       text not null,
    unique (sandbox_id, name)
);

create table products (
    id          bigserial primary key,
    sandbox_id  uuid not null references sandbox on delete cascade,
    sku         text not null,
    name        text not null,
    name_tr        text,
    description    text,
    description_tr text,
    category_id bigint references categories on delete set null,
    -- brand_id BİLEREK nullable: INNER JOIN ile LEFT JOIN farkını gösteren
    -- satırlar olmadan JOIN dersi anlatılamaz.
    brand_id    bigint references brands on delete set null,
    price       numeric(10,2) not null check (price >= 0),
    currency    char(3) not null default 'TRY',
    -- Soft delete: pasif ürün listede görünmemeli ama eski siparişlerde durmalı.
    is_active   boolean not null default true,
    created_at  timestamptz not null default now(),
    unique (sandbox_id, sku)
);

create table product_variants (
    id          bigserial primary key,
    sandbox_id  uuid not null references sandbox on delete cascade,
    product_id  bigint not null references products on delete cascade,
    size        text,
    color       text,
    -- Beden (S/M/L) çevrilmez, evrenseldir; renk ürün adının İÇİNDE de geçtiği
    -- için çevrilmezse "Klasik Lacivert Mont" ürününün varyantı "Navy" görünürdü.
    color_tr    text,
    sku         text not null,
    price_delta numeric(10,2) not null default 0,
    unique (sandbox_id, sku)
);

create table inventory (
    variant_id   bigint primary key references product_variants on delete cascade,
    sandbox_id   uuid not null references sandbox on delete cascade,
    stock_qty    int not null default 0 check (stock_qty >= 0),
    -- Sepete atılan ama henüz sipariş olmamış adet. stock - reserved = satılabilir.
    -- Oversell senaryolarının doğduğu yer.
    reserved_qty int not null default 0 check (reserved_qty >= 0)
);

-- ─── Sepet ──────────────────────────────────────────────────────────────────
create table carts (
    id          bigserial primary key,
    sandbox_id  uuid not null references sandbox on delete cascade,
    user_id     bigint references users on delete cascade,   -- NULL = misafir sepeti
    guest_token text,
    status      text not null default 'open'
                check (status in ('open','converted','abandoned')),
    coupon_code text,
    created_at  timestamptz not null default now()
);

create table cart_items (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    cart_id    bigint not null references carts on delete cascade,
    variant_id bigint not null references product_variants on delete cascade,
    qty        int not null check (qty > 0),
    -- Sepete atıldığı ANDAKİ fiyat. Ürünün fiyatı sonradan değişirse sepet
    -- eski fiyatı korur. UI ile DB'nin ayrıştığı en verimli test seam noktası.
    unit_price_snapshot numeric(10,2) not null,
    added_at   timestamptz not null default now(),
    unique (cart_id, variant_id)
);

-- ─── Kupon ──────────────────────────────────────────────────────────────────
create table coupons (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    code       text not null,
    kind       text not null check (kind in ('percent','fixed')),
    value      numeric(10,2) not null check (value > 0),
    min_total  numeric(10,2) not null default 0,
    valid_from timestamptz,
    valid_to   timestamptz,
    max_uses   int,
    used_count int not null default 0,
    unique (sandbox_id, code)
);

-- ─── Sipariş ────────────────────────────────────────────────────────────────
create table orders (
    id             bigserial primary key,
    sandbox_id     uuid not null references sandbox on delete cascade,
    -- İnsan okuyabilir sipariş numarası. Aynı zamanda klonlamanın doğal anahtarı:
    -- bigserial id'ler kopyalanırken değişir, order_no değişmez.
    order_no       text not null,
    user_id        bigint not null references users on delete cascade,
    status         text not null default 'placed'
                   check (status in ('placed','paid','shipped','delivered','cancelled','returned')),
    subtotal       numeric(10,2) not null,
    discount_total numeric(10,2) not null default 0,
    shipping_total numeric(10,2) not null default 0,
    -- MUTABAKAT DİKİŞİ: grand_total = subtotal - discount_total + shipping_total
    -- ve subtotal = sum(order_items.line_total) olmalı. Bu eşitliği yalnızca
    -- SQL yakalar; arayüz hiçbir zaman göstermez.
    grand_total    numeric(10,2) not null,
    coupon_code    text,
    placed_at      timestamptz not null default now(),
    unique (sandbox_id, order_no)
);

create table order_items (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    order_id   bigint not null references orders on delete cascade,
    variant_id bigint not null references product_variants,
    -- Sipariş anındaki ürün adı: ürün sonradan silinse/yeniden adlandırılsa da
    -- fatura değişmemeli.
    name_snapshot text not null,
    qty        int not null check (qty > 0),
    unit_price numeric(10,2) not null,
    line_total numeric(10,2) not null
);

create table payments (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    order_id   bigint not null references orders on delete cascade,
    method     text not null check (method in ('card','transfer','cod')),
    status     text not null check (status in ('pending','success','failed','refunded')),
    amount     numeric(10,2) not null,
    txn_ref    text,
    created_at timestamptz not null default now()
);

create table shipments (
    id          bigserial primary key,
    sandbox_id  uuid not null references sandbox on delete cascade,
    order_id    bigint not null references orders on delete cascade,
    carrier     text,
    tracking_no text,
    status      text not null default 'preparing'
                check (status in ('preparing','in_transit','delivered','returned')),
    shipped_at  timestamptz,
    -- Teslim ANI ayrı tutulur: iade penceresi (14 gün) buradan sayılır.
    -- Kargoya veriliş tarihinden saymak, uzun süren teslimatlarda müşterinin
    -- iade hakkını sessizce kısaltırdı.
    delivered_at timestamptz
);

create table reviews (
    id         bigserial primary key,
    sandbox_id uuid not null references sandbox on delete cascade,
    product_id bigint not null references products on delete cascade,
    user_id    bigint references users on delete set null,
    rating     int not null check (rating between 1 and 5),
    comment    text,
    -- Moderasyon: 'pending' yorum ürün sayfasında GÖRÜNMEMELİ. Ortalama puan
    -- hesabına da girmemeli — iki ayrı iş kuralı, iki ayrı test.
    status     text not null default 'pending'
               check (status in ('pending','approved','rejected')),
    created_at timestamptz not null default now()
);

-- ─── Denetim kaydı ──────────────────────────────────────────────────────────
-- Log analiziyle kök neden bulma pratiğinin malzemesi. Her API isteği buraya
-- bir satır yazar; correlation_id ile bir isteğin zinciri takip edilir.
create table audit_log (
    id             bigserial primary key,
    sandbox_id     uuid not null references sandbox on delete cascade,
    at             timestamptz not null default now(),
    level          text not null default 'INFO' check (level in ('INFO','WARN','ERROR')),
    actor          text,
    action         text not null,
    entity         text,
    entity_id      text,
    correlation_id text,
    detail         jsonb
);

-- ─── İndeksler ──────────────────────────────────────────────────────────────
-- Sandbox filtresi her sorguda var; tenant bazlı indeks olmadan tablo taraması
-- kaçınılmaz olur.
create index idx_products_sandbox      on products (sandbox_id, is_active);
create index idx_products_category     on products (category_id);
create index idx_products_brand        on products (brand_id);
create index idx_variants_product      on product_variants (product_id);
create index idx_cart_items_cart       on cart_items (cart_id);
create index idx_orders_sandbox_user   on orders (sandbox_id, user_id);
create index idx_orders_status         on orders (sandbox_id, status);
create index idx_order_items_order     on order_items (order_id);
create index idx_reviews_product       on reviews (product_id, status);
create index idx_audit_sandbox_at      on audit_log (sandbox_id, at desc);
create index idx_audit_correlation     on audit_log (correlation_id);
create index idx_sessions_user         on sessions (user_id);

-- ============================================================================
-- KLONLAMA
--
-- Yeni bir sandbox, şablonun birebir kopyasıdır. Kopyalama bigserial id'lerle
-- yapılamaz (kopyada id'ler değişir); bu yüzden her tablo bir DOĞAL ANAHTAR
-- taşır ve eşleme onun üstünden kurulur:
--   brands→name · categories→slug · products→sku · variants→sku
--   users→email · orders→order_no
-- ============================================================================

create or replace function clone_sandbox(p_src uuid, p_dst uuid)
returns void as $$
begin
    -- ── Katalog ──
    insert into brands (sandbox_id, name)
    select p_dst, name from brands where sandbox_id = p_src;

    -- Kategoriler iki geçişte: önce parent'sız, sonra parent bağlanır
    -- (self-referencing FK tek geçişte kurulamaz).
    insert into categories (sandbox_id, name, name_tr, slug, parent_id)
    select p_dst, name, name_tr, slug, null from categories where sandbox_id = p_src;

    update categories dst
       set parent_id = dp.id
      from categories src
      join categories sp on sp.id = src.parent_id
      join categories dp on dp.sandbox_id = p_dst and dp.slug = sp.slug
     where src.sandbox_id = p_src
       and dst.sandbox_id = p_dst
       and dst.slug = src.slug
       and src.parent_id is not null;

    insert into products (sandbox_id, sku, name, name_tr, description, description_tr,
                          category_id, brand_id,
                          price, currency, is_active, created_at)
    select p_dst, p.sku, p.name, p.name_tr, p.description, p.description_tr, dc.id, db.id,
           p.price, p.currency, p.is_active, p.created_at
      from products p
      left join categories sc on sc.id = p.category_id
      left join categories dc on dc.sandbox_id = p_dst and dc.slug = sc.slug
      left join brands     sb on sb.id = p.brand_id
      left join brands     db on db.sandbox_id = p_dst and db.name = sb.name
     where p.sandbox_id = p_src;

    insert into product_variants (sandbox_id, product_id, size, color, color_tr, sku, price_delta)
    select p_dst, dp.id, v.size, v.color, v.color_tr, v.sku, v.price_delta
      from product_variants v
      join products sp on sp.id = v.product_id
      join products dp on dp.sandbox_id = p_dst and dp.sku = sp.sku
     where v.sandbox_id = p_src;

    insert into inventory (variant_id, sandbox_id, stock_qty, reserved_qty)
    select dv.id, p_dst, i.stock_qty, i.reserved_qty
      from inventory i
      join product_variants sv on sv.id = i.variant_id
      join product_variants dv on dv.sandbox_id = p_dst and dv.sku = sv.sku
     where i.sandbox_id = p_src;

    insert into coupons (sandbox_id, code, kind, value, min_total,
                         valid_from, valid_to, max_uses, used_count)
    select p_dst, code, kind, value, min_total, valid_from, valid_to, max_uses, used_count
      from coupons where sandbox_id = p_src;

    -- ── Kullanıcılar ve adresler ──
    insert into users (sandbox_id, email, password_hash, name, is_active, created_at)
    select p_dst, email, password_hash, name, is_active, created_at
      from users where sandbox_id = p_src;

    insert into addresses (sandbox_id, user_id, label, line1, city, country, postal_code, is_default)
    select p_dst, du.id, a.label, a.line1, a.city, a.country, a.postal_code, a.is_default
      from addresses a
      join users su on su.id = a.user_id
      join users du on du.sandbox_id = p_dst and du.email = su.email
     where a.sandbox_id = p_src;

    -- ── Sipariş geçmişi (SQL pratiğinin hacmi buradan geliyor) ──
    insert into orders (sandbox_id, order_no, user_id, status, subtotal, discount_total,
                        shipping_total, grand_total, coupon_code, placed_at)
    select p_dst, o.order_no, du.id, o.status, o.subtotal, o.discount_total,
           o.shipping_total, o.grand_total, o.coupon_code, o.placed_at
      from orders o
      join users su on su.id = o.user_id
      join users du on du.sandbox_id = p_dst and du.email = su.email
     where o.sandbox_id = p_src;

    insert into order_items (sandbox_id, order_id, variant_id, name_snapshot, qty, unit_price, line_total)
    select p_dst, dord.id, dv.id, oi.name_snapshot, oi.qty, oi.unit_price, oi.line_total
      from order_items oi
      join orders sord on sord.id = oi.order_id
      join orders dord on dord.sandbox_id = p_dst and dord.order_no = sord.order_no
      join product_variants sv on sv.id = oi.variant_id
      join product_variants dv on dv.sandbox_id = p_dst and dv.sku = sv.sku
     where oi.sandbox_id = p_src;

    insert into payments (sandbox_id, order_id, method, status, amount, txn_ref, created_at)
    select p_dst, dord.id, pm.method, pm.status, pm.amount, pm.txn_ref, pm.created_at
      from payments pm
      join orders sord on sord.id = pm.order_id
      join orders dord on dord.sandbox_id = p_dst and dord.order_no = sord.order_no
     where pm.sandbox_id = p_src;

    insert into shipments (sandbox_id, order_id, carrier, tracking_no, status, shipped_at, delivered_at)
    select p_dst, dord.id, sh.carrier, sh.tracking_no, sh.status, sh.shipped_at, sh.delivered_at
      from shipments sh
      join orders sord on sord.id = sh.order_id
      join orders dord on dord.sandbox_id = p_dst and dord.order_no = sord.order_no
     where sh.sandbox_id = p_src;

    insert into reviews (sandbox_id, product_id, user_id, rating, comment, status, created_at)
    select p_dst, dp.id, du.id, r.rating, r.comment, r.status, r.created_at
      from reviews r
      join products sp on sp.id = r.product_id
      join products dp on dp.sandbox_id = p_dst and dp.sku = sp.sku
      left join users su on su.id = r.user_id
      left join users du on du.sandbox_id = p_dst and du.email = su.email
     where r.sandbox_id = p_src;
end;
$$ language plpgsql;

-- ============================================================================
-- SIFIRLAMA
--
-- "Her koşumdan önce temiz durum" otomasyonun en temel disiplinidir; burada
-- bir endpoint olarak zorunlu kılınıyor. Silme sırası FK bağımlılığını takip
-- eder — ters sırada silmek referans hatası verir.
-- ============================================================================

create or replace function reset_sandbox(p_id uuid)
returns void as $$
declare
    v_template uuid := '00000000-0000-0000-0000-000000000000';
begin
    if p_id = v_template then
        raise exception 'Şablon sandbox sıfırlanamaz';
    end if;

    delete from audit_log        where sandbox_id = p_id;
    delete from reviews          where sandbox_id = p_id;
    delete from shipments        where sandbox_id = p_id;
    delete from payments         where sandbox_id = p_id;
    delete from order_items      where sandbox_id = p_id;
    delete from orders           where sandbox_id = p_id;
    delete from cart_items       where sandbox_id = p_id;
    delete from carts            where sandbox_id = p_id;
    delete from sessions         where sandbox_id = p_id;
    delete from addresses        where sandbox_id = p_id;
    delete from users            where sandbox_id = p_id;
    delete from coupons          where sandbox_id = p_id;
    delete from inventory        where sandbox_id = p_id;
    delete from product_variants where sandbox_id = p_id;
    delete from products         where sandbox_id = p_id;
    delete from categories       where sandbox_id = p_id;
    delete from brands           where sandbox_id = p_id;

    perform clone_sandbox(v_template, p_id);

    update sandbox
       set last_reset_at = now(),
           bug_flags     = '{}'::jsonb
     where id = p_id;
end;
$$ language plpgsql;

-- ============================================================================
-- BAKIM: süresi geçmiş sandbox'ları temizler (kota koruması).
-- Şablon asla silinmez.
-- ============================================================================
create or replace function purge_expired_sandboxes()
returns int as $$
declare
    v_count int;
begin
    with gone as (
        delete from sandbox
         where is_template = false
           and expires_at < now()
        returning 1
    )
    select count(*) into v_count from gone;
    return v_count;
end;
$$ language plpgsql;
