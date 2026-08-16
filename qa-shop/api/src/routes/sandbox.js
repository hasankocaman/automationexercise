// Sandbox yönetimi — pratik alanının kendi kontrol paneli.
import express from 'express'
import crypto from 'node:crypto'
import { query, withTransaction } from '../db.js'
import { asyncRoute, badRequest, unauthorized, unprocessable } from '../lib/errors.js'
import { auditFromRequest } from '../lib/audit.js'
import { TEMPLATE_SANDBOX_ID } from '../middleware/sandbox.js'
import { BUG_FLAG_KEYS, activeFlags, describeFlags, unknownFlagKeys } from '../core/bugFlags.js'

export const sandboxRouter = express.Router()

const SANDBOX_TTL_DAYS = Number.parseInt(process.env.SANDBOX_TTL_DAYS || '7', 10)

// POST /api/v1/sandbox — yeni izole veri alanı aç
//
// Kayıt İSTEMEZ. Sürtünme, pratik alanlarının en çok kullanıcı kaybettiği
// yerdir; buradaki tek maliyet birkaç bin satırlık kopyalamadır.
sandboxRouter.post('/', asyncRoute(async (req, res) => {
    const label = typeof req.body?.label === 'string' ? req.body.label.slice(0, 80) : null
    const apiKey = `qas_${crypto.randomBytes(24).toString('hex')}`

    const sandbox = await withTransaction(async (client) => {
        const { rows } = await client.query(
            `insert into sandbox (api_key, label, expires_at)
             values ($1, $2, now() + ($3 || ' days')::interval)
             returning id, api_key, label, created_at, expires_at`,
            [apiKey, label, String(SANDBOX_TTL_DAYS)],
        )
        const created = rows[0]
        // Şablonun birebir kopyası: katalog + kullanıcılar + 150 siparişlik
        // geçmiş. SQL pratiği ilk saniyeden itibaren anlamlı hacim bulur.
        await client.query('select clone_sandbox($1, $2)', [TEMPLATE_SANDBOX_ID, created.id])
        return created
    })

    res.status(201).json({
        sandboxId: sandbox.id,
        apiKey: sandbox.api_key,
        label: sandbox.label,
        createdAt: sandbox.created_at,
        expiresAt: sandbox.expires_at,
        howToUse: 'Tüm isteklerine şu başlığı ekle: X-Sandbox-Key: <apiKey>',
        demoUser: { email: 'demo@qashop.test', password: 'Password123!' },
    })
}))

// GET /api/v1/sandbox/state — satır sayıları
//
// Testten önce/sonra durum karşılaştırmak için. "Testim gerçekten bir şey
// değiştirdi mi?" sorusunun en hızlı cevabı.
sandboxRouter.get('/state', asyncRoute(async (req, res) => {
    const { rows } = await query(
        `select
            (select count(*) from products         where sandbox_id = $1) as products,
            (select count(*) from product_variants where sandbox_id = $1) as variants,
            (select count(*) from users            where sandbox_id = $1) as users,
            (select count(*) from carts            where sandbox_id = $1) as carts,
            (select count(*) from cart_items       where sandbox_id = $1) as cart_items,
            (select count(*) from orders           where sandbox_id = $1) as orders,
            (select count(*) from order_items      where sandbox_id = $1) as order_items,
            (select count(*) from reviews          where sandbox_id = $1) as reviews,
            (select count(*) from audit_log        where sandbox_id = $1) as audit_log`,
        [req.sandbox.id],
    )
    res.json({
        sandboxId: req.sandbox.id,
        mode: req.readOnly ? 'demo-readonly' : 'private',
        lastResetAt: req.sandbox.last_reset_at ?? null,
        counts: rows[0],
    })
}))

// POST /api/v1/sandbox/reset — tohum veriye dön
//
// "Her koşumdan önce temiz durum" otomasyonun temel disiplinidir. Burada bir
// endpoint olarak var; test paketinin beforeAll adımına konulması beklenir.
sandboxRouter.post('/reset', asyncRoute(async (req, res) => {
    if (req.readOnly) {
        throw unauthorized('Demo verisi sıfırlanamaz. Önce kendi alanını aç: POST /api/v1/sandbox')
    }
    const startedAt = Date.now()
    await query('select reset_sandbox($1)', [req.sandbox.id])

    await auditFromRequest(req, { action: 'sandbox.reset', entity: 'sandbox', entityId: req.sandbox.id })

    res.json({
        sandboxId: req.sandbox.id,
        resetAt: new Date().toISOString(),
        durationMs: Date.now() - startedAt,
        message: 'Sandbox tohum veriye döndü. Açık oturumlar sonlandırıldı, tekrar login gerekiyor.',
    })
}))

