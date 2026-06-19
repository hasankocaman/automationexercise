import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLocation, Link } from 'react-router-dom'
import TopicHeader from './TopicHeader'

const codeCommentTranslations = [
    [/Chrome options oluştur/gi, 'Create Chrome options'],
    [/BrowserStack W3C capability'leri/gi, 'BrowserStack W3C capabilities'],
    [/BS kullanıcı adı/gi, 'BS username'],
    [/BS erişim anahtarı/gi, 'BS access key'],
    [/Tarayıcı: Chrome\/Firefox\/Safari\/Edge/gi, 'Browser: Chrome/Firefox/Safari/Edge'],
    [/Sürüm: "latest" veya "120\.0"/gi, 'Version: "latest" or "120.0"'],
    [/OS sürümü/gi, 'OS version'],
    [/Dashboard'da görünecek isim/gi, 'Name shown in the dashboard'],
    [/Dashboard'da görünecek build adı/gi, 'Build name shown in the dashboard'],
    [/Dashboard'da görünür/gi, 'Visible in the dashboard'],
    [/Proje adı/gi, 'Project name'],
    [/BS'e gönder/gi, 'Send to BS'],
    [/Test URL'ine git/gi, 'Open the test URL'],
    [/Siteye git/gi, 'Open the site'],
    [/Sayfa başlığını yazdır/gi, 'Print the page title'],
    [/Başlığı al/gi, 'Read the title'],
    [/Başlık yanlış/gi, 'Wrong title'],
    [/Oturumu kapat/gi, 'Close the session'],
    [/BS Dashboard'dan al/gi, 'Get from BS Dashboard'],
    [/1\. tarayıcı/gi, '1st browser'],
    [/2\. tarayıcı \(paralel çalışır\)/gi, '2nd browser (runs in parallel)'],
    [/3\. tarayıcı/gi, '3rd browser'],
    [/Her OS'te kaç paralel test/gi, 'Parallel tests per OS'],
    [/Localhost test için true yap/gi, 'Set true for localhost testing'],
    [/Proje kökünde oluştur/gi, 'Create at the project root'],
    [/Python kodunda kullanım/gi, 'Usage in Python code'],
    [/Normal Selenium import/gi, 'Regular Selenium import'],
    [/SDK bu oluşturma sürecini otomatik yönetir/gi, 'The SDK manages this creation process automatically'],
    [/Normal Chrome options/gi, 'Regular Chrome options'],
    [/Yerel ChromeDriver gibi görünür/gi, 'Looks like local ChromeDriver'],
    [/Testi çalıştır/gi, 'Run the test'],
    [/Temizlik yap/gi, 'Clean up'],
    [/Login sayfası başlık kontrolü/gi, 'Login page title check'],
    [/Doğrula/gi, 'Assert'],
    [/browserstack\.yml dosyasının bulunduğu dizinde çalıştır/gi, 'Run in the directory that contains browserstack.yml'],
    [/Paralel çalıştırmak için/gi, 'To run in parallel'],
    [/BrowserStack RemoteWebDriver oluşturan factory fonksiyon/gi, 'Factory function that creates BrowserStack RemoteWebDriver'],
    [/Env'den oku/gi, 'Read from env'],
    [/Ağ loglarını kaydet/gi, 'Record network logs'],
    [/Sadece hataları logla/gi, 'Log only errors'],
    [/Video kaydı aç/gi, 'Enable video recording'],
    [/Son sürüm Chrome/gi, 'Latest Chrome version'],
    [/BS özelliklerini ekle/gi, 'Add BS capabilities'],
    [/Kullanım/gi, 'Usage'],
    [/Pass\/Fail işaretlemeli driver fixture/gi, 'Driver fixture with pass/fail reporting'],
    [/driver kurulumu/gi, 'driver setup'],
    [/Test bitti — sonucu BrowserStack'e bildir/gi, 'Test finished - report the result to BrowserStack'],
    [/Hata mesajı/gi, 'Error message'],
    [/JavaScript executor ile BS API'yi çağır/gi, 'Call the BS API via JavaScript executor'],
    [/pytest hook — test sonucunu fixture'a taşı/gi, 'pytest hook - move test result into the fixture'],
    [/request\.node\.rep_call'u doldur/gi, 'Populate request.node.rep_call'],
    [/aynı mantık/gi, 'same logic'],
    [/Playwright destekli/gi, 'Playwright-supported'],
    [/Safari engine \(sadece BS'te\)/gi, 'Safari engine (BS only)'],
    [/Firefox engine/gi, 'Firefox engine'],
    [/Playwright olduğunu belirt/gi, 'Declare this is Playwright'],
    [/Playwright sürümü/gi, 'Playwright version'],
    [/E-ticaret ürün arama testi/gi, 'E-commerce product search test'],
    [/Ana sayfaya git/gi, 'Open the home page'],
    [/Arama kutusunu doldur/gi, 'Fill the search box'],
    [/Ara butonuna tıkla/gi, 'Click the search button'],
    [/Sonuçların yüklenmesini bekle/gi, 'Wait for results to load'],
    [/İlk ürüne tıkla/gi, 'Click the first product'],
    [/Ürün detay sayfasında olduğumuzu doğrula/gi, 'Assert we are on the product detail page'],
    [/Sepete ekleme testi/gi, 'Add-to-cart test'],
    [/Sepette 1 ürün/gi, '1 item in the cart'],
    [/Tüm testleri BS'te çalıştır/gi, 'Run all tests on BS'],
    [/Belirli bir test dosyasını çalıştır/gi, 'Run a specific test file'],
    [/Kodu çek/gi, 'Check out the code'],
    [/Bağımlılıkları yükle/gi, 'Install dependencies'],
    [/Snapshot al — Percy karşılaştırır/gi, 'Take a snapshot - Percy compares it'],
    [/YANLIŞ/gi, 'WRONG'],
    [/DOĞRU/gi, 'FIXED'],
    [/Yanlış/gi, 'Wrong'],
    [/Doğru/gi, 'Correct'],
    [/Sabit kodlanmış ve yanlış key/gi, 'Hardcoded and wrong key'],
    [/Env'den al/gi, 'Read from env'],
    [/Yanlış OS adı/gi, 'Wrong OS name'],
    [/Doğru format/gi, 'Correct format'],
    [/BS Capabilities Generator'dan alınan değer/gi, 'Value from BS Capabilities Generator'],
    [/Limit aşımı/gi, 'Limit exceeded'],
    [/Free plan için/gi, 'For the free plan'],
    [/Paid plan'da daha yüksek değer girebilirsin/gi, 'You can use a higher value on a paid plan'],
    [/Uzun sleep test'i dondurur/gi, 'Long sleep freezes the test'],
    [/90s limit aşıldı, BS session'ı keser/gi, '90s limit exceeded; BS ends the session'],
    [/Explicit wait kullan/gi, 'Use explicit wait'],
    [/Max 30s bekle/gi, 'Wait max 30s'],
    [/Local açık ama binary yok/gi, 'Local is enabled but the binary is missing'],
    [/Binary çalışmazsa bağlantı hatası/gi, 'Connection error if the binary is not running'],
    [/Terminal 2 \(binary çalışınca\)/gi, 'Terminal 2 (after the binary starts)'],
    [/Sabit isim — 60 gün sonra silinir/gi, 'Fixed name - deleted after 60 days'],
    [/Sertifika kabulü eksik/gi, 'Certificate acceptance is missing'],
    [/Self-signed sertifikayı kabul et/gi, 'Accept the self-signed certificate'],
    [/Lokal tünel üzerinden git/gi, 'Go through the local tunnel'],
    [/Sunucu 8080'de dinliyor/gi, 'Server is listening on 8080'],
    [/Yanlış host\/port/gi, 'Wrong host/port'],
    [/Doğru port/gi, 'Correct port'],
    [/Yanlış JSON path/gi, 'Wrong JSON path'],
    [/response yapısı farklı/gi, 'response shape is different'],
    [/Gerçek response/gi, 'Actual response'],
    [/Doğru JSON path/gi, 'Correct JSON path'],
    [/Assertion ekle/gi, 'Add assertion'],
    [/extraction başarısız olursa test başarısız say/gi, 'fail the test if extraction fails'],
    [/büyük testte View Results Tree etkin/gi, 'View Results Tree enabled in a large test'],
    [/büyük testlerde yalnızca verimli listener'lar/gi, 'only efficient listeners in large tests'],
    [/JVM heap'i artır/gi, 'Increase JVM heap'],
    [/Çok kısa timeout ve aşırı agresif ramp-up/gi, 'Timeout too short and ramp-up too aggressive'],
    [/Gerçekçi timeout ve kademeli ramp-up/gi, 'Realistic timeout and gradual ramp-up'],
    [/Assertion başarısız/gi, 'Assertion failed'],
    [/login başarısız ama fark edilmedi/gi, 'login failed but was not detected'],
    [/İki katmanlı doğrulama/gi, 'Two-layer validation'],
    [/Login isteğine de assertion ekle/gi, 'Add an assertion to the login request too'],
    [/Kurulum/gi, 'Setup'],
    [/Doğrulama/gi, 'Assertion'],
    [/Postman ile karşılaştırma/gi, 'Comparison with Postman'],
    [/tekrar eden email ekliyor/gi, 'inserts a duplicate email'],
    [/çakışmada güncelle \(upsert\)/gi, 'update on conflict (upsert)'],
    [/veya sadece yok say/gi, 'or simply ignore'],
    [/users tablosunda id=999 yok/gi, 'id=999 does not exist in users'],
    [/önce parent'ı ekle/gi, 'insert the parent first'],
    [/SQLite'de FK denetimini etkinleştir/gi, 'enable FK checks in SQLite'],
    [/email NOT NULL ama değer verilmedi/gi, 'email is NOT NULL but no value was provided'],
    [/tüm NOT NULL sütunlara değer ver/gi, 'provide values for all NOT NULL columns'],
    [/veya default ekle/gi, 'or add a default'],
    [/FROM yerine FORM yazılmış/gi, 'FORM was typed instead of FROM'],
    [/keyword doğru yazılmış/gi, 'keyword spelled correctly'],
    [/Rezerve kelime kullanımı/gi, 'Reserved word usage'],
    [/backtick ile sarılmış/gi, 'wrapped with backticks'],
    [/tablo henüz oluşturulmamış/gi, 'table has not been created yet'],
    [/önce tabloyu oluştur/gi, 'create the table first'],
    [/her iki tabloda da "id" var/gi, '"id" exists in both tables'],
    [/tablo adıyla nitelendir/gi, 'qualify with table name'],
    [/veya alias kullan/gi, 'or use an alias'],
    [/4 sütun var ama 3 değer veriliyor/gi, '4 columns exist but 3 values are supplied'],
    [/sütun isimlerini açıkça belirt/gi, 'explicitly list column names'],
    [/role sütunu NULL alır \(ya da DEFAULT değeri\)/gi, 'role column receives NULL (or DEFAULT value)'],
    [/genel CSS selector, değişime açık/gi, 'generic CSS selector, fragile to changes'],
    [/data-testid ile stabil locator/gi, 'stable locator with data-testid'],
    [/veya rol \+ isim ile/gi, 'or by role + name'],
    [/çok genel, birden fazla eşleşiyor/gi, 'too broad, matches multiple elements'],
    [/etiket ile spesifik element/gi, 'specific element by label'],
    [/veya nth\(\) ile belirli indeks/gi, 'or a specific index with nth()'],
    [/page'i manuel kapatıp sonra kullanmaya çalışmak/gi, 'manually closing page and then trying to use it'],
    [/fixture'lar sayfa ömrünü yönetir/gi, 'fixtures manage the page lifecycle'],
    [/page otomatik açılır ve test sonunda kapatılır/gi, 'page opens automatically and closes at the end of the test'],
    [/page burada otomatik kapanır/gi, 'page closes automatically here'],
    [/uygulama başlamadan test çalışıyor/gi, 'test runs before the app starts'],
    [/uygulamayı başlat/gi, 'start the app'],
    [/hazır olana dek bekle/gi, 'wait until ready'],
    [/aksiyon tamamlanmadan assertion/gi, 'assertion before the action finishes'],
    [/çok hızlı/gi, 'too fast'],
    [/yeterli timeout ile bekle/gi, 'wait with enough timeout'],
    [/veya response bekliyorsan/gi, 'or if you are waiting for a response'],
    [/string enum yerine geçirilemiyor/gi, 'cannot be passed instead of string enum'],
    [/TS2345 hatası/gi, 'TS2345 error'],
    [/enum değeri kullan/gi, 'use the enum value'],
    [/veya dışarıdan gelen string'i cast et/gi, 'or cast the external string'],
    [/dikkatli kullan — doğrulama ekle/gi, 'use carefully - add validation'],
    [/Başlık yanlış/gi, 'Wrong title'],
    [/Ürün detay sayfasında olduğumuzu Assert/gi, 'Assert we are on the product detail page'],
    [/BS bağlantısı/gi, 'BS connection'],
    [/Sabit kodlanmış ve Wrong key/gi, 'Hardcoded and wrong key'],
    [/Wrong OS adı/gi, 'Wrong OS name'],
    [/Wrong! "OS X" olmalı/gi, 'Wrong! Should be "OS X"'],
    [/İki katmanlı Assertma/gi, 'Two-layer validation'],
    [/Login isteğine de Add assertion/gi, 'Add an assertion to the login request too'],
    [/keyword FIXED yazılmış/gi, 'keyword spelled correctly'],
    [/Rezerve kelime Usageı/gi, 'Reserved word usage'],
    [/Tablo:/gi, 'Table:'],
    [/HATA/gi, 'ERROR'],
    [/Assertma/gi, 'validation'],
    [/Usageı/gi, 'usage'],
    [/dikkatli kullan — validation ekle/gi, 'use carefully - add validation'],
    [/Kullanıcı Adı/gi, 'Username'],
    [/Giriş Yap/gi, 'Login'],
    [/Türkiye/gi, 'Turkey'],
    [/türkiye/gi, 'turkey'],
    [/Başlık yanlış/gi, 'Wrong title'],
    [/Ürün ara\.\.\./gi, 'Search product...'],
    [/name="Ara"/gi, 'name="Search"'],
    [/Sepete Ekle/gi, 'Add to Cart'],
    [/Şifremi Unuttum/gi, 'Forgot Password'],
    [/Şifrem/gi, 'Password'],
    [/Kullanıcı/gi, 'User'],
    [/Giriş/gi, 'Login'],
    [/data anahtarı yok/gi, 'data key does not exist'],
    [/Not: ✓ \(yoksa başarısız say\)/gi, 'Note: ✓ (otherwise mark failed)'],
    [/tüm yanıtları RAM'de saklar/gi, 'stores all responses in RAM'],
    [/HTML raporu test sonrası üret/gi, 'generate HTML report after the test'],
    [/5 dakikada kademeli artış/gi, 'gradual increase over 5 minutes'],
    [/Login'de ERROR olduğu için "Invalid credentials" dönüyor/gi, 'Login has ERROR, so "Invalid credentials" is returned'],
    [/token yoksa login başarısız demektir/gi, 'missing token means login failed'],
    [/Build grubu/gi, 'Build group'],
    [/BS hub URL'i/gi, 'BS hub URL'],
]

function translateCodeComment(comment) {
    return codeCommentTranslations.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), comment)
}

function localizeCodeComments(code, language) {
    if (language !== 'en' || typeof code !== 'string') return code
    return code.split('\n').map(line => {
        const markerMatch = line.match(/(#|\/\/|--)/)
        if (!markerMatch) return translateCodeComment(line)
        const markerIndex = markerMatch.index
        const before = line.slice(0, markerIndex + markerMatch[0].length)
        const after = line.slice(markerIndex + markerMatch[0].length)
        return translateCodeComment(before) + translateCodeComment(after)
    }).join('\n')
}

function getLocalizedCode(code, language) {
    return localizeCodeComments(code || '', language)
}

// ─── CodeBlock ────────────────────────────────────────────────────────────────

function CodeBlock({ code, language, darkMode }) {
    const { language: pageLanguage } = useLanguage()
    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)
    const prismLang = language ? language.toLowerCase().replace(/[\s/().]/g, '') : ''
    const localizedCode = getLocalizedCode(code, pageLanguage)

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current)
        }
    }, [localizedCode])

    return (
        <div className="relative mt-3 group">
            {language && (
                <div className="absolute top-2 left-3 z-10 text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 font-mono select-none">
                    {language}
                </div>
            )}
            <pre className={`p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-gray-700 ${language ? 'pt-8' : ''} ${prismLang ? `language-${prismLang}` : ''}`} style={{ background: '#0d1117', color: '#e6edf3' }}>
                <code ref={codeRef} className={prismLang ? `language-${prismLang}` : ''}>{localizedCode.trim()}</code>
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText(localizedCode.trim()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? '✅ Copied' : '📋 Copy'}
            </button>
        </div>
    )
}

// ─── ExerciseBlock ────────────────────────────────────────────────────────────

function ExerciseBlock({ block, darkMode }) {
    const { language, t } = useLanguage()
    const isTr = language === 'tr'
    const [showSolution, setShowSolution] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const diffBg = block.difficulty?.startsWith('🟢')
        ? (darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-300')
        : block.difficulty?.startsWith('🟡')
            ? (darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-300')
            : (darkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-300')
    return (
        <div className={`mt-6 rounded-xl border-2 p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${diffBg}`}>
            <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${diffBg}`}>{block.difficulty}</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</span>
            </div>
            <p className={`text-sm mb-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{block.description}</p>
            {block.hint && (
                <div className="mb-3">
                    <button onClick={() => setShowHint(!showHint)} className="text-xs text-blue-400 hover:underline">
                        {showHint ? t('topic.hideHint') : t('topic.showHint')}
                    </button>
                    {showHint && <p className={`mt-2 text-xs p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>{block.hint}</p>}
                </div>
            )}
            <button
                onClick={() => setShowSolution(!showSolution)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${showSolution
                    ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700')
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md'
                    }`}
            >
                {showSolution ? t('topic.hideSolution') : t('topic.showSolution')}
            </button>
            {showSolution && (
                <div className="mt-3">
                    <CodeBlock code={block.solution} darkMode={darkMode} />
                    {block.explanation && (
                        <p className={`mt-3 text-xs leading-relaxed italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            💡 {block.explanation}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── PostmanCompareBlock ──────────────────────────────────────────────────────

function PostmanCompareBlock({ block, darkMode, language }) {
    const { t } = useLanguage()
    const [show, setShow] = useState(false)
    const isTr = language === 'tr'
    return (
        <div className="mt-6">
            <button
                onClick={() => setShow(!show)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${show
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : darkMode
                        ? 'bg-orange-900/20 text-orange-300 border-2 border-orange-700 hover:bg-orange-900/40'
                        : 'bg-orange-50 text-orange-700 border-2 border-orange-300 hover:bg-orange-100'
                    }`}
            >
                <span className="flex items-center gap-3">
                    <span className="text-xl">📮</span>
                    <span>{t('topic.postmanDescription')}</span>
                </span>
                <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full ${show ? 'bg-white/20 text-white' : darkMode ? 'bg-orange-900/40 text-orange-300' : 'bg-orange-200 text-orange-700'}`}>
                    {show ? t('topic.postmanHide') : t('topic.postmanShow')}
                </span>
            </button>
            {show && (
                <div className="mt-4 space-y-4">
                    {block.comparisons?.map((comp, idx) => (
                        <div key={idx} className={`rounded-xl overflow-hidden border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                                <span>🔀</span> {comp.scenario}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className={`p-4 border-r-0 md:border-r border-b md:border-b-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-base">📮</span>
                                        <span className="text-xs font-bold text-orange-400">Postman</span>
                                    </div>
                                    <div className={`text-sm leading-relaxed space-y-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {(comp.postman || '').split('\n').map((line, l) => (
                                            <div key={l} className={`flex items-start gap-2 ${line.startsWith('→') ? 'ml-3 opacity-70' : ''}`}>
                                                {!line.startsWith('→') && !line.startsWith(' ') && line.trim() && (
                                                    <span className="text-orange-400 flex-shrink-0 mt-0.5">•</span>
                                                )}
                                                <span className={line.startsWith('→') ? 'text-xs' : ''}>{line.replace(/^→\s*/, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="px-4 py-2 text-xs font-bold flex items-center gap-2" style={{ background: '#1a1b26', color: '#7aa2f7' }}>
                                        <span>☕</span> REST Assured (Java)
                                    </div>
                                    <div className="overflow-x-auto" style={{ background: '#1a1b26' }}>
                                        <pre className="font-mono text-xs leading-relaxed whitespace-pre p-4 m-0" style={{ background: '#1a1b26', color: '#c0caf5' }}>{getLocalizedCode(comp.restAssured, language)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── QuizBlock ────────────────────────────────────────────────────────────────

function QuizBlock({ block, darkMode, language = 'en', onQuizCorrect }) {
    const { t } = useLanguage()
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [correctFired, setCorrectFired] = useState(false)
    // Support both numeric index (correct: 1) and string id (correct: 'b')
    const normalizedCorrect = typeof block.correct === 'number'
        ? String.fromCharCode(97 + block.correct)
        : block.correct
    const isCorrect = selected === normalizedCorrect
    // Support both plain string options and {id, text} object options
    const normalizeOption = (opt, i) => {
        if (typeof opt === 'string') return { id: String.fromCharCode(97 + i), text: opt }
        return opt
    }
    const options = (block.options || []).map(normalizeOption)
    return (
        <div className={`mt-6 p-5 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🧠</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{t('topic.quiz.title')}</span>
            </div>
            <p className={`text-sm font-semibold mb-4 leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.question, language)}</p>
            <div className="space-y-2">
                {options.map((opt, i) => {
                    const isCorrectOpt = opt.id === normalizedCorrect
                    const isSelected = selected === opt.id
                    return (
                        <button
                            key={opt.id || i}
                            onClick={() => !submitted && setSelected(opt.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 border-2 ${submitted
                                ? isCorrectOpt
                                    ? darkMode ? 'bg-green-500/20 border-green-500 text-green-300 font-semibold' : 'bg-green-50 border-green-500 text-green-800 font-semibold'
                                    : isSelected && !isCorrectOpt
                                        ? darkMode ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-red-50 border-red-500 text-red-700'
                                        : darkMode ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-white border-gray-200 text-gray-500'
                                : isSelected
                                    ? darkMode ? 'bg-indigo-800 border-indigo-500 text-indigo-200' : 'bg-indigo-100 border-indigo-400 text-indigo-800'
                                    : darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                        >
                            <span className="font-mono font-bold mr-2">{opt.id?.toUpperCase() || String.fromCharCode(65 + i)}.</span>
                            {tx(opt.text, language)}
                            {submitted && isCorrectOpt && <span className="ml-2">✓</span>}
                            {submitted && isSelected && !isCorrectOpt && <span className="ml-2">✗</span>}
                        </button>
                    )
                })}
            </div>
            {!submitted && selected !== null && (
                <button
                    onClick={() => {
                        setSubmitted(true)
                        if (isCorrect && !correctFired && onQuizCorrect) {
                            setCorrectFired(true)
                            onQuizCorrect()
                        }
                    }}
                    className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all active:scale-95"
                >
                    {t('topic.quiz.checkAnswer')} →
                </button>
            )}
            {submitted && (
                <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed ${isCorrect ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200') : (darkMode ? 'bg-amber-900/30 text-amber-300 border border-amber-700' : 'bg-amber-50 text-amber-800 border border-amber-200')}`}>
                    <span className="font-bold">{isCorrect ? t('topic.quiz.correctPrefix') : t('topic.quiz.incorrectPrefix')}</span>
                    {tx(block.explanation, language)}
                </div>
            )}
        </div>
    )
}

// ─── ComparisonBlock ──────────────────────────────────────────────────────────

function ComparisonBlock({ block, darkMode, language = 'en' }) {
    const { t } = useLanguage()
    // Table-style comparison: { title, columns, rows: [{concept, java, python, typescript}] }
    if (block.columns && block.rows) {
        const cols = block.columns
        return (
            <div className={`mt-5 rounded-xl overflow-hidden border ${darkMode ? 'border-indigo-800' : 'border-indigo-200'}`}>
                {block.title && (
                    <div className={`px-4 py-2.5 text-sm font-bold flex items-center gap-2 ${darkMode ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                        ⚖️ {tx(block.title, language)}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                <th className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                    {t('topic.comparison.concept')}
                                </th>
                                {cols.map((col, j) => (
                                    <th key={j} className={`p-3 text-left font-semibold border-b font-mono ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <td className={`p-3 font-semibold text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {tx(row.concept, language)}
                                    </td>
                                    {cols.map((col, k) => {
                                        // 'Java (HashMap)' → 'java', 'Python (list)' → 'python'
                                        const key = col.split(/[\s(]/)[0].toLowerCase()
                                        const val = row[key] ?? row[col.toLowerCase()] ?? row[col] ?? ''
                                        return (
                                            <td key={k} className={`p-3 font-mono text-xs ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                                {val}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    // Code side-by-side comparison: { left: {label, code, note}, right: {label, code, note} }
    return (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[block.left, block.right].map((side, idx) => {
                if (!side) return null
                const isLeft = idx === 0
                return (
                    <div key={idx} className={`rounded-xl overflow-hidden border-2 ${isLeft ? 'border-red-500/60' : 'border-green-500/60'}`}>
                        <div className={`px-4 py-2 text-sm font-bold ${isLeft ? (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600') : (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600')}`}>
                            {tx(side.label, language)}
                        </div>
                        <div style={{ background: '#0d1117' }}>
                            <pre className="font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap p-4 m-0" style={{ background: '#0d1117', color: '#e6edf3' }}>{side.code}</pre>
                        </div>
                        {side.note && (
                            <div className={`px-4 py-2 text-xs ${isLeft ? (darkMode ? 'text-red-400 bg-red-900/10' : 'text-red-600 bg-red-50') : (darkMode ? 'text-green-400 bg-green-900/10' : 'text-green-600 bg-green-50')}`}>
                                {isLeft ? '❌ ' : '✅ '}{tx(side.note, language)}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─── Visual Sub-components ────────────────────────────────────────────────────

function JoinDiagram({ block, darkMode, language = 'en' }) {
    const [step, setStep] = useState(0)
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    const matchRow = darkMode ? 'bg-green-900/50 text-green-300 border-green-700' : 'bg-green-100 text-green-800 border-green-300'
    const nullRow = darkMode ? 'bg-blue-900/30 text-blue-300 border-blue-700 italic' : 'bg-blue-50 text-blue-600 border-blue-200 italic'
    const noRow = darkMode ? 'bg-gray-800 text-gray-500 border-gray-700 opacity-40' : 'bg-gray-100 text-gray-400 border-gray-200 opacity-50'
    const normalRow = darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-200'

    const getRowStyle = (row) => {
        if (step === 0) return normalRow
        if (row.matched) return matchRow
        if (row.nullFill) return nullRow
        return noRow
    }

    return (
        <div className={`mt-5 p-5 rounded-xl border ${bg}`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className={`font-mono font-bold text-sm px-3 py-1.5 rounded-lg ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    {block.joinType}
                </div>
                <div className="flex gap-2">
                    {step < 2 ? (
                        <button onClick={() => setStep(s => s + 1)} className="text-xs px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition-all font-semibold">
                            {step === 0 ? (language === 'tr' ? 'Eşleşmeleri Göster →' : 'Show Matches →') : (language === 'tr' ? 'Sonucu Göster →' : 'Show Result →')}
                        </button>
                    ) : (
                        <button onClick={() => setStep(0)} className="text-xs px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-all font-semibold">
                            ↺ {language === 'tr' ? 'Sıfırla' : 'Reset'}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-3 items-start overflow-x-auto">
                <div>
                    <div className={`text-xs font-bold mb-2 text-center px-2 py-1.5 rounded-lg ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                        📋 {block.leftTable.name}
                    </div>
                    {block.leftTable.rows.map((row, i) => (
                        <div key={i} className={`text-xs px-2 py-1.5 rounded-lg mb-1.5 font-mono border transition-all duration-300 ${getRowStyle(row)}`}>
                            {row.label}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center pt-8 gap-3">
                    <div className="relative w-16 h-10">
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'} opacity-70`} />
                        <div className={`absolute right-0 top-0 w-8 h-8 rounded-full border-2 ${darkMode ? 'border-orange-400' : 'border-orange-500'} opacity-70`} />
                        <div className={`absolute left-1/2 -translate-x-1/2 top-1 w-4 h-6 rounded-sm ${block.joinType?.includes('INNER') ? 'bg-green-500/60' :
                            block.joinType?.includes('LEFT') ? 'bg-blue-500/60' :
                                block.joinType?.includes('RIGHT') ? 'bg-orange-500/60' :
                                    'bg-purple-500/60'
                            }`} />
                    </div>
                    <div className={`text-xs text-center font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ON</div>
                </div>

                <div>
                    <div className={`text-xs font-bold mb-2 text-center px-2 py-1.5 rounded-lg ${darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
                        📋 {block.rightTable.name}
                    </div>
                    {block.rightTable.rows.map((row, i) => (
                        <div key={i} className={`text-xs px-2 py-1.5 rounded-lg mb-1.5 font-mono border transition-all duration-300 ${getRowStyle(row)}`}>
                            {row.label}
                        </div>
                    ))}
                </div>
            </div>

            {step === 2 && block.resultRows && (
                <div className="mt-4 transition-all duration-300">
                    <div className={`text-xs font-bold mb-2 px-2 py-1 rounded-lg inline-block ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'}`}>
                        ✅ {language === 'tr' ? 'Sorgu Sonucu' : 'Query Result'} — {block.resultRows.length} {language === 'tr' ? 'satır' : 'rows'}
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-700">
                        <table className="w-full text-xs">
                            <thead>
                                <tr>
                                    {block.resultHeaders?.map((h, j) => (
                                        <th key={j} className={`px-3 py-2 text-left font-semibold ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.resultRows.map((row, j) => (
                                    <tr key={j} className={`border-t ${darkMode ? 'border-gray-700 bg-indigo-900/20 text-indigo-300' : 'border-gray-200 bg-indigo-50 text-indigo-700'}`}>
                                        {row.map((cell, k) => (
                                            <td key={k} className="px-3 py-2 font-mono">{cell === null ? <span className="opacity-50 not-italic">NULL</span> : String(cell)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {block.explanation && (
                <p className={`mt-4 text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    💡 {block.explanation}
                </p>
            )}
        </div>
    )
}

function TableDiagram({ block, darkMode }) {
    const { language } = useLanguage()
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg} overflow-x-auto`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
            <div className="flex flex-wrap gap-6 items-start">
                {block.tables?.map((table, t) => (
                    <div key={t} className="flex-shrink-0">
                        <div className={`text-xs font-bold px-3 py-1.5 rounded-t-lg text-center ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-600 text-white'}`}>
                            📋 {tx(table.name, language)}
                        </div>
                        <table className="text-xs border-collapse">
                            <thead>
                                <tr>
                                    {table.columns?.map((col, c) => (
                                        <th key={c} className={`px-3 py-1.5 border text-left whitespace-nowrap ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
                                            {col.pk && <span className="mr-1">🔑</span>}
                                            {col.fk && <span className="mr-1">🔗</span>}
                                            {typeof col === 'string' ? col : tx(col.name, language)}
                                            {col.type && <span className={`ml-1 font-normal text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({tx(col.type, language)})</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows?.map((row, r) => (
                                    <tr key={r} className={row.highlighted ? (darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50') : ''}>
                                        {row.cells?.map((cell, c) => (
                                            <td key={c} className={`px-3 py-1.5 border font-mono ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                                                {cell === null ? <span className="opacity-40 italic">NULL</span> : tx(cell, language)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
        </div>
    )
}

function FlowDiagram({ block, darkMode }) {
    const { language } = useLanguage()
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
            <div className="flex flex-wrap items-center gap-1 justify-center">
                {block.steps?.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className={`px-3 py-2.5 rounded-xl border-2 text-center text-xs min-w-[70px] transition-all ${step.highlight
                            ? (darkMode ? 'bg-indigo-900 border-indigo-500 text-indigo-300' : 'bg-indigo-100 border-indigo-400 text-indigo-800')
                            : (darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700')
                            }`}>
                            {step.num && (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1 text-xs font-bold ${darkMode ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white'}`}>
                                    {step.num}
                                </div>
                            )}
                            <div className="font-bold leading-tight">{tx(step.label, language)}</div>
                            {step.desc && <div className={`mt-0.5 font-normal text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(step.desc, language)}</div>}
                        </div>
                        {i < block.steps.length - 1 && (
                            <span className={`text-lg font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>→</span>
                        )}
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
        </div>
    )
}

function BoxesDiagram({ block, darkMode }) {
    const { language } = useLanguage()
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
            <div className="flex flex-wrap items-center gap-2 justify-center">
                {block.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {item.arrow ? (
                            <span className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>→</span>
                        ) : (
                            <div className={`px-4 py-3 rounded-xl border-2 text-center min-w-[90px] max-w-[160px] ${item.highlight
                                ? (darkMode ? 'bg-indigo-900 border-indigo-500' : 'bg-indigo-100 border-indigo-400')
                                : (darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300')
                                }`}>
                                {item.icon && <div className="text-xl mb-1">{item.icon}</div>}
                                <div className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(item.label, language)}</div>
                                {item.desc && <div className={`text-xs mt-1 leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(item.desc, language)}</div>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
        </div>
    )
}

function PyramidDiagram({ block, darkMode }) {
    const { language } = useLanguage()
    const colorMap = {
        green: darkMode ? 'bg-green-900/60 border-green-600 text-green-300' : 'bg-green-100 border-green-400 text-green-800',
        yellow: darkMode ? 'bg-yellow-900/60 border-yellow-600 text-yellow-300' : 'bg-yellow-100 border-yellow-400 text-yellow-800',
        red: darkMode ? 'bg-red-900/60 border-red-600 text-red-300' : 'bg-red-100 border-red-400 text-red-800',
        blue: darkMode ? 'bg-blue-900/60 border-blue-600 text-blue-300' : 'bg-blue-100 border-blue-400 text-blue-800',
        indigo: darkMode ? 'bg-indigo-900/60 border-indigo-600 text-indigo-300' : 'bg-indigo-100 border-indigo-400 text-indigo-800',
        orange: darkMode ? 'bg-orange-900/60 border-orange-600 text-orange-300' : 'bg-orange-100 border-orange-400 text-orange-800',
    }
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    return (
        <div className={`mt-5 p-5 rounded-xl border ${bg}`}>
            {block.title && <div className={`text-sm font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
            <div className="flex flex-col items-center gap-2">
                {block.levels?.map((level, i) => {
                    const pct = 28 + (block.levels.length - 1 - i) * 18
                    return (
                        <div key={i} className={`px-4 py-2.5 rounded-xl border-2 text-center text-sm transition-all ${colorMap[level.color] || colorMap.blue}`}
                            style={{ width: `${Math.min(100, pct)}%` }}>
                            <div className="font-bold">{tx(level.label, language)}</div>
                            {level.desc && <div className="text-xs opacity-80 mt-0.5">{tx(level.desc, language)}</div>}
                        </div>
                    )
                })}
            </div>
            {block.note && <p className={`mt-3 text-xs text-center italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
        </div>
    )
}

function DataStructureDiagram({ block, darkMode, language }) {
    const bg = darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'

    if (block.dataType === 'list') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
                <div className="flex items-stretch overflow-x-auto">
                    {block.items?.map((item, i) => (
                        <div key={i} className="flex items-stretch">
                            <div className={`flex flex-col items-center border-2 ${item.highlighted ? (darkMode ? 'border-yellow-400 bg-yellow-900/30' : 'border-yellow-400 bg-yellow-50') : (darkMode ? 'border-gray-500 bg-gray-700' : 'border-gray-300 bg-white')}`}>
                                <div className={`px-4 py-2.5 text-sm font-mono font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{tx(item.value, language)}</div>
                                <div className={`px-2 py-0.5 text-xs border-t w-full text-center ${darkMode ? 'border-gray-600 text-indigo-400 bg-gray-800' : 'border-gray-300 text-indigo-600 bg-gray-50'}`}>[{i}]</div>
                            </div>
                        </div>
                    ))}
                </div>
                {block.note && <p className={`mt-2 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
            </div>
        )
    }

    if (block.dataType === 'dict') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
                <div className="inline-flex flex-col gap-0 rounded-lg overflow-hidden border border-gray-600">
                    {block.items?.map((item, i) => (
                        <div key={i} className={`flex border-b last:border-b-0 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <div className={`px-4 py-2 font-mono text-xs font-bold border-r min-w-[120px] ${darkMode ? 'bg-indigo-900/40 border-gray-600 text-indigo-300' : 'bg-indigo-50 border-gray-200 text-indigo-700'}`}>
                                "{tx(item.key, language)}"
                            </div>
                            <div className={`px-4 py-2 font-mono text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}>
                                {typeof item.value === 'string' ? `"${item.value}"` : tx(item.value, language)}
                            </div>
                        </div>
                    ))}
                </div>
                {block.note && <p className={`mt-2 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
            </div>
        )
    }

    if (block.dataType === 'set') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(block.title, language)}</div>}
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-2xl font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{'{'}</span>
                    {block.items?.map((item, i) => (
                        <div key={i} className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border-2 ${darkMode ? 'border-orange-500 bg-orange-900/30 text-orange-300' : 'border-orange-400 bg-orange-50 text-orange-700'}`}>
                            {tx(item.value, language)}
                        </div>
                    ))}
                    <span className={`text-2xl font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{'}'}</span>
                </div>
                <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'tr' ? '⚡ Sıra yoktur · Her eleman benzersizdir · Hızlı üyelik kontrolü' : '⚡ Unordered · Each element is unique · Fast membership checks'}</p>
                {block.note && <p className={`mt-1 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(block.note, language)}</p>}
            </div>
        )
    }

    if (block.dataType === 'tuple') {
        return (
            <div className={`mt-5 p-4 rounded-xl border ${bg}`}>
                {block.title && <div className={`text-sm font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{block.title}</div>}
                <div className="flex items-center gap-1 flex-wrap">
                    <span className={`text-xl font-mono font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(</span>
                    {block.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <div className={`px-3 py-2 text-xs font-mono border-2 rounded ${darkMode ? 'border-purple-500 bg-purple-900/30 text-purple-300' : 'border-purple-400 bg-purple-50 text-purple-700'}`}>
                                {String(item.value)}
                            </div>
                            {i < block.items.length - 1 && <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>,</span>}
                        </div>
                    ))}
                    <span className={`text-xl font-mono font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>)</span>
                </div>
                <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'tr' ? '🔒 Değiştirilemez (immutable) · Sıralı · Hızlı okuma' : '🔒 Immutable · Ordered · Fast reads'}</p>
                {block.note && <p className={`mt-1 text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.note}</p>}
            </div>
        )
    }

    return null
}

function VisualBlock({ block, darkMode, language }) {
    switch (block.variant) {
        case 'join': return <JoinDiagram block={block} darkMode={darkMode} language={language} />
        case 'table': return <TableDiagram block={block} darkMode={darkMode} />
        case 'flow': return <FlowDiagram block={block} darkMode={darkMode} />
        case 'boxes': return <BoxesDiagram block={block} darkMode={darkMode} />
        case 'pyramid': return <PyramidDiagram block={block} darkMode={darkMode} />
        case 'data-structure': return <DataStructureDiagram block={block} darkMode={darkMode} language={language} />
        default: return null
    }
}

function CalloutBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const colorMap = {
        blue: { border: 'border-blue-400', bg: darkMode ? 'bg-blue-900/20' : 'bg-blue-50', text: darkMode ? 'text-blue-300' : 'text-blue-800', titleText: darkMode ? 'text-blue-200' : 'text-blue-900' },
        green: { border: 'border-green-400', bg: darkMode ? 'bg-green-900/20' : 'bg-green-50', text: darkMode ? 'text-green-300' : 'text-green-800', titleText: darkMode ? 'text-green-200' : 'text-green-900' },
        yellow: { border: 'border-yellow-400', bg: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50', text: darkMode ? 'text-yellow-300' : 'text-yellow-800', titleText: darkMode ? 'text-yellow-200' : 'text-yellow-900' },
        purple: { border: 'border-purple-400', bg: darkMode ? 'bg-purple-900/20' : 'bg-purple-50', text: darkMode ? 'text-purple-300' : 'text-purple-800', titleText: darkMode ? 'text-purple-200' : 'text-purple-900' },
        red: { border: 'border-red-400', bg: darkMode ? 'bg-red-900/20' : 'bg-red-50', text: darkMode ? 'text-red-300' : 'text-red-800', titleText: darkMode ? 'text-red-200' : 'text-red-900' },
        orange: { border: 'border-orange-400', bg: darkMode ? 'bg-orange-900/20' : 'bg-orange-50', text: darkMode ? 'text-orange-300' : 'text-orange-800', titleText: darkMode ? 'text-orange-200' : 'text-orange-900' },
    }
    const c = colorMap[block.color] || colorMap.blue
    return (
        <div className={`mt-4 p-4 rounded-xl border-2 ${c.border} ${c.bg}`}>
            {block.title && <div className={`font-bold text-sm mb-2 ${c.titleText}`}>{block.emoji || ''} {tx(block.title, language)}</div>}
            <p className={`text-sm leading-relaxed ${c.text}`}>{tx(block.content, language)}</p>
        </div>
    )
}

// ─── JavaCompareBlock ─────────────────────────────────────────────────────────

function JavaCompareBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const isTS = !!block.typescript
    const isSQL = !!block.sql
    const newCode = block.typescript || block.python || block.sql
    const langIcon = isTS ? '🔷' : isSQL ? '🗄️' : '🐍'
    const langLabel = isTr
        ? (isTS ? "TypeScript'te" : isSQL ? "Python'da (DB)" : "Python'da")
        : (isTS ? 'in TypeScript' : isSQL ? 'in Python (DB)' : 'in Python')
    const whyText = typeof block.why === 'object' ? tx(block.why, language) : (isTr ? block.why : (block.why_en ?? block.why))
    const noteText = typeof block.note === 'object' ? tx(block.note, language) : (isTr ? block.note : (block.note_en ?? block.note))
    const whyLabel = isTr ? '🤔 Neden?' : '🤔 Why?'
    return (
        <div className={`mt-6 rounded-xl border-2 overflow-hidden ${darkMode ? 'border-orange-700/60' : 'border-orange-300'}`}>
            <div className={`px-4 py-3 flex items-center gap-2 ${darkMode ? 'bg-orange-900/25' : 'bg-amber-50'}`}>
                <span className="text-xl">☕</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>{isTr ? 'Java Biliyorsan:' : 'If You Know Java:'}</span>
                <span className={`text-sm font-mono font-semibold ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>{block.topic}</span>
            </div>
            {whyText && (
                <div className={`px-4 py-3 text-sm border-b ${darkMode ? 'bg-gray-800/80 border-orange-900/30 text-gray-300' : 'bg-white border-orange-100 text-gray-700'}`}>
                    <span className={`font-semibold mr-1 ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>{whyLabel}</span>
                    {whyText}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className={`border-r ${darkMode ? 'border-gray-700' : 'border-orange-200'}`}>
                    <div className={`px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-yellow-900/25 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>☕ {isTr ? "Java'da" : 'in Java'}</div>
                    <div className="bg-slate-800 p-3 min-h-[80px]">
                        <pre className="font-mono text-xs text-amber-200 overflow-x-auto leading-relaxed">{(block.java || '').trim()}</pre>
                    </div>
                </div>
                <div>
                    <div className={`px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-blue-900/25 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{langIcon} {langLabel}</div>
                    <div className="bg-slate-800 p-3 min-h-[80px]">
                        <pre className={`font-mono text-xs overflow-x-auto leading-relaxed ${isTS ? 'text-sky-200' : 'text-emerald-200'}`}>{(newCode || '').trim()}</pre>
                    </div>
                </div>
            </div>
            {noteText && (
                <div className={`px-4 py-2.5 text-xs border-t ${darkMode ? 'bg-gray-800/80 border-orange-900/30 text-gray-400' : 'bg-amber-50 border-orange-100 text-orange-700'}`}>
                    💡 {noteText}
                </div>
            )}
        </div>
    )
}

// ─── PyodideEditor ────────────────────────────────────────────────────────────

function PyodideEditor({ defaultCode, height = '180px' }) {
    const { language } = useLanguage()
    const localizedDefaultCode = getLocalizedCode(defaultCode, language)
    const [code, setCode] = useState(localizedDefaultCode)
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pyReady, setPyReady] = useState(!!window._pyodideInstance)
    const pyRef = useRef(null)

    useEffect(() => {
        if (window._pyodideInstance) { pyRef.current = window._pyodideInstance; setPyReady(true); return }
        if (window._pyodideLoading) { const iv = setInterval(() => { if (window._pyodideInstance) { pyRef.current = window._pyodideInstance; setPyReady(true); clearInterval(iv) } }, 300); return }
        window._pyodideLoading = true
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js'
        s.onload = () => window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' }).then(py => { window._pyodideInstance = py; pyRef.current = py; setPyReady(true) })
        document.head.appendChild(s)
    }, [])

    useEffect(() => {
        setCode(localizedDefaultCode)
    }, [localizedDefaultCode])

    const run = async () => {
        if (!pyRef.current) return
        setLoading(true); setOutput('')
        try {
            pyRef.current.runPython('import sys, io\nsys.stdout = io.StringIO()')
            pyRef.current.runPython(code)
            setOutput(pyRef.current.runPython('sys.stdout.getvalue()') || '(no output)')
        } catch (e) { setOutput('❌ ' + e.message) }
        setLoading(false)
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-purple-800/40">
            <div style={{ background: '#12121f' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>{pyReady ? '🐍 Python — Try it yourself' : '⏳ Loading Python...'}</span>
                <button onClick={run} disabled={!pyReady || loading} style={{ background: pyReady ? '#7c3aed' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: pyReady ? 'pointer' : 'not-allowed' }}>
                    {loading ? '⏳' : '▶ Run'}
                </button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} style={{ display: 'block', width: '100%', minHeight: height, background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} spellCheck={false} />
            {output && <pre style={{ margin: 0, padding: '10px 16px', background: '#0d0d1a', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e1e3a', whiteSpace: 'pre-wrap' }}>{output}</pre>}
        </div>
    )
}

// ─── TSEditor ─────────────────────────────────────────────────────────────────

function TSEditor({ defaultCode, height = '180px' }) {
    const { language } = useLanguage()
    const localizedDefaultCode = getLocalizedCode(defaultCode, language)
    const [code, setCode] = useState(localizedDefaultCode)
    const [output, setOutput] = useState('')
    const [babelReady, setBabelReady] = useState(!!window.Babel)

    useEffect(() => {
        if (window.Babel) { setBabelReady(true); return }
        const s = document.createElement('script')
        s.src = 'https://unpkg.com/@babel/standalone/babel.min.js'
        s.onload = () => setBabelReady(true)
        document.head.appendChild(s)
    }, [])

    useEffect(() => {
        setCode(localizedDefaultCode)
    }, [localizedDefaultCode])

    const run = () => {
        setOutput('')
        try {
            const js = window.Babel.transform(code, { filename: 'x.ts', presets: ['typescript'] }).code
            const logs = []
            const fn = new Function('console', js)
            fn({ log: (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')), error: (...a) => logs.push('❌ ' + a.join(' ')) })
            setOutput(logs.join('\n') || '(no output)')
        } catch (e) { setOutput('❌ ' + e.message) }
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-blue-800/40">
            <div style={{ background: '#12121f' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>{babelReady ? '🔷 TypeScript — Try it yourself' : '⏳ Loading TypeScript...'}</span>
                <button onClick={run} disabled={!babelReady} style={{ background: babelReady ? '#2563eb' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: babelReady ? 'pointer' : 'not-allowed' }}>▶ Run</button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} style={{ display: 'block', width: '100%', minHeight: height, background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} spellCheck={false} />
            {output && <pre style={{ margin: 0, padding: '10px 16px', background: '#0d0d1a', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e1e3a', whiteSpace: 'pre-wrap' }}>{output}</pre>}
        </div>
    )
}

// ─── SQLEditor ────────────────────────────────────────────────────────────────

function SQLEditor({ defaultCode, schema, height = '120px' }) {
    const { language } = useLanguage()
    const localizedDefaultCode = getLocalizedCode(defaultCode, language)
    const [code, setCode] = useState(localizedDefaultCode)
    const [output, setOutput] = useState('')
    const [ready, setReady] = useState(!!window._sqlJsInstance)

    useEffect(() => {
        if (window._sqlJsInstance) { setReady(true); return }
        if (window._sqlJsLoading) {
            const iv = setInterval(() => {
                if (window._sqlJsInstance) { setReady(true); clearInterval(iv) }
            }, 300)
            return () => clearInterval(iv)
        }
        window._sqlJsLoading = true
        const s = document.createElement('script')
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js'
        s.onload = () => {
            window.initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` })
                .then(SQL => { window._sqlJsInstance = SQL; setReady(true) })
                .catch(e => { window._sqlJsLoading = false; console.error('sql.js load failed', e) })
        }
        document.head.appendChild(s)
    }, [])

    useEffect(() => {
        setCode(localizedDefaultCode)
    }, [localizedDefaultCode])

    const run = () => {
        if (!window._sqlJsInstance) return
        try {
            const db = new window._sqlJsInstance.Database()
            if (schema) db.run(schema)
            const results = db.exec(code.trim())
            db.close()
            if (!results.length) {
                setOutput('✅ Query executed. No rows returned.')
                return
            }
            const { columns, values } = results[0]
            const colWidths = columns.map((c, i) => Math.max(c.length, ...values.map(r => String(r[i] ?? '').length)))
            const pad = (s, w) => String(s ?? '').padEnd(w)
            const sep = colWidths.map(w => '-'.repeat(w)).join('-+-')
            const header = columns.map((c, i) => pad(c, colWidths[i])).join(' | ')
            const rows = values.map(r => r.map((v, i) => pad(v, colWidths[i])).join(' | ')).join('\n')
            setOutput(`${header}\n${sep}\n${rows}\n\n(${values.length} row${values.length !== 1 ? 's' : ''})`)
        } catch (e) {
            setOutput('❌ ' + e.message)
        }
    }

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-cyan-800/40">
            <div style={{ background: '#0c1a2e' }} className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-mono" style={{ color: '#6c7086' }}>
                    {ready ? '🗄️ SQL — Try it yourself' : '⏳ Loading SQL engine...'}
                </span>
                <button onClick={run} disabled={!ready}
                    style={{ background: ready ? '#0369a1' : '#313148', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 16px', fontSize: '12px', fontWeight: 600, cursor: ready ? 'pointer' : 'not-allowed' }}>
                    ▶ Run
                </button>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
                style={{ display: 'block', width: '100%', minHeight: height, background: '#0c1a2e', color: '#7dd3fc', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', border: 'none', padding: '14px 16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            {output && (
                <pre style={{ margin: 0, padding: '10px 16px', background: '#060f1e', color: output.startsWith('❌') ? '#ef4444' : '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', borderTop: '1px solid #1e3a5f', whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                    {output}
                </pre>
            )}
        </div>
    )
}

// ─── JavaPracticeBlock ───────────────────────────────────────────────────────

function JavaPracticeBlock({ block, darkMode, language }) {
    const starter = tx(block.starterCode || block.defaultCode || '', language)
    const [code, setCode] = useState(starter)
    const [result, setResult] = useState(null)

    useEffect(() => {
        setCode(starter)
        setResult(null)
    }, [starter])

    const runCheck = () => {
        const lines = code.split(/\r?\n/)
        const errors = []
        const warnings = []
        const outputParts = []
        const checks = [
            {
                id: 'class',
                label: language === 'tr' ? 'class adı Main mi?' : 'Is the class named Main?',
                ok: /public\s+class\s+Main\b/.test(code),
            },
            {
                id: 'main',
                label: language === 'tr' ? 'main method doğru yazıldı mı?' : 'Is the main method written correctly?',
                ok: /public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s+args\s*\)/.test(code),
            },
        ]

        const openCount = (code.match(/\{/g) || []).length
        const closeCount = (code.match(/\}/g) || []).length
        checks.push({
            id: 'braces',
            label: language === 'tr' ? 'Süslü parantezler dengeli mi?' : 'Are curly braces balanced?',
            ok: openCount === closeCount && openCount >= 2,
        })

        lines.forEach((raw, idx) => {
            const line = raw.trim()
            if (!line || line.startsWith('//')) return
            const noSemicolonNeeded =
                line.endsWith('{') ||
                line.endsWith('}') ||
                /^public\s+class\b/.test(line) ||
                /^public\s+static\s+void\s+main\b/.test(line)
            if (!noSemicolonNeeded && !line.endsWith(';')) {
                errors.push(language === 'tr'
                    ? `Satır ${idx + 1}: Bu satır büyük ihtimalle ; ile bitmeli.`
                    : `Line ${idx + 1}: This line probably needs a semicolon.`)
            }

            const printMatch = line.match(/^System\.out\.(println|print)\s*\(\s*"([^"]*)"\s*\)\s*;$/)
            if (printMatch) {
                outputParts.push({ type: printMatch[1], value: printMatch[2] })
            } else if (line.endsWith(';') && line.includes('System.out.print')) {
                warnings.push(language === 'tr'
                    ? `Satır ${idx + 1}: Şimdilik sadece System.out.println("metin"); formatını çalıştırıyorum.`
                    : `Line ${idx + 1}: For now I only run System.out.println("text"); style statements.`)
            }
        })

        checks.forEach(check => {
            if (!check.ok) errors.push(check.label)
        })

        let output = ''
        outputParts.forEach(part => {
            output += part.value
            if (part.type === 'println') output += '\n'
        })
        if (!outputParts.length) {
            warnings.push(language === 'tr'
                ? 'Henüz ekrana yazdırılacak System.out.println("..."); satırı bulamadım.'
                : 'I did not find a System.out.println("..."); line to preview yet.')
        }

        setResult({ checks, errors, warnings, output: output.trimEnd() })
    }

    const isOk = result && result.errors.length === 0
    const title = tx(block.title, language) || (language === 'tr' ? 'Kendin Dene' : 'Try It Yourself')
    const intro = tx(block.intro, language)

    return (
        <div className={`mt-5 rounded-xl border overflow-hidden ${darkMode ? 'border-orange-700 bg-gray-900' : 'border-orange-200 bg-white'}`}>
            <div className={`px-4 py-3 flex items-center gap-3 ${darkMode ? 'bg-orange-950/60' : 'bg-orange-50'}`}>
                <span className="text-xl">{block.icon || '☕'}</span>
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>{title}</div>
                    {intro && <div className={`text-xs mt-0.5 ${darkMode ? 'text-orange-300/80' : 'text-orange-700'}`}>{intro}</div>}
                </div>
                <button
                    onClick={runCheck}
                    className="ml-auto rounded-md px-3 py-1.5 text-xs font-bold"
                    style={{ background: '#f97316', color: '#fff', minHeight: 36 }}
                >
                    {language === 'tr' ? '▶ Kontrol Et' : '▶ Check'}
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    spellCheck={false}
                    style={{ minHeight: block.height || 260, background: '#111827', color: '#fed7aa', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.65, border: 'none', outline: 'none', resize: 'vertical', padding: '16px', boxSizing: 'border-box' }}
                />
                <div className={`p-4 border-t lg:border-t-0 lg:border-l ${darkMode ? 'border-gray-700 bg-gray-950' : 'border-orange-100 bg-orange-50/50'}`}>
                    {!result && (
                        <div className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'tr'
                                ? 'Main methodu kendin yaz, her komut satırının sonuna ; koy, sonra kontrol et. Burada amaç otomatik cevap almak değil, Java iskeletini kas hafızasına almak.'
                                : 'Write the main method yourself, end each statement with ;, then check it. The goal is muscle memory for the Java skeleton, not auto-completion.'}
                        </div>
                    )}
                    {result && (
                        <div className="space-y-3">
                            <div className={`rounded-lg border p-3 text-sm font-bold ${isOk ? (darkMode ? 'border-green-700 bg-green-950/30 text-green-200' : 'border-green-300 bg-green-50 text-green-800') : (darkMode ? 'border-red-700 bg-red-950/30 text-red-200' : 'border-red-300 bg-red-50 text-red-800')}`}>
                                {isOk ? (language === 'tr' ? '✅ Çalıştırmaya hazır görünüyor' : '✅ Looks ready to run') : (language === 'tr' ? '❌ Önce şu hataları düzelt' : '❌ Fix these first')}
                            </div>
                            <div className="space-y-1">
                                {result.checks.map(check => (
                                    <div key={check.id} className={`text-xs ${check.ok ? (darkMode ? 'text-green-300' : 'text-green-700') : (darkMode ? 'text-red-300' : 'text-red-700')}`}>
                                        {check.ok ? '✓' : '×'} {check.label}
                                    </div>
                                ))}
                            </div>
                            {result.errors.map((err, i) => (
                                <div key={i} className={`text-xs rounded-md px-3 py-2 ${darkMode ? 'bg-red-950/40 text-red-200' : 'bg-red-50 text-red-700'}`}>{err}</div>
                            ))}
                            {result.warnings.map((warn, i) => (
                                <div key={i} className={`text-xs rounded-md px-3 py-2 ${darkMode ? 'bg-yellow-950/40 text-yellow-200' : 'bg-yellow-50 text-yellow-800'}`}>{warn}</div>
                            ))}
                            <div>
                                <div className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Console</div>
                                <pre className={`rounded-lg p-3 text-xs min-h-[70px] whitespace-pre-wrap ${darkMode ? 'bg-black text-green-300' : 'bg-slate-900 text-green-300'}`}>{result.output || (language === 'tr' ? '(çıktı yok)' : '(no output)')}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Bilingual content helper ─────────────────────────────────────────────────

const tx = (val, lang) => {
    if (!val) return ''
    if (typeof val === 'string') return val
    return val[lang] || val.en || val.tr || ''
}

const isCypressInterviewItem = (question, answer, topic = '') => {
    const haystack = `${topic} ${question || ''} ${answer || ''}`.toLowerCase()
    return haystack.includes('cypress')
}

const includesAny = (text, terms = []) => terms.some(term => text.includes(term))

const guide = (analogyTr, analogyEn, keyPointsTr, keyPointsEn, tipTr, tipEn) => ({
    analogy: { tr: analogyTr, en: analogyEn },
    keyPoints: keyPointsTr.map((item, index) => ({ tr: item, en: keyPointsEn[index] || keyPointsEn[0] || item })),
    tip: { tr: tipTr, en: tipEn },
})

const levelGuide = (
    analogyTr,
    analogyEn,
    understandTr,
    understandEn,
    juniorTr,
    juniorEn,
    middleTr,
    middleEn,
    seniorTr,
    seniorEn,
    tipTr,
    tipEn,
) => guide(
    analogyTr,
    analogyEn,
    [
        `Sorunun özü: ${understandTr}`,
        `Junior cevap: ${juniorTr}`,
        `Middle cevap: ${middleTr}`,
        `Senior cevap: ${seniorTr}`,
    ],
    [
        `Core of the question: ${understandEn}`,
        `Junior answer: ${juniorEn}`,
        `Mid-level answer: ${middleEn}`,
        `Senior answer: ${seniorEn}`,
    ],
    tipTr,
    tipEn,
)

const buildTechnologyGuide = (question, answer, topic) => {
    const haystack = `${topic} ${question} ${answer}`.toLowerCase()

    if (includesAny(haystack, ['postman'])) {
        if (includesAny(haystack, ['postman nedir', 'what is postman and why'])) {
            return levelGuide(
                'Bu soru Java tarafinda neden once Postman ya da curl ile endpointi deneriz sorusuna benzer. Kod yazmadan davranisi gormek, sonra otomasyona tasimak daha saglikli bir akistir.',
                'This is like asking why Java teams often hit an endpoint with Postman or curl before writing automation. Seeing behavior first and automating second is usually a healthier flow.',
                'Arac tanimindan cok, QA icin neden degerli oldugunu aciklaman bekleniyor.',
                'They expect you to explain why it matters for QA, not just define the tool.',
                'Postman ile request gonderip responseu hizli kontrol ettigimi soylerim.',
                'I would say I use Postman to send requests and quickly inspect responses.',
                'Environment, collection ve tekrar kullanilabilir test akislarini da isin icine katarim.',
                'I would bring in environments, collections, and reusable test flows.',
                'Postmani ekip ici paylasilan, smoke kontrole uygun ve CIya tasinabilir bir API test varligi olarak konumlarim.',
                'I would position Postman as a shared API testing asset that is good for smoke checks and can move into CI.',
                'Gercek hayat ornegi: UI hazir degilken login APIsini Postman ile once dener, token akisini netlestirir, sonra bu akisi otomasyona tasirsin.',
                'Real-life example: when the UI is not ready, you validate the login API in Postman first, understand the token flow, then move that flow into automation.'
            )
        }
        if (includesAny(haystack, ['get, post, put, patch', 'difference between get, post, put, patch, and delete'])) {
            return levelGuide(
                'Bu soru Java tarafinda bir objeyi okumak, bastan yazmak ya da sadece belli fieldlarini guncellemek arasindaki farki dogru secmeye benzer.',
                'This is like choosing in Java whether you are reading an object, replacing it fully, or updating only selected fields.',
                'Burada senden sadece ezber degil, her methodun sistem davranisini nasil etkiledigini bilmen bekleniyor.',
                'They want more than memorization here; they want to know whether you understand how each method changes system behavior.',
                'GET okur, POST olusturur, PUT tam gunceller, PATCH kismi gunceller, DELETE siler derim.',
                'I would say GET reads, POST creates, PUT fully updates, PATCH partially updates, and DELETE removes.',
                'Buna idempotency eklerim; ayni cagrinin ikinci kez atilmasi sonucu degistiriyor mu diye dusunurum.',
                'I would add idempotency and think about whether sending the same call again changes the result.',
                'Gercek riskten bahsederim: yanlis PUT kullanimi eksik fieldlari silebilir, yanlis POST tekrari duplicate kayit uretebilir.',
                'I would talk about real risk: a bad PUT can wipe missing fields, and a repeated POST can create duplicate records.',
                'Gercek hayat ornegi: profil guncellemede sadece telefon degisiyorsa PATCH daha guvenli olabilir; tum kaydi yeniden yolluyorsan PUT daha anlamlidir.',
                'Real-life example: if only the phone number changes in a profile update, PATCH may be safer; if you send the whole record again, PUT is more meaningful.'
            )
        }
        if (includesAny(haystack, ['koleksiyon nedir', 'what is a collection'])) {
            return levelGuide(
                'Bu soru Java tarafinda tek tek test methodlari yazmak yerine ilgili testleri ayni test sinifinda toplama fikrine benzer.',
                'This is like grouping related test methods into one test class in Java instead of scattering them everywhere.',
                'Sorunun odagi, Collectionin sadece klasor olmadigini; tekrar kullanilabilir test paketi oldugunu gormektir.',
                'The core is understanding that a Collection is not just a folder, but a reusable test package.',
                'Ilgili requestleri tek yerde toplarim ve tekrar tekrar elle kurmam gerekmez derim.',
                'I would say it keeps related requests together so I do not rebuild them manually every time.',
                'Buna ortak auth, ortak degisken ve sirali calistirma kolayligini eklerim.',
                'I would add shared auth, shared variables, and easy ordered execution.',
                'Bunun ekip standardi, versiyonlama ve regression giris noktasi oldugunu soylerim.',
                'I would say it becomes a team standard, a versioned asset, and an entry point for regression.',
                'Gercek hayat ornegi: User API, Auth API ve Order API icin ayri folderlar tutup release oncesi sadece ilgili koleksiyonu kosturursun.',
                'Real-life example: keep separate folders for User, Auth, and Order APIs, then run only the relevant collection before a release.'
            )
        }
        if (includesAny(haystack, ['durum kod', 'status code'])) {
            return levelGuide(
                'Bu soru yalnizca hangi kodun ne anlama geldigi degil, dogru davranisi dogru kodla eslestirip eslestiremedigini olcer.',
                'This question is not only about what each status code means, but whether you can match expected behavior to the correct code.',
                '200, 201, 204, 400, 401, 403, 404 gibi temel kodlari soylerim.',
                'I would mention core codes like 200, 201, 204, 400, 401, 403, and 404.',
                'Buna neden eklerim: create endpointi 201 donmeli, silme basarisi 204 olabilir, auth sorunu 401 veya 403 olabilir.',
                'I would add the why: a create endpoint should return 201, a successful delete may return 204, and auth problems may be 401 or 403.',
                'Status codeu tek basina yeterli gormem; body, hata mesaji ve contract beklentisiyle birlikte degerlendiririm.',
                'I would not treat the status code alone as enough; I would evaluate it together with body, error message, and contract expectation.',
                'Gercek hayat ornegi: create user istegi 200 donuyor ama bodyde olusan kayit yoksa ben bunu yine bug olarak acarim.',
                'Real-life example: if create user returns 200 but the body shows no created record, I would still raise it as a bug.'
            )
        }
        if (includesAny(haystack, ['json body', 'json body nasil', 'content-type'])) {
            return levelGuide(
                'Bu soru sadece hangi tabi tiklayacagini degil, serverin bekledigi payload turunu anlayip anlamadigini sorar.',
                'This is not only about which tab you click; it asks whether you understand the payload type the server expects.',
                'Body raw JSON secilir ve gecerli JSON gonderilir derim.',
                'I would say choose raw JSON in the Body and send valid JSON.',
                'Buna header bilgisini eklerim: server JSON bekliyorsa Content-Type dogru olmali.',
                'I would add header awareness: if the server expects JSON, the Content-Type must be correct.',
                'Yanlis payload seciminin 400 ya da 415 uretecegini, bazen problemin body degil format beklentisi oldugunu da soylerim.',
                'I would mention that the wrong payload format can cause 400 or 415, and sometimes the problem is not the data but the format expectation.',
                'Gercek hayat ornegi: backend XML bekliyorsa body dogru görünse bile JSON gonderdigin icin test bosuna fail olur.',
                'Real-life example: if the backend expects XML, your test can fail even when the body content looks correct because you sent JSON.'
            )
        }
        if (includesAny(haystack, ['request chaining', 'veri aktar', 'dynamic at runtime', 'pre-request script', 'test script', 'expiring auth token', 'environment, collection, and global variables'])) {
            return levelGuide(
                'Bu grup sorularin ortak noktasi su: tek bir requesti degil, akisin durumunu nasil yonettigini anlamak ister.',
                'The common point of these questions is this: they want to know how you manage state across a flow, not just a single request.',
                'Bir response tan deger alip diger requestte kullandigimi net anlatirim.',
                'I clearly explain that I take a value from one response and use it in another request.',
                'Hangi degiskenin hangi scope ta tutuldugunu ve pre-request ile tests sorumluluk ayrimini soylerim.',
                'I explain which scope stores which variable, and I separate pre-request responsibility from tests responsibility.',
                'Token refresh, veri temizligi ve paralel kosuda veri carpisma riskini de yonetirim.',
                'I also manage token refresh, cleanup, and data collision risk in parallel runs.',
                'Gercek hayat ornegi: login istegi token uretir, token collection ya da environment variable a yazilir, sonraki order istegi bu tokenla gider; token suresi biterse pre-request yeniler.',
                'Real-life example: the login request creates a token, it is stored in a collection or environment variable, the next order call uses it, and pre-request refreshes it if expired.'
            )
        }
        if (includesAny(haystack, ['newman', 'html report', 'ci/cd', 'multiple environments simultaneously', 'suite run faster', 'kubernetes or docker environment', 'monitoring'])) {
            return levelGuide(
                'Bu sorular Postmandan tek kullanicilik GUI araci gibi degil, ekibin calistirabildigi otomasyon varligi gibi dusunup dusunmedigini olcer.',
                'These questions measure whether you see Postman not as a solo GUI tool, but as an automation asset the whole team can run.',
                'Koleksiyonu komut satirindan kosturabildigimi ve fail olursa sonucu gordugumu soylerim.',
                'I say I can run the collection from the command line and see whether it fails.',
                'Environment dosyalari, rapor uretimi ve pipeline entegrasyonu eklerim.',
                'I add environment files, report generation, and pipeline integration.',
                'Paralel kosu, smoke vs regression ayrimi, container icinde temiz kosu ve alerting mantigini kurarim.',
                'I build parallel runs, smoke vs regression separation, clean containerized execution, and alerting logic.',
                'Gercek hayat ornegi: her PR da smoke koleksiyonu Newman ile kosar, gece full regression ayri jobda calisir, HTML rapor artifact olarak saklanir.',
                'Real-life example: run the smoke collection with Newman on every PR, run full regression in a separate nightly job, and archive the HTML report as an artifact.'
            )
        }
        if (includesAny(haystack, ['json field', 'pm.response', 'response headers', 'json schema', 'contract testing'])) {
            return levelGuide(
                'Bu sorularin odagi, sadece 200 geldi mi degil; response un dogru veri, dogru tip ve dogru sozlesmeyle donup donmedigidir.',
                'The focus here is not just whether the API returned 200, but whether the response came back with the right data, types, and contract.',
                'Belirli fieldi, headeri veya statusu kontrol ettigimi soylerim.',
                'I say I check a specific field, header, or status.',
                'Type, required field, security header ve response time gibi ikinci katman kontrolleri eklerim.',
                'I add second-layer checks like types, required fields, security headers, and response time.',
                'Contract koruma mantigini kurarim: field adi degisince ya da tip kayinca test hemen alarm vermeli derim.',
                'I frame it as contract protection: if a field name changes or a type drifts, the test should alert immediately.',
                'Gercek hayat ornegi: frontend email alanini bekliyorsa backend bunu sessizce kaldirdiginda schema testi manuel QA baslamadan issue yakalar.',
                'Real-life example: if the frontend expects an email field and the backend silently removes it, schema checks catch the issue before manual QA even starts.'
            )
        }
        if (includesAny(haystack, ['bearer token', 'basic auth', 'api key', 'authorization tab', 'security testing'])) {
            return levelGuide(
                'Bu sorular gercekten authu anlayip anlamadigini olcer; sadece tokeni nereye yapistirdigini degil, hangi riskleri test ettigini de gormek ister.',
                'These questions test whether you actually understand authentication, not just where to paste a token but which risks you validate.',
                'Tokeni dogru yerde kullanir, auth yoksa 401 bekledigimi soylerim.',
                'I use the token correctly and say I expect 401 when auth is missing.',
                'Bearer, Basic ve API Key farkini; 401 ile 403 ayrimini ve collection seviyesinde auth kalitimini anlatirim.',
                'I explain Bearer vs Basic vs API Key, the difference between 401 and 403, and inherited auth at collection level.',
                'Expired token, wrong user token, IDOR, rate limit ve mass assignment gibi gercek guvenlik senaryolarini da dahil ederim.',
                'I include real security scenarios such as expired tokens, wrong-user tokens, IDOR, rate limiting, and mass assignment.',
                'Gercek hayat ornegi: kullanici kendi siparisini gorebiliyor ama baska userId ile ayni endpoint calisiyorsa bu sadece auth degil authorization bugidir.',
                'Real-life example: if a user can view their own order but also access another userId on the same endpoint, that is not just auth but an authorization bug.'
            )
        }
        if (includesAny(haystack, ['data-driven', 'test verisini nasil hazirlarsin', 'retry mekanizmasi'])) {
            return levelGuide(
                'Bu sorular bir testi tek seferlik deneme olmaktan cikarip, tekrar kosulabilir ve kontrollu hale nasil getirdigini sorar.',
                'These questions ask how you make tests repeatable and controlled instead of one-off experiments.',
                'Farkli datalarla ayni requesti tekrar calistirabildigimi soylerim.',
                'I say I can rerun the same request with different datasets.',
                'CSV/JSON veri dosyasi, setup-teardown ve unique test data ihtiyacini eklerim.',
                'I add CSV or JSON data files, setup-teardown, and the need for unique test data.',
                'Retryyi dikkatli kullanirim; flaky sistemi gizlemek icin degil, gercekten eventual consistency varsa kontrollu bekleme icin derim.',
                'I use retries carefully, not to hide a flaky system but to manage real eventual consistency in a controlled way.',
                'Gercek hayat ornegi: register endpointini 50 farkli email ile denersin; ayni emaili tekrar yollarsan test senaryosu degil kirli test verisi sorunu uretirsin.',
                'Real-life example: you validate a register endpoint with 50 different emails; if you keep reusing the same email, you create dirty test data rather than a meaningful scenario.'
            )
        }
        if (includesAny(haystack, ['coverage', 'test coverage', 'snake_case', 'openapi', 'swagger', 'versioning', 'change management'])) {
            return levelGuide(
                'Bu sorularin ortak temi, APIyi sadece calisiyor mu diye degil, sozlesme ve degisim etkisi acisindan okuyup okumadigindir.',
                'The shared theme of these questions is whether you evaluate the API not only as working or not, but through contract and change impact.',
                'Happy path ve temel negatif senaryolari dusundugumu soylerim.',
                'I say I cover the happy path and basic negative scenarios.',
                'Boundary, auth matrix, spec import, field degisimi etkisi ve regression ihtiyacini eklerim.',
                'I add boundary cases, auth matrix, spec import, field-change impact, and the need for regression.',
                'Versionlama, backward compatibility ve degisikligin frontend ya da baska servislerde olusturacagi zincir etkisini yonetirim.',
                'I manage versioning, backward compatibility, and the chain impact that a change creates for the frontend or other services.',
                'Gercek hayat ornegi: /users response unda firstName alanini first_name yapmak sadece assertion degisikligi degil; mobil app, web ve raporlama servislerini de etkileyen bir contract degisimidir.',
                'Real-life example: changing firstName to first_name in /users is not just an assertion update; it is a contract change affecting web, mobile, and reporting consumers.'
            )
        }
        if (includesAny(haystack, ['microservices', 'large teams', 'save yaparken', 'graph', 'graphql'])) {
            return levelGuide(
                'Bu sorular aracin kendisinden cok, onu buyuyen bir urun ve ekip yapisinda duzenli kullanip kullanamadigini olcer.',
                'These questions measure less the tool itself and more whether you can use it in an organized way inside a growing product and team.',
                'Requesti dogru isimlendirir, dogru yere kaydeder ve temel akisi takip ederim.',
                'I name requests clearly, save them in the right place, and follow the basic flow.',
                'Servis bazli klasorleme, ortak scriptler ve farkli API stillerine gore dogru duzen kurarim.',
                'I organize by service, share scripts, and structure things properly for different API styles.',
                'Koleksiyon bakimi, onboarding, ownership, smoke ve integration ayrimi gibi ekip olgunlugu konularini yonetirim.',
                'I handle team maturity topics like collection maintenance, onboarding, ownership, and smoke vs integration separation.',
                'Gercek hayat ornegi: Auth, User ve Order servisleri ayri koleksiyonlarda durur; GraphQL servisinde ise 200 gelse bile errors alanini ayrica kontrol edersin.',
                'Real-life example: Auth, User, and Order services live in separate collections; for a GraphQL service, even a 200 response still requires checking the errors field.'
            )
        }
        return null
    }

    return null
}

const getInterviewEnhancements = ({ q, topic, language }) => {
    const topicText = tx(topic, language)
    const question = tx(q.q, language)
    const answer = tx(q.a, language)
    if (isCypressInterviewItem(question, answer, topicText)) {
        return {
            analogy: '',
            keyPoints: [],
            tip: '',
        }
    }
    if (q.analogy || q.keyPoints || q.tip) {
        return {
            analogy: tx(q.analogy, language),
            keyPoints: q.keyPoints || [],
            tip: tx(q.tip, language),
        }
    }
    const generatedGuide = buildTechnologyGuide(question, answer, topicText)
    return {
        analogy: tx(generatedGuide?.analogy, language),
        keyPoints: generatedGuide?.keyPoints || [],
        tip: tx(generatedGuide?.tip, language),
    }
}

// ─── ScrollProgressBar ────────────────────────────────────────────────────────

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const pct = (scrollTop / (scrollHeight - clientHeight)) * 100
            setProgress(Math.min(100, Math.max(0, pct)))
        }
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'transparent', zIndex: 9999 }}>
            <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #10b981)',
                transition: 'width 0.1s linear',
            }} />
        </div>
    )
}

// ─── HomeButton ───────────────────────────────────────────────────────────────

function HomeButton() {
    const { language } = useLanguage()
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title={language === 'tr' ? 'Başa dön' : 'Back to top'}
            style={{
                position: 'fixed', bottom: '16px', right: '16px',
                width: '44px', height: '44px', borderRadius: '50%',
                background: '#7c3aed', color: '#fff', border: 'none',
                cursor: 'pointer', fontSize: '22px', zIndex: 999,
                boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.5)' }}
        >
            🏠
        </button>
    )
}

// ─── QuizFillBlock ────────────────────────────────────────────────────────────

function QuizFillBlock({ block, darkMode }) {
    const { language } = useLanguage()
    const [userAnswer, setUserAnswer] = useState('')
    const [checked, setChecked] = useState(false)
    const isCorrect = userAnswer.trim().toLowerCase() === (block.answer || '').toLowerCase()
    return (
        <div className={`mt-6 p-5 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-teal-700' : 'bg-teal-50 border-teal-200'}`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">✏️</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>{language === 'tr' ? 'Boşluk Doldur' : 'Fill in the Blank'}</span>
            </div>
            <p className={`text-sm font-semibold mb-4 leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {tx(block.instruction, language)}
            </p>
            <div className="flex gap-3 items-center flex-wrap">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setChecked(false) }}
                    placeholder={tx(block.hint, language) || (language === 'tr' ? 'Cevabınızı yazın...' : 'Type your answer...')}
                    className={`px-3 py-2 rounded-lg border text-sm font-mono min-w-[160px] outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
                    onKeyDown={e => e.key === 'Enter' && setChecked(true)}
                />
                <button
                    onClick={() => setChecked(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-500 transition-colors"
                >
                    {language === 'tr' ? 'Kontrol Et' : 'Check'} →
                </button>
            </div>
            {checked && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${isCorrect
                    ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-50 text-green-700 border border-green-200')
                    : (darkMode ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-50 text-red-700 border border-red-200')
                    }`}>
                    {isCorrect
                        ? (language === 'tr' ? `✅ Doğru! Cevap: "${block.answer}"` : `✅ Correct! Answer: "${block.answer}"`)
                        : (language === 'tr' ? `❌ Yanlış. Doğru cevap: "${block.answer}"` : `❌ Incorrect. Correct answer: "${block.answer}"`)}
                </div>
            )}
        </div>
    )
}

// ─── InterviewQuestionsBlock ──────────────────────────────────────────────────

function InterviewQuestionsBlock({ block, darkMode, hideHeading = false }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const levelConfig = {
        basic: { label: isTr ? '🟢 Temel' : '🟢 Basic', color: darkMode ? 'text-green-400' : 'text-green-700' },
        intermediate: { label: isTr ? '🟡 Orta Seviye' : '🟡 Intermediate', color: darkMode ? 'text-yellow-400' : 'text-yellow-700' },
        advanced: { label: isTr ? '🔴 İleri Seviye' : '🔴 Advanced', color: darkMode ? 'text-red-400' : 'text-red-700' },
    }
    return (
        <div className="mt-6">
            {!hideHeading && (
                <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className="text-xl">💼</span>
                    <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {block.topic} — {isTr ? 'Mülakat Soruları' : 'Interview Questions'}
                    </h4>
                </div>
            )}
            {['basic', 'intermediate', 'advanced'].map(level => {
                const qs = block.questions?.filter(q => q.level === level)
                if (!qs?.length) return null
                const cfg = levelConfig[level]
                return (
                    <div key={level} className="mb-5">
                        <div className={`text-xs font-bold uppercase tracking-wide mb-3 ${cfg.color}`}>{cfg.label}</div>
                        {qs.map((q, j) => {
                            const enhancements = getInterviewEnhancements({ q, topic: block.topic, language })
                            return (
                                <QAItem
                                    key={j}
                                    question={tx(q.q, language)}
                                    answer={tx(q.a, language)}
                                    code={tx(q.code, language)}
                                    analogy={enhancements.analogy}
                                    keyPoints={enhancements.keyPoints}
                                    tip={enhancements.tip}
                                    darkMode={darkMode}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

// ─── ErrorDictionaryBlock ─────────────────────────────────────────────────────

function ErrorDictionaryBlock({ block, darkMode, hideHeading = false }) {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    return (
        <div className="mt-6">
            {!hideHeading && (
                <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className="text-xl">🚨</span>
                    <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {block.framework} — {isTr ? 'Hata Sözlüğü' : 'Error Dictionary'}
                    </h4>
                </div>
            )}
            <div className="space-y-4">
                {block.errors?.map((err, j) => (
                    <div key={j} className={`rounded-xl border overflow-hidden ${darkMode ? 'border-red-900/50' : 'border-red-200'}`}>
                        <div className={`px-4 py-2.5 font-mono text-sm font-bold ${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'}`}>
                            ❌ {err.error}
                        </div>
                        {err.fullMessage && (
                            <div className={`px-4 py-2 text-xs font-mono border-b ${darkMode ? 'bg-gray-900 text-gray-400 border-gray-800' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                {err.fullMessage}
                            </div>
                        )}
                        <div className={`px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div>
                                <div className={`text-xs font-bold mb-1 uppercase tracking-wide ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>⚡ {isTr ? 'Sebep' : 'Cause'}</div>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(err.cause, language)}</p>
                            </div>
                            <div>
                                <div className={`text-xs font-bold mb-1 uppercase tracking-wide ${darkMode ? 'text-green-400' : 'text-green-700'}`}>✅ {isTr ? 'Çözüm' : 'Solution'}</div>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(err.solution, language)}</p>
                            </div>
                        </div>
                        {(err.codeWrong || err.codeFixed) && (
                            <div className={`px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                {err.codeWrong && (
                                    <div>
                                        <div className="text-xs font-bold text-red-400 mb-1">❌ {isTr ? 'Yanlış:' : 'Wrong:'}</div>
                                        <CodeBlock code={err.codeWrong} darkMode={darkMode} />
                                    </div>
                                )}
                                {err.codeFixed && (
                                    <div>
                                        <div className="text-xs font-bold text-green-400 mb-1">✅ {isTr ? 'Doğru:' : 'Fixed:'}</div>
                                        <CodeBlock code={err.codeFixed} darkMode={darkMode} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── QAItem ───────────────────────────────────────────────────────────────────

function QAItem({ question, answer, code, analogy, keyPoints, tip, darkMode }) {
    const [open, setOpen] = useState(false)
    const { language } = useLanguage()
    const resolvedKeyPoints = keyPoints?.map(point => tx(point, language)).filter(Boolean) || []

    return (
        <div className={`rounded-xl border overflow-hidden mb-3 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex justify-between items-start text-left p-4 font-semibold text-sm transition-colors ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
            >
                <span className="flex-1 pr-4">{question}</span>
                <span className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open && (
                <div className={`p-4 border-t text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-100 text-gray-600'}`}>
                    <p className="leading-relaxed whitespace-pre-line">{answer}</p>
                    {resolvedKeyPoints.length > 0 && (
                        <ul className={`mt-4 space-y-2 rounded-lg border p-3 ${darkMode ? 'border-blue-900/50 bg-blue-950/20 text-blue-100' : 'border-blue-200 bg-blue-50 text-blue-900'}`}>
                            {resolvedKeyPoints.map((point, i) => (
                                <li key={i} className="flex gap-2 leading-relaxed">
                                    <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {analogy && (
                        <div className={`mt-4 rounded-lg border p-3 leading-relaxed ${darkMode ? 'border-amber-900/50 bg-amber-950/20 text-amber-100' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
                            <span className="font-semibold">{language === 'tr' ? 'Java analoji: ' : 'Java analogy: '}</span>
                            {analogy}
                        </div>
                    )}
                    {code && <CodeBlock code={code} language="java" darkMode={darkMode} />}
                    {tip && (
                        <div className={`mt-4 rounded-lg border p-3 leading-relaxed ${darkMode ? 'border-green-900/50 bg-green-950/20 text-green-100' : 'border-green-200 bg-green-50 text-green-900'}`}>
                            <span className="font-semibold">{language === 'tr' ? 'Mülakat notu: ' : 'Interview note: '}</span>
                            {tip}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── LocatorVisualBlock ───────────────────────────────────────────────────────

function LocatorVisualBlock({ block, darkMode, language }) {
    const [activeIdx, setActiveIdx] = useState(0)
    const isTr = language === 'tr'
    const loc = block.locators[activeIdx]

    const highlightHtml = (html, highlights) => {
        if (!highlights || highlights.length === 0) return html
        let result = html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        highlights.forEach(h => {
            const escaped = h.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            result = result.replace(
                new RegExp(escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                `<mark style="background:${loc.color}33;color:${loc.color};border-radius:3px;padding:0 2px;font-weight:700">${escaped}</mark>`
            )
        })
        return result
    }

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            {/* Tab bar */}
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.locators.map((l, idx) => (
                    <button
                        key={l.id}
                        onClick={() => setActiveIdx(idx)}
                        className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap border ${activeIdx === idx
                            ? 'text-white shadow-md scale-105 border-transparent'
                            : darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                        style={activeIdx === idx ? { background: l.color } : {}}
                    >
                        {l.label}
                        <span className="ml-1 text-[10px]">{l.starRating}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6">
                {/* HTML Preview */}
                <div>
                    <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>HTML</div>
                    <pre
                        className={`text-xs leading-relaxed p-3 rounded-xl overflow-x-auto ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}
                        style={{ border: `2px solid ${loc.color}44`, fontFamily: 'JetBrains Mono, monospace' }}
                        dangerouslySetInnerHTML={{ __html: highlightHtml(block.htmlExample, loc.highlights) }}
                    />
                    <div className={`mt-3 flex flex-wrap gap-2`}>
                        <span className={`px-2 py-1 rounded text-xs font-bold`} style={{ background: loc.color + '22', color: loc.color }}>
                            Priority #{loc.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {isTr ? (loc.title || '') : (loc.titleEn || loc.title || '')}
                        </span>
                    </div>
                    <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                        {isTr ? (loc.explanation || '') : (loc.explanationEn || loc.explanation || '')}
                    </div>
                </div>

                {/* Code + tip + when */}
                <div>
                    <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.codeLabel || 'Java'}</div>
                    <CodeBlock code={loc.code} language="java" darkMode={darkMode} />
                    {(loc.when || loc.whenEn) && (
                        <div className={`mt-3 px-3 py-2 rounded-lg text-xs ${darkMode ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                            <span className="font-bold">📌 {isTr ? 'Ne zaman?' : 'When?'}</span> {isTr ? (loc.when || '') : (loc.whenEn || loc.when || '')}
                        </div>
                    )}
                    {(loc.tip || loc.tipEn) && (
                        <div className={`mt-2 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                            {isTr ? (loc.tip || '') : (loc.tipEn || loc.tip || '')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── SeleniumVisualBlock ──────────────────────────────────────────────────────

function SeleniumVisualBlock({ block, darkMode, language }) {
    const [activeStep, setActiveStep] = useState(0)
    const isTr = language === 'tr'
    const step = block.steps[activeStep]
    const accent = block.color || '#7c3aed'

    const DropdownVisual = ({ state }) => {
        const opts = [
            { value: 'tr', text: isTr ? 'Türkiye' : 'Turkey' },
            { value: 'us', text: 'USA' },
            { value: 'de', text: 'Germany' },
            { value: 'jp', text: 'Japan' },
        ]
        const selectedVal = step.selectedValue || 'tr'
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
                <div style={{ marginBottom: 8, color: accent, fontWeight: 700 }}>{'<select id="country">'}</div>
                <div style={{
                    border: `2px solid ${accent}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    maxWidth: 220,
                    boxShadow: `0 0 12px ${accent}44`,
                    transition: 'all 0.3s',
                }}>
                    {(state === 'wrap' ? [opts[0]] : opts).map((opt, idx) => (
                        <div key={opt.value} style={{
                            padding: '7px 14px',
                            background: (state !== 'wrap' && (
                                (state === 'byText' || state === 'byValue' || state === 'byIndex' || state === 'firstSelected' || state === 'getOptions')
                                && opt.value === selectedVal && state !== 'getOptions'
                            )) ? accent : (darkMode ? '#1f2937' : '#fff'),
                            color: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions')
                                ? '#fff'
                                : (darkMode ? '#d1d5db' : '#374151'),
                            borderBottom: idx < (state === 'wrap' ? 0 : 3) ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none',
                            transition: 'background 0.3s',
                            fontWeight: opt.value === selectedVal ? 700 : 400,
                        }}>
                            {state === 'getOptions' ? `[${idx}] ${opt.text} (value="${opt.value}")` : opt.text}
                        </div>
                    ))}
                </div>
                {state === 'wrap' && (
                    <div style={{ marginTop: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}>
                        → {isTr ? 'Select sınıfına sarılıyor...' : 'Wrapping with the Select class...'}
                    </div>
                )}
            </div>
        )
    }

    const AlertVisual = ({ state }) => {
        const types = {
            page: { bg: darkMode ? '#1f2937' : '#f3f4f6', border: '#6b7280', msg: isTr ? 'Sayfa yüklendi' : 'Page loaded', icon: '🌐' },
            alert: { bg: '#fef3c7', border: '#f59e0b', msg: isTr ? 'Giriş başarılı!' : 'Login successful!', icon: '⚠️' },
            confirm: { bg: '#fee2e2', border: '#ef4444', msg: isTr ? 'Sepeti temizlemek istediğinize emin misiniz?' : 'Are you sure you want to clear the cart?', icon: '❓', twoBtn: true },
            prompt: { bg: '#ede9fe', border: '#8b5cf6', msg: isTr ? 'Kupon kodunu girin:' : 'Enter coupon code:', icon: '✏️', input: true },
            accept: { bg: '#d1fae5', border: '#10b981', msg: 'OK ✓', icon: '✅' },
            dismiss: { bg: '#fee2e2', border: '#ef4444', msg: isTr ? 'Cancel / İptal ✓' : 'Cancel ✓', icon: '❌' },
        }
        const t = types[state] || types['page']
        const isOverlay = ['alert', 'confirm', 'prompt', 'accept', 'dismiss'].includes(state)
        return (
            <div style={{ position: 'relative', maxWidth: 280 }}>
                <div style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: darkMode ? '#1f2937' : '#f9fafb',
                    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: 12,
                    marginBottom: isOverlay ? 8 : 0,
                    opacity: isOverlay ? 0.4 : 1,
                }}>
                    🌐 {isTr ? 'Ana Sayfa İçeriği' : 'Main Page Content'}
                </div>
                {isOverlay && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: t.bg,
                        border: `2px solid ${t.border}`,
                        boxShadow: `0 4px 20px ${t.border}44`,
                        animation: 'fadeIn 0.3s ease',
                        fontSize: 12,
                    }}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#1f2937' }}>{t.icon} {t.msg}</div>
                        {t.input && (
                            <input readOnly value="SAVE20" style={{
                                border: `1px solid ${t.border}`,
                                borderRadius: 4,
                                padding: '4px 8px',
                                width: '100%',
                                marginBottom: 8,
                                fontSize: 12,
                                background: '#fff',
                            }} />
                        )}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button style={{ padding: '4px 14px', borderRadius: 4, background: t.border, color: '#fff', border: 'none', fontSize: 11, cursor: 'default' }}>OK</button>
                            {t.twoBtn && <button style={{ padding: '4px 14px', borderRadius: 4, background: '#6b7280', color: '#fff', border: 'none', fontSize: 11, cursor: 'default' }}>{isTr ? 'İptal' : 'Cancel'}</button>}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const IframeVisual = ({ state }) => {
        const states = {
            outer: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: isTr ? '🚫 Erişim Yok' : '🚫 No Access', outerActive: true },
            'switch-by-id': { innerOpacity: 0.6, innerBorder: accent, innerLabel: isTr ? '⏳ Geçiş...' : '⏳ Switching...', outerActive: false },
            inner: { innerOpacity: 1, innerBorder: accent, innerLabel: isTr ? '✅ Frame İçi' : '✅ Inside Frame', outerActive: false },
            nested: { innerOpacity: 1, innerBorder: '#8b5cf6', innerLabel: '🔀 Nested', outerActive: false, nested: true },
            back: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: isTr ? '← Dış Sayfa' : '← Outer Page', outerActive: true },
            parent: { innerOpacity: 0.6, innerBorder: accent, innerLabel: '↑ Parent Frame', outerActive: false },
        }
        const s = states[state] || states['outer']
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{
                    padding: 10, borderRadius: 8,
                    border: `2px solid ${s.outerActive ? accent : (darkMode ? '#374151' : '#d1d5db')}`,
                    background: darkMode ? '#111827' : '#f9fafb',
                    boxShadow: s.outerActive ? `0 0 12px ${accent}44` : 'none',
                    transition: 'all 0.3s',
                }}>
                    <div style={{ color: s.outerActive ? accent : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: s.outerActive ? 700 : 400, marginBottom: 6 }}>
                        {s.outerActive ? '✅ ' : ''}🌐 {isTr ? 'Ana Sayfa' : 'Main Page'}
                    </div>
                    <div style={{
                        padding: 8, borderRadius: 6,
                        border: `2px solid ${s.innerBorder}`,
                        background: darkMode ? '#1f2937' : '#fff',
                        opacity: s.innerOpacity,
                        boxShadow: s.innerOpacity === 1 ? `0 0 10px ${s.innerBorder}44` : 'none',
                        transition: 'all 0.4s',
                    }}>
                        <div style={{ color: s.innerBorder, fontWeight: 700, marginBottom: s.nested ? 4 : 0 }}>
                            🖼️ iframe.payment-frame — {s.innerLabel}
                        </div>
                        {s.nested && (
                            <div style={{ padding: 6, border: `1px dashed #8b5cf6`, borderRadius: 4, marginTop: 4, color: '#8b5cf6', fontSize: 10 }}>
                                🔲 iframe#captchaFrame (nested)
                            </div>
                        )}
                        {s.innerOpacity === 1 && !s.nested && (
                            <div style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 4 }}>
                                💳 cardNumber · cvv · expiry
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const WindowVisual = ({ state }) => {
        const wins = [
            { id: 'main', label: isTr ? '🏠 Ana Pencere' : '🏠 Main Window', color: accent },
            { id: 'popup', label: isTr ? '🆕 Popup / Sekme' : '🆕 Popup / Tab', color: '#10b981' },
            { id: 'third', label: isTr ? '3️⃣ Üçüncü' : '3️⃣ Third', color: '#f59e0b' },
        ]
        const activeWins = {
            single: ['main'],
            'multiple': ['main', 'popup'],
            'switch': ['popup'],
            'new-tab': ['main', 'popup'],
            'close': ['main'],
            'handle-set': ['main', 'popup', 'third'],
        }
        const active = activeWins[state] || ['main']
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 240, fontFamily: 'monospace', fontSize: 11 }}>
                {wins.slice(0, state === 'handle-set' ? 3 : state === 'single' || state === 'close' ? 1 : 2).map(w => (
                    <div key={w.id} style={{
                        padding: '7px 12px',
                        borderRadius: 8,
                        border: `2px solid ${active.includes(w.id) ? w.color : (darkMode ? '#374151' : '#d1d5db')}`,
                        background: active.includes(w.id) ? (darkMode ? '#111827' : '#f9fafb') : (darkMode ? '#1f2937' : '#fff'),
                        boxShadow: active.includes(w.id) ? `0 0 10px ${w.color}44` : 'none',
                        color: active.includes(w.id) ? w.color : (darkMode ? '#6b7280' : '#9ca3af'),
                        fontWeight: active.includes(w.id) ? 700 : 400,
                        transition: 'all 0.3s',
                    }}>
                        {active.includes(w.id) ? '▶ ' : '  '}{w.label}
                        {active.includes(w.id) && <span style={{ fontSize: 9, marginLeft: 6, opacity: 0.7 }}>← active</span>}
                    </div>
                ))}
            </div>
        )
    }

    const ActionsVisual = ({ state }) => {
        const cursor = { position: 'absolute', fontSize: 18, transition: 'all 0.5s cubic-bezier(.4,0,.2,1)', pointerEvents: 'none' }
        const positions = {
            idle: { top: '50%', left: '50%' },
            hover: { top: '28%', left: '50%' },
            submenu: { top: '50%', left: '65%' },
            dblclick: { top: '50%', left: '50%' },
            rightclick: { top: '50%', left: '50%' },
            drag: { top: '50%', left: '60%' },
            keyboard: { top: '50%', left: '50%' },
        }
        const pos = positions[state] || positions['idle']
        return (
            <div style={{ position: 'relative', width: 220, height: 160, margin: '0 auto' }}>
                {/* Nav bar simulation */}
                <div style={{
                    position: 'absolute', top: 16, left: 0, right: 0,
                    background: accent, borderRadius: 8, padding: '8px 14px',
                    display: 'flex', gap: 16, alignItems: 'center',
                }}>
                    {['Home', 'Products', 'About'].map(m => (
                        <span key={m} style={{
                            color: '#fff', fontSize: 11, fontWeight: m === 'Products' ? 700 : 400,
                            padding: '2px 6px', borderRadius: 4,
                            background: (state === 'hover' || state === 'submenu') && m === 'Products' ? 'rgba(255,255,255,0.2)' : 'transparent',
                            transition: 'background 0.3s',
                        }}>{m}</span>
                    ))}
                </div>
                {/* Submenu */}
                {(state === 'submenu') && (
                    <div style={{
                        position: 'absolute', top: 50, left: 80,
                        background: darkMode ? '#1f2937' : '#fff',
                        border: `2px solid ${accent}`,
                        borderRadius: 6, padding: '4px 0',
                        boxShadow: `0 4px 16px ${accent}44`,
                        animation: 'fadeIn 0.2s ease',
                        zIndex: 10,
                    }}>
                        {['Laptops', 'Phones', 'Tablets'].map(s => (
                            <div key={s} style={{ padding: '4px 14px', fontSize: 11, color: darkMode ? '#e5e7eb' : '#374151' }}>{s}</div>
                        ))}
                    </div>
                )}
                {/* Draggable / droppable */}
                {(state === 'drag') && (
                    <div style={{ position: 'absolute', top: 80, left: 0, right: 0, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: 48, height: 36, borderRadius: 6, background: `${accent}bb`, border: `2px dashed ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, transform: 'translateX(20px)', transition: 'transform 0.5s' }}>DRAG</div>
                        <span style={{ color: accent, fontWeight: 700 }}>→</span>
                        <div style={{ width: 56, height: 40, borderRadius: 6, border: `2px solid ${accent}`, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, fontWeight: 700 }}>DROP</div>
                    </div>
                )}
                {/* Keyboard */}
                {state === 'keyboard' && (
                    <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                        {['Ctrl', 'A', '→', 'Del'].map(k => (
                            <div key={k} style={{
                                padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                                background: accent, color: '#fff',
                                boxShadow: `0 2px 0 ${accent}88`,
                                animation: 'pulse 1s infinite',
                            }}>{k}</div>
                        ))}
                    </div>
                )}
                {/* Double click ripple */}
                {state === 'dblclick' && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                        <div style={{ width: 50, height: 50, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out', opacity: 0.6 }} />
                        <div style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out 0.15s', opacity: 0.4, position: 'absolute', top: 10, left: 10 }} />
                    </div>
                )}
                {/* Right-click context menu */}
                {state === 'rightclick' && (
                    <div style={{
                        position: 'absolute', top: 60, left: 80,
                        background: darkMode ? '#1f2937' : '#fff',
                        border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
                        borderRadius: 6, padding: '4px 0',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        animation: 'fadeIn 0.2s ease',
                        minWidth: 90,
                    }}>
                        {['✂️ Cut', '📋 Copy', '🗑️ Delete'].map(m => (
                            <div key={m} style={{ padding: '4px 14px', fontSize: 11, color: m.includes('Delete') ? '#ef4444' : (darkMode ? '#e5e7eb' : '#374151') }}>{m}</div>
                        ))}
                    </div>
                )}
                {/* Cursor */}
                {state !== 'drag' && state !== 'keyboard' && (
                    <div style={{ ...cursor, ...pos, transform: 'translate(-50%,-50%)' }}>🖱️</div>
                )}
            </div>
        )
    }

    const JSExecutorVisual = ({ state }) => {
        const pageH = 180
        const visibleH = 70
        const scrollPct = { idle: 0, scrollTo: 85, scrollBy: 40, scrollIntoView: 70, jsClick: 0, setValue: 0 }
        const pct = scrollPct[state] ?? 0
        return (
            <div style={{ position: 'relative', width: 200, margin: '0 auto' }}>
                {/* Browser frame */}
                <div style={{ borderRadius: 8, border: `2px solid ${accent}`, overflow: 'hidden', background: darkMode ? '#111827' : '#f9fafb' }}>
                    {/* URL bar */}
                    <div style={{ background: accent, padding: '4px 10px', fontSize: 10, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>⚡ JS Executor</span>
                    </div>
                    {/* Scrollable page */}
                    <div style={{ height: visibleH, overflow: 'hidden', position: 'relative' }}>
                        <div style={{
                            transform: `translateY(-${pct}%)`,
                            transition: 'transform 0.5s ease',
                            padding: 8,
                        }}>
                            {/* Page sections */}
                            {['🏠 Header', '📦 Section 1', '🛒 Section 2', '📧 Footer'].map((s, idx) => (
                                <div key={idx} style={{
                                    padding: '6px 8px', borderRadius: 4, marginBottom: 4, fontSize: 10,
                                    background: (state === 'scrollIntoView' && idx === 3) ? `${accent}33` : (darkMode ? '#1f2937' : '#fff'),
                                    border: `1px solid ${(state === 'scrollIntoView' && idx === 3) ? accent : (darkMode ? '#374151' : '#e5e7eb')}`,
                                    color: darkMode ? '#d1d5db' : '#374151',
                                    fontWeight: (state === 'scrollIntoView' && idx === 3) ? 700 : 400,
                                    boxShadow: (state === 'jsClick' && idx === 0) ? `0 0 8px ${accent}88` : 'none',
                                    transition: 'all 0.4s',
                                }}>
                                    {state === 'jsClick' && idx === 0 ? `${s} ← JS click!` : s}
                                    {state === 'setValue' && idx === 1 ? ' → test@test.com' : ''}
                                </div>
                            ))}
                        </div>
                        {/* Scroll indicator */}
                        {pct > 0 && (
                            <div style={{
                                position: 'absolute', right: 2, top: `${(pct / 100) * 60}%`,
                                width: 3, height: 20, background: accent, borderRadius: 2,
                                transition: 'top 0.5s ease',
                            }} />
                        )}
                    </div>
                </div>
                {/* Label */}
                <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: accent, fontWeight: 700 }}>
                    {state === 'idle' ? (isTr ? '⚡ Hazır' : '⚡ Ready') :
                        state === 'scrollTo' ? 'scrollTo(0, body.scrollHeight)' :
                            state === 'scrollBy' ? 'scrollBy(0, 500)' :
                                state === 'scrollIntoView' ? 'scrollIntoView(true)' :
                                    state === 'jsClick' ? 'arguments[0].click()' :
                                        state === 'setValue' ? 'arguments[0].value=...' : ''}
                </div>
            </div>
        )
    }

    const renderVisual = () => {
        const vs = step.visualState
        switch (block.concept) {
            case 'dropdown': return <DropdownVisual state={vs} />
            case 'alert': return <AlertVisual state={vs} />
            case 'iframe': return <IframeVisual state={vs} />
            case 'window': return <WindowVisual state={vs} />
            case 'actions': return <ActionsVisual state={vs} />
            case 'js-executor': return <JSExecutorVisual state={vs} />
            default: return null
        }
    }

    return (
        <div key={`sv-${block.concept}`} className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ boxShadow: `0 0 24px ${accent}22` }}>
            {/* Header */}
            <div style={{ background: accent }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon}</span>
                <span className="text-white font-bold text-sm md:text-base">{isTr ? block.title.tr : block.title.en}</span>
            </div>

            {/* Step tabs */}
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.steps.map((s, idx) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveStep(idx)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${activeStep === idx
                            ? 'text-white shadow-md scale-105'
                            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        style={activeStep === idx ? { background: accent } : {}}
                    >
                        {isTr ? s.label : (s.labelEn || s.label)}
                    </button>
                ))}
            </div>

            {/* Body */}
            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                {/* Visual */}
                <div className={`rounded-xl p-4 flex items-center justify-center min-h-[160px] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ border: `1px solid ${accent}44` }}>
                    {renderVisual()}
                </div>

                {/* Text + Code */}
                <div>
                    <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? step.description.tr : step.description.en}
                    </p>
                    <CodeBlock code={step.code} language="java" darkMode={darkMode} />
                    {step.tip && (
                        <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                            {isTr ? step.tip.tr : step.tip.en}
                        </div>
                    )}
                </div>
            </div>

            {/* Step counter */}
            <div className={`px-4 py-2 flex items-center justify-between border-t text-xs ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>← {isTr ? 'Önceki' : 'Prev'}</button>
                <span>{activeStep + 1} / {block.steps.length}</span>
                <button onClick={() => setActiveStep(Math.min(block.steps.length - 1, activeStep + 1))} disabled={activeStep === block.steps.length - 1} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>{isTr ? 'Sonraki' : 'Next'} →</button>
            </div>
        </div>
    )
}

// ─── PlaywrightVisualBlock ────────────────────────────────────────────────────

function PlaywrightVisualBlock({ block, darkMode, language }) {
    const [activeStep, setActiveStep] = useState(0)
    const isTr = language === 'tr'
    const step = block.steps[activeStep]
    const accent = block.color || '#0ea5e9'

    const AutoWaitVisual = ({ state }) => {
        const phases = [
            { id: 'check', label: isTr ? 'Element Kontrol' : 'Check Element' },
            { id: 'retry', label: isTr ? 'Tekrar Dene' : 'Retry' },
            { id: 'found', label: isTr ? 'Bulundu!' : 'Found!' },
        ]
        const showPhases = { 'selenium-way': [], 'pw-way': ['check'], retry: ['check', 'retry'], found: ['check', 'retry', 'found'], timeout: ['check', 'retry'] }
        const active = showPhases[state] || []
        if (state === 'selenium-way') {
            return (
                <div style={{ fontFamily: 'monospace', fontSize: 11, maxWidth: 280 }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠️ Selenium: Manuel Bekleme</div>
                    {[
                        'WebDriverWait(driver, 30)',
                        'ExpectedConditions.visibilityOf(...)',
                        '.until(...) → element bul',
                        isTr ? 'Her action için tekrar yaz!' : 'Repeat it for every action!',
                    ].map((txt, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, padding: '5px 10px', borderRadius: 6, background: darkMode ? '#1f2937' : '#f9fafb', border: `1px solid ${idx === 3 ? '#ef444444' : (darkMode ? '#374151' : '#e5e7eb')}`, color: idx === 3 ? '#ef4444' : (darkMode ? '#9ca3af' : '#6b7280'), fontSize: 11 }}>
                            <span>{['1️⃣', '2️⃣', '3️⃣', '⛔'][idx]}</span><span>{txt}</span>
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ color: accent, fontWeight: 700, marginBottom: 8 }}>✅ Playwright: Auto-Wait</div>
                {phases.map((phase, idx) => {
                    const isActive = active.includes(phase.id)
                    const isTimeout = state === 'timeout' && phase.id === 'retry'
                    const phaseColor = phase.id === 'found' ? '#10b981' : isTimeout ? '#ef4444' : accent
                    return (
                        <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb'), color: isActive ? '#fff' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, fontSize: 12, flexShrink: 0, boxShadow: isActive ? `0 0 8px ${phaseColor}66` : 'none', transition: 'all 0.4s' }}>
                                {phase.id === 'found' ? '✓' : isTimeout ? '✗' : idx + 1}
                            </div>
                            <div style={{ flex: 1, padding: '4px 8px', borderRadius: 5, background: isActive ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#f9fafb'), border: `1px solid ${isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb')}`, color: isActive ? (darkMode ? '#e5e7eb' : '#111827') : (darkMode ? '#6b7280' : '#9ca3af'), transition: 'all 0.4s' }}>
                                {phase.label}
                                {isActive && <span style={{ marginLeft: 6, fontSize: 9, color: phaseColor }}>{phase.id === 'check' ? (isTr ? '→ bekle' : '→ waiting') : phase.id === 'retry' ? (isTimeout ? '30s → TimeoutError!' : (isTr ? '← tekrar' : '← retry')) : (isTr ? '← hazır!' : '← ready!')}</span>}
                            </div>
                        </div>
                    )
                })}
                {state === 'found' && <div style={{ marginTop: 6, color: '#10b981', fontWeight: 700, fontSize: 11 }}>✅ {isTr ? 'Extra kod yazmana gerek yok!' : 'No extra code needed!'}</div>}
                {state === 'timeout' && <div style={{ marginTop: 6, color: '#ef4444', fontSize: 11 }}>⏱️ {isTr ? 'TimeoutError: 30s içinde bulunamadı' : 'TimeoutError: not found within 30s'}</div>}
            </div>
        )
    }

    const SelectOptionVisual = ({ state }) => {
        const opts = [{ value: 'tr', text: isTr ? 'Türkiye' : 'Turkey' }, { value: 'us', text: 'USA' }, { value: 'de', text: 'Germany' }, { value: 'jp', text: 'Japan' }]
        const selectedVal = step.selectedValue || 'tr'
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
                <div style={{ marginBottom: 8, color: accent, fontWeight: 700, fontSize: 11 }}>{'page.locator("#country")'}</div>
                <div style={{ border: `2px solid ${accent}`, borderRadius: 8, overflow: 'hidden', maxWidth: 220, boxShadow: `0 0 12px ${accent}44`, transition: 'all 0.3s' }}>
                    {(state === 'wrap' ? [opts[0]] : opts).map((opt, idx) => (
                        <div key={opt.value} style={{ padding: '7px 14px', background: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions') ? accent : (darkMode ? '#1f2937' : '#fff'), color: (state !== 'wrap' && opt.value === selectedVal && state !== 'getOptions') ? '#fff' : (darkMode ? '#d1d5db' : '#374151'), borderBottom: idx < (state === 'wrap' ? 0 : 3) ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none', transition: 'background 0.3s', fontWeight: opt.value === selectedVal ? 700 : 400 }}>
                            {state === 'getOptions' ? `[${idx}] ${opt.text}` : opt.text}
                        </div>
                    ))}
                </div>
                {state === 'wrap' && <div style={{ marginTop: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}>→ {isTr ? '.selectOption() çağrılıyor...' : 'Calling .selectOption()...'}</div>}
            </div>
        )
    }

    const DialogVisual = ({ state }) => {
        const dialogTypes = {
            register: { bg: darkMode ? '#1f2937' : '#f9fafb', label: isTr ? 'onDialog event handler bekleniyor' : 'Waiting for onDialog event', icon: '📋', border: darkMode ? '#374151' : '#e5e7eb' },
            'dialog-fires': { bg: '#fef3c7', label: isTr ? 'Dialog tetiklendi!' : 'Dialog fired!', icon: '⚠️', border: '#f59e0b' },
            handle: { bg: '#d1fae5', label: 'accept() veya dismiss()', icon: '✅', border: '#10b981' },
            dismiss: { bg: '#fee2e2', label: isTr ? 'dismiss() → iptal' : 'dismiss() → cancel', icon: '❌', border: '#ef4444' },
        }
        const d = dialogTypes[state] || dialogTypes['register']
        return (
            <div style={{ position: 'relative', maxWidth: 280 }}>
                <div style={{ padding: '10px 16px', borderRadius: 8, background: darkMode ? '#1f2937' : '#f9fafb', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12, marginBottom: 8, opacity: state !== 'register' ? 0.4 : 1 }}>
                    🌐 {isTr ? 'Ana Sayfa İçeriği' : 'Main Page Content'}
                </div>
                {state === 'register' ? (
                    <div style={{ padding: '8px 12px', borderRadius: 8, background: `${accent}11`, border: `1px dashed ${accent}`, fontSize: 11, color: accent }}>
                        <span style={{ fontWeight: 700 }}>page.onDialog(dialog -&gt; {'{'}</span><br />
                        <span style={{ marginLeft: 16, color: darkMode ? '#9ca3af' : '#6b7280' }}>dialog.accept();</span><br />
                        <span style={{ fontWeight: 700 }}>{'}'})</span>
                    </div>
                ) : (
                    <div style={{ padding: '12px 16px', borderRadius: 8, background: d.bg, border: `2px solid ${d.border}`, boxShadow: `0 4px 20px ${d.border}44`, animation: 'fadeIn 0.3s ease', fontSize: 12 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: '#1f2937' }}>{d.icon} {d.label}</div>
                        <div style={{ color: '#6b7280', fontSize: 11 }}>{state === 'handle' ? '→ dialog.accept()' : state === 'dismiss' ? '→ dialog.dismiss()' : 'type: alert | confirm | prompt'}</div>
                    </div>
                )}
            </div>
        )
    }

    const FrameLocatorVisual = ({ state }) => {
        const states = { outer: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: isTr ? '🚫 erişim yok' : '🚫 no access', outerActive: true }, 'frame-locator': { innerOpacity: 0.6, innerBorder: accent, innerLabel: '⏳ frameLocator("#f")', outerActive: false }, inner: { innerOpacity: 1, innerBorder: accent, innerLabel: isTr ? '✅ .locator() çalışır' : '✅ .locator() works', outerActive: false }, back: { innerOpacity: 0.3, innerBorder: '#6b7280', innerLabel: isTr ? '← dış sayfa' : '← outer page', outerActive: true } }
        const s = states[state] || states['outer']
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ padding: 10, borderRadius: 8, border: `2px solid ${s.outerActive ? accent : (darkMode ? '#374151' : '#d1d5db')}`, background: darkMode ? '#111827' : '#f9fafb', boxShadow: s.outerActive ? `0 0 12px ${accent}44` : 'none', transition: 'all 0.3s' }}>
                    <div style={{ color: s.outerActive ? accent : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: s.outerActive ? 700 : 400, marginBottom: 6 }}>{s.outerActive ? '✅ ' : ''}🌐 {isTr ? 'Ana Sayfa' : 'Main Page'}</div>
                    <div style={{ padding: 8, borderRadius: 6, border: `2px solid ${s.innerBorder}`, background: darkMode ? '#1f2937' : '#fff', opacity: s.innerOpacity, boxShadow: s.innerOpacity === 1 ? `0 0 10px ${s.innerBorder}44` : 'none', transition: 'all 0.4s' }}>
                        <div style={{ color: s.innerBorder, fontWeight: 700 }}>🖼️ iframe#payment — {s.innerLabel}</div>
                        {s.innerOpacity === 1 && <div style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 4 }}>💳 frameLocator → locator chain</div>}
                    </div>
                </div>
                {state === 'inner' && <div style={{ marginTop: 6, fontSize: 10, color: '#10b981' }}>✅ {isTr ? 'switchTo() gerekmez — chain yeterli!' : 'No switchTo() needed — the chain is enough!'}</div>}
            </div>
        )
    }

    const MultiPageVisual = ({ state }) => {
        const pages = [{ id: 'main', label: '🏠 Main Page', color: accent }, { id: 'popup', label: '🆕 Popup / New Tab', color: '#10b981' }, { id: 'third', label: '3️⃣ Third Page', color: '#f59e0b' }]
        const activePagesMap = { single: ['main'], 'wait-popup': ['main', 'popup'], 'new-page': ['main', 'popup'], close: ['main'], 'context-pages': ['main', 'popup', 'third'] }
        const active = activePagesMap[state] || ['main']
        const showCount = state === 'context-pages' ? 3 : (state === 'single' || state === 'close') ? 1 : 2
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 240, fontFamily: 'monospace', fontSize: 11 }}>
                {pages.slice(0, showCount).map(p => (
                    <div key={p.id} style={{ padding: '7px 12px', borderRadius: 8, border: `2px solid ${active.includes(p.id) ? p.color : (darkMode ? '#374151' : '#d1d5db')}`, background: active.includes(p.id) ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#fff'), boxShadow: active.includes(p.id) ? `0 0 10px ${p.color}44` : 'none', color: active.includes(p.id) ? p.color : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: active.includes(p.id) ? 700 : 400, transition: 'all 0.3s' }}>
                        {active.includes(p.id) ? '▶ ' : '  '}{p.label}{active.includes(p.id) && <span style={{ fontSize: 9, marginLeft: 6, opacity: 0.7 }}>← active</span>}
                    </div>
                ))}
            </div>
        )
    }

    const PwActionsVisual = ({ state }) => {
        const cursor = { position: 'absolute', fontSize: 18, transition: 'all 0.5s cubic-bezier(.4,0,.2,1)', pointerEvents: 'none' }
        const positions = { idle: { top: '50%', left: '50%' }, hover: { top: '28%', left: '50%' }, submenu: { top: '50%', left: '65%' }, dblclick: { top: '50%', left: '50%' }, rightclick: { top: '50%', left: '50%' }, drag: { top: '50%', left: '60%' }, keyboard: { top: '50%', left: '50%' } }
        const pos = positions[state] || positions['idle']
        return (
            <div style={{ position: 'relative', width: 220, height: 160, margin: '0 auto' }}>
                <div style={{ position: 'absolute', top: 16, left: 0, right: 0, background: accent, borderRadius: 8, padding: '8px 14px', display: 'flex', gap: 16, alignItems: 'center' }}>
                    {['Home', 'Products', 'About'].map(m => (
                        <span key={m} style={{ color: '#fff', fontSize: 11, fontWeight: m === 'Products' ? 700 : 400, padding: '2px 6px', borderRadius: 4, background: (state === 'hover' || state === 'submenu') && m === 'Products' ? 'rgba(255,255,255,0.2)' : 'transparent', transition: 'background 0.3s' }}>{m}</span>
                    ))}
                </div>
                {state === 'submenu' && <div style={{ position: 'absolute', top: 50, left: 80, background: darkMode ? '#1f2937' : '#fff', border: `2px solid ${accent}`, borderRadius: 6, padding: '4px 0', boxShadow: `0 4px 16px ${accent}44`, animation: 'fadeIn 0.2s ease', zIndex: 10 }}>{['Laptops', 'Phones', 'Tablets'].map(s => <div key={s} style={{ padding: '4px 14px', fontSize: 11, color: darkMode ? '#e5e7eb' : '#374151' }}>{s}</div>)}</div>}
                {state === 'drag' && <div style={{ position: 'absolute', top: 80, left: 0, right: 0, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}><div style={{ width: 48, height: 36, borderRadius: 6, background: `${accent}bb`, border: `2px dashed ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, transform: 'translateX(20px)', transition: 'transform 0.5s' }}>DRAG</div><span style={{ color: accent, fontWeight: 700 }}>→</span><div style={{ width: 56, height: 40, borderRadius: 6, border: `2px solid ${accent}`, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: accent, fontWeight: 700 }}>DROP</div></div>}
                {state === 'keyboard' && <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>{['Control', 'A', '→', 'Del'].map(k => <div key={k} style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: accent, color: '#fff', boxShadow: `0 2px 0 ${accent}88`, animation: 'pulse 1s infinite' }}>{k}</div>)}</div>}
                {state === 'dblclick' && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}><div style={{ width: 50, height: 50, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out', opacity: 0.6 }} /><div style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${accent}`, animation: 'ping 0.6s ease-out 0.15s', opacity: 0.4, position: 'absolute', top: 10, left: 10 }} /></div>}
                {state === 'rightclick' && <div style={{ position: 'absolute', top: 60, left: 80, background: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`, borderRadius: 6, padding: '4px 0', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', animation: 'fadeIn 0.2s ease', minWidth: 90 }}>{['✂️ Cut', '📋 Copy', '🗑️ Delete'].map(m => <div key={m} style={{ padding: '4px 14px', fontSize: 11, color: m.includes('Delete') ? '#ef4444' : (darkMode ? '#e5e7eb' : '#374151') }}>{m}</div>)}</div>}
                {state !== 'drag' && state !== 'keyboard' && <div style={{ ...cursor, ...pos, transform: 'translate(-50%,-50%)' }}>🖱️</div>}
            </div>
        )
    }

    const EvaluateVisual = ({ state }) => {
        const scrollPct = { idle: 0, scrollTo: 85, scrollBy: 40, scrollIntoView: 70, evaluate: 0, fill: 0 }
        const pct = scrollPct[state] ?? 0
        return (
            <div style={{ position: 'relative', width: 200, margin: '0 auto' }}>
                <div style={{ borderRadius: 8, border: `2px solid ${accent}`, overflow: 'hidden', background: darkMode ? '#111827' : '#f9fafb' }}>
                    <div style={{ background: accent, padding: '4px 10px', fontSize: 10, color: '#fff' }}>⚡ page.evaluate()</div>
                    <div style={{ height: 70, overflow: 'hidden', position: 'relative' }}>
                        <div style={{ transform: `translateY(-${pct}%)`, transition: 'transform 0.5s ease', padding: 8 }}>
                            {['🏠 Header', '📦 Section 1', '🛒 Section 2', '📧 Footer'].map((s, idx) => (
                                <div key={idx} style={{ padding: '6px 8px', borderRadius: 4, marginBottom: 4, fontSize: 10, background: (state === 'scrollIntoView' && idx === 3) ? `${accent}33` : (darkMode ? '#1f2937' : '#fff'), border: `1px solid ${(state === 'scrollIntoView' && idx === 3) ? accent : (darkMode ? '#374151' : '#e5e7eb')}`, color: darkMode ? '#d1d5db' : '#374151', fontWeight: (state === 'scrollIntoView' && idx === 3) ? 700 : 400, boxShadow: (state === 'evaluate' && idx === 0) ? `0 0 8px ${accent}88` : 'none', transition: 'all 0.4s' }}>
                                    {state === 'evaluate' && idx === 0 ? `${s} ← evaluate!` : s}{state === 'fill' && idx === 1 ? ' → test@test.com' : ''}
                                </div>
                            ))}
                        </div>
                        {pct > 0 && <div style={{ position: 'absolute', right: 2, top: `${(pct / 100) * 60}%`, width: 3, height: 20, background: accent, borderRadius: 2, transition: 'top 0.5s ease' }} />}
                    </div>
                </div>
                <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: accent, fontWeight: 700 }}>
                    {state === 'idle' ? '⚡ Ready' : state === 'scrollTo' ? 'window.scrollTo(0, body.scrollHeight)' : state === 'scrollBy' ? 'window.scrollBy(0, 500)' : state === 'scrollIntoView' ? 'scrollIntoView(true)' : state === 'evaluate' ? 'page.evaluate(fn)' : 'page.evaluate(el => el.value=...)'}
                </div>
            </div>
        )
    }

    const BrowserContextVisual = ({ state }) => {
        const contexts = [{ id: 'ctx1', label: '👤 Admin Session', color: accent }, { id: 'ctx2', label: '🛒 Customer', color: '#10b981' }, { id: 'ctx3', label: '🔍 Guest', color: '#f59e0b' }]
        const activeCtx = { single: ['ctx1'], 'new-context': ['ctx1', 'ctx2'], parallel: ['ctx1', 'ctx2', 'ctx3'], isolation: ['ctx1', 'ctx2', 'ctx3'], close: ['ctx1'] }
        const active = activeCtx[state] || ['ctx1']
        const showCount = (state === 'parallel' || state === 'isolation') ? 3 : (state === 'single' || state === 'close') ? 1 : 2
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 11, maxWidth: 260 }}>
                <div style={{ textAlign: 'center', marginBottom: 8, color: darkMode ? '#9ca3af' : '#6b7280', fontSize: 10 }}>🌐 browser (tek proses)</div>
                <div style={{ border: `2px solid ${darkMode ? '#374151' : '#d1d5db'}`, borderRadius: 10, padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {contexts.slice(0, showCount).map(ctx => (
                        <div key={ctx.id} style={{ padding: '6px 10px', borderRadius: 6, border: `2px solid ${active.includes(ctx.id) ? ctx.color : (darkMode ? '#374151' : '#e5e7eb')}`, background: active.includes(ctx.id) ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#f9fafb'), color: active.includes(ctx.id) ? ctx.color : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: active.includes(ctx.id) ? 700 : 400, boxShadow: active.includes(ctx.id) ? `0 0 8px ${ctx.color}44` : 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 6 }}>
                            {ctx.label}{active.includes(ctx.id) && state === 'isolation' && <span style={{ marginLeft: 'auto', fontSize: 9, background: `${ctx.color}22`, padding: '2px 5px', borderRadius: 3 }}>🍪 isolated</span>}
                        </div>
                    ))}
                </div>
                {state === 'parallel' && <div style={{ marginTop: 8, color: '#10b981', fontSize: 10, textAlign: 'center' }}>⚡ {isTr ? '3 context paralel çalışıyor' : '3 contexts running in parallel'}</div>}
            </div>
        )
    }

    const TraceVisual = ({ state }) => {
        const events = [{ icon: '🌐', label: 'navigate', color: '#3b82f6' }, { icon: '🖱️', label: 'click', color: accent }, { icon: '⌨️', label: 'fill', color: '#10b981' }, { icon: '✅', label: 'assert', color: '#8b5cf6' }]
        const activeCount = { idle: 0, record: 2, screenshot: 3, video: 4, viewer: 4 }
        const count = activeCount[state] || 0
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                {(state === 'screenshot') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: '#fee2e2', border: '1px solid #ef4444', fontSize: 10, color: '#ef4444' }}>📸 screenshot-on-failure.png</div>}
                {(state === 'video') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: '#fef3c7', border: '1px solid #f59e0b', fontSize: 10, color: '#92400e' }}>🎥 video.webm kaydediliyor...</div>}
                {(state === 'viewer') && <div style={{ marginBottom: 8, padding: '6px 10px', borderRadius: 6, background: `${accent}11`, border: `1px solid ${accent}`, fontSize: 10, color: accent }}>🎭 trace.zip → Trace Viewer</div>}
                <div style={{ background: darkMode ? '#111827' : '#f8fafc', border: `2px solid ${accent}`, borderRadius: 8, padding: 10 }}>
                    <div style={{ color: accent, fontWeight: 700, marginBottom: 8, fontSize: 10 }}>📊 {isTr ? 'Test İzleme' : 'Trace Timeline'}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {events.map((e, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: idx < count ? e.color : (darkMode ? '#374151' : '#d1d5db'), transition: 'background 0.3s', flexShrink: 0 }} />
                                <div style={{ flex: 1, height: 18, borderRadius: 3, overflow: 'hidden', background: darkMode ? '#1f2937' : '#e5e7eb' }}>
                                    <div style={{ height: '100%', borderRadius: 3, transition: 'width 0.5s ease', width: idx < count ? `${(idx + 1) * 22}%` : '0%', background: idx < count ? e.color : 'transparent', display: 'flex', alignItems: 'center', paddingLeft: 6, fontSize: 9, color: '#fff', fontWeight: 700 }}>
                                        {idx < count ? `${e.icon} ${e.label}` : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {state === 'viewer' && <div style={{ marginTop: 8, fontSize: 10, color: '#10b981', textAlign: 'center' }}>✅ npx playwright show-trace trace.zip</div>}
            </div>
        )
    }

    const AssertionRetryVisual = ({ state }) => {
        const phases = [
            { id: 'checking', label: isTr ? 'Kontrol Ediliyor' : 'Checking' },
            { id: 'retrying', label: isTr ? 'Tekrar Deniyor' : 'Retrying' },
            { id: 'resolved', label: isTr ? 'Sonuçlandı' : 'Resolved' },
        ]
        const showPhases = { 'fail-fast': [], 'pw-way': ['checking'], retry: ['checking', 'retrying'], found: ['checking', 'retrying', 'resolved'], timeout: ['checking', 'retrying'] }
        const active = showPhases[state] || []
        if (state === 'fail-fast') {
            return (
                <div style={{ fontFamily: 'monospace', fontSize: 11, maxWidth: 280 }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠️ {isTr ? 'Klasik Assert: Anlık Kontrol' : 'Classic Assert: Instant Check'}</div>
                    {[
                        'assertEquals(beklenen, gercek)',
                        isTr ? 'DOM o anki haliyle okunur' : 'Reads the DOM at this exact instant',
                        isTr ? 'Doğru değilse → ANINDA FAIL' : 'Not correct yet → FAILS IMMEDIATELY',
                    ].map((txt, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, padding: '5px 10px', borderRadius: 6, background: darkMode ? '#1f2937' : '#f9fafb', border: `1px solid ${idx === 2 ? '#ef444444' : (darkMode ? '#374151' : '#e5e7eb')}`, color: idx === 2 ? '#ef4444' : (darkMode ? '#9ca3af' : '#6b7280'), fontSize: 11 }}>
                            <span>{['1️⃣', '2️⃣', '⛔'][idx]}</span><span>{txt}</span>
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <div style={{ maxWidth: 260, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ color: accent, fontWeight: 700, marginBottom: 8 }}>✅ {isTr ? 'Playwright expect() — Auto-Retry' : 'Playwright expect() — Auto-Retry'}</div>
                {phases.map((phase, idx) => {
                    const isActive = active.includes(phase.id)
                    const isTimeout = state === 'timeout' && phase.id === 'retrying'
                    const phaseColor = phase.id === 'resolved' ? '#10b981' : isTimeout ? '#ef4444' : accent
                    return (
                        <div key={phase.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb'), color: isActive ? '#fff' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, fontSize: 12, flexShrink: 0, boxShadow: isActive ? `0 0 8px ${phaseColor}66` : 'none', transition: 'all 0.4s' }}>
                                {phase.id === 'resolved' ? '✓' : isTimeout ? '✗' : idx + 1}
                            </div>
                            <div style={{ flex: 1, padding: '4px 8px', borderRadius: 5, background: isActive ? (darkMode ? '#111827' : '#f0f9ff') : (darkMode ? '#1f2937' : '#f9fafb'), border: `1px solid ${isActive ? phaseColor : (darkMode ? '#374151' : '#e5e7eb')}`, color: isActive ? (darkMode ? '#e5e7eb' : '#111827') : (darkMode ? '#6b7280' : '#9ca3af'), transition: 'all 0.4s' }}>
                                {phase.label}
                                {isActive && <span style={{ marginLeft: 6, fontSize: 9, color: phaseColor }}>{phase.id === 'checking' ? (isTr ? '→ t=0ms' : '→ t=0ms') : phase.id === 'retrying' ? (isTimeout ? '5000ms → TimeoutError!' : (isTr ? '← ~100ms aralıkla' : '← every ~100ms')) : (isTr ? '← geçti!' : '← passed!')}</span>}
                            </div>
                        </div>
                    )
                })}
                {state === 'found' && <div style={{ marginTop: 6, color: '#10b981', fontWeight: 700, fontSize: 11 }}>✅ {isTr ? 'Toplam süre = gerçekte gereken süre' : 'Total time = exactly what was needed'}</div>}
                {state === 'timeout' && <div style={{ marginTop: 6, color: '#ef4444', fontSize: 11 }}>⏱️ {isTr ? 'TimeoutError: 5s içinde koşul hiç doğru olmadı' : 'TimeoutError: condition never became true within 5s'}</div>}
            </div>
        )
    }

    const FixtureDiVisual = ({ state }) => {
        const stages = ['request', 'setup', 'inject', 'teardown']
        const idx = stages.indexOf(state)
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 10.5, maxWidth: 260 }}>
                <div style={{ padding: '8px 10px', borderRadius: 8, border: `2px solid ${idx >= 0 ? accent : (darkMode ? '#374151' : '#d1d5db')}`, background: darkMode ? '#111827' : '#f0f9ff', marginBottom: 8, opacity: idx >= 0 ? 1 : 0.5 }}>
                    <div style={{ color: accent, fontWeight: 700 }}>{"test(async ({ loggedInPage }) => {"}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: idx >= 1 ? accent : (darkMode ? '#4b5563' : '#cbd5e1'), fontSize: 16, transition: 'color 0.3s' }}>↓</div>
                <div style={{ padding: '8px 10px', borderRadius: 8, border: `2px solid ${idx >= 1 ? '#f59e0b' : (darkMode ? '#374151' : '#d1d5db')}`, background: idx === 1 ? '#fef3c722' : (darkMode ? '#1f2937' : '#f9fafb'), marginBottom: 8, opacity: idx >= 1 ? 1 : 0.4, transition: 'all 0.3s' }}>
                    <div style={{ color: idx >= 1 ? '#f59e0b' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700 }}>🧩 {isTr ? 'Fixture Factory' : 'Fixture Factory'}</div>
                    {idx === 1 && <div style={{ fontSize: 9.5, marginTop: 4, color: darkMode ? '#9ca3af' : '#6b7280' }}>{isTr ? 'login adımları çalışıyor...' : 'running login steps...'}</div>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: idx >= 2 ? '#10b981' : (darkMode ? '#4b5563' : '#cbd5e1'), fontSize: 16, transition: 'color 0.3s' }}>↓ use()</div>
                <div style={{ padding: '8px 10px', borderRadius: 8, border: `2px solid ${idx >= 2 ? '#10b981' : (darkMode ? '#374151' : '#d1d5db')}`, background: idx === 2 ? '#10b98122' : (darkMode ? '#1f2937' : '#f9fafb'), opacity: idx >= 2 ? 1 : 0.4, transition: 'all 0.3s' }}>
                    <div style={{ color: idx >= 2 ? '#10b981' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700 }}>{isTr ? '✅ Test gövdesi çalışıyor' : '✅ Test body runs'}</div>
                </div>
                {state === 'teardown' && (
                    <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#8b5cf622', border: '1px solid #8b5cf6', color: '#8b5cf6', fontSize: 10 }}>
                        🧹 {isTr ? 'use() sonrası kod → logout (teardown)' : 'code after use() → logout (teardown)'}
                    </div>
                )}
            </div>
        )
    }

    const PomFlowVisual = ({ state }) => {
        const files = ['login.spec.ts', 'checkout.spec.ts', 'profile.spec.ts']
        if (state === 'no-pom') {
            return (
                <div style={{ fontFamily: 'monospace', fontSize: 10, maxWidth: 260 }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>😱 {isTr ? 'Her dosyada kopya locator' : 'Duplicated locator in every file'}</div>
                    {files.map((f, idx) => (
                        <div key={idx} style={{ padding: '6px 9px', borderRadius: 6, marginBottom: 4, background: darkMode ? '#1f2937' : '#fef2f2', border: '1px solid #ef444444' }}>
                            <div style={{ color: darkMode ? '#fca5a5' : '#dc2626', fontWeight: 700 }}>{f}</div>
                            <div style={{ color: darkMode ? '#9ca3af' : '#991b1b', opacity: 0.8 }}>getByLabel('Email').fill(...)</div>
                        </div>
                    ))}
                </div>
            )
        }
        if (state === 'extract') {
            return (
                <div style={{ fontFamily: 'monospace', fontSize: 10.5, maxWidth: 260, textAlign: 'center' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 6 }}>{isTr ? 'Tekrar eden kod çıkarılıyor →' : 'Duplicated code extracted →'}</div>
                    <div style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${accent}`, background: `${accent}18`, color: accent, fontWeight: 700, boxShadow: `0 0 12px ${accent}44` }}>
                        📦 class LoginPage
                    </div>
                </div>
            )
        }
        const reuse = state === 'reuse' || state === 'change'
        return (
            <div style={{ fontFamily: 'monospace', fontSize: 10, maxWidth: 260 }}>
                <div style={{ padding: '8px 12px', borderRadius: 8, border: `2px solid ${state === 'change' ? '#f59e0b' : accent}`, background: state === 'change' ? '#fef3c722' : `${accent}15`, color: state === 'change' ? '#f59e0b' : accent, fontWeight: 700, textAlign: 'center', marginBottom: 8, transition: 'all 0.3s' }}>
                    📦 class LoginPage {state === 'change' && '✏️'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
                    {files.map((_, i) => <div key={i} style={{ color: accent, fontSize: 14 }}>↑</div>)}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {files.map((f, idx) => (
                        <div key={idx} style={{ flex: 1, padding: '5px 4px', borderRadius: 5, background: darkMode ? '#1f2937' : '#f0fdf4', border: '1px solid #10b98144', textAlign: 'center', fontSize: 8.5, color: '#10b981', fontWeight: 600 }}>
                            {f.split('.')[0]}
                        </div>
                    ))}
                </div>
                {state === 'change' && <div style={{ marginTop: 8, color: '#10b981', fontSize: 10, textAlign: 'center', fontWeight: 700 }}>✅ {isTr ? '3 dosyaya da DOKUNULMADI' : '3 files were NOT touched'}</div>}
            </div>
        )
    }

    const UiModeVisual = ({ state }) => {
        const steps = [
            { id: 'goto', label: "goto('/login')", st: ['run', 'timetravel', 'fail'].includes(state) ? 'pass' : 'pending' },
            { id: 'fill', label: "fill('Email')", st: ['run', 'timetravel', 'fail'].includes(state) ? 'pass' : 'pending' },
            { id: 'click', label: "click('Sign in')", st: state === 'fail' ? 'fail' : ['run', 'timetravel'].includes(state) ? 'active' : 'pending' },
        ]
        return (
            <div style={{ maxWidth: 280, borderRadius: 8, overflow: 'hidden', border: `1.5px solid ${darkMode ? '#374151' : '#1f2937'}`, background: '#0f172a', fontFamily: 'monospace' }}>
                <div style={{ background: '#1e293b', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: 9, color: '#94a3b8', marginLeft: 6 }}>Playwright — UI Mode</span>
                </div>
                <div style={{ padding: 10 }}>
                    {state === 'launch' && (
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>📂 login.spec.ts<br />📂 checkout.spec.ts<br /><span style={{ color: '#60a5fa' }}>▶ {isTr ? 'Test bekleniyor...' : 'Waiting to run a test...'}</span></div>
                    )}
                    {state !== 'launch' && (
                        <div>
                            <div style={{ fontSize: 9.5, color: '#60a5fa', marginBottom: 6 }}>▶ login.spec.ts &gt; successful login</div>
                            {steps.map((s, i) => (
                                <div key={i} onClick={() => {}} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', borderRadius: 4, marginBottom: 2, background: (state === 'timetravel' && s.id === 'fill') ? '#1e3a8a55' : 'transparent', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 10 }}>{s.st === 'pass' ? '✅' : s.st === 'fail' ? '❌' : s.st === 'active' ? '⏳' : '○'}</span>
                                    <code style={{ fontSize: 9.5, color: s.st === 'fail' ? '#f87171' : s.st === 'pass' ? '#86efac' : '#cbd5e1' }}>{s.label}</code>
                                </div>
                            ))}
                            {state === 'timetravel' && (
                                <div style={{ marginTop: 6, padding: 6, borderRadius: 5, background: '#1e293b', border: '1px solid #3b82f6', fontSize: 9, color: '#93c5fd' }}>
                                    📸 {isTr ? 'fill(\'Email\') anındaki DOM snapshot\'ı' : 'DOM snapshot at fill(\'Email\')'}
                                </div>
                            )}
                            {state === 'fail' && (
                                <div style={{ marginTop: 6, padding: 6, borderRadius: 5, background: '#450a0a', border: '1px solid #ef4444', fontSize: 9, color: '#fca5a5' }}>
                                    ✗ {isTr ? 'Beklenen: visible — Alınan: bulunamadı' : 'Expected: visible — Received: not found'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const CodegenFlowVisual = ({ state }) => {
        const lines = [
            { id: 'goto', text: "await page.goto('/login');", show: ['recording', 'assert', 'save'].includes(state) },
            { id: 'fill', text: "await page.getByLabel('Email').fill('user@example.com');", show: ['recording', 'assert', 'save'].includes(state) },
            { id: 'click', text: "await page.getByRole('button', { name: 'Sign in' }).click();", show: ['recording', 'assert', 'save'].includes(state) },
            { id: 'assert', text: "await expect(page.getByText('Welcome back')).toBeVisible();", show: ['assert', 'save'].includes(state) },
        ]
        return (
            <div style={{ maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'monospace' }}>
                <div style={{ borderRadius: 8, overflow: 'hidden', border: `1.5px solid ${darkMode ? '#374151' : '#1f2937'}` }}>
                    <div style={{ background: '#1e293b', padding: '4px 8px', fontSize: 8.5, color: '#94a3b8' }}>🌐 {isTr ? 'Gerçek Tarayıcı' : 'Real Browser'}</div>
                    <div style={{ background: darkMode ? '#0f172a' : '#f8fafc', padding: 8, fontSize: 9 }}>
                        <div style={{ color: accent, fontWeight: 700, marginBottom: 4 }}>example.com/login</div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <span style={{ padding: '3px 8px', borderRadius: 4, background: ['recording'].includes(state) ? `${accent}33` : 'transparent', border: `1px solid ${['recording'].includes(state) ? accent : 'transparent'}`, color: darkMode ? '#e5e7eb' : '#374151' }}>
                                {state === 'recording' ? '🖱️ Sign in' : state === 'assert' ? '✅ Welcome back' : 'Sign in'}
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ borderRadius: 8, overflow: 'hidden', border: '1.5px solid #1f2937', background: '#0f172a' }}>
                    <div style={{ background: '#1e293b', padding: '4px 8px', fontSize: 8.5, color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                        <span>🎭 Playwright Inspector</span>
                        <span style={{ color: state === 'launch' ? '#ef4444' : '#10b981' }}>{state === 'launch' ? '● record' : '● recording'}</span>
                    </div>
                    <div style={{ padding: 8, minHeight: 60 }}>
                        {state === 'launch' && <div style={{ fontSize: 9, color: '#64748b' }}>// {isTr ? 'Tıkla ve yazmaya başla...' : 'Click and start typing...'}</div>}
                        {lines.filter(l => l.show).map((l, i) => (
                            <div key={i} style={{ fontSize: 8.5, color: l.id === 'assert' ? '#c4b5fd' : '#86efac', marginBottom: 2, opacity: 1, animation: 'fadeIn 0.3s ease' }}>{l.text}</div>
                        ))}
                        {state === 'save' && <div style={{ marginTop: 6, fontSize: 9, color: '#fbbf24' }}>📋 {isTr ? 'Copy butonu tıklandı → panoya kopyalandı' : 'Copy button clicked → copied to clipboard'}</div>}
                    </div>
                </div>
            </div>
        )
    }

    const McpFlowVisual = ({ state }) => {
        const stages = ['prompt', 'tool-call', 'snapshot', 'result']
        const idx = stages.indexOf(state)
        return (
            <div style={{ maxWidth: 280, fontFamily: 'monospace', fontSize: 9.5 }}>
                <div style={{ padding: '6px 10px', borderRadius: 8, background: idx === 0 ? `${accent}22` : (darkMode ? '#1f2937' : '#f9fafb'), border: `1.5px solid ${idx >= 0 ? accent : (darkMode ? '#374151' : '#d1d5db')}`, marginBottom: 6, opacity: idx >= 0 ? 1 : 0.4 }}>
                    <div style={{ color: accent, fontWeight: 700, fontSize: 9 }}>💬 {isTr ? 'Kullanıcı' : 'User'}</div>
                    {idx === 0 && <div style={{ color: darkMode ? '#d1d5db' : '#374151', marginTop: 2 }}>{isTr ? '"example.com\'a git ve başlığı söyle"' : '"go to example.com and tell me the title"'}</div>}
                </div>
                <div style={{ textAlign: 'center', color: idx >= 1 ? accent : (darkMode ? '#4b5563' : '#cbd5e1'), marginBottom: 6 }}>↓</div>
                <div style={{ padding: '6px 10px', borderRadius: 8, background: idx === 1 ? '#f59e0b22' : (darkMode ? '#1f2937' : '#f9fafb'), border: `1.5px solid ${idx >= 1 ? '#f59e0b' : (darkMode ? '#374151' : '#d1d5db')}`, marginBottom: 6, opacity: idx >= 1 ? 1 : 0.4 }}>
                    <div style={{ color: idx >= 1 ? '#f59e0b' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, fontSize: 9 }}>🔌 MCP Server</div>
                    {idx === 1 && <div style={{ color: darkMode ? '#d1d5db' : '#374151', marginTop: 2 }}>browser_navigate({'{ url: "..." }'})</div>}
                    {idx === 2 && <div style={{ color: '#10b981', marginTop: 2 }}>browser_snapshot() →</div>}
                    {idx === 3 && <div style={{ color: darkMode ? '#d1d5db' : '#374151', marginTop: 2 }}>browser_click({'{ ref: "e2" }'})</div>}
                </div>
                <div style={{ textAlign: 'center', color: idx >= 2 ? '#10b981' : (darkMode ? '#4b5563' : '#cbd5e1'), marginBottom: 6 }}>↓</div>
                <div style={{ padding: '6px 10px', borderRadius: 8, background: idx === 2 ? '#10b98122' : (darkMode ? '#1f2937' : '#f9fafb'), border: `1.5px solid ${idx >= 2 ? '#10b981' : (darkMode ? '#374151' : '#d1d5db')}`, opacity: idx >= 2 ? 1 : 0.4 }}>
                    <div style={{ color: idx >= 2 ? '#10b981' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, fontSize: 9 }}>🌳 {isTr ? 'Accessibility Tree' : 'Accessibility Tree'}</div>
                    {idx >= 2 && (
                        <div style={{ color: darkMode ? '#d1d5db' : '#374151', marginTop: 2, fontSize: 8.5 }}>
                            - heading "Example Domain" [ref=e1]<br />- link "More info" [ref=e2]
                        </div>
                    )}
                </div>
                {state === 'result' && (
                    <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 8, background: `${accent}18`, border: `1.5px solid ${accent}`, color: accent, fontWeight: 700, textAlign: 'center', fontSize: 9.5 }}>
                        ✅ {isTr ? 'AI: "Başlık: Example Domain"' : 'AI: "Title: Example Domain"'}
                    </div>
                )}
            </div>
        )
    }

    const renderVisual = () => {
        const vs = step.visualState
        switch (block.concept) {
            case 'auto-wait': return <AutoWaitVisual state={vs} />
            case 'select-option': return <SelectOptionVisual state={vs} />
            case 'dialog': return <DialogVisual state={vs} />
            case 'frame-locator': return <FrameLocatorVisual state={vs} />
            case 'multi-page': return <MultiPageVisual state={vs} />
            case 'pw-actions': return <PwActionsVisual state={vs} />
            case 'evaluate': return <EvaluateVisual state={vs} />
            case 'browser-context': return <BrowserContextVisual state={vs} />
            case 'trace': return <TraceVisual state={vs} />
            case 'assertion-retry': return <AssertionRetryVisual state={vs} />
            case 'fixture-di': return <FixtureDiVisual state={vs} />
            case 'pom-flow': return <PomFlowVisual state={vs} />
            case 'ui-mode': return <UiModeVisual state={vs} />
            case 'codegen-flow': return <CodegenFlowVisual state={vs} />
            case 'mcp-flow': return <McpFlowVisual state={vs} />
            default: return null
        }
    }

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ boxShadow: `0 0 24px ${accent}22` }}>
            <div style={{ background: `linear-gradient(135deg, ${accent}, #818cf8)` }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon}</span>
                <span className="text-white font-bold text-sm md:text-base">{isTr ? block.title.tr : block.title.en}</span>
                <span className="ml-auto text-xs font-mono text-white/60">Playwright Java</span>
            </div>
            <div className={`flex overflow-x-auto gap-1 px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`} style={{ scrollbarWidth: 'none' }}>
                {block.steps.map((s, idx) => (
                    <button key={s.id} onClick={() => setActiveStep(idx)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${activeStep === idx ? 'text-white shadow-md scale-105' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`} style={activeStep === idx ? { background: accent } : {}}>
                        {isTr ? s.label : (s.labelEn || s.label)}
                    </button>
                ))}
            </div>
            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                <div className={`rounded-xl p-4 flex items-center justify-center min-h-[160px] ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`} style={{ border: `1px solid ${accent}44` }}>
                    {renderVisual()}
                </div>
                <div>
                    <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{isTr ? step.description.tr : step.description.en}</p>
                    <CodeBlock code={step.code} language="java" darkMode={darkMode} />
                    {step.tip && <div className={`mt-3 px-3 py-2 rounded-lg text-xs leading-relaxed ${darkMode ? 'bg-gray-800 text-yellow-300 border border-yellow-900' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>{isTr ? step.tip.tr : step.tip.en}</div>}
                </div>
            </div>
            <div className={`px-4 py-2 flex items-center justify-between border-t text-xs ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>← {isTr ? 'Önceki' : 'Prev'}</button>
                <span>{activeStep + 1} / {block.steps.length}</span>
                <button onClick={() => setActiveStep(Math.min(block.steps.length - 1, activeStep + 1))} disabled={activeStep === block.steps.length - 1} className="px-3 py-1 rounded disabled:opacity-30 hover:opacity-80 transition" style={{ background: accent, color: '#fff' }}>{isTr ? 'Sonraki' : 'Next'} →</button>
            </div>
        </div>
    )
}

// ─── AnimatedTimelineBlock ────────────────────────────────────────────────────

function AnimatedTimelineBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const [phase, setPhase] = useState('idle') // idle | going | done
    const timerRef = useRef(null)

    const tracks = block.tracks || []
    const maxDuration = Math.max(...tracks.map(t => t.duration), 1)
    const VISUAL_MS = 4200

    const title = block.title ? (isTr ? block.title.tr : block.title.en) : ''
    const description = block.description ? (isTr ? block.description.tr : block.description.en) : ''

    const play = () => {
        if (phase === 'going') return
        clearTimeout(timerRef.current)
        setPhase('idle')
        timerRef.current = setTimeout(() => {
            setPhase('going')
            timerRef.current = setTimeout(() => setPhase('done'), VISUAL_MS + 300)
        }, 80)
    }

    const reset = () => {
        clearTimeout(timerRef.current)
        setPhase('idle')
    }

    useEffect(() => () => clearTimeout(timerRef.current), [])

    const bg = darkMode ? '#1f2937' : '#f9fafb'
    const border = darkMode ? '#374151' : '#e5e7eb'
    const text = darkMode ? '#f3f4f6' : '#111827'
    const subtext = darkMode ? '#9ca3af' : '#6b7280'
    const trackBg = darkMode ? '#374151' : '#e5e7eb'

    return (
        <div style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
            {title && (
                <div style={{ fontWeight: 700, fontSize: 16, color: text, marginBottom: 6 }}>📊 {title}</div>
            )}
            {description && (
                <div style={{ fontSize: 13, color: subtext, marginBottom: 18, lineHeight: 1.6 }}>{description}</div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 22 }}>
                {tracks.map((track, i) => {
                    const visualDuration = Math.round((track.duration / maxDuration) * VISUAL_MS)
                    const atFull = phase === 'going' || phase === 'done'
                    const barWidth = phase === 'idle' ? '0%' : atFull ? '100%' : '0%'
                    const transStyle = phase === 'going'
                        ? `width ${visualDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                        : 'none'
                    const label = isTr ? (track.label || track.labelEn || '') : (track.labelEn || track.label || '')
                    const badge = track.badge ? (isTr ? track.badge.tr : track.badge.en) : ''
                    const detail = track.detail ? (isTr ? track.detail.tr : track.detail.en) : ''

                    return (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                                <span style={{ fontWeight: 600, fontSize: 13, color: text }}>{label}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: track.color, marginLeft: 8, flexShrink: 0 }}>
                                    {(track.duration / 1000).toFixed(1)}s
                                </span>
                            </div>
                            <div style={{ background: trackBg, borderRadius: 8, height: 30, overflow: 'hidden', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', top: 0, left: 0,
                                    height: '100%', width: barWidth,
                                    background: `linear-gradient(90deg, ${track.color}cc, ${track.color})`,
                                    borderRadius: 8,
                                    transition: transStyle,
                                    display: 'flex', alignItems: 'center', paddingLeft: 10,
                                }}>
                                    {(phase === 'done' || phase === 'going') && (
                                        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, opacity: 0.9, whiteSpace: 'nowrap' }}>
                                            {(track.duration / 1000).toFixed(1)}s
                                        </span>
                                    )}
                                </div>
                            </div>
                            {badge && (
                                <div style={{ fontSize: 11, color: subtext, marginTop: 4, lineHeight: 1.4 }}>
                                    {badge}
                                    {detail ? <span style={{ opacity: 0.75 }}> — {detail}</span> : null}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={play}
                    disabled={phase === 'going'}
                    style={{
                        padding: '8px 22px', borderRadius: 8, border: 'none',
                        background: phase === 'going' ? '#6b7280' : '#7c3aed',
                        color: '#fff', fontWeight: 700, fontSize: 13,
                        cursor: phase === 'going' ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                    }}
                >
                    {phase === 'going' ? (isTr ? '⏳ Çalışıyor...' : '⏳ Running...') : phase === 'done' ? (isTr ? '▶ Tekrar Oynat' : '▶ Play Again') : (isTr ? '▶ Oynat' : '▶ Play')}
                </button>
                {phase !== 'idle' && (
                    <button
                        onClick={reset}
                        style={{
                            padding: '8px 14px', borderRadius: 8,
                            border: `1.5px solid ${border}`,
                            background: 'transparent', color: text,
                            fontWeight: 600, fontSize: 13, cursor: 'pointer',
                        }}
                    >
                        {isTr ? '🔄 Sıfırla' : '🔄 Reset'}
                    </button>
                )}
                {phase === 'done' && (
                    <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>
                        ✅ {isTr ? 'Explicit Wait en hızlı bitti!' : 'Explicit Wait finished first!'}
                    </span>
                )}
            </div>
        </div>
    )
}

// ─── DragOrderBlock ───────────────────────────────────────────────────────────
// Drag-and-drop (or tap-to-swap, for touch) a scrambled list of command cards
// back into the order in `block.items` — used to teach command chaining hands-on.

function shuffleKeepingScrambled(items) {
    const arr = [...items]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    if (arr.length > 1 && arr.every((it, i) => it.id === items[i].id)) {
        [arr[0], arr[1]] = [arr[1], arr[0]]
    }
    return arr
}

function DragOrderBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const items = block.items || []
    const [order, setOrder] = useState(() => shuffleKeepingScrambled(items))
    const [selectedId, setSelectedId] = useState(null)
    const dragIdRef = useRef(null)
    const [checked, setChecked] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const title = block.title ? tx(block.title, language) : ''
    const instruction = block.instruction ? tx(block.instruction, language) : ''
    const accent = darkMode ? '#34d399' : '#059669'

    const swapIds = (idA, idB) => {
        if (idA === idB) return
        setOrder(prev => {
            const next = [...prev]
            const a = next.findIndex(it => it.id === idA)
            const b = next.findIndex(it => it.id === idB)
            if (a === -1 || b === -1) return prev
                ;[next[a], next[b]] = [next[b], next[a]]
            return next
        })
        setChecked(false)
    }

    const handleCardClick = (id) => {
        if (checked && isCorrect) return
        if (selectedId === null) { setSelectedId(id); return }
        if (selectedId === id) { setSelectedId(null); return }
        swapIds(selectedId, id)
        setSelectedId(null)
    }

    const handleCheck = () => {
        const correct = order.every((it, i) => it.id === items[i]?.id)
        setIsCorrect(correct)
        setChecked(true)
    }

    const handleShuffle = () => {
        setOrder(shuffleKeepingScrambled(items))
        setChecked(false)
        setIsCorrect(false)
        setSelectedId(null)
    }

    return (
        <div className={`mt-6 rounded-xl border-2 overflow-hidden ${darkMode ? 'border-emerald-700/60 bg-gray-900' : 'border-emerald-300 bg-emerald-50/40'}`}>
            <div className={`px-4 py-3 flex items-center gap-3 ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
                <span className="text-2xl flex-shrink-0">🧩</span>
                <div>
                    <div className={`font-bold text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {title || (isTr ? 'Komutları Doğru Sıraya Diz' : 'Drag the Commands Into Order')}
                    </div>
                    <div className={`text-xs mt-0.5 ${darkMode ? 'text-emerald-400/70' : 'text-emerald-700/80'}`}>
                        {instruction || (isTr ? 'Kartları sürükle bırak ya da sırayla iki karta dokunarak yer değiştir.' : 'Drag and drop the cards, or tap two cards one after another to swap them.')}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-2">
                {order.map((it, idx) => {
                    const correctHere = checked && it.id === items[idx]?.id
                    const wrongHere = checked && it.id !== items[idx]?.id
                    const isSelected = selectedId === it.id
                    return (
                        <div
                            key={it.id}
                            draggable
                            onDragStart={() => { dragIdRef.current = it.id }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); if (dragIdRef.current) swapIds(dragIdRef.current, it.id); dragIdRef.current = null }}
                            onClick={() => handleCardClick(it.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(it.id) } }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                minHeight: 48, padding: '10px 14px', borderRadius: 10,
                                cursor: 'grab', userSelect: 'none',
                                border: `2px solid ${correctHere ? '#10b981' : wrongHere ? '#ef4444' : isSelected ? accent : (darkMode ? '#374151' : '#d1d5db')}`,
                                background: correctHere ? (darkMode ? '#10b98122' : '#ecfdf5') : wrongHere ? (darkMode ? '#ef444422' : '#fef2f2') : isSelected ? `${accent}22` : (darkMode ? '#1f2937' : '#ffffff'),
                                transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                                boxShadow: isSelected ? `0 0 0 3px ${accent}33` : 'none',
                            }}
                        >
                            <span style={{ fontSize: 16, opacity: 0.5 }}>⠿</span>
                            <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{idx + 1}</span>
                            <code className={`text-xs md:text-sm font-mono flex-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{it.code}</code>
                            {it.label && <span className={`text-xs hidden md:block ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tx(it.label, language)}</span>}
                            {correctHere && <span className="text-emerald-500 flex-shrink-0">✓</span>}
                            {wrongHere && <span className="text-red-500 flex-shrink-0">✗</span>}
                        </div>
                    )
                })}
            </div>

            <div className="px-4 pb-4 flex flex-wrap items-center gap-3">
                <button onClick={handleCheck} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-transform active:scale-95" style={{ background: accent, minHeight: 40 }}>
                    ✅ {isTr ? 'Sırayı Kontrol Et' : 'Check Order'}
                </button>
                <button onClick={handleShuffle} className={`px-4 py-2.5 rounded-lg text-sm font-semibold border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`} style={{ minHeight: 40 }}>
                    🔀 {isTr ? 'Karıştır' : 'Shuffle'}
                </button>
                {checked && (
                    <span className={`text-sm font-bold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                        {isCorrect
                            ? (isTr ? '🎉 Doğru! Tam bir Cypress testi kurdun.' : '🎉 Correct! You just assembled a full Cypress test.')
                            : (isTr ? '❌ Sıra yanlış — kırmızı kartları tekrar dene.' : '❌ Order is wrong — retry the red cards.')}
                    </span>
                )}
            </div>

            {checked && isCorrect && block.successCode && (
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`px-4 py-2 text-xs font-semibold ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                        💻 {isTr ? 'Tamamlanan Test' : 'Completed Test'}
                    </div>
                    <CodeBlock code={block.successCode} language="javascript" darkMode={darkMode} />
                </div>
            )}
        </div>
    )
}

// ─── GitPracticeBlock ────────────────────────────────────────────────────────

function GitPracticeBlock({ block, darkMode, language }) {
    const starter = tx(block.starterCommands || block.defaultCommands || '', language)
    const [commands, setCommands] = useState(starter)
    const [result, setResult] = useState(null)

    useEffect(() => {
        setCommands(starter)
        setResult(null)
    }, [starter])

    const normalizeLine = (line) => line
        .trim()
        .replace(/^\$\s*/, '')
        .replace(/\s+/g, ' ')

    const runCheck = () => {
        const lines = commands
            .split(/\r?\n/)
            .map(normalizeLine)
            .filter(line => line && !line.startsWith('#') && !line.startsWith('//'))

        const expected = block.expectedSteps || []
        let searchStart = 0
        const checks = expected.map((step) => {
            const re = new RegExp(step.pattern, 'i')
            const foundIndex = lines.findIndex((line, idx) => idx >= searchStart && re.test(line))
            const ok = foundIndex !== -1
            if (ok) searchStart = foundIndex + 1
            return {
                label: tx(step.label, language),
                ok,
                example: step.example,
            }
        })

        const dangerPatterns = block.dangerousPatterns || [
            { pattern: '\\bgit\\s+reset\\s+--hard\\b', label: { tr: 'git reset --hard çalışma alanındaki kaydedilmemiş değişiklikleri siler.', en: 'git reset --hard discards uncommitted work in the working tree.' } },
            { pattern: '\\bgit\\s+push\\s+--force\\b', label: { tr: 'git push --force ortak branch geçmişini ezebilir; işte --force-with-lease tercih edilir.', en: 'git push --force can overwrite shared history; prefer --force-with-lease at work.' } },
            { pattern: '\\bgit\\s+clean\\s+-f', label: { tr: 'git clean -f untracked dosyaları siler; önce git clean -n ile prova yap.', en: 'git clean -f deletes untracked files; preview with git clean -n first.' } },
        ]
        const warnings = []
        lines.forEach((line, index) => {
            dangerPatterns.forEach(item => {
                if (new RegExp(item.pattern, 'i').test(line)) {
                    warnings.push(`${language === 'tr' ? 'Satır' : 'Line'} ${index + 1}: ${tx(item.label, language)}`)
                }
            })
        })

        const missing = checks.filter(check => !check.ok)
        setResult({
            ok: missing.length === 0,
            checks,
            warnings,
            output: missing.length === 0
                ? tx(block.successOutput, language)
                : tx(block.retryOutput, language),
        })
    }

    const title = tx(block.title, language) || (language === 'tr' ? 'Kendin Dene' : 'Try It Yourself')
    const intro = tx(block.intro, language)

    return (
        <div className={`mt-5 rounded-xl border overflow-hidden ${darkMode ? 'border-emerald-700 bg-gray-900' : 'border-emerald-200 bg-white'}`}>
            <div className={`px-4 py-3 flex flex-wrap items-center gap-3 ${darkMode ? 'bg-emerald-950/60' : 'bg-emerald-50'}`}>
                <span className="text-xl">{block.icon || '🔀'}</span>
                <div className="min-w-0 flex-1">
                    <div className={`text-sm font-bold ${darkMode ? 'text-emerald-200' : 'text-emerald-900'}`}>{title}</div>
                    {intro && <div className={`text-xs mt-0.5 ${darkMode ? 'text-emerald-300/80' : 'text-emerald-700'}`}>{intro}</div>}
                </div>
                <button
                    onClick={runCheck}
                    className="rounded-md px-3 py-1.5 text-xs font-bold"
                    style={{ background: '#059669', color: '#fff', minHeight: 36 }}
                >
                    {language === 'tr' ? '▶ Komutları Kontrol Et' : '▶ Check Commands'}
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
                <textarea
                    value={commands}
                    onChange={e => setCommands(e.target.value)}
                    spellCheck={false}
                    style={{ minHeight: block.height || 250, background: '#0f172a', color: '#bbf7d0', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.65, border: 'none', outline: 'none', resize: 'vertical', padding: '16px', boxSizing: 'border-box' }}
                />
                <div className={`p-4 border-t lg:border-t-0 lg:border-l ${darkMode ? 'border-gray-700 bg-gray-950' : 'border-emerald-100 bg-emerald-50/50'}`}>
                    {!result && (
                        <div className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {tx(block.help, language) || (language === 'tr'
                                ? 'Komutları gerçek terminalde çalıştırmadan önce burada sıraya koy. Bu alan repo değiştirmez; sadece akışı kontrol eder.'
                                : 'Arrange the commands here before running them in a real terminal. This area does not change a repository; it only checks the flow.')}
                        </div>
                    )}
                    {result && (
                        <div className="space-y-3">
                            <div className={`rounded-lg border p-3 text-sm font-bold ${result.ok ? (darkMode ? 'border-green-700 bg-green-950/30 text-green-200' : 'border-green-300 bg-green-50 text-green-800') : (darkMode ? 'border-red-700 bg-red-950/30 text-red-200' : 'border-red-300 bg-red-50 text-red-800')}`}>
                                {result.ok ? (language === 'tr' ? '✅ Akış iş hayatı için güvenli görünüyor' : '✅ Flow looks safe for real work') : (language === 'tr' ? '❌ Sırada eksik veya hatalı adımlar var' : '❌ Some required steps are missing or out of order')}
                            </div>
                            <div className="space-y-1">
                                {result.checks.map((check, idx) => (
                                    <div key={idx} className={`text-xs ${check.ok ? (darkMode ? 'text-green-300' : 'text-green-700') : (darkMode ? 'text-red-300' : 'text-red-700')}`}>
                                        {check.ok ? '✓' : '×'} {check.label}
                                        {!check.ok && check.example && <span className="font-mono opacity-70"> — {check.example}</span>}
                                    </div>
                                ))}
                            </div>
                            {result.warnings.map((warning, idx) => (
                                <div key={idx} className={`text-xs rounded-md px-3 py-2 ${darkMode ? 'bg-yellow-950/40 text-yellow-200' : 'bg-yellow-50 text-yellow-800'}`}>⚠️ {warning}</div>
                            ))}
                            <div>
                                <div className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Terminal Preview</div>
                                <pre className={`rounded-lg p-3 text-xs min-h-[74px] whitespace-pre-wrap ${darkMode ? 'bg-black text-green-300' : 'bg-slate-900 text-green-300'}`}>{result.output || (language === 'tr' ? 'Komut akışı kontrol edildi.' : 'Command flow checked.')}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── SimulationBlock ──────────────────────────────────────────────────────────

function SimulationBlock({ block, darkMode, language }) {
    const [simState, setSimState] = useState('idle')
    const [isRunning, setIsRunning] = useState(false)
    const isTr = language === 'tr'
    const accent = block.color || '#7c3aed'
    const timersRef = useRef([])

    const resetSim = () => {
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        setIsRunning(false)
        setSimState('idle')
    }

    const runSteps = (steps) => {
        if (isRunning) return
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        setIsRunning(true)
        setSimState('idle')
        let cumDelay = 0
        steps.forEach(([state, delay], idx) => {
            cumDelay += delay
            const t = setTimeout(() => {
                setSimState(state)
                if (idx === steps.length - 1) setIsRunning(false)
            }, cumDelay)
            timersRef.current.push(t)
        })
    }

    const renderJavaCompileRunPlayground = () => {
        const s = simState
        const order = ['idle', 'source', 'compile', 'bytecode', 'jvm', 'output']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'output'
        const isActive = (key) => order.indexOf(key) === cur
        const isDone = (key) => order.indexOf(key) < cur && s !== 'idle'
        const steps = [
            { key: 'source', label: 'Main.java', desc: isTr ? 'İnsan diline yakın kaynak kod' : 'Human-readable source code', icon: '📝' },
            { key: 'compile', label: 'javac', desc: isTr ? 'Compiler syntax kontrol eder' : 'Compiler checks syntax', icon: '⚙️' },
            { key: 'bytecode', label: 'Main.class', desc: isTr ? 'JVM için bytecode' : 'Bytecode for JVM', icon: '🔢' },
            { key: 'jvm', label: 'JVM', desc: isTr ? 'İşletim sisteminde çalıştırır' : 'Runs on the operating system', icon: '☕' },
            { key: 'output', label: 'Console', desc: isTr ? 'Sonuç görünür' : 'Result appears', icon: '🖥️' },
        ]
        const terminalLines = [
            { show: cur >= 1, text: '$ javac Main.java', color: '#f59e0b' },
            { show: cur >= 2, text: isTr ? '✓ syntax OK, bytecode üretiliyor...' : '✓ syntax OK, generating bytecode...', color: '#22c55e' },
            { show: cur >= 3, text: '$ java Main', color: '#f59e0b' },
            { show: cur >= 4, text: isTr ? 'JVM bytecode okuyup işletim sistemine uygun çalıştırıyor...' : 'JVM reads bytecode and runs it for this OS...', color: '#38bdf8' },
            { show: cur >= 5, text: isTr ? 'Merhaba QA!' : 'Hello QA!', color: '#22c55e' },
        ]

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 360 }}>
                <div style={{ background: '#111827', color: '#e5e7eb', borderRadius: 12, overflow: 'hidden', border: '1px solid #374151' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#1f2937', borderBottom: '1px solid #374151' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#ef4444' }} />
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#f59e0b' }} />
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#22c55e' }} />
                        <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700 }}>Java Lab</span>
                        <button
                            onClick={() => canStart && runSteps([['source', 120], ['compile', 650], ['bytecode', 650], ['jvm', 650], ['output', 650]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 800, color: '#111827', background: canStart ? '#fbbf24' : '#6b7280', cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? '▶ javac + java' : s === 'output' ? (isTr ? '▶ tekrar çalıştır' : '▶ run again') : (isTr ? '⏳ çalışıyor' : '⏳ running')}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                        {steps.map((step, i) => (
                            <div key={step.key} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 8, alignItems: 'center' }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: isActive(step.key) ? '#f97316' : isDone(step.key) ? '#166534' : '#374151', boxShadow: isActive(step.key) ? '0 0 16px rgba(249,115,22,0.65)' : 'none', transition: 'all .35s' }} className={isActive(step.key) ? 'sim-animate' : ''}>
                                    {isDone(step.key) ? '✓' : step.icon}
                                </div>
                                <div style={{ border: `1px solid ${isActive(step.key) ? '#fb923c' : '#374151'}`, background: isActive(step.key) ? '#431407' : '#111827', borderRadius: 8, padding: '7px 9px', transition: 'all .35s' }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: isActive(step.key) ? '#fed7aa' : '#f9fafb' }}>{step.label}</div>
                                    <div style={{ fontSize: 10, color: '#9ca3af' }}>{step.desc}</div>
                                </div>
                                {i < steps.length - 1 && <div style={{ gridColumn: '1 / 2', width: 2, height: 10, background: isDone(steps[i + 1].key) || isActive(steps[i + 1].key) ? '#f97316' : '#374151', margin: '-2px auto' }} />}
                            </div>
                        ))}
                    </div>
                    <div style={{ background: '#020617', padding: '9px 12px', minHeight: 92, borderTop: '1px solid #374151', fontFamily: 'JetBrains Mono, monospace' }}>
                        {s === 'idle' && <div style={{ color: '#64748b', fontSize: 11 }}>{isTr ? 'Komutları görmek için çalıştır.' : 'Run to watch the commands.'}</div>}
                        {terminalLines.map((line, i) => line.show ? (
                            <div key={i} style={{ color: line.color, fontSize: 10.5, lineHeight: 1.7, animation: 'simFadeUp .25s ease-out' }}>{line.text}</div>
                        ) : null)}
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #374151', background: '#111827', color: '#9ca3af', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderJavaMemoryPlayground = () => {
        const s = simState
        const order = ['idle', 'declare', 'primitive', 'reference', 'heap', 'update', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const active = (key) => order.indexOf(key) === cur
        const done = (key) => order.indexOf(key) < cur && s !== 'idle'
        const lineColor = (key) => active(key) ? '#fbbf24' : done(key) ? '#86efac' : '#64748b'

        return (
            <div style={{ maxWidth: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🧠</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>Stack / Heap Watch</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'Variable bellekte nereye gider?' : 'Where does each variable live?'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['declare', 100], ['primitive', 650], ['reference', 700], ['heap', 700], ['update', 700], ['done', 500]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#22c55e' : '#475569', color: '#052e16', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? '▶ allocate' : s === 'done' ? '▶ again' : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 10 }}>
                        <div style={{ border: '1px solid #475569', borderRadius: 10, padding: 8, background: '#020617' }}>
                            <div style={{ color: '#93c5fd', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>STACK</div>
                            <div style={{ color: lineColor('primitive'), fontFamily: 'JetBrains Mono, monospace', fontSize: 10, marginBottom: 6 }}>int score = {done('update') || active('update') || s === 'done' ? '80' : done('primitive') || active('primitive') ? '75' : '...'}</div>
                            <div style={{ color: lineColor('reference'), fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>String name → {done('reference') || active('reference') || cur >= 3 ? '#A1' : '...'}</div>
                        </div>
                        <div style={{ border: '1px solid #475569', borderRadius: 10, padding: 8, background: '#020617' }}>
                            <div style={{ color: '#fdba74', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>HEAP</div>
                            <div style={{ minHeight: 44, border: `1px dashed ${done('heap') || active('heap') || cur >= 4 ? '#fb923c' : '#334155'}`, borderRadius: 8, padding: 7, color: done('heap') || active('heap') || cur >= 4 ? '#fed7aa' : '#475569', fontSize: 10, transition: 'all .35s' }}>
                                #A1: "admin"
                                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3 }}>{isTr ? 'String object burada saklanır' : 'String object lives here'}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '0 10px 10px', fontFamily: 'JetBrains Mono, monospace' }}>
                        {[
                            ['declare', 'int score; String name;'],
                            ['primitive', 'score = 75;        // value stack içinde'],
                            ['reference', 'name = "admin";    // reference stack içinde'],
                            ['heap', '"admin" object heap içinde oluşur'],
                            ['update', 'score = score + 5;   // stack value değişir'],
                        ].map(([key, text]) => (
                            <div key={key} style={{ color: lineColor(key), fontSize: 10, lineHeight: 1.7 }}>{active(key) ? '➜ ' : done(key) ? '✓ ' : '  '}{text}</div>
                        ))}
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderJavaBranchPlayground = () => {
        const s = simState
        const order = ['idle', 'input', 'scanner', 'compare90', 'compare80', 'compare70', 'output']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'output'
        const active = (key) => order.indexOf(key) === cur
        const passed = (key) => order.indexOf(key) < cur && s !== 'idle'
        const rows = [
            { key: 'compare90', text: 'score >= 90', result: 'false' },
            { key: 'compare80', text: 'score >= 80', result: 'false' },
            { key: 'compare70', text: 'score >= 70', result: 'true', hit: true },
        ]

        return (
            <div style={{ maxWidth: 360, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, border: '1px solid #334155', overflow: 'hidden', background: '#0f172a' }}>
                    <div style={{ padding: '9px 10px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔀</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>if/else Decision Runner</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>score = 75</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['input', 100], ['scanner', 600], ['compare90', 650], ['compare80', 650], ['compare70', 650], ['output', 600]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#38bdf8' : '#475569', color: '#082f49', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ karar ver' : '▶ decide') : s === 'output' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '82px 1fr', gap: 8, marginBottom: 10 }}>
                            <div style={{ borderRadius: 10, background: active('input') || passed('input') ? '#0e7490' : '#1e293b', color: '#cffafe', padding: 8, textAlign: 'center', fontSize: 11, fontWeight: 800, transition: 'all .35s' }}>{isTr ? 'Input' : 'Input'}<br /><span style={{ fontFamily: 'JetBrains Mono, monospace' }}>75</span></div>
                            <div style={{ borderRadius: 10, background: active('scanner') || passed('scanner') ? '#155e75' : '#1e293b', color: '#cffafe', padding: 8, fontSize: 11, transition: 'all .35s' }}>
                                <b>Scanner</b><br /><span style={{ color: '#94a3b8' }}>{isTr ? 'metni int score değişkenine koyar' : 'puts the value into int score'}</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: 7 }}>
                            {rows.map(row => {
                                const rowDone = passed(row.key) || active(row.key) || (row.hit && s === 'output')
                                const color = row.hit && rowDone ? '#22c55e' : rowDone ? '#ef4444' : '#475569'
                                return (
                                    <div key={row.key} style={{ display: 'grid', gridTemplateColumns: '1fr 56px', gap: 7, alignItems: 'center' }}>
                                        <div style={{ border: `1px solid ${active(row.key) ? color : '#334155'}`, background: active(row.key) ? `${color}22` : '#020617', color: rowDone ? '#f8fafc' : '#64748b', borderRadius: 8, padding: '7px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                                            {row.text}
                                        </div>
                                        <div style={{ borderRadius: 8, background: rowDone ? color : '#1e293b', color: rowDone ? '#fff' : '#64748b', textAlign: 'center', padding: '7px 0', fontSize: 10, fontWeight: 800 }}>{rowDone ? row.result : '?'}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, borderRadius: 10, background: s === 'output' ? '#052e16' : '#020617', border: `1px solid ${s === 'output' ? '#22c55e' : '#334155'}`, padding: 9, color: s === 'output' ? '#86efac' : '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', transition: 'all .35s' }}>
                            {s === 'output' ? 'System.out.println("BB");' : isTr ? 'Çıktı bekleniyor...' : 'Waiting for output...'}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderJavaJavacWorkshopPlayground = () => {
        const s = simState
        const order = ['idle', 'folder', 'file', 'compile', 'classfile', 'run', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const isActive = key => order.indexOf(key) === cur
        const isDone = key => order.indexOf(key) < cur && s !== 'idle'
        const files = [
            { key: 'file', name: 'Main.java', icon: '☕', color: '#f97316' },
            { key: 'classfile', name: 'Main.class', icon: '🔢', color: '#22c55e' },
        ]
        const terminal = [
            ['folder', 'mkdir java-lab', '#38bdf8'],
            ['folder', 'cd java-lab', '#38bdf8'],
            ['file', 'notepad Main.java', '#fbbf24'],
            ['compile', 'javac Main.java', '#f97316'],
            ['classfile', isTr ? 'dir  →  Main.java  Main.class' : 'ls  →  Main.java  Main.class', '#22c55e'],
            ['run', 'java Main', '#a78bfa'],
            ['done', isTr ? 'Merhaba Java!' : 'Hello Java!', '#22c55e'],
        ]
        return (
            <div style={{ maxWidth: 380, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🧪</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>Terminal javac lab</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>Main.java → javac → Main.class → java Main</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['folder', 150], ['file', 750], ['compile', 900], ['classfile', 700], ['run', 750], ['done', 550]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#f97316' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ javac atölyesi' : '▶ javac workshop') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 11, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {files.map(file => {
                                const visible = isDone(file.key) || isActive(file.key) || (file.key === 'classfile' && cur >= order.indexOf('classfile'))
                                return (
                                    <div key={file.key} style={{ border: `1px solid ${visible ? file.color : '#334155'}`, borderRadius: 10, padding: 10, background: visible ? `${file.color}18` : '#020617', color: visible ? '#f8fafc' : '#64748b', minHeight: 72, transition: 'all .35s' }}>
                                        <div style={{ fontSize: 22 }}>{visible ? file.icon : '◻'}</div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 800 }}>{file.name}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9 }}>{file.key === 'file' ? (isTr ? 'sen yazarsın' : 'you write it') : (isTr ? 'compiler üretir' : 'compiler creates it')}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 126, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Başlatınca komutları sırayla izle.' : 'Start to watch each command.'}</div>}
                            {terminal.map(([state, text, color], i) => {
                                const show = order.indexOf(state) <= cur && s !== 'idle'
                                return show ? <div key={i} style={{ color, fontSize: 10.5, lineHeight: 1.75, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div> : null
                            })}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderJavaIntellijProjectPlayground = () => {
        const s = simState
        const order = ['idle', 'download', 'newProject', 'sdk', 'src', 'class', 'main', 'run', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const tree = [
            ['newProject', 'java-first-project'],
            ['src', 'src'],
            ['class', 'Main.java'],
            ['main', 'main(String[] args)'],
        ]
        return (
            <div style={{ maxWidth: 390, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#1e1f22' }}>
                    <div style={{ padding: '8px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#2b2d30', borderBottom: '1px solid #3f4248' }}>
                        <span style={{ fontSize: 17 }}>🧠</span>
                        <div>
                            <div style={{ color: '#f4f4f5', fontSize: 12, fontWeight: 800 }}>IntelliJ IDEA first project</div>
                            <div style={{ color: '#9ca3af', fontSize: 10 }}>{isTr ? 'New Project → Class → main → Run' : 'New Project → Class → main → Run'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['download', 150], ['newProject', 800], ['sdk', 700], ['src', 650], ['class', 650], ['main', 700], ['run', 700], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#7c3aed' : '#4b5563', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ IDE akışı' : '▶ IDE flow') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '115px 1fr', minHeight: 210 }}>
                        <div style={{ borderRight: '1px solid #3f4248', padding: 9, background: '#25272b' }}>
                            <div style={{ color: '#9ca3af', fontSize: 9, fontWeight: 800, marginBottom: 8 }}>PROJECT</div>
                            {tree.map(([key, label], i) => {
                                const visible = done(key) || active(key) || (key === 'main' && cur >= order.indexOf('main'))
                                return visible ? (
                                    <div key={key} style={{ paddingLeft: i * 10, color: active(key) ? '#c4b5fd' : '#d1d5db', fontSize: 10, lineHeight: 1.9, fontFamily: 'JetBrains Mono, monospace' }}>
                                        {i === 0 ? '▾' : i === 3 ? '  ' : '▸'} {label}
                                    </div>
                                ) : null
                            })}
                        </div>
                        <div style={{ padding: 10 }}>
                            <div style={{ display: 'grid', gap: 7 }}>
                                {[
                                    ['download', isTr ? 'IntelliJ IDEA indir ve kur' : 'Download and install IntelliJ IDEA'],
                                    ['newProject', isTr ? 'New Project: java-first-project' : 'New Project: java-first-project'],
                                    ['sdk', isTr ? 'JDK 21 seçili mi kontrol et' : 'Check that JDK 21 is selected'],
                                    ['src', isTr ? 'src klasörünü aç' : 'Open the src folder'],
                                    ['class', isTr ? 'New Java Class: Main' : 'New Java Class: Main'],
                                    ['main', isTr ? 'main method yaz veya psvm kısayolunu kullan' : 'Write main method or use the psvm shortcut'],
                                    ['run', isTr ? 'Yeşil Run butonuna bas' : 'Click the green Run button'],
                                    ['done', isTr ? 'Console output göründü' : 'Console output appears'],
                                ].map(([key, label], i) => {
                                    const isA = active(key)
                                    const isD = done(key) || (key === 'done' && s === 'done')
                                    return (
                                        <div key={key} style={{ border: `1px solid ${isA ? '#a78bfa' : isD ? '#22c55e' : '#3f4248'}`, background: isA ? '#4c1d951f' : '#111827', borderRadius: 8, padding: '7px 9px', color: isD ? '#bbf7d0' : isA ? '#ddd6fe' : '#6b7280', fontSize: 10.5, transition: 'all .35s' }}>
                                            {isD ? '✓' : isA ? '→' : i + 1} {label}
                                        </div>
                                    )
                                })}
                            </div>
                            <div style={{ marginTop: 9, borderRadius: 8, background: '#0b1020', padding: 8, minHeight: 42, color: s === 'done' ? '#86efac' : '#64748b', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                                {s === 'done' ? (isTr ? 'Merhaba IntelliJ!' : 'Hello IntelliJ!') : isTr ? 'Console bekliyor...' : 'Console waiting...'}
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #3f4248', background: '#2b2d30', color: '#9ca3af', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderJavaMavenLifecyclePlayground = () => {
        const s = simState
        const order = ['idle', 'pom', 'compile', 'test', 'package', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const phases = [
            ['pom', 'pom.xml', isTr ? 'bağımlılık planı okunur' : 'dependency plan is read'],
            ['compile', 'compile', isTr ? 'src/main/java derlenir' : 'src/main/java is compiled'],
            ['test', 'test', isTr ? 'JUnit testleri çalışır' : 'JUnit tests run'],
            ['package', 'package', isTr ? 'target/*.jar üretilir' : 'target/*.jar is created'],
        ]
        return (
            <div style={{ maxWidth: 380, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📦</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>Maven lifecycle</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>mvn test / mvn package</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['pom', 150], ['compile', 750], ['test', 900], ['package', 750], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#2563eb' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? '▶ mvn package' : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 11 }}>
                            {phases.map(([key, label], i) => {
                                const idx = order.indexOf(key)
                                const isD = idx < cur && s !== 'idle'
                                const isA = idx === cur
                                return (
                                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <div style={{ width: 58, minHeight: 58, borderRadius: 12, display: 'grid', placeItems: 'center', textAlign: 'center', border: `2px solid ${isD ? '#22c55e' : isA ? '#60a5fa' : '#334155'}`, background: isD ? '#052e16' : isA ? '#1e3a8a55' : '#020617', color: isD ? '#86efac' : isA ? '#bfdbfe' : '#64748b', fontSize: 9.5, fontWeight: 800, transition: 'all .35s' }}>
                                            {isD ? '✓ ' : isA ? '⏳ ' : ''}{label}
                                        </div>
                                        {i < phases.length - 1 && <div style={{ width: 12, height: 2, background: order.indexOf(phases[i + 1][0]) <= cur ? '#22c55e' : '#334155' }} />}
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 96, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>$ mvn package</div>}
                            {phases.map(([key, label, desc]) => order.indexOf(key) <= cur && s !== 'idle' ? (
                                <div key={key} style={{ color: order.indexOf(key) === cur ? '#60a5fa' : '#22c55e', fontSize: 10.5, lineHeight: 1.75 }}>
                                    [{label}] {desc} {order.indexOf(key) < cur ? '✓' : '...'}
                                </div>
                            ) : null)}
                            {s === 'done' && <div style={{ color: '#22c55e', fontSize: 10.5, lineHeight: 1.75 }}>BUILD SUCCESS → target/java-first-project.jar</div>}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitSnapshotStoryPlayground = () => {
        const s = simState
        const order = ['idle', 'folder', 'change', 'snapshot', 'compare', 'restore']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'restore'
        const visible = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const snapshots = [
            ['v1', isTr ? 'Sabah' : 'Morning', 'Login test OK', '#22c55e'],
            ['v2', isTr ? 'Öğlen' : 'Noon', isTr ? 'Yeni assertion' : 'New assertion', '#38bdf8'],
            ['v3', isTr ? 'Akşam' : 'Evening', isTr ? 'Hata bulundu' : 'Bug found', '#f97316'],
        ]
        return (
            <div style={{ maxWidth: 400, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📸</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Git = proje hafızası' : 'Git = project memory'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'klasör → değişiklik → snapshot → geri dönüş' : 'folder → change → snapshot → restore'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['folder', 150], ['change', 750], ['snapshot', 800], ['compare', 850], ['restore', 750]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#059669' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ hikayeyi oynat' : '▶ play story') : s === 'restore' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 34px 1fr', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ border: `1px solid ${visible('folder') ? '#34d399' : '#334155'}`, background: visible('folder') ? '#064e3b55' : '#020617', borderRadius: 10, padding: 10, minHeight: 96, color: visible('folder') ? '#d1fae5' : '#64748b', transition: 'all .35s' }}>
                                <div style={{ fontSize: 22 }}>📁</div>
                                <div style={{ fontSize: 11, fontWeight: 800 }}>qa-project</div>
                                <div style={{ fontSize: 9, lineHeight: 1.7, fontFamily: 'JetBrains Mono, monospace' }}>
                                    <div>login.spec.js</div>
                                    <div>README.md</div>
                                    <div>{visible('change') ? (isTr ? '+ yeni kontrol' : '+ new check') : isTr ? 'dosyalar hazır' : 'files ready'}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', color: active('snapshot') ? '#34d399' : '#64748b', fontSize: 22 }} className={active('snapshot') ? 'sim-animate' : ''}>→</div>
                            <div style={{ border: `1px solid ${visible('snapshot') ? '#38bdf8' : '#334155'}`, background: visible('snapshot') ? '#082f4955' : '#020617', borderRadius: 10, padding: 10, minHeight: 96, transition: 'all .35s' }}>
                                <div style={{ color: visible('snapshot') ? '#bae6fd' : '#64748b', fontSize: 11, fontWeight: 800 }}>{isTr ? 'Snapshot rafı' : 'Snapshot shelf'}</div>
                                <div style={{ display: 'grid', gap: 5, marginTop: 8 }}>
                                    {snapshots.map(([key, label, text, color], idx) => {
                                        const show = visible('snapshot') && (idx === 0 || cur >= order.indexOf('compare') || (idx === 1 && cur >= order.indexOf('snapshot')))
                                        return (
                                            <div key={key} style={{ border: `1px solid ${show ? color : '#334155'}`, background: show ? `${color}22` : '#0f172a', borderRadius: 7, padding: '5px 7px', color: show ? '#f8fafc' : '#475569', fontSize: 9.5, transition: 'all .35s' }}>
                                                <strong>{label}</strong> · {show ? text : '---'}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${visible('compare') ? '#fbbf24' : '#334155'}`, background: visible('compare') ? '#451a0355' : '#020617', borderRadius: 9, padding: 9, color: visible('compare') ? '#fde68a' : '#64748b' }}>
                                <div style={{ fontSize: 10, fontWeight: 800 }}>{isTr ? 'Karşılaştır' : 'Compare'}</div>
                                <div style={{ fontSize: 9, marginTop: 4 }}>{isTr ? 'Ne değiştiğini yan yana görürsün.' : 'You see what changed side by side.'}</div>
                            </div>
                            <div style={{ border: `1px solid ${visible('restore') ? '#22c55e' : '#334155'}`, background: visible('restore') ? '#052e1655' : '#020617', borderRadius: 9, padding: 9, color: visible('restore') ? '#bbf7d0' : '#64748b' }}>
                                <div style={{ fontSize: 10, fontWeight: 800 }}>{isTr ? 'Geri dönebil' : 'Restore safely'}</div>
                                <div style={{ fontSize: 9, marginTop: 4 }}>{isTr ? 'Bozulan yolu eski güvenli noktadan anlarsın.' : 'You can reason from an older safe point.'}</div>
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubCollaborationPlayground = () => {
        const s = simState
        const order = ['idle', 'local', 'upload', 'review', 'checks', 'merge', 'publish']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'publish'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const columns = [
            ['local', isTr ? 'Senin bilgisayarın' : 'Your laptop', isTr ? 'Branch üzerinde çalışırsın' : 'You work on a branch', '💻'],
            ['review', 'Pull Request', isTr ? 'Takım değişikliği görür' : 'The team sees the change', '📝'],
            ['checks', 'Actions', isTr ? 'Testler otomatik koşar' : 'Tests run automatically', '✅'],
            ['merge', 'main', isTr ? 'Onaylı iş birleşir' : 'Approved work is merged', '🔒'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🌐</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'GitHub = takım meydanı' : 'GitHub = team workspace'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>branch → PR → checks → main</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['local', 150], ['upload', 650], ['review', 850], ['checks', 850], ['merge', 750], ['publish', 600]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#2563eb' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ GitHub’u gör' : '▶ see GitHub') : s === 'publish' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                            {columns.map(([key, title, desc, icon], idx) => {
                                const isReached = reached(key) || (key === 'review' && s === 'upload')
                                const isActive = active(key) || (key === 'review' && s === 'upload')
                                return (
                                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 9, alignItems: 'center' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isReached ? '#1d4ed8' : '#334155', color: '#fff', boxShadow: isActive ? '0 0 16px rgba(59,130,246,.55)' : 'none', transition: 'all .35s' }} className={isActive ? 'sim-animate' : ''}>{isReached ? icon : idx + 1}</div>
                                        <div style={{ border: `1px solid ${isActive ? '#60a5fa' : isReached ? '#2563eb' : '#334155'}`, background: isReached ? '#1e3a8a33' : '#020617', borderRadius: 9, padding: '8px 10px', transition: 'all .35s' }}>
                                            <div style={{ color: isReached ? '#dbeafe' : '#64748b', fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                            <div style={{ color: isReached ? '#bfdbfe' : '#64748b', fontSize: 9.5 }}>{desc}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, border: '1px solid #334155', background: '#020617', borderRadius: 9, padding: 10, color: s === 'publish' ? '#86efac' : '#94a3b8', fontSize: 10.5, lineHeight: 1.55 }}>
                            {s === 'publish'
                                ? (isTr ? 'Sonuç: Değişiklik görünür, test edilmiş ve onaylanmış şekilde ortak main’e girer.' : 'Result: the change enters main visibly, tested and approved.')
                                : (isTr ? 'GitHub tek başına komut değildir; review, kalite kapısı ve takım hafızasıdır.' : 'GitHub is not just commands; it is review, quality gate and team memory.')}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitConceptOrderPlayground = () => {
        const s = simState
        const order = ['idle', 'init', 'status', 'add', 'commit', 'origin', 'pushMain', 'branch', 'pushBranch', 'sync', 'conflict', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const steps = [
            ['init', 'git init', isTr ? 'Git bu klasörü takip etmeye başlar.' : 'Git starts tracking this folder.'],
            ['status', 'git status', isTr ? 'Önce Git ne görüyor anlarsın.' : 'First you see what Git sees.'],
            ['add', 'git add', isTr ? 'Commit’e girecek dosyayı seçersin.' : 'You choose what enters the commit.'],
            ['commit', 'git commit', isTr ? 'Local snapshot kalıcı olur.' : 'The local snapshot becomes permanent.'],
            ['origin', 'remote origin', isTr ? 'GitHub repo adresi bağlanır.' : 'The GitHub repo URL is connected.'],
            ['pushMain', 'push main', isTr ? 'main GitHub’a ilk kez gider.' : 'main goes to GitHub first.'],
            ['branch', 'feature branch', isTr ? 'main dışında güvenli yol açılır.' : 'A safe path outside main is created.'],
            ['pushBranch', 'push feature', isTr ? 'Branch GitHub’da görünür olur.' : 'The branch becomes visible on GitHub.'],
            ['sync', 'fetch + merge', isTr ? 'Remote değişiklikler locale alınır.' : 'Remote changes are brought local.'],
            ['conflict', 'conflict', isTr ? 'Aynı yer değiştiyse localde çözülür.' : 'If the same area changed, solve it locally.'],
        ]
        const terminal = [
            ['init', 'git init', '#2dd4bf'],
            ['status', 'git status', '#38bdf8'],
            ['add', 'git add README.md', '#fbbf24'],
            ['commit', 'git commit -m "chore: initial snapshot"', '#22c55e'],
            ['origin', 'git remote add origin https://github.com/hasankocaman/deneme2.git', '#60a5fa'],
            ['pushMain', 'git push -u origin main', '#a78bfa'],
            ['branch', 'git switch -c feature/login-tests', '#34d399'],
            ['pushBranch', 'git push -u origin feature/login-tests', '#22c55e'],
            ['sync', 'git fetch origin', '#f59e0b'],
            ['sync', 'git merge origin/main   # pull = fetch + merge', '#f59e0b'],
            ['conflict', isTr ? '# conflict: dosyayı düzelt -> test et -> git add -> continue' : '# conflict: edit file -> test -> git add -> continue', '#fb7185'],
        ]
        return (
            <div style={{ maxWidth: 470, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🧭</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Git/GitHub sıra haritası' : 'Git/GitHub order map'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'neden -> komut -> sonuç' : 'why -> command -> result'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['init', 180], ['status', 650], ['add', 700], ['commit', 760], ['origin', 760], ['pushMain', 760], ['branch', 760], ['pushBranch', 760], ['sync', 850], ['conflict', 760], ['done', 420]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0f766e' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ sırayı göster' : '▶ show order') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>

                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 46px 1fr', gap: 8, alignItems: 'stretch' }}>
                            <div style={{ border: `1px solid ${reached('init') ? '#2dd4bf' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('init') ? '#042f2e' : '#020617' }}>
                                <div style={{ color: '#99f6e4', fontSize: 10, fontWeight: 900 }}>LOCAL</div>
                                <div style={{ color: reached('init') ? '#ccfbf1' : '#64748b', fontSize: 12, fontWeight: 900, marginTop: 6 }}>qa-project/</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 5, marginTop: 8 }}>
                                    {[
                                        ['init', '.git'],
                                        ['add', 'stage'],
                                        ['commit', 'C1'],
                                    ].map(([key, label]) => (
                                        <div key={key} style={{ border: `1px solid ${reached(key) ? '#14b8a6' : '#334155'}`, borderRadius: 7, padding: '5px 3px', color: reached(key) ? '#ccfbf1' : '#64748b', background: reached(key) ? '#0f766e55' : '#0f172a', fontSize: 9, textAlign: 'center', fontWeight: 800 }}>
                                            {label}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ color: reached('branch') ? '#86efac' : '#64748b', fontSize: 9.5, marginTop: 8 }}>{reached('branch') ? 'feature/login-tests' : (isTr ? 'önce main üzerinde başlar' : 'starts on main first')}</div>
                            </div>

                            <div style={{ display: 'grid', placeItems: 'center' }}>
                                <div className={active('origin') || active('pushMain') || active('pushBranch') || active('sync') ? 'sim-animate' : ''} style={{ width: 38, height: 38, borderRadius: 999, display: 'grid', placeItems: 'center', background: active('sync') ? '#f59e0b' : reached('origin') ? '#0ea5e9' : '#1e293b', color: '#fff', fontSize: 16, boxShadow: active('origin') || active('pushMain') || active('pushBranch') || active('sync') ? '0 0 18px rgba(20,184,166,.65)' : 'none', transition: 'all .35s' }}>
                                    {active('sync') ? '↙' : '↗'}
                                </div>
                            </div>

                            <div style={{ border: `1px solid ${reached('pushMain') ? '#60a5fa' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('pushMain') ? '#172554' : '#020617' }}>
                                <div style={{ color: '#bfdbfe', fontSize: 10, fontWeight: 900 }}>GITHUB</div>
                                <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
                                    <div style={{ border: `1px solid ${reached('pushMain') ? '#60a5fa' : '#334155'}`, borderRadius: 8, padding: 7, color: reached('pushMain') ? '#dbeafe' : '#64748b', background: reached('pushMain') ? '#1d4ed855' : '#0f172a', fontSize: 10, fontWeight: 900 }}>origin/main</div>
                                    <div style={{ border: `1px solid ${reached('pushBranch') ? '#22c55e' : '#334155'}`, borderRadius: 8, padding: 7, color: reached('pushBranch') ? '#dcfce7' : '#64748b', background: reached('pushBranch') ? '#15803d55' : '#0f172a', fontSize: 10, fontWeight: 900 }}>origin/feature/login-tests</div>
                                </div>
                                <div style={{ color: reached('pushBranch') ? '#86efac' : '#64748b', fontSize: 9.5, marginTop: 8 }}>{isTr ? 'PR için remote branch gerekir' : 'A PR needs a remote branch'}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 7 }}>
                            {steps.map(([key, title, desc], index) => {
                                const isActive = active(key)
                                const isDone = reached(key)
                                return (
                                    <div key={key} style={{ border: `1px solid ${isActive ? '#2dd4bf' : isDone ? '#0f766e' : '#334155'}`, borderRadius: 9, padding: 8, background: isActive ? '#134e4a' : isDone ? '#042f2e' : '#020617', transition: 'all .3s' }}>
                                        <div style={{ color: isDone ? '#ccfbf1' : '#64748b', fontSize: 9, fontWeight: 900 }}>{isDone ? '✓' : index + 1} {title}</div>
                                        <div style={{ color: isDone ? '#99f6e4' : '#64748b', fontSize: 8.5, marginTop: 4, lineHeight: 1.35 }}>{desc}</div>
                                    </div>
                                )
                            })}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${reached('sync') ? '#f59e0b' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('sync') ? '#451a0355' : '#020617' }}>
                                <div style={{ color: '#fde68a', fontSize: 10, fontWeight: 900 }}>fetch + merge</div>
                                <div style={{ color: reached('sync') ? '#fcd34d' : '#64748b', fontSize: 9, marginTop: 5 }}>{isTr ? 'Önce indir, sonra uygula.' : 'Download first, apply second.'}</div>
                            </div>
                            <div style={{ border: `1px solid ${reached('sync') ? '#f59e0b' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('sync') ? '#451a0355' : '#020617' }}>
                                <div style={{ color: '#fde68a', fontSize: 10, fontWeight: 900 }}>pull</div>
                                <div style={{ color: reached('sync') ? '#fcd34d' : '#64748b', fontSize: 9, marginTop: 5 }}>{isTr ? 'Fetch + merge tek komut.' : 'Fetch + merge in one command.'}</div>
                            </div>
                        </div>

                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 118, fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Animasyonu başlat: hangi komut hangi amaçla gelir gör.' : 'Start the animation to see why each command comes next.'}</div>}
                            {terminal.map(([state, text, color], i) => (order.indexOf(state) <= cur && s !== 'idle')
                                ? <div key={i} style={{ color, fontSize: 9.6, lineHeight: 1.65, animation: 'simFadeUp .25s ease-out', wordBreak: 'break-word' }}>$ {text}</div>
                                : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGitTerminalShellMapPlayground = () => {
        const s = simState
        const order = ['idle', 'type', 'shell', 'git', 'repo', 'output']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'output'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const layers = [
            ['type', '⌨️', isTr ? 'Terminal penceresi' : 'Terminal window', isTr ? 'Komutu yazdığın görsel alan' : 'The visual place where you type'],
            ['shell', '⚙️', 'Shell', isTr ? 'Komutu yorumlayan motor' : 'The engine that interprets the command'],
            ['git', '🔧', 'Git', isTr ? '`git status` isteğini çalıştıran program' : 'The program that runs `git status`'],
            ['repo', '📁', '.git', isTr ? 'Repo bilgisini okur' : 'Repository metadata is read'],
            ['output', '✅', isTr ? 'Çıktı' : 'Output', isTr ? 'Sonuç terminalde görünür' : 'Result appears in the terminal'],
        ]
        const terminal = [
            ['type', '$ git status'],
            ['shell', isTr ? 'Git Bash komutu shell içinde yorumluyor...' : 'Git Bash is interpreting the command...'],
            ['git', isTr ? 'git.exe repository durumunu soruyor...' : 'git.exe is checking repository state...'],
            ['repo', isTr ? '.git klasörü ve working tree okunuyor...' : '.git folder and working tree are being read...'],
            ['output', 'On branch main\nnothing to commit, working tree clean'],
        ]
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#020617' }}>
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#0f172a', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🖥️</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Komut yolculuğu' : 'Command journey'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>terminal → shell → git → repo → output</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['type', 150], ['shell', 650], ['git', 700], ['repo', 700], ['output', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0ea5e9' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ komutu izle' : '▶ trace command') : s === 'output' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        {layers.map(([key, icon, title, desc]) => {
                            const isA = active(key)
                            const isD = done(key)
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#38bdf8' : isD ? '#22c55e' : '#334155'}`, background: isA ? '#082f4955' : isD ? '#052e1655' : '#0f172a', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '34px 1fr auto', alignItems: 'center', gap: 9, transition: 'all .35s' }}>
                                    <div className={isA ? 'sim-animate' : ''} style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isA ? '#0284c7' : isD ? '#16a34a' : '#334155', color: '#fff' }}>{isD ? '✓' : icon}</div>
                                    <div>
                                        <div style={{ color: isA || isD ? '#f8fafc' : '#cbd5e1', fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                    </div>
                                    <div style={{ color: isA ? '#7dd3fc' : isD ? '#86efac' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}>{isA ? 'active' : isD ? 'done' : 'waiting'}</div>
                                </div>
                            )
                        })}
                        <div style={{ borderRadius: 10, border: '1px solid #1e293b', background: '#020617', padding: 10, fontFamily: 'JetBrains Mono, monospace', minHeight: 108 }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10.5 }}>{isTr ? 'Başlatınca `git status` komutunun arka planda nereye gittiğini göreceksin.' : 'Start to see where `git status` goes behind the scenes.'}</div>}
                            {terminal.map(([key, line]) => (order.indexOf(key) <= cur && s !== 'idle') ? (
                                <div key={key} style={{ color: key === 'output' ? '#86efac' : '#bae6fd', fontSize: 10.5, whiteSpace: 'pre-wrap', marginBottom: 5 }}>{line}</div>
                            ) : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#0f172a', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitTerminalInstallUsePlayground = () => {
        const s = simState
        const order = ['idle', 'download', 'install', 'open', 'verify', 'ide']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'ide'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const cards = [
            ['download', '⬇️', isTr ? 'İndir' : 'Download', isTr ? 'Windows: Git for Windows; macOS/Linux: package manager' : 'Windows: Git for Windows; macOS/Linux: package manager'],
            ['install', '🧰', isTr ? 'Kur' : 'Install', isTr ? 'Başlangıçta güvenli varsayılan seçeneklerle ilerle' : 'Use beginner-friendly defaults at first'],
            ['open', '🖥️', isTr ? 'Aç' : 'Open', isTr ? 'Git Bash, PowerShell, Terminal veya IDE Terminal aç' : 'Open Git Bash, PowerShell, Terminal or IDE Terminal'],
            ['verify', '✅', isTr ? 'Doğrula' : 'Verify', '`git --version`'],
            ['ide', '🧑‍💻', isTr ? 'Projede kullan' : 'Use in project', isTr ? 'VS Code/IntelliJ terminalinde doğru klasörü kontrol et' : 'Check the right folder in VS Code/IntelliJ terminal'],
        ]
        const terminal = [
            ['download', isTr ? 'Windows: git-scm.com → Git for Windows' : 'Windows: git-scm.com → Git for Windows'],
            ['install', isTr ? 'Kurulumdan sonra Git Bash menüde görünür' : 'After install, Git Bash appears in the Start menu'],
            ['open', '$ pwd\n/c/Users/hasan/Desktop'],
            ['verify', '$ git --version\ngit version 2.x.x'],
            ['ide', isTr ? 'VS Code → Terminal → New Terminal → Git Bash seç' : 'VS Code → Terminal → New Terminal → choose Git Bash'],
        ]
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #14532d', background: '#052e16' }}>
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#064e3b', borderBottom: '1px solid #166534' }}>
                        <span style={{ fontSize: 18 }}>🧭</span>
                        <div>
                            <div style={{ color: '#ecfdf5', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Güvenli ilk kurulum turu' : 'Safe first setup tour'}</div>
                            <div style={{ color: '#a7f3d0', fontSize: 10 }}>{isTr ? 'indir → kur → aç → doğrula → projede kullan' : 'download → install → open → verify → use in project'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['download', 150], ['install', 700], ['open', 700], ['verify', 800], ['ide', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#10b981' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ kurulum turu' : '▶ setup tour') : s === 'ide' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        {cards.map(([key, icon, title, desc]) => {
                            const isA = active(key)
                            const isD = done(key)
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#34d399' : isD ? '#22c55e' : '#166534'}`, background: isA ? '#064e3b' : isD ? '#052e16' : '#022c22', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '34px 1fr', gap: 9, alignItems: 'center', transition: 'all .35s' }}>
                                    <div className={isA ? 'sim-animate' : ''} style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isA ? '#10b981' : isD ? '#16a34a' : '#14532d', color: '#fff' }}>{isD ? '✓' : icon}</div>
                                    <div>
                                        <div style={{ color: '#ecfdf5', fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                        <div style={{ color: '#a7f3d0', fontSize: 9.5 }}>{desc}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{ borderRadius: 10, border: '1px solid #166534', background: '#020617', padding: 10, minHeight: 92, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#6ee7b7', fontSize: 10.5 }}>{isTr ? 'Başlatınca Git Bash ve terminal kurulum yolunu görsel olarak takip edeceksin.' : 'Start to follow the Git Bash and terminal setup path visually.'}</div>}
                            {terminal.map(([key, line]) => (order.indexOf(key) <= cur && s !== 'idle') ? (
                                <div key={key} style={{ color: key === 'verify' ? '#86efac' : '#d1fae5', fontSize: 10.5, whiteSpace: 'pre-wrap', marginBottom: 5 }}>{line}</div>
                            ) : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #166534', background: '#064e3b', color: '#a7f3d0', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitBashOpenFolderPlayground = () => {
        const s = simState
        const order = ['idle', 'folder', 'cmdAddress', 'cmdOpen', 'bashMenu', 'bashOpen', 'ide']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'ide'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const fileRows = [
            ['folder', '📁', isTr ? 'Proje klasörü' : 'Project folder', 'C:\\Users\\Hasan\\Desktop\\qa-project'],
            ['cmdAddress', '⌨️', isTr ? 'Adres çubuğuna yaz' : 'Type in address bar', 'cmd'],
            ['cmdOpen', '⚫', 'CMD', 'C:\\Users\\Hasan\\Desktop\\qa-project>'],
            ['bashMenu', '🖱️', isTr ? 'Sağ tık menüsü' : 'Right-click menu', 'Git Bash Here'],
            ['bashOpen', '🟩', 'Git Bash', 'hasan@pc MINGW64 ~/Desktop/qa-project'],
            ['ide', '🧑‍💻', isTr ? 'IDE terminali' : 'IDE terminal', 'Terminal > New Terminal > Git Bash'],
        ]
        const terminal = [
            ['folder', isTr ? 'Explorer: qa-project klasörü açık' : 'Explorer: qa-project folder is open'],
            ['cmdAddress', isTr ? 'Adres çubuğu: cmd yazıldı, Enter basıldı' : 'Address bar: typed cmd, pressed Enter'],
            ['cmdOpen', 'C:\\Users\\Hasan\\Desktop\\qa-project> dir\nREADME.md  tests  package.json'],
            ['bashMenu', isTr ? 'Boş alana sağ tık: Git Bash Here seçildi' : 'Right-click empty area: Git Bash Here selected'],
            ['bashOpen', '$ pwd\n/c/Users/Hasan/Desktop/qa-project\n$ ls\nREADME.md  tests  package.json'],
            ['ide', isTr ? 'VS Code terminali aynı proje klasöründe açıldı' : 'VS Code terminal opened in the same project folder'],
        ]
        return (
            <div style={{ maxWidth: 440, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #166534', background: '#052e16' }}>
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#064e3b', borderBottom: '1px solid #166534' }}>
                        <span style={{ fontSize: 18 }}>🗂️</span>
                        <div>
                            <div style={{ color: '#ecfdf5', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Klasörde terminal açma' : 'Open terminal in folder'}</div>
                            <div style={{ color: '#a7f3d0', fontSize: 10 }}>Explorer → cmd / Git Bash Here / IDE Terminal</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['folder', 150], ['cmdAddress', 650], ['cmdOpen', 800], ['bashMenu', 750], ['bashOpen', 850], ['ide', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#22c55e' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ açılışı göster' : '▶ show opening') : s === 'ide' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        {fileRows.map(([key, icon, title, value]) => {
                            const isA = active(key)
                            const isD = done(key)
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#86efac' : isD ? '#22c55e' : '#166534'}`, background: isA ? '#064e3b' : isD ? '#052e16' : '#022c22', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '34px 1fr', gap: 9, alignItems: 'center', transition: 'all .35s' }}>
                                    <div className={isA ? 'sim-animate' : ''} style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isA ? '#22c55e' : isD ? '#16a34a' : '#14532d', color: '#fff' }}>{isD ? '✓' : icon}</div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ color: '#ecfdf5', fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                        <div style={{ color: '#a7f3d0', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-word' }}>{value}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{ borderRadius: 10, border: '1px solid #166534', background: '#020617', padding: 10, minHeight: 128, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#6ee7b7', fontSize: 10.5 }}>{isTr ? 'Başlatınca aynı klasörde CMD ve Git Bash açmanın farkını göreceksin.' : 'Start to see CMD and Git Bash opening in the same folder.'}</div>}
                            {terminal.map(([key, line]) => (order.indexOf(key) <= cur && s !== 'idle') ? (
                                <div key={key} style={{ color: key === 'cmdOpen' ? '#cbd5e1' : key === 'bashOpen' ? '#86efac' : '#d1fae5', fontSize: 10.5, whiteSpace: 'pre-wrap', marginBottom: 6 }}>{line}</div>
                            ) : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #166534', background: '#064e3b', color: '#a7f3d0', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitBashCommandRunnerPlayground = () => {
        const s = simState
        const order = ['idle', 'pwd', 'ls', 'cd', 'mkdir', 'file', 'ipconfig', 'git']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'git'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const commands = [
            ['pwd', 'pwd', '/c/Users/Hasan/Desktop/qa-project', isTr ? 'Neredeyim?' : 'Where am I?'],
            ['ls', 'ls', 'README.md  tests  package.json', isTr ? 'Burada ne var?' : 'What is here?'],
            ['cd', 'cd tests\npwd\ncd ..', '/c/Users/Hasan/Desktop/qa-project/tests\n/c/Users/Hasan/Desktop/qa-project', isTr ? 'Klasöre gir ve geri dön' : 'Enter folder and go back'],
            ['mkdir', 'mkdir terminal-demo\nls', 'README.md  tests  package.json  terminal-demo', isTr ? 'Klasör oluştur' : 'Create a folder'],
            ['file', 'touch notes.txt\necho "ilk terminal notum" > notes.txt\ncat notes.txt', isTr ? 'ilk terminal notum' : 'my first terminal note', isTr ? 'Dosya oluştur, yaz, oku' : 'Create, write, read'],
            ['ipconfig', 'ipconfig', 'IPv4 Address . . . . . . . . . . : 192.168.1.24\nDefault Gateway . . . . . . . . : 192.168.1.1', isTr ? 'Ağ bilgisini gör' : 'See network info'],
            ['git', 'git --version', 'git version 2.x.x', isTr ? 'Git erişilebilir mi?' : 'Is Git reachable?'],
        ]
        return (
            <div style={{ maxWidth: 440, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #075985', background: '#082f49' }}>
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#0c4a6e', borderBottom: '1px solid #075985' }}>
                        <span style={{ fontSize: 18 }}>⌨️</span>
                        <div>
                            <div style={{ color: '#f0f9ff', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Komut yaz, sonucu oku' : 'Type command, read output'}</div>
                            <div style={{ color: '#bae6fd', fontSize: 10 }}>pwd / ls / cd / mkdir / touch / ipconfig / git</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['pwd', 150], ['ls', 650], ['cd', 800], ['mkdir', 800], ['file', 900], ['ipconfig', 900], ['git', 750]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0ea5e9' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ komut turu' : '▶ command tour') : s === 'git' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 9 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 7 }}>
                            {commands.map(([key, cmd, output, label]) => {
                                const isA = active(key)
                                const isD = done(key)
                                return (
                                    <div key={key} style={{ border: `1px solid ${isA ? '#38bdf8' : isD ? '#22c55e' : '#075985'}`, background: isA ? '#0c4a6e' : isD ? '#052e16' : '#0f172a', borderRadius: 9, padding: 8, transition: 'all .35s' }}>
                                        <div style={{ color: isA || isD ? '#f0f9ff' : '#7dd3fc', fontSize: 9.5, fontWeight: 900 }}>{isD ? '✓' : isA ? '→' : '•'} {label}</div>
                                        <div style={{ color: '#bae6fd', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', marginTop: 4, wordBreak: 'break-word' }}>{cmd.split('\n')[0]}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ borderRadius: 10, border: '1px solid #075985', background: '#020617', padding: 10, minHeight: 170, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#7dd3fc', fontSize: 10.5 }}>{isTr ? 'Başlatınca her komutun yazılışını ve beklenen çıktısını göreceksin.' : 'Start to see each command and expected output.'}</div>}
                            {commands.map(([key, cmd, output]) => (order.indexOf(key) <= cur && s !== 'idle') ? (
                                <div key={key} style={{ marginBottom: 8 }}>
                                    <div style={{ color: '#38bdf8', fontSize: 10.5, whiteSpace: 'pre-wrap' }}>$ {cmd}</div>
                                    <div style={{ color: '#86efac', fontSize: 10.5, whiteSpace: 'pre-wrap', paddingLeft: 8 }}>{output}</div>
                                </div>
                            ) : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #075985', background: '#0c4a6e', color: '#bae6fd', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitInstallOsPlayground = () => {
        const s = simState
        const order = ['idle', 'windows', 'mac', 'linux', 'verify', 'identity']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'identity'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const osCards = [
            ['windows', 'Windows', isTr ? 'Git for Windows / winget' : 'Git for Windows / winget', '⊞'],
            ['mac', 'macOS', isTr ? 'Homebrew veya installer' : 'Homebrew or installer', '⌘'],
            ['linux', 'Linux', isTr ? 'apt, dnf veya pacman' : 'apt, dnf or pacman', 'L'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🧰</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Kurulum haritası' : 'Installation map'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'önce işletim sistemi, sonra doğrulama' : 'OS first, then verification'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['windows', 150], ['mac', 700], ['linux', 700], ['verify', 800], ['identity', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#f97316' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ kurulum turu' : '▶ install tour') : s === 'identity' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                            {osCards.map(([key, title, desc, icon]) => {
                                const isA = active(key)
                                const isD = done(key)
                                return (
                                    <div key={key} style={{ border: `1px solid ${isA ? '#fb923c' : isD ? '#22c55e' : '#334155'}`, background: isA ? '#43140755' : isD ? '#052e1655' : '#020617', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '34px 1fr auto', gap: 9, alignItems: 'center', transition: 'all .35s' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isA ? '#f97316' : isD ? '#16a34a' : '#334155', color: '#fff', fontWeight: 900 }} className={isA ? 'sim-animate' : ''}>{isD ? '✓' : icon}</div>
                                        <div>
                                            <div style={{ color: isA || isD ? '#ffedd5' : '#cbd5e1', fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                            <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                        </div>
                                        <div style={{ color: isA ? '#fed7aa' : isD ? '#bbf7d0' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}>{isA ? 'installing' : isD ? 'ready' : 'waiting'}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${cur >= order.indexOf('verify') ? '#38bdf8' : '#334155'}`, background: cur >= order.indexOf('verify') ? '#082f4955' : '#020617', borderRadius: 9, padding: 9 }}>
                                <div style={{ color: cur >= order.indexOf('verify') ? '#bae6fd' : '#64748b', fontSize: 10, fontWeight: 800 }}>git --version</div>
                                <div style={{ color: cur >= order.indexOf('verify') ? '#7dd3fc' : '#64748b', fontSize: 9, marginTop: 4 }}>{isTr ? 'Git gerçekten kuruldu mu?' : 'Is Git really installed?'}</div>
                            </div>
                            <div style={{ border: `1px solid ${cur >= order.indexOf('identity') ? '#a78bfa' : '#334155'}`, background: cur >= order.indexOf('identity') ? '#4c1d9555' : '#020617', borderRadius: 9, padding: 9 }}>
                                <div style={{ color: cur >= order.indexOf('identity') ? '#ddd6fe' : '#64748b', fontSize: 10, fontWeight: 800 }}>name + email</div>
                                <div style={{ color: cur >= order.indexOf('identity') ? '#c4b5fd' : '#64748b', fontSize: 9, marginTop: 4 }}>{isTr ? 'Commit kimliği ayarlanır.' : 'Commit identity is configured.'}</div>
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitThreeAreasPlayground = () => {
        const s = simState
        const order = ['idle', 'edit', 'stage', 'commit', 'push', 'remote']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'remote'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const zones = [
            ['edit', isTr ? 'Working tree' : 'Working tree', isTr ? 'Dosyayı değiştirirsin' : 'You edit files', 'README.md'],
            ['stage', 'Staging area', isTr ? 'Commit sepetine koyarsın' : 'You add changes to the commit basket', 'git add README.md'],
            ['commit', 'Local repository', isTr ? 'Kalıcı snapshot alırsın' : 'You save a local snapshot', 'git commit'],
            ['remote', 'GitHub remote', isTr ? 'Takımla paylaşırsın' : 'You share with the team', 'git push'],
        ]
        const terminal = [
            ['edit', 'echo "# qa-notes" > README.md', '#38bdf8'],
            ['stage', 'git add README.md', '#fbbf24'],
            ['commit', 'git commit -m "docs: add qa notes"', '#22c55e'],
            ['push', 'git push origin feature/qa-notes', '#a78bfa'],
            ['remote', isTr ? 'GitHub: branch güncellendi' : 'GitHub: branch updated', '#22c55e'],
        ]
        return (
            <div style={{ maxWidth: 390, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔀</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>Git snapshot lab</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>edit → add → commit → push</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['edit', 150], ['stage', 750], ['commit', 850], ['push', 750], ['remote', 500]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#059669' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ snapshot al' : '▶ make snapshot') : s === 'remote' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 9 }}>
                        {zones.map(([key, label, desc, command]) => {
                            const isA = active(key) || (key === 'remote' && s === 'push')
                            const isD = done(key) || (key === 'remote' && s === 'remote')
                            return (
                                <div key={key} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 9, alignItems: 'center' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isD ? '#065f46' : isA ? '#047857' : '#334155', color: '#ecfdf5', boxShadow: isA ? '0 0 16px rgba(16,185,129,.55)' : 'none', transition: 'all .35s' }} className={isA ? 'sim-animate' : ''}>
                                        {isD ? '✓' : isA ? '→' : '·'}
                                    </div>
                                    <div style={{ border: `1px solid ${isA ? '#34d399' : isD ? '#10b981' : '#334155'}`, background: isA ? '#064e3b55' : '#020617', borderRadius: 9, padding: '8px 10px', transition: 'all .35s' }}>
                                        <div style={{ color: isA || isD ? '#d1fae5' : '#cbd5e1', fontSize: 11.5, fontWeight: 800 }}>{label}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                        <div style={{ color: isA || isD ? '#6ee7b7' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', marginTop: 3 }}>{command}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 90, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Akışı başlatınca Git komutları sırayla görünür.' : 'Start to watch Git commands in order.'}</div>}
                            {terminal.map(([state, text, color], i) => {
                                const show = order.indexOf(state) <= cur && s !== 'idle'
                                return show ? <div key={i} style={{ color, fontSize: 10.5, lineHeight: 1.7, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div> : null
                            })}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitRemoteOriginSetupPlayground = () => {
        const s = simState
        const order = ['idle', 'commit', 'remote', 'list', 'push', 'credential', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const terminal = [
            ['commit', 'git log --oneline --max-count=1', '#a78bfa'],
            ['remote', 'git remote add origin https://github.com/hasankocaman/deneme2.git', '#38bdf8'],
            ['list', 'git remote -v', '#fbbf24'],
            ['push', 'git push -u origin main', '#22c55e'],
            ['credential', isTr ? '# GitHub login isterse credential manager oturumu hatirlar' : '# if GitHub asks for login, credential manager remembers the session', '#94a3b8'],
            ['done', isTr ? '# sonraki sefer: git push' : '# next time: git push', '#38bdf8'],
        ]
        const listCommands = [
            ['git remote', isTr ? 'Sadece isim: origin' : 'Name only: origin'],
            ['git remote -v', isTr ? 'fetch + push URL' : 'fetch + push URL'],
            ['git remote --verbose', isTr ? '-v ile ayni detay' : 'same detail as -v'],
        ]
        return (
            <div style={{ maxWidth: 450, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔗</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'origin remote baglama' : 'origin remote setup'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'commit -> origin -> remote -v -> push -u' : 'commit -> origin -> remote -v -> push -u'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['commit', 200], ['remote', 850], ['list', 750], ['push', 850], ['credential', 650], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#2563eb' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ bagla' : '▶ connect') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>

                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 46px 1fr', gap: 8, alignItems: 'center' }}>
                            <div style={{ border: `1px solid ${reached('commit') ? '#a78bfa' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('commit') ? '#4c1d9555' : '#020617', minHeight: 112 }}>
                                <div style={{ color: '#ddd6fe', fontSize: 10, fontWeight: 900 }}>LOCAL REPO</div>
                                <div style={{ display: 'flex', gap: 5, marginTop: 8, alignItems: 'center' }}>
                                    {['W', 'S', 'C1'].map((item, index) => (
                                        <div key={item} style={{ width: item === 'C1' ? 34 : 27, height: 27, borderRadius: 999, display: 'grid', placeItems: 'center', background: reached('commit') ? (item === 'C1' ? '#7c3aed' : '#334155') : '#1e293b', color: reached('commit') ? '#fff' : '#64748b', fontSize: 10, fontWeight: 900, boxShadow: active('commit') && item === 'C1' ? '0 0 18px rgba(167,139,250,.65)' : 'none' }}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 8 }}>{isTr ? 'En az 1 commit olmadan anlamli push yoktur.' : 'Without at least 1 commit, there is nothing meaningful to push.'}</div>
                            </div>

                            <div style={{ display: 'grid', placeItems: 'center' }}>
                                <div className={active('remote') || active('push') ? 'sim-animate' : ''} style={{ width: 38, height: 38, borderRadius: 999, display: 'grid', placeItems: 'center', background: reached('push') ? '#16a34a' : active('remote') ? '#2563eb' : '#1e293b', color: '#fff', fontSize: 16, boxShadow: active('remote') || active('push') ? '0 0 18px rgba(59,130,246,.65)' : 'none', transition: 'all .35s' }}>
                                    →
                                </div>
                            </div>

                            <div style={{ border: `1px solid ${reached('push') ? '#22c55e' : reached('remote') ? '#38bdf8' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('push') ? '#052e1655' : reached('remote') ? '#082f4955' : '#020617', minHeight: 112 }}>
                                <div style={{ color: reached('push') ? '#bbf7d0' : '#bfdbfe', fontSize: 10, fontWeight: 900 }}>GITHUB / origin</div>
                                <div style={{ color: reached('remote') ? '#e0f2fe' : '#64748b', fontSize: 12, fontWeight: 900, marginTop: 7 }}>hasankocaman/deneme2</div>
                                <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 6 }}>{isTr ? 'origin sadece adres bagidir; upload ilk push ile olur.' : 'origin is only the address link; upload happens on push.'}</div>
                                <div style={{ color: reached('push') ? '#86efac' : '#475569', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 7 }}>origin/main</div>
                            </div>
                        </div>

                        <div style={{ border: `1px solid ${reached('remote') ? '#38bdf8' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('remote') ? '#082f4955' : '#020617' }}>
                            <div style={{ color: '#bfdbfe', fontSize: 10, fontWeight: 900 }}>{isTr ? '1) Repo adresini origin olarak tanit' : '1) Register the repo URL as origin'}</div>
                            <div style={{ color: reached('remote') ? '#dbeafe' : '#64748b', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 5, wordBreak: 'break-all' }}>git remote add origin https://github.com/hasankocaman/deneme2.git</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 7 }}>
                            {listCommands.map(([cmd, desc]) => (
                                <div key={cmd} style={{ border: `1px solid ${reached('list') ? '#f59e0b' : '#334155'}`, borderRadius: 9, padding: 8, background: reached('list') ? '#451a0355' : '#020617' }}>
                                    <div style={{ color: reached('list') ? '#fde68a' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>{cmd}</div>
                                    <div style={{ color: reached('list') ? '#fcd34d' : '#64748b', fontSize: 8.5, marginTop: 4 }}>{desc}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${reached('push') ? '#22c55e' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('push') ? '#052e1655' : '#020617' }}>
                                <div style={{ color: '#bbf7d0', fontSize: 10, fontWeight: 900 }}>{isTr ? '2) Ilk push upstream kurar' : '2) First push sets upstream'}</div>
                                <div style={{ color: reached('push') ? '#dcfce7' : '#64748b', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 5 }}>git push -u origin main</div>
                                <div style={{ color: '#94a3b8', fontSize: 8.5, marginTop: 5 }}>{isTr ? 'Eski repo master ise main yerine master yaz.' : 'If the old repo uses master, replace main with master.'}</div>
                            </div>
                            <div style={{ border: `1px solid ${reached('credential') ? '#a78bfa' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('credential') ? '#4c1d9555' : '#020617' }}>
                                <div style={{ color: '#ddd6fe', fontSize: 10, fontWeight: 900 }}>{isTr ? 'Login guvenligi' : 'Login safety'}</div>
                                <div style={{ color: reached('credential') ? '#ddd6fe' : '#64748b', fontSize: 9.2, marginTop: 5 }}>{isTr ? 'Windows Credential Manager, macOS Keychain oturumu saklayabilir.' : 'Windows Credential Manager or macOS Keychain may store the session.'}</div>
                                <div style={{ color: '#fca5a5', fontSize: 8.5, marginTop: 5 }}>{isTr ? 'Tokeni URL icine yazma.' : 'Do not put tokens in URLs.'}</div>
                            </div>
                        </div>

                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 118, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Animasyonu baslat: local repo GitHub repo ile nasil eslesiyor gor.' : 'Start the animation to see the local repo connect to GitHub.'}</div>}
                            {terminal.map(([state, text, color], i) => (order.indexOf(state) <= cur && s !== 'idle')
                                ? <div key={i} style={{ color, fontSize: 10, lineHeight: 1.65, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div>
                                : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGitBranchLabPlayground = () => {
        const s = simState
        const order = ['idle', 'list', 'create', 'switch', 'rename', 'work', 'commit', 'push', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const mainReady = cur >= order.indexOf('list')
        const branchReady = cur >= order.indexOf('create')
        const switchReady = cur >= order.indexOf('switch')
        const renameReady = cur >= order.indexOf('rename')
        const workReady = cur >= order.indexOf('work')
        const commitReady = cur >= order.indexOf('commit')
        const pushReady = cur >= order.indexOf('push')
        const commands = [
            ['list', 'git branch', '#38bdf8'],
            ['create', 'git branch hasan', '#fbbf24'],
            ['switch', 'git switch hasan', '#60a5fa'],
            ['rename', 'git branch -m feature/hasan', '#c084fc'],
            ['work', isTr ? '# tests/checkout.spec.js düzenlenir' : '# edit tests/checkout.spec.js', '#c084fc'],
            ['commit', 'git add tests/checkout.spec.js', '#22c55e'],
            ['commit', 'git commit -m "test: cover checkout tax"', '#22c55e'],
            ['push', 'git push -u origin feature/hasan', '#60a5fa'],
        ]
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🌿</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Branch komut haritası' : 'Branch command map'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>git branch → hasan → rename → upstream</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['list', 150], ['create', 700], ['switch', 700], ['rename', 750], ['work', 750], ['commit', 850], ['push', 800], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#16a34a' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ branch dene' : '▶ try branch') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ border: '1px solid #334155', borderRadius: 10, background: '#020617', padding: 12, overflow: 'hidden' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                                <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 800 }}>main</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px 1fr 28px', alignItems: 'center' }}>
                                    {['M1', 'line', 'M2', 'line', 'M3'].map((item, idx) => item === 'line'
                                        ? <div key={idx} style={{ height: 3, background: mainReady ? '#22c55e' : '#334155', transition: 'all .35s' }} />
                                        : <div key={idx} style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: mainReady ? '#16a34a' : '#334155', color: '#fff', fontSize: 10, fontWeight: 900 }} className={active('list') ? 'sim-animate' : ''}>{item}</div>)}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 10, alignItems: 'center' }}>
                                <div style={{ color: branchReady ? '#bbf7d0' : '#64748b', fontSize: 10, fontWeight: 800 }}>{renameReady ? 'feature/hasan' : 'hasan'}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px 1fr 28px', alignItems: 'center' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: branchReady ? '#15803d' : '#1e293b', color: branchReady ? '#fff' : '#64748b', fontSize: 10, fontWeight: 900 }} className={active('create') ? 'sim-animate' : ''}>B</div>
                                    <div style={{ height: 3, background: switchReady ? '#60a5fa' : '#334155', transition: 'all .35s' }} />
                                    <div style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: renameReady ? '#7c3aed' : switchReady ? '#2563eb' : '#1e293b', color: switchReady ? '#fff' : '#64748b', fontSize: 10, fontWeight: 900 }} className={active('switch') || active('rename') ? 'sim-animate' : ''}>{renameReady ? 'R' : 'S'}</div>
                                    <div style={{ height: 3, background: commitReady ? '#22c55e' : '#334155', transition: 'all .35s' }} />
                                    <div style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: commitReady ? '#16a34a' : '#1e293b', color: commitReady ? '#fff' : '#64748b', fontSize: 10, fontWeight: 900 }} className={active('commit') ? 'sim-animate' : ''}>C</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                <div style={{ border: `1px solid ${branchReady ? '#22c55e' : '#334155'}`, borderRadius: 9, padding: 8, background: branchReady ? '#052e1655' : '#020617', color: branchReady ? '#bbf7d0' : '#64748b', fontSize: 10 }}>
                                    {isTr ? '`git branch hasan` yeni branch oluşturur ama seni hâlâ main üzerinde bırakır.' : '`git branch hasan` creates a new branch but keeps you on main.'}
                                </div>
                                <div style={{ border: `1px solid ${pushReady ? '#60a5fa' : '#334155'}`, borderRadius: 9, padding: 8, background: pushReady ? '#1d4ed833' : '#020617', color: pushReady ? '#bfdbfe' : '#64748b', fontSize: 10 }}>
                                    {isTr ? '`git push -u` sonraki push/pull hedefini hatırlatır.' : '`git push -u` remembers the next push/pull target.'}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 10, background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 102, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Animasyonu başlat: her branch komutunun repo üzerinde ne değiştirdiğini gör.' : 'Start the animation to see what each branch command changes in the repo.'}</div>}
                            {commands.map(([state, text, color], i) => (order.indexOf(state) <= cur && s !== 'idle')
                                ? <div key={i} style={{ color, fontSize: 10.5, lineHeight: 1.65, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div>
                                : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGitRemoteBranchPublishPlayground = () => {
        const s = simState
        const order = ['idle', 'switch', 'publish', 'remote', 'verify', 'next', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const terminal = [
            ['switch', 'git switch hasan', '#60a5fa'],
            ['publish', 'git push -u origin hasan', '#22c55e'],
            ['publish', '# alternative: git push -u https://github.com/hasankocaman/deneme2.git hasan', '#94a3b8'],
            ['verify', 'git branch -vv', '#fbbf24'],
            ['next', 'git push', '#38bdf8'],
        ]
        return (
            <div style={{ maxWidth: 450, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🚀</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Remote branch publish' : 'Remote branch publish'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'bir kez push -u -> sonra git push' : 'push -u once -> then git push'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['switch', 200], ['publish', 850], ['remote', 850], ['verify', 700], ['next', 650], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0284c7' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ remote aç' : '▶ publish') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>

                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 52px 1fr', gap: 8, alignItems: 'center' }}>
                            <div style={{ border: `1px solid ${reached('switch') ? '#38bdf8' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('switch') ? '#082f4955' : '#020617', minHeight: 96 }}>
                                <div style={{ color: '#bfdbfe', fontSize: 10, fontWeight: 900 }}>LOCAL</div>
                                <div style={{ color: reached('switch') ? '#e0f2fe' : '#64748b', fontSize: 13, fontWeight: 900, marginTop: 6 }}>hasan</div>
                                <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 5 }}>{isTr ? 'Senin bilgisayarındaki branch' : 'Branch on your laptop'}</div>
                                <div style={{ color: reached('switch') ? '#38bdf8' : '#475569', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 7 }}>git switch hasan</div>
                            </div>

                            <div style={{ display: 'grid', placeItems: 'center' }}>
                                <div className={active('publish') || active('remote') ? 'sim-animate' : ''} style={{ width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center', background: reached('remote') ? '#0369a1' : active('publish') ? '#0ea5e9' : '#1e293b', color: '#fff', fontSize: 18, boxShadow: active('publish') ? '0 0 18px rgba(14,165,233,.65)' : 'none', transition: 'all .35s' }}>
                                    →
                                </div>
                            </div>

                            <div style={{ border: `1px solid ${reached('remote') ? '#22c55e' : '#334155'}`, borderRadius: 10, padding: 10, background: reached('remote') ? '#052e1655' : '#020617', minHeight: 96 }}>
                                <div style={{ color: '#bbf7d0', fontSize: 10, fontWeight: 900 }}>GITHUB / ORIGIN</div>
                                <div style={{ color: reached('remote') ? '#dcfce7' : '#64748b', fontSize: 13, fontWeight: 900, marginTop: 6 }}>origin/hasan</div>
                                <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 5 }}>{isTr ? 'Remote branch ilk kez oluşur' : 'Remote branch is created once'}</div>
                                <div style={{ color: reached('verify') ? '#fbbf24' : '#475569', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 7 }}>git branch -vv</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${active('publish') || reached('remote') ? '#22c55e' : '#334155'}`, borderRadius: 9, padding: 9, background: active('publish') || reached('remote') ? '#052e1655' : '#020617' }}>
                                <div style={{ color: '#bbf7d0', fontSize: 10, fontWeight: 900 }}>{isTr ? 'Yöntem 1: origin' : 'Method 1: origin'}</div>
                                <div style={{ color: '#d1fae5', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 5 }}>git push -u origin hasan</div>
                            </div>
                            <div style={{ border: `1px solid ${active('publish') || reached('remote') ? '#38bdf8' : '#334155'}`, borderRadius: 9, padding: 9, background: active('publish') || reached('remote') ? '#082f4955' : '#020617' }}>
                                <div style={{ color: '#bfdbfe', fontSize: 10, fontWeight: 900 }}>{isTr ? 'Yöntem 2: repo URL' : 'Method 2: repo URL'}</div>
                                <div style={{ color: '#dbeafe', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', marginTop: 5, wordBreak: 'break-all' }}>git push -u https://github.com/hasankocaman/deneme2.git hasan</div>
                            </div>
                        </div>

                        <div style={{ border: `1px solid ${reached('next') ? '#38bdf8' : '#334155'}`, borderRadius: 9, padding: 9, background: reached('next') ? '#082f4955' : '#020617', color: reached('next') ? '#dbeafe' : '#94a3b8', fontSize: 10.5 }}>
                            {isTr ? 'Upstream bağlandıktan sonra o branch üzerindeyken uzun komut yok: sadece `git push`.' : 'After upstream is connected, while you are on that branch, no long command is needed: just `git push`.'}
                        </div>

                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 104, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Animasyonu başlat: local branch GitHub’da remote branch’e nasıl dönüşüyor gör.' : 'Start the animation to see a local branch become a GitHub remote branch.'}</div>}
                            {terminal.map(([state, text, color], i) => (order.indexOf(state) <= cur && s !== 'idle')
                                ? <div key={i} style={{ color, fontSize: 10, lineHeight: 1.65, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div>
                                : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGitMergeLabPlayground = () => {
        const s = simState
        const order = ['idle', 'fetch', 'switch', 'merge', 'test', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const steps = [
            ['fetch', 'git fetch origin', isTr ? 'Remote main nerede, önce onu öğren.' : 'First learn where remote main is.'],
            ['switch', 'git switch feature/checkout-tests', isTr ? 'Merge hedefi çalıştığın branch olur.' : 'The merge target is your current branch.'],
            ['merge', 'git merge origin/main', isTr ? 'main değişiklikleri feature branch içine alınır.' : 'main changes are brought into your feature branch.'],
            ['test', 'npm test -- checkout', isTr ? 'Birleşmiş davranış kanıtlanır.' : 'The merged behavior is proven.'],
        ]
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔁</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Merge laboratuvarı' : 'Merge lab'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>main updates → feature branch</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['fetch', 150], ['switch', 650], ['merge', 900], ['test', 850], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#2563eb' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ merge yap' : '▶ merge') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 42px 1fr', gap: 8, alignItems: 'stretch' }}>
                            <div style={{ border: `1px solid ${reached('fetch') ? '#38bdf8' : '#334155'}`, background: reached('fetch') ? '#082f4955' : '#020617', borderRadius: 10, padding: 10 }}>
                                <div style={{ color: reached('fetch') ? '#bae6fd' : '#64748b', fontSize: 10, fontWeight: 900 }}>origin/main</div>
                                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                                    {['M1', 'M2', '+M3'].map((label, i) => (
                                        <div key={label} style={{ width: 32, height: 32, borderRadius: 999, display: 'grid', placeItems: 'center', background: i === 2 && reached('fetch') ? '#0284c7' : '#334155', color: i === 2 && reached('fetch') ? '#e0f2fe' : '#94a3b8', fontSize: 9, fontWeight: 900 }}>{label}</div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'grid', placeItems: 'center', color: reached('merge') ? '#60a5fa' : '#475569', fontSize: 24 }} className={active('merge') ? 'sim-animate' : ''}>→</div>
                            <div style={{ border: `1px solid ${reached('merge') ? '#22c55e' : reached('switch') ? '#a78bfa' : '#334155'}`, background: reached('merge') ? '#052e1655' : reached('switch') ? '#4c1d9555' : '#020617', borderRadius: 10, padding: 10 }}>
                                <div style={{ color: reached('merge') ? '#bbf7d0' : reached('switch') ? '#ddd6fe' : '#64748b', fontSize: 10, fontWeight: 900 }}>feature/checkout-tests</div>
                                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {['M1', 'F1', reached('merge') ? 'M3' : null, reached('merge') ? 'merge' : null].filter(Boolean).map((label) => (
                                        <div key={label} style={{ minWidth: 32, height: 32, borderRadius: label === 'merge' ? 9 : 999, padding: label === 'merge' ? '0 7px' : 0, display: 'grid', placeItems: 'center', background: label === 'merge' ? '#16a34a' : '#334155', color: label === 'merge' ? '#fff' : '#cbd5e1', fontSize: 9, fontWeight: 900 }}>{label}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 10, display: 'grid', gap: 7 }}>
                            {steps.map(([key, cmd, desc], idx) => {
                                const isA = active(key)
                                const isR = reached(key)
                                return (
                                    <div key={key} style={{ border: `1px solid ${isA ? '#60a5fa' : isR ? '#22c55e' : '#334155'}`, background: isA ? '#1d4ed833' : isR ? '#052e1633' : '#020617', borderRadius: 8, padding: '8px 9px', transition: 'all .35s' }}>
                                        <div style={{ color: isR ? '#dbeafe' : '#64748b', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 800 }}>{isR ? '✓' : idx + 1} {cmd}</div>
                                        <div style={{ color: isR ? '#bfdbfe' : '#64748b', fontSize: 9.5, marginTop: 2 }}>{desc}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, borderRadius: 9, padding: 10, background: '#020617', color: reached('test') ? '#86efac' : '#94a3b8', fontSize: 10.5, lineHeight: 1.55 }}>
                            {reached('test')
                                ? (isTr ? 'Temiz merge bitmiş sayılmaz; test geçmeden PR güvenli değildir.' : 'A clean merge is not enough; the PR is not safe until tests pass.')
                                : (isTr ? 'Merge, iki commit hikayesini davranış olarak birleştirme işidir.' : 'Merge means combining two commit stories into one behavior.')}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGitConflictLabPlayground = () => {
        const s = simState
        const order = ['idle', 'pull', 'conflict', 'open', 'resolve', 'test', 'add', 'continue', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const active = key => order.indexOf(key) === cur
        const lines = [
            ['pull', 'git pull --rebase origin main', '#38bdf8'],
            ['conflict', 'CONFLICT (content): tests/login.spec.js', '#fb7185'],
            ['open', 'code tests/login.spec.js', '#fbbf24'],
            ['resolve', isTr ? '# markerlar silinir, final davranış yazılır' : '# remove markers, write final behavior', '#c084fc'],
            ['test', 'npm test -- login.spec.js', '#22c55e'],
            ['add', 'git add tests/login.spec.js', '#22c55e'],
            ['continue', 'git rebase --continue', '#60a5fa'],
        ]
        const markerVisible = reached('conflict') && !reached('resolve')
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🧯</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Conflict çözüm laboratuvarı' : 'Conflict resolver lab'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>status → markers → test → continue</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['pull', 150], ['conflict', 750], ['open', 800], ['resolve', 1000], ['test', 850], ['add', 650], ['continue', 650], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#dc2626' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ conflict çöz' : '▶ resolve') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${markerVisible ? '#fb7185' : reached('resolve') ? '#22c55e' : '#334155'}`, background: '#020617', borderRadius: 10, overflow: 'hidden' }}>
                                <div style={{ padding: '7px 9px', borderBottom: '1px solid #334155', color: markerVisible ? '#fecdd3' : reached('resolve') ? '#bbf7d0' : '#94a3b8', fontSize: 10, fontWeight: 900 }}>tests/login.spec.js</div>
                                <pre style={{ margin: 0, padding: 10, color: '#cbd5e1', fontSize: 10, lineHeight: 1.45, fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap' }}>{markerVisible
                                    ? `<<<<<<< HEAD\nassertLoginError(\"Email required\")\n=======\nassertLoginError(\"Password required\")\n>>>>>>> feature/login-tests`
                                    : reached('resolve')
                                        ? `assertLoginError(\"Email required\")\nassertLoginError(\"Password required\")`
                                        : (isTr ? 'Conflict markerları burada görünecek.' : 'Conflict markers will appear here.')}</pre>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                <div style={{ border: `1px solid ${reached('resolve') ? '#22c55e' : '#334155'}`, borderRadius: 9, padding: 8, background: reached('resolve') ? '#052e1655' : '#020617', color: reached('resolve') ? '#bbf7d0' : '#64748b', fontSize: 10 }}>
                                    {isTr ? 'Doğru çözüm: iki davranışı da anlamlı şekilde birleştir.' : 'Right fix: combine both behaviors intentionally.'}
                                </div>
                                <div style={{ border: `1px solid ${reached('test') ? '#22c55e' : '#334155'}`, borderRadius: 9, padding: 8, background: reached('test') ? '#052e1655' : '#020617', color: reached('test') ? '#bbf7d0' : '#64748b', fontSize: 10 }}>
                                    {isTr ? 'Marker silmek yetmez; testle kanıtla.' : 'Removing markers is not enough; prove it with tests.'}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 10, background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 112, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Conflict panik değil; sıralı bir dosya birleştirme işidir.' : 'A conflict is not panic; it is an ordered file-merge task.'}</div>}
                            {lines.map(([state, text, color], i) => (order.indexOf(state) <= cur && s !== 'idle')
                                ? <div key={i} style={{ color, fontSize: 10.5, lineHeight: 1.65, animation: 'simFadeUp .25s ease-out' }}>$ {text}</div>
                                : null)}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>↺ reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubPrFlowPlayground = () => {
        const s = simState
        const order = ['idle', 'branch', 'commit', 'push', 'pr', 'review', 'checks', 'merge', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const items = [
            ['branch', isTr ? 'Yeni branch aç' : 'Create branch', 'feature/login-tests'],
            ['commit', isTr ? 'Küçük commitler yap' : 'Make small commits', 'test: cover login errors'],
            ['push', isTr ? 'Branch GitHub’a gider' : 'Branch goes to GitHub', 'origin/feature/login-tests'],
            ['pr', 'Pull Request', isTr ? 'Açıklama + reviewer' : 'Description + reviewer'],
            ['review', isTr ? 'Code review' : 'Code review', isTr ? 'yorum, suggestion, approve' : 'comments, suggestions, approve'],
            ['checks', 'CI checks', isTr ? 'unit + e2e + lint' : 'unit + e2e + lint'],
            ['merge', isTr ? 'Merge to main' : 'Merge to main', isTr ? 'korumalı main güncellenir' : 'protected main is updated'],
        ]
        const stateReached = key => order.indexOf(key) <= cur && s !== 'idle'
        return (
            <div style={{ maxWidth: 395, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🐙</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>GitHub PR board</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>branch → PR → review → merge</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['branch', 150], ['commit', 650], ['push', 650], ['pr', 700], ['review', 850], ['checks', 800], ['merge', 700], ['done', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#2563eb' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ PR akışı' : '▶ PR flow') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 7 }}>
                            {items.map(([key, title, detail], idx) => {
                                const reached = stateReached(key)
                                const active = order.indexOf(key) === cur
                                return (
                                    <div key={key} style={{ border: `1px solid ${active ? '#60a5fa' : reached ? '#22c55e' : '#334155'}`, background: active ? '#1d4ed833' : reached ? '#052e1633' : '#020617', borderRadius: 9, padding: '8px 10px', color: reached ? '#dcfce7' : active ? '#dbeafe' : '#64748b', transition: 'all .35s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ width: 23, height: 23, borderRadius: 999, display: 'grid', placeItems: 'center', background: reached ? '#16a34a' : active ? '#2563eb' : '#334155', color: '#fff', fontSize: 10, fontWeight: 800 }}>{reached ? '✓' : idx + 1}</span>
                                            <div>
                                                <div style={{ fontSize: 11.5, fontWeight: 800 }}>{title}</div>
                                                <div style={{ fontSize: 9.5, color: reached || active ? '#bfdbfe' : '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{detail}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, borderRadius: 9, padding: 10, background: '#020617', color: s === 'done' ? '#86efac' : '#94a3b8', fontSize: 10.5, lineHeight: 1.55 }}>
                            {s === 'done'
                                ? (isTr ? 'main branch güncellendi; herkes yeni main üzerinden pull alabilir.' : 'main branch is updated; the team can pull the new main.')
                                : (isTr ? 'PR açmadan main’e doğrudan push yapmak review ve CI kontrolünü atlatır.' : 'Pushing directly to main skips review and CI protection.')}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubPullRequestUiTourPlayground = () => {
        const s = simState
        const order = ['idle', 'tab', 'new', 'compare', 'form', 'conversation', 'files', 'review', 'checks', 'merge']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'merge'
        const active = key => order.indexOf(key) === cur
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        const nav = ['Code', 'Issues', 'Pull requests', 'Actions', 'Projects', 'Wiki', 'Security', 'Insights', 'Settings']
        const prTabs = ['Conversation', 'Commits', 'Checks', 'Files changed']
        return (
            <div style={{ width: '100%', maxWidth: 560, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ border: '1px solid #30363d', borderRadius: 12, overflow: 'hidden', background: '#0d1117', color: '#e6edf3' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderBottom: '1px solid #30363d', background: '#010409' }}>
                        <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#f0f6fc', color: '#0d1117', fontWeight: 900 }}>GH</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: 11, color: '#8b949e' }}>hasankocaman /</div>
                            <div style={{ fontSize: 12, fontWeight: 800 }}>automationexercise</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['tab', 120], ['new', 650], ['compare', 750], ['form', 850], ['conversation', 850], ['files', 800], ['review', 800], ['checks', 800], ['merge', 700]])}
                            disabled={!canStart}
                            style={{ border: 0, borderRadius: 6, padding: '5px 9px', background: canStart ? '#238636' : '#30363d', color: '#fff', fontSize: 10.5, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ PR ekranı' : '▶ PR screen') : s === 'merge' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: 4, padding: '7px 9px 0', borderBottom: '1px solid #30363d', background: '#010409', overflowX: 'auto' }}>
                        {nav.map(item => (
                            <div key={item} style={{ padding: '7px 7px', borderBottom: item === 'Pull requests' ? '2px solid #f78166' : '2px solid transparent', color: item === 'Pull requests' ? '#f0f6fc' : '#8b949e', fontSize: 10.5, fontWeight: item === 'Pull requests' ? 800 : 600, whiteSpace: 'nowrap' }}>{item}</div>
                        ))}
                    </div>
                    <div style={{ padding: 12 }}>
                        {(active('tab') || active('new') || active('compare') || active('form') || s === 'idle') && (
                            <div style={{ display: 'grid', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ fontSize: 18, fontWeight: 850, flex: 1 }}>Pull requests</div>
                                    <span style={{ borderRadius: 6, padding: '6px 9px', background: active('new') ? '#2ea043' : '#238636', color: '#fff', fontSize: 10.5, fontWeight: 800, boxShadow: active('new') ? '0 0 0 2px #56d36466' : 'none' }}>New pull request</span>
                                </div>
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                    <div style={{ color: '#8b949e', fontSize: 10, marginBottom: 8 }}>Compare changes</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
                                        <div style={{ border: `1px solid ${active('compare') ? '#58a6ff' : '#30363d'}`, borderRadius: 6, padding: 8, background: '#0d1117' }}>
                                            <div style={{ fontSize: 9, color: '#8b949e' }}>base</div>
                                            <div style={{ fontSize: 11, fontWeight: 800 }}>main ▾</div>
                                        </div>
                                        <span style={{ color: '#8b949e' }}>←</span>
                                        <div style={{ border: `1px solid ${active('compare') ? '#58a6ff' : '#30363d'}`, borderRadius: 6, padding: 8, background: '#0d1117' }}>
                                            <div style={{ fontSize: 9, color: '#8b949e' }}>compare</div>
                                            <div style={{ fontSize: 11, fontWeight: 800 }}>feature/login-tests ▾</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 10, display: 'inline-block', borderRadius: 6, padding: '6px 9px', background: reached('compare') ? '#238636' : '#21262d', color: reached('compare') ? '#fff' : '#8b949e', fontSize: 10.5, fontWeight: 800 }}>Create pull request</div>
                                </div>
                                {reached('form') && (
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22', animation: 'simFadeUp .25s ease-out' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 7 }}>Open a pull request</div>
                                        <div style={{ border: '1px solid #30363d', borderRadius: 6, padding: 7, fontSize: 10.5, background: '#0d1117', color: '#f0f6fc' }}>test: add login regression checks</div>
                                        <div style={{ border: '1px solid #30363d', borderRadius: 6, padding: 7, fontSize: 10, background: '#0d1117', color: '#8b949e', marginTop: 7 }}>What changed? Added login negative checks. Tested with npm test -- login.spec.js.</div>
                                        <div style={{ display: 'flex', gap: 7, marginTop: 8, flexWrap: 'wrap' }}>
                                            <span style={{ color: '#8b949e', fontSize: 10 }}>Reviewers: qa-lead</span>
                                            <span style={{ borderRadius: 6, padding: '5px 8px', background: '#238636', color: '#fff', fontSize: 10, fontWeight: 800 }}>Create pull request</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {(active('conversation') || active('files') || active('review') || active('checks') || active('merge')) && (
                            <div style={{ display: 'grid', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                    <span style={{ borderRadius: 999, padding: '3px 8px', background: active('merge') ? '#8250df' : '#238636', color: '#fff', fontSize: 10, fontWeight: 800 }}>{active('merge') ? 'Merged' : 'Open'}</span>
                                    <div style={{ fontSize: 16, fontWeight: 850 }}>test: add login regression checks <span style={{ color: '#8b949e', fontSize: 12 }}>#42</span></div>
                                </div>
                                <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
                                    {prTabs.map(tab => {
                                        const on = (tab === 'Conversation' && (active('conversation') || active('checks') || active('merge'))) || (tab === 'Files changed' && (active('files') || active('review'))) || (tab === 'Checks' && active('checks'))
                                        return <div key={tab} style={{ borderBottom: on ? '2px solid #f78166' : '2px solid transparent', padding: '7px 8px', color: on ? '#f0f6fc' : '#8b949e', fontSize: 10.5, fontWeight: on ? 800 : 600, whiteSpace: 'nowrap' }}>{tab}</div>
                                    })}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 132px', gap: 10 }}>
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, background: '#161b22', overflow: 'hidden' }}>
                                        {active('files') || active('review') ? (
                                            <>
                                                <div style={{ padding: 8, borderBottom: '1px solid #30363d', color: '#8b949e', fontSize: 10 }}>Files changed · tests/login.spec.js</div>
                                                <pre style={{ margin: 0, padding: 10, color: '#c9d1d9', fontSize: 9.5, lineHeight: 1.55, fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap' }}>{`+ test('shows login errors', async ({ page }) => {
+   await expect(page.getByText('Email required')).toBeVisible()
+   await expect(page.getByText('Password required')).toBeVisible()
+ })`}</pre>
                                                {active('review') && <div style={{ margin: 10, border: '1px solid #58a6ff', borderRadius: 8, padding: 8, color: '#dbeafe', background: '#1f6feb22', fontSize: 10 }}>Review changes ▾ · Approve · Request changes · Submit review</div>}
                                            </>
                                        ) : (
                                            <>
                                                <div style={{ padding: 9, borderBottom: '1px solid #30363d', fontSize: 10.5, color: '#c9d1d9' }}>Author added test evidence and requested review.</div>
                                                <div style={{ padding: 9, borderBottom: '1px solid #30363d', fontSize: 10.5, color: reached('checks') ? '#7ee787' : '#8b949e' }}>✓ Required checks {reached('checks') ? 'passed' : 'waiting'}</div>
                                                <div style={{ padding: 9, fontSize: 10.5, color: active('merge') ? '#d2a8ff' : '#8b949e' }}>{active('merge') ? 'Pull request successfully merged and closed' : 'Merge box waits for review and checks.'}</div>
                                            </>
                                        )}
                                    </div>
                                    <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                                        <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, background: '#161b22' }}>
                                            <div style={{ color: '#8b949e', fontSize: 9 }}>Reviewers</div>
                                            <div style={{ color: reached('review') ? '#7ee787' : '#c9d1d9', fontSize: 10.5, fontWeight: 800 }}>qa-lead {reached('review') ? '✓' : 'requested'}</div>
                                        </div>
                                        <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, background: active('merge') ? '#23863622' : '#161b22', color: active('merge') ? '#7ee787' : '#8b949e', fontSize: 10.5, fontWeight: 800 }}>Merge pull request</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #30363d', background: '#010409', color: '#8b949e', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubPrReviewConflictPlayground = () => {
        const s = simState
        const order = ['idle', 'files', 'comment', 'review', 'request', 'conflict', 'local', 'test', 'push', 'ready']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'ready'
        const active = key => order.indexOf(key) === cur
        const reached = key => order.indexOf(key) <= cur && s !== 'idle'
        return (
            <div style={{ width: '100%', maxWidth: 560, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ border: '1px solid #30363d', borderRadius: 12, overflow: 'hidden', background: '#0d1117', color: '#e6edf3' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #30363d', background: '#010409' }}>
                        <span style={{ fontWeight: 900 }}>GH</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 850 }}>Pull request review</div>
                            <div style={{ color: '#8b949e', fontSize: 10 }}>Files changed → Review changes → conflict fix</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['files', 120], ['comment', 700], ['review', 750], ['request', 800], ['conflict', 850], ['local', 900], ['test', 850], ['push', 700], ['ready', 650]])}
                            disabled={!canStart}
                            style={{ border: 0, borderRadius: 6, padding: '5px 9px', background: canStart ? '#7c3aed' : '#30363d', color: '#fff', fontSize: 10.5, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ review yap' : '▶ review') : s === 'ready' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 5, overflowX: 'auto' }}>
                            {['Conversation', 'Commits', 'Checks', 'Files changed'].map(tab => {
                                const on = tab === 'Files changed'
                                    ? (active('files') || active('comment') || active('review') || active('request'))
                                    : tab === 'Conversation'
                                        ? (active('conflict') || active('local') || active('test') || active('push') || active('ready') || s === 'idle')
                                        : false
                                return <div key={tab} style={{ padding: '7px 8px', borderBottom: on ? '2px solid #f78166' : '2px solid transparent', color: on ? '#f0f6fc' : '#8b949e', fontSize: 10.5, fontWeight: on ? 800 : 600, whiteSpace: 'nowrap' }}>{tab}</div>
                            })}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 150px', gap: 10 }}>
                            <div style={{ border: '1px solid #30363d', borderRadius: 8, background: '#161b22', overflow: 'hidden' }}>
                                {(active('files') || active('comment') || active('review') || active('request')) && (
                                    <>
                                        <div style={{ padding: 8, borderBottom: '1px solid #30363d', color: '#8b949e', fontSize: 10 }}>tests/login.spec.js</div>
                                        <pre style={{ margin: 0, padding: 10, color: '#c9d1d9', fontSize: 9.5, lineHeight: 1.5, fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap' }}>{`+ await expect(error).toContainText('Email required')
+ await expect(error).toContainText('Password required')`}</pre>
                                        {reached('comment') && <div style={{ margin: 10, border: '1px solid #58a6ff', borderRadius: 8, padding: 8, background: '#1f6feb22', color: '#dbeafe', fontSize: 10 }}>{isTr ? 'Satır yorumu: Password case için data-testid de ekleyelim.' : 'Line comment: add data-testid for the password case too.'}</div>}
                                        {reached('review') && <div style={{ margin: 10, border: '1px solid #30363d', borderRadius: 8, padding: 8, background: '#0d1117', fontSize: 10 }}>
                                            <div style={{ fontWeight: 850, marginBottom: 6 }}>Review changes</div>
                                            <div style={{ color: reached('request') ? '#f2cc60' : '#8b949e' }}>○ Comment · ○ Approve · ● Request changes</div>
                                            <div style={{ marginTop: 6, display: 'inline-block', borderRadius: 6, padding: '5px 8px', background: reached('request') ? '#f2cc60' : '#30363d', color: reached('request') ? '#111827' : '#8b949e', fontWeight: 850 }}>Submit review</div>
                                        </div>}
                                    </>
                                )}
                                {(active('conflict') || active('local') || active('test') || active('push') || active('ready')) && (
                                    <div style={{ padding: 10 }}>
                                        <div style={{ border: `1px solid ${active('conflict') ? '#f85149' : '#3fb950'}`, borderRadius: 8, padding: 9, background: active('conflict') ? '#f8514922' : '#23863622', color: active('conflict') ? '#ffb4ad' : '#7ee787', fontSize: 11, fontWeight: 850 }}>
                                            {active('conflict') ? 'This branch has conflicts that must be resolved' : 'This branch has no conflicts with the base branch'}
                                        </div>
                                        <div style={{ marginTop: 9, border: '1px solid #30363d', borderRadius: 8, padding: 9, background: '#0d1117', fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, lineHeight: 1.55, color: '#c9d1d9' }}>
                                            {active('conflict') && `<<<<<<< main\nassertLoginError('Email required')\n=======\nassertLoginError('Password required')\n>>>>>>> feature/login-tests`}
                                            {active('local') && `$ git fetch origin\n$ git switch feature/login-tests\n$ git merge origin/main\n# edit conflict markers locally`}
                                            {active('test') && `$ npm test -- login.spec.js\n✓ login negative checks passed`}
                                            {active('push') && `$ git add tests/login.spec.js\n$ git commit -m "fix: resolve PR conflict"\n$ git push`}
                                            {active('ready') && `✓ Approved\n✓ Required checks passed\n✓ No conflicts\nMerge pull request`}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, background: '#161b22' }}>
                                    <div style={{ color: '#8b949e', fontSize: 9 }}>Review</div>
                                    <div style={{ color: reached('ready') ? '#7ee787' : reached('request') ? '#f2cc60' : '#c9d1d9', fontSize: 10.5, fontWeight: 850 }}>{reached('ready') ? 'Approved' : reached('request') ? 'Changes requested' : 'Pending'}</div>
                                </div>
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, background: '#161b22' }}>
                                    <div style={{ color: '#8b949e', fontSize: 9 }}>Checks</div>
                                    <div style={{ color: reached('test') ? '#7ee787' : '#8b949e', fontSize: 10.5, fontWeight: 850 }}>{reached('test') ? 'Passing' : 'Waiting'}</div>
                                </div>
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, background: reached('ready') ? '#23863622' : '#161b22', color: reached('ready') ? '#7ee787' : '#8b949e', fontSize: 10.5, fontWeight: 850 }}>Merge pull request</div>
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #30363d', background: '#010409', color: '#8b949e', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubActionsUiTourPlayground = () => {
        const s = simState
        const order = ['idle', 'tab', 'newWorkflow', 'workflow', 'run', 'logs', 'artifact', 'rerun']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'rerun'
        const active = key => order.indexOf(key) === cur
        const ready = key => order.indexOf(key) <= cur && s !== 'idle'
        const nav = ['Code', 'Issues', 'Pull requests', 'Actions', 'Projects', 'Wiki', 'Security', 'Insights', 'Settings']
        const runs = [
            { title: 'docs: update GitHub UI guide', status: 'ok', branch: 'main', time: '51s' },
            { title: 'feat: add Pages deployment', status: 'ok', branch: 'main', time: '53s' },
            { title: 'test: flaky checkout spec', status: 'fail', branch: 'feature/login', time: '16s' },
        ]
        return (
            <div style={{ maxWidth: 520, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ border: '1px solid #30363d', borderRadius: 12, overflow: 'hidden', background: '#0d1117', color: '#e6edf3' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderBottom: '1px solid #30363d', background: '#010409' }}>
                        <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#f0f6fc', color: '#0d1117', fontWeight: 900 }}>GH</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: 11, color: '#8b949e' }}>hasankocaman /</div>
                            <div style={{ fontSize: 12, fontWeight: 800 }}>automationexercise</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['tab', 120], ['newWorkflow', 700], ['workflow', 800], ['run', 850], ['logs', 850], ['artifact', 750], ['rerun', 650]])}
                            disabled={!canStart}
                            style={{ border: 0, borderRadius: 6, padding: '5px 9px', background: canStart ? '#238636' : '#30363d', color: '#fff', fontSize: 10.5, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ ekranı gez' : '▶ tour UI') : s === 'rerun' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: 4, padding: '7px 9px 0', borderBottom: '1px solid #30363d', background: '#010409', overflowX: 'auto' }}>
                        {nav.map(item => (
                            <div key={item} style={{ padding: '7px 7px', borderBottom: item === 'Actions' ? '2px solid #f78166' : '2px solid transparent', color: item === 'Actions' ? '#f0f6fc' : '#8b949e', fontSize: 10.5, fontWeight: item === 'Actions' ? 800 : 600, whiteSpace: 'nowrap' }}>{item}</div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '145px 1fr', minHeight: 285 }}>
                        <div style={{ borderRight: '1px solid #30363d', padding: 10, background: '#0d1117' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                                <div style={{ fontSize: 16, fontWeight: 800 }}>Actions</div>
                                <div style={{ padding: '5px 7px', borderRadius: 6, background: active('newWorkflow') ? '#2ea043' : '#238636', color: '#fff', fontSize: 9.5, fontWeight: 800, boxShadow: active('newWorkflow') ? '0 0 0 2px #56d36466' : 'none' }}>New workflow</div>
                            </div>
                            {['All workflows', 'Deploy LearnQA.dev to GitHub Pages', 'QA Checks'].map((item, idx) => (
                                <div key={item} style={{ padding: '7px 8px', borderRadius: 6, marginBottom: 5, background: idx === 0 || active('workflow') ? '#21262d' : 'transparent', color: idx === 0 ? '#f0f6fc' : '#c9d1d9', fontSize: 10.5, fontWeight: idx === 0 ? 800 : 600, border: active('workflow') && idx === 1 ? '1px solid #58a6ff' : '1px solid transparent' }}>{item}</div>
                            ))}
                            <div style={{ marginTop: 12, color: '#8b949e', fontSize: 9, fontWeight: 800 }}>Management</div>
                            {['Caches', 'Deployments', 'Runners', 'Usage metrics'].map(item => <div key={item} style={{ color: '#c9d1d9', fontSize: 10, padding: '5px 2px' }}>{item}</div>)}
                        </div>
                        <div style={{ padding: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <div style={{ fontSize: 16, fontWeight: 800, flex: 1 }}>{active('logs') || active('artifact') || active('rerun') ? (isTr ? 'Run detayları' : 'Run details') : 'All workflows'}</div>
                                <div style={{ border: '1px solid #30363d', borderRadius: 6, padding: '6px 8px', color: '#8b949e', fontSize: 10 }}>Filter workflow runs</div>
                            </div>
                            {!(active('logs') || active('artifact') || active('rerun')) && (
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, overflow: 'hidden' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 52px 42px', gap: 6, padding: '8px 10px', background: '#161b22', color: '#8b949e', fontSize: 9.5, fontWeight: 800 }}>
                                        <span>74 workflow runs</span><span>Branch</span><span>Status</span>
                                    </div>
                                    {runs.map((run, idx) => (
                                        <div key={run.title} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 52px 42px', gap: 6, alignItems: 'center', padding: '9px 10px', borderTop: '1px solid #30363d', background: active('run') && idx === 0 ? '#1f6feb22' : 'transparent' }}>
                                            <span style={{ color: run.status === 'ok' ? '#3fb950' : '#f85149', fontSize: 15 }}>{run.status === 'ok' ? '●' : '×'}</span>
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ color: '#e6edf3', fontSize: 10.8, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{run.title}</div>
                                                <div style={{ color: '#8b949e', fontSize: 9.5 }}>Commit a1b2c3d · {run.time}</div>
                                            </div>
                                            <span style={{ color: '#58a6ff', background: '#1f6feb26', borderRadius: 999, padding: '2px 6px', fontSize: 9 }}>{run.branch}</span>
                                            <span style={{ color: '#8b949e', fontSize: 18 }}>⋯</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(active('logs') || active('artifact') || active('rerun')) && (
                                <div style={{ display: 'grid', gap: 8 }}>
                                    {['build', 'test', 'deploy'].map((job, idx) => (
                                        <div key={job} style={{ border: '1px solid #30363d', borderRadius: 8, padding: 9, background: idx === 1 && active('logs') ? '#3d2b0029' : '#161b22' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: idx === 1 && active('logs') ? '#f2cc60' : '#3fb950', fontSize: 11, fontWeight: 800 }}>
                                                <span>{idx === 1 && active('logs') ? '⚠ ' : '✓ '}{job}</span><span>{idx === 1 && active('logs') ? 'open logs' : 'passed'}</span>
                                            </div>
                                            {idx === 1 && active('logs') && <div style={{ marginTop: 6, fontFamily: 'JetBrains Mono, monospace', color: '#f2cc60', fontSize: 9.5 }}>Error: locator timeout in checkout.spec.ts</div>}
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        <span style={{ border: '1px solid #30363d', borderRadius: 6, padding: '5px 7px', color: active('artifact') ? '#7ee787' : '#8b949e', fontSize: 10 }}>Artifacts: playwright-report.zip</span>
                                        <span style={{ border: '1px solid #30363d', borderRadius: 6, padding: '5px 7px', color: active('rerun') ? '#58a6ff' : '#8b949e', fontSize: 10 }}>Re-run failed jobs</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #30363d', background: '#010409', color: '#8b949e', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubPagesSettingsUiPlayground = () => {
        const s = simState
        const order = ['idle', 'settings', 'pages', 'source', 'domain', 'https', 'visit']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'visit'
        const active = key => order.indexOf(key) === cur
        const ready = key => order.indexOf(key) <= cur && s !== 'idle'
        return (
            <div style={{ maxWidth: 520, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ border: '1px solid #30363d', borderRadius: 12, overflow: 'hidden', background: '#0d1117', color: '#e6edf3' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #30363d', background: '#010409' }}>
                        <span style={{ fontWeight: 900 }}>GH</span>
                        <span style={{ fontSize: 12, fontWeight: 800, flex: 1 }}>hasankocaman / automationexercise</span>
                        <button
                            onClick={() => canStart && runSteps([['settings', 120], ['pages', 750], ['source', 850], ['domain', 850], ['https', 850], ['visit', 700]])}
                            disabled={!canStart}
                            style={{ border: 0, borderRadius: 6, padding: '5px 9px', background: canStart ? '#238636' : '#30363d', color: '#fff', fontSize: 10.5, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ Pages gez' : '▶ tour Pages') : s === 'visit' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: 4, padding: '7px 9px 0', borderBottom: '1px solid #30363d', background: '#010409', overflowX: 'auto' }}>
                        {['Code', 'Issues', 'Pull requests', 'Actions', 'Projects', 'Wiki', 'Security', 'Insights', 'Settings'].map(item => (
                            <div key={item} style={{ padding: '7px 7px', borderBottom: item === 'Settings' ? '2px solid #f78166' : '2px solid transparent', color: item === 'Settings' ? '#f0f6fc' : '#8b949e', fontSize: 10.5, fontWeight: item === 'Settings' ? 800 : 600, whiteSpace: 'nowrap' }}>{item}</div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '145px 1fr', minHeight: 300 }}>
                        <div style={{ borderRight: '1px solid #30363d', padding: 10 }}>
                            {['General', 'Collaborators', 'Branches', 'Rules', 'Actions', 'Webhooks', 'Environments', 'Codespaces', 'Pages'].map(item => (
                                <div key={item} style={{ padding: '7px 8px', borderRadius: 6, marginBottom: 4, background: item === 'Pages' && ready('pages') ? '#21262d' : 'transparent', borderLeft: item === 'Pages' && ready('pages') ? '3px solid #1f6feb' : '3px solid transparent', color: item === 'Pages' && ready('pages') ? '#f0f6fc' : '#c9d1d9', fontSize: 10.5, fontWeight: item === 'Pages' && ready('pages') ? 800 : 600 }}>{item}</div>
                            ))}
                        </div>
                        <div style={{ padding: 14 }}>
                            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>GitHub Pages</div>
                            <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 12, marginBottom: 12, background: '#0d1117' }}>
                                <div style={{ color: ready('visit') ? '#7ee787' : '#e6edf3', fontSize: 12, fontWeight: 800 }}>{ready('visit') ? 'Your site is live at https://learnqa.dev/' : 'Your site will be published here'}</div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 9, flexWrap: 'wrap' }}>
                                    <span style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid #30363d', background: active('visit') ? '#1f6feb' : '#21262d', color: '#fff', fontSize: 10, fontWeight: 800 }}>Visit site</span>
                                    <span style={{ padding: '6px 9px', borderRadius: 6, border: '1px solid #30363d', background: '#21262d', color: '#ff7b72', fontSize: 10, fontWeight: 800 }}>Unpublish site</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Build and deployment</div>
                            <div style={{ display: 'grid', gap: 9 }}>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>Source</div>
                                    <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', border: '1px solid #30363d', borderRadius: 6, padding: '7px 9px', background: active('source') || ready('source') ? '#1f6feb22' : '#21262d', color: '#f0f6fc', fontSize: 11, fontWeight: 800 }}>GitHub Actions ▾</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>Custom domain</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        <span style={{ minWidth: 150, border: '1px solid #30363d', borderRadius: 6, padding: '7px 9px', color: ready('domain') ? '#f0f6fc' : '#8b949e', background: '#010409', fontSize: 11 }}>{ready('domain') ? 'learnqa.dev' : 'domain.com'}</span>
                                        <span style={{ border: '1px solid #30363d', borderRadius: 6, padding: '7px 9px', background: active('domain') ? '#238636' : '#21262d', color: '#fff', fontSize: 11, fontWeight: 800 }}>Save</span>
                                        <span style={{ border: '1px solid #30363d', borderRadius: 6, padding: '7px 9px', background: '#21262d', color: '#ff7b72', fontSize: 11, fontWeight: 800 }}>Remove</span>
                                    </div>
                                    <div style={{ marginTop: 5, color: ready('domain') ? '#f2cc60' : '#8b949e', fontSize: 10 }}>● DNS Check in Progress</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: ready('https') ? '#7ee787' : '#8b949e', fontSize: 11, fontWeight: 800 }}>
                                    <span style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid #8b949e', background: ready('https') ? '#1f6feb' : 'transparent', display: 'grid', placeItems: 'center', fontSize: 9 }}>✓</span> Enforce HTTPS
                                </div>
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #30363d', background: '#010409', color: '#8b949e', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubRepoSettingsTourPlayground = () => {
        const s = simState
        const order = ['idle', 'settings', 'collaborators', 'visibility', 'branches', 'secrets', 'pages']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'pages'
        const active = key => order.indexOf(key) === cur
        const ready = key => order.indexOf(key) <= cur && s !== 'idle'
        const menu = [
            ['general', 'General'],
            ['collaborators', 'Collaborators'],
            ['branches', 'Branches'],
            ['actions', 'Actions'],
            ['secrets', 'Secrets and variables'],
            ['webhooks', 'Webhooks'],
            ['environments', 'Environments'],
            ['pages', 'Pages'],
        ]
        const title = active('collaborators') ? 'Collaborators' : active('visibility') ? 'General · Change visibility' : active('branches') ? 'Branches · Rules' : active('secrets') ? 'Secrets and variables · Actions' : active('pages') ? 'Pages' : 'Repository Settings'
        return (
            <div style={{ maxWidth: 520, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ border: '1px solid #30363d', borderRadius: 12, overflow: 'hidden', background: '#0d1117', color: '#e6edf3' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #30363d', background: '#010409' }}>
                        <span style={{ fontWeight: 900 }}>GH</span>
                        <span style={{ fontSize: 12, fontWeight: 800, flex: 1 }}>Settings</span>
                        <button
                            onClick={() => canStart && runSteps([['settings', 120], ['collaborators', 800], ['visibility', 850], ['branches', 850], ['secrets', 850], ['pages', 800]])}
                            disabled={!canStart}
                            style={{ border: 0, borderRadius: 6, padding: '5px 9px', background: canStart ? '#6b7280' : '#30363d', color: '#fff', fontSize: 10.5, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ Settings gez' : '▶ tour Settings') : s === 'pages' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', minHeight: 305 }}>
                        <div style={{ borderRight: '1px solid #30363d', padding: 10 }}>
                            {menu.map(([key, label]) => {
                                const on = (key === 'general' && (active('settings') || active('visibility'))) || active(key) || (key === 'pages' && active('pages'))
                                return <div key={key} style={{ padding: '7px 8px', borderRadius: 6, marginBottom: 4, background: on ? '#21262d' : 'transparent', borderLeft: on ? '3px solid #1f6feb' : '3px solid transparent', color: on ? '#f0f6fc' : '#c9d1d9', fontSize: 10.5, fontWeight: on ? 800 : 600 }}>{label}</div>
                            })}
                        </div>
                        <div style={{ padding: 14 }}>
                            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{title}</div>
                            {active('collaborators') && (
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <div style={{ color: '#8b949e', fontSize: 11 }}>{isTr ? 'Access → Collaborators ekranında kişiyi davet edersin.' : 'Invite a person from Access → Collaborators.'}</div>
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800 }}>Manage access</div>
                                        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}><span style={{ flex: 1, border: '1px solid #30363d', borderRadius: 6, padding: 7, color: '#8b949e', fontSize: 10 }}>username or email</span><span style={{ borderRadius: 6, padding: 7, background: '#238636', color: '#fff', fontSize: 10, fontWeight: 800 }}>Add people</span></div>
                                    </div>
                                </div>
                            )}
                            {active('visibility') && (
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800 }}>Visibility</div>
                                        <div style={{ color: '#8b949e', fontSize: 10, marginTop: 5 }}>Private / Public</div>
                                        <div style={{ marginTop: 8, display: 'inline-block', border: '1px solid #f85149', color: '#ff7b72', borderRadius: 6, padding: '6px 8px', fontSize: 10, fontWeight: 800 }}>Change visibility</div>
                                    </div>
                                    <div style={{ color: '#f2cc60', fontSize: 10 }}>{isTr ? 'Uyarı: Public yapmak private kodu ve issue/PR geçmişini görünür kılabilir.' : 'Warning: making public can expose private code and issue/PR history.'}</div>
                                </div>
                            )}
                            {active('branches') && (
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                    <div style={{ fontSize: 11, fontWeight: 800 }}>Branch protection rule</div>
                                    <div style={{ display: 'grid', gap: 5, marginTop: 8, color: '#c9d1d9', fontSize: 10 }}>
                                        <span>✓ Require a pull request before merging</span>
                                        <span>✓ Require status checks to pass</span>
                                        <span>✓ Block direct pushes to main</span>
                                    </div>
                                </div>
                            )}
                            {active('secrets') && (
                                <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                    <div style={{ fontSize: 11, fontWeight: 800 }}>Actions secrets</div>
                                    <div style={{ color: '#8b949e', fontSize: 10, marginTop: 5 }}>API_TOKEN · masked value</div>
                                    <div style={{ marginTop: 8, display: 'inline-block', borderRadius: 6, padding: '6px 8px', background: '#238636', color: '#fff', fontSize: 10, fontWeight: 800 }}>New repository secret</div>
                                </div>
                            )}
                            {active('pages') && (
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 10, background: '#161b22' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800 }}>Pages source</div>
                                        <div style={{ color: '#58a6ff', fontSize: 10, marginTop: 5 }}>GitHub Actions</div>
                                        <div style={{ color: '#7ee787', fontSize: 10, marginTop: 8 }}>learnqa.dev · Enforce HTTPS enabled</div>
                                    </div>
                                    <div style={{ border: '1px solid #30363d', borderRadius: 8, padding: 9, background: '#0d1117' }}>
                                        <div style={{ fontSize: 10.5, fontWeight: 800, marginBottom: 7 }}>{isTr ? 'Settings kontrol özeti' : 'Settings checklist'}</div>
                                        {['Add people', 'Change visibility', 'Branch protection rule', 'New repository secret'].map(item => (
                                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9d1d9', fontSize: 9.5, marginTop: 4 }}>
                                                <span style={{ color: '#7ee787', fontWeight: 900 }}>✓</span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(active('settings') || s === 'idle') && (
                                <div style={{ display: 'grid', gap: 8 }}>
                                    {['General', 'Collaborators', 'Branches', 'Actions permissions', 'Secrets', 'Pages'].map((item, idx) => (
                                        <div key={item} style={{ border: '1px solid #30363d', borderRadius: 8, padding: 8, color: idx === 0 && ready('settings') ? '#58a6ff' : '#c9d1d9', background: '#161b22', fontSize: 10.5, fontWeight: 700 }}>{idx + 1}. {item}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #30363d', background: '#010409', color: '#8b949e', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGithubActionsPagesPlayground = () => {
        const s = simState
        const order = ['idle', 'push', 'trigger', 'checkout', 'install', 'test', 'build', 'artifact', 'deploy', 'live']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'live'
        const jobs = [
            ['trigger', 'on: push', isTr ? 'main branch değişti' : 'main branch changed'],
            ['checkout', 'actions/checkout', isTr ? 'repo runner’a iner' : 'repo is checked out'],
            ['install', 'npm ci', isTr ? 'lockfile ile bağımlılık' : 'dependencies from lockfile'],
            ['test', 'npm test', isTr ? 'test ve lint kapısı' : 'test and lint gate'],
            ['build', 'npm run build', isTr ? 'dist klasörü oluşur' : 'dist folder is created'],
            ['artifact', 'upload-pages-artifact', isTr ? 'Pages artifact hazırlanır' : 'Pages artifact is prepared'],
            ['deploy', 'deploy-pages', isTr ? 'GitHub Pages yayınlar' : 'GitHub Pages publishes'],
        ]
        const ready = key => order.indexOf(key) <= cur && s !== 'idle'
        return (
            <div style={{ maxWidth: 405, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🚀</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>Actions → Pages</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>push → workflow → deploy</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['push', 120], ['trigger', 650], ['checkout', 600], ['install', 700], ['test', 750], ['build', 750], ['artifact', 650], ['deploy', 700], ['live', 450]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#7c3aed' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ deploy et' : '▶ deploy') : s === 'live' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12 }}>
                        <div style={{ display: 'grid', gap: 6 }}>
                            {jobs.map(([key, title, desc]) => {
                                const isReady = ready(key)
                                const active = order.indexOf(key) === cur
                                return (
                                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 8, alignItems: 'center' }}>
                                        <div style={{ color: active ? '#ddd6fe' : isReady ? '#bbf7d0' : '#64748b', fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, fontWeight: 800 }}>{isReady ? '✓' : active ? '→' : '·'} {title}</div>
                                        <div style={{ height: 10, borderRadius: 999, background: '#020617', overflow: 'hidden', border: '1px solid #334155' }}>
                                            <div style={{ width: isReady ? '100%' : active ? '55%' : '0%', height: '100%', background: active ? '#a78bfa' : '#22c55e', transition: 'width .35s' }} />
                                        </div>
                                        <div style={{ gridColumn: '2 / 3', marginTop: -3, color: active || isReady ? '#cbd5e1' : '#64748b', fontSize: 9 }}>{desc}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: '1px solid #334155', borderRadius: 9, padding: 9, background: '#020617' }}>
                                <div style={{ color: '#94a3b8', fontSize: 9, fontWeight: 800 }}>permissions</div>
                                <div style={{ color: cur >= order.indexOf('deploy') ? '#86efac' : '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>pages: write</div>
                            </div>
                            <div style={{ border: '1px solid #334155', borderRadius: 9, padding: 9, background: '#020617' }}>
                                <div style={{ color: '#94a3b8', fontSize: 9, fontWeight: 800 }}>site</div>
                                <div style={{ color: s === 'live' ? '#86efac' : '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>{s === 'live' ? 'learnqa.dev' : 'waiting...'}</div>
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    // === REST ASSURED CHAIN PLAYGROUND — IntelliJ Test Runner ===
    const renderRestAssuredPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'given', 'when', 'sending', 'then', 'asserting', 'done']
        const cur = order.indexOf(s)
        const isActive = (key) => order.indexOf(key) === cur
        const isDoneKey = (key) => order.indexOf(key) < cur && s !== 'idle'

        // IntelliJ IDEA dark theme
        const IJ = {
            bg: '#1e1f22', bgDark: '#17191d', border: '#2d2f31',
            text: '#bcbcbc', muted: '#6c7078',
            green: '#4CAF50', string: '#6A8759', keyword: '#CC7832', method: '#FFC66D',
        }
        const lineCol = (key, def) => isActive(key) ? '#f0f0f0' : isDoneKey(key) ? def : IJ.muted + '55'

        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 310 }}>
                {/* IntelliJ window bar */}
                <div style={{ background: IJ.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${IJ.border}` }}>
                    <span style={{ fontSize: 10 }}>☕</span>
                    <span style={{ fontSize: 9, color: IJ.text }}>UserApiTest.java — IntelliJ IDEA</span>
                    <button
                        onClick={() => canStart && runSteps([['given', 100], ['when', 700], ['sending', 600], ['then', 900], ['asserting', 700], ['done', 500]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? IJ.muted : IJ.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? `0 0 8px ${IJ.green}55` : 'none' }}
                    >
                        {s === 'idle' ? '▶ Run Test' : s === 'done' ? '▶ Run Again' : '⏳ Running...'}
                    </button>
                </div>

                {/* Split: left test tree + right code */}
                <div style={{ display: 'flex', background: IJ.bg, minHeight: 155 }}>
                    {/* Left: test tree */}
                    <div style={{ width: 82, borderRight: `1px solid ${IJ.border}`, padding: '8px 6px', fontSize: 8 }}>
                        <div style={{ color: IJ.muted, marginBottom: 6, fontSize: 7, fontWeight: 700, letterSpacing: 0.5 }}>TEST RUNNER</div>
                        <div style={{ color: s === 'done' ? IJ.green : IJ.text }}>
                            {s === 'done' ? '✓' : s !== 'idle' ? '⏳' : '▾'} UserApiTest
                        </div>
                        <div style={{ paddingLeft: 10, marginTop: 3, marginLeft: 8, borderLeft: `1.5px solid ${s === 'done' ? IJ.green : IJ.border}`, color: s === 'done' ? IJ.green : s !== 'idle' ? IJ.text : IJ.muted }}>
                            {s === 'done' ? '✓ ' : s !== 'idle' ? '▶ ' : '  '}getUsers()
                        </div>
                        {s === 'done' && (
                            <div style={{ marginTop: 8, fontSize: 7, color: IJ.green, lineHeight: 1.7 }}>
                                <div>✓ 5 assertions</div>
                                <div style={{ color: IJ.muted }}>0.8s total</div>
                            </div>
                        )}
                        {s !== 'idle' && s !== 'done' && (
                            <div style={{ marginTop: 8 }}>
                                {['given', 'when', 'then', 'asserting'].map(k => (
                                    <div key={k} style={{ fontSize: 7, color: isDoneKey(k) ? IJ.green : isActive(k) ? '#f59e0b' : IJ.muted, lineHeight: 1.8 }}>
                                        {isDoneKey(k) ? '✓ ' : isActive(k) ? '→ ' : '  '}{k}()
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: code panel */}
                    <div style={{ flex: 1, padding: '8px 10px', fontSize: 8.5, lineHeight: 1.9, overflow: 'hidden' }}>
                        {/* given() block */}
                        <div style={{ background: isActive('given') ? '#3b82f618' : 'transparent', borderLeft: isActive('given') ? '2px solid #3b82f6' : '2px solid transparent', paddingLeft: 4, transition: 'all 0.3s', borderRadius: '0 3px 3px 0' }}>
                            <span style={{ color: lineCol('given', IJ.keyword) }}>given()</span>
                        </div>
                        <div style={{ paddingLeft: 12, fontSize: 8, color: isDoneKey('given') ? IJ.muted : IJ.muted + '33' }}>
                            .<span style={{ color: isDoneKey('given') ? IJ.method : IJ.muted + '33' }}>baseUri</span>(<span style={{ color: isDoneKey('given') ? IJ.string : IJ.muted + '22' }}>"https://reqres.in"</span>)
                        </div>
                        <div style={{ paddingLeft: 12, fontSize: 8, color: isDoneKey('given') ? IJ.muted : IJ.muted + '22' }}>
                            .<span style={{ color: isDoneKey('given') ? IJ.method : IJ.muted + '22' }}>contentType</span>(<span style={{ color: isDoneKey('given') ? IJ.string : IJ.muted + '11' }}>"application/json"</span>)
                        </div>
                        {/* when() block */}
                        <div style={{ background: isActive('when') || isActive('sending') ? '#f59e0b18' : 'transparent', borderLeft: isActive('when') || isActive('sending') ? '2px solid #f59e0b' : '2px solid transparent', paddingLeft: 4, transition: 'all 0.3s', borderRadius: '0 3px 3px 0', marginTop: 2 }}>
                            <span style={{ color: lineCol('when', IJ.keyword) }}>.when()</span>
                        </div>
                        <div style={{ paddingLeft: 12, fontSize: 8, color: isDoneKey('when') || isActive('sending') ? '#f97316' : IJ.muted + '22' }}>
                            .<span style={{ color: isDoneKey('when') || isActive('sending') ? IJ.method : IJ.muted + '22' }}>get</span>(<span style={{ color: isDoneKey('when') || isActive('sending') ? IJ.string : IJ.muted + '11' }}>"/api/users?page=2"</span>)
                        </div>
                        {/* then() block */}
                        <div style={{ background: isActive('then') || isActive('asserting') ? '#10b98118' : 'transparent', borderLeft: isActive('then') || isActive('asserting') ? '2px solid #10b981' : '2px solid transparent', paddingLeft: 4, transition: 'all 0.3s', borderRadius: '0 3px 3px 0', marginTop: 2 }}>
                            <span style={{ color: lineCol('then', IJ.keyword) }}>.then()</span>
                        </div>
                        {['.statusCode(200)', '.body("page", equalTo(2))', '.body("data", hasSize(6))', '.body("data[0].email", containsString("@"))'].map((a, i) => (
                            <div key={i} style={{ paddingLeft: 12, fontSize: 8, color: isActive('asserting') || isDoneKey('asserting') ? IJ.green : IJ.muted + '22', transition: 'color 0.4s' }}>
                                {isActive('asserting') || isDoneKey('asserting') ? '✓ ' : ''}{a}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: test results bar */}
                <div style={{ background: s === 'done' ? '#0a2d1a' : IJ.bgDark, borderTop: `1px solid ${IJ.border}`, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: '0 0 10px 10px', transition: 'background 0.5s' }}>
                    {s === 'idle' && <span style={{ fontSize: 8, color: IJ.muted }}>{isTr ? '▶ Run Test butonuna tıkla' : '▶ Click Run Test to start'}</span>}
                    {s !== 'idle' && s !== 'done' && <span style={{ fontSize: 8, color: '#f59e0b' }}>⏳ {isTr ? 'Test çalışıyor...' : 'Test running...'}</span>}
                    {s === 'done' && <span style={{ color: IJ.green, fontWeight: 700, fontSize: 9 }}>✓ 1 test passed | 5 assertions | 0.8s</span>}
                    {s !== 'idle' && <button onClick={resetSim} style={{ marginLeft: 'auto', background: 'transparent', border: `1px solid ${IJ.border}`, color: IJ.muted, borderRadius: 4, padding: '2px 8px', fontSize: 8, cursor: 'pointer' }}>🔄</button>}
                </div>
            </div>
        )
    }

    // === JENKINS PIPELINE PLAYGROUND — Jenkins Blue Ocean UI ===
    const renderJenkinsPipelinePlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const stages = [
            { key: 'checkout', label: 'Checkout', icon: '⬇', color: '#4a9eff', time: '2s' },
            { key: 'build', label: 'Build', icon: '🔨', color: '#f5a623', time: '45s' },
            { key: 'test', label: 'Test', icon: '🧪', color: '#a55af4', time: '90s' },
            { key: 'analyze', label: 'Sonar', icon: '🔍', color: '#00b8d4', time: '32s' },
            { key: 'deploy', label: 'Deploy', icon: '🚀', color: '#36c96e', time: '28s' },
        ]
        const order = ['idle', 'checkout', 'build', 'test', 'analyze', 'deploy', 'done']
        const cur = order.indexOf(s)

        const JK = { bg: '#1a1a2e', bgDark: '#0f0f1c', header: '#0d0d1a', border: '#2a2a4a', text: '#ccd6f6', muted: '#667080', green: '#36c96e' }

        const logLines = [
            { minState: 'checkout', text: '[Checkout] git clone https://github.com/org/app.git', color: '#4a9eff' },
            { minState: 'checkout', text: '[Checkout] → Checking out branch: main ✓', color: JK.muted },
            { minState: 'build', text: '[Build] mvn clean package -DskipTests', color: '#f5a623' },
            { minState: 'build', text: '[Build] → BUILD SUCCESS in 45s ✓', color: JK.green },
            { minState: 'test', text: '[Test] Running 247 tests...', color: '#a55af4' },
            { minState: 'test', text: '[Test] Tests: 247 run, 0 failures, 0 errors ✓', color: JK.green },
            { minState: 'analyze', text: '[Sonar] Uploading analysis to SonarQube...', color: '#00b8d4' },
            { minState: 'analyze', text: '[Sonar] Quality Gate: ✅ PASSED (Coverage: 84%) ✓', color: JK.green },
            { minState: 'deploy', text: '[Deploy] kubectl apply -f deploy/staging.yaml', color: JK.green },
            { minState: 'done', text: '[Deploy] Health check: ✅ OK → Finished: SUCCESS', color: JK.green },
        ]

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                {/* Jenkins header bar */}
                <div style={{ background: JK.header, borderRadius: '10px 10px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${JK.border}` }}>
                    <span style={{ fontSize: 14 }}>🔧</span>
                    <div>
                        <div style={{ fontSize: 9, color: JK.text, fontWeight: 700 }}>my-spring-app / main</div>
                        <div style={{ fontSize: 8, color: JK.muted }}>Build {s === 'idle' ? '#47 (last: ✅)' : '#48 ' + (s === 'done' ? '✅ SUCCESS' : '⏳ Running...')}</div>
                    </div>
                    <button
                        onClick={() => canStart && runSteps([['checkout', 100], ['build', 1200], ['test', 1200], ['analyze', 1000], ['deploy', 1000], ['done', 500]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? JK.muted : s === 'done' ? JK.green : '#ef4444', color: '#fff', border: 'none', borderRadius: 5, padding: '4px 12px', fontSize: 10, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? '0 0 10px rgba(239,68,68,0.5)' : 'none' }}
                    >
                        {s === 'idle' ? '▶ Build' : s === 'done' ? '▶ Rebuild' : '⏳'}
                    </button>
                </div>

                {/* Pipeline stages — Blue Ocean circles */}
                <div style={{ background: JK.bg, padding: '16px 10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {stages.map((st, i) => {
                            const stIdx = order.indexOf(st.key)
                            const isAct = stIdx === cur
                            const isDn = stIdx < cur && s !== 'idle'
                            const connDone = i < stages.length - 1 && order.indexOf(stages[i + 1].key) <= cur && s !== 'idle'
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center', minWidth: 48 }}>
                                        {isAct && <div style={{ fontSize: 7, color: st.color, marginBottom: 2, fontWeight: 700 }} className="animate-pulse">● RUNNING</div>}
                                        {isDn && <div style={{ fontSize: 7, color: JK.green, marginBottom: 2 }}>✓ {st.time}</div>}
                                        {!isAct && !isDn && <div style={{ fontSize: 7, color: 'transparent', marginBottom: 2 }}>·</div>}
                                        <div style={{ width: 34, height: 34, borderRadius: '50%', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDn ? `${JK.green}22` : isAct ? `${st.color}22` : `${JK.muted}11`, border: `2.5px solid ${isDn ? JK.green : isAct ? st.color : JK.border}`, fontSize: 14, boxShadow: isAct ? `0 0 14px ${st.color}55` : 'none', transition: 'all 0.5s' }}>
                                            {isDn ? '✓' : isAct ? '⏳' : st.icon}
                                        </div>
                                        <div style={{ fontSize: 8, fontWeight: 700, color: isDn ? JK.green : isAct ? st.color : JK.muted }}>{st.label}</div>
                                    </div>
                                    {i < stages.length - 1 && <div style={{ width: 14, height: 2, background: connDone ? JK.green : JK.border, flexShrink: 0, transition: 'background 0.5s' }} />}
                                </div>
                            )
                        })}
                    </div>

                    {s === 'idle' && (
                        <div style={{ textAlign: 'center', marginTop: 6 }}>
                            <span style={{ fontSize: 8, background: '#ef444422', color: '#ef4444', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }} className="animate-pulse">
                                ↑ {isTr ? '▶ Build butonuna tıkla' : '▶ Click Build to start'}
                            </span>
                        </div>
                    )}

                    {/* Console output */}
                    <div style={{ background: '#0d0d18', borderRadius: 6, padding: '8px 10px', marginTop: 10, minHeight: 70, maxHeight: 110, overflow: 'hidden' }}>
                        <div style={{ fontSize: 8, color: JK.muted, marginBottom: 3 }}>Console Output</div>
                        {s === 'idle' && <span style={{ fontSize: 8, color: JK.muted }}>{isTr ? 'Pipeline başlatmak için Build\'e bas...' : 'Press Build to start pipeline...'}</span>}
                        {logLines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? <div key={i} style={{ fontSize: 8, color: ln.color, lineHeight: 1.7, fontFamily: 'monospace' }}>{ln.text}</div> : null
                        })}
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: JK.bgDark, border: `1px solid ${JK.border}`, color: JK.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === AWS CODEPIPELINE PLAYGROUND ===
    const renderAwsCodepipelinePlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const stages = [
            { key: 'source', label: 'Source', icon: '📥', color: '#f7931e', time: '1s' },
            { key: 'install', label: 'Install', icon: '📦', color: '#ec7211', time: '12s' },
            { key: 'test', label: 'Test', icon: '🧪', color: '#a855f7', time: '38s' },
            { key: 'deploy', label: 'Upload', icon: '☁️', color: '#10b981', time: '4s' },
        ]
        const order = ['idle', 'source', 'install', 'test', 'deploy', 'done']
        const cur = order.indexOf(s)
        const AW = { bg: '#0d1b2a', bgDark: '#08131d', header: '#16242f', border: '#1f3142', text: '#cbd5e1', muted: '#64748b', green: '#10b981' }
        const logLines = [
            { minState: 'source', text: '[Source] git push origin main → commit a1c9f3e', color: '#f7931e' },
            { minState: 'install', text: '[Install] npm ci && npx playwright install --with-deps chromium', color: '#ec7211' },
            { minState: 'install', text: '[Install] → done in 12s ✓', color: AW.green },
            { minState: 'test', text: '[Test] npx playwright test --reporter=html', color: '#a855f7' },
            { minState: 'test', text: '[Test] 86 passed, 0 failed ✓', color: AW.green },
            { minState: 'deploy', text: '[Deploy] aws s3 sync playwright-report/ s3://my-qa-reports/latest/', color: AW.green },
            { minState: 'done', text: '[Deploy] → Upload complete → Pipeline: SUCCESS ✓', color: AW.green },
        ]
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                <div style={{ background: AW.header, borderRadius: '10px 10px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${AW.border}` }}>
                    <span style={{ fontSize: 14 }}>☁️</span>
                    <div>
                        <div style={{ fontSize: 9, color: AW.text, fontWeight: 700 }}>qa-test-pipeline</div>
                        <div style={{ fontSize: 8, color: AW.muted }}>{s === 'idle' ? (isTr ? 'Son çalışma: ✅ Başarılı' : 'Last run: ✅ Succeeded') : s === 'done' ? (isTr ? '✅ Başarılı' : '✅ Succeeded') : (isTr ? '⏳ Çalışıyor...' : '⏳ In progress...')}</div>
                    </div>
                    <button
                        onClick={() => canStart && runSteps([['source', 200], ['install', 900], ['test', 1200], ['deploy', 800], ['done', 500]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? AW.muted : '#ec7211', color: '#fff', border: 'none', borderRadius: 5, padding: '4px 12px', fontSize: 10, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? '0 0 10px rgba(236,114,17,0.5)' : 'none' }}
                    >
                        {s === 'idle' ? (isTr ? '▶ git push' : '▶ git push') : s === 'done' ? '▶ Again' : '⏳'}
                    </button>
                </div>

                <div style={{ background: AW.bg, padding: '16px 10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {stages.map((st, i) => {
                            const stIdx = order.indexOf(st.key)
                            const isAct = stIdx === cur
                            const isDn = stIdx < cur && s !== 'idle'
                            const connDone = i < stages.length - 1 && order.indexOf(stages[i + 1].key) <= cur && s !== 'idle'
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center', minWidth: 48 }}>
                                        {isAct && <div style={{ fontSize: 7, color: st.color, marginBottom: 2, fontWeight: 700 }} className="animate-pulse">● RUNNING</div>}
                                        {isDn && <div style={{ fontSize: 7, color: AW.green, marginBottom: 2 }}>✓ {st.time}</div>}
                                        {!isAct && !isDn && <div style={{ fontSize: 7, color: 'transparent', marginBottom: 2 }}>·</div>}
                                        <div style={{ width: 34, height: 34, borderRadius: '50%', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDn ? `${AW.green}22` : isAct ? `${st.color}22` : `${AW.muted}11`, border: `2.5px solid ${isDn ? AW.green : isAct ? st.color : AW.border}`, fontSize: 14, boxShadow: isAct ? `0 0 14px ${st.color}55` : 'none', transition: 'all 0.5s' }}>
                                            {isDn ? '✓' : isAct ? '⏳' : st.icon}
                                        </div>
                                        <div style={{ fontSize: 8, fontWeight: 700, color: isDn ? AW.green : isAct ? st.color : AW.muted }}>{st.label}</div>
                                    </div>
                                    {i < stages.length - 1 && <div style={{ width: 14, height: 2, background: connDone ? AW.green : AW.border, flexShrink: 0, transition: 'background 0.5s' }} />}
                                </div>
                            )
                        })}
                    </div>

                    {s === 'idle' && (
                        <div style={{ textAlign: 'center', marginTop: 6 }}>
                            <span style={{ fontSize: 8, background: '#ec721122', color: '#ec7211', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }} className="animate-pulse">
                                ↑ {isTr ? '▶ git push butonuna tıkla' : '▶ Click git push to start'}
                            </span>
                        </div>
                    )}

                    <div style={{ background: AW.bgDark, borderRadius: 6, padding: '8px 10px', marginTop: 10, minHeight: 70, maxHeight: 110, overflow: 'hidden' }}>
                        <div style={{ fontSize: 8, color: AW.muted, marginBottom: 3 }}>CodeBuild Logs</div>
                        {s === 'idle' && <span style={{ fontSize: 8, color: AW.muted }}>{isTr ? 'Pipeline başlatmak için git push\'a bas...' : 'Press git push to start the pipeline...'}</span>}
                        {logLines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? <div key={i} style={{ fontSize: 8, color: ln.color, lineHeight: 1.7, fontFamily: 'monospace' }}>{ln.text}</div> : null
                        })}
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: AW.bgDark, border: `1px solid ${AW.border}`, color: AW.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === AZURE DEVOPS PIPELINE PLAYGROUND ===
    const renderAzureDevopsPipelinePlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const stages = [
            { key: 'source', label: 'Trigger', icon: '📥', color: '#0078d4', time: '1s' },
            { key: 'install', label: 'Install', icon: '📦', color: '#5c2d91', time: '14s' },
            { key: 'test', label: 'Test', icon: '🧪', color: '#a855f7', time: '36s' },
            { key: 'publish', label: 'Publish', icon: '📤', color: '#10b981', time: '5s' },
        ]
        const order = ['idle', 'source', 'install', 'test', 'publish', 'done']
        const cur = order.indexOf(s)
        const AZ = { bg: '#10182a', bgDark: '#0a0f1c', header: '#152238', border: '#1f3252', text: '#cbd5e1', muted: '#64748b', blue: '#0078d4', green: '#10b981' }
        const logLines = [
            { minState: 'source', text: '[Trigger] push → main @ a1c9f3e — pipeline queued', color: '#0078d4' },
            { minState: 'install', text: '[Install] NodeTool@0 → Node.js 18.x ready', color: '#5c2d91' },
            { minState: 'install', text: '[Install] npm ci && playwright install --with-deps ✓', color: AZ.green },
            { minState: 'test', text: '[Test] npx playwright test --reporter=html,junit', color: '#a855f7' },
            { minState: 'test', text: '[Test] 86 passed, 0 failed ✓', color: AZ.green },
            { minState: 'publish', text: '[Publish] PublishTestResults@2 → JUnit results ✓', color: AZ.green },
            { minState: 'done', text: '[Publish] PublishPipelineArtifact@1 → playwright-html-report ✓', color: AZ.green },
        ]
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                <div style={{ background: AZ.header, borderRadius: '10px 10px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${AZ.border}` }}>
                    <span style={{ fontSize: 14 }}>🔷</span>
                    <div>
                        <div style={{ fontSize: 9, color: AZ.text, fontWeight: 700 }}>qa-pipeline / Run #142</div>
                        <div style={{ fontSize: 8, color: AZ.muted }}>{s === 'idle' ? (isTr ? 'Son çalışma: ✅ Başarılı' : 'Last run: ✅ Succeeded') : s === 'done' ? (isTr ? '✅ Başarılı' : '✅ Succeeded') : (isTr ? '⏳ Çalışıyor...' : '⏳ In progress...')}</div>
                    </div>
                    <button
                        onClick={() => canStart && runSteps([['source', 200], ['install', 1000], ['test', 1200], ['publish', 800], ['done', 500]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? AZ.muted : AZ.blue, color: '#fff', border: 'none', borderRadius: 5, padding: '4px 12px', fontSize: 10, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? '0 0 10px rgba(0,120,212,0.5)' : 'none' }}
                    >
                        {s === 'idle' ? '▶ git push' : s === 'done' ? '▶ Again' : '⏳'}
                    </button>
                </div>

                <div style={{ background: AZ.bg, padding: '16px 10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {stages.map((st, i) => {
                            const stIdx = order.indexOf(st.key)
                            const isAct = stIdx === cur
                            const isDn = stIdx < cur && s !== 'idle'
                            const connDone = i < stages.length - 1 && order.indexOf(stages[i + 1].key) <= cur && s !== 'idle'
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center', minWidth: 48 }}>
                                        {isAct && <div style={{ fontSize: 7, color: st.color, marginBottom: 2, fontWeight: 700 }} className="animate-pulse">● RUNNING</div>}
                                        {isDn && <div style={{ fontSize: 7, color: AZ.green, marginBottom: 2 }}>✓ {st.time}</div>}
                                        {!isAct && !isDn && <div style={{ fontSize: 7, color: 'transparent', marginBottom: 2 }}>·</div>}
                                        <div style={{ width: 34, height: 34, borderRadius: '50%', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDn ? `${AZ.green}22` : isAct ? `${st.color}22` : `${AZ.muted}11`, border: `2.5px solid ${isDn ? AZ.green : isAct ? st.color : AZ.border}`, fontSize: 14, boxShadow: isAct ? `0 0 14px ${st.color}55` : 'none', transition: 'all 0.5s' }}>
                                            {isDn ? '✓' : isAct ? '⏳' : st.icon}
                                        </div>
                                        <div style={{ fontSize: 8, fontWeight: 700, color: isDn ? AZ.green : isAct ? st.color : AZ.muted }}>{st.label}</div>
                                    </div>
                                    {i < stages.length - 1 && <div style={{ width: 14, height: 2, background: connDone ? AZ.green : AZ.border, flexShrink: 0, transition: 'background 0.5s' }} />}
                                </div>
                            )
                        })}
                    </div>

                    {s === 'idle' && (
                        <div style={{ textAlign: 'center', marginTop: 6 }}>
                            <span style={{ fontSize: 8, background: '#0078d422', color: '#0078d4', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }} className="animate-pulse">
                                ↑ {isTr ? '▶ git push butonuna tıkla' : '▶ Click git push to start'}
                            </span>
                        </div>
                    )}

                    <div style={{ background: AZ.bgDark, borderRadius: 6, padding: '8px 10px', marginTop: 10, minHeight: 70, maxHeight: 110, overflow: 'hidden' }}>
                        <div style={{ fontSize: 8, color: AZ.muted, marginBottom: 3 }}>Pipeline Logs</div>
                        {s === 'idle' && <span style={{ fontSize: 8, color: AZ.muted }}>{isTr ? 'Pipeline başlatmak için git push\'a bas...' : 'Press git push to start the pipeline...'}</span>}
                        {logLines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? <div key={i} style={{ fontSize: 8, color: ln.color, lineHeight: 1.7, fontFamily: 'monospace' }}>{ln.text}</div> : null
                        })}
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: AZ.bgDark, border: `1px solid ${AZ.border}`, color: AZ.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === KAFKA PRODUCER/CONSUMER PLAYGROUND — Confluent Control Center UI ===
    const renderKafkaPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'producing', 'partitioned', 'broker-store', 'consuming', 'done']
        const cur = order.indexOf(s)
        const isProducing = s === 'producing'
        const isPartition = s === 'partitioned'
        const isBroker = s === 'broker-store'
        const isConsuming = ['consuming', 'done'].includes(s)
        const isDone = s === 'done'

        const KF = { bg: '#1c1c1c', bgDark: '#141414', panel: '#242424', border: '#333', text: '#e0e0e0', muted: '#888', orange: '#E87722', green: '#4CAF50', blue: '#2196F3' }

        const messages = [
            { offset: 44, key: 'kullanici-123', value: '{"siparisId":"SIP-458"}', ts: '14:23:12' },
            { offset: 43, key: 'kullanici-456', value: '{"siparisId":"SIP-457"}', ts: '14:23:08' },
            { offset: 42, key: 'kullanici-123', value: '{"siparisId":"SIP-456"}', ts: '14:22:55' },
        ]

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                {/* Confluent header */}
                <div style={{ background: KF.bgDark, borderRadius: '10px 10px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${KF.border}` }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: KF.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>K</div>
                    <span style={{ fontSize: 10, color: KF.text, fontWeight: 700 }}>Confluent Control Center</span>
                    <div style={{ marginLeft: 'auto', fontSize: 8, padding: '2px 8px', borderRadius: 3, background: isConsuming ? '#4CAF5022' : isProducing || isPartition || isBroker ? '#E8772222' : '#33333366', color: isConsuming ? KF.green : isProducing || isPartition || isBroker ? KF.orange : KF.muted, fontWeight: 700 }}>
                        {isConsuming ? '● Active' : isProducing || isPartition || isBroker ? '● Producing' : '● Idle'}
                    </div>
                </div>

                {/* Main: sidebar + content */}
                <div style={{ display: 'flex', background: KF.bg }}>
                    {/* Left: Topics + Consumer Groups */}
                    <div style={{ width: 90, borderRight: `1px solid ${KF.border}`, padding: '8px 0' }}>
                        <div style={{ fontSize: 7.5, color: KF.muted, padding: '0 8px', marginBottom: 4, fontWeight: 700, letterSpacing: 0.5 }}>TOPICS</div>
                        {['siparisler', 'users', 'payments'].map(topic => {
                            const sel = topic === 'siparisler'
                            return (
                                <div key={topic} style={{ padding: '5px 8px', fontSize: 8.5, background: sel ? `${KF.orange}22` : 'transparent', borderLeft: sel ? `2.5px solid ${KF.orange}` : '2.5px solid transparent', color: sel ? KF.orange : KF.muted, fontWeight: sel ? 700 : 400, cursor: 'default' }}>
                                    {topic}
                                    {sel && <div style={{ fontSize: 7, color: KF.muted }}>{isBroker || isConsuming ? '● msgs: 44' : isProducing || isPartition ? '→ incoming...' : '● msgs: 42'}</div>}
                                </div>
                            )
                        })}
                        <div style={{ borderTop: `1px solid ${KF.border}`, marginTop: 6, padding: '6px 8px 0' }}>
                            <div style={{ fontSize: 7, color: KF.muted, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>CONSUMER GROUPS</div>
                            <div style={{ fontSize: 8, color: isConsuming ? KF.green : KF.muted }}>
                                siparis-service
                                {isConsuming && <div style={{ fontSize: 7, color: KF.green }}>lag: 0 ✓</div>}
                            </div>
                        </div>
                    </div>

                    {/* Right: Topic detail */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Partition tabs */}
                        <div style={{ display: 'flex', borderBottom: `1px solid ${KF.border}`, background: KF.panel, padding: '6px 8px 0', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 9, color: KF.text, marginRight: 4 }}>siparisler</span>
                            {['P0', 'P1', 'P2', 'P3'].map((p, i) => (
                                <div key={p} style={{ padding: '3px 7px', fontSize: 8, color: (isPartition || isBroker || isConsuming) && i === 1 ? KF.orange : KF.muted, borderBottom: (isPartition || isBroker || isConsuming) && i === 1 ? `1.5px solid ${KF.orange}` : '1.5px solid transparent', cursor: 'default' }}>{p}</div>
                            ))}
                        </div>
                        {/* Annotation for partition */}
                        {(isPartition || isBroker) && (
                            <div style={{ fontSize: 7.5, color: KF.orange, padding: '3px 8px', background: `${KF.orange}11` }}>
                                ↑ {isTr ? 'Mesaj P1\'e yönlendirildi (hash("kullanici-123") % 4 = 1)' : 'Message routed to P1 (hash("kullanici-123") % 4 = 1)'}
                            </div>
                        )}

                        {/* Message list */}
                        <div style={{ padding: '6px 8px', flex: 1 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '24px 66px 1fr 36px', gap: 4, fontSize: 7, color: KF.muted, marginBottom: 4, fontWeight: 700 }}>
                                <div>OFF</div><div>KEY</div><div>VALUE</div><div>TIME</div>
                            </div>
                            {messages.map((msg, i) => {
                                const isNew = i === 0 && (isBroker || isConsuming)
                                return (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 66px 1fr 36px', gap: 4, fontSize: 7.5, padding: '3px 0', borderBottom: `1px solid ${KF.border}`, opacity: i === 0 ? 1 : (isBroker || isConsuming) ? 0.7 : s === 'idle' ? 0.3 : 0.5, background: isNew ? `${KF.orange}11` : 'transparent', transition: 'all 0.4s' }}>
                                        <div style={{ color: isNew ? KF.orange : KF.muted }}>{msg.offset}</div>
                                        <div style={{ color: KF.blue, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.key}</div>
                                        <div style={{ color: isConsuming && i === 0 ? KF.green : KF.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i === 0 && isProducing ? '⏳ incoming...' : msg.value}</div>
                                        <div style={{ color: KF.muted }}>{msg.ts}</div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Produce/status bar */}
                        <div style={{ padding: '6px 8px', borderTop: `1px solid ${KF.border}`, background: KF.panel }}>
                            {s === 'idle' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 8, color: KF.muted }}>{isTr ? 'Mesaj üret:' : 'Produce msg:'}</span>
                                    <button onClick={() => canStart && runSteps([['producing', 100], ['partitioned', 800], ['broker-store', 800], ['consuming', 900], ['done', 600]])} style={{ background: KF.orange, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: 'pointer', boxShadow: `0 0 8px ${KF.orange}66` }} className="animate-pulse">{isTr ? '▶ Mesaj Gönder' : '▶ Produce'}</button>
                                    <span style={{ fontSize: 7, color: KF.muted }}>← {isTr ? 'tıkla' : 'click'}</span>
                                </div>
                            )}
                            {s !== 'idle' && !isDone && (
                                <div style={{ fontSize: 8, color: KF.orange }}>
                                    {isProducing && (isTr ? '📤 Mesaj gönderiliyor...' : '📤 Message sending...')}
                                    {isPartition && (isTr ? '🗂️ Partition yönlendirmesi: P1 (hash mod 4)' : '🗂️ Partition routing: P1 (hash mod 4)')}
                                    {isBroker && (isTr ? "💾 Broker'da saklıyor — offset: 44" : '💾 Storing in broker — offset: 44')}
                                    {isConsuming && (isTr ? '📥 siparis-service okuyor — offset: 44' : '📥 siparis-service consuming — offset: 44')}
                                </div>
                            )}
                            {isDone && <div style={{ fontSize: 8, color: KF.green }}>✅ {isTr ? 'Mesaj başarıyla iletildi! Consumer offset güncellendi.' : 'Message delivered! Consumer offset updated.'}</div>}
                        </div>
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: KF.bgDark, border: `1px solid ${KF.border}`, color: KF.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === DOCKER LIFECYCLE PLAYGROUND — Docker Desktop UI ===
    const renderDockerLifecyclePlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'pulling', 'pulled', 'running', 'exec', 'stopping', 'done']
        const cur = order.indexOf(s)
        const isPulling = ['pulling', 'pulled'].includes(s)
        const isRunning = ['running', 'exec'].includes(s)
        const isStopping = s === 'stopping'
        const isDone = s === 'done'

        const DK = { bg: '#1d2a3a', bgDark: '#0f1c2e', sidebar: '#162032', border: '#1e3a5c', text: '#c8d6e5', muted: '#5b7a9c', blue: '#1D63ED', green: '#00c853', red: '#ef4444', yellow: '#f59e0b' }

        const termLines = [
            { minState: 'pulling', text: '$ docker pull nginx:latest', color: '#f0f6fc' },
            { minState: 'pulling', text: '  latest: Pulling from library/nginx...', color: DK.muted },
            { minState: 'pulled', text: '  ✅ Status: Downloaded newer image for nginx:latest', color: DK.green },
            { minState: 'running', text: '$ docker run -d -p 8080:80 --name my-nginx nginx', color: '#f0f6fc' },
            { minState: 'running', text: '  a1b2c3d4e5f6 (container ID)', color: '#a78bfa' },
            { minState: 'exec', text: '$ docker exec -it my-nginx bash', color: '#f0f6fc' },
            { minState: 'exec', text: '  root@a1b2c3d4:/# ls /usr/share/nginx/html', color: DK.green },
            { minState: 'stopping', text: '$ docker stop my-nginx', color: '#f0f6fc' },
            { minState: 'done', text: '  my-nginx (Exited 0)', color: '#ef4444' },
        ]

        const cStatus = isDone ? { dot: '🔴', text: 'Exited (0)', color: DK.red } : isStopping ? { dot: '🟡', text: 'Stopping...', color: DK.yellow } : isRunning ? { dot: '🟢', text: 'Up 2 minutes', color: DK.green } : isPulling ? { dot: '⚪', text: 'Pulling image...', color: DK.muted } : { dot: '⚫', text: 'Not started', color: DK.muted }

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                <div style={{ background: DK.bgDark, borderRadius: '10px 10px 0 0', display: 'flex' }}>
                    {/* Left sidebar */}
                    <div style={{ width: 46, background: DK.sidebar, borderRadius: '10px 0 0 0', borderRight: `1px solid ${DK.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>🐳</span>
                        {[['📦', 'Containers'], ['🖼️', 'Images'], ['🗂️', 'Volumes'], ['🔌', 'Extensions']].map(([icon, label], i) => (
                            <div key={label} title={label} style={{ width: 34, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, fontSize: 13, cursor: 'default', background: i === 0 ? `${DK.blue}33` : 'transparent', borderLeft: i === 0 ? `2px solid ${DK.blue}` : '2px solid transparent' }}>{icon}</div>
                        ))}
                    </div>

                    {/* Main panel */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{ padding: '8px 10px', borderBottom: `1px solid ${DK.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 10, color: DK.text, fontWeight: 700 }}>Containers</span>
                            <button
                                onClick={() => canStart && runSteps([['pulling', 100], ['pulled', 1800], ['running', 800], ['exec', 1500], ['stopping', 1500], ['done', 600]])}
                                disabled={!canStart}
                                style={{ marginLeft: 'auto', background: !canStart ? DK.muted : DK.blue, color: '#fff', border: 'none', borderRadius: 5, padding: '4px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? `0 0 10px ${DK.blue}66` : 'none' }}
                            >
                                {s === 'idle' ? '▶ Run Demo' : s === 'done' ? '▶ Again' : '⏳'}
                            </button>
                        </div>

                        {/* Container row — appears when running */}
                        {(isRunning || isStopping || isDone) && (
                            <div style={{ padding: '8px 10px', borderBottom: `1px solid ${DK.border}`, background: isRunning ? `${DK.green}0a` : isStopping ? `${DK.yellow}0a` : '#ef444408', transition: 'background 0.4s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 10 }}>{cStatus.dot}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 10, color: DK.text, fontWeight: 700 }}>my-nginx</div>
                                        <div style={{ fontSize: 8, color: DK.muted }}>nginx:latest · Port: 8080→80</div>
                                    </div>
                                    <span style={{ fontSize: 8, color: cStatus.color, fontWeight: 700 }}>{cStatus.text}</span>
                                    {isRunning && (
                                        <div style={{ display: 'flex', gap: 3 }}>
                                            <span style={{ fontSize: 8, background: '#ef444422', color: '#ef4444', padding: '2px 6px', borderRadius: 3 }}>Stop</span>
                                            <span style={{ fontSize: 8, background: DK.border, color: DK.muted, padding: '2px 6px', borderRadius: 3 }}>Logs</span>
                                        </div>
                                    )}
                                </div>
                                {isRunning && <div style={{ fontSize: 7, color: DK.blue, marginTop: 3 }}>↑ {isTr ? 'STATUS göstergesi' : 'STATUS indicator'} · <span style={{ color: DK.muted }}>Port: host:8080 → container:80</span></div>}
                            </div>
                        )}

                        {/* Pull progress */}
                        {isPulling && (
                            <div style={{ padding: '8px 10px' }}>
                                <div style={{ fontSize: 9, color: DK.yellow, marginBottom: 4 }}>📥 {isTr ? 'nginx:latest indiriliyor...' : 'Pulling nginx:latest...'}</div>
                                <div style={{ height: 3, background: DK.border, borderRadius: 2 }}>
                                    <div style={{ height: '100%', borderRadius: 2, background: DK.blue, width: s === 'pulled' ? '100%' : '65%', transition: 'width 1.5s ease-in-out' }} />
                                </div>
                                {s === 'pulled' && <div style={{ fontSize: 8, color: DK.green, marginTop: 3 }}>✅ {isTr ? 'Image indirildi!' : 'Image pulled!'}</div>}
                            </div>
                        )}

                        {/* Terminal log */}
                        <div style={{ background: '#0a1628', padding: '6px 8px', fontFamily: 'monospace', minHeight: 55, maxHeight: 80, overflow: 'hidden' }}>
                            {termLines.map((ln, i) => {
                                const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                                return show ? <div key={i} style={{ fontSize: 8, color: ln.color, lineHeight: 1.7 }}>{ln.text}</div> : null
                            })}
                            {s === 'idle' && <span style={{ fontSize: 8, color: DK.muted }}>$ {isTr ? 'Demo\'yu başlatmak için ▶ Run Demo\'ya bas' : 'Click ▶ Run Demo to start'}</span>}
                        </div>
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: DK.bgDark, border: `1px solid ${DK.border}`, color: DK.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === API REQUEST (POSTMAN) PLAYGROUND — Postman Desktop UI ===
    const renderApiRequestPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'building', 'sending', 'server-proc', 'responding', 'testing', 'done']
        const cur = order.indexOf(s)
        const isSending = ['building', 'sending'].includes(s)
        const isProc = s === 'server-proc'
        const isResp = ['responding', 'testing', 'done'].includes(s)
        const isTesting = ['testing', 'done'].includes(s)

        // Postman color scheme
        const PM = { bg: '#242424', bgDark: '#1c1c1c', bgDarker: '#141414', border: '#3d3d3d', text: '#e8e8e8', muted: '#8d8d8d', orange: '#FF6C37', green: '#49CC90', green2: '#22C55E' }

        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 310 }}>
                {/* macOS window chrome */}
                <div style={{ background: PM.bgDarker, borderRadius: '10px 10px 0 0', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${PM.border}` }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42', display: 'inline-block' }} />
                    <span style={{ fontSize: 9, color: PM.muted, marginLeft: 8 }}>📮 Postman</span>
                </div>

                {/* Sidebar + main */}
                <div style={{ display: 'flex', background: PM.bg }}>
                    {/* Sidebar */}
                    <div style={{ width: 46, borderRight: `1px solid ${PM.border}`, padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        {[['📋', 'Collections'], ['🌍', 'Environments'], ['📜', 'History']].map(([icon, label]) => (
                            <div key={label} title={label} style={{ width: 34, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, cursor: 'default', fontSize: 14, background: label === 'Collections' ? PM.border : 'transparent' }}>{icon}</div>
                        ))}
                    </div>

                    {/* Request panel */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Tab bar */}
                        <div style={{ padding: '5px 8px 0', borderBottom: `1px solid ${PM.border}`, background: PM.bgDark }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: PM.bg, borderRadius: '5px 5px 0 0', padding: '4px 10px', fontSize: 9, color: PM.text }}>
                                <span style={{ color: PM.green, fontWeight: 700 }}>GET</span>
                                <span style={{ color: PM.muted }}>reqres.in/api/users</span>
                                <span style={{ color: '#555' }}>✕</span>
                            </div>
                        </div>

                        {/* Request bar */}
                        <div style={{ padding: '8px 10px 6px', background: PM.bg }}>
                            {s === 'idle' && (
                                <div style={{ marginBottom: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <span style={{ fontSize: 7.5, color: PM.muted }}>① Method</span>
                                    <span style={{ flex: 1, fontSize: 7.5, color: PM.muted }}>② URL Gir</span>
                                    <span style={{ fontSize: 7.5, background: PM.orange, color: '#fff', padding: '1px 6px', borderRadius: 3, fontWeight: 700 }} className="animate-pulse">③ Send →</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <div style={{ background: `${PM.green}22`, color: PM.green, border: `1px solid ${PM.green}44`, padding: '5px 10px', borderRadius: 5, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>GET ▾</div>
                                <div style={{ flex: 1, background: PM.bgDark, border: `1px solid ${isResp ? PM.green : isSending || isProc ? PM.orange : PM.border}`, borderRadius: 5, padding: '5px 8px', fontSize: 9, color: PM.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'border-color 0.3s' }}>
                                    https://reqres.in/api/users?page=2
                                    {(isSending || isProc) && <span style={{ color: PM.orange, marginLeft: 4 }}>●</span>}
                                </div>
                                <button
                                    onClick={() => canStart && runSteps([['building', 100], ['sending', 700], ['server-proc', 1000], ['responding', 700], ['testing', 700], ['done', 500]])}
                                    disabled={!canStart}
                                    style={{ background: isResp ? PM.green2 : PM.orange, color: '#fff', border: 'none', borderRadius: 5, padding: '5px 16px', fontSize: 11, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'background 0.4s', boxShadow: canStart && s === 'idle' ? `0 0 12px ${PM.orange}66` : 'none' }}
                                >
                                    {isSending || isProc ? '⏳' : isResp ? '✓ Sent' : 'Send'}
                                </button>
                            </div>
                        </div>

                        {/* Tabs: Params/Auth/Headers/Body/Tests */}
                        <div style={{ display: 'flex', borderBottom: `1px solid ${PM.border}`, background: PM.bg, paddingLeft: 10 }}>
                            {['Params', 'Auth', 'Headers', 'Body', 'Tests'].map(tab => {
                                const isTests = tab === 'Tests'
                                const active = isTests && isTesting
                                const alert = isTests && !isTesting
                                return (
                                    <div key={tab} style={{ padding: '5px 9px', fontSize: 9, fontWeight: 600, color: active ? PM.orange : alert ? '#f59e0b' : PM.muted, borderBottom: active ? `2px solid ${PM.orange}` : alert ? '2px solid #f59e0b44' : '2px solid transparent', cursor: 'default', position: 'relative' }}>
                                        {tab}
                                        {isTests && !isTesting && <span style={{ position: 'absolute', top: 3, right: 2, width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} className="animate-pulse" />}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Tests tab content (when testing) */}
                        {isTesting && (
                            <div style={{ background: '#1a1a1a', padding: '7px 10px', borderBottom: `1px solid ${PM.border}` }}>
                                <div style={{ fontSize: 7.5, color: PM.muted, marginBottom: 3 }}>Tests — {isTr ? 'Yanıt doğrulama scripti' : 'Response validation script'}</div>
                                <pre style={{ margin: 0, fontSize: 8, color: '#98d3a5', lineHeight: 1.6, fontFamily: 'monospace' }}>{`pm.test("Status 200", () => {
  pm.response.to.have.status(200);
});
pm.test("per_page is 6", () => {
  pm.expect(pm.response.json()
    .per_page).to.eql(6);
});`}</pre>
                            </div>
                        )}

                        {/* Loading states */}
                        {(isSending || isProc) && (
                            <div style={{ padding: '14px 10px', textAlign: 'center', background: PM.bgDark }}>
                                <div style={{ fontSize: 10, color: PM.orange, marginBottom: 3 }}>{isSending ? '📤 Request sending...' : '⚙️ Server processing...'}</div>
                                <div style={{ fontSize: 8, color: PM.muted }}>{isSending ? 'TCP handshake → TLS → HTTP/1.1 GET' : 'Auth middleware → Controller → DB query'}</div>
                            </div>
                        )}

                        {/* Response panel */}
                        {isResp && (
                            <div style={{ background: PM.bgDark }}>
                                <div style={{ display: 'flex', gap: 10, padding: '6px 10px', borderBottom: `1px solid ${PM.border}`, alignItems: 'center' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: PM.green }}>● 200 OK</span>
                                    <span style={{ fontSize: 9, color: PM.muted }}>157 ms</span>
                                    <span style={{ fontSize: 9, color: PM.muted }}>1.4 KB</span>
                                    <div style={{ display: 'flex', gap: 0, marginLeft: 'auto' }}>
                                        {['Body', 'Headers', 'Test Results'].map(t => (
                                            <div key={t} style={{ padding: '2px 7px', fontSize: 8, color: t === 'Test Results' && isTesting ? PM.orange : PM.muted, borderBottom: t === 'Test Results' && isTesting ? `1.5px solid ${PM.orange}` : '1.5px solid transparent', cursor: 'default' }}>{t}</div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ padding: '7px 10px' }}>
                                    <pre style={{ margin: 0, fontSize: 8.5, lineHeight: 1.6, fontFamily: 'monospace', color: '#a9b7c6' }}>{`{
  "page": 2, "per_page": 6, "total": 12,
  "data": [
    { "id": 7, "email": "michael.lawson@reqres.in",
      "first_name": "Michael" },
    { "id": 8, "email": "lindsay.ferguson@reqres.in",
      "first_name": "Lindsay" }
  ]
}`}</pre>
                                </div>
                                {isTesting && (
                                    <div style={{ borderTop: `1px solid ${PM.border}`, padding: '6px 10px' }}>
                                        <div style={{ fontSize: 9, color: PM.muted, marginBottom: 3 }}>Test Results — <span style={{ color: PM.green }}>2 / 2 passed</span></div>
                                        {['✓ Status 200', '✓ per_page is 6'].map((t, i) => (
                                            <div key={i} style={{ fontSize: 9, color: PM.green, fontFamily: 'monospace' }}>{t}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {s === 'idle' && (
                            <div style={{ padding: '20px', textAlign: 'center', color: PM.muted, fontSize: 10, background: PM.bgDark }}>
                                {isTr ? 'Yukarıdaki Send butonuna tıkla' : 'Click the Send button above'}
                            </div>
                        )}
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '6px', border: `1px solid ${PM.border}`, background: PM.bgDarker, color: PM.muted, fontSize: 10, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === K8S POD LIFECYCLE PLAYGROUND — kubectl Terminal + Dashboard ===
    const renderK8sPodPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'kubectl', 'api', 'etcd', 'scheduler', 'pulling', 'running', 'done']
        const cur = order.indexOf(s)

        // K8s blue theme
        const K8S = { bg: '#0d1117', bgDark: '#090d13', border: '#1e3a5c', text: '#c9d1d9', muted: '#586069', blue: '#326CE5', green: '#56d364', yellow: '#e3b341' }

        const cmdLines = [
            { minState: 'kubectl', text: '$ kubectl apply -f deployment.yaml', result: 'deployment.apps/my-nginx created', rc: K8S.green },
            { minState: 'api', text: '  → API Server: manifest validated ✓', result: 'ResourceQuota check passed', rc: K8S.muted },
            { minState: 'etcd', text: '  → etcd: desired state persisted ✓', result: 'Revision: 1 stored', rc: K8S.muted },
            { minState: 'scheduler', text: '  → Scheduler: best node selected ✓', result: 'Assigned: node-1 (2 cores free)', rc: K8S.yellow },
            { minState: 'pulling', text: '  → kubelet: pulling image ✓', result: 'nginx:latest (70.2 MB) pulled', rc: K8S.muted },
            { minState: 'running', text: '$ kubectl get pods -n production', result: '', rc: K8S.text },
        ]

        return (
            <div style={{ fontFamily: 'monospace', maxWidth: 310 }}>
                {/* Terminal window */}
                <div style={{ background: K8S.bgDark, borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                    {/* Window chrome */}
                    <div style={{ background: '#161b22', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${K8S.border}` }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42', display: 'inline-block' }} />
                        <span style={{ fontSize: 9, color: K8S.muted, marginLeft: 6 }}>Terminal — kubectl @ production</span>
                        <button
                            onClick={() => canStart && runSteps([['kubectl', 100], ['api', 700], ['etcd', 700], ['scheduler', 800], ['pulling', 900], ['running', 800], ['done', 600]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', background: !canStart ? K8S.muted : K8S.blue, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? `0 0 8px ${K8S.blue}55` : 'none' }}
                        >
                            {s === 'idle' ? '▶ kubectl apply' : s === 'done' ? '▶ Again' : '⏳'}
                        </button>
                    </div>

                    {/* Terminal content */}
                    <div style={{ padding: '8px 10px', minHeight: 110 }}>
                        {s === 'idle' && <span style={{ fontSize: 9, color: K8S.muted }}>{isTr ? 'kubectl apply komutunu çalıştırmak için ▶ butonuna bas' : 'Press ▶ to run kubectl apply'}</span>}

                        {cmdLines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? (
                                <div key={i} style={{ marginBottom: 2 }}>
                                    <div style={{ fontSize: 9, color: K8S.text, lineHeight: 1.7 }}>{ln.text}</div>
                                    {ln.result && <div style={{ fontSize: 8, color: ln.rc, paddingLeft: 4 }}>{ln.result}</div>}
                                </div>
                            ) : null
                        })}

                        {/* Pod status table — appears on 'running' */}
                        {cur >= order.indexOf('running') && (
                            <div style={{ marginTop: 4, borderTop: `1px solid ${K8S.border}`, paddingTop: 6 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 60px 50px 36px', gap: 4, fontSize: 7.5, color: K8S.muted, fontWeight: 700, padding: '2px 0', marginBottom: 3 }}>
                                    <div>NAME</div><div>READY</div><div>STATUS</div><div>RESTARTS</div><div>AGE</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 60px 50px 36px', gap: 4, fontSize: 8, padding: '3px 0', color: K8S.text }}>
                                    <div style={{ color: K8S.blue }}>my-nginx-6d8f9</div>
                                    <div style={{ color: K8S.green }}>1/1</div>
                                    <div><span style={{ background: `${K8S.green}22`, color: K8S.green, padding: '1px 5px', borderRadius: 3, fontSize: 7.5 }}>Running</span></div>
                                    <div style={{ color: K8S.muted }}>0</div>
                                    <div style={{ color: K8S.muted }}>12s</div>
                                </div>
                                <div style={{ fontSize: 7.5, color: K8S.blue, marginTop: 4 }}>↑ {isTr ? 'Pod STATUS: Running = container sağlıklı çalışıyor' : 'Pod STATUS: Running = container is healthy'}</div>
                            </div>
                        )}

                        {s === 'done' && (
                            <div style={{ marginTop: 6, fontSize: 8.5, color: K8S.green, fontWeight: 700 }}>
                                ✅ {isTr ? 'Deployment başarılı! Service port 80 → 8080 yönlendiriyor.' : 'Deployment successful! Service routing port 80 → 8080.'}
                            </div>
                        )}
                    </div>
                </div>

                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: K8S.bgDark, border: `1px solid ${K8S.border}`, color: K8S.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === PLAYWRIGHT AUTO-WAIT PLAYGROUND ===
    const renderPwAutoWaitPlayground = () => {
        const s = simState
        const checks = [
            { key: 'c-dom', label: 'attached to DOM?', passState: 'c-visible' },
            { key: 'c-visible', label: 'visible?', passState: 'c-stable' },
            { key: 'c-stable', label: 'not animating (stable)?', passState: 'c-events' },
            { key: 'c-events', label: 'receives pointer events?', passState: 'c-enabled' },
            { key: 'c-enabled', label: 'enabled?', passState: 'executing' },
        ]
        const stateOrder = ['idle', 'c-dom', 'c-visible', 'c-stable', 'c-events', 'c-enabled', 'executing', 'done']
        const curIdx = stateOrder.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const isDone = s === 'done'
        const isExecuting = s === 'executing'

        const btnBg = isDone || isExecuting ? '#10b981' : s !== 'idle' ? '#f59e0b' : accent

        return (
            <div>
                {/* Mini browser */}
                <div style={{ border: `2px solid ${accent}44`, borderRadius: 10, overflow: 'hidden', maxWidth: 260 }}>
                    <div style={{ background: '#1d4ed8', padding: '5px 10px', fontSize: 10, color: '#fff', display: 'flex', gap: 6 }}>
                        <span>🌐</span><span>shop.example.com/product</span>
                    </div>
                    <div style={{ padding: 16, minHeight: 90, background: darkMode ? '#111827' : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <div style={{ fontSize: 11, color: darkMode ? '#9ca3af' : '#6b7280' }}>
                            🛍️ {isTr ? 'Premium Kulaklık — ₺1299' : 'Premium Headphone — $89'}
                        </div>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            {/* The target button */}
                            <button
                                onClick={() => {
                                    if (!canStart) return
                                    runSteps([['c-dom', 50], ['c-visible', 500], ['c-stable', 500], ['c-events', 500], ['c-enabled', 500], ['executing', 500], ['done', 800]])
                                }}
                                disabled={!canStart}
                                style={{
                                    padding: '8px 20px', borderRadius: 8, border: 'none',
                                    background: btnBg,
                                    color: '#fff', fontWeight: 700, fontSize: 12,
                                    cursor: canStart ? 'pointer' : 'default',
                                    transition: 'background 0.3s',
                                    position: 'relative',
                                }}
                            >
                                {isDone ? (isTr ? '✅ Tıklandı!' : '✅ Clicked!') : isExecuting ? (isTr ? '⚡ Tıklanıyor...' : '⚡ Clicking...') : canStart ? (isTr ? '🛒 Sepete Ekle' : '🛒 Add to Cart') : (isTr ? '⏳ Check\'ler...' : '⏳ Checking...')}
                            </button>

                            {/* Playwright pointer indicator */}
                            {s !== 'idle' && !isDone && (
                                <div style={{
                                    position: 'absolute', right: -10, top: -10,
                                    fontSize: 18,
                                    filter: isExecuting ? 'none' : 'grayscale(1)',
                                    transition: 'filter 0.3s',
                                }}>🖱️</div>
                            )}
                        </div>

                        {isDone && (
                            <div style={{ fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                                {isTr ? 'Ürün sepete eklendi!' : 'Item added to cart!'}
                            </div>
                        )}
                    </div>
                </div>

                {s !== 'idle' && (
                    <button onClick={resetSim} style={{ marginTop: 8, padding: '5px 12px', borderRadius: 6, border: `1.5px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: 'transparent', color: darkMode ? '#f3f4f6' : '#111827', fontSize: 10, cursor: 'pointer' }}>
                        {isTr ? '🔄 Sıfırla' : '🔄 Reset'}
                    </button>
                )}
                {s === 'idle' && (
                    <div style={{ marginTop: 6, fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af' }}>
                        {isTr ? '↑ "Sepete Ekle" butonuna tıkla → auto-wait başlar' : '↑ Click "Add to Cart" → auto-wait begins'}
                    </div>
                )}
            </div>
        )
    }

    // === MULTI-WINDOW PLAYGROUND ===
    const renderMultiWindowPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const handleMain = 'CDwindow-a1b2'
        const handleNew = 'CDwindow-c3d4'
        const inNew = ['new-tab-open', 'in-new', 'closing'].includes(s)
        const windowClosed = ['closing', 'back-main', 'done'].includes(s)
        const backMain = ['back-main', 'done'].includes(s)

        const steps = [
            { key: 'clicking', label: isTr ? '① Link\'e tıkla' : '① Click link', done: ['clicking', 'collecting', 'switching', 'new-tab-open', 'in-new', 'closing', 'back-main', 'done'] },
            { key: 'collecting', label: isTr ? '② getWindowHandles()' : '② getWindowHandles()', done: ['collecting', 'switching', 'new-tab-open', 'in-new', 'closing', 'back-main', 'done'] },
            { key: 'switching', label: isTr ? '③ switchTo().window()' : '③ switchTo().window()', done: ['switching', 'new-tab-open', 'in-new', 'closing', 'back-main', 'done'] },
            { key: 'in-new', label: isTr ? '④ Yeni sekmede çalış' : '④ Work in new tab', done: ['in-new', 'closing', 'back-main', 'done'] },
            { key: 'closing', label: isTr ? '⑤ driver.close()' : '⑤ driver.close()', done: ['closing', 'back-main', 'done'] },
            { key: 'back-main', label: isTr ? '⑥ switchTo(mainWindow)' : '⑥ switchTo(mainWindow)', done: ['back-main', 'done'] },
        ]

        const tabBg = (active, current) => {
            if (current) return accent
            if (active) return darkMode ? '#374151' : '#e5e7eb'
            return 'transparent'
        }

        return (
            <div>
                {/* Tab bar */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                    {[
                        { label: '🏠 Main Tab', handle: handleMain, active: !inNew || backMain, closed: false },
                        { label: '📄 New Tab', handle: handleNew, active: inNew && !windowClosed, closed: windowClosed },
                    ].map((tab, i) => (
                        <div key={i} style={{
                            padding: '4px 12px', borderRadius: '6px 6px 0 0', fontSize: 10, fontWeight: 700,
                            background: tab.closed ? (darkMode ? '#374151' : '#e5e7eb') : tab.active ? accent : (darkMode ? '#1f2937' : '#f9fafb'),
                            color: tab.closed ? '#6b7280' : tab.active ? '#fff' : (darkMode ? '#9ca3af' : '#6b7280'),
                            textDecoration: tab.closed ? 'line-through' : 'none',
                            transition: 'all 0.3s',
                        }}>
                            {tab.label}
                            <span style={{ fontSize: 8, marginLeft: 4, opacity: 0.7 }}>{tab.handle}</span>
                        </div>
                    ))}
                </div>

                {/* Browser viewport */}
                <div style={{ border: `2px solid ${accent}44`, borderRadius: '0 8px 8px 8px', overflow: 'hidden', maxWidth: 280 }}>
                    <div style={{ background: accent, padding: '5px 10px', fontSize: 10, color: '#fff', display: 'flex', gap: 6 }}>
                        <span>🌐</span>
                        <span>{inNew && !windowClosed ? 'docs.example.com' : 'shop.example.com'}</span>
                    </div>
                    <div style={{ padding: 12, minHeight: 80, background: darkMode ? '#111827' : '#fff', transition: 'all 0.3s' }}>
                        {canStart && (
                            <a style={{ color: accent, fontSize: 11, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => runSteps([
                                ['clicking', 50], ['collecting', 600], ['switching', 600], ['new-tab-open', 50], ['in-new', 600], ['closing', 600], ['back-main', 600], ['done', 800]
                            ])}>
                                🔗 {isTr ? 'Belgeleri Aç (yeni sekmede)' : 'Open Docs (new tab)'}
                            </a>
                        )}
                        {inNew && !windowClosed && (
                            <div style={{ fontSize: 11, color: darkMode ? '#f3f4f6' : '#111827' }}>
                                <div style={{ fontWeight: 700, marginBottom: 4 }}>📄 {isTr ? 'API Dokümantasyonu' : 'API Documentation'}</div>
                                <div style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280' }}>docs.example.com/api/v2</div>
                            </div>
                        )}
                        {(s === 'closing' || backMain) && (
                            <a style={{ color: accent, fontSize: 11, textDecoration: 'underline' }}>
                                🔗 {isTr ? 'Belgeleri Aç (yeni sekmede)' : 'Open Docs (new tab)'}
                            </a>
                        )}
                    </div>
                </div>

                {/* Step progress */}
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {steps.map((st, i) => {
                        const done = st.done.includes(s) && s !== 'idle'
                        return (
                            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 10 }}>
                                <span style={{ color: done ? '#10b981' : (darkMode ? '#4b5563' : '#d1d5db'), transition: 'color 0.3s' }}>{done ? '✓' : '○'}</span>
                                <span style={{ color: done ? (darkMode ? '#f3f4f6' : '#111827') : (darkMode ? '#6b7280' : '#9ca3af'), transition: 'color 0.3s' }}>{st.label}</span>
                            </div>
                        )
                    })}
                </div>

                {s !== 'idle' && (
                    <button onClick={resetSim} style={{ marginTop: 10, padding: '6px 14px', borderRadius: 7, border: `1.5px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: 'transparent', color: darkMode ? '#f3f4f6' : '#111827', fontSize: 11, cursor: 'pointer' }}>
                        {isTr ? '🔄 Sıfırla' : '🔄 Reset'}
                    </button>
                )}
                {s === 'idle' && (
                    <div style={{ marginTop: 6, fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af' }}>
                        {isTr ? '↑ Linke tıkla ve pencere geçişini izle' : '↑ Click the link and watch window switching'}
                    </div>
                )}
            </div>
        )
    }

    // === EXPLICIT WAIT PLAYGROUND ===
    const renderExplicitWaitPlayground = () => {
        const showSpinner = ['clicking', 'loading'].includes(simState)
        const showResult = ['found', 'done'].includes(simState)
        const btnLabel =
            simState === 'idle' ? (isTr ? '▶ Veriyi Yükle' : '▶ Load Data') :
                simState === 'clicking' ? (isTr ? '⏳ İstek Gönderildi...' : '⏳ Request Sent...') :
                    simState === 'loading' ? (isTr ? '⏳ Yükleniyor...' : '⏳ Loading...') :
                        simState === 'found' ? (isTr ? '✅ Tamamlandı!' : '✅ Completed!') :
                            (isTr ? '🔄 Tekrar Dene' : '🔄 Try Again')
        const btnDisabled = ['clicking', 'loading', 'found'].includes(simState)
        return (
            <div>
                <div style={{ border: `2px solid ${accent}33`, borderRadius: 10, overflow: 'hidden', maxWidth: 300 }}>
                    <div style={{ background: accent, padding: '5px 10px', fontSize: 10, color: '#fff', display: 'flex', gap: 6 }}>
                        <span>🌐</span><span>shop.example.com/api/products</span>
                    </div>
                    <div style={{ padding: 14, minHeight: 130, background: darkMode ? '#111827' : '#ffffff' }}>
                        <button
                            onClick={() => {
                                if (simState === 'idle' || simState === 'done') {
                                    runSteps([['clicking', 50], ['loading', 1500], ['found', 600], ['done', 1200]])
                                }
                            }}
                            disabled={btnDisabled}
                            style={{
                                display: 'block', width: '100%', padding: '8px 14px',
                                borderRadius: 6, border: 'none',
                                cursor: btnDisabled ? 'not-allowed' : 'pointer',
                                background: showResult ? '#10b981' : btnDisabled ? '#6b7280' : accent,
                                color: '#fff', fontWeight: 700, fontSize: 12, transition: 'background 0.4s',
                            }}
                        >
                            {btnLabel}
                        </button>
                        {showSpinner && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, justifyContent: 'center' }}>
                                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${accent}33`, borderTopColor: accent, animation: 'simSpin 0.7s linear infinite' }} />
                                <span style={{ fontSize: 10, color: darkMode ? '#9ca3af' : '#6b7280' }}>
                                    {isTr ? 'Sunucudan yanıt bekleniyor...' : 'Waiting for server response...'}
                                </span>
                            </div>
                        )}
                        {showSpinner && (
                            <div style={{ marginTop: 8, fontSize: 10, textAlign: 'center', color: accent, fontWeight: 600, animation: 'simPulse 1.2s ease infinite' }}>
                                {isTr ? '⏱️ WebDriverWait bekliyor... (max 10s)' : '⏱️ WebDriverWait polling... (max 10s)'}
                            </div>
                        )}
                        {showResult && (
                            <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 6, background: darkMode ? '#064e3b' : '#ecfdf5', border: '1.5px solid #10b981', animation: 'simFadeUp 0.4s ease', fontSize: 10, color: darkMode ? '#6ee7b7' : '#065f46', fontFamily: 'monospace' }}>
                                <div style={{ fontWeight: 700, marginBottom: 2 }}>{'<div id="result">'}</div>
                                <div style={{ paddingLeft: 12 }}>{'{ name: "MacBook", price: 2499 }'}</div>
                                <div>{'</div>'}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === DRAG & DROP PLAYGROUND ===
    const renderDragDropPlayground = () => {
        const isPicking = simState === 'picking'
        const isDragging = ['dragging', 'over'].includes(simState)
        const isOver = simState === 'over'
        const isDropped = ['dropped', 'done'].includes(simState)
        const canStart = simState === 'idle' || simState === 'done'

        const btnLabel =
            simState === 'idle' ? (isTr ? '▶ Sürükle!' : '▶ Drag!') :
                simState === 'picking' ? (isTr ? '✋ Yakalandı...' : '✋ Grabbed...') :
                    ['dragging', 'over'].includes(simState) ? (isTr ? '🌀 Sürükleniyor...' : '🌀 Dragging...') :
                        simState === 'dropped' ? (isTr ? '✅ Bırakıldı!' : '✅ Dropped!') :
                            (isTr ? '🔄 Tekrar' : '🔄 Replay')

        return (
            <div>
                <div style={{ position: 'relative', height: 120, marginBottom: 10 }}>
                    {/* Source box */}
                    {!isDropped && (
                        <div style={{
                            position: 'absolute', left: 8, top: 28,
                            width: 88, height: 64,
                            background: isPicking || isDragging ? accent : (darkMode ? '#4b5563' : '#6b7280'),
                            color: '#fff', borderRadius: 8,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 700, gap: 3,
                            boxShadow: isPicking ? `0 8px 20px ${accent}55` : isDragging ? `0 14px 32px ${accent}66` : 'none',
                            transform: isPicking ? 'scale(1.06) translateY(-4px)' : isDragging ? 'translateX(125px) translateY(-10px) scale(1.05)' : 'scale(1)',
                            transition: isPicking
                                ? 'transform 0.2s ease, box-shadow 0.2s'
                                : isDragging
                                    ? 'transform 0.85s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s'
                                    : 'none',
                            zIndex: 10, cursor: canStart ? 'grab' : 'default',
                        }}>
                            <span style={{ fontSize: 22 }}>📦</span>
                            <span>{isTr ? 'Kaynak' : 'Source'}</span>
                        </div>
                    )}

                    {/* Arrow hint */}
                    {simState === 'idle' && (
                        <div style={{ position: 'absolute', left: 104, top: 52, color: '#9ca3af', fontSize: 20 }}>→</div>
                    )}

                    {/* Target / Drop Zone */}
                    <div style={{
                        position: 'absolute', right: 8, top: 18,
                        width: 110, height: 84,
                        border: `2px dashed ${isOver ? accent : isDropped ? '#10b981' : '#6b7280'}`,
                        borderRadius: 8,
                        background: isDropped ? '#10b98120' : isOver ? `${accent}18` : 'transparent',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, gap: 3,
                        color: isDropped ? '#10b981' : '#9ca3af',
                        transition: 'border-color 0.3s, background 0.3s',
                    }}>
                        {isDropped ? (
                            <>
                                <span style={{ fontSize: 22 }}>📦</span>
                                <span>✅ {isTr ? 'Bırakıldı!' : 'Dropped!'}</span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: 22 }}>🎯</span>
                                <span>Drop Zone</span>
                            </>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => canStart && runSteps([['picking', 50], ['dragging', 400], ['over', 850], ['dropped', 300], ['done', 1000]])}
                        disabled={!canStart}
                        style={{
                            padding: '7px 18px', borderRadius: 7, border: 'none',
                            background: !canStart ? '#6b7280' : accent,
                            color: '#fff', fontWeight: 700, fontSize: 12,
                            cursor: !canStart ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                        }}
                    >{btnLabel}</button>
                    {simState !== 'idle' && (
                        <button onClick={resetSim} style={{ padding: '7px 14px', borderRadius: 7, border: `1.5px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: 'transparent', color: darkMode ? '#f3f4f6' : '#111827', fontSize: 12, cursor: 'pointer' }}>
                            {isTr ? '🔄 Sıfırla' : '🔄 Reset'}
                        </button>
                    )}
                </div>
            </div>
        )
    }

    // === ALERT / CONFIRM / PROMPT PLAYGROUND ===
    const renderAlertSimPlayground = () => {
        const sched = (state, delay) => {
            const t = setTimeout(() => setSimState(state), delay)
            timersRef.current.push(t)
        }

        const isAlertOpen = simState === 'alert-open'
        const isAlertDone = simState === 'alert-done'
        const isConfirmOpen = simState === 'confirm-open'
        const isConfirmOk = simState === 'confirm-ok'
        const isConfirmCxl = simState === 'confirm-cancel'
        const isPromptOpen = simState === 'prompt-open'
        const isPromptDone = simState === 'prompt-done'
        const isDone = simState === 'done'

        const showDialog = isAlertOpen || isConfirmOpen || isPromptOpen
        const pageBg = darkMode ? '#111827' : '#ffffff'
        const dialogBg = darkMode ? '#1f2937' : '#f9fafb'
        const dialogBorder = darkMode ? '#4b5563' : '#d1d5db'
        const textMain = darkMode ? '#f3f4f6' : '#111827'
        const subtext = darkMode ? '#9ca3af' : '#6b7280'

        const btnStyle = (bg) => ({
            padding: '5px 16px', borderRadius: 5, border: 'none',
            background: bg, color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer',
        })

        const dialogTitle =
            isAlertOpen ? (isTr ? '⚠️ Sayfa Şunu Söylüyor:' : '⚠️ This page says:') :
                isConfirmOpen ? (isTr ? '❓ Onaylıyor musunuz?' : '❓ Are you sure?') :
                    isPromptOpen ? (isTr ? '📝 Değer Girin:' : '📝 Enter a value:') : ''

        const dialogMsg =
            isAlertOpen ? (isTr ? 'Kayıt başarıyla tamamlandı!' : 'Record saved successfully!') :
                isConfirmOpen ? (isTr ? 'Bu öğeyi silmek istiyor musunuz?' : 'Do you want to delete this item?') :
                    isPromptOpen ? (isTr ? 'Kullanıcı adınızı girin:' : 'Enter your username:') : ''

        const resultMsg =
            isAlertDone ? '✅ alert.accept()' :
                isConfirmOk ? '✅ confirm.accept()' :
                    isConfirmCxl ? '❌ confirm.dismiss()' :
                        isPromptDone ? '✅ prompt.sendKeys("testuser") → accept()' : ''

        return (
            <div>
                {/* Mini browser */}
                <div style={{ border: `2px solid ${accent}44`, borderRadius: 10, overflow: 'hidden', maxWidth: 290, position: 'relative' }}>
                    <div style={{ background: accent, padding: '5px 10px', fontSize: 10, color: '#fff', display: 'flex', gap: 6 }}>
                        <span>🌐</span><span>shop.example.com/checkout</span>
                    </div>
                    <div style={{ padding: 14, minHeight: 100, background: pageBg, position: 'relative' }}>
                        {(simState === 'idle' || isDone) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                <button onClick={() => setSimState('alert-open')} style={{ ...btnStyle('#7c3aed'), textAlign: 'left' }}>⚠️ window.alert()</button>
                                <button onClick={() => setSimState('confirm-open')} style={{ ...btnStyle('#f59e0b'), textAlign: 'left' }}>❓ window.confirm()</button>
                                <button onClick={() => setSimState('prompt-open')} style={{ ...btnStyle('#3b82f6'), textAlign: 'left' }}>📝 window.prompt()</button>
                            </div>
                        )}
                        {(isAlertDone || isConfirmOk || isConfirmCxl || isPromptDone) && (
                            <div style={{ textAlign: 'center', padding: 16, color: isConfirmCxl ? '#ef4444' : '#10b981', fontSize: 12, fontWeight: 700 }}>
                                {resultMsg}
                            </div>
                        )}

                        {/* Dialog overlay */}
                        {showDialog && (
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                background: '#00000066', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 20,
                            }}>
                                <div style={{ background: dialogBg, border: `1px solid ${dialogBorder}`, borderRadius: 8, padding: 14, width: 200, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: textMain, marginBottom: 6 }}>{dialogTitle}</div>
                                    <div style={{ fontSize: 11, color: subtext, marginBottom: 10 }}>{dialogMsg}</div>
                                    {isPromptOpen && (
                                        <input defaultValue="testuser" style={{
                                            width: '100%', padding: '4px 8px', borderRadius: 5, fontSize: 11,
                                            border: `1px solid ${dialogBorder}`, background: pageBg, color: textMain,
                                            marginBottom: 10, boxSizing: 'border-box',
                                        }} readOnly />
                                    )}
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                        {isConfirmOpen && (
                                            <button onClick={() => { setSimState('confirm-cancel'); sched('prompt-open', 700) }} style={{ ...btnStyle('#6b7280') }}>
                                                {isTr ? 'İptal' : 'Cancel'}
                                            </button>
                                        )}
                                        <button onClick={() => {
                                            if (isAlertOpen) { setSimState('alert-done'); sched('confirm-open', 800) }
                                            if (isConfirmOpen) { setSimState('confirm-ok'); sched('prompt-open', 700) }
                                            if (isPromptOpen) { setSimState('prompt-done'); sched('done', 700) }
                                        }} style={{ ...btnStyle('#10b981') }}>
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isDone && (
                    <button onClick={resetSim} style={{ marginTop: 10, padding: '6px 14px', borderRadius: 7, border: `1.5px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: 'transparent', color: darkMode ? '#f3f4f6' : '#111827', fontSize: 11, cursor: 'pointer' }}>
                        {isTr ? '🔄 Tekrar Dene' : '🔄 Try Again'}
                    </button>
                )}
                {simState === 'idle' && (
                    <div style={{ marginTop: 8, fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af' }}>
                        {isTr ? '↑ Bir butona tıkla ve dialog simülasyonunu başlat' : '↑ Click a button to trigger the dialog simulation'}
                    </div>
                )}
            </div>
        )
    }

    // === IMPLICIT WAIT PLAYGROUND ===
    const renderImplicitWaitPlayground = () => {
        const isNoFail = simState === 'no-fail'
        const isWithRetry = simState === 'with-retry'
        const isWithFound = simState === 'with-found'
        return (
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxWidth: 320 }}>
                    <div style={{ border: '1.5px solid #ef444444', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ background: '#ef4444', padding: '4px 8px', fontSize: 9, color: '#fff', fontWeight: 700 }}>❌ Without Wait</div>
                        <div style={{ padding: 8, background: darkMode ? '#1f2937' : '#fff', minHeight: 90 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 6 }}>
                                {isTr ? 'Element henüz DOM\'da yok...' : 'Element not in DOM yet...'}
                            </div>
                            <button
                                onClick={() => { if (!isRunning) runSteps([['no-fail', 200]]) }}
                                disabled={isRunning}
                                style={{ width: '100%', padding: '5px', borderRadius: 4, border: 'none', background: '#ef4444', color: '#fff', fontSize: 10, cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                            >
                                {isTr ? 'Element Bul' : 'Find Element'}
                            </button>
                            {isNoFail && (
                                <div style={{ marginTop: 6, fontSize: 9, color: '#ef4444', fontFamily: 'monospace', animation: 'simFadeUp 0.3s', lineHeight: 1.5 }}>
                                    NoSuchElementException!<br />Element not found
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ border: '1.5px solid #10b98144', borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ background: '#10b981', padding: '4px 8px', fontSize: 9, color: '#fff', fontWeight: 700 }}>✅ Implicit Wait</div>
                        <div style={{ padding: 8, background: darkMode ? '#1f2937' : '#fff', minHeight: 90 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 6, fontFamily: 'monospace' }}>
                                implicitly_wait(10)
                            </div>
                            <button
                                onClick={() => { if (!isRunning) runSteps([['with-retry', 400], ['with-found', 1400]]) }}
                                disabled={isRunning}
                                style={{ width: '100%', padding: '5px', borderRadius: 4, border: 'none', background: '#10b981', color: '#fff', fontSize: 10, cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                            >
                                {isTr ? 'Element Bul' : 'Find Element'}
                            </button>
                            {isWithRetry && (
                                <div style={{ marginTop: 6, fontSize: 9, color: accent, fontFamily: 'monospace', animation: 'simFadeUp 0.3s simPulse 1s' }}>
                                    🔄 {isTr ? 'DOM\'u tekrar tarıyor...' : 'Retrying DOM search...'}
                                </div>
                            )}
                            {isWithFound && (
                                <div style={{ marginTop: 6, fontSize: 9, color: '#10b981', fontFamily: 'monospace', animation: 'simFadeUp 0.3s', lineHeight: 1.5 }}>
                                    ✅ Element found!<br />{'<button id="submit">'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === IFRAME DETECTION PLAYGROUND ===
    const renderIframeDetectionPlayground = () => {
        const phase = simState
        const isScanning = phase === 'scanning'
        const isFound = ['found', 'switching', 'inside'].includes(phase)
        const isSwitching = phase === 'switching'
        const isInside = phase === 'inside'

        const iframes = [
            { id: 'iframe[0]', label: isTr ? '💳 Ödeme Formu' : '💳 Payment Form', color: '#f59e0b', desc: isTr ? 'Stripe / PayPal embed' : 'Stripe / PayPal embed' },
            { id: 'iframe[1]', label: isTr ? '🎬 Video Player' : '🎬 Video Player', color: '#3b82f6', desc: 'YouTube embed' },
        ]

        return (
            <div style={{ maxWidth: 340 }}>
                {/* Browser chrome */}
                <div style={{ borderRadius: 10, border: `2px solid ${accent}44`, overflow: 'hidden' }}>
                    {/* Address bar */}
                    <div style={{ background: '#1e293b', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, background: '#334155', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>
                            https://shop.example.com/checkout
                        </div>
                    </div>

                    {/* Page content */}
                    <div style={{ background: darkMode ? '#111827' : '#f8fafc', padding: 10, minHeight: 200, position: 'relative' }}>
                        {/* Normal page elements */}
                        <div style={{ fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af', marginBottom: 8, fontWeight: 600 }}>
                            🏪 {isTr ? 'Ürün Özeti — Normal DOM' : 'Order Summary — Normal DOM'}
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                            {[isTr ? '📦 Ürün: MacBook Pro' : '📦 Product: MacBook Pro', isTr ? '💰 Fiyat: $2499' : '💰 Price: $2499'].map((t, i) => (
                                <div key={i} style={{ flex: 1, padding: '4px 6px', borderRadius: 4, background: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, fontSize: 9, color: darkMode ? '#d1d5db' : '#374151' }}>{t}</div>
                            ))}
                        </div>

                        {/* iframes embedded in page */}
                        {iframes.map((fr, idx) => {
                            const isActive = isFound && !isInside
                            const isActiveFrame = isInside && idx === 0
                            return (
                                <div key={fr.id} style={{
                                    marginBottom: 6, borderRadius: 6, overflow: 'hidden',
                                    border: `2px ${isActive || isActiveFrame ? 'solid' : 'dashed'} ${isActive || isActiveFrame ? fr.color : (darkMode ? '#374151' : '#d1d5db')}`,
                                    animation: isActive ? `simPulse 1.2s ease infinite` : 'none',
                                    transition: 'border 0.4s, box-shadow 0.4s',
                                    boxShadow: isActiveFrame ? `0 0 16px ${fr.color}88` : isActive ? `0 0 8px ${fr.color}44` : 'none',
                                    position: 'relative',
                                }}>
                                    {/* iframe label badge */}
                                    {(isFound || isInside) && (
                                        <div style={{
                                            position: 'absolute', top: -1, left: 4,
                                            background: isActiveFrame ? fr.color : (darkMode ? '#1f2937' : '#fff'),
                                            border: `1px solid ${fr.color}`,
                                            borderRadius: '0 0 4px 4px', padding: '1px 6px', fontSize: 8, fontWeight: 700,
                                            color: isActiveFrame ? '#fff' : fr.color, zIndex: 10,
                                            animation: isActiveFrame ? 'none' : 'simFadeUp 0.3s',
                                        }}>
                                            {isActiveFrame ? `✅ ${isTr ? 'İçindesin!' : 'You\'re inside!'}` : `📌 ${fr.id}`}
                                        </div>
                                    )}
                                    <div style={{ padding: '10px 8px', background: darkMode ? '#0f172a' : '#fff', fontSize: 9 }}>
                                        <div style={{ color: fr.color, fontWeight: 700, marginBottom: 3 }}>{fr.label}</div>
                                        <div style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>{fr.desc}</div>
                                        {isActiveFrame && (
                                            <div style={{ marginTop: 4, padding: '3px 6px', background: '#10b98122', border: '1px solid #10b981', borderRadius: 3, color: '#10b981', fontSize: 8, animation: 'simFadeUp 0.3s' }}>
                                                {isTr ? '👁 Selenium burdayım görüyor!' : '👁 Selenium can see me now!'}
                                            </div>
                                        )}
                                        {isScanning && (
                                            <div style={{ marginTop: 3, fontSize: 8, color: darkMode ? '#374151' : '#e5e7eb' }}>
                                                {isTr ? 'tarıyor...' : 'scanning...'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Scanning overlay */}
                        {isScanning && (
                            <div style={{ position: 'absolute', inset: 0, background: `${accent}08`, animation: 'simPulse 0.6s ease infinite', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: accent, fontWeight: 700, fontSize: 10, background: darkMode ? '#111827' : '#fff', padding: '4px 10px', borderRadius: 6, border: `1px solid ${accent}44` }}>
                                    🔍 {isTr ? 'DOM tarıyor...' : 'Scanning DOM...'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Control buttons */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => runSteps([['scanning', 100], ['found', 800]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '6px 8px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: accent, color: '#fff', fontSize: 10, fontWeight: 700 }}
                    >
                        🔍 {isTr ? 'iframe\'leri Tara' : 'Scan for iframes'}
                    </button>
                    <button
                        onClick={() => runSteps([['scanning', 50], ['found', 600], ['switching', 400], ['inside', 600]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '6px 8px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#059669', color: '#fff', fontSize: 10, fontWeight: 700 }}
                    >
                        ↩ {isTr ? 'switchTo().frame(0)' : 'switchTo().frame(0)'}
                    </button>
                </div>
                <div style={{ marginTop: 4, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === SHADOW DOM X-RAY PLAYGROUND ===
    const renderShadowDomXrayPlayground = () => {
        const phase = simState
        const isNormal = phase === 'idle' || phase === 'normal'
        const isFailing = phase === 'fail'
        const isXray = phase === 'xray'
        const isExposed = phase === 'exposed'
        const isPierced = phase === 'pierced'
        const showShadow = isXray || isExposed || isPierced

        return (
            <div style={{ maxWidth: 320 }}>
                {/* The "web component" on the page */}
                <div style={{ borderRadius: 10, border: `2px solid ${accent}44`, overflow: 'hidden' }}>
                    <div style={{ background: '#1e293b', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['#ef4444', '#f59e0b', '#22c55e'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, background: '#334155', borderRadius: 4, padding: '2px 8px', fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>
                            https://app.example.com/login
                        </div>
                    </div>

                    <div style={{ background: darkMode ? '#111827' : '#f8fafc', padding: 12, minHeight: 180 }}>
                        {/* Normal looking page */}
                        <div style={{ fontSize: 10, color: darkMode ? '#6b7280' : '#9ca3af', marginBottom: 8 }}>
                            {isTr ? '🔐 Giriş Formu' : '🔐 Login Form'}
                        </div>

                        {/* Username - normal DOM */}
                        <div style={{ marginBottom: 6 }}>
                            <div style={{ fontSize: 9, color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 2 }}>
                                {isTr ? 'Kullanıcı Adı (normal DOM):' : 'Username (normal DOM):'}
                            </div>
                            <div style={{ padding: '5px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`, background: darkMode ? '#1f2937' : '#fff', fontSize: 10, color: darkMode ? '#d1d5db' : '#374151' }}>
                                <input placeholder="admin" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 10, color: 'inherit', width: '100%' }} readOnly />
                            </div>
                        </div>

                        {/* Password - inside Shadow DOM (the web component) */}
                        <div style={{ marginBottom: 8, position: 'relative' }}>
                            <div style={{ fontSize: 9, marginBottom: 2, color: isFailing ? '#ef4444' : (showShadow ? '#a78bfa' : (darkMode ? '#9ca3af' : '#6b7280')) }}>
                                {showShadow ? (isTr ? '🕶 Shadow DOM içinde (X-Ray görüşü):' : '🕶 Inside Shadow DOM (X-Ray view):') :
                                    isFailing ? (isTr ? '❌ Bu element bulunamıyor — Shadow DOM içinde!' : '❌ Cannot find this — it\'s inside Shadow DOM!') :
                                        (isTr ? 'Şifre (<my-password-input> web component):' : 'Password (<my-password-input> web component):')}
                            </div>

                            {/* The web component wrapper */}
                            <div style={{
                                borderRadius: 6, border: `2px ${showShadow ? 'solid' : 'dashed'} ${showShadow ? '#a78bfa' : isFailing ? '#ef4444' : (darkMode ? '#374151' : '#d1d5db')}`,
                                overflow: 'hidden', transition: 'all 0.4s',
                                boxShadow: showShadow ? '0 0 14px #a78bfa44' : isFailing ? '0 0 8px #ef444444' : 'none',
                            }}>
                                {/* Shadow host label */}
                                <div style={{ background: showShadow ? '#a78bfa22' : (darkMode ? '#1f2937' : '#f1f5f9'), padding: '3px 6px', fontSize: 8, color: showShadow ? '#a78bfa' : (darkMode ? '#6b7280' : '#9ca3af'), fontFamily: 'monospace', borderBottom: `1px solid ${showShadow ? '#a78bfa33' : (darkMode ? '#374151' : '#e5e7eb')}` }}>
                                    {'<my-password-input>'}
                                    {showShadow && <span style={{ marginLeft: 6, color: '#f59e0b', fontWeight: 700 }}>← Shadow Host</span>}
                                    {isFailing && <span style={{ marginLeft: 6, color: '#ef4444' }}>← findElement() buraya giremiyor!</span>}
                                </div>

                                {/* Shadow root (only visible in xray mode) */}
                                {showShadow && (
                                    <div style={{ animation: 'simFadeUp 0.4s', padding: '4px 6px', background: darkMode ? '#0f172a' : '#faf5ff' }}>
                                        <div style={{ fontSize: 8, color: '#a78bfa', fontFamily: 'monospace', marginBottom: 3 }}>
                                            #shadow-root (open)
                                        </div>
                                        <div style={{ paddingLeft: 12, fontSize: 8, fontFamily: 'monospace' }}>
                                            <div style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}>{'<style> ... </style>'}</div>
                                            <div style={{
                                                marginTop: 3, padding: '3px 6px',
                                                borderRadius: 3,
                                                border: `1px solid ${isPierced ? '#10b981' : '#a78bfa'}44`,
                                                background: isPierced ? '#10b98122' : '#a78bfa11',
                                                color: isPierced ? '#10b981' : (darkMode ? '#d1d5db' : '#374151'),
                                                fontWeight: isPierced ? 700 : 400,
                                                transition: 'all 0.4s',
                                            }}>
                                                {'<input type="password" id="pwd">'}
                                                {isPierced && <span style={{ color: '#10b981', marginLeft: 4, fontSize: 7 }}>← BULUNDU ✅</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Normal looking input (opaque when not xray) */}
                                {!showShadow && (
                                    <div style={{ padding: '5px 8px', background: darkMode ? '#1f2937' : '#fff' }}>
                                        <input type="password" placeholder="••••••••" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 10, color: darkMode ? '#d1d5db' : '#374151', width: '100%' }} readOnly />
                                    </div>
                                )}
                            </div>

                            {/* Failure indicator */}
                            {isFailing && (
                                <div style={{ marginTop: 4, fontSize: 9, color: '#ef4444', animation: 'simFadeUp 0.3s', fontFamily: 'monospace' }}>
                                    NoSuchElementException: Unable to locate element: #pwd
                                </div>
                            )}

                            {/* Success indicator */}
                            {isPierced && (
                                <div style={{ marginTop: 4, fontSize: 9, color: '#10b981', animation: 'simFadeUp 0.3s', fontFamily: 'monospace' }}>
                                    ✅ {isTr ? 'shadowRoot.findElement() → bulundu!' : 'shadowRoot.findElement() → found!'}
                                </div>
                            )}
                        </div>

                        {/* Login button - normal DOM */}
                        <div style={{ padding: '6px', borderRadius: 4, background: accent, textAlign: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>
                            {isTr ? 'Giriş Yap' : 'Sign In'}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => runSteps([['fail', 300]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '5px 6px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700 }}
                    >
                        ❌ {isTr ? 'Normal findElement()' : 'Normal findElement()'}
                    </button>
                    <button
                        onClick={() => runSteps([['xray', 200], ['exposed', 500], ['pierced', 600]])}
                        disabled={isRunning}
                        style={{ flex: 1, padding: '5px 6px', borderRadius: 5, border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer', background: '#7c3aed', color: '#fff', fontSize: 9, fontWeight: 700 }}
                    >
                        🕶 {isTr ? 'X-Ray + shadowRoot' : 'X-Ray + shadowRoot'}
                    </button>
                </div>
                <div style={{ marginTop: 4, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === SHADOW DOM PLAYGROUND ===
    const renderShadowDomPlayground = () => {
        const showRoot = simState === 'root' || simState === 'target'
        const showTarget = simState === 'target'
        return (
            <div style={{ maxWidth: 300 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 2, padding: '10px 14px', borderRadius: 8, background: darkMode ? '#111827' : '#f8fafc', border: `1px solid ${accent}33`, minHeight: 110 }}>
                    <div style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>{'<my-custom-button>'}</div>
                    <div style={{ paddingLeft: 14, color: (simState === 'host' || showRoot) ? accent : (darkMode ? '#4b5563' : '#9ca3af'), fontWeight: simState === 'host' ? 700 : 400, transition: 'all 0.3s' }}>
                        {'  #shadow-root (open)'}
                        {simState === 'host' && <span style={{ color: '#f59e0b', fontSize: 9, marginLeft: 4 }}>← .shadowRoot</span>}
                    </div>
                    {showRoot && (
                        <div style={{ animation: 'simFadeUp 0.3s' }}>
                            <div style={{ paddingLeft: 28, color: darkMode ? '#a78bfa' : '#7c3aed' }}>{'  <style>...</style>'}</div>
                            <div style={{
                                paddingLeft: 28,
                                color: showTarget ? '#10b981' : (darkMode ? '#d1d5db' : '#374151'),
                                fontWeight: showTarget ? 700 : 400,
                                background: showTarget ? (darkMode ? '#064e3b' : '#ecfdf5') : 'transparent',
                                padding: showTarget ? '1px 4px' : '0 0 0 28px',
                                borderRadius: showTarget ? 3 : 0,
                                transition: 'all 0.4s',
                            }}>
                                {'  <button class="inner-btn">Click Me</button>'}
                                {showTarget && <span style={{ color: '#10b981', fontSize: 9, marginLeft: 4 }}>← FOUND ✅</span>}
                            </div>
                        </div>
                    )}
                    <div style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>{'</my-custom-button>'}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {[
                        { id: 'host', label: isTr ? '1. Host Bul' : '1. Find Host' },
                        { id: 'root', label: isTr ? '2. Root Aç' : '2. Pierce Root' },
                        { id: 'target', label: isTr ? '3. Element Bul!' : '3. Find Target!' },
                    ].map(step => (
                        <button
                            key={step.id}
                            onClick={() => {
                                if (!isRunning) {
                                    const order = ['host', 'root', 'target']
                                    const upTo = order.slice(0, order.indexOf(step.id) + 1).map(s => [s, 500])
                                    runSteps(upTo)
                                }
                            }}
                            style={{
                                padding: '5px 10px', borderRadius: 5, border: 'none',
                                cursor: isRunning ? 'not-allowed' : 'pointer',
                                background: simState === step.id ? accent : (darkMode ? '#374151' : '#f1f5f9'),
                                color: simState === step.id ? '#fff' : (darkMode ? '#9ca3af' : '#6b7280'),
                                fontSize: 10, fontWeight: 600, transition: 'all 0.3s'
                            }}
                        >
                            {step.label}
                        </button>
                    ))}
                </div>
                <div style={{ marginTop: 6, textAlign: 'right' }}>
                    <button onClick={resetSim} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: 'transparent', color: darkMode ? '#6b7280' : '#9ca3af', cursor: 'pointer' }}>↺ Reset</button>
                </div>
            </div>
        )
    }

    // === APPIUM ELEMENT DETECTION PLAYGROUND ===
    const renderAppiumElementDetectionPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'connecting', 'scanning', 'tree-built', 'selected', 'locator-ready', 'done']
        const cur = order.indexOf(s)
        const AI = { bgDark: '#13141b', border: '#2d3047', text: '#a6accd', muted: '#585e79', purple: '#7c3aed', green: '#17c784', yellow: '#ffd66e' }
        const treeItems = [
            { indent: 0, tag: 'FrameLayout', resource: '' },
            { indent: 1, tag: '↳ LinearLayout', resource: '' },
            { indent: 2, tag: '↳ TextView', resource: 'text="Welcome Back"' },
            { indent: 2, tag: '↳ EditText', resource: 'resource-id="et_email"', highlight: true },
            { indent: 2, tag: '↳ EditText', resource: 'resource-id="et_password"' },
            { indent: 2, tag: '↳ Button', resource: 'resource-id="btn_login"' },
        ]
        return (
            <div style={{ fontFamily: 'monospace', maxWidth: 310 }}>
                <div style={{ background: AI.bgDark, borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                    <div style={{ background: '#13141b', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${AI.border}` }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42', display: 'inline-block' }} />
                        <span style={{ fontSize: 9, color: AI.muted, marginLeft: 6 }}>Appium Inspector 3.x</span>
                        <button
                            onClick={() => canStart && runSteps([['connecting', 300], ['scanning', 900], ['tree-built', 1000], ['selected', 800], ['locator-ready', 700], ['done', 400]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', background: !canStart ? AI.muted : AI.purple, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', boxShadow: canStart && s === 'idle' ? `0 0 8px ${AI.purple}55` : 'none' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ Tara' : '▶ Scan') : s === 'done' ? (isTr ? '▶ Tekrar' : '▶ Again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: '8px 10px', minHeight: 140 }}>
                        {s === 'idle' && <div style={{ fontSize: 9, color: AI.muted, textAlign: 'center', paddingTop: 20 }}>{isTr ? 'Uygulamayı taramak için ▶ butonuna bas' : 'Press ▶ to scan the app'}</div>}
                        {s === 'connecting' && <div style={{ fontSize: 9, color: AI.yellow, animation: 'simPulse 0.8s ease infinite' }}>⏳ {isTr ? 'Appium Server\'a bağlanılıyor... ws://127.0.0.1:4723' : 'Connecting to Appium Server... ws://127.0.0.1:4723'}</div>}
                        {s === 'scanning' && (
                            <div>
                                <div style={{ fontSize: 9, color: AI.green, marginBottom: 6 }}>🔍 {isTr ? 'Ekran taranıyor (screenshot + source XML)...' : 'Scanning screen (screenshot + source XML)...'}</div>
                                <div style={{ display: 'flex', gap: 3 }}>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} style={{ height: 4, flex: 1, background: AI.purple, borderRadius: 2, opacity: 0.2 + i * 0.16, animation: `simPulse ${0.5 + i * 0.1}s ease infinite` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {cur >= order.indexOf('tree-built') && (
                            <div>
                                <div style={{ fontSize: 8, color: AI.muted, marginBottom: 4 }}>📱 {isTr ? 'Source XML — Element Ağacı:' : 'Source XML — Element Tree:'}</div>
                                {treeItems.map((item, idx) => {
                                    const isHighlighted = cur >= order.indexOf('selected') && item.highlight
                                    return (
                                        <div key={idx} style={{ paddingLeft: item.indent * 10 + 4, paddingTop: 2, paddingBottom: 2, fontSize: 8, color: isHighlighted ? AI.green : AI.text, background: isHighlighted ? `${AI.green}18` : 'transparent', border: `1px solid ${isHighlighted ? AI.green : 'transparent'}44`, borderRadius: 3, marginBottom: 1, fontWeight: isHighlighted ? 700 : 400, transition: 'all 0.3s', animation: isHighlighted ? 'simFadeUp 0.3s' : undefined }}>
                                            {item.tag}
                                            {item.resource && <span style={{ color: isHighlighted ? AI.yellow : AI.muted, marginLeft: 4 }}>{item.resource}</span>}
                                            {isHighlighted && <span style={{ color: AI.green, marginLeft: 4 }}>← 🎯</span>}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {cur >= order.indexOf('locator-ready') && (
                            <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: `${AI.purple}18`, border: `1px solid ${AI.purple}44`, animation: 'simFadeUp 0.4s' }}>
                                <div style={{ fontSize: 8, color: AI.purple, fontWeight: 700, marginBottom: 3 }}>✅ {isTr ? 'Locator Önerisi:' : 'Locator Suggestion:'}</div>
                                <div style={{ fontSize: 8.5, color: AI.text, lineHeight: 1.7 }}>
                                    <div><span style={{ color: AI.green }}>Strategy:</span> ID</div>
                                    <div><span style={{ color: AI.green }}>Value:</span> <span style={{ color: AI.yellow }}>com.example:id/et_email</span></div>
                                    <div><span style={{ color: AI.muted }}>Alt:</span> accessibility-id → "Email input"</div>
                                </div>
                            </div>
                        )}
                        {s === 'done' && <div style={{ marginTop: 6, fontSize: 8.5, color: AI.green, fontWeight: 700 }}>✅ {isTr ? 'Element bulundu! Kodu kopyala → teste yapıştır.' : 'Element found! Copy code → paste into test.'}</div>}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: AI.bgDark, border: `1px solid ${AI.border}`, color: AI.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === APPIUM SWIPE PLAYGROUND ===
    const renderAppiumSwipePlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'touch-start', 'swiping', 'scrolled', 'new-item', 'done']
        const cur = order.indexOf(s)
        const PH = { bg: '#0f172a', border: '#1e293b', text: '#e2e8f0', muted: '#64748b', accent: '#7c3aed', green: '#10b981' }
        const products = [
            { name: isTr ? 'Ürün A — Kablosuz Kulaklık' : 'Product A — Wireless Headphones', price: '$89.99', rating: '⭐⭐⭐⭐' },
            { name: isTr ? 'Ürün B — Akıllı Saat' : 'Product B — Smart Watch', price: '$299.99', rating: '⭐⭐⭐⭐⭐' },
            { name: isTr ? 'Ürün C — USB Hub' : 'Product C — USB Hub', price: '$45.00', rating: '⭐⭐⭐' },
            { name: isTr ? 'Ürün D — Mekanik Klavye' : 'Product D — Mechanical Keyboard', price: '$149.00', rating: '⭐⭐⭐⭐⭐' },
            { name: isTr ? 'Ürün E — Webcam 4K' : 'Product E — 4K Webcam', price: '$199.00', rating: '⭐⭐⭐⭐' },
        ]
        const offset = cur >= order.indexOf('scrolled') ? 2 : 0
        return (
            <div style={{ fontFamily: 'monospace', maxWidth: 310 }}>
                <div style={{ background: PH.bg, borderRadius: 16, border: `2px solid ${PH.border}`, overflow: 'hidden' }}>
                    <div style={{ background: '#0a0f1c', padding: '4px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 8, color: PH.muted }}>9:41 AM</span>
                        <span style={{ width: 30, height: 4, background: PH.border, borderRadius: 99 }} />
                        <span style={{ fontSize: 8, color: PH.muted }}>🔋 98%</span>
                    </div>
                    <div style={{ background: PH.accent, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12 }}>🛒</span>
                        <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, fontFamily: 'sans-serif' }}>ShopApp</span>
                        <button onClick={() => canStart && runSteps([['touch-start', 300], ['swiping', 600], ['scrolled', 500], ['new-item', 700], ['done', 400]])} disabled={!canStart} style={{ marginLeft: 'auto', background: !canStart ? PH.muted : '#fff', color: !canStart ? '#fff' : PH.accent, border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 8, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif' }}>
                            {s === 'idle' ? '▶ Swipe' : s === 'done' ? '▶ Again' : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: '4px 0', minHeight: 120, overflow: 'hidden', position: 'relative' }}>
                        {products.slice(offset, offset + 3).map((p, i) => (
                            <div key={`${offset}-${i}`} style={{ padding: '6px 10px', borderBottom: `1px solid ${PH.border}`, background: i === 0 && cur >= order.indexOf('new-item') ? `${PH.green}18` : 'transparent', transition: 'background 0.4s', animation: i === 0 && cur >= order.indexOf('new-item') ? 'simFadeUp 0.4s' : undefined }}>
                                <div style={{ fontSize: 9, color: PH.text, fontFamily: 'sans-serif' }}>{p.name}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                    <span style={{ fontSize: 8, color: PH.accent, fontWeight: 700 }}>{p.price}</span>
                                    <span style={{ fontSize: 8, color: PH.muted }}>{p.rating}</span>
                                </div>
                            </div>
                        ))}
                        {(s === 'touch-start' || s === 'swiping') && (
                            <div style={{ position: 'absolute', right: 16, bottom: s === 'touch-start' ? 10 : 80, width: 18, height: 18, borderRadius: '50%', background: `${PH.accent}cc`, border: `2px solid ${PH.accent}`, transition: 'bottom 0.6s ease-in-out', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>👆</div>
                        )}
                    </div>
                    <div style={{ padding: '4px 10px', background: '#0a0f1c', fontSize: 8.5, color: s === 'done' ? PH.green : PH.muted, fontFamily: 'sans-serif' }}>
                        {s === 'idle' ? (isTr ? 'Yukarı kaydırmak için ▶ bas' : 'Press ▶ to swipe up') :
                            s === 'touch-start' ? (isTr ? '👆 Dokunma başladı (startY: 1600)' : '👆 Touch started (startY: 1600)') :
                                s === 'swiping' ? (isTr ? '⬆️ Kaydırılıyor... (endY: 400)' : '⬆️ Swiping... (endY: 400)') :
                                    s === 'scrolled' ? (isTr ? '📜 Liste kaydırıldı!' : '📜 List scrolled!') :
                                        s === 'new-item' ? (isTr ? '✨ Yeni ürünler görünüyor!' : '✨ New items visible!') :
                                            (isTr ? '✅ Swipe tamamlandı!' : '✅ Swipe complete!')}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', marginTop: 4, padding: '5px', background: PH.bg, border: `1px solid ${PH.border}`, color: PH.muted, fontSize: 9, cursor: 'pointer', borderRadius: 8 }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === BROWSERSTACK LOCAL → CLOUD PLAYGROUND ===
    const renderBrowserstackCloudRunPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'starting', 'connecting', 'provisioning', 'running', 'done']
        const cur = order.indexOf(s)
        const BS = { bgDark: '#0d1117', border: '#21262d', text: '#c9d1d9', muted: '#6e7681', orange: '#fc6620', green: '#3fb950', yellow: '#d29922' }
        const lines = [
            { minState: 'starting', text: '$ browserstack-sdk pytest test_login.py -v', color: BS.text },
            { minState: 'connecting', text: (isTr ? '→ hub.browserstack.com bağlanıyor...' : '→ Connecting to hub.browserstack.com...'), color: BS.yellow },
            { minState: 'provisioning', text: '→ Session created: a1b2c3d4', color: BS.muted },
            { minState: 'provisioning', text: '→ Provisioning: Chrome 122 / Windows 11', color: BS.orange },
            { minState: 'running', text: (isTr ? '→ test_login_page ... ÇALIŞIYOR' : '→ test_login_page ... RUNNING'), color: BS.yellow },
            { minState: 'done', text: (isTr ? '✓ test_login_page GEÇTİ (4.2s)' : '✓ test_login_page PASSED (4.2s)'), color: BS.green },
        ]
        return (
            <div style={{ fontFamily: 'monospace', maxWidth: 310 }}>
                <div style={{ background: BS.bgDark, borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                    <div style={{ background: '#161b22', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: `1px solid ${BS.border}` }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42', display: 'inline-block' }} />
                        <span style={{ fontSize: 9, color: BS.muted, marginLeft: 6 }}>Terminal — local</span>
                        <button
                            onClick={() => canStart && runSteps([['starting', 300], ['connecting', 700], ['provisioning', 900], ['running', 1000], ['done', 700]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', background: !canStart ? BS.muted : BS.orange, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ Testi Çalıştır' : '▶ Run Test') : s === 'done' ? (isTr ? '▶ Tekrar' : '▶ Again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: '8px 10px', minHeight: 130 }}>
                        {s === 'idle' && <div style={{ fontSize: 9, color: BS.muted }}>{isTr ? 'Yerel testi buluta göndermek için ▶ butonuna bas' : 'Press ▶ to send the local test to the cloud'}</div>}
                        {lines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? <div key={i} style={{ fontSize: 9, color: ln.color, marginBottom: 3 }}>{ln.text}</div> : null
                        })}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: BS.bgDark, border: `1px solid ${BS.border}`, color: BS.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 {isTr ? 'Sıfırla' : 'Reset'}</button>}
            </div>
        )
    }

    // === VITEST RUNNER PLAYGROUND ===
    const renderVitestRunnerPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'collecting', 't1', 't2', 't3', 'done']
        const cur = order.indexOf(s)
        const VT = { bg: '#1a1a1a', border: '#2e2e2e', text: '#e4e4e4', muted: '#6b7280', green: '#a9d233' }
        const tests = [
            { id: 't1', name: 'formats whole dollars' },
            { id: 't2', name: 'formats cents correctly' },
            { id: 't3', name: 'throws on negative input' },
        ]
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 320 }}>
                <div style={{ background: VT.bg, borderRadius: '10px 10px 0 0', border: `1px solid ${VT.border}`, overflow: 'hidden' }}>
                    <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${VT.border}`, background: '#141414' }}>
                        <span style={{ fontSize: 10 }}>🏃</span>
                        <span style={{ fontSize: 9, color: VT.muted }}>formatPrice.test.ts</span>
                        <button
                            onClick={() => canStart && runSteps([['collecting', 300], ['t1', 500], ['t2', 400], ['t3', 400], ['done', 400]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', background: !canStart ? VT.muted : VT.green, color: '#1a1a1a', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? '▶ npx vitest run' : s === 'done' ? '▶ Run Again' : '⏳ Running...'}
                        </button>
                    </div>
                    <div style={{ padding: '10px 12px', fontSize: 10.5, lineHeight: 1.9, minHeight: 130, color: VT.text }}>
                        {s === 'idle' && <div style={{ color: VT.muted }}>$ npx vitest run</div>}
                        {cur >= order.indexOf('collecting') && <div style={{ color: VT.muted }}>✓ Collected 1 test file, 3 tests</div>}
                        {tests.map((t) => {
                            const tIdx = order.indexOf(t.id)
                            if (tIdx > cur) return null
                            return <div key={t.id} style={{ color: VT.green }}>✓ {t.name}</div>
                        })}
                        {s === 'done' && (
                            <div style={{ marginTop: 6, color: VT.green, fontWeight: 700 }}>
                                <div>Test Files  1 passed (1)</div>
                                <div>Tests  3 passed (3)</div>
                            </div>
                        )}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: '#141414', border: `1px solid ${VT.border}`, color: VT.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 Reset</button>}
            </div>
        )
    }

    // === JMETER LOAD TEST PLAYGROUND — Non-GUI CLI terminal ===
    const renderJmeterLoadTestPlayground = () => {
        const s = simState
        const canStart = s === 'idle' || s === 'done'
        const order = ['idle', 'launching', 'rampup', 'firing', 'aggregating', 'done']
        const cur = order.indexOf(s)
        const JM = { bg: '#1b1410', bgDark: '#120d0a', border: '#3a2a1a', text: '#e8dfd3', muted: '#8a7560', orange: '#f5a623', green: '#36c96e', red: '#ef4444' }
        const requests = [
            { text: 'GET  /api/products       → 200 (142ms)', color: JM.green },
            { text: 'POST /api/cart/add       → 200 (210ms)', color: JM.green },
            { text: 'POST /api/checkout       → 200 (980ms)', color: JM.orange },
            { text: 'GET  /api/payment/status → 500 (12ms)', color: JM.red },
        ]
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 320 }}>
                <div style={{ background: JM.bg, borderRadius: '10px 10px 0 0', border: `1px solid ${JM.border}`, overflow: 'hidden' }}>
                    <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${JM.border}`, background: JM.bgDark }}>
                        <span style={{ fontSize: 10 }}>⚡</span>
                        <span style={{ fontSize: 9, color: JM.muted }}>checkout_load.jmx — Non-GUI</span>
                        <button
                            onClick={() => canStart && runSteps([['launching', 300], ['rampup', 800], ['firing', 1200], ['aggregating', 600], ['done', 400]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', background: !canStart ? JM.muted : JM.orange, color: '#1b1410', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: 9, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? '▶ jmeter -n -t' : s === 'done' ? '▶ Run Again' : '⏳ Running...'}
                        </button>
                    </div>
                    <div style={{ padding: '10px 12px', fontSize: 9.5, lineHeight: 1.85, minHeight: 165, color: JM.text }}>
                        {s === 'idle' && <div style={{ color: JM.muted }}>$ jmeter -n -t checkout_load.jmx -l results.jtl -e -o report/</div>}
                        {cur >= order.indexOf('launching') && <div style={{ color: JM.muted }}>Creating summariser &lt;summary&gt;</div>}
                        {cur >= order.indexOf('launching') && <div style={{ color: JM.muted }}>Created the tree successfully using checkout_load.jmx</div>}
                        {cur >= order.indexOf('rampup') && (
                            <div style={{ marginTop: 4 }}>
                                <div style={{ color: JM.orange }}>Starting the test — Thread Group: 50 users, Ramp-Up 30s</div>
                                <div style={{ display: 'flex', gap: 3, marginTop: 4, flexWrap: 'wrap' }}>
                                    {Array.from({ length: 10 }).map((_, idx) => (
                                        <span key={idx} className="sim-animate" style={{
                                            width: 9, height: 9, borderRadius: '50%',
                                            background: cur >= order.indexOf('rampup') ? JM.orange : JM.border,
                                            opacity: cur >= order.indexOf('rampup') ? 1 : 0.2,
                                            animation: cur === order.indexOf('rampup') ? `simFadeUp 0.4s ease both` : 'none',
                                            animationDelay: `${idx * 70}ms`,
                                            transition: 'background 0.3s, opacity 0.3s',
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {cur >= order.indexOf('firing') && (
                            <div style={{ marginTop: 6 }}>
                                {requests.map((r, i) => <div key={i} style={{ color: r.color }}>{r.text}</div>)}
                            </div>
                        )}
                        {cur >= order.indexOf('aggregating') && cur < order.indexOf('done') && (
                            <div style={{ marginTop: 6, color: JM.muted }} className="animate-pulse">⏳ Generating dashboard...</div>
                        )}
                        {s === 'done' && (
                            <div style={{ marginTop: 6, color: JM.green, fontWeight: 700 }}>
                                Tidying up ... ... Done :-)<br />
                                ✅ report/index.html generated
                            </div>
                        )}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ display: 'block', width: '100%', padding: '5px', background: JM.bgDark, border: `1px solid ${JM.border}`, color: JM.muted, fontSize: 9, cursor: 'pointer', borderRadius: '0 0 10px 10px' }}>🔄 Reset</button>}
            </div>
        )
    }

    // === CYPRESS TIME-TRAVEL PLAYGROUND — Cypress Test Runner command log ===
    const renderCypressTimeTravelPlayground = () => {
        const order = ['idle', 'visit', 'getEmail', 'typeEmail', 'getPassword', 'typePassword', 'click', 'assert', 'done']
        const cur = order.indexOf(simState)
        const canTimeTravel = !isRunning && simState !== 'idle'
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const commands = [
            { key: 'visit', text: "cy.visit('/login')" },
            { key: 'getEmail', text: "cy.get('[data-cy=email]')" },
            { key: 'typeEmail', text: ".type('user@test.com')" },
            { key: 'getPassword', text: "cy.get('[data-cy=password]')" },
            { key: 'typePassword', text: ".type('••••••••')" },
            { key: 'click', text: "cy.get('[data-cy=submit]').click()" },
            { key: 'assert', text: "cy.url().should('include', '/dashboard')" },
        ]
        const jumpTo = (key) => { if (canTimeTravel) setSimState(key) }

        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 320 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ fontSize: 9, color: CY.text }}>login.cy.js — Cypress Test Runner</span>
                    <button
                        onClick={() => !isRunning && runSteps([['visit', 300], ['getEmail', 500], ['typeEmail', 600], ['getPassword', 500], ['typePassword', 600], ['click', 500], ['assert', 700], ['done', 300]])}
                        disabled={isRunning}
                        style={{ marginLeft: 'auto', background: isRunning ? CY.muted : CY.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: isRunning ? 'not-allowed' : 'pointer', boxShadow: !isRunning && simState === 'idle' ? `0 0 8px ${CY.green}55` : 'none' }}
                    >
                        {isRunning ? '⏳...' : simState === 'idle' ? '▶ Run' : '🔄 Run Again'}
                    </button>
                </div>
                <div style={{ background: CY.bg, padding: '8px 4px', borderRadius: '0 0 10px 10px' }}>
                    {commands.map((c, idx) => {
                        const stateIdx = order.indexOf(c.key)
                        const isPast = cur >= stateIdx
                        const isActive = simState === c.key
                        return (
                            <div
                                key={c.key}
                                onClick={() => jumpTo(c.key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px',
                                    borderRadius: 4, marginBottom: 1,
                                    background: isActive ? `${CY.green}22` : 'transparent',
                                    borderLeft: `2px solid ${isActive ? CY.green : 'transparent'}`,
                                    cursor: canTimeTravel ? 'pointer' : 'default',
                                    opacity: isPast ? 1 : 0.3,
                                    transition: 'opacity 0.3s, background 0.3s',
                                }}
                            >
                                <span style={{ fontSize: 9, color: isPast ? CY.green : CY.muted, width: 12, flexShrink: 0 }}>{isPast ? '✓' : idx + 1}</span>
                                <code style={{ fontSize: 9.5, color: isActive ? '#fff' : CY.text }}>{c.text}</code>
                            </div>
                        )
                    })}
                    {canTimeTravel && (
                        <div style={{ marginTop: 6, padding: '5px 8px', fontSize: 8.5, color: CY.muted, lineHeight: 1.4 }}>
                            🕐 {isTr ? 'Geçmiş bir komuta tıkla — o anda DOM nasıldı gör!' : 'Click a past command — see what the DOM looked like then!'}
                        </div>
                    )}
                </div>
                {simState !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    const renderGithubAccountRepoSetupPlayground = () => {
        const s = simState
        const order = ['idle', 'signup', 'verify', 'newrepo', 'settings', 'url']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'url'
        const active = key => order.indexOf(key) === cur
        const done = key => order.indexOf(key) < cur && s !== 'idle'
        const steps = [
            ['signup', isTr ? 'Kayıt ol' : 'Sign Up', isTr ? 'github.com → Sign Up tıkla' : 'github.com → Click Sign Up', '🌐'],
            ['verify', isTr ? 'Doğrula' : 'Verify', isTr ? 'Email, şifre, kullanıcı adı gir → Email doğrula' : 'Enter email, password, username → Verify email', '✉️'],
            ['newrepo', isTr ? 'Yeni Repo' : 'New Repo', isTr ? "'+' → 'New repository' → İsim gir" : "'+' → 'New repository' → Enter name", '📦'],
            ['settings', isTr ? 'Ayarlar' : 'Settings', isTr ? 'Public/Private seç, README ekleme (git init kullanacaksan)' : 'Choose Public/Private, DO NOT check Add README (if using git init locally)', '⚙️'],
            ['url', 'URL', isTr ? "'Create repository' tıkla → HTTPS URL kopyala" : "Click 'Create repository' → Copy HTTPS URL", '🔗'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🐙</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'GitHub Hesap + Repo' : 'GitHub Account + Repo'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'hesap aç → repo oluştur → URL al' : 'sign up → create repo → get URL'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['signup', 150], ['verify', 800], ['newrepo', 800], ['settings', 800], ['url', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#8b5cf6' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ başlat' : '▶ start') : s === 'url' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                        {steps.map(([key, label, desc, icon]) => {
                            const isA = active(key)
                            const isD = done(key)
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#a78bfa' : isD ? '#22c55e' : '#334155'}`, background: isA ? '#4c1d9555' : isD ? '#052e1655' : '#020617', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '34px 1fr auto', gap: 9, alignItems: 'center', transition: 'all .35s' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', background: isA ? '#8b5cf6' : isD ? '#16a34a' : '#334155', color: '#fff', fontSize: 14 }} className={isA ? 'sim-animate' : ''}>{isD ? '✓' : icon}</div>
                                    <div>
                                        <div style={{ color: isA || isD ? '#ede9fe' : '#cbd5e1', fontSize: 11.5, fontWeight: 800 }}>{label}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                    </div>
                                    <div style={{ color: isA ? '#c4b5fd' : isD ? '#bbf7d0' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}>{isA ? 'active' : isD ? 'done' : 'waiting'}</div>
                                </div>
                            )
                        })}
                    </div>
                    {s === 'url' && (
                        <div style={{ margin: '0 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                            ✅ {isTr ? 'Hesap + repo hazır. URL kopyalandı. Artık `git remote add origin` ile bağlayabilirsin.' : 'Account + repo ready. URL copied. Now connect with `git remote add origin`.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitCloneVsInitPlayground = () => {
        const s = simState
        const order = ['idle', 'left', 'right', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const leftSteps = [
            'git init',
            'git add .',
            'git commit -m "first commit"',
            'git remote add origin URL',
            'git push -u origin main',
        ]
        const rightSteps = [
            'git clone URL',
            'cd project-folder',
            'git status',
            'git branch -a',
            isTr ? '→ çalışmaya hazır' : '→ ready to work',
        ]
        return (
            <div style={{ maxWidth: 420, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔀</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>git init vs git clone</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'sıfırdan mı, takıma mı katılıyorsun?' : 'starting fresh or joining a team?'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['left', 150], ['right', 1200], ['done', 1200]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0ea5e9' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ karşılaştır' : '▶ compare') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div style={{ border: `1px solid ${cur >= order.indexOf('left') && s !== 'idle' ? '#38bdf8' : '#334155'}`, background: cur >= order.indexOf('left') && s !== 'idle' ? '#082f4955' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s' }}>
                            <div style={{ color: '#7dd3fc', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>🆕 {isTr ? 'Sıfırdan başla' : 'Starting from scratch'}</div>
                            {leftSteps.map((step, i) => (
                                <div key={i} style={{ color: cur >= order.indexOf('left') && s !== 'idle' ? '#bae6fd' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', padding: '3px 0', opacity: cur >= order.indexOf('left') && s !== 'idle' ? 1 : 0.4, transition: 'opacity 0.4s', animation: cur >= order.indexOf('left') && s !== 'idle' ? 'simFadeUp 0.3s ease-out' : 'none' }}>$ {step}</div>
                            ))}
                        </div>
                        <div style={{ border: `1px solid ${cur >= order.indexOf('right') ? '#a78bfa' : '#334155'}`, background: cur >= order.indexOf('right') ? '#4c1d9555' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s' }}>
                            <div style={{ color: '#c4b5fd', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>👥 {isTr ? 'Takıma katıl' : 'Joining a team'}</div>
                            {rightSteps.map((step, i) => (
                                <div key={i} style={{ color: cur >= order.indexOf('right') ? '#ddd6fe' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', padding: '3px 0', opacity: cur >= order.indexOf('right') ? 1 : 0.4, transition: 'opacity 0.4s', animation: cur >= order.indexOf('right') ? 'simFadeUp 0.3s ease-out' : 'none' }}>$ {step}</div>
                            ))}
                        </div>
                    </div>
                    {s === 'done' && (
                        <div style={{ margin: '0 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                            ✅ {isTr ? 'Her iki yol da aynı sonucu verir: çalışır bir Git repository.' : 'Both paths lead to the same result: a working Git repository.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitDotFolderPlayground = () => {
        const s = simState
        const order = ['idle', 'init', 'objects', 'refs', 'head', 'config']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'config'
        const treeItems = [
            ['init', '.git/', isTr ? 'Gizli klasör — Git\'in beyni' : 'Hidden folder — Git\'s brain', '📁'],
            ['objects', '.git/objects/', isTr ? 'Tüm commit, tree ve blob verisi' : 'Stores all commit, tree and blob data', '🗃️'],
            ['refs', '.git/refs/', isTr ? 'Branch ve tag pointer\'ları' : 'Branch and tag pointers', '🏷️'],
            ['head', '.git/HEAD', isTr ? 'Şu anki branch\'i gösterir' : 'Points to current branch', '👆'],
            ['config', '.git/config', isTr ? 'Repo ayarları (remote URL vb.)' : 'Repository settings (remote URLs, etc)', '⚙️'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔍</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>.git/ {isTr ? 'klasör yapısı' : 'folder structure'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'gizli klasörün içinde ne var?' : 'what\'s inside the hidden folder?'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['init', 150], ['objects', 700], ['refs', 700], ['head', 700], ['config', 700]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#f59e0b' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ keşfet' : '▶ explore') : s === 'config' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 6 }}>
                        {treeItems.map(([key, path, desc, icon], i) => {
                            const isA = order.indexOf(key) === cur
                            const isD = order.indexOf(key) < cur && s !== 'idle'
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#fbbf24' : isD ? '#22c55e' : '#334155'}`, background: isA ? '#78350f55' : isD ? '#052e1655' : '#020617', borderRadius: 10, padding: '8px 10px', display: 'grid', gridTemplateColumns: '28px 1fr', gap: 8, alignItems: 'center', transition: 'all .35s', paddingLeft: i === 0 ? 10 : 24 }}>
                                    <div style={{ fontSize: 14 }} className={isA ? 'sim-animate' : ''}>{isD ? '✓' : icon}</div>
                                    <div>
                                        <div style={{ color: isA || isD ? '#fef3c7' : '#cbd5e1', fontSize: 11, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>{path}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {s === 'config' && (
                        <div style={{ margin: '0 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#ef444418', border: '1px solid #ef4444', fontSize: 10, color: '#ef4444', fontWeight: 700 }}>
                            ⚠️ {isTr ? '.git/ klasörünü silersen TÜM geçmiş sonsuza dek kaybolur!' : 'Delete .git/ and ALL history is gone forever!'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitDiffReaderPlayground = () => {
        const s = simState
        const order = ['idle', 'header', 'removed', 'added', 'context', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const lines = [
            { key: 'header', type: 'header', text: 'diff --git a/tests/login.spec.js b/tests/login.spec.js' },
            { key: 'header', type: 'header', text: '@@ -5,3 +5,3 @@' },
            { key: 'context', type: 'context', text: "  it('should verify login', () => {" },
            { key: 'removed', type: 'removed', text: "-    cy.get('#email').type('admin@test.com')" },
            { key: 'added', type: 'added', text: "+    cy.get('[data-testid=\"email\"]').type('admin@test.com')" },
            { key: 'removed', type: 'removed', text: "-    cy.get('.submit-btn').click()" },
            { key: 'added', type: 'added', text: "+    cy.get('[data-testid=\"submit\"]').click()" },
            { key: 'context', type: 'context', text: "     cy.url().should('include', '/dashboard')" },
        ]
        const getColor = (type) => {
            if (type === 'removed') return { bg: '#7f1d1d33', color: '#fca5a5', border: '#991b1b' }
            if (type === 'added') return { bg: '#14532d33', color: '#86efac', border: '#166534' }
            if (type === 'header') return { bg: '#1e3a5f33', color: '#93c5fd', border: '#1e40af' }
            return { bg: 'transparent', color: '#9ca3af', border: 'transparent' }
        }
        return (
            <div style={{ maxWidth: 420, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📊</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>git diff {isTr ? 'okuma' : 'reader'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'farkları renklere göre oku' : 'read changes by color'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['header', 150], ['removed', 600], ['added', 600], ['context', 600], ['done', 500]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#059669' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ diff oku' : '▶ read diff') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: '10px 12px', background: '#020617', fontFamily: 'JetBrains Mono, monospace' }}>
                        {lines.map((line, i) => {
                            const showKey = line.key
                            const visible = order.indexOf(showKey) <= cur && s !== 'idle'
                            const isActive = showKey === s
                            const colors = getColor(line.type)
                            return (
                                <div key={i} style={{ padding: '2px 6px', fontSize: 9.5, background: visible ? colors.bg : 'transparent', color: visible ? colors.color : '#475569', borderLeft: `2px solid ${visible && isActive ? colors.border : 'transparent'}`, opacity: visible ? 1 : 0.3, transition: 'all 0.35s', animation: isActive ? 'simFadeUp 0.3s ease-out' : 'none', whiteSpace: 'pre', overflowX: 'auto' }}>
                                    {line.text}
                                </div>
                            )
                        })}
                    </div>
                    {s === 'done' && (
                        <div style={{ margin: '10px 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                            ✅ {isTr ? 'Kırmızı = silinen, yeşil = eklenen, gri = bağlam satırı.' : 'Red = removed, green = added, gray = context line.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitLogTimelinePlayground = () => {
        const s = simState
        const order = ['idle', 'c1', 'c2', 'c3', 'head', 'branch']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'branch'
        const commits = [
            ['c3', 'a1b2c3d', '(HEAD → feature/login)', isTr ? 'test: giriş kontrollerini ekle' : 'test: add login checks', '#a78bfa'],
            ['c2', 'e4f5g6h', '', isTr ? 'fix: selector güncelle' : 'fix: update selector', '#38bdf8'],
            ['c1', 'i7j8k9l', '(origin/main, main)', isTr ? 'chore: ilk snapshot' : 'chore: initial snapshot', '#22c55e'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📜</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>git log {isTr ? 'zaman çizelgesi' : 'timeline'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'commit geçmişini anla' : 'understand commit history'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['c1', 150], ['c2', 700], ['c3', 700], ['head', 700], ['branch', 700]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#a78bfa' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ log oku' : '▶ read log') : s === 'branch' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 0 }}>
                        {commits.map(([key, hash, label, msg, color], i) => {
                            const visible = order.indexOf(key) <= cur && s !== 'idle'
                            const isA = key === s
                            return (
                                <div key={key} style={{ display: 'flex', gap: 10, opacity: visible ? 1 : 0.2, transition: 'opacity 0.4s' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: visible ? color : '#334155', border: `2px solid ${visible ? color : '#475569'}`, boxShadow: isA ? `0 0 10px ${color}55` : 'none', transition: 'all .35s' }} />
                                        {i < commits.length - 1 && <div style={{ width: 2, flex: 1, background: '#334155', minHeight: 20 }} />}
                                    </div>
                                    <div style={{ paddingBottom: 12 }}>
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                                            <span style={{ color: '#fbbf24', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{hash}</span>
                                            {label && cur >= order.indexOf('head') && <span style={{ color: '#10b981', fontSize: 8.5, fontFamily: 'JetBrains Mono, monospace', background: '#10b98118', padding: '1px 5px', borderRadius: 4 }}>{label}</span>}
                                        </div>
                                        <div style={{ color: '#cbd5e1', fontSize: 10, marginTop: 2 }}>{msg}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {cur >= order.indexOf('branch') && (
                        <div style={{ margin: '0 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#a78bfa18', border: '1px solid #a78bfa', fontSize: 9.5, color: '#c4b5fd' }}>
                            💡 {isTr ? 'hash = benzersiz ID, HEAD = şu an buradasın, branch etiketleri hangi dalların bu commit\'e baktığını gösterir.' : 'hash = unique ID, HEAD = where you are now, branch labels show which branches point here.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitStashFlowPlayground = () => {
        const s = simState
        const order = ['idle', 'working', 'stash', 'switch', 'return', 'pop']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'pop'
        const hasChangesInTree = s === 'working' || s === 'pop'
        const shelfHasItems = cur >= order.indexOf('stash') && cur < order.indexOf('pop')
        const currentBranch = (s === 'switch') ? 'main' : 'feature/login'
        const steps = [
            ['working', '📝', isTr ? 'login.spec.js düzenliyorsun' : 'Editing login.spec.js', isTr ? 'feature/login dalında değişiklikler var' : 'Changes on feature/login branch'],
            ['stash', '📦', 'git stash', isTr ? 'Değişiklikler rafa kalktı, working tree temiz' : 'Changes moved to shelf, working tree is clean'],
            ['switch', '🔀', 'git switch main', isTr ? 'main dalındasın, raf hâlâ dolu' : 'You\'re on main now, shelf still holds your work'],
            ['return', '🔙', 'git switch feature/login', isTr ? 'Kendi dalına döndün, raf hâlâ orada' : 'Back on your branch, shelf still there'],
            ['pop', '📤', 'git stash pop', isTr ? 'Değişiklikler raftan working tree\'ye döndü' : 'Changes return from shelf to working tree'],
        ]
        return (
            <div style={{ maxWidth: 410, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📦</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>git stash {isTr ? 'akışı' : 'flow'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'değişiklikleri rafa koy, sonra geri al' : 'shelve changes, then retrieve them'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['working', 150], ['stash', 900], ['switch', 900], ['return', 900], ['pop', 900]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#f59e0b' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ başlat' : '▶ start') : s === 'pop' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ border: `1px solid ${hasChangesInTree ? '#fbbf24' : '#334155'}`, background: hasChangesInTree ? '#78350f44' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s', textAlign: 'center' }}>
                                <div style={{ fontSize: 20 }}>📝</div>
                                <div style={{ color: '#fef3c7', fontSize: 10, fontWeight: 800, marginTop: 4 }}>Working Tree</div>
                                <div style={{ color: hasChangesInTree ? '#fbbf24' : '#64748b', fontSize: 9, marginTop: 2 }}>{hasChangesInTree ? (isTr ? 'değişiklik var' : 'has changes') : (isTr ? 'temiz' : 'clean')}</div>
                            </div>
                            <div style={{ border: `1px solid ${shelfHasItems ? '#a78bfa' : '#334155'}`, background: shelfHasItems ? '#4c1d9544' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s', textAlign: 'center' }}>
                                <div style={{ fontSize: 20 }}>📦</div>
                                <div style={{ color: '#ede9fe', fontSize: 10, fontWeight: 800, marginTop: 4 }}>Stash Shelf</div>
                                <div style={{ color: shelfHasItems ? '#a78bfa' : '#64748b', fontSize: 9, marginTop: 2 }}>{shelfHasItems ? (isTr ? 'dolu' : 'has items') : (isTr ? 'boş' : 'empty')}</div>
                            </div>
                        </div>
                        {s !== 'idle' && (
                            <div style={{ background: '#020617', borderRadius: 8, padding: '6px 10px', border: '1px solid #334155' }}>
                                <div style={{ color: '#94a3b8', fontSize: 9, marginBottom: 4 }}>🌿 branch: <span style={{ color: '#22c55e', fontWeight: 700 }}>{currentBranch}</span></div>
                            </div>
                        )}
                        {steps.map(([key, icon, label, desc]) => {
                            const isA = order.indexOf(key) === cur
                            const isD = order.indexOf(key) < cur && s !== 'idle'
                            return (
                                <div key={key} style={{ border: `1px solid ${isA ? '#fbbf24' : isD ? '#22c55e' : '#334155'}`, background: isA ? '#78350f44' : isD ? '#052e1644' : '#020617', borderRadius: 10, padding: '8px 10px', display: 'grid', gridTemplateColumns: '28px 1fr', gap: 8, alignItems: 'center', transition: 'all .35s' }}>
                                    <div style={{ fontSize: 14 }} className={isA ? 'sim-animate' : ''}>{isD ? '✓' : icon}</div>
                                    <div>
                                        <div style={{ color: isA || isD ? '#fef3c7' : '#cbd5e1', fontSize: 11, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
                                        <div style={{ color: '#94a3b8', fontSize: 9.5 }}>{desc}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitRevertVsResetPlayground = () => {
        const s = simState
        const order = ['idle', 'commits', 'revert', 'revert-done', 'reset', 'reset-done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'reset-done'
        const showCommits = cur >= order.indexOf('commits')
        const showRevert = cur >= order.indexOf('revert')
        const showRevertDone = cur >= order.indexOf('revert-done')
        const showReset = cur >= order.indexOf('reset')
        const showResetDone = cur >= order.indexOf('reset-done')
        const commitStyle = (label, color, gone) => ({
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: '50%',
            background: gone ? '#1e293b' : color,
            color: gone ? '#475569' : '#fff',
            fontSize: 11, fontWeight: 900,
            border: gone ? '2px dashed #475569' : `2px solid ${color}`,
            textDecoration: gone ? 'line-through' : 'none',
            transition: 'all .35s',
        })
        return (
            <div style={{ maxWidth: 420, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>⏪</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>revert vs reset</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'güvenli geri alma vs tehlikeli silme' : 'safe undo vs dangerous erase'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['commits', 150], ['revert', 800], ['revert-done', 800], ['reset', 800], ['reset-done', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#ef4444' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ karşılaştır' : '▶ compare') : s === 'reset-done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
                        {showCommits && (
                            <div style={{ padding: '8px 10px', borderRadius: 10, background: '#020617', border: '1px solid #334155', textAlign: 'center' }}>
                                <div style={{ color: '#94a3b8', fontSize: 9, marginBottom: 6 }}>{isTr ? 'Başlangıç durumu' : 'Initial state'}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <div style={commitStyle('A', '#22c55e', false)}>A</div>
                                    <span style={{ color: '#475569' }}>→</span>
                                    <div style={commitStyle('B', '#3b82f6', false)}>B</div>
                                    <span style={{ color: '#475569' }}>→</span>
                                    <div style={commitStyle('C', '#ef4444', false)}>C</div>
                                    <span style={{ color: '#ef4444', fontSize: 8 }}>🐛</span>
                                </div>
                            </div>
                        )}
                        <div style={{ border: `1px solid ${showRevert ? '#22c55e' : '#334155'}`, background: showRevert ? '#052e1644' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s' }}>
                            <div style={{ color: '#86efac', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>✅ {isTr ? 'Güvenli: git revert' : 'Safe: git revert'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                <div style={commitStyle('A', '#22c55e', false)}>A</div>
                                <span style={{ color: '#475569' }}>→</span>
                                <div style={commitStyle('B', '#3b82f6', false)}>B</div>
                                <span style={{ color: '#475569' }}>→</span>
                                <div style={commitStyle('C', '#ef4444', false)}>C</div>
                                <span style={{ color: '#475569' }}>→</span>
                                <div style={{ ...commitStyle('D', '#10b981', false), opacity: showRevertDone ? 1 : 0.2, transition: 'opacity .4s' }}>D</div>
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: 9, marginTop: 6, textAlign: 'center' }}>
                                {isTr ? 'Geçmiş korunur, C\'yi geri alan yeni D commit\'i eklenir' : 'History preserved, new commit D undoes C'}
                            </div>
                        </div>
                        <div style={{ border: `1px solid ${showReset ? '#ef4444' : '#334155'}`, background: showReset ? '#7f1d1d44' : '#020617', borderRadius: 10, padding: 10, transition: 'all .35s' }}>
                            <div style={{ color: '#fca5a5', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>⛔ {isTr ? 'Tehlikeli: git reset --hard' : 'Dangerous: git reset --hard'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                <div style={commitStyle('A', '#22c55e', false)}>A</div>
                                <span style={{ color: '#475569' }}>→</span>
                                <div style={commitStyle('B', '#3b82f6', false)}>B</div>
                                {!showResetDone && <><span style={{ color: '#475569' }}>→</span><div style={commitStyle('C', '#ef4444', false)}>C</div></>}
                                {showResetDone && <span style={{ color: '#ef4444', fontSize: 9, marginLeft: 8 }}>💀 C {isTr ? 'silindi' : 'GONE'}</span>}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: 9, marginTop: 6, textAlign: 'center' }}>
                                {isTr ? 'C tamamen silindi, geçmiş kısaldı — push edilmişse çok tehlikeli!' : 'C is GONE, history shortened — very dangerous if already pushed!'}
                            </div>
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitignoreCreateMatchPlayground = () => {
        const s = simState
        const order = ['idle', 'files', 'write', 'filter', 'status']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'status'
        const showFiles = cur >= order.indexOf('files')
        const showWrite = cur >= order.indexOf('write')
        const showFilter = cur >= order.indexOf('filter')
        const showStatus = cur >= order.indexOf('status')
        const files = [
            { name: 'src/Login.test.js', icon: '🧪', ignored: false },
            { name: 'README.md', icon: '📄', ignored: false },
            { name: '.env.example', icon: '🧾', ignored: false },
            { name: 'node_modules/', icon: '📦', ignored: true },
            { name: 'target/', icon: '☕', ignored: true },
            { name: 'playwright-report/', icon: '📊', ignored: true },
            { name: '.env', icon: '🔑', ignored: true },
            { name: 'app.log', icon: '📜', ignored: true },
        ]
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🚫</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>.gitignore {isTr ? 'filtreleme' : 'filtering'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? 'desen eklenince ne değişir?' : 'what changes once a pattern exists?'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['files', 150], ['write', 800], ['filter', 900], ['status', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#dc2626' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ oluştur' : '▶ create') : s === 'status' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                        {showFiles && (
                            <div style={{ border: '1px solid #334155', borderRadius: 10, background: '#020617', padding: 10 }}>
                                <div style={{ color: '#94a3b8', fontSize: 9, marginBottom: 6, fontWeight: 700 }}>{isTr ? 'Proje klasörü' : 'Project folder'}</div>
                                <div style={{ display: 'grid', gap: 5 }}>
                                    {files.map((f) => {
                                        const crossed = showFilter && f.ignored
                                        return (
                                            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', borderRadius: 6, background: crossed ? '#7f1d1d22' : 'transparent', transition: 'all .35s' }}>
                                                <span style={{ fontSize: 13, opacity: crossed ? 0.4 : 1 }}>{f.icon}</span>
                                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: crossed ? '#94a3b8' : '#e2e8f0', textDecoration: crossed ? 'line-through' : 'none' }}>{f.name}</span>
                                                {crossed && <span style={{ marginLeft: 'auto', fontSize: 9, color: '#fca5a5', fontWeight: 800 }}>{isTr ? 'yok sayıldı' : 'ignored'}</span>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        {showWrite && (
                            <div style={{ border: '1px solid #b45309', borderRadius: 10, background: '#78350f22', padding: 10 }}>
                                <div style={{ color: '#fbbf24', fontSize: 9, marginBottom: 6, fontWeight: 800 }}>📝 .gitignore</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#fde68a', lineHeight: 1.7 }}>
                                    node_modules/<br />target/<br />playwright-report/<br />.env*<br />!.env.example<br />*.log
                                </div>
                            </div>
                        )}
                        {showStatus && (
                            <div style={{ border: '1px solid #22c55e', borderRadius: 10, background: '#052e1644', padding: 10 }}>
                                <div style={{ color: '#86efac', fontSize: 9, marginBottom: 6, fontWeight: 800 }}>$ git status --short</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#bbf7d0', lineHeight: 1.7 }}>
                                    ?? src/Login.test.js<br />?? README.md<br />?? .env.example
                                </div>
                                <div style={{ color: '#86efac', fontSize: 9, margin: '8px 0 6px', fontWeight: 800 }}>$ git status --ignored --short</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', lineHeight: 1.7 }}>
                                    !! node_modules/<br />!! target/<br />!! playwright-report/<br />!! .env<br />!! app.log
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: 9, marginTop: 6 }}>
                                    {isTr ? '.env.example commit edilebilir; gerçek .env ve generated klasörler normal status içinde görünmez.' : '.env.example can be committed; real .env and generated folders stay out of normal status.'}
                                </div>
                            </div>
                        )}
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderGitignoreRescuePlayground = () => {
        const s = simState
        const order = ['idle', 'committed', 'leak', 'addRule', 'rmCached', 'safe']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'safe'
        const showCommitted = cur >= order.indexOf('committed')
        const showLeak = cur >= order.indexOf('leak')
        const showAddRule = cur >= order.indexOf('addRule')
        const showRmCached = cur >= order.indexOf('rmCached')
        const showSafe = cur >= order.indexOf('safe')
        return (
            <div style={{ maxWidth: 430, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🆘</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>.env {isTr ? 'kurtarma akışı' : 'rescue flow'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>{isTr ? '.gitignore\'a eklemek yetmez' : 'adding to .gitignore is not enough'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['committed', 150], ['leak', 700], ['addRule', 800], ['rmCached', 900], ['safe', 800]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#b45309' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ kurtar' : '▶ rescue') : s === 'safe' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 12, display: 'grid', gap: 8 }}>
                        {showCommitted && (
                            <div style={{ border: `1px solid ${showSafe ? '#22c55e' : '#ef4444'}`, borderRadius: 10, background: showSafe ? '#052e1644' : '#7f1d1d33', padding: 10, transition: 'all .35s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>🔑</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#e2e8f0', fontWeight: 700 }}>.env</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 800, color: showSafe ? '#86efac' : '#fca5a5' }}>
                                        {showSafe ? (isTr ? 'Git: takip edilmiyor ✓' : 'Git: not tracked ✓') : (isTr ? 'Git: TAKİP EDİLİYOR' : 'Git: TRACKED')}
                                    </span>
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: 9, marginTop: 4 }}>{isTr ? 'Dosya diskte her zaman duruyor — sadece Git takibi değişiyor.' : 'The file always stays on disk — only Git tracking changes.'}</div>
                            </div>
                        )}
                        {showLeak && !showRmCached && (
                            <div style={{ border: '1px solid #ef4444', borderRadius: 10, background: '#7f1d1d22', padding: 10 }}>
                                <div style={{ color: '#fca5a5', fontSize: 9, fontWeight: 800, marginBottom: 4 }}>$ git log -p -- .env</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#fecaca' }}>+API_KEY=sk-live-7f2a9c...</div>
                                <div style={{ color: '#fca5a5', fontSize: 9, marginTop: 4 }}>{isTr ? 'Secret hâlâ history\'de — herkese görünür!' : 'The secret is still in history — visible to everyone!'}</div>
                            </div>
                        )}
                        {showAddRule && (
                            <div style={{ border: '1px solid #b45309', borderRadius: 10, background: '#78350f22', padding: 10 }}>
                                <div style={{ color: '#fbbf24', fontSize: 9, fontWeight: 800, marginBottom: 4 }}>📝 .gitignore</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#fde68a' }}>.env</div>
                                {!showRmCached && (
                                    <div style={{ color: '#fca5a5', fontSize: 9, marginTop: 6, fontWeight: 700 }}>⚠️ {isTr ? 'Kural eklendi ama .env hâlâ takip ediliyor!' : 'Rule added, but .env is still tracked!'}</div>
                                )}
                            </div>
                        )}
                        {showRmCached && (
                            <div style={{ border: '1px solid #22c55e', borderRadius: 10, background: '#052e1644', padding: 10 }}>
                                <div style={{ color: '#86efac', fontSize: 9, fontWeight: 800, marginBottom: 4 }}>$ git rm --cached .env</div>
                                <div style={{ color: '#bbf7d0', fontSize: 9.5 }}>rm '.env' {isTr ? '— sadece Git takibinden çıkar' : '— removed from Git tracking only'}</div>
                                <div style={{ color: '#86efac', fontSize: 9, fontWeight: 800, marginTop: 8 }}>$ git check-ignore -v .env</div>
                                <div style={{ color: '#bbf7d0', fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace' }}>.gitignore:1:.env*  .env</div>
                            </div>
                        )}
                    </div>
                    {showSafe && (
                        <div style={{ margin: '0 12px 12px', padding: '8px 10px', borderRadius: 8, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                            ✅ {isTr ? 'commit edildi: .env artık yeni pushlarda gitmeyecek. Ama eski secret history\'de görüldüyse token/key rotate et.' : 'committed: .env will not be sent in future pushes. If the old secret was visible in history, rotate the token/key.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderLinuxTerminalBasicsPlayground = () => {
        const s = simState
        const order = ['idle', 'pwd', 'ls', 'cd', 'ls2', 'cat', 'grep', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const path = cur >= order.indexOf('cd') ? '/home/qa/projects' : '/home/qa'
        const terminal = [
            ['pwd', 'pwd', '#38bdf8', '/home/qa'],
            ['ls', 'ls', '#38bdf8', 'projects/  readme.txt'],
            ['cd', 'cd projects', '#fbbf24', ''],
            ['ls2', 'ls', '#38bdf8', 'app.py  tests/  requirements.txt'],
            ['cat', 'cat ../readme.txt', '#a78bfa', isTr ? 'QA otomasyon ortamına hoş geldin.' : 'Welcome to the QA automation environment.'],
            ['grep', 'cat ../readme.txt | grep QA', '#f97316', isTr ? 'QA otomasyon ortamına hoş geldin.' : 'Welcome to the QA automation environment.'],
            ['done', '', '#22c55e', isTr ? '✅ Navigasyon ve pipe tamamlandı' : '✅ Navigation and pipe complete'],
        ]
        return (
            <div style={{ maxWidth: 380, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>📁</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Dizin gezintisi' : 'Filesystem navigation'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>pwd → ls → cd → cat → grep</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['pwd', 150], ['ls', 650], ['cd', 700], ['ls2', 650], ['cat', 700], ['grep', 750], ['done', 550]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#0ea5e9' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ başlat' : '▶ start') : s === 'done' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 11, display: 'grid', gap: 10 }}>
                        <div style={{ background: '#020617', border: '1px solid #334155', borderRadius: 9, padding: '7px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                            📍 {path}
                        </div>
                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 150, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Başlatınca komutları sırayla izle.' : 'Start to watch each command.'}</div>}
                            {terminal.map(([state, cmd, color, out], i) => {
                                const show = order.indexOf(state) <= cur && s !== 'idle'
                                if (!show) return null
                                return (
                                    <div key={i} style={{ animation: 'simFadeUp .25s ease-out', marginBottom: 4 }}>
                                        {cmd && <div style={{ color, fontSize: 10.5, lineHeight: 1.6 }}>$ {cmd}</div>}
                                        {out && <div style={{ color: '#cbd5e1', fontSize: 10, paddingLeft: 10, lineHeight: 1.6 }}>{out}</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    const renderLinuxPermissionsLabPlayground = () => {
        const s = simState
        const order = ['idle', 'lsl', 'denied', 'chmod', 'lsl2', 'success']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'success'
        const hasExec = cur >= order.indexOf('chmod')
        const terminal = [
            ['lsl', 'ls -l deploy.sh', '#38bdf8', '-rw-r--r-- 1 qa qa 412 deploy.sh'],
            ['denied', './deploy.sh', '#fbbf24', 'bash: ./deploy.sh: Permission denied'],
            ['chmod', 'chmod +x deploy.sh', '#f97316', ''],
            ['lsl2', 'ls -l deploy.sh', '#38bdf8', '-rwxr--r-- 1 qa qa 412 deploy.sh'],
            ['success', './deploy.sh', '#22c55e', isTr ? 'Test ortamı deploy ediliyor...' : 'Deploying test environment...'],
        ]
        return (
            <div style={{ maxWidth: 380, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 18 }}>🔐</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 12, fontWeight: 800 }}>{isTr ? 'Permission denied atölyesi' : 'Permission denied workshop'}</div>
                            <div style={{ color: '#94a3b8', fontSize: 10 }}>ls -l → chmod +x → ./deploy.sh</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['lsl', 150], ['denied', 700], ['chmod', 800], ['lsl2', 650], ['success', 700]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#f97316' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ çalıştır' : '▶ run') : s === 'success' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 11, display: 'grid', gap: 10 }}>
                        <div style={{ border: `1px solid ${hasExec ? '#22c55e' : '#334155'}`, borderRadius: 10, padding: 10, background: hasExec ? '#052e1644' : '#020617', transition: 'all .35s' }}>
                            <div style={{ display: 'flex', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 800 }}>
                                <span style={{ color: '#94a3b8' }}>-rw</span>
                                <span style={{ color: hasExec ? '#22c55e' : '#475569' }}>{hasExec ? 'x' : '-'}</span>
                                <span style={{ color: '#94a3b8' }}>r--</span>
                                <span style={{ color: '#475569' }}>-</span>
                                <span style={{ color: '#94a3b8' }}>r--</span>
                                <span style={{ color: '#475569' }}>-</span>
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: 9, marginTop: 4 }}>{isTr ? 'deploy.sh dosya izinleri (owner | group | other)' : 'deploy.sh permissions (owner | group | other)'}</div>
                        </div>
                        <div style={{ background: '#020617', borderRadius: 9, padding: '9px 10px', minHeight: 110, fontFamily: 'JetBrains Mono, monospace' }}>
                            {s === 'idle' && <div style={{ color: '#64748b', fontSize: 10 }}>{isTr ? 'Çalıştırınca akışı izle.' : 'Run to watch the flow.'}</div>}
                            {terminal.map(([state, cmd, color, out], i) => {
                                const show = order.indexOf(state) <= cur && s !== 'idle'
                                if (!show) return null
                                return (
                                    <div key={i} style={{ animation: 'simFadeUp .25s ease-out', marginBottom: 4 }}>
                                        {cmd && <div style={{ color, fontSize: 10.5, lineHeight: 1.6 }}>$ {cmd}</div>}
                                        {out && <div style={{ color: state === 'denied' ? '#fca5a5' : '#cbd5e1', fontSize: 10, paddingLeft: 10, lineHeight: 1.6 }}>{out}</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    // === CYPRESS: Test Yazma & Organizasyon — hook execution order log ===
    const renderCypressTestStructurePlayground = () => {
        const order = ['idle', 'before', 'be1', 'it1', 'ae1', 'be2', 'it2', 'ae2', 'after']
        const s = simState
        const cur = order.indexOf(s)
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const canStart = s === 'idle' || s === 'after'
        const log = [
            { key: 'before', text: 'before()', color: '#a78bfa' },
            { key: 'be1', text: 'beforeEach() → cy.visit("/cart")', color: '#38bdf8' },
            { key: 'it1', text: "✓ it('adds item to cart')", color: CY.green },
            { key: 'ae1', text: 'afterEach() → cy.clearCookies()', color: '#38bdf8' },
            { key: 'be2', text: 'beforeEach() → cy.visit("/cart")', color: '#38bdf8' },
            { key: 'it2', text: "✓ it('removes item from cart')", color: CY.green },
            { key: 'ae2', text: 'afterEach() → cy.clearCookies()', color: '#38bdf8' },
            { key: 'after', text: 'after()', color: '#a78bfa' },
        ]
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 340 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ fontSize: 9, color: CY.text }}>cart.cy.js — Cypress Test Runner</span>
                    <button
                        onClick={() => canStart && runSteps([['before', 300], ['be1', 500], ['it1', 600], ['ae1', 500], ['be2', 500], ['it2', 600], ['ae2', 500], ['after', 400]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? CY.muted : CY.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: !canStart ? 'not-allowed' : 'pointer' }}
                    >
                        {s === 'idle' ? '▶ Run' : s === 'after' ? '🔄 Run Again' : '⏳...'}
                    </button>
                </div>
                <div style={{ background: CY.bg, padding: '8px 6px', borderRadius: '0 0 10px 10px', minHeight: 190 }}>
                    {log.map((row) => {
                        const idx = order.indexOf(row.key)
                        const show = idx <= cur && s !== 'idle'
                        return (
                            <div key={row.key} style={{ padding: '3px 6px', marginBottom: 1, opacity: show ? 1 : 0.15, animation: show ? 'simFadeUp 0.25s ease-out' : 'none', transition: 'opacity 0.3s' }}>
                                <code style={{ fontSize: 9.5, color: show ? row.color : CY.muted }}>{row.text}</code>
                            </div>
                        )
                    })}
                    {s === 'idle' && <div style={{ fontSize: 9, color: CY.muted, padding: '6px' }}>{isTr ? "▶ Run'a bas, hook sırasını izle" : '▶ Click Run to watch the hook order'}</div>}
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    // === CYPRESS: Aliases & Test Isolation — cy.session() cache across two tests ===
    const renderCypressSessionCachePlayground = () => {
        const order = ['idle', 't1visit', 't1type', 't1click', 't1saved', 't2restore', 't2dashboard']
        const s = simState
        const cur = order.indexOf(s)
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const canStart = s === 'idle' || s === 't2dashboard'
        const log = [
            { key: 't1visit', text: "Test 1: cy.visit('/login')", color: '#38bdf8' },
            { key: 't1type', text: '.type(email).type(pwd)', color: '#38bdf8' },
            { key: 't1click', text: '.click() → login submit', color: '#38bdf8' },
            { key: 't1saved', text: '💾 cy.session() saved', color: '#a78bfa' },
            { key: 't2restore', text: '— Test 2: cy.session() → ♻️ restored', color: '#a78bfa' },
            { key: 't2dashboard', text: '✓ already on /dashboard', color: CY.green },
        ]
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 340 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ fontSize: 9, color: CY.text }}>auth.cy.js — Cypress Test Runner</span>
                    <button
                        onClick={() => canStart && runSteps([['t1visit', 300], ['t1type', 600], ['t1click', 500], ['t1saved', 500], ['t2restore', 700], ['t2dashboard', 400]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? CY.muted : CY.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: !canStart ? 'not-allowed' : 'pointer' }}
                    >
                        {s === 'idle' ? '▶ Run' : s === 't2dashboard' ? '🔄 Run Again' : '⏳...'}
                    </button>
                </div>
                <div style={{ background: CY.bg, padding: '8px 6px', borderRadius: '0 0 10px 10px', minHeight: 170 }}>
                    {log.map((row) => {
                        const idx = order.indexOf(row.key)
                        const show = idx <= cur && s !== 'idle'
                        return (
                            <div key={row.key} style={{ padding: '4px 6px', marginBottom: 1, opacity: show ? 1 : 0.15, animation: show ? 'simFadeUp 0.25s ease-out' : 'none' }}>
                                <code style={{ fontSize: 9.5, color: show ? row.color : CY.muted }}>{row.text}</code>
                            </div>
                        )
                    })}
                    {s === 'idle' && <div style={{ fontSize: 9, color: CY.muted, padding: '6px' }}>{isTr ? "▶ Run'a bas — 2 test arka arkaya çalışsın" : '▶ Click Run — watch 2 tests run back to back'}</div>}
                    {s === 't2dashboard' && (
                        <div style={{ marginTop: 6, padding: '5px 8px', fontSize: 8.5, color: '#a78bfa', lineHeight: 1.4 }}>
                            ⚡ {isTr ? 'Test 2 login formunu HİÇ doldurmadı — session cache\'den geri yüklendi.' : 'Test 2 never filled the login form — it was restored from the session cache.'}
                        </div>
                    )}
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    // === CYPRESS: Component Testing — cy.mount() isolated render ===
    const renderCypressComponentMountPlayground = () => {
        const order = ['idle', 'mount', 'click', 'spy']
        const s = simState
        const cur = order.indexOf(s)
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const canStart = s === 'idle' || s === 'spy'
        const mounted = cur >= order.indexOf('mount')
        const clicked = cur >= order.indexOf('click')
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 320 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ fontSize: 9, color: CY.text }}>Counter.cy.jsx — Component Testing</span>
                    <button
                        onClick={() => canStart && runSteps([['mount', 300], ['click', 800], ['spy', 600]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? CY.muted : CY.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: !canStart ? 'not-allowed' : 'pointer' }}
                    >
                        {s === 'idle' ? '▶ Run' : s === 'spy' ? '🔄 Run Again' : '⏳...'}
                    </button>
                </div>
                <div style={{ background: CY.bg, padding: 14, borderRadius: '0 0 10px 10px', minHeight: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <code style={{ fontSize: 8.5, color: CY.muted }}>cy.mount(&lt;Counter onChange={'{spy}'} /&gt;)</code>
                    {mounted ? (
                        <div style={{ border: `1.5px solid ${CY.green}`, borderRadius: 10, padding: '12px 18px', background: '#fff', display: 'flex', alignItems: 'center', gap: 12, animation: 'simFadeUp 0.3s' }}>
                            <button style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #d1d5db', background: '#f3f4f6', fontWeight: 800 }}>−</button>
                            <span style={{ fontSize: 16, fontWeight: 800, color: '#111827', minWidth: 18, textAlign: 'center' }}>{clicked ? 1 : 0}</span>
                            <button style={{ width: 26, height: 26, borderRadius: 6, border: 'none', background: clicked ? '#059669' : CY.green, color: '#fff', fontWeight: 800, transform: s === 'click' ? 'scale(0.9)' : 'scale(1)', transition: 'all .2s' }}>+</button>
                        </div>
                    ) : (
                        <div style={{ fontSize: 9, color: CY.muted, textAlign: 'center' }}>{isTr ? "▶ Run'a bas — SADECE bu component render olsun" : '▶ Click Run — mount ONLY this component'}</div>
                    )}
                    {cur >= order.indexOf('spy') && (
                        <div style={{ fontSize: 8.5, color: '#a78bfa', fontFamily: 'monospace' }}>✓ onChangeSpy.should('have.been.calledWith', 1)</div>
                    )}
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    // === CYPRESS: Stubs, Spies & Clock — virtual clock skipping a 5s setTimeout ===
    const renderCypressStubClockPlayground = () => {
        const order = ['idle', 'clockstart', 'loading', 'tick', 'loaded']
        const s = simState
        const cur = order.indexOf(s)
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const canStart = s === 'idle' || s === 'loaded'
        const log = [
            { key: 'clockstart', text: 'cy.clock()  // ⏸ saat dondu', color: '#a78bfa' },
            { key: 'loading', text: 'setTimeout(showData, 5000)', color: '#38bdf8' },
            { key: 'tick', text: 'cy.tick(5000)  // ⏩ +5000ms', color: '#f59e0b' },
            { key: 'loaded', text: "✓ cy.contains('Loaded!')", color: CY.green },
        ]
        return (
            <div style={{ fontFamily: 'JetBrains Mono, monospace', maxWidth: 330 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ fontSize: 9, color: CY.text }}>clock.cy.js — Cypress Test Runner</span>
                    <button
                        onClick={() => canStart && runSteps([['clockstart', 300], ['loading', 600], ['tick', 700], ['loaded', 500]])}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? CY.muted : CY.green, color: '#fff', border: 'none', borderRadius: 4, padding: '3px 12px', fontSize: 9, fontWeight: 700, cursor: !canStart ? 'not-allowed' : 'pointer' }}
                    >
                        {s === 'idle' ? '▶ Run' : s === 'loaded' ? '🔄 Run Again' : '⏳...'}
                    </button>
                </div>
                <div style={{ background: CY.bg, padding: '8px 6px', borderRadius: '0 0 10px 10px', minHeight: 150 }}>
                    {log.map((row) => {
                        const idx = order.indexOf(row.key)
                        const show = idx <= cur && s !== 'idle'
                        return (
                            <div key={row.key} style={{ padding: '4px 6px', opacity: show ? 1 : 0.15, animation: show ? 'simFadeUp 0.25s ease-out' : 'none' }}>
                                <code style={{ fontSize: 9.5, color: show ? row.color : CY.muted }}>{row.text}</code>
                            </div>
                        )
                    })}
                    {s === 'idle' && <div style={{ fontSize: 9, color: CY.muted, padding: '6px' }}>{isTr ? "▶ Run'a bas — 5 saniyeyi anında atla" : '▶ Click Run — skip 5 real seconds instantly'}</div>}
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    // === CYPRESS: Debugging — real Selector Playground crosshair tool ===
    const renderCypressSelectorPlaygroundPlayground = () => {
        const s = simState
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const targets = {
            btn: { best: '[data-cy=submit]', match: '1' },
            input: { best: '[data-cy=email]', match: '1' },
            header: { best: 'h1.welcome-title', match: '3' },
        }
        const sel = targets[s]
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 330 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 12 }}>🎯</span>
                    <span style={{ fontSize: 9, color: CY.text, fontFamily: 'JetBrains Mono, monospace' }}>{isTr ? 'Selector Playground' : 'Selector Playground'}</span>
                </div>
                <div style={{ background: CY.bg, padding: 14, borderRadius: '0 0 10px 10px' }}>
                    <div style={{ fontSize: 8.5, color: CY.muted, marginBottom: 8 }}>{isTr ? 'Bir elemana tıkla:' : 'Click an element:'}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, background: '#fff', borderRadius: 8, padding: 10 }}>
                        <div onClick={() => setSimState('header')} style={{ cursor: 'pointer', fontSize: 12, fontWeight: 800, color: '#111827', padding: 4, outline: s === 'header' ? '2px solid #f59e0b' : 'none', borderRadius: 4 }}>{isTr ? 'Hoş Geldin' : 'Welcome'}</div>
                        <div onClick={() => setSimState('input')} style={{ cursor: 'pointer', fontSize: 10, color: '#6b7280', border: '1px solid #d1d5db', borderRadius: 6, padding: '5px 8px', outline: s === 'input' ? '2px solid #f59e0b' : 'none' }}>{isTr ? 'e-posta@ornek.com' : 'email@example.com'}</div>
                        <div onClick={() => setSimState('btn')} style={{ cursor: 'pointer', fontSize: 10, fontWeight: 700, color: '#fff', background: '#10b981', borderRadius: 6, padding: '6px 0', textAlign: 'center', outline: s === 'btn' ? '2px solid #f59e0b' : 'none' }}>{isTr ? 'Giriş Yap' : 'Log In'}</div>
                    </div>
                    <div style={{ marginTop: 10, background: CY.bgDark, borderRadius: 6, padding: '6px 8px', minHeight: 36, display: 'flex', alignItems: 'center' }}>
                        {sel ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <code style={{ fontSize: 9.5, color: '#f59e0b' }}>cy.get('{sel.best}')</code>
                                <span style={{ fontSize: 8, color: sel.match === '1' ? CY.green : '#ef4444', fontWeight: 700 }}>{sel.match} {isTr ? 'eşleşme' : (sel.match === '1' ? 'match' : 'matches')}</span>
                            </div>
                        ) : (
                            <div style={{ fontSize: 8.5, color: CY.muted }}>{isTr ? 'henüz seçim yok' : 'no selection yet'}</div>
                        )}
                    </div>
                </div>
                {s !== 'idle' && <button onClick={resetSim} style={{ marginTop: 8, padding: '5px', width: '100%', background: 'transparent', border: `1px solid ${CY.border}`, color: CY.muted, fontSize: 9, cursor: 'pointer', borderRadius: 6 }}>↺ Reset</button>}
            </div>
        )
    }

    // === CYPRESS: CI/CD & Cross Browser — GitHub Actions matrix run ===
    const renderCypressCiPipelinePlayground = () => {
        const order = ['idle', 'checkout', 'install', 'chrome', 'firefox', 'edge', 'cloud']
        const s = simState
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'cloud'
        const browsers = [
            { key: 'chrome', label: 'chrome', icon: '🟢' },
            { key: 'firefox', label: 'firefox', icon: '🟠' },
            { key: 'edge', label: 'edge', icon: '🔵' },
        ]
        return (
            <div style={{ maxWidth: 340, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
                    <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8, background: '#111827', borderBottom: '1px solid #334155' }}>
                        <span style={{ fontSize: 16 }}>⚙️</span>
                        <div>
                            <div style={{ color: '#f8fafc', fontSize: 11.5, fontWeight: 800 }}>cypress-run.yml</div>
                            <div style={{ color: '#94a3b8', fontSize: 9.5 }}>GitHub Actions — 3 {isTr ? 'paralel tarayıcı' : 'parallel browsers'}</div>
                        </div>
                        <button
                            onClick={() => canStart && runSteps([['checkout', 250], ['install', 500], ['chrome', 700], ['firefox', 700], ['edge', 700], ['cloud', 500]])}
                            disabled={!canStart}
                            style={{ marginLeft: 'auto', border: 0, borderRadius: 6, padding: '5px 10px', background: canStart ? '#10b981' : '#475569', color: '#fff', fontSize: 11, fontWeight: 800, cursor: canStart ? 'pointer' : 'not-allowed' }}
                        >
                            {s === 'idle' ? (isTr ? '▶ çalıştır' : '▶ run') : s === 'cloud' ? (isTr ? '▶ tekrar' : '▶ again') : '⏳'}
                        </button>
                    </div>
                    <div style={{ padding: 11, display: 'grid', gap: 6 }}>
                        <div style={{ fontSize: 9.5, fontFamily: 'monospace', color: cur >= order.indexOf('checkout') ? '#22c55e' : '#475569' }}>{cur >= order.indexOf('checkout') ? '✓' : '○'} actions/checkout@v6</div>
                        <div style={{ fontSize: 9.5, fontFamily: 'monospace', color: cur >= order.indexOf('install') ? '#22c55e' : '#475569' }}>{cur >= order.indexOf('install') ? '✓' : '○'} npm ci</div>
                        {browsers.map(b => {
                            const idx = order.indexOf(b.key)
                            const active = s === b.key
                            return (
                                <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, fontFamily: 'monospace', color: cur > idx ? '#22c55e' : active ? '#f59e0b' : '#475569' }}>
                                    <span>{cur > idx ? '✓' : active ? '⏳' : '○'}</span>
                                    <span>cypress run --browser {b.label} {b.icon}</span>
                                </div>
                            )
                        })}
                        <div style={{ fontSize: 9.5, fontFamily: 'monospace', color: cur >= order.indexOf('cloud') ? '#a78bfa' : '#475569' }}>{cur >= order.indexOf('cloud') ? '✓' : '○'} ☁️ {isTr ? "Cypress Cloud'a kaydedildi" : 'recorded to Cypress Cloud'}</div>
                    </div>
                    {s === 'cloud' && (
                        <div style={{ margin: '0 11px 11px', padding: '8px 10px', borderRadius: 8, background: '#10b98118', border: '1px solid #10b981', fontSize: 9.5, color: '#10b981', fontWeight: 700 }}>
                            ✅ {isTr ? "3 tarayıcı, 0 hata — PR'a otomatik check yazıldı." : '3 browsers, 0 failures — PR check posted automatically.'}
                        </div>
                    )}
                    {s !== 'idle' && <button onClick={resetSim} style={{ width: '100%', border: 0, borderTop: '1px solid #334155', background: '#111827', color: '#94a3b8', padding: 6, fontSize: 10, cursor: 'pointer' }}>🔄 reset</button>}
                </div>
            </div>
        )
    }

    // === CYPRESS: jQuery-powered pseudo-class selectors — exclusive vs Selenium/Playwright ===
    const renderCypressJqSelectorsPlayground = () => {
        const s = simState
        const CY = { bg: '#1e1e1e', bgDark: '#161616', border: '#2d2d2d', text: '#d4d4d4', muted: '#6e6e6e', green: '#10b981' }
        const items = [
            { id: 0, label: 'Apple', hidden: false, checked: false },
            { id: 1, label: 'Banana', hidden: true, checked: false },
            { id: 2, label: 'Cherry', hidden: false, checked: false },
            { id: 3, label: 'Date', hidden: false, checked: true },
            { id: 4, label: 'Elderberry', hidden: false, checked: false },
        ]
        const pseudos = [
            { key: 'first', tag: ':first', code: 'li:first', matches: [0] },
            { key: 'last', tag: ':last', code: 'li:last', matches: [4] },
            { key: 'visible', tag: ':visible', code: 'li:visible', matches: [0, 2, 3, 4] },
            { key: 'contains', tag: ':contains()', code: 'li:contains("Cherry")', matches: [2] },
            { key: 'eq2', tag: ':eq(2)', code: 'li:eq(2)', matches: [2] },
            { key: 'checked', tag: ':checked', code: 'input:checked', matches: [3] },
        ]
        const active = pseudos.find(p => p.key === s)
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 340 }}>
                <div style={{ background: CY.bgDark, borderRadius: '10px 10px 0 0', padding: '6px 10px', borderBottom: `1px solid ${CY.border}` }}>
                    <span style={{ fontSize: 9, color: CY.text, fontFamily: 'JetBrains Mono, monospace' }}>fruit-list.cy.js — jQuery Selectors</span>
                </div>
                <div style={{ background: CY.bg, padding: 10, borderRadius: '0 0 10px 10px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                        {pseudos.map(p => (
                            <button key={p.key} onClick={() => setSimState(p.key)} style={{ fontSize: 8.5, fontFamily: 'monospace', padding: '3px 7px', borderRadius: 5, border: `1px solid ${s === p.key ? CY.green : CY.border}`, background: s === p.key ? `${CY.green}22` : 'transparent', color: s === p.key ? CY.green : CY.muted, cursor: 'pointer' }}>
                                {p.tag}
                            </button>
                        ))}
                    </div>
                    <div style={{ background: '#fff', borderRadius: 8, padding: 8, display: 'grid', gap: 4 }}>
                        {items.map(it => {
                            const isMatch = active && active.matches.includes(it.id)
                            return (
                                <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', borderRadius: 5, background: isMatch ? '#10b98122' : 'transparent', outline: isMatch ? '2px solid #10b981' : 'none', opacity: it.hidden ? 0.35 : 1, transition: 'all .25s' }}>
                                    {it.checked && <span style={{ fontSize: 11 }}>☑️</span>}
                                    <span style={{ fontSize: 10.5, color: '#111827', textDecoration: it.hidden ? 'line-through' : 'none' }}>{it.label}</span>
                                    {it.hidden && <span style={{ fontSize: 7.5, color: '#94a3b8', marginLeft: 'auto' }}>display:none</span>}
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: 8, background: CY.bgDark, borderRadius: 6, padding: '6px 8px' }}>
                        {active ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <code style={{ fontSize: 9.5, color: '#f59e0b' }}>cy.get('{active.code}')</code>
                                <span style={{ fontSize: 8, color: CY.green, fontWeight: 700 }}>{active.matches.length} {isTr ? 'eşleşme' : (active.matches.length === 1 ? 'match' : 'matches')}</span>
                            </div>
                        ) : (
                            <div style={{ fontSize: 8.5, color: CY.muted }}>{isTr ? 'Yukarıdan bir pseudo-class seç' : 'Pick a pseudo-class above'}</div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeleniumBidiCdpPlayground = () => {
        const s = simState
        const subtext = darkMode ? '#9ca3af' : '#6b7280'
        const isDark = darkMode
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 360 }}>
                <div style={{ background: isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }}>
                        <button onClick={() => setSimState('console-error')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'console-error' ? '#ef4444' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'console-error' ? '#ef444422' : 'transparent', color: s === 'console-error' ? '#ef4444' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🚨 {isTr ? 'Console Listener' : 'Console Listener'}
                        </button>
                        <button onClick={() => setSimState('mock-network')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'mock-network' ? '#3b82f6' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'mock-network' ? '#3b82f622' : 'transparent', color: s === 'mock-network' ? '#3b82f6' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🌐 {isTr ? 'Network Mock' : 'Network Mock'}
                        </button>
                        <button onClick={() => setSimState('paris-geo')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'paris-geo' ? '#10b981' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'paris-geo' ? '#10b98122' : 'transparent', color: s === 'paris-geo' ? '#10b981' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            📍 {isTr ? 'Geo (Paris)' : 'Geo (Paris)'}
                        </button>
                    </div>

                    <div style={{ background: '#090d16', borderRadius: 8, padding: 10, minHeight: 140, border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: 6, marginBottom: 8 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ef4444' }} />
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#f59e0b' }} />
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#22c55e' }} />
                            <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#64748b', marginLeft: 6 }}>Chrome Simulator</span>
                        </div>

                        {s === 'idle' && (
                            <div style={{ color: '#475569', fontSize: 10.5, textAlign: 'center', paddingTop: 30 }}>
                                {isTr ? 'Yukarıdan bir test senaryosu seçin.' : 'Select a test scenario above.'}
                            </div>
                        )}

                        {s === 'console-error' && (
                            <div style={{ animation: 'simFadeUp 0.3s' }}>
                                <div style={{ fontSize: 10, color: '#ef4444', fontFamily: 'monospace', lineHeight: 1.5, background: '#ef444415', padding: 8, borderRadius: 4, borderLeft: '3px solid #ef4444' }}>
                                    ❌ Uncaught TypeError: Cannot read properties of undefined (reading 'click')<br />
                                    <span style={{ color: '#64748b' }}>at login.js:42:18</span>
                                </div>
                                <div style={{ marginTop: 10, fontSize: 10, color: '#34d399', fontFamily: 'monospace' }}>
                                    [Java DevTools] {isTr ? 'LogEntry yakalandı!' : 'LogEntry captured!'}<br />
                                    ➜ Log: "TypeError: Cannot read properties..."
                                </div>
                            </div>
                        )}

                        {s === 'mock-network' && (
                            <div style={{ animation: 'simFadeUp 0.3s', color: '#e2e8f0', fontSize: 10.5 }}>
                                <div style={{ padding: 6, background: '#1e293b', borderRadius: 4, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ color: '#94a3b8' }}>API Request:</span>
                                    <span style={{ fontFamily: 'monospace', color: '#f59e0b' }}>GET /api/user</span>
                                </div>
                                <div style={{ border: '1px solid #334155', borderRadius: 6, padding: 8, background: '#111827' }}>
                                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>{isTr ? 'Profil Sayfası (Mocked)' : 'Profile Page (Mocked)'}</div>
                                    <div style={{ marginTop: 4 }}>{isTr ? 'Ad Soyad: Mocked User' : 'Full Name: Mocked User'}</div>
                                    <div style={{ color: '#10b981' }}>{isTr ? 'Rol: Lead QA Engineer' : 'Role: Lead QA Engineer'}</div>
                                </div>
                            </div>
                        )}

                        {s === 'paris-geo' && (
                            <div style={{ animation: 'simFadeUp 0.3s', color: '#e2e8f0', fontSize: 10.5 }}>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ fontSize: 16 }}>🗺️</span>
                                    <span style={{ fontWeight: 700 }}>Google Maps Simulator</span>
                                </div>
                                <div style={{ background: '#1e293b', padding: 8, borderRadius: 6, border: '1px solid #3b82f6' }}>
                                    <div style={{ color: '#38bdf8', fontWeight: 700 }}>📍 Paris, France</div>
                                    <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 2 }}>
                                        Latitude: 48.8566 | Longitude: 2.3522
                                    </div>
                                    <div style={{ fontSize: 9, color: '#10b981', marginTop: 4 }}>
                                        ✓ {isTr ? 'Konum emülasyonu başarıyla uygulandı.' : 'Location emulation successfully applied.'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeleniumVirtualAuthPlayground = () => {
        const s = simState
        const isDark = darkMode
        const subtext = darkMode ? '#9ca3af' : '#6b7280'
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 360 }}>
                <div style={{ background: isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }}>
                        <button onClick={() => setSimState('add-auth')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'add-auth' ? '#a78bfa' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'add-auth' ? '#a78bfa22' : 'transparent', color: s === 'add-auth' ? '#a78bfa' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🔑 Passkey (WebAuthn)
                        </button>
                        <button onClick={() => setSimState('print-pdf')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'print-pdf' ? '#f59e0b' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'print-pdf' ? '#f59e0b22' : 'transparent', color: s === 'print-pdf' ? '#f59e0b' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            📄 Print PDF
                        </button>
                        <button onClick={() => setSimState('scroll-wheel')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'scroll-wheel' ? '#10b981' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'scroll-wheel' ? '#10b98122' : 'transparent', color: s === 'scroll-wheel' ? '#10b981' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🖱️ Wheel Scroll
                        </button>
                    </div>

                    <div style={{ background: '#090d16', borderRadius: 8, padding: 10, minHeight: 140, border: '1px solid #1e293b', position: 'relative', overflow: 'hidden' }}>
                        {s === 'idle' && (
                            <div style={{ color: '#475569', fontSize: 10.5, textAlign: 'center', paddingTop: 30 }}>
                                {isTr ? 'Gelişmiş API senaryosunu seçin.' : 'Select an advanced API scenario.'}
                            </div>
                        )}

                        {s === 'add-auth' && (
                            <div style={{ animation: 'simFadeUp 0.3s', color: '#e2e8f0', fontSize: 10.5 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a78bfa', fontWeight: 700, marginBottom: 8 }}>
                                    <span>🔑</span>
                                    <span>Virtual Authenticator API</span>
                                </div>
                                <div style={{ border: '1px solid #334155', borderRadius: 6, padding: 8, background: '#111827' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, marginBottom: 4 }}>
                                        <span style={{ color: '#94a3b8' }}>Protocol:</span>
                                        <span style={{ color: '#a78bfa', fontFamily: 'monospace' }}>CTAP2 / USB</span>
                                    </div>
                                    <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontWeight: 700 }}>
                                        <span style={{ fontSize: 11 }}>✓</span>
                                        <span>{isTr ? 'Parmak izi / Biyometrik onay başarılı!' : 'Fingerprint / Biometric verified!'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {s === 'print-pdf' && (
                            <div style={{ animation: 'simFadeUp 0.3s', color: '#e2e8f0', fontSize: 10.5 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontWeight: 700, marginBottom: 8 }}>
                                    <span>📄</span>
                                    <span>driver.print(printOptions)</span>
                                </div>
                                <div style={{ border: '1px solid #f59e0b44', borderRadius: 6, padding: 8, background: '#ffffff', color: '#111827' }}>
                                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 4, fontWeight: 700, fontSize: 9, textTransform: 'uppercase', color: '#64748b' }}>Fatura / Invoice</div>
                                    <div style={{ marginTop: 4, fontSize: 10 }}>Total Due: <b>$120.00</b></div>
                                    <div style={{ fontSize: 9, color: '#64748b' }}>Page Range: 1-1</div>
                                </div>
                                <div style={{ marginTop: 6, color: '#10b981', fontSize: 9.5, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ animation: 'simPulse 1s infinite' }}>📥</span>
                                    <span>{isTr ? 'fatura.pdf kaydedildi (156 KB)' : 'invoice.pdf saved (156 KB)'}</span>
                                </div>
                            </div>
                        )}

                        {s === 'scroll-wheel' && (
                            <div style={{ animation: 'simFadeUp 0.3s', color: '#e2e8f0', fontSize: 10.5 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, marginBottom: 8 }}>
                                    <span>🖱️</span>
                                    <span>Actions Wheel API</span>
                                </div>
                                <div style={{ border: '1px solid #1e293b', borderRadius: 6, padding: 8, background: '#111827', height: 80, overflowY: 'hidden', position: 'relative' }}>
                                    <div style={{ transform: 'translateY(-20px)', transition: 'transform 1.5s ease-in-out', animation: 'simScrollDown 3s infinite alternate', fontSize: 9.5, color: '#94a3b8', lineHeight: 1.6 }}>
                                        Header Section<br />
                                        Main Content Area<br />
                                        Middle Banner<br />
                                        <b style={{ color: '#10b981' }}>📍 Footer Element (Target)</b><br />
                                        Bottom Links
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeleniumIdeFlowPlayground = () => {
        const s = simState
        const isDark = darkMode
        const subtext = darkMode ? '#9ca3af' : '#6b7280'
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 360 }}>
                <div style={{ background: isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                        <button onClick={() => setSimState('recording')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'recording' ? '#ef4444' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'recording' ? '#ef444422' : 'transparent', color: s === 'recording' ? '#ef4444' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🔴 {isTr ? 'Kaydet (REC)' : 'Record (REC)'}
                        </button>
                        <button onClick={() => setSimState('control-flow')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'control-flow' ? '#3b82f6' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'control-flow' ? '#3b82f622' : 'transparent', color: s === 'control-flow' ? '#3b82f6' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            🔀 {isTr ? 'Control Flow' : 'Control Flow'}
                        </button>
                        <button onClick={() => setSimState('export-code')} style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${s === 'export-code' ? '#f59e0b' : (isDark ? '#475569' : '#cbd5e1')}`, background: s === 'export-code' ? '#f59e0b22' : 'transparent', color: s === 'export-code' ? '#f59e0b' : subtext, cursor: 'pointer', fontWeight: 700 }}>
                            📤 {isTr ? 'Export Java' : 'Export Java'}
                        </button>
                    </div>

                    <div style={{ background: '#090d16', borderRadius: 8, padding: 10, minHeight: 140, border: '1px solid #1e293b' }}>
                        {s === 'idle' && (
                            <div style={{ color: '#475569', fontSize: 10.5, textAlign: 'center', paddingTop: 30 }}>
                                {isTr ? 'Selenium IDE adımlarını başlatın.' : 'Start Selenium IDE steps.'}
                            </div>
                        )}

                        {s === 'recording' && (
                            <div style={{ animation: 'simFadeUp 0.3s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 9.5, marginBottom: 8 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ef4444', animation: 'simPulse 1s infinite' }} />
                                    <span>RECORDING USER ACTIONS...</span>
                                </div>
                                <div style={{ fontSize: 9.5, color: '#94a3b8', fontFamily: 'monospace', display: 'grid', gap: 4 }}>
                                    <div>➜ Click input[name="email"]</div>
                                    <div style={{ color: '#22c55e' }}>➜ Type email: "qa@example.com"</div>
                                    <div>➜ Click button[type="submit"]</div>
                                </div>
                            </div>
                        )}

                        {s === 'control-flow' && (
                            <div style={{ animation: 'simFadeUp 0.3s' }}>
                                <div style={{ color: '#3b82f6', fontWeight: 700, fontSize: 9.5, marginBottom: 8 }}>
                                    🔄 IDE Commands (Control Flow)
                                </div>
                                <div style={{ fontSize: 9.5, fontFamily: 'monospace', color: '#e2e8f0', display: 'grid', gap: 3 }}>
                                    <div style={{ color: '#60a5fa' }}>1. open | /dashboard</div>
                                    <div style={{ color: '#fb923c' }}>2. if | ${isLoggedIn} === true</div>
                                    <div style={{ color: '#a78bfa', paddingLeft: 10 }}>3. assertText | css=.username | QA Admin</div>
                                    <div style={{ color: '#fb923c' }}>4. else</div>
                                    <div style={{ color: '#a78bfa', paddingLeft: 10 }}>5. assertElementPresent | id=login-btn</div>
                                    <div style={{ color: '#fb923c' }}>6. end</div>
                                </div>
                            </div>
                        )}

                        {s === 'export-code' && (
                            <div style={{ animation: 'simFadeUp 0.3s' }}>
                                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 9.5, marginBottom: 8 }}>
                                    ☕ Exported JUnit 5 Test Code
                                </div>
                                <div style={{ fontSize: 8.5, fontFamily: 'monospace', color: '#a7f3d0', maxHeight: 96, overflowY: 'auto', background: '#111827', padding: 6, borderRadius: 4 }}>
                                    {`@Test\npublic void testLogin() {\n  driver.get("https://example.com/dashboard");\n  if (isLoggedIn) {\n    assertEquals(driver.findElement(By.cssSelector(".username")).getText(), "QA Admin");\n  } else {\n    assertTrue(driver.findElement(By.id("login-btn")).isDisplayed());\n  }\n}`}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeleniumGridArchitecturePlayground = () => {
        const s = simState
        const isDark = darkMode
        const order = ['idle', 'router', 'distributor', 'docker', 'session-map', 'done']
        const cur = order.indexOf(s)
        const canStart = s === 'idle' || s === 'done'
        const isActive = (key) => s === key
        return (
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 360 }}>
                <div style={{ background: isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: 12, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#f8fafc' : '#111827' }}>Grid 4 Parallel Flow</span>
                        <button onClick={() => canStart && runSteps([['router', 200], ['distributor', 800], ['docker', 1000], ['session-map', 800], ['done', 500]])} disabled={!canStart} style={{ border: 0, borderRadius: 6, padding: '5px 10px', fontSize: 10.5, fontWeight: 800, color: '#0f294a', background: canStart ? '#38bdf8' : '#6b7280', cursor: canStart ? 'pointer' : 'not-allowed' }}>
                            {s === 'idle' ? '▶ Start Test' : s === 'done' ? '▶ Run Again' : '⏳ Running'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, position: 'relative' }}>
                        {/* Router Box */}
                        <div style={{ border: `1px solid ${isActive('router') ? '#38bdf8' : '#334155'}`, background: isActive('router') ? '#082f49' : '#0f172a', borderRadius: 8, padding: 8, textAlign: 'center', transition: 'all 0.3s', boxShadow: isActive('router') ? '0 0 10px #38bdf8' : 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc' }}>🚦 Router</div>
                            <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>Port 4444</div>
                        </div>

                        {/* Distributor Box */}
                        <div style={{ border: `1px solid ${isActive('distributor') ? '#fb923c' : '#334155'}`, background: isActive('distributor') ? '#431407' : '#0f172a', borderRadius: 8, padding: 8, textAlign: 'center', transition: 'all 0.3s', boxShadow: isActive('distributor') ? '0 0 10px #fb923c' : 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc' }}>🗂️ Distributor</div>
                            <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>Matches request</div>
                        </div>

                        {/* Session Map Box */}
                        <div style={{ border: `1px solid ${isActive('session-map') ? '#a78bfa' : '#334155'}`, background: isActive('session-map') ? '#2e1065' : '#0f172a', borderRadius: 8, padding: 8, textAlign: 'center', transition: 'all 0.3s', boxShadow: isActive('session-map') ? '0 0 10px #a78bfa' : 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc' }}>🗺️ Session Map</div>
                            <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>Saves Node IP</div>
                        </div>

                        {/* Dynamic Docker Node */}
                        <div style={{ border: `1px solid ${isActive('docker') || s === 'done' ? '#10b981' : '#334155'}`, background: isActive('docker') || s === 'done' ? '#064e3b' : '#0f172a', borderRadius: 8, padding: 8, textAlign: 'center', transition: 'all 0.3s', boxShadow: isActive('docker') ? '0 0 10px #10b981' : 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc' }}>🐳 Docker Node</div>
                            <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 2 }}>{s === 'done' ? '✓ Container Destroyed' : isActive('docker') ? '⏳ Spinning Container' : 'Idle'}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // === DOM VISUALIZER (right pane) ===
    const renderDomVisualizer = () => {
        if (block.scenario === 'git-snapshot-story') {
            const s = simState
            const order = ['idle', 'folder', 'change', 'snapshot', 'compare', 'restore']
            const cur = order.indexOf(s)
            const rows = [
                ['folder', isTr ? 'Proje klasörü' : 'Project folder', isTr ? 'Dosyaların günlük çalışma hali' : 'The everyday working state of files'],
                ['change', isTr ? 'Değişiklik' : 'Change', isTr ? 'Bir test, README veya config değişir' : 'A test, README or config changes'],
                ['snapshot', 'Snapshot', isTr ? 'Git o anı isimli bir kayıt gibi saklar' : 'Git stores that moment as a named record'],
                ['compare', isTr ? 'Karşılaştırma' : 'Comparison', isTr ? 'Eski ve yeni hali yan yana görürsün' : 'You compare old and new states side by side'],
                ['restore', isTr ? 'Güvenli dönüş' : 'Safe recovery', isTr ? 'Nerede bozulduğunu anlayıp geri dönebilirsin' : 'You can reason about where it broke and recover'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Bu bölümde komut ezberi yok. Önce Git’in yaptığı işi anlamalısın: değişiklikleri takip eder, anlamlı anları saklar ve sana geçmişle bugünü karşılaştırma gücü verir.' : 'No command memorization here. First understand what Git does: it tracks changes, stores meaningful moments, and lets you compare past and present.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active
                                ? (darkMode ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-300 bg-emerald-50')
                                : done
                                    ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50')
                                    : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')
                                }`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-emerald-800 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                        {isTr ? 'Java analojisi: debug sırasında object state nasıl önemliyse, Git’te commit de projenin state kaydıdır.' : 'Java analogy: just as object state matters during debugging, a Git commit is a recorded project state.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-collaboration-story') {
            const s = simState
            const order = ['idle', 'local', 'upload', 'review', 'checks', 'merge', 'publish']
            const cur = order.indexOf(s)
            const rows = [
                ['local', isTr ? 'Kendi branch’in' : 'Your branch', isTr ? 'Kendi alanında çalışırsın' : 'You work in your own space'],
                ['review', 'Pull Request', isTr ? 'Takım ne değiştiğini görür' : 'The team sees what changed'],
                ['checks', 'Actions checks', isTr ? 'Testler otomatik kanıt üretir' : 'Tests produce automatic evidence'],
                ['merge', 'main', isTr ? 'Sadece onaylı iş ana hatta girer' : 'Only approved work enters the main line'],
                ['publish', isTr ? 'Paylaşılan sonuç' : 'Shared result', isTr ? 'Herkes aynı güvenli geçmişi görür' : 'Everyone sees the same safe history'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'GitHub’ın değeri sadece dosya saklamak değildir. Değişiklik görünür olur, tartışılır, otomatik testten geçer ve sonra ortak alana alınır.' : 'GitHub is not valuable merely because it stores files. A change becomes visible, discussed, automatically tested, and then accepted into the shared space.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`flex items-start gap-3 rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-600 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ready ? 'bg-green-600 text-white' : active ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>{ready ? '✓' : i + 1}</span>
                                <div>
                                    <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{label}</div>
                                    <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'QA bakışı: PR, otomasyon testinin neden eklendiğini ve hangi riski kapattığını görünür yapar.' : 'QA view: a PR makes it visible why an automation test was added and which risk it covers.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-concept-order-map') {
            const s = simState
            const order = ['idle', 'init', 'status', 'add', 'commit', 'origin', 'pushMain', 'branch', 'pushBranch', 'sync', 'conflict', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['init', 'git init', isTr ? 'Amaç: bulunduğun klasörü Git repository yapar.' : 'Purpose: turns the current folder into a Git repository.', isTr ? 'Atlanırsa Git klasörü takip etmez.' : 'If skipped, Git does not track the folder.'],
                ['status', 'git status', isTr ? 'Amaç: ne değişti, ne stage edildi, hangi branch’tesin görürsün.' : 'Purpose: shows what changed, what is staged, and which branch you are on.', isTr ? 'Atlanırsa yanlış dosyayı commit edebilirsin.' : 'If skipped, you may commit the wrong files.'],
                ['add', 'git add', isTr ? 'Amaç: bir sonraki commit’e girecek dosyaları seçer.' : 'Purpose: selects files for the next commit.', isTr ? 'Atlanırsa commit boş kalabilir.' : 'If skipped, the commit may have nothing to save.'],
                ['commit', 'git commit', isTr ? 'Amaç: localde kalıcı snapshot oluşturur.' : 'Purpose: creates a permanent local snapshot.', isTr ? 'Atlanırsa push/review için kayıt oluşmaz.' : 'If skipped, there is no record to push or review.'],
                ['origin', 'remote origin', isTr ? 'Amaç: local repo’ya GitHub adresini öğretir.' : 'Purpose: teaches the local repo the GitHub URL.', isTr ? 'Atlanırsa Git push/pull hedefini bilmez.' : 'If skipped, Git does not know the push/pull target.'],
                ['pushMain', 'push main', isTr ? 'Amaç: ana branch’i GitHub’a ilk kez yollar ve upstream kurar.' : 'Purpose: sends the main branch to GitHub and sets upstream.', isTr ? 'Atlanırsa GitHub repo boş kalır.' : 'If skipped, the GitHub repo remains empty.'],
                ['branch', 'feature branch', isTr ? 'Amaç: main’i bozmadan ayrı çalışma alanı açar.' : 'Purpose: creates a separate work area without touching main.', isTr ? 'Atlanırsa ana branch üzerinde riskli çalışırsın.' : 'If skipped, you work directly on the risky main branch.'],
                ['pushBranch', 'push feature', isTr ? 'Amaç: local feature branch’i GitHub’da görünür yapar.' : 'Purpose: makes the local feature branch visible on GitHub.', isTr ? 'Atlanırsa PR/review açılamaz.' : 'If skipped, a PR/review cannot be opened.'],
                ['sync', 'fetch / merge / pull', isTr ? 'Amaç: GitHub’daki güncel işi locale alır. Pull = fetch + merge.' : 'Purpose: brings current GitHub work into local. Pull = fetch + merge.', isTr ? 'Atlanırsa local branch geride kalır.' : 'If skipped, your local branch falls behind.'],
                ['conflict', 'conflict', isTr ? 'Amaç: Git karar veremediğinde final doğru içeriği localde sen seçersin.' : 'Purpose: when Git cannot decide, you choose the final correct local content.', isTr ? 'Çözülmezse marker’lar kalır ve test/build bozulur.' : 'If unresolved, markers remain and tests/builds break.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Bu harita komut ezberi değil, düşünme sırasıdır. Yeni local projede `git init` ile başlarsın; GitHub’da var olan repo için ise önce `git clone` yaparsın.' : 'This map is not command memorization; it is thinking order. For a new local project, start with `git init`; for an existing GitHub repo, start with `git clone`.'}
                    </div>
                    {rows.map(([key, label, purpose, risk], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-teal-500 bg-teal-950/30' : 'border-teal-300 bg-teal-50') : done ? (darkMode ? 'border-emerald-700 bg-emerald-950/25' : 'border-emerald-300 bg-emerald-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{purpose}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>{risk}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Gerçek iş kuralı: conflict GitHub’da sihirli şekilde çözülmez. Dosyayı localde aç, final doğru davranışı yaz, test et, `git add` ile resolved işaretle, sonra merge/rebase devam komutunu çalıştır.' : 'Real work rule: conflicts are not magically solved on GitHub. Open the file locally, write the final correct behavior, test it, mark resolved with `git add`, then continue the merge/rebase.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-terminal-shell-map') {
            const s = simState
            const order = ['idle', 'type', 'shell', 'git', 'repo', 'output']
            const cur = order.indexOf(s)
            const rows = [
                ['type', isTr ? 'Terminal penceresi' : 'Terminal window', isTr ? 'Komutu yazdığın ekrandır. VS Code Terminal, Git Bash penceresi veya macOS Terminal bu katmandır.' : 'This is the screen where you type. VS Code Terminal, a Git Bash window, or macOS Terminal are this layer.'],
                ['shell', 'Shell', isTr ? 'Komutu yorumlayan motordur. Git Bash, PowerShell, CMD, bash veya zsh burada devreye girer.' : 'This is the engine interpreting the command. Git Bash, PowerShell, CMD, bash, or zsh operate here.'],
                ['git', 'Git', isTr ? '`git status` içindeki `git`, shell tarafından Git programına gönderilir.' : 'The `git` part of `git status` is handed from the shell to the Git program.'],
                ['repo', '.git', isTr ? 'Git repo bilgisini, branch durumunu ve working tree değişikliklerini okur.' : 'Git reads repository metadata, branch state, and working tree changes.'],
                ['output', isTr ? 'Çıktı' : 'Output', isTr ? 'Sonuç tekrar terminal penceresinde görünür. Kullanıcı ne olduğunu buradan anlar.' : 'The result returns to the terminal window. The user understands what happened from this output.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Yeni başlayan için en önemli ayrım: terminal gördüğün pencere, shell komutu çalıştıran motor, Git ise version control programıdır.' : 'The most important beginner distinction: terminal is the visible window, shell is the engine running commands, and Git is the version control program.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-sky-500 bg-sky-950/30' : 'border-sky-300 bg-sky-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-sky-800 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-800'}`}>
                        {isTr ? 'Kural: hata alınca önce “doğru klasörde miyim?” diye `pwd` ile bak, sonra Git komutunu tekrar düşün.' : 'Rule: when you get an error, first ask “am I in the right folder?” with `pwd`, then rethink the Git command.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-terminal-install-use') {
            const s = simState
            const order = ['idle', 'download', 'install', 'open', 'verify', 'ide']
            const cur = order.indexOf(s)
            const rows = [
                ['download', isTr ? 'İndir' : 'Download', isTr ? 'Windows için Git for Windows; macOS/Linux için package manager yolunu seç.' : 'Choose Git for Windows on Windows; package-manager path on macOS/Linux.'],
                ['install', isTr ? 'Kur' : 'Install', isTr ? 'İlk öğrenmede varsayılan seçenekler yeterlidir; Git Bash Windows’ta bu kurulumla gelir.' : 'For first learning, defaults are enough; Git Bash arrives with this install on Windows.'],
                ['open', isTr ? 'Aç' : 'Open', isTr ? 'Git Bash, PowerShell, macOS Terminal, Linux terminal veya IDE terminal açabilirsin.' : 'You can open Git Bash, PowerShell, macOS Terminal, Linux terminal, or an IDE terminal.'],
                ['verify', isTr ? 'Doğrula' : 'Verify', isTr ? '`git --version` çıktısı görmeden gerçek projede Git kullanmaya başlama.' : 'Do not start using Git in a real project until `git --version` prints output.'],
                ['ide', isTr ? 'Projede kullan' : 'Use in project', isTr ? 'VS Code/IntelliJ terminalinde aktif klasör proje klasörü mü kontrol et.' : 'In VS Code/IntelliJ terminal, check whether the active folder is the project folder.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Kurulum öğretimi komut ezberi değildir. Önce doğru aracı indir, aç, sonra Git’in gerçekten çalıştığını kanıtla.' : 'Installation learning is not command memorization. Download the right tool, open it, then prove Git really works.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-300 bg-emerald-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-emerald-800 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                        {isTr ? 'Güvenli ilk test: `pwd` ile konumu gör, `git --version` ile kurulumu doğrula, sonra proje klasöründe `git status` çalıştır.' : 'Safe first test: use `pwd` for location, `git --version` for installation, then run `git status` in the project folder.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-bash-open-folder') {
            const s = simState
            const order = ['idle', 'folder', 'cmdAddress', 'cmdOpen', 'bashMenu', 'bashOpen', 'ide']
            const cur = order.indexOf(s)
            const rows = [
                ['folder', isTr ? 'Proje klasörünü aç' : 'Open project folder', isTr ? 'Önce Windows Explorer içinde çalışacağın klasörü açarsın. Amaç terminalin yanlış yerde başlamamasıdır.' : 'First open the folder you will work in inside Windows Explorer. The goal is to avoid starting the terminal in the wrong place.'],
                ['cmdAddress', isTr ? 'Adres çubuğuna `cmd` yaz' : 'Type `cmd` in address bar', isTr ? 'Adres çubuğuna `cmd` yazıp Enter’a basarsan CMD doğrudan bu klasörde açılır.' : 'If you type `cmd` in the address bar and press Enter, CMD opens directly in this folder.'],
                ['cmdOpen', isTr ? 'CMD sonucu' : 'CMD result', isTr ? 'Prompt `C:\\...\\qa-project>` gibi görünür. Bu, terminalin proje klasöründe olduğunu kanıtlar.' : 'The prompt looks like `C:\\...\\qa-project>`. This proves the terminal is inside the project folder.'],
                ['bashMenu', isTr ? 'Git Bash Here seç' : 'Choose Git Bash Here', isTr ? 'Klasör içinde boş alana sağ tıklayıp Git Bash Here seçersin. Windows 11’de önce Show more options gerekebilir.' : 'Right-click an empty area in the folder and choose Git Bash Here. On Windows 11 you may need Show more options first.'],
                ['bashOpen', isTr ? 'Git Bash sonucu' : 'Git Bash result', isTr ? 'Prompt `~/Desktop/qa-project` gibi görünür. `pwd` ve `ls` ile doğru yerde olduğunu kontrol edersin.' : 'The prompt looks like `~/Desktop/qa-project`. Check location with `pwd` and contents with `ls`.'],
                ['ide', isTr ? 'IDE terminali' : 'IDE terminal', isTr ? 'VS Code veya IntelliJ terminali de aynı klasörde açılabilir. Komut yazmadan önce aktif klasörü kontrol et.' : 'VS Code or IntelliJ terminal can also open in the same folder. Check the active folder before typing commands.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Bu bölüm sadece terminali doğru klasörde açmaya odaklanır. Doğru klasör yoksa doğru komut da yanlış yere çalışır.' : 'This section focuses only on opening the terminal in the right folder. Without the right folder, even the right command runs in the wrong place.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-green-500 bg-green-950/30' : 'border-green-300 bg-green-50') : done ? (darkMode ? 'border-emerald-700 bg-emerald-950/25' : 'border-emerald-300 bg-emerald-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-green-800 bg-green-950/30 text-green-200' : 'border-green-200 bg-green-50 text-green-800'}`}>
                        {isTr ? 'Mini kontrol: terminal açılınca önce `pwd` veya CMD’de prompt satırına bak. Klasör doğruysa komut yazmaya başla.' : 'Mini check: when the terminal opens, first look at `pwd` or the CMD prompt. If the folder is correct, start typing commands.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-bash-command-runner') {
            const s = simState
            const order = ['idle', 'pwd', 'ls', 'cd', 'mkdir', 'file', 'ipconfig', 'git']
            const cur = order.indexOf(s)
            const rows = [
                ['pwd', '`pwd`', isTr ? 'Bulunduğun klasörün tam yolunu gösterir. Yanlış yerdeysen sonraki komutları çalıştırma.' : 'Shows the full path of the current folder. If it is wrong, do not run the next commands.'],
                ['ls', '`ls` / `dir`', isTr ? 'Dosya ve klasörleri listeler. Git Bash’te `ls`, CMD’de `dir` sık kullanılır.' : 'Lists files and folders. `ls` is common in Git Bash; `dir` is common in CMD.'],
                ['cd', '`cd`', isTr ? '`cd tests` klasöre girer, `cd ..` bir üst klasöre döner. Terminal kullanmanın en temel hareketidir.' : '`cd tests` enters a folder, `cd ..` returns one level up. This is the basic terminal movement.'],
                ['mkdir', '`mkdir`', isTr ? 'Yeni klasör oluşturur. Komut sonrası `ls` ile gerçekten oluştuğunu gör.' : 'Creates a new folder. Use `ls` afterward to see that it really exists.'],
                ['file', '`touch` / `echo` / `cat`', isTr ? 'Git Bash’te dosya oluşturur, içine yazar ve içeriği okursun. CMD’de okuma için `type` kullanılır.' : 'In Git Bash you create a file, write into it, and read it. In CMD, use `type` to read.'],
                ['ipconfig', '`ipconfig`', isTr ? 'Git komutu değildir. Windows ağ bilgisini terminalde görürsün; IPv4 ve gateway gibi satırlar çıkar.' : 'This is not a Git command. It shows Windows network info such as IPv4 and gateway.'],
                ['git', '`git --version`', isTr ? 'Git’in bu terminalden çalıştığını doğrular. Çıktı yoksa PATH veya kurulum problemi olabilir.' : 'Confirms Git runs from this terminal. If there is no output, PATH or installation may be wrong.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Bu bölüm sadece komut yazma ve sonucu okuma alışkanlığına odaklanır. Her komuttan sonra ekranda ne değiştiğine bak.' : 'This section focuses only on typing commands and reading output. After each command, look at what changed on screen.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-sky-500 bg-sky-950/30' : 'border-sky-300 bg-sky-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-sky-800 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-800'}`}>
                        {isTr ? 'Alışkanlık: önce konumu gör, sonra klasör hareketi yap, sonra sonucu oku. Terminal öğrenmenin özü budur.' : 'Habit: first see location, then move folders, then read the result. That is the core of learning the terminal.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-install-os-setup') {
            const s = simState
            const order = ['idle', 'windows', 'mac', 'linux', 'verify', 'identity']
            const cur = order.indexOf(s)
            const rows = [
                ['windows', 'Windows', 'winget / Git for Windows'],
                ['mac', 'macOS', 'Homebrew / installer'],
                ['linux', 'Linux', 'apt / dnf / pacman'],
                ['verify', 'Verify', 'git --version'],
                ['identity', 'Identity', 'user.name + user.email'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Kurulumda sıra basit: kendi işletim sistemini seç, Git’in gerçekten geldiğini doğrula, sonra commit kimliğini ayarla.' : 'Installation order is simple: choose your operating system, verify Git is really installed, then configure commit identity.'}
                    </div>
                    {rows.map(([key, label, value], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-orange-500 bg-orange-950/30' : 'border-orange-300 bg-orange-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-orange-800 bg-orange-950/30 text-orange-200' : 'border-orange-200 bg-orange-50 text-orange-800'}`}>
                        {isTr ? 'Önemli: kurulum komutunu ezberleme. Önce hangi işletim sisteminde olduğunu ve doğrulama çıktısını anlamalısın.' : 'Important: do not memorize the install command first. Understand your OS path and the verification output.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'gitignore-create-and-match') {
            const s = simState
            const order = ['idle', 'files', 'write', 'filter', 'status']
            const cur = order.indexOf(s)
            const rows = [
                ['files', isTr ? 'Dosyaları ayır' : 'Separate files', isTr ? 'Source/test/config örneği commit edilebilir; generated output, secret ve log dosyaları ignore edilir.' : 'Source/tests/sample config can be committed; generated output, secrets and logs are ignored.'],
                ['write', isTr ? '.gitignore yaz' : 'Write .gitignore', isTr ? 'Kural dosyasını proje köküne koyarsın. Takımın ortak davranışı bu dosyadan gelir.' : 'Put the rule file in the project root. The team-wide behavior comes from this file.'],
                ['filter', isTr ? 'Git filtreler' : 'Git filters', isTr ? '`node_modules/`, `target/`, `.env*` gibi eşleşen untracked dosyalar normal status çıktısından kaybolur.' : 'Matching untracked files like `node_modules/`, `target/`, `.env*` disappear from normal status output.'],
                ['status', isTr ? 'Sonucu kanıtla' : 'Prove the result', isTr ? '`git status --ignored --short` ignored dosyaları özellikle gösterir; `git check-ignore -v .env` hangi satırın çalıştığını söyler.' : '`git status --ignored --short` shows ignored files explicitly; `git check-ignore -v .env` tells which line matched.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? '.gitignore ezber değil, karar filtresidir: Git hangi dosyaları takip etmeyi hiç teklif etmeyecek?' : '.gitignore is not memorization, it is a decision filter: which files should Git never offer to track?'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-red-500 bg-red-950/30' : 'border-red-300 bg-red-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Kural: gerçek secret dosyasını ignore et; ama takımın nasıl dolduracağını bilmesi için `.env.example` gibi boş/güvenli örneği commit et.' : 'Rule: ignore the real secret file; commit a safe empty sample such as `.env.example` so the team knows what to fill.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'gitignore-already-tracked-fix') {
            const s = simState
            const order = ['idle', 'committed', 'leak', 'addRule', 'rmCached', 'safe']
            const cur = order.indexOf(s)
            const rows = [
                ['committed', isTr ? 'Sorun' : 'Problem', isTr ? '.env daha önce commit edildiği için artık tracked dosyadır.' : '.env was committed earlier, so it is now a tracked file.'],
                ['leak', isTr ? 'History riski' : 'History risk', isTr ? '`git log -p -- .env` eski secret değerini gösterebilir. .gitignore bunu geçmişten silmez.' : '`git log -p -- .env` may show the old secret value. .gitignore does not erase history.'],
                ['addRule', isTr ? 'Kural ekle' : 'Add rule', isTr ? '.gitignore içine `.env*` yazmak yeni secret dosyalarının tekrar stage edilmesini engeller.' : 'Writing `.env*` into .gitignore prevents new secret files from being staged again.'],
                ['rmCached', isTr ? 'Takibi durdur' : 'Stop tracking', isTr ? '`git rm --cached .env` dosyayı diskten silmez; sadece Git index içinden çıkarır.' : '`git rm --cached .env` does not delete the file from disk; it only removes it from the Git index.'],
                ['safe', isTr ? 'Son güvenlik adımı' : 'Final security step', isTr ? 'Commit sonrası dosya artık gelecekte push edilmez. Ama gerçek secret sızdıysa token/key rotate edilir.' : 'After the commit, the file will not be pushed again. But if a real secret leaked, rotate the token/key.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'En kritik fark: ignore kuralı sadece untracked dosyalara etki eder. Zaten tracked olan dosyayı ayrıca index içinden çıkarmalısın.' : 'Critical distinction: ignore rules affect only untracked files. A file that is already tracked must also be removed from the index.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-amber-500 bg-amber-950/30' : 'border-amber-300 bg-amber-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-amber-800 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                        {isTr ? 'Güvenli komut: `git rm --cached .env`. Tehlikeli olan: `git rm .env`, çünkü dosyayı diskten de silebilir.' : 'Safe command: `git rm --cached .env`. Dangerous command: `git rm .env`, because it can delete the file from disk too.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-compile-run') {
            const s = simState
            const order = ['idle', 'source', 'compile', 'bytecode', 'jvm', 'output']
            const cur = order.indexOf(s)
            const nodes = [
                { key: 'source', label: 'Source', value: 'Main.java' },
                { key: 'compile', label: 'Compiler', value: 'javac' },
                { key: 'bytecode', label: 'Bytecode', value: 'Main.class' },
                { key: 'jvm', label: 'Runtime', value: 'JVM' },
                { key: 'output', label: 'Output', value: isTr ? 'Merhaba QA!' : 'Hello QA!' },
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Java kodu doğrudan çalışmaz; önce bytecode olur, sonra JVM o bytecodeu çalıştırır.' : 'Java source does not run directly; it becomes bytecode first, then the JVM executes that bytecode.'}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {nodes.map((node, i) => {
                            const active = order.indexOf(node.key) === cur
                            const done = order.indexOf(node.key) < cur && s !== 'idle'
                            return (
                                <div key={node.key} className={`rounded-lg border p-3 transition-all ${active
                                    ? (darkMode ? 'border-orange-400 bg-orange-900/25' : 'border-orange-400 bg-orange-50')
                                    : done
                                        ? (darkMode ? 'border-green-600 bg-green-900/15' : 'border-green-300 bg-green-50')
                                        : (darkMode ? 'border-gray-700 bg-gray-900/60' : 'border-gray-200 bg-gray-50')
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-green-500 text-white' : active ? 'bg-orange-500 text-white animate-pulse' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>{done ? '✓' : i + 1}</span>
                                        <div>
                                            <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{node.label}</div>
                                            <div className={`text-xs font-mono ${active ? (darkMode ? 'text-orange-200' : 'text-orange-800') : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{node.value}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-orange-800 bg-orange-950/30 text-orange-200' : 'border-orange-200 bg-orange-50 text-orange-800'}`}>
                        {isTr ? 'Notlardaki "Codes → JDK → Binary → İşlem" şemasının modern karşılığı: .java → javac → .class → JVM → output.' : 'Modern version of the notes flow: .java → javac → .class → JVM → output.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-stack-heap') {
            const s = simState
            const cur = ['idle', 'declare', 'primitive', 'reference', 'heap', 'update', 'done'].indexOf(s)
            return (
                <div className="space-y-4">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Primitive value doğrudan stack tarafında tutulur. Object için stack sadece adresi tutar; gerçek object heap tarafındadır.' : 'A primitive value is stored directly on the stack. For an object, the stack stores a reference; the real object is on the heap.'}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-xl border p-3 ${darkMode ? 'border-blue-700 bg-blue-950/30' : 'border-blue-200 bg-blue-50'}`}>
                            <div className={`text-xs font-bold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>STACK</div>
                            <div className={`rounded border p-2 text-xs font-mono mb-2 ${cur >= 2 ? (darkMode ? 'border-green-600 text-green-200 bg-green-950/30' : 'border-green-300 text-green-800 bg-green-50') : (darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400')}`}>
                                score = {cur >= 5 ? '80' : cur >= 2 ? '75' : '?'}
                            </div>
                            <div className={`rounded border p-2 text-xs font-mono ${cur >= 3 ? (darkMode ? 'border-orange-600 text-orange-200 bg-orange-950/30' : 'border-orange-300 text-orange-800 bg-orange-50') : (darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400')}`}>
                                name → {cur >= 3 ? '#A1' : '?'}
                            </div>
                        </div>
                        <div className={`rounded-xl border p-3 ${darkMode ? 'border-orange-700 bg-orange-950/30' : 'border-orange-200 bg-orange-50'}`}>
                            <div className={`text-xs font-bold mb-2 ${darkMode ? 'text-orange-200' : 'text-orange-800'}`}>HEAP</div>
                            <div className={`rounded border p-2 text-xs font-mono min-h-[70px] ${cur >= 4 ? (darkMode ? 'border-orange-500 text-orange-100 bg-orange-900/30' : 'border-orange-300 text-orange-800 bg-white') : (darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400')}`}>
                                {cur >= 4 ? '#A1: "admin"' : isTr ? 'Object bekleniyor' : 'Waiting for object'}
                            </div>
                        </div>
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'QA tarafında bu model özellikle String karşılaştırması, null reference ve mutable/immutable davranışlarını anlamayı kolaylaştırır.' : 'In QA, this model makes String comparison, null references, and mutable/immutable behavior easier to reason about.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-branch-runner') {
            const s = simState
            const order = ['idle', 'input', 'scanner', 'compare90', 'compare80', 'compare70', 'output']
            const cur = order.indexOf(s)
            const checks = [
                ['compare90', 'score >= 90', 'false'],
                ['compare80', 'score >= 80', 'false'],
                ['compare70', 'score >= 70', 'true'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'if/else merdiveni yukarıdan aşağı iner. İlk true bulunduğunda o blok çalışır ve aşağıdaki bloklar atlanır.' : 'An if/else ladder is evaluated from top to bottom. The first true condition runs, and the rest are skipped.'}
                    </div>
                    <div className={`rounded-xl border p-3 ${darkMode ? 'border-gray-700 bg-gray-900/60' : 'border-gray-200 bg-gray-50'}`}>
                        <div className={`text-xs font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{isTr ? 'Değerlendirme Sırası' : 'Evaluation Order'}</div>
                        {checks.map(([key, expr, result]) => {
                            const active = order.indexOf(key) === cur
                            const done = order.indexOf(key) < cur || (key === 'compare70' && s === 'output')
                            const truthy = result === 'true' && done
                            return (
                                <div key={key} className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-2 text-xs font-mono transition-all ${active
                                    ? (darkMode ? 'bg-cyan-900/35 text-cyan-100' : 'bg-cyan-50 text-cyan-800')
                                    : done
                                        ? truthy
                                            ? (darkMode ? 'bg-green-900/30 text-green-200' : 'bg-green-50 text-green-800')
                                            : (darkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-50 text-red-700')
                                        : (darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-400')
                                    }`}>
                                    <span>{done ? (truthy ? '✓' : '×') : active ? '→' : '·'}</span>
                                    <span className="flex-1">{expr}</span>
                                    <span>{done ? result : '?'}</span>
                                </div>
                            )
                        })}
                        <div className={`rounded-lg px-3 py-2 text-xs font-mono ${s === 'output' ? (darkMode ? 'bg-green-900/30 text-green-200' : 'bg-green-50 text-green-800') : (darkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-400')}`}>
                            {s === 'output' ? 'print("BB")' : isTr ? 'çıktı henüz yok' : 'no output yet'}
                        </div>
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-cyan-800 bg-cyan-950/30 text-cyan-200' : 'border-cyan-200 bg-cyan-50 text-cyan-800'}`}>
                        {isTr ? 'Not dosyasındaki Scanner + if örneklerinin test otomasyonundaki karşılığı: input al, koşulu değerlendir, doğru branch için assertion yaz.' : 'QA version of Scanner + if examples: read input, evaluate the condition, then assert the correct branch.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-javac-workshop') {
            const s = simState
            const order = ['idle', 'folder', 'file', 'compile', 'classfile', 'run', 'done']
            const cur = order.indexOf(s)
            const cards = [
                ['folder', 'java-lab/', isTr ? 'Çalışma klasörü' : 'Working folder'],
                ['file', 'Main.java', isTr ? 'Senin yazdığın kaynak kod' : 'Source code you write'],
                ['classfile', 'Main.class', isTr ? 'javac tarafından üretilen bytecode' : 'Bytecode generated by javac'],
                ['run', 'java Main', isTr ? 'JVM Main.class dosyasını çalıştırır' : 'JVM runs Main.class'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Önemli ayrım: javac dosyayı çalıştırmaz, derler. java komutu ise oluşan .class dosyasını çalıştırır.' : 'Important split: javac does not run the file; it compiles it. The java command runs the generated .class file.'}
                    </div>
                    {cards.map(([key, title, desc]) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active
                                ? (darkMode ? 'border-orange-500 bg-orange-950/30' : 'border-orange-300 bg-orange-50')
                                : done
                                    ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50')
                                    : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')
                                }`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : '·'} {title}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-orange-800 bg-orange-950/30 text-orange-200' : 'border-orange-200 bg-orange-50 text-orange-800'}`}>
                        {isTr ? 'Dosya adı ve class adı aynı olmalı: public class Main yazdıysan dosya Main.java olmalı.' : 'File name and class name must match: if you write public class Main, the file must be Main.java.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-intellij-project') {
            const s = simState
            const order = ['idle', 'download', 'newProject', 'sdk', 'src', 'class', 'main', 'run', 'done']
            const cur = order.indexOf(s)
            const settings = [
                ['download', isTr ? 'Kurulum' : 'Install', isTr ? 'Toolbox veya installer ile IntelliJ IDEA' : 'IntelliJ IDEA via Toolbox or installer'],
                ['sdk', 'SDK/JDK', 'JDK 21'],
                ['class', 'Class', 'Main.java'],
                ['main', 'Entry point', 'public static void main(String[] args)'],
                ['done', 'Console', isTr ? 'Merhaba IntelliJ!' : 'Hello IntelliJ!'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'IDE, dosyaları düzenleyen, hataları gösteren ve Run butonuyla komutları senin yerine çağıran çalışma masasıdır.' : 'An IDE is a workbench that edits files, shows mistakes, and calls the commands for you through Run buttons.'}
                    </div>
                    {settings.map(([key, label, value]) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        return (
                            <div key={key} className={`flex items-center gap-3 rounded-lg border p-3 ${ready ? (darkMode ? 'border-violet-700 bg-violet-950/25' : 'border-violet-200 bg-violet-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ready ? 'bg-violet-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>{ready ? '✓' : '·'}</span>
                                <div>
                                    <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{label}</div>
                                    <div className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-yellow-800 bg-yellow-950/30 text-yellow-200' : 'border-yellow-200 bg-yellow-50 text-yellow-800'}`}>
                        {isTr ? 'Öğrenirken auto-complete ve AI önerilerini azalt: önce parmakların class, main, ; ve {} ritmini öğrensin.' : 'While learning, reduce auto-complete and AI suggestions: first let your hands learn class, main, ; and {} rhythm.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'java-maven-lifecycle') {
            const s = simState
            const order = ['idle', 'pom', 'compile', 'test', 'package', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['pom', 'pom.xml', isTr ? 'Bağımlılık ve plugin listesi' : 'Dependencies and plugins'],
                ['compile', 'target/classes', isTr ? 'Derlenmiş .class dosyaları' : 'Compiled .class files'],
                ['test', 'target/surefire-reports', isTr ? 'JUnit test raporları' : 'JUnit test reports'],
                ['package', 'target/*.jar', isTr ? 'Paylaşılabilir paket' : 'Shareable package'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Maven, büyüyen Java projelerinde javac komutlarını, kütüphane indirmeyi ve test çalıştırmayı tek düzenli lifecycle altında toplar.' : 'Maven gathers javac commands, dependency downloads, and test execution under one lifecycle for growing Java projects.'}
                    </div>
                    {rows.map(([key, label, desc]) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${ready ? (darkMode ? 'border-blue-700 bg-blue-950/25' : 'border-blue-200 bg-blue-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold font-mono ${ready ? (darkMode ? 'text-blue-200' : 'text-blue-800') : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ready ? '✓ ' : '· '}{label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'İlk gün javac yeterli. Birden fazla class, test kütüphanesi veya Selenium/JUnit bağımlılığı gerektiğinde Maven’e geç.' : 'On day one, javac is enough. Move to Maven when you need multiple classes, test libraries, or Selenium/JUnit dependencies.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-three-areas') {
            const s = simState
            const order = ['idle', 'edit', 'stage', 'commit', 'push', 'remote']
            const cur = order.indexOf(s)
            const rows = [
                ['edit', 'Working tree', isTr ? 'Değişen ama henüz seçilmeyen dosyalar' : 'Changed files not selected yet'],
                ['stage', 'Staging area', isTr ? 'Bir sonraki commit’e girecek değişiklikler' : 'Changes prepared for the next commit'],
                ['commit', 'Local repo', isTr ? 'Senin bilgisayarındaki snapshot geçmişi' : 'Snapshot history on your machine'],
                ['remote', 'origin/GitHub', isTr ? 'Takımın paylaştığı uzak depo' : 'Shared remote repository for the team'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Git bir dosya paylaşma aracı değil, snapshot geçmişi tutan bir zaman makinesidir. Java’daki object state gibi: hangi anda hangi state vardı, commit onu saklar.' : 'Git is not just a file-sharing tool; it is a time machine for snapshots. Like Java object state: a commit stores what the project looked like at one moment.'}
                    </div>
                    {rows.map(([key, label, desc]) => {
                        const active = order.indexOf(key) === cur || (key === 'remote' && s === 'push')
                        const ready = order.indexOf(key) < cur || (key === 'remote' && s === 'remote')
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active
                                ? (darkMode ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-300 bg-emerald-50')
                                : ready
                                    ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50')
                                    : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')
                                }`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : '·'} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-emerald-800 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                        {isTr ? 'Kural: commit küçük ve anlamlı, push paylaşım noktasıdır. Commit etmeden push edecek bir şey yoktur.' : 'Rule: commit is a small meaningful snapshot; push is the sharing point. Without a commit, there is nothing useful to push.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-remote-origin-setup') {
            const s = simState
            const order = ['idle', 'commit', 'remote', 'list', 'push', 'credential', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['commit', isTr ? 'Önce local commit olmalı' : 'A local commit must exist first', isTr ? 'GitHub’a upload edilecek şey commit snapshotıdır; commit yoksa anlamlı push yoktur.' : 'The thing uploaded to GitHub is a commit snapshot; without a commit, there is nothing meaningful to push.'],
                ['remote', isTr ? 'origin GitHub adresidir' : 'origin is the GitHub address', isTr ? '`git remote add origin [REMOTE_URL]` sadece bağlantı kurar; dosyaları tek başına upload etmez.' : '`git remote add origin [REMOTE_URL]` only creates the connection; it does not upload files by itself.'],
                ['list', isTr ? 'Remote listesi kontrol edilir' : 'Remote list is inspected', isTr ? '`git remote` isimleri, `git remote -v` ve `git remote --verbose` fetch/push URL’lerini gösterir.' : '`git remote` shows names; `git remote -v` and `git remote --verbose` show fetch/push URLs.'],
                ['push', isTr ? 'İlk push upstream kurar' : 'First push sets upstream', isTr ? '`git push -u origin main` main branch’i GitHub’a gönderir ve sonraki push/pull hedefini hatırlatır.' : '`git push -u origin main` sends main to GitHub and remembers the target for future push/pull.'],
                ['credential', isTr ? 'Login güvenli saklanır' : 'Login is stored safely', isTr ? 'GitHub login isterse Windows Credential Manager veya macOS Keychain oturumu saklayabilir. Token/şifreyi URL’ye yazma.' : 'If GitHub asks for login, Windows Credential Manager or macOS Keychain may store the session. Do not put tokens/passwords in URLs.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Bu akış yeni bir local repo ile GitHub’daki boş repo arasında ilk köprüyü kurar. Branch publish konusundan farkı: burada önce `origin` adresini tanıtırsın.' : 'This flow builds the first bridge between a new local repo and an empty GitHub repo. Difference from branch publish: here you first register the `origin` address.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : done ? (darkMode ? 'border-emerald-700 bg-emerald-950/25' : 'border-emerald-300 bg-emerald-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-yellow-800 bg-yellow-950/30 text-yellow-200' : 'border-yellow-200 bg-yellow-50 text-yellow-800'}`}>
                        {isTr ? 'Modern GitHub reposu genelde `main` kullanır. Eski eğitimlerde `master` görebilirsin; gerçek branch adın neyse push komutunda onu yaz.' : 'Modern GitHub repos usually use `main`. Older tutorials may show `master`; use the actual branch name in your push command.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-branch-lab') {
            const s = simState
            const order = ['idle', 'list', 'create', 'switch', 'rename', 'work', 'commit', 'push', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['list', isTr ? 'Local branch listelenir' : 'Local branches are listed', isTr ? '`git branch` sadece local branch’leri gösterir; yıldız aktif branch’i işaret eder.' : '`git branch` only lists local branches; the star marks the active branch.'],
                ['create', isTr ? 'Branch oluşturulur' : 'Branch is created', isTr ? '`git branch hasan` yeni branch oluşturur ama bulunduğun branch değişmez.' : '`git branch hasan` creates a new branch, but your current branch does not change.'],
                ['switch', isTr ? 'Branch değiştirilir' : 'Branch is switched', isTr ? '`git switch hasan` veya eski kullanımda `git checkout hasan` seni o branch’e geçirir.' : '`git switch hasan`, or older `git checkout hasan`, moves you onto that branch.'],
                ['rename', isTr ? 'Branch adı değiştirilir' : 'Branch is renamed', isTr ? '`git branch -m feature/hasan` aktif local branch adını değiştirir. Aktif olmayan için `git branch -m old_name new_name` kullanılır.' : '`git branch -m feature/hasan` renames the active local branch. For another branch, use `git branch -m old_name new_name`.'],
                ['work', isTr ? 'Odaklı değişiklik' : 'Focused change', isTr ? 'Tek konu: örneğin sadece checkout testleri. Büyük torba PR yapma.' : 'One topic only, for example checkout tests. Avoid bag-of-everything PRs.'],
                ['commit', isTr ? 'Küçük snapshot' : 'Small snapshot', isTr ? 'Commit mesajı davranışı anlatmalı; sadece “fix” yazmak review’u zorlaştırır.' : 'The commit message should describe behavior; plain “fix” makes review harder.'],
                ['push', isTr ? 'Upstream kurulur' : 'Upstream is set', isTr ? '`-u origin branch` sonraki push/pull hedefini branch’e bağlar.' : '`-u origin branch` binds future push/pull to that branch.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Branch komutlarını tek tek düşün: bazıları sadece gösterir, bazıları oluşturur, bazıları bulunduğun branch’i değiştirir. En büyük karışıklık genelde `git branch hasan` ile `git switch hasan` farkını bilmemekten gelir.' : 'Think about branch commands one by one: some only show state, some create a branch, and some change your current branch. The common confusion is the difference between `git branch hasan` and `git switch hasan`.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-green-500 bg-green-950/30' : 'border-green-300 bg-green-50') : done ? (darkMode ? 'border-emerald-700 bg-emerald-950/25' : 'border-emerald-300 bg-emerald-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-green-800 bg-green-950/30 text-green-200' : 'border-green-200 bg-green-50 text-green-800'}`}>
                        {isTr ? 'Java analojisi: public API’yi bozmadan önce private bir methodda deneme yapmak gibi; branch main’i koruyan deneme alanıdır.' : 'Java analogy: like experimenting in a private method before exposing a public API; a branch protects main while you work.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-remote-branch-publish') {
            const s = simState
            const order = ['idle', 'switch', 'publish', 'remote', 'verify', 'next', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['switch', isTr ? 'Doğru local branch seçilir' : 'Correct local branch is selected', isTr ? '`git switch hasan` ile paylaşmak istediğin branch üzerinde olduğundan emin olursun.' : '`git switch hasan` makes sure you are on the branch you want to share.'],
                ['publish', isTr ? 'İlk publish yöntemi seçilir' : 'First-publish method is chosen', isTr ? 'Ya `git push -u origin hasan` ya da direkt repo URL yöntemi kullanılır; ikisini birden her seferinde yapma.' : 'Use either `git push -u origin hasan` or the direct repo URL method; do not run both every time.'],
                ['remote', isTr ? 'Remote branch oluşur' : 'Remote branch is created', isTr ? 'GitHub tarafında `origin/hasan` görünür hale gelir.' : '`origin/hasan` becomes visible on GitHub.'],
                ['verify', isTr ? 'Upstream kontrol edilir' : 'Upstream is verified', isTr ? '`git branch -vv`, local branch’in hangi remote branch’i takip ettiğini gösterir.' : '`git branch -vv` shows which remote branch the local branch tracks.'],
                ['next', isTr ? 'Sonraki push kısalır' : 'Future push becomes short', isTr ? 'Upstream bağlandıysa aynı branch üzerindeyken sadece `git push` yeterlidir.' : 'After upstream is connected, plain `git push` is enough while you are on the branch.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Remote branch, local branch’in GitHub tarafındaki karşılığıdır. İlk kez oluştururken uzun ve açık komut kullanırsın; bağlantı kurulduktan sonra Git hedefi hatırlar.' : 'A remote branch is the GitHub-side counterpart of your local branch. The first publish uses a long explicit command; after the connection is set, Git remembers the target.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-sky-500 bg-sky-950/30' : 'border-sky-300 bg-sky-50') : done ? (darkMode ? 'border-emerald-700 bg-emerald-950/25' : 'border-emerald-300 bg-emerald-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-yellow-800 bg-yellow-950/30 text-yellow-200' : 'border-yellow-200 bg-yellow-50 text-yellow-800'}`}>
                        {isTr ? 'Dikkat: remote branch açma komutunu sadece ilk seferde kullan. Sonraki commitlerden sonra aynı branch üzerindeysen normal `git push` yeterlidir.' : 'Warning: use the remote branch creation command only the first time. After later commits, if you are still on the same branch, normal `git push` is enough.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-merge-lab') {
            const s = simState
            const order = ['idle', 'fetch', 'switch', 'merge', 'test', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['fetch', isTr ? 'Remote bilgisi tazelenir' : 'Remote knowledge refreshes', isTr ? '`fetch` dosyanı değiştirmez; sadece origin/main nerede onu öğrenir.' : '`fetch` does not change your files; it only learns where origin/main is.'],
                ['switch', isTr ? 'Hedef branch seçilir' : 'Target branch is chosen', isTr ? 'Merge her zaman bulunduğun branch’in içine yapılır.' : 'A merge always applies into the branch you are currently on.'],
                ['merge', isTr ? 'İki hikaye birleşir' : 'Two stories combine', isTr ? 'Git ortak atayı bulur, iki tarafın commitlerini yeni state’e taşır.' : 'Git finds the common ancestor and combines both sides into a new state.'],
                ['test', isTr ? 'Davranış kanıtlanır' : 'Behavior is proven', isTr ? 'Temiz merge bile bug üretebilir; test sonucu gerçek güvence verir.' : 'Even a clean merge can create bugs; tests provide real confidence.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Merge, “dosyaları üst üste koymak” değildir. İki commit geçmişini tek çalışma davranışına çevirir. Bu yüzden merge sonrası test çalıştırmak şarttır.' : 'Merge is not simply stacking files. It converts two commit histories into one working behavior, so tests after merge are mandatory.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'Gerçek iş kuralı: PR öncesi branch’ini güncelle, testleri koştur, sonra reviewer’dan davranışa bakmasını iste.' : 'Real work rule: update your branch before PR, run tests, then ask the reviewer to inspect behavior.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-conflict-lab') {
            const s = simState
            const order = ['idle', 'pull', 'conflict', 'open', 'resolve', 'test', 'add', 'continue', 'done']
            const cur = order.indexOf(s)
            const rows = [
                ['pull', isTr ? 'Güncel main alınır' : 'Current main is pulled', isTr ? 'Conflict genellikle senin branch’in main’den uzak kaldığında görünür.' : 'Conflicts often show up when your branch has drifted from main.'],
                ['conflict', isTr ? 'Git karar veremez' : 'Git cannot decide', isTr ? 'Aynı satır veya aynı davranış iki tarafta farklı değişmiştir.' : 'The same line or behavior changed differently on both sides.'],
                ['open', isTr ? 'Markerlar okunur' : 'Markers are read', isTr ? '`<<<<<<<`, `=======`, `>>>>>>>` sadece işaret; çözüm senin mantığında.' : '`<<<<<<<`, `=======`, `>>>>>>>` are markers; the solution is your logic.'],
                ['resolve', isTr ? 'Final davranış yazılır' : 'Final behavior is written', isTr ? 'Sadece bir tarafı seçmek zorunda değilsin; çoğu zaman iki niyeti birleştirirsin.' : 'You do not have to pick one side; often you combine both intentions.'],
                ['test', isTr ? 'Test ile kanıtlanır' : 'Proven by test', isTr ? 'Conflict marker silindi diye iş bitmez; login akışı gerçekten çalışmalı.' : 'Removing markers is not enough; the login flow must actually work.'],
                ['add', isTr ? 'Resolved işaretlenir' : 'Marked resolved', isTr ? '`git add` burada dosyayı stage etmekten fazlasını yapar: conflict çözüldü der.' : '`git add` does more than stage here: it tells Git the conflict is resolved.'],
                ['continue', isTr ? 'Merge/rebase tamamlanır' : 'Merge/rebase completes', isTr ? 'Hangi operasyonu başlattıysan onun devam komutunu kullan.' : 'Use the continuation command for the operation you started.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Conflict kötü Git kullanımı demek değildir; Git’in “bu davranış kararını insan vermeli” demesidir. Panik yerine sırayla dosya, niyet, test ve devam adımı düşünülür.' : 'A conflict does not mean you used Git badly; it means Git needs a human behavior decision. Think file, intent, test, and continuation in order.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-red-500 bg-red-950/30' : 'border-red-300 bg-red-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Tehlike: conflict çözmeden `--abort`, `reset --hard` veya force push kullanma. Önce `git status` ve gerekirse yedek branch.' : 'Danger: do not reach for `--abort`, `reset --hard`, or force push before understanding the conflict. Check `git status` and create a backup branch if needed.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-pr-flow') {
            const s = simState
            const order = ['idle', 'branch', 'commit', 'push', 'pr', 'review', 'checks', 'merge', 'done']
            const cur = order.indexOf(s)
            const cards = [
                ['branch', 'feature branch', isTr ? 'main kirlenmez' : 'main stays clean'],
                ['pr', 'Pull Request', isTr ? 'tartışma ve görünür diff' : 'discussion and visible diff'],
                ['review', 'Review', isTr ? 'ikinci göz hatayı erken yakalar' : 'second pair of eyes catches issues early'],
                ['checks', 'Actions checks', isTr ? 'otomasyon kapısı' : 'automation gate'],
                ['merge', 'main', isTr ? 'onaylı değişiklik birleşir' : 'approved change is merged'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'GitHub iş akışında branch kişisel çalışma alanıdır, PR ise takımın ortak kalite kapısıdır. Java’da private method içinde denediğin şeyi public API’ye çıkarmadan önce review almak gibi düşünebilirsin.' : 'In a GitHub workflow, a branch is your personal workspace and a PR is the team quality gate. Think of it like reviewing code before exposing it through a Java public API.'}
                    </div>
                    {cards.map(([key, label, desc]) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`flex items-center gap-3 rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-600 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ready ? 'bg-green-600 text-white' : active ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>{ready ? '✓' : active ? '→' : '·'}</span>
                                <div>
                                    <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{label}</div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'Koruma kuralı: main branch’e doğrudan push kapalı, PR review + passing checks zorunlu olmalı.' : 'Protection rule: direct push to main should be disabled; PR review and passing checks should be required.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-pull-request-ui-tour') {
            const s = simState
            const order = ['idle', 'tab', 'new', 'compare', 'form', 'conversation', 'files', 'review', 'checks', 'merge']
            const cur = order.indexOf(s)
            const rows = [
                ['tab', 'Pull requests tab', isTr ? 'Repository içindeki PR listesini ve New pull request aksiyonunu açar.' : 'Opens the PR list and New pull request action for the repository.'],
                ['new', 'New pull request', isTr ? 'Yeni PR oluşturma akışını başlatır.' : 'Starts the new PR creation flow.'],
                ['compare', 'base / compare', isTr ? 'base hedef branch, compare senin feature branch’indir. Yanlış seçersen ters diff görürsün.' : 'base is the target branch, compare is your feature branch. Wrong choice gives a reversed diff.'],
                ['form', 'Title + description', isTr ? 'Reviewer’ın ne değiştiğini, neden değiştiğini ve nasıl test edildiğini tek ekranda anlamasını sağlar.' : 'Lets the reviewer understand what changed, why and how it was tested.'],
                ['conversation', 'Conversation', isTr ? 'Tartışma, timeline, CI özeti ve merge box burada görünür.' : 'Discussion, timeline, CI summary and merge box live here.'],
                ['files', 'Files changed', isTr ? 'Gerçek review burada yapılır; satır satır diff okunur.' : 'Real review happens here; the diff is read line by line.'],
                ['review', 'Review changes', isTr ? 'Comment, Approve veya Request changes kararı buradan submit edilir.' : 'Comment, Approve or Request changes is submitted here.'],
                ['checks', 'Checks', isTr ? 'Actions test/build/lint kapısıdır. Kırmızı check varken merge etme.' : 'Actions test/build/lint gate. Do not merge with red checks.'],
                ['merge', 'Merge pull request', isTr ? 'Review + checks + conversation tamamlandıktan sonra main’e alma adımıdır.' : 'The step that brings the PR into main after review, checks and conversations are complete.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Pull Request ekranı kodu main’e almadan önceki karar merkezidir. Java’da public API’ye çıkmadan önce yapılan review gibi düşün: niyet, diff, test ve onay aynı yerde görünür.' : 'The Pull Request screen is the decision center before code enters main. Think of it like a review before exposing a Java public API: intent, diff, tests and approval are visible together.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'PR kuralı: açıklama yoksa review zorlaşır; test kanıtı yoksa QA riski görünmez kalır.' : 'PR rule: without a description review is harder; without test evidence QA risk stays hidden.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-pr-review-conflict-ui') {
            const s = simState
            const order = ['idle', 'files', 'comment', 'review', 'request', 'conflict', 'local', 'test', 'push', 'ready']
            const cur = order.indexOf(s)
            const rows = [
                ['files', 'Files changed', isTr ? 'Reviewer diff’i okur; değişen test davranışını ve yan etkileri kontrol eder.' : 'The reviewer reads the diff and checks behavior and side effects.'],
                ['comment', 'Line comment', isTr ? 'Belirli satıra soru veya öneri bırakılır.' : 'A question or suggestion is attached to a specific line.'],
                ['review', 'Review changes', isTr ? 'Yorumlar tek karar paketine alınır.' : 'Comments are bundled into one review decision.'],
                ['request', 'Request changes', isTr ? 'Bloklayıcı risk varsa merge durdurulur. Approve bunun tersidir: reviewer açısından merge-ready.' : 'Blocking risk stops the merge. Approve is the opposite: merge-ready from the reviewer perspective.'],
                ['conflict', 'Conflict blocked', isTr ? 'GitHub aynı satırlarda farklı değişiklik gördüğü için merge butonunu kapatır.' : 'GitHub disables merge because the same lines changed differently.'],
                ['local', 'Local resolve', isTr ? 'Gerçek QA işinde conflict’i lokal çözmek daha güvenlidir çünkü test çalıştırabilirsin.' : 'For real QA work, resolving locally is safer because you can run tests.'],
                ['test', 'Test proof', isTr ? 'Marker silmek yetmez; davranışı testle kanıtla.' : 'Removing markers is not enough; prove behavior with tests.'],
                ['push', 'Push update', isTr ? 'PR branch güncellenir, GitHub conflict durumunu otomatik yeniden hesaplar.' : 'The PR branch updates and GitHub recalculates conflict state automatically.'],
                ['ready', 'Ready to merge', isTr ? 'Review, checks ve conflict temizse merge düşünülebilir.' : 'Merge can be considered when review, checks and conflicts are clean.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Code review sadece "koda bakmak" değildir; hangi riskin main’e girmesine izin verdiğini bilinçli seçmektir. Request changes kötü niyet değil, kalite kapısıdır.' : 'Code review is not just looking at code; it is choosing which risk may enter main. Request changes is not hostility, it is a quality gate.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-purple-500 bg-purple-950/30' : 'border-purple-300 bg-purple-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Tehlike: conflict çözmek için force push veya reset --hard ilk seçenek değildir. Önce local branch, merge, test, commit ve normal push akışını kullan.' : 'Danger: force push or reset --hard is not the first answer to a conflict. Use local branch, merge, test, commit and normal push first.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-actions-ui-tour') {
            const s = simState
            const order = ['idle', 'tab', 'newWorkflow', 'workflow', 'run', 'logs', 'artifact', 'rerun']
            const cur = order.indexOf(s)
            const rows = [
                ['tab', 'Actions tab', isTr ? 'Repository içindeki tüm CI/CD geçmişine buradan girersin.' : 'This is where you enter all CI/CD history for the repository.'],
                ['newWorkflow', 'New workflow', isTr ? 'Yeni YAML workflow oluşturur; dosya `.github/workflows/` altına gider.' : 'Creates a new YAML workflow under `.github/workflows/`.'],
                ['workflow', 'Workflow list', isTr ? 'Sol menüde tek workflow seçerek run listesini daraltırsın.' : 'Use the left menu to narrow runs to one workflow.'],
                ['run', 'Run row', isTr ? 'Tek çalışmayı açıp commit, branch, actor, süre ve status bilgisini görürsün.' : 'Open one execution to see commit, branch, actor, duration and status.'],
                ['logs', 'Logs', isTr ? 'Fail varsa önce job logunu oku; tahminle re-run yapma.' : 'If it failed, read job logs first; do not rerun by guess.'],
                ['artifact', 'Artifacts', isTr ? 'HTML report, screenshot, trace gibi QA kanıtlarını indirirsin.' : 'Download QA evidence such as HTML report, screenshots and traces.'],
                ['rerun', 'Re-run failed jobs', isTr ? 'Sadece kanıt topladıktan sonra failed jobları tekrar çalıştır.' : 'Rerun failed jobs only after collecting evidence.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Actions ekranı kod yazma yeri değildir; CI/CD runlarını izleme, hata kanıtı toplama ve kontrollü tekrar çalıştırma yeridir.' : 'The Actions screen is not where you write code; it is where you inspect CI/CD runs, collect evidence and rerun carefully.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'QA kuralı: kırmızı run görürsen önce log + artifact oku, sonra flaky mi gerçek bug mı karar ver.' : 'QA rule: when a run is red, inspect logs + artifacts first, then decide whether it is flaky or a real bug.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-pages-settings-ui') {
            const s = simState
            const order = ['idle', 'settings', 'pages', 'source', 'domain', 'https', 'visit']
            const cur = order.indexOf(s)
            const rows = [
                ['settings', 'Settings tab', isTr ? 'Pages ayarı Code tabında değil, repository Settings içindedir.' : 'Pages is configured inside repository Settings, not the Code tab.'],
                ['pages', 'Pages menu', isTr ? 'Sol menüde Pages seçilince yayın durumu ve deploy ayarları açılır.' : 'Choosing Pages in the left menu opens publishing status and deployment settings.'],
                ['source', 'Source', isTr ? 'Branch deploy veya GitHub Actions deploy stratejisini seçersin.' : 'Choose branch deploy or GitHub Actions deploy strategy.'],
                ['domain', 'Custom domain', isTr ? 'Kendi domainini yazarsın; DNS doğru değilse check beklemede kalır.' : 'Enter your domain; DNS check stays pending if DNS is wrong.'],
                ['https', 'Enforce HTTPS', isTr ? 'Sertifika hazır olunca HTTPS’i zorunlu yapar.' : 'Forces HTTPS once the certificate is ready.'],
                ['visit', 'Visit site', isTr ? 'Deploy gerçekten canlıya çıkmış mı son kullanıcı gibi kontrol edersin.' : 'Verify the deployment like an end user.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Pages ekranı yayın kaynağı, domain ve HTTPS kararlarının kontrol panelidir. Yanlış source seçimi eski dosyayı yayınlayabilir.' : 'The Pages screen is the control panel for source, domain and HTTPS decisions. A wrong source can publish old files.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-sky-500 bg-sky-950/30' : 'border-sky-300 bg-sky-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-sky-800 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-800'}`}>
                        {isTr ? 'Gerçek iş kontrolü: build geçti diye yetinme; Pages ekranında canlı URL’i ve HTTPS durumunu da kontrol et.' : 'Real-work check: a passing build is not enough; verify the live URL and HTTPS state on the Pages screen.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-repo-settings-tour') {
            const s = simState
            const order = ['idle', 'settings', 'collaborators', 'visibility', 'branches', 'secrets', 'pages']
            const cur = order.indexOf(s)
            const rows = [
                ['settings', 'Settings', isTr ? 'Repository davranışını değiştiren yönetim alanıdır.' : 'Administrative area that changes repository behavior.'],
                ['collaborators', 'Collaborators', isTr ? 'Kişi davet edilir, role/access ayarlanır. Gereğinden fazla yetki verme.' : 'Invite people and set role/access. Do not over-grant permissions.'],
                ['visibility', 'Public / Private', isTr ? 'Repo görünürlüğünü değiştirir. Public yapmak kodu ve geçmişi görünür kılabilir.' : 'Changes repository visibility. Making public can expose code and history.'],
                ['branches', 'Branches / Rules', isTr ? 'main branch için PR review ve required checks zorunlu yapılır.' : 'Require PR review and required checks for main.'],
                ['secrets', 'Secrets and variables', isTr ? 'Workflow secret değerleri burada saklanır, YAML içine yazılmaz.' : 'Workflow secret values live here, not inside YAML.'],
                ['pages', 'Pages', isTr ? 'Yayın source, domain ve HTTPS ayarları burada kontrol edilir.' : 'Publishing source, domain and HTTPS are controlled here.'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Settings ekranı güçlüdür: erişim, görünürlük, deploy ve güvenlik davranışını değiştirir. Her değişiklik takım etkisi düşünülerek yapılmalı.' : 'The Settings screen is powerful: it changes access, visibility, deploy and security behavior. Every change should consider team impact.'}
                    </div>
                    {rows.map(([key, label, desc], i) => {
                        const active = order.indexOf(key) === cur
                        const done = order.indexOf(key) < cur && s !== 'idle'
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-gray-400 bg-gray-800' : 'border-gray-400 bg-gray-50') : done ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{done ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Kural: visibility, collaborator role, branch rules ve secret değişikliklerinde ekip/owner onayı almadan ilerleme.' : 'Rule: do not change visibility, collaborator roles, branch rules or secrets without team/owner approval.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-actions-pages') {
            const s = simState
            const order = ['idle', 'push', 'trigger', 'checkout', 'install', 'test', 'build', 'artifact', 'deploy', 'live']
            const cur = order.indexOf(s)
            const rows = [
                ['trigger', 'workflow_dispatch / push', isTr ? 'workflow ne zaman başlar' : 'when the workflow starts'],
                ['checkout', 'checkout', isTr ? 'kod runner’a iner' : 'code lands on the runner'],
                ['install', 'npm ci', isTr ? 'temiz bağımlılık kurulumu' : 'clean dependency install'],
                ['test', 'quality gate', isTr ? 'test başarısızsa deploy yok' : 'failed tests stop deploy'],
                ['build', 'dist/', isTr ? 'yayınlanacak statik dosyalar' : 'static files to publish'],
                ['deploy', 'Pages deployment', isTr ? 'artifact GitHub Pages’e gider' : 'artifact goes to GitHub Pages'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'GitHub Actions YAML dosyası bir CI/CD tarifi gibidir: ne zaman çalışacak, hangi makinede çalışacak, hangi adımları koşacak. Java’daki Maven lifecycle gibi, adımlar sırayla başarısız olursa zincir durur.' : 'A GitHub Actions YAML file is a CI/CD recipe: when to run, which machine to use, and which steps to execute. Like the Maven lifecycle in Java, a failed step stops the chain.'}
                    </div>
                    {rows.map(([key, label, desc]) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-violet-600 bg-violet-950/30' : 'border-violet-300 bg-violet-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold font-mono ${ready ? (darkMode ? 'text-green-200' : 'text-green-800') : active ? (darkMode ? 'text-violet-200' : 'text-violet-800') : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ready ? '✓ ' : active ? '→ ' : '· '}{label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-yellow-800 bg-yellow-950/30 text-yellow-200' : 'border-yellow-200 bg-yellow-50 text-yellow-800'}`}>
                        {isTr ? 'Pages deploy için repository Settings → Pages tarafında kaynak GitHub Actions seçilmeli; custom domain kullanıyorsan CNAME build çıktısında bulunmalı.' : 'For Pages deployment, repository Settings → Pages should use GitHub Actions as the source; for a custom domain, CNAME must be included in the build output.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'explicit-wait') {
            const nodes = [
                { tag: '<div id="app">', level: 0, state: 'normal' },
                { tag: '  <button id="load-btn">', level: 1, state: ['found', 'done'].includes(simState) ? 'success' : ['clicking', 'loading'].includes(simState) ? 'active' : 'normal' },
                { tag: '  <div id="spinner">', level: 1, state: ['clicking', 'loading'].includes(simState) ? 'active' : 'hidden' },
                { tag: '  <div id="result">', level: 1, state: ['found', 'done'].includes(simState) ? 'found' : 'hidden' },
                { tag: '</div>', level: 0, state: 'normal' },
            ]
            return (
                <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 1.9 }}>
                        {nodes.map((n, idx) => {
                            const col = n.state === 'found' ? '#10b981' : n.state === 'success' ? '#10b981' : n.state === 'active' ? accent : n.state === 'hidden' ? (darkMode ? '#374151' : '#d1d5db') : (darkMode ? '#9ca3af' : '#6b7280')
                            const bg = n.state === 'found' ? (darkMode ? '#064e3b44' : '#ecfdf544') : n.state === 'active' ? `${accent}22` : 'transparent'
                            return (
                                <div key={idx} style={{ paddingLeft: n.level * 14 + 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, color: col, background: bg, borderRadius: 3, border: (n.state === 'found' || n.state === 'active') ? `1px solid ${n.state === 'found' ? '#10b981' : accent}44` : '1px solid transparent', transition: 'all 0.4s ease', fontWeight: n.state === 'found' ? 700 : 400 }}>
                                    {n.tag}
                                    {n.state === 'hidden' && <span style={{ opacity: 0.5, fontSize: 9, marginLeft: 4 }}>{isTr ? '(gizli)' : '(hidden)'}</span>}
                                    {n.state === 'found' && <span style={{ fontSize: 9, marginLeft: 4 }}>← WebDriverWait ✅</span>}
                                    {n.state === 'active' && <span style={{ fontSize: 9, marginLeft: 4, animation: 'simPulse 1s ease infinite' }}>← {isTr ? 'bekleniyor...' : 'polling...'}</span>}
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, fontSize: 10, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'monospace' }}>
                        <div style={{ color: accent, fontWeight: 700, marginBottom: 3, fontFamily: 'sans-serif' }}>{isTr ? '🤖 Test Engine:' : '🤖 Test Engine:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', lineHeight: 1.6 }}>
                            {simState === 'idle' ? (isTr ? '⏸ Hazır — Butona tıkla!' : '⏸ Ready — Click the button!') :
                                simState === 'clicking' ? 'driver.findElement("load-btn").click()' :
                                    simState === 'loading' ? 'WebDriverWait(driver, 10)\n.until(EC.visibility_of(result))' :
                                        simState === 'found' ? '✅ Element found! Test continues.' :
                                            '✅ Test passed!'}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'rest-assured-chain') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'given', 'when', 'sending', 'then', 'asserting', 'done']
            const cur = order.indexOf(s)

            const codeLines = [
                { minState: 'given', text: `given()`, color: '#3b82f6', indent: 0 },
                { minState: 'given', text: `.baseUri("https://reqres.in")`, color: subtext, indent: 4 },
                { minState: 'given', text: `.queryParam("page", 2)`, color: subtext, indent: 4 },
                { minState: 'when', text: `.when()`, color: '#f59e0b', indent: 0 },
                { minState: 'sending', text: `.get("/api/users")`, color: '#f97316', indent: 4 },
                { minState: 'then', text: `.then()`, color: '#7c3aed', indent: 0 },
                { minState: 'asserting', text: `.statusCode(200)`, color: '#10b981', indent: 4 },
                { minState: 'asserting', text: `.body("page", equalTo(2))`, color: '#10b981', indent: 4 },
                { minState: 'asserting', text: `.body("data", hasSize(6))`, color: '#10b981', indent: 4 },
            ]
            const vs = `// Postman Test:\npm.test("Status 200", () => {\n  pm.response.to.have.status(200);\n});\n// → pm.test() ≈ .then().statusCode(200)`

            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Çalışan Kod' : 'Executing Code'}
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontFamily: 'monospace', fontSize: 10, lineHeight: 1.7, marginBottom: 10 }}>
                        {codeLines.map((ln, i) => {
                            const show = order.indexOf(ln.minState) <= cur && s !== 'idle'
                            return show ? (
                                <div key={i} style={{ paddingLeft: ln.indent, color: ln.color, transition: 'color 0.3s' }}>{ln.text}</div>
                            ) : (
                                <div key={i} style={{ paddingLeft: ln.indent, color: darkMode ? '#374151' : '#e5e7eb', fontSize: 9 }}>{'  ·'}</div>
                            )
                        })}
                    </div>
                    {['asserting', 'done'].includes(s) && (
                        <div style={{ padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9.5, color: subtext, fontFamily: 'monospace', lineHeight: 1.6 }}>
                            <pre style={{ margin: 0, color: subtext }}>{vs}</pre>
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'jenkins-pipeline') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'checkout', 'build', 'test', 'analyze', 'deploy', 'done']
            const cur = order.indexOf(s)
            const stages = [
                { key: 'checkout', label: 'Checkout SCM', icon: '📥', color: '#3b82f6' },
                { key: 'build', label: 'Build', icon: '🔨', color: '#f59e0b' },
                { key: 'test', label: 'Test', icon: '🧪', color: '#7c3aed' },
                { key: 'analyze', label: 'SonarQube', icon: '🔍', color: '#06b6d4' },
                { key: 'deploy', label: 'Deploy', icon: '🚀', color: '#10b981' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Jenkinsfile Stages</div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontFamily: 'monospace', fontSize: 10, lineHeight: 1.8 }}>
                        <div style={{ color: '#f59e0b' }}>pipeline {'{'}</div>
                        <div style={{ paddingLeft: 12, color: '#6b7280' }}>agent any</div>
                        <div style={{ paddingLeft: 12, color: '#f59e0b' }}>stages {'{'}</div>
                        {stages.map((st, i) => {
                            const stIdx = order.indexOf(st.key)
                            const active = stIdx === cur
                            const done = stIdx < cur && s !== 'idle'
                            return (
                                <div key={i} style={{ paddingLeft: 24, transition: 'opacity 0.3s', opacity: s === 'idle' ? 0.4 : 1 }}>
                                    <span style={{ color: done ? '#10b981' : active ? st.color : subtext, fontWeight: active ? 700 : 400, transition: 'color 0.3s' }}>
                                        {done ? '✅ ' : active ? '⏳ ' : '  '}stage('{st.label}')
                                    </span>
                                </div>
                            )
                        })}
                        <div style={{ paddingLeft: 12, color: '#f59e0b' }}>{'}'}</div>
                        <div style={{ color: '#f59e0b' }}>{'}'}</div>
                    </div>
                    {s === 'done' && (
                        <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>
                            🎉 Build #47 — SUCCESS — {isTr ? '3 dakika 22 saniye' : '3 minutes 22 seconds'}
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'kafka-flow') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'producing', 'partitioned', 'broker-store', 'consuming', 'done']
            const cur = order.indexOf(s)
            const isConsuming = ['consuming', 'done'].includes(s)

            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Kafka Kavramları' : 'Kafka Concepts'}
                    </div>
                    {[
                        { states: ['producing'], label: isTr ? 'Producer.send(record)' : 'Producer.send(record)', icon: '📤', color: '#f97316' },
                        { states: ['partitioned'], label: isTr ? 'hash(key) % 3 = partition 1' : 'hash(key) % 3 = partition 1', icon: '🔀', color: '#f59e0b' },
                        { states: ['broker-store'], label: isTr ? 'Broker: diske yaz (offset=42)' : 'Broker: write to disk (offset=42)', icon: '💾', color: '#3b82f6' },
                        { states: ['consuming', 'done'], label: isTr ? 'consumer.poll() → offset 42' : 'consumer.poll() → offset 42', icon: '📥', color: '#10b981' },
                        { states: ['done'], label: isTr ? 'commitSync() → offset 43\'e ilerle' : 'commitSync() → advance to offset 43', icon: '✅', color: '#10b981' },
                    ].map((item, i) => {
                        const active = item.states.includes(s) && s !== 'idle'
                        const done = item.states.every(st => order.indexOf(st) < cur) && s !== 'idle'
                        return (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 8px', borderRadius: 6, background: active ? `${item.color}22` : done ? nodeBg : 'transparent', marginBottom: 3, transition: 'all 0.3s' }}>
                                <span style={{ fontSize: 13, opacity: done || active ? 1 : 0.2 }}>{done ? '✅' : item.icon}</span>
                                <code style={{ fontSize: 9.5, color: active ? item.color : done ? subtext : (darkMode ? '#4b5563' : '#d1d5db'), fontWeight: active ? 700 : 400, transition: 'color 0.3s' }}>{item.label}</code>
                            </div>
                        )
                    })}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9.5, color: subtext, lineHeight: 1.6 }}>
                        {isTr ? '☕ Java\'da Kafka ≈ BlockingQueue ama network üzerinden ve dayanıklı' : '☕ Kafka ≈ Java BlockingQueue but over network and durable'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'docker-lifecycle') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'pulling', 'pulled', 'running', 'exec', 'stopping', 'done']
            const cur = order.indexOf(s)
            const info = [
                { label: 'Container ID', value: cur >= order.indexOf('running') ? 'a1b2c3d4e5f6' : '—', color: '#7c3aed' },
                { label: 'Image', value: cur >= order.indexOf('pulled') ? 'nginx:latest' : '—' },
                {
                    label: 'Status', value: cur < order.indexOf('running') ? (s === 'idle' ? '—' : 'Pulling...') : ['running', 'exec'].includes(s) ? 'Up' : s === 'stopping' ? 'Stopping...' : 'Exited (0)',
                    color: ['running', 'exec'].includes(s) ? '#10b981' : s === 'stopping' ? '#f59e0b' : s === 'done' ? '#ef4444' : undefined
                },
                { label: 'Ports', value: cur >= order.indexOf('running') ? '0.0.0.0:8080→80/tcp' : '—', color: '#3b82f6' },
                { label: 'Name', value: cur >= order.indexOf('running') ? 'my-nginx' : '—' },
            ]
            const javaNote = isTr ? 'Java\'da class = Image, new MyClass() = docker run (Container)' : 'Java: class = Image, new MyClass() = docker run (Container)'
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'docker ps çıktısı' : 'docker ps output'}</div>
                    {info.map((row, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, padding: '3px 0', borderBottom: `1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}` }}>
                            <span style={{ fontSize: 10, color: subtext, width: 90, flexShrink: 0 }}>{row.label}</span>
                            <span style={{ fontSize: 10, color: row.color || (darkMode ? '#f3f4f6' : '#111827'), fontWeight: row.color ? 700 : 400 }}>{row.value}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {javaNote}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'api-request') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'building', 'sending', 'server-proc', 'responding', 'testing', 'done']
            const cur = order.indexOf(s)

            const flow = [
                { key: 'building', icon: '📝', label: isTr ? 'İstek hazırlandı (method + headers + body)' : 'Request built (method + headers + body)', color: '#7c3aed' },
                { key: 'sending', icon: '📤', label: isTr ? 'TCP → TLS → HTTP → Sunucuya yolculuk' : 'TCP → TLS → HTTP → Journey to server', color: '#f59e0b' },
                { key: 'server-proc', icon: '⚙️', label: isTr ? 'Auth middleware → Controller → DB' : 'Auth middleware → Controller → DB', color: '#a855f7' },
                { key: 'responding', icon: '📥', label: isTr ? '200 OK + JSON body geri geldi' : '200 OK + JSON body returned', color: '#10b981' },
                { key: 'testing', icon: '🧪', label: isTr ? 'pm.test() assertion\'ları çalışıyor' : 'pm.test() assertions running', color: '#3b82f6' },
                { key: 'done', icon: '✅', label: isTr ? 'Tüm testler geçti!' : 'All tests passed!', color: '#10b981' },
            ]

            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'HTTP İstek-Yanıt Akışı' : 'HTTP Request-Response Flow'}
                    </div>
                    {flow.map((f, i) => {
                        const fIdx = order.indexOf(f.key)
                        const active = fIdx === cur
                        const done = fIdx < cur && s !== 'idle'
                        return (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 8px', borderRadius: 6, background: active ? `${f.color}22` : done ? nodeBg : 'transparent', marginBottom: 3, transition: 'all 0.3s' }}>
                                <span style={{ fontSize: 14, opacity: done || active ? 1 : 0.2 }}>{done ? '✅' : f.icon}</span>
                                <span style={{ fontSize: 10, color: active ? f.color : done ? subtext : (darkMode ? '#4b5563' : '#d1d5db'), fontWeight: active ? 700 : 400, transition: 'color 0.3s' }}>{f.label}</span>
                            </div>
                        )
                    })}
                    {s !== 'idle' && s !== 'building' && (
                        <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontFamily: 'monospace', fontSize: 9.5, color: subtext }}>
                            {isTr ? 'Postman Test Kodu:' : 'Postman Test Code:'}<br />
                            <span style={{ color: '#10b981' }}>{'pm.test("Status 200", () => {'}</span><br />
                            <span style={{ color: '#f3f4f6', paddingLeft: 10 }}>{'pm.response.to.have.status(200);'}</span><br />
                            <span style={{ color: '#10b981' }}>{'})'}</span>
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'k8s-pod') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'kubectl', 'api', 'etcd', 'scheduler', 'pulling', 'running', 'done']
            const cur = order.indexOf(s)

            const isRunning = ['running', 'done'].includes(s)
            const components = [
                { key: 'kubectl', label: 'kubectl CLI', icon: '⌨️', desc: isTr ? 'YAML dosyasını okur' : 'Reads YAML file', color: '#f9fafb' },
                { key: 'api', label: 'API Server', icon: '🔑', desc: isTr ? 'Doğrulama + kabul' : 'Validation + auth', color: '#a78bfa' },
                { key: 'etcd', label: 'etcd', icon: '💾', desc: isTr ? 'İstenen durumu kaydet' : 'Store desired state', color: '#60a5fa' },
                { key: 'scheduler', label: 'Scheduler', icon: '📅', desc: isTr ? 'Node seç' : 'Pick a node', color: '#f59e0b' },
                { key: 'pulling', label: 'Node kubelet', icon: '📥', desc: isTr ? 'Image çek' : 'Pull image', color: '#fb923c' },
                { key: 'running', label: 'Pod', icon: '🐳', desc: isTr ? 'Container çalışıyor' : 'Container running', color: '#10b981' },
            ]

            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Cluster Bileşenleri' : 'Cluster Components'}
                    </div>
                    {components.map((c, i) => {
                        const cIdx = order.indexOf(c.key)
                        const active = cIdx === cur
                        const done = cIdx < cur && s !== 'idle'
                        return (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 8px', borderRadius: 6, background: active ? `${c.color}22` : done ? nodeBg : 'transparent', marginBottom: 3, border: `1.5px solid ${active ? c.color : 'transparent'}`, transition: 'all 0.4s' }}>
                                <span style={{ fontSize: 13, opacity: done || active ? 1 : 0.2, flexShrink: 0 }}>{done ? '✅' : c.icon}</span>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: active ? c.color : done ? (darkMode ? '#d1d5db' : '#374151') : subtext, transition: 'color 0.3s' }}>{c.label}</div>
                                    <div style={{ fontSize: 9, color: subtext }}>{c.desc}</div>
                                </div>
                            </div>
                        )
                    })}
                    {isRunning && (
                        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10 }}>
                            <div style={{ color: '#10b981', fontWeight: 700 }}>kubectl get pods</div>
                            <div style={{ color: '#d1fae5', fontFamily: 'monospace', fontSize: 9.5 }}>
                                NAME               READY  STATUS   RESTARTS<br />
                                my-nginx-6d8f9     1/1    Running  0
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'pw-autowait') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const s = simState
            const stateOrder = ['idle', 'c-dom', 'c-visible', 'c-stable', 'c-events', 'c-enabled', 'executing', 'done']
            const curIdx = stateOrder.indexOf(s)
            const checks = [
                { key: 'c-dom', label: isTr ? 'DOM\'a ekli (attached)?' : 'Attached to DOM?', col: '#f59e0b' },
                { key: 'c-visible', label: isTr ? 'Görünür (visible)?' : 'Visible?', col: '#f59e0b' },
                { key: 'c-stable', label: isTr ? 'Stabil (animasyon yok)?' : 'Stable (not animating)?', col: '#f59e0b' },
                { key: 'c-events', label: isTr ? 'Pointer event alıyor?' : 'Receives pointer events?', col: '#f59e0b' },
                { key: 'c-enabled', label: isTr ? 'Enabled mi?' : 'Is enabled?', col: '#f59e0b' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Actionability Checks' : 'Actionability Checks'}
                    </div>
                    {checks.map((ch, i) => {
                        const checkIdx = stateOrder.indexOf(ch.key)
                        const isPending = curIdx === checkIdx && s !== 'idle'
                        const isPassed = curIdx > checkIdx && s !== 'idle'
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '5px 8px', borderRadius: 6, marginBottom: 3,
                                background: isPassed ? '#10b98118' : isPending ? '#f59e0b18' : 'transparent',
                                transition: 'background 0.3s',
                            }}>
                                <span style={{ fontSize: 13, minWidth: 16, textAlign: 'center', transition: 'all 0.3s' }}>
                                    {isPassed ? '✅' : isPending ? '🔍' : '○'}
                                </span>
                                <span style={{ fontSize: 11, color: isPassed ? '#10b981' : isPending ? '#f59e0b' : subtext, fontWeight: isPassed || isPending ? 700 : 400, transition: 'color 0.3s' }}>
                                    {ch.label}
                                </span>
                            </div>
                        )
                    })}
                    <div style={{ marginTop: 10, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext }}>
                        {s === 'idle' && <span>{isTr ? 'Henüz başlamadı...' : 'Not started yet...'}</span>}
                        {s.startsWith('c-') && <span style={{ color: '#f59e0b' }}>⏳ {isTr ? 'Polling (her 100ms kontrol)...' : 'Polling (checking every 100ms)...'}</span>}
                        {s === 'executing' && <span style={{ color: '#10b981', fontWeight: 700 }}>⚡ {isTr ? 'Tüm checkler geçti → click() yürütülüyor' : 'All checks passed → executing click()'}</span>}
                        {s === 'done' && <span style={{ color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'click() tamamlandı! (ekstra wait yazılmadı)' : 'click() complete! (no extra wait needed)'}</span>}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'multi-window') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const nodeText = darkMode ? '#f3f4f6' : '#1f2937'
            const s = simState
            const handles = ['CDwindow-a1b2', 'CDwindow-c3d4']
            const mainActive = !['new-tab-open', 'in-new', 'closing'].includes(s) || ['back-main', 'done'].includes(s)
            const newActive = ['new-tab-open', 'in-new', 'closing'].includes(s)
            const newClosed = ['closing', 'back-main', 'done'].includes(s)
            const steps = [
                { states: ['clicking'], label: `driver.getWindowHandle()`, color: '#f59e0b', extra: `// → "${handles[0]}"` },
                { states: ['collecting'], label: `driver.getWindowHandles()`, color: '#f59e0b', extra: `// → {${handles[0]}, ${handles[1]}}` },
                { states: ['switching', 'new-tab-open'], label: `switchTo().window("${handles[1]}")`, color: accent, extra: isTr ? `// yeni sekmeye geç` : `// switch to the new tab` },
                { states: ['in-new'], label: `driver.getTitle()`, color: '#3b82f6', extra: isTr ? `// → "API Dokümantasyonu"` : `// → "API Documentation"` },
                { states: ['closing'], label: `driver.close()`, color: '#ef4444', extra: isTr ? `// yeni sekmeyi kapat` : `// close the new tab` },
                { states: ['back-main', 'done'], label: `switchTo().window("${handles[0]}")`, color: '#10b981', extra: isTr ? `// ana sekmeye dön` : `// return to the main tab` },
            ]
            const activeStates = ['clicking', 'collecting', 'switching', 'new-tab-open', 'in-new', 'closing', 'back-main', 'done']
            const curIdx = activeStates.indexOf(s)
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Çalışan Komut' : 'Current Command'}
                    </div>
                    {steps.map((st, i) => {
                        const active = st.states.some(ss => activeStates.indexOf(ss) <= curIdx && s !== 'idle')
                        return (
                            <div key={i} style={{ marginBottom: 4, padding: '5px 8px', borderRadius: 6, background: active ? `${st.color}20` : nodeBg, transition: 'all 0.3s' }}>
                                <code style={{ fontSize: 10, color: active ? st.color : subtext, fontWeight: active ? 700 : 400, display: 'block' }}>{st.label}</code>
                                <code style={{ fontSize: 9, color: subtext, opacity: active ? 1 : 0.4 }}>{st.extra}</code>
                            </div>
                        )
                    })}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.8, color: nodeText }}>
                        <div>WindowHandles set:</div>
                        {handles.map((h, i) => (
                            <div key={i} style={{ paddingLeft: 10, color: (i === 0 ? !newActive || ['back-main', 'done'].includes(s) : newActive) ? accent : subtext, transition: 'color 0.3s' }}>
                                {i === 0 ? '🏠' : newClosed ? '❌' : '📄'} "{h}" {i === 0 ? (isTr ? '← main' : '← main') : (newClosed ? (isTr ? '(kapatıldı)' : '(closed)') : '')}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'alert-sim') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const nodeText = darkMode ? '#f3f4f6' : '#1f2937'

            const steps = [
                { states: ['alert-open', 'alert-done'], code: isTr ? `Alert alert = wait.until(\n  alertIsPresent());\nalert.getText(); // → "Kayıt..."` : `Alert alert = wait.until(\n  alertIsPresent());\nalert.getText(); // → "Record..."`, icon: '⚠️', label: isTr ? 'Alert' : 'Alert' },
                { states: ['confirm-open', 'confirm-ok', 'confirm-cancel'], code: `Alert confirm = wait.until(\n  alertIsPresent());\nconfirm.accept();   // OK\n// confirm.dismiss(); // Cancel`, icon: '❓', label: isTr ? 'Confirm' : 'Confirm' },
                { states: ['prompt-open', 'prompt-done', 'done'], code: `Alert prompt = wait.until(\n  alertIsPresent());\nprompt.sendKeys("testuser");\nprompt.accept();`, icon: '📝', label: 'Prompt' },
            ]
            const resultNote =
                simState === 'confirm-cancel' ? (isTr ? '→ dismiss() → İptal edildi' : '→ dismiss() → Cancelled') :
                    simState === 'confirm-ok' ? (isTr ? '→ accept() → Onaylandı' : '→ accept() → Confirmed') :
                        simState === 'prompt-done' || simState === 'done' ? (isTr ? '→ "testuser" girildi + accept()' : '→ "testuser" typed + accept()') : ''

            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'Selenium Kodu — Şu An' : 'Selenium Code — Current Step'}
                    </div>
                    {steps.map((step, i) => {
                        const active = step.states.includes(simState)
                        return (
                            <div key={i} style={{ marginBottom: 8, padding: '8px 10px', borderRadius: 8, background: active ? `${accent}22` : nodeBg, border: `1.5px solid ${active ? accent : 'transparent'}`, transition: 'all 0.3s' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: active ? accent : subtext, marginBottom: 4 }}>{step.icon} {step.label}</div>
                                <pre style={{ fontSize: 9.5, margin: 0, color: active ? nodeText : subtext, lineHeight: 1.5, opacity: active ? 1 : 0.5, fontFamily: 'monospace' }}>{step.code}</pre>
                            </div>
                        )
                    })}
                    {resultNote && (
                        <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginTop: 6, padding: '4px 8px', background: '#10b98118', borderRadius: 6 }}>
                            {resultNote}
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'drag-drop') {
            const stateOrder = ['idle', 'picking', 'dragging', 'over', 'dropped', 'done']
            const curIdx = stateOrder.indexOf(simState)
            const evts = [
                { state: 'picking', ev: 'dragstart', el: 'dragSource', color: accent },
                { state: 'dragging', ev: 'drag', el: 'dragSource', color: accent },
                { state: 'over', ev: 'dragenter', el: 'dropTarget', color: '#f59e0b' },
                { state: 'over', ev: 'dragover', el: 'dropTarget', color: '#f59e0b' },
                { state: 'dropped', ev: 'drop', el: 'dropTarget', color: '#10b981' },
                { state: 'done', ev: 'dragend', el: 'dragSource', color: '#6b7280' },
            ]
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const nodeText = darkMode ? '#f3f4f6' : '#1f2937'
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isTr ? 'DOM Olayları (Events)' : 'DOM Events fired'}
                    </div>
                    {evts.map((e, i) => {
                        const fired = simState !== 'idle' && stateOrder.indexOf(e.state) <= curIdx
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '4px 8px', borderRadius: 6,
                                background: fired ? `${e.color}22` : 'transparent',
                                marginBottom: 3, transition: 'background 0.3s',
                            }}>
                                <span style={{ fontSize: 12, opacity: fired ? 1 : 0.25 }}>{fired ? '🔥' : '○'}</span>
                                <code style={{ fontSize: 11, color: fired ? e.color : subtext, fontWeight: fired ? 700 : 400, transition: 'color 0.3s' }}>{e.ev}</code>
                                <span style={{ fontSize: 10, color: subtext }}>→ #{e.el}</span>
                            </div>
                        )
                    })}
                    <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontFamily: 'monospace', fontSize: 10, lineHeight: 1.7 }}>
                        <span style={{ color: '#f59e0b' }}>&lt;div </span>
                        <span style={{ color: nodeText }}>id="dragSource" </span>
                        <span style={{ color: simState !== 'idle' ? '#10b981' : '#ef4444', fontWeight: 700 }}>draggable="true"</span>
                        <span style={{ color: '#f59e0b' }}>&gt;</span>
                        <div style={{ paddingLeft: 14, color: subtext, fontSize: 10 }}>
                            {isTr ? '/* zorunlu attribute */' : '/* required attribute */'}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'implicit-wait') {
            const isNoFail = simState === 'no-fail'
            const isWithRetry = simState === 'with-retry'
            const isWithFound = simState === 'with-found'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: 8, fontFamily: 'sans-serif' }}>
                        {isTr ? '⏱ Zaman Çizelgesi' : '⏱ Timeline'}
                    </div>
                    {[
                        { t: '0s', label: isTr ? 'findElement() çağrıldı' : 'findElement() called', active: simState !== 'idle' },
                        { t: '~0s', label: isNoFail ? (isTr ? 'NoSuchElementException! ❌' : 'NoSuchElementException! ❌') : isWithRetry || isWithFound ? (isTr ? 'DOM tarıyor... 🔄' : 'Scanning DOM... 🔄') : '—', error: isNoFail, active: isNoFail || isWithRetry || isWithFound },
                        { t: '~2s', label: isWithFound ? (isTr ? 'Element bulundu! ✅' : 'Element found! ✅') : '—', success: isWithFound, active: isWithFound },
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                            <div style={{ width: 28, flexShrink: 0, color: item.error ? '#ef4444' : item.success ? '#10b981' : (darkMode ? '#6b7280' : '#9ca3af'), fontWeight: 700, paddingTop: 3 }}>{item.t}</div>
                            <div style={{ flex: 1, padding: '3px 7px', borderRadius: 4, background: item.error ? '#ef444422' : item.success ? '#10b98122' : (item.active ? `${accent}22` : 'transparent'), border: `1px solid ${item.error ? '#ef4444' : item.success ? '#10b981' : (item.active ? accent : (darkMode ? '#374151' : '#e5e7eb'))}44`, color: item.error ? '#ef4444' : item.success ? '#10b981' : (darkMode ? '#9ca3af' : '#6b7280'), opacity: item.active ? 1 : 0.4, transition: 'all 0.4s' }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: accent, fontWeight: 700 }}>{isTr ? '📖 Fark Nedir?' : '📖 Key Difference:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.5 }}>
                            {isTr ? 'Implicit Wait, tüm findElement() çağrılarına global uygulanır. Koşul bazlı değil, sadece süre bazlıdır.' : 'Implicit Wait applies globally to all findElement() calls. Time-based only, not condition-based.'}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'iframe-detection') {
            const phase = simState
            const isFound = ['found', 'switching', 'inside'].includes(phase)
            const isSwitching = phase === 'switching'
            const isInside = phase === 'inside'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🗂 DOM Ağacı — iframe Konumları' : '🗂 DOM Tree — iframe Locations'}
                    </div>
                    {/* DOM tree */}
                    {[
                        { tag: '<html>', level: 0 },
                        { tag: '  <body>', level: 1 },
                        { tag: '    <div id="app">  ← Normal DOM', level: 2, normal: true },
                        { tag: '    <iframe src="stripe.com">  ← 💳 iframe[0]', level: 2, color: '#f59e0b', active: isFound, found: isInside },
                        { tag: '    <iframe src="youtube.com"> ← 🎬 iframe[1]', level: 2, color: '#3b82f6', active: isFound && !isInside },
                        { tag: '  </body>', level: 1 },
                    ].map((n, idx) => (
                        <div key={idx} style={{
                            paddingLeft: n.level * 10 + 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2,
                            borderRadius: 3, marginBottom: 2,
                            background: n.found ? '#10b98122' : n.active ? `${n.color || accent}22` : 'transparent',
                            border: (n.active || n.found) ? `1px solid ${n.found ? '#10b981' : n.color || accent}44` : '1px solid transparent',
                            color: n.found ? '#10b981' : n.active ? (n.color || accent) : n.normal ? (darkMode ? '#60a5fa' : '#2563eb') : (darkMode ? '#9ca3af' : '#6b7280'),
                            fontWeight: (n.active || n.found) ? 700 : 400,
                            transition: 'all 0.4s',
                        }}>
                            {n.tag}
                            {n.found && <span style={{ marginLeft: 4, fontSize: 9 }}>{isTr ? '← driver burada şimdi!' : '← driver is here now!'}</span>}
                        </div>
                    ))}

                    {/* Status messages */}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${accent}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: accent, fontWeight: 700 }}>{isTr ? '🤖 Driver Durumu:' : '🤖 Driver Status:'}</div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.6 }}>
                            {phase === 'idle' ? (isTr ? '⏸ Hazır — Tarama başlatılmadı' : '⏸ Ready — No scan yet') :
                                phase === 'scanning' ? (isTr ? '🔍 driver.findElements(By.tagName("iframe"))' : '🔍 driver.findElements(By.tagName("iframe"))') :
                                    phase === 'found' ? (isTr ? '✅ 2 iframe bulundu!\niframe[0]: Stripe, iframe[1]: YouTube' : '✅ 2 iframes found!\niframe[0]: Stripe, iframe[1]: YouTube') :
                                        phase === 'switching' ? 'driver.switchTo().frame(0)' :
                                            (isTr ? '✅ İçindeyiz! iframe[0] context\'i aktif.\nArtık iframe içindeki elementleri bulabiliriz.' : '✅ Inside! iframe[0] context active.\nNow we can find elements inside the iframe.')}
                        </div>
                    </div>

                    {/* Key insight */}
                    {isInside && (
                        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#10b98122', border: '1px solid #10b98144', animation: 'simFadeUp 0.4s', fontFamily: 'sans-serif' }}>
                            <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 3 }}>💡 {isTr ? 'Altın Kural:' : 'Golden Rule:'}</div>
                            <div style={{ color: darkMode ? '#6ee7b7' : '#065f46', fontSize: 9, lineHeight: 1.5 }}>
                                {isTr ? 'İşin bitince mutlaka switchTo().defaultContent() çağır! Yoksa diğer elementler "not found" verir.' : 'Always call switchTo().defaultContent() when done! Otherwise other elements give "not found".'}
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'shadow-dom-xray') {
            const phase = simState
            const isFailing = phase === 'fail'
            const isXray = phase === 'xray'
            const isExposed = phase === 'exposed'
            const isPierced = phase === 'pierced'
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🔬 Shadow DOM Katmanları' : '🔬 Shadow DOM Layers'}
                    </div>

                    {[
                        { tag: '<body>', level: 0 },
                        { tag: '  <input id="username">', level: 1, normal: true, desc: isTr ? '← Normal DOM ✅' : '← Normal DOM ✅' },
                        { tag: '  <my-password-input>', level: 1, host: true },
                        { tag: '    #shadow-root (open)', level: 2, root: true, show: isXray || isExposed || isPierced },
                        { tag: '      <style>...</style>', level: 3, inner: true, show: isExposed || isPierced },
                        { tag: '      <input id="pwd">', level: 3, target: true, show: isExposed || isPierced, found: isPierced },
                        { tag: '  </my-password-input>', level: 1, host: true },
                    ].filter(n => n.show !== false).map((n, idx) => (
                        <div key={idx} style={{
                            paddingLeft: n.level * 12 + 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2,
                            borderRadius: 3, marginBottom: 2,
                            animation: (n.root || n.inner || n.target) ? 'simFadeUp 0.3s' : 'none',
                            background: n.found ? '#10b98122' : n.root ? '#a78bfa11' : n.target ? '#a78bfa11' : 'transparent',
                            border: n.found ? '1px solid #10b98144' : (n.root || n.target) ? '1px solid #a78bfa33' : '1px solid transparent',
                            color: n.found ? '#10b981' : n.normal ? (darkMode ? '#60a5fa' : '#2563eb') : n.host ? (isFailing ? '#ef4444' : '#a78bfa') : n.root ? '#f59e0b' : n.target ? (darkMode ? '#d1d5db' : '#374151') : (darkMode ? '#6b7280' : '#9ca3af'),
                            fontWeight: (n.found || n.root) ? 700 : 400,
                            transition: 'all 0.4s',
                        }}>
                            {n.tag}
                            {n.normal && <span style={{ opacity: 0.7 }}> {n.desc}</span>}
                            {n.host && isFailing && <span style={{ color: '#ef4444', marginLeft: 4, fontSize: 9 }}>← girilemiyor!</span>}
                            {n.host && isXray && <span style={{ color: '#f59e0b', marginLeft: 4, fontSize: 9 }}>← .shadowRoot</span>}
                            {n.found && <span style={{ marginLeft: 4, fontSize: 9 }}>← getShadowRoot().findElement() ✅</span>}
                        </div>
                    ))}

                    {/* Status */}
                    <div style={{ marginTop: 10, padding: '6px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#f8fafc', border: `1px dashed ${isFailing ? '#ef4444' : isPierced ? '#10b981' : '#a78bfa'}33`, fontFamily: 'sans-serif' }}>
                        <div style={{ color: isFailing ? '#ef4444' : isPierced ? '#10b981' : '#a78bfa', fontWeight: 700 }}>
                            {isFailing ? (isTr ? '❌ Hata:' : '❌ Error:') : isPierced ? (isTr ? '✅ Başarı:' : '✅ Success:') : (isTr ? '🕶 X-Ray Modu:' : '🕶 X-Ray Mode:')}
                        </div>
                        <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginTop: 2, lineHeight: 1.6 }}>
                            {phase === 'idle' ? (isTr ? '⏸ Hazır. Bir yöntem seç.' : '⏸ Ready. Choose a method.') :
                                isFailing ? (isTr ? 'NoSuchElementException:\ndriver.findElement(By.id("pwd"))\n→ Shadow DOM içindeki elemente erişilemiyor!' : 'NoSuchElementException:\ndriver.findElement(By.id("pwd"))\n→ Cannot access the element inside Shadow DOM!') :
                                    isXray ? (isTr ? 'shadowHost.getShadowRoot() çağrıldı...' : 'shadowHost.getShadowRoot() called...') :
                                        isExposed ? (isTr ? '#shadow-root açıldı! İçerideki elementler görünür.' : '#shadow-root open! Inner elements visible.') :
                                            (isTr ? 'shadowRoot.findElement(By.css("input#pwd")) → ✅' : 'shadowRoot.findElement(By.css("input#pwd")) → ✅')}
                        </div>
                    </div>
                </div>
            )
        }

        if (block.scenario === 'shadow-dom') {
            return (
                <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <div style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'sans-serif', marginBottom: 8 }}>
                        {isTr ? '🔬 DOM Erişim Katmanları' : '🔬 DOM Access Layers'}
                    </div>
                    {[
                        { label: 'Document', desc: 'querySelector() — normal DOM', active: true, layer: 0 },
                        { label: 'Shadow Host', desc: '<my-custom-button>', active: simState === 'host' || simState === 'root' || simState === 'target', layer: 1 },
                        { label: 'Shadow Root', desc: '.shadowRoot property', active: simState === 'root' || simState === 'target', layer: 2 },
                        { label: 'Target Element', desc: '.inner-btn → CLICK ✅', active: simState === 'target', layer: 3, success: simState === 'target' },
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                            <span style={{ color: item.active ? accent : (darkMode ? '#374151' : '#e5e7eb'), paddingLeft: item.layer * 10, flexShrink: 0 }}>{idx > 0 ? '↳' : '▸'}</span>
                            <div style={{ flex: 1, padding: '3px 8px', borderRadius: 4, background: item.success ? '#10b98122' : (item.active ? `${accent}22` : (darkMode ? '#1f2937' : '#f9fafb')), border: `1px solid ${item.success ? '#10b981' : item.active ? accent : (darkMode ? '#374151' : '#e5e7eb')}44`, color: item.success ? '#10b981' : (item.active ? (darkMode ? '#e5e7eb' : '#111827') : (darkMode ? '#4b5563' : '#9ca3af')), fontWeight: item.active ? 600 : 400, transition: 'all 0.4s' }}>
                                <span style={{ fontWeight: 700 }}>{item.label}</span>
                                <span style={{ opacity: 0.7, marginLeft: 4 }}>— {item.desc}</span>
                            </div>
                        </div>
                    ))}
                    {simState === 'target' && (
                        <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: '#10b98122', border: '1px solid #10b98144', color: '#10b981', animation: 'simFadeUp 0.4s', fontFamily: 'sans-serif', fontSize: 10 }}>
                            ✅ {isTr ? 'Shadow DOM başarıyla geçildi! Element bulundu.' : 'Shadow DOM pierced! Element found and clicked.'}
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'appium-element-detection') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'connecting', 'scanning', 'tree-built', 'selected', 'locator-ready', 'done']
            const cur = order.indexOf(s)
            const caps = [
                { key: '"platformName"', val: '"Android"' },
                { key: '"deviceName"', val: '"Pixel_7_API34"' },
                { key: '"appium:app"', val: '"path/to/app.apk"' },
                { key: '"appium:automationName"', val: '"UiAutomator2"' },
                { key: '"appium:appPackage"', val: '"com.example.app"', highlight: true },
                { key: '"appium:appActivity"', val: '".LoginActivity"', highlight: true },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Desired Capabilities</div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.9, marginBottom: 10 }}>
                        <div style={{ color: '#f59e0b' }}>{'{'}</div>
                        {caps.map((cap, i) => {
                            const active = s !== 'idle' && cap.highlight && cur >= order.indexOf('tree-built')
                            return (
                                <div key={i} style={{ paddingLeft: 10, color: active ? '#7c3aed' : (darkMode ? '#a6accd' : '#374151'), fontWeight: active ? 700 : 400, transition: 'color 0.4s' }}>
                                    <span style={{ color: active ? '#ffd66e' : '#10b981' }}>{cap.key}</span>
                                    <span style={{ color: subtext }}>{': '}</span>
                                    <span style={{ color: '#ef4444' }}>{cap.val}</span>
                                </div>
                            )
                        })}
                        <div style={{ color: '#f59e0b' }}>{'}'}</div>
                    </div>
                    {cur >= order.indexOf('selected') && (
                        <div style={{ padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ color: '#7c3aed', fontWeight: 700, marginBottom: 4, fontFamily: 'sans-serif', fontSize: 9 }}>🎯 {isTr ? 'Seçili Element:' : 'Selected Element:'}</div>
                            <div style={{ fontFamily: 'monospace', lineHeight: 1.8 }}>
                                <div style={{ color: subtext }}>bounds: <span style={{ color: '#f59e0b' }}>[0,420][1080,560]</span></div>
                                <div style={{ color: subtext }}>resource-id: <span style={{ color: '#10b981' }}>com.example:id/et_email</span></div>
                                <div style={{ color: subtext }}>content-desc: <span style={{ color: '#3b82f6' }}>"Email input"</span></div>
                                <div style={{ color: subtext }}>enabled: <span style={{ color: '#f59e0b' }}>true</span></div>
                            </div>
                        </div>
                    )}
                    {s !== 'idle' && (
                        <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                            ☕ {isTr ? 'Java\'da AppiumBy.id() tıpkı Selenium\'un By.id() gibidir — aynı API, farklı platform.' : 'Java: AppiumBy.id() works just like Selenium\'s By.id() — same API, different platform.'}
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'appium-swipe') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'touch-start', 'swiping', 'scrolled', 'new-item', 'done']
            const cur = order.indexOf(s)
            const events = [
                { state: 'touch-start', text: '.pointerDown(540, 1600)', color: '#f59e0b' },
                { state: 'swiping', text: '.move(540, 1200)', color: '#7c3aed' },
                { state: 'swiping', text: '.move(540, 800)', color: '#7c3aed' },
                { state: 'scrolled', text: '.pointerUp(540, 400)', color: '#10b981' },
                { state: 'done', text: '.perform()  ✅', color: '#10b981' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>W3C Actions API</div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.9, marginBottom: 10 }}>
                        {s === 'idle' && <div style={{ color: subtext }}>{isTr ? '// ▶ Swipe\'a bas...' : '// Press ▶ Swipe...'}</div>}
                        {cur >= order.indexOf('touch-start') && (
                            <div style={{ color: '#3b82f6' }}>new PointerInput(<span style={{ color: '#10b981' }}>"finger"</span>)</div>
                        )}
                        {events.map((ev, i) => {
                            const evIdx = order.indexOf(ev.state)
                            const show = evIdx <= cur && s !== 'idle'
                            return show ? (
                                <div key={i} style={{ paddingLeft: 8, color: ev.color, animation: evIdx === cur ? 'simFadeUp 0.3s' : undefined }}>{ev.text}</div>
                            ) : null
                        })}
                    </div>
                    {cur >= order.indexOf('touch-start') && (
                        <div style={{ padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: subtext, fontWeight: 700, marginBottom: 4 }}>📐 {isTr ? 'Ekran Koordinatları:' : 'Screen Coordinates:'}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace', fontSize: 9 }}>
                                <span style={{ color: '#f59e0b' }}>startY: 1600</span>
                                <span style={{ color: subtext }}>→</span>
                                <span style={{ color: '#10b981' }}>endY: 400</span>
                            </div>
                            <div style={{ marginTop: 6, position: 'relative', height: 50, background: darkMode ? '#0f172a' : '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 2, height: '100%', background: `${accent}33` }} />
                                <div style={{ position: 'absolute', left: '50%', bottom: 6, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px #f59e0b88' }} />
                                {cur >= order.indexOf('scrolled') && <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b98188', animation: 'simFadeUp 0.4s' }} />}
                            </div>
                        </div>
                    )}
                    {s === 'done' && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'Liste 2 ürün kaydırıldı!' : 'List scrolled by 2 items!'}</div>}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                        ☕ {isTr ? 'Java\'da Actions.clickAndHold().moveByOffset() ≈ Appium PointerInput.move() — aynı W3C protokolü.' : 'Java Actions.clickAndHold().moveByOffset() ≈ Appium PointerInput.move() — same W3C protocol.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'browserstack-cloud-run') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'starting', 'connecting', 'provisioning', 'running', 'done']
            const cur = order.indexOf(s)
            const statusInfo =
                cur < order.indexOf('provisioning') ? { label: isTr ? 'Bekleniyor' : 'Queued', color: subtext } :
                    cur < order.indexOf('done') ? { label: isTr ? 'Çalışıyor' : 'Running', color: '#f59e0b' } :
                        { label: isTr ? 'Geçti ✓' : 'Passed ✓', color: '#10b981' }
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        BrowserStack Automate Dashboard
                    </div>
                    {cur < order.indexOf('provisioning') ? (
                        <div style={{ padding: '14px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, textAlign: 'center' }}>
                            {isTr ? 'Henüz oturum yok — testi başlat' : 'No session yet — start the test'}
                        </div>
                    ) : (
                        <div style={{ padding: 10, borderRadius: 8, background: darkMode ? '#0f172a' : '#fff', border: `1px solid ${darkMode ? '#1f2937' : '#e5e7eb'}`, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: darkMode ? '#f3f4f6' : '#111827' }}>test_login_page</span>
                                <span style={{ fontSize: 9, fontWeight: 700, color: statusInfo.color, padding: '2px 8px', borderRadius: 99, background: `${statusInfo.color}18` }}>{statusInfo.label}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 10, fontSize: 9, color: subtext, marginBottom: 6 }}>
                                <span>🌐 Chrome 122</span>
                                <span>🖥️ Windows 11</span>
                            </div>
                            <div style={{ fontSize: 9, color: subtext, marginBottom: 6 }}>
                                Session: <span style={{ color: '#fc6620' }}>a1b2c3d4</span>
                            </div>
                            {cur >= order.indexOf('running') && (
                                <div style={{ height: 50, borderRadius: 6, background: darkMode ? '#1f2937' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: subtext, marginBottom: 6 }}>
                                    {cur >= order.indexOf('done') ? '🎥 ' + (isTr ? 'Video kaydı hazır' : 'Video recording ready') : '📡 ' + (isTr ? 'Canlı akış...' : 'Live streaming...')}
                                </div>
                            )}
                            {cur >= order.indexOf('done') && (
                                <div style={{ fontSize: 9, color: '#10b981', fontWeight: 700 }}>
                                    ✅ {isTr ? 'Süre: 4.2s — Network log + Console log kaydedildi' : 'Duration: 4.2s — Network log + Console log saved'}
                                </div>
                            )}
                        </div>
                    )}
                    {s !== 'idle' && (
                        <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                            ☕ {isTr ? 'Java\'da Selenium Grid\'de RemoteWebDriver ile bağlandığınız hub, burada hub.browserstack.com\'dur — aynı protokol.' : 'In Java, the hub you connect to via RemoteWebDriver on Selenium Grid is hub.browserstack.com here — same protocol.'}
                        </div>
                    )}
                </div>
            )
        }

        if (block.scenario === 'aws-codepipeline') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'source', 'install', 'test', 'deploy', 'done']
            const cur = order.indexOf(s)
            const cwLines = [
                { state: 'source', text: 'CodePipeline: state changed to STARTED' },
                { state: 'install', text: 'CodeBuild: phase INSTALL → IN_PROGRESS' },
                { state: 'test', text: 'CodeBuild: phase BUILD → IN_PROGRESS' },
                { state: 'deploy', text: 'CodeBuild: phase POST_BUILD → IN_PROGRESS' },
                { state: 'done', text: 'CodePipeline: state changed to SUCCEEDED' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        CloudWatch & S3
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontFamily: 'monospace', fontSize: 9, lineHeight: 1.9, marginBottom: 10, minHeight: 80 }}>
                        {s === 'idle' && <div style={{ color: subtext }}>{isTr ? '// CloudWatch log akışı bekleniyor...' : '// Waiting for CloudWatch log stream...'}</div>}
                        {cwLines.map((ln, i) => {
                            const show = order.indexOf(ln.state) <= cur && s !== 'idle'
                            return show ? (
                                <div key={i} style={{ color: order.indexOf(ln.state) === cur ? '#ec7211' : subtext, animation: order.indexOf(ln.state) === cur ? 'simFadeUp 0.3s' : undefined }}>{ln.text}</div>
                            ) : null
                        })}
                    </div>
                    {cur >= order.indexOf('deploy') && (
                        <div style={{ padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: subtext, fontWeight: 700, marginBottom: 4 }}>🪣 {isTr ? 'S3 Bucket: my-qa-reports' : 'S3 Bucket: my-qa-reports'}</div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981' }}>
                                latest/index.html <span style={{ color: subtext }}>(248 KB)</span>
                            </div>
                        </div>
                    )}
                    {s === 'done' && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'Pipeline başarıyla tamamlandı!' : 'Pipeline completed successfully!'}</div>}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                        ☕ {isTr ? 'Java\'da Jenkinsfile içindeki stage bloklarını nasıl tanımlıyorsan, AWS\'te de aynısını buildspec.yml içindeki phases ile tanımlarsın.' : 'Just like you define stage blocks in a Jenkinsfile in Java projects, AWS uses the phases section in buildspec.yml for the same purpose.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'azure-devops-pipeline') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'source', 'install', 'test', 'publish', 'done']
            const cur = order.indexOf(s)
            const tasks = [
                { state: 'source', text: 'Trigger', },
                { state: 'install', text: 'NodeTool@0' },
                { state: 'install', text: 'npm ci / playwright install' },
                { state: 'test', text: 'playwright test' },
                { state: 'publish', text: 'PublishTestResults@2' },
                { state: 'done', text: 'PublishPipelineArtifact@1' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Azure Pipelines — Run #142
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: 6, background: darkMode ? '#0f172a' : '#fff', fontSize: 9.5, marginBottom: 10, minHeight: 90 }}>
                        {s === 'idle' && <div style={{ color: subtext }}>{isTr ? 'Henüz task çalışmadı — pipeline\'ı tetikle' : 'No tasks run yet — trigger the pipeline'}</div>}
                        {tasks.map((t, i) => {
                            const tIdx = order.indexOf(t.state)
                            const dn = tIdx < cur && s !== 'idle'
                            const act = tIdx === cur
                            if (s === 'idle') return null
                            if (tIdx > cur) return null
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', color: dn ? '#10b981' : act ? '#0078d4' : subtext, animation: act ? 'simFadeUp 0.3s' : undefined }}>
                                    <span>{dn ? '✓' : act ? '⏳' : '○'}</span>
                                    <span style={{ fontFamily: 'monospace' }}>{t.text}</span>
                                </div>
                            )
                        })}
                    </div>
                    {cur >= order.indexOf('done') && (
                        <div style={{ padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: subtext, fontWeight: 700, marginBottom: 4 }}>📦 {isTr ? 'Pipeline Artifacts' : 'Pipeline Artifacts'}</div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981' }}>
                                playwright-html-report <span style={{ color: subtext }}>(312 KB)</span>
                            </div>
                        </div>
                    )}
                    {s === 'done' && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'Pipeline başarıyla tamamlandı!' : 'Pipeline completed successfully!'}</div>}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                        ☕ {isTr ? 'Java\'da Jenkins\'in Maven Surefire/JUnit raporlarını okuması gibi, PublishTestResults@2 task\'ı da JUnit XML çıktısını okuyup Azure DevOps arayüzünde gösterir.' : 'Just like Jenkins reads Maven Surefire/JUnit reports in Java projects, the PublishTestResults@2 task reads the JUnit XML output and displays it in the Azure DevOps UI.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'vitest-runner') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'collecting', 't1', 't2', 't3', 'done']
            const cur = order.indexOf(s)
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 {isTr ? 'Test Özeti' : 'Test Summary'}
                    </div>
                    {cur < order.indexOf('done') && <div style={{ fontSize: 9.5, color: subtext }}>{isTr ? 'Bekleniyor...' : 'Waiting...'}</div>}
                    {cur >= order.indexOf('done') && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 }}>
                            <div style={{ padding: '6px', borderRadius: 6, textAlign: 'center', background: '#a9d23318', border: '1px solid #a9d23355' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#729b1e' }}>3/3</div>
                                <div style={{ fontSize: 8.5, color: '#729b1e' }}>{isTr ? 'Geçti' : 'Passed'}</div>
                            </div>
                            <div style={{ padding: '6px', borderRadius: 6, textAlign: 'center', background: nodeBg }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: subtext }}>1</div>
                                <div style={{ fontSize: 8.5, color: subtext }}>{isTr ? 'Dosya' : 'File'}</div>
                            </div>
                            <div style={{ padding: '6px', borderRadius: 6, textAlign: 'center', background: nodeBg }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: subtext }}>312ms</div>
                                <div style={{ fontSize: 8.5, color: subtext }}>{isTr ? 'Süre' : 'Duration'}</div>
                            </div>
                        </div>
                    )}
                    {cur >= order.indexOf('done') && (
                        <div style={{ padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: subtext, fontWeight: 700, marginBottom: 4 }}>📁 coverage/index.html</div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981' }}>
                                {isTr ? 'oluşturuldu' : 'generated'} <span style={{ color: subtext }}>— % Stmts: 100, % Funcs: 100</span>
                            </div>
                        </div>
                    )}
                    {s === 'done' && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'Tüm testler geçti!' : 'All tests passed!'}</div>}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                        ☕ {isTr ? "Java'da mvn test çalıştırınca Surefire raporu target/surefire-reports altına düşer; burada Vitest coverage/ klasörüne HTML rapor üretir — aynı fikir." : "In Java, mvn test drops a Surefire report under target/surefire-reports; here Vitest generates an HTML report under coverage/ — same idea."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'jmeter-load-test') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const order = ['idle', 'launching', 'rampup', 'firing', 'aggregating', 'done']
            const cur = order.indexOf(s)
            const isFinal = cur >= order.indexOf('aggregating')
            const rows = [
                { label: '# Samples', value: '3,000' },
                { label: isTr ? 'Ortalama' : 'Average', value: '842 ms' },
                { label: 'Min', value: '88 ms' },
                { label: 'Max', value: '4,210 ms' },
                { label: '90%', value: '1,980 ms' },
                { label: '95%', value: '2,640 ms' },
                { label: '99%', value: '4,050 ms' },
                { label: isTr ? 'Hata %' : 'Error %', value: '0.8%' },
                { label: 'Throughput', value: '24.6/sec' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 Aggregate Report
                    </div>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                        {rows.map((row, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', fontSize: 9.5, background: i % 2 === 0 ? nodeBg : 'transparent', fontFamily: 'monospace' }}>
                                <span style={{ color: subtext }}>{row.label}</span>
                                <span style={{ color: isFinal ? (row.label.includes('%') && row.value === '0.8%' ? '#f59e0b' : '#10b981') : subtext, fontWeight: isFinal ? 700 : 400, opacity: isFinal ? 1 : 0.3, transition: 'opacity 0.4s' }}>
                                    {isFinal ? row.value : '—'}
                                </span>
                            </div>
                        ))}
                    </div>
                    {cur >= order.indexOf('rampup') && cur < order.indexOf('aggregating') && (
                        <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }} className="animate-pulse">
                            ⏳ {isTr ? '50 sanal kullanıcı isteklerini gönderiyor...' : '50 virtual users sending requests...'}
                        </div>
                    )}
                    {s === 'done' && (
                        <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 9.5, animation: 'simFadeUp 0.4s' }}>
                            <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: subtext, fontWeight: 700, marginBottom: 4 }}>📁 report/index.html</div>
                            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28 }}>
                                {[40, 65, 30, 90, 55, 70, 20].map((h, i) => (
                                    <div key={i} style={{ width: 8, height: `${h}%`, background: '#f5a623', borderRadius: '2px 2px 0 0' }} />
                                ))}
                            </div>
                        </div>
                    )}
                    {s === 'done' && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 10, color: '#10b981', fontWeight: 700 }}>✅ {isTr ? 'Test tamamlandı — rapor üretildi!' : 'Test completed — report generated!'}</div>}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 9, color: subtext }}>
                        ☕ {isTr ? "Java'da bir Gatling/JUnit yük testinden sonra konsolda yüzdelik (percentile) tablosunu okumak gibi — burada Aggregate Report aynı P90/P99 mantığını JMeter'ın CLI + HTML dashboard'unda gösteriyor." : "Like reading the percentile table in console output after a Gatling/JUnit load test in Java — here the Aggregate Report shows the same P90/P99 logic in JMeter's CLI + HTML dashboard."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-time-travel') {
            const order = ['idle', 'visit', 'getEmail', 'typeEmail', 'getPassword', 'typePassword', 'click', 'assert', 'done']
            const s = simState
            const cur = order.indexOf(s)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const screenBg = darkMode ? '#0f172a' : '#f8fafc'
            const emailVal = cur >= order.indexOf('typeEmail') ? 'user@test.com' : ''
            const pwdVal = cur >= order.indexOf('typePassword') ? '••••••••' : ''
            const emailHighlighted = s === 'getEmail' || s === 'typeEmail'
            const pwdHighlighted = s === 'getPassword' || s === 'typePassword'
            const btnPressed = s === 'click'
            const onDashboard = cur >= order.indexOf('assert')
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📸 {isTr ? 'Zaman Yolculuğu Anlık Görüntüsü' : 'Time-Travel Snapshot'}
                    </div>
                    <div style={{ border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: 8, overflow: 'hidden' }}>
                        <div style={{ background: darkMode ? '#1f2937' : '#e5e7eb', padding: '4px 8px', display: 'flex', gap: 4, alignItems: 'center' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                            <span style={{ fontSize: 8, marginLeft: 6, color: subtext, fontFamily: 'monospace' }}>{onDashboard ? 'myapp.com/dashboard' : 'myapp.com/login'}</span>
                        </div>
                        <div style={{ background: screenBg, padding: 16, minHeight: 150 }}>
                            {s === 'idle' && <div style={{ fontSize: 10, color: subtext, textAlign: 'center', paddingTop: 40 }}>{isTr ? "▶ Run'a bas, test başlasın" : '▶ Click Run to start the test'}</div>}
                            {!onDashboard && s !== 'idle' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#f3f4f6' : '#111827', marginBottom: 4 }}>🔐 {isTr ? 'Giriş Yap' : 'Login'}</div>
                                    <div style={{ padding: '6px 8px', borderRadius: 6, fontSize: 9.5, fontFamily: 'monospace', border: `1.5px solid ${emailHighlighted ? accent : (darkMode ? '#374151' : '#d1d5db')}`, background: darkMode ? '#1f2937' : '#fff', color: darkMode ? '#e5e7eb' : '#111827', boxShadow: emailHighlighted ? `0 0 0 3px ${accent}33` : 'none', transition: 'all 0.3s' }}>
                                        {emailVal || (isTr ? 'e-posta' : 'email')}
                                    </div>
                                    <div style={{ padding: '6px 8px', borderRadius: 6, fontSize: 9.5, fontFamily: 'monospace', border: `1.5px solid ${pwdHighlighted ? accent : (darkMode ? '#374151' : '#d1d5db')}`, background: darkMode ? '#1f2937' : '#fff', color: darkMode ? '#e5e7eb' : '#111827', boxShadow: pwdHighlighted ? `0 0 0 3px ${accent}33` : 'none', transition: 'all 0.3s' }}>
                                        {pwdVal || (isTr ? 'şifre' : 'password')}
                                    </div>
                                    <div style={{ marginTop: 4, padding: '6px 0', textAlign: 'center', borderRadius: 6, fontSize: 9.5, fontWeight: 700, color: '#fff', background: btnPressed ? '#059669' : accent, transform: btnPressed ? 'scale(0.96)' : 'scale(1)', transition: 'all 0.2s' }}>
                                        {isTr ? 'Giriş Yap' : 'Log In'}
                                    </div>
                                </div>
                            )}
                            {onDashboard && (
                                <div style={{ textAlign: 'center', animation: 'simFadeUp 0.4s' }}>
                                    <div style={{ fontSize: 20 }}>🎉</div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', marginTop: 4 }}>{isTr ? 'Dashboard\'a Hoş Geldin!' : 'Welcome to the Dashboard!'}</div>
                                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#10b98118', border: '1px solid #10b981', fontSize: 9, color: '#10b981', fontWeight: 700 }}>
                                        ✓ cy.url().should('include', '/dashboard')
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: darkMode ? '#1f2937' : '#f3f4f6', fontSize: 9, color: subtext, lineHeight: 1.5 }}>
                        ☕ {isTr ? "Selenium'da geçmişe dönüp DOM'u tekrar görmek imkansızdır — testi yeniden Debug modunda çalıştırman gerekir. Cypress her komutun anlık görüntüsünü otomatik saklar, command log'da tıklayıp anında geri sarabilirsin." : "In Selenium there's no way to rewind and see a past DOM state — you'd have to re-run the test in debug mode. Cypress automatically snapshots every command, so clicking the log instantly rewinds the app."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'github-account-repo-setup') {
            const s = simState
            const order = ['idle', 'signup', 'verify', 'newrepo', 'settings', 'url']
            const cur = order.indexOf(s)
            const rows = [
                ['signup', isTr ? 'Kayıt ol' : 'Sign Up', isTr ? 'github.com sayfasına git' : 'Go to github.com'],
                ['verify', isTr ? 'Doğrula' : 'Verify', isTr ? 'Email adresini onayla' : 'Confirm email address'],
                ['newrepo', isTr ? 'Yeni Repo' : 'New Repo', isTr ? 'Repository oluştur' : 'Create repository'],
                ['settings', isTr ? 'Ayarlar' : 'Settings', isTr ? 'Public/Private + README seçimi' : 'Public/Private + README choice'],
                ['url', 'URL', isTr ? 'HTTPS URL kopyala' : 'Copy HTTPS URL'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'GitHub hesap açma ve repo oluşturma adımları. URL kopyaladıktan sonra local repo ile bağlayabilirsin.' : 'GitHub account creation and repo setup steps. After copying the URL you can connect it to your local repo.'}
                    </div>
                    {rows.map(([key, label, value], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-purple-500 bg-purple-950/30' : 'border-purple-300 bg-purple-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-purple-800 bg-purple-950/30 text-purple-200' : 'border-purple-200 bg-purple-50 text-purple-800'}`}>
                        {isTr ? 'Önemli: local repo ile git init kullanacaksan, GitHub\'da README ekleme — aksi halde push sırasında çakışma olur.' : 'Important: if using git init locally, do NOT add a README on GitHub — otherwise you get conflicts on push.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-clone-vs-init') {
            const s = simState
            const order = ['idle', 'left', 'right', 'done']
            const cur = order.indexOf(s)
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'İki farklı başlangıç yolu: sıfırdan veya mevcut projeyi klonlayarak.' : 'Two different starting paths: from scratch or by cloning an existing project.'}
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('left') && s !== 'idle' ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>🆕 git init</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Boş klasörde yeni repo başlatır. Remote bağlantıyı sen kurarsın.' : 'Starts a new repo in an empty folder. You set up the remote yourself.'}</div>
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('right') ? (darkMode ? 'border-purple-500 bg-purple-950/30' : 'border-purple-300 bg-purple-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>👥 git clone</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Uzak repoyu indirir, remote otomatik bağlanır, hemen çalışırsın.' : 'Downloads remote repo, remote is auto-configured, you start working immediately.'}</div>
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-blue-800 bg-blue-950/30 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-800'}`}>
                        {isTr ? 'Takıma katılıyorsan clone, yeni proje başlatıyorsan init kullan.' : 'Use clone when joining a team, init when starting a new project.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-dot-folder') {
            const s = simState
            const order = ['idle', 'init', 'objects', 'refs', 'head', 'config']
            const cur = order.indexOf(s)
            const rows = [
                ['init', '.git/', isTr ? 'Git\'in gizli kontrol merkezi' : 'Git\'s hidden control center'],
                ['objects', '.git/objects/', isTr ? 'Commit, tree ve blob verileri' : 'Commit, tree and blob data'],
                ['refs', '.git/refs/', isTr ? 'Branch ve tag pointer\'ları' : 'Branch and tag pointers'],
                ['head', '.git/HEAD', isTr ? 'Aktif branch\'e işaret eder' : 'Points to the active branch'],
                ['config', '.git/config', isTr ? 'Remote URL ve repo ayarları' : 'Remote URLs and repo settings'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? '.git/ klasörünün içeriği — her şey burada saklanır.' : '.git/ folder contents — everything is stored here.'}
                    </div>
                    {rows.map(([key, label, value], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-yellow-500 bg-yellow-950/30' : 'border-yellow-300 bg-yellow-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : '📁'} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        ⚠️ {isTr ? '.git/ silinirse TÜM geçmiş kaybolur — geri dönüşü yoktur!' : 'If .git/ is deleted ALL history is gone — there is no undo!'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-diff-reader') {
            const s = simState
            const order = ['idle', 'header', 'removed', 'added', 'context', 'done']
            const cur = order.indexOf(s)
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Diff çıktısının renk kodları — her satır bir anlam taşır.' : 'Diff output color codes — each line carries meaning.'}
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('header') && s !== 'idle' ? (darkMode ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>📋 Header</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Hangi dosyanın hangi bölümü değişti' : 'Which file and section changed'}</div>
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('removed') && s !== 'idle' ? (darkMode ? 'border-red-500 bg-red-950/30' : 'border-red-300 bg-red-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>− {isTr ? 'Silinen satırlar (kırmızı)' : 'Removed lines (red)'}</div>
                        <div className={`text-xs mt-1 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Eski kodun silinmiş hali' : 'Old code that was deleted'}</div>
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('added') && s !== 'idle' ? (darkMode ? 'border-green-500 bg-green-950/30' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>+ {isTr ? 'Eklenen satırlar (yeşil)' : 'Added lines (green)'}</div>
                        <div className={`text-xs mt-1 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Yeni eklenen veya değiştirilen kod' : 'Newly added or changed code'}</div>
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('context') ? (darkMode ? 'border-gray-500 bg-gray-800' : 'border-gray-300 bg-gray-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>  {isTr ? 'Bağlam satırları (gri)' : 'Context lines (gray)'}</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Değişmemiş satırlar — nerede olduğunu gösterir' : 'Unchanged lines — show where you are'}</div>
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-emerald-800 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                        {isTr ? 'QA ipucu: PR review sırasında diff okumayı bilmek, test kapsamındaki değişiklikleri hızla yakalamanı sağlar.' : 'QA tip: knowing how to read diffs helps you quickly spot changes in test coverage during PR review.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-log-timeline') {
            const s = simState
            const order = ['idle', 'c1', 'c2', 'c3', 'head', 'branch']
            const cur = order.indexOf(s)
            const rows = [
                ['c1', 'i7j8k9l', isTr ? 'İlk commit' : 'First commit'],
                ['c2', 'e4f5g6h', isTr ? 'Selector düzeltmesi' : 'Selector fix'],
                ['c3', 'a1b2c3d', isTr ? 'Login test eklendi' : 'Login test added'],
                ['head', 'HEAD →', isTr ? 'Şu an burada olduğunu gösterir' : 'Shows where you are right now'],
                ['branch', isTr ? 'Dal etiketleri' : 'Branch labels', isTr ? 'Hangi dallar bu commit\'e bakıyor' : 'Which branches point to this commit'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'git log çıktısını okuma — her satırın anlamı var.' : 'Reading git log output — every line has meaning.'}
                    </div>
                    {rows.map(([key, label, value], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-purple-500 bg-purple-950/30' : 'border-purple-300 bg-purple-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-purple-800 bg-purple-950/30 text-purple-200' : 'border-purple-200 bg-purple-50 text-purple-800'}`}>
                        {isTr ? 'hash = benzersiz ID, HEAD = neredesin, branch etiketi = hangi dallar bu commit\'i işaret ediyor.' : 'hash = unique ID, HEAD = where you are, branch label = which branches point to this commit.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-stash-flow') {
            const s = simState
            const order = ['idle', 'working', 'stash', 'switch', 'return', 'pop']
            const cur = order.indexOf(s)
            const rows = [
                ['working', isTr ? 'Çalışma' : 'Working', isTr ? 'Dosyada değişiklik yapıyorsun' : 'You\'re editing a file'],
                ['stash', 'git stash', isTr ? 'Değişiklikler rafa kaldırılır' : 'Changes shelved away'],
                ['switch', 'git switch', isTr ? 'Başka branch\'e geçersin' : 'Switch to another branch'],
                ['return', isTr ? 'Geri dön' : 'Return', isTr ? 'Kendi branch\'ine dön' : 'Back to your branch'],
                ['pop', 'git stash pop', isTr ? 'Değişiklikler raftan geri gelir' : 'Changes return from shelf'],
            ]
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'Stash = geçici raf. Değişiklikleri kaybetmeden branch değiştirebilirsin.' : 'Stash = temporary shelf. Switch branches without losing changes.'}
                    </div>
                    {rows.map(([key, label, value], i) => {
                        const ready = order.indexOf(key) <= cur && s !== 'idle'
                        const active = order.indexOf(key) === cur
                        return (
                            <div key={key} className={`rounded-lg border p-3 ${active ? (darkMode ? 'border-amber-500 bg-amber-950/30' : 'border-amber-300 bg-amber-50') : ready ? (darkMode ? 'border-green-700 bg-green-950/25' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                                <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{ready ? '✓' : active ? '→' : i + 1} {label}</div>
                                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</div>
                            </div>
                        )
                    })}
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-amber-800 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                        {isTr ? 'Stash bir yığın (stack) gibi çalışır: en son stash\'lenen en önce pop edilir.' : 'Stash works like a stack: last stashed is first popped.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'git-revert-vs-reset') {
            const s = simState
            const order = ['idle', 'commits', 'revert', 'revert-done', 'reset', 'reset-done']
            const cur = order.indexOf(s)
            return (
                <div className="space-y-3">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isTr ? 'İki farklı geri alma yöntemi — biri güvenli, diğeri tehlikeli.' : 'Two different undo methods — one safe, one dangerous.'}
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('revert') && s !== 'idle' ? (darkMode ? 'border-green-500 bg-green-950/30' : 'border-green-300 bg-green-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>✅ git revert</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Geçmişi korur, yeni bir "geri alma" commit\'i ekler. Paylaşılmış branch\'ler için güvenli.' : 'Preserves history, adds a new "undo" commit. Safe for shared branches.'}</div>
                    </div>
                    <div className={`rounded-lg border p-3 ${cur >= order.indexOf('reset') ? (darkMode ? 'border-red-500 bg-red-950/30' : 'border-red-300 bg-red-50') : (darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50')}`}>
                        <div className={`text-xs font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>⛔ git reset --hard</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isTr ? 'Geçmişi siler! Push edilmiş commit\'lerde kullanma — takımda kaos yaratır.' : 'Erases history! Don\'t use on pushed commits — causes team chaos.'}</div>
                    </div>
                    <div className={`text-xs rounded-lg p-3 border ${darkMode ? 'border-red-800 bg-red-950/30 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}>
                        {isTr ? 'Kural: push edilmiş bir şeyi geri almak istiyorsan her zaman revert kullan.' : 'Rule: always use revert to undo something that has been pushed.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'linux-terminal-basics') {
            const s = simState
            const order = ['idle', 'pwd', 'ls', 'cd', 'ls2', 'cat', 'grep', 'done']
            const cur = order.indexOf(s)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const steps = [
                { key: 'pwd', label: isTr ? 'pwd — şu an neredeyim?' : 'pwd — where am I right now?' },
                { key: 'ls', label: isTr ? 'ls — bu klasörde ne var?' : 'ls — what is in this folder?' },
                { key: 'cd', label: isTr ? 'cd projects — relative path ile içeri gir' : 'cd projects — go in with a relative path' },
                { key: 'ls2', label: isTr ? 'ls — yeni konumdaki dosyalar' : 'ls — files in the new location' },
                { key: 'cat', label: isTr ? 'cat ../readme.txt — .. ile bir üst klasöre referans ver' : 'cat ../readme.txt — .. references the parent folder' },
                { key: 'grep', label: isTr ? '| grep QA — çıktıyı pipe ile filtrele' : '| grep QA — filter the output through a pipe' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Neden önemli?' : 'Why it matters'}</div>
                    {steps.map((step, i) => {
                        const idx = order.indexOf(step.key)
                        const active = idx === cur
                        const done = idx < cur && s !== 'idle'
                        return (
                            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '5px 8px', borderRadius: 6, background: active ? '#0ea5e922' : done ? nodeBg : 'transparent', marginBottom: 3, transition: 'all 0.3s' }}>
                                <span style={{ fontSize: 13, opacity: done || active ? 1 : 0.25 }}>{done ? '✅' : '▫️'}</span>
                                <span style={{ fontSize: 10.5, color: active ? '#0ea5e9' : done ? subtext : (darkMode ? '#4b5563' : '#d1d5db'), fontWeight: active ? 700 : 400 }}>{step.label}</span>
                            </div>
                        )
                    })}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? 'Java\'da this o anki objeyi gösterir; terminalde de pwd o anki "bağlamı" (working directory) gösterir. cd projects relative path\'tir, cd /home/qa/projects absolute path\'tir.' : 'In Java, this points to the current object; in a terminal, pwd shows the current "context" (working directory). cd projects is a relative path, cd /home/qa/projects is absolute.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'linux-permissions-lab') {
            const s = simState
            const order = ['idle', 'lsl', 'denied', 'chmod', 'lsl2', 'success']
            const cur = order.indexOf(s)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const hasExec = cur >= order.indexOf('chmod')
            const rows = [
                { label: isTr ? 'Owner (qa)' : 'Owner (qa)', bits: hasExec ? 'rwx' : 'rw-', color: hasExec ? '#22c55e' : '#f59e0b' },
                { label: isTr ? 'Group (qa)' : 'Group (qa)', bits: 'r--', color: '#3b82f6' },
                { label: isTr ? 'Other' : 'Other', bits: 'r--', color: '#a855f7' },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'rwx kırılımı' : 'rwx breakdown'}</div>
                    {rows.map((row, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: `1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}` }}>
                            <span style={{ fontSize: 10, color: subtext, width: 90, flexShrink: 0 }}>{row.label}</span>
                            <span style={{ fontSize: 11, color: row.color, fontWeight: 800, fontFamily: 'monospace' }}>{row.bits}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext }}>
                        chmod +x ≈ chmod 7{hasExec ? '5' : '4'}4 — {isTr ? '"x" bitini owner\'a ekler' : 'adds the "x" bit for owner'}
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? 'Java\'da private/protected/public erişim belirleyicileri kimin neye erişebileceğini söyler; Linux\'ta rwx + owner/group/other de aynı işi dosya seviyesinde yapar. CI script\'i +x olmadan push edilirse pipeline "Permission denied" ile patlar.' : 'Java access modifiers (private/protected/public) decide who can access what; Linux rwx + owner/group/other does the same job at the file level. If a CI script is pushed without +x, the pipeline fails with "Permission denied".'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-test-structure') {
            const order = ['idle', 'before', 'be1', 'it1', 'ae1', 'be2', 'it2', 'ae2', 'after']
            const cur = order.indexOf(simState)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const counts = [
                { label: 'before()', count: cur >= order.indexOf('before') ? 1 : 0, max: 1 },
                { label: 'beforeEach()', count: [order.indexOf('be1'), order.indexOf('be2')].filter(i => cur >= i).length, max: 2 },
                { label: 'it()', count: [order.indexOf('it1'), order.indexOf('it2')].filter(i => cur >= i).length, max: 2 },
                { label: 'afterEach()', count: [order.indexOf('ae1'), order.indexOf('ae2')].filter(i => cur >= i).length, max: 2 },
                { label: 'after()', count: cur >= order.indexOf('after') ? 1 : 0, max: 1 },
            ]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Hook çalışma sayacı' : 'Hook execution counter'}</div>
                    {counts.map((c, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${darkMode ? '#1f2937' : '#f3f4f6'}` }}>
                            <code style={{ fontSize: 10.5, color: darkMode ? '#e5e7eb' : '#111827' }}>{c.label}</code>
                            <span style={{ fontSize: 10.5, fontWeight: 800, color: c.count === c.max && c.count > 0 ? '#10b981' : subtext }}>{c.count} / {c.max}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "JUnit 5'te @BeforeAll/@AfterAll static ve sınıf başına 1 kez çalışır — Cypress'te before()/after() de aynı şekilde describe bloğu için 1 kez çalışır. @BeforeEach/@AfterEach her test metodundan önce/sonra çalışır — beforeEach()/afterEach() de her it() için aynısını yapar." : "In JUnit 5, @BeforeAll/@AfterAll are static and run once per class — Cypress's before()/after() do the same once per describe block. @BeforeEach/@AfterEach run before/after every test method — beforeEach()/afterEach() do the same for every it()."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-session-cache') {
            const order = ['idle', 't1visit', 't1type', 't1click', 't1saved', 't2restore', 't2dashboard']
            const cur = order.indexOf(simState)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const sessionSaved = cur >= order.indexOf('t1saved')
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Session Cache Durumu' : 'Session Cache State'}</div>
                    <div style={{ border: `1.5px solid ${sessionSaved ? '#a78bfa' : (darkMode ? '#374151' : '#d1d5db')}`, borderRadius: 8, padding: 10, background: sessionSaved ? '#a78bfa18' : 'transparent', transition: 'all .3s' }}>
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: sessionSaved ? '#a78bfa' : subtext }}>cy.session(['user','pass123'], fn)</div>
                        <div style={{ fontSize: 9.5, color: subtext, marginTop: 4 }}>{sessionSaved ? (isTr ? "✓ cookie + localStorage cache'lendi" : '✓ cookies + localStorage cached') : (isTr ? 'henüz boş' : 'still empty')}</div>
                    </div>
                    <div style={{ marginTop: 10, display: 'grid', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5 }}>
                            <code style={{ fontWeight: 700, color: darkMode ? '#e5e7eb' : '#111827' }}>this.alias</code>
                            <span style={{ color: subtext }}>{isTr ? 'statik anlık görüntü' : 'static snapshot'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5 }}>
                            <code style={{ fontWeight: 700, color: darkMode ? '#e5e7eb' : '#111827' }}>cy.get('@alias')</code>
                            <span style={{ color: subtext }}>{isTr ? 'sorguyu tekrar çalıştırır' : 're-runs the query'}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "Selenium'da her testten önce login'i tekrar yapmamak için genelde kendi cache mekanizmanı (cookie inject, @BeforeClass) yazarsın. cy.session() bunu built-in yapar: aynı login parametreleriyle çağrılırsa testi tekrar çalıştırmaz, sadece tarayıcı context'ini geri yükler." : "In Selenium you usually write your own caching mechanism (cookie injection, @BeforeClass) to avoid re-logging-in before every test. cy.session() does this built-in: if called with the same login params, it skips re-running and just restores the browser context."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-component-mount') {
            const order = ['idle', 'mount', 'click', 'spy']
            const cur = order.indexOf(simState)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>E2E vs Component Testing</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                        <div style={{ border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: 8, padding: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: darkMode ? '#e5e7eb' : '#111827' }}>🌍 cy.visit()</div>
                            <div style={{ fontSize: 9, color: subtext }}>{isTr ? 'TÜM uygulamayı açar — server, router, tüm sayfa.' : 'Loads the WHOLE app — server, router, full page.'}</div>
                        </div>
                        <div style={{ border: `1.5px solid ${cur >= order.indexOf('mount') ? '#10b981' : (darkMode ? '#374151' : '#e5e7eb')}`, borderRadius: 8, padding: 8, background: cur >= order.indexOf('mount') ? '#10b98118' : 'transparent', transition: 'all .3s' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: darkMode ? '#e5e7eb' : '#111827' }}>🧩 cy.mount()</div>
                            <div style={{ fontSize: 9, color: subtext }}>{isTr ? 'SADECE bu component\'i izole render eder — server gerekmez.' : 'Renders ONLY this component in isolation — no server needed.'}</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "JUnit + Mockito'da bir servis sınıfını tüm Spring context'ini ayağa kaldırmadan izole test edersin (@ExtendWith(MockitoExtension.class)). cy.mount() de aynı felsefeyle, tüm React/Vue uygulamasını açmadan tek bir component'i gerçek tarayıcıda izole test eder." : "In JUnit + Mockito you test a service class in isolation without booting the whole Spring context (@ExtendWith(MockitoExtension.class)). cy.mount() follows the same philosophy — testing a single component in a real browser without launching the entire React/Vue app."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-stub-clock') {
            const order = ['idle', 'clockstart', 'loading', 'tick', 'loaded']
            const cur = order.indexOf(simState)
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const ticked = cur >= order.indexOf('tick')
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Gerçek zaman vs Cypress saati' : 'Real time vs Cypress clock'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: 8 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 18 }}>⏱️</div>
                            <div style={{ fontSize: 8, color: subtext }}>{isTr ? 'gerçek saat' : 'real clock'}</div>
                            <div style={{ fontSize: 9, fontWeight: 800, color: '#ef4444' }}>{isTr ? 'donduruldu' : 'frozen'}</div>
                        </div>
                        <div style={{ fontSize: 14, color: subtext }}>→</div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 18 }}>{ticked ? '⚡' : '🌀'}</div>
                            <div style={{ fontSize: 8, color: subtext }}>cy.tick(5000)</div>
                            <div style={{ fontSize: 9, fontWeight: 800, color: ticked ? '#10b981' : subtext }}>{ticked ? '+5000ms' : '+0ms'}</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? 'Java testlerinde setTimeout benzeri davranışı test etmek için genelde Thread.sleep() ile gerçekten beklersin (yavaş, flaky). cy.clock() + cy.tick() sahte bir saat kurar — gerçekte 5 saniye geçmeden uygulamanın "5 saniye sonra" davranışını anında tetikler.' : 'In Java tests you usually call Thread.sleep() to really wait out a setTimeout-like delay (slow, flaky). cy.clock() + cy.tick() install a fake clock — it triggers the app\'s "5 seconds later" behavior instantly, without waiting 5 real seconds.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-selector-playground') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const tips = {
                btn: { tr: '✅ data-cy ile tekil ve kararlı — en iyi pratik.', en: '✅ Unique and stable via data-cy — best practice.' },
                input: { tr: "✅ data-cy ile tekil — input değer/placeholder değişse bile kırılmaz.", en: '✅ Unique via data-cy — survives value/placeholder changes.' },
                header: { tr: '⚠️ h1.welcome-title sayfada 3 yerde eşleşiyor — Cypress ilkini alır, bu kırılgan ve belirsizdir.', en: '⚠️ h1.welcome-title matches 3 places on the page — Cypress takes the first one, which is fragile and ambiguous.' },
            }
            const current = simState !== 'idle' ? tips[simState] : null
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Seçilen Elemanın Analizi' : 'Selected Element Analysis'}</div>
                    {current ? (
                        <div style={{ padding: 10, borderRadius: 8, background: nodeBg, fontSize: 10.5, color: darkMode ? '#e5e7eb' : '#111827', lineHeight: 1.6 }}>{isTr ? current.tr : current.en}</div>
                    ) : (
                        <div style={{ fontSize: 10, color: subtext }}>{isTr ? 'Solda bir elemana tıkla.' : 'Click an element on the left.'}</div>
                    )}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "Selenium'da \"doğru selector\"ı bulmak için sık sık tarayıcı DevTools'ta manuel deneme yaparsın. Cypress Selector Playground bunu Test Runner'ın içine gömer: tıkla, en iyi selector'ı ve kaç eşleşme olduğunu anında gör, kopyala-yapıştır." : "In Selenium, finding the \"right selector\" usually means manual trial-and-error in browser DevTools. Cypress's Selector Playground embeds this right inside the Test Runner: click, instantly see the best selector and how many matches it has, then copy-paste."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-ci-pipeline') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>cypress open vs cypress run</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                        <div style={{ border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: 8, padding: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: darkMode ? '#e5e7eb' : '#111827' }}>🖥️ cypress open</div>
                            <div style={{ fontSize: 9, color: subtext }}>{isTr ? 'İnteraktif Test Runner — geliştirirken kullanılır.' : 'Interactive Test Runner — used while developing.'}</div>
                        </div>
                        <div style={{ border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, borderRadius: 8, padding: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: darkMode ? '#e5e7eb' : '#111827' }}>🤖 cypress run --browser X</div>
                            <div style={{ fontSize: 9, color: subtext }}>{isTr ? 'Headless, CI\'da kullanılır. --browser ile chrome/firefox/edge seçilir.' : 'Headless, used in CI. --browser picks chrome/firefox/edge.'}</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "Maven Surefire'da <parallel>methods</parallel> ve forkCount ile JUnit testlerini paralel koşturursun. Cypress'te ise her tarayıcı/grup ayrı bir CI job'ı (matrix strategy) olarak paralel çalışır ve sonuçlar Cypress Cloud'da tek bir raporda birleşir." : "In Maven Surefire you parallelize JUnit tests with <parallel>methods</parallel> and forkCount. In Cypress, each browser/group runs as a separate CI job (matrix strategy) in parallel, and results merge into a single Cypress Cloud report."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'cypress-jquery-selectors') {
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const equivalents = {
                first: { tr: 'Selenium: driver.findElements(By.tagName("li")).get(0) yazman gerekir — CSS3\'te :first yoktur.', en: 'Selenium: you must write driver.findElements(By.tagName("li")).get(0) — CSS3 has no :first.' },
                last: { tr: "Selenium: listenin boyutunu alıp son indekse erişmen gerekir. Playwright: locator.last() metodunu kullanırsın (farklı sözdizimi).", en: 'Selenium: you must get the list size and access the last index. Playwright: you use the locator.last() method (different syntax).' },
                visible: { tr: "Selenium: isDisplayed() ile her elemanı tek tek kontrol edip filtrelersin. Playwright'ın kendi :visible'ı var ama jQuery'nin Sizzle motoruyla aynı değildir.", en: "Selenium: you check isDisplayed() on each element and filter manually. Playwright has its own :visible but it isn't the same engine as jQuery's Sizzle." },
                contains: { tr: 'Selenium: CSS\'te :contains() YOKTUR, XPath\'e geçmen gerekir (//li[contains(text(),"Cherry")]). Cypress\'te aynı satırda CSS gibi yazılır.', en: 'Selenium: CSS has NO :contains(), you must switch to XPath (//li[contains(text(),"Cherry")]). In Cypress it\'s written like plain CSS on the same line.' },
                eq2: { tr: ":eq(n) CSS3 standardında yoktur — sadece jQuery/Sizzle'da var. Cypress bunu doğrudan miras alır.", en: ":eq(n) doesn't exist in the CSS3 standard — it's a jQuery/Sizzle-only feature. Cypress inherits it directly." },
                checked: { tr: ":checked CSS3'te VARDIR ama tarayıcı motoruna göre tutarsız davranabilir; jQuery'nin normalize edilmiş versiyonu Cypress'te garantilidir.", en: ":checked exists in CSS3 but can behave inconsistently across browser engines; jQuery's normalized version is guaranteed in Cypress." },
            }
            const current = simState !== 'idle' ? equivalents[simState] : null
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{isTr ? 'Diğer araçlarda bu nasıl yapılır?' : 'How would other tools do this?'}</div>
                    {current ? (
                        <div style={{ padding: 10, borderRadius: 8, background: nodeBg, fontSize: 10.5, color: darkMode ? '#e5e7eb' : '#111827', lineHeight: 1.6 }}>{isTr ? current.tr : current.en}</div>
                    ) : (
                        <div style={{ fontSize: 10, color: subtext }}>{isTr ? 'Solda bir pseudo-class seç.' : 'Pick a pseudo-class on the left.'}</div>
                    )}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.6 }}>
                        ☕ {isTr ? "Cypress'in sorgu motoru gerçekten jQuery'dir (Sizzle selector engine) — bu yüzden jQuery'nin TÜM pseudo-class'larını hiçbir ek kütüphane gerekmeden cy.get() içinde kullanabilirsin. Bu, Selenium'un saf CSS3/XPath motorunda ve Playwright'ın kendi (farklı sözdizimli) selector motorunda YOKTUR." : "Cypress's query engine is literally jQuery (the Sizzle selector engine) — so you can use ALL of jQuery's pseudo-classes inside cy.get() with zero extra libraries. This does NOT exist in Selenium's plain CSS3/XPath engine or in Playwright's own (differently-syntaxed) selector engine."}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'selenium-bidi-cdp') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const details = {
                'console-error': {
                    title: isTr ? 'BiDi Console Listener' : 'BiDi Console Listener',
                    desc: isTr 
                        ? 'BiDi (Bidirectional) protokolü sayesinde WebSocket bağlantısı üzerinden tarayıcıdaki JavaScript hataları anlık olarak dinlenir. HTTP polling yapılmasına gerek kalmaz.'
                        : 'Using the Bidirectional protocol over WebSockets, JavaScript console errors in the browser are captured in real-time without HTTP polling.',
                    why: isTr
                        ? 'Geleneksel WebDriver\'da logları almak için test sonunda driver.manage().logs() ile toplu çekim yapılırdı. BiDi ise olay odaklı (event-driven) çalışır.'
                        : 'Traditional WebDriver polled driver.manage().logs() at the end of the test. BiDi works event-driven in real-time.'
                },
                'mock-network': {
                    title: isTr ? 'CDP/BiDi Network Mocking' : 'CDP/BiDi Network Mocking',
                    desc: isTr
                        ? 'Ağ katmanına müdahale edilerek belirli URL istekleri yakalanır ve API sunucusuna gitmeden sahte (mock) JSON cevabı enjekte edilir.'
                        : 'By intercepting the network layer, requests to specific URLs are blocked and custom mock JSON responses are injected before hitting the API server.',
                    why: isTr
                        ? 'Mocking sayesinde backend servisleri hazır olmasa bile frontend testleri izole olarak koşulabilir. Testler hızlanır ve dış bağımlılıklar kalkar.'
                        : 'Mocking allows frontend tests to run in isolation even if backend services are down, speeding up execution and eliminating flakiness.'
                },
                'paris-geo': {
                    title: isTr ? 'Emulate Geolocation' : 'Emulate Geolocation',
                    desc: isTr
                        ? 'Chrome DevTools Protocol (CDP) veya BiDi üzerinden enlem (latitude) ve boylam (longitude) değerleri tarayıcıya gönderilerek GPS konumu simüle edilir.'
                        : 'Through CDP/BiDi commands, latitude and longitude coordinates are sent to the browser to simulate physical GPS location.',
                    why: isTr
                        ? 'Uygulamanın lokasyon bazlı özelliklerini (para birimi, dil, yakın bayiler vb.) dünyanın her yerindeymiş gibi test etmenizi sağlar.'
                        : 'Enables testing location-based features (currency, language, nearby stores) as if the browser is physically located anywhere in the world.'
                }
            }
            const current = details[s]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 {isTr ? 'Protokol Analizi (BiDi & CDP)' : 'Protocol Analysis (BiDi & CDP)'}
                    </div>
                    {current ? (
                        <div style={{ animation: 'simFadeUp 0.3s' }}>
                            <div style={{ padding: 10, borderRadius: 8, background: nodeBg, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#38bdf8' : '#0284c7', marginBottom: 4 }}>
                                    {current.title}
                                </div>
                                <div style={{ fontSize: 10, color: darkMode ? '#e2e8f0' : '#374151', lineHeight: 1.4, marginBottom: 8 }}>
                                    {current.desc}
                                </div>
                                <div style={{ fontSize: 9.5, color: subtext, borderTop: `1px solid ${darkMode ? '#4b5563' : '#cbd5e1'}`, paddingTop: 6 }}>
                                    💡 <b>{isTr ? 'Neden Güçlü:' : 'Why it\'s powerful:'}</b> {current.why}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ fontSize: 10, color: subtext }}>
                            {isTr ? 'Soldan bir CDP/BiDi senaryosu seçin.' : 'Select a CDP/BiDi scenario on the left.'}
                        </div>
                    )}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.5 }}>
                        ☕ <b>{isTr ? 'Java Analojisi:' : 'Java Analogy:'}</b> {isTr 
                            ? 'BiDi, Java\'daki Observer Pattern (Event Listeners) gibi çalışırken; geleneksel HTTP WebDriver ise sürekli bir veritabanını sorgulayan (Polling) verimsiz bir döngüye benzer.'
                            : 'BiDi works like Java\'s Observer Pattern (Event Listeners), whereas traditional HTTP WebDriver is like repeatedly polling a database in a loop.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'selenium-virtual-auth') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const details = {
                'add-auth': {
                    title: 'WebAuthn / Passkeys Simülatörü',
                    desc: isTr
                        ? 'Şifresiz giriş sistemlerini test etmek için fiziksel USB güvenlik anahtarı veya parmak izi okuyucu yerine geçecek sanal bir kimlik doğrulayıcı (Virtual Authenticator) oluşturulur.'
                        : 'To test passwordless login systems, a virtual authenticator is created to simulate physical USB security keys or biometric fingerprint readers.',
                    why: isTr
                        ? 'Fiziksel donanımları otomatize etmek imkansızdır. Sanal kimlik doğrulayıcı ile CTAP2/U2F protokol seviyesinde basarılı/basarısız senaryolar simüle edilebilir.'
                        : 'Automating physical hardware is impossible. Virtual authenticators let you simulate success/failure scenarios at the CTAP2/U2F protocol level.'
                },
                'print-pdf': {
                    title: 'Headless Print API',
                    desc: isTr
                        ? 'Tarayıcıyı headless (arayüzsüz) modda çalıştırırken sayfanın PDF çıktısı alınır. Sayfa yapısı, kenar boşlukları ve arka plan grafikleri özelleştirilebilir.'
                        : 'Prints the page to a PDF file while running the browser in headless mode. Page orientation, margins, and background graphics can be customized.',
                    why: isTr
                        ? 'Faturalar, makbuzlar veya rapor sayfalarının PDF halinin tasarım doğruluğunu ve içerik tutarlılığını test etmeyi sağlar.'
                        : 'Allows verifying the layout and content consistency of generated invoices, receipts, or PDF report pages.'
                },
                'scroll-wheel': {
                    title: 'WheelInput (Mouse Tekerleği)',
                    desc: isTr
                        ? 'Selenium 4 ile gelen WheelInput sınıfı, sayfanın belirli bir noktasından (Scroll Origin) itibaren piksel bazında hassas kaydırma yapmayı sağlar.'
                        : 'The WheelInput class introduced in Selenium 4 allows precise pixel-based scrolling from a specific point on the page (Scroll Origin).',
                    why: isTr
                        ? 'Sonsuz kaydırma (infinite scroll) sayfalarını veya elementlerin view-port dışındaki alanlarını tam kullanıcı hareketi gibi test etmeye yarar.'
                        : 'Useful for testing infinite-scroll pages or bringing off-screen elements into view exactly like real user wheel movements.'
                }
            }
            const current = details[s]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 {isTr ? 'Gelişmiş API Detayları' : 'Advanced API Details'}
                    </div>
                    {current ? (
                        <div style={{ animation: 'simFadeUp 0.3s' }}>
                            <div style={{ padding: 10, borderRadius: 8, background: nodeBg, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#a78bfa' : '#7c3aed', marginBottom: 4 }}>
                                    {current.title}
                                </div>
                                <div style={{ fontSize: 10, color: darkMode ? '#e2e8f0' : '#374151', lineHeight: 1.4, marginBottom: 8 }}>
                                    {current.desc}
                                </div>
                                <div style={{ fontSize: 9.5, color: subtext, borderTop: `1px solid ${darkMode ? '#4b5563' : '#cbd5e1'}`, paddingTop: 6 }}>
                                    💡 <b>{isTr ? 'Neden Gerekli:' : 'Why it\'s needed:'}</b> {current.why}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ fontSize: 10, color: subtext }}>
                            {isTr ? 'Soldan gelişmiş bir senaryo seçin.' : 'Select an advanced scenario on the left.'}
                        </div>
                    )}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.5 }}>
                        ☕ <b>{isTr ? 'Java Analojisi:' : 'Java Analogy:'}</b> {isTr 
                            ? 'Virtual Authenticator, Java birim testlerinde veritabanına erişmek yerine Mockito ile Mock nesneler yaratmaya benzer — testleri izole eder.'
                            : 'Virtual Authenticator is like using Mockito to mock database connections in Java unit tests — keeping the tests fast and isolated.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'selenium-ide-flow') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const details = {
                'recording': {
                    title: isTr ? 'Kayıt Yapısı (SIDE)' : 'Recording Structure (SIDE)',
                    desc: isTr
                        ? 'Selenium IDE, tarayıcıda gerçekleştirdiğiniz her hareketi Command (komut), Target (hedef selector) ve Value (değer) üçlüsü halinde kaydeder.'
                        : 'Selenium IDE records every browser action as a triplet: Command, Target (selector), and Value.',
                    why: isTr
                        ? 'Otomasyona yeni başlayanlar için hızlıca locator ve komut yapısını anlamaya yarar. Üretilen .side dosyası JSON formatındadır.'
                        : 'Helps beginners quickly understand locators and command syntax. The generated .side files are saved in standard JSON format.'
                },
                'control-flow': {
                    title: isTr ? 'Koşullu Yapılar & Döngüler' : 'Control Flow & Loops',
                    desc: isTr
                        ? 'Kayıt-oynatmanın ötesinde, IDE içinde if/else, while, times gibi kontrol mekanizmaları tanımlanarak dinamik akışlar oluşturulabilir.'
                        : 'Beyond record-and-play, control structures like if/else, while, and times can be added within the IDE to build dynamic test flows.',
                    why: isTr
                        ? 'Testlerin dinamik verilerle veya sayfa durumlarına göre farklı dallara sapmasına izin verir. Kod yazma ihtiyacını azaltır.'
                        : 'Allows tests to branch based on page state or dynamic data, reducing the need for writing custom framework code.'
                },
                'export-code': {
                    title: isTr ? 'Kod İhracı (Java/JUnit)' : 'Code Export (Java/JUnit)',
                    desc: isTr
                        ? 'IDE üzerinde hazırlanan senaryolar, tek tıkla Java (JUnit/TestNG), Python, C# veya JavaScript kodlarına dönüştürülüp framework\'e aktarılabilir.'
                        : 'Scenarios created in the IDE can be exported with one click into structured Java (JUnit/TestNG), Python, C#, or JavaScript code.',
                    why: isTr
                        ? 'Kayıtla başlanan basit bir senaryoyu, profesyonel Page Object Model mimarisindeki kod tabanına taşımak için harika bir köprüdür.'
                        : 'Serves as a great bridge to move a recorded simple script into a professional Page Object Model test framework.'
                }
            }
            const current = details[s]
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 {isTr ? 'Selenium IDE Detayları' : 'Selenium IDE Details'}
                    </div>
                    {current ? (
                        <div style={{ animation: 'simFadeUp 0.3s' }}>
                            <div style={{ padding: 10, borderRadius: 8, background: nodeBg, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#fb923c' : '#ea580c', marginBottom: 4 }}>
                                    {current.title}
                                </div>
                                <div style={{ fontSize: 10, color: darkMode ? '#e2e8f0' : '#374151', lineHeight: 1.4, marginBottom: 8 }}>
                                    {current.desc}
                                </div>
                                <div style={{ fontSize: 9.5, color: subtext, borderTop: `1px solid ${darkMode ? '#4b5563' : '#cbd5e1'}`, paddingTop: 6 }}>
                                    💡 <b>{isTr ? 'Neden Önemli:' : 'Why it\'s important:'}</b> {current.why}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ fontSize: 10, color: subtext }}>
                            {isTr ? 'Soldan bir Selenium IDE senaryosu seçin.' : 'Select a Selenium IDE scenario on the left.'}
                        </div>
                    )}
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.5 }}>
                        ☕ <b>{isTr ? 'Java Analojisi:' : 'Java Analogy:'}</b> {isTr
                            ? 'Selenium IDE\'den kod ihracı, IntelliJ IDEA veya Eclipse\'in hazır şablon kod (boilerplate) üretmesine benzer — sizi sıfırdan kurulum zahmetinden kurtarır.'
                            : 'Exporting code from Selenium IDE is like using IntelliJ or Eclipse template generators to instantly create boilerplate test classes.'}
                    </div>
                </div>
            )
        }

        if (block.scenario === 'selenium-grid-architecture') {
            const s = simState
            const subtext = darkMode ? '#9ca3af' : '#6b7280'
            const nodeBg = darkMode ? '#1f2937' : '#f3f4f6'
            const details = {
                'idle': {
                    title: isTr ? 'Bekleme Modu' : 'Idle Mode',
                    desc: isTr ? 'Test isteklerinin Router\'a gönderilmeye hazır olduğu aşamadır.' : 'The stage where test requests are ready to be sent to the Router.'
                },
                'router': {
                    title: '🚦 Router (Yönlendirici)',
                    desc: isTr
                        ? 'Grid\'in tek giriş noktasıdır (varsayılan Port 4444). Gelen tüm HTTP veya WebSocket isteklerini karşılar ve ilgili mikro servise yönlendirir.'
                        : 'The single entry point of the Grid (default Port 4444). Intercepts all incoming HTTP/WebSocket requests and routes them to the correct service.'
                },
                'distributor': {
                    title: '🗂️ Distributor (Dağıtıcı)',
                    desc: isTr
                        ? 'Yeni oturum isteklerini alır. Mevcut Node\'ların kapasitelerini ve işletim sistemi/tarayıcı eşleşmelerini kontrol ederek en uygun Node\'a atama yapar.'
                        : 'Accepts new session requests. Inspects node capacities and OS/browser matches to assign the request to the most suitable Node.'
                },
                'docker': {
                    title: '🐳 Docker / Dynamic Node',
                    desc: isTr
                        ? 'Selenium Grid 4, ihtiyaç anında Docker API üzerinden yepyeni ve temiz bir tarayıcı konteyneri (container) ayağa kaldırabilir.'
                        : 'Selenium Grid 4 can dynamically spin up brand new, clean browser containers via Docker API on-demand.'
                },
                'session-map': {
                    title: '🗺️ Session Map (Oturum Haritası)',
                    desc: isTr
                        ? 'Hangi Session ID\'nin hangi Node (IP:Port) üzerinde koştuğunu hafızasında (veya Redis üzerinde) tutan anahtarlama mekanizmasıdır.'
                        : 'A key-value lookup (in-memory or Redis) storing which Session ID maps to which Node physical IP and Port address.'
                },
                'done': {
                    title: '✓ Test Tamamlandı',
                    desc: isTr
                        ? 'Test sona erdiğinde oturum sonlandırılır. Dynamic Grid yapısında Docker konteyneri otomatik yok edilir (destroyed) ve kaynaklar boşa çıkar.'
                        : 'When the test finishes, the session ends. In a dynamic Grid setup, the Docker container is automatically destroyed to free up host resources.'
                }
            }
            const current = details[s] || details['idle']
            return (
                <div>
                    <div style={{ fontSize: 10, color: subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                        📊 {isTr ? 'Grid 4 Mikro Servis Mimarisi' : 'Grid 4 Microservice Architecture'}
                    </div>
                    <div style={{ animation: 'simFadeUp 0.3s' }}>
                        <div style={{ padding: 10, borderRadius: 8, background: nodeBg, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#38bdf8' : '#0284c7', marginBottom: 4 }}>
                                {current.title}
                            </div>
                            <div style={{ fontSize: 10, color: darkMode ? '#e2e8f0' : '#374151', lineHeight: 1.4, marginBottom: 8 }}>
                                {current.desc}
                            </div>
                            <div style={{ fontSize: 9, color: subtext, borderTop: `1px solid ${darkMode ? '#4b5563' : '#cbd5e1'}`, paddingTop: 6 }}>
                                🔗 {isTr ? 'Grid 4 ile gelen ana yenilik, Hub/Node yerine tamamen mikro servis mimarisine geçilmiş olmasıdır.' : 'The main innovation in Grid 4 is the transition from monolithic Hub/Node to a fully decentralized microservices architecture.'}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: nodeBg, fontSize: 10, color: subtext, lineHeight: 1.5 }}>
                        ☕ <b>{isTr ? 'Java Analojisi:' : 'Java Analogy:'}</b> {isTr
                            ? 'Router bir API Gateway (örneğin Spring Cloud Gateway), Session Map bir Redis önbelleği, Docker Node\'lar ise Kubernetes Pod\'ları gibi dinamik kaynak dağıtımı yapar.'
                            : 'Router acts like an API Gateway (e.g. Spring Cloud Gateway), Session Map is like a Redis cache, and Docker Nodes are like Kubernetes Pods dynamically allocating resources.'}
                    </div>
                </div>
            )
        }

        return null
    }

    const title = (block.title && typeof block.title === 'object')
        ? (isTr ? block.title.tr : block.title.en)
        : (block.title || '')

    return (
        <div className={`mt-6 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
            style={{ boxShadow: `0 0 20px ${accent}18` }}>
            <style>{`
                @keyframes simSpin { to { transform: rotate(360deg); } }
                @keyframes simFadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
                @keyframes simPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
                @media (prefers-reduced-motion: reduce) { .sim-animate { animation: none !important; } }
            `}</style>

            {/* Header */}
            <div style={{ background: accent }} className="px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{block.icon || '🧪'}</span>
                <div>
                    <div className="text-white font-bold text-sm">{title}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {isTr ? 'İnteraktif Simülasyon — Gör, Anla, Dene!' : 'Interactive Simulation — See, Understand, Try!'}
                    </div>
                </div>
                <span className="ml-auto text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full hidden md:block">🧪 Live Sim</span>
            </div>

            {/* Description */}
            {block.description && (
                <div className={`px-4 py-2.5 text-sm border-b ${darkMode ? 'border-gray-700 text-gray-300 bg-gray-800' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                    {isTr ? block.description.tr : block.description.en}
                </div>
            )}

            {/* Body: split layout */}
            <div className="grid md:grid-cols-2">
                {/* Left: Playground */}
                <div className={`p-4 border-b md:border-b-0 md:border-r ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        🎮 {isTr ? 'Canlı Demo Alanı' : 'Live Playground'}
                    </div>
                    {block.scenario === 'java-compile-run' && renderJavaCompileRunPlayground()}
                    {block.scenario === 'selenium-bidi-cdp' && renderSeleniumBidiCdpPlayground()}
                    {block.scenario === 'selenium-virtual-auth' && renderSeleniumVirtualAuthPlayground()}
                    {block.scenario === 'selenium-ide-flow' && renderSeleniumIdeFlowPlayground()}
                    {block.scenario === 'selenium-grid-architecture' && renderSeleniumGridArchitecturePlayground()}
                    {block.scenario === 'java-stack-heap' && renderJavaMemoryPlayground()}
                    {block.scenario === 'java-branch-runner' && renderJavaBranchPlayground()}
                    {block.scenario === 'java-javac-workshop' && renderJavaJavacWorkshopPlayground()}
                    {block.scenario === 'java-intellij-project' && renderJavaIntellijProjectPlayground()}
                    {block.scenario === 'java-maven-lifecycle' && renderJavaMavenLifecyclePlayground()}
                    {block.scenario === 'git-snapshot-story' && renderGitSnapshotStoryPlayground()}
                    {block.scenario === 'github-collaboration-story' && renderGithubCollaborationPlayground()}
                    {block.scenario === 'git-concept-order-map' && renderGitConceptOrderPlayground()}
                    {block.scenario === 'git-terminal-shell-map' && renderGitTerminalShellMapPlayground()}
                    {block.scenario === 'git-terminal-install-use' && renderGitTerminalInstallUsePlayground()}
                    {block.scenario === 'git-bash-open-folder' && renderGitBashOpenFolderPlayground()}
                    {block.scenario === 'git-bash-command-runner' && renderGitBashCommandRunnerPlayground()}
                    {block.scenario === 'git-install-os-setup' && renderGitInstallOsPlayground()}
                    {block.scenario === 'gitignore-create-and-match' && renderGitignoreCreateMatchPlayground()}
                    {block.scenario === 'gitignore-already-tracked-fix' && renderGitignoreRescuePlayground()}
                    {block.scenario === 'git-three-areas' && renderGitThreeAreasPlayground()}
                    {block.scenario === 'git-remote-origin-setup' && renderGitRemoteOriginSetupPlayground()}
                    {block.scenario === 'git-branch-lab' && renderGitBranchLabPlayground()}
                    {block.scenario === 'git-remote-branch-publish' && renderGitRemoteBranchPublishPlayground()}
                    {block.scenario === 'git-merge-lab' && renderGitMergeLabPlayground()}
                    {block.scenario === 'git-conflict-lab' && renderGitConflictLabPlayground()}
                    {block.scenario === 'github-pr-flow' && renderGithubPrFlowPlayground()}
                    {block.scenario === 'github-pull-request-ui-tour' && renderGithubPullRequestUiTourPlayground()}
                    {block.scenario === 'github-pr-review-conflict-ui' && renderGithubPrReviewConflictPlayground()}
                    {block.scenario === 'github-actions-ui-tour' && renderGithubActionsUiTourPlayground()}
                    {block.scenario === 'github-pages-settings-ui' && renderGithubPagesSettingsUiPlayground()}
                    {block.scenario === 'github-repo-settings-tour' && renderGithubRepoSettingsTourPlayground()}
                    {block.scenario === 'github-actions-pages' && renderGithubActionsPagesPlayground()}
                    {block.scenario === 'explicit-wait' && renderExplicitWaitPlayground()}
                    {block.scenario === 'implicit-wait' && renderImplicitWaitPlayground()}
                    {block.scenario === 'drag-drop' && renderDragDropPlayground()}
                    {block.scenario === 'alert-sim' && renderAlertSimPlayground()}
                    {block.scenario === 'multi-window' && renderMultiWindowPlayground()}
                    {block.scenario === 'pw-autowait' && renderPwAutoWaitPlayground()}
                    {block.scenario === 'rest-assured-chain' && renderRestAssuredPlayground()}
                    {block.scenario === 'jenkins-pipeline' && renderJenkinsPipelinePlayground()}
                    {block.scenario === 'kafka-flow' && renderKafkaPlayground()}
                    {block.scenario === 'docker-lifecycle' && renderDockerLifecyclePlayground()}
                    {block.scenario === 'api-request' && renderApiRequestPlayground()}
                    {block.scenario === 'k8s-pod' && renderK8sPodPlayground()}
                    {block.scenario === 'shadow-dom' && renderShadowDomPlayground()}
                    {block.scenario === 'iframe-detection' && renderIframeDetectionPlayground()}
                    {block.scenario === 'shadow-dom-xray' && renderShadowDomXrayPlayground()}
                    {block.scenario === 'appium-element-detection' && renderAppiumElementDetectionPlayground()}
                    {block.scenario === 'appium-swipe' && renderAppiumSwipePlayground()}
                    {block.scenario === 'browserstack-cloud-run' && renderBrowserstackCloudRunPlayground()}
                    {block.scenario === 'aws-codepipeline' && renderAwsCodepipelinePlayground()}
                    {block.scenario === 'azure-devops-pipeline' && renderAzureDevopsPipelinePlayground()}
                    {block.scenario === 'vitest-runner' && renderVitestRunnerPlayground()}
                    {block.scenario === 'jmeter-load-test' && renderJmeterLoadTestPlayground()}
                    {block.scenario === 'cypress-time-travel' && renderCypressTimeTravelPlayground()}
                    {block.scenario === 'github-account-repo-setup' && renderGithubAccountRepoSetupPlayground()}
                    {block.scenario === 'git-clone-vs-init' && renderGitCloneVsInitPlayground()}
                    {block.scenario === 'git-dot-folder' && renderGitDotFolderPlayground()}
                    {block.scenario === 'git-diff-reader' && renderGitDiffReaderPlayground()}
                    {block.scenario === 'git-log-timeline' && renderGitLogTimelinePlayground()}
                    {block.scenario === 'git-stash-flow' && renderGitStashFlowPlayground()}
                    {block.scenario === 'git-revert-vs-reset' && renderGitRevertVsResetPlayground()}
                    {block.scenario === 'linux-terminal-basics' && renderLinuxTerminalBasicsPlayground()}
                    {block.scenario === 'linux-permissions-lab' && renderLinuxPermissionsLabPlayground()}
                    {block.scenario === 'cypress-test-structure' && renderCypressTestStructurePlayground()}
                    {block.scenario === 'cypress-session-cache' && renderCypressSessionCachePlayground()}
                    {block.scenario === 'cypress-component-mount' && renderCypressComponentMountPlayground()}
                    {block.scenario === 'cypress-stub-clock' && renderCypressStubClockPlayground()}
                    {block.scenario === 'cypress-selector-playground' && renderCypressSelectorPlaygroundPlayground()}
                    {block.scenario === 'cypress-ci-pipeline' && renderCypressCiPipelinePlayground()}
                    {block.scenario === 'cypress-jquery-selectors' && renderCypressJqSelectorsPlayground()}
                </div>

                {/* Right: DOM Visualizer */}
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        🔬 {isTr ? 'DOM & Otomasyon Durumu' : 'DOM & Automation State'}
                    </div>
                    {renderDomVisualizer()}
                </div>
            </div>

            {/* Code block */}
            {block.code && (
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`px-4 py-2 flex items-center gap-2 text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                        <span>💻</span>
                        <span className="font-semibold">{isTr ? 'Otomasyon Kodu — Bu Senaryoyu Test Et' : 'Automation Code — Test This Scenario'}</span>
                    </div>
                    <CodeBlock code={block.code} language={block.language || 'java'} darkMode={darkMode} />
                </div>
            )}
        </div>
    )
}

// ─── Block Renderer ───────────────────────────────────────────────────────────

function renderBlock(block, i, darkMode, language = 'en', onQuizCorrect, sectionTitle = '') {
    const textCls = `text-sm leading-relaxed mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`
    const h3Cls = `text-xl font-bold mt-8 mb-3 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`
    const h4Cls = `text-base font-semibold mt-5 mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
    const bulletColor = block.accentColor || (darkMode ? 'text-indigo-400' : 'text-indigo-600')

    switch (block.type) {
        case 'text':
            return <p key={i} className={textCls}>{tx(block.content, language)}</p>
        case 'heading':
            return (
                <h3 key={i} className={h3Cls}>
                    {tx(block.text || block.content, language)}
                    {block.difficulty && <span className={`ml-3 text-xs font-normal px-2 py-0.5 rounded-full align-middle ${block.difficulty.startsWith('🟢') ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700') : block.difficulty.startsWith('🟡') ? (darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700') : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700')}`}>{block.difficulty}</span>}
                </h3>
            )
        case 'subheading':
            return <h4 key={i} className={h4Cls}>{tx(block.text || block.content, language)}</h4>
        case 'code':
            return (
                <div key={i}>
                    {block.label && <div className={`mt-4 mb-1 text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{block.label}</div>}
                    <CodeBlock code={block.code ?? block.content} language={block.language} darkMode={darkMode} />
                    {block.expected && (
                        <div className={`mt-1 p-3 rounded-b-lg font-mono text-xs border-l-4 border-emerald-500 ${darkMode ? 'bg-gray-900 text-emerald-400' : 'bg-emerald-50 text-emerald-800'}`}>
                            <div className={`text-xs font-sans mb-1 ${darkMode ? 'opacity-50' : 'opacity-60'}`}>{language === 'tr' ? '▶ Beklenen Çıktı:' : '▶ Expected Output:'}</div>
                            <pre className="whitespace-pre-wrap">{block.expected}</pre>
                        </div>
                    )}
                </div>
            )
        case 'tip':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-green-500 text-sm ${darkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-800'}`}>
                    💡 <strong>{language === 'tr' ? 'İpucu: ' : 'Tip: '}</strong>{tx(block.content, language)}
                </div>
            )
        case 'info':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-blue-500 text-sm ${darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
                    ℹ️ {tx(block.content, language)}
                </div>
            )
        case 'warning':
            return (
                <div key={i} className={`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 text-sm ${darkMode ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-800'}`}>
                    ⚠️ <strong>{language === 'tr' ? 'Dikkat: ' : 'Warning: '}</strong>{tx(block.content, language)}
                </div>
            )
        case 'divider':
            return <hr key={i} className={`my-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
        case 'list':
            return (
                <div key={i} className="mt-4">
                    {block.title && <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{tx(block.title, language)}</p>}
                    <ul className="space-y-2">
                        {block.items.map((item, j) => (
                            <li key={j} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <span className={`mt-0.5 flex-shrink-0 ${bulletColor}`}>{block.icon || '▸'}</span>
                                {typeof item === 'string' ? tx(item, language) : (
                                    <span><strong className={darkMode ? 'text-white' : 'text-gray-800'}>{tx(item.label, language)}</strong>
                                        {item.desc && <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}> — {tx(item.desc, language)}</span>}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        case 'steps':
            return (
                <div key={i} className="mt-4 space-y-2">
                    {block.items.map((item, j) => (
                        <div key={j} className={`flex items-start gap-3 p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                            <span className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-indigo-800 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>{j + 1}</span>
                            <span className="leading-relaxed">{typeof item === 'string' ? item : <span><strong>{tx(item.label, language)}</strong>{item.desc && `: ${tx(item.desc, language)}`}</span>}</span>
                        </div>
                    ))}
                </div>
            )
        case 'grid':
            return (
                <div key={i} className={`mt-4 grid grid-cols-1 md:grid-cols-${block.cols || 2} gap-3`}>
                    {block.items.map((item, j) => (
                        <div key={j} className={`p-4 rounded-xl border text-sm ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                            {item.icon && <div className="text-2xl mb-2">{item.icon}</div>}
                            <div className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tx(item.label, language)}</div>
                            {item.desc && <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{tx(item.desc, language)}</div>}
                        </div>
                    ))}
                </div>
            )
        case 'link-grid':
            return (
                <div key={i} className={`mt-4 grid grid-cols-1 md:grid-cols-${block.cols || 2} gap-3`}>
                    {block.items.map((item, j) => (
                        <Link
                            key={j}
                            to={item.route}
                            className={`group flex items-start gap-3 p-4 rounded-xl border text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'bg-gray-800 border-gray-600 hover:border-indigo-500' : 'bg-gray-50 border-gray-200 hover:border-indigo-400'}`}
                        >
                            {item.icon && <div className="text-2xl flex-shrink-0">{item.icon}</div>}
                            <div className="min-w-0 flex-1">
                                <div className={`font-bold mb-1 flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {tx(item.label, language)}
                                    <span className={`transition-transform group-hover:translate-x-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>→</span>
                                </div>
                                {item.desc && <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{tx(item.desc, language)}</div>}
                            </div>
                        </Link>
                    ))}
                </div>
            )
        case 'table':
            return (
                <div key={i} className="mt-4 overflow-x-auto">
                    <table className={`w-full text-sm border-collapse rounded-xl overflow-hidden`}>
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                {block.headers.map((h, j) => <th key={j} className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{tx(h, language)}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    {row.map((cell, k) => <td key={k} className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tx(cell, language)}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        case 'qa':
            return (
                <QAItem key={i} question={block.question} answer={block.answer} code={block.code} darkMode={darkMode} />
            )
        case 'exercise':
            return <ExerciseBlock key={i} block={block} darkMode={darkMode} />
        case 'comparison':
            return <ComparisonBlock key={i} block={block} darkMode={darkMode} language={language} />
        case 'quiz':
            return <QuizBlock key={i} block={block} darkMode={darkMode} language={language} onQuizCorrect={onQuizCorrect} />
        case 'visual':
            return <VisualBlock key={i} block={block} darkMode={darkMode} language={language} />
        case 'callout':
            return <CalloutBlock key={i} block={block} darkMode={darkMode} />
        case 'java-compare':
            return <JavaCompareBlock key={i} block={block} darkMode={darkMode} />

        case 'postman-compare':
            return <PostmanCompareBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'editor':
            if (block.lang === 'typescript')
                return <TSEditor key={i} defaultCode={block.defaultCode || block.code || ''} height={block.height} />
            if (block.lang === 'sql')
                return <SQLEditor key={i} defaultCode={block.defaultCode || block.code || ''} schema={block.schema} height={block.height} />
            return <PyodideEditor key={i} defaultCode={block.defaultCode || block.code || ''} height={block.height} />
        case 'java-practice':
            return <JavaPracticeBlock key={i} block={block} darkMode={darkMode} language={language} />
        case 'git-practice':
            return <GitPracticeBlock key={i} block={block} darkMode={darkMode} language={language} />

        // ── New block types ────────────────────────────────────────────────────

        case 'simple-box':
            return (
                <div key={i} className="mt-4 p-4 rounded-xl border-2 flex items-start gap-3" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
                    <span className="text-2xl flex-shrink-0">{block.emoji || '💡'}</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>
                        {tx(block.content, language)}
                    </p>
                </div>
            )

        case 'glossary-term':
            return (
                <div key={i} className={`mt-4 rounded-xl border overflow-hidden ${darkMode ? 'border-purple-800 bg-purple-900/10' : 'border-purple-200 bg-purple-50'}`}>
                    <div className={`px-4 py-2 font-mono font-bold text-sm ${darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                        📖 {block.term}
                    </div>
                    <div className="p-4 space-y-2.5">
                        {block.items?.map((item, j) => (
                            <div key={j} className={`flex items-start gap-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                                <div>
                                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {tx(item.label, language)}:
                                    </span>{' '}
                                    <span>{tx(item.content, language)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'glossary-section':
            return (
                <div key={i} className={`mt-8 p-5 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span className="text-xl">📚</span>
                        <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {language === 'tr' ? 'Terimler Sözlüğü' : 'Glossary'}
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {block.terms?.map((item, j) => (
                            <div key={j} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                <div className={`font-mono font-bold text-sm mb-1 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>{item.term}</div>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {tx(item.definition, language)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'interview-questions': {
            const sectionTitleStr = (typeof sectionTitle === 'string' ? sectionTitle : '').toLowerCase()
            const hideHeading = sectionTitleStr.includes('mülakat') || sectionTitleStr.includes('interview')
            return <InterviewQuestionsBlock key={i} block={block} darkMode={darkMode} hideHeading={hideHeading} />
        }

        case 'error-dictionary': {
            const sectionTitleStr = (typeof sectionTitle === 'string' ? sectionTitle : '').toLowerCase()
            const hideHeading = sectionTitleStr.includes('sözlüğü') || sectionTitleStr.includes('dictionary')
            return <ErrorDictionaryBlock key={i} block={block} darkMode={darkMode} hideHeading={hideHeading} />
        }

        case 'quiz-fill':
            return <QuizFillBlock key={i} block={block} darkMode={darkMode} />

        case 'installation':
            return (
                <div key={i} className="mt-4">
                    {block.title && (
                        <h4 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {tx(block.title, language)}
                        </h4>
                    )}
                    <div className="space-y-2">
                        {block.steps?.map((step, j) => (
                            <div key={j} className={`rounded-xl border overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-3">
                                    <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-700 text-gray-200'}`}>{j + 1}</span>
                                    <code className="font-mono text-sm text-green-400 flex-1">{step.cmd}</code>
                                    {step.cmd_mac && <code className="font-mono text-xs text-gray-500 hidden md:block">{step.cmd_mac}</code>}
                                </div>
                                <div className={`px-4 py-2 text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                                    {tx(step.explanation, language)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )

        case 'file-tree':
            return (
                <div key={i} className={`mt-4 rounded-xl border overflow-hidden ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {block.title && (
                        <div className="px-4 py-2.5 text-sm font-semibold bg-gray-800 text-gray-100 flex items-center gap-2 border-b border-gray-700">
                            📁 {tx(block.title, language)}
                        </div>
                    )}
                    <div style={{ background: '#0d1117' }}>
                        <pre className="font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto p-4 m-0" style={{ background: '#0d1117', color: '#e6edf3' }}>{block.tree}</pre>
                    </div>
                    {block.note && (
                        <div className={`px-4 py-2 text-xs italic border-t ${darkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-300'}`}>
                            💡 {tx(block.note, language)}
                        </div>
                    )}
                </div>
            )

        case 'diagram-svg':
            return (
                <div key={i} className="mt-5">
                    {block.title && (
                        <div className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {tx(block.title, language)}
                        </div>
                    )}
                    <div
                        className="rounded-xl overflow-hidden w-full"
                        dangerouslySetInnerHTML={{ __html: block.svg }}
                    />
                </div>
            )

        case 'locator-visual':
            return <LocatorVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'selenium-visual':
            return <SeleniumVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'playwright-visual':
            return <PlaywrightVisualBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'simulation':
            return <SimulationBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'animated-timeline':
            return <AnimatedTimelineBlock key={i} block={block} darkMode={darkMode} language={language} />

        case 'drag-order':
            return <DragOrderBlock key={i} block={block} darkMode={darkMode} language={language} />

        default:
            return null
    }
}

// ─── TopicPage ────────────────────────────────────────────────────────────────

function TopicPage({ data, gradient, bgLight, extraBanner }) {
    const { language } = useLanguage()
    const location = useLocation()
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
        return isDark
    })
    const [activeTab, setActiveTab] = useState(() => location.state?.openTab ?? 0)
    const isInitialTabRender = useRef(true)
    const tabsLayoutRef = useRef(null)
    const [completedTabs, setCompletedTabs] = useState(() => {
        try {
            const d = data['tr'] || data['en']
            const key = (d?.hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            const saved = localStorage.getItem(`progress_${key}`)
            return saved ? JSON.parse(saved) : {}
        } catch { return {} }
    })
    const [quizVerifiedTabs, setQuizVerifiedTabs] = useState(() => {
        try {
            const d = data['tr'] || data['en']
            const key = (d?.hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            const saved = localStorage.getItem(`quizProgress_${key}`)
            return saved ? JSON.parse(saved) : {}
        } catch { return {} }
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        window.scrollTo(0, 0)
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
    }, [darkMode])

    useEffect(() => {
        if (isInitialTabRender.current) {
            isInitialTabRender.current = false
            window.scrollTo({ top: 0, behavior: 'auto' })
            return
        }
        // Tab switches scroll to the tab list itself, not the page top —
        // otherwise every click re-shows the hero banner the user already scrolled past.
        tabsLayoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [activeTab])

    const content = data[language] || data['en']
    const { hero, tabs, sections } = content
    const pageKey = (hero?.title || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    const completedCount = tabs?.filter((_, index) => completedTabs[index] || quizVerifiedTabs[index]).length || 0
    const quizVerifiedCount = Object.values(quizVerifiedTabs).filter(Boolean).length

    const toggleTabComplete = (tabIndex, e) => {
        e.stopPropagation()
        const isCompleted = !!completedTabs[tabIndex] || !!quizVerifiedTabs[tabIndex]
        const updatedCompleted = { ...completedTabs }
        const updatedQuiz = { ...quizVerifiedTabs }

        if (isCompleted) {
            delete updatedCompleted[tabIndex]
            delete updatedQuiz[tabIndex]
        } else {
            updatedCompleted[tabIndex] = true
        }

        setCompletedTabs(updatedCompleted)
        setQuizVerifiedTabs(updatedQuiz)
        try { localStorage.setItem(`progress_${pageKey}`, JSON.stringify(updatedCompleted)) } catch { }
        try { localStorage.setItem(`quizProgress_${pageKey}`, JSON.stringify(updatedQuiz)) } catch { }
    }

    const handleQuizCorrect = () => {
        // Auto-mark tab as completed and record quiz-verified status
        setCompletedTabs(prev => {
            const updated = { ...prev, [activeTab]: true }
            try { localStorage.setItem(`progress_${pageKey}`, JSON.stringify(updated)) } catch { }
            return updated
        })
        setQuizVerifiedTabs(prev => {
            const updated = { ...prev, [activeTab]: true }
            try { localStorage.setItem(`quizProgress_${pageKey}`, JSON.stringify(updated)) } catch { }
            return updated
        })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : bgLight}`}>
            <ScrollProgressBar />
            <HomeButton />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-3 py-4 md:px-4 md:py-8 max-w-7xl">
                {/* Hero */}
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 bg-gradient-to-r ${gradient} text-white shadow-xl`}>
                    <h1 className="text-xl md:text-4xl font-bold mb-1 md:mb-2">{hero.title}</h1>
                    <p className="text-sm md:text-xl opacity-90">{hero.subtitle}</p>
                    <p className="mt-2 md:mt-3 opacity-80 max-w-3xl text-xs md:text-sm leading-relaxed hidden sm:block">{hero.intro}</p>
                </div>

                {/* Extra Banner (e.g. resource link) */}
                {extraBanner}

                {/* Sidebar + Content layout */}
                <div ref={tabsLayoutRef} className="flex gap-3 md:gap-5 items-start">

                    {/* Vertical Sidebar Tabs */}
                    <div className={`flex-shrink-0 w-10 md:w-52 self-start sticky top-3 rounded-xl p-1 md:p-2 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                        {/* Progress counter — desktop only */}
                        {completedCount > 0 && (
                            <div className="hidden md:block mb-2 px-2">
                                <div className={`text-xs font-semibold mb-1 flex items-center justify-between ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span>{completedCount}/{tabs.length} {language === 'tr' ? 'tamamlandı' : 'completed'}</span>
                                    {quizVerifiedCount > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                                            🧠 {quizVerifiedCount} quiz
                                        </span>
                                    )}
                                </div>
                                <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(completedCount / tabs.length) * 100}%`,
                                            background: quizVerifiedCount > 0 ? 'linear-gradient(to right, #8b5cf6, #10b981)' : '#10b981'
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            {tabs.map((tab, i) => {
                                const isCompleted = !!completedTabs[i] || !!quizVerifiedTabs[i]
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTab(i)}
                                        title={tab}
                                        className={`w-full text-left rounded-lg font-semibold transition-all duration-200 ${activeTab === i
                                            ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                                            : darkMode
                                                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                            } px-1.5 py-2 md:px-3 md:py-2.5`}
                                    >
                                        {/* Mobile: emoji + dot if completed */}
                                        <span className="md:hidden text-base text-center block leading-none relative">
                                            {[...tab][0]}
                                            {isCompleted && (
                                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white bg-green-400" />
                                            )}
                                        </span>
                                        {/* Desktop: label + completion toggle */}
                                        <span className="hidden md:flex items-center justify-between gap-1 text-xs leading-snug">
                                            <span className="flex-1 truncate">{tab}</span>
                                            <span
                                                role="checkbox"
                                                aria-checked={isCompleted}
                                                onClick={(e) => toggleTabComplete(i, e)}
                                                title={isCompleted
                                                    ? (language === 'tr' ? 'Tamamlandı — kaldır' : 'Completed — remove')
                                                    : (language === 'tr' ? 'Tamamlandı işaretle' : 'Mark completed')}
                                                className={`flex-shrink-0 w-4 h-4 rounded border transition-all cursor-pointer flex items-center justify-center ${isCompleted
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : darkMode
                                                        ? 'border-gray-600 hover:border-green-400'
                                                        : 'border-gray-300 hover:border-green-500'
                                                    }`}
                                            >
                                                {isCompleted && <span className="text-white leading-none" style={{ fontSize: '10px' }}>✓</span>}
                                            </span>
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main content + pagination */}
                    <div className="flex-1 min-w-0">
                        {/* Content */}
                        <div className={`rounded-2xl p-4 md:p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {tx(sections[activeTab]?.title, language)}
                            </h2>
                            {sections[activeTab]?.blocks?.map((block, i) => renderBlock(block, i, darkMode, language, handleQuizCorrect, tx(sections[activeTab]?.title, language)))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between mt-4 md:mt-6 gap-4">
                            {activeTab > 0 && (
                                <button
                                    onClick={() => setActiveTab(activeTab - 1)}
                                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                                >
                                    ← {tabs[activeTab - 1]}
                                </button>
                            )}
                            {activeTab < tabs.length - 1 && (
                                <button
                                    onClick={() => setActiveTab(activeTab + 1)}
                                    className={`ml-auto flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all bg-gradient-to-r ${gradient} text-white hover:shadow-lg`}
                                >
                                    {tabs[activeTab + 1]} →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TopicPage
