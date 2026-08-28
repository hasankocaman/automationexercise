// QA Shop — Manuel test turu paneli
//
// ── NE YAPAR ────────────────────────────────────────────────────────────────
// Kullanıcıya "hangi adımı tıklayacağını" söyler ve gördüğü status kodunu
// KAYDETMESİNİ ister. Beklenen kodu peşinen SÖYLEMEZ: doğrulama ancak bulgu
// kaydedildikten sonra açılır. Amaç manuel testi somutlaştırmak — arayüzdeki
// bir hareket API'de hangi çağrıya dönüşüyor — ama cevabı okutarak değil,
// buldurarak.
//
// ── PANEL SAHTE AĞ GÜNLÜĞÜ GÖSTERMEZ ───────────────────────────────────────
// Bilerek. Panelin kendi kaydını göstermesi, kullanıcıyı DevTools'u hiç
// açmadan "gördüm" sanmaya iter — oysa öğrenilecek beceri tam olarak
// DevTools'u okumaktır. Doğruluk kaynağı tarayıcının kendi Network
// sekmesidir; panel ile çelişirse DevTools doğrudur.
//
// İlerleme yalnızca bu tarayıcıda tutulur (localStorage). Sunucuya, ilerleme
// sistemine veya hesaba hiçbir şey yazılmaz — pratik alanı izole kalmalı.
import { useState, useEffect } from 'react'

const DEPO = 'qaShopManuelTur'

const tx = (v, isTr) => (typeof v === 'string' ? v : (isTr ? v.tr : v.en))

