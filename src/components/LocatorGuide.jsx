import React, { useState } from 'react';
import './LocatorGuide.css';
import './LocatorGuideDark.css';

const LocatorGuide = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState('comparison');

    return (
        <div className={`locator-guide-container ${darkMode ? 'dark-mode' : ''}`}>
            <header>
                <h1>🎯 Selenium vs Playwright Locator Rehberi</h1>
                <p className="subtitle">Java Selenium'dan TypeScript Playwright'e Geçiş</p>
            </header>

            <div className="nav-tabs">
                <button
                    className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comparison')}
                >
                    📊 Karşılaştırma (20 Örnek)
                </button>
                <button
                    className={`tab-btn ${activeTab === 'playwright-only' ? 'active' : ''}`}
                    onClick={() => setActiveTab('playwright-only')}
                >
                    🎭 Sadece Playwright (20 Örnek)
                </button>
            </div>

            {activeTab === 'comparison' && (
                <div id="comparison" className="content-section active">
                    {/* Örnek 1 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 1</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;input type="text" id="username" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement element = driver
  .findElement(By.id("username"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const element = page
  .locator('#username');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ta CSS seçiciler varsayılandır. ID için # kullanırız.
                        </div>
                    </div>

                    {/* Örnek 2 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 2</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;button class="btn-primary"&gt;Gönder&lt;/button&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement button = driver
  .findElement(By.className("btn-primary"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const button = page
  .locator('.btn-primary');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Class için . (nokta) kullanırız.
                        </div>
                    </div>

                    {/* Örnek 3 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 3</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;input name="email" type="email" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement email = driver
  .findElement(By.name("email"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const email = page
  .locator('[name="email"]');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Attribute seçiciler için köşeli parantez kullanırız.
                        </div>
                    </div>

                    {/* Örnek 4 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 4</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;a href="/home"&gt;Ana Sayfa&lt;/a&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement link = driver
  .findElement(By.linkText("Ana Sayfa"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const link = page
  .getByRole('link', { name: 'Ana Sayfa' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ta role-based seçiciler daha erişilebilir ve güvenilirdir.
                        </div>
                    </div>

                    {/* Örnek 5 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 5</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;button&gt;Kaydet&lt;/button&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement btn = driver
  .findElement(By.xpath("//button[text()='Kaydet']"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const btn = page
  .getByRole('button', { name: 'Kaydet' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> XPath yerine getByRole kullanmak daha hızlı ve okunabilirdir.
                        </div>
                    </div>

                    {/* Örnek 6 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 6</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div class="container">
  <p>Merhaba Dünya</p>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement text = driver
  .findElement(By.cssSelector(".container p"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const text = page
  .locator('.container p');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> CSS seçiciler her iki frameworkte de aynı şekilde çalışır.
                        </div>
                    </div>

                    {/* Örnek 7 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 7</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;input type="text" placeholder="Adınızı girin" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement input = driver.findElement(
  By.cssSelector("[placeholder='Adınızı girin']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const input = page
  .getByPlaceholder('Adınızı girin');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ın getByPlaceholder metodu çok daha pratiktir.
                        </div>
                    </div>

                    {/* Örnek 8 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 8</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<label>E-posta:</label>
<input type="email" />`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement input = driver.findElement(
  By.xpath("//label[text()='E-posta:']/following-sibling::input")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const input = page
  .getByLabel('E-posta:');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> getByLabel karmaşık XPath'lerden çok daha temizdir.
                        </div>
                    </div>

                    {/* Örnek 9 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 9</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;h1&gt;Hoş Geldiniz&lt;/h1&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement heading = driver
  .findElement(By.tagName("h1"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const heading = page
  .getByRole('heading', { name: 'Hoş Geldiniz' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Heading'ler için role-based seçici kullanmak best practice'tir.
                        </div>
                    </div>

                    {/* Örnek 10 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 10</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;div data-testid="user-profile"&gt;Profil&lt;/div&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement profile = driver.findElement(
  By.cssSelector("[data-testid='user-profile']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const profile = page
  .getByTestId('user-profile');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Test ID'leri test ortamında en güvenilir seçicidir.
                        </div>
                    </div>

                    {/* Örnek 11 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 11</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<ul>
  <li>Elma</li>
  <li>Armut</li>
</ul>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`List<WebElement> items = driver
  .findElements(By.tagName("li"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const items = page
  .locator('li');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ta locator birden fazla elementi otomatik yakalar.
                        </div>
                    </div>

                    {/* Örnek 12 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 12</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;p&gt;Toplam: 150 TL&lt;/p&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement price = driver.findElement(
  By.xpath("//p[contains(text(),'Toplam')]")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const price = page
  .getByText('Toplam:', { exact: false });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> getByText ile partial text araması yapabilirsiniz.
                        </div>
                    </div>

                    {/* Örnek 13 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 13</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;img src="logo.png" alt="Şirket Logosu" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement logo = driver.findElement(
  By.cssSelector("[alt='Şirket Logosu']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const logo = page
  .getByAltText('Şirket Logosu');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Görseller için getByAltText en iyi seçenektir.
                        </div>
                    </div>

                    {/* Örnek 14 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 14</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div id="main">
  <button>Tıkla</button>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement parent = driver.findElement(By.id("main"));
WebElement button = parent.findElement(By.tagName("button"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const button = page
  .locator('#main button');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ta zincirleme seçici daha temizdir.
                        </div>
                    </div>

                    {/* Örnek 15 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 15</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>&lt;input type="checkbox" id="terms" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement checkbox = driver
  .findElement(By.id("terms"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const checkbox = page
  .getByRole('checkbox');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Checkbox için role kullanmak daha semantik bir yaklaşımdır.
                        </div>
                    </div>

                    {/* Örnek 16 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 16</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<select id="country">
  <option>Türkiye</option>
</select>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement select = driver
  .findElement(By.id("country"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const select = page
  .locator('#country');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Dropdown'lar için selectOption() metodunu kullanabilirsiniz.
                        </div>
                    </div>

                    {/* Örnek 17 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 17</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<table>
  <tr>
    <td>Ahmet</td>
  </tr>
</table>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement cell = driver.findElement(
  By.xpath("//table/tr/td")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const cell = page
  .locator('table tr td');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Tablo için getByRole('cell') da kullanılabilir.
                        </div>
                    </div>

                    {/* Örnek 18 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 18</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div title="Yardım İpucu">?</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement help = driver.findElement(
  By.cssSelector("[title='Yardım İpucu']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const help = page
  .getByTitle('Yardım İpucu');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Title attribute'u için getByTitle çok pratiktir.
                        </div>
                    </div>

                    {/* Örnek 19 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 19</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<form>
  <input type="text" />
  <button type="submit">Gönder</button>
</form>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement form = driver.findElement(By.tagName("form"));
WebElement submit = form.findElement(
  By.cssSelector("[type='submit']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const submit = page
  .locator('form')
  .getByRole('button', { name: 'Gönder' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ta locator zincirleme daha okunabilirdir.
                        </div>
                    </div>

                    {/* Örnek 20 */}
                    <div className="example-card">
                        <span className="example-number">Örnek 20</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div class="card active">
  <span>Aktif Kart</span>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">☕ Java Selenium</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement card = driver.findElement(
  By.cssSelector(".card.active span")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">🎭 TypeScript Playwright</div>
                                <div className="code-content">
                                    <pre><code>{`const card = page
  .locator('.card.active span');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Birden fazla class için nokta ile birleştirme aynıdır.
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'playwright-only' && (
                <div id="playwright-only" className="content-section active">
                    <div className="playwright-only">
                        🎭 Aşağıdaki özellikler sadece Playwright'ta mevcuttur!
                    </div>

                    {/* Playwright Örnek 1 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 1</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<button>Kaydet</button>
<button>İptal</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - İlk Elementi Seçme:</div>
                            <pre><code>{`const firstButton = page.locator('button').first();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> first() metodu ile birden fazla elementten ilkini seçebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 2 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 2</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<ul>
  <li>Birinci</li>
  <li>İkinci</li>
  <li>Üçüncü</li>
</ul>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Son Elementi Seçme:</div>
                            <pre><code>{`const lastItem = page.locator('li').last();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> last() metodu listedeki son elementi seçer.
                        </div>
                    </div>

                    {/* Playwright Örnek 3 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 3</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Index ile Element Seçme:</div>
                            <pre><code>{`const secondItem = page.locator('.item').nth(1); // 0'dan başlar`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> nth(index) ile belirli sıradaki elementi seçebilirsiniz. Index 0'dan başlar.
                        </div>
                    </div>

                    {/* Playwright Örnek 4 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 4</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div>
  <p>Aktif olmayan metin</p>
  <p class="active">Aktif metin</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Filtreleme:</div>
                            <pre><code>{`const activeParagraph = page
  .locator('p')
  .filter({ hasText: 'Aktif' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> filter() metodu ile elementleri metin veya başka kriterlere göre süzebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 5 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 5</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<article>
  <h2>Başlık</h2>
  <button>Oku</button>
</article>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - İçinde Element Barındırma:</div>
                            <pre><code>{`const article = page
  .locator('article')
  .filter({ has: page.locator('button') });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> has ile belirli bir elementi içeren parent'ı bulabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 6 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 6</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div class="container">
  <p>Test metni</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Görünürlük Kontrolü:</div>
                            <pre><code>{`await expect(page.locator('.container')).toBeVisible();
await expect(page.locator('.container')).toBeHidden();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright'ın assertion metodları ile elementin durumunu kontrol edebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 7 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 7</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<button disabled>Gönder</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Durum Kontrolü:</div>
                            <pre><code>{`await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('button')).toBeEnabled();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Element durumlarını (enabled/disabled) kolayca kontrol edebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 8 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 8</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<input type="checkbox" checked />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Checkbox Kontrolü:</div>
                            <pre><code>{`await expect(page.getByRole('checkbox')).toBeChecked();
await page.getByRole('checkbox').check();
await page.getByRole('checkbox').uncheck();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Checkbox işlemleri için özel metodlar mevcuttur.
                        </div>
                    </div>

                    {/* Playwright Örnek 9 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 9</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<p>Hoş geldiniz!</p>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Metin İçeriği Kontrolü:</div>
                            <pre><code>{`await expect(page.locator('p')).toHaveText('Hoş geldiniz!');
await expect(page.locator('p')).toContainText('Hoş');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> toHaveText tam eşleşme, toContainText kısmi eşleşme kontrol eder.
                        </div>
                    </div>

                    {/* Playwright Örnek 10 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 10</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<input type="text" value="Merhaba" />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Input Değeri Kontrolü:</div>
                            <pre><code>{`await expect(page.locator('input')).toHaveValue('Merhaba');
const value = await page.locator('input').inputValue();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Input değerlerini kontrol etmek veya almak çok kolaydır.
                        </div>
                    </div>

                    {/* Playwright Örnek 11 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 11</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div class="box active">Kutu</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Class Kontrolü:</div>
                            <pre><code>{`await expect(page.locator('.box')).toHaveClass('box active');
await expect(page.locator('.box')).toHaveClass(/active/);`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Class varlığını string veya regex ile kontrol edebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 12 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 12</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div id="myDiv" data-value="123">İçerik</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Attribute Kontrolü:</div>
                            <pre><code>{`await expect(page.locator('#myDiv')).toHaveAttribute('data-value', '123');
const attrValue = await page.locator('#myDiv').getAttribute('data-value');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Herhangi bir HTML attribute'unu kontrol edebilir veya değerini alabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 13 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 13</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<ul>
  <li>Öğe 1</li>
  <li>Öğe 2</li>
  <li>Öğe 3</li>
</ul>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Element Sayısı:</div>
                            <pre><code>{`await expect(page.locator('li')).toHaveCount(3);
const count = await page.locator('li').count();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Bulunan element sayısını kontrol edebilir veya alabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 14 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 14</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<a href="https://example.com">Link</a>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - URL Kontrolü:</div>
                            <pre><code>{`await expect(page.getByRole('link')).toHaveAttribute('href', 'https://example.com');
await page.getByRole('link').click();
await expect(page).toHaveURL('https://example.com');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Link href'ini ve sayfa URL'ini kolayca kontrol edebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 15 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 15</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<button id="delayed">Yavaş Yüklenen Buton</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Otomatik Bekleme:</div>
                            <pre><code>{`// Playwright otomatik bekler, ekstra wait gerekmez
await page.locator('#delayed').click();

// Manuel bekleme gerekirse:
await page.locator('#delayed').waitFor({ state: 'visible' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Playwright elementlerin hazır olmasını otomatik bekler!
                        </div>
                    </div>

                    {/* Playwright Örnek 16 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 16</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div>
  <input placeholder="Ara..." />
  <button>Gönder</button>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Zincirleme Locator:</div>
                            <pre><code>{`const searchBox = page
  .locator('div')
  .getByPlaceholder('Ara...');

const submitBtn = page
  .locator('div')
  .getByRole('button', { name: 'Gönder' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Locator'ları zincirleyerek daha spesifik seçimler yapabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 17 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 17</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<select id="country">
  <option value="tr">Türkiye</option>
  <option value="us">ABD</option>
</select>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Dropdown Seçimi:</div>
                            <pre><code>{`// Label ile seçim
await page.locator('#country').selectOption('Türkiye');

// Value ile seçim
await page.locator('#country').selectOption({ value: 'tr' });

// Index ile seçim
await page.locator('#country').selectOption({ index: 0 });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Dropdown'dan 3 farklı şekilde seçim yapabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 18 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 18</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<iframe src="content.html">
  <button>İçerideki Buton</button>
</iframe>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Frame İçi Element:</div>
                            <pre><code>{`const frame = page.frameLocator('iframe');
await frame.getByRole('button', { name: 'İçerideki Buton' }).click();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> frameLocator ile iframe içindeki elementlere kolayca erişebilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 19 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 19</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<div>
  <p>Başlık</p>
  <p>İçerik</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Tüm Elementleri Alma:</div>
                            <pre><code>{`const paragraphs = await page.locator('p').all();

for (const p of paragraphs) {
  const text = await p.textContent();
  console.log(text);
}`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> all() metodu ile tüm elementleri array olarak alıp loop yapabilirsiniz.
                        </div>
                    </div>

                    {/* Playwright Örnek 20 */}
                    <div className="example-card">
                        <span className="example-number">Playwright Örnek 20</span>
                        <div className="html-section">
                            <div className="html-title">📝 HTML Kodu:</div>
                            <pre><code>{`<button>Dosya Yükle</button>
<input type="file" style="display:none" />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">🎭 Playwright - Dosya Yükleme:</div>
                            <pre><code>{`// Dosya input'unu bul
const fileInput = page.locator('input[type="file"]');

// Dosya yükle (görünmez olsa bile çalışır)
await fileInput.setInputFiles('path/to/file.pdf');

// Birden fazla dosya yükleme
await fileInput.setInputFiles([
  'file1.pdf',
  'file2.pdf'
]);`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>💡 İpucu:</strong> Gizli file input'lara bile dosya yükleyebilirsiniz.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocatorGuide;
