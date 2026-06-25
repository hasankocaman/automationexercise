const shopSchemaSql = `-- 1) Bu eğitim için ayrı bir mağaza alanı aç
create schema if not exists shop;

-- 2) Ürün grupları: bilgisayar, elbise, ayakkabı
create table if not exists shop.categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique
);

-- 3) Satılacak ürünler
create table if not exists shop.products (
  id bigint generated always as identity primary key,
  category_id bigint not null references shop.categories(id),
  name text not null,
  sku text not null unique,
  price numeric(10, 2) not null check (price > 0),
  stock int not null default 0 check (stock >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4) Müşteriler
create table if not exists shop.customers (
  id bigint generated always as identity primary key,
  email text not null unique,
  full_name text not null,
  created_at timestamptz not null default now()
);

-- 5) Sipariş başlığı
create table if not exists shop.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  customer_id bigint not null references shop.customers(id),
  status text not null check (status in ('new', 'paid', 'shipped', 'cancelled')),
  total_amount numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

-- 6) Sipariş içindeki ürün satırları
create table if not exists shop.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references shop.orders(id) on delete cascade,
  product_id bigint not null references shop.products(id),
  quantity int not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price > 0),
  unique (order_id, product_id)
);`

const shopMockDataSql = `-- 1) Kategoriler
insert into shop.categories (name, slug)
values
  ('Bilgisayar', 'bilgisayar'),
  ('Elbise', 'elbise'),
  ('Ayakkabı', 'ayakkabi')
on conflict (slug) do nothing;

-- 2) Ürünler
insert into shop.products (category_id, name, sku, price, stock, is_active)
values
  ((select id from shop.categories where slug = 'bilgisayar'), 'Nebula Gaming Laptop', 'COMP-LAP-001', 39999.90, 12, true),
  ((select id from shop.categories where slug = 'bilgisayar'), '27 inç 4K Monitör', 'COMP-MON-002', 8999.50, 18, true),
  ((select id from shop.categories where slug = 'bilgisayar'), 'Mekanik Klavye', 'COMP-KEY-003', 2499.00, 35, true),
  ((select id from shop.categories where slug = 'elbise'), 'Pamuk Oversize Tişört', 'CLO-TSH-101', 549.90, 60, true),
  ((select id from shop.categories where slug = 'elbise'), 'Kışlık Mont', 'CLO-COA-102', 2999.90, 9, true),
  ((select id from shop.categories where slug = 'ayakkabi'), 'Koşu Ayakkabısı', 'SHO-RUN-201', 1899.90, 24, true),
  ((select id from shop.categories where slug = 'ayakkabi'), 'Deri Bot', 'SHO-BOT-202', 3499.90, 7, true)
on conflict (sku) do nothing;

-- 3) Müşteriler
insert into shop.customers (email, full_name)
values
  ('ayse@example.com', 'Ayşe Yılmaz'),
  ('mert@example.com', 'Mert Kaya')
on conflict (email) do nothing;

-- 4) Siparişler
insert into shop.orders (order_number, customer_id, status, total_amount)
select 'ORD-1001', id, 'paid', 48999.40
from shop.customers
where email = 'ayse@example.com'
on conflict (order_number) do nothing;

insert into shop.orders (order_number, customer_id, status, total_amount)
select 'ORD-1002', id, 'new', 2449.80
from shop.customers
where email = 'mert@example.com'
on conflict (order_number) do nothing;

-- 5) Sipariş ürünleri
insert into shop.order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from shop.orders o
join shop.products p on p.sku = 'COMP-LAP-001'
where o.order_number = 'ORD-1001'
on conflict (order_id, product_id) do nothing;

insert into shop.order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 1, p.price
from shop.orders o
join shop.products p on p.sku = 'COMP-MON-002'
where o.order_number = 'ORD-1001'
on conflict (order_id, product_id) do nothing;

insert into shop.order_items (order_id, product_id, quantity, unit_price)
select o.id, p.id, 2, p.price
from shop.orders o
join shop.products p on p.sku = 'CLO-TSH-101'
where o.order_number = 'ORD-1002'
on conflict (order_id, product_id) do nothing;`

const shopQaQueriesSql = `-- 1) UI ürün listesini test et: aktif bilgisayar ürünleri geliyor mu?
select p.id, p.name, c.slug as category, p.price, p.stock
from shop.products p
join shop.categories c on c.id = p.category_id
where c.slug = 'bilgisayar'
  and p.is_active = true
order by p.price desc;

-- 2) Stok testi: stokta olmayan ürün var mı?
select id, name, sku, stock
from shop.products
where stock = 0;

-- 3) Sipariş detay testi: sipariş toplamı ürün satırlarıyla uyumlu mu?
select
  o.order_number,
  o.total_amount as order_total,
  sum(oi.quantity * oi.unit_price) as item_total
from shop.orders o
join shop.order_items oi on oi.order_id = o.id
group by o.order_number, o.total_amount;

-- 4) API filtre testi: fiyat aralığı doğru çalışıyor mu?
select p.name, p.price
from shop.products p
where p.price between 1000 and 10000
order by p.price;`

