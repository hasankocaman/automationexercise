// Tek tip hata gövdesi.
//
// Neden önemli: bir API'yi otomatize eden kişi hata gövdesini de PARSE eder.
// Her endpoint kendi hata şeklini döndürürse (kimi `message`, kimi `error`,
// kimi düz metin) test kodu her uç için ayrı ayrı yazılır ve kırılgan olur.
// Burada sözleşme sabit:
//
//     { "error": { "code": "OUT_OF_STOCK", "message": "...", "details": {...} },
//       "correlationId": "..." }

export class ApiError extends Error {
    constructor(status, code, message, details = null) {
        super(message)
        this.status = status
        this.code = code
        this.details = details
    }
}

export const badRequest  = (msg, d) => new ApiError(400, 'BAD_REQUEST', msg, d)
export const unauthorized = (msg = 'Kimlik doğrulanamadı') => new ApiError(401, 'UNAUTHORIZED', msg)
export const forbidden   = (msg = 'Bu kaynağa erişim yetkin yok') => new ApiError(403, 'FORBIDDEN', msg)
export const notFound    = (msg = 'Kayıt bulunamadı') => new ApiError(404, 'NOT_FOUND', msg)
export const conflict    = (code, msg, d) => new ApiError(409, code, msg, d)
export const unprocessable = (code, msg, d) => new ApiError(422, code, msg, d)

// Async route handler'ları sarar: içeride atılan hata Express'in hata
// middleware'ine ulaşsın diye. Bu sarmalayıcı olmadan bir async fonksiyonda
// atılan hata "unhandled rejection" olur ve istek SONSUZA KADAR ASILI kalır —
// timeout testleri yazarken en çok kafa karıştıran davranışlardan biri.
export const asyncRoute = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export function errorHandler(err, req, res, _next) {
    // Bozuk JSON gövdesi express.json() içinde SyntaxError olarak patlar.
    // Yakalanmazsa 500 döner ve "sunucu çöktü" gibi görünür; oysa hata
    // İSTEMCİDEDİR ve doğru cevap 400'dür.
    if (err?.type === 'entity.parse.failed' || err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: { code: 'MALFORMED_JSON', message: 'İstek gövdesi geçerli JSON değil' },
            correlationId: req.correlationId,
        })
    }
    if (err?.type === 'entity.too.large') {
        return res.status(413).json({
            error: { code: 'PAYLOAD_TOO_LARGE', message: 'İstek gövdesi çok büyük' },
            correlationId: req.correlationId,
        })
    }

    const status = err instanceof ApiError ? err.status : 500
    const code = err instanceof ApiError ? err.code : 'INTERNAL_ERROR'
    const message = err instanceof ApiError ? err.message : 'Beklenmeyen bir hata oluştu'

    if (status >= 500) {
        console.error(`[error] ${req.method} ${req.originalUrl}`, err)
    }

    const body = { error: { code, message }, correlationId: req.correlationId }
    if (err instanceof ApiError && err.details) body.error.details = err.details

    res.status(status).json(body)
}

export function notFoundHandler(req, res) {
    res.status(404).json({
        error: { code: 'ROUTE_NOT_FOUND', message: `${req.method} ${req.originalUrl} tanımlı değil` },
        correlationId: req.correlationId,
    })
}
