// src/components/QaShopApiPage.jsx — /qa-shop-api
//
// QA Shop API sözleşmesinin okunabilir görünümü (Swagger / OpenAPI).
//
// ── NEDEN KENDİ GÖRÜNTÜLEYİCİMİZ ────────────────────────────────────────────
// Hazır Swagger UI paketi eklemek iki sorun getirirdi: (a) tarayıcıya megabayt
// düzeyinde bir bağımlılık iner, (b) sözleşmeyi çalışma anında `localhost:4000`
// üzerinden çekmek gerekir ve Docker kurmayan ziyaretçi BOŞ sayfa görür — tam
// da tarayıcı modunu yazarken kapattığımız açık.
//
// Bunun yerine sözleşme BUILD sırasında JSON'a çevriliyor
// (scripts/build-openapi-json.mjs, hash korumalı) ve bu sayfa onu okuyor.
// Sonuç: Docker açık da olsa kapalı da olsa aynı sayfa çalışır.
//
// TopicPage KULLANILMAZ: bu bir ders sayfası değil, bir referans belgedir.
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import QaShopGecis from './QaShopGecis'
import QaShopHizliGecis from './QaShopHizliGecis'
import useHashKaydir from '../hooks/useHashKaydir'
import { OPENAPI } from '../data/generated/qaShopOpenApi.js'
import Kavram from './QaShopKavram'

const tx = (v, isTr) => {
    if (v == null) return ''
    if (typeof v === 'string') return v
    return isTr ? (v.tr ?? v.en ?? '') : (v.en ?? v.tr ?? '')
}

