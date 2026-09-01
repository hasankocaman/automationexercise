// src/components/QaShopBacklogPage.jsx — /qa-shop-backlog
//
// Gerçek bir şirketteki belge zinciri: gereksinim → analiz → epic →
// business story → frontend/backend story → test.
//
// TopicPage KULLANILMAZ: bu bir ders sayfası değil, bir çalışma belgesidir.
// Kabuk QaShopSpecPage kalıbını izler (TopicHeader + ScrollProgressBar +
// useKaranlikMod + useOdakModu + geçiş şeritleri).
//
// ⚠ Ortak başlık (TopicHeader) odak modu ve tema durumunu DIŞARIDAN ister;
// vermezsek düğme ekranda durur ama tıklanınca patlar. Bu, QA Shop
// sayfalarında bir kez gerçekten yaşandı — kancalar bu yüzden tek dosyada.
//
// Business story metinleri BURADA TUTULMAZ; şartname verisinden okunur.
// Kopyalasaydık şartname güncellendiğinde bu sayfa sessizce eskirdi.

import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useOdakModu from '../hooks/useOdakModu'
import useKaranlikMod from '../hooks/useKaranlikMod'
import useHashKaydir from '../hooks/useHashKaydir'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import TopicHeader from './TopicHeader'
import QaShopGecis from './QaShopGecis'
import QaShopHizliGecis from './QaShopHizliGecis'
import { qaShopBacklogData, businessStoryById } from '../data/qaShopBacklogData'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

const TONES = {
    sky: { text: 'text-sky-300', textLight: 'text-sky-700', bg: 'bg-sky-500/10', bgLight: 'bg-sky-50', border: 'border-sky-500/50', borderLight: 'border-sky-300' },
    indigo: { text: 'text-indigo-300', textLight: 'text-indigo-700', bg: 'bg-indigo-500/10', bgLight: 'bg-indigo-50', border: 'border-indigo-500/50', borderLight: 'border-indigo-300' },
    violet: { text: 'text-violet-300', textLight: 'text-violet-700', bg: 'bg-violet-500/10', bgLight: 'bg-violet-50', border: 'border-violet-500/50', borderLight: 'border-violet-300' },
    emerald: { text: 'text-emerald-300', textLight: 'text-emerald-700', bg: 'bg-emerald-500/10', bgLight: 'bg-emerald-50', border: 'border-emerald-500/50', borderLight: 'border-emerald-300' },
    amber: { text: 'text-amber-300', textLight: 'text-amber-700', bg: 'bg-amber-500/10', bgLight: 'bg-amber-50', border: 'border-amber-500/50', borderLight: 'border-amber-300' },
    rose: { text: 'text-rose-300', textLight: 'text-rose-700', bg: 'bg-rose-500/10', bgLight: 'bg-rose-50', border: 'border-rose-500/50', borderLight: 'border-rose-300' },
}
const tone = (name) => TONES[name] || TONES.sky

const KIND = {
    frontend: { emoji: '🖥️', tone: 'violet', label: { tr: 'Frontend', en: 'Frontend' } },
    backend: { emoji: '🔌', tone: 'indigo', label: { tr: 'Backend', en: 'Backend' } },
}

const DIFFICULTY = {
    basic: { emoji: '🟢', label: { tr: 'Başlangıç', en: 'Basic' } },
    intermediate: { emoji: '🟡', label: { tr: 'Orta', en: 'Intermediate' } },
    advanced: { emoji: '🔴', label: { tr: 'İleri', en: 'Advanced' } },
}

