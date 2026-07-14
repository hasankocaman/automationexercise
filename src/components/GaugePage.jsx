import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { gaugeData } from '../data/gaugeData'
import { useLanguage } from '../context/LanguageContext'
import '../gauge-effects.css'
import '../night-sky-effects.css'

/* ─── Spec → Rapor Zinciri: bir Gauge koşumu adım adım nasıl akar ─────────── */
function GaugePipeline({ isTr }) {
    const pipelineRef = useRef(null)
    const stages = [
        { label: isTr ? '.spec (Markdown Senaryo)' : '.spec (Markdown Scenario)', color: 'var(--gg-role-accent)', bg: 'rgba(250,204,21,0.14)', border: 'rgba(250,204,21,0.40)', z: 5, ty: -30 },
        { label: isTr ? '@Step Eşleşmesi (Java)' : '@Step Binding (Java)', color: 'var(--gg-role-accent-2)', bg: 'rgba(251,146,60,0.13)', border: 'rgba(251,146,60,0.36)', z: 4, ty: -18 },
        { label: isTr ? 'Selenium Aksiyonu (By)' : 'Selenium Action (By)', color: 'var(--gg-role-muted)', bg: 'rgba(226,211,197,0.11)', border: 'rgba(226,211,197,0.30)', z: 3, ty: -8 },
        { label: 'Assertion', color: 'var(--gg-role-success)', bg: 'rgba(134,239,172,0.11)', border: 'rgba(134,239,172,0.30)', z: 2, ty: 2 },
        { label: isTr ? 'HTML Rapor' : 'HTML Report', color: 'var(--gg-role-muted)', bg: 'rgba(226,211,197,0.08)', border: 'rgba(226,211,197,0.22)', z: 1, ty: 9 },
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
        <div className="gg-pipeline gg-pipeline-interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="gg-pipeline-title">{isTr ? 'Gauge Koşum Zinciri' : 'Gauge Execution Chain'}</div>
            <div ref={pipelineRef} className="gg-stages gg-stages-3d">
                {stages.map((stage, idx) => (
                    <div key={idx} className="gg-stage" style={{ '--stage-z': stage.z, '--ty': `${stage.ty}px`, background: stage.bg, borderColor: stage.border, color: stage.color }}>
                        <span className="gg-stage-dot" style={{ background: stage.color }} />
                        <span className="gg-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── gauge run Konsolu & Step Eşleşme Panosu ─────────────────────────────── */
function GaugeConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Gauge konsoluna hoş geldin.\nKoşumu başlatmak için run yaz...'
            : 'Welcome to the Gauge console.\nType run to start the execution...'
    )
    const checks = [
        { id: 'c1', label: isTr ? '.spec okundu — 2 senaryo bulundu' : '.spec parsed — 2 scenarios found' },
        { id: 'c2', label: isTr ? '@Step eşleşmeleri doğrulandı' : '@Step bindings verified' },
        { id: 'c3', label: isTr ? 'Senaryolar koştu — assertion\'lar PASS' : 'Scenarios ran — assertions PASS' },
        { id: 'c4', label: isTr ? 'html-report üretildi' : 'html-report generated' },
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
            setConsoleOutput(prev => prev + `\n> ${raw}\n` +
                '# Giris Akisi\n' +
                '  ## Gecerli kullanici giris yapabilir  ✔ ✔ ✔ ✔\n' +
                '  ## Hatali sifre uyari gosterir        ✔ ✔ ✔ ✔\n\n' +
                'Scenarios: 2 executed  2 passed  0 failed  0 skipped\n' +
                (isTr ? 'Rapor: reports/html-report/index.html' : 'Report: reports/html-report/index.html'))
        }, checks.length * 350 + 100)
        timersRef.current.push(finalTimer)
    }

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.includes('run')) {
            runDemo(raw)
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğin komut:\n- run`
                    : `Command not recognized: "${raw}". Try command:\n- run`
            ))
        }
    }

    return (
        <div className="gg-console-box gg-reveal">
            <div className="gg-console">
                <div className="gg-console-header">
                    <span>gauge v1.6.x</span>
                    <span>{isTr ? 'HAZIR' : 'READY'}</span>
                </div>
                <div className="gg-console-body">
                    {consoleOutput}
                    <div className="gg-console-input-row">
                        <span className="gg-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="gg-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                            data-testid="gauge-console-input"
                        />
                    </div>
                </div>
            </div>
            <div className="gg-order-board">
                {checks.map(c => (
                    <div key={c.id} className={`gg-order-item${doneIds.includes(c.id) ? ' done' : ''}`}>
                        <span>{doneIds.includes(c.id) ? '✓' : '○'}</span>
                        <span>{c.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Koşum Zinciri hero banner ───────────────────────────────────── */
function GaugeStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2014, suffix: '', tr: 'Çıkış Yılı', en: 'Founded' },
        { target: 5, suffix: '+', tr: 'Dil Plugin\'i', en: 'Language Plugins' },
        { target: 8, suffix: '', tr: 'By Stratejisi', en: 'By Strategies' },
        { target: 100, suffix: '%', tr: 'Markdown Spec', en: 'Markdown Specs' },
    ]

    return (
        <div className="gg-hero-banner-container">
            <div className="gg-hero-banner">
                <GaugePipeline isTr={isTr} />
                <div className="gg-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="gg-stat-item">
                            <div className="gg-stat-number-wrap">
                                <span className="gg-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="gg-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="gg-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            <GaugeConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── GaugePage ────────────────────────────────────────────────────────────── */
function GaugePage() {
    const { language } = useLanguage()

    useEffect(() => {
        const wrapper = document.querySelector('.gauge-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // ── Yüzen kalibrasyon tozu parçacıkları ──────────────────────────
        const particles = []
        const pColors = ['#facc15', '#fb923c', '#fde68a', '#f59e0b', '#fbbf24']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'gg-particle'
            const size = 2 + Math.random() * 3.5
            p.style.left = `${Math.random() * 100}%`
            p.style.width = p.style.height = `${size}px`
            p.style.setProperty('--dur', `${10 + Math.random() * 10}s`)
            p.style.setProperty('--delay', `${Math.random() * 13}s`)
            p.style.background = pColors[Math.floor(Math.random() * pColors.length)]
            wrapper.appendChild(p)
            particles.push(p)
        }

        // ── Scroll ile içerik bloklarını yumuşakça görünür yap ───────────
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                requestAnimationFrame(() => e.target.classList.add('gg-visible'))
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.ggReveal) return
            el.dataset.ggReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('gg-reveal')
            revealObserver.observe(el)
        }

        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('gg-block')) child.classList.add('gg-block')
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

        // ── İstatistik sayaçları: görünür olunca 0'dan hedefe say ────────
        function animateCounter(el, target) {
            const startTime = performance.now()
            const duration = target > 1000 ? 2200 : 1600
            function step(now) {
                const elapsed = Math.min(now - startTime, duration)
                const progress = 1 - Math.pow(1 - elapsed / duration, 3)
                el.textContent = Math.floor(progress * target)
                if (elapsed < duration) requestAnimationFrame(step)
                else el.textContent = target
            }
            requestAnimationFrame(step)
        }

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                const item = e.target
                item.classList.remove('gg-stat-pending')
                item.classList.add('gg-stat-visible')
                const num = item.querySelector('.gg-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num) num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.gg-stat-item').forEach((el, i) => {
            if (!noMotion) { el.classList.add('gg-stat-pending'); el.style.transitionDelay = `${i * 0.12}s` }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.gg-stat-item.gg-stat-pending').forEach(el => {
                el.classList.remove('gg-stat-pending')
                el.classList.add('gg-stat-visible')
                const num = el.querySelector('.gg-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        // ── Glitch H1 ─────────────────────────────────────────────────────
        // NOT: RestAssured/Docker/Selenium'daki 'main > div > div:first-child h1'
        // seçicisi TopicPage'in gerçek DOM'uyla eşleşmiyor (main'in İLK çocuğu
        // zaten hero div'i, araya bir katman girmiyor) — burada düzeltildi.
        const heroH1 = wrapper.querySelector('main > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('gg-glitch')
        }

        // ── Magnetic buton + squash + ripple (geri dön / dark mode toggle) ──
        let currentMagBtn = null
        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.gg-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.gg-magnetic-init)'
            ).forEach(btn => { btn.classList.add('gg-magnetic-init', 'no-hover-scale') })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.gg-magnetic-init, a.gg-magnetic-init')
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
            const btn = e.target.closest('button.gg-magnetic-init, a.gg-magnetic-init')
            if (!btn) return
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')
            btn.classList.remove('gg-squash')
            void btn.offsetWidth
            btn.classList.add('gg-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('gg-squash'), { once: true })
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'gg-ripple-span'
            span.style.width = span.style.height = `${size}px`
            span.style.left = `${e.clientX - r.left - size / 2}px`
            span.style.top = `${e.clientY - r.top - size / 2}px`
            span.style.background = 'rgba(31, 20, 8, 0.35)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }
        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        // ── İçerik bloğu 3D tilt efekti ──────────────────────────────────
        const MAX_DEG = 6
        let currentTiltBlock = null
        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.gg-block')
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

        // ── Görünür olamayanlar için güvenlik ağı ────────────────────────
        const revealFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.gg-reveal:not(.gg-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('gg-visible')
            })
        }, 1500)

        // ── Scroll: parallax glow + dial progress + reveal fallback ──────
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--gg-scroll-y', `${sY * 0.08}px`)
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            const pctEl = wrapper.querySelector('.gg-dial-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`
            wrapper.querySelectorAll('.gg-reveal:not(.gg-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('gg-visible'))
                }
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            particles.forEach(p => p.remove())
            mutObserver.disconnect()
            revealObserver.disconnect()
            statObserver.disconnect()
            clearTimeout(mutTimer)
            clearTimeout(statFallbackTimer)
            clearTimeout(revealFallbackTimer)
            if (heroH1) { heroH1.classList.remove('gg-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.gg-magnetic-init').forEach(btn => {
                btn.classList.remove('gg-magnetic-init', 'no-hover-scale', 'gg-squash')
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
            wrapper.style.removeProperty('--gg-scroll-y')
            wrapper.style.removeProperty('--scroll-percent')
        }
    }, [])

    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

    return (
        <div className="gauge-page">
            <TopicPage
                data={gaugeData}
                gradient="from-amber-600 to-orange-600"
                bgLight="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
                extraBanner={<GaugeStatsBanner />}
            />
            <div
                className="gg-dial-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="gauge-dial-progress"
            >
                <div className="gg-dial-water" />
                <span className="gg-dial-percent">0%</span>
            </div>
        </div>
    )
}

export default GaugePage
