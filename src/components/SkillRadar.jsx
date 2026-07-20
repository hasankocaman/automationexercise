import { Link } from 'react-router-dom'
import { getSkillRadarData, getJobReadiness } from '../lib/progressStore'

// Learning OS Faz 2 (Documents/learning-os-redesign-plan.md §6.2-6.3/F8-F9) —
// saf inline SVG radar + iş hazırlık skoru kartı. Dış kütüphane yok
// (CLAUDE.md §8). Tek seri (kullanıcının kendi profili) olduğundan legend
// gerekmez. "Veri yok" hiçbir zaman eksen başına tekrarlanan bir metin
// olarak gösterilmez (2026-07-20 kullanıcı geri bildirimi — 6 kez tekrar
// eden "veri yok" yazısı dağınık/düşük kaliteli görünüyordu): hiç veri
// yoksa JobReadinessCard'ın boş-durum kalıbıyla AYNI tonda tek bir
// karşılama mesajı gösterilir; kısmi veri varsa eksik eksenler sadece
// değer satırını atlar, ayrı bir "yok" etiketi eklenmez.

const SIZE = 440
const CENTER = SIZE / 2
const MAX_R = 86
const LABEL_OFFSET = 26
const RING_FRACTIONS = [0.25, 0.5, 0.75, 1]

const STROKE_DARK = '#818cf8'
const FILL_DARK_FROM = 'rgba(129, 140, 248, 0.38)'
const FILL_DARK_TO = 'rgba(129, 140, 248, 0.08)'
const STROKE_LIGHT = '#4f46e5'
const FILL_LIGHT_FROM = 'rgba(79, 70, 229, 0.24)'
const FILL_LIGHT_TO = 'rgba(79, 70, 229, 0.05)'
const GRID_DARK = 'rgba(148, 163, 184, 0.22)'
const GRID_LIGHT = 'rgba(100, 116, 139, 0.18)'
const RING_EDGE_DARK = 'rgba(148, 163, 184, 0.38)'
const RING_EDGE_LIGHT = 'rgba(100, 116, 139, 0.32)'
const LABEL_DARK = '#f1f5f9'
const LABEL_LIGHT = '#1e293b'
const MUTED_LABEL_DARK = '#64748b'
const MUTED_LABEL_LIGHT = '#94a3b8'

function axisAngle(i, n) {
    return -Math.PI / 2 + i * ((2 * Math.PI) / n)
}

function axisPoint(i, n, radius) {
    const angle = axisAngle(i, n)
    return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)]
}

function polygonAt(n, radius) {
    return Array.from({ length: n }, (_, i) => axisPoint(i, n, radius))
}