const UI_TEXT = {
    jump: { tr: 'Bölüme atla', en: 'Jump to section' },
    requirements: { tr: 'İş gereksinimleri', en: 'Business requirements' },
    epics: { tr: "Epic'ler ve story'ler", en: 'Epics and stories' },
    testerFlow: { tr: 'Test eden kişinin yolu', en: 'The testing path' },
    faq: { tr: 'Sık sorulan sorular', en: 'Frequently asked questions' },
    why: { tr: 'Neden önemli', en: 'Why it matters' },
    servesEpics: { tr: 'Hizmet ettiği epic', en: 'Serves epic' },
    fromRequirements: { tr: 'Geldiği gereksinim', en: 'From requirement' },
    acceptance: { tr: 'Kabul kriterleri', en: 'Acceptance criteria' },
    criteriaTechnical: { tr: 'Teknik kabul kriterleri', en: 'Technical acceptance criteria' },
    adminOnly: { tr: 'Yalnızca admin', en: 'Admin only' },
    endpoints: { tr: 'Endpoint', en: 'Endpoints' },
    screens: { tr: 'Ekran', en: 'Screens' },
    businessStory: { tr: 'Business story', en: 'Business story' },
    splitPending: {
        tr: 'Bu epic\'in frontend/backend bölünmesi henüz yazılmadı. Business story\'leri ve kabul kriterleri hazır; test etmeye buradan başlayabilirsin.',
        en: 'The frontend/backend split for this epic has not been written yet. Its business stories and acceptance criteria are ready, so you can start testing from here.',
    },
    splitFull: { tr: 'frontend + backend bölünmesi hazır', en: 'frontend + backend split ready' },
    openInSpec: { tr: 'Şartnamede aç', en: 'Open in the specification' },
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

function Chip({ children, toneName = 'sky', darkMode, mono = false }) {
    const t = tone(toneName)
    return (
        <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-semibold ${mono ? 'font-mono' : ''} ${
            darkMode ? `${t.border} ${t.bg} ${t.text}` : `${t.borderLight} ${t.bgLight} ${t.textLight}`
        }`}>
            {children}
        </span>
    )
}

function StatCards({ cards, isTr, darkMode }) {
    return (
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" data-testid="backlog-stats">
            {cards.map((c, i) => {
                const t = tone(c.tone)
                return (
                    <div key={i} className={`rounded-xl border p-3 text-center ${
                        darkMode ? `${t.border} ${t.bg}` : `${t.borderLight} ${t.bgLight}`
                    }`}>
                        <div className="text-xl" aria-hidden="true">{c.icon}</div>
                        <div className={`text-lg font-extrabold ${darkMode ? t.text : t.textLight}`}>{c.value}</div>
                        <div className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {tx(c.label, isTr)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// Zincir görseli — belgelerin birbirini nasıl doğurduğunu GÖSTERİR.
function ChainFlow({ chain, isTr, darkMode }) {
    return (
        <div className="mt-5" data-testid="backlog-chain">
            <p className={`mb-1 text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {tx(chain.title, isTr)}
            </p>
            <p className={`mb-3 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(chain.intro, isTr)}
            </p>
            <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
                {chain.steps.map((s, i) => {
                    const t = tone(s.tone)
                    return (
                        <li key={s.key} className="flex flex-1 items-stretch gap-2">
                            <div className={`flex-1 rounded-xl border p-2.5 ${
                                darkMode ? `${t.border} ${t.bg}` : `${t.borderLight} ${t.bgLight}`
                            }`}>
                                <div className={`text-sm font-bold ${darkMode ? t.text : t.textLight}`}>
                                    <span aria-hidden="true">{s.icon}</span> {tx(s.label, isTr)}
                                </div>
                                <p className={`mt-1 text-[11px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {tx(s.detail, isTr)}
                                </p>
                            </div>
                            {i < chain.steps.length - 1 && (
                                <span className={`hidden self-center text-lg md:inline ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} aria-hidden="true">→</span>
                            )}
                        </li>
                    )
                })}
            </ol>
            <p className={`mt-3 rounded-xl border-l-4 border-indigo-500 py-2 pl-3 pr-2 text-sm leading-relaxed ${
                darkMode ? 'bg-indigo-500/10 text-slate-300' : 'bg-indigo-50 text-slate-700'
            }`}>
                {tx(chain.closing, isTr)}
            </p>
        </div>
    )
}

function RequirementCard({ req, epicById, isTr, darkMode }) {
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    return (
        <article
            id={req.id}
            data-testid={`backlog-req-${req.id}`}
            className={`scroll-mt-20 rounded-xl border p-3 md:p-4 ${card}`}
        >
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <Chip toneName="amber" darkMode={darkMode} mono>{req.id}</Chip>
                <h3 className={`text-sm font-bold md:text-base ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tx(req.title, isTr)}
                </h3>
            </div>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {tx(req.need, isTr)}
            </p>
            <p className={`mt-2 text-[13px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <span className="font-semibold">{tx(UI_TEXT.why, isTr)}: </span>
                {tx(req.rationale, isTr)}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {tx(UI_TEXT.servesEpics, isTr)}:
                </span>
                {req.epics.map((eid) => (
                    <a key={eid} href={`#${eid}`} className="no-underline">
                        <Chip toneName={epicById[eid]?.tone || 'violet'} darkMode={darkMode} mono>
                            {eid} · {tx(epicById[eid]?.title, isTr)}
                        </Chip>
                    </a>
                ))}
            </div>
        </article>
    )
}

// Frontend / backend story kartı.
// `acceptance` herkese açık ve iş dilindedir; `criteria` admin'e açılır.
function ChildStoryCard({ child, isTr, darkMode }) {
    const { isAdmin } = useAuth()
    const k = KIND[child.kind]
    const t = tone(k.tone)
    const d = DIFFICULTY[child.difficulty] || DIFFICULTY.basic

    return (
        <article
            data-testid={`backlog-child-${child.id}`}
            data-kind={child.kind}
            className={`rounded-xl border p-3 ${darkMode ? `${t.border} bg-slate-900` : `${t.borderLight} bg-white`}`}
        >
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <Chip toneName={k.tone} darkMode={darkMode} mono>{child.id}</Chip>
                <Chip toneName={k.tone} darkMode={darkMode}>{k.emoji} {tx(k.label, isTr)}</Chip>
                <Chip toneName="sky" darkMode={darkMode}>{d.emoji} {tx(d.label, isTr)}</Chip>
            </div>

            <h5 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {tx(child.title, isTr)}
            </h5>

            <p className={`mt-1.5 text-[13px] italic leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(child.story, isTr)}
            </p>

            <div className="mt-2.5">
                <p className={`mb-1 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {tx(UI_TEXT.acceptance, isTr)} ({child.acceptance.length})
                </p>
                <ul data-testid={`backlog-acceptance-${child.id}`} className="space-y-1">
                    {child.acceptance.map((c, i) => (
                        <li key={i} className={`flex gap-2 text-[13px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${darkMode ? 'bg-slate-500' : 'bg-slate-400'}`} aria-hidden="true" />
                            <span className="min-w-0">{tx(c, isTr)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Yalnızca admin ────────────────────────────────────────────
                Given/When/Then dökümü ve beklenen status kodları. Sahada bir
                tester'ın eline story'yle BİRLİKTE gelmez; test edenin üreteceği
                iş çıktısıdır. İçeriği yazan taraf doğruluğunu denetleyebilsin
                diye burada duruyor. */}
            {isAdmin && (
                <details
                    data-testid={`backlog-admin-${child.id}`}
                    className={`mt-2.5 rounded-lg border ${darkMode ? 'border-amber-500/40 bg-amber-500/5' : 'border-amber-300 bg-amber-50'}`}
                >
                    <summary className={`cursor-pointer px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                        👑 {tx(UI_TEXT.adminOnly, isTr)}
                    </summary>
                    <div className="px-2.5 pb-2.5">
                        <p className={`mb-1 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            {tx(UI_TEXT.criteriaTechnical, isTr)} ({child.criteria.length})
                        </p>
                        <ol className="space-y-1.5">
                            {child.criteria.map((c, i) => (
                                <li key={i} className={`whitespace-pre-line rounded-lg border px-2 py-1.5 font-mono text-[11px] leading-relaxed ${
                                    darkMode ? 'border-slate-700 bg-slate-800/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
                                }`}>
                                    {tx(c, isTr)}
                                </li>
                            ))}
                        </ol>
                    </div>
                </details>
            )}

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {child.kind === 'backend' ? tx(UI_TEXT.endpoints, isTr) : tx(UI_TEXT.screens, isTr)}:
                </span>
                {/* endpoint'ler teknik terimdir, iki dilde de aynı kalır;
                    ekran adları ise çevrilir — bu yüzden ikisi de tx()'ten
                    geçer (tx düz string'de no-op döner). */}
                {(child.kind === 'backend' ? child.endpoints : child.screens).map((e, i) => (
                    <Chip key={i} toneName={k.tone} darkMode={darkMode} mono={child.kind === 'backend'}>
                        {tx(e, isTr)}
                    </Chip>
                ))}
            </div>
        </article>
    )
}

// Business story — metni şartnameden okunur, burada kopyası tutulmaz.
function BusinessStoryCard({ storyId, children, isTr, darkMode }) {
    const story = businessStoryById[storyId]
    if (!story) return null
    const d = DIFFICULTY[story.difficulty] || DIFFICULTY.basic
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    return (
        <article
            id={storyId}
            data-testid={`backlog-story-${storyId}`}
            className={`scroll-mt-20 rounded-xl border p-3 md:p-4 ${card}`}
        >
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <Chip toneName="emerald" darkMode={darkMode} mono>{storyId}</Chip>
                <Chip toneName="emerald" darkMode={darkMode}>📋 {tx(UI_TEXT.businessStory, isTr)}</Chip>
                <Chip toneName="sky" darkMode={darkMode}>{d.emoji} {tx(d.label, isTr)}</Chip>
            </div>

            <h4 className={`text-[15px] font-bold md:text-base ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {tx(story.title, isTr)}
            </h4>
            <p className={`mt-1.5 text-[13px] italic leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(story.story, isTr)}
            </p>

            <div className="mt-2.5">
                <p className={`mb-1 text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {tx(UI_TEXT.acceptance, isTr)} ({story.acceptance.length})
                </p>
                <ul className="space-y-1">
                    {story.acceptance.map((c, i) => (
                        <li key={i} className={`flex gap-2 text-[13px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`} aria-hidden="true" />
                            <span className="min-w-0">{tx(c, isTr)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                to={`/qa-shop-spec#user-stories`}
                data-testid={`backlog-story-to-spec-${storyId}`}
                className={`mt-2.5 inline-flex min-h-[36px] items-center rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                    darkMode
                        ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
            >
                <span className="flex items-center gap-1.5">📐 {tx(UI_TEXT.openInSpec, isTr)}</span>
            </Link>

            {children}
        </article>
    )
}

function EpicCard({ epic, childStories, reqById, isTr, darkMode }) {
    const t = tone(epic.tone)
    const card = darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'

    return (
        <section
            id={epic.id}
            data-testid={`backlog-epic-${epic.id}`}
            data-split={epic.split}
            className={`mb-6 scroll-mt-20 rounded-2xl border p-3 md:p-5 ${card}`}
        >
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg ${
                    darkMode ? t.bg : t.bgLight
                }`} aria-hidden="true">{epic.icon}</span>
                <Chip toneName={epic.tone} darkMode={darkMode} mono>{epic.id}</Chip>
                <h3 className={`text-base font-extrabold md:text-lg ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {tx(epic.title, isTr)}
                </h3>
                {epic.split === 'full' && (
                    <Chip toneName="emerald" darkMode={darkMode}>🧩 {tx(UI_TEXT.splitFull, isTr)}</Chip>
                )}
            </div>

            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {tx(epic.goal, isTr)}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {tx(UI_TEXT.fromRequirements, isTr)}:
                </span>
                {epic.requirements.map((rid) => (
                    <a key={rid} href={`#${rid}`} className="no-underline">
                        <Chip toneName="amber" darkMode={darkMode} mono>
                            {rid} · {tx(reqById[rid]?.title, isTr)}
                        </Chip>
                    </a>
                ))}
            </div>

            {epic.split === 'pending' && (
                <p className={`mt-3 rounded-lg border px-2.5 py-2 text-[13px] leading-relaxed ${
                    darkMode ? 'border-slate-700 bg-slate-800/60 text-slate-400' : 'border-slate-300 bg-white text-slate-600'
                }`}>
                    {tx(UI_TEXT.splitPending, isTr)}
                </p>
            )}

            <div className="mt-3 space-y-3">
                {epic.stories.map((sid) => {
                    const kids = childStories.filter((c) => c.parent === sid)
                    return (
                        <BusinessStoryCard key={sid} storyId={sid} isTr={isTr} darkMode={darkMode}>
                            {kids.length > 0 && (
                                <div className="mt-3 border-l-2 border-dashed pl-3 md:pl-4"
                                     style={{ borderColor: darkMode ? '#334155' : '#cbd5e1' }}>
                                    <div className="grid gap-2.5 md:grid-cols-2">
                                        {kids.map((c) => (
                                            <ChildStoryCard key={c.id} child={c} isTr={isTr} darkMode={darkMode} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </BusinessStoryCard>
                    )
                })}
            </div>
        </section>
    )
}

function TesterFlow({ flow, isTr, darkMode }) {
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
    return (
        <ol className="space-y-2" data-testid="backlog-tester-flow">
            {flow.steps.map((s, i) => {
                const t = tone(s.tone)
                return (
                    <li key={i} className={`rounded-xl border p-3 ${card}`}>
                        <div className="flex gap-2.5">
                            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                                darkMode ? `${t.bg} ${t.text}` : `${t.bgLight} ${t.textLight}`
                            }`}>{i + 1}</span>
                            <div className="min-w-0">
                                <p className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                    <span aria-hidden="true">{s.icon}</span> {tx(s.title, isTr)}
                                </p>
                                <p className={`mt-1 text-[13px] leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {tx(s.detail, isTr)}
                                </p>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}

export default function QaShopBacklogPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useKaranlikMod()
    const [odakModu, setOdakModu] = useOdakModu()
    useHashKaydir()

    const isTr = language === 'tr'
    const { meta, chain, requirements, epics, childStories, testerFlow, faq } = qaShopBacklogData

    const epicById = useMemo(() => Object.fromEntries(epics.map((e) => [e.id, e])), [epics])
    const reqById = useMemo(() => Object.fromEntries(requirements.map((r) => [r.id, r])), [requirements])

    const shell = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    const card = darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'

    const navLink = darkMode
        ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'

    const SECTIONS = [
        { id: 'requirements', icon: '📜', title: UI_TEXT.requirements },
        { id: 'epics', icon: '🗂️', title: UI_TEXT.epics },
        { id: 'tester-flow', icon: '🧪', title: UI_TEXT.testerFlow },
        { id: 'sss', icon: '❓', title: UI_TEXT.faq },
    ]

    return (
        <div className={`min-h-screen ${shell}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} focusMode={odakModu} setFocusMode={setOdakModu} />

            <main className="mx-auto max-w-4xl px-3 py-6 md:px-6 md:py-10">
                <QaShopGecis aktif="backlog" isTr={isTr} darkMode={darkMode} />

                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold md:text-3xl">{tx(meta.title, isTr)}</h1>
                    <p className={`mt-2 text-sm leading-relaxed md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(meta.subtitle, isTr)}
                    </p>
                </header>

                <div
                    data-testid="backlog-measured-note"
                    className={`mb-6 rounded-xl border p-3 md:p-4 ${darkMode ? 'border-emerald-600/50 bg-emerald-500/10' : 'border-emerald-300 bg-emerald-50'}`}
                >
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        ✅ {tx(meta.measuredNote, isTr)}
                    </p>
                </div>

                <StatCards cards={meta.statCards} isTr={isTr} darkMode={darkMode} />

                <section data-testid="backlog-big-picture" className={`mb-8 rounded-2xl border p-4 md:p-6 ${card}`}>
                    <ChainFlow chain={chain} isTr={isTr} darkMode={darkMode} />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            to="/qa-shop-spec"
                            data-testid="backlog-to-spec"
                            className="inline-flex min-h-[36px] items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            <span className="flex items-center gap-1.5">📐 {isTr ? 'Analiz dokümanını aç' : 'Open the analysis document'}</span>
                        </Link>
                        <a href="#epics" data-testid="backlog-to-epics"
                           className={`inline-flex min-h-[36px] items-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${navLink}`}>
                            <span className="flex items-center gap-1.5">🗂️ {isTr ? "Doğrudan epic'lere geç" : 'Jump straight to the epics'}</span>
                        </a>
                    </div>
                </section>

                <nav className="mb-8" aria-label={tx(UI_TEXT.jump, isTr)} data-testid="backlog-section-nav">
                    <p className={`mb-2 text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {tx(UI_TEXT.jump, isTr)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {SECTIONS.map((s) => (
                            <a key={s.id} href={`#${s.id}`}
                               className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${navLink}`}>
                                <span aria-hidden="true">{s.icon}</span>
                                {tx(s.title, isTr)}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* ── KATMAN 1 — Gereksinimler ──────────────────────────────── */}
                <section id="requirements" data-testid="backlog-section-requirements"
                         className={`mb-8 scroll-mt-20 rounded-2xl border p-4 md:p-6 ${card}`}>
                    <h2 className="mb-3 text-lg font-extrabold md:text-xl">
                        📜 {tx(UI_TEXT.requirements, isTr)} ({requirements.length})
                    </h2>
                    <div className="space-y-3">
                        {requirements.map((r) => (
                            <RequirementCard key={r.id} req={r} epicById={epicById} isTr={isTr} darkMode={darkMode} />
                        ))}
                    </div>
                </section>

                {/* ── KATMAN 2-4 — Epic → business story → frontend/backend ─── */}
                <section id="epics" data-testid="backlog-section-epics" className="mb-8 scroll-mt-20">
                    <h2 className="mb-3 text-lg font-extrabold md:text-xl">
                        🗂️ {tx(UI_TEXT.epics, isTr)} ({epics.length})
                    </h2>
                    {epics.map((e) => (
                        <EpicCard key={e.id} epic={e} childStories={childStories} reqById={reqById} isTr={isTr} darkMode={darkMode} />
                    ))}
                </section>

                {/* ── KATMAN 5 — Test edenin yolu ───────────────────────────── */}
                <section id="tester-flow" data-testid="backlog-section-tester-flow"
                         className={`mb-8 scroll-mt-20 rounded-2xl border p-4 md:p-6 ${card}`}>
                    <h2 className="mb-1 text-lg font-extrabold md:text-xl">
                        🧪 {tx(testerFlow.title, isTr)}
                    </h2>
                    <p className={`mb-3 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tx(testerFlow.intro, isTr)}
                    </p>
                    <TesterFlow flow={testerFlow} isTr={isTr} darkMode={darkMode} />
                </section>

                {/* ── SSS — FAQPage şemasının GÖRÜNÜR kaynağı ───────────────── */}
                <section id="sss" data-testid="backlog-section-faq"
                         className={`mb-8 scroll-mt-20 rounded-2xl border p-4 md:p-6 ${card}`}>
                    <h2 className="mb-3 text-lg font-extrabold md:text-xl">❓ {tx(UI_TEXT.faq, isTr)}</h2>
                    <div className="space-y-3">
                        {faq.map((item, i) => (
                            <article key={i} data-testid={`backlog-faq-${i}`}>
                                <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                    {tx(item.q, isTr)}
                                </h3>
                                <p className={`mt-1 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {tx(item.a, isTr)}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <QaShopHizliGecis aktif="backlog" isTr={isTr} darkMode={darkMode} />
        </div>
    )
}