// Yollar SÖZLEŞMEDEN alınmıştır, tahminden değil. Ödeme endpoint'i `POST /payments`
// DEĞİL `POST /orders/{id}/pay` — panel ile DevTools çelişirse panel yanlış
// olur ve kullanıcı doğru olanı yanlış sanır.
export const MANUEL_ADIMLAR = [
    {
        id: 'kayit-gecerli',
        adim: { tr: 'Hesabım → Kayıt ol: geçerli e-posta ve en az 8 karakterlik, harf+rakam içeren bir parola gir.', en: 'Account → Register: enter a valid email and a password of at least 8 characters containing a letter and a digit.' },
        method: 'POST', path: '/api/v1/auth/register', status: 201,
        neden: { tr: 'Yeni kaynak yaratıldı; 200 değil 201 beklenir.', en: 'A new resource was created; expect 201, not 200.' },
    },
    {
        id: 'kayit-zayif',
        adim: { tr: 'Aynı formu "123" parolasıyla dene.', en: 'Try the same form with the password "123".' },
        method: 'POST', path: '/api/v1/auth/register', status: 422,
        neden: { tr: 'Gövde okunabildi ama iş kuralı reddetti — 400 değil 422.', en: 'The body parsed but a business rule rejected it — 422, not 400.' },
    },
    {
        id: 'giris-yanlis',
        adim: { tr: 'Giriş yap: doğru e-posta, yanlış parola.', en: 'Sign in: correct email, wrong password.' },
        method: 'POST', path: '/api/v1/auth/login', status: 401,
        neden: { tr: 'Kimlik doğrulanamadı. Cevap "kullanıcı yok" ile "parola yanlış"ı ayırmaz — ayırsaydı hesap sayımına izin verirdi.', en: 'Authentication failed. The response does not distinguish "no such user" from "wrong password" — doing so would enable user enumeration.' },
    },
    {
        id: 'giris-dogru',
        adim: { tr: 'Giriş yap: demo@qashop.test / Password123!', en: 'Sign in: demo@qashop.test / Password123!' },
        method: 'POST', path: '/api/v1/auth/login', status: 200,
        neden: { tr: 'Cevap gövdesinde token alanı gelir; sonraki isteklerde Authorization başlığında gider.', en: 'The response body carries a token; later requests send it in the Authorization header.' },
    },
    {
        id: 'sepete-ekle',
        adim: { tr: 'Bir ürüne gir, beden seç, Sepete Ekle.', en: 'Open a product, pick a size, Add to Cart.' },
        method: 'POST', path: '/api/v1/carts/{id}/items', status: 201,
        neden: { tr: 'Sepet satırı yaratıldı. Bu hareket stoğu REZERVE eder, düşürmez.', en: 'A cart line was created. This RESERVES stock; it does not decrement it.' },
    },
    {
        id: 'stok-asimi',
        adim: { tr: 'Sepette adedi stoğun üstüne çıkarmayı dene (+ düğmesine basmayı sürdür).', en: 'In the cart, try to raise the quantity above the stock (keep pressing +).' },
        method: 'PATCH', path: '/api/v1/carts/{id}/items/{itemId}', status: 409,
        neden: { tr: 'Çakışma: istek geçerli ama sistemin o anki durumu izin vermiyor.', en: 'Conflict: the request is valid but the current state does not allow it.' },
    },
    {
        id: 'kupon-gecersiz',
        adim: { tr: 'Sepette indirim kodu alanına "YOKBOYLEKOD" yaz ve Uygula.', en: 'In the cart, type "NOSUCHCODE" into the coupon field and Apply.' },
        method: 'POST', path: '/api/v1/carts/{id}/coupon', status: 422,
        neden: { tr: 'Kod okundu ama kural geçmedi. Gerçek kodlar şartname sayfasında.', en: 'The code parsed but failed the rule. The real codes are on the spec page.' },
    },
    {
        id: 'bos-sepet-siparis',
        adim: { tr: 'Sepeti tamamen boşalt, sonra Ödeme ekranından siparişi onaylamayı dene.', en: 'Empty the cart completely, then try to place the order from checkout.' },
        method: 'POST', path: '/api/v1/orders', status: 422,
        neden: { tr: 'Boş sepetten sipariş çıkmaz; bu bir iş kuralı ihlalidir.', en: 'An empty cart cannot become an order; this is a business rule violation.' },
    },
    {
        id: 'odeme',
        adim: { tr: 'Sepete ürün ekle, Ödemeye geç, kart seç ve Siparişi onayla.', en: 'Add an item, go to checkout, pick card and place the order.' },
        method: 'POST', path: '/api/v1/orders/{id}/pay', status: 200,
        neden: { tr: 'Dikkat: sipariş oluşturma ve ödeme AYRI iki istektir. Network\'te iki satır görürsün — önce POST /orders (201), sonra bu.', en: 'Note: creating the order and paying are TWO separate requests. You will see two lines — first POST /orders (201), then this one.' },
    },
    {
        id: 'baskasinin-siparisi',
        adim: { tr: 'Siparişlerim listesinden bir id not al, çıkış yap, başka bir hesapla gir ve adres çubuğundan o siparişi çağır (ya da konsoldan fetch et).', en: 'Note an order id from My Orders, sign out, sign in with another account and request that order (or fetch it from the console).' },
        method: 'GET', path: '/api/v1/orders/{id}', status: 403,
        neden: { tr: 'Kimlik doğru ama YETKİ yok. 401 ile farkı: 401 "kimsin?", 403 "kimsin biliyorum, izin yok".', en: 'Authenticated but not authorized. The difference from 401: 401 asks "who are you?", 403 says "I know who you are, and no".' },
    },
    {
        id: 'kargolanmis-iptal',
        adim: { tr: 'Siparişlerim → bir siparişte önce ship, sonra cancel düğmesine bas.', en: 'My Orders → on one order press ship, then press cancel.' },
        method: 'POST', path: '/api/v1/orders/{id}/cancel', status: 409,
        neden: { tr: 'Kargolanmış sipariş iptal edilmez, iade edilir. Durum makinesi bu geçişe kapalı.', en: 'A shipped order is returned, not cancelled. The state machine has no such transition.' },
    },
    {
        id: 'tokensiz-me',
        adim: { tr: 'Çıkış yap, sonra konsoldan: fetch("/api/v1/auth/me").then(r => console.log(r.status))', en: 'Sign out, then from the console: fetch("/api/v1/auth/me").then(r => console.log(r.status))' },
        method: 'GET', path: '/api/v1/auth/me', status: 401,
        neden: { tr: 'Token yok. Korumalı her endpoint aynı şekilde davranmalı — biri 200 dönüyorsa açık var demektir.', en: 'No token. Every protected endpoint must behave the same way — if one returns 200, there is a hole.' },
    },
]

