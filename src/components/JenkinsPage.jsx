import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { jenkinsData } from '../data/jenkinsData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../jenkins-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // jk-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── Jenkinsfile Pipeline Aşamaları: bir build adım adım nasıl akar ─── */
function JenkinsPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? 'Checkout (SCM)' : 'Checkout (SCM)', color: 'var(--jk-role-accent)', bg: 'rgba(224,72,62,0.13)', border: 'rgba(224,72,62,0.38)', z: 5, ty: -38 },
        { label: isTr ? 'Build (Derle)' : 'Build', color: 'var(--jk-role-ice)', bg: 'rgba(125,211,252,0.12)', border: 'rgba(125,211,252,0.36)', z: 4, ty: -24 },
        { label: isTr ? 'Test (Çalıştır)' : 'Test (Run)', color: 'var(--jk-role-muted)', bg: 'rgba(199,204,212,0.11)', border: 'rgba(199,204,212,0.30)', z: 3, ty: -12 },
        { label: isTr ? 'Deploy (Yayınla)' : 'Deploy', color: 'var(--jk-role-success)', bg: 'rgba(74,222,128,0.11)', border: 'rgba(74,222,128,0.30)', z: 2, ty: -1 },
        { label: isTr ? 'Post (Bildirim/Temizlik)' : 'Post (Notify/Cleanup)', color: 'var(--jk-role-muted)', bg: 'rgba(199,204,212,0.08)', border: 'rgba(199,204,212,0.22)', z: 1, ty: 9 },
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
        <div className="jk-pipeline jk-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="jk-pipeline-title">{isTr ? 'Jenkinsfile Pipeline Aşamaları' : 'Jenkinsfile Pipeline Stages'}</div>
            <div ref={pipelineRef} className="jk-stages jk-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="jk-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="jk-stage-dot" style={{ background: stage.color }} />
                        <span className="jk-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Jenkins Build Konsolu & Pipeline Aşama Panosu ────────── */
function JenkinsConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Jenkins pipeline konsoluna hoş geldiniz.\nÇalıştırmak için build yazın...'
            : 'Welcome to the Jenkins pipeline console.\nType build to execute...'
    )
    const stages = [
        { id: 's1', label: isTr ? 'Checkout — SCM klonlandı' : 'Checkout — SCM cloned' },
        { id: 's2', label: isTr ? 'Build — mvn package başarılı' : 'Build — mvn package succeeded' },
        { id: 's3', label: isTr ? 'Test — 42/42 test PASS' : 'Test — 42/42 tests PASS' },
        { id: 's4', label: isTr ? 'Deploy — staging ortamına gönderildi' : 'Deploy — shipped to staging' },
    ]
    const [doneIds, setDoneIds] = useState([])
    const timersRef = useRef([])

    useEffect(() => () => timersRef.current.forEach(t => clearTimeout(t)), [])

    function runDemo(raw) {
        setDoneIds([])
        timersRef.current.forEach(t => clearTimeout(t))
        timersRef.current = []
        stages.forEach((c, idx) => {
            const t = setTimeout(() => setDoneIds(prev => [...prev, c.id]), idx * 350)
            timersRef.current.push(t)
        })
        const finalTimer = setTimeout(() => {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + 'Pipeline #128 -> SUCCESS (2m 14s)\n\n' + (isTr ? 'Post: Slack bildirimi gönderildi ✓' : 'Post: Slack notification sent ✓'))
        }, stages.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('build')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komut:\n- build`
                    : `Command not recognized: "${raw}". Try command:\n- build`
            ))
        }
    }

    return (
        <div className="jk-console-box jk-reveal">
            <div className="jk-console">
                <div className="jk-console-header">
                    <span>Jenkins Pipeline #128</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="jk-console-body">
                    {consoleOutput}
                    <div className="jk-console-input-row">
                        <span className="jk-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="jk-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="jk-order-board">
                {stages.map(c => (
                    <div key={c.id} className={`jk-order-item${doneIds.includes(c.id) ? ' done' : ''}`}>
                        <span>{doneIds.includes(c.id) ? '✓' : '○'}</span>
                        <span>{c.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Pipeline asimetrik hero banner ──────────────── */
function JenkinsStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2011, suffix: '',  tr: 'Yayın Yılı',              en: 'Founded'              },
        { target: 1800, suffix: '+', tr: 'Plugin Sayısı',           en: 'Plugins Available'    },
        { target: 5,    suffix: '',  tr: 'Pipeline Aşaması',        en: 'Pipeline Stages'      },
        { target: 100,  suffix: '%', tr: 'Açık Kaynak',             en: 'Open Source'          },
    ]

    return (
        <div className="jk-hero-banner-container">
            <div className="jk-hero-banner">
                <JenkinsPipeline isTr={isTr} />
                <div className="jk-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="jk-stat-item">
                            <div className="jk-stat-number-wrap">
                                <span className="jk-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="jk-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="jk-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <JenkinsConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── JenkinsPage ────────────────────────────────────────────────── */
function JenkinsPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null)
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.jenkins-page')
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
        const pColors = ['#e0483e', '#7dd3fc', '#ff7a6e', '#4ade80', '#f5b942']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'jk-particle'
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
                if (e.target.classList.contains('jk-reveal')) {
                    requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('jk-visible')))
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.jkReveal) return
            el.dataset.jkReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('jk-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('jk-block')) child.classList.add('jk-block')
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
                item.classList.remove('jk-stat-pending')
                item.classList.add('jk-stat-visible')
                const num = item.querySelector('.jk-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.jk-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('jk-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.jk-stat-item.jk-stat-pending').forEach(el => {
                el.classList.remove('jk-stat-pending')
                el.classList.add('jk-stat-visible')
                const num = el.querySelector('.jk-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        const heroH1 = wrapper.querySelector('main > div:first-child h1') /* duzeltildi: onceki secici gercek DOM ile eslesmiyordu, glitch calismiyordu */
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('jk-glitch')
        }

        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.jk-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.jk-magnetic-init)'
            ).forEach(btn => { btn.classList.add('jk-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.jk-magnetic-init, a.jk-magnetic-init')
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
            const btn = e.target.closest('button.jk-magnetic-init, a.jk-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('jk-squash')
            void btn.offsetWidth
            btn.classList.add('jk-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('jk-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'jk-ripple-span'
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
            const block = e.target.closest('.jk-block')
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
            wrapper.querySelectorAll('.jk-reveal:not(.jk-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('jk-visible')
            })
        }, 1500)

        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--jk-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.jk-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.jk-reveal:not(.jk-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('jk-visible'))
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
            if (heroH1) { heroH1.classList.remove('jk-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.jk-magnetic-init').forEach(btn => {
                btn.classList.remove('jk-magnetic-init', 'no-hover-scale', 'jk-squash')
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
            wrapper.style.removeProperty('--jk-scroll-y')
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
            data-testid="jenkins-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="jenkins-page">
            <TopicPage
                data={jenkinsData}
                gradient="from-blue-600 to-slate-700"
                bgLight="bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50"
                extraBanner={<JenkinsStatsBanner />}
                headerExtra={soundToggleButton}
            />
            <div
                className="jk-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="jk-wave-water" />
                <span className="jk-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default JenkinsPage
