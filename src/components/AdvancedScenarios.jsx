import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function AdvancedScenarios({ darkMode }) {
    const { t } = useLanguage()
    const [dynamicContent, setDynamicContent] = useState(null)
    const [scrollItems, setScrollItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`))
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null)
    const scrollContainerRef = useRef(null)

    // Simulate dynamic content loading
    useEffect(() => {
        const delay = Math.random() * 3000 + 3000 // 3-6 seconds
        const timer = setTimeout(() => {
            setDynamicContent('✅ Dynamic content loaded successfully after wait!')
        }, delay)

        return () => clearTimeout(timer)
    }, [])

    // Custom Shadow DOM Component
    useEffect(() => {
        class ShadowComponent extends HTMLElement {
            constructor() {
                super()
                const shadow = this.attachShadow({ mode: 'open' })

                const button = document.createElement('button')
                button.textContent = 'Shadow DOM Button'
                button.setAttribute('data-testid', 'shadow-button')
                button.style.cssText = 'padding: 8px 16px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;'

                button.addEventListener('click', () => {
                    alert('You clicked the Shadow DOM button!')
                })

                shadow.appendChild(button)
            }
        }

        if (!customElements.get('shadow-component')) {
            customElements.define('shadow-component', ShadowComponent)
        }
    }, [])

    const handleScroll = () => {
        const container = scrollContainerRef.current
        if (!container || isLoadingMore) return

        const { scrollTop, scrollHeight, clientHeight } = container
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMoreItems()
        }
    }

    const loadMoreItems = () => {
        setIsLoadingMore(true)
        setTimeout(() => {
            const newItems = Array.from(
                { length: 10 },
                (_, i) => `Item ${scrollItems.length + i + 1}`
            )
            setScrollItems([...scrollItems, ...newItems])
            setIsLoadingMore(false)
        }, 1000)
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setUploadedFile({
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                type: file.type
            })
        }
    }

    const handleFileDownload = () => {
        const content = 'This is a sample file for download testing.\nAutomation Testing Playground\nDate: ' + new Date().toLocaleString()
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'sample-file.txt'
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="advanced-scenarios-title">
                {t('advanced.title')}
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('advanced.subtitle')}
            </p>

            {/* Shadow DOM */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('advanced.shadowDOM')}</div>
            <div className={`mb-6 p-4 border rounded-lg ${darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                <p className={`text-sm mb-3 ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                    {t('advanced.shadowDescription')}
                </p>
                <shadow-component data-testid="shadow-host"></shadow-component>
            </div>

            {/* Dynamic Content */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('advanced.dynamicContent')}</div>
            <div className={`mb-6 p-6 rounded-lg border ${darkMode ? 'bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'}`}>
                {!dynamicContent ? (
                    <div className="flex items-center gap-3" data-testid="loading-indicator">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className={`font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                            {t('advanced.waitingText')}
                        </p>
                    </div>
                ) : (
                    <div
                        data-testid="dynamic-content"
                        className={`text-xl font-bold animate-pulse ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}
                    >
                        {dynamicContent}
                    </div>
                )}
            </div>

            {/* Infinite Scroll */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('advanced.infiniteScroll')}</div>
            <div className="mb-6">
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('advanced.scrollDescription')}
                </p>
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    data-testid="infinite-scroll-container"
                    className={`h-80 overflow-y-auto border rounded-lg p-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                    <div className="space-y-2">
                        {scrollItems.map((item, index) => (
                            <div
                                key={index}
                                data-testid={`scroll-item-${index + 1}`}
                                className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    {isLoadingMore && (
                        <div className="text-center py-4" data-testid="scroll-loading">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <p className="text-gray-600 mt-2">Loading more items...</p>
                        </div>
                    )}
                </div>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('advanced.itemsCount')} <span data-testid="items-count">{scrollItems.length}</span>
                </p>
            </div>

            {/* File Upload/Download */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('advanced.fileUpload')} & {t('advanced.fileDownload')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 border rounded-lg ${darkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>{t('advanced.fileUpload')}</h4>
                    <input
                        type="file"
                        id="file-upload"
                        data-testid="file-upload-input"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer"
                    />
                    {uploadedFile && (
                        <div
                            data-testid="uploaded-file-info"
                            className="mt-3 p-3 bg-white rounded border border-green-300"
                        >
                            <p className="text-sm text-green-900">
                                <strong>File:</strong> {uploadedFile.name}
                            </p>
                            <p className="text-sm text-green-900">
                                <strong>Size:</strong> {uploadedFile.size}
                            </p>
                            <p className="text-sm text-green-900">
                                <strong>Type:</strong> {uploadedFile.type || 'unknown'}
                            </p>
                        </div>
                    )}
                </div>

                <div className={`p-4 border rounded-lg ${darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>{t('advanced.fileDownload')}</h4>
                    <button
                        data-testid="file-download-button"
                        onClick={handleFileDownload}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
                        📥 {t('advanced.downloadSample')}
                    </button>
                    <p className="text-xs text-blue-700 mt-3">
                        Click to download a sample text file
                    </p>
                </div>
            </div>
        </div>
    )
}

// Define custom Shadow DOM component
if (typeof window !== 'undefined' && !customElements.get('shadow-component')) {
    class ShadowComponent extends HTMLElement {
        constructor() {
            super()
            const shadow = this.attachShadow({ mode: 'open' })

            const wrapper = document.createElement('div')
            wrapper.innerHTML = `
        <style>
          button {
            padding: 12px 24px;
            background: linear-gradient(to right, #8b5cf6, #6366f1);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
          }
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          }
        </style>
        <button id="shadow-button" data-testid="shadow-button">
          Click Me (I'm in Shadow DOM!)
        </button>
      `

            shadow.appendChild(wrapper)

            shadow.querySelector('#shadow-button').addEventListener('click', () => {
                alert('You successfully clicked the Shadow DOM button!')
            })
        }
    }

    customElements.define('shadow-component', ShadowComponent)
}

export default AdvancedScenarios
