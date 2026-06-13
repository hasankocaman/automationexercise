import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './dark-overrides.css'
import { LanguageProvider } from './context/LanguageContext'
import { ZoomProvider } from './context/ZoomContext'


// import { worker } from './mocks/browser' // Removed to avoid duplicate import warning


async function enableMocking() {
    // In this specific project (Automation Testing Playground), we WANT the mock simulation
    // to work in production (GitHub Pages) as well.
    // So we remove the !import.meta.env.DEV check.

    // if (!import.meta.env.DEV) {
    //    return
    // }

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
            <HashRouter>
                <ZoomProvider>
                    <LanguageProvider>
                        <App />
                    </LanguageProvider>
                </ZoomProvider>
            </HashRouter>
        </StrictMode>,
    )
})
