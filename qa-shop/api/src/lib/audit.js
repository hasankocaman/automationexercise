// Denetim kaydı yazıcısı.
//
// Log analiziyle kök neden bulma pratiğinin malzemesi buradan üretilir:
// her anlamlı işlem bir satır yazar ve satır, isteğin `correlation_id`'sini
// taşır. Böylece "şu sipariş neden oluşmadı" sorusu tek bir zincir sorgusuna
// indirgenir (bkz. db/validation-queries.sql · E2).
import { query } from '../db.js'

// ⚠ Log yazımı ASLA isteği düşürmez. Denetim kaydı yan üründür; audit_log
// tablosu dolsa/kilitli olsa bile müşterinin siparişi geçmelidir. Bu yüzden
// hata yutuluyor — ama sessizce değil, konsola düşüyor.
export async function audit({
    sandboxId, level = 'INFO', actor = null, action,
    entity = null, entityId = null, correlationId = null, detail = null,
}) {
    if (!sandboxId || !action) return
    try {
        await query(
            `insert into audit_log
                 (sandbox_id, level, actor, action, entity, entity_id, correlation_id, detail)
             values ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [sandboxId, level, actor, action, entity,
             entityId == null ? null : String(entityId),
             correlationId, detail ? JSON.stringify(detail) : null],
        )
    } catch (err) {
        console.error('[audit] kayıt yazılamadı:', err.message)
    }
}

// Express isteğinden alanları toplayan kısayol.
export function auditFromRequest(req, fields) {
    return audit({
        sandboxId: req.sandbox?.id,
        actor: req.user?.email || 'anonymous',
        correlationId: req.correlationId,
        ...fields,
    })
}
