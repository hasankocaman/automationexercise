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
        type: 'simulation',
        scenario: 'sql-select-flow',
        icon: '🗄️',
        title: { tr: 'SQL Sorgu Yürütme Akışı (Mantıksal Sıra)', en: 'SQL Query Execution Flow (Logical Order)' },
        description: {
          tr: 'Bir SQL sorgusunun veri tabanı motoru tarafından hangi mantıksal sıra ile çalıştırıldığını (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT) canlı olarak gör.',
          en: 'Watch the logical execution order of an SQL query step-by-step in the database engine (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT).'
        },
        code: `SELECT env, COUNT(*) AS count
FROM test_results
WHERE status = 'FAIL'
GROUP BY env
ORDER BY count DESC
LIMIT 1;`,
        language: 'sql'
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
        type: 'sql-join-visual',
        defaultJoin: 'INNER',
        joinKey: [1, 0],
        leftTable: {
          name: 'bugs',
          columns: ['id', 'tester_id', 'title', 'status'],
          rows: [
            [1, 1, 'Login fails on Safari', 'OPEN'],
            [2, 2, 'Broken image', 'CLOSED'],
            [3, 99, 'API timeout', 'OPEN'],
          ],
        },
        rightTable: {
          name: 'testers',
          columns: ['id', 'name'],
          rows: [[1, 'Alice'], [2, 'Bob']],
        },
      },
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

-- If any error occurs:
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
      {
        type: 'simulation',
        scenario: 'sql-transaction-isolation',
        icon: '🔒',
        title: { tr: 'İnteraktif Transaction & İzolasyon Seviyeleri', en: 'Interactive Transaction & Isolation Levels' },
        description: {
          tr: 'Aynı anda çalışan iki farklı terminal oturumunda verilerin nasıl kilitlendiğini (Exclusive Lock) ve izolasyon seviyesine göre (Read Committed vs Repeatable Read) User A\'nın ne zaman güncel veriyi görebildiğini gör.',
          en: 'Watch how concurrent database sessions handle locks (Exclusive Lock) and see when User A can read committed changes depending on the transaction isolation level (Read Committed vs Repeatable Read).'
        },
        code: `-- Session A
BEGIN;
SELECT balance FROM accounts WHERE id = 1;

-- Session B
BEGIN;
UPDATE accounts SET balance = 800 WHERE id = 1;
COMMIT;`,
        language: 'sql'
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
      {
        type: 'feynman-checkpoint',
        promptTr: 'INNER JOIN ile LEFT JOIN arasındaki fark nedir? Bir QA mühendisi olarak bu farkı test senaryolarında nasıl kullanırsın? Sektöre yeni giren birine anlat.',
        promptEn: 'What is the difference between INNER JOIN and LEFT JOIN? As a QA engineer, how would you use this difference in test scenarios? Explain to a newcomer.',
        keywords: [['eşleşen','matching','inner'], ['null','boş'], ['sol','left','hepsi','all left'], ['kayıt','row','satır'], ['test','doğrula','verify']],
        minScore: 3,
        modelAnswerTr: 'INNER JOIN sadece her iki tabloda da eşleşen satırları döndürür. Örneğin her böcek mutlaka bir test uzmanına atanmışsa INNER JOIN kullanırsın. LEFT JOIN ise sol tablodaki tüm satırları döndürür; sağ tabloda eşleşme yoksa NULL gelir. QA açısından: henüz hiç bug\'ı olmayan test uzmanlarını bulmak için LEFT JOIN kullanırsın — çünkü INNER JOIN onları sonuçtan çıkarır.',
        modelAnswerEn: 'INNER JOIN returns only rows that match in both tables. LEFT JOIN returns ALL rows from the left table; where there is no match in the right table, NULLs are returned. As a QA engineer: use LEFT JOIN to find testers with no assigned bugs (INNER JOIN would exclude them from the result entirely — which is wrong for that use case).',
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
-- ROLLBACK; -- undo both updates if any error occurs` },
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
      18: {
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
      19: { text: 'NULL — En Yaygın SQL Hatası' },
      20: { content: "NULL, 'değer yok / bilinmiyor' anlamına gelir — sıfır değil, boş string değil. NULL ile yapılan her karşılaştırma NULL döndürür (true veya false değil). Bu durum her SQL yeni başlayanının tökezlediği noktadır." },
      21: {
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
      22: {
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
      23: { text: '☕ Java Biliyorsan: Veritabanı Erişim Köprüsü' },
      24: {
        topic: 'DB Bağlantısı (DriverManager vs sqlite3)',
        why: "Java, JDBC DriverManager ile URL + kimlik bilgileriyle bağlanır. Python, hafif sürücü modülleri kullanır (sqlite3 yerleşik, PostgreSQL için psycopg2). Bağlantı mantığı aynı — API farklı.",
        note: "Python sqlite3, Python'a yerleşik gelir — pip kurulumu gerekmez. MySQL: mysql-connector-python; PostgreSQL: psycopg2.",
      },
      25: {
        topic: 'SELECT Çalıştırma → Sonuçları Okuma',
        why: "Java, rs.next() döngüsü ve sütun adıyla getter metodlar içeren ResultSet kullanır. Python'un cursor.fetchall() metodu basit bir demet listesi döndürür — çok daha az kod.",
        note: "cursor.fetchall() tüm satırları demet listesi olarak döndürür. cursor.fetchone() bir satır ya da None döndürür — rs.next() bir kez çağırmaya eşdeğer.",
      },
      26: { text: '☕ Java Biliyorsan: DML Operasyonları Köprüsü' },
      27: {
        topic: 'INSERT → JPA persist() vs SQL INSERT INTO',
        why: "Java kurumsal projelerinde büyük ihtimalle JPA/Hibernate (EntityManager.persist) ile nesne ekliyordunuz. SQL'de INSERT INTO doğrudan yazılır. İkisi de aynı SQL'i üretir — JPA sadece bunu sizin yerinize oluşturur.",
        note: "SQL INSERT açık ve güçlüdür — toplu insert'ler ve INSERT-SELECT'in JPA'da custom query olmadan karşılığı yoktur. Test otomasyonunda hız ve sadelik için doğrudan SQL tercih edilir.",
      },
      28: {
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


// --- TABS & HERO DEFINITIONS ---

// --- TABS & HERO DEFINITIONS ---

// --- TABS & HERO DEFINITIONS ---

// --- TABS & HERO DEFINITIONS ---

// --- TABS & HERO DEFINITIONS ---
const trHero = {
  "title": "🗄️ SQL",
  "subtitle": "Sıfırdan Veritabanı Test Uzmanına",
  "intro": "SQL'i test otomasyonu için öğrenin — backend durumunu doğrulamak, test verisi eklemek, bütünlüğü kontrol etmek ve her SQL mülakatını geçmek için. Önceden veritabanı deneyimi gerekmez."
};
const enHero = {
  "title": "🗄️ SQL",
  "subtitle": "From Zero to Database Testing Expert",
  "intro": "Master SQL for test automation — query databases to verify backend state, seed test data, validate integrity, and pass any SQL interview. No prior database experience needed."
};
const enTabs = [
  "🎯 Intro & Why",
  "📦 Installation",
  "🟢 CREATE TABLE",
  "🟢 INSERT INTO",
  "🟢 SELECT & Sort",
  "🟢 UPDATE & DELETE",
  "🟢 NULL Values",
  "🟢 SQL Query Order",
  "🟡 Aggregate Functions",
  "🟡 GROUP BY & HAVING",
  "🟡 SQL JOINs",
  "🟡 Subqueries",
  "🟡 LIKE, BETWEEN, IN",
  "🔴 Window Functions",
  "🔴 CTEs",
  "🔴 Transactions",
  "🔴 Indexes & Views",
  "🔴 SQL Injection",
  "🧪 QA Use Cases",
  "🔗 Ecosystem",
  "🚨 Troubleshooting",
  "☕ Java → SQL",
  "📝 Practice & Reference",
  "💼 Interview Q&A",
  "🛠️ DBeaver"
];
const trTabs = [
  "🎯 Giriş",
  "📦 Kurulum",
  "🟢 CREATE TABLE",
  "🟢 INSERT INTO",
  "🟢 SELECT & Sıralama",
  "🟢 UPDATE & DELETE",
  "🟢 NULL Değerler",
  "🟢 SQL Sorgu Sırası",
  "🟡 Aggregate Fonksiyonlar",
  "🟡 GROUP BY & HAVING",
  "🟡 SQL JOINs",
  "🟡 Alt Sorgular",
  "🟡 LIKE, BETWEEN, IN",
  "🔴 Window Fonksiyonları",
  "🔴 CTEs",
  "🔴 Transaction Yapısı",
  "🔴 İndeks & Görünümler",
  "🔴 SQL Injection",
  "🧪 QA Kullanım",
  "🔗 Ekosistem",
  "🚨 Yaygın Hatalar",
  "☕ Java → SQL",
  "📝 Pratik & Referans",
  "💼 Mülakat",
  "🛠️ DBeaver"
];

const finalEnSections = [
  {
    "title": "🎯 What is SQL & Why Does Every QA Engineer Need It?",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🗃️",
        "content": {
          "tr": "SQL, veritabanına 'benim için şunu bul' demek gibi. Kütüphaneciye hangi kitapları istediğini söylemek gibi. Test ettiğin uygulamanın arkasında her zaman bir veritabanı vardır — SQL ile UI'nın gösterdiklerini değil, gerçekte ne olduğunu görebilirsin.",
          "en": "SQL is how you talk to a database — like telling a librarian exactly which books you want. Every app you test has a database behind it. SQL lets you see what actually happened, not just what the UI shows."
        }
      },
      {
        "type": "heading",
        "text": "What is a Database?"
      },
      {
        "type": "text",
        "content": "A database is an organized collection of structured data stored electronically. Think of it as a super-powered spreadsheet that can store millions of rows, link related data together, and answer complex questions in milliseconds. Every app you test stores its data somewhere — that somewhere is almost always a database."
      },
      {
        "type": "heading",
        "text": "What is SQL?"
      },
      {
        "type": "text",
        "content": "SQL (Structured Query Language) is the standard language for communicating with relational databases. You use it to ask questions (\"which users signed up today?\"), add data (\"create this new order\"), update records, and delete them. It's been the industry standard since the 1970s and works across MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and more."
      },
      {
        "type": "heading",
        "text": "Why QA Engineers Must Know SQL"
      },
      {
        "type": "grid",
        "cols": 3,
        "items": [
          {
            "icon": "✅",
            "label": "Verify Backend State",
            "desc": "After a UI action, query the DB to confirm data was saved correctly — not just the UI says so."
          },
          {
            "icon": "🌱",
            "label": "Seed Test Data",
            "desc": "INSERT test users, products, orders directly before tests run — no manual setup."
          },
          {
            "icon": "🧹",
            "label": "Cleanup After Tests",
            "desc": "DELETE test records after each run so the next run starts clean."
          },
          {
            "icon": "🔍",
            "label": "Backend Validation",
            "desc": "Verify business rules: order total = sum of line items, FK constraints, data integrity."
          },
          {
            "icon": "⚡",
            "label": "Faster Than UI",
            "desc": "A DB query takes milliseconds. Clicking through UI to find the same data takes minutes."
          },
          {
            "icon": "🐛",
            "label": "Find Hidden Bugs",
            "desc": "UI shows success but DB was not updated — SQL exposes the truth."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Key Database Terminology"
      },
      {
        "type": "table",
        "headers": [
          "Term",
          "Meaning",
          "Example"
        ],
        "rows": [
          [
            "Table",
            "Stores data in rows and columns (like a spreadsheet)",
            "\"users\" table with columns: id, email, age"
          ],
          [
            "Row / Record",
            "One entry in a table",
            "A single user: {id:1, email:\"alice@test.com\"}"
          ],
          [
            "Column / Field",
            "An attribute/property stored per row",
            "\"email\", \"created_at\", \"is_active\""
          ],
          [
            "Primary Key",
            "Unique identifier for each row — never NULL, never repeated",
            "\"id\" column with AUTO_INCREMENT"
          ],
          [
            "Foreign Key",
            "Column that references a PK in another table — creates a relationship",
            "\"orders.user_id\" → \"users.id\""
          ],
          [
            "Index",
            "Data structure that speeds up searches on a column",
            "INDEX on \"email\" column → fast WHERE email=?"
          ],
          [
            "Schema",
            "The blueprint of a database — all tables, columns, types, constraints",
            "CREATE TABLE definitions"
          ],
          [
            "Query",
            "A request sent to the database using SQL",
            "SELECT * FROM users WHERE age > 25"
          ]
        ]
      },
      {
        "type": "heading",
        "text": "Popular Databases Compared"
      },
      {
        "type": "table",
        "headers": [
          "Database",
          "Type",
          "Best For",
          "Free?"
        ],
        "rows": [
          [
            "MySQL",
            "Open-source",
            "Web apps, most common in industry",
            "✅ Yes"
          ],
          [
            "PostgreSQL",
            "Open-source",
            "Complex queries, JSON, enterprise apps",
            "✅ Yes"
          ],
          [
            "SQLite",
            "Embedded / serverless",
            "Local dev, testing, mobile apps",
            "✅ Yes"
          ],
          [
            "SQL Server",
            "Microsoft commercial",
            "Windows/.NET enterprise",
            "✅ Express edition"
          ],
          [
            "Oracle",
            "Commercial enterprise",
            "Large-scale banking/finance",
            "❌ Paid"
          ]
        ]
      },
      {
        "type": "tip",
        "content": "Start learning with SQLiteOnline.com — runs in your browser, zero installation. For a real environment, install DBeaver (free GUI) and connect to SQLite or MySQL."
      },
      {
        "type": "heading",
        "text": "SQL in the QA Workflow"
      },
      {
        "type": "visual",
        "variant": "boxes",
        "title": "How SQL Connects to QA Testing",
        "items": [
          {
            "icon": "🧪",
            "label": "Test Script",
            "desc": "Playwright / pytest"
          },
          {
            "arrow": true
          },
          {
            "icon": "🖥️",
            "label": "App UI/API",
            "desc": "Makes DB changes"
          },
          {
            "arrow": true
          },
          {
            "icon": "🗄️",
            "label": "Database",
            "desc": "MySQL / PostgreSQL"
          },
          {
            "arrow": true
          },
          {
            "icon": "🔍",
            "label": "SQL Query",
            "desc": "You verify here!",
            "highlight": true
          }
        ],
        "note": "After every test action, a SQL query can verify the database state was updated correctly — not just what the UI shows."
      },
      {
        "type": "visual",
        "variant": "table",
        "title": "Example: A Typical Database Table",
        "tables": [
          {
            "name": "users",
            "columns": [
              {
                "name": "id",
                "type": "INT",
                "pk": true
              },
              {
                "name": "name",
                "type": "VARCHAR"
              },
              {
                "name": "email",
                "type": "VARCHAR"
              },
              {
                "name": "role",
                "type": "VARCHAR"
              },
              {
                "name": "created_at",
                "type": "DATETIME"
              }
            ],
            "rows": [
              {
                "cells": [
                  1,
                  "Alice",
                  "alice@test.com",
                  "admin",
                  "2024-01-10"
                ]
              },
              {
                "cells": [
                  2,
                  "Bob",
                  "bob@test.com",
                  "user",
                  "2024-01-12"
                ]
              },
              {
                "cells": [
                  3,
                  "Carol",
                  "carol@test.com",
                  "user",
                  "2024-01-15"
                ],
                "highlighted": true
              }
            ]
          }
        ],
        "note": "Each row is a record. Each column is a field. id is the Primary Key — it uniquely identifies every row."
      },
      {
        "type": "quiz",
        "question": "What does SQL stand for?",
        "options": [
          "Standard Query Logic",
          "Structured Query Language",
          "Simple Question Language",
          "Sequential Query Library"
        ],
        "correct": 1,
        "explanation": "SQL = Structured Query Language. It's been the standard language for relational databases since the 1970s and is used by MySQL, PostgreSQL, SQLite, Oracle, and SQL Server.",
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Veritabanı (Database) ile SQL arasındaki farkı ve bir test otomasyon mühendisi için veritabanını doğrudan sorgulamanın neden hayati önem taşıdığını açıklayın.",
        "promptEn": "Explain the difference between a Database and SQL, and why directly querying the database is crucial for a test automation engineer.",
        "keywords": [
          [
            "database",
            "veritabanı"
          ],
          [
            "sql",
            "query",
            "sorgu"
          ],
          [
            "otomasyon",
            "automation"
          ],
          [
            "backend",
            "verileme",
            "validation"
          ],
          [
            "ui",
            "arayüz"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Veritabanı verilerin fiziksel olarak saklandığı yerdir. SQL ise bu veritabanıyla konuşmak için kullandığımız dildir. Test otomasyonunda sadece arayüze (UI) güvenmek yerine veritabanını doğrudan sorgulayarak backend durumunu ve veri bütünlüğünü kesin olarak doğrularız.",
        "modelAnswerEn": "A database is where data is physically stored, and SQL is the language used to communicate with it. In automation, querying the database directly allows us to verify backend state and data integrity, rather than relying solely on UI assertions."
      }
    ]
  },
  {
    "title": "📦 Installation",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🛠️",
        "content": {
          "tr": "SQL kurulumu, Java'da IDE kurmaya benzer — bir kere yaparsın, sonra sadece yazarsın. SQLite için sunucu bile gerekmez; tüm veritabanın tek bir dosyada durur. Online editörlerle tarayıcıdan da başlayabilirsin.",
          "en": "Setting up SQL is like installing an IDE for Java — do it once, then just write. SQLite needs no server at all; your entire database lives in a single file. You can even start with an online editor right in your browser."
        }
      },
      {
        "type": "heading",
        "text": "Option A: Zero-Install Online Editors (Start Here)"
      },
      {
        "type": "list",
        "icon": "🌐",
        "items": [
          {
            "label": "db-fiddle.com",
            "desc": "Best option. MySQL, PostgreSQL, SQLite. Schema + query split view."
          },
          {
            "label": "sqliteonline.com",
            "desc": "Runs SQLite in your browser. Upload a .db file or create tables."
          },
          {
            "label": "sqlfiddle.com",
            "desc": "Classic. Multiple DB engines. Good for sharing examples."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Option B: SQLite CLI (Lightest Local Option)"
      },
      {
        "type": "steps",
        "items": [
          "Windows: Download \"sqlite-tools-win32\" from sqlite.org/download.html and extract to C:\\sqlite\\",
          "Mac: Already installed! Run: sqlite3 —— or install via Homebrew: brew install sqlite",
          "Linux: sudo apt install sqlite3",
          "Create a database: sqlite3 mytest.db",
          "Verify: SELECT sqlite_version();"
        ]
      },
      {
        "type": "code",
        "code": "-- SQLite CLI quick reference:\nsqlite3 mytest.db        -- open or create database\n\n.tables                  -- list all tables\n.schema users            -- show CREATE TABLE for \"users\"\n.headers on              -- show column headers in output\n.mode column             -- aligned column output\n.quit                    -- exit SQLite\n\nSELECT sqlite_version();",
        "expected": "3.43.0"
      },
      {
        "type": "heading",
        "text": "Option C: MySQL Community Server"
      },
      {
        "type": "steps",
        "items": [
          "Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/ → choose \"Developer Default\"",
          "Mac: brew install mysql → brew services start mysql → mysql -u root",
          "Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root",
          "Verify installation: SELECT VERSION();"
        ]
      },
      {
        "type": "code",
        "code": "-- Connect and verify:\nmysql -u root -p          -- connect with root user (enter password)\n\nSELECT VERSION();         -- check MySQL version",
        "expected": "+-----------+\n| VERSION() |\n+-----------+\n| 8.0.35    |\n+-----------+"
      },
      {
        "type": "heading",
        "text": "Option D: DBeaver GUI (Recommended for Beginners)"
      },
      {
        "type": "text",
        "content": "DBeaver is a free universal database GUI that works with ALL databases. Much easier than the command line — you can browse tables visually and run queries with autocomplete."
      },
      {
        "type": "steps",
        "items": [
          "Download DBeaver Community from dbeaver.io (free)",
          "Install and launch DBeaver",
          "Click \"New Database Connection\" (the plug icon, top left)",
          "Select your DB type: SQLite, MySQL, or PostgreSQL",
          "SQLite: click Browse → select your .db file (or create new)",
          "MySQL/PostgreSQL: enter host, port, database name, username, password",
          "Click \"Test Connection\" — must show green \"Connected\" before Finish",
          "Open SQL Editor with Ctrl+] and start writing queries"
        ]
      },
      {
        "type": "heading",
        "text": "Using SQL in Python (for Test Automation)"
      },
      {
        "type": "code",
        "code": "# SQLite — built into Python, no install needed:\nimport sqlite3\n\nconn   = sqlite3.connect(\"test.db\")   # connect (creates file if not exists)\ncursor = conn.cursor()\n\ncursor.execute(\"SELECT * FROM users WHERE age > 25\")\nrows = cursor.fetchall()              # get all results as list of tuples\n\nfor row in rows:\n    print(row)\n\nconn.close()\n\n# PostgreSQL — install: pip install psycopg2-binary\nimport psycopg2\n\nconn = psycopg2.connect(\n    host=\"localhost\", database=\"testdb\",\n    user=\"postgres\",  password=\"mypassword\"\n)\ncursor = conn.cursor()\ncursor.execute(\"SELECT COUNT(*) FROM orders WHERE status = 'pending'\")\ncount = cursor.fetchone()[0]\nprint(f\"Pending orders: {count}\")\nconn.close()"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Yeni başlayan biri için SQL öğrenmeye en hızlı şekilde başlamak isterse hangi kurulum seçeneği önerilir?",
          "en": "Which setup option is recommended for a beginner who wants to start learning SQL as fast as possible?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Önce MySQL Community Server kurmak",
              "en": "Installing MySQL Community Server first"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Kurulum gerektirmeyen bir çevrimiçi editörle başlamak",
              "en": "Starting with an install-free online editor"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Önce bir DBeaver lisansı satın almak",
              "en": "Buying a DBeaver license first"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Önce bir cloud sunucusu kiralamak",
              "en": "Renting a cloud server first"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Kurulum gerektirmeyen çevrimiçi bir editör (örn. tarayıcı tabanlı SQLite/PostgreSQL sandbox), sıfır kurulum süresiyle SQL syntax'ını anında denemeyi sağlar. Yerel bir veritabanı sunucusu kurmak (MySQL Community Server gibi) gerçek bir projeye geçince gerekli olur ama temel SELECT/JOIN/GROUP BY öğrenirken gereksiz bir engeldir.",
          "en": "An install-free online editor (e.g. a browser-based SQLite/PostgreSQL sandbox) lets you try SQL syntax instantly with zero setup time. Installing a local database server (like MySQL Community Server) becomes necessary once you move to a real project, but it is an unnecessary barrier while learning basic SELECT/JOIN/GROUP BY."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir QA mühendisi gerçek bir projede CI pipeline'ında otomatik SQL testleri çalıştırmaya başlıyor. Bu noktada artık neden yerel bir veritabanı sunucusuna (veya en azından bir Docker container'ına) ihtiyaç duyar?",
            "en": "A QA engineer is now running automated SQL tests in a CI pipeline for a real project. Why do they now need a local database server (or at least a Docker container) instead of just a browser sandbox?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Tarayıcı sandbox'ları CI ortamlarında hiç çalışmaz ve gerçekçi bir bağlantı dizesi/test verisi/şema yönetimi gerektirir",
                "en": "Browser sandboxes don't run in CI environments at all, and a real pipeline needs a real connection string/test data/schema management"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Çevrimiçi editörler artık SQL syntax'ını desteklemiyor",
                "en": "Online editors no longer support SQL syntax"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Tarayıcı sandbox'ları sadece 10 satırdan fazla veri tutamaz",
                "en": "Browser sandboxes can only hold more than 10 rows of data"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "CI pipeline'ları SELECT sorgularını desteklemez",
                "en": "CI pipelines do not support SELECT queries"
              }
            }
          ],
          "correct": "a",
          "explanation": {
            "tr": "Tarayıcı tabanlı bir sandbox, izole, geçici, tek kullanıcılı bir oyun alanıdır — gerçek bir CI pipeline'ı ise tekrarlanabilir bir bağlantı dizesi, gerçekçi şema/migration yönetimi ve genelde bir Docker container'ında veya yönetilen bir test veritabanı instance'ında çalışan otomatik testler gerektirir. Öğrenme aşamasında sandbox yeterliyken, gerçek bir projeye geçişte bu altyapı kaçınılmaz hale gelir.",
            "en": "A browser-based sandbox is an isolated, ephemeral, single-user playground — a real CI pipeline needs a reproducible connection string, realistic schema/migration management, and automated tests that typically run against a Docker container or a managed test database instance. The sandbox is enough while learning, but this infrastructure becomes unavoidable once you move to a real project."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQLite gibi sunucusuz (serverless) bir veritabanı ile MySQL/PostgreSQL gibi istemci-sunucu veritabanları arasındaki farkı ve QA testlerinde sıfır kurulumlu araçların avantajlarını açıklayın.",
        "promptEn": "Explain the difference between a serverless database like SQLite and client-server databases like MySQL/PostgreSQL, and the advantages of zero-install tools in QA testing.",
        "keywords": [
          [
            "sqlite",
            "serverless",
            "sunucusuz"
          ],
          [
            "client-server",
            "istemci-sunucu"
          ],
          [
            "install",
            "kurulum",
            "zero-install"
          ],
          [
            "file",
            "dosya"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SQLite, tüm verileri tek bir yerel dosyada saklayan ve sunucu kurulumu gerektirmeyen (serverless) hafif bir veritabanıdır. MySQL ve PostgreSQL ise istemci-sunucu mimarisindedir. Sıfır kurulumlu araçlar, testlerin lokalde veya CI ortamında hızlıca koşturulması için büyük kolaylık sağlar.",
        "modelAnswerEn": "SQLite is a serverless database that stores data in a single local file, requiring no server installation. MySQL and PostgreSQL use a client-server architecture. Zero-install tools make local and CI test execution fast and configuration-free."
      }
    ]
  },
  {
    "title": "🟢 CREATE TABLE",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📖",
        "content": {
          "tr": "SQL komutları İngilizce cümle gibi okunur: SELECT = 'getir', FROM = 'nereden', WHERE = 'koşulsa'. Java'da bir listeyi for döngüsüyle taradın. SQL'de sadece ne istediğini tarif edersin — veritabanı nasıl bulacağını kendi bilir.",
          "en": "SQL reads like plain English: SELECT = 'give me', FROM = 'from this table', WHERE = 'only if'. In Java you'd loop through a list manually. In SQL you describe what you want and the database figures out how to find it."
        }
      },
      {
        "type": "heading",
        "text": "CREATE TABLE — Defining Structure",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "code",
        "code": "-- Create a test_results table to store automation run data:\nCREATE TABLE test_results (\n    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique ID, auto-increments\n    test_name   VARCHAR(100)  NOT NULL,                    -- text up to 100 chars, required\n    status      VARCHAR(10)   NOT NULL,                    -- 'PASS', 'FAIL', 'SKIP'\n    duration_ms INT           DEFAULT 0,                   -- test duration in milliseconds\n    run_date    DATETIME      DEFAULT CURRENT_TIMESTAMP,   -- auto-set to now\n    environment VARCHAR(20)   DEFAULT 'staging',           -- which env was tested\n    is_flaky    BOOLEAN       DEFAULT FALSE                 -- marks known flaky tests\n);\n\n-- Common SQL data types:\n-- INT / BIGINT        → whole numbers (28, 1000000)\n-- DECIMAL(10,2)       → precise decimals, e.g. prices (99.99)\n-- VARCHAR(n)          → variable text up to n characters\n-- TEXT                → unlimited text (descriptions, logs)\n-- BOOLEAN / TINYINT   → true/false\n-- DATE                → 2024-01-15\n-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "⚠️",
        "title": {
          "tr": "Temel SQL Kısıtlamaları (Constraints)",
          "en": "Key SQL Constraints"
        },
        "content": {
          "tr": "Veritabanında tabloları tanımlarken sütunlara kurallar (kısıtlamalar) ekleriz:\n\n1. **PRIMARY KEY (Birincil Anahtar)**: Her satırı **benzersiz** şekilde tanımlayan kimlik sütunudur. Aynı değerden iki tane olamaz ve asla boş (`NULL`) bırakılamaz.\n2. **AUTO_INCREMENT**: Yeni bir satır eklendiğinde bu sütunun (genellikle `id`) değerini otomatik olarak 1, 2, 3... şeklinde artırır.\n3. **NOT NULL**: Bu sütunun boş bırakılmasını yasaklar, mutlaka bir değer girilmelidir.\n4. **VARCHAR(n)**: Değişken uzunluklu metin saklar. `n` maksimum karakter sayısıdır (örn: `VARCHAR(100)` en fazla 100 karakter alabilir).\n5. **DEFAULT**: Eğer satır eklenirken o sütuna bir değer verilmezse, otomatik atanacak varsayılan değeri belirler (örn: `DEFAULT 0` veya `DEFAULT FALSE`).",
          "en": "When defining tables, we add rules (constraints) to columns to ensure data integrity:\n\n1. **PRIMARY KEY**: A column that **uniquely** identifies each row. No two rows can have the same primary key, and it can never be empty (`NULL`).\n2. **AUTO_INCREMENT**: Automatically generates a sequential number (1, 2, 3...) when a new row is inserted.\n3. **NOT NULL**: Ensures that a column cannot have a `NULL` (empty) value.\n4. **VARCHAR(n)**: Variable-length text, where `n` is the maximum character limit (e.g., `VARCHAR(100)`).\n5. **DEFAULT**: Specifies a fallback value if no value is provided during insertion (e.g., `DEFAULT 0` or `DEFAULT FALSE`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "CREATE TABLE sorgusunda PRIMARY KEY kısıtlamasının (constraint) temel amacı nedir?",
          "en": "What is the primary purpose of the PRIMARY KEY constraint in a CREATE TABLE statement?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tablonun boyutunu sınırlamak",
              "en": "To limit the table size"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Her satırı benzersiz şekilde tanımlamak ve NULL olmasını engellemek",
              "en": "To uniquely identify each row and prevent it from being NULL"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablolar arasında ilişki kurmak",
              "en": "To establish relationships between tables"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguların daha hızlı sıralanmasını sağlamak",
              "en": "To ensure queries sort faster"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "PRIMARY KEY (Birincil Anahtar), tablodaki her satırı benzersiz olarak tanımlayan kısıtlamadır. Otomatik olarak NOT NULL ve UNIQUE özelliklerine sahiptir. Tablo başına sadece bir tane tanımlanabilir.",
          "en": "A PRIMARY KEY constraint uniquely identifies each record in a database table. Primary keys must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sütun kısıtlamalarından hangisi otomatik olarak PRIMARY KEY kısıtlamasının bir parçasını oluşturur?",
            "en": "Which of the following column constraints is automatically part of a PRIMARY KEY constraint?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "DEFAULT",
                "en": "DEFAULT"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "NOT NULL ve UNIQUE",
                "en": "NOT NULL and UNIQUE"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "FOREIGN KEY",
                "en": "FOREIGN KEY"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "CHECK",
                "en": "CHECK"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Birincil Anahtar (PRIMARY KEY) olan bir sütun, aynı değerleri içeremez (UNIQUE) ve boş bırakılamaz (NOT NULL). Bu iki özellik PRIMARY KEY ile otomatik gelir.",
            "en": "A primary key column must be both unique (no duplicate values) and not null (cannot be empty). These constraints are automatically applied."
          }
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Tablodaki her satiri benzersiz tanimlayan kisitlama hangisidir?",
          "en": "Which constraint uniquely identifies every row in a table?"
        },
        "options": [
          {
            "id": "a",
            "text": "FOREIGN KEY"
          },
          {
            "id": "b",
            "text": "UNIQUE"
          },
          {
            "id": "c",
            "text": "PRIMARY KEY"
          },
          {
            "id": "d",
            "text": "NOT NULL"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "PRIMARY KEY, her satiri benzersiz tanimlar, NULL olamaz ve tekrar edemez. Her tabloda yalnizca bir tane olabilir.",
          "en": "PRIMARY KEY uniquely identifies each row, cannot be NULL, and must be unique. Only one per table is allowed."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "CREATE TABLE ifadesini ve PRIMARY KEY, FOREIGN KEY, NOT NULL gibi kısıtlamaların (constraints) tablonun güvenliği ve yapısı açısından önemini açıklayın.",
        "promptEn": "Explain the CREATE TABLE statement and the importance of constraints like PRIMARY KEY, FOREIGN KEY, and NOT NULL for database safety and structure.",
        "keywords": [
          [
            "table",
            "tablo"
          ],
          [
            "primary",
            "birincil"
          ],
          [
            "foreign",
            "yabancı"
          ],
          [
            "constraint",
            "kısıt"
          ],
          [
            "null"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "CREATE TABLE, veritabanında yeni bir tablo ve sütun yapısı kurar. Kısıtlamalar veri bütünlüğünü korur: PRIMARY KEY satırı benzersiz yapar, FOREIGN KEY tabloları ilişkilendirir, NOT NULL ise boş değer eklenmesini önler.",
        "modelAnswerEn": "CREATE TABLE defines a new table and columns. Constraints enforce data integrity: PRIMARY KEY ensures row uniqueness, FOREIGN KEY establishes relationships, and NOT NULL prevents empty fields."
      }
    ]
  },
  {
    "title": "🟢 INSERT INTO",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📝",
        "content": {
          "tr": "INSERT INTO, bir forma veri doldurmak gibi. Sütunlar var, değleri verirsin, veritabanı kaydeder. Java ArrayList.add() gibi ama kalıcı ve milyonlarca satırla çalışır.",
          "en": "INSERT INTO is like filling out a form. Provide values for the columns, database stores them permanently. Like Java ArrayList.add() — except persistent and scales to millions of rows."
        }
      },
      {
        "type": "heading",
        "text": "INSERT INTO — Adding Data",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "code",
        "code": "-- Single row insert:\nINSERT INTO test_results (test_name, status, duration_ms, environment)\nVALUES ('Login Test', 'PASS', 1234, 'staging');\n\n-- Multiple rows at once (much faster than one at a time!):\nINSERT INTO test_results (test_name, status, duration_ms) VALUES\n    ('Signup Test',    'PASS', 890),\n    ('Checkout Flow',  'FAIL', 5400),\n    ('Profile Update', 'SKIP', 0),\n    ('Password Reset', 'PASS', 1100),\n    ('Search Feature', 'FAIL', 8200);\n\n-- Copy rows from one table to another:\nINSERT INTO test_archive\nSELECT * FROM test_results WHERE run_date < '2023-01-01';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "💡",
        "title": {
          "tr": "Veri Ekleme Kuralları ve Performans",
          "en": "Data Insertion Rules and Performance"
        },
        "content": {
          "tr": "Veritabanına yeni satırlar eklerken (INSERT INTO) iki kritik noktaya dikkat etmeliyiz:\n\n1. **Sütun Belirtme Zorunluluğu (En İyi Pratik)**: `INSERT INTO users (id, name)...` şeklinde sütun isimlerini açıkça belirtmek en güvenli yoldur. Eğer belirtmezsek (`INSERT INTO users VALUES...`), ileride tabloya yeni bir sütun eklendiğinde veya sütunların sırası değiştiğinde sorgumuz hata verir.\n2. **Toplu Ekleme (Bulk Insert) Performansı**: Tek tek 1000 adet `INSERT` sorgusu çalıştırmak yerine, tek bir `INSERT INTO ... VALUES (1, \"A\"), (2, \"B\")...` sorgusuyla verileri toplu göndermek; ağ trafiğini ve transaction kilitlenme sürelerini azaltarak performansı kat kat artırır.",
          "en": "When inserting new rows (INSERT INTO), keep these two critical rules in mind:\n\n1. **Specifying Columns (Best Practice)**: Explicitly declaring column names like `INSERT INTO users (id, name)...` is the safest way. Omitting them (`INSERT INTO users VALUES...`) makes the query fragile, as it will break if a column is added or rearranged in the future.\n2. **Bulk Insert Performance**: Instead of running 1,000 individual `INSERT` statements, sending all values in a single bulk `INSERT INTO ... VALUES (1, \"A\"), (2, \"B\")...` reduces network roundtrips and transaction overhead, multiplying write speed."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Çoklu kayıt eklerken tek bir INSERT ifadesiyle birden fazla VALUES seti göndermek (bulk insert) neden tek tek eklemekten daha avantajlıdır?",
          "en": "Why is it more advantageous to send multiple VALUES sets in a single INSERT statement (bulk insert) rather than inserting them one by one?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Veritabanı şemasını otomatik güncellediği için",
              "en": "Because it automatically updates the database schema"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Ağ trafiğini ve veritabanı kilitlenme süresini azaltarak performansı kat kat artırdığı için",
              "en": "Because it multiplies performance by reducing network roundtrips and database locking overhead"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sadece 10 satırdan az verilerde çalıştığı için",
              "en": "Because it only works for data under 10 rows"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Hatalı verileri otomatik sildiği için",
              "en": "Because it automatically deletes invalid data"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Tek bir INSERT ile çoklu satır eklemek (bulk insert), veritabanına gidiş-dönüş sayısını (network roundtrip) azaltır ve transaction yönetimini hızlandırır, böylece performansı büyük ölçüde artırır.",
          "en": "Bulk inserting reduces the number of database connection roundtrips and optimizes index/transaction commits, significantly boosting write performance compared to row-by-row queries."
        },
        "retryQuestion": {
          "question": {
            "tr": "INSERT INTO users VALUES (1, \"Alice\"); sorgusu için hangi durum bir risk oluşturur?",
            "en": "What risk is associated with the query: INSERT INTO users VALUES (1, \"Alice\");?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Sorgunun yavaş çalışması",
                "en": "The query running slowly"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Sütun isimleri belirtilmediği için ileride tabloya yeni sütun eklenirse sorgunun hata vermesi",
                "en": "Since column names are omitted, the query will break if new columns are added to the table in the future"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgunun otomatik rollback yapması",
                "en": "The query automatically rolling back"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "İsimlerin tırnak içinde olması",
                "en": "Names being enclosed in quotes"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "INSERT sorgularında sütun adlarını belirtmek (örn: INSERT INTO users (id, name)...) en iyi pratiktir. Sütun adları atlandığında, şemaya sonradan eklenen her sütun bu sorgunun kırılmasına yol açar.",
            "en": "Omitting column names makes the query sensitive to schema changes. If a column is added or rearranged in the table, the query will fail with a column count mismatch."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "INSERT INTO komutunun yapısını ve otomasyon testlerimize toplu veri yüklerken (bulk insert) tek bir INSERT içinde çoklu VALUES kullanmanın performans avantajlarını açıklayın.",
        "promptEn": "Explain the structure of the INSERT INTO command and the performance benefits of using multiple VALUES sets in a single INSERT (bulk insert) when seeding test data.",
        "keywords": [
          [
            "insert",
            "values"
          ],
          [
            "bulk",
            "toplu"
          ],
          [
            "performance",
            "hız",
            "verim"
          ],
          [
            "roundtrip",
            "ağ",
            "bağlantı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INSERT INTO tabloya yeni veriler ekler. Tek tek sorgu atmak yerine tek bir INSERT altında birden fazla VALUES seti eklemek (bulk insert), veritabanı bağlantı gidiş-dönüş sayısını azaltır ve performansı büyük ölçüde artırır.",
        "modelAnswerEn": "INSERT INTO inserts new records. Instead of executing multiple individual inserts, combining them in a single query with multiple VALUES sets (bulk insert) reduces database connection overhead and network roundtrips."
      }
    ]
  },
  {
    "title": "🟢 SELECT & Sort",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔍",
        "content": {
          "tr": "SELECT, kütüphaneciye kitap sormak gibi: hangi kitapları, hangi koşulla, hangi sırayla istediğini tarif edersin. Java döngüsü yerine sadece istediğini anlatırsın — veritabanı nasıl bulacağını bilir.",
          "en": "SELECT is like asking a librarian: describe which books you want, with what conditions, in which order. Instead of writing a Java loop, you just describe what you want — the database figures out how."
        }
      },
      {
        "type": "heading",
        "text": "SELECT — Reading Data",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "code",
        "code": "-- Select all columns and all rows:\nSELECT * FROM test_results;\n\n-- Select specific columns only:\nSELECT test_name, status, duration_ms FROM test_results;\n\n-- WHERE — filter rows:\nSELECT * FROM test_results WHERE status = 'FAIL';\nSELECT * FROM test_results WHERE duration_ms > 3000;        -- slow tests\nSELECT * FROM test_results WHERE status = 'FAIL' AND duration_ms > 5000;\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- LIKE — pattern matching:\nSELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains \"Login\"\nSELECT * FROM test_results WHERE test_name LIKE 'Sign%';    -- starts with \"Sign\"\n\n-- ORDER BY — sort results:\nSELECT * FROM test_results ORDER BY duration_ms DESC;       -- slowest first\nSELECT * FROM test_results ORDER BY run_date DESC LIMIT 10; -- last 10 runs\n\n-- LIMIT + OFFSET — pagination:\nSELECT * FROM test_results LIMIT 10;            -- first 10 rows\nSELECT * FROM test_results LIMIT 10 OFFSET 20;  -- rows 21-30 (page 3)\n\n-- DISTINCT — unique values only:\nSELECT DISTINCT environment FROM test_results;",
        "expected": "+----+----------------+--------+-------------+\n| id | test_name      | status | duration_ms |\n+----+----------------+--------+-------------+\n|  3 | Checkout Flow  | FAIL   |        5400 |\n|  5 | Search Feature | FAIL   |        8200 |\n+----+----------------+--------+-------------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT, run_date TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging','2024-01-10');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging','2024-01-10');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod','2024-01-11');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod','2024-01-11');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging','2024-01-12');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging','2024-01-12');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod','2024-01-13');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging','2024-01-13');",
        "defaultCode": "-- ▶ Çalıştır ve değiştir!\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Diğerlerini dene:\n-- SELECT test_name, duration_ms FROM test_results ORDER BY duration_ms DESC;\n-- SELECT DISTINCT environment FROM test_results;\n-- SELECT * FROM test_results WHERE duration_ms > 2000 AND status = 'PASS';\n-- SELECT COUNT(*) AS total FROM test_results;"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🟢",
        "title": {
          "tr": "Veri Seçme, Sıralama ve Sınırlandırma",
          "en": "Selecting, Sorting, and Limiting Data"
        },
        "content": {
          "tr": "Veritabanından veri okurken SELECT komutunu kullanırız:\n\n- **Sütun Seçimi**: `SELECT *` tüm sütunları getirirken, performansı artırmak için sadece ihtiyacımız olan sütunları (`SELECT name, status`) seçmek en iyi pratiktir.\n- **Sıralama (ORDER BY)**: Verileri belirli bir sütuna göre artan (`ASC`, varsayılan) veya azalan (`DESC`) sırada sıralamamızı sağlar.\n- **Sınırlandırma ve Sayfalama (LIMIT & OFFSET)**: `LIMIT 10` sorgunun en fazla 10 satır döndürmesini sağlar. `OFFSET 20` ise ilk 20 satırı atlayıp sonrasını getirmek için kullanılır (örneğin sayfalama yaparken).\n- **Tekrarları Önleme (DISTINCT)**: Sütundaki tekrarlanan değerleri eleyerek sadece benzersiz değerleri listeler (örn: `SELECT DISTINCT status`).",
          "en": "We read data from the database using the SELECT statement:\n\n- **Column Selection**: While `SELECT *` retrieves all columns, it is best practice to select only the necessary columns (`SELECT name, status`) to save memory and network bandwidth.\n- **Sorting (ORDER BY)**: Sorts output rows by a column in ascending (`ASC`, default) or descending (`DESC`) order.\n- **Limiting and Paging (LIMIT & OFFSET)**: `LIMIT 10` restricts results to a maximum of 10 rows. `OFFSET 20` skips the first 20 rows before starting to return values (ideal for pagination).\n- **Uniqueness (DISTINCT)**: Filters out duplicate values from your results, returning only unique entries (e.g. `SELECT DISTINCT status`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "SELECT sorgusu sonuçlarini siralamak icin hangi clause kullanilir?",
          "en": "Which clause is used to sort SELECT query results?"
        },
        "options": [
          {
            "id": "a",
            "text": "GROUP BY"
          },
          {
            "id": "b",
            "text": "ORDER BY"
          },
          {
            "id": "c",
            "text": "SORT BY"
          },
          {
            "id": "d",
            "text": "HAVING"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "ORDER BY, sutun adi ve istege bagli ASC (artan) ya da DESC (azalan) yonuyle sonuclari siralar.",
          "en": "ORDER BY sorts results by a column name with optional ASC (ascending) or DESC (descending) direction."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "SELECT ifadesini, sütun seçimi mantığını ve ORDER BY ile sonuçların nasıl artan (ASC) veya azalan (DESC) olarak sıralanacağını açıklayın.",
        "promptEn": "Explain the SELECT statement, column projection logic, and how to sort results using ORDER BY with ASC or DESC.",
        "keywords": [
          [
            "select"
          ],
          [
            "from"
          ],
          [
            "order",
            "sıra"
          ],
          [
            "asc",
            "desc",
            "artan",
            "azalan"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SELECT sorgusu, veritabanından veri okumak için kullanılır. FROM ile hedef tablo belirtilir. ORDER BY ise belirtilen sütuna göre sonuçları varsayılan olarak artan (ASC) veya azalan (DESC) şekilde hizalar.",
        "modelAnswerEn": "The SELECT statement retrieves data from a database. FROM specifies the source table. ORDER BY sorts the output rows based on a column in either ascending (ASC) or descending (DESC) order."
      }
    ]
  },
  {
    "title": "🟢 UPDATE & DELETE",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "✏️",
        "content": {
          "tr": "UPDATE ve DELETE adres defterindeki kaydı düzeltmek ve silmek gibi. KRİTİK: WHERE koşulu olmadan UPDATE tüm satırları değiştirir, DELETE tüm kayıtları siler. Java Map.put() / Map.remove() analogu.",
          "en": "UPDATE and DELETE are like editing an address book. CRITICAL: without WHERE, UPDATE changes ALL rows, DELETE removes EVERY record. Think Java Map.put() / Map.remove() — applied to every matching row."
        }
      },
      {
        "type": "heading",
        "text": "UPDATE and DELETE",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "code",
        "code": "-- UPDATE — modify existing rows:\nUPDATE test_results SET status = 'PASS' WHERE id = 3;\nUPDATE test_results SET is_flaky = TRUE WHERE test_name = 'Search Feature';\n\n-- DELETE — remove rows:\nDELETE FROM test_results WHERE status = 'SKIP';\nDELETE FROM test_results WHERE run_date < NOW() - INTERVAL 30 DAY;\n\n-- SAFE PATTERN: always SELECT first to verify, THEN DELETE:\nSELECT * FROM test_results WHERE environment = 'test-cleanup';  -- verify\nDELETE FROM test_results WHERE environment = 'test-cleanup';    -- then delete"
      },
      {
        "type": "warning",
        "content": "ALWAYS include WHERE with UPDATE and DELETE! Without WHERE, every row in the table is affected. Run a SELECT with the same WHERE first to verify which rows will be changed."
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "⚠️",
        "title": {
          "tr": "Güvenli UPDATE ve DELETE Pratikleri",
          "en": "Safe UPDATE and DELETE Practices"
        },
        "content": {
          "tr": "Veri güncelleme (UPDATE) ve silme (DELETE) işlemleri geri alınması zor hatalara yol açabilir. Bu yüzden şu kuralları uygulamalısınız:\n\n1. **WHERE Koşulunun Önemi**: `WHERE` filtresi belirtilmeyen bir `UPDATE` veya `DELETE` sorgusu, tablodaki **tüm satırları** günceller veya siler! (örn: `DELETE FROM logs;` tablonun yapısını bozmaz ama içindeki tüm verileri temizler).\n2. **Önce SELECT ile Test Edin**: Bir veriyi silmeden veya güncellemeden önce, kullanacağınız `WHERE` koşulunu birebir bir `SELECT` sorgusunda çalıştırarak sadece silmek istediğiniz satırların geldiğini doğrulamak en güvenli QA/operasyon pratiğidir.",
          "en": "Updating (UPDATE) and deleting (DELETE) data can cause irreversible damage. Follow these safety rules:\n\n1. **The Critical WHERE Clause**: Running `UPDATE` or `DELETE` without a `WHERE` filter modifies or deletes **every single row** in the table! (e.g., `DELETE FROM logs;` empties the table completely but keeps its schema/structure).\n2. **Verify with SELECT First**: Before running an update or delete, run the exact same `WHERE` condition in a `SELECT` query first. This confirms you are targeting only the intended rows."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanında UPDATE veya DELETE işlemlerinden önce hangi adımı izlemek en güvenli test ve operasyon pratiğidir?",
          "en": "What is the safest test and operations practice before executing an UPDATE or DELETE query?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Önce her zaman bir DROP TABLE sorgusu çalıştırmak",
              "en": "Running a DROP TABLE query first"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Sorguda kullanacağınız WHERE koşulunu önce bir SELECT sorgusuyla çalıştırıp hangi satırların etkileneceğini doğrulamak",
              "en": "Running the exact WHERE clause in a SELECT query first to verify which rows will be affected"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sorguyu bir döngü (loop) içinde 10 kez çalıştırmak",
              "en": "Running the query 10 times in a loop"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Commit yapmadan önce bağlantıyı kesmek",
              "en": "Disconnecting the session before committing"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "UPDATE ve DELETE sorgularında WHERE koşulu hayati önem taşır. Yanlış bir WHERE (veya WHERE unutup çalıştırmak) tüm tablo verilerini bozabilir/silebilir. Bu yüzden önce SELECT ile koşulu doğrulamak güvenli limandır.",
          "en": "Always run a SELECT query using the same WHERE clause first. This ensures you confirm exactly which records will be modified or deleted, avoiding accidental full-table wipes."
        },
        "retryQuestion": {
          "question": {
            "tr": "`DELETE FROM logs;` sorgusu çalıştırıldığında ne olur?",
            "en": "What happens when `DELETE FROM logs;` is executed?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "logs tablosu veritabanından tamamen silinir (tablo yok olur)",
                "en": "The logs table is dropped from the database entirely"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu olmadığı için logs tablosundaki TÜM satırlar silinir, ancak tablo yapısı kalır",
                "en": "Since there is no WHERE clause, ALL rows inside logs are deleted, but the table structure remains"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgu syntax hatası verir",
                "en": "The query throws a syntax error"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sadece en son eklenen satır silinir",
                "en": "Only the last inserted row is deleted"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "WHERE koşulu içermeyen bir DELETE sorgusu tablodaki tüm verileri temizler. Tablo yapısı, sütunları ve indexleri korunur. Tabloyu tamamen yok etmek için DROP TABLE kullanılmalıdır.",
            "en": "A DELETE statement without a WHERE clause removes all rows from the table. The table schema itself remains intact. To delete the table structure as well, use DROP TABLE."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "UPDATE ve DELETE işlemlerinde WHERE koşulu kullanılmadığında ne olacağını ve bu tehlikeyi önlemek için test aşamasında hangi adımları izlediğinizi açıklayın.",
        "promptEn": "Explain what happens when a WHERE clause is omitted in UPDATE and DELETE statements, and the steps you take during testing to avoid this risk.",
        "keywords": [
          [
            "update",
            "delete",
            "güncelle",
            "sil"
          ],
          [
            "where",
            "koşul"
          ],
          [
            "select",
            "seç"
          ],
          [
            "verify",
            "doğrula"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "WHERE koşulu unutulduğunda UPDATE veya DELETE komutları tablodaki TÜM satırları günceller veya siler. Güvenli operasyon için, bu işlemleri çalıştırmadan önce aynı WHERE koşulunu SELECT sorgusuyla çalıştırıp etkilenen satırları doğrulamalıyız.",
        "modelAnswerEn": "Without a WHERE clause, UPDATE and DELETE modify or remove every row in a table. To prevent this, always test the exact WHERE clause in a SELECT query first to confirm which records will be affected."
      }
    ]
  },
  {
    "title": "🟢 NULL Values",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "❓",
        "content": {
          "tr": "NULL, formda boş bırakılan alan gibi — bilinmiyor veya girilmedi anlamında. 0 veya boş string değil! Java null referans gibi. SQL farkı: NULL == NULL YANLIŞTIR, IS NULL kullanmalısın.",
          "en": "NULL is like a blank field on a form — unknown or not entered. NOT zero or empty string! Like Java null. SQL difference: NULL == NULL is FALSE — you must use IS NULL."
        }
      },
      {
        "type": "heading",
        "text": "NULL Values",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "code",
        "code": "-- NULL means \"no value / unknown\" — NOT the same as 0 or empty string!\n-- You CANNOT use = to check for NULL — it always returns false:\n\nSELECT * FROM test_results WHERE error_msg IS NULL;      -- correct\nSELECT * FROM test_results WHERE error_msg IS NOT NULL;  -- has an error\n-- SELECT * WHERE error_msg = NULL;   WRONG — always returns 0 rows!\n\n-- COALESCE: return first non-NULL value:\nSELECT test_name,\n       COALESCE(error_msg, 'No error') AS error_display\nFROM test_results;\n\n-- NULLIF: return NULL if two values are equal (avoid division by zero!):\nSELECT test_name, NULLIF(duration_ms, 0) AS duration\nFROM test_results;"
      },
      {
        "type": "heading",
        "text": "Interactive Example: test_results Table",
        "difficulty": "🟢 Beginner"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');",
        "defaultCode": "-- Tablo hazır! Sorguları dene:\nSELECT * FROM test_results ORDER BY duration_ms DESC;\n\n-- Diğerlerini dene:\n-- SELECT * FROM test_results WHERE status = 'FAIL';\n-- SELECT COUNT(*) AS total, status FROM test_results GROUP BY status ORDER BY total DESC;\n-- SELECT test_name, duration_ms FROM test_results WHERE duration_ms > 1000;"
      },
      {
        "type": "heading",
        "text": "NULL — The Most Common SQL Mistake"
      },
      {
        "type": "text",
        "content": "NULL means \"no value / unknown\" — it is NOT zero, it is NOT an empty string. Any comparison with NULL returns NULL (not true/false). This trips up every SQL beginner."
      },
      {
        "type": "comparison",
        "left": {
          "label": "❌ Wrong — = NULL never works",
          "code": "SELECT * FROM users WHERE email = NULL;\n-- Returns 0 rows EVERY TIME!\n-- Even if NULL values exist.\n-- Why? NULL = NULL → NULL (not true)",
          "note": "Never use = or != to check for NULL"
        },
        "right": {
          "label": "✅ Correct — IS NULL / IS NOT NULL",
          "code": "SELECT * FROM users WHERE email IS NULL;\nSELECT * FROM users WHERE email IS NOT NULL;\n-- COALESCE: replace NULL with a default:\nSELECT name, COALESCE(email, 'no email') FROM users;",
          "note": "IS NULL and IS NOT NULL always work correctly"
        }
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🟢",
        "title": {
          "tr": "NULL Değerler ve İşleme Fonksiyonları",
          "en": "NULL Values and Fallback Functions"
        },
        "content": {
          "tr": "NULL, veritabanında \"veri yok\" veya \"bilinmiyor\" anlamına gelir. Sıfır (0) veya boş string ('') ile aynı şey değildir:\n\n- **Eşleşme Sorguları**: NULL değerler `=` veya `!=` ile sorgulanamaz (örn: `status = NULL` sıfır satır döndürür). Bunun yerine `IS NULL` veya `IS NOT NULL` ifadeleri kullanılmalıdır.\n- **COALESCE(sütun, varsayılan)**: Sütundaki değer NULL ise, onun yerine geçecek varsayılan bir değer tanımlamamızı sağlar (örn: `COALESCE(environment, \"local\")`).\n- **NULLIF(değer1, değer2)**: İki değer birbirine eşitse `NULL` döndürür. En yaygın kullanım amacı sıfıra bölme (division by zero) hatalarını engellemektir (örn: `NULLIF(total_runs, 0)`).",
          "en": "NULL represents missing or unknown data in a database. It is not equivalent to zero (0) or an empty string (''):\n\n- **Matching Queries**: You cannot test for NULL using regular equality operators like `=` or `!=` (e.g., `status = NULL` will fail). You must use `IS NULL` or `IS NOT NULL`.\n- **COALESCE(column, fallback)**: Returns the first non-NULL value in its arguments. Useful for providing fallback defaults (e.g., `COALESCE(environment, \"local\")`).\n- **NULLIF(val1, val2)**: Returns `NULL` if the two arguments are equal. Frequently used to prevent crash-inducing division-by-zero errors (e.g. `NULLIF(total_runs, 0)`)."
        }
      },
      {
        "type": "quiz",
        "question": "A query returns 0 rows when you filter: WHERE discount = NULL. Why?",
        "options": [
          "There are no NULL discounts in the table",
          "NULL comparisons with = always return NULL (not TRUE), so no rows match",
          "You need quotes: WHERE discount = \"NULL\"",
          "NULL is automatically converted to 0"
        ],
        "correct": 1,
        "explanation": "Any comparison with NULL using = or != returns NULL, which is treated as FALSE. Use IS NULL or IS NOT NULL instead. This is one of the most common SQL bugs.",
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL'de NULL değerinin ne anlama geldiğini, normal veri tiplerinden farkını ve neden = NULL yerine IS NULL kullanmamız gerektiğini açıklayın.",
        "promptEn": "Explain what NULL represents in SQL, its difference from regular values, and why you must use IS NULL instead of = NULL.",
        "keywords": [
          [
            "null",
            "boş"
          ],
          [
            "is null"
          ],
          [
            "is not null"
          ],
          [
            "comparison",
            "karşılaştırma",
            "eşittir"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "NULL, veri tabanında \"değer olmaması\" veya \"bilinmeyen\" anlamına gelir. NULL bir değer olmadığından = veya != gibi karşılaştırma operatörleriyle sınanamaz. NULL denetimi için IS NULL veya IS NOT NULL kullanılmalıdır.",
        "modelAnswerEn": "NULL represents a missing or unknown value. Since NULL is not a concrete value, standard comparison operators like = or != evaluate to UNKNOWN. To check for NULL, you must use IS NULL or IS NOT NULL."
      }
    ]
  },
  {
    "title": "🟢 SQL Query Order",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📋",
        "content": {
          "tr": "Yazdığın sıra ile çalıştığı sıra farklıdır. Yemek tarifi gibi: önce malzeme topla (FROM), ele (WHERE), grupla (GROUP BY), grupları filtrele (HAVING), son adımda seç (SELECT). Bu yüzden SELECT alias’ını WHERE’de kullanamazsın.",
          "en": "Write order differs from execution order. Like a recipe: gather ingredients (FROM), filter (WHERE), group (GROUP BY), filter groups (HAVING), finally select (SELECT). That's why a SELECT alias can't be used in WHERE."
        }
      },
      {
        "type": "heading",
        "text": "SQL Query Execution Order — The Secret Most Beginners Miss"
      },
      {
        "type": "text",
        "content": "SQL does NOT execute top-to-bottom like regular code. It follows a specific internal order. This is WHY you can't use SELECT aliases in WHERE, and WHY aggregate functions go in HAVING not WHERE."
      },
      {
        "type": "visual",
        "variant": "flow",
        "title": "SQL Clause Evaluation Order (Step by Step)",
        "note": "You write SELECT at the top, but it executes almost LAST. This is why aliases defined in SELECT aren't available in WHERE!",
        "steps": [
          {
            "num": "1",
            "label": "FROM",
            "desc": "Load tables"
          },
          {
            "num": "2",
            "label": "JOIN",
            "desc": "Combine"
          },
          {
            "num": "3",
            "label": "WHERE",
            "desc": "Filter rows",
            "highlight": true
          },
          {
            "num": "4",
            "label": "GROUP BY",
            "desc": "Group"
          },
          {
            "num": "5",
            "label": "HAVING",
            "desc": "Filter groups",
            "highlight": true
          },
          {
            "num": "6",
            "label": "SELECT",
            "desc": "Pick columns"
          },
          {
            "num": "7",
            "label": "ORDER BY",
            "desc": "Sort"
          },
          {
            "num": "8",
            "label": "LIMIT",
            "desc": "Slice"
          }
        ]
      },
      {
        "type": "simulation",
        "scenario": "sql-select-flow",
        "icon": "🗄️",
        "title": {
          "tr": "SQL Sorgu Yürütme Akışı (Mantıksal Sıra)",
          "en": "SQL Query Execution Flow (Logical Order)"
        },
        "description": {
          "tr": "Bir SQL sorgusunun veri tabanı motoru tarafından hangi mantıksal sıra ile çalıştırıldığını (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT) canlı olarak gör.",
          "en": "Watch the logical execution order of an SQL query step-by-step in the database engine (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT)."
        },
        "code": "SELECT env, COUNT(*) AS count\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nORDER BY count DESC\nLIMIT 1;",
        "language": "sql"
      },
      {
        "type": "visual",
        "variant": "table",
        "title": "Our Sample Data — test_results Table",
        "tables": [
          {
            "name": "test_results",
            "columns": [
              {
                "name": "id",
                "type": "INT",
                "pk": true
              },
              {
                "name": "test_name",
                "type": "VARCHAR"
              },
              {
                "name": "status",
                "type": "VARCHAR"
              },
              {
                "name": "duration_ms",
                "type": "INT"
              },
              {
                "name": "environment",
                "type": "VARCHAR"
              }
            ],
            "rows": [
              {
                "cells": [
                  1,
                  "Login Test",
                  "PASS",
                  1200,
                  "staging"
                ]
              },
              {
                "cells": [
                  2,
                  "Checkout Flow",
                  "FAIL",
                  5400,
                  "staging"
                ],
                "highlighted": true
              },
              {
                "cells": [
                  3,
                  "Signup Test",
                  "PASS",
                  890,
                  "prod"
                ]
              },
              {
                "cells": [
                  4,
                  "Profile Update",
                  "FAIL",
                  3100,
                  "prod"
                ],
                "highlighted": true
              },
              {
                "cells": [
                  5,
                  "Search Feature",
                  "PASS",
                  2200,
                  "staging"
                ]
              },
              {
                "cells": [
                  6,
                  "Logout Test",
                  "SKIP",
                  0,
                  "staging"
                ]
              }
            ]
          }
        ],
        "note": "Highlighted rows = FAIL status. Try: SELECT * FROM test_results WHERE status = 'FAIL' → returns rows 2 and 4."
      },
      {
        "type": "callout",
        "color": "purple",
        "emoji": "🔄",
        "title": {
          "tr": "SQL Sorgularının Mantıksal Çalışma Sırası",
          "en": "Logical SQL Query Execution Order"
        },
        "content": {
          "tr": "SQL yazarken kodumuz yukarıdan aşağıya (SELECT, FROM, WHERE...) okunur; fakat veritabanı motoru sorguyu bu sırayla çalıştırmaz. Mantıksal çalışma sırası şöyledir:\n\n**FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT**\n\n- **WHERE neden SELECT'ten önce çalışır?** Veritabanı motorunun önce hangi satırlarla çalışacağını (WHERE) belirlemesi gerekir. Sütun seçimi ve takma ad (alias) tanımlama (SELECT) ise daha sonra gerçekleşir.\n- **Alias Kırılması**: SELECT aşamasında tanımladığınız bir takma ad (örn: `SELECT name AS user_name`), WHERE aşamasında kullanılamaz! Çünkü WHERE çalışırken henüz SELECT aşamasına gelinmemiştir ve takma ad henüz tanımlanmamıştır.",
          "en": "In SQL, queries are written in a specific visual order (SELECT, FROM, WHERE...), but the database engine executes them in a different logical order:\n\n**FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT**\n\n- **Why WHERE runs before SELECT**: The engine must first filter the source rows (WHERE) before deciding which columns or computed fields to output (SELECT).\n- **Alias Limitation**: Because WHERE executes before SELECT, aliases defined in the SELECT clause (e.g. `SELECT name AS user_name`) are not recognized in the WHERE clause yet. You must filter using raw column names."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanı motorunun mantıksal sorgu çalışma sırasında SELECT aşaması neden WHERE aşamasından SONRA çalışır?",
          "en": "Why does the SELECT clause execute AFTER the WHERE clause in the logical query processing order?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "SELECT sorgunun en üstünde yazıldığı için",
              "en": "Because SELECT is written at the top of the query"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Önce satırların filtrelenmesi (WHERE) gerekir ki SELECT sadece filtrelenmiş verileri projeksiyon (sütun seçimi) yapabilsin",
              "en": "Because rows must be filtered first (WHERE) so SELECT only processes and projects the qualified rows"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Veritabanı motoru SELECT aşamasını tamamen atlar",
              "en": "Because the database engine skips SELECT entirely"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "WHERE sorgunun en altında yazıldığı için",
              "en": "Because WHERE is written at the bottom of the query"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Mantıksal çalışma sırası FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT şeklindedir. Veritabanı motoru önce hangi satırlarla çalışacağını seçer (WHERE), ardından bu satırların hangi sütunlarını göstereceğini belirler (SELECT).",
          "en": "The logical evaluation order starts with FROM, then filters rows with WHERE. SELECT executes near the end because the database must first isolate which rows qualify before deciding which columns/expressions to output."
        },
        "retryQuestion": {
          "question": {
            "tr": "`SELECT name AS user_name FROM users WHERE user_name = \"Alice\";` sorgusu neden hata verir?",
            "en": "Why does the query: `SELECT name AS user_name FROM users WHERE user_name = \"Alice\";` throw an error?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "user_name çift tırnak içinde olduğu için",
                "en": "Because user_name is enclosed in double quotes"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE adımı SELECT'ten önce çalıştığı için SELECT'te tanımlanan takma ad (user_name) WHERE tarafından henüz bilinmez",
                "en": "Because WHERE executes before SELECT, so the alias (user_name) is not yet defined or known during the WHERE stage"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "name sütunu tabloda bulunmadığı için",
                "en": "Because name column does not exist in the table"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "WHERE ifadesi AS kelimesini desteklemediği için",
                "en": "Because WHERE does not support the AS keyword"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Mantıksal sıralamada WHERE adımı SELECT'ten önce değerlendirilir. SELECT çalışmadan önce alias (takma ad) oluşturulmadığı için WHERE adımında `user_name` şeklinde bir alias kullanılamaz. Bunun yerine gerçek sütun adı kullanılmalıdır.",
            "en": "Since WHERE is evaluated before SELECT, aliases defined in the SELECT list (like user_name) are not yet available when filtering rows. You must use the raw column name `WHERE name = \"Alice\"` instead."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL sorgularının yazım sırası ile mantıksal çalışma sırası (logical query processing) arasındaki farkı anlatarak SELECT takma adlarının (alias) neden WHERE içinde kullanılamadığını açıklayın.",
        "promptEn": "Explain the difference between SQL written order and logical query processing order, explaining why SELECT aliases cannot be used in a WHERE clause.",
        "keywords": [
          [
            "from",
            "where"
          ],
          [
            "select"
          ],
          [
            "alias",
            "takma"
          ],
          [
            "order",
            "sıra",
            "çalışma"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Sorgu yazarken SELECT ile başlarız ancak veritabanı motoru mantıksal olarak FROM ve WHERE adımlarını SELECT'ten önce çalıştırır. SELECT adımı henüz çalışmadığı için, orada tanımlanan sütun takma adları (alias) WHERE içinde kullanılamaz.",
        "modelAnswerEn": "Although queries start with SELECT, the engine evaluates FROM and WHERE steps prior to SELECT. Because aliases are defined during the SELECT phase, they are not yet known or available during the execution of the WHERE clause."
      }
    ]
  },
  {
    "title": "🟡 Aggregate Functions",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": {
          "tr": "JOIN, iki tabloyu ortak bir sütuna göre birleştirmek — iki Excel dosyasını müşteri numarasına göre yan yana koymak gibi. Java'da bunu iki liste üzerinde iç içe for döngüsüyle yapardın. SQL'de tek satırda JOIN yazarsın.",
          "en": "JOIN means connecting two tables on a shared column — like merging two Excel sheets by customer ID. In Java you'd use nested for loops over two lists. In SQL you write JOIN in one line and the database does the rest."
        }
      },
      {
        "type": "heading",
        "text": "Aggregate Functions",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "code",
        "code": "-- Aggregate functions summarize multiple rows into one value:\nSELECT COUNT(*)                 AS total_tests    FROM test_results;\nSELECT COUNT(*) FILTER (WHERE status='PASS') AS passed FROM test_results;  -- PostgreSQL\nSELECT SUM(duration_ms)         AS total_ms       FROM test_results;\nSELECT AVG(duration_ms)         AS avg_ms         FROM test_results;\nSELECT MIN(duration_ms)         AS fastest_ms     FROM test_results;\nSELECT MAX(duration_ms)         AS slowest_ms     FROM test_results;\n\n-- Round decimals:\nSELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;",
        "expected": "+-------------+\n| total_tests |\n+-------------+\n|           6 |\n+-------------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- Aggregate functions — çalıştır!\nSELECT COUNT(*) AS total_tests FROM test_results;\n\n-- Diğerlerini dene:\n-- SELECT SUM(duration_ms) AS total_ms FROM test_results;\n-- SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;\n-- SELECT MIN(duration_ms) AS fastest, MAX(duration_ms) AS slowest FROM test_results;\n-- SELECT COUNT(*) AS failed FROM test_results WHERE status = 'FAIL';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "📊",
        "title": {
          "tr": "Aggregate Fonksiyonları ve GROUP BY Kuralı",
          "en": "Aggregate Functions and the GROUP BY Rule"
        },
        "content": {
          "tr": "Verileri özetlemek için aggregate fonksiyonlarını (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) kullanırız:\n\n1. **GROUP BY Olmadan Kullanım**: Eğer bu fonksiyonları herhangi bir gruplama yapmadan doğrudan çağırırsanız (örn: `SELECT COUNT(*) FROM test_results;`), veritabanı tüm tabloyu tek bir grup kabul eder ve özet içeren tek satırlık bir sonuç döndürür.\n2. **GROUP BY Zorunluluğu**: Bir `SELECT` sorgusunda hem normal bir sütun (örn: `status`) hem de özet bir fonksiyon (örn: `COUNT(*)`) varsa, o normal sütun mutlaka `GROUP BY status` şeklinde belirtilmelidir. Aksi takdirde motor, her satırdaki farklı status değerlerini tek satırlık özetle nasıl eşleştireceğini bilemez ve standart SQL'de hata verir.",
          "en": "Aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) collapse multiple rows of data into a summary:\n\n1. **Usage Without GROUP BY**: If used alone (e.g., `SELECT COUNT(*) FROM test_results;`), the engine treats the entire table as a single massive partition and outputs exactly one summary row.\n2. **The GROUP BY Rule**: If you select a non-aggregated column alongside an aggregate function (e.g., `SELECT status, COUNT(*)`), you must list that column in a `GROUP BY` clause. Otherwise, standard SQL throws an error because it cannot display individual rows alongside summarized values."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Aggregate fonksiyonları (COUNT, SUM, AVG) GROUP BY olmadan kullanıldığında veritabanı motoru nasıl davranır?",
          "en": "How does the database engine behave when aggregate functions (COUNT, SUM, AVG) are used without a GROUP BY clause?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Hata verir ve sorguyu çalıştırmaz",
              "en": "It throws an error and rejects the query"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Tüm tabloyu tek bir grup olarak ele alır ve tek satırlık bir özet sonuç döndürür",
              "en": "It treats the entire table as a single group and returns a single summary row"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablodaki tüm satırları aynen listeler",
              "en": "It lists all rows in the table individually"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sadece ilk satırın verilerini getirir",
              "en": "It only returns the values of the first row"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "GROUP BY belirtilmediğinde aggregate fonksiyonlar tablodaki tüm satırları tek bir dev grup olarak görür. `SELECT COUNT(*) FROM users;` sorgusunun tüm tablo için tek bir sayı döndürmesi bundandır.",
          "en": "Without a GROUP BY clause, aggregate functions aggregate across the entire set of matching rows as a single partition, outputting exactly one row containing the result."
        },
        "retryQuestion": {
          "question": {
            "tr": "`SELECT status, COUNT(*) FROM test_results;` sorgusu neden standart SQL'de hata verir?",
            "en": "Why does the query: `SELECT status, COUNT(*) FROM test_results;` throw an error in standard SQL?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "status sütununun veri tipi uyuşmadığı için",
                "en": "Because the data type of the status column is incompatible"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "status sütununa göre GROUP BY yapılmadığı için veritabanı motoru status değerlerini hangi grup satırıyla eşleştireceğini bilemez",
                "en": "Because status is not in a GROUP BY clause, so the engine cannot associate individual status values with the single aggregated row count"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "test_results tablosu boş olduğu için",
                "en": "Because the test_results table is empty"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "COUNT(*) fonksiyonu SELECT ile birlikte kullanılamayacağı için",
                "en": "Because COUNT(*) cannot be used with SELECT"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir SELECT sorgusunda hem normal bir sütun (status) hem de bir aggregate fonksiyonu (COUNT) varsa, o normal sütun mutlaka GROUP BY içinde yer almalıdır. Aksi halde veritabanı satırları tek bir hücreye sığdıramaz.",
            "en": "In standard SQL, you cannot select a non-aggregated column alongside an aggregate unless that column is declared in the GROUP BY clause. Otherwise, the engine does not know which row's status to display."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "COUNT, SUM ve AVG gibi aggregate fonksiyonlarının çalışma mantığını ve GROUP BY ifadesiyle birlikte kullanıldıklarında sonuç kümesini nasıl etkilediklerini açıklayın.",
        "promptEn": "Explain how aggregate functions (COUNT, SUM, AVG) work and how using them with GROUP BY affects the final result set.",
        "keywords": [
          [
            "aggregate",
            "fonksiyon"
          ],
          [
            "group by",
            "grupla"
          ],
          [
            "count",
            "sum",
            "avg"
          ],
          [
            "collapse",
            "satır",
            "tek"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Aggregate fonksiyonları çoklu satırları tek bir özet değere dönüştürür. GROUP BY olmadan kullanıldıklarında tüm tabloyu tek bir grup sayıp tek satır dönerler. GROUP BY eklendiğinde ise veriyi kategorize edip her grup için ayrı özet satırı üretirler.",
        "modelAnswerEn": "Aggregate functions process multiple rows to compute a single summary value. Without GROUP BY, they aggregate the entire table into a single row. With GROUP BY, they compute a separate summary row for each distinct group."
      }
    ]
  },
  {
    "title": "🟡 GROUP BY & HAVING",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📊",
        "content": {
          "tr": "GROUP BY, sınıflara göre not ortalaması almak gibi. Öğrencileri sınıfa göre yığ, her yığın için COUNT/AVG/SUM hesapla. HAVING bu yığınları sonradan filtreler. Java Streams .groupingBy() tam karşılığı.",
          "en": "GROUP BY is like calculating averages per class. Pile rows by group, compute COUNT/AVG/SUM per pile. HAVING filters those piles afterward. Direct equivalent of Java Streams .groupingBy()."
        }
      },
      {
        "type": "heading",
        "text": "GROUP BY and HAVING",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "text",
        "content": "GROUP BY groups rows with the same value in a column. HAVING filters those groups (like WHERE but for aggregate results). You CANNOT use COUNT/SUM/etc. in a WHERE clause — use HAVING instead."
      },
      {
        "type": "code",
        "code": "-- Count tests by status:\nSELECT status, COUNT(*) AS count\nFROM test_results\nGROUP BY status\nORDER BY count DESC;\n\n-- Average duration per environment (only envs with > 3 tests):\nSELECT environment,\n       COUNT(*)            AS total,\n       ROUND(AVG(duration_ms), 0) AS avg_ms\nFROM test_results\nGROUP BY environment\nHAVING COUNT(*) > 3          -- HAVING filters groups (not rows!)\nORDER BY avg_ms DESC;\n\n-- WHERE (filter before grouping) + HAVING (filter after):\nSELECT test_name, COUNT(*) AS run_count\nFROM test_results\nWHERE status = 'FAIL'        -- only FAIL rows\nGROUP BY test_name\nHAVING COUNT(*) > 2;         -- tests that failed more than 2 times",
        "expected": "+--------+-------+\n| status | count |\n+--------+-------+\n| PASS   |     3 |\n| FAIL   |     2 |\n| SKIP   |     1 |\n+--------+-------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- GROUP BY — statusa göre say\nSELECT status, COUNT(*) AS count\nFROM test_results\nGROUP BY status\nORDER BY count DESC;\n\n-- Diğerlerini dene:\n-- SELECT environment, ROUND(AVG(duration_ms),0) AS avg_ms FROM test_results GROUP BY environment;\n-- SELECT test_name, COUNT(*) AS runs FROM test_results GROUP BY test_name HAVING COUNT(*) > 1;"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "Veri Gruplama ve HAVING Filtresi",
          "en": "Data Grouping and the HAVING Filter"
        },
        "content": {
          "tr": "GROUP BY ve HAVING, verileri özet gruplara bölmek ve filtrelemek için kullanılır:\n\n- **Gruplama (GROUP BY)**: Belirli bir sütundaki aynı değerlere sahip satırları bir araya getirir (örn: her ortamdaki test sayılarını bulmak için `GROUP BY environment`).\n- **Grup Filtreleme (HAVING)**: Gruplanmış verileri filtrelemek için kullanılır. **WHERE satırları filtrelerken, HAVING gruplanmış sonuçları filtreler.** WHERE aggregate fonksiyonları (`COUNT`, `SUM` vb.) içeremezken, HAVING içinde bu fonksiyonlar üzerinden filtreleme yapabiliriz (örn: `HAVING COUNT(*) > 5`).",
          "en": "GROUP BY and HAVING are used to organize rows into summary groups and filter the results:\n\n- **Grouping (GROUP BY)**: Gathers rows that share the same values in specified columns (e.g., group test runs by their environment: `GROUP BY environment`).\n- **Group Filtering (HAVING)**: Evaluates conditions on groups of rows. **WHERE filters source rows before grouping, while HAVING filters the groups themselves.** Unlike WHERE, HAVING allows aggregate functions in its conditions (e.g. `HAVING COUNT(*) > 5`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "GROUP BY ile birlikte gruplanmis sonuclari filtreleyen clause hangisidir?",
          "en": "Which clause filters grouped results when used with GROUP BY?"
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
            "text": "FILTER"
          },
          {
            "id": "d",
            "text": "ORDER BY"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "HAVING, aggregate fonksiyon sonuclarini (COUNT, SUM vb.) filtreler. WHERE ise satirlari gruplamadan once filtreler.",
          "en": "HAVING filters aggregate results (COUNT, SUM etc.). WHERE filters individual rows before grouping — you cannot use COUNT(*) in a WHERE clause."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "GROUP BY kullanılan bir sorguda WHERE ile HAVING arasındaki farkı açıklayarak aggregate fonksiyonların hangi kısıtlamada filtrelenebileceğini belirtin.",
        "promptEn": "Explain the difference between WHERE and HAVING in a GROUP BY query, specifying where aggregate functions can be filtered.",
        "keywords": [
          [
            "where"
          ],
          [
            "having"
          ],
          [
            "group by",
            "gruplama"
          ],
          [
            "filter",
            "filtre"
          ],
          [
            "aggregate",
            "toplam"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "WHERE, gruplama yapılmadan önce tek tek satırları filtreler ve aggregate fonksiyon içeremez. HAVING ise GROUP BY çalıştıktan sonra gruplanmış sonuçları filtreler ve aggregate fonksiyon sonuçları üzerinde filtreleme yapabilir.",
        "modelAnswerEn": "WHERE filters raw rows before any grouping is performed and cannot filter aggregates. HAVING filters grouped rows after GROUP BY evaluates, allowing conditions on aggregate function results."
      }
    ]
  },
  {
    "title": "🟡 SQL JOINs",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": {
          "tr": "JOIN, iki listeyi ortak alana göre birleştirmek gibi. Öğrenci listesi + not listesi → öğrenci_id üzerinden birleşir. INNER JOIN sadece eşleşenleri getirir. LEFT JOIN sol tablonun tamamını korur, sağ tarafta eşleşme yoksa NULL koyar.",
          "en": "JOIN merges two lists by a common field. Student list + grade list joined on student_id. INNER JOIN returns only matching rows. LEFT JOIN keeps all rows from the left table — unmatched right side becomes NULL."
        }
      },
      {
        "type": "heading",
        "text": "JOINs — Combining Tables",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "text",
        "content": "JOINs let you query data from multiple related tables in one go. Essential for any real-world database where data is split across tables."
      },
      {
        "type": "sql-join-visual",
        "defaultJoin": "INNER",
        "joinKey": [
          1,
          0
        ],
        "leftTable": {
          "name": "bugs",
          "columns": [
            "id",
            "tester_id",
            "title",
            "status"
          ],
          "rows": [
            [
              1,
              1,
              "Login fails on Safari",
              "OPEN"
            ],
            [
              2,
              2,
              "Broken image",
              "CLOSED"
            ],
            [
              3,
              99,
              "API timeout",
              "OPEN"
            ]
          ]
        },
        "rightTable": {
          "name": "testers",
          "columns": [
            "id",
            "name"
          ],
          "rows": [
            [
              1,
              "Alice"
            ],
            [
              2,
              "Bob"
            ]
          ]
        }
      },
      {
        "type": "code",
        "code": "-- Our tables:\n-- testers:  id, name, email\n-- bugs:     id, title, status, tester_id (FK → testers.id), project_id (FK → projects.id)\n-- projects: id, name, deadline\n\n-- INNER JOIN: only rows matching in BOTH tables\nSELECT t.name AS tester, b.title AS bug, b.status\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id;\n-- Rows with no matching tester OR no matching bug are EXCLUDED\n\n-- LEFT JOIN: ALL rows from left table + matching from right (NULL if no match)\nSELECT t.name, COUNT(b.id) AS assigned_bugs\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;\n-- Testers with 0 bugs still appear (assigned_bugs = 0)\n\n-- RIGHT JOIN: ALL rows from right table + matching from left\n-- (rarely used — usually rewrite as LEFT JOIN with tables swapped)\n\n-- Multi-table JOIN:\nSELECT t.name AS tester, p.name AS project, b.title AS bug, b.status\nFROM testers t\nJOIN bugs b      ON t.id = b.tester_id\nJOIN projects p  ON b.project_id = p.id\nWHERE b.status = 'OPEN'\nORDER BY p.name, t.name;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice','alice@qa.com'),(2,'Bob','bob@qa.com'),(3,'Carol','carol@qa.com');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- INNER JOIN: testers ve bug'lar birleştir\nSELECT t.name AS tester, b.title AS bug, b.status\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id;\n\n-- Diğerlerini dene:\n-- SELECT t.name, COUNT(b.id) AS assigned_bugs FROM testers t LEFT JOIN bugs b ON t.id=b.tester_id GROUP BY t.id,t.name;\n-- SELECT t.name, p.name AS project, b.title FROM testers t JOIN bugs b ON t.id=b.tester_id JOIN projects p ON b.project_id=p.id WHERE b.status='OPEN';"
      },
      {
        "type": "heading",
        "text": "Visual JOIN Guide — See Exactly Which Rows Are Returned"
      },
      {
        "type": "text",
        "content": "The 4 diagrams below use the same data. Click \"Eşleşmeleri Göster\" to highlight matched rows, then \"Sonucu Göster\" to see the query result. This is the fastest way to truly understand JOINs."
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "INNER JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_title",
          "status"
        ],
        "resultRows": [
          [
            "Alice",
            "Login fails on Safari",
            "OPEN"
          ],
          [
            "Alice",
            "Broken image on profile",
            "CLOSED"
          ],
          [
            "Bob",
            "API timeout on checkout",
            "OPEN"
          ]
        ],
        "explanation": "INNER JOIN returns ONLY rows that match in BOTH tables. Carol has no bugs — she is completely excluded from the result."
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "LEFT JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false,
              "nullFill": true
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_count"
        ],
        "resultRows": [
          [
            "Alice",
            2
          ],
          [
            "Bob",
            1
          ],
          [
            "Carol",
            0
          ]
        ],
        "explanation": "LEFT JOIN returns ALL rows from the LEFT table (testers), plus matches from bugs. Carol appears with bug_count=0 — LEFT JOIN is perfect for \"count per user including zeros\"."
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "RIGHT JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            },
            {
              "label": "4 | Crash | t=99 (no tester!)",
              "matched": false,
              "nullFill": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_title"
        ],
        "resultRows": [
          [
            "Alice",
            "Login fails on Safari"
          ],
          [
            "Alice",
            "Broken image on profile"
          ],
          [
            "Bob",
            "API timeout on checkout"
          ],
          [
            null,
            "Crash on empty search"
          ]
        ],
        "explanation": "RIGHT JOIN returns ALL rows from the RIGHT table (bugs). Bug #4 has no tester — it still appears with tester = NULL. Rarely used — most developers rewrite as LEFT JOIN with tables swapped."
      },
      {
        "type": "comparison",
        "left": {
          "label": { "tr": "❌ Yavaş — Her satır için alt sorgu", "en": "❌ Slow — Subquery for every row" },
          "code": "SELECT name,\n  (SELECT COUNT(*) FROM bugs\n   WHERE tester_id = t.id) AS bug_count\nFROM testers t;\n-- Her tester satırı için iç SELECT bir kez çalışır!",
          "note": { "tr": "Bağıntılı alt sorgu: O(n) iç sorgu", "en": "Correlated subquery: O(n) inner queries" }
        },
        "right": {
          "label": { "tr": "✅ Hızlı — Tek JOIN + GROUP BY", "en": "✅ Fast — Single JOIN + GROUP BY" },
          "code": "SELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;\n-- Her iki tabloda tek geçiş",
          "note": { "tr": "LEFT JOIN: 0 hatalı durumları da doğru işler", "en": "LEFT JOIN: handles 0 bugs correctly too" }
        }
      },
      {
        "type": "quiz",
        "question": { "tr": "Hangi JOIN türü, sağ tabloda eşleşmesi olmayan satırlar dahil sol tablodan TÜM satırları döndürür?", "en": "Which JOIN type returns ALL rows from the left table, including rows with NO matches in the right table?" },
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
        "correct": 2,
        "explanation": { "tr": "LEFT JOIN (LEFT OUTER JOIN olarak da bilinir), sol tablodan her satırı döndürür. Sağ tabloda eşleşme yoksa NULL değerler görünür. \"Sıfır hatalı olanlar dahil tüm test uzmanları\" gibi durumlarda kullanılır.", "en": "LEFT JOIN (also called LEFT OUTER JOIN) returns every row from the left table. For right-table columns with no match, NULL values appear. Use it when you need \"all X, even if they have no related Y\" — like all testers including those with 0 bugs." },
        "retryQuestion": {
          "question": { "tr": "Sağ tablodaki tüm kayıtları, sol tabloda eşleşen veri olmasa bile getiren SQL işlemi hangisidir?", "en": "Which SQL operation is used to retrieve all records from the right-hand table, even if there is no matching data found in the left-hand table?" },
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
          "explanation": { "tr": "RIGHT JOIN (RIGHT OUTER JOIN olarak da bilinir), sağ tablodaki tüm satırların sonuç kümesine dahil edilmesini sağlar. Sol tabloda ilişki olmayan sütunlar NULL ile doldurulur.", "en": "RIGHT JOIN (or RIGHT OUTER JOIN) ensures that all rows from the right table are included in the result set, filling in NULLs for any columns where no relationship exists in the left table." }
        }
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "SQL Tablo Birleştirme (JOIN) Çeşitleri",
          "en": "Types of SQL JOIN Operations"
        },
        "content": {
          "tr": "Farklı tablolardaki ilişkili verileri birleştirmek için JOIN işlemlerini kullanırız:\n\n- **INNER JOIN**: Her iki tabloda da eşleşen ortak satırları getirir.\n- **LEFT JOIN**: Sol tablodaki tüm satırları getirir; sağ tabloda eşleşme yoksa o sütunları `NULL` yapar (yetim/ilişkisiz kayıtları bulmak için idealdir).\n- **RIGHT JOIN**: Sağ tablodaki tüm satırları getirir; sol tabloda eşleşme yoksa `NULL` yapar.\n- **FULL OUTER JOIN**: Eşleşsin veya eşleşmesin her iki tablodaki tüm satırları birleştirerek getirir.\n- **CROSS JOIN**: İki tablo arasındaki tüm kombinasyonları (Kartezyen çarpım) getirir.\n- **Self Join**: Bir tablonun hiyerarşik ilişkileri (çalışan-yönetici ilişkisi gibi) göstermek için kendisiyle birleştirilmesidir.",
          "en": "JOIN statements combine rows from two or more tables based on a related column between them:\n\n- **INNER JOIN**: Returns records that have matching values in both tables.\n- **LEFT JOIN**: Returns all records from the left table, and the matched records from the right table (fills unmatched right-side columns with `NULL`).\n- **RIGHT JOIN**: Returns all records from the right table, and the matched records from the left table.\n- **FULL OUTER JOIN**: Returns all records when there is a match in either left or right table.\n- **CROSS JOIN**: Produces the Cartesian product of the two tables (combines every row of the first table with every row of the second).\n- **Self Join**: Joining a table to itself to query hierarchical relationships (like employee-manager trees)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Hangi JOIN turu sol tablodan tum satirlari dondurur, sagda eslesme olmasa bile?",
          "en": "Which JOIN returns ALL rows from the left table, even with no match on the right?"
        },
        "options": [
          {
            "id": "a",
            "text": "INNER JOIN"
          },
          {
            "id": "b",
            "text": "CROSS JOIN"
          },
          {
            "id": "c",
            "text": "RIGHT JOIN"
          },
          {
            "id": "d",
            "text": "LEFT JOIN"
          }
        ],
        "correct": "d",
        "explanation": {
          "tr": "LEFT JOIN, sol tablodaki tum satirlari dondurur. Sag tabloda eslesme yoksa sag sutunlar NULL olur.",
          "en": "LEFT JOIN returns every row from the left table. If there is no match on the right, right-side columns come back as NULL."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "INNER JOIN ile LEFT JOIN arasındaki farkı açıklayın ve bir test otomasyonunda yetim (orphaned) kayıtları bulmak için LEFT JOIN'i nasıl kullanabileceğimizi anlatın.",
        "promptEn": "Explain the difference between INNER JOIN and LEFT JOIN. How can QA engineers use LEFT JOIN to find orphaned database records?",
        "keywords": [
          [
            "inner",
            "left"
          ],
          [
            "join",
            "birleş"
          ],
          [
            "null"
          ],
          [
            "orphaned",
            "yetim"
          ],
          [
            "foreign",
            "key",
            "yabancı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INNER JOIN yalnızca her iki tabloda eşleşen kayıtları getirir. LEFT JOIN sol tablodaki tüm satırları getirir, eşleşmeyen sağ taraflar NULL olur. `LEFT JOIN ... WHERE sag.id IS NULL` sorgusuyla parent kaydı silinmiş yetim kayıtları yakalarız.",
        "modelAnswerEn": "INNER JOIN returns rows with matching values in both tables. LEFT JOIN returns all rows from the left table, filling right-side columns with NULL if no match exists. We find orphaned records by querying LEFT JOIN with a WHERE right.key IS NULL."
      }
    ]
  },
  {
    "title": "🟡 Subqueries",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📦",
        "content": {
          "tr": "Subquery, bir sorunun cevabını başka sorguya dahil etmek. Ortalamanın üzerindeki testleri bul → önce ortalama hesapla, sonra filtrele. Java: list.stream().filter(t -> t.duration > getAverage()). Subquery tam olarak bu.",
          "en": "A subquery embeds one query answer inside another. Find tests slower than average: first compute average, then filter. Java: list.stream().filter(t -> t.duration > getAverage()). A subquery is exactly that."
        }
      },
      {
        "type": "heading",
        "text": "Subqueries",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "code",
        "code": "-- Subquery in WHERE (scalar subquery):\nSELECT test_name, duration_ms\nFROM test_results\nWHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results);\n-- tests that are slower than average\n\n-- Subquery with IN:\nSELECT t.name\nFROM testers t\nWHERE t.id IN (\n    SELECT DISTINCT tester_id FROM bugs WHERE status = 'OPEN'\n);\n-- testers who have at least one open bug\n\n-- Subquery in FROM (derived table — must be aliased):\nSELECT environment, avg_ms\nFROM (\n    SELECT environment, AVG(duration_ms) AS avg_ms\n    FROM test_results\n    GROUP BY environment\n) AS env_stats\nWHERE avg_ms > 2000;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');\nCREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, tester_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO bugs VALUES (1,'Login fails','OPEN',1),(2,'Broken image','CLOSED',1),(3,'API timeout','OPEN',2),(4,'Wrong msg','OPEN',2);",
        "defaultCode": "-- Ortalamanın üzerindeki testler (scalar subquery):\nSELECT test_name, duration_ms\nFROM test_results\nWHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results)\nORDER BY duration_ms DESC;\n\n-- Diğerlerini dene:\n-- SELECT name FROM testers WHERE id IN (SELECT DISTINCT tester_id FROM bugs WHERE status='OPEN');"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "Alt Sorgular (Subqueries)",
          "en": "SQL Subqueries"
        },
        "content": {
          "tr": "Bir SQL sorgusunun içine yazılmış başka bir sorguya alt sorgu (subquery) denir. İki ana türü vardır:\n\n- **Basit Alt Sorgu (Subquery)**: Dış sorgudan bağımsızdır. Önce alt sorgu **bir kez** çalışır, sonucu dış sorguya iletir (örn: ortalama süreden uzun süren testleri bulma).\n- **Bağlantılı Alt Sorgu (Correlated Subquery)**: Dış sorgudaki satırların değerlerine bağımlıdır. Dış sorgunun **her bir satırı için tekrar tekrar çalışır**. Bu yüzden büyük tablolarda performans sorunu yaratabilir.\n- **EXISTS Operatörü**: Alt sorgunun herhangi bir satır döndürüp döndürmediğini kontrol etmek için kullanılır (en az 1 eşleşme bulduğunda çalışmayı durdurur, performanslıdır).",
          "en": "A subquery is a SELECT query nested inside another SQL statement. There are two primary types:\n\n- **Simple Subquery**: Runs independently of the outer query. It executes **once** first, computes its value, and hands it to the outer query.\n- **Correlated Subquery**: References columns from the outer query. It must execute **once for each row** evaluated by the outer query, which can create significant performance overhead on large tables.\n- **EXISTS Operator**: Checks for the existence of rows in a subquery. It stops searching as soon as it finds a single match, making it highly efficient."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Correlated subquery ile normal subquery arasindaki temel fark nedir?",
          "en": "What is the key difference between a correlated and a regular subquery?"
        },
        "options": [
          {
            "id": "a",
            "text": "Correlated subquery sadece FROM clause'da calisir"
          },
          {
            "id": "b",
            "text": "Correlated subquery dis sorgunun her satiri icin bir kez calisir"
          },
          {
            "id": "c",
            "text": "Normal subquery her zaman daha yavastir"
          },
          {
            "id": "d",
            "text": "Aralarinda bir fark yoktur"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Correlated subquery, dis sorgunun bir sutununa referans verir ve dis sorgunun her satiri icin yeniden calisir. Mumkunse JOIN kullanin.",
          "en": "A correlated subquery references a column from the outer query and runs once per outer row — can be slow. Use a JOIN instead when possible."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Alt sorgu (subquery) ile bağlantılı alt sorgu (correlated subquery) arasındaki farkı, özellikle performans açısından değerlendirerek açıklayın.",
        "promptEn": "Explain the difference between a subquery and a correlated subquery, evaluating their differences in performance.",
        "keywords": [
          [
            "subquery",
            "alt sorgu"
          ],
          [
            "correlated",
            "bağlantılı"
          ],
          [
            "performance",
            "performans",
            "hız"
          ],
          [
            "outer",
            "dış"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Standart alt sorgu bağımsızdır, bir kez çalışıp sonucu dış sorguya iletir. Bağlantılı alt sorgu ise dış sorgudaki bir sütunu referans alır ve dış sorgunun her satırı için tekrar tekrar çalışır; bu da büyük veritabanlarında yavaşlığa yol açar.",
        "modelAnswerEn": "A standard subquery runs independently and executes once, passing the result to the outer query. A correlated subquery references columns from the outer query, executing once for every row processed by the outer query, which can be slow."
      }
    ]
  },
  {
    "title": "🟡 LIKE, BETWEEN, IN",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🎯",
        "content": {
          "tr": "Üç pratik filtre: LIKE joker karakterle arama (% = herhangi karakter). BETWEEN tarih/sayı aralığı. IN uzun OR zinciri yerine liste kontrolü. Java: String.contains(), range check, List.contains() karşılıkları.",
          "en": "Three filter shortcuts: LIKE is pattern search with wildcards. BETWEEN is a range. IN replaces a long OR chain. Java: String.contains(), range check, List.contains()."
        }
      },
      {
        "type": "heading",
        "text": "LIKE, BETWEEN, IN",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "code",
        "code": "-- LIKE: pattern matching\n-- % = any number of characters, _ = exactly one character\nSELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains\nSELECT * FROM test_results WHERE test_name LIKE 'Sign_p%';  -- starts with Sign?p\n\n-- BETWEEN: inclusive range\nSELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;\nSELECT * FROM test_results WHERE run_date BETWEEN '2024-01-01' AND '2024-01-31';\n\n-- IN: matches any value in a list\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\nSELECT * FROM test_results WHERE environment NOT IN ('prod', 'staging');\n\n-- Aliases make output readable:\nSELECT\n    t.test_name  AS \"Test Name\",\n    t.duration_ms / 1000.0 AS \"Duration (sec)\",\n    t.status\nFROM test_results AS t\nWHERE t.status != 'SKIP';"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- LIKE: \"Login\" içeren testler\nSELECT test_name, status FROM test_results WHERE test_name LIKE '%Login%';\n\n-- Diğerlerini dene:\n-- SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;\n-- SELECT * FROM test_results WHERE status IN ('FAIL','SKIP');\n-- SELECT test_name AS \"Test Adı\", duration_ms/1000.0 AS \"Süre (sn)\", status FROM test_results WHERE status != 'SKIP';"
      },
      {
        "type": "heading",
        "text": "Bug Tracking DB — Interactive Example",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- En fazla açık hata olan kişi kim?\nSELECT te.name, COUNT(*) AS open_bugs\nFROM testers te\nJOIN bugs b ON te.id = b.tester_id\nWHERE b.status = 'OPEN'\nGROUP BY te.id, te.name\nORDER BY open_bugs DESC;\n\n-- Diğerlerini dene:\n-- SELECT p.name AS project, COUNT(b.id) AS total_bugs FROM projects p LEFT JOIN bugs b ON p.id=b.project_id GROUP BY p.id,p.name;\n-- SELECT te.name, b.title, b.priority FROM testers te JOIN bugs b ON te.id=b.tester_id WHERE b.priority='HIGH';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🔍",
        "title": {
          "tr": "LIKE Operatörü ve Joker (Wildcard) Karakterler",
          "en": "LIKE Operator and Wildcard Characters"
        },
        "content": {
          "tr": "Metin tabanlı aramalarda `LIKE` operatörü ile joker (wildcard) karakterler kullanırız:\n\n- **Yüzde (%)**: Sıfır veya daha fazla karakterle eşleşir (örn: `API%` \"API\" ile başlayan, `%API` \"API\" ile biten, `%API%` ise içinde \"API\" geçen tüm metinleri bulur).\n- **Alt Çizgi (_)**: Tam olarak **tek bir** karakterin yerini tutar (örn: `_Login%` sorgusu, başında tam 1 karakter bulunan ve sonrasında \"Login\" ile devam eden metinlerle eşleşir; \"ALogin\" eşleşirken \"Login\" veya \"APILogin\" eşleşmez).",
          "en": "The `LIKE` operator is used to search for patterns in text columns using special wildcard characters:\n\n- **Percent (%)**: Matches zero or more characters (e.g., `API%` matches values starting with \"API\", `%API` ends with \"API\", and `%API%` contains \"API\" anywhere).\n- **Underscore (_)**: Matches exactly **one** character (e.g., `_Login%` matches strings that start with exactly one character followed by \"Login\", matching \"ALogin\" but not \"Login\" or \"APILogin\")."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "`SELECT * FROM test_results WHERE test_name LIKE \"_Login%\";` sorgusundaki alt çizgi (_) ve yüzde (%) wildcard karakterlerinin anlamı nedir?",
          "en": "What do the underscore (_) and percent (%) wildcard characters mean in the query: `SELECT * FROM test_results WHERE test_name LIKE \"_Login%\";`?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Her ikisi de herhangi bir sayıda karakteri temsil eder",
              "en": "Both represent any number of characters"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Alt çizgi (_) tam olarak TEK bir karakteri, yüzde (%) ise sıfır veya daha fazla karakteri temsil eder",
              "en": "Underscore (_) matches exactly ONE character, while percent (%) matches zero or more characters"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Alt çizgi (_) isteğe bağlı boşlukları, yüzde (%) ise sayıları temsil eder",
              "en": "Underscore (_) matches optional spaces, and percent (%) matches numbers"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Tersine, alt çizgi çoklu karakter, yüzde tek karakter eşler",
              "en": "The reverse, underscore matches multiple, percent matches single"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "SQL LIKE operatöründe `%` sıfır veya daha fazla karakter yerine geçer (Java Regex `.*` gibi). `_` ise tam olarak tek bir karakterle eşleşir (Java Regex `.` gibi). Dolayısıyla `_Login%` ifadesi, başında tam bir karakter olan ve \"Login\" ile devam eden kelimeleri yakalar.",
          "en": "In SQL wildcards, `%` matches zero or more characters, and `_` matches exactly one character. Thus, `_Login%` matches any string that has exactly one character before \"Login\", followed by any sequence."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sorgulardan hangisi `category` sütunundaki verilerin \"API\" ile başladığını garanti altına alır?",
            "en": "Which of the following queries ensures that the `category` column starts with \"API\"?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "WHERE category LIKE \"%API\"",
                "en": "WHERE category LIKE \"%API\""
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE category LIKE \"API%\"",
                "en": "WHERE category LIKE \"API%\""
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "WHERE category LIKE \"%API%\"",
                "en": "WHERE category LIKE \"%API%\""
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "WHERE category = \"API\"",
                "en": "WHERE category = \"API\""
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir metnin \"API\" ile başladığını doğrulamak için wildcard karakterini sonuna koymalıyız: `API%`. Başına konursa (%API) ile bittiğini, her iki yanına konursa (%API%) içinde geçtiğini belirtir.",
            "en": "To check if a string starts with \"API\", the percent wildcard must be placed at the end: `API%`. Placing it at the beginning (`%API`) checks if it ends with \"API\", and both sides (`%API%`) checks if it contains \"API\"."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "LIKE operatöründeki yüzde (%) ve alt çizgi (_) karakterlerinin arama şablonlarındaki rolünü ve farkını açıklayın.",
        "promptEn": "Explain the roles and differences of the percent (%) and underscore (_) characters in LIKE operator search patterns.",
        "keywords": [
          [
            "like"
          ],
          [
            "wildcard",
            "karakter"
          ],
          [
            "percent",
            "yüzde",
            "%"
          ],
          [
            "underscore",
            "alt",
            "çizgi",
            "_"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "LIKE operatöründe yüzde (%) sıfır veya daha fazla karakter yerine geçerken, alt çizgi (_) tam olarak tek bir karakter yerine geçer. Örneğin `_A%` ifadesi, ikinci harfi A olan tüm metinleri arar.",
        "modelAnswerEn": "In LIKE patterns, percent (%) matches any string of zero or more characters, whereas underscore (_) matches exactly one character. For example, `_A%` matches any string with \"A\" as its second character."
      }
    ]
  },
  {
    "title": "🔴 Window Functions",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🪟",
        "content": {
          "tr": "Window fonksiyonu, GROUP BY'ın yaptığını yapar ama satırları yutmaz. GROUP BY 100 satırı 3 gruba indirger. Window fonksiyon 100 satırı korur ve her birine hesaplama ekler — Java'da Streams + Map kombinasyonu gibi ama çok daha kısa.",
          "en": "A window function does what GROUP BY does but keeps all rows. GROUP BY collapses 100 rows into 3 groups. A window function keeps all 100 rows and adds calculations per row — like Java Streams + Map combined, but in a fraction of the code."
        }
      },
      {
        "type": "heading",
        "text": "Window Functions",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "text",
        "content": "Window functions perform calculations across a \"window\" of related rows WITHOUT collapsing them like GROUP BY does. Each row gets its own result while also knowing about surrounding rows."
      },
      {
        "type": "code",
        "code": "-- ROW_NUMBER: sequential number (ties each get unique numbers)\n-- RANK:       ties get same number, then GAPS (1,1,3)\n-- DENSE_RANK: ties get same number, NO gaps (1,1,2)\n\nSELECT test_name, duration_ms,\n       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,\n       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,\n       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk\nFROM test_results;\n\n-- PARTITION BY: reset numbering per group (like GROUP BY without collapsing)\nSELECT tester_name, project, bug_count,\n       RANK() OVER (PARTITION BY project ORDER BY bug_count DESC) AS rank_in_project\nFROM tester_project_bugs;\n-- → Rank 1 per project's top bug-finder\n\n-- LAG / LEAD: access previous/next row values\nSELECT run_date, total_failures,\n       LAG(total_failures)  OVER (ORDER BY run_date) AS prev_failures,\n       total_failures - LAG(total_failures) OVER (ORDER BY run_date) AS change\nFROM daily_test_stats;\n\n-- Running total:\nSELECT run_date, new_tests,\n       SUM(new_tests) OVER (ORDER BY run_date) AS cumulative_tests\nFROM daily_stats;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- ROW_NUMBER, RANK, DENSE_RANK — window functions\nSELECT test_name, duration_ms,\n       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,\n       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,\n       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk\nFROM test_results;\n\n-- Diğerlerini dene:\n-- SELECT environment, test_name, duration_ms, RANK() OVER (PARTITION BY environment ORDER BY duration_ms DESC) AS rank_in_env FROM test_results;"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🔴",
        "title": {
          "tr": "Pencere Fonksiyonları (Window Functions)",
          "en": "Window Functions"
        },
        "content": {
          "tr": "Pencere (Window) fonksiyonları, satırları GROUP BY gibi tek bir satıra indirgemeden (daraltmadan), ilişkili satır grupları üzerinde hesaplama yapmamızı sağlar:\n\n- **OVER (PARTITION BY ...)**: Veriyi hangi gruplara (pencerelere) bölerek işlem yapacağımızı belirtir.\n- **ROW_NUMBER()**: Her penceredeki satırlara 1, 2, 3... şeklinde benzersiz ardışık sıra numarası verir.\n- **RANK() vs DENSE_RANK()**: Eşit değerler olduğunda sıralamayı belirler. `RANK()`, eşit değerlerden sonra sıra numarasında boşluk bırakır (1, 1, 3). `DENSE_RANK()` ise boşluk bırakmadan sıralamaya devam eder (1, 1, 2).",
          "en": "Window functions perform calculations across a set of table rows that are related to the current row, without collapsing the rows into a single summary row like GROUP BY does:\n\n- **OVER (PARTITION BY ...)**: Defines the subset of rows (window partition) the function is calculated against.\n- **ROW_NUMBER()**: Assigns a unique sequential integer (1, 2, 3...) to each row within its partition.\n- **RANK() vs DENSE_RANK()**: Determines order for duplicate values. `RANK()` leaves gaps in the ordering sequence after duplicates (1, 1, 3). `DENSE_RANK()` continues without skipping any numbers (1, 1, 2)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Window fonksiyonlarini GROUP BY dan ayiran temel ozellik nedir?",
          "en": "What is the key difference between window functions and GROUP BY?"
        },
        "options": [
          {
            "id": "a",
            "text": "Window functions only work on dates"
          },
          {
            "id": "b",
            "text": "Window functions collapse rows into groups"
          },
          {
            "id": "c",
            "text": "Window functions calculate across rows without collapsing them"
          },
          {
            "id": "d",
            "text": "GROUP BY is faster than window functions"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "Window fonksiyonlari her satirin kimligini korur. GROUP BY satiri daraltir. ROW_NUMBER(), RANK(), SUM() OVER() satir bazli hesaplama yapar ama satir kaybolmaz.",
          "en": "Window functions keep each row identity — unlike GROUP BY which collapses rows. ROW_NUMBER(), RANK(), SUM() OVER() calculate per-row while keeping all rows visible."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Window (pencere) fonksiyonlarının (OVER, RANK vb.) temel amacını ve bunları GROUP BY ile satırları birleştirmekten ayıran en önemli farkı açıklayın.",
        "promptEn": "Explain the main purpose of window functions (OVER, RANK, etc.) and the key difference that separates them from GROUP BY collapses.",
        "keywords": [
          [
            "window",
            "pencere"
          ],
          [
            "over"
          ],
          [
            "group by"
          ],
          [
            "collapse",
            "daralt",
            "satır"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Window fonksiyonları, GROUP BY gibi satırları tek bir satıra indirgemez. Her satırın kimliğini korurken ilişkili satır grupları üzerinde (pencere) matematiksel veya sıralama işlemleri yapmamızı sağlar.",
        "modelAnswerEn": "Unlike GROUP BY which collapses matching rows into a single summary row, window functions perform calculations across a set of table rows that are related to the current row while keeping all individual rows intact."
      }
    ]
  },
  {
    "title": "🔴 CTEs",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🧱",
        "content": {
          "tr": "CTE, karmaşık sorguya geçici isim vermek. Çok adımlı hesabı adımlara böler: yavaş testleri bul (CTE1), CTE1 ile karşılaştır (CTE2). Java’da method sonucunu değişkene atayıp kullanmak gibi — ama SQL içinde.",
          "en": "A CTE gives a temporary name to a complex query. Breaks multi-step calculations: find slow tests (CTE1), compare with CTE1 (CTE2). Like assigning a Java method result to a named variable — but inside SQL."
        }
      },
      {
        "type": "heading",
        "text": "CTEs — Common Table Expressions",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "code",
        "code": "-- CTE: a named subquery at the top of your statement.\n-- Makes complex queries readable by breaking into named steps.\n\nWITH failed_tests AS (\n    SELECT test_name, COUNT(*) AS fail_count\n    FROM test_results\n    WHERE status = 'FAIL'\n    GROUP BY test_name\n),\nrecent_passes AS (\n    SELECT test_name, MAX(run_date) AS last_pass_date\n    FROM test_results\n    WHERE status = 'PASS'\n    GROUP BY test_name\n)\n-- Now use both CTEs together:\nSELECT f.test_name, f.fail_count, p.last_pass_date\nFROM failed_tests f\nLEFT JOIN recent_passes p ON f.test_name = p.test_name\nORDER BY f.fail_count DESC;\n\n-- Recursive CTE (for hierarchical data like org charts, nested categories):\nWITH RECURSIVE org AS (\n    SELECT id, name, manager_id, 0 AS level\n    FROM employees WHERE manager_id IS NULL          -- start: CEO\n\n    UNION ALL\n\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org o ON e.manager_id = o.id\n)\nSELECT level, name FROM org ORDER BY level;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- CTE: başarısız testleri adımlara ayır\nWITH failed_tests AS (\n    SELECT test_name, COUNT(*) AS fail_count\n    FROM test_results\n    WHERE status = 'FAIL'\n    GROUP BY test_name\n),\npass_times AS (\n    SELECT test_name, AVG(duration_ms) AS avg_ms\n    FROM test_results\n    WHERE status = 'PASS'\n    GROUP BY test_name\n)\nSELECT f.test_name, f.fail_count, ROUND(p.avg_ms,0) AS avg_pass_ms\nFROM failed_tests f\nLEFT JOIN pass_times p ON f.test_name = p.test_name\nORDER BY f.fail_count DESC;"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🔴",
        "title": {
          "tr": "CTE (Common Table Expressions) Yapısı",
          "en": "Common Table Expressions (CTEs)"
        },
        "content": {
          "tr": "CTE, karmaşık sorguları daha okunabilir kılmak için tanımlanan geçici, adlandırılmış sonuç kümeleridir:\n\n- **Tanımlama**: `WITH cte_adı AS (SELECT...)` sözdizimiyle sorgunun en başında tanımlanır ve ana sorguda bir tablo gibi sorgulanabilir.\n- **Avantajı**: İç içe geçmiş, okunması zor alt sorguları (subqueries) yukarıdan aşağıya sıralı adımlara bölerek kodun bakımını kolaylaştırır.\n- **Recursive CTE**: Kendi kendini referans alan alt sorgulardır. Özellikle organizasyon ağacı veya kategori hiyerarşisi gibi özyinelemeli (parent-child) verileri sorgulamak için kullanılır.",
          "en": "A CTE (Common Table Expression) is a temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement:\n\n- **Definition**: Declared at the very start of a query using `WITH cte_name AS (SELECT...)`. It acts like a virtual table for the main query.\n- **Advantage**: Dramatically improves query readability and maintenance by decomposing nested, hard-to-read subqueries into clean, sequential virtual tables.\n- **Recursive CTEs**: A CTE that references itself. Essential for traversing hierarchical or tree-structured data (e.g. organizational hierarchies or product categories)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "CTE (Common Table Expression) icin hangi keyword kullanilir?",
          "en": "Which keyword is used to define a CTE?"
        },
        "options": [
          {
            "id": "a",
            "text": "DEFINE"
          },
          {
            "id": "b",
            "text": "TEMP"
          },
          {
            "id": "c",
            "text": "WITH"
          },
          {
            "id": "d",
            "text": "CREATE TEMP"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "CTE, WITH keyword u ile tanimlanir: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. Karmasik sorgulari adlandirilmis adimlara boler.",
          "en": "A CTE starts with WITH: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. It breaks complex queries into named steps and improves readability."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "CTE (Common Table Expression) yapısını, tanımlama anahtar kelimesini ve iç içe geçmiş alt sorgulara kıyasla sağladığı avantajları açıklayın.",
        "promptEn": "Explain the CTE (Common Table Expression) structure, its defining keyword, and its advantages compared to nested subqueries.",
        "keywords": [
          [
            "cte"
          ],
          [
            "with"
          ],
          [
            "readability",
            "okunabilirlik",
            "temiz"
          ],
          [
            "subquery",
            "alt",
            "sorgu"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "CTE, `WITH` anahtar kelimesiyle tanımlanan geçici, adlandırılmış bir sonuç kümesidir. Karmaşık, iç içe geçmiş okunması zor alt sorguları yukarıdan aşağıya sıralı adımlara bölerek kodun okunabilirliğini ve bakımını kolaylaştırır.",
        "modelAnswerEn": "A CTE is a temporary named result set defined using `WITH`. It enhances query readability and maintainability by breaking complex, nested subqueries into sequential, named virtual tables."
      }
    ]
  },
  {
    "title": "🔴 Transactions",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🏦",
        "content": {
          "tr": "Transaction banka havalesi gibi. Para çıkması VE karşı hesaba girmesi ya ikisi birden olur ya da hiçbiri (ROLLBACK). ACID: Atomik, Tutarlı, İzole, Dayanıklı. Java synchronized bloğu gibi ama veritabanı seviyesinde.",
          "en": "A transaction is like a bank transfer. Money leaving AND arriving must both succeed — or neither happens (ROLLBACK). ACID: Atomic, Consistent, Isolated, Durable. Like Java synchronized block, but at database level."
        }
      },
      {
        "type": "heading",
        "text": "Transactions — ACID Properties",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "code",
        "code": "-- A transaction is a group of SQL statements that execute as ONE unit.\n-- Either ALL succeed (COMMIT) or ALL are undone (ROLLBACK).\n-- ACID: Atomicity, Consistency, Isolation, Durability\n\n-- Example: Transfer test case from one project to another\nSTART TRANSACTION;\n\nUPDATE test_cases SET project_id = 2 WHERE id = 42;  -- move test case\nINSERT INTO audit_log (action, test_id)              -- log the action\n       VALUES ('moved_to_project_2', 42);\n\n-- If everything looks good:\nCOMMIT;\n\n-- If any error occurs:\n-- ROLLBACK;   -- undo BOTH statements\n\n-- SAVEPOINT: partial rollback\nSTART TRANSACTION;\nINSERT INTO test_results (test_name, status) VALUES ('Test A', 'PASS');\nSAVEPOINT after_a;\nINSERT INTO test_results (test_name, status) VALUES ('Test B', 'FAIL');\nROLLBACK TO SAVEPOINT after_a;  -- undo Test B, keep Test A\nCOMMIT;                          -- commits only Test A"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🔐",
        "title": {
          "tr": "Transaction Yönetimi ve ACID Prensipleri",
          "en": "Transaction Management and ACID Properties"
        },
        "content": {
          "tr": "Transaction (İşlem), veritabanında \"ya hep ya hiç\" kuralıyla çalışan komutlar bütünüdür. ACID prensipleriyle korunur:\n\n- **Isolation (Yalıtım)**: Aynı anda çalışan işlemlerin birbirinin tamamlanmamış (commit edilmemiş) değişikliklerini görmesini engeller. Her işlem izole şekilde çalışır.\n- **ROLLBACK**: Bir transaction sırasında hata oluşursa, yapılan tüm değişiklikleri iptal edip veritabanını işlem başlamadan önceki kararlı durumuna geri döndüren komuttur.\n- **COMMIT**: Yapılan değişiklikleri kalıcı olarak veritabanına kaydeder ve kilitleri serbest bırakır.",
          "en": "A transaction is a unit of work that executes under an \"all-or-nothing\" rule, guaranteed by ACID properties:\n\n- **Isolation**: Ensures that concurrent transactions do not interfere with each other or see intermediate, uncommitted states. Each runs as if it were the only one.\n- **ROLLBACK**: Reverts all database modifications made since the transaction started, returning the database to its last committed, stable state.\n- **COMMIT**: Permanently saves all changes made during the transaction and releases active resource locks."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanı işlemlerinde ACID prensiplerinden \"Isolation\" (Yalıtım) neyi garanti eder?",
          "en": "What does the \"Isolation\" property of ACID guarantee in database transactions?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "İşlemin çökme durumunda kaybolmamasını",
              "en": "That transactions survive system crashes"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Eşzamanlı çalışan işlemlerin birbirinin tamamlanmamış değişikliklerini görmemesini",
              "en": "That concurrent transactions do not see each other's uncommitted changes"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Verilerin otomatik olarak şifrelenmesini",
              "en": "That all data is automatically encrypted"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguların daha hızlı yanıt vermesini",
              "en": "That queries return results faster"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Yalıtım (Isolation), aynı anda çalışan birden fazla transaction'ın birbirinin yarıda kalmış veya commit edilmemiş verilerini etkilemesini engeller. Her transaction kendini sistemde tek başına çalışıyormuş gibi görür.",
          "en": "Isolation ensures that concurrent execution of transactions leaves the database in the same state as if they were executed sequentially. No transaction can see uncommitted data of another."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir transaction içinde hata oluştuğunda yapılan değişiklikleri geri alıp veritabanını eski haline getiren komut hangisidir?",
            "en": "Which command is used to undo changes made in a transaction and return the database to its previous state if an error occurs?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "COMMIT",
                "en": "COMMIT"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "ROLLBACK",
                "en": "ROLLBACK"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "SAVEPOINT",
                "en": "SAVEPOINT"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "DROP TRANSACTION",
                "en": "DROP TRANSACTION"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "ROLLBACK komutu, START TRANSACTION sonrasında yapılan tüm değişiklikleri iptal ederek veritabanını işlem başlamadan önceki kararlı durumuna geri döndürür (rollback).",
            "en": "The ROLLBACK command undoes all modifications performed in the current transaction block, reverting the database state to the last committed state."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "ACID prensiplerinin veritabanı güvenliği için önemini ve test otomasyonunda veritabanını temiz tutmak için transaction rollback işlemini nasıl kullandığımızı açıklayın.",
        "promptEn": "Explain the importance of ACID properties for database safety, and how we use transaction rollback in automation tests to keep the database clean.",
        "keywords": [
          [
            "acid"
          ],
          [
            "transaction",
            "işlem"
          ],
          [
            "rollback",
            "geri",
            "al"
          ],
          [
            "isolation",
            "yalıtım"
          ],
          [
            "clean",
            "temiz"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "ACID prensipleri veri güvenilirliğini zorunlu kılar. Test otomasyonunda, testlerin veritabanını kirletmesini önlemek amacıyla test başlamadan önce transaction açarız ve test bittiğinde ROLLBACK ile tüm değişiklikleri geri alırız.",
        "modelAnswerEn": "ACID properties ensure reliable database transactions. In QA testing, starting a transaction before a test and executing a ROLLBACK afterward prevents tests from polluting the database, keeping the data clean."
      }
    ]
  },
  {
    "title": "🔴 Indexes & Views",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📚",
        "content": {
          "tr": "Index, kitabın arkasındaki dizin gibi. 500 sayfayı okumak yerine dizine bakarın: sayfa 287. VIEW karmaşık sorguya tablo gibi kısayol. Java HashMap ArrayList’e göre hızlıdır — Index aynı fikir.",
          "en": "An Index is like a book index. Instead of reading 500 pages, check the index: page 287. A VIEW is a saved shortcut that looks like a table. Java HashMap beats ArrayList for lookup — same idea."
        }
      },
      {
        "type": "heading",
        "text": "Indexes — Speed Up Queries",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "code",
        "code": "-- Create indexes on columns used frequently in WHERE/JOIN:\nCREATE INDEX idx_results_status  ON test_results(status);\nCREATE INDEX idx_results_run_date ON test_results(run_date);\nCREATE INDEX idx_bugs_tester     ON bugs(tester_id);       -- FK columns always!\nCREATE INDEX idx_results_env_status ON test_results(environment, status);  -- composite\n\n-- Unique index (also enforces uniqueness):\nCREATE UNIQUE INDEX idx_users_email ON users(email);\n\n-- View indexes on a table:\nSHOW INDEX FROM test_results;      -- MySQL\ndi test_results                   -- PostgreSQL\n\n-- EXPLAIN: see how MySQL plans to execute a query\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- \"type: ALL\" = full table scan (slow, needs index)\n-- \"type: ref\" = using index (fast!)\n\n-- Add index and check improvement:\nCREATE INDEX idx_status ON test_results(status);\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- Now shows: key: idx_status, rows: ~10 (not all rows)"
      },
      {
        "type": "heading",
        "text": "Views",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "code",
        "code": "-- A VIEW is a saved SQL query that acts like a virtual table.\n-- Great for: reusable complex queries, hiding complexity, security.\n\nCREATE VIEW active_failures AS\n    SELECT t.name AS tester, b.title, b.priority, p.name AS project\n    FROM bugs b\n    JOIN testers t  ON b.tester_id  = t.id\n    JOIN projects p ON b.project_id = p.id\n    WHERE b.status = 'OPEN';\n\n-- Use the view like a table:\nSELECT * FROM active_failures WHERE priority = 'HIGH';\nSELECT tester, COUNT(*) AS high_priority FROM active_failures\nGROUP BY tester;\n\n-- Drop a view:\nDROP VIEW active_failures;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- VIEW oluştur\nCREATE VIEW active_failures AS\n    SELECT t.name AS tester, b.title, b.priority, p.name AS project\n    FROM bugs b\n    JOIN testers t  ON b.tester_id  = t.id\n    JOIN projects p ON b.project_id = p.id\n    WHERE b.status = 'OPEN';\n\n-- View'ı tablo gibi kullan:\nSELECT * FROM active_failures WHERE priority = 'HIGH';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "⚡",
        "title": {
          "tr": "İndeksler (Indexes) ve Görünümler (Views)",
          "en": "Indexes and Views"
        },
        "content": {
          "tr": "Veritabanı optimizasyonu ve şema yönetiminde iki önemli yapı kullanılır:\n\n- **İndeksler (Indexes)**: SELECT sorgularındaki aramaları çok hızlandırır; ancak kontrolsüz her sütuna indeks eklemek yazma (INSERT, UPDATE, DELETE) işlemlerini yavaşlatır. Çünkü her yeni veri yazıldığında arkadaki indeks ağaçlarının (B-Tree) da güncellenmesi gerekir ve ek disk alanı harcar.\n- **Görünümler (Views)**: Kaydedilmiş birer SQL sorgusudur. Diskte fiziksel olarak veri saklamayan sanal tablolardır. Bir View sorgulandığında, arka plandaki SQL sorgusu dinamik olarak çalıştırılır.",
          "en": "Database optimization and schema management rely on two key concepts:\n\n- **Indexes**: Accelerate SELECT queries by avoiding full table scans. However, blindly indexing columns degrades write performance (INSERT, UPDATE, DELETE) because the index structures (e.g. B-Trees) must be updated dynamically on every write, consuming additional disk space.\n- **Views**: A View is a virtual table representation defined by a stored SELECT query. It does not store data itself; rather, it queries the underlying base tables dynamically whenever called."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanında her sütuna kontrolsüz şekilde index (indeks) eklemenin en büyük dezavantajı nedir?",
          "en": "What is the main drawback of blindly adding indexes to every column in a database table?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "SELECT sorgularının yavaşlaması",
              "en": "SELECT queries running slower"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "INSERT, UPDATE ve DELETE (yazma) işlemlerinin yavaşlaması ve disk kullanımının ciddi oranda artması",
              "en": "Slowing down INSERT, UPDATE, and DELETE (write) operations and significantly increasing disk space usage"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablo şemasının kilitlenmesi",
              "en": "The table schema becoming locked"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "İlişkisel bütünlüğün (Foreign Key) bozulması",
              "en": "Breaking referential integrity constraints"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Indexler SELECT sorgularını hızlandırır ancak veritabanına her veri eklendiğinde, silindiğinde veya güncellendiğinde bu index yapılarının da (B-Tree) güncellenmesi gerekir. Bu yüzden aşırı index yazma performansını düşürür.",
          "en": "While indexes speed up lookups, every write (INSERT, UPDATE, DELETE) must also update the index trees. Excessive indexing creates substantial write overhead and consumes additional disk storage."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir veritabanı Görünüm (View) hakkında hangisi doğrudur?",
            "en": "Which of the following is true regarding a database View?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "View, verileri diskte fiziksel olarak saklayan bir kopyadır",
                "en": "A View is a duplicate table that physically stores data on disk"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "View, kaydedilmiş bir SQL sorgusudur; sorgulandığında dinamik olarak çalışır ve fiziksel olarak veri saklamaz",
                "en": "A View is a saved SQL query; it runs dynamically when queried and does not store physical data"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "View kullanıldığında indexler çalışmaz",
                "en": "Indexes do not work when querying a View"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "View sadece tek bir tabloyu sorgulayabilir",
                "en": "A View can only query a single table"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "View sanal bir tablodur. Kendine ait bir verisi yoktur; arka planda saklı bir SELECT sorgusunun sonucunu bir tablo gibi sunar. Her çağrıldığında o sorguyu veritabanında çalıştırır.",
            "en": "A View is a virtual table representation defined by a stored SELECT query. It does not store data itself; rather, it queries the underlying base tables dynamically whenever called."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "İndeks (Index) kullanmanın okuma (SELECT) ve yazma (INSERT/DELETE) performansına etkilerini ve View (Görünüm) yapısının veri saklama mantığını açıklayın.",
        "promptEn": "Explain the effects of using Indexes on read (SELECT) and write (INSERT/DELETE) performance, and how Views handle data storage logically.",
        "keywords": [
          [
            "index",
            "indeks"
          ],
          [
            "read",
            "write",
            "oku",
            "yaz"
          ],
          [
            "view",
            "görünüm"
          ],
          [
            "virtual",
            "sanal",
            "fiziksel"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "İndeksler arama ve SELECT işlemlerini çok hızlandırır ancak INSERT/DELETE işlemlerini yavaşlatır çünkü indeks ağaçları da güncellenmelidir. View ise diskte fiziksel veri saklamayan sanal bir tablodur; sadece arka plandaki sorguyu dinamik çalıştırır.",
        "modelAnswerEn": "Indexes speed up SELECT queries but slow down writes (INSERT/DELETE) due to index maintenance overhead. A View is a virtual table that does not physically store data; it simply executes its underlying SELECT query dynamically."
      }
    ]
  },
  {
    "title": "🔴 SQL Injection",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔒",
        "content": {
          "tr": "SQL Injection, form alanına SQL kodu yazan kötü niyetli kullanıcı. String birleştirme yapılırsa tüm şifreler döner. Çözüm: parametre kullan, string birleştirme asla. Java PreparedStatement bu yüzden var.",
          "en": "SQL Injection is a malicious user typing SQL code into a form. String concatenation exposes all passwords. Fix: always use parameterized queries, never string concatenation. Java PreparedStatement exists for this."
        }
      },
      {
        "type": "heading",
        "text": "SQL Injection & Parameterized Queries",
        "difficulty": "🔴 Advanced"
      },
      {
        "type": "code",
        "code": "# SQL INJECTION: attacker injects SQL code through user input.\n# Classic example:\nusername = \"admin' OR '1'='1\"\n# Vulnerable query becomes:\n# WHERE username = 'admin' OR '1'='1' -- true for ALL users!\n\n# ❌ VULNERABLE (never do this in tests or apps):\nquery = f\"SELECT * FROM users WHERE username = '{username}'\"\ncursor.execute(query)\n\n# ✅ SAFE: Use parameterized queries (placeholders):\n# Python sqlite3:\ncursor.execute(\n    \"SELECT * FROM users WHERE username = ?\",\n    (username,)              # value is passed separately — SQL engine escapes it\n)\n\n# Python psycopg2 (PostgreSQL):\ncursor.execute(\n    \"SELECT * FROM users WHERE username = %s AND role = %s\",\n    (username, \"admin\")\n)\n\n# Why safe? The DB engine handles the values as DATA, never as SQL code.\n# 'admin' OR '1'='1' becomes a literal string to match, not executable SQL."
      },
      {
        "type": "visual",
        "variant": "flow",
        "title": "ACID Transaction Flow — What Happens Inside the DB",
        "note": "ACID guarantees mean your test data is always in a consistent state — no partial inserts, no phantom reads between transactions.",
        "steps": [
          {
            "num": "A",
            "label": "Atomicity",
            "desc": "All or nothing",
            "highlight": true
          },
          {
            "num": "C",
            "label": "Consistency",
            "desc": "Rules enforced"
          },
          {
            "num": "I",
            "label": "Isolation",
            "desc": "Concurrent safe",
            "highlight": true
          },
          {
            "num": "D",
            "label": "Durability",
            "desc": "Survived crash"
          }
        ]
      },
      {
        "type": "visual",
        "variant": "boxes",
        "title": "Transaction Lifecycle — What Each SQL Command Does",
        "items": [
          {
            "icon": "🚀",
            "label": "START TRANSACTION",
            "desc": "Begin atomic block"
          },
          {
            "arrow": true
          },
          {
            "icon": "✏️",
            "label": "INSERT / UPDATE / DELETE",
            "desc": "Multiple statements"
          },
          {
            "arrow": true
          },
          {
            "icon": "✅",
            "label": "COMMIT",
            "desc": "Persist all changes",
            "highlight": true
          },
          {
            "arrow": true
          },
          {
            "icon": "↩️",
            "label": "ROLLBACK",
            "desc": "Undo all if error"
          }
        ],
        "note": "COMMIT makes all changes permanent. ROLLBACK undoes everything back to START TRANSACTION — like Ctrl+Z for the entire batch."
      },
      {
        "type": "simulation",
        "scenario": "sql-transaction-isolation",
        "icon": "🔒",
        "title": {
          "tr": "İnteraktif Transaction & İzolasyon Seviyeleri",
          "en": "Interactive Transaction & Isolation Levels"
        },
        "description": {
          "tr": "Aynı anda çalışan iki farklı terminal oturumunda verilerin nasıl kilitlendiğini (Exclusive Lock) ve izolasyon seviyesine göre (Read Committed vs Repeatable Read) User A'nın ne zaman güncel veriyi görebildiğini gör.",
          "en": "Watch how concurrent database sessions handle locks (Exclusive Lock) and see when User A can read committed changes depending on the transaction isolation level (Read Committed vs Repeatable Read)."
        },
        "code": "-- Session A\nBEGIN;\nSELECT balance FROM accounts WHERE id = 1;\n\n-- Session B\nBEGIN;\nUPDATE accounts SET balance = 800 WHERE id = 1;\nCOMMIT;",
        "language": "sql"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🛡️",
        "title": {
          "tr": "SQL Injection ve Prepared Statements",
          "en": "SQL Injection and Prepared Statements"
        },
        "content": {
          "tr": "SQL Injection, kullanıcı girdilerinin sorguya doğrudan string birleştirme ile eklenmesi durumunda, saldırganın girdilere tırnak işareti koyarak kendi SQL komutlarını çalıştırması açığıdır.\n\n- **Çözüm**: Parametreli Sorgular (Prepared Statements) kullanmaktır. Bu yöntemde SQL sorgu yapısı önceden derlenir, kullanıcı girdileri ise sorguya kod olarak değil, sadece bağımsız veri (literal) olarak aktarılır. Bu sayede girdi ne içerirse içersin asla SQL kodu olarak yürütülemez.",
          "en": "SQL Injection is a critical vulnerability where user inputs are concatenated directly into SQL queries, enabling attackers to inject malicious SQL commands by manipulating quotes.\n\n- **Prevention**: Use Parameterized Queries (Prepared Statements). In this pattern, the query structure is pre-compiled by the database engine. User inputs are bound strictly as parameters (data literals), ensuring they are never executed as database code."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "SQL Injection açığını engellemenin %100 güvenli ve endüstri standardı olan yöntemi hangisidir?",
          "en": "What is the 100% secure and industry-standard method to prevent SQL Injection vulnerabilities?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Kullanıcı girdilerindeki tırnak işaretlerini Javascript ile temizlemek",
              "en": "Sanitizing single quotes in user inputs using Javascript client-side"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Parametreli sorgular (Prepared Statements) kullanmak",
              "en": "Using Parameterized Queries (Prepared Statements)"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Veritabanındaki tüm kullanıcı şifrelerini MD5 ile saklamak",
              "en": "Storing all database user passwords as MD5 hashes"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguları sadece admin yetkisiyle çalıştırmak",
              "en": "Running all queries with administrative privileges"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Parametreli sorgular (Prepared Statements) kullanıldığında, SQL komutunun yapısı veritabanı motoru tarafından önceden derlenir. Kullanıcı girdisi sorguya bir kod olarak değil, sadece veri (literal) olarak bağlanır. Bu sayede girdi asla SQL komutu olarak yürütülemez.",
          "en": "Parameterized queries compile the query structure first. User inputs are treated strictly as parameters (data), not executable SQL commands. This completely eliminates the threat of SQL injection."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sorgulardan hangisi SQL Injection açığı barındırır?",
            "en": "Which of the following database query patterns is vulnerable to SQL Injection?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "String birleştirme ile yazılan: `SELECT * FROM users WHERE username = '` + input + `'`",
                "en": "String concatenation: `SELECT * FROM users WHERE username = '` + input + `'`"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Parametreli: `SELECT * FROM users WHERE username = ?`",
                "en": "Parameterized: `SELECT * FROM users WHERE username = ?`"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Stored Procedure içinde parametre kullanan sorgular",
                "en": "Stored procedures using formal parameters"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "OR operatörü içermeyen sabit sorgular",
                "en": "Static queries without any OR clauses"
              }
            }
          ],
          "correct": "a",
          "explanation": {
            "tr": "Girdileri tırnak işaretleri arasına doğrudan string birleştirme (concatenation) ile eklemek, saldırganın girdinin sonuna tırnak koyarak kendi SQL komutlarını yazabilmesine ve sorguyu manipüle etmesine olanak tanır.",
            "en": "Concatenating user input directly into the query string allows attackers to break out of the string literal (e.g. using a single quote) and append their own SQL commands."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL Injection açığının nasıl ortaya çıktığını ve parametreli sorguların (Prepared Statements) girdiyi veri olarak bağlayarak bu açığı nasıl önlediğini açıklayın.",
        "promptEn": "Explain how SQL Injection occurs and how parameterized queries (Prepared Statements) prevent it by binding input strictly as data.",
        "keywords": [
          [
            "injection",
            "enjeksiyon"
          ],
          [
            "parameter",
            "parametre"
          ],
          [
            "prepared",
            "statement"
          ],
          [
            "compile",
            "derle"
          ],
          [
            "input",
            "girdi"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SQL Injection, kullanıcı girdilerinin SQL komutu gibi çalıştırılmasıyla oluşur. Parametreli sorgularda SQL şablonu önceden derlenir; kullanıcı girdileri ise sorguya kod olarak değil sadece veri olarak bağlanır ve açığı tamamen kapatır.",
        "modelAnswerEn": "SQL Injection happens when user inputs are concatenated into a query and executed as SQL code. Parameterized queries pre-compile the SQL template, ensuring inputs are treated strictly as bound values (data) and never compiled."
      }
    ]
  },
  {
    "title": "🧪 SQL for QA — Real Testing Scenarios",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🧪",
        "content": {
          "tr": "QA olarak SQL'i iki kritik anda kullanırsın: testten önce INSERT ile veri hazırla, testten sonra SELECT ile doğrula. UI 'işlem başarılı' dese bile, veritabanında gerçekte ne kaydedildiğini SQL ile kontrol edersin.",
          "en": "As a QA engineer, SQL serves you in two key moments: INSERT test data before the test runs, SELECT to verify results after. Even if the UI says 'success', SQL tells you what was actually written to the database."
        }
      },
      {
        "type": "heading",
        "text": "Use Case 1: Find All Failed Tests in Last 7 Days"
      },
      {
        "type": "code",
        "code": "-- Find failed tests from the last 7 days with details:\nSELECT\n    test_name,\n    status,\n    duration_ms,\n    environment,\n    run_date\nFROM test_results\nWHERE status = 'FAIL'\n  AND run_date >= NOW() - INTERVAL 7 DAY  -- MySQL\n-- AND run_date >= CURRENT_TIMESTAMP - INTERVAL '7 days'  -- PostgreSQL\nORDER BY run_date DESC;\n\n-- Count failures per test in last 7 days:\nSELECT test_name, COUNT(*) AS fail_count\nFROM test_results\nWHERE status = 'FAIL'\n  AND run_date >= NOW() - INTERVAL 7 DAY\nGROUP BY test_name\nORDER BY fail_count DESC;",
        "expected": "+-----------------+--------+-------------+\n| test_name       | status | duration_ms |\n+-----------------+--------+-------------+\n| Checkout Flow   | FAIL   |        5400 |\n| Search Feature  | FAIL   |        8200 |\n+-----------------+--------+-------------+"
      },
      {
        "type": "heading",
        "text": "Use Case 2: Find Duplicate Test Data Entries"
      },
      {
        "type": "code",
        "code": "-- Find duplicate email addresses in a users table:\nSELECT email, COUNT(*) AS count\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1\nORDER BY count DESC;\n\n-- See ALL rows that have a duplicate email:\nSELECT *\nFROM users\nWHERE email IN (\n    SELECT email FROM users\n    GROUP BY email\n    HAVING COUNT(*) > 1\n)\nORDER BY email;\n\n-- Find duplicates across multiple columns (exact duplicate records):\nSELECT test_name, environment, run_date, COUNT(*) AS count\nFROM test_results\nGROUP BY test_name, environment, run_date\nHAVING COUNT(*) > 1;"
      },
      {
        "type": "heading",
        "text": "Use Case 3: Verify Foreign Key Relationships (Find Orphaned Records)"
      },
      {
        "type": "code",
        "code": "-- Find orders whose user_id doesn't exist in the users table (orphaned records):\nSELECT o.id AS order_id, o.user_id, o.total\nFROM orders o\nLEFT JOIN users u ON o.user_id = u.id\nWHERE u.id IS NULL;      -- user_id exists in orders but NOT in users = orphan!\n\n-- Find test results whose test_case_id doesn't exist:\nSELECT r.id, r.test_case_id\nFROM test_results r\nLEFT JOIN test_cases tc ON r.test_case_id = tc.id\nWHERE tc.id IS NULL;\n\n-- Count valid vs orphaned records:\nSELECT\n    SUM(CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END) AS valid_orders,\n    SUM(CASE WHEN u.id IS NULL     THEN 1 ELSE 0 END) AS orphaned_orders\nFROM orders o\nLEFT JOIN users u ON o.user_id = u.id;"
      },
      {
        "type": "heading",
        "text": "Use Case 4: Count Test Results by Status with Percentages"
      },
      {
        "type": "code",
        "code": "-- Count and percentage per status:\nSELECT\n    status,\n    COUNT(*) AS count,\n    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage\nFROM test_results\nWHERE run_date >= NOW() - INTERVAL 7 DAY\nGROUP BY status\nORDER BY count DESC;\n\n-- MySQL alternative (no window function needed):\nSELECT\n    status,\n    COUNT(*) AS count,\n    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM test_results), 1) AS pct\nFROM test_results\nGROUP BY status\nORDER BY count DESC;",
        "expected": "+--------+-------+------------+\n| status | count | percentage |\n+--------+-------+------------+\n| PASS   |    30 |       60.0 |\n| FAIL   |    12 |       24.0 |\n| SKIP   |     8 |       16.0 |\n+--------+-------+------------+"
      },
      {
        "type": "heading",
        "text": "Use Case 5: Clean Up Test Data Older Than 30 Days"
      },
      {
        "type": "code",
        "code": "-- SAFE PATTERN: ALWAYS SELECT first to verify what will be deleted!\n\n-- Step 1: see what will be deleted:\nSELECT COUNT(*), MIN(run_date), MAX(run_date)\nFROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\n  AND environment = 'staging';        -- only delete staging data, not prod!\n\n-- Step 2: if the count looks right, delete:\nDELETE FROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\n  AND environment = 'staging';\n\n-- To be extra safe, delete in batches (avoids locking the table):\nDELETE FROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\nLIMIT 1000;         -- delete max 1000 rows per run\n-- Repeat until 0 rows affected."
      },
      {
        "type": "heading",
        "text": "Use Case 6: EXPLAIN — Find and Fix Slow Queries"
      },
      {
        "type": "code",
        "code": "-- 1. Identify a slow query and add EXPLAIN before it:\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';\n\n-- Look for:\n-- type: \"ALL\" = full table scan (bad — reads every row)\n-- key: NULL   = no index being used (bad)\n-- rows: high  = many rows examined\n\n-- 2. Create a composite index:\nCREATE INDEX idx_status_env ON test_results(status, environment);\n\n-- 3. Run EXPLAIN again:\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';\n-- Now see: type: \"ref\", key: idx_status_env, rows: much lower\n\n-- EXPLAIN ANALYZE (PostgreSQL — actually runs the query):\nEXPLAIN ANALYZE SELECT * FROM test_results WHERE status = 'FAIL';",
        "expected": "Before index: type=ALL, rows=50000, key=NULL\nAfter index:  type=ref, rows=120, key=idx_status_env"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "EXPLAIN çıktısında bir sorgu için `type: \"ALL\"` ve `rows: 50000` görüyorsun. Bu ne anlama gelir, ve genel çözüm nedir?",
          "en": "EXPLAIN output shows `type: \"ALL\"` and `rows: 50000` for a query. What does this mean, and what is the general fix?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Sorgu zaten optimaldir, hiçbir şey yapma",
              "en": "The query is already optimal, do nothing"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Veritabanı bir full table scan yapıyor (index kullanmıyor) — WHERE'de filtrelenen kolona index ekle",
              "en": "The database is doing a full table scan (not using an index) — add an index on the column filtered in WHERE"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablo boş",
              "en": "The table is empty"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorgu syntax hatası içeriyor",
              "en": "The query contains a syntax error"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "`type: \"ALL\"`, veritabanının eşleşen satırları bulmak için tablonun TÜM satırlarını taradığı anlamına gelir (full table scan) — `rows: 50000` bunun ne kadar maliyetli olduğunu gösterir. WHERE koşulunda filtrelenen kolona (örn. status, environment) bir index eklemek, planı `type: \"ref\"`e çevirir ve taranan satır sayısını dramatik şekilde düşürür — Java'da bir HashMap ile O(1) erişim yerine bir ArrayList'i baştan sona taramanın (O(n)) farkı gibi.",
          "en": "`type: \"ALL\"` means the database scans EVERY row in the table to find matches (a full table scan) — `rows: 50000` shows how expensive that is. Adding an index on the column filtered in WHERE (e.g. status, environment) changes the plan to `type: \"ref\"` and dramatically reduces the rows scanned — similar to the difference between O(1) lookup with a Java HashMap versus scanning an entire ArrayList from start to end (O(n))."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir kolona index ekledikten sonra EXPLAIN hâlâ `type: \"ALL\"` gösteriyor, sorgu hâlâ yavaş. Olası bir neden nedir?",
            "en": "After adding an index on a column, EXPLAIN still shows `type: \"ALL\"` and the query is still slow. What is a likely cause?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Index'ler her zaman 24 saat sonra etkin olur",
                "en": "Indexes always take 24 hours to become active"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu o kolonu fonksiyon içinde kullanıyor olabilir (örn. UPPER(status) = 'FAIL'), bu da index kullanımını engeller",
                "en": "The WHERE clause might be wrapping that column in a function (e.g. UPPER(status) = 'FAIL'), which prevents the index from being used"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Index sadece SELECT * sorgularında çalışır",
                "en": "Indexes only work with SELECT * queries"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sorgu zaten optimaldir, EXPLAIN yanlış bilgi veriyor",
                "en": "The query is already optimal, EXPLAIN is reporting incorrectly"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir kolonu bir fonksiyonun içine sarmak (örn. `WHERE UPPER(status) = 'FAIL'` veya `WHERE YEAR(created_at) = 2024`) veritabanının normal index'i kullanmasını engeller, çünkü index ham kolon değerleri üzerine kuruludur, fonksiyonun sonucu üzerine değil — bu yaygın bir \"neden index'im hâlâ çalışmıyor\" tuzağıdır. Çözüm genelde sorguyu fonksiyon kullanmadan yeniden yazmak veya bir functional/expression index oluşturmaktır.",
            "en": "Wrapping a column in a function (e.g. `WHERE UPPER(status) = 'FAIL'` or `WHERE YEAR(created_at) = 2024`) prevents the database from using a normal index, because the index is built on the raw column values, not the function's result — this is a common \"why isn't my index working\" trap. The fix is usually to rewrite the query without the function, or create a functional/expression index."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "INNER JOIN ile LEFT JOIN arasındaki fark nedir? Bir QA mühendisi olarak bu farkı test senaryolarında nasıl kullanırsın? Sektöre yeni giren birine anlat.",
        "promptEn": "What is the difference between INNER JOIN and LEFT JOIN? As a QA engineer, how would you use this difference in test scenarios? Explain to a newcomer.",
        "keywords": [
          [
            "eşleşen",
            "matching",
            "inner"
          ],
          [
            "null",
            "boş"
          ],
          [
            "sol",
            "left",
            "hepsi",
            "all left"
          ],
          [
            "kayıt",
            "row",
            "satır"
          ],
          [
            "test",
            "doğrula",
            "verify"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INNER JOIN sadece her iki tabloda da eşleşen satırları döndürür. Örneğin her böcek mutlaka bir test uzmanına atanmışsa INNER JOIN kullanırsın. LEFT JOIN ise sol tablodaki tüm satırları döndürür; sağ tabloda eşleşme yoksa NULL gelir. QA açısından: henüz hiç bug'ı olmayan test uzmanlarını bulmak için LEFT JOIN kullanırsın — çünkü INNER JOIN onları sonuçtan çıkarır.",
        "modelAnswerEn": "INNER JOIN returns only rows that match in both tables. LEFT JOIN returns ALL rows from the left table; where there is no match in the right table, NULLs are returned. As a QA engineer: use LEFT JOIN to find testers with no assigned bugs (INNER JOIN would exclude them from the result entirely — which is wrong for that use case)."
      }
    ]
  },
  {
    "title": "🔗 Ecosystem",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": "The relational database ecosystem is vast. In test automation, you will frequently encounter SQLite, PostgreSQL, and MySQL. Understanding these engines, their drivers, and ORM layers is essential for test architecture."
      },
      {
        "type": "heading",
        "text": "Database Engines Compared"
      },
      {
        "type": "table",
        "headers": [
          "Feature / Database",
          "SQLite",
          "PostgreSQL",
          "MySQL"
        ],
        "rows": [
          [
            "Architecture",
            "Serverless (Single file)",
            "Client-Server (Process)",
            "Client-Server (Thread-based)"
          ],
          [
            "QA Use Case",
            "Local testing, mock databases, mobile apps",
            "Enterprise testing, heavy transactions",
            "Web apps, high-concurrency databases"
          ],
          [
            "Concurrency",
            "Single writer lock",
            "Advanced MVCC (High concurrency)",
            "Row-level locking"
          ]
        ]
      },
      {
        "type": "heading",
        "text": "Database Drivers (Connectors)"
      },
      {
        "type": "text",
        "content": "Drivers are the translators that allow programming languages to communicate with the database engine. For test automation, you need language-specific libraries to execute queries and retrieve test results."
      },
      {
        "type": "comparison",
        "title": "Database Connectors side-by-side",
        "left": {
          "label": "Python Connectors",
          "code": "# SQLite (Standard library)\nimport sqlite3\nconn = sqlite3.connect(\"test.db\")\ncursor = conn.cursor()\ncursor.execute(\"SELECT name FROM users WHERE id = ?\", (1,))\nrow = cursor.fetchone()\n\n# PostgreSQL (Requires pip install psycopg2)\nimport psycopg2\nconn = psycopg2.connect(\"postgresql://user:pass@host:5432/db\")\n",
          "note": "Python's sqlite3 comes built-in. Other databases require external packages."
        },
        "right": {
          "label": "Java JDBC Connectors",
          "code": "// SQLite Connection\nConnection conn = DriverManager.getConnection(\"jdbc:sqlite:test.db\");\n\n// PostgreSQL Connection\nConnection conn = DriverManager.getConnection(\n    \"jdbc:postgresql://host:5432/db\", \"user\", \"pass\"\n);\nPreparedStatement pstmt = conn.prepareStatement(\n    \"SELECT name FROM users WHERE id = ?\"\n);\npstmt.setInt(1, 1);\nResultSet rs = pstmt.executeQuery();\n",
          "note": "Java uses JDBC. Drivers must be added to pom.xml/build.gradle dependencies."
        }
      },
      {
        "type": "heading",
        "text": "ORM (Object-Relational Mapping)"
      },
      {
        "type": "text",
        "content": "ORMs map database tables to object-oriented classes. While useful for app development, for QA test automation, raw SQL queries are often preferred because they are faster, simpler, and less brittle than configuring and maintaining complex ORM mappings."
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🔌",
        "title": {
          "tr": "Veritabanı Ekosistemi: Motorlar, Sürücüler ve ORM",
          "en": "Database Ecosystem: Engines, Drivers, and ORMs"
        },
        "content": {
          "tr": "Veritabanı mimarisinde katmanlar arası iletişim şu bileşenlerle sağlanır:\n\n- **Veritabanı Motoru (Engine)**: Veriyi yöneten sunucudur (örn: PostgreSQL, MySQL).\n- **Sürücü (Driver)**: Programlama dilinin veritabanına bağlanmasını sağlayan kütüphanedir. Python sqlite3 sürücüsü yerleşik gelirken, PostgreSQL için `psycopg2`, Java için ise Maven/Gradle ile JDBC sürücüsü eklenmelidir.\n- **ORM (Object-Relational Mapping)**: Tabloları kod nesnelerine eşler. QA otomasyon testlerinde (test verisi ekleme/temizleme vb.) ORM modellerinin kurulumu karmaşık olduğundan, ham SQL kullanımı daha basit ve hızlıdır.",
          "en": "Database architectures rely on structured communication layers:\n\n- **Database Engine**: The server system managing physical data and execution (e.g., PostgreSQL, MySQL).\n- **Driver**: The connector library bridging your programming language and the engine. Python's sqlite3 driver is built-in, whereas PostgreSQL needs `psycopg2` and Java requires a database-specific JDBC dependency.\n- **ORM**: Maps rows directly to code objects. While great for backend development, QA automation scripts generally prefer raw SQL for seeding and cleaning test data due to lower setup complexity and execution speed."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Bir veritabanı motoru (Database Engine) ile veritabanı sürücüsü (Database Driver) arasındaki fark nedir?",
          "en": "What is the difference between a Database Engine and a Database Driver?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Sürücü verileri diskte saklar, motor ise sorguları analiz eder",
              "en": "The driver stores data on disk, while the engine parses queries"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Motor veritabanının kendisidir (PostgreSQL, MySQL); sürücü ise test scriptimizin (Python/Java) motorla konuşmasını sağlayan kütüphanedir (psycopg2, JDBC)",
              "en": "The engine is the database server itself (PostgreSQL, MySQL); the driver is the library (psycopg2, JDBC) that lets our test script talk to the server"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sürücü sadece SQL yazmak için kullanılır",
              "en": "The driver is only used for writing SQL"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Motor sadece bulutta çalışır",
              "en": "The engine only runs in the cloud"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Veritabanı motoru (Server) sorguları çalıştırır ve veriyi yönetir. Sürücü (Driver) ise programlama dilinin veritabanına bağlanıp komut göndermesi için kullandığı çevirici/köprüdür.",
          "en": "The engine is the actual database system (PostgreSQL/MySQL server) storing and processing data. The driver is the language-specific library (like Python's psycopg2 or Java's JDBC connector) facilitating communication between application code and the engine."
        },
        "retryQuestion": {
          "question": {
            "tr": "Test otomasyonunda ORM (Object-Relational Mapping) araçlarını (örn: SQLAlchemy, Hibernate) kullanmanın doğrudan SQL yazmaya göre temel dezavantajı nedir?",
            "en": "What is the main disadvantage of using ORM frameworks (e.g. SQLAlchemy, Hibernate) in QA automation compared to raw SQL queries?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "ORM'lerin veritabanına bağlanamaması",
                "en": "ORMs being unable to connect to the database"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Karmaşık nesne-ilişki eşlemeleri (mapping) gerektirmeleri, daha yavaş çalışmaları ve test verisi seed/cleanup işlemlerinde ham SQL kadar pratik olmamaları",
                "en": "They require complex mapping configurations, add execution overhead, and are less direct for quick test data seeding/cleanup than raw SQL"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sadece Java dillerinde çalışmaları",
                "en": "Only working in Java languages"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "İndexleri tamamen devre dışı bırakmaları",
                "en": "Disabling indexes completely"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "ORM araçları uygulama geliştirme için harikadır ancak test otomasyonunda hız, sadelik ve esneklik ön plandadır. Ham SQL sorguları atmak, karmaşık ORM modelleri kurup sürdürmekten çok daha pratiktir.",
            "en": "ORMs add configuration complexity and object lifecycle overhead. For QA scripts, which mostly perform straightforward data seeding, assertions, and cleanup, direct SQL execution is much simpler and faster."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Veritabanı motoru (Engine), veritabanı sürücüsü (Driver) ve ORM (Object-Relational Mapping) kavramlarını ve bunların otomasyon test mimarisindeki rollerini açıklayın.",
        "promptEn": "Explain the concepts of a database Engine, Driver, and ORM, and their roles in test automation architecture.",
        "keywords": [
          [
            "engine",
            "motor"
          ],
          [
            "driver",
            "sürücü"
          ],
          [
            "orm"
          ],
          [
            "connect",
            "bağlan"
          ],
          [
            "mapping",
            "eşle"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Veritabanı motoru (örn. PostgreSQL) veriyi yönetir. Sürücü (driver, örn. psycopg2), test kodumuzun motorla konuşmasını sağlayan kütüphanedir. ORM ise tabloları nesnelere eşler; ancak testlerde genelde ham SQL daha pratik ve hızlıdır.",
        "modelAnswerEn": "The engine (e.g. PostgreSQL) manages data. The driver (e.g. psycopg2) is the connector library allowing test scripts to talk to the engine. An ORM maps tables to code objects; though raw SQL is often preferred in testing for speed and simplicity."
      }
    ]
  },
  {
    "title": "🚨 Troubleshooting",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🚨",
        "content": "Database operations frequently encounter errors due to constraints or locking issues. For a QA engineer, reading error messages and finding the root cause is a critical skill."
      },
      {
        "type": "heading",
        "text": "SQL Error Dictionary"
      },
      {
        "type": "error-dictionary",
        "framework": "SQL",
        "errors": [
          {
            "error": "UNIQUE constraint failed: table.column",
            "fullMessage": "UNIQUE constraint failed: users.email",
            "cause": {
              "tr": "Aynı email/id gibi eşsiz (UNIQUE) kısıtlama olan bir sütuna tekrar eden değer eklemeye çalışıyorsunuz. PRIMARY KEY ihlali de aynı hatayı verir.",
              "en": "You are inserting a duplicate value into a column with a UNIQUE constraint (e.g., email, username). A PRIMARY KEY violation produces the same error."
            },
            "solution": {
              "tr": "1) INSERT IGNORE (MySQL) veya INSERT OR IGNORE (SQLite) kullanın. 2) ON CONFLICT DO NOTHING / DO UPDATE ekleyin. 3) INSERT öncesinde SELECT ile kontrol edin.",
              "en": "1) Use INSERT IGNORE (MySQL) or INSERT OR IGNORE (SQLite). 2) Add ON CONFLICT DO NOTHING / DO UPDATE. 3) Check with SELECT before INSERT."
            },
            "codeWrong": "-- YANLIŞ — tekrar eden email ekliyor\nINSERT INTO users (id, email) VALUES (1, 'a@test.com');\nINSERT INTO users (id, email) VALUES (2, 'a@test.com'); -- HATA",
            "codeFixed": "-- DOĞRU — çakışmada güncelle (upsert)\nINSERT INTO users (id, email)\nVALUES (2, 'a@test.com')\nON CONFLICT(email) DO UPDATE SET id = excluded.id;\n\n-- veya sadece yok say:\nINSERT OR IGNORE INTO users (id, email) VALUES (2, 'a@test.com');"
          },
          {
            "error": "FOREIGN KEY constraint failed",
            "fullMessage": "FOREIGN KEY constraint failed",
            "cause": {
              "tr": "Parent tabloda olmayan bir değere referans veren kayıt eklemeye çalışıyorsunuz. Örneğin: var olmayan bir user_id ile order eklemek.",
              "en": "You are trying to insert a row that references a value that does not exist in the parent table. E.g., adding an order with a non-existent user_id."
            },
            "solution": {
              "tr": "1) Önce parent kaydı ekleyin. 2) PRAGMA foreign_keys = ON ile FK denetimini etkinleştirin (SQLite'de varsayılan kapalı). 3) INSERT sırasını parent → child olarak düzenleyin.",
              "en": "1) Insert the parent record first. 2) Enable FK checking: PRAGMA foreign_keys = ON (SQLite defaults to OFF). 3) Order INSERTs parent → child."
            },
            "codeWrong": "-- YANLIŞ — users tablosunda id=999 yok\nINSERT INTO orders (id, user_id) VALUES (1, 999); -- HATA",
            "codeFixed": "-- DOĞRU — önce parent'ı ekle\nINSERT INTO users (id, name) VALUES (999, 'Alice');\nINSERT INTO orders (id, user_id) VALUES (1, 999); -- OK\n\n-- SQLite'de FK denetimini etkinleştir:\nPRAGMA foreign_keys = ON;"
          },
          {
            "error": "NOT NULL constraint failed: table.column",
            "fullMessage": "NOT NULL constraint failed: employees.email",
            "cause": {
              "tr": "NOT NULL kısıtlamalı bir sütuna NULL değer eklemeye ya da bu sütunu INSERT sorgusunda atlamaya çalışıyorsunuz.",
              "en": "You are inserting NULL into a column with a NOT NULL constraint, or omitting a column that has no DEFAULT and is NOT NULL."
            },
            "solution": {
              "tr": "1) Sütun için değer sağlayın. 2) Sütuna DEFAULT değeri tanımlayın. 3) Şemayı gözden geçirin: o sütun gerçekten zorunlu mu?",
              "en": "1) Provide a value for the column. 2) Add a DEFAULT to the column definition. 3) Review the schema — does that column really need to be required?"
            },
            "codeWrong": "-- YANLIŞ — email NOT NULL ama değer verilmedi\nINSERT INTO employees (id, name) VALUES (1, 'Bob'); -- HATA",
            "codeFixed": "-- DOĞRU — tüm NOT NULL sütunlara değer ver\nINSERT INTO employees (id, name, email)\nVALUES (1, 'Bob', 'bob@company.com');\n\n-- veya default ekle:\n-- email TEXT NOT NULL DEFAULT 'unknown@company.com'"
          },
          {
            "error": "syntax error near '...'",
            "fullMessage": "near \"FORM\": syntax error",
            "cause": {
              "tr": "SQL yazım hatası: yanlış yazılmış keyword (FROM yerine FORM), virgül eksikliği, fazladan parantez veya rezerve kelime kullanımı.",
              "en": "SQL syntax mistake: misspelled keyword (FORM instead of FROM), missing comma, extra parenthesis, or using a reserved word as a column/table name."
            },
            "solution": {
              "tr": "1) Keyword yazımını kontrol edin. 2) SELECT listesinde virgülleri kontrol edin. 3) Rezerve kelimeler tablo/sütun adı olarak kullanılıyorsa backtick veya çift tırnak ile sarın.",
              "en": "1) Check keyword spelling. 2) Check commas in the SELECT list. 3) If using reserved words as identifiers, wrap them in backticks or double quotes."
            },
            "codeWrong": "-- YANLIŞ — FROM yerine FORM yazılmış\nSELECT name FORM users WHERE id = 1; -- syntax error",
            "codeFixed": "-- DOĞRU — keyword doğru yazılmış\nSELECT name FROM users WHERE id = 1;\n\n-- Rezerve kelime kullanımı:\nSELECT `order`, `select` FROM my_table;  -- backtick ile sarılmış"
          },
          {
            "error": "no such table: table_name",
            "fullMessage": "no such table: test_results",
            "cause": {
              "tr": "Sorgu var olmayan bir tabloyu referans alıyor. Tablo henüz oluşturulmamış, yanlış yazılmış veya farklı bir veritabanı bağlantısında oluşturulmuş olabilir.",
              "en": "The query references a table that does not exist. The table may not have been created, misspelled, or created in a different database connection."
            },
            "solution": {
              "tr": "1) CREATE TABLE ile tabloyu oluşturun. 2) Tablo adının yazımını kontrol edin. 3) Doğru veritabanına bağlandığınızı doğrulayın. SQLite'de: SELECT name FROM sqlite_master WHERE type='table';",
              "en": "1) Create the table with CREATE TABLE. 2) Check the table name spelling. 3) Verify you are connected to the correct database. In SQLite: SELECT name FROM sqlite_master WHERE type='table';"
            },
            "codeWrong": "-- YANLIŞ — tablo henüz oluşturulmamış\nSELECT * FROM test_results; -- no such table",
            "codeFixed": "-- DOĞRU — önce tabloyu oluştur\nCREATE TABLE IF NOT EXISTS test_results (\n  id      INTEGER PRIMARY KEY,\n  name    TEXT NOT NULL,\n  status  TEXT NOT NULL,\n  run_at  TEXT\n);\nSELECT * FROM test_results;"
          },
          {
            "error": "ambiguous column name: column",
            "fullMessage": "ambiguous column name: id",
            "cause": {
              "tr": "JOIN sorgusunda aynı sütun adı birden fazla tabloda bulunuyor ve hangi tablodan geldiği belirtilmemiş.",
              "en": "In a JOIN query, the same column name exists in multiple joined tables and it is not specified which table the column comes from."
            },
            "solution": {
              "tr": "Tablo adı veya alias ile tam nitelendirme (qualification) kullanın: users.id veya u.id gibi.",
              "en": "Use full qualification with table name or alias: users.id or u.id."
            },
            "codeWrong": "-- YANLIŞ — her iki tabloda da \"id\" var\nSELECT id, name FROM users JOIN orders ON users.id = orders.user_id;\n-- ambiguous column name: id",
            "codeFixed": "-- DOĞRU — tablo adıyla nitelendir\nSELECT users.id, users.name, orders.id AS order_id\nFROM users\nJOIN orders ON users.id = orders.user_id;\n\n-- veya alias kullan:\nSELECT u.id, u.name, o.id AS order_id\nFROM users u\nJOIN orders o ON u.id = o.user_id;"
          },
          {
            "error": "table has N columns but M values were supplied",
            "fullMessage": "table users has 4 columns but 3 values were supplied",
            "cause": {
              "tr": "INSERT sorgusunda sütun listesi ile VALUES listesindeki eleman sayısı eşleşmiyor.",
              "en": "The number of columns listed in the INSERT does not match the number of values supplied in VALUES."
            },
            "solution": {
              "tr": "INSERT'te sütun listesini açıkça belirtin ve VALUES ile sayısının eşleştiğinden emin olun.",
              "en": "Explicitly list the column names in INSERT and ensure VALUES count matches."
            },
            "codeWrong": "-- YANLIŞ — 4 sütun var ama 3 değer veriliyor\n-- Tablo: users (id, name, email, role)\nINSERT INTO users VALUES (1, 'Alice', 'alice@test.com'); -- HATA",
            "codeFixed": "-- DOĞRU — sütun isimlerini açıkça belirt\nINSERT INTO users (id, name, email)\nVALUES (1, 'Alice', 'alice@test.com');\n-- role sütunu NULL alır (ya da DEFAULT değeri)"
          },
          {
            "error": "Lock wait timeout exceeded; try restarting transaction",
            "fullMessage": "ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction",
            "cause": {
              "tr": "Başka bir transaction aynı satırı/tabloyu kilitlemiş ve sizin sorgunuz bu kilidin açılmasını beklerken zaman aşımına uğramış.",
              "en": "Another active transaction holds a lock (usually an Exclusive lock from UPDATE/DELETE) on the target row/table, and your current query timed out waiting for it to release."
            },
            "solution": {
              "tr": "1) Uzun süren veya açık bırakılmış transaction'ları bulun ve sonlandırın (COMMIT/ROLLBACK). 2) Otomasyon testlerinde bağlantıları kapatıp açarak havuzları temizleyin. 3) Kilit zaman aşımı süresini artırın.",
              "en": "1) Find and terminate long-running or uncommitted transactions (run COMMIT or ROLLBACK). 2) Ensure automation tests close connections properly to clear pools. 3) Increase the lock timeout threshold if necessary."
            },
            "codeWrong": "-- YANLIŞ — Açık bırakılan kilitli transaction (COMMIT edilmemiş)\nSTART TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- Test yarıda kesildi veya bağlantı açık kaldı (COMMIT/ROLLBACK yok)\n\n-- Eşzamanlı başka sorgu bekler ve hata verir:\nUPDATE users SET status = 'DONE' WHERE id = 1; -- HATA: Lock wait timeout",
            "codeFixed": "-- DOĞRU — Transaction'ı her zaman güvenli şekilde bitirin\nSTART TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\nCOMMIT; -- Kilidi kaldır\n\n-- Eşzamanlı sorgu artık anında çalışır:\nUPDATE users SET status = 'DONE' WHERE id = 1; -- OK"
          }
        ]
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🚨",
        "title": {
          "tr": "Veritabanı Hatalarını Giderme (Troubleshooting)",
          "en": "Database Troubleshooting and Constraints"
        },
        "content": {
          "tr": "Otomasyon testleri sırasında karşılaşılan yaygın veritabanı hataları şunlardır:\n\n- **Lock Wait Timeout Exceeded**: Eşzamanlı iki işlem aynı satırı güncellemeye çalıştığında oluşur. Bir test açık transaction bırakırsa (COMMIT/ROLLBACK unutulursa) sonraki test satır kilidi (row lock) nedeniyle bekler ve zaman aşımına uğrar.\n- **FOREIGN KEY Constraint Failed**: İlişkili tablolarda parent tabloda var olmayan bir kimlik (id) değeriyle child tabloya veri eklenmeye çalışıldığında ortaya çıkar. Sıralı ekleme yapılmalıdır.",
          "en": "QA engineers frequently encounter these common constraint and lock errors in automated pipelines:\n\n- **Lock Wait Timeout Exceeded**: Occurs when concurrent processes attempt to modify the same rows. If a previous test leaves a transaction open (fails to run COMMIT/ROLLBACK), subsequent tests will hang waiting for row locks and eventually time out.\n- **FOREIGN KEY Constraint Failed**: Triggered when attempting to write a child record referencing an ID that does not exist in the parent table. Fix by creating the parent record first."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Otomasyon testleri çalışırken \"Lock wait timeout exceeded; try restarting transaction\" hatası aldığınızda ilk bakmanız gereken durum nedir?",
          "en": "When your automation tests throw \"Lock wait timeout exceeded; try restarting transaction\", what is the first thing you should investigate?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Veritabanında yeterli disk alanı olup olmadığı",
              "en": "Whether there is enough disk space on the database server"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Başka bir test veya işlemin aynı satırları kilitlediği (veya açık bir transaction bıraktığı) ve bizim testimizin kilidin açılmasını beklerken zaman aşımına uğradığı",
              "en": "Whether another test or process is locking the same rows (or left an open transaction), causing our test to time out waiting for the lock"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "SQL syntax yazım hatası olup olmadığı",
              "en": "Whether there is a SQL syntax error in the query"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Bağlantı dizesinin (connection string) yanlış yazılması",
              "en": "Whether the connection string has a typo"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Veritabanları eşzamanlı yazma isteklerini kuyruğa sokmak için satır kilitleri (row locks) kullanır. Bir transaction açık kalırsa veya kilit açılmazsa, diğer sorgular bekler ve sonunda Lock wait timeout hatası fırlatır.",
          "en": "This error indicates lock contention. Another active transaction holds a lock (usually Exclusive lock from UPDATE/DELETE) on the target row/table, and your current query timed out waiting for it to release."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir test otomasyon pipeline'ında \"FOREIGN KEY constraint failed\" hatası görüyorsanız, sorun ne olabilir?",
            "en": "If you see \"FOREIGN KEY constraint failed\" in your test automation pipeline, what is the likely cause?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Tablonun silinmiş olması",
                "en": "The table being dropped"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "İlişkili (parent) tabloda karşılığı olmayan bir id ile child tabloya veri eklemeye çalışılması",
                "en": "Trying to insert a record in a child table with a foreign key ID that does not exist in the parent table"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Verinin UNIQUE kısıtlamasını ihlal etmesi",
                "en": "The data violating a UNIQUE constraint"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sorgunun SELECT * ile çekilmesi",
                "en": "The query performing a SELECT *"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Yabancı Anahtar (FOREIGN KEY) kısıtlaması referans bütünlüğünü korur. Parent tabloda id=5 yoksa, child tabloya (siparişler vb.) user_id=5 ile kayıt eklenemez, veritabanı motoru bunu engeller.",
            "en": "Referential integrity constraint prevents adding records in a child table if the referenced parent record is missing. For example, creating an order for a user_id that does not exist in the users table."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Otomasyon testleri sırasında karşılaşılan \"UNIQUE constraint failed\" ve \"FOREIGN KEY constraint failed\" kısıtlama hatalarının nedenlerini ve çözüm yollarını açıklayın.",
        "promptEn": "Explain the causes and resolutions for \"UNIQUE constraint failed\" and \"FOREIGN KEY constraint failed\" constraint errors encountered during automation tests.",
        "keywords": [
          [
            "unique",
            "benzersiz"
          ],
          [
            "foreign",
            "key",
            "yabancı"
          ],
          [
            "constraint",
            "kısıt"
          ],
          [
            "parent",
            "child",
            "ilişki"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "UNIQUE hatası, eşsiz olması gereken bir sütuna tekrarlanan veri eklenirse alınır. Çözümü veriyi değiştirmek veya ON CONFLICT eklemektir. FOREIGN KEY hatası, parent tabloda karşılığı olmayan bir id ile child tabloya kayıt eklenmeye çalışıldığında alınır; sırayla eklenmelidir.",
        "modelAnswerEn": "UNIQUE errors occur when inserting duplicate values in a unique column (fix by checking data or using ON CONFLICT). FOREIGN KEY errors happen when inserting a child record referencing a non-existent parent key (fix by inserting parent first)."
      }
    ]
  },
  {
    "title": "☕ Java → SQL",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "☕",
        "content": "This section consolidates all database connection, query execution, and transaction management concepts in Java (JDBC) vs SQL. Essential for QA engineers writing Selenium/RestAssured tests in Java."
      },
      {
        "type": "heading",
        "text": "☕ If You Know Java: Database Connection Bridge"
      },
      {
        "type": "java-compare",
        "topic": "DB Connection Setup (DriverManager vs sqlite3)",
        "why": "Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.",
        "why_en": "Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.",
        "java": "// Java: JDBC connection via DriverManager\nimport java.sql.*;\n\n// Open connection (MySQL example):\nConnection conn = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/testdb\",\n    \"root\", \"password\"\n);\nStatement stmt = conn.createStatement();\nResultSet rs   = stmt.executeQuery(\"SELECT * FROM users\");\n\n// ALWAYS close — use try-with-resources:\ntry (Connection c = DriverManager.getConnection(url, user, pass)) {\n    Statement s = c.createStatement();\n    ResultSet r = s.executeQuery(\"SELECT COUNT(*) FROM users\");\n}   // auto-closed here",
        "python": "# Python: sqlite3 — BUILT-IN, zero install!\nimport sqlite3\n\nconn = sqlite3.connect(\"test.db\")  # creates file if not exists\ncursor = conn.cursor()\ncursor.execute(\"SELECT * FROM users\")\nrows = cursor.fetchall()           # list of tuples\nconn.close()\n\n# Context manager = try-with-resources:\nwith sqlite3.connect(\"test.db\") as conn:\n    cursor = conn.cursor()\n    cursor.execute(\"SELECT COUNT(*) FROM users\")\n    count = cursor.fetchone()[0]\n# conn auto-closed after with block\n\n# PostgreSQL (pip install psycopg2-binary):\nimport psycopg2\nconn = psycopg2.connect(\n    host=\"localhost\", dbname=\"testdb\",\n    user=\"postgres\", password=\"secret\"\n)",
        "note": "sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency.",
        "note_en": "sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency."
      },
      {
        "type": "java-compare",
        "topic": "Dependency Setup (Maven pom.xml vs pip)",
        "why": "In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.",
        "why_en": "In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.",
        "java": "<!-- Java: pom.xml — add JDBC driver dependency -->\n<dependencies>\n\n  <!-- MySQL -->\n  <dependency>\n    <groupId>mysql</groupId>\n    <artifactId>mysql-connector-java</artifactId>\n    <version>8.0.33</version>\n  </dependency>\n\n  <!-- PostgreSQL -->\n  <dependency>\n    <groupId>org.postgresql</groupId>\n    <artifactId>postgresql</artifactId>\n    <version>42.6.0</version>\n  </dependency>\n\n</dependencies>\n<!-- then: mvn install -->",
        "python": "# Python: pip — no config file needed at all!\n\n# SQLite: NOTHING — built in to Python!\nimport sqlite3           # works with zero setup\n\n# MySQL:\n# pip install mysql-connector-python\nimport mysql.connector\n\n# PostgreSQL:\n# pip install psycopg2-binary\nimport psycopg2\n\n# requirements.txt (optional, like pom.xml):\n# psycopg2-binary==2.9.9\n# mysql-connector-python==8.2.0",
        "note": "Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything.",
        "note_en": "Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything."
      },
      {
        "type": "heading",
        "text": "☕ If You Know Java: Database Access Bridge"
      },
      {
        "type": "java-compare",
        "topic": "DB Connection (DriverManager vs sqlite3)",
        "why": "Java uses JDBC DriverManager with a URL + credentials. Python uses lightweight driver modules (sqlite3 is built-in, psycopg2 for PostgreSQL). The connection pattern is the same — the API differs.",
        "java": "// Java: JDBC connection\nimport java.sql.*;\nConnection conn = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/mydb\",\n    \"username\", \"password\"\n);\n// Always close — use try-with-resources:\ntry (Connection c = DriverManager.getConnection(url, user, pass)) {\n    // use c here — auto-closed\n}",
        "python": "# Python: sqlite3 (built-in, zero install!)\nimport sqlite3\nconn = sqlite3.connect(\"mydb.sqlite\")\n\n# PostgreSQL:\nimport psycopg2\nconn = psycopg2.connect(\n    host=\"localhost\", dbname=\"mydb\",\n    user=\"username\", password=\"password\"\n)\n\n# Context manager — auto-closes like try-with-resources:\nwith sqlite3.connect(\"mydb.sqlite\") as conn:\n    cursor = conn.cursor()",
        "note": "Python sqlite3 is built into Python — no pip install. For MySQL: mysql-connector-python; PostgreSQL: psycopg2."
      },
      {
        "type": "java-compare",
        "topic": "Executing SELECT → Iterating Results",
        "why": "Java uses ResultSet with rs.next() loop and column-by-name getters. Python cursor.fetchall() returns a simple list of tuples — far less boilerplate.",
        "java": "// Java: Statement + ResultSet\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery(\n    \"SELECT test_name, status FROM test_results WHERE status='FAIL'\"\n);\nwhile (rs.next()) {\n    String name = rs.getString(\"test_name\");\n    String status = rs.getString(\"status\");\n    System.out.println(name + \" → \" + status);\n}\nrs.close(); stmt.close();",
        "python": "# Python: cursor + fetchall\ncursor = conn.cursor()\ncursor.execute(\n    \"SELECT test_name, status FROM test_results WHERE status='FAIL'\"\n)\nrows = cursor.fetchall()  # list of tuples\nfor name, status in rows:\n    print(f\"{name} → {status}\")\n\n# Single row — like rs.next() once:\ncursor.execute(\"SELECT COUNT(*) FROM test_results\")\ncount = cursor.fetchone()[0]",
        "note": "cursor.fetchall() returns all rows as a list of tuples. cursor.fetchone() returns one row or None — equivalent to rs.next() called once."
      },
      {
        "type": "heading",
        "text": "☕ If You Know Java: DML Operations Bridge"
      },
      {
        "type": "java-compare",
        "topic": "INSERT → JPA persist() vs SQL INSERT INTO",
        "why": "In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.",
        "why_en": "In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.",
        "java": "// Java: JPA EntityManager\n@Entity\n@Table(name = \"test_results\")\npublic class TestResult {\n    @Id @GeneratedValue(strategy = IDENTITY)\n    private Long id;\n    private String testName;\n    private String status;\n}\n\n// Insert: no SQL needed — JPA generates it\nEntityManager em = emf.createEntityManager();\nem.getTransaction().begin();\nTestResult r = new TestResult();\nr.setTestName(\"Login Test\");\nr.setStatus(\"PASS\");\nem.persist(r);          // ← generates: INSERT INTO test_results ...\nem.getTransaction().commit();",
        "sql": "-- Direct SQL: you write it yourself\nINSERT INTO test_results (test_name, status, duration_ms)\nVALUES ('Login Test', 'PASS', 1234);\n\n-- Multiple rows at once (JPA needs a loop or batch):\nINSERT INTO test_results (test_name, status, duration_ms) VALUES\n    ('Signup Test',   'PASS', 890),\n    ('Checkout Flow', 'FAIL', 5400);\n\n-- Copy rows (JPA: query + persist loop):\nINSERT INTO test_archive\nSELECT * FROM test_results WHERE run_date < '2024-01-01';",
        "note": "SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity.",
        "note_en": "SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity."
      },
      {
        "type": "java-compare",
        "topic": "UPDATE/DELETE → JPA merge()/remove() vs SQL",
        "why": "JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.",
        "why_en": "JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.",
        "java": "// Java: JPA update — find then mutate\nEntityManager em = ...;\nem.getTransaction().begin();\n\nTestResult r = em.find(TestResult.class, 3L);  // SELECT first\nr.setStatus(\"PASS\");         // mark as mutated\nem.merge(r);                 // generates: UPDATE test_results SET status='PASS' WHERE id=3\n\n// JPA delete:\nTestResult toDelete = em.find(TestResult.class, 3L);\nem.remove(toDelete);         // generates: DELETE FROM test_results WHERE id=3\n\nem.getTransaction().commit();",
        "sql": "-- SQL UPDATE: direct, no find() needed\nUPDATE test_results\nSET    status = 'PASS'\nWHERE  id = 3;\n\n-- Update multiple rows at once (JPA needs a loop):\nUPDATE test_results\nSET    is_flaky = TRUE\nWHERE  test_name LIKE '%Search%';\n\n-- SQL DELETE: also direct\nDELETE FROM test_results WHERE status = 'SKIP';\n\n-- Safe pattern: SELECT first to verify, then DELETE\nSELECT * FROM test_results WHERE environment = 'cleanup';\nDELETE FROM test_results WHERE environment = 'cleanup';",
        "note": "SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common.",
        "note_en": "SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common."
      },
      {
        "type": "heading",
        "text": "☕ If You Know Java: PreparedStatement & Transactions"
      },
      {
        "type": "java-compare",
        "topic": "PreparedStatement → Parameterized Query",
        "why": "SQL Injection prevention! Java uses ? placeholders with PreparedStatement. Python uses the same concept — %s (MySQL/PostgreSQL) or ? (SQLite). Never concatenate user input into SQL strings!",
        "java": "// Java: PreparedStatement — SQL injection safe!\nString sql = \"SELECT * FROM users WHERE email = ? AND is_active = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, userEmail);   // 1-indexed params\nps.setBoolean(2, true);\nResultSet rs = ps.executeQuery();\n\n// INSERT with PreparedStatement:\nPreparedStatement ins = conn.prepareStatement(\n    \"INSERT INTO test_results (test_name, status) VALUES (?, ?)\"\n);\nins.setString(1, testName);\nins.setString(2, \"PASS\");\nins.executeUpdate();",
        "python": "# Python: parameterized query (%s for MySQL/psycopg2)\ncursor.execute(\n    \"SELECT * FROM users WHERE email = %s AND is_active = %s\",\n    (user_email, True)   # tuple of values — NOT f-string!\n)\n\n# SQLite uses ? (same as Java PreparedStatement):\ncursor.execute(\n    \"SELECT * FROM users WHERE email = ? AND is_active = ?\",\n    (user_email, 1)\n)\n\n# INSERT:\ncursor.execute(\n    \"INSERT INTO test_results (test_name, status) VALUES (%s, %s)\",\n    (test_name, \"PASS\")\n)\nconn.commit()  # don't forget!",
        "note": "Python psycopg2/MySQL uses %s. SQLite uses ? (same as Java!). NEVER use f-strings or + concatenation for SQL values — always use parameterized queries."
      },
      {
        "type": "java-compare",
        "topic": "Transaction Management (commit / rollback)",
        "why": "Transactions guarantee all-or-nothing changes — critical for test data setup. Java calls setAutoCommit(false). Python's drivers have auto-commit off by default, so you explicitly call commit().",
        "java": "// Java: manual transaction control\ntry {\n    conn.setAutoCommit(false);  // begin transaction\n    stmt.executeUpdate(\"INSERT INTO orders ...\");\n    stmt.executeUpdate(\"UPDATE inventory SET qty=qty-1 ...\");\n    conn.commit();               // save ALL changes\n} catch (SQLException e) {\n    conn.rollback();             // undo ALL changes\n    throw e;\n} finally {\n    conn.setAutoCommit(true);\n}",
        "python": "# Python: explicit commit / rollback\ntry:\n    cursor.execute(\"INSERT INTO orders ...\")\n    cursor.execute(\"UPDATE inventory SET qty=qty-1 ...\")\n    conn.commit()    # save ALL changes\nexcept Exception:\n    conn.rollback()  # undo ALL changes\n    raise\n\n# Cleanest: \"with\" context manager (psycopg2):\nwith conn:   # auto-commits on success, rolls back on error\n    cursor.execute(\"INSERT INTO orders ...\")\n    cursor.execute(\"UPDATE inventory SET qty=qty-1 ...\")",
        "note": "QA tip: wrap test data setup in a transaction and rollback after each test — keeps the DB clean without writing DELETE cleanup queries."
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "☕",
        "title": {
          "tr": "Java JDBC vs Python Sürücü Yönetimi",
          "en": "Java JDBC vs Python Driver Management"
        },
        "content": {
          "tr": "Java (JDBC) ve Python ile veritabanı testleri yazarken altyapı kurulumları farklılık gösterir:\n\n- **Sürücü Bağımlılıkları**: Python yerleşik `sqlite3` modülüyle sıfır kurulum gerektirirken, Java JDBC API'si standarttır ancak MySQL/PostgreSQL ile konuşabilmesi için Maven (pom.xml) veya Gradle bağımlılıklarına veritabanı sürücüsünü eklemeyi zorunlu kılar.\n- **Parametreli Sorgular**: Java'da `PreparedStatement` (`pstmt.setInt(1, 25)`), Python'da ise parameter binding (`cursor.execute(..., (25,))`) aynı amaca hizmet eder: Kullanıcı verilerini SQL komutlarından ayırarak SQL Injection açığını engeller.",
          "en": "Java (JDBC) and Python approach database connectivity and library management differently:\n\n- **Dependency Management**: Python's `sqlite3` is built-in, requiring no configuration. Java JDBC provides a standard interface but requires declaring vendor-specific database driver jar dependencies in Maven (pom.xml) or Gradle.\n- **Parameter Binding**: Java's `PreparedStatement` (`pstmt.setInt(1, 25)`) and Python's parameter binding (`cursor.execute(..., (25,))`) share the exact same objective: isolating input values from query commands to prevent SQL Injection."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Java JDBC bağlantısı (`DriverManager.getConnection()`) ile Python `sqlite3.connect()` arasındaki kurulum farkı nedir?",
          "en": "What is the main setup difference between Java JDBC (`DriverManager.getConnection()`) and Python `sqlite3.connect()`?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Java hiçbir harici sürücüye ihtiyaç duymaz",
              "en": "Java does not require any external driver"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Python sqlite3 standart kütüphanesinde yerleşiktir (kurulumsuz); Java JDBC için ise pom.xml'e veritabanı sürücü (driver) bağımlılığı eklemek zorunludur",
              "en": "Python's sqlite3 driver is built into the standard library (zero-install); Java JDBC requires declaring a database driver dependency in pom.xml"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Python sadece SQLite destekler, PostgreSQL desteklemez",
              "en": "Python only supports SQLite and not PostgreSQL"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Java transaction yönetimini desteklemez",
              "en": "Java does not support transaction management"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Python'da SQLite ile çalışmaya başlamak için sıfır kuruluma ihtiyaç duyulur (`import sqlite3` yeterlidir). Java'da ise JDBC API'sinin yanına MySQL veya PostgreSQL JDBC Driver bağımlılığını eklemeniz gerekir.",
          "en": "Python includes the sqlite3 module in its core distribution, requiring no installation. In Java, while the JDBC interface is standard, you must declare and download the vendor-specific database driver jar (via Maven/Gradle) to establish connections."
        },
        "retryQuestion": {
          "question": {
            "tr": "Java PreparedStatement (`pstmt.setInt(1, 25)`) ve Python cursor parameter binding (`cursor.execute(..., (25,))`) arasındaki ortak amaç nedir?",
            "en": "What is the shared purpose of Java's PreparedStatement (`pstmt.setInt(1, 25)`) and Python's parameter binding (`cursor.execute(..., (25,))`)?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Sorguların daha yavaş çalışmasını sağlamak",
                "en": "To make queries execute slower"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Kullanıcı girdilerini SQL komutlarından tamamen ayırarak SQL Injection zafiyetini önlemek",
                "en": "To protect against SQL Injection by separating executable query logic from raw user data inputs"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Tabloları otomatik silmek",
                "en": "To drop tables automatically"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Veritabanı şemasını otomatik migrate etmek",
                "en": "To migrate the schema automatically"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Her iki dilde de parametreli sorgu kullanmak, girdileri SQL motoruna sadece veri olarak iletir, asla kod olarak yorumlatmaz. Bu, SQL Injection saldırılarını %100 önleyen en temel güvenlik metodudur.",
            "en": "Both languages bind values separately from the query structure. The SQL engine compiles the template first and treats parameters strictly as values, preventing input strings from breaking the query structure and injecting code."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Java JDBC ile veritabanı bağlantısı kurup sorgu çalıştırmak ile Python sqlite3 kütüphanesi arasındaki kurulum ve bağımlılık (dependency) yönetimi farklarını açıklayın.",
        "promptEn": "Explain the installation and dependency management differences between establishing database connections in Java JDBC and Python sqlite3.",
        "keywords": [
          [
            "jdbc"
          ],
          [
            "sqlite3"
          ],
          [
            "driver",
            "sürücü"
          ],
          [
            "dependency",
            "bağımlılık",
            "pom.xml"
          ],
          [
            "connection",
            "bağlantı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Python sqlite3 modülü standart kütüphanede yerleşiktir, kurulum gerektirmez. Java JDBC ise standart bir API sunar ancak Maven/Gradle (pom.xml) dosyasına çalışılan veritabanı türüne ait sürücü bağımlılığını (driver dependency) eklemek zorunludur.",
        "modelAnswerEn": "Python's sqlite3 is built-in and requires zero installation. Java JDBC provides a standard connection interface but requires declaring vendor-specific database driver dependencies in pom.xml or build.gradle files."
      }
    ]
  },
  {
    "title": "📝 Practice & Reference",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🏋️",
        "content": {
          "tr": "SQL öğrenmek, yüzmeyi kitaptan öğrenmek gibi değil — suya girmek gerekir. Editörü aç, kodu çalıştır, hata al, düzelt. Her alıştırmayı önce kendin çözmeye çalış, sonra çözümü gör.",
          "en": "Learning SQL from reading alone is like learning to swim from a book — you have to get in the water. Open the editor, run the query, make errors, fix them. Try each exercise yourself first, then check the solution."
        }
      },
      {
        "type": "heading",
        "text": "Practice Exercises"
      },
      {
        "type": "exercise",
        "difficulty": "🟢 Beginner",
        "title": "Exercise 1: Query Failed Test Runs",
        "description": "Given a test_runs table with columns: id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date. Write THREE queries: (a) all failed runs today, (b) count of each status, (c) slowest 3 tests.",
        "hint": "Use WHERE status=\"FAIL\" AND DATE(run_date)=CURDATE(). For counts use GROUP BY status. For slowest use ORDER BY duration_ms DESC LIMIT 3.",
        "solution": "-- (a) Failed runs today:\nSELECT test_name, duration_ms, run_date\nFROM test_runs\nWHERE status = 'FAIL'\n  AND DATE(run_date) = CURDATE()\nORDER BY duration_ms DESC;\n\n-- (b) Count by status:\nSELECT status, COUNT(*) AS count\nFROM test_runs\nGROUP BY status\nORDER BY count DESC;\n\n-- (c) Slowest 3 tests:\nSELECT test_name, duration_ms\nFROM test_runs\nORDER BY duration_ms DESC\nLIMIT 3;",
        "explanation": "DATE() extracts just the date part of a DATETIME. CURDATE() returns today. These are MySQL functions — PostgreSQL uses CURRENT_DATE."
      },
      {
        "type": "exercise",
        "difficulty": "🟡 Intermediate",
        "title": "Exercise 2: Multi-Table Join",
        "description": "You have three tables: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Write a query showing: tester name, test case title, status, and run_date — only for tests run in the last 30 days, ordered by most recent first.",
        "hint": "JOIN all 3 tables. users→results on user_id, test_cases→results on test_case_id. Use WHERE run_date >= NOW() - INTERVAL 30 DAY.",
        "solution": "SELECT\n    u.name         AS tester,\n    tc.title       AS test_case,\n    tc.category,\n    r.status,\n    r.run_date\nFROM results r\nJOIN users      u  ON r.user_id      = u.id\nJOIN test_cases tc ON r.test_case_id = tc.id\nWHERE r.run_date >= NOW() - INTERVAL 30 DAY\nORDER BY r.run_date DESC;",
        "explanation": "Start from the \"results\" table (the junction table linking users and test_cases) and JOIN outward. This avoids accidental cartesian products."
      },
      {
        "type": "exercise",
        "difficulty": "🔴 Advanced",
        "title": "Exercise 3: CTE + Window Function — Rank Testers by Pass Rate",
        "description": "Using the results table (user_id, status, sprint), write a query that ranks testers by their pass rate PER SPRINT using a CTE to calculate stats and RANK() window function. Show: sprint, tester name, total tests, pass count, pass rate %, rank within sprint.",
        "hint": "CTE: GROUP BY sprint, user_id to get counts. Then JOIN users for names. Then add RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC).",
        "solution": "WITH sprint_stats AS (\n    SELECT\n        sprint,\n        user_id,\n        COUNT(*)                                  AS total,\n        SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed\n    FROM results\n    GROUP BY sprint, user_id\n),\nsprint_rates AS (\n    SELECT\n        s.sprint,\n        u.name    AS tester,\n        s.total,\n        s.passed,\n        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate\n    FROM sprint_stats s\n    JOIN users u ON s.user_id = u.id\n)\nSELECT\n    sprint,\n    tester,\n    total,\n    passed,\n    pass_rate,\n    RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) AS rank_in_sprint\nFROM sprint_rates\nORDER BY sprint, rank_in_sprint;",
        "explanation": "Two CTEs: first aggregates raw counts, second calculates rate and joins user names. The final SELECT adds the window function. Splitting into CTEs makes each step debuggable."
      },
      {
        "type": "heading",
        "text": "Quick Reference Card"
      },
      {
        "type": "table",
        "headers": [
          "Command",
          "Syntax",
          "Purpose"
        ],
        "rows": [
          [
            "SELECT",
            "SELECT col FROM tbl WHERE cond",
            "Read data from table"
          ],
          [
            "INSERT",
            "INSERT INTO tbl (cols) VALUES (...)",
            "Add new rows"
          ],
          [
            "UPDATE",
            "UPDATE tbl SET col=val WHERE cond",
            "Modify existing rows"
          ],
          [
            "DELETE",
            "DELETE FROM tbl WHERE cond",
            "Remove rows"
          ],
          [
            "CREATE TABLE",
            "CREATE TABLE t (id INT PRIMARY KEY, ...)",
            "Define a new table"
          ],
          [
            "JOIN (INNER)",
            "JOIN t2 ON t1.id = t2.fk",
            "Match rows in both tables"
          ],
          [
            "LEFT JOIN",
            "LEFT JOIN t2 ON t1.id = t2.fk",
            "All left rows + matched right"
          ],
          [
            "GROUP BY",
            "GROUP BY col HAVING COUNT(*) > N",
            "Aggregate + filter groups"
          ],
          [
            "ORDER BY",
            "ORDER BY col DESC LIMIT N",
            "Sort and limit results"
          ],
          [
            "COUNT/SUM/AVG",
            "SELECT COUNT(*), AVG(col)",
            "Aggregate functions"
          ],
          [
            "NULL check",
            "WHERE col IS NULL",
            "Find missing values"
          ],
          [
            "COALESCE",
            "COALESCE(col, default)",
            "Replace NULL with default"
          ],
          [
            "CTE",
            "WITH name AS (SELECT ...) SELECT ...",
            "Named temp subquery"
          ],
          [
            "Window RANK",
            "RANK() OVER (PARTITION BY ... ORDER BY ...)",
            "Rank within groups"
          ],
          [
            "EXPLAIN",
            "EXPLAIN SELECT ...",
            "Show query execution plan"
          ]
        ]
      },
      {
        "type": "tip",
        "content": "Bookmark db-fiddle.com for quick experiments. Always test your WHERE clause with a SELECT before running DELETE or UPDATE — one missing WHERE can wipe your entire table."
      },
      {
        "type": "glossary-section",
        "terms": [
          {
            "term": "Aggregate Function",
            "definition": {
              "tr": "Birden fazla satiri tek bir ozet degere indirgeyen fonksiyon: COUNT, SUM, AVG, MIN, MAX.",
              "en": "A function that reduces multiple rows to a single summary value: COUNT, SUM, AVG, MIN, MAX."
            }
          },
          {
            "term": "AUTO_INCREMENT",
            "definition": {
              "tr": "Her yeni satirda otomatik olarak artan tam sayi. MySQL terimi; SQLite de INTEGER PRIMARY KEY, PostgreSQL de SERIAL.",
              "en": "An integer that automatically increases for each new row. MySQL term; SQLite uses INTEGER PRIMARY KEY, PostgreSQL uses SERIAL."
            }
          },
          {
            "term": "CTE (Common Table Expression)",
            "definition": {
              "tr": "WITH keyword u ile tanimlanan gecici adlandirilmis sorgu. Tek bir sorguda birden fazla kez referans alinabilir.",
              "en": "A temporary named query defined with the WITH keyword. Can be referenced multiple times within a single query."
            }
          },
          {
            "term": "COALESCE",
            "definition": {
              "tr": "Arguman listesindeki ilk NULL olmayan degeri dondurur. NULL icin varsayilan deger saglamak icin kullanilir.",
              "en": "Returns the first non-NULL value in an argument list. Used to provide a fallback value for NULL."
            }
          },
          {
            "term": "Correlated Subquery",
            "definition": {
              "tr": "Dis sorgunun bir sutununa referans veren alt sorgu. Dis sorgunun her satiri icin bir kez calisir — yavas olabilir.",
              "en": "A subquery that references a column from the outer query. Runs once per outer row — can be slow."
            }
          },
          {
            "term": "DDL",
            "definition": {
              "tr": "Data Definition Language: CREATE, ALTER, DROP gibi sema yapisini degistiren SQL komutlari.",
              "en": "Data Definition Language: SQL commands that change schema structure, like CREATE, ALTER, DROP."
            }
          },
          {
            "term": "DML",
            "definition": {
              "tr": "Data Manipulation Language: INSERT, UPDATE, DELETE, SELECT gibi veriyi degistiren SQL komutlari.",
              "en": "Data Manipulation Language: SQL commands that modify data, like INSERT, UPDATE, DELETE, SELECT."
            }
          },
          {
            "term": "EXPLAIN",
            "definition": {
              "tr": "Bir sorgunun nasil yurutulegini gosteren komut. Sorgu plani, index kullanimi ve performans sorunlarini teshis etmek icin kullanilir.",
              "en": "A command that shows how a query will be executed. Used to diagnose query plans, index usage, and performance issues."
            }
          },
          {
            "term": "Foreign Key (FK)",
            "definition": {
              "tr": "Baska bir tablonun Primary Key ini referans alan sutun. Tablolar arasi referans butunlugunu zorlar.",
              "en": "A column that references the Primary Key of another table. Enforces referential integrity between tables."
            }
          },
          {
            "term": "GROUP BY",
            "definition": {
              "tr": "Bir sorgudaki satirlari belirtilen sutun degerlerine gore gruplandiran clause. Aggregate fonksiyonlarla birlikte kullanilir.",
              "en": "A clause that groups rows in a query by specified column values. Used with aggregate functions."
            }
          },
          {
            "term": "HAVING",
            "definition": {
              "tr": "GROUP BY sonrasinda gruplari filtreleyen clause. Aggregate sonuclar uzerinde calisir — WHERE gibi ama gruplar icin.",
              "en": "A clause that filters groups after GROUP BY. Works on aggregate results — like WHERE but for groups."
            }
          },
          {
            "term": "Index",
            "definition": {
              "tr": "Veri aramasini hizlandiran veritabani yapisi. WHERE, JOIN ve ORDER BY sorgularini optimize eder.",
              "en": "A database structure that speeds up data lookup. Optimizes WHERE, JOIN, and ORDER BY queries."
            }
          },
          {
            "term": "JOIN",
            "definition": {
              "tr": "Paylasilan sutunlar araciligiyla iki veya daha fazla tablodan satirlari birlestiren SQL operasyonu.",
              "en": "A SQL operation that combines rows from two or more tables based on a shared column."
            }
          },
          {
            "term": "NULL",
            "definition": {
              "tr": "Eksik veya bilinmeyen degeri temsil eden ozel isaretci. Sifir, bos string veya false tan farklidir. IS NULL ile kontrol edilir.",
              "en": "A special marker representing a missing or unknown value. Different from zero, empty string, or false. Checked with IS NULL."
            }
          },
          {
            "term": "Primary Key (PK)",
            "definition": {
              "tr": "Bir tablodaki her satiri benzersiz olarak tanimlayan sutun veya sutun kombinasyonu. NULL olamaz ve tekrar edemez.",
              "en": "A column or combination of columns that uniquely identifies every row in a table. Cannot be NULL or duplicate."
            }
          },
          {
            "term": "Schema",
            "definition": {
              "tr": "Veritabaninin yapisi: tablolar, sutunlar, tipler, kisitlamalar ve iliskiler. CREATE TABLE ifadeleri ile tanimlanir.",
              "en": "The structure of a database: tables, columns, types, constraints, and relationships. Defined by CREATE TABLE statements."
            }
          },
          {
            "term": "Subquery",
            "definition": {
              "tr": "Baska bir SELECT ifadesinin icine yerlestirilmis SELECT ifadesi. WHERE, FROM veya SELECT clause larinda kullanilabilir.",
              "en": "A SELECT statement nested inside another SELECT statement. Can be used in WHERE, FROM, or SELECT clauses."
            }
          },
          {
            "term": "Transaction",
            "definition": {
              "tr": "Tek bir birim olarak islenen SQL ifadeleri dizisi — ya tumu basarili olur ya da higbiri olmaz. ACID garantilerini saglar.",
              "en": "A sequence of SQL statements treated as a single unit — either all succeed or none do. Provides ACID guarantees."
            }
          },
          {
            "term": "View",
            "definition": {
              "tr": "Kayitli SQL sorgu tarafindan tanimlanan sanal tablo. Bir tablo gibi sorgulanabilir ama veriyi kendisi saklamaz.",
              "en": "A virtual table defined by a stored SQL query. Can be queried like a table but does not store data itself."
            }
          },
          {
            "term": "Window Function",
            "definition": {
              "tr": "GROUP BY nin aksine satirlari daraltmadan iliskili satirlar penceresi uzerinde hesaplama yapan fonksiyon. ROW_NUMBER, RANK, LAG gibi.",
              "en": "A function that performs calculations over a window of related rows without collapsing them like GROUP BY. Examples: ROW_NUMBER, RANK, LAG."
            }
          }
        ]
      },
      {
        "type": "quiz",
        "question": {
          "tr": "`WHERE email = NULL` yazan bir sorgu hiçbir satır döndürmüyor, hatta email'i gerçekten eksik olan satırlar için de. Sorun nedir, ve doğru sözdizimi nedir?",
          "en": "A query with `WHERE email = NULL` returns no rows, even for rows where the email is genuinely missing. What is the problem, and what is the correct syntax?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "NULL büyük harfle yazılmalı",
              "en": "NULL must be written in lowercase"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "NULL hiçbir değere \"eşit\" değildir (NULL dahil) — `IS NULL` kullanılmalı",
              "en": "NULL is not \"equal\" to anything (including NULL itself) — `IS NULL` must be used"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "WHERE clause'u NULL kontrolünü desteklemez",
              "en": "WHERE clauses do not support NULL checks"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "NULL yerine boş string (\"\") kullanılmalı",
              "en": "An empty string (\"\") should be used instead of NULL"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "SQL'in üç değerli mantığında, NULL \"bilinmeyen\" bir değeri temsil eder ve hiçbir değerle (kendisi dahil) eşit veya eşit değildir — `NULL = NULL` bile UNKNOWN döner, TRUE değil. Bu yüzden `email IS NULL` / `email IS NOT NULL` özel operatörleri kullanılmalı. Java'da bu, bir referansı `== null` ile kontrol etmekle aynı kategoride bir kavramdır, ama SQL'de `=` operatörü bunun için ASLA çalışmaz.",
          "en": "In SQL's three-valued logic, NULL represents an \"unknown\" value and is never equal or unequal to anything (including itself) — even `NULL = NULL` evaluates to UNKNOWN, not TRUE. That's why the special `IS NULL` / `IS NOT NULL` operators must be used instead. This is conceptually similar to checking a reference with `== null` in Java, but in SQL the `=` operator will NEVER work for this."
        },
        "retryQuestion": {
          "question": {
            "tr": "`WHERE status != 'FAIL'` koşulu olan bir sorgu, beklenmedik şekilde `status`u NULL olan satırları da hariç tutuyor (oysa onları DAHİL etmek istiyordun). Neden?",
            "en": "A query with `WHERE status != 'FAIL'` unexpectedly excludes rows where `status` is NULL too (even though you wanted to INCLUDE them). Why?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "NULL her zaman 'FAIL'e eşittir",
                "en": "NULL is always equal to 'FAIL'"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "NULL != 'FAIL' karşılaştırması da UNKNOWN değerlendirilir, bu yüzden WHERE o satırı dahil etmez",
                "en": "The comparison NULL != 'FAIL' also evaluates to UNKNOWN, so WHERE does not include that row either"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "NULL satırları veritabanından otomatik silinmiştir",
                "en": "NULL rows have been automatically deleted from the database"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "!= operatörü NULL ile asla kullanılamaz, syntax hatası verir",
                "en": "The != operator can never be used with NULL, it throws a syntax error"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "NULL ile yapılan HER karşılaştırma (=, !=, <, > dahil) UNKNOWN döner, TRUE veya FALSE değil — ve WHERE clause sadece TRUE değerlendirilen satırları tutar. `status != 'FAIL'`, NULL bir status için UNKNOWN döner, bu yüzden o satır ne dahil edilir ne reddedilir gibi görünür, fiilen DIŞARIDA kalır. Doğru çözüm: `WHERE status != 'FAIL' OR status IS NULL`.",
            "en": "EVERY comparison with NULL (including =, !=, <, >) evaluates to UNKNOWN, not TRUE or FALSE — and the WHERE clause only keeps rows that evaluate to TRUE. `status != 'FAIL'` evaluates to UNKNOWN for a NULL status, so that row ends up excluded, not included as you might expect. The correct fix is: `WHERE status != 'FAIL' OR status IS NULL`."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL otomasyon test pratikleri yaparken veya sorguları optimize ederken en çok dikkat ettiğiniz kuralları ve EXPLAIN komutunun önemini açıklayın.",
        "promptEn": "Explain the rules you pay most attention to when practicing SQL automation tests or optimizing queries, and the importance of the EXPLAIN command.",
        "keywords": [
          [
            "explain"
          ],
          [
            "index",
            "indeks"
          ],
          [
            "slow",
            "yavaş",
            "hızlı"
          ],
          [
            "query",
            "sorgu"
          ],
          [
            "plan"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Sorguları optimize ederken gereksiz SELECT * kullanımlarından kaçınırım. EXPLAIN komutunu kullanarak veritabanının sorguyu nasıl koşturacağını, indeks kullanıp kullanmadığını (index scan vs table scan) analiz eder ve slow query sorunlarını gideririm.",
        "modelAnswerEn": "When optimizing queries, I avoid unnecessary SELECT * columns. I use the EXPLAIN command to analyze the execution plan of a query, checking if it performs index scans or slow full-table scans to debug performance bottlenecks."
      }
    ]
  },
  {
    "title": "💼 Interview Q&A",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "💼",
        "content": {
          "tr": "SQL mülakatında 'JOIN nedir?' sorusu değil, 'Production'da şu hata var, nasıl araştırırsın?' sorusu sorulur. Bu bölüm senaryo bazlı sorulara hazırlar — tanım değil, pratik deneyim.",
          "en": "SQL interviews don't ask 'what is JOIN?' — they ask 'there's a bug in production, how do you investigate it with SQL?' This section prepares you for scenario-based questions that require hands-on experience, not just definitions."
        }
      },
      {
        "type": "text",
        "content": "Click each question to expand the model answer. Includes code examples."
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🟢 Temel Sorular",
          "en": "🟢 Basic Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q1: What is the difference between WHERE and HAVING?",
          "tr": "Soru 1: WHERE ile HAVING arasındaki fark nedir?"
        },
        "answer": {
          "en": "WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.",
          "tr": "WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE."
        },
        "code": {
          "en": "-- WHERE: filter rows before grouping\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: filter groups after aggregation\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- first filter rows (only FAIL rows)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)",
          "tr": "-- WHERE: gruplamadan önce satırları filtreler\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: gruplamadan sonra grupları filtreler\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- önce satırları filtrele (sadece FAIL olanlar)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- sonra grupları filtrele (sık hata alanlar)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q2: Explain the different types of JOINs.",
          "tr": "Soru 2: Farklı JOIN türlerini açıklayın."
        },
        "answer": {
          "en": "INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.",
          "tr": "INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir."
        },
        "code": {
          "en": "-- Find testers WITH open bugs (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Find ALL testers, even those with no bugs (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;",
          "tr": "-- Açık bug raporu olan testçileri bul (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Tüm testçileri bul, bug raporu olmayanlar dahil (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q3: What is a PRIMARY KEY vs FOREIGN KEY?",
          "tr": "Soru 3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?"
        },
        "answer": {
          "en": "PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn't exist in the parent table.",
          "tr": "PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez."
        },
        "code": {
          "en": "CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    user_id INT NOT NULL,                    -- FK column\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint\n    -- → cannot insert user_id = 999 if no user with id=999 exists\n);",
          "tr": "CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    user_id INT NOT NULL,                    -- FK (Yabancı Anahtar) sütunu\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK (Yabancı Anahtar) kısıtlaması\n    -- → id=999 olan bir kullanıcı yoksa user_id = 999 eklenemez\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q4: What is NULL and how do you check for it?",
          "tr": "Soru 4: NULL nedir ve nasıl kontrol edilir?"
        },
        "answer": {
          "en": "NULL means \"no value\" or \"unknown\". It's not the same as 0, empty string \"\", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.",
          "tr": "NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın."
        },
        "code": {
          "en": "-- Wrong:\nSELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.\nSELECT * FROM users WHERE phone != NULL;   -- same problem\n\n-- Correct:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- Provide default with COALESCE:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;",
          "tr": "-- Yanlış:\nSELECT * FROM users WHERE phone = NULL;    -- 0 satır döndürür! Her zaman false.\nSELECT * FROM users WHERE phone != NULL;   -- aynı sorun\n\n-- Doğru:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- COALESCE ile varsayılan değer sağla:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q5: What is the difference between DELETE, TRUNCATE, and DROP?",
          "tr": "Soru 5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?"
        },
        "answer": {
          "en": "DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.",
          "tr": "DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir."
        },
        "code": {
          "en": "DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows\nDELETE FROM test_results;                           -- remove all rows (slow)\n\nTRUNCATE TABLE test_results;                        -- remove all rows (fast)\n\nDROP TABLE test_results;                            -- delete entire table!",
          "tr": "DELETE FROM test_results WHERE status = 'SKIP';    -- belirli satırları sil\nDELETE FROM test_results;                           -- tüm satırları sil (yavaş)\n\nTRUNCATE TABLE test_results;                        -- tüm satırları sil (hızlı)\n\nDROP TABLE test_results;                            -- tüm tabloyu sil!"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q6: What is the difference between UNION and UNION ALL?",
          "tr": "Soru 6: UNION ile UNION ALL arasındaki fark nedir?"
        },
        "answer": {
          "en": "UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.",
          "tr": "UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır."
        },
        "code": {
          "en": "-- UNION: removes duplicates (slower):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: keeps duplicates (faster):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';",
          "tr": "-- UNION: tekrarlananları kaldırır (daha yavaş):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: tekrarlananları korur (daha hızlı):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q7: How do subqueries work? What is a correlated subquery?",
          "tr": "Soru 7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?"
        },
        "answer": {
          "en": "A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.",
          "tr": "Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın."
        },
        "code": {
          "en": "-- Simple subquery (runs ONCE):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Correlated subquery (runs once per outer row — slow on large tables!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Better: use LEFT JOIN + GROUP BY instead",
          "tr": "-- Basit alt sorgu (BİR KEZ çalışır):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Bağlantılı alt sorgu (dış sorgunun her satırı için çalışır — büyük tablolarda yavaş!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Daha iyi: bunun yerine LEFT JOIN + GROUP BY kullanın"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q8: What are indexes and how do they affect performance?",
          "tr": "Soru 8: Index nedir, performansı nasıl etkiler?"
        },
        "answer": {
          "en": "An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book's index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon't index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.",
          "tr": "Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan dizinden atlarsınız.\n\nHızlandırır: SELECT with WHERE, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, status), sık güncellenen sütunlar."
        },
        "code": {
          "en": "-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Add index:\nCREATE INDEX idx_status ON test_results(status);\n\n-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';",
          "tr": "-- İndeksten önce: EXPLAIN type=ALL gösterir (TÜM 50,000 satırı okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- İndeks ekle:\nCREATE INDEX idx_status ON test_results(status);\n\n-- İndeksten sonra: EXPLAIN type=ref gösterir (indeks kullanır, ~5000 satır okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q9: Write a query to find the second highest value in a table.",
          "tr": "Soru 9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın."
        },
        "answer": {
          "en": "Finding the second highest value is a classic. You can use LIMIT/OFFSET, a subquery, or window functions. LIMIT/OFFSET is the simplest, but the subquery method is database-agnostic.",
          "tr": "En yüksek ikinci değeri bulmak için LIMIT/OFFSET, alt sorgu veya window fonksiyonları kullanılabilir. LIMIT ve OFFSET en kolay yoldur ancak alt sorgu yaklaşımı veritabanından bağımsız olarak çalışır."
        },
        "code": {
          "en": "-- Option 1: LIMIT + OFFSET (simplest, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Option 2: Subquery (works in all databases, handles duplicates):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Option 3: Window Function (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;",
          "tr": "-- Seçenek 1: LIMIT + OFFSET (en basit, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Seçenek 2: Alt sorgu (tüm veritabanlarında çalışır, tekrarlananları yönetir):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Seçenek 3: Pencere Fonksiyonu (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q10: GROUP BY — What rules apply to SELECT columns?",
          "tr": "Soru 10: GROUP BY kullanırken SELECT sütunlarına hangi kurallar uygulanır?"
        },
        "answer": {
          "en": "In standard SQL, every column in the SELECT clause must either be specified in the GROUP BY clause, or wrapped in an aggregate function (COUNT, SUM, AVG, etc.). Otherwise, the engine throws an error because it cannot choose a single value from the multiple rows collapsing into that group.",
          "tr": "SELECT listesindeki her sütun ya GROUP BY içinde yer almalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır. Aksi takdirde veritabanı motoru her grup için hangi tekil değeri göstereceğini bilemez ve hata fırlatır."
        },
        "code": {
          "en": "-- WRONG in standard SQL (MySQL without ONLY_FULL_GROUP_BY might allow it, but returns random name!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- CORRECT:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- ALSO CORRECT:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;",
          "tr": "-- Standart SQL'de YANLIŞ (ONLY_FULL_GROUP_BY kapalı MySQL izin verebilir ama rastgele ad döndürür!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- DOĞRU:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- BU DA DOĞRU:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q11: Explain window functions with a practical example.",
          "tr": "Soru 11: Window fonksiyonlarını pratik bir örnekle açıklayın."
        },
        "answer": {
          "en": "Window functions perform calculations across a set of table rows that are somehow related to the current row, without collapsing them into a single output row like GROUP BY. Each row retains its identity. `OVER()` defines the window, `PARTITION BY` groups the window, and `ORDER BY` sorts within it.",
          "tr": "Window fonksiyonları, satırları tek bir grupta birleştirmeden (GROUP BY yapmadan) satır kümeleri üzerinde hesaplama yapar. Her satır kendi kimliğini korur ve window hesaplaması sonucunu alır. `OVER()` pencereyi, `PARTITION BY` grupları, `ORDER BY` ise sıralamayı belirler."
        },
        "code": {
          "en": "-- Show each test run alongside the average duration of its environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Rank tests by duration within each environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;",
          "tr": "-- Her test çalışmasını, kendi ortamının ortalama süresiyle birlikte göster:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Testleri her ortamda kendi içlerinde sürelerine göre sırala:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q12: What is a CTE? When should it be preferred over a subquery?",
          "tr": "Soru 12: CTE nedir? Alt sorguya göre ne zaman tercih edilmelidir?"
        },
        "answer": {
          "en": "A CTE (Common Table Expression) is a temporary named result set defined using the `WITH` clause. It improves readability by breaking complex nested subqueries into logical top-down steps, and can be referenced multiple times within the same query.",
          "tr": "CTE (Common Table Expression), `WITH` ifadesiyle tanımlanan adlandırılmış geçici bir sonuç kümesidir. Karmaşık iç içe sorguları yukarıdan aşağıya mantıklı adımlara bölerek okunabilirliği artırır ve aynı geçici tabloya tek sorguda birden çok kez atıfta bulunulmasını sağlar."
        },
        "code": {
          "en": "-- Readable queries with CTE:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;",
          "tr": "-- CTE ile okunabilir sorgular:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q13: How does a transaction work? What are the ACID properties?",
          "tr": "Soru 13: Transaction nasıl çalışır? ACID özellikleri nelerdir?"
        },
        "answer": {
          "en": "A database transaction is a sequence of SQL statements executed as a single, atomic unit of work. ACID stands for:\nAtomicity: All-or-nothing execution.\nConsistency: Moves the DB from one valid state to another, enforcing constraints.\nIsolation: Concurrent transactions do not interfere with each other.\nDurability: Once committed, updates survive system failures.",
          "tr": "Transaction, tek bir birim olarak işlenen SQL komutları dizisidir. ACID özellikleri şunlardır:\nAtomicity (Atomiklik): Hepsi ya da hiçbiri.\nConsistency (Tutarlılık): Şema kuralları korunur.\nIsolation (İzolasyon): Eşzamanlı işlemler birbirini etkilemez.\nDurability (Kalıcılık): COMMIT sonrası veriler kalıcı diske yazılır."
        },
        "code": {
          "en": "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If both succeeded:\nCOMMIT;\n\n-- If any failed:\nROLLBACK;",
          "tr": "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Eğer ikisi de başarılı olursa:\nCOMMIT;\n\n-- Eğer herhangi biri başarısız olursa:\nROLLBACK;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q14: What is SQL injection and how do parameterized queries prevent it?",
          "tr": "Soru 14: SQL Injection nedir ve parametreli sorgular bunu nasıl önler?"
        },
        "answer": {
          "en": "SQL Injection is a vulnerability where malicious SQL commands are injected into database queries through untrusted user inputs. Parameterized queries (Prepared Statements) compile the SQL query template first, then bind parameters as raw values. The inputs are never interpreted as SQL executable code.",
          "tr": "SQL Injection, kullanıcı girdilerinin SQL kodu gibi yorumlanması zafiyetidir. Parametreli sorgular (Prepared Statements), SQL yapısı ile kullanıcı verisini tamamen ayırır. Veri ne olursa olsun (zararlı kodlar dahil) sadece bir parametre/değer olarak işlenir ve çalıştırılamaz."
        },
        "code": {
          "en": "-- VULNERABLE to SQL injection:\n-- Input: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Generates: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- SAFE (Parameterized query):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir",
          "tr": "-- SQL injection'a karşı savunmasız:\n-- Girdi: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Üretilen: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- GÜVENLİ (Parametreli sorgu):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q15: How do you optimize a slow SQL query?",
          "tr": "Soru 15: Yavaş bir sorguyu nasıl optimize edersiniz?"
        },
        "answer": {
          "en": "1. Use `EXPLAIN` to audit the query plan and identify Full Table Scans.\n2. Add indexes on columns commonly used in WHERE clauses, JOIN conditions, and ORDER BY constraints.\n3. Avoid `SELECT *`; only request the specific columns you need.\n4. Rewrite subqueries as JOINs where possible to allow optimizer optimizations.\n5. Use LIMIT to return only the subset of data required by the application.",
          "tr": "1. `EXPLAIN` ile sorgu planını inceleyin, full table scan olan adımları tespit edin.\n2. Sık filtrelenen (WHERE), birleştirilen (JOIN ON) ve sıralanan (ORDER BY) sütunlara index ekleyin.\n3. `SELECT *` yerine sadece gerekli sütunları çağırın.\n4. Alt sorguları (subquery) mümkünse JOIN'e dönüştürün.\n5. Ağır sorgularda performansı optimize etmek için LIMIT kullanın."
        },
        "code": {
          "en": "-- EXPLAIN query plan:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Create compound index for multi-column filters:\nCREATE INDEX idx_user_status ON orders(user_id, status);",
          "tr": "-- EXPLAIN sorgu planı:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Çoklu sütun filtreleri için birleşik indeks oluştur:\nCREATE INDEX idx_user_status ON orders(user_id, status);"
        }
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🟡 Orta Seviye Sorular",
          "en": "🟡 Intermediate Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q16: What is a Database Schema?",
          "tr": "Soru 16: Veritabanı Şeması (Schema) ne anlama gelir?"
        },
        "answer": {
          "en": "A database schema is the skeleton structure that represents the logical view of the entire database. It defines how the data is organized, including tables, columns, data types, primary/foreign keys, and relationships. For a QA engineer, the schema serves as the map to design database validation tests.",
          "tr": "Veritabanı şeması, veritabanının mantıksal ve fiziksel yapısını tanımlayan bir plandır (blueprint). Tabloları, sütunları, veri tiplerini, primary/foreign key kısıtlamalarını ve tablolar arası ilişkileri içerir. Bir QA mühendisi için, uygulamanın veri yapısını anlamak ve test verisi tasarlamak için şema bilgisi kritik önem taşır."
        },
        "code": {
          "en": "-- Example of schema definition (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
          "tr": "-- Şema tanımı örneği (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q17: What does the SELECT DISTINCT statement do?",
          "tr": "Soru 17: SELECT DISTINCT ifadesi ne işe yarar?"
        },
        "answer": {
          "en": "The SELECT DISTINCT statement is used to return only distinct (different) values from a column, filtering out all duplicate rows in the result set. In QA testing, it is useful to check all unique values present in a table, such as tested environments or unique statuses.",
          "tr": "SELECT DISTINCT, sorgu sonucunda tekrar eden satırları kaldırarak sadece benzersiz (unique) değerlerin listelenmesini sağlar. QA otomasyonunda, test sonuçlarında hangi farklı ortamların (environment) kullanıldığını veya tablodaki benzersiz durumları listelemek için sıkça kullanılır."
        },
        "code": {
          "en": "-- Get list of unique environments tested:\nSELECT DISTINCT environment FROM test_results;",
          "tr": "-- Test edilen benzersiz ortamların listesini al:\nSELECT DISTINCT environment FROM test_results;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q18: What is the difference between = and LIKE in a WHERE clause?",
          "tr": "Soru 18: WHERE koşulunda = ve LIKE arasındaki temel fark nedir?"
        },
        "answer": {
          "en": "The `=` operator searches for an exact match, whereas the `LIKE` operator performs pattern matching using wildcard characters. `LIKE` supports `%` (matches any sequence of zero or more characters) and `_` (matches exactly one character). Using wildcard characters with `=` treats them as literal characters.",
          "tr": "`=` tam (birebir) eşleşme ararken, `LIKE` karakter bazlı şablon (pattern matching) eşleşmeleri arar. `LIKE` ile birlikte `%` (sıfır veya daha fazla karakter) ve `_` (tek bir karakter) wildcard karakterleri kullanılabilir. `=` ile wildcard karakterleri çalışmaz, düz string olarak eşleştirilmeye çalışılır."
        },
        "code": {
          "en": "-- Exact match:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Pattern match:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- Starts with 'Login'",
          "tr": "-- Birebir eşleşme:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Şablon eşleşmesi:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- 'Login' ile başlayanlar"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q19: What is the purpose of the LIMIT clause?",
          "tr": "Soru 19: LIMIT ifadesinin amacı nedir?"
        },
        "answer": {
          "en": "The LIMIT clause specifies the maximum number of rows that the query should return. It is crucial when testing against large datasets to prevent memory overflow in your test script or UI by fetching only a small subset of records. Often combined with OFFSET for pagination.",
          "tr": "LIMIT, sorgu sonucunda dönecek maksimum satır sayısını sınırlandırmak için kullanılır. Özellikle milyonlarca satır içeren büyük tablolarda test yaparken tarayıcıyı veya test scriptini çökertmemek için sorgunun sadece ilk birkaç satırını (örn: LIMIT 10) getirmesini sağlamak amacıyla kullanılır. Pagination (sayfalama) için OFFSET ile birlikte kullanılır."
        },
        "code": {
          "en": "-- Get the 5 most recent test failures:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;",
          "tr": "-- En son 5 test hatasını al:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q20: Explain what AS (alias) keyword does.",
          "tr": "Soru 20: AS (alias) anahtar kelimesi ne işe yarar?"
        },
        "answer": {
          "en": "The AS keyword is used to assign a temporary name (alias) to a column or table in a query. It makes output columns more readable (e.g. naming aggregate results) and keeps JOIN queries concise by creating short aliases for table names.",
          "tr": "AS, bir sütuna veya tabloya sorgu süresince geçici bir takma ad (alias) vermek için kullanılır. Özellikle aggregate sonuçlarda sütun adını anlamlı kılmak (`COUNT(*) AS total_runs`) veya JOIN sorgularında tablo adlarını kısaltarak okunabilirliği artırmak için kullanılır."
        },
        "code": {
          "en": "-- Column alias:\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Table alias:\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;",
          "tr": "-- Sütun takma adı (alias):\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Tablo takma adı (alias):\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q21: What is the default sorting order of ORDER BY?",
          "tr": "Soru 21: ORDER BY ifadesinin varsayılan sıralama yönü nedir?"
        },
        "answer": {
          "en": "The default sorting order of the ORDER BY clause is ascending (ASC). This means it sorts numbers from lowest to highest, and text alphabetically from A to Z. To sort in descending order, you must explicitly append the `DESC` keyword after the column name.",
          "tr": "ORDER BY ifadesinin varsayılan sıralama yönü artan sıralamadır (ASC - Ascending). Yani sayılarda küçükten büyüğe, metinlerde ise A'dan Z'ye doğru sıralar. Azalan sıralama (büyükten küçüğe / Z'den A'ya) yapmak için sütun adından sonra açıkça `DESC` yazılmalıdır."
        },
        "code": {
          "en": "-- Sorts ascending (default):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Sorts descending:\nSELECT * FROM test_results ORDER BY duration_ms DESC;",
          "tr": "-- Artan sıralama (varsayılan):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Azalan sıralama:\nSELECT * FROM test_results ORDER BY duration_ms DESC;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q22: What happens if you try to insert a duplicate value into a PRIMARY KEY column?",
          "tr": "Soru 22: PRIMARY KEY olan bir sütuna tekrar eden (duplicate) değer eklemeye çalışırsanız ne olur?"
        },
        "answer": {
          "en": "The database engine throws a primary key constraint violation error and rejects the INSERT operation. If the query is part of a transaction, the transaction will be rolled back. In automation, you must clean up test data or use UPSERT syntax to prevent duplicate key failures.",
          "tr": "Veritabanı motoru hata fırlatır ve ekleme işlemini reddeder (Unique Constraint Violation). Transaction içindeyse tüm transaction iptal edilir. Test otomasyonunda, test verisi eklerken bu hatayı önlemek için her çalıştırmadan önce temizlik (cleanup) yapmak veya UPSERT (ON CONFLICT) mekanizması kullanmak önemlidir."
        },
        "code": {
          "en": "-- Duplicate insert will throw: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- fails!",
          "tr": "-- Tekrarlanan ekleme hata fırlatacaktır: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- başarısız olur!"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q23: What does the IN operator do in a SQL query?",
          "tr": "Soru 23: IN operatörü ne işe yarar?"
        },
        "answer": {
          "en": "The IN operator allows you to specify multiple values in a WHERE clause, acting as a shorthand for multiple OR conditions. It filters rows where the column value matches any value in the provided list. It is also commonly used to match against the results of a subquery.",
          "tr": "IN operatörü, WHERE koşulunda birden fazla OR (veya) ifadesini tek bir liste halinde yazmayı sağlar. Sütunun değerinin belirtilen listedeki elemanlardan herhangi biriyle eşleşmesi durumunda satırı filtreye dahil eder. Alt sorgulardan dönen küme kontrollerinde de sıkça kullanılır."
        },
        "code": {
          "en": "-- Shorthand for OR:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Equivalent to:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';",
          "tr": "-- OR için kısaltma:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Şuna eşdeğerdir:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q24: What is the difference between CHAR and VARCHAR data types?",
          "tr": "Soru 24: CHAR ve VARCHAR veri tipleri arasındaki fark nedir?"
        },
        "answer": {
          "en": "CHAR is fixed-length, while VARCHAR is variable-length. If you define a CHAR(10) and store a 3-character string, it pads the remaining 7 spaces with blanks, consuming 10 bytes. A VARCHAR(10) will only consume 3 bytes of data, making it more space-efficient for fields with varying lengths.",
          "tr": "CHAR sabit uzunlukta (fixed-length), VARCHAR ise değişken uzunlukta (variable-length) metin depolar. CHAR(10) tanımlanmış bir sütuna 3 harfli bir kelime yazılırsa boşluklarla 10 karaktere tamamlanır ve diskte hep 10 karakter yer kaplar. VARCHAR(10) ise girilen metin boyutu kadar (örn: 3 karakter + uzunluk belirten 1 byte) yer kaplar."
        },
        "code": {
          "en": "-- Fixed length (ideal for ISO country codes, hashes):\ncountry_code CHAR(2) -- always 2 chars\n\n-- Variable length (ideal for names, emails):\nemail VARCHAR(255) -- stores actual length",
          "tr": "-- Sabit uzunluk (ISO ülke kodları, hash değerleri için ideal):\ncountry_code CHAR(2) -- her zaman 2 karakter\n\n-- Değişken uzunluk (adlar, e-postalar için ideal):\nemail VARCHAR(255) -- gerçek uzunluğu saklar"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q25: How do you add a comment in SQL?",
          "tr": "Soru 25: SQL'de yorum satırı (comment) nasıl eklenir?"
        },
        "answer": {
          "en": "In SQL, single-line comments are created using double dashes (`--`). Multi-line comments are wrapped inside block markers (`/* comment here */`). Using comments is highly recommended in automated test fixtures to explain complex SQL data setup queries.",
          "tr": "SQL'de tek satırlık yorumlar için çift tire (`--`) kullanılır. Çok satırlı yorumlar için ise C-tarzı (`/* yorum */`) bloklar kullanılır. Test otomasyonunda, karmaşık veritabanı doğrulama sorgularını dökümante etmek için yorum satırları eklemek önemlidir."
        },
        "code": {
          "en": "-- This is a single line comment\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;",
          "tr": "-- Bu tek satırlık bir yorumdur\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q26: What is a Self Join and when would you use it in QA testing?",
          "tr": "Soru 26: Self-Join nedir ve QA otomasyon testlerinde ne amaçla kullanılabilir?"
        },
        "answer": {
          "en": "A Self Join is a regular join, but the table is joined with itself. It is used to query hierarchical data stored in a single table, such as an employee-manager hierarchy or category-subcategory levels. In QA, you can use it to verify data integrity, like checking if deleting a parent category correctly flags its child categories.",
          "tr": "Self-join, bir tablonun kendisiyle JOIN yapılmasıdır. Tablonun içindeki satırlar arasında hiyerarşik veya ilişkisel bir bağ olduğunda kullanılır (Örn: çalışan-yönetici tablosu veya alt-üst kategori tablosu). QA testlerinde, bir kategori silindiğinde alt kategorilerin de doğru şekilde güncellenip güncellenmediğini doğrulamak için self-join sorgusu atılabilir."
        },
        "code": {
          "en": "-- Find employees and their managers from the same table:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
          "tr": "-- Aynı tablodan çalışanları ve yöneticilerini bul:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q27: How do you write a query to find and delete duplicate rows in a table?",
          "tr": "Soru 27: Bir tablodaki tekrar eden (duplicate) satırları nasıl bulursunuz ve bunları nasıl silersiniz?"
        },
        "answer": {
          "en": "To find duplicates, use `GROUP BY` on the target columns and filter with `HAVING COUNT(*) > 1`. To delete them, you can perform a DELETE query that selects the minimum ID for each duplicate group and removes rows with IDs greater than the minimum.",
          "tr": "Tekrarlanan satırları bulmak için `GROUP BY` ve `HAVING COUNT(*) > 1` kullanılır. Silmek için ise, tablonun benzersiz ID sütununu (primary key) kullanarak, kendisiyle karşılaştırıp daha büyük ID'ye sahip olan kopyaları silebiliriz."
        },
        "code": {
          "en": "-- 1. Find duplicates:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. Delete duplicates keeping only the lowest ID (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);",
          "tr": "-- 1. Tekrarlanan kayıtları bul:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. En düşük ID'yi koruyarak tekrarlananları sil (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q28: Explain the difference between CROSS JOIN and INNER JOIN.",
          "tr": "Soru 28: CROSS JOIN ile INNER JOIN arasındaki fark nedir?"
        },
        "answer": {
          "en": "CROSS JOIN returns the cartesian product of two tables, matching every row of the first table with every row of the second table without any condition. INNER JOIN requires a join condition (`ON`) and only matches rows satisfying that condition. CROSS JOIN is useful in QA for generating test matrices.",
          "tr": "CROSS JOIN, iki tablonun kartezyen çarpımını (cartesian product) üretir; yani sol tablodaki her satırı sağ tablodaki her satırla eşleştirir (koşulsuz). INNER JOIN ise sadece iki tablo arasında belirtilen `ON` koşulunu sağlayan satırları birleştirir. CROSS JOIN genellikle test verisi kombinasyonları (matrix testing) oluşturmak için yararlıdır."
        },
        "code": {
          "en": "-- CROSS JOIN (Combines all sizes with all colors):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Matches orders to existing users):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;",
          "tr": "-- CROSS JOIN (Tüm bedenleri tüm renklerle birleştirir):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Siparişleri mevcut kullanıcılarla eşleştirir):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q29: What is a Composite Primary Key?",
          "tr": "Soru 29: Bileşik Birincil Anahtar (Composite Primary Key) nedir?"
        },
        "answer": {
          "en": "A Composite Primary Key is a primary key that consists of two or more columns in a table. Individually, the columns may contain duplicate values, but their combination must be unique. It is commonly used in junction tables for many-to-many relationships to prevent duplicate links.",
          "tr": "Birden fazla sütunun bir araya gelerek tablodaki bir satırı benzersiz şekilde tanımlamasıdır. Tek başına hiçbir sütun benzersiz değildir ancak birleşimleri benzersizdir. Özellikle çoktan-çoğa (many-to-many) ilişki tablolarında (Örn: user_id ve badge_id birleşimi) sıklıkla kullanılır."
        },
        "code": {
          "en": "-- Example of composite primary key (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- combination must be unique\n);",
          "tr": "-- Birleşik birincil anahtar örneği (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- birleşim benzersiz olmalıdır\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q30: How does a Foreign Key constraint protect referential integrity?",
          "tr": "Soru 30: Foreign Key (Dış Anahtar) kısıtlaması ilişkisel bütünlüğü nasıl korur?"
        },
        "answer": {
          "en": "A Foreign Key constraint ensures that values in a child table correspond to valid primary keys in a parent table. It prevents orphaned records by blocking inserts of invalid IDs in the child table, and blocking deletions of parent records that still have child dependencies (unless cascaded).",
          "tr": "Foreign Key, bir tablodaki değerlerin başka bir tablonun Primary Key'i ile eşleşmesini zorunlu kılar. Bu sayede veritabanı motoru: 1) Parent tabloda olmayan bir id ile child tabloya kayıt eklenmesini engeller. 2) Child tabloda kaydı olan bir parent satırının silinmesini (veya güncellenmesini) engeller (`ON DELETE RESTRICT` varsayılan ise)."
        },
        "code": {
          "en": "-- Prevent deleting user if they have active orders:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;",
          "tr": "-- Aktif siparişi olan kullanıcının silinmesini engelle:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q31: Does the BETWEEN operator include the boundary values?",
          "tr": "Soru 31: BETWEEN operatörü alt ve üst limit sınırlarını dahil eder mi?"
        },
        "answer": {
          "en": "Yes, the `BETWEEN` operator is inclusive of both boundary values. For example, `WHERE age BETWEEN 18 AND 25` is equivalent to `WHERE age >= 18 AND age <= 25`. This is important for QA engineers to keep in mind when designing Boundary Value Analysis tests.",
          "tr": "Evet, `BETWEEN` operatörü arama yaparken alt ve üst sınır değerlerini de sonuca dahil eder (inclusive). Yani `WHERE age BETWEEN 18 AND 25` koşulu, yaşı 18 ve 25 olan kişileri de getirir. Bu durum, sınır değer testlerinde (boundary value analysis) QA mühendislerinin dikkat etmesi gereken bir kuraldır."
        },
        "code": {
          "en": "-- Inclusive range:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Equivalent to:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;",
          "tr": "-- Dahil aralık:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Şuna eşdeğerdir:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q32: How do you handle case-sensitive text comparisons in SQL?",
          "tr": "Soru 32: SQL'de büyük/küçük harf duyarlı (case-sensitive) metin karşılaştırması nasıl yapılır?"
        },
        "answer": {
          "en": "Case sensitivity depends on the database engine and the collation configuration of the tables/columns. PostgreSQL is case-sensitive by default, whereas MySQL and SQLite are case-insensitive. To force case-sensitivity in MySQL, use the `BINARY` keyword. In Postgres, use `ILIKE` for case-insensitive searches.",
          "tr": "Büyük/küçük harf duyarlılığı veritabanı motoruna ve tablonun karakter setine (collation) bağlıdır. PostgreSQL varsayılan olarak case-sensitive'dir. MySQL ve SQLite varsayılan olarak case-insensitive'dir. Case-sensitive karşılaştırma yapmak için MySQL'de `BINARY` keyword'ü, PostgreSQL'de ise case-insensitive için `ILIKE` kullanılır."
        },
        "code": {
          "en": "-- MySQL Case-sensitive search:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' won't match\n\n-- PostgreSQL Case-insensitive search:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- matches 'Alice', 'ALICE'",
          "tr": "-- MySQL Büyük/küçük harf duyarlı arama:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' eşleşmeyecektir\n\n-- PostgreSQL Büyük/küçük harf duyarsız arama:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- 'Alice', 'ALICE' ile eşleşir"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q33: What is a Stored Procedure and when is it used?",
          "tr": "Soru 33: Saklı Yordam (Stored Procedure) nedir ve test otomasyonunda ne zaman kullanılır?"
        },
        "answer": {
          "en": "A Stored Procedure is a prepared SQL code block that you can save in the database, allowing it to be reused with parameters. In test automation, they are highly useful to quickly seed complex datasets or run database resets in a single database call, reducing network overhead.",
          "tr": "Stored Procedure, veritabanı sunucusunda derlenip saklanan ve parametre kabul eden SQL kod bloklarıdır. Ağ trafiğini azaltır ve performans sağlar. QA test otomasyonunda, testler öncesinde karmaşık test verisi setleri oluşturmak veya test sonrası veritabanı sıfırlama işlemlerini tek bir komutla tetiklemek için kullanılabilir."
        },
        "code": {
          "en": "-- Call stored procedure from test automation:\nCALL SeedMockTestData(100, 'staging');",
          "tr": "-- Test otomasyonundan stored procedure çağır:\nCALL SeedMockTestData(100, 'staging');"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q34: What are wildcards in SQL and how do they work with LIKE?",
          "tr": "Soru 34: SQL'de LIKE ile kullanılan wildcards (joker karakterler) nelerdir?"
        },
        "answer": {
          "en": "The two most common wildcards used with the `LIKE` operator are: 1) `%`: Represents zero, one, or multiple characters (e.g. `A%` matches any string starting with A). 2) `_`: Represents a single character (e.g. `t_st` matches test, tast, tost).",
          "tr": "SQL LIKE ile en sık kullanılan iki joker karakter şunlardır: 1) `%`: Sıfır, bir veya daha fazla karakteri temsil eder (Örn: `A%` -> A ile başlayanlar). 2) `_`: Tam olarak tek bir karakteri temsil eder (Örn: `T_st` -> Test, Tast vb.)."
        },
        "code": {
          "en": "-- Matches: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Matches: 'Test', 'Tast', 'Tost' (exactly 4 characters):\nSELECT * FROM tests WHERE title LIKE 'T_st';",
          "tr": "-- Şunlarla eşleşir: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Şunlarla eşleşir: 'Test', 'Tast', 'Tost' (tam olarak 4 karakter):\nSELECT * FROM tests WHERE title LIKE 'T_st';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q35: How can you count the number of NULL values in a column?",
          "tr": "Soru 35: Bir sütundaki NULL değerlerin sayısını nasıl bulursunuz?"
        },
        "answer": {
          "en": "Standard `COUNT(column_name)` ignores NULL values. To count NULLs, you must either count all records matching a `WHERE column IS NULL` filter, or use a conditional aggregation like `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)`.",
          "tr": "`COUNT(column_name)` fonksiyonu NULL değerleri saymaz, sadece NULL olmayanları sayar. Bu yüzden NULL değerleri saymak için `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)` veya `COUNT(*)` ile filtreyi birleştirip `WHERE column IS NULL` koşulunu kullanmalıyız."
        },
        "code": {
          "en": "-- Option 1: Simple filter\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Option 2: Conditional aggregation (useful when counting other metrics too):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;",
          "tr": "-- Seçenek 1: Basit filtre\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Seçenek 2: Koşullu toplama (diğer metrikleri de sayarken kullanışlıdır):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;"
        }
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🔴 İleri Seviye Sorular",
          "en": "🔴 Advanced Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q36: What is the difference between COALESCE and NULLIF?",
          "tr": "Soru 36: COALESCE ve NULLIF fonksiyonları arasındaki fark nedir?"
        },
        "answer": {
          "en": "`COALESCE(val1, val2, ...)` returns the first non-NULL value in the list (used for default fallbacks). `NULLIF(val1, val2)` returns NULL if the two arguments are equal, otherwise it returns the first value (used to prevent division-by-zero errors).",
          "tr": "`COALESCE(val1, val2, ...)` verilen parametreler arasından NULL olmayan ilk değeri döndürür (varsayılan değer sağlamak için kullanılır). `NULLIF(val1, val2)` ise iki değer birbirine eşitse NULL, eşit değilse ilk değeri döndürür (bölme işlemlerinde sıfıra bölme hatasını önlemek için kullanılır)."
        },
        "code": {
          "en": "-- COALESCE: Fallback to 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Prevent division by zero (turns 0 duration to NULL, rendering avg division safe)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;",
          "tr": "-- COALESCE: Son çare olarak 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Sıfıra bölmeyi engelle (0 süreyi NULL yapar, böylece avg bölmesi güvenli olur)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q37: Can you use a SELECT alias in a GROUP BY clause? Why or why not?",
          "tr": "Soru 37: SELECT alias'larını GROUP BY içinde kullanabilir miyiz? Neden?"
        },
        "answer": {
          "en": "In standard SQL, no. Because the GROUP BY clause is evaluated BEFORE the SELECT clause, the alias does not exist yet. However, engines like MySQL, PostgreSQL, and SQLite allow it as an extension. For ANSI SQL compliance, always use the raw column names in GROUP BY.",
          "tr": "Standart SQL'e göre hayır. Çünkü GROUP BY mantıksal çalışma sırasında SELECT'ten ÖNCE çalıştırılır. Ancak PostgreSQL, MySQL ve SQLite gibi birçok modern veritabanı motoru buna esneklik sağlayarak alias kullanımına izin verir. Yine de standart SQL uyumluluğu için ham sütun adlarını veya ifadeleri kullanmak en güvenli yoldur."
        },
        "code": {
          "en": "-- Might fail in strict ANSI SQL databases:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standard compliant way:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);",
          "tr": "-- Katı ANSI SQL veritabanlarında başarısız olabilir:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standartlara uygun yol:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q38: What is a Non-Repeatable Read and under what conditions does it occur?",
          "tr": "Soru 38: Tekrarlanamayan Okuma (Non-Repeatable Read) nedir ve hangi koşulda ortaya çıkar?"
        },
        "answer": {
          "en": "A Non-Repeatable Read happens when a transaction reads the same row twice but gets different data because another committed transaction modified that row in between. This occurs under the 'Read Committed' isolation level and is prevented under 'Repeatable Read' using snapshots.",
          "tr": "Aynı transaction (işlem) içinde aynı sorgu iki kez çalıştırıldığında, aradaki sürede başka bir transaction'ın veriyi güncelleyip COMMIT etmesi nedeniyle ikinci sorgunun farklı sonuç dönmesi durumudur. 'Read Committed' izolasyon seviyesinde bu durum yaşanabilir, 'Repeatable Read' seviyesinde ise snapshot kullanıldığı için engellenir."
        },
        "code": {
          "en": "-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- Returns $1000\n\n-- Transaction B (concurrent):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- Returns $800! (Non-repeatable read)",
          "tr": "-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- $1000 döndürür\n\n-- Transaction B (eşzamanlı):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- $800 döndürür! (Non-repeatable read)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q39: What does EXPLAIN do and how do you read its output?",
          "tr": "Soru 39: EXPLAIN komutu ne işe yarar ve bir QA otomasyon mühendisi için neden önemlidir?"
        },
        "answer": {
          "en": "EXPLAIN displays the execution plan generated by the database query optimizer. It shows index lookups, join orders, and estimated rows scanned. For QA automation, it is the primary debugging tool to optimize slow tests caused by sub-optimal DB queries triggering full-table scans.",
          "tr": "EXPLAIN, veritabanı motorunun bir sorguyu çalıştırırken izleyeceği yolu (Execution Plan) gösterir. Hangi indexlerin kullanılacağını, kaç satırın taranacağını (Scan) ve tabloların birleştirilme sırasını raporlar. QA otomasyon mühendisleri için, yavaş koşan testlerdeki veritabanı sorgularının performans dar boğazlarını (örn: Full Table Scan) bulmak için en önemli araçtır."
        },
        "code": {
          "en": "-- Run EXPLAIN:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- Look for \"scan type\" (e.g. 'ALL' is slow table scan, 'const' or 'ref' is fast index scan)",
          "tr": "-- EXPLAIN çalıştır:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- \"Tarama türü\"ne bakın (ör. 'ALL' yavaş tablo taramasıdır, 'const' veya 'ref' hızlı indeks taramasıdır)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q40: Explain the difference between Read Committed and Repeatable Read isolation levels.",
          "tr": "Soru 40: Read Committed ile Repeatable Read izolasyon seviyeleri arasındaki temel fark nedir?"
        },
        "answer": {
          "en": "Read Committed takes a new data snapshot for each query statement inside the transaction, allowing concurrent updates to be read if committed. Repeatable Read locks the snapshot at the transaction start, ensuring the exact same values are read throughout the entire transaction session.",
          "tr": "Read Committed seviyesinde, bir sorgu sadece sorgunun başladığı anda commit edilmiş verileri okur; işlem içindeki her SELECT yeni bir snapshot alır. Repeatable Read seviyesinde ise, işlem içindeki ilk SELECT sorgusunun başladığı andaki snapshot korunur; işlem sonlanana kadar aynı satırlar hep aynı değeri döner, başka işlemler commit etse bile değişiklik görülmez."
        },
        "code": {
          "en": "-- Read Committed: Sees committed changes mid-transaction.\n-- Repeatable Read: Read values are guaranteed not to change until rollback/commit.",
          "tr": "-- Read Committed: Transaction ortasında commited edilmiş değişiklikleri görür.\n-- Repeatable Read: Okunan değerlerin rollback/commit olana kadar değişmeyeceği garanti edilir."
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q41: What is a Phantom Read and how does Serializable isolation prevent it?",
          "tr": "Soru 41: Phantom Read (Hayalet Okuma) nedir ve Serializable seviyesi bunu nasıl önler?"
        },
        "answer": {
          "en": "A Phantom Read occurs when a transaction queries a range of rows, and another transaction inserts a NEW row into that range and commits. Re-running the query reveals a 'phantom' row. Serializable isolation prevents this by placing Range Locks on the index, blocking inserts until the transaction finishes.",
          "tr": "Phantom Read, bir transaction içinde bir filtreye uyan satırlar sorgulanırken, araya giren başka bir transaction'ın YENİ satır ekleyip commit etmesi sonucu, ilk transaction aynı sorguyu tekrar attığında daha önce olmayan yeni 'hayalet' satırlarla karşılaşması durumudur. Serializable seviyesi, aralık kilitleri (range locks) kullanarak bu aralığa yeni satır eklenmesini tamamen bloke ederek bunu önler."
        },
        "code": {
          "en": "-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 3 rows\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 4 rows! (Phantom read)",
          "tr": "-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 3 satır döndürür\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 4 satır döndürür! (Phantom read)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q42: What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
          "tr": "Soru 42: ROW_NUMBER(), RANK() ve DENSE_RANK() window fonksiyonları arasındaki fark nedir?"
        },
        "answer": {
          "en": "All three assign ranks. Difference lies in handling tied values: 1) `ROW_NUMBER()` ignores ties and assigns sequential numbers (1, 2, 3). 2) `RANK()` gives tied rows the same rank, leaving gaps afterwards (1, 1, 3). 3) `DENSE_RANK()` gives tied rows the same rank but leaves no gaps (1, 1, 2).",
          "tr": "Üçü de satırları sıralamak için numara verir. Fark eşit değerlerde (ties) ortaya çıkar: 1) `ROW_NUMBER()` eşitliğe bakmaksızın ardışık benzersiz numaralar verir (1, 2, 3). 2) `RANK()` eşit değerlere aynı numarayı verir ama sonrasında sıra atlar (1, 1, 3). 3) `DENSE_RANK()` eşit değerlere aynı numarayı verir ama sıra atlamaz (1, 1, 2)."
        },
        "code": {
          "en": "-- Example output for tied durations (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2",
          "tr": "-- Eşit süreler için örnek çıktı (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q43: What is a Recursive CTE and when would you use it?",
          "tr": "Soru 43: Özyinelemeli CTE (Recursive CTE) nedir ve ne zaman kullanılır?"
        },
        "answer": {
          "en": "A Recursive CTE is a subquery that references its own name, executing iteratively until a termination condition is met. It is typically used to traverse hierarchical or tree-structured database records like manager-employee org charts, category folders, or dependency trees.",
          "tr": "Kendi kendini referans alan ve bir durdurma koşuluna kadar döngü şeklinde çalışan CTE türüdür. Genellikle hiyerarşik veri yapılarını (Örn: organizasyon şemaları, kategori ağaçları, parça listeleri) veya grafik yollarını sorgulamak için kullanılır. QA testlerinde ağaç yapısındaki verilerin doğruluğunu kontrol etmek için idealdir."
        },
        "code": {
          "en": "-- Traverse manager-employee tree recursively:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;",
          "tr": "-- Yönetici-çalışan ağacını özyinelemeli (recursive) olarak dolaş:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor (Başlangıç noktası)\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q44: What is a database deadlock and how does it happen?",
          "tr": "Soru 44: Veritabanında Deadlock (Kilitlenme) nedir ve otomasyon testlerinizde bu durumla karşılaşırsanız ne yaparsınız?"
        },
        "answer": {
          "en": "A deadlock occurs when two or more transactions hold locks on resources the others need, creating a circular dependency where neither can proceed. The DB engine aborts one transaction to break the loop. In test runs: 1) Isolate test data. 2) Always lock/update resources in the exact same order. 3) Implement automatic database transaction retries.",
          "tr": "İki veya daha fazla transaction'ın, birbirlerinin kilitlediği (lock) kaynakları beklemesi ve bu nedenle sonsuz döngüye girip kilitlenmesi durumudur. Veritabanı motoru bunu algılar ve birini feda ederek hata fırlatır (rollback). Testlerde paralelleştirmeden kaynaklı deadlock oluşursa: 1) Test verilerini izole edin (farklı user'lar kullanın). 2) Güncelleme sorgularını her zaman aynı sırayla çalıştırın. 3) Otomatik retry (tekrar deneme) mekanizmaları kurun."
        },
        "code": {
          "en": "-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts",
          "tr": "-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q45: Explain B-Tree vs Hash index.",
          "tr": "Soru 45: B-Tree ve Hash Index arasındaki temel fark nedir? Hangisi ne zaman tercih edilmelidir?"
        },
        "answer": {
          "en": "B-Tree indexes store data in a balanced tree structure, keeping elements sorted. They support equality (`=`) and range queries (`>`, `<`, `BETWEEN`). Hash indexes use hash tables and only support exact equality checks (`=`) with O(1) complexity, rendering them useless for range filters.",
          "tr": "B-Tree indexleri verileri dengeli bir ağaç yapısında sıralı tutar; `=`, `<` , `>`, `BETWEEN` ve range (aralık) sorgularını destekler. Hash indexleri ise bir hash tablosu kullanır ve SADECE `=` (birebir eşitlik) sorgularını çok hızlı yanıtlar; büyüktür/küçüktür veya aralık sorgularını desteklemez. Çoğu ilişkisel DB varsayılan olarak B-Tree kullanır."
        },
        "code": {
          "en": "-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;",
          "tr": "-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q46: What is the difference between Clustered and Non-Clustered indexes?",
          "tr": "Soru 46: Kümeli (Clustered) ve Kümesiz (Non-Clustered) index arasındaki fark nedir?"
        },
        "answer": {
          "en": "A Clustered index dictates the physical sorting order of rows on disk (only one allowed per table, usually the Primary Key). A Non-Clustered index is a separate structure containing copy columns and pointers linking back to the physical rows (multiple allowed per table, like a book index).",
          "tr": "Clustered index, tablonun fiziksel satırlarının diskteki sıralamasını belirler (kitabın kendisi gibidir; her tabloda sadece 1 tane olabilir, genelde Primary Key'dir). Non-clustered index ise veriden ayrı bir yapıdır ve satırların fiziksel adreslerine işaret eden işaretçiler (pointers) tutar (kitabın arkasındaki dizin gibidir; tablo başına çok sayıda oluşturulabilir)."
        },
        "code": {
          "en": "-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);",
          "tr": "-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q47: What is a database trigger and what are its risks in test automation?",
          "tr": "Soru 47: Veritabanı Tetikleyicileri (Triggers) nedir? Test otomasyonu için ne gibi riskler barındırır?"
        },
        "answer": {
          "en": "A database trigger is a stored program that fires automatically in response to DML operations on a table. Risks for QA: 1) They create hidden side-effects not documented in the test code, leading to flaky runs. 2) Finding failures is harder as trigger stack traces might not bubbled up to the test logger. 3) They can interfere with test cleanup scripts.",
          "tr": "Trigger, bir tabloda INSERT, UPDATE veya DELETE yapıldığında otomatik çalışan veritabanı kodlarıdır. QA otomasyonu için riskleri: 1) 'Gizli' yan etkilere yol açarlar; otomasyon kodunda hata olmasa da trigger arka planda hata fırlatıp testi çökertebilir. 2) Hata analizi zordur, loglarda trigger adımları görünmeyebilir. 3) Test verisi temizleme süreçlerini bozabilirler. Mümkünse test ortamlarında trigger'ları simüle etmek yerine kapatmak veya izole etmek tercih edilir."
        },
        "code": {
          "en": "-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;",
          "tr": "-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q48: How do you optimize a query that is performing a Full Table Scan?",
          "tr": "Soru 48: EXPLAIN planında 'Full Table Scan' (Tüm Tablo Taraması) gördüğünüz yavaş bir sorguyu nasıl optimize edersiniz?"
        },
        "answer": {
          "en": "1) Add an index on the column used in the WHERE or JOIN conditions. 2) Re-run EXPLAIN to verify if the engine uses the index. 3) Avoid wrapping index columns in functions (e.g. use `WHERE date >= '2024-01-01'` instead of `WHERE YEAR(date) = 2024`) as functions disable indexing. 4) Note that if the table is tiny, the engine might bypass the index deliberately.",
          "tr": "1) WHERE ve JOIN koşulundaki sütuna index ekleyin. 2) İndex'in gerçekten kullanılıp kullanılmadığını doğrulamak için EXPLAIN planını tekrar kontrol edin. 3) Sütunun bir fonksiyon içine sarılmadığından emin olun (Örn: `WHERE YEAR(date) = 2024` yerine `WHERE date >= '2024-01-01'`). Fonksiyonlar index kullanımını engeller. 4) Tablo çok küçükse veritabanı motorunun index kullanmayı bilerek reddetmiş olabileceğini unutmayın."
        },
        "code": {
          "en": "-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';",
          "tr": "-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q49: How do you handle schema migrations (e.g. Liquibase or Flyway) in a QA automation pipeline?",
          "tr": "Soru 49: QA otomasyon pipeline'larında veritabanı şema göçlerini (schema migrations - Flyway/Liquibase) nasıl yönetmeliyiz?"
        },
        "answer": {
          "en": "In CI/CD pipelines, schema migrations must run before automated tests execute. Steps: 1) Spin up a clean test DB container (e.g. using Testcontainers or Docker Compose). 2) Run Flyway/Liquibase update commands against the database. 3) Verify successful migration, then kick off the automated test execution suite. This ensures tests align with active schema code.",
          "tr": "QA pipeline'ında testler koşmadan önce, veritabanı şemasını en güncel sürüme taşımak (migration) kritik önem taşır. Adımlar: 1) Test veritabanı konteynerini (Docker) ayağa kaldır. 2) Flyway/Liquibase komutunu çalıştırıp şemayı test DB'ye uygula. 3) Şema başarılı göç ettikten sonra test scriptlerini koştur. Bu sayede testler her zaman en güncel DB yapısıyla çalışır."
        },
        "code": {
          "en": "# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update",
          "tr": "# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q50: What is the N+1 query problem and how do you detect it in QA test automation?",
          "tr": "Soru 50: N+1 sorgu problemi nedir ve QA test otomasyonunda nasıl tespit edilir?"
        },
        "answer": {
          "en": "The N+1 problem: 1 query fetches N parent records, then N more queries fetch each child separately (N+1 DB round-trips). Example: 100 orders + 100 item queries instead of 1 JOIN. Detect in QA: 1) Enable SQL query logging in test env. 2) Assert page load triggers fewer queries than a threshold. 3) Use Hibernate stats or p6spy to count queries per test. Java analogy: calling a DB method inside a for-each loop.",
          "tr": "N+1 problemi: 1 sorgu N parent kaydı getirir, ardından her biri için N sorgu daha koşar (N+1 DB turu). Örnek: 100 sipariş + 100 ürün sorgusu yerine 1 JOIN yeterli. QA tespit: 1) Test ortamında SQL loglama etkinleştir. 2) Sayfa yüklemesinin sorgu limitini aşmadığını assert et. 3) Hibernate istatistikleri veya p6spy ile test başına sorgu sayısını say. Java analogu: for-each döngüsü içinde DB metodu çağırmak."
        },
        "code": {
          "en": "-- N+1 (bad): 1 parent query + N child queries in loop\nSELECT * FROM orders;  -- then loop: SELECT * FROM items WHERE order_id = ?\n\n-- Fix: single JOIN (1 query total)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;",
          "tr": "-- N+1 (kötü): 1 parent sorgusu + döngüde N alt sorgu\nSELECT * FROM orders;  -- sonra: SELECT * FROM items WHERE order_id = ?\n\n-- Düzeltme: tek JOIN (toplam 1 sorgu)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;"
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Yukarıdaki sorguda `LEFT JOIN bugs` kullanılıyor, `JOIN` (INNER JOIN) değil. Bunun sonuçlar üzerindeki etkisi nedir?",
          "en": "The query above uses `LEFT JOIN bugs`, not a plain `JOIN` (INNER JOIN). What effect does this have on the results?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Hiçbir testers satırı dönmez",
              "en": "No testers rows are returned at all"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Hiç bug'ı olmayan tester'lar da sonuçta görünür (bug sayısı 0 olur); INNER JOIN onları tamamen hariç tutardı",
              "en": "Testers with zero bugs still appear in the result (with a bug count of 0); an INNER JOIN would exclude them entirely"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sadece bug'ı olan tester'lar görünür, aynı INNER JOIN gibi",
              "en": "Only testers with bugs appear, same as an INNER JOIN"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorgu performansını artırır, sonuçları değiştirmez",
              "en": "It only improves performance, does not change results"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "LEFT JOIN, sol tablodaki (testers) TÜM satırları tutar; sağ tabloda (bugs) eşleşme yoksa o satırların alanları NULL olur (COUNT(b.id) bu durumda 0 sayar). INNER JOIN (sade JOIN) ise sadece İKİ tarafta da eşleşme olan satırları döndürür — hiç bug açmamış bir tester INNER JOIN sonucunda tamamen kaybolurdu. Bu fark, \"hiç hatası olmayan testerlar dahil\" raporlama gibi gerçek QA senaryolarında kritiktir.",
          "en": "LEFT JOIN keeps ALL rows from the left table (testers); if there is no match in the right table (bugs), those fields become NULL (so COUNT(b.id) counts as 0). An INNER JOIN (plain JOIN) only returns rows where BOTH sides match — a tester with zero bugs would disappear entirely from an INNER JOIN result. This distinction matters in real QA reporting scenarios like \"include testers with zero bugs\"."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir LEFT JOIN sorgusunda `WHERE bugs.severity = 'HIGH'` koşulu eklersen, bunun sonuçlar üzerinde fark etmediğin bir etkisi olabilir. Bu etki nedir?",
            "en": "If you add `WHERE bugs.severity = 'HIGH'` to a LEFT JOIN query, it can have an effect on results you might not expect. What is it?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Hiçbir etkisi yok, LEFT JOIN davranışı tamamen korunur",
                "en": "No effect at all, LEFT JOIN behavior is fully preserved"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu NULL satırları (bug'ı olmayan tester'lar) filtreler, LEFT JOIN'i fiilen bir INNER JOIN gibi davranmaya zorlar",
                "en": "The WHERE clause filters out the NULL rows (testers with no bugs), effectively forcing the LEFT JOIN to behave like an INNER JOIN"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgu syntax hatası verir",
                "en": "The query throws a syntax error"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "LEFT JOIN otomatik olarak RIGHT JOIN'e dönüşür",
                "en": "The LEFT JOIN automatically converts to a RIGHT JOIN"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "WHERE, JOIN tamamlandıktan SONRA uygulanır. Bug'ı olmayan bir tester'ın `bugs.severity` alanı NULL'dur, ve `NULL = 'HIGH'` her zaman UNKNOWN (yanlış) değerlendirilir — bu yüzden o satır WHERE tarafından elenir. Sonuç, LEFT JOIN'in \"sıfır eşleşmeli satırları da tut\" amacının fiilen iptal olmasıdır. Bu koşulu LEFT JOIN'i bozmadan filtrelemek istiyorsan, WHERE yerine ON clause'una taşımalısın.",
            "en": "WHERE is applied AFTER the join completes. A tester with no bugs has `bugs.severity` as NULL, and `NULL = 'HIGH'` always evaluates to UNKNOWN (falsy) — so that row gets filtered out by WHERE. The net effect is that the LEFT JOIN's purpose of keeping zero-match rows gets effectively cancelled. To filter like this without breaking the LEFT JOIN, you would move that condition into the ON clause instead of WHERE."
          }
        }
      }
    ]
  },
  {
    "title": "🛠️ DBeaver — Visual Database Manager",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🛠️",
        "content": {
          "tr": "DBeaver, veritabanına bağlanmak için görsel bir kontrol paneli — Excel açar gibi açar, tablolara tıklar, SQL yazar çalıştırırsın. Terminal komutlarına gerek yok. Next.js projenin arkasındaki PostgreSQL'i DBeaver'da görmek, dosya yöneticisinde klasör açmak kadar kolay.",
          "en": "DBeaver is like a visual control panel for your database — open it like Excel, click on tables, write and run SQL instantly. No terminal commands needed. Seeing the PostgreSQL database behind your Next.js project in DBeaver is as easy as opening a folder in a file manager."
        }
      },
      {
        "type": "heading",
        "text": "DBeaver Nedir? / What is DBeaver?"
      },
      {
        "type": "text",
        "content": {
          "tr": "DBeaver, MySQL, PostgreSQL, SQLite, Oracle ve SQL Server dahil **80+ veritabanını** destekleyen **tamamen ücretsiz açık kaynaklı** bir veritabanı yönetim aracıdır. Java'daki ücretli DataGrip veya MySQL Workbench'in ücretsiz alternatifi olarak düşün. Java'da JDBC ile komut satırından sorgu çalıştırmak yerine, DBeaver ile aynı işi görsel arayüzde yaparsın: tablo yapılarına tıkla, FK ilişkilerini gör, sorgu sonuçlarını spreadsheet'te incele.",
          "en": "DBeaver is a **100% free, open-source** database management tool supporting **80+ databases** including MySQL, PostgreSQL, SQLite, Oracle, and SQL Server. Think of it as the free alternative to the paid DataGrip or MySQL Workbench. In Java you ran queries from the command line via JDBC — DBeaver does the same visually: click table structures, see FK relationships, view results in a spreadsheet."
        }
      },
      {
        "type": "grid",
        "cols": 3,
        "items": [
          {
            "icon": "🆓",
            "label": "Tamamen Ücretsiz",
            "desc": "Community Edition %100 ücretsiz ve açık kaynak. Lisans ücreti yok, abonelik yok."
          },
          {
            "icon": "🗄️",
            "label": "80+ Veritabanı",
            "desc": "MySQL, PostgreSQL, SQLite, Oracle, SQL Server, MongoDB, Redis ve daha fazlası."
          },
          {
            "icon": "🎨",
            "label": "Görsel Schema Editörü",
            "desc": "Tablolara tıkla-gez, ER diyagramları, görsel foreign key tarayıcı."
          },
          {
            "icon": "⚡",
            "label": "SQL Editör + Autocomplete",
            "desc": "Syntax highlight, otomatik tamamlama, sorgu geçmişi ve explain plan."
          },
          {
            "icon": "📊",
            "label": "Veri Dışa Aktarma",
            "desc": "CSV, Excel, JSON, SQL formatlarında dışa aktar. Dosyadan içe aktar."
          },
          {
            "icon": "🔐",
            "label": "SSH Tüneli",
            "desc": "SSH tüneli ile uzak production veritabanlarına güvenli, şifreli bağlantı."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Kurulum / Installation"
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "1️⃣",
            "label": "İndir",
            "desc": "dbeaver.io → Community Edition → İşletim sisteminize uygun paketi seç"
          },
          {
            "icon": "2️⃣",
            "label": "Kur",
            "desc": "Windows: .exe çalıştır · macOS: .dmg sürükle · Linux: .deb veya snap"
          },
          {
            "icon": "3️⃣",
            "label": "Aç",
            "desc": "İlk açılışta yerleşik Java (JRE) indirir — internet bağlantısı gerekli"
          },
          {
            "icon": "4️⃣",
            "label": "Doğrula",
            "desc": "Help → About DBeaver → versiyon bilgisi görünmeli"
          }
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# Windows kurulum (winget paket yöneticisi)\nwinget install dbeaver.dbeaver\n\n# macOS kurulum (Homebrew)\nbrew install --cask dbeaver-community\n\n# Ubuntu/Debian kurulum\nwget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -\necho 'deb https://dbeaver.io/debs/dbeaver-ce /' | sudo tee /etc/apt/sources.list.d/dbeaver.list\nsudo apt update && sudo apt install dbeaver-ce\n\n# Linux Snap (en kolay yol)\nsnap install dbeaver-ce\n\n# Sürüm doğrulama: Help → About DBeaver menüsünden versiyon görünür"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "💡",
        "title": {
          "tr": "İlk Bağlantı İpucu",
          "en": "First Connection Tip"
        },
        "content": {
          "tr": "DBeaver açılınca 'Yeni Bağlantı Sihirbazı' görünür. **SQLite** için mevcut bir `.db` dosyasına işaret etmen yeterli — sunucu gerekmez. **PostgreSQL/MySQL** için önce sunucunun çalıştığından emin ol: `pg_isready` veya `mysqladmin ping` bunu doğrular.",
          "en": "DBeaver shows 'New Connection Wizard' on first launch. For **SQLite** just point to an existing `.db` file — no server needed. For **PostgreSQL/MySQL** confirm the server is running first: `pg_isready` or `mysqladmin ping` will verify this."
        }
      },
      {
        "type": "heading",
        "text": "Sıfırdan Veritabanı + Schema Oluşturma / Create DB & Schema"
      },
      {
        "type": "text",
        "content": {
          "tr": "DBeaver'da sıfırdan bir veritabanı oluşturmak **4 adımda** tamamlanır. Java'da Hibernate ile database schema'sını başlatmak gibi — ama terminal veya XML konfigürasyonu olmadan.",
          "en": "Creating a database from scratch in DBeaver takes **4 steps**. This is the equivalent of bootstrapping a database schema with Hibernate in Java — but without terminal commands or XML configuration files."
        }
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "🔌",
            "label": "1. Bağlantı Kur",
            "desc": "Database Navigator (sol) → + simgesi → Veritabanı türünü seç → Host/Port/User/Password doldur"
          },
          {
            "icon": "🗃️",
            "label": "2. Database Oluştur",
            "desc": "Bağlantıya sağ tık → Create → Database → İsim ver (örn: myapp_db)"
          },
          {
            "icon": "📋",
            "label": "3. SQL Schema Yaz",
            "desc": "SQL Editor aç (F3) → CREATE TABLE sorgularını yaz → Ctrl+Enter ile çalıştır"
          },
          {
            "icon": "✅",
            "label": "4. Doğrula",
            "desc": "Navigator'da tabloya çift tık → Data sekmesi → satırları grid'de gör"
          }
        ]
      },
      {
        "type": "code",
        "language": "sql",
        "code": "-- DBeaver SQL Editor'de çalıştır (F3 ile aç, Ctrl+Enter ile çalıştır)\n\n-- 1. Database oluştur (PostgreSQL için)\nCREATE DATABASE myapp_db;\n\n-- 2. Schema oluştur (Java'daki package gibi — namespace sağlar)\nCREATE SCHEMA IF NOT EXISTS app;\n\n-- 3. Kullanıcı tablosu\nCREATE TABLE app.users (\n  id         SERIAL       PRIMARY KEY,           -- otomatik artan birincil anahtar\n  email      VARCHAR(255) UNIQUE NOT NULL,        -- benzersiz ve zorunlu\n  name       VARCHAR(100) NOT NULL,               -- zorunlu alan\n  role       VARCHAR(20)  DEFAULT 'user',         -- varsayılan değer\n  created_at TIMESTAMP    DEFAULT NOW()           -- kayıt zamanı otomatik atanır\n);\n\n-- 4. Post tablosu (users ile foreign key ilişkisi)\nCREATE TABLE app.posts (\n  id         SERIAL       PRIMARY KEY,\n  title      VARCHAR(300) NOT NULL,\n  content    TEXT,\n  author_id  INT REFERENCES app.users(id) ON DELETE CASCADE, -- FK → users tablosu\n  published  BOOLEAN      DEFAULT false,\n  created_at TIMESTAMP    DEFAULT NOW()\n);\n\n-- 5. Test verisi ekle\nINSERT INTO app.users (email, name, role) VALUES\n  ('alice@example.com', 'Alice', 'admin'),\n  ('bob@example.com',   'Bob',   'user');\n\nINSERT INTO app.posts (title, content, author_id, published) VALUES\n  ('Hello World', 'İlk içerik', 1, true),\n  ('Taslak Yazı', NULL,         2, false);\n\n-- 6. JOIN ile ilişkili veriyi doğrula\nSELECT u.name, p.title, p.published\nFROM   app.users u\nJOIN   app.posts p ON p.author_id = u.id\nORDER  BY p.created_at DESC;"
      },
      {
        "type": "callout",
        "color": "green",
        "emoji": "🎨",
        "title": {
          "tr": "DBeaver ER Diyagramı",
          "en": "DBeaver ER Diagram"
        },
        "content": {
          "tr": "Tabloları oluşturduktan sonra: **Database Navigator'da veritabanına sağ tık → ER Diagram**. DBeaver, `users` ve `posts` arasındaki FK ilişkisini otomatik olarak görsel bir diyagram olarak render eder. Büyük projelerde tüm schema'yı anlamak için bu özelliği kullan.",
          "en": "After creating your tables: **right-click the database in Database Navigator → ER Diagram**. DBeaver automatically renders the FK relationship between `users` and `posts` as a visual diagram. Use this to understand the complete schema in large projects."
        }
      },
      {
        "type": "heading",
        "text": "Next.js + PostgreSQL Entegrasyonu / Integration"
      },
      {
        "type": "text",
        "content": {
          "tr": "Next.js uygulamanı veritabanına bağlamak için iki modern yaklaşım var: **1) pg (Direct Driver)** — ham SQL, tam kontrol, Java'da JDBC'ye karşılık gelir. **2) Prisma ORM** — type-safe, otomatik migration, Java'da Hibernate/JPA'ya karşılık gelir. İkisi de DBeaver'da oluşturduğun aynı veritabanına bağlanır.",
          "en": "There are two modern approaches to connect Next.js to the database: **1) pg (Direct Driver)** — raw SQL, full control, the equivalent of JDBC in Java. **2) Prisma ORM** — type-safe, auto-migrations, the equivalent of Hibernate/JPA in Java. Both connect to the same database you created in DBeaver."
        }
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "🌐",
            "label": "Browser / Client",
            "desc": "fetch('/api/users') → HTTP isteği gönderir"
          },
          {
            "icon": "⚡",
            "label": "Next.js API Route",
            "desc": "/app/api/users/route.ts → isteği işler"
          },
          {
            "icon": "🔗",
            "label": "Driver / ORM",
            "desc": "pg (ham SQL) veya Prisma (ORM) — DB ile konuşur"
          },
          {
            "icon": "🗄️",
            "label": "PostgreSQL",
            "desc": "DBeaver ile yönetilen veritabanı"
          }
        ]
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Yaklaşım 1: pg paketi (ham SQL) — Java'daki JDBC gibi, tam kontrol\n// Kurulum: npm install pg @types/pg\n\n// lib/db.ts — tek connection pool (bağlantı havuzu) oluştur\nimport { Pool } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL, // .env.local'da tanımla\n  max: 10,                                    // maksimum eşzamanlı bağlantı\n});\n\nexport default pool;\n\n// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\nimport pool from '@/lib/db';\n\nexport async function GET() {\n  const result = await pool.query(\n    'SELECT id, name, email FROM app.users ORDER BY created_at DESC'\n  );\n  return NextResponse.json(result.rows);\n}\n\nexport async function POST(req: Request) {\n  const { name, email } = await req.json();\n  const result = await pool.query(\n    'INSERT INTO app.users (name, email) VALUES ($1, $2) RETURNING *',\n    [name, email]  // parametreli sorgu — SQL injection'a karşı güvenli\n  );\n  return NextResponse.json(result.rows[0], { status: 201 });\n}"
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Yaklaşım 2: Prisma ORM — Java'daki Hibernate/JPA gibi, type-safe\n// Kurulum: npm install prisma @prisma/client && npx prisma init\n\n// prisma/schema.prisma — şema TypeScript benzeri DSL ile yazılır\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  role      String   @default(\"user\")\n  posts     Post[]   // ilişki — User'ın Post listesi var\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String?\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  Int      // FK sütunu\n  published Boolean  @default(false)\n  createdAt DateTime @default(now())\n}\n\n// app/api/users/route.ts — Prisma ile\nimport { NextResponse } from 'next/server';\nimport { PrismaClient }  from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport async function GET() {\n  const users = await prisma.user.findMany({\n    include: { posts: { where: { published: true } } } // yayınlanmış post'ları dahil et\n  });\n  return NextResponse.json(users);\n}\n\n// Migration çalıştır (DBeaver'daki CREATE TABLE'a karşılık gelir)\n// npx prisma migrate dev --name init"
      },
      {
        "type": "table",
        "headers": [
          "Özellik / Feature",
          "pg (Raw SQL)",
          "Prisma ORM"
        ],
        "rows": [
          [
            "Öğrenme eğrisi",
            "SQL biliyorsan sıfır",
            "Prisma DSL öğren (~1 gün)"
          ],
          [
            "Type safety",
            "Manuel cast gerekir",
            "✅ Otomatik TypeScript tipleri"
          ],
          [
            "Migration yönetimi",
            "Elle SQL dosyası yaz",
            "✅ npx prisma migrate dev"
          ],
          [
            "Sorgu performansı",
            "Tam kontrol, optimize et",
            "Karmaşık JOIN'lerde dikkatli ol"
          ],
          [
            "DBeaver uyumu",
            "✅ Aynı DB'ye bağlanır",
            "✅ Prisma Studio da var"
          ],
          [
            "Java karşılığı",
            "JDBC",
            "Hibernate / JPA"
          ],
          [
            "Ne zaman seç",
            "Karmaşık SQL, tam kontrol",
            "Hızlı başlangıç, type-safe API"
          ]
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# .env.local dosyası (git'e EKLEME — .gitignore'a ekle!)\n\n# PostgreSQL bağlantı URL formatı\nDATABASE_URL=\"postgresql://kullanici:sifre@localhost:5432/myapp_db?schema=app\"\n\n# SQLite için (geliştirme ortamı — sunucu gerekmez)\n# DATABASE_URL=\"file:./dev.db\"\n\n# DBeaver bağlantı ayarları (aynı veritabanına bağlanır)\n# Host     : localhost\n# Port     : 5432  (PostgreSQL varsayılanı)\n# Database : myapp_db\n# Username : kullanici\n# Password : sifre\n# Schema   : app"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "DBeaver'da bir tablonun içindeki verileri nasıl görürsün?",
          "en": "How do you view the data inside a table in DBeaver?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tabloya çift tık → Data sekmesi — tüm satırlar düzenlenebilir grid'de görünür",
              "en": "Double-click the table → Data tab — all rows appear in an editable grid"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Önce terminalde psql ile bağlanman gerekir",
              "en": "You must first connect via psql in the terminal"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tabloya sağ tık → Export Data → CSV oluştur",
              "en": "Right-click the table → Export Data → generate CSV"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "DBeaver tablo verilerini gösteremez, sadece schema yapısını gösterir",
              "en": "DBeaver cannot show table data, only schema structure"
            }
          }
        ],
        "correct": "a",
        "explanation": {
          "tr": "DBeaver'da tabloya çift tıklayınca Properties, Data ve ER Diagram sekmeleri açılır. **Data** sekmesi tüm satırları düzenlenebilir grid'de gösterir — inline düzenleyebilir, yeni satır ekleyebilir, silebilirsin. Sağ tık → Export Data ile CSV veya Excel'e aktarım yapılabilir.",
          "en": "Double-clicking a table in DBeaver opens Properties, Data, and ER Diagram tabs. The **Data** tab shows all rows in an editable grid — you can edit rows inline, add new rows, and delete them. Right-click → Export Data to export to CSV or Excel."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Next.js'te veritabanı bağlantısı neden tek bir `Pool` (connection pool) üzerinden yapılmalıdır?",
          "en": "Why should the database connection in Next.js go through a single `Pool` (connection pool)?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "PostgreSQL aynı anda yalnızca 1 bağlantı kabul eder",
              "en": "PostgreSQL only accepts 1 connection at a time"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Her API isteğinde yeni bağlantı açmak pahalıdır — Pool bağlantıları yeniden kullanarak hızı artırır ve veritabanını limit aşımından korur",
              "en": "Opening a new connection per request is expensive — a Pool reuses connections, increasing speed and protecting the database from hitting max connection limits"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Pool sadece Prisma ile çalışır, pg ile çalışmaz",
              "en": "Pool only works with Prisma, not with pg"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Pool yalnızca production ortamında gereklidir",
              "en": "A Pool is only necessary in production environments"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Her HTTP isteğinde yeni TCP bağlantısı kurmak ~100-200ms overhead ekler ve veritabanının max connection limitine çarpılırsın. Connection Pool bağlantıları önceden hazır tutar ve istekler arasında paylaşır. Java'da HikariCP / DBCP bu yüzden standarttır — her istek için `DriverManager.getConnection()` çağırmak yerine pool'dan alınır.",
          "en": "Creating a new TCP connection per HTTP request adds ~100-200ms overhead and you can hit the database's max connection limit under load. A Connection Pool keeps connections pre-opened and shares them across requests. In Java, HikariCP / DBCP is standard for the same reason — instead of calling `DriverManager.getConnection()` per request, you borrow from the pool."
        }
      },
      {
        "type": "callout",
        "color": "green",
        "emoji": "✅",
        "title": {
          "tr": "DBeaver + Next.js Özet",
          "en": "DBeaver + Next.js Summary"
        },
        "content": {
          "tr": "1. **DBeaver kur** — Windows (winget), macOS (brew), Linux (snap)\n2. **Bağlantı kur** — SQLite için .db dosyası, PostgreSQL için host/port/user/db\n3. **Schema oluştur** — SQL Editor'de CREATE TABLE sorgularını çalıştır\n4. **Driver seç** — pg (JDBC gibi, tam kontrol) veya Prisma (Hibernate gibi, type-safe)\n5. **DATABASE_URL** yaz — .env.local'a ekle, git'e asla ekleme\n6. **DBeaver açık tut** — API'nin yaptığı değişiklikleri gerçek zamanlı izle",
          "en": "1. **Install DBeaver** — Windows (winget), macOS (brew), Linux (snap)\n2. **Create connection** — for SQLite use .db file, for PostgreSQL use host/port/user/db\n3. **Build schema** — run CREATE TABLE queries in SQL Editor\n4. **Choose driver** — pg (like JDBC, full control) or Prisma (like Hibernate, type-safe)\n5. **Set DATABASE_URL** — add to .env.local, never commit it\n6. **Keep DBeaver open** — watch the data changes your API makes in real time"
        }
      }
    ]
  }
];
const finalTrSections = [
  {
    "title": "🎯 SQL Nedir & Her QA Mühendisi Neden Bilmeli?",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🗃️",
        "content": {
          "tr": "SQL, veritabanına 'benim için şunu bul' demek gibi. Kütüphaneciye hangi kitapları istediğini söylemek gibi. Test ettiğin uygulamanın arkasında her zaman bir veritabanı vardır — SQL ile UI'nın gösterdiklerini değil, gerçekte ne olduğunu görebilirsin.",
          "en": "SQL is how you talk to a database — like telling a librarian exactly which books you want. Every app you test has a database behind it. SQL lets you see what actually happened, not just what the UI shows."
        }
      },
      {
        "type": "heading",
        "text": "Veritabanı Nedir?"
      },
      {
        "type": "text",
        "content": "Veritabanı, elektronik ortamda depolanan yapılandırılmış veri koleksiyonudur. Milyonlarca satır saklayan, ilgili verileri birbirine bağlayan ve karmaşık sorulara milisaniyeler içinde yanıt veren güçlü bir spreadsheet gibi düşünebilirsiniz. Test ettiğiniz her uygulamanın verileri neredeyse her zaman bir veritabanında saklanır."
      },
      {
        "type": "heading",
        "text": "SQL Nedir?"
      },
      {
        "type": "text",
        "content": "SQL (Structured Query Language), ilişkisel veritabanlarıyla iletişim kurmak için standart dildir. Soru sormak ('bugün kaç kullanıcı kaydoldu?'), veri eklemek, kayıt güncellemek ve silmek için kullanılır. 1970'lerden bu yana endüstri standardıdır; MySQL, PostgreSQL, SQLite, SQL Server ve Oracle dahil tüm büyük veritabanlarında çalışır."
      },
      {
        "type": "heading",
        "text": "QA Mühendisleri Neden SQL Bilmeli?"
      },
      {
        "type": "grid",
        "cols": 3,
        "items": [
          {
            "icon": "✅",
            "label": "Backend Durumunu Doğrula",
            "desc": "UI işleminden sonra DB'yi sorgulayarak verinin doğru kaydedildiğini doğrulayın — yalnızca UI'ya güvenmeyin."
          },
          {
            "icon": "🌱",
            "label": "Test Verisi Ekle",
            "desc": "Testler çalışmadan önce INSERT ile test kullanıcıları, ürünler ve siparişleri ekleyin — manuel kurulum gerekmez."
          },
          {
            "icon": "🧹",
            "label": "Test Sonrası Temizlik",
            "desc": "Her çalıştırmadan sonra test kayıtlarını DELETE edin, sonraki çalıştırma temiz başlasın."
          },
          {
            "icon": "🔍",
            "label": "Backend Doğrulaması",
            "desc": "İş kurallarını kontrol edin: sipariş toplamı = satır kalemlerinin toplamı, FK kısıtlamaları, veri bütünlüğü."
          },
          {
            "icon": "⚡",
            "label": "UI'dan Daha Hızlı",
            "desc": "Bir DB sorgusu milisaniyeler alır. Aynı veriye UI üzerinden tıklayarak ulaşmak dakikalar sürer."
          },
          {
            "icon": "🐛",
            "label": "Gizli Hataları Bul",
            "desc": "UI başarı gösteriyor ama DB güncellenmedi — SQL gerçeği ortaya koyar."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Temel Veritabanı Terminolojisi"
      },
      {
        "type": "table",
        "headers": [
          "Terim",
          "Anlam",
          "Örnek"
        ],
        "rows": [
          [
            "Table (Tablo)",
            "Satır ve sütunlarda veri saklar (spreadsheet gibi)",
            "\"users\" tablosu: id, email, age sütunları"
          ],
          [
            "Row / Record (Satır)",
            "Tablodaki tek bir kayıt",
            "Tek kullanıcı: {id:1, email:\"alice@test.com\"}"
          ],
          [
            "Column / Field (Sütun)",
            "Her satır için saklanan bir özellik",
            "\"email\", \"created_at\", \"is_active\""
          ],
          [
            "Primary Key",
            "Her satır için benzersiz tanımlayıcı — NULL olamaz, tekrar edemez",
            "\"id\" sütunu, AUTO_INCREMENT ile"
          ],
          [
            "Foreign Key",
            "Başka tablonun PK'sını referans alan sütun — ilişki ve bütünlük sağlar",
            "\"orders.user_id\" → \"users.id\""
          ],
          [
            "Index",
            "Sütun aramalarını hızlandıran veri yapısı",
            "\"email\" sütununa INDEX → hızlı WHERE email=?"
          ],
          [
            "Schema",
            "Veritabanının planı — tüm tablolar, sütunlar, tipler, kısıtlamalar",
            "CREATE TABLE tanımları"
          ],
          [
            "Query (Sorgu)",
            "SQL kullanılarak veritabanına gönderilen istek",
            "SELECT * FROM users WHERE age > 25"
          ]
        ]
      },
      {
        "type": "heading",
        "text": "Popüler Veritabanları Karşılaştırması"
      },
      {
        "type": "table",
        "headers": [
          "Veritabanı",
          "Tip",
          "En İyi Kullanım",
          "Ücretsiz?"
        ],
        "rows": [
          [
            "MySQL",
            "Açık kaynak",
            "Web uygulamaları, endüstride en yaygın",
            "✅ Evet"
          ],
          [
            "PostgreSQL",
            "Açık kaynak",
            "Karmaşık sorgular, JSON, kurumsal uygulamalar",
            "✅ Evet"
          ],
          [
            "SQLite",
            "Gömülü / sunucusuz",
            "Yerel geliştirme, test, mobil uygulamalar",
            "✅ Evet"
          ],
          [
            "SQL Server",
            "Microsoft ticari",
            "Windows/.NET kurumsal uygulamalar",
            "✅ Express sürüm"
          ],
          [
            "Oracle",
            "Ticari kurumsal",
            "Büyük ölçekli bankacılık/finans",
            "❌ Ücretli"
          ]
        ]
      },
      {
        "type": "tip",
        "content": "SQLiteOnline.com ile öğrenmeye başlayın — tarayıcınızda çalışır, kurulum gerekmez. Gerçek ortam için DBeaver (ücretsiz GUI) kurun ve SQLite veya MySQL'e bağlanın."
      },
      {
        "type": "heading",
        "text": "SQL, QA İş Akışında Nerede Kullanılır?"
      },
      {
        "type": "visual",
        "variant": "boxes",
        "title": "SQL Test Sürecinize Nasıl Entegre Olur?",
        "items": [
          {
            "icon": "🧪",
            "label": "Test Scripti",
            "desc": "Playwright / pytest"
          },
          {
            "arrow": true
          },
          {
            "icon": "🖥️",
            "label": "Uygulama UI/API",
            "desc": "DB değişikliği yapar"
          },
          {
            "arrow": true
          },
          {
            "icon": "🗄️",
            "label": "Veritabanı",
            "desc": "MySQL / PostgreSQL"
          },
          {
            "arrow": true
          },
          {
            "icon": "🔍",
            "label": "SQL Sorgusu",
            "desc": "Buradan doğrularsın!",
            "highlight": true
          }
        ],
        "note": "Her test işleminden sonra bir SQL sorgusu veritabanı durumunun doğru şekilde güncellendiğini doğrulayabilir — yalnızca UI'nun gösterdiğine güvenmeyin."
      },
      {
        "type": "visual",
        "variant": "table",
        "title": "Örnek: Bir Veritabanı Tablosu",
        "tables": [
          {
            "name": "users",
            "columns": [
              {
                "name": "id",
                "type": "INT",
                "pk": true
              },
              {
                "name": "name",
                "type": "VARCHAR"
              },
              {
                "name": "email",
                "type": "VARCHAR"
              },
              {
                "name": "role",
                "type": "VARCHAR"
              },
              {
                "name": "created_at",
                "type": "DATETIME"
              }
            ],
            "rows": [
              {
                "cells": [
                  1,
                  "Alice",
                  "alice@test.com",
                  "admin",
                  "2024-01-10"
                ]
              },
              {
                "cells": [
                  2,
                  "Bob",
                  "bob@test.com",
                  "user",
                  "2024-01-12"
                ]
              },
              {
                "cells": [
                  3,
                  "Carol",
                  "carol@test.com",
                  "user",
                  "2024-01-15"
                ],
                "highlighted": true
              }
            ]
          }
        ],
        "note": "Her satır bir kayıttır. Her sütun bir alandır. id, Primary Key'dir — her satırı benzersiz olarak tanımlar."
      },
      {
        "type": "quiz",
        "question": "SQL neyin kısaltmasıdır?",
        "options": [
          "Standard Query Logic",
          "Structured Query Language",
          "Simple Question Language",
          "Sequential Query Library"
        ],
        "correct": 1,
        "explanation": "SQL = Structured Query Language (Yapılandırılmış Sorgu Dili). 1970'lerden bu yana ilişkisel veritabanları için standart dildir; MySQL, PostgreSQL, SQLite, Oracle ve SQL Server tarafından kullanılır.",
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Veritabanı (Database) ile SQL arasındaki farkı ve bir test otomasyon mühendisi için veritabanını doğrudan sorgulamanın neden hayati önem taşıdığını açıklayın.",
        "promptEn": "Explain the difference between a Database and SQL, and why directly querying the database is crucial for a test automation engineer.",
        "keywords": [
          [
            "database",
            "veritabanı"
          ],
          [
            "sql",
            "query",
            "sorgu"
          ],
          [
            "otomasyon",
            "automation"
          ],
          [
            "backend",
            "verileme",
            "validation"
          ],
          [
            "ui",
            "arayüz"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Veritabanı verilerin fiziksel olarak saklandığı yerdir. SQL ise bu veritabanıyla konuşmak için kullandığımız dildir. Test otomasyonunda sadece arayüze (UI) güvenmek yerine veritabanını doğrudan sorgulayarak backend durumunu ve veri bütünlüğünü kesin olarak doğrularız.",
        "modelAnswerEn": "A database is where data is physically stored, and SQL is the language used to communicate with it. In automation, querying the database directly allows us to verify backend state and data integrity, rather than relying solely on UI assertions."
      }
    ]
  },
  {
    "title": "📦 Kurulum",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🛠️",
        "content": {
          "tr": "SQL kurulumu, Java'da IDE kurmaya benzer — bir kere yaparsın, sonra sadece yazarsın. SQLite için sunucu bile gerekmez; tüm veritabanın tek bir dosyada durur. Online editörlerle tarayıcıdan da başlayabilirsin.",
          "en": "Setting up SQL is like installing an IDE for Java — do it once, then just write. SQLite needs no server at all; your entire database lives in a single file. You can even start with an online editor right in your browser."
        }
      },
      {
        "type": "heading",
        "text": "Seçenek A: Kurulum Gerektirmeyen Çevrimiçi Editörler (Buradan Başlayın)"
      },
      {
        "type": "list",
        "icon": "🌐",
        "items": [
          {
            "label": "db-fiddle.com",
            "desc": "En iyi seçenek. MySQL, PostgreSQL, SQLite. Schema + sorgu bölünmüş görünüm."
          },
          {
            "label": "sqliteonline.com",
            "desc": "SQLite'ı tarayıcınızda çalıştırır. .db dosyası yükleyin veya tablo oluşturun."
          },
          {
            "label": "sqlfiddle.com",
            "desc": "Klasik. Birden fazla DB motoru. Örnekleri paylaşmak için uygun."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Seçenek B: SQLite CLI (En Hafif Yerel Seçenek)"
      },
      {
        "type": "steps",
        "items": [
          "Windows: sqlite.org/download.html'den \"sqlite-tools-win32\" indirin ve C:\\sqlite\\ klasörüne çıkarın",
          "Mac: Zaten yüklü! Çalıştır: sqlite3 — veya Homebrew ile: brew install sqlite",
          "Linux: sudo apt install sqlite3",
          "Veritabanı oluştur: sqlite3 mytest.db",
          "Doğrula: SELECT sqlite_version();"
        ]
      },
      {
        "type": "code",
        "code": "-- SQLite CLI quick reference:\nsqlite3 mytest.db        -- open or create database\n\n.tables                  -- list all tables\n.schema users            -- show CREATE TABLE for \"users\"\n.headers on              -- show column headers in output\n.mode column             -- aligned column output\n.quit                    -- exit SQLite\n\nSELECT sqlite_version();",
        "expected": "3.43.0"
      },
      {
        "type": "heading",
        "text": "Seçenek C: MySQL Community Server"
      },
      {
        "type": "steps",
        "items": [
          "Windows: dev.mysql.com/downloads/installer/ adresinden MySQL Installer indirin → \"Developer Default\" seçin",
          "Mac: brew install mysql → brew services start mysql → mysql -u root",
          "Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root",
          "Kurulumu doğrula: SELECT VERSION();"
        ]
      },
      {
        "type": "code",
        "code": "-- Connect and verify:\nmysql -u root -p          -- connect with root user (enter password)\n\nSELECT VERSION();         -- check MySQL version",
        "expected": "+-----------+\n| VERSION() |\n+-----------+\n| 8.0.35    |\n+-----------+"
      },
      {
        "type": "heading",
        "text": "Seçenek D: DBeaver GUI (Yeni Başlayanlar için Önerilen)"
      },
      {
        "type": "text",
        "content": "DBeaver, tüm veritabanlarıyla çalışan ücretsiz evrensel bir GUI'dir. Komut satırından çok daha kolaydır — tabloları görsel olarak inceleyebilir ve otomatik tamamlama ile sorgular çalıştırabilirsiniz."
      },
      {
        "type": "steps",
        "items": [
          "dbeaver.io adresinden DBeaver Community'i indirin (ücretsiz)",
          "DBeaver'ı kurun ve başlatın",
          "\"New Database Connection\" seçeneğine tıklayın (sol üstteki fiş simgesi)",
          "DB türünüzü seçin: SQLite, MySQL veya PostgreSQL",
          "SQLite: Göz At'a tıklayın → .db dosyanızı seçin (veya yeni oluşturun)",
          "MySQL/PostgreSQL: host, port, veritabanı adı, kullanıcı adı ve şifreyi girin",
          "\"Test Connection\"'a tıklayın — Finish'ten önce yeşil \"Connected\" mesajı görünmeli",
          "Ctrl+] ile SQL Editor'ü açın ve sorgu yazmaya başlayın"
        ]
      },
      {
        "type": "heading",
        "text": "Python'da SQL Kullanımı (Test Otomasyonu için)"
      },
      {
        "type": "code",
        "code": "# SQLite — built into Python, no install needed:\nimport sqlite3\n\nconn   = sqlite3.connect(\"test.db\")   # connect (creates file if not exists)\ncursor = conn.cursor()\n\ncursor.execute(\"SELECT * FROM users WHERE age > 25\")\nrows = cursor.fetchall()              # get all results as list of tuples\n\nfor row in rows:\n    print(row)\n\nconn.close()\n\n# PostgreSQL — install: pip install psycopg2-binary\nimport psycopg2\n\nconn = psycopg2.connect(\n    host=\"localhost\", database=\"testdb\",\n    user=\"postgres\",  password=\"mypassword\"\n)\ncursor = conn.cursor()\ncursor.execute(\"SELECT COUNT(*) FROM orders WHERE status = 'pending'\")\ncount = cursor.fetchone()[0]\nprint(f\"Pending orders: {count}\")\nconn.close()"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Yeni başlayan biri için SQL öğrenmeye en hızlı şekilde başlamak isterse hangi kurulum seçeneği önerilir?",
          "en": "Which setup option is recommended for a beginner who wants to start learning SQL as fast as possible?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Önce MySQL Community Server kurmak",
              "en": "Installing MySQL Community Server first"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Kurulum gerektirmeyen bir çevrimiçi editörle başlamak",
              "en": "Starting with an install-free online editor"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Önce bir DBeaver lisansı satın almak",
              "en": "Buying a DBeaver license first"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Önce bir cloud sunucusu kiralamak",
              "en": "Renting a cloud server first"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Kurulum gerektirmeyen çevrimiçi bir editör (örn. tarayıcı tabanlı SQLite/PostgreSQL sandbox), sıfır kurulum süresiyle SQL syntax'ını anında denemeyi sağlar. Yerel bir veritabanı sunucusu kurmak (MySQL Community Server gibi) gerçek bir projeye geçince gerekli olur ama temel SELECT/JOIN/GROUP BY öğrenirken gereksiz bir engeldir.",
          "en": "An install-free online editor (e.g. a browser-based SQLite/PostgreSQL sandbox) lets you try SQL syntax instantly with zero setup time. Installing a local database server (like MySQL Community Server) becomes necessary once you move to a real project, but it is an unnecessary barrier while learning basic SELECT/JOIN/GROUP BY."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir QA mühendisi gerçek bir projede CI pipeline'ında otomatik SQL testleri çalıştırmaya başlıyor. Bu noktada artık neden yerel bir veritabanı sunucusuna (veya en azından bir Docker container'ına) ihtiyaç duyar?",
            "en": "A QA engineer is now running automated SQL tests in a CI pipeline for a real project. Why do they now need a local database server (or at least a Docker container) instead of just a browser sandbox?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Tarayıcı sandbox'ları CI ortamlarında hiç çalışmaz ve gerçekçi bir bağlantı dizesi/test verisi/şema yönetimi gerektirir",
                "en": "Browser sandboxes don't run in CI environments at all, and a real pipeline needs a real connection string/test data/schema management"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Çevrimiçi editörler artık SQL syntax'ını desteklemiyor",
                "en": "Online editors no longer support SQL syntax"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Tarayıcı sandbox'ları sadece 10 satırdan fazla veri tutamaz",
                "en": "Browser sandboxes can only hold more than 10 rows of data"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "CI pipeline'ları SELECT sorgularını desteklemez",
                "en": "CI pipelines do not support SELECT queries"
              }
            }
          ],
          "correct": "a",
          "explanation": {
            "tr": "Tarayıcı tabanlı bir sandbox, izole, geçici, tek kullanıcılı bir oyun alanıdır — gerçek bir CI pipeline'ı ise tekrarlanabilir bir bağlantı dizesi, gerçekçi şema/migration yönetimi ve genelde bir Docker container'ında veya yönetilen bir test veritabanı instance'ında çalışan otomatik testler gerektirir. Öğrenme aşamasında sandbox yeterliyken, gerçek bir projeye geçişte bu altyapı kaçınılmaz hale gelir.",
            "en": "A browser-based sandbox is an isolated, ephemeral, single-user playground — a real CI pipeline needs a reproducible connection string, realistic schema/migration management, and automated tests that typically run against a Docker container or a managed test database instance. The sandbox is enough while learning, but this infrastructure becomes unavoidable once you move to a real project."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQLite gibi sunucusuz (serverless) bir veritabanı ile MySQL/PostgreSQL gibi istemci-sunucu veritabanları arasındaki farkı ve QA testlerinde sıfır kurulumlu araçların avantajlarını açıklayın.",
        "promptEn": "Explain the difference between a serverless database like SQLite and client-server databases like MySQL/PostgreSQL, and the advantages of zero-install tools in QA testing.",
        "keywords": [
          [
            "sqlite",
            "serverless",
            "sunucusuz"
          ],
          [
            "client-server",
            "istemci-sunucu"
          ],
          [
            "install",
            "kurulum",
            "zero-install"
          ],
          [
            "file",
            "dosya"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SQLite, tüm verileri tek bir yerel dosyada saklayan ve sunucu kurulumu gerektirmeyen (serverless) hafif bir veritabanıdır. MySQL ve PostgreSQL ise istemci-sunucu mimarisindedir. Sıfır kurulumlu araçlar, testlerin lokalde veya CI ortamında hızlıca koşturulması için büyük kolaylık sağlar.",
        "modelAnswerEn": "SQLite is a serverless database that stores data in a single local file, requiring no server installation. MySQL and PostgreSQL use a client-server architecture. Zero-install tools make local and CI test execution fast and configuration-free."
      }
    ]
  },
  {
    "title": "🟢 CREATE TABLE",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📖",
        "content": {
          "tr": "SQL komutları İngilizce cümle gibi okunur: SELECT = 'getir', FROM = 'nereden', WHERE = 'koşulsa'. Java'da bir listeyi for döngüsüyle taradın. SQL'de sadece ne istediğini tarif edersin — veritabanı nasıl bulacağını kendi bilir.",
          "en": "SQL reads like plain English: SELECT = 'give me', FROM = 'from this table', WHERE = 'only if'. In Java you'd loop through a list manually. In SQL you describe what you want and the database figures out how to find it."
        }
      },
      {
        "type": "heading",
        "text": "CREATE TABLE — Yapıyı Tanımlama",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "code",
        "code": "-- Create a test_results table to store automation run data:\nCREATE TABLE test_results (\n    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique ID, auto-increments\n    test_name   VARCHAR(100)  NOT NULL,                    -- text up to 100 chars, required\n    status      VARCHAR(10)   NOT NULL,                    -- 'PASS', 'FAIL', 'SKIP'\n    duration_ms INT           DEFAULT 0,                   -- test duration in milliseconds\n    run_date    DATETIME      DEFAULT CURRENT_TIMESTAMP,   -- auto-set to now\n    environment VARCHAR(20)   DEFAULT 'staging',           -- which env was tested\n    is_flaky    BOOLEAN       DEFAULT FALSE                 -- marks known flaky tests\n);\n\n-- Common SQL data types:\n-- INT / BIGINT        → whole numbers (28, 1000000)\n-- DECIMAL(10,2)       → precise decimals, e.g. prices (99.99)\n-- VARCHAR(n)          → variable text up to n characters\n-- TEXT                → unlimited text (descriptions, logs)\n-- BOOLEAN / TINYINT   → true/false\n-- DATE                → 2024-01-15\n-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "⚠️",
        "title": {
          "tr": "Temel SQL Kısıtlamaları (Constraints)",
          "en": "Key SQL Constraints"
        },
        "content": {
          "tr": "Veritabanında tabloları tanımlarken sütunlara kurallar (kısıtlamalar) ekleriz:\n\n1. **PRIMARY KEY (Birincil Anahtar)**: Her satırı **benzersiz** şekilde tanımlayan kimlik sütunudur. Aynı değerden iki tane olamaz ve asla boş (`NULL`) bırakılamaz.\n2. **AUTO_INCREMENT**: Yeni bir satır eklendiğinde bu sütunun (genellikle `id`) değerini otomatik olarak 1, 2, 3... şeklinde artırır.\n3. **NOT NULL**: Bu sütunun boş bırakılmasını yasaklar, mutlaka bir değer girilmelidir.\n4. **VARCHAR(n)**: Değişken uzunluklu metin saklar. `n` maksimum karakter sayısıdır (örn: `VARCHAR(100)` en fazla 100 karakter alabilir).\n5. **DEFAULT**: Eğer satır eklenirken o sütuna bir değer verilmezse, otomatik atanacak varsayılan değeri belirler (örn: `DEFAULT 0` veya `DEFAULT FALSE`).",
          "en": "When defining tables, we add rules (constraints) to columns to ensure data integrity:\n\n1. **PRIMARY KEY**: A column that **uniquely** identifies each row. No two rows can have the same primary key, and it can never be empty (`NULL`).\n2. **AUTO_INCREMENT**: Automatically generates a sequential number (1, 2, 3...) when a new row is inserted.\n3. **NOT NULL**: Ensures that a column cannot have a `NULL` (empty) value.\n4. **VARCHAR(n)**: Variable-length text, where `n` is the maximum character limit (e.g., `VARCHAR(100)`).\n5. **DEFAULT**: Specifies a fallback value if no value is provided during insertion (e.g., `DEFAULT 0` or `DEFAULT FALSE`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "CREATE TABLE sorgusunda PRIMARY KEY kısıtlamasının (constraint) temel amacı nedir?",
          "en": "What is the primary purpose of the PRIMARY KEY constraint in a CREATE TABLE statement?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tablonun boyutunu sınırlamak",
              "en": "To limit the table size"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Her satırı benzersiz şekilde tanımlamak ve NULL olmasını engellemek",
              "en": "To uniquely identify each row and prevent it from being NULL"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablolar arasında ilişki kurmak",
              "en": "To establish relationships between tables"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguların daha hızlı sıralanmasını sağlamak",
              "en": "To ensure queries sort faster"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "PRIMARY KEY (Birincil Anahtar), tablodaki her satırı benzersiz olarak tanımlayan kısıtlamadır. Otomatik olarak NOT NULL ve UNIQUE özelliklerine sahiptir. Tablo başına sadece bir tane tanımlanabilir.",
          "en": "A PRIMARY KEY constraint uniquely identifies each record in a database table. Primary keys must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sütun kısıtlamalarından hangisi otomatik olarak PRIMARY KEY kısıtlamasının bir parçasını oluşturur?",
            "en": "Which of the following column constraints is automatically part of a PRIMARY KEY constraint?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "DEFAULT",
                "en": "DEFAULT"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "NOT NULL ve UNIQUE",
                "en": "NOT NULL and UNIQUE"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "FOREIGN KEY",
                "en": "FOREIGN KEY"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "CHECK",
                "en": "CHECK"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Birincil Anahtar (PRIMARY KEY) olan bir sütun, aynı değerleri içeremez (UNIQUE) ve boş bırakılamaz (NOT NULL). Bu iki özellik PRIMARY KEY ile otomatik gelir.",
            "en": "A primary key column must be both unique (no duplicate values) and not null (cannot be empty). These constraints are automatically applied."
          }
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Tablodaki her satiri benzersiz tanimlayan kisitlama hangisidir?",
          "en": "Which constraint uniquely identifies every row in a table?"
        },
        "options": [
          {
            "id": "a",
            "text": "FOREIGN KEY"
          },
          {
            "id": "b",
            "text": "UNIQUE"
          },
          {
            "id": "c",
            "text": "PRIMARY KEY"
          },
          {
            "id": "d",
            "text": "NOT NULL"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "PRIMARY KEY, her satiri benzersiz tanimlar, NULL olamaz ve tekrar edemez. Her tabloda yalnizca bir tane olabilir.",
          "en": "PRIMARY KEY uniquely identifies each row, cannot be NULL, and must be unique. Only one per table is allowed."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "CREATE TABLE ifadesini ve PRIMARY KEY, FOREIGN KEY, NOT NULL gibi kısıtlamaların (constraints) tablonun güvenliği ve yapısı açısından önemini açıklayın.",
        "promptEn": "Explain the CREATE TABLE statement and the importance of constraints like PRIMARY KEY, FOREIGN KEY, and NOT NULL for database safety and structure.",
        "keywords": [
          [
            "table",
            "tablo"
          ],
          [
            "primary",
            "birincil"
          ],
          [
            "foreign",
            "yabancı"
          ],
          [
            "constraint",
            "kısıt"
          ],
          [
            "null"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "CREATE TABLE, veritabanında yeni bir tablo ve sütun yapısı kurar. Kısıtlamalar veri bütünlüğünü korur: PRIMARY KEY satırı benzersiz yapar, FOREIGN KEY tabloları ilişkilendirir, NOT NULL ise boş değer eklenmesini önler.",
        "modelAnswerEn": "CREATE TABLE defines a new table and columns. Constraints enforce data integrity: PRIMARY KEY ensures row uniqueness, FOREIGN KEY establishes relationships, and NOT NULL prevents empty fields."
      }
    ]
  },
  {
    "title": "🟢 INSERT INTO",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📝",
        "content": {
          "tr": "INSERT INTO, bir forma veri doldurmak gibi. Sütunlar var, değleri verirsin, veritabanı kaydeder. Java ArrayList.add() gibi ama kalıcı ve milyonlarca satırla çalışır.",
          "en": "INSERT INTO is like filling out a form. Provide values for the columns, database stores them permanently. Like Java ArrayList.add() — except persistent and scales to millions of rows."
        }
      },
      {
        "type": "heading",
        "text": "INSERT INTO — Veri Ekleme",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "code",
        "code": "-- Single row insert:\nINSERT INTO test_results (test_name, status, duration_ms, environment)\nVALUES ('Login Test', 'PASS', 1234, 'staging');\n\n-- Multiple rows at once (much faster than one at a time!):\nINSERT INTO test_results (test_name, status, duration_ms) VALUES\n    ('Signup Test',    'PASS', 890),\n    ('Checkout Flow',  'FAIL', 5400),\n    ('Profile Update', 'SKIP', 0),\n    ('Password Reset', 'PASS', 1100),\n    ('Search Feature', 'FAIL', 8200);\n\n-- Copy rows from one table to another:\nINSERT INTO test_archive\nSELECT * FROM test_results WHERE run_date < '2023-01-01';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "💡",
        "title": {
          "tr": "Veri Ekleme Kuralları ve Performans",
          "en": "Data Insertion Rules and Performance"
        },
        "content": {
          "tr": "Veritabanına yeni satırlar eklerken (INSERT INTO) iki kritik noktaya dikkat etmeliyiz:\n\n1. **Sütun Belirtme Zorunluluğu (En İyi Pratik)**: `INSERT INTO users (id, name)...` şeklinde sütun isimlerini açıkça belirtmek en güvenli yoldur. Eğer belirtmezsek (`INSERT INTO users VALUES...`), ileride tabloya yeni bir sütun eklendiğinde veya sütunların sırası değiştiğinde sorgumuz hata verir.\n2. **Toplu Ekleme (Bulk Insert) Performansı**: Tek tek 1000 adet `INSERT` sorgusu çalıştırmak yerine, tek bir `INSERT INTO ... VALUES (1, \"A\"), (2, \"B\")...` sorgusuyla verileri toplu göndermek; ağ trafiğini ve transaction kilitlenme sürelerini azaltarak performansı kat kat artırır.",
          "en": "When inserting new rows (INSERT INTO), keep these two critical rules in mind:\n\n1. **Specifying Columns (Best Practice)**: Explicitly declaring column names like `INSERT INTO users (id, name)...` is the safest way. Omitting them (`INSERT INTO users VALUES...`) makes the query fragile, as it will break if a column is added or rearranged in the future.\n2. **Bulk Insert Performance**: Instead of running 1,000 individual `INSERT` statements, sending all values in a single bulk `INSERT INTO ... VALUES (1, \"A\"), (2, \"B\")...` reduces network roundtrips and transaction overhead, multiplying write speed."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Çoklu kayıt eklerken tek bir INSERT ifadesiyle birden fazla VALUES seti göndermek (bulk insert) neden tek tek eklemekten daha avantajlıdır?",
          "en": "Why is it more advantageous to send multiple VALUES sets in a single INSERT statement (bulk insert) rather than inserting them one by one?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Veritabanı şemasını otomatik güncellediği için",
              "en": "Because it automatically updates the database schema"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Ağ trafiğini ve veritabanı kilitlenme süresini azaltarak performansı kat kat artırdığı için",
              "en": "Because it multiplies performance by reducing network roundtrips and database locking overhead"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sadece 10 satırdan az verilerde çalıştığı için",
              "en": "Because it only works for data under 10 rows"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Hatalı verileri otomatik sildiği için",
              "en": "Because it automatically deletes invalid data"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Tek bir INSERT ile çoklu satır eklemek (bulk insert), veritabanına gidiş-dönüş sayısını (network roundtrip) azaltır ve transaction yönetimini hızlandırır, böylece performansı büyük ölçüde artırır.",
          "en": "Bulk inserting reduces the number of database connection roundtrips and optimizes index/transaction commits, significantly boosting write performance compared to row-by-row queries."
        },
        "retryQuestion": {
          "question": {
            "tr": "INSERT INTO users VALUES (1, \"Alice\"); sorgusu için hangi durum bir risk oluşturur?",
            "en": "What risk is associated with the query: INSERT INTO users VALUES (1, \"Alice\");?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Sorgunun yavaş çalışması",
                "en": "The query running slowly"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Sütun isimleri belirtilmediği için ileride tabloya yeni sütun eklenirse sorgunun hata vermesi",
                "en": "Since column names are omitted, the query will break if new columns are added to the table in the future"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgunun otomatik rollback yapması",
                "en": "The query automatically rolling back"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "İsimlerin tırnak içinde olması",
                "en": "Names being enclosed in quotes"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "INSERT sorgularında sütun adlarını belirtmek (örn: INSERT INTO users (id, name)...) en iyi pratiktir. Sütun adları atlandığında, şemaya sonradan eklenen her sütun bu sorgunun kırılmasına yol açar.",
            "en": "Omitting column names makes the query sensitive to schema changes. If a column is added or rearranged in the table, the query will fail with a column count mismatch."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "INSERT INTO komutunun yapısını ve otomasyon testlerimize toplu veri yüklerken (bulk insert) tek bir INSERT içinde çoklu VALUES kullanmanın performans avantajlarını açıklayın.",
        "promptEn": "Explain the structure of the INSERT INTO command and the performance benefits of using multiple VALUES sets in a single INSERT (bulk insert) when seeding test data.",
        "keywords": [
          [
            "insert",
            "values"
          ],
          [
            "bulk",
            "toplu"
          ],
          [
            "performance",
            "hız",
            "verim"
          ],
          [
            "roundtrip",
            "ağ",
            "bağlantı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INSERT INTO tabloya yeni veriler ekler. Tek tek sorgu atmak yerine tek bir INSERT altında birden fazla VALUES seti eklemek (bulk insert), veritabanı bağlantı gidiş-dönüş sayısını azaltır ve performansı büyük ölçüde artırır.",
        "modelAnswerEn": "INSERT INTO inserts new records. Instead of executing multiple individual inserts, combining them in a single query with multiple VALUES sets (bulk insert) reduces database connection overhead and network roundtrips."
      }
    ]
  },
  {
    "title": "🟢 SELECT & Sıralama",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔍",
        "content": {
          "tr": "SELECT, kütüphaneciye kitap sormak gibi: hangi kitapları, hangi koşulla, hangi sırayla istediğini tarif edersin. Java döngüsü yerine sadece istediğini anlatırsın — veritabanı nasıl bulacağını bilir.",
          "en": "SELECT is like asking a librarian: describe which books you want, with what conditions, in which order. Instead of writing a Java loop, you just describe what you want — the database figures out how."
        }
      },
      {
        "type": "heading",
        "text": "SELECT — Veri Okuma",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "code",
        "code": "-- Select all columns and all rows:\nSELECT * FROM test_results;\n\n-- Select specific columns only:\nSELECT test_name, status, duration_ms FROM test_results;\n\n-- WHERE — filter rows:\nSELECT * FROM test_results WHERE status = 'FAIL';\nSELECT * FROM test_results WHERE duration_ms > 3000;        -- slow tests\nSELECT * FROM test_results WHERE status = 'FAIL' AND duration_ms > 5000;\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- LIKE — pattern matching:\nSELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains \"Login\"\nSELECT * FROM test_results WHERE test_name LIKE 'Sign%';    -- starts with \"Sign\"\n\n-- ORDER BY — sort results:\nSELECT * FROM test_results ORDER BY duration_ms DESC;       -- slowest first\nSELECT * FROM test_results ORDER BY run_date DESC LIMIT 10; -- last 10 runs\n\n-- LIMIT + OFFSET — pagination:\nSELECT * FROM test_results LIMIT 10;            -- first 10 rows\nSELECT * FROM test_results LIMIT 10 OFFSET 20;  -- rows 21-30 (page 3)\n\n-- DISTINCT — unique values only:\nSELECT DISTINCT environment FROM test_results;",
        "expected": "+----+----------------+--------+-------------+\n| id | test_name      | status | duration_ms |\n+----+----------------+--------+-------------+\n|  3 | Checkout Flow  | FAIL   |        5400 |\n|  5 | Search Feature | FAIL   |        8200 |\n+----+----------------+--------+-------------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT, run_date TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging','2024-01-10');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging','2024-01-10');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod','2024-01-11');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod','2024-01-11');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging','2024-01-12');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging','2024-01-12');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod','2024-01-13');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging','2024-01-13');",
        "defaultCode": "-- ▶ Çalıştır ve değiştir!\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Diğerlerini dene:\n-- SELECT test_name, duration_ms FROM test_results ORDER BY duration_ms DESC;\n-- SELECT DISTINCT environment FROM test_results;\n-- SELECT * FROM test_results WHERE duration_ms > 2000 AND status = 'PASS';\n-- SELECT COUNT(*) AS total FROM test_results;"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🟢",
        "title": {
          "tr": "Veri Seçme, Sıralama ve Sınırlandırma",
          "en": "Selecting, Sorting, and Limiting Data"
        },
        "content": {
          "tr": "Veritabanından veri okurken SELECT komutunu kullanırız:\n\n- **Sütun Seçimi**: `SELECT *` tüm sütunları getirirken, performansı artırmak için sadece ihtiyacımız olan sütunları (`SELECT name, status`) seçmek en iyi pratiktir.\n- **Sıralama (ORDER BY)**: Verileri belirli bir sütuna göre artan (`ASC`, varsayılan) veya azalan (`DESC`) sırada sıralamamızı sağlar.\n- **Sınırlandırma ve Sayfalama (LIMIT & OFFSET)**: `LIMIT 10` sorgunun en fazla 10 satır döndürmesini sağlar. `OFFSET 20` ise ilk 20 satırı atlayıp sonrasını getirmek için kullanılır (örneğin sayfalama yaparken).\n- **Tekrarları Önleme (DISTINCT)**: Sütundaki tekrarlanan değerleri eleyerek sadece benzersiz değerleri listeler (örn: `SELECT DISTINCT status`).",
          "en": "We read data from the database using the SELECT statement:\n\n- **Column Selection**: While `SELECT *` retrieves all columns, it is best practice to select only the necessary columns (`SELECT name, status`) to save memory and network bandwidth.\n- **Sorting (ORDER BY)**: Sorts output rows by a column in ascending (`ASC`, default) or descending (`DESC`) order.\n- **Limiting and Paging (LIMIT & OFFSET)**: `LIMIT 10` restricts results to a maximum of 10 rows. `OFFSET 20` skips the first 20 rows before starting to return values (ideal for pagination).\n- **Uniqueness (DISTINCT)**: Filters out duplicate values from your results, returning only unique entries (e.g. `SELECT DISTINCT status`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "SELECT sorgusu sonuçlarini siralamak icin hangi clause kullanilir?",
          "en": "Which clause is used to sort SELECT query results?"
        },
        "options": [
          {
            "id": "a",
            "text": "GROUP BY"
          },
          {
            "id": "b",
            "text": "ORDER BY"
          },
          {
            "id": "c",
            "text": "SORT BY"
          },
          {
            "id": "d",
            "text": "HAVING"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "ORDER BY, sutun adi ve istege bagli ASC (artan) ya da DESC (azalan) yonuyle sonuclari siralar.",
          "en": "ORDER BY sorts results by a column name with optional ASC (ascending) or DESC (descending) direction."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "SELECT ifadesini, sütun seçimi mantığını ve ORDER BY ile sonuçların nasıl artan (ASC) veya azalan (DESC) olarak sıralanacağını açıklayın.",
        "promptEn": "Explain the SELECT statement, column projection logic, and how to sort results using ORDER BY with ASC or DESC.",
        "keywords": [
          [
            "select"
          ],
          [
            "from"
          ],
          [
            "order",
            "sıra"
          ],
          [
            "asc",
            "desc",
            "artan",
            "azalan"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SELECT sorgusu, veritabanından veri okumak için kullanılır. FROM ile hedef tablo belirtilir. ORDER BY ise belirtilen sütuna göre sonuçları varsayılan olarak artan (ASC) veya azalan (DESC) şekilde hizalar.",
        "modelAnswerEn": "The SELECT statement retrieves data from a database. FROM specifies the source table. ORDER BY sorts the output rows based on a column in either ascending (ASC) or descending (DESC) order."
      }
    ]
  },
  {
    "title": "🟢 UPDATE & DELETE",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "✏️",
        "content": {
          "tr": "UPDATE ve DELETE adres defterindeki kaydı düzeltmek ve silmek gibi. KRİTİK: WHERE koşulu olmadan UPDATE tüm satırları değiştirir, DELETE tüm kayıtları siler. Java Map.put() / Map.remove() analogu.",
          "en": "UPDATE and DELETE are like editing an address book. CRITICAL: without WHERE, UPDATE changes ALL rows, DELETE removes EVERY record. Think Java Map.put() / Map.remove() — applied to every matching row."
        }
      },
      {
        "type": "heading",
        "text": "UPDATE ve DELETE",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "code",
        "code": "-- UPDATE — modify existing rows:\nUPDATE test_results SET status = 'PASS' WHERE id = 3;\nUPDATE test_results SET is_flaky = TRUE WHERE test_name = 'Search Feature';\n\n-- DELETE — remove rows:\nDELETE FROM test_results WHERE status = 'SKIP';\nDELETE FROM test_results WHERE run_date < NOW() - INTERVAL 30 DAY;\n\n-- SAFE PATTERN: always SELECT first to verify, THEN DELETE:\nSELECT * FROM test_results WHERE environment = 'test-cleanup';  -- verify\nDELETE FROM test_results WHERE environment = 'test-cleanup';    -- then delete"
      },
      {
        "type": "warning",
        "content": "UPDATE ve DELETE komutlarında MUTLAKA WHERE kullanın! WHERE olmadan tablodaki tüm satırlar etkilenir. Değiştirilecek satırları önce SELECT ile doğrulayın, ardından güncelleme veya silme işlemini yapın."
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "⚠️",
        "title": {
          "tr": "Güvenli UPDATE ve DELETE Pratikleri",
          "en": "Safe UPDATE and DELETE Practices"
        },
        "content": {
          "tr": "Veri güncelleme (UPDATE) ve silme (DELETE) işlemleri geri alınması zor hatalara yol açabilir. Bu yüzden şu kuralları uygulamalısınız:\n\n1. **WHERE Koşulunun Önemi**: `WHERE` filtresi belirtilmeyen bir `UPDATE` veya `DELETE` sorgusu, tablodaki **tüm satırları** günceller veya siler! (örn: `DELETE FROM logs;` tablonun yapısını bozmaz ama içindeki tüm verileri temizler).\n2. **Önce SELECT ile Test Edin**: Bir veriyi silmeden veya güncellemeden önce, kullanacağınız `WHERE` koşulunu birebir bir `SELECT` sorgusunda çalıştırarak sadece silmek istediğiniz satırların geldiğini doğrulamak en güvenli QA/operasyon pratiğidir.",
          "en": "Updating (UPDATE) and deleting (DELETE) data can cause irreversible damage. Follow these safety rules:\n\n1. **The Critical WHERE Clause**: Running `UPDATE` or `DELETE` without a `WHERE` filter modifies or deletes **every single row** in the table! (e.g., `DELETE FROM logs;` empties the table completely but keeps its schema/structure).\n2. **Verify with SELECT First**: Before running an update or delete, run the exact same `WHERE` condition in a `SELECT` query first. This confirms you are targeting only the intended rows."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanında UPDATE veya DELETE işlemlerinden önce hangi adımı izlemek en güvenli test ve operasyon pratiğidir?",
          "en": "What is the safest test and operations practice before executing an UPDATE or DELETE query?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Önce her zaman bir DROP TABLE sorgusu çalıştırmak",
              "en": "Running a DROP TABLE query first"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Sorguda kullanacağınız WHERE koşulunu önce bir SELECT sorgusuyla çalıştırıp hangi satırların etkileneceğini doğrulamak",
              "en": "Running the exact WHERE clause in a SELECT query first to verify which rows will be affected"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sorguyu bir döngü (loop) içinde 10 kez çalıştırmak",
              "en": "Running the query 10 times in a loop"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Commit yapmadan önce bağlantıyı kesmek",
              "en": "Disconnecting the session before committing"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "UPDATE ve DELETE sorgularında WHERE koşulu hayati önem taşır. Yanlış bir WHERE (veya WHERE unutup çalıştırmak) tüm tablo verilerini bozabilir/silebilir. Bu yüzden önce SELECT ile koşulu doğrulamak güvenli limandır.",
          "en": "Always run a SELECT query using the same WHERE clause first. This ensures you confirm exactly which records will be modified or deleted, avoiding accidental full-table wipes."
        },
        "retryQuestion": {
          "question": {
            "tr": "`DELETE FROM logs;` sorgusu çalıştırıldığında ne olur?",
            "en": "What happens when `DELETE FROM logs;` is executed?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "logs tablosu veritabanından tamamen silinir (tablo yok olur)",
                "en": "The logs table is dropped from the database entirely"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu olmadığı için logs tablosundaki TÜM satırlar silinir, ancak tablo yapısı kalır",
                "en": "Since there is no WHERE clause, ALL rows inside logs are deleted, but the table structure remains"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgu syntax hatası verir",
                "en": "The query throws a syntax error"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sadece en son eklenen satır silinir",
                "en": "Only the last inserted row is deleted"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "WHERE koşulu içermeyen bir DELETE sorgusu tablodaki tüm verileri temizler. Tablo yapısı, sütunları ve indexleri korunur. Tabloyu tamamen yok etmek için DROP TABLE kullanılmalıdır.",
            "en": "A DELETE statement without a WHERE clause removes all rows from the table. The table schema itself remains intact. To delete the table structure as well, use DROP TABLE."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "UPDATE ve DELETE işlemlerinde WHERE koşulu kullanılmadığında ne olacağını ve bu tehlikeyi önlemek için test aşamasında hangi adımları izlediğinizi açıklayın.",
        "promptEn": "Explain what happens when a WHERE clause is omitted in UPDATE and DELETE statements, and the steps you take during testing to avoid this risk.",
        "keywords": [
          [
            "update",
            "delete",
            "güncelle",
            "sil"
          ],
          [
            "where",
            "koşul"
          ],
          [
            "select",
            "seç"
          ],
          [
            "verify",
            "doğrula"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "WHERE koşulu unutulduğunda UPDATE veya DELETE komutları tablodaki TÜM satırları günceller veya siler. Güvenli operasyon için, bu işlemleri çalıştırmadan önce aynı WHERE koşulunu SELECT sorgusuyla çalıştırıp etkilenen satırları doğrulamalıyız.",
        "modelAnswerEn": "Without a WHERE clause, UPDATE and DELETE modify or remove every row in a table. To prevent this, always test the exact WHERE clause in a SELECT query first to confirm which records will be affected."
      }
    ]
  },
  {
    "title": "🟢 NULL Değerler",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "❓",
        "content": {
          "tr": "NULL, formda boş bırakılan alan gibi — bilinmiyor veya girilmedi anlamında. 0 veya boş string değil! Java null referans gibi. SQL farkı: NULL == NULL YANLIŞTIR, IS NULL kullanmalısın.",
          "en": "NULL is like a blank field on a form — unknown or not entered. NOT zero or empty string! Like Java null. SQL difference: NULL == NULL is FALSE — you must use IS NULL."
        }
      },
      {
        "type": "heading",
        "text": "NULL Değerleri",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "code",
        "code": "-- NULL means \"no value / unknown\" — NOT the same as 0 or empty string!\n-- You CANNOT use = to check for NULL — it always returns false:\n\nSELECT * FROM test_results WHERE error_msg IS NULL;      -- correct\nSELECT * FROM test_results WHERE error_msg IS NOT NULL;  -- has an error\n-- SELECT * WHERE error_msg = NULL;   WRONG — always returns 0 rows!\n\n-- COALESCE: return first non-NULL value:\nSELECT test_name,\n       COALESCE(error_msg, 'No error') AS error_display\nFROM test_results;\n\n-- NULLIF: return NULL if two values are equal (avoid division by zero!):\nSELECT test_name, NULLIF(duration_ms, 0) AS duration\nFROM test_results;"
      },
      {
        "type": "heading",
        "text": "İnteraktif Örnek: test_results Tablosu",
        "difficulty": "🟢 Başlangıç"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');",
        "defaultCode": "-- Tablo hazır! Sorguları dene:\nSELECT * FROM test_results ORDER BY duration_ms DESC;\n\n-- Diğerlerini dene:\n-- SELECT * FROM test_results WHERE status = 'FAIL';\n-- SELECT COUNT(*) AS total, status FROM test_results GROUP BY status ORDER BY total DESC;\n-- SELECT test_name, duration_ms FROM test_results WHERE duration_ms > 1000;"
      },
      {
        "type": "heading",
        "text": "NULL — En Yaygın SQL Hatası"
      },
      {
        "type": "text",
        "content": "NULL, 'değer yok / bilinmiyor' anlamına gelir — sıfır değil, boş string değil. NULL ile yapılan her karşılaştırma NULL döndürür (true veya false değil). Bu durum her SQL yeni başlayanının tökezlediği noktadır."
      },
      {
        "type": "comparison",
        "left": {
          "label": "❌ Yanlış — = NULL hiçbir zaman çalışmaz",
          "code": "SELECT * FROM users WHERE email = NULL;\n-- Her zaman 0 satır döndürür!\n-- NULL değerler var olsa bile.\n-- Neden? NULL = NULL → NULL (true değil)",
          "note": "NULL kontrolü için = veya != kullanmayın"
        },
        "right": {
          "label": "✅ Doğru — IS NULL / IS NOT NULL",
          "code": "SELECT * FROM users WHERE email IS NULL;\nSELECT * FROM users WHERE email IS NOT NULL;\n-- COALESCE: NULL'ı varsayılanla değiştir:\nSELECT name, COALESCE(email, 'eposta yok') FROM users;",
          "note": "IS NULL ve IS NOT NULL her zaman doğru çalışır"
        }
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🟢",
        "title": {
          "tr": "NULL Değerler ve İşleme Fonksiyonları",
          "en": "NULL Values and Fallback Functions"
        },
        "content": {
          "tr": "NULL, veritabanında \"veri yok\" veya \"bilinmiyor\" anlamına gelir. Sıfır (0) veya boş string ('') ile aynı şey değildir:\n\n- **Eşleşme Sorguları**: NULL değerler `=` veya `!=` ile sorgulanamaz (örn: `status = NULL` sıfır satır döndürür). Bunun yerine `IS NULL` veya `IS NOT NULL` ifadeleri kullanılmalıdır.\n- **COALESCE(sütun, varsayılan)**: Sütundaki değer NULL ise, onun yerine geçecek varsayılan bir değer tanımlamamızı sağlar (örn: `COALESCE(environment, \"local\")`).\n- **NULLIF(değer1, değer2)**: İki değer birbirine eşitse `NULL` döndürür. En yaygın kullanım amacı sıfıra bölme (division by zero) hatalarını engellemektir (örn: `NULLIF(total_runs, 0)`).",
          "en": "NULL represents missing or unknown data in a database. It is not equivalent to zero (0) or an empty string (''):\n\n- **Matching Queries**: You cannot test for NULL using regular equality operators like `=` or `!=` (e.g., `status = NULL` will fail). You must use `IS NULL` or `IS NOT NULL`.\n- **COALESCE(column, fallback)**: Returns the first non-NULL value in its arguments. Useful for providing fallback defaults (e.g., `COALESCE(environment, \"local\")`).\n- **NULLIF(val1, val2)**: Returns `NULL` if the two arguments are equal. Frequently used to prevent crash-inducing division-by-zero errors (e.g. `NULLIF(total_runs, 0)`)."
        }
      },
      {
        "type": "quiz",
        "question": "WHERE discount = NULL filtresi uyguladığında sorgu 0 satır döndürüyor. Neden?",
        "options": [
          "Tabloda NULL indirim yok",
          "= ile NULL karşılaştırması her zaman NULL (TRUE değil) döndürür, hiçbir satır eşleşmez",
          "Tırnak gerekiyor: WHERE discount = \"NULL\"",
          "NULL otomatik olarak 0'a dönüştürülür"
        ],
        "correct": 1,
        "explanation": "= veya != ile yapılan NULL karşılaştırmaları FALSE gibi davranır. Bunun yerine IS NULL veya IS NOT NULL kullanın. Bu, en yaygın SQL hatalarından biridir.",
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL'de NULL değerinin ne anlama geldiğini, normal veri tiplerinden farkını ve neden = NULL yerine IS NULL kullanmamız gerektiğini açıklayın.",
        "promptEn": "Explain what NULL represents in SQL, its difference from regular values, and why you must use IS NULL instead of = NULL.",
        "keywords": [
          [
            "null",
            "boş"
          ],
          [
            "is null"
          ],
          [
            "is not null"
          ],
          [
            "comparison",
            "karşılaştırma",
            "eşittir"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "NULL, veri tabanında \"değer olmaması\" veya \"bilinmeyen\" anlamına gelir. NULL bir değer olmadığından = veya != gibi karşılaştırma operatörleriyle sınanamaz. NULL denetimi için IS NULL veya IS NOT NULL kullanılmalıdır.",
        "modelAnswerEn": "NULL represents a missing or unknown value. Since NULL is not a concrete value, standard comparison operators like = or != evaluate to UNKNOWN. To check for NULL, you must use IS NULL or IS NOT NULL."
      }
    ]
  },
  {
    "title": "🟢 SQL Sorgu Sırası",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📋",
        "content": {
          "tr": "Yazdığın sıra ile çalıştığı sıra farklıdır. Yemek tarifi gibi: önce malzeme topla (FROM), ele (WHERE), grupla (GROUP BY), grupları filtrele (HAVING), son adımda seç (SELECT). Bu yüzden SELECT alias’ını WHERE’de kullanamazsın.",
          "en": "Write order differs from execution order. Like a recipe: gather ingredients (FROM), filter (WHERE), group (GROUP BY), filter groups (HAVING), finally select (SELECT). That's why a SELECT alias can't be used in WHERE."
        }
      },
      {
        "type": "heading",
        "text": "SQL Yürütme Sırası — Çoğu Yeni Başlayanın Kaçırdığı Sır"
      },
      {
        "type": "text",
        "content": "SQL, normal kod gibi yukarıdan aşağıya çalışmaz. Belirli bir dahili sıra izler. Bu yüzden WHERE içinde SELECT takma adları kullanamaz ve aggregate fonksiyonlar HAVING'e gider, WHERE'e değil."
      },
      {
        "type": "visual",
        "variant": "flow",
        "title": "SQL Cümle Değerlendirme Sırası (Adım Adım)",
        "note": "SELECT'i en üste yazarsın ama neredeyse en son çalışır. Bu yüzden SELECT'te tanımlanan takma adlar WHERE'de kullanılamaz!",
        "steps": [
          {
            "num": "1",
            "label": "FROM",
            "desc": "Tabloları yükle"
          },
          {
            "num": "2",
            "label": "JOIN",
            "desc": "Birleştir"
          },
          {
            "num": "3",
            "label": "WHERE",
            "desc": "Satırları filtrele",
            "highlight": true
          },
          {
            "num": "4",
            "label": "GROUP BY",
            "desc": "Grupla"
          },
          {
            "num": "5",
            "label": "HAVING",
            "desc": "Grupları filtrele",
            "highlight": true
          },
          {
            "num": "6",
            "label": "SELECT",
            "desc": "Sütunları seç"
          },
          {
            "num": "7",
            "label": "ORDER BY",
            "desc": "Sırala"
          },
          {
            "num": "8",
            "label": "LIMIT",
            "desc": "Dilimleme"
          }
        ]
      },
      {
        "type": "simulation",
        "scenario": "sql-select-flow",
        "icon": "🗄️",
        "title": {
          "tr": "SQL Sorgu Yürütme Akışı (Mantıksal Sıra)",
          "en": "SQL Query Execution Flow (Logical Order)"
        },
        "description": {
          "tr": "Bir SQL sorgusunun veri tabanı motoru tarafından hangi mantıksal sıra ile çalıştırıldığını (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT) canlı olarak gör.",
          "en": "Watch the logical execution order of an SQL query step-by-step in the database engine (FROM ➔ WHERE ➔ GROUP BY ➔ SELECT ➔ ORDER BY ➔ LIMIT)."
        },
        "code": "SELECT env, COUNT(*) AS count\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nORDER BY count DESC\nLIMIT 1;",
        "language": "sql"
      },
      {
        "type": "visual",
        "variant": "table",
        "title": "Örnek Verimiz — test_results Tablosu",
        "tables": [
          {
            "name": "test_results",
            "columns": [
              {
                "name": "id",
                "type": "INT",
                "pk": true
              },
              {
                "name": "test_name",
                "type": "VARCHAR"
              },
              {
                "name": "status",
                "type": "VARCHAR"
              },
              {
                "name": "duration_ms",
                "type": "INT"
              },
              {
                "name": "environment",
                "type": "VARCHAR"
              }
            ],
            "rows": [
              {
                "cells": [
                  1,
                  "Login Test",
                  "PASS",
                  1200,
                  "staging"
                ]
              },
              {
                "cells": [
                  2,
                  "Checkout Flow",
                  "FAIL",
                  5400,
                  "staging"
                ],
                "highlighted": true
              },
              {
                "cells": [
                  3,
                  "Signup Test",
                  "PASS",
                  890,
                  "prod"
                ]
              },
              {
                "cells": [
                  4,
                  "Profile Update",
                  "FAIL",
                  3100,
                  "prod"
                ],
                "highlighted": true
              },
              {
                "cells": [
                  5,
                  "Search Feature",
                  "PASS",
                  2200,
                  "staging"
                ]
              },
              {
                "cells": [
                  6,
                  "Logout Test",
                  "SKIP",
                  0,
                  "staging"
                ]
              }
            ]
          }
        ],
        "note": "Sarı satırlar = FAIL durumu. Dene: SELECT * FROM test_results WHERE status = 'FAIL' → 2. ve 4. satırları döndürür."
      },
      {
        "type": "callout",
        "color": "purple",
        "emoji": "🔄",
        "title": {
          "tr": "SQL Sorgularının Mantıksal Çalışma Sırası",
          "en": "Logical SQL Query Execution Order"
        },
        "content": {
          "tr": "SQL yazarken kodumuz yukarıdan aşağıya (SELECT, FROM, WHERE...) okunur; fakat veritabanı motoru sorguyu bu sırayla çalıştırmaz. Mantıksal çalışma sırası şöyledir:\n\n**FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT**\n\n- **WHERE neden SELECT'ten önce çalışır?** Veritabanı motorunun önce hangi satırlarla çalışacağını (WHERE) belirlemesi gerekir. Sütun seçimi ve takma ad (alias) tanımlama (SELECT) ise daha sonra gerçekleşir.\n- **Alias Kırılması**: SELECT aşamasında tanımladığınız bir takma ad (örn: `SELECT name AS user_name`), WHERE aşamasında kullanılamaz! Çünkü WHERE çalışırken henüz SELECT aşamasına gelinmemiştir ve takma ad henüz tanımlanmamıştır.",
          "en": "In SQL, queries are written in a specific visual order (SELECT, FROM, WHERE...), but the database engine executes them in a different logical order:\n\n**FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT**\n\n- **Why WHERE runs before SELECT**: The engine must first filter the source rows (WHERE) before deciding which columns or computed fields to output (SELECT).\n- **Alias Limitation**: Because WHERE executes before SELECT, aliases defined in the SELECT clause (e.g. `SELECT name AS user_name`) are not recognized in the WHERE clause yet. You must filter using raw column names."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanı motorunun mantıksal sorgu çalışma sırasında SELECT aşaması neden WHERE aşamasından SONRA çalışır?",
          "en": "Why does the SELECT clause execute AFTER the WHERE clause in the logical query processing order?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "SELECT sorgunun en üstünde yazıldığı için",
              "en": "Because SELECT is written at the top of the query"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Önce satırların filtrelenmesi (WHERE) gerekir ki SELECT sadece filtrelenmiş verileri projeksiyon (sütun seçimi) yapabilsin",
              "en": "Because rows must be filtered first (WHERE) so SELECT only processes and projects the qualified rows"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Veritabanı motoru SELECT aşamasını tamamen atlar",
              "en": "Because the database engine skips SELECT entirely"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "WHERE sorgunun en altında yazıldığı için",
              "en": "Because WHERE is written at the bottom of the query"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Mantıksal çalışma sırası FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT şeklindedir. Veritabanı motoru önce hangi satırlarla çalışacağını seçer (WHERE), ardından bu satırların hangi sütunlarını göstereceğini belirler (SELECT).",
          "en": "The logical evaluation order starts with FROM, then filters rows with WHERE. SELECT executes near the end because the database must first isolate which rows qualify before deciding which columns/expressions to output."
        },
        "retryQuestion": {
          "question": {
            "tr": "`SELECT name AS user_name FROM users WHERE user_name = \"Alice\";` sorgusu neden hata verir?",
            "en": "Why does the query: `SELECT name AS user_name FROM users WHERE user_name = \"Alice\";` throw an error?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "user_name çift tırnak içinde olduğu için",
                "en": "Because user_name is enclosed in double quotes"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE adımı SELECT'ten önce çalıştığı için SELECT'te tanımlanan takma ad (user_name) WHERE tarafından henüz bilinmez",
                "en": "Because WHERE executes before SELECT, so the alias (user_name) is not yet defined or known during the WHERE stage"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "name sütunu tabloda bulunmadığı için",
                "en": "Because name column does not exist in the table"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "WHERE ifadesi AS kelimesini desteklemediği için",
                "en": "Because WHERE does not support the AS keyword"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Mantıksal sıralamada WHERE adımı SELECT'ten önce değerlendirilir. SELECT çalışmadan önce alias (takma ad) oluşturulmadığı için WHERE adımında `user_name` şeklinde bir alias kullanılamaz. Bunun yerine gerçek sütun adı kullanılmalıdır.",
            "en": "Since WHERE is evaluated before SELECT, aliases defined in the SELECT list (like user_name) are not yet available when filtering rows. You must use the raw column name `WHERE name = \"Alice\"` instead."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL sorgularının yazım sırası ile mantıksal çalışma sırası (logical query processing) arasındaki farkı anlatarak SELECT takma adlarının (alias) neden WHERE içinde kullanılamadığını açıklayın.",
        "promptEn": "Explain the difference between SQL written order and logical query processing order, explaining why SELECT aliases cannot be used in a WHERE clause.",
        "keywords": [
          [
            "from",
            "where"
          ],
          [
            "select"
          ],
          [
            "alias",
            "takma"
          ],
          [
            "order",
            "sıra",
            "çalışma"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Sorgu yazarken SELECT ile başlarız ancak veritabanı motoru mantıksal olarak FROM ve WHERE adımlarını SELECT'ten önce çalıştırır. SELECT adımı henüz çalışmadığı için, orada tanımlanan sütun takma adları (alias) WHERE içinde kullanılamaz.",
        "modelAnswerEn": "Although queries start with SELECT, the engine evaluates FROM and WHERE steps prior to SELECT. Because aliases are defined during the SELECT phase, they are not yet known or available during the execution of the WHERE clause."
      }
    ]
  },
  {
    "title": "🟡 Aggregate Fonksiyonlar",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": {
          "tr": "JOIN, iki tabloyu ortak bir sütuna göre birleştirmek — iki Excel dosyasını müşteri numarasına göre yan yana koymak gibi. Java'da bunu iki liste üzerinde iç içe for döngüsüyle yapardın. SQL'de tek satırda JOIN yazarsın.",
          "en": "JOIN means connecting two tables on a shared column — like merging two Excel sheets by customer ID. In Java you'd use nested for loops over two lists. In SQL you write JOIN in one line and the database does the rest."
        }
      },
      {
        "type": "heading",
        "text": "Aggregate (Toplama) Fonksiyonları",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "code",
        "code": "-- Aggregate functions summarize multiple rows into one value:\nSELECT COUNT(*)                 AS total_tests    FROM test_results;\nSELECT COUNT(*) FILTER (WHERE status='PASS') AS passed FROM test_results;  -- PostgreSQL\nSELECT SUM(duration_ms)         AS total_ms       FROM test_results;\nSELECT AVG(duration_ms)         AS avg_ms         FROM test_results;\nSELECT MIN(duration_ms)         AS fastest_ms     FROM test_results;\nSELECT MAX(duration_ms)         AS slowest_ms     FROM test_results;\n\n-- Round decimals:\nSELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;",
        "expected": "+-------------+\n| total_tests |\n+-------------+\n|           6 |\n+-------------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- Aggregate functions — çalıştır!\nSELECT COUNT(*) AS total_tests FROM test_results;\n\n-- Diğerlerini dene:\n-- SELECT SUM(duration_ms) AS total_ms FROM test_results;\n-- SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;\n-- SELECT MIN(duration_ms) AS fastest, MAX(duration_ms) AS slowest FROM test_results;\n-- SELECT COUNT(*) AS failed FROM test_results WHERE status = 'FAIL';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "📊",
        "title": {
          "tr": "Aggregate Fonksiyonları ve GROUP BY Kuralı",
          "en": "Aggregate Functions and the GROUP BY Rule"
        },
        "content": {
          "tr": "Verileri özetlemek için aggregate fonksiyonlarını (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) kullanırız:\n\n1. **GROUP BY Olmadan Kullanım**: Eğer bu fonksiyonları herhangi bir gruplama yapmadan doğrudan çağırırsanız (örn: `SELECT COUNT(*) FROM test_results;`), veritabanı tüm tabloyu tek bir grup kabul eder ve özet içeren tek satırlık bir sonuç döndürür.\n2. **GROUP BY Zorunluluğu**: Bir `SELECT` sorgusunda hem normal bir sütun (örn: `status`) hem de özet bir fonksiyon (örn: `COUNT(*)`) varsa, o normal sütun mutlaka `GROUP BY status` şeklinde belirtilmelidir. Aksi takdirde motor, her satırdaki farklı status değerlerini tek satırlık özetle nasıl eşleştireceğini bilemez ve standart SQL'de hata verir.",
          "en": "Aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) collapse multiple rows of data into a summary:\n\n1. **Usage Without GROUP BY**: If used alone (e.g., `SELECT COUNT(*) FROM test_results;`), the engine treats the entire table as a single massive partition and outputs exactly one summary row.\n2. **The GROUP BY Rule**: If you select a non-aggregated column alongside an aggregate function (e.g., `SELECT status, COUNT(*)`), you must list that column in a `GROUP BY` clause. Otherwise, standard SQL throws an error because it cannot display individual rows alongside summarized values."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Aggregate fonksiyonları (COUNT, SUM, AVG) GROUP BY olmadan kullanıldığında veritabanı motoru nasıl davranır?",
          "en": "How does the database engine behave when aggregate functions (COUNT, SUM, AVG) are used without a GROUP BY clause?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Hata verir ve sorguyu çalıştırmaz",
              "en": "It throws an error and rejects the query"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Tüm tabloyu tek bir grup olarak ele alır ve tek satırlık bir özet sonuç döndürür",
              "en": "It treats the entire table as a single group and returns a single summary row"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablodaki tüm satırları aynen listeler",
              "en": "It lists all rows in the table individually"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sadece ilk satırın verilerini getirir",
              "en": "It only returns the values of the first row"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "GROUP BY belirtilmediğinde aggregate fonksiyonlar tablodaki tüm satırları tek bir dev grup olarak görür. `SELECT COUNT(*) FROM users;` sorgusunun tüm tablo için tek bir sayı döndürmesi bundandır.",
          "en": "Without a GROUP BY clause, aggregate functions aggregate across the entire set of matching rows as a single partition, outputting exactly one row containing the result."
        },
        "retryQuestion": {
          "question": {
            "tr": "`SELECT status, COUNT(*) FROM test_results;` sorgusu neden standart SQL'de hata verir?",
            "en": "Why does the query: `SELECT status, COUNT(*) FROM test_results;` throw an error in standard SQL?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "status sütununun veri tipi uyuşmadığı için",
                "en": "Because the data type of the status column is incompatible"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "status sütununa göre GROUP BY yapılmadığı için veritabanı motoru status değerlerini hangi grup satırıyla eşleştireceğini bilemez",
                "en": "Because status is not in a GROUP BY clause, so the engine cannot associate individual status values with the single aggregated row count"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "test_results tablosu boş olduğu için",
                "en": "Because the test_results table is empty"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "COUNT(*) fonksiyonu SELECT ile birlikte kullanılamayacağı için",
                "en": "Because COUNT(*) cannot be used with SELECT"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir SELECT sorgusunda hem normal bir sütun (status) hem de bir aggregate fonksiyonu (COUNT) varsa, o normal sütun mutlaka GROUP BY içinde yer almalıdır. Aksi halde veritabanı satırları tek bir hücreye sığdıramaz.",
            "en": "In standard SQL, you cannot select a non-aggregated column alongside an aggregate unless that column is declared in the GROUP BY clause. Otherwise, the engine does not know which row's status to display."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "COUNT, SUM ve AVG gibi aggregate fonksiyonlarının çalışma mantığını ve GROUP BY ifadesiyle birlikte kullanıldıklarında sonuç kümesini nasıl etkilediklerini açıklayın.",
        "promptEn": "Explain how aggregate functions (COUNT, SUM, AVG) work and how using them with GROUP BY affects the final result set.",
        "keywords": [
          [
            "aggregate",
            "fonksiyon"
          ],
          [
            "group by",
            "grupla"
          ],
          [
            "count",
            "sum",
            "avg"
          ],
          [
            "collapse",
            "satır",
            "tek"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Aggregate fonksiyonları çoklu satırları tek bir özet değere dönüştürür. GROUP BY olmadan kullanıldıklarında tüm tabloyu tek bir grup sayıp tek satır dönerler. GROUP BY eklendiğinde ise veriyi kategorize edip her grup için ayrı özet satırı üretirler.",
        "modelAnswerEn": "Aggregate functions process multiple rows to compute a single summary value. Without GROUP BY, they aggregate the entire table into a single row. With GROUP BY, they compute a separate summary row for each distinct group."
      }
    ]
  },
  {
    "title": "🟡 GROUP BY & HAVING",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📊",
        "content": {
          "tr": "GROUP BY, sınıflara göre not ortalaması almak gibi. Öğrencileri sınıfa göre yığ, her yığın için COUNT/AVG/SUM hesapla. HAVING bu yığınları sonradan filtreler. Java Streams .groupingBy() tam karşılığı.",
          "en": "GROUP BY is like calculating averages per class. Pile rows by group, compute COUNT/AVG/SUM per pile. HAVING filters those piles afterward. Direct equivalent of Java Streams .groupingBy()."
        }
      },
      {
        "type": "heading",
        "text": "GROUP BY ve HAVING",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "text",
        "content": "GROUP BY, aynı değere sahip satırları gruplar. HAVING ise bu grupları filtreler — WHERE gibi ama aggregate sonuçları için. COUNT/SUM gibi fonksiyonları WHERE içinde kullanamazsınız; bunun için HAVING kullanın."
      },
      {
        "type": "code",
        "code": "-- Count tests by status:\nSELECT status, COUNT(*) AS count\nFROM test_results\nGROUP BY status\nORDER BY count DESC;\n\n-- Average duration per environment (only envs with > 3 tests):\nSELECT environment,\n       COUNT(*)            AS total,\n       ROUND(AVG(duration_ms), 0) AS avg_ms\nFROM test_results\nGROUP BY environment\nHAVING COUNT(*) > 3          -- HAVING filters groups (not rows!)\nORDER BY avg_ms DESC;\n\n-- WHERE (filter before grouping) + HAVING (filter after):\nSELECT test_name, COUNT(*) AS run_count\nFROM test_results\nWHERE status = 'FAIL'        -- only FAIL rows\nGROUP BY test_name\nHAVING COUNT(*) > 2;         -- tests that failed more than 2 times",
        "expected": "+--------+-------+\n| status | count |\n+--------+-------+\n| PASS   |     3 |\n| FAIL   |     2 |\n| SKIP   |     1 |\n+--------+-------+"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES (1,'Login Test','PASS',1200,'staging');\nINSERT INTO test_results VALUES (2,'Checkout Flow','FAIL',5400,'staging');\nINSERT INTO test_results VALUES (3,'Signup Test','PASS',890,'prod');\nINSERT INTO test_results VALUES (4,'Profile Update','FAIL',3100,'prod');\nINSERT INTO test_results VALUES (5,'Search Feature','PASS',2200,'staging');\nINSERT INTO test_results VALUES (6,'Logout Test','SKIP',0,'staging');\nINSERT INTO test_results VALUES (7,'Login Test','PASS',1100,'prod');\nINSERT INTO test_results VALUES (8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- GROUP BY — statusa göre say\nSELECT status, COUNT(*) AS count\nFROM test_results\nGROUP BY status\nORDER BY count DESC;\n\n-- Diğerlerini dene:\n-- SELECT environment, ROUND(AVG(duration_ms),0) AS avg_ms FROM test_results GROUP BY environment;\n-- SELECT test_name, COUNT(*) AS runs FROM test_results GROUP BY test_name HAVING COUNT(*) > 1;"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "Veri Gruplama ve HAVING Filtresi",
          "en": "Data Grouping and the HAVING Filter"
        },
        "content": {
          "tr": "GROUP BY ve HAVING, verileri özet gruplara bölmek ve filtrelemek için kullanılır:\n\n- **Gruplama (GROUP BY)**: Belirli bir sütundaki aynı değerlere sahip satırları bir araya getirir (örn: her ortamdaki test sayılarını bulmak için `GROUP BY environment`).\n- **Grup Filtreleme (HAVING)**: Gruplanmış verileri filtrelemek için kullanılır. **WHERE satırları filtrelerken, HAVING gruplanmış sonuçları filtreler.** WHERE aggregate fonksiyonları (`COUNT`, `SUM` vb.) içeremezken, HAVING içinde bu fonksiyonlar üzerinden filtreleme yapabiliriz (örn: `HAVING COUNT(*) > 5`).",
          "en": "GROUP BY and HAVING are used to organize rows into summary groups and filter the results:\n\n- **Grouping (GROUP BY)**: Gathers rows that share the same values in specified columns (e.g., group test runs by their environment: `GROUP BY environment`).\n- **Group Filtering (HAVING)**: Evaluates conditions on groups of rows. **WHERE filters source rows before grouping, while HAVING filters the groups themselves.** Unlike WHERE, HAVING allows aggregate functions in its conditions (e.g. `HAVING COUNT(*) > 5`)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "GROUP BY ile birlikte gruplanmis sonuclari filtreleyen clause hangisidir?",
          "en": "Which clause filters grouped results when used with GROUP BY?"
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
            "text": "FILTER"
          },
          {
            "id": "d",
            "text": "ORDER BY"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "HAVING, aggregate fonksiyon sonuclarini (COUNT, SUM vb.) filtreler. WHERE ise satirlari gruplamadan once filtreler.",
          "en": "HAVING filters aggregate results (COUNT, SUM etc.). WHERE filters individual rows before grouping — you cannot use COUNT(*) in a WHERE clause."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "GROUP BY kullanılan bir sorguda WHERE ile HAVING arasındaki farkı açıklayarak aggregate fonksiyonların hangi kısıtlamada filtrelenebileceğini belirtin.",
        "promptEn": "Explain the difference between WHERE and HAVING in a GROUP BY query, specifying where aggregate functions can be filtered.",
        "keywords": [
          [
            "where"
          ],
          [
            "having"
          ],
          [
            "group by",
            "gruplama"
          ],
          [
            "filter",
            "filtre"
          ],
          [
            "aggregate",
            "toplam"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "WHERE, gruplama yapılmadan önce tek tek satırları filtreler ve aggregate fonksiyon içeremez. HAVING ise GROUP BY çalıştıktan sonra gruplanmış sonuçları filtreler ve aggregate fonksiyon sonuçları üzerinde filtreleme yapabilir.",
        "modelAnswerEn": "WHERE filters raw rows before any grouping is performed and cannot filter aggregates. HAVING filters grouped rows after GROUP BY evaluates, allowing conditions on aggregate function results."
      }
    ]
  },
  {
    "title": "🟡 SQL JOINs",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": {
          "tr": "JOIN, iki listeyi ortak alana göre birleştirmek gibi. Öğrenci listesi + not listesi → öğrenci_id üzerinden birleşir. INNER JOIN sadece eşleşenleri getirir. LEFT JOIN sol tablonun tamamını korur, sağ tarafta eşleşme yoksa NULL koyar.",
          "en": "JOIN merges two lists by a common field. Student list + grade list joined on student_id. INNER JOIN returns only matching rows. LEFT JOIN keeps all rows from the left table — unmatched right side becomes NULL."
        }
      },
      {
        "type": "heading",
        "text": "JOIN'ler — Tabloları Birleştirme",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "text",
        "content": "JOIN'ler, birden fazla ilişkili tablodan tek sorguda veri almanızı sağlar. Gerçek dünya veritabanlarında veriler tablolar arasında bölündüğünden JOIN'ler vazgeçilmezdir."
      },
      {
        "type": "sql-join-visual",
        "defaultJoin": "INNER",
        "joinKey": [
          1,
          0
        ],
        "leftTable": {
          "name": "bugs",
          "columns": [
            "id",
            "tester_id",
            "title",
            "status"
          ],
          "rows": [
            [
              1,
              1,
              "Login fails on Safari",
              "OPEN"
            ],
            [
              2,
              2,
              "Broken image",
              "CLOSED"
            ],
            [
              3,
              99,
              "API timeout",
              "OPEN"
            ]
          ]
        },
        "rightTable": {
          "name": "testers",
          "columns": [
            "id",
            "name"
          ],
          "rows": [
            [
              1,
              "Alice"
            ],
            [
              2,
              "Bob"
            ]
          ]
        }
      },
      {
        "type": "code",
        "code": "-- Our tables:\n-- testers:  id, name, email\n-- bugs:     id, title, status, tester_id (FK → testers.id), project_id (FK → projects.id)\n-- projects: id, name, deadline\n\n-- INNER JOIN: only rows matching in BOTH tables\nSELECT t.name AS tester, b.title AS bug, b.status\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id;\n-- Rows with no matching tester OR no matching bug are EXCLUDED\n\n-- LEFT JOIN: ALL rows from left table + matching from right (NULL if no match)\nSELECT t.name, COUNT(b.id) AS assigned_bugs\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;\n-- Testers with 0 bugs still appear (assigned_bugs = 0)\n\n-- RIGHT JOIN: ALL rows from right table + matching from left\n-- (rarely used — usually rewrite as LEFT JOIN with tables swapped)\n\n-- Multi-table JOIN:\nSELECT t.name AS tester, p.name AS project, b.title AS bug, b.status\nFROM testers t\nJOIN bugs b      ON t.id = b.tester_id\nJOIN projects p  ON b.project_id = p.id\nWHERE b.status = 'OPEN'\nORDER BY p.name, t.name;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice','alice@qa.com'),(2,'Bob','bob@qa.com'),(3,'Carol','carol@qa.com');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- INNER JOIN: testers ve bug'lar birleştir\nSELECT t.name AS tester, b.title AS bug, b.status\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id;\n\n-- Diğerlerini dene:\n-- SELECT t.name, COUNT(b.id) AS assigned_bugs FROM testers t LEFT JOIN bugs b ON t.id=b.tester_id GROUP BY t.id,t.name;\n-- SELECT t.name, p.name AS project, b.title FROM testers t JOIN bugs b ON t.id=b.tester_id JOIN projects p ON b.project_id=p.id WHERE b.status='OPEN';",
        "text": "Alt Sorgular (Subquery)",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "heading",
        "text": { "tr": "Görsel JOIN Rehberi — Hangi Satırlar Döndürülür", "en": "Visual JOIN Guide — See Exactly Which Rows Are Returned" }
      },
      {
        "type": "text",
        "content": { "tr": "Aşağıdaki 4 diyagram aynı veriyi kullanıyor. Eşleşen satırları vurgulamak için 'Eşleşmeleri Göster', sorgu sonucunu görmek için 'Sonucu Göster'e tıklayın. JOIN'leri gerçekten anlamanın en hızlı yolu bu.", "en": "The 4 diagrams below use the same data. Click 'Eşleşmeleri Göster' to highlight matched rows, then 'Sonucu Göster' to see the query result. This is the fastest way to truly understand JOINs." }
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "INNER JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_title",
          "status"
        ],
        "resultRows": [
          [
            "Alice",
            "Login fails on Safari",
            "OPEN"
          ],
          [
            "Alice",
            "Broken image on profile",
            "CLOSED"
          ],
          [
            "Bob",
            "API timeout on checkout",
            "OPEN"
          ]
        ],
        "explanation": { "tr": "INNER JOIN yalnızca HER İKİ tabloda da eşleşen satırları döndürür. Carol'un hiç hatası yok — sonuçtan tamamen hariç tutulur.", "en": "INNER JOIN returns ONLY rows that match in BOTH tables. Carol has no bugs — she is completely excluded from the result." }
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "LEFT JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false,
              "nullFill": true
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_count"
        ],
        "resultRows": [
          [
            "Alice",
            2
          ],
          [
            "Bob",
            1
          ],
          [
            "Carol",
            0
          ]
        ],
        "explanation": { "tr": "LEFT JOIN, SOL tablodan (testers) TÜM satırları döndürür, artı bugs'dan eşleşmeleri. Carol bug_count=0 ile görünür — LEFT JOIN, \"sıfır dahil her kullanıcı başına say\" için mükemmeldir.", "en": "LEFT JOIN returns ALL rows from the LEFT table (testers), plus matches from bugs. Carol appears with bug_count=0 — LEFT JOIN is perfect for \"count per user, including zeros\"." }
      },
      {
        "type": "visual",
        "variant": "join",
        "joinType": "RIGHT JOIN",
        "leftTable": {
          "name": "testers",
          "rows": [
            {
              "label": "1 | Alice",
              "matched": true
            },
            {
              "label": "2 | Bob",
              "matched": true
            },
            {
              "label": "3 | Carol",
              "matched": false
            }
          ]
        },
        "rightTable": {
          "name": "bugs",
          "rows": [
            {
              "label": "1 | Login fails | t=1",
              "matched": true
            },
            {
              "label": "2 | Broken img | t=1",
              "matched": true
            },
            {
              "label": "3 | API timeout | t=2",
              "matched": true
            },
            {
              "label": "4 | Crash | t=99 (no tester!)",
              "matched": false,
              "nullFill": true
            }
          ]
        },
        "resultHeaders": [
          "tester",
          "bug_title"
        ],
        "resultRows": [
          [
            "Alice",
            "Login fails on Safari"
          ],
          [
            "Alice",
            "Broken image on profile"
          ],
          [
            "Bob",
            "API timeout on checkout"
          ],
          [
            null,
            "Crash on empty search"
          ]
        ],
        "explanation": { "tr": "RIGHT JOIN, SAĞ tablodan (bugs) TÜM satırları döndürür. Bug #4'ün test uzmanı yok — hâlâ tester=NULL ile görünür. Nadiren kullanılır — çoğu geliştirici bunu tablolar yer değiştirilerek LEFT JOIN olarak yeniden yazar.", "en": "RIGHT JOIN returns ALL rows from the RIGHT table (bugs). Bug #4 has no tester — it still appears with tester = NULL. Rarely used — most developers rewrite as LEFT JOIN with tables swapped." },
        "left": {
          "label": "❌ Yavaş — Her satır için alt sorgu",
          "code": "SELECT name,\n  (SELECT COUNT(*) FROM bugs\n   WHERE tester_id = t.id) AS bug_count\nFROM testers t;\n-- İç SELECT her tester satırı için bir kez çalışır!",
          "note": "Bağıntılı alt sorgu: O(n) iç sorgu"
        },
        "right": {
          "label": "✅ Hızlı — Tek JOIN + GROUP BY",
          "code": "SELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;\n-- Her iki tabloda tek geçiş",
          "note": "LEFT JOIN: 0 hatalı durumları da doğru işler"
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "❌ Slow — Subquery for every row",
          "code": "SELECT name,\n  (SELECT COUNT(*) FROM bugs\n   WHERE tester_id = t.id) AS bug_count\nFROM testers t;\n-- Runs inner SELECT once per tester row!",
          "note": "Correlated subquery: O(n) inner queries"
        },
        "right": {
          "label": "✅ Fast — Single JOIN + GROUP BY",
          "code": "SELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;\n-- Single pass through both tables",
          "note": "LEFT JOIN: handles 0 bugs correctly too"
        },
        "question": "Hangi JOIN türü, sağ tabloda eşleşmesi olmayan satırlar dahil sol tablodan TÜM satırları döndürür?",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
        "correct": 2,
        "explanation": "LEFT JOIN (LEFT OUTER JOIN olarak da bilinir), sol tablodan her satırı döndürür. Sağ tabloda eşleşme yoksa NULL değerler görünür. \"Sıfır hataya sahip olanlar dahil tüm test uzmanları\" gibi durumlarda kullanılır."
      },
      {
        "type": "quiz",
        "question": "Which JOIN type returns ALL rows from the left table, including rows with NO matches in the right table?",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
        "correct": 2,
        "explanation": "LEFT JOIN (also called LEFT OUTER JOIN) returns every row from the left table. For right-table columns with no match, NULL values appear. Use it when you need \"all X, even if they have no related Y\" — like all testers including those with 0 bugs.",
        "retryQuestion": {
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
        },
        "text": "☕ Java Biliyorsan: PreparedStatement ve Transaction Köprüsü"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "SQL Tablo Birleştirme (JOIN) Çeşitleri",
          "en": "Types of SQL JOIN Operations"
        },
        "content": {
          "tr": "Farklı tablolardaki ilişkili verileri birleştirmek için JOIN işlemlerini kullanırız:\n\n- **INNER JOIN**: Her iki tabloda da eşleşen ortak satırları getirir.\n- **LEFT JOIN**: Sol tablodaki tüm satırları getirir; sağ tabloda eşleşme yoksa o sütunları `NULL` yapar (yetim/ilişkisiz kayıtları bulmak için idealdir).\n- **RIGHT JOIN**: Sağ tablodaki tüm satırları getirir; sol tabloda eşleşme yoksa `NULL` yapar.\n- **FULL OUTER JOIN**: Eşleşsin veya eşleşmesin her iki tablodaki tüm satırları birleştirerek getirir.\n- **CROSS JOIN**: İki tablo arasındaki tüm kombinasyonları (Kartezyen çarpım) getirir.\n- **Self Join**: Bir tablonun hiyerarşik ilişkileri (çalışan-yönetici ilişkisi gibi) göstermek için kendisiyle birleştirilmesidir.",
          "en": "JOIN statements combine rows from two or more tables based on a related column between them:\n\n- **INNER JOIN**: Returns records that have matching values in both tables.\n- **LEFT JOIN**: Returns all records from the left table, and the matched records from the right table (fills unmatched right-side columns with `NULL`).\n- **RIGHT JOIN**: Returns all records from the right table, and the matched records from the left table.\n- **FULL OUTER JOIN**: Returns all records when there is a match in either left or right table.\n- **CROSS JOIN**: Produces the Cartesian product of the two tables (combines every row of the first table with every row of the second).\n- **Self Join**: Joining a table to itself to query hierarchical relationships (like employee-manager trees)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Hangi JOIN turu sol tablodan tum satirlari dondurur, sagda eslesme olmasa bile?",
          "en": "Which JOIN returns ALL rows from the left table, even with no match on the right?"
        },
        "options": [
          {
            "id": "a",
            "text": "INNER JOIN"
          },
          {
            "id": "b",
            "text": "CROSS JOIN"
          },
          {
            "id": "c",
            "text": "RIGHT JOIN"
          },
          {
            "id": "d",
            "text": "LEFT JOIN"
          }
        ],
        "correct": "d",
        "explanation": {
          "tr": "LEFT JOIN, sol tablodaki tum satirlari dondurur. Sag tabloda eslesme yoksa sag sutunlar NULL olur.",
          "en": "LEFT JOIN returns every row from the left table. If there is no match on the right, right-side columns come back as NULL."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "INNER JOIN ile LEFT JOIN arasındaki farkı açıklayın ve bir test otomasyonunda yetim (orphaned) kayıtları bulmak için LEFT JOIN'i nasıl kullanabileceğimizi anlatın.",
        "promptEn": "Explain the difference between INNER JOIN and LEFT JOIN. How can QA engineers use LEFT JOIN to find orphaned database records?",
        "keywords": [
          [
            "inner",
            "left"
          ],
          [
            "join",
            "birleş"
          ],
          [
            "null"
          ],
          [
            "orphaned",
            "yetim"
          ],
          [
            "foreign",
            "key",
            "yabancı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INNER JOIN yalnızca her iki tabloda eşleşen kayıtları getirir. LEFT JOIN sol tablodaki tüm satırları getirir, eşleşmeyen sağ taraflar NULL olur. `LEFT JOIN ... WHERE sag.id IS NULL` sorgusuyla parent kaydı silinmiş yetim kayıtları yakalarız.",
        "modelAnswerEn": "INNER JOIN returns rows with matching values in both tables. LEFT JOIN returns all rows from the left table, filling right-side columns with NULL if no match exists. We find orphaned records by querying LEFT JOIN with a WHERE right.key IS NULL."
      }
    ]
  },
  {
    "title": "🟡 Alt Sorgular",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📦",
        "content": {
          "tr": "Subquery, bir sorunun cevabını başka sorguya dahil etmek. Ortalamanın üzerindeki testleri bul → önce ortalama hesapla, sonra filtrele. Java: list.stream().filter(t -> t.duration > getAverage()). Subquery tam olarak bu.",
          "en": "A subquery embeds one query answer inside another. Find tests slower than average: first compute average, then filter. Java: list.stream().filter(t -> t.duration > getAverage()). A subquery is exactly that."
        }
      },
      {
        "type": "heading",
        "text": "Subqueries",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "code",
        "code": "-- Subquery in WHERE (scalar subquery):\nSELECT test_name, duration_ms\nFROM test_results\nWHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results);\n-- tests that are slower than average\n\n-- Subquery with IN:\nSELECT t.name\nFROM testers t\nWHERE t.id IN (\n    SELECT DISTINCT tester_id FROM bugs WHERE status = 'OPEN'\n);\n-- testers who have at least one open bug\n\n-- Subquery in FROM (derived table — must be aliased):\nSELECT environment, avg_ms\nFROM (\n    SELECT environment, AVG(duration_ms) AS avg_ms\n    FROM test_results\n    GROUP BY environment\n) AS env_stats\nWHERE avg_ms > 2000;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');\nCREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, tester_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO bugs VALUES (1,'Login fails','OPEN',1),(2,'Broken image','CLOSED',1),(3,'API timeout','OPEN',2),(4,'Wrong msg','OPEN',2);",
        "defaultCode": "-- Ortalamanın üzerindeki testler (scalar subquery):\nSELECT test_name, duration_ms\nFROM test_results\nWHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results)\nORDER BY duration_ms DESC;\n\n-- Diğerlerini dene:\n-- SELECT name FROM testers WHERE id IN (SELECT DISTINCT tester_id FROM bugs WHERE status='OPEN');",
        "text": "LIKE, BETWEEN, IN",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🟡",
        "title": {
          "tr": "Alt Sorgular (Subqueries)",
          "en": "SQL Subqueries"
        },
        "content": {
          "tr": "Bir SQL sorgusunun içine yazılmış başka bir sorguya alt sorgu (subquery) denir. İki ana türü vardır:\n\n- **Basit Alt Sorgu (Subquery)**: Dış sorgudan bağımsızdır. Önce alt sorgu **bir kez** çalışır, sonucu dış sorguya iletir (örn: ortalama süreden uzun süren testleri bulma).\n- **Bağlantılı Alt Sorgu (Correlated Subquery)**: Dış sorgudaki satırların değerlerine bağımlıdır. Dış sorgunun **her bir satırı için tekrar tekrar çalışır**. Bu yüzden büyük tablolarda performans sorunu yaratabilir.\n- **EXISTS Operatörü**: Alt sorgunun herhangi bir satır döndürüp döndürmediğini kontrol etmek için kullanılır (en az 1 eşleşme bulduğunda çalışmayı durdurur, performanslıdır).",
          "en": "A subquery is a SELECT query nested inside another SQL statement. There are two primary types:\n\n- **Simple Subquery**: Runs independently of the outer query. It executes **once** first, computes its value, and hands it to the outer query.\n- **Correlated Subquery**: References columns from the outer query. It must execute **once for each row** evaluated by the outer query, which can create significant performance overhead on large tables.\n- **EXISTS Operator**: Checks for the existence of rows in a subquery. It stops searching as soon as it finds a single match, making it highly efficient."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Correlated subquery ile normal subquery arasindaki temel fark nedir?",
          "en": "What is the key difference between a correlated and a regular subquery?"
        },
        "options": [
          {
            "id": "a",
            "text": "Correlated subquery sadece FROM clause'da calisir"
          },
          {
            "id": "b",
            "text": "Correlated subquery dis sorgunun her satiri icin bir kez calisir"
          },
          {
            "id": "c",
            "text": "Normal subquery her zaman daha yavastir"
          },
          {
            "id": "d",
            "text": "Aralarinda bir fark yoktur"
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Correlated subquery, dis sorgunun bir sutununa referans verir ve dis sorgunun her satiri icin yeniden calisir. Mumkunse JOIN kullanin.",
          "en": "A correlated subquery references a column from the outer query and runs once per outer row — can be slow. Use a JOIN instead when possible."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Alt sorgu (subquery) ile bağlantılı alt sorgu (correlated subquery) arasındaki farkı, özellikle performans açısından değerlendirerek açıklayın.",
        "promptEn": "Explain the difference between a subquery and a correlated subquery, evaluating their differences in performance.",
        "keywords": [
          [
            "subquery",
            "alt sorgu"
          ],
          [
            "correlated",
            "bağlantılı"
          ],
          [
            "performance",
            "performans",
            "hız"
          ],
          [
            "outer",
            "dış"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Standart alt sorgu bağımsızdır, bir kez çalışıp sonucu dış sorguya iletir. Bağlantılı alt sorgu ise dış sorgudaki bir sütunu referans alır ve dış sorgunun her satırı için tekrar tekrar çalışır; bu da büyük veritabanlarında yavaşlığa yol açar.",
        "modelAnswerEn": "A standard subquery runs independently and executes once, passing the result to the outer query. A correlated subquery references columns from the outer query, executing once for every row processed by the outer query, which can be slow."
      }
    ]
  },
  {
    "title": "🟡 LIKE, BETWEEN, IN",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🎯",
        "content": {
          "tr": "Üç pratik filtre: LIKE joker karakterle arama (% = herhangi karakter). BETWEEN tarih/sayı aralığı. IN uzun OR zinciri yerine liste kontrolü. Java: String.contains(), range check, List.contains() karşılıkları.",
          "en": "Three filter shortcuts: LIKE is pattern search with wildcards. BETWEEN is a range. IN replaces a long OR chain. Java: String.contains(), range check, List.contains()."
        }
      },
      {
        "type": "heading",
        "text": "LIKE, BETWEEN, IN",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "code",
        "code": "-- LIKE: pattern matching\n-- % = any number of characters, _ = exactly one character\nSELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains\nSELECT * FROM test_results WHERE test_name LIKE 'Sign_p%';  -- starts with Sign?p\n\n-- BETWEEN: inclusive range\nSELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;\nSELECT * FROM test_results WHERE run_date BETWEEN '2024-01-01' AND '2024-01-31';\n\n-- IN: matches any value in a list\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\nSELECT * FROM test_results WHERE environment NOT IN ('prod', 'staging');\n\n-- Aliases make output readable:\nSELECT\n    t.test_name  AS \"Test Name\",\n    t.duration_ms / 1000.0 AS \"Duration (sec)\",\n    t.status\nFROM test_results AS t\nWHERE t.status != 'SKIP';"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- LIKE: \"Login\" içeren testler\nSELECT test_name, status FROM test_results WHERE test_name LIKE '%Login%';\n\n-- Diğerlerini dene:\n-- SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;\n-- SELECT * FROM test_results WHERE status IN ('FAIL','SKIP');\n-- SELECT test_name AS \"Test Adı\", duration_ms/1000.0 AS \"Süre (sn)\", status FROM test_results WHERE status != 'SKIP';",
        "text": "Bug Takip DB — İnteraktif Örnek",
        "difficulty": "🟡 Orta Seviye"
      },
      {
        "type": "heading",
        "text": "Bug Tracking DB — Interactive Example",
        "difficulty": "🟡 Intermediate"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- En fazla açık hata olan kişi kim?\nSELECT te.name, COUNT(*) AS open_bugs\nFROM testers te\nJOIN bugs b ON te.id = b.tester_id\nWHERE b.status = 'OPEN'\nGROUP BY te.id, te.name\nORDER BY open_bugs DESC;\n\n-- Diğerlerini dene:\n-- SELECT p.name AS project, COUNT(b.id) AS total_bugs FROM projects p LEFT JOIN bugs b ON p.id=b.project_id GROUP BY p.id,p.name;\n-- SELECT te.name, b.title, b.priority FROM testers te JOIN bugs b ON te.id=b.tester_id WHERE b.priority='HIGH';",
        "text": "Görsel JOIN Kılavuzu — Tam Olarak Hangi Satırların Döndüğünü Gör"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🔍",
        "title": {
          "tr": "LIKE Operatörü ve Joker (Wildcard) Karakterler",
          "en": "LIKE Operator and Wildcard Characters"
        },
        "content": {
          "tr": "Metin tabanlı aramalarda `LIKE` operatörü ile joker (wildcard) karakterler kullanırız:\n\n- **Yüzde (%)**: Sıfır veya daha fazla karakterle eşleşir (örn: `API%` \"API\" ile başlayan, `%API` \"API\" ile biten, `%API%` ise içinde \"API\" geçen tüm metinleri bulur).\n- **Alt Çizgi (_)**: Tam olarak **tek bir** karakterin yerini tutar (örn: `_Login%` sorgusu, başında tam 1 karakter bulunan ve sonrasında \"Login\" ile devam eden metinlerle eşleşir; \"ALogin\" eşleşirken \"Login\" veya \"APILogin\" eşleşmez).",
          "en": "The `LIKE` operator is used to search for patterns in text columns using special wildcard characters:\n\n- **Percent (%)**: Matches zero or more characters (e.g., `API%` matches values starting with \"API\", `%API` ends with \"API\", and `%API%` contains \"API\" anywhere).\n- **Underscore (_)**: Matches exactly **one** character (e.g., `_Login%` matches strings that start with exactly one character followed by \"Login\", matching \"ALogin\" but not \"Login\" or \"APILogin\")."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "`SELECT * FROM test_results WHERE test_name LIKE \"_Login%\";` sorgusundaki alt çizgi (_) ve yüzde (%) wildcard karakterlerinin anlamı nedir?",
          "en": "What do the underscore (_) and percent (%) wildcard characters mean in the query: `SELECT * FROM test_results WHERE test_name LIKE \"_Login%\";`?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Her ikisi de herhangi bir sayıda karakteri temsil eder",
              "en": "Both represent any number of characters"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Alt çizgi (_) tam olarak TEK bir karakteri, yüzde (%) ise sıfır veya daha fazla karakteri temsil eder",
              "en": "Underscore (_) matches exactly ONE character, while percent (%) matches zero or more characters"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Alt çizgi (_) isteğe bağlı boşlukları, yüzde (%) ise sayıları temsil eder",
              "en": "Underscore (_) matches optional spaces, and percent (%) matches numbers"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Tersine, alt çizgi çoklu karakter, yüzde tek karakter eşler",
              "en": "The reverse, underscore matches multiple, percent matches single"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "SQL LIKE operatöründe `%` sıfır veya daha fazla karakter yerine geçer (Java Regex `.*` gibi). `_` ise tam olarak tek bir karakterle eşleşir (Java Regex `.` gibi). Dolayısıyla `_Login%` ifadesi, başında tam bir karakter olan ve \"Login\" ile devam eden kelimeleri yakalar.",
          "en": "In SQL wildcards, `%` matches zero or more characters, and `_` matches exactly one character. Thus, `_Login%` matches any string that has exactly one character before \"Login\", followed by any sequence."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sorgulardan hangisi `category` sütunundaki verilerin \"API\" ile başladığını garanti altına alır?",
            "en": "Which of the following queries ensures that the `category` column starts with \"API\"?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "WHERE category LIKE \"%API\"",
                "en": "WHERE category LIKE \"%API\""
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE category LIKE \"API%\"",
                "en": "WHERE category LIKE \"API%\""
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "WHERE category LIKE \"%API%\"",
                "en": "WHERE category LIKE \"%API%\""
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "WHERE category = \"API\"",
                "en": "WHERE category = \"API\""
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir metnin \"API\" ile başladığını doğrulamak için wildcard karakterini sonuna koymalıyız: `API%`. Başına konursa (%API) ile bittiğini, her iki yanına konursa (%API%) içinde geçtiğini belirtir.",
            "en": "To check if a string starts with \"API\", the percent wildcard must be placed at the end: `API%`. Placing it at the beginning (`%API`) checks if it ends with \"API\", and both sides (`%API%`) checks if it contains \"API\"."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "LIKE operatöründeki yüzde (%) ve alt çizgi (_) karakterlerinin arama şablonlarındaki rolünü ve farkını açıklayın.",
        "promptEn": "Explain the roles and differences of the percent (%) and underscore (_) characters in LIKE operator search patterns.",
        "keywords": [
          [
            "like"
          ],
          [
            "wildcard",
            "karakter"
          ],
          [
            "percent",
            "yüzde",
            "%"
          ],
          [
            "underscore",
            "alt",
            "çizgi",
            "_"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "LIKE operatöründe yüzde (%) sıfır veya daha fazla karakter yerine geçerken, alt çizgi (_) tam olarak tek bir karakter yerine geçer. Örneğin `_A%` ifadesi, ikinci harfi A olan tüm metinleri arar.",
        "modelAnswerEn": "In LIKE patterns, percent (%) matches any string of zero or more characters, whereas underscore (_) matches exactly one character. For example, `_A%` matches any string with \"A\" as its second character."
      }
    ]
  },
  {
    "title": "🔴 Window Fonksiyonları",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🪟",
        "content": {
          "tr": "Window fonksiyonu, GROUP BY'ın yaptığını yapar ama satırları yutmaz. GROUP BY 100 satırı 3 gruba indirger. Window fonksiyon 100 satırı korur ve her birine hesaplama ekler — Java'da Streams + Map kombinasyonu gibi ama çok daha kısa.",
          "en": "A window function does what GROUP BY does but keeps all rows. GROUP BY collapses 100 rows into 3 groups. A window function keeps all 100 rows and adds calculations per row — like Java Streams + Map combined, but in a fraction of the code."
        }
      },
      {
        "type": "heading",
        "text": "Window (Pencere) Fonksiyonları",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "text",
        "content": "Window fonksiyonları, GROUP BY'ın aksine satırları daraltmadan ilgili satırlar üzerinde hesaplamalar yapar. Her satır kendi sonucunu korurken komşu satırlar hakkında da bilgi alır."
      },
      {
        "type": "code",
        "code": "-- ROW_NUMBER: sequential number (ties each get unique numbers)\n-- RANK:       ties get same number, then GAPS (1,1,3)\n-- DENSE_RANK: ties get same number, NO gaps (1,1,2)\n\nSELECT test_name, duration_ms,\n       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,\n       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,\n       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk\nFROM test_results;\n\n-- PARTITION BY: reset numbering per group (like GROUP BY without collapsing)\nSELECT tester_name, project, bug_count,\n       RANK() OVER (PARTITION BY project ORDER BY bug_count DESC) AS rank_in_project\nFROM tester_project_bugs;\n-- → Rank 1 per project's top bug-finder\n\n-- LAG / LEAD: access previous/next row values\nSELECT run_date, total_failures,\n       LAG(total_failures)  OVER (ORDER BY run_date) AS prev_failures,\n       total_failures - LAG(total_failures) OVER (ORDER BY run_date) AS change\nFROM daily_test_stats;\n\n-- Running total:\nSELECT run_date, new_tests,\n       SUM(new_tests) OVER (ORDER BY run_date) AS cumulative_tests\nFROM daily_stats;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- ROW_NUMBER, RANK, DENSE_RANK — window functions\nSELECT test_name, duration_ms,\n       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,\n       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,\n       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk\nFROM test_results;\n\n-- Diğerlerini dene:\n-- SELECT environment, test_name, duration_ms, RANK() OVER (PARTITION BY environment ORDER BY duration_ms DESC) AS rank_in_env FROM test_results;"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🔴",
        "title": {
          "tr": "Pencere Fonksiyonları (Window Functions)",
          "en": "Window Functions"
        },
        "content": {
          "tr": "Pencere (Window) fonksiyonları, satırları GROUP BY gibi tek bir satıra indirgemeden (daraltmadan), ilişkili satır grupları üzerinde hesaplama yapmamızı sağlar:\n\n- **OVER (PARTITION BY ...)**: Veriyi hangi gruplara (pencerelere) bölerek işlem yapacağımızı belirtir.\n- **ROW_NUMBER()**: Her penceredeki satırlara 1, 2, 3... şeklinde benzersiz ardışık sıra numarası verir.\n- **RANK() vs DENSE_RANK()**: Eşit değerler olduğunda sıralamayı belirler. `RANK()`, eşit değerlerden sonra sıra numarasında boşluk bırakır (1, 1, 3). `DENSE_RANK()` ise boşluk bırakmadan sıralamaya devam eder (1, 1, 2).",
          "en": "Window functions perform calculations across a set of table rows that are related to the current row, without collapsing the rows into a single summary row like GROUP BY does:\n\n- **OVER (PARTITION BY ...)**: Defines the subset of rows (window partition) the function is calculated against.\n- **ROW_NUMBER()**: Assigns a unique sequential integer (1, 2, 3...) to each row within its partition.\n- **RANK() vs DENSE_RANK()**: Determines order for duplicate values. `RANK()` leaves gaps in the ordering sequence after duplicates (1, 1, 3). `DENSE_RANK()` continues without skipping any numbers (1, 1, 2)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Window fonksiyonlarini GROUP BY dan ayiran temel ozellik nedir?",
          "en": "What is the key difference between window functions and GROUP BY?"
        },
        "options": [
          {
            "id": "a",
            "text": "Window functions only work on dates"
          },
          {
            "id": "b",
            "text": "Window functions collapse rows into groups"
          },
          {
            "id": "c",
            "text": "Window functions calculate across rows without collapsing them"
          },
          {
            "id": "d",
            "text": "GROUP BY is faster than window functions"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "Window fonksiyonlari her satirin kimligini korur. GROUP BY satiri daraltir. ROW_NUMBER(), RANK(), SUM() OVER() satir bazli hesaplama yapar ama satir kaybolmaz.",
          "en": "Window functions keep each row identity — unlike GROUP BY which collapses rows. ROW_NUMBER(), RANK(), SUM() OVER() calculate per-row while keeping all rows visible."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "Window (pencere) fonksiyonlarının (OVER, RANK vb.) temel amacını ve bunları GROUP BY ile satırları birleştirmekten ayıran en önemli farkı açıklayın.",
        "promptEn": "Explain the main purpose of window functions (OVER, RANK, etc.) and the key difference that separates them from GROUP BY collapses.",
        "keywords": [
          [
            "window",
            "pencere"
          ],
          [
            "over"
          ],
          [
            "group by"
          ],
          [
            "collapse",
            "daralt",
            "satır"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Window fonksiyonları, GROUP BY gibi satırları tek bir satıra indirgemez. Her satırın kimliğini korurken ilişkili satır grupları üzerinde (pencere) matematiksel veya sıralama işlemleri yapmamızı sağlar.",
        "modelAnswerEn": "Unlike GROUP BY which collapses matching rows into a single summary row, window functions perform calculations across a set of table rows that are related to the current row while keeping all individual rows intact."
      }
    ]
  },
  {
    "title": "🔴 CTEs",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🧱",
        "content": {
          "tr": "CTE, karmaşık sorguya geçici isim vermek. Çok adımlı hesabı adımlara böler: yavaş testleri bul (CTE1), CTE1 ile karşılaştır (CTE2). Java’da method sonucunu değişkene atayıp kullanmak gibi — ama SQL içinde.",
          "en": "A CTE gives a temporary name to a complex query. Breaks multi-step calculations: find slow tests (CTE1), compare with CTE1 (CTE2). Like assigning a Java method result to a named variable — but inside SQL."
        }
      },
      {
        "type": "heading",
        "text": "CTE — Common Table Expressions (Ortak Tablo İfadeleri)",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "code",
        "code": "-- CTE: a named subquery at the top of your statement.\n-- Makes complex queries readable by breaking into named steps.\n\nWITH failed_tests AS (\n    SELECT test_name, COUNT(*) AS fail_count\n    FROM test_results\n    WHERE status = 'FAIL'\n    GROUP BY test_name\n),\nrecent_passes AS (\n    SELECT test_name, MAX(run_date) AS last_pass_date\n    FROM test_results\n    WHERE status = 'PASS'\n    GROUP BY test_name\n)\n-- Now use both CTEs together:\nSELECT f.test_name, f.fail_count, p.last_pass_date\nFROM failed_tests f\nLEFT JOIN recent_passes p ON f.test_name = p.test_name\nORDER BY f.fail_count DESC;\n\n-- Recursive CTE (for hierarchical data like org charts, nested categories):\nWITH RECURSIVE org AS (\n    SELECT id, name, manager_id, 0 AS level\n    FROM employees WHERE manager_id IS NULL          -- start: CEO\n\n    UNION ALL\n\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org o ON e.manager_id = o.id\n)\nSELECT level, name FROM org ORDER BY level;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE test_results (id INTEGER PRIMARY KEY, test_name TEXT, status TEXT, duration_ms INTEGER, environment TEXT);\nINSERT INTO test_results VALUES\n(1,'Login Test','PASS',1200,'staging'),(2,'Checkout Flow','FAIL',5400,'staging'),\n(3,'Signup Test','PASS',890,'prod'),(4,'Profile Update','FAIL',3100,'prod'),\n(5,'Search Feature','PASS',2200,'staging'),(6,'Logout Test','SKIP',0,'staging'),\n(7,'Login Test','PASS',1100,'prod'),(8,'API Health Check','FAIL',8200,'staging');",
        "defaultCode": "-- CTE: başarısız testleri adımlara ayır\nWITH failed_tests AS (\n    SELECT test_name, COUNT(*) AS fail_count\n    FROM test_results\n    WHERE status = 'FAIL'\n    GROUP BY test_name\n),\npass_times AS (\n    SELECT test_name, AVG(duration_ms) AS avg_ms\n    FROM test_results\n    WHERE status = 'PASS'\n    GROUP BY test_name\n)\nSELECT f.test_name, f.fail_count, ROUND(p.avg_ms,0) AS avg_pass_ms\nFROM failed_tests f\nLEFT JOIN pass_times p ON f.test_name = p.test_name\nORDER BY f.fail_count DESC;"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🔴",
        "title": {
          "tr": "CTE (Common Table Expressions) Yapısı",
          "en": "Common Table Expressions (CTEs)"
        },
        "content": {
          "tr": "CTE, karmaşık sorguları daha okunabilir kılmak için tanımlanan geçici, adlandırılmış sonuç kümeleridir:\n\n- **Tanımlama**: `WITH cte_adı AS (SELECT...)` sözdizimiyle sorgunun en başında tanımlanır ve ana sorguda bir tablo gibi sorgulanabilir.\n- **Avantajı**: İç içe geçmiş, okunması zor alt sorguları (subqueries) yukarıdan aşağıya sıralı adımlara bölerek kodun bakımını kolaylaştırır.\n- **Recursive CTE**: Kendi kendini referans alan alt sorgulardır. Özellikle organizasyon ağacı veya kategori hiyerarşisi gibi özyinelemeli (parent-child) verileri sorgulamak için kullanılır.",
          "en": "A CTE (Common Table Expression) is a temporary named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement:\n\n- **Definition**: Declared at the very start of a query using `WITH cte_name AS (SELECT...)`. It acts like a virtual table for the main query.\n- **Advantage**: Dramatically improves query readability and maintenance by decomposing nested, hard-to-read subqueries into clean, sequential virtual tables.\n- **Recursive CTEs**: A CTE that references itself. Essential for traversing hierarchical or tree-structured data (e.g. organizational hierarchies or product categories)."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "CTE (Common Table Expression) icin hangi keyword kullanilir?",
          "en": "Which keyword is used to define a CTE?"
        },
        "options": [
          {
            "id": "a",
            "text": "DEFINE"
          },
          {
            "id": "b",
            "text": "TEMP"
          },
          {
            "id": "c",
            "text": "WITH"
          },
          {
            "id": "d",
            "text": "CREATE TEMP"
          }
        ],
        "correct": "c",
        "explanation": {
          "tr": "CTE, WITH keyword u ile tanimlanir: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. Karmasik sorgulari adlandirilmis adimlara boler.",
          "en": "A CTE starts with WITH: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. It breaks complex queries into named steps and improves readability."
        },
        "retryQuestion": {
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
      {
        "type": "feynman-checkpoint",
        "promptTr": "CTE (Common Table Expression) yapısını, tanımlama anahtar kelimesini ve iç içe geçmiş alt sorgulara kıyasla sağladığı avantajları açıklayın.",
        "promptEn": "Explain the CTE (Common Table Expression) structure, its defining keyword, and its advantages compared to nested subqueries.",
        "keywords": [
          [
            "cte"
          ],
          [
            "with"
          ],
          [
            "readability",
            "okunabilirlik",
            "temiz"
          ],
          [
            "subquery",
            "alt",
            "sorgu"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "CTE, `WITH` anahtar kelimesiyle tanımlanan geçici, adlandırılmış bir sonuç kümesidir. Karmaşık, iç içe geçmiş okunması zor alt sorguları yukarıdan aşağıya sıralı adımlara bölerek kodun okunabilirliğini ve bakımını kolaylaştırır.",
        "modelAnswerEn": "A CTE is a temporary named result set defined using `WITH`. It enhances query readability and maintainability by breaking complex, nested subqueries into sequential, named virtual tables."
      }
    ]
  },
  {
    "title": "🔴 Transaction Yapısı",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🏦",
        "content": {
          "tr": "Transaction banka havalesi gibi. Para çıkması VE karşı hesaba girmesi ya ikisi birden olur ya da hiçbiri (ROLLBACK). ACID: Atomik, Tutarlı, İzole, Dayanıklı. Java synchronized bloğu gibi ama veritabanı seviyesinde.",
          "en": "A transaction is like a bank transfer. Money leaving AND arriving must both succeed — or neither happens (ROLLBACK). ACID: Atomic, Consistent, Isolated, Durable. Like Java synchronized block, but at database level."
        }
      },
      {
        "type": "heading",
        "text": "Transaction'lar — ACID Özellikleri",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "code",
        "code": "-- A transaction is a group of SQL statements that execute as ONE unit.\n-- Either ALL succeed (COMMIT) or ALL are undone (ROLLBACK).\n-- ACID: Atomicity, Consistency, Isolation, Durability\n\n-- Example: Transfer test case from one project to another\nSTART TRANSACTION;\n\nUPDATE test_cases SET project_id = 2 WHERE id = 42;  -- move test case\nINSERT INTO audit_log (action, test_id)              -- log the action\n       VALUES ('moved_to_project_2', 42);\n\n-- If everything looks good:\nCOMMIT;\n\n-- If any error occurs:\n-- ROLLBACK;   -- undo BOTH statements\n\n-- SAVEPOINT: partial rollback\nSTART TRANSACTION;\nINSERT INTO test_results (test_name, status) VALUES ('Test A', 'PASS');\nSAVEPOINT after_a;\nINSERT INTO test_results (test_name, status) VALUES ('Test B', 'FAIL');\nROLLBACK TO SAVEPOINT after_a;  -- undo Test B, keep Test A\nCOMMIT;                          -- commits only Test A"
      },
      {
        "type": "callout",
        "color": "yellow",
        "emoji": "🔐",
        "title": {
          "tr": "Transaction Yönetimi ve ACID Prensipleri",
          "en": "Transaction Management and ACID Properties"
        },
        "content": {
          "tr": "Transaction (İşlem), veritabanında \"ya hep ya hiç\" kuralıyla çalışan komutlar bütünüdür. ACID prensipleriyle korunur:\n\n- **Isolation (Yalıtım)**: Aynı anda çalışan işlemlerin birbirinin tamamlanmamış (commit edilmemiş) değişikliklerini görmesini engeller. Her işlem izole şekilde çalışır.\n- **ROLLBACK**: Bir transaction sırasında hata oluşursa, yapılan tüm değişiklikleri iptal edip veritabanını işlem başlamadan önceki kararlı durumuna geri döndüren komuttur.\n- **COMMIT**: Yapılan değişiklikleri kalıcı olarak veritabanına kaydeder ve kilitleri serbest bırakır.",
          "en": "A transaction is a unit of work that executes under an \"all-or-nothing\" rule, guaranteed by ACID properties:\n\n- **Isolation**: Ensures that concurrent transactions do not interfere with each other or see intermediate, uncommitted states. Each runs as if it were the only one.\n- **ROLLBACK**: Reverts all database modifications made since the transaction started, returning the database to its last committed, stable state.\n- **COMMIT**: Permanently saves all changes made during the transaction and releases active resource locks."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanı işlemlerinde ACID prensiplerinden \"Isolation\" (Yalıtım) neyi garanti eder?",
          "en": "What does the \"Isolation\" property of ACID guarantee in database transactions?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "İşlemin çökme durumunda kaybolmamasını",
              "en": "That transactions survive system crashes"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Eşzamanlı çalışan işlemlerin birbirinin tamamlanmamış değişikliklerini görmemesini",
              "en": "That concurrent transactions do not see each other's uncommitted changes"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Verilerin otomatik olarak şifrelenmesini",
              "en": "That all data is automatically encrypted"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguların daha hızlı yanıt vermesini",
              "en": "That queries return results faster"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Yalıtım (Isolation), aynı anda çalışan birden fazla transaction'ın birbirinin yarıda kalmış veya commit edilmemiş verilerini etkilemesini engeller. Her transaction kendini sistemde tek başına çalışıyormuş gibi görür.",
          "en": "Isolation ensures that concurrent execution of transactions leaves the database in the same state as if they were executed sequentially. No transaction can see uncommitted data of another."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir transaction içinde hata oluştuğunda yapılan değişiklikleri geri alıp veritabanını eski haline getiren komut hangisidir?",
            "en": "Which command is used to undo changes made in a transaction and return the database to its previous state if an error occurs?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "COMMIT",
                "en": "COMMIT"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "ROLLBACK",
                "en": "ROLLBACK"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "SAVEPOINT",
                "en": "SAVEPOINT"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "DROP TRANSACTION",
                "en": "DROP TRANSACTION"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "ROLLBACK komutu, START TRANSACTION sonrasında yapılan tüm değişiklikleri iptal ederek veritabanını işlem başlamadan önceki kararlı durumuna geri döndürür (rollback).",
            "en": "The ROLLBACK command undoes all modifications performed in the current transaction block, reverting the database state to the last committed state."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "ACID prensiplerinin veritabanı güvenliği için önemini ve test otomasyonunda veritabanını temiz tutmak için transaction rollback işlemini nasıl kullandığımızı açıklayın.",
        "promptEn": "Explain the importance of ACID properties for database safety, and how we use transaction rollback in automation tests to keep the database clean.",
        "keywords": [
          [
            "acid"
          ],
          [
            "transaction",
            "işlem"
          ],
          [
            "rollback",
            "geri",
            "al"
          ],
          [
            "isolation",
            "yalıtım"
          ],
          [
            "clean",
            "temiz"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "ACID prensipleri veri güvenilirliğini zorunlu kılar. Test otomasyonunda, testlerin veritabanını kirletmesini önlemek amacıyla test başlamadan önce transaction açarız ve test bittiğinde ROLLBACK ile tüm değişiklikleri geri alırız.",
        "modelAnswerEn": "ACID properties ensure reliable database transactions. In QA testing, starting a transaction before a test and executing a ROLLBACK afterward prevents tests from polluting the database, keeping the data clean."
      }
    ]
  },
  {
    "title": "🔴 İndeks & Görünümler",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "📚",
        "content": {
          "tr": "Index, kitabın arkasındaki dizin gibi. 500 sayfayı okumak yerine dizine bakarın: sayfa 287. VIEW karmaşık sorguya tablo gibi kısayol. Java HashMap ArrayList’e göre hızlıdır — Index aynı fikir.",
          "en": "An Index is like a book index. Instead of reading 500 pages, check the index: page 287. A VIEW is a saved shortcut that looks like a table. Java HashMap beats ArrayList for lookup — same idea."
        }
      },
      {
        "type": "heading",
        "text": "Index'ler — Sorguları Hızlandırma",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "code",
        "code": "-- Create indexes on columns used frequently in WHERE/JOIN:\nCREATE INDEX idx_results_status  ON test_results(status);\nCREATE INDEX idx_results_run_date ON test_results(run_date);\nCREATE INDEX idx_bugs_tester     ON bugs(tester_id);       -- FK columns always!\nCREATE INDEX idx_results_env_status ON test_results(environment, status);  -- composite\n\n-- Unique index (also enforces uniqueness):\nCREATE UNIQUE INDEX idx_users_email ON users(email);\n\n-- View indexes on a table:\nSHOW INDEX FROM test_results;      -- MySQL\ndi test_results                   -- PostgreSQL\n\n-- EXPLAIN: see how MySQL plans to execute a query\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- \"type: ALL\" = full table scan (slow, needs index)\n-- \"type: ref\" = using index (fast!)\n\n-- Add index and check improvement:\nCREATE INDEX idx_status ON test_results(status);\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- Now shows: key: idx_status, rows: ~10 (not all rows)"
      },
      {
        "type": "heading",
        "text": "View'lar (Görünümler)",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "code",
        "code": "-- A VIEW is a saved SQL query that acts like a virtual table.\n-- Great for: reusable complex queries, hiding complexity, security.\n\nCREATE VIEW active_failures AS\n    SELECT t.name AS tester, b.title, b.priority, p.name AS project\n    FROM bugs b\n    JOIN testers t  ON b.tester_id  = t.id\n    JOIN projects p ON b.project_id = p.id\n    WHERE b.status = 'OPEN';\n\n-- Use the view like a table:\nSELECT * FROM active_failures WHERE priority = 'HIGH';\nSELECT tester, COUNT(*) AS high_priority FROM active_failures\nGROUP BY tester;\n\n-- Drop a view:\nDROP VIEW active_failures;"
      },
      {
        "type": "editor",
        "lang": "sql",
        "schema": "CREATE TABLE testers (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE bugs (id INTEGER PRIMARY KEY, title TEXT, status TEXT, priority TEXT, tester_id INTEGER, project_id INTEGER);\nINSERT INTO testers VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');\nINSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');\nINSERT INTO bugs VALUES\n(1,'Login fails on Safari','OPEN','HIGH',1,1),\n(2,'Broken image on profile','CLOSED','LOW',1,1),\n(3,'API timeout on checkout','OPEN','HIGH',2,3),\n(4,'Wrong error message','OPEN','MEDIUM',2,2),\n(5,'Crash on empty search','OPEN','HIGH',3,1);",
        "defaultCode": "-- VIEW oluştur\nCREATE VIEW active_failures AS\n    SELECT t.name AS tester, b.title, b.priority, p.name AS project\n    FROM bugs b\n    JOIN testers t  ON b.tester_id  = t.id\n    JOIN projects p ON b.project_id = p.id\n    WHERE b.status = 'OPEN';\n\n-- View'ı tablo gibi kullan:\nSELECT * FROM active_failures WHERE priority = 'HIGH';"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "⚡",
        "title": {
          "tr": "İndeksler (Indexes) ve Görünümler (Views)",
          "en": "Indexes and Views"
        },
        "content": {
          "tr": "Veritabanı optimizasyonu ve şema yönetiminde iki önemli yapı kullanılır:\n\n- **İndeksler (Indexes)**: SELECT sorgularındaki aramaları çok hızlandırır; ancak kontrolsüz her sütuna indeks eklemek yazma (INSERT, UPDATE, DELETE) işlemlerini yavaşlatır. Çünkü her yeni veri yazıldığında arkadaki indeks ağaçlarının (B-Tree) da güncellenmesi gerekir ve ek disk alanı harcar.\n- **Görünümler (Views)**: Kaydedilmiş birer SQL sorgusudur. Diskte fiziksel olarak veri saklamayan sanal tablolardır. Bir View sorgulandığında, arka plandaki SQL sorgusu dinamik olarak çalıştırılır.",
          "en": "Database optimization and schema management rely on two key concepts:\n\n- **Indexes**: Accelerate SELECT queries by avoiding full table scans. However, blindly indexing columns degrades write performance (INSERT, UPDATE, DELETE) because the index structures (e.g. B-Trees) must be updated dynamically on every write, consuming additional disk space.\n- **Views**: A View is a virtual table representation defined by a stored SELECT query. It does not store data itself; rather, it queries the underlying base tables dynamically whenever called."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Veritabanında her sütuna kontrolsüz şekilde index (indeks) eklemenin en büyük dezavantajı nedir?",
          "en": "What is the main drawback of blindly adding indexes to every column in a database table?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "SELECT sorgularının yavaşlaması",
              "en": "SELECT queries running slower"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "INSERT, UPDATE ve DELETE (yazma) işlemlerinin yavaşlaması ve disk kullanımının ciddi oranda artması",
              "en": "Slowing down INSERT, UPDATE, and DELETE (write) operations and significantly increasing disk space usage"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablo şemasının kilitlenmesi",
              "en": "The table schema becoming locked"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "İlişkisel bütünlüğün (Foreign Key) bozulması",
              "en": "Breaking referential integrity constraints"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Indexler SELECT sorgularını hızlandırır ancak veritabanına her veri eklendiğinde, silindiğinde veya güncellendiğinde bu index yapılarının da (B-Tree) güncellenmesi gerekir. Bu yüzden aşırı index yazma performansını düşürür.",
          "en": "While indexes speed up lookups, every write (INSERT, UPDATE, DELETE) must also update the index trees. Excessive indexing creates substantial write overhead and consumes additional disk storage."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir veritabanı Görünüm (View) hakkında hangisi doğrudur?",
            "en": "Which of the following is true regarding a database View?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "View, verileri diskte fiziksel olarak saklayan bir kopyadır",
                "en": "A View is a duplicate table that physically stores data on disk"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "View, kaydedilmiş bir SQL sorgusudur; sorgulandığında dinamik olarak çalışır ve fiziksel olarak veri saklamaz",
                "en": "A View is a saved SQL query; it runs dynamically when queried and does not store physical data"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "View kullanıldığında indexler çalışmaz",
                "en": "Indexes do not work when querying a View"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "View sadece tek bir tabloyu sorgulayabilir",
                "en": "A View can only query a single table"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "View sanal bir tablodur. Kendine ait bir verisi yoktur; arka planda saklı bir SELECT sorgusunun sonucunu bir tablo gibi sunar. Her çağrıldığında o sorguyu veritabanında çalıştırır.",
            "en": "A View is a virtual table representation defined by a stored SELECT query. It does not store data itself; rather, it queries the underlying base tables dynamically whenever called."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "İndeks (Index) kullanmanın okuma (SELECT) ve yazma (INSERT/DELETE) performansına etkilerini ve View (Görünüm) yapısının veri saklama mantığını açıklayın.",
        "promptEn": "Explain the effects of using Indexes on read (SELECT) and write (INSERT/DELETE) performance, and how Views handle data storage logically.",
        "keywords": [
          [
            "index",
            "indeks"
          ],
          [
            "read",
            "write",
            "oku",
            "yaz"
          ],
          [
            "view",
            "görünüm"
          ],
          [
            "virtual",
            "sanal",
            "fiziksel"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "İndeksler arama ve SELECT işlemlerini çok hızlandırır ancak INSERT/DELETE işlemlerini yavaşlatır çünkü indeks ağaçları da güncellenmelidir. View ise diskte fiziksel veri saklamayan sanal bir tablodur; sadece arka plandaki sorguyu dinamik çalıştırır.",
        "modelAnswerEn": "Indexes speed up SELECT queries but slow down writes (INSERT/DELETE) due to index maintenance overhead. A View is a virtual table that does not physically store data; it simply executes its underlying SELECT query dynamically."
      }
    ]
  },
  {
    "title": "🔴 SQL Injection",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔒",
        "content": {
          "tr": "SQL Injection, form alanına SQL kodu yazan kötü niyetli kullanıcı. String birleştirme yapılırsa tüm şifreler döner. Çözüm: parametre kullan, string birleştirme asla. Java PreparedStatement bu yüzden var.",
          "en": "SQL Injection is a malicious user typing SQL code into a form. String concatenation exposes all passwords. Fix: always use parameterized queries, never string concatenation. Java PreparedStatement exists for this."
        }
      },
      {
        "type": "heading",
        "text": "SQL Injection & Parametreli Sorgular",
        "difficulty": "🔴 İleri"
      },
      {
        "type": "code",
        "code": "# SQL INJECTION: attacker injects SQL code through user input.\n# Classic example:\nusername = \"admin' OR '1'='1\"\n# Vulnerable query becomes:\n# WHERE username = 'admin' OR '1'='1' -- true for ALL users!\n\n# ❌ VULNERABLE (never do this in tests or apps):\nquery = f\"SELECT * FROM users WHERE username = '{username}'\"\ncursor.execute(query)\n\n# ✅ SAFE: Use parameterized queries (placeholders):\n# Python sqlite3:\ncursor.execute(\n    \"SELECT * FROM users WHERE username = ?\",\n    (username,)              # value is passed separately — SQL engine escapes it\n)\n\n# Python psycopg2 (PostgreSQL):\ncursor.execute(\n    \"SELECT * FROM users WHERE username = %s AND role = %s\",\n    (username, \"admin\")\n)\n\n# Why safe? The DB engine handles the values as DATA, never as SQL code.\n# 'admin' OR '1'='1' becomes a literal string to match, not executable SQL."
      },
      {
        "type": "visual",
        "variant": "flow",
        "title": "ACID Transaction Akışı — DB İçinde Neler Oluyor",
        "note": "ACID garantileri, test verinizin her zaman tutarlı bir durumda olduğu anlamına gelir — kısmi insert yok, işlemler arası phantom read yok.",
        "steps": [
          {
            "num": "A",
            "label": "Atomiklik",
            "desc": "Hepsi veya hiçbiri",
            "highlight": true
          },
          {
            "num": "C",
            "label": "Tutarlılık",
            "desc": "Kurallar zorlanır"
          },
          {
            "num": "I",
            "label": "İzolasyon",
            "desc": "Eş zamanlı güvenli",
            "highlight": true
          },
          {
            "num": "D",
            "label": "Dayanıklılık",
            "desc": "Çökmeden sağ kaldı"
          }
        ]
      },
      {
        "type": "visual",
        "variant": "boxes",
        "title": "Transaction Yaşam Döngüsü — Her SQL Komutu Ne Yapar",
        "items": [
          {
            "icon": "🚀",
            "label": "START TRANSACTION",
            "desc": "Atomik bloğu başlat"
          },
          {
            "arrow": true
          },
          {
            "icon": "✏️",
            "label": "INSERT / UPDATE / DELETE",
            "desc": "Birden fazla ifade"
          },
          {
            "arrow": true
          },
          {
            "icon": "✅",
            "label": "COMMIT",
            "desc": "Tüm değişiklikleri kalıcı yap",
            "highlight": true
          },
          {
            "arrow": true
          },
          {
            "icon": "↩️",
            "label": "ROLLBACK",
            "desc": "Hata varsa tümünü geri al"
          }
        ],
        "note": "COMMIT tüm değişiklikleri kalıcı kılar. ROLLBACK START TRANSACTION'a kadar her şeyi geri alır — tüm batch için Ctrl+Z gibi."
      },
      {
        "type": "simulation",
        "scenario": "sql-transaction-isolation",
        "icon": "🔒",
        "title": {
          "tr": "İnteraktif Transaction & İzolasyon Seviyeleri",
          "en": "Interactive Transaction & Isolation Levels"
        },
        "description": {
          "tr": "Aynı anda çalışan iki farklı terminal oturumunda verilerin nasıl kilitlendiğini (Exclusive Lock) ve izolasyon seviyesine göre (Read Committed vs Repeatable Read) User A'nın ne zaman güncel veriyi görebildiğini gör.",
          "en": "Watch how concurrent database sessions handle locks (Exclusive Lock) and see when User A can read committed changes depending on the transaction isolation level (Read Committed vs Repeatable Read)."
        },
        "code": "-- Session A\nBEGIN;\nSELECT balance FROM accounts WHERE id = 1;\n\n-- Session B\nBEGIN;\nUPDATE accounts SET balance = 800 WHERE id = 1;\nCOMMIT;",
        "language": "sql"
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🛡️",
        "title": {
          "tr": "SQL Injection ve Prepared Statements",
          "en": "SQL Injection and Prepared Statements"
        },
        "content": {
          "tr": "SQL Injection, kullanıcı girdilerinin sorguya doğrudan string birleştirme ile eklenmesi durumunda, saldırganın girdilere tırnak işareti koyarak kendi SQL komutlarını çalıştırması açığıdır.\n\n- **Çözüm**: Parametreli Sorgular (Prepared Statements) kullanmaktır. Bu yöntemde SQL sorgu yapısı önceden derlenir, kullanıcı girdileri ise sorguya kod olarak değil, sadece bağımsız veri (literal) olarak aktarılır. Bu sayede girdi ne içerirse içersin asla SQL kodu olarak yürütülemez.",
          "en": "SQL Injection is a critical vulnerability where user inputs are concatenated directly into SQL queries, enabling attackers to inject malicious SQL commands by manipulating quotes.\n\n- **Prevention**: Use Parameterized Queries (Prepared Statements). In this pattern, the query structure is pre-compiled by the database engine. User inputs are bound strictly as parameters (data literals), ensuring they are never executed as database code."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "SQL Injection açığını engellemenin %100 güvenli ve endüstri standardı olan yöntemi hangisidir?",
          "en": "What is the 100% secure and industry-standard method to prevent SQL Injection vulnerabilities?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Kullanıcı girdilerindeki tırnak işaretlerini Javascript ile temizlemek",
              "en": "Sanitizing single quotes in user inputs using Javascript client-side"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Parametreli sorgular (Prepared Statements) kullanmak",
              "en": "Using Parameterized Queries (Prepared Statements)"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Veritabanındaki tüm kullanıcı şifrelerini MD5 ile saklamak",
              "en": "Storing all database user passwords as MD5 hashes"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorguları sadece admin yetkisiyle çalıştırmak",
              "en": "Running all queries with administrative privileges"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Parametreli sorgular (Prepared Statements) kullanıldığında, SQL komutunun yapısı veritabanı motoru tarafından önceden derlenir. Kullanıcı girdisi sorguya bir kod olarak değil, sadece veri (literal) olarak bağlanır. Bu sayede girdi asla SQL komutu olarak yürütülemez.",
          "en": "Parameterized queries compile the query structure first. User inputs are treated strictly as parameters (data), not executable SQL commands. This completely eliminates the threat of SQL injection."
        },
        "retryQuestion": {
          "question": {
            "tr": "Aşağıdaki sorgulardan hangisi SQL Injection açığı barındırır?",
            "en": "Which of the following database query patterns is vulnerable to SQL Injection?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "String birleştirme ile yazılan: `SELECT * FROM users WHERE username = '` + input + `'`",
                "en": "String concatenation: `SELECT * FROM users WHERE username = '` + input + `'`"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Parametreli: `SELECT * FROM users WHERE username = ?`",
                "en": "Parameterized: `SELECT * FROM users WHERE username = ?`"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Stored Procedure içinde parametre kullanan sorgular",
                "en": "Stored procedures using formal parameters"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "OR operatörü içermeyen sabit sorgular",
                "en": "Static queries without any OR clauses"
              }
            }
          ],
          "correct": "a",
          "explanation": {
            "tr": "Girdileri tırnak işaretleri arasına doğrudan string birleştirme (concatenation) ile eklemek, saldırganın girdinin sonuna tırnak koyarak kendi SQL komutlarını yazabilmesine ve sorguyu manipüle etmesine olanak tanır.",
            "en": "Concatenating user input directly into the query string allows attackers to break out of the string literal (e.g. using a single quote) and append their own SQL commands."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL Injection açığının nasıl ortaya çıktığını ve parametreli sorguların (Prepared Statements) girdiyi veri olarak bağlayarak bu açığı nasıl önlediğini açıklayın.",
        "promptEn": "Explain how SQL Injection occurs and how parameterized queries (Prepared Statements) prevent it by binding input strictly as data.",
        "keywords": [
          [
            "injection",
            "enjeksiyon"
          ],
          [
            "parameter",
            "parametre"
          ],
          [
            "prepared",
            "statement"
          ],
          [
            "compile",
            "derle"
          ],
          [
            "input",
            "girdi"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "SQL Injection, kullanıcı girdilerinin SQL komutu gibi çalıştırılmasıyla oluşur. Parametreli sorgularda SQL şablonu önceden derlenir; kullanıcı girdileri ise sorguya kod olarak değil sadece veri olarak bağlanır ve açığı tamamen kapatır.",
        "modelAnswerEn": "SQL Injection happens when user inputs are concatenated into a query and executed as SQL code. Parameterized queries pre-compile the SQL template, ensuring inputs are treated strictly as bound values (data) and never compiled."
      }
    ]
  },
  {
    "title": "🧪 QA için SQL — Gerçek Test Senaryoları",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🧪",
        "content": {
          "tr": "QA olarak SQL'i iki kritik anda kullanırsın: testten önce INSERT ile veri hazırla, testten sonra SELECT ile doğrula. UI 'işlem başarılı' dese bile, veritabanında gerçekte ne kaydedildiğini SQL ile kontrol edersin.",
          "en": "As a QA engineer, SQL serves you in two key moments: INSERT test data before the test runs, SELECT to verify results after. Even if the UI says 'success', SQL tells you what was actually written to the database."
        }
      },
      {
        "type": "heading",
        "text": "Senaryo 1: Son 7 Günde Başarısız Olan Testleri Bul"
      },
      {
        "type": "code",
        "code": "-- Find failed tests from the last 7 days with details:\nSELECT\n    test_name,\n    status,\n    duration_ms,\n    environment,\n    run_date\nFROM test_results\nWHERE status = 'FAIL'\n  AND run_date >= NOW() - INTERVAL 7 DAY  -- MySQL\n-- AND run_date >= CURRENT_TIMESTAMP - INTERVAL '7 days'  -- PostgreSQL\nORDER BY run_date DESC;\n\n-- Count failures per test in last 7 days:\nSELECT test_name, COUNT(*) AS fail_count\nFROM test_results\nWHERE status = 'FAIL'\n  AND run_date >= NOW() - INTERVAL 7 DAY\nGROUP BY test_name\nORDER BY fail_count DESC;",
        "expected": "+-----------------+--------+-------------+\n| test_name       | status | duration_ms |\n+-----------------+--------+-------------+\n| Checkout Flow   | FAIL   |        5400 |\n| Search Feature  | FAIL   |        8200 |\n+-----------------+--------+-------------+"
      },
      {
        "type": "heading",
        "text": "Senaryo 2: Tekrarlanan Test Verisi Girişlerini Bul"
      },
      {
        "type": "code",
        "code": "-- Find duplicate email addresses in a users table:\nSELECT email, COUNT(*) AS count\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1\nORDER BY count DESC;\n\n-- See ALL rows that have a duplicate email:\nSELECT *\nFROM users\nWHERE email IN (\n    SELECT email FROM users\n    GROUP BY email\n    HAVING COUNT(*) > 1\n)\nORDER BY email;\n\n-- Find duplicates across multiple columns (exact duplicate records):\nSELECT test_name, environment, run_date, COUNT(*) AS count\nFROM test_results\nGROUP BY test_name, environment, run_date\nHAVING COUNT(*) > 1;"
      },
      {
        "type": "heading",
        "text": "Senaryo 3: Foreign Key İlişkilerini Doğrula (Yetim Kayıtları Bul)"
      },
      {
        "type": "code",
        "code": "-- Find orders whose user_id doesn't exist in the users table (orphaned records):\nSELECT o.id AS order_id, o.user_id, o.total\nFROM orders o\nLEFT JOIN users u ON o.user_id = u.id\nWHERE u.id IS NULL;      -- user_id exists in orders but NOT in users = orphan!\n\n-- Find test results whose test_case_id doesn't exist:\nSELECT r.id, r.test_case_id\nFROM test_results r\nLEFT JOIN test_cases tc ON r.test_case_id = tc.id\nWHERE tc.id IS NULL;\n\n-- Count valid vs orphaned records:\nSELECT\n    SUM(CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END) AS valid_orders,\n    SUM(CASE WHEN u.id IS NULL     THEN 1 ELSE 0 END) AS orphaned_orders\nFROM orders o\nLEFT JOIN users u ON o.user_id = u.id;"
      },
      {
        "type": "heading",
        "text": "Senaryo 4: Test Sonuçlarını Duruma Göre Yüzdeyle Say"
      },
      {
        "type": "code",
        "code": "-- Count and percentage per status:\nSELECT\n    status,\n    COUNT(*) AS count,\n    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage\nFROM test_results\nWHERE run_date >= NOW() - INTERVAL 7 DAY\nGROUP BY status\nORDER BY count DESC;\n\n-- MySQL alternative (no window function needed):\nSELECT\n    status,\n    COUNT(*) AS count,\n    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM test_results), 1) AS pct\nFROM test_results\nGROUP BY status\nORDER BY count DESC;",
        "expected": "+--------+-------+------------+\n| status | count | percentage |\n+--------+-------+------------+\n| PASS   |    30 |       60.0 |\n| FAIL   |    12 |       24.0 |\n| SKIP   |     8 |       16.0 |\n+--------+-------+------------+"
      },
      {
        "type": "heading",
        "text": "Senaryo 5: 30 Günden Eski Test Verilerini Temizle"
      },
      {
        "type": "code",
        "code": "-- SAFE PATTERN: ALWAYS SELECT first to verify what will be deleted!\n\n-- Step 1: see what will be deleted:\nSELECT COUNT(*), MIN(run_date), MAX(run_date)\nFROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\n  AND environment = 'staging';        -- only delete staging data, not prod!\n\n-- Step 2: if the count looks right, delete:\nDELETE FROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\n  AND environment = 'staging';\n\n-- To be extra safe, delete in batches (avoids locking the table):\nDELETE FROM test_results\nWHERE run_date < NOW() - INTERVAL 30 DAY\nLIMIT 1000;         -- delete max 1000 rows per run\n-- Repeat until 0 rows affected."
      },
      {
        "type": "heading",
        "text": "Senaryo 6: EXPLAIN — Yavaş Sorguları Bul ve Düzelt"
      },
      {
        "type": "code",
        "code": "-- 1. Identify a slow query and add EXPLAIN before it:\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';\n\n-- Look for:\n-- type: \"ALL\" = full table scan (bad — reads every row)\n-- key: NULL   = no index being used (bad)\n-- rows: high  = many rows examined\n\n-- 2. Create a composite index:\nCREATE INDEX idx_status_env ON test_results(status, environment);\n\n-- 3. Run EXPLAIN again:\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';\n-- Now see: type: \"ref\", key: idx_status_env, rows: much lower\n\n-- EXPLAIN ANALYZE (PostgreSQL — actually runs the query):\nEXPLAIN ANALYZE SELECT * FROM test_results WHERE status = 'FAIL';",
        "expected": "Before index: type=ALL, rows=50000, key=NULL\nAfter index:  type=ref, rows=120, key=idx_status_env"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "EXPLAIN çıktısında bir sorgu için `type: \"ALL\"` ve `rows: 50000` görüyorsun. Bu ne anlama gelir, ve genel çözüm nedir?",
          "en": "EXPLAIN output shows `type: \"ALL\"` and `rows: 50000` for a query. What does this mean, and what is the general fix?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Sorgu zaten optimaldir, hiçbir şey yapma",
              "en": "The query is already optimal, do nothing"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Veritabanı bir full table scan yapıyor (index kullanmıyor) — WHERE'de filtrelenen kolona index ekle",
              "en": "The database is doing a full table scan (not using an index) — add an index on the column filtered in WHERE"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tablo boş",
              "en": "The table is empty"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorgu syntax hatası içeriyor",
              "en": "The query contains a syntax error"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "`type: \"ALL\"`, veritabanının eşleşen satırları bulmak için tablonun TÜM satırlarını taradığı anlamına gelir (full table scan) — `rows: 50000` bunun ne kadar maliyetli olduğunu gösterir. WHERE koşulunda filtrelenen kolona (örn. status, environment) bir index eklemek, planı `type: \"ref\"`e çevirir ve taranan satır sayısını dramatik şekilde düşürür — Java'da bir HashMap ile O(1) erişim yerine bir ArrayList'i baştan sona taramanın (O(n)) farkı gibi.",
          "en": "`type: \"ALL\"` means the database scans EVERY row in the table to find matches (a full table scan) — `rows: 50000` shows how expensive that is. Adding an index on the column filtered in WHERE (e.g. status, environment) changes the plan to `type: \"ref\"` and dramatically reduces the rows scanned — similar to the difference between O(1) lookup with a Java HashMap versus scanning an entire ArrayList from start to end (O(n))."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir kolona index ekledikten sonra EXPLAIN hâlâ `type: \"ALL\"` gösteriyor, sorgu hâlâ yavaş. Olası bir neden nedir?",
            "en": "After adding an index on a column, EXPLAIN still shows `type: \"ALL\"` and the query is still slow. What is a likely cause?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Index'ler her zaman 24 saat sonra etkin olur",
                "en": "Indexes always take 24 hours to become active"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu o kolonu fonksiyon içinde kullanıyor olabilir (örn. UPPER(status) = 'FAIL'), bu da index kullanımını engeller",
                "en": "The WHERE clause might be wrapping that column in a function (e.g. UPPER(status) = 'FAIL'), which prevents the index from being used"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Index sadece SELECT * sorgularında çalışır",
                "en": "Indexes only work with SELECT * queries"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sorgu zaten optimaldir, EXPLAIN yanlış bilgi veriyor",
                "en": "The query is already optimal, EXPLAIN is reporting incorrectly"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Bir kolonu bir fonksiyonun içine sarmak (örn. `WHERE UPPER(status) = 'FAIL'` veya `WHERE YEAR(created_at) = 2024`) veritabanının normal index'i kullanmasını engeller, çünkü index ham kolon değerleri üzerine kuruludur, fonksiyonun sonucu üzerine değil — bu yaygın bir \"neden index'im hâlâ çalışmıyor\" tuzağıdır. Çözüm genelde sorguyu fonksiyon kullanmadan yeniden yazmak veya bir functional/expression index oluşturmaktır.",
            "en": "Wrapping a column in a function (e.g. `WHERE UPPER(status) = 'FAIL'` or `WHERE YEAR(created_at) = 2024`) prevents the database from using a normal index, because the index is built on the raw column values, not the function's result — this is a common \"why isn't my index working\" trap. The fix is usually to rewrite the query without the function, or create a functional/expression index."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "INNER JOIN ile LEFT JOIN arasındaki fark nedir? Bir QA mühendisi olarak bu farkı test senaryolarında nasıl kullanırsın? Sektöre yeni giren birine anlat.",
        "promptEn": "What is the difference between INNER JOIN and LEFT JOIN? As a QA engineer, how would you use this difference in test scenarios? Explain to a newcomer.",
        "keywords": [
          [
            "eşleşen",
            "matching",
            "inner"
          ],
          [
            "null",
            "boş"
          ],
          [
            "sol",
            "left",
            "hepsi",
            "all left"
          ],
          [
            "kayıt",
            "row",
            "satır"
          ],
          [
            "test",
            "doğrula",
            "verify"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "INNER JOIN sadece her iki tabloda da eşleşen satırları döndürür. Örneğin her böcek mutlaka bir test uzmanına atanmışsa INNER JOIN kullanırsın. LEFT JOIN ise sol tablodaki tüm satırları döndürür; sağ tabloda eşleşme yoksa NULL gelir. QA açısından: henüz hiç bug'ı olmayan test uzmanlarını bulmak için LEFT JOIN kullanırsın — çünkü INNER JOIN onları sonuçtan çıkarır.",
        "modelAnswerEn": "INNER JOIN returns only rows that match in both tables. LEFT JOIN returns ALL rows from the left table; where there is no match in the right table, NULLs are returned. As a QA engineer: use LEFT JOIN to find testers with no assigned bugs (INNER JOIN would exclude them from the result entirely — which is wrong for that use case)."
      }
    ]
  },
  {
    "title": "🔗 Ekosistem",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🔗",
        "content": "İlişkisel veritabanları dünyası geniştir. Test otomasyonunda sıklıkla SQLite, PostgreSQL ve MySQL ile karşılaşırız. Bu araçları, sürücülerini (drivers) ve ORM katmanlarını tanımak otomasyon mimarisi için hayati önem taşır."
      },
      {
        "type": "heading",
        "text": "Veritabanı Motorlarının Karşılaştırılması"
      },
      {
        "type": "table",
        "headers": [
          "Özellik / Veritabanı",
          "SQLite",
          "PostgreSQL",
          "MySQL"
        ],
        "rows": [
          [
            "Mimari",
            "Serverless (Tek dosya)",
            "İstemci-Sunucu (Proses)",
            "İstemci-Sunucu (Thread tabanlı)"
          ],
          [
            "QA Kullanım Alanı",
            "Lokal testler, mock veritabanları, mobil uygulamalar",
            "Kurumsal testler, ağır transaction işlemleri",
            "Web uygulamaları, yüksek eşzamanlılık"
          ],
          [
            "Eşzamanlılık",
            "Tek yazıcı kilidi (Single writer lock)",
            "Gelişmiş MVCC (Yüksek eşzamanlılık)",
            "Satır seviyesinde kilitleme"
          ]
        ]
      },
      {
        "type": "heading",
        "text": "Veritabanı Sürücüleri (Drivers)"
      },
      {
        "type": "text",
        "content": "Sürücüler, programlama dillerinin veritabanı motoruyla konuşmasını sağlayan çeviricilerdir. Test otomasyonunda, sorguları çalıştırmak ve test sonuçlarını almak için dile özgü kütüphaneler kullanırız."
      },
      {
        "type": "comparison",
        "title": "Veritabanı Bağlayıcıları (Connectors)",
        "left": {
          "label": "Python Bağlayıcıları",
          "code": "# SQLite (Standart kütüphane)\nimport sqlite3\nconn = sqlite3.connect(\"test.db\")\ncursor = conn.cursor()\ncursor.execute(\"SELECT name FROM users WHERE id = ?\", (1,))\nrow = cursor.fetchone()\n\n# PostgreSQL (pip install psycopg2 gerektirir)\nimport psycopg2\nconn = psycopg2.connect(\"postgresql://user:pass@host:5432/db\")\n",
          "note": "Python sqlite3 yerleşik olarak gelir. Diğer veritabanları harici paket yüklemesi gerektirir."
        },
        "right": {
          "label": "Java JDBC Bağlayıcıları",
          "code": "// SQLite Bağlantısı\nConnection conn = DriverManager.getConnection(\"jdbc:sqlite:test.db\");\n\n// PostgreSQL Bağlantısı\nConnection conn = DriverManager.getConnection(\n    \"jdbc:postgresql://host:5432/db\", \"user\", \"pass\"\n);\nPreparedStatement pstmt = conn.prepareStatement(\n    \"SELECT name FROM users WHERE id = ?\"\n);\npstmt.setInt(1, 1);\nResultSet rs = pstmt.executeQuery();\n",
          "note": "Java JDBC kullanır. Sürücülerin pom.xml/build.gradle bağımlılıklarına eklenmesi şarttır."
        }
      },
      {
        "type": "heading",
        "text": "ORM (Nesne-İlişkisel Eşleme)"
      },
      {
        "type": "text",
        "content": "ORM araçları veritabanı tablolarını nesneye yönelik programlama sınıflarına eşler. Uygulama geliştirme için harika olsalar da, QA test otomasyonunda doğrudan ham SQL sorguları atmak; karmaşık ORM modelleri kurup sürdürmekten daha hızlı, esnek ve az zahmetlidir."
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "🔌",
        "title": {
          "tr": "Veritabanı Ekosistemi: Motorlar, Sürücüler ve ORM",
          "en": "Database Ecosystem: Engines, Drivers, and ORMs"
        },
        "content": {
          "tr": "Veritabanı mimarisinde katmanlar arası iletişim şu bileşenlerle sağlanır:\n\n- **Veritabanı Motoru (Engine)**: Veriyi yöneten sunucudur (örn: PostgreSQL, MySQL).\n- **Sürücü (Driver)**: Programlama dilinin veritabanına bağlanmasını sağlayan kütüphanedir. Python sqlite3 sürücüsü yerleşik gelirken, PostgreSQL için `psycopg2`, Java için ise Maven/Gradle ile JDBC sürücüsü eklenmelidir.\n- **ORM (Object-Relational Mapping)**: Tabloları kod nesnelerine eşler. QA otomasyon testlerinde (test verisi ekleme/temizleme vb.) ORM modellerinin kurulumu karmaşık olduğundan, ham SQL kullanımı daha basit ve hızlıdır.",
          "en": "Database architectures rely on structured communication layers:\n\n- **Database Engine**: The server system managing physical data and execution (e.g., PostgreSQL, MySQL).\n- **Driver**: The connector library bridging your programming language and the engine. Python's sqlite3 driver is built-in, whereas PostgreSQL needs `psycopg2` and Java requires a database-specific JDBC dependency.\n- **ORM**: Maps rows directly to code objects. While great for backend development, QA automation scripts generally prefer raw SQL for seeding and cleaning test data due to lower setup complexity and execution speed."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Bir veritabanı motoru (Database Engine) ile veritabanı sürücüsü (Database Driver) arasındaki fark nedir?",
          "en": "What is the difference between a Database Engine and a Database Driver?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Sürücü verileri diskte saklar, motor ise sorguları analiz eder",
              "en": "The driver stores data on disk, while the engine parses queries"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Motor veritabanının kendisidir (PostgreSQL, MySQL); sürücü ise test scriptimizin (Python/Java) motorla konuşmasını sağlayan kütüphanedir (psycopg2, JDBC)",
              "en": "The engine is the database server itself (PostgreSQL, MySQL); the driver is the library (psycopg2, JDBC) that lets our test script talk to the server"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sürücü sadece SQL yazmak için kullanılır",
              "en": "The driver is only used for writing SQL"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Motor sadece bulutta çalışır",
              "en": "The engine only runs in the cloud"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Veritabanı motoru (Server) sorguları çalıştırır ve veriyi yönetir. Sürücü (Driver) ise programlama dilinin veritabanına bağlanıp komut göndermesi için kullandığı çevirici/köprüdür.",
          "en": "The engine is the actual database system (PostgreSQL/MySQL server) storing and processing data. The driver is the language-specific library (like Python's psycopg2 or Java's JDBC connector) facilitating communication between application code and the engine."
        },
        "retryQuestion": {
          "question": {
            "tr": "Test otomasyonunda ORM (Object-Relational Mapping) araçlarını (örn: SQLAlchemy, Hibernate) kullanmanın doğrudan SQL yazmaya göre temel dezavantajı nedir?",
            "en": "What is the main disadvantage of using ORM frameworks (e.g. SQLAlchemy, Hibernate) in QA automation compared to raw SQL queries?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "ORM'lerin veritabanına bağlanamaması",
                "en": "ORMs being unable to connect to the database"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Karmaşık nesne-ilişki eşlemeleri (mapping) gerektirmeleri, daha yavaş çalışmaları ve test verisi seed/cleanup işlemlerinde ham SQL kadar pratik olmamaları",
                "en": "They require complex mapping configurations, add execution overhead, and are less direct for quick test data seeding/cleanup than raw SQL"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sadece Java dillerinde çalışmaları",
                "en": "Only working in Java languages"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "İndexleri tamamen devre dışı bırakmaları",
                "en": "Disabling indexes completely"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "ORM araçları uygulama geliştirme için harikadır ancak test otomasyonunda hız, sadelik ve esneklik ön plandadır. Ham SQL sorguları atmak, karmaşık ORM modelleri kurup sürdürmekten çok daha pratiktir.",
            "en": "ORMs add configuration complexity and object lifecycle overhead. For QA scripts, which mostly perform straightforward data seeding, assertions, and cleanup, direct SQL execution is much simpler and faster."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Veritabanı motoru (Engine), veritabanı sürücüsü (Driver) ve ORM (Object-Relational Mapping) kavramlarını ve bunların otomasyon test mimarisindeki rollerini açıklayın.",
        "promptEn": "Explain the concepts of a database Engine, Driver, and ORM, and their roles in test automation architecture.",
        "keywords": [
          [
            "engine",
            "motor"
          ],
          [
            "driver",
            "sürücü"
          ],
          [
            "orm"
          ],
          [
            "connect",
            "bağlan"
          ],
          [
            "mapping",
            "eşle"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Veritabanı motoru (örn. PostgreSQL) veriyi yönetir. Sürücü (driver, örn. psycopg2), test kodumuzun motorla konuşmasını sağlayan kütüphanedir. ORM ise tabloları nesnelere eşler; ancak testlerde genelde ham SQL daha pratik ve hızlıdır.",
        "modelAnswerEn": "The engine (e.g. PostgreSQL) manages data. The driver (e.g. psycopg2) is the connector library allowing test scripts to talk to the engine. An ORM maps tables to code objects; though raw SQL is often preferred in testing for speed and simplicity."
      }
    ]
  },
  {
    "title": "🚨 Yaygın Hatalar",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🚨",
        "content": "Veritabanı işlemleri sırasında constraint (kısıtlamalar) veya kilitlenme (lock) sorunları nedeniyle sık sık hatalarla karşılaşırız. Bir QA mühendisi için hata mesajını okuyup kök nedeni bulmak en kritik becerilerden biridir."
      },
      {
        "type": "heading",
        "text": "SQL Hata Sözlüğü"
      },
      {
        "type": "error-dictionary",
        "framework": "SQL",
        "errors": [
          {
            "error": "UNIQUE constraint failed: table.column",
            "fullMessage": "UNIQUE constraint failed: users.email",
            "cause": {
              "tr": "Aynı email/id gibi eşsiz (UNIQUE) kısıtlama olan bir sütuna tekrar eden değer eklemeye çalışıyorsunuz. PRIMARY KEY ihlali de aynı hatayı verir.",
              "en": "You are inserting a duplicate value into a column with a UNIQUE constraint (e.g., email, username). A PRIMARY KEY violation produces the same error."
            },
            "solution": {
              "tr": "1) INSERT IGNORE (MySQL) veya INSERT OR IGNORE (SQLite) kullanın. 2) ON CONFLICT DO NOTHING / DO UPDATE ekleyin. 3) INSERT öncesinde SELECT ile kontrol edin.",
              "en": "1) Use INSERT IGNORE (MySQL) or INSERT OR IGNORE (SQLite). 2) Add ON CONFLICT DO NOTHING / DO UPDATE. 3) Check with SELECT before INSERT."
            },
            "codeWrong": "-- YANLIŞ — tekrar eden email ekliyor\nINSERT INTO users (id, email) VALUES (1, 'a@test.com');\nINSERT INTO users (id, email) VALUES (2, 'a@test.com'); -- HATA",
            "codeFixed": "-- DOĞRU — çakışmada güncelle (upsert)\nINSERT INTO users (id, email)\nVALUES (2, 'a@test.com')\nON CONFLICT(email) DO UPDATE SET id = excluded.id;\n\n-- veya sadece yok say:\nINSERT OR IGNORE INTO users (id, email) VALUES (2, 'a@test.com');"
          },
          {
            "error": "FOREIGN KEY constraint failed",
            "fullMessage": "FOREIGN KEY constraint failed",
            "cause": {
              "tr": "Parent tabloda olmayan bir değere referans veren kayıt eklemeye çalışıyorsunuz. Örneğin: var olmayan bir user_id ile order eklemek.",
              "en": "You are trying to insert a row that references a value that does not exist in the parent table. E.g., adding an order with a non-existent user_id."
            },
            "solution": {
              "tr": "1) Önce parent kaydı ekleyin. 2) PRAGMA foreign_keys = ON ile FK denetimini etkinleştirin (SQLite'de varsayılan kapalı). 3) INSERT sırasını parent → child olarak düzenleyin.",
              "en": "1) Insert the parent record first. 2) Enable FK checking: PRAGMA foreign_keys = ON (SQLite defaults to OFF). 3) Order INSERTs parent → child."
            },
            "codeWrong": "-- YANLIŞ — users tablosunda id=999 yok\nINSERT INTO orders (id, user_id) VALUES (1, 999); -- HATA",
            "codeFixed": "-- DOĞRU — önce parent'ı ekle\nINSERT INTO users (id, name) VALUES (999, 'Alice');\nINSERT INTO orders (id, user_id) VALUES (1, 999); -- OK\n\n-- SQLite'de FK denetimini etkinleştir:\nPRAGMA foreign_keys = ON;"
          },
          {
            "error": "NOT NULL constraint failed: table.column",
            "fullMessage": "NOT NULL constraint failed: employees.email",
            "cause": {
              "tr": "NOT NULL kısıtlamalı bir sütuna NULL değer eklemeye ya da bu sütunu INSERT sorgusunda atlamaya çalışıyorsunuz.",
              "en": "You are inserting NULL into a column with a NOT NULL constraint, or omitting a column that has no DEFAULT and is NOT NULL."
            },
            "solution": {
              "tr": "1) Sütun için değer sağlayın. 2) Sütuna DEFAULT değeri tanımlayın. 3) Şemayı gözden geçirin: o sütun gerçekten zorunlu mu?",
              "en": "1) Provide a value for the column. 2) Add a DEFAULT to the column definition. 3) Review the schema — does that column really need to be required?"
            },
            "codeWrong": "-- YANLIŞ — email NOT NULL ama değer verilmedi\nINSERT INTO employees (id, name) VALUES (1, 'Bob'); -- HATA",
            "codeFixed": "-- DOĞRU — tüm NOT NULL sütunlara değer ver\nINSERT INTO employees (id, name, email)\nVALUES (1, 'Bob', 'bob@company.com');\n\n-- veya default ekle:\n-- email TEXT NOT NULL DEFAULT 'unknown@company.com'"
          },
          {
            "error": "syntax error near '...'",
            "fullMessage": "near \"FORM\": syntax error",
            "cause": {
              "tr": "SQL yazım hatası: yanlış yazılmış keyword (FROM yerine FORM), virgül eksikliği, fazladan parantez veya rezerve kelime kullanımı.",
              "en": "SQL syntax mistake: misspelled keyword (FORM instead of FROM), missing comma, extra parenthesis, or using a reserved word as a column/table name."
            },
            "solution": {
              "tr": "1) Keyword yazımını kontrol edin. 2) SELECT listesinde virgülleri kontrol edin. 3) Rezerve kelimeler tablo/sütun adı olarak kullanılıyorsa backtick veya çift tırnak ile sarın.",
              "en": "1) Check keyword spelling. 2) Check commas in the SELECT list. 3) If using reserved words as identifiers, wrap them in backticks or double quotes."
            },
            "codeWrong": "-- YANLIŞ — FROM yerine FORM yazılmış\nSELECT name FORM users WHERE id = 1; -- syntax error",
            "codeFixed": "-- DOĞRU — keyword doğru yazılmış\nSELECT name FROM users WHERE id = 1;\n\n-- Rezerve kelime kullanımı:\nSELECT `order`, `select` FROM my_table;  -- backtick ile sarılmış"
          },
          {
            "error": "no such table: table_name",
            "fullMessage": "no such table: test_results",
            "cause": {
              "tr": "Sorgu var olmayan bir tabloyu referans alıyor. Tablo henüz oluşturulmamış, yanlış yazılmış veya farklı bir veritabanı bağlantısında oluşturulmuş olabilir.",
              "en": "The query references a table that does not exist. The table may not have been created, misspelled, or created in a different database connection."
            },
            "solution": {
              "tr": "1) CREATE TABLE ile tabloyu oluşturun. 2) Tablo adının yazımını kontrol edin. 3) Doğru veritabanına bağlandığınızı doğrulayın. SQLite'de: SELECT name FROM sqlite_master WHERE type='table';",
              "en": "1) Create the table with CREATE TABLE. 2) Check the table name spelling. 3) Verify you are connected to the correct database. In SQLite: SELECT name FROM sqlite_master WHERE type='table';"
            },
            "codeWrong": "-- YANLIŞ — tablo henüz oluşturulmamış\nSELECT * FROM test_results; -- no such table",
            "codeFixed": "-- DOĞRU — önce tabloyu oluştur\nCREATE TABLE IF NOT EXISTS test_results (\n  id      INTEGER PRIMARY KEY,\n  name    TEXT NOT NULL,\n  status  TEXT NOT NULL,\n  run_at  TEXT\n);\nSELECT * FROM test_results;"
          },
          {
            "error": "ambiguous column name: column",
            "fullMessage": "ambiguous column name: id",
            "cause": {
              "tr": "JOIN sorgusunda aynı sütun adı birden fazla tabloda bulunuyor ve hangi tablodan geldiği belirtilmemiş.",
              "en": "In a JOIN query, the same column name exists in multiple joined tables and it is not specified which table the column comes from."
            },
            "solution": {
              "tr": "Tablo adı veya alias ile tam nitelendirme (qualification) kullanın: users.id veya u.id gibi.",
              "en": "Use full qualification with table name or alias: users.id or u.id."
            },
            "codeWrong": "-- YANLIŞ — her iki tabloda da \"id\" var\nSELECT id, name FROM users JOIN orders ON users.id = orders.user_id;\n-- ambiguous column name: id",
            "codeFixed": "-- DOĞRU — tablo adıyla nitelendir\nSELECT users.id, users.name, orders.id AS order_id\nFROM users\nJOIN orders ON users.id = orders.user_id;\n\n-- veya alias kullan:\nSELECT u.id, u.name, o.id AS order_id\nFROM users u\nJOIN orders o ON u.id = o.user_id;"
          },
          {
            "error": "table has N columns but M values were supplied",
            "fullMessage": "table users has 4 columns but 3 values were supplied",
            "cause": {
              "tr": "INSERT sorgusunda sütun listesi ile VALUES listesindeki eleman sayısı eşleşmiyor.",
              "en": "The number of columns listed in the INSERT does not match the number of values supplied in VALUES."
            },
            "solution": {
              "tr": "INSERT'te sütun listesini açıkça belirtin ve VALUES ile sayısının eşleştiğinden emin olun.",
              "en": "Explicitly list the column names in INSERT and ensure VALUES count matches."
            },
            "codeWrong": "-- YANLIŞ — 4 sütun var ama 3 değer veriliyor\n-- Tablo: users (id, name, email, role)\nINSERT INTO users VALUES (1, 'Alice', 'alice@test.com'); -- HATA",
            "codeFixed": "-- DOĞRU — sütun isimlerini açıkça belirt\nINSERT INTO users (id, name, email)\nVALUES (1, 'Alice', 'alice@test.com');\n-- role sütunu NULL alır (ya da DEFAULT değeri)"
          },
          {
            "error": "Lock wait timeout exceeded; try restarting transaction",
            "fullMessage": "ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction",
            "cause": {
              "tr": "Başka bir transaction aynı satırı/tabloyu kilitlemiş ve sizin sorgunuz bu kilidin açılmasını beklerken zaman aşımına uğramış.",
              "en": "Another active transaction holds a lock (usually an Exclusive lock from UPDATE/DELETE) on the target row/table, and your current query timed out waiting for it to release."
            },
            "solution": {
              "tr": "1) Uzun süren veya açık bırakılmış transaction'ları bulun ve sonlandırın (COMMIT/ROLLBACK). 2) Otomasyon testlerinde bağlantıları kapatıp açarak havuzları temizleyin. 3) Kilit zaman aşımı süresini artırın.",
              "en": "1) Find and terminate long-running or uncommitted transactions (run COMMIT or ROLLBACK). 2) Ensure automation tests close connections properly to clear pools. 3) Increase the lock timeout threshold if necessary."
            },
            "codeWrong": "-- YANLIŞ — Açık bırakılan kilitli transaction (COMMIT edilmemiş)\nSTART TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- Test yarıda kesildi veya bağlantı açık kaldı (COMMIT/ROLLBACK yok)\n\n-- Eşzamanlı başka sorgu bekler ve hata verir:\nUPDATE users SET status = 'DONE' WHERE id = 1; -- HATA: Lock wait timeout",
            "codeFixed": "-- DOĞRU — Transaction'ı her zaman güvenli şekilde bitirin\nSTART TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\nCOMMIT; -- Kilidi kaldır\n\n-- Eşzamanlı sorgu artık anında çalışır:\nUPDATE users SET status = 'DONE' WHERE id = 1; -- OK"
          }
        ]
      },
      {
        "type": "callout",
        "color": "red",
        "emoji": "🚨",
        "title": {
          "tr": "Veritabanı Hatalarını Giderme (Troubleshooting)",
          "en": "Database Troubleshooting and Constraints"
        },
        "content": {
          "tr": "Otomasyon testleri sırasında karşılaşılan yaygın veritabanı hataları şunlardır:\n\n- **Lock Wait Timeout Exceeded**: Eşzamanlı iki işlem aynı satırı güncellemeye çalıştığında oluşur. Bir test açık transaction bırakırsa (COMMIT/ROLLBACK unutulursa) sonraki test satır kilidi (row lock) nedeniyle bekler ve zaman aşımına uğrar.\n- **FOREIGN KEY Constraint Failed**: İlişkili tablolarda parent tabloda var olmayan bir kimlik (id) değeriyle child tabloya veri eklenmeye çalışıldığında ortaya çıkar. Sıralı ekleme yapılmalıdır.",
          "en": "QA engineers frequently encounter these common constraint and lock errors in automated pipelines:\n\n- **Lock Wait Timeout Exceeded**: Occurs when concurrent processes attempt to modify the same rows. If a previous test leaves a transaction open (fails to run COMMIT/ROLLBACK), subsequent tests will hang waiting for row locks and eventually time out.\n- **FOREIGN KEY Constraint Failed**: Triggered when attempting to write a child record referencing an ID that does not exist in the parent table. Fix by creating the parent record first."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Otomasyon testleri çalışırken \"Lock wait timeout exceeded; try restarting transaction\" hatası aldığınızda ilk bakmanız gereken durum nedir?",
          "en": "When your automation tests throw \"Lock wait timeout exceeded; try restarting transaction\", what is the first thing you should investigate?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Veritabanında yeterli disk alanı olup olmadığı",
              "en": "Whether there is enough disk space on the database server"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Başka bir test veya işlemin aynı satırları kilitlediği (veya açık bir transaction bıraktığı) ve bizim testimizin kilidin açılmasını beklerken zaman aşımına uğradığı",
              "en": "Whether another test or process is locking the same rows (or left an open transaction), causing our test to time out waiting for the lock"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "SQL syntax yazım hatası olup olmadığı",
              "en": "Whether there is a SQL syntax error in the query"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Bağlantı dizesinin (connection string) yanlış yazılması",
              "en": "Whether the connection string has a typo"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Veritabanları eşzamanlı yazma isteklerini kuyruğa sokmak için satır kilitleri (row locks) kullanır. Bir transaction açık kalırsa veya kilit açılmazsa, diğer sorgular bekler ve sonunda Lock wait timeout hatası fırlatır.",
          "en": "This error indicates lock contention. Another active transaction holds a lock (usually Exclusive lock from UPDATE/DELETE) on the target row/table, and your current query timed out waiting for it to release."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir test otomasyon pipeline'ında \"FOREIGN KEY constraint failed\" hatası görüyorsanız, sorun ne olabilir?",
            "en": "If you see \"FOREIGN KEY constraint failed\" in your test automation pipeline, what is the likely cause?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Tablonun silinmiş olması",
                "en": "The table being dropped"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "İlişkili (parent) tabloda karşılığı olmayan bir id ile child tabloya veri eklemeye çalışılması",
                "en": "Trying to insert a record in a child table with a foreign key ID that does not exist in the parent table"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Verinin UNIQUE kısıtlamasını ihlal etmesi",
                "en": "The data violating a UNIQUE constraint"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Sorgunun SELECT * ile çekilmesi",
                "en": "The query performing a SELECT *"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Yabancı Anahtar (FOREIGN KEY) kısıtlaması referans bütünlüğünü korur. Parent tabloda id=5 yoksa, child tabloya (siparişler vb.) user_id=5 ile kayıt eklenemez, veritabanı motoru bunu engeller.",
            "en": "Referential integrity constraint prevents adding records in a child table if the referenced parent record is missing. For example, creating an order for a user_id that does not exist in the users table."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Otomasyon testleri sırasında karşılaşılan \"UNIQUE constraint failed\" ve \"FOREIGN KEY constraint failed\" kısıtlama hatalarının nedenlerini ve çözüm yollarını açıklayın.",
        "promptEn": "Explain the causes and resolutions for \"UNIQUE constraint failed\" and \"FOREIGN KEY constraint failed\" constraint errors encountered during automation tests.",
        "keywords": [
          [
            "unique",
            "benzersiz"
          ],
          [
            "foreign",
            "key",
            "yabancı"
          ],
          [
            "constraint",
            "kısıt"
          ],
          [
            "parent",
            "child",
            "ilişki"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "UNIQUE hatası, eşsiz olması gereken bir sütuna tekrarlanan veri eklenirse alınır. Çözümü veriyi değiştirmek veya ON CONFLICT eklemektir. FOREIGN KEY hatası, parent tabloda karşılığı olmayan bir id ile child tabloya kayıt eklenmeye çalışıldığında alınır; sırayla eklenmelidir.",
        "modelAnswerEn": "UNIQUE errors occur when inserting duplicate values in a unique column (fix by checking data or using ON CONFLICT). FOREIGN KEY errors happen when inserting a child record referencing a non-existent parent key (fix by inserting parent first)."
      }
    ]
  },
  {
    "title": "☕ Java → SQL",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "☕",
        "content": "Bu bölüm, Java (JDBC) ve SQL arasındaki veritabanı bağlantısı, sorgu çalıştırma ve transaction yönetimi konularını bir araya getirir. Java ile Selenium/RestAssured testleri yazan QA mühendisleri için temel bir başvuru kılavuzudur."
      },
      {
        "type": "heading",
        "text": "☕ Java Biliyorsan: Veritabanı Bağlantısı Köprüsü"
      },
      {
        "type": "java-compare",
        "topic": "DB Bağlantısı Kurma (DriverManager vs sqlite3)",
        "why": "Java'da JDBC kullanırsın — pom.xml'e sürücü ekler, DriverManager.getConnection() çağırırsın. Python'da sqlite3 yerleşik (sıfır kurulum!) ve PostgreSQL için psycopg2 var. Kalıp aynı: bağlantı aç → kullan → kapat.",
        "why_en": "Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.",
        "java": "// Java: JDBC connection via DriverManager\nimport java.sql.*;\n\n// Open connection (MySQL example):\nConnection conn = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/testdb\",\n    \"root\", \"password\"\n);\nStatement stmt = conn.createStatement();\nResultSet rs   = stmt.executeQuery(\"SELECT * FROM users\");\n\n// ALWAYS close — use try-with-resources:\ntry (Connection c = DriverManager.getConnection(url, user, pass)) {\n    Statement s = c.createStatement();\n    ResultSet r = s.executeQuery(\"SELECT COUNT(*) FROM users\");\n}   // auto-closed here",
        "python": "# Python: sqlite3 — BUILT-IN, zero install!\nimport sqlite3\n\nconn = sqlite3.connect(\"test.db\")  # creates file if not exists\ncursor = conn.cursor()\ncursor.execute(\"SELECT * FROM users\")\nrows = cursor.fetchall()           # list of tuples\nconn.close()\n\n# Context manager = try-with-resources:\nwith sqlite3.connect(\"test.db\") as conn:\n    cursor = conn.cursor()\n    cursor.execute(\"SELECT COUNT(*) FROM users\")\n    count = cursor.fetchone()[0]\n# conn auto-closed after with block\n\n# PostgreSQL (pip install psycopg2-binary):\nimport psycopg2\nconn = psycopg2.connect(\n    host=\"localhost\", dbname=\"testdb\",\n    user=\"postgres\", password=\"secret\"\n)",
        "note": "sqlite3 Python standart kütüphanesinde — Maven yok, pip yok, pom.xml yok! Sadece import et ve kullan. pip install psycopg2-binary tek bir Maven bağımlılığı eklemeye eşdeğer.",
        "note_en": "sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency."
      },
      {
        "type": "java-compare",
        "topic": "Bağımlılık Kurulumu (Maven pom.xml vs pip)",
        "why": "Java'da JDBC sürücü bağımlılıklarını pom.xml'de bildirirsin, Maven indirir. Python'da pip install sürücüyü indirir. SQLite için hiçbir şey gerekmez — Python ile birlikte gelir.",
        "why_en": "In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.",
        "java": "<!-- Java: pom.xml — add JDBC driver dependency -->\n<dependencies>\n\n  <!-- MySQL -->\n  <dependency>\n    <groupId>mysql</groupId>\n    <artifactId>mysql-connector-java</artifactId>\n    <version>8.0.33</version>\n  </dependency>\n\n  <!-- PostgreSQL -->\n  <dependency>\n    <groupId>org.postgresql</groupId>\n    <artifactId>postgresql</artifactId>\n    <version>42.6.0</version>\n  </dependency>\n\n</dependencies>\n<!-- then: mvn install -->",
        "python": "# Python: pip — no config file needed at all!\n\n# SQLite: NOTHING — built in to Python!\nimport sqlite3           # works with zero setup\n\n# MySQL:\n# pip install mysql-connector-python\nimport mysql.connector\n\n# PostgreSQL:\n# pip install psycopg2-binary\nimport psycopg2\n\n# requirements.txt (optional, like pom.xml):\n# psycopg2-binary==2.9.9\n# mysql-connector-python==8.2.0",
        "note": "Python SQLite için en hızlı başlangıcı sağlar. Gerçek proje bağımlılıkları için requirements.txt kullan (pom.xml ile aynı fikir). pip install -r requirements.txt her şeyi kurar.",
        "note_en": "Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything."
      },
      {
        "type": "heading",
        "text": "☕ Java Biliyorsan: Veritabanı Erişim Köprüsü"
      },
      {
        "type": "java-compare",
        "topic": "DB Bağlantısı (DriverManager vs sqlite3)",
        "why": "Java, JDBC DriverManager ile URL + kimlik bilgileriyle bağlanır. Python, hafif sürücü modülleri kullanır (sqlite3 yerleşik, PostgreSQL için psycopg2). Bağlantı mantığı aynı — API farklı.",
        "java": "// Java: JDBC connection\nimport java.sql.*;\nConnection conn = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/mydb\",\n    \"username\", \"password\"\n);\n// Always close — use try-with-resources:\ntry (Connection c = DriverManager.getConnection(url, user, pass)) {\n    // use c here — auto-closed\n}",
        "python": "# Python: sqlite3 (built-in, zero install!)\nimport sqlite3\nconn = sqlite3.connect(\"mydb.sqlite\")\n\n# PostgreSQL:\nimport psycopg2\nconn = psycopg2.connect(\n    host=\"localhost\", dbname=\"mydb\",\n    user=\"username\", password=\"password\"\n)\n\n# Context manager — auto-closes like try-with-resources:\nwith sqlite3.connect(\"mydb.sqlite\") as conn:\n    cursor = conn.cursor()",
        "note": "Python sqlite3, Python'a yerleşik gelir — pip kurulumu gerekmez. MySQL: mysql-connector-python; PostgreSQL: psycopg2."
      },
      {
        "type": "java-compare",
        "topic": "SELECT Çalıştırma → Sonuçları Okuma",
        "why": "Java, rs.next() döngüsü ve sütun adıyla getter metodlar içeren ResultSet kullanır. Python'un cursor.fetchall() metodu basit bir demet listesi döndürür — çok daha az kod.",
        "java": "// Java: Statement + ResultSet\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery(\n    \"SELECT test_name, status FROM test_results WHERE status='FAIL'\"\n);\nwhile (rs.next()) {\n    String name = rs.getString(\"test_name\");\n    String status = rs.getString(\"status\");\n    System.out.println(name + \" → \" + status);\n}\nrs.close(); stmt.close();",
        "python": "# Python: cursor + fetchall\ncursor = conn.cursor()\ncursor.execute(\n    \"SELECT test_name, status FROM test_results WHERE status='FAIL'\"\n)\nrows = cursor.fetchall()  # list of tuples\nfor name, status in rows:\n    print(f\"{name} → {status}\")\n\n# Single row — like rs.next() once:\ncursor.execute(\"SELECT COUNT(*) FROM test_results\")\ncount = cursor.fetchone()[0]",
        "note": "cursor.fetchall() tüm satırları demet listesi olarak döndürür. cursor.fetchone() bir satır ya da None döndürür — rs.next() bir kez çağırmaya eşdeğer."
      },
      {
        "type": "heading",
        "text": "☕ Java Biliyorsan: DML Operasyonları Köprüsü"
      },
      {
        "type": "java-compare",
        "topic": "INSERT → JPA persist() vs SQL INSERT INTO",
        "why": "Java kurumsal projelerinde büyük ihtimalle JPA/Hibernate (EntityManager.persist) ile nesne ekliyordunuz. SQL'de INSERT INTO doğrudan yazılır. İkisi de aynı SQL'i üretir — JPA sadece bunu sizin yerinize oluşturur.",
        "why_en": "In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.",
        "java": "// Java: JPA EntityManager\n@Entity\n@Table(name = \"test_results\")\npublic class TestResult {\n    @Id @GeneratedValue(strategy = IDENTITY)\n    private Long id;\n    private String testName;\n    private String status;\n}\n\n// Insert: no SQL needed — JPA generates it\nEntityManager em = emf.createEntityManager();\nem.getTransaction().begin();\nTestResult r = new TestResult();\nr.setTestName(\"Login Test\");\nr.setStatus(\"PASS\");\nem.persist(r);          // ← generates: INSERT INTO test_results ...\nem.getTransaction().commit();",
        "sql": "-- Direct SQL: you write it yourself\nINSERT INTO test_results (test_name, status, duration_ms)\nVALUES ('Login Test', 'PASS', 1234);\n\n-- Multiple rows at once (JPA needs a loop or batch):\nINSERT INTO test_results (test_name, status, duration_ms) VALUES\n    ('Signup Test',   'PASS', 890),\n    ('Checkout Flow', 'FAIL', 5400);\n\n-- Copy rows (JPA: query + persist loop):\nINSERT INTO test_archive\nSELECT * FROM test_results WHERE run_date < '2024-01-01';",
        "note": "SQL INSERT açık ve güçlüdür — toplu insert'ler ve INSERT-SELECT'in JPA'da custom query olmadan karşılığı yoktur. Test otomasyonunda hız ve sadelik için doğrudan SQL tercih edilir.",
        "note_en": "SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity."
      },
      {
        "type": "java-compare",
        "topic": "UPDATE/DELETE → JPA merge()/remove() vs SQL",
        "why": "JPA, UPDATE ve DELETE'i entity durum değişiklikleri üzerinden soyutlar. SQL doğrudan kontrol sağlar — WHERE ile tam olarak istediğiniz satırları güncelleyin/silin.",
        "why_en": "JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.",
        "java": "// Java: JPA update — find then mutate\nEntityManager em = ...;\nem.getTransaction().begin();\n\nTestResult r = em.find(TestResult.class, 3L);  // SELECT first\nr.setStatus(\"PASS\");         // mark as mutated\nem.merge(r);                 // generates: UPDATE test_results SET status='PASS' WHERE id=3\n\n// JPA delete:\nTestResult toDelete = em.find(TestResult.class, 3L);\nem.remove(toDelete);         // generates: DELETE FROM test_results WHERE id=3\n\nem.getTransaction().commit();",
        "sql": "-- SQL UPDATE: direct, no find() needed\nUPDATE test_results\nSET    status = 'PASS'\nWHERE  id = 3;\n\n-- Update multiple rows at once (JPA needs a loop):\nUPDATE test_results\nSET    is_flaky = TRUE\nWHERE  test_name LIKE '%Search%';\n\n-- SQL DELETE: also direct\nDELETE FROM test_results WHERE status = 'SKIP';\n\n-- Safe pattern: SELECT first to verify, then DELETE\nSELECT * FROM test_results WHERE environment = 'cleanup';\nDELETE FROM test_results WHERE environment = 'cleanup';",
        "note": "SQL UPDATE ve DELETE, WHERE ile tek sorguda çok sayıda satırı etkileyebilir. JPA her satır için ayrı entity yükleme gerektirir. Test otomasyonunda temizleme için doğrudan SQL daha hızlı ve yaygındır.",
        "note_en": "SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common."
      },
      {
        "type": "heading",
        "text": "☕ If You Know Java: PreparedStatement & Transactions",
        "topic": "PreparedStatement → Parametreli Sorgu",
        "why": "SQL Injection önleme! Java, PreparedStatement ile ? yer tutucuları kullanır. Python aynı konsepti uygular — %s (MySQL/PostgreSQL) veya ? (SQLite). Kullanıcı girdilerini asla SQL string'ine birleştirmeyin!",
        "note": "Python psycopg2/MySQL %s kullanır. SQLite ? kullanır (Java gibi!). SQL değerleri için asla f-string veya + birleştirme kullanmayın — her zaman parametreli sorgu kullanın."
      },
      {
        "type": "java-compare",
        "topic": "Transaction Yönetimi (commit / rollback)",
        "why": "Transaction'lar, hepsini-ya-da-hiçbirini değişiklikleri garanti eder — test verisi kurulumu için kritik. Java setAutoCommit(false) çağırır. Python sürücülerinde otomatik commit varsayılan olarak kapalıdır; siz commit() çağırırsınız.",
        "java": "// Java: PreparedStatement — SQL injection safe!\nString sql = \"SELECT * FROM users WHERE email = ? AND is_active = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, userEmail);   // 1-indexed params\nps.setBoolean(2, true);\nResultSet rs = ps.executeQuery();\n\n// INSERT with PreparedStatement:\nPreparedStatement ins = conn.prepareStatement(\n    \"INSERT INTO test_results (test_name, status) VALUES (?, ?)\"\n);\nins.setString(1, testName);\nins.setString(2, \"PASS\");\nins.executeUpdate();",
        "python": "# Python: parameterized query (%s for MySQL/psycopg2)\ncursor.execute(\n    \"SELECT * FROM users WHERE email = %s AND is_active = %s\",\n    (user_email, True)   # tuple of values — NOT f-string!\n)\n\n# SQLite uses ? (same as Java PreparedStatement):\ncursor.execute(\n    \"SELECT * FROM users WHERE email = ? AND is_active = ?\",\n    (user_email, 1)\n)\n\n# INSERT:\ncursor.execute(\n    \"INSERT INTO test_results (test_name, status) VALUES (%s, %s)\",\n    (test_name, \"PASS\")\n)\nconn.commit()  # don't forget!",
        "note": "QA ipucu: test verisi kurulumunu transaction içine sarın ve her testin ardından geri alın — DELETE temizlik sorguları yazmadan DB'yi temiz tutar."
      },
      {
        "type": "java-compare",
        "topic": "Transaction Management (commit / rollback)",
        "why": "Transactions guarantee all-or-nothing changes — critical for test data setup. Java calls setAutoCommit(false). Python's drivers have auto-commit off by default, so you explicitly call commit().",
        "java": "// Java: manual transaction control\ntry {\n    conn.setAutoCommit(false);  // begin transaction\n    stmt.executeUpdate(\"INSERT INTO orders ...\");\n    stmt.executeUpdate(\"UPDATE inventory SET qty=qty-1 ...\");\n    conn.commit();               // save ALL changes\n} catch (SQLException e) {\n    conn.rollback();             // undo ALL changes\n    throw e;\n} finally {\n    conn.setAutoCommit(true);\n}",
        "python": "# Python: explicit commit / rollback\ntry:\n    cursor.execute(\"INSERT INTO orders ...\")\n    cursor.execute(\"UPDATE inventory SET qty=qty-1 ...\")\n    conn.commit()    # save ALL changes\nexcept Exception:\n    conn.rollback()  # undo ALL changes\n    raise\n\n# Cleanest: \"with\" context manager (psycopg2):\nwith conn:   # auto-commits on success, rolls back on error\n    cursor.execute(\"INSERT INTO orders ...\")\n    cursor.execute(\"UPDATE inventory SET qty=qty-1 ...\")",
        "note": "QA tip: wrap test data setup in a transaction and rollback after each test — keeps the DB clean without writing DELETE cleanup queries."
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "☕",
        "title": {
          "tr": "Java JDBC vs Python Sürücü Yönetimi",
          "en": "Java JDBC vs Python Driver Management"
        },
        "content": {
          "tr": "Java (JDBC) ve Python ile veritabanı testleri yazarken altyapı kurulumları farklılık gösterir:\n\n- **Sürücü Bağımlılıkları**: Python yerleşik `sqlite3` modülüyle sıfır kurulum gerektirirken, Java JDBC API'si standarttır ancak MySQL/PostgreSQL ile konuşabilmesi için Maven (pom.xml) veya Gradle bağımlılıklarına veritabanı sürücüsünü eklemeyi zorunlu kılar.\n- **Parametreli Sorgular**: Java'da `PreparedStatement` (`pstmt.setInt(1, 25)`), Python'da ise parameter binding (`cursor.execute(..., (25,))`) aynı amaca hizmet eder: Kullanıcı verilerini SQL komutlarından ayırarak SQL Injection açığını engeller.",
          "en": "Java (JDBC) and Python approach database connectivity and library management differently:\n\n- **Dependency Management**: Python's `sqlite3` is built-in, requiring no configuration. Java JDBC provides a standard interface but requires declaring vendor-specific database driver jar dependencies in Maven (pom.xml) or Gradle.\n- **Parameter Binding**: Java's `PreparedStatement` (`pstmt.setInt(1, 25)`) and Python's parameter binding (`cursor.execute(..., (25,))`) share the exact same objective: isolating input values from query commands to prevent SQL Injection."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Java JDBC bağlantısı (`DriverManager.getConnection()`) ile Python `sqlite3.connect()` arasındaki kurulum farkı nedir?",
          "en": "What is the main setup difference between Java JDBC (`DriverManager.getConnection()`) and Python `sqlite3.connect()`?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Java hiçbir harici sürücüye ihtiyaç duymaz",
              "en": "Java does not require any external driver"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Python sqlite3 standart kütüphanesinde yerleşiktir (kurulumsuz); Java JDBC için ise pom.xml'e veritabanı sürücü (driver) bağımlılığı eklemek zorunludur",
              "en": "Python's sqlite3 driver is built into the standard library (zero-install); Java JDBC requires declaring a database driver dependency in pom.xml"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Python sadece SQLite destekler, PostgreSQL desteklemez",
              "en": "Python only supports SQLite and not PostgreSQL"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Java transaction yönetimini desteklemez",
              "en": "Java does not support transaction management"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Python'da SQLite ile çalışmaya başlamak için sıfır kuruluma ihtiyaç duyulur (`import sqlite3` yeterlidir). Java'da ise JDBC API'sinin yanına MySQL veya PostgreSQL JDBC Driver bağımlılığını eklemeniz gerekir.",
          "en": "Python includes the sqlite3 module in its core distribution, requiring no installation. In Java, while the JDBC interface is standard, you must declare and download the vendor-specific database driver jar (via Maven/Gradle) to establish connections."
        },
        "retryQuestion": {
          "question": {
            "tr": "Java PreparedStatement (`pstmt.setInt(1, 25)`) ve Python cursor parameter binding (`cursor.execute(..., (25,))`) arasındaki ortak amaç nedir?",
            "en": "What is the shared purpose of Java's PreparedStatement (`pstmt.setInt(1, 25)`) and Python's parameter binding (`cursor.execute(..., (25,))`)?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Sorguların daha yavaş çalışmasını sağlamak",
                "en": "To make queries execute slower"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Kullanıcı girdilerini SQL komutlarından tamamen ayırarak SQL Injection zafiyetini önlemek",
                "en": "To protect against SQL Injection by separating executable query logic from raw user data inputs"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Tabloları otomatik silmek",
                "en": "To drop tables automatically"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Veritabanı şemasını otomatik migrate etmek",
                "en": "To migrate the schema automatically"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "Her iki dilde de parametreli sorgu kullanmak, girdileri SQL motoruna sadece veri olarak iletir, asla kod olarak yorumlatmaz. Bu, SQL Injection saldırılarını %100 önleyen en temel güvenlik metodudur.",
            "en": "Both languages bind values separately from the query structure. The SQL engine compiles the template first and treats parameters strictly as values, preventing input strings from breaking the query structure and injecting code."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "Java JDBC ile veritabanı bağlantısı kurup sorgu çalıştırmak ile Python sqlite3 kütüphanesi arasındaki kurulum ve bağımlılık (dependency) yönetimi farklarını açıklayın.",
        "promptEn": "Explain the installation and dependency management differences between establishing database connections in Java JDBC and Python sqlite3.",
        "keywords": [
          [
            "jdbc"
          ],
          [
            "sqlite3"
          ],
          [
            "driver",
            "sürücü"
          ],
          [
            "dependency",
            "bağımlılık",
            "pom.xml"
          ],
          [
            "connection",
            "bağlantı"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Python sqlite3 modülü standart kütüphanede yerleşiktir, kurulum gerektirmez. Java JDBC ise standart bir API sunar ancak Maven/Gradle (pom.xml) dosyasına çalışılan veritabanı türüne ait sürücü bağımlılığını (driver dependency) eklemek zorunludur.",
        "modelAnswerEn": "Python's sqlite3 is built-in and requires zero installation. Java JDBC provides a standard connection interface but requires declaring vendor-specific database driver dependencies in pom.xml or build.gradle files."
      }
    ]
  },
  {
    "title": "📝 Pratik & Referans",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🏋️",
        "content": {
          "tr": "SQL öğrenmek, yüzmeyi kitaptan öğrenmek gibi değil — suya girmek gerekir. Editörü aç, kodu çalıştır, hata al, düzelt. Her alıştırmayı önce kendin çözmeye çalış, sonra çözümü gör.",
          "en": "Learning SQL from reading alone is like learning to swim from a book — you have to get in the water. Open the editor, run the query, make errors, fix them. Try each exercise yourself first, then check the solution."
        }
      },
      {
        "type": "heading",
        "text": "Pratik Alıştırmalar"
      },
      {
        "type": "exercise",
        "difficulty": "🟢 Başlangıç",
        "title": "Alıştırma 1: Başarısız Test Çalıştırmalarını Sorgula",
        "description": "id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date sütunlarına sahip bir test_runs tablosu verilmektedir. ÜÇ sorgu yazın: (a) bugünün tüm başarısız çalıştırmaları, (b) her durumun sayısı, (c) en yavaş 3 test.",
        "hint": "WHERE status=\"FAIL\" AND DATE(run_date)=CURDATE() kullanın. Sayımlar için GROUP BY status. En yavaş için ORDER BY duration_ms DESC LIMIT 3.",
        "solution": "-- (a) Failed runs today:\nSELECT test_name, duration_ms, run_date\nFROM test_runs\nWHERE status = 'FAIL'\n  AND DATE(run_date) = CURDATE()\nORDER BY duration_ms DESC;\n\n-- (b) Count by status:\nSELECT status, COUNT(*) AS count\nFROM test_runs\nGROUP BY status\nORDER BY count DESC;\n\n-- (c) Slowest 3 tests:\nSELECT test_name, duration_ms\nFROM test_runs\nORDER BY duration_ms DESC\nLIMIT 3;",
        "explanation": "DATE() bir DATETIME'den yalnızca tarih bölümünü çıkarır. CURDATE() bugünün tarihini döndürür. Bunlar MySQL fonksiyonlarıdır — PostgreSQL'de CURRENT_DATE kullanılır."
      },
      {
        "type": "exercise",
        "difficulty": "🟡 Orta",
        "title": "Alıştırma 2: Çoklu Tablo JOIN",
        "description": "Üç tablonuz var: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Son 30 günde çalıştırılan testler için: test uzmanı adı, test case başlığı, durum ve tarihi gösteren, en yenisi önce sıralı bir sorgu yazın.",
        "hint": "3 tabloyu JOIN edin: users→results (user_id üzerinden), test_cases→results (test_case_id üzerinden). WHERE run_date >= NOW() - INTERVAL 30 DAY kullanın.",
        "solution": "SELECT\n    u.name         AS tester,\n    tc.title       AS test_case,\n    tc.category,\n    r.status,\n    r.run_date\nFROM results r\nJOIN users      u  ON r.user_id      = u.id\nJOIN test_cases tc ON r.test_case_id = tc.id\nWHERE r.run_date >= NOW() - INTERVAL 30 DAY\nORDER BY r.run_date DESC;",
        "explanation": "\"results\" tablosundan (users ve test_cases'ı birleştiren ara tablo) başlayıp JOIN yapın. Bu, istenmeyen kartezyen çarpımı önler."
      },
      {
        "type": "exercise",
        "difficulty": "🔴 İleri",
        "title": "Alıştırma 3: CTE + Window Fonksiyonu — Test Uzmanlarını Başarı Oranına Göre Sırala",
        "description": "results tablosunu (user_id, status, sprint) kullanarak: CTE ile istatistikleri hesaplayıp RANK() window fonksiyonu ile test uzmanlarını SPRINT BAŞINA başarı oranına göre sıralayan bir sorgu yazın. Göster: sprint, uzman adı, toplam test, başarı sayısı, başarı oranı %, sprint içi sıralama.",
        "hint": "CTE: sayımlar için sprint ve user_id grupla. Sonra isimler için users JOIN. Ardından RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) ekle.",
        "solution": "WITH sprint_stats AS (\n    SELECT\n        sprint,\n        user_id,\n        COUNT(*)                                  AS total,\n        SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed\n    FROM results\n    GROUP BY sprint, user_id\n),\nsprint_rates AS (\n    SELECT\n        s.sprint,\n        u.name    AS tester,\n        s.total,\n        s.passed,\n        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate\n    FROM sprint_stats s\n    JOIN users u ON s.user_id = u.id\n)\nSELECT\n    sprint,\n    tester,\n    total,\n    passed,\n    pass_rate,\n    RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) AS rank_in_sprint\nFROM sprint_rates\nORDER BY sprint, rank_in_sprint;",
        "explanation": "İki CTE: birincisi ham sayımları toplar, ikincisi oranı hesaplar ve kullanıcı adlarını JOIN eder. Son SELECT window fonksiyonunu ekler. CTE'lere bölmek her adımı ayrıca hata ayıklanabilir kılar."
      },
      {
        "type": "heading",
        "text": "Hızlı Referans Kartı"
      },
      {
        "type": "table",
        "headers": [
          "Komut",
          "Söz Dizimi",
          "Amaç"
        ],
        "rows": [
          [
            "SELECT",
            "SELECT col FROM tbl WHERE cond",
            "Tablodan veri oku"
          ],
          [
            "INSERT",
            "INSERT INTO tbl (cols) VALUES (...)",
            "Yeni satır ekle"
          ],
          [
            "UPDATE",
            "UPDATE tbl SET col=val WHERE cond",
            "Mevcut satırları güncelle"
          ],
          [
            "DELETE",
            "DELETE FROM tbl WHERE cond",
            "Satırları sil"
          ],
          [
            "CREATE TABLE",
            "CREATE TABLE t (id INT PRIMARY KEY, ...)",
            "Yeni tablo tanımla"
          ],
          [
            "JOIN (INNER)",
            "JOIN t2 ON t1.id = t2.fk",
            "Her iki tabloda eşleşen satırlar"
          ],
          [
            "LEFT JOIN",
            "LEFT JOIN t2 ON t1.id = t2.fk",
            "Sol tablodaki tüm satırlar + eşleşen sağ"
          ],
          [
            "GROUP BY",
            "GROUP BY col HAVING COUNT(*) > N",
            "Topla + grupları filtrele"
          ],
          [
            "ORDER BY",
            "ORDER BY col DESC LIMIT N",
            "Sırala ve sınırla"
          ],
          [
            "COUNT/SUM/AVG",
            "SELECT COUNT(*), AVG(col)",
            "Aggregate fonksiyonlar"
          ],
          [
            "NULL kontrolü",
            "WHERE col IS NULL",
            "Eksik değerleri bul"
          ],
          [
            "COALESCE",
            "COALESCE(col, default)",
            "NULL'ı varsayılan ile değiştir"
          ],
          [
            "CTE",
            "WITH name AS (SELECT ...) SELECT ...",
            "Adlandırılmış geçici alt sorgu"
          ],
          [
            "Window RANK",
            "RANK() OVER (PARTITION BY ... ORDER BY ...)",
            "Gruplar içinde sırala"
          ],
          [
            "EXPLAIN",
            "EXPLAIN SELECT ...",
            "Sorgu yürütme planını göster"
          ]
        ]
      },
      {
        "type": "tip",
        "content": "Hızlı deneyler için db-fiddle.com'u yer imlerine ekleyin. DELETE veya UPDATE çalıştırmadan önce WHERE koşulunu SELECT ile test edin — tek bir eksik WHERE tüm tabloyu silebilir."
      },
      {
        "type": "glossary-section",
        "terms": [
          {
            "term": "Aggregate Function",
            "definition": {
              "tr": "Birden fazla satiri tek bir ozet degere indirgeyen fonksiyon: COUNT, SUM, AVG, MIN, MAX.",
              "en": "A function that reduces multiple rows to a single summary value: COUNT, SUM, AVG, MIN, MAX."
            }
          },
          {
            "term": "AUTO_INCREMENT",
            "definition": {
              "tr": "Her yeni satirda otomatik olarak artan tam sayi. MySQL terimi; SQLite de INTEGER PRIMARY KEY, PostgreSQL de SERIAL.",
              "en": "An integer that automatically increases for each new row. MySQL term; SQLite uses INTEGER PRIMARY KEY, PostgreSQL uses SERIAL."
            }
          },
          {
            "term": "CTE (Common Table Expression)",
            "definition": {
              "tr": "WITH keyword u ile tanimlanan gecici adlandirilmis sorgu. Tek bir sorguda birden fazla kez referans alinabilir.",
              "en": "A temporary named query defined with the WITH keyword. Can be referenced multiple times within a single query."
            }
          },
          {
            "term": "COALESCE",
            "definition": {
              "tr": "Arguman listesindeki ilk NULL olmayan degeri dondurur. NULL icin varsayilan deger saglamak icin kullanilir.",
              "en": "Returns the first non-NULL value in an argument list. Used to provide a fallback value for NULL."
            }
          },
          {
            "term": "Correlated Subquery",
            "definition": {
              "tr": "Dis sorgunun bir sutununa referans veren alt sorgu. Dis sorgunun her satiri icin bir kez calisir — yavas olabilir.",
              "en": "A subquery that references a column from the outer query. Runs once per outer row — can be slow."
            }
          },
          {
            "term": "DDL",
            "definition": {
              "tr": "Data Definition Language: CREATE, ALTER, DROP gibi sema yapisini degistiren SQL komutlari.",
              "en": "Data Definition Language: SQL commands that change schema structure, like CREATE, ALTER, DROP."
            }
          },
          {
            "term": "DML",
            "definition": {
              "tr": "Data Manipulation Language: INSERT, UPDATE, DELETE, SELECT gibi veriyi degistiren SQL komutlari.",
              "en": "Data Manipulation Language: SQL commands that modify data, like INSERT, UPDATE, DELETE, SELECT."
            }
          },
          {
            "term": "EXPLAIN",
            "definition": {
              "tr": "Bir sorgunun nasil yurutulegini gosteren komut. Sorgu plani, index kullanimi ve performans sorunlarini teshis etmek icin kullanilir.",
              "en": "A command that shows how a query will be executed. Used to diagnose query plans, index usage, and performance issues."
            }
          },
          {
            "term": "Foreign Key (FK)",
            "definition": {
              "tr": "Baska bir tablonun Primary Key ini referans alan sutun. Tablolar arasi referans butunlugunu zorlar.",
              "en": "A column that references the Primary Key of another table. Enforces referential integrity between tables."
            }
          },
          {
            "term": "GROUP BY",
            "definition": {
              "tr": "Bir sorgudaki satirlari belirtilen sutun degerlerine gore gruplandiran clause. Aggregate fonksiyonlarla birlikte kullanilir.",
              "en": "A clause that groups rows in a query by specified column values. Used with aggregate functions."
            }
          },
          {
            "term": "HAVING",
            "definition": {
              "tr": "GROUP BY sonrasinda gruplari filtreleyen clause. Aggregate sonuclar uzerinde calisir — WHERE gibi ama gruplar icin.",
              "en": "A clause that filters groups after GROUP BY. Works on aggregate results — like WHERE but for groups."
            }
          },
          {
            "term": "Index",
            "definition": {
              "tr": "Veri aramasini hizlandiran veritabani yapisi. WHERE, JOIN ve ORDER BY sorgularini optimize eder.",
              "en": "A database structure that speeds up data lookup. Optimizes WHERE, JOIN, and ORDER BY queries."
            }
          },
          {
            "term": "JOIN",
            "definition": {
              "tr": "Paylasilan sutunlar araciligiyla iki veya daha fazla tablodan satirlari birlestiren SQL operasyonu.",
              "en": "A SQL operation that combines rows from two or more tables based on a shared column."
            }
          },
          {
            "term": "NULL",
            "definition": {
              "tr": "Eksik veya bilinmeyen degeri temsil eden ozel isaretci. Sifir, bos string veya false tan farklidir. IS NULL ile kontrol edilir.",
              "en": "A special marker representing a missing or unknown value. Different from zero, empty string, or false. Checked with IS NULL."
            }
          },
          {
            "term": "Primary Key (PK)",
            "definition": {
              "tr": "Bir tablodaki her satiri benzersiz olarak tanimlayan sutun veya sutun kombinasyonu. NULL olamaz ve tekrar edemez.",
              "en": "A column or combination of columns that uniquely identifies every row in a table. Cannot be NULL or duplicate."
            }
          },
          {
            "term": "Schema",
            "definition": {
              "tr": "Veritabaninin yapisi: tablolar, sutunlar, tipler, kisitlamalar ve iliskiler. CREATE TABLE ifadeleri ile tanimlanir.",
              "en": "The structure of a database: tables, columns, types, constraints, and relationships. Defined by CREATE TABLE statements."
            }
          },
          {
            "term": "Subquery",
            "definition": {
              "tr": "Baska bir SELECT ifadesinin icine yerlestirilmis SELECT ifadesi. WHERE, FROM veya SELECT clause larinda kullanilabilir.",
              "en": "A SELECT statement nested inside another SELECT statement. Can be used in WHERE, FROM, or SELECT clauses."
            }
          },
          {
            "term": "Transaction",
            "definition": {
              "tr": "Tek bir birim olarak islenen SQL ifadeleri dizisi — ya tumu basarili olur ya da higbiri olmaz. ACID garantilerini saglar.",
              "en": "A sequence of SQL statements treated as a single unit — either all succeed or none do. Provides ACID guarantees."
            }
          },
          {
            "term": "View",
            "definition": {
              "tr": "Kayitli SQL sorgu tarafindan tanimlanan sanal tablo. Bir tablo gibi sorgulanabilir ama veriyi kendisi saklamaz.",
              "en": "A virtual table defined by a stored SQL query. Can be queried like a table but does not store data itself."
            }
          },
          {
            "term": "Window Function",
            "definition": {
              "tr": "GROUP BY nin aksine satirlari daraltmadan iliskili satirlar penceresi uzerinde hesaplama yapan fonksiyon. ROW_NUMBER, RANK, LAG gibi.",
              "en": "A function that performs calculations over a window of related rows without collapsing them like GROUP BY. Examples: ROW_NUMBER, RANK, LAG."
            }
          }
        ]
      },
      {
        "type": "quiz",
        "question": {
          "tr": "`WHERE email = NULL` yazan bir sorgu hiçbir satır döndürmüyor, hatta email'i gerçekten eksik olan satırlar için de. Sorun nedir, ve doğru sözdizimi nedir?",
          "en": "A query with `WHERE email = NULL` returns no rows, even for rows where the email is genuinely missing. What is the problem, and what is the correct syntax?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "NULL büyük harfle yazılmalı",
              "en": "NULL must be written in lowercase"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "NULL hiçbir değere \"eşit\" değildir (NULL dahil) — `IS NULL` kullanılmalı",
              "en": "NULL is not \"equal\" to anything (including NULL itself) — `IS NULL` must be used"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "WHERE clause'u NULL kontrolünü desteklemez",
              "en": "WHERE clauses do not support NULL checks"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "NULL yerine boş string (\"\") kullanılmalı",
              "en": "An empty string (\"\") should be used instead of NULL"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "SQL'in üç değerli mantığında, NULL \"bilinmeyen\" bir değeri temsil eder ve hiçbir değerle (kendisi dahil) eşit veya eşit değildir — `NULL = NULL` bile UNKNOWN döner, TRUE değil. Bu yüzden `email IS NULL` / `email IS NOT NULL` özel operatörleri kullanılmalı. Java'da bu, bir referansı `== null` ile kontrol etmekle aynı kategoride bir kavramdır, ama SQL'de `=` operatörü bunun için ASLA çalışmaz.",
          "en": "In SQL's three-valued logic, NULL represents an \"unknown\" value and is never equal or unequal to anything (including itself) — even `NULL = NULL` evaluates to UNKNOWN, not TRUE. That's why the special `IS NULL` / `IS NOT NULL` operators must be used instead. This is conceptually similar to checking a reference with `== null` in Java, but in SQL the `=` operator will NEVER work for this."
        },
        "retryQuestion": {
          "question": {
            "tr": "`WHERE status != 'FAIL'` koşulu olan bir sorgu, beklenmedik şekilde `status`u NULL olan satırları da hariç tutuyor (oysa onları DAHİL etmek istiyordun). Neden?",
            "en": "A query with `WHERE status != 'FAIL'` unexpectedly excludes rows where `status` is NULL too (even though you wanted to INCLUDE them). Why?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "NULL her zaman 'FAIL'e eşittir",
                "en": "NULL is always equal to 'FAIL'"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "NULL != 'FAIL' karşılaştırması da UNKNOWN değerlendirilir, bu yüzden WHERE o satırı dahil etmez",
                "en": "The comparison NULL != 'FAIL' also evaluates to UNKNOWN, so WHERE does not include that row either"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "NULL satırları veritabanından otomatik silinmiştir",
                "en": "NULL rows have been automatically deleted from the database"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "!= operatörü NULL ile asla kullanılamaz, syntax hatası verir",
                "en": "The != operator can never be used with NULL, it throws a syntax error"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "NULL ile yapılan HER karşılaştırma (=, !=, <, > dahil) UNKNOWN döner, TRUE veya FALSE değil — ve WHERE clause sadece TRUE değerlendirilen satırları tutar. `status != 'FAIL'`, NULL bir status için UNKNOWN döner, bu yüzden o satır ne dahil edilir ne reddedilir gibi görünür, fiilen DIŞARIDA kalır. Doğru çözüm: `WHERE status != 'FAIL' OR status IS NULL`.",
            "en": "EVERY comparison with NULL (including =, !=, <, >) evaluates to UNKNOWN, not TRUE or FALSE — and the WHERE clause only keeps rows that evaluate to TRUE. `status != 'FAIL'` evaluates to UNKNOWN for a NULL status, so that row ends up excluded, not included as you might expect. The correct fix is: `WHERE status != 'FAIL' OR status IS NULL`."
          }
        }
      },
      {
        "type": "feynman-checkpoint",
        "promptTr": "SQL otomasyon test pratikleri yaparken veya sorguları optimize ederken en çok dikkat ettiğiniz kuralları ve EXPLAIN komutunun önemini açıklayın.",
        "promptEn": "Explain the rules you pay most attention to when practicing SQL automation tests or optimizing queries, and the importance of the EXPLAIN command.",
        "keywords": [
          [
            "explain"
          ],
          [
            "index",
            "indeks"
          ],
          [
            "slow",
            "yavaş",
            "hızlı"
          ],
          [
            "query",
            "sorgu"
          ],
          [
            "plan"
          ]
        ],
        "minScore": 3,
        "modelAnswerTr": "Sorguları optimize ederken gereksiz SELECT * kullanımlarından kaçınırım. EXPLAIN komutunu kullanarak veritabanının sorguyu nasıl koşturacağını, indeks kullanıp kullanmadığını (index scan vs table scan) analiz eder ve slow query sorunlarını gideririm.",
        "modelAnswerEn": "When optimizing queries, I avoid unnecessary SELECT * columns. I use the EXPLAIN command to analyze the execution plan of a query, checking if it performs index scans or slow full-table scans to debug performance bottlenecks."
      }
    ]
  },
  {
    "title": "💼 Mülakat",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "💼",
        "content": {
          "tr": "SQL mülakatında 'JOIN nedir?' sorusu değil, 'Production'da şu hata var, nasıl araştırırsın?' sorusu sorulur. Bu bölüm senaryo bazlı sorulara hazırlar — tanım değil, pratik deneyim.",
          "en": "SQL interviews don't ask 'what is JOIN?' — they ask 'there's a bug in production, how do you investigate it with SQL?' This section prepares you for scenario-based questions that require hands-on experience, not just definitions."
        }
      },
      {
        "type": "text",
        "content": "Model cevabı görmek için her soruya tıklayın. Kod örnekleri içerir."
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🟢 Temel Sorular",
          "en": "🟢 Basic Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q1: What is the difference between WHERE and HAVING?",
          "tr": "Soru 1: WHERE ile HAVING arasındaki fark nedir?"
        },
        "answer": {
          "en": "WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.",
          "tr": "WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE."
        },
        "code": {
          "en": "-- WHERE: filter rows before grouping\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: filter groups after aggregation\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- first filter rows (only FAIL rows)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)",
          "tr": "-- WHERE: gruplamadan önce satırları filtreler\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: gruplamadan sonra grupları filtreler\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- önce satırları filtrele (sadece FAIL olanlar)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- sonra grupları filtrele (sık hata alanlar)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q2: Explain the different types of JOINs.",
          "tr": "Soru 2: Farklı JOIN türlerini açıklayın."
        },
        "answer": {
          "en": "INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.",
          "tr": "INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir."
        },
        "code": {
          "en": "-- Find testers WITH open bugs (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Find ALL testers, even those with no bugs (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;",
          "tr": "-- Açık bug raporu olan testçileri bul (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Tüm testçileri bul, bug raporu olmayanlar dahil (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q3: What is a PRIMARY KEY vs FOREIGN KEY?",
          "tr": "Soru 3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?"
        },
        "answer": {
          "en": "PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn't exist in the parent table.",
          "tr": "PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez."
        },
        "code": {
          "en": "CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    user_id INT NOT NULL,                    -- FK column\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint\n    -- → cannot insert user_id = 999 if no user with id=999 exists\n);",
          "tr": "CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    user_id INT NOT NULL,                    -- FK (Yabancı Anahtar) sütunu\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK (Yabancı Anahtar) kısıtlaması\n    -- → id=999 olan bir kullanıcı yoksa user_id = 999 eklenemez\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q4: What is NULL and how do you check for it?",
          "tr": "Soru 4: NULL nedir ve nasıl kontrol edilir?"
        },
        "answer": {
          "en": "NULL means \"no value\" or \"unknown\". It's not the same as 0, empty string \"\", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.",
          "tr": "NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın."
        },
        "code": {
          "en": "-- Wrong:\nSELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.\nSELECT * FROM users WHERE phone != NULL;   -- same problem\n\n-- Correct:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- Provide default with COALESCE:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;",
          "tr": "-- Yanlış:\nSELECT * FROM users WHERE phone = NULL;    -- 0 satır döndürür! Her zaman false.\nSELECT * FROM users WHERE phone != NULL;   -- aynı sorun\n\n-- Doğru:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- COALESCE ile varsayılan değer sağla:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q5: What is the difference between DELETE, TRUNCATE, and DROP?",
          "tr": "Soru 5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?"
        },
        "answer": {
          "en": "DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.",
          "tr": "DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir."
        },
        "code": {
          "en": "DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows\nDELETE FROM test_results;                           -- remove all rows (slow)\n\nTRUNCATE TABLE test_results;                        -- remove all rows (fast)\n\nDROP TABLE test_results;                            -- delete entire table!",
          "tr": "DELETE FROM test_results WHERE status = 'SKIP';    -- belirli satırları sil\nDELETE FROM test_results;                           -- tüm satırları sil (yavaş)\n\nTRUNCATE TABLE test_results;                        -- tüm satırları sil (hızlı)\n\nDROP TABLE test_results;                            -- tüm tabloyu sil!"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q6: What is the difference between UNION and UNION ALL?",
          "tr": "Soru 6: UNION ile UNION ALL arasındaki fark nedir?"
        },
        "answer": {
          "en": "UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.",
          "tr": "UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır."
        },
        "code": {
          "en": "-- UNION: removes duplicates (slower):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: keeps duplicates (faster):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';",
          "tr": "-- UNION: tekrarlananları kaldırır (daha yavaş):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: tekrarlananları korur (daha hızlı):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q7: How do subqueries work? What is a correlated subquery?",
          "tr": "Soru 7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?"
        },
        "answer": {
          "en": "A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.",
          "tr": "Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın."
        },
        "code": {
          "en": "-- Simple subquery (runs ONCE):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Correlated subquery (runs once per outer row — slow on large tables!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Better: use LEFT JOIN + GROUP BY instead",
          "tr": "-- Basit alt sorgu (BİR KEZ çalışır):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Bağlantılı alt sorgu (dış sorgunun her satırı için çalışır — büyük tablolarda yavaş!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Daha iyi: bunun yerine LEFT JOIN + GROUP BY kullanın"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q8: What are indexes and how do they affect performance?",
          "tr": "Soru 8: Index nedir, performansı nasıl etkiler?"
        },
        "answer": {
          "en": "An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book's index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon't index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.",
          "tr": "Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan dizinden atlarsınız.\n\nHızlandırır: SELECT with WHERE, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, status), sık güncellenen sütunlar."
        },
        "code": {
          "en": "-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Add index:\nCREATE INDEX idx_status ON test_results(status);\n\n-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';",
          "tr": "-- İndeksten önce: EXPLAIN type=ALL gösterir (TÜM 50,000 satırı okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- İndeks ekle:\nCREATE INDEX idx_status ON test_results(status);\n\n-- İndeksten sonra: EXPLAIN type=ref gösterir (indeks kullanır, ~5000 satır okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q9: Write a query to find the second highest value in a table.",
          "tr": "Soru 9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın."
        },
        "answer": {
          "en": "Finding the second highest value is a classic. You can use LIMIT/OFFSET, a subquery, or window functions. LIMIT/OFFSET is the simplest, but the subquery method is database-agnostic.",
          "tr": "En yüksek ikinci değeri bulmak için LIMIT/OFFSET, alt sorgu veya window fonksiyonları kullanılabilir. LIMIT ve OFFSET en kolay yoldur ancak alt sorgu yaklaşımı veritabanından bağımsız olarak çalışır."
        },
        "code": {
          "en": "-- Option 1: LIMIT + OFFSET (simplest, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Option 2: Subquery (works in all databases, handles duplicates):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Option 3: Window Function (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;",
          "tr": "-- Seçenek 1: LIMIT + OFFSET (en basit, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Seçenek 2: Alt sorgu (tüm veritabanlarında çalışır, tekrarlananları yönetir):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Seçenek 3: Pencere Fonksiyonu (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q10: GROUP BY — What rules apply to SELECT columns?",
          "tr": "Soru 10: GROUP BY kullanırken SELECT sütunlarına hangi kurallar uygulanır?"
        },
        "answer": {
          "en": "In standard SQL, every column in the SELECT clause must either be specified in the GROUP BY clause, or wrapped in an aggregate function (COUNT, SUM, AVG, etc.). Otherwise, the engine throws an error because it cannot choose a single value from the multiple rows collapsing into that group.",
          "tr": "SELECT listesindeki her sütun ya GROUP BY içinde yer almalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır. Aksi takdirde veritabanı motoru her grup için hangi tekil değeri göstereceğini bilemez ve hata fırlatır."
        },
        "code": {
          "en": "-- WRONG in standard SQL (MySQL without ONLY_FULL_GROUP_BY might allow it, but returns random name!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- CORRECT:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- ALSO CORRECT:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;",
          "tr": "-- Standart SQL'de YANLIŞ (ONLY_FULL_GROUP_BY kapalı MySQL izin verebilir ama rastgele ad döndürür!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- DOĞRU:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- BU DA DOĞRU:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q11: Explain window functions with a practical example.",
          "tr": "Soru 11: Window fonksiyonlarını pratik bir örnekle açıklayın."
        },
        "answer": {
          "en": "Window functions perform calculations across a set of table rows that are somehow related to the current row, without collapsing them into a single output row like GROUP BY. Each row retains its identity. `OVER()` defines the window, `PARTITION BY` groups the window, and `ORDER BY` sorts within it.",
          "tr": "Window fonksiyonları, satırları tek bir grupta birleştirmeden (GROUP BY yapmadan) satır kümeleri üzerinde hesaplama yapar. Her satır kendi kimliğini korur ve window hesaplaması sonucunu alır. `OVER()` pencereyi, `PARTITION BY` grupları, `ORDER BY` ise sıralamayı belirler."
        },
        "code": {
          "en": "-- Show each test run alongside the average duration of its environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Rank tests by duration within each environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;",
          "tr": "-- Her test çalışmasını, kendi ortamının ortalama süresiyle birlikte göster:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Testleri her ortamda kendi içlerinde sürelerine göre sırala:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q12: What is a CTE? When should it be preferred over a subquery?",
          "tr": "Soru 12: CTE nedir? Alt sorguya göre ne zaman tercih edilmelidir?"
        },
        "answer": {
          "en": "A CTE (Common Table Expression) is a temporary named result set defined using the `WITH` clause. It improves readability by breaking complex nested subqueries into logical top-down steps, and can be referenced multiple times within the same query.",
          "tr": "CTE (Common Table Expression), `WITH` ifadesiyle tanımlanan adlandırılmış geçici bir sonuç kümesidir. Karmaşık iç içe sorguları yukarıdan aşağıya mantıklı adımlara bölerek okunabilirliği artırır ve aynı geçici tabloya tek sorguda birden çok kez atıfta bulunulmasını sağlar."
        },
        "code": {
          "en": "-- Readable queries with CTE:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;",
          "tr": "-- CTE ile okunabilir sorgular:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q13: How does a transaction work? What are the ACID properties?",
          "tr": "Soru 13: Transaction nasıl çalışır? ACID özellikleri nelerdir?"
        },
        "answer": {
          "en": "A database transaction is a sequence of SQL statements executed as a single, atomic unit of work. ACID stands for:\nAtomicity: All-or-nothing execution.\nConsistency: Moves the DB from one valid state to another, enforcing constraints.\nIsolation: Concurrent transactions do not interfere with each other.\nDurability: Once committed, updates survive system failures.",
          "tr": "Transaction, tek bir birim olarak işlenen SQL komutları dizisidir. ACID özellikleri şunlardır:\nAtomicity (Atomiklik): Hepsi ya da hiçbiri.\nConsistency (Tutarlılık): Şema kuralları korunur.\nIsolation (İzolasyon): Eşzamanlı işlemler birbirini etkilemez.\nDurability (Kalıcılık): COMMIT sonrası veriler kalıcı diske yazılır."
        },
        "code": {
          "en": "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If both succeeded:\nCOMMIT;\n\n-- If any failed:\nROLLBACK;",
          "tr": "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Eğer ikisi de başarılı olursa:\nCOMMIT;\n\n-- Eğer herhangi biri başarısız olursa:\nROLLBACK;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q14: What is SQL injection and how do parameterized queries prevent it?",
          "tr": "Soru 14: SQL Injection nedir ve parametreli sorgular bunu nasıl önler?"
        },
        "answer": {
          "en": "SQL Injection is a vulnerability where malicious SQL commands are injected into database queries through untrusted user inputs. Parameterized queries (Prepared Statements) compile the SQL query template first, then bind parameters as raw values. The inputs are never interpreted as SQL executable code.",
          "tr": "SQL Injection, kullanıcı girdilerinin SQL kodu gibi yorumlanması zafiyetidir. Parametreli sorgular (Prepared Statements), SQL yapısı ile kullanıcı verisini tamamen ayırır. Veri ne olursa olsun (zararlı kodlar dahil) sadece bir parametre/değer olarak işlenir ve çalıştırılamaz."
        },
        "code": {
          "en": "-- VULNERABLE to SQL injection:\n-- Input: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Generates: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- SAFE (Parameterized query):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir",
          "tr": "-- SQL injection'a karşı savunmasız:\n-- Girdi: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Üretilen: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- GÜVENLİ (Parametreli sorgu):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q15: How do you optimize a slow SQL query?",
          "tr": "Soru 15: Yavaş bir sorguyu nasıl optimize edersiniz?"
        },
        "answer": {
          "en": "1. Use `EXPLAIN` to audit the query plan and identify Full Table Scans.\n2. Add indexes on columns commonly used in WHERE clauses, JOIN conditions, and ORDER BY constraints.\n3. Avoid `SELECT *`; only request the specific columns you need.\n4. Rewrite subqueries as JOINs where possible to allow optimizer optimizations.\n5. Use LIMIT to return only the subset of data required by the application.",
          "tr": "1. `EXPLAIN` ile sorgu planını inceleyin, full table scan olan adımları tespit edin.\n2. Sık filtrelenen (WHERE), birleştirilen (JOIN ON) ve sıralanan (ORDER BY) sütunlara index ekleyin.\n3. `SELECT *` yerine sadece gerekli sütunları çağırın.\n4. Alt sorguları (subquery) mümkünse JOIN'e dönüştürün.\n5. Ağır sorgularda performansı optimize etmek için LIMIT kullanın."
        },
        "code": {
          "en": "-- EXPLAIN query plan:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Create compound index for multi-column filters:\nCREATE INDEX idx_user_status ON orders(user_id, status);",
          "tr": "-- EXPLAIN sorgu planı:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Çoklu sütun filtreleri için birleşik indeks oluştur:\nCREATE INDEX idx_user_status ON orders(user_id, status);"
        }
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🟡 Orta Seviye Sorular",
          "en": "🟡 Intermediate Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q16: What is a Database Schema?",
          "tr": "Soru 16: Veritabanı Şeması (Schema) ne anlama gelir?"
        },
        "answer": {
          "en": "A database schema is the skeleton structure that represents the logical view of the entire database. It defines how the data is organized, including tables, columns, data types, primary/foreign keys, and relationships. For a QA engineer, the schema serves as the map to design database validation tests.",
          "tr": "Veritabanı şeması, veritabanının mantıksal ve fiziksel yapısını tanımlayan bir plandır (blueprint). Tabloları, sütunları, veri tiplerini, primary/foreign key kısıtlamalarını ve tablolar arası ilişkileri içerir. Bir QA mühendisi için, uygulamanın veri yapısını anlamak ve test verisi tasarlamak için şema bilgisi kritik önem taşır."
        },
        "code": {
          "en": "-- Example of schema definition (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
          "tr": "-- Şema tanımı örneği (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q17: What does the SELECT DISTINCT statement do?",
          "tr": "Soru 17: SELECT DISTINCT ifadesi ne işe yarar?"
        },
        "answer": {
          "en": "The SELECT DISTINCT statement is used to return only distinct (different) values from a column, filtering out all duplicate rows in the result set. In QA testing, it is useful to check all unique values present in a table, such as tested environments or unique statuses.",
          "tr": "SELECT DISTINCT, sorgu sonucunda tekrar eden satırları kaldırarak sadece benzersiz (unique) değerlerin listelenmesini sağlar. QA otomasyonunda, test sonuçlarında hangi farklı ortamların (environment) kullanıldığını veya tablodaki benzersiz durumları listelemek için sıkça kullanılır."
        },
        "code": {
          "en": "-- Get list of unique environments tested:\nSELECT DISTINCT environment FROM test_results;",
          "tr": "-- Test edilen benzersiz ortamların listesini al:\nSELECT DISTINCT environment FROM test_results;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q18: What is the difference between = and LIKE in a WHERE clause?",
          "tr": "Soru 18: WHERE koşulunda = ve LIKE arasındaki temel fark nedir?"
        },
        "answer": {
          "en": "The `=` operator searches for an exact match, whereas the `LIKE` operator performs pattern matching using wildcard characters. `LIKE` supports `%` (matches any sequence of zero or more characters) and `_` (matches exactly one character). Using wildcard characters with `=` treats them as literal characters.",
          "tr": "`=` tam (birebir) eşleşme ararken, `LIKE` karakter bazlı şablon (pattern matching) eşleşmeleri arar. `LIKE` ile birlikte `%` (sıfır veya daha fazla karakter) ve `_` (tek bir karakter) wildcard karakterleri kullanılabilir. `=` ile wildcard karakterleri çalışmaz, düz string olarak eşleştirilmeye çalışılır."
        },
        "code": {
          "en": "-- Exact match:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Pattern match:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- Starts with 'Login'",
          "tr": "-- Birebir eşleşme:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Şablon eşleşmesi:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- 'Login' ile başlayanlar"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q19: What is the purpose of the LIMIT clause?",
          "tr": "Soru 19: LIMIT ifadesinin amacı nedir?"
        },
        "answer": {
          "en": "The LIMIT clause specifies the maximum number of rows that the query should return. It is crucial when testing against large datasets to prevent memory overflow in your test script or UI by fetching only a small subset of records. Often combined with OFFSET for pagination.",
          "tr": "LIMIT, sorgu sonucunda dönecek maksimum satır sayısını sınırlandırmak için kullanılır. Özellikle milyonlarca satır içeren büyük tablolarda test yaparken tarayıcıyı veya test scriptini çökertmemek için sorgunun sadece ilk birkaç satırını (örn: LIMIT 10) getirmesini sağlamak amacıyla kullanılır. Pagination (sayfalama) için OFFSET ile birlikte kullanılır."
        },
        "code": {
          "en": "-- Get the 5 most recent test failures:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;",
          "tr": "-- En son 5 test hatasını al:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q20: Explain what AS (alias) keyword does.",
          "tr": "Soru 20: AS (alias) anahtar kelimesi ne işe yarar?"
        },
        "answer": {
          "en": "The AS keyword is used to assign a temporary name (alias) to a column or table in a query. It makes output columns more readable (e.g. naming aggregate results) and keeps JOIN queries concise by creating short aliases for table names.",
          "tr": "AS, bir sütuna veya tabloya sorgu süresince geçici bir takma ad (alias) vermek için kullanılır. Özellikle aggregate sonuçlarda sütun adını anlamlı kılmak (`COUNT(*) AS total_runs`) veya JOIN sorgularında tablo adlarını kısaltarak okunabilirliği artırmak için kullanılır."
        },
        "code": {
          "en": "-- Column alias:\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Table alias:\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;",
          "tr": "-- Sütun takma adı (alias):\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Tablo takma adı (alias):\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q21: What is the default sorting order of ORDER BY?",
          "tr": "Soru 21: ORDER BY ifadesinin varsayılan sıralama yönü nedir?"
        },
        "answer": {
          "en": "The default sorting order of the ORDER BY clause is ascending (ASC). This means it sorts numbers from lowest to highest, and text alphabetically from A to Z. To sort in descending order, you must explicitly append the `DESC` keyword after the column name.",
          "tr": "ORDER BY ifadesinin varsayılan sıralama yönü artan sıralamadır (ASC - Ascending). Yani sayılarda küçükten büyüğe, metinlerde ise A'dan Z'ye doğru sıralar. Azalan sıralama (büyükten küçüğe / Z'den A'ya) yapmak için sütun adından sonra açıkça `DESC` yazılmalıdır."
        },
        "code": {
          "en": "-- Sorts ascending (default):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Sorts descending:\nSELECT * FROM test_results ORDER BY duration_ms DESC;",
          "tr": "-- Artan sıralama (varsayılan):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Azalan sıralama:\nSELECT * FROM test_results ORDER BY duration_ms DESC;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q22: What happens if you try to insert a duplicate value into a PRIMARY KEY column?",
          "tr": "Soru 22: PRIMARY KEY olan bir sütuna tekrar eden (duplicate) değer eklemeye çalışırsanız ne olur?"
        },
        "answer": {
          "en": "The database engine throws a primary key constraint violation error and rejects the INSERT operation. If the query is part of a transaction, the transaction will be rolled back. In automation, you must clean up test data or use UPSERT syntax to prevent duplicate key failures.",
          "tr": "Veritabanı motoru hata fırlatır ve ekleme işlemini reddeder (Unique Constraint Violation). Transaction içindeyse tüm transaction iptal edilir. Test otomasyonunda, test verisi eklerken bu hatayı önlemek için her çalıştırmadan önce temizlik (cleanup) yapmak veya UPSERT (ON CONFLICT) mekanizması kullanmak önemlidir."
        },
        "code": {
          "en": "-- Duplicate insert will throw: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- fails!",
          "tr": "-- Tekrarlanan ekleme hata fırlatacaktır: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- başarısız olur!"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q23: What does the IN operator do in a SQL query?",
          "tr": "Soru 23: IN operatörü ne işe yarar?"
        },
        "answer": {
          "en": "The IN operator allows you to specify multiple values in a WHERE clause, acting as a shorthand for multiple OR conditions. It filters rows where the column value matches any value in the provided list. It is also commonly used to match against the results of a subquery.",
          "tr": "IN operatörü, WHERE koşulunda birden fazla OR (veya) ifadesini tek bir liste halinde yazmayı sağlar. Sütunun değerinin belirtilen listedeki elemanlardan herhangi biriyle eşleşmesi durumunda satırı filtreye dahil eder. Alt sorgulardan dönen küme kontrollerinde de sıkça kullanılır."
        },
        "code": {
          "en": "-- Shorthand for OR:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Equivalent to:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';",
          "tr": "-- OR için kısaltma:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Şuna eşdeğerdir:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q24: What is the difference between CHAR and VARCHAR data types?",
          "tr": "Soru 24: CHAR ve VARCHAR veri tipleri arasındaki fark nedir?"
        },
        "answer": {
          "en": "CHAR is fixed-length, while VARCHAR is variable-length. If you define a CHAR(10) and store a 3-character string, it pads the remaining 7 spaces with blanks, consuming 10 bytes. A VARCHAR(10) will only consume 3 bytes of data, making it more space-efficient for fields with varying lengths.",
          "tr": "CHAR sabit uzunlukta (fixed-length), VARCHAR ise değişken uzunlukta (variable-length) metin depolar. CHAR(10) tanımlanmış bir sütuna 3 harfli bir kelime yazılırsa boşluklarla 10 karaktere tamamlanır ve diskte hep 10 karakter yer kaplar. VARCHAR(10) ise girilen metin boyutu kadar (örn: 3 karakter + uzunluk belirten 1 byte) yer kaplar."
        },
        "code": {
          "en": "-- Fixed length (ideal for ISO country codes, hashes):\ncountry_code CHAR(2) -- always 2 chars\n\n-- Variable length (ideal for names, emails):\nemail VARCHAR(255) -- stores actual length",
          "tr": "-- Sabit uzunluk (ISO ülke kodları, hash değerleri için ideal):\ncountry_code CHAR(2) -- her zaman 2 karakter\n\n-- Değişken uzunluk (adlar, e-postalar için ideal):\nemail VARCHAR(255) -- gerçek uzunluğu saklar"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q25: How do you add a comment in SQL?",
          "tr": "Soru 25: SQL'de yorum satırı (comment) nasıl eklenir?"
        },
        "answer": {
          "en": "In SQL, single-line comments are created using double dashes (`--`). Multi-line comments are wrapped inside block markers (`/* comment here */`). Using comments is highly recommended in automated test fixtures to explain complex SQL data setup queries.",
          "tr": "SQL'de tek satırlık yorumlar için çift tire (`--`) kullanılır. Çok satırlı yorumlar için ise C-tarzı (`/* yorum */`) bloklar kullanılır. Test otomasyonunda, karmaşık veritabanı doğrulama sorgularını dökümante etmek için yorum satırları eklemek önemlidir."
        },
        "code": {
          "en": "-- This is a single line comment\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;",
          "tr": "-- Bu tek satırlık bir yorumdur\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q26: What is a Self Join and when would you use it in QA testing?",
          "tr": "Soru 26: Self-Join nedir ve QA otomasyon testlerinde ne amaçla kullanılabilir?"
        },
        "answer": {
          "en": "A Self Join is a regular join, but the table is joined with itself. It is used to query hierarchical data stored in a single table, such as an employee-manager hierarchy or category-subcategory levels. In QA, you can use it to verify data integrity, like checking if deleting a parent category correctly flags its child categories.",
          "tr": "Self-join, bir tablonun kendisiyle JOIN yapılmasıdır. Tablonun içindeki satırlar arasında hiyerarşik veya ilişkisel bir bağ olduğunda kullanılır (Örn: çalışan-yönetici tablosu veya alt-üst kategori tablosu). QA testlerinde, bir kategori silindiğinde alt kategorilerin de doğru şekilde güncellenip güncellenmediğini doğrulamak için self-join sorgusu atılabilir."
        },
        "code": {
          "en": "-- Find employees and their managers from the same table:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
          "tr": "-- Aynı tablodan çalışanları ve yöneticilerini bul:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q27: How do you write a query to find and delete duplicate rows in a table?",
          "tr": "Soru 27: Bir tablodaki tekrar eden (duplicate) satırları nasıl bulursunuz ve bunları nasıl silersiniz?"
        },
        "answer": {
          "en": "To find duplicates, use `GROUP BY` on the target columns and filter with `HAVING COUNT(*) > 1`. To delete them, you can perform a DELETE query that selects the minimum ID for each duplicate group and removes rows with IDs greater than the minimum.",
          "tr": "Tekrarlanan satırları bulmak için `GROUP BY` ve `HAVING COUNT(*) > 1` kullanılır. Silmek için ise, tablonun benzersiz ID sütununu (primary key) kullanarak, kendisiyle karşılaştırıp daha büyük ID'ye sahip olan kopyaları silebiliriz."
        },
        "code": {
          "en": "-- 1. Find duplicates:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. Delete duplicates keeping only the lowest ID (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);",
          "tr": "-- 1. Tekrarlanan kayıtları bul:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. En düşük ID'yi koruyarak tekrarlananları sil (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q28: Explain the difference between CROSS JOIN and INNER JOIN.",
          "tr": "Soru 28: CROSS JOIN ile INNER JOIN arasındaki fark nedir?"
        },
        "answer": {
          "en": "CROSS JOIN returns the cartesian product of two tables, matching every row of the first table with every row of the second table without any condition. INNER JOIN requires a join condition (`ON`) and only matches rows satisfying that condition. CROSS JOIN is useful in QA for generating test matrices.",
          "tr": "CROSS JOIN, iki tablonun kartezyen çarpımını (cartesian product) üretir; yani sol tablodaki her satırı sağ tablodaki her satırla eşleştirir (koşulsuz). INNER JOIN ise sadece iki tablo arasında belirtilen `ON` koşulunu sağlayan satırları birleştirir. CROSS JOIN genellikle test verisi kombinasyonları (matrix testing) oluşturmak için yararlıdır."
        },
        "code": {
          "en": "-- CROSS JOIN (Combines all sizes with all colors):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Matches orders to existing users):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;",
          "tr": "-- CROSS JOIN (Tüm bedenleri tüm renklerle birleştirir):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Siparişleri mevcut kullanıcılarla eşleştirir):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q29: What is a Composite Primary Key?",
          "tr": "Soru 29: Bileşik Birincil Anahtar (Composite Primary Key) nedir?"
        },
        "answer": {
          "en": "A Composite Primary Key is a primary key that consists of two or more columns in a table. Individually, the columns may contain duplicate values, but their combination must be unique. It is commonly used in junction tables for many-to-many relationships to prevent duplicate links.",
          "tr": "Birden fazla sütunun bir araya gelerek tablodaki bir satırı benzersiz şekilde tanımlamasıdır. Tek başına hiçbir sütun benzersiz değildir ancak birleşimleri benzersizdir. Özellikle çoktan-çoğa (many-to-many) ilişki tablolarında (Örn: user_id ve badge_id birleşimi) sıklıkla kullanılır."
        },
        "code": {
          "en": "-- Example of composite primary key (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- combination must be unique\n);",
          "tr": "-- Birleşik birincil anahtar örneği (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- birleşim benzersiz olmalıdır\n);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q30: How does a Foreign Key constraint protect referential integrity?",
          "tr": "Soru 30: Foreign Key (Dış Anahtar) kısıtlaması ilişkisel bütünlüğü nasıl korur?"
        },
        "answer": {
          "en": "A Foreign Key constraint ensures that values in a child table correspond to valid primary keys in a parent table. It prevents orphaned records by blocking inserts of invalid IDs in the child table, and blocking deletions of parent records that still have child dependencies (unless cascaded).",
          "tr": "Foreign Key, bir tablodaki değerlerin başka bir tablonun Primary Key'i ile eşleşmesini zorunlu kılar. Bu sayede veritabanı motoru: 1) Parent tabloda olmayan bir id ile child tabloya kayıt eklenmesini engeller. 2) Child tabloda kaydı olan bir parent satırının silinmesini (veya güncellenmesini) engeller (`ON DELETE RESTRICT` varsayılan ise)."
        },
        "code": {
          "en": "-- Prevent deleting user if they have active orders:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;",
          "tr": "-- Aktif siparişi olan kullanıcının silinmesini engelle:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q31: Does the BETWEEN operator include the boundary values?",
          "tr": "Soru 31: BETWEEN operatörü alt ve üst limit sınırlarını dahil eder mi?"
        },
        "answer": {
          "en": "Yes, the `BETWEEN` operator is inclusive of both boundary values. For example, `WHERE age BETWEEN 18 AND 25` is equivalent to `WHERE age >= 18 AND age <= 25`. This is important for QA engineers to keep in mind when designing Boundary Value Analysis tests.",
          "tr": "Evet, `BETWEEN` operatörü arama yaparken alt ve üst sınır değerlerini de sonuca dahil eder (inclusive). Yani `WHERE age BETWEEN 18 AND 25` koşulu, yaşı 18 ve 25 olan kişileri de getirir. Bu durum, sınır değer testlerinde (boundary value analysis) QA mühendislerinin dikkat etmesi gereken bir kuraldır."
        },
        "code": {
          "en": "-- Inclusive range:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Equivalent to:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;",
          "tr": "-- Dahil aralık:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Şuna eşdeğerdir:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q32: How do you handle case-sensitive text comparisons in SQL?",
          "tr": "Soru 32: SQL'de büyük/küçük harf duyarlı (case-sensitive) metin karşılaştırması nasıl yapılır?"
        },
        "answer": {
          "en": "Case sensitivity depends on the database engine and the collation configuration of the tables/columns. PostgreSQL is case-sensitive by default, whereas MySQL and SQLite are case-insensitive. To force case-sensitivity in MySQL, use the `BINARY` keyword. In Postgres, use `ILIKE` for case-insensitive searches.",
          "tr": "Büyük/küçük harf duyarlılığı veritabanı motoruna ve tablonun karakter setine (collation) bağlıdır. PostgreSQL varsayılan olarak case-sensitive'dir. MySQL ve SQLite varsayılan olarak case-insensitive'dir. Case-sensitive karşılaştırma yapmak için MySQL'de `BINARY` keyword'ü, PostgreSQL'de ise case-insensitive için `ILIKE` kullanılır."
        },
        "code": {
          "en": "-- MySQL Case-sensitive search:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' won't match\n\n-- PostgreSQL Case-insensitive search:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- matches 'Alice', 'ALICE'",
          "tr": "-- MySQL Büyük/küçük harf duyarlı arama:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' eşleşmeyecektir\n\n-- PostgreSQL Büyük/küçük harf duyarsız arama:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- 'Alice', 'ALICE' ile eşleşir"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q33: What is a Stored Procedure and when is it used?",
          "tr": "Soru 33: Saklı Yordam (Stored Procedure) nedir ve test otomasyonunda ne zaman kullanılır?"
        },
        "answer": {
          "en": "A Stored Procedure is a prepared SQL code block that you can save in the database, allowing it to be reused with parameters. In test automation, they are highly useful to quickly seed complex datasets or run database resets in a single database call, reducing network overhead.",
          "tr": "Stored Procedure, veritabanı sunucusunda derlenip saklanan ve parametre kabul eden SQL kod bloklarıdır. Ağ trafiğini azaltır ve performans sağlar. QA test otomasyonunda, testler öncesinde karmaşık test verisi setleri oluşturmak veya test sonrası veritabanı sıfırlama işlemlerini tek bir komutla tetiklemek için kullanılabilir."
        },
        "code": {
          "en": "-- Call stored procedure from test automation:\nCALL SeedMockTestData(100, 'staging');",
          "tr": "-- Test otomasyonundan stored procedure çağır:\nCALL SeedMockTestData(100, 'staging');"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q34: What are wildcards in SQL and how do they work with LIKE?",
          "tr": "Soru 34: SQL'de LIKE ile kullanılan wildcards (joker karakterler) nelerdir?"
        },
        "answer": {
          "en": "The two most common wildcards used with the `LIKE` operator are: 1) `%`: Represents zero, one, or multiple characters (e.g. `A%` matches any string starting with A). 2) `_`: Represents a single character (e.g. `t_st` matches test, tast, tost).",
          "tr": "SQL LIKE ile en sık kullanılan iki joker karakter şunlardır: 1) `%`: Sıfır, bir veya daha fazla karakteri temsil eder (Örn: `A%` -> A ile başlayanlar). 2) `_`: Tam olarak tek bir karakteri temsil eder (Örn: `T_st` -> Test, Tast vb.)."
        },
        "code": {
          "en": "-- Matches: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Matches: 'Test', 'Tast', 'Tost' (exactly 4 characters):\nSELECT * FROM tests WHERE title LIKE 'T_st';",
          "tr": "-- Şunlarla eşleşir: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Şunlarla eşleşir: 'Test', 'Tast', 'Tost' (tam olarak 4 karakter):\nSELECT * FROM tests WHERE title LIKE 'T_st';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q35: How can you count the number of NULL values in a column?",
          "tr": "Soru 35: Bir sütundaki NULL değerlerin sayısını nasıl bulursunuz?"
        },
        "answer": {
          "en": "Standard `COUNT(column_name)` ignores NULL values. To count NULLs, you must either count all records matching a `WHERE column IS NULL` filter, or use a conditional aggregation like `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)`.",
          "tr": "`COUNT(column_name)` fonksiyonu NULL değerleri saymaz, sadece NULL olmayanları sayar. Bu yüzden NULL değerleri saymak için `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)` veya `COUNT(*)` ile filtreyi birleştirip `WHERE column IS NULL` koşulunu kullanmalıyız."
        },
        "code": {
          "en": "-- Option 1: Simple filter\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Option 2: Conditional aggregation (useful when counting other metrics too):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;",
          "tr": "-- Seçenek 1: Basit filtre\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Seçenek 2: Koşullu toplama (diğer metrikleri de sayarken kullanışlıdır):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;"
        }
      },
      {
        "type": "subheading",
        "text": {
          "tr": "🔴 İleri Seviye Sorular",
          "en": "🔴 Advanced Questions"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q36: What is the difference between COALESCE and NULLIF?",
          "tr": "Soru 36: COALESCE ve NULLIF fonksiyonları arasındaki fark nedir?"
        },
        "answer": {
          "en": "`COALESCE(val1, val2, ...)` returns the first non-NULL value in the list (used for default fallbacks). `NULLIF(val1, val2)` returns NULL if the two arguments are equal, otherwise it returns the first value (used to prevent division-by-zero errors).",
          "tr": "`COALESCE(val1, val2, ...)` verilen parametreler arasından NULL olmayan ilk değeri döndürür (varsayılan değer sağlamak için kullanılır). `NULLIF(val1, val2)` ise iki değer birbirine eşitse NULL, eşit değilse ilk değeri döndürür (bölme işlemlerinde sıfıra bölme hatasını önlemek için kullanılır)."
        },
        "code": {
          "en": "-- COALESCE: Fallback to 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Prevent division by zero (turns 0 duration to NULL, rendering avg division safe)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;",
          "tr": "-- COALESCE: Son çare olarak 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Sıfıra bölmeyi engelle (0 süreyi NULL yapar, böylece avg bölmesi güvenli olur)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q37: Can you use a SELECT alias in a GROUP BY clause? Why or why not?",
          "tr": "Soru 37: SELECT alias'larını GROUP BY içinde kullanabilir miyiz? Neden?"
        },
        "answer": {
          "en": "In standard SQL, no. Because the GROUP BY clause is evaluated BEFORE the SELECT clause, the alias does not exist yet. However, engines like MySQL, PostgreSQL, and SQLite allow it as an extension. For ANSI SQL compliance, always use the raw column names in GROUP BY.",
          "tr": "Standart SQL'e göre hayır. Çünkü GROUP BY mantıksal çalışma sırasında SELECT'ten ÖNCE çalıştırılır. Ancak PostgreSQL, MySQL ve SQLite gibi birçok modern veritabanı motoru buna esneklik sağlayarak alias kullanımına izin verir. Yine de standart SQL uyumluluğu için ham sütun adlarını veya ifadeleri kullanmak en güvenli yoldur."
        },
        "code": {
          "en": "-- Might fail in strict ANSI SQL databases:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standard compliant way:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);",
          "tr": "-- Katı ANSI SQL veritabanlarında başarısız olabilir:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standartlara uygun yol:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q38: What is a Non-Repeatable Read and under what conditions does it occur?",
          "tr": "Soru 38: Tekrarlanamayan Okuma (Non-Repeatable Read) nedir ve hangi koşulda ortaya çıkar?"
        },
        "answer": {
          "en": "A Non-Repeatable Read happens when a transaction reads the same row twice but gets different data because another committed transaction modified that row in between. This occurs under the 'Read Committed' isolation level and is prevented under 'Repeatable Read' using snapshots.",
          "tr": "Aynı transaction (işlem) içinde aynı sorgu iki kez çalıştırıldığında, aradaki sürede başka bir transaction'ın veriyi güncelleyip COMMIT etmesi nedeniyle ikinci sorgunun farklı sonuç dönmesi durumudur. 'Read Committed' izolasyon seviyesinde bu durum yaşanabilir, 'Repeatable Read' seviyesinde ise snapshot kullanıldığı için engellenir."
        },
        "code": {
          "en": "-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- Returns $1000\n\n-- Transaction B (concurrent):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- Returns $800! (Non-repeatable read)",
          "tr": "-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- $1000 döndürür\n\n-- Transaction B (eşzamanlı):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- $800 döndürür! (Non-repeatable read)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q39: What does EXPLAIN do and how do you read its output?",
          "tr": "Soru 39: EXPLAIN komutu ne işe yarar ve bir QA otomasyon mühendisi için neden önemlidir?"
        },
        "answer": {
          "en": "EXPLAIN displays the execution plan generated by the database query optimizer. It shows index lookups, join orders, and estimated rows scanned. For QA automation, it is the primary debugging tool to optimize slow tests caused by sub-optimal DB queries triggering full-table scans.",
          "tr": "EXPLAIN, veritabanı motorunun bir sorguyu çalıştırırken izleyeceği yolu (Execution Plan) gösterir. Hangi indexlerin kullanılacağını, kaç satırın taranacağını (Scan) ve tabloların birleştirilme sırasını raporlar. QA otomasyon mühendisleri için, yavaş koşan testlerdeki veritabanı sorgularının performans dar boğazlarını (örn: Full Table Scan) bulmak için en önemli araçtır."
        },
        "code": {
          "en": "-- Run EXPLAIN:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- Look for \"scan type\" (e.g. 'ALL' is slow table scan, 'const' or 'ref' is fast index scan)",
          "tr": "-- EXPLAIN çalıştır:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- \"Tarama türü\"ne bakın (ör. 'ALL' yavaş tablo taramasıdır, 'const' veya 'ref' hızlı indeks taramasıdır)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q40: Explain the difference between Read Committed and Repeatable Read isolation levels.",
          "tr": "Soru 40: Read Committed ile Repeatable Read izolasyon seviyeleri arasındaki temel fark nedir?"
        },
        "answer": {
          "en": "Read Committed takes a new data snapshot for each query statement inside the transaction, allowing concurrent updates to be read if committed. Repeatable Read locks the snapshot at the transaction start, ensuring the exact same values are read throughout the entire transaction session.",
          "tr": "Read Committed seviyesinde, bir sorgu sadece sorgunun başladığı anda commit edilmiş verileri okur; işlem içindeki her SELECT yeni bir snapshot alır. Repeatable Read seviyesinde ise, işlem içindeki ilk SELECT sorgusunun başladığı andaki snapshot korunur; işlem sonlanana kadar aynı satırlar hep aynı değeri döner, başka işlemler commit etse bile değişiklik görülmez."
        },
        "code": {
          "en": "-- Read Committed: Sees committed changes mid-transaction.\n-- Repeatable Read: Read values are guaranteed not to change until rollback/commit.",
          "tr": "-- Read Committed: Transaction ortasında commited edilmiş değişiklikleri görür.\n-- Repeatable Read: Okunan değerlerin rollback/commit olana kadar değişmeyeceği garanti edilir."
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q41: What is a Phantom Read and how does Serializable isolation prevent it?",
          "tr": "Soru 41: Phantom Read (Hayalet Okuma) nedir ve Serializable seviyesi bunu nasıl önler?"
        },
        "answer": {
          "en": "A Phantom Read occurs when a transaction queries a range of rows, and another transaction inserts a NEW row into that range and commits. Re-running the query reveals a 'phantom' row. Serializable isolation prevents this by placing Range Locks on the index, blocking inserts until the transaction finishes.",
          "tr": "Phantom Read, bir transaction içinde bir filtreye uyan satırlar sorgulanırken, araya giren başka bir transaction'ın YENİ satır ekleyip commit etmesi sonucu, ilk transaction aynı sorguyu tekrar attığında daha önce olmayan yeni 'hayalet' satırlarla karşılaşması durumudur. Serializable seviyesi, aralık kilitleri (range locks) kullanarak bu aralığa yeni satır eklenmesini tamamen bloke ederek bunu önler."
        },
        "code": {
          "en": "-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 3 rows\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 4 rows! (Phantom read)",
          "tr": "-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 3 satır döndürür\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 4 satır döndürür! (Phantom read)"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q42: What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
          "tr": "Soru 42: ROW_NUMBER(), RANK() ve DENSE_RANK() window fonksiyonları arasındaki fark nedir?"
        },
        "answer": {
          "en": "All three assign ranks. Difference lies in handling tied values: 1) `ROW_NUMBER()` ignores ties and assigns sequential numbers (1, 2, 3). 2) `RANK()` gives tied rows the same rank, leaving gaps afterwards (1, 1, 3). 3) `DENSE_RANK()` gives tied rows the same rank but leaves no gaps (1, 1, 2).",
          "tr": "Üçü de satırları sıralamak için numara verir. Fark eşit değerlerde (ties) ortaya çıkar: 1) `ROW_NUMBER()` eşitliğe bakmaksızın ardışık benzersiz numaralar verir (1, 2, 3). 2) `RANK()` eşit değerlere aynı numarayı verir ama sonrasında sıra atlar (1, 1, 3). 3) `DENSE_RANK()` eşit değerlere aynı numarayı verir ama sıra atlamaz (1, 1, 2)."
        },
        "code": {
          "en": "-- Example output for tied durations (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2",
          "tr": "-- Eşit süreler için örnek çıktı (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q43: What is a Recursive CTE and when would you use it?",
          "tr": "Soru 43: Özyinelemeli CTE (Recursive CTE) nedir ve ne zaman kullanılır?"
        },
        "answer": {
          "en": "A Recursive CTE is a subquery that references its own name, executing iteratively until a termination condition is met. It is typically used to traverse hierarchical or tree-structured database records like manager-employee org charts, category folders, or dependency trees.",
          "tr": "Kendi kendini referans alan ve bir durdurma koşuluna kadar döngü şeklinde çalışan CTE türüdür. Genellikle hiyerarşik veri yapılarını (Örn: organizasyon şemaları, kategori ağaçları, parça listeleri) veya grafik yollarını sorgulamak için kullanılır. QA testlerinde ağaç yapısındaki verilerin doğruluğunu kontrol etmek için idealdir."
        },
        "code": {
          "en": "-- Traverse manager-employee tree recursively:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;",
          "tr": "-- Yönetici-çalışan ağacını özyinelemeli (recursive) olarak dolaş:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor (Başlangıç noktası)\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q44: What is a database deadlock and how does it happen?",
          "tr": "Soru 44: Veritabanında Deadlock (Kilitlenme) nedir ve otomasyon testlerinizde bu durumla karşılaşırsanız ne yaparsınız?"
        },
        "answer": {
          "en": "A deadlock occurs when two or more transactions hold locks on resources the others need, creating a circular dependency where neither can proceed. The DB engine aborts one transaction to break the loop. In test runs: 1) Isolate test data. 2) Always lock/update resources in the exact same order. 3) Implement automatic database transaction retries.",
          "tr": "İki veya daha fazla transaction'ın, birbirlerinin kilitlediği (lock) kaynakları beklemesi ve bu nedenle sonsuz döngüye girip kilitlenmesi durumudur. Veritabanı motoru bunu algılar ve birini feda ederek hata fırlatır (rollback). Testlerde paralelleştirmeden kaynaklı deadlock oluşursa: 1) Test verilerini izole edin (farklı user'lar kullanın). 2) Güncelleme sorgularını her zaman aynı sırayla çalıştırın. 3) Otomatik retry (tekrar deneme) mekanizmaları kurun."
        },
        "code": {
          "en": "-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts",
          "tr": "-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q45: Explain B-Tree vs Hash index.",
          "tr": "Soru 45: B-Tree ve Hash Index arasındaki temel fark nedir? Hangisi ne zaman tercih edilmelidir?"
        },
        "answer": {
          "en": "B-Tree indexes store data in a balanced tree structure, keeping elements sorted. They support equality (`=`) and range queries (`>`, `<`, `BETWEEN`). Hash indexes use hash tables and only support exact equality checks (`=`) with O(1) complexity, rendering them useless for range filters.",
          "tr": "B-Tree indexleri verileri dengeli bir ağaç yapısında sıralı tutar; `=`, `<` , `>`, `BETWEEN` ve range (aralık) sorgularını destekler. Hash indexleri ise bir hash tablosu kullanır ve SADECE `=` (birebir eşitlik) sorgularını çok hızlı yanıtlar; büyüktür/küçüktür veya aralık sorgularını desteklemez. Çoğu ilişkisel DB varsayılan olarak B-Tree kullanır."
        },
        "code": {
          "en": "-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;",
          "tr": "-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q46: What is the difference between Clustered and Non-Clustered indexes?",
          "tr": "Soru 46: Kümeli (Clustered) ve Kümesiz (Non-Clustered) index arasındaki fark nedir?"
        },
        "answer": {
          "en": "A Clustered index dictates the physical sorting order of rows on disk (only one allowed per table, usually the Primary Key). A Non-Clustered index is a separate structure containing copy columns and pointers linking back to the physical rows (multiple allowed per table, like a book index).",
          "tr": "Clustered index, tablonun fiziksel satırlarının diskteki sıralamasını belirler (kitabın kendisi gibidir; her tabloda sadece 1 tane olabilir, genelde Primary Key'dir). Non-clustered index ise veriden ayrı bir yapıdır ve satırların fiziksel adreslerine işaret eden işaretçiler (pointers) tutar (kitabın arkasındaki dizin gibidir; tablo başına çok sayıda oluşturulabilir)."
        },
        "code": {
          "en": "-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);",
          "tr": "-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q47: What is a database trigger and what are its risks in test automation?",
          "tr": "Soru 47: Veritabanı Tetikleyicileri (Triggers) nedir? Test otomasyonu için ne gibi riskler barındırır?"
        },
        "answer": {
          "en": "A database trigger is a stored program that fires automatically in response to DML operations on a table. Risks for QA: 1) They create hidden side-effects not documented in the test code, leading to flaky runs. 2) Finding failures is harder as trigger stack traces might not bubbled up to the test logger. 3) They can interfere with test cleanup scripts.",
          "tr": "Trigger, bir tabloda INSERT, UPDATE veya DELETE yapıldığında otomatik çalışan veritabanı kodlarıdır. QA otomasyonu için riskleri: 1) 'Gizli' yan etkilere yol açarlar; otomasyon kodunda hata olmasa da trigger arka planda hata fırlatıp testi çökertebilir. 2) Hata analizi zordur, loglarda trigger adımları görünmeyebilir. 3) Test verisi temizleme süreçlerini bozabilirler. Mümkünse test ortamlarında trigger'ları simüle etmek yerine kapatmak veya izole etmek tercih edilir."
        },
        "code": {
          "en": "-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;",
          "tr": "-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q48: How do you optimize a query that is performing a Full Table Scan?",
          "tr": "Soru 48: EXPLAIN planında 'Full Table Scan' (Tüm Tablo Taraması) gördüğünüz yavaş bir sorguyu nasıl optimize edersiniz?"
        },
        "answer": {
          "en": "1) Add an index on the column used in the WHERE or JOIN conditions. 2) Re-run EXPLAIN to verify if the engine uses the index. 3) Avoid wrapping index columns in functions (e.g. use `WHERE date >= '2024-01-01'` instead of `WHERE YEAR(date) = 2024`) as functions disable indexing. 4) Note that if the table is tiny, the engine might bypass the index deliberately.",
          "tr": "1) WHERE ve JOIN koşulundaki sütuna index ekleyin. 2) İndex'in gerçekten kullanılıp kullanılmadığını doğrulamak için EXPLAIN planını tekrar kontrol edin. 3) Sütunun bir fonksiyon içine sarılmadığından emin olun (Örn: `WHERE YEAR(date) = 2024` yerine `WHERE date >= '2024-01-01'`). Fonksiyonlar index kullanımını engeller. 4) Tablo çok küçükse veritabanı motorunun index kullanmayı bilerek reddetmiş olabileceğini unutmayın."
        },
        "code": {
          "en": "-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';",
          "tr": "-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q49: How do you handle schema migrations (e.g. Liquibase or Flyway) in a QA automation pipeline?",
          "tr": "Soru 49: QA otomasyon pipeline'larında veritabanı şema göçlerini (schema migrations - Flyway/Liquibase) nasıl yönetmeliyiz?"
        },
        "answer": {
          "en": "In CI/CD pipelines, schema migrations must run before automated tests execute. Steps: 1) Spin up a clean test DB container (e.g. using Testcontainers or Docker Compose). 2) Run Flyway/Liquibase update commands against the database. 3) Verify successful migration, then kick off the automated test execution suite. This ensures tests align with active schema code.",
          "tr": "QA pipeline'ında testler koşmadan önce, veritabanı şemasını en güncel sürüme taşımak (migration) kritik önem taşır. Adımlar: 1) Test veritabanı konteynerini (Docker) ayağa kaldır. 2) Flyway/Liquibase komutunu çalıştırıp şemayı test DB'ye uygula. 3) Şema başarılı göç ettikten sonra test scriptlerini koştur. Bu sayede testler her zaman en güncel DB yapısıyla çalışır."
        },
        "code": {
          "en": "# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update",
          "tr": "# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update"
        }
      },
      {
        "type": "qa",
        "question": {
          "en": "Q50: What is the N+1 query problem and how do you detect it in QA test automation?",
          "tr": "Soru 50: N+1 sorgu problemi nedir ve QA test otomasyonunda nasıl tespit edilir?"
        },
        "answer": {
          "en": "The N+1 problem: code runs 1 query to get N parent records, then fires N more queries for each child separately. Example: 100 orders + 100 item queries = 101 DB round-trips instead of 1 JOIN. Detect in QA: 1) Enable SQL query logging in test env. 2) Assert page load triggers fewer queries than a threshold. 3) Use Hibernate stats or p6spy to count queries per test. Java analogy: calling a DB method inside a for-each loop over a list.",
          "tr": "N+1 problemi: kod önce N parent kaydı getirip ardından her biri için N sorgu daha koşar — toplam N+1 DB turu. Örnek: 100 sipariş + 100 ürün sorgusu = 101 sorgu (1 JOIN yeterli olurdu). QA tespit yöntemleri: 1) Test ortamında SQL loglama etkinleştir. 2) Sayfa yüklemesinin belirli sorgu limitini aşmadığını assert et. 3) Hibernate istatistikleri veya p6spy ile test başına sorgu sayısını say. Java analogu: for-each döngüsü içinde DB metodu çağırmak."
        },
        "code": {
          "en": "-- N+1 (kötü): 1 ana sorgu + döngüde N alt sorgu\nSELECT * FROM orders;  -- kodda: SELECT * FROM items WHERE order_id = ?\n\n-- Düzeltme: tek JOIN (1 sorgu)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;",
          "tr": "-- N+1 (kötü): 1 ana sorgu + döngüde N alt sorgu\nSELECT * FROM orders;  -- kodda: SELECT * FROM items WHERE order_id = ?\n\n-- Düzeltme: tek JOIN (1 sorgu)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;"
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Yukarıdaki sorguda `LEFT JOIN bugs` kullanılıyor, `JOIN` (INNER JOIN) değil. Bunun sonuçlar üzerindeki etkisi nedir?",
          "en": "The query above uses `LEFT JOIN bugs`, not a plain `JOIN` (INNER JOIN). What effect does this have on the results?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Hiçbir testers satırı dönmez",
              "en": "No testers rows are returned at all"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Hiç bug'ı olmayan tester'lar da sonuçta görünür (bug sayısı 0 olur); INNER JOIN onları tamamen hariç tutardı",
              "en": "Testers with zero bugs still appear in the result (with a bug count of 0); an INNER JOIN would exclude them entirely"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Sadece bug'ı olan tester'lar görünür, aynı INNER JOIN gibi",
              "en": "Only testers with bugs appear, same as an INNER JOIN"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Sorgu performansını artırır, sonuçları değiştirmez",
              "en": "It only improves performance, does not change results"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "LEFT JOIN, sol tablodaki (testers) TÜM satırları tutar; sağ tabloda (bugs) eşleşme yoksa o satırların alanları NULL olur (COUNT(b.id) bu durumda 0 sayar). INNER JOIN (sade JOIN) ise sadece İKİ tarafta da eşleşme olan satırları döndürür — hiç bug açmamış bir tester INNER JOIN sonucunda tamamen kaybolurdu. Bu fark, \"hiç hatası olmayan testerlar dahil\" raporlama gibi gerçek QA senaryolarında kritiktir.",
          "en": "LEFT JOIN keeps ALL rows from the left table (testers); if there is no match in the right table (bugs), those fields become NULL (so COUNT(b.id) counts as 0). An INNER JOIN (plain JOIN) only returns rows where BOTH sides match — a tester with zero bugs would disappear entirely from an INNER JOIN result. This distinction matters in real QA reporting scenarios like \"include testers with zero bugs\"."
        },
        "retryQuestion": {
          "question": {
            "tr": "Bir LEFT JOIN sorgusunda `WHERE bugs.severity = 'HIGH'` koşulu eklersen, bunun sonuçlar üzerinde fark etmediğin bir etkisi olabilir. Bu etki nedir?",
            "en": "If you add `WHERE bugs.severity = 'HIGH'` to a LEFT JOIN query, it can have an effect on results you might not expect. What is it?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "Hiçbir etkisi yok, LEFT JOIN davranışı tamamen korunur",
                "en": "No effect at all, LEFT JOIN behavior is fully preserved"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "WHERE koşulu NULL satırları (bug'ı olmayan tester'lar) filtreler, LEFT JOIN'i fiilen bir INNER JOIN gibi davranmaya zorlar",
                "en": "The WHERE clause filters out the NULL rows (testers with no bugs), effectively forcing the LEFT JOIN to behave like an INNER JOIN"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sorgu syntax hatası verir",
                "en": "The query throws a syntax error"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "LEFT JOIN otomatik olarak RIGHT JOIN'e dönüşür",
                "en": "The LEFT JOIN automatically converts to a RIGHT JOIN"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "WHERE, JOIN tamamlandıktan SONRA uygulanır. Bug'ı olmayan bir tester'ın `bugs.severity` alanı NULL'dur, ve `NULL = 'HIGH'` her zaman UNKNOWN (yanlış) değerlendirilir — bu yüzden o satır WHERE tarafından elenir. Sonuç, LEFT JOIN'in \"sıfır eşleşmeli satırları da tut\" amacının fiilen iptal olmasıdır. Bu koşulu LEFT JOIN'i bozmadan filtrelemek istiyorsan, WHERE yerine ON clause'una taşımalısın.",
            "en": "WHERE is applied AFTER the join completes. A tester with no bugs has `bugs.severity` as NULL, and `NULL = 'HIGH'` always evaluates to UNKNOWN (falsy) — so that row gets filtered out by WHERE. The net effect is that the LEFT JOIN's purpose of keeping zero-match rows gets effectively cancelled. To filter like this without breaking the LEFT JOIN, you would move that condition into the ON clause instead of WHERE."
          }
        }
      }
    ]
  },
  {
    "title": "🛠️ DBeaver — Görsel Veritabanı Yöneticisi",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🛠️",
        "content": {
          "tr": "DBeaver, veritabanına bağlanmak için görsel bir kontrol paneli — Excel açar gibi açar, tablolara tıklar, SQL yazar çalıştırırsın. Terminal komutlarına gerek yok. Next.js projenin arkasındaki PostgreSQL'i DBeaver'da görmek, dosya yöneticisinde klasör açmak kadar kolay.",
          "en": "DBeaver is like a visual control panel for your database — open it like Excel, click on tables, write and run SQL instantly. No terminal commands needed. Seeing the PostgreSQL database behind your Next.js project in DBeaver is as easy as opening a folder in a file manager."
        }
      },
      {
        "type": "heading",
        "text": "DBeaver Nedir? / What is DBeaver?"
      },
      {
        "type": "text",
        "content": {
          "tr": "DBeaver, MySQL, PostgreSQL, SQLite, Oracle ve SQL Server dahil **80+ veritabanını** destekleyen **tamamen ücretsiz açık kaynaklı** bir veritabanı yönetim aracıdır. Java'daki ücretli DataGrip veya MySQL Workbench'in ücretsiz alternatifi olarak düşün. Java'da JDBC ile komut satırından sorgu çalıştırmak yerine, DBeaver ile aynı işi görsel arayüzde yaparsın: tablo yapılarına tıkla, FK ilişkilerini gör, sorgu sonuçlarını spreadsheet'te incele.",
          "en": "DBeaver is a **100% free, open-source** database management tool supporting **80+ databases** including MySQL, PostgreSQL, SQLite, Oracle, and SQL Server. Think of it as the free alternative to the paid DataGrip or MySQL Workbench. In Java you ran queries from the command line via JDBC — DBeaver does the same visually: click table structures, see FK relationships, view results in a spreadsheet."
        }
      },
      {
        "type": "grid",
        "cols": 3,
        "items": [
          {
            "icon": "🆓",
            "label": "Tamamen Ücretsiz",
            "desc": "Community Edition %100 ücretsiz ve açık kaynak. Lisans ücreti yok, abonelik yok."
          },
          {
            "icon": "🗄️",
            "label": "80+ Veritabanı",
            "desc": "MySQL, PostgreSQL, SQLite, Oracle, SQL Server, MongoDB, Redis ve daha fazlası."
          },
          {
            "icon": "🎨",
            "label": "Görsel Schema Editörü",
            "desc": "Tablolara tıkla-gez, ER diyagramları, görsel foreign key tarayıcı."
          },
          {
            "icon": "⚡",
            "label": "SQL Editör + Autocomplete",
            "desc": "Syntax highlight, otomatik tamamlama, sorgu geçmişi ve explain plan."
          },
          {
            "icon": "📊",
            "label": "Veri Dışa Aktarma",
            "desc": "CSV, Excel, JSON, SQL formatlarında dışa aktar. Dosyadan içe aktar."
          },
          {
            "icon": "🔐",
            "label": "SSH Tüneli",
            "desc": "SSH tüneli ile uzak production veritabanlarına güvenli, şifreli bağlantı."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Kurulum / Installation"
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "1️⃣",
            "label": "İndir",
            "desc": "dbeaver.io → Community Edition → İşletim sisteminize uygun paketi seç"
          },
          {
            "icon": "2️⃣",
            "label": "Kur",
            "desc": "Windows: .exe çalıştır · macOS: .dmg sürükle · Linux: .deb veya snap"
          },
          {
            "icon": "3️⃣",
            "label": "Aç",
            "desc": "İlk açılışta yerleşik Java (JRE) indirir — internet bağlantısı gerekli"
          },
          {
            "icon": "4️⃣",
            "label": "Doğrula",
            "desc": "Help → About DBeaver → versiyon bilgisi görünmeli"
          }
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# Windows kurulum (winget paket yöneticisi)\nwinget install dbeaver.dbeaver\n\n# macOS kurulum (Homebrew)\nbrew install --cask dbeaver-community\n\n# Ubuntu/Debian kurulum\nwget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -\necho 'deb https://dbeaver.io/debs/dbeaver-ce /' | sudo tee /etc/apt/sources.list.d/dbeaver.list\nsudo apt update && sudo apt install dbeaver-ce\n\n# Linux Snap (en kolay yol)\nsnap install dbeaver-ce\n\n# Sürüm doğrulama: Help → About DBeaver menüsünden versiyon görünür"
      },
      {
        "type": "callout",
        "color": "blue",
        "emoji": "💡",
        "title": {
          "tr": "İlk Bağlantı İpucu",
          "en": "First Connection Tip"
        },
        "content": {
          "tr": "DBeaver açılınca 'Yeni Bağlantı Sihirbazı' görünür. **SQLite** için mevcut bir `.db` dosyasına işaret etmen yeterli — sunucu gerekmez. **PostgreSQL/MySQL** için önce sunucunun çalıştığından emin ol: `pg_isready` veya `mysqladmin ping` bunu doğrular.",
          "en": "DBeaver shows 'New Connection Wizard' on first launch. For **SQLite** just point to an existing `.db` file — no server needed. For **PostgreSQL/MySQL** confirm the server is running first: `pg_isready` or `mysqladmin ping` will verify this."
        }
      },
      {
        "type": "heading",
        "text": "Sıfırdan Veritabanı + Schema Oluşturma / Create DB & Schema"
      },
      {
        "type": "text",
        "content": {
          "tr": "DBeaver'da sıfırdan bir veritabanı oluşturmak **4 adımda** tamamlanır. Java'da Hibernate ile database schema'sını başlatmak gibi — ama terminal veya XML konfigürasyonu olmadan.",
          "en": "Creating a database from scratch in DBeaver takes **4 steps**. This is the equivalent of bootstrapping a database schema with Hibernate in Java — but without terminal commands or XML configuration files."
        }
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "🔌",
            "label": "1. Bağlantı Kur",
            "desc": "Database Navigator (sol) → + simgesi → Veritabanı türünü seç → Host/Port/User/Password doldur"
          },
          {
            "icon": "🗃️",
            "label": "2. Database Oluştur",
            "desc": "Bağlantıya sağ tık → Create → Database → İsim ver (örn: myapp_db)"
          },
          {
            "icon": "📋",
            "label": "3. SQL Schema Yaz",
            "desc": "SQL Editor aç (F3) → CREATE TABLE sorgularını yaz → Ctrl+Enter ile çalıştır"
          },
          {
            "icon": "✅",
            "label": "4. Doğrula",
            "desc": "Navigator'da tabloya çift tık → Data sekmesi → satırları grid'de gör"
          }
        ]
      },
      {
        "type": "code",
        "language": "sql",
        "code": "-- DBeaver SQL Editor'de çalıştır (F3 ile aç, Ctrl+Enter ile çalıştır)\n\n-- 1. Database oluştur (PostgreSQL için)\nCREATE DATABASE myapp_db;\n\n-- 2. Schema oluştur (Java'daki package gibi — namespace sağlar)\nCREATE SCHEMA IF NOT EXISTS app;\n\n-- 3. Kullanıcı tablosu\nCREATE TABLE app.users (\n  id         SERIAL       PRIMARY KEY,           -- otomatik artan birincil anahtar\n  email      VARCHAR(255) UNIQUE NOT NULL,        -- benzersiz ve zorunlu\n  name       VARCHAR(100) NOT NULL,               -- zorunlu alan\n  role       VARCHAR(20)  DEFAULT 'user',         -- varsayılan değer\n  created_at TIMESTAMP    DEFAULT NOW()           -- kayıt zamanı otomatik atanır\n);\n\n-- 4. Post tablosu (users ile foreign key ilişkisi)\nCREATE TABLE app.posts (\n  id         SERIAL       PRIMARY KEY,\n  title      VARCHAR(300) NOT NULL,\n  content    TEXT,\n  author_id  INT REFERENCES app.users(id) ON DELETE CASCADE, -- FK → users tablosu\n  published  BOOLEAN      DEFAULT false,\n  created_at TIMESTAMP    DEFAULT NOW()\n);\n\n-- 5. Test verisi ekle\nINSERT INTO app.users (email, name, role) VALUES\n  ('alice@example.com', 'Alice', 'admin'),\n  ('bob@example.com',   'Bob',   'user');\n\nINSERT INTO app.posts (title, content, author_id, published) VALUES\n  ('Hello World', 'İlk içerik', 1, true),\n  ('Taslak Yazı', NULL,         2, false);\n\n-- 6. JOIN ile ilişkili veriyi doğrula\nSELECT u.name, p.title, p.published\nFROM   app.users u\nJOIN   app.posts p ON p.author_id = u.id\nORDER  BY p.created_at DESC;"
      },
      {
        "type": "callout",
        "color": "green",
        "emoji": "🎨",
        "title": {
          "tr": "DBeaver ER Diyagramı",
          "en": "DBeaver ER Diagram"
        },
        "content": {
          "tr": "Tabloları oluşturduktan sonra: **Database Navigator'da veritabanına sağ tık → ER Diagram**. DBeaver, `users` ve `posts` arasındaki FK ilişkisini otomatik olarak görsel bir diyagram olarak render eder. Büyük projelerde tüm schema'yı anlamak için bu özelliği kullan.",
          "en": "After creating your tables: **right-click the database in Database Navigator → ER Diagram**. DBeaver automatically renders the FK relationship between `users` and `posts` as a visual diagram. Use this to understand the complete schema in large projects."
        }
      },
      {
        "type": "heading",
        "text": "Next.js + PostgreSQL Entegrasyonu / Integration"
      },
      {
        "type": "text",
        "content": {
          "tr": "Next.js uygulamanı veritabanına bağlamak için iki modern yaklaşım var: **1) pg (Direct Driver)** — ham SQL, tam kontrol, Java'da JDBC'ye karşılık gelir. **2) Prisma ORM** — type-safe, otomatik migration, Java'da Hibernate/JPA'ya karşılık gelir. İkisi de DBeaver'da oluşturduğun aynı veritabanına bağlanır.",
          "en": "There are two modern approaches to connect Next.js to the database: **1) pg (Direct Driver)** — raw SQL, full control, the equivalent of JDBC in Java. **2) Prisma ORM** — type-safe, auto-migrations, the equivalent of Hibernate/JPA in Java. Both connect to the same database you created in DBeaver."
        }
      },
      {
        "type": "grid",
        "cols": 4,
        "items": [
          {
            "icon": "🌐",
            "label": "Browser / Client",
            "desc": "fetch('/api/users') → HTTP isteği gönderir"
          },
          {
            "icon": "⚡",
            "label": "Next.js API Route",
            "desc": "/app/api/users/route.ts → isteği işler"
          },
          {
            "icon": "🔗",
            "label": "Driver / ORM",
            "desc": "pg (ham SQL) veya Prisma (ORM) — DB ile konuşur"
          },
          {
            "icon": "🗄️",
            "label": "PostgreSQL",
            "desc": "DBeaver ile yönetilen veritabanı"
          }
        ]
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Yaklaşım 1: pg paketi (ham SQL) — Java'daki JDBC gibi, tam kontrol\n// Kurulum: npm install pg @types/pg\n\n// lib/db.ts — tek connection pool (bağlantı havuzu) oluştur\nimport { Pool } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL, // .env.local'da tanımla\n  max: 10,                                    // maksimum eşzamanlı bağlantı\n});\n\nexport default pool;\n\n// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\nimport pool from '@/lib/db';\n\nexport async function GET() {\n  const result = await pool.query(\n    'SELECT id, name, email FROM app.users ORDER BY created_at DESC'\n  );\n  return NextResponse.json(result.rows);\n}\n\nexport async function POST(req: Request) {\n  const { name, email } = await req.json();\n  const result = await pool.query(\n    'INSERT INTO app.users (name, email) VALUES ($1, $2) RETURNING *',\n    [name, email]  // parametreli sorgu — SQL injection'a karşı güvenli\n  );\n  return NextResponse.json(result.rows[0], { status: 201 });\n}"
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Yaklaşım 2: Prisma ORM — Java'daki Hibernate/JPA gibi, type-safe\n// Kurulum: npm install prisma @prisma/client && npx prisma init\n\n// prisma/schema.prisma — şema TypeScript benzeri DSL ile yazılır\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  role      String   @default(\"user\")\n  posts     Post[]   // ilişki — User'ın Post listesi var\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String?\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  Int      // FK sütunu\n  published Boolean  @default(false)\n  createdAt DateTime @default(now())\n}\n\n// app/api/users/route.ts — Prisma ile\nimport { NextResponse } from 'next/server';\nimport { PrismaClient }  from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport async function GET() {\n  const users = await prisma.user.findMany({\n    include: { posts: { where: { published: true } } } // yayınlanmış post'ları dahil et\n  });\n  return NextResponse.json(users);\n}\n\n// Migration çalıştır (DBeaver'daki CREATE TABLE'a karşılık gelir)\n// npx prisma migrate dev --name init"
      },
      {
        "type": "table",
        "headers": [
          "Özellik / Feature",
          "pg (Raw SQL)",
          "Prisma ORM"
        ],
        "rows": [
          [
            "Öğrenme eğrisi",
            "SQL biliyorsan sıfır",
            "Prisma DSL öğren (~1 gün)"
          ],
          [
            "Type safety",
            "Manuel cast gerekir",
            "✅ Otomatik TypeScript tipleri"
          ],
          [
            "Migration yönetimi",
            "Elle SQL dosyası yaz",
            "✅ npx prisma migrate dev"
          ],
          [
            "Sorgu performansı",
            "Tam kontrol, optimize et",
            "Karmaşık JOIN'lerde dikkatli ol"
          ],
          [
            "DBeaver uyumu",
            "✅ Aynı DB'ye bağlanır",
            "✅ Prisma Studio da var"
          ],
          [
            "Java karşılığı",
            "JDBC",
            "Hibernate / JPA"
          ],
          [
            "Ne zaman seç",
            "Karmaşık SQL, tam kontrol",
            "Hızlı başlangıç, type-safe API"
          ]
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# .env.local dosyası (git'e EKLEME — .gitignore'a ekle!)\n\n# PostgreSQL bağlantı URL formatı\nDATABASE_URL=\"postgresql://kullanici:sifre@localhost:5432/myapp_db?schema=app\"\n\n# SQLite için (geliştirme ortamı — sunucu gerekmez)\n# DATABASE_URL=\"file:./dev.db\"\n\n# DBeaver bağlantı ayarları (aynı veritabanına bağlanır)\n# Host     : localhost\n# Port     : 5432  (PostgreSQL varsayılanı)\n# Database : myapp_db\n# Username : kullanici\n# Password : sifre\n# Schema   : app"
      },
      {
        "type": "quiz",
        "question": {
          "tr": "DBeaver'da bir tablonun içindeki verileri nasıl görürsün?",
          "en": "How do you view the data inside a table in DBeaver?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tabloya çift tık → Data sekmesi — tüm satırlar düzenlenebilir grid'de görünür",
              "en": "Double-click the table → Data tab — all rows appear in an editable grid"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Önce terminalde psql ile bağlanman gerekir",
              "en": "You must first connect via psql in the terminal"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tabloya sağ tık → Export Data → CSV oluştur",
              "en": "Right-click the table → Export Data → generate CSV"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "DBeaver tablo verilerini gösteremez, sadece schema yapısını gösterir",
              "en": "DBeaver cannot show table data, only schema structure"
            }
          }
        ],
        "correct": "a",
        "explanation": {
          "tr": "DBeaver'da tabloya çift tıklayınca Properties, Data ve ER Diagram sekmeleri açılır. **Data** sekmesi tüm satırları düzenlenebilir grid'de gösterir — inline düzenleyebilir, yeni satır ekleyebilir, silebilirsin. Sağ tık → Export Data ile CSV veya Excel'e aktarım yapılabilir.",
          "en": "Double-clicking a table in DBeaver opens Properties, Data, and ER Diagram tabs. The **Data** tab shows all rows in an editable grid — you can edit rows inline, add new rows, and delete them. Right-click → Export Data to export to CSV or Excel."
        }
      },
      {
        "type": "quiz",
        "question": {
          "tr": "Next.js'te veritabanı bağlantısı neden tek bir `Pool` (connection pool) üzerinden yapılmalıdır?",
          "en": "Why should the database connection in Next.js go through a single `Pool` (connection pool)?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "PostgreSQL aynı anda yalnızca 1 bağlantı kabul eder",
              "en": "PostgreSQL only accepts 1 connection at a time"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Her API isteğinde yeni bağlantı açmak pahalıdır — Pool bağlantıları yeniden kullanarak hızı artırır ve veritabanını limit aşımından korur",
              "en": "Opening a new connection per request is expensive — a Pool reuses connections, increasing speed and protecting the database from hitting max connection limits"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Pool sadece Prisma ile çalışır, pg ile çalışmaz",
              "en": "Pool only works with Prisma, not with pg"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "Pool yalnızca production ortamında gereklidir",
              "en": "A Pool is only necessary in production environments"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "Her HTTP isteğinde yeni TCP bağlantısı kurmak ~100-200ms overhead ekler ve veritabanının max connection limitine çarpılırsın. Connection Pool bağlantıları önceden hazır tutar ve istekler arasında paylaşır. Java'da HikariCP / DBCP bu yüzden standarttır — her istek için `DriverManager.getConnection()` çağırmak yerine pool'dan alınır.",
          "en": "Creating a new TCP connection per HTTP request adds ~100-200ms overhead and you can hit the database's max connection limit under load. A Connection Pool keeps connections pre-opened and shares them across requests. In Java, HikariCP / DBCP is standard for the same reason — instead of calling `DriverManager.getConnection()` per request, you borrow from the pool."
        }
      },
      {
        "type": "callout",
        "color": "green",
        "emoji": "✅",
        "title": {
          "tr": "DBeaver + Next.js Özet",
          "en": "DBeaver + Next.js Summary"
        },
        "content": {
          "tr": "1. **DBeaver kur** — Windows (winget), macOS (brew), Linux (snap)\n2. **Bağlantı kur** — SQLite için .db dosyası, PostgreSQL için host/port/user/db\n3. **Schema oluştur** — SQL Editor'de CREATE TABLE sorgularını çalıştır\n4. **Driver seç** — pg (JDBC gibi, tam kontrol) veya Prisma (Hibernate gibi, type-safe)\n5. **DATABASE_URL** yaz — .env.local'a ekle, git'e asla ekleme\n6. **DBeaver açık tut** — API'nin yaptığı değişiklikleri gerçek zamanlı izle",
          "en": "1. **Install DBeaver** — Windows (winget), macOS (brew), Linux (snap)\n2. **Create connection** — for SQLite use .db file, for PostgreSQL use host/port/user/db\n3. **Build schema** — run CREATE TABLE queries in SQL Editor\n4. **Choose driver** — pg (like JDBC, full control) or Prisma (like Hibernate, type-safe)\n5. **Set DATABASE_URL** — add to .env.local, never commit it\n6. **Keep DBeaver open** — watch the data changes your API makes in real time"
        }
      }
    ]
  }
];

export const sqlData = {
  en: { hero: enHero, tabs: enTabs, sections: finalEnSections },
  tr: { hero: trHero, tabs: trTabs, sections: finalTrSections },
};
