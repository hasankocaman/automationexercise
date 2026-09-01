// Kimlik doğrulama — register / login / logout / me / refresh
import express from 'express'
import crypto from 'node:crypto'
import { query } from '../db.js'
import { asyncRoute, badRequest, conflict, unauthorized, unprocessable } from '../lib/errors.js'
import { hashPassword, verifyPassword, passwordPolicyError } from '../lib/password.js'
import { issueToken, tokenTtlSeconds } from '../lib/token.js'
import { requireAuth } from '../middleware/auth.js'
import { requireWritableSandbox } from '../middleware/sandbox.js'
import { isBugOn } from '../core/bugFlags.js'
import { auditFromRequest } from '../lib/audit.js'

export const authRouter = express.Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function createSession(sandboxId, userId) {
    const jti = crypto.randomUUID()
    const { token, expiresAt } = issueToken({ userId, sandboxId, jti })
    await query(
        `insert into sessions (jti, sandbox_id, user_id, expires_at) values ($1, $2, $3, $4)`,
        [jti, sandboxId, userId, expiresAt],
    )
    return { token, expiresAt, jti }
}

// POST /api/v1/auth/register
authRouter.post('/register', requireWritableSandbox, asyncRoute(async (req, res) => {
    const { email, password, name } = req.body || {}

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
        throw unprocessable('INVALID_EMAIL', 'Geçerli bir e-posta adresi gerekli', { field: 'email' })
    }
    // `weak_password_accepted` anahtarı açıkken parola politikası hiç
    // uygulanmaz: "123" ile hesap açılır ve 422 beklenen yerde 201 döner.
    // Yalnızca mutlu yolu deneyen bir kayıt testi bunu göremez.
    const policyError = isBugOn(req.sandbox.bug_flags, 'weak_password_accepted')
        ? null
        : passwordPolicyError(password)
    if (policyError) {
        throw unprocessable('WEAK_PASSWORD', policyError, { field: 'password' })
    }
    if (typeof name !== 'string' || name.trim().length < 2) {
        throw unprocessable('INVALID_NAME', 'İsim en az 2 karakter olmalı', { field: 'name' })
    }

    // E-posta küçük harfe indirgenir: 'Ali@x.com' ile 'ali@x.com' aynı kişidir.
    // Bunu yapmayan sistemlerde mükerrer hesap oluşur (bkz. doğrulama sorgusu D1).
    const normalized = email.trim().toLowerCase()

    const existing = await query(
        'select id from users where sandbox_id = $1 and lower(email) = $2',
        [req.sandbox.id, normalized],
    )
    if (existing.rows.length) {
        throw conflict('EMAIL_ALREADY_EXISTS', 'Bu e-posta zaten kayıtlı', { email: normalized })
    }

    const { rows } = await query(
        `insert into users (sandbox_id, email, password_hash, name)
         values ($1, $2, $3, $4)
         returning id, email, name, is_active, created_at`,
        [req.sandbox.id, normalized, hashPassword(password), name.trim()],
    )
    const user = rows[0]

    await auditFromRequest(req, {
        action: 'auth.register', entity: 'user', entityId: user.id, detail: { email: normalized },
    })

    // 201 + Location: kaynak oluşturuldu. Token DÖNMÜYOR — kayıt ile giriş
    // ayrı işlemlerdir; birleştirmek "kayıt olan herkes otomatik giriş yapar"
    // varsayımını dayatır ve e-posta doğrulaması eklendiğinde kırılır.
    res.status(201).location(`/api/v1/users/${user.id}`).json({ user })
}))

// POST /api/v1/auth/login
authRouter.post('/login', requireWritableSandbox, asyncRoute(async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) {
        throw badRequest('email ve password zorunlu', { missing: [!email && 'email', !password && 'password'].filter(Boolean) })
    }

    const { rows } = await query(
        `select id, email, name, password_hash, is_active
           from users
          where sandbox_id = $1 and lower(email) = $2`,
        [req.sandbox.id, String(email).trim().toLowerCase()],
    )
    const user = rows[0]

    // ⚠ Kullanıcı yoksa da parola yanlışsa da AYNI mesaj dönüyor. Farklı mesaj
    // vermek, saldırgana "bu e-posta kayıtlı" bilgisini sızdırır (user
    // enumeration). Testte de bu beklenir: iki senaryo da 401 + aynı gövde.
    if (!user || !verifyPassword(password, user.password_hash)) {
        await auditFromRequest(req, {
            level: 'WARN', action: 'auth.login_failed', entity: 'user', detail: { email },
        })
        throw unauthorized('E-posta veya parola hatalı')
    }
    if (!user.is_active) {
        throw unauthorized('Hesap pasif durumda')
    }

    const session = await createSession(req.sandbox.id, user.id)

    await auditFromRequest(req, { action: 'auth.login', entity: 'user', entityId: user.id })

    res.json({
        token: session.token,
        tokenType: 'Bearer',
        expiresIn: tokenTtlSeconds,
        expiresAt: session.expiresAt,
        user: { id: user.id, email: user.email, name: user.name },
    })
}))

