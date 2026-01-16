import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function APISimulation({ darkMode }) {
    const { t } = useLanguage()
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [apiResponse, setApiResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const simulateAPI = async (endpoint) => {
        setIsLoading(true)
        setApiResponse(null)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        let response = {}
        switch (endpoint) {
            case 'success':
                response = {
                    status: 200,
                    statusText: 'OK',
                    message: 'Login successful! Welcome back.',
                    data: {
                        userId: 12345,
                        username: loginData.username || 'testuser',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    }
                }
                break
            case 'unauthorized':
                response = {
                    status: 401,
                    statusText: 'Unauthorized',
                    message: 'Invalid credentials. Please check your username and password.',
                    error: 'INVALID_CREDENTIALS'
                }
                break
            case 'notfound':
                response = {
                    status: 404,
                    statusText: 'Not Found',
                    message: 'User not found. Please register first.',
                    error: 'USER_NOT_FOUND'
                }
                break
            case 'servererror':
                response = {
                    status: 500,
                    statusText: 'Internal Server Error',
                    message: 'Something went wrong on our end. Please try again later.',
                    error: 'INTERNAL_SERVER_ERROR'
                }
                break
            default:
                response = {
                    status: 400,
                    statusText: 'Bad Request',
                    message: 'Invalid request',
                    error: 'BAD_REQUEST'
                }
        }

        setApiResponse(response)
        setIsLoading(false)
    }

    const getStatusColor = (status) => {
        if (status >= 200 && status < 300) return 'text-green-600 bg-green-50 border-green-200'
        if (status >= 400 && status < 500) return 'text-orange-600 bg-orange-50 border-orange-200'
        if (status >= 500) return 'text-red-600 bg-red-50 border-red-200'
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="api-simulation-title">
                {t('api.title')}
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('api.subtitle')}
            </p>

            {/* Login Form */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4">Mock Login API</h3>
                    <div className="space-y-4 mb-4">
                        <div>
                            <label htmlFor="api-username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="api-username"
                                data-testid="api-username-input"
                                placeholder="Enter username"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="api-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="api-password"
                                data-testid="api-password-input"
                                placeholder="Enter password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            data-testid="api-success-button"
                            onClick={() => simulateAPI('success')}
                            disabled={isLoading}
                            className="px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                        >
                            {t('api.successButton')}
                        </button>
                        <button
                            data-testid="api-unauthorized-button"
                            onClick={() => simulateAPI('unauthorized')}
                            disabled={isLoading}
                            className="px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                        >
                            {t('api.unauthorizedButton')}
                        </button>
                        <button
                            data-testid="api-notfound-button"
                            onClick={() => simulateAPI('notfound')}
                            disabled={isLoading}
                            className="px-4 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                        >
                            {t('api.notFoundButton')}
                        </button>
                        <button
                            data-testid="api-error-button"
                            onClick={() => simulateAPI('servererror')}
                            disabled={isLoading}
                            className="px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                        >
                            {t('api.serverErrorButton')}
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div
                        data-testid="api-loading"
                        className="flex items-center justify-center gap-3 p-6 bg-blue-50 border border-blue-200 rounded-xl mb-6"
                    >
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-blue-700 font-medium">Processing API request...</p>
                    </div>
                )}

                {/* API Response Display */}
                {apiResponse && !isLoading && (
                    <div
                        data-testid="api-response"
                        className={`p-6 rounded-xl border-2 ${getStatusColor(apiResponse.status)}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">API Response</h3>
                            <span
                                data-testid="api-status-code"
                                className="px-4 py-2 rounded-lg font-mono font-bold text-lg border-2"
                            >
                                {apiResponse.status} {apiResponse.statusText}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold mb-1">Message:</p>
                                <p data-testid="api-message" className="font-medium">
                                    {apiResponse.message}
                                </p>
                            </div>

                            {apiResponse.data && (
                                <div>
                                    <p className="text-sm font-semibold mb-1">Response Data:</p>
                                    <pre
                                        data-testid="api-data"
                                        className="bg-white/50 p-3 rounded border overflow-x-auto text-sm"
                                    >
                                        {JSON.stringify(apiResponse.data, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {apiResponse.error && (
                                <div>
                                    <p className="text-sm font-semibold mb-1">Error Code:</p>
                                    <code
                                        data-testid="api-error-code"
                                        className="bg-white/50 px-2 py-1 rounded border font-mono"
                                    >
                                        {apiResponse.error}
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">💡 Testing Tips:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Use network interception to capture API requests</li>
                        <li>Mock different status codes to test error handling</li>
                        <li>Verify response data structure and content</li>
                        <li>Test loading states and timeout scenarios</li>
                        <li>Practice extracting and validating response fields</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default APISimulation
