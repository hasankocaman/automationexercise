const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: '🎯 What is SQL & Why Does Every QA Engineer Need It?',
    blocks: [
      { type: 'simple-box', emoji: '🗃️', content: { tr: "SQL, veritabanına 'benim için şunu bul' demek gibi. Kütüphaneciye hangi kitapları istediğini söylemek gibi. Test ettiğin uygulamanın arkasında her zaman bir veritabanı vardır — SQL ile UI'nın gösterdiklerini değil, gerçekte ne olduğunu görebilirsin.", en: "SQL is how you talk to a database — like telling a librarian exactly which books you want. Every app you test has a database behind it. SQL lets you see what actually happened, not just what the UI shows." } },
      { type: 'heading', text: 'What is a Database?' },
      { type: 'text', content: 'A database is an organized collection of structured data stored electronically. Think of it as a super-powered spreadsheet that can store millions of rows, link related data together, and answer complex questions in milliseconds. Every app you test stores its data somewhere — that somewhere is almost always a database.' },
      { type: 'heading', text: 'What is SQL?' },
      { type: 'text', content: 'SQL (Structured Query Language) is the standard language for communicating with relational databases. You use it to ask questions ("which users signed up today?"), add data ("create this new order"), update records, and delete them. It\'s been the industry standard since the 1970s and works across MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and more.' },
      { type: 'heading', text: 'Why QA Engineers Must Know SQL' },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '✅', label: 'Verify Backend State', desc: 'After a UI action, query the DB to confirm data was saved correctly — not just the UI says so.' },
          { icon: '🌱', label: 'Seed Test Data', desc: 'INSERT test users, products, orders directly before tests run — no manual setup.' },
          { icon: '🧹', label: 'Cleanup After Tests', desc: 'DELETE test records after each run so the next run starts clean.' },
          { icon: '🔍', label: 'Backend Validation', desc: 'Verify business rules: order total = sum of line items, FK constraints, data integrity.' },
          { icon: '⚡', label: 'Faster Than UI', desc: 'A DB query takes milliseconds. Clicking through UI to find the same data takes minutes.' },
          { icon: '🐛', label: 'Find Hidden Bugs', desc: 'UI shows success but DB was not updated — SQL exposes the truth.' },
        ]
      },
      { type: 'heading', text: 'Key Database Terminology' },
      {
        type: 'table',
        headers: ['Term', 'Meaning', 'Example'],
        rows: [
          ['Table', 'Stores data in rows and columns (like a spreadsheet)', '"users" table with columns: id, email, age'],
          ['Row / Record', 'One entry in a table', 'A single user: {id:1, email:"alice@test.com"}'],
          ['Column / Field', 'An attribute/property stored per row', '"email", "created_at", "is_active"'],
          ['Primary Key', 'Unique identifier for each row — never NULL, never repeated', '"id" column with AUTO_INCREMENT'],
          ['Foreign Key', 'Column that references a PK in another table — creates a relationship', '"orders.user_id" → "users.id"'],
          ['Index', 'Data structure that speeds up searches on a column', 'INDEX on "email" column → fast WHERE email=?'],
          ['Schema', 'The blueprint of a database — all tables, columns, types, constraints', 'CREATE TABLE definitions'],
          ['Query', 'A request sent to the database using SQL', 'SELECT * FROM users WHERE age > 25'],
        ]
      },
      { type: 'heading', text: 'Popular Databases Compared' },
      {
        type: 'table',
        headers: ['Database', 'Type', 'Best For', 'Free?'],
        rows: [
          ['MySQL', 'Open-source', 'Web apps, most common in industry', '✅ Yes'],
          ['PostgreSQL', 'Open-source', 'Complex queries, JSON, enterprise apps', '✅ Yes'],
          ['SQLite', 'Embedded / serverless', 'Local dev, testing, mobile apps', '✅ Yes'],
          ['SQL Server', 'Microsoft commercial', 'Windows/.NET enterprise', '✅ Express edition'],
          ['Oracle', 'Commercial enterprise', 'Large-scale banking/finance', '❌ Paid'],
        ]
      },
      { type: 'tip', content: 'Start learning with SQLiteOnline.com — runs in your browser, zero installation. For a real environment, install DBeaver (free GUI) and connect to SQLite or MySQL.' },
      { type: 'heading', text: 'SQL in the QA Workflow' },
      {
        type: 'visual', variant: 'boxes',
        title: 'How SQL Connects to QA Testing',
        items: [
          { icon: '🧪', label: 'Test Script', desc: 'Playwright / pytest' },
          { arrow: true },
          { icon: '🖥️', label: 'App UI/API', desc: 'Makes DB changes' },
          { arrow: true },
          { icon: '🗄️', label: 'Database', desc: 'MySQL / PostgreSQL' },
          { arrow: true },
          { icon: '🔍', label: 'SQL Query', desc: 'You verify here!', highlight: true },
        ],
        note: 'After every test action, a SQL query can verify the database state was updated correctly — not just what the UI shows.',
      },
      {
        type: 'visual', variant: 'table',
        title: 'Example: A Typical Database Table',
        tables: [{
          name: 'users',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'name', type: 'VARCHAR' },
            { name: 'email', type: 'VARCHAR' },
            { name: 'role', type: 'VARCHAR' },
            { name: 'created_at', type: 'DATETIME' },
          ],
          rows: [
            { cells: [1, 'Alice', 'alice@test.com', 'admin', '2024-01-10'] },
            { cells: [2, 'Bob', 'bob@test.com', 'user', '2024-01-12'] },
            { cells: [3, 'Carol', 'carol@test.com', 'user', '2024-01-15'], highlighted: true },
          ]
        }],
        note: 'Each row is a record. Each column is a field. id is the Primary Key — it uniquely identifies every row.',
      },
      {
        type: 'quiz',
        question: 'What does SQL stand for?',
        options: ['Standard Query Logic', 'Structured Query Language', 'Simple Question Language', 'Sequential Query Library'],
        correct: 1,
        explanation: 'SQL = Structured Query Language. It\'s been the standard language for relational databases since the 1970s and is used by MySQL, PostgreSQL, SQLite, Oracle, and SQL Server.',
      
        retryQuestion: {
      "question": "Which of the following correctly describes the acronym SQL?",
      "options": [
            {
                  "id": "a",
                  "text": "System Query Logic"
            },
            {
                  "id": "b",
                  "text": "Sequential Query Language"
            },
            {
                  "id": "c",
                  "text": "Structured Query Language"
            },
            {
                  "id": "d",
                  "text": "Standard Question Logic"
            }
      ],
      "correct": "c",
      "explanation": "SQL stands for Structured Query Language. It is the international standard language for managing and manipulating relational database management systems."
}
},
    ],
  },

  // ── 1. INSTALLATION ─────────────────────────────────────────────────────────
  {
    title: '📦 Setting Up Your SQL Environment',
    blocks: [
      { type: 'simple-box', emoji: '🛠️', content: { tr: "SQL kurulumu, Java'da IDE kurmaya benzer — bir kere yaparsın, sonra sadece yazarsın. SQLite için sunucu bile gerekmez; tüm veritabanın tek bir dosyada durur. Online editörlerle tarayıcıdan da başlayabilirsin.", en: "Setting up SQL is like installing an IDE for Java — do it once, then just write. SQLite needs no server at all; your entire database lives in a single file. You can even start with an online editor right in your browser." } },
      { type: 'heading', text: 'Option A: Zero-Install Online Editors (Start Here)' },
      {
        type: 'list', icon: '🌐',
        items: [
          { label: 'db-fiddle.com', desc: 'Best option. MySQL, PostgreSQL, SQLite. Schema + query split view.' },
          { label: 'sqliteonline.com', desc: 'Runs SQLite in your browser. Upload a .db file or create tables.' },
          { label: 'sqlfiddle.com', desc: 'Classic. Multiple DB engines. Good for sharing examples.' },
        ]
      },
      { type: 'heading', text: 'Option B: SQLite CLI (Lightest Local Option)' },
      {
        type: 'steps',
        items: [
          'Windows: Download "sqlite-tools-win32" from sqlite.org/download.html and extract to C:\\sqlite\\',
          'Mac: Already installed! Run: sqlite3 —— or install via Homebrew: brew install sqlite',
          'Linux: sudo apt install sqlite3',
          'Create a database: sqlite3 mytest.db',
          'Verify: SELECT sqlite_version();',
        ]
      },
      {
        type: 'code',
        code: `-- SQLite CLI quick reference:
sqlite3 mytest.db        -- open or create database

.tables                  -- list all tables
.schema users            -- show CREATE TABLE for "users"
.headers on              -- show column headers in output
.mode column             -- aligned column output
.quit                    -- exit SQLite

SELECT sqlite_version();`,
        expected: `3.43.0`
      },
      { type: 'heading', text: 'Option C: MySQL Community Server' },
      {
        type: 'steps',
        items: [
          'Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/ → choose "Developer Default"',
          'Mac: brew install mysql → brew services start mysql → mysql -u root',
          'Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root',
          'Verify installation: SELECT VERSION();',
        ]
      },
      {
        type: 'code',
        code: `-- Connect and verify:
mysql -u root -p          -- connect with root user (enter password)

SELECT VERSION();         -- check MySQL version`,
        expected: `+-----------+\n| VERSION() |\n+-----------+\n| 8.0.35    |\n+-----------+`
      },
      { type: 'heading', text: 'Option D: DBeaver GUI (Recommended for Beginners)' },
      { type: 'text', content: 'DBeaver is a free universal database GUI that works with ALL databases. Much easier than the command line — you can browse tables visually and run queries with autocomplete.' },
      {
        type: 'steps',
        items: [
          'Download DBeaver Community from dbeaver.io (free)',
          'Install and launch DBeaver',
          'Click "New Database Connection" (the plug icon, top left)',
          'Select your DB type: SQLite, MySQL, or PostgreSQL',
          'SQLite: click Browse → select your .db file (or create new)',
          'MySQL/PostgreSQL: enter host, port, database name, username, password',
          'Click "Test Connection" — must show green "Connected" before Finish',
          'Open SQL Editor with Ctrl+] and start writing queries',
        ]
      },
      { type: 'heading', text: 'Using SQL in Python (for Test Automation)' },
      {
        type: 'code',
        code: `# SQLite — built into Python, no install needed:
import sqlite3

conn   = sqlite3.connect("test.db")   # connect (creates file if not exists)
cursor = conn.cursor()

cursor.execute("SELECT * FROM users WHERE age > 25")
rows = cursor.fetchall()              # get all results as list of tuples

for row in rows:
    print(row)

conn.close()

# PostgreSQL — install: pip install psycopg2-binary
import psycopg2

conn = psycopg2.connect(
    host="localhost", database="testdb",
    user="postgres",  password="mypassword"
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
count = cursor.fetchone()[0]
print(f"Pending orders: {count}")
conn.close()`,
      },
      { type: 'heading', text: '☕ If You Know Java: Database Connection Bridge' },
      {
        type: 'java-compare',
        topic: 'DB Connection Setup (DriverManager vs sqlite3)',
        why: 'Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.',
        why_en: 'Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.',
        java: `// Java: JDBC connection via DriverManager
import java.sql.*;

// Open connection (MySQL example):
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/testdb",
    "root", "password"
);
Statement stmt = conn.createStatement();
ResultSet rs   = stmt.executeQuery("SELECT * FROM users");

// ALWAYS close — use try-with-resources:
try (Connection c = DriverManager.getConnection(url, user, pass)) {
    Statement s = c.createStatement();
    ResultSet r = s.executeQuery("SELECT COUNT(*) FROM users");
}   // auto-closed here`,
        python: `# Python: sqlite3 — BUILT-IN, zero install!
import sqlite3

conn = sqlite3.connect("test.db")  # creates file if not exists
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()           # list of tuples
conn.close()

# Context manager = try-with-resources:
with sqlite3.connect("test.db") as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
# conn auto-closed after with block

# PostgreSQL (pip install psycopg2-binary):
import psycopg2
conn = psycopg2.connect(
    host="localhost", dbname="testdb",
    user="postgres", password="secret"
)`,
        note: 'sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency.',
        note_en: 'sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency.',
      },
      {
        type: 'java-compare',
        topic: 'Dependency Setup (Maven pom.xml vs pip)',
        why: 'In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.',
        why_en: 'In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.',
        java: `<!-- Java: pom.xml — add JDBC driver dependency -->
<dependencies>

  <!-- MySQL -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
  </dependency>

  <!-- PostgreSQL -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version>
  </dependency>

</dependencies>
<!-- then: mvn install -->`,
        python: `# Python: pip — no config file needed at all!

# SQLite: NOTHING — built in to Python!
import sqlite3           # works with zero setup

# MySQL:
# pip install mysql-connector-python
import mysql.connector

# PostgreSQL:
# pip install psycopg2-binary
import psycopg2

# requirements.txt (optional, like pom.xml):
# psycopg2-binary==2.9.9
# mysql-connector-python==8.2.0`,
        note: 'Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything.',
        note_en: 'Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything.',
      },
      {
        type: 'quiz',
        question: { tr: 'Yeni başlayan biri için SQL öğrenmeye en hızlı şekilde başlamak isterse hangi kurulum seçeneği önerilir?', en: 'Which setup option is recommended for a beginner who wants to start learning SQL as fast as possible?' },
        options: [
          { id: 'a', text: { tr: 'Önce MySQL Community Server kurmak', en: 'Installing MySQL Community Server first' } },
          { id: 'b', text: { tr: 'Kurulum gerektirmeyen bir çevrimiçi editörle başlamak', en: 'Starting with an install-free online editor' } },
          { id: 'c', text: { tr: 'Önce bir DBeaver lisansı satın almak', en: 'Buying a DBeaver license first' } },
          { id: 'd', text: { tr: 'Önce bir cloud sunucusu kiralamak', en: 'Renting a cloud server first' } },
        ],
        correct: 'b',
        explanation: { tr: 'Kurulum gerektirmeyen çevrimiçi bir editör (örn. tarayıcı tabanlı SQLite/PostgreSQL sandbox), sıfır kurulum süresiyle SQL syntax\'ını anında denemeyi sağlar. Yerel bir veritabanı sunucusu kurmak (MySQL Community Server gibi) gerçek bir projeye geçince gerekli olur ama temel SELECT/JOIN/GROUP BY öğrenirken gereksiz bir engeldir.', en: 'An install-free online editor (e.g. a browser-based SQLite/PostgreSQL sandbox) lets you try SQL syntax instantly with zero setup time. Installing a local database server (like MySQL Community Server) becomes necessary once you move to a real project, but it is an unnecessary barrier while learning basic SELECT/JOIN/GROUP BY.' },
        retryQuestion: {
          question: { tr: 'Bir QA mühendisi gerçek bir projede CI pipeline\'ında otomatik SQL testleri çalıştırmaya başlıyor. Bu noktada artık neden yerel bir veritabanı sunucusuna (veya en azından bir Docker container\'ına) ihtiyaç duyar?', en: 'A QA engineer is now running automated SQL tests in a CI pipeline for a real project. Why do they now need a local database server (or at least a Docker container) instead of just a browser sandbox?' },
          options: [
            { id: 'a', text: { tr: 'Tarayıcı sandbox\'ları CI ortamlarında hiç çalışmaz ve gerçekçi bir bağlantı dizesi/test verisi/şema yönetimi gerektirir', en: 'Browser sandboxes don\'t run in CI environments at all, and a real pipeline needs a real connection string/test data/schema management' } },
            { id: 'b', text: { tr: 'Çevrimiçi editörler artık SQL syntax\'ını desteklemiyor', en: 'Online editors no longer support SQL syntax' } },
            { id: 'c', text: { tr: 'Tarayıcı sandbox\'ları sadece 10 satırdan fazla veri tutamaz', en: 'Browser sandboxes can only hold more than 10 rows of data' } },
            { id: 'd', text: { tr: 'CI pipeline\'ları SELECT sorgularını desteklemez', en: 'CI pipelines do not support SELECT queries' } },
          ],
          correct: 'a',
          explanation: { tr: 'Tarayıcı tabanlı bir sandbox, izole, geçici, tek kullanıcılı bir oyun alanıdır — gerçek bir CI pipeline\'ı ise tekrarlanabilir bir bağlantı dizesi, gerçekçi şema/migration yönetimi ve genelde bir Docker container\'ında veya yönetilen bir test veritabanı instance\'ında çalışan otomatik testler gerektirir. Öğrenme aşamasında sandbox yeterliyken, gerçek bir projeye geçişte bu altyapı kaçınılmaz hale gelir.', en: 'A browser-based sandbox is an isolated, ephemeral, single-user playground — a real CI pipeline needs a reproducible connection string, realistic schema/migration management, and automated tests that typically run against a Docker container or a managed test database instance. The sandbox is enough while learning, but this infrastructure becomes unavoidable once you move to a real project.' },
        },
      },
    ],
  },

  // ── 2. FOUNDATIONS ──────────────────────────────────────────────────────────
  {
    title: '🟢 Level 1: SQL Foundations',
    blocks: [
      { type: 'simple-box', emoji: '📖', content: { tr: "SQL komutları İngilizce cümle gibi okunur: SELECT = 'getir', FROM = 'nereden', WHERE = 'koşulsa'. Java'da bir listeyi for döngüsüyle taradın. SQL'de sadece ne istediğini tarif edersin — veritabanı nasıl bulacağını kendi bilir.", en: "SQL reads like plain English: SELECT = 'give me', FROM = 'from this table', WHERE = 'only if'. In Java you'd loop through a list manually. In SQL you describe what you want and the database figures out how to find it." } },
      { type: 'heading', text: 'CREATE TABLE — Defining Structure', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Create a test_results table to store automation run data:
CREATE TABLE test_results (
    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique ID, auto-increments
    test_name   VARCHAR(100)  NOT NULL,                    -- text up to 100 chars, required
    status      VARCHAR(10)   NOT NULL,                    -- 'PASS', 'FAIL', 'SKIP'
    duration_ms INT           DEFAULT 0,                   -- test duration in milliseconds
    run_date    DATETIME      DEFAULT CURRENT_TIMESTAMP,   -- auto-set to now
    environment VARCHAR(20)   DEFAULT 'staging',           -- which env was tested
    is_flaky    BOOLEAN       DEFAULT FALSE                 -- marks known flaky tests
);

-- Common SQL data types:
-- INT / BIGINT        → whole numbers (28, 1000000)
-- DECIMAL(10,2)       → precise decimals, e.g. prices (99.99)
-- VARCHAR(n)          → variable text up to n characters
-- TEXT                → unlimited text (descriptions, logs)
-- BOOLEAN / TINYINT   → true/false
-- DATE                → 2024-01-15
-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00`,
      },
      { type: 'heading', text: 'INSERT INTO — Adding Data', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Single row insert:
INSERT INTO test_results (test_name, status, duration_ms, environment)
VALUES ('Login Test', 'PASS', 1234, 'staging');

-- Multiple rows at once (much faster than one at a time!):
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Signup Test',    'PASS', 890),
    ('Checkout Flow',  'FAIL', 5400),
    ('Profile Update', 'SKIP', 0),
    ('Password Reset', 'PASS', 1100),
    ('Search Feature', 'FAIL', 8200);

-- Copy rows from one table to another:
INSERT INTO test_archive
SELECT * FROM test_results WHERE run_date < '2023-01-01';`,
      },
      { type: 'heading', text: 'SELECT — Reading Data', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Select all columns and all rows:
SELECT * FROM test_results;

-- Select specific columns only:
SELECT test_name, status, duration_ms FROM test_results;

-- WHERE — filter rows:
SELECT * FROM test_results WHERE status = 'FAIL';
SELECT * FROM test_results WHERE duration_ms > 3000;        -- slow tests
SELECT * FROM test_results WHERE status = 'FAIL' AND duration_ms > 5000;
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');

-- LIKE — pattern matching:
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains "Login"
SELECT * FROM test_results WHERE test_name LIKE 'Sign%';    -- starts with "Sign"

-- ORDER BY — sort results:
SELECT * FROM test_results ORDER BY duration_ms DESC;       -- slowest first
SELECT * FROM test_results ORDER BY run_date DESC LIMIT 10; -- last 10 runs

-- LIMIT + OFFSET — pagination:
SELECT * FROM test_results LIMIT 10;            -- first 10 rows
SELECT * FROM test_results LIMIT 10 OFFSET 20;  -- rows 21-30 (page 3)

-- DISTINCT — unique values only:
SELECT DISTINCT environment FROM test_results;`,
        expected: `+----+----------------+--------+-------------+\n| id | test_name      | status | duration_ms |\n+----+----------------+--------+-------------+\n|  3 | Checkout Flow  | FAIL   |        5400 |\n|  5 | Search Feature | FAIL   |        8200 |\n+----+----------------+--------+-------------+`
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT, run_date TEXT);
INSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging','2024-01-10');
INSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging','2024-01-10');
INSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod','2024-01-11');
INSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod','2024-01-11');
INSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging','2024-01-12');
INSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging','2024-01-12');
INSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod','2024-01-13');
INSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging','2024-01-13');`,
        defaultCode: `-- ▶ Çalıştır ve değiştir!
SELECT * FROM test_results WHERE status = 'FAIL';

-- Diğerlerini dene:
-- SELECT test_name, duration_ms FROM test_results ORDER BY duration_ms DESC;
-- SELECT DISTINCT environment FROM test_results;
-- SELECT * FROM test_results WHERE duration_ms > 2000 AND status = 'PASS';
-- SELECT COUNT(*) AS total FROM test_results;`
      },
      { type: 'heading', text: 'UPDATE and DELETE', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- UPDATE — modify existing rows:
UPDATE test_results SET status = 'PASS' WHERE id = 3;
UPDATE test_results SET is_flaky = TRUE WHERE test_name = 'Search Feature';

-- DELETE — remove rows:
DELETE FROM test_results WHERE status = 'SKIP';
DELETE FROM test_results WHERE run_date < NOW() - INTERVAL 30 DAY;

-- SAFE PATTERN: always SELECT first to verify, THEN DELETE:
SELECT * FROM test_results WHERE environment = 'test-cleanup';  -- verify
DELETE FROM test_results WHERE environment = 'test-cleanup';    -- then delete`,
      },
      { type: 'warning', content: 'ALWAYS include WHERE with UPDATE and DELETE! Without WHERE, every row in the table is affected. Run a SELECT with the same WHERE first to verify which rows will be changed.' },
      { type: 'heading', text: 'NULL Values', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- NULL means "no value / unknown" — NOT the same as 0 or empty string!
-- You CANNOT use = to check for NULL — it always returns false:

SELECT * FROM test_results WHERE error_msg IS NULL;      -- correct
SELECT * FROM test_results WHERE error_msg IS NOT NULL;  -- has an error
-- SELECT * WHERE error_msg = NULL;   WRONG — always returns 0 rows!

-- COALESCE: return first non-NULL value:
SELECT test_name,
       COALESCE(error_msg, 'No error') AS error_display
FROM test_results;

-- NULLIF: return NULL if two values are equal (avoid division by zero!):
SELECT test_name, NULLIF(duration_ms, 0) AS duration
FROM test_results;`,
      },
      { type: 'heading', text: 'Interactive Example: test_results Table', difficulty: '🟢 Beginner' },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');
INSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');
INSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');
INSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');
INSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');
INSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');`,
        defaultCode: `-- Tablo hazır! Sorguları dene:
SELECT * FROM test_results ORDER BY duration_ms DESC;

-- Diğerlerini dene:
-- SELECT * FROM test_results WHERE status = 'FAIL';
-- SELECT COUNT(*) AS total, status FROM test_results GROUP BY status ORDER BY total DESC;
-- SELECT test_name, duration_ms FROM test_results WHERE duration_ms > 1000;`
      },
      { type: 'heading', text: 'SQL Query Execution Order — The Secret Most Beginners Miss' },
      { type: 'text', content: 'SQL does NOT execute top-to-bottom like regular code. It follows a specific internal order. This is WHY you can\'t use SELECT aliases in WHERE, and WHY aggregate functions go in HAVING not WHERE.' },
      {
        type: 'visual', variant: 'flow',
        title: 'SQL Clause Evaluation Order (Step by Step)',
        note: 'You write SELECT at the top, but it executes almost LAST. This is why aliases defined in SELECT aren\'t available in WHERE!',
        steps: [
          { num: '1', label: 'FROM', desc: 'Load tables' },
          { num: '2', label: 'JOIN', desc: 'Combine' },
          { num: '3', label: 'WHERE', desc: 'Filter rows', highlight: true },
          { num: '4', label: 'GROUP BY', desc: 'Group' },
          { num: '5', label: 'HAVING', desc: 'Filter groups', highlight: true },
          { num: '6', label: 'SELECT', desc: 'Pick columns' },
          { num: '7', label: 'ORDER BY', desc: 'Sort' },
          { num: '8', label: 'LIMIT', desc: 'Slice' },
        ],
      },
      {
        type: 'visual', variant: 'table',
        title: 'Our Sample Data — test_results Table',
        tables: [{
          name: 'test_results',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'test_name', type: 'VARCHAR' },
            { name: 'status', type: 'VARCHAR' },
            { name: 'duration_ms', type: 'INT' },
            { name: 'environment', type: 'VARCHAR' },
          ],
          rows: [
            { cells: [1, 'Login Test', 'PASS', 1200, 'staging'] },
            { cells: [2, 'Checkout Flow', 'FAIL', 5400, 'staging'], highlighted: true },
            { cells: [3, 'Signup Test', 'PASS', 890, 'prod'] },
            { cells: [4, 'Profile Update', 'FAIL', 3100, 'prod'], highlighted: true },
            { cells: [5, 'Search Feature', 'PASS', 2200, 'staging'] },
            { cells: [6, 'Logout Test', 'SKIP', 0, 'staging'] },
          ]
        }],
        note: 'Highlighted rows = FAIL status. Try: SELECT * FROM test_results WHERE status = \'FAIL\' → returns rows 2 and 4.',
      },
      { type: 'heading', text: 'NULL — The Most Common SQL Mistake' },
      { type: 'text', content: 'NULL means "no value / unknown" — it is NOT zero, it is NOT an empty string. Any comparison with NULL returns NULL (not true/false). This trips up every SQL beginner.' },
      {
        type: 'comparison',
        left: {
          label: '❌ Wrong — = NULL never works',
          code: `SELECT * FROM users WHERE email = NULL;
-- Returns 0 rows EVERY TIME!
-- Even if NULL values exist.
-- Why? NULL = NULL → NULL (not true)`,
          note: 'Never use = or != to check for NULL',
        },
        right: {
          label: '✅ Correct — IS NULL / IS NOT NULL',
          code: `SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
-- COALESCE: replace NULL with a default:
SELECT name, COALESCE(email, 'no email') FROM users;`,
          note: 'IS NULL and IS NOT NULL always work correctly',
        },
      },
      {
        type: 'quiz',
        question: 'A query returns 0 rows when you filter: WHERE discount = NULL. Why?',
        options: [
          'There are no NULL discounts in the table',
          'NULL comparisons with = always return NULL (not TRUE), so no rows match',
          'You need quotes: WHERE discount = "NULL"',
          'NULL is automatically converted to 0',
        ],
        correct: 1,
        explanation: 'Any comparison with NULL using = or != returns NULL, which is treated as FALSE. Use IS NULL or IS NOT NULL instead. This is one of the most common SQL bugs.',
      
        retryQuestion: {
      "question": "If you execute 'SELECT * FROM users WHERE age = NULL;', why might you get no results even if some users have no age recorded?",
      "options": [
            {
                  "id": "a",
                  "text": "NULL values cannot be queried in a WHERE clause"
            },
            {
                  "id": "b",
                  "text": "Comparisons with NULL using = result in UNKNOWN, requiring the IS NULL operator instead"
            },
            {
                  "id": "c",
                  "text": "The syntax requires 'WHERE age IS 0'"
            },
            {
                  "id": "d",
                  "text": "NULL values are hidden by default in SQL results"
            }
      ],
      "correct": "b",
      "explanation": "In SQL, NULL represents an unknown value. Using standard equality operators (=) against NULL results in UNKNOWN, not TRUE. To filter for empty fields, you must use the 'IS NULL' or 'IS NOT NULL' predicates."
}
},
      { type: 'heading', text: '☕ If You Know Java: Database Access Bridge' },
      {
        type: 'java-compare',
        topic: 'DB Connection (DriverManager vs sqlite3)',
        why: 'Java uses JDBC DriverManager with a URL + credentials. Python uses lightweight driver modules (sqlite3 is built-in, psycopg2 for PostgreSQL). The connection pattern is the same — the API differs.',
        java: `// Java: JDBC connection
import java.sql.*;
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",
    "username", "password"
);
// Always close — use try-with-resources:
try (Connection c = DriverManager.getConnection(url, user, pass)) {
    // use c here — auto-closed
}`,
        python: `# Python: sqlite3 (built-in, zero install!)
import sqlite3
conn = sqlite3.connect("mydb.sqlite")

# PostgreSQL:
import psycopg2
conn = psycopg2.connect(
    host="localhost", dbname="mydb",
    user="username", password="password"
)

# Context manager — auto-closes like try-with-resources:
with sqlite3.connect("mydb.sqlite") as conn:
    cursor = conn.cursor()`,
        note: 'Python sqlite3 is built into Python — no pip install. For MySQL: mysql-connector-python; PostgreSQL: psycopg2.',
      },
      {
        type: 'java-compare',
        topic: 'Executing SELECT → Iterating Results',
        why: 'Java uses ResultSet with rs.next() loop and column-by-name getters. Python cursor.fetchall() returns a simple list of tuples — far less boilerplate.',
        java: `// Java: Statement + ResultSet
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(
    "SELECT test_name, status FROM test_results WHERE status='FAIL'"
);
while (rs.next()) {
    String name = rs.getString("test_name");
    String status = rs.getString("status");
    System.out.println(name + " → " + status);
}
rs.close(); stmt.close();`,
        python: `# Python: cursor + fetchall
cursor = conn.cursor()
cursor.execute(
    "SELECT test_name, status FROM test_results WHERE status='FAIL'"
)
rows = cursor.fetchall()  # list of tuples
for name, status in rows:
    print(f"{name} → {status}")

# Single row — like rs.next() once:
cursor.execute("SELECT COUNT(*) FROM test_results")
count = cursor.fetchone()[0]`,
        note: 'cursor.fetchall() returns all rows as a list of tuples. cursor.fetchone() returns one row or None — equivalent to rs.next() called once.',
      },
      { type: 'heading', text: '☕ If You Know Java: DML Operations Bridge' },
      {
        type: 'java-compare',
        topic: 'INSERT → JPA persist() vs SQL INSERT INTO',
        why: 'In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.',
        why_en: 'In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.',
        java: `// Java: JPA EntityManager
@Entity
@Table(name = "test_results")
public class TestResult {
    @Id @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String testName;
    private String status;
}

// Insert: no SQL needed — JPA generates it
EntityManager em = emf.createEntityManager();
em.getTransaction().begin();
TestResult r = new TestResult();
r.setTestName("Login Test");
r.setStatus("PASS");
em.persist(r);          // ← generates: INSERT INTO test_results ...
em.getTransaction().commit();`,
        sql: `-- Direct SQL: you write it yourself
INSERT INTO test_results (test_name, status, duration_ms)
VALUES ('Login Test', 'PASS', 1234);

-- Multiple rows at once (JPA needs a loop or batch):
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Signup Test',   'PASS', 890),
    ('Checkout Flow', 'FAIL', 5400);

-- Copy rows (JPA: query + persist loop):
INSERT INTO test_archive
SELECT * FROM test_results WHERE run_date < '2024-01-01';`,
        note: 'SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity.',
        note_en: 'SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity.',
      },
      {
        type: 'java-compare',
        topic: 'UPDATE/DELETE → JPA merge()/remove() vs SQL',
        why: 'JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.',
        why_en: 'JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.',
        java: `// Java: JPA update — find then mutate
EntityManager em = ...;
em.getTransaction().begin();

TestResult r = em.find(TestResult.class, 3L);  // SELECT first
r.setStatus("PASS");         // mark as mutated
em.merge(r);                 // generates: UPDATE test_results SET status='PASS' WHERE id=3

// JPA delete:
TestResult toDelete = em.find(TestResult.class, 3L);
em.remove(toDelete);         // generates: DELETE FROM test_results WHERE id=3

em.getTransaction().commit();`,
        sql: `-- SQL UPDATE: direct, no find() needed
UPDATE test_results
SET    status = 'PASS'
WHERE  id = 3;

-- Update multiple rows at once (JPA needs a loop):
UPDATE test_results
SET    is_flaky = TRUE
WHERE  test_name LIKE '%Search%';

-- SQL DELETE: also direct
DELETE FROM test_results WHERE status = 'SKIP';

-- Safe pattern: SELECT first to verify, then DELETE
SELECT * FROM test_results WHERE environment = 'cleanup';
DELETE FROM test_results WHERE environment = 'cleanup';`,
        note: 'SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common.',
        note_en: 'SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common.',
      },
      // Quiz: ORDER BY
      { type: 'quiz', question: { tr: 'SELECT sorgusu sonuçlarini siralamak icin hangi clause kullanilir?', en: 'Which clause is used to sort SELECT query results?' }, options: [{ id: 'a', text: 'GROUP BY' }, { id: 'b', text: 'ORDER BY' }, { id: 'c', text: 'SORT BY' }, { id: 'd', text: 'HAVING' }], correct: 'b', explanation: { tr: 'ORDER BY, sutun adi ve istege bagli ASC (artan) ya da DESC (azalan) yonuyle sonuclari siralar.', en: 'ORDER BY sorts results by a column name with optional ASC (ascending) or DESC (descending) direction.' } ,
        retryQuestion: {
      "question": {
            "tr": "SELECT ifadesinde belirli bir sutuna gore verileri kucukten buyuge veya buyukten kucuge siralayan komut hangisidir?",
            "en": "Which command is used in a SELECT statement to arrange data in ascending or descending order based on a specific column?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "LIMIT",
                        "en": "LIMIT"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "ORDER BY",
                        "en": "ORDER BY"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "GROUP BY",
                        "en": "GROUP BY"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "DISTINCT",
                        "en": "DISTINCT"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "ORDER BY ifadesi, belirtilen sutun veya sutunlara gore sorgu sonuclarini duzenlemek icin kullanilir.",
            "en": "The ORDER BY clause is used to arrange the query results based on the specified column or columns."
      }
}
},
      // Quiz: PRIMARY KEY
      { type: 'quiz', question: { tr: 'Tablodaki her satiri benzersiz tanimlayan kisitlama hangisidir?', en: 'Which constraint uniquely identifies every row in a table?' }, options: [{ id: 'a', text: 'FOREIGN KEY' }, { id: 'b', text: 'UNIQUE' }, { id: 'c', text: 'PRIMARY KEY' }, { id: 'd', text: 'NOT NULL' }], correct: 'c', explanation: { tr: 'PRIMARY KEY, her satiri benzersiz tanimlar, NULL olamaz ve tekrar edemez. Her tabloda yalnizca bir tane olabilir.', en: 'PRIMARY KEY uniquely identifies each row, cannot be NULL, and must be unique. Only one per table is allowed.' } ,
        retryQuestion: {
      "question": {
            "tr": "Bir veritabanı tablosundaki her kaydı kesin olarak tanımlamak ve null değer almasını engellemek için kullanılan sütun kısıtlaması nedir?",
            "en": "Which database column constraint is used to ensure that each record can be definitively identified and cannot contain null values?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "CHECK"
            },
            {
                  "id": "b",
                  "text": "DEFAULT"
            },
            {
                  "id": "c",
                  "text": "PRIMARY KEY"
            },
            {
                  "id": "d",
                  "text": "UNIQUE"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "PRIMARY KEY, tablodaki satırları eşsiz bir şekilde tanımlayan, NULL olamayan ve varsayılan olarak indekslenen kısıtlamadır.",
            "en": "A PRIMARY KEY is a constraint that uniquely identifies records in a table, enforces non-nullability, and is automatically indexed."
      }
}
},
      // Interview Questions: SQL Foundations
      { type: 'interview-questions', topic: 'SQL Foundations', questions: [
        { level: 'basic', q: { tr: 'SELECT * ile SELECT col1, col2 arasindaki fark nedir?', en: 'What is the difference between SELECT * and SELECT col1, col2?' }, a: { tr: 'SELECT * tum sutunlari dondurur — hizli sorgu icin uygun ama uretimde onerilmez: gereksiz veri aktarir, index kullanimini zorlastitir, sema degisikliginde beklenmedik sonuclar verebilir. SELECT col1, col2 sadece ihtiyac duydugunuz sutunlari getirir — daha hizli, daha guvenli.', en: 'SELECT * returns all columns — fine for quick exploration but not recommended in production: it transfers unnecessary data, can break covering indexes, and may cause issues when schema changes. SELECT col1, col2 fetches only what you need — faster and safer.' } },
        { level: 'basic', q: { tr: 'WHERE clause olmadan UPDATE veya DELETE calistirirsaniz ne olur?', en: 'What happens if you run UPDATE or DELETE without a WHERE clause?' }, a: { tr: 'WHERE olmadan UPDATE veya DELETE tum satirlari etkiler. Bu cok ciddi bir hata olabilir. Her zaman once SELECT ile WHERE kosulunuzu test edin.', en: 'Without WHERE, UPDATE or DELETE affects EVERY row in the table. This can be catastrophic. Always test your WHERE condition with a SELECT first.' } },
        { level: 'basic', q: { tr: 'NULL degeri nasil kontrol edersiniz?', en: 'How do you check for NULL values?' }, a: { tr: 'NULL icin ASLA = veya != kullanmayin. Dogru yontem: WHERE column IS NULL veya WHERE column IS NOT NULL. COALESCE(column, varsayilan) ise NULL yerine varsayilan deger dondurur.', en: 'NEVER use = or != for NULL. Correct: WHERE column IS NULL or WHERE column IS NOT NULL. COALESCE(column, default) returns a fallback value instead of NULL.' } },
        { level: 'intermediate', q: { tr: 'PRIMARY KEY ile UNIQUE constraint arasindaki fark nedir?', en: 'What is the difference between PRIMARY KEY and UNIQUE constraint?' }, a: { tr: 'PRIMARY KEY = UNIQUE + NOT NULL + tablede yalnizca bir tane. UNIQUE constraint birden fazla olabilir, NULL degerlere izin verir. QA perspektifinden: email icin UNIQUE, id icin PRIMARY KEY kullanin.', en: 'PRIMARY KEY = UNIQUE + NOT NULL + only one per table. UNIQUE constraints can be multiple per table and typically allow NULL. QA perspective: use UNIQUE for email, PRIMARY KEY for id.' } },
        { level: 'intermediate', q: { tr: 'LIKE operatoru wildcard karakterleri ne anlama gelir?', en: 'What do the % and _ wildcards mean in LIKE?' }, a: { tr: '% sifir veya daha fazla herhangi bir karakteri temsil eder. _ tam olarak bir karakteri temsil eder. Buyuk tablolarda LIKE aramasi index kullanamaz (ozellikle % ile basliyor ise) — yavaslayabilir.', en: '% matches zero or more characters. _ matches exactly one character. LIKE searches on large tables may not use indexes (especially with a leading %) — can be slow.' } },
        { level: 'advanced', q: { tr: 'SQL query execution order nedir ve neden onemlidir?', en: 'What is SQL query execution order and why does it matter?' }, a: { tr: 'Yazma sirasi: SELECT->FROM->WHERE->GROUP BY->HAVING->ORDER BY. Calisma sirasi: FROM->JOIN->WHERE->GROUP BY->HAVING->SELECT->ORDER BY->LIMIT. Bu yuzden SELECT icindeki alias WHERE icinde kullanilamaz — WHERE, SELECT ten once calisir.', en: 'Writing order: SELECT->FROM->WHERE->GROUP BY->HAVING->ORDER BY. Execution order: FROM->JOIN->WHERE->GROUP BY->HAVING->SELECT->ORDER BY->LIMIT. That is why SELECT aliases cannot be used in WHERE — WHERE runs before SELECT.' } },
        { level: 'advanced', q: { tr: 'Test otomasyonunda SQL i nasil kullanirsiniz?', en: 'How do you use SQL in test automation?' }, a: { tr: 'Test otomasyonunda SQL uc sekilde kullanilir: 1) Test verisi hazirlama — INSERT ile test kullanicilari olustur. 2) Backend dogrulama — UI aksiyonundan sonra DB sorgulayarak veri kaydedildi mi kontrol et. 3) Temizlik — DELETE ile her test sonrasi kirli veriyi sil.', en: 'SQL is used in test automation in three ways: 1) Test data setup — INSERT test users/products. 2) Backend validation — after a UI action, query DB to confirm data was saved. 3) Cleanup — DELETE dirty test data after each test.' } },
      ]},
    ],
  },

  // ── 3. INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    title: '🟡 Level 2: Intermediate SQL',
    blocks: [
      { type: 'simple-box', emoji: '🔗', content: { tr: "JOIN, iki tabloyu ortak bir sütuna göre birleştirmek — iki Excel dosyasını müşteri numarasına göre yan yana koymak gibi. Java'da bunu iki liste üzerinde iç içe for döngüsüyle yapardın. SQL'de tek satırda JOIN yazarsın.", en: "JOIN means connecting two tables on a shared column — like merging two Excel sheets by customer ID. In Java you'd use nested for loops over two lists. In SQL you write JOIN in one line and the database does the rest." } },
      { type: 'heading', text: 'Aggregate Functions', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- Aggregate functions summarize multiple rows into one value:
SELECT COUNT(*)                 AS total_tests    FROM test_results;
SELECT COUNT(*) FILTER (WHERE status='PASS') AS passed FROM test_results;  -- PostgreSQL
SELECT SUM(duration_ms)         AS total_ms       FROM test_results;
SELECT AVG(duration_ms)         AS avg_ms         FROM test_results;
SELECT MIN(duration_ms)         AS fastest_ms     FROM test_results;
SELECT MAX(duration_ms)         AS slowest_ms     FROM test_results;

-- Round decimals:
SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;`,
        expected: `+-------------+\n| total_tests |\n+-------------+\n|           6 |\n+-------------+`
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');
INSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');
INSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');
INSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');
INSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');
INSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');
INSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');
INSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');`,
        defaultCode: `-- Aggregate functions — çalıştır!
SELECT COUNT(*) AS total_tests FROM test_results;

-- Diğerlerini dene:
-- SELECT SUM(duration_ms) AS total_ms FROM test_results;
-- SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;
-- SELECT MIN(duration_ms) AS fastest, MAX(duration_ms) AS slowest FROM test_results;
-- SELECT COUNT(*) AS failed FROM test_results WHERE status = 'FAIL';`
      },
      { type: 'heading', text: 'GROUP BY and HAVING', difficulty: '🟡 Intermediate' },
      { type: 'text', content: 'GROUP BY groups rows with the same value in a column. HAVING filters those groups (like WHERE but for aggregate results). You CANNOT use COUNT/SUM/etc. in a WHERE clause — use HAVING instead.' },
      {
        type: 'code',
        code: `-- Count tests by status:
SELECT status, COUNT(*) AS count
FROM test_results
GROUP BY status
ORDER BY count DESC;

-- Average duration per environment (only envs with > 3 tests):
SELECT environment,
       COUNT(*)            AS total,
       ROUND(AVG(duration_ms), 0) AS avg_ms
FROM test_results
GROUP BY environment
HAVING COUNT(*) > 3          -- HAVING filters groups (not rows!)
ORDER BY avg_ms DESC;

-- WHERE (filter before grouping) + HAVING (filter after):
SELECT test_name, COUNT(*) AS run_count
FROM test_results
WHERE status = 'FAIL'        -- only FAIL rows
GROUP BY test_name
HAVING COUNT(*) > 2;         -- tests that failed more than 2 times`,
        expected: `+--------+-------+\n| status | count |\n+--------+-------+\n| PASS   |     3 |\n| FAIL   |     2 |\n| SKIP   |     1 |\n+--------+-------+`
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');
INSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');
INSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');
INSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');
INSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');
INSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');
INSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');
INSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');`,
        defaultCode: `-- GROUP BY — statusa göre say
SELECT status, COUNT(*) AS count
FROM test_results
GROUP BY status
ORDER BY count DESC;

-- Diğerlerini dene:
-- SELECT environment, ROUND(AVG(duration_ms),0) AS avg_ms FROM test_results GROUP BY environment;
-- SELECT test_name, COUNT(*) AS runs FROM test_results GROUP BY test_name HAVING COUNT(*) > 1;`
      },
      { type: 'heading', text: 'JOINs — Combining Tables', difficulty: '🟡 Intermediate' },
      { type: 'text', content: 'JOINs let you query data from multiple related tables in one go. Essential for any real-world database where data is split across tables.' },
      {
        type: 'code',
        code: `-- Our tables:
-- testers:  id, name, email
-- bugs:     id, title, status, tester_id (FK → testers.id), project_id (FK → projects.id)
-- projects: id, name, deadline

-- INNER JOIN: only rows matching in BOTH tables
SELECT t.name AS tester, b.title AS bug, b.status
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id;
-- Rows with no matching tester OR no matching bug are EXCLUDED

-- LEFT JOIN: ALL rows from left table + matching from right (NULL if no match)
SELECT t.name, COUNT(b.id) AS assigned_bugs
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Testers with 0 bugs still appear (assigned_bugs = 0)

-- RIGHT JOIN: ALL rows from right table + matching from left
-- (rarely used — usually rewrite as LEFT JOIN with tables swapped)

-- Multi-table JOIN:
SELECT t.name AS tester, p.name AS project, b.title AS bug, b.status
FROM testers t
JOIN bugs b      ON t.id = b.tester_id
JOIN projects p  ON b.project_id = p.id
WHERE b.status = 'OPEN'
ORDER BY p.name, t.name;`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);
INSERT INTO testers VALUES (1,'Alice','alice@qa.com'),(2,'Bob','bob@qa.com'),(3,'Carol','carol@qa.com');
INSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');
INSERT INTO bugs VALUES
(1,'Login fails on Safari','OPEN','HIGH',1,1),
(2,'Broken image on profile','CLOSED','LOW',1,1),
(3,'API timeout on checkout','OPEN','HIGH',2,3),
(4,'Wrong error message','OPEN','MEDIUM',2,2),
(5,'Crash on empty search','OPEN','HIGH',3,1);`,
        defaultCode: `-- INNER JOIN: testers ve bug'lar birleştir
SELECT t.name AS tester, b.title AS bug, b.status
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id;

-- Diğerlerini dene:
-- SELECT t.name, COUNT(b.id) AS assigned_bugs FROM testers t LEFT JOIN bugs b ON t.id=b.tester_id GROUP BY t.id,t.name;
-- SELECT t.name, p.name AS project, b.title FROM testers t JOIN bugs b ON t.id=b.tester_id JOIN projects p ON b.project_id=p.id WHERE b.status='OPEN';`
      },
      { type: 'heading', text: 'Subqueries', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- Subquery in WHERE (scalar subquery):
SELECT test_name, duration_ms
FROM test_results
WHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results);
-- tests that are slower than average

-- Subquery with IN:
SELECT t.name
FROM testers t
WHERE t.id IN (
    SELECT DISTINCT tester_id FROM bugs WHERE status = 'OPEN'
);
-- testers who have at least one open bug

-- Subquery in FROM (derived table — must be aliased):
SELECT environment, avg_ms
FROM (
    SELECT environment, AVG(duration_ms) AS avg_ms
    FROM test_results
    GROUP BY environment
) AS env_stats
WHERE avg_ms > 2000;`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES
(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),
(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),
(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),
(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');
CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, tester_id INTEGER);
INSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');
INSERT INTO bugs VALUES (1,'Login fails','OPEN',1),(2,'Broken image','CLOSED',1),(3,'API timeout','OPEN',2),(4,'Wrong msg','OPEN',2);`,
        defaultCode: `-- Ortalamanın üzerindeki testler (scalar subquery):
SELECT test_name, duration_ms
FROM test_results
WHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results)
ORDER BY duration_ms DESC;