const packageJsonCode = `{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "create-next-app ile gelir",
    "react": "create-next-app ile gelir",
    "react-dom": "create-next-app ile gelir",
    "pg": "PostgreSQL ile konuşur",
    "zod": "API'ye gelen veriyi kontrol eder"
  },
  "devDependencies": {
    "@types/pg": "TypeScript, pg kütüphanesini daha iyi anlasın diye eklenir"
  }
}`

const envLocalCode = `# Bu dosya shop-backend-api klasörünün en üstünde durur
# Tarayıcıya gönderilmez
DATABASE_URL=postgresql://shop_user:strong_password@localhost:5432/shop_training
API_BASE_URL=http://localhost:3000`

const dbTsCode = `// src/lib/db.ts
// Amaç: API dosyalarının PostgreSQL'e aynı kapıdan bağlanmasını sağlamak
// Sonuç: Her route.ts dosyası pool.query(...) ile SQL çalıştırabilir
import { Pool } from 'pg'

const globalForPg = globalThis as unknown as {
  pgPool?: Pool
}

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool
}`

const healthRouteTsCode = `// src/app/api/health/route.ts
// Amaç: API server ayakta mı hızlıca görmek
// Sonuç: Tester 200 cevabı alırsa API kapısı çalışıyor demektir
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'shop-backend-api',
  })
}`

const productsRouteTsCode = `// src/app/api/products/route.ts
// Amaç: /api/products kapısını açmak
// Sonuç: UI bu adrese istek atınca ürün listesini JSON olarak alır
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { pool } from '@/lib/db'

const productBody = z.object({
  name: z.string().min(2),
  sku: z.string().min(3),
  categorySlug: z.enum(['bilgisayar', 'elbise', 'ayakkabi']),
  price: z.number().positive(),
  stock: z.number().int().min(0),
})

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category')

  const { rows } = await pool.query(
    'select p.id, p.name, p.sku, c.slug as category, p.price, p.stock from shop.products p join shop.categories c on c.id = p.category_id where ($1::text is null or c.slug = $1) and p.is_active = true order by p.id',
    [category]
  )

  return NextResponse.json({ data: rows })
}

export async function POST(request: NextRequest) {
  const parsed = productBody.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ürün bilgileri eksik veya hatalı' },
      { status: 400 }
    )
  }

  const product = parsed.data

  const { rows } = await pool.query(
    'insert into shop.products (category_id, name, sku, price, stock) select c.id, $1, $2, $3, $4 from shop.categories c where c.slug = $5 returning id, name, sku, price, stock',
    [product.name, product.sku, product.price, product.stock, product.categorySlug]
  )

  if (rows.length === 0) {
    return NextResponse.json(
      { error: 'Kategori bulunamadı' },
      { status: 400 }
    )
  }

  return NextResponse.json({ data: rows[0] }, { status: 201 })
}`

const productDetailRouteTsCode = `// src/app/api/products/[id]/route.ts
// Amaç: /api/products/3 gibi tek ürün adresi açmak
// Sonuç: Test ederken doğru ürün mü dönüyor kolayca görürsün
import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const { rows } = await pool.query(
    'select p.id, p.name, p.sku, c.slug as category, p.price, p.stock from shop.products p join shop.categories c on c.id = p.category_id where p.id = $1',
    [id]
  )

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ data: rows[0] })
}`

const ordersRouteTsCode = `// src/app/api/orders/route.ts
// Amaç: Sipariş oluşturma kapısını açmak
// Sonuç: API önce stok kontrol eder, sonra sipariş satırı yazar
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { pool } from '@/lib/db'

const orderBody = z.object({
  customerEmail: z.string().email(),
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  const parsed = orderBody.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json({ error: 'Sipariş bilgileri hatalı' }, { status: 400 })
  }

  const client = await pool.connect()

  try {
    await client.query('begin')

    const customer = await client.query(
      'select id from shop.customers where email = $1',
      [parsed.data.customerEmail]
    )

    const product = await client.query(
      'select id, price, stock from shop.products where id = $1 and is_active = true',
      [parsed.data.productId]
    )

    if (customer.rows.length === 0 || product.rows.length === 0) {
      await client.query('rollback')
      return NextResponse.json({ error: 'Müşteri veya ürün bulunamadı' }, { status: 404 })
    }

    if (product.rows[0].stock < parsed.data.quantity) {
      await client.query('rollback')
      return NextResponse.json({ error: 'Stok yeterli değil' }, { status: 409 })
    }

    const total = Number(product.rows[0].price) * parsed.data.quantity
    const orderNumber = 'ORD-' + Date.now()

    const order = await client.query(
      'insert into shop.orders (order_number, customer_id, status, total_amount) values ($1, $2, $3, $4) returning id, order_number, total_amount',
      [orderNumber, customer.rows[0].id, 'new', total]
    )

    await client.query(
      'insert into shop.order_items (order_id, product_id, quantity, unit_price) values ($1, $2, $3, $4)',
      [order.rows[0].id, parsed.data.productId, parsed.data.quantity, product.rows[0].price]
    )

    await client.query(
      'update shop.products set stock = stock - $1 where id = $2',
      [parsed.data.quantity, parsed.data.productId]
    )

    await client.query('commit')
    return NextResponse.json({ data: order.rows[0] }, { status: 201 })
  } catch (error) {
    await client.query('rollback')
    return NextResponse.json({ error: 'Sipariş kaydedilemedi' }, { status: 500 })
  } finally {
    client.release()
  }
}`

