// Sepet — oluştur, görüntüle, ürün ekle/güncelle/çıkar, kupon uygula
import express from 'express'
import crypto from 'node:crypto'
import { query, withTransaction } from '../db.js'
import { asyncRoute, badRequest, conflict, forbidden, notFound, unprocessable } from '../lib/errors.js'
import { optionalAuth } from '../middleware/auth.js'
import { requireWritableSandbox } from '../middleware/sandbox.js'
import { summarize } from '../core/pricing.js'
import { checkCoupon, checkStock } from '../core/rules.js'
import { isBugOn } from '../core/bugFlags.js'
import { auditFromRequest } from '../lib/audit.js'

export const cartRouter = express.Router()

// Sepet yazma işlemlerinin ortak ön koşulları.
cartRouter.use(requireWritableSandbox, optionalAuth)

async function loadCart(client, sandboxId, cartId) {
    const { rows } = await client.query(
        `select id, user_id, guest_token, status, coupon_code, created_at
           from carts where sandbox_id = $1 and id = $2`,
        [sandboxId, cartId],
    )
    return rows[0] || null
}

// Sahiplik kontrolü.
// Üyeye bağlı sepete YALNIZCA o üye erişebilir; misafir sepeti id'siyle
// erişilebilir (pratik ortamında bilinçli sadelik — gerçek bir mağazada
// guest_token çerez olarak doğrulanırdı).
function assertCartAccess(cart, user) {
    if (cart.user_id != null) {
        if (!user) throw forbidden('Bu sepet bir kullanıcıya ait, giriş yapman gerekiyor')
        if (cart.user_id !== user.id) throw forbidden('Bu sepet sana ait değil')
    }
}

async function cartDetail(client, sandboxId, cartId) {
    const { rows: items } = await client.query(
        `select ci.id, ci.variant_id, ci.qty, ci.unit_price_snapshot as unit_price,
                round(ci.unit_price_snapshot * ci.qty, 2) as line_total,
                v.sku as variant_sku, v.size, v.color,
                p.id as product_id, p.name as product_name,
                round(p.price + v.price_delta, 2) as current_price,
                i.stock_qty, greatest(i.stock_qty - i.reserved_qty, 0) as available
           from cart_items ci
           join product_variants v on v.id = ci.variant_id
           join products p on p.id = v.product_id
           left join inventory i on i.variant_id = v.id
          where ci.sandbox_id = $1 and ci.cart_id = $2
          order by ci.id`,
        [sandboxId, cartId],
    )

    const { rows: cartRows } = await client.query(
        'select id, user_id, status, coupon_code, created_at from carts where id = $1', [cartId])
    const cart = cartRows[0]

    let coupon = null
    if (cart.coupon_code) {
        const { rows } = await client.query(
            'select * from coupons where sandbox_id = $1 and code = $2', [sandboxId, cart.coupon_code])
        coupon = rows[0] || null
    }

    const totals = summarize(items, coupon)

    // Fiyat değişimi UYARISI: sepetteki fiyat, ürünün GÜNCEL fiyatından
    // farklıysa burada görünür. Sepet eski fiyatı korur (unit_price_snapshot);
    // bu bir bug değil, bilinçli bir karardır — ama test edilmesi gereken bir
    // karardır, çünkü arayüz hangisini göstereceğine kendi karar verir.
    const priceChanged = items
        .filter((it) => Number(it.unit_price) !== Number(it.current_price))
        .map((it) => ({
            itemId: it.id,
            variantSku: it.variant_sku,
            cartPrice: Number(it.unit_price),
            currentPrice: Number(it.current_price),
        }))

    return {
        cart: { id: cart.id, userId: cart.user_id, status: cart.status, couponCode: cart.coupon_code, createdAt: cart.created_at },
        items,
        itemCount: items.reduce((n, it) => n + Number(it.qty), 0),
        totals,
        warnings: priceChanged.length ? { priceChanged } : {},
    }
}

// POST /api/v1/carts
cartRouter.post('/', asyncRoute(async (req, res) => {
    const guestToken = req.user ? null : `guest_${crypto.randomBytes(12).toString('hex')}`
    const { rows } = await query(
        `insert into carts (sandbox_id, user_id, guest_token) values ($1, $2, $3)
         returning id, user_id, guest_token, status, created_at`,
        [req.sandbox.id, req.user?.id ?? null, guestToken],
    )
    await auditFromRequest(req, { action: 'cart.create', entity: 'cart', entityId: rows[0].id })
    res.status(201).location(`/api/v1/carts/${rows[0].id}`).json({ cart: rows[0] })
}))

// GET /api/v1/carts/:id
cartRouter.get('/:id', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(cartId)) throw badRequest('Sepet id sayı olmalı', { got: req.params.id })

    const cart = await loadCart({ query }, req.sandbox.id, cartId)
    if (!cart) throw notFound('Sepet bulunamadı')
    assertCartAccess(cart, req.user)

    res.json(await cartDetail({ query }, req.sandbox.id, cartId))
}))

