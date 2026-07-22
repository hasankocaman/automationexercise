import React from 'react'

/**
 * InspectionReportQuizResult Component ("Yapı Denetimi Raporu")
 * Quiz sonuçlarını QA Yapı Denetimi / Statik İnceleme Raporu şeklinde sunar.
 */
export default function InspectionReportQuizResult({
  correctCount = 0,
  totalCount = 0,
  passed = false,
  onRetry = null,
  onNext = null,
  language = 'tr',
  className = ''
}) {
  const isTr = language === 'tr'
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const wrongCount = Math.max(0, totalCount - correctCount)

  return (
    <div
      className={`relative p-5 md:p-7 rounded-2xl bg-slate-900 border-2 ${
        passed ? 'border-emerald-500/50 shadow-emerald-900/20' : 'border-amber-500/50 shadow-amber-900/20'
      } shadow-2xl text-slate-100 brick-pattern-bg overflow-hidden ${className}`}
      data-testid="inspection-report-quiz-result"
    >
      {/* Arka Plan Harç Çizgileri & Şantiye Filigranı */}
      <div className="absolute top-3 right-4 opacity-10 pointer-events-none select-none text-7xl font-black font-mono">
        QA-AUDIT
      </div>

      {/* Rapor Başlığı & Kauçuk Damga */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-teal-400 uppercase">
            <span>📐</span>
            <span>{isTr ? 'STATİK YAPISAL DENETİM RAPORU' : 'STRUCTURAL AUDIT INSPECTION REPORT'}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            {isTr ? 'Quiz Yapı Kontrolü' : 'Quiz Structure Control'}
          </h3>
        </div>

        {/* Kauçuk Damga (Rubber Stamp) */}
        <div
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase font-mono border-2 transform -rotate-3 ${
            passed ? 'inspection-stamp-passed' : 'inspection-stamp-failed'
          }`}
        >
          {passed
            ? isTr
              ? '✓ DENETİMDEN GEÇTİ'
              : '✓ INSPECTION PASSED'
            : isTr
            ? '⚠️ REVİZYON GEREKLİ'
            : '⚠️ REVISION REQUIRED'}
        </div>
      </div>

      {/* İlerleme ve Tuğla Metrikleri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        {/* Başarı Oranı */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
          <div className="text-xs text-slate-400 font-medium mb-1">
            {isTr ? 'Yapısal Sağlamlık' : 'Structural Solidity'}
          </div>
          <div className="text-2xl font-black font-mono text-teal-400">%{percentage}</div>
        </div>

        {/* Sağlam Tuğlalar */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
          <div className="text-xs text-emerald-400 font-medium mb-1">
            🧱 {isTr ? 'Sağlam Tuğlalar' : 'Solid Bricks'}
          </div>
          <div className="text-2xl font-black font-mono text-emerald-300">{correctCount}</div>
        </div>

        {/* Revizyon İsteyen Tuğlalar */}
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
          <div className="text-xs text-amber-400 font-medium mb-1">
            🛠️ {isTr ? 'Çatlak / Revizyon' : 'Cracked / Revision'}
          </div>
          <div className="text-2xl font-black font-mono text-amber-300">{wrongCount}</div>
        </div>
      </div>

      {/* Değerlendirme Özeti */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs md:text-sm text-slate-300 mb-5 leading-relaxed">
        {passed ? (
          <p className="flex items-start gap-2">
            <span className="text-emerald-400 text-lg">🧱</span>
            <span>
              {isTr
                ? 'Tebrikler usta! Tuğlalar harçla tam kaynaştı, temel sağlam. Bir sonraki katmanı inşa etmeye hazırsın.'
                : 'Great work! The bricks locked in firmly, foundation is solid. You are ready to build the next floor.'}
            </span>
          </p>
        ) : (
          <p className="flex items-start gap-2">
            <span className="text-amber-400 text-lg">🚧</span>
            <span>
              {isTr
                ? 'Yapı denetiminde bazı zayıf noktalar tespit edildi. Çatlak tuğlaları güçlendirmek için testi tekrar gözden geçir.'
                : 'Some structural weak points identified. Review the questions to reinforce cracked bricks.'}
            </span>
          </p>
        )}
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>{isTr ? 'Temeli Güçlendir (Tekrar Dene)' : 'Reinforce Foundation (Retry)'}</span>
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="px-5 py-2 rounded-xl text-xs md:text-sm font-bold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-md brick-bevel transition-all flex items-center gap-1.5"
          >
            <span>🏗️</span>
            <span>{isTr ? 'Sıradaki Katmana Geç' : 'Proceed to Next Floor'}</span>
          </button>
        )}
      </div>
    </div>
  )
}
