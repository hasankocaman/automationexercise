export const pythonData = {
  en: {
    hero: {
      title: "Python for Test Automation",
      subtitle: "From Zero to Automation Engineer",
      intro:
        "Python is the most popular language for test automation in 2024. Its clean syntax, rich ecosystem, and massive community make it the go-to choice for QA engineers worldwide. Whether you're automating web UIs, testing REST APIs, or building full CI/CD pipelines — Python has you covered.",
    },
    tabs: [
      "🎯 Introduction",
      "📦 Installation",
      "📚 Intermediate",
      "🚀 Advanced",
      "💼 Interview Q&A",
    ],
    sections: [
      {
        title: "Why Python for Test Automation?",
        blocks: [
          {
            type: "text",
            content:
              "Python has become the dominant language for test automation for good reasons. Its readable syntax means test code reads almost like plain English, making it easy for the whole team — including non-developers — to understand what a test does. The ecosystem is unmatched: pytest, Selenium, Playwright, Requests, Appium, and dozens more battle-tested libraries are just a pip install away.",
          },
          {
            type: "heading",
            content: "Python vs Java vs JavaScript for Automation",
          },
          {
            type: "table",
            headers: ["Feature", "Python", "Java", "JavaScript"],
            rows: [
              ["Learning curve", "Very Low", "High", "Medium"],
              ["Syntax readability", "Excellent", "Verbose", "Good"],
              ["Test framework", "pytest", "JUnit / TestNG", "Jest / Mocha"],
              ["Web automation", "Selenium, Playwright", "Selenium", "Playwright, Cypress"],
              ["API testing", "requests, httpx", "RestAssured", "Axios, Supertest"],
              ["Mobile automation", "Appium", "Appium", "WebdriverIO"],
              ["CI/CD integration", "Excellent", "Excellent", "Excellent"],
              ["Community (QA)", "Largest", "Large", "Growing"],
              ["Script execution speed", "Fast (for tests)", "Faster", "Fast"],
            ],
          },
          {
            type: "tip",
            content:
              "For most QA engineers starting from scratch, Python is the best investment. The time from 'zero knowledge' to writing real tests is dramatically shorter than with Java.",
          },
          {
            type: "heading",
            content: "The Python Test Automation Ecosystem",
          },
          {
            type: "grid",
            cols: 3,
            items: [
              { icon: "🧪", label: "pytest", desc: "The gold standard test framework. Fixtures, parametrize, plugins, hooks — everything you need." },
              { icon: "🌐", label: "Selenium", desc: "The classic browser automation library. Supports Chrome, Firefox, Edge, Safari via WebDriver." },
              { icon: "🎭", label: "Playwright", desc: "Microsoft's modern browser automation tool. Faster, more reliable, auto-waits built in." },
              { icon: "📡", label: "Requests", desc: "The most popular HTTP library for Python. Elegant API for GET, POST, PUT, DELETE calls." },
              { icon: "📱", label: "Appium", desc: "Mobile test automation for iOS and Android. Works with Python just like Selenium." },
              { icon: "📊", label: "Allure", desc: "Beautiful test reporting with steps, screenshots, and history tracking." },
              { icon: "⚡", label: "pytest-xdist", desc: "Run tests in parallel across multiple CPU cores or machines. 4x faster test suites." },
              { icon: "🔧", label: "python-dotenv", desc: "Load environment variables from .env files. Keep secrets out of your code." },
              { icon: "✅", label: "jsonschema", desc: "Validate API response structure. Ensure your API contracts never break." },
            ],
          },
          {
            type: "heading",
            content: "Real-World Use Cases",
          },
          {
            type: "list",
            icon: "✅",
            items: [
              { label: "UI Automation", desc: "Automate browser interactions — login flows, form submissions, checkout processes, multi-step user journeys." },
              { label: "API Testing", desc: "Validate REST APIs — status codes, response schemas, authentication, performance." },
              { label: "Data-Driven Testing", desc: "Run the same test with dozens of input combinations from CSV, Excel, JSON, or databases." },
              { label: "CI/CD Integration", desc: "Run tests on every code push with GitHub Actions, Jenkins, GitLab CI, or Azure Pipelines." },
              { label: "Performance Testing", desc: "Combine with Locust for load testing HTTP endpoints written in pure Python." },
              { label: "Mobile Testing", desc: "Automate Android and iOS apps with Appium and the same pytest framework." },
            ],
          },
          {
            type: "heading",
            content: "Automation Framework Comparison",
          },
          {
            type: "table",
            headers: ["Framework", "Type", "Best For", "Speed", "Learning Curve"],
            rows: [
              ["pytest + Selenium", "UI", "Traditional web automation", "Medium", "Low"],
              ["pytest + Playwright", "UI", "Modern web apps, SPA", "Fast", "Low"],
              ["pytest + Requests", "API", "REST API testing", "Very Fast", "Very Low"],
              ["Robot Framework", "UI/API", "Keyword-driven, non-coders", "Medium", "Very Low"],
              ["Cypress (JS)", "UI", "Frontend devs, component testing", "Fast", "Medium"],
              ["Behave (BDD)", "UI/API", "BDD / Gherkin syntax teams", "Medium", "Medium"],
            ],
          },
          {
            type: "info",
            content:
              "The most powerful combination for modern QA teams: pytest + Playwright for UI tests, pytest + Requests for API tests, Allure for reporting, and GitHub Actions for CI/CD.",
          },
        ],
      },
      {
        title: "Installing Python & Setting Up Your Environment",
        blocks: [
          {
            type: "heading",
            content: "Step 1: Install Python",
          },
          {
            type: "text",
            content:
              "Always download Python from the official website python.org. Choose Python 3.10 or newer. During installation on Windows, check the box 'Add Python to PATH' — this is critical.",
          },
          {
            type: "steps",
            items: [
              "Go to https://python.org/downloads and download the latest Python 3.x installer",
              "Run the installer — on Windows, tick 'Add Python to PATH' before clicking Install",
              "Open a terminal (PowerShell / Command Prompt / Terminal) and verify the installation",
              "You should see the Python version printed — e.g., Python 3.12.0",
            ],
          },
          {
            type: "code",
            language: "bash",
            content: `# Verify Python installation
python --version
# Python 3.12.0

# Verify pip (Python's package manager) is installed
pip --version
# pip 24.0 from ...`,
          },
          {
            type: "heading",
            content: "Step 2: Virtual Environments",
          },
          {
            type: "text",
            content:
              "A virtual environment is an isolated Python environment for your project. It prevents dependency conflicts between projects. Always create a virtual environment before installing any packages.",
          },
          {
            type: "code",
            language: "bash",
            content: `# Create a virtual environment named 'venv'
python -m venv venv

# Activate on Windows (PowerShell)
venv\\Scripts\\Activate.ps1

# Activate on Windows (Command Prompt)
venv\\Scripts\\activate.bat

# Activate on Mac/Linux
source venv/bin/activate

# You'll see (venv) in your terminal prompt — you're now inside
# (venv) PS C:\\myproject>

# Deactivate when done
deactivate`,
          },
          {
            type: "tip",
            content:
              "Always activate your virtual environment before running pip install or python commands. Add the 'venv/' folder to your .gitignore — never commit it to version control.",
          },
          {
            type: "heading",
            content: "Step 3: Install Core Testing Libraries",
          },
          {
            type: "code",
            language: "bash",
            content: `# Install pytest (test framework)
pip install pytest

# Install Selenium (browser automation)
pip install selenium

# Install Requests (HTTP/API testing)
pip install requests

# Install Playwright (modern browser automation)
pip install playwright
playwright install  # Downloads browser binaries

# Install all at once
pip install pytest selenium requests playwright pytest-playwright`,
          },
          {
            type: "heading",
            content: "Step 4: Managing Dependencies with requirements.txt",
          },
          {
            type: "code",
            language: "bash",
            content: `# Save all installed packages to requirements.txt
pip freeze > requirements.txt

# Install all packages from requirements.txt (on a new machine)
pip install -r requirements.txt`,
          },
          {
            type: "code",
            language: "text",
            content: `# requirements.txt example
pytest==8.2.0
selenium==4.21.0
requests==2.32.0
playwright==1.44.0
pytest-playwright==0.5.0
allure-pytest==2.13.5
pytest-xdist==3.5.0
python-dotenv==1.0.1
jsonschema==4.22.0`,
          },
          {
            type: "heading",
            content: "Step 5: Recommended IDEs",
          },
          {
            type: "grid",
            cols: 2,
            items: [
              { icon: "💙", label: "VS Code (Recommended)", desc: "Free, lightweight, powerful. Install the 'Python' extension by Microsoft and 'Pylance' for IntelliSense. Best for most QA engineers." },
              { icon: "🧠", label: "PyCharm Community", desc: "Free IDE by JetBrains built specifically for Python. Excellent pytest integration, built-in debugger, and refactoring tools." },
            ],
          },
          {
            type: "heading",
            content: "Step 6: Your First Python File",
          },
          {
            type: "code",
            language: "python",
            content: `# hello.py
name = "Automation Engineer"
print(f"Hello, {name}!")

# Run it:
# python hello.py
# Output: Hello, Automation Engineer!`,
          },
          {
            type: "heading",
            content: "Step 7: Your First pytest Test",
          },
          {
            type: "code",
            language: "python",
            content: `# test_first.py
def add(a, b):
    return a + b

def test_add():
    result = add(2, 3)
    assert result == 5

def test_add_negative():
    assert add(-1, -1) == -2`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Run tests
pytest test_first.py

# Run with verbose output
pytest test_first.py -v

# Output:
# test_first.py::test_add PASSED
# test_first.py::test_add_negative PASSED
# 2 passed in 0.12s`,
          },
          {
            type: "info",
            content:
              "pytest automatically discovers test files named test_*.py or *_test.py, and test functions that start with test_. No configuration needed for basic usage.",
          },
        ],
      },
      {
        title: "Intermediate: pytest, Selenium & Requests",
        blocks: [
          {
            type: "heading",
            content: "Python Basics for Automation",
          },
          {
            type: "subheading",
            content: "Variables, Data Types, and Collections",
          },
          {
            type: "code",
            language: "python",
            content: `# Variables and data types
username = "admin"          # str
password = "secret123"      # str
timeout = 30                # int
is_logged_in = False        # bool
base_url = "https://api.example.com"

# Lists — ordered, mutable
browsers = ["chrome", "firefox", "edge"]
browsers.append("safari")
first = browsers[0]        # "chrome"

# Dictionaries — key-value pairs
user = {
    "name": "Alice",
    "role": "tester",
    "active": True
}
print(user["name"])         # Alice
print(user.get("email", "N/A"))  # N/A (default if key missing)

# f-strings — string interpolation
url = f"{base_url}/users/{user['name']}"
print(url)  # https://api.example.com/users/Alice`,
          },
          {
            type: "subheading",
            content: "Control Flow and Loops",
          },
          {
            type: "code",
            language: "python",
            content: `# if/elif/else
status_code = 200
if status_code == 200:
    print("OK")
elif status_code == 404:
    print("Not Found")
else:
    print(f"Unexpected: {status_code}")

# for loop over a list
endpoints = ["/login", "/products", "/cart"]
for endpoint in endpoints:
    print(f"Testing: {base_url}{endpoint}")

# for loop with range
for i in range(5):
    print(f"Attempt {i + 1}")

# List comprehension (very Pythonic)
test_urls = [f"{base_url}{ep}" for ep in endpoints]`,
          },
          {
            type: "subheading",
            content: "Functions",
          },
          {
            type: "code",
            language: "python",
            content: `# Basic function
def get_full_url(base, path):
    return f"{base}{path}"

# Function with default parameter
def login(username, password, remember=False):
    print(f"Logging in as {username}, remember={remember}")

# Function with type hints (recommended)
def create_user(name: str, age: int) -> dict:
    return {"name": name, "age": age}

# Usage
url = get_full_url("https://example.com", "/login")
login("admin", "pass123")
login("admin", "pass123", remember=True)`,
          },
          {
            type: "heading",
            content: "pytest Fundamentals",
          },
          {
            type: "subheading",
            content: "Test Discovery Rules",
          },
          {
            type: "list",
            icon: "📁",
            items: [
              { label: "File names", desc: "Must match test_*.py or *_test.py patterns" },
              { label: "Function names", desc: "Must start with test_" },
              { label: "Class names", desc: "Must start with Test (and no __init__ method)" },
              { label: "Method names", desc: "Inside test classes, must start with test_" },
            ],
          },
          {
            type: "code",
            language: "python",
            content: `# test_calculator.py
class TestCalculator:
    def test_addition(self):
        assert 2 + 2 == 4

    def test_subtraction(self):
        assert 10 - 3 == 7

    def test_division_by_zero(self):
        import pytest
        with pytest.raises(ZeroDivisionError):
            result = 1 / 0`,
          },
          {
            type: "subheading",
            content: "pytest Fixtures",
          },
          {
            type: "text",
            content:
              "Fixtures are pytest's way of handling setup and teardown. They are functions that provide test data, set up connections, or configure the environment. Tests declare which fixtures they need as parameters.",
          },
          {
            type: "code",
            language: "python",
            content: `import pytest

# A simple fixture — provides test data
@pytest.fixture
def sample_user():
    return {"username": "testuser", "email": "test@example.com"}

# A fixture with teardown using yield
@pytest.fixture
def db_connection():
    # SETUP: runs before the test
    conn = create_db_connection()
    yield conn
    # TEARDOWN: runs after the test (even if test fails)
    conn.close()

# Test uses fixture by name in its parameters
def test_user_has_email(sample_user):
    assert "email" in sample_user
    assert sample_user["email"] == "test@example.com"

def test_db_query(db_connection):
    result = db_connection.query("SELECT 1")
    assert result is not None`,
          },
          {
            type: "subheading",
            content: "Fixture Scopes",
          },
          {
            type: "table",
            headers: ["Scope", "Runs Once Per...", "Use Case"],
            rows: [
              ["function (default)", "Each test function", "Fresh state per test — most common"],
              ["class", "Each test class", "Shared setup for a group of related tests"],
              ["module", "Each test file (.py)", "Shared DB/API connection per file"],
              ["session", "Entire test run", "Browser instance, heavy setup shared across all tests"],
            ],
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py — fixtures defined here are available to ALL tests
import pytest
from selenium import webdriver

@pytest.fixture(scope="session")
def browser():
    """Browser fixture — created once for entire test session"""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()  # Cleanup after ALL tests finish

@pytest.fixture(scope="function")
def logged_in_browser(browser):
    """Each test gets a fresh logged-in state"""
    browser.get("https://example.com/login")
    browser.find_element(By.ID, "username").send_keys("admin")
    browser.find_element(By.ID, "password").send_keys("pass")
    browser.find_element(By.ID, "submit").click()
    yield browser
    # Logout after each test
    browser.get("https://example.com/logout")`,
          },
          {
            type: "subheading",
            content: "Parametrize — Data-Driven Tests",
          },
          {
            type: "code",
            language: "python",
            content: `import pytest

# Run the same test with multiple inputs
@pytest.mark.parametrize("username, password, expected", [
    ("admin", "correct_pass", True),
    ("admin", "wrong_pass", False),
    ("", "any_pass", False),
    ("admin", "", False),
])
def test_login(username, password, expected):
    result = login(username, password)
    assert result == expected

# Parametrize with IDs for readable test names
@pytest.mark.parametrize("status_code", [200, 201, 204], ids=["ok", "created", "no-content"])
def test_success_codes(status_code):
    assert status_code < 300`,
          },
          {
            type: "heading",
            content: "Selenium Basics",
          },
          {
            type: "code",
            language: "python",
            content: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome WebDriver
driver = webdriver.Chrome()
driver.maximize_window()

# Navigate to a URL
driver.get("https://automationexercise.com")

# Find elements using different locators
# By.ID
search_box = driver.find_element(By.ID, "search_product")

# By.NAME
username_field = driver.find_element(By.NAME, "email")

# By.CSS_SELECTOR
submit_btn = driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']")

# By.XPATH
product_name = driver.find_element(By.XPATH, "//h2[@class='product-name']")

# By.CLASS_NAME
navbar = driver.find_element(By.CLASS_NAME, "navbar-nav")

# Interactions
search_box.send_keys("Blue Top")       # Type text
submit_btn.click()                      # Click
username_field.clear()                  # Clear field

# Get information
page_title = driver.title
current_url = driver.current_url
element_text = product_name.text
is_displayed = submit_btn.is_displayed()
is_enabled = submit_btn.is_enabled()

# Cleanup
driver.quit()`,
          },
          {
            type: "subheading",
            content: "Explicit vs Implicit Waits",
          },
          {
            type: "code",
            language: "python",
            content: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ❌ IMPLICIT WAIT — Avoid this approach
# Applies globally to ALL find_element calls
# Mixes poorly with explicit waits
driver.implicitly_wait(10)

# ✅ EXPLICIT WAIT — Recommended
# Waits for a specific condition before continuing
wait = WebDriverWait(driver, timeout=10)

# Wait until element is visible
element = wait.until(
    EC.visibility_of_element_located((By.ID, "myElement"))
)

# Wait until element is clickable
button = wait.until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".submit-btn"))
)

# Wait until text appears
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Success"))

# Wait until URL changes
wait.until(EC.url_contains("/dashboard"))

# Wait until element disappears (loading spinner)
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "spinner")))`,
          },
          {
            type: "tip",
            content:
              "Always prefer Explicit Waits over Implicit Waits. They are more predictable, faster (stop as soon as condition is met), and don't interfere with each other.",
          },
          {
            type: "heading",
            content: "Requests Library — API Testing",
          },
          {
            type: "code",
            language: "python",
            content: `import requests

