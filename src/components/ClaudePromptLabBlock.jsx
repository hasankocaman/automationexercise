import { useEffect, useRef, useState } from 'react'

/**
 * ClaudePromptLabBlock — /claude-ai sayfasının interaktif "sandbox"ı.
 *
 * Kullanıcı, ekranda verilen login user-story senaryosu için simüle Claude'a
 * GERÇEK bir prompt yazar. Deterministik (keyword tabanlı) analizör 5 prompt
 * bileşenini tespit eder: rol, bağlam, çıktı formatı, negatif/edge talebi,
 * sayısal kısıt. Tespit sayısına göre 3 kalite kademesinde simüle cevap üretilir:
 * jenerik → orta → profesyonel. Amaç: "aynı soru, farklı prompt = bambaşka cevap"
 * ilişkisini kullanıcıya YAŞATMAK. Gerçek API çağrısı yapılmaz (bkz. claudesayfa.md
 * "Kapsam Dışı").
 */

// ── Bileşen tespit desenleri (TR + EN anahtar kelimeler) ──────────────────────
const DETECTORS = {
    role: /(sen\s+(bir|kıdemli|deneyimli)|act\s+as|you\s+are\s+(a|an|the)?\s*\w*\s*(qa|test)|rol(ün|un|u)?\s*:|persona|QA\s*(engineer|mühendisi)|test\s*(engineer|mühendisi|uzmanı)|kıdemli|senior\s+\w*\s*(qa|test|engineer))/i,
    context: /(login|giriş|user\s*stor(y|ies)|kullanıcı\s*hikayesi|kabul\s*kriter|acceptance\s*criteria|\bAC\b|e-?posta|email|şifre|password|kilitl|lock|5\s*(hatalı|failed|yanlış))/i,
    format: /(tablo|table|gherkin|given\s*\/?\s*when|json|csv|markdown|madde(ler)?\s*halinde|liste\s*(olarak|halinde)|numaraland|bullet|sütun|column)/i,
    negative: /(negatif|negative|edge\s*case|sınır\s*değer|boundary|geçersiz|invalid|hatalı\s*(giriş|şifre|veri)|yanlış\s*şifre|wrong\s*password|boş\s*(alan|bırak)|empty\s*(field|input)|olumsuz)/i,
    constraint: /(\b\d+\s*(adet|test|case|vaka|senaryo|scenario|satır|row|tane)|en\s*fazla|en\s*az|at\s*least|at\s*most|max(imum)?\s*\d|min(imum)?\s*\d|\bsadece\b|\bonly\b)/i,
}

const INGREDIENT_LABELS = [
    { key: 'role', tr: 'Rol tanımı ("Sen kıdemli bir QA mühendisisin...")', en: 'Role definition ("You are a senior QA engineer...")' },
    { key: 'context', tr: 'Bağlam (senaryodaki login kuralları / kabul kriterleri)', en: 'Context (login rules / acceptance criteria from the scenario)' },
    { key: 'format', tr: 'Çıktı formatı (tablo, Gherkin, JSON, madde listesi...)', en: 'Output format (table, Gherkin, JSON, bullet list...)' },
    { key: 'negative', tr: 'Negatif / edge case talebi (geçersiz şifre, boş alan, sınır değer)', en: 'Negative / edge case request (invalid password, empty field, boundary)' },
    { key: 'constraint', tr: 'Sayısal kısıt ("6 adet test case", "en fazla 10 satır")', en: 'Numeric constraint ("6 test cases", "at most 10 rows")' },
]

