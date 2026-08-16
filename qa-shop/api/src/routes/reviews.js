// Ürün yorumları ve moderasyon.
//
// Buradaki iş kuralı İKİ ayrı vaat içerir ve ikisi ayrı ayrı test edilmelidir:
//   1. Onaylanmamış yorum ürün sayfasında GÖRÜNMEZ.
//   2. Onaylanmamış yorum ortalama puana GİRMEZ.
// Bir sistemin birincisini doğru, ikincisini yanlış yapması çok yaygındır:
// liste sorgusu filtrelenir, ortalama hesabı filtresiz kalır. Sonuç, listede
// göremediğin bir yorumun puanı aşağı çekmesidir — kullanıcının şikâyet ettiği
// ama kimsenin yeniden üretemediği türden bir hata.
import express from 'express'
import { query } from '../db.js'
import { asyncRoute, badRequest, notFound, unprocessable } from '../lib/errors.js'
import { requireAuth } from '../middleware/auth.js'
import { requireWritableSandbox } from '../middleware/sandbox.js'
import { isBugOn } from '../core/bugFlags.js'
import { auditFromRequest } from '../lib/audit.js'

export const reviewsRouter = express.Router()

const REVIEW_STATUSES = ['pending', 'approved', 'rejected']

function parseId(raw, label) {
    const id = Number.parseInt(raw, 10)
    if (!Number.isInteger(id)) throw badRequest(`${label} sayı olmalı`, { got: raw })
    return id
}

async function assertProductExists(sandboxId, productId) {
    const { rows } = await query(
        'select id from products where sandbox_id = $1 and id = $2', [sandboxId, productId])
    if (!rows.length) throw notFound('Ürün bulunamadı')
}

// GET /api/v1/products/:id/reviews
//
// Varsayılan olarak YALNIZCA onaylı yorumlar döner. `?status=` ile moderasyon
// kuyruğuna bakılabilir — bu, gerçek bir yönetim ekranının ihtiyacı olduğu için
// var; müşteriye dönük varsayılan davranış filtreli olanıdır.
reviewsRouter.get('/products/:id/reviews', asyncRoute(async (req, res) => {
    const productId = parseId(req.params.id, 'Ürün id')
    await assertProductExists(req.sandbox.id, productId)

    const status = req.query.status
    if (status && !REVIEW_STATUSES.includes(status)) {
        throw badRequest('status yalnızca pending, approved veya rejected olabilir', { got: status })
    }

    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10) || 1)
    const size = Math.min(Math.max(1, Number.parseInt(req.query.size || '20', 10) || 20), 100)

    const params = [req.sandbox.id, productId, status || 'approved']
    const [countRes, listRes] = await Promise.all([
        query(`select count(*)::int as total from reviews
                where sandbox_id = $1 and product_id = $2 and status = $3`, params),
        query(
            `select r.id, r.rating, r.comment, r.status, r.created_at,
                    u.name as author
               from reviews r
               left join users u on u.id = r.user_id
              where r.sandbox_id = $1 and r.product_id = $2 and r.status = $3
              order by r.created_at desc
              limit $4 offset $5`,
            [...params, size, (page - 1) * size]),
    ])

    const total = countRes.rows[0].total
    res.json({
        productId, status: status || 'approved',
        page, size, total,
        totalPages: Math.ceil(total / size) || 0,
        hasNext: page * size < total,
        items: listRes.rows,
    })
}))

// GET /api/v1/products/:id/rating
//
// Ortalama puan AYRI bir uç: liste sayfalanır, ortalama sayfalanmaz. Ortalamayı
// listenin ilk sayfasından hesaplamak, çok yorumlu üründe sessizce yanlış sonuç
// verirdi.
reviewsRouter.get('/products/:id/rating', asyncRoute(async (req, res) => {
    const productId = parseId(req.params.id, 'Ürün id')
    await assertProductExists(req.sandbox.id, productId)

    // `pending_reviews_in_average` anahtarı açıkken filtre düşer ve onaysız
    // yorumlar da ortalamaya girer. Liste ucu yine doğru çalışmaya devam eder —
    // yani kusur, yalnızca listeye bakan bir testin GÖREMEYECEĞİ yerdedir.
    const countsAll = isBugOn(req.sandbox.bug_flags, 'pending_reviews_in_average')

    const { rows } = await query(
        `select count(*)::int                                as count,
                coalesce(round(avg(rating)::numeric, 2), 0)  as average,
                count(*) filter (where rating = 5)::int      as five,
                count(*) filter (where rating = 4)::int      as four,
                count(*) filter (where rating = 3)::int      as three,
                count(*) filter (where rating = 2)::int      as two,
                count(*) filter (where rating = 1)::int      as one
           from reviews
          where sandbox_id = $1 and product_id = $2
            and ($3::boolean or status = 'approved')`,
        [req.sandbox.id, productId, countsAll],
    )

    const r = rows[0]
    res.json({
        productId,
        average: Number(r.average),
        count: r.count,
        basis: 'approved',
        distribution: { 5: r.five, 4: r.four, 3: r.three, 2: r.two, 1: r.one },
    })
}))

