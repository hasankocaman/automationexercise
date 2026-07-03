import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { pythonData } from '../data/pythonData'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../python-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // py-lightning-flash CSS animasyonuyla aynı 10s döngü

const TestFrameworksBanner = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const isTr = language === 'tr'
  return (
    <button
        onClick={() => navigate('/test-frameworks')}
        className="group w-full text-left block mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-400/70 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 bg-transparent cursor-pointer"
    >
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-5 flex items-center gap-5">
            <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">🧪</div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                    {isTr ? 'Etkileşimli Rehber' : 'Interactive Guide'}
                </div>
                <div className="text-lg font-bold text-white leading-tight">Python Test Frameworks</div>
                <div className="text-sm text-purple-200/80 mt-1 leading-relaxed">
                    pytest · Selenium · Playwright
                    <span className="mx-2 text-purple-500">·</span>
                    {isTr ? 'Java karşılaştırmaları, SVG diyagramlar, terminal simülasyonu' : 'Java comparisons, SVG diagrams, terminal simulation'}
                </div>
                <div className="flex flex-wrap gap-2 mt-2.5">
                    {['🧪 pytest', '🌐 Selenium', '🎭 Playwright', '☕ Java Compare'].map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-3xl text-purple-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</div>
        </div>
    </button>
  )
}

