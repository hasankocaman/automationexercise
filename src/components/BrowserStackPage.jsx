import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { browserstackData } from '../data/browserstackData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../browserstack-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // bs-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── Gerçek Cihaz Test Akışı: bir test script'i bulut cihaz havuzuna nasıl ulaşır ─── */
function BrowserStackPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? 'Test Script' : 'Test Script', color: 'var(--bs-role-accent)', bg: 'rgba(251,191,36,0.13)', border: 'rgba(251,191,36,0.38)', z: 5, ty: -30 },
        { label: isTr ? 'BrowserStack Hub' : 'BrowserStack Hub', color: 'var(--bs-role-violet)', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.36)', z: 4, ty: -18 },
        { label: isTr ? 'Cihaz Havuzu (Device Farm)' : 'Device Farm (Cloud)', color: 'var(--bs-role-muted)', bg: 'rgba(207,206,224,0.11)', border: 'rgba(207,206,224,0.30)', z: 3, ty: -8 },
        { label: isTr ? 'Gerçek Cihaz Çalıştırma' : 'Real Device Execution', color: 'var(--bs-role-success)', bg: 'rgba(74,222,128,0.11)', border: 'rgba(74,222,128,0.30)', z: 2, ty: 2 },
        { label: isTr ? 'Video/Log Raporu' : 'Video/Log Report', color: 'var(--bs-role-muted)', bg: 'rgba(207,206,224,0.08)', border: 'rgba(207,206,224,0.22)', z: 1, ty: 9 },
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
        <div className="bs-pipeline bs-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bs-pipeline-title">{isTr ? 'Gerçek Cihaz Test Akışı' : 'Real Device Test Flow'}</div>
            <div ref={pipelineRef} className="bs-stages bs-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="bs-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="bs-stage-dot" style={{ background: stage.color }} />
                        <span className="bs-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── BrowserStack Grid Konsolu & Paralel Cihaz Panosu ────────── */
function BrowserStackConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'BrowserStack konsoluna hoş geldiniz.\nÇalıştırmak için run-parallel yazın...'
            : 'Welcome to the BrowserStack console.\nType run-parallel to execute...'
    )
    const checks = [
        { id: 'c1', label: isTr ? 'Chrome / Windows 11 — PASS' : 'Chrome / Windows 11 — PASS' },
        { id: 'c2', label: isTr ? 'Safari / iOS 17 — PASS' : 'Safari / iOS 17 — PASS' },
        { id: 'c3', label: isTr ? 'Samsung Galaxy / Android 14 — PASS' : 'Samsung Galaxy / Android 14 — PASS' },
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
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + '3/3 devices PASS — video + log kaydedildi\n\n' + (isTr ? 'Gerçek cihazda flaky sonuç görülmedi ✓' : 'No flaky result seen on real devices ✓'))
        }, checks.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('run-parallel')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- run-parallel`
                    : `Command not recognized: "${raw}". Try command:\n- run-parallel`
            ))
        }
    }

    return (
        <div className="bs-console-box bs-reveal">
            <div className="bs-console">
                <div className="bs-console-header">
                    <span>browserstack-grid</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="bs-console-body">
                    {consoleOutput}
                    <div className="bs-console-input-row">
                        <span className="bs-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="bs-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="bs-order-board">
                {checks.map(c => (
                    <div key={c.id} className={`bs-order-item${doneIds.includes(c.id) ? ' done' : ''}`}>
                        <span>{doneIds.includes(c.id) ? '✓' : '○'}</span>
                        <span>{c.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Device Farm Pipeline asimetrik hero banner ──────────────── */
function BrowserStackStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2011, suffix: '',  tr: 'Yayın Yılı',              en: 'Founded'              },
        { target: 3500, suffix: '+', tr: 'Gerçek Cihaz/Tarayıcı',   en: 'Real Devices/Browsers' },
        { target: 5,    suffix: '',  tr: 'Test Akış Aşaması',       en: 'Test Flow Stages'     },
        { target: 3,    suffix: '',  tr: 'Paralel Örnek Çalıştırma', en: 'Sample Parallel Runs' },
    ]

    return (
        <div className="bs-hero-banner-container">
            <div className="bs-hero-banner">
                <BrowserStackPipeline isTr={isTr} />
                <div className="bs-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="bs-stat-item">
                            <div className="bs-stat-number-wrap">
                                <span className="bs-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="bs-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="bs-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <BrowserStackConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── BrowserStackPage ────────────────────────────────────────────────── */
function BrowserStackPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null)
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.browserstack-page')
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
        const pColors = ['#fbbf24', '#fde08a', '#a78bfa', '#cbb8fc', '#4ade80']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'bs-particle'
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
                if (e.target.classList.contains('bs-reveal')) {
                    requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('bs-visible')))
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.bsReveal) return
            el.dataset.bsReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('bs-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('bs-block')) child.classList.add('bs-block')
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
                item.classList.remove('bs-stat-pending')
                item.classList.add('bs-stat-visible')
                const num = item.querySelector('.bs-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.bs-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('bs-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.bs-stat-item.bs-stat-pending').forEach(el => {
                el.classList.remove('bs-stat-pending')
                el.classList.add('bs-stat-visible')
                const num = el.querySelector('.bs-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        const heroH1 = wrapper.querySelector('main > div:first-child h1') /* duzeltildi: onceki secici gercek DOM ile eslesmiyordu, glitch calismiyordu */
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('bs-glitch')
        }

        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.bs-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.bs-magnetic-init)'
            ).forEach(btn => { btn.classList.add('bs-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.bs-magnetic-init, a.bs-magnetic-init')
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
            const btn = e.target.closest('button.bs-magnetic-init, a.bs-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('bs-squash')
            void btn.offsetWidth
            btn.classList.add('bs-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('bs-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'bs-ripple-span'
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
            const block = e.target.closest('.bs-block')
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
            wrapper.querySelectorAll('.bs-reveal:not(.bs-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('bs-visible')
            })
        }, 1500)

        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--bs-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.bs-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.bs-reveal:not(.bs-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('bs-visible'))
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
            if (heroH1) { heroH1.classList.remove('bs-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.bs-magnetic-init').forEach(btn => {
                btn.classList.remove('bs-magnetic-init', 'no-hover-scale', 'bs-squash')
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
            wrapper.style.removeProperty('--bs-scroll-y')
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
            data-testid="browserstack-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="browserstack-page">
            <TopicPage
                data={browserstackData}
                gradient="from-orange-500 to-red-600"
                bgLight="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"
                extraBanner={<BrowserStackStatsBanner />}
                headerExtra={soundToggleButton}
            />
            <div
                className="bs-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="bs-wave-water" />
                <span className="bs-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default BrowserStackPage
