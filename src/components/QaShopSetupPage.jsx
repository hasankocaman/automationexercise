// src/components/QaShopSetupPage.jsx
// QA Shop Kurulum Rehberi — /qa-shop-setup
//
// QA Shop pratik ortamının (ayrı PostgreSQL + ayrı Express API) kurulum ve
// ilk test adımlarını anlatır. Sayfa kabuğu PortfolioPage/SprintPage kalıbını
// izler: TopicHeader + ScrollProgressBar + useDarkModeState + sabit ana sayfa
// butonu.
//
// TopicPage KULLANILMAZ. Bu bir ders sayfası değil, sıralı bir yordam
// rehberidir; TopicPage'in quiz/mülakat/ustalık makinesi burada anlamsız
// yükümlülükler doğururdu (her sekmede video+animasyon+sandbox gibi).
//
// Şu an yalnızca admin görüyor. Herkese açılacağı gün iki satır değişir:
// App.jsx'teki sarmalayıcı ve seo.js'teki noindex.

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import QaShopGecis from './QaShopGecis'
import QaShopHizliGecis from './QaShopHizliGecis'
import useHashKaydir from '../hooks/useHashKaydir'
import { qaShopSetupData } from '../data/qaShopSetupData'
// Yalnızca herkese açık dizin import edilir. Sorgu ↔ kural/story eşlemesi
// (qaShopSqlMap.js) bu sayfaya HİÇ girmez — o admin tarafında kalır.
import { SQL_PACK_GROUPS } from '../data/qaShopSqlPackData'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
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
            <div
                className="h-full transition-[width] duration-100"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #14b8a6)' }}
            />
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

// ─── Kod bloğu ──────────────────────────────────────────────────────────────
// Kopyala düğmesi zorunlu (CLAUDE.md §8). Prism yerine sade <pre>: bu sayfadaki
// kod parçaları komut satırı ve yapılandırma; renklendirme okunurluğa bir şey
// katmıyor, ek bir CDN bağımlılığı getiriyordu.
function CodeBlock({ code, language, darkMode }) {
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            // Pano izni yoksa sessizce geç — kod zaten seçilebilir durumda.
        }
    }
    return (
        <div className="relative my-3">
            <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-slate-700 bg-slate-800 px-3 py-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wide text-slate-400">{language}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="min-h-[36px] rounded px-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                    {copied ? '✓' : '⧉'}
                </button>
            </div>
            <pre className={`overflow-x-auto rounded-b-lg border border-slate-700 p-3 text-[13px] leading-relaxed ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-900 text-slate-200'}`}>
                <code className="font-mono">{code}</code>
            </pre>
        </div>
    )
}

// Postman'de ilk isteğin nasıl göründüğü — inline SVG.
//
// NEDEN ÇİZİM, EKRAN GÖRÜNTÜSÜ DEĞİL: projede dışa bağımlı görsel dosyası
// kullanılmaz (tek istisna dükkânın ürün fotoğrafları). Çizim ayrıca her
// yakınlaştırmada net kalır, dosya indirmez ve Postman arayüzü değiştiğinde
// tek dosyada güncellenir.
//
// GÖSTERİLEN DEĞERLER GERÇEK: ayakta bir yığında ölçülmüş bir cevap
// (200, 35 ms, 638 B, uptimeSeconds 41799). Uydurma bir çıktı koymak,
// kullanıcının kendi ekranıyla karşılaştırdığında güveni bozar.
const PM = {
    kabuk: '#1e1e1e', panel: '#262626', cizgi: '#3a3a3a',
    metin: '#d4d4d4', soluk: '#8a8a8a',
    mavi: '#1f6feb', yesilBg: '#0f3a26', yesil: '#3dd68c',
    anahtar: '#9cdcfe', dize: '#ce9178', sayi: '#b5cea8', suslu: '#d4d4d4',
}