const M = {
    baslik: { tr: 'QA Shop API Sözleşmesi', en: 'QA Shop API Contract' },
    altBaslik: {
        tr: 'Dükkânın arkasındaki 46 endpoint\'in tamamı: hangi yol, hangi method, hangi status kodu. Test case\'lerini bu sözleşmeye göre yazarsın.',
        en: 'All 46 endpoints behind the shop: which path, which method, which status code. You write your test cases against this contract.',
    },
    ara: { tr: 'Endpoint ara (yol, method veya açıklama)', en: 'Search endpoints (path, method or description)' },
    tumu: { tr: 'Tümü', en: 'All' },
    sonuc: { tr: 'endpoint', en: 'endpoints' },
    bulunamadi: { tr: 'Aramanla eşleşen endpoint yok.', en: 'No endpoint matches your search.' },
    parametreler: { tr: 'Parametreler', en: 'Parameters' },
    basliklar: { tr: 'Zorunlu başlıklar', en: 'Required headers' },
    govdeAlanlari: { tr: 'İstek gövdesi alanları', en: 'Request body fields' },
    alan: { tr: 'Alan', en: 'Field' },
    tip: { tr: 'Tip', en: 'Type' },
    kisit: { tr: 'Doğrulama kuralı', en: 'Validation rule' },
    ornekIstek: { tr: 'Örnek istek gövdesi', en: 'Example request body' },
    cevapGovdesi: { tr: 'Cevap gövdesi', en: 'Response body' },
    baseUrl: { tr: 'Base URL', en: 'Base URL' },
    ortam: { tr: 'Ortam', en: 'Environment' },
    ortamNot: {
        tr: 'Tek ortam var ve o senin makinende çalışıyor: DEV/QA/STAGE ayrımı yok, çünkü kimseyle paylaşılmıyor. Kendi veri alanını açtığında izolasyonu sağlayan şey ayrı bir sunucu değil, X-Sandbox-Key başlığıdır.',
        en: 'There is one environment and it runs on your machine: no DEV/QA/STAGE split, because nothing is shared. What isolates your data is not a separate server but the X-Sandbox-Key header.',
    },
    kimlikBaslik: { tr: 'Kimlik doğrulama — iki katman', en: 'Authentication — two layers' },
    rateLimit: { tr: 'Rate limit', en: 'Rate limit' },
    rateLimitNot: {
        tr: 'Bu API rate limit uygulamaz ve 429 döndürmez. Bilinçli: yığın tek kullanıcılık ve kendi makinende çalışıyor, kısıtlamak yalnızca kendi test koşumunu yavaşlatırdı. Gerçek bir sistemde 429 senaryosunu da test edeceğini unutma.',
        en: 'This API applies no rate limit and never returns 429. That is deliberate: the stack is single-user and runs on your own machine, so throttling would only slow down your own test run. Remember that in a real system you would also test the 429 path.',
    },
    govde: { tr: 'İstek gövdesi', en: 'Request body' },
    cevaplar: { tr: 'Cevaplar', en: 'Responses' },
    zorunlu: { tr: 'zorunlu', en: 'required' },
    kopyala: { tr: 'Yolu kopyala', en: 'Copy path' },
    kopyalandi: { tr: 'Kopyalandı', en: 'Copied' },
    hepsiniAc: { tr: 'Hepsini aç', en: 'Expand all' },
    hepsiniKapat: { tr: 'Hepsini kapat', en: 'Collapse all' },
    hamDosya: { tr: 'Ham openapi.yaml', en: 'Raw openapi.yaml' },
    hamNot: {
        tr: 'Ham sözleşme dosyasını Postman ya da Swagger Editor\'a aktarmak istersen, stack ayaktayken şu adresten inebilirsin:',
        en: 'If you want to import the raw contract into Postman or Swagger Editor, download it from this address while the stack is up:',
    },
    modNot: {
        tr: 'Bu sayfa sözleşmeyi build sırasında üretilen bir türevden okur — Docker açık olmasa da çalışır. Ama ham dosyayı indirmek ve dışarıdan istek atmak için stack\'in ayakta olması gerekir.',
        en: 'This page reads the contract from a derivative generated at build time — it works even without Docker. But downloading the raw file and sending requests from outside requires the stack to be running.',
    },
    paketBaslik: { tr: 'Hazır test paketleri', en: 'Ready-made test packs' },
    paketNot: {
        tr: 'Bu iki paket aynı sözleşmeye karşı yazıldı ve canlı stack üstünde koşturuldu. Kendi testlerini yazmadan ÖNCE açmak istemeyebilirsin: içlerinde hangi uçta hangi cevabın beklendiği yazılı ve bunu kendin bulmak, okumaktan daha çok öğretir. Kendi paketini kurduktan sonra karşılaştırma zemini olarak kullan.',
        en: 'Both packs were written against this same contract and run against a live stack. You may not want to open them BEFORE writing your own tests: they spell out which response is expected at which endpoint, and working that out yourself teaches more than reading it. Use them as a comparison baseline once your own pack exists.',
    },
    paketPostman: { tr: 'Postman koleksiyonu (.json)', en: 'Postman collection (.json)' },
    paketPostmanNot: {
        tr: 'Altı klasör, mutlu yol ve negatif istekler, değişkenleri script ile taşınan bir paket. Postman > Import ile açılır; Newman ile komut satırından da koşar.',
        en: 'Six folders, happy-path and negative requests, values carried between requests by scripts. Open it with Postman > Import; it also runs from the CLI with Newman.',
    },
    paketOrtam: { tr: 'Postman ortam dosyası (.json)', en: 'Postman environment file (.json)' },
    paketOrtamNot: {
        tr: 'baseUrl, sandboxKey ve token değişkenleri tanımlı. İçe aktardıktan sonra sağ üstteki listeden SEÇMEYİ unutma; seçilmemiş ortam en sık yapılan hatadır.',
        en: 'Defines the baseUrl, sandboxKey and token variables. After importing, remember to SELECT it from the dropdown at the top right; an unselected environment is the most common mistake.',
    },
    paketRestAssured: { tr: 'REST Assured başlangıç projesi (.zip)', en: 'REST Assured starter project (.zip)' },
    paketRestAssuredNot: {
        tr: 'Maven projesi: pom.xml, ortak kurulumu yapan bir taban sınıf ve dört test sınıfı. Aç, mvn test yaz; kendi test sınıfını aynı taban üstüne kurabilirsin.',
        en: 'A Maven project: pom.xml, a base class doing the shared setup, and four test classes. Unzip, run mvn test; you can build your own test class on the same base.',
    },
    statusBaslik: { tr: 'Status kodları ne anlatır', en: 'What the status codes tell you' },
    statusMetin: {
        tr: 'Bu sözleşmede hata yolları 200 ile kapatılmaz: 401 kimliğin doğrulanmadığını, 403 kimliğin doğru ama yetkinin olmadığını, 409 isteğin geçerli olduğunu ama sistemin o anki durumunun izin vermediğini, 422 ise gövdenin okunduğunu ama bir iş kuralının reddettiğini söyler. Bir testin "hata döndü" demesi yetmez — HANGİ kodu beklediğini yazmalıdır.',
        en: 'Error paths are not closed with 200 in this contract: 401 means you are not authenticated, 403 means you are authenticated but not authorized, 409 means the request is valid but the current state does not allow it, and 422 means the body parsed but a business rule rejected it. It is not enough for a test to say "an error came back" — it must state WHICH code it expects.',
    },
}