const frontendFetchCode = `// src/app/page.tsx
// Amaç: UI tarafının kendi API kapısını çağırması
// Sonuç: Ürün kartları SQL'den gelen JSON ile dolar
'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: string
  stock: number
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch('/api/products?category=bilgisayar', {
        headers: { Accept: 'application/json' },
      })

      const json = await response.json()
      setProducts(json.data ?? [])
    }

    loadProducts()
  }, [])

  return (
    <main>
      {products.map(product => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price} TL</p>
          <p>Stok: {product.stock}</p>
        </article>
      ))}
    </main>
  )
}`

const apiHttpTestCode = `### 1) API ayakta mı?
GET http://localhost:3000/api/health
Accept: application/json

### 2) Bilgisayar ürünlerini getir
GET http://localhost:3000/api/products?category=bilgisayar
Accept: application/json

### 3) Tek ürün getir
GET http://localhost:3000/api/products/1
Accept: application/json

### 4) Yeni ürün ekle
POST http://localhost:3000/api/products
Content-Type: application/json
X-Request-Id: qa-local-001

{
  "name": "USB-C Dock Station",
  "sku": "COMP-DOCK-004",
  "categorySlug": "bilgisayar",
  "price": 3299.90,
  "stock": 14
}

### 5) Hatalı veri testi
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "",
  "sku": "X",
  "categorySlug": "bilgisayar",
  "price": -1,
  "stock": -5
}`

const trEcommerceMapSection = {
  title: '🛒 E-Ticaret Backend Haritası',
  blocks: [
    {
      type: 'simple-box',
      emoji: '🛒',
      content: 'Bu sayfa gerçek sisteme bağlanmaz. Tarayıcı içinde çalışan güvenli bir e-ticaret backend provasıdır: bilgisayar, elbise ve ayakkabı ürünleri üzerinden SQL, API ve backend testi öğrenirsin.',
    },
    {
      type: 'text',
      content: 'Gerçek işte tester genelde şunu kontrol eder: UI ürünleri doğru gösteriyor mu, API doğru JSON dönüyor mu, SQL tarafında stok ve sipariş kayıtları doğru mu? Bu lab aynı akışı kutular ve oklarla anlatır.',
    },
    {
      type: 'grid',
      cols: 4,
      items: [
        { icon: '🖥️', label: 'UI kutusu', desc: 'Ürün kartları, kategori filtresi, fiyat ve stok görünür.' },
        { icon: '➡️', label: 'API kapısı', desc: 'UI, /api/products gibi adreslerden JSON ister.' },
        { icon: '🗄️', label: 'SQL dolabı', desc: 'Ürün, kategori, müşteri ve sipariş tabloları burada durur.' },
        { icon: '🧪', label: 'Tester paneli', desc: 'DBeaver, Postman veya VS Code REST Client ile kanıt toplarsın.' },
      ],
    },
    {
      type: 'table',
      headers: ['UI örneği', 'API adresi', 'SQL tablosu', 'Tester neyi kontrol eder?'],
      rows: [
        ['Bilgisayar listesi', 'GET /api/products?category=bilgisayar', 'shop.products + shop.categories', 'Sadece bilgisayar ürünleri mi geldi?'],
        ['Ürün detayı', 'GET /api/products/1', 'shop.products', 'Fiyat, stok ve sku doğru mu?'],
        ['Yeni ürün ekleme', 'POST /api/products', 'shop.products', 'Eksik veri gelirse 400 hatası dönüyor mu?'],
        ['Sipariş oluşturma', 'POST /api/orders', 'shop.orders + shop.order_items', 'Stok düşüyor mu, sipariş satırı oluşuyor mu?'],
      ],
    },
    {
      type: 'mock-backend-lab',
      variant: 'api',
      title: 'Tarayıcıda çalışan sahte e-ticaret API paneli',
      intro: 'Bu panel gerçek ağa çıkmaz; ürün listesi, stok ve JSON cevabı sadece ekranda canlandırır.',
    },
    {
      type: 'quiz',
      question: 'Bir e-ticaret backend testinde UI, API ve SQL neden birlikte düşünülür?',
      options: [
        { id: 'a', text: 'Çünkü UI güzel görünüyorsa SQL her zaman doğrudur' },
        { id: 'b', text: 'Çünkü kullanıcı ekranda görür, API taşır, SQL saklar; hata bu üç kutudan birinde olabilir' },
        { id: 'c', text: 'Çünkü API sadece CSS dosyasıdır' },
        { id: 'd', text: 'Çünkü SQL sadece renk seçmek için kullanılır' },
      ],
      correct: 'b',
      explanation: 'Tester önce ekrandaki belirtiyi görür, sonra API cevabını ve SQL kaydını kontrol ederek hatanın nerede olduğunu ayırır.',
    },
  ],
}

