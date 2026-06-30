import { useEffect } from 'react'
import TopicPage from './TopicPage'
import { dockerData } from '../data/dockerData'
import { useLanguage } from '../context/LanguageContext'
import '../docker-effects.css'

/* ─── Stats Banner (extraBanner olarak TopicPage'e geçirilir) ─── */
function DockerStatsBanner() {
    const { language } = useLanguage()
    const stats = [
        { target: 10,   suffix: 'B+', tr: 'Hub İndirme',       en: 'Hub Pulls'        },
        { target: 100,  suffix: 'K+', tr: 'Public Image',       en: 'Public Images'    },
        { target: 2013, suffix: '',   tr: 'Yayın Yılı',         en: 'Founded'          },
        { target: 99,   suffix: '%',  tr: 'Ekosistem Desteği',  en: 'Ecosystem Support'},
    ]
    return (
        <div className="dp-stats-bar">
            {stats.map(s => (
                <div key={s.tr} className="dp-stat-item">
                    <div className="dp-stat-number-wrap">
                        <span className="dp-stat-num" data-target={s.target}>0</span>
                        {s.suffix && <span className="dp-stat-suffix">{s.suffix}</span>}
                    </div>
                    <p className="dp-stat-label">{language === 'tr' ? s.tr : s.en}</p>
                </div>
            ))}
        </div>
    )
}

/* ─── DockerPage ─────────────────────────────────────────────── */
function DockerPage() {
    useEffect(() => {
        const wrapper = document.querySelector('.docker-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        /* ── 1. Yüzen Parçacıklar ──────────────────────────────── */
        const particles = []
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'dp-particle'
            const size = 2 + Math.random() * 3.5
            p.style.left = `${Math.random() * 100}%`
            p.style.width = p.style.height = `${size}px`
            p.style.setProperty('--dur',   `${10 + Math.random() * 10}s`)
            p.style.setProperty('--delay', `${Math.random() * 13}s`)
            p.style.background = Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'
            wrapper.appendChild(p)
            particles.push(p)
        }

        /* ── 2. Scroll Reveal (IntersectionObserver) ───────────── */
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return
                if (e.target.classList.contains('dp-reveal')) {
                    // Çift rAF: CSS transition'ın tepki verebilmesi için
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
                const progress = 1 - Math.pow(1 - elapsed / duration, 3) // ease-out cubic
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

        // Güvenlik: 1.2s içinde observer tetiklenmediyse tüm istatistikleri göster
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
            wrapper.querySelectorAll(
                'button[class*="bg-gradient-to-r"]:not(.dp-magnetic-init), ' +
                'a[class*="bg-gradient-to-r"]:not(.dp-magnetic-init)'
            ).forEach(btn => {
                btn.classList.add('dp-magnetic-init', 'no-hover-scale')
            })
        }
        applyMagnetic()

        function onWrapperMouseMove(e) {
            if (noMotion) return
            const btn = e.target.closest(
                'button.dp-magnetic-init, a.dp-magnetic-init'
            )
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

        /* ── 7. Bireysel Blok 3D Tilt (event delegation) ──────── */
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

        // Güvenlik: 1.5s içinde görünmesi gereken dp-reveal elementlerini force-aç
        const revealFallbackTimer = setTimeout(() => {
            wrapper.querySelectorAll('.dp-reveal:not(.dp-visible)').forEach(el => {
                const inVP = el.getBoundingClientRect().top < window.innerHeight + 100
                if (inVP) el.classList.add('dp-visible')
            })
        }, 1500)

        /* ── 8. Parallax — ambient glow scroll'a göre kayar ────── */
        function onScroll() {
            if (noMotion) return
            wrapper.style.setProperty('--dp-scroll-y', `${window.scrollY * 0.08}px`)
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
            if (heroH1) { heroH1.classList.remove('dp-glitch'); heroH1.removeAttribute('data-text') }
            wrapper.querySelectorAll('.dp-magnetic-init').forEach(btn => {
                btn.classList.remove('dp-magnetic-init', 'no-hover-scale')
                btn.style.removeProperty('transform')
                btn.style.removeProperty('transition')
            })
            wrapper.removeEventListener('mousemove',  onWrapperMouseMove)
            wrapper.removeEventListener('mouseleave', onWrapperMouseLeave)
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
                gradient="from-cyan-500 to-blue-700"
                bgLight="bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-50"
                extraBanner={<DockerStatsBanner />}
            />
        </div>
    )
}

export default DockerPage
