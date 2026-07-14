import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { linuxData } from '../data/linuxData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../linux-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // linux-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── Shell Command Pipeline: bir komut nasıl çalışır ─── */
function LinuxPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? 'Komut Girişi (Shell)' : 'Command Input (Shell)', color: 'var(--linux-role-accent)', bg: 'rgba(61,220,90,0.13)', border: 'rgba(61,220,90,0.38)', z: 5, ty: -30 },
        { label: isTr ? 'Ayrıştırma (Parsing)' : 'Parsing', color: 'var(--linux-role-accent-2)', bg: 'rgba(255,180,84,0.12)', border: 'rgba(255,180,84,0.36)', z: 4, ty: -18 },
        { label: 'Process Fork', color: 'var(--linux-role-muted)', bg: 'rgba(184,201,174,0.11)', border: 'rgba(184,201,174,0.30)', z: 3, ty: -8 },
        { label: isTr ? 'Exec (Çalıştırma)' : 'Exec', color: 'var(--linux-role-success)', bg: 'rgba(111,191,115,0.11)', border: 'rgba(111,191,115,0.30)', z: 2, ty: 2 },
        { label: 'stdout / stderr', color: 'var(--linux-role-muted)', bg: 'rgba(184,201,174,0.08)', border: 'rgba(184,201,174,0.22)', z: 1, ty: 9 },
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
        <div className="linux-pipeline linux-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="linux-pipeline-title">{isTr ? 'Shell Komut Hattı' : 'Shell Command Pipeline'}</div>
            <div ref={pipelineRef} className="linux-stages linux-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="linux-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="linux-stage-dot" style={{ background: stage.color }} />
                        <span className="linux-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Bash Konsolu & Boru Hattı (Pipe Flow) Görselleştirici ─────── */
function LinuxConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'bash konsoluna hoş geldiniz.\nDenemek için ls -la | grep .log yazın...'
            : 'Welcome to the bash console.\nType ls -la | grep .log to try...'
    )
    const stages = [
        { id: 's1', label: 'ls -la', arrow: '→' },
        { id: 's2', label: isTr ? '(pipe) çıktı aktarıldı' : '(pipe) output piped', arrow: '→' },
        { id: 's3', label: 'grep .log', arrow: '→' },
        { id: 's4', label: 'stdout', arrow: '' },
    ]
    const [doneIds, setDoneIds] = useState([])
    const timersRef = useRef([])

    useEffect(() => () => timersRef.current.forEach(t => clearTimeout(t)), [])

    function runDemo(raw) {
        setDoneIds([])
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        stages.forEach((s, idx) => {
            const t = setTimeout(() => setDoneIds(prev => [...prev, s.id]), idx * 350)
            timersRef.current.push(t)
        })
        const finalTimer = setTimeout(() => {
            setConsoleOutput(prev => prev + `\n$ ${raw}\n` +
                '-rw-r--r-- 1 qa staff  1.2K app.log\n-rw-r--r-- 1 qa staff  4.0K error.log\n' +
                (isTr ? '(sadece .log ile eşleşen satırlar gösterildi)' : '(only lines matching .log shown)'))
        }, stages.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('ls') && cmd.includes('grep')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n$ ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- ls -la | grep .log`
                    : `Command not recognized: "${raw}". Try command:\n- ls -la | grep .log`
            ))
        }
    }

    return (
        <div className="linux-console-box linux-reveal">
            <div className="linux-console">
                <div className="linux-console-header">
                    <span>bash-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="linux-console-body">
                    {consoleOutput}
                    <div className="linux-console-input-row">
                        <span className="linux-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="linux-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="linux-order-board">
                {stages.map(s => (
                    <div key={s.id} className={`linux-order-item${doneIds.includes(s.id) ? ' done' : ''}`}>
                        <span>{s.label}</span>
                        {s.arrow && <span className="linux-order-arrow">{s.arrow}</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Shell Pipeline asimetrik hero banner ─────────────── */
function LinuxStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 1991, suffix: '',  tr: 'Yayın Yılı',           en: 'Founded'              },
        { target: 100,  suffix: '%', tr: 'Açık Kaynak',           en: 'Open Source'          },
        { target: 3,    suffix: '',  tr: 'İzin Türü',             en: 'Permission Types'     },
        { target: 5,    suffix: '+', tr: 'Temel Komut Kategorisi',en: 'Core Command Categories' },
    ]

    return (
        <div className="linux-hero-banner-container">
            <div className="linux-hero-banner">
                <LinuxPipeline isTr={isTr} />
                <div className="linux-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="linux-stat-item">
                            <div className="linux-stat-number-wrap">
                                <span className="linux-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="linux-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="linux-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <LinuxConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── LinuxPage ────────────────────────────────────────────────── */
function LinuxPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null)
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.linux-page')
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
        const pColors = ['#3ddc5a', '#ffb454', '#7dffa0', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'linux-particle'
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
                if (e.target.classList.contains('linux-reveal')) {
                    requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('linux-visible')))
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.linuxReveal) return
            el.dataset.linuxReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('linux-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('linux-block')) child.classList.add('linux-block')
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
                item.classList.remove('linux-stat-pending')
                item.classList.add('linux-stat-visible')
                const num = item.querySelector('.linux-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.linux-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('linux-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.linux-stat-item.linux-stat-pending').forEach(el => {
                el.classList.remove('linux-stat-pending')
                el.classList.add('linux-stat-visible')
                const num = el.querySelector('.linux-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        const heroH1 = wrapper.querySelector('main > div:first-child h1') /* duzeltildi: onceki secici gercek DOM ile eslesmiyordu, glitch calismiyordu */
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('linux-glitch')
        }

        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.linux-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.linux-magnetic-init)'
            ).forEach(btn => { btn.classList.add('linux-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.linux-magnetic-init, a.linux-magnetic-init')
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
            const btn = e.target.closest('button.linux-magnetic-init, a.linux-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('linux-squash')
            void btn.offsetWidth
            btn.classList.add('linux-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('linux-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'linux-ripple-span'
            span.style.width = span.style.height = `${size}px`
            span.style.left = `${e.clientX - r.left - size / 2}px`
            span.style.top = `${e.clientY - r.top - size / 2}px`
            span.style.background = 'rgba(232, 245, 223, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }
        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        const MAX_DEG = 6
        let currentTiltBlock = null
        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.linux-block')
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
            wrapper.querySelectorAll('.linux-reveal:not(.linux-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('linux-visible')
            })
        }, 1500)

        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--linux-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.linux-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.linux-reveal:not(.linux-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('linux-visible'))
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
            if (heroH1) { heroH1.classList.remove('linux-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.linux-magnetic-init').forEach(btn => {
                btn.classList.remove('linux-magnetic-init', 'no-hover-scale', 'linux-squash')
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
            wrapper.style.removeProperty('--linux-scroll-y')
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-green-300' : ''}`}
            onClick={handleToggleSound}
            title={language === 'tr' ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç') : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')}
            data-testid="linux-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="linux-page">
            <TopicPage
                data={linuxData}
                gradient="from-slate-700 to-yellow-600"
                bgLight="bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50"
                extraBanner={<LinuxStatsBanner />}
                headerExtra={soundToggleButton}
            />
            <div
                className="linux-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="linux-wave-water" />
                <span className="linux-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default LinuxPage
