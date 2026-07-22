import React from 'react'

/**
 * ConstructionLamp Component (İnşaat Lambası / Şantiye Feneri)
 * Daily streak göstergesi için klasik ateş (🔥) yerine şantiye/inşaat lambası metaforu.
 */
export default function ConstructionLamp({ streak = 0, frozen = false, isTr = true, className = '' }) {
  const streakCount = typeof streak === 'object' ? streak?.streak || 0 : streak
  const isFrozen = typeof streak === 'object' ? streak?.frozen || false : frozen
  const isActive = streakCount > 0 && !isFrozen

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isActive
          ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 site-lamp-glow'
          : isFrozen
          ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400'
          : 'bg-slate-200/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
      } ${className}`}
      title={
        isActive
          ? isTr
            ? `İnşaat Lambası Açık — ${streakCount} Gün Kesintisiz Tuğla Dizdin!`
            : `Site Light Active — ${streakCount} Day Construction Streak!`
          : isFrozen
          ? isTr
            ? 'Şantiye Donduruldu (Streak Koruması)'
            : 'Construction Frozen (Streak Freeze)'
          : isTr
          ? 'Bugün Tuğla Koyunca İnşaat Lambası Yanar'
          : 'Place a brick today to turn on the site lamp'
      }
      data-testid="construction-lamp-streak"
    >
      {/* Şantiye Lambası İkonu & Parıltısı */}
      <div className="relative flex items-center justify-center">
        {isActive && (
          <span className="absolute animate-ping inline-flex h-4 w-4 rounded-full bg-amber-400 opacity-60"></span>
        )}
        <span className="text-lg leading-none">
          {isActive ? '🚧' : isFrozen ? '❄️' : '🏗️'}
        </span>
      </div>

      <div className="flex items-center gap-1 font-semibold text-xs md:text-sm font-mono">
        {isActive ? (
          <>
            <span className="text-amber-500 font-bold">{streakCount}</span>
            <span>{isTr ? 'Gün Aktif Şantiye' : streakCount === 1 ? 'Day Active' : 'Days Active'}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>
          </>
        ) : isFrozen ? (
          <>
            <span>{streakCount}</span>
            <span>{isTr ? 'gün (Donduruldu)' : 'days (Frozen)'}</span>
          </>
        ) : (
          <span>{isTr ? 'İnşaat Beklemede' : 'Site Pending'}</span>
        )}
      </div>
    </div>
  )
}
