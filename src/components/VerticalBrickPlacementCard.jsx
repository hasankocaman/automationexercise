import React, { useState } from 'react'
import ConfettiExplosion from './ConfettiExplosion'

/**
 * VerticalBrickPlacementCard Component
 * Bir ders sekmesi tamamlandığında dikey tuğla yerleştirme animasyonu ve konfeti patlaması gösterir.
 */
export default function VerticalBrickPlacementCard({ tabTitle = '', isTr = true, onContinue = null }) {
  const [showConfetti, setShowConfetti] = useState(true)

  return (
    <div
      data-testid="vertical-brick-placement-card"
      className="relative my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950/60 to-slate-900 border-2 border-teal-400/80 shadow-2xl text-slate-100 brick-pattern-bg overflow-hidden brick-drop-anim"
    >
      {/* Konfeti Efekti */}
      {showConfetti && (
        <ConfettiExplosion duration={3500} particleCount={50} onComplete={() => setShowConfetti(false)} />
      )}

      {/* Dikey Tuğla Görselleştirmesi */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Dikey 3D Tuğla İkonu */}
        <div className="relative flex-shrink-0 w-16 h-24 rounded-xl bg-gradient-to-t from-teal-600 via-cyan-500 to-amber-400 border-2 border-teal-200 shadow-xl flex flex-col items-center justify-between p-2 brick-bevel group">
          <div className="w-full h-2 rounded bg-white/40" />
          <span className="text-3xl animate-bounce">🧱</span>
          <div className="text-[10px] font-black text-slate-950 uppercase font-mono">DİKEY</div>
        </div>

        {/* İçerik Metni */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🎉</span>
            <span>{isTr ? 'Sekme Tuğlası Yerleştirildi!' : 'Tab Brick Laid Vertically!'}</span>
          </div>

          <h3 className="text-lg md:text-xl font-extrabold text-white">
            {tabTitle
              ? isTr
                ? `"${tabTitle}" Sekmesinin Tuğlası Sağlamca Örüldü!`
                : `"${tabTitle}" Brick Placed Successfully!`
              : isTr
              ? 'Tebrikler! Bu Sekmenin Tuğlası Dikey Olarak Yerleştirildi!'
              : 'Congratulations! This Tab Brick is Vertically Installed!'}
          </h3>

          <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
            {isTr
              ? 'Bu sekmedeki tüm quizi doğru tamamladın. Tuğlan bina kulesine dikey olarak eklendi ve konfetiler patlatıldı!'
              : 'You completed all quizzes in this section. Your brick was added vertically to the tower and confetti exploded!'}
          </p>
        </div>

        {/* Sıradaki Sekmeye Geç Butonu */}
        {onContinue && (
          <button
            onClick={onContinue}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-lg brick-bevel transition-all"
          >
            {isTr ? 'Sıradaki Tuğlaya Geç →' : 'Next Brick →'}
          </button>
        )}
      </div>
    </div>
  )
}