BASE_URL = "https://automationexercise.com/api"

# GET request
response = requests.get(f"{BASE_URL}/productsList")
print(response.status_code)        # 200
print(response.json())             # Parsed JSON body
print(response.headers)            # Response headers
print(response.elapsed)            # Response time

# POST request with JSON body
payload = {
    "name": "Test User",
    "email": "test@example.com",
    "password": "pass123",
    "title": "Mr",
    "birth_date": "10",
    "birth_month": "5",
    "birth_year": "1990",
    "firstname": "Test",
    "lastname": "User",
    "company": "QA Corp",
    "address1": "123 Test St",
    "country": "India",
    "zipcode": "500001",
    "state": "Telangana",
    "city": "Hyderabad",
    "mobile_number": "9876543210"
}
response = requests.post(f"{BASE_URL}/createAccount", data=payload)

# PUT request
response = requests.put(f"{BASE_URL}/updateAccount", data={"email": "test@example.com", "name": "New Name"})

# DELETE request
response = requests.delete(f"{BASE_URL}/deleteAccount", data={"email": "test@example.com", "password": "pass123"})

# Assertions in pytest
def test_get_products():
    response = requests.get(f"{BASE_URL}/productsList")
    assert response.status_code == 200
    data = response.json()
    assert "products" in data
    assert len(data["products"]) > 0`,
          },
        ],
      },
      {
        title: "Advanced: POM, CI/CD, Parallel Tests & Reporting",
        blocks: [
          {
            type: "heading",
            content: "Page Object Model (POM)",
          },
          {
            type: "text",
            content:
              "The Page Object Model is a design pattern where each web page (or page component) is represented as a Python class. The class contains the locators and methods for that page. Tests interact with page objects instead of directly with Selenium. This makes tests readable, reusable, and easy to maintain.",
          },
          {
            type: "code",
            language: "python",
            content: `# pages/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator)).text

    def is_visible(self, locator):
        try:
            return self.wait.until(EC.visibility_of_element_located(locator)).is_displayed()
        except:
            return False

    def navigate_to(self, url):
        self.driver.get(url)`,
          },
          {
            type: "code",
            language: "python",
            content: `# pages/login_page.py
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    # Locators defined as class-level constants
    EMAIL_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-email']")
    PASSWORD_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-password']")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button[data-qa='login-button']")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "p[style*='color: red']")
    SIGNUP_LINK = (By.LINK_TEXT, "Signup / Login")

    def open(self):
        self.navigate_to("https://automationexercise.com/login")
        return self

    def login(self, email, password):
        self.type(self.EMAIL_INPUT, email)
        self.type(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        return self

    def get_error_message(self):
        return self.get_text(self.ERROR_MESSAGE)

    def is_error_visible(self):
        return self.is_visible(self.ERROR_MESSAGE)`,
          },
          {
            type: "code",
            language: "python",
            content: `# tests/test_login.py
from pages.login_page import LoginPage
from pages.home_page import HomePage

def test_successful_login(browser):
    login_page = LoginPage(browser)
    login_page.open().login("valid@email.com", "validpass")
    home = HomePage(browser)
    assert home.is_logged_in()

def test_invalid_login_shows_error(browser):
    login_page = LoginPage(browser)
    login_page.open().login("wrong@email.com", "wrongpass")
    assert login_page.is_error_visible()
    assert "Your email or password is incorrect!" in login_page.get_error_message()`,
          },
          {
            type: "heading",
            content: "conftest.py Patterns",
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py (project root)
import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

@pytest.fixture(scope="session")
def browser():
    options = Options()
    if os.getenv("HEADLESS", "false").lower() == "true":
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.fixture(scope="session")
def api_client():
    """Returns a requests Session with base URL and auth headers"""
    session = requests.Session()
    session.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('API_TOKEN')}"
    })
    return session

@pytest.fixture
def test_user():
    return {
        "email": os.getenv("TEST_EMAIL", "test@example.com"),
        "password": os.getenv("TEST_PASSWORD", "Test@1234"),
        "name": "Automation User"
    }`,
          },
          {
            type: "heading",
            content: "pytest Markers",
          },
          {
            type: "code",
            language: "python",
            content: `# pytest.ini or pyproject.toml — register custom markers
# pytest.ini
[pytest]
markers =
    smoke: Fast, critical path tests — run on every commit
    regression: Full regression suite
    api: API tests only
    ui: UI/browser tests
    slow: Tests taking more than 10 seconds

# Using markers in tests
import pytest

@pytest.mark.smoke
@pytest.mark.api
def test_health_check(api_client):
    response = api_client.get("/health")
    assert response.status_code == 200

@pytest.mark.regression
@pytest.mark.ui
def test_full_checkout_flow(browser):
    pass

@pytest.mark.slow
def test_performance_benchmark():
    pass`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Run only smoke tests
pytest -m smoke

# Run only UI tests
pytest -m ui

# Run smoke OR api tests
pytest -m "smoke or api"

# Run regression but NOT slow tests
pytest -m "regression and not slow"`,
          },
          {
            type: "heading",
            content: "pytest Hooks",
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py — pytest hooks
import pytest

def pytest_configure(config):
    """Called once at the start of the test session"""
    print("\\n=== Test Session Starting ===")

def pytest_runtest_setup(item):
    """Called before each test runs"""
    print(f"\\nSetting up: {item.name}")

def pytest_runtest_teardown(item, nextitem):
    """Called after each test runs"""
    print(f"Tearing down: {item.name}")

def pytest_runtest_makereport(item, call):
    """Called after each test phase — useful for screenshots on failure"""
    if call.when == "call" and call.excinfo is not None:
        # Test failed — take screenshot
        if hasattr(item, "funcargs") and "browser" in item.funcargs:
            driver = item.funcargs["browser"]
            driver.save_screenshot(f"screenshots/{item.name}.png")

def pytest_collection_modifyitems(config, items):
    """Reorder or filter collected tests"""
    # Run smoke tests first
    smoke_tests = [i for i in items if i.get_closest_marker("smoke")]
    other_tests = [i for i in items if not i.get_closest_marker("smoke")]
    items[:] = smoke_tests + other_tests`,
          },
          {
            type: "heading",
            content: "Parallel Test Execution with pytest-xdist",
          },
          {
            type: "code",
            language: "bash",
            content: `# Install
pip install pytest-xdist

# Run tests using 4 CPU cores
pytest -n 4

# Run tests using all available CPU cores
pytest -n auto

# Distribute tests across workers
pytest -n 4 --dist=loadfile   # Keep tests from same file on same worker
pytest -n 4 --dist=load       # Balance load evenly (default)`,
          },
          {
            type: "heading",
            content: "Allure Reporting",
          },
          {
            type: "code",
            language: "python",
            content: `# pip install allure-pytest
import allure
import pytest

@allure.feature("User Authentication")
@allure.story("Login")
class TestLogin:

    @allure.title("Successful login with valid credentials")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_successful_login(self, browser):
        with allure.step("Open login page"):
            browser.get("https://example.com/login")
        with allure.step("Enter credentials"):
            browser.find_element(By.ID, "email").send_keys("admin@test.com")
            browser.find_element(By.ID, "password").send_keys("pass123")
        with allure.step("Click login button"):
            browser.find_element(By.ID, "submit").click()
        with allure.step("Verify dashboard is visible"):
            assert "Dashboard" in browser.title

    @allure.title("Failed login shows error message")
    @allure.severity(allure.severity_level.NORMAL)
    def test_failed_login(self, browser):
        pass`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Run tests and generate Allure results
pytest --alluredir=allure-results

# Serve Allure report in browser
allure serve allure-results

# Generate static report
allure generate allure-results --clean -o allure-report`,
          },
          {
            type: "heading",
            content: "Data-Driven Testing with CSV and JSON",
          },
          {
            type: "code",
            language: "python",
            content: `import csv
import json
import pytest

# Load test data from CSV
def load_csv_data(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        return [(row["username"], row["password"], row["expected"]) for row in reader]

# Load test data from JSON
def load_json_data(filepath):
    with open(filepath) as f:
        return json.load(f)

# Use CSV data with parametrize
@pytest.mark.parametrize("username,password,expected", load_csv_data("test_data/login.csv"))
def test_login_csv(username, password, expected):
    result = login(username, password)
    assert str(result).lower() == expected.lower()

# JSON test data
users_data = load_json_data("test_data/users.json")

@pytest.mark.parametrize("user", users_data)
def test_create_user(api_client, user):
    response = api_client.post("/users", json=user)
    assert response.status_code == 201`,
          },
          {
            type: "heading",
            content: "API Test Framework Structure",
          },
          {
            type: "code",
            language: "python",
            content: `# api/base_api.py
import requests

class BaseAPI:
    def __init__(self, base_url: str, token: str = None):
        self.base_url = base_url
        self.session = requests.Session()
        if token:
            self.session.headers["Authorization"] = f"Bearer {token}"

    def get(self, endpoint, **kwargs):
        return self.session.get(f"{self.base_url}{endpoint}", **kwargs)

    def post(self, endpoint, **kwargs):
        return self.session.post(f"{self.base_url}{endpoint}", **kwargs)

    def put(self, endpoint, **kwargs):
        return self.session.put(f"{self.base_url}{endpoint}", **kwargs)

    def delete(self, endpoint, **kwargs):
        return self.session.delete(f"{self.base_url}{endpoint}", **kwargs)

# api/users_api.py
from api.base_api import BaseAPI

class UsersAPI(BaseAPI):
    ENDPOINT = "/users"

    def get_all_users(self):
        return self.get(self.ENDPOINT)

    def get_user(self, user_id: int):
        return self.get(f"{self.ENDPOINT}/{user_id}")

    def create_user(self, payload: dict):
        return self.post(self.ENDPOINT, json=payload)`,
          },
          {
            type: "code",
            language: "python",
            content: `# Schema validation with jsonschema
import jsonschema

USER_SCHEMA = {
    "type": "object",
    "required": ["id", "name", "email"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "role": {"type": "string", "enum": ["admin", "user", "guest"]}
    }
}

def test_user_response_schema(api_client):
    response = api_client.get("/users/1")
    assert response.status_code == 200
    # Raises jsonschema.ValidationError if schema doesn't match
    jsonschema.validate(instance=response.json(), schema=USER_SCHEMA)`,
          },
          {
            type: "heading",
            content: "Environment Management with .env",
          },
          {
            type: "code",
            language: "text",
            content: `# .env file (NEVER commit this to git!)
BASE_URL=https://staging.example.com
API_TOKEN=your_secret_token_here
TEST_EMAIL=testuser@example.com
TEST_PASSWORD=SecurePass123
HEADLESS=false
BROWSER=chrome`,
          },
          {
            type: "code",
            language: "python",
            content: `# Load .env in conftest.py
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file from project root

BASE_URL = os.getenv("BASE_URL", "https://default.example.com")
API_TOKEN = os.getenv("API_TOKEN")
HEADLESS = os.getenv("HEADLESS", "false").lower() == "true"`,
          },
          {
            type: "heading",
            content: "GitHub Actions CI/CD",
          },
          {
            type: "code",
            language: "yaml",
            content: `# .github/workflows/tests.yml
name: Run Automation Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Install Playwright browsers
        run: playwright install --with-deps chromium

      - name: Run tests
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          API_TOKEN: \${{ secrets.API_TOKEN }}
          HEADLESS: "true"
        run: pytest -m smoke -v --alluredir=allure-results

      - name: Upload Allure results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-results
          path: allure-results/`,
          },
          {
            type: "heading",
            content: "Playwright with Python",
          },
          {
            type: "code",
            language: "python",
            content: `# Synchronous Playwright (recommended for pytest)
from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope="session")
def browser_context(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    yield context
    context.close()
    browser.close()

@pytest.fixture
def page(browser_context):
    page = browser_context.new_page()
    yield page
    page.close()

def test_login_with_playwright(page: Page):
    page.goto("https://automationexercise.com/login")

    # Playwright auto-waits — no explicit waits needed!
    page.fill("input[data-qa='login-email']", "test@example.com")
    page.fill("input[data-qa='login-password']", "pass123")
    page.click("button[data-qa='login-button']")

    # Assertions using expect (built-in auto-retry)
    expect(page).to_have_url("https://automationexercise.com/")
    expect(page.locator(".loggedin-as")).to_be_visible()

def test_api_with_playwright(page: Page):
    # Playwright can intercept network requests
    with page.expect_response("**/api/users") as response_info:
        page.goto("/users")
    response = response_info.value
    assert response.status == 200`,
          },
          {
            type: "info",
            content:
              "Playwright's key advantage over Selenium: built-in auto-waiting, network interception, multiple tabs/contexts, and significantly faster execution on modern single-page applications.",
          },
        ],
      },
      {
        title: "Interview Q&A",
        blocks: [
          {
            type: "qa",
            question: "1. What is the difference between pytest and unittest?",
            answer:
              "unittest is Python's built-in test framework, modeled after Java's JUnit. It requires test classes to inherit from unittest.TestCase and uses methods like setUp/tearDown. pytest is a third-party framework that is simpler, more powerful, and the industry standard. pytest uses plain functions (no class inheritance needed), fixtures instead of setUp/tearDown, and has a rich plugin ecosystem. pytest can also run unittest tests, so it's fully backward compatible.",
            code: `# unittest style
import unittest
class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
    def test_login(self):
        self.assertEqual(1 + 1, 2)
    def tearDown(self):
        self.driver.quit()

# pytest style — much simpler
def test_login(browser):  # browser is a fixture
    assert 1 + 1 == 2`,
          },
          {
            type: "qa",
            question: "2. What are fixtures? What is fixture scope?",
            answer:
              "Fixtures are pytest's dependency injection mechanism for test setup and teardown. A fixture is a function decorated with @pytest.fixture that sets up resources needed by tests. Tests declare fixtures as parameters and pytest automatically provides them. Fixture scope controls how often the fixture is created: 'function' (default) creates a new instance for each test, 'class' once per class, 'module' once per file, 'session' once for the entire test run.",
          },
          {
            type: "qa",
            question: "3. How does @pytest.mark.parametrize work?",
            answer:
              "parametrize allows running the same test function with multiple sets of input data. pytest generates a separate test case for each set of parameters. This eliminates code duplication and enables data-driven testing directly in Python without external files.",
            code: `@pytest.mark.parametrize("email, valid", [
    ("user@example.com", True),
    ("not-an-email", False),
    ("", False),
])
def test_email_validation(email, valid):
    assert validate_email(email) == valid
# Generates 3 tests: test_email_validation[...] x3`,
          },
          {
            type: "qa",
            question: "4. What is conftest.py and why is it important?",
            answer:
              "conftest.py is a special pytest file that is automatically loaded by pytest without needing to import it. Fixtures and hooks defined in conftest.py are available to all test files in the same directory and all subdirectories. You can have multiple conftest.py files at different directory levels, creating a hierarchy of fixtures. This is where you put your browser, API client, database, and test data fixtures.",
          },
          {
            type: "qa",
            question: "5. What are the advantages of the Page Object Model?",
            answer:
              "POM provides: (1) Separation of concerns — locators and page interactions are in page classes, test logic is in test files. (2) Reusability — login() method written once, used in hundreds of tests. (3) Maintainability — when a locator changes, you update it in one place, not across 50 test files. (4) Readability — tests read like user stories. (5) Reduced duplication — DRY principle applied to test automation.",
          },
          {
            type: "qa",
            question: "6. Implicit vs Explicit wait — which is better and why?",
            answer:
              "Explicit waits are always better. Implicit wait is a global setting that makes every find_element call wait up to N seconds for the element. Problems: (1) It applies to ALL element lookups even when you don't need waiting. (2) When combined with explicit waits, they interact unpredictably and can cause tests to wait twice as long. (3) It can mask real performance issues. Explicit wait uses WebDriverWait to wait for a specific condition on a specific element — predictable, precise, and fast.",
          },
          {
            type: "qa",
            question: "7. How do you handle dynamic elements in Selenium?",
            answer:
              "Dynamic elements change their attributes across page loads. Strategies: (1) Use stable attributes like data-qa, aria-label, or name instead of auto-generated IDs. (2) Use relative XPath based on stable nearby elements. (3) Use CSS selectors with partial attribute matching ([id^='prefix'] or [id$='suffix']). (4) Use text-based locators (LINK_TEXT, PARTIAL_LINK_TEXT). (5) Use WebDriverWait to wait for the element to appear before interacting.",
            code: `# Avoid: auto-generated ID
driver.find_element(By.ID, "react-select-123-option-0")

# Better: stable data attribute
driver.find_element(By.CSS_SELECTOR, "[data-testid='dropdown-option-first']")

# Better: partial match
driver.find_element(By.CSS_SELECTOR, "[id^='react-select']")

# Better: text content
driver.find_element(By.XPATH, "//option[text()='United States']")`,
          },
          {
            type: "qa",
            question: "8. How do you run tests in parallel?",
            answer:
              "Use pytest-xdist plugin: 'pip install pytest-xdist', then 'pytest -n auto' to use all CPU cores or 'pytest -n 4' for 4 workers. Important: tests must be independent — no shared state between tests. Use session-scoped fixtures carefully as they are shared. For browser tests, each worker gets its own browser instance. For maximum parallelization, use 'function'-scoped browser fixtures.",
          },
          {
            type: "qa",
            question: "9. What is a pytest hook?",
            answer:
              "Hooks are special functions in conftest.py that pytest calls at specific points in the test lifecycle. Common hooks: pytest_configure (session start), pytest_collection_modifyitems (after test collection — reorder/filter), pytest_runtest_setup (before each test), pytest_runtest_teardown (after each test), pytest_runtest_makereport (after each test phase — useful for screenshots on failure).",
          },
          {
            type: "qa",
            question: "10. How do you mock in pytest?",
            answer:
              "Use pytest-mock (pip install pytest-mock) which wraps Python's unittest.mock. The 'mocker' fixture is provided automatically. Use mocker.patch() to replace real objects with mock objects during tests. This is useful for isolating units from external dependencies like APIs, databases, or file systems.",
            code: `from unittest.mock import patch

def test_api_call_mocked(mocker):
    # Replace the real requests.get with a mock
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"users": [{"id": 1}]}

    mocker.patch("requests.get", return_value=mock_response)

    result = get_users()  # This calls requests.get internally
    assert result[0]["id"] == 1  # No real network call was made`,
          },
          {
            type: "qa",
            question: "11. How do you manage test data?",
            answer:
              "Multiple approaches: (1) Hardcoded in test (bad for large amounts). (2) pytest fixtures for simple structured data. (3) @pytest.mark.parametrize for multiple input sets. (4) External files: CSV, JSON, Excel read at test collection time. (5) Factories: functions that generate test data dynamically (faker library). (6) Environment variables via .env files for sensitive data. (7) Database seeding for integration tests. Best practice: keep test data close to tests, never hardcode credentials.",
          },
          {
            type: "qa",
            question: "12. What is the difference between assert and pytest.raises()?",
            answer:
              "assert is used to verify that a condition is True — it's used when you expect the code to succeed. pytest.raises() is used when you expect the code to raise a specific exception — it's used for negative testing and error handling validation. Using plain assert to catch exceptions won't give meaningful error messages; pytest.raises() gives full control over exception testing.",
            code: `# assert — verify positive outcome
def test_add():
    assert add(2, 3) == 5

# pytest.raises — verify exception is raised
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Verify exception message
def test_invalid_age():
    with pytest.raises(ValueError, match="Age must be positive"):
        create_user(name="Alice", age=-5)`,
          },
          {
            type: "qa",
            question: "13. How do you generate test reports?",
            answer:
              "Several options: (1) pytest's built-in: 'pytest -v' for verbose terminal output, '--tb=short' for shorter tracebacks. (2) pytest-html: 'pip install pytest-html', run 'pytest --html=report.html' for a self-contained HTML report. (3) Allure: 'pip install allure-pytest', run 'pytest --alluredir=results', then 'allure serve results' for an interactive report with steps, screenshots, history, and trends. Allure is the industry standard for professional test reporting.",
          },
          {
            type: "qa",
            question: "14. What is Selenium Grid?",
            answer:
              "Selenium Grid is a server that allows running tests on multiple machines and browsers simultaneously. It has a Hub (central coordinator) and Nodes (machines with browsers). Tests connect to the Hub which routes them to available Nodes. Use cases: cross-browser testing, parallel execution on multiple OS/browser combinations, reducing total test execution time. Modern alternative: Selenium Grid 4 uses Docker, or use cloud services like BrowserStack or Sauce Labs.",
            code: `# Connect to Selenium Grid
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor="http://selenium-hub:4444/wd/hub",
    options=options
)
driver.get("https://example.com")`,
          },
          {
            type: "qa",
            question: "15. How do you handle iframes, alerts, and multiple windows in Selenium?",
            answer:
              "These are common interview topics. Iframes require switching context with driver.switch_to.frame(). Alerts use driver.switch_to.alert and then .accept(), .dismiss(), or .send_keys(). Multiple windows/tabs use driver.window_handles to get all open windows and driver.switch_to.window() to switch between them.",
            code: `# Handle iframes
driver.switch_to.frame("iframe_name")         # By name/id
driver.switch_to.frame(0)                     # By index
iframe = driver.find_element(By.TAG_NAME, "iframe")
driver.switch_to.frame(iframe)               # By element
driver.switch_to.default_content()          # Back to main page

# Handle alerts
alert = driver.switch_to.alert
print(alert.text)     # Read alert message
alert.accept()        # Click OK
alert.dismiss()       # Click Cancel
alert.send_keys("text")  # Type in prompt

# Handle multiple windows
main_window = driver.current_window_handle
driver.find_element(By.LINK_TEXT, "Open New Tab").click()
all_windows = driver.window_handles
new_window = [w for w in all_windows if w != main_window][0]
driver.switch_to.window(new_window)
# ... interact with new window
driver.close()
driver.switch_to.window(main_window)  # Return to main`,
          },
          {
            type: "divider",
          },
          {
            type: "tip",
            content:
              "Pro interview tip: Always explain the 'why' behind your answers. Don't just say 'explicit waits are better' — explain that they prevent race conditions, don't globally slow down all element lookups, and interact predictably with other waits. This shows depth of understanding.",
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: "Test Otomasyonu için Python",
      subtitle: "Sıfırdan Otomasyon Mühendisliğine",
      intro:
        "Python, 2024 yılında test otomasyonu için en popüler programlama dilidir. Temiz sözdizimi, zengin ekosistemi ve devasa topluluğu ile dünya genelindeki QA mühendisleri için vazgeçilmez tercihtir. Web arayüzlerini otomatikleştirmek, REST API'leri test etmek veya tam CI/CD pipeline'ları oluşturmak olsun — Python her konuda yanınızdadır.",
    },
    tabs: [
      "🎯 Giriş",
      "📦 Kurulum",
      "📚 Orta Seviye",
      "🚀 İleri Seviye",
      "💼 Mülakat S&C",
    ],
    sections: [
      {
        title: "Test Otomasyonunda Neden Python?",
        blocks: [
          {
            type: "text",
            content:
              "Python, test otomasyonunda baskın dil haline gelmiştir ve bunun çok iyi nedenleri vardır. Okunabilir sözdizimi, test kodunun neredeyse düz İngilizce gibi okunmasını sağlar; bu da geliştiriciler dahil tüm ekibin bir testin ne yaptığını anlamasını kolaylaştırır. Ekosistem eşsizdir: pytest, Selenium, Playwright, Requests, Appium ve düzinelerce başka köklü kütüphane tek bir pip install komutuyla erişilebilir durumdadır.",
          },
          {
            type: "heading",
            content: "Python vs Java vs JavaScript: Otomasyon Karşılaştırması",
          },
          {
            type: "table",
            headers: ["Özellik", "Python", "Java", "JavaScript"],
            rows: [
              ["Öğrenme eğrisi", "Çok Düşük", "Yüksek", "Orta"],
              ["Sözdizimi okunabilirliği", "Mükemmel", "Ayrıntılı", "İyi"],
              ["Test framework'ü", "pytest", "JUnit / TestNG", "Jest / Mocha"],
              ["Web otomasyonu", "Selenium, Playwright", "Selenium", "Playwright, Cypress"],
              ["API testi", "requests, httpx", "RestAssured", "Axios, Supertest"],
              ["Mobil otomasyon", "Appium", "Appium", "WebdriverIO"],
              ["CI/CD entegrasyonu", "Mükemmel", "Mükemmel", "Mükemmel"],
              ["Topluluk (QA)", "En Büyük", "Büyük", "Büyüyor"],
              ["Script çalıştırma hızı", "Hızlı (testler için)", "Daha Hızlı", "Hızlı"],
            ],
          },
          {
            type: "tip",
            content:
              "Sıfırdan başlayan çoğu QA mühendisi için Python en iyi yatırımdır. 'Hiç bilgi yok'tan gerçek testler yazmaya geçiş süresi, Java'ya kıyasla dramatik biçimde daha kısadır.",
          },
          {
            type: "heading",
            content: "Python Test Otomasyonu Ekosistemi",
          },
          {
            type: "grid",
            cols: 3,
            items: [
              { icon: "🧪", label: "pytest", desc: "Altın standart test framework'ü. Fixture'lar, parametrize, plugin'ler, hook'lar — ihtiyacınız olan her şey." },
              { icon: "🌐", label: "Selenium", desc: "Klasik tarayıcı otomasyon kütüphanesi. WebDriver aracılığıyla Chrome, Firefox, Edge, Safari destekler." },
              { icon: "🎭", label: "Playwright", desc: "Microsoft'un modern tarayıcı otomasyon aracı. Daha hızlı, daha güvenilir, yerleşik otomatik bekleme." },
              { icon: "📡", label: "Requests", desc: "Python'ın en popüler HTTP kütüphanesi. GET, POST, PUT, DELETE çağrıları için zarif API." },
              { icon: "📱", label: "Appium", desc: "iOS ve Android için mobil test otomasyonu. Python ile Selenium gibi çalışır." },
              { icon: "📊", label: "Allure", desc: "Adımlar, ekran görüntüleri ve geçmiş takibi ile güzel test raporlaması." },
              { icon: "⚡", label: "pytest-xdist", desc: "Testleri birden fazla CPU çekirdeği veya makine genelinde paralel çalıştırın. 4x daha hızlı test süitleri." },
              { icon: "🔧", label: "python-dotenv", desc: ".env dosyalarından ortam değişkenlerini yükleyin. Gizli bilgileri kodunuzun dışında tutun." },
              { icon: "✅", label: "jsonschema", desc: "API yanıt yapısını doğrulayın. API sözleşmelerinizin hiçbir zaman bozulmadığından emin olun." },
            ],
          },
          {
            type: "heading",
            content: "Gerçek Dünya Kullanım Senaryoları",
          },
          {
            type: "list",
            icon: "✅",
            items: [
              { label: "UI Otomasyonu", desc: "Tarayıcı etkileşimlerini otomatikleştirin: giriş akışları, form gönderimi, ödeme süreçleri, çok adımlı kullanıcı yolculukları." },
              { label: "API Testi", desc: "REST API'leri doğrulayın: durum kodları, yanıt şemaları, kimlik doğrulama, performans." },
              { label: "Veriye Dayalı Test", desc: "Aynı testi CSV, Excel, JSON veya veritabanlarından gelen düzinelerce girdi kombinasyonuyla çalıştırın." },
              { label: "CI/CD Entegrasyonu", desc: "GitHub Actions, Jenkins, GitLab CI veya Azure Pipelines ile her kod push'unda testleri çalıştırın." },
              { label: "Performans Testi", desc: "Saf Python ile yazılmış HTTP uç noktalarını yük testi için Locust ile birleştirin." },
              { label: "Mobil Test", desc: "Aynı pytest framework'ü ile Appium kullanarak Android ve iOS uygulamalarını otomatikleştirin." },
            ],
          },
          {
            type: "heading",
            content: "Otomasyon Framework Karşılaştırması",
          },
          {
            type: "table",
            headers: ["Framework", "Tür", "En İyi Kullanım", "Hız", "Öğrenme Eğrisi"],
            rows: [
              ["pytest + Selenium", "UI", "Geleneksel web otomasyonu", "Orta", "Düşük"],
              ["pytest + Playwright", "UI", "Modern web uygulamaları, SPA", "Hızlı", "Düşük"],
              ["pytest + Requests", "API", "REST API testi", "Çok Hızlı", "Çok Düşük"],
              ["Robot Framework", "UI/API", "Anahtar kelime odaklı, geliştirici olmayanlar", "Orta", "Çok Düşük"],
              ["Cypress (JS)", "UI", "Frontend geliştiriciler, bileşen testi", "Hızlı", "Orta"],
              ["Behave (BDD)", "UI/API", "BDD / Gherkin sözdizimi ekipleri", "Orta", "Orta"],
            ],
          },
          {
            type: "info",
            content:
              "Modern QA ekipleri için en güçlü kombinasyon: UI testleri için pytest + Playwright, API testleri için pytest + Requests, raporlama için Allure ve CI/CD için GitHub Actions.",
          },
        ],
      },
      {
        title: "Python Kurulumu ve Ortam Hazırlığı",
        blocks: [
          {
            type: "heading",
            content: "Adım 1: Python'ı Kur",
          },
          {
            type: "text",
            content:
              "Python'ı her zaman resmi python.org sitesinden indirin. Python 3.10 veya daha yenisini seçin. Windows'ta kurulum sırasında 'Add Python to PATH' kutusunu işaretleyin — bu kritik öneme sahiptir.",
          },
          {
            type: "steps",
            items: [
              "https://python.org/downloads adresine gidin ve en son Python 3.x yükleyicisini indirin",
              "Yükleyiciyi çalıştırın — Windows'ta 'Yükle' butonuna tıklamadan önce 'Add Python to PATH' seçeneğini işaretleyin",
              "Bir terminal (PowerShell / Komut İstemi / Terminal) açın ve kurulumu doğrulayın",
              "Python sürümünün yazdırıldığını görmelisiniz — örneğin Python 3.12.0",
            ],
          },
          {
            type: "code",
            language: "bash",
            content: `# Python kurulumunu doğrula
python --version
# Python 3.12.0

# pip'in (Python paket yöneticisi) kurulu olduğunu doğrula
pip --version
# pip 24.0 from ...`,
          },
          {
            type: "heading",
            content: "Adım 2: Sanal Ortamlar (Virtual Environments)",
          },
          {
            type: "text",
            content:
              "Sanal ortam, projeniz için izole bir Python ortamıdır. Projeler arasındaki bağımlılık çakışmalarını önler. Herhangi bir paket kurmadan önce her zaman bir sanal ortam oluşturun.",
          },
          {
            type: "code",
            language: "bash",
            content: `# 'venv' adlı bir sanal ortam oluştur
python -m venv venv

# Windows'ta etkinleştir (PowerShell)
venv\\Scripts\\Activate.ps1

# Windows'ta etkinleştir (Komut İstemi)
venv\\Scripts\\activate.bat

# Mac/Linux'ta etkinleştir
source venv/bin/activate

# Terminal isteminde (venv) göreceksiniz — artık içerisindesiniz
# (venv) PS C:\\myproject>

# İşiniz bittiğinde devre dışı bırakın
deactivate`,
          },
          {
            type: "tip",
            content:
              "pip install veya python komutlarını çalıştırmadan önce her zaman sanal ortamınızı etkinleştirin. 'venv/' klasörünü .gitignore dosyanıza ekleyin — asla sürüm kontrolüne dahil etmeyin.",
          },
          {
            type: "heading",
            content: "Adım 3: Temel Test Kütüphanelerini Kur",
          },
          {
            type: "code",
            language: "bash",
            content: `# pytest kur (test framework'ü)
pip install pytest

# Selenium kur (tarayıcı otomasyonu)
pip install selenium

# Requests kur (HTTP/API testi)
pip install requests

# Playwright kur (modern tarayıcı otomasyonu)
pip install playwright
playwright install  # Tarayıcı ikili dosyalarını indirir

# Hepsini bir arada kur
pip install pytest selenium requests playwright pytest-playwright`,
          },
          {
            type: "heading",
            content: "Adım 4: requirements.txt ile Bağımlılık Yönetimi",
          },
          {
            type: "code",
            language: "bash",
            content: `# Tüm kurulu paketleri requirements.txt'e kaydet
pip freeze > requirements.txt

# Yeni bir makinede requirements.txt'ten tüm paketleri kur
pip install -r requirements.txt`,
          },
          {
            type: "code",
            language: "text",
            content: `# requirements.txt örneği
pytest==8.2.0
selenium==4.21.0
requests==2.32.0
playwright==1.44.0
pytest-playwright==0.5.0
allure-pytest==2.13.5
pytest-xdist==3.5.0
python-dotenv==1.0.1
jsonschema==4.22.0`,
          },
          {
            type: "heading",
            content: "Adım 5: Önerilen IDE'ler",
          },
          {
            type: "grid",
            cols: 2,
            items: [
              { icon: "💙", label: "VS Code (Önerilen)", desc: "Ücretsiz, hafif, güçlü. Microsoft'un 'Python' eklentisini ve IntelliSense için 'Pylance'ı yükleyin. Çoğu QA mühendisi için en iyi seçenek." },
              { icon: "🧠", label: "PyCharm Community", desc: "JetBrains tarafından Python için özel olarak geliştirilmiş ücretsiz IDE. Mükemmel pytest entegrasyonu, dahili hata ayıklayıcı ve yeniden düzenleme araçları." },
            ],
          },
          {
            type: "heading",
            content: "Adım 6: İlk Python Dosyanız",
          },
          {
            type: "code",
            language: "python",
            content: `# hello.py
name = "Otomasyon Mühendisi"
print(f"Merhaba, {name}!")

# Çalıştırmak için:
# python hello.py
# Çıktı: Merhaba, Otomasyon Mühendisi!`,
          },
          {
            type: "heading",
            content: "Adım 7: İlk pytest Testiniz",
          },
          {
            type: "code",
            language: "python",
            content: `# test_first.py
def add(a, b):
    return a + b

def test_add():
    result = add(2, 3)
    assert result == 5

def test_add_negative():
    assert add(-1, -1) == -2`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Testleri çalıştır
pytest test_first.py

# Ayrıntılı çıktı ile çalıştır
pytest test_first.py -v

# Çıktı:
# test_first.py::test_add PASSED
# test_first.py::test_add_negative PASSED
# 2 passed in 0.12s`,
          },
          {
            type: "info",
            content:
              "pytest, test_*.py veya *_test.py olarak adlandırılan test dosyalarını ve test_ ile başlayan test fonksiyonlarını otomatik olarak bulur. Temel kullanım için herhangi bir yapılandırma gerekmez.",
          },
        ],
      },
      {
        title: "Orta Seviye: pytest, Selenium ve Requests",
        blocks: [
          {
            type: "heading",
            content: "Otomasyon için Python Temelleri",
          },
          {
            type: "subheading",
            content: "Değişkenler, Veri Tipleri ve Koleksiyonlar",
          },
          {
            type: "code",
            language: "python",
            content: `# Değişkenler ve veri tipleri
username = "admin"          # str (metin)
password = "secret123"      # str
timeout = 30                # int (tam sayı)
is_logged_in = False        # bool (mantıksal)
base_url = "https://api.example.com"

# List — sıralı, değiştirilebilir
browsers = ["chrome", "firefox", "edge"]
browsers.append("safari")
first = browsers[0]        # "chrome"

# Dictionary — anahtar-değer çiftleri
user = {
    "name": "Alice",
    "role": "tester",
    "active": True
}
print(user["name"])         # Alice
print(user.get("email", "N/A"))  # N/A (anahtar yoksa varsayılan)

# f-string — metin içine değişken yerleştirme
url = f"{base_url}/users/{user['name']}"
print(url)  # https://api.example.com/users/Alice`,
          },
          {
            type: "subheading",
            content: "Kontrol Akışı ve Döngüler",
          },
          {
            type: "code",
            language: "python",
            content: `# if/elif/else
status_code = 200
if status_code == 200:
    print("Tamam")
elif status_code == 404:
    print("Bulunamadı")
else:
    print(f"Beklenmeyen: {status_code}")

# for döngüsü
endpoints = ["/login", "/products", "/cart"]
for endpoint in endpoints:
    print(f"Test ediliyor: {base_url}{endpoint}")

# range ile for döngüsü
for i in range(5):
    print(f"Deneme {i + 1}")

# List comprehension (çok Pythonic bir yol)
test_urls = [f"{base_url}{ep}" for ep in endpoints]`,
          },
          {
            type: "subheading",
            content: "Fonksiyonlar",
          },
          {
            type: "code",
            language: "python",
            content: `# Basit fonksiyon
def get_full_url(base, path):
    return f"{base}{path}"

# Varsayılan parametreli fonksiyon
def login(username, password, remember=False):
    print(f"{username} olarak giriş yapılıyor, remember={remember}")

# Tip ipuçlı fonksiyon (önerilen)
def create_user(name: str, age: int) -> dict:
    return {"name": name, "age": age}

# Kullanım
url = get_full_url("https://example.com", "/login")
login("admin", "pass123")
login("admin", "pass123", remember=True)`,
          },
          {
            type: "heading",
            content: "pytest Temelleri",
          },
          {
            type: "subheading",
            content: "Test Keşfi Kuralları",
          },
          {
            type: "list",
            icon: "📁",
            items: [
              { label: "Dosya adları", desc: "test_*.py veya *_test.py desenlerine uymalıdır" },
              { label: "Fonksiyon adları", desc: "test_ ile başlamalıdır" },
              { label: "Sınıf adları", desc: "Test ile başlamalıdır (ve __init__ metodu olmamalıdır)" },
              { label: "Metod adları", desc: "Test sınıfları içinde test_ ile başlamalıdır" },
            ],
          },
          {
            type: "code",
            language: "python",
            content: `# test_calculator.py
class TestCalculator:
    def test_toplama(self):
        assert 2 + 2 == 4

    def test_cikarma(self):
        assert 10 - 3 == 7

    def test_sifira_bolme(self):
        import pytest
        with pytest.raises(ZeroDivisionError):
            result = 1 / 0`,
          },
          {
            type: "subheading",
            content: "pytest Fixture'ları",
          },
          {
            type: "text",
            content:
              "Fixture'lar, pytest'in kurulum ve temizleme işlemlerini yönetme biçimidir. Test verisi sağlayan, bağlantıları kuran veya ortamı yapılandıran fonksiyonlardır. Testler, hangi fixture'lara ihtiyaç duyduklarını parametre olarak belirtir.",
          },
          {
            type: "code",
            language: "python",
            content: `import pytest

# Basit fixture — test verisi sağlar
@pytest.fixture
def sample_user():
    return {"username": "testuser", "email": "test@example.com"}

# yield ile temizleme yapan fixture
@pytest.fixture
def db_connection():
    # KURULUM: testten önce çalışır
    conn = create_db_connection()
    yield conn
    # TEMİZLEME: testten sonra çalışır (test başarısız olsa bile)
    conn.close()

# Test, fixture'ı adıyla parametre olarak alır
def test_user_has_email(sample_user):
    assert "email" in sample_user
    assert sample_user["email"] == "test@example.com"

def test_db_query(db_connection):
    result = db_connection.query("SELECT 1")
    assert result is not None`,
          },
          {
            type: "subheading",
            content: "Fixture Scope'ları",
          },
          {
            type: "table",
            headers: ["Scope", "Ne Zaman Çalışır", "Kullanım Senaryosu"],
            rows: [
              ["function (varsayılan)", "Her test fonksiyonu için", "Test başına taze durum — en yaygın kullanım"],
              ["class", "Her test sınıfı için", "İlgili testler grubu için paylaşılan kurulum"],
              ["module", "Her test dosyası (.py) için", "Dosya başına paylaşılan DB/API bağlantısı"],
              ["session", "Tüm test çalışması için", "Tüm testlerde paylaşılan tarayıcı örneği, ağır kurulum"],
            ],
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py — burada tanımlanan fixture'lar TÜM testlere açıktır
import pytest
from selenium import webdriver

@pytest.fixture(scope="session")
def browser():
    """Browser fixture — tüm test oturumu için bir kez oluşturulur"""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()  # TÜM testler bittikten sonra temizlik

@pytest.fixture(scope="function")
def logged_in_browser(browser):
    """Her test taze bir giriş yapmış durumda başlar"""
    browser.get("https://example.com/login")
    browser.find_element(By.ID, "username").send_keys("admin")
    browser.find_element(By.ID, "password").send_keys("pass")
    browser.find_element(By.ID, "submit").click()
    yield browser
    # Her testten sonra çıkış yap
    browser.get("https://example.com/logout")`,
          },
          {
            type: "subheading",
            content: "Parametrize — Veriye Dayalı Testler",
          },
          {
            type: "code",
            language: "python",
            content: `import pytest

# Aynı testi birden fazla girdiyle çalıştır
@pytest.mark.parametrize("username, password, expected", [
    ("admin", "correct_pass", True),
    ("admin", "wrong_pass", False),
    ("", "any_pass", False),
    ("admin", "", False),
])
def test_login(username, password, expected):
    result = login(username, password)
    assert result == expected

# Okunabilir test adları için ID'li parametrize
@pytest.mark.parametrize("status_code", [200, 201, 204], ids=["ok", "created", "no-content"])
def test_success_codes(status_code):
    assert status_code < 300`,
          },
          {
            type: "heading",
            content: "Selenium Temelleri",
          },
          {
            type: "code",
            language: "python",
            content: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Chrome WebDriver kurulumu
driver = webdriver.Chrome()
driver.maximize_window()

# URL'ye git
driver.get("https://automationexercise.com")

# Farklı locator'lar ile element bulma
search_box = driver.find_element(By.ID, "search_product")
username_field = driver.find_element(By.NAME, "email")
submit_btn = driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']")
product_name = driver.find_element(By.XPATH, "//h2[@class='product-name']")

# Etkileşimler
search_box.send_keys("Blue Top")   # Metin yaz
submit_btn.click()                  # Tıkla
username_field.clear()              # Alanı temizle

# Bilgi alma
page_title = driver.title
current_url = driver.current_url
element_text = product_name.text

# Temizlik
driver.quit()`,
          },
          {
            type: "subheading",
            content: "Explicit vs Implicit Wait",
          },
          {
            type: "code",
            language: "python",
            content: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ❌ IMPLICIT WAIT — Bu yaklaşımdan kaçının
# Tüm find_element çağrılarına küresel olarak uygulanır
driver.implicitly_wait(10)

# ✅ EXPLICIT WAIT — Önerilen yöntem
# Devam etmeden önce belirli bir koşulu bekler
wait = WebDriverWait(driver, timeout=10)

# Element görünür olana kadar bekle
element = wait.until(
    EC.visibility_of_element_located((By.ID, "myElement"))
)

# Element tıklanabilir olana kadar bekle
button = wait.until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".submit-btn"))
)

# Belirli metin görünene kadar bekle
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Başarılı"))

# URL değişene kadar bekle
wait.until(EC.url_contains("/dashboard"))`,
          },
          {
            type: "tip",
            content:
              "Her zaman Implicit Wait yerine Explicit Wait'i tercih edin. Daha öngörülebilir, daha hızlı (koşul karşılandığında durur) ve diğer bekleme mekanizmalarıyla etkileşime girmez.",
          },
          {
            type: "heading",
            content: "Requests Kütüphanesi — API Testi",
          },
          {
            type: "code",
            language: "python",
            content: `import requests

BASE_URL = "https://automationexercise.com/api"

# GET isteği
response = requests.get(f"{BASE_URL}/productsList")
print(response.status_code)        # 200
print(response.json())             # Ayrıştırılmış JSON gövdesi
print(response.headers)            # Yanıt başlıkları
print(response.elapsed)            # Yanıt süresi

# POST isteği
payload = {
    "name": "Test Kullanıcısı",
    "email": "test@example.com",
    "password": "pass123"
}
response = requests.post(f"{BASE_URL}/createAccount", data=payload)

# pytest'te assertions
def test_get_products():
    response = requests.get(f"{BASE_URL}/productsList")
    assert response.status_code == 200
    data = response.json()
    assert "products" in data
    assert len(data["products"]) > 0`,
          },
        ],
      },
      {
        title: "İleri Seviye: POM, CI/CD, Paralel Testler ve Raporlama",
        blocks: [
          {
            type: "heading",
            content: "Page Object Model (POM)",
          },
          {
            type: "text",
            content:
              "Page Object Model, her web sayfasının (veya sayfa bileşeninin) bir Python sınıfı olarak temsil edildiği bir tasarım desenidir. Sınıf, o sayfanın locator'larını ve metodlarını içerir. Testler, doğrudan Selenium yerine sayfa nesneleriyle etkileşime girer. Bu, testleri okunabilir, yeniden kullanılabilir ve bakımı kolay hale getirir.",
          },
          {
            type: "code",
            language: "python",
            content: `# pages/base_page.py
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator)).text

    def is_visible(self, locator):
        try:
            return self.wait.until(EC.visibility_of_element_located(locator)).is_displayed()
        except:
            return False`,
          },
          {
            type: "code",
            language: "python",
            content: `# pages/login_page.py
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    EMAIL_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-email']")
    PASSWORD_INPUT = (By.CSS_SELECTOR, "input[data-qa='login-password']")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button[data-qa='login-button']")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "p[style*='color: red']")

    def open(self):
        self.navigate_to("https://automationexercise.com/login")
        return self

    def login(self, email, password):
        self.type(self.EMAIL_INPUT, email)
        self.type(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        return self

    def get_error_message(self):
        return self.get_text(self.ERROR_MESSAGE)`,
          },
          {
            type: "heading",
            content: "conftest.py Desenleri",
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py (proje kök dizini)
import pytest
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
import os

load_dotenv()  # .env dosyasını yükle

@pytest.fixture(scope="session")
def browser():
    options = Options()
    if os.getenv("HEADLESS", "false").lower() == "true":
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

@pytest.fixture(scope="session")
def api_client():
    """Base URL ve auth başlıklarıyla requests Session döndürür"""
    session = requests.Session()
    session.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('API_TOKEN')}"
    })
    return session

@pytest.fixture
def test_user():
    return {
        "email": os.getenv("TEST_EMAIL", "test@example.com"),
        "password": os.getenv("TEST_PASSWORD", "Test@1234"),
        "name": "Otomasyon Kullanıcısı"
    }`,
          },
          {
            type: "heading",
            content: "pytest Marker'ları",
          },
          {
            type: "code",
            language: "python",
            content: `# pytest.ini — özel marker'ları kaydet
[pytest]
markers =
    smoke: Hızlı, kritik yol testleri — her commit'te çalıştır
    regression: Tam regression suite'i
    api: Sadece API testleri
    ui: UI/tarayıcı testleri
    slow: 10 saniyeden uzun süren testler

# Testlerde marker kullanımı
import pytest

@pytest.mark.smoke
@pytest.mark.api
def test_health_check(api_client):
    response = api_client.get("/health")
    assert response.status_code == 200`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Sadece smoke testlerini çalıştır
pytest -m smoke

# Sadece UI testlerini çalıştır
pytest -m ui

# Smoke VEYA api testlerini çalıştır
pytest -m "smoke or api"

# Regression'dan slow olanları çıkararak çalıştır
pytest -m "regression and not slow"`,
          },
          {
            type: "heading",
            content: "pytest Hook'ları",
          },
          {
            type: "code",
            language: "python",
            content: `# conftest.py — pytest hook'ları
import pytest

def pytest_configure(config):
    """Test oturumu başında bir kez çağrılır"""
    print("\\n=== Test Oturumu Başlıyor ===")

def pytest_runtest_makereport(item, call):
    """Her test aşamasından sonra çağrılır — hata durumunda ekran görüntüsü için kullanışlı"""
    if call.when == "call" and call.excinfo is not None:
        # Test başarısız oldu — ekran görüntüsü al
        if hasattr(item, "funcargs") and "browser" in item.funcargs:
            driver = item.funcargs["browser"]
            driver.save_screenshot(f"screenshots/{item.name}.png")

def pytest_collection_modifyitems(config, items):
    """Toplanan testleri yeniden sırala veya filtrele"""
    smoke_tests = [i for i in items if i.get_closest_marker("smoke")]
    other_tests = [i for i in items if not i.get_closest_marker("smoke")]
    items[:] = smoke_tests + other_tests`,
          },
          {
            type: "heading",
            content: "pytest-xdist ile Paralel Test Çalıştırma",
          },
          {
            type: "code",
            language: "bash",
            content: `# Kur
pip install pytest-xdist

# 4 CPU çekirdeği kullanarak testleri çalıştır
pytest -n 4

# Mevcut tüm CPU çekirdeklerini kullanarak çalıştır
pytest -n auto

# Testleri worker'lara dağıt
pytest -n 4 --dist=loadfile   # Aynı dosyadan testleri aynı worker'da tut
pytest -n 4 --dist=load       # Yükü eşit dağıt (varsayılan)`,
          },
          {
            type: "heading",
            content: "Allure Raporlama",
          },
          {
            type: "code",
            language: "python",
            content: `# pip install allure-pytest
import allure
import pytest

@allure.feature("Kullanıcı Kimlik Doğrulama")
@allure.story("Giriş")
class TestLogin:

    @allure.title("Geçerli kimlik bilgileriyle başarılı giriş")
    @allure.severity(allure.severity_level.CRITICAL)
    def test_successful_login(self, browser):
        with allure.step("Giriş sayfasını aç"):
            browser.get("https://example.com/login")
        with allure.step("Kimlik bilgilerini gir"):
            browser.find_element(By.ID, "email").send_keys("admin@test.com")
            browser.find_element(By.ID, "password").send_keys("pass123")
        with allure.step("Giriş butonuna tıkla"):
            browser.find_element(By.ID, "submit").click()
        with allure.step("Dashboard'un görünür olduğunu doğrula"):
            assert "Dashboard" in browser.title`,
          },
          {
            type: "code",
            language: "bash",
            content: `# Testleri çalıştır ve Allure sonuçlarını oluştur
pytest --alluredir=allure-results

# Tarayıcıda Allure raporunu sun
allure serve allure-results

# Statik rapor oluştur
allure generate allure-results --clean -o allure-report`,
          },
          {
            type: "heading",
            content: "CSV ve JSON ile Veriye Dayalı Test",
          },
          {
            type: "code",
            language: "python",
            content: `import csv
import json
import pytest

# CSV'den test verisi yükle
def load_csv_data(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        return [(row["username"], row["password"], row["expected"]) for row in reader]

# JSON'dan test verisi yükle
def load_json_data(filepath):
    with open(filepath) as f:
        return json.load(f)

# CSV verisi ile parametrize kullan
@pytest.mark.parametrize("username,password,expected", load_csv_data("test_data/login.csv"))
def test_login_csv(username, password, expected):
    result = login(username, password)
    assert str(result).lower() == expected.lower()`,
          },
          {
            type: "heading",
            content: "API Test Framework Yapısı",
          },
          {
            type: "code",
            language: "python",
            content: `# api/base_api.py
import requests

class BaseAPI:
    def __init__(self, base_url: str, token: str = None):
        self.base_url = base_url
        self.session = requests.Session()
        if token:
            self.session.headers["Authorization"] = f"Bearer {token}"

    def get(self, endpoint, **kwargs):
        return self.session.get(f"{self.base_url}{endpoint}", **kwargs)

    def post(self, endpoint, **kwargs):
        return self.session.post(f"{self.base_url}{endpoint}", **kwargs)

# api/users_api.py
from api.base_api import BaseAPI

class UsersAPI(BaseAPI):
    ENDPOINT = "/users"

    def get_all_users(self):
        return self.get(self.ENDPOINT)

    def create_user(self, payload: dict):
        return self.post(self.ENDPOINT, json=payload)`,
          },
          {
            type: "code",
            language: "python",
            content: `# jsonschema ile şema doğrulama
import jsonschema

USER_SCHEMA = {
    "type": "object",
    "required": ["id", "name", "email"],
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
    }
}

def test_user_response_schema(api_client):
    response = api_client.get("/users/1")
    assert response.status_code == 200
    # Şema eşleşmezse jsonschema.ValidationError fırlatır
    jsonschema.validate(instance=response.json(), schema=USER_SCHEMA)`,
          },
          {
            type: "heading",
            content: ".env ile Ortam Yönetimi",
          },
          {
            type: "code",
            language: "text",
            content: `# .env dosyası (ASLA git'e commit etmeyin!)
BASE_URL=https://staging.example.com
API_TOKEN=gizli_token_buraya
TEST_EMAIL=testuser@example.com
TEST_PASSWORD=GucluSifre123
HEADLESS=false
BROWSER=chrome`,
          },
          {
            type: "heading",
            content: "GitHub Actions CI/CD",
          },
          {
            type: "code",
            language: "yaml",
            content: `# .github/workflows/tests.yml
name: Otomasyon Testlerini Çalıştır

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Kodu al
        uses: actions/checkout@v4

      - name: Python kur
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Bağımlılıkları kur
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Playwright tarayıcılarını kur
        run: playwright install --with-deps chromium

      - name: Testleri çalıştır
        env:
          BASE_URL: \${{ secrets.BASE_URL }}
          API_TOKEN: \${{ secrets.API_TOKEN }}
          HEADLESS: "true"
        run: pytest -m smoke -v --alluredir=allure-results`,
          },
          {
            type: "heading",
            content: "Python ile Playwright",
          },
          {
            type: "code",
            language: "python",
            content: `# pytest için Senkron Playwright (önerilen)
from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope="session")
def browser_context(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    yield context
    context.close()
    browser.close()

@pytest.fixture
def page(browser_context):
    page = browser_context.new_page()
    yield page
    page.close()

def test_login_with_playwright(page: Page):
    page.goto("https://automationexercise.com/login")

    # Playwright otomatik bekler — explicit wait gerekmez!
    page.fill("input[data-qa='login-email']", "test@example.com")
    page.fill("input[data-qa='login-password']", "pass123")
    page.click("button[data-qa='login-button']")

    # Otomatik yeniden deneme ile expect assertion'ları
    expect(page).to_have_url("https://automationexercise.com/")
    expect(page.locator(".loggedin-as")).to_be_visible()`,
          },
          {
            type: "info",
            content:
              "Playwright'ın Selenium'a göre temel avantajı: yerleşik otomatik bekleme, ağ isteklerini yakalayabilme, çoklu sekme/bağlam desteği ve modern tek sayfalı uygulamalarda önemli ölçüde daha hızlı çalışma.",
          },
        ],
      },
      {
        title: "Mülakat Soruları ve Cevapları",
        blocks: [
          {
            type: "qa",
            question: "1. pytest ile unittest arasındaki fark nedir?",
            answer:
              "unittest, Java'nın JUnit'inden esinlenerek oluşturulmuş Python'ın yerleşik test framework'üdür. Test sınıflarının unittest.TestCase'den miras almasını ve setUp/tearDown gibi metodları kullanmasını gerektirir. pytest ise daha basit, daha güçlü ve sektör standardı olan üçüncü taraf bir framework'tür. pytest düz fonksiyonlar kullanır (sınıf kalıtımı gerekmez), setUp/tearDown yerine fixture'lar kullanır ve zengin bir plugin ekosistemine sahiptir. pytest ayrıca unittest testlerini de çalıştırabilir.",
            code: `# unittest stili
import unittest
class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
    def test_login(self):
        self.assertEqual(1 + 1, 2)
    def tearDown(self):
        self.driver.quit()

# pytest stili — çok daha basit
def test_login(browser):  # browser bir fixture'dır
    assert 1 + 1 == 2`,
          },
          {
            type: "qa",
            question: "2. Fixture nedir? Fixture scope'u ne anlama gelir?",
            answer:
              "Fixture'lar, pytest'in test kurulumu ve temizlemesi için bağımlılık enjeksiyon mekanizmasıdır. Fixture, testlerin ihtiyaç duyduğu kaynakları hazırlayan @pytest.fixture dekoratörlü bir fonksiyondur. Testler fixture'ları parametre olarak bildirdiğinde pytest onları otomatik olarak sağlar. Fixture scope'u fixture'ın ne sıklıkla oluşturulduğunu kontrol eder: 'function' (varsayılan) her test için yeni bir örnek oluşturur, 'class' sınıf başına bir kez, 'module' dosya başına bir kez, 'session' tüm test çalışması için bir kez.",
          },
          {
            type: "qa",
            question: "3. @pytest.mark.parametrize nasıl çalışır?",
            answer:
              "parametrize, aynı test fonksiyonunu birden fazla girdi veri setiyle çalıştırmayı sağlar. pytest her parametre seti için ayrı bir test vakası oluşturur. Bu, kod tekrarını ortadan kaldırır ve dış dosyalara ihtiyaç duymadan doğrudan Python'da veriye dayalı test yapılmasını sağlar.",
            code: `@pytest.mark.parametrize("email, valid", [
    ("kullanici@example.com", True),
    ("gecersiz-email", False),
    ("", False),
])
def test_email_dogrulama(email, valid):
    assert validate_email(email) == valid
# 3 test oluşturur: test_email_dogrulama[...] x3`,
          },
          {
            type: "qa",
            question: "4. conftest.py nedir ve neden önemlidir?",
            answer:
              "conftest.py, pytest tarafından import edilmeden otomatik olarak yüklenen özel bir pytest dosyasıdır. conftest.py içinde tanımlanan fixture'lar ve hook'lar, aynı dizindeki ve tüm alt dizinlerdeki test dosyalarına açıktır. Farklı dizin seviyelerinde birden fazla conftest.py dosyasına sahip olabilirsiniz. Tarayıcı, API istemcisi, veritabanı ve test verisi fixture'larınızı buraya koyarsınız.",
          },
          {
            type: "qa",
            question: "5. Page Object Model'in avantajları nelerdir?",
            answer:
              "POM şu faydaları sağlar: (1) Sorumluluk ayrımı — locator'lar ve sayfa etkileşimleri sayfa sınıflarında, test mantığı test dosyalarındadır. (2) Yeniden kullanılabilirlik — login() metodu bir kez yazılır, yüzlerce testte kullanılır. (3) Bakım kolaylığı — locator değiştiğinde tek bir yerde güncellenir. (4) Okunabilirlik — testler kullanıcı hikayeleri gibi okunur. (5) Kod tekrarını azaltır — DRY prensibi uygulanır.",
          },
          {
            type: "qa",
            question: "6. Implicit vs Explicit wait — hangisi daha iyidir ve neden?",
            answer:
              "Explicit wait her zaman daha iyidir. Implicit wait, her find_element çağrısının N saniyeye kadar beklemesini sağlayan global bir ayardır. Sorunları: (1) Beklemeye ihtiyaç duymadığınızda bile tüm element aramalarına uygulanır. (2) Explicit wait ile birlikte kullanıldığında tahmin edilemez şekilde etkileşir ve testlerin iki katı beklemesine neden olabilir. (3) Gerçek performans sorunlarını gizleyebilir. Explicit wait, belirli bir elementteki belirli bir koşul için bekler — öngörülebilir, hassas ve hızlı.",
          },
          {
            type: "qa",
            question: "7. Selenium'da dinamik elementleri nasıl ele alırsınız?",
            answer:
              "Dinamik elementler sayfa yüklemelerinde niteliklerini değiştirir. Stratejiler: (1) Otomatik oluşturulan ID'ler yerine data-qa, aria-label veya name gibi kararlı nitelikleri kullanın. (2) Yakınındaki kararlı elementlere dayalı relative XPath kullanın. (3) Kısmi nitelik eşleşmesiyle CSS selector kullanın. (4) Metin tabanlı locator'lar kullanın. (5) Etkileşimden önce elementin görünmesini beklemek için WebDriverWait kullanın.",
            code: `# Kaçının: otomatik oluşturulan ID
driver.find_element(By.ID, "react-select-123-option-0")

# Daha iyi: kararlı data niteliği
driver.find_element(By.CSS_SELECTOR, "[data-testid='dropdown-option-first']")

# Daha iyi: kısmi eşleşme
driver.find_element(By.CSS_SELECTOR, "[id^='react-select']")`,
          },
          {
            type: "qa",
            question: "8. Testleri paralel nasıl çalıştırırsınız?",
            answer:
              "pytest-xdist plugin'ini kullanın: 'pip install pytest-xdist', ardından tüm CPU çekirdeklerini kullanmak için 'pytest -n auto' veya 4 worker için 'pytest -n 4'. Önemli: testler bağımsız olmalıdır — testler arasında paylaşılan durum olmamalıdır. Session-scoped fixture'ları dikkatli kullanın. Tarayıcı testlerinde her worker kendi tarayıcı örneğini alır.",
          },
          {
            type: "qa",
            question: "9. pytest hook nedir?",
            answer:
              "Hook'lar, pytest'in test yaşam döngüsünün belirli noktalarında çağırdığı conftest.py'deki özel fonksiyonlardır. Yaygın hook'lar: pytest_configure (oturum başlangıcı), pytest_collection_modifyitems (test toplamadan sonra — yeniden sıralama/filtreleme), pytest_runtest_setup (her testten önce), pytest_runtest_teardown (her testten sonra), pytest_runtest_makereport (her test aşamasından sonra — hata durumunda ekran görüntüsü için kullanışlı).",
          },
          {
            type: "qa",
            question: "10. pytest'te nasıl mock kullanırsınız?",
            answer:
              "pytest-mock kullanın (pip install pytest-mock) — Python'ın unittest.mock'unu sarmalayan bir araçtır. 'mocker' fixture'ı otomatik olarak sağlanır. Testler sırasında gerçek nesneleri mock nesnelerle değiştirmek için mocker.patch() kullanın. Bu, birimleri API'ler, veritabanları veya dosya sistemleri gibi dış bağımlılıklardan izole etmek için kullanışlıdır.",
            code: `from unittest.mock import patch

def test_api_call_mocked(mocker):
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"users": [{"id": 1}]}

    mocker.patch("requests.get", return_value=mock_response)

    result = get_users()  # Bu dahili olarak requests.get çağırır
    assert result[0]["id"] == 1  # Gerçek ağ çağrısı yapılmadı`,
          },
          {
            type: "qa",
            question: "11. Test verisini nasıl yönetirsiniz?",
            answer:
              "Birden fazla yaklaşım: (1) Testte sabit kodlama (büyük miktarlar için kötü). (2) Basit yapılandırılmış veriler için pytest fixture'ları. (3) Birden fazla girdi seti için @pytest.mark.parametrize. (4) Dış dosyalar: test toplama zamanında okunan CSV, JSON, Excel. (5) Factory'ler: faker kütüphanesiyle test verisini dinamik olarak üreten fonksiyonlar. (6) Hassas veriler için .env dosyaları aracılığıyla ortam değişkenleri. En iyi uygulama: test verisini testlere yakın tutun, kimlik bilgilerini asla sabit kodlamayın.",
          },
          {
            type: "qa",
            question: "12. assert ile pytest.raises() arasındaki fark nedir?",
            answer:
              "assert, bir koşulun True olduğunu doğrulamak için kullanılır — kodun başarılı olmasını beklediğinizde kullanılır. pytest.raises(), kodun belirli bir istisna fırlatmasını beklediğinizde kullanılır — negatif test ve hata yönetimi doğrulaması için kullanılır. İstisnaları yakalamak için düz assert kullanmak anlamlı hata mesajları vermez; pytest.raises() ise istisna testi üzerinde tam kontrol sağlar.",
            code: `# assert — olumlu sonucu doğrula
def test_add():
    assert add(2, 3) == 5

# pytest.raises — istisna fırlatıldığını doğrula
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# İstisna mesajını doğrula
def test_invalid_age():
    with pytest.raises(ValueError, match="Age must be positive"):
        create_user(name="Alice", age=-5)`,
          },
          {
            type: "qa",
            question: "13. Test raporlarını nasıl oluşturursunuz?",
            answer:
              "Birkaç seçenek: (1) pytest'in yerleşik çıktısı: ayrıntılı terminal çıktısı için 'pytest -v'. (2) pytest-html: 'pip install pytest-html', HTML rapor için 'pytest --html=report.html'. (3) Allure: 'pip install allure-pytest', 'pytest --alluredir=results' çalıştırın, ardından interaktif rapor için 'allure serve results'. Allure, profesyonel test raporlaması için sektör standardıdır.",
          },
          {
            type: "qa",
            question: "14. Selenium Grid nedir?",
            answer:
              "Selenium Grid, testlerin birden fazla makine ve tarayıcıda eş zamanlı olarak çalıştırılmasını sağlayan bir sunucudur. Hub (merkezi koordinatör) ve Node'lardan (tarayıcılı makineler) oluşur. Testler Hub'a bağlanır ve Hub onları uygun Node'lara yönlendirir. Kullanım senaryoları: çapraz tarayıcı testi, birden fazla OS/tarayıcı kombinasyonunda paralel çalıştırma, toplam test çalışma süresini azaltma.",
            code: `# Selenium Grid'e bağlan
from selenium import webdriver

options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor="http://selenium-hub:4444/wd/hub",
    options=options
)
driver.get("https://example.com")`,
          },
          {
            type: "qa",
            question: "15. Selenium'da iframe, alert ve çoklu pencereleri nasıl ele alırsınız?",
            answer:
              "Bunlar yaygın mülakat konularıdır. iframe'ler, driver.switch_to.frame() ile bağlam değiştirmeyi gerektirir. Alert'ler driver.switch_to.alert kullanır ve ardından .accept(), .dismiss() veya .send_keys() çağrılır. Çoklu pencereler/sekmeler için driver.window_handles tüm açık pencereleri alır, driver.switch_to.window() ise aralarında geçiş yapar.",
            code: `# iframe'leri ele al
driver.switch_to.frame("iframe_name")        # Ad/ID ile
driver.switch_to.frame(0)                    # İndeks ile
driver.switch_to.default_content()          # Ana sayfaya dön

# Alert'leri ele al
alert = driver.switch_to.alert
print(alert.text)     # Alert mesajını oku
alert.accept()        # Tamam'a tıkla
alert.dismiss()       # İptal'e tıkla

# Çoklu pencereleri ele al
main_window = driver.current_window_handle
driver.find_element(By.LINK_TEXT, "Yeni Sekme Aç").click()
all_windows = driver.window_handles
new_window = [w for w in all_windows if w != main_window][0]
driver.switch_to.window(new_window)
# ... yeni pencere ile etkileşim
driver.close()
driver.switch_to.window(main_window)  # Ana pencereye dön`,
          },
          {
            type: "divider",
          },
          {
            type: "tip",
            content:
              "Profesyonel mülakat ipucu: Cevaplarınızın arkasındaki 'neden'i her zaman açıklayın. Sadece 'explicit wait daha iyidir' demeyin — yarış koşullarını önlediğini, tüm element aramalarını küresel olarak yavaşlatmadığını ve diğer bekleme mekanizmalarıyla öngörülebilir şekilde etkileşime girdiğini açıklayın. Bu, anlayışınızın derinliğini gösterir.",
          },
        ],
      },
    ],
  },
};
