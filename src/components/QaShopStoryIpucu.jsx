// QA Shop — bağlamsal user story ipucu ("Şartname modu")
//
// ── NE İŞE YARAR ────────────────────────────────────────────────────────────
// Dükkândaki bir öğenin üzerine gelince, o öğenin HANGİ user story'ye ait
// olduğunu ve kabul kriterlerini gösterir. Amaç, şartname ile ekran arasında
// sekme değiştirmeyi bitirmek: "bu düğmeden ne bekleniyor?" sorusunun cevabı
// düğmenin yanında.
//
// ── NEDEN VARSAYILAN KAPALI (bu kritik) ────────────────────────────────────
// `/qa-shop` bir Selenium/Playwright HEDEFİDİR. Hover ile açılan bir katman,
// otomasyonu bozan şeyin ta kendisidir:
//   · Playwright `.click()` önce hover yapar → katman açılır → tıklamayı keser
//   · Selenium "element is obscured by another element" der
//   · Sonuç: pratik hedefi FLAKY olur
// Bir QA öğrenme platformunda kazara flakiness öğretmek, öğretilebilecek en
// kötü şeydir. Bu yüzden iki koruma birden var:
//   1. Mod KAPALIYKEN bu bileşen children'ı OLDUĞU GİBİ döndürür — sarmalayıcı
//      element bile eklemez. Varsayılan DOM, otomasyon için bozulmamış kalır.
//   2. Mod açıkken bile ipucu katmanı `pointer-events: none` taşır; hiçbir
//      tıklamayı kesemez.
//
// ── NEDEN CEVABI ELE VERMİYOR ───────────────────────────────────────────────
// Kabul kriterleri zaten `/qa-shop-spec`'te açık ve gerçek hayatta testçinin
// elinde şartname vardır. Gizli tutulan şey kriter değil, HANGİ KUSURUN AÇIK
// olduğudur (gizli tur). Burada gösterilen şey gereksinim; testi yine kullanıcı
// yazar — bu yüzden panel test case DEĞİL, yalnızca kriter gösterir.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const tx = (v, isTr) => {
    if (v == null) return ''
    if (typeof v === 'string') return v
    return isTr ? (v.tr ?? v.en ?? '') : (v.en ?? v.tr ?? '')
}

// Şartname verisi YALNIZCA mod açılınca yüklenir: 16 story + kriterleri
// dükkânın varsayılan paketine girmesin.
export async function storyleriYukle() {
    const { qaShopSpecData } = await import('../data/qaShopSpecData.js')
    const harita = {}
    for (const bolum of qaShopSpecData.sections ?? []) {
        for (const blok of bolum.blocks ?? []) {
            if (blok.type === 'userStory') harita[blok.id] = blok
        }
    }
    return harita
}

const ZORLUK_RENGI = {
    basic: 'bg-emerald-500/20 text-emerald-300',
    intermediate: 'bg-amber-500/20 text-amber-300',
    advanced: 'bg-rose-500/20 text-rose-300',
}

// ─── Sarmalayıcı ────────────────────────────────────────────────────────────