// POST /api/v1/carts/:id/items  { variantId, qty }
//
// Sepete eklemek stok REZERVE eder. Rezervasyon olmadan, iki kullanıcı son
// ürünü sepetine atar ve ikisi de checkout'a kadar sorunsuz ilerler — hata
// en son anda, ödeme sonrası ortaya çıkar.
cartRouter.post('/:id/items', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.params.id, 10)
    const variantId = Number.parseInt(req.body?.variantId, 10)
    const qty = Number.parseInt(req.body?.qty ?? 1, 10)

    if (!Number.isInteger(cartId)) throw badRequest('Sepet id sayı olmalı')
    if (!Number.isInteger(variantId)) throw unprocessable('INVALID_VARIANT', 'variantId zorunlu ve sayı olmalı', { field: 'variantId' })
    if (!Number.isInteger(qty) || qty < 1) throw unprocessable('INVALID_QTY', 'qty en az 1 olmalı', { field: 'qty', got: req.body?.qty })

    const result = await withTransaction(async (client) => {
        const cart = await loadCart(client, req.sandbox.id, cartId)
        if (!cart) throw notFound('Sepet bulunamadı')
        assertCartAccess(cart, req.user)
        if (cart.status !== 'open') throw conflict('CART_NOT_OPEN', `Sepet '${cart.status}' durumunda, değiştirilemez`)

        // FOR UPDATE: aynı varyanta eş zamanlı iki istek gelirse ikincisi
        // birincinin yazdığı rezervasyonu GÖRÜR. Bu kilit olmadan iki istek de
        // eski stoğu okur ve ikisi de geçer (klasik yarış koşulu).
        const { rows: invRows } = await client.query(
            `select i.variant_id, i.stock_qty, i.reserved_qty,
                    round(p.price + v.price_delta, 2) as unit_price, p.is_active, p.name
               from inventory i
               join product_variants v on v.id = i.variant_id
               join products p on p.id = v.product_id
              where i.sandbox_id = $1 and i.variant_id = $2
              for update of i`,
            [req.sandbox.id, variantId],
        )
        const inv = invRows[0]
        if (!inv) throw notFound('Varyant bulunamadı')
        if (!inv.is_active) throw unprocessable('PRODUCT_INACTIVE', 'Bu ürün artık satışta değil')

        const { rows: existingRows } = await client.query(
            'select id, qty from cart_items where cart_id = $1 and variant_id = $2', [cartId, variantId])
        const existing = existingRows[0]
        const newQty = existing ? Number(existing.qty) + qty : qty

        // Kontrol EKLENEN adet üzerinden yapılır, toplam üzerinden değil:
        // satırda zaten duran adet stoğu çoktan rezerve etmiştir
        // (available = stock - reserved). Toplamla kıyaslamak aynı adedi iki
        // kez saydırır ve stok varken "tükendi" denmesine yol açar.
        // `oversell` anahtarı açıkken kontrol satılabilir adet yerine HAM stoğa
        // bakar: sepette bekleyen adet yok sayılır ve aynı son ürün birden çok
        // sepete girer. Kusur bilinçlidir (bkz. core/bugFlags.js).
        const stock = isBugOn(req.sandbox.bug_flags, 'oversell')
            ? checkStock({ stock_qty: inv.stock_qty, reserved_qty: 0 }, qty)
            : checkStock(inv, qty)
        if (!stock.ok) {
            throw conflict('OUT_OF_STOCK', stock.message, stock.details)
        }

        if (existing) {
            await client.query('update cart_items set qty = $1 where id = $2', [newQty, existing.id])
        } else {
            await client.query(
                `insert into cart_items (sandbox_id, cart_id, variant_id, qty, unit_price_snapshot)
                 values ($1, $2, $3, $4, $5)`,
                [req.sandbox.id, cartId, variantId, qty, inv.unit_price],
            )
        }

        // `skip_reserve` anahtarı açıkken rezervasyon HİÇ yazılmaz: ürün sepette
        // görünür ama stok herkese boşmuş gibi kalır. Kusur checkout anına kadar
        // saklanır — sepet ekranına bakan bir test bunu asla göremez.
        if (!isBugOn(req.sandbox.bug_flags, 'skip_reserve')) {
            await client.query(
                'update inventory set reserved_qty = reserved_qty + $1 where variant_id = $2', [qty, variantId])
        }

        return cartDetail(client, req.sandbox.id, cartId)
    })

    await auditFromRequest(req, {
        action: 'cart.add_item', entity: 'cart', entityId: cartId, detail: { variantId, qty },
    })
    res.status(201).json(result)
}))

