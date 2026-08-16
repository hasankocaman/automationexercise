// Sandbox çözümleme — çok kiracılılığın giriş kapısı.
//
// TASARIM KARARI: anahtar göndermeyen istek reddedilmez, ŞABLON sandbox'a
// SALT OKUNUR bağlanır. Böylece:
//   · `curl .../products` hiçbir kurulum olmadan çalışır (ilk deneme kolay)
//   · yazma denemesi 401 döner ve kullanıcıya kendi anahtarını alması söylenir
//
// Alternatif (her isteğe anahtar şartı) daha "doğru" görünürdü ama ilk
// temasta üç adım (anahtar al → sakla → gönder) dayatırdı; pratik alanının
// en çok kaybettiği yer tam olarak orasıdır.
import { query } from '../db.js'
import { unauthorized, ApiError } from '../lib/errors.js'

export const TEMPLATE_SANDBOX_ID = '00000000-0000-0000-0000-000000000000'

export async function resolveSandbox(req, res, next) {
    try {
        const key = req.get('X-Sandbox-Key')

        if (!key) {
            req.sandbox = { id: TEMPLATE_SANDBOX_ID, is_template: true }
            req.readOnly = true
            res.set('X-Sandbox-Mode', 'demo-readonly')
            return next()
        }

        const { rows } = await query(
            `select id, api_key, label, bug_flags, is_template, expires_at
               from sandbox
              where api_key = $1`,
            [key],
        )
        const sandbox = rows[0]

        if (!sandbox) {
            return next(unauthorized('X-Sandbox-Key geçersiz. Yeni anahtar: POST /api/v1/sandbox'))
        }
        if (sandbox.is_template) {
            // Şablon anahtarı kimseye verilmez; verilse bile yazma yapılamaz,
            // çünkü şablonun bozulması TÜM yeni sandbox'ları bozardı.
            return next(unauthorized('Şablon sandbox doğrudan kullanılamaz'))
        }
        if (new Date(sandbox.expires_at) < new Date()) {
            // 410 Gone, 404'ten daha bilgilendirici: kaynak VARDI, süresi doldu.
            return next(new ApiError(410, 'SANDBOX_EXPIRED',
                'Bu sandbox süresi doldu. Yeni anahtar: POST /api/v1/sandbox'))
        }

        req.sandbox = sandbox
        req.readOnly = false
        res.set('X-Sandbox-Mode', 'private')
        return next()
    } catch (err) {
        return next(err)
    }
}

// Yazma yapan route'ların önüne konur.
export function requireWritableSandbox(req, _res, next) {
    if (req.readOnly) {
        return next(unauthorized(
            'Demo verisi salt okunurdur. Kendi alanını aç: POST /api/v1/sandbox, '
            + 'sonra isteklerine X-Sandbox-Key başlığını ekle.',
        ))
    }
    return next()
}
