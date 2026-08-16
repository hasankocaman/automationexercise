// JWT (HS256) — kütüphanesiz, ~40 satır.
//
// Neden hazır kütüphane değil: üretilen token gerçek JWT formatındadır
// (header.payload.signature, base64url). Pratik yapan kişi bunu jwt.io'ya
// yapıştırıp içini GÖREBİLİR — "token nedir" sorusunun cevabı soyut kalmaz.
// Bir bağımlılık daha eklemek bu şeffaflığı kazandırmazdı.
//
// ⚠ Bu bir PRATİK ortamıdır. Gerçek üretimde anahtar rotasyonu, `aud`/`iss`
// doğrulaması ve olgun bir kütüphane gerekir.
import crypto from 'node:crypto'

const SECRET = process.env.JWT_SECRET || 'qa-shop-dev-secret-do-not-use-in-production'
const TTL_SECONDS = Number.parseInt(process.env.TOKEN_TTL_SECONDS || '3600', 10)

const b64url = (buf) => Buffer.from(buf).toString('base64url')

function sign(data) {
    return crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
}

export function issueToken({ userId, sandboxId, jti, ttlSeconds = TTL_SECONDS }) {
    const now = Math.floor(Date.now() / 1000)
    const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = b64url(JSON.stringify({
        sub: String(userId),
        sandbox: sandboxId,
        jti,
        iat: now,
        exp: now + ttlSeconds,
    }))
    const signature = sign(`${header}.${payload}`)
    return { token: `${header}.${payload}.${signature}`, expiresAt: new Date((now + ttlSeconds) * 1000) }
}

// Çözer VE doğrular. Geçersizse null döner (istisna atmaz) — çağıran taraf
// 401'i kendi bağlamına göre üretsin diye.
export function verifyToken(token) {
    if (typeof token !== 'string') return null
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, payload, signature] = parts

    const expected = sign(`${header}.${payload}`)
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

    let claims
    try {
        claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    } catch {
        return null
    }

    // İmza geçerli olsa bile süresi dolmuş token kabul edilmez. İkisi AYRI
    // kontroldür: imza "bu token bizden mi", exp "hâlâ geçerli mi".
    if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) {
        return null
    }
    return claims
}

export const tokenTtlSeconds = TTL_SECONDS