// PATCH /api/v1/carts/:id/items/:itemId  { qty }
cartRouter.patch('/:id/items/:itemId', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.params.id, 10)
    const itemId = Number.parseInt(req.params.itemId, 10)
    const qty = Number.parseInt(req.body?.qty, 10)

    if (!Number.isInteger(qty) || qty < 1) {
        // qty=0 ile silme YAPILMAZ; silmek için DELETE var. Aynı işi iki
        // farklı yolla yapmak, iki farklı davranışın zamanla ayrışmasına yol açar.
        throw unprocessable('INVALID_QTY', 'qty en az 1 olmalı. Ürünü çıkarmak için DELETE kullan', { got: req.body?.qty })
    }

    const result = await withTransaction(async (client) => {
        const cart = await loadCart(client, req.sandbox.id, cartId)
        if (!cart) throw notFound('Sepet bulunamadı')
        assertCartAccess(cart, req.user)
        if (cart.status !== 'open') throw conflict('CART_NOT_OPEN', `Sepet '${cart.status}' durumunda`)

        const { rows: itemRows } = await client.query(
            'select id, variant_id, qty from cart_items where cart_id = $1 and id = $2', [cartId, itemId])
        const item = itemRows[0]
        if (!item) throw notFound('Sepet satırı bulunamadı')

        const delta = qty - Number(item.qty)

        if (delta > 0) {
            const { rows: invRows } = await client.query(
                `select stock_qty, reserved_qty from inventory
                  where variant_id = $1 for update`, [item.variant_id])
            const stock = checkStock(invRows[0], delta)
            if (!stock.ok) throw conflict('OUT_OF_STOCK', stock.message, stock.details)
        }

        await client.query('update cart_items set qty = $1 where id = $2', [qty, itemId])
        await client.query(
            'update inventory set reserved_qty = greatest(reserved_qty + $1, 0) where variant_id = $2',
            [delta, item.variant_id])

        return cartDetail(client, req.sandbox.id, cartId)
    })

    await auditFromRequest(req, {
        action: 'cart.update_item', entity: 'cart', entityId: cartId, detail: { itemId, qty },
    })
    res.json(result)
}))

// DELETE /api/v1/carts/:id/items/:itemId
cartRouter.delete('/:id/items/:itemId', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.params.id, 10)
    const itemId = Number.parseInt(req.params.itemId, 10)

    await withTransaction(async (client) => {
        const cart = await loadCart(client, req.sandbox.id, cartId)
        if (!cart) throw notFound('Sepet bulunamadı')
        assertCartAccess(cart, req.user)
        if (cart.status !== 'open') throw conflict('CART_NOT_OPEN', `Sepet '${cart.status}' durumunda`)

        const { rows } = await client.query(
            'delete from cart_items where cart_id = $1 and id = $2 returning variant_id, qty',
            [cartId, itemId])
        const removed = rows[0]
        if (!removed) throw notFound('Sepet satırı bulunamadı')

        // Rezervasyon geri bırakılır. Bu satır unutulursa stok yavaş yavaş
        // "sızar": kimse almadığı hâlde ürün tükenmiş görünür.
        await client.query(
            'update inventory set reserved_qty = greatest(reserved_qty - $1, 0) where variant_id = $2',
            [removed.qty, removed.variant_id])
    })

    await auditFromRequest(req, {
        action: 'cart.remove_item', entity: 'cart', entityId: cartId, detail: { itemId },
    })
    res.status(204).end()
}))

// POST /api/v1/carts/:id/coupon  { code }
cartRouter.post('/:id/coupon', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.params.id, 10)
    const code = typeof req.body?.code === 'string' ? req.body.code.trim().toUpperCase() : null
    if (!code) throw unprocessable('INVALID_COUPON_CODE', 'code zorunlu', { field: 'code' })

    const result = await withTransaction(async (client) => {
        const cart = await loadCart(client, req.sandbox.id, cartId)
        if (!cart) throw notFound('Sepet bulunamadı')
        assertCartAccess(cart, req.user)
        if (cart.status !== 'open') throw conflict('CART_NOT_OPEN', `Sepet '${cart.status}' durumunda`)

        const { rows: couponRows } = await client.query(
            'select * from coupons where sandbox_id = $1 and code = $2', [req.sandbox.id, code])
        const coupon = couponRows[0] || null

        const detail = await cartDetail(client, req.sandbox.id, cartId)
        const subtotal = detail.totals.subtotal

        // Geçerlilik kararı core/rules.js'te; buradaki iş yalnızca sonucu
        // HTTP'ye çevirmek. Reddetme nedeni ayrı bir kodla dönüyor —
        // "kupon geçersiz" demek, hangi kuralın devreye girdiğini test
        // edilemez hâle getirirdi.
        const verdict = checkCoupon(coupon, subtotal)
        if (!verdict.ok) {
            throw unprocessable(verdict.reason, verdict.message, verdict.details)
        }

        await client.query('update carts set coupon_code = $1 where id = $2', [code, cartId])
        return cartDetail(client, req.sandbox.id, cartId)
    })

    await auditFromRequest(req, {
        action: 'cart.apply_coupon', entity: 'cart', entityId: cartId, detail: { code },
    })
    res.json(result)
}))
