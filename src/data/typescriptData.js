// TypeScript Learning Platform Data
// 8-tab structure for TopicPage renderer

const sections = [
  // ─────────────────────────────────────────────
  // SECTION 0 — Intro & Why
  // ─────────────────────────────────────────────
  {
    title: "Intro & Why TypeScript",
    blocks: [
      {
        type: "heading",
        content: "TypeScript vs JavaScript",
      },
      {
        type: "text",
        content:
          "TypeScript is a statically typed superset of JavaScript developed by Microsoft. Every valid JavaScript file is also valid TypeScript — you adopt it incrementally without rewriting your entire codebase. TypeScript adds a compile step that catches type errors, undefined property accesses, and wrong argument types before your code ever runs, turning runtime surprises into development-time feedback.",
      },
      {
        type: "heading",
        content: "Why TypeScript for Test Automation?",
        difficulty: "🟢 Beginner",
      },
      {
        type: "grid",
        cols: 3,
        items: [
          {
            icon: "🐛",
            label: "Catch Errors Early",
            desc: "Type errors surface at compile time in your IDE — not at 2 AM when a test suite fails in CI.",
          },
          {
            icon: "💡",
            label: "IDE Autocomplete",
            desc: "Full IntelliSense for Playwright's Page, Locator, Browser, and your own Page Objects — no more guessing method names.",
          },
          {
            icon: "🔧",
            label: "Safe Refactoring",
            desc: "Rename a method or change a selector type and TypeScript instantly highlights every affected call site.",
          },
          {
            icon: "📖",
            label: "Self-Documenting Code",
            desc: "Type signatures act as inline documentation. A function typed `(user: User): Promise<void>` explains itself without comments.",
          },
          {
            icon: "👥",
            label: "Team Scale",
            desc: "Large QA teams benefit most — typed interfaces enforce contracts between page objects, fixtures, and test data factories.",
          },
          {
            icon: "🎭",
            label: "Playwright Native",
            desc: "Playwright is written in TypeScript and ships first-class .d.ts definitions. TypeScript is the officially recommended language for Playwright.",
          },
        ],
      },
      {
        type: "heading",
        content: "TypeScript vs JavaScript: Feature Comparison",
      },
      {
        type: "table",
        headers: ["Feature", "JavaScript", "TypeScript"],
        rows: [
          ["Type safety", "None (dynamic)", "Static, optional"],
          ["IDE support", "Basic", "Full IntelliSense + autocomplete"],
          ["Compile step", "None — runs directly", "tsc compiles to .js"],
          ["Learning curve", "Low", "Low→Medium (types add concepts)"],
          ["Playwright support", "Supported", "First-class, recommended"],
          ["Error detection time", "Runtime (tests fail)", "Compile time (before running)"],
        ],
      },
      {
        type: "heading",
        content: "TypeScript in the Testing Ecosystem",
      },
      {
        type: "table",
        headers: ["Tool", "TS Support", "Notes"],
        rows: [
          ["Playwright", "First-class", "Written in TS; all types ship in the package"],
          ["Jest", "Excellent (via ts-jest)", "Install ts-jest + @types/jest"],
          ["Cypress", "Good", "Include tsconfig; some any-heavy internals"],
          ["Vitest", "Native", "Built on Vite; zero-config TypeScript"],
        ],
      },
      {
        type: "tip",
        content:
          "If you're starting a new Playwright project today, choose TypeScript from the first `npm init playwright@latest` prompt. Retrofitting types into a large JS test suite is far harder than starting typed.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 1 — Installation
  // ─────────────────────────────────────────────
  {
    title: "Installation & Setup",
    blocks: [
      {
        type: "heading",
        content: "Step 1 — Install Node.js LTS",
        difficulty: "🟢 Beginner",
      },
      {
        type: "text",
        content:
          "TypeScript runs on Node.js. Always install the LTS (Long-Term Support) release — it is the most stable version and is what CI/CD environments use. Download from https://nodejs.org and choose the 'LTS' button.",
      },
      {
        type: "steps",
        items: [
          "Windows: download the .msi installer from nodejs.org, run it, leave all defaults, tick 'Add to PATH'",
          "macOS: use Homebrew — `brew install node` — or download the .pkg from nodejs.org",
          "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`",
          "Verify both tools are installed by running the commands below",
        ],
      },
      {
        type: "code",
        language: "bash",
        label: "Verify Node.js and npm",
        content: `# Check Node.js version (should be 18.x or 20.x LTS)
node --version
# Expected: v20.11.0

# Check npm (Node Package Manager) version
npm --version
# Expected: 10.2.4`,
        expected: "v20.11.0\n10.2.4",
      },
      {
        type: "heading",
        content: "Step 2 — Install TypeScript Globally",
      },
      {
        type: "code",
        language: "bash",
        label: "Global TypeScript install",
        content: `# Install TypeScript compiler globally (available everywhere on your machine)
npm install -g typescript

# Verify the TypeScript compiler is installed
tsc --version
# Expected: Version 5.4.5`,
        expected: "Version 5.4.5",
      },
      {
        type: "heading",
        content: "Step 3 — Create tsconfig.json",
      },
      {
        type: "text",
        content:
          "tsconfig.json tells the TypeScript compiler how to compile your project. Every TypeScript project needs one. You can generate a starter with `tsc --init`, or use the annotated template below which is optimised for Playwright.",
      },
      {
        type: "code",
        language: "json",
        label: "tsconfig.json — fully annotated",
        content: `{
  "compilerOptions": {
    // ── Output ──────────────────────────────────
    "target": "ES2022",          // Compile to modern JS (Node 18+ understands this)
    "module": "commonjs",        // Use require() style modules (Node default)
    "outDir": "./dist",          // Compiled .js files go into the dist/ folder
    "rootDir": "./src",          // Where your .ts source files live

    // ── Type Checking ────────────────────────────
    "strict": true,              // Enable ALL strict type checks (recommended)
    "noImplicitAny": true,       // Error on variables that implicitly get type 'any'
    "strictNullChecks": true,    // null and undefined are not assignable to other types
    "noUnusedLocals": true,      // Error on variables declared but never used
    "noUnusedParameters": true,  // Error on function parameters never used

    // ── Module Resolution ────────────────────────
    "moduleResolution": "node",  // Use Node.js module resolution algorithm
    "esModuleInterop": true,     // Allow default imports from CommonJS modules
    "resolveJsonModule": true,   // Allow import of .json files with type safety
    "baseUrl": ".",              // Base path for non-relative imports

    // ── Source Maps ──────────────────────────────
    "sourceMap": true,           // Generate .js.map files for debugging

    // ── Miscellaneous ────────────────────────────
    "lib": ["ES2022"],           // Include built-in type definitions for ES2022
    "skipLibCheck": true,        // Skip type checking of .d.ts files in node_modules
    "forceConsistentCasingInFileNames": true  // Prevent cross-OS import case bugs
  },
  "include": ["src/**/*", "tests/**/*"],   // Which files to compile
  "exclude": ["node_modules", "dist"]       // Which files to skip
}`,
      },
      {
        type: "heading",
        content: "Step 4 — VS Code Extensions",
      },
      {
        type: "list",
        items: [
          {
            label: "TypeScript Language Features",
            desc: "Extension ID: vscode.typescript-language-features — built in to VS Code, provides IntelliSense, go-to-definition, and refactoring.",
          },
          {
            label: "ESLint",
            desc: "Extension ID: dbaeumer.vscode-eslint — lint TypeScript for code quality issues beyond type errors.",
          },
          {
            label: "Prettier",
            desc: "Extension ID: esbenp.prettier-vscode — auto-format TypeScript on save.",
          },
          {
            label: "Playwright Test for VS Code",
            desc: "Extension ID: ms-playwright.playwright — run and debug Playwright tests with a GUI directly inside VS Code.",
          },
        ],
      },
      {
        type: "heading",
        content: "Step 5 — Hello World in TypeScript",
      },
      {
        type: "code",
        language: "typescript",
        label: "index.ts — your first typed program",
        content: `// index.ts
// Typed 'Hello World' — note the explicit type annotations

// A function that takes a name (must be a string) and returns a string
function greet(name: string): string {
  return \`Hello, \${name}! Welcome to TypeScript.\`;
}

// TypeScript catches this before you run it:
// greet(42);  // Error: Argument of type 'number' is not assignable to 'string'

const message: string = greet("QA Engineer");
console.log(message);`,
        expected: "Hello, QA Engineer! Welcome to TypeScript.",
      },
      {
        type: "code",
        language: "bash",
        label: "Compile and run",
        content: `# Step 1: Compile TypeScript to JavaScript
tsc index.ts
# This creates index.js in the same folder

# Step 2: Run the compiled JavaScript
node index.js
# Expected: Hello, QA Engineer! Welcome to TypeScript.`,
        expected: "Hello, QA Engineer! Welcome to TypeScript.",
      },
      {
        type: "heading",
        content: "Step 6 — ts-node: Skip the Compile Step",
      },
      {
        type: "code",
        language: "bash",
        label: "Run TypeScript directly with ts-node",
        content: `# ts-node compiles and runs in one command — great for scripts and debugging
npx ts-node index.ts
# Expected: Hello, QA Engineer! Welcome to TypeScript.

# Install ts-node globally to avoid npx each time
npm install -g ts-node`,
        expected: "Hello, QA Engineer! Welcome to TypeScript.",
      },
      {
        type: "heading",
        content: "Step 7 — Create a Playwright TypeScript Project",
      },
      {
        type: "steps",
        items: [
          "Create a new folder: `mkdir my-playwright-project && cd my-playwright-project`",
          "Run the Playwright installer: `npm init playwright@latest`",
          "Prompt: 'Do you want to use TypeScript or JavaScript?' → Choose: TypeScript",
          "Prompt: 'Where to put your end-to-end tests?' → Accept default: tests",
          "Prompt: 'Add a GitHub Actions workflow?' → Choose: true (recommended)",
          "Prompt: 'Install Playwright browsers?' → Choose: true",
          "Wait for install — Playwright downloads Chromium, Firefox, and WebKit",
          "Run the example test: `npx playwright test`",
          "Open the HTML report: `npx playwright show-report`",
        ],
      },
      {
        type: "code",
        language: "bash",
        label: "Full Playwright TypeScript setup from scratch",
        content: `# 1. Create project folder
mkdir my-playwright-project
cd my-playwright-project

# 2. Initialize Playwright (follow prompts: TypeScript, tests/, yes, yes)
npm init playwright@latest

# 3. Verify project structure was created
ls
# node_modules/   package.json   playwright.config.ts   tests/

# 4. Run the bundled example tests
npx playwright test

# 5. Open the rich HTML report in your browser
npx playwright show-report`,
      },
      {
        type: "tip",
        content:
          "After `npm init playwright@latest`, open `playwright.config.ts` — it is already fully typed. Your tests in `tests/` will be `.spec.ts` files. You get full autocomplete for `page`, `expect`, `browser`, and every Playwright API immediately.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — Foundations 🟢
  // ─────────────────────────────────────────────
  {
    title: "TypeScript Foundations",
    blocks: [
      {
        type: "heading",
        content: "TypeScript vs JavaScript: The Same Bug, Two Outcomes",
        difficulty: "🟢 Beginner",
      },
      {
        type: "code",
        language: "javascript",
        label: "JavaScript — error only visible at runtime",
        content: `// JavaScript: no compile step — this bug runs silently until tests fail
function getTestName(test) {
  return test.name.toUpperCase();   // What if test is null? Runtime crash!
}

getTestName(null);
// Runtime Error: Cannot read properties of null (reading 'name')
// You find this bug only when CI fails at 3 AM`,
        expected: "TypeError: Cannot read properties of null (reading 'name')",
      },
      {
        type: "code",
        language: "typescript",
        label: "TypeScript — error caught before you run",
        content: `// TypeScript: compile-time check catches the bug immediately in your editor
interface Test {
  name: string;   // name is required and must be a string
  id: number;
}

function getTestName(test: Test): string {
  return test.name.toUpperCase();   // Safe: TypeScript guarantees 'name' exists
}

// getTestName(null);
// Compile Error: Argument of type 'null' is not assignable to parameter of type 'Test'
// Your IDE shows a red squiggle — before you even save the file

getTestName({ name: "Login Test", id: 1 });`,
        expected: "LOGIN TEST",
      },
      {
        type: "heading",
        content: "Basic Types",
      },
      {
        type: "code",
        language: "typescript",
        label: "All fundamental TypeScript types with automation context",
        content: `// ── Primitive Types ─────────────────────────────────────────────

let testName: string = "Login flow test";         // text values
let retryCount: number = 3;                        // integers and floats
let headless: boolean = true;                      // true or false
let timeout: number = 30_000;                      // 30000ms — underscore separator for readability

// ── Avoid: any ───────────────────────────────────────────────────
// 'any' disables ALL type checking — it is the escape hatch that defeats the purpose of TypeScript
let dangerous: any = "I could be anything";        // compiler trusts you blindly
dangerous = 42;                                    // no error — types not checked
dangerous.nonExistentMethod();                     // no error at compile time — WILL crash at runtime
// Rule: Never use 'any' in production test code. Use 'unknown' instead if you truly don't know the type.

// ── void ─────────────────────────────────────────────────────────
// Used for functions that don't return a value
async function clickLoginButton(): Promise<void> { // returns nothing — just performs action
  // await page.click('#login');
}

// ── null and undefined ────────────────────────────────────────────
let pageTitle: string | null = null;               // could be a string OR null
let optionalSelector: string | undefined;          // declared but not yet assigned

// ── never ─────────────────────────────────────────────────────────
// A function that ALWAYS throws — it never returns normally
function failTest(message: string): never {
  throw new Error(\`Test failed: \${message}\`);       // always throws, never returns
}

console.log(testName);       // "Login flow test"
console.log(retryCount);     // 3
console.log(headless);       // true`,
        expected: "Login flow test\n3\ntrue",
      },
      {
        type: "heading",
        content: "Type Inference",
      },
      {
        type: "code",
        language: "typescript",
        label: "TypeScript infers types from initial values",
        content: `// Type inference — TypeScript figures out the type from the initial value
let testCount = 5;            // TypeScript infers: number
let suiteName = "Smoke";      // TypeScript infers: string
let isPassing = true;         // TypeScript infers: boolean
let durations = [120, 340];   // TypeScript infers: number[]

// Once inferred, the type is locked — same as explicit annotation
// testCount = "five";         // Error: Type 'string' is not assignable to type 'number'

// Explicit annotation — use when the initial value doesn't carry the right type
let baseUrl: string;          // declared without value — MUST annotate explicitly
baseUrl = "https://staging.example.com";

// Function return type inference
function add(a: number, b: number) {
  return a + b;               // TypeScript infers return type: number
}

const result = add(2, 3);     // result is inferred as: number
console.log(result);`,
        expected: "5",
      },
      {
        type: "heading",
        content: "Arrays",
      },
      {
        type: "code",
        language: "typescript",
        label: "Typed arrays in test automation",
        content: `// Two equivalent syntaxes for typed arrays
const browsers: string[] = ["chromium", "firefox", "webkit"];   // syntax 1
const retries: Array<number> = [1, 2, 3];                       // syntax 2 (generic)

// Arrays are typed — wrong element type is caught at compile time
// browsers.push(42);   // Error: Argument of type 'number' not assignable to 'string'

// Array of objects — typed with an interface
interface TestCase {
  id: number;
  title: string;
  passed: boolean;
}

const testResults: TestCase[] = [
  { id: 1, title: "Login", passed: true },
  { id: 2, title: "Checkout", passed: false },
];

// Iterate with full type safety — IDE knows every property on 'test'
testResults.forEach((test) => {
  console.log(\`\${test.id}: \${test.title} — \${test.passed ? "PASS" : "FAIL"}\`);
});`,
        expected: "1: Login — PASS\n2: Checkout — FAIL",
      },
      {
        type: "heading",
        content: "Tuples",
      },
      {
        type: "code",
        language: "typescript",
        label: "Tuples — fixed-length, mixed-type arrays",
        content: `// A tuple is an array with a FIXED number of elements and FIXED types at each position
// Use case 1: CSV row (column values in known order)
type CsvRow = [string, number, boolean];   // name, score, passed
const row: CsvRow = ["Test Login", 95, true];

// Use case 2: test data pair — input and expected output
type TestPair = [string, string];           // [input, expectedOutput]
const loginPair: TestPair = ["admin@test.com", "Dashboard"];

// Use case 3: coordinate-style — environment + URL
type EnvConfig = [string, string, number]; // [envName, baseUrl, port]
const staging: EnvConfig = ["staging", "https://staging.myapp.com", 443];

// Destructuring tuples — name each position for readability
const [envName, baseUrl, port] = staging;
console.log(\`Environment: \${envName}\`);  // Environment: staging
console.log(\`URL: \${baseUrl}:\${port}\`);  // URL: https://staging.myapp.com:443`,
        expected: "Environment: staging\nURL: https://staging.myapp.com:443",
      },
      {
        type: "heading",
        content: "Enums — String Enums Are Best for Tests",
      },
      {
        type: "code",
        language: "typescript",
        label: "String enums vs number enums — why string enums win in testing",
        content: `// ── Number Enum (avoid in tests) ─────────────────────────────────
enum StatusNum {
  PASS,   // 0
  FAIL,   // 1
  SKIP,   // 2
}
console.log(StatusNum.PASS);   // 0  — meaningless in test logs and reports

// ── String Enum (prefer in tests) ─────────────────────────────────
// String enums produce human-readable output in logs, reports, and error messages
enum TestStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  SKIP = "SKIP",
  BLOCKED = "BLOCKED",
}

enum Browser {
  CHROMIUM = "chromium",
  FIREFOX = "firefox",
  WEBKIT = "webkit",
}

enum Environment {
  DEV = "development",
  STAGING = "staging",
  PROD = "production",
}

// Usage — these read clearly in test output
const result: TestStatus = TestStatus.PASS;
const env: Environment = Environment.STAGING;

console.log(\`Status: \${result}\`);    // Status: PASS   (readable!)
console.log(\`Env: \${env}\`);          // Env: staging   (readable!)

// Enum as parameter type — prevents typos
function runTests(browser: Browser): void {
  console.log(\`Running on \${browser}\`);
}
runTests(Browser.CHROMIUM);          // Running on chromium
// runTests("chrome");               // Error! 'chrome' is not assignable to type 'Browser'`,
        expected: "Status: PASS\nEnv: staging\nRunning on chromium",
      },
      {
        type: "heading",
        content: "Interfaces",
      },
      {
        type: "code",
        language: "typescript",
        label: "Interfaces — defining shapes for test data and page objects",
        content: `// An interface defines the SHAPE of an object — what properties it must have
interface User {
  id: number;           // required — every User must have an id
  email: string;        // required
  password: string;     // required
  role?: string;        // optional — the '?' means it might not exist
  readonly token: string; // readonly — can be set once, never mutated
}

// Using the interface — TypeScript validates the object matches the shape
const testUser: User = {
  id: 1,
  email: "admin@example.com",
  password: "Secret123",
  token: "abc-xyz-789",
  // role is optional — fine to omit
};

// testUser.token = "new-token";  // Error: Cannot assign to 'token' — it is read-only

// Interfaces can extend other interfaces (inheritance)
interface AdminUser extends User {
  permissions: string[];   // AdminUser has everything User has, plus permissions
  department: string;
}

const admin: AdminUser = {
  id: 2,
  email: "admin@corp.com",
  password: "Admin456",
  token: "admin-token",
  permissions: ["read", "write", "delete"],
  department: "QA",
};

console.log(\`User: \${testUser.email}\`);
console.log(\`Admin dept: \${admin.department}\`);`,
        expected: "User: admin@example.com\nAdmin dept: QA",
      },
      {
        type: "heading",
        content: "Type Aliases vs Interfaces",
      },
      {
        type: "code",
        language: "typescript",
        label: "type vs interface — when to use which",
        content: `// ── Type Alias ─────────────────────────────────────────────────────
// 'type' is more flexible — supports unions, intersections, tuples, primitives
type TestId = string | number;             // union — can be either
type Coordinates = [number, number];        // tuple
type Status = "pass" | "fail" | "skip";    // string literal union

// 'type' cannot be reopened / merged
type Config = { baseUrl: string };
// type Config = { timeout: number };       // Error: Duplicate identifier 'Config'

// ── Interface ───────────────────────────────────────────────────────
// 'interface' supports declaration merging — reopen and add properties
interface TestConfig {
  baseUrl: string;
}
interface TestConfig {
  timeout: number;   // Merged! TestConfig now has BOTH baseUrl AND timeout
}
const config: TestConfig = { baseUrl: "https://example.com", timeout: 30000 };

// ── Rule of Thumb ────────────────────────────────────────────────────
// Use 'interface' for: object shapes, class contracts, public API types
// Use 'type' for: unions, intersections, primitives, tuples, computed types

type BrowserName = "chromium" | "firefox" | "webkit";   // literal union — use type
interface PageObject {                                    // class shape — use interface
  navigate(url: string): Promise<void>;
}

console.log(config.baseUrl);    // https://example.com
console.log(config.timeout);    // 30000`,
        expected: "https://example.com\n30000",
      },
      {
        type: "heading",
        content: "Interactive Example: TestResult Interface + TestCase Enum",
      },
      {
        type: "code",
        language: "typescript",
        label: "Full typed test result object",
        content: `// Putting it all together — enum + interface + typed array

// Enum for test case status (string values for readable output)
enum TestStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  SKIP = "SKIP",
}

// Interface defining the shape of a test result
interface TestResult {
  readonly id: number;        // immutable after creation
  title: string;              // test case title
  status: TestStatus;         // must be one of the enum values
  duration: number;           // execution time in ms
  errorMessage?: string;      // optional — only present when status is FAIL
}

// Create strongly typed test results
const results: TestResult[] = [
  { id: 1, title: "Login with valid credentials", status: TestStatus.PASS, duration: 1240 },
  { id: 2, title: "Login with invalid password",  status: TestStatus.FAIL, duration: 890, errorMessage: "Expected URL /dashboard, got /login" },
  { id: 3, title: "Register new user",            status: TestStatus.SKIP, duration: 0 },
];

// Type-safe iteration — IDE knows every field
results.forEach((r) => {
  const err = r.errorMessage ? \` — \${r.errorMessage}\` : "";
  console.log(\`[\${r.status}] \${r.title} (\${r.duration}ms)\${err}\`);
});`,
        expected:
          "[PASS] Login with valid credentials (1240ms)\n[FAIL] Login with invalid password (890ms) — Expected URL /dashboard, got /login\n[SKIP] Register new user (0ms)",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 3 — Intermediate 🟡
  // ─────────────────────────────────────────────
  {
    title: "Intermediate TypeScript",
    blocks: [
      {
        type: "heading",
        content: "Typed Functions",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "code",
        language: "typescript",
        label: "Function type annotations — params, return type, optional, default",
        content: `// ── Basic typed function ─────────────────────────────────────────
function navigateTo(url: string): Promise<void> {   // param type, return type
  console.log(\`Navigating to: \${url}\`);
  return Promise.resolve();
}

// ── Optional parameter (?) ────────────────────────────────────────
function login(email: string, password: string, remember?: boolean): void {
  const rememberMe = remember ?? false;   // use ?? to handle undefined
  console.log(\`Login: \${email}, remember: \${rememberMe}\`);
}
login("user@test.com", "pass");           // 'remember' is undefined — OK
login("user@test.com", "pass", true);     // 'remember' is true

// ── Default parameter ─────────────────────────────────────────────
function retry(action: () => Promise<void>, times: number = 3): void {
  console.log(\`Will retry up to \${times} times\`);
}
retry(async () => {});          // uses default 3
retry(async () => {}, 5);       // overrides to 5

// ── Arrow function with types ─────────────────────────────────────
const getTitle = async (url: string): Promise<string> => {
  return \`Page title for \${url}\`;
};

// ── Function type as a variable type ─────────────────────────────
type TestStep = (page: string) => Promise<void>;   // describes a function shape
const clickLogin: TestStep = async (page) => {
  console.log(\`Clicking login on \${page}\`);
};

login("user@test.com", "pass");`,
        expected: "Login: user@test.com, remember: false",
      },
      {
        type: "heading",
        content: "Union and Intersection Types",
      },
      {
        type: "code",
        language: "typescript",
        label: "Union (|) and intersection (&) types",
        content: `// ── Union Types — value can be ONE of several types ──────────────
type TestId = string | number;            // can be "TC-001" or 1
type Status = "pass" | "fail" | "skip";   // literal string union
type MaybeString = string | null;         // string or null

function formatId(id: TestId): string {
  // Union forces you to handle both cases
  if (typeof id === "number") {
    return \`TC-\${id.toString().padStart(3, "0")}\`;  // TC-001
  }
  return id;   // already a string
}

console.log(formatId(1));       // TC-001
console.log(formatId("TC-99")); // TC-99

// ── Intersection Types — value must satisfy ALL types simultaneously ──
interface HasId    { id: number }
interface HasTitle { title: string }
interface HasStatus { status: Status }

// TestCase must have id AND title AND status
type TestCase = HasId & HasTitle & HasStatus;

const tc: TestCase = { id: 1, title: "Checkout flow", status: "pass" };
console.log(\`\${tc.id}: \${tc.title} [\${tc.status}]\`);  // 1: Checkout flow [pass]

// ── Nullable types in function return ──────────────────────────────
function findTest(id: number, tests: TestCase[]): TestCase | null {
  return tests.find(t => t.id === id) ?? null;   // null if not found
}`,
        expected: "TC-001\nTC-99\n1: Checkout flow [pass]",
      },
      {
        type: "heading",
        content: "Type Guards",
      },
      {
        type: "code",
        language: "typescript",
        label: "typeof, instanceof, and 'in' type guards",
        content: `// Type guards narrow a union type to a specific type inside a branch

// ── typeof guard — for primitives ────────────────────────────────
function printTestId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());   // TypeScript knows: id is string here
  } else {
    console.log(id.toFixed(0));      // TypeScript knows: id is number here
  }
}
printTestId("tc-001");   // TC-001
printTestId(42);         // 42

// ── instanceof guard — for class instances ─────────────────────────
class NetworkError extends Error {
  statusCode: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.statusCode = code;
  }
}
class TimeoutError extends Error {
  timeoutMs: number;
  constructor(msg: string, ms: number) {
    super(msg);
    this.timeoutMs = ms;
  }
}

function handleTestError(err: NetworkError | TimeoutError): void {
  if (err instanceof NetworkError) {
    console.log(\`Network error \${err.statusCode}: \${err.message}\`);
  } else {
    console.log(\`Timeout after \${err.timeoutMs}ms: \${err.message}\`);
  }
}

handleTestError(new NetworkError("Not Found", 404));   // Network error 404: Not Found

// ── 'in' guard — check if property exists ─────────────────────────
interface UITest   { selector: string; page: string }
interface ApiTest  { endpoint: string; method: string }

function describeTest(test: UITest | ApiTest): void {
  if ("selector" in test) {
    console.log(\`UI test: \${test.selector} on \${test.page}\`);
  } else {
    console.log(\`API test: \${test.method} \${test.endpoint}\`);
  }
}`,
        expected: "TC-001\n42\nNetwork error 404: Not Found",
      },
      {
        type: "heading",
        content: "Generics",
      },
      {
        type: "code",
        language: "typescript",
        label: "Generic functions and interfaces for reusable test utilities",
        content: `// Generics let you write ONE function/interface that works with ANY type
// while preserving full type information (unlike 'any' which throws it away)

// ── Generic function ───────────────────────────────────────────────
function first<T>(items: T[]): T | undefined {
  return items[0];   // T is preserved — return type matches input element type
}

const firstBrowser = first(["chromium", "firefox"]);   // inferred: string | undefined
const firstId      = first([1, 2, 3]);                  // inferred: number | undefined

// ── Generic interface ──────────────────────────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  timestamp: string;
}

interface UserData { id: number; name: string; email: string }
const userResponse: ApiResponse<UserData> = {
  data: { id: 1, name: "Alice", email: "alice@test.com" },
  status: 200,
  ok: true,
  timestamp: "2024-01-01T00:00:00Z",
};

console.log(userResponse.data.name);   // Alice — typed correctly

// ── Generic constraints (T extends ...) ────────────────────────────
// Constrain T so we know it has at least the properties we need
interface HasId { id: number }

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const found = findById(users, 1);
console.log(found?.name);   // Alice`,
        expected: "Alice\nAlice",
      },
      {
        type: "heading",
        content: "Classes with Access Modifiers",
      },
      {
        type: "code",
        language: "typescript",
        label: "TypeScript class modifiers in a Page Object context",
        content: `// Access modifiers control visibility:
// public    — accessible anywhere (default)
// private   — only accessible inside this class
// protected — accessible inside this class and subclasses
// readonly  — can be set in constructor, never changed after

class BasePage {
  protected readonly baseUrl: string;    // subclasses can read it, no one can change it
  private _isLoaded: boolean = false;    // internal state — no outside access
  public readonly name: string;          // public + readonly — visible, immutable

  constructor(baseUrl: string, name: string) {
    this.baseUrl = baseUrl;   // set in constructor — readonly allows this
    this.name = name;
  }

  // private method — only this class can call it
  private log(message: string): void {
    console.log(\`[\${this.name}] \${message}\`);
  }

  // protected method — this class and subclasses can call it
  protected async waitForLoad(): Promise<void> {
    this._isLoaded = true;
    this.log("Page loaded");
  }

  // public method — anyone can call it
  public async navigate(): Promise<void> {
    this.log(\`Navigating to \${this.baseUrl}\`);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  constructor(baseUrl: string) {
    super(baseUrl, "LoginPage");
  }

  async login(email: string, password: string): Promise<void> {
    console.log(\`Logging in as \${email}\`);
    await this.waitForLoad();    // protected — OK from subclass
    // this._isLoaded;           // Error — private, not accessible here
    // this.log("test");         // Error — private, not accessible here
  }
}

const page = new LoginPage("https://example.com");
page.navigate();
// page._isLoaded;               // Error — private
// page.waitForLoad();           // Error — protected`,
        expected: "[LoginPage] Navigating to https://example.com\n[LoginPage] Page loaded",
      },
      {
        type: "heading",
        content: "Abstract Classes — Base POM Pattern",
      },
      {
        type: "code",
        language: "typescript",
        label: "Abstract class as reusable Page Object base",
        content: `// Abstract classes define shared structure but CANNOT be instantiated directly
// Perfect for Page Object base classes — every page shares navigate() but implements getTitle() differently

abstract class PageBase {
  constructor(protected readonly url: string) {}

  // Concrete method — shared by all pages
  async navigate(): Promise<void> {
    console.log(\`Navigating to: \${this.url}\`);
  }

  // Abstract method — each subclass MUST implement this
  abstract getTitle(): string;

  // Abstract method — each page has a different heading selector
  abstract getHeadingSelector(): string;
}

class HomePage extends PageBase {
  constructor() {
    super("/");
  }

  getTitle(): string {
    return "Home — My App";   // must implement — or TypeScript compile error
  }

  getHeadingSelector(): string {
    return "h1.hero-title";
  }
}

class LoginPage2 extends PageBase {
  constructor() {
    super("/login");
  }

  getTitle(): string {
    return "Login — My App";
  }

  getHeadingSelector(): string {
    return "h1.login-heading";
  }
}

// const base = new PageBase("/");   // Error: Cannot create an instance of an abstract class
const home = new HomePage();
console.log(home.getTitle());          // Home — My App
console.log(home.getHeadingSelector()); // h1.hero-title`,
        expected: "Home — My App\nh1.hero-title",
      },
      {
        type: "heading",
        content: "Modules: Export, Import, and Barrel Files",
      },
      {
        type: "code",
        language: "typescript",
        label: "Module patterns for Playwright test projects",
        content: `// ── Named exports (pages/LoginPage.ts) ──────────────────────────────
export interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginPage {
  async login(creds: LoginCredentials): Promise<void> {
    console.log(\`Logging in: \${creds.email}\`);
  }
}

// ── Default export (pages/HomePage.ts) ───────────────────────────────
// export default class HomePage { ... }

// ── Re-exports / Barrel file (pages/index.ts) ────────────────────────
// A barrel file re-exports everything so callers import from one place:
// export { LoginPage, LoginCredentials } from './LoginPage';
// export { default as HomePage } from './HomePage';
// export { ProductPage } from './ProductPage';

// ── Importing ────────────────────────────────────────────────────────
// import { LoginPage, LoginCredentials } from './pages';     // from barrel
// import { LoginPage } from './pages/LoginPage';             // direct
// import type { LoginCredentials } from './pages/LoginPage'; // type-only import (no runtime code)

const creds: LoginCredentials = { email: "qa@test.com", password: "Pass123" };
const login = new LoginPage();
login.login(creds);`,
        expected: "Logging in: qa@test.com",
      },
      {
        type: "heading",
        content: "Interactive Example: Typed Page Object with Interface",
      },
      {
        type: "code",
        language: "typescript",
        label: "Full typed Page Object base class",
        content: `// A production-ready, fully typed Page Object base class

interface IPage {
  navigate(): Promise<void>;
  isLoaded(): Promise<boolean>;
}

class TypedPageBase implements IPage {
  // private: internal locator strings — only this class accesses them
  private readonly loadedSelector: string;

  // constructor shorthand: 'protected' creates + assigns in one line
  constructor(
    protected readonly baseUrl: string,
    protected readonly path: string,
    loadedSelector: string
  ) {
    this.loadedSelector = loadedSelector;
  }

  // Satisfies IPage contract
  async navigate(): Promise<void> {
    const fullUrl = \`\${this.baseUrl}\${this.path}\`;
    console.log(\`→ Navigate to: \${fullUrl}\`);
  }

  // Satisfies IPage contract
  async isLoaded(): Promise<boolean> {
    console.log(\`→ Checking selector: \${this.loadedSelector}\`);
    return true;   // would be: await page.locator(this.loadedSelector).isVisible()
  }

  // Reusable helper for all pages
  protected async waitAndVerify(): Promise<void> {
    const loaded = await this.isLoaded();
    if (!loaded) throw new Error(\`Page not loaded: \${this.path}\`);
    console.log(\`→ Page verified: \${this.path}\`);
  }
}

class CheckoutPage extends TypedPageBase {
  constructor(baseUrl: string) {
    super(baseUrl, "/checkout", "h1.checkout-title");
  }

  async fillShippingForm(name: string, address: string): Promise<void> {
    console.log(\`→ Filling shipping: \${name}, \${address}\`);
    await this.waitAndVerify();
  }
}

const checkout = new CheckoutPage("https://staging.example.com");
checkout.navigate();
checkout.fillShippingForm("Alice", "123 Main St");`,
        expected:
          "→ Navigate to: https://staging.example.com/checkout\n→ Filling shipping: Alice, 123 Main St\n→ Checking selector: h1.checkout-title\n→ Page verified: /checkout",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 4 — Advanced 🔴
  // ─────────────────────────────────────────────
  {
    title: "Advanced TypeScript",
    blocks: [
      {
        type: "heading",
        content: "Utility Types",
        difficulty: "🔴 Advanced",
      },
      {
        type: "code",
        language: "typescript",
        label: "Built-in utility types for test automation patterns",
        content: `// TypeScript ships utility types that transform existing types
// — these are the most useful ones for test automation

interface TestConfig {
  baseUrl: string;
  timeout: number;
  headless: boolean;
  retries: number;
  reporter: string;
}

// Partial<T> — all properties become optional (great for config overrides)
type PartialConfig = Partial<TestConfig>;
const devOverride: PartialConfig = { headless: false };   // only override what you need

// Required<T> — all optional properties become required
interface MaybeUser { name?: string; email?: string }
type FullUser = Required<MaybeUser>;   // name and email are now required

// Pick<T, K> — pick only specific properties
type NetworkConfig = Pick<TestConfig, "baseUrl" | "timeout">;
const net: NetworkConfig = { baseUrl: "https://api.example.com", timeout: 5000 };

// Omit<T, K> — remove specific properties
type ConfigWithoutRetries = Omit<TestConfig, "retries" | "reporter">;

// Record<K, V> — typed key-value map
type BrowserTimeouts = Record<string, number>;
const timeouts: BrowserTimeouts = { chromium: 30000, firefox: 45000, webkit: 30000 };

// Readonly<T> — all properties become readonly (immutable)
type FrozenConfig = Readonly<TestConfig>;
const cfg: FrozenConfig = { baseUrl: "https://prod.com", timeout: 30000, headless: true, retries: 2, reporter: "html" };
// cfg.baseUrl = "changed";   // Error: Cannot assign to 'baseUrl' — it is read-only

// ReturnType<F> — extract the return type of a function
async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}
type UserResult = Awaited<ReturnType<typeof fetchUser>>;   // { id: number; name: string }

// Parameters<F> — extract the parameter types of a function
function createTest(title: string, tags: string[], timeout: number): void {}
type CreateTestParams = Parameters<typeof createTest>;     // [string, string[], number]

console.log(net.baseUrl);   // https://api.example.com`,
        expected: "https://api.example.com",
      },
      {
        type: "heading",
        content: "Conditional Types",
      },
      {
        type: "code",
        language: "typescript",
        label: "Conditional types — T extends U ? X : Y",
        content: `// Conditional types let you choose a type based on a condition
// Syntax: T extends U ? TrueType : FalseType

// ── Basic conditional type ────────────────────────────────────────
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<string>;   // "yes"
type B = IsString<number>;   // "no"

// ── NonNullable — built-in utility built with conditional types ───
type NonNullableT<T> = T extends null | undefined ? never : T;
type SafeString = NonNullableT<string | null>;   // string (null removed)

// ── Practical: IsAsync — detect if a function returns a Promise ──
type IsAsync<T> = T extends (...args: any[]) => Promise<any> ? true : false;
type CheckNav   = IsAsync<(url: string) => Promise<void>>;   // true
type CheckSync  = IsAsync<(x: number) => number>;             // false

// ── Unwrap a Promise type ────────────────────────────────────────
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type StringResult = Unwrap<Promise<string>>;   // string
type NumberResult = Unwrap<number>;             // number (not a promise — passthrough)

// ── TestResponse — conditional return based on input ─────────────
type ApiResult<T, E extends boolean = false> =
  E extends true
    ? { error: string; data: null }
    : { error: null; data: T };

type SuccessResult = ApiResult<{ id: number }, false>;   // { error: null; data: { id: number } }
type ErrorResult   = ApiResult<never, true>;              // { error: string; data: null }

const ok: SuccessResult  = { error: null, data: { id: 1 } };
const err: ErrorResult   = { error: "Not Found", data: null };
console.log(ok.data.id);    // 1
console.log(err.error);     // Not Found`,
        expected: "1\nNot Found",
      },
      {
        type: "heading",
        content: "Mapped Types",
      },
      {
        type: "code",
        language: "typescript",
        label: "Mapped types — transform every property of a type",
        content: `// Mapped types iterate over the keys of a type and produce a new type
// Syntax: { [K in keyof T]: NewType }

interface TestCase {
  title: string;
  timeout: number;
  tags: string[];
}

// Make every property a string (e.g. for serialization)
type Stringified<T> = { [K in keyof T]: string };
type StringTestCase = Stringified<TestCase>;
// Result: { title: string; timeout: string; tags: string; }

// Add readonly to every property
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] };
type ReadonlyTestCase = DeepReadonly<TestCase>;

// Make every property optional (same as built-in Partial<T>)
type Optional<T> = { [K in keyof T]?: T[K] };

// Make every property nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableTestCase = Nullable<TestCase>;

// ── Practical: form field validation types ────────────────────────
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Map each field to its validation error (string) or null (no error)
type FormErrors<T> = { [K in keyof T]: string | null };
type LoginErrors = FormErrors<LoginForm>;

const errors: LoginErrors = {
  email: "Invalid email format",
  password: null,               // no error
  rememberMe: null,
};

console.log(errors.email);      // Invalid email format
console.log(errors.password);   // null`,
        expected: "Invalid email format\nnull",
      },
      {
        type: "heading",
        content: "Template Literal Types",
      },
      {
        type: "code",
        language: "typescript",
        label: "Template literal types for typed string patterns",
        content: `// Template literal types use backtick syntax to build string types from other types
// They are like template literals but at the TYPE level

// ── Basic template literal type ───────────────────────────────────
type EventName = \`on\${string}\`;   // must start with "on"
const click: EventName = "onClick";
const hover: EventName = "onHover";
// const bad: EventName = "click";   // Error: "click" doesn't start with "on"

// ── Combining string literal unions ───────────────────────────────
type Action   = "click" | "fill" | "check";
type Target   = "Button" | "Input" | "Checkbox";
type StepName = \`\${Action}\${Target}\`;
// StepName = "clickButton" | "clickInput" | "clickCheckbox" | "fillButton" | ...

// ── API route typing ──────────────────────────────────────────────
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiPath    = \`/api/\${string}\`;
type ApiRoute   = \`\${HttpMethod} \${ApiPath}\`;

const route: ApiRoute = "GET /api/users";
// const bad2: ApiRoute = "PATCH /api/users";  // Error: PATCH not in HttpMethod

// ── CSS selector validation ────────────────────────────────────────
type DataTestId  = \`[data-testid="\${string}"]\`;
const sel: DataTestId = '[data-testid="login-button"]';

// ── Environment-aware URL builder ─────────────────────────────────
type Env      = "dev" | "staging" | "prod";
type BaseUrl  = \`https://\${Env}.myapp.com\`;
const staging: BaseUrl = "https://staging.myapp.com";

console.log(route);    // GET /api/users
console.log(sel);      // [data-testid="login-button"]
console.log(staging);  // https://staging.myapp.com`,
        expected: "GET /api/users\n[data-testid=\"login-button\"]\nhttps://staging.myapp.com",
      },
      {
        type: "heading",
        content: "Type Assertions and Non-Null Assertion",
      },
      {
        type: "code",
        language: "typescript",
        label: "as, non-null assertion (!), and when to use each",
        content: `// ── Type assertion with 'as' ─────────────────────────────────────
// You tell TypeScript "trust me, I know this is type X"
// Use when: you have info the compiler doesn't (e.g. API response)

const rawResponse: unknown = { id: 1, name: "Alice", email: "alice@test.com" };
interface UserRecord { id: number; name: string; email: string }

const user = rawResponse as UserRecord;   // assert the shape
console.log(user.name);   // Alice — TypeScript trusts the assertion

// ── Double assertion for incompatible types ────────────────────────
// When TS won't accept a direct assertion: first assert to 'unknown'
// const x = someValue as unknown as TargetType;

// ── Non-null assertion operator (!) ────────────────────────────────
// Tells TypeScript "this value is NOT null/undefined — trust me"
// Use sparingly — it disables null safety for that expression

function getElementText(selector: string): string | null {
  // In tests, locators can return null if element not found
  return selector ? "Login" : null;
}

const text1 = getElementText("#btn");     // type: string | null
const text2 = getElementText("#btn")!;    // type: string  (non-null asserted)

// !! DANGER: if the value IS null/undefined, you get a runtime crash
// Only use (!) when you have VERIFIED the value is not null at this point

// ── Safer alternative: optional chaining + nullish coalescing ─────
const safe = getElementText("#btn")?.toUpperCase() ?? "NOT FOUND";
console.log(safe);   // LOGIN

// ── satisfies operator (TS 4.9+) ─────────────────────────────────
// Validates type without widening — best of both worlds
const config = {
  baseUrl: "https://example.com",
  timeout: 30000,
} satisfies { baseUrl: string; timeout: number };
// config.baseUrl is still typed as string literal (not widened to string)`,
        expected: "Alice\nLOGIN",
      },
      {
        type: "heading",
        content: "Declaration Files (.d.ts) and Module Augmentation",
      },
      {
        type: "code",
        language: "typescript",
        label: ".d.ts files and augmenting Playwright types",
        content: `// .d.ts files contain ONLY type information — no runtime code
// Purpose: add types for JavaScript libraries that have no types built in
// OR extend existing types from third-party packages

// ── Example: augmenting Playwright's test fixtures ────────────────
// In a file like: src/types/playwright.d.ts

// import { Page } from '@playwright/test';
//
// declare module '@playwright/test' {
//   interface TestFixtures {
//     // Add custom fixture types — now available in every test file
//     loginPage: import('../pages/LoginPage').LoginPage;
//     testUser: { email: string; password: string; role: string };
//   }
// }

// ── Example: global type augmentation ─────────────────────────────
// In src/types/global.d.ts:
//
// declare global {
//   // Add a global type available without importing
//   interface Window {
//     __testMode: boolean;    // custom window property for test helpers
//   }
// }

// ── Why .d.ts matters for automation ──────────────────────────────
// When you install: npm install some-js-lib
// And TS complains: "Could not find a declaration file for module 'some-js-lib'"
// Solution: npm install @types/some-js-lib  (the DefinitelyTyped types package)

// You'll often install these for Playwright projects:
// npm install -D @types/node              // Node.js built-in types (fs, path, etc.)
// @playwright/test includes its own types — no separate install needed

console.log("Declaration files provide types — no runtime output");`,
        expected: "Declaration files provide types — no runtime output",
      },
      {
        type: "heading",
        content: "Advanced Generics: Multiple Type Params and Defaults",
      },
      {
        type: "code",
        language: "typescript",
        label: "Multiple generic parameters with defaults",
        content: `// Multiple type parameters — like multiple generic slots
interface Repository<T, ID = number> {   // ID defaults to number
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}

interface Product { id: number; name: string; price: number }
interface TestRun { id: string; status: string; startedAt: Date }   // string ID

// Both satisfy Repository with different type params
// class ProductRepo implements Repository<Product> { ... }
// class TestRunRepo implements Repository<TestRun, string> { ... }

// ── Generic with multiple constraints ─────────────────────────────
interface HasId    { id: number }
interface HasTitle { title: string }

// T must have BOTH id AND title
function logItem<T extends HasId & HasTitle>(item: T): void {
  console.log(\`[#\${item.id}] \${item.title}\`);
}

logItem({ id: 1, title: "Login test", status: "pass" });  // extra props OK

// ── Conditional generic return type ────────────────────────────────
function parse<T>(json: string): T {
  return JSON.parse(json) as T;   // cast after parsing
}

interface ApiUser { id: number; name: string }
const parsed = parse<ApiUser>('{"id":1,"name":"Alice"}');
console.log(parsed.name);   // Alice — typed correctly`,
        expected: "[#1] Login test\nAlice",
      },
      {
        type: "heading",
        content: "Interactive Example: Generic ApiResponse<T> and Test Data Factory",
      },
      {
        type: "code",
        language: "typescript",
        label: "Generic API response wrapper + typed test data factory",
        content: `// ── Generic API response wrapper ──────────────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  error: string | null;
  timestamp: string;
}

// Factory function — create properly typed API response objects
function createApiResponse<T>(data: T, status: number): ApiResponse<T> {
  return {
    data,
    status,
    ok: status >= 200 && status < 300,
    error: status >= 400 ? \`HTTP \${status}\` : null,
    timestamp: new Date().toISOString(),
  };
}

interface UserApiData { id: number; name: string; email: string }
const userResp = createApiResponse<UserApiData>(
  { id: 1, name: "Alice", email: "alice@test.com" },
  200
);
console.log(\`OK: \${userResp.ok}, User: \${userResp.data.name}\`);   // OK: true, User: Alice

// ── Generic test data factory ──────────────────────────────────────
function createTestData<T>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...overrides };   // spread: overrides win over defaults
}

interface TestUser {
  id: number;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const defaultUser: TestUser = {
  id: 1,
  email: "test@example.com",
  password: "TestPass123",
  role: "viewer",
  isActive: true,
};

// Create variations without repeating the full object
const adminUser = createTestData(defaultUser, { role: "admin", id: 99 });
const inactiveUser = createTestData(defaultUser, { isActive: false, email: "inactive@test.com" });

console.log(\`Admin role: \${adminUser.role}, id: \${adminUser.id}\`);
console.log(\`Inactive: \${inactiveUser.isActive}, email: \${inactiveUser.email}\`);`,
        expected:
          "OK: true, User: Alice\nAdmin role: admin, id: 99\nInactive: false, email: inactive@test.com",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 5 — QA Use Cases 🧪
  // ─────────────────────────────────────────────
  {
    title: "QA Use Cases",
    blocks: [
      {
        type: "heading",
        content: "1. Fully Typed Page Object Model",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "code",
        language: "typescript",
        label: "Production-ready TypeScript POM class",
        content: `// pages/LoginPage.ts
// Full TypeScript Page Object Model using Playwright types

import { type Page, type Locator } from "@playwright/test";

// Interface defines the public contract — what callers can do with this page
export interface ILoginPage {
  navigate(): Promise<void>;
  login(email: string, password: string): Promise<void>;
  getErrorMessage(): Promise<string>;
  isLoggedIn(): Promise<boolean>;
}

export class LoginPage implements ILoginPage {
  // private Locators — callers cannot access selectors directly
  // Using Playwright's 'Locator' type for full IDE support
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;
  private readonly userMenu: Locator;

  // Page is injected — dependency injection pattern
  constructor(private readonly page: Page) {
    // Define all locators in the constructor (fail fast if selectors change)
    this.emailInput     = page.locator('[data-testid="email-input"]');
    this.passwordInput  = page.locator('[data-testid="password-input"]');
    this.submitButton   = page.locator('[data-testid="login-submit"]');
    this.errorMessage   = page.locator('[data-testid="error-message"]');
    this.userMenu       = page.locator('[data-testid="user-menu"]');
  }

  // Typed method — returns Promise<void> (performs action, returns nothing)
  async navigate(): Promise<void> {
    await this.page.goto("/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Typed params — TypeScript catches if caller passes wrong types
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Returns a string — caller knows they'll always get a string back
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: "visible" });
    return await this.errorMessage.innerText();
  }

  // Returns boolean — clean API for assertions
  async isLoggedIn(): Promise<boolean> {
    return await this.userMenu.isVisible();
  }
}

// Usage in test:
// test("login with valid credentials", async ({ page }) => {
//   const loginPage = new LoginPage(page);   // page is typed as Page
//   await loginPage.navigate();
//   await loginPage.login("user@test.com", "pass123");
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });`,
      },
      {
        type: "heading",
        content: "2. Enums for Environments, Browsers, and Test Status",
        difficulty: "🟢 Beginner",
      },
      {
        type: "code",
        language: "typescript",
        label: "String enums for type-safe configuration",
        content: `// enums/index.ts
// String enums for every configuration choice — prevents typos and invalid values

export enum TestStatus {
  PASS    = "PASS",
  FAIL    = "FAIL",
  SKIP    = "SKIP",
  BLOCKED = "BLOCKED",
  FLAKY   = "FLAKY",
}

export enum Environment {
  DEV     = "development",
  STAGING = "staging",
  PROD    = "production",
}

export enum Browser {
  CHROMIUM = "chromium",
  FIREFOX  = "firefox",
  WEBKIT   = "webkit",
}

export enum LogLevel {
  DEBUG   = "debug",
  INFO    = "info",
  WARN    = "warn",
  ERROR   = "error",
}

// Config interface uses the enums — values are constrained
interface RunConfig {
  environment: Environment;
  browser: Browser;
  logLevel: LogLevel;
  workers: number;
}

const config: RunConfig = {
  environment: Environment.STAGING,   // must be a valid Environment
  browser: Browser.CHROMIUM,          // must be a valid Browser
  logLevel: LogLevel.INFO,
  workers: 4,
};

// config.browser = "chrome";          // Error: 'chrome' is not assignable to type 'Browser'
// config.environment = "staging";     // Error: use Environment.STAGING

console.log(\`Running \${config.browser} on \${config.environment}\`);
// Running chromium on staging`,
        expected: "Running chromium on staging",
      },
      {
        type: "heading",
        content: "3. Interface for API Response Validation",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "code",
        language: "typescript",
        label: "Type-safe API response interface with validation function",
        content: `// types/api.ts
// Typed interfaces for API testing with runtime validation

// The shape we expect from the API
interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer" | "editor";
  createdAt: string;
}

// Generic API wrapper — wraps any response data
interface ApiEnvelope<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
  errors: string[] | null;
}

// Runtime type guard — validates that an unknown response matches UserResponse
// Returns type predicate: 'value is UserResponse'
function isUserResponse(value: unknown): value is UserResponse {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id         === "number"   &&
    typeof obj.name       === "string"   &&
    typeof obj.email      === "string"   &&
    typeof obj.role       === "string"   &&
    ["admin", "viewer", "editor"].includes(obj.role as string) &&
    typeof obj.createdAt  === "string"
  );
}

// Usage in a test
async function fetchAndValidateUser(userId: number): Promise<UserResponse> {
  // const response = await fetch(\`/api/users/\${userId}\`);
  // const json: unknown = await response.json();

  const json: unknown = {            // simulate API response
    id: userId,
    name: "Alice",
    email: "alice@test.com",
    role: "admin",
    createdAt: "2024-01-01",
  };

  if (!isUserResponse(json)) {
    throw new Error(\`API response does not match UserResponse shape\`);
  }

  // After the guard, TypeScript knows 'json' is UserResponse
  return json;
}

fetchAndValidateUser(1).then((u) => {
  console.log(\`Validated user: \${u.name} (\${u.role})\`);
});`,
        expected: "Validated user: Alice (admin)",
      },
      {
        type: "heading",
        content: "4. Generic Test Data Factory",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "code",
        language: "typescript",
        label: "Generic factory for creating test fixtures with overrides",
        content: `// utils/factory.ts
// A generic factory that creates test data with sensible defaults
// Supports partial overrides so tests only specify what's relevant

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  sku: string;
}

interface Order {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

// Generic factory function — T is any object type
function createTestData<T>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...overrides };
}

// Default test product
const defaultProduct: Product = {
  id: 1,
  name: "Test Widget",
  price: 29.99,
  inStock: true,
  category: "electronics",
  sku: "WIDGET-001",
};

// Create variants for specific test scenarios
const outOfStockProduct = createTestData(defaultProduct, {
  inStock: false,
  name: "Sold Out Widget",
});

const premiumProduct = createTestData(defaultProduct, {
  id: 2,
  price: 299.99,
  name: "Premium Widget",
  sku: "WIDGET-PREMIUM",
});

// ── Builder pattern variant — chain overrides ─────────────────────
function productFactory(overrides?: Partial<Product>): Product {
  return createTestData(defaultProduct, overrides);
}

const cheapProduct   = productFactory({ price: 1.99, name: "Budget Widget" });
const electronicItem = productFactory({ category: "computers", id: 99 });

console.log(\`Out of stock: \${outOfStockProduct.name} — \${outOfStockProduct.inStock}\`);
console.log(\`Premium price: $\${premiumProduct.price}\`);
console.log(\`Budget price: $\${cheapProduct.price}\`);`,
        expected: "Out of stock: Sold Out Widget — false\nPremium price: $299.99\nBudget price: $1.99",
      },
      {
        type: "heading",
        content: "5. Type-Safe Config with Partial Overrides",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "code",
        language: "typescript",
        label: "Environment-specific Playwright config using Partial<Config>",
        content: `// config/index.ts
// Type-safe configuration management for multi-environment test suites

interface TestSuiteConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  workers: number;
  screenshotOnFailure: boolean;
  videoOnFailure: boolean;
  reporter: "html" | "json" | "junit" | "dot";
  credentials: {
    adminEmail: string;
    adminPassword: string;
  };
}

// Base (default) config — used as fallback for everything
const baseConfig: TestSuiteConfig = {
  baseUrl: "http://localhost:3000",
  apiUrl: "http://localhost:3001/api",
  timeout: 30_000,
  retries: 0,
  headless: true,
  workers: 4,
  screenshotOnFailure: true,
  videoOnFailure: false,
  reporter: "html",
  credentials: {
    adminEmail: "admin@localhost.com",
    adminPassword: "DevPass123",
  },
};

// Environment-specific partial overrides — only specify what changes
const envConfigs: Record<string, Partial<TestSuiteConfig>> = {
  staging: {
    baseUrl: "https://staging.myapp.com",
    apiUrl: "https://api.staging.myapp.com",
    retries: 1,
    credentials: { adminEmail: "admin@staging.myapp.com", adminPassword: "StagingPass456" },
  },
  prod: {
    baseUrl: "https://myapp.com",
    apiUrl: "https://api.myapp.com",
    retries: 2,
    headless: true,
    workers: 8,
    videoOnFailure: true,
    credentials: { adminEmail: "qa@myapp.com", adminPassword: "ProdPass789" },
  },
};

// Merge: base config + environment override
function getConfig(env: string): TestSuiteConfig {
  const override = envConfigs[env] ?? {};
  return { ...baseConfig, ...override };
}

const stagingConfig = getConfig("staging");
console.log(\`Staging URL: \${stagingConfig.baseUrl}\`);    // https://staging.myapp.com
console.log(\`Staging retries: \${stagingConfig.retries}\`);  // 1
console.log(\`Workers: \${stagingConfig.workers}\`);          // 4 (from base — not overridden)`,
        expected:
          "Staging URL: https://staging.myapp.com\nStaging retries: 1\nWorkers: 4",
      },
      {
        type: "heading",
        content: "6. Typed Playwright Fixtures",
        difficulty: "🔴 Advanced",
      },
      {
        type: "code",
        language: "typescript",
        label: "Custom Playwright fixtures with full TypeScript types",
        content: `// fixtures/index.ts
// Typed Playwright test fixtures — extend the base 'test' with your own fixtures

import { test as base, type Page } from "@playwright/test";

// Import your page objects
// import { LoginPage }    from "../pages/LoginPage";
// import { DashboardPage } from "../pages/DashboardPage";

// 1. Define the SHAPE of your custom fixtures
interface MyFixtures {
  loginPage:     { navigate: () => Promise<void>; login: (e: string, p: string) => Promise<void> };
  dashboardPage: { isVisible: () => Promise<boolean> };
  testUser:      { email: string; password: string; role: string };
  adminUser:     { email: string; password: string; role: string };
  apiBaseUrl:    string;
}

// 2. Extend the base test with your fixture types
export const test = base.extend<MyFixtures>({

  // Fixture: loginPage — creates a new LoginPage instance per test
  loginPage: async ({ page }, use) => {
    // const lp = new LoginPage(page);   // real: use your POM class
    const lp = {                         // simplified for demo
      navigate: async () => { console.log("navigating to /login"); },
      login: async (e: string, p: string) => { console.log(\`login: \${e}\`); },
    };
    await use(lp);   // pass to the test
  },

  // Fixture: testUser — provides default test credentials
  testUser: async ({}, use) => {
    await use({
      email: "user@test.com",
      password: "TestPass123",
      role: "viewer",
    });
  },

  // Fixture: adminUser — provides admin credentials
  adminUser: async ({}, use) => {
    await use({
      email: "admin@test.com",
      password: "AdminPass456",
      role: "admin",
    });
  },

  // Fixture: apiBaseUrl — environment-aware API URL
  apiBaseUrl: async ({}, use) => {
    const env = process.env.TEST_ENV ?? "staging";
    const urls: Record<string, string> = {
      staging: "https://api.staging.myapp.com",
      prod:    "https://api.myapp.com",
    };
    await use(urls[env] ?? urls.staging);
  },

  // dashboardPage omitted for brevity
  dashboardPage: async ({ page }, use) => {
    await use({ isVisible: async () => true });
  },
});

// 3. Usage in tests — full autocomplete for loginPage, testUser, etc.
// test("login as regular user", async ({ loginPage, testUser }) => {
//   await loginPage.navigate();
//   await loginPage.login(testUser.email, testUser.password);
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });

export { expect } from "@playwright/test";`,
      },
      {
        type: "heading",
        content: "7. Utility Types for Partial Override Testing",
        difficulty: "🔴 Advanced",
      },
      {
        type: "code",
        language: "typescript",
        label: "Making fixture fields optional for flexible test setups",
        content: `// Using TypeScript utility types to make test fixtures flexible

// Full fixture interface — all fields required
interface TestFixtures {
  email: string;
  password: string;
  role: string;
  permissions: string[];
  teamId: number;
  locale: string;
  timezone: string;
}

// Partial<T> — ALL fields become optional
// Use for test helpers that accept partial overrides
type PartialFixtures = Partial<TestFixtures>;

// Required<T> — ALL optional become required
type StrictFixtures = Required<TestFixtures>;

// Readonly<T> — no one can mutate fixture data (prevents accidental shared state)
type ImmutableFixtures = Readonly<TestFixtures>;

// Pick — only the authentication-relevant fields
type AuthFixture = Pick<TestFixtures, "email" | "password" | "role">;

// Omit — everything except sensitive credentials
type SafeFixture = Omit<TestFixtures, "password">;

// ── createFixture: merge defaults + partial overrides ─────────────
const defaultFixtures: TestFixtures = {
  email:       "default@test.com",
  password:    "DefaultPass123",
  role:        "viewer",
  permissions: ["read"],
  teamId:      1,
  locale:      "en-US",
  timezone:    "UTC",
};

function createFixture(overrides: Partial<TestFixtures>): Readonly<TestFixtures> {
  const merged = { ...defaultFixtures, ...overrides };
  return Object.freeze(merged);   // freeze = runtime + compile-time immutability
}

const adminFixture   = createFixture({ role: "admin", permissions: ["read", "write", "delete"] });
const euFixture      = createFixture({ locale: "de-DE", timezone: "Europe/Berlin" });
const minimalFixture: AuthFixture = { email: "qa@test.com", password: "pass", role: "editor" };

console.log(\`Admin: \${adminFixture.role}, perms: \${adminFixture.permissions.join(", ")}\`);
console.log(\`EU locale: \${euFixture.locale}, tz: \${euFixture.timezone}\`);
console.log(\`Auth only: \${minimalFixture.email}\`);`,
        expected:
          "Admin: admin, perms: read, write, delete\nEU locale: de-DE, tz: Europe/Berlin\nAuth only: qa@test.com",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 6 — Interview Q&A
  // ─────────────────────────────────────────────
  {
    title: "Interview Q&A",
    blocks: [
      {
        type: "heading",
        content: "Basic Questions (1–5)",
        difficulty: "🟢 Beginner",
      },
      {
        type: "qa",
        question: "1. What is the main difference between TypeScript and JavaScript for test automation?",
        answer:
          "TypeScript is a statically typed superset of JavaScript that adds a compile step. For test automation, the key advantages are: type errors are caught before tests run (not during CI failure at 3 AM); IDE autocomplete works on all Playwright APIs, page objects, and fixtures; refactoring is safe because the compiler immediately shows every broken call site. JavaScript has no compile step — all type errors become runtime surprises. Playwright itself is written in TypeScript and TypeScript is the officially recommended language for Playwright projects.",
      },
      {
        type: "qa",
        question: "2. What is the difference between interface and type alias in TypeScript?",
        answer:
          "Both describe object shapes, but they have key differences. interface supports declaration merging — you can reopen an interface and add properties, which is useful for augmenting third-party types (like extending Playwright's TestFixtures). interface is preferred for OOP patterns and class contracts. type supports union types (`string | number`), intersection types (`A & B`), tuple types, and mapped types — it is more expressive when you need computed or composite types. Rule of thumb: use interface for class shapes and public APIs; use type for unions, primitives, and complex computed types.",
        code: `interface Config { url: string }
interface Config { timeout: number }   // merged — now has url AND timeout

type Status = "pass" | "fail" | "skip";  // union — only possible with type
type ID     = string | number;           // union`,
      },
      {
        type: "qa",
        question: "3. What is 'any' and why should you avoid it in test automation?",
        answer:
          "any is an escape hatch that completely disables TypeScript's type checking for a variable. You can assign anything to it and call any method on it without errors — but those errors surface at runtime instead of compile time. In test automation, using any defeats the entire purpose of TypeScript: you lose autocomplete, lose compile-time safety, and introduce the same class of runtime bugs that TypeScript is designed to prevent. Use unknown instead when you genuinely don't know the type — it forces you to narrow the type with a type guard before using it. Use explicit types, type assertions (as), or generics instead of any.",
        code: `// WRONG — any disables all safety
let data: any = await response.json();
data.nonExistentField.toUpperCase(); // No error — crashes at runtime

// RIGHT — unknown forces you to validate first
let safe: unknown = await response.json();
if (typeof safe === "object" && safe !== null && "name" in safe) {
  console.log((safe as { name: string }).name);  // safe to use
}`,
      },
      {
        type: "qa",
        question: "4. What is type inference and when does it work?",
        answer:
          "Type inference is TypeScript's ability to automatically determine a variable's type from its initial value or context, without requiring an explicit annotation. It works for: variable declarations with an initial value (`let x = 5` → x is number), function return types (inferred from the return statement), generic type parameters (inferred from arguments), and array/object literals. When to annotate explicitly: when the variable is declared without a value, when the inferred type is too broad (e.g., you want `string[]` not `(string | number)[]`), and in function parameters which are never inferred.",
        code: `let count = 5;            // inferred: number
let name  = "Alice";       // inferred: string
let arr   = [1, 2, 3];     // inferred: number[]

function double(n: number) { return n * 2; }  // return: number (inferred)

let url: string;            // MUST annotate — no initial value
url = "https://example.com";`,
      },
      {
        type: "qa",
        question: "5. What are enums and give a testing-specific use case?",
        answer:
          "Enums are named constant sets. String enums (where each member has an explicit string value) are strongly preferred in test automation because they produce readable output in logs and test reports. A number enum with value `0` is meaningless in a test failure message; a string enum with value 'FAIL' is immediately understandable. Common testing use cases: test status (PASS/FAIL/SKIP/BLOCKED), browser target (chromium/firefox/webkit), environment (staging/production), HTTP methods, and log levels. Using enums instead of raw strings means the compiler catches typos like `'pase'` instantly.",
        code: `enum TestStatus { PASS = "PASS", FAIL = "FAIL", SKIP = "SKIP" }
enum Browser    { CHROMIUM = "chromium", FIREFOX = "firefox" }

function reportResult(status: TestStatus, browser: Browser) {
  console.log(\`[\${browser}] \${status}\`);   // [chromium] PASS — readable!
}
reportResult(TestStatus.PASS, Browser.CHROMIUM);
// reportResult("pass", "chrome");  // Error — prevents typos`,
      },
      {
        type: "heading",
        content: "Intermediate Questions (6–10)",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "qa",
        question: "6. What is the difference between union types and intersection types?",
        answer:
          "A union type (`A | B`) means a value can be one OR the other type — you must handle both cases (usually with a type guard). An intersection type (`A & B`) means a value must satisfy ALL listed types simultaneously — it combines properties from multiple types into one. Union is for 'or' scenarios (a parameter that accepts multiple forms), intersection is for 'and' scenarios (composing multiple interfaces into one complete type). In test automation: union types are common for function parameters that accept multiple formats (string | number); intersection types are common for composed page objects or config types.",
        code: `type StringOrNumber = string | number;  // can be EITHER

interface HasId    { id: number }
interface HasTitle { title: string }
type TestItem = HasId & HasTitle;  // must have BOTH id AND title

const item: TestItem = { id: 1, title: "Login test" };  // OK
// const bad: TestItem = { id: 1 };  // Error: missing 'title'`,
      },
      {
        type: "qa",
        question: "7. What are generics and why are they useful in test automation?",
        answer:
          "Generics are type parameters (written as `<T>`) that let you write functions, classes, and interfaces that work with any type while preserving that type's information throughout the code. Without generics, you use `any` (and lose all type safety) or duplicate code for each type. In test automation, generics are most useful for: API response wrappers that preserve the data's type (`ApiResponse<User>` vs `ApiResponse<Product>`), test data factories that create typed objects with partial overrides (`createTestData<T>(defaults: T, overrides?: Partial<T>): T`), repository patterns for typed data access, and utility functions that must work across multiple fixture types.",
        code: `// Generic wrapper preserves type through the chain
interface ApiResponse<T> { data: T; status: number; ok: boolean }

function createResponse<T>(data: T, status: number): ApiResponse<T> {
  return { data, status, ok: status < 400 };
}

const userResp = createResponse({ id: 1, name: "Alice" }, 200);
console.log(userResp.data.name);  // 'name' is correctly typed as string`,
      },
      {
        type: "qa",
        question: "8. How do access modifiers (public/private/protected/readonly) help in Page Object Model?",
        answer:
          "Access modifiers enforce encapsulation in POM classes, which prevents test code from depending on implementation details. private on locator properties means test files cannot access selectors directly — only the page object's methods interact with the DOM, so selector changes don't ripple into every test file. protected allows subclasses to use methods (like `waitForLoad()`) that base classes provide without exposing them to test code. readonly on baseUrl or constructorinjected dependencies prevents accidental mutation between tests. public marks the methods that are the page object's public API — the only things test code should call.",
        code: `class LoginPage {
  private readonly emailInput: Locator;   // tests cannot use selectors directly
  protected readonly page: Page;          // accessible to subclasses
  public readonly url = "/login";         // tests can read url, not change it

  async login(e: string, p: string): Promise<void> {  // public API
    await this.emailInput.fill(e);   // private — only this class
  }
}`,
      },
      {
        type: "qa",
        question: "9. What are type guards and when do you use them in test automation?",
        answer:
          "Type guards are runtime checks that narrow a union type to a specific member inside a code branch. TypeScript recognizes `typeof`, `instanceof`, the `in` operator, and custom type predicate functions (`value is T`) as type guards. In test automation, type guards appear most often when: validating API responses of unknown shape (the response is typed as `unknown` until validated), handling errors that could be multiple error types (NetworkError vs TimeoutError), processing test results that come in multiple formats (UI test vs API test), and working with optional properties that may be undefined.",
        code: `function handleError(err: NetworkError | TimeoutError): void {
  if (err instanceof NetworkError) {
    console.log(\`HTTP \${err.statusCode}\`);  // statusCode only on NetworkError
  } else {
    console.log(\`Timed out after \${err.timeoutMs}ms\`);
  }
}

// Custom type predicate
function isUser(val: unknown): val is { id: number; name: string } {
  return typeof val === "object" && val !== null && "id" in val;
}`,
      },
      {
        type: "qa",
        question: "10. What does 'readonly' do and when should you use it in test automation?",
        answer:
          "readonly prevents a property from being reassigned after initialization. At the type level it is a compile-time guarantee; combined with `Object.freeze()` it also works at runtime. In test automation, readonly is most important for: page object locators (selectors should never change after construction), configuration objects (prevent tests from mutating shared config), environment URLs and credentials passed into fixtures, and test data objects created by factories (tests should receive immutable data to prevent inter-test contamination). `Readonly<T>` is the utility type equivalent — it makes every property of an existing type readonly without rewriting the interface.",
        code: `interface TestConfig {
  baseUrl: string;
  retries: number;
}
type FrozenConfig = Readonly<TestConfig>;
const cfg: FrozenConfig = { baseUrl: "https://app.com", retries: 2 };
// cfg.baseUrl = "changed";  // Compile Error: cannot assign to 'baseUrl'`,
      },
      {
        type: "heading",
        content: "Advanced Questions (11–15)",
        difficulty: "🔴 Advanced",
      },
      {
        type: "qa",
        question: "11. What are utility types and give concrete automation examples for at least four?",
        answer:
          "Utility types are built-in generic types that transform existing types. The most useful in test automation: Partial<T> — makes all properties optional, used for config overrides and test data factories so you only specify what changes. Pick<T,K> — selects specific properties, useful for creating auth-only fixture types from a full user interface. Omit<T,K> — removes properties, useful for creating safe fixture types without passwords. Record<K,V> — typed key-value map, used for environment URL maps or browser timeout configs. Readonly<T> — freezes a type for immutable test config and fixture data. ReturnType<F> and Awaited<ReturnType<F>> — extracts the resolved return type of async functions, useful for typing variables that hold fetched data.",
        code: `type PartialConfig  = Partial<TestConfig>;                          // for overrides
type AuthOnly       = Pick<User, "email" | "password" | "role">;    // for login tests
type SafeUser       = Omit<User, "password">;                       // no credentials
type BrowserMap     = Record<Browser, number>;                       // { chromium: 30000, ... }
type FetchedUser    = Awaited<ReturnType<typeof fetchUser>>;         // resolved type`,
      },
      {
        type: "qa",
        question: "12. How do you correctly type async functions with possible error states in TypeScript?",
        answer:
          "TypeScript does not have a built-in Result/Either type, but you can model it explicitly. The three main patterns are: (1) Union return type — `Promise<Data | null>` or `Promise<{ data: T } | { error: string }>`, which forces callers to handle both cases. (2) Typed exceptions — declare custom error classes and use them consistently; callers can check with instanceof. (3) Generic Result type — `type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }`, a discriminated union where the `ok` boolean is the type guard. Pattern 3 is the most explicit and is popular in large Playwright frameworks. Always annotate async function return types explicitly as `Promise<T>` rather than relying on inference — it makes the contract clear to all callers.",
        code: `type Result<T, E extends Error = Error> =
  | { ok: true;  data:  T }
  | { ok: false; error: E };

async function fetchUser(id: number): Promise<Result<User>> {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) return { ok: false, error: new Error(\`HTTP \${res.status}\`) };
    return { ok: true, data: await res.json() as User };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}`,
      },
      {
        type: "qa",
        question: "13. What are mapped types and how would you use them in a test framework?",
        answer:
          "Mapped types iterate over the keys of an existing type and produce a new type by transforming each property. Syntax: `{ [K in keyof T]: NewType }`. In a test framework, mapped types are useful for: creating form validation error types (`{ [K in keyof Form]: string | null }` — one error slot per field), creating mock/spy wrapper types that replace every method with a Jest spy, generating serialized string versions of a config interface for env-var parsing, and building partial-with-defaults helpers. Mapped types are the foundation of most built-in utility types (Partial, Readonly, Required, Record are all implemented as mapped types in TypeScript's lib).",
        code: `// Form error type — one validation message per field
type FormErrors<T> = { [K in keyof T]: string | null };
interface LoginForm { email: string; password: string; rememberMe: boolean }
type LoginErrors = FormErrors<LoginForm>;
// { email: string|null; password: string|null; rememberMe: string|null }

// Serialized env-vars — all values become strings
type EnvVarMap<T> = { [K in keyof T]: string };`,
      },
      {
        type: "qa",
        question: "14. What does enabling 'strict' mode in tsconfig.json do and why does it matter for test automation?",
        answer:
          "strict: true enables a group of strictness checks simultaneously: noImplicitAny (parameters cannot silently become any), strictNullChecks (null and undefined are their own types — you must handle them explicitly), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, and noImplicitThis. For test automation, strictNullChecks is the most impactful — it forces you to handle cases where locators might not find elements, API responses might be null, or optional config values might be undefined. Without strict mode, TypeScript is very permissive and many of the runtime bugs it's supposed to prevent will still occur. Always start new Playwright projects with strict: true. On legacy JS-to-TS migrations, enable strict flags incrementally.",
      },
      {
        type: "qa",
        question: "15. How do you structure TypeScript types in a large Playwright framework?",
        answer:
          "A scalable structure separates types by responsibility: (1) `src/types/` or `types/` directory for shared interfaces and type aliases — split by domain: `user.types.ts`, `api.types.ts`, `config.types.ts`. (2) `src/enums/` for string enums (Browser, Environment, TestStatus). (3) Each page object file exports its own interface alongside the class (ILoginPage + LoginPage). (4) A barrel file (`types/index.ts`) re-exports everything so imports stay clean. (5) `playwright.d.ts` or `fixtures.d.ts` for augmenting Playwright's TestFixtures interface with custom fixture types. (6) Never put types in test files — they belong in the shared layer. (7) Use `import type { ... }` (not `import { ... }`) for type-only imports — they are removed at compile time and don't create circular dependencies.",
        code: `// types/index.ts — barrel exports
export type { User, AdminUser } from "./user.types";
export type { ApiResponse, ApiError } from "./api.types";
export { TestStatus, Browser, Environment } from "../enums";

// In test file:
import type { User } from "../types";             // type-only import
import { TestStatus, Browser } from "../types";   // value import (enum)`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 7 — Practice & Reference
  // ─────────────────────────────────────────────
  {
    title: "Practice & Reference",
    blocks: [
      {
        type: "heading",
        content: "Exercise 1 — Define TestCase Interface",
        difficulty: "🟢 Beginner",
      },
      {
        type: "exercise",
        difficulty: "🟢 Beginner",
        title: "Build a TestCase Interface with Enum",
        description:
          "Define a string enum `Priority` with values LOW, MEDIUM, HIGH, CRITICAL. Define a string enum `TestStatus` with PASS, FAIL, SKIP, BLOCKED. Define an interface `TestCase` with: id (number, readonly), title (string), description (optional string), status (TestStatus), priority (Priority), tags (string array), durationMs (number), and assignee (optional string). Create two TestCase objects: one for a passing login test and one for a failing payment test.",
        hint: "Use readonly for id, ? for optional properties, and string enum values like Status.PASS = 'PASS'. Remember both enums must be string enums for readable test output.",
        solution: `// ── Enums ────────────────────────────────────────────────────────
enum Priority {
  LOW      = "LOW",
  MEDIUM   = "MEDIUM",
  HIGH     = "HIGH",
  CRITICAL = "CRITICAL",
}

enum TestStatus {
  PASS    = "PASS",
  FAIL    = "FAIL",
  SKIP    = "SKIP",
  BLOCKED = "BLOCKED",
}

// ── Interface ─────────────────────────────────────────────────────
interface TestCase {
  readonly id:    number;          // immutable after creation
  title:          string;          // test case title
  description?:   string;          // optional detailed description
  status:         TestStatus;      // must be a valid TestStatus value
  priority:       Priority;        // must be a valid Priority value
  tags:           string[];        // array of tag strings
  durationMs:     number;          // execution time in milliseconds
  assignee?:      string;          // optional QA engineer name
}

// ── Create typed test cases ────────────────────────────────────────
const loginTest: TestCase = {
  id:          1,
  title:       "Login with valid credentials",
  description: "Verify that a registered user can log in with correct email and password",
  status:      TestStatus.PASS,
  priority:    Priority.CRITICAL,
  tags:        ["smoke", "auth", "regression"],
  durationMs:  1240,
  assignee:    "Alice",
};

const paymentTest: TestCase = {
  id:        2,
  title:     "Complete checkout with credit card",
  status:    TestStatus.FAIL,
  priority:  Priority.HIGH,
  tags:      ["e2e", "payment"],
  durationMs: 3800,
  // description and assignee omitted — they are optional
};

// ── Print summary ─────────────────────────────────────────────────
[loginTest, paymentTest].forEach((tc) => {
  console.log(\`[\${tc.status}] \${tc.priority} — \${tc.title} (\${tc.durationMs}ms)\`);
});`,
        explanation:
          "String enums produce readable values ('PASS', 'CRITICAL') in logs and reports instead of opaque numbers. The readonly modifier on id prevents tests from accidentally changing an identifier. Optional fields (?) let you create minimal test objects without boilerplate, while required fields enforce a complete, valid contract.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        content: "Exercise 2 — Generic ApiResponse<T> Wrapper",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "exercise",
        difficulty: "🟡 Intermediate",
        title: "Generic API Response Wrapper with Type Guards",
        description:
          "Create a generic interface `ApiResponse<T>` with fields: data (T | null), status (number), ok (boolean), error (string | null), requestId (string). Write a generic factory function `createApiResponse<T>` that takes data and status code and returns a correctly filled ApiResponse<T>. Write a type guard function `isSuccessResponse<T>` that returns true if ok is true and data is not null. Write a `parseUserResponse` function that takes `ApiResponse<unknown>` and validates it is a user (has id: number, name: string, email: string). Test with a 200 user response and a 404 error response.",
        hint: "The type guard should have the signature `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>`. For the user validation function use the 'in' operator and typeof checks to validate the unknown data shape.",
        solution: `// ── Generic response interface ────────────────────────────────────
interface ApiResponse<T> {
  data:      T | null;   // null on error responses
  status:    number;     // HTTP status code
  ok:        boolean;    // true for 2xx
  error:     string | null;
  requestId: string;
}

// ── Factory function ─────────────────────────────────────────────
let reqCounter = 0;

function createApiResponse<T>(data: T | null, status: number): ApiResponse<T> {
  return {
    data,
    status,
    ok:        status >= 200 && status < 300,
    error:     status >= 400 ? \`HTTP Error \${status}\` : null,
    requestId: \`req-\${++reqCounter}\`,
  };
}

// ── Type guard ───────────────────────────────────────────────────
// Narrows ApiResponse<T> to ApiResponse<NonNullable<T>> — data is guaranteed non-null
function isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {
  return res.ok === true && res.data !== null;
}

// ── Interfaces ───────────────────────────────────────────────────
interface ApiUser { id: number; name: string; email: string }

// ── Validation function ───────────────────────────────────────────
function parseUserResponse(res: ApiResponse<unknown>): ApiUser {
  if (!isSuccessResponse(res)) {
    throw new Error(\`Request failed: \${res.error ?? "unknown error"}\`);
  }
  const d = res.data;                          // narrowed: not null/undefined
  if (
    typeof d !== "object"           ||
    d === null                      ||
    !("id"    in d) || typeof (d as any).id    !== "number" ||
    !("name"  in d) || typeof (d as any).name  !== "string" ||
    !("email" in d) || typeof (d as any).email !== "string"
  ) {
    throw new Error("Response does not match ApiUser shape");
  }
  return d as ApiUser;
}

// ── Test it ──────────────────────────────────────────────────────
const userResp  = createApiResponse({ id: 1, name: "Alice", email: "alice@test.com" }, 200);
const errorResp = createApiResponse<ApiUser>(null, 404);

console.log(\`OK response: \${userResp.ok}, id: \${userResp.data?.id}\`);   // OK response: true, id: 1
console.log(\`Error:       \${errorResp.error}\`);                          // Error: HTTP Error 404

const user = parseUserResponse(userResp);
console.log(\`Parsed user: \${user.name} <\${user.email}>\`);               // Parsed user: Alice <alice@test.com>

try {
  parseUserResponse(errorResp);
} catch (e) {
  console.log(\`Caught: \${(e as Error).message}\`);                        // Caught: Request failed: HTTP Error 404
}`,
        explanation:
          "Generics allow one `ApiResponse<T>` interface to correctly type the data field as User, Product, Order, or any other type. The type guard narrows the type so TypeScript knows data is non-null after the check. The runtime validation function bridges the gap between 'unknown API data' and your typed interface — essential for safe API test assertions.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        content: "Exercise 3 — Typed Playwright POM Base Class",
        difficulty: "🔴 Advanced",
      },
      {
        type: "exercise",
        difficulty: "🔴 Advanced",
        title: "Generic Playwright POM Base Class with Fixtures",
        description:
          "Create an abstract class `PageObjectBase` that accepts `Page` from Playwright in its constructor. It should have: a protected abstract `path` property (string), a `navigate()` method that calls `page.goto`, a generic `getElement<T extends Locator>(selector: string): T` method, a protected `waitForSelector(selector: string, state?: 'visible'|'hidden'|'attached'|'detached')` helper, and an `expectUrl(expected: string)` assertion helper. Then create a concrete `LoginPage` that extends it with typed `login(creds: {email:string, password:string})`, `getErrorText()`, and `isLoggedIn()` methods. Finally show a typed fixture extension using `test.extend<{loginPage: LoginPage}>`.",
        hint: "Use `import { type Page, type Locator, test as base } from '@playwright/test'`. The abstract path property forces every page to declare its route. The generic getElement method preserves Locator subtype information.",
        solution: `// ── Import types from Playwright ─────────────────────────────────
// import { type Page, type Locator, test as base, expect } from "@playwright/test";

// ── Interfaces ───────────────────────────────────────────────────
interface LoginCredentials {
  email:    string;
  password: string;
}

// ── Abstract base class ───────────────────────────────────────────
abstract class PageObjectBase {
  // Every concrete page must declare its path
  protected abstract readonly path: string;

  constructor(
    protected readonly page: any,   // Page — typed as any for demo (use Playwright's Page in real code)
    protected readonly baseUrl: string = "https://staging.myapp.com"
  ) {}

  // Navigate to this page's path
  async navigate(): Promise<void> {
    const fullUrl = \`\${this.baseUrl}\${this.path}\`;
    console.log(\`→ goto: \${fullUrl}\`);
    // await this.page.goto(fullUrl);
    // await this.page.waitForLoadState("domcontentloaded");
  }

  // Generic element getter — preserves Locator subtype
  protected getElement<T = any>(selector: string): T {
    // return this.page.locator(selector) as T;
    console.log(\`→ locator: \${selector}\`);
    return { selector } as T;
  }

  // Protected helper — only page objects and subclasses can call this
  protected async waitForSelector(
    selector: string,
    state: "visible" | "hidden" | "attached" | "detached" = "visible"
  ): Promise<void> {
    console.log(\`→ wait for \${selector} to be \${state}\`);
    // await this.page.locator(selector).waitFor({ state });
  }

  // Assertion helper — usable in any page object
  async expectUrl(expected: string): Promise<void> {
    const current = \`\${this.baseUrl}\${this.path}\`;
    const ok = current.includes(expected);
    console.log(\`→ URL check: \${ok ? "PASS" : "FAIL"} (expected to include: \${expected})\`);
    // await expect(this.page).toHaveURL(new RegExp(expected));
  }
}

// ── Concrete LoginPage ────────────────────────────────────────────
class LoginPage extends PageObjectBase {
  protected readonly path = "/login";   // must implement abstract property

  // Private typed locators — selectors are an implementation detail
  private get emailInput()    { return this.getElement('[data-testid="email-input"]'); }
  private get passwordInput() { return this.getElement('[data-testid="password-input"]'); }
  private get submitButton()  { return this.getElement('[data-testid="login-submit"]'); }
  private get errorMsg()      { return this.getElement('[data-testid="error-message"]'); }
  private get userMenu()      { return this.getElement('[data-testid="user-menu"]'); }

  // Typed login method — accepts our LoginCredentials interface
  async login(creds: LoginCredentials): Promise<void> {
    console.log(\`→ fill email: \${creds.email}\`);
    console.log(\`→ fill password: ***\`);
    console.log(\`→ click submit\`);
    // await this.emailInput.fill(creds.email);
    // await this.passwordInput.fill(creds.password);
    // await this.submitButton.click();
  }

  // Returns string — callers always get a string (no null handling needed)
  async getErrorText(): Promise<string> {
    await this.waitForSelector('[data-testid="error-message"]');
    return "Invalid email or password";   // would be: await this.errorMsg.innerText()
  }

  // Returns boolean — clean assertion-ready API
  async isLoggedIn(): Promise<boolean> {
    return true;   // would be: await this.userMenu.isVisible()
  }
}

// ── Typed Playwright fixture extension ────────────────────────────
// const test = base.extend<{ loginPage: LoginPage }>({
//   loginPage: async ({ page }, use) => {
//     const lp = new LoginPage(page);
//     await use(lp);
//   },
// });
//
// Usage in tests:
// test("login flow", async ({ loginPage }) => {
//   await loginPage.navigate();
//   await loginPage.login({ email: "qa@test.com", password: "Pass123" });
//   expect(await loginPage.isLoggedIn()).toBe(true);
// });

// ── Demo output ───────────────────────────────────────────────────
const demoPage = new LoginPage(null);
demoPage.navigate().then(async () => {
  await demoPage.login({ email: "qa@test.com", password: "Pass123" });
  const loggedIn = await demoPage.isLoggedIn();
  console.log(\`→ isLoggedIn: \${loggedIn}\`);
  await demoPage.expectUrl("/login");
});`,
        explanation:
          "Abstract classes enforce that every page declares its own path, preventing forgetting to set the route. Protected access on helpers and locators keeps the public API clean — test code only sees navigate, login, getErrorText, isLoggedIn. The generic getElement preserves type information from Playwright's Locator hierarchy. The fixture extension pattern makes the typed page object available in every test that needs it without manually constructing it — this is the standard Playwright TypeScript pattern for large projects.",
      },
      {
        type: "heading",
        content: "Quick Reference: TypeScript Features",
        difficulty: "🟢 Beginner",
      },
      {
        type: "table",
        headers: ["Feature", "Syntax", "When to Use"],
        rows: [
          ["String enum", "enum E { A = 'A' }", "Status, browser, env constants — readable in logs"],
          ["Interface", "interface Foo { x: string }", "Object shapes, class contracts, POM types"],
          ["Type alias", "type ID = string | number", "Unions, primitives, computed/complex types"],
          ["Optional prop", "{ x?: string }", "Config overrides, partial test data objects"],
          ["Readonly prop", "{ readonly id: number }", "IDs, URLs, tokens that must not change"],
          ["Generic function", "function f<T>(x: T): T", "Factories, wrappers, utility functions"],
          ["Generic interface", "interface R<T> { data: T }", "API responses, repositories, collections"],
          ["Partial<T>", "Partial<Config>", "Config overrides, optional test data factories"],
          ["Pick<T,K>", "Pick<User, 'email'|'role'>", "Auth-only fixtures, slim DTO types"],
          ["Omit<T,K>", "Omit<User, 'password'>", "Safe fixture types without sensitive fields"],
          ["Record<K,V>", "Record<Browser, number>", "Typed maps: timeout per browser, URL per env"],
          ["Type guard", "x is MyType", "Validate unknown API responses at runtime"],
          ["Non-null assert", "value!", "Only when you are certain value is not null/undefined"],
          ["Satisfies", "obj satisfies Type", "Validate config without losing literal types (TS 4.9+)"],
          ["Template literal type", "`${Env}.myapp.com`", "Type-safe URL patterns, event names, route strings"],
        ],
      },
      {
        type: "tip",
        content:
          "Bookmark the TypeScript Playground at typescriptlang.org/play — paste any snippet and see the compiled JavaScript, type errors, and hover types instantly. It is the fastest way to experiment with TypeScript concepts without setting up a project.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TURKISH HERO
// ─────────────────────────────────────────────────────────────────────────────
const trHero = {
  title: "🔷 TypeScript",
  subtitle: "Playwright ve Test Otomasyonu için TypeScript",
  intro:
    "Modern test otomasyonu için TypeScript öğrenin. Tür temellerinden ileri düzey Playwright desenlerine kadar — tam IDE desteği, otomatik tamamlama ve derleme zamanı hata yakalama ile daha güvenli, daha kolay bakım yapılabilir testler yazın.",
};

// ─────────────────────────────────────────────────────────────────────────────
// TURKISH TABS
// ─────────────────────────────────────────────────────────────────────────────
const trTabs = [
  "🎯 Giriş",
  "📦 Kurulum",
  "🟢 Temeller",
  "🟡 Orta Seviye",
  "🔴 İleri Seviye",
  "🧪 QA Kullanım",
  "💼 Mülakat",
  "📝 Pratik & Referans",
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export const typescriptData = {
  en: {
    hero: {
      title: "🔷 TypeScript",
      subtitle: "TypeScript for Playwright & Test Automation",
      intro:
        "Learn TypeScript for modern test automation. From type basics to advanced Playwright patterns — write safer, more maintainable tests with full IDE support, autocomplete, and compile-time error catching.",
    },
    tabs: [
      "🎯 Intro & Why",
      "📦 Installation",
      "🟢 Foundations",
      "🟡 Intermediate",
      "🔴 Advanced",
      "🧪 QA Use Cases",
      "💼 Interview Q&A",
      "📝 Practice & Reference",
    ],
    sections,
  },
  tr: {
    hero: trHero,
    tabs: trTabs,
    sections,
  },
};
