// Katalog — ürün, kategori, marka, arama
import express from 'express'
import { query } from '../db.js'
import { asyncRoute, badRequest, notFound } from '../lib/errors.js'

export const catalogRouter = express.Router()

// Sıralanabilir sütunlar BEYAZ LİSTE ile sabitlenir.
// `order by ${req.query.sort}` yazmak klasik SQL injection'dır: sütun adları
// parametreleştirilemez (parametre yalnızca DEĞER olabilir), bu yüzden tek
// güvenli yol sabit bir eşleme tablosudur.
const SORTABLE = {
    price: 'p.price',
    name: 'p.name',
    created: 'p.created_at',
    sku: 'p.sku',
}

function parsePaging(req) {
    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10) || 1)
    const rawSize = Number.parseInt(req.query.size || '20', 10) || 20
    const size = Math.min(Math.max(1, rawSize), 100)
    return { page, size, offset: (page - 1) * size }
}

function pageEnvelope({ page, size, total, items }) {
    return {
        page,
        size,
        total,
        totalPages: Math.ceil(total / size) || 0,
        hasNext: page * size < total,
        items,
    }
}

// GET /api/v1/products
// ?page&size&sort=price|name|created|sku&order=asc|desc
// &category=<slug>&brand=<name>&minPrice&maxPrice&q&includeInactive
catalogRouter.get('/products', asyncRoute(async (req, res) => {
    const { page, size, offset } = parsePaging(req)

    const sortKey = req.query.sort || 'sku'
    if (!SORTABLE[sortKey]) {
        throw badRequest(`sort yalnızca şunlar olabilir: ${Object.keys(SORTABLE).join(', ')}`, { got: sortKey })
    }
    const direction = String(req.query.order || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC'

    const params = [req.sandbox.id]
    const where = ['p.sandbox_id = $1']

    // Pasif ürün varsayılan olarak GİZLİ (soft delete). `includeInactive=true`
    // ile görünür — "silinen ürün katalogda çıkmamalı ama eski siparişte
    // durmalı" kuralının test edilebilir hâli.
    if (String(req.query.includeInactive) !== 'true') where.push('p.is_active = true')

    if (req.query.category) { params.push(req.query.category); where.push(`c.slug = $${params.length}`) }
    if (req.query.brand)    { params.push(req.query.brand);    where.push(`b.name = $${params.length}`) }
    if (req.query.minPrice) { params.push(Number(req.query.minPrice)); where.push(`p.price >= $${params.length}`) }
    if (req.query.maxPrice) { params.push(Number(req.query.maxPrice)); where.push(`p.price <= $${params.length}`) }
    if (req.query.q)        { params.push(`%${req.query.q}%`);  where.push(`p.name ILIKE $${params.length}`) }

    const whereSql = where.join(' and ')

    // ⚠ Marka LEFT JOIN: markasız ürünler (brand_id IS NULL) var. INNER JOIN
    // yazılsaydı bu ürünler listeden SESSİZCE düşerdi — hata vermeyen, yalnızca
    // eksik sonuç veren bir bug sınıfı.
    const countSql = `
        select count(*)::int as total
          from products p
          left join categories c on c.id = p.category_id
          left join brands b on b.id = p.brand_id
         where ${whereSql}`

    const listSql = `
        select p.id, p.sku, p.name, p.description, p.price, p.currency, p.is_active, p.created_at,
               c.slug as category, c.name as category_name,
               b.name as brand,
               (select count(*)::int from product_variants v where v.product_id = p.id) as variant_count,
               (select coalesce(sum(i.stock_qty), 0)::int
                  from product_variants v join inventory i on i.variant_id = v.id
                 where v.product_id = p.id) as total_stock
          from products p
          left join categories c on c.id = p.category_id
          left join brands b on b.id = p.brand_id
         where ${whereSql}
         order by ${SORTABLE[sortKey]} ${direction}, p.id ASC
         limit $${params.length + 1} offset $${params.length + 2}`

    const [countRes, listRes] = await Promise.all([
        query(countSql, params),
        query(listSql, [...params, size, offset]),
    ])

    res.json(pageEnvelope({ page, size, total: countRes.rows[0].total, items: listRes.rows }))
}))

// GET /api/v1/products/:id
catalogRouter.get('/products/:id', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Ürün id sayı olmalı', { got: req.params.id })

    const { rows } = await query(
        `select p.id, p.sku, p.name, p.description, p.price, p.currency, p.is_active, p.created_at,
                c.slug as category, c.name as category_name, b.name as brand,
                round(avg(r.rating) filter (where r.status = 'approved'), 2) as rating_avg,
                count(r.id) filter (where r.status = 'approved')::int as rating_count
           from products p
           left join categories c on c.id = p.category_id
           left join brands b on b.id = p.brand_id
           left join reviews r on r.product_id = p.id
          where p.sandbox_id = $1 and p.id = $2
          group by p.id, c.slug, c.name, b.name`,
        [req.sandbox.id, id],
    )
    const product = rows[0]
    if (!product) throw notFound('Ürün bulunamadı')

    // Pasif ürün katalogdan kaldırılmıştır → 404. Eski siparişlerde adı
    // korunur (order_items.name_snapshot), yani geçmiş bozulmaz.
    if (!product.is_active) throw notFound('Ürün artık satışta değil')

    // Ortalama puan YALNIZCA onaylı yorumlardan hesaplanıyor: bekleyen yorum
    // puana etki etmemeli (bkz. doğrulama sorgusu C7).
    res.json({ product })
}))