-- Diğerlerini dene:
-- SELECT name FROM testers WHERE id IN (SELECT DISTINCT tester_id FROM bugs WHERE status='OPEN');`
      },
      { type: 'heading', text: 'LIKE, BETWEEN, IN', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- LIKE: pattern matching
-- % = any number of characters, _ = exactly one character
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains
SELECT * FROM test_results WHERE test_name LIKE 'Sign_p%';  -- starts with Sign?p

-- BETWEEN: inclusive range
SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;
SELECT * FROM test_results WHERE run_date BETWEEN '2024-01-01' AND '2024-01-31';

-- IN: matches any value in a list
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');
SELECT * FROM test_results WHERE environment NOT IN ('prod', 'staging');

-- Aliases make output readable:
SELECT
    t.test_name  AS "Test Name",
    t.duration_ms / 1000.0 AS "Duration (sec)",
    t.status
FROM test_results AS t
WHERE t.status != 'SKIP';`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES
(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),
(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),
(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),
(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');`,
        defaultCode: `-- LIKE: "Login" içeren testler
SELECT test_name, status FROM test_results WHERE test_name LIKE '%Login%';

-- Diğerlerini dene:
-- SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;
-- SELECT * FROM test_results WHERE status IN ('FAIL','SKIP');
-- SELECT test_name AS "Test Adı", duration_ms/1000.0 AS "Süre (sn)", status FROM test_results WHERE status != 'SKIP';`
      },
      { type: 'heading', text: 'Bug Tracking DB — Interactive Example', difficulty: '🟡 Intermediate' },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);
INSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');
INSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');
INSERT INTO bugs VALUES
(1,'Login fails on Safari','OPEN','HIGH',1,1),
(2,'Broken image on profile','CLOSED','LOW',1,1),
(3,'API timeout on checkout','OPEN','HIGH',2,3),
(4,'Wrong error message','OPEN','MEDIUM',2,2),
(5,'Crash on empty search','OPEN','HIGH',3,1);`,
        defaultCode: `-- En fazla açık hata olan kişi kim?
SELECT te.name, COUNT(*) AS open_bugs
FROM testers te
JOIN bugs b ON te.id = b.tester_id
WHERE b.status = 'OPEN'
GROUP BY te.id, te.name
ORDER BY open_bugs DESC;

-- Diğerlerini dene:
-- SELECT p.name AS project, COUNT(b.id) AS total_bugs FROM projects p LEFT JOIN bugs b ON p.id=b.project_id GROUP BY p.id,p.name;
-- SELECT te.name, b.title, b.priority FROM testers te JOIN bugs b ON te.id=b.tester_id WHERE b.priority='HIGH';`
      },
      { type: 'heading', text: 'Visual JOIN Guide — See Exactly Which Rows Are Returned' },
      { type: 'text', content: 'The 4 diagrams below use the same data. Click "Eşleşmeleri Göster" to highlight matched rows, then "Sonucu Göster" to see the query result. This is the fastest way to truly understand JOINs.' },
      {
        type: 'visual', variant: 'join',
        joinType: 'INNER JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
          ]
        },
        resultHeaders: ['tester', 'bug_title', 'status'],
        resultRows: [
          ['Alice', 'Login fails on Safari', 'OPEN'],
          ['Alice', 'Broken image on profile', 'CLOSED'],
          ['Bob', 'API timeout on checkout', 'OPEN'],
        ],
        explanation: 'INNER JOIN returns ONLY rows that match in BOTH tables. Carol has no bugs — she is completely excluded from the result.',
      },
      {
        type: 'visual', variant: 'join',
        joinType: 'LEFT JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false, nullFill: true },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
          ]
        },
        resultHeaders: ['tester', 'bug_count'],
        resultRows: [
          ['Alice', 2],
          ['Bob', 1],
          ['Carol', 0],
        ],
        explanation: 'LEFT JOIN returns ALL rows from the LEFT table (testers), plus matches from bugs. Carol appears with bug_count=0 — LEFT JOIN is perfect for "count per user including zeros".',
      },
      {
        type: 'visual', variant: 'join',
        joinType: 'RIGHT JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
            { label: '4 | Crash | t=99 (no tester!)', matched: false, nullFill: true },
          ]
        },
        resultHeaders: ['tester', 'bug_title'],
        resultRows: [
          ['Alice', 'Login fails on Safari'],
          ['Alice', 'Broken image on profile'],
          ['Bob', 'API timeout on checkout'],
          [null, 'Crash on empty search'],
        ],
        explanation: 'RIGHT JOIN returns ALL rows from the RIGHT table (bugs). Bug #4 has no tester — it still appears with tester = NULL. Rarely used — most developers rewrite as LEFT JOIN with tables swapped.',
      },
      {
        type: 'comparison',
        left: {
          label: '❌ Slow — Subquery for every row',
          code: `SELECT name,
  (SELECT COUNT(*) FROM bugs
   WHERE tester_id = t.id) AS bug_count
FROM testers t;
-- Runs inner SELECT once per tester row!`,
          note: 'Correlated subquery: O(n) inner queries',
        },
        right: {
          label: '✅ Fast — Single JOIN + GROUP BY',
          code: `SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Single pass through both tables`,
          note: 'LEFT JOIN: handles 0 bugs correctly too',
        },
      },
      {
        type: 'quiz',
        question: 'Which JOIN type returns ALL rows from the left table, including rows with NO matches in the right table?',
        options: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 2,
        explanation: 'LEFT JOIN (also called LEFT OUTER JOIN) returns every row from the left table. For right-table columns with no match, NULL values appear. Use it when you need "all X, even if they have no related Y" — like all testers including those with 0 bugs.',
      
        retryQuestion: {
      "question": "Which SQL operation is used to retrieve all records from the right-hand table, even if there is no matching data found in the left-hand table?",
      "options": [
            {
                  "id": "a",
                  "text": "LEFT JOIN"
            },
            {
                  "id": "b",
                  "text": "RIGHT JOIN"
            },
            {
                  "id": "c",
                  "text": "INNER JOIN"
            },
            {
                  "id": "d",
                  "text": "FULL OUTER JOIN"
            }
      ],
      "correct": "b",
      "explanation": "RIGHT JOIN (or RIGHT OUTER JOIN) ensures that all rows from the right table are included in the result set, filling in NULLs for any columns where no relationship exists in the left table."
}
},
      { type: 'heading', text: '☕ If You Know Java: PreparedStatement & Transactions' },
      {
        type: 'java-compare',
        topic: 'PreparedStatement → Parameterized Query',
        why: 'SQL Injection prevention! Java uses ? placeholders with PreparedStatement. Python uses the same concept — %s (MySQL/PostgreSQL) or ? (SQLite). Never concatenate user input into SQL strings!',
        java: `// Java: PreparedStatement — SQL injection safe!
String sql = "SELECT * FROM users WHERE email = ? AND is_active = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, userEmail);   // 1-indexed params
ps.setBoolean(2, true);
ResultSet rs = ps.executeQuery();

// INSERT with PreparedStatement:
PreparedStatement ins = conn.prepareStatement(
    "INSERT INTO test_results (test_name, status) VALUES (?, ?)"
);
ins.setString(1, testName);
ins.setString(2, "PASS");
ins.executeUpdate();`,
        python: `# Python: parameterized query (%s for MySQL/psycopg2)
cursor.execute(
    "SELECT * FROM users WHERE email = %s AND is_active = %s",
    (user_email, True)   # tuple of values — NOT f-string!
)

# SQLite uses ? (same as Java PreparedStatement):
cursor.execute(
    "SELECT * FROM users WHERE email = ? AND is_active = ?",
    (user_email, 1)
)