const trDbeaverSqlSection = {
  title: '🗄️ DBeaver ile SQL Database Kur',
  blocks: [
    {
      type: 'simple-box',
      emoji: '🗄️',
      content: 'DBeaver, database için bir kontrol masası gibidir. Tabloları görür, SQL yazarsın, sonucu altta tablo halinde okursun. Bu bölümde shop adında ayrı bir schema kuruyoruz.',
    },
    {
      type: 'warning',
      content: 'Bu adımlar eğitim içindir. Canlı şirket veritabanında deneme yapma. Öğrenirken ayrı local PostgreSQL veya ayrı eğitim database kullan.',
    },
    {
      type: 'steps',
      items: [
        { label: 'PostgreSQL hazırla', desc: 'Local bilgisayarda veya eğitim sunucusunda boş bir PostgreSQL database olsun. Örnek database adı: shop_training.' },
        { label: 'DBeaver aç', desc: 'New Database Connection seç, PostgreSQL bağlantısını seç.' },
        { label: 'Bağlantı bilgilerini yaz', desc: 'Host, port, database adı, kullanıcı adı ve şifre girilir. Local örnek: localhost, 5432, shop_training.' },
        { label: 'Test Connection bas', desc: 'Yeşil sonuç alırsan DBeaver database ile konuşabiliyor demektir.' },
        { label: 'SQL Editor aç', desc: 'Connection üzerinde sağ tıkla, SQL Editor aç. Buraya CREATE SCHEMA ve CREATE TABLE yazacağız.' },
        { label: 'Schema oluştur', desc: 'shop adında ayrı alan açılır. Bu, proje içindeki ayrı klasör gibi düşünebilirsin.' },
        { label: 'Tabloları oluştur', desc: 'categories, products, customers, orders ve order_items tabloları kurulur.' },
        { label: 'Mock data ekle', desc: 'Bilgisayar, elbise ve ayakkabı ürünleri gerçekçi sahte verilerle doldurulur.' },
        { label: 'SELECT ile kanıtla', desc: 'Kurulumdan sonra veri gerçekten var mı diye sorgu çalıştırılır.' },
        { label: 'Tester notu al', desc: 'Hangi sorguyu çalıştırdın, beklenen neydi, çıkan sonuç neydi yaz.' },
      ],
    },
    {
      type: 'code',
      label: 'DBeaver SQL Editor: schema ve tablolar',
      language: 'sql',
      code: shopSchemaSql,
    },
    {
      type: 'code',
      label: 'DBeaver SQL Editor: gerçekçi mock data',
      language: 'sql',
      code: shopMockDataSql,
    },
    {
      type: 'code',
      label: 'Tester için kontrol sorguları',
      language: 'sql',
      code: shopQaQueriesSql,
    },
    {
      type: 'table',
      headers: ['Tablo', 'Basit anlamı', 'Neden gerekli?'],
      rows: [
        ['shop.categories', 'Ürün rafları', 'Bilgisayar, elbise, ayakkabı gibi grupları tutar.'],
        ['shop.products', 'Satılacak ürünler', 'UI ürün kartları buradan beslenir.'],
        ['shop.customers', 'Müşteri listesi', 'Siparişin kime ait olduğunu gösterir.'],
        ['shop.orders', 'Sipariş fişi', 'Sipariş numarası, durum ve toplam tutarı tutar.'],
        ['shop.order_items', 'Fişin içindeki ürünler', 'Bir siparişte hangi üründen kaç adet var gösterir.'],
      ],
    },
    {
      type: 'backend-practice',
      icon: '🧾',
      title: { tr: 'Try It Yourself: DBeaver kurulum sırasını yaz', en: 'Try It Yourself: Write the DBeaver setup order' },
      intro: { tr: 'Aşağıdaki kontrol gerçek database çağırmaz; sadece doğru sırayı öğretir.', en: 'This checker does not call a real database; it teaches the correct order.' },
      help: { tr: 'Adımları burada düzenle, sonra kontrol et. Bu alan gerçek veritabanına bağlanmaz.', en: 'Edit the steps here, then check. This area does not connect to a real database.' },
      starterCommands: `Open DBeaver
Create PostgreSQL connection
Open SQL Editor
CREATE SCHEMA shop
CREATE TABLE shop.products
INSERT mock products
SELECT products`,
      expectedSteps: [
        { label: { tr: 'DBeaver açıldı', en: 'DBeaver opened' }, pattern: 'DBeaver', example: 'Open DBeaver' },
        { label: { tr: 'PostgreSQL bağlantısı kuruldu', en: 'PostgreSQL connection created' }, pattern: 'PostgreSQL connection', example: 'Create PostgreSQL connection' },
        { label: { tr: 'SQL Editor açıldı', en: 'SQL Editor opened' }, pattern: 'SQL Editor', example: 'Open SQL Editor' },
        { label: { tr: 'Schema açıldı', en: 'Schema created' }, pattern: 'CREATE SCHEMA shop', example: 'CREATE SCHEMA shop' },
        { label: { tr: 'Ürün tablosu kuruldu', en: 'Product table created' }, pattern: 'CREATE TABLE shop\\.products', example: 'CREATE TABLE shop.products' },
        { label: { tr: 'Mock ürünler eklendi', en: 'Mock products inserted' }, pattern: 'INSERT mock products', example: 'INSERT mock products' },
        { label: { tr: 'SELECT ile kontrol edildi', en: 'Checked with SELECT' }, pattern: 'SELECT products', example: 'SELECT products' },
      ],
      successOutput: {
        tr: 'Sıra doğru. Önce bağlantı, sonra schema, sonra tablo, sonra mock data, en son kontrol sorgusu.',
        en: 'Correct order. Connection, schema, table, mock data, then SELECT check.',
      },
      retryOutput: {
        tr: 'Sırada eksik var. Tablo oluşmadan ürün eklemeye çalışırsan database hata verir.',
        en: 'Something is missing. Inserting products before the table exists causes a database error.',
      },
    },
  ],
}