// ── Simüle Claude cevapları (kademe: 0-1 jenerik / 2-3 orta / 4-5 profesyonel) ─
function buildResponseLines(detected, score, isTr) {
    if (score <= 1) {
        return isTr
            ? [
                'Login sayfasını test etmek için genel olarak şunları yapabilirsiniz:',
                '• Doğru kullanıcı adı ve şifre ile giriş yapmayı deneyin.',
                '• Yanlış bilgilerle giriş yapmayı deneyin.',
                '• Sayfanın düzgün yüklendiğini kontrol edin.',
                '',
                '⚠ Simülasyon notu: Cevap bu kadar jenerik, çünkü prompt\'ta rol, bağlam ve format yok — Claude senaryondaki kilitlenme kuralını BİLMİYOR.',
            ]
            : [
                'To test a login page you can generally do the following:',
                '• Try logging in with a correct username and password.',
                '• Try logging in with wrong credentials.',
                '• Check that the page loads correctly.',
                '',
                '⚠ Simulation note: the answer is this generic because the prompt has no role, context or format — Claude does not KNOW your lockout rule.',
            ]
    }

    if (score <= 3) {
        const missing = INGREDIENT_LABELS.filter((ing) => !detected[ing.key])
            .map((ing) => (isTr ? ing.tr.split(' (')[0] : ing.en.split(' (')[0]))
            .join(', ')
        return isTr
            ? [
                'Login özelliği için test senaryoları:',
                '1. Geçerli e-posta + geçerli şifre → kullanıcı giriş yapar.',
                '2. Geçerli e-posta + yanlış şifre → hata mesajı gösterilir.',
                '3. Boş e-posta alanı → doğrulama uyarısı gösterilir.',
                detected.negative ? '4. 5 hatalı denemede hesap kilitlenir (kabul kriteri).' : '4. Şifremi unuttum bağlantısı çalışır.',
                '',
                `⚠ Simülasyon notu: Fena değil ama hâlâ eksik bileşen var: ${missing}. Ekleyip tekrar gönder — cevabın nasıl profesyonelleştiğini gör.`,
            ]
            : [
                'Test scenarios for the login feature:',
                '1. Valid email + valid password → user signs in.',
                '2. Valid email + wrong password → error message shown.',
                '3. Empty email field → validation warning shown.',
                detected.negative ? '4. Account locks after 5 failed attempts (acceptance criterion).' : '4. Forgot-password link works.',
                '',
                `⚠ Simulation note: not bad, but ingredients are still missing: ${missing}. Add them and resend — watch the answer turn professional.`,
            ]
    }

    return isTr
        ? [
            'Kıdemli QA gözüyle, kabul kriterlerine birebir bağlı test case tablosu:',
            '',
            'ID    | Senaryo                             | Beklenen Sonuç            | Tip',
            '------|-------------------------------------|---------------------------|--------',
            'TC01  | Geçerli e-posta + geçerli şifre     | Dashboard\'a yönlenir      | Pozitif',
            'TC02  | Geçerli e-posta + yanlış şifre      | "Hatalı bilgi" mesajı     | Negatif',
            'TC03  | İki alan da boş, Login\'e tıkla      | Alan bazlı doğrulama      | Negatif',
            'TC04  | 5 kez üst üste yanlış şifre         | Hesap 15 dk kilitlenir    | Negatif',
            'TC05  | E-posta alanına \' OR 1=1 --         | Girdi reddedilir, log yok | Güvenlik',
            'TC06  | 254 karakterlik e-posta (sınır)     | Kabul edilir, taşma yok   | Sınır',
            '',
            '✅ Simülasyon notu: Rol + bağlam + format + negatif talep + kısıt verdin; cevap kilitlenme kuralını (TC04) ve sınır değeri (TC06) İSABETLE üretti. Gerçek işte bile son karar senin: TC04\'teki "15 dk" senin kabul kriterinde var mı, yoksa Claude mu uydurdu? Doğrula.',
        ]
        : [
            'Through a senior QA lens, a test case table tied directly to the acceptance criteria:',
            '',
            'ID    | Scenario                            | Expected Result           | Type',
            '------|-------------------------------------|---------------------------|--------',
            'TC01  | Valid email + valid password        | Redirected to dashboard   | Positive',
            'TC02  | Valid email + wrong password        | "Invalid credentials" msg | Negative',
            'TC03  | Both fields empty, click Login      | Per-field validation      | Negative',
            'TC04  | 5 consecutive wrong passwords       | Account locks for 15 min  | Negative',
            'TC05  | \' OR 1=1 -- in the email field      | Input rejected, no login  | Security',
            'TC06  | 254-character email (boundary)      | Accepted, no overflow     | Boundary',
            '',
            '✅ Simulation note: you gave role + context + format + negative request + constraint; the answer nailed the lockout rule (TC04) and the boundary (TC06). Even in real work the final call is yours: is TC04\'s "15 min" in YOUR acceptance criteria, or did Claude invent it? Verify.',
        ]
}

function ClaudePromptLabBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const [prompt, setPrompt] = useState('')
    const [detected, setDetected] = useState({ role: false, context: false, format: false, negative: false, constraint: false })
    const [score, setScore] = useState(null) // null = henüz gönderilmedi
    const [responseLines, setResponseLines] = useState([])
    const [visibleCount, setVisibleCount] = useState(0)
    const [doneMissions, setDoneMissions] = useState([])
    const [showExample, setShowExample] = useState(false)
    const timersRef = useRef([])

    useEffect(() => () => { timersRef.current.forEach((t) => clearTimeout(t)); timersRef.current = [] }, [])

    const missions = Array.isArray(block?.missions) ? block.missions : []

    function handleSend() {
        const text = prompt.trim()
        if (text.length < 10) {
            setScore(0)
            setResponseLines([isTr
                ? '⚠ Prompt çok kısa. Senaryoyu oku ve Claude\'dan ne istediğini en az bir cümleyle yaz.'
                : '⚠ The prompt is too short. Read the scenario and write at least one sentence describing what you want from Claude.'])
            setVisibleCount(1)
            return
        }

        const result = {}
        let hits = 0
        for (const key of Object.keys(DETECTORS)) {
            result[key] = DETECTORS[key].test(text)
            if (result[key]) hits++
        }
        setDetected(result)
        setScore(hits)

        // Görev (mission) ilerlemesi — oturum içi, birikimli
        setDoneMissions((prev) => {
            const next = new Set(prev)
            next.add('send-first')
            if (result.role) next.add('add-role')
            if (result.format) next.add('add-format')
            if (result.negative) next.add('add-negative')
            if (hits === 5) next.add('full-house')
            return [...next]
        })

        // Cevabı satır satır "yazıyormuş gibi" göster
        timersRef.current.forEach((t) => clearTimeout(t))
        timersRef.current = []
        const lines = buildResponseLines(result, hits, isTr)
        setResponseLines(lines)
        setVisibleCount(0)
        lines.forEach((_, idx) => {
            const t = setTimeout(() => setVisibleCount((c) => Math.max(c, idx + 1)), 120 * (idx + 1))
            timersRef.current.push(t)
        })
    }

    const panelBg = darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-amber-200'
    const softText = darkMode ? 'text-gray-300' : 'text-gray-700'
    const examplePrompt = isTr
        ? `Sen kıdemli bir QA mühendisisin. Aşağıdaki login kabul kriterlerine göre
(geçerli e-posta+şifre girişi, hatalı bilgide hata mesajı, 5 hatalı denemede
hesap kilitlenir) negatif ve sınır değer senaryoları dahil 6 adet test case'i
tablo formatında yaz: ID | Senaryo | Beklenen Sonuç | Tip.`
        : `You are a senior QA engineer. Based on the login acceptance criteria below
(valid email+password signs in, error message on invalid credentials, account
locks after 5 failed attempts), write 6 test cases including negative and
boundary scenarios, in table format: ID | Scenario | Expected Result | Type.`

    return (
        <div data-testid="claude-prompt-lab" className={`rounded-xl border-2 ${panelBg} p-3 md:p-5 my-4 space-y-4`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-base md:text-lg">🧪 {isTr ? 'Prompt Lab — Simüle Claude ile Dene' : 'Prompt Lab — Try It on Simulated Claude'}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>
                    {isTr ? 'Simülasyon — gerçek API çağrısı yok' : 'Simulation — no real API call'}
                </span>
            </div>

            {/* Senaryo kartı */}
            <div className={`rounded-lg p-3 text-sm ${darkMode ? 'bg-gray-800' : 'bg-amber-50'}`}>
                <p className="font-semibold mb-1">📋 {isTr ? 'Senaryo: Login user story' : 'Scenario: Login user story'}</p>
                <p className={softText}>
                    {isTr
                        ? '"Bir kullanıcı olarak e-posta ve şifremle giriş yapmak istiyorum." Kabul kriterleri: (1) Geçerli e-posta + şifre → dashboard. (2) Hatalı bilgi → "Hatalı bilgi" mesajı. (3) 5 hatalı denemede hesap kilitlenir.'
                        : '"As a user I want to sign in with my email and password." Acceptance criteria: (1) Valid email + password → dashboard. (2) Invalid credentials → "Invalid credentials" message. (3) Account locks after 5 failed attempts.'}
                </p>
                <p className={`mt-2 ${softText}`}>
                    {isTr
                        ? '👉 Görevin: Bu senaryo için simüle Claude\'a test case ÜRETTİREN bir prompt yaz. Ne kadar çok bileşen (rol, bağlam, format, negatif talep, kısıt) eklersen cevap o kadar profesyonelleşir.'
                        : '👉 Your task: write a prompt that makes simulated Claude GENERATE test cases for this scenario. The more ingredients you add (role, context, format, negative request, constraint), the more professional the answer becomes.'}
                </p>
            </div>

            {/* Prompt girişi */}
            <textarea
                data-testid="prompt-lab-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder={isTr ? 'Prompt\'unu buraya yaz... (örn: "Login için test case yaz")' : 'Write your prompt here... (e.g. "Write test cases for login")'}
                className={`w-full rounded-lg border p-3 font-mono text-sm md:text-base ${darkMode ? 'bg-gray-950 border-gray-700 text-gray-100' : 'bg-white border-amber-300 text-gray-900'}`}
                style={{ fontSize: '16px' }}
            />
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    type="button"
                    data-testid="prompt-lab-send"
                    onClick={handleSend}
                    className="px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:opacity-90 transition min-h-[36px]"
                >
                    ▶ {isTr ? 'Claude\'a Gönder' : 'Send to Claude'}
                </button>
                <button
                    type="button"
                    data-testid="prompt-lab-example"
                    onClick={() => setShowExample((s) => !s)}
                    className={`px-3 py-2 rounded-lg text-sm border min-h-[36px] ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-amber-300 text-amber-800 hover:bg-amber-50'}`}
                >
                    💡 {isTr ? (showExample ? 'Örnek prompt\'u gizle' : 'Örnek güçlü prompt göster') : (showExample ? 'Hide example prompt' : 'Show example strong prompt')}
                </button>
                {score !== null && (
                    <span data-testid="prompt-lab-score" className={`ml-auto text-sm font-bold px-3 py-1 rounded-full ${score >= 4 ? 'bg-green-500/20 text-green-500' : score >= 2 ? 'bg-yellow-500/20 text-yellow-600' : 'bg-red-500/20 text-red-500'}`}>
                        {isTr ? 'Prompt gücü' : 'Prompt strength'}: {score}/5
                    </span>
                )}
            </div>
            {showExample && (
                <pre className={`rounded-lg p-3 text-xs md:text-sm whitespace-pre-wrap overflow-x-auto ${darkMode ? 'bg-gray-800 text-amber-200' : 'bg-amber-50 text-amber-900'}`}>{examplePrompt}</pre>
            )}

            {/* Bileşen checklist'i */}
            <div data-testid="prompt-lab-ingredients" className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {INGREDIENT_LABELS.map((ing) => {
                    const on = detected[ing.key] && score !== null
                    return (
                        <div key={ing.key} className={`flex items-start gap-2 text-xs md:text-sm rounded-md px-2 py-1.5 ${on ? (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-800') : softText}`}>
                            <span aria-hidden="true">{on ? '✓' : '○'}</span>
                            <span>{isTr ? ing.tr : ing.en}</span>
                        </div>
                    )
                })}
            </div>

            {/* Simüle cevap */}
            {responseLines.length > 0 && (
                <div data-testid="prompt-lab-response" className={`rounded-lg border p-3 ${darkMode ? 'bg-gray-950 border-gray-700' : 'bg-gray-900 border-gray-800'}`}>
                    <p className="text-xs font-semibold text-amber-400 mb-2">🤖 {isTr ? 'Simüle Claude cevabı' : 'Simulated Claude response'}</p>
                    <pre className="text-xs md:text-sm text-gray-100 whitespace-pre-wrap overflow-x-auto font-mono">
                        {responseLines.slice(0, visibleCount).join('\n')}
                    </pre>
                </div>
            )}

            {/* Görevler */}
            {missions.length > 0 && (
                <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                    <p className="font-semibold text-sm mb-2">🎯 {isTr ? 'Görevler' : 'Missions'} ({doneMissions.length}/{missions.length})</p>
                    <ul className="space-y-1">
                        {missions.map((m) => {
                            const done = doneMissions.includes(m.id)
                            return (
                                <li key={m.id} data-testid={`prompt-lab-mission-${m.id}`} data-done={done ? 'true' : 'false'} className={`flex items-start gap-2 text-xs md:text-sm ${done ? 'text-green-500 line-through' : softText}`}>
                                    <span aria-hidden="true">{done ? '✅' : '⬜'}</span>
                                    <span>{isTr ? m.text?.tr : m.text?.en}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ClaudePromptLabBlock
