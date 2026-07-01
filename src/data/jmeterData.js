import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

export const jmeterData = {
  en: {
    hero: {
      title: '⚡ Apache JMeter',
      subtitle: 'Performance & Load Testing Tool',
      intro: 'Learn how to measure, analyse, and improve the performance of your web applications and APIs from scratch — no prior knowledge required.',
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Intermediate', '🚀 Advanced', '🛠️ Real World', '🔗 Ecosystem', '💼 Interview Q&A'],
    sections: [
      // ── 0. INTRODUCTION ──────────────────────────────────────────────────
      {
        title: '🎯 What is JMeter and Performance Testing?',
        blocks: [
          { type: 'simple-box', emoji: '⚡', content: "JMeter simulates thousands of users hitting your website at the same time — like organizing 10,000 people to press a button simultaneously without actually needing those people. Java-based (just like you!), free, and the industry standard for load testing." },
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
          { type: 'heading', text: 'Performance Testing Pyramid' },
          {
            type: 'visual', variant: 'pyramid',
            title: 'Load Testing Strategy — How Much is Enough?',
            levels: [
              { label: 'Endurance (Soak) Tests', color: 'red', desc: 'Hours/days at moderate load — rare, expensive' },
              { label: 'Stress Tests', color: 'orange', desc: 'Push past limits — find breaking point' },
              { label: 'Spike Tests', color: 'yellow', desc: 'Sudden traffic bursts — test elasticity' },
              { label: 'Load Tests', color: 'blue', desc: 'Expected peak users — run every release' },
              { label: 'Smoke / Baseline', color: 'green', desc: '1-5 users — verify system works at all' },
            ],
            note: 'Start at the base. Establish a baseline first, then load test, then stress. Endurance tests run least often but reveal memory leaks.',
          },
          { type: 'heading', text: 'JMeter Test Plan Architecture' },
          {
            type: 'visual', variant: 'boxes',
            title: 'How JMeter Test Components Fit Together',
            items: [
              { icon: '📋', label: 'Test Plan', desc: 'Root container' },
              { arrow: true },
              { icon: '👥', label: 'Thread Group', desc: 'Virtual users', highlight: true },
              { arrow: true },
              { icon: '📡', label: 'Samplers', desc: 'HTTP requests' },
              { arrow: true },
              { icon: '🔍', label: 'Assertions', desc: 'Verify responses' },
              { arrow: true },
              { icon: '📊', label: 'Listeners', desc: 'Collect results' },
            ],
            note: 'Thread Group = users. Samplers = what they do. Assertions = did it work? Listeners = what happened?',
          },
          {
            type: 'visual', variant: 'flow',
            title: 'JMeter Test Execution Flow',
            steps: [
              { num: '1', label: 'Thread Group', desc: 'N users start' },
              { num: '2', label: 'Ramp-up', desc: 'Gradual start' },
              { num: '3', label: 'Send Request', desc: 'HTTP Sampler', highlight: true },
              { num: '4', label: 'Receive Response', desc: 'Status + body' },
              { num: '5', label: 'Assert', desc: 'Check status 200' },
              { num: '6', label: 'Record', desc: 'Store metrics' },
              { num: '7', label: 'Report', desc: 'HTML output' },
            ],
            note: 'Steps 3-6 repeat for every request in every thread. 100 users × 10 requests = 1,000 data points.',
          },
          {
            type: 'quiz',
            question: 'You want to simulate 500 users gradually starting over 60 seconds in JMeter. Which component controls this?',
            options: [
              'HTTP Request Sampler — controls what to test',
              'Thread Group — controls number of users and ramp-up period',
              'Response Assertion — controls pass/fail conditions',
              'Listener — controls result collection',
            ],
            correct: 1,
            explanation: 'Thread Group defines: (1) Number of threads = virtual users, (2) Ramp-up period = seconds to start all users, (3) Loop count = repetitions per user. 500 users with 60s ramp-up means ~8 new users start every second.',
          
        retryQuestion: {
      "question": "You need to configure JMeter to run 200 users that all start executing at the exact same moment and repeat the task 10 times. Which Thread Group settings should you use?",
      "options": [
            {
                  "id": "a",
                  "text": "Number of Threads: 200, Ramp-up: 60, Loop Count: 1"
            },
            {
                  "id": "b",
                  "text": "Number of Threads: 200, Ramp-up: 0, Loop Count: 10"
            },
            {
                  "id": "c",
                  "text": "Number of Threads: 10, Ramp-up: 0, Loop Count: 200"
            },
            {
                  "id": "d",
                  "text": "Number of Threads: 200, Ramp-up: 200, Loop Count: 10"
            }
      ],
      "correct": "b",
      "explanation": "To start users simultaneously, the Ramp-up period must be set to 0. Setting 200 threads with 0 ramp-up ensures immediate execution, and a Loop Count of 10 forces every user to repeat the defined sampler group 10 times."
}
},
        ],
      },

      // ── 1. INSTALLATION ──────────────────────────────────────────────────
      {
        title: '📦 Installation & First Launch',
        blocks: [
          { type: 'simple-box', emoji: '📦', content: "Installing JMeter is like installing a Java IDE — install Java first, then download JMeter, extract the zip, and double-click to launch. No wizard, no installer. Since you know Java, you already have the hardest prerequisite." },
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
          {
            type: 'quiz',
            question: 'Why must Java (JDK 8+) be installed before JMeter, even though JMeter has its own installer-free zip download?',
            options: [
              { id: 'a', text: 'JMeter only generates Java test code' },
              { id: 'b', text: 'JMeter itself is written in pure Java and runs on the JVM — there is no native binary' },
              { id: 'c', text: 'Java is only needed for the GUI, not for running tests' },
              { id: 'd', text: 'It is not actually required, just recommended' },
            ],
            correct: 'b',
            explanation: 'JMeter is a Java application distributed as a zip — there is no separate native executable. Unzipping it and running jmeter.bat/jmeter.sh literally launches a JVM process, the same way you would run any other Java program. Without a JDK/JRE present, the JVM has nothing to launch JMeter with.',
            retryQuestion: {
              question: 'A CI runner has JMeter installed but `jmeter -n -t plan.jmx` fails with a Java-related error. What is the first thing to check?',
              options: [
                { id: 'a', text: 'Whether the .jmx file extension is correct' },
                { id: 'b', text: 'Whether a compatible JDK/JRE is actually installed and on the PATH on that runner' },
                { id: 'c', text: 'Whether the test plan has too many threads' },
                { id: 'd', text: 'Whether JMeter has internet access' },
              ],
              correct: 'b',
              explanation: 'Since JMeter is fundamentally a Java application, any Java-related startup error almost always traces back to a missing, wrong-version, or misconfigured JDK/JRE on that machine — not the test plan itself. Checking `java -version` on the runner is the standard first diagnostic step before looking at JMeter-specific configuration.',
            },
          },
        ],
      },

      // ── 2. INTERMEDIATE ──────────────────────────────────────────────────
      {
        title: '📚 Core Concepts & Building Your First Test',
        blocks: [
          { type: 'simple-box', emoji: '📚', content: "A JMeter test plan is like a script for actors. Thread Group = how many actors and when they start. Sampler = what each actor does (press a button, call an API). Listener = the director watching and recording results. Learn these three and you can build any test." },
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
          {
            type: 'visual', variant: 'boxes',
            title: 'JMeter Test Plan Anatomy — Component Pipeline',
            items: [
              { icon: '📋', label: 'Test Plan', desc: 'root container' },
              { arrow: true },
              { icon: '👥', label: 'Thread Group', desc: 'virtual users' },
              { arrow: true },
              { icon: '🌐', label: 'HTTP Sampler', desc: 'sends requests' },
              { arrow: true },
              { icon: '✅', label: 'Assertion', desc: 'validates response' },
              { arrow: true },
              { icon: '📊', label: 'Listener', desc: 'collects results' },
            ],
            note: 'Thread Group = how many users & how fast. HTTP Sampler = what to request. Assertion = what counts as pass/fail. Listener = how to view results.',
          },
          {
            type: 'comparison',
            left: {
              label: '🔍 Debug Listeners (use while building)',
              code: `// View Results Tree
// - See every request & response
// - Green = pass, Red = fail
// - Shows headers, body, timing
// - ❌ Disable for load tests
//   (consumes huge memory!)

// Simple Data Writer
// - Write raw results to file
// - Lightweight alternative`,
              note: 'Always disable debug listeners before running real load tests.',
            },
            right: {
              label: '📊 Report Listeners (use in load tests)',
              code: `// Aggregate Report
// - Avg, Min, Max, 90th/95th/99th %ile
// - Error % per endpoint
// - Throughput (req/sec)

// Summary Report
// - Lighter than Aggregate
// - Good for 1000+ users

// HTML Dashboard (--reportonly)
// - Best: generate after test`,
              note: 'Generate HTML dashboard with -e -o report/ flag in CLI mode.',
            },
          },
          {
            type: 'visual', variant: 'flow',
            title: 'Thread Group: Ramp-Up Execution Timeline',
            note: 'Ramp-up spreads user starts evenly over time — prevents a sudden spike from masking real performance behaviour.',
            steps: [
              { num: 'T=0s', label: 'Thread Group starts', desc: 'Number of Threads=100, Ramp-Up=60s, Duration=300s', highlight: true },
              { num: 'T=0–60s', label: 'Ramp-up phase', desc: '~1.67 new users/second start sending requests' },
              { num: 'T=60s', label: 'Full load reached', desc: 'All 100 virtual users running concurrently' },
              { num: 'T=60–300s', label: 'Sustained load', desc: 'Steady-state: measure throughput, latency, errors', highlight: true },
              { num: 'T=300s', label: 'Test ends', desc: 'Threads complete their current request and stop' },
            ],
          },
          {
            type: 'visual', variant: 'boxes',
            title: 'Thread Group Parameters — What Each One Controls',
            items: [
              { icon: '👥', label: 'Number of Threads', desc: 'total virtual users (start with 10–50)' },
              { arrow: true },
              { icon: '⏱️', label: 'Ramp-Up (sec)', desc: 'seconds to start all threads (gradual increase)' },
              { arrow: true },
              { icon: '🔁', label: 'Loop Count / ∞', desc: 'repeats per user (-1 = infinite, use Duration instead)' },
              { arrow: true },
              { icon: '⏰', label: 'Duration (sec)', desc: 'total test run time — preferred over Loop Count' },
            ],
            note: 'Golden rule: Ramp-Up ≥ 10% of Duration. Too short a ramp-up creates an artificial spike — not a realistic load pattern.',
          },
          {
            type: 'quiz',
            question: 'A Thread Group is set to Number of Threads = 10 and Ramp-Up Period = 10 seconds. What actually happens when the test starts?',
            options: [
              { id: 'a', text: 'All 10 threads start at the same instant' },
              { id: 'b', text: 'Threads start gradually, roughly 1 new thread per second, until all 10 are running' },
              { id: 'c', text: 'Only 1 thread runs for 10 seconds, then the rest start' },
              { id: 'd', text: 'JMeter waits 10 seconds before starting any thread' },
            ],
            correct: 'b',
            explanation: 'Ramp-Up Period spreads the thread startup evenly across the given time: 10 threads over 10 seconds means roughly 1 new virtual user comes online every second. This simulates a realistic traffic increase instead of slamming the server with all users at once — a near-zero ramp-up creates an artificial instant spike, not a realistic load pattern.',
            retryQuestion: {
              question: 'A test plan sets Number of Threads=100 and Ramp-Up Period=1 second. What kind of load pattern does this actually create?',
              options: [
                { id: 'a', text: 'A smooth, gradual increase in traffic over 100 seconds' },
                { id: 'b', text: 'An almost instantaneous spike — all 100 users hit the server within about 1 second' },
                { id: 'c', text: 'JMeter rejects this configuration as invalid' },
                { id: 'd', text: 'Exactly 1 user starts every 100 seconds' },
              ],
              correct: 'b',
              explanation: 'Cramming 100 threads into a 1-second ramp-up means nearly all of them start almost simultaneously — this deliberately creates an instant spike test (useful for testing how a system handles a sudden burst) rather than a gradual ramp. The "golden rule" of Ramp-Up ≥ 10% of Duration exists precisely to avoid accidentally creating this kind of unrealistic instant-spike pattern when a gradual one was intended.',
            },
          },
        ],
      },

      // ── 3. ADVANCED ──────────────────────────────────────────────────────
      {
        title: '🚀 Advanced JMeter',
        blocks: [
          { type: 'simple-box', emoji: '🚀', content: "Advanced JMeter is about running tests without the GUI (faster, CI/CD-ready), distributing load across multiple machines, and extracting dynamic tokens from responses. Think of it as going from manual gear-shifting to autopilot." },
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
          {
            type: 'visual', variant: 'flow',
            title: 'Non-GUI CLI Command Pipeline',
            note: 'Always use Non-GUI mode for real load tests. GUI overhead can skew results by 20-30% on large thread counts.',
            steps: [
              { num: '1', label: 'Write test.jmx', desc: 'Create in GUI' },
              { num: '2', label: 'jmeter -n -t test.jmx', desc: 'Non-GUI mode', highlight: true },
              { num: '3', label: '-l results.jtl', desc: 'Raw results file' },
              { num: '4', label: '-e -o ./report', desc: 'HTML dashboard', highlight: true },
              { num: '5', label: 'open report/index.html', desc: 'View metrics' },
            ],
          },
          {
            type: 'comparison',
            left: {
              label: '❌ Debug Listeners (Dev Only)',
              code: `View Results Tree
  → Shows every request/response
  → Full request body visible
  → Full response body visible

⚠ NEVER use in real load tests:
  • Stores ALL data in RAM
  • Slows JMeter itself down
  • Skews your test results
  • Causes OOM crashes at 500+ users`,
              note: 'View Results Tree is for debugging scripts only — disable it before running real tests',
            },
            right: {
              label: '✅ Report Listeners (Production)',
              code: `Aggregate Report
  → Average, Min, Max, P90, P99
  → Error rate, Throughput
  → Memory-efficient counters only

Summary Report
  → Lightweight running totals

HTML Dashboard (-e -o)
  → Full interactive report
  → Generated after test run
  → No runtime overhead`,
              note: 'Aggregate Report + HTML Dashboard is the standard combination for CI/CD pipelines',
            },
          },
          {
            type: 'quiz',
            question: 'Why are real load tests run in JMeter\'s Non-GUI (CLI) mode in CI/CD pipelines instead of the GUI mode used to build the test plan?',
            options: [
              { id: 'a', text: 'Non-GUI mode supports more protocols' },
              { id: 'b', text: 'GUI mode consumes significant resources rendering the interface, which skews results and is officially discouraged for actual load generation' },
              { id: 'c', text: 'GUI mode cannot save .jmx files' },
              { id: 'd', text: 'CI runners do not support installing JMeter at all' },
            ],
            correct: 'b',
            explanation: 'The JMeter GUI itself consumes CPU and memory rendering charts, trees, and listeners in real time — resources that should be going toward generating load, not drawing a UI. JMeter\'s own documentation explicitly states the GUI should only be used to build/debug a test plan, while actual load generation should always run via `jmeter -n -t plan.jmx` (Non-GUI mode), which is also what makes JMeter scriptable inside a CI/CD pipeline step.',
            retryQuestion: {
              question: 'A QA engineer runs a 500-user load test directly in JMeter\'s GUI mode and the response times look suspiciously high. What is the most likely explanation?',
              options: [
                { id: 'a', text: 'The target server is definitely broken' },
                { id: 'b', text: 'The GUI itself is competing for CPU/memory with the load generation, skewing the measured response times' },
                { id: 'c', text: 'GUI mode cannot generate more than 10 users' },
                { id: 'd', text: 'JMeter always reports double the real response time in GUI mode' },
              ],
              correct: 'b',
              explanation: 'Running a real load test in GUI mode means the JVM is splitting resources between actually generating load AND continuously rendering live charts/trees/listeners — this overhead can inflate measured response times in a way that has nothing to do with the target server\'s real performance. Switching to Non-GUI mode (`jmeter -n -t plan.jmx`) removes that confound and gives trustworthy numbers.',
            },
          },
        ],
      },

      // ── 4. REAL WORLD ─────────────────────────────────────────────────────
      {
        title: '🛠️ Real World Usage',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: "Running a JMeter load test before a big sale is like a fire drill for a building — you don't want to discover the exits are too narrow during a real fire. You find and fix the bottlenecks while nobody's order (or job) depends on it." },
          { type: 'heading', text: 'What Need Does This Fill? Life Without Load Testing' },
          { type: 'text', content: "Without load testing, the first time your system meets real concurrent traffic is in production — usually the worst possible moment (Black Friday, a viral post, a marketing blast). A checkout that responds in 200ms for 1 user can become an 8-second timeout for 500 concurrent users, because of database connection pool exhaustion, thread starvation, or an N+1 query that only shows up under load. Functional tests (Selenium, pytest) never catch this — they only ever run with 1 user." },
          { type: 'heading', text: 'Real-World Scenario: E-commerce Flash Sale' },
          { type: 'text', content: "A mid-size e-commerce company (Spring Boot backend + React frontend — sound familiar?) is launching a flash sale email to 200,000 subscribers. Marketing expects 2,000 people to click within the first 10 minutes. The QA team is asked: 'Will checkout survive this?'" },
          {
            type: 'steps',
            items: [
              'Record the critical user journey: login → browse product → add to cart → checkout (via HTTP(S) Test Script Recorder or by hand with HTTP Request samplers)',
              'Build a Thread Group: 500 users, 60s ramp-up, representing the expected 10-minute spike compressed for testing',
              'Add CSV Data Set Config with 500 unique test accounts so each virtual user has its own session — testing with 1 shared account would hide row-locking bugs',
              'Run in Non-GUI mode against a staging environment sized like production: jmeter -n -t flashsale.jmx -l results.jtl -e -o report/',
              'First run: Aggregate Report shows P99 = 14,000ms and 12% errors on /api/checkout — the database connection pool (default size 10) is exhausted',
              'Fix: increase HikariCP pool size to 50, add a Redis cache in front of the product-price lookup that was hitting the DB on every request',
              'Re-run the exact same test plan — P99 drops to 1,800ms, errors drop to 0.2% — now it is safe to send the campaign',
            ]
          },
          { type: 'heading', text: 'Comparing JMeter to Alternatives — Real-World Trade-offs' },
          {
            type: 'table',
            headers: ['Tool', 'Advantages ✅', 'Disadvantages ❌', 'Choose it when...'],
            rows: [
              ['JMeter', 'No-code GUI for building tests, 600+ protocols, huge community, free', 'Heavier resource usage, XML-based .jmx files are not great for code review/diffs', 'Your team has QA engineers without strong coding skills, or you need non-HTTP protocols (JDBC, JMS, FTP)'],
              ['k6', 'Test-as-code (JavaScript), lightweight, excellent CI/CD output, built for developers', 'No built-in GUI for test building, smaller protocol support', 'Your team is developer-heavy and wants load tests to live in the same repo as the app, reviewed like any other code'],
              ['Locust', 'Python-based, very easy to write complex user behavior logic, distributed by default', 'Smaller ecosystem of plugins/listeners than JMeter', 'Your team already writes Python (pytest) and wants performance tests in the same language'],
            ]
          },
          { type: 'heading', text: 'Real-World Integration Flow' },
          {
            type: 'visual', variant: 'flow',
            title: 'How a Load Test Actually Reaches Production Decisions',
            steps: [
              { num: '1', label: 'Write .jmx', desc: 'QA builds test plan in GUI' },
              { num: '2', label: 'Commit to repo', desc: 'tests/performance/flashsale.jmx' },
              { num: '3', label: 'CI triggers nightly', desc: 'GitHub Actions / Jenkins cron', highlight: true },
              { num: '4', label: 'Run Non-GUI', desc: 'jmeter -n -t ... -l results.jtl' },
              { num: '5', label: 'Compare to baseline', desc: 'Is P99 worse than last week?' },
              { num: '6', label: 'Alert or pass', desc: 'Slack message if regression found', highlight: true },
            ],
            note: 'This is exactly the same pipeline shape as functional CI — only the assertion changed from "did it work" to "was it fast enough."',
          },
          {
            type: 'simulation',
            scenario: 'jmeter-load-test',
            icon: '⚡',
            color: '#f5a623',
            title: { en: 'Running the Flash-Sale Load Test', tr: 'Flaş İndirim Yük Testini Çalıştırma' },
            description: { en: 'Click ▶ to run the checkout load test in Non-GUI mode and watch the Aggregate Report build live, just like a CI pipeline would.', tr: '▶ butonuna tıklayarak checkout yük testini Non-GUI modda çalıştır ve bir CI pipeline\'ında olduğu gibi Aggregate Report\'un canlı oluşmasını izle.' },
            code: `# Full CI/CD-ready non-GUI load test run
jmeter -n -t flashsale.jmx \\
       -l results.jtl \\
       -e -o report/ \\
       -Jusers=500 \\
       -Jrampup=60 \\
       -Jduration=300

# Exit code 0 only means "the test plan executed" — NOT "it passed"!
# Real pass/fail comes from parsing results.jtl or the HTML report:
ERROR_RATE=$(grep -c ',false,' results.jtl || true)
if [ "$ERROR_RATE" -gt 0 ]; then
  echo "Load test found failures — blocking the campaign send"
  exit 1
fi`,
            language: 'bash',
          },
          { type: 'heading', text: 'Hands-On Mini Project — Try It Yourself' },
          { type: 'text', content: 'Copy this into a fresh JMeter Test Plan to load test a free public API and see real percentile data in under 5 minutes.' },
          {
            type: 'code', code: `# 1. Thread Group: 20 threads, 10s ramp-up, 1 loop
# 2. HTTP Request Sampler:
#    Method: GET
#    Server: jsonplaceholder.typicode.com
#    Path:   /posts

# 3. Response Assertion: Response Code = 200

# 4. Run from CLI:
jmeter -n -t public_api_test.jmx -l results.jtl -e -o report/

# 5. Open report/index.html — look at the "APDEX" and
#    "Response Times Over Time" charts. With only 20 users
#    against a free public API you should see near-zero errors
#    and a P99 close to the average — that is what a HEALTHY
#    system looks like under modest load.`
          },
          {
            type: 'quiz',
            question: 'A team has QA engineers with limited coding skills and needs to test non-HTTP protocols (JDBC, JMS). Why would JMeter be preferred over a code-first tool like k6 here?',
            options: [
              { id: 'a', text: 'JMeter always produces faster test runs' },
              { id: 'b', text: 'JMeter offers a no-code GUI for building tests plus 600+ protocol support, including non-HTTP protocols k6 does not cover well' },
              { id: 'c', text: 'k6 cannot generate HTML reports' },
              { id: 'd', text: 'JMeter is the only free option' },
            ],
            correct: 'b',
            explanation: "JMeter's GUI lets someone build a full test plan by configuring samplers and listeners, with no scripting required, and it has built-in support for a huge range of protocols (HTTP, JDBC, JMS, FTP, and more). k6 is test-as-code (JavaScript) and excels with developer-heavy teams who want lightweight, CI-friendly tests, but it has a narrower protocol surface and no built-in GUI for building tests. The right tool depends on team skill set and protocol needs, not raw speed.",
            retryQuestion: {
              question: 'A team is entirely developer-heavy, comfortable writing JavaScript, and only needs to load test HTTP REST APIs with lightweight CI-friendly tests. Which tool fits better here?',
              options: [
                { id: 'a', text: 'JMeter, because it always has more features' },
                { id: 'b', text: 'k6, because test-as-code in JavaScript suits a developer-heavy team and fits naturally into a lightweight CI pipeline' },
                { id: 'c', text: 'Neither tool can test HTTP APIs' },
                { id: 'd', text: 'JMeter, because k6 requires a GUI to write tests' },
              ],
              correct: 'b',
              explanation: 'k6\'s test-as-code approach (writing tests in JavaScript) plays to the strengths of a developer-heavy team and integrates naturally as lightweight, version-controlled CI steps — there is no GUI to learn, and no protocols beyond HTTP/WebSocket are needed here. JMeter\'s GUI and 600+ protocol support is a strength for non-coding QA teams or non-HTTP protocols, but it is not the better fit for this specific team and use case.',
            },
          },
        ],
      },

      // ── 5. ECOSYSTEM ──────────────────────────────────────────────────────
      {
        title: '🔗 Ecosystem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "JMeter rarely works alone — think of it like a thermometer. The thermometer (JMeter) measures the temperature, but you still need someone to take the reading on a schedule (Jenkins/CI), write it on a chart over time (Grafana), and put the thermometer in a box you can ship anywhere (Docker)." },
          { type: 'heading', text: 'How JMeter Fits Into the Bigger Picture' },
          { type: 'text', content: 'On its own, JMeter is just a tool that runs once and produces a results file. Its real value in a QA pipeline comes from being wired into three other systems: a CI/CD tool that runs it automatically and on a schedule, a container runtime that makes it portable and distributable, and a time-series dashboard that turns one-off results into trend lines you can alert on.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'JMeter Ecosystem — Who Talks to Whom',
            items: [
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'triggers JMeter on schedule or on PR' },
              { arrow: true },
              { icon: '🐳', label: 'JMeter (in Docker)', desc: 'runs the .jmx test plan, Non-GUI' },
              { arrow: true },
              { icon: '📄', label: 'results.jtl', desc: 'raw results file' },
              { arrow: true },
              { icon: '📈', label: 'InfluxDB + Grafana', desc: 'stores & visualizes trends over time', highlight: true },
            ],
            note: 'Each tool does one job well — JMeter generates load, Jenkins schedules it, Docker makes it portable, Grafana shows the trend.',
          },
          { type: 'heading', text: 'Three Key Relationships' },
          {
            type: 'table',
            headers: ['Technology', 'Relationship with JMeter', 'Problem Solved Together'],
            rows: [
              ['Jenkins / GitHub Actions', 'CI tool calls `jmeter -n -t ...` as a build step, on a cron schedule or before merging', 'Performance regressions are caught automatically instead of relying on someone remembering to run a manual load test'],
              ['Docker', 'JMeter ships as a container image (e.g. `justb4/jmeter`) so every CI runner uses the exact same JMeter version and plugins', 'No more "works on my machine" — the load generator itself becomes reproducible, just like the app it is testing'],
              ['Grafana + InfluxDB', 'A JMeter Backend Listener streams live metrics into InfluxDB; Grafana queries InfluxDB to render real-time dashboards', 'Turns a single .jtl file from one run into a historical trend line — "is P99 getting worse release over release?"'],
              ['Kubernetes', 'JMeter worker pods can be scaled horizontally as a Kubernetes Job/Deployment for distributed testing', 'A single machine cannot generate enough load for very large tests (5,000+ users); k8s makes spinning up dozens of injectors trivial'],
            ]
          },
          { type: 'heading', text: 'JMeter + Grafana Real-Time Dashboard (Backend Listener)' },
          { type: 'text', content: 'Instead of waiting until the test ends to see results, a Backend Listener streams every sample to InfluxDB as the test runs, so Grafana shows live throughput and response times.' },
          {
            type: 'code', code: `# Add a Backend Listener to your Thread Group:
#   Backend Listener implementation: InfluxdbBackendListenerClient
#   influxdbUrl: http://localhost:8086/write?db=jmeter
#   application: checkout-loadtest
#   measurement: jmeter

# Then in Grafana, add an InfluxDB data source pointing at the
# same database, and import JMeter dashboard ID 5496 from
# grafana.com/dashboards — you get live RPS, error rate and
# response-time percentile graphs while the test is still running.`
          },
          { type: 'heading', text: 'JMeter in Docker' },
          {
            type: 'code', code: `# Run a load test without installing JMeter locally:
docker run --rm -v $(pwd):/tests justb4/jmeter \\
  -n -t /tests/flashsale.jmx \\
  -l /tests/results.jtl \\
  -e -o /tests/report

# Same command every CI runner, every developer machine —
# zero "which JMeter version do you have?" debugging.`
          },
          { type: 'tip', content: 'In a real pipeline these four pieces compose: GitHub Actions triggers a Docker container running JMeter on a schedule, results stream to InfluxDB via a Backend Listener, and Grafana alerts the team in Slack if P99 crosses a threshold — fully automated performance regression detection.' },
          {
            type: 'quiz',
            question: 'What is the core benefit of running JMeter as a Docker image (e.g. justb4/jmeter) instead of installing it directly on each CI runner?',
            options: [
              { id: 'a', text: 'Docker makes JMeter run tests faster' },
              { id: 'b', text: 'Every CI runner and developer machine guarantees the exact same JMeter version and plugins — no "works on my machine" drift' },
              { id: 'c', text: 'Docker is required to use the Backend Listener' },
              { id: 'd', text: 'It removes the need for a .jmx test plan' },
            ],
            correct: 'b',
            explanation: 'A Docker image pins the exact JMeter version and any installed plugins into one reproducible artifact. Without it, one CI runner might have JMeter 5.4 and another 5.6, or different plugin versions — leading to subtly different results or "works on my machine" debugging. Running `docker run justb4/jmeter ...` guarantees the load generator itself is just as reproducible as the application under test.',
            retryQuestion: {
              question: 'Two CI runners produce slightly different load test results for the identical .jmx test plan, even though the target server and network conditions were the same. What is a likely cause?',
              options: [
                { id: 'a', text: 'Load test results are always random and meaningless' },
                { id: 'b', text: 'The two runners may have different JMeter versions or plugin versions installed locally, producing subtly different behavior' },
                { id: 'c', text: 'The .jmx file format changes randomly between runs' },
                { id: 'd', text: 'JMeter results can never be compared across machines' },
              ],
              correct: 'b',
              explanation: 'If JMeter is installed directly on each runner rather than run from a pinned Docker image, version drift (5.4 vs 5.6, or different plugin versions) between runners is a real and common source of subtly different results — the exact "works on my machine" class of problem. Running JMeter from the same Docker image tag on every runner eliminates this variable entirely.',
            },
          },
        ],
      },

      // ── 6. INTERVIEW Q&A ─────────────────────────────────────────────────
      {
        title: '💼 JMeter Interview Questions & Answers',
        blocks: [
          { type: 'simple-box', emoji: '💼', content: "JMeter interviews don't ask 'what is Thread Group?' — they ask 'your test shows P99=12s but average=300ms, what does that mean and what do you do?' This section prepares you for metrics-interpretation and architecture questions, not just definitions." },
          { type: 'text', content: 'These are the most frequently asked JMeter interview questions. Click each question to see the detailed answer.' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'jmeter-errors',
            framework: 'JMeter',
            errors: [
              {
                error: 'java.net.ConnectException: Connection refused',
                fullMessage: 'java.net.ConnectException: Connection refused: connect\nat org.apache.jmeter.protocol.http.sampler.HTTPHC4Impl.executeRequest',
                cause: { tr: 'JMeter hedef sunucuya bağlanamıyor. Sunucu kapalı, yanlış port/host ayarlandı veya güvenlik duvarı bağlantıyı engelliyor.', en: 'JMeter cannot connect to the target server. The server is down, wrong host/port is configured, or a firewall is blocking the connection.' },
                solution: { tr: '1) Sunucunun çalıştığını doğrulayın. 2) HTTP Request\'de Host ve Port değerlerini kontrol edin. 3) Tarayıcıdan URL\'e erişebildiğinizi test edin. 4) Güvenlik duvarı kurallarını kontrol edin.', en: '1) Verify the server is running. 2) Check Host and Port in HTTP Request. 3) Test the URL from a browser. 4) Check firewall rules.' },
                codeWrong: `# Yanlış host/port — sunucu 8080'de dinliyor
HTTP Request:
  Server Name: localhost
  Port: 3000  ← YANLIŞ`,
                codeFixed: `# Doğru port
HTTP Request:
  Server Name: localhost
  Port: 8080
  Path: /api/users`
              },
              {
                error: 'EXTRACTION_FAILED — Variable contains EXTRACTION_FAILED',
                fullMessage: '${authToken} → EXTRACTION_FAILED\nJSON Extractor: No results for expression: $.data.token',
                cause: { tr: 'JSON Extractor veya Regex Extractor belirtilen path/pattern ile yanıtta hiçbir değer bulamadı. Login başarısız olmuş, response yapısı değişmiş veya JSON path yanlış yazılmış.', en: 'JSON Extractor or Regex Extractor could not find a value matching the specified path/pattern in the response. Login failed, response structure changed, or JSON path is wrong.' },
                solution: { tr: '1) View Results Tree ile gerçek yanıtı kontrol edin. 2) JSON path ifadesini doğrulayın (JSONPath online tester kullanın). 3) Önceki isteğin başarılı olduğundan emin olun. 4) Default value olarak EXTRACTION_FAILED yerine boş bırakın — ama assertion ekleyin.', en: '1) Check the actual response in View Results Tree. 2) Verify the JSON path expression (use an online JSONPath tester). 3) Ensure the previous request succeeded. 4) Leave Default Value empty but add an assertion to catch failures.' },
                codeWrong: `# Yanlış JSON path — response yapısı farklı
# Gerçek response: {"result": {"token": "abc"}}
# Yanlış path:
JSON Path: $.data.token  ← data anahtarı yok`,
                codeFixed: `# Doğru JSON path
JSON Path: $.result.token

# Assertion ekle — extraction başarısız olursa test başarısız say
Response Assertion:
  Apply to: JMeter Variable: authToken
  Pattern: EXTRACTION_FAILED
  Not: ✓ (yoksa başarısız say)`
              },
              {
                error: 'OutOfMemoryError: Java heap space',
                fullMessage: 'java.lang.OutOfMemoryError: Java heap space\nat org.apache.jmeter.reporters.ResultCollector.sampleOccurred',
                cause: { tr: 'JMeter\'ın JVM heap alanı doldu. Genellikle View Results Tree gibi çok fazla veri saklayan Listener\'lar büyük testlerde çalıştırıldığında olur.', en: 'JMeter\'s JVM heap space is exhausted. Usually caused by Listeners like View Results Tree storing too much data during large-scale tests.' },
                solution: { tr: '1) View Results Tree\'yi devre dışı bırakın veya kaldırın — yalnızca debug için kullanın. 2) JMeter başlangıç heap boyutunu artırın: jmeter.bat/sh dosyasında -Xmx4g. 3) Büyük testlerde yalnızca Aggregate Report veya Summary Report kullanın.', en: '1) Disable or remove View Results Tree — use only during debug. 2) Increase JMeter heap: set -Xmx4g in jmeter.bat/sh. 3) For large tests, use only Aggregate Report or Summary Report.' },
                codeWrong: `# Yanlış — büyük testte View Results Tree etkin
Thread Group: 1000 users × 300 loops
Listener: View Results Tree (tüm yanıtları RAM'de saklar) ← YANLIŞ`,
                codeFixed: `# Doğru — büyük testlerde yalnızca verimli listener'lar
Thread Group: 1000 users × 300 loops
Listener: Aggregate Report      ← sadece istatistik tutar
CLI flag: -e -o ./report        ← HTML raporu test sonrası üret

# JVM heap'i artır (jmeter.bat/jmeter.sh):
set HEAP=-Xms4g -Xmx4g`
              },
              {
                error: 'Response code: Non HTTP response code — Connection timed out',
                fullMessage: 'Response code: Non HTTP response code: org.apache.http.conn.ConnectTimeoutException\nResponse message: Non HTTP response message: Connect to api.example.com:443 timed out',
                cause: { tr: 'Sunucu, JMeter\'ın beklediği süre içinde bağlantıyı kabul etmedi. Yüksek yükte sunucu kapasitesini aşıyor veya ağ gecikmesi çok yüksek.', en: 'The server did not accept the connection within JMeter\'s timeout window. Under heavy load the server may be at capacity, or network latency is too high.' },
                solution: { tr: '1) Connection timeout\'u artırın: Advanced sekmesinde Connection Timeout. 2) Bu hatanın yüksek yükte çoğalıp çoğalmadığını kontrol edin — bu, sistemin kırılma noktasına işaret eder. 3) Ramp-up süresini uzatın.', en: '1) Increase the connection timeout in the Advanced tab of HTTP Request. 2) Check if this error multiplies under high load — it signals the system breaking point. 3) Increase ramp-up period.' },
                codeWrong: `# Çok kısa timeout ve aşırı agresif ramp-up
HTTP Request Advanced:
  Connection Timeout: 1000ms
Thread Group: 1000 users, Ramp-Up: 5s ← çok hızlı`,
                codeFixed: `# Gerçekçi timeout ve kademeli ramp-up
HTTP Request Advanced:
  Connection Timeout: 10000ms
  Response Timeout:   30000ms

Thread Group:
  Number of Users: 1000
  Ramp-Up: 300s  ← 5 dakikada kademeli artış`
              },
              {
                error: 'Test script did not run — FAILED: Assertion failed on variable',
                fullMessage: 'Response code: 200\nAssertion failure message: Test failed: text expected to contain /dashboard',
                cause: { tr: 'Response Assertion beklenen string\'i ya da pattern\'ı yanıtta bulamadı. URL doğru çalışıyor ama içerik beklenenin dışında — örneğin: login başarısız, hata mesajı döndü.', en: 'The Response Assertion could not find the expected string or pattern in the response. The URL works but content is wrong — e.g., login failed and an error page returned instead of the dashboard.' },
                solution: { tr: '1) View Results Tree\'de gerçek response body\'yi inceleyin. 2) Assertion pattern\'ını güncellemeyi düşünün. 3) Bu istek öncesi adımların (login, token extraction) başarılı olduğundan emin olun.', en: '1) Inspect the actual response body in View Results Tree. 2) Consider updating the assertion pattern. 3) Ensure preceding steps (login, token extraction) succeeded.' },
                codeWrong: `# Assertion başarısız — login başarısız ama fark edilmedi
Response Assertion:
  Response Field: Response Body
  Pattern: Welcome to Dashboard
  ← Login'de hata olduğu için "Invalid credentials" dönüyor`,
                codeFixed: `# İki katmanlı doğrulama
# 1) Status kodu assertion
Response Assertion:
  Response Code: 200

# 2) Body assertion
Response Assertion:
  Pattern: Welcome to Dashboard

# 3) Login isteğine de assertion ekle
Response Assertion on Login:
  Pattern: "token"  ← token yoksa login başarısız demektir`
              },
            ]
          },
          {
            type: 'interview-questions',
              relatedTopicId: 'jmeter',
            topic: 'JMeter',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              { level: 'basic', q: { en: 'What is JMeter and what is it used for? What protocols does it support?' }, a: { en: 'Apache JMeter is an open-source Java-based performance testing tool used to load test functional behavior and measure performance of web applications, APIs, and services. Primary use cases: load testing (simulate concurrent users), performance testing (measure response times/throughput), stress testing (find the breaking point), and API testing (REST/SOAP). Supported protocols: HTTP/HTTPS, FTP, JDBC, LDAP, SMTP, TCP, JMS, WebSocket (via plugin). Java analogy: similar to writing a custom load-testing harness with thread pools and HTTP clients by hand, except JMeter gives you that infrastructure plus reporting out of the box.' } },
              { level: 'basic', q: { en: 'What is the difference between Load Testing, Stress Testing, and Spike Testing?' }, a: { en: 'Load Testing tests the system under expected (normal and peak) load to verify performance meets SLAs (e.g., response time < 2s for 1000 users). Stress Testing deliberately pushes the system beyond capacity until it fails, to find the breaking point and observe failure behavior. Spike Testing suddenly applies a very large load for a short time then removes it, to verify the system survives sudden traffic surges (a news story goes viral, a flash sale starts). Each answers a different production question, so a single "performance test" without specifying which of these you ran is an incomplete answer in an interview.' } },
              { level: 'basic', q: { en: 'Explain the Thread Group parameters: Number of Threads, Ramp-Up Period, and Loop Count.' }, a: { en: 'Number of Threads is the total virtual users JMeter simulates — each thread runs independently as one simulated real user. Ramp-Up Period is the time (seconds) JMeter takes to start all threads — 100 threads with a 50-second ramp-up starts about 2 users/second, preventing a "thundering herd" that would overwhelm the server instantly. Loop Count is how many times each thread repeats the scenario; set to -1 for infinite when using a Duration setting instead. Getting ramp-up wrong is one of the most common reasons a load test result doesn\'t match real traffic patterns.' } },
              { level: 'basic', q: { en: 'Why should you use Non-GUI mode for load tests, and how do you run it?' }, a: { en: 'The GUI consumes significant CPU and memory, which reduces the load JMeter can generate, skews performance metrics (the JMeter machine itself becomes the bottleneck), and makes results unreliable. For any test with 50+ users, always use Non-GUI (CLI) mode: jmeter -n -t test.jmx -l results.jtl, optionally with -e -o ./html-report for an HTML report, and -Jusers=500 -Jduration=300 to override properties from the command line. The GUI is for building and debugging the test plan with a handful of threads only — never for generating real load.' } },
              { level: 'basic', q: { en: 'How do you record a JMeter test from browser actions?' }, a: { en: 'Method 1: JMeter\'s built-in HTTP(S) Test Script Recorder — add a Recording Controller to a Thread Group, add the recorder to the WorkBench, set its port (commonly 8888), point your browser\'s proxy at localhost:8888, then record, browse, and stop. Method 2: the BlazeMeter Chrome extension, which records and exports directly as a .jmx file, far less fiddly than manual proxy setup. Method 3: record in Postman and convert the exported collection to .jmx with a conversion tool. Recording is a starting point, not a finished test plan — recorded scripts almost always need correlation, parameterization, and assertions added afterward.' } },
              { level: 'basic', q: { en: 'What is a Sampler in JMeter? Name and describe at least 5 types.' }, a: { en: 'A Sampler is the component that actually sends a request and collects the response — the core "worker" of a test plan. Types: HTTP Request (most common, HTTP/HTTPS), JDBC Request (SQL queries against a database), FTP Request (file upload/download), SMTP Sampler (email/mail server testing), TCP Sampler (raw TCP socket communication), JSR223 Sampler (run custom Groovy/Python/JS code), and Debug Sampler (show JMeter variables in results for debugging). Everything else in a test plan (Timers, Controllers, Listeners) exists to configure, control, or observe what Samplers do — Samplers are the only blocks that generate measurable load.' } },
              { level: 'basic', q: { en: 'What is the Aggregate Report and what does each column mean?' }, a: { en: '# Samples is the total requests sent; Average is the mean response time (ms); Min/Max are the fastest/slowest request; 90%/95%/99% Line are percentiles (90th percentile means 90% of requests were faster than this value); Error % is the percentage of failed requests; Throughput is requests processed per second; Received/Sent KB/sec measure network bandwidth. In practice, focus on P90, P99, and Error% — these give the most meaningful picture of real user experience, since the Average alone can hide a long tail of slow outliers that frustrate a meaningful fraction of real users.' } },
              { level: 'basic', q: { en: 'Your test plan needs the Throughput Shaping Timer to precisely control requests/second, but it doesn\'t show up anywhere in JMeter\'s default Add menu. Why, and how do you get it?' }, a: { en: 'JMeter ships with a relatively small set of built-in components — most advanced features (Throughput Shaping Timer, Custom Thread Groups, additional graphs) live in separate plugins distributed through the JMeter Plugins Manager, a separate .jar you install once that then lets you browse and install plugins from inside JMeter\'s UI (Options → Plugins Manager). Almost every serious load test ends up needing at least one plugin — Throughput Shaping Timer for precise RPS control, or PerfMon for server-side resource monitoring being the two most common. Installing plugins is a one-time setup step per machine (or baked into a Docker image for CI), not something to redo per test plan.' } },
              { level: 'basic', q: { en: 'You try to record a test against an HTTPS site using JMeter\'s recording proxy, and the browser shows a certificate warning or the recording captures no traffic at all. What\'s missing from the setup?' }, a: { en: 'JMeter\'s HTTP(S) Test Script Recorder acts as a man-in-the-middle proxy, which means it needs to present its OWN SSL certificate to your browser instead of the real site\'s certificate — without installing JMeter\'s root CA certificate (generated in <jmeter>/bin/ca.crt) into your browser\'s trusted certificate store, the browser correctly refuses the connection as untrusted. Once the CA cert is trusted (a one-time setup per machine), the recorder can transparently intercept and decrypt HTTPS traffic for recording. This is the same trust mechanism corporate proxies use to inspect HTTPS traffic, just running locally for recording purposes.' } },
              { level: 'basic', q: { en: 'A QA engineer asks why your team uses Postman for daily manual API testing but JMeter for the same API\'s load testing, instead of picking one tool for both. What\'s the actual division of labor?' }, a: { en: 'Postman is optimized for functional, one-request-at-a-time API testing with a great UI for inspecting responses and quick manual exploration — it can send many requests via its Runner, but it isn\'t built to simulate thousands of concurrent virtual users or report percentile-based performance metrics. JMeter is purpose-built for load generation and performance reporting (Thread Groups, ramp-up, P90/P99, throughput) but has a clunkier UI for quick exploratory testing. Teams typically use Postman during functional verification and JMeter once correctness is established and performance under load needs measuring — the right tool for each job, not one tool forced to do both.' } },
              { level: 'basic', q: { en: 'Your team wants to code-review changes to a JMeter test plan in a pull request the same way you review application code, but a teammate says ".jmx files are binary, you can\'t really review them." Is that true?' }, a: { en: '.jmx files are actually plain XML text, not binary — they ARE diffable and reviewable in a pull request, git diff shows exactly which elements changed like any text-based config file. The practical challenge isn\'t the format, it\'s readability: JMeter\'s GUI generates verbose, deeply-nested XML harder to scan visually than hand-written YAML, so reviewers often open the file in JMeter\'s GUI alongside the raw diff to understand what a change does. Treating .jmx files as version-controlled, reviewed artifacts is exactly right — the format supports it, the tooling experience just isn\'t as smooth as reviewing application code.' } },
              { level: 'basic', q: { en: 'What\'s the conceptual difference between a Logic Controller (like a Loop Controller) and a Sampler, and why does mixing up their purpose cause confusing test plans?' }, a: { en: 'A Sampler actually DOES something — it sends a real request and produces a result that shows up in reports. A Logic Controller controls HOW its children execute — a Loop Controller repeats its children N times, an If Controller conditionally runs them — but neither generates a request or appears as a row in results. A common beginner confusion is expecting a Logic Controller to "do" something measurable on its own — it\'s purely an organizational/flow-control wrapper around the Samplers that generate measurable load, similar to how a Java for-loop itself produces no output, only the statements inside it do.' } },
              { level: 'basic', q: { en: 'You remove the HTTP Cookie Manager from a test plan "to simplify it," and now every request that depends on being logged in fails even though the login request itself succeeds. What did removing it break?' }, a: { en: 'Without an HTTP Cookie Manager, JMeter doesn\'t automatically store and resend session cookies like a real browser does — login might succeed and the server might respond with Set-Cookie, but JMeter simply discards it and sends the NEXT request with no session information, making the server treat it as an unauthenticated visitor. Adding HTTP Cookie Manager as a Config Element restores this automatic browser-like handling. This is different from explicit token correlation (JSON Extractor + Authorization header) — cookie-based sessions and token-based auth need their own respective handling.' } },
              { level: 'basic', q: { en: 'Your team runs a 10,000-user load test and the resulting .jtl results file is several gigabytes, painfully slow to open afterward. What configuration choice likely caused this, and how do you fix it?' }, a: { en: 'The default .jtl format can log EVERY field for EVERY sample (including full response data) via jmeter.properties or the Listener\'s "Save As" config — for a 10,000-user, long-duration test, this generates enormous redundant data, most of which is never actually inspected. The fix: log only the fields needed for analysis (response time, response code, success/fail, thread name, timestamp) and disable saving the full response body for passing requests, the single biggest space consumer. For huge tests, consider streaming results to a Backend Listener (InfluxDB) instead of a flat file entirely.' } },
              { level: 'basic', q: { en: 'You need to override a test plan\'s thread count from the command line for different CI environments, and you see both -J and -D flags used in different examples online. What\'s the practical difference?' }, a: { en: '-J sets a JMeter PROPERTY (accessible via ${__P(propname)}) — the standard way to parameterize a test plan from outside, e.g., -Jusers=500. -D sets a JVM SYSTEM property instead, for configuring JMeter\'s own runtime behavior (proxy settings, Java-level config), not values your test plan\'s logic typically reads. For CI parameterization (user counts, target hosts per environment), -J is almost always what you want; -D is reserved for genuine JVM-level configuration, far less common in everyday test plan usage.' } },
              // ── INTERMEDIATE ────────────────────────────────────
              { level: 'intermediate', q: { en: 'What is Correlation in JMeter? How do you implement it?' }, a: { en: 'Correlation is extracting dynamic values (CSRF tokens, session IDs, auth tokens) from server responses and reusing them in subsequent requests — without it, tests fail because these values change per session. Implementation: add a JSON Extractor (or Regular Expression Extractor) to the response containing the value, set a Reference Name (e.g., authToken) and JSON Path ($.token), then reference ${authToken} in subsequent request headers (Authorization: Bearer ${authToken}). Correlation is the single most common reason a recorded test plan fails on replay even though it worked perfectly during recording.' } },
              { level: 'intermediate', q: { en: 'What are Timers in JMeter and why are they important?' }, a: { en: 'Timers introduce a delay (think time / pacing) between requests within a thread, simulating real user behavior — real users never fire requests as fast as possible. Without timers, JMeter generates unrealistic load that can saturate the server with request rates no real user population would ever produce. Common timers: Constant Timer (fixed delay), Gaussian Random Timer (variable delay around an average, more realistic), Uniform Random Timer (random delay within a range), and the plugin-based Throughput Shaping Timer (controls exact requests/second). Skipping timers is one of the most common reasons a load test\'s numbers don\'t resemble production reality.' } },
              { level: 'intermediate', q: { en: 'What are the most important metrics in a JMeter report, and what values are typically acceptable?' }, a: { en: 'Average Response Time (mean, target often < 2000ms for web apps), 90th Percentile/P90 (90% of users get this or faster, target < 3000ms), 99th Percentile/P99 (worst case for 99% of users, target < 5000ms), Error Rate % (target < 1% for healthy systems), Throughput (requests/second the system processes, higher is better), and Apdex Score (user satisfaction 0-1: Satisfied > 0.85, Tolerating 0.5-0.85, Frustrated < 0.5). Interviewers specifically probe whether you understand that Average can look fine while P99 is terrible — the percentile, not the average, is what a meaningful fraction of real users actually experience.' } },
              { level: 'intermediate', q: { en: 'How do you handle authentication in JMeter — Basic Auth, OAuth2/Bearer tokens, and session/cookie-based auth?' }, a: { en: 'Basic Auth: add an HTTP Authorization Manager config element with the base URL, username, and password. OAuth2/Bearer tokens: send a login request first, extract the token with a JSON Extractor, then add it via HTTP Header Manager as "Authorization: Bearer ${token}" on subsequent requests. Cookie/session-based: add an HTTP Cookie Manager config element, which automatically handles Set-Cookie headers and resends them, the same way a browser would. Each mechanism needs its own distinct handling — using a Cookie Manager when the app actually uses bearer tokens (or vice versa) is a common setup mistake that silently breaks every authenticated request.' } },
              { level: 'intermediate', q: { en: 'What is the difference between Throughput and Response Time?' }, a: { en: 'Throughput is the number of requests the system processes per unit time (requests/second or TPS) — it measures the server\'s capacity. Response Time is how long a single request takes to complete — it measures the user\'s experience. As you increase users, throughput rises until the server saturates; after saturation, throughput plateaus while response times increase sharply — the "knee" of this curve is the system\'s practical operating limit. A common interview trap is conflating the two: a system can have high throughput and terrible response times simultaneously (lots of slow requests being processed) — they measure different things and must both be reported.' } },
              { level: 'intermediate', q: { en: 'What is Parameterization in JMeter? Name different methods.' }, a: { en: 'Parameterization is using different data values across test iterations instead of hardcoded values, so each virtual user (or each iteration) exercises the application with realistic, varied input rather than always the same fixed value. Methods: CSV Data Set Config (read from CSV files, best for large datasets), User Defined Variables (test-level variables overridable from the CLI with -J), random functions (${__Random(1,1000)}), Counter Config (incrementing counter for sequential IDs), and JSR223/Groovy (programmatic data generation for more complex cases). Skipping parameterization is one of the most common reasons a load test accidentally measures cache performance instead of genuine application capacity.' } },
              { level: 'intermediate', q: { en: 'Your test plan has 5 separate HTTP samplers (login, get-profile, get-cart, add-item, checkout) but your report shows 5 disconnected response times instead of one meaningful "checkout flow" duration. How do you group them into one logical transaction?' }, a: { en: 'Wrap the relevant samplers in a Transaction Controller, which aggregates their combined execution time into a single reported "transaction" — the report shows one row for "checkout-flow" with its own response time, in addition to or instead of individual sampler rows depending on the "Generate parent sample" checkbox. This is essential for reporting business-meaningful metrics (how long the WHOLE checkout takes) rather than only technical metrics (how long one HTTP call took) — stakeholders usually care about the former, engineers need both.' } },
              { level: 'intermediate', q: { en: 'Your test needs to simulate realistic traffic where 80% of virtual users just browse products and 20% complete a checkout, rather than every user doing the exact same fixed sequence. What Logic Controller fits this percentage-based branching?' }, a: { en: 'A Throughput Controller (set to "Percent Executions" mode) executes its children only a configured percentage of the time across iterations — set one wrapping the browse-only flow to 80% and a second wrapping checkout to 20%, and across many iterations JMeter approximates that traffic split. This is more realistic than a fixed sequence every user follows identically, which almost never matches real traffic and can produce misleadingly uniform load test results compared to production\'s actual mixed usage.' } },
              { level: 'intermediate', q: { en: 'A "flash sale" scenario needs to simulate exactly 500 users hitting checkout at the EXACT same instant, not gradually ramped up over time. A standard Thread Group\'s ramp-up period staggers starts — how do you force true simultaneous execution?' }, a: { en: 'A Synchronizing Timer blocks each thread at that point in the test plan until a configured number of threads have ALL arrived at the same timer, then releases them all simultaneously — this creates a genuine "everyone fires at once" spike regardless of how staggered the Thread Group\'s ramp-up was. Set "Number of Simultaneous Users to Group by" to 500 to hold all 500 threads at that barrier until they\'ve all caught up. This specifically tests true concurrent-spike scenarios (flash sales, ticket releases) that a normal ramp-up, by design, never produces.' } },
              { level: 'intermediate', q: { en: 'Your test plan has grown to 2,000 lines of XML maintained by three different QA engineers, and merge conflicts on the single .jmx file are becoming constant. How does JMeter support modularizing a large test plan across a team?' }, a: { en: 'Include Controllers let you split a test plan into separate .jmx fragment files (login-flow.jmx, checkout-flow.jmx, common-config.jmx) assembled into a single run via Include Controller references in a thin "orchestrator" test plan — each engineer owns and edits their fragment independently, dramatically reducing merge conflicts versus everyone editing one massive shared file. Test Fragments (a dedicated element for content meant to be included, not run standalone) make the intent explicit. This is the JMeter equivalent of splitting a monolithic codebase into team-owned modules.' } },
              { level: 'intermediate', q: { en: 'An older test plan uses BeanShell PreProcessors for custom scripting logic, and a teammate suggests migrating to JSR223 with Groovy instead. Is this just a style preference, or is there a real reason to switch?' }, a: { en: 'JSR223 with Groovy is measurably faster than BeanShell for the same logic, because JSR223 compiles and CACHES the script (when "Cache compiled script" is checked), while BeanShell interprets it fresh every iteration — at scale, this compilation overhead becomes a real performance cost that can itself skew load test results. Groovy is also closer to actual Java syntax, easier for a Java-background team to read. There\'s no remaining reason to start new test plans with BeanShell — it\'s effectively legacy, kept only for backward compatibility with old plans.' } },
              { level: 'intermediate', q: { en: 'A server response contains multiple matching values for the same regex pattern (e.g., 10 product IDs on a search results page), but your Regex Extractor only ever captures the first one. How do you extract a specific one, or a random one, instead?' }, a: { en: 'The Regex Extractor\'s "Match No." field controls which occurrence to capture: 1 (default) takes the first match, 2 the second, and so on; setting Match No. to 0 captures ALL matches into indexed variables (productId_1, productId_2, ... productId_matchNr). To pick a genuinely RANDOM match, set Match No. to -1 to capture all, then use ${__Random(1,${productId_matchNr})} to pick a random index. This pattern simulates a real user clicking a random search result rather than always the first, avoiding unrealistically concentrated load on one specific item.' } },
              { level: 'intermediate', q: { en: 'You set a variable in Thread Group A using a JSR223 Sampler, but Thread Group B can\'t see that value at all even though both run in the same test plan execution. Why, and what should you have used instead?' }, a: { en: 'Variables (vars.put(), accessed via ${varname}) are scoped per-THREAD — they don\'t cross Thread Groups or even between threads in the same group, since each thread has its own independent variable space simulating an independent user. Properties (props.put(), accessed via ${__P(propname)}) are scoped at the JVM/test-plan level and ARE visible across all Thread Groups — this is what you need for genuinely global, shared values. The fix is using props for anything that legitimately needs to be shared across Thread Groups, keeping vars for genuinely per-user values like a session token.' } },
              { level: 'intermediate', q: { en: 'Your performance test runs for 3 hours, and you want to watch response times and error rates trending live on a dashboard rather than waiting until the test finishes. What JMeter feature enables this?' }, a: { en: 'A Backend Listener configured with the InfluxDB (or Graphite) implementation streams every sample result to an external time-series database in real-time as the test runs, rather than only writing to a local .jtl file you can\'t meaningfully inspect until completion. Pairing this with a Grafana dashboard querying that InfluxDB instance gives a live, continuously-updating view of response times, error rates, and throughput while the 3-hour test is still running — letting you abort early if something is clearly broken instead of discovering it only after the full 3 hours.' } },
              { level: 'intermediate', q: { en: 'Every single request passes individually when you click through the test plan in GUI mode one at a time, but the same plan fails massively when run with 500 concurrent threads in Non-GUI mode. What are the most likely causes of this gap?' }, a: { en: 'Running one request at a time never exercises concurrency-dependent bugs — shared/incorrectly-scoped variables (one thread overwriting another\'s token due to a vars/props mistake), server-side resource exhaustion (connection pool exhaustion, DB lock contention) only manifesting under real concurrent load, and client-side resource limits (the JMeter machine running out of file handles or memory at 500 threads) are all invisible at 1-thread testing but very real at scale. Never trust a GUI single-click test as sufficient validation — concurrency behavior can only be validated by actually running with realistic concurrency, ideally first at a moderate scale before jumping straight to 500.' } },
              { level: 'intermediate', q: { en: 'Your load test results look unrealistically fast compared to what real users experience, and you suspect JMeter isn\'t modeling browser caching behavior at all. What\'s missing, and what does adding it actually change?' }, a: { en: 'By default, JMeter has no HTTP Cache Manager, meaning every request — including static assets a real browser would cache (CSS, JS, images) — gets fully re-fetched on every request, generating more server load than real traffic would and producing results that don\'t represent actual user experience. Adding an HTTP Cache Manager makes JMeter respect cache-control headers like a real browser, giving a more realistic profile — though for pure backend/API testing this often doesn\'t matter much, while for full-page web testing it can dramatically change both the generated load and the resulting timing.' } },
              { level: 'intermediate', q: { en: 'You configure a CSV Data Set Config with "Sharing mode: All threads" expecting each virtual user to get a different row, but under high concurrency users end up getting overlapping or duplicate rows. What sharing mode mismatch causes this, and what should it be?' }, a: { en: '"All threads" sharing mode means ALL threads across the ENTIRE test plan pull from one shared, single read position in the CSV — under high concurrency, multiple threads can request "the next row" at nearly the same instant, producing overlapping reads that surprise people expecting strict one-row-per-user isolation. For most "each user gets unique data" scenarios, "Current thread group" is usually intended if data should be scoped per thread group, and ensuring your CSV has at least as many rows as concurrent threads avoids genuine collision regardless of sharing mode.' } },
              { level: 'intermediate', q: { en: 'Your load test shows response times degrading badly after 20 minutes, but you can\'t tell if the application server is actually struggling or if the JMeter test machine itself is the bottleneck. How do you distinguish these without guessing?' }, a: { en: 'Install the PerfMon plugin\'s server agent on the application-under-test\'s host and add a PerfMon Metrics Collector listener — this correlates CPU, memory, disk I/O, and network usage of the SERVER directly alongside JMeter\'s response-time graph on the same timeline, so you can see whether server CPU genuinely spikes when response times degrade (real server-side bottleneck) or stays flat while only the JMeter machine\'s own CPU/memory climbs (client-side bottleneck). Without this correlation, "response times got worse" is a symptom with at least two very different root causes requiring completely different fixes.' } },
              { level: 'intermediate', q: { en: 'A teammate\'s load test has every one of 1,000 virtual users log in within the first 2 seconds, runs for 10 minutes, then everyone logs out simultaneously. Why is this an unrealistic load shape, and what should a more realistic test look like?' }, a: { en: 'Real traffic essentially never arrives as a near-instant spike followed by a flat plateau and an instant drop — that shape only tests the system\'s response to an artificial login storm, not its behavior under sustained, gradually-varying real-world load. A more realistic shape has three phases: a gradual ramp-up (mimicking organic traffic growth), a steady-state period at target load (long enough to observe stable behavior and GC pauses, not just a snapshot), and a gradual ramp-down rather than instantly killing all sessions at once. The Ultimate Thread Group plugin makes defining multi-phase load shapes far easier than chaining basic Thread Groups manually.' } },
              { level: 'intermediate', q: { en: 'Two engineers disagree about whether a slow load test result reflects a real application problem or a JMeter test machine limitation. What specific evidence would settle this disagreement?' }, a: { en: 'Check JMeter\'s own resource usage during the test (PerfMon on the JMeter machine itself, OS-level monitoring, or JMeter\'s own JVM heap usage) — if the JMeter machine\'s CPU is pegged at 100% or its heap is near max while the application server\'s CPU sits comfortably low, the bottleneck is the LOAD GENERATOR, not the system under test. If the application server shows high CPU/memory/connection-pool saturation correlated exactly with the response time degradation, that\'s a genuine server-side bottleneck. Never trust a degrading response-time graph alone — always correlate against BOTH client-side and server-side resource metrics before concluding where the bottleneck lives.' } },
              // ── ADVANCED ────────────────────────────────────────
              { level: 'advanced', q: { en: 'How do you integrate JMeter with Jenkins/CI-CD pipelines?' }, a: { en: 'Option 1: Jenkins Performance Plugin — add a "Publish Performance Test Result Report" post-build action pointing to the .jtl file, with thresholds that fail the build if error rate or average response time exceed set limits. Option 2: a Shell/Bat build step that runs the JMeter CLI directly and checks the exit code. Option 3: GitHub Actions using actions/setup-java, downloading JMeter, running the CLI, and uploading the HTML report as a build artifact. In every case, run in Non-GUI mode, and gate the build on a meaningful threshold, not just "did JMeter exit successfully."' } },
              { level: 'advanced', q: { en: 'What is Distributed Testing in JMeter, and when do you need it?' }, a: { en: 'Distributed testing uses multiple machines to generate load in coordination — a Controller machine manages multiple Worker (Injector) machines via JMeter\'s built-in RMI-based mechanism. Use it when a single machine can\'t generate enough load (e.g., 5000+ users needed), when you need more realistic geographic user distribution, or when CPU/network limits on one machine cap achievable load. Rule of thumb: a decent server can handle roughly 300-500 HTTP threads on a single machine; beyond that, add workers. Setup: run jmeter-server on each worker, add their IPs to remote_hosts in jmeter.properties on the controller, and run with the -R flag.' } },
              { level: 'advanced', q: { en: 'A distributed test across 5 worker machines shows P99 latency values that look impossibly inconsistent between workers — one reports P99=200ms, another P99=4500ms for the supposedly identical scenario at the same wall-clock time. Before suspecting the application, what infrastructure issue should you rule out first?' }, a: { en: 'Clock skew between worker machines is a classic, often-overlooked cause: if each worker\'s system clock isn\'t precisely synchronized (NTP drift, especially on cloud VMs without reliable time sync), each worker\'s OWN measurements stay internally consistent, but timestamps used to correlate "what was happening across all workers at this moment" become unreliable, and aggregate percentile calculations depending on consistent cross-worker timing can mislead. Ensure all workers (and the controller) run NTP with tight sync before trusting cross-worker aggregate comparisons, and when in doubt, validate by checking each worker\'s OWN local results file in isolation first.' } },
              { level: 'advanced', q: { en: 'You need to design a JMeter architecture capable of simulating 50,000 concurrent users, far beyond what any single machine can generate. What does the actual topology and coordination look like at this scale?' }, a: { en: 'A Controller coordinates many Worker machines via JMeter\'s built-in RMI-based distributed testing — but native distributed mode has practical scaling limits around RMI coordination overhead when worker counts get very large, so beyond a certain scale teams switch to container-orchestrated approaches (a Kubernetes Job per worker, or a cloud load-testing service like BlazeMeter/Azure Load Testing that manages provisioning, coordination, and aggregation natively) rather than hand-managing RMI across 50+ machines. At 50,000 users, per-machine thread limits (realistically a few hundred to low thousands before resource exhaustion) mean you need at minimum dozens of worker machines regardless of orchestration approach — the math drives the worker count, not a guess.' } },
              { level: 'advanced', q: { en: 'A single JMeter machine running 3,000 threads is hitting OutOfMemoryError and degraded performance well before the application server shows any signs of strain. What JVM/HTTP-client-level tuning addresses generating high thread counts from one machine?' }, a: { en: 'Increase JMeter\'s own JVM heap (HEAP=-Xms4g -Xmx8g in jmeter.bat/sh) since each thread carries non-trivial memory overhead and 3,000 threads can exhaust a default-sized heap before any application bottleneck is reached. Switch the HTTP Request implementation to HttpClient4 (more memory-efficient than the legacy implementation) and disable unnecessary result-saving fields (response body, headers) per sample at this scale. If a single machine genuinely can\'t sustain the needed thread count even after tuning, that\'s the signal to switch to distributed testing rather than continuing to fight one machine\'s physical limits.' } },
              { level: 'advanced', q: { en: 'Your application has a suspected memory leak that only manifests after running under moderate load for many hours, not during a typical 30-minute load test. How would you design a JMeter soak/endurance test to catch this, and what would you watch for?' }, a: { en: 'Configure a Thread Group with Duration (not Loop Count) set to 24+ hours at a MODERATE, sustained load — not peak load, since the goal is detecting slow degradation, not finding the breaking point — with realistic pacing via a Timer to avoid artificial peak load for the whole duration. Watch the application server\'s memory trend over the full duration via PerfMon/APM — a genuine leak shows as a slowly, steadily CLIMBING graph that never returns to baseline after GC, distinct from normal sawtooth GC patterns. Also watch JMeter\'s own response-time trend — gradually increasing times over hours at constant load is the classic external symptom of a server-side leak.' } },
              { level: 'advanced', q: { en: 'A load test shows P99 latency doubled compared to last month\'s baseline run, but simply re-running the same JMeter test plan again doesn\'t tell you WHY it got slower. How do you actually root-cause a performance regression rather than just re-confirming it exists?' }, a: { en: 'Correlate the exact time window of the degraded JMeter run with APM tool traces (New Relic, Datadog, Dynatrace) covering the same window — APM shows distributed traces breaking down where time was spent inside a single slow request (a specific slow SQL query, an N+1 pattern, a slow downstream call), which JMeter cannot see since it only measures total round-trip time from OUTSIDE, with zero visibility into server-side processing. Re-running JMeter alone confirms the regression is real but provides no information about WHERE the extra time is spent — that requires combining load generation (JMeter) with observability (APM).' } },
              { level: 'advanced', q: { en: 'Your distributed JMeter setup across cloud VMs works in a private network, but a security review flags the RMI ports between Controller and Workers as a risk if these machines are ever exposed beyond a tightly controlled network. How do you secure this?' }, a: { en: 'JMeter\'s distributed mode RMI communication is unauthenticated and unencrypted by default — fine on a fully private, locked-down network, but risky if any worker or controller has a public IP, since anyone reaching those RMI ports can potentially control the Controller-Worker communication. Mitigations: keep Controller and Workers exclusively on a private network/VPC with security groups restricting RMI ports to only the specific IPs that need them, never expose them to the public internet, and consider SSH tunneling if workers must span network boundaries. Treat the controller-worker RMI link with the same isolation discipline as an unauthenticated database connection — never directly internet-facing.' } },
              { level: 'advanced', q: { en: 'Your team is migrating from running JMeter locally/on a self-managed VM to a cloud load-testing service (BlazeMeter, Azure Load Testing). Beyond "it runs in the cloud now," what actually changes in your test design and workflow?' }, a: { en: 'The .jmx test plan itself typically stays mostly unchanged, since these services are usually JMeter-compatible and run your existing plan. What changes: worker provisioning and coordination become the platform\'s responsibility, test execution becomes a managed, often pay-per-use cloud resource, and result dashboards are typically richer out of the box than self-managed JMeter\'s own reporting. Tradeoffs to evaluate: cost at scale, data residency/security (test traffic and embedded credentials now traverse a third-party platform), and reduced low-level control over exact worker machine specs compared to infrastructure you fully own.' } },
              { level: 'advanced', q: { en: 'Your team wants CI to automatically fail a build if a performance test shows SLA regression, but a naive "fail if P99 > 2000ms" gate keeps producing false-positive failures on a noisy, oversubscribed CI runner unrelated to the application actually being slower. How do you design a gate that\'s actually trustworthy?' }, a: { en: 'A single noisy run\'s absolute threshold is fragile precisely because CI infrastructure introduces variance unrelated to the application — compare against a BASELINE from a comparably-provisioned environment instead, flagging regression only when the new run is significantly worse than its own historical baseline (e.g., P99 up more than 20% versus the trailing N-run average), more robust to general noise than a fixed cutoff. Running performance tests on dedicated, consistently-provisioned CI runners removes a major noise source at the root. For genuinely noisy environments, require the regression to persist across 2 consecutive runs before failing the build, trading immediate signal for fewer false positives.' } },
              { level: 'advanced', q: { en: 'A teammate proposes switching from JMeter to Gatling or k6 for a new project, arguing JMeter\'s thread-per-virtual-user model doesn\'t scale as well as their async/event-loop models. Is this a valid technical concern, and when does it actually matter?' }, a: { en: 'It\'s a genuine architectural difference: JMeter spawns one actual OS thread per virtual user (notable memory/context-switching overhead, limiting practical single-machine concurrency to roughly low-thousands of threads), while Gatling and k6 use an async event-loop model simulating substantially more concurrent users per machine with the same hardware. This matters when you need very high concurrency from limited hardware — JMeter would need proportionally more worker machines. It matters far less at moderate scale (hundreds to low-thousands of users), where JMeter\'s much larger plugin ecosystem, GUI-based recording, and broader protocol support (JDBC, FTP, JMS, not just HTTP) are real advantages — the right tool depends on actual scale and protocol needs, not a blanket "newer is better" assumption.' } },
              { level: 'advanced', q: { en: 'Your load test uses the same hardcoded product ID for all 5,000 virtual users\' "add to cart" requests, and results show suspiciously fast response times compared to what you\'d expect at that scale. How might identical test data be skewing your results, and how do you fix it?' }, a: { en: 'If the application or any layer in front of it (CDN, cache, DB query cache) caches responses keyed by product ID, hammering the SAME ID 5,000 times means most requests are served from a cache HIT rather than exercising the real, uncached path varied real users would trigger — your test is accidentally measuring cache performance, not genuine capacity under realistic traffic. The fix is parameterizing product IDs via CSV Data Set Config with a realistic distribution of many different IDs, ideally matching real production patterns, rather than every user hitting one ID. This is a frequently-missed source of unrealistically optimistic results that only surfaces as a production incident when real traffic doesn\'t enjoy the same cache-hit rate.' } },
              { level: 'advanced', q: { en: 'After a distributed test across 4 workers, the Controller\'s aggregated report shows a total sample count that doesn\'t match the sum of each worker\'s individual local .jtl file sample counts. What are the likely causes, and how do you investigate?' }, a: { en: 'Check whether all 4 workers actually completed and reported back successfully — a worker that crashed, lost network connectivity mid-test, or was still running when results were aggregated would cause its samples to be under-counted or missing entirely, a silent partial-failure easy to miss if you only check the final aggregate. Also verify all workers ran the IDENTICAL test plan and JMeter version — a stale plan or different version on one worker produces a different sample count for legitimate reasons, not an aggregation bug. Always inspect each worker\'s OWN local results file independently before trusting the aggregate, since the aggregate is only as correct as its least-reliable contributing worker.' } },
              { level: 'advanced', q: { en: 'Your application uses a proprietary binary protocol that none of JMeter\'s built-in Samplers (HTTP, JDBC, TCP, etc.) can correctly construct or parse. The team needs to load test it anyway. What\'s the actual path to making this work in JMeter?' }, a: { en: 'JMeter supports custom Samplers written in Java implementing the JavaSamplerClient interface — write a Java class handling the protocol\'s request construction and response parsing, package it as a .jar, drop it into JMeter\'s /lib/ext directory, and it appears under Add → Sampler → Java Request like any built-in sampler. This is a genuine software development task (proper Java development, unit testing the protocol logic, packaging/versioning the plugin), not a quick GUI configuration. Before building this, verify no existing community plugin already supports the protocol — building a custom Sampler is the answer only when nothing existing already solves it.' } },
              { level: 'advanced', q: { en: 'Your load test shows P99 latency of 4 seconds and throughput of 200 requests/second at 1,000 concurrent users — but leadership\'s actual question is "how many application servers do we need for Black Friday traffic of 50,000 concurrent users?" How do you translate JMeter\'s raw numbers into that infrastructure decision?' }, a: { en: 'First confirm whether throughput is genuinely server-limited (confirmed via PerfMon/APM showing high CPU/connection-pool saturation at 1,000 users) versus client-limited — only a genuinely server-limited result is meaningful for extrapolation. If server-limited, the relationship between users and required capacity usually isn\'t perfectly linear (connection pool limits and DB bottlenecks often degrade faster than linearly), so naive math like "50,000 ÷ 1,000 × current server count" tends to UNDER-provision — run additional tests at intermediate points (5,000, 15,000, 30,000) to observe the actual scaling curve, not just two data points, then combine that empirical curve with cost/headroom requirements to land on a defensible server count.' } },
            ],
          },
          {
            type: 'quiz',
            question: 'In JMeter, you send a login request and need to use the returned token in all subsequent requests. Which component extracts the token from the JSON response?',
            options: [
              'Response Assertion — validates the response content',
              'JSON Extractor — extracts values from JSON responses using JSONPath',
              'HTTP Cookie Manager — handles cookies automatically',
              'CSV Data Set Config — reads data from CSV files',
            ],
            correct: 1,
            explanation: 'JSON Extractor is a Post-Processor that reads a server response and extracts values using JSONPath expressions. Set Reference Name (e.g., authToken) and JSON Path (e.g., $.data.token). Then use ${authToken} in subsequent request headers.',
          
        retryQuestion: {
      "question": "You have a test where the server returns a 'userId' inside a nested JSON object. Which JMeter Post-Processor should you add to your HTTP Request to capture this ID for later use?",
      "options": [
            {
                  "id": "a",
                  "text": "XPath Extractor"
            },
            {
                  "id": "b",
                  "text": "Regular Expression Extractor"
            },
            {
                  "id": "c",
                  "text": "JSON Extractor"
            },
            {
                  "id": "d",
                  "text": "BeanShell Pre-Processor"
            }
      ],
      "correct": "c",
      "explanation": "The JSON Extractor is the designated tool for parsing JSON responses. By providing a JSONPath expression (e.g., $.user.id), you can easily extract specific values into a JMeter variable to be referenced later in the test plan as ${userId}."
}
},
          {
            type: 'quiz',
            question: 'A JMeter test shows: average response time 800ms but 99th percentile (P99) is 12,000ms. What does this indicate?',
            options: [
              'The test plan is configured incorrectly',
              'The server performance is consistently good',
              'Most users have good experience but 1% of requests are very slow — likely a tail latency issue',
              'The Ramp-Up period is too short',
            ],
            correct: 2,
            explanation: 'Average hides outliers. P99 = 12s means 1% of users wait 12 seconds — unacceptable for most apps. This is tail latency, often caused by GC pauses, database query variability, or thread pool exhaustion. Always look at P90 and P99 alongside the average.',
          
        retryQuestion: {
      "question": "If your JMeter report displays an average response time of 100ms, but the Median (50th percentile) is 95ms and the P95 is 800ms, what is the correct interpretation?",
      "options": [
            {
                  "id": "a",
                  "text": "The system is performing optimally for all users"
            },
            {
                  "id": "b",
                  "text": "The test plan is invalid because the average is higher than the median"
            },
            {
                  "id": "c",
                  "text": "While half the users have a fast experience, 5% of users are experiencing significant delays"
            },
            {
                  "id": "d",
                  "text": "The server has crashed during the test run"
            }
      ],
      "correct": "c",
      "explanation": "The Median tells you the experience of the middle user. A high P95 (800ms) compared to the median (95ms) indicates that the top 5% of requests are taking significantly longer than the rest, highlighting performance inconsistency or tail latency."
}
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
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Orta Seviye', '🚀 İleri Seviye', '🛠️ Gerçek Hayat', '🔗 Ekosistem', '💼 Mülakat Soruları'],
    sections: [
      {
        title: '🎯 JMeter ve Performans Testi Nedir?',
        blocks: [
          { type: 'simple-box', emoji: '⚡', content: "JMeter, 10.000 kullanıcıyı aynı anda simüle eder — gerçekten 10.000 kişi bulmadan hepsini aynı anda butona bastırmak gibi. Java tabanlı (tıpkı senin gibi!), ücretsiz ve yük testi için endüstri standardı." },
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
          { type: 'heading', text: 'Performans Testi Piramidi' },
          {
            type: 'visual', variant: 'pyramid',
            title: 'Yük Testi Stratejisi — Ne Kadarı Yeterli?',
            levels: [
              { label: 'Dayanıklılık (Soak) Testleri', color: 'red', desc: 'Saatler/günler orta yük — nadir, pahalı' },
              { label: 'Stres Testleri', color: 'orange', desc: 'Limiti aş — kırılma noktasını bul' },
              { label: 'Spike Testleri', color: 'yellow', desc: 'Ani trafik artışı — esnekliği test et' },
              { label: 'Yük Testleri', color: 'blue', desc: 'Beklenen zirve kullanıcılar — her sürümde çalıştır' },
              { label: 'Smoke / Baseline', color: 'green', desc: '1-5 kullanıcı — sistemin çalıştığını doğrula' },
            ],
            note: 'Tabandan başla. Önce baseline belirle, sonra yük testi, sonra stres. Dayanıklılık testleri en seyrek çalıştırılır ama bellek sızıntılarını ortaya çıkarır.',
          },
          { type: 'heading', text: 'JMeter Test Planı Mimarisi' },
          {
            type: 'visual', variant: 'boxes',
            title: 'JMeter Test Bileşenleri Nasıl Bir Araya Gelir?',
            items: [
              { icon: '📋', label: 'Test Planı', desc: 'Kök konteyner' },
              { arrow: true },
              { icon: '👥', label: 'Thread Group', desc: 'Sanal kullanıcılar', highlight: true },
              { arrow: true },
              { icon: '📡', label: 'Sampler\'lar', desc: 'HTTP istekleri' },
              { arrow: true },
              { icon: '🔍', label: 'Assertion\'lar', desc: 'Yanıt doğrulama' },
              { arrow: true },
              { icon: '📊', label: 'Listener\'lar', desc: 'Sonuç toplama' },
            ],
            note: 'Thread Group = kullanıcılar. Sampler\'lar = ne yapıyorlar. Assertion\'lar = çalışıyor mu? Listener\'lar = ne oldu?',
          },
          {
            type: 'visual', variant: 'flow',
            title: 'JMeter Test Çalıştırma Akışı',
            steps: [
              { num: '1', label: 'Thread Group', desc: 'N kullanıcı başlar' },
              { num: '2', label: 'Ramp-up', desc: 'Kademeli başlangıç' },
              { num: '3', label: 'İstek Gönder', desc: 'HTTP Sampler', highlight: true },
              { num: '4', label: 'Yanıt Al', desc: 'Durum + gövde' },
              { num: '5', label: 'Doğrula', desc: '200 kontrolü' },
              { num: '6', label: 'Kaydet', desc: 'Metrikleri sakla' },
              { num: '7', label: 'Raporla', desc: 'HTML çıktısı' },
            ],
            note: '3-6. adımlar her thread\'deki her istek için tekrar eder. 100 kullanıcı × 10 istek = test başına 1.000 veri noktası.',
          },
          {
            type: 'quiz',
            question: "JMeter'da 60 saniyede kademeli olarak başlayan 500 kullanıcıyı simüle etmek istiyorsunuz. Bunu hangi bileşen kontrol eder?",
            options: [
              'HTTP Request Sampler — neyin test edileceğini kontrol eder',
              'Thread Group — kullanıcı sayısını ve ramp-up süresini kontrol eder',
              'Response Assertion — geçme/başarısız koşullarını kontrol eder',
              'Listener — sonuç toplamayı kontrol eder',
            ],
            correct: 1,
            explanation: "Thread Group şunları tanımlar: (1) Thread sayısı = sanal kullanıcılar, (2) Ramp-up süresi = tüm kullanıcıları başlatmak için saniye sayısı, (3) Döngü sayısı = her kullanıcı başına tekrar. 60 saniyelik ramp-up ile 500 kullanıcı → saniyede ~8 yeni kullanıcı başlar.",
          
        retryQuestion: {
      "question": "JMeter'da 120 saniyelik bir sürede 1000 kullanıcının sisteme yüklenmesini (ramp-up) yapılandırmak istiyorsunuz. Bu ayar hangi bileşen ile yapılır?",
      "options": [
            {
                  "id": "a",
                  "text": "Logic Controller — mantıksal akışı yönetir"
            },
            {
                  "id": "b",
                  "text": "Thread Group — kullanıcı yükünü ve ramp-up süresini yapılandırır"
            },
            {
                  "id": "c",
                  "text": "Timer — istekler arası bekleme sürelerini ekler"
            },
            {
                  "id": "d",
                  "text": "Configuration Element — genel değişkenleri tanımlar"
            }
      ],
      "correct": "b",
      "explanation": "Thread Group, sanal kullanıcı sayısını ve bu kullanıcıların ne kadar sürede devreye gireceğini (Ramp-up period) belirleyen temel bileşendir. 1000 kullanıcıyı 120 saniyede başlatmak, saniyede yaklaşık 8.3 kullanıcının sisteme dahil olacağı anlamına gelir."
}
},
        ],
      },
      {
        title: '📦 Kurulum ve İlk Başlatma',
        blocks: [
          { type: 'simple-box', emoji: '📦', content: "JMeter kurmak, Java IDE kurmak gibi — önce Java kur, sonra JMeter'ı indir, zip'i aç ve çalıştır. Sihirbaz yok, installer yok. Java bildiğin için en zor gereksinimi zaten karşılıyorsun." },
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
          {
            type: 'quiz',
            question: 'JMeter\'ın installer\'sız bir zip indirme olmasına rağmen kurulumdan önce Java (JDK 8+) kurulması neden zorunludur?',
            options: [
              { id: 'a', text: 'JMeter sadece Java test kodu üretir' },
              { id: 'b', text: 'JMeter\'ın kendisi tamamen Java ile yazılmıştır ve JVM üzerinde çalışır — ayrı bir native binary yoktur' },
              { id: 'c', text: 'Java sadece GUI için gerekir, test çalıştırmak için değil' },
              { id: 'd', text: 'Gerçekte zorunlu değil, sadece tavsiye edilir' },
            ],
            correct: 'b',
            explanation: 'JMeter, zip olarak dağıtılan bir Java uygulamasıdır — ayrı bir native çalıştırılabilir dosya yoktur. Zip\'i açıp jmeter.bat/jmeter.sh çalıştırmak, tıpkı başka bir Java programını çalıştırmak gibi literal olarak bir JVM süreci başlatır. JDK/JRE yoksa, JVM\'in JMeter\'ı başlatacak hiçbir şeyi yoktur.',
            retryQuestion: {
              question: 'Bir CI runner\'da JMeter kurulu ama `jmeter -n -t plan.jmx` Java ile ilgili bir hatayla başarısız oluyor. Önce kontrol edilmesi gereken şey nedir?',
              options: [
                { id: 'a', text: '.jmx dosya uzantısının doğru olup olmadığı' },
                { id: 'b', text: 'O runner\'da uyumlu bir JDK/JRE\'nin gerçekten kurulu ve PATH\'te olup olmadığı' },
                { id: 'c', text: 'Test planında çok fazla thread olup olmadığı' },
                { id: 'd', text: 'JMeter\'ın internet erişimi olup olmadığı' },
              ],
              correct: 'b',
              explanation: 'JMeter temelde bir Java uygulaması olduğu için, Java ile ilgili herhangi bir başlatma hatası neredeyse her zaman o makinedeki eksik, yanlış sürüm veya yanlış yapılandırılmış bir JDK/JRE\'ye kadar geri gider — test planının kendisine değil. Runner\'da `java -version` kontrol etmek, JMeter\'a özgü konfigürasyona bakmadan önceki standart ilk teşhis adımıdır.',
            },
          },
        ],
      },
      {
        title: '📚 Temel Kavramlar ve İlk Testini Oluşturma',
        blocks: [
          { type: 'simple-box', emoji: '📚', content: "JMeter test planı, aktörlere verilen bir senaryo gibi. Thread Group = kaç aktör, ne zaman sahneye çıkıyor. Sampler = her aktörün yaptığı iş (butona bas, API çağır). Listener = direktörün sonuçları izlediği ekran. Bu üçünü öğren, her testi yazabilirsin." },
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
          {
            type: 'visual', variant: 'boxes',
            title: 'JMeter Test Planı Anatomisi — Bileşen Hattı',
            items: [
              { icon: '📋', label: 'Test Planı', desc: 'kök kapsayıcı' },
              { arrow: true },
              { icon: '👥', label: 'Thread Group', desc: 'sanal kullanıcılar' },
              { arrow: true },
              { icon: '🌐', label: 'HTTP Sampler', desc: 'istek gönderir' },
              { arrow: true },
              { icon: '✅', label: 'Assertion', desc: 'yanıtı doğrular' },
              { arrow: true },
              { icon: '📊', label: 'Listener', desc: 'sonuçları toplar' },
            ],
            note: 'Thread Group = kaç kullanıcı ve ne kadar hızlı. HTTP Sampler = ne talep edileceği. Assertion = neyin başarı/başarısız sayılacağı. Listener = sonuçların nasıl görüntüleneceği.',
          },
          {
            type: 'comparison',
            left: {
              label: '🔍 Debug Listener\'lar (kurulum aşamasında kullan)',
              code: `// View Results Tree
// - Her istek ve yanıtı gör
// - Yeşil = başarılı, Kırmızı = başarısız
// - Başlıklar, body, zamanlama gösterir
// - ❌ Yük testinde devre dışı bırak
//   (çok fazla bellek tüketir!)

// Simple Data Writer
// - Sonuçları dosyaya yazar
// - Hafif alternatif`,
              note: 'Gerçek yük testleri çalıştırmadan önce debug listener\'ları mutlaka devre dışı bırakın.',
            },
            right: {
              label: '📊 Rapor Listener\'lar (yük testinde kullan)',
              code: `// Aggregate Report
// - Ort, Min, Maks, 90./95./99. yüzdelik
// - Endpoint başına Hata %
// - Throughput (istek/sn)

// Summary Report
// - Aggregate\'den daha hafif
// - 1000+ kullanıcı için uygun

// HTML Dashboard (--reportonly)
// - En iyisi: test sonrası üret`,
              note: 'CLI modunda -e -o rapor/ parametresiyle HTML dashboard üretin.',
            },
          },
          {
            type: 'visual', variant: 'flow',
            title: 'Thread Group: Ramp-Up Zaman Çizelgesi',
            note: 'Ramp-up, kullanıcı başlangıçlarını zamana yayar — ani bir kullanıcı dalgasının gerçek performans davranışını gizlemesini önler.',
            steps: [
              { num: 'T=0sn', label: 'Thread Group başlar', desc: 'Kullanıcı Sayısı=100, Ramp-Up=60sn, Süre=300sn', highlight: true },
              { num: 'T=0–60sn', label: 'Ramp-up aşaması', desc: 'Her saniye ~1.67 yeni kullanıcı istek göndermeye başlar' },
              { num: 'T=60sn', label: 'Tam yüke ulaşıldı', desc: '100 sanal kullanıcının tamamı eşzamanlı çalışıyor' },
              { num: 'T=60–300sn', label: 'Sürdürülen yük', desc: 'Sabit durum: throughput, gecikme, hata oranı ölçülür', highlight: true },
              { num: 'T=300sn', label: 'Test sona erer', desc: 'Thread\'ler mevcut isteği tamamlayıp durur' },
            ],
          },
          {
            type: 'visual', variant: 'boxes',
            title: 'Thread Group Parametreleri — Her Biri Neyi Kontrol Eder',
            items: [
              { icon: '👥', label: 'Number of Threads', desc: 'toplam sanal kullanıcı (10–50 ile başla)' },
              { arrow: true },
              { icon: '⏱️', label: 'Ramp-Up (sn)', desc: 'tüm thread\'leri başlatmak için saniye (kademeli artış)' },
              { arrow: true },
              { icon: '🔁', label: 'Loop Count / ∞', desc: 'kullanıcı başına tekrar (-1 = sonsuz, Duration ile kullan)' },
              { arrow: true },
              { icon: '⏰', label: 'Duration (sn)', desc: 'toplam test süresi — Loop Count yerine tercih edilir' },
            ],
            note: 'Altın kural: Ramp-Up ≥ Sürenin %10\'u olmalı. Çok kısa ramp-up yapay bir ani yük oluşturur — gerçekçi bir yük modeli değildir.',
          },
          {
            type: 'quiz',
            question: 'Bir Thread Group\'ta Number of Threads=10 ve Ramp-Up Period=10 saniye ayarlandığında test başladığında gerçekte ne olur?',
            options: [
              { id: 'a', text: '10 thread\'in hepsi aynı anda başlar' },
              { id: 'b', text: 'Thread\'ler kademeli olarak başlar, yaklaşık saniyede 1 yeni thread, ta ki 10\'u da çalışana kadar' },
              { id: 'c', text: 'Sadece 1 thread 10 saniye çalışır, sonra diğerleri başlar' },
              { id: 'd', text: 'JMeter herhangi bir thread başlatmadan önce 10 saniye bekler' },
            ],
            correct: 'b',
            explanation: 'Ramp-Up Period, thread başlatmayı verilen süreye eşit olarak yayar: 10 thread, 10 saniyede demek her saniye yaklaşık 1 yeni sanal kullanıcı devreye girer demektir. Bu, sunucuya tüm kullanıcıları bir anda fırlatmak yerine gerçekçi bir trafik artışını simüle eder — sıfıra yakın bir ramp-up, gerçekçi bir yük modeli değil, yapay bir ani sıçrama oluşturur.',
            retryQuestion: {
              question: 'Bir test planında Number of Threads=100 ve Ramp-Up Period=1 saniye ayarlanmış. Bu gerçekte ne tür bir yük modeli oluşturur?',
              options: [
                { id: 'a', text: '100 saniye boyunca yumuşak, kademeli bir trafik artışı' },
                { id: 'b', text: 'Neredeyse anlık bir sıçrama — 100 kullanıcının hepsi yaklaşık 1 saniye içinde sunucuya çarpar' },
                { id: 'c', text: 'JMeter bu konfigürasyonu geçersiz sayıp reddeder' },
                { id: 'd', text: 'Her 100 saniyede tam olarak 1 kullanıcı başlar' },
              ],
              correct: 'b',
              explanation: '100 thread\'i 1 saniyelik bir ramp-up\'a sıkıştırmak, neredeyse hepsinin aynı anda başlaması demektir — bu kasıtlı olarak bir ani sıçrama testi oluşturur (bir sistemin ani bir yük patlamasına nasıl tepki verdiğini test etmek için faydalı), kademeli bir artış yerine. "Ramp-Up ≥ Sürenin %10\'u" altın kuralı, kademeli bir artış istenirken yanlışlıkla bu tür gerçekçi olmayan ani-sıçrama modelini oluşturmayı önlemek için vardır.',
            },
          },
        ],
      },
      {
        title: '🚀 İleri Seviye JMeter',
        blocks: [
          { type: 'simple-box', emoji: '🚀', content: "İleri seviye JMeter; GUI olmadan çalıştırmak (daha hızlı, CI/CD uyumlu), yükü birden fazla makineye dağıtmak ve sunucu yanıtlarından dinamik token çıkarmak demek. Manuel vites değiştirmekten otopilota geçiş gibi." },
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
          {
            type: 'visual', variant: 'flow',
            title: 'Non-GUI CLI Komut Pipeline\'ı',
            note: 'Gerçek yük testleri için her zaman Non-GUI modu kullanın. GUI overhead\'i büyük thread sayılarında sonuçları %20-30 çarpıtabilir.',
            steps: [
              { num: '1', label: 'test.jmx yaz', desc: 'GUI\'de oluştur' },
              { num: '2', label: 'jmeter -n -t test.jmx', desc: 'Non-GUI modu', highlight: true },
              { num: '3', label: '-l sonuclar.jtl', desc: 'Ham sonuç dosyası' },
              { num: '4', label: '-e -o ./rapor', desc: 'HTML dashboard', highlight: true },
              { num: '5', label: 'rapor/index.html aç', desc: 'Metrikleri görüntüle' },
            ],
          },
          {
            type: 'comparison',
            left: {
              label: '❌ Debug Listener\'lar (Sadece Geliştirme)',
              code: `View Results Tree
  → Her istek/yanıtı gösterir
  → Tam istek gövdesi görünür
  → Tam yanıt gövdesi görünür

⚠ Gerçek yük testlerinde ASLA kullanma:
  • Tüm veriyi RAM\'de saklar
  • JMeter\'ı yavaşlatır
  • Test sonuçlarını çarpıtır
  • 500+ kullanıcıda OOM çökmesine yol açar`,
              note: 'View Results Tree sadece script hata ayıklama içindir — gerçek testleri çalıştırmadan önce devre dışı bırakın',
            },
            right: {
              label: '✅ Rapor Listener\'lar (Üretim)',
              code: `Aggregate Report
  → Ortalama, Min, Max, P90, P99
  → Hata oranı, Throughput
  → Yalnızca bellek açısından verimli sayaçlar

Summary Report
  → Hafif çalışan toplamlar

HTML Dashboard (-e -o)
  → Tam etkileşimli rapor
  → Test çalışmasından sonra oluşturulur
  → Çalışma zamanı overhead yok`,
              note: 'Aggregate Report + HTML Dashboard, CI/CD pipeline\'ları için standart kombinasyondur',
            },
          },
          {
            type: 'quiz',
            question: 'Gerçek yük testleri CI/CD pipeline\'larında neden test planını oluşturmak için kullanılan GUI modu yerine JMeter\'ın Non-GUI (CLI) modunda çalıştırılır?',
            options: [
              { id: 'a', text: 'Non-GUI mod daha fazla protokol destekler' },
              { id: 'b', text: 'GUI modu arayüzü render etmek için önemli kaynak harcar, sonuçları çarpıtır ve gerçek yük üretimi için resmi olarak tavsiye edilmez' },
              { id: 'c', text: 'GUI modu .jmx dosyalarını kaydedemez' },
              { id: 'd', text: 'CI runner\'ları JMeter kurulumunu hiç desteklemez' },
            ],
            correct: 'b',
            explanation: 'JMeter GUI\'sinin kendisi grafikleri, ağaçları ve listener\'ları gerçek zamanlı render etmek için CPU ve bellek harcar — bu kaynaklar yük üretmeye gitmesi gereken kaynaklardır. JMeter\'ın kendi dokümantasyonu, GUI\'nin sadece test planı oluşturmak/debug etmek için kullanılması, gerçek yük üretiminin her zaman `jmeter -n -t plan.jmx` (Non-GUI mod) ile çalıştırılması gerektiğini açıkça belirtir — bu aynı zamanda JMeter\'ı bir CI/CD pipeline adımı içinde script\'lenebilir kılan şeydir.',
            retryQuestion: {
              question: 'Bir QA mühendisi 500 kullanıcılık bir yük testini doğrudan JMeter\'ın GUI modunda çalıştırıyor ve response time\'lar şüpheli derecede yüksek görünüyor. En olası açıklama nedir?',
              options: [
                { id: 'a', text: 'Hedef sunucu kesinlikle bozuk' },
                { id: 'b', text: 'GUI\'nin kendisi yük üretimiyle CPU/bellek için yarışıyor, ölçülen response time\'ları çarpıtıyor' },
                { id: 'c', text: 'GUI modu 10\'dan fazla kullanıcı üretemez' },
                { id: 'd', text: 'JMeter GUI modunda her zaman gerçek response time\'ın iki katını raporlar' },
              ],
              correct: 'b',
              explanation: 'GUI modunda gerçek bir yük testi çalıştırmak, JVM\'in kaynakları gerçekten yük üretmek İLE sürekli canlı grafik/ağaç/listener render etmek arasında bölüştürmesi demektir — bu overhead, hedef sunucunun gerçek performansıyla hiç ilgisi olmayan bir şekilde ölçülen response time\'ları şişirebilir. Non-GUI moda geçmek (`jmeter -n -t plan.jmx`) bu karıştırıcı etkeni ortadan kaldırır ve güvenilir sayılar verir.',
            },
          },
        ],
      },
      // ── 4. GERÇEK HAYAT ───────────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayat Kullanımı',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: "Büyük bir indirim öncesi JMeter ile yük testi çalıştırmak, bir bina için yangın tatbikatı yapmak gibidir — çıkışların dar olduğunu gerçek bir yangında keşfetmek istemezsin. Kimsenin siparişi (ya da işi) buna bağlı değilken darboğazları bulup düzeltirsin." },
          { type: 'heading', text: 'Hangi İhtiyaca Cevap Verir? Yük Testi Olmadan Hayat' },
          { type: 'text', content: "Yük testi olmadan, sisteminizin gerçek eş zamanlı trafikle ilk karşılaşması production'da olur — genellikle en kötü zamanda (Kara Cuma, viral bir paylaşım, pazarlama e-postası). 1 kullanıcı için 200ms'de yanıt veren checkout, 500 eş zamanlı kullanıcıda 8 saniyelik timeout'a dönüşebilir — veritabanı connection pool tükenmesi, thread starvation veya yalnızca yük altında ortaya çıkan bir N+1 sorgu yüzünden. Fonksiyonel testler (Selenium, pytest) bunu asla yakalamaz — her zaman 1 kullanıcıyla çalışırlar." },
          { type: 'heading', text: 'Gerçek Dünya Senaryosu: E-ticaret Flaş İndirimi' },
          { type: 'text', content: "Orta ölçekli bir e-ticaret şirketi (Spring Boot backend + React frontend — tanıdık geldi mi?) 200.000 aboneye flaş indirim e-postası gönderiyor. Pazarlama ekibi ilk 10 dakikada 2.000 kişinin tıklayacağını öngörüyor. QA ekibine soruluyor: 'Checkout buna dayanır mı?'" },
          {
            type: 'steps',
            items: [
              'Kritik kullanıcı yolculuğunu kaydet: giriş → ürüne bak → sepete ekle → ödeme (HTTP(S) Test Script Recorder ile veya elle HTTP Request sampler ekleyerek)',
              'Thread Group oluştur: 500 kullanıcı, 60sn ramp-up — beklenen 10 dakikalık ani trafiği test için sıkıştırarak temsil eder',
              '500 benzersiz test hesabıyla CSV Data Set Config ekle, böylece her sanal kullanıcının kendi oturumu olur — 1 paylaşılan hesapla test etmek satır kilitleme (row-locking) hatalarını gizler',
              'Production büyüklüğündeki bir staging ortamına karşı Non-GUI modda çalıştır: jmeter -n -t flashsale.jmx -l results.jtl -e -o report/',
              'İlk çalıştırma: Aggregate Report, /api/checkout için P99 = 14.000ms ve %12 hata gösteriyor — veritabanı connection pool (varsayılan boyut 10) tükenmiş',
              'Düzeltme: HikariCP pool boyutunu 50\'ye çıkar, her istekte veritabanına giden ürün fiyat sorgusunun önüne bir Redis cache ekle',
              'Aynı test planını tekrar çalıştır — P99, 1.800ms\'e düşer, hatalar %0.2\'ye iner — artık kampanyayı göndermek güvenli',
            ]
          },
          { type: 'heading', text: 'JMeter\'ı Alternatiflerle Karşılaştırma — Gerçek Dünya Trade-off\'ları' },
          {
            type: 'table',
            headers: ['Araç', 'Avantajlar ✅', 'Dezavantajlar ❌', 'Ne zaman tercih et...'],
            rows: [
              ['JMeter', 'Test oluşturmak için kod yazmadan GUI, 600+ protokol, büyük topluluk, ücretsiz', 'Daha ağır kaynak kullanımı, XML tabanlı .jmx dosyaları kod incelemesi/diff için pek uygun değil', 'Ekibinizde güçlü kodlama becerisi olmayan QA mühendisleri var, veya HTTP olmayan protokollere (JDBC, JMS, FTP) ihtiyacınız var'],
              ['k6', 'Test-as-code (JavaScript), hafif, mükemmel CI/CD çıktısı, geliştiriciler için tasarlanmış', 'Test oluşturmak için yerleşik GUI yok, daha küçük protokol desteği', 'Ekibiniz ağırlıklı geliştiricilerden oluşuyor ve yük testlerinin uygulamayla aynı repoda, diğer kod gibi incelenmesini istiyorsunuz'],
              ['Locust', 'Python tabanlı, karmaşık kullanıcı davranış mantığını yazmak çok kolay, varsayılan olarak dağıtık', 'JMeter\'a göre daha küçük eklenti/listener ekosistemi', 'Ekibiniz zaten Python (pytest) yazıyor ve performans testlerini aynı dilde istiyor'],
            ]
          },
          { type: 'heading', text: 'Gerçek Dünya Entegrasyon Akışı' },
          {
            type: 'visual', variant: 'flow',
            title: 'Bir Yük Testi Gerçekte Production Kararlarına Nasıl Ulaşır?',
            steps: [
              { num: '1', label: '.jmx yaz', desc: 'QA, GUI\'de test planı oluşturur' },
              { num: '2', label: 'Repo\'ya commit et', desc: 'tests/performance/flashsale.jmx' },
              { num: '3', label: 'CI gece tetikler', desc: 'GitHub Actions / Jenkins cron', highlight: true },
              { num: '4', label: 'Non-GUI çalıştır', desc: 'jmeter -n -t ... -l results.jtl' },
              { num: '5', label: 'Baseline ile karşılaştır', desc: 'P99 geçen haftadan kötü mü?' },
              { num: '6', label: 'Uyar ya da geç', desc: 'Regresyon bulunursa Slack mesajı', highlight: true },
            ],
            note: 'Bu, fonksiyonel CI ile tamamen aynı pipeline şeklidir — yalnızca assertion "çalıştı mı"dan "yeterince hızlı mıydı"ya değişti.',
          },
          {
            type: 'simulation',
            scenario: 'jmeter-load-test',
            icon: '⚡',
            color: '#f5a623',
            title: { en: 'Running the Flash-Sale Load Test', tr: 'Flaş İndirim Yük Testini Çalıştırma' },
            description: { en: 'Click ▶ to run the checkout load test in Non-GUI mode and watch the Aggregate Report build live, just like a CI pipeline would.', tr: '▶ butonuna tıklayarak checkout yük testini Non-GUI modda çalıştır ve bir CI pipeline\'ında olduğu gibi Aggregate Report\'un canlı oluşmasını izle.' },
            code: `# CI/CD'ye hazır tam non-GUI yük testi çalıştırması
jmeter -n -t flashsale.jmx \\
       -l results.jtl \\
       -e -o report/ \\
       -Jusers=500 \\
       -Jrampup=60 \\
       -Jduration=300

# Exit code 0 yalnızca "test planı çalıştı" demektir — "geçti" değil!
# Gerçek başarı/başarısızlık results.jtl veya HTML rapordan çıkarılır:
ERROR_RATE=$(grep -c ',false,' results.jtl || true)
if [ "$ERROR_RATE" -gt 0 ]; then
  echo "Yük testi hata buldu — kampanya gönderimi engelleniyor"
  exit 1
fi`,
            language: 'bash',
          },
          { type: 'heading', text: 'Uygulamalı Mini Proje — Kendin Dene' },
          { type: 'text', content: 'Bunu yeni bir JMeter Test Planına kopyala, ücretsiz bir public API\'yi yük testine tabi tut ve 5 dakikadan kısa sürede gerçek persentil verisini gör.' },
          {
            type: 'code', code: `# 1. Thread Group: 20 thread, 10sn ramp-up, 1 döngü
# 2. HTTP Request Sampler:
#    Metot: GET
#    Sunucu: jsonplaceholder.typicode.com
#    Yol:    /posts

# 3. Response Assertion: Response Code = 200

# 4. CLI'dan çalıştır:
jmeter -n -t public_api_test.jmx -l results.jtl -e -o report/

# 5. report/index.html'i aç — "APDEX" ve "Response Times Over
#    Time" grafiklerine bak. Ücretsiz bir public API'ye karşı
#    yalnızca 20 kullanıcıyla neredeyse sıfır hata ve ortalamaya
#    yakın bir P99 görmelisin — SAĞLIKLI bir sistem makul yük
#    altında böyle görünür.`
          },
          {
            type: 'quiz',
            question: 'Ekibinizde kodlama becerisi sınırlı QA mühendisleri varsa ve HTTP olmayan protokollere (JDBC, JMS) ihtiyacınız varsa, k6 gibi kod-öncelikli bir araç yerine neden JMeter tercih edilir?',
            options: [
              { id: 'a', text: 'JMeter her zaman daha hızlı test çalıştırır' },
              { id: 'b', text: 'JMeter kod yazmadan test oluşturmaya izin veren bir GUI sunar, ayrıca k6\'nın iyi kapsamadığı non-HTTP protokoller dahil 600+ protokol desteği vardır' },
              { id: 'c', text: 'k6 HTML rapor üretemez' },
              { id: 'd', text: 'JMeter tek ücretsiz seçenektir' },
            ],
            correct: 'b',
            explanation: 'JMeter\'ın GUI\'si, sampler ve listener\'ları yapılandırarak, hiç script yazmadan tam bir test planı oluşturmaya izin verir, ve geniş bir protokol yelpazesi (HTTP, JDBC, JMS, FTP ve daha fazlası) için yerleşik desteği vardır. k6 ise test-as-code (JavaScript) yaklaşımıyla geliştirici-ağırlıklı ekiplerde hafif, CI-uyumlu testler için üstündür ama daha dar bir protokol yüzeyine ve test oluşturmak için yerleşik bir GUI\'ye sahip değildir. Doğru araç ham hıza değil, takım yetkinliğine ve protokol ihtiyacına bağlıdır.',
            retryQuestion: {
              question: 'Bir ekip tamamen geliştirici ağırlıklı, JavaScript yazmaya rahat ve sadece HTTP REST API\'lerini hafif, CI-uyumlu testlerle yük testi yapmaya ihtiyaç duyuyor. Burada hangi araç daha uygundur?',
              options: [
                { id: 'a', text: 'JMeter, çünkü her zaman daha fazla özelliği vardır' },
                { id: 'b', text: 'k6, çünkü JavaScript ile test-as-code geliştirici ağırlıklı bir ekibe uyar ve hafif CI pipeline\'ına doğal olarak entegre olur' },
                { id: 'c', text: 'Hiçbiri HTTP API\'lerini test edemez' },
                { id: 'd', text: 'JMeter, çünkü k6 test yazmak için GUI gerektirir' },
              ],
              correct: 'b',
              explanation: 'k6\'nın test-as-code yaklaşımı (JavaScript ile test yazma), geliştirici ağırlıklı bir ekibin güçlü yanlarına hitap eder ve hafif, versiyon kontrollü CI adımları olarak doğal şekilde entegre olur — öğrenilecek bir GUI yoktur, HTTP/WebSocket dışında protokole de gerek yoktur. JMeter\'ın GUI\'si ve 600+ protokol desteği kod yazmayan QA ekipleri veya non-HTTP protokoller için bir güçtür, ama bu özel ekip ve kullanım durumu için daha uygun seçim değildir.',
            },
          },
        ],
      },

      // ── 5. EKOSİSTEM ──────────────────────────────────────────────────────
      {
        title: '🔗 Ekosistem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "JMeter nadiren tek başına çalışır — bir termometre gibi düşün. Termometre (JMeter) sıcaklığı ölçer, ama yine de birinin bunu belirli bir programda okuması (Jenkins/CI), zaman içinde bir grafiğe işlemesi (Grafana) ve termometreyi her yere gönderilebilecek bir kutuya koyması gerekir (Docker)." },
          { type: 'heading', text: 'JMeter Büyük Resme Nasıl Oturur?' },
          { type: 'text', content: 'Tek başına JMeter, bir kez çalışıp bir sonuç dosyası üreten bir araçtır. QA pipeline\'ındaki gerçek değeri, üç başka sisteme bağlanmasından gelir: onu otomatik ve belirli bir programda çalıştıran bir CI/CD aracı, onu taşınabilir ve dağıtılabilir yapan bir konteyner çalışma zamanı, ve tek seferlik sonuçları uyarı verebileceğiniz trend çizgilerine dönüştüren bir zaman serisi dashboard\'u.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'JMeter Ekosistemi — Kim Kiminle Konuşur',
            items: [
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'JMeter\'ı programlı veya PR\'da tetikler' },
              { arrow: true },
              { icon: '🐳', label: 'JMeter (Docker içinde)', desc: '.jmx test planını Non-GUI çalıştırır' },
              { arrow: true },
              { icon: '📄', label: 'results.jtl', desc: 'ham sonuç dosyası' },
              { arrow: true },
              { icon: '📈', label: 'InfluxDB + Grafana', desc: 'trendleri zaman içinde saklar ve görselleştirir', highlight: true },
            ],
            note: 'Her araç bir işi iyi yapar — JMeter yük üretir, Jenkins programlar, Docker taşınabilir kılar, Grafana trendi gösterir.',
          },
          { type: 'heading', text: 'Üç Temel İlişki' },
          {
            type: 'table',
            headers: ['Teknoloji', 'JMeter ile İlişkisi', 'Birlikte Çözülen Sorun'],
            rows: [
              ['Jenkins / GitHub Actions', 'CI aracı, bir cron programında veya merge öncesi `jmeter -n -t ...`\'ı bir build adımı olarak çağırır', 'Birinin manuel yük testi çalıştırmayı hatırlamasına güvenmek yerine performans regresyonları otomatik yakalanır'],
              ['Docker', 'JMeter bir konteyner imajı olarak gönderilir (örn. `justb4/jmeter`), böylece her CI runner aynı JMeter sürümünü ve eklentilerini kullanır', 'Artık "bende çalışıyor" yok — yük üreticinin kendisi de test ettiği uygulama gibi tekrarlanabilir hale gelir'],
              ['Grafana + InfluxDB', 'Bir JMeter Backend Listener canlı metrikleri InfluxDB\'ye akıtır; Grafana, gerçek zamanlı dashboard\'lar oluşturmak için InfluxDB\'yi sorgular', 'Tek bir çalıştırmadan gelen tek bir .jtl dosyasını tarihsel bir trend çizgisine dönüştürür — "P99, sürümden sürüme kötüleşiyor mu?"'],
              ['Kubernetes', 'JMeter worker pod\'ları, dağıtık test için bir Kubernetes Job/Deployment olarak yatay ölçeklenebilir', 'Tek bir makine çok büyük testler için (5.000+ kullanıcı) yeterli yük üretemez; k8s, düzinelerce injector başlatmayı kolaylaştırır'],
            ]
          },
          { type: 'heading', text: 'JMeter + Grafana Gerçek Zamanlı Dashboard (Backend Listener)' },
          { type: 'text', content: 'Sonuçları görmek için testin bitmesini beklemek yerine, bir Backend Listener her örneği test çalışırken InfluxDB\'ye akıtır, böylece Grafana canlı throughput ve yanıt sürelerini gösterir.' },
          {
            type: 'code', code: `# Thread Group'una bir Backend Listener ekle:
#   Backend Listener implementation: InfluxdbBackendListenerClient
#   influxdbUrl: http://localhost:8086/write?db=jmeter
#   application: checkout-loadtest
#   measurement: jmeter

# Sonra Grafana'da, aynı veritabanını gösteren bir InfluxDB
# data source ekle ve grafana.com/dashboards'tan JMeter
# dashboard ID 5496'yı içe aktar — test hâlâ çalışırken
# canlı RPS, hata oranı ve yanıt süresi persentil grafikleri
# elde edersin.`
          },
          { type: 'heading', text: 'Docker İçinde JMeter' },
          {
            type: 'code', code: `# Yerelde JMeter kurmadan yük testi çalıştır:
docker run --rm -v $(pwd):/tests justb4/jmeter \\
  -n -t /tests/flashsale.jmx \\
  -l /tests/results.jtl \\
  -e -o /tests/report

# Her CI runner'da, her geliştirici makinesinde aynı komut —
# "sende hangi JMeter sürümü var?" hata ayıklaması sıfır.`
          },
          { type: 'tip', content: 'Gerçek bir pipeline\'da bu dört parça birleşir: GitHub Actions, belirli bir programda JMeter çalıştıran bir Docker konteynerini tetikler, sonuçlar bir Backend Listener ile InfluxDB\'ye akar ve P99 bir eşiği aşarsa Grafana ekibi Slack\'te uyarır — tamamen otomatik performans regresyon tespiti.' },
          {
            type: 'quiz',
            question: 'JMeter\'ı her CI runner\'a doğrudan kurmak yerine bir Docker image\'ı (örn. justb4/jmeter) olarak çalıştırmanın temel avantajı nedir?',
            options: [
              { id: 'a', text: 'Docker, JMeter\'ı daha hızlı çalıştırır' },
              { id: 'b', text: 'Her CI runner ve geliştirici makinesi tam olarak aynı JMeter sürümünü ve eklentilerini garanti eder — "bende çalışıyor" sapması olmaz' },
              { id: 'c', text: 'Backend Listener kullanmak için Docker gereklidir' },
              { id: 'd', text: '.jmx test planı ihtiyacını ortadan kaldırır' },
            ],
            correct: 'b',
            explanation: 'Bir Docker image, tam JMeter sürümünü ve kurulu eklentileri tek, tekrarlanabilir bir artifact\'a sabitler. Bu olmadan bir CI runner\'da JMeter 5.4, başka birinde 5.6 olabilir veya eklenti sürümleri farklı olabilir — bu da hafif farklı sonuçlara veya "bende çalışıyor" hata ayıklamasına yol açar. `docker run justb4/jmeter ...` çalıştırmak, yük üreticinin kendisinin de test edilen uygulama kadar tekrarlanabilir olmasını garanti eder.',
            retryQuestion: {
              question: 'İki CI runner, hedef sunucu ve ağ koşulları aynı olsa bile, AYNI .jmx test planı için hafif farklı yük testi sonuçları üretiyor. Olası bir neden nedir?',
              options: [
                { id: 'a', text: 'Yük testi sonuçları her zaman rastgele ve anlamsızdır' },
                { id: 'b', text: 'İki runner\'da yerel olarak farklı JMeter sürümleri veya eklenti sürümleri kurulu olabilir, hafif farklı davranışlar üretebilir' },
                { id: 'c', text: '.jmx dosya formatı çalıştırmalar arasında rastgele değişir' },
                { id: 'd', text: 'JMeter sonuçları makineler arasında asla karşılaştırılamaz' },
              ],
              correct: 'b',
              explanation: 'JMeter sabitlenmiş bir Docker image\'ından çalıştırılmak yerine her runner\'a doğrudan kurulduysa, runner\'lar arasındaki sürüm kayması (5.4 vs 5.6 veya farklı eklenti sürümleri) hafif farklı sonuçların gerçek ve yaygın bir nedenidir — tam olarak "bende çalışıyor" sınıfı bir sorun. Her runner\'da aynı Docker image tag\'inden JMeter çalıştırmak bu değişkeni tamamen ortadan kaldırır.',
            },
          },
        ],
      },

      // ── 6. INTERVIEW Q&A ─────────────────────────────────────────────────
      {
        title: '💼 JMeter Mülakat Soruları ve Cevapları',
        blocks: [
          { type: 'simple-box', emoji: '💼', content: "JMeter mülakatında 'Thread Group nedir?' sorusu değil, 'Testinde P99=12s ama ortalama=300ms çıkıyor, bu ne anlama gelir, ne yaparsın?' sorusu sorulur. Bu bölüm tanım değil, metrik yorumlama ve mimari sorularına hazırlar." },
          { type: 'text', content: 'En sık sorulan JMeter mülakat soruları. Her soruya tıklayarak detaylı cevabı görebilirsiniz.' },
          {
            type: 'quiz',
            question: "JMeter'da JSON yanıtından token çıkarmak için hangi bileşen kullanılır?",
            options: [
              'Response Assertion — yanıt içeriğini doğrular',
              'JSON Extractor — JSONPath ile JSON yanıtlarından değer çıkarır',
              'HTTP Cookie Manager — çerezleri otomatik yönetir',
              'CSV Data Set Config — CSV dosyasından veri okur',
            ],
            correct: 1,
            explanation: "JSON Extractor, sunucu yanıtını okuyarak JSONPath ifadeleriyle değer çıkaran bir Post-Processor'dır. Referans Adı (örn. authToken) ve JSON Path (örn. $.data.token) ayarlanır. Ardından ${authToken} sonraki istek başlıklarında kullanılır.",
          
        retryQuestion: {
      "question": "JMeter testinde, bir sonraki HTTP isteğinde kullanılmak üzere HTTP yanıtından dinamik bir 'sessionId' değerini yakalamak için en uygun bileşen hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "Regex Extractor — metin bazlı desen eşleştirme yapar"
            },
            {
                  "id": "b",
                  "text": "JSON Extractor — JSONPath kullanarak yanıt içinden veri çeker"
            },
            {
                  "id": "c",
                  "text": "BeanShell PreProcessor — istek öncesi hesaplama yapar"
            },
            {
                  "id": "d",
                  "text": "User Defined Variables — statik değişkenleri tanımlar"
            }
      ],
      "correct": "b",
      "explanation": "Modern API'lerde yanıtlar genellikle JSON formatındadır. JSON Extractor, 'JSON Path expression' (örn: $.sessionId) kullanarak yanıt gövdesindeki değeri yakalar ve bunu bir değişkene atayarak sonraki isteklerde kullanılabilir hale getirir."
}
},
          {
            type: 'quiz',
            question: "JMeter testinde: ortalama yanıt süresi 800ms, ancak P99 12.000ms. Bu ne anlama gelir?",
            options: [
              'Test planı yanlış yapılandırılmış',
              'Sunucu performansı tutarlı biçimde iyidir',
              'Kullanıcıların çoğu iyi deneyim yaşıyor ama %1\'lik kesim çok yavaş yanıt alıyor — kuyruk gecikmesi sorunu',
              'Ramp-Up süresi çok kısa',
            ],
            correct: 2,
            explanation: "Ortalama, uç değerleri gizler. P99 = 12sn, kullanıcıların %1'inin 12 saniye beklediği anlamına gelir — çoğu uygulama için kabul edilemez. Bu kuyruk gecikmesidir; genellikle GC durakları, veritabanı sorgu değişkenliği veya thread havuzu tükenmesinden kaynaklanır. Ortalamanın yanı sıra her zaman P90 ve P99'a bakın.",
          
        retryQuestion: {
      "question": "Bir performans testinde ortalama yanıt süresini 200ms olarak görüyorsunuz, fakat P95 değeri 5000ms. Bu veriler bize ne anlatıyor?",
      "options": [
            {
                  "id": "a",
                  "text": "Sistem performansı tüm kullanıcılar için son derece hızlıdır"
            },
            {
                  "id": "b",
                  "text": "P95 metriği testin başarısız olduğunu kanıtlamaz"
            },
            {
                  "id": "c",
                  "text": "Çoğu kullanıcı iyi bir deneyim yaşasa da, kullanıcıların %5'i ciddi yavaşlık yaşamaktadır; bu bir darboğaz işaretidir"
            },
            {
                  "id": "d",
                  "text": "Ramp-up süresinin çok uzun olduğunu gösterir"
            }
      ],
      "correct": "c",
      "explanation": "Ortalama değer (mean), sistemin genel durumu hakkında yanıltıcı olabilir. P95'in ortalamadan çok daha yüksek çıkması, nadir görülen ancak ciddi olan performans sorunlarını veya kuyruk birikimlerini işaret eder ve mutlaka analiz edilmelidir."
}
},
          // JMeter interview-questions blokları
          {
            type: 'interview-questions',
              relatedTopicId: 'jmeter',
            topic: 'JMeter',
            questions: [
              // ── TEMEL ──────────────────────────────────────────
              { level: 'basic', q: { tr: 'JMeter nedir? Ne için kullanılır? Hangi protokolleri destekler?' }, a: { tr: 'Apache JMeter, açık kaynaklı Java tabanlı bir performans test aracıdır. Web uygulamalarının, API\'lerin ve servislerin yük altındaki performansını ölçmek için kullanılır. Temel kullanım alanları: yük testi (eş zamanlı kullanıcı simülasyonu), performans testi (yanıt süresi/throughput ölçümü), stres testi (kırılma noktasını bulma), API testi (REST/SOAP). Desteklenen protokoller: HTTP/HTTPS, FTP, JDBC, LDAP, SMTP, TCP, JMS, WebSocket (eklenti ile). Java analojisi: thread pool ve HTTP client\'ları elle yazmak yerine, JMeter bu altyapıyı raporlamayla birlikte hazır verir.' } },
              { level: 'basic', q: { tr: 'Yük Testi, Stres Testi ve Spike Testi arasındaki fark nedir?' }, a: { tr: 'Yük Testi, sistemi beklenen (normal ve yoğun) yük koşulları altında test eder, SLA\'ların karşılandığını doğrular (örn. 1000 kullanıcı için yanıt süresi < 2sn). Stres Testi, sistemi kapasitesinin ötesine kasıtlı olarak iter, kırılma noktasını ve arıza davranışını bulur. Spike Testi, kısa süreliğine çok büyük bir yük uygular sonra kaldırır, ani trafik artışlarına dayanıp dayanamadığını doğrular (haber viral oldu, flaş indirim başladı). Her biri farklı bir production sorusuna cevap verir, bu yüzden hangisini çalıştırdığını belirtmeden "performans testi yaptım" demek mülakatta eksik bir cevaptır.' } },
              { level: 'basic', q: { tr: 'Thread Group parametrelerini açıklayın: Kullanıcı Sayısı, Ramp-Up, Loop Count.' }, a: { tr: 'Kullanıcı Sayısı (Number of Threads), JMeter\'ın simüle edeceği toplam sanal kullanıcı sayısıdır — her thread bağımsız çalışır, gerçek bir kullanıcıyı temsil eder. Ramp-Up Period, JMeter\'ın tüm thread\'leri başlatması için geçen süredir (saniye) — 100 thread, 50 saniyelik ramp-up = saniyede ~2 kullanıcı başlatılır, sunucuyu anında bunaltacak bir "thundering herd"i önler. Loop Count, her thread\'in senaryoyu kaç kez tekrarlayacağıdır; Duration ayarıyla kullanmak için -1 (sonsuz) yapılır. Ramp-up\'ı yanlış ayarlamak, bir yük testi sonucunun gerçek trafik desenleriyle uyuşmamasının en yaygın sebeplerindendir.' } },
              { level: 'basic', q: { tr: 'Neden Non-GUI modu kullanmalısın? Nasıl çalıştırılır?' }, a: { tr: 'GUI önemli miktarda CPU ve bellek tüketir, bu da JMeter\'ın üretebileceği yükü azaltır, performans metriklerini bozar (JMeter makinesi darboğaz haline gelir) ve sonuçları güvenilmez kılar. 50\'den fazla kullanıcı içeren herhangi bir test için her zaman Non-GUI (CLI) modu kullan: jmeter -n -t test.jmx -l results.jtl, HTML raporu için -e -o ./html-report, ve -Jusers=500 -Jduration=300 ile komut satırından property override. GUI sadece test planını kurmak ve birkaç thread\'le debug etmek içindir — asla gerçek yük üretmek için değil.' } },
              { level: 'basic', q: { tr: 'JMeter\'da Sampler nedir? En az 5 türünü sayıp açıklayın.' }, a: { tr: 'Sampler, isteği gerçekten gönderen ve yanıtı toplayan bileşendir — bir test planının ana "işçisidir". Türler: HTTP Request (en yaygın, HTTP/HTTPS), JDBC Request (veritabanına SQL sorguları), FTP Request (dosya yükleme/indirme), SMTP Sampler (e-posta/mail sunucu testi), TCP Sampler (ham TCP soket iletişimi), JSR223 Sampler (özel Groovy/Python/JS kodu çalıştır), Debug Sampler (debug için JMeter değişkenlerini sonuçlarda göster). Bir test planındaki her diğer şey (Timer\'lar, Controller\'lar, Listener\'lar) Sampler\'ların ne yaptığını yapılandırmak, kontrol etmek veya gözlemlemek için vardır — sadece Sampler\'lar ölçülebilir yük üretir.' } },
              { level: 'basic', q: { tr: 'Assertion nedir? Neden kullanılır?' }, a: { tr: 'Assertion, sunucu yanıtının doğru olduğunu doğrulayan bileşendir. Assertion olmadan JMeter bir hata sayfası dönse bile bunu başarı sayar. Türler: Response Code Assertion (200 bekleniyorsa 500 gelirse başarısız), Duration Assertion (2000ms\'den uzunsa başarısız), Response Body Assertion (belirli bir string içerikte beklenmiyorsa başarısız). Assertion eklemeyi unutmak, bir test planının gerçekte başarısız olan istekleri "başarılı" olarak raporlamasının en yaygın sebebidir — HTTP 200 dönmesi içeriğin doğru olduğu anlamına gelmez.' } },
              { level: 'basic', q: { tr: 'JMeter\'da Listener ne işe yarar? En çok kullanılan hangisidir?' }, a: { tr: 'Listener, test sonuçlarını toplar ve görüntüler. Debug amaçlı: View Results Tree (her istek/yanıtı gösterir — büyük testlerde devre dışı bırakılmalı). Yük testleri için: Aggregate Report (Avg, Min, Max, P90, P99, Error%, Throughput). HTML Dashboard (CLI\'da -e -o flag\'iyle) en kapsamlı raporu üretir. Yaygın bir hata, View Results Tree\'yi büyük ölçekli bir testte açık unutmaktır — bu, her yanıtı RAM\'de saklayarak OutOfMemoryError\'a yol açabilir.' } },
              { level: 'basic', q: { tr: 'Test planın, requests/second\'ı hassas şekilde kontrol etmek için Throughput Shaping Timer\'a ihtiyaç duyuyor, ama bu JMeter\'ın varsayılan Add menüsünde hiçbir yerde görünmüyor. Neden, ve nasıl edinirsin?' }, a: { tr: 'JMeter görece küçük bir yerleşik bileşen seti ile gelir — çoğu ileri özellik (Throughput Shaping Timer, Custom Thread Group\'lar, ek grafikler) JMeter Plugins Manager üzerinden dağıtılan ayrı eklentilerde yaşar, bir kez kurduğun ve sonra JMeter UI\'ı içinden eklenti gözatıp kurmanı sağlayan ayrı bir .jar (Options → Plugins Manager). Neredeyse her ciddi yük testi en az bir eklentiye ihtiyaç duyar — hassas RPS kontrolü için Throughput Shaping Timer, veya sunucu-tarafı kaynak izleme için PerfMon en yaygın ikisidir. Eklenti kurmak makine başına tek seferlik bir kurulum adımıdır (veya CI için bir Docker image\'ına gömülür), test planı başına tekrarlanacak bir şey değildir.' } },
              { level: 'basic', q: { tr: 'JMeter\'ın kayıt proxy\'sini kullanarak bir HTTPS sitesine karşı kayıt yapmaya çalışıyorsun, ve tarayıcı bir sertifika uyarısı gösteriyor veya kayıt hiç trafik yakalamıyor. Kurulumdan eksik olan ne?' }, a: { tr: 'JMeter\'ın HTTP(S) Test Script Recorder\'ı bir man-in-the-middle proxy gibi davranır, bu da tarayıcına gerçek sitenin sertifikası yerine KENDİ SSL sertifikasını sunması gerektiği anlamına gelir — JMeter\'ın root CA sertifikasını (<jmeter>/bin/ca.crt\'de üretilir) tarayıcının güvenilir sertifika deposuna kurmadan, tarayıcı bağlantıyı doğru şekilde güvenilmeyen olarak reddeder. CA sertifikası güvenilir hale getirildikten sonra (makine başına tek seferlik kurulum), recorder kayıt için HTTPS trafiğini şeffaf şekilde araya girip şifresini çözebilir. Bu, kurumsal proxy\'lerin HTTPS trafiğini incelemek için kullandığı aynı güven mekanizmasıdır, sadece lokal olarak kayıt amaçlı çalışır.' } },
              { level: 'basic', q: { tr: 'Bir QA mühendisi, takımının günlük manuel API testi için neden Postman, aynı API\'nin yük testi için neden JMeter kullandığını soruyor, ikisi için de tek bir araç seçmek yerine. Gerçek iş bölümü nedir?' }, a: { tr: 'Postman, bireysel yanıtları incelemek ve hızlı manuel keşif için harika bir UI\'a sahip, fonksiyonel, tek-seferde-bir-istek API testi için optimize edilmiştir — Runner\'ı aracılığıyla birçok istek gönderebilir, ama binlerce eş zamanlı sanal kullanıcı simüle etmek veya percentile-bazlı performans metrikleri raporlamak için inşa edilmemiştir. JMeter, yük üretimi ve performans raporlaması için amaca özel inşa edilmiştir (Thread Group\'lar, ramp-up, P90/P99, throughput) ama hızlı keşifsel test için daha hantal bir UI\'a sahiptir. Takımlar tipik olarak fonksiyonel doğrulama sırasında Postman, doğruluk kanıtlandıktan ve yük altında performans ölçülmesi gerektiğinde JMeter kullanır — her iş için doğru araç, ikisini de yapmaya zorlanan tek bir araç değil.' } },
              { level: 'basic', q: { tr: 'Takımın, uygulama kodunu review ettiğin gibi bir pull request\'te JMeter test planı değişikliklerini review etmek istiyor, ama bir takım arkadaşı ".jmx dosyaları binary, gerçekten review edemezsin" diyor. Bu doğru mu?' }, a: { tr: '.jmx dosyaları gerçekte düz XML metindir, binary değildir — diff\'lenebilir ve bir pull request\'te review edilebilirler, git diff tam olarak hangi elementlerin değiştiğini, herhangi bir metin-tabanlı config dosyası gibi gösterir. Pratik zorluk format değil, okunabilirliktir: JMeter\'ın GUI\'si, elle yazılmış YAML\'dan görsel olarak taramayı daha zor kılan ayrıntılı, derin iç içe geçmiş XML üretir, bu yüzden reviewer\'lar genellikle bir değişikliğin gerçekte ne yaptığını anlamak için dosyayı ham diff\'in yanında JMeter\'ın GUI\'sinde de açar. .jmx dosyalarını versiyon-kontrollü, review edilen artifact\'ler olarak ele almak tam doğru içgüdüdür — format bunu destekler, tooling deneyimi sadece uygulama kodu review etmek kadar akıcı değildir.' } },
              { level: 'basic', q: { tr: 'Bir Logic Controller (Loop Controller gibi) ile bir Sampler arasındaki kavramsal fark nedir, ve amaçlarını karıştırmak neden kafa karıştırıcı test planlarına yol açar?' }, a: { tr: 'Bir Sampler gerçekten BİR ŞEY YAPAR — gerçek bir istek gönderir ve raporlarda görünen bir sonuç üretir. Bir Logic Controller, çocuklarının NASIL çalışacağını kontrol eder — bir Loop Controller çocuklarını N kez tekrarlar, bir If Controller onları koşullu çalıştırır — ama hiçbiri kendisi bir istek üretmez veya sonuçlarda bir satır olarak görünmez. Yaygın bir başlangıç seviyesi kafa karışıklığı, bir Logic Controller\'ın kendi başına ölçülebilir bir şey "yapmasını" beklemektir — bu, ölçülebilir yük üreten Sampler\'ların etrafında salt organizasyonel/akış-kontrol sarmalayıcısıdır, bir Java for-loop\'unun kendisinin hiçbir çıktı üretmemesine, sadece içindeki ifadelerin üretmesine benzer.' } },
              { level: 'basic', q: { tr: 'Test planından HTTP Cookie Manager\'ı "basitleştirmek için" kaldırıyorsun, ve şimdi login isteğinin kendisi başarılı olsa dahi, girişe bağlı her istek başarısız oluyor. Onu kaldırmak neyi bozdu?' }, a: { tr: 'HTTP Cookie Manager olmadan, JMeter gerçek bir tarayıcının yaptığı gibi session cookie\'lerini otomatik olarak saklamaz ve yeniden göndermez — login başarılı olabilir ve sunucu Set-Cookie ile yanıt verebilir, ama Cookie Manager olmadan JMeter onu basitçe atar ve SONRAKİ isteği hiç session bilgisi olmadan gönderir, sunucunun bunu kimliği doğrulanmamış bir ziyaretçi olarak görmesine yol açar. HTTP Cookie Manager\'ı bir Config Element olarak eklemek (temel kullanım için hiç yapılandırma gerektirmez) bu otomatik tarayıcı-benzeri davranışı geri getirir. Bu, açık token korelasyonundan (JSON Extractor + Authorization header) farklı bir mekanizmadır — cookie-bazlı oturumlar ve token-bazlı auth kendi ayrı işlemlerini gerektirir.' } },
              { level: 'basic', q: { tr: 'Takımın 10.000 kullanıcılı bir yük testi çalıştırıyor ve sonuçtaki .jtl dosyası birkaç gigabayt, sonradan açmak acı verici şekilde yavaş. Hangi yapılandırma kararı buna yol açmış olabilir ve nasıl düzeltirsin?' }, a: { tr: 'Varsayılan .jtl formatı, jmeter.properties veya Listener\'ın "Save As" yapılandırması üzerinden HER örnek için HER alanı (tam yanıt verisi dahil) loglayacak şekilde yapılandırılabilir — 10.000 kullanıcılı, uzun süreli bir test için bu, çoğu hiç incelenmeyen devasa miktarda gereksiz veri üretir. Çözüm: sadece analiz için gereken alanları logla (yanıt süresi, yanıt kodu, başarı/başarısızlık, thread adı, zaman damgası) ve geçen istekler için tam yanıt body\'sini saklamayı kapat, en büyük tek alan tüketicisi. Devasa testler için, sonuçları düz bir dosya yerine direkt bir Backend Listener\'a (InfluxDB) stream etmeyi düşün, büyük-dosya sorununu tamamen önler.' } },
              { level: 'basic', q: { tr: 'Farklı CI ortamları için bir test planının thread sayısını komut satırından override etmen gerekiyor, ve online örneklerde hem -J hem -D flag\'lerinin kullanıldığını görüyorsun. Pratik fark nedir?' }, a: { tr: '-J bir JMeter PROPERTY\'si ayarlar (${__P(propname)} ile erişilir) — bir test planını dışarıdan parametrelendirmenin standart yoludur, örn. -Jusers=500. -D ise bunun yerine bir JVM SYSTEM property\'si ayarlar, JMeter\'ın kendi runtime davranışını (proxy ayarları, Java-seviyesi yapılandırma) yapılandırmak içindir, test planının mantığının tipik olarak okuduğu değerler için değil. CI parametrelendirmesi için (ortam başına kullanıcı sayıları, hedef host\'lar), -J neredeyse her zaman istediğindir; -D, günlük test planı kullanımında çok daha az ortaya çıkan gerçek JVM-seviyesi yapılandırma ihtiyaçları için ayrılmıştır.' } },
              // ── ORTA SEVİYE ──────────────────────────────────────
              { level: 'intermediate', q: { tr: 'JMeter\'da Korelasyon nedir? Nasıl uygulanır?' }, a: { tr: 'Korelasyon, sunucu yanıtlarından dinamik değerlerin (CSRF token, session ID, auth token) çıkarılması ve sonraki isteklerde kullanılmasıdır — bu olmadan, bu değerler oturum başına değiştiğinden testler başarısız olur. Uygulama: değeri içeren yanıta bir JSON Extractor (veya Regular Expression Extractor) ekle, bir Referans Adı (örn. authToken) ve JSON Path ($.token) belirle, sonra sonraki isteklerin başlığında ${authToken} kullan (Authorization: Bearer ${authToken}). Korelasyon, kayıt sırasında mükemmel çalışan bir test planının replay\'de başarısız olmasının en yaygın tek sebebidir.' } },
              { level: 'intermediate', q: { tr: 'Rapordaki en önemli metrikler nelerdir? Tipik olarak hangi değerler kabul edilebilir?' }, a: { tr: 'Ortalama Yanıt Süresi (ortalama, web uygulamaları için genellikle < 2000ms hedef), 90. Persentil/P90 (kullanıcıların %90\'ı bu süreyi veya daha hızlısını alır, < 3000ms hedef), 99. Persentil/P99 (kullanıcıların %99\'u için en kötü durum, < 5000ms hedef), Hata Oranı % (sağlıklı sistemler için < %1 hedef), Throughput (sistemin saniyede işlediği istek sayısı, ne kadar yüksekse o kadar iyi), Apdex Skoru (kullanıcı memnuniyeti 0-1: Memnun > 0.85, Tolere edebilir 0.5-0.85, Memnuniyetsiz < 0.5). Mülakatçılar özellikle Average\'ın iyi görünürken P99\'un kötü olabileceğini anlayıp anlamadığını sorar — gerçek kullanıcıların önemli bir kısmının deneyimlediği şey ortalama değil persentildir.' } },
              { level: 'intermediate', q: { tr: 'Parameterizasyon nedir? Farklı yöntemleri sayın.' }, a: { tr: 'Parameterizasyon, hardcoded değerler yerine test iterasyonları boyunca farklı veri değerleri kullanmaktır, böylece her sanal kullanıcı (veya her iterasyon) uygulamayı her zaman aynı sabit değerle değil, gerçekçi, çeşitli girdilerle test eder. Yöntemler: CSV Data Set Config (büyük datasetler için CSV dosyalarından okur), User Defined Variables (CLI\'dan -J ile override edilebilen test-seviyesi değişkenler), random fonksiyonlar (${__Random(1,1000)}), Counter Config (sıralı ID\'ler için artan sayaç), JSR223/Groovy (daha karmaşık durumlar için programatik veri üretimi). Parametrelendirmeyi atlamak, bir yük testinin kazara gerçek uygulama kapasitesi yerine cache performansını ölçmesinin en yaygın sebeplerindendir.' } },
              { level: 'intermediate', q: { tr: 'Test planının 5 ayrı HTTP sampler\'ı var (login, profil-al, sepet-al, ürün-ekle, checkout) ama raporun tek anlamlı bir "checkout akışı" süresi yerine 5 bağlantısız yanıt süresi gösteriyor. Bunları tek bir mantıksal transaction\'a nasıl gruplarsın?' }, a: { tr: 'İlgili sampler\'ları, birleşik çalışma sürelerini tek bir raporlanan "transaction"a toplayan bir Transaction Controller içine sarmala — rapor, "Generate parent sample" onay kutusuna bağlı olarak bireysel sampler satırlarına ek olarak veya onların yerine, kendi yanıt süresiyle "checkout-flow" için tek bir satır gösterir. Bu, sadece teknik metrikler (bir HTTP çağrısı ne kadar sürdü) değil, iş açısından anlamlı metrikler (TÜM checkout ne kadar sürüyor) raporlamak için gereklidir — paydaşlar genellikle ilkiyle ilgilenir, mühendisler ikisine de ihtiyaç duyar.' } },
              { level: 'intermediate', q: { tr: 'Testin, her kullanıcının tam olarak aynı sabit sırayı izlemesi yerine, sanal kullanıcıların %80\'inin sadece ürünlere göz attığı ve %20\'sinin checkout tamamladığı gerçekçi trafiği simüle etmesi gerekiyor. Bu yüzde-bazlı dallanmaya hangi Logic Controller uyar?' }, a: { tr: 'Bir Throughput Controller ("Percent Executions" modunda), çocuklarını iterasyonlar boyunca sadece yapılandırılmış bir yüzde zamanında çalıştırır — sadece-göz-atma akışını sarmalayan birini %80\'e, checkout\'u sarmalayan ikinciyi %20\'ye ayarla, ve birçok iterasyon boyunca JMeter o trafik dağılımına yaklaşır. Bu, her kullanıcının özdeş takip ettiği sabit bir sıradan daha gerçekçidir, ki bu neredeyse hiçbir zaman gerçek trafiğe uymaz ve production\'ın gerçek karışık kullanımına kıyasla yanıltıcı şekilde tek-biçimli yük testi sonuçları üretebilir.' } },
              { level: 'intermediate', q: { tr: 'Bir "flaş indirim" senaryosu, zamanla kademeli olarak değil, TAM AYNI anda checkout\'a vuran tam olarak 500 kullanıcıyı simüle etmeyi gerektiriyor. Standart bir Thread Group\'ın ramp-up süresi başlangıçları kademelendirir — gerçek eşzamanlı çalışmayı nasıl zorlarsın?' }, a: { tr: 'Bir Synchronizing Timer, test planındaki o noktada her thread\'i, yapılandırılmış sayıda thread AYNI timer\'a TÜMÜ ulaşana kadar bloklar, sonra hepsini eşzamanlı olarak serbest bırakır — bu, Thread Group\'ın ramp-up\'ı ne kadar kademeli olursa olsun gerçek bir "herkes aynı anda ateşliyor" sıçraması oluşturur. "Number of Simultaneous Users to Group by"ı 500\'e ayarlamak, tüm 500 thread\'i o bariyerde hepsi yetişene kadar tutar, sonra birlikte serbest bırakır. Bu özellikle normal bir ramp-up\'ın tasarım olarak asla üretmediği gerçek eşzamanlı-sıçrama senaryolarını (flaş indirimler, bilet satışları) test eder.' } },
              { level: 'intermediate', q: { tr: 'Test planın üç farklı QA mühendisi tarafından sürdürülen 2.000 satırlık XML\'e büyümüş, ve tek .jmx dosyasında merge çakışmaları sürekli hale geliyor. JMeter büyük bir test planını takım genelinde modülerleştirmeyi nasıl destekler?' }, a: { tr: 'Include Controller\'lar, bir test planını ayrı .jmx fragment dosyalarına (login-akışı.jmx, checkout-akışı.jmx, ortak-config.jmx) bölmeni sağlar, ince bir "orkestratör" test planındaki Include Controller referansları aracılığıyla tek bir koşuma birleştirilir — her mühendis kendi fragment\'ını bağımsız olarak sahiplenir ve düzenler, herkesin tek bir devasa paylaşılan dosyayı düzenlemesine kıyasla merge çakışmalarını dramatik şekilde azaltır. Test Fragment\'lar (bağımsız çalıştırılmak yerine include edilmesi amaçlanan içerik için ayrılmış bir element türü) niyeti açık kılar. Bu, monolitik bir kod tabanını takım-sahipli modüllere bölmenin JMeter karşılığıdır.' } },
              { level: 'intermediate', q: { tr: 'Eski bir test planı özel scripting mantığı için BeanShell PreProcessor\'lar kullanıyor, ve bir takım arkadaşı bunun yerine JSR223 ile Groovy\'e geçişi öneriyor. Bu sadece bir stil tercihi mi, yoksa geçmek için gerçek bir sebep mi var?' }, a: { tr: 'JSR223 ile Groovy, aynı mantık için BeanShell\'den ölçülebilir şekilde daha hızlıdır, çünkü JSR223 script\'i derler ve CACHE\'ler ("Cache compiled script" işaretliyken), BeanShell ise her iterasyonda script\'i taze yorumlar — ölçekte, bu derleme overhead\'i farkı, kendisi yük testi sonuçlarını çarpıtabilen gerçek bir performans maliyetine dönüşür. Groovy ayrıca gerçek Java syntax\'ına daha yakındır, Java geçmişi olan bir takım için okumak daha kolaydır. Yeni test planlarına BeanShell ile başlamak için kalan bir sebep yoktur — etkin olarak legacy\'dir, sadece eski test planlarıyla geriye dönük uyumluluk için tutulur.' } },
              { level: 'intermediate', q: { tr: 'Bir sunucu yanıtı aynı regex pattern\'ı için birden fazla eşleşen değer içeriyor (örn. bir arama sonuçları sayfasında 10 ürün ID\'si), ama Regex Extractor\'ın her zaman sadece ilkini yakalıyor. Belirli birini, veya rastgele birini, bunun yerine nasıl çıkarırsın?' }, a: { tr: 'Regex Extractor\'ın "Match No." alanı hangi olayın yakalanacağını kontrol eder: 1 (varsayılan) ilk eşleşmeyi alır, 2 ikinciyi alır, ve böyle gider; Match No.\'yu 0 yapmak TÜM eşleşmeleri indeksli değişkenlere (productId_1, productId_2, ... productId_matchNr) yakalar. Gerçekten RASTGELE bir eşleşme seçmek için, Match No.\'yu -1\'e ayarla, tümünü yakala, sonra rastgele bir indeks seçmek için ${__Random(1,${productId_matchNr})} kullan. Bu desen, her zaman ilkine değil, gerçek bir kullanıcının rastgele bir arama sonucuna tıklamasını simüle eder, tek bir belirli ürüne gerçekçi olmayan şekilde yoğunlaşmış yükü önler.' } },
              { level: 'intermediate', q: { tr: 'Thread Group A\'da bir JSR223 Sampler kullanarak bir değişken set ediyorsun, ama Thread Group B aynı test planı koşumunda çalışsa dahi o değeri hiç göremiyor. Neden, ve bunun yerine ne kullanmalıydın?' }, a: { tr: 'Değişkenler (vars.put(), ${varname} ile erişilir) THREAD-başına kapsamlıdır — Thread Group\'lar arasında, hatta aynı grup içindeki farklı thread\'ler arasında dahi geçmezler, çünkü her thread bağımsız bir kullanıcıyı simüle eden kendi bağımsız değişken alanına sahiptir. Property\'ler (props.put(), ${__P(propname)} ile erişilir) JVM/test-planı seviyesinde kapsamlıdır ve TÜM Thread Group\'lar arasında görünürdür — gerçekten global, paylaşılan değerler için ihtiyacın olan budur. Düzeltme, Thread Group\'lar arasında meşru olarak paylaşılması gereken her şey için props kullanmak, gerçekten kullanıcı-başına bir session token gibi değerler için vars\'ı tutmaktır.' } },
              { level: 'intermediate', q: { tr: 'Performans testin 3 saat çalışıyor, ve test bitene kadar beklemek yerine yanıt sürelerini ve hata oranlarını canlı bir dashboard\'da trend olarak izlemek istiyorsun. Bunu hangi JMeter özelliği sağlar?' }, a: { tr: 'InfluxDB (veya Graphite) implementasyonuyla yapılandırılmış bir Backend Listener, test çalışırken her örnek sonucunu gerçek zamanlı olarak harici bir zaman serisi veritabanına stream eder, tamamlanana kadar anlamlı şekilde inceleyemeyeceğin lokal bir .jtl dosyasına yazmak yerine. Bunu, o InfluxDB instance\'ını sorgulayan bir Grafana dashboard\'uyla eşleştirmek, 3 saatlik test hâlâ çalışırken yanıt sürelerinin, hata oranlarının ve throughput\'un canlı, sürekli güncellenen bir görünümünü verir — bir şeyin açıkça bozuk olduğunu sadece tam 3 saati yaktıktan sonra keşfetmek yerine erken iptal etmeni sağlar.' } },
              { level: 'intermediate', q: { tr: 'Test planında tek tek GUI modunda her isteğe tıkladığında her istek tek tek başarılı oluyor, ama aynı plan Non-GUI modunda 500 eşzamanlı thread\'le çalıştırıldığında kitlesel olarak başarısız oluyor. Bu farkın en olası sebepleri nedir?' }, a: { tr: 'Tek bir istekle çalıştırmak hiçbir zaman concurrency-bağımlı bug\'ları test etmez — paylaşılan/yanlış-kapsamlı değişkenler (bir vars/props hatası nedeniyle bir thread\'in başka birinin token\'ını ezmesi), sunucu-tarafı kaynak tükenmesi (connection pool tükenmesi, DB lock çekişmesi) sadece gerçek eşzamanlı yük altında ortaya çıkar, ve client-tarafı kaynak limitleri (JMeter makinesinin 500 thread\'de dosya handle\'ı veya bellek tükenmesi) hepsi 1-thread test etmede görünmezdir ama ölçekte gerçektir. Bir GUI tek-tıklama testini yeterli doğrulama olarak asla güvenme — concurrency davranışı sadece gerçekçi eşzamanlılıkla gerçekten çalıştırarak doğrulanabilir, ideal olarak önce 500\'e direkt atlamadan ılımlı bir ölçekte.' } },
              { level: 'intermediate', q: { tr: 'Yük testi sonuçların gerçek kullanıcıların deneyimlediğine kıyasla gerçekçi olmayacak kadar hızlı görünüyor, ve JMeter\'ın tarayıcı cache davranışını hiç modellemediğinden şüpheleniyorsun. Eksik olan ne, ve eklemek gerçekte neyi değiştirir?' }, a: { tr: 'Varsayılan olarak, JMeter\'da bir HTTP Cache Manager yoktur, bu da gerçek bir tarayıcının cache\'leyeceği statik varlıklar (CSS, JS, görseller) dahil her isteğin her seferinde sunucudan tamamen yeniden çekildiği anlamına gelir, gerçek trafikten daha fazla sunucu yükü üretir ve gerçek kullanıcı deneyimini temsil etmeyen sonuçlar verir. Bir HTTP Cache Manager eklemek, JMeter\'ın gerçek bir tarayıcının yaptığı gibi cache-control header\'larına uymasını sağlar, daha gerçekçi bir profil verir — ama sadece backend/API testi için bu genellikle önemli değildir, tam sayfa web testi için ise üretilen yükü ve sonuçtaki zamanlamayı dramatik şekilde değiştirebilir.' } },
              { level: 'intermediate', q: { tr: 'Bir CSV Data Set Config\'i "Sharing mode: All threads" ile yapılandırıyorsun, her sanal kullanıcının farklı bir satır almasını bekliyorsun, ama yüksek eşzamanlılık altında kullanıcılar örtüşen veya tekrarlanan satırlar alıyor. Hangi sharing mode uyumsuzluğu buna yol açar, ve ne olmalıydı?' }, a: { tr: '"All threads" sharing mode, TÜM test planındaki TÜM thread\'lerin CSV\'de tek bir paylaşılan, tek okuma pozisyonundan çektiği anlamına gelir — yüksek eşzamanlılık altında, birden fazla thread neredeyse aynı anda "bir sonraki satırı" isteyebilir, kesin kullanıcı-başına-tek-satır izolasyonu bekleyen insanları şaşırtan örtüşen okumalar üretebilir. Çoğu "her kullanıcı kendi benzersiz verisini alır" senaryosu için, veri thread grubu başına kapsamlanmalıysa "Current thread group" genellikle amaçlanandır, ve CSV\'nin eşzamanlı thread sayısından en az kadar satıra sahip olduğundan emin olmak, sharing mode ne olursa olsun gerçek çakışmayı önler.' } },
              { level: 'intermediate', q: { tr: 'Yük testin 20 dakika sonra yanıt sürelerinin kötü şekilde bozulduğunu gösteriyor, ama uygulama sunucusunun gerçekten zorlanıp zorlanmadığını yoksa JMeter test makinesinin kendisinin darboğaz olup olmadığını söyleyemiyorsun. Tahmin etmeden bunları nasıl ayırt edersin?' }, a: { tr: 'Test edilen uygulamanın host\'una PerfMon eklentisinin server agent\'ını kur ve bir PerfMon Metrics Collector listener ekle — bu, SUNUCU\'nun CPU, bellek, disk I/O ve network kullanımını JMeter\'ın kendi yanıt-süresi grafiğiyle aynı zaman çizelgesinde doğrudan ilişkilendirir, böylece sunucu CPU\'sunun yanıt süreleri bozulduğunda gerçekten sıçrayıp sıçramadığını (gerçek sunucu-tarafı darboğaz) yoksa sadece JMeter makinesinin kendi CPU/belleğinin tırmanırken sabit kalıp kalmadığını (client-tarafı darboğaz) görebilirsin. Bu ilişkilendirme olmadan, "yanıt süreleri kötüleşti" en az iki çok farklı kök sebebi olan, tamamen farklı düzeltmeler gerektiren bir semptomdur.' } },
              { level: 'intermediate', q: { tr: 'Bir takım arkadaşının yük testinde 1.000 sanal kullanıcının hepsi ilk 2 saniyede login oluyor, 10 dakika çalışıyor, sonra hepsi eşzamanlı olarak logout oluyor. Bu neden gerçekçi olmayan bir yük şekli, ve daha gerçekçi bir test nasıl görünmeli?' }, a: { tr: 'Gerçek trafik esasen hiçbir zaman düz bir plato ve anlık bir düşüşü takip eden anlık bir sıçrama olarak gelmez — bu şekil sadece sistemin yapay, hepsi-bir-anda bir login fırtınasına tepkisini test eder, sürdürülen, kademeli olarak değişen gerçek-dünya yükü altındaki davranışını değil. Daha gerçekçi bir yük şekli üç aşamaya sahiptir: kademeli bir ramp-up (organik trafik büyümesini taklit eder), hedef yükte bir steady-state periyodu (sadece bir anlık görüntü değil, kararlı davranışı ve GC duraklamalarını gözlemlemek için yeterince uzun), ve hepsini bir anda öldürmek yerine kademeli bir ramp-down. Ultimate Thread Group eklentisi, çoklu-aşamalı yük şekillerini elle temel Thread Group\'ları zincirlemekten çok daha kolay tanımlamanı sağlar.' } },
              { level: 'intermediate', q: { tr: 'İki mühendis, yavaş bir yük testi sonucunun gerçek bir uygulama sorununu mu yoksa bir JMeter test makinesi kısıtlamasını mı yansıttığı konusunda anlaşamıyor. Bu anlaşmazlığı çözecek spesifik kanıt nedir?' }, a: { tr: 'Test sırasında JMeter\'ın kendi kaynak kullanımını kontrol et (JMeter makinesinin kendisinde PerfMon, OS-seviyesi izleme, veya JMeter\'ın kendi JVM heap kullanımı) — JMeter makinesinin CPU\'su %100\'e tutturulmuşsa veya heap\'i maksimuma yakınsa, uygulama sunucusunun CPU\'su rahatça düşükken, darboğaz YÜK ÜRETİCİSİDİR, test edilen sistem değil. Uygulama sunucusu yanıt süresi bozulmasıyla tam olarak ilişkili yüksek CPU/bellek/connection-pool doygunluğu gösteriyorsa, bu gerçek bir sunucu-tarafı darboğazdır. Sadece kötüleşen bir yanıt-süresi grafiğine asla güvenme — darboğazın nerede yaşadığına karar vermeden önce her zaman HEM client-tarafı HEM sunucu-tarafı kaynak metrikleriyle ilişkilendir.' } },
              { level: 'intermediate', q: { tr: 'Her HTTP sampler\'da aynı server/port/protokolü tekrar tekrar yazmak yerine, bunu test planının tek bir yerinde tanımlamak istiyorsun. Hangi config element bunu çözer?' }, a: { tr: 'HTTP Request Defaults config element, sunucu adı, port, protokol ve hatta path prefix\'i gibi değerleri bir kez tanımlar, ve test planındaki HER HTTP Request sampler bu varsayılanları otomatik olarak miras alır, sadece kendine özgü path veya parametreleri belirtmesi gerekir. QA için bu, ortamlar arası geçişi (dev → staging → prod) tek bir yerde bir değeri değiştirmeye indirir, plandaki düzinelerce sampler\'ı elle güncellemek yerine. Java analojisi: her metoda tekrar tekrar geçirmek yerine bir konfigürasyon nesnesinde temel URL\'i bir kez tanımlamak gibi.' } },
              { level: 'intermediate', q: { tr: 'Built-in Constant Throughput Timer ile plugin-bazlı Throughput Shaping Timer arasındaki fark nedir, ve basit olanın yeterli olduğu durum ile eklentiye ihtiyaç duyduğun durumu nasıl ayırt edersin?' }, a: { tr: 'Constant Throughput Timer (yerleşik), tüm test boyunca SABİT bir hedef requests/dakika oranını yaklaşık olarak korumaya çalışır — basit "sabit bir RPS\'de devam et" senaryoları için yeterlidir. Throughput Shaping Timer (eklenti) ise zaman içinde DEĞIŞEN bir hedef throughput eğrisi tanımlamanı sağlar (örn. 5 dakikada 0\'dan 1000 RPS\'e kademeli artış, sonra 1000\'de sabit kal, sonra kademeli düşüş) — gerçekçi ramp-up/steady-state/ramp-down yük şekilleri için gereklidir. Sabit bir hedef oran yeterliyse built-in timer\'ı kullan; zaman içinde değişen bir profile ihtiyacın varsa eklentiye geç.' } },
              { level: 'intermediate', q: { tr: 'HTTP Cookie Manager\'daki "Clear cookies each iteration" seçeneği ne yapar, ve dönen kullanıcıları (mevcut oturumla) mı yoksa her zaman taze ziyaretçileri mi simüle etmek istediğine göre bunu ne zaman açık/kapalı bırakmalısın?' }, a: { tr: 'Bu seçenek işaretliyken, her loop iterasyonu öncesi tüm cookie\'ler temizlenir, böylece her iterasyon her zaman sıfırdan, taze bir cookie durumuyla başlar — her zaman yeni gelen, hiç ziyaret etmemiş kullanıcıları simüle etmek istediğinde doğrudur (örn. her seferinde yeniden login testi). İşaretli değilken, cookie\'ler iterasyonlar arasında kalıcıdır, mevcut bir oturumla geri dönen bir kullanıcıyı simüle eder (login bir kez olur, sonraki iterasyonlar aynı oturumu kullanır). Yanlış ayar, ya gerçekçi olmayan şekilde her iterasyonda yeniden login yapan ya da gerçekte test etmek istediğin "dönen kullanıcı" senaryosunu hiç yakalamayan bir test üretir.' } },
              // ── İLERİ SEVİYE ─────────────────────────────────────
              { level: 'advanced', q: { tr: 'JMeter\'ı Jenkins/CI CD ile nasıl entegre edersiniz?' }, a: { tr: 'Seçenek 1: Jenkins Performance Plugin — .jtl dosyasına işaret eden bir "Publish Performance Test Result Report" post-build action ekle, hata oranı veya ortalama yanıt süresi belirlenen sınırları aşarsa build\'i başarısız sayan eşikler belirle. Seçenek 2: JMeter CLI\'ı direkt çalıştıran ve exit code\'u kontrol eden bir Shell/Bat build adımı. Seçenek 3: actions/setup-java kullanan, JMeter\'ı indiren, CLI\'ı çalıştıran ve HTML raporunu build artifact olarak yükleyen GitHub Actions. Her durumda Non-GUI modda çalıştır, ve build\'i sadece "JMeter başarıyla çıktı mı" değil anlamlı bir eşikte gate et.' } },
              { level: 'advanced', q: { tr: 'JMeter\'da Dağıtık Test nedir, ve ne zaman ihtiyaç duyulur?' }, a: { tr: 'Dağıtık test, yükü koordineli olarak üretmek için birden fazla makine kullanır — bir Controller makinesi, JMeter\'ın yerleşik RMI-bazlı mekanizması aracılığıyla birden fazla Worker (Injector) makinesini yönetir. Bunu, tek bir makine yeterli yük üretemediğinde (örn. 5000+ kullanıcı gerekiyor), daha gerçekçi coğrafi kullanıcı dağılımına ihtiyaç duyduğunda, veya tek bir makinedeki CPU/network limitleri ulaşılabilir yükü sınırladığında kullan. Kural: iyi bir sunucu tek bir makinede kabaca 300-500 HTTP thread\'i kaldırabilir; daha fazlası için worker ekle. Kurulum: her worker\'da jmeter-server çalıştır, controller\'daki jmeter.properties\'de remote_hosts\'a IP\'lerini ekle, -R flag\'iyle çalıştır.' } },
              { level: 'advanced', q: { tr: '5 worker makinesi arasında dağıtık bir test, worker\'lar arasında imkânsız derecede tutarsız görünen P99 gecikme değerleri gösteriyor — biri P99=200ms raporluyor, diğeri aynı duvar-saati zamanında aynı senaryo için P99=4500ms raporluyor. Uygulamadan şüphelenmeden önce, önce hangi altyapı sorununu elemelisin?' }, a: { tr: 'Worker makineleri arasında clock skew, klasik, genellikle gözden kaçan bir sebeptir: her worker\'ın sistem saati hassas şekilde senkronize değilse (NTP drift, özellikle güvenilir zaman senkronizasyonu olmadan cloud VM\'lerde), her worker\'ın KENDİ ölçümleri içsel olarak tutarlı kalır, ama "şu anda tüm worker\'larda ne oluyordu" ilişkilendirmesi için kullanılan zaman damgaları güvenilmez hale gelir, ve worker\'lar arası tutarlı zamanlamaya bağlı toplu persentil hesaplamaları yanıltıcı olabilir. Cross-worker toplu karşılaştırmalara güvenmeden önce tüm worker\'ların (ve controller\'ın) sıkı senkronizasyonla NTP çalıştırdığından emin ol, ve şüpheye düştüğünde önce her worker\'ın KENDİ lokal sonuç dosyasını izole olarak kontrol ederek doğrula.' } },
              { level: 'advanced', q: { tr: 'Herhangi bir tek makinenin üretebileceğinden çok daha fazla, 50.000 eşzamanlı kullanıcıyı simüle edebilen bir JMeter mimarisi tasarlaman gerekiyor. Bu ölçekte gerçek topoloji ve koordinasyon neye benzer?' }, a: { tr: 'Bir Controller, JMeter\'ın yerleşik RMI-bazlı dağıtık testi aracılığıyla birçok Worker makinesini koordine eder — ama native dağıtık mod, worker sayısı çok büyüdüğünde RMI koordinasyon overhead\'i etrafında pratik ölçeklendirme limitlerine sahiptir, bu yüzden belirli bir ölçeğin ötesinde takımlar 50+ makine arasında RMI bağlantılarını elle yönetmek yerine container-orkestreli yaklaşımlara (worker başına bir Kubernetes Job, veya provisioning, koordinasyon ve aggregation\'ı native olarak yöneten BlazeMeter/Azure Load Testing gibi bir cloud yük-testi servisi) geçer. 50.000 kullanıcıda özellikle, makine-başına thread limitleri (kaynak tükenmesinden önce gerçekçi olarak birkaç yüzden düşük binlere) orkestrasyon yaklaşımından bağımsız olarak en az düzinelerce worker makinesine ihtiyacın olduğu anlamına gelir — matematik worker sayısını belirler, bir tahmin değil.' } },
              { level: 'advanced', q: { tr: '3.000 thread çalıştıran tek bir JMeter makinesi, uygulama sunucusu herhangi bir zorlanma belirtisi göstermeden çok önce OutOfMemoryError ve bozulmuş performansla karşılaşıyor. Tek bir makineden yüksek thread sayıları üretmeyi hangi JVM/HTTP-client-seviyesi ayarlama çözer?' }, a: { tr: 'JMeter\'ın kendi JVM heap\'ini artır (jmeter.bat/sh\'de HEAP=-Xms4g -Xmx8g) çünkü her thread önemsiz olmayan bellek overhead\'i taşır ve 3.000 thread, herhangi bir uygulama darboğazına ulaşılmadan önce varsayılan boyutlu bir heap\'i gerçekten tüketebilir. HTTP Request implementasyonunu HttpClient4\'e geçir (legacy implementasyondan daha bellek-verimli) ve bu ölçekte örnek başına gereksiz sonuç-kaydetme alanlarını (yanıt body\'si, header\'lar) kapat. Tek bir makine gerçekten ayarlamadan sonra dahi gereken thread sayısını sürdüremiyorsa, bu, bir makinenin fiziksel limitleriyle savaşmaya devam etmek yerine dağıtık teste geçme sinyalidir.' } },
              { level: 'advanced', q: { tr: 'Uygulamanın, tipik 30 dakikalık bir yük testi sırasında değil, sadece birçok saat ılımlı yük altında çalıştıktan sonra ortaya çıkan şüpheli bir memory leak\'i var. Bunu yakalamak için bir JMeter soak/endurance testini nasıl tasarlarsın, ve neye bakarsın?' }, a: { tr: 'Bir Thread Group\'u Duration (Loop Count değil) 24+ saate ayarlı, MODERAT, sürdürülen yükte (peak yük değil, çünkü hedef kırılma noktasını bulmak değil yavaş bozulmayı tespit etmektir) yapılandır, tüm süre boyunca yapay peak yük üretmemek için bir Timer ile gerçekçi pacing kullan. Uygulama sunucusunun bellek trendini PerfMon/APM ile tüm süre boyunca izle — gerçek bir leak, GC sonrası asla baseline\'a dönmeyen, yavaşça, kararlı şekilde TIRMANAN bir grafik olarak görünür, normal testere-dişi GC desenlerinden farklıdır. Ayrıca JMeter\'ın kendi yanıt-süresi trendini izle — sabit yükte saatler boyunca kademeli olarak artan süreler, bir sunucu-tarafı leak\'in çökmeden önce performansı bozduğunun klasik dışsal semptomudur.' } },
              { level: 'advanced', q: { tr: 'Bir yük testi, geçen ayın baseline koşumuna kıyasla P99 gecikmesinin iki katına çıktığını gösteriyor, ama aynı JMeter test planını tekrar çalıştırmak sana NEDEN daha yavaş olduğunu söylemiyor. Sadece varlığını yeniden doğrulamak yerine bir performans regresyonunu gerçekte nasıl kök-nedenlendirirsin?' }, a: { tr: 'Bozulmuş JMeter koşumunun tam zaman penceresini, aynı pencereyi kapsayan APM aracı trace\'leriyle (New Relic, Datadog, Dynatrace) ilişkilendir — APM, tek bir yavaş istek içinde zamanın gerçekte nerede harcandığını (belirli bir yavaş SQL sorgusu, bir N+1 deseni, yavaş bir downstream çağrısı) gösteren dağıtık trace\'ler gösterir, ki JMeter bunu göremez çünkü sadece DIŞARIDAN toplam round-trip süresini ölçer, sunucu içinde ne olduğuna sıfır görünürlüğü vardır. Sadece JMeter\'ı yeniden çalıştırmak regresyonun gerçek ve tekrarlanabilir olduğunu doğrular ama fazladan sürenin NEREDE harcandığı hakkında hiçbir bilgi vermez — bu, yük üretimini (JMeter) gözlemlenebilirlikle (APM) birleştirmeyi gerektirir.' } },
              { level: 'advanced', q: { tr: 'Cloud VM\'ler arasındaki dağıtık JMeter kurulumun özel bir ağda çalışıyor, ama bir güvenlik incelemesi, bu makineler sıkı kontrollü bir ağın dışına çıkarsa Controller ve Worker\'lar arasındaki RMI portlarını risk olarak işaretliyor. Bunu nasıl güvenceye alırsın?' }, a: { tr: 'JMeter\'ın dağıtık mod RMI iletişimi varsayılan olarak kimlik doğrulamasız ve şifrelenmemiştir — tamamen özel, kilitli bir ağda sorun değildir, ama herhangi bir worker veya controller\'ın genel IP\'si varsa risklidir, çünkü o RMI portlarına ulaşabilen herkes Controller-Worker iletişimini potansiyel olarak kontrol edebilir. Önlemler: Controller ve Worker\'ları sadece RMI portlarını (1099 ve dinamik olarak ayrılan server portu) sadece gereken belirli IP\'lere kısıtlayan security group\'larla özel bir ağda/VPC\'de tut, bunları asla genel internete açma, ve worker\'lar ağ sınırlarını geçmesi gerekiyorsa SSH tünellemeyi düşün. Controller-worker RMI bağlantısını, kimlik doğrulamasız bir veritabanı bağlantısıyla aynı ağ izolasyon disipliniyle ele al — asla direkt internete açık olmasın.' } },
              { level: 'advanced', q: { tr: 'Takımın JMeter\'ı lokalde/kendi yönetilen bir VM\'de çalıştırmaktan cloud-bazlı bir yük testi servisine (BlazeMeter, Azure Load Testing) geçiyor. "Artık cloud\'da çalışıyor"un ötesinde, test tasarımında ve iş akışında gerçekte ne değişir?' }, a: { tr: '.jmx test planının kendisi tipik olarak büyük ölçüde değişmeden kalır, çünkü bu servisler genellikle JMeter-uyumludur ve mevcut planını çalıştırır. Değişen: worker provisioning ve koordinasyon platformun sorumluluğu olur, test çalıştırma yönetilen, genellikle kullanım-bazlı ücretlendirilen bir cloud kaynağı olur, ve sonuç dashboard\'ları tipik olarak kendi-yönetilen JMeter\'ın raporlamasından kutudan çıktığı gibi daha zengindir. Değerlendirilecek trade-off\'lar: ölçekte maliyet, veri konumu/güvenliği (test trafiği ve gömülü test credential\'ları şimdi üçüncü-taraf bir platformdan geçer), ve tamamen sahip olduğun altyapıya kıyasla tam worker makine spesifikasyonları üzerinde azalmış düşük-seviye kontrol.' } },
              { level: 'advanced', q: { tr: 'Takımın, bir performans testi SLA regresyonu gösterirse CI\'ın otomatik olarak build\'i başarısız etmesini istiyor, ama naif bir "P99 > 2000ms ise başarısız et" gate\'i, uygulamanın gerçekte daha yavaş olmasıyla ilgisiz, gürültülü, aşırı yüklenmiş bir CI runner\'da sürekli yanlış-pozitif başarısızlıklar üretiyor. Gerçekten güvenilir bir gate\'i nasıl tasarlarsın?' }, a: { tr: 'Tek bir gürültülü koşumun mutlak eşiği tam olarak bu yüzden kırılgandır çünkü CI altyapısının kendisi uygulamayla ilgisiz değişkenlik getirir — bunun yerine karşılaştırılabilir şekilde provision edilmiş bir ortamdan bir BASELINE\'a karşı karşılaştır, sadece yeni koşum kendi geçmiş baseline\'ından önemli ölçüde daha kötüyse regresyon işaretle (örn. P99, son N-koşum ortalamasına kıyasla %20\'den fazla arttı), genel CI gürültüsüne sabit bir kesimden daha dayanıklıdır. Performans testlerini özel, tutarlı şekilde provision edilmiş CI runner\'larında çalıştırmak, büyük bir gürültü kaynağını kökten kaldırır. Gerçekten gürültülü ortamlar için, build\'i başarısız etmeden önce regresyonun 2 ardışık koşum boyunca sürmesini gerektir, anlık sinyali daha az yanlış-pozitif oranıyla takas et.' } },
              { level: 'advanced', q: { tr: 'Bir takım arkadaşı yeni bir proje için JMeter\'dan Gatling veya k6\'ya geçişi öneriyor, JMeter\'ın thread-per-virtual-user modelinin onların async/event-loop modelleri kadar iyi ölçeklenmediğini savunuyor. Bu geçerli bir teknik kaygı mı, ve gerçekte ne zaman önemli olur?' }, a: { tr: 'Bu gerçek bir mimari farktır: JMeter sanal kullanıcı başına bir gerçek OS thread\'i doğurur (kullanıcı başına önemli bellek/context-switching overhead\'i, pratik tek-makine eşzamanlılığını kabaca düşük-binlerce thread\'e sınırlar), Gatling ve k6 ise aynı donanımla makine başına önemli ölçüde daha fazla eşzamanlı kullanıcı simüle edebilen async, event-loop-bazlı bir model kullanır. Bu, kısıtlı donanımdan çok yüksek eşzamanlılığa ihtiyaç duyduğunda gerçekten önemlidir — JMeter aynı sayılara ulaşmak için orantılı olarak daha fazla worker makinesine ihtiyaç duyardı. Ilımlı ölçekte (yüzlerce-düşük-binlerce kullanıcı) çok daha az önemlidir, ki burada JMeter\'ın çok daha büyük plugin ekosistemi, GUI-bazlı kayıt ve daha geniş protokol desteği (sadece HTTP değil, JDBC, FTP, JMS) Gatling/k6\'nın bu kadar kapsamlı eşleşemediği gerçek avantajlardır — doğru araç gerçek ölçek ve protokol ihtiyaçlarına bağlıdır, körü körüne "daha yeni daha iyidir" varsayımına değil.' } },
              { level: 'advanced', q: { tr: 'Yük testin, tüm 5.000 sanal kullanıcının "sepete ekle" istekleri için aynı hardcoded ürün ID\'sini kullanıyor, ve sonuçlar o ölçekte beklediğinden şüpheli derecede hızlı yanıt süreleri gösteriyor. Özdeş test verisi sonuçlarını nasıl çarpıtabilir, ve nasıl düzeltirsin?' }, a: { tr: 'Uygulama veya önündeki herhangi bir katman (CDN, uygulama-seviyesi cache, veritabanı sorgu cache\'i) ürün ID\'sine göre keyleyen yanıtları cache\'liyorsa, AYNI ID\'yi 5.000 kez dövmek, gerçek çeşitli ürün ilgileriyle gerçek kullanıcıların gerçekte tetikleyeceği gerçek, cache\'lenmemiş kod yolunu çalıştırmak yerine isteklerin büyük çoğunluğunun bir cache HIT\'inden sunulması demektir — testin kazara gerçek kapasiteyi değil cache performansını ölçtüğü anlamına gelir. Düzeltme, ürün ID\'lerini CSV Data Set Config ile birçok farklı ID\'nin gerçekçi bir dağılımıyla parametrelendirmektir, ideal olarak gerçek production desenlerine uyacak şekilde, her kullanıcının tek bir ID\'ye vurması yerine. Bu, gerçek, çeşitli trafiğin testin kazara yararlandığı aynı cache-hit oranından yararlanmadığında sadece bir production olayı olarak ortaya çıkan, sıkça kaçırılan bir gerçekçi-olmayan-iyimser-sonuç kaynağıdır.' } },
              { level: 'advanced', q: { tr: '4 worker arasında dağıtık bir test sonrası, Controller\'ın toplu raporu, her worker\'ın bireysel lokal .jtl dosyası örnek sayılarının toplamıyla eşleşmeyen bir toplam örnek sayısı gösteriyor. Bu tutarsızlığın olası sebepleri nedir, ve nasıl araştırırsın?' }, a: { tr: '4 worker\'ın da gerçekten başarıyla tamamlanıp Controller\'a geri rapor edip etmediğini kontrol et — test ortasında çöken, network bağlantısını kaybeden veya Controller sonuçları toplarken hâlâ çalışan bir worker, örneklerinin az sayılmasına veya tamamen kaybolmasına yol açar, sadece nihai toplu raporu kontrol edersen kaçırılması kolay sessiz bir kısmi-başarısızlıktır. Tüm worker\'ların ÖZDEŞ test planı ve JMeter versiyonunu çalıştırdığını da doğrula — bir worker\'da eski bir plan veya farklı bir versiyon, bir aggregation bug\'ı değil meşru sebeplerle farklı bir örnek sayısı üretir. Araştırma prensibi: toplu rapora güvenmeden önce her worker\'ın KENDİ lokal sonuç dosyasını bağımsız olarak her zaman incele, çünkü toplu rapor en az güvenilir katkıda bulunan worker\'ı kadar doğrudur.' } },
              { level: 'advanced', q: { tr: 'Uygulaman, JMeter\'ın yerleşik Sampler\'larından (HTTP, JDBC, TCP vb.) hiçbirinin doğru şekilde oluşturamadığı veya parse edemediği özel bir binary protokol kullanıyor. Takım onu yine de yük test etmeli. Bunu JMeter\'da çalıştırmanın gerçek yolu nedir?' }, a: { tr: 'JMeter, JavaSamplerClient interface\'ini implemente eden Java\'da yazılmış özel Sampler\'ları destekler — protokolün belirli istek oluşturma ve yanıt parse etme mantığını ele alan bir Java sınıfı yaz, .jar olarak paketle, JMeter\'ın /lib/ext dizinine bırak, ve Add → Sampler → Java Request menüsünde herhangi bir yerleşik sampler gibi görünür. Bu gerçek bir yazılım geliştirme görevidir (düzgün Java geliştirme, protokol mantığını JMeter\'dan bağımsız unit test etme, plugin jar\'ını paketleme/versiyonlama), hızlı bir GUI yapılandırması değil. Bunu inşa etmeden önce, mevcut bir community plugin\'in protokolü zaten desteklemediğini doğrula — özel bir Sampler inşa etmek sadece mevcut hiçbir şey sorunu zaten çözmüyorsa cevaptır.' } },
              { level: 'advanced', q: { tr: 'Yük testin 1.000 eşzamanlı kullanıcıda 4 saniyelik P99 gecikmesi ve saniyede 200 istek throughput gösteriyor — ama yönetimin gerçek sorusu "Black Friday trafiği olan 50.000 eşzamanlı kullanıcı için kaç uygulama sunucusuna ihtiyacımız var?" JMeter\'ın ham sayılarını bu altyapı kararına nasıl çevirirsin?' }, a: { tr: 'Önce throughput\'un gerçekten sunucu-tarafı sınırlı mı (1.000 kullanıcıda yüksek CPU/connection-pool doygunluğu gösteren PerfMon/APM ile doğrulanmış) yoksa client-sınırlı mı (JMeter\'ın kendisinin darboğaz olması) olduğunu doğrula — sadece gerçekten sunucu-sınırlı bir sonuç extrapolasyon için anlamlıdır. Sunucu-sınırlıysa, kullanıcı sayısı ile gereken kapasite arasındaki ilişki genellikle mükemmel doğrusal değildir (connection pool limitleri ve DB darboğazları yük arttıkça genellikle doğrusaldan daha hızlı bozulur), bu yüzden "50.000 ÷ 1.000 × mevcut sunucu sayısı" gibi naif bir matematik AZ-provision etmeye eğilimlidir — sadece iki veri noktası değil, gerçek ölçeklendirme eğrisinin şeklini gözlemlemek için ara noktalarda (5.000, 15.000, 30.000 kullanıcı) ek yük testleri çalıştır, sonra bu ampirik eğriyi maliyet/pay gereksinimleriyle birleştirerek savunulabilir bir sunucu sayısına ulaş.' } },
            ],
          },
          {
            type: 'error-dictionary',
              relatedTopicId: 'jmeter-errors',
            framework: 'JMeter',
            errors: [
              {
                error: 'java.net.ConnectException: Connection refused',
                fullMessage: 'java.net.ConnectException: Connection refused: connect\nat org.apache.jmeter.protocol.http.sampler.HTTPHC4Impl.executeRequest',
                cause: { tr: 'JMeter hedef sunucuya bağlanamıyor. Sunucu kapalı, yanlış port/host ayarlandı veya güvenlik duvarı bağlantıyı engelliyor.', en: 'JMeter cannot connect to the target server. The server is down, wrong host/port configured, or a firewall is blocking the connection.' },
                solution: { tr: '1) Sunucunun çalıştığını doğrulayın. 2) HTTP Request\'de Host ve Port değerlerini kontrol edin. 3) URL\'e tarayıcıdan erişebildiğinizi test edin. 4) Güvenlik duvarı kurallarını kontrol edin.', en: '1) Verify the server is running. 2) Check Host and Port in the HTTP Request sampler. 3) Test the URL from a browser. 4) Check firewall rules.' },
                codeWrong: `# Yanlış port — sunucu 8080'de dinliyor
HTTP Request:
  Server Name: localhost
  Port: 3000  ← YANLIŞ`,
                codeFixed: `# Doğru port
HTTP Request:
  Server Name: localhost
  Port: 8080
  Path: /api/users`
              },
              {
                error: { tr: 'EXTRACTION_FAILED — Değişken EXTRACTION_FAILED içeriyor', en: 'EXTRACTION_FAILED — variable contains EXTRACTION_FAILED' },
                fullMessage: '${authToken} → EXTRACTION_FAILED\nJSON Extractor: No results for expression: $.data.token',
                cause: { tr: 'JSON Extractor belirtilen path ile yanıtta hiçbir değer bulamadı. Login başarısız olmuş, response yapısı değişmiş veya JSON path yanlış yazılmış olabilir.', en: 'JSON Extractor could not find a value matching the JSON path in the response. Login may have failed, the response structure changed, or the JSON path is wrong.' },
                solution: { tr: '1) View Results Tree ile gerçek yanıtı inceleyin. 2) JSON path ifadesini doğrulayın. 3) Önceki isteğin başarılı olduğunu kontrol edin. 4) Extraction başarısız olursa testi başarısız sayan bir assertion ekleyin.', en: '1) Inspect the actual response in View Results Tree. 2) Verify the JSON path expression. 3) Confirm the preceding request succeeded. 4) Add an assertion that fails the test if extraction fails.' },
                codeWrong: `# Yanlış JSON path — yanıt yapısı farklı
# Gerçek yanıt: {"result": {"token": "abc"}}
# Yanlış path: $.data.token  ← "data" anahtarı yok`,
                codeFixed: `# Doğru JSON path
JSON Path: $.result.token

# Ek assertion — extraction başarısız olursa testi durdur
Response Assertion:
  Apply to: JMeter Variable: authToken
  Pattern: EXTRACTION_FAILED
  Not: ✓`
              },
              {
                error: 'OutOfMemoryError: Java heap space',
                fullMessage: 'java.lang.OutOfMemoryError: Java heap space\nat org.apache.jmeter.reporters.ResultCollector.sampleOccurred',
                cause: { tr: 'JMeter JVM heap alanı doldu. Büyük testlerde View Results Tree gibi tüm veriyi RAM\'de saklayan Listener\'lar kullanıldığında olur.', en: "JMeter's JVM heap space is exhausted. Usually caused by Listeners like View Results Tree storing all data in RAM during large-scale tests." },
                solution: { tr: '1) View Results Tree\'yi devre dışı bırakın — yalnızca debug için kullanın. 2) jmeter.bat/sh dosyasında JVM heap\'i artırın: -Xmx4g. 3) Büyük testlerde yalnızca Aggregate Report veya Summary Report kullanın.', en: '1) Disable View Results Tree — use only during debugging. 2) Increase JVM heap in jmeter.bat/sh: -Xmx4g. 3) For large tests use only Aggregate Report or Summary Report.' },
                codeWrong: `# Yanlış — büyük testte View Results Tree etkin
1000 kullanıcı × 300 döngü + View Results Tree
→ Tüm yanıtlar RAM'de saklanır → OOM`,
                codeFixed: `# Doğru — büyük testlerde verimli listener'lar kullan
Aggregate Report       ← sadece istatistik
CLI: -e -o ./rapor    ← HTML rapor test sonrası

# jmeter.bat / jmeter.sh:
set HEAP=-Xms4g -Xmx4g`
              },
              {
                error: 'Non HTTP response code: org.apache.http.conn.ConnectTimeoutException',
                fullMessage: 'Response code: Non HTTP response code: org.apache.http.conn.ConnectTimeoutException\nResponse message: Connect to api.example.com:443 timed out',
                cause: { tr: 'Bağlantı timeout\'u doldu — sunucu, JMeter\'ın beklediği süre içinde bağlantıyı kabul etmedi. Yüksek yük altında sunucu kapasitesini aşıyor.', en: 'Connection timeout exceeded — the server did not accept the connection within JMeter\'s timeout. Under heavy load the server may be at capacity.' },
                solution: { tr: '1) HTTP Request Advanced sekmesinde Connection Timeout\'u artırın. 2) Bu hatanın yüksek yükte çoğalıp çoğalmadığını inceleyin — sistemin kırılma noktasını gösterir. 3) Ramp-up süresini uzatın.', en: '1) Increase Connection Timeout in the HTTP Request Advanced tab. 2) Check if this error multiplies under high load — it signals the system breaking point. 3) Increase ramp-up period.' },
                codeWrong: `# Çok agresif ramp-up ve kısa timeout
Connection Timeout: 1000ms
Thread Group: 1000 kullanıcı, Ramp-Up: 5s`,
                codeFixed: `# Gerçekçi ayarlar
Connection Timeout: 10000ms
Response Timeout:   30000ms
Thread Group:
  1000 kullanıcı
  Ramp-Up: 300s  ← 5 dakikada kademeli artış`
              },
            ]
          },
          // JMeter Glossary
          { type: 'glossary-section', terms: [
            { term: 'Aggregate Report', definition: { tr: 'Her endpoint icin Avg, Min, Max, P90, P99, Error% ve Throughput gosteren JMeter Listener bileşeni.', en: 'A JMeter Listener that shows Avg, Min, Max, P90, P99, Error%, and Throughput per endpoint.' } },
            { term: 'Apdex Score', definition: { tr: 'Kullanici memnuniyetini 0-1 skalasinda olcen performans metrigi. Tatmin edici (>0.85), Tolere edilebilir (0.5-0.85), Hayal kirikligi (<0.5).', en: 'A performance metric measuring user satisfaction on a 0-1 scale. Satisfied (>0.85), Tolerating (0.5-0.85), Frustrated (<0.5).' } },
            { term: 'Assertion', definition: { tr: 'Sunucu yanitinin beklenen kosullari (status kodu, icerik, sure) karsilayip karsilamadigini dogrulayan JMeter bileseni.', en: 'A JMeter component that validates whether the server response meets expected conditions (status code, content, duration).' } },
            { term: 'Correlation', definition: { tr: 'Sunucu yanitlarindan dinamik degerlerin (token, session ID) cikarilmasi ve sonraki isteklerde kullanilmasi sureci.', en: 'The process of extracting dynamic values (tokens, session IDs) from server responses and reusing them in subsequent requests.' } },
            { term: 'CSV Data Set Config', definition: { tr: 'Bir CSV dosyasinden test verisi okuyan ve her sanal kullaniciya farkli satirlar atayan JMeter konfigurasyon oğesi.', en: 'A JMeter config element that reads test data from a CSV file and assigns different rows to each virtual user.' } },
            { term: 'Endurance Testing', definition: { tr: 'Sistemin uzun sure boyunca (saatler/gunler) orta yukle calistirilarak bellek sikintilari ve yavas degisme tespit edilmesidir.', en: 'Running a system at moderate load for extended periods (hours/days) to detect memory leaks and slow degradation.' } },
            { term: 'JSON Extractor', definition: { tr: 'JSON Path ifadelerini kullanarak sunucu yanitlarindan deger cikarip JMeter degiskenlerine atayan post-processor.', en: 'A post-processor that uses JSON Path expressions to extract values from server responses and store them as JMeter variables.' } },
            { term: 'Load Testing', definition: { tr: 'Sistemin beklenen kullanici sayisi altindaki davranisini degerlendiren performans testi turu.', en: 'A type of performance test that evaluates a system behavior under expected user load.' } },
            { term: 'Non-GUI Mode', definition: { tr: 'JMeter i grafik arayuz olmadan calistiran CLI modu. Gercek yuk testlerinde kullanilmalidir.', en: 'CLI mode that runs JMeter without the graphical interface. Must be used for real load tests.' } },
            { term: 'Percentile (P90/P95/P99)', definition: { tr: 'Kullanicilarin %90/%95/%99 unun o yanit suresinde veya daha hizlisinda aldigi istatistiksel olcut.', en: 'A statistical measure indicating that 90%/95%/99% of users received that response time or faster.' } },
            { term: 'Ramp-Up Period', definition: { tr: 'JMeter in tum thread leri kademeli olarak baslatmak icin harcadigi sure (saniye). Thundering herd etkisini onler.', en: 'The time (seconds) JMeter takes to gradually start all threads. Prevents the thundering herd effect.' } },
            { term: 'Sampler', definition: { tr: 'Bir istek gonderen ve yaniti toplayan JMeter bileseni. En yaygin: HTTP Request Sampler.', en: 'A JMeter component that sends a request and collects the response. Most common: HTTP Request Sampler.' } },
            { term: 'Spike Testing', definition: { tr: 'Ani ve buyuk bir trafik artisi simule ederek sistemin elastikligini test etme turu.', en: 'A type of performance test that simulates a sudden, large surge of traffic to test system elasticity.' } },
            { term: 'Stress Testing', definition: { tr: 'Sistemin kapasitesinin otesine itilerek kirilma noktasinin ve arizalanma davranisinin belirlenmesi.', en: 'Pushing a system beyond its capacity limits to determine the breaking point and failure behavior.' } },
            { term: 'Thread Group', definition: { tr: 'Sanal kullanicilari (thread), ramp-up suresini ve dongu sayisini tanimlayan temel JMeter bileseni.', en: 'The core JMeter component that defines virtual users (threads), ramp-up period, and loop count.' } },
            { term: 'Throughput', definition: { tr: 'Sistemin birim zamanda isleyebildigi istek sayisi (istek/saniye). Kapasiteyi olcer.', en: 'The number of requests the system processes per unit time (requests/second). Measures capacity.' } },
            { term: 'Timer', definition: { tr: 'Istekler arasinda gecikme ekleyen JMeter bileseni. Gercekci kullanici davranisini simule eder.', en: 'A JMeter component that adds delay between requests. Simulates realistic user think time.' } },
          ]},
        ],
      },
    ],
  },
}

fillMissingCodeTrios(jmeterData, 'jmeter')
