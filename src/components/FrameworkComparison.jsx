import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function FrameworkComparison({ darkMode }) {
    const { language } = useLanguage()
    const tr = language === 'tr'

    return (
        <div className={`section-card max-w-7xl mx-auto transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} data-testid="comparison-title">
                {tr ? '🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması' : '🔍 Cypress, Selenium & Playwright Command Comparison'}
            </h1>

            {/* 1. Overview */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '1. Genel Bakış' : '1. Overview'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-900 to-green-800 border-2 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300'}`}>
                        <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>🌲 Cypress</h3>
                        <ul className={`text-sm space-y-2 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                            <li>• {tr ? 'Node.js tabanlı, JavaScript/TypeScript' : 'Node.js based, JavaScript/TypeScript'}</li>
                            <li>• {tr ? 'Chrome, Firefox, Edge, Electron destekler' : 'Supports Chrome, Firefox, Edge, Electron'}</li>
                            <li>• {tr ? 'Real-time reload ve otomatik bekleme' : 'Real-time reload and automatic waiting'}</li>
                            <li>• {tr ? 'Screenshot ve video kaydı' : 'Screenshot and video recording'}</li>
                        </ul>
                    </div>

                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-orange-900 to-orange-800 border-2 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300'}`}>
                        <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>🔶 Selenium</h3>
                        <ul className={`text-sm space-y-2 ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                            <li>• {tr ? 'Çoklu dil desteği (Java, Python, C#, JS vb.)' : 'Multi-language support (Java, Python, C#, JS, etc.)'}</li>
                            <li>• {tr ? 'Geniş tarayıcı ve platform desteği' : 'Wide browser and platform support'}</li>
                            <li>• {tr ? 'WDIO, Selenium Grid gibi ekosistem' : 'Ecosystem includes WDIO, Selenium Grid'}</li>
                            <li>• {tr ? 'Daha eski, olgun bir teknoloji' : 'Older, mature technology'}</li>
                        </ul>
                    </div>

                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-2 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300'}`}>
                        <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>🎭 Playwright</h3>
                        <ul className={`text-sm space-y-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                            <li>• {tr ? 'Microsoft geliştiricisi' : 'Developed by Microsoft'}</li>
                            <li>• {tr ? 'Chrome, Firefox, WebKit destekler' : 'Supports Chrome, Firefox, WebKit'}</li>
                            <li>• {tr ? 'Otomatik bekleme ve network mocking' : 'Auto-waiting and network mocking'}</li>
                            <li>• {tr ? 'Multi-tab, multi-origin desteği' : 'Multi-tab, multi-origin support'}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 2. Navigation */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '2. Temel Komutlar - Sayfaya Gitme' : '2. Basic Commands — Navigation'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'İşlem' : 'Action'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? "URL'ye git" : 'Navigate to URL'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.visit('/')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.get("https://...")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goto('https://...')</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Geri git' : 'Go back'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.go('back')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().back()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goBack()</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'İleri git' : 'Go forward'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.go('forward')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().forward()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goForward()</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Yenile' : 'Reload'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.reload()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().refresh()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.reload()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. Find Elements */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '3. Element Bulma ve Doğrulama' : '3. Finding & Verifying Elements'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'İşlem' : 'Action'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Element bul (CSS)' : 'Find element (CSS)'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.findElement(By.css(".btn"))</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.locator('.btn')</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'İç metinle bul' : 'Find by text'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.contains('Save')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">By.xpath("//*[text()='Save']")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.getByText('Save')</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Görünür mü' : 'Is visible?'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('be.visible')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.isDisplayed()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">toBeVisible()</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Text kontrol' : 'Check text'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('have.text', 'Title')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">getText().equals("Title")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">toHaveText('Title')</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 4. Click Actions */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '4. Tıklama İşlemleri' : '4. Click Actions'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'İşlem' : 'Action'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Normal tık' : 'Single click'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').click()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.click()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.click()</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Sağ tık' : 'Right click'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').rightclick()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Actions.contextClick()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">click({"{button: 'right'}"})</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Çift tık' : 'Double click'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').dblclick()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Actions.doubleClick()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.dblclick()</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Checkbox işaretle' : 'Check checkbox'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('[type="checkbox"]').check()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.click()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.check()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 5. Form Actions */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '5. Form İşlemleri' : '5. Form Actions'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'İşlem' : 'Action'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Text yaz' : 'Type text'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('input').type('text')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.sendKeys("text")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.fill('text')</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Temizle ve yaz' : 'Clear and type'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">clear().type('new')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.clear(); sendKeys("new")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.fill('new')</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Dropdown (value)' : 'Dropdown (value)'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">select('value')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Select().selectByValue("value")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">selectOption({"{value: 'value'}"})</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Dropdown (text)' : 'Dropdown (text)'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">select('Text')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">selectByVisibleText("Text")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">selectOption({"{label: 'Text'}"})</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 6. Waiting */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '6. Bekleme İşlemleri' : '6. Waiting Strategies'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'İşlem' : 'Action'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Sabit bekleme' : 'Fixed wait'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.wait(1000)</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Thread.sleep(1000)</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.waitForTimeout(1000)</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Element görünene kadar' : 'Wait until visible'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').should('be.visible')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">WebDriverWait.visibilityOf()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">waitFor({"{state: 'visible'}"})</code></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Element kaybolana kadar' : 'Wait until hidden'}</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('not.exist')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">invisibilityOf()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">waitFor({"{state: 'hidden'}"})</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 7. Performance */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '7. Performans Karşılaştırması' : '7. Performance Comparison'}
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">{tr ? 'Kriter' : 'Criterion'}</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Hız' : 'Speed'}</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Öğrenme kolaylığı' : 'Ease of learning'}</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Tarayıcı desteği' : 'Browser support'}</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'API test desteği' : 'API test support'}</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className={`border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-indigo-50'}`}>
                                <td className={`px-6 py-4 font-medium ${darkMode ? 'text-gray-200' : ''}`}>{tr ? 'Paralel test' : 'Parallel testing'}</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 8. When to Choose */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '8. Ne Zaman Hangi Aracı Kullanmalı?' : '8. When to Choose Which Tool?'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-300'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>{tr ? '🌲 Cypress Seçin Eğer:' : '🌲 Choose Cypress If:'}</h3>
                        <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                            <li>{tr ? 'Frontend odaklı proje (React, Vue, Angular)' : 'Frontend-focused project (React, Vue, Angular)'}</li>
                            <li>{tr ? 'Hızlı kurulum ve öğrenme istiyorsanız' : 'You want fast setup and easy learning'}</li>
                            <li>{tr ? 'Modern JavaScript/TypeScript stack' : 'Modern JavaScript/TypeScript stack'}</li>
                            <li>{tr ? 'Chrome/Firefox testi yeterli ise' : 'Chrome/Firefox testing is sufficient'}</li>
                        </ul>
                    </div>

                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-300'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>{tr ? '🔶 Selenium Seçin Eğer:' : '🔶 Choose Selenium If:'}</h3>
                        <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                            <li>{tr ? 'Çoklu dil desteği gerekiyorsa' : 'Multi-language support is needed'}</li>
                            <li>{tr ? 'Eski bir sistemle entegrasyon' : 'Integration with a legacy system'}</li>
                            <li>{tr ? 'Geniş tarayıcı/cihaz desteği' : 'Wide browser/device support required'}</li>
                            <li>{tr ? 'Selenium Grid ile dağıtık test' : 'Distributed testing with Selenium Grid'}</li>
                        </ul>
                    </div>

                    <div className={`hover-card p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-300'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>{tr ? '🎭 Playwright Seçin Eğer:' : '🎭 Choose Playwright If:'}</h3>
                        <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                            <li>{tr ? 'Modern web uygulamaları' : 'Modern web applications'}</li>
                            <li>{tr ? 'Multi-tab, iframe, service worker testi' : 'Multi-tab, iframe, service worker testing'}</li>
                            <li>{tr ? 'Network mocking ve interception' : 'Network mocking and interception'}</li>
                            <li>{tr ? 'Cross-browser (WebKit dahil) test' : 'Cross-browser (including WebKit) testing'}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 9. Example: Login Form Test */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {tr ? '9. Örnek: Login Formu Testi' : '9. Example: Login Form Test'}
                </h2>

                <div className="grid grid-cols-1 gap-6">
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-green-900/20 border-l-4 border-green-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
                        <h4 className={`font-bold mb-3 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>🌲 Cypress</h4>
                        <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                            {`describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-message').should('contain', 'Welcome');
  });
});`}
                        </pre>
                    </div>

                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-orange-900/20 border-l-4 border-orange-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
                        <h4 className={`font-bold mb-3 ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>🔶 Selenium (Java)</h4>
                        <pre className="bg-gray-900 text-orange-400 p-4 rounded-lg overflow-x-auto text-sm">
                            {`@Test
public void testLogin() {
    driver.get("https://example.com/login");
    driver.findElement(By.id("username")).sendKeys("testuser");
    driver.findElement(By.id("password")).sendKeys("password123");
    driver.findElement(By.tagName("form")).submit();
    assert driver.getCurrentUrl().contains("/dashboard");
    assert driver.findElement(By.className("welcome-message"))
           .getText().contains("Welcome");
}`}
                        </pre>
                    </div>

                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        <h4 className={`font-bold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>🎭 Playwright</h4>
                        <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
                            {`test('Login Test', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('testuser');
  await page.locator('#password').fill('password123');
  await page.locator('form').click();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.welcome-message'))
       .toContainText('Welcome');
});`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="mb-8">
                <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl">
                    <h2 className="text-3xl font-bold mb-4">💡 {tr ? 'Sonuç' : 'Conclusion'}</h2>
                    <p className="text-lg mb-4">
                        {tr ? 'Her araç kendi güçlü yönlerine sahiptir:' : 'Each tool has its own strengths:'}
                    </p>
                    <ul className="space-y-2 text-indigo-100">
                        <li>• <strong>Cypress:</strong> {tr ? 'Geliştirici dostu, hızlı feedback, mükemmel debugging' : 'Developer-friendly, fast feedback, excellent debugging'}</li>
                        <li>• <strong>Selenium:</strong> {tr ? 'Olgun, esnek, geniş dil ve tarayıcı desteği' : 'Mature, flexible, wide language and browser support'}</li>
                        <li>• <strong>Playwright:</strong> {tr ? 'Modern, hızlı, güçlü API ve network kontrolü' : 'Modern, fast, powerful API and network control'}</li>
                    </ul>
                    <p className="mt-4 text-indigo-100">
                        {tr
                            ? 'Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin.'
                            : 'Choose the best tool based on your project requirements, team skills, and test scope.'}
                    </p>
                </div>
            </section>
        </div>
    )
}

export default FrameworkComparison