# INSERT:
cursor.execute(
    "INSERT INTO test_results (test_name, status) VALUES (%s, %s)",
    (test_name, "PASS")
)
conn.commit()  # don't forget!`,
        note: 'Python psycopg2/MySQL uses %s. SQLite uses ? (same as Java!). NEVER use f-strings or + concatenation for SQL values — always use parameterized queries.',
      },
      {
        type: 'java-compare',
        topic: 'Transaction Management (commit / rollback)',
        why: 'Transactions guarantee all-or-nothing changes — critical for test data setup. Java calls setAutoCommit(false). Python\'s drivers have auto-commit off by default, so you explicitly call commit().',
        java: `// Java: manual transaction control
try {
    conn.setAutoCommit(false);  // begin transaction
    stmt.executeUpdate("INSERT INTO orders ...");
    stmt.executeUpdate("UPDATE inventory SET qty=qty-1 ...");
    conn.commit();               // save ALL changes
} catch (SQLException e) {
    conn.rollback();             // undo ALL changes
    throw e;
} finally {
    conn.setAutoCommit(true);
}`,
        python: `# Python: explicit commit / rollback
try:
    cursor.execute("INSERT INTO orders ...")
    cursor.execute("UPDATE inventory SET qty=qty-1 ...")
    conn.commit()    # save ALL changes
except Exception:
    conn.rollback()  # undo ALL changes
    raise

# Cleanest: "with" context manager (psycopg2):
with conn:   # auto-commits on success, rolls back on error
    cursor.execute("INSERT INTO orders ...")
    cursor.execute("UPDATE inventory SET qty=qty-1 ...")`,
        note: 'QA tip: wrap test data setup in a transaction and rollback after each test — keeps the DB clean without writing DELETE cleanup queries.',
      },
      // Quiz: HAVING
      { type: 'quiz', question: { tr: 'GROUP BY ile birlikte gruplanmis sonuclari filtreleyen clause hangisidir?', en: 'Which clause filters grouped results when used with GROUP BY?' }, options: [{ id: 'a', text: 'WHERE' }, { id: 'b', text: 'HAVING' }, { id: 'c', text: 'FILTER' }, { id: 'd', text: 'ORDER BY' }], correct: 'b', explanation: { tr: 'HAVING, aggregate fonksiyon sonuclarini (COUNT, SUM vb.) filtreler. WHERE ise satirlari gruplamadan once filtreler.', en: 'HAVING filters aggregate results (COUNT, SUM etc.). WHERE filters individual rows before grouping — you cannot use COUNT(*) in a WHERE clause.' } ,
        retryQuestion: {
      "question": {
            "tr": "SQL sorgularında, gruplandırılmış veriler üzerinde (örneğin COUNT, SUM sonuçları gibi) filtreleme yapmak için hangi anahtar kelime kullanılır?",
            "en": "Which keyword is used in SQL queries to filter data based on aggregate functions (like COUNT, SUM) performed on grouped data?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "WHERE"
            },
            {
                  "id": "b",
                  "text": "HAVING"
            },
            {
                  "id": "c",
                  "text": "GROUP BY"
            },
            {
                  "id": "d",
                  "text": "LIMIT"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "HAVING, GROUP BY sonrası oluşturulan özetlenmiş verileri filtrelemek için kullanılır, WHERE ise gruplama öncesi satırları filtreler.",
            "en": "HAVING is specifically designed to filter aggregated result sets created by the GROUP BY clause, whereas WHERE is used to filter individual records before any grouping occurs."
      }
}
},
      // Quiz: LEFT JOIN
      { type: 'quiz', question: { tr: 'Hangi JOIN turu sol tablodan tum satirlari dondurur, sagda eslesme olmasa bile?', en: 'Which JOIN returns ALL rows from the left table, even with no match on the right?' }, options: [{ id: 'a', text: 'INNER JOIN' }, { id: 'b', text: 'CROSS JOIN' }, { id: 'c', text: 'RIGHT JOIN' }, { id: 'd', text: 'LEFT JOIN' }], correct: 'd', explanation: { tr: 'LEFT JOIN, sol tablodaki tum satirlari dondurur. Sag tabloda eslesme yoksa sag sutunlar NULL olur.', en: 'LEFT JOIN returns every row from the left table. If there is no match on the right, right-side columns come back as NULL.' } ,
        retryQuestion: {
      "question": {
            "tr": "Hangi JOIN turu sag tablodaki tum satirlari dondurur, solda eslesme olmasa bile?",
            "en": "Which JOIN returns ALL rows from the right table, even with no match on the left?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "INNER JOIN"
            },
            {
                  "id": "b",
                  "text": "RIGHT JOIN"
            },
            {
                  "id": "c",
                  "text": "LEFT JOIN"
            },
            {
                  "id": "d",
                  "text": "CROSS JOIN"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "RIGHT JOIN, sag tablodaki tum satirlari dondurur. Sol tabloda eslesme yoksa sol sutunlar NULL degeri alir.",
            "en": "A RIGHT JOIN returns every row from the right table. If there is no match on the left, left-side columns are returned as NULL."
      }
}
},
      // Quiz: Correlated subquery
      { type: 'quiz', question: { tr: 'Correlated subquery ile normal subquery arasindaki temel fark nedir?', en: 'What is the key difference between a correlated and a regular subquery?' }, options: [{ id: 'a', text: 'Correlated subquery sadece FROM clause\'da calisir' }, { id: 'b', text: 'Correlated subquery dis sorgunun her satiri icin bir kez calisir' }, { id: 'c', text: 'Normal subquery her zaman daha yavastir' }, { id: 'd', text: 'Aralarinda bir fark yoktur' }], correct: 'b', explanation: { tr: 'Correlated subquery, dis sorgunun bir sutununa referans verir ve dis sorgunun her satiri icin yeniden calisir. Mumkunse JOIN kullanin.', en: 'A correlated subquery references a column from the outer query and runs once per outer row — can be slow. Use a JOIN instead when possible.' } ,
        retryQuestion: {
      "question": {
            "tr": "Bir 'Correlated subquery' hakkinda asagidaki ifadelerden hangisi dogrudur?",
            "en": "Which of the following statements is true regarding a correlated subquery?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Bagimsiz olarak calisabilir ve dis sorguyla iletisim kurmaz"
            },
            {
                  "id": "b",
                  "text": "Dis sorgudan gelen veriye baglidir ve her satir icin tekrar calisir"
            },
            {
                  "id": "c",
                  "text": "Sadece tek bir sonuc degeri dondurmek zorundadir"
            },
            {
                  "id": "d",
                  "text": "Daima performans acisindan JOIN islemlerinden daha iyidir"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Correlated subquery, dis sorgudaki bir degere bagimlidir, bu yuzden dis sorgunun her bir satirinda subquery tekrar islenir.",
            "en": "A correlated subquery is dependent on a value from the outer query, causing the subquery to be executed repeatedly for every row processed by the outer query."
      }
}
},
      // Interview Questions: SQL Intermediate
      { type: 'interview-questions', topic: 'SQL Intermediate', questions: [
        { level: 'basic', q: { tr: 'Aggregate fonksiyonlari GROUP BY olmadan kullanabilir misiniz?', en: 'Can you use aggregate functions without GROUP BY?' }, a: { tr: 'Evet. GROUP BY olmadan aggregate TUM tabloyu tek bir grup olarak ele alir ve tek bir deger dondurur. SELECT COUNT(*) FROM test_results tum satir sayisini verir. GROUP BY ekleyince her grup icin ayri satir uretilir.', en: 'Yes. Without GROUP BY, aggregates treat the entire table as one group and return a single value. SELECT COUNT(*) FROM test_results gives total row count. Add GROUP BY to get one row per group.' } },
        { level: 'basic', q: { tr: 'INNER JOIN ile LEFT JOIN ne zaman hangisini kullanmalisiniz?', en: 'When should you use INNER JOIN vs LEFT JOIN?' }, a: { tr: 'INNER JOIN: Her iki tabloda da eslesme zorunluysa. LEFT JOIN: Eslesme olmasa bile sol tablonun tum kayitlarini gormek istediginizde. QA da: yetim kayitlari bulmak icin LEFT JOIN + WHERE sag.id IS NULL kullanin.', en: 'INNER JOIN: Use when data must exist in both tables. LEFT JOIN: When you want all rows from the left table regardless of matches. In QA: use LEFT JOIN + WHERE right.id IS NULL to find orphaned records.' } },
        { level: 'intermediate', q: { tr: 'Bir sorguda birden fazla JOIN kullanirken performansi nasil optimize edersiniz?', en: 'How do you optimize performance when using multiple JOINs?' }, a: { tr: '1. JOIN yapilan sutunlara (FK sutunlari) index ekle. 2. WHERE kosulunu erken filtrele. 3. Sadece gerekli sutunlari sec. 4. EXPLAIN ile sorgu planini incele. 5. Karmasik sorgular icin CTE kullan.', en: '1. Add indexes on JOIN columns (FK columns). 2. Filter early with WHERE. 3. Select only needed columns. 4. Use EXPLAIN to inspect the query plan. 5. Use CTEs for complex queries.' } },
        { level: 'intermediate', q: { tr: 'Correlated subquery yi JOIN ile nasil yeniden yazarsiniz?', en: 'How would you rewrite a correlated subquery as a JOIN?' }, a: { tr: 'Correlated subquery: SELECT name, (SELECT COUNT(*) FROM bugs WHERE tester_id=t.id) AS cnt FROM testers t. JOIN versiyonu: SELECT t.name, COUNT(b.id) AS cnt FROM testers t LEFT JOIN bugs b ON t.id=b.tester_id GROUP BY t.id, t.name. JOIN cok daha hizlidir.', en: 'Correlated: SELECT name, (SELECT COUNT(*) FROM bugs WHERE tester_id=t.id) AS cnt FROM testers t. JOIN version: SELECT t.name, COUNT(b.id) AS cnt FROM testers t LEFT JOIN bugs b ON t.id=b.tester_id GROUP BY t.id, t.name. JOIN is much faster.' } },
        { level: 'advanced', q: { tr: 'PreparedStatement neden onemlidir?', en: 'Why are parameterized queries important?' }, a: { tr: 'SQL Injection guvenligi icin kritiktir. Kullanici girdisini string birlestirme ile SQL e eklerseniz saldirgan tum verileri okuyabilir. Parametreli sorgularda degerler veri olarak islenir, asla SQL kodu olarak yorumlanamaz.', en: 'Critical for SQL injection security. If you concatenate user input into SQL strings, an attacker can read all data. With parameterized queries, values are always treated as data — never interpreted as SQL code.' } },
        { level: 'advanced', q: { tr: 'Transaction rollback i test otomasyonunda nasil kullanirsiniz?', en: 'How do you use transaction rollback in test automation?' }, a: { tr: 'Her test oncesinde transaction baslat, test sonrasinda rollback yap — DB her zaman temiz kalir. Python da: conn.autocommit = False, test blogu, conn.rollback(). pytest fixture olarak yazilabilir. Bu yontem testleri bagimsiz kilar.', en: 'Start a transaction before each test and rollback at the end — DB stays clean. In Python: conn.autocommit = False, test block, conn.rollback(). Can be written as a pytest fixture. This makes tests independent.' } },
      ]},
    ],
  },

  // ── 4. ADVANCED ─────────────────────────────────────────────────────────────
  {
    title: '🔴 Level 3: Advanced SQL',
    blocks: [
      { type: 'simple-box', emoji: '🪟', content: { tr: "Window fonksiyonu, GROUP BY'ın yaptığını yapar ama satırları yutmaz. GROUP BY 100 satırı 3 gruba indirger. Window fonksiyon 100 satırı korur ve her birine hesaplama ekler — Java'da Streams + Map kombinasyonu gibi ama çok daha kısa.", en: "A window function does what GROUP BY does but keeps all rows. GROUP BY collapses 100 rows into 3 groups. A window function keeps all 100 rows and adds calculations per row — like Java Streams + Map combined, but in a fraction of the code." } },
      { type: 'heading', text: 'Window Functions', difficulty: '🔴 Advanced' },
      { type: 'text', content: 'Window functions perform calculations across a "window" of related rows WITHOUT collapsing them like GROUP BY does. Each row gets its own result while also knowing about surrounding rows.' },
      {
        type: 'code',
        code: `-- ROW_NUMBER: sequential number (ties each get unique numbers)
-- RANK:       ties get same number, then GAPS (1,1,3)
-- DENSE_RANK: ties get same number, NO gaps (1,1,2)

SELECT test_name, duration_ms,
       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,
       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,
       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk
FROM test_results;

-- PARTITION BY: reset numbering per group (like GROUP BY without collapsing)
SELECT tester_name, project, bug_count,
       RANK() OVER (PARTITION BY project ORDER BY bug_count DESC) AS rank_in_project
FROM tester_project_bugs;
-- → Rank 1 per project's top bug-finder

-- LAG / LEAD: access previous/next row values
SELECT run_date, total_failures,
       LAG(total_failures)  OVER (ORDER BY run_date) AS prev_failures,
       total_failures - LAG(total_failures) OVER (ORDER BY run_date) AS change
FROM daily_test_stats;

-- Running total:
SELECT run_date, new_tests,
       SUM(new_tests) OVER (ORDER BY run_date) AS cumulative_tests
FROM daily_stats;`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES
(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),
(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),
(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),
(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');`,
        defaultCode: `-- ROW_NUMBER, RANK, DENSE_RANK — window functions
SELECT test_name, duration_ms,
       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,
       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,
       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk
FROM test_results;

-- Diğerlerini dene:
-- SELECT environment, test_name, duration_ms, RANK() OVER (PARTITION BY environment ORDER BY duration_ms DESC) AS rank_in_env FROM test_results;`
      },
      { type: 'heading', text: 'CTEs — Common Table Expressions', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- CTE: a named subquery at the top of your statement.
-- Makes complex queries readable by breaking into named steps.

WITH failed_tests AS (
    SELECT test_name, COUNT(*) AS fail_count
    FROM test_results
    WHERE status = 'FAIL'
    GROUP BY test_name
),
recent_passes AS (
    SELECT test_name, MAX(run_date) AS last_pass_date
    FROM test_results
    WHERE status = 'PASS'
    GROUP BY test_name
)
-- Now use both CTEs together:
SELECT f.test_name, f.fail_count, p.last_pass_date
FROM failed_tests f
LEFT JOIN recent_passes p ON f.test_name = p.test_name
ORDER BY f.fail_count DESC;

-- Recursive CTE (for hierarchical data like org charts, nested categories):
WITH RECURSIVE org AS (
    SELECT id, name, manager_id, 0 AS level
    FROM employees WHERE manager_id IS NULL          -- start: CEO

    UNION ALL

    SELECT e.id, e.name, e.manager_id, o.level + 1
    FROM employees e
    JOIN org o ON e.manager_id = o.id
)
SELECT level, name FROM org ORDER BY level;`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);
INSERT INTO test_results VALUES
(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),
(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),
(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),
(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');`,
        defaultCode: `-- CTE: başarısız testleri adımlara ayır
WITH failed_tests AS (
    SELECT test_name, COUNT(*) AS fail_count
    FROM test_results
    WHERE status = 'FAIL'
    GROUP BY test_name
),
pass_times AS (
    SELECT test_name, AVG(duration_ms) AS avg_ms
    FROM test_results
    WHERE status = 'PASS'
    GROUP BY test_name
)
SELECT f.test_name, f.fail_count, ROUND(p.avg_ms,0) AS avg_pass_ms
FROM failed_tests f
LEFT JOIN pass_times p ON f.test_name = p.test_name
ORDER BY f.fail_count DESC;`
      },
      { type: 'heading', text: 'Transactions — ACID Properties', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- A transaction is a group of SQL statements that execute as ONE unit.
-- Either ALL succeed (COMMIT) or ALL are undone (ROLLBACK).
-- ACID: Atomicity, Consistency, Isolation, Durability

-- Example: Transfer test case from one project to another
START TRANSACTION;

UPDATE test_cases SET project_id = 2 WHERE id = 42;  -- move test case
INSERT INTO audit_log (action, test_id)              -- log the action
       VALUES ('moved_to_project_2', 42);

-- If everything looks good:
COMMIT;

-- If something went wrong:
-- ROLLBACK;   -- undo BOTH statements

-- SAVEPOINT: partial rollback
START TRANSACTION;
INSERT INTO test_results (test_name, status) VALUES ('Test A', 'PASS');
SAVEPOINT after_a;
INSERT INTO test_results (test_name, status) VALUES ('Test B', 'FAIL');
ROLLBACK TO SAVEPOINT after_a;  -- undo Test B, keep Test A
COMMIT;                          -- commits only Test A`,
      },
      { type: 'heading', text: 'Indexes — Speed Up Queries', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- Create indexes on columns used frequently in WHERE/JOIN:
CREATE INDEX idx_results_status  ON test_results(status);
CREATE INDEX idx_results_run_date ON test_results(run_date);
CREATE INDEX idx_bugs_tester     ON bugs(tester_id);       -- FK columns always!
CREATE INDEX idx_results_env_status ON test_results(environment, status);  -- composite

-- Unique index (also enforces uniqueness):
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- View indexes on a table:
SHOW INDEX FROM test_results;      -- MySQL
\di test_results                   -- PostgreSQL

-- EXPLAIN: see how MySQL plans to execute a query
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- "type: ALL" = full table scan (slow, needs index)
-- "type: ref" = using index (fast!)

-- Add index and check improvement:
CREATE INDEX idx_status ON test_results(status);
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- Now shows: key: idx_status, rows: ~10 (not all rows)`,
      },
      { type: 'heading', text: 'Views', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- A VIEW is a saved SQL query that acts like a virtual table.
-- Great for: reusable complex queries, hiding complexity, security.

CREATE VIEW active_failures AS
    SELECT t.name AS tester, b.title, b.priority, p.name AS project
    FROM bugs b
    JOIN testers t  ON b.tester_id  = t.id
    JOIN projects p ON b.project_id = p.id
    WHERE b.status = 'OPEN';

-- Use the view like a table:
SELECT * FROM active_failures WHERE priority = 'HIGH';
SELECT tester, COUNT(*) AS high_priority FROM active_failures
GROUP BY tester;

-- Drop a view:
DROP VIEW active_failures;`,
      },
      { type: 'editor', lang: 'sql',
        schema: `CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);
INSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');
INSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');
INSERT INTO bugs VALUES
(1,'Login fails on Safari','OPEN','HIGH',1,1),
(2,'Broken image on profile','CLOSED','LOW',1,1),
(3,'API timeout on checkout','OPEN','HIGH',2,3),
(4,'Wrong error message','OPEN','MEDIUM',2,2),
(5,'Crash on empty search','OPEN','HIGH',3,1);`,
        defaultCode: `-- VIEW oluştur
CREATE VIEW active_failures AS
    SELECT t.name AS tester, b.title, b.priority, p.name AS project
    FROM bugs b
    JOIN testers t  ON b.tester_id  = t.id
    JOIN projects p ON b.project_id = p.id
    WHERE b.status = 'OPEN';

-- View'ı tablo gibi kullan:
SELECT * FROM active_failures WHERE priority = 'HIGH';`
      },
      { type: 'heading', text: 'SQL Injection & Parameterized Queries', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `# SQL INJECTION: attacker injects SQL code through user input.
# Classic example:
username = "admin' OR '1'='1"
# Vulnerable query becomes:
# WHERE username = 'admin' OR '1'='1' -- true for ALL users!

# ❌ VULNERABLE (never do this in tests or apps):
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# ✅ SAFE: Use parameterized queries (placeholders):
# Python sqlite3:
cursor.execute(
    "SELECT * FROM users WHERE username = ?",
    (username,)              # value is passed separately — SQL engine escapes it
)

# Python psycopg2 (PostgreSQL):
cursor.execute(
    "SELECT * FROM users WHERE username = %s AND role = %s",
    (username, "admin")
)

# Why safe? The DB engine handles the values as DATA, never as SQL code.
# 'admin' OR '1'='1' becomes a literal string to match, not executable SQL.`,
      },
      {
        type: 'visual', variant: 'flow',
        title: 'ACID Transaction Flow — What Happens Inside the DB',
        note: 'ACID guarantees mean your test data is always in a consistent state — no partial inserts, no phantom reads between transactions.',
        steps: [
          { num: 'A', label: 'Atomicity', desc: 'All or nothing', highlight: true },
          { num: 'C', label: 'Consistency', desc: 'Rules enforced' },
          { num: 'I', label: 'Isolation', desc: 'Concurrent safe', highlight: true },
          { num: 'D', label: 'Durability', desc: 'Survived crash' },
        ],
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Transaction Lifecycle — What Each SQL Command Does',
        items: [
          { icon: '🚀', label: 'START TRANSACTION', desc: 'Begin atomic block' },
          { arrow: true },
          { icon: '✏️', label: 'INSERT / UPDATE / DELETE', desc: 'Multiple statements' },
          { arrow: true },
          { icon: '✅', label: 'COMMIT', desc: 'Persist all changes', highlight: true },
          { arrow: true },
          { icon: '↩️', label: 'ROLLBACK', desc: 'Undo all if error' },
        ],
        note: 'COMMIT makes all changes permanent. ROLLBACK undoes everything back to START TRANSACTION — like Ctrl+Z for the entire batch.',
      },
      // Quiz: Window functions
      { type: 'quiz', question: { tr: 'Window fonksiyonlarini GROUP BY dan ayiran temel ozellik nedir?', en: 'What is the key difference between window functions and GROUP BY?' }, options: [{ id: 'a', text: 'Window functions only work on dates' }, { id: 'b', text: 'Window functions collapse rows into groups' }, { id: 'c', text: 'Window functions calculate across rows without collapsing them' }, { id: 'd', text: 'GROUP BY is faster than window functions' }], correct: 'c', explanation: { tr: 'Window fonksiyonlari her satirin kimligini korur. GROUP BY satiri daraltir. ROW_NUMBER(), RANK(), SUM() OVER() satir bazli hesaplama yapar ama satir kaybolmaz.', en: 'Window functions keep each row identity — unlike GROUP BY which collapses rows. ROW_NUMBER(), RANK(), SUM() OVER() calculate per-row while keeping all rows visible.' } ,
        retryQuestion: {
      "question": {
            "tr": "Window fonksiyonlarinin 'Aggregate' fonksiyonlardan (GROUP BY ile kullanilan) temel farki nedir?",
            "en": "What is the primary difference between window functions and aggregate functions (used with GROUP BY)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Window fonksiyonlari tabloyu gruplara ayirarak satir sayisini azaltir"
            },
            {
                  "id": "b",
                  "text": "Aggregate fonksiyonlar satir bazli hesaplama yapamaz"
            },
            {
                  "id": "c",
                  "text": "Window fonksiyonlari her satiri korur ve sonuc satiri sayisini degistirmez"
            },
            {
                  "id": "d",
                  "text": "Aggregate fonksiyonlar sadece numerik verilerde calisir"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Aggregate fonksiyonlar GROUP BY ile kullanildiginda satirlari tek bir satira indirger. Window fonksiyonlari ise her bir satirin verisini koruyarak hesaplama sonucunu yeni bir sutunda ekler.",
            "en": "Aggregate functions used with GROUP BY condense rows into single result rows. Window functions perform calculations over a set of rows while preserving the identity and number of the original rows."
      }
}
},
      // Quiz: CTE
      { type: 'quiz', question: { tr: 'CTE (Common Table Expression) icin hangi keyword kullanilir?', en: 'Which keyword is used to define a CTE?' }, options: [{ id: 'a', text: 'DEFINE' }, { id: 'b', text: 'TEMP' }, { id: 'c', text: 'WITH' }, { id: 'd', text: 'CREATE TEMP' }], correct: 'c', explanation: { tr: 'CTE, WITH keyword u ile tanimlanir: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. Karmasik sorgulari adlandirilmis adimlara boler.', en: 'A CTE starts with WITH: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. It breaks complex queries into named steps and improves readability.' } ,
        retryQuestion: {
      "question": {
            "tr": "SQL'de gecici bir sonuc kumesi olusturmak ve sorgu icinde tekrar kullanmak icin hangi ifade tercih edilir?",
            "en": "Which statement is preferred to create a temporary result set and reuse it within a query in SQL?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "DECLARE"
            },
            {
                  "id": "b",
                  "text": "WITH"
            },
            {
                  "id": "c",
                  "text": "JOIN"
            },
            {
                  "id": "d",
                  "text": "UNION"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "WITH ifadesi, karmaşık sorguları basitleştirmek ve okunabilirliği artırmak için bir CTE (Common Table Expression) tanımlamak amacıyla kullanılır.",
            "en": "The WITH clause is used to define a CTE (Common Table Expression), which is used to simplify complex queries and improve readability."
      }
}
},
      // Interview Questions: SQL Advanced
      { type: 'interview-questions', topic: 'SQL Advanced', questions: [
        { level: 'basic', q: { tr: 'Window fonksiyonu nedir? Basit bir ornek verin.', en: 'What is a window function? Give a simple example.' }, a: { tr: 'Window fonksiyonu, iliskili bir satir kumesi uzerinde hesaplama yapar ama GROUP BY nin aksine satirlari daraltmaz. Ornek: SELECT test_name, duration_ms, RANK() OVER (ORDER BY duration_ms DESC) AS rank FROM test_results — her test icin hem suresini hem siralamadaki yerini gosterir, satir sayisi degismez.', en: 'A window function performs a calculation over a set of related rows without collapsing them like GROUP BY. Example: SELECT test_name, duration_ms, RANK() OVER (ORDER BY duration_ms DESC) AS rank FROM test_results — shows each test with its duration AND its rank, row count stays the same.' } },
        { level: 'basic', q: { tr: 'ACID nedir? Her harfi aciklayin.', en: 'What is ACID? Explain each letter.' }, a: { tr: 'Atomicity: Transaction icindeki tum islemler basarili olmali — biri basarisiz olursa hepsi geri alinir. Consistency: Transaction DB yi bir gecerli durumdan digerine tasir. Isolation: Es zamanli transaction lar birbirinin yarim kalmis degisikliklerini gormez. Durability: COMMIT ten sonra veriler sistem cokuslerde bile korunur.', en: 'Atomicity: All operations succeed or all are rolled back. Consistency: Transaction takes DB from one valid state to another. Isolation: Concurrent transactions do not see each other uncommitted changes. Durability: After COMMIT, data survives system crashes.' } },
        { level: 'intermediate', q: { tr: 'RANK() ile DENSE_RANK() arasindaki fark nedir?', en: 'What is the difference between RANK() and DENSE_RANK()?' }, a: { tr: 'Ikisi de bagli satirlara ayni numarayi verir. Fark boslukturda: RANK() bagli satirlardan sonra bosluk birakir (1, 1, 3). DENSE_RANK() bosluk birakmaz (1, 1, 2). Top-N bulmak icin DENSE_RANK() daha guvenilirdir.', en: 'Both assign the same number to tied rows. RANK() leaves gaps after ties (1, 1, 3 — 2 is skipped). DENSE_RANK() has no gaps (1, 1, 2). For finding top-N only, DENSE_RANK() is more reliable.' } },
        { level: 'advanced', q: { tr: 'View ile CTE arasindaki fark nedir?', en: 'What is the difference between a View and a CTE?' }, a: { tr: 'View: Veritabanina kalici olarak kaydedilen adlandirilmis sorgu. Birden fazla sorguda yeniden kullanilabilir. CTE: Yalnizca bir sorgu boyunca gecerli olan gecici adlandirilmis sonuc kumesi. Veritabanina kaydedilmez. Secim: Ayni sorguyu bircok uygulama genelinde tekrar kullanacaksaniz View; tek bir karmasik sorguyu sadelestirmek icin CTE.', en: 'View: A permanently saved named query in the database. Reusable across multiple queries. CTE: Temporary named result set that exists only for one query. Not saved to the database. Choice: View if reusing across multiple apps; CTE if simplifying a single complex query.' } },
        { level: 'advanced', q: { tr: 'Yavas bir SQL sorgusunu nasil debug edersiniz?', en: 'How do you debug a slow SQL query?' }, a: { tr: '1. EXPLAIN ile sorgu planini incele — type=ALL goruyorsan kotu, type=ref veya index iyi. 2. NULL olan key sutununa bak. 3. WHERE/JOIN sutunlarina index ekle. 4. SELECT * kullaniyorsan sadece gerekli sutunlara dus. 5. Subquery varsa JOIN e donustur. 6. Her degisiklikten sonra EXPLAIN i tekrar calistir.', en: '1. Use EXPLAIN to inspect the query plan — type=ALL is bad, type=ref or index is good. 2. Look for NULL in the key column. 3. Add indexes on WHERE/JOIN columns. 4. Reduce SELECT * to only needed columns. 5. Convert subqueries to JOINs. 6. Re-run EXPLAIN after each change.' } },
      ]},
    ],
  },

  // ── 5. QA USE CASES ─────────────────────────────────────────────────────────
  {
    title: '🧪 SQL for QA — Real Testing Scenarios',
    blocks: [
      { type: 'simple-box', emoji: '🧪', content: { tr: "QA olarak SQL'i iki kritik anda kullanırsın: testten önce INSERT ile veri hazırla, testten sonra SELECT ile doğrula. UI 'işlem başarılı' dese bile, veritabanında gerçekte ne kaydedildiğini SQL ile kontrol edersin.", en: "As a QA engineer, SQL serves you in two key moments: INSERT test data before the test runs, SELECT to verify results after. Even if the UI says 'success', SQL tells you what was actually written to the database." } },
      { type: 'heading', text: 'Use Case 1: Find All Failed Tests in Last 7 Days' },
      {
        type: 'code',
        code: `-- Find failed tests from the last 7 days with details:
SELECT
    test_name,
    status,
    duration_ms,
    environment,
    run_date
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY  -- MySQL
-- AND run_date >= CURRENT_TIMESTAMP - INTERVAL '7 days'  -- PostgreSQL
ORDER BY run_date DESC;

-- Count failures per test in last 7 days:
SELECT test_name, COUNT(*) AS fail_count
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY
GROUP BY test_name
ORDER BY fail_count DESC;`,
        expected: `+-----------------+--------+-------------+\n| test_name       | status | duration_ms |\n+-----------------+--------+-------------+\n| Checkout Flow   | FAIL   |        5400 |\n| Search Feature  | FAIL   |        8200 |\n+-----------------+--------+-------------+`
      },
      { type: 'heading', text: 'Use Case 2: Find Duplicate Test Data Entries' },
      {
        type: 'code',
        code: `-- Find duplicate email addresses in a users table:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- See ALL rows that have a duplicate email:
SELECT *
FROM users
WHERE email IN (
    SELECT email FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;

-- Find duplicates across multiple columns (exact duplicate records):
SELECT test_name, environment, run_date, COUNT(*) AS count
FROM test_results
GROUP BY test_name, environment, run_date
HAVING COUNT(*) > 1;`,
      },
      { type: 'heading', text: 'Use Case 3: Verify Foreign Key Relationships (Find Orphaned Records)' },
      {
        type: 'code',
        code: `-- Find orders whose user_id doesn't exist in the users table (orphaned records):
SELECT o.id AS order_id, o.user_id, o.total
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;      -- user_id exists in orders but NOT in users = orphan!

-- Find test results whose test_case_id doesn't exist:
SELECT r.id, r.test_case_id
FROM test_results r
LEFT JOIN test_cases tc ON r.test_case_id = tc.id
WHERE tc.id IS NULL;

-- Count valid vs orphaned records:
SELECT
    SUM(CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END) AS valid_orders,
    SUM(CASE WHEN u.id IS NULL     THEN 1 ELSE 0 END) AS orphaned_orders
FROM orders o
LEFT JOIN users u ON o.user_id = u.id;`,
      },
      { type: 'heading', text: 'Use Case 4: Count Test Results by Status with Percentages' },
      {
        type: 'code',
        code: `-- Count and percentage per status:
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM test_results
WHERE run_date >= NOW() - INTERVAL 7 DAY
GROUP BY status
ORDER BY count DESC;

-- MySQL alternative (no window function needed):
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM test_results), 1) AS pct
FROM test_results
GROUP BY status
ORDER BY count DESC;`,
        expected: `+--------+-------+------------+\n| status | count | percentage |\n+--------+-------+------------+\n| PASS   |    30 |       60.0 |\n| FAIL   |    12 |       24.0 |\n| SKIP   |     8 |       16.0 |\n+--------+-------+------------+`
      },
      { type: 'heading', text: 'Use Case 5: Clean Up Test Data Older Than 30 Days' },
      {
        type: 'code',
        code: `-- SAFE PATTERN: ALWAYS SELECT first to verify what will be deleted!

-- Step 1: see what will be deleted:
SELECT COUNT(*), MIN(run_date), MAX(run_date)
FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';        -- only delete staging data, not prod!

-- Step 2: if the count looks right, delete:
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';

-- To be extra safe, delete in batches (avoids locking the table):
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
LIMIT 1000;         -- delete max 1000 rows per run
-- Repeat until 0 rows affected.`,
      },
      { type: 'heading', text: 'Use Case 6: EXPLAIN — Find and Fix Slow Queries' },
      {
        type: 'code',
        code: `-- 1. Identify a slow query and add EXPLAIN before it:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';

-- Look for:
-- type: "ALL" = full table scan (bad — reads every row)
-- key: NULL   = no index being used (bad)
-- rows: high  = many rows examined

-- 2. Create a composite index:
CREATE INDEX idx_status_env ON test_results(status, environment);

-- 3. Run EXPLAIN again:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';
-- Now see: type: "ref", key: idx_status_env, rows: much lower

-- EXPLAIN ANALYZE (PostgreSQL — actually runs the query):
EXPLAIN ANALYZE SELECT * FROM test_results WHERE status = 'FAIL';`,
        expected: `Before index: type=ALL, rows=50000, key=NULL\nAfter index:  type=ref, rows=120, key=idx_status_env`
      },
      {
        type: 'quiz',
        question: { tr: 'EXPLAIN çıktısında bir sorgu için `type: "ALL"` ve `rows: 50000` görüyorsun. Bu ne anlama gelir, ve genel çözüm nedir?', en: 'EXPLAIN output shows `type: "ALL"` and `rows: 50000` for a query. What does this mean, and what is the general fix?' },
        options: [
          { id: 'a', text: { tr: 'Sorgu zaten optimaldir, hiçbir şey yapma', en: 'The query is already optimal, do nothing' } },
          { id: 'b', text: { tr: 'Veritabanı bir full table scan yapıyor (index kullanmıyor) — WHERE\'de filtrelenen kolona index ekle', en: 'The database is doing a full table scan (not using an index) — add an index on the column filtered in WHERE' } },
          { id: 'c', text: { tr: 'Tablo boş', en: 'The table is empty' } },
          { id: 'd', text: { tr: 'Sorgu syntax hatası içeriyor', en: 'The query contains a syntax error' } },
        ],
        correct: 'b',
        explanation: { tr: '`type: "ALL"`, veritabanının eşleşen satırları bulmak için tablonun TÜM satırlarını taradığı anlamına gelir (full table scan) — `rows: 50000` bunun ne kadar maliyetli olduğunu gösterir. WHERE koşulunda filtrelenen kolona (örn. status, environment) bir index eklemek, planı `type: "ref"`e çevirir ve taranan satır sayısını dramatik şekilde düşürür — Java\'da bir HashMap ile O(1) erişim yerine bir ArrayList\'i baştan sona taramanın (O(n)) farkı gibi.', en: '`type: "ALL"` means the database scans EVERY row in the table to find matches (a full table scan) — `rows: 50000` shows how expensive that is. Adding an index on the column filtered in WHERE (e.g. status, environment) changes the plan to `type: "ref"` and dramatically reduces the rows scanned — similar to the difference between O(1) lookup with a Java HashMap versus scanning an entire ArrayList from start to end (O(n)).' },
        retryQuestion: {
          question: { tr: 'Bir kolona index ekledikten sonra EXPLAIN hâlâ `type: "ALL"` gösteriyor, sorgu hâlâ yavaş. Olası bir neden nedir?', en: 'After adding an index on a column, EXPLAIN still shows `type: "ALL"` and the query is still slow. What is a likely cause?' },
          options: [
            { id: 'a', text: { tr: 'Index\'ler her zaman 24 saat sonra etkin olur', en: 'Indexes always take 24 hours to become active' } },
            { id: 'b', text: { tr: 'WHERE koşulu o kolonu fonksiyon içinde kullanıyor olabilir (örn. UPPER(status) = \'FAIL\'), bu da index kullanımını engeller', en: "The WHERE clause might be wrapping that column in a function (e.g. UPPER(status) = 'FAIL'), which prevents the index from being used" } },
            { id: 'c', text: { tr: 'Index sadece SELECT * sorgularında çalışır', en: 'Indexes only work with SELECT * queries' } },
            { id: 'd', text: { tr: 'Sorgu zaten optimaldir, EXPLAIN yanlış bilgi veriyor', en: 'The query is already optimal, EXPLAIN is reporting incorrectly' } },
          ],
          correct: 'b',
          explanation: { tr: 'Bir kolonu bir fonksiyonun içine sarmak (örn. `WHERE UPPER(status) = \'FAIL\'` veya `WHERE YEAR(created_at) = 2024`) veritabanının normal index\'i kullanmasını engeller, çünkü index ham kolon değerleri üzerine kuruludur, fonksiyonun sonucu üzerine değil — bu yaygın bir "neden index\'im hâlâ çalışmıyor" tuzağıdır. Çözüm genelde sorguyu fonksiyon kullanmadan yeniden yazmak veya bir functional/expression index oluşturmaktır.', en: "Wrapping a column in a function (e.g. `WHERE UPPER(status) = 'FAIL'` or `WHERE YEAR(created_at) = 2024`) prevents the database from using a normal index, because the index is built on the raw column values, not the function's result — this is a common \"why isn't my index working\" trap. The fix is usually to rewrite the query without the function, or create a functional/expression index." },
        },
      },
    ],
  },

  // ── 6. INTERVIEW Q&A ────────────────────────────────────────────────────────
  {
    title: '💼 SQL Interview Questions & Answers',
    blocks: [
      { type: 'simple-box', emoji: '💼', content: { tr: "SQL mülakatında 'JOIN nedir?' sorusu değil, 'Production'da şu hata var, nasıl araştırırsın?' sorusu sorulur. Bu bölüm senaryo bazlı sorulara hazırlar — tanım değil, pratik deneyim.", en: "SQL interviews don't ask 'what is JOIN?' — they ask 'there's a bug in production, how do you investigate it with SQL?' This section prepares you for scenario-based questions that require hands-on experience, not just definitions." } },
      { type: 'text', content: 'Click each question to expand the model answer. Includes code examples.' },
      { type: 'subheading', text: '🟢 Basic Questions' },
      { type: 'qa', question: 'Q1: What is the difference between WHERE and HAVING?',
        answer: 'WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.',
        code: `-- WHERE: filter rows before grouping
SELECT * FROM test_results WHERE status = 'FAIL';

-- HAVING: filter groups after aggregation
SELECT test_name, COUNT(*) AS fails
FROM test_results
WHERE status = 'FAIL'          -- first filter rows (only FAIL rows)
GROUP BY test_name
HAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)` },
      { type: 'qa', question: 'Q2: Explain the different types of JOINs.',
        answer: 'INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.',
        code: `-- Find testers WITH open bugs (INNER JOIN):
SELECT t.name, COUNT(b.id) AS open_bugs
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'
GROUP BY t.id, t.name;

-- Find ALL testers, even those with no bugs (LEFT JOIN):
SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;` },
      { type: 'qa', question: 'Q3: What is a PRIMARY KEY vs FOREIGN KEY?',
        answer: 'PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn\'t exist in the parent table.',
        code: `CREATE TABLE users (
    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    user_id INT NOT NULL,                    -- FK column
    total   DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint
    -- → cannot insert user_id = 999 if no user with id=999 exists
);` },
      { type: 'qa', question: 'Q4: What is NULL and how do you check for it?',
        answer: 'NULL means "no value" or "unknown". It\'s not the same as 0, empty string "", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.',
        code: `-- Wrong:
SELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.
SELECT * FROM users WHERE phone != NULL;   -- same problem

-- Correct:
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Provide default with COALESCE:
SELECT name, COALESCE(phone, 'N/A') AS phone FROM users;` },
      { type: 'qa', question: 'Q5: What is the difference between DELETE, TRUNCATE, and DROP?',
        answer: 'DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.',
        code: `DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows
DELETE FROM test_results;                           -- remove all rows (slow)

TRUNCATE TABLE test_results;                        -- remove all rows (fast)

DROP TABLE test_results;                            -- delete entire table!` },
      { type: 'subheading', text: '🟡 Intermediate Questions' },
      { type: 'qa', question: 'Q6: What is the difference between UNION and UNION ALL?',
        answer: 'UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.',
        code: `-- UNION: removes duplicates (slower):
SELECT email FROM users WHERE role = 'admin'
UNION
SELECT email FROM users WHERE is_verified = TRUE;

-- UNION ALL: keeps duplicates (faster):
SELECT test_name FROM test_results WHERE status = 'FAIL'
UNION ALL
SELECT test_name FROM archived_results WHERE status = 'FAIL';` },
      { type: 'qa', question: 'Q7: How do subqueries work? What is a correlated subquery?',
        answer: 'A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.',
        code: `-- Simple subquery (runs ONCE):
SELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);

-- Correlated subquery (runs once per outer row — slow on large tables!):
SELECT t.name,
    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count
FROM testers t;
-- Better: use LEFT JOIN + GROUP BY instead` },
      { type: 'qa', question: 'Q8: What are indexes and how do they affect performance?',
        answer: 'An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book\'s index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon\'t index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.',
        code: `-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';

-- Add index:
CREATE INDEX idx_status ON test_results(status);

-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';` },
      { type: 'qa', question: 'Q9: Write a query to find the second highest value in a table.',
        answer: 'Classic interview question. Multiple approaches — using LIMIT/OFFSET, subquery, or window functions.',
        code: `-- Option 1: LIMIT + OFFSET (simplest):
SELECT DISTINCT duration_ms
FROM test_results
ORDER BY duration_ms DESC
LIMIT 1 OFFSET 1;         -- skip the highest, take the next one

-- Option 2: Subquery:
SELECT MAX(duration_ms) AS second_highest
FROM test_results
WHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);

-- Option 3: Window function (most robust, handles ties correctly):
SELECT duration_ms
FROM (
    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) AS rnk
    FROM test_results
) ranked
WHERE rnk = 2
LIMIT 1;` },
      { type: 'qa', question: 'Q10: GROUP BY — what rules apply to SELECT columns?',
        answer: 'RULE: Every column in the SELECT list must EITHER be in the GROUP BY clause OR be wrapped in an aggregate function (COUNT, SUM, AVG, etc.).\n\nWhy? When you GROUP BY, multiple rows collapse into one group. For non-aggregated columns, the DB doesn\'t know WHICH row\'s value to show — so you must either include it in GROUP BY (every value in the group must be the same) or aggregate it.',
        code: `-- CORRECT: group_col in GROUP BY, aggregated cols use SUM/COUNT
SELECT environment, COUNT(*) AS total, MAX(duration_ms) AS max_ms
FROM test_results
GROUP BY environment;

-- WRONG: test_name is not in GROUP BY and not aggregated
-- SELECT environment, test_name, COUNT(*)
-- FROM test_results GROUP BY environment;
-- → Error: 'test_name' is not in GROUP BY` },
      { type: 'subheading', text: '🔴 Advanced Questions' },
      { type: 'qa', question: 'Q11: Explain window functions with a practical example.',
        answer: 'Window functions perform calculations across a "window" of related rows without collapsing them. Unlike GROUP BY, each row keeps its own identity plus the window calculation result.\n\nOVER() defines the window. PARTITION BY groups (like GROUP BY but doesn\'t collapse). ORDER BY within OVER() creates a sequence. Use cases: ranking, running totals, comparing to previous/next row.',
        code: `SELECT tester_name, test_date, tests_run,
    -- Rank each tester within their team by tests run:
    RANK() OVER (PARTITION BY team ORDER BY tests_run DESC) AS team_rank,
    -- Running total of tests for the tester:
    SUM(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS cumulative,
    -- Compare to previous day:
    LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS prev_day,
    tests_run - LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS delta
FROM daily_tester_stats;` },
      { type: 'qa', question: 'Q12: What is a CTE and when would you use it over a subquery?',
        answer: 'A CTE (WITH clause) is a named temporary result set. It\'s evaluated once and can be referenced multiple times.\n\nUse CTEs over subqueries when: the query has multiple steps that are clearer as named sub-steps, you need to reference the same subquery multiple times, you want recursive queries (hierarchical data). Subqueries are fine for simple, single-use derivations.',
        code: `-- Hard to read with subqueries:
SELECT * FROM (
    SELECT tester_id, COUNT(*) fails FROM bugs WHERE status='FAIL' GROUP BY tester_id
) f JOIN (
    SELECT id, name FROM testers
) t ON f.tester_id = t.id WHERE f.fails > 3;

-- Same query, much clearer with CTE:
WITH bug_counts AS (
    SELECT tester_id, COUNT(*) AS fails
    FROM bugs WHERE status = 'FAIL'
    GROUP BY tester_id
)
SELECT t.name, bc.fails
FROM bug_counts bc
JOIN testers t ON bc.tester_id = t.id
WHERE bc.fails > 3;` },
      { type: 'qa', question: 'Q13: How does a transaction work? What are ACID properties?',
        answer: 'A transaction is a sequence of operations treated as a single unit — either ALL succeed or NONE do.\n\nACID:\nAtomicity: All or nothing — one failure rolls back everything.\nConsistency: Transaction moves DB from one valid state to another.\nIsolation: Concurrent transactions don\'t see each other\'s in-progress changes.\nDurability: Committed data survives crashes (written to disk).',
        code: `-- Transfer money example (classic ACID test):
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;   -- debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;   -- credit

-- Verify (within transaction):
SELECT balance FROM accounts WHERE id IN (1, 2);

COMMIT;   -- persist if OK
-- ROLLBACK; -- undo both updates if something went wrong` },
      { type: 'qa', question: 'Q14: What is SQL injection and how do parameterized queries prevent it?',
        answer: 'SQL injection: user-supplied input is interpreted as SQL code, allowing attackers to bypass authentication, read all data, or drop tables.\n\nParameterized queries (prepared statements) pass values as DATA separately from the SQL structure. The DB engine escapes the values automatically — they can never be interpreted as SQL code regardless of content.',
        code: `# VULNERABLE — username input directly in SQL string:
username = "' OR '1'='1"
query = f"SELECT * FROM users WHERE username = '{username}'"
# Becomes: WHERE username = '' OR '1'='1' → returns ALL users!

# SAFE — parameterized query:
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
# The ? placeholder means username is always treated as a string value,
# never as SQL code. Injection is impossible.` },
      { type: 'qa', question: 'Q15: How would you optimize a slow query?',
        answer: '1. Run EXPLAIN/EXPLAIN ANALYZE to see the query plan — look for "full table scan" (type:ALL) and NULL indexes.\n2. Add appropriate indexes on WHERE columns, JOIN columns.\n3. Rewrite subqueries as JOINs when possible.\n4. Select only needed columns instead of SELECT *.\n5. Use LIMIT to reduce result size.\n6. For aggregations, ensure GROUP BY columns are indexed.\n7. For complex queries, use CTEs for clarity and potential query plan hints.\n8. Check for missing FK indexes.\n9. Consider EXPLAIN output after each change to verify improvement.',
        code: `-- Step 1: Identify slow query
EXPLAIN SELECT t.name, COUNT(b.id) bugs
FROM testers t LEFT JOIN bugs b ON t.id = b.tester_id
WHERE b.created_at > '2024-01-01'
GROUP BY t.id, t.name;
-- Shows: type=ALL on bugs table, key=NULL

-- Step 2: Add missing indexes
CREATE INDEX idx_bugs_tester  ON bugs(tester_id);
CREATE INDEX idx_bugs_created ON bugs(created_at);

-- Step 3: Re-check
EXPLAIN SELECT ...  -- Now shows type=ref, using indexes` },
      {
        type: 'quiz',
        question: { tr: 'Yukarıdaki sorguda `LEFT JOIN bugs` kullanılıyor, `JOIN` (INNER JOIN) değil. Bunun sonuçlar üzerindeki etkisi nedir?', en: 'The query above uses `LEFT JOIN bugs`, not a plain `JOIN` (INNER JOIN). What effect does this have on the results?' },
        options: [
          { id: 'a', text: { tr: 'Hiçbir testers satırı dönmez', en: 'No testers rows are returned at all' } },
          { id: 'b', text: { tr: 'Hiç bug\'ı olmayan tester\'lar da sonuçta görünür (bug sayısı 0 olur); INNER JOIN onları tamamen hariç tutardı', en: "Testers with zero bugs still appear in the result (with a bug count of 0); an INNER JOIN would exclude them entirely" } },
          { id: 'c', text: { tr: 'Sadece bug\'ı olan tester\'lar görünür, aynı INNER JOIN gibi', en: 'Only testers with bugs appear, same as an INNER JOIN' } },
          { id: 'd', text: { tr: 'Sorgu performansını artırır, sonuçları değiştirmez', en: 'It only improves performance, does not change results' } },
        ],
        correct: 'b',
        explanation: { tr: 'LEFT JOIN, sol tablodaki (testers) TÜM satırları tutar; sağ tabloda (bugs) eşleşme yoksa o satırların alanları NULL olur (COUNT(b.id) bu durumda 0 sayar). INNER JOIN (sade JOIN) ise sadece İKİ tarafta da eşleşme olan satırları döndürür — hiç bug açmamış bir tester INNER JOIN sonucunda tamamen kaybolurdu. Bu fark, "hiç hatası olmayan testerlar dahil" raporlama gibi gerçek QA senaryolarında kritiktir.', en: "LEFT JOIN keeps ALL rows from the left table (testers); if there is no match in the right table (bugs), those fields become NULL (so COUNT(b.id) counts as 0). An INNER JOIN (plain JOIN) only returns rows where BOTH sides match — a tester with zero bugs would disappear entirely from an INNER JOIN result. This distinction matters in real QA reporting scenarios like \"include testers with zero bugs\"." },
        retryQuestion: {
          question: { tr: 'Bir LEFT JOIN sorgusunda `WHERE bugs.severity = \'HIGH\'` koşulu eklersen, bunun sonuçlar üzerinde fark etmediğin bir etkisi olabilir. Bu etki nedir?', en: 'If you add `WHERE bugs.severity = \'HIGH\'` to a LEFT JOIN query, it can have an effect on results you might not expect. What is it?' },
          options: [
            { id: 'a', text: { tr: 'Hiçbir etkisi yok, LEFT JOIN davranışı tamamen korunur', en: 'No effect at all, LEFT JOIN behavior is fully preserved' } },
            { id: 'b', text: { tr: 'WHERE koşulu NULL satırları (bug\'ı olmayan tester\'lar) filtreler, LEFT JOIN\'i fiilen bir INNER JOIN gibi davranmaya zorlar', en: 'The WHERE clause filters out the NULL rows (testers with no bugs), effectively forcing the LEFT JOIN to behave like an INNER JOIN' } },
            { id: 'c', text: { tr: 'Sorgu syntax hatası verir', en: 'The query throws a syntax error' } },
            { id: 'd', text: { tr: 'LEFT JOIN otomatik olarak RIGHT JOIN\'e dönüşür', en: 'The LEFT JOIN automatically converts to a RIGHT JOIN' } },
          ],
          correct: 'b',
          explanation: { tr: 'WHERE, JOIN tamamlandıktan SONRA uygulanır. Bug\'ı olmayan bir tester\'ın `bugs.severity` alanı NULL\'dur, ve `NULL = \'HIGH\'` her zaman UNKNOWN (yanlış) değerlendirilir — bu yüzden o satır WHERE tarafından elenir. Sonuç, LEFT JOIN\'in "sıfır eşleşmeli satırları da tut" amacının fiilen iptal olmasıdır. Bu koşulu LEFT JOIN\'i bozmadan filtrelemek istiyorsan, WHERE yerine ON clause\'una taşımalısın.', en: 'WHERE is applied AFTER the join completes. A tester with no bugs has `bugs.severity` as NULL, and `NULL = \'HIGH\'` always evaluates to UNKNOWN (falsy) — so that row gets filtered out by WHERE. The net effect is that the LEFT JOIN\'s purpose of keeping zero-match rows gets effectively cancelled. To filter like this without breaking the LEFT JOIN, you would move that condition into the ON clause instead of WHERE.' },
        },
      },
    ],
  },

  // ── 7. PRACTICE & REFERENCE ─────────────────────────────────────────────────
  {
    title: '📝 Practice Exercises & Quick Reference',
    blocks: [
      { type: 'simple-box', emoji: '🏋️', content: { tr: "SQL öğrenmek, yüzmeyi kitaptan öğrenmek gibi değil — suya girmek gerekir. Editörü aç, kodu çalıştır, hata al, düzelt. Her alıştırmayı önce kendin çözmeye çalış, sonra çözümü gör.", en: "Learning SQL from reading alone is like learning to swim from a book — you have to get in the water. Open the editor, run the query, make errors, fix them. Try each exercise yourself first, then check the solution." } },
      { type: 'heading', text: 'Practice Exercises' },
      {
        type: 'exercise',
        difficulty: '🟢 Beginner',
        title: 'Exercise 1: Query Failed Test Runs',
        description: 'Given a test_runs table with columns: id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date. Write THREE queries: (a) all failed runs today, (b) count of each status, (c) slowest 3 tests.',
        hint: 'Use WHERE status="FAIL" AND DATE(run_date)=CURDATE(). For counts use GROUP BY status. For slowest use ORDER BY duration_ms DESC LIMIT 3.',
        solution: `-- (a) Failed runs today:
SELECT test_name, duration_ms, run_date
FROM test_runs
WHERE status = 'FAIL'
  AND DATE(run_date) = CURDATE()
ORDER BY duration_ms DESC;

-- (b) Count by status:
SELECT status, COUNT(*) AS count
FROM test_runs
GROUP BY status
ORDER BY count DESC;

-- (c) Slowest 3 tests:
SELECT test_name, duration_ms
FROM test_runs
ORDER BY duration_ms DESC
LIMIT 3;`,
        explanation: 'DATE() extracts just the date part of a DATETIME. CURDATE() returns today. These are MySQL functions — PostgreSQL uses CURRENT_DATE.',
      },
      {
        type: 'exercise',
        difficulty: '🟡 Intermediate',
        title: 'Exercise 2: Multi-Table Join',
        description: 'You have three tables: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Write a query showing: tester name, test case title, status, and run_date — only for tests run in the last 30 days, ordered by most recent first.',
        hint: 'JOIN all 3 tables. users→results on user_id, test_cases→results on test_case_id. Use WHERE run_date >= NOW() - INTERVAL 30 DAY.',
        solution: `SELECT
    u.name         AS tester,
    tc.title       AS test_case,
    tc.category,
    r.status,
    r.run_date
FROM results r
JOIN users      u  ON r.user_id      = u.id
JOIN test_cases tc ON r.test_case_id = tc.id
WHERE r.run_date >= NOW() - INTERVAL 30 DAY
ORDER BY r.run_date DESC;`,
        explanation: 'Start from the "results" table (the junction table linking users and test_cases) and JOIN outward. This avoids accidental cartesian products.',
      },
      {
        type: 'exercise',
        difficulty: '🔴 Advanced',
        title: 'Exercise 3: CTE + Window Function — Rank Testers by Pass Rate',
        description: 'Using the results table (user_id, status, sprint), write a query that ranks testers by their pass rate PER SPRINT using a CTE to calculate stats and RANK() window function. Show: sprint, tester name, total tests, pass count, pass rate %, rank within sprint.',
        hint: 'CTE: GROUP BY sprint, user_id to get counts. Then JOIN users for names. Then add RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC).',
        solution: `WITH sprint_stats AS (
    SELECT
        sprint,
        user_id,
        COUNT(*)                                  AS total,
        SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed
    FROM results
    GROUP BY sprint, user_id
),
sprint_rates AS (
    SELECT
        s.sprint,
        u.name    AS tester,
        s.total,
        s.passed,
        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate
    FROM sprint_stats s
    JOIN users u ON s.user_id = u.id
)
SELECT
    sprint,
    tester,
    total,
    passed,
    pass_rate,
    RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) AS rank_in_sprint
FROM sprint_rates
ORDER BY sprint, rank_in_sprint;`,
        explanation: 'Two CTEs: first aggregates raw counts, second calculates rate and joins user names. The final SELECT adds the window function. Splitting into CTEs makes each step debuggable.',
      },
      { type: 'heading', text: 'Quick Reference Card' },
      {
        type: 'table',
        headers: ['Command', 'Syntax', 'Purpose'],
        rows: [
          ['SELECT', 'SELECT col FROM tbl WHERE cond', 'Read data from table'],
          ['INSERT', 'INSERT INTO tbl (cols) VALUES (...)', 'Add new rows'],
          ['UPDATE', 'UPDATE tbl SET col=val WHERE cond', 'Modify existing rows'],
          ['DELETE', 'DELETE FROM tbl WHERE cond', 'Remove rows'],
          ['CREATE TABLE', 'CREATE TABLE t (id INT PRIMARY KEY, ...)', 'Define a new table'],
          ['JOIN (INNER)', 'JOIN t2 ON t1.id = t2.fk', 'Match rows in both tables'],
          ['LEFT JOIN', 'LEFT JOIN t2 ON t1.id = t2.fk', 'All left rows + matched right'],
          ['GROUP BY', 'GROUP BY col HAVING COUNT(*) > N', 'Aggregate + filter groups'],
          ['ORDER BY', 'ORDER BY col DESC LIMIT N', 'Sort and limit results'],
          ['COUNT/SUM/AVG', 'SELECT COUNT(*), AVG(col)', 'Aggregate functions'],
          ['NULL check', 'WHERE col IS NULL', 'Find missing values'],
          ['COALESCE', 'COALESCE(col, default)', 'Replace NULL with default'],
          ['CTE', 'WITH name AS (SELECT ...) SELECT ...', 'Named temp subquery'],
          ['Window RANK', 'RANK() OVER (PARTITION BY ... ORDER BY ...)', 'Rank within groups'],
          ['EXPLAIN', 'EXPLAIN SELECT ...', 'Show query execution plan'],
        ]
      },
      { type: 'tip', content: 'Bookmark db-fiddle.com for quick experiments. Always test your WHERE clause with a SELECT before running DELETE or UPDATE — one missing WHERE can wipe your entire table.' },
      {
        type: 'error-dictionary',
        framework: 'SQL',
        errors: [
          {
            error: 'UNIQUE constraint failed: table.column',
            fullMessage: 'UNIQUE constraint failed: users.email',
            cause: { tr: 'Aynı email/id gibi eşsiz (UNIQUE) kısıtlama olan bir sütuna tekrar eden değer eklemeye çalışıyorsunuz. PRIMARY KEY ihlali de aynı hatayı verir.', en: 'You are inserting a duplicate value into a column with a UNIQUE constraint (e.g., email, username). A PRIMARY KEY violation produces the same error.' },
            solution: { tr: '1) INSERT IGNORE (MySQL) veya INSERT OR IGNORE (SQLite) kullanın. 2) ON CONFLICT DO NOTHING / DO UPDATE ekleyin. 3) INSERT öncesinde SELECT ile kontrol edin.', en: '1) Use INSERT IGNORE (MySQL) or INSERT OR IGNORE (SQLite). 2) Add ON CONFLICT DO NOTHING / DO UPDATE. 3) Check with SELECT before INSERT.' },
            codeWrong: `-- YANLIŞ — tekrar eden email ekliyor
INSERT INTO users (id, email) VALUES (1, 'a@test.com');
INSERT INTO users (id, email) VALUES (2, 'a@test.com'); -- HATA`,
            codeFixed: `-- DOĞRU — çakışmada güncelle (upsert)
INSERT INTO users (id, email)
VALUES (2, 'a@test.com')
ON CONFLICT(email) DO UPDATE SET id = excluded.id;

-- veya sadece yok say:
INSERT OR IGNORE INTO users (id, email) VALUES (2, 'a@test.com');`
          },
          {
            error: 'FOREIGN KEY constraint failed',
            fullMessage: 'FOREIGN KEY constraint failed',
            cause: { tr: 'Parent tabloda olmayan bir değere referans veren kayıt eklemeye çalışıyorsunuz. Örneğin: var olmayan bir user_id ile order eklemek.', en: 'You are trying to insert a row that references a value that does not exist in the parent table. E.g., adding an order with a non-existent user_id.' },
            solution: { tr: '1) Önce parent kaydı ekleyin. 2) PRAGMA foreign_keys = ON ile FK denetimini etkinleştirin (SQLite\'de varsayılan kapalı). 3) INSERT sırasını parent → child olarak düzenleyin.', en: '1) Insert the parent record first. 2) Enable FK checking: PRAGMA foreign_keys = ON (SQLite defaults to OFF). 3) Order INSERTs parent → child.' },
            codeWrong: `-- YANLIŞ — users tablosunda id=999 yok
INSERT INTO orders (id, user_id) VALUES (1, 999); -- HATA`,
            codeFixed: `-- DOĞRU — önce parent'ı ekle
INSERT INTO users (id, name) VALUES (999, 'Alice');
INSERT INTO orders (id, user_id) VALUES (1, 999); -- OK

-- SQLite'de FK denetimini etkinleştir:
PRAGMA foreign_keys = ON;`
          },
          {
            error: 'NOT NULL constraint failed: table.column',
            fullMessage: 'NOT NULL constraint failed: employees.email',
            cause: { tr: 'NOT NULL kısıtlamalı bir sütuna NULL değer eklemeye ya da bu sütunu INSERT sorgusunda atlamaya çalışıyorsunuz.', en: 'You are inserting NULL into a column with a NOT NULL constraint, or omitting a column that has no DEFAULT and is NOT NULL.' },
            solution: { tr: '1) Sütun için değer sağlayın. 2) Sütuna DEFAULT değeri tanımlayın. 3) Şemayı gözden geçirin: o sütun gerçekten zorunlu mu?', en: '1) Provide a value for the column. 2) Add a DEFAULT to the column definition. 3) Review the schema — does that column really need to be required?' },
            codeWrong: `-- YANLIŞ — email NOT NULL ama değer verilmedi
INSERT INTO employees (id, name) VALUES (1, 'Bob'); -- HATA`,
            codeFixed: `-- DOĞRU — tüm NOT NULL sütunlara değer ver
INSERT INTO employees (id, name, email)
VALUES (1, 'Bob', 'bob@company.com');

-- veya default ekle:
-- email TEXT NOT NULL DEFAULT 'unknown@company.com'`
          },
          {
            error: "syntax error near '...'",
            fullMessage: "near \"FORM\": syntax error",
            cause: { tr: 'SQL yazım hatası: yanlış yazılmış keyword (FROM yerine FORM), virgül eksikliği, fazladan parantez veya rezerve kelime kullanımı.', en: 'SQL syntax mistake: misspelled keyword (FORM instead of FROM), missing comma, extra parenthesis, or using a reserved word as a column/table name.' },
            solution: { tr: '1) Keyword yazımını kontrol edin. 2) SELECT listesinde virgülleri kontrol edin. 3) Rezerve kelimeler tablo/sütun adı olarak kullanılıyorsa backtick veya çift tırnak ile sarın.', en: '1) Check keyword spelling. 2) Check commas in the SELECT list. 3) If using reserved words as identifiers, wrap them in backticks or double quotes.' },
            codeWrong: `-- YANLIŞ — FROM yerine FORM yazılmış
SELECT name FORM users WHERE id = 1; -- syntax error`,
            codeFixed: `-- DOĞRU — keyword doğru yazılmış
SELECT name FROM users WHERE id = 1;

-- Rezerve kelime kullanımı:
SELECT \`order\`, \`select\` FROM my_table;  -- backtick ile sarılmış`
          },
          {
            error: 'no such table: table_name',
            fullMessage: 'no such table: test_results',
            cause: { tr: 'Sorgu var olmayan bir tabloyu referans alıyor. Tablo henüz oluşturulmamış, yanlış yazılmış veya farklı bir veritabanı bağlantısında oluşturulmuş olabilir.', en: 'The query references a table that does not exist. The table may not have been created, misspelled, or created in a different database connection.' },
            solution: { tr: '1) CREATE TABLE ile tabloyu oluşturun. 2) Tablo adının yazımını kontrol edin. 3) Doğru veritabanına bağlandığınızı doğrulayın. SQLite\'de: SELECT name FROM sqlite_master WHERE type=\'table\';', en: '1) Create the table with CREATE TABLE. 2) Check the table name spelling. 3) Verify you are connected to the correct database. In SQLite: SELECT name FROM sqlite_master WHERE type=\'table\';' },
            codeWrong: `-- YANLIŞ — tablo henüz oluşturulmamış
SELECT * FROM test_results; -- no such table`,
            codeFixed: `-- DOĞRU — önce tabloyu oluştur
CREATE TABLE IF NOT EXISTS test_results (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  status  TEXT NOT NULL,
  run_at  TEXT
);
SELECT * FROM test_results;`
          },
          {
            error: 'ambiguous column name: column',
            fullMessage: 'ambiguous column name: id',
            cause: { tr: 'JOIN sorgusunda aynı sütun adı birden fazla tabloda bulunuyor ve hangi tablodan geldiği belirtilmemiş.', en: 'In a JOIN query, the same column name exists in multiple joined tables and it is not specified which table the column comes from.' },
            solution: { tr: 'Tablo adı veya alias ile tam nitelendirme (qualification) kullanın: users.id veya u.id gibi.', en: 'Use full qualification with table name or alias: users.id or u.id.' },
            codeWrong: `-- YANLIŞ — her iki tabloda da "id" var
SELECT id, name FROM users JOIN orders ON users.id = orders.user_id;
-- ambiguous column name: id`,
            codeFixed: `-- DOĞRU — tablo adıyla nitelendir
SELECT users.id, users.name, orders.id AS order_id
FROM users
JOIN orders ON users.id = orders.user_id;

-- veya alias kullan:
SELECT u.id, u.name, o.id AS order_id
FROM users u
JOIN orders o ON u.id = o.user_id;`
          },
          {
            error: 'table has N columns but M values were supplied',
            fullMessage: 'table users has 4 columns but 3 values were supplied',
            cause: { tr: 'INSERT sorgusunda sütun listesi ile VALUES listesindeki eleman sayısı eşleşmiyor.', en: 'The number of columns listed in the INSERT does not match the number of values supplied in VALUES.' },
            solution: { tr: 'INSERT\'te sütun listesini açıkça belirtin ve VALUES ile sayısının eşleştiğinden emin olun.', en: 'Explicitly list the column names in INSERT and ensure VALUES count matches.' },
            codeWrong: `-- YANLIŞ — 4 sütun var ama 3 değer veriliyor
-- Tablo: users (id, name, email, role)
INSERT INTO users VALUES (1, 'Alice', 'alice@test.com'); -- HATA`,
            codeFixed: `-- DOĞRU — sütun isimlerini açıkça belirt
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@test.com');
-- role sütunu NULL alır (ya da DEFAULT değeri)`
          },
        ]
      },
      { type: 'glossary-section', terms: [
        { term: 'Aggregate Function', definition: { tr: 'Birden fazla satiri tek bir ozet degere indirgeyen fonksiyon: COUNT, SUM, AVG, MIN, MAX.', en: 'A function that reduces multiple rows to a single summary value: COUNT, SUM, AVG, MIN, MAX.' } },
        { term: 'AUTO_INCREMENT', definition: { tr: 'Her yeni satirda otomatik olarak artan tam sayi. MySQL terimi; SQLite de INTEGER PRIMARY KEY, PostgreSQL de SERIAL.', en: 'An integer that automatically increases for each new row. MySQL term; SQLite uses INTEGER PRIMARY KEY, PostgreSQL uses SERIAL.' } },
        { term: 'CTE (Common Table Expression)', definition: { tr: 'WITH keyword u ile tanimlanan gecici adlandirilmis sorgu. Tek bir sorguda birden fazla kez referans alinabilir.', en: 'A temporary named query defined with the WITH keyword. Can be referenced multiple times within a single query.' } },
        { term: 'COALESCE', definition: { tr: 'Arguman listesindeki ilk NULL olmayan degeri dondurur. NULL icin varsayilan deger saglamak icin kullanilir.', en: 'Returns the first non-NULL value in an argument list. Used to provide a fallback value for NULL.' } },
        { term: 'Correlated Subquery', definition: { tr: 'Dis sorgunun bir sutununa referans veren alt sorgu. Dis sorgunun her satiri icin bir kez calisir — yavas olabilir.', en: 'A subquery that references a column from the outer query. Runs once per outer row — can be slow.' } },
        { term: 'DDL', definition: { tr: 'Data Definition Language: CREATE, ALTER, DROP gibi sema yapisini degistiren SQL komutlari.', en: 'Data Definition Language: SQL commands that change schema structure, like CREATE, ALTER, DROP.' } },
        { term: 'DML', definition: { tr: 'Data Manipulation Language: INSERT, UPDATE, DELETE, SELECT gibi veriyi degistiren SQL komutlari.', en: 'Data Manipulation Language: SQL commands that modify data, like INSERT, UPDATE, DELETE, SELECT.' } },
        { term: 'EXPLAIN', definition: { tr: 'Bir sorgunun nasil yurutulegini gosteren komut. Sorgu plani, index kullanimi ve performans sorunlarini teshis etmek icin kullanilir.', en: 'A command that shows how a query will be executed. Used to diagnose query plans, index usage, and performance issues.' } },
        { term: 'Foreign Key (FK)', definition: { tr: 'Baska bir tablonun Primary Key ini referans alan sutun. Tablolar arasi referans butunlugunu zorlar.', en: 'A column that references the Primary Key of another table. Enforces referential integrity between tables.' } },
        { term: 'GROUP BY', definition: { tr: 'Bir sorgudaki satirlari belirtilen sutun degerlerine gore gruplandiran clause. Aggregate fonksiyonlarla birlikte kullanilir.', en: 'A clause that groups rows in a query by specified column values. Used with aggregate functions.' } },
        { term: 'HAVING', definition: { tr: 'GROUP BY sonrasinda gruplari filtreleyen clause. Aggregate sonuclar uzerinde calisir — WHERE gibi ama gruplar icin.', en: 'A clause that filters groups after GROUP BY. Works on aggregate results — like WHERE but for groups.' } },
        { term: 'Index', definition: { tr: 'Veri aramasini hizlandiran veritabani yapisi. WHERE, JOIN ve ORDER BY sorgularini optimize eder.', en: 'A database structure that speeds up data lookup. Optimizes WHERE, JOIN, and ORDER BY queries.' } },
        { term: 'JOIN', definition: { tr: 'Paylasilan sutunlar araciligiyla iki veya daha fazla tablodan satirlari birlestiren SQL operasyonu.', en: 'A SQL operation that combines rows from two or more tables based on a shared column.' } },
        { term: 'NULL', definition: { tr: 'Eksik veya bilinmeyen degeri temsil eden ozel isaretci. Sifir, bos string veya false tan farklidir. IS NULL ile kontrol edilir.', en: 'A special marker representing a missing or unknown value. Different from zero, empty string, or false. Checked with IS NULL.' } },
        { term: 'Primary Key (PK)', definition: { tr: 'Bir tablodaki her satiri benzersiz olarak tanimlayan sutun veya sutun kombinasyonu. NULL olamaz ve tekrar edemez.', en: 'A column or combination of columns that uniquely identifies every row in a table. Cannot be NULL or duplicate.' } },
        { term: 'Schema', definition: { tr: 'Veritabaninin yapisi: tablolar, sutunlar, tipler, kisitlamalar ve iliskiler. CREATE TABLE ifadeleri ile tanimlanir.', en: 'The structure of a database: tables, columns, types, constraints, and relationships. Defined by CREATE TABLE statements.' } },
        { term: 'Subquery', definition: { tr: 'Baska bir SELECT ifadesinin icine yerlestirilmis SELECT ifadesi. WHERE, FROM veya SELECT clause larinda kullanilabilir.', en: 'A SELECT statement nested inside another SELECT statement. Can be used in WHERE, FROM, or SELECT clauses.' } },
        { term: 'Transaction', definition: { tr: 'Tek bir birim olarak islenen SQL ifadeleri dizisi — ya tumu basarili olur ya da higbiri olmaz. ACID garantilerini saglar.', en: 'A sequence of SQL statements treated as a single unit — either all succeed or none do. Provides ACID guarantees.' } },
        { term: 'View', definition: { tr: 'Kayitli SQL sorgu tarafindan tanimlanan sanal tablo. Bir tablo gibi sorgulanabilir ama veriyi kendisi saklamaz.', en: 'A virtual table defined by a stored SQL query. Can be queried like a table but does not store data itself.' } },
        { term: 'Window Function', definition: { tr: 'GROUP BY nin aksine satirlari daraltmadan iliskili satirlar penceresi uzerinde hesaplama yapan fonksiyon. ROW_NUMBER, RANK, LAG gibi.', en: 'A function that performs calculations over a window of related rows without collapsing them like GROUP BY. Examples: ROW_NUMBER, RANK, LAG.' } },
      ]},
      {
        type: 'quiz',
        question: { tr: '`WHERE email = NULL` yazan bir sorgu hiçbir satır döndürmüyor, hatta email\'i gerçekten eksik olan satırlar için de. Sorun nedir, ve doğru sözdizimi nedir?', en: 'A query with `WHERE email = NULL` returns no rows, even for rows where the email is genuinely missing. What is the problem, and what is the correct syntax?' },
        options: [
          { id: 'a', text: { tr: 'NULL büyük harfle yazılmalı', en: 'NULL must be written in lowercase' } },
          { id: 'b', text: { tr: 'NULL hiçbir değere "eşit" değildir (NULL dahil) — `IS NULL` kullanılmalı', en: 'NULL is not "equal" to anything (including NULL itself) — `IS NULL` must be used' } },
          { id: 'c', text: { tr: 'WHERE clause\'u NULL kontrolünü desteklemez', en: 'WHERE clauses do not support NULL checks' } },
          { id: 'd', text: { tr: 'NULL yerine boş string ("") kullanılmalı', en: 'An empty string ("") should be used instead of NULL' } },
        ],
        correct: 'b',
        explanation: { tr: 'SQL\'in üç değerli mantığında, NULL "bilinmeyen" bir değeri temsil eder ve hiçbir değerle (kendisi dahil) eşit veya eşit değildir — `NULL = NULL` bile UNKNOWN döner, TRUE değil. Bu yüzden `email IS NULL` / `email IS NOT NULL` özel operatörleri kullanılmalı. Java\'da bu, bir referansı `== null` ile kontrol etmekle aynı kategoride bir kavramdır, ama SQL\'de `=` operatörü bunun için ASLA çalışmaz.', en: "In SQL's three-valued logic, NULL represents an \"unknown\" value and is never equal or unequal to anything (including itself) — even `NULL = NULL` evaluates to UNKNOWN, not TRUE. That's why the special `IS NULL` / `IS NOT NULL` operators must be used instead. This is conceptually similar to checking a reference with `== null` in Java, but in SQL the `=` operator will NEVER work for this." },
        retryQuestion: {
          question: { tr: '`WHERE status != \'FAIL\'` koşulu olan bir sorgu, beklenmedik şekilde `status`u NULL olan satırları da hariç tutuyor (oysa onları DAHİL etmek istiyordun). Neden?', en: 'A query with `WHERE status != \'FAIL\'` unexpectedly excludes rows where `status` is NULL too (even though you wanted to INCLUDE them). Why?' },
          options: [
            { id: 'a', text: { tr: 'NULL her zaman \'FAIL\'e eşittir', en: 'NULL is always equal to \'FAIL\'' } },
            { id: 'b', text: { tr: 'NULL != \'FAIL\' karşılaştırması da UNKNOWN değerlendirilir, bu yüzden WHERE o satırı dahil etmez', en: 'The comparison NULL != \'FAIL\' also evaluates to UNKNOWN, so WHERE does not include that row either' } },
            { id: 'c', text: { tr: 'NULL satırları veritabanından otomatik silinmiştir', en: 'NULL rows have been automatically deleted from the database' } },
            { id: 'd', text: { tr: '!= operatörü NULL ile asla kullanılamaz, syntax hatası verir', en: 'The != operator can never be used with NULL, it throws a syntax error' } },
          ],
          correct: 'b',
          explanation: { tr: 'NULL ile yapılan HER karşılaştırma (=, !=, <, > dahil) UNKNOWN döner, TRUE veya FALSE değil — ve WHERE clause sadece TRUE değerlendirilen satırları tutar. `status != \'FAIL\'`, NULL bir status için UNKNOWN döner, bu yüzden o satır ne dahil edilir ne reddedilir gibi görünür, fiilen DIŞARIDA kalır. Doğru çözüm: `WHERE status != \'FAIL\' OR status IS NULL`.', en: 'EVERY comparison with NULL (including =, !=, <, >) evaluates to UNKNOWN, not TRUE or FALSE — and the WHERE clause only keeps rows that evaluate to TRUE. `status != \'FAIL\'` evaluates to UNKNOWN for a NULL status, so that row ends up excluded, not included as you might expect. The correct fix is: `WHERE status != \'FAIL\' OR status IS NULL`.' },
        },
      },
    ],
  },
]