const trNextApiSection = {
  title: '🧩 VS Code ile Next.js TypeScript API',
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧩',
      content: 'API, UI ile SQL arasındaki görevli kapıdır. UI doğrudan database şifresini bilmez; /api/products kapısına gider, API SQL sorgusunu çalıştırır, sonucu JSON olarak döndürür.',
    },
    {
      type: 'warning',
      content: 'Bu LearnQA.dev projesi React + Vite ile çalışıyor. Aşağıdaki Next.js API projesi ayrı bir eğitim klasörü olarak anlatılır; mevcut projeye server kodu eklemiyoruz.',
    },
    {
      type: 'installation',
      title: 'Terminalde sıfırdan API projesi aç',
      steps: [
        { cmd: 'npx create-next-app@latest shop-backend-api --ts --app', explanation: 'shop-backend-api adında ayrı bir Next.js + TypeScript proje klasörü açar. --ts TypeScript demektir, --app yeni app klasörünü kullanır.' },
        { cmd: 'cd shop-backend-api', explanation: 'Terminali yeni API projesinin içine alır. Bundan sonra açacağın dosyalar bu klasörde olmalı.' },
        { cmd: 'npm install pg zod', explanation: 'pg PostgreSQL ile konuşur. zod, API’ye gelen body doğru mu diye kontrol eder.' },
        { cmd: 'npm install -D @types/pg', explanation: 'TypeScript, pg kütüphanesinin tiplerini daha iyi anlasın diye development dependency ekler.' },
        { cmd: 'code .', explanation: 'Bu klasörü VS Code içinde açar.' },
        { cmd: 'npm run dev', explanation: 'Local API server başlar. Base URL artık http://localhost:3000 olur.' },
      ],
    },
    {
      type: 'table',
      headers: ['VS Code dosyası', 'Uzantı', 'Ne işe yarar?', 'Yazılınca sonuç ne olur?'],
      rows: [
        ['package.json', '.json', 'Kurulu kütüphaneler ve npm komutları burada görünür.', 'pg ve zod eklendi mi kontrol edersin.'],
        ['.env.local', '.local', 'Database bağlantı adresi burada saklanır.', 'Kod içine şifre yazmadan API database ile konuşur.'],
        ['src/lib/db.ts', '.ts', 'PostgreSQL bağlantı havuzunu tek yerde toplar.', 'Her API dosyası aynı pool üzerinden SQL çalıştırır.'],
        ['src/app/api/health/route.ts', '.ts', '/api/health ayakta mı kontrol kapısıdır.', 'API server çalışıyor mu 200 cevabıyla anlarsın.'],
        ['src/app/api/products/route.ts', '.ts', '/api/products adresinin GET ve POST kapısıdır.', 'Ürün listeleme ve ürün ekleme çalışır.'],
        ['src/app/api/products/[id]/route.ts', '.ts', '/api/products/1 gibi tek ürün kapısıdır.', 'Ürün bulunursa 200, yoksa 404 döner.'],
        ['src/app/api/orders/route.ts', '.ts', '/api/orders sipariş kapısıdır.', 'Stok kontrolü ve sipariş kaydı tek akışta yapılır.'],
        ['src/app/page.tsx', '.tsx', 'UI yazarken JSX kullanılır.', 'Ürün kartları kendi API’nden veri çeker.'],
        ['requests/products.http', '.http', 'VS Code REST Client ile test dosyasıdır.', 'Postman açmadan GET ve POST deneyebilirsin.'],
      ],
    },
    {
      type: 'file-tree',
      title: 'shop-backend-api dosya mimarisi',
      tree: `shop-backend-api/
├─ package.json
├─ .env.local
├─ requests/
│  └─ products.http
└─ src/
   ├─ lib/
   │  └─ db.ts
   └─ app/
      ├─ page.tsx
      └─ api/
         ├─ health/
         │  └─ route.ts
         ├─ products/
         │  ├─ route.ts
         │  └─ [id]/
         │     └─ route.ts
         └─ orders/
            └─ route.ts`,
      note: 'Next.js içinde route.ts özel isimdir. Klasör yolu API adresini belirler: src/app/api/products/route.ts -> /api/products.',
    },
    {
      type: 'code',
      label: 'package.json içinde göreceğin dependency alanı',
      language: 'json',
      code: packageJsonCode,
    },
    {
      type: 'code',
      label: '.env.local',
      language: 'bash',
      code: envLocalCode,
    },
    {
      type: 'code',
      label: 'src/lib/db.ts',
      language: 'typescript',
      code: dbTsCode,
    },
    {
      type: 'code',
      label: 'src/app/api/health/route.ts',
      language: 'typescript',
      code: healthRouteTsCode,
    },
    {
      type: 'code',
      label: 'src/app/api/products/route.ts',
      language: 'typescript',
      code: productsRouteTsCode,
    },
    {
      type: 'code',
      label: 'src/app/api/products/[id]/route.ts',
      language: 'typescript',
      code: productDetailRouteTsCode,
    },
    {
      type: 'code',
      label: 'src/app/api/orders/route.ts',
      language: 'typescript',
      code: ordersRouteTsCode,
    },
    {
      type: 'steps',
      items: [
        { label: 'API isteği gelir', desc: 'Örnek: GET /api/products?category=bilgisayar.' },
        { label: 'route.ts çalışır', desc: 'Next.js, bu adrese ait dosyayı bulur.' },
        { label: 'pool.query SQL çalıştırır', desc: 'API, shop.products ve shop.categories tablolarından veri ister.' },
        { label: 'PostgreSQL satırları döndürür', desc: 'Database sonucu rows olarak API’ye verir.' },
        { label: 'NextResponse JSON döndürür', desc: 'UI veya tester paneli düzenli JSON cevabı okur.' },
      ],
    },
    {
      type: 'backend-practice',
      icon: '🧩',
      title: { tr: 'Try It Yourself: API dosya sırasını yaz', en: 'Try It Yourself: Write the API file order' },
      intro: { tr: 'Hangi dosyayı neden açtığını sıraya koy.', en: 'Put the API files in the right order.' },
      help: { tr: 'Adımları burada düzenle. Bu alan gerçek server başlatmaz; sadece doğru kurulum sırasını denetler.', en: 'Edit the steps here. This area does not start a real server; it checks the setup order.' },
      starterCommands: `create-next-app shop-backend-api --ts --app
npm install pg zod
Create .env.local
Create src/lib/db.ts
Create src/app/api/products/route.ts
Write GET /api/products
Write POST /api/products
Create requests/products.http
Test GET request`,
      expectedSteps: [
        { label: { tr: 'Next.js projesi açıldı', en: 'Next project created' }, pattern: 'create-next-app.*shop-backend-api', example: 'create-next-app shop-backend-api --ts --app' },
        { label: { tr: 'Dependency kuruldu', en: 'Dependencies installed' }, pattern: 'npm install pg zod', example: 'npm install pg zod' },
        { label: { tr: 'Env dosyası hazır', en: 'Env file ready' }, pattern: '\\.env\\.local', example: 'Create .env.local' },
        { label: { tr: 'Database bağlantısı hazır', en: 'Database connection ready' }, pattern: 'src/lib/db\\.ts', example: 'Create src/lib/db.ts' },
        { label: { tr: 'Products route hazır', en: 'Products route ready' }, pattern: 'src/app/api/products/route\\.ts', example: 'Create src/app/api/products/route.ts' },
        { label: { tr: 'GET yazıldı', en: 'GET written' }, pattern: 'GET /api/products', example: 'Write GET /api/products' },
        { label: { tr: 'POST yazıldı', en: 'POST written' }, pattern: 'POST /api/products', example: 'Write POST /api/products' },
        { label: { tr: 'Test dosyası hazır', en: 'Test file ready' }, pattern: 'requests/products\\.http', example: 'Create requests/products.http' },
        { label: { tr: 'İlk test atıldı', en: 'First test sent' }, pattern: 'Test GET request', example: 'Test GET request' },
      ],
      successOutput: {
        tr: 'Temiz kurulum. Önce proje ve dependency, sonra gizli ayar, sonra db.ts, sonra route.ts, en son test.',
        en: 'Clean setup. Project and dependencies, env, db.ts, route.ts, then test.',
      },
      retryOutput: {
        tr: 'Sırada eksik var. db.ts olmadan route.ts içinden database konuşmasını sağlıklı kuramazsın.',
        en: 'Something is missing. Without db.ts, route.ts cannot talk to the database cleanly.',
      },
    },
  ],
}