function pointsToString(points) {
    return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function humanizeRoute(route) {
    return route
        .replace('/', '')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}

export function SkillRadar({ darkMode, language, routeFilter = null }) {
    const isTr = language === 'tr'
    const data = getSkillRadarData(routeFilter)
    const n = data.length
    if (n === 0) return null

    const hasAnyData = data.some((d) => d.value !== null)

    if (!hasAnyData) {
        return (
            <div data-testid="skill-radar" className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                <span className="text-4xl" aria-hidden="true">🎯</span>
                <p className={`max-w-[240px] text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isTr
                        ? 'Bir dersi tamamladığında radar burada dolmaya başlayacak.'
                        : 'Once you complete a lesson, the radar will start filling in here.'}
                </p>
            </div>
        )
    }

    const gridColor = darkMode ? GRID_DARK : GRID_LIGHT
    const ringEdgeColor = darkMode ? RING_EDGE_DARK : RING_EDGE_LIGHT
    const labelColor = darkMode ? LABEL_DARK : LABEL_LIGHT
    const mutedLabelColor = darkMode ? MUTED_LABEL_DARK : MUTED_LABEL_LIGHT
    const stroke = darkMode ? STROKE_DARK : STROKE_LIGHT
    const fillFrom = darkMode ? FILL_DARK_FROM : FILL_LIGHT_FROM
    const fillTo = darkMode ? FILL_DARK_TO : FILL_LIGHT_TO
    const gradientId = darkMode ? 'skill-radar-fill-dark' : 'skill-radar-fill-light'

    const dataPolygon = polygonAt(n, 0).map((_, i) => axisPoint(i, n, MAX_R * ((data[i].value ?? 0) / 100)))
    const spokeEnds = polygonAt(n, MAX_R)

    const summary = data
        .map((d) => `${isTr ? d.label.tr : d.label.en}${d.value === null ? '' : `: %${d.value}`}`)
        .join(', ')

    return (
        <div data-testid="skill-radar" className="flex flex-col items-center">
            <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                role="img"
                aria-label={isTr ? `Yetenek radarı — ${summary}` : `Skill radar — ${summary}`}
                style={{ width: '100%', maxWidth: 400, height: 'auto' }}
            >
                <defs>
                    <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
                        <stop offset="0%" stopColor={fillFrom} />
                        <stop offset="100%" stopColor={fillTo} />
                    </radialGradient>
                    <filter id="skill-radar-glow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={stroke} floodOpacity="0.35" />
                    </filter>
                </defs>

                {RING_FRACTIONS.map((frac, i) => (
                    <polygon
                        key={frac}
                        points={pointsToString(polygonAt(n, MAX_R * frac))}
                        fill="none"
                        stroke={i === RING_FRACTIONS.length - 1 ? ringEdgeColor : gridColor}
                        strokeWidth={i === RING_FRACTIONS.length - 1 ? 1.5 : 1}
                    />
                ))}
                {spokeEnds.map(([x, y], i) => (
                    <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke={gridColor} strokeWidth={1} />
                ))}
                <polygon
                    points={pointsToString(dataPolygon)}
                    fill={`url(#${gradientId})`}
                    stroke={stroke}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    filter="url(#skill-radar-glow)"
                />
                {data.map((d, i) => {
                    const hasData = d.value !== null
                    const [lx, ly] = axisPoint(i, n, MAX_R + LABEL_OFFSET)
                    const angle = axisAngle(i, n)
                    const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'
                    return (
                        <g key={d.id}>
                            {hasData && (() => {
                                const [px, py] = axisPoint(i, n, MAX_R * (d.value / 100))
                                return (
                                    <>
                                        <circle cx={px} cy={py} r={7} fill={stroke} opacity={0.18} />
                                        <circle cx={px} cy={py} r={4} fill={stroke} stroke={darkMode ? '#1e293b' : '#ffffff'} strokeWidth={1.5} />
                                    </>
                                )
                            })()}
                            <text
                                x={lx}
                                y={hasData ? ly - 3 : ly + 4}
                                textAnchor={anchor}
                                fontSize="13"
                                fontWeight="700"
                                fill={hasData ? labelColor : mutedLabelColor}
                            >
                                {isTr ? d.label.tr : d.label.en}
                            </text>
                            {hasData && (
                                <text x={lx} y={ly + 14} textAnchor={anchor} fontSize="12" fontWeight="600" fill={stroke}>
                                    %{d.value}
                                </text>
                            )}
                        </g>
                    )
                })}
            </svg>
            {/* Erişilebilirlik: grafiğin metin karşılığı (dataviz standardı — tablo görünümü) */}
            <ul className="sr-only">
                {data.map((d) => (
                    <li key={d.id}>
                        {isTr ? d.label.tr : d.label.en}{d.value === null ? '' : `: %${d.value}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function JobReadinessCard({ darkMode, language, routes, roadmapPercent }) {
    const isTr = language === 'tr'
    const readiness = getJobReadiness(routes, roadmapPercent)
    const cardCls = `rounded-2xl p-4 md:p-5 border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`

    if (!readiness) {
        return (
            <div className={cardCls} data-testid="job-readiness-card">
                <h3 className={`text-sm font-bold mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {isTr ? '💼 İş Hazırlık Skoru' : '💼 Job Readiness Score'}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isTr
                        ? 'Skoru görmek için haritandaki derslerden birkaçını tamamla.'
                        : 'Complete a few lessons on your map to see your score.'}
                </p>
            </div>
        )
    }

    return (
        <div className={cardCls} data-testid="job-readiness-card">
            <div className="flex items-center justify-between">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {isTr ? '💼 İş Hazırlık Skoru' : '💼 Job Readiness Score'}
                </h3>
                <span
                    data-testid="job-readiness-score"
                    className={`text-2xl font-black ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}
                >
                    %{readiness.score}
                </span>
            </div>
            {readiness.weakest.length > 0 && (
                <div className="mt-3">
                    <p className={`text-xs font-semibold mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isTr ? 'Seni en çok ilerletecek 3 şey:' : 'Top 3 things that would move you forward:'}
                    </p>
                    <ul className="space-y-1">
                        {readiness.weakest.map((w) => (
                            <li
                                key={w.route}
                                className={`text-xs flex items-center justify-between rounded-lg px-2.5 py-1.5 ${darkMode ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-50 text-gray-600'}`}
                            >
                                <Link to={w.route} className="hover:underline font-medium">{humanizeRoute(w.route)}</Link>
                                <span className={darkMode ? 'text-amber-400' : 'text-amber-600'}>%{w.mastery}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
