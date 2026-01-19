import { useState } from 'react'
import { API_SPEC } from '../utils/api-spec'

function SwaggerDocs({ onExecute, darkMode }) {
    const [expandedEndpoint, setExpandedEndpoint] = useState(null)
    const [requestBodies, setRequestBodies] = useState({})
    const [lastResponse, setLastResponse] = useState({})

    const toggleEndpoint = (id) => {
        setExpandedEndpoint(expandedEndpoint === id ? null : id)
    }

    const handleBodyChange = (id, value) => {
        setRequestBodies(prev => ({ ...prev, [id]: value }))
    }

    const handleExecute = async (endpoint) => {
        const bodyStr = requestBodies[endpoint.id] || JSON.stringify(endpoint.requestBody?.content['application/json'].example, null, 2)

        let body = null
        try {
            if (endpoint.method !== 'GET') {
                body = JSON.parse(bodyStr)
            }
        } catch (e) {
            alert('Invalid JSON format')
            return
        }

        // Call parent handler
        if (onExecute) {
            await onExecute(endpoint.summary, endpoint.path, endpoint.method, body)
        }
    }

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET': return 'bg-blue-600'
            case 'POST': return 'bg-green-600'
            case 'PUT': return 'bg-orange-600'
            case 'DELETE': return 'bg-red-600'
            default: return 'bg-gray-600'
        }
    }

    return (
        <div className={`mt-8 rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span>📜 API Documentation & Playground</span>
                    <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full">Swagger UI</span>
                </h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Use this interactive documentation to understand and test the API endpoints.
                </p>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {API_SPEC.map((endpoint) => {
                    const isExpanded = expandedEndpoint === endpoint.id;
                    const containerBg = darkMode ? 'bg-gray-800' : 'bg-white';
                    const expandedBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';

                    // Initialize body with example if not set
                    const currentBody = requestBodies[endpoint.id] !== undefined
                        ? requestBodies[endpoint.id]
                        : endpoint.requestBody
                            ? JSON.stringify(endpoint.requestBody.content['application/json'].example, null, 2)
                            : '';

                    return (
                        <div key={endpoint.id} className={`${isExpanded ? expandedBg : containerBg}`}>
                            {/* Header / Summary Line */}
                            <div
                                onClick={() => toggleEndpoint(endpoint.id)}
                                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                            >
                                <span className={`px-3 py-1 text-xs font-bold text-white rounded w-16 text-center ${getMethodColor(endpoint.method)}`}>
                                    {endpoint.method}
                                </span>
                                <span className={`font-mono font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    {endpoint.path}
                                </span>
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    - {endpoint.summary}
                                </span>
                            </div>

                            {/* Detailed View */}
                            {isExpanded && (
                                <div className={`p-6 border-t ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                                    <p className="mb-4">{endpoint.description}</p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                        {/* Left Column: Try it out */}
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Parameters</h4>

                                            {endpoint.requestBody ? (
                                                <div className="mb-4">
                                                    <p className="text-xs mb-1 font-semibold">Request Body (JSON)</p>
                                                    <textarea
                                                        value={currentBody}
                                                        onChange={(e) => handleBodyChange(endpoint.id, e.target.value)}
                                                        className={`w-full h-40 font-mono text-sm p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-sm italic text-gray-500 mb-4">No parameters required.</p>
                                            )}

                                            <button
                                                onClick={() => handleExecute(endpoint)}
                                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                                            >
                                                Execute Request
                                            </button>

                                            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                                                <span className="text-lg">🕵️</span>
                                                <p>
                                                    <strong>Tip:</strong> Open your browser's
                                                    <span className="font-mono bg-yellow-100 dark:bg-yellow-800 px-1 mx-1 rounded">DevTools &gt; Network</span>
                                                    tab to see this request trigger in real-time!
                                                    <br />
                                                    <span className="opacity-75 text-[10px]">(It may show 404 since this is a simulation, but the request details are real)</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Column: Implementation Guide */}
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500">
                                                🛠 Postman / Curl Guide
                                            </h4>
                                            <div className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${darkMode ? 'bg-black/40' : 'bg-gray-900 text-green-300'}`}>
                                                <div className="mb-2">
                                                    <span className="text-yellow-400">{endpoint.method}</span> <span className="text-white">https://api.automationexercise.com{endpoint.path}</span>
                                                </div>
                                                {endpoint.requestBody && (
                                                    <div>
                                                        <div className="text-gray-500 mb-1">// Headers</div>
                                                        <div className="text-gray-300 mb-2">Content-Type: application/json</div>
                                                        <div className="text-gray-500 mb-1">// Body</div>
                                                        <pre className="text-white">
                                                            {currentBody}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs mt-2 text-gray-500">
                                                Copy values above to test in Postman or other API tools.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SwaggerDocs