const trApiTestRulesSection = {
  title: '🧪 API Test, Base URL, Endpoint ve Header',
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧪',
      content: 'API testinde önce UI’ı bekleme. Kapıya direkt git: base URL, endpoint, method, header ve body doğru mu kontrol et. UI sonra aynı kapıyı kullanır.',
    },
    {
      type: 'grid',
      cols: 4,
      items: [
        { icon: '🌍', label: 'Base URL', desc: 'Binanın adresi. Local örnek: http://localhost:3000.' },
        { icon: '🚪', label: 'Endpoint', desc: 'Binadaki kapı. Örnek: /api/products.' },
        { icon: '🏷️', label: 'Header', desc: 'Paketin etiketi. Örnek: Content-Type: application/json.' },
        { icon: '📦', label: 'Body', desc: 'POST ile gönderilen ürün bilgisi.' },
      ],
    },
    {
      type: 'table',
      headers: ['Konu', 'Developer nasıl belirler?', 'E-ticaret örneği'],
      rows: [
        ['Base URL', 'Ortamına göre seçilir: local, test, staging, production.', 'Local: http://localhost:3000, test: https://test-api.shop.com'],
        ['Endpoint', 'Kaynağın adına göre seçilir. Ürün için products, sipariş için orders.', 'GET /api/products, POST /api/orders'],
        ['Method', 'Ne yapmak istediğine göre seçilir.', 'GET oku, POST ekle, PATCH güncelle, DELETE sil'],
        ['Header', 'Veri tipi, kimlik ve izleme ihtiyacına göre seçilir.', 'Content-Type, Authorization, X-Request-Id'],
        ['Status code', 'Sonucun kısa işaretidir.', '200 başarılı okuma, 201 yeni kayıt, 400 eksik veri, 404 bulunamadı, 409 stok çakışması'],
      ],
    },
    {
      type: 'code',
      label: 'requests/products.http - VS Code REST Client testi',
      language: 'http',
      code: apiHttpTestCode,
    },
    {
      type: 'code',
      label: 'UI API ile nasıl konuşur? src/app/page.tsx',
      language: 'tsx',
      code: frontendFetchCode,
    },
    {
      type: 'steps',
      items: [
        { label: 'Önce health kontrol et', desc: 'GET /api/health API ayakta mı sorusuna cevap verir.' },
        { label: 'Sonra listeyi çek', desc: 'GET /api/products?category=bilgisayar doğru ürünleri getiriyor mu bak.' },
        { label: 'Sonra kötü veri gönder', desc: 'POST /api/products boş name ile 400 dönmeli.' },
        { label: 'Sonra iyi veri gönder', desc: 'POST doğru body ile 201 dönmeli ve yeni ürün JSON içinde görünmeli.' },
        { label: 'En son UI’a geç', desc: 'UI ürün kartları aynı API’den gelen veriyi kullanmalı.' },
      ],
    },
    {
      type: 'mock-backend-lab',
      variant: 'api',
      title: 'GET, POST, PATCH cevabını gözle gör',
      intro: 'Bu panel method, endpoint, status ve JSON cevabını sahte ürün tablosu üstünde canlandırır.',
    },
    {
      type: 'quiz',
      question: 'POST /api/products isteğinde Content-Type: application/json headerı neden kullanılır?',
      options: [
        { id: 'a', text: 'API’ye body içindeki verinin JSON olduğunu söylemek için' },
        { id: 'b', text: 'SQL tablosunu otomatik silmek için' },
        { id: 'c', text: 'Sadece UI rengini değiştirmek için' },
        { id: 'd', text: 'Endpoint adını gizlemek için' },
      ],
      correct: 'a',
      explanation: 'Header, paketin üstündeki etiket gibidir. API bu etikete bakarak body içeriğini nasıl okuyacağını bilir.',
    },
  ],
}

