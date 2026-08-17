// Sipariş — checkout, listeleme, detay, iptal, fatura
import express from 'express'
import { query, withTransaction } from '../db.js'
import { asyncRoute, badRequest, conflict, forbidden, notFound, unprocessable } from '../lib/errors.js'
import { requireAuth } from '../middleware/auth.js'
import { requireWritableSandbox } from '../middleware/sandbox.js'
import { summarize, round2 } from '../core/pricing.js'
import { checkCoupon, canCancel, canReturn, canTransition, RETURN_WINDOW_DAYS } from '../core/rules.js'
import { isBugOn } from '../core/bugFlags.js'
import { auditFromRequest } from '../lib/audit.js'

export const ordersRouter = express.Router()

// Sipariş işlemlerinin TAMAMI giriş ister — misafir checkout bilinçli olarak yok.
ordersRouter.use(requireWritableSandbox, requireAuth)

async function loadOrder(client, sandboxId, orderId) {
    const { rows } = await client.query(
        `select id, order_no, user_id, status, subtotal, discount_total, shipping_total,
                grand_total, coupon_code, placed_at
           from orders where sandbox_id = $1 and id = $2`,
        [sandboxId, orderId],
    )
    return rows[0] || null
}

// POST /api/v1/orders  { cartId }
ordersRouter.post('/', asyncRoute(async (req, res) => {
    const cartId = Number.parseInt(req.body?.cartId, 10)
    if (!Number.isInteger(cartId)) {
        throw unprocessable('INVALID_CART_ID', 'cartId zorunlu ve sayı olmalı', { field: 'cartId' })
    }

    const order = await withTransaction(async (client) => {
        // Sipariş numarası üretimi için kiracı bazlı kilit. İki eş zamanlı
        // checkout aynı numarayı hesaplayıp UNIQUE ihlaline düşmesin diye —
        // kilit yerine "hata alırsak tekrar deneriz" demek, testlerde
        // açıklanamayan 409'lar üretirdi.
        await client.query('select pg_advisory_xact_lock(hashtext($1))', [req.sandbox.id])

        const { rows: cartRows } = await client.query(
            `select id, user_id, status, coupon_code from carts
              where sandbox_id = $1 and id = $2 for update`,
            [req.sandbox.id, cartId],
        )
        const cart = cartRows[0]
        if (!cart) throw notFound('Sepet bulunamadı')
        if (cart.user_id != null && cart.user_id !== req.user.id) {
            throw forbidden('Bu sepet sana ait değil')
        }
        if (cart.status !== 'open') {
            throw conflict('CART_NOT_OPEN', `Sepet '${cart.status}' durumunda, sipariş verilemez`)
        }

        const { rows: items } = await client.query(
            `select ci.id, ci.variant_id, ci.qty, ci.unit_price_snapshot as unit_price,
                    round(ci.unit_price_snapshot * ci.qty, 2) as line_total,
                    p.name as product_name, p.is_active,
                    i.stock_qty, i.reserved_qty
               from cart_items ci
               join product_variants v on v.id = ci.variant_id
               join products p on p.id = v.product_id
               join inventory i on i.variant_id = ci.variant_id
              where ci.cart_id = $1
              order by ci.id
                for update of i`,
            [cartId],
        )

        if (!items.length) throw unprocessable('EMPTY_CART', 'Boş sepetle sipariş verilemez')

        const inactive = items.filter((it) => !it.is_active)
        if (inactive.length) {
            throw unprocessable('PRODUCT_INACTIVE',
                'Sepetinde artık satışta olmayan ürün var',
                { variantIds: inactive.map((it) => it.variant_id) })
        }

        // Stok, sepete eklerken zaten rezerve edilmişti. Yine de son kez
        // kontrol edilir: araya giren bir stok DÜZELTMESİ (admin, iade, veri
        // düzeltme) rezervasyonu geçersiz kılmış olabilir.
        const short = items.filter((it) => Number(it.stock_qty) < Number(it.qty))
        if (short.length) {
            throw conflict('OUT_OF_STOCK', 'Sepetteki bazı ürünlerin stoğu yetersiz', {
                items: short.map((it) => ({ variantId: it.variant_id, requested: it.qty, stock: it.stock_qty })),
            })
        }

        // Kupon CHECKOUT ANINDA yeniden doğrulanır. Sepete eklendiğinde geçerli
        // olması yetmez — kullanıcı sepeti bir hafta açık bırakmış olabilir,
        // kupon bu sürede dolmuş olabilir. Bu yeniden doğrulama atlanırsa
        // "süresi geçmiş kuponla indirim" hatası doğar (doğrulama sorgusu C3).
        let coupon = null
        if (cart.coupon_code) {
            const { rows } = await client.query(
                'select * from coupons where sandbox_id = $1 and code = $2 for update',
                [req.sandbox.id, cart.coupon_code])
            coupon = rows[0] || null
            // `ignore_coupon_expiry` anahtarı açıkken bu yeniden doğrulama hiç
            // yapılmaz: sepete eklendiğinde geçerli olan kupon, süresi dolmuş
            // olsa bile indirim üretmeye devam eder.
            if (!isBugOn(req.sandbox.bug_flags, 'ignore_coupon_expiry')) {
                const preTotals = summarize(items, null)
                const verdict = checkCoupon(coupon, preTotals.subtotal)
                if (!verdict.ok) {
                    throw unprocessable(verdict.reason,
                        `Kupon artık geçerli değil: ${verdict.message}`, verdict.details)
                }
            }
        }

        const totals = summarize(items, coupon)

        // `discount_twice` anahtarı açıkken indirim toplamdan bir kez daha
        // düşülür. Sipariş kaydı yazılır, arayüz yeşil onay gösterir; fark
        // yalnızca grand_total ile bileşenleri karşılaştırıldığında görünür.
        if (coupon && isBugOn(req.sandbox.bug_flags, 'discount_twice')) {
            totals.grand_total = round2(totals.grand_total - totals.discount_total)
        }

        const { rows: seqRows } = await client.query(
            `select coalesce(max(substring(order_no from 5)::int), 1000) + 1 as next
               from orders
              where sandbox_id = $1 and order_no ~ '^ORD-[0-9]+$'`,
            [req.sandbox.id],
        )
        const orderNo = `ORD-${seqRows[0].next}`

        const { rows: orderRows } = await client.query(
            `insert into orders (sandbox_id, order_no, user_id, status,
                                 subtotal, discount_total, shipping_total, grand_total, coupon_code)
             values ($1, $2, $3, 'placed', $4, $5, $6, $7, $8)
             returning id, order_no, status, subtotal, discount_total, shipping_total,
                       grand_total, coupon_code, placed_at`,
            [req.sandbox.id, orderNo, req.user.id, totals.subtotal, totals.discount_total,
             totals.shipping_total, totals.grand_total, cart.coupon_code],
        )
        const created = orderRows[0]

        for (const it of items) {
            // `wrong_line_total` anahtarı açıkken satır toplamı adetle
            // çarpılmadan yazılır. TEK adetlik satırlarda fark yoktur — kusur
            // yalnızca çok adetli satırlarda ortaya çıkar; bu yüzden qty=1 ile
            // yazılmış bir test onu asla yakalayamaz.
            const lineTotalValue = isBugOn(req.sandbox.bug_flags, 'wrong_line_total')
                ? round2(it.unit_price)
                : round2(it.line_total)

            await client.query(
                `insert into order_items (sandbox_id, order_id, variant_id, name_snapshot,
                                         qty, unit_price, line_total)
                 values ($1, $2, $3, $4, $5, $6, $7)`,
                [req.sandbox.id, created.id, it.variant_id, it.product_name,
                 it.qty, it.unit_price, lineTotalValue],
            )
            // Stok DÜŞER ve rezervasyon SERBEST KALIR. İkisi birlikte yapılmazsa
            // ürün iki kez sayılır: hem satılmış hem hâlâ sepette bekliyor görünür.
            // `skip_stock_decrement` anahtarı bu adımı tamamen atlatır: dükkân
            // sonsuz ürün satmaya başlar.
            if (!isBugOn(req.sandbox.bug_flags, 'skip_stock_decrement')) {
                await client.query(
                    `update inventory
                        set stock_qty    = stock_qty - $1,
                            reserved_qty = greatest(reserved_qty - $1, 0)
                      where variant_id = $2`,
                    [it.qty, it.variant_id],
                )
            }
        }

        if (coupon) {
            await client.query(
                'update coupons set used_count = used_count + 1 where id = $1', [coupon.id])
        }

        await client.query(
            `update carts set status = 'converted', user_id = coalesce(user_id, $2) where id = $1`,
            [cartId, req.user.id])

        return { ...created, items: items.length }
    })

    await auditFromRequest(req, {
        action: 'order.create', entity: 'order', entityId: order.id,
        detail: { orderNo: order.order_no, grandTotal: order.grand_total },
    })

    res.status(201).location(`/api/v1/orders/${order.id}`).json({ order })
}))