// GET /api/v1/sandbox/bugs — açılabilecek kusurların kataloğu
//
// Her anahtar, sistemin gerçek bir yerinde gerçek bir kusur açar. `catchableBy`
// alanı hangi kontrolün onu yakalaması GEREKTİĞİNİ söyler — pratiğin kendisi
// tam olarak şu: anahtarı aç, testini koş, yakalayıp yakalamadığına bak.
sandboxRouter.get('/bugs', asyncRoute(async (req, res) => {
    res.json({
        sandboxId: req.sandbox.id,
        mode: req.readOnly ? 'demo-readonly' : 'private',
        active: activeFlags(req.sandbox.bug_flags),
        available: describeFlags(req.sandbox.bug_flags),
        howToUse: 'PATCH /api/v1/sandbox/bugs  { "oversell": true }',
    })
}))

// PATCH /api/v1/sandbox/bugs  { "<anahtar>": true|false, ... }
//
// Kısmi güncelleme (PATCH, PUT değil): gönderilmeyen anahtarlar olduğu gibi
// kalır. PUT olsaydı tek bir kusuru açmak için diğer hepsini de her seferinde
// tekrar göndermek gerekirdi.
sandboxRouter.patch('/bugs', asyncRoute(async (req, res) => {
    if (req.readOnly) {
        throw unauthorized('Demo verisinde kusur açılamaz. Önce kendi alanını aç: POST /api/v1/sandbox')
    }

    const body = req.body
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        throw unprocessable('INVALID_BODY', 'Gövde bir nesne olmalı', { example: { oversell: true } })
    }

    const keys = Object.keys(body)
    if (!keys.length) {
        throw unprocessable('EMPTY_BODY', 'En az bir anahtar gönderilmeli', { available: BUG_FLAG_KEYS })
    }

    // Bilinmeyen anahtar SESSİZCE yok sayılmaz. Yok sayılsaydı, yazım hatası
    // yapan kullanıcı kusuru açtığını sanır, testi yeşil kalır ve bundan
    // "testim çalışıyor" sonucunu çıkarırdı — tam olarak önlemeye çalıştığımız
    // yanılgı.
    const unknown = unknownFlagKeys(keys)
    if (unknown.length) {
        throw unprocessable('UNKNOWN_BUG_FLAG', 'Tanımsız bug anahtarı', {
            unknown, available: BUG_FLAG_KEYS,
        })
    }

    const notBoolean = keys.filter((k) => typeof body[k] !== 'boolean')
    if (notBoolean.length) {
        throw unprocessable('INVALID_FLAG_VALUE', 'Anahtar değerleri true veya false olmalı', { fields: notBoolean })
    }

    // jsonb birleştirme veritabanında yapılır: iki eş zamanlı PATCH birbirinin
    // yazdığını ezmesin diye. Okuyup-birleştirip-yazsaydık araya giren istek
    // kaybolurdu.
    const { rows } = await query(
        `update sandbox set bug_flags = bug_flags || $2::jsonb
          where id = $1
      returning bug_flags`,
        [req.sandbox.id, JSON.stringify(body)],
    )

    const flags = rows[0]?.bug_flags ?? {}

    await auditFromRequest(req, {
        level: 'WARN',
        action: 'sandbox.bug_flags', entity: 'sandbox', entityId: req.sandbox.id,
        detail: { changed: body, active: activeFlags(flags) },
    })

    res.json({
        sandboxId: req.sandbox.id,
        active: activeFlags(flags),
        flags,
        note: 'Kusurlar yalnızca bu sandbox içinde geçerlidir. POST /sandbox/reset hepsini kapatır.',
    })
}))

// GET /api/v1/sandbox/logs — denetim kaydı
//
// Log analizi pratiğinin API tarafı. `?level=ERROR` ve `?correlationId=...`
// ile daraltılır; ikisinin birlikte kullanımı gerçek bir kök neden akışıdır:
// önce hatayı bul, sonra zincirini aç.
sandboxRouter.get('/logs', asyncRoute(async (req, res) => {
    const { level, action, correlationId } = req.query
    const limit = Math.min(Number.parseInt(req.query.limit || '100', 10) || 100, 500)

    if (level && !['INFO', 'WARN', 'ERROR'].includes(level)) {
        throw badRequest("level yalnızca INFO, WARN veya ERROR olabilir", { got: level })
    }

    const params = [req.sandbox.id]
    const where = ['sandbox_id = $1']
    if (level)         { params.push(level);         where.push(`level = $${params.length}`) }
    if (action)        { params.push(action);        where.push(`action = $${params.length}`) }
    if (correlationId) { params.push(correlationId); where.push(`correlation_id = $${params.length}`) }
    params.push(limit)

    const { rows } = await query(
        `select id, at, level, actor, action, entity, entity_id, correlation_id, detail
           from audit_log
          where ${where.join(' and ')}
          order by at desc
          limit $${params.length}`,
        params,
    )
    res.json({ total: rows.length, limit, logs: rows })
}))
