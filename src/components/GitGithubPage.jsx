import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { gitGithubData } from '../data/gitGithubData'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../git-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // git-lightning-flash CSS animasyonuyla aynı 10s döngü

const GitDocBanner = () => {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const tags = [
        t('gitBanner.tagGit'),
        t('gitBanner.tagChapters'),
        t('gitBanner.tagSearch'),
        t('gitBanner.tagIndex'),
    ]
    const wipTag = t('gitBanner.tagWip')
    return (
        <button
            onClick={() => navigate('/git-document')}
            className="group w-full text-left block mb-6 rounded-2xl overflow-hidden border-2 border-orange-500/30 hover:border-orange-400/70 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 bg-transparent cursor-pointer"
        >
            <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-slate-900 p-5 flex items-center gap-5">
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">📖</div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                        {t('gitBanner.subtitle')}
                    </div>
                    <div className="text-lg font-bold text-white leading-tight">
                        {t('gitBanner.title')}
                    </div>
                    <div className="text-sm text-orange-200/80 mt-1 leading-relaxed">
                        {t('gitBanner.description')}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                                {tag}
                            </span>
                        ))}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-semibold">
                            {wipTag}
                        </span>
                    </div>
                </div>
                <div className="text-3xl text-orange-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</div>
            </div>
        </button>
    )
}

