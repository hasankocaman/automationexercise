// Bearer token doğrulama.
//
// Üç ayrı kontrol var ve üçü de gerçekten gerekli:
//   1. İmza geçerli mi + süresi dolmuş mu   → verifyToken
//   2. Oturum iptal edilmiş mi              → sessions.revoked_at
//   3. Token BU sandbox'a mı ait            → claims.sandbox === req.sandbox.id
//
// 3. madde atlanırsa, bir kullanıcının token'ı başka bir sandbox'ta geçerli
// olur — multi-tenant sistemlerin klasik yetki açığı. Testi kolay, kaçırması
// da kolay.
import { query } from '../db.js'
import { verifyToken } from '../lib/token.js'
import { unauthorized } from '../lib/errors.js'

function extractToken(req) {
    const header = req.get('Authorization') || ''
    const [scheme, value] = header.split(' ')
    if (!scheme || scheme.toLowerCase() !== 'bearer' || !value) return null
    return value.trim()
}

export async function requireAuth(req, _res, next) {
    try {
        const token = extractToken(req)
        if (!token) return next(unauthorized('Authorization: Bearer <token> başlığı gerekli'))

        const claims = verifyToken(token)
        if (!claims) return next(unauthorized('Token geçersiz veya süresi dolmuş'))

        if (claims.sandbox !== req.sandbox?.id) {
            return next(unauthorized('Token bu sandbox için geçerli değil'))
        }

        const { rows } = await query(
            `select s.jti, s.revoked_at, s.expires_at,
                    u.id, u.email, u.name, u.is_active, u.sandbox_id
               from sessions s
               join users u on u.id = s.user_id
              where s.jti = $1`,
            [claims.jti],
        )
        const row = rows[0]

        if (!row) return next(unauthorized('Oturum bulunamadı'))
        if (row.revoked_at) return next(unauthorized('Oturum sonlandırılmış'))
        if (new Date(row.expires_at) < new Date()) return next(unauthorized('Oturum süresi dolmuş'))
        if (!row.is_active) return next(unauthorized('Kullanıcı hesabı pasif'))

        req.user = { id: row.id, email: row.email, name: row.name, sandboxId: row.sandbox_id }
        req.session = { jti: row.jti }
        return next()
    } catch (err) {
        return next(err)
    }
}

// Token varsa kullanıcıyı yükler, yoksa sessizce devam eder.
// Misafir sepeti gibi "girişli de olur, girişsiz de" akışlar için.
export async function optionalAuth(req, res, next) {
    if (!extractToken(req)) return next()
    return requireAuth(req, res, next)
}
