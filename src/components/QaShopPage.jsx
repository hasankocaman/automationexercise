// src/components/QaShopPage.jsx — /qa-shop
//
// UI otomasyonu pratiği için dükkân arayüzü. Kendi makinende çalışan QA Shop
// API'sine (varsayılan http://localhost:4000) bağlanır.
//
// TASARIM AMACI — bu sayfa bir ürün değil, bir TEST HEDEFİdir:
//   · Her etkileşimli öğe KARARLI bir `data-testid` taşır. Locator'ın CSS
//     sınıfına veya metne bağlanması, en sık kırılan test yazma alışkanlığıdır;
//     burada bilerek sağlam bir tutamak veriliyor.
//   · Her istek "Olay günlüğü"ne düşer: kullanıcı arayüzdeki bir hareketin
//     API'de HANGİ çağrıya dönüştüğünü görür. Arayüz testi ile API testinin
//     aynı işin iki yarısı olduğu ancak böyle somutlaşır.
//   · Yığın kapalıyken sayfa boş bir hata göstermez; ne yapılacağını söyler.
//
// TopicPage KULLANILMAZ: bu bir ders sayfası değil, canlı bir uygulama.
import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

const VARSAYILAN_API = 'http://localhost:4000'

// Anahtar tarayıcıda saklanır: sayfa yenilendiğinde pratiğin baştan
// başlaması, otomasyon yazarken en can sıkıcı sürtünmelerden biri olurdu.
const DEPO_ANAHTARI = 'qaShopSandboxKey'
const DEPO_ADRES = 'qaShopApiBase'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

const M = {
    baslik: { tr: '🛒 QA Shop — Arayüz Pratiği', en: '🛒 QA Shop — UI Practice' },
    altBaslik: {
        tr: 'Kendi makinende çalışan gerçek bir API\'ye bağlı dükkân arayüzü. Selenium, Playwright veya Cypress ile otomatikleştirmek için tasarlandı.',
        en: 'A shop interface backed by a real API running on your own machine. Built to be automated with Selenium, Playwright or Cypress.',
    },
    baglanti: { tr: 'Bağlantı', en: 'Connection' },
    apiAdresi: { tr: 'API adresi', en: 'API address' },
    anahtar: { tr: 'Sandbox anahtarı', en: 'Sandbox key' },
    anahtarYok: { tr: 'Henüz anahtar yok', en: 'No key yet' },
    alanAc: { tr: 'Kendi alanımı aç', en: 'Open my own area' },
    sifirla: { tr: 'Veriyi sıfırla', en: 'Reset data' },
    baglantiKes: { tr: 'Anahtarı unut', en: 'Forget key' },
    giris: { tr: 'Giriş', en: 'Sign in' },
    eposta: { tr: 'E-posta', en: 'Email' },
    parola: { tr: 'Parola', en: 'Password' },
    girisYap: { tr: 'Giriş yap', en: 'Sign in' },
    cikisYap: { tr: 'Çıkış yap', en: 'Sign out' },
    katalog: { tr: 'Katalog', en: 'Catalog' },
    ara: { tr: 'Ürün ara', en: 'Search products' },
    sirala: { tr: 'Sırala', en: 'Sort' },
    sepet: { tr: 'Sepet', en: 'Cart' },
    sepetBos: { tr: 'Sepet boş', en: 'Cart is empty' },
    sepeteEkle: { tr: 'Sepete ekle', en: 'Add to cart' },
    kaldir: { tr: 'Kaldır', en: 'Remove' },
    kupon: { tr: 'Kupon kodu', en: 'Coupon code' },
    kuponUygula: { tr: 'Uygula', en: 'Apply' },
    siparisVer: { tr: 'Siparişi tamamla', en: 'Place order' },
    siparisler: { tr: 'Siparişlerim', en: 'My orders' },
    siparisYok: { tr: 'Henüz sipariş yok', en: 'No orders yet' },
    gunluk: { tr: 'Olay günlüğü', en: 'Event log' },
    gunlukBos: { tr: 'Henüz istek atılmadı', en: 'No requests yet' },
    temizle: { tr: 'Temizle', en: 'Clear' },
    stok: { tr: 'satılabilir', en: 'available' },
    adet: { tr: 'Adet', en: 'Qty' },
    araToplam: { tr: 'Ara toplam', en: 'Subtotal' },
    indirim: { tr: 'İndirim', en: 'Discount' },
    kargo: { tr: 'Kargo', en: 'Shipping' },
    genelToplam: { tr: 'Genel toplam', en: 'Grand total' },
    yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
    girisGerekli: {
        tr: 'Sepet ve sipariş işlemleri için önce giriş yap.',
        en: 'Sign in first to use the cart and orders.',
    },
    anahtarGerekli: {
        tr: 'Yazma işlemleri için kendi veri alanını açman gerekiyor. Anahtarsız bağlantı demo verisine SALT OKUNUR erişir.',
        en: 'You need your own data area for write operations. Without a key you get READ-ONLY access to the demo data.',
    },
    ulasilamiyor: { tr: 'API\'ye ulaşılamıyor', en: 'Cannot reach the API' },
    ulasilamiyorNe: {
        tr: 'Yığın ayakta değil ya da adres yanlış. Terminalde qa-shop klasörüne gir ve şu komutu ver:',
        en: 'The stack is not running or the address is wrong. Go to the qa-shop folder in a terminal and run:',
    },
    kurulumRehberi: { tr: 'Kurulum rehberini aç', en: 'Open the setup guide' },
    testIpucu: { tr: 'Otomasyon ipucu', en: 'Automation tip' },
    testIpucuMetin: {
        tr: 'Bu sayfadaki her etkileşimli öğe kararlı bir data-testid taşır. Locator\'ı CSS sınıfına veya görünen metne bağlamak yerine onu kullan: metin dil değiştirince, sınıf ise tasarım değişince kırılır.',
        en: 'Every interactive element here carries a stable data-testid. Bind your locator to that instead of a CSS class or visible text: text breaks when the language changes, classes break when the design does.',
    },
}