const M = {
    baslik: { tr: 'Manuel test turu', en: 'Manual test tour' },
    ac: { tr: 'Manuel test turu', en: 'Manual test tour' },
    kapat: { tr: 'Kapat', en: 'Close' },
    giris1: { tr: '1. DevTools\'u aç (F12) → Network sekmesi.', en: '1. Open DevTools (F12) → Network tab.' },
    giris2: { tr: '2. Fetch/XHR filtresine bas.', en: '2. Click the Fetch/XHR filter.' },
    giris3: { tr: '3. Adımı yap, gelen satırı oku ve gördüğün status kodunu buraya yaz.', en: '3. Perform the step, read the new row, and type the status code you saw here.' },
    dogrulukKaynagi: {
        tr: 'Bu panel sana ne bekleyeceğini SÖYLEMEZ. Önce sen yaparsın, gördüğünü yazarsın; sistem ancak ondan sonra doğrular. Doğruluk kaynağı DevTools\'tur — panel ile Network çelişirse Network doğrudur.',
        en: 'This panel does NOT tell you what to expect. You perform the step, you record what you saw, and only then does the system confirm it. DevTools is the source of truth — if the panel and Network disagree, Network wins.',
    },
    girdiEtiket: { tr: 'Gördüğün status kodu', en: 'The status code you saw' },
    kaydet: { tr: 'Kaydet', en: 'Record' },
    tekrar: { tr: 'Tekrar dene', en: 'Try again' },
    senYazdin: { tr: 'Yazdığın', en: 'You recorded' },
    gercek: { tr: 'Gerçek', en: 'Actual' },
    tutuyor: { tr: 'Tuttu — beklentin doğruydu.', en: 'Match — your expectation was right.' },
    tutmuyor: {
        tr: 'Tutmadı. Bu, turun en değerli anı: ya adımı farklı yaptın ya da sistem sandığından başka davranıyor. Network kaydına dön ve hangisi olduğunu ayır.',
        en: 'No match. This is the most valuable moment in the tour: either you performed the step differently, or the system behaves differently than you assumed. Go back to the network log and work out which.',
    },
    neden: { tr: 'Neden böyle', en: 'Why it is this way' },
    ilerleme: { tr: 'kapatıldı', en: 'closed' },
    sifirla: { tr: 'Bulguları sıfırla', en: 'Clear findings' },
    yerelNot: {
        tr: 'Lokal API modundasın: istekler localhost:4000 adresine gider, Network\'te de o adresle görünür.',
        en: 'You are in local API mode: requests go to localhost:4000 and appear with that host in Network.',
    },
}

