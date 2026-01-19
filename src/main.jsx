import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './dark-overrides.css'
import { LanguageProvider } from './context/LanguageContext'


// import { worker } from './mocks/browser' // Removed to avoid duplicate import warning


async function enableMocking() {
    // In Vite, use import.meta.env.DEV for development check
    if (!import.meta.env.DEV) {
        return
    }

    const { worker } = await import('./mocks/browser')


    // Start MSW but catch errors to prevent app crash
    return worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
            url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            options: {
                scope: import.meta.env.BASE_URL,
            },
        },
    }).catch(err => {
        console.error('Failed to start MSW:', err)
    })
}

enableMocking().catch(console.error).finally(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </StrictMode>,
    )
})
