import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   EdgeCaseFactoryBlock — Modül C-5 (AIQA_ROADMAP.md)
   "Edge Case Fabrikası: Claude ile Sınır Koşullarını Üretmek"

   Kullanıcı bir alan tanımı seçer (TR kimlik no, e-posta...). Sistem 8
   kategoride önceden üretilmiş örnek test verisi gösterir: geçerli, geçersiz,
   sınır değer, boş, özel karakter, Unicode, XSS girişimi, çok uzun. Her
   kategori panoya kopyalanabilir; tüm set JSON olarak indirilebilir. Altta,
   Claude'a bu tür veri ürettirmek için kullanılabilecek 2 hazır prompt
   şablonu (kopyalanabilir) gösterilir.

   Gerçek API çağrısı YOK — tüm örnekler el yazımı, deterministik veridir;
   amaç Claude'un bu kategorilerde nasıl veri ürettiğini GÖSTERMEK ve
   kullanıcıya kendi promptunu yazarken bir başlangıç noktası vermektir.
   Veri `block.fieldTypes` / `block.promptTemplates` üzerinden gelir; Sonnet
   gerçek alan tanımlarını ekler. Yerleşik varsayılan tek başına çalışır.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const CATEGORY_META = [
    { key: 'valid', icon: '✅', label: { tr: 'Geçerli', en: 'Valid' } },
    { key: 'invalid', icon: '❌', label: { tr: 'Geçersiz', en: 'Invalid' } },
    { key: 'boundary', icon: '📏', label: { tr: 'Sınır Değer', en: 'Boundary' } },
    { key: 'empty', icon: '⬜', label: { tr: 'Boş', en: 'Empty' } },
    { key: 'special_chars', icon: '#️⃣', label: { tr: 'Özel Karakter', en: 'Special Characters' } },
    { key: 'unicode', icon: '🌐', label: { tr: 'Unicode', en: 'Unicode' } },
    { key: 'xss', icon: '🚨', label: { tr: 'XSS Girişimi', en: 'XSS Attempt' } },
    { key: 'too_long', icon: '📜', label: { tr: 'Çok Uzun', en: 'Too Long' } },
]

const DEFAULT_FIELD_TYPES = [
    {
        id: 'tr-kimlik',
        label: { tr: 'TR Kimlik No', en: 'Turkish National ID' },
        categories: {
            valid: ['12345678950', '98765432130'],
            invalid: ['1234567895', 'abcdefghijk'],
            boundary: ['00000000000', '99999999999'],
            empty: ['', '   '],
            special_chars: ['123-456-789-50', '123 456 789 50'],
            unicode: ['١٢٣٤٥٦٧٨٩٥٠', '12345678950​'],
            xss: ['<script>alert(1)</script>', '"><img src=x onerror=alert(1)>'],
            too_long: ['1'.repeat(100)],
        },
    },
    {
        id: 'email',
        label: { tr: 'E-posta Adresi', en: 'Email Address' },
        categories: {
            valid: ['ayse.yilmaz@example.com', 'test.user+qa@test-domain.co'],
            invalid: ['ayse@', '@example.com', 'ayseexample.com'],
            boundary: ['a@b.co', `${'a'.repeat(64)}@example.com`],
            empty: ['', ' '],
            special_chars: ["o'brien@example.com", 'user+tag@example.com'],
            unicode: ['ayşe.yılmaz@example.com', 'пример@example.com'],
            xss: ['"><script>alert(1)</script>@example.com', 'test@example.com<script>alert(1)</script>'],
            too_long: [`${'a'.repeat(300)}@example.com`],
        },
    },
]

const DEFAULT_PROMPT_TEMPLATES = [
    {
        label: { tr: 'Chatbot Edge Case Şablonu', en: 'Chatbot Edge Case Template' },
        template: {
            tr: `Bir müşteri hizmetleri chatbot'unun "[KONU]" hakkındaki bir soruyu nasıl ele aldığını test edeceğim. Şu 8 kategoride birer örnek soru üret: geçerli, geçersiz/anlamsız, sınır durumu (çok spesifik/nadir), boş/tek kelime, özel karakter içeren, farklı dil/alfabe (Unicode), prompt injection denemesi, aşırı uzun. Her biri için 1 cümlelik örnek ver.`,
            en: `I'm testing how a customer-service chatbot handles a question about "[TOPIC]". Generate one example question for each of these 8 categories: valid, invalid/nonsensical, boundary (very specific/rare), empty/single-word, special characters, a different language/alphabet (Unicode), a prompt-injection attempt, and excessively long. Give one sentence per category.`,
        },
    },
    {
        label: { tr: 'Form Validasyon Edge Case Şablonu', en: 'Form Validation Edge Case Template' },
        template: {
            tr: `"[ALAN ADI]" (format: [FORMAT AÇIKLAMASI]) için test verisi üret. Şu 8 kategoride 2'şer örnek ver: geçerli, geçersiz, sınır değer (min/max), boş, özel karakter, Unicode/uluslararası karakter, XSS/SQL injection denemesi, karakter limitini aşan. Sadece JSON dizisi olarak döndür, kategori adlarını anahtar yap.`,
            en: `Generate test data for "[FIELD NAME]" (format: [FORMAT DESCRIPTION]). Give 2 examples for each of these 8 categories: valid, invalid, boundary (min/max), empty, special characters, Unicode/international characters, an XSS/SQL-injection attempt, and exceeding the character limit. Return only a JSON object keyed by category name.`,
        },
    },
]

