import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import OrderSort from './challenges/OrderSort'
import { logActivity } from '../lib/activityLog'

// ─── Shared helpers ───────────────────────────────────────────────────────────

const codeCommentTranslations = [
    [/browser binaries indir/g, 'download browser binaries'],
    [/HTML rapor/g, 'HTML report'],
    [/Allure entegrasyonu/g, 'Allure integration'],
    [/mock\/stub desteği/g, 'mock/stub support'],
    [/Shared fixtures \(driver, base_url vb\.\)/g, 'Shared fixtures (driver, base_url, etc.)'],
    [/pytest otomatik bulur/g, 'pytest auto-discovers it'],
    [/Selenium gerektirmeyen API testleri/g, 'API tests that do not require Selenium'],
    [/Test verisi/g, 'Test data'],
    [/Oluşturulan raporlar \(git'e ekleme\)/g, 'Generated reports (do not commit to git)'],
    [/Markers \(smoke, regression gibi\)/g, 'Markers (smoke, regression, etc.)'],
    [/her test için yeni driver \(default\)/g, 'new driver for each test (default)'],
    [/aynı sınıf içindeki testler paylaşır/g, 'tests in the same class share it'],
    [/aynı dosyadaki testler paylaşır/g, 'tests in the same file share it'],
    [/tüm test oturumu boyunca tek driver/g, 'one driver for the whole test session'],
    [/CI\/CD için/g, 'for CI/CD'],
    [/Java'daki @AfterMethod buradan sonrası/g, 'Java @AfterMethod equivalent starts after this'],
    [/Tüm testlerde kullanılan base URL/g, 'Base URL used in all tests'],
    [/Login yapılmış driver — bağımlı fixture/g, 'Logged-in driver - dependent fixture'],
    [/Kullanımı:/g, 'Usage:'],
    [/ID ile/g, 'By ID'],
    [/CSS Selector ile \(en önerilen\)/g, 'By CSS selector (recommended)'],
    [/XPath ile \(dinamik yapılar için\)/g, 'By XPath (for dynamic structures)'],
    [/Birden fazla element/g, 'Multiple elements'],
    [/Locate stratejisi seçimi/g, 'Locator strategy selection'],
    [/varsa en hızlı ve en güvenli/g, 'fastest and safest when available'],
    [/esnek, hızlı, okunabilir/g, 'flexible, fast, readable'],
    [/karmaşık DOM için; yavaş, kırılgan/g, 'for complex DOM; slower and fragile'],
    [/birden fazla class olunca sorun çıkarır/g, 'breaks when multiple classes exist'],
    [/Yanlış — sabit bekleme, CI'da yavaş\/güvensiz/g, 'Wrong - fixed wait, slow/unsafe in CI'],
    [/Implicit Wait — driver seviyesinde global bekleme/g, 'Implicit wait - global driver-level wait'],
    [/conftest\.py'de bir kez set et/g, 'set once in conftest.py'],
    [/10 saniye maksimum bekler/g, 'waits up to 10 seconds'],
    [/Explicit Wait — belirli bir condition için bekle/g, 'Explicit wait - wait for a specific condition'],
    [/Element görünür olana kadar bekle/g, 'Wait until element is visible'],
    [/Element tıklanabilir olana kadar bekle/g, 'Wait until element is clickable'],
    [/URL değişene kadar bekle/g, 'Wait until URL changes'],
    [/Text görünene kadar bekle/g, 'Wait until text appears'],
    [/Alert açılana kadar bekle/g, 'Wait until alert appears'],
    [/Element kaybolana kadar bekle \(loading spinner\)/g, 'Wait until element disappears (loading spinner)'],
    [/iframe'e geçiş yöntemleri/g, 'Ways to switch to an iframe'],
    [/Index ile \(sayfadaki sırasına göre\)/g, 'By index (page order)'],
    [/Name veya ID ile/g, 'By name or ID'],
    [/WebElement ile \(en güvenilir yöntem\)/g, 'By WebElement (most reliable method)'],
    [/iframe içinde normal işlem yap/g, 'Perform normal actions inside the iframe'],
    [/Ana sayfaya geri dön \(ZORUNLU!\)/g, 'Return to the main page (required!)'],
    [/İç içe iframe \(nested iframe\)/g, 'Nested iframe'],
    [/outer içindeki inner'a geç/g, 'switch to inner inside outer'],
    [/\.\.\. işlemler \.\.\./g, '... actions ...'],
    [/direkt ana sayfaya dön/g, 'return directly to main page'],
    [/Fixture ile temiz kullanım/g, 'Clean usage with a fixture'],
    [/with bloğu ile otomatik giriş\/çıkış/g, 'automatic enter/exit with a with block'],
    [/Shadow DOM'a erişim — JavaScript ile/g, 'Access Shadow DOM with JavaScript'],
    [/Shadow host'un shadow root'unu döndürür/g, "Returns the shadow host's shadow root"],
    [/Örnek: Chrome ayarları sayfasındaki shadow DOM/g, 'Example: Chrome settings page shadow DOM'],
    [/Örnek:/g, 'Example:'],
    [/Shadow host elementini bul/g, 'Find the shadow host element'],
    [/Shadow root içinde element bul \(CSS selector ile\)/g, 'Find an element inside shadow root (with CSS selector)'],
    [/Shadow root içindeki elementi bul/g, 'Find the element inside shadow root'],
    [/İç içe Shadow DOM/g, 'Nested Shadow DOM'],
    [/Kullanım: shadow1 > shadow2 > hedef element/g, 'Usage: shadow1 > shadow2 > target element'],
    [/Bazı sürümlerde doğrudan CSS piercing desteklenir:/g, 'Some versions support direct CSS piercing:'],
    [/Bu sözdizimi tüm tarayıcılarda çalışmaz, JS yolu daha güvenli/g, 'This syntax does not work in every browser; the JS path is safer'],
    [/Tüm testleri çalıştır/g, 'Run all tests'],
    [/Belirli dosya/g, 'Specific file'],
    [/Belirli test fonksiyonu/g, 'Specific test function'],
    [/Temel kurulum/g, 'Basic install'],
    [/Web otomasyon \(Selenium tabanlı\)/g, 'Web automation (Selenium-based)'],
    [/API testi/g, 'API testing'],
    [/SeleniumLibrary için ChromeDriver gerekir/g, 'SeleniumLibrary needs ChromeDriver'],
    [/webdriver-manager ile otomatik yönet:/g, 'manage it automatically with webdriver-manager:'],
    [/Paylaşılan keyword'ler/g, 'Shared keywords'],
    [/Login'e özel keyword'ler/g, 'Login-specific keywords'],
    [/Değişkenler \(URL, kullanıcılar vb\.\)/g, 'Variables (URL, users, etc.)'],
    [/Python ile yazılan custom keyword'ler/g, 'Custom keywords written in Python'],
    [/robot otomatik oluşturur/g, 'robot creates this automatically'],
    [/Geçerli kullanıcı giriş yapabilmeli/g, 'Valid user should be able to log in'],
    [/Geçersiz kullanıcı hata mesajı görmeli/g, 'Invalid user should see an error message'],
    [/ID \(id: prefix isteğe bağlı — Robot otomatik dener\)/g, 'ID (id: prefix optional - Robot tries automatically)'],
    [/id veya name olarak arar/g, 'tries id or name'],
    [/Data attribute \(çok kullanışlı\)/g, 'Data attribute (very useful)'],
    [/nth-child ile tablo satırı/g, 'table row with nth-child'],
    [/iframe'e geç — index, name, id veya locator ile/g, 'switch to iframe - by index, name, id, or locator'],
    [/veya: Select Frame/g, 'or: Select Frame'],
    [/ilk iframe, index ile/g, 'first iframe, by index'],
    [/Ana sayfaya geri dön — zorunlu!/g, 'Return to main page - required!'],
    [/Devam et/g, 'Continue'],
    [/Dış iframe/g, 'Outer iframe'],
    [/İç iframe/g, 'Inner iframe'],
    [/Direkt ana sayfaya dön/g, 'Return directly to main page'],
    [/JavaScript ile shadow root'a eriş/g, 'Access shadow root with JavaScript'],
    [/Shadow root içindeki elementi JavaScript ile bul ve tıkla/g, 'Find and click the element inside shadow root with JavaScript'],
    [/Elementi görünür alana kaydırır/g, 'Scrolls the element into view'],
    [/Tek dosyayı çalıştır/g, 'Run a single file'],
    [/Tüm test klasörünü çalıştır/g, 'Run the whole test folder'],
    [/Tag ile filtrele \(sadece smoke testleri\)/g, 'Filter by tag (smoke tests only)'],
    [/Tag hariç tut/g, 'Exclude a tag'],
    [/Özel rapor klasörü/g, 'Custom report folder'],
    [/Paralel \(pabot — pip install robotframework-pabot\)/g, 'Parallel (pabot - pip install robotframework-pabot)'],
    [/Belirli test case/g, 'Specific test case'],
    [/Variables override \(CI\/CD için\)/g, 'Override variables (for CI/CD)'],
]

function localizeCodeComments(code, language) {
    if (language === 'tr') return code
    return codeCommentTranslations.reduce(
        (translated, [pattern, replacement]) => translated.replace(pattern, replacement),
        code
    )
}

function Code({ children, lang = 'python' }) {
    const { language } = useLanguage()
    const [copied, setCopied] = useState(false)
    const code = localizeCodeComments(String(children ?? ''), language).trim()

    return (
        <div className="relative group mt-3">
            {lang && (
                <div className="absolute top-2 left-3 z-10 text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 font-mono select-none">
                    {lang}
                </div>
            )}
            <pre className="p-4 pt-8 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-slate-600"
                style={{ background: '#1e2030', color: '#c0caf5' }}>
                {code}
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? '✅ Copied' : '📋 Copy'}
            </button>
        </div>
    )
}

function Section({ title, children, darkMode }) {
    return (
        <div className="mb-8">
            <h3 className={`text-base font-bold mb-4 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                {title}
            </h3>
            {children}
        </div>
    )
}

function SimpleBox({ emoji, children }) {
    return (
        <div className="p-4 rounded-xl border-2 flex items-start gap-3 mb-6" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
            <span className="text-2xl flex-shrink-0">{emoji}</span>
            <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>{children}</p>
        </div>
    )
}

function JavaBox({ darkMode, tr, children }) {
    return (
        <div className={`p-4 rounded-xl border-l-4 border-yellow-500 mt-4 ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
            <div className={`font-bold text-xs mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                ☕ {tr ? 'Java Biliyorsan' : 'If You Know Java'}
            </div>
            <div className={`text-sm leading-relaxed ${darkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>{children}</div>
        </div>
    )
}

// ─── PYTEST FIXTURE PRACTICE ─────────────────────────────────────────────────

const FIXTURE_STARTER_TR = `import pytest

# Bu fixture'ı tamamla: browser driver'ı başlat ve test bittikten sonra kapat
@pytest.fixture(scope="???")   # Her test için ayrı driver istiyoruz
def driver():
    from selenium import webdriver
    drv = webdriver.Chrome()
    ???                         # test fonksiyonuna driver'ı ver
    drv.???()                   # test bittikten sonra kapat`

const FIXTURE_SOLUTION_TR = `import pytest

@pytest.fixture(scope="function")  # Her test için ayrı driver
def driver():
    from selenium import webdriver
    drv = webdriver.Chrome()
    yield drv                       # test fonksiyonuna driver'ı ver
    drv.quit()                      # test bittikten sonra kapat`

const FIXTURE_STARTER_EN = `import pytest

# Complete this fixture: start a browser driver and quit after each test
@pytest.fixture(scope="???")   # We want a fresh driver for every test
def driver():
    from selenium import webdriver
    drv = webdriver.Chrome()
    ???                         # hand the driver to the test function
    drv.???()                   # quit after the test finishes`

const FIXTURE_SOLUTION_EN = `import pytest

@pytest.fixture(scope="function")  # Fresh driver for each test
def driver():
    from selenium import webdriver
    drv = webdriver.Chrome()
    yield drv                       # hand the driver to the test function
    drv.quit()                      # quit after the test finishes`

function PytestFixturePractice({ darkMode, tr }) {
    const [code, setCode] = useState(tr ? FIXTURE_STARTER_TR : FIXTURE_STARTER_EN)
    const [result, setResult] = useState(null)

    const check = () => {
        const clean = code.replace(/\s+/g, ' ').trim()
        const hasYield = /\byield\b/.test(clean)
        const hasQuit = /\.quit\(\)/.test(clean)
        const hasFunctionScope = /scope\s*=\s*["']function["']/.test(clean)
        const missing = []
        if (!hasYield) missing.push(tr ? 'yield' : 'yield')
        if (!hasQuit) missing.push(tr ? '.quit()' : '.quit()')
        if (!hasFunctionScope) missing.push(tr ? 'scope="function"' : 'scope="function"')
        if (missing.length === 0) {
            setResult({ ok: true, msg: tr ? '✅ Mükemmel! yield drv driver\'ı teslim eder, drv.quit() teardown\'ı yapar — scope="function" her teste taze driver sağlar.' : '✅ Perfect! yield drv hands the driver over, drv.quit() is the teardown — scope="function" gives every test a fresh driver.' })
        } else {
            setResult({ ok: false, msg: (tr ? '❌ Eksik: ' : '❌ Missing: ') + missing.join(', ') })
        }
    }

    const reset = () => {
        setCode(tr ? FIXTURE_STARTER_TR : FIXTURE_STARTER_EN)
        setResult(null)
    }

    const panel = darkMode ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'

    return (
        <div>
            <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tr
                    ? '??? olan yerleri doldur: scope değeri, driver\'ı teslim eden ifade ve kapatma metodu. Çözümü kontrol et.'
                    : 'Fill in the ??? placeholders: the scope value, the expression that hands the driver to the test, and the cleanup call. Then check.'}
            </p>
            <textarea
                value={code}
                onChange={e => { setCode(e.target.value); setResult(null) }}
                rows={9}
                spellCheck={false}
                className={`w-full rounded-lg border p-3 font-mono text-xs leading-relaxed resize-none ${panel}`}
                style={{ background: darkMode ? '#1e2030' : '#f8fafc' }}
            />
            <div className="flex gap-2 mt-2">
                <button
                    onClick={check}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                >
                    {tr ? '✅ Kontrol Et' : '✅ Check'}
                </button>
                <button
                    onClick={reset}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {tr ? '🔄 Sıfırla' : '🔄 Reset'}
                </button>
                {result && (
                    <button
                        onClick={() => setCode(tr ? FIXTURE_SOLUTION_TR : FIXTURE_SOLUTION_EN)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${darkMode ? 'bg-yellow-800 text-yellow-200 hover:bg-yellow-700' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                    >
                        {tr ? '💡 Çözümü Gör' : '💡 Show Solution'}
                    </button>
                )}
            </div>
            {result && (
                <div className={`mt-3 rounded-lg p-3 text-sm font-medium ${result.ok ? (darkMode ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-50 text-emerald-800') : (darkMode ? 'bg-red-900/40 text-red-300' : 'bg-red-50 text-red-800')}`}>
                    {result.msg}
                </div>
            )}
        </div>
    )
}

// ─── LIVE PYTEST RUNNER SIMULATION ────────────────────────────────────────────

function PytestRunnerSim({ darkMode, tr }) {
    const [phase, setPhase] = useState('idle')
    const timersRef = useRef([])

    const order = ['idle', 'collecting', 't1', 't2', 't3', 't4', 't5', 'done']
    const cur = order.indexOf(phase)
    const canStart = phase === 'idle' || phase === 'done'

    const tests = [
        { id: 't1', name: 'test_valid_login', pass: true, pct: 20 },
        { id: 't2', name: 'test_invalid_login', pass: true, pct: 40 },
        { id: 't3', name: "test_login_validation[--pass-required]", pass: true, pct: 60 },
        { id: 't4', name: "test_login_validation[notanemail-pass-invalid]", pass: false, pct: 80 },
        { id: 't5', name: "test_login_validation[valid@test.com--required]", pass: true, pct: 100 },
    ]

    const run = () => {
        if (!canStart) return
        timersRef.current.forEach(clearTimeout)
        setPhase('collecting')
        let delay = 500
        const steps = [['t1', 700], ['t2', 450], ['t3', 450], ['t4', 600], ['t5', 450], ['done', 400]]
        timersRef.current = steps.map(([st, d]) => {
            delay += d
            return setTimeout(() => setPhase(st), delay)
        })
    }
    const reset = () => {
        timersRef.current.forEach(clearTimeout)
        setPhase('idle')
    }

    const PT = { bg: '#1e2030', border: '#3b3f58', text: '#c0caf5', muted: '#6b7394', green: '#9ece6a', red: '#f7768e', yellow: '#e0af68' }
    const passedSoFar = tests.filter(t => order.indexOf(t.id) <= cur && phase !== 'idle' && phase !== 'collecting' && t.pass).length
    const failedSoFar = tests.filter(t => order.indexOf(t.id) <= cur && phase !== 'idle' && phase !== 'collecting' && !t.pass).length

    return (
        <div className="grid md:grid-cols-2 gap-4 mt-3">
            {/* Left: terminal */}
            <div style={{ background: PT.bg, borderRadius: 10, border: `1px solid ${PT.border}`, overflow: 'hidden', fontFamily: 'monospace' }}>
                <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${PT.border}`, background: '#16182a' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f7768e', display: 'inline-block' }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#e0af68', display: 'inline-block' }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#9ece6a', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, color: PT.muted, marginLeft: 4 }}>Terminal</span>
                    <button
                        onClick={run}
                        disabled={!canStart}
                        style={{ marginLeft: 'auto', background: !canStart ? PT.muted : '#9ece6a', color: '#1e2030', border: 'none', borderRadius: 5, padding: '3px 10px', fontSize: 10, fontWeight: 700, cursor: canStart ? 'pointer' : 'not-allowed' }}
                    >
                        {phase === 'idle' ? '▶ pytest -v' : phase === 'done' ? '▶ ' + (tr ? 'Tekrar' : 'Again') : '⏳'}
                    </button>
                </div>
                <div style={{ padding: '10px 12px', fontSize: 10.5, lineHeight: 1.9, minHeight: 170 }}>
                    {phase === 'idle' && <div style={{ color: PT.muted }}>{tr ? '$ Çalıştırmak için ▶ pytest -v\'ye bas' : '$ Press ▶ pytest -v to run'}</div>}
                    {cur >= order.indexOf('collecting') && (
                        <div style={{ color: PT.text }}>$ pytest tests/test_login.py -v</div>
                    )}
                    {cur >= order.indexOf('collecting') && (
                        <div style={{ color: PT.muted, marginTop: 2 }}>===== test session starts ===== {'\n'}collected 5 items</div>
                    )}
                    {tests.map((t) => {
                        const tIdx = order.indexOf(t.id)
                        if (tIdx > cur) return null
                        return (
                            <div key={t.id} style={{ color: t.pass ? PT.green : PT.red, marginTop: 2 }}>
                                {t.name} {t.pass ? 'PASSED' : 'FAILED'} <span style={{ color: PT.muted }}>[{t.pct}%]</span>
                            </div>
                        )
                    })}
                    {phase === 'done' && (
                        <div style={{ marginTop: 8, color: failedSoFar > 0 ? PT.yellow : PT.green, fontWeight: 700 }}>
                            ===== {failedSoFar} failed, {passedSoFar} passed in 2.34s =====
                        </div>
                    )}
                </div>
            </div>

            {/* Right: results panel */}
            <div style={{ padding: 12, borderRadius: 10, border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, background: darkMode ? '#111827' : '#f9fafb' }}>
                <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    📊 {tr ? 'Test Sonuçları' : 'Test Results'}
                </div>
                {phase === 'idle' && (
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tr ? 'Henüz test çalışmadı.' : 'No tests run yet.'}</div>
                )}
                {cur >= order.indexOf('collecting') && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 rounded-lg text-center" style={{ background: '#9ece6a18', border: '1px solid #9ece6a55' }}>
                            <div className="text-lg font-bold" style={{ color: '#5fa83f' }}>{passedSoFar}</div>
                            <div className="text-[10px]" style={{ color: '#5fa83f' }}>{tr ? 'Geçti' : 'Passed'}</div>
                        </div>
                        <div className="p-2 rounded-lg text-center" style={{ background: '#f7768e18', border: '1px solid #f7768e55' }}>
                            <div className="text-lg font-bold" style={{ color: '#c2475c' }}>{failedSoFar}</div>
                            <div className="text-[10px]" style={{ color: '#c2475c' }}>{tr ? 'Kaldı' : 'Failed'}</div>
                        </div>
                    </div>
                )}
                {cur >= order.indexOf('t4') && (
                    <div className="p-2.5 rounded-lg mb-3" style={{ background: darkMode ? '#3b0d14' : '#fef2f2', border: '1px solid #f7768e55' }}>
                        <div className="text-[10px] font-bold mb-1" style={{ color: darkMode ? '#fb7185' : '#9f1239' }}>
                            ❌ AssertionError — test_login_validation[notanemail-pass-invalid]
                        </div>
                        <pre className="text-[9.5px] font-mono whitespace-pre-wrap" style={{ color: darkMode ? '#fca5a5' : '#991b1b' }}>
{`assert 'invalid' in page.error_message().lower()
AssertionError: expected substring 'invalid'
not found in 'please enter a valid email'`}
                        </pre>
                    </div>
                )}
                {phase === 'done' && (
                    <div className="p-2.5 rounded-lg" style={{ background: darkMode ? '#1f2937' : '#fff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                        <div className={`text-[10px] font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>📄 pytest-html</div>
                        <div className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>reports/report.html <span style={{ color: darkMode ? '#84cc16' : '#3f6212' }}>{tr ? 'oluşturuldu' : 'generated'}</span></div>
                    </div>
                )}
                {phase !== 'idle' && (
                    <button onClick={reset} className={`mt-3 w-full text-xs py-1.5 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                        🔄 {tr ? 'Sıfırla' : 'Reset'}
                    </button>
                )}
            </div>
        </div>
    )
}

// ─── PYTEST TAB ───────────────────────────────────────────────────────────────

function PytestTab({ darkMode, tr }) {
    const text = `text-sm leading-relaxed mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`

    return (
        <div>
            <SimpleBox emoji="🐍">
                {tr
                    ? 'pytest, bir levye gibi çalışır — az kuvvetle çok iş yapar, ama mekanizma önemli: Java\'da JUnit için sınıf + @Test + assertion import gerekir; pytest\'te fonksiyon adı test_ ile başlarsa yeterlidir ve assert a == b satırı hata mesajını kendisi üretir. Yalnızca sözdizimi değil, işin kendisi daha az bürokratik. Peki JUnit yeteri kadar güçlüyken neden pytest\'i öğrenmek zorunlu? Çünkü Python QA ekosisteminin standartı: bir CI pipeline\'ı, bir Dockerfile veya bir Makefile\'daki pytest komutu gördüğünde anlayamıyorsan, takımın kolektif hafızasının dışındasın. Mülakatlarda "neden pytest seçtiniz?" sorusu fixture scope kontrolünü ve plugin ekosistemini cevap bekler — "çünkü Java\'da JUnit vardı" cevabı değil.'
                    : 'pytest works like a crowbar — it does more with less effort, but the mechanism matters: in Java you need a class, @Test, and an assertion import; in pytest any function starting with test_ qualifies and assert a == b generates its own failure message. It is not just different syntax — the bureaucratic overhead is genuinely lower. Why learn pytest if JUnit was already powerful enough? Because pytest is the standard of the Python QA ecosystem: if you cannot read a pytest command in a CI pipeline, Dockerfile, or Makefile, you are outside the team\'s collective knowledge. In QA interviews, "why pytest?" expects an answer about fixture scope control and the plugin ecosystem — not "because we had JUnit in Java."'}
            </SimpleBox>

            {/* Why pytest */}
            <Section title={tr ? '🎯 Neden pytest Seçmeli?' : '🎯 Why Choose pytest?'} darkMode={darkMode}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
                    {(tr ? [
                        ['🔥 En popüler', 'Python test ekosisteminin standartı. Stack Overflow\'daki soruların %80\'i pytest hakkında — çözüm bulmak kolay.'],
                        ['🔌 Plugin ekosistemi', 'pytest-html, pytest-xdist, allure-pytest, pytest-mock, pytest-cov — 1000+ plugin mevcut.'],
                        ['📐 Fixture sistemi', '@pytest.fixture ile setup/teardown yönetimi. Java\'daki @BeforeEach\'ten çok daha esnek — scope kontrolü var.'],
                        ['🔁 Parametrize', '@pytest.mark.parametrize ile aynı testi farklı veriyle çalıştır. Java TestNG\'deki @DataProvider\'ın daha temiz versiyonu.'],
                        ['📊 Raporlama', 'pytest-html ile HTML rapor, Allure ile görsel rapor. Maven Surefire raporunun görsel karşılığı.'],
                        ['⚡ Hız', 'pytest-xdist ile paralel test — birden fazla CPU kullan. Selenium testleri 5x hızlanır.'],
                    ] : [
                        ['🔥 Most popular', 'The standard of the Python test ecosystem. 80% of Stack Overflow QA questions are about pytest.'],
                        ['🔌 Plugin ecosystem', 'pytest-html, pytest-xdist, allure-pytest, pytest-mock, pytest-cov — 1000+ plugins available.'],
                        ['📐 Fixture system', '@pytest.fixture for setup/teardown. Much more flexible than Java\'s @BeforeEach — has scope control.'],
                        ['🔁 Parametrize', '@pytest.mark.parametrize runs the same test with different data. Cleaner than TestNG\'s @DataProvider.'],
                        ['📊 Reporting', 'HTML reports via pytest-html, visual reports via Allure.'],
                        ['⚡ Speed', 'Parallel tests with pytest-xdist — use multiple CPUs. Selenium tests 5x faster.'],
                    ]).map(([title, desc]) => (
                        <div key={title} className={`p-3 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
                            <div className={`text-xs font-bold mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{title}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                        </div>
                    ))}
                </div>
                <JavaBox darkMode={darkMode} tr={tr}>
                    {tr
                        ? 'JUnit 5\'te @Test, @BeforeEach, @AfterEach, @ParameterizedTest var. pytest\'te bunların karşılıkları: def test_*(), @pytest.fixture (scope="function"), @pytest.fixture (scope="function") + yield, @pytest.mark.parametrize. Maven\'deki surefire:test → pytest komutu. Java\'da assert assertEquals(a, b) → pytest\'te sadece assert a == b yeterli, otomatik hata mesajı üretir.'
                        : 'JUnit 5 has @Test, @BeforeEach, @AfterEach, @ParameterizedTest. pytest equivalents: def test_*(), @pytest.fixture (scope="function"), yield in fixture, @pytest.mark.parametrize. Maven\'s surefire:test → the pytest command. Java\'s assert assertEquals(a,b) → just assert a == b, pytest auto-generates the error message.'}
                </JavaBox>
            </Section>

            {/* Installation */}
            <Section title={tr ? '⚙️ Kurulum' : '⚙️ Installation'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Minimum kurulum (sadece pytest):' : 'Minimal install (pytest only):'}</p>
                <Code lang="bash">{`pip install pytest`}</Code>

                <p className={`${text} mt-4`}>{tr ? 'Web otomasyon projesi için tam kurulum:' : 'Full install for web automation project:'}</p>
                <Code lang="bash">{`# Core test runner
pip install pytest

# Web automation drivers
pip install selenium
pip install playwright
python -m playwright install   # browser binaries indir

# Reporting
pip install pytest-html        # HTML rapor
pip install allure-pytest      # Allure entegrasyonu

# Useful extras
pip install pytest-xdist       # parallel execution
pip install pytest-mock        # mock/stub desteği
pip install pytest-cov         # code coverage`}</Code>

                <p className={`${text} mt-4`}>{tr ? 'Kurulumu doğrula:' : 'Verify installation:'}</p>
                <Code lang="bash">{`pytest --version
# pytest 8.x.x

python -c "import selenium; print(selenium.__version__)"
# 4.x.x`}</Code>
            </Section>

            {/* Project structure */}
            <Section title={tr ? '📁 Proje Yapısı' : '📁 Project Structure'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Gerçek dünya pytest + Selenium projesi:' : 'Real-world pytest + Selenium project:'}</p>
                <Code lang="text">{`my_project/
├── conftest.py              # Shared fixtures (driver, base_url vb.)
├── pytest.ini               # pytest config (markers, options)
├── requirements.txt         # pip install -r requirements.txt
│
├── pages/                   # Page Object Model
│   ├── __init__.py
│   ├── base_page.py         # Shared methods (wait, click, type)
│   ├── login_page.py
│   ├── dashboard_page.py
│   └── checkout_page.py
│
├── tests/
│   ├── __init__.py
│   ├── test_login.py        # test_ prefix = pytest otomatik bulur
│   ├── test_checkout.py
│   └── test_api.py          # Selenium gerektirmeyen API testleri
│
├── data/
│   ├── users.json           # Test verisi
│   └── products.csv
│
└── reports/                 # Oluşturulan raporlar (git'e ekleme)`}</Code>

                <p className={`${text} mt-4`}>{tr ? 'pytest.ini — temel config:' : 'pytest.ini — basic config:'}</p>
                <Code lang="ini">{`[pytest]
# Test discovery
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*

# Markers (smoke, regression gibi)
markers =
    smoke: critical path tests
    regression: full regression suite
    slow: tests that take > 10 seconds

# Default options
addopts = -v --tb=short --html=reports/report.html`}</Code>
            </Section>

            {/* conftest.py */}
            <Section title={tr ? '🔧 conftest.py — Shared Fixtures' : '🔧 conftest.py — Shared Fixtures'} darkMode={darkMode}>
                <p className={text}>{tr ? 'conftest.py, testlerin ortak setup/teardown\'ını tanımlar. Maven\'deki pom.xml gibi merkezi bir yapıdır — import etmene gerek yok, pytest otomatik bulur.' : 'conftest.py defines shared setup/teardown for tests. Like pom.xml in Maven — no need to import, pytest finds it automatically.'}</p>
                <Code lang="python">{`# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# scope="function" → her test için yeni driver (default)
# scope="class"    → aynı sınıf içindeki testler paylaşır
# scope="module"   → aynı dosyadaki testler paylaşır
# scope="session"  → tüm test oturumu boyunca tek driver

@pytest.fixture(scope="function")
def driver():
    """Chrome driver — Java'daki @BeforeMethod + @AfterMethod."""
    options = Options()
    # options.add_argument("--headless")  # CI/CD için
    options.add_argument("--window-size=1920,1080")
    d = webdriver.Chrome(options=options)
    d.implicitly_wait(10)       # Global implicit wait
    yield d                     # Java'daki @AfterMethod buradan sonrası
    d.quit()

@pytest.fixture(scope="session")
def base_url():
    """Tüm testlerde kullanılan base URL."""
    return "https://automationexercise.com"

@pytest.fixture
def logged_in_driver(driver, base_url):
    """Login yapılmış driver — bağımlı fixture."""
    driver.get(f"{base_url}/login")
    driver.find_element(By.ID, "email").send_keys("test@qa.com")
    driver.find_element(By.ID, "password").send_keys("admin123")
    driver.find_element(By.CSS_SELECTOR, "[data-qa='login-button']").click()
    return driver`}</Code>
            </Section>

            {/* Locators */}
            <Section title={tr ? '🎯 Element Locate Etme' : '🎯 Finding Elements (Locators)'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Selenium Python\'da By sınıfı kullanılır. Java\'daki By.id("x") → Python\'da By.ID, "x" (virgülle).' : 'Python Selenium uses the By class. Java\'s By.id("x") → Python\'s By.ID, "x" (with comma).'}</p>
                <Code lang="python">{`from selenium.webdriver.common.by import By

# --- ID ile ---
el = driver.find_element(By.ID, "username")

# --- CSS Selector ile (en önerilen) ---
el = driver.find_element(By.CSS_SELECTOR, "#username")
el = driver.find_element(By.CSS_SELECTOR, ".btn-primary")
el = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
el = driver.find_element(By.CSS_SELECTOR, "table > tbody > tr:nth-child(2)")

# --- XPath ile (dinamik yapılar için) ---
el = driver.find_element(By.XPATH, "//button[text()='Login']")
el = driver.find_element(By.XPATH, "//input[@placeholder='Email']")
el = driver.find_element(By.XPATH, "//table//tr[2]/td[1]")

# --- Name, LinkText, ClassName ---
el = driver.find_element(By.NAME, "email")
el = driver.find_element(By.LINK_TEXT, "Forgot Password?")
el = driver.find_element(By.CLASS_NAME, "product-card")

# --- Birden fazla element ---
els = driver.find_elements(By.CSS_SELECTOR, ".product-card")
print(f"Found {len(els)} products")

# --- Locate stratejisi seçimi ---
# ✅ By.ID       → varsa en hızlı ve en güvenli
# ✅ By.CSS_SELECTOR → esnek, hızlı, okunabilir
# ⚠️ By.XPATH    → karmaşık DOM için; yavaş, kırılgan
# ❌ By.CLASS_NAME   → birden fazla class olunca sorun çıkarır`}</Code>
            </Section>

            {/* Wait strategies */}
            <Section title={tr ? '⏱️ Wait Stratejileri' : '⏱️ Wait Strategies'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Dinamik web sayfalarında elementler hemen yüklenmez. time.sleep() kullanmak en kötü yöntemdir — asla kullanma.' : 'Elements on dynamic pages don\'t load instantly. Using time.sleep() is the worst approach — never use it.'}</p>
                <Code lang="python">{`from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# ❌ Yanlış — sabit bekleme, CI'da yavaş/güvensiz
import time
time.sleep(3)

# ✅ Implicit Wait — driver seviyesinde global bekleme
# conftest.py'de bir kez set et:
driver.implicitly_wait(10)   # 10 saniye maksimum bekler

# ✅ Explicit Wait — belirli bir condition için bekle
wait = WebDriverWait(driver, timeout=15)

# Element görünür olana kadar bekle
el = wait.until(EC.visibility_of_element_located((By.ID, "result")))

# Element tıklanabilir olana kadar bekle
btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "#submit")))

# URL değişene kadar bekle
wait.until(EC.url_contains("dashboard"))

# Text görünene kadar bekle
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Success"))

# Alert açılana kadar bekle
wait.until(EC.alert_is_present())

# Element kaybolana kadar bekle (loading spinner)
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "spinner")))`}</Code>
            </Section>

            {/* iframe */}
            <Section title={tr ? '🖼️ iframe İçindeki Elementler' : '🖼️ Elements Inside iframes'} darkMode={darkMode}>
                <p className={text}>{tr ? 'iframe, sayfa içinde ayrı bir HTML sayfasıdır. iframe\'e geçmeden içindeki elementlere erişemezsin — tıpkı farklı bir pencere gibi.' : 'An iframe is a separate HTML page embedded inside a page. You can\'t access its elements without switching to it — like a different window.'}</p>
                <Code lang="python">{`from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- iframe'e geçiş yöntemleri ---

# 1. Index ile (sayfadaki sırasına göre)
driver.switch_to.frame(0)

# 2. Name veya ID ile
driver.switch_to.frame("payment-iframe")

# 3. WebElement ile (en güvenilir yöntem)
iframe_el = driver.find_element(By.CSS_SELECTOR, "iframe[title='Payment Form']")
driver.switch_to.frame(iframe_el)

# iframe içinde normal işlem yap
card_input = driver.find_element(By.ID, "cardNumber")
card_input.send_keys("4111111111111111")

# Ana sayfaya geri dön (ZORUNLU!)
driver.switch_to.default_content()

# --- İç içe iframe (nested iframe) ---
driver.switch_to.frame("outer-frame")
driver.switch_to.frame("inner-frame")   # outer içindeki inner'a geç
# ... işlemler ...
driver.switch_to.default_content()       # direkt ana sayfaya dön

# --- Fixture ile temiz kullanım ---
from contextlib import contextmanager

@contextmanager
def in_iframe(driver, locator):
    """with bloğu ile otomatik giriş/çıkış."""
    iframe = driver.find_element(*locator)
    driver.switch_to.frame(iframe)
    try:
        yield
    finally:
        driver.switch_to.default_content()

# Kullanımı:
with in_iframe(driver, (By.CSS_SELECTOR, "iframe#payment")):
    driver.find_element(By.ID, "cvv").send_keys("123")`}</Code>
            </Section>

            {/* Shadow DOM */}
            <Section title={tr ? '🌑 Shadow DOM Elementleri' : '🌑 Shadow DOM Elements'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Shadow DOM, tarayıcı tarafından izole edilmiş özel bir DOM ağacıdır. Genellikle modern component library\'leri ve web components kullanır. Selenium\'un standart find_element\'i Shadow DOM\'u görmez.' : 'Shadow DOM is a browser-isolated DOM tree. Modern component libraries and web components use it. Selenium\'s standard find_element cannot see inside Shadow DOM.'}</p>
                <Code lang="python">{`# Shadow DOM'a erişim — JavaScript ile

def get_shadow_root(driver, host_element):
    """Shadow host'un shadow root'unu döndürür."""
    return driver.execute_script("return arguments[0].shadowRoot", host_element)

# Örnek: Chrome ayarları sayfasındaki shadow DOM
host = driver.find_element(By.CSS_SELECTOR, "settings-ui")
shadow = get_shadow_root(driver, host)

# Shadow root içinde element bul (CSS selector ile)
inner_el = shadow.find_element(By.CSS_SELECTOR, "#search-input")
inner_el.send_keys("privacy")

# --- İç içe Shadow DOM ---
def deep_shadow(driver, *selectors):
    """Birden fazla shadow root'tan geçer."""
    root = driver
    for sel in selectors[:-1]:
        host = root.find_element(By.CSS_SELECTOR, sel)
        root = driver.execute_script("return arguments[0].shadowRoot", host)
    return root.find_element(By.CSS_SELECTOR, selectors[-1])

# Kullanım: shadow1 > shadow2 > hedef element
el = deep_shadow(driver,
    "my-app",           # ilk shadow host
    "my-panel",         # ikinci shadow host
    "#final-button"     # hedef element
)
el.click()

# --- Selenium 4+ (ChromeDriver 96+) — Native Shadow DOM ---
# Bazı sürümlerde doğrudan CSS piercing desteklenir:
# driver.find_element(By.CSS_SELECTOR, "my-app::shadow #btn")
# ⚠️ Bu sözdizimi tüm tarayıcılarda çalışmaz, JS yolu daha güvenli`}</Code>
            </Section>

            {/* Full E2E example */}
            <Section title={tr ? '💻 Tam E2E Test Örneği — Page Object Model' : '💻 Full E2E Test — Page Object Model'} darkMode={darkMode}>
                <Code lang="python">{`# pages/login_page.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    URL = "https://automationexercise.com/login"

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 15)

    def open(self):
        self.driver.get(self.URL)
        return self

    def login(self, email, password):
        self.wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[data-qa='login-email']")
        )).send_keys(email)
        self.driver.find_element(
            By.CSS_SELECTOR, "input[data-qa='login-password']"
        ).send_keys(password)
        self.driver.find_element(
            By.CSS_SELECTOR, "button[data-qa='login-button']"
        ).click()
        return self

    def error_message(self):
        return self.driver.find_element(By.CSS_SELECTOR, "p.text-danger").text`}</Code>
                <Code lang="python">{`# tests/test_login.py
import pytest
from pages.login_page import LoginPage

@pytest.mark.smoke
def test_valid_login(driver):
    page = LoginPage(driver).open().login("valid@test.com", "correct_pass")
    assert "dashboard" in driver.current_url

@pytest.mark.smoke
def test_invalid_login(driver):
    page = LoginPage(driver).open().login("bad@test.com", "wrongpass")
    assert "Your email or password is incorrect!" in page.error_message()

@pytest.mark.parametrize("email,password,expected_error", [
    ("", "pass", "required"),
    ("notanemail", "pass", "invalid"),
    ("valid@test.com", "", "required"),
])
def test_login_validation(driver, email, password, expected_error):
    page = LoginPage(driver).open().login(email, password)
    assert expected_error in page.error_message().lower()`}</Code>

                <p className={`${text} mt-4`}>{tr ? 'Testleri çalıştırma:' : 'Running tests:'}</p>
                <Code lang="bash">{`# Tüm testleri çalıştır
pytest

# Sadece smoke testleri
pytest -m smoke

# Paralel (4 process)
pytest -n 4

# HTML raporu ile
pytest --html=reports/report.html

# Belirli dosya
pytest tests/test_login.py

# Belirli test fonksiyonu
pytest tests/test_login.py::test_valid_login

# Verbose + stop on first failure
pytest -v -x`}</Code>
            </Section>

            <Section title={tr ? '🎬 Canlı pytest Runner' : '🎬 Live pytest Runner'} darkMode={darkMode}>
                <p className={`text-sm leading-relaxed mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tr
                        ? 'Yukarıdaki test_login.py dosyasının gerçekten çalıştığını izle: "▶ pytest -v" butonuna bas, 5 test sırayla çalışsın, biri (kasıtlı olarak) kırmızı bir AssertionError versin. Java\'da Maven Surefire/JUnit raporunun konsola bastığı PASS/FAIL satırlarının birebir aynısı — burada pytest -v yapıyor.'
                        : 'Watch the test_login.py file above actually run: click "▶ pytest -v", 5 tests execute in order, and one (deliberately) fails with a red AssertionError. Same idea as the PASS/FAIL lines a Java Maven Surefire/JUnit report prints to console — here pytest -v does it.'}
                </p>
                <PytestRunnerSim darkMode={darkMode} tr={tr} />
            </Section>

            {/* Drag-and-drop: fixture scope ordering */}
            <Section title={tr ? '🔀 Sürükle-Sırala: Fixture Scope Sıralaması' : '🔀 Drag & Sort: Fixture Scope Order'} darkMode={darkMode}>
                <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tr
                        ? 'pytest fixture scope\'larını en dar kapsamdan (her test) en geniş kapsama (tüm oturum) doğru sırala. Java\'daki @BeforeEach → @BeforeAll mantığının pytest karşılığı budur.'
                        : 'Sort pytest fixture scopes from narrowest (per test) to broadest (whole session). This is the pytest equivalent of @BeforeEach → @BeforeAll in Java.'}
                </p>
                <OrderSort
                    block={{
                        variant: 'order-sort',
                        id: 'ch-pytest-fixture-scope-01',
                        question: {
                            tr: 'Fixture scope\'larını en dar kapsamdan en geniş kapsama doğru sırala.',
                            en: 'Sort fixture scopes from narrowest to broadest.',
                        },
                        items: [
                            { id: '1', text: { tr: 'function — Her test için ayrı setup (varsayılan)', en: 'function — fresh setup for each test (default)' }, order: 1 },
                            { id: '2', text: { tr: 'class — Aynı sınıftaki testler fixture\'ı paylaşır', en: 'class — tests in the same class share the fixture' }, order: 2 },
                            { id: '3', text: { tr: 'module — Aynı .py dosyasındaki testler paylaşır', en: 'module — tests in the same .py file share it' }, order: 3 },
                            { id: '4', text: { tr: 'session — Tüm test oturumu boyunca tek instance', en: 'session — one instance for the entire test session' }, order: 4 },
                        ],
                    }}
                    isTr={tr}
                    darkMode={darkMode}
                    onResult={(result) => {
                        // Learning OS Faz 1 (plan §8.2-S1): bu OrderSort ChallengeBlock
                        // dışında, kendi XP/completed takibi yok — activityLog kendi
                        // içinde id bazlı tekilleştirme yaptığından doğrudan çağrılır.
                        if (result.success) logActivity('exercise', 'test-frameworks:ch-pytest-fixture-scope-01')
                    }}
                />
            </Section>

            {/* Practice: write a fixture */}
            <Section title={tr ? '✍️ Kendin Yaz: Fixture + Test' : '✍️ Write It Yourself: Fixture + Test'} darkMode={darkMode}>
                <PytestFixturePractice darkMode={darkMode} tr={tr} />
            </Section>
        </div>
    )
}

// ─── ROBOT FRAMEWORK TAB ─────────────────────────────────────────────────────

function RobotTab({ darkMode, tr }) {
    const text = `text-sm leading-relaxed mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`

    return (
        <div>
            <SimpleBox emoji="🤖">
                {tr
                    ? 'Robot Framework, talimat kartlarıyla çalışan bir otomasyon fabrikası gibidir — ama mekanizma şu: her kart bir keyword\'dür ve keyword\'ler Python veya Java\'da yazılmış gerçek koda çağrı yapar; "Click Button  Login" satırı arka planda Selenium\'un click() metodunu tetikler, kullanıcı bunu görmez. pytest\'te her şey Python\'du; burada soyutlama katmanı ayrı bir dil gibi çalışır. Peki pytest öğrenilmişken neden Robot öğrenmek gerekir? Çünkü büyük kurumsal projelerde (SAP, ERP, telekom), test senaryolarını baştan sona Python yazan bir QA yoktur — BA ve manual tester\'lar da katkı verir ve o ekiplerde Robot Framework standarttır. Mülakatta "keyword-driven testing ne zaman tercih edilir?" sorusu tam bunu sorar: takımın teknik seviyesi mi yüksek, yoksa karma mı?'
                    : 'Robot Framework is like an automation factory that runs on instruction cards — but the mechanism is: each card is a keyword that calls real code written in Python or Java; the line "Click Button  Login" triggers Selenium\'s click() method behind the scenes, invisible to the writer. With pytest everything was Python; here an abstraction layer works like a separate language. Why learn Robot if you already know pytest? Because in large enterprise projects (SAP, ERP, telecom) there is no team where every QA writes Python from scratch — business analysts and manual testers also contribute, and in those teams Robot Framework is the standard. A QA interview question "when do you prefer keyword-driven testing?" is asking exactly this: is the team technically homogeneous or mixed?'}
            </SimpleBox>

            {/* Why Robot */}
            <Section title={tr ? '🎯 Neden Robot Framework Seçmeli?' : '🎯 Why Choose Robot Framework?'} darkMode={darkMode}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(tr ? [
                        ['📖 Okunabilirlik', 'Test case\'leri düz dil gibi okunur. PO\'lar, BA\'lar ve manual tester\'lar test yazabilir.'],
                        ['📚 Kütüphane ekosistemi', 'SeleniumLibrary, RequestsLibrary, DatabaseLibrary, SSHLibrary, AppiumLibrary...'],
                        ['🏢 Kurumsal standart', 'Nokia, Ericsson gibi büyük şirketlerde standart. SAP test otomasyonunda yaygın.'],
                        ['📋 Keyword-driven', 'Reusable keyword\'ler sayesinde kod tekrarı yoktur. "Login As Admin" keywordini her testte kullanırsın.'],
                        ['📊 Built-in rapor', 'log.html ve report.html otomatik oluşur. Kurumsal raporlamada hazır.'],
                        ['🔗 Python entegrasyonu', 'Custom keyword\'leri Python\'da yazarsın. pytest kadar esnek değil ama yeterli.'],
                    ] : [
                        ['📖 Readability', 'Test cases read like plain language. POs, BAs, and manual testers can write tests.'],
                        ['📚 Library ecosystem', 'SeleniumLibrary, RequestsLibrary, DatabaseLibrary, SSHLibrary, AppiumLibrary...'],
                        ['🏢 Enterprise standard', 'Standard at Nokia, Ericsson etc. Common in SAP test automation.'],
                        ['📋 Keyword-driven', 'Reusable keywords eliminate code repetition. Use "Login As Admin" in every test.'],
                        ['📊 Built-in reporting', 'log.html and report.html auto-generated. Ready for corporate reporting.'],
                        ['🔗 Python integration', 'Write custom keywords in Python. Not as flexible as pytest, but sufficient.'],
                    ]).map(([title, desc]) => (
                        <div key={title} className={`p-3 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
                            <div className={`text-xs font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{title}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</div>
                        </div>
                    ))}
                </div>
                <JavaBox darkMode={darkMode} tr={tr}>
                    {tr
                        ? 'Java dünyasında FitNesse veya Concordion kullandıysan Robot Framework tanıdık gelir — ikisi de "insan okunabilir" test formatını hedefler. JUnit @Test metodları → Robot Test Cases bölümü. @BeforeEach → Suite Setup / Test Setup. Java metodları → Robot Keywords. Maven test komutu → robot komutu.'
                        : 'If you\'ve used FitNesse or Concordion in Java, Robot Framework feels familiar — both target "human-readable" test format. JUnit @Test methods → Robot Test Cases section. @BeforeEach → Suite Setup / Test Setup. Java methods → Robot Keywords. Maven test command → robot command.'}
                </JavaBox>
            </Section>

            {/* Installation */}
            <Section title={tr ? '⚙️ Kurulum' : '⚙️ Installation'} darkMode={darkMode}>
                <Code lang="bash">{`# Temel kurulum
pip install robotframework

# Web otomasyon (Selenium tabanlı)
pip install robotframework-seleniumlibrary

# API testi
pip install robotframework-requests

# Verification
robot --version
# Robot Framework 7.x (Python 3.x)

# SeleniumLibrary için ChromeDriver gerekir
# webdriver-manager ile otomatik yönet:
pip install webdriver-manager`}</Code>
            </Section>

            {/* Project structure */}
            <Section title={tr ? '📁 Proje Yapısı' : '📁 Project Structure'} darkMode={darkMode}>
                <Code lang="text">{`robot_project/
├── resources/
│   ├── common.resource      # Paylaşılan keyword'ler
│   ├── login.resource       # Login'e özel keyword'ler
│   └── variables.resource   # Değişkenler (URL, kullanıcılar vb.)
│
├── tests/
│   ├── login_tests.robot
│   ├── checkout_tests.robot
│   └── regression/
│       └── full_suite.robot
│
├── libraries/
│   └── CustomLib.py         # Python ile yazılan custom keyword'ler
│
└── results/                 # robot otomatik oluşturur
    ├── report.html
    ├── log.html
    └── output.xml`}</Code>
            </Section>

            {/* Syntax */}
            <Section title={tr ? '📝 Robot Framework Sözdizimi' : '📝 Robot Framework Syntax'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Robot Framework dosyaları 4 bölümden oluşur. Sütunlar en az 2 boşlukla ayrılır.' : 'Robot Framework files have 4 sections. Columns are separated by at least 2 spaces.'}</p>
                <Code lang="robot">{`*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/common.resource
Suite Setup       Open Browser    \${BASE_URL}    Chrome
Suite Teardown    Close All Browsers
Test Setup        Go To    \${BASE_URL}/home

*** Variables ***
\${BASE_URL}       https://automationexercise.com
\${BROWSER}        Chrome
\${TIMEOUT}        15s
\${VALID_EMAIL}    test@qa.com
\${VALID_PASS}     Admin123!

*** Test Cases ***
TC001 - Valid Login Should Redirect To Dashboard
    [Documentation]    Geçerli kullanıcı giriş yapabilmeli
    [Tags]    smoke    login
    Login User    \${VALID_EMAIL}    \${VALID_PASS}
    Location Should Contain    dashboard
    Page Should Contain    Logged in as

TC002 - Invalid Login Shows Error Message
    [Documentation]    Geçersiz kullanıcı hata mesajı görmeli
    [Tags]    regression    login
    Login User    wrong@email.com    wrongpass
    Page Should Contain    Your email or password is incorrect!

*** Keywords ***
Login User
    [Arguments]    \${email}    \${password}
    Go To    \${BASE_URL}/login
    Input Text       css:[data-qa='login-email']     \${email}
    Input Password   css:[data-qa='login-password']  \${password}
    Click Button     css:[data-qa='login-button']`}</Code>
            </Section>

            {/* Locators in Robot */}
            <Section title={tr ? '🎯 Robot Framework\'te Locator Kullanımı' : '🎯 Locators in Robot Framework'} darkMode={darkMode}>
                <p className={text}>{tr ? 'SeleniumLibrary locator sözdizimi: strateji:değer formatında. CSS selector en önerilen.' : 'SeleniumLibrary locator syntax: strategy:value format. CSS selector is recommended.'}</p>
                <Code lang="robot">{`*** Keywords ***
Locate Elements Examples
    # ID (id: prefix isteğe bağlı — Robot otomatik dener)
    Click Element    id:username
    Click Element    username          # id veya name olarak arar

    # CSS Selector (css: prefix)
    Input Text    css:#email-field          value
    Input Text    css:.login-form input     value
    Input Text    css:input[name='email']   value

    # XPath
    Click Element    xpath://button[text()='Login']
    Click Element    xpath://input[@placeholder='Email']

    # Link text
    Click Link    Forgot Password?

    # Partial link text
    Click Link    partial:Forgot

    # Name
    Input Text    name:email    value

    # Data attribute (çok kullanışlı)
    Click Button    css:[data-qa='submit-btn']

    # nth-child ile tablo satırı
    Click Element    css:table > tbody > tr:nth-child(3) > td:nth-child(2)`}</Code>
            </Section>

            {/* iframe */}
            <Section title={tr ? '🖼️ iframe Yönetimi' : '🖼️ Handling iframes'} darkMode={darkMode}>
                <Code lang="robot">{`*** Keywords ***
Fill Payment Form In Iframe
    # iframe'e geç — index, name, id veya locator ile
    Select Frame    id:payment-iframe
    # veya: Select Frame    css:iframe[title='Payment']
    # veya: Select Frame    0   (ilk iframe, index ile)

    # iframe içinde normal işlem yap
    Input Text    id:card-number    4111111111111111
    Input Text    id:cvv            123
    Select From List By Value    id:exp-month    12

    # Ana sayfaya geri dön — zorunlu!
    Unselect Frame

    # Devam et
    Click Button    css:#submit-payment

Nested Iframe Example
    # Dış iframe
    Select Frame    id:outer-frame
    # İç iframe
    Select Frame    id:inner-frame
    Input Text    id:field    value
    # Direkt ana sayfaya dön
    Unselect Frame`}</Code>
            </Section>

            {/* Shadow DOM */}
            <Section title={tr ? '🌑 Shadow DOM' : '🌑 Shadow DOM'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Robot Framework\'te native Shadow DOM desteği sınırlıdır. SeleniumLibrary bunun için JavaScript yürütme yolunu kullanır.' : 'Native Shadow DOM support in Robot Framework is limited. SeleniumLibrary uses JavaScript execution for this.'}</p>
                <Code lang="robot">{`*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Click Shadow DOM Element
    [Arguments]    \${host_selector}    \${inner_selector}
    # JavaScript ile shadow root'a eriş
    \${shadow_root}=    Execute JavaScript
    ...    return document.querySelector('\${host_selector}').shadowRoot

    # Shadow root içindeki elementi JavaScript ile bul ve tıkla
    Execute JavaScript
    ...    document.querySelector('\${host_selector}')
    ...    .shadowRoot.querySelector('\${inner_selector}').click()

Get Shadow DOM Text
    [Arguments]    \${host_selector}    \${inner_selector}
    \${text}=    Execute JavaScript
    ...    return document.querySelector('\${host_selector}')
    ...    .shadowRoot.querySelector('\${inner_selector}').textContent
    [Return]    \${text}

*** Test Cases ***
TC - Shadow DOM Interaction
    Click Shadow DOM Element    my-app    #submit-button
    \${result}=    Get Shadow DOM Text    my-result    .status-text
    Should Be Equal    \${result}    Success`}</Code>
            </Section>

            {/* custom keyword in Python */}
            <Section title={tr ? '🐍 Python ile Custom Keyword Yazma' : '🐍 Writing Custom Keywords in Python'} darkMode={darkMode}>
                <p className={text}>{tr ? 'Karmaşık işlemler için Python\'da keyword kütüphanesi yazılır. Bu dosyalar libraries/ klasörüne konur.' : 'For complex operations, write keyword libraries in Python. These go in the libraries/ folder.'}</p>
                <Code lang="python">{`# libraries/CustomLib.py
from robot.api.deco import keyword
from selenium import webdriver
from selenium.webdriver.common.by import By
import json

class CustomLib:
    """Robot Framework custom keyword library."""

    ROBOT_LIBRARY_SCOPE = 'SUITE'  # Test scope: SUITE, TEST, GLOBAL

    @keyword("Get Shadow Root Element")
    def get_shadow_root_element(self, driver, host_css, inner_css):
        """Return an element inside Shadow DOM."""
        host = driver.find_element(By.CSS_SELECTOR, host_css)
        shadow = driver.execute_script("return arguments[0].shadowRoot", host)
        return shadow.find_element(By.CSS_SELECTOR, inner_css)

    @keyword("Read JSON Test Data")
    def read_json_test_data(self, filepath):
        """Read test data from a JSON file."""
        with open(filepath) as f:
            return json.load(f)

    @keyword("Scroll Element Into View")
    def scroll_into_view(self, driver, locator):
        """Elementi görünür alana kaydırır."""
        el = driver.find_element(By.CSS_SELECTOR, locator)
        driver.execute_script("arguments[0].scrollIntoView(true);", el)`}</Code>
                <Code lang="robot">{`# tests/advanced_test.robot
*** Settings ***
Library    SeleniumLibrary
Library    ../libraries/CustomLib.py

*** Test Cases ***
TC - Use Custom Keyword
    \${el}=    Get Shadow Root Element
    ...    css:my-app    css:#inner-button
    Click Element    \${el}

    \${data}=    Read JSON Test Data    data/users.json
    Log    \${data['admin']['email']}`}</Code>
            </Section>

            {/* Running */}
            <Section title={tr ? '▶️ Testleri Çalıştırma' : '▶️ Running Tests'} darkMode={darkMode}>
                <Code lang="bash">{`# Tek dosyayı çalıştır
robot tests/login_tests.robot

# Tüm test klasörünü çalıştır
robot tests/

# Tag ile filtrele (sadece smoke testleri)
robot --include smoke tests/

# Tag hariç tut
robot --exclude slow tests/

# Özel rapor klasörü
robot --outputdir results/ tests/

# Paralel (pabot — pip install robotframework-pabot)
pabot --processes 4 tests/

# Belirli test case
robot --test "TC001 - Valid Login*" tests/

# Variables override (CI/CD için)
robot --variable BASE_URL:https://staging.example.com tests/`}</Code>
            </Section>
        </div>
    )
}

// ─── COMPARISON TAB ───────────────────────────────────────────────────────────

function ComparisonTab({ darkMode, tr }) {
    const featureRows = tr ? [
        ['Test sözdizimi', 'def test_login(): (Python)', 'Login Should Succeed (plain text)'],
        ['Fixture/Setup', '@pytest.fixture — scope kontrolü', 'Suite Setup / Test Setup keyword'],
        ['Parameterize', '@pytest.mark.parametrize', 'Data-driven: test template + FOR loop'],
        ['Raporlama', 'pytest-html, Allure (3rd party)', 'Built-in log.html + report.html'],
        ['Öğrenme eğrisi', '🟢 Python bilen için çok düşük', '🟡 Keyword dili ayrıca öğrenilmeli'],
        ['Selenium entegrasyonu', 'selenium paketi direkt kullanılır', 'SeleniumLibrary keyword\'leri aracılığıyla'],
        ['iframe', 'driver.switch_to.frame()', 'Select Frame / Unselect Frame'],
        ['Shadow DOM', 'execute_script() ile JS', 'Execute JavaScript ile (aynı)'],
        ['Paralel çalışma', 'pytest-xdist (kolay)', 'pabot (gerekli, biraz kurulum)'],
        ['BDD desteği', 'pytest-bdd eklentisi', 'Robot BDD eklentisi'],
        ['CI/CD', 'pytest komutu, JUnit XML çıktı', 'robot komutu, output.xml'],
        ['Topluluk', '🔥 En büyük Python test topluluğu', '🟡 Niche, enterprise odaklı'],
        ['En iyi kullanım', 'Kod yazan QA, API+UI mix, hız', 'Non-teknik ekip, keyword-driven, ERP/SAP'],
    ] : [
        ['Test syntax', 'def test_login(): (Python)', 'Login Should Succeed (plain text)'],
        ['Fixture/Setup', '@pytest.fixture — scope control', 'Suite Setup / Test Setup keyword'],
        ['Parameterize', '@pytest.mark.parametrize', 'Data-driven: test template + FOR loop'],
        ['Reporting', 'pytest-html, Allure (3rd party)', 'Built-in log.html + report.html'],
        ['Learning curve', '🟢 Very low if you know Python', '🟡 Must learn the keyword language separately'],
        ['Selenium integration', 'selenium package used directly', 'Via SeleniumLibrary keywords'],
        ['iframe', 'driver.switch_to.frame()', 'Select Frame / Unselect Frame'],
        ['Shadow DOM', 'execute_script() JS approach', 'Execute JavaScript (same approach)'],
        ['Parallel execution', 'pytest-xdist (easy)', 'pabot (needed, some setup)'],
        ['BDD support', 'pytest-bdd plugin', 'Robot BDD plugin'],
        ['CI/CD', 'pytest command, JUnit XML output', 'robot command, output.xml'],
        ['Community', '🔥 Largest Python test community', '🟡 Niche, enterprise-focused'],
        ['Best for', 'Coding QA, API+UI mix, speed', 'Non-technical team, keyword-driven, ERP/SAP'],
    ]

    const decisionRows = tr ? [
        ['Python kodunu rahat yazabiliyorum', 'pytest', '—'],
        ['Ekibimde kodlamayan QA\'lar var', '—', 'Robot Framework'],
        ['API + UI testlerini beraber yazacağım', 'pytest (requests + selenium)', 'Robot (RequestsLibrary)'],
        ['SAP / ERP / kurumsal sistem testi', '—', 'Robot Framework'],
        ['CI/CD\'ye hızlı entegrasyon lazım', 'pytest (daha az kurulum)', 'Robot (biraz daha fazla config)'],
        ['Güzel hazır rapor istiyorum', 'pytest + Allure', 'Robot (built-in HTML rapor)'],
        ['Mevcut Selenium Java kodu var, Python\'a geçiyorum', 'pytest (doğal geçiş)', '—'],
        ['BDD / Gherkin yazmak istiyorum', 'pytest-bdd', 'Robot BDD eklentisi'],
    ] : [
        ['I can write Python code comfortably', 'pytest', '—'],
        ['My team has non-coding QAs', '—', 'Robot Framework'],
        ['I\'ll write API + UI tests together', 'pytest (requests + selenium)', 'Robot (RequestsLibrary)'],
        ['SAP / ERP / enterprise system testing', '—', 'Robot Framework'],
        ['Need fast CI/CD integration', 'pytest (less setup)', 'Robot (slightly more config)'],
        ['Want nice ready-made reports', 'pytest + Allure', 'Robot (built-in HTML report)'],
        ['Have existing Selenium Java code, moving to Python', 'pytest (natural transition)', '—'],
        ['Want to write BDD / Gherkin', 'pytest-bdd', 'Robot BDD plugin'],
    ]

    return (
        <div className="space-y-6">
            <div className="p-4 rounded-xl border-2 flex items-start gap-3" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
                <span className="text-2xl flex-shrink-0">⚖️</span>
                <p className="text-sm leading-relaxed" style={{ color: '#78350f' }}>
                    {tr
                        ? 'İkisi de yanlış değil — farklı ihtiyaçlara cevap verirler. "Hangisi daha iyi?" sorusundan önce "ekibim kim?" ve "ne test ediyorum?" sorularını sor.'
                        : 'Neither is wrong — they serve different needs. Before asking "which is better?", ask "who is my team?" and "what am I testing?"'}
                </p>
            </div>

            {/* Feature table */}
            <div>
                <h3 className={`text-base font-bold mb-4 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                    {tr ? '📊 Detaylı Özellik Karşılaştırması' : '📊 Detailed Feature Comparison'}
                </h3>
                <div className="overflow-x-auto rounded-xl border" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                <th className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'} w-1/4`}>{tr ? 'Özellik' : 'Feature'}</th>
                                <th className={`p-3 text-left font-semibold border-b font-mono ${darkMode ? 'border-gray-600 text-emerald-400' : 'border-gray-300 text-emerald-700'} w-[37.5%]`}>🐍 pytest</th>
                                <th className={`p-3 text-left font-semibold border-b font-mono ${darkMode ? 'border-gray-600 text-blue-400' : 'border-gray-300 text-blue-700'} w-[37.5%]`}>🤖 Robot Framework</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featureRows.map(([feature, py, robot]) => (
                                <tr key={feature} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <td className={`p-3 font-semibold text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</td>
                                    <td className={`p-3 text-xs ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{py}</td>
                                    <td className={`p-3 text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{robot}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Decision guide */}
            <div>
                <h3 className={`text-base font-bold mb-4 pb-2 border-b ${darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                    {tr ? '🧭 Karar Rehberi — Hangisini Seçmeli?' : '🧭 Decision Guide — Which to Choose?'}
                </h3>
                <div className="overflow-x-auto rounded-xl border" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}>
                                <th className={`p-3 text-left font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'} w-1/2`}>{tr ? 'Durum' : 'Situation'}</th>
                                <th className={`p-3 text-center font-semibold border-b ${darkMode ? 'border-gray-600 text-emerald-400' : 'border-gray-300 text-emerald-700'}`}>pytest</th>
                                <th className={`p-3 text-center font-semibold border-b ${darkMode ? 'border-gray-600 text-blue-400' : 'border-gray-300 text-blue-700'}`}>Robot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {decisionRows.map(([situation, py, robot]) => (
                                <tr key={situation} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <td className={`p-3 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{situation}</td>
                                    <td className={`p-3 text-center text-xs font-bold ${py === '—' ? (darkMode ? 'text-gray-600' : 'text-gray-300') : (darkMode ? 'text-emerald-400' : 'text-emerald-600')}`}>{py === '—' ? '—' : '✅'}</td>
                                    <td className={`p-3 text-center text-xs font-bold ${robot === '—' ? (darkMode ? 'text-gray-600' : 'text-gray-300') : (darkMode ? 'text-blue-400' : 'text-blue-600')}`}>{robot === '—' ? '—' : '✅'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PythonFrameworksTab({ darkMode, language }) {
    const [inner, setInner] = useState(0)
    const tr = language === 'tr'

    const tabs = [
        { emoji: '🐍', label: tr ? 'pytest' : 'pytest' },
        { emoji: '🤖', label: tr ? 'Robot Framework' : 'Robot Framework' },
        { emoji: '⚖️', label: tr ? 'Karşılaştırma' : 'Comparison' },
    ]

    const gradients = ['from-emerald-500 to-green-600', 'from-blue-500 to-indigo-600', 'from-purple-500 to-violet-600']

    return (
        <div>
            {/* Inner tab bar */}
            <div className={`flex gap-2 mb-6 p-1 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setInner(i)}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                            inner === i
                                ? `bg-gradient-to-r ${gradients[i]} text-white shadow-md`
                                : darkMode
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-white'
                        }`}
                    >
                        <span>{tab.emoji}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            {inner === 0 && <PytestTab darkMode={darkMode} tr={tr} />}
            {inner === 1 && <RobotTab darkMode={darkMode} tr={tr} />}
            {inner === 2 && <ComparisonTab darkMode={darkMode} tr={tr} />}
        </div>
    )
}