const METHOD_RENGI = {
    GET: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    POST: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    PATCH: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    PUT: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    DELETE: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
}

const statusRengi = (kod) => {
    const n = Number(kod)
    if (n < 300) return 'bg-emerald-500/20 text-emerald-300'
    if (n < 400) return 'bg-sky-500/20 text-sky-300'
    if (n < 500) return 'bg-amber-500/20 text-amber-300'
    return 'bg-rose-500/20 text-rose-300'
}

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
        return saved ? JSON.parse(saved) : true
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// ─── Tek uç kartı ───────────────────────────────────────────────────────────

function UcKarti({ uc, isTr, darkMode, acikMi, setAcik }) {
    const anahtar = `${uc.method} ${uc.yol}`
    const kart = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    return (
        <li data-testid={`api-uc-${uc.method}-${uc.yol.replace(/[^a-zA-Z0-9]/g, '-')}`}
            className={`overflow-hidden rounded-xl border ${kart}`}>
            <button
                type="button"
                onClick={() => setAcik(acikMi ? null : anahtar)}
                aria-expanded={acikMi}
                className="flex w-full items-center gap-3 p-3 text-left transition hover:bg-white/5"
            >
                <span className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[11px] font-extrabold ${
                    METHOD_RENGI[uc.method] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/40'}`}>
                    {uc.method}
                </span>
                <code className="min-w-0 flex-1 truncate font-mono text-xs md:text-sm">{uc.yol}</code>
                <span className="hidden shrink-0 text-xs opacity-70 md:block">{uc.ozet}</span>
                <span className="shrink-0 text-xs opacity-50">{acikMi ? '▲' : '▼'}</span>
            </button>

            {acikMi && (
                <div className={`border-t p-3 text-sm ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    <p className="mb-1 font-semibold md:hidden">{uc.ozet}</p>
                    {uc.aciklama && (
                        <p className="mb-3 whitespace-pre-line text-xs leading-relaxed opacity-80">{uc.aciklama}</p>
                    )}

                    {/* Bu uç hangi kimlik başlıklarını istiyor?
                        Sözleşmenin kendi giriş notu "iki katmanlı kimlik,
                        karıştırılması en sık yapılan hata" diyor — ama başlık
                        adları securitySchemes içindeydi ve sayfaya hiç
                        taşınmıyordu. Uç bazında göstermek o notu somutlaştırır. */}
                    {!!uc.guvenlik.length && (
                        <div className="mb-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.basliklar, isTr)}
                            </p>
                            <ul className="flex flex-wrap gap-1.5">
                                {uc.guvenlik.map((g) => (
                                    <li key={g.ad} data-testid={`api-baslik-${g.basligi}`}
                                        className={`rounded-md px-2 py-1 font-mono text-[11px] ${
                                            darkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-800'}`}>
                                        {g.basligi}
                                    </li>
                                ))}
                                <li className={`rounded-md px-2 py-1 font-mono text-[11px] ${
                                    darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                                    Content-Type: application/json
                                </li>
                            </ul>
                        </div>
                    )}

                    {!!uc.parametreler.length && (
                        <div className="mb-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.parametreler, isTr)}
                            </p>
                            <ul className="space-y-1">
                                {uc.parametreler.map((prm) => (
                                    <li key={`${prm.nerede}-${prm.ad}`} className="text-xs">
                                        <code className="font-mono font-bold">{prm.ad}</code>
                                        <span className="opacity-60"> ({prm.nerede}{prm.tip ? `, ${prm.tip}` : ''})</span>
                                        {prm.zorunlu && (
                                            <span className="ml-1 rounded bg-rose-500/20 px-1 text-[10px] font-bold text-rose-300">
                                                {tx(M.zorunlu, isTr)}
                                            </span>
                                        )}
                                        {prm.kisit && <span className="ml-1 font-mono text-[10px] opacity-60">{prm.kisit}</span>}
                                        {prm.aciklama && <span className="opacity-70"> — {prm.aciklama}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* İstek gövdesi: alan · tip · zorunluluk · doğrulama kuralı.
                        Önceden yalnızca "gövde zorunlu mu" ve varsa bir örnek
                        vardı; hangi alanın zorunlu olduğu ve sınırının ne olduğu
                        sözleşmede duruyor ama sayfada görünmüyordu. */}
                    {!!uc.govdeAlanlari.length && (
                        <div className="mb-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.govdeAlanlari, isTr)}
                                {uc.govdeZorunlu && (
                                    <span className="ml-1 rounded bg-rose-500/20 px-1 text-[10px] text-rose-300">
                                        {tx(M.zorunlu, isTr)}
                                    </span>
                                )}
                            </p>
                            <div className="overflow-x-auto">
                                <table data-testid={`api-govde-${uc.method}-${uc.yol.replace(/[^a-zA-Z0-9]/g, '-')}`}
                                       className="w-full min-w-[420px] border-collapse text-[11px]">
                                    <thead className="opacity-60">
                                        <tr>
                                            <th className="py-1 text-left">{tx(M.alan, isTr)}</th>
                                            <th className="text-left">{tx(M.tip, isTr)}</th>
                                            <th className="text-left">{tx(M.zorunlu, isTr)}</th>
                                            <th className="text-left">{tx(M.kisit, isTr)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uc.govdeAlanlari.map((a) => (
                                            <tr key={a.ad} className={darkMode ? 'border-t border-slate-800' : 'border-t border-slate-200'}>
                                                <td className="py-1 font-mono font-semibold">{a.ad}</td>
                                                <td className="font-mono opacity-80">{a.tip}</td>
                                                <td>{a.zorunlu ? <span className="font-bold text-rose-400">✔</span> : <span className="opacity-40">—</span>}</td>
                                                <td className="font-mono opacity-70">{a.kisit || '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {uc.govdeAlanlari.some((a) => a.aciklama) && (
                                <ul className="mt-1 space-y-0.5">
                                    {uc.govdeAlanlari.filter((a) => a.aciklama).map((a) => (
                                        <li key={a.ad} className="text-[11px] opacity-70">
                                            <code className="font-mono">{a.ad}</code> — {a.aciklama}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {uc.ornek && (
                        <div className="mb-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.ornekIstek, isTr)}
                            </p>
                            <pre className="overflow-x-auto rounded-lg bg-black/40 p-2 text-[11px] text-emerald-300">
                                <code>{uc.ornek}</code>
                            </pre>
                        </div>
                    )}

                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                        {tx(M.cevaplar, isTr)}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                        {uc.cevaplar.map((c) => (
                            <li key={c.kod}
                                className={`rounded-lg px-2 py-1 text-[11px] ${statusRengi(c.kod)}`}>
                                <b>{c.kod}</b>{c.aciklama ? ` · ${c.aciklama}` : ''}
                            </li>
                        ))}
                    </ul>

                    {/* Başarı cevabının gövdesi: alan adları ve tipleri.
                        "200 döndü" ile "doğru gövde döndü" farkı burada başlar. */}
                    {uc.cevaplar.filter((c) => c.alanlar.length || c.ornek).map((c) => (
                        <div key={`govde-${c.kod}`} className="mt-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.cevapGovdesi, isTr)}
                                {' · '}<span className="font-mono">{c.kod}</span>
                            </p>
                            {!!c.alanlar.length && (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[360px] border-collapse text-[11px]">
                                        <tbody>
                                            {c.alanlar.map((a) => (
                                                <tr key={a.ad} className={darkMode ? 'border-t border-slate-800' : 'border-t border-slate-200'}>
                                                    <td className="py-1 font-mono font-semibold">{a.ad}</td>
                                                    <td className="font-mono opacity-70">{a.tip}</td>
                                                    <td className="font-mono opacity-60">{a.kisit || ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {c.ornek && (
                                <pre className="mt-1 overflow-x-auto rounded-lg bg-black/40 p-2 text-[11px] text-sky-300">
                                    <code>{c.ornek}</code>
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </li>
    )
}


// ════════════════════════════════════════════════════════════════════════════

export default function QaShopApiPage() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [darkMode, setDarkMode] = useDarkModeState()

    useHashKaydir()

    const [arama, setArama] = useState('')
    const [etiket, setEtiket] = useState('')
    const [acik, setAcik] = useState(null)

    const etiketler = useMemo(() => {
        const gorulen = [...new Set(OPENAPI.uclar.map((u) => u.etiket))]
        // Sözleşmedeki sıra korunur; alfabetik sıralamak öğrenme sırasını bozar.
        return OPENAPI.etiketSirasi.filter((e) => gorulen.includes(e))
            .concat(gorulen.filter((e) => !OPENAPI.etiketSirasi.includes(e)))
    }, [])

    const suzulmus = useMemo(() => {
        const q = arama.trim().toLowerCase()
        return OPENAPI.uclar.filter((u) => {
            if (etiket && u.etiket !== etiket) return false
            if (!q) return true
            return `${u.method} ${u.yol} ${u.ozet} ${u.aciklama}`.toLowerCase().includes(q)
        })
    }, [arama, etiket])

    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    const input = `min-h-[36px] w-full rounded-lg border px-3 py-2 text-base md:text-sm ${
        darkMode ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-10">
                <QaShopGecis aktif="api" isTr={isTr} darkMode={darkMode} />

                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(M.baslik, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(M.altBaslik, isTr)}
                    </p>
                </header>

                <div data-testid="api-mod-notu"
                     className={`mb-6 rounded-xl border p-3 text-sm leading-relaxed ${
                         darkMode ? 'border-sky-600/50 bg-sky-500/10' : 'border-sky-300 bg-sky-50'}`}>
                    ℹ️ {tx(M.modNot, isTr)}
                </div>

                {/* Base URL · kimlik · ortam · rate limit.
                    Bunların hepsi sözleşmede vardı ama türeve taşınmadığı için
                    sayfada HİÇ görünmüyordu — ölçüldü. Bir testin ilk ihtiyacı
                    "hangi adrese, hangi başlıkla" sorusudur; onu Swagger
                    dosyasını açarak aramak zorunda kalmak, sayfanın var olma
                    sebebini boşa çıkarır. */}
                <section data-testid="api-baglanti" className={`mb-6 rounded-2xl border p-4 ${card}`}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.baseUrl, isTr)}
                                <Kavram k="docker" isTr={isTr} darkMode={darkMode} />
                            </p>
                            {OPENAPI.sunucular.map((sv) => (
                                <div key={sv.url} className="mb-1">
                                    <code data-testid="api-base-url"
                                          className="block overflow-x-auto rounded-lg bg-black/40 p-2 font-mono text-xs text-emerald-300">
                                        {sv.url}
                                    </code>
                                    {sv.aciklama && <p className="mt-1 text-[11px] opacity-70">{sv.aciklama}</p>}
                                </div>
                            ))}
                            <p className="mt-2 text-[11px] leading-relaxed opacity-70">
                                <b>{tx(M.ortam, isTr)}:</b> {tx(M.ortamNot, isTr)}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {tx(M.kimlikBaslik, isTr)}
                                <Kavram k="kimlikBasliklari" isTr={isTr} darkMode={darkMode} />
                                <Kavram k="sandbox" isTr={isTr} darkMode={darkMode} />
                            </p>
                            <ul className="space-y-2">
                                {OPENAPI.kimlikSemalari.map((k) => (
                                    <li key={k.ad} data-testid={`api-kimlik-${k.ad}`}>
                                        <code className={`rounded-md px-2 py-1 font-mono text-[11px] ${
                                            darkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-800'}`}>
                                            {k.basligi}
                                        </code>
                                        <span className="ml-1 text-[11px] opacity-60">
                                            ({k.tip}{k.sema ? `/${k.sema}` : ''}, {k.nerede})
                                        </span>
                                        {k.aciklama && (
                                            <p className="mt-0.5 whitespace-pre-line text-[11px] leading-relaxed opacity-75">{k.aciklama}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 text-[11px] leading-relaxed opacity-70">
                                <b>{tx(M.rateLimit, isTr)}:</b> {tx(M.rateLimitNot, isTr)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Status kodu okuması: sayfanın öğrettiği asıl şey bu */}
                <section className={`mb-6 rounded-2xl border p-4 ${card}`}>
                    <h2 className="mb-2 text-base font-bold">🎯 {tx(M.statusBaslik, isTr)}</h2>
                    <p className="text-sm leading-relaxed opacity-85">{tx(M.statusMetin, isTr)}</p>
                </section>

                {/* Arama + etiket süzgeci */}
                <div className="mb-4 grid gap-2 md:grid-cols-[1fr_auto]">
                    <input
                        data-testid="api-ara"
                        className={input}
                        placeholder={tx(M.ara, isTr)}
                        value={arama}
                        onChange={(e) => setArama(e.target.value)}
                    />
                    <p className="self-center text-sm opacity-70">
                        <b data-testid="api-uc-sayisi">{suzulmus.length}</b> {tx(M.sonuc, isTr)}
                    </p>
                </div>

                <div className="mb-4 flex flex-wrap gap-2" data-testid="api-etiketler">
                    <button
                        type="button"
                        data-testid="api-etiket-tumu"
                        onClick={() => setEtiket('')}
                        className={`min-h-[36px] rounded-full px-3 py-1 text-sm font-semibold transition ${
                            !etiket ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
                    >
                        {tx(M.tumu, isTr)} ({OPENAPI.uclar.length})
                    </button>
                    {etiketler.map((e) => (
                        <button
                            key={e}
                            type="button"
                            data-testid={`api-etiket-${e}`}
                            onClick={() => setEtiket(e === etiket ? '' : e)}
                            className={`min-h-[36px] rounded-full px-3 py-1 text-sm font-semibold transition ${
                                etiket === e ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
                        >
                            {e} ({OPENAPI.uclar.filter((u) => u.etiket === e).length})
                        </button>
                    ))}
                </div>

                {suzulmus.length === 0 ? (
                    <p data-testid="api-bulunamadi" className="rounded-xl border border-dashed p-8 text-center text-sm opacity-70">
                        {tx(M.bulunamadi, isTr)}
                    </p>
                ) : (
                    <ul data-testid="api-uc-listesi" className="space-y-2">
                        {suzulmus.map((uc) => {
                            const anahtar = `${uc.method} ${uc.yol}`
                            return (
                                <UcKarti
                                    key={anahtar}
                                    uc={uc}
                                    isTr={isTr}
                                    darkMode={darkMode}
                                    acikMi={acik === anahtar}
                                    setAcik={setAcik}
                                />
                            )
                        })}
                    </ul>
                )}

                {/* İndirilebilir paketler.
                    Depoda vardılar ama siteden hiçbir yere bağlı değildiler;
                    aktif olarak arayan bir inceleme bile bulamamıştı. Dosyalar
                    build sırasında kaynaktan üretilir, elle kopyalanmaz.

                    Uyarı metni bilerek ilk satırda: paket, beklenen cevapları
                    içerir. Kullanıcı ne açtığını bilerek açmalı. */}
                <section data-testid="api-paketler" className={`mt-8 rounded-2xl border p-4 ${card}`}>
                    <h2 className="mb-2 text-base font-bold">⬇️ {tx(M.paketBaslik, isTr)}</h2>
                    <p className="mb-3 text-sm leading-relaxed opacity-80">{tx(M.paketNot, isTr)}</p>
                    <ul className="space-y-2">
                        {[
                            { id: 'postman', href: '/qa-shop/indirilebilir/qa-shop.postman_collection.json', ad: M.paketPostman, not: M.paketPostmanNot },
                            { id: 'postman-ortam', href: '/qa-shop/indirilebilir/qa-shop.postman_environment.json', ad: M.paketOrtam, not: M.paketOrtamNot },
                            { id: 'rest-assured', href: '/qa-shop/indirilebilir/qa-shop-rest-assured-starter.zip', ad: M.paketRestAssured, not: M.paketRestAssuredNot },
                        ].map((paket) => (
                            <li key={paket.id}>
                                <a href={paket.href} download data-testid={`indir-${paket.id}`}
                                   className={`block rounded-lg border px-3 py-2 transition ${
                                       darkMode ? 'border-slate-700 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-500'}`}>
                                    <span className="block text-sm font-semibold text-indigo-400">{tx(paket.ad, isTr)}</span>
                                    <span className="mt-0.5 block text-xs leading-relaxed opacity-80">{tx(paket.not, isTr)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Ham dosya — dışarıdan araçlara aktarmak isteyenler için */}
                <section className={`mt-8 rounded-2xl border p-4 ${card}`}>
                    <h2 className="mb-2 text-base font-bold">📄 {tx(M.hamDosya, isTr)}</h2>
                    <p className="text-sm leading-relaxed opacity-80">{tx(M.hamNot, isTr)}</p>
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-3 text-xs text-emerald-300">
                        <code>curl -O http://localhost:4000/api/v1/openapi.yaml</code>
                    </pre>
                    <p className="mt-2 text-sm">
                        <Link to="/qa-shop-setup" className="font-semibold text-indigo-400 hover:underline">
                            {isTr ? 'Stack nasıl kurulur → kurulum rehberi' : 'How to run the stack → setup guide'} →
                        </Link>
                    </p>
                </section>
            </main>

            <QaShopHizliGecis aktif="api" isTr={isTr} darkMode={darkMode} />
        </div>
    )
}
