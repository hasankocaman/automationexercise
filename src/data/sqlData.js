export const sqlData = {
  en: {
    hero: {
      title: '🗄️ SQL',
      subtitle: 'Database Testing & Query Mastery',
      intro: 'Learn SQL from zero — understand databases, write queries, and use SQL to power your test automation for backend verification, data seeding, and cleanup.',
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Intermediate', '🚀 Advanced', '💼 Interview Q&A'],
    sections: [
      // ── 0. INTRODUCTION ───────────────────────────────────────────────────
      {
        title: '🎯 What is SQL and Why Does it Matter for Testers?',
        blocks: [
          { type: 'text', content: 'Imagine an online store. When a user registers, the data goes somewhere — a database. When you test that registration form, clicking "Submit" isn\'t enough. A thorough tester asks: "Was the data actually saved correctly in the database?" This is where SQL comes in.' },
          { type: 'text', content: 'SQL (Structured Query Language) is the universal language for talking to relational databases. Every major application — banking systems, e-commerce sites, healthcare platforms — stores its data in a relational database and uses SQL to manage it.' },
          { type: 'heading', text: 'What is a Relational Database?' },
          { type: 'text', content: 'A relational database stores data in tables (like spreadsheets), where rows are individual records and columns are attributes. Tables are related to each other through keys.' },
          {
            type: 'code', code: `-- Example: A simple "users" table
+----+----------+--------------------+-----+----------+
| id | name     | email              | age | country  |
+----+----------+--------------------+-----+----------+
|  1 | Alice    | alice@example.com  |  28 | TR       |
|  2 | Bob      | bob@example.com    |  34 | US       |
|  3 | Charlie  | charlie@example.com|  22 | UK       |
+----+----------+--------------------+-----+----------+

-- id = Primary Key (unique identifier for each row)
-- email = could have a UNIQUE constraint
-- country = could be a Foreign Key to a "countries" table`
          },
          { type: 'heading', text: 'SQL in Test Automation — Why Every Tester Needs It' },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '✅', label: 'Verify DB State', desc: 'After a UI action, confirm the database record was created/updated correctly.' },
              { icon: '🌱', label: 'Seed Test Data', desc: 'Insert test users, products, orders directly into DB before tests run.' },
              { icon: '🧹', label: 'Cleanup After Tests', desc: 'DELETE test records so each test run starts with a clean state.' },
              { icon: '🔍', label: 'Backend Validation', desc: 'Verify business logic: e.g., order totals match line items.' },
              { icon: '⚡', label: 'Faster than UI', desc: 'Querying DB is 100x faster than navigating UI to find data.' },
              { icon: '🐛', label: 'Find Hidden Bugs', desc: 'UI may show success but DB was not updated — SQL reveals the truth.' },
            ]
          },
          { type: 'heading', text: 'Key Terminology' },
          {
            type: 'list', icon: '📌',
            items: [
              { label: 'Table', desc: 'A structured set of data organized in rows and columns (like a spreadsheet).' },
              { label: 'Row / Record', desc: 'A single data entry in a table (one user, one order).' },
              { label: 'Column / Field', desc: 'An attribute of the data (name, email, age).' },
              { label: 'Primary Key (PK)', desc: 'A unique identifier for each row — no two rows can have the same PK.' },
              { label: 'Foreign Key (FK)', desc: 'A column that references the Primary Key of another table, creating a relationship.' },
              { label: 'Index', desc: 'A data structure that speeds up searches on a column (like a book index).' },
              { label: 'Schema', desc: 'The structure/blueprint of a database: all tables, columns, types, and constraints.' },
              { label: 'Query', desc: 'A request for data or action sent to the database using SQL.' },
            ]
          },
          { type: 'heading', text: 'Popular Relational Databases' },
          {
            type: 'table',
            headers: ['Database', 'Type', 'Best For', 'Free?'],
            rows: [
              ['MySQL', 'Open-source', 'Web apps, WordPress, most common', '✅ Yes'],
              ['PostgreSQL', 'Open-source', 'Complex queries, JSON, enterprise', '✅ Yes'],
              ['SQLite', 'Embedded', 'Local dev, mobile apps, testing', '✅ Yes'],
              ['Microsoft SQL Server', 'Commercial', 'Windows/.NET enterprise', '✅ Express edition'],
              ['Oracle', 'Commercial', 'Large enterprise, banking', '❌ Paid'],
              ['MariaDB', 'Open-source', 'MySQL drop-in replacement', '✅ Yes'],
            ]
          },
          { type: 'tip', content: 'For learning SQL, start with SQLite (no server needed) or use a free online playground like sqlfiddle.com or db-fiddle.com.' },
        ],
      },

      // ── 1. INSTALLATION ───────────────────────────────────────────────────
      {
        title: '📦 Setting Up Your SQL Environment',
        blocks: [
          { type: 'text', content: 'You have several options — from zero-install online playgrounds to full database servers. Choose based on your goal.' },
          { type: 'heading', text: 'Option A: Online Playground (No Installation)' },
          {
            type: 'list', icon: '🌐',
            items: [
              { label: 'db-fiddle.com', desc: 'Best option. Supports MySQL, PostgreSQL, SQLite. Free.' },
              { label: 'sqlfiddle.com', desc: 'Classic option. Multiple DB types supported.' },
              { label: 'sqliteonline.com', desc: 'SQLite in browser. Fast and simple.' },
            ]
          },
          { type: 'info', content: 'For learning SQL syntax and practicing queries, online playgrounds are perfect. No installation, no configuration.' },
          { type: 'heading', text: 'Option B: SQLite (Lightest Local Option)' },
          { type: 'text', content: 'SQLite is a serverless database — just a single .db file. Perfect for learning, local development, and automated testing.' },
          {
            type: 'steps',
            items: [
              'Download from sqlite.org/download.html (sqlite-tools-win32 for Windows)',
              'Extract the zip to C:\\sqlite\\',
              'Open terminal in that folder',
              'Type: sqlite3 mytest.db to create/open a database',
              'You\'re in! Type .help to see commands',
            ]
          },
          {
            type: 'code', code: `# SQLite CLI quick reference:
sqlite3 mytest.db     # Open (or create) a database

.tables               # List all tables
.schema users         # Show CREATE TABLE for "users"
.headers on           # Show column names in results
.mode column          # Pretty column-aligned output
.quit                 # Exit SQLite

# Run a query:
SELECT * FROM users;`
          },
          { type: 'heading', text: 'Option C: MySQL / MariaDB' },
          {
            type: 'code', code: `# macOS (Homebrew):
brew install mysql
brew services start mysql
mysql -u root

# Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/
# Choose "Developer Default" during setup

# Linux (Ubuntu/Debian):
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql -u root

# Verify installation:
mysql --version`
          },
          { type: 'heading', text: 'Option D: PostgreSQL' },
          {
            type: 'code', code: `# macOS (Homebrew):
brew install postgresql@15
brew services start postgresql@15
psql postgres

# Windows: Download from postgresql.org/download/windows/
# Use the installer — includes pgAdmin GUI

# Linux (Ubuntu):
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql

# Verify:
psql --version`
          },
          { type: 'heading', text: 'GUI Tool: DBeaver (Recommended)' },
          { type: 'text', content: 'DBeaver is a free, universal database GUI that works with ALL databases (MySQL, PostgreSQL, SQLite, Oracle, etc.). Much easier than the command line for exploration.' },
          {
            type: 'steps',
            items: [
              'Download DBeaver Community from dbeaver.io (free)',
              'Install and launch DBeaver',
              'Click "New Database Connection" (the plug icon)',
              'Select your database type (SQLite, MySQL, PostgreSQL)',
              'Fill in connection details (host, port, username, password)',
              'Click "Test Connection" → if green, click Finish',
              'Use the SQL Editor (Ctrl+]) to write and run queries',
            ]
          },
          { type: 'heading', text: 'Using SQL in Python Automation' },
          {
            type: 'code', code: `# SQLite (built into Python, no install needed):
import sqlite3

conn = sqlite3.connect('test.db')   # Connect (creates file if not exists)
cursor = conn.cursor()

# Execute a query:
cursor.execute("SELECT * FROM users WHERE age > 25")
rows = cursor.fetchall()
for row in rows:
    print(row)

conn.close()

# PostgreSQL (install: pip install psycopg2-binary):
import psycopg2

conn = psycopg2.connect(
    host="localhost", database="testdb",
    user="postgres", password="mypassword"
)
cursor = conn.cursor()
cursor.execute("SELECT count(*) FROM orders WHERE status = 'pending'")
count = cursor.fetchone()[0]
print(f"Pending orders: {count}")
conn.close()`
          },
        ],
      },

      // ── 2. INTERMEDIATE ───────────────────────────────────────────────────
      {
        title: '📚 Core SQL — Queries You Use Every Day',
        blocks: [
          { type: 'heading', text: 'CREATE TABLE — Defining Structure' },
          {
            type: 'code', code: `-- Create a users table with common data types
CREATE TABLE users (
    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique, auto-increments
    username    VARCHAR(50)   NOT NULL UNIQUE,             -- text, max 50 chars, must be unique
    email       VARCHAR(100)  NOT NULL,
    password    VARCHAR(255)  NOT NULL,
    age         INT           CHECK (age >= 0 AND age <= 150),
    country     CHAR(2)       DEFAULT 'TR',               -- fixed 2-char country code
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      ON UPDATE CURRENT_TIMESTAMP
);

-- Common SQL data types:
-- INT / BIGINT        → whole numbers
-- DECIMAL(10,2)       → precise decimals (e.g., prices: 99.99)
-- VARCHAR(n)          → variable-length text up to n chars
-- TEXT                → unlimited text
-- CHAR(n)             → fixed-length text
-- BOOLEAN / TINYINT   → true/false
-- DATE                → 2024-01-15
-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00`
          },
          { type: 'heading', text: 'INSERT — Adding Data' },
          {
            type: 'code', code: `-- Single row insert:
INSERT INTO users (username, email, password, age, country)
VALUES ('alice', 'alice@example.com', 'hashed_pw', 28, 'TR');

-- Multiple rows at once (much faster!):
INSERT INTO users (username, email, password, age, country) VALUES
    ('bob',     'bob@example.com',     'hash2', 34, 'US'),
    ('charlie', 'charlie@example.com', 'hash3', 22, 'UK'),
    ('diana',   'diana@example.com',   'hash4', 29, 'TR');

-- Insert with SELECT (copy data):
INSERT INTO users_archive
SELECT * FROM users WHERE created_at < '2023-01-01';`
          },
          { type: 'heading', text: 'SELECT — Reading Data' },
          {
            type: 'code', code: `-- Select all columns:
SELECT * FROM users;

-- Select specific columns:
SELECT id, username, email FROM users;

-- WHERE — filtering:
SELECT * FROM users WHERE country = 'TR';
SELECT * FROM users WHERE age > 25 AND is_active = TRUE;
SELECT * FROM users WHERE country IN ('TR', 'US', 'UK');
SELECT * FROM users WHERE username LIKE 'a%';    -- starts with 'a'
SELECT * FROM users WHERE email LIKE '%@gmail%'; -- contains @gmail
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE country IS NULL;
SELECT * FROM users WHERE country IS NOT NULL;

-- ORDER BY — sorting:
SELECT * FROM users ORDER BY age ASC;       -- youngest first
SELECT * FROM users ORDER BY created_at DESC; -- newest first
SELECT * FROM users ORDER BY country, age DESC; -- multiple columns

-- LIMIT / OFFSET — pagination:
SELECT * FROM users LIMIT 10;              -- first 10 rows
SELECT * FROM users LIMIT 10 OFFSET 20;   -- rows 21-30 (page 3)

-- DISTINCT — remove duplicates:
SELECT DISTINCT country FROM users;

-- Aliases:
SELECT username AS 'User Name', email AS 'Email Address' FROM users;`
          },
          { type: 'heading', text: 'UPDATE and DELETE' },
          {
            type: 'code', code: `-- UPDATE — modify existing rows:
UPDATE users SET is_active = FALSE WHERE id = 3;
UPDATE users SET country = 'TR', age = age + 1 WHERE username = 'alice';

-- DELETE — remove rows:
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE created_at < '2020-01-01';  -- old records

-- ⚠️ DANGER: Always use WHERE with UPDATE and DELETE!
-- DELETE FROM users;  ← deletes ALL rows!
-- UPDATE users SET password = 'x';  ← updates ALL rows!

-- Safe pattern: test your WHERE first with SELECT, then DELETE:
SELECT * FROM users WHERE email LIKE '%test%';  -- verify first
DELETE FROM users WHERE email LIKE '%test%';    -- then delete`
          },
          { type: 'warning', content: 'Always run a SELECT with your WHERE clause before executing UPDATE or DELETE to verify you\'re targeting the right rows. One wrong DELETE can wipe critical data.' },
          { type: 'heading', text: 'JOINs — Combining Tables' },
          { type: 'text', content: 'JOINs are one of the most powerful SQL features. They let you combine data from multiple related tables in a single query.' },
          {
            type: 'code', code: `-- Our tables:
-- users:  id, username, email
-- orders: id, user_id, total, status, created_at
-- products: id, name, price
-- order_items: id, order_id, product_id, quantity

-- INNER JOIN: only rows that match in BOTH tables
SELECT u.username, o.id AS order_id, o.total, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Result: only users who HAVE orders

-- LEFT JOIN: ALL rows from left table, matching from right (NULL if no match)
SELECT u.username, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;
-- Result: ALL users, even those with 0 orders (order_count = 0)

-- RIGHT JOIN: ALL rows from right table, matching from left
SELECT o.id, u.username
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
-- Result: ALL orders (even orphaned ones without a user)

-- Multiple JOINs:
SELECT u.username, p.name AS product, oi.quantity, o.status
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'delivered';`
          },
          { type: 'heading', text: 'Aggregate Functions & GROUP BY' },
          {
            type: 'code', code: `-- COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) FROM users WHERE is_active = TRUE;
SELECT SUM(total) AS revenue FROM orders WHERE status = 'paid';
SELECT AVG(age) AS avg_age FROM users;
SELECT MIN(total), MAX(total) FROM orders;

-- GROUP BY — aggregate per group:
SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country
ORDER BY user_count DESC;

-- HAVING — filter AFTER grouping (WHERE can't use aggregate functions):
SELECT country, COUNT(*) AS user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 5;   -- only countries with more than 5 users

-- Combined example:
SELECT status,
       COUNT(*)          AS order_count,
       SUM(total)        AS total_revenue,
       AVG(total)        AS avg_order_value,
       MAX(total)        AS biggest_order
FROM orders
WHERE created_at >= '2024-01-01'
GROUP BY status
HAVING COUNT(*) > 10
ORDER BY total_revenue DESC;`
          },
          { type: 'heading', text: 'Subqueries' },
          {
            type: 'code', code: `-- Subquery in WHERE (scalar subquery):
SELECT * FROM users
WHERE id IN (
    SELECT DISTINCT user_id FROM orders WHERE total > 1000
);

-- Subquery in FROM (derived table):
SELECT country, avg_age
FROM (
    SELECT country, AVG(age) AS avg_age
    FROM users
    GROUP BY country
) AS country_stats
WHERE avg_age > 30;

-- Correlated subquery (references outer query):
SELECT u.username, u.email,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count
FROM users u
WHERE u.is_active = TRUE;

-- EXISTS — check if a subquery returns any rows:
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.status = 'pending'
);`
          },
          { type: 'heading', text: 'NULL Handling' },
          {
            type: 'code', code: `-- NULL means "no value / unknown" — NOT the same as 0 or empty string!
-- NULL comparisons must use IS NULL / IS NOT NULL, not = or !=

SELECT * FROM users WHERE phone IS NULL;          -- ✅ correct
SELECT * FROM users WHERE phone = NULL;           -- ❌ always returns 0 rows!

-- COALESCE: return first non-NULL value
SELECT username, COALESCE(phone, 'N/A') AS phone FROM users;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(discount, 0) AS discount FROM orders;  -- NULL instead of 0

-- IFNULL (MySQL): simpler COALESCE for 2 values
SELECT username, IFNULL(phone, 'Not provided') FROM users;`
          },
        ],
      },

      // ── 3. ADVANCED ───────────────────────────────────────────────────────
      {
        title: '🚀 Advanced SQL',
        blocks: [
          { type: 'heading', text: 'Window Functions — Powerful Analytics' },
          { type: 'text', content: 'Window functions perform calculations across a set of rows related to the current row — without collapsing rows like GROUP BY does.' },
          {
            type: 'code', code: `-- ROW_NUMBER: assign sequential row numbers
SELECT username, total,
       ROW_NUMBER() OVER (ORDER BY total DESC) AS rank
FROM orders;

-- RANK and DENSE_RANK (handles ties differently):
SELECT username, total,
       RANK()       OVER (ORDER BY total DESC) AS rank,       -- gaps after ties
       DENSE_RANK() OVER (ORDER BY total DESC) AS dense_rank  -- no gaps
FROM orders;

-- PARTITION BY: reset numbering per group
SELECT username, country, total,
       ROW_NUMBER() OVER (PARTITION BY country ORDER BY total DESC) AS country_rank
FROM users u JOIN orders o ON u.id = o.user_id;
-- → Rank 1 for each country's top spender

-- LAG / LEAD: access previous/next row
SELECT order_date, total,
       LAG(total)  OVER (ORDER BY order_date) AS prev_total,
       LEAD(total) OVER (ORDER BY order_date) AS next_total,
       total - LAG(total) OVER (ORDER BY order_date) AS change
FROM orders WHERE user_id = 1;

-- Running total with SUM OVER:
SELECT order_date, total,
       SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;`
          },
          { type: 'heading', text: 'CTEs — Common Table Expressions' },
          { type: 'text', content: 'CTEs (WITH clause) make complex queries readable by breaking them into named, reusable sub-queries.' },
          {
            type: 'code', code: `-- Basic CTE:
WITH active_users AS (
    SELECT id, username, email
    FROM users
    WHERE is_active = TRUE
)
SELECT * FROM active_users WHERE username LIKE 'a%';

-- Multiple CTEs:
WITH
high_value_orders AS (
    SELECT user_id, SUM(total) AS lifetime_value
    FROM orders
    WHERE status = 'paid'
    GROUP BY user_id
    HAVING SUM(total) > 5000
),
vip_users AS (
    SELECT u.id, u.username, u.email, hvo.lifetime_value
    FROM users u
    JOIN high_value_orders hvo ON u.id = hvo.user_id
)
SELECT * FROM vip_users ORDER BY lifetime_value DESC;

-- Recursive CTE (for hierarchical data like org charts):
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL          -- start with CEO

    UNION ALL

    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT level, name FROM org_tree ORDER BY level, name;`
          },
          { type: 'heading', text: 'Indexes — Speed Up Queries' },
          {
            type: 'code', code: `-- Create an index on a frequently searched column:
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status_date ON orders(status, created_at);  -- composite

-- Unique index (also enforces uniqueness constraint):
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- View existing indexes:
SHOW INDEX FROM users;           -- MySQL
\di users                        -- PostgreSQL

-- Drop an index:
DROP INDEX idx_users_email ON users;

-- When to create indexes:
-- ✅ Columns used in WHERE clauses frequently
-- ✅ Columns used in JOIN conditions (foreign keys)
-- ✅ Columns used in ORDER BY frequently
-- ❌ Small tables (full scan is faster)
-- ❌ Columns updated very frequently (index maintenance overhead)
-- ❌ Columns with very low cardinality (e.g., boolean: only 2 values)`
          },
          { type: 'heading', text: 'Transactions & ACID' },
          {
            type: 'code', code: `-- A transaction ensures ALL operations succeed or ALL are rolled back.
-- ACID = Atomicity, Consistency, Isolation, Durability

-- Example: Transfer money between accounts
START TRANSACTION;  -- or BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- credit

-- If everything is OK:
COMMIT;

-- If something went wrong:
ROLLBACK;  -- undo ALL changes in this transaction

-- Practical use in testing (Python):
import psycopg2

conn = psycopg2.connect(DSN)
try:
    cur = conn.cursor()
    cur.execute("INSERT INTO test_users (name) VALUES ('test_alice')")
    cur.execute("INSERT INTO test_orders (user_id) VALUES (LASTVAL())")
    conn.commit()  # both succeed → commit
except Exception as e:
    conn.rollback()  # any failure → undo both
    raise e
finally:
    conn.close()`
          },
          { type: 'heading', text: 'EXPLAIN — Query Optimization' },
          {
            type: 'code', code: `-- EXPLAIN shows how the database plans to execute a query
-- Use it to find slow queries (full table scans = bad)

EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';

-- MySQL EXPLAIN output columns:
-- type: "ALL" (full scan, bad) vs "ref"/"eq_ref"/"const" (index, good)
-- key: which index is being used (NULL = no index!)
-- rows: estimated rows examined (lower = better)
-- Extra: "Using filesort", "Using temporary" = potential problems

-- EXPLAIN ANALYZE (PostgreSQL) actually runs the query:
EXPLAIN ANALYZE SELECT * FROM users WHERE country = 'TR';

-- Before adding index:
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- → type: ALL, rows: 50000  ← full table scan!

-- After: CREATE INDEX idx_orders_user ON orders(user_id);
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- → type: ref, rows: 3  ← uses index, much faster!`
          },
          { type: 'heading', text: 'SQL for Test Automation — Practical Patterns' },
          {
            type: 'code', code: `# Pattern 1: Verify UI action in DB (pytest + SQLite)
import sqlite3, pytest

@pytest.fixture
def db():
    conn = sqlite3.connect('app.db')
    yield conn
    conn.close()

def test_user_registration_saves_to_db(browser, db):
    # UI: register a new user
    browser.goto('/register')
    browser.fill('[name=username]', 'testuser99')
    browser.fill('[name=email]', 'test99@example.com')
    browser.click('button[type=submit]')

    # DB: verify the record exists
    cur = db.cursor()
    cur.execute("SELECT * FROM users WHERE email = 'test99@example.com'")
    user = cur.fetchone()
    assert user is not None, "User was not saved to database!"
    assert user[2] == 'test99@example.com'

# Pattern 2: Seed data before test
@pytest.fixture
def test_user(db):
    cur = db.cursor()
    cur.execute("INSERT INTO users (username, email) VALUES (?, ?)",
                ('fixture_user', 'fixture@test.com'))
    db.commit()
    user_id = cur.lastrowid
    yield user_id
    # Cleanup:
    cur.execute("DELETE FROM users WHERE id = ?", (user_id,))
    db.commit()

# Pattern 3: Verify DB is clean after delete action
def test_delete_user_removes_from_db(browser, db, test_user):
    browser.goto(f'/users/{test_user}/delete')
    browser.click('button#confirm-delete')

    cur = db.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE id = ?", (test_user,))
    count = cur.fetchone()[0]
    assert count == 0, "User was not deleted from database!"`
          },
        ],
      },

      // ── 4. INTERVIEW Q&A ──────────────────────────────────────────────────
      {
        title: '💼 SQL Interview Questions & Answers',
        blocks: [
          { type: 'text', content: 'The most frequently asked SQL interview questions for QA engineers and developers. Click each question to expand the answer.' },
          {
            type: 'qa',
            question: 'Q1: What is the difference between WHERE and HAVING?',
            answer: 'WHERE filters rows BEFORE grouping (used on individual row values).\nHAVING filters groups AFTER grouping (used on aggregate function results).\n\nRule: If you need to filter based on COUNT, SUM, AVG etc. → use HAVING. Otherwise → use WHERE.',
            code: `-- WHERE: filter before aggregation
SELECT * FROM orders WHERE total > 100;

-- HAVING: filter after aggregation
SELECT user_id, SUM(total) AS lifetime
FROM orders
GROUP BY user_id
HAVING SUM(total) > 5000;  -- only users who spent > 5000 total

-- Can combine both:
SELECT user_id, COUNT(*) AS order_count
FROM orders
WHERE status = 'paid'          -- filter rows first
GROUP BY user_id
HAVING COUNT(*) > 3;           -- then filter groups`
          },
          {
            type: 'qa',
            question: 'Q2: Explain the different types of JOINs.',
            answer: 'INNER JOIN: Returns rows where there is a match in BOTH tables. Unmatched rows from either table are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table and matching rows from the right. NULLs for unmatched right-side columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table and matching rows from the left.\n\nFULL (OUTER) JOIN: Returns ALL rows from BOTH tables. NULLs where there is no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right (rarely used).',
            code: `SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;   -- only users WITH orders

SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;    -- ALL users, orders or NULL`
          },
          {
            type: 'qa',
            question: 'Q3: What is the difference between DELETE, TRUNCATE, and DROP?',
            answer: 'DELETE: Removes specific rows matching a WHERE clause. Supports transactions (can ROLLBACK). Triggers fire. Slower for large datasets.\n\nTRUNCATE: Removes ALL rows from a table instantly. Cannot be filtered. Cannot ROLLBACK in MySQL (can in PostgreSQL). Does not fire row-level triggers. Faster than DELETE.\n\nDROP: Permanently deletes the ENTIRE table (structure + data). Cannot be rolled back (usually). Table ceases to exist.',
            code: `DELETE FROM users WHERE id = 5;         -- remove 1 row, rollbackable
DELETE FROM users;                      -- remove all rows (slow, rollbackable)
TRUNCATE TABLE users;                   -- remove all rows (fast, not rollbackable in MySQL)
DROP TABLE users;                       -- delete entire table permanently`
          },
          {
            type: 'qa',
            question: 'Q4: What are ACID properties?',
            answer: 'ACID properties guarantee that database transactions are processed reliably:\n\nAtomicity: A transaction is "all or nothing" — either ALL operations succeed, or NONE do. No partial updates.\n\nConsistency: A transaction moves the database from one valid state to another. All constraints, rules, and cascades are enforced.\n\nIsolation: Concurrent transactions execute as if they were serial. One transaction\'s in-progress changes are invisible to others.\n\nDurability: Once a transaction is committed, it remains committed even in the event of system failure (written to persistent storage).',
          },
          {
            type: 'qa',
            question: 'Q5: What is normalization? What are 1NF, 2NF, 3NF?',
            answer: 'Normalization is the process of organizing a database to reduce redundancy and improve data integrity.\n\n1NF (First Normal Form): Each column contains atomic (indivisible) values. No repeating groups. Each row is unique.\n\n2NF (Second Normal Form): Must be 1NF + every non-key column must depend on the ENTIRE primary key (eliminates partial dependencies — important for composite keys).\n\n3NF (Third Normal Form): Must be 2NF + no non-key column depends on another non-key column (eliminates transitive dependencies).\n\nPractical rule: "Every non-key column must depend on the key, the whole key, and nothing but the key."',
          },
          {
            type: 'qa',
            question: 'Q6: What are indexes? When should you add one?',
            answer: 'An index is a data structure (usually a B-tree) that allows the database to find rows matching a condition without scanning every row in the table — like a book index.\n\nAdd indexes when:\n• Column is frequently used in WHERE clauses\n• Column is used in JOIN conditions (foreign keys should always be indexed)\n• Column is used in ORDER BY frequently\n\nAvoid indexes when:\n• Table is very small (full scan is faster)\n• Column is updated very frequently (indexes slow writes)\n• Column has low cardinality (boolean, status with 3 values)',
            code: `CREATE INDEX idx_email ON users(email);       -- speed up WHERE email = ?
CREATE INDEX idx_fk_user ON orders(user_id);  -- speed up JOINs`
          },
          {
            type: 'qa',
            question: 'Q7: What is the difference between UNION and UNION ALL?',
            answer: 'UNION: Combines results from two queries and removes duplicate rows. Slower because it must compare all rows to find duplicates.\n\nUNION ALL: Combines results from two queries and keeps ALL rows including duplicates. Faster because no deduplication step.',
            code: `-- UNION: removes duplicates
SELECT email FROM users
UNION
SELECT email FROM admins;

-- UNION ALL: keeps all rows (even duplicates)
SELECT email FROM users
UNION ALL
SELECT email FROM admins;  -- faster, use when duplicates don't matter`
          },
          {
            type: 'qa',
            question: 'Q8: What is a CTE (Common Table Expression)? Why use it?',
            answer: 'A CTE (WITH clause) is a named, temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It exists only for the duration of the query.\n\nWhy use CTEs:\n• Readability: Break complex queries into logical named steps\n• Reusability: Reference the same subquery multiple times\n• Recursion: CTEs can call themselves (for hierarchical data like org charts)\n• Alternative to subqueries that are easier to read and debug',
            code: `WITH monthly_revenue AS (
    SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total) AS revenue
    FROM orders WHERE status = 'paid'
    GROUP BY month
)
SELECT month, revenue,
       revenue - LAG(revenue) OVER (ORDER BY month) AS growth
FROM monthly_revenue;`
          },
          {
            type: 'qa',
            question: 'Q9: How do you find duplicate records in a table?',
            answer: 'Use GROUP BY on the columns that define "duplicate" and HAVING to filter groups with count > 1.',
            code: `-- Find duplicate emails:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Find all rows that have a duplicate email:
SELECT *
FROM users
WHERE email IN (
    SELECT email FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;

-- Delete duplicates, keep the one with lowest id:
DELETE FROM users
WHERE id NOT IN (
    SELECT MIN(id) FROM users GROUP BY email
);`
          },
          {
            type: 'qa',
            question: 'Q10: What are Window Functions? Give examples.',
            answer: 'Window functions perform calculations across a "window" of rows related to the current row. Unlike GROUP BY, they don\'t collapse rows — each row keeps its own output plus the window calculation.\n\nCommon window functions:\n• ROW_NUMBER(): sequential number per partition\n• RANK() / DENSE_RANK(): ranking with/without gaps on ties\n• LAG(col, n) / LEAD(col, n): access previous/next row\'s value\n• SUM/AVG/COUNT OVER (): running totals, moving averages',
            code: `-- Running total per user:
SELECT user_id, order_date, total,
       SUM(total) OVER (PARTITION BY user_id ORDER BY order_date) AS running_total
FROM orders;

-- Top spender per country:
SELECT * FROM (
    SELECT username, country, total_spent,
           RANK() OVER (PARTITION BY country ORDER BY total_spent DESC) AS rk
    FROM user_totals
) t WHERE rk = 1;`
          },
          {
            type: 'qa',
            question: 'Q11: What is a Primary Key vs Foreign Key vs Unique Key?',
            answer: 'Primary Key (PK): Uniquely identifies each row in a table. Cannot be NULL. Only ONE per table. Often auto-incremented integer.\n\nForeign Key (FK): A column that references the Primary Key of another table. Enforces referential integrity — you can\'t insert a FK value that doesn\'t exist in the parent table. Can be NULL.\n\nUnique Key: Ensures all values in a column are distinct (no duplicates allowed). Unlike PK, a table can have multiple unique keys, and they CAN be NULL (usually).',
            code: `CREATE TABLE orders (
    id        INT PRIMARY KEY AUTO_INCREMENT,   -- PK
    user_id   INT NOT NULL,                     -- FK
    ref_code  VARCHAR(20) UNIQUE,               -- UNIQUE KEY
    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint
);`
          },
          {
            type: 'qa',
            question: 'Q12: What is the difference between CHAR, VARCHAR, and TEXT?',
            answer: 'CHAR(n): Fixed-length. Always stores exactly n characters (pads with spaces). Fast for fixed-size values like country codes (CHAR(2)), status codes. Wastes space for variable-length data.\n\nVARCHAR(n): Variable-length. Stores 1 to n characters. More space-efficient than CHAR for variable-length data. Maximum n depends on DB (MySQL: up to 65535).\n\nTEXT: For very long text (articles, comments, descriptions). No length limit. Cannot have a DEFAULT value. Stored outside the main row in many databases.',
          },
          {
            type: 'qa',
            question: 'Q13: How do you write a "Top N per group" query?',
            answer: 'Get the top N rows within each group (e.g., top 3 orders per user). The cleanest solution uses window functions.',
            code: `-- Top 3 orders per user using ROW_NUMBER():
SELECT *
FROM (
    SELECT user_id, id AS order_id, total,
           ROW_NUMBER() OVER (
               PARTITION BY user_id
               ORDER BY total DESC
           ) AS rn
    FROM orders
) ranked
WHERE rn <= 3;

-- Alternative with CTEs (more readable):
WITH ranked_orders AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total DESC) AS rn
    FROM orders
)
SELECT user_id, order_id, total FROM ranked_orders WHERE rn <= 3;`
          },
          {
            type: 'qa',
            question: 'Q14: What is SQL injection? How do you prevent it in tests?',
            answer: 'SQL injection is a security vulnerability where user input is inserted directly into SQL queries, allowing attackers to manipulate the query.\n\nIn testing: Always use parameterized queries (prepared statements) — NEVER string concatenation when building SQL with user-provided values.',
            code: `# ❌ VULNERABLE — Never do this:
username = "admin' OR '1'='1"
cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
# The query becomes: WHERE username = 'admin' OR '1'='1'
# This returns ALL users!

# ✅ SAFE — Use parameterized queries:
cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
# Python sqlite3:
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))`
          },
          {
            type: 'qa',
            question: 'Q15: How do you use SQL in automated tests for data verification?',
            answer: 'Three main patterns:\n\n1. Post-action verification: UI/API action → SQL query → assert the expected DB state\n2. Pre-test data seeding: INSERT test data via SQL → run test → DELETE cleanup\n3. Data integrity checks: Query multiple tables to verify consistency (e.g., order total matches sum of line items)',
            code: `# pytest + psycopg2 example:
@pytest.fixture(scope='session')
def db_conn():
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    yield conn
    conn.close()

def test_registration_saves_user(page, db_conn):
    page.goto('/register')
    page.fill('#email', 'newuser@test.com')
    page.click('button[type=submit]')
    page.wait_for_url('/dashboard')

    cur = db_conn.cursor()
    cur.execute("SELECT id, email FROM users WHERE email = %s",
                ('newuser@test.com',))
    user = cur.fetchone()
    assert user is not None, "Registration: user not found in DB"
    assert user[1] == 'newuser@test.com'`
          },
        ],
      },
    ],
  },

  // ── TURKISH ───────────────────────────────────────────────────────────────
  tr: {
    hero: {
      title: '🗄️ SQL',
      subtitle: 'Veritabanı Testi ve Sorgu Ustalığı',
      intro: 'SQL\'i sıfırdan öğrenin — veritabanlarını anlayın, sorgular yazın ve backend doğrulama, veri oluşturma ve temizleme için SQL\'i test otomasyonunuzda kullanın.',
    },
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Orta Seviye', '🚀 İleri Seviye', '💼 Mülakat Soruları'],
    sections: [
      {
        title: '🎯 SQL Nedir ve Test Uzmanları İçin Neden Önemlidir?',
        blocks: [
          { type: 'text', content: 'Bir online mağaza düşünün. Kullanıcı kayıt olduğunda veri bir yere gider — bir veritabanına. O kayıt formunu test ettiğinizde "Gönder"e tıklamak yetmez. Kapsamlı bir tester şunu sorar: "Veri veritabanına doğru kaydedildi mi?" İşte burada SQL devreye girer.' },
          { type: 'text', content: 'SQL (Structured Query Language — Yapılandırılmış Sorgu Dili), ilişkisel veritabanlarıyla iletişim kurmak için evrensel dildir. Bankacılık sistemleri, e-ticaret siteleri, sağlık platformları gibi tüm büyük uygulamalar verilerini ilişkisel bir veritabanında saklar.' },
          { type: 'heading', text: 'İlişkisel Veritabanı Nedir?' },
          { type: 'text', content: 'İlişkisel veritabanı, verileri tablolarda (elektronik tablo gibi) saklar; satırlar tekil kayıtları, sütunlar ise özellikleri temsil eder. Tablolar anahtarlar aracılığıyla birbirleriyle ilişkilendirilir.' },
          {
            type: 'code', code: `-- Örnek: "users" tablosu
+----+----------+--------------------+-----+-------+
| id | name     | email              | age |country|
+----+----------+--------------------+-----+-------+
|  1 | Ali      | ali@example.com    |  28 | TR    |
|  2 | Veli     | veli@example.com   |  34 | US    |
|  3 | Ayşe     | ayse@example.com   |  22 | TR    |
+----+----------+--------------------+-----+-------+

-- id = Primary Key (her satır için benzersiz tanımlayıcı)
-- email = UNIQUE kısıtlaması olabilir
-- country = bir "countries" tablosuna Foreign Key olabilir`
          },
          { type: 'heading', text: 'Test Otomasyonunda SQL — Her Tester\'ın Bilmesi Gerekenler' },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '✅', label: 'DB Durumunu Doğrula', desc: 'UI işleminden sonra veritabanı kaydının doğru oluşturulduğunu/güncellendiğini doğrula.' },
              { icon: '🌱', label: 'Test Verisi Ekle', desc: 'Testler çalışmadan önce doğrudan DB\'ye test kullanıcıları, ürünler, siparişler ekle.' },
              { icon: '🧹', label: 'Test Sonrası Temizlik', desc: 'Her test çalışmasının temiz durumla başlaması için test kayıtlarını sil.' },
              { icon: '🔍', label: 'Backend Doğrulama', desc: 'İş mantığını doğrula: örn. sipariş toplamı kalem toplamlarıyla eşleşiyor mu?' },
              { icon: '⚡', label: 'UI\'dan Daha Hızlı', desc: 'DB sorgulama, UI\'da gezinmekten 100x daha hızlıdır.' },
              { icon: '🐛', label: 'Gizli Hataları Bul', desc: 'UI başarı gösterebilir ama DB güncellenmemiş olabilir — SQL gerçeği ortaya çıkarır.' },
            ]
          },
          { type: 'heading', text: 'Temel Terimler' },
          {
            type: 'list', icon: '📌',
            items: [
              { label: 'Tablo (Table)', desc: 'Satır ve sütunlarda düzenlenmiş yapılandırılmış veri kümesi (elektronik tablo gibi).' },
              { label: 'Satır / Kayıt (Row / Record)', desc: 'Tablodaki tek bir veri girişi (bir kullanıcı, bir sipariş).' },
              { label: 'Sütun / Alan (Column / Field)', desc: 'Verinin bir özelliği (isim, email, yaş).' },
              { label: 'Birincil Anahtar (Primary Key)', desc: 'Her satır için benzersiz tanımlayıcı — iki satır aynı PK\'ya sahip olamaz.' },
              { label: 'Yabancı Anahtar (Foreign Key)', desc: 'Başka bir tablonun Primary Key\'ini referans alan sütun — tablolar arası ilişki oluşturur.' },
              { label: 'İndeks (Index)', desc: 'Sütundaki aramaları hızlandıran veri yapısı (kitap indeksi gibi).' },
              { label: 'Şema (Schema)', desc: 'Veritabanının yapısı/planı: tüm tablolar, sütunlar, tipler ve kısıtlamalar.' },
              { label: 'Sorgu (Query)', desc: 'SQL kullanılarak veritabanına gönderilen veri veya işlem talebi.' },
            ]
          },
          { type: 'tip', content: 'SQL öğrenmek için SQLite (sunucu gerekmez) veya sqlfiddle.com ya da db-fiddle.com gibi ücretsiz online oyun alanları ile başlayın.' },
        ],
      },
      {
        title: '📦 SQL Ortamı Kurulumu',
        blocks: [
          { type: 'text', content: 'Kurulum gerektirmeyen online oyun alanlarından tam veritabanı sunucularına kadar birkaç seçeneğiniz var.' },
          { type: 'heading', text: 'Seçenek A: Online Oyun Alanı (Kurulum Yok)' },
          { type: 'list', icon: '🌐', items: [
            { label: 'db-fiddle.com', desc: 'En iyi seçenek. MySQL, PostgreSQL, SQLite destekler. Ücretsiz.' },
            { label: 'sqlfiddle.com', desc: 'Klasik seçenek. Birden fazla DB tipi destekler.' },
            { label: 'sqliteonline.com', desc: 'Tarayıcıda SQLite. Hızlı ve basit.' },
          ]},
          { type: 'heading', text: 'Seçenek B: SQLite (En Hafif Yerel Seçenek)' },
          {
            type: 'steps', items: [
              'sqlite.org/download.html adresinden indir (Windows için sqlite-tools-win32)',
              'C:\\sqlite\\ klasörüne çıkart',
              'O klasörde terminal aç',
              'sqlite3 benimveritabanim.db yaz (veritabanı oluşturur/açar)',
              'Hazırsın! .help komutuyla yardımı görebilirsin',
            ]
          },
          { type: 'heading', text: 'Seçenek C: MySQL / MariaDB' },
          {
            type: 'code', code: `# macOS (Homebrew):
brew install mysql
brew services start mysql
mysql -u root

# Windows: dev.mysql.com/downloads/installer/ adresinden MySQL Installer indir
# Kurulum sırasında "Developer Default" seç

# Linux (Ubuntu/Debian):
sudo apt update && sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql -u root`
          },
          { type: 'heading', text: 'GUI Aracı: DBeaver (Önerilen)' },
          { type: 'text', content: 'DBeaver, TÜM veritabanlarıyla (MySQL, PostgreSQL, SQLite vb.) çalışan ücretsiz, evrensel bir veritabanı GUI\'sidir. Komut satırından çok daha kolaydır.' },
          {
            type: 'steps', items: [
              'dbeaver.io adresinden DBeaver Community\'yi indir (ücretsiz)',
              'Kur ve DBeaver\'ı başlat',
              '"New Database Connection" düğmesine (fiş ikonu) tıkla',
              'Veritabanı tipini seç (SQLite, MySQL, PostgreSQL)',
              'Bağlantı bilgilerini gir (host, port, kullanıcı adı, şifre)',
              '"Test Connection"a tıkla → yeşilse Finish\'e bas',
              'SQL sorgularını yazmak ve çalıştırmak için SQL Editörünü kullan',
            ]
          },
        ],
      },
      {
        title: '📚 Temel SQL — Her Gün Kullandığın Sorgular',
        blocks: [
          { type: 'heading', text: 'CREATE TABLE — Yapı Tanımlama' },
          {
            type: 'code', code: `-- Yaygın veri tipleriyle kullanıcılar tablosu oluştur
CREATE TABLE kullanicilar (
    id          INT           PRIMARY KEY AUTO_INCREMENT,
    kullanici_adi VARCHAR(50) NOT NULL UNIQUE,
    email       VARCHAR(100)  NOT NULL,
    sifre       VARCHAR(255)  NOT NULL,
    yas         INT           CHECK (yas >= 0 AND yas <= 150),
    ulke        CHAR(2)       DEFAULT 'TR',
    aktif       BOOLEAN       DEFAULT TRUE,
    olusturulma DATETIME      DEFAULT CURRENT_TIMESTAMP
);`
          },
          { type: 'heading', text: 'INSERT, SELECT, UPDATE, DELETE' },
          {
            type: 'code', code: `-- Veri ekleme:
INSERT INTO kullanicilar (kullanici_adi, email, sifre, yas)
VALUES ('ali_veli', 'ali@example.com', 'hash123', 28);

-- Birden fazla satır:
INSERT INTO kullanicilar (kullanici_adi, email, sifre, yas) VALUES
    ('ayse', 'ayse@example.com', 'hash2', 25),
    ('mehmet', 'mehmet@example.com', 'hash3', 32);

-- Veri okuma:
SELECT * FROM kullanicilar WHERE ulke = 'TR';
SELECT * FROM kullanicilar WHERE yas > 25 AND aktif = TRUE;
SELECT * FROM kullanicilar ORDER BY yas ASC LIMIT 10;

-- Güncelleme:
UPDATE kullanicilar SET aktif = FALSE WHERE id = 3;

-- Silme:
DELETE FROM kullanicilar WHERE id = 5;`
          },
          { type: 'warning', content: 'UPDATE ve DELETE\'den önce WHERE koşulunuzu SELECT ile test edin! WHERE olmadan tüm tablo silinir veya güncellenir.' },
          { type: 'heading', text: 'JOIN\'ler — Tabloları Birleştirme' },
          {
            type: 'code', code: `-- INNER JOIN: her iki tabloda da eşleşen satırlar
SELECT u.kullanici_adi, s.id AS siparis_id, s.toplam
FROM kullanicilar u
INNER JOIN siparisler s ON u.id = s.kullanici_id;
-- Sonuç: yalnızca SİPARİŞİ OLAN kullanıcılar

-- LEFT JOIN: sol tablodaki TÜM satırlar + eşleşenler
SELECT u.kullanici_adi, COUNT(s.id) AS siparis_sayisi
FROM kullanicilar u
LEFT JOIN siparisler s ON u.id = s.kullanici_id
GROUP BY u.id, u.kullanici_adi;
-- Sonuç: sipariş sayısı 0 olanlar dahil TÜM kullanıcılar`
          },
          { type: 'heading', text: 'GROUP BY ve Aggregate Fonksiyonlar' },
          {
            type: 'code', code: `-- Ülkelere göre kullanıcı sayısı:
SELECT ulke, COUNT(*) AS kullanici_sayisi
FROM kullanicilar
GROUP BY ulke
ORDER BY kullanici_sayisi DESC;

-- HAVING: grupladıktan sonra filtrele
SELECT ulke, COUNT(*) AS kullanici_sayisi
FROM kullanicilar
GROUP BY ulke
HAVING COUNT(*) > 5;  -- 5'ten fazla kullanıcısı olan ülkeler`
          },
          { type: 'heading', text: 'NULL Yönetimi' },
          {
            type: 'code', code: `-- NULL = "değer yok / bilinmiyor" — 0 veya boş string ile AYNI DEĞİL!
SELECT * FROM kullanicilar WHERE telefon IS NULL;      -- ✅ doğru
SELECT * FROM kullanicilar WHERE telefon = NULL;       -- ❌ her zaman 0 satır döner

-- COALESCE: ilk NULL olmayan değeri döndür
SELECT kullanici_adi, COALESCE(telefon, 'Belirtilmemiş') AS telefon
FROM kullanicilar;`
          },
        ],
      },
      {
        title: '🚀 İleri Seviye SQL',
        blocks: [
          { type: 'heading', text: 'Window Fonksiyonları' },
          {
            type: 'code', code: `-- ROW_NUMBER: sıra numarası ata
SELECT kullanici_adi, toplam,
       ROW_NUMBER() OVER (ORDER BY toplam DESC) AS sira
FROM siparisler;

-- Her ülkede en çok harcayan kullanıcı:
SELECT * FROM (
    SELECT kullanici_adi, ulke, toplam_harcama,
           RANK() OVER (PARTITION BY ulke ORDER BY toplam_harcama DESC) AS sira
    FROM kullanici_toplamlari
) t WHERE sira = 1;

-- Kümülatif toplam:
SELECT siparis_tarihi, toplam,
       SUM(toplam) OVER (ORDER BY siparis_tarihi) AS kumulatif_toplam
FROM siparisler;`
          },
          { type: 'heading', text: 'CTE — Ortak Tablo İfadeleri (WITH)' },
          {
            type: 'code', code: `-- Temel CTE:
WITH aktif_kullanicilar AS (
    SELECT id, kullanici_adi, email
    FROM kullanicilar
    WHERE aktif = TRUE
)
SELECT * FROM aktif_kullanicilar WHERE kullanici_adi LIKE 'a%';

-- Birden fazla CTE:
WITH
yuksek_degerli_siparisler AS (
    SELECT kullanici_id, SUM(toplam) AS yasam_boyu_deger
    FROM siparisler WHERE durum = 'odendi'
    GROUP BY kullanici_id HAVING SUM(toplam) > 5000
),
vip_kullanicilar AS (
    SELECT u.id, u.kullanici_adi, yds.yasam_boyu_deger
    FROM kullanicilar u
    JOIN yuksek_degerli_siparisler yds ON u.id = yds.kullanici_id
)
SELECT * FROM vip_kullanicilar ORDER BY yasam_boyu_deger DESC;`
          },
          { type: 'heading', text: 'Transaction\'lar ve ACID' },
          {
            type: 'code', code: `-- Transaction: TÜM işlemler başarılı olur veya HİÇBİRİ olmaz
START TRANSACTION;

UPDATE hesaplar SET bakiye = bakiye - 500 WHERE id = 1;  -- borçlandır
UPDATE hesaplar SET bakiye = bakiye + 500 WHERE id = 2;  -- alacaklandır

-- Her şey yolundaysa:
COMMIT;

-- Bir şeyler yanlış giderse:
ROLLBACK;  -- bu transaction'daki TÜM değişiklikleri geri al`
          },
          { type: 'heading', text: 'EXPLAIN — Sorgu Optimizasyonu' },
          {
            type: 'code', code: `-- EXPLAIN sorgunun nasıl çalıştırılacağını gösterir
EXPLAIN SELECT * FROM kullanicilar WHERE email = 'ali@example.com';

-- type = "ALL" → tam tablo taraması (kötü!)
-- type = "ref" veya "const" → index kullanıyor (iyi!)
-- key = NULL → index yok, ekle!

-- Index ekle:
CREATE INDEX idx_email ON kullanicilar(email);

-- Sonra tekrar kontrol et:
EXPLAIN SELECT * FROM kullanicilar WHERE email = 'ali@example.com';
-- Artık index kullanıyor!`
          },
          { type: 'heading', text: 'Test Otomasyonunda SQL Kalıpları' },
          {
            type: 'code', code: `# Python + pytest örneği:
import sqlite3, pytest

@pytest.fixture
def veritabani():
    baglanti = sqlite3.connect('uygulama.db')
    yield baglanti
    baglanti.close()

def test_kayit_formu_db_ye_kaydeder(tarayici, veritabani):
    # UI: yeni kullanıcı kayıt ol
    tarayici.goto('/kayit')
    tarayici.fill('[name=email]', 'test99@example.com')
    tarayici.click('button[type=submit]')

    # DB: kayıt var mı doğrula
    cur = veritabani.cursor()
    cur.execute("SELECT * FROM kullanicilar WHERE email = ?",
                ('test99@example.com',))
    kullanici = cur.fetchone()
    assert kullanici is not None, "Kullanıcı veritabanına kaydedilmedi!"

@pytest.fixture
def test_kullanicisi(veritabani):
    cur = veritabani.cursor()
    cur.execute("INSERT INTO kullanicilar (email) VALUES (?)", ('fixture@test.com',))
    veritabani.commit()
    kullanici_id = cur.lastrowid
    yield kullanici_id
    # Temizlik:
    cur.execute("DELETE FROM kullanicilar WHERE id = ?", (kullanici_id,))
    veritabani.commit()`
          },
        ],
      },
      {
        title: '💼 SQL Mülakat Soruları ve Cevapları',
        blocks: [
          { type: 'text', content: 'QA mühendisleri ve geliştiriciler için en sık sorulan SQL mülakat soruları. Cevabı görmek için her soruya tıklayın.' },
          { type: 'qa', question: 'S1: WHERE ile HAVING arasındaki fark nedir?', answer: 'WHERE, gruplama ÖNCE satırları filtreler (tekil satır değerlerine uygulanır).\nHAVING, gruplama SONRA grupları filtreler (aggregate fonksiyon sonuçlarına uygulanır).\n\nKural: COUNT, SUM, AVG gibi fonksiyonlara göre filtreleme yapmak istiyorsanız → HAVING kullanın. Aksi takdirde → WHERE kullanın.', code: `-- WHERE: bireysel satırları filtrele
SELECT * FROM siparisler WHERE toplam > 100;

-- HAVING: grupları aggregate sonucuna göre filtrele
SELECT kullanici_id, SUM(toplam) AS yasam_boyu
FROM siparisler
GROUP BY kullanici_id
HAVING SUM(toplam) > 5000;` },
          { type: 'qa', question: 'S2: JOIN türlerini açıklayın.', answer: 'INNER JOIN: Her iki tabloda da eşleşme olan satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları ve sağ taraftan eşleşen satırları döndürür. Eşleşmeyen sağ taraf sütunları için NULL.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları ve sol taraftan eşleşen satırları döndürür.\n\nFULL (OUTER) JOIN: Her iki tablodaki TÜM satırları döndürür. Eşleşme olmayan yerlerde NULL.' },
          { type: 'qa', question: 'S3: DELETE, TRUNCATE ve DROP arasındaki fark nedir?', answer: 'DELETE: WHERE koşuluna uyan belirli satırları kaldırır. Transaction\'ları destekler (ROLLBACK yapılabilir). Tetikleyiciler çalışır. Büyük veri setlerinde yavaştır.\n\nTRUNCATE: Tablodaki TÜM satırları anında kaldırır. Filtrelenemez. MySQL\'de ROLLBACK yapılamaz. Tetikleyicileri çalıştırmaz. DELETE\'den çok daha hızlıdır.\n\nDROP: Tüm tabloyu kalıcı olarak siler (yapı + veri). Genellikle geri alınamaz.', code: `DELETE FROM kullanicilar WHERE id = 5;   -- 1 satırı sil, geri alınabilir
TRUNCATE TABLE kullanicilar;             -- tüm satırları hızla sil
DROP TABLE kullanicilar;                 -- tabloyu tamamen sil` },
          { type: 'qa', question: 'S4: ACID özellikleri nelerdir?', answer: 'Atomicity (Bütünsellik): Transaction "ya hep ya hiç" — ya TÜM işlemler başarılı, ya da HİÇBİRİ.\n\nConsistency (Tutarlılık): Transaction veritabanını bir geçerli durumdan diğerine taşır. Tüm kısıtlamalar ve kurallar uygulanır.\n\nIsolation (Yalıtım): Eş zamanlı transactionlar birbirinden bağımsız çalışır. Birinin devam eden değişiklikleri diğerleri tarafından görülmez.\n\nDurability (Kalıcılık): Commit edilen bir transaction sistem arızasında bile korunur (kalıcı depolamaya yazılır).' },
          { type: 'qa', question: 'S5: Normalizasyon nedir? 1NF, 2NF, 3NF nedir?', answer: 'Normalizasyon, veri tekrarını azaltmak ve veri bütünlüğünü iyileştirmek için veritabanını düzenleme sürecidir.\n\n1NF: Her sütun atomik değerler içerir. Tekrarlayan gruplar yok. Her satır benzersiz.\n\n2NF: 1NF + her anahtar olmayan sütun BÜTÜNLEŞİK birincil anahtara bağlıdır (kısmi bağımlılıkları ortadan kaldırır).\n\n3NF: 2NF + anahtar olmayan hiçbir sütun başka bir anahtar olmayan sütuna bağlı değildir (geçici bağımlılıkları ortadan kaldırır).' },
          { type: 'qa', question: 'S6: Index nedir? Ne zaman eklemelisiniz?', answer: 'Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan veri yapısıdır (kitap indeksi gibi).\n\nIndex eklenecek durumlar:\n• Sık WHERE koşullarında kullanılan sütunlar\n• JOIN koşullarında kullanılan sütunlar (Foreign Key\'ler her zaman index\'lenmeli)\n• Sık ORDER BY\'da kullanılan sütunlar\n\nIndex eklememeniz gereken durumlar:\n• Çok küçük tablolar\n• Çok sık güncellenen sütunlar (index bakımı yazmaları yavaşlatır)\n• Düşük kardinaliteli sütunlar (boolean, 3 değerli status)' },
          { type: 'qa', question: 'S7: UNION ile UNION ALL arasındaki fark nedir?', answer: 'UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Yavaştır çünkü tekrarları bulmak için tüm satırları karşılaştırması gerekir.\n\nUNION ALL: İki sorgunun sonuçlarını birleştirir ve tekrarlar dahil TÜM satırları korur. Tekrar kaldırma adımı olmadığından daha hızlıdır.', code: `-- UNION: tekrarları kaldır
SELECT email FROM kullanicilar
UNION
SELECT email FROM yoneticiler;

-- UNION ALL: tüm satırları koru (tekrarlar dahil)
SELECT email FROM kullanicilar
UNION ALL
SELECT email FROM yoneticiler;` },
          { type: 'qa', question: 'S8: Tabloda tekrarlayan kayıtları nasıl bulursunuz?', answer: '"Tekrar" tanımlayan sütunlara GROUP BY uygulayın ve 1\'den fazla count olan grupları HAVING ile filtreleyin.', code: `-- Tekrarlayan email\'leri bul:
SELECT email, COUNT(*) AS sayi
FROM kullanicilar
GROUP BY email
HAVING COUNT(*) > 1;

-- Tüm tekrarlayan satırları al:
SELECT * FROM kullanicilar
WHERE email IN (
    SELECT email FROM kullanicilar
    GROUP BY email HAVING COUNT(*) > 1
)
ORDER BY email;` },
        ],
      },
    ],
  },
}