const enEcommerceMapSection = {
  title: '🛒 E-Commerce Backend Map',
  blocks: [
    { type: 'simple-box', emoji: '🛒', content: 'This page is a safe browser-only e-commerce backend rehearsal. You learn SQL, API, and backend testing with computers, clothing, and shoes.' },
    { type: 'text', content: 'A tester checks the same chain in real work: does the UI show the right products, does the API return the right JSON, and do SQL rows match the business rule?' },
    {
      type: 'grid',
      cols: 4,
      items: [
        { icon: '🖥️', label: 'UI box', desc: 'Product cards, category filter, price, and stock.' },
        { icon: '➡️', label: 'API door', desc: 'The UI asks addresses like /api/products.' },
        { icon: '🗄️', label: 'SQL cabinet', desc: 'Products, categories, customers, and orders live here.' },
        { icon: '🧪', label: 'Tester panel', desc: 'Use DBeaver, Postman, or VS Code REST Client.' },
      ],
    },
    { type: 'mock-backend-lab', variant: 'api', title: 'Browser-only e-commerce API panel', intro: 'This panel does not call a real network; it animates product rows, stock, and JSON.' },
  ],
}

const enDbeaverSqlSection = {
  title: '🗄️ Build SQL Database with DBeaver',
  blocks: [
    { type: 'simple-box', emoji: '🗄️', content: 'DBeaver is a control desk for your database. Open an SQL Editor, create the shop schema, then add realistic product and order data.' },
    { type: 'warning', content: 'Use a local or training database. Do not practice on a live company database.' },
    { type: 'code', label: 'DBeaver SQL Editor: schema and tables', language: 'sql', code: shopSchemaSql },
    { type: 'code', label: 'DBeaver SQL Editor: mock data', language: 'sql', code: shopMockDataSql },
    { type: 'code', label: 'Tester check queries', language: 'sql', code: shopQaQueriesSql },
  ],
}

