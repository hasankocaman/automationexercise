// Express uygulaması — middleware zinciri ve route montajı.
import express from 'express'
import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { healthCheck } from './db.js'
import { errorHandler, notFoundHandler, asyncRoute } from './lib/errors.js'
import { resolveSandbox } from './middleware/sandbox.js'
import { sandboxRouter } from './routes/sandbox.js'
import { authRouter } from './routes/auth.js'
import { catalogRouter } from './routes/catalog.js'
import { cartRouter } from './routes/cart.js'
import { ordersRouter } from './routes/orders.js'
import { addressesRouter } from './routes/addresses.js'
import { reviewsRouter } from './routes/reviews.js'

export function createApp() {
    const app = express()

    app.disable('x-powered-by')
    // Docker/ters vekil arkasında gerçek istemci IP'si için.
    app.set('trust proxy', true)

    // ── Correlation id ──
    // Her isteğe bir kimlik. İstemci kendi id'sini gönderebilir (X-Correlation-Id);
    // göndermezse üretilir. Cevapta da geri döner — böylece bir test, aldığı
    // hatanın log'unu doğrudan bu id ile bulur (bkz. GET /sandbox/logs).
    app.use((req, res, next) => {
        req.correlationId = req.get('X-Correlation-Id') || `req-${crypto.randomUUID()}`
        res.set('X-Correlation-Id', req.correlationId)
        next()
    })

    // ── CORS ──
    // Tarayıcıdan (fetch/XHR) pratik yapılabilsin diye açık. Kimlik doğrulama
    // çerezle değil Authorization başlığıyla yapıldığı için `credentials`
    // gerekmiyor; bu sayede `*` origin güvenle kullanılabiliyor.
    app.use((req, res, next) => {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS')
        res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Sandbox-Key,X-Correlation-Id')
        res.set('Access-Control-Expose-Headers', 'X-Correlation-Id,X-Sandbox-Mode')
        res.set('Access-Control-Max-Age', '600')
        if (req.method === 'OPTIONS') return res.status(204).end()
        return next()
    })

    app.use(express.json({ limit: '256kb' }))

    // ── İstek günlüğü (konsol) ──
    app.use((req, res, next) => {
        const startedAt = process.hrtime.bigint()
        res.on('finish', () => {
            const ms = Number(process.hrtime.bigint() - startedAt) / 1e6
            console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} ${ms.toFixed(1)}ms [${req.correlationId}]`)
        })
        next()
    })

    // ── Sağlık ──
    // Sandbox çözümlemesinden ÖNCE: veritabanı ayakta değilken bile cevap
    // vermeli, yoksa "servis mi öldü, DB mi öldü" ayırt edilemez.
    app.get('/health', asyncRoute(async (_req, res) => {
        let db = false
        try { db = await healthCheck() } catch { db = false }
        res.status(db ? 200 : 503).json({
            status: db ? 'ok' : 'degraded',
            database: db ? 'up' : 'down',
            uptimeSeconds: Math.round(process.uptime()),
            time: new Date().toISOString(),
        })
    }))

    // ── OpenAPI (Swagger) sözleşmesi ──
    // Dosyadan servis edilir, koddan ÜRETİLMEZ. Postman "Import > Link" ile
    // doğrudan bu adresi alabilir; Swagger UI da aynı adresi okur.
    const apiRoot = path.dirname(fileURLToPath(import.meta.url))
    app.get(['/api/v1/openapi.yaml', '/openapi.yaml'], (_req, res) => {
        res.type('text/yaml; charset=utf-8')
        res.sendFile(path.join(apiRoot, '..', 'openapi.yaml'))
    })

    // ── API kökü: keşif ──
    app.get('/api/v1', (_req, res) => {
        res.json({
            name: 'QA Shop API',
            version: 'v1',
            openapi: '/api/v1/openapi.yaml',
            docs: 'qa-shop/README.md',
            quickStart: [
                'POST /api/v1/sandbox                     → kendi alanını aç, apiKey al',
                'Header ekle: X-Sandbox-Key: <apiKey>',
                'POST /api/v1/auth/login                  → demo@qashop.test / Password123!',
                'GET  /api/v1/products?page=1&size=10',
                'POST /api/v1/carts                       → sepet aç',
                'POST /api/v1/carts/{id}/items            → { variantId, qty }',
                'POST /api/v1/orders                      → { cartId }',
                'POST /api/v1/sandbox/reset               → seed veriye dön',
            ],
            note: 'X-Sandbox-Key göndermezsen demo verisine SALT OKUNUR bağlanırsın.',
        })
    })

    // ── Sandbox çözümlemesi: bundan sonraki her şey tenant kapsamlı ──
    app.use('/api/v1', resolveSandbox)

    app.use('/api/v1/sandbox', sandboxRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1', catalogRouter)      // /products, /categories, /brands, /search
    // Katalogtan SONRA: /products/:id/reviews yolları katalogun /products/:id
    // kaydıyla çakışmaz (segment sayısı farklı), ama sıra bilinçli olarak
    // "genelden özele" tutuluyor.
    app.use('/api/v1', reviewsRouter)      // /products/:id/reviews, /reviews/:id
    app.use('/api/v1/carts', cartRouter)
    app.use('/api/v1/orders', ordersRouter)
    app.use('/api/v1/addresses', addressesRouter)

    app.use(notFoundHandler)
    app.use(errorHandler)

    return app
}