// GET /api/v1/orders — YALNIZCA kendi siparişleri
//
// Filtre `req.user.id` üstünden konur, istemciden gelen bir parametreyle DEĞİL.
// `?userId=` kabul eden bir uç, başkasının siparişlerini okumaya açık olurdu.
ordersRouter.get('/', asyncRoute(async (req, res) => {
    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10) || 1)
    const size = Math.min(Math.max(1, Number.parseInt(req.query.size || '20', 10) || 20), 100)
    const status = req.query.status

    // `leak_other_users_orders` anahtarı açıkken kullanıcı filtresi DÜŞER ve
    // sandbox'taki tüm siparişler döner. Kendi siparişlerini kontrol eden bir
    // test yine yeşil kalır — açığı yalnızca "başkasının kaydını görüyor muyum"
    // diye soran bir yetki testi yakalar.
    const leakOrders = isBugOn(req.sandbox.bug_flags, 'leak_other_users_orders')
    const params = leakOrders ? [req.sandbox.id] : [req.sandbox.id, req.user.id]
    let where = leakOrders ? 'o.sandbox_id = $1' : 'o.sandbox_id = $1 and o.user_id = $2'
    if (status) {
        params.push(status)
        where += ` and o.status = $${params.length}`
    }

    const [countRes, listRes] = await Promise.all([
        query(`select count(*)::int as total from orders o where ${where}`, params),
        query(
            `select o.id, o.order_no, o.status, o.subtotal, o.discount_total, o.shipping_total,
                    o.grand_total, o.coupon_code, o.placed_at,
                    (select count(*)::int from order_items oi where oi.order_id = o.id) as item_count
               from orders o
              where ${where}
              order by o.placed_at desc
              limit $${params.length + 1} offset $${params.length + 2}`,
            [...params, size, (page - 1) * size]),
    ])

    const total = countRes.rows[0].total
    res.json({
        page, size, total,
        totalPages: Math.ceil(total / size) || 0,
        hasNext: page * size < total,
        items: listRes.rows,
    })
}))

