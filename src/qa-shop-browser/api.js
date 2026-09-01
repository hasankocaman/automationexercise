// QA Shop — tarayıcı içi API katmanı
//
// ── SÖZLEŞME AYNI ───────────────────────────────────────────────────────────
// Yollar, gövde şekilleri ve HTTP status kodları lokal Docker API'siyle
// BİREBİR aynıdır (`qa-shop/api/openapi.yaml`). Amaç şu: kullanıcı iki modda
// da DevTools → Network'te aynı satırı görsün. Hata yolları `200 + {error}`
// ile kapatılmaz — 401/403/409/422 gerçekten o kodla döner, çünkü bu sayfanın
// öğrettiği şeyin yarısı doğru status kodunu tanımaktır.
//
// ── İŞ KURALLARI KOPYALANMAZ ────────────────────────────────────────────────
// Fiyat, stok, kupon, sipariş geçişleri ve defect anahtarları buradaki değil
// `qa-shop/api/src/core/` altındaki modüllerin işidir; türevi build sırasında
// senkronlanır (scripts/sync-qa-shop-core.mjs). İkinci bir kopya yazılsaydı
// biri düzeltilip diğeri unutulduğunda iki mod sessizce ayrışırdı.
import { summarize, round2, lineTotal } from '../data/generated/qaShopCore/pricing.js'
import {
    checkCoupon, checkStock, availableQty, canCancel, canTransition, canReturn,
} from '../data/generated/qaShopCore/rules.js'
import {
    BUG_FLAG_KEYS, isBugOn, activeFlags, describeFlags, unknownFlagKeys,
    HIDDEN_KEY, isHidden, pickRandomFlags, describeFlagsHidden, hiddenCount,
} from '../data/generated/qaShopCore/bugFlags.js'
import {
    dbHazirla, dbSifirla, sorgu, tekSatir, calistir, ekleVeIdAl,
    metaOku, metaYaz, parolaDogrula, parolaOzetle,
} from './db.js'

// ─── Cevap yardımcıları ─────────────────────────────────────────────────────

const korelasyon = () => `req-${crypto.randomUUID()}`

const ok = (govde, durum = 200) => ({ durum, govde })
const hata = (durum, kod, mesaj, ayrinti) => ({
    durum,
    govde: { error: { code: kod, message: mesaj, ...(ayrinti ? { details: ayrinti } : {}) }, correlationId: korelasyon() },
})

const yok = (m = 'Kayıt bulunamadı') => hata(404, 'NOT_FOUND', m)
const yetkisiz = (m = 'Geçersiz veya eksik token') => hata(401, 'UNAUTHORIZED', m)
const yasak = (m = 'Bu kayda erişemezsin') => hata(403, 'FORBIDDEN', m)
const cakisma = (kod, m, a) => hata(409, kod, m, a)
const islenemez = (kod, m, a) => hata(422, kod, m, a)

// ─── Yardımcılar ────────────────────────────────────────────────────────────

const simdi = () => new Date().toISOString()
const bayrakOku = () => metaOku('bug_flags', {}) ?? {}

function tokenCoz(baslik) {
    const t = String(baslik ?? '').replace(/^Bearer\s+/i, '').trim()
    if (!t) return null
    const oturum = tekSatir(
        'select s.jti, s.user_id, u.email, u.name, u.is_active from sessions s join users u on u.id = s.user_id where s.jti = ? and s.revoked_at is null',
        [t])
    if (!oturum) return null
    return oturum
}

function kullaniciGerekli(istek) {
    const oturum = tokenCoz(istek.baslik.authorization)
    if (!oturum) return { hata: yetkisiz() }
    return { kullanici: oturum }
}

// Ürün satırı: liste ve detay aynı şekli döndürmeli, yoksa iki mod arasında
// değil AYNI mod içinde tutarsızlık çıkar.
const URUN_ALANLARI = `
    p.id, p.sku, p.name, p.description, p.price, p.currency, p.is_active, p.created_at,
    c.slug as category, c.name as category_name, b.name as brand,
    (select count(*) from product_variants v where v.product_id = p.id) as variant_count,
    (select coalesce(sum(i.stock_qty - i.reserved_qty), 0) from product_variants v
       join inventory i on i.variant_id = v.id where v.product_id = p.id) as total_stock`

function urunPuani(urunId, bayraklar) {
    // pending_reviews_in_average: LİSTE doğru filtrelenmeye devam eder, yalnızca
    // ortalama bozulur — defect'in bütün inceliği burada.
    const nerede = isBugOn(bayraklar, 'pending_reviews_in_average')
        ? 'product_id = ?'
        : "product_id = ? and status = 'approved'"
    const r = tekSatir(`select coalesce(avg(rating), 0) as ort, count(*) as adet from reviews where ${nerede}`, [urunId])
    return { rating_avg: round2(r?.ort ?? 0), rating_count: Number(r?.adet ?? 0) }
}

