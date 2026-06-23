// src/components/CircularProgress.jsx
// Reusable inline-SVG circular progress ring (no external image deps, per CLAUDE.md).
function CircularProgress({ percent, size = 72, strokeWidth = 7, darkMode, label }) {
    const clamped = Math.min(100, Math.max(0, percent))
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clamped / 100) * circumference

    return (
        <div className="flex items-center gap-3">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={darkMode ? '#374151' : '#e5e7eb'}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#circularProgressGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
                <defs>
                    <linearGradient id="circularProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
            <div>
                <div className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round(clamped)}%
                </div>
                {label && (
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
                )}
            </div>
        </div>
    )
}

export default CircularProgress