// GET /api/v1/orders/:id
ordersRouter.get('/:id', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı', { got: req.params.id })

    const order = await loadOrder({ query }, req.sandbox.id, id)
    if (!order) throw notFound('Sipariş bulunamadı')

    // 403 (404 DEĞİL): kaynak var ama senin değil. 404 döndürmek kaynağın
    // varlığını gizlerdi — ikisi de savunulabilir; burada AÇIK davranış
    // seçildi ki yetki testi net bir sonuç görsün.
    if (order.user_id !== req.user.id) throw forbidden('Bu sipariş sana ait değil')

    const [itemsRes, payRes, shipRes] = await Promise.all([
        query(`select oi.id, oi.variant_id, oi.name_snapshot, oi.qty, oi.unit_price, oi.line_total,
                      v.sku as variant_sku, v.size, v.color
                 from order_items oi
                 left join product_variants v on v.id = oi.variant_id
                where oi.order_id = $1 order by oi.id`, [id]),
        query('select id, method, status, amount, txn_ref, created_at from payments where order_id = $1', [id]),
        query('select id, carrier, tracking_no, status, shipped_at from shipments where order_id = $1', [id]),
    ])

    res.json({
        order,
        items: itemsRes.rows,
        payments: payRes.rows,
        shipments: shipRes.rows,
    })
}))

