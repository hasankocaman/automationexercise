// Adres defteri — listele, ekle, güncelle, sil.
//
// Neden pratik açısından değerli: "varsayılan adres" kuralı, tek bir satırı
// güncellemenin BAŞKA satırları da değiştirdiği ender uçlardan biridir. Bir
// adresi varsayılan yapmak, diğerlerinin varsayılanlığını düşürmek zorundadır.
// Bu kuralı yalnızca cevaba bakan bir test doğrulayamaz — diğer satırların ne
// olduğunu görmek gerekir. API testi ile database testinin neden birlikte
// yürüdüğünü gösteren en net örneklerden biri.
import express from 'express'
import { query, withTransaction } from '../db.js'
import { asyncRoute, badRequest, forbidden, notFound, unprocessable } from '../lib/errors.js'
import { requireAuth } from '../middleware/auth.js'
import { requireWritableSandbox } from '../middleware/sandbox.js'
import { auditFromRequest } from '../lib/audit.js'

export const addressesRouter = express.Router()

// Adres işlemlerinin tamamı kişiseldir: giriş şart.
addressesRouter.use(requireWritableSandbox, requireAuth)

const SELECT_COLUMNS = 'id, label, line1, city, country, postal_code, is_default'

function parseId(raw) {
    const id = Number.parseInt(raw, 10)
    if (!Number.isInteger(id)) throw badRequest('Adres id sayı olmalı', { got: raw })
    return id
}

// Girdi doğrulama tek yerde: create ve update aynı kuralları paylaşır.
// `partial` true olduğunda yalnızca GÖNDERİLEN alanlar denetlenir (PATCH).
function validateBody(body, { partial }) {
    const out = {}
    const required = (name, min = 1) => {
        const value = body?.[name]
        if (value === undefined) {
            if (partial) return
            throw unprocessable('MISSING_FIELD', `${name} zorunlu`, { field: name })
        }
        if (typeof value !== 'string' || value.trim().length < min) {
            throw unprocessable('INVALID_FIELD', `${name} en az ${min} karakter olmalı`, { field: name })
        }
        out[name] = value.trim()
    }

    required('line1', 3)
    required('city', 2)

    if (body?.label !== undefined) {
        if (typeof body.label !== 'string' || !body.label.trim()) {
            throw unprocessable('INVALID_FIELD', 'label boş olamaz', { field: 'label' })
        }
        out.label = body.label.trim().slice(0, 40)
    }

    if (body?.country !== undefined) {
        // ISO 3166-1 alpha-2: iki harf. Şema `char(3)` değil `text` olsaydı
        // buradaki doğrulama gevşetilebilirdi; sabit uzunluk beklentisini
        // sözleşme de beyan ediyor.
        if (typeof body.country !== 'string' || !/^[A-Za-z]{2}$/.test(body.country.trim())) {
            throw unprocessable('INVALID_COUNTRY', 'country iki harfli ülke kodu olmalı (örn. TR)', { field: 'country' })
        }
        out.country = body.country.trim().toUpperCase()
    }

    if (body?.postalCode !== undefined) {
        if (body.postalCode !== null && typeof body.postalCode !== 'string') {
            throw unprocessable('INVALID_FIELD', 'postalCode metin olmalı', { field: 'postalCode' })
        }
        out.postal_code = body.postalCode === null ? null : body.postalCode.trim().slice(0, 20)
    }

    if (body?.isDefault !== undefined) {
        if (typeof body.isDefault !== 'boolean') {
            throw unprocessable('INVALID_FIELD', 'isDefault true veya false olmalı', { field: 'isDefault' })
        }
        out.is_default = body.isDefault
    }

    return out
}

// Varsayılan adres TEK olmalı. Bu kural veritabanında bir kısıtla (partial
// unique index) da kurulabilirdi; burada bilinçli olarak uygulama katmanında
// duruyor çünkü pratiğin amacı tam da "uygulama kuralı gerçekten uygulanmış mı"
// sorusunu SQL ile denetletmek.
async function clearOtherDefaults(client, sandboxId, userId, keepId) {
    await client.query(
        `update addresses set is_default = false
          where sandbox_id = $1 and user_id = $2 and id <> $3 and is_default = true`,
        [sandboxId, userId, keepId],
    )
}