export default function StoryIpucu({ storyId, storyler, aktif, isTr, darkMode, children }) {
    const [acik, setAcik] = useState(false)
    const story = storyler?.[storyId]

    // Mod kapalıysa HİÇBİR ŞEY sarmalanmaz — otomasyon hedefi bozulmaz.
    if (!aktif || !story) return children

    return (
        <span
            className="relative inline-block"
            data-testid={`story-alani-${storyId}`}
            onMouseEnter={() => setAcik(true)}
            onMouseLeave={() => setAcik(false)}
            onFocusCapture={() => setAcik(true)}
            onBlurCapture={() => setAcik(false)}
        >
            {children}

            <span
                data-testid={`story-rozet-${storyId}`}
                className={`pointer-events-none absolute -right-1 -top-2 z-20 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold shadow ${
                    ZORLUK_RENGI[story.difficulty] ?? 'bg-slate-500/20 text-slate-300'}`}
            >
                {storyId}
            </span>

            {acik && (
                <span
                    role="tooltip"
                    data-testid={`story-ipucu-${storyId}`}
                    /* pointer-events-none: bu katman ASLA bir tıklamayı kesemez.
                       Otomasyon hedefi olmanın bedeli bu tek satır. */
                    className={`pointer-events-none absolute left-0 top-full z-30 mt-2 block w-[320px] max-w-[85vw] rounded-xl border p-3 text-left shadow-xl ${
                        darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'}`}
                >
                    <span className="mb-1 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                            ZORLUK_RENGI[story.difficulty] ?? ''}`}>
                            {storyId}
                        </span>
                        <span className="text-xs font-bold">{tx(story.title, isTr)}</span>
                    </span>

                    <span className="block text-[11px] leading-relaxed opacity-80">
                        {tx(story.story, isTr)}
                    </span>

                    <span className="mt-2 block text-[10px] font-bold uppercase tracking-wide opacity-60">
                        {isTr ? 'Kabul kriterleri' : 'Acceptance criteria'}
                    </span>
                    <span className="mt-1 block space-y-1">
                        {(story.acceptance ?? []).slice(0, 3).map((k, i) => (
                            <span key={i} className={`block rounded-lg px-2 py-1 text-[10px] leading-snug ${
                                darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                {tx(k, isTr).split('\n').map((satir, j) => (
                                    <span key={j} className="block">{satir}</span>
                                ))}
                            </span>
                        ))}
                        {(story.acceptance ?? []).length > 3 && (
                            <span className="block text-[10px] opacity-60">
                                +{story.acceptance.length - 3} {isTr ? 'kriter daha' : 'more criteria'}
                            </span>
                        )}
                    </span>

                    {!!(story.endpoints ?? []).length && (
                        <span className="mt-2 block text-[10px] opacity-70">
                            <b>{isTr ? 'Endpoint\'ler' : 'Endpoints'}:</b> {story.endpoints.join(' · ')}
                        </span>
                    )}
                    {/* "Bu kuralı kıran anahtar" satırı KALDIRILDI: defect'in adını
                        veriyordu ve hemen altındaki şerit "hangi defect'in açık
                        olduğu söylenmez" diyordu — panel kendi kendisiyle
                        çelişiyordu. Kriter gereksinimdir; kusuru bulmak testi
                        yazanın işidir. */}

                    <span className="mt-2 block text-[10px] italic opacity-60">
                        {isTr
                            ? 'Kriter "ne doğru sayılır"ı söyler; test case\'i sen yazacaksın.'
                            : 'Criteria say what counts as correct; you will write the test case.'}
                    </span>
                </span>
            )}
        </span>
    )
}

// ─── Mod anahtarı ───────────────────────────────────────────────────────────

const DEPO = 'qaShopStoryModu'

export function useStoryModu() {
    const [aktif, setAktif] = useState(() => localStorage.getItem(DEPO) === '1')
    const [storyler, setStoryler] = useState(null)

    useEffect(() => {
        localStorage.setItem(DEPO, aktif ? '1' : '0')
        if (aktif && !storyler) storyleriYukle().then(setStoryler)
    }, [aktif, storyler])

    return { aktif, setAktif, storyler }
}

export function StoryModuAnahtari({ aktif, setAktif, isTr, darkMode }) {
    return (
        <button
            type="button"
            data-testid="story-modu-anahtari"
            aria-pressed={aktif}
            onClick={() => setAktif((a) => !a)}
            title={isTr
                ? 'Dükkândaki öğelerin hangi user story\'ye ait olduğunu göster'
                : 'Show which user story each shop element belongs to'}
            className={`min-h-[36px] rounded-full px-3 py-2 text-xs font-bold transition ${
                aktif
                    ? 'bg-violet-500/25 text-violet-200 hover:bg-violet-500/35'
                    : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
        >
            📋 {isTr ? 'Şartname modu' : 'Spec mode'}{aktif ? ' · açık' : ''}
        </button>
    )
}

// Mod açıkken sayfanın üstünde duran açıklama şeridi. Kullanıcı rozetlerin
// nereden geldiğini ve neyin hâlâ gizli olduğunu bilmeli.
export function StoryModuSeridi({ aktif, isTr, darkMode }) {
    if (!aktif) return null
    return (
        <div
            data-testid="story-modu-serit"
            className={`mb-4 rounded-xl border p-3 text-sm leading-relaxed ${
                darkMode ? 'border-violet-500/40 bg-violet-500/10' : 'border-violet-300 bg-violet-50'}`}
        >
            <p>
                📋 <b>{isTr ? 'Şartname modu açık.' : 'Spec mode is on.'}</b>{' '}
                {isTr
                    ? 'Rozetli öğelerin üzerine gel (ya da klavyeyle odaklan) — o öğenin user story\'sini ve kabul kriterlerini gösterir.'
                    : 'Hover a badged element (or focus it with the keyboard) to see its user story and acceptance criteria.'}
            </p>
            <p className="mt-1 text-xs opacity-75">
                {isTr
                    ? 'Kriterler gereksinimdir, cevap değil: hangi defect\'in açık olduğu yine söylenmez. Tam liste için '
                    : 'Criteria are the requirement, not the answer: which defect is on is still not disclosed. For the full list see '}
                <Link to="/qa-shop-spec" className="font-semibold text-indigo-400 hover:underline">
                    /qa-shop-spec
                </Link>
                .
            </p>
        </div>
    )
}
