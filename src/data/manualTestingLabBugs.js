// Manual Testing Lab — bug catalogue + BugEvaluator scoring rules.
// Kept in src/data/ per this project's data-driven content convention (CLAUDE.md §5).

export const BUGS = [
    { id: 'email-validation', severity: 'Medium', label: { tr: 'Email alanı validasyonu', en: 'Email field validation' } },
    { id: 'forgot-password-404', severity: 'High', label: { tr: '"Şifremi Unuttum" linki', en: '"Forgot password" link' } },
    { id: 'double-submit', severity: 'High', label: { tr: 'Submit butonu / tekrarlı istek', en: 'Submit button / duplicate requests' } },
    { id: 'generic-error', severity: 'Low', label: { tr: 'Hata mesajı içeriği', en: 'Error message content' } },
    { id: 'empty-password-message', severity: 'Medium', label: { tr: 'Boş şifre hata mesajı', en: 'Empty password error message' } },
]

export const SEVERITIES = ['Critical', 'High', 'Medium', 'Low']

const SEVERITY_RANK = { Critical: 3, High: 2, Medium: 1, Low: 0 }

// --- BugEvaluator: deterministic rule-based scoring, max 100 ---
function scoreTitle(title) {
    const t = (title || '').trim()
    if (!t) return 0
    const words = t.split(/\s+/).filter(Boolean)
    if (t.length < 8 || words.length < 2) return 8
    if (t.length < 25) return 14
    return 20
}

function scoreSteps(steps) {
    const filled = (steps || []).map(s => s.trim()).filter(Boolean)
    if (filled.length === 0) return 0
    if (filled.length === 1) return 10
    if (filled.length === 2) return 20
    return filled.every(s => s.length >= 6) ? 30 : 22
}

function scoreExpectedActual(expected, actual) {
    const e = (expected || '').trim()
    const a = (actual || '').trim()
    let score = 0
    score += e.length >= 5 ? 15 : (e.length > 0 ? 7 : 0)
    score += a.length >= 5 ? 15 : (a.length > 0 ? 7 : 0)
    if (e && a && e.toLowerCase() === a.toLowerCase()) score = Math.min(score, 10)
    return score
}

function scoreSeverity(selected, canonical) {
    if (!selected || !canonical) return 0
    if (selected === canonical) return 20
    const diff = Math.abs(SEVERITY_RANK[selected] - SEVERITY_RANK[canonical])
    return diff === 1 ? 10 : 0
}

export function evaluateReport(report, bug) {
    const titleScore = scoreTitle(report.title)
    const stepsScore = scoreSteps(report.steps)
    const eaScore = scoreExpectedActual(report.expected, report.actual)
    const sevScore = scoreSeverity(report.severity, bug?.severity)
    return { titleScore, stepsScore, eaScore, sevScore, total: titleScore + stepsScore + eaScore + sevScore }
}

export function xpForScore(score) {
    if (score >= 80) return 20
    if (score >= 60) return 14
    if (score >= 40) return 8
    return 3
}