function applyTr(enSection, overrides) {
  const offset = overrides.blockOffset || 0
  return {
    title: overrides.title ?? enSection.title,
    blocks: enSection.blocks.map((block, i) => {
      const o = overrides.blocks?.[i - offset]
      if (!o) return block
      return { ...block, ...o }
    })
  }
}

const trSections = [
  applyTr(sections[0], {
    title: '🎯 SQL Nedir & Her QA Mühendisi Neden Bilmeli?',
    blockOffset: 1,
    blocks: {
      0: { text: 'Veritabanı Nedir?' },
      1: { content: 'Veritabanı, elektronik ortamda depolanan yapılandırılmış veri koleksiyonudur. Milyonlarca satır saklayan, ilgili verileri birbirine bağlayan ve karmaşık sorulara milisaniyeler içinde yanıt veren güçlü bir spreadsheet gibi düşünebilirsiniz. Test ettiğiniz her uygulamanın verileri neredeyse her zaman bir veritabanında saklanır.' },
      2: { text: 'SQL Nedir?' },
      3: { content: "SQL (Structured Query Language), ilişkisel veritabanlarıyla iletişim kurmak için standart dildir. Soru sormak ('bugün kaç kullanıcı kaydoldu?'), veri eklemek, kayıt güncellemek ve silmek için kullanılır. 1970'lerden bu yana endüstri standardıdır; MySQL, PostgreSQL, SQLite, SQL Server ve Oracle dahil tüm büyük veritabanlarında çalışır." },
      4: { text: 'QA Mühendisleri Neden SQL Bilmeli?' },
      5: { items: [
        { icon: '✅', label: 'Backend Durumunu Doğrula', desc: 'UI işleminden sonra DB\'yi sorgulayarak verinin doğru kaydedildiğini doğrulayın — yalnızca UI\'ya güvenmeyin.' },
        { icon: '🌱', label: 'Test Verisi Ekle', desc: 'Testler çalışmadan önce INSERT ile test kullanıcıları, ürünler ve siparişleri ekleyin — manuel kurulum gerekmez.' },
        { icon: '🧹', label: 'Test Sonrası Temizlik', desc: 'Her çalıştırmadan sonra test kayıtlarını DELETE edin, sonraki çalıştırma temiz başlasın.' },
        { icon: '🔍', label: 'Backend Doğrulaması', desc: 'İş kurallarını kontrol edin: sipariş toplamı = satır kalemlerinin toplamı, FK kısıtlamaları, veri bütünlüğü.' },
        { icon: '⚡', label: "UI'dan Daha Hızlı", desc: 'Bir DB sorgusu milisaniyeler alır. Aynı veriye UI üzerinden tıklayarak ulaşmak dakikalar sürer.' },
        { icon: '🐛', label: 'Gizli Hataları Bul', desc: 'UI başarı gösteriyor ama DB güncellenmedi — SQL gerçeği ortaya koyar.' },
      ]},
      6: { text: 'Temel Veritabanı Terminolojisi' },
      7: {
        headers: ['Terim', 'Anlam', 'Örnek'],
        rows: [
          ['Table (Tablo)', 'Satır ve sütunlarda veri saklar (spreadsheet gibi)', '"users" tablosu: id, email, age sütunları'],
          ['Row / Record (Satır)', 'Tablodaki tek bir kayıt', 'Tek kullanıcı: {id:1, email:"alice@test.com"}'],
          ['Column / Field (Sütun)', 'Her satır için saklanan bir özellik', '"email", "created_at", "is_active"'],
          ['Primary Key', 'Her satır için benzersiz tanımlayıcı — NULL olamaz, tekrar edemez', '"id" sütunu, AUTO_INCREMENT ile'],
          ['Foreign Key', "Başka tablonun PK'sını referans alan sütun — ilişki ve bütünlük sağlar", '"orders.user_id" → "users.id"'],
          ['Index', 'Sütun aramalarını hızlandıran veri yapısı', '"email" sütununa INDEX → hızlı WHERE email=?'],
          ['Schema', 'Veritabanının planı — tüm tablolar, sütunlar, tipler, kısıtlamalar', 'CREATE TABLE tanımları'],
          ['Query (Sorgu)', 'SQL kullanılarak veritabanına gönderilen istek', 'SELECT * FROM users WHERE age > 25'],
        ]
      },
      8: { text: 'Popüler Veritabanları Karşılaştırması' },
      9: {
        headers: ['Veritabanı', 'Tip', 'En İyi Kullanım', 'Ücretsiz?'],
        rows: [
          ['MySQL', 'Açık kaynak', 'Web uygulamaları, endüstride en yaygın', '✅ Evet'],
          ['PostgreSQL', 'Açık kaynak', 'Karmaşık sorgular, JSON, kurumsal uygulamalar', '✅ Evet'],
          ['SQLite', 'Gömülü / sunucusuz', 'Yerel geliştirme, test, mobil uygulamalar', '✅ Evet'],
          ['SQL Server', 'Microsoft ticari', 'Windows/.NET kurumsal uygulamalar', '✅ Express sürüm'],
          ['Oracle', 'Ticari kurumsal', 'Büyük ölçekli bankacılık/finans', '❌ Ücretli'],
        ]
      },
      10: { content: "SQLiteOnline.com ile öğrenmeye başlayın — tarayıcınızda çalışır, kurulum gerekmez. Gerçek ortam için DBeaver (ücretsiz GUI) kurun ve SQLite veya MySQL'e bağlanın." },
      11: { text: 'SQL, QA İş Akışında Nerede Kullanılır?' },
      12: {
        title: 'SQL Test Sürecinize Nasıl Entegre Olur?',
        items: [
          { icon: '🧪', label: 'Test Scripti', desc: 'Playwright / pytest' },
          { arrow: true },
          { icon: '🖥️', label: 'Uygulama UI/API', desc: 'DB değişikliği yapar' },
          { arrow: true },
          { icon: '🗄️', label: 'Veritabanı', desc: 'MySQL / PostgreSQL' },
          { arrow: true },
          { icon: '🔍', label: 'SQL Sorgusu', desc: 'Buradan doğrularsın!', highlight: true },
        ],
        note: 'Her test işleminden sonra bir SQL sorgusu veritabanı durumunun doğru şekilde güncellendiğini doğrulayabilir — yalnızca UI\'nun gösterdiğine güvenmeyin.',
      },
      13: {
        title: 'Örnek: Bir Veritabanı Tablosu',
        tables: [{
          name: 'users',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'name', type: 'VARCHAR' },
            { name: 'email', type: 'VARCHAR' },
            { name: 'role', type: 'VARCHAR' },
            { name: 'created_at', type: 'DATETIME' },
          ],
          rows: [
            { cells: [1, 'Alice', 'alice@test.com', 'admin', '2024-01-10'] },
            { cells: [2, 'Bob', 'bob@test.com', 'user', '2024-01-12'] },
            { cells: [3, 'Carol', 'carol@test.com', 'user', '2024-01-15'], highlighted: true },
          ]
        }],
        note: 'Her satır bir kayıttır. Her sütun bir alandır. id, Primary Key\'dir — her satırı benzersiz olarak tanımlar.',
      },
      14: {
        question: 'SQL neyin kısaltmasıdır?',
        options: ['Standard Query Logic', 'Structured Query Language', 'Simple Question Language', 'Sequential Query Library'],
        correct: 1,
        explanation: "SQL = Structured Query Language (Yapılandırılmış Sorgu Dili). 1970'lerden bu yana ilişkisel veritabanları için standart dildir; MySQL, PostgreSQL, SQLite, Oracle ve SQL Server tarafından kullanılır.",
      },
    }
  }),
  applyTr(sections[1], {
    title: '📦 SQL Ortamınızı Kurma',
    blockOffset: 1,
    blocks: {
      0: { text: 'Seçenek A: Kurulum Gerektirmeyen Çevrimiçi Editörler (Buradan Başlayın)' },
      1: { items: [
        { label: 'db-fiddle.com', desc: 'En iyi seçenek. MySQL, PostgreSQL, SQLite. Schema + sorgu bölünmüş görünüm.' },
        { label: 'sqliteonline.com', desc: "SQLite'ı tarayıcınızda çalıştırır. .db dosyası yükleyin veya tablo oluşturun." },
        { label: 'sqlfiddle.com', desc: 'Klasik. Birden fazla DB motoru. Örnekleri paylaşmak için uygun.' },
      ]},
      2: { text: 'Seçenek B: SQLite CLI (En Hafif Yerel Seçenek)' },
      3: { items: [
        'Windows: sqlite.org/download.html\'den "sqlite-tools-win32" indirin ve C:\\sqlite\\ klasörüne çıkarın',
        'Mac: Zaten yüklü! Çalıştır: sqlite3 — veya Homebrew ile: brew install sqlite',
        'Linux: sudo apt install sqlite3',
        'Veritabanı oluştur: sqlite3 mytest.db',
        'Doğrula: SELECT sqlite_version();',
      ]},
      5: { text: 'Seçenek C: MySQL Community Server' },
      6: { items: [
        'Windows: dev.mysql.com/downloads/installer/ adresinden MySQL Installer indirin → "Developer Default" seçin',
        'Mac: brew install mysql → brew services start mysql → mysql -u root',
        'Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root',
        'Kurulumu doğrula: SELECT VERSION();',
      ]},
      8: { text: 'Seçenek D: DBeaver GUI (Yeni Başlayanlar için Önerilen)' },
      9: { content: "DBeaver, tüm veritabanlarıyla çalışan ücretsiz evrensel bir GUI'dir. Komut satırından çok daha kolaydır — tabloları görsel olarak inceleyebilir ve otomatik tamamlama ile sorgular çalıştırabilirsiniz." },
      10: { items: [
        'dbeaver.io adresinden DBeaver Community\'i indirin (ücretsiz)',
        "DBeaver'ı kurun ve başlatın",
        '"New Database Connection" seçeneğine tıklayın (sol üstteki fiş simgesi)',
        'DB türünüzü seçin: SQLite, MySQL veya PostgreSQL',
        'SQLite: Göz At\'a tıklayın → .db dosyanızı seçin (veya yeni oluşturun)',
        'MySQL/PostgreSQL: host, port, veritabanı adı, kullanıcı adı ve şifreyi girin',
        '"Test Connection"\'a tıklayın — Finish\'ten önce yeşil "Connected" mesajı görünmeli',
        'Ctrl+] ile SQL Editor\'ü açın ve sorgu yazmaya başlayın',
      ]},
      11: { text: "Python'da SQL Kullanımı (Test Otomasyonu için)" },
      13: { text: '☕ Java Biliyorsan: Veritabanı Bağlantısı Köprüsü' },
      14: {
        topic: 'DB Bağlantısı Kurma (DriverManager vs sqlite3)',
        why: 'Java\'da JDBC kullanırsın — pom.xml\'e sürücü ekler, DriverManager.getConnection() çağırırsın. Python\'da sqlite3 yerleşik (sıfır kurulum!) ve PostgreSQL için psycopg2 var. Kalıp aynı: bağlantı aç → kullan → kapat.',
        note: 'sqlite3 Python standart kütüphanesinde — Maven yok, pip yok, pom.xml yok! Sadece import et ve kullan. pip install psycopg2-binary tek bir Maven bağımlılığı eklemeye eşdeğer.',
      },
      15: {
        topic: 'Bağımlılık Kurulumu (Maven pom.xml vs pip)',
        why: 'Java\'da JDBC sürücü bağımlılıklarını pom.xml\'de bildirirsin, Maven indirir. Python\'da pip install sürücüyü indirir. SQLite için hiçbir şey gerekmez — Python ile birlikte gelir.',
        note: 'Python SQLite için en hızlı başlangıcı sağlar. Gerçek proje bağımlılıkları için requirements.txt kullan (pom.xml ile aynı fikir). pip install -r requirements.txt her şeyi kurar.',
      },
    }
  }),
  applyTr(sections[2], {
    title: '🟢 Seviye 1: SQL Temelleri',
    blockOffset: 1,
    blocks: {
      0: { text: 'CREATE TABLE — Yapıyı Tanımlama', difficulty: '🟢 Başlangıç' },
      2: { text: 'INSERT INTO — Veri Ekleme', difficulty: '🟢 Başlangıç' },
      4: { text: 'SELECT — Veri Okuma', difficulty: '🟢 Başlangıç' },
      // index 6 = editor (SELECT editor) — no TR override needed
      7: { text: 'UPDATE ve DELETE', difficulty: '🟢 Başlangıç' },
      9: { content: 'UPDATE ve DELETE komutlarında MUTLAKA WHERE kullanın! WHERE olmadan tablodaki tüm satırlar etkilenir. Değiştirilecek satırları önce SELECT ile doğrulayın, ardından güncelleme veya silme işlemini yapın.' },
      10: { text: 'NULL Değerleri', difficulty: '🟢 Başlangıç' },
      12: { text: 'İnteraktif Örnek: test_results Tablosu', difficulty: '🟢 Başlangıç' },
      // index 13 = editor (Interactive Example) — no TR override needed
      14: { text: 'SQL Yürütme Sırası — Çoğu Yeni Başlayanın Kaçırdığı Sır' },
      15: { content: "SQL, normal kod gibi yukarıdan aşağıya çalışmaz. Belirli bir dahili sıra izler. Bu yüzden WHERE içinde SELECT takma adları kullanamaz ve aggregate fonksiyonlar HAVING'e gider, WHERE'e değil." },
      16: {
        title: 'SQL Cümle Değerlendirme Sırası (Adım Adım)',
        note: 'SELECT\'i en üste yazarsın ama neredeyse en son çalışır. Bu yüzden SELECT\'te tanımlanan takma adlar WHERE\'de kullanılamaz!',
        steps: [
          { num: '1', label: 'FROM', desc: 'Tabloları yükle' },
          { num: '2', label: 'JOIN', desc: 'Birleştir' },
          { num: '3', label: 'WHERE', desc: 'Satırları filtrele', highlight: true },
          { num: '4', label: 'GROUP BY', desc: 'Grupla' },
          { num: '5', label: 'HAVING', desc: 'Grupları filtrele', highlight: true },
          { num: '6', label: 'SELECT', desc: 'Sütunları seç' },
          { num: '7', label: 'ORDER BY', desc: 'Sırala' },
          { num: '8', label: 'LIMIT', desc: 'Dilimleme' },
        ],
      },
      17: {
        title: 'Örnek Verimiz — test_results Tablosu',
        tables: [{
          name: 'test_results',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'test_name', type: 'VARCHAR' },
            { name: 'status', type: 'VARCHAR' },
            { name: 'duration_ms', type: 'INT' },
            { name: 'environment', type: 'VARCHAR' },
          ],
          rows: [
            { cells: [1, 'Login Test', 'PASS', 1200, 'staging'] },
            { cells: [2, 'Checkout Flow', 'FAIL', 5400, 'staging'], highlighted: true },
            { cells: [3, 'Signup Test', 'PASS', 890, 'prod'] },
            { cells: [4, 'Profile Update', 'FAIL', 3100, 'prod'], highlighted: true },
            { cells: [5, 'Search Feature', 'PASS', 2200, 'staging'] },
            { cells: [6, 'Logout Test', 'SKIP', 0, 'staging'] },
          ]
        }],
        note: "Sarı satırlar = FAIL durumu. Dene: SELECT * FROM test_results WHERE status = 'FAIL' → 2. ve 4. satırları döndürür.",
      },
      18: { text: 'NULL — En Yaygın SQL Hatası' },
      19: { content: "NULL, 'değer yok / bilinmiyor' anlamına gelir — sıfır değil, boş string değil. NULL ile yapılan her karşılaştırma NULL döndürür (true veya false değil). Bu durum her SQL yeni başlayanının tökezlediği noktadır." },
      20: {
        left: {
          label: '❌ Yanlış — = NULL hiçbir zaman çalışmaz',
          code: `SELECT * FROM users WHERE email = NULL;
-- Her zaman 0 satır döndürür!
-- NULL değerler var olsa bile.
-- Neden? NULL = NULL → NULL (true değil)`,
          note: "NULL kontrolü için = veya != kullanmayın",
        },
        right: {
          label: '✅ Doğru — IS NULL / IS NOT NULL',
          code: `SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
-- COALESCE: NULL'ı varsayılanla değiştir:
SELECT name, COALESCE(email, 'eposta yok') FROM users;`,
          note: "IS NULL ve IS NOT NULL her zaman doğru çalışır",
        },
      },
      21: {
        question: "WHERE discount = NULL filtresi uyguladığında sorgu 0 satır döndürüyor. Neden?",
        options: [
          'Tabloda NULL indirim yok',
          '= ile NULL karşılaştırması her zaman NULL (TRUE değil) döndürür, hiçbir satır eşleşmez',
          'Tırnak gerekiyor: WHERE discount = "NULL"',
          "NULL otomatik olarak 0'a dönüştürülür",
        ],
        correct: 1,
        explanation: "= veya != ile yapılan NULL karşılaştırmaları FALSE gibi davranır. Bunun yerine IS NULL veya IS NOT NULL kullanın. Bu, en yaygın SQL hatalarından biridir.",
      },
      22: { text: '☕ Java Biliyorsan: Veritabanı Erişim Köprüsü' },
      23: {
        topic: 'DB Bağlantısı (DriverManager vs sqlite3)',
        why: "Java, JDBC DriverManager ile URL + kimlik bilgileriyle bağlanır. Python, hafif sürücü modülleri kullanır (sqlite3 yerleşik, PostgreSQL için psycopg2). Bağlantı mantığı aynı — API farklı.",
        note: "Python sqlite3, Python'a yerleşik gelir — pip kurulumu gerekmez. MySQL: mysql-connector-python; PostgreSQL: psycopg2.",
      },
      24: {
        topic: 'SELECT Çalıştırma → Sonuçları Okuma',
        why: "Java, rs.next() döngüsü ve sütun adıyla getter metodlar içeren ResultSet kullanır. Python'un cursor.fetchall() metodu basit bir demet listesi döndürür — çok daha az kod.",
        note: "cursor.fetchall() tüm satırları demet listesi olarak döndürür. cursor.fetchone() bir satır ya da None döndürür — rs.next() bir kez çağırmaya eşdeğer.",
      },
      25: { text: '☕ Java Biliyorsan: DML Operasyonları Köprüsü' },
      26: {
        topic: 'INSERT → JPA persist() vs SQL INSERT INTO',
        why: "Java kurumsal projelerinde büyük ihtimalle JPA/Hibernate (EntityManager.persist) ile nesne ekliyordunuz. SQL'de INSERT INTO doğrudan yazılır. İkisi de aynı SQL'i üretir — JPA sadece bunu sizin yerinize oluşturur.",
        note: "SQL INSERT açık ve güçlüdür — toplu insert'ler ve INSERT-SELECT'in JPA'da custom query olmadan karşılığı yoktur. Test otomasyonunda hız ve sadelik için doğrudan SQL tercih edilir.",
      },
      27: {
        topic: 'UPDATE/DELETE → JPA merge()/remove() vs SQL',
        why: "JPA, UPDATE ve DELETE'i entity durum değişiklikleri üzerinden soyutlar. SQL doğrudan kontrol sağlar — WHERE ile tam olarak istediğiniz satırları güncelleyin/silin.",
        note: "SQL UPDATE ve DELETE, WHERE ile tek sorguda çok sayıda satırı etkileyebilir. JPA her satır için ayrı entity yükleme gerektirir. Test otomasyonunda temizleme için doğrudan SQL daha hızlı ve yaygındır.",
      },
    }
  }),
  applyTr(sections[3], {
    title: '🟡 Seviye 2: Orta Seviye SQL',
    blockOffset: 1,
    blocks: {
      0: { text: 'Aggregate (Toplama) Fonksiyonları', difficulty: '🟡 Orta Seviye' },
      // index 2 = editor (Aggregate) — no TR override needed
      3: { text: 'GROUP BY ve HAVING', difficulty: '🟡 Orta Seviye' },
      4: { content: 'GROUP BY, aynı değere sahip satırları gruplar. HAVING ise bu grupları filtreler — WHERE gibi ama aggregate sonuçları için. COUNT/SUM gibi fonksiyonları WHERE içinde kullanamazsınız; bunun için HAVING kullanın.' },
      // index 6 = editor (GROUP BY) — no TR override needed
      7: { text: "JOIN'ler — Tabloları Birleştirme", difficulty: '🟡 Orta Seviye' },
      8: { content: "JOIN'ler, birden fazla ilişkili tablodan tek sorguda veri almanızı sağlar. Gerçek dünya veritabanlarında veriler tablolar arasında bölündüğünden JOIN'ler vazgeçilmezdir." },
      // index 10 = editor (JOINs) — no TR override needed
      11: { text: 'Alt Sorgular (Subquery)', difficulty: '🟡 Orta Seviye' },
      // index 13 = editor (Subqueries) — no TR override needed
      14: { text: 'LIKE, BETWEEN, IN', difficulty: '🟡 Orta Seviye' },
      // index 16 = editor (LIKE) — no TR override needed
      17: { text: 'Bug Takip DB — İnteraktif Örnek', difficulty: '🟡 Orta Seviye' },
      // index 18 = editor (Bug Tracking) — no TR override needed
      19: { text: 'Görsel JOIN Kılavuzu — Tam Olarak Hangi Satırların Döndüğünü Gör' },
      20: { content: "Aşağıdaki 4 diyagram aynı veriyi kullanıyor. Eşleşen satırları vurgulamak için 'Eşleşmeleri Göster', sorgu sonucunu görmek için 'Sonucu Göster'e tıklayın. JOIN'leri gerçekten anlamanın en hızlı yolu bu." },
      21: {
        explanation: 'INNER JOIN, yalnızca HER İKİ tabloda da eşleşen satırları döndürür. Carol\'un hiç hatası yok — sonuçtan tamamen hariç tutulur.',
      },
      22: {
        explanation: 'LEFT JOIN, SOL tablodan (testers) TÜM satırları döndürür, artı bugs\'dan eşleşmeleri. Carol bug_count=0 ile görünür — LEFT JOIN, "sıfır dahil her kullanıcı başına say" için mükemmeldir.',
      },
      23: {
        explanation: 'RIGHT JOIN, SAĞ tablodan (bugs) TÜM satırları döndürür. Bug #4\'ün test uzmanı yok — hâlâ tester=NULL ile görünür. Nadiren kullanılır — çoğu geliştirici bunu tablolar yer değiştirilerek LEFT JOIN olarak yeniden yazar.',
      },
      24: {
        left: {
          label: '❌ Yavaş — Her satır için alt sorgu',
          code: `SELECT name,
  (SELECT COUNT(*) FROM bugs
   WHERE tester_id = t.id) AS bug_count
FROM testers t;
-- İç SELECT her tester satırı için bir kez çalışır!`,
          note: "Bağıntılı alt sorgu: O(n) iç sorgu",
        },
        right: {
          label: '✅ Hızlı — Tek JOIN + GROUP BY',
          code: `SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Her iki tabloda tek geçiş`,
          note: "LEFT JOIN: 0 hatalı durumları da doğru işler",
        },
      },
      25: {
        question: 'Hangi JOIN türü, sağ tabloda eşleşmesi olmayan satırlar dahil sol tablodan TÜM satırları döndürür?',
        options: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 2,
        explanation: "LEFT JOIN (LEFT OUTER JOIN olarak da bilinir), sol tablodan her satırı döndürür. Sağ tabloda eşleşme yoksa NULL değerler görünür. \"Sıfır hataya sahip olanlar dahil tüm test uzmanları\" gibi durumlarda kullanılır.",
      },
      26: { text: '☕ Java Biliyorsan: PreparedStatement ve Transaction Köprüsü' },
      27: {
        topic: "PreparedStatement → Parametreli Sorgu",
        why: "SQL Injection önleme! Java, PreparedStatement ile ? yer tutucuları kullanır. Python aynı konsepti uygular — %s (MySQL/PostgreSQL) veya ? (SQLite). Kullanıcı girdilerini asla SQL string'ine birleştirmeyin!",
        note: "Python psycopg2/MySQL %s kullanır. SQLite ? kullanır (Java gibi!). SQL değerleri için asla f-string veya + birleştirme kullanmayın — her zaman parametreli sorgu kullanın.",
      },
      28: {
        topic: "Transaction Yönetimi (commit / rollback)",
        why: "Transaction'lar, hepsini-ya-da-hiçbirini değişiklikleri garanti eder — test verisi kurulumu için kritik. Java setAutoCommit(false) çağırır. Python sürücülerinde otomatik commit varsayılan olarak kapalıdır; siz commit() çağırırsınız.",
        note: "QA ipucu: test verisi kurulumunu transaction içine sarın ve her testin ardından geri alın — DELETE temizlik sorguları yazmadan DB'yi temiz tutar.",
      },
    }
  }),
  applyTr(sections[4], {
    title: '🔴 Seviye 3: İleri Seviye SQL',
    blockOffset: 1,
    blocks: {
      0: { text: 'Window (Pencere) Fonksiyonları', difficulty: '🔴 İleri' },
      1: { content: "Window fonksiyonları, GROUP BY'ın aksine satırları daraltmadan ilgili satırlar üzerinde hesaplamalar yapar. Her satır kendi sonucunu korurken komşu satırlar hakkında da bilgi alır." },
      // index 3 = editor (Window Functions) — no TR override needed
      4: { text: 'CTE — Common Table Expressions (Ortak Tablo İfadeleri)', difficulty: '🔴 İleri' },
      // index 6 = editor (CTEs) — no TR override needed
      7: { text: "Transaction'lar — ACID Özellikleri", difficulty: '🔴 İleri' },
      9: { text: "Index'ler — Sorguları Hızlandırma", difficulty: '🔴 İleri' },
      11: { text: "View'lar (Görünümler)", difficulty: '🔴 İleri' },
      // index 13 = editor (Views) — no TR override needed
      14: { text: 'SQL Injection & Parametreli Sorgular', difficulty: '🔴 İleri' },
      16: {
        title: 'ACID Transaction Akışı — DB İçinde Neler Oluyor',
        note: 'ACID garantileri, test verinizin her zaman tutarlı bir durumda olduğu anlamına gelir — kısmi insert yok, işlemler arası phantom read yok.',
        steps: [
          { num: 'A', label: 'Atomiklik', desc: 'Hepsi veya hiçbiri', highlight: true },
          { num: 'C', label: 'Tutarlılık', desc: 'Kurallar zorlanır' },
          { num: 'I', label: 'İzolasyon', desc: 'Eş zamanlı güvenli', highlight: true },
          { num: 'D', label: 'Dayanıklılık', desc: 'Çökmeden sağ kaldı' },
        ],
      },
      17: {
        title: 'Transaction Yaşam Döngüsü — Her SQL Komutu Ne Yapar',
        items: [
          { icon: '🚀', label: 'START TRANSACTION', desc: 'Atomik bloğu başlat' },
          { arrow: true },
          { icon: '✏️', label: 'INSERT / UPDATE / DELETE', desc: 'Birden fazla ifade' },
          { arrow: true },
          { icon: '✅', label: 'COMMIT', desc: 'Tüm değişiklikleri kalıcı yap', highlight: true },
          { arrow: true },
          { icon: '↩️', label: 'ROLLBACK', desc: 'Hata varsa tümünü geri al' },
        ],
        note: 'COMMIT tüm değişiklikleri kalıcı kılar. ROLLBACK START TRANSACTION\'a kadar her şeyi geri alır — tüm batch için Ctrl+Z gibi.',
      },
    }
  }),
  applyTr(sections[5], { blockOffset: 1,
    title: '🧪 QA için SQL — Gerçek Test Senaryoları',
    blocks: {
      0: { text: 'Senaryo 1: Son 7 Günde Başarısız Olan Testleri Bul' },
      2: { text: 'Senaryo 2: Tekrarlanan Test Verisi Girişlerini Bul' },
      4: { text: 'Senaryo 3: Foreign Key İlişkilerini Doğrula (Yetim Kayıtları Bul)' },
      6: { text: 'Senaryo 4: Test Sonuçlarını Duruma Göre Yüzdeyle Say' },
      8: { text: 'Senaryo 5: 30 Günden Eski Test Verilerini Temizle' },
      10: { text: 'Senaryo 6: EXPLAIN — Yavaş Sorguları Bul ve Düzelt' },
    }
  }),
  applyTr(sections[6], {
    title: '💼 SQL Mülakat Soruları & Cevapları',
    blockOffset: 1,
    blocks: {
      0: { content: 'Model cevabı görmek için her soruya tıklayın. Kod örnekleri içerir.' },
      1: { text: '🟢 Temel Sorular' },
      2: { question: 'S1: WHERE ile HAVING arasındaki fark nedir?', answer: 'WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE.' },
      3: { question: 'S2: Farklı JOIN türlerini açıklayın.', answer: 'INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir.' },
      4: { question: 'S3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?', answer: "PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez." },
      5: { question: 'S4: NULL nedir ve nasıl kontrol edilir?', answer: "NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın." },
      6: { question: 'S5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?', answer: "DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir." },
      7: { text: '🟡 Orta Seviye Sorular' },
      8: { question: 'S6: UNION ile UNION ALL arasındaki fark nedir?', answer: 'UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır.' },
      9: { question: 'S7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?', answer: "Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın." },
      10: { question: "S8: Index nedir, performansı nasıl etkiler?", answer: "Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan atlarsınız.\n\nHızlandırır: WHERE içeren SELECT, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, 3 değerli status), sık güncellenen sütunlar." },
      11: { question: 'S9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın.', answer: 'Klasik mülakat sorusu. LIMIT/OFFSET, alt sorgu veya window fonksiyonu ile birden fazla yaklaşım vardır.' },
      12: { question: 'S10: GROUP BY — SELECT sütunlarına hangi kurallar uygulanır?', answer: "KURAL: SELECT listesindeki her sütun ya GROUP BY'da bulunmalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır.\n\nNeden? GROUP BY ile birden fazla satır tek bir gruba çöker. Aggregate edilmemiş sütunlar için DB hangi satırın değerini göstereceğini bilemez — ya GROUP BY'a ekleyin ya da aggregate edin." },
      13: { text: '🔴 İleri Seviye Sorular' },
      14: { question: 'S11: Window fonksiyonlarını pratik bir örnekle açıklayın.', answer: "Window fonksiyonları, satırları daraltmadan ilgili satırlar 'penceresi' üzerinde hesaplamalar yapar. GROUP BY'ın aksine her satır kendi kimliğini korur ve window hesaplaması sonucunu alır.\n\nOVER() pencereyi tanımlar. PARTITION BY gruplar (GROUP BY gibi ama daraltmaz). OVER içindeki ORDER BY bir sıra oluşturur. Kullanım alanları: sıralama, kümülatif toplamlar, önceki/sonraki satırla karşılaştırma." },
      15: { question: "S12: CTE nedir? Alt sorguya göre ne zaman tercih edilmeli?", answer: "CTE (WITH ifadesi), adlandırılmış geçici bir sonuç kümesidir. Bir kez değerlendirilir ve birden fazla kez referans alınabilir.\n\nCTE'yi alt sorgulara tercih edin: sorguyu adlandırılmış alt adımlara bölmek okunabilirliği artırıyorsa, aynı alt sorguya birden fazla referans verecekseniz, recursive sorgular (hiyerarşik veri) yazıyorsanız. Basit tek kullanımlık türetmeler için alt sorgular yeterlidir." },
      16: { question: "S13: Transaction nasıl çalışır? ACID özellikleri nelerdir?", answer: "Transaction, tek bir birim olarak işlenen bir dizi SQL işlemidir — ya TÜMÜ başarılı olur ya da HİÇBİRİ olmaz.\n\nACID:\nAtomicity (Atomiklik): Ya hepsi ya hiç — tek başarısızlık her şeyi geri alır.\nConsistency (Tutarlılık): Transaction, DB'yi bir geçerli durumdan diğerine taşır.\nIsolation (İzolasyon): Eş zamanlı transaction'lar birbirinin devam eden değişikliklerini görmez.\nDurability (Kalıcılık): Commit edilen veriler çökmelerden sağ çıkar (diske yazılır)." },
      17: { question: 'S14: SQL injection nedir ve parametreli sorgular bunu nasıl önler?', answer: "SQL injection: Kullanıcı girişi SQL kodu olarak yorumlanır; saldırganlar kimlik doğrulamayı atlayabilir, tüm verileri okuyabilir veya tabloları silebilir.\n\nParametreli sorgular (hazırlanmış ifadeler), değerleri SQL yapısından ayrı olarak DATA şeklinde iletir. DB motoru değerleri otomatik olarak escape eder — içeriklerinden bağımsız olarak asla SQL kodu olarak yorumlanamaz." },
      18: { question: 'S15: Yavaş bir sorguyu nasıl optimize edersiniz?', answer: "1. Sorgu planını görmek için EXPLAIN/EXPLAIN ANALYZE çalıştırın — 'full table scan' (type:ALL) ve NULL index'lere bakın.\n2. WHERE sütunlarına, JOIN sütunlarına uygun index'ler ekleyin.\n3. Mümkünse alt sorguları JOIN'lere çevirin.\n4. SELECT * yerine yalnızca gerekli sütunları seçin.\n5. Sonuç boyutunu azaltmak için LIMIT kullanın.\n6. Toplamalar için GROUP BY sütunlarının index'li olduğundan emin olun.\n7. Karmaşık sorgular için CTE kullanın.\n8. Eksik FK index'lerini kontrol edin.\n9. Her değişiklikten sonra EXPLAIN çıktısını doğrulayın." },
    }
  }),
  applyTr(sections[7], {
    title: '📝 Pratik Alıştırmalar & Hızlı Referans',
    blockOffset: 1,
    blocks: {
      0: { text: 'Pratik Alıştırmalar' },
      1: {
        difficulty: '🟢 Başlangıç',
        title: 'Alıştırma 1: Başarısız Test Çalıştırmalarını Sorgula',
        description: 'id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date sütunlarına sahip bir test_runs tablosu verilmektedir. ÜÇ sorgu yazın: (a) bugünün tüm başarısız çalıştırmaları, (b) her durumun sayısı, (c) en yavaş 3 test.',
        hint: 'WHERE status="FAIL" AND DATE(run_date)=CURDATE() kullanın. Sayımlar için GROUP BY status. En yavaş için ORDER BY duration_ms DESC LIMIT 3.',
        explanation: "DATE() bir DATETIME'den yalnızca tarih bölümünü çıkarır. CURDATE() bugünün tarihini döndürür. Bunlar MySQL fonksiyonlarıdır — PostgreSQL'de CURRENT_DATE kullanılır.",
      },
      2: {
        difficulty: '🟡 Orta',
        title: 'Alıştırma 2: Çoklu Tablo JOIN',
        description: 'Üç tablonuz var: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Son 30 günde çalıştırılan testler için: test uzmanı adı, test case başlığı, durum ve tarihi gösteren, en yenisi önce sıralı bir sorgu yazın.',
        hint: '3 tabloyu JOIN edin: users→results (user_id üzerinden), test_cases→results (test_case_id üzerinden). WHERE run_date >= NOW() - INTERVAL 30 DAY kullanın.',
        explanation: '"results" tablosundan (users ve test_cases\'ı birleştiren ara tablo) başlayıp JOIN yapın. Bu, istenmeyen kartezyen çarpımı önler.',
      },
      3: {
        difficulty: '🔴 İleri',
        title: 'Alıştırma 3: CTE + Window Fonksiyonu — Test Uzmanlarını Başarı Oranına Göre Sırala',
        description: 'results tablosunu (user_id, status, sprint) kullanarak: CTE ile istatistikleri hesaplayıp RANK() window fonksiyonu ile test uzmanlarını SPRINT BAŞINA başarı oranına göre sıralayan bir sorgu yazın. Göster: sprint, uzman adı, toplam test, başarı sayısı, başarı oranı %, sprint içi sıralama.',
        hint: 'CTE: sayımlar için sprint ve user_id grupla. Sonra isimler için users JOIN. Ardından RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) ekle.',
        explanation: "İki CTE: birincisi ham sayımları toplar, ikincisi oranı hesaplar ve kullanıcı adlarını JOIN eder. Son SELECT window fonksiyonunu ekler. CTE'lere bölmek her adımı ayrıca hata ayıklanabilir kılar.",
      },
      4: { text: 'Hızlı Referans Kartı' },
      5: {
        headers: ['Komut', 'Söz Dizimi', 'Amaç'],
        rows: [
          ['SELECT', 'SELECT col FROM tbl WHERE cond', 'Tablodan veri oku'],
          ['INSERT', 'INSERT INTO tbl (cols) VALUES (...)', 'Yeni satır ekle'],
          ['UPDATE', 'UPDATE tbl SET col=val WHERE cond', 'Mevcut satırları güncelle'],
          ['DELETE', 'DELETE FROM tbl WHERE cond', 'Satırları sil'],
          ['CREATE TABLE', 'CREATE TABLE t (id INT PRIMARY KEY, ...)', 'Yeni tablo tanımla'],
          ['JOIN (INNER)', 'JOIN t2 ON t1.id = t2.fk', 'Her iki tabloda eşleşen satırlar'],
          ['LEFT JOIN', 'LEFT JOIN t2 ON t1.id = t2.fk', 'Sol tablodaki tüm satırlar + eşleşen sağ'],
          ['GROUP BY', 'GROUP BY col HAVING COUNT(*) > N', 'Topla + grupları filtrele'],
          ['ORDER BY', 'ORDER BY col DESC LIMIT N', 'Sırala ve sınırla'],
          ['COUNT/SUM/AVG', 'SELECT COUNT(*), AVG(col)', 'Aggregate fonksiyonlar'],
          ['NULL kontrolü', 'WHERE col IS NULL', 'Eksik değerleri bul'],
          ['COALESCE', 'COALESCE(col, default)', "NULL'ı varsayılan ile değiştir"],
          ['CTE', 'WITH name AS (SELECT ...) SELECT ...', 'Adlandırılmış geçici alt sorgu'],
          ['Window RANK', 'RANK() OVER (PARTITION BY ... ORDER BY ...)', 'Gruplar içinde sırala'],
          ['EXPLAIN', 'EXPLAIN SELECT ...', 'Sorgu yürütme planını göster'],
        ]
      },
      6: { content: "Hızlı deneyler için db-fiddle.com'u yer imlerine ekleyin. DELETE veya UPDATE çalıştırmadan önce WHERE koşulunu SELECT ile test edin — tek bir eksik WHERE tüm tabloyu silebilir." },
    }
  }),
]

