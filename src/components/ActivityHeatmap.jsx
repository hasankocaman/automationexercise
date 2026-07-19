import { getLastNDays } from '../lib/activityLog'

// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §8.2-S2) —
// GitHub-contribution tarzı haftalık ısı haritası. Saf inline CSS grid,
// dış kütüphane yok (CLAUDE.md §8). "Bugün" şeridinin altına takılır.

const WEEKS = 12
const DAYS = WEEKS * 7

const LEVEL_COLORS_DARK = ['#374151', '#78350f', '#b45309', '#f59e0b']
const LEVEL_COLORS_LIGHT = ['#e5e7eb', '#fde68a', '#fbbf24', '#f59e0b']

const WEEKDAY_LABELS = {
    tr: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

function levelFor(units) {
    if (units <= 0) return 0
    if (units < 5) return 1
    if (units < 10) return 2
    return 3
}

function formatDayLabel(dateStr, language) {
    const d = new Date(`${dateStr}T12:00:00`)
    return d.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' })
}

export default function ActivityHeatmap({ darkMode, language }) {
    const days = getLastNDays(DAYS)
    // days[0] en eski gün. Haftayı Pazartesi başlangıçlı hizalamak için ilk
    // günün haftanın kaçıncı günü olduğunu bul ve baştan boş hücre ekle.
    const firstDate = new Date(`${days[0].date}T12:00:00`)
    const firstWeekday = (firstDate.getDay() + 6) % 7 // 0 = Pazartesi
    const padded = [...Array(firstWeekday).fill(null), ...days]
    const totalCols = Math.ceil(padded.length / 7)
    const colors = darkMode ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT
    const weekdayLabels = WEEKDAY_LABELS[language] || WEEKDAY_LABELS.en

    return (
        <div className="mt-3 overflow-x-auto" data-testid="activity-heatmap">
            <div className="inline-flex gap-1 items-start">
                <div className="flex flex-col gap-1 pr-1 pt-0.5">
                    {weekdayLabels.map((label, i) => (
                        <span
                            key={label}
                            className={`h-3 text-[9px] leading-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                        >
                            {i % 2 === 1 ? label : ''}
                        </span>
                    ))}
                </div>
                <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 0.75rem)' }}>
                    {Array.from({ length: totalCols * 7 }).map((_, idx) => {
                        const day = padded[idx]
                        if (!day) return <span key={idx} className="h-3 w-3" />
                        const level = levelFor(day.units)
                        const title = `${formatDayLabel(day.date, language)} — ${day.units} ${language === 'tr' ? 'birim' : 'units'}`
                        return (
                            <span
                                key={idx}
                                title={title}
                                data-testid="heatmap-cell"
                                data-level={level}
                                className="h-3 w-3 rounded-sm"
                                style={{ background: colors[level] }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