function PostmanEkrani({ isTr }) {
    const satirlar = [
        [['{', PM.suslu]],
        [['  "status"', PM.anahtar], [': ', PM.suslu], ['"ok"', PM.dize], [',', PM.suslu]],
        [['  "database"', PM.anahtar], [': ', PM.suslu], ['"up"', PM.dize], [',', PM.suslu]],
        [['  "uptimeSeconds"', PM.anahtar], [': ', PM.suslu], ['41799', PM.sayi], [',', PM.suslu]],
        [['  "time"', PM.anahtar], [': ', PM.suslu], ['"2026-08-27T06:14:42.023Z"', PM.dize]],
        [['}', PM.suslu]],
    ]

    const sekmeler = ['Docs', 'Params', 'Authorization', 'Headers', 'Body', 'Scripts', 'Settings']
    const altSekmeler = ['Body', 'Cookies', 'Headers', 'Test Results']

    return (
        <svg viewBox="0 0 1120 560" role="img" className="w-full"
             aria-labelledby="pm-baslik pm-aciklama"
             style={{ minWidth: 640 }}>
            <title id="pm-baslik">
                {isTr ? 'Postman ekranı: GET /health isteği 200 OK döndürüyor' : 'Postman: the GET /health request returns 200 OK'}
            </title>
            <desc id="pm-aciklama">
                {isTr
                    ? 'Adres çubuğunda GET http://localhost:4000/health yazıyor. Cevap alanında 200 OK, 35 milisaniye, 638 bayt ve gövdede status ok, database up, uptimeSeconds 41799, time alanları görünüyor.'
                    : 'The address bar reads GET http://localhost:4000/health. The response area shows 200 OK, 35 milliseconds, 638 bytes, and a body with status ok, database up, uptimeSeconds 41799 and time.'}
            </desc>

            <rect x="0" y="0" width="1120" height="560" rx="10" fill={PM.kabuk} />

            {/* Sekme başlığı */}
            <rect x="1" y="1" width="1118" height="38" rx="9" fill={PM.panel} />
            <rect x="16" y="12" width="16" height="16" rx="3" fill="none" stroke={PM.soluk} strokeWidth="1.5" />
            <text x="42" y="25" fill={PM.metin} fontSize="13" fontFamily="ui-sans-serif, system-ui, sans-serif">
                http://localhost:4000/health
            </text>

            {/* İstek satırı */}
            <rect x="16" y="54" width="110" height="34" rx="6" fill={PM.kabuk} stroke={PM.cizgi} />
            <text x="30" y="76" fill={PM.metin} fontSize="13" fontFamily="ui-sans-serif, system-ui, sans-serif">GET</text>
            <path d="M108 68 l6 7 l6 -7" fill="none" stroke={PM.soluk} strokeWidth="1.5" />

            <rect x="134" y="54" width="820" height="34" rx="6" fill={PM.kabuk} stroke={PM.cizgi} />
            <text x="150" y="76" fill={PM.metin} fontSize="13"
                  fontFamily="ui-monospace, 'JetBrains Mono', monospace">
                http://localhost:4000/health
            </text>

            <rect x="966" y="54" width="120" height="34" rx="6" fill={PM.mavi} />
            <text x="1010" y="76" fill="#ffffff" fontSize="13" fontWeight="600"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">Send</text>

            {/* Sekme şeridi */}
            {sekmeler.map((ad, i) => {
                const x = 40 + i * 96
                const aktif = ad === 'Params'
                return (
                    <g key={ad}>
                        {aktif && <rect x={x - 12} y="104" width={ad.length * 7 + 26} height="24" rx="5" fill="#333333" />}
                        <text x={x} y="121" fill={aktif ? PM.metin : PM.soluk} fontSize="12.5"
                              fontFamily="ui-sans-serif, system-ui, sans-serif">{ad}</text>
                        {ad === 'Headers' && (
                            <text x={x + 58} y="121" fill={PM.soluk} fontSize="11"
                                  fontFamily="ui-sans-serif, system-ui, sans-serif">7</text>
                        )}
                    </g>
                )
            })}
            <line x1="16" y1="136" x2="1104" y2="136" stroke={PM.cizgi} />

            {/* Query Params tablosu — boş */}
            <text x="16" y="162" fill={PM.metin} fontSize="12.5"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">Query Params</text>
            <rect x="16" y="176" width="1088" height="30" fill={PM.panel} stroke={PM.cizgi} />
            <text x="46" y="196" fill={PM.metin} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Key</text>
            <text x="510" y="196" fill={PM.metin} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Value</text>
            <text x="950" y="196" fill={PM.metin} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Description</text>
            <rect x="16" y="206" width="1088" height="30" fill="none" stroke={PM.cizgi} />
            <text x="46" y="226" fill={PM.soluk} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Key</text>
            <text x="510" y="226" fill={PM.soluk} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Value</text>
            <text x="950" y="226" fill={PM.soluk} fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">Description</text>
            <line x1="500" y1="176" x2="500" y2="236" stroke={PM.cizgi} />
            <line x1="940" y1="176" x2="940" y2="236" stroke={PM.cizgi} />

            {/* Cevap şeridi */}
            <line x1="0" y1="300" x2="1120" y2="300" stroke={PM.cizgi} strokeWidth="1.5" />
            {altSekmeler.map((ad, i) => {
                const x = 30 + i * 88
                const aktif = ad === 'Body'
                return (
                    <g key={ad}>
                        <text x={x} y="330" fill={aktif ? PM.metin : PM.soluk} fontSize="12.5"
                              fontFamily="ui-sans-serif, system-ui, sans-serif">{ad}</text>
                        {aktif && <line x1={x - 4} y1="340" x2={x + 34} y2="340" stroke="#f97316" strokeWidth="2" />}
                        {ad === 'Headers' && (
                            <text x={x + 56} y="330" fill={PM.soluk} fontSize="11"
                                  fontFamily="ui-sans-serif, system-ui, sans-serif">12</text>
                        )}
                    </g>
                )
            })}

            {/* Ölçüm: status · süre · boyut — sayfanın asıl kanıtı bu satır */}
            <rect x="852" y="313" width="72" height="22" rx="4" fill={PM.yesilBg} />
            <text x="864" y="329" fill={PM.yesil} fontSize="12.5" fontWeight="700"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">200 OK</text>
            <text x="938" y="329" fill={PM.metin} fontSize="12.5"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">· 35 ms</text>
            <text x="1006" y="329" fill={PM.metin} fontSize="12.5"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">· 638 B</text>

            {/* Gövde biçimi seçicisi */}
            <rect x="16" y="356" width="86" height="26" rx="5" fill={PM.panel} stroke={PM.cizgi} />
            <text x="30" y="374" fill={PM.metin} fontSize="12"
                  fontFamily="ui-monospace, 'JetBrains Mono', monospace">{'{ } JSON'}</text>
            <text x="124" y="374" fill={PM.soluk} fontSize="12"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">▷ Preview</text>

            {/* JSON gövdesi */}
            {satirlar.map((parcalar, i) => {
                const y = 412 + i * 24
                let x = 66
                return (
                    <g key={i}>
                        <text x="34" y={y} fill={PM.soluk} fontSize="12.5" textAnchor="end"
                              fontFamily="ui-monospace, 'JetBrains Mono', monospace">{i + 1}</text>
                        {parcalar.map(([metin, renk], j) => {
                            const el = (
                                <text key={j} x={x} y={y} fill={renk} fontSize="13"
                                      fontFamily="ui-monospace, 'JetBrains Mono', monospace"
                                      xmlSpace="preserve">{metin}</text>
                            )
                            // Monospace: 13px ≈ 7.8px genişlik. Konumu elle
                            // ilerletmek, tspan zincirine göre hem daha kısa
                            // hem tarayıcılar arasında daha kararlı.
                            x += metin.length * 7.8
                            return el
                        })}
                    </g>
                )
            })}
        </svg>
    )
}