// ─── Küçük yardımcılar ──────────────────────────────────────────────────────

const para = (n) => `${Number(n ?? 0).toFixed(2)} TL`

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div className="h-full transition-[width] duration-100"
                 style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #14b8a6)' }} />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// ─── Ana bileşen ────────────────────────────────────────────────────────────

export default function QaShopPage() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [darkMode, setDarkMode] = useDarkModeState()

    const [apiBase, setApiBase] = useState(() => localStorage.getItem(DEPO_ADRES) || VARSAYILAN_API)
    const [sandboxKey, setSandboxKey] = useState(() => localStorage.getItem(DEPO_ANAHTARI) || '')
    const [token, setToken] = useState('')
    const [user, setUser] = useState(null)

    const [saglik, setSaglik] = useState('bilinmiyor')   // bilinmiyor | ok | kapali
    const [mesaj, setMesaj] = useState(null)             // { tip, metin }
    const [mesgul, setMesgul] = useState(false)

    const [urunler, setUrunler] = useState([])
    const [arama, setArama] = useState('')
    const [siralama, setSiralama] = useState('price:asc')
    const [varyantlar, setVaryantlar] = useState({})     // productId -> [variant]

    const [cart, setCart] = useState(null)
    const [kuponKodu, setKuponKodu] = useState('')
    const [siparisler, setSiparisler] = useState([])

    const [gunluk, setGunluk] = useState([])
    const gunlukSayac = useRef(0)

    const api = `${apiBase.replace(/\/+$/, '')}/api/v1`

    // ── Tek giriş noktası: her istek buradan geçer ve günlüğe düşer ──────────
    // Ayrı ayrı fetch çağrıları yazılsaydı, günlüğe düşmeyi unutmak kaçınılmaz
    // olurdu ve sayfanın öğretici yanı sessizce eksilirdi.
    const istek = useCallback(async (yol, secenekler = {}) => {
        const { method = 'GET', body, auth = false } = secenekler
        const baslangic = performance.now()
        const headers = {}
        if (body !== undefined) headers['Content-Type'] = 'application/json'
        if (sandboxKey) headers['X-Sandbox-Key'] = sandboxKey
        if (auth && token) headers.Authorization = `Bearer ${token}`

        let res, govde
        try {
            res = await fetch(`${api}${yol}`, {
                method,
                headers,
                body: body === undefined ? undefined : JSON.stringify(body),
            })
        } catch (err) {
            setSaglik('kapali')
            gunlukSayac.current += 1
            setGunluk((g) => [{
                id: gunlukSayac.current, method, yol,
                durum: '—', sure: 0, hata: err.message,
            }, ...g].slice(0, 40))
            return { ok: false, agKopuk: true }
        }

        const sure = Math.round(performance.now() - baslangic)
        try { govde = res.status === 204 ? null : await res.json() } catch { govde = null }

        gunlukSayac.current += 1
        setGunluk((g) => [{
            id: gunlukSayac.current,
            method, yol,
            durum: res.status,
            sure,
            hataKodu: govde?.error?.code ?? null,
            correlationId: res.headers.get('X-Correlation-Id'),
        }, ...g].slice(0, 40))

        setSaglik('ok')
        return { ok: res.ok, status: res.status, govde }
    }, [api, sandboxKey, token])

    const hataGoster = (sonuc, varsayilan) => {
        if (sonuc.agKopuk) return
        const kod = sonuc.govde?.error?.code
        const metin = sonuc.govde?.error?.message || varsayilan
        setMesaj({ tip: 'hata', metin: kod ? `${kod} — ${metin}` : metin })
    }

    // ── Sağlık ve katalog ────────────────────────────────────────────────────
    const saglikKontrol = useCallback(async () => {
        try {
            const res = await fetch(`${apiBase.replace(/\/+$/, '')}/health`)
            const b = await res.json()
            setSaglik(res.ok && b.database === 'up' ? 'ok' : 'kapali')
        } catch {
            setSaglik('kapali')
        }
    }, [apiBase])

    const urunleriYukle = useCallback(async () => {
        const [alan, yon] = siralama.split(':')
        const q = new URLSearchParams({ size: '12', sort: alan, order: yon })
        if (arama.trim().length >= 2) q.set('q', arama.trim())
        const sonuc = await istek(`/products?${q}`)
        if (sonuc.ok) setUrunler(sonuc.govde.items ?? [])
    }, [istek, arama, siralama])

    useEffect(() => { saglikKontrol() }, [saglikKontrol])
    useEffect(() => { urunleriYukle() }, [urunleriYukle])

    // ── Sandbox ──────────────────────────────────────────────────────────────
    const alanAc = async () => {
        setMesgul(true)
        const res = await fetch(`${api}/sandbox`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label: 'ui-pratigi' }),
        }).catch(() => null)
        setMesgul(false)

        if (!res) { setSaglik('kapali'); return }
        const b = await res.json()
        setSandboxKey(b.apiKey)
        localStorage.setItem(DEPO_ANAHTARI, b.apiKey)
        setMesaj({
            tip: 'basari',
            metin: isTr
                ? `Kendi alanın açıldı. Demo hesap: ${b.demoUser.email} / ${b.demoUser.password}`
                : `Your area is ready. Demo account: ${b.demoUser.email} / ${b.demoUser.password}`,
        })
    }

    const veriSifirla = async () => {
        const sonuc = await istek('/sandbox/reset', { method: 'POST' })
        if (sonuc.ok) {
            setCart(null); setSiparisler([]); setToken(''); setUser(null)
            setMesaj({ tip: 'basari', metin: isTr
                ? 'Veri tohum haline döndü. Açık oturumlar kapandı, tekrar giriş gerekiyor.'
                : 'Data is back to the seed state. Sessions were revoked, sign in again.' })
            urunleriYukle()
        } else hataGoster(sonuc, 'reset')
    }

    const anahtariUnut = () => {
        setSandboxKey(''); setToken(''); setUser(null); setCart(null); setSiparisler([])
        localStorage.removeItem(DEPO_ANAHTARI)
    }

    // ── Kimlik ───────────────────────────────────────────────────────────────
    const [epostaGirdi, setEpostaGirdi] = useState('demo@qashop.test')
    const [parolaGirdi, setParolaGirdi] = useState('Password123!')

    const girisYap = async (e) => {
        e.preventDefault()
        setMesgul(true)
        const sonuc = await istek('/auth/login', {
            method: 'POST', body: { email: epostaGirdi, password: parolaGirdi },
        })
        setMesgul(false)
        if (sonuc.ok) {
            setToken(sonuc.govde.token)
            setUser({ email: epostaGirdi })
            setMesaj({ tip: 'basari', metin: isTr ? 'Giriş yapıldı.' : 'Signed in.' })
        } else hataGoster(sonuc, isTr ? 'Giriş başarısız' : 'Sign-in failed')
    }

    const cikisYap = async () => {
        await istek('/auth/logout', { method: 'POST', auth: true })
        setToken(''); setUser(null); setCart(null); setSiparisler([])
    }

    // ── Sepet ────────────────────────────────────────────────────────────────
    const varyantAcKapat = async (urunId) => {
        if (varyantlar[urunId]) {
            setVaryantlar((v) => ({ ...v, [urunId]: undefined }))
            return
        }
        const sonuc = await istek(`/products/${urunId}/variants`)
        if (sonuc.ok) setVaryantlar((v) => ({ ...v, [urunId]: sonuc.govde.variants ?? [] }))
    }

    const sepetGetirVeyaAc = async () => {
        if (cart?.cart?.id) return cart.cart.id
        const sonuc = await istek('/carts', { method: 'POST', auth: true })
        if (!sonuc.ok) { hataGoster(sonuc, 'cart'); return null }
        setCart(sonuc.govde)
        return sonuc.govde.cart.id
    }

    const sepeteEkle = async (variantId, qty = 1) => {
        setMesgul(true)
        const cartId = await sepetGetirVeyaAc()
        if (!cartId) { setMesgul(false); return }
        const sonuc = await istek(`/carts/${cartId}/items`, {
            method: 'POST', auth: true, body: { variantId, qty },
        })
        setMesgul(false)
        if (sonuc.ok) {
            setCart(sonuc.govde)
            setMesaj({ tip: 'basari', metin: isTr
                ? 'Sepete eklendi. Bu hareket stoğu REZERVE etti — henüz düşürmedi.'
                : 'Added to cart. This action RESERVED stock — it has not decremented it yet.' })
            // Stok değişti: açık varyant listesini tazele ki kullanıcı yan
            // etkiyi ekranda görsün.
            for (const pid of Object.keys(varyantlar)) {
                if (varyantlar[pid]) {
                    const v = await istek(`/products/${pid}/variants`)
                    if (v.ok) setVaryantlar((prev) => ({ ...prev, [pid]: v.govde.variants }))
                }
            }
        } else hataGoster(sonuc, isTr ? 'Sepete eklenemedi' : 'Could not add to cart')
    }

    const satirSil = async (itemId) => {
        const cartId = cart?.cart?.id
        if (!cartId) return
        const sonuc = await istek(`/carts/${cartId}/items/${itemId}`, { method: 'DELETE', auth: true })
        if (sonuc.ok || sonuc.status === 204) {
            const yeni = await istek(`/carts/${cartId}`, { auth: true })
            if (yeni.ok) setCart(yeni.govde)
        } else hataGoster(sonuc, 'delete')
    }

    const kuponUygula = async (e) => {
        e.preventDefault()
        const cartId = cart?.cart?.id
        if (!cartId) return
        const sonuc = await istek(`/carts/${cartId}/coupon`, {
            method: 'POST', auth: true, body: { code: kuponKodu },
        })
        if (sonuc.ok) {
            setCart(sonuc.govde)
            setMesaj({ tip: 'basari', metin: isTr ? 'Kupon uygulandı.' : 'Coupon applied.' })
        } else hataGoster(sonuc, isTr ? 'Kupon reddedildi' : 'Coupon rejected')
    }

    // ── Sipariş ──────────────────────────────────────────────────────────────
    const siparisleriYukle = useCallback(async () => {
        if (!token) return
        const sonuc = await istek('/orders?size=10', { auth: true })
        if (sonuc.ok) setSiparisler(sonuc.govde.items ?? [])
    }, [istek, token])

    useEffect(() => { siparisleriYukle() }, [siparisleriYukle])

    const siparisTamamla = async () => {
        const cartId = cart?.cart?.id
        if (!cartId) return
        setMesgul(true)
        const sonuc = await istek('/orders', { method: 'POST', auth: true, body: { cartId } })
        setMesgul(false)
        if (sonuc.ok) {
            setCart(null)
            setMesaj({ tip: 'basari', metin: isTr
                ? `Sipariş oluşturuldu: ${sonuc.govde.order.order_no}. Stok DÜŞTÜ, rezervasyon serbest kaldı.`
                : `Order created: ${sonuc.govde.order.order_no}. Stock DROPPED, the reservation was released.` })
            siparisleriYukle()
        } else hataGoster(sonuc, isTr ? 'Sipariş oluşturulamadı' : 'Could not create the order')
    }

    const siparisEylem = async (orderId, eylem) => {
        const sonuc = await istek(`/orders/${orderId}/${eylem}`, {
            method: 'POST', auth: true,
            body: eylem === 'pay' ? { method: 'card' } : undefined,
        })
        if (sonuc.ok) {
            setMesaj({ tip: 'basari', metin: `${eylem} → ${sonuc.govde.order?.status ?? 'ok'}` })
            siparisleriYukle()
        } else hataGoster(sonuc, eylem)
    }

    // ── Görsel kabuk ─────────────────────────────────────────────────────────
    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    const input = `min-h-[36px] w-full rounded-lg border px-3 py-2 text-base md:text-sm ${
        darkMode ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`
    const btn = 'min-h-[36px] rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50'
    const btnBirincil = `${btn} bg-indigo-600 text-white hover:bg-indigo-500`
    const btnIkincil = `${btn} ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`

    const Bolum = ({ id, baslik, children, ek }) => (
        <section id={id} data-testid={`bolum-${id}`} className={`mb-5 rounded-2xl border p-4 md:p-5 ${card}`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{baslik}</h2>
                {ek}
            </div>
            {children}
        </section>
    )

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-5xl px-3 py-6 md:px-6 md:py-10">
                <header className="mb-5">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(M.baslik, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(M.altBaslik, isTr)}
                    </p>
                </header>

                {/* Otomasyon ipucu — sayfanın test hedefi olduğunu baştan söyler */}
                <div className={`mb-5 rounded-xl border p-3 text-sm leading-relaxed ${
                    darkMode ? 'border-sky-500/50 bg-sky-500/10 text-slate-300' : 'border-sky-300 bg-sky-50 text-slate-700'}`}>
                    <strong className={darkMode ? 'text-sky-300' : 'text-sky-800'}>💡 {tx(M.testIpucu, isTr)}: </strong>
                    {tx(M.testIpucuMetin, isTr)}
                </div>

                {/* API kapalıysa: boş hata yerine ne yapılacağı */}
                {saglik === 'kapali' && (
                    <div data-testid="api-kapali" className="mb-5 rounded-xl border border-amber-500/60 bg-amber-500/10 p-4">
                        <p className="mb-1 text-sm font-bold text-amber-300">⚠️ {tx(M.ulasilamiyor, isTr)}</p>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {tx(M.ulasilamiyorNe, isTr)}
                        </p>
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-[13px] text-slate-200">
                            <code>cd qa-shop{'\n'}docker compose up -d</code>
                        </pre>
                        <Link to="/qa-shop-setup" className="mt-2 inline-block text-sm font-semibold text-indigo-400 hover:underline">
                            {tx(M.kurulumRehberi, isTr)} →
                        </Link>
                    </div>
                )}

                {mesaj && (
                    <div
                        data-testid="bildirim"
                        className={`mb-5 rounded-xl border p-3 text-sm ${
                            mesaj.tip === 'hata'
                                ? 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                                : 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'}`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <span data-testid="bildirim-metin">{mesaj.metin}</span>
                            <button type="button" data-testid="bildirim-kapat" onClick={() => setMesaj(null)}
                                    className="shrink-0 text-xs opacity-70 hover:opacity-100">✕</button>
                        </div>
                    </div>
                )}

                {/* ─── Bağlantı ─────────────────────────────────────────────── */}
                <Bolum
                    id="baglanti"
                    baslik={`🔌 ${tx(M.baglanti, isTr)}`}
                    ek={
                        <span data-testid="saglik-durumu"
                              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                  saglik === 'ok' ? 'bg-emerald-500/20 text-emerald-300'
                                      : saglik === 'kapali' ? 'bg-rose-500/20 text-rose-300'
                                          : 'bg-slate-500/20 text-slate-300'}`}>
                            {saglik === 'ok' ? 'API: up' : saglik === 'kapali' ? 'API: down' : 'API: ?'}
                        </span>
                    }
                >
                    <div className="grid gap-3 md:grid-cols-2">
                        <label className="block">
                            <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.apiAdresi, isTr)}</span>
                            <input
                                data-testid="api-adresi"
                                className={input}
                                value={apiBase}
                                onChange={(e) => { setApiBase(e.target.value); localStorage.setItem(DEPO_ADRES, e.target.value) }}
                            />
                        </label>
                        <label className="block">
                            <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.anahtar, isTr)}</span>
                            <input
                                data-testid="sandbox-anahtari"
                                className={`${input} font-mono text-xs`}
                                placeholder={tx(M.anahtarYok, isTr)}
                                value={sandboxKey}
                                onChange={(e) => { setSandboxKey(e.target.value); localStorage.setItem(DEPO_ANAHTARI, e.target.value) }}
                            />
                        </label>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" data-testid="alan-ac" className={btnBirincil} onClick={alanAc} disabled={mesgul}>
                            {tx(M.alanAc, isTr)}
                        </button>
                        <button type="button" data-testid="veri-sifirla" className={btnIkincil} onClick={veriSifirla} disabled={!sandboxKey}>
                            {tx(M.sifirla, isTr)}
                        </button>
                        <button type="button" data-testid="anahtari-unut" className={btnIkincil} onClick={anahtariUnut} disabled={!sandboxKey}>
                            {tx(M.baglantiKes, isTr)}
                        </button>
                    </div>

                    {!sandboxKey && (
                        <p data-testid="anahtar-uyarisi" className="mt-3 text-sm opacity-80">ℹ️ {tx(M.anahtarGerekli, isTr)}</p>
                    )}
                </Bolum>

                {/* ─── Giriş ────────────────────────────────────────────────── */}
                <Bolum id="giris" baslik={`👤 ${tx(M.giris, isTr)}`}>
                    {user ? (
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span data-testid="oturum-eposta" className="text-sm">✅ {user.email}</span>
                            <button type="button" data-testid="cikis-yap" className={btnIkincil} onClick={cikisYap}>
                                {tx(M.cikisYap, isTr)}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={girisYap} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
                            <label className="block">
                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.eposta, isTr)}</span>
                                <input data-testid="giris-eposta" type="email" className={input}
                                       value={epostaGirdi} onChange={(e) => setEpostaGirdi(e.target.value)} />
                            </label>
                            <label className="block">
                                <span className="mb-1 block text-xs font-semibold opacity-70">{tx(M.parola, isTr)}</span>
                                <input data-testid="giris-parola" type="password" className={input}
                                       value={parolaGirdi} onChange={(e) => setParolaGirdi(e.target.value)} />
                            </label>
                            <button type="submit" data-testid="giris-yap" className={btnBirincil} disabled={mesgul}>
                                {tx(M.girisYap, isTr)}
                            </button>
                        </form>
                    )}
                </Bolum>

                {/* ─── Katalog ──────────────────────────────────────────────── */}
                <Bolum id="katalog" baslik={`📦 ${tx(M.katalog, isTr)}`}>
                    <div className="mb-3 grid gap-2 md:grid-cols-[1fr_auto]">
                        <input data-testid="urun-ara" className={input} placeholder={tx(M.ara, isTr)}
                               value={arama} onChange={(e) => setArama(e.target.value)} />
                        <select data-testid="urun-sirala" className={input}
                                value={siralama} onChange={(e) => setSiralama(e.target.value)}>
                            <option value="price:asc">{tx(M.sirala, isTr)}: ↑</option>
                            <option value="price:desc">{tx(M.sirala, isTr)}: ↓</option>
                            <option value="name:asc">A → Z</option>
                        </select>
                    </div>

                    <ul data-testid="urun-listesi" className="grid gap-2 md:grid-cols-2">
                        {urunler.map((u) => (
                            <li key={u.id} data-testid={`urun-${u.id}`}
                                className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p data-testid={`urun-ad-${u.id}`} className="text-sm font-bold">{u.name}</p>
                                        <p className="text-xs opacity-70">{u.sku}</p>
                                    </div>
                                    <span data-testid={`urun-fiyat-${u.id}`} className="shrink-0 text-sm font-semibold">
                                        {para(u.price)}
                                    </span>
                                </div>
                                <button type="button" data-testid={`varyant-ac-${u.id}`}
                                        className={`${btnIkincil} mt-2`} onClick={() => varyantAcKapat(u.id)}>
                                    {varyantlar[u.id] ? '▲' : '▼'} {isTr ? 'Varyantlar' : 'Variants'}
                                </button>

                                {varyantlar[u.id] && (
                                    <ul data-testid={`varyant-listesi-${u.id}`} className="mt-2 space-y-1">
                                        {varyantlar[u.id].map((v) => (
                                            <li key={v.id} data-testid={`varyant-${v.id}`}
                                                className="flex items-center justify-between gap-2 text-xs">
                                                <span>
                                                    {[v.size, v.color].filter(Boolean).join(' / ') || v.sku}
                                                    {' · '}
                                                    <b data-testid={`varyant-stok-${v.id}`}>{v.available}</b> {tx(M.stok, isTr)}
                                                </span>
                                                <button type="button" data-testid={`sepete-ekle-${v.id}`}
                                                        className={btnBirincil}
                                                        disabled={!token || Number(v.available) < 1 || mesgul}
                                                        onClick={() => sepeteEkle(v.id, 1)}>
                                                    {tx(M.sepeteEkle, isTr)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    {!urunler.length && <p className="text-sm opacity-70">{tx(M.yukleniyor, isTr)}</p>}
                    {!token && <p className="mt-3 text-sm opacity-80">ℹ️ {tx(M.girisGerekli, isTr)}</p>}
                </Bolum>

                {/* ─── Sepet ────────────────────────────────────────────────── */}
                <Bolum id="sepet" baslik={`🛒 ${tx(M.sepet, isTr)}`}>
                    {!cart?.items?.length ? (
                        <p data-testid="sepet-bos" className="text-sm opacity-70">{tx(M.sepetBos, isTr)}</p>
                    ) : (
                        <>
                            <ul data-testid="sepet-satirlari" className="mb-3 space-y-2">
                                {cart.items.map((it) => (
                                    <li key={it.id} data-testid={`sepet-satir-${it.id}`}
                                        className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border p-2 text-sm ${
                                            darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                                        <span>{it.product_name ?? it.name_snapshot ?? `#${it.variant_id}`}</span>
                                        <span className="opacity-70">{tx(M.adet, isTr)}: {it.qty}</span>
                                        <span className="font-semibold">{para(it.line_total)}</span>
                                        <button type="button" data-testid={`sepet-sil-${it.id}`}
                                                className={btnIkincil} onClick={() => satirSil(it.id)}>
                                            {tx(M.kaldir, isTr)}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <form onSubmit={kuponUygula} className="mb-3 flex flex-wrap gap-2">
                                <input data-testid="kupon-kodu" className={`${input} md:max-w-[220px]`}
                                       placeholder={tx(M.kupon, isTr)} value={kuponKodu}
                                       onChange={(e) => setKuponKodu(e.target.value)} />
                                <button type="submit" data-testid="kupon-uygula" className={btnIkincil}>
                                    {tx(M.kuponUygula, isTr)}
                                </button>
                            </form>

                            <dl className="mb-3 space-y-1 text-sm">
                                <div className="flex justify-between"><dt>{tx(M.araToplam, isTr)}</dt>
                                    <dd data-testid="toplam-ara">{para(cart.totals?.subtotal)}</dd></div>
                                <div className="flex justify-between"><dt>{tx(M.indirim, isTr)}</dt>
                                    <dd data-testid="toplam-indirim">−{para(cart.totals?.discount_total)}</dd></div>
                                <div className="flex justify-between"><dt>{tx(M.kargo, isTr)}</dt>
                                    <dd data-testid="toplam-kargo">{para(cart.totals?.shipping_total)}</dd></div>
                                <div className="flex justify-between border-t pt-1 font-bold">
                                    <dt>{tx(M.genelToplam, isTr)}</dt>
                                    <dd data-testid="toplam-genel">{para(cart.totals?.grand_total)}</dd></div>
                            </dl>

                            <button type="button" data-testid="siparis-tamamla" className={btnBirincil}
                                    onClick={siparisTamamla} disabled={mesgul}>
                                {tx(M.siparisVer, isTr)}
                            </button>
                        </>
                    )}
                </Bolum>

                {/* ─── Siparişler ───────────────────────────────────────────── */}
                <Bolum id="siparisler" baslik={`📑 ${tx(M.siparisler, isTr)}`}>
                    {!siparisler.length ? (
                        <p data-testid="siparis-yok" className="text-sm opacity-70">{tx(M.siparisYok, isTr)}</p>
                    ) : (
                        <ul data-testid="siparis-listesi" className="space-y-2">
                            {siparisler.map((o) => (
                                <li key={o.id} data-testid={`siparis-${o.id}`}
                                    className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-sm font-bold">{o.order_no}</span>
                                        <span data-testid={`siparis-durum-${o.id}`}
                                              className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                                            {o.status}
                                        </span>
                                        <span className="text-sm">{para(o.grand_total)}</span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {['pay', 'ship', 'deliver', 'return', 'cancel'].map((eylem) => (
                                            <button key={eylem} type="button"
                                                    data-testid={`siparis-${eylem}-${o.id}`}
                                                    className={btnIkincil}
                                                    onClick={() => siparisEylem(o.id, eylem)}>
                                                {eylem}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Bolum>

                {/* ─── Olay günlüğü ─────────────────────────────────────────── */}
                {/* Arayüzdeki hareketin API'de hangi çağrıya dönüştüğünü gösterir.
                    Sayfanın öğretici çekirdeği burası. */}
                <Bolum
                    id="gunluk"
                    baslik={`📜 ${tx(M.gunluk, isTr)}`}
                    ek={<button type="button" data-testid="gunluk-temizle" className={btnIkincil}
                                onClick={() => setGunluk([])}>{tx(M.temizle, isTr)}</button>}
                >
                    {!gunluk.length ? (
                        <p className="text-sm opacity-70">{tx(M.gunlukBos, isTr)}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table data-testid="gunluk-tablosu" className="w-full min-w-[520px] text-left text-xs">
                                <thead className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                                    <tr>
                                        <th className="py-1 pr-2">#</th>
                                        <th className="py-1 pr-2">Method</th>
                                        <th className="py-1 pr-2">Path</th>
                                        <th className="py-1 pr-2">Status</th>
                                        <th className="py-1 pr-2">ms</th>
                                        <th className="py-1">Code</th>
                                    </tr>
                                </thead>
                                <tbody className="font-mono">
                                    {gunluk.map((g) => (
                                        <tr key={g.id} data-testid={`gunluk-satir-${g.id}`}
                                            className={darkMode ? 'border-t border-slate-800' : 'border-t border-slate-200'}>
                                            <td className="py-1 pr-2 opacity-60">{g.id}</td>
                                            <td className="py-1 pr-2">{g.method}</td>
                                            <td className="py-1 pr-2">{g.yol}</td>
                                            <td className={`py-1 pr-2 font-bold ${
                                                g.durum === '—' ? 'text-slate-400'
                                                    : g.durum < 300 ? 'text-emerald-400'
                                                        : g.durum < 500 ? 'text-amber-400' : 'text-rose-400'}`}>
                                                {g.durum}
                                            </td>
                                            <td className="py-1 pr-2 opacity-70">{g.sure}</td>
                                            <td className="py-1 opacity-70">{g.hataKodu ?? g.hata ?? ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Bolum>
            </main>

            <Link
                to="/"
                aria-label={isTr ? 'Ana sayfa' : 'Home'}
                className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition hover:bg-indigo-500"
            >
                🏠
            </Link>
        </div>
    )
}