function sepetOzeti(cartId) {
    const sepet = tekSatir('select * from carts where id = ?', [cartId])
    if (!sepet) return null
    const satirlar = sorgu(`
        select ci.id, ci.variant_id, ci.qty, ci.unit_price_snapshot as unit_price,
               p.name as product_name, v.size, v.color
          from cart_items ci
          join product_variants v on v.id = ci.variant_id
          join products p on p.id = v.product_id
         where ci.cart_id = ? order by ci.id`, [cartId])

    const kupon = sepet.coupon_code
        ? tekSatir('select * from coupons where code = ?', [sepet.coupon_code])
        : null

    const bayraklar = bayrakOku()
    const items = satirlar.map((s) => ({ ...s, line_total: lineTotal(s.unit_price, s.qty) }))
    const toplam = summarize(items.map((i) => ({ unit_price: i.unit_price, qty: i.qty })), kupon)

    // discount_twice: indirim iki kez düşülür. Arayüz yine yeşil onay gösterir;
    // fark yalnızca mutabakat kontrolünde görünür.
    if (isBugOn(bayraklar, 'discount_twice') && toplam.discount_total > 0) {
        toplam.discount_total = round2(toplam.discount_total * 2)
        toplam.grand_total = round2(toplam.subtotal - toplam.discount_total + toplam.shipping_total)
    }

    return { cart: sepet, items, totals: toplam }
}

// ─── Yönlendirme tablosu ────────────────────────────────────────────────────
//
// Desteklenmeyen endpoint'ler SESSİZCE 404 dönmez: 501 + hangi modda çalıştığı
// söylenir. Sessiz 404, kullanıcıya "yolu yanlış yazdım" dedirtir ve yanlış
// yerde saatlerce arattırır.
const KAPSAM_DISI = [
    'GET /orders/:id/invoice', 'POST /auth/refresh', 'POST /products/:id/reviews',
    'PATCH /addresses/:id', 'DELETE /addresses/:id', 'GET /brands', 'GET /sandbox/logs',
]

export async function apiCagir({ method, yol, govde, baslik, sorguParam }) {
    await dbHazirla()
    const istek = { method, yol, govde: govde ?? {}, baslik: baslik ?? {}, sorguParam: sorguParam ?? {} }
    const parcalar = yol.split('/').filter(Boolean)
    const bayraklar = bayrakOku()

    // ── auth ────────────────────────────────────────────────────────────────
    if (yol === '/auth/register' && method === 'POST') return authKayit(istek, bayraklar)
    if (yol === '/auth/login' && method === 'POST') return authGiris(istek)
    if (yol === '/auth/me' && method === 'GET') return authBen(istek)
    if (yol === '/auth/logout' && method === 'POST') return authCikis(istek)

    // ── katalog ─────────────────────────────────────────────────────────────
    if (yol === '/products' && method === 'GET') return urunler(istek, bayraklar)
    if (yol === '/categories' && method === 'GET') return kategoriler()
    if (yol === '/search' && method === 'GET') return urunler(istek, bayraklar)
    if (parcalar[0] === 'products' && parcalar.length === 2 && method === 'GET') return urunDetay(parcalar[1], bayraklar)
    if (parcalar[0] === 'products' && parcalar[2] === 'variants' && method === 'GET') return varyantlar(parcalar[1])
    if (parcalar[0] === 'products' && parcalar[2] === 'reviews' && method === 'GET') return yorumlar(parcalar[1])
    if (parcalar[0] === 'categories' && parcalar[2] === 'products' && method === 'GET') return kategoriUrunleri(parcalar[1], istek, bayraklar)

    // ── sepet ───────────────────────────────────────────────────────────────
    if (yol === '/carts' && method === 'POST') return sepetAc(istek)
    if (parcalar[0] === 'carts' && parcalar.length === 2 && method === 'GET') return sepetGetir(parcalar[1], istek)
    if (parcalar[0] === 'carts' && parcalar[2] === 'items' && method === 'POST') return sepeteEkle(parcalar[1], istek, bayraklar)
    if (parcalar[0] === 'carts' && parcalar[2] === 'items' && parcalar[3] && method === 'PATCH') return sepetAdet(parcalar[1], parcalar[3], istek, bayraklar)
    if (parcalar[0] === 'carts' && parcalar[2] === 'items' && parcalar[3] && method === 'DELETE') return sepetSil(parcalar[1], parcalar[3], istek)
    if (parcalar[0] === 'carts' && parcalar[2] === 'coupon' && method === 'POST') return kuponUygula(parcalar[1], istek)

    // ── sipariş ─────────────────────────────────────────────────────────────
    if (yol === '/orders' && method === 'POST') return siparisOlustur(istek, bayraklar)
    if (yol === '/orders' && method === 'GET') return siparisListe(istek, bayraklar)
    if (parcalar[0] === 'orders' && parcalar.length === 2 && method === 'GET') return siparisDetay(parcalar[1], istek)
    if (parcalar[0] === 'orders' && parcalar[2] === 'pay' && method === 'POST') return siparisOde(parcalar[1], istek)
    if (parcalar[0] === 'orders' && ['cancel', 'ship', 'deliver', 'return'].includes(parcalar[2]) && method === 'POST') {
        return siparisGecis(parcalar[1], parcalar[2], istek, bayraklar)
    }

    // ── adres ───────────────────────────────────────────────────────────────
    if (yol === '/addresses' && method === 'GET') return adresListe(istek)
    if (yol === '/addresses' && method === 'POST') return adresEkle(istek)

    // ── sandbox ─────────────────────────────────────────────────────────────
    if (yol === '/sandbox/state' && method === 'GET') return sandboxDurum()
    if (yol === '/sandbox/reset' && method === 'POST') return sandboxSifirla()
    if (yol === '/sandbox/bugs' && method === 'GET') return bugListe(bayraklar)
    if (yol === '/sandbox/bugs' && method === 'PATCH') return bugDegistir(istek, bayraklar)
    if (yol === '/sandbox/bugs/hidden' && method === 'POST') return bugGizli(istek)
    if (yol === '/sandbox/bugs/reveal' && method === 'POST') return bugAcikla(bayraklar)

    const imza = `${method} /${parcalar.map((p, i) => (i === 1 && /^\d+$/.test(p) ? ':id' : p)).join('/')}`
    if (KAPSAM_DISI.some((k) => imza.startsWith(k.split(' ')[0]) && imza.includes(k.split(' ')[1].split('/')[1]))) {
        return hata(501, 'NOT_IN_BROWSER_MODE',
            'Bu endpoint tarayıcı modunda yok. Docker modunda çalışır: /qa-shop-setup',
            { endpoint: imza, mode: 'browser' })
    }
    return hata(404, 'ROUTE_NOT_FOUND', `${method} ${yol} tanımlı değil`)
}