// POST /api/v1/orders/:id/cancel
ordersRouter.post('/:id/cancel', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const updated = await withTransaction(async (client) => {
        const order = await loadOrder(client, req.sandbox.id, id)
        if (!order) throw notFound('Sipariş bulunamadı')
        if (order.user_id !== req.user.id) throw forbidden('Bu sipariş sana ait değil')

        // Durum geçişi tek yerde tanımlı (core/rules.js). Kargolanmış sipariş
        // iptal EDİLMEZ, iade edilir — ikisi stok ve muhasebe açısından farklı
        // işlemlerdir.
        if (!canCancel(order.status)) {
            throw conflict('INVALID_TRANSITION',
                `'${order.status}' durumundaki sipariş iptal edilemez`,
                { currentStatus: order.status, allowed: ['placed', 'paid'] })
        }

        const { rows: items } = await client.query(
            'select variant_id, qty from order_items where order_id = $1', [id])

        // Stok geri yüklenir. Bu adım atlanırsa iptal edilen her sipariş
        // stoktan kalıcı olarak düşer ve envanter yavaşça gerçeklikten kopar.
        // `no_stock_restore_on_cancel` anahtarı tam olarak bunu yapar.
        if (!isBugOn(req.sandbox.bug_flags, 'no_stock_restore_on_cancel')) {
            for (const it of items) {
                await client.query(
                    'update inventory set stock_qty = stock_qty + $1 where variant_id = $2',
                    [it.qty, it.variant_id])
            }
        }

        if (order.coupon_code) {
            await client.query(
                `update coupons set used_count = greatest(used_count - 1, 0)
                  where sandbox_id = $1 and code = $2`,
                [req.sandbox.id, order.coupon_code])
        }

        // Başarılı ödeme varsa iade edilir. Bu adım olmadan "iptal edilmiş ama
        // parası duran sipariş" oluşur — muhasebe tarafında sessiz bir fark.
        await client.query(
            `update payments set status = 'refunded'
              where order_id = $1 and status = 'success'`, [id])

        const { rows } = await client.query(
            `update orders set status = 'cancelled' where id = $1
             returning id, order_no, status, grand_total`, [id])
        return rows[0]
    })

    await auditFromRequest(req, {
        action: 'order.cancel', entity: 'order', entityId: id,
        detail: { orderNo: updated.order_no },
    })
    res.json({ order: updated })
}))

// GET /api/v1/orders/:id/invoice
//
// Fatura, siparişin KAYITLI değerlerinden üretilir; ürünlerin GÜNCEL
// fiyatından değil. Ürün fiyatı yarın değişse bile bu belge değişmemeli.
ordersRouter.get('/:id/invoice', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const order = await loadOrder({ query }, req.sandbox.id, id)
    if (!order) throw notFound('Sipariş bulunamadı')
    if (order.user_id !== req.user.id) throw forbidden('Bu sipariş sana ait değil')

    const { rows: items } = await query(
        `select name_snapshot as description, qty, unit_price, line_total
           from order_items where order_id = $1 order by id`, [id])

    const linesTotal = round2(items.reduce((s, it) => s + Number(it.line_total), 0))

    res.json({
        invoiceNo: `INV-${order.order_no.replace('ORD-', '')}`,
        issuedAt: order.placed_at,
        billTo: { name: req.user.name, email: req.user.email },
        lines: items,
        totals: {
            subtotal: order.subtotal,
            discount: order.discount_total,
            shipping: order.shipping_total,
            grandTotal: order.grand_total,
        },
        // Faturanın kendi tutarlılık beyanı. Sipariş satırları ile başlıktaki
        // ara toplam ayrışırsa burada `false` görünür — arayüzde fark edilmesi
        // imkânsız olan bir hatayı, faturayı okuyan test anında yakalar.
        reconciled: linesTotal === Number(order.subtotal),
    })
}))

// ════════════════════════════════════════════════════════════════════════════
// YAŞAM DÖNGÜSÜ: ödeme → kargo → teslim → iade
//
// Dördü de aynı iskeleti paylaşır: siparişi kilitle, sahipliği doğrula, durum
// geçişine izin var mı diye TEK kaynağa sor (core/rules.js), yan tabloyu yaz,
// sonra durumu güncelle. Her endpoint kendi `if` zincirini yazsaydı, biri
// güncellenip diğeri unutulduğunda "kargolanmış siparişi tekrar kargolayan"
// türden sessiz hatalar doğardı.
// ════════════════════════════════════════════════════════════════════════════

// Ortak ön işlem: id ayrıştır, siparişi kilitli oku, sahiplik ve geçiş kontrolü.
async function loadForTransition(client, req, id, targetStatus) {
    const { rows } = await client.query(
        `select id, order_no, user_id, status, grand_total, coupon_code, placed_at
           from orders where sandbox_id = $1 and id = $2 for update`,
        [req.sandbox.id, id],
    )
    const order = rows[0]
    if (!order) throw notFound('Sipariş bulunamadı')
    if (order.user_id !== req.user.id) throw forbidden('Bu sipariş sana ait değil')

    if (targetStatus && !canTransition(order.status, targetStatus)) {
        throw conflict('INVALID_TRANSITION',
            `'${order.status}' durumundaki sipariş '${targetStatus}' yapılamaz`,
            { currentStatus: order.status, requested: targetStatus })
    }
    return order
}