// GET /api/v1/products/:id/variants
catalogRouter.get('/products/:id/variants', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Ürün id sayı olmalı', { got: req.params.id })

    const exists = await query(
        'select 1 from products where sandbox_id = $1 and id = $2', [req.sandbox.id, id])
    if (!exists.rows.length) throw notFound('Ürün bulunamadı')

    const { rows } = await query(
        `select v.id, v.sku, v.size, v.color,
                round(p.price + v.price_delta, 2) as price,
                i.stock_qty, i.reserved_qty,
                greatest(i.stock_qty - i.reserved_qty, 0) as available
           from product_variants v
           join products p on p.id = v.product_id
           left join inventory i on i.variant_id = v.id
          where v.sandbox_id = $1 and v.product_id = $2
          order by v.id`,
        [req.sandbox.id, id],
    )
    res.json({ productId: id, total: rows.length, variants: rows })
}))

// GET /api/v1/categories — ağaç yapısı
catalogRouter.get('/categories', asyncRoute(async (req, res) => {
    const { rows } = await query(
        `select c.id, c.name, c.slug, c.parent_id,
                (select count(*)::int from products p
                  where p.category_id = c.id and p.is_active) as product_count
           from categories c
          where c.sandbox_id = $1
          order by coalesce(c.parent_id, c.id), c.id`,
        [req.sandbox.id],
    )
    const byId = new Map(rows.map((r) => [r.id, { ...r, children: [] }]))
    const roots = []
    for (const node of byId.values()) {
        if (node.parent_id && byId.has(node.parent_id)) byId.get(node.parent_id).children.push(node)
        else roots.push(node)
    }
    res.json({ total: rows.length, categories: roots })
}))

// GET /api/v1/categories/:id/products
catalogRouter.get('/categories/:id/products', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Kategori id sayı olmalı', { got: req.params.id })
    const { page, size, offset } = parsePaging(req)

    const cat = await query(
        'select id, name, slug from categories where sandbox_id = $1 and id = $2',
        [req.sandbox.id, id])
    if (!cat.rows.length) throw notFound('Kategori bulunamadı')

    // Alt kategorileri de kapsar (recursive CTE): "Clothing" istendiğinde
    // T-Shirts/Jeans altındaki ürünler de dönmeli. Yalnızca doğrudan eşleşmeye
    // bakan bir sorgu üst kategorilerde her zaman boş liste döndürürdü.
    const [countRes, listRes] = await Promise.all([
        query(
            `with recursive tree as (
                 select id from categories where sandbox_id = $1 and id = $2
                 union all
                 select c.id from categories c join tree t on c.parent_id = t.id
             )
             select count(*)::int as total from products p
              where p.sandbox_id = $1 and p.is_active and p.category_id in (select id from tree)`,
            [req.sandbox.id, id]),
        query(
            `with recursive tree as (
                 select id from categories where sandbox_id = $1 and id = $2
                 union all
                 select c.id from categories c join tree t on c.parent_id = t.id
             )
             select p.id, p.sku, p.name, p.price, p.currency, b.name as brand
                from products p
                left join brands b on b.id = p.brand_id
               where p.sandbox_id = $1 and p.is_active and p.category_id in (select id from tree)
               order by p.sku
               limit $3 offset $4`,
            [req.sandbox.id, id, size, offset]),
    ])

    res.json({
        category: cat.rows[0],
        ...pageEnvelope({ page, size, total: countRes.rows[0].total, items: listRes.rows }),
    })
}))

// GET /api/v1/brands
catalogRouter.get('/brands', asyncRoute(async (req, res) => {
    const { rows } = await query(
        `select b.id, b.name,
                (select count(*)::int from products p
                  where p.brand_id = b.id and p.is_active) as product_count
           from brands b
          where b.sandbox_id = $1
          order by b.name`,
        [req.sandbox.id],
    )
    res.json({ total: rows.length, brands: rows })
}))

// GET /api/v1/search?q=
catalogRouter.get('/search', asyncRoute(async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : ''
    const { page, size, offset } = parsePaging(req)

    // Boş arama TÜM katalogu döndürmez → 400. Sessizce her şeyi döndürmek,
    // arama kutusuna yanlışlıkla boş istek atan arayüzde fark edilmeyen bir
    // performans sorununa dönüşür.
    if (q.length < 2) {
        throw badRequest('Arama terimi en az 2 karakter olmalı', { q })
    }

    const like = `%${q}%`
    const [countRes, listRes] = await Promise.all([
        query(
            `select count(*)::int as total from products p
              where p.sandbox_id = $1 and p.is_active
                and (p.name ILIKE $2 or p.sku ILIKE $2 or p.description ILIKE $2)`,
            [req.sandbox.id, like]),
        query(
            `select p.id, p.sku, p.name, p.price, p.currency, b.name as brand, c.slug as category
               from products p
               left join brands b on b.id = p.brand_id
               left join categories c on c.id = p.category_id
              where p.sandbox_id = $1 and p.is_active
                and (p.name ILIKE $2 or p.sku ILIKE $2 or p.description ILIKE $2)
              order by p.name
              limit $3 offset $4`,
            [req.sandbox.id, like, size, offset]),
    ])

    res.json({ q, ...pageEnvelope({ page, size, total: countRes.rows[0].total, items: listRes.rows }) })
}))
