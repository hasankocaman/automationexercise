// QA Sprint Simulator — Kanban panosu
// (Documents/sprint-simulator-and-open-items-plan.md §2.3)
//
// Üç kolon: Backlog / In Progress / Done. Bir bug'ın hangi kolonda olduğu
// `sprintStore.getBugStatus()` ile TÜRETİLİR — "done" bilgisi xp.js'ten gelir,
// burada ikinci bir tamamlanma state'i tutulmaz (plan §2.2 tek-doğruluk ilkesi).
//
// Dış paket yok, dış görsel yok (CLAUDE.md §8) — saf Tailwind + emoji.

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

const SEVERITY = {
    critical: { emoji: '🔴', tr: 'Kritik', en: 'Critical', cls: 'bg-red-500/15 text-red-500 border-red-500/40' },
    major: { emoji: '🟠', tr: 'Yüksek', en: 'Major', cls: 'bg-amber-500/15 text-amber-500 border-amber-500/40' },
    minor: { emoji: '🟡', tr: 'Düşük', en: 'Minor', cls: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/40' },
}

const COLUMNS = [
    { key: 'backlog', emoji: '📋', tr: 'Backlog', en: 'Backlog' },
    { key: 'progress', emoji: '🔧', tr: 'Devam Eden', en: 'In Progress' },
    { key: 'done', emoji: '✅', tr: 'Bitti', en: 'Done' },
]

function BugCard({ bug, status, isTr, darkMode, isSelected, onOpen, onPull }) {
    const sev = SEVERITY[bug.severity] ?? SEVERITY.minor

    return (
        <div
            data-testid="sprint-bug-card"
            data-bug-id={bug.id}
            data-bug-status={status}
            className={`rounded-xl border p-3 transition-all duration-200 ${isSelected ? 'ring-2 ring-indigo-500' : ''} ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'} ${status === 'done' ? 'opacity-80' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
        >
            <div className="mb-2 flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {bug.key}
                </span>
                <span className={`rounded border px-1.5 py-0.5 text-[11px] font-bold ${sev.cls}`}>
                    {sev.emoji} {isTr ? sev.tr : sev.en}
                </span>
                {status === 'done' && <span className="ml-auto text-sm text-emerald-500">✓</span>}
            </div>

            <p className={`mb-3 text-sm font-semibold leading-snug ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {tx(bug.title, isTr)}
            </p>

            {status === 'backlog' ? (
                <button
                    type="button"
                    data-testid="sprint-pull-btn"
                    onClick={() => onPull(bug)}
                    className="min-h-9 w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
                >
                    {isTr ? '⬅ Sprint\'e al' : '⬅ Pull into sprint'}
                </button>
            ) : (
                <button
                    type="button"
                    data-testid="sprint-open-btn"
                    onClick={() => onOpen(bug)}
                    className={`min-h-9 w-full rounded-lg border-2 px-3 py-2 text-xs font-bold transition-colors ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                    {status === 'done'
                        ? (isTr ? '👁 Görevi incele' : '👁 Review mission')
                        : (isTr ? '▶ Görevi aç' : '▶ Open mission')}
                </button>
            )}
        </div>
    )
}

export default function SprintBoard({ bugs, statusOf, isTr, darkMode, selectedBugId, onOpen, onPull }) {
    return (
        <div data-testid="sprint-board" className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {COLUMNS.map((col) => {
                const columnBugs = bugs.filter((bug) => statusOf(bug) === col.key)
                return (
                    <section
                        key={col.key}
                        data-testid="sprint-column"
                        data-column={col.key}
                        className={`rounded-2xl border p-3 ${darkMode ? 'border-gray-700 bg-gray-900/60' : 'border-gray-200 bg-gray-50'}`}
                    >
                        <header className="mb-3 flex items-center gap-2">
                            <span>{col.emoji}</span>
                            <h3 className={`text-sm font-extrabold uppercase tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {isTr ? col.tr : col.en}
                            </h3>
                            <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                                {columnBugs.length}
                            </span>
                        </header>

                        <div className="flex flex-col gap-3">
                            {columnBugs.map((bug) => (
                                <BugCard
                                    key={bug.id}
                                    bug={bug}
                                    status={col.key}
                                    isTr={isTr}
                                    darkMode={darkMode}
                                    isSelected={selectedBugId === bug.id}
                                    onOpen={onOpen}
                                    onPull={onPull}
                                />
                            ))}
                            {columnBugs.length === 0 && (
                                <p className={`py-6 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {isTr ? 'Bu kolon boş' : 'This column is empty'}
                                </p>
                            )}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
