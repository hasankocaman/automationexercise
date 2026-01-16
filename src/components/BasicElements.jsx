import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function BasicElements({ darkMode }) {
    const { t } = useLanguage()
    const [dynamicOptions, setDynamicOptions] = useState([])
    const [formData, setFormData] = useState({
        textInput: '',
        emailInput: '',
        numberInput: '',
        passwordInput: '',
        singleCheckbox: false,
        multiCheckboxes: [],
        radioButton: '',
        staticDropdown: '',
        dynamicDropdown: ''
    })

    // Simulate loading dynamic dropdown options after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setDynamicOptions([
                { value: 'option1', label: 'Dynamic Option 1' },
                { value: 'option2', label: 'Dynamic Option 2' },
                { value: 'option3', label: 'Dynamic Option 3' },
                { value: 'option4', label: 'Dynamic Option 4' }
            ])
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleCheckboxChange = (value) => {
        setFormData(prev => ({
            ...prev,
            multiCheckboxes: prev.multiCheckboxes.includes(value)
                ? prev.multiCheckboxes.filter(v => v !== value)
                : [...prev.multiCheckboxes, value]
        }))
    }

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="basic-elements-title">
                {t('basic.title')}
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('basic.subtitle')}
            </p>

            {/* Input Fields */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('basic.inputFields')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="text-input" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.textInput')}
                    </label>
                    <input
                        type="text"
                        id="text-input"
                        data-testid="text-input"
                        placeholder={t('basic.textPlaceholder')}
                        value={formData.textInput}
                        onChange={(e) => setFormData({ ...formData, textInput: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="email-input" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.emailInput')}
                    </label>
                    <input
                        type="email"
                        id="email-input"
                        data-testid="email-input"
                        placeholder="email@example.com"
                        value={formData.emailInput}
                        onChange={(e) => setFormData({ ...formData, emailInput: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="number-input" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.numberInput')}
                    </label>
                    <input
                        type="number"
                        id="number-input"
                        data-testid="number-input"
                        placeholder="123"
                        value={formData.numberInput}
                        onChange={(e) => setFormData({ ...formData, numberInput: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="password-input" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.passwordInput')}
                    </label>
                    <input
                        type="password"
                        id="password-input"
                        data-testid="password-input"
                        placeholder="••••••••"
                        value={formData.passwordInput}
                        onChange={(e) => setFormData({ ...formData, passwordInput: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Checkboxes */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('basic.checkboxes')}</div>
            <div className="mb-6 space-y-3">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="single-checkbox"
                        data-testid="single-checkbox"
                        checked={formData.singleCheckbox}
                        onChange={(e) => setFormData({ ...formData, singleCheckbox: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="single-checkbox" className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.singleCheckbox')}
                    </label>
                </div>

                <div className="pl-4 border-l-2 border-gray-200">
                    <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.multiCheckboxes')}
                    </p>
                    {['JavaScript', 'Python', 'Java', 'C++'].map((lang) => (
                        <div key={lang} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`checkbox-${lang.toLowerCase()}`}
                                data-testid={`checkbox-${lang.toLowerCase()}`}
                                checked={formData.multiCheckboxes.includes(lang)}
                                onChange={() => handleCheckboxChange(lang)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor={`checkbox-${lang.toLowerCase()}`} className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {lang}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Radio Buttons */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('basic.radioButtons')}</div>
            <div className="mb-6">
                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('basic.experienceLevel')}
                </p>
                <div className="space-y-2">
                    {[
                        { value: 'beginner', label: t('basic.beginner') },
                        { value: 'intermediate', label: t('basic.intermediate') },
                        { value: 'advanced', label: t('basic.advanced') },
                        { value: 'expert', label: t('basic.expert') }
                    ].map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                type="radio"
                                id={`radio-${option.value}`}
                                data-testid={`radio-${option.value}`}
                                name="experience"
                                value={option.value}
                                checked={formData.radioButton === option.value}
                                onChange={(e) => setFormData({ ...formData, radioButton: e.target.value })}
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label htmlFor={`radio-${option.value}`} className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dropdowns */}
            <div className={`subsection-title ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('basic.dropdowns')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="static-dropdown" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.staticDropdown')}
                    </label>
                    <select
                        id="static-dropdown"
                        data-testid="static-dropdown"
                        value={formData.staticDropdown}
                        onChange={(e) => setFormData({ ...formData, staticDropdown: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">{t('basic.selectCountry')}</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="de">Germany</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dynamic-dropdown" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('basic.dynamicDropdown')} {dynamicOptions.length === 0 && `(${t('basic.loading')})`}
                    </label>
                    <select
                        id="dynamic-dropdown"
                        data-testid="dynamic-dropdown"
                        value={formData.dynamicDropdown}
                        onChange={(e) => setFormData({ ...formData, dynamicDropdown: e.target.value })}
                        disabled={dynamicOptions.length === 0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">{t('basic.selectOption')}</option>
                        {dynamicOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Display Selected Values */}
            <div className={`mt-8 p-4 rounded-lg border ${darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}>{t('basic.selectedValues')}</h3>
                <div className={`text-sm space-y-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`} data-testid="selected-values-display">
                    <p><strong>{t('basic.text')}</strong> {formData.textInput || t('basic.empty')}</p>
                    <p><strong>{t('basic.email')}</strong> {formData.emailInput || t('basic.empty')}</p>
                    <p><strong>{t('basic.number')}</strong> {formData.numberInput || t('basic.empty')}</p>
                    <p><strong>{t('basic.singleCheckboxLabel')}</strong> {formData.singleCheckbox ? t('basic.checked') : t('basic.unchecked')}</p>
                    <p><strong>{t('basic.multiCheckboxesLabel')}</strong> {formData.multiCheckboxes.join(', ') || t('basic.none')}</p>
                    <p><strong>{t('basic.radio')}</strong> {formData.radioButton || t('basic.noneSelected')}</p>
                    <p><strong>{t('basic.staticDropdownLabel')}</strong> {formData.staticDropdown || t('basic.noneSelected')}</p>
                    <p><strong>{t('basic.dynamicDropdownLabel')}</strong> {formData.dynamicDropdown || t('basic.noneSelected')}</p>
                </div>
            </div>
        </div>
    )
}

export default BasicElements
