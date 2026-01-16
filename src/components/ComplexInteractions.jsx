import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function ComplexInteractions({ darkMode }) {
    const { t } = useLanguage()
    const [draggedItem, setDraggedItem] = useState(null)
    const [zone1Items, setZone1Items] = useState(['Item A', 'Item B', 'Item C'])
    const [zone2Items, setZone2Items] = useState(['Item X', 'Item Y'])
    const [showModal, setShowModal] = useState(false)

    const handleDragStart = (e, item, zone) => {
        setDraggedItem({ item, zone })
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e, targetZone) => {
        e.preventDefault()
        if (!draggedItem) return

        const { item, zone: sourceZone } = draggedItem

        if (sourceZone === targetZone) return

        if (sourceZone === 'zone1' && targetZone === 'zone2') {
            setZone1Items(zone1Items.filter(i => i !== item))
            setZone2Items([...zone2Items, item])
        } else if (sourceZone === 'zone2' && targetZone === 'zone1') {
            setZone2Items(zone2Items.filter(i => i !== item))
            setZone1Items([...zone1Items, item])
        }

        setDraggedItem(null)
    }

    const handleAlert = () => {
        alert('This is an alert box!')
    }

    const handleConfirm = () => {
        const result = confirm('Do you confirm this action?')
        alert(result ? 'You clicked OK' : 'You clicked Cancel')
    }

    const handlePrompt = () => {
        const result = prompt('Please enter your name:')
        if (result !== null) {
            alert(`Hello, ${result || 'Guest'}!`)
        }
    }

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="complex-interactions-title">
                {t('complex.title')}
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('complex.subtitle')}
            </p>

            {/* Drag and Drop */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('complex.dragDrop')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                    data-testid="drop-zone-1"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'zone1')}
                    className="p-6 border-2 border-dashed border-indigo-300 rounded-lg bg-indigo-50 min-h-[200px]"
                >
                    <h3 className="font-semibold text-indigo-900 mb-3">{t('complex.zone1')}</h3>
                    <div className="space-y-2">
                        {zone1Items.map((item) => (
                            <div
                                key={item}
                                draggable
                                data-testid={`drag-item-${item.toLowerCase().replace(' ', '-')}`}
                                onDragStart={(e) => handleDragStart(e, item, 'zone1')}
                                className="px-4 py-2 bg-white border border-indigo-200 rounded cursor-move hover:shadow-md transition-shadow"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    data-testid="drop-zone-2"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'zone2')}
                    className="p-6 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50 min-h-[200px]"
                >
                    <h3 className="font-semibold text-purple-900 mb-3">{t('complex.zone2')}</h3>
                    <div className="space-y-2">
                        {zone2Items.map((item) => (
                            <div
                                key={item}
                                draggable
                                data-testid={`drag-item-${item.toLowerCase().replace(' ', '-')}`}
                                onDragStart={(e) => handleDragStart(e, item, 'zone2')}
                                className="px-4 py-2 bg-white border border-purple-200 rounded cursor-move hover:shadow-md transition-shadow"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Menu */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('complex.hoverMenu')}</div>
            <div className="mb-6">
                <nav className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg">
                    <ul className="flex" data-testid="hover-menu">
                        {['Products', 'Services', 'About'].map((item) => (
                            <li key={item} className="relative group">
                                <button
                                    data-testid={`menu-${item.toLowerCase()}`}
                                    className="px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
                                >
                                    {item} ▼
                                </button>
                                <ul
                                    data-testid={`submenu-${item.toLowerCase()}`}
                                    className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-xl w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            data-testid={`submenu-${item.toLowerCase()}-item-1`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-t-lg"
                                        >
                                            {item} Option 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            data-testid={`submenu-${item.toLowerCase()}-item-2`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                                        >
                                            {item} Option 2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            data-testid={`submenu-${item.toLowerCase()}-item-3`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-b-lg"
                                        >
                                            {item} Option 3
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Modals */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('complex.modalsAlerts')}</div>
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    data-testid="alert-button"
                    onClick={handleAlert}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                    {t('complex.showAlert')}
                </button>
                <button
                    data-testid="confirm-button"
                    onClick={handleConfirm}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
                >
                    {t('complex.showConfirm')}
                </button>
                <button
                    data-testid="prompt-button"
                    onClick={handlePrompt}
                    className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 shadow-md hover:shadow-lg transition-all"
                >
                    {t('complex.showPrompt')}
                </button>
                <button
                    data-testid="custom-modal-button"
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 shadow-md hover:shadow-lg transition-all"
                >
                    {t('complex.showCustomModal')}
                </button>
            </div>

            {/* Custom Modal */}
            {showModal && (
                <div
                    data-testid="modal-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        data-testid="modal-content"
                        className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4" data-testid="modal-title">
                            {t('complex.customModal')}
                        </h3>
                        <p className="text-gray-600 mb-6" data-testid="modal-text">
                            {t('complex.modalText')}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                data-testid="modal-cancel-button"
                                onClick={() => setShowModal(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                {t('complex.cancel')}
                            </button>
                            <button
                                data-testid="modal-confirm-button"
                                onClick={() => {
                                    alert('Modal confirmed!')
                                    setShowModal(false)
                                }}
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                {t('complex.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Iframe */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('complex.iframeInteraction')}</div>
            <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('complex.iframeDescription')}
                </p>
                <iframe
                    data-testid="test-iframe"
                    srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: sans-serif; padding: 20px; background: #f9fafb; }
                  input, button { 
                    width: 100%; 
                    padding: 10px; 
                    margin: 8px 0; 
                    border: 1px solid #d1d5db; 
                    border-radius: 6px; 
                    box-sizing: border-box;
                  }
                  button { 
                    background: #6366f1; 
                    color: white; 
                    font-weight: bold; 
                    cursor: pointer; 
                    border: none;
                  }
                  button:hover { background: #4f46e5; }
                </style>
              </head>
              <body>
                <h3 style="color: #1f2937; margin-top: 0;">Iframe Form</h3>
                <input type="text" id="iframe-name" placeholder="Enter name" />
                <input type="email" id="iframe-email" placeholder="Enter email" />
                <button id="iframe-submit" onclick="alert('Form submitted from iframe!')">Submit</button>
              </body>
            </html>
          `}
                    className="w-full h-64 border-2 border-gray-300 rounded-lg"
                    title="Test Iframe"
                />
            </div>
        </div>
    )
}

export default ComplexInteractions
