import { useState } from 'react'
import { API_SPEC } from '../utils/api-spec'
import { useLanguage } from '../context/LanguageContext'

function SwaggerDocs({ onExecute, darkMode }) {
    const { t } = useLanguage()
    const [expandedEndpoint, setExpandedEndpoint] = useState(null)
    const [requestData, setRequestData] = useState({}) // Stores body and params for each endpoint

    const toggleEndpoint = (id) => {
        setExpandedEndpoint(expandedEndpoint === id ? null : id)
    }

    // Unified handler for params and body updates
    const handleParamChange = (endpointId, paramName, value) => {
        setRequestData(prev => ({
            ...prev,
            [endpointId]: {
                ...prev[endpointId],
                params: {
                    ...prev[endpointId]?.params,
                    [paramName]: value
                }
            }
        }))
    }

    const handleBodyChange = (endpointId, value) => {
        setRequestData(prev => ({
            ...prev,
            [endpointId]: {
                ...prev[endpointId],
                body: value
            }
        }))
    }

    const handleExecute = async (endpoint) => {
        const data = requestData[endpoint.id] || {}
        const params = data.params || {}

        // Construct Path
        let path = endpoint.path
        Object.keys(params).forEach(key => {
            path = path.replace(`:${key}`, params[key])
            path = path.replace(`{${key}}`, params[key])
        })

        // Request Body
        let body = null
        if (endpoint.method !== 'GET' && endpoint.requestBody) {
            const bodyStr = data.body || JSON.stringify(endpoint.requestBody.content['application/json'].example, null, 2)
            try {
                body = JSON.parse(bodyStr)
            } catch (e) {
                alert('Invalid JSON format')
                return
            }
        }

        // Call parent handler
        if (onExecute) {
            await onExecute(endpoint.summary, path, endpoint.method, body)
        }
    }

    // Bind inputs correctly
    const getParamValue = (endpointId, paramName) => {
        return requestData[endpointId]?.params?.[paramName] || ''
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
                    <span className="text-xs font-normal px-2 py-1 bg-blue-100 text-blue-800 rounded-full">v1.2</span>
                </h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('api.description') || "Use this interactive documentation to understand and test the API endpoints."}
                </p>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {API_SPEC.map((endpoint) => {
                    const isExpanded = expandedEndpoint === endpoint.id;
                    const containerBg = darkMode ? 'bg-gray-800' : 'bg-white';
                    const expandedBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';

                    // Translation lookups
                    const summary = endpoint.translationKey ? t(`api.endpoints.${endpoint.translationKey}.summary`) : endpoint.summary;
                    const description = endpoint.translationKey ? t(`api.endpoints.${endpoint.translationKey}.description`) : endpoint.description;

                    // Default values
                    const currentBody = requestData[endpoint.id]?.body !== undefined
                        ? requestData[endpoint.id].body
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
                                <span className={`px-3 py-1 text-xs font-bold text-white rounded w-20 text-center ${getMethodColor(endpoint.method)}`}>
                                    {endpoint.method}
                                </span>
                                <span className={`font-mono font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    {endpoint.path}
                                </span>
                                <span className={`flex-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {summary}
                                </span>
                                <span className="text-gray-400">
                                    {isExpanded ? '▼' : '▶'}
                                </span>
                            </div>

                            {/* Detailed View */}
                            {isExpanded && (
                                <div className={`p-6 border-t ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                                    <p className="mb-6 text-sm">{description}</p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                        {/* Left Column: Try it out */}
                                        <div>
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                                                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 border-b pb-2">Parameters</h4>

                                                {/* Path Parameters */}
                                                {endpoint.parameters && endpoint.parameters.length > 0 && (
                                                    <div className="mb-4">
                                                        <h5 className="text-xs font-semibold mb-2 text-blue-500">Path Parameters</h5>
                                                        {endpoint.parameters.map(param => (
                                                            <div key={param.name} className="mb-2">
                                                                <label className="block text-xs mb-1 font-mono">{param.name} <span className="text-red-500">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    value={getParamValue(endpoint.id, param.name)}
                                                                    placeholder={param.description || `Enter ${param.name}`}
                                                                    className={`w-full px-3 py-1.5 text-sm border rounded ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                                                                    onChange={(e) => handleParamChange(endpoint.id, param.name, e.target.value)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Request Body */}
                                                {endpoint.requestBody ? (
                                                    <div className="mb-4">
                                                        <h5 className="text-xs font-semibold mb-2 text-green-500">Request Body (JSON)</h5>
                                                        <textarea
                                                            value={currentBody}
                                                            onChange={(e) => handleBodyChange(endpoint.id, e.target.value)}
                                                            className={`w-full h-40 font-mono text-sm p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                                        />
                                                    </div>
                                                ) : (
                                                    (!endpoint.parameters || endpoint.parameters.length === 0) && (
                                                        <p className="text-sm italic text-gray-500 mb-4">No parameters required.</p>
                                                    )
                                                )}

                                                <button
                                                    onClick={() => handleExecute(endpoint)}
                                                    className={`w-full py-2 font-semibold rounded transition shadow-md ${endpoint.method === 'GET' ? 'bg-blue-600 hover:bg-blue-700' :
                                                        endpoint.method === 'DELETE' ? 'bg-red-600 hover:bg-red-700' :
                                                            'bg-green-600 hover:bg-green-700'
                                                        } text-white`}
                                                >
                                                    Try it out!
                                                </button>
                                            </div>
                                        </div>

                                        {/* Right Column: Implementation Guide */}
                                        <div className="space-y-4">
                                            {/* Postman Guide */}
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500">
                                                    {t('api.postmanGuide')}
                                                </h4>
                                                <div className={`p-4 rounded-lg text-sm border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-blue-50 border-blue-100'}`}>
                                                    <ul className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <li>{t('api.postmanSteps.step1')}</li>
                                                        <li>{t('api.postmanSteps.step2').replace('{{method}}', endpoint.method)}</li>
                                                        <li>{t('api.postmanSteps.step3').replace('{{url}}', `https://api.automationexercise.com${endpoint.path}`)}</li>
                                                        {endpoint.requestBody && (
                                                            <>
                                                                <li>{t('api.postmanSteps.step4')}</li>
                                                                <li>{t('api.postmanSteps.step5')}</li>
                                                            </>
                                                        )}
                                                        <li>{t('api.postmanSteps.step6')}</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Example Request */}
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500">
                                                    Example Request
                                                </h4>
                                                <div className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${darkMode ? 'bg-black/40' : 'bg-slate-900 text-green-300'}`}>
                                                    <div className="mb-2">
                                                        <span className="text-yellow-400">{endpoint.method}</span> <span className="text-white">https://api.automationexercise.com{endpoint.path}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expected Response */}
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-500">
                                                    Response Format
                                                </h4>
                                                <div className={`p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-60 ${darkMode ? 'bg-black/40' : 'bg-gray-100 text-gray-800'}`}>
                                                    <pre>{JSON.stringify(endpoint.responses[200] || endpoint.responses[201] || {}, null, 2)}</pre>
                                                </div>
                                            </div>
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
