import { useEffect } from 'react'
import TopicPage from './TopicPage'
import { dockerData } from '../data/dockerData'
import { useLanguage } from '../context/LanguageContext'
import '../docker-effects.css'

/* ─── Layer Cake: Docker katmanlarını üst üste gösteren SVG-free görsel ─── */
function DockerLayerCake({ isTr }) {
    const layers = [
        {
            label: 'ENTRYPOINT / CMD',
            color: '#e2843d',
            bg: 'rgba(226,132,61,0.13)',
            border: 'rgba(226,132,61,0.38)',
            z: 5,
        },
        {
            label: isTr ? 'Uygulama Kodu' : 'App Code',
            color: '#f2a865',
            bg: 'rgba(242,168,101,0.11)',
            border: 'rgba(242,168,101,0.32)',
            z: 4,
        },
        {
            label: isTr ? 'Bağımlılıklar' : 'Dependencies',
            color: '#9aa896',
            bg: 'rgba(154,168,150,0.11)',
            border: 'rgba(154,168,150,0.30)',
            z: 3,
        },
        {
            label: 'Runtime',
            color: '#6fbf73',
            bg: 'rgba(111,191,115,0.11)',
            border: 'rgba(111,191,115,0.30)',
            z: 2,
        },
        {
            label: isTr ? 'Temel İmaj' : 'Base Image',
            color: '#9aa896',
            bg: 'rgba(154,168,150,0.08)',
            border: 'rgba(154,168,150,0.22)',
            z: 1,
        },
    ]

    return (
        <div className="dp-layer-cake">
            <div className="dp-layer-cake-title">
                {isTr ? 'Docker İmaj Katmanları' : 'Docker Image Layers'}
            </div>
            <div className="dp-layers">
                {layers.map((layer, idx) => (
                    <div
                        key={idx}
                        className="dp-layer"
                        style={{
                            '--layer-z': layer.z,
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
    )
}

/* ─── DockerPage ─────────────────────────────────────────────── */
function DockerPage() {
    useEffect(() => {
        const wrapper = document.querySelector('.docker-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
            // Only hero-banner buttons get magnetic — quiz/language-toggle buttons must be excluded
            // to prevent the pointerdown snap-back from causing misregistered React clicks.
            wrapper.querySelectorAll(
                '.dp-hero-banner button:not(.dp-magnetic-init), ' +
                '.dp-hero-banner a:not(.dp-magnetic-init)'
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

        /* ── 9. Parallax + Scroll Reveal Fallback ──────────────── */
        function onScroll() {
            if (noMotion) return
            wrapper.style.setProperty('--dp-scroll-y', `${window.scrollY * 0.08}px`)
            wrapper.querySelectorAll('.dp-reveal:not(.dp-visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight + 120) {
                    requestAnimationFrame(() => el.classList.add('dp-visible'))
                }
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        /* ── Cleanup ───────────────────────────────────────────── */
        return () => {
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
        }
    }, [])

    return (
        <div className="docker-page">
            <TopicPage
                data={dockerData}
                gradient="from-amber-500 to-green-700"
                bgLight="bg-gradient-to-br from-amber-50 via-green-50 to-slate-50"
                extraBanner={<DockerStatsBanner />}
            />
        </div>
    )
}

export default DockerPage