const PAYMENT_METHODS = ['card', 'transfer', 'cod']

// POST /api/v1/orders/:id/pay   { method, simulateFailure? }
//
// `simulateFailure` bilinçli bir test kolaylığıdır: başarısız ödeme senaryosunu
// gerçek bir ödeme sağlayıcısı olmadan üretmenin tek yolu. Başarısız ödeme bir
// kayıt YAZAR ama siparişin durumunu DEĞİŞTİRMEZ — "ödeme denendi ve tutmadı"
// ile "ödeme hiç denenmedi" farklı şeylerdir ve log analizi bu farkı ister.
ordersRouter.post('/:id/pay', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const method = req.body?.method ?? 'card'
    if (!PAYMENT_METHODS.includes(method)) {
        throw unprocessable('INVALID_PAYMENT_METHOD', 'method card, transfer veya cod olmalı',
            { field: 'method', allowed: PAYMENT_METHODS })
    }
    const simulateFailure = req.body?.simulateFailure === true

    const result = await withTransaction(async (client) => {
        // Geçiş kontrolü BİLEREK burada yapılmıyor (null geçiliyor): önce
        // "zaten ödenmiş mi" sorulmalı. Sıra ters olsaydı ikinci ödeme denemesi
        // genel INVALID_TRANSITION ile reddedilirdi — çünkü 'paid' durumundan
        // 'paid'e geçiş zaten tanımsız. O zaman "çift tahsilat denendi" ile
        // "yanlış sırada bir işlem denendi" aynı koda düşer ve ikisini ayırt
        // eden test yazılamaz. Spesifik neden, genel nedenden önce gelir.
        const order = await loadForTransition(client, req, id, null)

        // Aynı siparişe ikinci kez başarılı ödeme alınamaz. Bu kontrol olmadan
        // çift tıklama iki tahsilat üretir ve mutabakat sorgusu kırmızıya döner.
        const { rows: paid } = await client.query(
            `select id from payments where order_id = $1 and status = 'success'`, [id])
        if (paid.length && !simulateFailure) {
            throw conflict('ALREADY_PAID', 'Bu siparişin ödemesi zaten alınmış',
                { paymentId: paid[0].id })
        }

        // Geçiş kontrolü ödeme kontrolünden SONRA. Başarısız ödeme denemesi
        // durumu değiştirmediği için bu kontrolden muaf.
        if (!simulateFailure && !canTransition(order.status, 'paid')) {
            throw conflict('INVALID_TRANSITION',
                `'${order.status}' durumundaki sipariş 'paid' yapılamaz`,
                { currentStatus: order.status, requested: 'paid' })
        }

        const status = simulateFailure ? 'failed' : 'success'
        const txnRef = `TXN-${Date.now()}-${id}`

        const { rows: payRows } = await client.query(
            `insert into payments (sandbox_id, order_id, method, status, amount, txn_ref)
             values ($1, $2, $3, $4, $5, $6)
             returning id, method, status, amount, txn_ref, created_at`,
            [req.sandbox.id, id, method, status, order.grand_total, txnRef],
        )

        if (simulateFailure) return { order, payment: payRows[0], transitioned: false }

        const { rows: updated } = await client.query(
            `update orders set status = 'paid' where id = $1
             returning id, order_no, status, grand_total`, [id])
        return { order: updated[0], payment: payRows[0], transitioned: true }
    })

    await auditFromRequest(req, {
        level: result.transitioned ? 'INFO' : 'WARN',
        action: 'order.pay', entity: 'order', entityId: id,
        detail: { method, status: result.payment.status },
    })

    // Başarısız ödeme 402 döner, 200 değil. 200 dönseydi bir test "istek geçti"
    // diye yeşile geçer ve ödemenin tutmadığını fark etmezdi.
    res.status(result.transitioned ? 200 : 402).json({
        order: result.order,
        payment: result.payment,
    })
}))

