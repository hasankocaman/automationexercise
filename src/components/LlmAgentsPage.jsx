import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { llmAgentsData } from '../data/llmAgentsData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../llm-agents-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // llm-agents-pulse-flash CSS animasyonuyla aynı 10s döngü

/* ─── Agent Loop Pipeline: perceive→think→act→observe döngüsü ───── */
function LlmAgentLoopPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    // Renkler CSS değişkeni referansı olarak tutulur (--llm-role-*): light modda
    // koyu, dark modda pastel ton kullanılır — açık arka planda soluk/okunaksız
    // metin oluşmasını önler (bkz. llm-agents-effects.css §0).
    const stages = [
        {
            label: isTr ? 'Algıla (girdi/context oku)' : 'Perceive (read input/context)',
            color: 'var(--llm-role-accent)',
            bg: 'rgba(139,92,246,0.13)',
            border: 'rgba(139,92,246,0.38)',
            z: 4,
            ty: -22,
        },
        {
            label: isTr ? 'Düşün (araç mı, cevap mı?)' : 'Think (tool or direct answer?)',
            color: 'var(--llm-role-accent-2)',
            bg: 'rgba(160,106,30,0.13)',
            border: 'rgba(160,106,30,0.38)',
            z: 3,
            ty: -8,
        },
        {
            label: isTr ? 'Eyle (gerçek fonksiyonu çalıştır)' : 'Act (execute the real function)',
            color: 'var(--llm-role-muted)',
            bg: 'rgba(107,95,125,0.11)',
            border: 'rgba(107,95,125,0.30)',
            z: 2,
            ty: 4,
        },
        {
            label: isTr ? 'Gözle (sonucu geri besle)' : 'Observe (feed the result back)',
            color: 'var(--llm-role-success)',
            bg: 'rgba(47,143,78,0.11)',
            border: 'rgba(47,143,78,0.30)',
            z: 1,
            ty: 14,
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
            className="llm-agents-pipeline llm-agents-pipeline-interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="llm-agents-pipeline-title">
                {isTr ? 'Agent Döngüsü' : 'Agent Loop'}
            </div>
            <div ref={pipelineRef} className="llm-agents-stages llm-agents-stages-3d">
                {stages.map((stage, idx) => (
                    <div
                        key={idx}
                        className="llm-agents-stage"
                        style={{
                            '--stage-z': stage.z,
                            '--ty': `${stage.ty}px`,
                            background: stage.bg,
                            borderColor: stage.border,
                            color: stage.color,
                        }}
                    >
                        <span className="llm-agents-stage-dot" style={{ background: stage.color }} />
                        <span className="llm-agents-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Agent Konsolu & Döngü İzleyici Simülatörü ──────────────────
   Deterministik anahtar kelime kontrolü — gerçek API çağrısı yok
   (bkz. llmcreate.md "sayfada canlı API çağrısı yok" kuralı). */
function LlmAgentConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Agent konsoluna hoş geldiniz.\nBir görev yazıp Enter\'a basın...'
            : 'Welcome to the agent console.\nType a task and press Enter...'
    )
    const [steps, setSteps] = useState([])

    function runLoop(raw) {
        const lower = raw.toLowerCase()
        const needsTool = /\b(flaky|test|bug|hata|rapor|report)\b/.test(lower)
        if (needsTool) {
            return [
                { msg: isTr ? 'Algıla: girdi okundu' : 'Perceive: input read', acted: false },
                { msg: isTr ? 'Düşün: araç gerekli → report_flaky_test' : 'Think: tool needed → report_flaky_test', acted: false },
                { msg: isTr ? 'Eyle: report_flaky_test() çalıştırıldı' : 'Act: report_flaky_test() executed', acted: true },
                { msg: isTr ? 'Gözle: sonuç kaydedildi ✓' : 'Observe: result recorded ✓', acted: true },
            ]
        }
        return [
            { msg: isTr ? 'Algıla: girdi okundu' : 'Perceive: input read', acted: false },
            { msg: isTr ? 'Düşün: araç gerekmiyor' : 'Think: no tool needed', acted: false },
            { msg: isTr ? 'Eyle: doğrudan cevap üretildi' : 'Act: answered directly', acted: true },
            { msg: isTr ? 'Gözle: görev tamamlandı ✓' : 'Observe: task complete ✓', acted: true },
        ]
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        if (!raw) return
        setInputValue('')
        const result = runLoop(raw)
        setSteps(result)
        setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
            isTr ? `${result.length} adımlık döngü tamamlandı.` : `${result.length}-step loop completed.`
        ))
    }

    return (
        <div className="llm-agents-console-box llm-agents-reveal">
            <div className="llm-agents-console">
                <div className="llm-agents-console-header">
                    <span>agent-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="llm-agents-console-body">
                    {consoleOutput}
                    <div className="llm-agents-console-input-row">
                        <span className="llm-agents-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="llm-agents-console-input"
                            placeholder={isTr ? 'Bir görev yaz...' : 'Type a task...'}
                        />
                    </div>
                </div>
            </div>
            <div className="llm-agents-loop-log">
                {steps.length === 0 && (
                    <span className="llm-agents-loop-empty">
                        {isTr ? 'Henüz çalıştırılmadı...' : 'Not run yet...'}
                    </span>
                )}
                {steps.map((s, idx) => (
                    <div key={idx} className={`llm-agents-loop-row${s.acted ? ' acted' : ''}`}>
                        <span className="llm-agents-loop-dot" />
                        <span className="llm-agents-loop-msg">{s.msg}</span>
                        <span className="llm-agents-loop-badge">{s.acted ? '⚙️' : '🧠'}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Agent Loop Pipeline asimetrik hero banner ───────── */
function LlmAgentsStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 4,   suffix: '',  tr: 'Eğitim Seviyesi',   en: 'Training Levels'   },
        { target: 4,   suffix: '',  tr: 'Döngü Adımı',       en: 'Agent Loop Steps'  },
        { target: 8,   suffix: '',  tr: 'Risk Senaryosu',    en: 'Risk Scenarios'    },
        { target: 100, suffix: '%', tr: 'Simüle Edilmiş',    en: 'Simulated'         },
    ]

    return (
        <div className="llm-agents-hero-banner-container">
            <div className="llm-agents-hero-banner">
                {/* Sol: Agent Loop Pipeline (1.4fr) */}
                <LlmAgentLoopPipeline isTr={isTr} />

                {/* Sağ: Stats 2×2 grid (1fr) */}
                <div className="llm-agents-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="llm-agents-stat-item">
                            <div className="llm-agents-stat-number-wrap">
                                <span className="llm-agents-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="llm-agents-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="llm-agents-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Alt: Agent Konsolu / Döngü İzleyici */}
            <LlmAgentConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── LlmAgentsPage ────────────────────────────────────────────── */
function LlmAgentsPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.llm-agents-page')
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

        /* ── 1. Yüzen Parçacıklar (menekşe + altın) ────────────── */
        const particles = []
        const pColors = ['#8b5cf6', '#d4a24c', '#b794f6', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'llm-agents-particle'
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
                if (e.target.classList.contains('llm-agents-reveal')) {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                            e.target.classList.add('llm-agents-visible')
                        )
                    )
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.llmAgentsReveal) return
            el.dataset.llmAgentsReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('llm-agents-reveal')
            revealObserver.observe(el)
        }

        /* ── 3. llm-agents-block sınıfı + reveal → tab değişimlerini yakala */
        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('llm-agents-block')) child.classList.add('llm-agents-block')
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
                item.classList.remove('llm-agents-stat-pending')
                item.classList.add('llm-agents-stat-visible')
                const num = item.querySelector('.llm-agents-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num)         num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.llm-agents-stat-item').forEach((el, i) => {
            if (!noMotion) {
                el.classList.add('llm-agents-stat-pending')
                el.style.transitionDelay = `${i * 0.12}s`
            }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.llm-agents-stat-item.llm-agents-stat-pending').forEach(el => {
                el.classList.remove('llm-agents-stat-pending')
                el.classList.add('llm-agents-stat-visible')
                const num = el.querySelector('.llm-agents-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        /* ── 5. Glitch: Hero h1 ────────────────────────────────── */
        const heroH1 = wrapper.querySelector('main > div > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('llm-agents-glitch')
        }

        /* ── 6. Manyetik Buton (event delegation) ─────────────── */
        let currentMagBtn = null

        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.llm-agents-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.llm-agents-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('llm-agents-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.llm-agents-magnetic-init, a.llm-agents-magnetic-init')
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
            const btn = e.target.closest('button.llm-agents-magnetic-init, a.llm-agents-magnetic-init')
            if (!btn) return

            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')

            btn.classList.remove('llm-agents-squash')
            void btn.offsetWidth
            btn.classList.add('llm-agents-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('llm-agents-squash'), { once: true })

            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'llm-agents-ripple-span'
            span.style.width  = span.style.height = `${size}px`
            span.style.left   = `${e.clientX - r.left  - size / 2}px`
            span.style.top    = `${e.clientY - r.top   - size / 2}px`
            span.style.background = 'rgba(243, 237, 251, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }

        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        /* ── 8. Bireysel Blok 3D Tilt (event delegation) ──────── */
        const MAX_DEG = 6
        let currentTiltBlock = null

        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.llm-agents-block')

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
            wrapper.querySelectorAll('.llm-agents-reveal:not(.llm-agents-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('llm-agents-visible')
            })
        }, 1500)

        /* ── 9. Parallax + Scroll Reveal Fallback + Okuma İlerlemesi ── */
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--llm-scroll-y', `${sY * 0.08}px`)

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)

            const pctEl = wrapper.querySelector('.llm-agents-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`

            wrapper.querySelectorAll('.llm-agents-reveal:not(.llm-agents-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('llm-agents-visible'))
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
                heroH1.classList.remove('llm-agents-glitch')
                heroH1.removeAttribute('data-text')
            }
            wrapper.querySelectorAll('.llm-agents-magnetic-init').forEach(btn => {
                btn.classList.remove('llm-agents-magnetic-init', 'no-hover-scale', 'llm-agents-squash')
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
            wrapper.style.removeProperty('--llm-scroll-y')
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-violet-300' : ''}`}
            onClick={handleToggleSound}
            title={
                language === 'tr'
                    ? (soundOn ? 'Ortam sesini kapat' : 'Ortam sesini aç')
                    : (soundOn ? 'Mute ambient sound' : 'Unmute ambient sound')
            }
            data-testid="llm-agents-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="llm-agents-page">
            <TopicPage
                data={llmAgentsData}
                gradient="from-violet-600 to-purple-800"
                bgLight="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"
                extraBanner={<LlmAgentsStatsBanner />}
                headerExtra={soundToggleButton}
            />
            {/* Dalgalı İlerleme Çemberi */}
            <div
                className="llm-agents-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="llm-agents-wave-water" />
                <span className="llm-agents-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default LlmAgentsPage
