import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Practice({ darkMode, onHomeClick }) {
    const { t } = useLanguage()

    // Logging helper
    const logAction = (type, message) => {
        const timestamp = new Date().toLocaleTimeString('tr-TR')
        console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`)
    }

    // --- State Management ---
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', address: '' })
    const [selections, setSelections] = useState({ gender: '', days: [], country: '', colors: [] })
    const [dates, setDates] = useState({ standard: '', rangeStart: '', rangeEnd: '' })
    const [sliderValue, setSliderValue] = useState(50)
    const [isDragged, setIsDragged] = useState(false)
    const [isDropped, setIsDropped] = useState(false)
    const [dcActive, setDcActive] = useState(false)
    const [files, setFiles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    // Form Validation Logic
    const [errors, setErrors] = useState({})

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    useEffect(() => {
        logInfo("Uygulama Bahçesi (Practice Playground) Başlatıldı")
        logInfo("Test Tanıtım Bloğu: Bu sayfa UI otomasyon testleri için çeşitli senaryolar barındırır.")
    }, [])

    const logInfo = (msg) => logAction('info', msg)
    const logStep = (msg) => logAction('step', msg)

    const handleInputChange = (field, value) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }))
        logStep(`Kişisel Bilgi güncellendi: ${field} = ${value}`)
    }

    const handleSelectionChange = (field, value) => {
        if (field === 'days') {
            const newDays = selections.days.includes(value)
                ? selections.days.filter(d => d !== value)
                : [...selections.days, value]
            setSelections(prev => ({ ...prev, days: newDays }))
            logStep(`Gün seçimi güncellendi: ${newDays.join(', ')}`)
        } else if (field === 'colors') {
            const options = Array.from(value).map(opt => opt.value)
            setSelections(prev => ({ ...prev, colors: options }))
            logStep(`Renk seçimi güncellendi: ${options.join(', ')}`)
        } else {
            setSelections(prev => ({ ...prev, [field]: value }))
            logStep(`${field} seçimi güncellendi: ${value}`)
        }
    }

    // --- Static Table Data ---
    const staticData = [
        { id: 1, name: 'Google', contact: 'Maria Anders', country: 'USA' },
        { id: 2, name: 'Meta', contact: 'Francisco Chang', country: 'Mexico' },
        { id: 3, name: 'Amazon', contact: 'Roland Mendel', country: 'Austria' },
    ]

    // --- Pagination Table Data ---
    const pagedData = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: `$${(i + 1) * 10}`,
    }))

    const itemsPerPage = 5
    const totalPages = Math.ceil(pagedData.length / itemsPerPage)
    const currentItems = pagedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // --- Handlers ---
    const handleFileUpload = (e, isMulti) => {
        const uploaded = Array.from(e.target.files)
        setFiles(prev => isMulti ? [...prev, ...uploaded] : uploaded)
        logStep(`${isMulti ? 'Çoklu' : 'Tekli'} dosya yüklendi: ${uploaded.map(f => f.name).join(', ')}`)
    }

    const handleDragStart = (e) => {
        setIsDragged(true)
        logStep("Sürükleme işlemi başladı")
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDropped(true)
        setIsDragged(false)
        logStep("Öğe başarıyla bırakıldı (Drop)")
    }

    const handleDoubleClick = () => {
        setDcActive(true)
        logStep("Çift tıklama tetiklendi")
        setTimeout(() => setDcActive(false), 2000)
    }

    // Home Icon Component
    const HomeIcon = () => (
        <button
            onClick={onHomeClick}
            title={t('practice.homeTooltip')}
            className="absolute top-4 right-4 text-2xl hover:scale-120 transition-transform cursor-pointer opacity-70 hover:opacity-100"
            data-testid="home-icon-nav"
        >
            🏠
        </button>
    )

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className={`text-center mb-12 p-8 rounded-2xl shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('practice.title')}</h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('practice.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Personal Information */}
                <section className={`relative p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.personalInfo.title')}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {t('practice.personalInfo.name')}
                            </label>
                            <input
                                type="text"
                                data-testid="name"
                                placeholder={t('practice.personalInfo.namePlaceholder')}
                                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={personalInfo.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {t('practice.personalInfo.email')}
                            </label>
                            <input
                                type="email"
                                data-testid="email"
                                placeholder={t('practice.personalInfo.emailPlaceholder')}
                                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={personalInfo.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {t('practice.personalInfo.phone')}
                            </label>
                            <input
                                type="tel"
                                data-testid="phone"
                                placeholder={t('practice.personalInfo.phonePlaceholder')}
                                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={personalInfo.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {t('practice.personalInfo.address')}
                            </label>
                            <textarea
                                data-testid="textarea"
                                rows="3"
                                placeholder={t('practice.personalInfo.addressPlaceholder')}
                                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={personalInfo.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Selection Elements */}
                <section className={`relative p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.selections.title')}
                    </h2>
                    <div className="space-y-6">
                        {/* Radio Gender */}
                        <div>
                            <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.selections.gender')}</p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="male" checked={selections.gender === 'male'} onChange={(e) => handleSelectionChange('gender', e.target.value)} className="w-4 h-4 text-blue-600" data-testid="male" name="gender" />
                                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('practice.selections.male')}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="female" checked={selections.gender === 'female'} onChange={(e) => handleSelectionChange('gender', e.target.value)} className="w-4 h-4 text-pink-600" data-testid="female" name="gender" />
                                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('practice.selections.female')}</span>
                                </label>
                            </div>
                        </div>

                        {/* Checkbox Days */}
                        <div>
                            <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.selections.days')}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" value={day} checked={selections.days.includes(day)} onChange={(e) => handleSelectionChange('days', e.target.value)} className="rounded text-blue-600" data-testid={day} />
                                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t(`practice.selections.${day}`)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Country Select */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.selections.country')}</label>
                            <select
                                data-testid="country"
                                className={`w-full px-4 py-2 rounded-lg border outline-none ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={selections.country}
                                onChange={(e) => handleSelectionChange('country', e.target.value)}
                            >
                                <option value="">---</option>
                                <option value="tr">Turkey</option>
                                <option value="uk">United Kingdom</option>
                                <option value="us">USA</option>
                                <option value="ca">Canada</option>
                                <option value="de">Germany</option>
                            </select>
                        </div>

                        {/* Multi Colors */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.selections.colors')}</label>
                            <select
                                multiple
                                data-testid="colors"
                                className={`w-full h-32 px-2 py-1 rounded-lg border outline-none ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                onChange={(e) => handleSelectionChange('colors', e.target.selectedOptions)}
                            >
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="purple">Purple</option>
                                <option value="white">White</option>
                            </select>
                            <p className="mt-2 text-xs text-gray-500">{t('practice.selections.selectedColors')} {selections.colors.join(', ')}</p>
                        </div>
                    </div>
                </section>

                {/* 3. Date Pickers */}
                <section className={`relative p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.datePickers.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.datePickers.standard')}</label>
                            <input
                                type="date"
                                data-testid="datepicker"
                                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                value={dates.standard}
                                onChange={(e) => {
                                    setDates({ ...dates, standard: e.target.value })
                                    logStep(`Standart tarih seçildi: ${e.target.value}`)
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.datePickers.range')}</label>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    data-testid="start-date"
                                    className={`w-full px-2 py-1 rounded-lg border text-sm ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                    onChange={(e) => setDates({ ...dates, rangeStart: e.target.value })}
                                />
                                <input
                                    type="date"
                                    data-testid="end-date"
                                    className={`w-full px-2 py-1 rounded-lg border text-sm ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                                    onChange={(e) => setDates({ ...dates, rangeEnd: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Interactive Tools */}
                <section className={`relative p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.interactions.title')}
                    </h2>
                    <div className="space-y-8">
                        {/* Slider */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {t('practice.interactions.slider')} [Value: {sliderValue}]
                            </label>
                            <input
                                type="range"
                                data-testid="slider"
                                min="0" max="100"
                                value={sliderValue}
                                onChange={(e) => {
                                    setSliderValue(e.target.value)
                                    logStep(`Slider değeri değişti: ${e.target.value}`)
                                }}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Drag n Drop */}
                            <div>
                                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.interactions.dragDrop')}</p>
                                <div className="flex gap-4">
                                    {!isDropped && (
                                        <div
                                            draggable
                                            onDragStart={handleDragStart}
                                            data-testid="draggable"
                                            className="w-16 h-16 bg-blue-500 text-white text-[10px] rounded flex items-center justify-center cursor-move select-none animate-pulse"
                                        >
                                            {t('practice.interactions.dragMe')}
                                        </div>
                                    )}
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                        data-testid="droppable"
                                        className={`w-24 h-24 border-2 border-dashed rounded flex items-center justify-center text-xs text-center p-2 transition-all ${isDropped ? 'bg-green-100 border-green-500 text-green-700' : darkMode ? 'border-gray-600 text-gray-500' : 'border-gray-300 text-gray-400'}`}
                                    >
                                        {isDropped ? '✅ Success!' : t('practice.interactions.dropHere')}
                                    </div>
                                </div>
                            </div>

                            {/* Double Click */}
                            <div>
                                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.interactions.doubleClick')}</p>
                                <button
                                    onDoubleClick={handleDoubleClick}
                                    data-testid="double-click"
                                    className={`px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 ${dcActive ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                >
                                    {dcActive ? t('practice.interactions.doubleClickResult') : 'Click x2'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Tables */}
                <section className={`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.tables.title')}
                    </h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Static Table */}
                        <div>
                            <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600 opacity-70'}`}>[STATIK] {t('practice.tables.static')}</p>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="w-full text-sm text-left" data-testid="static-table">
                                    <thead className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                                        <tr>
                                            <th className="px-4 py-2 border-b">ID</th>
                                            <th className="px-4 py-2 border-b">Name</th>
                                            <th className="px-4 py-2 border-b">Contact</th>
                                            <th className="px-4 py-2 border-b">Country</th>
                                        </tr>
                                    </thead>
                                    <tbody className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                        {staticData.map(row => (
                                            <tr key={row.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                                <td className="px-4 py-2">{row.id}</td>
                                                <td className="px-4 py-2">{row.name}</td>
                                                <td className="px-4 py-2">{row.contact}</td>
                                                <td className="px-4 py-2">{row.country}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Paginated Table */}
                        <div>
                            <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600 opacity-70'}`}>[PAGINATION] {t('practice.tables.pagination')}</p>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="w-full text-sm text-left" data-testid="pagination-table">
                                    <thead className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
                                        <tr>
                                            <th className="px-4 py-2 border-b">#</th>
                                            <th className="px-4 py-2 border-b">Product</th>
                                            <th className="px-4 py-2 border-b">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                        {currentItems.map(row => (
                                            <tr key={row.id} className="border-b dark:border-gray-700">
                                                <td className="px-4 py-2">{row.id}</td>
                                                <td className="px-4 py-2">{row.name}</td>
                                                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">{row.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => {
                                        setCurrentPage(p => Math.max(1, p - 1))
                                        logStep(`Tablo sayfa değiştirildi: ${currentPage - 1}`)
                                    }}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs"
                                >
                                    Previous
                                </button>
                                <span className="text-xs font-medium">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => {
                                        setCurrentPage(p => Math.min(totalPages, p + 1))
                                        logStep(`Tablo sayfa değiştirildi: ${currentPage + 1}`)
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50 text-xs"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. File Operations */}
                <section className={`relative lg:col-span-2 p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <HomeIcon />
                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {t('practice.files.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.files.single')}</label>
                            <input
                                type="file"
                                data-testid="single-file-upload"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                onChange={(e) => handleFileUpload(e, false)}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('practice.files.multiple')}</label>
                            <input
                                type="file"
                                multiple
                                data-testid="multi-file-upload"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                                onChange={(e) => handleFileUpload(e, true)}
                            />
                        </div>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-4 p-4 rounded bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                            <p className="text-xs font-bold mb-2 uppercase text-gray-400">Yüklenen Dosyalar:</p>
                            <ul className="text-xs space-y-1">
                                {files.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                        📄 {f.name} ({(f.size / 1024).toFixed(1)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Practice
