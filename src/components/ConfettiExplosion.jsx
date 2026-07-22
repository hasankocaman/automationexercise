import React, { useEffect, useState } from 'react'

/**
 * ConfettiExplosion Component
 * Sayfada ders/sekme tamamlandığında tam ekran konfeti patlaması tetikler.
 */
export default function ConfettiExplosion({ duration = 3000, particleCount = 40, onComplete = null }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const colors = ['#14b8a6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#fbbf24']
    const generated = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // % width
      delay: Math.random() * 0.4, // sec
      size: Math.random() * 8 + 6, // px
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 1.5 + 1.5, // sec
      rotation: Math.random() * 720 - 360,
    }))
    setParticles(generated)

    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, particleCount, onComplete])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-sm opacity-90 animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) scale(0.4);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confettiFall linear forwards;
        }
      `}</style>
    </div>
  )
}
