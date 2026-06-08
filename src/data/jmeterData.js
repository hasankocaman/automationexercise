export const jmeterData = {
  en: {
    hero: {
      title: '⚡ Apache JMeter',
      subtitle: 'Performance & Load Testing Tool',
      intro: 'Learn how to measure, analyse, and improve the performance of your web applications and APIs from scratch — no prior knowledge required.',
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Intermediate', '🚀 Advanced', '💼 Interview Q&A'],
    sections: [
      // ── 0. INTRODUCTION ──────────────────────────────────────────────────
      {
        title: '🎯 What is JMeter and Performance Testing?',
        blocks: [
          { type: 'text', content: 'Imagine your website works perfectly when only 5 people are using it. But what happens when 10,000 users visit at the same time — say during a flash sale? Does it crash? Slow down? This is exactly what performance testing answers.' },
          { type: 'text', content: 'Performance testing is the process of evaluating a system\'s speed, stability, and scalability under different load conditions. It is NOT about finding bugs in functionality — it\'s about finding how the system BEHAVES under load.' },
          { type: 'heading', text: 'Types of Performance Tests' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '📈', label: 'Load Testing', desc: 'Simulate expected number of users. "Can we handle 1,000 users?" — the most common type.' },
              { icon: '💥', label: 'Stress Testing', desc: 'Push beyond limits until the system breaks. Find the breaking point.' },
              { icon: '⚡', label: 'Spike Testing', desc: 'Sudden huge jump in users. "What if 5,000 users arrive in 10 seconds?"' },
              { icon: '📦', label: 'Volume Testing', desc: 'Test with large amounts of data. "What happens with 10 million DB records?"' },
              { icon: '⏳', label: 'Endurance Testing', desc: 'Run at moderate load for hours/days. Find memory leaks and slow degradation.' },
              { icon: '📊', label: 'Scalability Testing', desc: 'Does the system scale horizontally? "Adding 2 servers — does throughput double?"' },
            ]
          },
          { type: 'heading', text: 'What is Apache JMeter?' },
          { type: 'text', content: 'Apache JMeter is a free, open-source Java application specifically designed to load test and measure performance. Originally created in 1998 by Stefano Mazzocchi for web server testing, it has grown into the world\'s most widely used open-source performance testing tool.' },
          {
            type: 'list', icon: '✅',
            title: 'JMeter Key Features:',
            items: [
              '100% free and open-source (Apache License 2.0)',
              'Supports HTTP/S, REST, SOAP, FTP, JDBC, LDAP, SMTP, JMS and more',
              'Powerful GUI for test creation, Non-GUI for execution',
              'Distributed testing: one controller, multiple load generators',
              'Extensible via 600+ plugins',
              'Generates beautiful HTML reports automatically',
              'Runs on any OS (Windows, macOS, Linux) with Java',
            ]
          },
          { type: 'heading', text: 'JMeter vs Other Tools' },
          {
            type: 'table',
            headers: ['Tool', 'Language', 'GUI', 'Free', 'Best For'],
            rows: [
              ['JMeter', 'Java', '✅ Yes', '✅ Yes', 'Enterprise, many protocols'],
              ['Locust', 'Python', '❌ Web UI', '✅ Yes', 'Python teams, real user code'],
              ['k6', 'JavaScript', '❌ CLI', '✅ Yes', 'Developer-friendly, CI/CD'],
              ['Gatling', 'Scala/JS', '❌ CLI', '✅ Yes', 'High-performance, code-first'],
              ['LoadRunner', 'Various', '✅ Yes', '❌ Paid', 'Enterprise, strict compliance'],
            ]
          },
          { type: 'tip', content: 'JMeter is the safest choice for beginners and teams without a programming background. Its GUI makes test creation visual and intuitive.' },
          { type: 'heading', text: 'Real-World Use Cases' },
          {
            type: 'list', icon: '🔹',
            items: [
              'E-commerce: Test checkout flow under Black Friday traffic',
              'Banking: Ensure login and transfer APIs handle peak morning load',
              'Healthcare: Validate patient portal stays responsive at shift change',
              'Gaming: Stress-test game servers before launch',
              'Microservices: Identify which service is the bottleneck',
            ]
          },
        ],
      },

      // ── 1. INSTALLATION ──────────────────────────────────────────────────
      {
        title: '📦 Installation & First Launch',
        blocks: [
          { type: 'text', content: 'JMeter is a Java application, so Java must be installed first. The installation is simple: download, extract, run. No "install wizard" required.' },
          { type: 'heading', text: 'Step 1: Install Java (JDK 8+)' },
          { type: 'text', content: 'JMeter 5.x requires Java 8 or higher. Java 11 or 17 LTS is recommended.' },
          {
            type: 'code', code: `# Check if Java is installed (run in terminal / command prompt)
java -version

# Expected output:
openjdk version "17.0.9" 2023-10-17
OpenJDK Runtime Environment (build 17.0.9+9)

# If not installed, download from:
# https://adoptium.net  (free, open-source OpenJDK)
# or https://www.oracle.com/java/technologies/downloads/`
          },
          { type: 'heading', text: 'Step 2: Download JMeter' },
          {
            type: 'steps',
            items: [
              'Go to https://jmeter.apache.org/download_jmeter.cgi',
              'Under "Binaries", download apache-jmeter-X.X.zip (Windows) or apache-jmeter-X.X.tgz (macOS/Linux)',
              'Extract to a location like C:\\JMeter\\ or ~/Applications/jmeter/',
              'No installation needed — it\'s ready to run!',
            ]
          },
          { type: 'heading', text: 'Step 3: Launch JMeter GUI' },
          {
            type: 'code', code: `# Windows (double-click or run in cmd):
C:\\JMeter\\apache-jmeter-5.6\\bin\\jmeter.bat

# macOS / Linux:
cd ~/Applications/jmeter/apache-jmeter-5.6/bin
./jmeter.sh

# Or just double-click jmeter.bat (Windows) / jmeter (Mac/Linux)`
          },
          { type: 'info', content: 'The first launch may take 10-20 seconds. JMeter opens with an empty Test Plan. The GUI is for building tests only — never run large tests in GUI mode (use CLI instead).' },
          { type: 'heading', text: 'JMeter GUI Overview' },
          {
            type: 'list', icon: '📌',
            title: 'Key areas of the JMeter interface:',
            items: [
              { label: 'Test Plan (tree on left)', desc: 'Hierarchical view of your test components' },
              { label: 'Properties panel (right)', desc: 'Configure the selected element' },
              { label: 'Run button (green ▶)', desc: 'Start the test' },
              { label: 'Status bar (bottom)', desc: 'Active threads, elapsed time, error %' },
              { label: 'Log panel (bottom)', desc: 'JMeter logs and errors' },
            ]
          },
          { type: 'heading', text: 'Set JAVA_HOME (if needed)' },
          {
            type: 'code', code: `# Windows (set in System Environment Variables):
JAVA_HOME = C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.9.9-hotspot

# macOS / Linux (add to ~/.bash_profile or ~/.zshrc):
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH

# Verify:
echo $JAVA_HOME`
          },
          { type: 'tip', content: 'Create a shortcut on your desktop to jmeter.bat/jmeter.sh for quick access. You\'ll be opening JMeter often!' },
        ],
      },

      // ── 2. INTERMEDIATE ──────────────────────────────────────────────────
      {
        title: '📚 Core Concepts & Building Your First Test',
        blocks: [
          { type: 'text', content: 'JMeter tests are organized in a hierarchy. Understanding this hierarchy is the foundation of everything else.' },
          { type: 'heading', text: 'Test Plan Hierarchy' },
          {
            type: 'code', code: `Test Plan
└── Thread Group              ← simulates virtual users
    ├── HTTP Request Sampler  ← what to test
    ├── HTTP Header Manager   ← set headers (e.g. auth)
    ├── CSV Data Set Config   ← load test data from file
    ├── Regular Expr. Extractor ← extract dynamic values
    ├── Response Assertion    ← verify responses
    └── Listeners             ← collect & display results
        ├── View Results Tree
        └── Aggregate Report`
          },
          { type: 'heading', text: '1. Thread Group — Virtual Users' },
          { type: 'text', content: 'A Thread Group defines how many virtual users (threads) run, how fast they start, and how many times they repeat. It is the heart of every JMeter test.' },
          {
            type: 'list', icon: '🔸',
            title: 'Thread Group parameters:',
            items: [
              { label: 'Number of Threads', desc: 'Total virtual users. Start with 10-50 while building the test.' },
              { label: 'Ramp-Up Period (sec)', desc: 'How many seconds to start all users. 10 users, 10 sec ramp-up = 1 user/second.' },
              { label: 'Loop Count', desc: 'How many times each user repeats the requests. Use -1 for infinite (with duration).' },
              { label: 'Duration (sec)', desc: 'Total test run time. Better than Loop Count for sustained tests.' },
            ]
          },
          {
            type: 'tip', content: 'For a 10-minute test with 100 users ramping up over 60 seconds: Number of Threads=100, Ramp-Up=60, Duration=600.'
          },
          { type: 'heading', text: '2. HTTP Request Sampler' },
          { type: 'text', content: 'The HTTP Request Sampler is what sends the actual HTTP request. Add it with: Right-click Thread Group → Add → Sampler → HTTP Request' },
          {
            type: 'list', icon: '📋',
            title: 'Key fields to configure:',
            items: [
              { label: 'Protocol', desc: 'http or https' },
              { label: 'Server Name', desc: 'e.g. api.example.com (no http://)' },
              { label: 'Port', desc: '80 (http), 443 (https), or your custom port' },
              { label: 'Method', desc: 'GET, POST, PUT, DELETE, PATCH' },
              { label: 'Path', desc: 'e.g. /api/users or /login' },
              { label: 'Body Data', desc: 'JSON body for POST/PUT requests' },
            ]
          },
          {
            type: 'code', code: `# Example: Testing a REST API POST request
# In HTTP Request Sampler:
#   Method: POST
#   Path:   /api/v1/login
#   Body Data (JSON):

{
  "username": "testuser",
  "password": "Password123"
}

# Add HTTP Header Manager with:
#   Content-Type: application/json
#   Accept: application/json`
          },
          { type: 'heading', text: '3. CSV Data Set Config — Parameterization' },
          { type: 'text', content: 'Real tests don\'t use the same username 100 times. CSV Data Set Config lets you read test data from a CSV file and use different values for each virtual user.' },
          {
            type: 'code', code: `# 1. Create a file: testdata/users.csv
username,password
alice,pass1
bob,pass2
charlie,pass3
diana,pass4

# 2. Add CSV Data Set Config (Right-click Thread Group → Config Element)
#    Filename: testdata/users.csv
#    Variable Names: username,password
#    Sharing Mode: All threads

# 3. Use variables in HTTP Request Body:
{
  "username": "\${username}",
  "password": "\${password}"
}`
          },
          { type: 'heading', text: '4. Regular Expression Extractor — Correlation' },
          { type: 'text', content: 'Many applications use dynamic values like CSRF tokens, session IDs, or auth tokens that change every request. You must extract these values and reuse them — this is called correlation.' },
          {
            type: 'code', code: `# Scenario: Login returns an auth token, use it in the next request

# Step 1: Add Regular Expression Extractor to the Login request
#   Reference Name:    authToken
#   Regular Expression: "token":"([^"]+)"
#   Template:          $1$
#   Match No.:         1

# Step 2: Use the extracted token in the next request's header
#   HTTP Header Manager → Authorization: Bearer \${authToken}

# Alternative: Use JSON Extractor for JSON responses
#   JSON Path Expression: $.data.token
#   Reference Name: authToken`
          },
          { type: 'heading', text: '5. Assertions — Validating Responses' },
          { type: 'text', content: 'Without assertions, JMeter marks every response as a success — even if the server returns an error page. Assertions validate that the response is correct.' },
          {
            type: 'code', code: `# Response Assertion (most common):
#   Field to test: Response Code
#   Pattern:       200
#   → Fails if status code is not 200

#   Field to test: Response Body
#   Contains:      "success":true
#   → Fails if body doesn't contain this string

# Duration Assertion:
#   Duration in ms: 2000
#   → Fails if response takes more than 2 seconds

# JSON Assertion:
#   JSON Path:     $.status
#   Expected:      "ok"
#   → Validates specific JSON fields`
          },
          { type: 'heading', text: '6. Listeners — Viewing Results' },
          {
            type: 'list', icon: '📊',
            title: 'Most useful listeners:',
            items: [
              { label: 'View Results Tree', desc: 'See every request/response. Great for debugging. Disable in load tests (heavy memory use).' },
              { label: 'Aggregate Report', desc: 'Summary table: Avg, Min, Max, 90th/95th/99th percentile, Error%, Throughput.' },
              { label: 'Summary Report', desc: 'Lightweight version of Aggregate Report. Good for large tests.' },
              { label: 'Response Time Graph', desc: 'Visual graph of response times over test duration.' },
              { label: 'Active Threads Over Time', desc: 'Shows user ramp-up/ramp-down visually.' },
            ]
          },
          { type: 'warning', content: 'Remove or disable all listeners before running large load tests. Listeners write every result to disk and memory, which can skew results and slow down JMeter itself.' },
          { type: 'heading', text: 'Running Your First Test — Step by Step' },
          {
            type: 'steps',
            items: [
              'Create a new Test Plan: File → New',
              'Add Thread Group: Right-click Test Plan → Add → Threads → Thread Group. Set: 10 users, 10 sec ramp-up, 1 loop',
              'Add HTTP Request: Right-click Thread Group → Add → Sampler → HTTP Request. Set: GET https://jsonplaceholder.typicode.com/posts',
              'Add Response Assertion: Right-click HTTP Request → Add → Assertions → Response Assertion. Set: Response Code = 200',
              'Add View Results Tree: Right-click Thread Group → Add → Listener → View Results Tree',
              'Save the test: Ctrl+S (saves as .jmx file)',
              'Run: Ctrl+R or green ▶ button',
              'Check results in View Results Tree (green = pass, red = fail)',
            ]
          },
        ],
      },

      // ── 3. ADVANCED ──────────────────────────────────────────────────────
      {
        title: '🚀 Advanced JMeter',
        blocks: [
          { type: 'heading', text: 'Non-GUI Mode (CLI) — For Real Tests' },
          { type: 'text', content: 'Never run load tests in the JMeter GUI. The GUI consumes extra CPU and memory, which affects test results. For any real performance test, use the command line (Non-GUI mode).' },
          {
            type: 'code', code: `# Basic non-GUI execution:
jmeter -n -t my_test.jmx -l results.jtl

# Full command with HTML report generation:
jmeter -n -t my_test.jmx -l results.jtl -e -o ./report

# Parameters explained:
#  -n           Non-GUI mode
#  -t           Path to test plan (.jmx file)
#  -l           Path to results file (.jtl or .csv)
#  -e           Generate HTML report after test
#  -o           Output folder for HTML report (must be empty!)
#  -Jproperty   Override a JMeter property
#  -Gfile       Specify global properties file

# Override properties from command line:
jmeter -n -t test.jmx -l res.jtl \\
       -Jusers=500 \\
       -Jrampup=60 \\
       -Jduration=300`
          },
          { type: 'info', content: 'The -e -o flags generate a beautiful interactive HTML dashboard report in the specified folder. Open ./report/index.html in your browser after the test.' },
          { type: 'heading', text: 'Parameterize Tests with User-Defined Variables' },
          {
            type: 'code', code: `# In Test Plan → User Defined Variables:
#   BASE_URL = https://api.example.com
#   USERS    = 100
#   RAMPUP   = 60
#   DURATION = 300

# Use in Thread Group:
#   Number of Threads: \${USERS}
#   Ramp-Up:           \${RAMPUP}
#   Duration:          \${DURATION}

# Use in HTTP Request:
#   Server: \${BASE_URL}  (JMeter strips the protocol automatically)

# Override from CLI:
jmeter -n -t test.jmx -l res.jtl \\
       -JBASE_URL=https://staging.example.com \\
       -JUSERS=200`
          },
          { type: 'heading', text: 'JSR223 Sampler — Groovy Scripting' },
          { type: 'text', content: 'For complex logic (custom authentication, dynamic data generation, conditional flows), use the JSR223 Sampler with Groovy. It\'s compiled and cached, making it much faster than BeanShell.' },
          {
            type: 'code', code: `// JSR223 Sampler — Generate a random UUID and timestamp
import java.util.UUID

def uuid = UUID.randomUUID().toString()
def timestamp = System.currentTimeMillis()
def randomInt = (int)(Math.random() * 1000) + 1

// Store as JMeter variables for use in subsequent requests
vars.put("requestId", uuid)
vars.put("timestamp", String.valueOf(timestamp))
vars.put("randomUserId", String.valueOf(randomInt))

log.info("Generated requestId: " + uuid)

// Example: Generate HMAC-SHA256 signature
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.util.Base64

def secret = "my-secret-key"
def message = timestamp + ":" + uuid
Mac mac = Mac.getInstance("HmacSHA256")
mac.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"))
def signature = Base64.getEncoder().encodeToString(mac.doFinal(message.getBytes()))
vars.put("signature", signature)`
          },
          { type: 'heading', text: 'JMeter Built-in Functions' },
          {
            type: 'code', code: `# JMeter has 50+ built-in functions — use them in any field with \${__functionName()}

\${__Random(1,1000)}          # Random number between 1 and 1000
\${__time(yyyy-MM-dd)}        # Current date formatted
\${__time()}                  # Current epoch milliseconds
\${__UUID()}                  # Random UUID
\${__threadNum}               # Current thread number (1, 2, 3...)
\${__CSVRead(file.csv,0)}     # Read column 0 from CSV
\${__base64Encode(text)}      # Base64 encode a string
\${__urlencode(text)}         # URL-encode a string
\${__P(property,default)}     # Read a JMeter property
\${__env(VAR_NAME)}           # Read an environment variable

# Example: Unique username per thread
{
  "username": "user_\${__threadNum}_\${__Random(100,999)}",
  "email": "test_\${__time()}\${__Random(1,99)}@example.com"
}`
          },
          { type: 'heading', text: 'Distributed Load Testing' },
          { type: 'text', content: 'A single machine can only generate so much load. For high concurrency (1000+ users), use JMeter\'s distributed mode: one controller machine, multiple worker (injector) machines.' },
          {
            type: 'code', code: `# ── Controller Machine Setup ──────────────────────────────
# File: jmeter.properties (in JMeter /bin/ directory)
remote_hosts=192.168.1.101,192.168.1.102,192.168.1.103
server.rmi.ssl.disable=true  # (for internal network only)

# ── Worker Machine Setup (run on each worker) ──────────────
# Start the JMeter server (worker mode):
jmeter-server.bat           # Windows
./jmeter-server             # macOS/Linux

# ── Run distributed test from Controller ───────────────────
# CLI: run on ALL remote hosts:
jmeter -n -t test.jmx -r -l results.jtl -e -o report/

# CLI: run on SPECIFIC hosts:
jmeter -n -t test.jmx -R 192.168.1.101,192.168.1.102 -l results.jtl

# GUI: Run → Start Remote All (Ctrl+Shift+R)`
          },
          { type: 'info', content: 'In distributed mode, the Thread Group user count is multiplied by the number of workers. 100 users on 5 workers = 500 total virtual users.' },
          { type: 'heading', text: 'CI/CD Integration — GitHub Actions' },
          {
            type: 'code', code: `# .github/workflows/performance-test.yml
name: Performance Test

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # Every Monday at 6am

jobs:
  jmeter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Download JMeter
        run: |
          wget https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar -xzf apache-jmeter-5.6.3.tgz

      - name: Run Performance Test
        run: |
          apache-jmeter-5.6.3/bin/jmeter \\
            -n -t tests/performance/load_test.jmx \\
            -l results/results.jtl \\
            -e -o results/html-report \\
            -JBASE_URL=\${{ secrets.STAGING_URL }} \\
            -JUSERS=100 \\
            -JDURATION=300

      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: jmeter-report
          path: results/html-report/

      - name: Check Error Rate
        run: |
          ERROR_RATE=$(grep -o '"fail":[0-9]*' results/results.jtl | tail -1 | grep -o '[0-9]*')
          if [ "$ERROR_RATE" -gt "1" ]; then
            echo "Error rate too high: $ERROR_RATE%"
            exit 1
          fi`
          },
          { type: 'heading', text: 'Understanding HTML Report Metrics' },
          {
            type: 'table',
            headers: ['Metric', 'Good Value', 'Meaning'],
            rows: [
              ['Average Response Time', '< 2000ms', 'Mean time across all requests'],
              ['90th Percentile (P90)', '< 3000ms', '90% of requests faster than this'],
              ['99th Percentile (P99)', '< 5000ms', 'Worst-case for most users'],
              ['Error Rate', '< 1%', 'Percentage of failed requests'],
              ['Throughput', 'Depends on target', 'Requests per second the system handles'],
              ['Apdex Score', '> 0.7 (good)', '0-1 scale: user satisfaction based on response times'],
            ]
          },
          { type: 'heading', text: 'Performance Tuning JMeter Itself' },
          {
            type: 'code', code: `# jmeter.bat / jmeter.sh — increase heap memory for large tests:
# Default is 1GB. For 500+ users, increase to 4-8GB.

# Windows (jmeter.bat):
set HEAP=-Xms4g -Xmx4g -XX:MaxMetaspaceSize=512m

# macOS/Linux (jmeter.sh):
HEAP="-Xms4g -Xmx4g -XX:MaxMetaspaceSize=512m"

# jmeter.properties optimizations:
jmeter.save.saveservice.output_format=csv    # CSV faster than XML
jmeter.save.saveservice.response_data=false  # Don't save response data
jmeter.save.saveservice.samplerData=false    # Save only what you need
jmeter.save.saveservice.requestHeaders=false
summariser.interval=30                        # Log summary every 30 sec`
          },
        ],
      },

      // ── 4. INTERVIEW Q&A ─────────────────────────────────────────────────
      {
        title: '💼 JMeter Interview Questions & Answers',
        blocks: [
          { type: 'text', content: 'These are the most frequently asked JMeter interview questions. Click each question to see the detailed answer.' },
          {
            type: 'qa',
            question: 'Q1: What is JMeter? What is it used for? What protocols does it support?',
            answer: 'Apache JMeter is an open-source Java-based performance testing tool. It is used to load test functional behavior and measure performance of web applications, APIs, and services.\n\nPrimary use cases:\n• Load testing: Simulate multiple concurrent users\n• Performance testing: Measure response times and throughput\n• Stress testing: Find the breaking point\n• API testing: Test REST and SOAP services\n\nSupported protocols: HTTP/HTTPS, FTP, JDBC (database), LDAP, SMTP, TCP, JMS, WebSocket (via plugin)',
          },
          {
            type: 'qa',
            question: 'Q2: What is the difference between Load Testing, Stress Testing, and Spike Testing?',
            answer: 'Load Testing: Tests the system under expected (normal and peak) load conditions. Goal: Verify performance meets SLAs (e.g., response time < 2s for 1000 users).\n\nStress Testing: Deliberately pushes the system beyond its capacity limits until it fails. Goal: Find the breaking point and understand failure behavior.\n\nSpike Testing: Suddenly applies a very large load for a short time, then removes it. Goal: Verify the system can handle sudden traffic surges (e.g., news goes viral, flash sale starts).',
          },
          {
            type: 'qa',
            question: 'Q3: Explain the Thread Group parameters: Number of Threads, Ramp-Up Period, and Loop Count.',
            answer: 'Number of Threads: Total number of virtual users (concurrent users) that JMeter will simulate. Each thread runs independently and simulates one real user.\n\nRamp-Up Period: The time (in seconds) JMeter takes to start all threads. Example: 100 threads with 50-second ramp-up starts 2 users/second. This prevents a "thundering herd" that would overwhelm the server immediately.\n\nLoop Count: How many times each thread executes the test scenario. Set to -1 for infinite (use with a Duration setting instead).',
          },
          {
            type: 'qa',
            question: 'Q4: What is Correlation in JMeter? How do you implement it?',
            answer: 'Correlation is the process of extracting dynamic values from server responses and using them in subsequent requests. Without correlation, tests fail because dynamic values (CSRF tokens, session IDs, auth tokens) change per session.\n\nExample: Login returns {"token": "abc123xyz"}. The next API call needs this token in the Authorization header.\n\nImplementation:\n1. Add Regular Expression Extractor or JSON Extractor to the Login request\n2. Set Reference Name: authToken\n3. Set JSON Path: $.token\n4. Use ${authToken} in subsequent request headers',
            code: `# JSON Extractor configuration:
Reference Name: authToken
JSON Path:      $.data.token
Match No.:      1
Default:        EXTRACTION_FAILED

# Use in HTTP Header Manager:
Authorization: Bearer \${authToken}`
          },
          {
            type: 'qa',
            question: 'Q5: Why should you use Non-GUI mode for load tests? How do you run it?',
            answer: 'The GUI consumes significant CPU and memory resources, which:\n• Reduces the load JMeter can generate\n• Skews performance metrics (JMeter machine becomes the bottleneck)\n• Makes results unreliable\n\nFor any test with 50+ users, use Non-GUI (CLI) mode.',
            code: `# Basic run:
jmeter -n -t test.jmx -l results.jtl

# With HTML report:
jmeter -n -t test.jmx -l results.jtl -e -o ./html-report

# Override properties:
jmeter -n -t test.jmx -l results.jtl -Jusers=500 -Jduration=300`
          },
          {
            type: 'qa',
            question: 'Q6: What are Timers in JMeter? Why are they important?',
            answer: 'Timers introduce a delay (think time / pacing) between requests within a thread. They simulate real user behavior — real users don\'t fire requests as fast as possible.\n\nWithout timers, JMeter generates unrealistic load and can saturate the server with requests that a real user would never generate.\n\nCommon timers:\n• Constant Timer: Fixed delay (e.g., 1000ms between requests)\n• Gaussian Random Timer: Variable delay around an average (more realistic)\n• Uniform Random Timer: Random delay within a range\n• Throughput Shaping Timer (plugin): Control exact requests/second',
            code: `# Gaussian Random Timer settings for realistic think time:
# Constant Delay Offset: 1000ms
# Deviation: 500ms
# → Actual delay: 1000 ± 500ms (500ms to 1500ms, normally distributed)`
          },
          {
            type: 'qa',
            question: 'Q7: What are the most important metrics in a JMeter report? What values are acceptable?',
            answer: 'Key metrics and acceptable thresholds:\n\n• Average Response Time: Mean response time. Target < 2000ms for web apps.\n• 90th Percentile (P90): 90% of users get this response time or faster. Target < 3000ms.\n• 99th Percentile (P99): Worst case for 99% of users. Target < 5000ms.\n• Error Rate %: Percentage of failed requests. Target < 1% for healthy systems.\n• Throughput: Requests per second the system processes. Higher = better.\n• Apdex Score: User satisfaction score (0-1). Satisfied > 0.85, Tolerating 0.5-0.85, Frustrated < 0.5.',
          },
          {
            type: 'qa',
            question: 'Q8: How do you handle authentication in JMeter? (Basic Auth, OAuth2, Session-based)',
            answer: 'Basic Authentication:\n• Use HTTP Authorization Manager (Add → Config Element → HTTP Authorization Manager)\n• Set Base URL, username, password, domain\n\nOAuth2 / Bearer Token:\n• First request: Login API → extract token with JSON Extractor\n• Subsequent requests: HTTP Header Manager with "Authorization: Bearer ${token}"\n\nCookie/Session-based:\n• Add HTTP Cookie Manager (Config Element)\n• JMeter automatically handles Set-Cookie headers and sends them back',
            code: `# HTTP Header Manager for Bearer Token:
Authorization: Bearer \${authToken}
Content-Type:  application/json

# Or for Basic Auth inline:
Authorization: Basic \${__base64Encode(username:password)}`
          },
          {
            type: 'qa',
            question: 'Q9: What is the difference between Throughput and Response Time?',
            answer: 'Throughput: The number of requests the system processes per unit time (requests/second or transactions/second - TPS). It measures the server\'s capacity.\n\nResponse Time: The time it takes for a single request to complete (from send to receive). It measures the user\'s experience.\n\nThe relationship: As you increase users, throughput increases until the server saturates. After saturation, throughput plateaus but response times increase significantly. The "knee" of this curve is your system\'s optimal operating point.',
          },
          {
            type: 'qa',
            question: 'Q10: How do you integrate JMeter with Jenkins/CI CD pipelines?',
            answer: 'Option 1: Jenkins JMeter Plugin\n• Install the "Performance Plugin" in Jenkins\n• Add a "Publish Performance Test Result Report" post-build action\n• Point to the .jtl results file\n• Set thresholds: fail build if error rate > X% or avg response > Yms\n\nOption 2: Shell/Bat step\n• Use a "Execute Shell" build step\n• Run JMeter CLI and check exit code\n• Parse the .jtl file for error rates\n\nOption 3: GitHub Actions\n• Use actions/setup-java, download JMeter, run CLI, upload HTML report as artifact',
            code: `# Jenkins Pipeline:
stage('Performance Test') {
    steps {
        sh '''
            jmeter -n -t tests/load.jmx \\
                   -l results.jtl \\
                   -e -o html-report
        '''
    }
    post {
        always {
            perfReport 'results.jtl'
            publishHTML([reportDir: 'html-report', reportFiles: 'index.html'])
        }
    }
}`
          },
          {
            type: 'qa',
            question: 'Q11: How do you record a JMeter test from browser actions?',
            answer: 'Method 1: JMeter\'s HTTP(S) Test Script Recorder\n1. Add Recording Controller to Thread Group\n2. Add HTTP(S) Test Script Recorder to WorkBench\n3. Set port to 8888\n4. Configure browser proxy to localhost:8888\n5. Start recording → browse → stop → clean up recorded steps\n\nMethod 2: BlazeMeter Chrome Extension\n• Free Chrome extension that records and exports as .jmx\n• Much easier than manual proxy recording\n\nMethod 3: Convert Postman collection to JMX\n• Record in Postman → export → convert with postman2jmx tool',
          },
          {
            type: 'qa',
            question: 'Q12: What is a Sampler? Name and describe at least 5 types.',
            answer: 'A Sampler is the component that actually sends a request and collects the response. It is the core "worker" of a test.\n\nTypes:\n• HTTP Request: Send HTTP/HTTPS requests (most common)\n• JDBC Request: Execute SQL queries against a database\n• FTP Request: Upload/download files via FTP\n• SMTP Sampler: Send emails and test mail servers\n• TCP Sampler: Raw TCP socket communication\n• JSR223 Sampler: Execute custom Groovy/Python/JS code\n• Debug Sampler: Show JMeter variables in results (for debugging)',
          },
          {
            type: 'qa',
            question: 'Q13: What is Parameterization? Name different methods.',
            answer: 'Parameterization is using different data values across test iterations instead of hardcoded values.\n\nMethods:\n1. CSV Data Set Config: Read data from CSV files. Best for large datasets.\n2. User Defined Variables: Define test-level variables, override from CLI with -J.\n3. Random functions: ${__Random(1,1000)} for random numbers.\n4. Counter Config: Incrementing counter for sequential IDs.\n5. JSR223 / BeanShell: Programmatic data generation.',
          },
          {
            type: 'qa',
            question: 'Q14: What is Distributed Testing? When do you need it?',
            answer: 'Distributed testing uses multiple machines to generate load in coordination. One Controller machine manages multiple Worker (Injector) machines.\n\nWhen to use:\n• A single machine cannot generate enough load (e.g., need 5000+ users)\n• More realistic geographic distribution of users\n• CPU/network limitations on test machine\n\nRule of thumb: A decent server can handle ~300-500 HTTP threads on a single machine. For more, add workers.\n\nSetup: Start jmeter-server on each worker, add their IPs to remote_hosts in jmeter.properties, run with -r flag.',
          },
          {
            type: 'qa',
            question: 'Q15: What is the Aggregate Report? What does each column mean?',
            answer: '# Samples: Total number of requests sent\nAverage: Mean response time (ms)\nMin: Fastest request\nMax: Slowest request\n90% Line: 90th percentile — 90% of requests were faster than this\n95% Line: 95th percentile\n99% Line: 99th percentile (catches most outliers)\nError %: Percentage of failed requests\nThroughput: Requests per second\nReceived KB/sec: Network bandwidth received\nSent KB/sec: Network bandwidth sent\n\nFocus on P90, P99, and Error% — these give the most meaningful picture of user experience.',
          },
        ],
      },
    ],
  },

  // ── TURKISH ────────────────────────────────────────────────────────────────
  tr: {
    hero: {
      title: '⚡ Apache JMeter',
      subtitle: 'Performans ve Yük Testi Aracı',
      intro: 'Sıfırdan başlayarak web uygulamalarınızın ve API\'lerinizin performansını nasıl ölçeceğinizi, analiz edeceğinizi ve iyileştireceğinizi öğrenin — ön bilgi gerekmez.',
    },
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Orta Seviye', '🚀 İleri Seviye', '💼 Mülakat Soruları'],
    sections: [
      {
        title: '🎯 JMeter ve Performans Testi Nedir?',
        blocks: [
          { type: 'text', content: 'Web siteniz sadece 5 kişi kullanırken mükemmel çalışıyor. Peki aynı anda 10.000 kişi ziyaret ettiğinde ne olur — mesela indirim kampanyası sırasında? Çöküyor mu? Yavaşlıyor mu? Performans testi tam olarak buna cevap verir.' },
          { type: 'text', content: 'Performans testi, bir sistemin farklı yük koşulları altında hız, kararlılık ve ölçeklenebilirlik açısından değerlendirilmesi sürecidir. Fonksiyonel hata bulmakla değil, sistemin yük altındaki DAVRANIŞIYLA ilgilenir.' },
          { type: 'heading', text: 'Performans Testi Türleri' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '📈', label: 'Yük Testi (Load)', desc: 'Beklenen kullanıcı sayısını simüle eder. "1000 kullanıcıyı kaldırabilir miyiz?" — en yaygın tür.' },
              { icon: '💥', label: 'Stres Testi', desc: 'Sistem çöküne kadar limitin ötesine iter. Kırılma noktasını bulur.' },
              { icon: '⚡', label: 'Spike Testi', desc: 'Ani kullanıcı artışı. "10 saniyede 5000 kullanıcı gelirse ne olur?"' },
              { icon: '📦', label: 'Hacim Testi', desc: 'Büyük veri miktarlarını test eder. "10 milyon DB kaydıyla ne olur?"' },
              { icon: '⏳', label: 'Dayanıklılık Testi', desc: 'Saatler/günler boyunca orta yük. Bellek sızıntısı ve yavaş çöküşü bulur.' },
              { icon: '📊', label: 'Ölçeklenebilirlik', desc: 'Sistem yatay ölçekleniyor mu? "2 sunucu ekleyince throughput iki katına çıkıyor mu?"' },
            ]
          },
          { type: 'heading', text: 'Apache JMeter Nedir?' },
          { type: 'text', content: 'Apache JMeter, yük testi ve performans ölçümü için tasarlanmış ücretsiz, açık kaynaklı bir Java uygulamasıdır. 1998\'de Stefano Mazzocchi tarafından web sunucusu testi için yaratılan JMeter, bugün dünyanın en yaygın kullanılan açık kaynaklı performans test aracı haline gelmiştir.' },
          {
            type: 'list', icon: '✅',
            title: 'JMeter\'ın Öne Çıkan Özellikleri:',
            items: [
              '%100 ücretsiz ve açık kaynak (Apache Lisansı 2.0)',
              'HTTP/S, REST, SOAP, FTP, JDBC, LDAP, SMTP, JMS ve daha fazlasını destekler',
              'Test oluşturma için güçlü GUI, çalıştırma için Non-GUI modu',
              'Dağıtık test: bir kontrolcü, birden fazla yük üreteci',
              '600+ eklenti ile genişletilebilir',
              'Otomatik olarak güzel HTML raporları üretir',
              'Java olan her işletim sisteminde çalışır',
            ]
          },
          { type: 'heading', text: 'JMeter vs Diğer Araçlar' },
          {
            type: 'table',
            headers: ['Araç', 'Dil', 'GUI', 'Ücretsiz', 'En İyi Kullanım'],
            rows: [
              ['JMeter', 'Java', '✅ Evet', '✅ Evet', 'Kurumsal, çok protokol'],
              ['Locust', 'Python', '❌ Web UI', '✅ Evet', 'Python ekipleri'],
              ['k6', 'JavaScript', '❌ CLI', '✅ Evet', 'Geliştirici dostu, CI/CD'],
              ['Gatling', 'Scala/JS', '❌ CLI', '✅ Evet', 'Yüksek performans, kod odaklı'],
              ['LoadRunner', 'Çeşitli', '✅ Evet', '❌ Ücretli', 'Kurumsal, uyumluluk'],
            ]
          },
          { type: 'tip', content: 'JMeter, programlama geçmişi olmayan başlangıç seviyesi ve ekipler için en güvenli seçimdir. GUI\'si test oluşturmayı görsel ve sezgisel hale getirir.' },
          { type: 'heading', text: 'Gerçek Dünya Kullanım Örnekleri' },
          {
            type: 'list', icon: '🔹',
            items: [
              'E-ticaret: Kara Cuma trafiği altında ödeme akışını test etme',
              'Bankacılık: Giriş ve transfer API\'lerinin sabah yoğun saatini kaldırıp kaldırmadığını doğrulama',
              'Sağlık: Vardiya değişiminde hasta portalının yanıt verebildiğini doğrulama',
              'Oyun: Lansmandan önce oyun sunucularını stres testine tabi tutma',
              'Mikro servisler: Hangi servisin darboğaz olduğunu belirleme',
            ]
          },
        ],
      },
      {
        title: '📦 Kurulum ve İlk Başlatma',
        blocks: [
          { type: 'text', content: 'JMeter bir Java uygulamasıdır, bu nedenle önce Java kurulu olmalıdır. Kurulum basittir: indir, çıkart, çalıştır. "Kurulum sihirbazı" gerekmez.' },
          { type: 'heading', text: 'Adım 1: Java Kurulumu (JDK 8+)' },
          { type: 'text', content: 'JMeter 5.x için Java 8 veya üstü gereklidir. Java 11 veya 17 LTS önerilir.' },
          {
            type: 'code', code: `# Java kurulu mu kontrol et (terminal / komut istemcisinde çalıştır):
java -version

# Beklenen çıktı:
openjdk version "17.0.9" 2023-10-17

# Kurulu değilse, şuradan indir:
# https://adoptium.net  (ücretsiz, açık kaynak OpenJDK)
# veya https://www.oracle.com/java/technologies/downloads/`
          },
          { type: 'heading', text: 'Adım 2: JMeter İndir' },
          {
            type: 'steps',
            items: [
              'https://jmeter.apache.org/download_jmeter.cgi adresine git',
              '"Binaries" altında apache-jmeter-X.X.zip (Windows) veya .tgz (macOS/Linux) indir',
              'C:\\JMeter\\ veya ~/Applications/jmeter/ gibi bir konuma çıkart',
              'Kurulum gerekmez — hazır!',
            ]
          },
          { type: 'heading', text: 'Adım 3: JMeter GUI\'yi Başlat' },
          {
            type: 'code', code: `# Windows (çift tıkla veya cmd\'de çalıştır):
C:\\JMeter\\apache-jmeter-5.6\\bin\\jmeter.bat

# macOS / Linux:
cd ~/Applications/jmeter/apache-jmeter-5.6/bin
./jmeter.sh`
          },
          { type: 'info', content: 'İlk başlatma 10-20 saniye sürebilir. JMeter boş bir Test Planıyla açılır. GUI yalnızca test oluşturmak içindir — büyük testleri asla GUI modunda çalıştırma (bunun yerine CLI kullan).' },
          { type: 'heading', text: 'JAVA_HOME Ayarı (gerekirse)' },
          {
            type: 'code', code: `# Windows (Sistem Ortam Değişkenlerinde ayarla):
JAVA_HOME = C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.9.9-hotspot

# macOS / Linux (~/. zshrc veya ~/.bash_profile\'e ekle):
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH

# Doğrula:
echo $JAVA_HOME`
          },
          { type: 'tip', content: 'Masaüstünüzde jmeter.bat/jmeter.sh için bir kısayol oluşturun. JMeter\'ı sık açacaksınız!' },
        ],
      },
      {
        title: '📚 Temel Kavramlar ve İlk Testini Oluşturma',
        blocks: [
          { type: 'text', content: 'JMeter testleri bir hiyerarşide düzenlenir. Bu hiyerarşiyi anlamak her şeyin temelidir.' },
          { type: 'heading', text: 'Test Planı Hiyerarşisi' },
          {
            type: 'code', code: `Test Planı
└── Thread Group              ← sanal kullanıcıları simüle eder
    ├── HTTP Request Sampler  ← neyi test edeceğiz
    ├── HTTP Header Manager   ← başlıkları ayarla (örn. auth)
    ├── CSV Data Set Config   ← dosyadan test verisi yükle
    ├── Regular Expr. Extractor ← dinamik değerleri çıkart
    ├── Response Assertion    ← yanıtları doğrula
    └── Listener\'lar          ← sonuçları topla ve göster
        ├── View Results Tree
        └── Aggregate Report`
          },
          { type: 'heading', text: '1. Thread Group — Sanal Kullanıcılar' },
          {
            type: 'list', icon: '🔸',
            title: 'Thread Group parametreleri:',
            items: [
              { label: 'Number of Threads (Kullanıcı Sayısı)', desc: 'Toplam sanal kullanıcı. Test oluştururken 10-50 ile başla.' },
              { label: 'Ramp-Up Period (sn)', desc: 'Tüm kullanıcıları başlatmak için kaç saniye. 10 kullanıcı, 10 sn ramp-up = saniyede 1 kullanıcı.' },
              { label: 'Loop Count', desc: 'Her kullanıcının isteği kaç kez tekrarlayacağı. Sonsuz için -1 (Duration ile birlikte kullan).' },
              { label: 'Duration (sn)', desc: 'Toplam test süresi. Sürdürülebilir testler için Loop Count\'tan daha iyidir.' },
            ]
          },
          { type: 'heading', text: '2. HTTP Request Sampler' },
          {
            type: 'code', code: `# Örnek: REST API POST isteği test etme
# HTTP Request Sampler\'da:
#   Metot: POST
#   Yol:   /api/v1/login
#   Body Data (JSON):

{
  "username": "testkullanici",
  "password": "Sifre123"
}

# HTTP Header Manager\'a şunları ekle:
#   Content-Type: application/json
#   Accept: application/json`
          },
          { type: 'heading', text: '3. CSV Data Set Config — Parameterizasyon' },
          {
            type: 'code', code: `# 1. Dosya oluştur: testdata/kullanicilar.csv
kullanici_adi,sifre
ali,sifre1
veli,sifre2
ayse,sifre3

# 2. CSV Data Set Config ekle
#    Dosya Adı: testdata/kullanicilar.csv
#    Değişken İsimleri: kullanici_adi,sifre

# 3. HTTP Request Body\'de değişkenleri kullan:
{
  "username": "\${kullanici_adi}",
  "password": "\${sifre}"
}`
          },
          { type: 'heading', text: '4. Response Assertion — Yanıt Doğrulama' },
          {
            type: 'code', code: `# Response Assertion (en yaygın):
#   Test edilecek alan: Response Code
#   Şablon:            200
#   → Durum kodu 200 değilse başarısız sayar

#   Test edilecek alan: Response Body
#   İçerir:            "success":true
#   → Body bu metni içermiyorsa başarısız sayar

# Duration Assertion:
#   Süre (ms): 2000
#   → Yanıt 2 saniyeden uzun sürerse başarısız sayar`
          },
          { type: 'heading', text: 'İlk Testini Çalıştır — Adım Adım' },
          {
            type: 'steps',
            items: [
              'Yeni Test Planı oluştur: Dosya → Yeni',
              'Thread Group ekle: Test Planı\'na sağ tıkla → Ekle → Threads → Thread Group. 10 kullanıcı, 10 sn ramp-up, 1 döngü ayarla',
              'HTTP Request ekle: Thread Group\'a sağ tıkla → Ekle → Sampler → HTTP Request. GET https://jsonplaceholder.typicode.com/posts yaz',
              'Response Assertion ekle: HTTP Request\'e sağ tıkla → Ekle → Assertions → Response Assertion. Durum Kodu = 200 ayarla',
              'View Results Tree ekle: Thread Group\'a sağ tıkla → Ekle → Listener → View Results Tree',
              'Kaydet: Ctrl+S (.jmx dosyası olarak kaydeder)',
              'Çalıştır: Ctrl+R veya yeşil ▶ düğmesi',
              'Sonuçları View Results Tree\'de kontrol et (yeşil = başarılı, kırmızı = başarısız)',
            ]
          },
        ],
      },
      {
        title: '🚀 İleri Seviye JMeter',
        blocks: [
          { type: 'heading', text: 'Non-GUI Modu (CLI) — Gerçek Testler İçin' },
          { type: 'text', content: 'Yük testlerini asla JMeter GUI\'sinde çalıştırma. GUI ekstra CPU ve bellek tüketir, bu da test sonuçlarını etkiler. Gerçek performans testleri için komut satırını (Non-GUI modu) kullan.' },
          {
            type: 'code', code: `# Temel non-GUI çalıştırma:
jmeter -n -t test.jmx -l sonuclar.jtl

# HTML raporu ile tam komut:
jmeter -n -t test.jmx -l sonuclar.jtl -e -o ./rapor

# Parametreler:
#  -n           Non-GUI modu
#  -t           Test planı yolu (.jmx dosyası)
#  -l           Sonuç dosyası yolu (.jtl veya .csv)
#  -e           Testten sonra HTML raporu oluştur
#  -o           HTML raporu için çıktı klasörü (boş olmalı!)

# Komut satırından özellikleri geçersiz kıl:
jmeter -n -t test.jmx -l sonuc.jtl -Jkullanici=500 -Jsure=300`
          },
          { type: 'heading', text: 'JSR223 Sampler — Groovy Scripting' },
          {
            type: 'code', code: `// Dinamik veri üretme örneği
import java.util.UUID

def uuid = UUID.randomUUID().toString()
def zaman = System.currentTimeMillis()
def rastgeleId = (int)(Math.random() * 1000) + 1

// JMeter değişkeni olarak kaydet
vars.put("istekId", uuid)
vars.put("zaman", String.valueOf(zaman))
vars.put("rastgeleKullaniciId", String.valueOf(rastgeleId))

log.info("Oluşturulan istekId: " + uuid)`
          },
          { type: 'heading', text: 'CI/CD Entegrasyonu — GitHub Actions' },
          {
            type: 'code', code: `# .github/workflows/performans-testi.yml
name: Performans Testi

on:
  push:
    branches: [main]

jobs:
  jmeter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: JMeter İndir
        run: |
          wget https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar -xzf apache-jmeter-5.6.3.tgz
      - name: Performans Testini Çalıştır
        run: |
          apache-jmeter-5.6.3/bin/jmeter \\
            -n -t tests/load_test.jmx \\
            -l sonuclar/results.jtl \\
            -e -o sonuclar/html-rapor \\
            -JBASE_URL=\${{ secrets.STAGING_URL }}
      - name: Raporu Yükle
        uses: actions/upload-artifact@v3
        with:
          name: jmeter-raporu
          path: sonuclar/html-rapor/`
          },
          { type: 'heading', text: 'HTML Rapor Metrikleri' },
          {
            type: 'table',
            headers: ['Metrik', 'İyi Değer', 'Anlamı'],
            rows: [
              ['Ortalama Yanıt Süresi', '< 2000ms', 'Tüm isteklerde ortalama süre'],
              ['90. Persentil (P90)', '< 3000ms', 'İsteklerin %90\'ı bu sürenin altında'],
              ['99. Persentil (P99)', '< 5000ms', 'Çoğu kullanıcı için en kötü durum'],
              ['Hata Oranı', '< %1', 'Başarısız isteklerin yüzdesi'],
              ['Throughput', 'Hedefe göre', 'Sistemin saniyede işlediği istek sayısı'],
              ['Apdex Skoru', '> 0.7 (iyi)', '0-1 ölçeği: yanıt sürelerine göre kullanıcı memnuniyeti'],
            ]
          },
        ],
      },
      {
        title: '💼 JMeter Mülakat Soruları ve Cevapları',
        blocks: [
          { type: 'text', content: 'En sık sorulan JMeter mülakat soruları. Her soruya tıklayarak detaylı cevabı görebilirsiniz.' },
          { type: 'qa', question: 'S1: JMeter nedir? Ne için kullanılır? Hangi protokolleri destekler?', answer: 'Apache JMeter, açık kaynaklı Java tabanlı bir performans test aracıdır. Web uygulamalarının, API\'lerin ve servislerin yük altındaki performansını ölçmek için kullanılır.\n\nTemel kullanım alanları:\n• Yük testi: Birden fazla eş zamanlı kullanıcıyı simüle etme\n• Performans testi: Yanıt sürelerini ve throughput\'u ölçme\n• Stres testi: Kırılma noktasını bulma\n• API testi: REST ve SOAP servislerini test etme\n\nDesteklenen protokoller: HTTP/HTTPS, FTP, JDBC (veritabanı), LDAP, SMTP, TCP, JMS, WebSocket (eklenti ile)' },
          { type: 'qa', question: 'S2: Yük Testi, Stres Testi ve Spike Testi arasındaki fark nedir?', answer: 'Yük Testi: Sistemin beklenen (normal ve yoğun) yük koşulları altında test edilmesidir. Amaç: Performansın SLA\'ları karşıladığını doğrulamak (örn. 1000 kullanıcı için yanıt süresi < 2sn).\n\nStres Testi: Sistemi kapasitesinin ötesine çöküne kadar kasıtlı olarak iter. Amaç: Kırılma noktasını bulmak ve arıza davranışını anlamak.\n\nSpike Testi: Kısa süreliğine çok büyük yük uygular, sonra kaldırır. Amaç: Ani trafik artışlarını kaldırıp kaldıramadığını doğrulamak (örn. haber viral oldu, flaş indirim başladı).' },
          { type: 'qa', question: 'S3: Thread Group parametrelerini açıkla: Kullanıcı Sayısı, Ramp-Up, Loop Count', answer: 'Kullanıcı Sayısı (Number of Threads): JMeter\'ın simüle edeceği toplam sanal kullanıcı (eş zamanlı kullanıcı) sayısı. Her thread bağımsız çalışır ve gerçek bir kullanıcıyı temsil eder.\n\nRamp-Up Period: JMeter\'ın tüm thread\'leri başlatması için geçen süre (saniye). Örnek: 100 thread, 50 saniyelik ramp-up = saniyede 2 kullanıcı başlatılır. Sunucuyu hemen bunaltabilecek "thundering herd"i önler.\n\nLoop Count: Her thread\'in test senaryosunu kaç kez çalıştıracağı. Süre ayarı ile birlikte kullanmak için -1 (sonsuz) olarak ayarla.' },
          { type: 'qa', question: 'S4: JMeter\'da Korelasyon nedir? Nasıl uygulanır?', answer: 'Korelasyon, sunucu yanıtlarından dinamik değerlerin (CSRF token, session ID, auth token) çıkarılması ve sonraki isteklerde kullanılması sürecidir. Korelasyon olmadan, oturum başına değişen değerler nedeniyle testler başarısız olur.\n\nÖrnek: Giriş {"token": "abc123xyz"} döndürür. Sonraki API çağrısının bu token\'ı Authorization başlığında göndermesi gerekir.\n\nUygulama:\n1. Giriş isteğine JSON Extractor ekle\n2. Referans Adı: authToken\n3. JSON Path: $.token\n4. Sonraki isteklerin başlığında ${authToken} kullan', code: `# JSON Extractor yapılandırması:
Referans Adı: authToken
JSON Path:    $.data.token

# HTTP Header Manager\'da kullan:
Authorization: Bearer \${authToken}` },
          { type: 'qa', question: 'S5: Neden Non-GUI modu kullanmalısın? Nasıl çalıştırılır?', answer: 'GUI önemli miktarda CPU ve bellek tüketir, bu da:\n• JMeter\'ın üretebileceği yükü azaltır\n• Performans metriklerini bozar (JMeter makinesi darboğaz haline gelir)\n• Sonuçları güvenilmez kılar\n\n50\'den fazla kullanıcı içeren herhangi bir test için Non-GUI (CLI) modu kullan.', code: `# Temel çalıştırma:
jmeter -n -t test.jmx -l sonuclar.jtl

# HTML raporu ile:
jmeter -n -t test.jmx -l sonuclar.jtl -e -o ./html-raporu` },
          { type: 'qa', question: 'S6: Rapordaki en önemli metrikler nelerdir? Kabul edilebilir değerler nedir?', answer: 'Temel metrikler ve kabul edilebilir eşikler:\n\n• Ortalama Yanıt Süresi: Ortalama yanıt süresi. Web uygulamaları için hedef < 2000ms.\n• 90. Persentil (P90): Kullanıcıların %90\'ı bu yanıt süresini veya daha hızlısını alır. Hedef < 3000ms.\n• 99. Persentil (P99): Kullanıcıların %99\'u için en kötü durum. Hedef < 5000ms.\n• Hata Oranı %: Başarısız isteklerin yüzdesi. Sağlıklı sistemler için hedef < %1.\n• Throughput: Sistemin saniyede işlediği istek sayısı. Ne kadar yüksekse o kadar iyi.\n• Apdex Skoru: Kullanıcı memnuniyeti skoru (0-1). Memnun > 0.85, Tolere edebilir 0.5-0.85, Memnuniyetsiz < 0.5.' },
          { type: 'qa', question: 'S7: JMeter\'ı Jenkins/CI CD ile nasıl entegre edersiniz?', answer: 'Seçenek 1: Jenkins JMeter Eklentisi\n• Jenkins\'e "Performance Plugin" kur\n• .jtl sonuç dosyasına işaret eden "Publish Performance Test Result Report" post-build eylemi ekle\n• Eşikler belirle: hata oranı > X% veya ortalama yanıt > Yms ise build\'i başarısız say\n\nSeçenek 2: Shell/Bat adımı\n• "Execute Shell" build adımı kullan\n• JMeter CLI çalıştır ve çıkış kodunu kontrol et\n\nSeçenek 3: GitHub Actions\n• actions/setup-java kullan, JMeter\'ı indir, CLI çalıştır, HTML raporu artifact olarak yükle' },
          { type: 'qa', question: 'S8: Dağıtık test nedir? Ne zaman ihtiyaç duyulur?', answer: 'Dağıtık test, yükü koordineli olarak üretmek için birden fazla makine kullanır. Bir Controller makinesi birden fazla Worker (Injector) makinesini yönetir.\n\nNe zaman kullanılır:\n• Tek bir makine yeterli yük üretemiyor (örn. 5000+ kullanıcı gerekiyor)\n• Daha gerçekçi coğrafi kullanıcı dağılımı\n• Test makinesinde CPU/ağ kısıtlamaları var\n\nKural: İyi bir sunucu tek makinede ~300-500 HTTP thread\'i kaldırabilir. Daha fazlası için Worker ekle.' },
        ],
      },
    ],
  },
}
