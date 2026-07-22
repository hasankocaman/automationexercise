import React from 'react'

/**
 * BrickBadge Component (Madalyon / Tuğla Rozet)
 * Tamamlanan katmanlar ve başarılar için altın/teal kabartmalı tuğla madalyon.
 */
export default function BrickBadge({
  title = 'Tuğla Ustası',
  description = 'Bir katmanı eksiksiz tamamladın',
  icon = '🧱',
  unlocked = true,
  level = '1. Katman',
  language = 'tr',
  className = ''
}) {
  return (
    <div
      className={`relative group p-4 rounded-xl border transition-all duration-300 ${
        unlocked
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/60 border-teal-500/40 shadow-lg shadow-teal-950/30 brick-bevel'
          : 'bg-slate-900/60 border-slate-800/80 grayscale opacity-75'
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {/* Kabartmalı Madalyon Dairesi */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shadow-inner transition-transform group-hover:scale-105 ${
            unlocked
              ? 'bg-gradient-to-tr from-teal-600 via-cyan-500 to-amber-400 border-teal-300 text-slate-950 shadow-teal-500/20'
              : 'bg-slate-800 border-slate-700 text-slate-500'
          }`}
        >
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800/60">
              {level}
            </span>
            {unlocked && (
              <span className="text-[10px] text-amber-400 font-bold">★ Kazanıldı</span>
            )}
          </div>
          <h4 className="text-sm font-bold text-slate-100 mt-1 group-hover:text-teal-300 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  )
}