async function loadOwnAddress(client, sandboxId, userId, id) {
    const { rows } = await client.query(
        `select ${SELECT_COLUMNS}, user_id from addresses where sandbox_id = $1 and id = $2`,
        [sandboxId, id],
    )
    const row = rows[0]
    if (!row) throw notFound('Adres bulunamadı')
    // 403: kayıt var ama senin değil. Sipariş ucundaki davranışla aynı —
    // yetki testleri iki uçta farklı sonuç görmemeli.
    if (row.user_id !== userId) throw forbidden('Bu adres sana ait değil')
    return row
}

// GET /api/v1/addresses
addressesRouter.get('/', asyncRoute(async (req, res) => {
    const { rows } = await query(
        `select ${SELECT_COLUMNS} from addresses
          where sandbox_id = $1 and user_id = $2
          order by is_default desc, id`,
        [req.sandbox.id, req.user.id],
    )
    res.json({ total: rows.length, addresses: rows })
}))

// POST /api/v1/addresses
addressesRouter.post('/', asyncRoute(async (req, res) => {
    const fields = validateBody(req.body, { partial: false })

    const created = await withTransaction(async (client) => {
        // İlk adres otomatik olarak varsayılandır: kullanıcı hiç seçim yapmadan
        // checkout'a geldiğinde "varsayılan adres yok" durumu oluşmasın diye.
        const { rows: countRows } = await client.query(
            'select count(*)::int as total from addresses where sandbox_id = $1 and user_id = $2',
            [req.sandbox.id, req.user.id],
        )
        const isFirst = countRows[0].total === 0
        const isDefault = fields.is_default ?? isFirst

        const { rows } = await client.query(
            `insert into addresses (sandbox_id, user_id, label, line1, city, country, postal_code, is_default)
             values ($1, $2, coalesce($3, 'home'), $4, $5, coalesce($6, 'TR'), $7, $8)
             returning ${SELECT_COLUMNS}`,
            [req.sandbox.id, req.user.id, fields.label ?? null, fields.line1, fields.city,
             fields.country ?? null, fields.postal_code ?? null, isDefault],
        )
        const row = rows[0]
        if (isDefault) await clearOtherDefaults(client, req.sandbox.id, req.user.id, row.id)
        return row
    })

    await auditFromRequest(req, {
        action: 'address.create', entity: 'address', entityId: created.id,
        detail: { city: created.city, isDefault: created.is_default },
    })
    res.status(201).location(`/api/v1/addresses/${created.id}`).json({ address: created })
}))

// PATCH /api/v1/addresses/:id
addressesRouter.patch('/:id', asyncRoute(async (req, res) => {
    const id = parseId(req.params.id)
    const fields = validateBody(req.body, { partial: true })

    if (!Object.keys(fields).length) {
        throw unprocessable('EMPTY_PATCH', 'Güncellenecek en az bir alan gönderilmeli', {
            allowed: ['label', 'line1', 'city', 'country', 'postalCode', 'isDefault'],
        })
    }

    const updated = await withTransaction(async (client) => {
        await loadOwnAddress(client, req.sandbox.id, req.user.id, id)

        const sets = []
        const params = [id]
        for (const [column, value] of Object.entries(fields)) {
            params.push(value)
            sets.push(`${column} = $${params.length}`)
        }

        const { rows } = await client.query(
            `update addresses set ${sets.join(', ')} where id = $1 returning ${SELECT_COLUMNS}`,
            params,
        )
        const row = rows[0]
        if (fields.is_default === true) {
            await clearOtherDefaults(client, req.sandbox.id, req.user.id, id)
        }
        return row
    })

    await auditFromRequest(req, {
        action: 'address.update', entity: 'address', entityId: id, detail: { fields: Object.keys(fields) },
    })
    res.json({ address: updated })
}))

// DELETE /api/v1/addresses/:id
addressesRouter.delete('/:id', asyncRoute(async (req, res) => {
    const id = parseId(req.params.id)

    await withTransaction(async (client) => {
        const existing = await loadOwnAddress(client, req.sandbox.id, req.user.id, id)
        await client.query('delete from addresses where id = $1', [id])

        // Varsayılan adres silindiyse boşluk bırakılmaz: kalanlardan biri
        // varsayılan yapılır. Aksi hâlde kullanıcının hiç varsayılanı kalmaz ve
        // bu durum ancak checkout'ta fark edilirdi.
        if (existing.is_default) {
            await client.query(
                `update addresses set is_default = true
                  where id = (select id from addresses
                               where sandbox_id = $1 and user_id = $2
                               order by id limit 1)`,
                [req.sandbox.id, req.user.id],
            )
        }
    })

    await auditFromRequest(req, { action: 'address.delete', entity: 'address', entityId: id })
    res.status(204).end()
}))