/* ─── Commit Pipeline: bir değişiklik dört adımda nasıl yolculuk eder ─── */
function GitPipeline({ isTr }) {
    const pipelineRef = useRef(null)
    // Renkler CSS değişkeni referansı olarak tutulur (--git-role-*): light modda
    // koyu, dark modda pastel ton kullanılır — açık arka planda soluk/okunaksız
    // metin oluşmasını önler (bkz. git-effects.css §0).
    const stages = [
        {
            label: isTr ? 'Çalışma Dizini' : 'Working Directory',
            color: 'var(--git-role-accent)',
            bg: 'rgba(255,111,89,0.13)',
            border: 'rgba(255,111,89,0.38)',
            z: 5,
            ty: -30,
        },
        {
            label: isTr ? 'Staging Alanı (git add)' : 'Staging Area (git add)',
            color: 'var(--git-role-accent-2)',
            bg: 'rgba(124,147,173,0.13)',
            border: 'rgba(124,147,173,0.38)',
            z: 4,
            ty: -18,
        },
        {
            label: isTr ? 'Yerel Repository (git commit)' : 'Local Repository (git commit)',
            color: 'var(--git-role-muted)',
            bg: 'rgba(183,195,212,0.11)',
            border: 'rgba(183,195,212,0.30)',
            z: 3,
            ty: -8,
        },
        {
            label: isTr ? 'Uzak Repository (git push)' : 'Remote Repository (git push)',
            color: 'var(--git-role-success)',
            bg: 'rgba(111,191,115,0.11)',
            border: 'rgba(111,191,115,0.30)',
            z: 2,
            ty: 2,
        },
        {
            label: isTr ? 'Branch & Merge' : 'Branch & Merge',
            color: 'var(--git-role-muted)',
            bg: 'rgba(183,195,212,0.08)',
            border: 'rgba(183,195,212,0.22)',
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
            className="git-pipeline git-pipeline-interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="git-pipeline-title">
                {isTr ? 'Commit Yolculuğu' : 'Commit Pipeline'}
            </div>
            <div ref={pipelineRef} className="git-stages git-stages-3d">
                {stages.map((stage, idx) => (
                    <div
                        key={idx}
                        className="git-stage"
                        style={{
                            '--stage-z': stage.z,
                            '--ty': `${stage.ty}px`,
                            background: stage.bg,
                            borderColor: stage.border,
                            color: stage.color,
                        }}
                    >
                        <span className="git-stage-dot" style={{ background: stage.color }} />
                        <span className="git-stage-label">{stage.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Git Komut Konsolu & Commit Graph Simülatörü ─────────────── */
function GitConsoleSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [consoleOutput, setConsoleOutput] = useState(
        isTr
            ? 'Git konsoluna hoş geldiniz.\nBaşlamak için git add . yazın...'
            : 'Welcome to the Git console.\nType git add . to start...'
    )
    const [staged, setStaged] = useState(false)
    const [commits, setCommits] = useState([])

    function handleCommandSubmit(e) {
        if (e.key !== 'Enter') return
        const raw = inputValue.trim()
        const cmd = raw.toLowerCase()
        setInputValue('')

        if (cmd.startsWith('git add')) {
            setStaged(true)
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr ? 'Değişiklikler staging alanına eklendi.' : 'Changes added to staging area.'
            ))
        } else if (cmd.startsWith('git commit')) {
            if (!staged) {
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr
                        ? 'Hata: staged değişiklik yok. Önce git add . çalıştırın.'
                        : 'Error: nothing staged. Run git add . first.'
                ))
            } else {
                const match = raw.match(/["']([^"']+)["']/)
                const message = match ? match[1] : (isTr ? 'değişiklik' : 'update')
                setCommits(prev => [...prev, { message, pushed: false }])
                setStaged(false)
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr
                        ? `[main] ${message} — yerel repository'e kaydedildi.`
                        : `[main] ${message} — saved to local repository.`
                ))
            }
        } else if (cmd.startsWith('git push')) {
            if (commits.every(c => c.pushed) || commits.length === 0) {
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr ? 'Gönderilecek yeni commit yok.' : 'Nothing new to push.'
                ))
            } else {
                setCommits(prev => prev.map(c => ({ ...c, pushed: true })))
                setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                    isTr
                        ? '[OK] Tüm commit\'ler uzak repository\'e gönderildi.'
                        : '[OK] All commits pushed to remote repository.'
                ))
            }
        } else {
            setConsoleOutput(prev => prev + `\n> ${raw}\n` + (
                isTr
                    ? `Komut anlaşılamadı: "${raw}". Deneyebileceğiniz komutlar:\n- git add .\n- git commit -m "mesaj"\n- git push`
                    : `Command not recognized: "${raw}". Try commands:\n- git add .\n- git commit -m "message"\n- git push`
            ))
        }
    }

    return (
        <div className="git-console-box git-reveal">
            <div className="git-console">
                <div className="git-console-header">
                    <span>git-console v1.0</span>
                    <span>{isTr ? 'ÇALIŞIYOR' : 'RUNNING'}</span>
                </div>
                <div className="git-console-body">
                    {consoleOutput}
                    <div className="git-console-input-row">
                        <span className="git-console-prompt">$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="git-console-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="git-graph">
                {commits.length === 0 && (
                    <span className="git-graph-empty">
                        {isTr ? 'Henüz commit yok...' : 'No commits yet...'}
                    </span>
                )}
                {commits.map((c, idx) => (
                    <div key={idx} className={`git-commit-row${c.pushed ? ' pushed' : ''}`}>
                        <span className="git-commit-dot" />
                        <span className="git-commit-msg">{c.message}</span>
                        <span className="git-commit-badge">{c.pushed ? '☁️' : '💻'}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Stats + Commit Pipeline asimetrik hero banner ───────────── */
function GitStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 2005, suffix: '',  tr: 'Yayın Yılı',         en: 'Founded'          },
        { target: 3,    suffix: '',  tr: 'Çalışma Alanı',       en: 'Working Areas'    },
        { target: 100,  suffix: '%', tr: 'Dağıtık Repository',  en: 'Distributed Repo' },
        { target: 4,    suffix: '',  tr: 'Temel Komut',         en: 'Core Commands'    },
    ]

    return (
        <div className="git-hero-banner-container">
            <div className="git-hero-banner">
                {/* Sol: Commit Pipeline (1.4fr) */}
                <GitPipeline isTr={isTr} />

                {/* Sağ: Stats 2×2 grid (1fr) */}
                <div className="git-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="git-stat-item">
                            <div className="git-stat-number-wrap">
                                <span className="git-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="git-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="git-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Alt: Git Komut Konsolu / Commit Graph */}
            <GitConsoleSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── GitGithubPage ────────────────────────────────────────────── */
function GitGithubPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.git-page')
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

        /* ── 1. Yüzen Parçacıklar (mercan + arduvaz) ───────────── */
        const particles = []
        const pColors = ['#ff6f59', '#7c93ad', '#ff9478', '#6fbf73', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'git-particle'
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
                if (e.target.classList.contains('git-reveal')) {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                            e.target.classList.add('git-visible')
                        )
                    )
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.gitReveal) return
            el.dataset.gitReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('git-reveal')
            revealObserver.observe(el)
        }

        /* ── 3. git-block sınıfı + reveal → tab değişimlerini yakala */
        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('git-block')) child.classList.add('git-block')
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
                item.classList.remove('git-stat-pending')
                item.classList.add('git-stat-visible')
                const num = item.querySelector('.git-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num)         num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.git-stat-item').forEach((el, i) => {
            if (!noMotion) {
                el.classList.add('git-stat-pending')
                el.style.transitionDelay = `${i * 0.12}s`
            }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.git-stat-item.git-stat-pending').forEach(el => {
                el.classList.remove('git-stat-pending')
                el.classList.add('git-stat-visible')
                const num = el.querySelector('.git-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        /* ── 5. Glitch: Hero h1 ────────────────────────────────── */
        const heroH1 = wrapper.querySelector('main > div:first-child h1') /* duzeltildi: onceki secici gercek DOM ile eslesmiyordu, glitch calismiyordu */
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('git-glitch')
        }

        /* ── 6. Manyetik Buton (event delegation) ─────────────── */
        let currentMagBtn = null

        function applyMagnetic() {
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.git-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.git-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('git-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.git-magnetic-init, a.git-magnetic-init')
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
            const btn = e.target.closest('button.git-magnetic-init, a.git-magnetic-init')
            if (!btn) return

            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')

            btn.classList.remove('git-squash')
            void btn.offsetWidth
            btn.classList.add('git-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('git-squash'), { once: true })

            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'git-ripple-span'
            span.style.width  = span.style.height = `${size}px`
            span.style.left   = `${e.clientX - r.left  - size / 2}px`
            span.style.top    = `${e.clientY - r.top   - size / 2}px`
            span.style.background = 'rgba(238, 242, 247, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }

        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        /* ── 8. Bireysel Blok 3D Tilt (event delegation) ──────── */
        const MAX_DEG = 6
        let currentTiltBlock = null

        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.git-block')

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
            wrapper.querySelectorAll('.git-reveal:not(.git-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('git-visible')
            })
        }, 1500)

        /* ── 9. Parallax + Scroll Reveal Fallback + Okuma İlerlemesi ── */
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--git-scroll-y', `${sY * 0.08}px`)

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)

            const pctEl = wrapper.querySelector('.git-wave-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`

            wrapper.querySelectorAll('.git-reveal:not(.git-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('git-visible'))
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
                heroH1.classList.remove('git-glitch')
                heroH1.removeAttribute('data-text')
            }
            wrapper.querySelectorAll('.git-magnetic-init').forEach(btn => {
                btn.classList.remove('git-magnetic-init', 'no-hover-scale', 'git-squash')
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
            wrapper.style.removeProperty('--git-scroll-y')
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-orange-300' : ''}`}
            onClick={handleToggleSound}
            title={
                language === 'tr'
                    ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç')
                    : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')
            }
            data-testid="git-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="git-page">
            <TopicPage
                data={gitGithubData}
                gradient="from-orange-600 to-amber-600"
                bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
                extraBanner={
                    <>
                        <GitDocBanner />
                        <GitStatsBanner />
                    </>
                }
                headerExtra={soundToggleButton}
            />
            {/* Dalgalı İlerleme Çemberi */}
            <div
                className="git-wave-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="git-wave-water" />
                <span className="git-wave-percent">0%</span>
            </div>
        </div>
    )
}

export default GitGithubPage