// POST /api/v1/orders/:id/ship   { carrier, trackingNo }
//
// ÖDEMESİZ KARGO ENGELLENİR: geçiş tablosu 'placed' → 'shipped' geçişine zaten
// izin vermez. Bu, doğrulama sorgularındaki "ödemesi alınmamış ama kargolanmış
// sipariş" kontrolünün uygulama tarafındaki karşılığıdır.
ordersRouter.post('/:id/ship', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const carrier = typeof req.body?.carrier === 'string' && req.body.carrier.trim()
        ? req.body.carrier.trim().slice(0, 40)
        : 'Yurtici'
    const trackingNo = typeof req.body?.trackingNo === 'string' && req.body.trackingNo.trim()
        ? req.body.trackingNo.trim().slice(0, 40)
        : `TRK${String(Date.now()).slice(-10)}`

    const result = await withTransaction(async (client) => {
        await loadForTransition(client, req, id, 'shipped')

        const { rows: shipRows } = await client.query(
            `insert into shipments (sandbox_id, order_id, carrier, tracking_no, status, shipped_at)
             values ($1, $2, $3, $4, 'in_transit', now())
             returning id, carrier, tracking_no, status, shipped_at, delivered_at`,
            [req.sandbox.id, id, carrier, trackingNo],
        )

        const { rows: updated } = await client.query(
            `update orders set status = 'shipped' where id = $1
             returning id, order_no, status`, [id])
        return { order: updated[0], shipment: shipRows[0] }
    })

    await auditFromRequest(req, {
        action: 'order.ship', entity: 'order', entityId: id,
        detail: { carrier, trackingNo },
    })
    res.json(result)
}))

// POST /api/v1/orders/:id/deliver
//
// Teslim ANI kaydedilir (shipments.delivered_at): iade penceresi buradan sayılır.
ordersRouter.post('/:id/deliver', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const result = await withTransaction(async (client) => {
        await loadForTransition(client, req, id, 'delivered')

        const { rows: shipRows } = await client.query(
            `update shipments set status = 'delivered', delivered_at = now()
              where order_id = $1
          returning id, carrier, tracking_no, status, shipped_at, delivered_at`,
            [id],
        )

        const { rows: updated } = await client.query(
            `update orders set status = 'delivered' where id = $1
             returning id, order_no, status`, [id])
        return { order: updated[0], shipment: shipRows[0] ?? null }
    })

    await auditFromRequest(req, { action: 'order.deliver', entity: 'order', entityId: id })
    res.json(result)
}))

// POST /api/v1/orders/:id/return
//
// İade, iptalden FARKLI bir işlemdir: ürün müşteride, geri gelmesi gerekir ve
// bir zaman penceresi vardır. İkisini tek endpoint'e toplamak, stok ve muhasebe
// tarafında farklı davranması gereken iki akışı birbirine karıştırırdı.
ordersRouter.post('/:id/return', asyncRoute(async (req, res) => {
    const id = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(id)) throw badRequest('Sipariş id sayı olmalı')

    const result = await withTransaction(async (client) => {
        const order = await loadForTransition(client, req, id, 'returned')

        const { rows: shipRows } = await client.query(
            'select id, delivered_at from shipments where order_id = $1', [id])
        const deliveredAt = shipRows[0]?.delivered_at ?? null

        // Zaman penceresi kontrolü TEK kaynaktan gelir; süre burada yeniden
        // yazılmaz. Pencere değişirse iki yerde birden değişmesi gerekmesin diye.
        const verdict = canReturn(order.status, deliveredAt)
        if (!verdict.ok) {
            throw conflict('RETURN_WINDOW_CLOSED', verdict.message, {
                currentStatus: order.status,
                deliveredAt,
                windowDays: RETURN_WINDOW_DAYS,
            })
        }

        // İade edilen ürün stoğa GERİ DÖNER — iptalle aynı mantık.
        const { rows: items } = await client.query(
            'select variant_id, qty from order_items where order_id = $1', [id])
        for (const it of items) {
            await client.query(
                'update inventory set stock_qty = stock_qty + $1 where variant_id = $2',
                [it.qty, it.variant_id])
        }

        await client.query(
            `update payments set status = 'refunded' where order_id = $1 and status = 'success'`, [id])
        await client.query(
            `update shipments set status = 'returned' where order_id = $1`, [id])

        const { rows: updated } = await client.query(
            `update orders set status = 'returned' where id = $1
             returning id, order_no, status, grand_total`, [id])
        return { order: updated[0], restoredItems: items.length }
    })

    await auditFromRequest(req, {
        action: 'order.return', entity: 'order', entityId: id,
        detail: { restoredItems: result.restoredItems },
    })
    res.json(result)
}))