// ─── auth ───────────────────────────────────────────────────────────────────

async function authKayit(istek, bayraklar) {
    const { email, password, name: ad } = istek.govde
    if (!email || !String(email).includes('@')) {
        return islenemez('INVALID_EMAIL', 'Geçerli bir e-posta gerekli', { field: 'email' })
    }
    // weak_password_accepted: politika hiç uygulanmaz, 422 beklenen yerde 201 döner.
    if (!isBugOn(bayraklar, 'weak_password_accepted')) {
        const p = String(password ?? '')
        if (p.length < 8) return islenemez('WEAK_PASSWORD', 'Parola en az 8 karakter olmalı', { field: 'password' })
        if (!/[A-Za-z]/.test(p) || !/[0-9]/.test(p)) {
            return islenemez('WEAK_PASSWORD', 'Parola en az bir harf ve bir rakam içermeli', { field: 'password' })
        }
    }
    if (tekSatir('select id from users where email = ?', [email])) {
        return cakisma('EMAIL_TAKEN', 'Bu e-posta zaten kayıtlı', { field: 'email' })
    }
    const ozet = await parolaOzetle(String(password ?? ''))
    const id = ekleVeIdAl(
        'INSERT INTO users (sandbox_id, email, password_hash, name, is_active, created_at) VALUES (?,?,?,?,?,?)',
        ['browser', email, ozet, ad ?? email.split('@')[0], 1, simdi()])
    return ok({ user: { id, email, name: ad ?? email.split('@')[0], is_active: true } }, 201)
}

async function authGiris(istek) {
    const { email, password } = istek.govde
    const kullanici = tekSatir('select * from users where email = ?', [email])
    // Kullanıcı yok ile parola yanlış AYNI cevabı döner: hangisinin var olduğunu
    // sızdırmak hesap sayımına (user enumeration) izin verir.
    if (!kullanici || !(await parolaDogrula(String(password ?? ''), kullanici.password_hash))) {
        return yetkisiz('E-posta veya parola hatalı')
    }
    if (!kullanici.is_active) return yasak('Hesap pasif')

    // Oturum kimliği `jti` sütunudur (sessions tablosunun birincil anahtarı);
    // ayrı bir token sütunu YOKTUR. Token olarak jti'nin kendisi taşınır.
    const token = crypto.randomUUID()
    calistir('INSERT INTO sessions (jti, sandbox_id, user_id, issued_at, expires_at) VALUES (?,?,?,?,?)',
        [token, 'browser', kullanici.id, simdi(), new Date(Date.now() + 86400000).toISOString()])
    return ok({
        token,
        user: { id: kullanici.id, email: kullanici.email, name: kullanici.name },
    })
}

function authBen(istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    return ok({ user: { id: kullanici.user_id, email: kullanici.email, name: kullanici.name } })
}

function authCikis(istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    calistir('UPDATE sessions SET revoked_at = ? WHERE jti = ?', [simdi(), kullanici.jti])
    return ok({ message: 'Oturum kapatıldı' })
}

// ─── katalog ────────────────────────────────────────────────────────────────

