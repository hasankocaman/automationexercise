import { useZoom } from '../context/ZoomContext'

function ZoomControls({ darkMode }) {
    const { zoom, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useZoom()

    const btnBase = `flex items-center justify-center h-full px-2 md:px-3 font-bold transition-all duration-200 select-none touch-manipulation`

    const btnActive = darkMode
        ? 'text-gray-200 hover:bg-gray-600 active:bg-gray-500'
        : 'text-white hover:bg-white/20 active:bg-white/30'

    const btnDisabled = darkMode
        ? 'text-gray-600 cursor-not-allowed'
        : 'text-white/30 cursor-not-allowed'

    return (
        <div
            className={`flex items-center rounded-lg overflow-hidden h-8 md:h-9 text-xs md:text-sm ${
                darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white/15 border border-white/30'
            }`}
            title="Zoom In/Out (A+/A−)"
        >
            {/* Zoom Out */}
            <button
                onClick={zoomOut}
                disabled={!canZoomOut}
                aria-label="Zoom out"
                className={`${btnBase} ${canZoomOut ? btnActive : btnDisabled}`}
            >
                <span className="text-sm font-bold leading-none">A</span>
                <span className="text-xs leading-none mb-0.5">−</span>
            </button>

            {/* Percentage — click to reset */}
            <button
                onClick={resetZoom}
                title="Reset to 100%"
                className={`hidden md:flex items-center justify-center px-1.5 text-xs font-mono font-semibold min-w-[42px] transition-colors duration-200 h-full ${
                    darkMode
                        ? zoom === 100 ? 'text-gray-500 cursor-default' : 'text-violet-300 hover:text-violet-200 hover:bg-gray-600'
                        : zoom === 100 ? 'text-white/50 cursor-default' : 'text-yellow-200 hover:bg-white/20'
                } ${zoom === 100 ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
                {zoom}%
            </button>

            {/* Zoom In */}
            <button
                onClick={zoomIn}
                disabled={!canZoomIn}
                aria-label="Zoom in"
                className={`${btnBase} ${canZoomIn ? btnActive : btnDisabled}`}
            >
                <span className="text-sm font-bold leading-none">A</span>
                <span className="text-xs leading-none mb-0.5">+</span>
            </button>
        </div>
    )
}

export default ZoomControls