// GET /api/v1/auth/me
authRouter.get('/me', requireAuth, asyncRoute(async (req, res) => {
    const { rows } = await query(
        `select u.id, u.email, u.name, u.is_active, u.created_at,
                (select count(*) from orders o where o.user_id = u.id) as order_count
           from users u where u.id = $1`,
        [req.user.id],
    )
    res.json({ user: rows[0] })
}))

// POST /api/v1/auth/logout
//
// Gerçekten iptal eder (sessions.revoked_at). Stateless JWT'de logout sahte
// bir 204 olurdu: token hâlâ geçerli kalırdı ve "çıkış yaptıktan sonra eski
// token'la /me çağır" testi YEŞİL geçerdi — yanlış yere.
authRouter.post('/logout', requireAuth, asyncRoute(async (req, res) => {
    await query('update sessions set revoked_at = now() where jti = $1 and revoked_at is null',
        [req.session.jti])
    await auditFromRequest(req, { action: 'auth.logout', entity: 'user', entityId: req.user.id })
    res.status(204).end()
}))

// POST /api/v1/auth/refresh — eski oturumu kapatıp yenisini açar
authRouter.post('/refresh', requireAuth, asyncRoute(async (req, res) => {
    await query('update sessions set revoked_at = now() where jti = $1', [req.session.jti])
    const session = await createSession(req.sandbox.id, req.user.id)
    await auditFromRequest(req, { action: 'auth.refresh', entity: 'user', entityId: req.user.id })
    res.json({
        token: session.token,
        tokenType: 'Bearer',
        expiresIn: tokenTtlSeconds,
        expiresAt: session.expiresAt,
    })
}))

// POST /api/v1/auth/supabase-bridge — Supabase üyesi → QA Shop otomatik giriş
//
// LearnQA.dev sitesinde üye bir kişi /qa-shop'a geldiğinde, Supabase token'ı
// ile bu endpoint'i çağrır. Sistem o kullanıcı için bir sandbox oluşturur ve
// QA Shop oturumunu başlatır. Böylece site üyeliği → sandbox giriş köprüsü kurulur.
//
// Body: { supabaseToken: "<Supabase JWT>", userEmail: "user@x.com", userName: "User Name" }
// Response: { sandboxId, token (qa-shop JWT), expiresAt }
//
// NOT: Supabase JWT signature doğrulama şimdilik yapılmıyor. Token format'ı
// doğrulanır (supabase_* prefix) ve e-posta/ad alınır. Deployment'ta
// SUPABASE_JWT_SECRET ile gerçek signature doğrulaması eklenebilir.
authRouter.post('/supabase-bridge', asyncRoute(async (req, res) => {
    const { supabaseToken, userEmail, userName } = req.body || {}

    if (typeof supabaseToken !== 'string' || !supabaseToken.startsWith('supabase_')) {
        throw badRequest('INVALID_TOKEN', 'Supabase token gerekli ve supabase_ ile başlamalı')
    }
    if (typeof userEmail !== 'string' || !EMAIL_RE.test(userEmail)) {
        throw badRequest('INVALID_EMAIL', 'Geçerli bir e-posta adresi gerekli')
    }
    if (typeof userName !== 'string' || userName.trim().length < 2) {
        throw badRequest('INVALID_NAME', 'İsim en az 2 karakter olmalı')
    }

    // Supabase üyesi için yeni sandbox oluştur (her oturum ayrı sandbox)
    // veya var olan bir sandbox'ı bul (aynı kullanıcı tekrar giriş yapıyorsa).
    // YAPACAK: Üyeler için persistent sandbox yapısı (şimdi her giriş yeni)
    const label = `LearnQA üyesi: ${userName} (${userEmail})`
    const { rows: sandboxRows } = await query(
        `insert into sandbox (api_key, label, expires_at)
         values ($1, $2, now() + interval '30 days')
         returning id, api_key, created_at, expires_at`,
        [`supabase_${crypto.randomBytes(24).toString('hex')}`, label],
    )
    const sandbox = sandboxRows[0]

    // Sandbox'ı klonla (şablon → demo veri)
    const TEMPLATE_SANDBOX_ID = '00000000-0000-0000-0000-000000000000'
    await query('select clone_sandbox($1, $2)', [TEMPLATE_SANDBOX_ID, sandbox.id])

    // Sandbox'a demo kullanıcısı oluştur (gerçek Supabase e-postası yerine)
    // YAPACAK: Gerçek kullanıcı oluştur (email/name Supabase'den)
    const { rows: userRows } = await query(
        `insert into users (sandbox_id, email, name, is_active)
         values ($1, $2, $3, true)
         returning id`,
        [sandbox.id, userEmail.toLowerCase(), userName.trim()],
    )
    const user = userRows[0]

    // QA Shop token'ı oluştur
    const session = await createSession(sandbox.id, user.id)

    res.status(201).json({
        sandboxId: sandbox.id,
        token: session.token,
        tokenType: 'Bearer',
        expiresIn: tokenTtlSeconds,
        expiresAt: session.expiresAt,
        message: 'Supabase üyesi olarak QA Shop\'ta giriş yaptınız',
    })
}))
