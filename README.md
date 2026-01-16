# 🧪 Automation Testing Playground

A comprehensive, modern single-page web application designed as a practice playground for automation testers using **Selenium**, **Cypress**, and **Playwright**.

## 🎯 Features

This playground includes various UI components and complex scenarios to challenge different automation framework capabilities:

### 📝 Basic Elements
- **Input Fields**: Text, email, number, and password inputs
- **Checkboxes**: Single and multiple selection
- **Radio Buttons**: Experience level selection
- **Dropdowns**: Static and dynamic (loaded after delay)

### 🎯 Complex Interactions
- **Drag and Drop**: Move items between two zones
- **Hover Menus**: Multi-level navigation with nested items
- **Modals**: Alert, Confirm, Prompt, and custom HTML modals
- **Iframe**: Embedded form for iframe interaction practice

### 🚀 Advanced Scenarios
- **Shadow DOM**: Custom web component with shadow root for testing deep selectors
- **Dynamic Content**: Elements that appear after random delay (3-6 seconds) for explicit wait testing
- **Infinite Scroll**: Auto-loading list for scroll interaction practice
- **File Upload/Download**: Practice file system interactions
- **Sortable Table**: Click headers to sort data

### 📊 Data Table
- **Sortable**: Click any column header to sort ascending/descending
- **Searchable**: Real-time filtering across all fields
- **Paginated**: 5 items per page with navigation controls
- Perfect for web scraping and data validation practice

### 🌐 API Simulation
- **Mock Login API** with multiple response scenarios:
  - `200 OK` - Successful login
  - `401 Unauthorized` - Invalid credentials
  - `404 Not Found` - User not found
  - `500 Internal Server Error` - Server error
- Practice API interception, mocking, and response validation

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd d:\ANTIGRAVITY\automationexercise
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - The application will automatically open at `http://localhost:5173`
   - If not, manually navigate to the URL shown in the terminal

### Build for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🧪 Testing with Automation Frameworks

### Unique Test IDs

Every interactive element has a unique `data-testid` or `id` attribute for easy selection:

```javascript
// Examples:
cy.get('[data-testid="text-input"]').type('Hello World')
await page.locator('[data-testid="drag-item-item-a"]').dragTo(page.locator('[data-testid="drop-zone-2"]'))
driver.find_element(By.CSS_SELECTOR, '[data-testid="api-success-button"]').click()
```

### Common Test Scenarios

#### 1. **Basic Form Interaction**
```javascript
// Cypress example
cy.get('[data-testid="text-input"]').type('Test User')
cy.get('[data-testid="email-input"]').type('test@example.com')
cy.get('[data-testid="single-checkbox"]').check()
cy.get('[data-testid="static-dropdown"]').select('us')
```

#### 2. **Explicit Waits (Dynamic Content)**
```javascript
// Wait for dynamic content to appear
cy.get('[data-testid="loading-indicator"]').should('be.visible')
cy.get('[data-testid="dynamic-content"]', { timeout: 10000 }).should('be.visible')
```

#### 3. **Shadow DOM Access**
```javascript
// Playwright example
await page.locator('shadow-component').evaluate(el => {
  return el.shadowRoot.querySelector('#shadow-button').click()
})
```

#### 4. **Infinite Scroll**
```javascript
// Scroll to bottom to trigger loading
cy.get('[data-testid="infinite-scroll-container"]').scrollTo('bottom')
cy.get('[data-testid="scroll-loading"]').should('be.visible')
cy.get('[data-testid="items-count"]').should('contain', '20')
```

#### 5. **API Interception**
```javascript
// Cypress API mocking
cy.intercept('POST', '/api/login', {
  statusCode: 200,
  body: { userId: 123, token: 'abc...' }
}).as('loginRequest')

cy.get('[data-testid="api-success-button"]').click()
cy.wait('@loginRequest')
cy.get('[data-testid="api-status-code"]').should('contain', '200')
```

#### 6. **Table Sorting and Search**
```javascript
// Sort table by name
cy.get('[data-testid="table-header-name"]').click()
// Search for specific user
cy.get('[data-testid="table-search-input"]').type('Alice')
cy.get('[data-testid="table-row-1"]').should('be.visible')
```

## 📁 Project Structure

```
automationexercise/
├── index.html                      # Main HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Main app with navigation
│   ├── index.css                   # Global styles
│   └── components/
│       ├── BasicElements.jsx       # Basic form elements
│       ├── ComplexInteractions.jsx # Drag-drop, modals, hover menus
│       ├── AdvancedScenarios.jsx   # Shadow DOM, infinite scroll, files
│       ├── DataTable.jsx           # Sortable, searchable table
│       └── APISimulation.jsx       # Mock API with status codes
```

## 🎨 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Web Components** - For Shadow DOM testing

## 💡 Tips for Automation Testers

1. **Inspect elements** to find `data-testid` attributes
2. **Use browser DevTools** to explore the Shadow DOM structure
3. **Monitor Network tab** when testing API simulation
4. **Practice different waiting strategies** with dynamic content
5. **Test edge cases** like empty search results, last page navigation, etc.
6. **Experiment with different locator strategies**:
   - CSS Selectors: `[data-testid="element-id"]`
   - XPath: `//button[@data-testid="submit-button"]`
   - Text content: `cy.contains('Click Me')`

## 📝 License

This project is created for educational purposes. Feel free to use it for learning and practicing test automation!

## 🤝 Contributing

This is a practice playground. Feel free to fork and customize it for your specific testing needs!

---

**Happy Testing! 🚀**
