// src/components/QaShopSpecPage.jsx — /qa-shop-spec
//
// QA Shop ürün analizi + user story'ler. Test yazacak kişinin şartnamesi.
//
// TopicPage KULLANILMAZ: bu bir ders sayfası değil, bir referans belgedir.
// TopicPage her sekmede video + animasyon + sandbox yükümlülüğü doğururdu ve
// bir şartnamede bunların hiçbiri anlamlı olmazdı. Sayfa kabuğu
// QaShopSetupPage kalıbını izler (TopicHeader + ScrollProgressBar +
// useKaranlikMod + sabit ana sayfa butonu).
//
// Story filtreleri BİLİNÇLİ olarak URL'e yazılmıyor: filtre bir okuma
// kolaylığı, paylaşılacak bir durum değil. Adres çubuğunu kirletmek yerine
// bölüm bağlantıları (#user-stories) paylaşılabilir tutuluyor.

import { useState, useEffect, useMemo } from 'react'
import useOdakModu from '../hooks/useOdakModu'
import useKaranlikMod from '../hooks/useKaranlikMod'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import TopicHeader from './TopicHeader'
import QaShopGecis from './QaShopGecis'
import QaShopHizliGecis from './QaShopHizliGecis'
import useHashKaydir from '../hooks/useHashKaydir'
import { qaShopSpecData } from '../data/qaShopSpecData'
// Sorgu ↔ kural/story eşlemesi yalnızca admin panellerinde render edilir;
// herkese açık dizin qaShopSqlPackData.js'te ve kurulum rehberinde.
import { SQL_CHECKS_BY_RULE, SQL_CHECKS_BY_STORY } from '../data/qaShopSqlMap'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

// ─── Renk tonları ───────────────────────────────────────────────────────────
// Tek yerde tutuluyor: her kart tipinin kendi renk sözlüğü olsaydı sayfa
// zamanla birbirine benzemeyen bir yamalı bohçaya dönerdi.
const TONES = {
    sky: { text: 'text-sky-300', textLight: 'text-sky-700', bg: 'bg-sky-500/10', bgLight: 'bg-sky-50', border: 'border-sky-500/50', borderLight: 'border-sky-300', solid: 'bg-sky-500' },
    indigo: { text: 'text-indigo-300', textLight: 'text-indigo-700', bg: 'bg-indigo-500/10', bgLight: 'bg-indigo-50', border: 'border-indigo-500/50', borderLight: 'border-indigo-300', solid: 'bg-indigo-500' },
    violet: { text: 'text-violet-300', textLight: 'text-violet-700', bg: 'bg-violet-500/10', bgLight: 'bg-violet-50', border: 'border-violet-500/50', borderLight: 'border-violet-300', solid: 'bg-violet-500' },
    emerald: { text: 'text-emerald-300', textLight: 'text-emerald-700', bg: 'bg-emerald-500/10', bgLight: 'bg-emerald-50', border: 'border-emerald-500/50', borderLight: 'border-emerald-300', solid: 'bg-emerald-500' },
    amber: { text: 'text-amber-300', textLight: 'text-amber-700', bg: 'bg-amber-500/10', bgLight: 'bg-amber-50', border: 'border-amber-500/50', borderLight: 'border-amber-300', solid: 'bg-amber-500' },
    rose: { text: 'text-rose-300', textLight: 'text-rose-700', bg: 'bg-rose-500/10', bgLight: 'bg-rose-50', border: 'border-rose-500/50', borderLight: 'border-rose-300', solid: 'bg-rose-500' },
    teal: { text: 'text-teal-300', textLight: 'text-teal-700', bg: 'bg-teal-500/10', bgLight: 'bg-teal-50', border: 'border-teal-500/50', borderLight: 'border-teal-300', solid: 'bg-teal-500' },
}
const tone = (name) => TONES[name] || TONES.sky

const DIFFICULTY = {
    basic: { emoji: '🟢', tone: 'emerald', label: { tr: 'Başlangıç', en: 'Basic' } },
    intermediate: { emoji: '🟡', tone: 'amber', label: { tr: 'Orta', en: 'Intermediate' } },
    advanced: { emoji: '🔴', tone: 'rose', label: { tr: 'İleri', en: 'Advanced' } },
}

const LAYER_TONES = { UI: 'violet', API: 'indigo', DB: 'sky' }

const UI_TEXT = {
    filterDifficulty: { tr: 'Zorluk', en: 'Difficulty' },
    filterLayer: { tr: 'Katman', en: 'Layer' },
    all: { tr: 'Hepsi', en: 'All' },
    showing: { tr: 'gösteriliyor', en: 'shown' },
    noMatch: { tr: 'Bu filtreyle eşleşen story yok. Filtreyi genişlet.', en: 'No story matches this filter. Widen the filter.' },
    criteria: { tr: 'Kabul kriterleri', en: 'Acceptance criteria' },
    endpoints: { tr: 'İlgili endpoint\'ler', en: 'Related endpoints' },
    testData: { tr: 'Test verisi', en: 'Test data' },
    adminOnly: { tr: 'Yalnızca admin — teknik döküm', en: 'Admin only — technical breakdown' },
    criteriaTechnical: { tr: 'Teknik kabul kriterleri', en: 'Technical acceptance criteria' },
    rule: { tr: 'Kural', en: 'Rule' },
    verify: { tr: 'Nasıl doğrulanır', en: 'How to verify' },
    breaksRule: { tr: 'Bu kuralı kıran anahtar', en: 'Flag that breaks this rule' },
    layers: { tr: 'Test katmanı', en: 'Test layer' },
    jump: { tr: 'Bölümler', en: 'Sections' },
    catches: { tr: 'Yakaladığı hata sınıfı', en: 'Bug class it catches' },
    legend: { tr: 'Okuma anahtarı', en: 'Legend' },
    sqlChecks: { tr: 'Veri katmanından gören sorgular', en: 'Queries that see this from the data layer' },
    sqlChecksNone: {
        tr: 'Hazır pakette bu kapsamı gören sorgu yok — bu kural için SQL kontrolünü sıfırdan yazmak gerekir.',
        en: 'The ready pack has no query covering this — the SQL check for this rule has to be written from scratch.',
    },
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


// ─── Satır içi kod ──────────────────────────────────────────────────────────
// İçerikte `placed`, `COUPON_EXPIRED` gibi teknik değerler ters tırnak içinde
// yazılıyor. Bu renderer markdown İŞLEMEZ, dolayısıyla o tırnaklar ekrana
// olduğu gibi basılıyordu — tabloda "`placed` siparişi öde" görünüyordu.
// Tam bir markdown ayrıştırıcısı eklemek bu sayfa için fazla; tek ihtiyaç
// duyulan satır içi kod, o da tek geçişte çözülüyor.
function InlineText({ children }) {
    const raw = typeof children === 'string' ? children : String(children ?? '')
    if (!raw.includes('`')) return raw
    // Tek sayılı parçalar tırnak İÇİ, çift sayılı parçalar dışıdır.
    const parts = raw.split('`')
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1
                    ? (
                        <code
                            key={i}
                            className="rounded bg-slate-500/20 px-1 py-0.5 font-mono text-[0.92em]"
                        >
                            {part}
                        </code>
                    )
                    : part,
            )}
        </>
    )
}