function sayfala(istek) {
    const s = istek.sorguParam ?? {}
    const size = Math.min(Number(s.size ?? 20) || 20, 100)
    const page = Math.max(Number(s.page ?? 1) || 1, 1)
    return { size, page, offset: (page - 1) * size }
}

function urunler(istek, bayraklar) {
    const s = istek.sorguParam ?? {}
    const { size, page, offset } = sayfala(istek)
    const kosullar = ['p.is_active = 1']
    const p = []
    if (s.q) { kosullar.push('(p.name like ? or p.description like ?)'); p.push(`%${s.q}%`, `%${s.q}%`) }
    const nerede = kosullar.join(' and ')

    const siralanabilir = { price: 'p.price', name: 'p.name', created_at: 'p.created_at', id: 'p.id' }
    const alan = siralanabilir[s.sort] ?? 'p.id'
    const yon = String(s.order ?? 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc'

    const toplam = tekSatir(`select count(*) as n from products p where ${nerede}`, p)?.n ?? 0
    const satirlar = sorgu(`
        select ${URUN_ALANLARI}
          from products p
          left join categories c on c.id = p.category_id
          left join brands b on b.id = p.brand_id
         where ${nerede} order by ${alan} ${yon} limit ? offset ?`, [...p, size, offset])

    return ok({
        page, size, total: toplam,
        totalPages: Math.ceil(toplam / size),
        hasNext: offset + satirlar.length < toplam,
        items: satirlar.map((r) => ({ ...r, is_active: !!r.is_active, ...urunPuani(r.id, bayraklar) })),
    })
}

function kategoriUrunleri(slug, istek, bayraklar) {
    const kategori = tekSatir('select * from categories where slug = ? or id = ?', [slug, slug])
    if (!kategori) return yok('Kategori bulunamadı')
    const { size, page, offset } = sayfala(istek)
    const toplam = tekSatir('select count(*) as n from products where category_id = ? and is_active = 1', [kategori.id])?.n ?? 0
    const satirlar = sorgu(`
        select ${URUN_ALANLARI}
          from products p
          left join categories c on c.id = p.category_id
          left join brands b on b.id = p.brand_id
         where p.category_id = ? and p.is_active = 1 order by p.id limit ? offset ?`,
    [kategori.id, size, offset])
    return ok({
        page, size, total: toplam, totalPages: Math.ceil(toplam / size),
        hasNext: offset + satirlar.length < toplam,
        items: satirlar.map((r) => ({ ...r, is_active: !!r.is_active, ...urunPuani(r.id, bayraklar) })),
    })
}

function urunDetay(id, bayraklar) {
    const r = tekSatir(`
        select ${URUN_ALANLARI}
          from products p
          left join categories c on c.id = p.category_id
          left join brands b on b.id = p.brand_id
         where p.id = ?`, [id])
    if (!r) return yok('Ürün bulunamadı')
    if (!r.is_active) return yok('Ürün bulunamadı')
    return ok({ product: { ...r, is_active: !!r.is_active, ...urunPuani(r.id, bayraklar) } })
}

function varyantlar(urunId) {
    const satirlar = sorgu(`
        select v.id, v.sku, v.size, v.color, (p.price + v.price_delta) as price,
               i.stock_qty, i.reserved_qty
          from product_variants v
          join products p on p.id = v.product_id
          join inventory i on i.variant_id = v.id
         where v.product_id = ? order by v.id`, [urunId])
    return ok({
        productId: Number(urunId),
        total: satirlar.length,
        variants: satirlar.map((v) => ({ ...v, available: availableQty(v.stock_qty, v.reserved_qty) })),
    })
}

function yorumlar(urunId) {
    const satirlar = sorgu(`
        select r.id, r.rating, r.comment, r.status, r.created_at, u.name as author
          from reviews r left join users u on u.id = r.user_id
         where r.product_id = ? and r.status = 'approved' order by r.created_at desc limit 20`, [urunId])
    return ok({ productId: Number(urunId), status: 'approved', page: 1, size: 20, total: satirlar.length, totalPages: 1, hasNext: false, items: satirlar })
}

function kategoriler() {
    const hepsi = sorgu('select id, name, slug, parent_id from categories order by id')
    const sayilar = Object.fromEntries(sorgu(
        'select category_id, count(*) as n from products where is_active = 1 group by category_id')
        .map((r) => [r.category_id, r.n]))
    const agac = hepsi.filter((c) => c.parent_id == null).map((c) => ({
        ...c, product_count: sayilar[c.id] ?? 0,
        children: hepsi.filter((x) => x.parent_id === c.id)
            .map((x) => ({ ...x, product_count: sayilar[x.id] ?? 0, children: [] })),
    }))
    return ok({ total: hepsi.length, categories: agac })
}

// ─── sepet ──────────────────────────────────────────────────────────────────

function sepetAc(istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const acik = tekSatir("select id from carts where user_id = ? and status = 'open'", [kullanici.user_id])
    const id = acik?.id ?? ekleVeIdAl(
        "INSERT INTO carts (sandbox_id, user_id, status, created_at) VALUES (?,?,'open',?)",
        ['browser', kullanici.user_id, simdi()])
    return ok(sepetOzeti(id), acik ? 200 : 201)
}

function sepetGetir(cartId, istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const ozet = sepetOzeti(cartId)
    if (!ozet) return yok('Sepet bulunamadı')
    if (ozet.cart.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')
    return ok(ozet)
}

function sepeteEkle(cartId, istek, bayraklar) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const sepet = tekSatir('select * from carts where id = ?', [cartId])
    if (!sepet) return yok('Sepet bulunamadı')
    if (sepet.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')

    const variantId = Number(istek.govde.variantId)
    const qty = Number(istek.govde.qty ?? 1)
    if (!Number.isInteger(variantId)) return islenemez('INVALID_VARIANT', 'variantId zorunlu', { field: 'variantId' })
    if (!Number.isInteger(qty) || qty < 1) return islenemez('INVALID_QTY', 'qty en az 1 olmalı', { field: 'qty' })

    // Varyantın fiyatı ürün fiyatı + delta'dır; varyant tablosunda mutlak
    // fiyat sütunu YOKTUR.
    const varyant = tekSatir(`
        select v.id, (p.price + v.price_delta) as price, i.stock_qty, i.reserved_qty
          from product_variants v
          join products p on p.id = v.product_id
          join inventory i on i.variant_id = v.id
         where v.id = ?`, [variantId])
    if (!varyant) return yok('Varyant bulunamadı')

    // oversell: satılabilir adet (stok - rezerve) yerine yalnızca ham stoğa bakar.
    const stokKontrol = isBugOn(bayraklar, 'oversell')
        ? (qty > varyant.stock_qty ? { ok: false, available: varyant.stock_qty } : { ok: true })
        : checkStock({ stock_qty: varyant.stock_qty, reserved_qty: varyant.reserved_qty }, qty)
    if (!stokKontrol.ok) {
        return cakisma('INSUFFICIENT_STOCK', 'Yeterli stok yok',
            { variantId, requested: qty, available: stokKontrol.available })
    }

    const mevcut = tekSatir('select * from cart_items where cart_id = ? and variant_id = ?', [cartId, variantId])
    if (mevcut) {
        calistir('UPDATE cart_items SET qty = qty + ? WHERE id = ?', [qty, mevcut.id])
    } else {
        ekleVeIdAl('INSERT INTO cart_items (cart_id, sandbox_id, variant_id, qty, unit_price_snapshot, added_at) VALUES (?,?,?,?,?,?)',
            [cartId, 'browser', variantId, qty, varyant.price, simdi()])
    }

    // skip_reserve: ürün sepete girer ama reserved_qty artmaz.
    if (!isBugOn(bayraklar, 'skip_reserve')) {
        calistir('UPDATE inventory SET reserved_qty = reserved_qty + ? WHERE variant_id = ?', [qty, variantId])
    }
    return ok(sepetOzeti(cartId), 201)
}

function sepetAdet(cartId, itemId, istek, bayraklar) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const satir = tekSatir('select ci.*, c.user_id from cart_items ci join carts c on c.id = ci.cart_id where ci.id = ? and ci.cart_id = ?', [itemId, cartId])
    if (!satir) return yok('Sepet satırı bulunamadı')
    if (satir.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')

    const qty = Number(istek.govde.qty)
    if (!Number.isInteger(qty) || qty < 1) return islenemez('INVALID_QTY', 'qty en az 1 olmalı', { field: 'qty' })

    const fark = qty - satir.qty
    if (fark > 0) {
        const env = tekSatir('select stock_qty, reserved_qty from inventory where variant_id = ?', [satir.variant_id])
        const kontrol = checkStock(env, fark)
        if (!kontrol.ok) return cakisma('INSUFFICIENT_STOCK', 'Yeterli stok yok', { requested: qty, available: kontrol.available })
    }
    calistir('UPDATE cart_items SET qty = ? WHERE id = ?', [qty, itemId])
    if (!isBugOn(bayraklar, 'skip_reserve')) {
        calistir('UPDATE inventory SET reserved_qty = reserved_qty + ? WHERE variant_id = ?', [fark, satir.variant_id])
    }
    return ok(sepetOzeti(cartId))
}

function sepetSil(cartId, itemId, istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const satir = tekSatir('select ci.*, c.user_id from cart_items ci join carts c on c.id = ci.cart_id where ci.id = ?', [itemId])
    if (!satir) return yok('Sepet satırı bulunamadı')
    if (satir.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')
    calistir('DELETE FROM cart_items WHERE id = ?', [itemId])
    calistir('UPDATE inventory SET reserved_qty = max(0, reserved_qty - ?) WHERE variant_id = ?', [satir.qty, satir.variant_id])
    return { durum: 204, govde: null }
}

function kuponUygula(cartId, istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const ozet = sepetOzeti(cartId)
    if (!ozet) return yok('Sepet bulunamadı')
    if (ozet.cart.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')

    const kod = String(istek.govde.code ?? '').trim()
    const kupon = tekSatir('select * from coupons where code = ?', [kod])
    const kontrol = checkCoupon(kupon, ozet.totals.subtotal)
    if (!kontrol.ok) return islenemez('INVALID_COUPON', kontrol.message, { code: kod, reason: kontrol.reason })

    calistir('UPDATE carts SET coupon_code = ? WHERE id = ?', [kod, cartId])
    return ok(sepetOzeti(cartId))
}

// ─── sipariş ────────────────────────────────────────────────────────────────

function siparisOlustur(istek, bayraklar) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const cartId = Number(istek.govde.cartId)
    if (!Number.isInteger(cartId)) return islenemez('INVALID_CART_ID', 'cartId zorunlu ve sayı olmalı', { field: 'cartId' })

    const ozet = sepetOzeti(cartId)
    if (!ozet) return yok('Sepet bulunamadı')
    if (ozet.cart.user_id !== kullanici.user_id) return yasak('Bu sepet sana ait değil')
    if (ozet.cart.status !== 'open') return cakisma('CART_NOT_OPEN', `Sepet '${ozet.cart.status}' durumunda, sipariş verilemez`)
    if (!ozet.items.length) return islenemez('EMPTY_CART', 'Sepet boş, sipariş oluşturulamaz')

    const sonNo = tekSatir("select max(cast(replace(order_no, 'ORD-', '') as integer)) as n from orders")?.n ?? 1000
    const orderNo = `ORD-${Number(sonNo) + 1}`
    const t = ozet.totals

    const orderId = ekleVeIdAl(`
        INSERT INTO orders (sandbox_id, user_id, order_no, status, subtotal, discount_total, shipping_total, grand_total, coupon_code, placed_at)
        VALUES (?,?,?,'placed',?,?,?,?,?,?)`,
    ['browser', kullanici.user_id, orderNo, t.subtotal, t.discount_total, t.shipping_total, t.grand_total, ozet.cart.coupon_code ?? null, simdi()])

    for (const s of ozet.items) {
        // wrong_line_total: line_total adet × fiyat yerine yalnızca fiyat yazılır.
        // Tek adetli satırlarda fark GÖRÜNMEZ — çok adetlide ortaya çıkar.
        const satirToplam = isBugOn(bayraklar, 'wrong_line_total') ? s.unit_price : lineTotal(s.unit_price, s.qty)
        ekleVeIdAl('INSERT INTO order_items (order_id, sandbox_id, variant_id, name_snapshot, qty, unit_price, line_total) VALUES (?,?,?,?,?,?,?)',
            [orderId, 'browser', s.variant_id, s.product_name, s.qty, s.unit_price, satirToplam])

        // skip_stock_decrement: sipariş oluşur ama stok aynı kalır.
        if (!isBugOn(bayraklar, 'skip_stock_decrement')) {
            calistir('UPDATE inventory SET stock_qty = stock_qty - ? WHERE variant_id = ?', [s.qty, s.variant_id])
        }
        calistir('UPDATE inventory SET reserved_qty = max(0, reserved_qty - ?) WHERE variant_id = ?', [s.qty, s.variant_id])
    }

    calistir("UPDATE carts SET status = 'ordered' WHERE id = ?", [cartId])
    return ok({ order: tekSatir('select * from orders where id = ?', [orderId]) }, 201)
}

function siparisListe(istek, bayraklar) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    // leak_other_users_orders: liste kullanıcıya göre filtrelenmez.
    const satirlar = isBugOn(bayraklar, 'leak_other_users_orders')
        ? sorgu('select * from orders order by id desc limit 20')
        : sorgu('select * from orders where user_id = ? order by id desc limit 20', [kullanici.user_id])
    return ok({ page: 1, size: 20, total: satirlar.length, totalPages: 1, hasNext: false, items: satirlar })
}

function siparisDetay(id, istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const siparis = tekSatir('select * from orders where id = ?', [id])
    if (!siparis) return yok('Sipariş bulunamadı')
    if (siparis.user_id !== kullanici.user_id) return yasak('Bu sipariş sana ait değil')
    return ok({
        order: siparis,
        items: sorgu('select * from order_items where order_id = ?', [id]),
        payments: sorgu('select * from payments where order_id = ?', [id]),
    })
}

const ODEME_YONTEMLERI = ['card', 'transfer', 'cod']

function siparisOde(id, istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const siparis = tekSatir('select * from orders where id = ?', [id])
    if (!siparis) return yok('Sipariş bulunamadı')
    if (siparis.user_id !== kullanici.user_id) return yasak('Bu sipariş sana ait değil')

    const yontem = istek.govde.method ?? 'card'
    if (!ODEME_YONTEMLERI.includes(yontem)) {
        return islenemez('INVALID_PAYMENT_METHOD', 'method card, transfer veya cod olmalı', { field: 'method', allowed: ODEME_YONTEMLERI })
    }
    if (tekSatir("select id from payments where order_id = ? and status = 'success'", [id])) {
        return cakisma('ALREADY_PAID', 'Bu sipariş zaten ödenmiş')
    }
    if (!canTransition(siparis.status, 'paid')) {
        return cakisma('INVALID_TRANSITION', `'${siparis.status}' durumundan ödemeye geçilemez`, { from: siparis.status })
    }

    const basarisiz = istek.govde.simulateFailure === true
    const durum = basarisiz ? 'failed' : 'success'
    const odemeId = ekleVeIdAl('INSERT INTO payments (sandbox_id, order_id, method, status, amount, txn_ref, created_at) VALUES (?,?,?,?,?,?,?)',
        ['browser', id, yontem, durum, siparis.grand_total, `TXN-${crypto.randomUUID().slice(0, 8)}`, simdi()])

    if (!basarisiz) calistir("UPDATE orders SET status = 'paid' WHERE id = ?", [id])
    return ok({
        order: tekSatir('select * from orders where id = ?', [id]),
        payment: tekSatir('select * from payments where id = ?', [odemeId]),
        transitioned: !basarisiz,
    })
}

function siparisGecis(id, eylem, istek, bayraklar) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const siparis = tekSatir('select * from orders where id = ?', [id])
    if (!siparis) return yok('Sipariş bulunamadı')
    if (siparis.user_id !== kullanici.user_id) return yasak('Bu sipariş sana ait değil')

    const hedef = { cancel: 'cancelled', ship: 'shipped', deliver: 'delivered', return: 'returned' }[eylem]

    if (eylem === 'cancel' && !canCancel(siparis.status)) {
        return cakisma('INVALID_TRANSITION',
            `'${siparis.status}' durumundaki sipariş iptal edilemez`, { from: siparis.status, to: 'cancelled' })
    }
    // Şemada `delivered_at` sütunu yok; iade penceresi sipariş tarihinden
    // hesaplanır. Docker modunda da aynı sütun yoktur.
    if (eylem === 'return' && !canReturn(siparis.status, siparis.placed_at)) {
        return cakisma('INVALID_TRANSITION', 'Bu sipariş iade edilemez', { from: siparis.status })
    }
    if (!canTransition(siparis.status, hedef)) {
        return cakisma('INVALID_TRANSITION', `'${siparis.status}' → '${hedef}' geçişi tanımlı değil`, { from: siparis.status, to: hedef })
    }

    calistir('UPDATE orders SET status = ? WHERE id = ?', [hedef, id])

    // no_stock_restore_on_cancel: iptalde stok geri yüklenmez.
    if ((eylem === 'cancel' || eylem === 'return') && !isBugOn(bayraklar, 'no_stock_restore_on_cancel')) {
        for (const s of sorgu('select variant_id, qty from order_items where order_id = ?', [id])) {
            calistir('UPDATE inventory SET stock_qty = stock_qty + ? WHERE variant_id = ?', [s.qty, s.variant_id])
        }
    }
    return ok({ order: tekSatir('select * from orders where id = ?', [id]) })
}

// ─── adres ──────────────────────────────────────────────────────────────────

function adresListe(istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const satirlar = sorgu('select id, label, line1, city, country, postal_code, is_default from addresses where user_id = ? order by id', [kullanici.user_id])
    return ok({ total: satirlar.length, addresses: satirlar.map((a) => ({ ...a, is_default: !!a.is_default })) })
}

function adresEkle(istek) {
    const { hata: h, kullanici } = kullaniciGerekli(istek)
    if (h) return h
    const { line1, city } = istek.govde
    if (!line1 || String(line1).trim().length < 3) return islenemez('INVALID_FIELD', 'line1 en az 3 karakter olmalı', { field: 'line1' })
    if (!city || String(city).trim().length < 2) return islenemez('INVALID_FIELD', 'city en az 2 karakter olmalı', { field: 'city' })

    const ilk = !tekSatir('select id from addresses where user_id = ?', [kullanici.user_id])
    const id = ekleVeIdAl('INSERT INTO addresses (sandbox_id, user_id, label, line1, city, country, postal_code, is_default) VALUES (?,?,?,?,?,?,?,?)',
        ['browser', kullanici.user_id, istek.govde.label ?? 'home', String(line1).trim(), String(city).trim(),
            istek.govde.country ?? 'TR', istek.govde.postal_code ?? null, ilk ? 1 : 0])
    if (ilk) calistir('UPDATE addresses SET is_default = 0 WHERE user_id = ? AND id <> ?', [kullanici.user_id, id])
    return ok({ address: tekSatir('select * from addresses where id = ?', [id]) }, 201)
}

// ─── sandbox ────────────────────────────────────────────────────────────────

function sandboxDurum() {
    const say = (t) => tekSatir(`select count(*) as n from ${t}`)?.n ?? 0
    return ok({
        sandboxId: 'browser', mode: 'browser',
        counts: {
            products: say('products'), variants: say('product_variants'), users: say('users'),
            carts: say('carts'), cart_items: say('cart_items'), orders: say('orders'),
            order_items: say('order_items'), reviews: say('reviews'),
        },
    })
}

async function sandboxSifirla() {
    const basladi = Date.now()
    await dbSifirla()
    return ok({
        sandboxId: 'browser', resetAt: simdi(), durationMs: Date.now() - basladi,
        message: 'Tarayıcı verisi seed haline döndü. Açık oturumlar sonlandırıldı, tekrar login gerekiyor.',
    })
}

function bugListe(bayraklar) {
    // Gizli turda hangi defect'in açık olduğu CEVABA HİÇ KONULMAZ — sunucu
    // tarafındaki davranışın aynısı, aynı paylaşılan modülden.
    if (isHidden(bayraklar)) {
        return ok({
            sandboxId: 'browser', mode: 'browser', hidden: true,
            hiddenCount: hiddenCount(bayraklar),
            available: describeFlagsHidden(),
            howToUse: 'Hangilerinin açık olduğunu testlerinle bul. Cevap: POST /api/v1/sandbox/bugs/reveal',
        })
    }
    return ok({
        sandboxId: 'browser', mode: 'browser', hidden: false,
        active: activeFlags(bayraklar),
        available: describeFlags(bayraklar),
        howToUse: 'PATCH /api/v1/sandbox/bugs  { "oversell": true }',
    })
}

function bugDegistir(istek, bayraklar) {
    if (isHidden(bayraklar)) {
        return islenemez('HIDDEN_ROUND_ACTIVE', 'Gizli tur sürerken anahtarlar tek tek değiştirilemez',
            { reveal: 'POST /api/v1/sandbox/bugs/reveal', reset: 'POST /api/v1/sandbox/reset' })
    }
    const govde = istek.govde
    if (!govde || typeof govde !== 'object' || Array.isArray(govde)) {
        return islenemez('INVALID_BODY', 'Gövde bir nesne olmalı', { example: { oversell: true } })
    }
    const anahtarlar = Object.keys(govde)
    if (!anahtarlar.length) return islenemez('EMPTY_BODY', 'En az bir anahtar gönderilmeli', { available: BUG_FLAG_KEYS })
    const bilinmeyen = unknownFlagKeys(anahtarlar)
    if (bilinmeyen.length) return islenemez('UNKNOWN_BUG_FLAG', 'Tanımsız bug anahtarı', { unknown: bilinmeyen, available: BUG_FLAG_KEYS })
    const boolDegil = anahtarlar.filter((k) => typeof govde[k] !== 'boolean')
    if (boolDegil.length) return islenemez('INVALID_FLAG_VALUE', 'Anahtar değerleri true veya false olmalı', { fields: boolDegil })

    const yeni = { ...bayraklar, ...govde }
    metaYaz('bug_flags', yeni)
    return ok({ sandboxId: 'browser', active: activeFlags(yeni), flags: yeni, note: 'Defect\'ler yalnızca bu tarayıcıda geçerlidir. Sıfırlama hepsini kapatır.' })
}

function bugGizli(istek) {
    const istenen = istek.govde?.count
    if (istenen !== undefined && (!Number.isInteger(istenen) || istenen < 1 || istenen > BUG_FLAG_KEYS.length)) {
        return islenemez('INVALID_COUNT', `count 1 ile ${BUG_FLAG_KEYS.length} arasında bir tam sayı olmalı`, { got: istenen })
    }
    const secilen = pickRandomFlags(istenen ?? 3)
    const yeni = Object.fromEntries(secilen.map((k) => [k, true]))
    yeni[HIDDEN_KEY] = true
    metaYaz('bug_flags', yeni)
    return ok({
        sandboxId: 'browser', hidden: true, hiddenCount: secilen.length,
        message: `${secilen.length} defect açıldı. Hangileri olduğu söylenmiyor — testlerinle bul.`,
        note: 'Cevabı görmek için: POST /api/v1/sandbox/bugs/reveal',
    })
}

function bugAcikla(bayraklar) {
    if (!isHidden(bayraklar)) {
        return islenemez('NO_HIDDEN_ROUND', 'Açık bir gizli tur yok', { howToStart: 'POST /api/v1/sandbox/bugs/hidden { "count": 3 }' })
    }
    const acik = activeFlags(bayraklar)
    const yeni = { ...bayraklar }
    delete yeni[HIDDEN_KEY]
    metaYaz('bug_flags', yeni)
    return ok({
        sandboxId: 'browser', hidden: false, active: acik, flags: yeni,
        note: 'Defect\'ler hâlâ AÇIK — artık hangileri olduğunu biliyorsun. Kapatmak için PATCH ya da POST /sandbox/reset.',
    })
}
