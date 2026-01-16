import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './dark-overrides.css'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </StrictMode>,
)