// ─── Büyük resim: üç katman akışı (animasyonlu) ─────────────────────────────
// Animasyon SÜS DEĞİL: paket arayüzden çıkıp servise, oradan veritabanına
// gider ve geri döner — yani sayfanın anlattığı "bir tıklama üç katmandan
// geçer" cümlesinin görsel karşılığı. Dış kütüphane yok, saf CSS.
//
// `prefers-reduced-motion` saygı görüyor: hareketi azaltılmış ayarda paket
// sabit durur, kutular ve metin aynen okunur.
const FLOW_CSS = `
@keyframes qsFlowTravel {
  0%   { left: 4%;  opacity: 0; }
  8%   { opacity: 1; }
  46%  { left: 48%; opacity: 1; }
  54%  { left: 48%; opacity: 1; }
  92%  { left: 90%; opacity: 1; }
  100% { left: 90%; opacity: 0; }
}
@keyframes qsPulse {
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 currentColor; }
  50%      { transform: scale(1.06); box-shadow: 0 0 0 6px transparent; }
}
.qs-packet { animation: qsFlowTravel 5.4s ease-in-out infinite; }
.qs-node-0 { animation: qsPulse 5.4s ease-in-out infinite; }
.qs-node-1 { animation: qsPulse 5.4s ease-in-out infinite 1.8s; }
.qs-node-2 { animation: qsPulse 5.4s ease-in-out infinite 3.6s; }
@media (prefers-reduced-motion: reduce) {
  .qs-packet { animation: none; left: 48%; }
  .qs-node-0, .qs-node-1, .qs-node-2 { animation: none; }
}
`

