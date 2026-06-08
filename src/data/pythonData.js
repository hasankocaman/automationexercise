const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: '🎯 What is Python & Why Do QA Engineers Need It?',
    blocks: [
      { type: 'text', content: 'Python is a high-level, interpreted programming language known for its clean, readable syntax — it reads almost like plain English. Created in 1991, it has become the world\'s most popular language for automation, data science, and web development.' },
      { type: 'text', content: 'For QA engineers, Python is the Swiss Army knife: you can write UI tests with Selenium/Playwright, API tests with requests, performance tests, data validation scripts, and CI/CD pipelines — all with the same language.' },
      { type: 'heading', text: 'Why Python for Test Automation?' },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '📖', label: 'Readable Syntax', desc: 'Tests read like documentation — even non-developers can understand what\'s being tested.' },
          { icon: '🧰', label: 'Huge Ecosystem', desc: 'pytest, Selenium, Playwright, requests, Faker, pandas — thousands of testing libraries.' },
          { icon: '⚡', label: 'Rapid Scripting', desc: 'Write a data-generation script or API test in minutes, not hours.' },
          { icon: '🔗', label: 'API Testing', desc: 'requests library makes HTTP calls trivial. Great for REST API validation.' },
          { icon: '📊', label: 'Data Manipulation', desc: 'pandas, csv, json — read test data from any format.' },
          { icon: '🔄', label: 'CI/CD Native', desc: 'Python scripts integrate with Jenkins, GitHub Actions, Docker without friction.' },
        ]
      },
      { type: 'heading', text: 'Python vs Other Languages for Testing' },
      {
        type: 'table',
        headers: ['Language', 'Pros', 'Cons', 'Best For'],
        rows: [
          ['Python', 'Readable, fast to write, huge ecosystem', 'Slower execution than compiled', 'Automation scripts, API tests, pytest'],
          ['Java', 'Enterprise scale, strong typing', 'Verbose, slower to write', 'Selenium WebDriver, legacy enterprise'],
          ['JavaScript', 'Same language as web apps, async native', 'Callback complexity', 'Playwright, Cypress, frontend testing'],
          ['C#', 'Microsoft stack, strong typing', 'Windows-centric, less OSS', '.NET apps, SpecFlow, NUnit'],
        ]
      },
      { type: 'heading', text: 'Popular Python Testing Libraries' },
      {
        type: 'table',
        headers: ['Library', 'Purpose', 'Install Command'],
        rows: [
          ['pytest', 'Test runner, fixtures, assertions', 'pip install pytest'],
          ['selenium', 'Browser UI automation', 'pip install selenium'],
          ['playwright', 'Modern browser automation', 'pip install playwright'],
          ['requests', 'HTTP/API testing', 'pip install requests'],
          ['pandas', 'Read CSV/Excel test data', 'pip install pandas'],
          ['faker', 'Generate realistic test data', 'pip install faker'],
          ['allure-pytest', 'Beautiful test reports', 'pip install allure-pytest'],
        ]
      },
    ],
  },

  // ── 1. INSTALLATION ─────────────────────────────────────────────────────────
  {
    title: '📦 Installing Python & Setting Up Your Environment',
    blocks: [
      { type: 'heading', text: 'Step 1: Download and Install Python 3' },
      {
        type: 'steps',
        items: [
          'Go to python.org/downloads and download the latest Python 3.x (NOT Python 2)',
          'Windows: Run the installer — CRITICAL: check "Add Python to PATH" before clicking Install!',
          'Mac: Use the .pkg installer from python.org, or: brew install python3',
          'Linux (Ubuntu/Debian): sudo apt update && sudo apt install python3 python3-pip',
        ]
      },
      { type: 'warning', content: 'Windows users: If you forget to check "Add Python to PATH", the `python` command won\'t work in the terminal. Re-run the installer and choose "Modify", then check PATH.' },
      { type: 'heading', text: 'Step 2: Verify Installation' },
      {
        type: 'code',
        code: `# In your terminal/command prompt:
python --version       # Windows (usually)
python3 --version      # Mac/Linux

# Why both? On Mac/Linux, "python" may point to Python 2 (legacy).
# "python3" always points to Python 3. Use whichever works on your system.

pip --version          # package manager
pip3 --version         # Mac/Linux alternative`,
        expected: `Python 3.12.0\npip 23.3.1 from /usr/local/lib/python3.12/site-packages/pip (python 3.12)`
      },
      { type: 'heading', text: 'Step 3: Virtual Environments (Critical!)' },
      { type: 'text', content: 'A virtual environment is an isolated Python installation for your project. It prevents dependency conflicts between projects. Project A needs requests==2.28 but Project B needs requests==2.31? Virtual environments solve this.' },
      {
        type: 'code',
        code: `# Create a virtual environment (run inside your project folder):
python -m venv venv          # creates a "venv" folder

# Activate it:
# Windows:
venv\\Scripts\\activate

# Mac/Linux:
source venv/bin/activate

# Your prompt changes to show (venv) when active.
# Now install packages — they go INTO venv, not system Python:
pip install pytest requests playwright

# Deactivate when done:
deactivate`,
        expected: `(venv) C:\\projects\\mytest>`
      },
      { type: 'tip', content: 'Always create a venv for every new project. Add the `venv/` folder to .gitignore — never commit it.' },
      { type: 'heading', text: 'Step 4: requirements.txt Pattern' },
      {
        type: 'code',
        code: `# Save current dependencies to a file:
pip freeze > requirements.txt

# Contents of requirements.txt:
# pytest==7.4.3
# requests==2.31.0
# playwright==1.40.0

# Install from requirements.txt on another machine or CI:
pip install -r requirements.txt`,
      },
      { type: 'heading', text: 'Step 5: First Program' },
      {
        type: 'code',
        label: 'hello_world.py',
        code: `# Your first Python program
name = "QA Engineer"              # variable assignment
print(f"Hello, {name}!")          # f-string: embed variable in string
print("Python version check:", end=" ")
import sys                         # import a built-in module
print(sys.version)                 # print Python version`,
        expected: `Hello, QA Engineer!\nPython version check: 3.12.0 (main, ...) [GCC ...]`
      },
    ],
  },

  // ── 2. FOUNDATIONS ──────────────────────────────────────────────────────────
  {
    title: '🟢 Level 1: Python Foundations',
    blocks: [
      { type: 'heading', text: 'Variables and Data Types', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `# Python has dynamic typing — no need to declare types
name    = "Alice"          # str  (string)
age     = 28               # int  (integer)
score   = 98.5             # float (decimal)
passed  = True             # bool (True or False)
nothing = None             # NoneType (absence of value)

# Check the type of any variable:
print(type(name))          # <class 'str'>
print(type(age))           # <class 'int'>
print(type(passed))        # <class 'bool'>

# Type conversion:
str_age = str(age)         # "28"  (int to str)
int_str = int("42")        # 42    (str to int)
flt_str = float("3.14")    # 3.14  (str to float)`,
        expected: `<class 'str'>\n<class 'int'>\n<class 'bool'>`
      },
      { type: 'heading', text: 'Strings and F-Strings', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `test_name = "Login Test"
status    = "FAILED"
duration  = 2.347

# f-strings (Python 3.6+) — the preferred way:
msg = f"{test_name} {status} in {duration:.2f}s"
print(msg)

# Common string methods:
print(test_name.upper())              # "LOGIN TEST"
print(test_name.lower())              # "login test"
print("  hello  ".strip())            # "hello"
print(test_name.replace("Login", "Logout"))  # "Logout Test"
print(test_name.startswith("Login")) # True
print(", ".join(["pass", "fail", "skip"])) # "pass, fail, skip"

# String slicing:
url = "https://example.com/login"
print(url[8:])       # "example.com/login"
print(url[-5:])      # "login"`,
        expected: `Login Test FAILED in 2.35s\nLOGIN TEST\nlogin test\nhello\nLogout Test\nTrue\npass, fail, skip\nexample.com/login\nlogin`
      },
      { type: 'heading', text: 'Lists', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `# Lists: ordered, mutable collections
test_cases = ["login", "signup", "checkout", "logout"]

print(test_cases[0])    # "login"   — index 0
print(test_cases[-1])   # "logout"  — last item

test_cases.append("profile")      # add to end
test_cases.insert(1, "home")      # insert at index 1
test_cases.remove("signup")       # remove by value
popped = test_cases.pop()         # remove and return last item

print(len(test_cases))            # count
print("login" in test_cases)      # True — membership check
test_cases.sort()                  # sort alphabetically in-place
print(test_cases)

# Slicing [start:stop:step]:
first_two = test_cases[:2]        # first 2 items`,
        expected: `login\nlogout\n4\nTrue\n['checkout', 'home', 'login', 'logout']`
      },
      { type: 'heading', text: 'Dictionaries', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `# Dictionaries: key-value pairs (like a JSON object)
test_result = {
    "id":       "TC-001",
    "name":     "Login Test",
    "status":   "PASS",
    "duration": 1.23,
    "tags":     ["smoke", "auth"]
}

# Access values:
print(test_result["status"])              # "PASS"
print(test_result.get("browser", "N/A")) # "N/A" — safe, no KeyError

# Modify:
test_result["status"] = "FAIL"            # update value
test_result["retry"]  = True              # add new key

# Iterate:
for key, value in test_result.items():
    print(f"  {key}: {value}")

print("tags" in test_result)             # True`,
        expected: `PASS\nN/A\n  id: TC-001\n  name: Login Test\n  status: FAIL\n  duration: 1.23\n  tags: ['smoke', 'auth']\n  retry: True\nTrue`
      },
      { type: 'heading', text: 'Conditions and Loops', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `results = [
    {"test": "login",    "status": "PASS"},
    {"test": "checkout", "status": "FAIL"},
    {"test": "profile",  "status": "PASS"},
    {"test": "logout",   "status": "SKIP"},
]

# if/elif/else:
pass_count = 0
for result in results:
    if result["status"] == "PASS":
        pass_count += 1
    elif result["status"] == "FAIL":
        print(f"  FAILED: {result['test']}")
    else:
        print(f"  Skipped: {result['test']}")

print(f"Passed: {pass_count}/{len(results)}")

# while loop:
retries = 0
while retries < 3:
    retries += 1
    print(f"Attempt {retries}")`,
        expected: `  FAILED: checkout\n  Skipped: logout\nPassed: 2/4\nAttempt 1\nAttempt 2\nAttempt 3`
      },
      { type: 'heading', text: 'Functions', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `# def keyword defines a function:
def calculate_pass_rate(passed: int, total: int) -> float:
    """Calculate the pass rate as a percentage."""
    if total == 0:
        return 0.0                       # avoid division by zero
    return (passed / total) * 100.0     # return computed value

rate = calculate_pass_rate(42, 50)
print(f"Pass rate: {rate:.1f}%")        # 84.0%

# Default parameter values:
def log_result(test_name, status="UNKNOWN", level="INFO"):
    print(f"[{level}] {test_name}: {status}")

log_result("Login Test", "PASS")
log_result("Signup Test")                # uses defaults`,
        expected: `Pass rate: 84.0%\n[INFO] Login Test: PASS\n[INFO] Signup Test: UNKNOWN`
      },
      { type: 'heading', text: 'Reading CSV Files', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        label: 'read_test_results.py',
        code: `import csv                              # built-in CSV module — no install needed

# test_results.csv:
# test_name,status,duration_ms
# Login Test,PASS,1200
# Signup Test,FAIL,3400

results = []                            # empty list to hold rows

with open("test_results.csv", "r") as f:     # open file (auto-closes)
    reader = csv.DictReader(f)               # headers become dict keys
    for row in reader:
        results.append(row)

# Count by status:
pass_count = sum(1 for r in results if r["status"] == "PASS")
fail_count = sum(1 for r in results if r["status"] == "FAIL")

print(f"Total: {len(results)}, PASS: {pass_count}, FAIL: {fail_count}")`,
        expected: `Total: 3, PASS: 2, FAIL: 1`
      },
    ],
  },

  // ── 3. INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    title: '🟡 Level 2: Intermediate Python',
    blocks: [
      { type: 'heading', text: 'List Comprehensions', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `results = [
    {"name": "Login",    "status": "PASS", "duration": 1200},
    {"name": "Checkout", "status": "FAIL", "duration": 5400},
    {"name": "Profile",  "status": "PASS", "duration": 800},
    {"name": "Logout",   "status": "SKIP", "duration": 0},
]

# List comprehension: [expression for item in iterable if condition]
failed = [r["name"] for r in results if r["status"] == "FAIL"]
print(failed)                     # ['Checkout']

# Transform all values:
durations_sec = [r["duration"] / 1000 for r in results]
print(durations_sec)              # [1.2, 5.4, 0.8, 0.0]

# Nested: list of dicts → list of strings
summaries = [f"{r['name']}:{r['status']}" for r in results]
print(summaries)`,
        expected: `['Checkout']\n[1.2, 5.4, 0.8, 0.0]\n['Login:PASS', 'Checkout:FAIL', 'Profile:PASS', 'Logout:SKIP']`
      },
      { type: 'heading', text: 'Exception Handling', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `import requests

def get_user(user_id: int) -> dict:
    """Fetch user from API with full error handling."""
    try:
        response = requests.get(
            f"https://api.example.com/users/{user_id}",
            timeout=5
        )
        response.raise_for_status()      # raises HTTPError if status >= 400
        return response.json()

    except requests.exceptions.ConnectionError:
        print("Cannot connect to server — is it running?")
        return {}

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error {e.response.status_code}: {e}")
        return {}

    except requests.exceptions.Timeout:
        print("Request timed out")
        return {}

    except Exception as e:               # unexpected errors
        print(f"Unexpected error: {e}")
        raise                            # re-raise — we want to know about this

    finally:
        print("get_user() call complete") # ALWAYS runs`,
      },
      { type: 'heading', text: 'Classes and OOP', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `class TestResult:
    """Represents a single test execution result."""
    total_runs = 0                          # class variable: shared by ALL instances

    def __init__(self, name: str, status: str, duration_ms: int = 0):
        """Constructor — called when you create a TestResult()."""
        self.name        = name             # instance variables (unique per object)
        self.status      = status
        self.duration_ms = duration_ms
        TestResult.total_runs += 1

    def is_passed(self) -> bool:
        return self.status == "PASS"

    def __repr__(self) -> str:
        return f"TestResult({self.name!r}, {self.status!r})"


class TimedTestResult(TestResult):
    """Extends TestResult with SLA checking."""

    def __init__(self, name, status, duration_ms, sla_ms=3000):
        super().__init__(name, status, duration_ms)  # call parent __init__
        self.sla_ms = sla_ms

    def is_within_sla(self) -> bool:
        return self.duration_ms <= self.sla_ms


r1 = TestResult("Login Test", "PASS", 1200)
r2 = TimedTestResult("Checkout", "PASS", 4500, sla_ms=3000)
print(r1)
print(r1.is_passed())
print(r2.is_within_sla())
print(f"Total runs: {TestResult.total_runs}")`,
        expected: `TestResult('Login Test', 'PASS')\nTrue\nFalse\nTotal runs: 2`
      },
      { type: 'heading', text: 'Regular Expressions', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `import re

EMAIL_PATTERN = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
DATE_PATTERN  = r'^\\d{4}-\\d{2}-\\d{2}$'    # YYYY-MM-DD

def validate_email(email: str) -> bool:
    return bool(re.match(EMAIL_PATTERN, email))

def find_all_urls(text: str) -> list:
    url_pattern = r'https?://[^\\s"]+'
    return re.findall(url_pattern, text)

def sanitize_name(name: str) -> str:
    return re.sub(r'[^a-z0-9_]', '_', name.lower())

print(validate_email("alice@example.com"))   # True
print(validate_email("not-an-email"))        # False

text = 'See https://example.com and http://test.io/docs for more'
print(find_all_urls(text))

print(sanitize_name("Login Test #1 (Mobile)"))`,
        expected: `True\nFalse\n['https://example.com', 'http://test.io/docs']\nlogin_test__1__mobile_`
      },
      { type: 'heading', text: 'Working with JSON', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `import json

# JSON string -> Python dict:
api_response = '{"user": {"id": 42, "email": "alice@test.com"}, "status": "active"}'
data = json.loads(api_response)          # parse JSON string
print(data["user"]["email"])             # alice@test.com

# Python dict -> JSON string:
test_report = {"run_id": "2024-01-15", "total": 50, "passed": 45}
json_str = json.dumps(test_report, indent=2)
print(json_str)

# Read/write JSON file:
with open("report.json", "w") as f:
    json.dump(test_report, f, indent=2)

with open("report.json", "r") as f:
    loaded = json.load(f)`,
        expected: `alice@test.com\n{\n  "run_id": "2024-01-15",\n  "total": 50,\n  "passed": 45\n}`
      },
      { type: 'heading', text: 'Page Object Model (Intermediate Example)', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        label: 'pages/login_page.py',
        code: `from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    """Base class for all Page Objects."""

    def __init__(self, driver):
        self.driver = driver
        self.wait   = WebDriverWait(driver, timeout=10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def fill(self, locator, text):
        el = self.wait.until(EC.visibility_of_element_located(locator))
        el.clear()
        el.send_keys(text)

    def get_text(self, locator) -> str:
        return self.wait.until(EC.visibility_of_element_located(locator)).text


class LoginPage(BasePage):
    """Page Object for the login page — inherits BasePage."""

    URL            = "https://example.com/login"
    USERNAME_INPUT = (By.ID, "username")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON   = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MSG      = (By.CLASS_NAME, "error-message")

    def navigate(self):
        self.driver.get(self.URL)

    def login(self, username: str, password: str):
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)

    def get_error_message(self) -> str:
        return self.get_text(self.ERROR_MSG)`,
      },
    ],
  },

  // ── 4. ADVANCED ─────────────────────────────────────────────────────────────
  {
    title: '🔴 Level 3: Advanced Python',
    blocks: [
      { type: 'heading', text: 'Decorators', difficulty: '🔴 Advanced' },
      { type: 'text', content: 'A decorator is a function that wraps another function to add behavior — without modifying the original. Applied with @ syntax. Think of it as "pre-processing + post-processing" around any function call.' },
      {
        type: 'code',
        code: `import time
import functools

# How decorators work — step by step:
def timer(func):
    @functools.wraps(func)            # preserves original function metadata
    def wrapper(*args, **kwargs):     # accepts any args
        start  = time.perf_counter()
        result = func(*args, **kwargs)  # call the original function
        end    = time.perf_counter()
        print(f"{func.__name__} took {(end - start) * 1000:.1f}ms")
        return result
    return wrapper

@timer                                # equivalent to: load_data = timer(load_data)
def load_data(path: str) -> list:
    # ... reads CSV ...
    return []

load_data("results.csv")
# Output: load_data took 12.3ms

# Retry decorator — critical for flaky tests:
def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise          # last attempt — re-raise
                    print(f"Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unstable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Intermittent failure")
    return {"status": "ok"}`,
        expected: `load_data took 12.3ms`
      },
      { type: 'heading', text: 'Context Managers', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `import sqlite3
from contextlib import contextmanager

# Custom context manager for DB connections:
@contextmanager
def get_db_connection(db_path: str):
    """Opens, yields, and auto-closes a DB connection."""
    conn = sqlite3.connect(db_path)    # setup
    try:
        yield conn                      # code inside "with" runs here
        conn.commit()                   # commit on success
    except Exception:
        conn.rollback()                 # rollback on any error
        raise
    finally:
        conn.close()                    # ALWAYS closes

# Usage:
with get_db_connection("test.db") as db:
    db.execute("CREATE TABLE IF NOT EXISTS runs (id INT, name TEXT)")
    db.execute("INSERT INTO runs VALUES (1, 'Login Test')")
# committed and closed automatically

print("DB operations complete")`,
        expected: `DB operations complete`
      },
      { type: 'heading', text: 'Type Hints', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `from typing import Optional, List, Dict, Union, Callable

# Type hints document intent and catch bugs with mypy:
def parse_results(
    raw_data: List[Dict[str, str]],    # list of string-keyed dicts
    filter_status: Optional[str] = None,
) -> Dict[str, int]:                    # returns str->int dict
    counts: Dict[str, int] = {"PASS": 0, "FAIL": 0, "SKIP": 0}
    for result in raw_data:
        status = result.get("status", "UNKNOWN")
        if filter_status and status != filter_status:
            continue
        counts[status] = counts.get(status, 0) + 1
    return counts

# Union: accepts multiple types:
def get_test_id(identifier: Union[int, str]) -> str:
    if isinstance(identifier, int):
        return f"TC-{identifier:04d}"
    return identifier

print(get_test_id(42))    # TC-0042
print(get_test_id("TC-007"))  # TC-007`,
        expected: `TC-0042\nTC-007`
      },
      { type: 'heading', text: 'Pytest Fundamentals', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        label: 'conftest.py',
        code: `import pytest
import sqlite3

# conftest.py — shared fixtures for all tests in the folder

@pytest.fixture(scope="session")       # ONE connection for entire test session
def db_conn():
    conn = sqlite3.connect(":memory:") # in-memory DB
    conn.execute("""
        CREATE TABLE users (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT    NOT NULL UNIQUE,
            role  TEXT    DEFAULT 'user'
        )
    """)
    conn.commit()
    yield conn
    conn.close()

@pytest.fixture(scope="function")      # fresh user for EACH test
def test_user(db_conn):
    db_conn.execute("INSERT INTO users (email, role) VALUES (?,?)",
                    ("test@example.com", "user"))
    db_conn.commit()
    yield {"email": "test@example.com", "role": "user"}
    db_conn.execute("DELETE FROM users WHERE email = ?", ("test@example.com",))
    db_conn.commit()`,
      },
      {
        type: 'code',
        label: 'test_users.py',
        code: `import pytest
import re

def test_user_exists_in_db(db_conn, test_user):
    cursor = db_conn.execute(
        "SELECT email FROM users WHERE email = ?",
        (test_user["email"],)
    )
    row = cursor.fetchone()
    assert row is not None, "User not found in DB after insert"
    assert row[0] == test_user["email"]

@pytest.mark.parametrize("email,should_be_valid", [
    ("alice@example.com", True),      # valid
    ("not-an-email",      False),     # missing @
    ("@nodomain.com",     False),     # missing local part
    ("user@.com",         False),     # missing domain
])
def test_email_validation(email, should_be_valid):
    """parametrize: runs once per tuple."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    result  = bool(re.match(pattern, email))
    assert result == should_be_valid

@pytest.mark.skip(reason="Feature not implemented yet")
def test_future_feature():
    pass

@pytest.mark.xfail(reason="Known bug #123 — pending fix")
def test_known_failing():
    assert False`,
      },
    ],
  },

  // ── 5. QA USE CASES ─────────────────────────────────────────────────────────
  {
    title: '🧪 Python in QA — Real Automation Scenarios',
    blocks: [
      { type: 'heading', text: 'Use Case 1: Parse JSON API Response & Assert Values' },
      {
        type: 'code',
        code: `import requests

def test_user_api():
    """Validate API response structure and data types."""
    response = requests.get(
        "https://jsonplaceholder.typicode.com/users/1",
        timeout=10
    )

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    data = response.json()

    # Assert required fields exist:
    assert "id"    in data, "Response missing 'id'"
    assert "name"  in data, "Response missing 'name'"
    assert "email" in data, "Response missing 'email'"

    # Assert correct data types:
    assert isinstance(data["id"],    int), "id must be integer"
    assert isinstance(data["name"],  str), "name must be string"

    # Assert business rules:
    assert data["id"] == 1
    assert "@" in data["email"], "email must contain @"

    print(f"OK: {data['name']} ({data['email']})")`,
      },
      { type: 'heading', text: 'Use Case 2: Data-Driven Tests from CSV' },
      {
        type: 'code',
        code: `import csv, pytest

def load_credentials(filepath: str) -> list:
    """Load test data from CSV for parametrize."""
    with open(filepath) as f:
        # CSV: username,password,expected_result
        return [(r["username"], r["password"], r["expected_result"])
                for r in csv.DictReader(f)]

@pytest.mark.parametrize(
    "username, password, expected",
    load_credentials("test_data/credentials.csv")
)
def test_login(username, password, expected, page):
    page.goto("/login")
    page.fill("#username", username)
    page.fill("#password", password)
    page.click("button[type='submit']")

    if expected == "PASS":
        assert page.url.endswith("/dashboard"), "Expected dashboard URL"
    else:
        assert page.locator(".error-msg").is_visible(), "Expected error message"`,
      },
      { type: 'heading', text: 'Use Case 3: Retry Decorator for Flaky Tests' },
      {
        type: 'code',
        code: `import functools, time

def retry(max_retries=3, delay=1.0, exceptions=(Exception,)):
    """Retry a function on specified exceptions with configurable delay."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_retries + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_retries:
                        raise           # exhausted retries
                    print(f"Attempt {attempt}/{max_retries} failed: {e}")
                    time.sleep(delay * attempt)   # exponential backoff
        return wrapper
    return decorator

@retry(max_retries=3, delay=1.0, exceptions=(ConnectionError, TimeoutError))
def fetch_auth_token() -> str:
    """Fetch auth token — may be slow on staging."""
    response = requests.post("/auth/token", json={"grant_type": "client_credentials"})
    response.raise_for_status()
    return response.json()["access_token"]`,
      },
      { type: 'heading', text: 'Use Case 4: Compare Two API Responses' },
      {
        type: 'code',
        code: `import requests

def compare_responses(url_v1: str, url_v2: str) -> dict:
    """Diff two API endpoints — returns dict of differences."""
    r1 = requests.get(url_v1).json()
    r2 = requests.get(url_v2).json()
    diffs = {}

    for key in set(r1.keys()) | set(r2.keys()):
        val1 = r1.get(key, "<MISSING>")
        val2 = r2.get(key, "<MISSING>")
        if val1 != val2:
            diffs[key] = {"v1": val1, "v2": val2}

    return diffs

diffs = compare_responses(
    "https://api.example.com/v1/config",
    "https://api.example.com/v2/config"
)

if diffs:
    print("Differences found between v1 and v2:")
    for field, values in diffs.items():
        print(f"  {field}: v1={values['v1']}  v2={values['v2']}")
else:
    print("APIs return identical responses")`,
      },
      { type: 'heading', text: 'Use Case 5: Pytest DB Fixture with Setup/Teardown' },
      {
        type: 'code',
        code: `import pytest, sqlite3

@pytest.fixture(scope="session")
def db():
    """Session-scoped SQLite DB — one connection for all tests."""
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE orders (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,
        user   TEXT    NOT NULL,
        amount REAL    NOT NULL,
        status TEXT    DEFAULT 'pending'
    )""")
    conn.commit()
    yield conn
    conn.close()

@pytest.fixture
def sample_order(db):
    """Insert a test order before each test, delete after."""
    cursor = db.execute(
        "INSERT INTO orders (user, amount, status) VALUES (?,?,?)",
        ("alice", 99.99, "pending")
    )
    db.commit()
    order_id = cursor.lastrowid
    yield order_id                 # test receives the order ID
    db.execute("DELETE FROM orders WHERE id = ?", (order_id,))
    db.commit()

def test_order_exists(db, sample_order):
    row = db.execute("SELECT status FROM orders WHERE id=?",
                     (sample_order,)).fetchone()
    assert row is not None
    assert row[0] == "pending"`,
      },
      { type: 'heading', text: 'Use Case 6: Validate Test Data with Regex' },
      {
        type: 'code',
        code: `import re, csv

VALIDATORS = {
    "email": re.compile(r'^[^@]+@[^@]+\\.[a-zA-Z]{2,}$'),
    "phone": re.compile(r'^[+]?[\\d\\s\\-()]{7,15}$'),
    "date":  re.compile(r'^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'),
}

def validate_row(row: dict) -> list:
    errors = []
    for field, pattern in VALIDATORS.items():
        value = row.get(field, "")
        if not pattern.match(value):
            errors.append(f"Invalid {field}: '{value}'")
    return errors

# Validate entire CSV:
all_errors = []
with open("test_users.csv") as f:
    for i, row in enumerate(csv.DictReader(f), 1):
        row_errors = validate_row(row)
        if row_errors:
            all_errors.append({"row": i, "errors": row_errors})

if all_errors:
    for e in all_errors:
        print(f"Row {e['row']}: {', '.join(e['errors'])}")
else:
    print("All test data is valid")`,
      },
      { type: 'heading', text: 'Use Case 7: Generate Test Report with Timestamp' },
      {
        type: 'code',
        code: `import json
from datetime import datetime
from pathlib import Path

def generate_report(results: list, output_dir: str = "reports") -> str:
    Path(output_dir).mkdir(exist_ok=True)

    report = {
        "generated_at": datetime.now().isoformat(),
        "total":   len(results),
        "passed":  sum(1 for r in results if r["status"] == "PASS"),
        "failed":  sum(1 for r in results if r["status"] == "FAIL"),
        "skipped": sum(1 for r in results if r["status"] == "SKIP"),
        "results": results
    }
    if report["total"]:
        report["pass_rate"] = round(report["passed"] / report["total"] * 100, 1)

    filename = f"{output_dir}/report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, "w") as f:
        json.dump(report, f, indent=2)

    print(f"Report: {filename} | Pass rate: {report.get('pass_rate', 0)}%")
    return filename`,
      },
    ],
  },

  // ── 6. INTERVIEW Q&A ────────────────────────────────────────────────────────
  {
    title: '💼 Python Interview Questions & Answers',
    blocks: [
      { type: 'text', content: 'Click each question to expand the model answer. Organized by difficulty.' },
      { type: 'subheading', text: '🟢 Basic Questions' },
      { type: 'qa', question: 'Q1: What is the difference between a list and a tuple?',
        answer: 'Lists are MUTABLE (can change after creation) and use []. Tuples are IMMUTABLE (cannot change) and use ().\n\nUse lists when the collection changes (appending results). Use tuples when data should be fixed — allowed status values, a (x,y) coordinate, a Selenium locator.',
        code: `results = ["PASS", "FAIL"]
results.append("SKIP")        # OK — lists are mutable

STATUS_OPTIONS = ("PASS", "FAIL", "SKIP")
# STATUS_OPTIONS.append("x")  # TypeError: tuple does not support append

# Tuples also unpack cleanly:
def get_viewport() -> tuple:
    return (1920, 1080)
width, height = get_viewport()` },
      { type: 'qa', question: 'Q2: What is None in Python?',
        answer: 'None is Python\'s null — the absence of a value. It\'s its own type (NoneType). All functions without a return statement implicitly return None.\n\nAlways check with "is None" or "is not None" — never use == None.',
        code: `value = None
print(value is None)        # True  ← correct
print(value == None)        # True  — works but wrong style

def log(event):
    print(event)
    # no return → implicitly returns None

result = log("click")
print(result is None)       # True

# Safe default with "or":
name = user.get("name") or "Anonymous"` },
      { type: 'qa', question: 'Q3: What is the difference between == and is?',
        answer: '== checks VALUE equality. "is" checks IDENTITY — whether two variables point to the SAME object in memory.\n\nRule: use "is" only for None, True, False. Use == for everything else.',
        code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True  — equal values
print(a is b)   # False — different objects
print(a is c)   # True  — same reference

# Correct None check:
result = None
print(result is None)    # True` },
      { type: 'qa', question: 'Q4: What does *args and **kwargs mean?',
        answer: '*args collects extra POSITIONAL arguments into a tuple. **kwargs collects extra KEYWORD arguments into a dict. They let functions accept any number of arguments — essential for writing decorators that wrap any function.',
        code: `def log_event(*args, **kwargs):
    print("args:", args)      # tuple of positional args
    print("kwargs:", kwargs)  # dict of keyword args

log_event("test_login", "FAIL", duration=2.3, retry=True)
# args: ('test_login', 'FAIL')
# kwargs: {'duration': 2.3, 'retry': True}

# Decorator must pass all args through:
def decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)  # pass everything through
    return wrapper` },
      { type: 'qa', question: 'Q5: What is a list comprehension?',
        answer: 'A concise one-line way to create a list: [expression for item in iterable if condition]. More readable than a for loop for simple transformations. Avoid nested comprehensions — use regular loops when logic is complex.',
        code: `results = [
    {"name": "Login",  "status": "FAIL"},
    {"name": "Signup", "status": "PASS"},
]

failed = [r["name"] for r in results if r["status"] == "FAIL"]
print(failed)   # ['Login']` },
      { type: 'subheading', text: '🟡 Intermediate Questions' },
      { type: 'qa', question: 'Q6: What is a decorator and how do you write one?',
        answer: 'A decorator is a function that takes a function, wraps it with behavior, and returns the wrapped version. In test automation: @retry, @timer, @pytest.fixture, @allure.step are all decorators. functools.wraps preserves the wrapped function\'s metadata.',
        code: `import functools, time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start  = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {(time.time()-start)*1000:.0f}ms")
        return result
    return wrapper

@timer
def load_test_data(path):
    return []

load_test_data("results.csv")
# Output: load_test_data took 12ms` },
      { type: 'qa', question: 'Q7: Explain pytest fixture scopes.',
        answer: 'function (default): new fixture per test. Use for isolation (create/delete user per test).\nclass: shared across all tests in one class.\nmodule: shared across all tests in one file.\nsession: shared across entire test session. Use for expensive setup — DB connections, browser instances, auth tokens.',
        code: `@pytest.fixture(scope="session")
def db():
    conn = create_connection()  # expensive — create ONCE
    yield conn
    conn.close()

@pytest.fixture(scope="function")
def test_user(db):              # cheap — recreate per test
    user = db.create_user("test@test.com")
    yield user
    db.delete_user(user.id)     # cleanup after each test` },
      { type: 'qa', question: 'Q8: What is exception handling in test automation?',
        answer: 'try/except/finally catches runtime errors. In automation: catch network errors so one failed API call doesn\'t crash the test runner. Use finally for cleanup (browser/connection always closes). Raise custom exceptions for better error messages.',
        code: `def safe_get(url: str):
    try:
        r = requests.get(url, timeout=5)
        r.raise_for_status()    # raises on 4xx/5xx
        return r.json()
    except requests.Timeout:
        pytest.fail(f"Timeout: {url}")
    except requests.HTTPError as e:
        pytest.fail(f"HTTP {e.response.status_code}")
    finally:
        pass  # cleanup, logging, etc.` },
      { type: 'qa', question: 'Q9: Difference between instance, class, and static methods?',
        answer: 'Instance method: first param is self — accesses instance state. Most common.\nClass method (@classmethod): first param is cls — accesses class state. Use for alternative constructors.\nStatic method (@staticmethod): no self/cls — pure utility function in the class namespace.',
        code: `class TestData:
    registry = []

    def __init__(self, name, status):
        self.name   = name
        self.status = status

    def is_passed(self):              # instance method
        return self.status == "PASS"

    @classmethod
    def from_dict(cls, data: dict):   # class method — alt constructor
        return cls(data["name"], data["status"])

    @staticmethod
    def valid_statuses() -> list:     # static utility
        return ["PASS", "FAIL", "SKIP"]` },
      { type: 'qa', question: 'Q10: How would you structure a Python test automation framework?',
        answer: 'Key layers: pages/ (Page Objects, one per page), tests/ (pytest files per feature), fixtures/ (conftest.py hierarchy), test_data/ (CSV, JSON files), utils/ (API clients, DB helpers), reports/ (git-ignored output), config/ (.env + config.py).\n\nPrinciples: DRY (no repeated locators), fixtures handle setup/teardown, parametrize drives data-driven tests, CI runs everything headless.',
        code: `# Recommended project structure:
# project/
# ├── conftest.py          <- session-scoped fixtures
# ├── pytest.ini           <- marks, base URL, reporters
# ├── requirements.txt
# ├── pages/
# │   ├── base_page.py
# │   └── login_page.py
# ├── tests/
# │   ├── conftest.py      <- test-level fixtures
# │   └── test_login.py
# ├── utils/
# │   └── api_client.py
# └── test_data/
#     └── users.csv` },
      { type: 'subheading', text: '🔴 Advanced Questions' },
      { type: 'qa', question: 'Q11: What is a generator? When to use in testing?',
        answer: 'A generator produces values one at a time using yield — lazy evaluation. Unlike a list, it doesn\'t store all values in memory. Use in testing for: generating large test datasets without memory issues, processing huge log files line-by-line.',
        code: `# List — 1M strings in memory upfront:
ids_list = [f"TC-{i:06d}" for i in range(1_000_000)]  # ~50MB RAM

# Generator — compute ONE at a time:
def id_generator(count: int):
    for i in range(count):
        yield f"TC-{i:06d}"   # pauses here, resumes on next()

gen = id_generator(1_000_000)   # almost no memory
print(next(gen))   # TC-000000
print(next(gen))   # TC-000001` },
      { type: 'qa', question: 'Q12: How do you write a retry decorator for flaky tests?',
        answer: 'Key elements: functools.wraps to preserve metadata, configurable max_retries + delay + exception types, exponential backoff between attempts, re-raise the last exception when all retries exhausted.',
        code: `def retry(max_attempts=3, delay=1.0, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    time.sleep(delay * attempt)  # exponential backoff
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError,))
def fetch_token() -> str:
    return requests.post("/auth").json()["token"]` },
      { type: 'qa', question: 'Q13: What is a context manager and how do you write a custom one?',
        answer: 'A context manager ensures setup and cleanup always happen — even if an exception occurs. Behind "with open(file) as f:". Write custom ones with @contextmanager decorator or __enter__/__exit__ methods.',
        code: `from contextlib import contextmanager

@contextmanager
def managed_page(browser):
    page = browser.new_page()
    try:
        yield page          # code inside "with" block runs here
    finally:
        page.close()        # ALWAYS executes

with managed_page(browser) as page:
    page.goto("/login")
    # page.close() called automatically even if assertion fails` },
    ],
  },

  // ── 7. PRACTICE & REFERENCE ─────────────────────────────────────────────────
  {
    title: '📝 Practice Exercises & Quick Reference',
    blocks: [
      { type: 'heading', text: 'Practice Exercises' },
      {
        type: 'exercise',
        difficulty: '🟢 Beginner',
        title: 'Exercise 1: Parse Test Results',
        description: 'Write a function parse_results(results) that takes a list of dicts (each with a "status" key: "PASS", "FAIL", or "SKIP") and returns a dict with counts: {"PASS": N, "FAIL": N, "SKIP": N, "total": N}.',
        hint: 'Initialize counts dict before the loop. Use .get(status, "UNKNOWN") for safety.',
        solution: `def parse_results(results: list) -> dict:
    counts = {"PASS": 0, "FAIL": 0, "SKIP": 0}

    for result in results:
        status = result.get("status", "UNKNOWN")
        if status in counts:
            counts[status] += 1

    counts["total"] = len(results)
    return counts

# Test it:
data = [
    {"test": "login",    "status": "PASS"},
    {"test": "checkout", "status": "FAIL"},
    {"test": "signup",   "status": "PASS"},
    {"test": "profile",  "status": "SKIP"},
]
print(parse_results(data))
# {'PASS': 2, 'FAIL': 1, 'SKIP': 1, 'total': 4}`,
        explanation: 'Initialize counts before the loop. .get() with default avoids KeyError. Add "total" at the end so it reflects all items including unknowns.',
      },
      {
        type: 'exercise',
        difficulty: '🟡 Intermediate',
        title: 'Exercise 2: APIClient Class',
        description: 'Create class APIClient with base_url, and get(path) / post(path, data) methods returning parsed JSON. Handle ConnectionError (return None), Timeout (return None), HTTPError (raise). Use requests.Session for connection reuse.',
        hint: 'Use requests.Session() in __init__. response.raise_for_status() auto-raises on 4xx/5xx.',
        solution: `import requests

class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout  = timeout
        self.session  = requests.Session()

    def get(self, path: str) -> dict | None:
        try:
            r = self.session.get(
                f"{self.base_url}/{path.lstrip('/')}",
                timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            print(f"Cannot connect to {self.base_url}")
            return None
        except requests.Timeout:
            print(f"Request timed out after {self.timeout}s")
            return None
        except requests.HTTPError as e:
            raise RuntimeError(f"HTTP {e.response.status_code}: {path}")

    def post(self, path: str, data: dict) -> dict | None:
        try:
            r = self.session.post(
                f"{self.base_url}/{path.lstrip('/')}",
                json=data, timeout=self.timeout
            )
            r.raise_for_status()
            return r.json()
        except requests.ConnectionError:
            return None

# Usage:
client = APIClient("https://jsonplaceholder.typicode.com")
user = client.get("/users/1")
print(user["name"])   # Leanne Graham`,
        explanation: 'Session reuses TCP connections reducing overhead. Separating network errors (return None) from HTTP errors (raise) gives callers different options.',
      },
      {
        type: 'exercise',
        difficulty: '🔴 Advanced',
        title: 'Exercise 3: pytest conftest with Session DB + CSV Parametrize',
        description: 'Write conftest.py with session-scoped SQLite fixture (creates users table). Write test_users.py that loads test data from CSV via parametrize and validates each user\'s email in the DB.',
        hint: 'conftest.py scope="session". Use load_csv() inside @pytest.mark.parametrize([...]).',
        solution: `# conftest.py
import pytest, sqlite3, csv

def load_user_csv():
    with open("test_data/users.csv") as f:
        return [(r["email"], r["role"]) for r in csv.DictReader(f)]

@pytest.fixture(scope="session")
def db():
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE users (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT    NOT NULL UNIQUE,
        role  TEXT    DEFAULT 'user'
    )""")
    conn.commit()
    yield conn
    conn.close()

# test_users.py
import re

EMAIL_RE = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')

@pytest.mark.parametrize("email,role", [
    ("alice@test.com", "admin"),
    ("bob@test.com",   "user"),
])
def test_user_validation(db, email, role):
    assert EMAIL_RE.match(email), f"Invalid email: {email}"

    db.execute("INSERT INTO users (email, role) VALUES (?,?)", (email, role))
    db.commit()

    row = db.execute("SELECT role FROM users WHERE email=?", (email,)).fetchone()
    assert row is not None
    assert row[0] == role

    db.execute("DELETE FROM users WHERE email=?", (email,))
    db.commit()`,
        explanation: 'Session scope: DB persists across all tests (efficient). Each test cleans up its own data to avoid state leaking between tests. parametrize drives multiple scenarios from one function.',
      },
      { type: 'heading', text: 'Quick Reference Card' },
      {
        type: 'table',
        headers: ['Concept', 'Syntax', 'Example'],
        rows: [
          ['f-string', 'f"{var}"', 'f"Test {name}: {status}"'],
          ['List comprehension', '[expr for x in lst if cond]', '[r["name"] for r in res if r["status"]=="FAIL"]'],
          ['Dict safe get', 'dict.get(key, default)', 'row.get("status", "UNKNOWN")'],
          ['Unpacking', 'a, b = iterable', 'width, height = (1920, 1080)'],
          ['Type hint', 'param: type', 'def fn(name: str) -> bool:'],
          ['Optional', 'Optional[T]', 'def fn(x: Optional[str] = None)'],
          ['Decorator', '@decorator', '@retry(max_attempts=3)'],
          ['Context manager', 'with expr as var:', 'with open("f.txt") as f:'],
          ['Generator', 'yield value', 'def gen(): yield item'],
          ['Fixture (pytest)', '@pytest.fixture(scope=...)', '@pytest.fixture(scope="session")'],
          ['Parametrize', '@pytest.mark.parametrize()', '@pytest.mark.parametrize("x,y", [(1,2)])'],
          ['Assert with msg', 'assert expr, "msg"', 'assert status == "PASS", f"Got {status}"'],
          ['Regex match', 're.match(pattern, s)', 're.match(r"^\\d+$", "123")'],
          ['JSON parse', 'json.loads(str)', 'data = json.loads(response.text)'],
          ['CSV read', 'csv.DictReader(f)', 'for row in csv.DictReader(f):'],
        ]
      },
      { type: 'tip', content: 'Run "python -m pytest -v --tb=short" for verbose output with compact tracebacks. Add "--headed" to Playwright to see the browser while debugging.' },
    ],
  },
]