const CALLOUT_TONES = {
    warning: { emoji: '⚠️', border: 'border-amber-500/60', bg: 'bg-amber-500/10', title: 'text-amber-300' },
    insight: { emoji: '💡', border: 'border-sky-500/60', bg: 'bg-sky-500/10', title: 'text-sky-300' },
}

function Block({ block, isTr, darkMode }) {
    const body = darkMode ? 'text-slate-300' : 'text-slate-700'
    const heading = darkMode ? 'text-slate-100' : 'text-slate-900'

    switch (block.type) {
        case 'why':
            return (
                <div className={`my-4 rounded-xl border-l-4 border-indigo-500 py-3 pl-4 pr-3 ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
                    <p className={`mb-1 text-sm font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                        {tx(block.title, isTr)}
                    </p>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                </div>
            )

        case 'substep':
            return (
                <div className="my-5">
                    <h3 className={`mb-1.5 text-base font-bold ${heading}`}>{tx(block.title, isTr)}</h3>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                    {block.code && (
                        <CodeBlock code={tx(block.code, isTr)} language={block.language || 'bash'} darkMode={darkMode} />
                    )}
                </div>
            )

        case 'callout': {
            const tone = CALLOUT_TONES[block.tone] || CALLOUT_TONES.insight
            return (
                <div className={`my-4 rounded-xl border ${tone.border} ${tone.bg} p-3 md:p-4`}>
                    <p className={`mb-1 text-sm font-bold ${tone.title}`}>
                        {tone.emoji} {tx(block.title, isTr)}
                    </p>
                    <p className={`text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                </div>
            )
        }

        case 'table':
            return (
                <div className="my-4">
                    {block.title && <h3 className={`mb-2 text-base font-bold ${heading}`}>{tx(block.title, isTr)}</h3>}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[420px] border-collapse text-sm">
                            <thead>
                                <tr className={darkMode ? 'bg-slate-800' : 'bg-slate-100'}>
                                    {tx(block.headers, isTr).map((h) => (
                                        <th key={h} className={`border px-3 py-2 text-left font-semibold ${darkMode ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-800'}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.rows.map((row, ri) => (
                                    <tr key={ri} className={ri % 2 ? (darkMode ? 'bg-slate-900/40' : 'bg-slate-50') : ''}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className={`border px-3 py-2 align-top ${darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}>
                                                {tx(cell, isTr)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )

        // Hazır SQL paketinin dizini. Rehber paketi nasıl KOŞTURACAĞINI anlatıyordu
        // ama içinde ne olduğunu hiç göstermiyordu; 30 sorgu ancak dosyayı açan
        // kişiye görünüyordu. Her satır sorgunun neyi incelediğini söyler —
        // hangi iş kuralına ya da story'ye denk düştüğünü BİLEREK söylemez:
        // o bağı kurmak testi yazan kişinin işidir.
        case 'sqlPack':
            return (
                <div className="my-4 space-y-3" data-testid="sql-pack">
                    {block.title && <h3 className={`text-base font-bold ${heading}`}>🗄️ {tx(block.title, isTr)}</h3>}
                    {block.intro && <p className={`text-sm leading-relaxed ${body}`}>{tx(block.intro, isTr)}</p>}
                    {SQL_PACK_GROUPS.map((grup) => (
                        <div
                            key={grup.id}
                            className={`overflow-hidden rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}
                        >
                            <div className={`flex flex-wrap items-baseline gap-2 border-b px-3 py-2 ${darkMode ? 'border-slate-700 bg-slate-800/70' : 'border-slate-200 bg-slate-100'}`}>
                                <span className={`font-mono text-xs font-bold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>{grup.id}</span>
                                <span className={`text-sm font-bold ${heading}`}>{tx(grup.title, isTr)}</span>
                                <span className={`text-[11px] ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                    {grup.queries.length} {isTr ? 'sorgu' : 'queries'}
                                </span>
                            </div>
                            <p className={`px-3 pt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {tx(grup.purpose, isTr)}
                            </p>
                            <ul className="space-y-1.5 px-3 py-2.5">
                                {grup.queries.map((q) => (
                                    <li key={q.id} data-testid={`sql-pack-${q.id}`} className={`flex gap-2 text-sm leading-relaxed ${body}`}>
                                        <span className={`mt-0.5 shrink-0 font-mono text-xs font-bold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                                            {q.id}
                                        </span>
                                        <span className="min-w-0">
                                            {tx(q.bakar, isTr)}
                                            {q.rapor && (
                                                <span className={`ml-1.5 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                                    darkMode ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {isTr ? 'rapor' : 'report'}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )

        // Arayüzde sırayla yapılacak tıklamalar. Düz metinde "şuraya tıkla, sonra
        // şuraya" cümleleri birbirine karışıyordu; numaralı liste sırayı görünür
        // kılıyor ve kullanıcı nerede kaldığını kaybetmiyor.
        case 'clickpath':
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}>
                    {block.title && (
                        <p className={`mb-2.5 text-sm font-bold ${heading}`}>👉 {tx(block.title, isTr)}</p>
                    )}
                    <ol className="space-y-2">
                        {block.items.map((item, i) => (
                            <li key={i} className={`flex gap-2.5 text-sm leading-relaxed ${body}`}>
                                <span
                                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'}`}
                                    aria-hidden="true"
                                >
                                    {i + 1}
                                </span>
                                <span>{tx(item, isTr)}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )

        // İndirilebilir paketler. Bunlar depoda AYLARDIR duruyordu ama siteden
        // hiçbir yere bağlı değildi; üretmek yetmiyor, ulaşılabilir olması
        // gerekiyor. Dosyalar build sırasında kaynaktan üretilir
        // (scripts/build-qa-shop-downloads.mjs), elle kopyalanmaz.
        case 'downloads':
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}>
                    {block.title && (
                        <p className={`mb-1 text-sm font-bold ${heading}`}>⬇️ {tx(block.title, isTr)}</p>
                    )}
                    {block.content && (
                        <p className={`mb-3 text-sm leading-relaxed ${body}`}>{tx(block.content, isTr)}</p>
                    )}
                    <ul className="space-y-2">
                        {block.items.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} download
                                   data-testid={`indir-${item.id}`}
                                   className={`block rounded-lg border px-3 py-2 transition ${
                                       darkMode ? 'border-slate-700 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-500'}`}>
                                    <span className="block text-sm font-semibold text-indigo-400">{tx(item.label, isTr)}</span>
                                    <span className={`mt-0.5 block text-xs leading-relaxed ${body}`}>{tx(item.note, isTr)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )

        // Tek ekran görüntüsü: "gerçekten çalışıyor" anını gösterir.
        // Yordam rehberinde on adım okuyup hiç sonuç görmemek, kullanıcının
        // yarıda bıraktığı yerdir; burada beklenen ekran bir kez gösteriliyor.
        case 'postmanEkrani':
            return (
                <figure className="my-4">
                    <div className={`overflow-x-auto rounded-xl border p-2 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-slate-900'}`}>
                        <PostmanEkrani isTr={isTr} />
                    </div>
                    <figcaption data-testid="postman-ekrani-aciklama"
                                className={`mt-2 text-xs leading-relaxed ${body}`}>
                        {tx(block.caption, isTr)}
                    </figcaption>
                </figure>
            )

        case 'checklist':
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-emerald-600/50 bg-emerald-500/10' : 'border-emerald-300 bg-emerald-50'}`}>
                    <p className={`mb-2 text-sm font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {tx(block.title, isTr)}
                    </p>
                    <ul className="space-y-1.5">
                        {block.items.map((item, i) => (
                            <li key={i} className={`flex gap-2 text-sm leading-relaxed ${body}`}>
                                <span className="shrink-0 text-emerald-500">✓</span>
                                <span>{tx(item, isTr)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )

        default:
            return null
    }
}

export default function QaShopSetupPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()

    // Derin bağlantı: /qa-shop-setup#step-1-docker doğrudan o adıma insin.
    useHashKaydir()
    const isTr = language === 'tr'
    const { meta, steps, next } = qaShopSetupData

    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-10">

                <QaShopGecis aktif="setup" isTr={isTr} darkMode={darkMode} />

                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(meta.title, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(meta.subtitle, isTr)}
                    </p>
                </header>

                {/* İzolasyon beyanı: pratik stack'i sitenin kendi backend'inden ayrıdır.
                    Sayfanın en üstünde duruyor çünkü bu bir detay değil, temel kısıt. */}
                <div
                    data-testid="qa-shop-setup-isolation"
                    className={`mb-8 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-slate-700 bg-slate-800/60' : 'border-slate-300 bg-slate-100'}`}
                >
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        🔒 {tx(meta.isolationNote, isTr)}
                    </p>
                </div>

                {/* Yol haritası: dört adımın hangi sırayla neyi kazandırdığı.
                    Uzun bir yordam rehberinde okuyucunun "kaç adım var, şu an
                    neredeyim" sorusuna sayfanın başında cevap vermek gerekiyor. */}
                {meta.roadmap && (
                    <div className="mb-8" data-testid="qa-shop-setup-roadmap">
                        <h2 className="mb-3 text-lg font-bold">{tx(meta.roadmap.title, isTr)}</h2>
                        <ol className="grid gap-2 md:grid-cols-2">
                            {meta.roadmap.items.map((item, i) => (
                                <li
                                    key={i}
                                    className={`flex gap-3 rounded-xl border p-3 ${card}`}
                                >
                                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                                    <div>
                                        <p className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                            {i + 1}. {tx(item.label, isTr)}
                                        </p>
                                        <p className={`mt-0.5 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {tx(item.result, isTr)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {steps.map((step) => (
                    <section
                        key={step.id}
                        id={step.id}
                        data-testid={`practice-step-${step.number}`}
                        className={`mb-8 rounded-2xl border p-4 md:p-6 ${card}`}
                    >
                        <div className="mb-3 flex items-start gap-3">
                            <span
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-lg font-bold text-white"
                                aria-hidden="true"
                            >
                                {step.number}
                            </span>
                            <div>
                                {/* Adım başlığının altında "Sonunda: ... olacaksın"
                                    özeti vardı; kullanıcı isteğiyle kaldırıldı.
                                    Adımın kendisi zaten ne yapılacağını anlatıyor. */}
                                <h2 className="text-lg font-bold md:text-xl">
                                    {step.icon} {tx(step.title, isTr)}
                                </h2>
                            </div>
                        </div>

                        {step.blocks.map((block, i) => (
                            <Block key={i} block={block} isTr={isTr} darkMode={darkMode} />
                        ))}
                    </section>
                ))}

                <section className={`mb-10 rounded-2xl border border-dashed p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}>
                    <h2 className="mb-2 text-lg font-bold">{tx(next.title, isTr)}</h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {tx(next.content, isTr)}
                    </p>
                </section>
            </main>

            <QaShopHizliGecis aktif="setup" isTr={isTr} darkMode={darkMode} />
        </div>
    )
}
