// QA Shop — her zaman görünür hızlı geçiş + başa dön
//
// ── NEDEN VAR ───────────────────────────────────────────────────────────────
// Sayfaların üstündeki geçiş şeridi kaydırınca gözden kayboluyordu. Kullanıcı
// şartnamenin ortasında "şimdi mağazaya bakayım" dediğinde en üste kadar geri
// kaydırmak zorunda kalıyordu. Bu şerit SABİTTİR: sayfanın neresinde olursan
// ol dört sayfaya da tek tıkla gidilir.
//
// ── NEDEN ALT-ORTA (köşeler değil) ──────────────────────────────────────────
// Ölçüldü: iki küresel widget alt köşeleri zaten tutuyor —
//   · ChatWidget      → `fixed bottom-20 left-4`
//   · CommentsWidget  → `fixed bottom-20 right-4`
// Sağ ya da sol kenarda yukarı doğru bir ray kursaydık bunların üstüne
// binerdi. Alt-orta iki köşeyi de boş bırakır ve "sayfa geçişi" olarak
// doğal okunur.
//
// ── ŞERİT DAR EKRANDA NEDEN YUKARIDA ─────────────────────────────────────
// Ölçüldü (390/640/768px): şerit alt-orta, yüzen düğmeler alt-sol (manuel tur)
// ve alt-sağ (başa dön). Beşinci sayfa eklenince şerit genişledi ve 390px ile
// 640px'te sol düğmeye girdi. Bu yüzden md ALTINDA şerit bir sıra yukarı
// (bottom-20) alınır — köşedeki widget'lar da orada ama onlar KÖŞEDE, şerit
// ORTADA: yatayda 25px+ boşluk kalıyor. md ve üstünde şerit alt sıraya iner.
//
// ── BAŞA DÖN AYRI BİR DÜĞME ─────────────────────────────────────────────────
// Eskiden bu sayfalarda 🏠 ikonlu bir düğme vardı ve SİTE ana sayfasına
// gidiyordu — kullanıcı ise kendi sayfasının başına dönmeyi bekliyordu. İkon
// ile davranış çelişiyordu. Artık ikon ⬆ ve davranış sayfanın başına dönmek;
// siteye dönüş yolu zaten üstteki başlıkta duruyor ("← Ana Sayfaya Dön").
import { Link, useLocation } from 'react-router-dom'

const SAYFALAR = [
    { id: 'backlog', yol: '/qa-shop-backlog#epics', ikon: '🗂️', etiket: { tr: 'Backlog', en: 'Backlog' }, tam: { tr: 'Gereksinim, epic, frontend/backend story', en: 'Requirements, epics, frontend/backend stories' } },
    { id: 'spec', yol: '/qa-shop-spec#user-stories', ikon: '📋', etiket: { tr: 'Story', en: 'Story' }, tam: { tr: 'User story\'ler ve kabul kriterleri', en: 'User stories and acceptance criteria' } },
    { id: 'setup', yol: '/qa-shop-setup#step-1-docker', ikon: '🛠️', etiket: { tr: 'Kurulum', en: 'Setup' }, tam: { tr: 'Docker, DBeaver, Postman kurulumu', en: 'Docker, DBeaver, Postman setup' } },
    { id: 'api', yol: '/qa-shop-api', ikon: '🔌', etiket: { tr: 'Swagger', en: 'Swagger' }, tam: { tr: 'API sözleşmesi — 46 endpoint', en: 'API contract — 46 endpoints' } },
    { id: 'shop', yol: '/qa-shop', ikon: '🛍️', etiket: { tr: 'Mağaza', en: 'Shop' }, tam: { tr: 'Çalışan dükkân', en: 'The running shop' }, birincil: true },
]

const tx = (v, isTr) => (typeof v === 'string' ? v : (isTr ? v.tr : v.en))

// Emoji ortalama: `place-items-center` kutuyu ortalar ama emoji glifi kendi
// satır kutusu içinde tabana oturduğu için düğmenin içinde yukarı kaçıyordu.
// `leading-none` satır yüksekliğini glifin kendi yüksekliğine indirir.
// Ölçüldü: dört sayfada da sapma 0px.
const IKON = 'grid place-items-center leading-none'

// ⚠ Bağlantı ETİKETİNİN kendisi flex YAPILAMAZ. Ölçüldü: src/index.css'te
// katmansız bir kural var —
//   .flex > a, .grid > a, li > a, p > a, nav a, header a { display: inline-block }
// Tailwind yardımcıları `@layer utilities` içinde olduğundan, katmansız CSS
// özgüllükten BAĞIMSIZ olarak onları yener: `className="flex"` burada hiçbir
// şey yapmıyor ve ikon ile etiket alt alta düşüyordu. Bu yüzden dizilim
// bağlantının İÇİNDEKİ span'e alındı — global kural span'lere dokunmuyor.
const ICERIK = 'flex items-center gap-1.5'

export default function QaShopHizliGecis({ aktif, isTr, darkMode }) {
    const { pathname } = useLocation()

    const basaDon = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <>
            {/* ── Sayfa geçişi: alt-orta, her zaman görünür ── */}
            <nav
                data-testid="qa-shop-hizli-gecis"
                aria-label={isTr ? 'QA Shop sayfaları arasında geçiş' : 'Switch between QA Shop pages'}
                className={`fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-full border p-1 shadow-2xl backdrop-blur md:bottom-3 ${
                    darkMode ? 'border-slate-700 bg-slate-900/95' : 'border-slate-300 bg-white/95'}`}
            >
                <ul className="flex items-center gap-1">
                    {SAYFALAR.map((s) => {
                        const buradasin = s.id === aktif || pathname === s.yol.split('#')[0]

                        if (buradasin) {
                            return (
                                <li key={s.id}>
                                    <span
                                        data-testid={`hizli-${s.id}`}
                                        aria-current="page"
                                        title={tx(s.tam, isTr)}
                                        className={`inline-block min-h-[38px] rounded-full px-2.5 py-1.5 text-xs font-bold ${
                                            darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-800'}`}
                                    >
                                        <span className={ICERIK}>
                                            <span className={IKON} aria-hidden="true">{s.ikon}</span>
                                            <span className="hidden sm:inline">{tx(s.etiket, isTr)}</span>
                                        </span>
                                    </span>
                                </li>
                            )
                        }

                        return (
                            <li key={s.id}>
                                <Link
                                    to={s.yol}
                                    data-testid={`hizli-${s.id}`}
                                    title={tx(s.tam, isTr)}
                                    aria-label={tx(s.tam, isTr)}
                                    className={`min-h-[38px] rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
                                        s.birincil
                                            ? 'bg-orange-600 text-white hover:bg-orange-500'
                                            : darkMode
                                                ? 'text-slate-300 hover:bg-slate-800'
                                                : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    <span className={ICERIK}>
                                        <span className={IKON} aria-hidden="true">{s.ikon}</span>
                                        <span className="hidden sm:inline">{tx(s.etiket, isTr)}</span>
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* ── Başa dön: sağ alt, köşedeki CommentsWidget'ın ALTINDA ── */}
            <button
                type="button"
                data-testid="basa-don"
                onClick={basaDon}
                aria-label={isTr ? 'Sayfanın başına dön' : 'Back to top of page'}
                title={isTr ? 'Sayfanın başına dön' : 'Back to top of page'}
                className={`fixed bottom-3 right-4 z-[60] h-11 w-11 rounded-full text-lg text-white shadow-lg transition ${IKON} ${
                    darkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
            >
                <span aria-hidden="true">⬆</span>
            </button>
        </>
    )
}