/* ─── pytest Yaşam Döngüsü: bir test fonksiyonu nasıl çalışır ─── */
function PythonPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    // Renkler CSS değişkeni referansı olarak tutulur (--py-role-*): light modda
    // koyu, dark modda pastel ton kullanılır — açık arka planda soluk/okunaksız
    // metin oluşmasını önler (bkz. python-effects.css §0).
    const stages = [
        {
            label: isTr ? 'Test Keşfi (test_*.py)' : 'Test Discovery (test_*.py)',
            color: 'var(--py-role-accent)',
            bg: 'rgba(242,177,52,0.13)',
            border: 'rgba(242,177,52,0.38)',
            z: 5,
            ty: -30,
        },
        {
            label: isTr ? 'Fixture Kurulumu (setup)' : 'Fixture Setup',
            color: 'var(--py-role-accent-2)',
            bg: 'rgba(79,209,232,0.12)',
            border: 'rgba(79,209,232,0.36)',
            z: 4,
            ty: -18,
        },
        {
            label: isTr ? 'Test Çalıştırma' : 'Test Execution',
            color: 'var(--py-role-muted)',
            bg: 'rgba(183,195,217,0.11)',
            border: 'rgba(183,195,217,0.30)',
            z: 3,
            ty: -8,
        },
        {
            label: isTr ? 'Assertion Kontrolü' : 'Assertion Check',
            color: 'var(--py-role-success)',
            bg: 'rgba(111,191,115,0.11)',
            border: 'rgba(111,191,115,0.30)',
            z: 2,
            ty: 2,
        },
        {
            label: isTr ? 'Fixture Temizliği (teardown)' : 'Fixture Teardown',
            color: 'var(--py-role-muted)',
            bg: 'rgba(183,195,217,0.08)',
            border: 'rgba(183,195,217,0.22)',
            z: 1,
            ty: 9,
        },
    ]

    function handleMouseMove(e) {
        const el = pipelineRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--rx', `${-y * 24}deg`)
        el.style.setProperty('--ry', `${x * 24}deg`)
        el.style.setProperty('transform', 'rotateX(var(--rx)) rotateY(var(--ry))')
    }

    function handleMouseLeave() {
        const el = pipelineRef.current
        if (!el) return
        el.style.setProperty('transition', 'transform 0.5s ease-out')
        el.style.setProperty('transform', 'rotateX(0deg) rotateY(0deg)')
        setTimeout(() => {
            if (el) el.style.removeProperty('transition')
        }, 500)
    }

    return (
        <div
            className="py-pipeline py-pipeline-interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="py-pipeline-title">
                {isTr ? 'pytest Yaşam Döngüsü' : 'pytest Test Lifecycle'}
            </div>
            <div ref={pipelineRef} className="py-stages py-stages-3d">
                {stages.map((stage, idx) => (
                    <div
                        key={idx}
                        className="py-stage"
                        style={{
                            '--stage-z': stage.z,
                            '--ty': `${stage.ty}px`,
                            background: stage.bg,
                            borderColor: stage.border,
                            color: stage.color,
                        }}
                    >
                        <span className="py-stage-dot" style={{ background: stage.color }} />
                        <span className="py-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── pytest CLI Konsolu & Test Sonuç Panosu Simülatörü ───────── */
function PythonConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'pytest konsoluna hoş geldiniz.\nTestleri çalıştırmak için pytest -v yazın...'
            : 'Welcome to the pytest console.\nType pytest -v to run the tests...'
    )
    const initialResults = [
        { name: 'test_valid_login', status: 'pending' },
        { name: 'test_invalid_password', status: 'pending' },
        { name: 'test_empty_fields', status: 'pending' },
    ]
    const [results, setResults] = useState(initialResults)
    const timersRef = useRef([])

    useEffect(() => {
        return () => timersRef.current.forEach(t => clearTimeout(t))
    }, [])

    function runTests(raw) {
        setResults(initialResults.map(r => ({ ...r, status: 'pending' })))
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []

        const outcomes = ['pass', 'pass', 'fail']
        outcomes.forEach((outcome, idx) => {
            const t = setTimeout(() => {
                setResults(prev => prev.map((r, i) => i === idx ? { ...r, status: outcome } : r))
            }, (idx + 1) * 400)
            timersRef.current.push(t)
        })

        const finalTimer = setTimeout(() => {
            setConsoleOutput(prev => prev + `\n> ${raw}\ncollecting ... collected 3 items\n\n` +
                'test_login.py::test_valid_login PASSED       [ 33%]\n' +
                'test_login.py::test_invalid_password PASSED  [ 66%]\n' +
                'test_login.py::test_empty_fields FAILED      [100%]\n\n' +
                (isTr ? '======= 1 başarısız, 2 başarılı — 0.42s =======' : '======= 1 failed, 2 passed in 0.42s ======='))
        }, outcomes.length * 400 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.startsWith('pytest')) {
            runTests(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- pytest -v`
                    : `Command not recognized: "${raw}". Try command:\n- pytest -v`
            ))
        }
    }

    return (
        <div className="py-console-box py-reveal">
            <div className="py-console">
                <div className="py-console-header">
                    <span>pytest-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="py-console-body">
                    {consoleOutput}
                    <div className="py-console-input-row">
                        <span className="py-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="py-console-input"
                            placeholder={isTr ? 'Komut yazın (pytest -v)...' : 'Type a command (pytest -v)...'}
                        />
                    </div>
                </div>
            </div>
            <div className="py-result-board">
                {results.map(r => (
                    <div key={r.name} className={`py-result-item ${r.status}`}>
                        <span className="py-result-dot" />
                        <span>{r.name} {r.status === 'pending' ? '...' : r.status === 'pass' ? '✓ PASSED' : '✗ FAILED'}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + pytest Yaşam Döngüsü asimetrik hero banner ──────── */
function PythonStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 1991, suffix: '',  tr: 'Yayın Yılı',              en: 'Founded'              },
        { target: 3,    suffix: '',  tr: 'Popüler Test Framework',   en: 'Popular Test Frameworks' },
        { target: 4,    suffix: '',  tr: 'Fixture Scope Seviyesi',   en: 'Fixture Scope Levels' },
        { target: 100,  suffix: '%', tr: 'Okunabilir Sözdizimi',     en: 'Readable Syntax'      },
    ]

    return (
        <>
            <TestFrameworksBanner />
            <div className="py-hero-banner-container">
                <div className="py-hero-banner">
                    {/* Sol: pytest Yaşam Döngüsü (1.4fr) */}
                    <PythonPipeline isTr={isTr} />

                    {/* Sağ: Stats 2×2 grid (1fr) */}
                    <div className="py-stats-bar">
                        {stats.map(s => (
                            <div key={s.tr} className="py-stat-item">
                                <div className="py-stat-number-wrap">
                                    <span className="py-stat-num" data-target={s.target}>0</span>
                                    {s.suffix && <span className="py-stat-suffix">{s.suffix}</span>}
                                </div>
                                <p className="py-stat-label">{isTr ? s.tr : s.en}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Alt: pytest CLI Konsolu / Test Sonuç Panosu */}
                <PythonConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
            </div>
        </>
    )
}

/* ─── PythonPage ─────────────────────────────────────────────── */
function PythonPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.python-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        /* ── 0. Light/Dark Mode İzleme (yağmur sesi sadece light modda) ── */
        const themeEl = wrapper.querySelector('.min-h-screen')
        let cleanupThemeObserver = () => {}
        if (themeEl) {
            setIsLightMode(!themeEl.classList.contains('dark-mode'))
            const themeObserver = new MutationObserver(() => {
                setIsLightMode(!themeEl.classList.contains('dark-mode'))
            })
            themeObserver.observe(themeEl, { attributes: true, attributeFilter: ['class'] })
            cleanupThemeObserver = () => themeObserver.disconnect()
        }

        /* ── 1. Yüzen Parçacıklar (altın + camgöbeği) ──────────── */
        const particles = []
        const pColors = ['#f2b134', '#4fd1e8', '#ffd166', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'py-particle'
            const size = 2 + Math.random() * 3.5
            p.style.left = `${Math.random() * 100}%`
            p.style.width = p.style.height = `${size}px`
            p.style.setProperty('--dur',   `${10 + Math.random() * 10}s`)
            p.style.setProperty('--delay', `${Math.random() * 13}s`)
            p.style.background = pColors[Math.floor(Math.random() * pColors.length)]
            wrapper.appendChild(p)
            particles.push(p)
        }

        /* ── 2. Scroll Reveal (IntersectionObserver) ───────────── */
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                if (e.target.classList.contains('py-reveal')) {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                            e.target.classList.add('py-visible')
                        )
                    )
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.pyReveal) return
            el.dataset.pyReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('py-reveal')
            revealObserver.observe(el)
        }

        /* ── 3. py-block sınıfı + reveal → tab değişimlerini yakala */
        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('py-block')) child.classList.add('py-block')
                setupReveal(child)
            })
        }
        applyBlockClasses()

        let mutTimer
        const mutObserver = new MutationObserver(() => {
            clearTimeout(mutTimer)
            mutTimer = setTimeout(() => {
                applyBlockClasses()
                applyMagnetic()
            }, 60)
        })
        mutObserver.observe(wrapper, { childList: true, subtree: true })

        /* ── 4. Stats Counter ──────────────────────────────────── */
        function animateCounter(el, target) {
            const startTime = performance.now()
            const duration  = target > 1000 ? 2200 : 1600

            function step(now) {
                const elapsed  = Math.min(now - startTime, duration)
                const progress = 1 - Math.pow(1 - elapsed / duration, 3)
                const current  = Math.floor(progress * target)
                el.textContent = current
                if (elapsed < duration) requestAnimationFrame(step)
                else el.textContent = target
            }
            requestAnimationFrame(step)
        }

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                const item = e.target
                item.classList.remove('py-stat-pending')
                item.classList.add('py-stat-visible')
                const num = item.querySelector('.py-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num)         num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.py-stat-item').forEach((el, i) => {
            if (!noMotion) {
                el.classList.add('py-stat-pending')
                el.style.transitionDelay = `${i * 0.12}s`
            }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.py-stat-item.py-stat-pending').forEach(el => {
                el.classList.remove('py-stat-pending')
                el.classList.add('py-stat-visible')
                const num = el.querySelector('.py-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        /* ── 5. Glitch: Hero h1 ────────────────────────────────── */
        const heroH1 = wrapper.querySelector('main > div > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('py-glitch')
        }

        /* ── 6. Manyetik Buton (event delegation) ─────────────── */
        let currentMagBtn = null

        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.py-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.py-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('py-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.py-magnetic-init, a.py-magnetic-init')
            if (btn !== currentMagBtn) {
                if (currentMagBtn) resetMagnetic(currentMagBtn, true)
                currentMagBtn = btn
            }
            if (!btn) return
            const r = btn.getBoundingClientRect()
            const x = e.clientX - r.left - r.width  / 2
            const y = e.clientY - r.top  - r.height / 2
            btn.style.setProperty('transition', 'transform 0.15s ease', 'important')
            btn.style.setProperty('transform',  `translate(${x * 0.28}px, ${y * 0.28}px)`, 'important')
        }

        function resetMagnetic(btn, spring = false) {
            if (!btn) return
            btn.style.setProperty(
                'transition',
                spring ? 'transform 0.55s cubic-bezier(0.23,1,0.32,1)' : 'transform 0.3s ease',
                'important'
            )
            btn.style.setProperty('transform', 'translate(0,0)', 'important')
            setTimeout(() => {
                btn.style.removeProperty('transition')
                btn.style.removeProperty('transform')
            }, 600)
        }

        function onWrapperMouseLeave() {
            if (currentMagBtn) { resetMagnetic(currentMagBtn, true); currentMagBtn = null }
        }

        wrapper.addEventListener('mousemove',  onWrapperMouseMove)
        wrapper.addEventListener('mouseleave', onWrapperMouseLeave)

        /* ── 7. Squash & Stretch + Ripple (pointerdown) ────────── */
        function onWrapperPointerDown(e) {
            if (noMotion) return
            const btn = e.target.closest('button.py-magnetic-init, a.py-magnetic-init')
            if (!btn) return

            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')

            btn.classList.remove('py-squash')
            void btn.offsetWidth
            btn.classList.add('py-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('py-squash'), { once: true })

            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'py-ripple-span'
            span.style.width  = span.style.height = `${size}px`
            span.style.left   = `${e.clientX - r.left  - size / 2}px`
            span.style.top    = `${e.clientY - r.top   - size / 2}px`
            span.style.background = 'rgba(234, 240, 251, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }

        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        /* ── 8. Bireysel Blok 3D Tilt (event delegation) ──────── */
        const MAX_DEG = 6
        let currentTiltBlock = null

        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.py-block')

            if (block !== currentTiltBlock) {
                if (currentTiltBlock) {
                    currentTiltBlock.style.setProperty('transition', 'transform 0.5s ease', 'important')
                    currentTiltBlock.style.removeProperty('transform')
                    setTimeout(() => currentTiltBlock?.style.removeProperty('transition'), 520)
                }
                currentTiltBlock = block
            }
            if (!block) return

            const r = block.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width  - 0.5
            const y = (e.clientY - r.top)  / r.height - 0.5
            block.style.setProperty('transition', 'transform 0.12s ease', 'important')
            block.style.setProperty(
                'transform',
                `perspective(800px) rotateX(${-y * MAX_DEG}deg) rotateY(${x * MAX_DEG}deg) scale(1.01)`,
                'important'
            )
        }

        function onContentMouseLeave() {
            if (!currentTiltBlock) return
            currentTiltBlock.style.setProperty('transition', 'transform 0.55s ease', 'important')
            currentTiltBlock.style.removeProperty('transform')
            setTimeout(() => currentTiltBlock?.style.removeProperty('transition'), 580)
            currentTiltBlock = null
        }

        const contentArea = wrapper.querySelector('.flex-1.min-w-0')
        if (contentArea) {
            contentArea.addEventListener('mousemove',  onContentMouseMove)
            contentArea.addEventListener('mouseleave', onContentMouseLeave)
        }

        /* ── Reveal fallback (1.5s, viewport × 1.5 içindekiler) ── */
        const revealFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.py-reveal:not(.py-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('py-visible')
            })
        }, 1500)

        /* ── 9. Parallax + Scroll Reveal Fallback + Okuma İlerlemesi ── */
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--py-scroll-y', `${sY * 0.08}px`)

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)

            const pctEl = wrapper.querySelector('.py-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`

            wrapper.querySelectorAll('.py-reveal:not(.py-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('py-visible'))
                }
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        /* ── Cleanup ───────────────────────────────────────────── */
        return () => {
            cleanupThemeObserver()
            particles.forEach(p => p.remove())
            mutObserver.disconnect()
            revealObserver.disconnect()
            statObserver.disconnect()
            clearTimeout(mutTimer)
            clearTimeout(statFallbackTimer)
            clearTimeout(revealFallbackTimer)
            if (heroH1) {
                heroH1.classList.remove('py-glitch')
                heroH1.removeAttribute('data-text')
            }
            wrapper.querySelectorAll('.py-magnetic-init').forEach(btn => {
                btn.classList.remove('py-magnetic-init', 'no-hover-scale', 'py-squash')
                btn.style.removeProperty('transform')
                btn.style.removeProperty('transition')
            })
            wrapper.removeEventListener('mousemove',   onWrapperMouseMove)
            wrapper.removeEventListener('mouseleave',  onWrapperMouseLeave)
            wrapper.removeEventListener('pointerdown', onWrapperPointerDown)
            if (contentArea) {
                contentArea.removeEventListener('mousemove',  onContentMouseMove)
                contentArea.removeEventListener('mouseleave', onContentMouseLeave)
            }
            window.removeEventListener('scroll', onScroll)
            wrapper.style.removeProperty('--py-scroll-y')
            wrapper.style.removeProperty('--scroll-percent')
        }
    }, [])

    /* ── Yağmur/Gökgürültüsü Ambiyansı (yalnızca soundOn && light mode) ──
       Ses dosyası kullanılmaz — Web Audio API ile sentezlenir (bkz. lib/ambientSound.js). */
    useEffect(() => {
        if (!soundOn || !isLightMode) {
            if (audioNodesRef.current) {
                stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx)
                audioNodesRef.current = null
            }
            if (thunderTimerRef.current) {
                clearInterval(thunderTimerRef.current)
                thunderTimerRef.current = null
            }
            return
        }

        const ctx = getAudioContext()
        const rain = createRainLoop(ctx)
        fadeGain(ctx, rain.gain, 0.06, 1.2)
        audioNodesRef.current = { ctx, rain }

        thunderTimerRef.current = setInterval(() => {
            playThunder(ctx, 0.35)
        }, THUNDER_INTERVAL_MS)

        return () => {
            if (audioNodesRef.current) {
                stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx)
                audioNodesRef.current = null
            }
            if (thunderTimerRef.current) {
                clearInterval(thunderTimerRef.current)
                thunderTimerRef.current = null
            }
        }
    }, [soundOn, isLightMode])

    function handleToggleSound() {
        getAudioContext()
        setSoundOn(prev => {
            const next = !prev
            try { localStorage.setItem(SOUND_PREF_KEY, String(next)) } catch { /* localStorage kapalı olabilir */ }
            return next
        })
    }

    const { language } = useLanguage()

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const soundToggleButton = isLightMode ? (
        <button
            type="button"
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-cyan-300' : ''}`}
            onClick={handleToggleSound}
            title={
                language === 'tr'
                    ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç')
                    : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')
            }
            data-testid="python-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="python-page">
            <TopicPage
                data={pythonData}
                gradient="from-yellow-500 to-green-600"
                bgLight="bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50"
                extraBanner={<PythonStatsBanner />}
                headerExtra={soundToggleButton}
            />
            {/* Dalgalı İlerleme Çemberi */}
            <div
                className="py-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="py-wave-water" />
                <span className="py-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default PythonPage
