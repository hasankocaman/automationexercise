// QA Shop — tarayıcı modu MSW handler'ları
//
// ── NEDEN SERVICE WORKER, NEDEN BELLEK İÇİ YAMA DEĞİL ───────────────────────
// Bu sayfanın vaadi şu: kullanıcı manuel adımı yapar ve isteğin GERÇEK HTTP
// satırını DevTools → Network'te status koduyla görür. `fetch`'i bellekte
// yamalayan bir mock bunu veremez — istek ağ katmanına hiç inmediği için
// Network sekmesinde satır oluşmaz ve işin tek şartı çöker.
//
// MSW Service Worker modunda istek gerçekten ağ katmanına iner, worker
// tarafından karşılanır ve DevTools'ta normal bir XHR/Fetch satırı olarak
// görünür — method, path, status, timing dahil.
//
// Worker uygulama açılışında zaten başlatılıyor (src/main.jsx). Buradaki
// handler'lar `/qa-shop` açıldığında ÇALIŞMA ANINDA eklenir: sql.js WASM'ı ve
// 328 KB'lık tohum veri ana sayfa paketine girmesin diye.
import { http, HttpResponse, delay } from 'msw'
import { apiCagir } from './api.js'

const ONEK = '/api/v1'

// Gecikme ve rastgele hata anahtarları: DevTools'un timing sütununda ve
// status sütununda GERÇEKTEN görünsünler diye burada uygulanır.
let yavasUc = false
let rastgele500 = false

export function agDavranisiAyarla({ slow, random500 }) {
    if (typeof slow === 'boolean') yavasUc = slow
    if (typeof random500 === 'boolean') rastgele500 = random500
}

export function agDavranisiOku() {
    return { slow: yavasUc, random500: rastgele500 }
}

async function govdeOku(request) {
    if (request.method === 'GET' || request.method === 'DELETE') return undefined
    try { return await request.json() } catch { return undefined }
}

async function isle({ request }) {
    const url = new URL(request.url)
    const yol = url.pathname.slice(ONEK.length) || '/'

    if (yavasUc) await delay(1800)

    if (rastgele500 && Math.random() < 0.3) {
        return HttpResponse.json(
            { error: { code: 'INTERNAL_ERROR', message: 'Beklenmeyen sunucu hatası (rastgele 500 anahtarı açık)' } },
            { status: 500, headers: { 'X-QA-Shop-Mode': 'browser' } },
        )
    }

    let sonuc
    try {
        sonuc = await apiCagir({
            method: request.method,
            yol,
            govde: await govdeOku(request),
            baslik: {
                authorization: request.headers.get('authorization') ?? '',
            },
            sorguParam: Object.fromEntries(url.searchParams),
        })
    } catch (err) {
        // Katmanın kendi hatası da 500 olarak DÖNER, sessizce yutulmaz:
        // yutulsaydı istek Network'te "(failed)" görünür ve kullanıcı ürünün
        // mü yoksa mock'un mu bozuk olduğunu ayırt edemezdi.
        return HttpResponse.json(
            { error: { code: 'BROWSER_LAYER_ERROR', message: String(err?.message ?? err) } },
            { status: 500, headers: { 'X-QA-Shop-Mode': 'browser' } },
        )
    }

    if (sonuc.durum === 204) {
        return new HttpResponse(null, { status: 204, headers: { 'X-QA-Shop-Mode': 'browser' } })
    }
    return HttpResponse.json(sonuc.govde, {
        status: sonuc.durum,
        headers: {
            'X-QA-Shop-Mode': 'browser',
            'X-Correlation-Id': sonuc.govde?.correlationId ?? `req-${crypto.randomUUID()}`,
        },
    })
}

// Tek tek method'lar: MSW'de tek bir `http.all` yolu her method'u kapsamıyor.
export const qaShopHandlers = [
    http.get(`${ONEK}/*`, isle),
    http.post(`${ONEK}/*`, isle),
    http.patch(`${ONEK}/*`, isle),
    http.put(`${ONEK}/*`, isle),
    http.delete(`${ONEK}/*`, isle),
]

let kayitli = false

// Handler'lar bir kez eklenir. İkinci kez eklemek MSW'de öncekini gölgeler ve
// hangi sürümün çalıştığı belirsizleşir.
export async function tarayiciModunuBaslat() {
    if (kayitli) return true
    try {
        const { worker } = await import('../mocks/browser')
        worker.use(...qaShopHandlers)
        kayitli = true
        return true
    } catch (err) {
        console.error('[qa-shop] Tarayıcı modu başlatılamadı:', err)
        return false
    }
}