const enNextApiSection = {
  title: '🧩 Next.js TypeScript API in VS Code',
  blocks: [
    { type: 'simple-box', emoji: '🧩', content: 'The API is the door between the UI and SQL. The UI calls /api/products, the API runs SQL, and JSON comes back.' },
    { type: 'warning', content: 'This LearnQA.dev app runs on React + Vite. The Next.js API project below is a separate learning folder.' },
    {
      type: 'installation',
      title: 'Create the API project',
      steps: [
        { cmd: 'npx create-next-app@latest shop-backend-api --ts --app', explanation: 'Creates a separate Next.js + TypeScript project.' },
        { cmd: 'cd shop-backend-api', explanation: 'Moves the terminal into the new API project.' },
        { cmd: 'npm install pg zod', explanation: 'pg talks to PostgreSQL. zod validates incoming request body.' },
        { cmd: 'npm install -D @types/pg', explanation: 'Adds TypeScript types for pg.' },
        { cmd: 'code .', explanation: 'Opens the folder in VS Code.' },
        { cmd: 'npm run dev', explanation: 'Starts the local API at http://localhost:3000.' },
      ],
    },
    {
      type: 'file-tree',
      title: 'shop-backend-api file map',
      tree: `shop-backend-api/
├─ package.json
├─ .env.local
├─ requests/
│  └─ products.http
└─ src/
   ├─ lib/
   │  └─ db.ts
   └─ app/
      ├─ page.tsx
      └─ api/
         ├─ products/
         │  ├─ route.ts
         │  └─ [id]/
         │     └─ route.ts
         └─ orders/
            └─ route.ts`,
      note: 'In Next.js, route.ts is special. The folder path becomes the API address.',
    },
    { type: 'code', label: 'src/lib/db.ts', language: 'typescript', code: dbTsCode },
    { type: 'code', label: 'src/app/api/health/route.ts', language: 'typescript', code: healthRouteTsCode },
    { type: 'code', label: 'src/app/api/products/route.ts', language: 'typescript', code: productsRouteTsCode },
  ],
}

const enApiTestRulesSection = {
  title: '🧪 API Test, Base URL, Endpoint, Header',
  blocks: [
    { type: 'simple-box', emoji: '🧪', content: 'Test the API before waiting for the UI. Check base URL, endpoint, method, headers, body, status, and JSON.' },
    { type: 'code', label: 'requests/products.http', language: 'http', code: apiHttpTestCode },
    { type: 'code', label: 'UI calls the API: src/app/page.tsx', language: 'tsx', code: frontendFetchCode },
    { type: 'mock-backend-lab', variant: 'api', title: 'See GET, POST, PATCH responses', intro: 'This panel animates method, endpoint, status, and JSON on fake product rows.' },
  ],
}

export const basitBackendData = {
  tr: {
    hero: {
      title: '🛒 Basit Backend: E-Ticaret SQL ve API Lab',
      subtitle: 'DBeaver ile PostgreSQL kur, Next.js TypeScript API yaz, tester gibi doğrula',
      intro: 'Bilgisayar, elbise ve ayakkabı satan gerçekçi bir mağaza senaryosunda database, API ve UI bağlantısını adım adım öğren.',
    },
    tabs: ['🛒 Backend Haritası', '🗄️ DBeaver SQL', '🧩 Next.js API', '🧪 API Test'],
    sections: [trEcommerceMapSection, trDbeaverSqlSection, trNextApiSection, trApiTestRulesSection],
    disableTabGating: true,
  },
  en: {
    hero: {
      title: '🛒 Simple Backend: E-Commerce SQL and API Lab',
      subtitle: 'Build PostgreSQL with DBeaver, code a Next.js TypeScript API, and verify like a tester',
      intro: 'Learn database, API, and UI communication through a realistic shop that sells computers, clothing, and shoes.',
    },
    tabs: ['🛒 Backend Map', '🗄️ DBeaver SQL', '🧩 Next.js API', '🧪 API Test'],
    sections: [enEcommerceMapSection, enDbeaverSqlSection, enNextApiSection, enApiTestRulesSection],
    disableTabGating: true,
  },
}
