import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { restAssuredData } from '../data/restAssuredData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../restassured-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // ra-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── given().when().then() Zinciri: BDD-stili DSL adım adım nasıl akar ─── */
function RestAssuredPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? 'Given (Ön Koşul/Setup)' : 'Given (Precondition/Setup)', color: 'var(--ra-role-accent)', bg: 'rgba(212,209,92,0.13)', border: 'rgba(212,209,92,0.38)', z: 5, ty: -30 },
        { label: isTr ? 'When (Eylem/Request)' : 'When (Action/Request)', color: 'var(--ra-role-accent-2)', bg: 'rgba(184,192,204,0.12)', border: 'rgba(184,192,204,0.36)', z: 4, ty: -18 },
        { label: isTr ? 'Then (Assertion)' : 'Then (Assertion)', color: 'var(--ra-role-muted)', bg: 'rgba(208,194,221,0.11)', border: 'rgba(208,194,221,0.30)', z: 3, ty: -8 },
        { label: isTr ? 'JsonPath Doğrulama' : 'JsonPath Validation', color: 'var(--ra-role-success)', bg: 'rgba(111,191,115,0.11)', border: 'rgba(111,191,115,0.30)', z: 2, ty: 2 },
        { label: isTr ? 'Rapor (Report)' : 'Report', color: 'var(--ra-role-muted)', bg: 'rgba(208,194,221,0.08)', border: 'rgba(208,194,221,0.22)', z: 1, ty: 9 },
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
        setTimeout(() => { if (el) el.style.removeProperty('transition') }, 500)
    }

    return (
        <div className="ra-pipeline ra-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="ra-pipeline-title">{isTr ? 'given/when/then Zinciri' : 'given/when/then Chain'}</div>
            <div ref={pipelineRef} className="ra-stages ra-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="ra-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="ra-stage-dot" style={{ background: stage.color }} />
                        <span className="ra-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── REST Assured DSL Konsolu & given/when/then Zincir Panosu ────────── */
function RestAssuredConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'REST Assured konsoluna hoş geldiniz.\nÇalıştırmak için send yazın...'
            : 'Welcome to the REST Assured console.\nType send to execute...'
    )
    const checks = [
        { id: 'c1', label: isTr ? 'given() — base URI + header hazırlandı' : 'given() — base URI + headers prepared' },
        { id: 'c2', label: isTr ? 'when().get("/users") — istek gönderildi' : 'when().get("/users") — request sent' },
        { id: 'c3', label: isTr ? 'then().statusCode(200) — doğrulandı' : 'then().statusCode(200) — verified' },
    ]
    const [doneIds, setDoneIds] = useState([])
    const timersRef = useRef([])

    useEffect(() => () => timersRef.current.forEach(t => clearTimeout(t)), [])

    function runDemo(raw) {
        setDoneIds([])
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        checks.forEach((c, idx) => {
            const t = setTimeout(() => setDoneIds(prev => [...prev, c.id]), idx * 350)
            timersRef.current.push(t)
        })
        const finalTimer = setTimeout(() => {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + 'given().when().get("/users").then().statusCode(200) -> PASS (61ms)\n\n' + (isTr ? 'body("size()", equalTo(3)) ✓' : 'body("size()", equalTo(3)) ✓'))
        }, checks.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('send')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- send`
                    : `Command not recognized: "${raw}". Try command:\n- send`
            ))
        }
    }

    return (
        <div className="ra-console-box ra-reveal">
            <div className="ra-console">
                <div className="ra-console-header">
                    <span>rest-assured v5.x</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="ra-console-body">
                    {consoleOutput}
                    <div className="ra-console-input-row">
                        <span className="ra-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="ra-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="ra-order-board">
                {checks.map(c => (
                    <div key={c.id} className={`ra-order-item${doneIds.includes(c.id) ? ' done' : ''}`}>
                        <span>{doneIds.includes(c.id) ? '✓' : '○'}</span>
                        <span>{c.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + given/when/then Pipeline asimetrik hero banner ──────────────── */
function RestAssuredStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2010, suffix: '',  tr: 'Yayın Yılı',              en: 'Founded'              },
        { target: 100,  suffix: '%', tr: 'Java Tabanlı',            en: 'Java-based'           },
        { target: 3,    suffix: '',  tr: 'DSL Adımı',               en: 'DSL Steps'            },
        { target: 5,    suffix: '+', tr: 'Assertion Tipi',          en: 'Assertion Types'      },
    ]

    return (
        <div className="ra-hero-banner-container">
            <div className="ra-hero-banner">
                <RestAssuredPipeline isTr={isTr} />
                <div className="ra-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="ra-stat-item">
                            <div className="ra-stat-number-wrap">
                                <span className="ra-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="ra-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="ra-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <RestAssuredConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── RestAssuredPage ────────────────────────────────────────────────── */
function RestAssuredPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null)
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.restassured-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

        const particles = []
        const pColors = ['#d4d15c', '#b8c0cc', '#e5e28a', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'ra-particle'
            const size = 2 + Math.random() * 3.5
            p.style.left = `${Math.random() * 100}%`
            p.style.width = p.style.height = `${size}px`
            p.style.setProperty('--dur',   `${10 + Math.random() * 10}s`)
            p.style.setProperty('--delay', `${Math.random() * 13}s`)
            p.style.background = pColors[Math.floor(Math.random() * pColors.length)]
            wrapper.appendChild(p)
            particles.push(p)
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                if (e.target.classList.contains('ra-reveal')) {
                    requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('ra-visible')))
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.raReveal) return
            el.dataset.raReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('ra-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('ra-block')) child.classList.add('ra-block')
                setupReveal(child)
            })
        }
        applyBlockClasses()

        let mutTimer
        const mutObserver = new MutationObserver(() => {
            clearTimeout(mutTimer)
            mutTimer = setTimeout(() => { applyBlockClasses(); applyMagnetic() }, 60)
        })
        mutObserver.observe(wrapper, { childList: true, subtree: true })

        function animateCounter(el, target) {
            const startTime = performance.now()
            const duration = target > 1000 ? 2200 : 1600
            function step(now) {
                const elapsed = Math.min(now - startTime, duration)
                const progress = 1 - Math.pow(1 - elapsed / duration, 3)
                const current = Math.floor(progress * target)
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
                item.classList.remove('ra-stat-pending')
                item.classList.add('ra-stat-visible')
                const num = item.querySelector('.ra-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.ra-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('ra-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.ra-stat-item.ra-stat-pending').forEach(el => {
                el.classList.remove('ra-stat-pending')
                el.classList.add('ra-stat-visible')
                const num = el.querySelector('.ra-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        const heroH1 = wrapper.querySelector('main > div > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('ra-glitch')
        }

        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.ra-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.ra-magnetic-init)'
            ).forEach(btn => { btn.classList.add('ra-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.ra-magnetic-init, a.ra-magnetic-init')
            if (btn !== currentMagBtn) {
                if (currentMagBtn) resetMagnetic(currentMagBtn, true)
                currentMagBtn = btn
            }
            if (!btn) return
            const r = btn.getBoundingClientRect()
            const x = e.clientX - r.left - r.width / 2
            const y = e.clientY - r.top - r.height / 2
            btn.style.setProperty('transition', 'transform 0.15s ease', 'important')
            btn.style.setProperty('transform', `translate(${x * 0.28}px, ${y * 0.28}px)`, 'important')
        }
        function resetMagnetic(btn, spring = false) {
            if (!btn) return
            btn.style.setProperty('transition', spring ? 'transform 0.55s cubic-bezier(0.23,1,0.32,1)' : 'transform 0.3s ease', 'important')
            btn.style.setProperty('transform', 'translate(0,0)', 'important')
            setTimeout(() => { btn.style.removeProperty('transition'); btn.style.removeProperty('transform') }, 600)
        }
        function onWrapperMouseLeave() { if (currentMagBtn) { resetMagnetic(currentMagBtn, true); currentMagBtn = null } }

        wrapper.addEventListener('mousemove', onWrapperMouseMove)
        wrapper.addEventListener('mouseleave', onWrapperMouseLeave)

        function onWrapperPointerDown(e) {
            if (noMotion) return
            const btn = e.target.closest('button.ra-magnetic-init, a.ra-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('ra-squash')
            void btn.offsetWidth
            btn.classList.add('ra-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('ra-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'ra-ripple-span'
            span.style.width = span.style.height = `${size}px`
            span.style.left = `${e.clientX - r.left - size / 2}px`
            span.style.top = `${e.clientY - r.top - size / 2}px`
            span.style.background = 'rgba(238, 245, 236, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }
        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        const MAX_DEG = 6
        let currentTiltBlock = null
        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.ra-block')
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
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            block.style.setProperty('transition', 'transform 0.12s ease', 'important')
            block.style.setProperty('transform', `perspective(800px) rotateX(${-y * MAX_DEG}deg) rotateY(${x * MAX_DEG}deg) scale(1.01)`, 'important')
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
            contentArea.addEventListener('mousemove', onContentMouseMove)
            contentArea.addEventListener('mouseleave', onContentMouseLeave)
        }

        const revealFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.ra-reveal:not(.ra-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('ra-visible')
            })
        }, 1500)

        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--ra-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.ra-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.ra-reveal:not(.ra-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('ra-visible'))
                }
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            cleanupThemeObserver()
            particles.forEach(p => p.remove())
            mutObserver.disconnect()
            revealObserver.disconnect()
            statObserver.disconnect()
            clearTimeout(mutTimer)
            clearTimeout(statFallbackTimer)
            clearTimeout(revealFallbackTimer)
            if (heroH1) { heroH1.classList.remove('ra-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.ra-magnetic-init').forEach(btn => {
                btn.classList.remove('ra-magnetic-init', 'no-hover-scale', 'ra-squash')
                btn.style.removeProperty('transform')
                btn.style.removeProperty('transition')
            })
            wrapper.removeEventListener('mousemove', onWrapperMouseMove)
            wrapper.removeEventListener('mouseleave', onWrapperMouseLeave)
            wrapper.removeEventListener('pointerdown', onWrapperPointerDown)
            if (contentArea) {
                contentArea.removeEventListener('mousemove', onContentMouseMove)
                contentArea.removeEventListener('mouseleave', onContentMouseLeave)
            }
            window.removeEventListener('scroll', onScroll)
            wrapper.style.removeProperty('--ra-scroll-y')
            wrapper.style.removeProperty('--scroll-percent')
        }
    }, [])

    useEffect(() => {
        if (!soundOn || !isLightMode) {
            if (audioNodesRef.current) { stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx); audioNodesRef.current = null }
            if (thunderTimerRef.current) { clearInterval(thunderTimerRef.current); thunderTimerRef.current = null }
            return
        }
        const ctx = getAudioContext()
        const rain = createRainLoop(ctx)
        fadeGain(ctx, rain.gain, 0.06, 1.2)
        audioNodesRef.current = { ctx, rain }
        thunderTimerRef.current = setInterval(() => { playThunder(ctx, 0.35) }, THUNDER_INTERVAL_MS)
        return () => {
            if (audioNodesRef.current) { stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx); audioNodesRef.current = null }
            if (thunderTimerRef.current) { clearInterval(thunderTimerRef.current); thunderTimerRef.current = null }
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
    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

    const soundToggleButton = isLightMode ? (
        <button
            type="button"
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-yellow-300' : ''}`}
            onClick={handleToggleSound}
            title={language === 'tr' ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç') : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')}
            data-testid="restassured-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="restassured-page">
            <TopicPage
                data={restAssuredData}
                gradient="from-green-600 to-emerald-700"
                bgLight="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                extraBanner={<RestAssuredStatsBanner />}
                headerExtra={soundToggleButton}
            />
            <div
                className="ra-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="ra-wave-water" />
                <span className="ra-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default RestAssuredPage
