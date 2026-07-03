import { useEffect, useRef, useState } from 'react'
import TopicPage from './TopicPage'
import { dockerData } from '../data/dockerData'
import { useLanguage } from '../context/LanguageContext'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../docker-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // dp-lightning-flash CSS animasyonuyla aynı 10s döngü

/* ─── Layer Cake: Docker katmanlarını üst üste gösteren SVG-free görsel ─── */
function DockerLayerCake({ isTr }) {
    const cakeRef = useRef(null)
    // Renkler CSS değişkeni referansı olarak tutulur (--docker-role-*): light modda
    // koyu, dark modda pastel ton kullanılır — açık arka planda soluk/okunaksız
    // metin oluşmasını önler (bkz. docker-effects.css §0).
    const layers = [
        {
            label: 'ENTRYPOINT / CMD',
            color: 'var(--docker-role-accent)',
            bg: 'rgba(226,132,61,0.13)',
            border: 'rgba(226,132,61,0.38)',
            z: 5,
            ty: -30,
        },
        {
            label: isTr ? 'Uygulama Kodu' : 'App Code',
            color: 'var(--docker-role-accent-2)',
            bg: 'rgba(242,168,101,0.11)',
            border: 'rgba(242,168,101,0.32)',
            z: 4,
            ty: -18,
        },
        {
            label: isTr ? 'Bağımlılıklar' : 'Dependencies',
            color: 'var(--docker-role-muted)',
            bg: 'rgba(154,168,150,0.11)',
            border: 'rgba(154,168,150,0.30)',
            z: 3,
            ty: -8,
        },
        {
            label: 'Runtime',
            color: 'var(--docker-role-success)',
            bg: 'rgba(111,191,115,0.11)',
            border: 'rgba(111,191,115,0.30)',
            z: 2,
            ty: 2,
        },
        {
            label: isTr ? 'Temel İmaj' : 'Base Image',
            color: 'var(--docker-role-muted)',
            bg: 'rgba(154,168,150,0.08)',
            border: 'rgba(154,168,150,0.22)',
            z: 1,
            ty: 9,
        },
    ]

    function handleMouseMove(e) {
        const el = cakeRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--rx', `${-y * 24}deg`)
        el.style.setProperty('--ry', `${x * 24}deg`)
        el.style.setProperty('transform', 'rotateX(var(--rx)) rotateY(var(--ry))')
    }

    function handleMouseLeave() {
        const el = cakeRef.current
        if (!el) return
        el.style.setProperty('transition', 'transform 0.5s ease-out')
        el.style.setProperty('transform', 'rotateX(0deg) rotateY(0deg)')
        setTimeout(() => {
            if (el) el.style.removeProperty('transition')
        }, 500)
    }

    return (
        <div
            className="dp-layer-cake dp-layer-cake-interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="dp-layer-cake-title">
                {isTr ? 'Docker İmaj Katmanları' : 'Docker Image Layers'}
            </div>
            <div ref={cakeRef} className="dp-layers dp-layers-3d">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className="dp-layer"
                        style={{
                            '--layer-z': layer.z,
                            '--ty': `${layer.ty}px`,
                            background: layer.bg,
                            borderColor: layer.border,
                            color: layer.color,
                        }}
                    >
                        <span className="dp-layer-dot" style={{ background: layer.color }} />
                        <span className="dp-layer-label">{layer.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── 3D Terminal & Canlı Konteyner Simülatörü ──────────────── */
function DockerTerminalSimulator({ isTr }) {
    const [inputValue, setInputValue] = useState('')
    const [terminalOutput, setTerminalOutput] = useState(
        isTr 
            ? 'Docker terminaline hoş geldiniz.\nKonteyner ayağa kaldırmak için "docker run nginx" yazın...' 
            : 'Welcome to Docker terminal.\nType "docker run nginx" to launch a container...'
    )
    const [isActive, setIsActive] = useState(false)

    function handleCommandSubmit(e) {
        if (e.key === 'Enter') {
            const cmd = inputValue.trim().toLowerCase()
            setInputValue('')
            
            if (cmd === 'docker run nginx' || cmd === 'docker run -d nginx') {
                setIsActive(true)
                setTerminalOutput(prev => prev + `\n$ ${inputValue}\n` + (
                    isTr
                        ? 'Unable to find image \'nginx:latest\' locally...\nlatest: Pulling from library/nginx\nDigest: sha256:...\nStatus: Downloaded newer image for nginx:latest\n[OK] Container 8f7b2c918a (nginx) started on port 80!'
                        : 'Unable to find image \'nginx:latest\' locally...\nlatest: Pulling from library/nginx\nDigest: sha256:...\nStatus: Downloaded newer image for nginx:latest\n[OK] Container 8f7b2c918a (nginx) started on port 80!'
                ))
            } else if (cmd === 'docker ps') {
                setTerminalOutput(prev => prev + `\n$ ${inputValue}\n` + (
                    isActive 
                        ? 'CONTAINER ID   IMAGE     COMMAND                  STATUS\n8f7b2c918a     nginx     "/docker-entrypoint…"   Up 10 seconds'
                        : 'CONTAINER ID   IMAGE     COMMAND                  STATUS\n(No containers running. Start one with "docker run nginx")'
                ))
            } else if (cmd === 'docker stop nginx' || cmd === 'docker stop 8f7b2c918a') {
                setIsActive(false)
                setTerminalOutput(prev => prev + `\n$ ${inputValue}\n` + (
                    isTr ? 'Container 8f7b2c918a stopped.' : 'Container 8f7b2c918a stopped.'
                ))
            } else {
                setTerminalOutput(prev => prev + `\n$ ${inputValue}\n` + (
                    isTr 
                        ? `Komut anlaşılamadı: "${inputValue}". Deneyebileceğiniz komutlar:\n- docker run nginx\n- docker ps\n- docker stop nginx`
                        : `Command not recognized: "${inputValue}". Try commands:\n- docker run nginx\n- docker ps\n- docker stop nginx`
                ))
            }
        }
    }

    return (
        <div className="dp-sim-box dp-reveal">
            <div className="dp-terminal">
                <div className="dp-terminal-header">
                    <span> aprende-terminal v1.0 </span>
                    <span> {isTr ? 'ÇALIŞIYOR' : 'RUNNING'} </span>
                </div>
                <div className="dp-terminal-body">
                    {terminalOutput}
                    <div className="dp-terminal-input-row">
                        <span className="dp-terminal-prompt">root@learnqa:~$</span>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleCommandSubmit}
                            className="dp-terminal-input"
                            placeholder={isTr ? 'Komut yazın...' : 'Type a command...'}
                        />
                    </div>
                </div>
            </div>
            <div className="dp-sim-visualizer">
                <div className={`dp-cube-3d ${isActive ? 'active' : ''}`}>
                    <div className="dp-cube-face dp-cube-face-front">NGINX</div>
                    <div className="dp-cube-face dp-cube-face-back">NGINX</div>
                    <div className="dp-cube-face dp-cube-face-left">80:80</div>
                    <div className="dp-cube-face dp-cube-face-right">80:80</div>
                    <div className="dp-cube-face dp-cube-face-top">Docker</div>
                    <div className="dp-cube-face dp-cube-face-bottom">Docker</div>
                </div>
                <div className="dp-neon-line" />
            </div>
        </div>
    )
}

/* ─── Stats + Layer Cake asimetrik hero banner ───────────────── */
function DockerStatsBanner() {
    const { language } = useLanguage()
    const isTr = language === 'tr'

    const stats = [
        { target: 10,   suffix: 'B+', tr: 'Hub İndirme',      en: 'Hub Pulls'         },
        { target: 100,  suffix: 'K+', tr: 'Public Image',      en: 'Public Images'     },
        { target: 2013, suffix: '',   tr: 'Yayın Yılı',        en: 'Founded'           },
        { target: 99,   suffix: '%',  tr: 'Ekosistem Desteği', en: 'Ecosystem Support' },
    ]

    return (
        <div className="dp-hero-banner-container">
            <div className="dp-hero-banner">
                {/* Sol: Layer Cake (1.4fr) */}
                <DockerLayerCake isTr={isTr} />

                {/* Sağ: Stats 2×2 grid (1fr) */}
                <div className="dp-stats-bar">
                    {stats.map(s => (
                        <div key={s.tr} className="dp-stat-item">
                            <div className="dp-stat-number-wrap">
                                <span className="dp-stat-num" data-target={s.target}>0</span>
                                {s.suffix && <span className="dp-stat-suffix">{s.suffix}</span>}
                            </div>
                            <p className="dp-stat-label">{isTr ? s.tr : s.en}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Alt: 3D Terminal Simulator */}
            <DockerTerminalSimulator key={isTr ? 'tr' : 'en'} isTr={isTr} />
        </div>
    )
}

/* ─── DockerPage ─────────────────────────────────────────────── */
function DockerPage() {
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const [isLightMode, setIsLightMode] = useState(true)
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)

    useEffect(() => {
        const wrapper = document.querySelector('.docker-page')
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

        /* ── 1. Yüzen Parçacıklar (amber + orman yeşili) ───────── */
        const particles = []
        const pColors = ['#e2843d', '#6fbf73', '#f2a865', '#9aa896', '#f0b84e']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'dp-particle'
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
                if (e.target.classList.contains('dp-reveal')) {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() =>
                            e.target.classList.add('dp-visible')
                        )
                    )
                }
                revealObserver.unobserve(e.target)
            })
        }, { threshold: 0.06 })

        function setupReveal(el) {
            if (el.dataset.dpReveal) return
            el.dataset.dpReveal = '1'
            const inVP = el.getBoundingClientRect().top < window.innerHeight
            if (!inVP && !noMotion) el.classList.add('dp-reveal')
            revealObserver.observe(el)
        }

        /* ── 3. dp-block sınıfı + reveal → tab değişimlerini yakala */
        function applyBlockClasses() {
            const card = wrapper.querySelector('.flex-1.min-w-0 > div:first-child')
            if (!card) return
            Array.from(card.children).forEach(child => {
                if (child.tagName === 'H2') return
                // Interactive blocks (quiz, playground, challenge …) must not get the 3-D tilt
                // effect: the perspective transform + Playwright's stability check loop causes
                // click events to be swallowed, breaking quiz/i18n tests.
                if (child.querySelector('button, input, textarea')) return
                if (!child.classList.contains('dp-block')) child.classList.add('dp-block')
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
                item.classList.remove('dp-stat-pending')
                item.classList.add('dp-stat-visible')
                const num = item.querySelector('.dp-stat-num')
                if (num && !noMotion) animateCounter(num, parseInt(num.dataset.target, 10))
                else if (num)         num.textContent = num.dataset.target
                statObserver.unobserve(item)
            })
        }, { threshold: 0.05 })

        wrapper.querySelectorAll('.dp-stat-item').forEach((el, i) => {
            if (!noMotion) {
                el.classList.add('dp-stat-pending')
                el.style.transitionDelay = `${i * 0.12}s`
            }
            statObserver.observe(el)
        })

        const statFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.dp-stat-item.dp-stat-pending').forEach(el => {
                el.classList.remove('dp-stat-pending')
                el.classList.add('dp-stat-visible')
                const num = el.querySelector('.dp-stat-num')
                if (num && num.textContent === '0') num.textContent = num.dataset.target
            })
        }, 1200)

        /* ── 5. Glitch: Hero h1 ────────────────────────────────── */
        const heroH1 = wrapper.querySelector('main > div > div:first-child h1')
        if (heroH1) {
            heroH1.setAttribute('data-text', heroH1.textContent.trim())
            heroH1.classList.add('dp-glitch')
        }

        /* ── 6. Manyetik Buton (event delegation) ─────────────── */
        let currentMagBtn = null

        function applyMagnetic() {
            // Geri Dönme ve Dark Mode butonlarına premium manyetik ve sıvı dolgu (Fluid Hover) efekti verilir.
            // Quiz ve dil değiştirme butonları click kaymalarını önlemek için hariç tutulur.
            wrapper.querySelectorAll(
                '[data-testid="topic-back-btn"]:not(.dp-magnetic-init), ' +
                '[data-testid="dark-mode-toggle"]:not(.dp-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('dp-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest('button.dp-magnetic-init, a.dp-magnetic-init')
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
            const btn = e.target.closest('button.dp-magnetic-init, a.dp-magnetic-init')
            if (!btn) return

            // Magnetic transform'u geçici sil — squash temiz çalışsın
            btn.style.removeProperty('transform')
            btn.style.removeProperty('transition')

            // Squash & Stretch
            btn.classList.remove('dp-squash')
            void btn.offsetWidth // reflow — animasyonu sıfırla
            btn.classList.add('dp-squash')
            btn.addEventListener('animationend', () => btn.classList.remove('dp-squash'), { once: true })

            // Ripple span: tıklanan noktadan dışa yayılan daire
            const r = btn.getBoundingClientRect()
            const size = Math.max(r.width, r.height) * 1.8
            const span = document.createElement('span')
            span.className = 'dp-ripple-span'
            span.style.width  = span.style.height = `${size}px`
            span.style.left   = `${e.clientX - r.left  - size / 2}px`
            span.style.top    = `${e.clientY - r.top   - size / 2}px`
            // Ripple rengi: paletten text-primary'ye yakın —
            // butonlar genellikle renkli bg'de beyaz text içerir
            span.style.background = 'rgba(232, 236, 223, 0.45)'
            btn.appendChild(span)
            span.addEventListener('animationend', () => span.remove(), { once: true })
        }

        wrapper.addEventListener('pointerdown', onWrapperPointerDown)

        /* ── 8. Bireysel Blok 3D Tilt (event delegation) ──────── */
        const MAX_DEG = 6
        let currentTiltBlock = null

        function onContentMouseMove(e) {
            if (noMotion) return
            const block = e.target.closest('.dp-block')

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
            wrapper.querySelectorAll('.dp-reveal:not(.dp-visible)').forEach(el => {
                const top = el.getBoundingClientRect().top
                if (top < window.innerHeight * 1.5) el.classList.add('dp-visible')
            })
        }, 1500)

        /* ── 9. Parallax + Scroll Reveal Fallback + Okuma İlerlemesi ── */
        function onScroll() {
            if (noMotion) return
            const sY = window.scrollY
            wrapper.style.setProperty('--dp-scroll-y', `${sY * 0.08}px`)
            
            // Okuma ilerleme yüzdesi hesabı
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = totalHeight > 0 ? (sY / totalHeight) * 100 : 0
            wrapper.style.setProperty('--scroll-percent', `${progress}%`)
            
            const pctEl = wrapper.querySelector('.dp-ocean-percent')
            if (pctEl) pctEl.textContent = `${Math.round(progress)}%`

            wrapper.querySelectorAll('.dp-reveal:not(.dp-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('dp-visible'))
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
                heroH1.classList.remove('dp-glitch')
                heroH1.removeAttribute('data-text')
            }
            wrapper.querySelectorAll('.dp-magnetic-init').forEach(btn => {
                btn.classList.remove('dp-magnetic-init', 'no-hover-scale', 'dp-squash')
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
            wrapper.style.removeProperty('--dp-scroll-y')
            wrapper.style.removeProperty('--scroll-percent')
        }
    }, [])

    /* ── Yağmur/Gökgürültüsü Ambiyansı (yalnızca soundOn && light mode) ──
       Ses dosyası kullanılmaz — Web Audio API ile sentezlenir (bkz. lib/ambientSound.js).
       Tarayıcı autoplay kısıtı nedeniyle AudioContext yalnızca kullanıcının
       "sesi aç" butonuna tıklamasıyla (handleToggleSound içinde) oluşturulur;
       bu effect sadece o context zaten varsa başlatma/durdurma yapar. */
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
        // AudioContext ilk kez burada (kullanıcı tıklaması içinde) oluşturulur/resume
        // edilir — tarayıcıların autoplay kısıtlaması kullanıcı jesti gerektirir.
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
            className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-300${soundOn ? ' ring-2 ring-amber-300' : ''}`}
            onClick={handleToggleSound}
            title={
                language === 'tr'
                    ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç')
                    : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')
            }
            data-testid="docker-sound-toggle"
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    ) : null

    return (
        <div className="docker-page">
            <TopicPage
                data={dockerData}
                gradient="from-amber-500 to-green-700"
                bgLight="bg-gradient-to-br from-amber-50 via-green-50 to-slate-50"
                extraBanner={<DockerStatsBanner />}
                headerExtra={soundToggleButton}
            />
            {/* Dalgalı Su İlerleme Çemberi (Ocean Progress Ring) */}
            <div
                className="dp-ocean-progress"
                onClick={scrollToTop}
                title={language === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}
                data-testid="ocean-progress"
            >
                <div className="dp-ocean-water" />
                <span className="dp-ocean-percent">0%</span>
            </div>
        </div>
    )
}

export default DockerPage
