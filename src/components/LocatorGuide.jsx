import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LocatorGuide.css';
import './LocatorGuideDark.css';

const LocatorGuide = ({ darkMode }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('comparison');

    return (
        <div className={`locator-guide-container ${darkMode ? 'dark-mode' : ''}`}>
            <header>
                <h1>{t('locator.title')}</h1>
                <p className="subtitle">{t('locator.subtitle')}</p>
            </header>

            <div className="nav-tabs">
                <button
                    className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comparison')}
                >
                    {t('locator.tabs.comparison')}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'playwright-only' ? 'active' : ''}`}
                    onClick={() => setActiveTab('playwright-only')}
                >
                    {t('locator.tabs.playwrightOnly')}
                </button>
            </div>

            {activeTab === 'comparison' && (
                <div id="comparison" className="content-section active">
                    {/* {t('locator.headers.example')} 1 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 1</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;input type="text" id="username" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement element = driver
  .findElement(By.id("username"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const element = page
  .locator('#username');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp1')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 2 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 2</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;button class="btn-primary"&gt;Submit&lt;/button&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement button = driver
  .findElement(By.className("btn-primary"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const button = page
  .locator('.btn-primary');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp2')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 3 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 3</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;input name="email" type="email" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement email = driver
  .findElement(By.name("email"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const email = page
  .locator('[name="email"]');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp3')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 4 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 4</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;a href="/home"&gt;Home&lt;/a&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement link = driver
  .findElement(By.linkText("Home"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const link = page
  .getByRole('link', { name: 'Home' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp4')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 5 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 5</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;button&gt;Save&lt;/button&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement btn = driver
  .findElement(By.xpath("//button[text()='Save']"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const btn = page
  .getByRole('button', { name: 'Save' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp5')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 6 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 6</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div class="container">
  <p>Hello World</p>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement text = driver
  .findElement(By.cssSelector(".container p"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const text = page
  .locator('.container p');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp6')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 7 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 7</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;input type="text" placeholder="Enter your name" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement input = driver.findElement(
  By.cssSelector("[placeholder='Enter your name']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const input = page
  .getByPlaceholder('Enter your name');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp7')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 8 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 8</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<label>Email:</label>
<input type="email" />`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement input = driver.findElement(
  By.xpath("//label[text()='Email:']/following-sibling::input")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const input = page
  .getByLabel('Email:');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp8')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 9 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 9</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;h1&gt;Welcome&lt;/h1&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement heading = driver
  .findElement(By.tagName("h1"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const heading = page
  .getByRole('heading', { name: 'Welcome' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp9')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 10 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 10</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;div data-testid="user-profile"&gt;Profile&lt;/div&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement profile = driver.findElement(
  By.cssSelector("[data-testid='user-profile']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const profile = page
  .getByTestId('user-profile');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp10')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 11 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 11</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<ul>
  <li>Apple</li>
  <li>Pear</li>
</ul>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`List<WebElement> items = driver
  .findElements(By.tagName("li"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const items = page
  .locator('li');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp11')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 12 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 12</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;p&gt;Total: 150 USD&lt;/p&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement price = driver.findElement(
  By.xpath("//p[contains(text(),'Total')]")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const price = page
  .getByText('Total:', { exact: false });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp12')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 13 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 13</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;img src="logo.png" alt="Company Logo" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement logo = driver.findElement(
  By.cssSelector("[alt='Company Logo']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const logo = page
  .getByAltText('Company Logo');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp13')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 14 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 14</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div id="main">
  <button>Click</button>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement parent = driver.findElement(By.id("main"));
WebElement button = parent.findElement(By.tagName("button"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const button = page
  .locator('#main button');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp14')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 15 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 15</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>&lt;input type="checkbox" id="terms" /&gt;</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement checkbox = driver
  .findElement(By.id("terms"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const checkbox = page
  .getByRole('checkbox');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp15')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 16 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 16</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<select id="country">
  <option>Turkey</option>
</select>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement select = driver
  .findElement(By.id("country"));`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const select = page
  .locator('#country');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp16')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 17 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 17</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<table>
  <tr>
    <td>Alice</td>
  </tr>
</table>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement cell = driver.findElement(
  By.xpath("//table/tr/td")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const cell = page
  .locator('table tr td');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp17')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 18 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 18</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div title="Helpful Tooltip">?</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement help = driver.findElement(
  By.cssSelector("[title='Helpful Tooltip']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const help = page
  .getByTitle('Helpful Tooltip');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp18')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 19 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 19</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<form>
  <input type="text" />
  <button type="submit">Submit</button>
</form>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement form = driver.findElement(By.tagName("form"));
WebElement submit = form.findElement(
  By.cssSelector("[type='submit']")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const submit = page
  .locator('form')
  .getByRole('button', { name: 'Submit' });`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp19')}
                        </div>
                    </div>

                    {/* {t('locator.headers.example')} 20 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.example')} 20</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div class="card active">
  <span>Active Card</span>
</div>`}</code></pre>
                        </div>
                        <div className="code-comparison">
                            <div className="code-block">
                                <div className="code-header selenium-header">{t('locator.headers.selenium')}</div>
                                <div className="code-content">
                                    <pre><code>{`WebElement card = driver.findElement(
  By.cssSelector(".card.active span")
);`}</code></pre>
                                </div>
                            </div>
                            <div className="code-block">
                                <div className="code-header playwright-header">{t('locator.headers.playwright')}</div>
                                <div className="code-content">
                                    <pre><code>{`const card = page
  .locator('.card.active span');`}</code></pre>
                                </div>
                            </div>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.comp20')}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'playwright-only' && (
                <div id="playwright-only" className="content-section active">
                    <div className="playwright-only">
                        {t('locator.headers.playwrightOnlyFeatures')}
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 1 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 1</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<button>Save</button>
<button>Cancel</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.firstElement')}</div>
                            <pre><code>{`const firstButton = page.locator('button').first();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw1')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 2 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 2</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<ul>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ul>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.lastElement')}</div>
                            <pre><code>{`const lastItem = page.locator('li').last();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw2')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 3 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 3</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.nthElement')}</div>
                            <pre><code>{`const secondItem = page.locator('.item').nth(1); // starts from 0`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw3')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 4 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 4</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div>
  <p>Inactive text</p>
  <p class="active">Active text</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.filtering')}</div>
                            <pre><code>{`const activeParagraph = page
  .locator('p')
  .filter({ hasText: 'Active' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw4')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 5 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 5</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<article>
  <h2>Title</h2>
  <button>Read</button>
</article>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.hasElement')}</div>
                            <pre><code>{`const article = page
  .locator('article')
  .filter({ has: page.locator('button') });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw5')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 6 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 6</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div class="container">
  <p>Test text</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.visibility')}</div>
                            <pre><code>{`await expect(page.locator('.container')).toBeVisible();
await expect(page.locator('.container')).toBeHidden();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw6')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 7 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 7</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<button disabled>Submit</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.stateCheck')}</div>
                            <pre><code>{`await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('button')).toBeEnabled();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw7')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 8 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 8</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<input type="checkbox" checked />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.checkboxCheck')}</div>
                            <pre><code>{`await expect(page.getByRole('checkbox')).toBeChecked();
await page.getByRole('checkbox').check();
await page.getByRole('checkbox').uncheck();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw8')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 9 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 9</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<p>Welcome!</p>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.textContent')}</div>
                            <pre><code>{`await expect(page.locator('p')).toHaveText('Welcome!');
await expect(page.locator('p')).toContainText('Wel');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw9')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 10 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 10</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<input type="text" value="Hello" />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.inputValue')}</div>
                            <pre><code>{`await expect(page.locator('input')).toHaveValue('Hello');
const value = await page.locator('input').inputValue();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw10')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 11 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 11</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div class="box active">Box</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.classCheck')}</div>
                            <pre><code>{`await expect(page.locator('.box')).toHaveClass('box active');
await expect(page.locator('.box')).toHaveClass(/active/);`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw11')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 12 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 12</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div id="myDiv" data-value="123">Content</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.attributeCheck')}</div>
                            <pre><code>{`await expect(page.locator('#myDiv')).toHaveAttribute('data-value', '123');
const attrValue = await page.locator('#myDiv').getAttribute('data-value');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw12')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 13 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 13</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.elementCount')}</div>
                            <pre><code>{`await expect(page.locator('li')).toHaveCount(3);
const count = await page.locator('li').count();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw13')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 14 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 14</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<a href="https://example.com">Link</a>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.urlCheck')}</div>
                            <pre><code>{`await expect(page.getByRole('link')).toHaveAttribute('href', 'https://example.com');
await page.getByRole('link').click();
await expect(page).toHaveURL('https://example.com');`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw14')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 15 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 15</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<button id="delayed">Slow Loading Button</button>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.autoWait')}</div>
                            <pre><code>{`// Playwright waits automatically; no extra wait needed
await page.locator('#delayed').click();

// If you need a manual wait:
await page.locator('#delayed').waitFor({ state: 'visible' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw15')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 16 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 16</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div>
  <input placeholder="Search..." />
  <button>Submit</button>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.chaining')}</div>
                            <pre><code>{`const searchBox = page
  .locator('div')
  .getByPlaceholder('Search...');

const submitBtn = page
  .locator('div')
  .getByRole('button', { name: 'Submit' });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw16')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 17 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 17</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<select id="country">
  <option value="tr">Turkey</option>
  <option value="us">USA</option>
</select>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.dropdownSelection')}</div>
                            <pre><code>{`// Select by label
await page.locator('#country').selectOption('Turkey');

// Select by value
await page.locator('#country').selectOption({ value: 'tr' });

// Select by index
await page.locator('#country').selectOption({ index: 0 });`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw17')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 18 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 18</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<iframe src="content.html">
  <button>Inner Button</button>
</iframe>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.frameElement')}</div>
                            <pre><code>{`const frame = page.frameLocator('iframe');
await frame.getByRole('button', { name: 'Inner Button' }).click();`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw18')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 19 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 19</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<div>
  <p>Title</p>
  <p>Content</p>
</div>`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.allElements')}</div>
                            <pre><code>{`const paragraphs = await page.locator('p').all();

for (const p of paragraphs) {
  const text = await p.textContent();
  console.log(text);
}`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw19')}
                        </div>
                    </div>

                    {/* {t('locator.headers.playwrightExample')} 20 */}
                    <div className="example-card">
                        <span className="example-number">{t('locator.headers.playwrightExample')} 20</span>
                        <div className="html-section">
                            <div className="html-title">{t('locator.headers.html')}</div>
                            <pre><code>{`<button>Upload File</button>
<input type="file" style="display:none" />`}</code></pre>
                        </div>
                        <div className="html-section">
                            <div className="html-title">{t('locator.actions.fileUpload')}</div>
                            <pre><code>{`// Find the file input
const fileInput = page.locator('input[type="file"]');

// Upload a file (works even if the input is hidden)
await fileInput.setInputFiles('path/to/file.pdf');

// Upload multiple files
await fileInput.setInputFiles([
  'file1.pdf',
  'file2.pdf'
]);`}</code></pre>
                        </div>
                        <div className="tip-box">
                            <strong>{t('locator.tips.prefix')}</strong> {t('locator.tips.pw20')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocatorGuide;
