import React from 'react'

/**
 * Segmented Brick Progress Bar (Tuğla Duvar İlerleme Çubuğu)
 * QA Mühendisi bina inşa etme metaforuna uygun segmented 3D tuğla progress bar.
 */
export default function BrickProgressBar({
  value = 0,
  total = 10,
  label = null,
  showPercentage = true,
  size = 'md',
  className = ''
}) {
  const safeTotal = Math.max(1, total)
  const safeValue = Math.min(safeTotal, Math.max(0, value))
  const percentage = Math.round((safeValue / safeTotal) * 100)

  // Segment boyutları
  const heightClasses = {
    sm: 'h-2.5 gap-1',
    md: 'h-4 gap-1.5',
    lg: 'h-6 gap-2'
  }[size] || 'h-4 gap-1.5'

  const bricks = Array.from({ length: safeTotal }, (_, i) => i < safeValue)

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-xs md:text-sm font-medium">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="text-teal-500 font-bold">🧱</span>
            {label}
          </span>
          {showPercentage && (
            <span className="text-teal-600 dark:text-teal-400 font-bold font-mono">
              %{percentage} ({safeValue}/{safeTotal} {percentage === 100 ? '🧱 Tamam!' : 'Tuğla'})
            </span>
          )}
        </div>
      )}

      {/* Segmented Tuğla Duvarı */}
      <div
        className={`flex w-full items-center ${heightClasses} p-1 rounded-lg bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 shadow-inner`}
        title={`%${percentage} Tamamlandı — ${safeValue}/${safeTotal} Tuğla Örüldü`}
      >
        {bricks.map((isFilled, index) => (
          <div
            key={index}
            className={`flex-1 h-full rounded-[3px] transition-all duration-300 ${
              isFilled
                ? 'bg-gradient-to-t from-teal-600 via-teal-500 to-cyan-400 border-t border-teal-300/40 shadow-sm brick-bevel'
                : 'bg-slate-300/60 dark:bg-slate-800/80 border border-slate-400/20 dark:border-slate-700/60'
            }`}
            style={{
              transitionDelay: `${index * 30}ms`
            }}
          />
        ))}
      </div>
    </div>
  )
}