function LayerFlow({ flow, isTr, darkMode }) {
    return (
        <div className="my-5" data-testid="spec-layer-flow">
            <style>{FLOW_CSS}</style>
            <h3 className={`mb-3 text-base font-bold md:text-lg ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {tx(flow.title, isTr)}
            </h3>

            {/* Akış şeridi: üç düğüm + aralarında giden paket */}
            <div className={`relative overflow-hidden rounded-xl border px-3 py-6 md:px-6 ${
                darkMode ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-white'
            }`}>
                {/* Ray */}
                <div className={`absolute left-[8%] right-[8%] top-1/2 h-[2px] -translate-y-1/2 ${
                    darkMode ? 'bg-slate-700' : 'bg-slate-300'
                }`} />
                {/* Giden istek */}
                <div
                    className="qs-packet pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-lg"
                    aria-hidden="true"
                >
                    📦
                </div>

                <div className="relative grid grid-cols-3 gap-2">
                    {flow.steps.map((s, i) => {
                        const t = tone(s.tone)
                        return (
                            <div key={s.key} className="flex flex-col items-center text-center">
                                <div
                                    className={`qs-node-${i} grid h-12 w-12 place-items-center rounded-full border-2 text-xl md:h-14 md:w-14 ${
                                        darkMode ? `${t.border} ${t.bg} ${t.text}` : `${t.borderLight} ${t.bgLight} ${t.textLight}`
                                    }`}
                                >
                                    <span aria-hidden="true">{s.icon}</span>
                                </div>
                                <p className={`mt-2 font-mono text-xs font-bold ${darkMode ? t.text : t.textLight}`}>{s.key}</p>
                                <p className={`text-[11px] font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {tx(s.label, isTr)}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Adım açıklamaları — ekran okuyucu ve hareketsiz okuma için de tam metin */}
            <div className="mt-2.5 grid gap-2 md:grid-cols-3">
                {flow.steps.map((s) => {
                    const t = tone(s.tone)
                    return (
                        <p
                            key={s.key}
                            className={`rounded-lg border p-2.5 text-xs leading-relaxed ${
                                darkMode ? `${t.border} ${t.bg} text-slate-300` : `${t.borderLight} ${t.bgLight} text-slate-700`
                            }`}
                        >
                            <span className={`font-mono font-bold ${darkMode ? t.text : t.textLight}`}>{s.key}</span>
                            {' — '}
                            {tx(s.detail, isTr)}
                        </p>
                    )
                })}
            </div>

            <p className={`mt-2.5 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(flow.footnote, isTr)}
            </p>
        </div>
    )
}

function QuickStart({ quickStart, isTr, darkMode }) {
    return (
        <div className="my-5" data-testid="spec-quick-start">
            <h3 className={`mb-3 text-base font-bold md:text-lg ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                ⚡ {tx(quickStart.title, isTr)}
            </h3>
            <ol className="grid gap-2.5 md:grid-cols-2">
                {quickStart.steps.map((s) => (
                    <li
                        key={s.n}
                        className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}
                    >
                        <p className={`flex items-center gap-2 text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                            <span
                                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-[11px] font-bold text-white"
                                aria-hidden="true"
                            >
                                {s.n}
                            </span>
                            <span aria-hidden="true">{s.icon}</span>
                            {tx(s.title, isTr)}
                        </p>
                        <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {tx(s.detail, isTr)}
                        </p>
                        {s.code && (
                            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 px-2.5 py-1.5 text-[12px] text-slate-200">
                                <code className="font-mono">{s.code}</code>
                            </pre>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    )
}

function ComparisonTable({ comparison, isTr, darkMode }) {
    return (
        <div className="my-5" data-testid="spec-comparison">
            <h3 className={`mb-2 text-base font-bold md:text-lg ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {tx(comparison.title, isTr)}
            </h3>
            <p className={`mb-3 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {tx(comparison.intro, isTr)}
            </p>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                        <tr className={darkMode ? 'bg-slate-800' : 'bg-slate-100'}>
                            {tx(comparison.headers, isTr).map((h, i) => (
                                <th
                                    key={i}
                                    className={`border px-3 py-2 text-left font-semibold ${
                                        darkMode ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-800'
                                    } ${i === 2 ? (darkMode ? 'text-emerald-300' : 'text-emerald-700') : ''}`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparison.rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 ? (darkMode ? 'bg-slate-900/40' : 'bg-slate-50') : ''}>
                                {row.map((cell, ci) => (
                                    <td
                                        key={ci}
                                        className={`border px-3 py-2 align-top ${
                                            darkMode ? 'border-slate-700' : 'border-slate-300'
                                        } ${
                                            ci === 0
                                                ? (darkMode ? 'font-semibold text-slate-200' : 'font-semibold text-slate-800')
                                                : ci === 2
                                                    ? (darkMode ? 'text-emerald-200' : 'text-emerald-800')
                                                    : (darkMode ? 'text-slate-400' : 'text-slate-600')
                                        }`}
                                    >
                                        {ci === 2 ? '✅ ' : ci === 1 ? '— ' : ''}
                                        <InlineText>{tx(cell, isTr)}</InlineText>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// ─── Küçük parçalar ─────────────────────────────────────────────────────────
function Chip({ children, toneName, darkMode, mono = false }) {
    const t = tone(toneName)
    return (
        <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${mono ? 'font-mono' : ''} ${
                darkMode ? `${t.border} ${t.bg} ${t.text}` : `${t.borderLight} ${t.bgLight} ${t.textLight}`
            }`}
        >
            {children}
        </span>
    )
}

// Gherkin adım satırları: anahtar kelime İngilizce kalır (dilin kendi
// sözdizimi), adım METNİ çevrilir. Anahtar kelimeyi renklendirmek, göz
// akışının Given/When/Then yapısını tek bakışta görmesini sağlıyor.
const GHERKIN_KEYWORDS = ['Given', 'When', 'Then', 'And', 'But']

function GherkinLines({ text, darkMode }) {
    const lines = String(text).split('\n').filter((l) => l.trim())
    return (
        <div className="space-y-1">
            {lines.map((line, i) => {
                const trimmed = line.trim()
                const kw = GHERKIN_KEYWORDS.find((k) => trimmed.startsWith(k + ' '))
                if (!kw) {
                    return (
                        <p key={i} className={`text-[13px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {trimmed}
                        </p>
                    )
                }
                const rest = trimmed.slice(kw.length + 1)
                const kwTone = kw === 'Given' ? 'sky' : kw === 'When' ? 'amber' : kw === 'Then' ? 'emerald' : 'violet'
                const t = tone(kwTone)
                return (
                    <p key={i} className="flex flex-wrap gap-x-1.5 text-[13px] leading-relaxed">
                        <span className={`font-mono font-bold ${darkMode ? t.text : t.textLight}`}>{kw}</span>
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{rest}</span>
                    </p>
                )
            })}
        </div>
    )
}

function StatCards({ cards, isTr, darkMode }) {
    return (
        <div className="mb-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3" data-testid="spec-stat-cards">
            {cards.map((c, i) => {
                const t = tone(c.tone)
                return (
                    <div
                        key={i}
                        className={`rounded-xl border p-3 text-center md:p-4 ${darkMode ? `${t.border} ${t.bg}` : `${t.borderLight} ${t.bgLight}`}`}
                    >
                        <div className="text-2xl" aria-hidden="true">{c.icon}</div>
                        <div className={`mt-1 text-2xl font-extrabold md:text-3xl ${darkMode ? t.text : t.textLight}`}>{c.value}</div>
                        <div className={`mt-0.5 text-[11px] leading-tight md:text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {tx(c.label, isTr)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ─── Veri modeli haritası (inline SVG) ──────────────────────────────────────
// Tablo adları teknik terimdir, çevrilmez. Dış bir diyagram kütüphanesi
// KULLANILMAZ — diyagram gerekiyorsa inline SVG kuralı geçerli.
const ENTITY_BOXES = [
    { id: 'sandbox', x: 320, y: 8, w: 110, h: 30, tone: 'rose' },
    { id: 'users', x: 40, y: 70, w: 100, h: 30, tone: 'violet' },
    { id: 'products', x: 470, y: 70, w: 100, h: 30, tone: 'emerald' },
    { id: 'carts', x: 40, y: 130, w: 100, h: 30, tone: 'violet' },
    { id: 'product_variants', x: 450, y: 130, w: 140, h: 30, tone: 'emerald' },
    { id: 'cart_items', x: 200, y: 130, w: 110, h: 30, tone: 'sky' },
    { id: 'orders', x: 40, y: 195, w: 100, h: 30, tone: 'indigo' },
    { id: 'inventory', x: 470, y: 195, w: 100, h: 30, tone: 'amber' },
    { id: 'order_items', x: 200, y: 195, w: 110, h: 30, tone: 'sky' },
    { id: 'payments', x: 40, y: 258, w: 100, h: 28, tone: 'indigo' },
    { id: 'shipments', x: 155, y: 258, w: 100, h: 28, tone: 'indigo' },
    { id: 'addresses', x: 270, y: 258, w: 100, h: 28, tone: 'violet' },
    { id: 'reviews', x: 385, y: 258, w: 90, h: 28, tone: 'emerald' },
    { id: 'coupons', x: 490, y: 258, w: 90, h: 28, tone: 'amber' },
]

const ENTITY_LINKS = [
    ['users', 'carts'], ['carts', 'cart_items'], ['cart_items', 'product_variants'],
    ['products', 'product_variants'], ['product_variants', 'inventory'],
    ['users', 'orders'], ['orders', 'order_items'], ['order_items', 'product_variants'],
    ['orders', 'payments'], ['orders', 'shipments'], ['users', 'addresses'],
    ['products', 'reviews'],
]

const SVG_TONE_HEX = {
    sky: '#0ea5e9', indigo: '#6366f1', violet: '#8b5cf6',
    emerald: '#10b981', amber: '#f59e0b', rose: '#f43f5e',
}

function EntityMap({ isTr, darkMode }) {
    const boxById = useMemo(() => Object.fromEntries(ENTITY_BOXES.map((b) => [b.id, b])), [])
    const lineColor = darkMode ? '#475569' : '#cbd5e1'
    const labelColor = darkMode ? '#e2e8f0' : '#1e293b'

    return (
        <div className="my-4" data-testid="spec-entity-map">
            <div className={`overflow-x-auto rounded-xl border p-2 md:p-3 ${darkMode ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-white'}`}>
                <svg viewBox="0 0 620 300" className="h-auto w-full min-w-[560px]" role="img"
                    aria-label={isTr ? 'QA Shop veri modeli: tablolar ve aralarındaki bağlar' : 'QA Shop data model: tables and their relations'}>
                    {/* Bağlar önce çizilir: kutuların ARKASINDA kalsınlar */}
                    {ENTITY_LINKS.map(([from, to], i) => {
                        const a = boxById[from]
                        const b = boxById[to]
                        if (!a || !b) return null
                        return (
                            <line
                                key={i}
                                x1={a.x + a.w / 2} y1={a.y + a.h / 2}
                                x2={b.x + b.w / 2} y2={b.y + b.h / 2}
                                stroke={lineColor} strokeWidth="1.5"
                            />
                        )
                    })}
                    {/* sandbox her satirin sahibi: kesikli cizgi ile ayri gosteriliyor */}
                    {['users', 'products', 'coupons'].map((id) => {
                        const b = boxById[id]
                        const s = boxById.sandbox
                        return (
                            <line key={`sb-${id}`}
                                x1={s.x + s.w / 2} y1={s.y + s.h}
                                x2={b.x + b.w / 2} y2={b.y}
                                stroke={SVG_TONE_HEX.rose} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7"
                            />
                        )
                    })}
                    {ENTITY_BOXES.map((b) => {
                        const hex = SVG_TONE_HEX[b.tone]
                        return (
                            <g key={b.id}>
                                <rect
                                    x={b.x} y={b.y} width={b.w} height={b.h} rx="6"
                                    fill={darkMode ? `${hex}26` : `${hex}1a`}
                                    stroke={hex} strokeWidth="1.5"
                                />
                                <text
                                    x={b.x + b.w / 2} y={b.y + b.h / 2 + 4}
                                    textAnchor="middle" fill={labelColor}
                                    fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600"
                                >
                                    {b.id}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>
            <p className={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isTr
                    ? 'Kesikli kırmızı çizgiler her satırın hangi veri alanına ait olduğunu gösterir: sistemdeki HER tablo bir veri alanı kimliği taşır, bu yüzden iki kullanıcının verisi asla karışmaz. Fiyatın products değil product_variants tablosunda durduğuna dikkat et — beden değişince fiyat da değişiyor.'
                    : 'The dashed red lines show which data area each row belongs to: EVERY table in the system carries a data-area id, which is why two users\' data never mixes. Note that price lives in product_variants rather than products — the price changes with the size.'}
            </p>
        </div>
    )
}

// ─── Sipariş durum makinesi (inline SVG) ────────────────────────────────────
function StateMachine({ states, transitions, isTr, darkMode }) {
    const byId = useMemo(() => Object.fromEntries(states.map((s) => [s.id, s])), [states])
    const W = 120
    const H = 38
    const labelColor = darkMode ? '#e2e8f0' : '#1e293b'
    const arrowColor = darkMode ? '#94a3b8' : '#64748b'

    return (
        <div className="my-4" data-testid="spec-state-machine">
            <div className={`overflow-x-auto rounded-xl border p-2 md:p-3 ${darkMode ? 'border-slate-700 bg-slate-900/60' : 'border-slate-300 bg-white'}`}>
                <svg viewBox="0 0 760 215" className="h-auto w-full min-w-[600px]" role="img"
                    aria-label={isTr ? 'Sipariş durum makinesi: izinli geçişler' : 'Order state machine: allowed transitions'}>
                    <defs>
                        <marker id="spec-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} />
                        </marker>
                    </defs>

                    {transitions.map((t, i) => {
                        const a = byId[t.from]
                        const b = byId[t.to]
                        if (!a || !b) return null
                        const sameRow = a.y === b.y
                        const x1 = sameRow ? a.x + W : a.x + W / 2
                        const y1 = sameRow ? a.y + H / 2 : a.y + H
                        const x2 = sameRow ? b.x : b.x + W / 2
                        const y2 = sameRow ? b.y + H / 2 : b.y
                        const mx = (x1 + x2) / 2
                        const my = (y1 + y2) / 2
                        return (
                            <g key={i}>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={arrowColor} strokeWidth="1.6" markerEnd="url(#spec-arrow)" />
                                <text x={mx} y={my - 5} textAnchor="middle" fill={arrowColor}
                                    fontSize="10" fontFamily="ui-monospace, monospace">
                                    {tx(t.label, isTr)}
                                </text>
                            </g>
                        )
                    })}

                    {states.map((s) => {
                        const hex = SVG_TONE_HEX[s.tone]
                        return (
                            <g key={s.id}>
                                <rect x={s.x} y={s.y} width={W} height={H} rx="8"
                                    fill={darkMode ? `${hex}26` : `${hex}1a`} stroke={hex} strokeWidth="2" />
                                <text x={s.x + W / 2} y={s.y + H / 2 + 4} textAnchor="middle" fill={labelColor}
                                    fontSize="12" fontFamily="ui-monospace, monospace" fontWeight="700">
                                    {tx(s.label, isTr)}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>
            <p className={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isTr
                    ? 'Altı durum, altı izinli geçiş. Okla gösterilmeyen HER geçiş yasaktır — test yazarken en verimli alan budur, çünkü mutlu yol testleri buraya hiç uğramaz.'
                    : 'Six states, six allowed transitions. EVERY transition not drawn as an arrow is forbidden — this is the most productive surface for testing, because happy-path tests never come here.'}
            </p>
        </div>
    )
}

function LayerLegend({ block, isTr, darkMode }) {
    return (
        <div className="my-5" data-testid="spec-layer-legend">
            <h3 className={`mb-2.5 text-base font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {tx(block.title, isTr)}
            </h3>
            <div className="grid gap-2.5 md:grid-cols-3">
                {block.items.map((item) => {
                    const t = tone(item.tone)
                    return (
                        <div key={item.key}
                            className={`rounded-xl border p-3 ${darkMode ? `${t.border} ${t.bg}` : `${t.borderLight} ${t.bgLight}`}`}>
                            <p className={`flex items-center gap-2 text-sm font-bold ${darkMode ? t.text : t.textLight}`}>
                                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                                <span className="font-mono">{item.key}</span>
                                <span className="font-sans font-semibold">· {tx(item.label, isTr)}</span>
                            </p>
                            <p className={`mt-1.5 text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                <InlineText>{tx(item.what, isTr)}</InlineText>
                            </p>
                            <p className={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                <span className="font-semibold">{tx(UI_TEXT.catches, isTr)}: </span>
                                <InlineText>{tx(item.catches, isTr)}</InlineText>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Hazır SQL paketindeki hangi sorgunun bu kuralı/story'yi veri katmanından
// gördüğünü listeler. ADMIN PANELİ İÇİNDE çağrılır: bu bağı kurmak test edenin
// işidir, hazır verilirse veri katmanı doğrulaması bir okuma alıştırmasına döner.
function SqlChecksRow({ ids, isTr, darkMode }) {
    return (
        <div className="mt-2">
            <p className={`text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                {tx(UI_TEXT.sqlChecks, isTr)}
            </p>
            {ids && ids.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-1.5">
                    {ids.map((q) => (
                        <Chip key={q} toneName="teal" darkMode={darkMode} mono>🗄️ {q}</Chip>
                    ))}
                </div>
            ) : (
                <p className={`mt-0.5 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tx(UI_TEXT.sqlChecksNone, isTr)}
                </p>
            )}
        </div>
    )
}

function RuleCard({ block, isTr, darkMode }) {
    // "Nasıl doğrulanır" ve "bu kuralı kıran anahtar" cevap anahtarıdır:
    // ölçülmüş status kodunu, gerçek sayıları ve kusurun adını verir. Sahada
    // kural belgesi bunları taşımaz — kuralı okur, testi kendin kurarsın.
    // İçeriği yazan taraf doğruluğunu denetleyebilsin diye admin'e açık.
    const { isAdmin } = useAuth()
    const t = tone(block.tone)
    return (
        <div
            data-testid={`spec-rule-${block.id}`}
            className={`my-4 overflow-hidden rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}
        >
            <div className={`flex flex-wrap items-center gap-2 border-b px-3 py-2 md:px-4 ${darkMode ? `border-slate-700 ${t.bg}` : `border-slate-200 ${t.bgLight}`}`}>
                <span className={`grid h-6 w-8 shrink-0 place-items-center rounded font-mono text-[11px] font-bold text-white ${t.solid}`}>
                    {block.id}
                </span>
                <h3 className={`text-sm font-bold md:text-base ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tx(block.title, isTr)}
                </h3>
            </div>
            <div className="space-y-2.5 px-3 py-3 md:px-4">
                <div>
                    <p className={`text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.rule, isTr)}
                    </p>
                    <p className={`mt-0.5 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <InlineText>{tx(block.rule, isTr)}</InlineText>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.layers, isTr)}:
                    </span>
                    {block.layers.map((l) => (
                        <Chip key={l} toneName={LAYER_TONES[l]} darkMode={darkMode} mono>{l}</Chip>
                    ))}
                </div>

                {isAdmin && (
                    <details data-testid={`spec-admin-${block.id}`}
                             className={`rounded-lg border ${darkMode ? 'border-amber-500/40 bg-amber-500/5' : 'border-amber-300 bg-amber-50'}`}>
                        <summary data-testid={`spec-admin-ac-${block.id}`}
                                 className={`cursor-pointer px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                            👑 {tx(UI_TEXT.adminOnly, isTr)}
                        </summary>
                        <div className="space-y-2 px-2.5 pb-2.5">
                            <div>
                                <p className={`text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                    {tx(UI_TEXT.verify, isTr)}
                                </p>
                                <p className={`mt-0.5 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <InlineText>{tx(block.verify, isTr)}</InlineText>
                                </p>
                            </div>
                            {block.breaks.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                        {tx(UI_TEXT.breaksRule, isTr)}:
                                    </span>
                                    {block.breaks.map((b) => (
                                        <Chip key={b} toneName="rose" darkMode={darkMode} mono>🐞 {b}</Chip>
                                    ))}
                                </div>
                            )}
                            <SqlChecksRow ids={SQL_CHECKS_BY_RULE[block.id]} isTr={isTr} darkMode={darkMode} />
                        </div>
                    </details>
                )}
            </div>
        </div>
    )
}

function UserStoryCard({ block, isTr, darkMode }) {
    // Ayrıntılı döküm yalnızca içeriği yazan tarafa görünür. Prop olarak
    // taşımak yerine burada okunuyor: aradaki Block bileşeninin bu bilgiyle
    // hiçbir işi yok, ondan geçirmek gereksiz bağ kurardı.
    const { isAdmin } = useAuth()
    const d = DIFFICULTY[block.difficulty] || DIFFICULTY.basic
    const dt = tone(d.tone)
    return (
        <article
            data-testid={`spec-story-${block.id}`}
            data-difficulty={block.difficulty}
            data-layers={block.layers.join(',')}
            className={`my-4 overflow-hidden rounded-2xl border ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}
        >
            {/* Başlık şeridi */}
            <div className={`flex flex-wrap items-center gap-2 border-b px-3 py-2.5 md:px-4 ${darkMode ? 'border-slate-700 bg-slate-800/60' : 'border-slate-200 bg-slate-100'}`}>
                <span className="rounded bg-gradient-to-br from-indigo-500 to-sky-500 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    {block.id}
                </span>
                <Chip toneName={d.tone} darkMode={darkMode}>{d.emoji} {tx(d.label, isTr)}</Chip>
                <Chip toneName="sky" darkMode={darkMode}>{tx(block.theme, isTr)}</Chip>
                <span className="ml-auto flex flex-wrap gap-1.5">
                    {block.layers.map((l) => (
                        <Chip key={l} toneName={LAYER_TONES[l]} darkMode={darkMode} mono>{l}</Chip>
                    ))}
                </span>
            </div>

            <div className="px-3 py-3 md:px-4 md:py-4">
                <h3 className={`text-base font-bold md:text-lg ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tx(block.title, isTr)}
                </h3>

                {/* Story cümlesi: rol / istek / fayda */}
                <p className={`mt-2 rounded-lg border-l-4 py-2 pl-3 pr-2 text-sm italic leading-relaxed ${
                    darkMode ? `border-indigo-500 bg-indigo-500/10 text-slate-300` : 'border-indigo-400 bg-indigo-50 text-slate-700'
                }`}>
                    {tx(block.story, isTr)}
                </p>

                {/* Kabul kriterleri — sahada bir tester'ın eline geldiği hâliyle:
                    iş dilinde, tek cümlelik ifadeler. Beklenen status kodu, hata
                    sabiti ve alan adı BİLEREK yok; onları bulmak test edenin işi.
                    Ayrıntılı Given/When/Then sürümü aşağıda, admin'e açık. */}
                <div className="mt-3">
                    <p className={`mb-1.5 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.criteria, isTr)} ({block.acceptance.length})
                    </p>
                    <ul data-testid={`spec-acceptance-${block.id}`} className="space-y-1.5">
                        {block.acceptance.map((c, i) => (
                            <li key={i} className={`flex gap-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`} aria-hidden="true" />
                                <span className="min-w-0"><InlineText>{tx(c, isTr)}</InlineText></span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Yalnızca admin ────────────────────────────────────────
                    Given/When/Then dökümü, beklenen status kodları ve gerçek
                    test verisi. Bunlar sahada story'yle BİRLİKTE gelmez; test
                    edenin üreteceği iş çıktısıdır. İçeriği yazan taraf (admin)
                    doğruluğunu denetleyebilsin diye burada duruyor. */}
                {isAdmin && (
                    <details data-testid={`spec-admin-${block.id}`}
                             className={`mt-3 rounded-lg border ${darkMode ? 'border-amber-500/40 bg-amber-500/5' : 'border-amber-300 bg-amber-50'}`}>
                        <summary data-testid={`spec-admin-ac-${block.id}`}
                                 className={`cursor-pointer px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                            👑 {tx(UI_TEXT.adminOnly, isTr)}
                        </summary>

                        <div className="px-2.5 pb-2.5">
                            <p className={`mb-1.5 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                {tx(UI_TEXT.criteriaTechnical, isTr)} ({block.criteria.length})
                            </p>
                            <ol className="space-y-2">
                                {block.criteria.map((c, i) => (
                                    <li key={i}
                                        className={`rounded-lg border px-2.5 py-2 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-200 bg-white'}`}>
                                        <div className="flex gap-2">
                                            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                                                darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-300 text-slate-800'
                                            }`} aria-hidden="true">{i + 1}</span>
                                            <div className="min-w-0 flex-1">
                                                <GherkinLines text={tx(c, isTr)} darkMode={darkMode} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {block.testData && (
                                <div className="mt-3">
                                    <p className={`mb-1.5 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                        {tx(UI_TEXT.testData, isTr)} — {tx(block.testData.title, isTr)}
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[320px] border-collapse text-xs">
                                            <tbody>
                                                {block.testData.rows.map((row, ri) => (
                                                    <tr key={ri} className={ri % 2 ? (darkMode ? 'bg-slate-900/40' : 'bg-slate-50') : ''}>
                                                        <td className={`border px-2 py-1 font-mono font-semibold ${darkMode ? 'border-slate-700 text-sky-300' : 'border-slate-300 text-sky-700'}`}>
                                                            {tx(row[0], isTr)}
                                                        </td>
                                                        <td className={`border px-2 py-1 ${darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-300 text-slate-700'}`}>
                                                            <InlineText>{tx(row[1], isTr)}</InlineText>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <SqlChecksRow ids={SQL_CHECKS_BY_STORY[block.id]} isTr={isTr} darkMode={darkMode} />
                        </div>
                    </details>
                )}

                {/* Endpoint'ler + defect anahtarı */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.endpoints, isTr)}:
                    </span>
                    {block.endpoints.map((e) => (
                        <Chip key={e} toneName="indigo" darkMode={darkMode} mono>{e}</Chip>
                    ))}
                </div>

                {/* Kart burada biter — gerçek bir user story'de olduğu gibi.
                    Hangi defect'in bu kuralı kırdığı ve testi nasıl yazacağın
                    BİLEREK yazılmıyor: ikisi de story'yi alan kişinin üreteceği
                    iş çıktısıdır. Sahada da story'yle birlikte gelmezler.
                    (`breaks` ve `hint` alanları veride duruyor; kart onları
                    okumuyor.) */}
            </div>
        </article>
    )
}

const CALLOUT_TONES = {
    warning: { emoji: '⚠️', toneName: 'amber' },
    insight: { emoji: '💡', toneName: 'sky' },
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
                    <p className={`text-sm leading-relaxed ${body}`}><InlineText>{tx(block.content, isTr)}</InlineText></p>
                </div>
            )

        case 'text':
            return <p className={`my-3 text-sm leading-relaxed md:text-[15px] ${body}`}><InlineText>{tx(block.content, isTr)}</InlineText></p>

        case 'callout': {
            const c = CALLOUT_TONES[block.tone] || CALLOUT_TONES.insight
            const t = tone(c.toneName)
            return (
                <div className={`my-4 rounded-xl border p-3 md:p-4 ${darkMode ? `${t.border} ${t.bg}` : `${t.borderLight} ${t.bgLight}`}`}>
                    <p className={`mb-1 text-sm font-bold ${darkMode ? t.text : t.textLight}`}>
                        {c.emoji} {tx(block.title, isTr)}
                    </p>
                    <p className={`text-sm leading-relaxed ${body}`}><InlineText>{tx(block.content, isTr)}</InlineText></p>
                </div>
            )
        }

        case 'table':
            return (
                <div className="my-4">
                    {block.title && <h3 className={`mb-2 text-base font-bold ${heading}`}>{tx(block.title, isTr)}</h3>}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px] border-collapse text-sm">
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
                                                <InlineText>{tx(cell, isTr)}</InlineText>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )

        case 'layerLegend':
            return <LayerLegend block={block} isTr={isTr} darkMode={darkMode} />
        case 'entityMap':
            return <EntityMap isTr={isTr} darkMode={darkMode} />
        case 'stateMachine':
            return <StateMachine states={block.states} transitions={block.transitions} isTr={isTr} darkMode={darkMode} />
        case 'ruleCard':
            return <RuleCard block={block} isTr={isTr} darkMode={darkMode} />
        case 'userStory':
            return <UserStoryCard block={block} isTr={isTr} darkMode={darkMode} />
        default:
            return null
    }
}

export default function QaShopSpecPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useKaranlikMod()
    const [odakModu, setOdakModu] = useOdakModu()

    // Derin bağlantı: /qa-shop-spec#user-stories doğrudan o bölüme insin.
    useHashKaydir()
    const isTr = language === 'tr'
    const { meta, sections, next } = qaShopSpecData

    const [difficulty, setDifficulty] = useState('all')
    const [layer, setLayer] = useState('all')

    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    const storyCount = useMemo(
        () => sections.reduce((n, s) => n + s.blocks.filter((b) => b.type === 'userStory').length, 0),
        [sections],
    )

    const matches = (block) => {
        if (block.type !== 'userStory') return true
        if (difficulty !== 'all' && block.difficulty !== difficulty) return false
        if (layer !== 'all' && !block.layers.includes(layer)) return false
        return true
    }

    const shownStories = useMemo(
        () => sections.reduce((n, s) => n + s.blocks.filter((b) => b.type === 'userStory' && matches(b)).length, 0),
        [sections, difficulty, layer],
    )

    const filterBtn = (active) =>
        `min-h-[36px] rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
            active
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : darkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
        }`

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} focusMode={odakModu} setFocusMode={setOdakModu} />

            <main className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-10">
                {/* Geçiş şeridi başlıktan ÖNCE: sayfanın ne olduğunu okumadan
                    önce "çalışan uygulama nerede" sorusunun cevabı görünmeli. */}
                <QaShopGecis aktif="spec" isTr={isTr} darkMode={darkMode} />

                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(meta.title, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(meta.subtitle, isTr)}
                    </p>
                </header>

                {/* Ölçüm beyanı: bu sayfadaki kodların nereden geldiğini söyler.
                    En üstte duruyor çünkü sayfanın güvenilirlik iddiası bu. */}
                <div
                    data-testid="spec-measured-note"
                    className={`mb-6 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-emerald-600/50 bg-emerald-500/10' : 'border-emerald-300 bg-emerald-50'}`}
                >
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        ✅ {tx(meta.measuredNote, isTr)}
                    </p>
                </div>

                <StatCards cards={meta.statCards} isTr={isTr} darkMode={darkMode} />

                {/* ── BÜYÜK RESİM ──────────────────────────────────────────
                    Detay bölümlerinden ÖNCE gelir ve bilinçli olarak kısadır:
                    okuyucu 16 story'ye inmeden önce ne olduğunu, neden farklı
                    olduğunu ve nereden başlayacağını görmeli. Büyük resim
                    olmadan detaya başlayan kişi neyi okuduğunu bilmiyor. */}
                <section
                    data-testid="spec-big-picture"
                    className={`mb-8 rounded-2xl border p-4 md:p-6 ${card}`}
                >
                    <p className={`text-base leading-relaxed md:text-lg ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {tx(meta.bigPicture.pitch, isTr)}
                    </p>

                    <LayerFlow flow={meta.bigPicture.flow} isTr={isTr} darkMode={darkMode} />
                    <ComparisonTable comparison={meta.bigPicture.comparison} isTr={isTr} darkMode={darkMode} />
                    <QuickStart quickStart={meta.bigPicture.quickStart} isTr={isTr} darkMode={darkMode} />

                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            to="/qa-shop-setup"
                            data-testid="bigpicture-to-setup"
                            className="inline-flex min-h-[36px] items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            {isTr ? '🐳 Kurulumdan başla' : '🐳 Start with the setup'}
                        </Link>
                        <a
                            href="#user-stories"
                            data-testid="bigpicture-to-stories"
                            className={`inline-flex min-h-[36px] items-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                darkMode
                                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                            }`}
                        >
                            {isTr ? '📋 Doğrudan user story\'lere geç' : '📋 Jump straight to the user stories'}
                        </a>
                    </div>
                </section>

                {/* Bölüm atlama şeridi */}
                <nav className="mb-8" aria-label={tx(UI_TEXT.jump, isTr)} data-testid="spec-section-nav">
                    <p className={`mb-2 text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.jump, isTr)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                                    darkMode
                                        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <span aria-hidden="true">{s.icon}</span>
                                {tx(s.title, isTr)}
                            </a>
                        ))}
                        {/* SSS bölüm dizisinde değil (sayfanın sonunda ayrı bir
                            bölüm) ama en çok aranan sorular orada — şeride elle
                            ekleniyor ki kullanıcı sona kadar kaydırmak zorunda
                            kalmasın. */}
                        <a
                            href="#sss"
                            data-testid="spec-nav-faq"
                            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                                darkMode
                                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <span aria-hidden="true">❓</span>
                            {isTr ? 'Sık sorulan sorular' : 'Frequently asked questions'}
                        </a>
                    </div>
                </nav>

                {sections.map((section) => {
                    const hasStories = section.blocks.some((b) => b.type === 'userStory')
                    const visible = section.blocks.filter(matches)
                    return (
                        <section
                            key={section.id}
                            id={section.id}
                            data-testid={`spec-section-${section.id}`}
                            className={`mb-8 scroll-mt-20 rounded-2xl border p-4 md:p-6 ${card}`}
                        >
                            <div className="mb-3 flex items-start gap-3">
                                <span
                                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-lg font-bold text-white"
                                    aria-hidden="true"
                                >
                                    {section.number}
                                </span>
                                <div>
                                    {/* Bölüm başlığının altında "Sonunda: ... olacaksın"
                                        özeti vardı; kullanıcı isteğiyle kaldırıldı.
                                        Bölümün kendisi zaten ne anlattığını gösteriyor. */}
                                    <h2 className="text-lg font-bold md:text-xl">
                                        {section.icon} {tx(section.title, isTr)}
                                    </h2>
                                </div>
                            </div>

                            {/* Story filtreleri yalnızca story bölümünde */}
                            {hasStories && (
                                <div
                                    data-testid="spec-story-filters"
                                    className={`my-4 rounded-xl border p-3 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-slate-50'}`}
                                >
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {tx(UI_TEXT.filterDifficulty, isTr)}:
                                        </span>
                                        <button type="button" onClick={() => setDifficulty('all')}
                                            className={filterBtn(difficulty === 'all')} data-testid="filter-difficulty-all">
                                            {tx(UI_TEXT.all, isTr)}
                                        </button>
                                        {Object.entries(DIFFICULTY).map(([key, d]) => (
                                            <button key={key} type="button" onClick={() => setDifficulty(key)}
                                                className={filterBtn(difficulty === key)} data-testid={`filter-difficulty-${key}`}>
                                                {d.emoji} {tx(d.label, isTr)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {tx(UI_TEXT.filterLayer, isTr)}:
                                        </span>
                                        <button type="button" onClick={() => setLayer('all')}
                                            className={filterBtn(layer === 'all')} data-testid="filter-layer-all">
                                            {tx(UI_TEXT.all, isTr)}
                                        </button>
                                        {['UI', 'API', 'DB'].map((l) => (
                                            <button key={l} type="button" onClick={() => setLayer(l)}
                                                className={filterBtn(layer === l)} data-testid={`filter-layer-${l}`}>
                                                {l}
                                            </button>
                                        ))}
                                        <span className={`ml-auto text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                                            data-testid="spec-story-count">
                                            {shownStories} / {storyCount} {tx(UI_TEXT.showing, isTr)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {visible.map((block, i) => (
                                <Block key={i} block={block} isTr={isTr} darkMode={darkMode} />
                            ))}

                            {hasStories && shownStories === 0 && (
                                <p className={`my-6 text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                                    data-testid="spec-no-match">
                                    {tx(UI_TEXT.noMatch, isTr)}
                                </p>
                            )}
                        </section>
                    )
                })}

                {/* ── SIK SORULAN SORULAR ──────────────────────────────────
                    Buradaki sorular arama motoru şemasının da kaynağıdır.
                    Şema ile ekranda yazan metin AYNI olmak zorunda: kullanıcıya
                    görünmeyen bir soruyu şemaya koymak arama motoru
                    politikasını ihlal eder. Bu yüzden bölüm gerçekten
                    render ediliyor, yalnızca statik kabuğa yazılmıyor. */}
                <section
                    id="sss"
                    data-testid="spec-faq"
                    className={`mb-8 scroll-mt-20 rounded-2xl border p-4 md:p-6 ${card}`}
                >
                    <h2 className="mb-4 text-lg font-bold md:text-xl">
                        ❓ {isTr ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
                    </h2>
                    <div className="space-y-3">
                        {qaShopSpecData.faq.map((item, i) => (
                            <details
                                key={i}
                                open={i === 0}
                                data-testid={`spec-faq-${i}`}
                                className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700 bg-slate-800/40' : 'border-slate-300 bg-white'}`}
                            >
                                <summary className={`cursor-pointer text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                    {tx(item.q, isTr)}
                                </summary>
                                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {tx(item.a, isTr)}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className={`mb-10 rounded-2xl border border-dashed p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}>
                    <h2 className="mb-2 text-lg font-bold">{tx(next.title, isTr)}</h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {tx(next.content, isTr)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            to="/qa-shop-setup"
                            data-testid="spec-to-setup"
                            className="inline-flex min-h-[36px] items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            {isTr ? '🐳 Kurulum rehberini aç' : '🐳 Open the setup guide'}
                        </Link>
                        <Link
                            to="/qa-shop"
                            data-testid="spec-to-shop"
                            className={`inline-flex min-h-[36px] items-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                                darkMode
                                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                            }`}
                        >
                            {isTr ? '🛒 Pratik dükkânı aç' : '🛒 Open the practice shop'}
                        </Link>
                    </div>
                </section>
            </main>

            <QaShopHizliGecis aktif="spec" isTr={isTr} darkMode={darkMode} />
        </div>
    )
}
