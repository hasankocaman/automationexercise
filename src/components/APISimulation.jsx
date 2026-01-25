
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
// import { mockFetch } from '../utils/api-simulation' // Removed: Replaced by MSW
import SwaggerDocs from './SwaggerDocs'

function APISimulation({ darkMode }) {
    const { t } = useLanguage()

    // State
    const [loginData, setLoginData] = useState({ email: 'test@example.com', password: 'password123' })
    const [logs, setLogs] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Auto-scroll to bottom of logs when new ones occur
    const endOfLogsRef = useRef(null)

    useEffect(() => {
        if (isModalOpen && endOfLogsRef.current) {
            endOfLogsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [logs, isModalOpen])

    /**
     * Generic handler for API requests to manage logging and state
     */
    const handleApiRequest = async (name, url, method, body = null) => {
        setIsLoading(true)
        const requestTime = new Date().toLocaleTimeString()

        // Normalize URL to include base path for MSW interception
        const baseUrl = import.meta.env.BASE_URL
        let fetchUrl = url
        if (url.startsWith('/')) {
            const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
            // Prevent double prepending if url already includes base
            if (!url.startsWith(cleanBase)) {
                // If url is /login, and cleanBase is /automationexercise/, result is /automationexercise/login
                fetchUrl = cleanBase + url.slice(1)
            }
        }

        // Add pending log
        const newLogId = Date.now()
        const requestLog = {
            id: newLogId,
            time: requestTime,
            name,
            url: fetchUrl, // Log the actual URL being fetched
            method,
            body,
            status: 'Pending...',
            response: null
        }

        setLogs(prev => [...prev, requestLog])

        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            }

            // Replaced mockFetch with real window.fetch (intercepted by MSW)
            const res = await fetch(fetchUrl, options)
            const json = await res.json()

            // Update log with success
            setLogs(prev => prev.map(log =>
                log.id === newLogId
                    ? { ...log, status: res.status, statusText: res.statusText, response: json }
                    : log
            ))

            // Open modal automatically to show the result
            if (!isModalOpen) setIsModalOpen(true)

        } catch (err) {
            // Update log with error
            setLogs(prev => prev.map(log =>
                log.id === newLogId
                    ? { ...log, status: 'Error', response: { message: err.message } }
                    : log
            ))
        } finally {
            setIsLoading(false)
        }
    }

    const clearLogs = () => setLogs([])

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="api-simulation-title">
                        {t('api.title')}
                    </h2>
                    <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('api.subtitle')}
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                    <span>📊 View API Logs</span>
                    {logs.length > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{logs.length}</span>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Login Simulation */}
                <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                        🔐 User Login Simulation
                    </h3>
                    <div className="space-y-4 mb-4">
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                            <input
                                type="text"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300'}`}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => handleApiRequest('Login', '/login', 'POST', loginData)}
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                    >
                        {isLoading ? 'Requesting...' : 'POST /login'}
                    </button>
                </div>

                {/* 2. Products & Orders */}
                <div className="space-y-6">
                    {/* Products List */}
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
                        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                            📦 Get Products List
                        </h3>
                        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Fetch all available products from the mock database.
                        </p>
                        <button
                            onClick={() => handleApiRequest('Get Products', '/productsList', 'GET')}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
                        >
                            GET /productsList
                        </button>
                    </div>

                    {/* Create Order */}
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-emerald-50 border-emerald-200'}`}>
                        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                            🛒 Create Order
                        </h3>
                        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Simulate placing an order for 'Blue Top' (ID: 1).
                        </p>
                        <button
                            onClick={() => handleApiRequest('Create Order', '/createOrder', 'POST', { productId: 1, quantity: 2 })}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md"
                        >
                            POST /createOrder
                        </button>
                    </div>
                </div>
            </div>

            {/* Swagger Documentation */}
            <SwaggerDocs darkMode={darkMode} onExecute={handleApiRequest} />


            {/* API Logger Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-4xl max-h-[80vh] flex flex-col rounded-xl shadow-2xl ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>

                        {/* Modal Header */}
                        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                📡 Network Log
                                <span className="text-xs font-normal px-2 py-1 bg-gray-200 text-gray-800 rounded-full">Live</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearLogs}
                                    className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded transition"
                                >
                                    Clear Logs
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
                            {logs.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    No requests yet. Click a button to simulate an API call.
                                </div>
                            ) : (
                                logs.map((log) => (
                                    <div key={log.id} className={`border rounded-lg overflow-hidden shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

                                        {/* Log Header */}
                                        <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono text-xs px-2 py-1 rounded ${log.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {log.method}
                                                </span>
                                                <span className="font-mono text-sm font-semibold">{log.url}</span>
                                                <span className="text-xs text-gray-500">({log.time})</span>
                                            </div>
                                            <div>
                                                {typeof log.status === 'number' ? (
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.status >= 200 && log.status < 300
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {log.status} {log.statusText}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-500 animate-pulse">{log.status}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Log Details */}
                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                                            {/* Request Body */}
                                            {log.body && (
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Request Body</p>
                                                    <pre className={`p-2 rounded overflow-x-auto ${darkMode ? 'bg-black/30' : 'bg-gray-100'}`}>
                                                        {JSON.stringify(log.body, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {/* Response Body */}
                                            {log.response && (
                                                <div className="space-y-1 md:col-span-2">
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Response Body</p>
                                                    <pre className={`p-2 rounded overflow-x-auto ${darkMode ? 'bg-black/30' : 'bg-gray-100'}`}>
                                                        {JSON.stringify(log.response, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={endOfLogsRef} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default APISimulation