const trHero = {
  title: '🐍 Python',
  subtitle: 'QA Mühendisleri için Python ve Test Otomasyonu',
  intro: 'Python\'u sıfırdan öğrenin, test otomasyonuna odaklanın. Temel kodlamadan gelişmiş pytest çerçevelerine kadar — modern bir QA mühendisinin ihtiyaç duyduğu her şey burada.',
}

const trTabs = ['🎯 Giriş', '📦 Kurulum', '🟢 Temeller', '🟡 Orta Seviye', '🔴 İleri Seviye', '🧪 QA Kullanım', '💼 Mülakat', '📝 Pratik & Referans']

const enHero = {
  title: '🐍 Python',
  subtitle: 'Python for QA Engineers & Test Automation',
  intro: 'Learn Python from scratch with a focus on test automation. From basic scripting to advanced pytest frameworks — everything a modern QA engineer needs to write reliable, maintainable tests.',
}

const enTabs = ['🎯 Intro & Why', '📦 Installation', '🟢 Foundations', '🟡 Intermediate', '🔴 Advanced', '🧪 QA Use Cases', '💼 Interview Q&A', '📝 Practice & Reference']

export const pythonData = {
  en: { hero: enHero, tabs: enTabs, sections },
  tr: { hero: trHero, tabs: trTabs, sections },
}
