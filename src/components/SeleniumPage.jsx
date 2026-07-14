import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { seleniumData } from '../data/seleniumData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../selenium-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // se-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── WebDriver Pipeline: komut script'ten tarayıcıya nasıl ulaşır ─── */
function SeleniumPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    // Renkler CSS değişkeni referansı olarak tutulur (--sel-role-*): light modda
    // koyu, dark modda pastel ton kullanılır — açık arka planda soluk/okunaksız
    // metin oluşmasını önler (bkz. selenium-effects.css §0).
    const stages = [
        {
            label: isTr ? 'Test Script (Java/Python/JS)' : 'Test Script (Java/Python/JS)',
            color: 'var(--sel-role-accent)',
            bg: 'rgba(20,184,166,0.13)',
            border: 'rgba(20,184,166,0.38)',
            z: 5,
            ty: -30,
        },
        {
            label: isTr ? 'Selenium Client Binding' : 'Selenium Client Binding',
            color: 'var(--sel-role-accent-2)',
            bg: 'rgba(45,217,196,0.11)',
            border: 'rgba(45,217,196,0.32)',
            z: 4,
            ty: -18,
        },
        {
            label: isTr ? 'W3C WebDriver Protokolü' : 'W3C WebDriver Protocol',
            color: 'var(--sel-role-muted)',
            bg: 'rgba(153,179,171,0.11)',
            border: 'rgba(153,179,171,0.30)',
            z: 3,
            ty: -8,
        },
        {
            label: isTr ? 'Browser Driver (chromedriver)' : 'Browser Driver (chromedriver)',
            color: 'var(--sel-role-success)',
            bg: 'rgba(111,191,115,0.11)',
            border: 'rgba(111,191,115,0.30)',
            z: 2,
            ty: 2,
        },
        {
            label: isTr ? 'Tarayıcı Motoru' : 'Browser Engine',
            color: 'var(--sel-role-muted)',
            bg: 'rgba(153,179,171,0.08)',
            border: 'rgba(153,179,171,0.22)',
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
            className="se-pipeline se-pipeline-interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="se-pipeline-title">
                {isTr ? 'WebDriver Komut Zinciri' : 'WebDriver Command Pipeline'}
            </div>
            <div ref={pipelineRef} className="se-stages se-stages-3d">
                {stages.map((stage, idx) => (
                    <div
                        key={idx}
                        className="se-stage"
                        style={{
                            '--stage-z': stage.z,
                            '--ty': `${stage.ty}px`,
                            background: stage.bg,
                            borderColor: stage.border,
                            color: stage.color,
                        }}
                    >
                        <span className="se-stage-dot" style={{ background: stage.color }} />
                        <span className="se-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Komut Konsolu & Canlı Tarayıcı Simülatörü ──────────────── */
function SeleniumConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Selenium konsoluna hoş geldiniz.\nBir sayfa açmak için driver.get("https://example.com") yazın...'
            : 'Welcome to the Selenium console.\nType driver.get("https://example.com") to open a page...'
    )
    const [isActive, setIsActive] = useState(false)
    const [urlText, setUrlText] = useState('about:blank')
    const [clicked, setClicked] = useState(false)

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.startsWith('driver.get(')) {
            const match = raw.match(/["']([^"']+)["']/)
            const url = match ? match[1] : 'https://example.com'
            setIsActive(true)
            setUrlText(url)
            setClicked(false)
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Sayfa yüklendi: ${url}\n[OK] driver.get() tamamlandı.`
                    : `Page loaded: ${url}\n[OK] driver.get() completed.`
            ))
        } else if (cmd.includes('.click()')) {
            if (!isActive) {
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr
                        ? 'NoSuchWindowException: önce driver.get() ile bir sayfa açmalısınız.'
                        : 'NoSuchWindowException: open a page with driver.get() first.'
                ))
            } else {
                setClicked(true)
                setTimeout(() => setClicked(false), 350)
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr
                        ? '[OK] Element bulundu ve tıklandı.'
                        : '[OK] Element found and clicked.'
                ))
            }
        } else if (cmd.startsWith('driver.quit()')) {
            setIsActive(false)
            setUrlText('about:blank')
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr ? 'Tarayıcı oturumu kapatıldı.' : 'Browser session closed.'
            ))
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komutlar:\n- driver.get("https://example.com")\n- driver.findElement(By.id("submit")).click()\n- driver.quit()`
                    : `Command not recognized: "${raw}". Try commands:\n- driver.get("https://example.com")\n- driver.findElement(By.id("submit")).click()\n- driver.quit()`
            ))
        }
    }

    return (
        <div className="se-console-box se-reveal">
            <div className="se-console">
                <div className="se-console-header">
                    <span>selenium-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="se-console-body">
                    {consoleOutput}
                    <div className="se-console-input-row">
                        <span className="se-console-prompt">webdriver&gt;</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="se-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="se-browser-mock">
                <div className={`se-browser-window ${isActive ? 'active' : ''}`}>
                    <div className="se-browser-titlebar">
                        <span className="se-browser-dot" />
                        <span className="se-browser-dot" />
                        <span className="se-browser-dot" />
                        <span className="se-browser-urlbar">{urlText}</span>
                    </div>
                    <div className="se-browser-content">
                        {isActive && (
                            <button className={`se-browser-button ${clicked ? 'clicked' : ''}`} type="button" tabIndex={-1}>
                                {isTr ? 'Gönder' : 'Submit'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ─── Stats + Pipeline asimetrik hero banner ─────────────────── */
function SeleniumStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2004, suffix: '',  tr: 'Yayın Yılı',        en: 'Founded'           },
        { target: 5,    suffix: '+', tr: 'Dil Binding',        en: 'Language Bindings' },
        { target: 4,    suffix: '',  tr: 'Ana Tarayıcı',       en: 'Major Browsers'    },
        { target: 2018, suffix: '',  tr: 'W3C Standardı',      en: 'W3C Standard'      },
    ]

    return (
        <div className="se-hero-banner-container">
            <div className="se-hero-banner">
                {/* Sol: WebDriver Pipeline (1.4fr) */}
                <SeleniumPipeline isTr={isTr} />

                {/* Sağ: Stats 2×2 grid (1fr) */}
                <div className="se-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="se-stat-item">
                            <div className="se-stat-number-wrap">
                                <span className="se-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="se-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="se-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Alt: Komut Konsolu Simülatörü */}
            <SeleniumConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── SeleniumPage ─────────────────────────────────────────────── */
function SeleniumPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.selenium-page')
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

        /* ── 1. Yüzen Parçacıklar (teal + orman yeşili) ────────── */
        const particles = []
        const pColors = ['#14b8a6', '#6fbf73', '#2dd9c4', '#99b3ab', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'se-particle'
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
                if (e.target.classList.contains('se-reveal')) {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                            e.target.classList.add('se-visible')
                        )
                    )
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.seReveal) return
            el.dataset.seReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('se-reveal')
            revealObserver.observe(el)
        }

        /* ── 3. se-block sınıfı + reveal → tab değişimlerini yakala */
        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                // Interactive blocks (quiz, playground, challenge …) must not get the 3-D tilt
                // effect: the perspective transform + Playwright's stability check loop causes
                // click events to be swallowed, breaking quiz/i18n tests.
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('se-block')) child.classList.add('se-block')
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
                item.classList.remove('se-stat-pending')
                item.classList.add('se-stat-visible')
                const num = item.querySelector('.se-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num)         num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.se-stat-item').forEach((el, i) => {
            if (!noMotion) {
                el.classList.add('se-stat-pending')
                el.style.transitionDelay = `${i * 0.12}s`
            }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.se-stat-item.se-stat-pending').forEach(el => {
                el.classList.remove('se-stat-pending')
                el.classList.add('se-stat-visible')
                const num = el.querySelector('.se-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        /* ── 5. Glitch: Hero h1 ────────────────────────────────── */
        // NOT: eski 'main > div > div:first-child h1' seçici TopicPage'in
        // gerçek DOM'uyla eşleşmiyordu (main'in İLK çocuğu zaten hero div'i,
        // araya ekstra katman girmiyor) — glitch efekti hiç çalışmıyordu.
        const heroH1 = wrapper.querySelector('main > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('se-glitch')
        }

        /* ── 6. Manyetik Buton (event delegation) ─────────────── */
        let currentMagBtn = null

        function applyMagnetic() {
            // Geri Dönme ve Dark Mode butonlarına premium manyetik ve sıvı dolgu (Fluid Hover) efekti verilir.
            // Quiz ve dil değiştirme butonları click kaymalarını önlemek için hariç tutulur.
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.se-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.se-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('se-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.se-magnetic-init, a.se-magnetic-init')
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
            const btn = e.target.closest('button.se-magnetic-init, a.se-magnetic-init')
            if (!btn) return

            // Magnetic transform'u geçici sil — squash temiz çalışsın
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')

            // Squash & Stretch
            btn.classList.remove('se-squash')
            void btn.offsetWidth // reflow — animasyonu sıfırla
            btn.classList.add('se-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('se-squash'), { once: true })

            // Ripple span: tıklanan noktadan dışa yayılan daire
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'se-ripple-span'
            span.style.width  = span.style.height = `${size}px`
            span.style.left   = `${e.clientX - r.left  - size / 2}px`
            span.style.top    = `${e.clientY - r.top   - size / 2}px`
            // Ripple rengi: paletten text-primary'ye yakın —
            // butonlar genellikle renkli bg'de beyaz text içerir
            span.style.background = 'rgba(231, 241, 236, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }

        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        /* ── 8. Bireysel Blok 3D Tilt (event delegation) ──────── */
        const MAX_DEG = 6
        let currentTiltBlock = null

        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.se-block')

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
            wrapper.querySelectorAll('.se-reveal:not(.se-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('se-visible')
            })
        }, 1500)

        /* ── 9. Parallax + Scroll Reveal Fallback + Okuma İlerlemesi ── */
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--se-scroll-y', `${sY * 0.08}px`)

            // Okuma ilerleme yüzdesi hesabı
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)

            const pctEl = wrapper.querySelector('.se-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`

            wrapper.querySelectorAll('.se-reveal:not(.se-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('se-visible'))
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
                heroH1.classList.remove('se-glitch')
                heroH1.removeAttribute('data-text')
            }
            wrapper.querySelectorAll('.se-magnetic-init').forEach(btn => {
                btn.classList.remove('se-magnetic-init', 'no-hover-scale', 'se-squash')
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
            wrapper.style.removeProperty('--se-scroll-y')
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-teal-300' : ''}`}
            onClick={handleToggleSound}
            title={
                language === 'tr'
                    ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç')
                    : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')
            }
            data-testid="selenium-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="selenium-page">
            <TopicPage
                data={seleniumData}
                gradient="from-green-600 to-teal-700"
                bgLight="bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50"
                extraBanner={<SeleniumStatsBanner />}
                headerExtra={soundToggleButton}
            />
            {/* Dalgalı İlerleme Çemberi */}
            <div
                className="se-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="se-wave-water" />
                <span className="se-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default SeleniumPage
