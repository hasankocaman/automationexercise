// Shared locator-explorer block for Selenium, Playwright, Cypress pages.
// HTML uses [[strategyKey|displayText]] markers — LocatorExplorerBlock parses them.
// The same HTML example is used in all three tool pages so students learn one HTML → many tools.

export const LOCATOR_EXPLORER_BLOCK = {
  type: 'locator-explorer',
  titleTr: "HTML'i Oku → Locator'ı Türet",
  titleEn: 'Read HTML → Derive the Locator',
  html: {
    tr: `<div [[id|id="checkout"]] [[class|class="checkout-form"]]>

  <h2 [[class|class="section-title"]]>Teslimat Bilgileri</h2>

  <input
    [[id|id="fullName"]]
    [[name|name="fullName"]]
    [[class|class="form-field"]]
    [[type|type="text"]]
    [[placeholder|placeholder="Ad Soyad"]]
    [[testid|data-testid="fullname-input"]] />

  <input
    [[id|id="email"]]
    [[name|name="email"]]
    [[class|class="form-field"]]
    [[type|type="email"]]
    [[placeholder|placeholder="E-posta adresi"]]
    [[testid|data-testid="email-input"]] />

  <button
    [[id|id="submitBtn"]]
    [[class|class="btn btn-primary"]]
    [[type|type="submit"]]
    [[testid|data-testid="submit-btn"]]>
    [[text|Siparişi Tamamla]]
  </button>

  <a [[href|href="/cart"]] [[class|class="back-link"]]>
    [[text|← Sepete Dön]]
  </a>

</div>`,
    en: `<div [[id|id="checkout"]] [[class|class="checkout-form"]]>

  <h2 [[class|class="section-title"]]>Delivery Information</h2>

  <input
    [[id|id="fullName"]]
    [[name|name="fullName"]]
    [[class|class="form-field"]]
    [[type|type="text"]]
    [[placeholder|placeholder="Full Name"]]
    [[testid|data-testid="fullname-input"]] />

  <input
    [[id|id="email"]]
    [[name|name="email"]]
    [[class|class="form-field"]]
    [[type|type="email"]]
    [[placeholder|placeholder="Email address"]]
    [[testid|data-testid="email-input"]] />

  <button
    [[id|id="submitBtn"]]
    [[class|class="btn btn-primary"]]
    [[type|type="submit"]]
    [[testid|data-testid="submit-btn"]]>
    [[text|Complete Order]]
  </button>

  <a [[href|href="/cart"]] [[class|class="back-link"]]>
    [[text|← Back to Cart]]
  </a>

</div>`,
  },
  locatorMap: {
    id: {
      noteTr: "HTML'deki id attribute'ünü hedefler. Tarayıcılar id aramasını optimize eder — sayfanın en hızlı locator'ıdır. Her id yalnızca bir element'te olmalıdır; tıpkı Java'da final sabit gibi benzersizdir.",
      noteEn: "Targets the id attribute in the HTML. Browsers optimize id lookups — the fastest locator on the page. Each id must exist on only one element; unique like a final constant in Java.",
      tipTr: '✅ HER ZAMAN ilk tercih. id yoksa geliştirici ekibinden eklemesini iste.',
      tipEn: '✅ ALWAYS your first choice. If no id, ask the dev team to add one.',
      selenium: {
        tr: `// HTML'de id="email" görüyorsun → By.id("email") yazıyorsun
WebElement emailInput = driver.findElement(By.id("email"));
emailInput.sendKeys("test@ornek.com");

// HTML'de id="submitBtn" → By.id("submitBtn")
WebElement btn = driver.findElement(By.id("submitBtn"));
btn.click();`,
        en: `// You see id="email" in HTML → you write By.id("email")
WebElement emailInput = driver.findElement(By.id("email"));
emailInput.sendKeys("test@example.com");

// You see id="submitBtn" → By.id("submitBtn")
WebElement btn = driver.findElement(By.id("submitBtn"));
btn.click();`,
      },
      playwright: {
        tr: `// HTML'de id="email" → CSS seçici #email (# = id demek)
await page.locator('#email').fill('test@ornek.com');

// veya page.getById() yoktur — CSS # notasyonu kullanılır
await page.locator('#submitBtn').click();`,
        en: `// You see id="email" in HTML → CSS selector #email (# means id)
await page.locator('#email').fill('test@example.com');

// There is no page.getById() — use CSS # notation
await page.locator('#submitBtn').click();`,
      },
      cypress: {
        tr: `// HTML'de id="email" → cy.get('#email')  (# = id demek)
cy.get('#email').type('test@ornek.com');

// HTML'de id="submitBtn" → cy.get('#submitBtn')
cy.get('#submitBtn').click();`,
        en: `// You see id="email" in HTML → cy.get('#email')  (# means id)
cy.get('#email').type('test@example.com');

// You see id="submitBtn" → cy.get('#submitBtn')
cy.get('#submitBtn').click();`,
      },
    },

    testid: {
      noteTr: "data-testid özellikle QA/test için geliştiricilerin eklediği attribute'dür. id veya class değişse bile test kırılmaz — test dışında hiç kullanılmaz, bu yüzden en kararlı locator'dır.",
      noteEn: "data-testid is an attribute developers add specifically for QA. Tests don't break even if id or class changes — it's never used outside tests, making it the most stable locator.",
      tipTr: "✅ EN İYİ PRATİK: data-testid varsa id'den bile önce tercih et. Takımdan her test edilebilir elemente eklenmesini iste.",
      tipEn: '✅ BEST PRACTICE: If data-testid exists, prefer it even over id. Ask the team to add it to every testable element.',
      selenium: {
        tr: `// HTML'de data-testid="email-input" görüyorsun
// → CSS attribute seçici: [data-testid='email-input']
WebElement el = driver.findElement(
    By.cssSelector("[data-testid='email-input']")
);
el.sendKeys("test@ornek.com");

// data-testid="submit-btn"
driver.findElement(By.cssSelector("[data-testid='submit-btn']")).click();`,
        en: `// You see data-testid="email-input" in HTML
// → CSS attribute selector: [data-testid='email-input']
WebElement el = driver.findElement(
    By.cssSelector("[data-testid='email-input']")
);
el.sendKeys("test@example.com");

// data-testid="submit-btn"
driver.findElement(By.cssSelector("[data-testid='submit-btn']")).click();`,
      },
      playwright: {
        tr: `// HTML'de data-testid="email-input" → page.getByTestId() doğrudan destekler!
await page.getByTestId('email-input').fill('test@ornek.com');

// veya CSS attribute seçici ile:
await page.locator("[data-testid='submit-btn']").click();`,
        en: `// You see data-testid="email-input" → page.getByTestId() supports it directly!
await page.getByTestId('email-input').fill('test@example.com');

// Or with CSS attribute selector:
await page.locator("[data-testid='submit-btn']").click();`,
      },
      cypress: {
        tr: `// HTML'de data-testid="email-input" → cy.get('[data-testid=...]')
cy.get('[data-testid="email-input"]').type('test@ornek.com');

// data-testid="submit-btn"
cy.get('[data-testid="submit-btn"]').click();`,
        en: `// You see data-testid="email-input" → cy.get('[data-testid=...]')
cy.get('[data-testid="email-input"]').type('test@example.com');

// data-testid="submit-btn"
cy.get('[data-testid="submit-btn"]').click();`,
      },
    },

    name: {
      noteTr: "Form elementlerinin name attribute'ünü hedefler. Bu name, form submit olduğunda backend'e POST edilen alandır — Java'da HTTP parametre adı gibi düşün. id yoksa form alanlarında 2. seçenek.",
      noteEn: "Targets the name attribute of form elements. This name is the field sent to the backend on form submit — think of it as an HTTP parameter name in Java. Second choice for form fields when no id.",
      tipTr: '✅ id yoksa form input/select/textarea için kullan. Aynı sayfada aynı name\'den birden fazla olabileceğini unutma.',
      tipEn: '✅ Use for form input/select/textarea when no id. Remember the same name may appear on multiple elements.',
      selenium: {
        tr: `// HTML'de name="email" görüyorsun → By.name("email")
WebElement el = driver.findElement(By.name("email"));
el.sendKeys("test@ornek.com");

// name="fullName"
WebElement nameEl = driver.findElement(By.name("fullName"));
nameEl.sendKeys("Ahmet Yılmaz");`,
        en: `// You see name="email" in HTML → By.name("email")
WebElement el = driver.findElement(By.name("email"));
el.sendKeys("test@example.com");

// name="fullName"
WebElement nameEl = driver.findElement(By.name("fullName"));
nameEl.sendKeys("John Doe");`,
      },
      playwright: {
        tr: `// HTML'de name="email" → CSS attribute seçici [name="email"]
await page.locator('[name="email"]').fill('test@ornek.com');

// name="fullName"
await page.locator('[name="fullName"]').fill('Ahmet Yılmaz');`,
        en: `// You see name="email" → CSS attribute selector [name="email"]
await page.locator('[name="email"]').fill('test@example.com');

// name="fullName"
await page.locator('[name="fullName"]').fill('John Doe');`,
      },
      cypress: {
        tr: `// HTML'de name="email" → cy.get('[name="email"]')
cy.get('[name="email"]').type('test@ornek.com');

// name="fullName"
cy.get('[name="fullName"]').type('Ahmet Yılmaz');`,
        en: `// You see name="email" → cy.get('[name="email"]')
cy.get('[name="email"]').type('test@example.com');

// name="fullName"
cy.get('[name="fullName"]').type('John Doe');`,
      },
    },

    class: {
      noteTr: "CSS class adını hedefler. DİKKAT: bu HTML'de 'form-field' class'ı 2 farklı input'ta var. Locator her iki elementi de eşleştirir — hangisini istediğin belirsizleşir!",
      noteEn: "Targets the CSS class name. WARNING: in this HTML 'form-field' class exists on 2 different inputs. The locator matches both — which one you want becomes ambiguous!",
      warningTr: "'form-field' bu HTML'de 2 element'te var. driver.findElements() 2 element döndürür, hangisi hangisi bilinmez. Class'a dayalı locator kırılgandır — mümkünse id veya data-testid kullan.",
      warningEn: "'form-field' exists on 2 elements in this HTML. driver.findElements() returns 2 elements — which is which is unknown. Class-based locators are fragile — use id or data-testid when possible.",
      selenium: {
        tr: `// HTML'de class="form-field" → ama DİKKAT: birden fazla eşleşir!
List<WebElement> els = driver.findElements(By.className("form-field"));
// → els.size() == 2 (hem fullName hem email input'u!)
WebElement first = els.get(0); // hangisi? belirsiz!

// Daha güvenli: class'ı başka attribute ile kombine et
WebElement emailEl = driver.findElement(
    By.cssSelector("input[type='email'].form-field")
); // sadece email input'u eşleşir`,
        en: `// You see class="form-field" → but WARNING: matches multiple!
List<WebElement> els = driver.findElements(By.className("form-field"));
// → els.size() == 2 (both fullName AND email input!)
WebElement first = els.get(0); // which one? ambiguous!

// Safer: combine class with another attribute
WebElement emailEl = driver.findElement(
    By.cssSelector("input[type='email'].form-field")
); // only the email input matches`,
      },
      playwright: {
        tr: `// HTML'de class="form-field" → birden fazla eşleşir!
await page.locator('.form-field').count(); // → 2

// Spesifik ol: type attribute'ü ile kombine et
await page.locator("input[type='email'].form-field").fill('test@ornek.com');`,
        en: `// You see class="form-field" → matches multiple!
await page.locator('.form-field').count(); // → 2

// Be specific: combine with type attribute
await page.locator("input[type='email'].form-field").fill('test@example.com');`,
      },
      cypress: {
        tr: `// HTML'de class="form-field" → 2 element eşleşir!
cy.get('.form-field') // → 2 element döner
  .first()           // ilkini al — riskli!
  .type('değer');

// Spesifik ol:
cy.get('input[type=email].form-field').type('test@ornek.com');`,
        en: `// You see class="form-field" → 2 elements match!
cy.get('.form-field') // → returns 2 elements
  .first()           // take the first — risky!
  .type('value');

// Be specific:
cy.get('input[type=email].form-field').type('test@example.com');`,
      },
    },

    type: {
      noteTr: "HTML input'larının type attribute'ünü hedefler. type='email' makul ölçüde spesifik, ancak type='text' sayfada onlarca elementi eşleştirebilir. Tek başına zayıf — mutlaka başka attribute ile kombine et.",
      noteEn: "Targets the type attribute of HTML inputs. type='email' is reasonably specific, but type='text' may match dozens of elements on the page. Weak alone — always combine with another attribute.",
      selenium: {
        tr: `// HTML'de type="email" → CSS attribute seçici
WebElement el = driver.findElement(
    By.cssSelector("input[type='email']")
); // sayfada tek email input varsa güvenli

// type="submit" olan buton
WebElement btn = driver.findElement(
    By.cssSelector("button[type='submit']")
);`,
        en: `// You see type="email" → CSS attribute selector
WebElement el = driver.findElement(
    By.cssSelector("input[type='email']")
); // safe if only one email input on the page

// Button with type="submit"
WebElement btn = driver.findElement(
    By.cssSelector("button[type='submit']")
);`,
      },
      playwright: {
        tr: `// HTML'de type="email"
await page.locator("input[type='email']").fill('test@ornek.com');

// type="submit" butonu
await page.locator("button[type='submit']").click();`,
        en: `// You see type="email"
await page.locator("input[type='email']").fill('test@example.com');

// Button with type="submit"
await page.locator("button[type='submit']").click();`,
      },
      cypress: {
        tr: `// HTML'de type="email"
cy.get('input[type=email]').type('test@ornek.com');

// type="submit" butonu
cy.get('button[type=submit]').click();`,
        en: `// You see type="email"
cy.get('input[type=email]').type('test@example.com');

// Button with type="submit"
cy.get('button[type=submit]').click();`,
      },
    },

    placeholder: {
      noteTr: "Input'un placeholder metnini hedefler. KARARSIZ locator — tasarım değişince, dil değişince (TR→EN gibi) placeholder da değişir ve test kırılır. Son çare olarak kullan.",
      noteEn: "Targets the placeholder text of an input. UNSTABLE locator — if design changes or language switches (TR→EN), placeholder changes and the test breaks. Use as last resort.",
      warningTr: 'i18n (çok dil) projelerde placeholder TR/EN arasında değişir. Mümkünse id veya data-testid kullan.',
      warningEn: 'In i18n (multi-language) projects placeholder changes between TR/EN. Use id or data-testid when possible.',
      selenium: {
        tr: `// HTML'de placeholder="E-posta adresi"
WebElement el = driver.findElement(
    By.cssSelector("input[placeholder='E-posta adresi']")
);
el.sendKeys("test@ornek.com");`,
        en: `// You see placeholder="Email address"
WebElement el = driver.findElement(
    By.cssSelector("input[placeholder='Email address']")
);
el.sendKeys("test@example.com");`,
      },
      playwright: {
        tr: `// HTML'de placeholder="E-posta adresi"
// Playwright'ın özel metodu — daha okunabilir!
await page.getByPlaceholder('E-posta adresi').fill('test@ornek.com');`,
        en: `// You see placeholder="Email address"
// Playwright's dedicated method — more readable!
await page.getByPlaceholder('Email address').fill('test@example.com');`,
      },
      cypress: {
        tr: `// HTML'de placeholder="E-posta adresi"
cy.get('input[placeholder="E-posta adresi"]').type('test@ornek.com');`,
        en: `// You see placeholder="Email address"
cy.get('input[placeholder="Email address"]').type('test@example.com');`,
      },
    },

    text: {
      noteTr: "Element'in görünen metin içeriğini hedefler. Butonlar ve linkler için çok kullanışlı — kullanıcının gördüğü şeyle test yazılır. DİKKAT: i18n varsa metin TR/EN değişir ve test kırılır!",
      noteEn: "Targets the visible text content of an element. Very useful for buttons and links — tests are written with what the user sees. WARNING: in i18n projects text changes TR/EN and breaks the test!",
      warningTr: "'Siparişi Tamamla' → 'Complete Order' değişirse locator kırılır. i18n projelerde data-testid tercih et.',",
      warningEn: "If 'Complete Order' → 'Finalize' changes, the locator breaks. Prefer data-testid in i18n projects.",
      selenium: {
        tr: `// Buton görünen metni: "Siparişi Tamamla"
// → XPath text() fonksiyonu kullanılır
WebElement btn = driver.findElement(
    By.xpath("//button[text()='Siparişi Tamamla']")
);
btn.click();

// Link metni: "← Sepete Dön"
WebElement link = driver.findElement(
    By.linkText("← Sepete Dön")
);
link.click();`,
        en: `// Button visible text: "Complete Order"
// → Use XPath text() function
WebElement btn = driver.findElement(
    By.xpath("//button[text()='Complete Order']")
);
btn.click();

// Link text: "← Back to Cart"
WebElement link = driver.findElement(
    By.linkText("← Back to Cart")
);
link.click();`,
      },
      playwright: {
        tr: `// Buton görünen metni: "Siparişi Tamamla"
// → Playwright'ın semantik metodu — çok daha temiz!
await page.getByText('Siparişi Tamamla').click();

// veya rol+isim kombinasyonu (daha sağlam):
await page.getByRole('button', { name: 'Siparişi Tamamla' }).click();

// Link:
await page.getByRole('link', { name: '← Sepete Dön' }).click();`,
        en: `// Button visible text: "Complete Order"
// → Playwright's semantic method — much cleaner!
await page.getByText('Complete Order').click();

// Or role+name combination (more robust):
await page.getByRole('button', { name: 'Complete Order' }).click();

// Link:
await page.getByRole('link', { name: '← Back to Cart' }).click();`,
      },
      cypress: {
        tr: `// Buton görünen metni: "Siparişi Tamamla"
cy.contains('Siparişi Tamamla').click();

// Belirli tag içinde ara: "button içinde bu metin"
cy.contains('button', 'Siparişi Tamamla').click();

// Link:
cy.contains('a', '← Sepete Dön').click();`,
        en: `// Button visible text: "Complete Order"
cy.contains('Complete Order').click();

// Search within a specific tag
cy.contains('button', 'Complete Order').click();

// Link:
cy.contains('a', '← Back to Cart').click();`,
      },
    },

    href: {
      noteTr: "Link elementlerinin href attribute'ünü hedefler. Spesifik ama URL değişince kırılır. Dinamik URL'ler için kısmi eşleşme (attribute*=) kullan.",
      noteEn: "Targets the href attribute of link elements. Specific but breaks when URL changes. Use partial match (attribute*=) for dynamic URLs.",
      selenium: {
        tr: `// HTML'de href="/cart"
WebElement link = driver.findElement(
    By.cssSelector("a[href='/cart']")
);
link.click();

// URL dinamikse kısmi eşleşme:
// a[href*='cart'] → href içinde 'cart' geçen tüm linkler
WebElement link2 = driver.findElement(
    By.cssSelector("a[href*='cart']")
);`,
        en: `// You see href="/cart"
WebElement link = driver.findElement(
    By.cssSelector("a[href='/cart']")
);
link.click();

// If URL is dynamic, use partial match:
// a[href*='cart'] → all links whose href contains 'cart'
WebElement link2 = driver.findElement(
    By.cssSelector("a[href*='cart']")
);`,
      },
      playwright: {
        tr: `// HTML'de href="/cart"
await page.locator("a[href='/cart']").click();

// Kısmi eşleşme:
await page.locator("a[href*='cart']").click();`,
        en: `// You see href="/cart"
await page.locator("a[href='/cart']").click();

// Partial match:
await page.locator("a[href*='cart']").click();`,
      },
      cypress: {
        tr: `// HTML'de href="/cart"
cy.get('a[href="/cart"]').click();

// Kısmi eşleşme:
cy.get('a[href*="cart"]').click();`,
        en: `// You see href="/cart"
cy.get('a[href="/cart"]').click();

// Partial match:
cy.get('a[href*="cart"]').click();`,
      },
    },
  },
}
