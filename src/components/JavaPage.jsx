import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { javaData } from '../data/javaData'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../java-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // java-lightning-flash CSS animasyonuyla aynı 10s döngü

const JavaDocBanner = () => {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const tags = [
        t('javaBanner.tagJavaSE'),
        t('javaBanner.tagChapters'),
        t('javaBanner.tagSearch'),
        t('javaBanner.tagIndex'),
    ]
    return (
        <button
            onClick={() => navigate('/java-document')}
            className="group w-full text-left block mb-6 rounded-2xl overflow-hidden border-2 border-orange-500/30 hover:border-orange-400/70 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 bg-transparent cursor-pointer"
        >
            <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-slate-900 p-5 flex items-center gap-5">
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">📖</div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                        {t('javaBanner.subtitle')}
                    </div>
                    <div className="text-lg font-bold text-white leading-tight">
                        {t('javaBanner.title')}
                    </div>
                    <div className="text-sm text-orange-200/80 mt-1 leading-relaxed">
                        {t('javaBanner.description')}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="text-3xl text-orange-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</div>
            </div>
        </button>
    )
}

/* ─── JVM Execution Pipeline: kaynak koddan çalışan programa ─── */
function JavaPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? 'Kaynak Kod (.java)' : 'Source Code (.java)', color: 'var(--java-role-accent)', bg: 'rgba(201,123,61,0.13)', border: 'rgba(201,123,61,0.38)', z: 5, ty: -30 },
        { label: 'javac (Derleme)', color: 'var(--java-role-accent-2)', bg: 'rgba(47,158,143,0.12)', border: 'rgba(47,158,143,0.36)', z: 4, ty: -18 },
        { label: isTr ? 'Bytecode (.class)' : 'Bytecode (.class)', color: 'var(--java-role-muted)', bg: 'rgba(212,194,174,0.11)', border: 'rgba(212,194,174,0.30)', z: 3, ty: -8 },
        { label: 'JVM (ClassLoader)', color: 'var(--java-role-success)', bg: 'rgba(111,191,115,0.11)', border: 'rgba(111,191,115,0.30)', z: 2, ty: 2 },
        { label: isTr ? 'JIT + Çalışma' : 'JIT + Execution', color: 'var(--java-role-muted)', bg: 'rgba(212,194,174,0.08)', border: 'rgba(212,194,174,0.22)', z: 1, ty: 9 },
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
        <div className="java-pipeline java-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="java-pipeline-title">{isTr ? 'JVM Çalıştırma Hattı' : 'JVM Execution Pipeline'}</div>
            <div ref={pipelineRef} className="java-stages java-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="java-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="java-stage-dot" style={{ background: stage.color }} />
                        <span className="java-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── javac/java Konsolu & Sınıf Yükleme Aşamaları ─────────────── */
function JavaConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Java konsoluna hoş geldiniz.\nÇalıştırmak için javac Main.java && java Main yazın...'
            : 'Welcome to the Java console.\nType javac Main.java && java Main to run...'
    )
    const stages = [
        { id: 'loading', label: isTr ? 'Loading (.class okunuyor)' : 'Loading (.class read)' },
        { id: 'linking', label: isTr ? 'Linking (Doğrulama)' : 'Linking (Verification)' },
        { id: 'init', label: isTr ? 'Initialization (static)' : 'Initialization (static)' },
        { id: 'run', label: isTr ? 'Running (main çalışıyor)' : 'Running (main executing)' },
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
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? 'Main.class derlendi.\nHello, JVM!\n\nProcess finished with exit code 0'
                    : 'Main.class compiled.\nHello, JVM!\n\nProcess finished with exit code 0'
            ))
        }, stages.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('javac') || cmd.includes('java ')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- javac Main.java && java Main`
                    : `Command not recognized: "${raw}". Try command:\n- javac Main.java && java Main`
            ))
        }
    }

    return (
        <div className="java-console-box java-reveal">
            <div className="java-console">
                <div className="java-console-header">
                    <span>java-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="java-console-body">
                    {consoleOutput}
                    <div className="java-console-input-row">
                        <span className="java-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="java-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="java-order-board">
                {stages.map(s => (
                    <div key={s.id} className={`java-order-item${doneIds.includes(s.id) ? ' done' : ''}`}>
                        <span className="java-order-dot" />
                        <span>{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + JVM Pipeline asimetrik hero banner ───────────────── */
function JavaStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 1995, suffix: '',  tr: 'Yayın Yılı',              en: 'Founded'                },
        { target: 100,  suffix: '%', tr: 'Platform Bağımsız',        en: 'Platform Independent'   },
        { target: 3,    suffix: '',  tr: 'Bellek Alanı',             en: 'Memory Areas'           },
        { target: 1,    suffix: '',  tr: 'Sanal Makine (JVM)',       en: 'Virtual Machine (JVM)'  },
    ]

    return (
        <div className="java-hero-banner-container">
            <div className="java-hero-banner">
                <JavaPipeline isTr={isTr} />
                <div className="java-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="java-stat-item">
                            <div className="java-stat-number-wrap">
                                <span className="java-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="java-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="java-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <JavaConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── JavaPage ─────────────────────────────────────────────────── */
function JavaPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null)
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.java-page')
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
        const pColors = ['#c97b3d', '#2f9e8f', '#e0a366', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'java-particle'
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
                if (e.target.classList.contains('java-reveal')) {
                    requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('java-visible')))
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.javaReveal) return
            el.dataset.javaReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('java-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('java-block')) child.classList.add('java-block')
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
                item.classList.remove('java-stat-pending')
                item.classList.add('java-stat-visible')
                const num = item.querySelector('.java-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.java-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('java-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.java-stat-item.java-stat-pending').forEach(el => {
                el.classList.remove('java-stat-pending')
                el.classList.add('java-stat-visible')
                const num = el.querySelector('.java-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        const heroH1 = wrapper.querySelector('main > div > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('java-glitch')
        }

        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.java-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.java-magnetic-init)'
            ).forEach(btn => { btn.classList.add('java-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.java-magnetic-init, a.java-magnetic-init')
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
            const btn = e.target.closest('button.java-magnetic-init, a.java-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('java-squash')
            void btn.offsetWidth
            btn.classList.add('java-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('java-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'java-ripple-span'
            span.style.width = span.style.height = `${size}px`
            span.style.left = `${e.clientX - r.left - size / 2}px`
            span.style.top = `${e.clientY - r.top - size / 2}px`
            span.style.background = 'rgba(247, 237, 224, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }
        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        const MAX_DEG = 6
        let currentTiltBlock = null
        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.java-block')
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
            wrapper.querySelectorAll('.java-reveal:not(.java-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('java-visible')
            })
        }, 1500)

        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--java-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.java-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.java-reveal:not(.java-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('java-visible'))
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
            if (heroH1) { heroH1.classList.remove('java-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.java-magnetic-init').forEach(btn => {
                btn.classList.remove('java-magnetic-init', 'no-hover-scale', 'java-squash')
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
            wrapper.style.removeProperty('--java-scroll-y')
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-orange-300' : ''}`}
            onClick={handleToggleSound}
            title={language === 'tr' ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç') : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')}
            data-testid="java-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="java-page">
            <TopicPage
                data={javaData}
                gradient="from-orange-600 to-amber-600"
                bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
                extraBanner={
                    <>
                        <JavaDocBanner />
                        <JavaStatsBanner />
                    </>
                }
                headerExtra={soundToggleButton}
            />
            <div
                className="java-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="java-wave-water" />
                <span className="java-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default JavaPage
