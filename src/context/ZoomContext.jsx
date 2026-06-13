import { createContext, useContext, useState, useEffect } from 'react'

const ZoomContext = createContext()

const ZOOM_LEVELS = [80, 90, 100, 110, 120, 130, 140]
const DEFAULT_ZOOM = 100

export function ZoomProvider({ children }) {
    const [zoom, setZoom] = useState(() => {
        const saved = localStorage.getItem('zoomLevel')
        const parsed = saved ? parseInt(saved, 10) : DEFAULT_ZOOM
        return ZOOM_LEVELS.includes(parsed) ? parsed : DEFAULT_ZOOM
    })

    useEffect(() => {
        document.documentElement.style.fontSize = `${zoom}%`
        localStorage.setItem('zoomLevel', zoom.toString())
    }, [zoom])

    const zoomIn = () => {
        setZoom(prev => {
            const next = ZOOM_LEVELS.find(l => l > prev)
            return next !== undefined ? next : prev
        })
    }

    const zoomOut = () => {
        setZoom(prev => {
            const reversed = [...ZOOM_LEVELS].reverse()
            const next = reversed.find(l => l < prev)
            return next !== undefined ? next : prev
        })
    }

    const resetZoom = () => setZoom(DEFAULT_ZOOM)

    const canZoomIn = zoom < ZOOM_LEVELS[ZOOM_LEVELS.length - 1]
    const canZoomOut = zoom > ZOOM_LEVELS[0]

    return (
        <ZoomContext.Provider value={{ zoom, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut }}>
            {children}
        </ZoomContext.Provider>
    )
}

export function useZoom() {
    const context = useContext(ZoomContext)
    if (!context) throw new Error('useZoom must be used within ZoomProvider')
    return context
}