// ─── Panel ──────────────────────────────────────────────────────────────────
//
// AKIŞ BİLEREK TERSİNE: bulgu → kayıt → doğrulama.
//
// Panel eskiden her adımın yanında method, path ve BEKLENEN STATUS KODUNU
// gösteriyordu. Bu, turu bir okuma alıştırmasına çeviriyordu: cevabı okuyan
// kişi hipotez kurmuyor, doğrulama yapmıyor, yalnızca eşleştiriyor. Oysa
// sınır değer analizini YAPMA fırsatı tam olarak o anda kayboluyor.
//
// Şimdi sıra şu: adımı yap → gördüğün kodu yaz → sistem tuttu mu söyler.
// Tutmayan cevap cezalandırılmaz; turun en öğretici anı odur ve ekran
// kullanıcıyı "hangisi yanlış: benim adımım mı, sistemin davranışı mı?"
// sorusuna yönlendirir.
//
// İlerleme "kaç adım gezildi" değil "kaç bulgu kapatıldı" sayar.
export default function QaShopManuelTur({ isTr, darkMode, mod }) {
    const [acik, setAcik] = useState(false)
    // { [adimId]: '409' } — kullanıcının kaydettiği bulgu.
    const [bulgular, setBulgular] = useState(() => {
        try {
            const ham = JSON.parse(localStorage.getItem(DEPO) || '{}')
            // Eski sürüm bir dizi tutuyordu ("yapıldı" işaretleri). O kayıt
            // artık anlamsız — bulgu içermiyor — ve sessizce atılıyor.
            return Array.isArray(ham) ? {} : ham
        } catch { return {} }
    })
    const [taslak, setTaslak] = useState({})

    useEffect(() => { localStorage.setItem(DEPO, JSON.stringify(bulgular)) }, [bulgular])

    const kaydet = (id) => {
        const deger = (taslak[id] ?? '').trim()
        if (!/^\d{3}$/.test(deger)) return
        setBulgular((b) => ({ ...b, [id]: deger }))
    }
    const geriAl = (id) => setBulgular((b) => {
        const y = { ...b }
        delete y[id]
        return y
    })

    const kapatilan = Object.keys(bulgular).length
    const kart = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    const rozet = (s) => (s < 300 ? 'bg-emerald-500/20 text-emerald-300'
        : s < 500 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300')
    const girdi = `min-h-[36px] w-24 rounded-lg border px-2 py-1 text-base md:text-sm ${
        darkMode ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`

    return (
        <>
            <button
                type="button"
                data-testid="manuel-tur-ac"
                onClick={() => setAcik(true)}
                className="fixed bottom-3 left-4 z-[60] min-h-[36px] rounded-full bg-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 lg:px-4"
            >
                🧪 <span className="hidden lg:inline">{tx(M.ac, isTr)}</span>
                <span data-testid="manuel-tur-sayac" className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs lg:ml-2">
                    {kapatilan}/{MANUEL_ADIMLAR.length}
                </span>
            </button>

            {acik && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50"
                     onClick={(e) => { if (e.target === e.currentTarget) setAcik(false) }}>
                    <aside data-testid="manuel-tur-panel"
                           className={`h-full w-full max-w-md overflow-y-auto border-l p-4 ${kart}`}>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-bold">🧪 {tx(M.baslik, isTr)}</h2>
                            <button type="button" data-testid="manuel-tur-kapat" onClick={() => setAcik(false)}
                                    className="rounded-lg px-2 py-1 text-sm opacity-70 hover:opacity-100">✕</button>
                        </div>

                        <div className="mb-3 rounded-xl border border-indigo-500/40 bg-indigo-500/10 p-3 text-xs leading-relaxed">
                            <p>{tx(M.giris1, isTr)}</p>
                            <p>{tx(M.giris2, isTr)}</p>
                            <p>{tx(M.giris3, isTr)}</p>
                        </div>

                        <p data-testid="manuel-tur-dogruluk" className="mb-3 text-xs leading-relaxed opacity-75">
                            ⚠️ {tx(M.dogrulukKaynagi, isTr)}
                        </p>

                        {mod === 'yerel' && (
                            <p data-testid="manuel-tur-yerel-not" className="mb-3 text-xs leading-relaxed opacity-75">
                                ℹ️ {tx(M.yerelNot, isTr)}
                            </p>
                        )}

                        <ol data-testid="manuel-adim-listesi" className="space-y-2">
                            {MANUEL_ADIMLAR.map((a, i) => {
                                const bulgu = bulgular[a.id]
                                const kapali = bulgu !== undefined
                                const tuttu = kapali && Number(bulgu) === a.status
                                return (
                                    <li key={a.id} data-testid={`manuel-adim-${a.id}`}
                                        className={`rounded-xl border p-3 ${
                                            !kapali ? (darkMode ? 'border-slate-800' : 'border-slate-200')
                                                : tuttu ? 'border-emerald-500/60 bg-emerald-500/10'
                                                    : 'border-amber-500/60 bg-amber-500/10'}`}>
                                        <p className="text-sm font-semibold">{i + 1}. {tx(a.adim, isTr)}</p>

                                        {!kapali ? (
                                            <div className="mt-2 flex flex-wrap items-end gap-2">
                                                <label className="block">
                                                    <span className="mb-1 block text-[11px] font-semibold opacity-70">
                                                        {tx(M.girdiEtiket, isTr)}
                                                    </span>
                                                    <input data-testid={`manuel-adim-girdi-${a.id}`}
                                                           className={girdi}
                                                           inputMode="numeric"
                                                           maxLength={3}
                                                           placeholder="___"
                                                           value={taslak[a.id] ?? ''}
                                                           onChange={(e) => setTaslak((t) => ({ ...t, [a.id]: e.target.value.replace(/\D/g, '') }))}
                                                           onKeyDown={(e) => { if (e.key === 'Enter') kaydet(a.id) }} />
                                                </label>
                                                <button type="button" data-testid={`manuel-adim-kaydet-${a.id}`}
                                                        onClick={() => kaydet(a.id)}
                                                        disabled={!/^\d{3}$/.test((taslak[a.id] ?? '').trim())}
                                                        className="min-h-[36px] rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
                                                    {tx(M.kaydet, isTr)}
                                                </button>
                                            </div>
                                        ) : (
                                            <div data-testid={`manuel-adim-dogrulama-${a.id}`} className="mt-2 text-xs">
                                                <p className="flex flex-wrap items-center gap-1.5">
                                                    <span className="opacity-70">{tx(M.senYazdin, isTr)}:</span>
                                                    <span className={`rounded-full px-2 py-0.5 font-bold ${rozet(Number(bulgu))}`}>{bulgu}</span>
                                                    <span className="opacity-70">· {tx(M.gercek, isTr)}:</span>
                                                    <span data-testid={`manuel-adim-status-${a.id}`}
                                                          className={`rounded-full px-2 py-0.5 font-bold ${rozet(a.status)}`}>
                                                        {a.status}
                                                    </span>
                                                </p>
                                                <p className={`mt-1.5 leading-relaxed ${tuttu ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    {tuttu ? `✅ ${tx(M.tutuyor, isTr)}` : `⚠️ ${tx(M.tutmuyor, isTr)}`}
                                                </p>
                                                <p className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                                    <code className="rounded bg-black/30 px-1.5 py-0.5 font-bold">{a.method}</code>
                                                    <code className="rounded bg-black/30 px-1.5 py-0.5">{a.path}</code>
                                                </p>
                                                <p className="mt-1.5 leading-relaxed opacity-70">
                                                    <b>{tx(M.neden, isTr)}:</b> {tx(a.neden, isTr)}
                                                </p>
                                                <button type="button" data-testid={`manuel-adim-geri-${a.id}`}
                                                        onClick={() => geriAl(a.id)}
                                                        className="mt-2 min-h-[36px] rounded-lg px-2 py-1 text-xs font-semibold underline-offset-2 hover:underline">
                                                    ↺ {tx(M.tekrar, isTr)}
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ol>

                        <p className="mt-3 text-xs opacity-70">
                            <b>{kapatilan}/{MANUEL_ADIMLAR.length}</b> {tx(M.ilerleme, isTr)}
                        </p>

                        <button type="button" data-testid="manuel-tur-sifirla"
                                onClick={() => { setBulgular({}); setTaslak({}) }}
                                className={`mt-2 min-h-[36px] w-full rounded-lg px-3 py-2 text-sm font-semibold ${
                                    darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}>
                            {tx(M.sifirla, isTr)}
                        </button>
                    </aside>
                </div>
            )}
        </>
    )
}