const trHero = {
  title: '🗄️ SQL',
  subtitle: 'Sıfırdan Veritabanı Test Uzmanına',
  intro: 'SQL\'i test otomasyonu için öğrenin — backend durumunu doğrulamak, test verisi eklemek, bütünlüğü kontrol etmek ve her SQL mülakatını geçmek için. Önceden veritabanı deneyimi gerekmez.',
}

const trTabs = ['🎯 Giriş', '📦 Kurulum', '🟢 Temeller', '🟡 Orta Seviye', '🔴 İleri Seviye', '🧪 QA Kullanım', '💼 Mülakat', '📝 Pratik & Referans']

const enHero = {
  title: '🗄️ SQL',
  subtitle: 'From Zero to Database Testing Expert',
  intro: 'Master SQL for test automation — query databases to verify backend state, seed test data, validate integrity, and pass any SQL interview. No prior database experience needed.',
}

const enTabs = ['🎯 Intro & Why', '📦 Installation', '🟢 Foundations', '🟡 Intermediate', '🔴 Advanced', '🧪 QA Use Cases', '💼 Interview Q&A', '📝 Practice & Reference']

export const sqlData = {
  en: { hero: enHero, tabs: enTabs, sections },
  tr: { hero: trHero, tabs: trTabs, sections: trSections },
}