// POST /api/v1/products/:id/reviews  { rating, comment }
//
// Yeni yorum 'pending' doğar. 201 dönmesi yorumun YAYINLANDIĞI anlamına gelmez;
// bu ayrım sözleşmede açıkça yazılıdır çünkü "yorumumu gönderdim ama görünmüyor"
// en sık yanlış anlaşılan davranışlardan biridir.
reviewsRouter.post('/products/:id/reviews',
    requireWritableSandbox, requireAuth,
    asyncRoute(async (req, res) => {
        const productId = parseId(req.params.id, 'Ürün id')
        await assertProductExists(req.sandbox.id, productId)

        const rating = Number.parseInt(req.body?.rating, 10)
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw unprocessable('INVALID_RATING', 'rating 1 ile 5 arasında bir tam sayı olmalı',
                { field: 'rating', got: req.body?.rating })
        }

        const comment = req.body?.comment
        if (comment !== undefined && comment !== null && typeof comment !== 'string') {
            throw unprocessable('INVALID_COMMENT', 'comment metin olmalı', { field: 'comment' })
        }

        // Aynı kullanıcı aynı ürüne iki kez yorum yazamaz. Şemada UNIQUE kısıtı
        // YOK — kural bilinçli olarak uygulama katmanında, çünkü pratiğin
        // sorusu tam da bu: "uygulama kuralı gerçekten tutuyor mu" sorusunu
        // veritabanına sorup kanıtlamak.
        const dup = await query(
            'select id from reviews where sandbox_id = $1 and product_id = $2 and user_id = $3',
            [req.sandbox.id, productId, req.user.id])
        if (dup.rows.length) {
            throw unprocessable('REVIEW_ALREADY_EXISTS', 'Bu ürüne zaten yorum yazdın',
                { reviewId: dup.rows[0].id })
        }

        const { rows } = await query(
            `insert into reviews (sandbox_id, product_id, user_id, rating, comment, status)
             values ($1, $2, $3, $4, $5, 'pending')
             returning id, rating, comment, status, created_at`,
            [req.sandbox.id, productId, req.user.id, rating,
             typeof comment === 'string' ? comment.trim().slice(0, 2000) : null],
        )
        const review = rows[0]

        await auditFromRequest(req, {
            action: 'review.create', entity: 'review', entityId: review.id,
            detail: { productId, rating },
        })

        res.status(201).json({
            review,
            note: 'Yorum moderasyon bekliyor. Onaylanana kadar listede ve ortalama puanda görünmez.',
        })
    }))

// PATCH /api/v1/reviews/:id  { status }
//
// Moderasyon ucu. Bu pratik ortamında rol ayrımı yoktur — girişli her kullanıcı
// moderasyon yapabilir. Gerçek bir sistemde burada yetki kontrolü olurdu; burada
// amaç, onay akışının kendisini test edilebilir kılmak.
reviewsRouter.patch('/reviews/:id',
    requireWritableSandbox, requireAuth,
    asyncRoute(async (req, res) => {
        const id = parseId(req.params.id, 'Yorum id')
        const status = req.body?.status

        if (!REVIEW_STATUSES.includes(status)) {
            throw unprocessable('INVALID_STATUS', 'status pending, approved veya rejected olmalı',
                { field: 'status', allowed: REVIEW_STATUSES })
        }

        const { rows } = await query(
            `update reviews set status = $3
              where sandbox_id = $1 and id = $2
          returning id, product_id, rating, comment, status, created_at`,
            [req.sandbox.id, id, status],
        )
        if (!rows.length) throw notFound('Yorum bulunamadı')

        await auditFromRequest(req, {
            action: 'review.moderate', entity: 'review', entityId: id, detail: { status },
        })
        res.json({ review: rows[0] })
    }))