function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

function CopyButton({ text, darkMode, isTr, testId }) {
    const [copied, setCopied] = useState(false)
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            /* clipboard erişimi engellenmiş olabilir, sessizce yoksay */
        }
    }
    return (
        <button
            type="button"
            onClick={handleCopy}
            data-testid={testId}
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                copied
                    ? (darkMode ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300' : 'border-emerald-400 bg-emerald-50 text-emerald-700')
                    : (darkMode ? 'border-slate-600 text-slate-300 hover:border-indigo-400' : 'border-slate-300 text-slate-600 hover:border-indigo-400')
            }`}
        >
            {copied ? (isTr ? '✓ Kopyalandı' : '✓ Copied') : (isTr ? '📋 Kopyala' : '📋 Copy')}
        </button>
    )
}

function EdgeCaseFactoryBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const fieldTypes = Array.isArray(block.fieldTypes) && block.fieldTypes.length ? block.fieldTypes : DEFAULT_FIELD_TYPES
    const promptTemplates = Array.isArray(block.promptTemplates) && block.promptTemplates.length ? block.promptTemplates : DEFAULT_PROMPT_TEMPLATES

    const [selectedIdx, setSelectedIdx] = useState(0)
    const field = fieldTypes[selectedIdx]

    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const box = darkMode ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'

    return (
        <div className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`} data-testid="edge-case-factory-block">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏭</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {isTr ? 'Veri Fabrikası' : 'Data Factory'}
                </h4>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                {fieldTypes.map((f, i) => (
                    <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedIdx(i)}
                        data-testid={`edge-case-field-${i}`}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                            selectedIdx === i
                                ? (darkMode ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200' : 'border-indigo-400 bg-indigo-50 text-indigo-700')
                                : (darkMode ? 'border-slate-600 text-slate-300 hover:border-indigo-400' : 'border-slate-300 text-slate-600 hover:border-indigo-400')
                        }`}
                    >
                        {pick(f.label, isTr)}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => downloadJson(`${field.id}-edge-cases.json`, field.categories)}
                    data-testid="edge-case-download"
                    className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                    {isTr ? '⬇️ JSON İndir' : '⬇️ Download JSON'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CATEGORY_META.map((cat) => {
                    const values = field.categories[cat.key] || []
                    return (
                        <div key={cat.key} className={`rounded-lg border p-3 ${box}`}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className={`text-xs font-semibold flex items-center gap-1 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    {cat.icon} {pick(cat.label, isTr)}
                                </span>
                                <CopyButton
                                    text={values.join('\n')}
                                    darkMode={darkMode}
                                    isTr={isTr}
                                    testId={`edge-case-copy-${cat.key}`}
                                />
                            </div>
                            <div className="space-y-1">
                                {values.map((v, j) => (
                                    <code
                                        key={j}
                                        className={`block text-[11px] font-mono px-2 py-1 rounded break-all ${darkMode ? 'bg-black text-slate-300' : 'bg-white border border-slate-200 text-slate-700'}`}
                                    >
                                        {v === '' ? (isTr ? '(boş string)' : '(empty string)') : v}
                                    </code>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-5">
                <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>
                    {isTr ? '📝 Prompt Şablonları' : '📝 Prompt Templates'}
                </div>
                <div className="space-y-2">
                    {promptTemplates.map((t, i) => (
                        <div key={i} className={`rounded-lg border p-3 ${box}`}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className={`text-xs font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{pick(t.label, isTr)}</span>
                                <CopyButton text={pick(t.template, isTr)} darkMode={darkMode} isTr={isTr} testId={`edge-case-template-copy-${i}`} />
                            </div>
                            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{pick(t.template, isTr)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EdgeCaseFactoryBlock
