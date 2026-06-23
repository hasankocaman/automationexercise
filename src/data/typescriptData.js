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
      {
        type: "quiz",
        question: { tr: "TypeScript'in test otomasyonundaki temel değer önerisi nedir?", en: "What is TypeScript's core value proposition in test automation?" },
        options: [
          { id: "a", text: { tr: "Testleri daha hızlı çalıştırır", en: "Makes tests run faster" } },
          { id: "b", text: { tr: "Tür hatalarını derleme zamanında yakalar, testler CI'da çalışmadan önce", en: "Catches type errors at compile time, before tests even run in CI" } },
          { id: "c", text: "Tarayıcı ihtiyacını ortadan kaldırır" },
          { id: "d", text: { tr: "Testleri otomatik olarak paralel çalıştırır", en: "Automatically runs tests in parallel" } },
        ],
        correct: "b",
        explanation: { tr: "TypeScript bir derleme adımı ekler: tür hataları, tanımsız özellik erişimleri ve yanlış argüman tipleri kodun hiç çalışmadan önce IDE'de görünür hale gelir. Bu, gece 2'de CI'da sessizce başarısız olan bir test paketinden, sorunu yazarken anında gösteren bir geri bildirim döngüsüne geçiştir — hız veya paralellikle ilgisi yoktur.", en: "TypeScript adds a compile step: type errors, undefined property access, and wrong argument types become visible in the IDE before the code ever runs. This shifts the feedback loop from a test suite silently failing in CI at 2am to seeing the problem the moment you write it — it has nothing to do with speed or parallelism." },
        retryQuestion: {
          question: { tr: "Bir geliştirici `let count: number = \"5\"` yazarsa ne olur?", en: 'What happens if a developer writes `let count: number = "5"`?' },
          options: [
            { id: "a", text: { tr: "Kod çalışır, count değişkeni \"5\" string'ini tutar", en: 'The code runs fine, count holds the string "5"' } },
            { id: "b", text: { tr: "TypeScript derleyicisi kodu çalıştırmadan önce bir tip hatası verir", en: "The TypeScript compiler reports a type error before the code ever runs" } },
            { id: "c", text: { tr: "JavaScript runtime'ı bir exception fırlatır", en: "The JavaScript runtime throws an exception" } },
            { id: "d", text: { tr: "TypeScript string'i otomatik olarak sayıya çevirir", en: "TypeScript automatically converts the string to a number" } },
          ],
          correct: "b",
          explanation: { tr: 'Bu, derleme zamanı tip güvenliğinin somut bir örneğidir: `\"5\"` bir string literal\'dir, `number` tipine atanamaz, ve derleyici bunu kod hiç çalışmadan IDE\'de kırmızı çizgiyle işaretler. Çalışma zamanı hiç devreye girmez — hata yazarken anında görünür.', en: 'This is compile-time type safety in action: `"5"` is a string literal, not assignable to `number`, and the compiler flags it with a red squiggly in the IDE before the code ever runs. Runtime never even gets involved — the error is visible the moment it is written.' },
        },
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
      {
        type: "quiz",
        question: { tr: "TypeScript kurulumunda Node.js'in LTS (Long Term Support) sürümünün tercih edilmesinin temel nedeni nedir?", en: "What is the main reason to prefer Node.js's LTS (Long Term Support) version when installing TypeScript?" },
        options: [
          { id: "a", text: { tr: "LTS sürümü her zaman en yeni dil özelliklerine sahiptir", en: "The LTS version always has the newest language features" } },
          { id: "b", text: { tr: "En kararlı sürümdür ve CI/CD ortamlarının kullandığı sürümle eşleşir", en: "It is the most stable version and matches what CI/CD environments run" } },
          { id: "c", text: { tr: "Sadece LTS sürümü TypeScript'i destekler", en: "Only the LTS version supports TypeScript" } },
          { id: "d", text: { tr: "LTS sürümü kurulum gerektirmez", en: "The LTS version requires no installation" } },
        ],
        correct: "b",
        explanation: { tr: "LTS sürümleri uzun süreli güvenlik yamaları ve kararlılık garantisi alır; bu yüzden CI/CD pipeline'ları, Docker imajları ve production sunucuları genellikle LTS kullanır. Geliştirme makinende farklı, daha yeni bir sürüm kullanırsan, sadece kendi makinende çalışan ama CI'da başarısız olan bir kod yazma riski oluşur — Java'da JDK LTS sürümü (8/11/17/21) seçmekle aynı mantık.", en: "LTS versions get long-term security patches and a stability guarantee, which is why CI/CD pipelines, Docker images, and production servers typically run LTS. Using a different, newer version on your dev machine risks writing code that only works locally but fails in CI — the same reasoning behind picking a Java LTS JDK version (8/11/17/21)." },
        retryQuestion: {
          question: { tr: "Bir geliştirici local makinesinde Node 22 (henüz LTS olmayan, Current sürüm) kullanıyor, CI ise Node 20 LTS kullanıyor. Bu fark ne tür bir riske yol açar?", en: 'A developer uses Node 22 (a non-LTS Current release) locally, while CI runs Node 20 LTS. What kind of risk does this mismatch create?' },
          options: [
            { id: "a", text: { tr: "Hiçbir risk yok, Node sürümleri her zaman geriye uyumludur", en: "No risk at all, Node versions are always backward compatible" } },
            { id: "b", text: { tr: "Geliştiricinin makinesinde çalışan kod, Node 20'de mevcut olmayan bir API'ye dayanıyorsa CI'da başarısız olabilir", en: "Code that works on the developer's machine may rely on an API not present in Node 20, and fail in CI" } },
            { id: "c", text: { tr: "TypeScript derleyicisi farklı Node sürümlerinde çalışmaz", en: "The TypeScript compiler cannot run on different Node versions" } },
            { id: "d", text: { tr: "Testler her zaman CI'da otomatik olarak Node 22'ye yükseltilir", en: "Tests are automatically upgraded to Node 22 in CI" } },
          ],
          correct: "b",
          explanation: { tr: 'Yeni bir Node sürümünde mevcut olan ama eski LTS sürümünde olmayan bir API veya davranış kullanmak, kodun lokalde çalışıp CI\'da "fonksiyon tanımlı değil" gibi bir hatayla başarısız olmasına yol açar. Bu yüzden geliştirme ve CI ortamlarının aynı LTS sürümünde hizalanması gerekir — versiyon uyuşmazlığı sessiz bir kaynaktır, kodun kendisi doğru olsa bile.', en: 'Using an API or behavior available in a newer Node version but missing from the older LTS one causes code to work locally and then fail in CI with something like "function is not defined." This is exactly why dev and CI environments should align on the same LTS version — version mismatch is a silent source of failures even when the code itself is correct.' },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — Foundations 🟢
  // ─────────────────────────────────────────────
  {
    title: "TypeScript Foundations",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 1 — Simple Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Simple Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🔷", content: { tr: "TypeScript, JavaScript'in üzerine etiket takılmış hali. 'Bu kutu sadece sayı içerir' etiketi gibi — yanlış bir şey koymaya çalışırsan hemen uyarı alırsın. Java'da zaten böyleydi; TypeScript bunu JavaScript'e getiriyor.", en: "TypeScript is JavaScript with labels attached. Like a box labeled 'numbers only' — if you try to put the wrong thing in, you get an immediate warning. Java already had this; TypeScript brings it to JavaScript." } },
      { type: "text", content: { tr: "Java'da her değişkenin tipi açıkça belirtilir: int x = 5; String name = 'Ali'. TypeScript'te aynı şey: let x: number = 5; let name: string = 'Ali'. Fark: TypeScript genellikle tipi otomatik çıkarabilir (type inference) — her yere yazmak zorunda değilsin.", en: "Java requires explicit types: int x = 5; String name = 'Ali'. TypeScript is the same: let x: number = 5; let name: string = 'Ali'. Difference: TypeScript can usually infer the type automatically — you don't have to write it everywhere." } },
      { type: "code", language: "typescript", code: `// TypeScript Simple Types — Java Comparison
// Java:    int age = 25;
// TypeScript: let age: number = 25;  (or just: let age = 25)

let age: number = 25;          // number (int, float, double all combined)
let name: string = "Alice";    // string
let isActive: boolean = true;  // boolean
let score: number = 98.5;      // TypeScript number = Java double

// Type inference — TypeScript deduces type from value
let city = "Istanbul";         // TypeScript knows this is string
// city = 42;                  // ERROR: Type 'number' not assignable to type 'string'

// Type annotation vs inference
let explicitNum: number = 10;  // explicit annotation
let inferredNum = 10;          // inferred as number (same result)

// any — disables type checking (avoid in production!)
let anything: any = "hello";
anything = 42;                 // no error — but you lose type safety
anything = true;

// Function with typed params and return type
function greet(name: string, times: number): string {
  return (name + " ").repeat(times).trim();
}
console.log(greet("Hi", 3));   // Hi Hi Hi
// greet(42, "three");          // ERROR: wrong types` },
      { type: "editor", lang: "typescript", defaultCode: `// TypeScript catches errors at compile time
function calculateTax(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}

const total = calculateTax(100, 0.18);
console.log("Total with tax:", total);

// Try: change 100 to "100" — TypeScript will show an error
// const wrongTotal = calculateTax("100", 0.18);` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Basic Types" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Integer", java: "int x = 5;", typescript: "let x: number = 5;" },
        { concept: "Float", java: "double d = 3.14;", typescript: "let d: number = 3.14;" },
        { concept: "String", java: 'String s = "hi";', typescript: 'let s: string = "hi";' },
        { concept: "Boolean", java: "boolean b = true;", typescript: "let b: boolean = true;" },
        { concept: "No type", java: "Object o = anything;", typescript: "let o: any = anything;" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te hem integer hem float için hangi tip kullanılır?", en: "Which TypeScript type is used for both integers and floats?" }, options: [{ id: "a", text: "int" }, { id: "b", text: "float" }, { id: "c", text: "number" }, { id: "d", text: "numeric" }], correct: "c", explanation: { tr: "TypeScript'te 'number' tipi Java'daki int, long, double, float'un hepsini kapsar. Tek bir sayısal tip var. Java'da bu ayrım önemliydi — TypeScript'te yok.", en: "TypeScript's 'number' type covers Java's int, long, double, and float. There is only one numeric type. This distinction was important in Java — not in TypeScript." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te ondalıklı sayıları (decimal) saklamak için hangi veri tipi tercih edilir?",
            "en": "Which data type is preferred to store decimal numbers in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "decimal"
            },
            {
                  "id": "b",
                  "text": "float"
            },
            {
                  "id": "c",
                  "text": "number"
            },
            {
                  "id": "d",
                  "text": "double"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "TypeScript, tüm sayısal değerler (tam sayılar ve ondalıklı sayılar dahil) için sadece 'number' tipini kullanır. Farklı sayı tipleri tanımlamaya gerek yoktur.",
            "en": "TypeScript uses only the 'number' type for all numeric values, including both integers and floating-point numbers. There is no need to define distinct numeric types."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 2 — Special Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Special Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "⚠️", content: { tr: "Özel tipler, beklenmedik durumlar için. 'any' = her şey olabilir (kötü pratik), 'unknown' = bilinmiyor ama önce kontrol et, 'never' = bu kod asla çalışmaz, 'void' = fonksiyon bir şey döndürmez.", en: "Special types for unexpected situations. 'any' = can be anything (bad practice), 'unknown' = unknown but check first, 'never' = this code never runs, 'void' = function returns nothing." } },
      { type: "code", language: "typescript", code: `// TypeScript Special Types

// void — function returns nothing (like Java void)
function logMessage(msg: string): void {
  console.log("[LOG]", msg);
  // no return value
}

// null and undefined
let nullVal: null = null;
let undVal: undefined = undefined;

// any — escapes type checking (use sparingly)
let userInput: any = document.getElementById("input");  // from DOM
userInput = 42;         // no error

// unknown — safer than any: must type-check before use
function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase();    // safe: we checked the type
  }
  if (typeof input === "number") {
    return input.toFixed(2);       // safe: we checked the type
  }
  return String(input);            // fallback
}
console.log(processInput("hello"));  // HELLO
console.log(processInput(42.5));     // 42.50

// never — function that never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);         // never returns normally
}

// Type guard pattern (common in QA code)
function assertDefined<T>(val: T | null | undefined, name: string): T {
  if (val == null) throwError(\`\${name} is required but was \${val}\`);
  return val;
}` },
      { type: "editor", lang: "typescript", defaultCode: `// Practice unknown vs any
function parseAge(input: unknown): number {
  if (typeof input === "number") return input;
  if (typeof input === "string") {
    const parsed = parseInt(input);
    if (isNaN(parsed)) throw new Error("Invalid age: " + input);
    return parsed;
  }
  throw new Error("Cannot parse age from: " + typeof input);
}

console.log(parseAge(25));       // 25
console.log(parseAge("30"));    // 30
// console.log(parseAge(true)); // Error` },
      { type: "quiz", question: { tr: "TypeScript'te 'unknown' ve 'any' arasındaki temel fark nedir?", en: "What is the key difference between 'unknown' and 'any' in TypeScript?" }, options: [{ id: "a", text: { tr: "Hiçbir fark yok", en: "No difference" } }, { id: "b", text: { tr: "unknown kullanmadan önce tip kontrolü zorunlu, any'de değil", en: "unknown requires a type check before use, any does not" } }, { id: "c", text: { tr: "unknown sadece string için, any hepsi için", en: "unknown is only for strings, any is for everything" } }, { id: "d", text: { tr: "any daha güvenli", en: "any is safer" } }], correct: "b", explanation: { tr: "'unknown' tip kontrolü (typeof, instanceof) yapılmadan kullanılamaz. 'any' tip güvenliğini tamamen devre dışı bırakır. Production kodunda any yerine unknown tercih edilir.", en: "'unknown' cannot be used without a type check (typeof, instanceof). 'any' completely disables type safety. In production code, prefer unknown over any." } ,
        retryQuestion: {
      "question": {
            "tr": "Bir değişkene herhangi bir metodun uygulanmasını engelleyip tip güvenliğini zorunlu kılan 'any' alternatifi nedir?",
            "en": "What is the alternative to 'any' that forces type safety and prevents arbitrary method calls on a variable?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "never",
                        "en": "never"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "unknown",
                        "en": "unknown"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "object",
                        "en": "object"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "void",
                        "en": "void"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "'unknown' tipi, bir değişkenin üzerinde işlem yapmadan önce tip koruması (type narrowing) yapmanızı zorunlu kılarak güvenli bir kod yazmanıza olanak tanır. 'any' ise tüm tip kontrollerini atlar.",
            "en": "The 'unknown' type allows you to write safe code by forcing you to perform type narrowing before interacting with the variable, whereas 'any' bypasses all type checks."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 3 — Arrays
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Arrays", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "📚", content: { tr: "TypeScript array'i Java'nın typed ArrayList'i gibi. Java'da List<String> yazınca sadece String girebilirdin. TypeScript'te string[] yazarsan sadece string girebilirsin.", en: "TypeScript arrays are like Java's typed ArrayList. In Java, List<String> only accepts Strings. In TypeScript, string[] only accepts strings." } },
      { type: "code", language: "typescript", code: `// TypeScript Arrays — two syntax options (both work)
// Java: List<String> names = new ArrayList<>();
// TypeScript:
let names: string[] = ["Alice", "Bob", "Carol"];    // preferred syntax
let scores: Array<number> = [95, 87, 72, 98];       // generic syntax

// Typed array operations
names.push("Dave");           // OK: string
// names.push(42);            // ERROR: number not assignable to string

// Array of objects (common in QA test data)
interface TestCase {
  id: number;
  name: string;
  passed: boolean;
}

const testCases: TestCase[] = [
  { id: 1, name: "login_test", passed: true },
  { id: 2, name: "checkout_test", passed: false },
  { id: 3, name: "profile_test", passed: true },
];

// Filter, map, reduce — same as Java Stream API
const failedTests = testCases.filter(t => !t.passed);
const testNames = testCases.map(t => t.name);
const passCount = testCases.reduce((acc, t) => acc + (t.passed ? 1 : 0), 0);

console.log("Failed:", failedTests.length);    // 1
console.log("Names:", testNames);
console.log("Pass count:", passCount);          // 2

// readonly array — like Java unmodifiableList
const fixedList: readonly string[] = ["a", "b", "c"];
// fixedList.push("d");        // ERROR: readonly` },
      { type: "editor", lang: "typescript", defaultCode: `interface ApiEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requiresAuth: boolean;
}

const endpoints: ApiEndpoint[] = [
  { path: "/api/login", method: "POST", requiresAuth: false },
  { path: "/api/users", method: "GET", requiresAuth: true },
  { path: "/api/users/1", method: "DELETE", requiresAuth: true },
];

const publicEndpoints = endpoints.filter(e => !e.requiresAuth);
const paths = endpoints.map(e => \`\${e.method} \${e.path}\`);

console.log("Public endpoints:", publicEndpoints.length);
paths.forEach(p => console.log(p));` },
      { type: "quiz", question: { tr: "TypeScript'te string array nasıl tanımlanır?", en: "How do you declare a string array in TypeScript?" }, options: [{ id: "a", text: "let arr: Array<String>" }, { id: "b", text: "let arr: string[]" }, { id: "c", text: "let arr = String[]" }, { id: "d", text: "let arr: [string]" }], correct: "b", explanation: { tr: "string[] tercih edilen syntax'tır. Array<string> da çalışır. [string] ise tuple sözdizimi — tek elemanlı string tuple'ı tanımlar.", en: "string[] is the preferred syntax. Array<string> also works. [string] is tuple syntax — it defines a single-element string tuple." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te birden fazla sayı içeren bir diziyi tanımlamanın en yaygın yolu nedir?",
            "en": "What is the most common way to declare an array of numbers in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "let list: number[]"
            },
            {
                  "id": "b",
                  "text": "let list: Array<number>"
            },
            {
                  "id": "c",
                  "text": "let list = [number]"
            },
            {
                  "id": "d",
                  "text": "let list: List<number>"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "number[] syntax'ı TypeScript'te dizi tanımlamak için kullanılan en temiz ve yaygın yöntemdir. Array<number> da geçerlidir ancak genellikle kısa syntax tercih edilir.",
            "en": "The number[] syntax is the cleanest and most common way to define an array in TypeScript. Array<number> is also valid, but the shorter syntax is generally preferred."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 4 — Tuples
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Tuples", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🎁", content: { tr: "Tuple, sabit boyutlu ve her pozisyonun tipi bilinen bir dizi. 'İlk eleman her zaman isim (string), ikincisi yaş (number)' gibi. Java'da tam karşılığı yok — ama Python'da tuple var ve aynı mantık.", en: "A tuple is a fixed-size array where each position has a known type. 'First element is always name (string), second is age (number).' Java has no direct equivalent — but Python has tuples with the same idea." } },
      { type: "code", language: "typescript", code: `// TypeScript Tuples — fixed-length, typed by position
// Java has no direct equivalent (use a simple class instead)
// Python: (name, age) = ("Alice", 25)

// Basic tuple
let person: [string, number] = ["Alice", 25];
let [name, age] = person;               // destructuring
console.log(name, age);                 // Alice 25

// Tuple types prevent index errors
// person[0] = 42;                      // ERROR: number not assignable to string
// person[2] = "extra";                 // ERROR: index 2 out of bounds

// Named tuple elements (TypeScript 4.0+)
type TestResult = [testName: string, passed: boolean, durationMs: number];

const result: TestResult = ["login_test", true, 342];
console.log(result[0], result[1], result[2]);  // login_test true 342

// Tuple array — array of fixed-structure pairs
type KeyValue = [string, string];
const headers: KeyValue[] = [
  ["Content-Type", "application/json"],
  ["Authorization", "Bearer token123"],
  ["Accept", "application/json"],
];

headers.forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// Optional tuple element
type Point3D = [x: number, y: number, z?: number];
const p2d: Point3D = [10, 20];          // z is optional
const p3d: Point3D = [10, 20, 30];` },
      { type: "editor", lang: "typescript", defaultCode: `// Use tuples to represent test step results
type StepResult = [stepName: string, passed: boolean, ms: number];

function runStep(name: string, shouldPass: boolean): StepResult {
  const ms = Math.floor(Math.random() * 500) + 50;
  return [name, shouldPass, ms];
}

const steps: StepResult[] = [
  runStep("Navigate to login", true),
  runStep("Enter credentials", true),
  runStep("Click submit", true),
  runStep("Assert dashboard", false),  // simulated failure
];

const failed = steps.filter(([, passed]) => !passed);
console.log("Total steps:", steps.length);
console.log("Failed steps:", failed.length);
steps.forEach(([name, passed, ms]) => {
  console.log(\`  \${passed ? "✓" : "✗"} \${name} (\${ms}ms)\`);
});` },
      { type: "quiz", question: { tr: "let t: [string, number] = [42, 'hello'] neden hata verir?", en: "Why does let t: [string, number] = [42, 'hello'] cause an error?" }, options: [{ id: "a", text: { tr: "Tuple boş olmalı", en: "Tuple must be empty" } }, { id: "b", text: { tr: "Eleman sayısı hatalı", en: "Wrong number of elements" } }, { id: "c", text: { tr: "Tip sıralaması yanlış: ilk eleman string, ikinci number olmalı", en: "Type order is wrong: first must be string, second must be number" } }, { id: "d", text: { tr: "Tuple readonly olmalı", en: "Tuple must be readonly" } }], correct: "c", explanation: { tr: "[string, number] tuple'ında 0. pozisyon string, 1. pozisyon number olmalı. 42 number'dır, string değil. TypeScript her pozisyonun tipini kontrol eder.", en: "In [string, number] tuple, position 0 must be string, position 1 must be number. 42 is a number, not a string. TypeScript checks the type of each position." } ,
        retryQuestion: {
      "question": {
            "tr": "let user: [number, string] = ['John', 25] ataması neden derleme hatası verir?",
            "en": "Why does let user: [number, string] = ['John', 25] cause a compilation error?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Tuple uzunluğu çok fazla",
                        "en": "The tuple length is too long"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tuple elemanları değiştirilemez",
                        "en": "Tuple elements are immutable"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Tip uyumsuzluğu: ilk eleman number, ikinci string olmalı",
                        "en": "Type mismatch: first must be number, second must be string"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Tuple içerisinde farklı tipler bulunamaz",
                        "en": "Tuples cannot contain different types"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Tanımlanan [number, string] yapısında, indeks 0 mutlaka bir sayı (number), indeks 1 ise metin (string) olmalıdır. 'John' bir string olduğundan TypeScript tip hatası fırlatır.",
            "en": "In the defined [number, string] structure, index 0 must be a number and index 1 must be a string. Since 'John' is a string, TypeScript throws a type error."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 5 — Object Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Object Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "📋", content: { tr: "Object type, bir nesnenin içinde ne olması gerektiğini söyleyen sözleşme. 'Test sonucu için mutlaka ad, durum ve süre lazım' gibi. Java'da interface veya class ile yapılır.", en: "Object type is a contract saying what must be inside an object. 'A test result must have a name, status, and duration.' In Java, this is done with an interface or class." } },
      { type: "code", language: "typescript", code: `// TypeScript Object Types

// Inline object type annotation
function printTest(test: { name: string; passed: boolean; duration: number }): void {
  const icon = test.passed ? "✓" : "✗";
  console.log(\`\${icon} \${test.name} (\${test.duration}ms)\`);
}

printTest({ name: "login_test", passed: true, duration: 342 });

// Optional properties (Java: nullable fields)
type Config = {
  baseUrl: string;
  timeout?: number;         // optional — may be undefined
  retries?: number;
};

const cfg: Config = { baseUrl: "https://api.example.com" };
const cfgWithTimeout: Config = { baseUrl: "https://api.example.com", timeout: 5000 };

// Readonly properties
type ImmutableUser = {
  readonly id: number;      // like final in Java
  readonly email: string;
  role: string;             // mutable
};

const user: ImmutableUser = { id: 1, email: "alice@example.com", role: "admin" };
user.role = "user";         // OK: mutable
// user.id = 2;             // ERROR: Cannot assign to readonly property

// Index signatures — object with dynamic keys
type TestSuiteResults = {
  [testName: string]: "PASS" | "FAIL" | "SKIP";
};

const results: TestSuiteResults = {
  login_test: "PASS",
  checkout_test: "FAIL",
  profile_test: "SKIP",
};
console.log(results["login_test"]);  // PASS` },
      { type: "editor", lang: "typescript", defaultCode: `type ApiRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: unknown;
};

function describeRequest(req: ApiRequest): string {
  const hasBody = req.body !== undefined ? " with body" : "";
  const headerCount = req.headers ? Object.keys(req.headers).length : 0;
  return \`\${req.method} \${req.url}\${hasBody} (\${headerCount} headers)\`;
}

const loginReq: ApiRequest = {
  url: "/api/login",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: { email: "test@example.com", password: "secret" },
};

const listReq: ApiRequest = {
  url: "/api/users",
  method: "GET",
};

console.log(describeRequest(loginReq));
console.log(describeRequest(listReq));` },
      { type: "quiz", question: { tr: "TypeScript object type'ta '?' ile işaretlenmiş property ne anlama gelir?", en: "What does a '?' after a property name mean in a TypeScript object type?" }, options: [{ id: "a", text: { tr: "readonly", en: "readonly" } }, { id: "b", text: { tr: "Opsiyonel — tanımsız olabilir", en: "Optional — may be undefined" } }, { id: "c", text: { tr: "Null olamaz", en: "Cannot be null" } }, { id: "d", text: { tr: "Zorunlu alan", en: "Required field" } }], correct: "b", explanation: { tr: "'?' property'yi opsiyonel yapar — değer olmayabilir (undefined). Java'da @Nullable annotation'ına benzer. timeout?: number yazınca timeout veya undefined olabilir.", en: "'?' makes a property optional — the value may not be present (undefined). Similar to Java's @Nullable annotation. timeout?: number means it can be a number or undefined." } ,
        retryQuestion: {
      "question": {
            "tr": "Bir interface içerisinde bir property'nin sonuna eklenen ':' işaretinin anlamı nedir?",
            "en": "What does adding a ':' at the end of a property in an interface imply?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Property'nin sadece okuma modunda olduğunu belirtir",
                        "en": "Specifies that the property is read-only"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Property'nin zorunlu olmadığını, undefined olabileceğini belirtir",
                        "en": "Indicates the property is not required and can be undefined"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Property'nin mutlaka bir değer alması gerektiğini belirtir",
                        "en": "Ensures the property must always have a value"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Property'nin sadece fonksiyonlarda kullanılabileceğini belirtir",
                        "en": "Indicates the property can only be used in functions"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "TypeScript'te '?' işareti bir alanın opsiyonel olduğunu gösterir. Yani o alan nesnede bulunmasa bile derleme hatası oluşmaz ve değeri undefined olarak değerlendirilir.",
            "en": "In TypeScript, the '?' symbol indicates an optional field. This means if the field is missing in an object, no compilation error occurs and its value is treated as undefined."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 6 — Enums
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Enums", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🎯", content: { tr: "Enum, izin verilen değerlerin sabit listesi. 'Test durumu sadece PASS, FAIL veya SKIP olabilir — başka bir şey yazarsan hata alırsın.' Java'da enum zaten vardı — TypeScript'te de aynı mantık.", en: "An enum is a fixed list of allowed values. 'Test status can only be PASS, FAIL, or SKIP — write anything else and you get an error.' Java already had enums — TypeScript works the same way." } },
      { type: "text", content: { tr: "Java'da enum çok güçlü — method'u, field'ı olabilir. TypeScript'te numeric enum (0,1,2) ve string enum var. QA'de string enum tercih edilir çünkü debug edilmesi kolay: TestStatus.PASS = 'PASS' string değeri taşır.", en: "Java enums are powerful — they can have methods and fields. TypeScript has numeric enums (0,1,2) and string enums. In QA, string enums are preferred because they are easy to debug: TestStatus.PASS carries the string value 'PASS'." } },
      { type: "code", language: "typescript", code: `// TypeScript Enums — QA Test Status Example

// String enum (preferred in QA — readable in logs)
enum TestStatus {
  PASS = "PASS",      // value = string literal
  FAIL = "FAIL",
  SKIP = "SKIP",
  PENDING = "PENDING"
}

// Numeric enum (auto-increments from 0)
enum Priority {
  LOW,      // = 0
  MEDIUM,   // = 1
  HIGH,     // = 2
  CRITICAL  // = 3
}

interface TestCase {
  name: string;
  status: TestStatus;
  priority: Priority;
}

const tc: TestCase = {
  name: "login_test",
  status: TestStatus.PASS,   // type-safe: only PASS/FAIL/SKIP/PENDING allowed
  priority: Priority.HIGH,
};

console.log(tc.status);                 // PASS (string enum)
console.log(tc.priority);               // 2   (numeric enum)
console.log(Priority[2]);               // HIGH (reverse lookup works for numeric)

// Use in switch
function getStatusIcon(status: TestStatus): string {
  switch (status) {
    case TestStatus.PASS:    return "✅";
    case TestStatus.FAIL:    return "❌";
    case TestStatus.SKIP:    return "⏭️";
    case TestStatus.PENDING: return "⏳";
  }
}

console.log(getStatusIcon(TestStatus.FAIL));  // ❌` },
      { type: "editor", lang: "typescript", defaultCode: `enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

interface ApiCall {
  method: HttpMethod;
  endpoint: string;
  expectedStatus: StatusCode;
}

const apiTests: ApiCall[] = [
  { method: HttpMethod.GET, endpoint: "/api/users", expectedStatus: StatusCode.OK },
  { method: HttpMethod.POST, endpoint: "/api/users", expectedStatus: StatusCode.CREATED },
  { method: HttpMethod.DELETE, endpoint: "/api/users/1", expectedStatus: StatusCode.OK },
];

apiTests.forEach(t => {
  console.log(\`\${t.method} \${t.endpoint} → expected \${t.expectedStatus}\`);
});` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Enums" }, columns: ["Java", "TypeScript"], rows: [
        { concept: { tr: "Temel enum", en: "Basic enum" }, java: "enum Status { PASS, FAIL }", typescript: "enum Status { PASS = 'PASS', FAIL = 'FAIL' }" },
        { concept: { tr: "Metod", en: "Methods" }, java: "Can have methods/fields", typescript: "No methods (use namespace for that)" },
        { concept: { tr: "Kullanım", en: "Usage" }, java: "Status.PASS", typescript: "Status.PASS" },
        { concept: { tr: "Switch", en: "Switch" }, java: "switch(s) { case PASS: }", typescript: "switch(s) { case Status.PASS: }" },
      ]},
      { type: "quiz", question: { tr: "QA testlerinde string enum neden numeric enum'a tercih edilir?", en: "Why are string enums preferred over numeric enums in QA tests?" }, options: [{ id: "a", text: { tr: "Daha hızlı", en: "They are faster" } }, { id: "b", text: { tr: "Log ve debug'da değer okunabilir (PASS görürsün, 0 değil)", en: "Values are readable in logs and debug (you see PASS, not 0)" } }, { id: "c", text: { tr: "Daha az bellek kullanır", en: "They use less memory" } }, { id: "d", text: { tr: "Zorunlu — TypeScript'te numeric enum yok", en: "Required — TypeScript has no numeric enums" } }], correct: "b", explanation: { tr: "String enum'da TestStatus.PASS = 'PASS' — log dosyasında 'PASS' görürsün. Numeric enum'da TestStatus.PASS = 0 — log'da 0 görürsün, anlamak zor. QA araçlarında okunabilirlik önemli.", en: "With string enum, TestStatus.PASS = 'PASS' — you see 'PASS' in logs. With numeric enum, TestStatus.PASS = 0 — you see 0 in logs, hard to understand. Readability matters in QA tools." } ,
        retryQuestion: {
      "question": {
            "tr": "QA otomasyonunda neden tercih edilir: 'const Role = { ADMIN: \"ADMIN\", GUEST: \"GUEST\" }' gibi bir yapı yerine 'enum Role { ADMIN, GUEST }' yerine string tabanlı bir yapı kullanmak?",
            "en": "Why is it preferred in QA automation to use a string-based structure instead of 'enum Role { ADMIN, GUEST }'?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "String değerler bellekte daha az yer kaplar",
                        "en": "String values occupy less memory"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Hata ayıklama (debug) ve raporlama aşamasında değerlerin metin olarak okunabilir olması",
                        "en": "Better readability of values as text during debugging and reporting"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "String değerler daha hızlı karşılaştırılır",
                        "en": "String values are faster to compare"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Numeric enum'lar TypeScript tarafından desteklenmez",
                        "en": "Numeric enums are not supported by TypeScript"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "String tabanlı yapılar (veya string enum'lar), loglarda 'Role.ADMIN' değerini gördüğünüzde direkt 'ADMIN' metnini görmenizi sağlar. Numeric enum'lar ise sadece bir sayı gösterir, bu da test hata raporlarını anlamayı zorlaştırır.",
            "en": "String-based structures (or string enums) ensure that when you see 'Role.ADMIN' in logs, you see the text 'ADMIN'. Numeric enums show only numbers, which makes test error reports harder to interpret."
      }
}
},

      // ─── Interview Questions for Foundations ──────────────────────────────
      { type: "interview-questions", topic: "TypeScript Foundations", questions: [
        { level: "basic", q: { tr: "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?", en: "Why is TypeScript better than JavaScript? When should you prefer it?" }, a: { tr: "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.", en: "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts." } },
        { level: "basic", q: { tr: "TypeScript'te 'any' tipini neden kaçınmalısın?", en: "Why should you avoid the 'any' type in TypeScript?" }, a: { tr: "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.", en: "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety." } },
        { level: "intermediate", q: { tr: "TypeScript'te tuple ne zaman kullanılmalı?", en: "When should you use a tuple in TypeScript?" }, a: { tr: "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.", en: "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple." } },
      ]},
    ],
  },

  {
    title: "Intermediate TypeScript",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 7 — Aliases & Interfaces
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Aliases & Interfaces", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "📝", content: { tr: "Type alias, bir tip için kısayol isim. Interface, nesnelerin nasıl görünmesi gerektiğini tanımlayan sözleşme. İkisi de benzer görünür ama interface genişletilebilir — büyük projelerde interface tercih edilir.", en: "A type alias is a shortcut name for a type. An interface is a contract defining what an object must look like. Both look similar but interfaces are extendable — preferred in large projects." } },
      { type: "text", content: { tr: "Java'da interface çok önemli — OOP'un temeli. TypeScript'te interface benzer görevi görür ama daha basit. Type alias ise Java'daki typedef gibi. Temel kural: obje şekli için interface, union/intersection için type alias kullan.", en: "Java interfaces are central to OOP. TypeScript interfaces serve a similar role. Type aliases are like typedef in Java. General rule: use interface for object shapes, type alias for unions/intersections." } },
      { type: "code", language: "typescript", code: `// Type Alias — creates a new name for any type
type UserId = number;
type Status = "PASS" | "FAIL" | "SKIP";
type Callback = (msg: string) => void;

// Interface — defines object shape (like Java interface)
interface TestResult {
  testId: number;
  name: string;
  status: Status;
  duration: number;
}

// Interface extends — like Java extends
interface ExtendedResult extends TestResult {
  browserName: string;
  screenshots: string[];
}

const result: ExtendedResult = {
  testId: 1,
  name: "login_test",
  status: "PASS",
  duration: 342,
  browserName: "chrome",
  screenshots: ["step1.png", "step2.png"],
};
console.log(result.name, result.status, result.browserName);` },
      { type: "editor", lang: "typescript", defaultCode: `interface ApiTest {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  expectedStatus: number;
  auth?: boolean;
}

interface ApiTestResult extends ApiTest {
  actualStatus: number;
  passed: boolean;
  responseTimeMs: number;
}

const tests: ApiTest[] = [
  { name: "Get users", method: "GET", endpoint: "/api/users", expectedStatus: 200, auth: true },
  { name: "Login", method: "POST", endpoint: "/api/login", expectedStatus: 200 },
];

const results: ApiTestResult[] = tests.map(t => ({
  ...t,
  actualStatus: t.expectedStatus,
  passed: true,
  responseTimeMs: Math.floor(Math.random() * 500),
}));

results.forEach(r => console.log(
  (r.passed ? "PASS" : "FAIL") + " " + r.name + " (" + r.responseTimeMs + "ms)"
));` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Interfaces" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Define interface", java: "interface IUser { String email; }", typescript: "interface User { email: string; }" },
        { concept: "Implement", java: "class A implements IUser", typescript: "const a: User = { email: '...' }" },
        { concept: "Extend", java: "interface B extends A", typescript: "interface B extends A" },
        { concept: "Optional field", java: "@Nullable String field;", typescript: "field?: string;" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te interface ve type alias arasındaki önemli fark nedir?", en: "What is an important difference between interface and type alias in TypeScript?" }, options: [{ id: "a", text: { tr: "Interface sadece class için kullanılır", en: "Interface can only be used with classes" } }, { id: "b", text: { tr: "Interface extends edilebilir ve declaration merging destekler", en: "Interface supports extends and declaration merging; type alias cannot be reopened" } }, { id: "c", text: { tr: "Type alias daha hızlıdır", en: "Type aliases are faster" } }, { id: "d", text: { tr: "Hiçbir fark yok", en: "No difference" } }], correct: "b", explanation: { tr: "Interface 'declaration merging' destekler — aynı isimle iki interface tanımlarsan birleşirler. Type alias desteklemez. Bu nedenle kütüphane tiplerini genişletmek için interface tercih edilir.", en: "Interfaces support declaration merging — if you declare the same interface name twice, they merge. Type aliases cannot be reopened. This is why interfaces are preferred for extending library types." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te 'interface' ve 'type' kullanımı arasındaki temel farklardan biri hangisidir?",
            "en": "Which of the following is a key difference between using 'interface' and 'type' in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Type alias sadece fonksiyonlar için kullanılır",
                        "en": "Type alias is only used for functions"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Interface'ler 'declaration merging' (bildirim birleştirme) özelliğine sahiptir, type'lar ise sahip değildir",
                        "en": "Interfaces support declaration merging, whereas type aliases do not"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Interface kullanımı kodun çalışma zamanı (runtime) performansını artırır",
                        "en": "Using interfaces increases runtime performance"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Type alias'lar interface'lerden daha gelişmiş özelliklere sahiptir",
                        "en": "Type aliases have more advanced features than interfaces"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Declaration merging sayesinde, aynı isimle birden fazla kez tanımlanan interface'ler TypeScript tarafından otomatik olarak birleştirilir. Type alias'lar tekrar tanımlandığında hata verir ve birleştirilemez.",
            "en": "Declaration merging allows multiple interfaces with the same name to be automatically merged by TypeScript. Type aliases throw an error if re-declared and cannot be merged."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 8 — Union Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Union Types", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔀", content: { tr: "Union type, 'bu ya şu ya bu' demek. ID ya number ya string olabilir. Java'da bunu generic ya da overload ile yapardın — TypeScript daha zarif.", en: "A union type means 'this OR that.' An ID can be either a number or a string. In Java you'd use generics or overloads — TypeScript is more elegant." } },
      { type: "code", language: "typescript", code: `// Union Types — value can be one of multiple types
type TestStatus = "PASS" | "FAIL" | "SKIP";     // literal union

function formatId(id: string | number): string {
  if (typeof id === "number") {           // type narrowing
    return "TC-" + id.toString().padStart(4, "0");
  }
  return id.startsWith("TC-") ? id : "TC-" + id;
}
console.log(formatId(42));          // TC-0042
console.log(formatId("LOGIN-001")); // TC-LOGIN-001

// Discriminated union — best pattern for modeling variants
type ApiResponse =
  | { status: "success"; data: unknown; statusCode: 200 }
  | { status: "error"; message: string; statusCode: 400 | 401 | 404 | 500 };

function handleResponse(res: ApiResponse): void {
  if (res.status === "success") {
    console.log("Data:", res.data);
  } else {
    console.error("Error " + res.statusCode + ": " + res.message);
  }
}

handleResponse({ status: "success", data: { users: 5 }, statusCode: 200 });
handleResponse({ status: "error", message: "Not found", statusCode: 404 });` },
      { type: "editor", lang: "typescript", defaultCode: `// Model test events with discriminated union
type TestEvent =
  | { type: "start"; testName: string; timestamp: number }
  | { type: "pass"; testName: string; durationMs: number }
  | { type: "fail"; testName: string; errorMessage: string; durationMs: number }
  | { type: "skip"; testName: string; reason: string };

function logEvent(event: TestEvent): void {
  switch (event.type) {
    case "start":
      console.log("Starting: " + event.testName);
      break;
    case "pass":
      console.log("PASS: " + event.testName + " (" + event.durationMs + "ms)");
      break;
    case "fail":
      console.log("FAIL: " + event.testName + " — " + event.errorMessage);
      break;
    case "skip":
      console.log("SKIP: " + event.testName + " — " + event.reason);
      break;
  }
}

const events: TestEvent[] = [
  { type: "start", testName: "login_test", timestamp: Date.now() },
  { type: "pass", testName: "login_test", durationMs: 342 },
  { type: "fail", testName: "checkout_test", errorMessage: "Timeout", durationMs: 5000 },
  { type: "skip", testName: "payment_test", reason: "Feature not ready" },
];
events.forEach(logEvent);` },
      { type: "quiz", question: { tr: "TypeScript'te 'type narrowing' ne anlama gelir?", en: "What does 'type narrowing' mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Tipi daraltmak (kötü)", en: "Making the type smaller (bad thing)" } }, { id: "b", text: { tr: "typeof/instanceof kontrolleri sonrası TypeScript'in daha spesifik tip bilmesi", en: "TypeScript knowing a more specific type after typeof/instanceof checks" } }, { id: "c", text: { tr: "Tipi any'ye çevirmek", en: "Converting to any type" } }, { id: "d", text: { tr: "Union'dan bir tip kaldırmak", en: "Removing a type from a union" } }], correct: "b", explanation: { tr: "Type narrowing: typeof kontrolü sonrası TypeScript değişkenin tipini bilir. if (typeof x === 'number') içinde TypeScript x'in number olduğunu garanti eder.", en: "Type narrowing: after a typeof check, TypeScript knows the variable's specific type. Inside if (typeof x === 'number'), TypeScript guarantees x is a number." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te bir union tipinin (string | number) kesin bir tipe indirgenmesine ne ad verilir?",
            "en": "What is it called when a union type (string | number) is narrowed down to a specific type in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Type casting",
                        "en": "Type casting"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Type narrowing",
                        "en": "Type narrowing"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Type annotation",
                        "en": "Type annotation"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Type inference",
                        "en": "Type inference"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Type narrowing, kontrol akışı analizi (if/else, typeof, instanceof) kullanarak TypeScript'in değişkenin tipini daha dar bir kapsamda kesinleştirmesine verilen isimdir.",
            "en": "Type narrowing is the process of using control flow analysis (if/else, typeof, instanceof) to allow TypeScript to refine a variable's type to a more specific one."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 9 — Functions
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Functions", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "⚙️", content: { tr: "TypeScript fonksiyonları Java metodlarına çok benzer — ama daha kısa syntax. Parametre tipleri ve dönüş tipi belirtilir.", en: "TypeScript functions are very similar to Java methods — but with shorter syntax. Parameter types and return types are specified." } },
      { type: "code", language: "typescript", code: `// TypeScript Functions — all key patterns
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function createTestUser(
  email: string,
  role: "admin" | "user" = "user",    // default value
  active?: boolean                      // optional
): { email: string; role: string; active: boolean } {
  return { email, role, active: active ?? true };
}

console.log(JSON.stringify(createTestUser("alice@example.com")));
console.log(JSON.stringify(createTestUser("admin@example.com", "admin")));

// Rest parameters (like Java varargs)
function joinLogs(...messages: string[]): string {
  return messages.join(" | ");
}
console.log(joinLogs("PASS", "login", "342ms"));

// Function type
type Validator = (value: string) => boolean;

const isEmail: Validator = (v) => v.includes("@") && v.includes(".");
const isPhone: Validator = (v) => /^[0-9]{10,11}$/.test(v);

console.log(isEmail("test@example.com"));  // true
console.log(isPhone("05551234567"));       // true` },
      { type: "editor", lang: "typescript", defaultCode: `// Generic assertion helper with typed parameters
function assertEqual<T>(actual: T, expected: T, message?: string): void {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  const label = message ?? "assertEqual";
  const icon = passed ? "PASS" : "FAIL";
  console.log(icon + ": " + label);
  if (!passed) {
    console.log("  Expected: " + JSON.stringify(expected));
    console.log("  Actual:   " + JSON.stringify(actual));
  }
}

assertEqual(2 + 2, 4, "2+2=4");
assertEqual("hello".toUpperCase(), "HELLO", "toUpperCase");
assertEqual([1, 2, 3].length, 3, "array length");
assertEqual("test".includes("es"), false, "includes check"); // fails` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Functions" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Basic function", java: "public int add(int a, int b)", typescript: "function add(a: number, b: number): number" },
        { concept: "Arrow/lambda", java: "(a, b) -> a + b", typescript: "(a, b) => a + b" },
        { concept: "Default param", java: "Not supported (use overload)", typescript: "function f(x: number = 0)" },
        { concept: "Varargs", java: "void f(String... msgs)", typescript: "function f(...msgs: string[])" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te parametre sonundaki '?' ne anlama gelir?", en: "What does '?' at the end of a parameter name mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Parametre nullable", en: "Parameter is nullable" } }, { id: "b", text: { tr: "Parametre opsiyonel — undefined olabilir, geçilmeyebilir", en: "Parameter is optional — can be undefined, can be omitted" } }, { id: "c", text: { tr: "Parametre bir string", en: "Parameter is a string" } }, { id: "d", text: { tr: "Return type optional", en: "Return type is optional" } }], correct: "b", explanation: { tr: "function f(x?: number) yazınca x hem number hem undefined olabilir ve çağırırken geçilmeyebilir. f() ve f(42) ikisi de geçerli.", en: "function f(x?: number) means x can be number or undefined, and can be omitted. f() and f(42) are both valid." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript fonksiyon parametresinde kullanılan '?' işareti neyi ifade eder?",
            "en": "What does the '?' symbol represent in a TypeScript function parameter?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Parametrenin tipinin kesinlikle bilinmediği",
                        "en": "The parameter type is unknown"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Parametrenin opsiyonel olduğu ve eksik gönderilebileceği",
                        "en": "The parameter is optional and can be omitted"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Parametrenin zorunlu olduğu",
                        "en": "The parameter is mandatory"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Parametrenin sadece null değer alabileceği",
                        "en": "The parameter can only accept null"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Parametre isminin sonuna eklenen '?', ilgili parametrenin çağrı sırasında gönderilmesinin zorunlu olmadığını belirtir. Gönderilmediğinde değeri 'undefined' olur.",
            "en": "The '?' added to a parameter name indicates that the parameter is not required during the function call. If it is omitted, its value will be 'undefined'."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 10 — Casting
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Casting", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔄", content: { tr: "Casting, TypeScript'e 'Biliyorum bu any tipinde görünüyor ama aslında string — güven bana' demek. 'as' keyword'ü kullanılır. Java'daki (String) obj gibi.", en: "Casting tells TypeScript 'I know this looks like any but it is actually a string — trust me.' Uses the 'as' keyword. Like (String) obj in Java." } },
      { type: "code", language: "typescript", code: `// TypeScript Casting (Type Assertions)
// as keyword — tells TypeScript what type to treat a value as
// NOTE: no actual runtime conversion — purely compile-time hint

interface User {
  id: number;
  email: string;
  role: string;
}

// Casting from unknown (common with API responses)
function toUser(raw: unknown): User | null {
  if (
    typeof raw === "object" && raw !== null &&
    "id" in raw && "email" in raw && "role" in raw
  ) {
    return raw as User;      // safe: we checked the shape
  }
  return null;
}

const apiData: unknown = { id: 1, email: "alice@example.com", role: "admin" };
const user = toUser(apiData);
if (user) {
  console.log("User:", user.email, user.role);
}

// DOM casting (when working in browsers)
// const input = document.getElementById("username") as HTMLInputElement;
// input.value  — works because TypeScript now knows it's HTMLInputElement

// Danger: double casting bypasses safety (avoid!)
const a: string = "hello";
const b = a as unknown as number;  // compiles, but bad practice
console.log(typeof b);             // "string" — cast did NOT convert!` },
      { type: "editor", lang: "typescript", defaultCode: `interface Config {
  baseUrl: string;
  timeout: number;
  retries: number;
}

function parseConfig(raw: unknown): Config {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Config must be an object");
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.baseUrl !== "string") throw new Error("baseUrl must be string");
  if (typeof obj.timeout !== "number") throw new Error("timeout must be number");
  if (typeof obj.retries !== "number") throw new Error("retries must be number");
  return obj as unknown as Config;
}

const valid = { baseUrl: "https://api.example.com", timeout: 5000, retries: 3 };
const parsed = parseConfig(valid);
console.log("Config: " + parsed.baseUrl + ", timeout: " + parsed.timeout);` },
      { type: "quiz", question: { tr: "TypeScript'te 'as' keyword'ü ne yapar?", en: "What does the 'as' keyword do in TypeScript?" }, options: [{ id: "a", text: { tr: "Değeri gerçekten dönüştürür", en: "Actually converts the value" } }, { id: "b", text: { tr: "TypeScript'e tip hakkında bilgi verir — runtime'da etkisi yok", en: "Tells TypeScript about the type — no effect at runtime" } }, { id: "c", text: { tr: "Null kontrolü yapar", en: "Performs a null check" } }, { id: "d", text: { tr: "Değeri clone'lar", en: "Clones the value" } }], correct: "b", explanation: { tr: "'as' compile-time'da TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java'daki (String) obj gerçekten cast eder. TypeScript'te 'as' yanlış tipte kullanılsa bile runtime'da ClassCastException atmaz.", en: "'as' tells TypeScript the type at compile-time — nothing happens at runtime. Java's (String) obj actually converts. TypeScript 'as' with a wrong type causes wrong behavior at runtime, not an explicit crash." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te 'type assertion' (as) kullanımı için aşağıdakilerden hangisi doğrudur?",
            "en": "Which of the following is true regarding the use of 'type assertion' (as) in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Runtime sırasında değeri yeniden formatlar",
                        "en": "It re-formats the value during runtime"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Derleyiciye tipi belirtir, ancak çıktı kodunda dönüşüm (cast) kodu üretmez",
                        "en": "It tells the compiler the type, but generates no conversion code in the output"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Hata oluşmaması için değerin tipini otomatik olarak değiştirir",
                        "en": "It automatically changes the value type to prevent errors"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece nesneler üzerinde çalışır",
                        "en": "It only works on objects"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Type assertion (as), sadece TypeScript'in derleme zamanındaki (compile-time) tip kontrol mekanizmasını etkiler. Çıktı olarak üretilen JavaScript dosyasında herhangi bir tip dönüşümü (type casting) işlemi gerçekleştirilmez.",
            "en": "Type assertion (as) only affects TypeScript's compile-time type checking mechanism. It does not perform any actual type casting or transformation in the resulting JavaScript code."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 11 — Classes
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Classes", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🏗️", content: { tr: "TypeScript class'ları Java class'larına çok benzer ama daha kısa syntax. Java'da field tanımla, constructor'da this.field = value yaz. TypeScript'te constructor parametresine 'public' yaz — ikisi birden yapılır.", en: "TypeScript classes are very similar to Java classes but with shorter syntax. In Java, declare field, then write this.field = value. In TypeScript, add 'public' to constructor parameters — it does both at once." } },
      { type: "code", language: "typescript", code: `// TypeScript Classes — constructor shorthand
class User {
  constructor(
    public readonly id: number,       // public + readonly in one line!
    public email: string,
    private role: string = "user",    // private with default
  ) {}

  getRole(): string { return this.role; }

  toString(): string {
    return "User(" + this.id + ": " + this.email + ", " + this.role + ")";
  }
}

// Inheritance
class AdminUser extends User {
  constructor(id: number, email: string, private permissions: string[]) {
    super(id, email, "admin");
  }

  hasPermission(perm: string): boolean {
    return this.permissions.includes(perm);
  }
}

const u = new User(1, "alice@example.com");
const admin = new AdminUser(2, "admin@example.com", ["delete", "manage"]);

console.log(u.toString());
console.log(admin.toString());
console.log(admin.hasPermission("delete"));   // true

// Abstract class
abstract class BaseTest {
  abstract run(): void;
  log(msg: string): void { console.log("[TEST] " + msg); }
}

class LoginTest extends BaseTest {
  run(): void { this.log("Running login test"); }
}
new LoginTest().run();` },
      { type: "editor", lang: "typescript", defaultCode: `class TestSuite {
  private tests: Array<{ name: string; fn: () => boolean }> = [];

  constructor(public readonly name: string) {}

  addTest(name: string, fn: () => boolean): this {
    this.tests.push({ name, fn });
    return this;
  }

  run(): { passed: number; failed: number; total: number } {
    let passed = 0, failed = 0;
    for (const test of this.tests) {
      const ok = test.fn();
      console.log("  " + (ok ? "PASS" : "FAIL") + " " + test.name);
      if (ok) passed++; else failed++;
    }
    return { passed, failed, total: this.tests.length };
  }
}

const suite = new TestSuite("Math Tests")
  .addTest("2+2=4", () => 2 + 2 === 4)
  .addTest("5>3", () => 5 > 3)
  .addTest("string check", () => typeof "hello" === "string")
  .addTest("intentional fail", () => 1 === 2);

console.log("Suite: " + suite.name);
const res = suite.run();
console.log("Result: " + res.passed + "/" + res.total + " passed");` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Classes" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Field + constructor", java: "String x; MyClass(String x) { this.x = x; }", typescript: "constructor(public x: string) {} (one line!)" },
        { concept: "Access modifiers", java: "public, protected, private, default", typescript: "public, protected, private" },
        { concept: "Readonly", java: "final String x;", typescript: "readonly x: string;" },
        { concept: "Abstract", java: "abstract class A { abstract void run(); }", typescript: "abstract class A { abstract run(): void; }" },
      ]},
      { type: "quiz", question: { tr: "TypeScript constructor parametresinde 'public' yazmanın avantajı nedir?", en: "What is the advantage of writing 'public' in a TypeScript constructor parameter?" }, options: [{ id: "a", text: { tr: "Hiç avantajı yok", en: "No advantage" } }, { id: "b", text: { tr: "Field tanımlama ve atamayı tek satırda yapar", en: "Defines and assigns the field in one line (Java's 2 steps become 1)" } }, { id: "c", text: { tr: "Performansı artırır", en: "Improves performance" } }, { id: "d", text: { tr: "Sadece string için çalışır", en: "Only works for strings" } }], correct: "b", explanation: { tr: "Java'da: 'String email; MyClass(String email) { this.email = email; }' — 2 adım. TypeScript'te: 'constructor(public email: string)' — 1 adım. Constructor shorthand field tanımlamayı ve atamayı aynı anda yapar.", en: "In Java: field declaration + constructor assignment = 2 steps. In TypeScript: 'constructor(public email: string)' = 1 step. Constructor shorthand defines and assigns simultaneously." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te 'Parameter Properties' kullanarak 'private name: string' ifadesini constructor içinde tanımlamanın sonucu nedir?",
            "en": "What is the result of defining 'private name: string' inside a constructor using 'Parameter Properties' in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece metodun kapsamı içinde geçerli bir değişken oluşturur",
                        "en": "It creates a variable scoped only to the method"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Hem sınıf içinde bir 'field' tanımlar hem de constructor parametresini bu field'a atar",
                        "en": "It declares a class field and assigns the constructor parameter to that field simultaneously"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Değişkenin değerini salt okunur (readonly) yapar",
                        "en": "It makes the variable readonly"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Hata verir, çünkü private fieldlar constructor içinde tanımlanamaz",
                        "en": "It throws an error because private fields cannot be defined in a constructor"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "TypeScript'in sunduğu 'Parameter Properties' özelliği, constructor parametrelerinde erişim belirleyicileri (public, private, protected) kullanarak, ayrı bir field tanımlamadan sınıf üyesinin doğrudan başlatılmasını sağlar.",
            "en": "TypeScript's 'Parameter Properties' feature allows you to declare and initialize a class member directly in the constructor by adding an access modifier (public, private, protected) to the parameter."
      }
}
},

      // ─── Interview Questions ──────────────────────────────────────────────
      { type: "interview-questions", topic: "TypeScript Intermediate", questions: [
        { level: "basic", q: { tr: "TypeScript'te interface ve type alias ne zaman kullanılır?", en: "When do you use interface vs type alias in TypeScript?" }, a: { tr: "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.", en: "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias." } },
        { level: "intermediate", q: { tr: "Discriminated union nedir? QA'de nasıl kullanılır?", en: "What is a discriminated union? How is it used in QA?" }, a: { tr: "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.", en: "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields." } },
        { level: "advanced", q: { tr: "TypeScript 'private' Java 'private'den nasıl farklı?", en: "How does TypeScript 'private' differ from Java 'private'?" }, a: { tr: "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.", en: "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax." } },
      ]},
    ],
  },

  {
    title: "Advanced TypeScript",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 12 — Basic Generics
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Basic Generics", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🧩", content: { tr: "Generic, doldurulabilir şablon gibi. 'Liste' diyorsun ama ne listesi? Sayı listesi mi, isim listesi mi? Tip parametresi ile sonradan belirtiyorsun. Java'daki List<T> ile aynı mantık.", en: "A generic is like a fill-in-the-blank template. 'A list' — but a list of what? Numbers? Names? You specify the type later with a type parameter. Same concept as Java's List<T>." } },
      { type: "text", content: { tr: "Java'da generics: ArrayList<String>, Map<String, Integer>. TypeScript'te aynı şey: Array<string>, Map<string, number>. Fonksiyon generic'leri: function identity<T>(x: T): T. Java'dan zaten tanıdık — sözdizimi biraz farklı.", en: "Java generics: ArrayList<String>, Map<String, Integer>. TypeScript is the same: Array<string>, Map<string, number>. Function generics: function identity<T>(x: T): T. Already familiar from Java — just slightly different syntax." } },
      { type: "code", language: "typescript", code: `// TypeScript Generics — reusable code with type safety

// Generic function — like Java <T> method
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("hello"));  // hello
console.log(identity<number>(42));       // 42
// TypeScript infers T automatically: identity("hello")

// Generic container — like Java class Box<T>
class Box<T> {
  constructor(private value: T) {}
  get(): T { return this.value; }
  toString(): string { return "Box(" + String(this.value) + ")"; }
}

const strBox = new Box<string>("TypeScript");
const numBox = new Box<number>(42);
console.log(strBox.toString());    // Box(TypeScript)
console.log(numBox.toString());    // Box(42)

// Generic with constraint — like Java <T extends Comparable<T>>
function findMax<T extends { value: number }>(items: T[]): T {
  return items.reduce((max, item) => item.value > max.value ? item : max);
}

const tests = [
  { name: "login", value: 342 },
  { name: "checkout", value: 891 },
  { name: "profile", value: 215 },
];
const slowest = findMax(tests);
console.log("Slowest:", slowest.name, slowest.value + "ms");` },
      { type: "editor", lang: "typescript", defaultCode: `// Generic Result type — common QA pattern
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseJSON<T>(raw: string): Result<T> {
  try {
    const data = JSON.parse(raw) as T;
    return { success: true, data };
  } catch (e) {
    return { success: false, error: "Invalid JSON: " + String(e) };
  }
}

interface User { id: number; email: string; }

const good = parseJSON<User>('{"id": 1, "email": "alice@example.com"}');
const bad = parseJSON<User>("not json");

if (good.success) console.log("User:", good.data.email);
if (!bad.success) console.log("Error:", bad.error);` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Generics" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Generic class", java: "class Box<T> { T get() {...} }", typescript: "class Box<T> { get(): T {...} }" },
        { concept: "Generic method", java: "<T> T identity(T x)", typescript: "function identity<T>(x: T): T" },
        { concept: "Constraint", java: "<T extends Comparable<T>>", typescript: "<T extends { compareTo: (a: T) => number }>" },
        { concept: "Multiple params", java: "Map<K, V>", typescript: "Map<K, V> / function f<K, V>" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te <T extends { length: number }> ne anlama gelir?", en: "What does <T extends { length: number }> mean in TypeScript generics?" }, options: [{ id: "a", text: { tr: "T sadece number olabilir", en: "T can only be a number" } }, { id: "b", text: { tr: "T, 'length' adında number özelliği olan herhangi bir tip olabilir", en: "T can be any type that has a 'length' property of type number" } }, { id: "c", text: { tr: "T bir array olmak zorunda", en: "T must be an array" } }, { id: "d", text: { tr: "T'nin uzunluğu belirtiliyor", en: "The length of T is being specified" } }], correct: "b", explanation: { tr: "Generic constraint ile T'nin hangi özelliklere sahip olması gerektiği belirtilir. string, array, hatta { length: number } olan herhangi bir obje T olabilir. Java'daki <T extends Comparable<T>> gibi.", en: "Generic constraints specify what properties T must have. string, array, or any object with { length: number } can be T. Similar to Java's <T extends Comparable<T>>." } ,
        retryQuestion: {
      "question": {
            "tr": "Generic bir yapıda <T extends { id: string }> kısıtlaması neyi garanti eder?",
            "en": "What does the constraint <T extends { id: string }> guarantee in a generic structure?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "T'nin sadece 'id' adında bir string olması gerektiğini",
                        "en": "That T must only be a string named 'id'"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "T'nin en azından 'id' isminde string tipinde bir özelliği olan bir yapı olduğunu",
                        "en": "That T must be a structure that has at least a string property named 'id'"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "T'nin bir ID veritabanı ile eşleştiğini",
                        "en": "That T is mapped to an ID database"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "T'nin mutlaka bir class instance olduğunu",
                        "en": "That T must be a class instance"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Bu kısıtlama, Generic tipin (T) en azından belirtilen nesne yapısına (interface veya object shape) sahip olması gerektiğini zorunlu kılar. T bu yapıya sahip olan herhangi bir tip (obje, class vb.) olabilir.",
            "en": "This constraint forces the Generic type (T) to have at least the specified object shape. T can be any type (object, class, etc.) as long as it includes a property named 'id' of type string."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 13 — Utility Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Utility Types", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🔧", content: { tr: "Utility types, hazır tip dönüştürücüler. Bir tipin tüm alanlarını opsiyonel yap (Partial), sadece belirli alanları al (Pick), bir alanı çıkar (Omit). Java'da bunları manuel yapardın.", en: "Utility types are ready-made type transformers. Make all fields optional (Partial), pick specific fields (Pick), remove a field (Omit). In Java you'd do these manually." } },
      { type: "code", language: "typescript", code: `// TypeScript Utility Types — powerful type transformations

interface TestCase {
  id: number;
  name: string;
  status: "PASS" | "FAIL" | "SKIP";
  duration: number;
  tags: string[];
}

// Partial — all fields optional (useful for updates)
type PartialTestCase = Partial<TestCase>;
const update: PartialTestCase = { status: "PASS" };  // only some fields

// Required — all fields required (reverse of Partial)
// Pick — select specific fields only
type TestSummary = Pick<TestCase, "id" | "name" | "status">;
const summary: TestSummary = { id: 1, name: "login", status: "PASS" };

// Omit — remove specific fields
type TestWithoutId = Omit<TestCase, "id">;

// Readonly — make all fields readonly
type ImmutableTest = Readonly<TestCase>;

// Record — create key-value map type
type TestResults = Record<string, "PASS" | "FAIL" | "SKIP">;
const results: TestResults = {
  login_test: "PASS",
  checkout_test: "FAIL",
};

// ReturnType — get return type of a function
function createUser() { return { id: 1, email: "a@b.com" }; }
type UserType = ReturnType<typeof createUser>;  // { id: number; email: string }

// Practical: build update payload type
function updateTest(id: number, changes: Partial<Omit<TestCase, "id">>): void {
  console.log("Updating test " + id + ":", JSON.stringify(changes));
}
updateTest(1, { status: "PASS", duration: 342 });` },
      { type: "editor", lang: "typescript", defaultCode: `interface Config {
  baseUrl: string;
  timeout: number;
  retries: number;
  apiKey: string;
  debug: boolean;
}

// Use utility types to create derived types
type PublicConfig = Omit<Config, "apiKey">;  // hide secret key
type PartialUpdate = Partial<Config>;         // all optional for PATCH
type RequiredCore = Required<Pick<Config, "baseUrl" | "timeout">>;  // subset required

const baseConfig: RequiredCore = { baseUrl: "https://api.example.com", timeout: 5000 };
const publicView: PublicConfig = { baseUrl: "https://api.example.com", timeout: 5000, retries: 3, debug: false };
const patchPayload: PartialUpdate = { timeout: 10000 };

console.log("Base:", JSON.stringify(baseConfig));
console.log("Public:", JSON.stringify(publicView));
console.log("Patch:", JSON.stringify(patchPayload));` },
      { type: "quiz", question: { tr: "TypeScript'te Partial<T> ne yapar?", en: "What does Partial<T> do in TypeScript?" }, options: [{ id: "a", text: { tr: "T'nin tüm alanlarını siler", en: "Removes all fields from T" } }, { id: "b", text: { tr: "T'nin tüm alanlarını opsiyonel (?) yapar", en: "Makes all fields of T optional (?)" } }, { id: "c", text: { tr: "T'nin sadece kısmi alanlarını seçer", en: "Selects only some fields of T" } }, { id: "d", text: { tr: "T'yi readonly yapar", en: "Makes T readonly" } }], correct: "b", explanation: { tr: "Partial<T> tüm alanları opsiyonel yapar. PATCH endpoint'lerinde sadece değişen alanları göndermek için idealdir. Java'da bu tipi manuel olarak oluşturman gerekirdi.", en: "Partial<T> makes all fields optional. Ideal for PATCH endpoints where you only send changed fields. In Java you'd have to create this type manually." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te Required<T> ne yapar?",
            "en": "What does Required<T> do in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "T'nin tüm opsiyonel alanlarını zorunlu hale getirir",
                        "en": "Makes all optional fields of T required"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "T'yi stringe çevirir",
                        "en": "Converts T to a string"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "T içindeki tüm metotları kaldırır",
                        "en": "Removes all methods from T"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "T'yi sadece okunur yapar",
                        "en": "Makes T read-only"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Required<T>, Partial<T>'nin tam tersidir; tüm özelliklerin opsiyonel işaretlerini (?) kaldırarak onları zorunlu kılar. Veri doğrulama senaryolarında tüm alanların doldurulmasını garantilemek için kullanılır.",
            "en": "Required<T> is the inverse of Partial<T>; it removes the optional flags (?) from all properties, making them mandatory. It is useful in validation scenarios to ensure all fields are provided."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 14 — Keyof
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Keyof", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🔑", content: { tr: "keyof, bir nesnenin tüm anahtar isimlerini tip olarak alır. 'Bu fonksiyon TestCase'in herhangi bir alanı ile çağrılabilir, ama sadece gerçek alan isimleriyle' — TypeScript bunu garantiler.", en: "keyof gets all the key names of an object as a type. 'This function can be called with any field of TestCase, but only with real field names' — TypeScript guarantees this." } },
      { type: "code", language: "typescript", code: `// keyof — get all keys of a type as a union
interface TestCase {
  id: number;
  name: string;
  status: "PASS" | "FAIL" | "SKIP";
  duration: number;
}

type TestCaseKeys = keyof TestCase;  // "id" | "name" | "status" | "duration"

// Practical use: type-safe property accessor
function getField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const tc: TestCase = { id: 1, name: "login_test", status: "PASS", duration: 342 };
console.log(getField(tc, "name"));      // "login_test" — TypeScript knows type is string
console.log(getField(tc, "duration"));  // 342 — TypeScript knows type is number
// getField(tc, "invalid");             // ERROR: "invalid" not in keyof TestCase

// Sort array by any field — type-safe
function sortBy<T>(items: T[], key: keyof T): T[] {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

const tests: TestCase[] = [
  { id: 3, name: "profile", status: "PASS", duration: 215 },
  { id: 1, name: "login", status: "PASS", duration: 342 },
  { id: 2, name: "checkout", status: "FAIL", duration: 891 },
];

const byName = sortBy(tests, "name");
const byDuration = sortBy(tests, "duration");
console.log(byName.map(t => t.name));      // ["checkout", "login", "profile"]
console.log(byDuration.map(t => t.name));  // ["profile", "login", "checkout"]` },
      { type: "editor", lang: "typescript", defaultCode: `interface User {
  id: number;
  email: string;
  role: "admin" | "user";
  active: boolean;
}

// Build a type-safe filter function using keyof
function filterBy<T>(
  items: T[],
  key: keyof T,
  value: T[keyof T]
): T[] {
  return items.filter(item => item[key] === value);
}

const users: User[] = [
  { id: 1, email: "alice@example.com", role: "admin", active: true },
  { id: 2, email: "bob@example.com", role: "user", active: true },
  { id: 3, email: "carol@example.com", role: "user", active: false },
  { id: 4, email: "dave@example.com", role: "admin", active: false },
];

const admins = filterBy(users, "role", "admin");
const activeUsers = filterBy(users, "active", true);

console.log("Admins:", admins.map(u => u.email));
console.log("Active:", activeUsers.map(u => u.email));` },
      { type: "quiz", question: { tr: "keyof TestCase nedir? interface TestCase { id: number; name: string; }", en: "What is keyof TestCase if interface TestCase { id: number; name: string; }?" }, options: [{ id: "a", text: 'number | string' }, { id: "b", text: '"id" | "name"' }, { id: "c", text: '{ id: number; name: string }' }, { id: "d", text: 'TestCase' }], correct: "b", explanation: { tr: "keyof, nesnenin anahtar isimlerini string literal union olarak döner. TestCase için keyof = 'id' | 'name'. Java'da böyle bir built-in operatör yok — reflection ile benzer şeyler yapılır.", en: "keyof returns the key names as a string literal union. For TestCase, keyof = 'id' | 'name'. Java has no built-in equivalent — similar things are done with reflection." } ,
        retryQuestion: {
      "question": {
            "tr": "interface User { email: string; age: number; } yapısında keyof User ifadesi ne döndürür?",
            "en": "What does keyof User return for the interface User { email: string; age: number; }?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "string | number"
            },
            {
                  "id": "b",
                  "text": "\"email\" | \"age\""
            },
            {
                  "id": "c",
                  "text": "{ email: string; age: number }"
            },
            {
                  "id": "d",
                  "text": "User"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "keyof operatörü, bir arayüzün tüm anahtar isimlerini union tipi olarak alır. Bu durumda 'email' veya 'age' anahtarları elde edilir. Otomasyon kodlarında dinamik özellik erişimi için çok güçlüdür.",
            "en": "The keyof operator retrieves all key names of an interface as a union type. In this case, it results in 'email' or 'age'. It is very powerful for dynamic property access in automation scripts."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 15 — Null (Null Safety)
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Null Safety", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🚫", content: { tr: "TypeScript null hataları derleme sırasında yakalar. Java'da NullPointerException çalışma sırasında patlardı — TypeScript bunu derlerken söyler. strictNullChecks açıksa, null/undefined kontrolü yapmadan değer kullanman engellenir.", en: "TypeScript catches null errors at compile time. Java's NullPointerException would crash at runtime — TypeScript warns you during compilation. With strictNullChecks enabled, you cannot use a value without checking for null/undefined first." } },
      { type: "code", language: "typescript", code: `// TypeScript Null Safety with strictNullChecks
// (tsconfig.json: "strictNullChecks": true)

// Nullable types — must be explicit
let name: string | null = null;   // string OR null
let age: number | undefined;      // number or undefined (not initialized)

// Optional chaining — safe navigation (like Java ?. or Kotlin ?.))
interface User {
  id: number;
  profile?: {           // profile may not exist
    email: string;
    phone?: string;     // phone may not exist
  };
}

function getPhone(user: User): string {
  return user.profile?.phone ?? "No phone";  // ?. + ?? operator
}

const u1: User = { id: 1, profile: { email: "a@b.com", phone: "555-1234" } };
const u2: User = { id: 2 };  // no profile
console.log(getPhone(u1));   // 555-1234
console.log(getPhone(u2));   // No phone

// Nullish coalescing ?? vs || difference
const zero = 0;
console.log(zero || "default");   // "default" — 0 is falsy!
console.log(zero ?? "default");   // 0 — ?? only checks null/undefined

// Non-null assertion operator ! (use carefully)
function getLength(s: string | null): number {
  return s!.length;   // tells TypeScript: "I guarantee s is not null"
  // But if s IS null at runtime → crash! Use only when absolutely certain
}

// Safer approach: type guard
function safeLength(s: string | null | undefined): number {
  return s?.length ?? 0;
}` },
      { type: "editor", lang: "typescript", defaultCode: `// Practice null-safe API response handling
interface ApiUser {
  id: number;
  name: string;
  email?: string;
  address?: {
    city: string;
    country?: string;
  };
}

function formatUser(user: ApiUser | null): string {
  if (user === null) return "No user";
  const email = user.email ?? "No email";
  const city = user.address?.city ?? "Unknown city";
  const country = user.address?.country ?? "Unknown country";
  return user.name + " | " + email + " | " + city + ", " + country;
}

const fullUser: ApiUser = {
  id: 1, name: "Alice", email: "alice@example.com",
  address: { city: "Istanbul", country: "Turkey" }
};
const partialUser: ApiUser = { id: 2, name: "Bob" };

console.log(formatUser(fullUser));
console.log(formatUser(partialUser));
console.log(formatUser(null));` },
      { type: "quiz", question: { tr: "TypeScript'te '??' ve '||' operatörleri arasındaki fark nedir?", en: "What is the difference between '??' and '||' operators in TypeScript?" }, options: [{ id: "a", text: { tr: "Hiçbir fark yok", en: "No difference" } }, { id: "b", text: { tr: "?? sadece null/undefined'ı kontrol eder, || 0, '', false'ı da falsy sayar", en: "?? only checks for null/undefined, while || also treats 0, '', false as falsy" } }, { id: "c", text: { tr: "|| daha güvenli", en: "|| is safer" } }, { id: "d", text: { tr: "?? sadece TypeScript'te var, JS'de yok", en: "?? only exists in TypeScript, not JS" } }], correct: "b", explanation: { tr: "0 || 'default' = 'default' (0 falsy). 0 ?? 'default' = 0 (0 null/undefined değil). QA testlerinde sıfır değer kontrol ediyorsanız ?? kullanın — || sıfırı da default'a düşürür.", en: "0 || 'default' = 'default' (0 is falsy). 0 ?? 'default' = 0 (0 is not null/undefined). In QA tests checking for zero values, use ?? — || would incorrectly treat 0 as missing." } ,
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki kodun çıktısı nedir? const val = false || 'Test'; const result = false ?? 'Test';",
            "en": "What is the output of the following code: const val = false || 'Test'; const result = false ?? 'Test';"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "val = 'Test', result = 'Test'",
                        "en": "val = 'Test', result = 'Test'"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "val = false, result = false",
                        "en": "val = false, result = false"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "val = 'Test', result = false",
                        "en": "val = 'Test', result = false"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "val = false, result = 'Test'",
                        "en": "val = false, result = 'Test'"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "|| operatörü 'false' değerini falsy olarak kabul edip sağ tarafa geçer. ?? operatörü ise sadece null veya undefined durumunda sağ tarafa geçer; false değeri null/undefined olmadığı için korunur.",
            "en": "The || operator treats 'false' as falsy and proceeds to the right side. The ?? operator only proceeds to the right side if the value is null or undefined; since false is neither, it is preserved."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 16 — Definitely Typed
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Definitely Typed & @types Packages", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "📦", content: { tr: "@types paketi, bir JavaScript kütüphanesinin TypeScript rehber kitabı gibidir. Kütüphane TypeScript ile yazılmamışsa, bu paket TypeScript'e 'bu kütüphanede şu metodlar ve tipler var' der. Rehber olmadan TypeScript kütüphaneyi göremez.", en: "A @types package is TypeScript's manual for a JavaScript library. If the library isn't written in TypeScript, this package tells TypeScript 'this library has these methods and types'. Without the manual, TypeScript can't see the library." } },
      { type: "text", content: { tr: "Bazı kütüphaneler TypeScript ile yazılmış ve kendi .d.ts tip tanım dosyalarını içerir — Playwright ve axios buna örnek. Eski veya saf JavaScript kütüphaneleri için DefinitelyTyped topluluk deposu @types paketleri sağlar.", en: "Some libraries are written in TypeScript and bundle their own .d.ts type definition files — Playwright and axios are examples. For older or plain JavaScript libraries, the DefinitelyTyped community repository provides @types packages." } },
      { type: "code", language: "typescript", code: `// Installing @types packages

// Library ships its own types — NO @types needed:
npm install --save-dev @playwright/test  // includes its own .d.ts
npm install axios                        // includes its own .d.ts

// Library is plain JS — @types required:
npm install node-fetch
npm install --save-dev @types/node-fetch   // provides type definitions

// Essential for Node.js projects:
npm install --save-dev @types/node         // Node.js built-ins (fs, path, process)
npm install --save-dev @types/jest         // Jest matchers (describe, it, expect)

// Verify if a package bundles its own types:
// Check package.json for "types" or "typings" field
// → "@playwright/test": { "types": "index.d.ts" }    ← bundled!
// → "node-fetch": (no types field)                   ← needs @types/node-fetch

import path from 'path';              // TypeScript knows: path.join, path.resolve
import { readFileSync } from 'fs';    // TypeScript knows the return type
const configPath: string = path.join(__dirname, 'playwright.config.ts');
console.log('Config path:', configPath);` },
      { type: "code", language: "typescript", code: `// What a .d.ts declaration file looks like
// TypeScript reads these automatically — you don't write them for @types

// Simplified version of @types/node fs.d.ts:
declare module 'fs' {
  function readFileSync(path: string, options: { encoding: BufferEncoding }): string;
  function readFileSync(path: string): Buffer;
  function writeFileSync(path: string, data: string | Buffer): void;
  function existsSync(path: string): boolean;
}

// tsconfig.json — controlling type resolution
// {
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types", "./src/types"],
//     // default already includes node_modules/@types — rarely need to change
//
//     "types": ["node", "jest"]
//     // restrict to ONLY these @types packages (optional — omit to include all)
//   }
// }

// Writing your own declaration for a legacy JS library
// File: src/types/legacy-tool.d.ts
declare module 'legacy-tool' {
  export function runSuite(config: { url: string; timeout?: number }): Promise<void>;
  export interface SuiteResult { passed: number; failed: number; }
}` },
      { type: "editor", lang: "typescript", defaultCode: `// Practice: Simulate type declarations for a plain JS library

// Declare types for an imaginary legacy JavaScript library:
declare function runBenchmark(
  name: string,
  fn: () => void,
  iterations?: number
): { name: string; avgMs: number; minMs: number; maxMs: number };

// Now TypeScript understands runBenchmark:
const result = runBenchmark("sort 1000 items", () => {
  [3, 1, 4, 1, 5, 9, 2, 6].sort();
}, 100);

// TypeScript knows the return type shape:
const report: string = result.name + ": avg " + result.avgMs.toFixed(2) + "ms";
console.log(report);

// Try breaking a type to see TypeScript catch it:
// runBenchmark(42, () => {});   // Error: number not assignable to string
// result.totalMs;               // Error: property does not exist
console.log("Avg:", result.avgMs, "ms | Min:", result.minMs, "ms");` },
      { type: "java-compare", topic: "Type declarations for external libraries", why: "Java'da Jackson veya Gson kullanırken tipler Maven/Gradle ile gelir ve Java sınıflarının kendisidir. TypeScript'te ise çoğu JavaScript kütüphanesi tip tanımı içermez — @types paketi bu boşluğu doldurur.", why_en: "In Java, libraries like Jackson or Gson come via Maven/Gradle and their types are the Java classes themselves. In TypeScript, most JavaScript libraries don't bundle type definitions — @types packages fill this gap.", java: `// Java: types come from the library's compiled .class files
// Add to pom.xml — types come bundled in the .jar:
// <dependency>
//   <groupId>com.fasterxml.jackson.core</groupId>
//   <artifactId>jackson-databind</artifactId>
//   <version>2.15.0</version>
// </dependency>

// IDE and compiler see all types automatically:
ObjectMapper mapper = new ObjectMapper();
MyData obj = mapper.readValue(jsonString, MyData.class);
// ↑ Full type safety — IDE shows all readValue overloads`, typescript: `// TypeScript: runtime code and types are SEPARATE for JS libraries

// Option 1 — library bundles its own types (modern):
import { test, expect } from '@playwright/test';  // types included
import axios from 'axios';                         // types included

// Option 2 — install @types for legacy JS libraries:
// npm install node-fetch
// npm install --save-dev @types/node-fetch
import fetch from 'node-fetch';  // now TypeScript understands fetch

// Option 3 — write your own .d.ts declaration file:
// src/types/legacy-api.d.ts
declare module 'legacy-api' {
  export function callEndpoint(url: string): Promise<{ status: number }>;
}

// Without types, TypeScript falls back to 'any' — no type safety`, note: "Kütüphane seçerken npm sayfasında 'TypeScript' rozetine veya package.json'da 'types' field'ına bakın. Varsa @types kurmanıza gerek yok. Yoksa @types/paket-adi kurun.", note_en: "When picking a library, check the npm page for a 'TypeScript' badge or 'types' field in package.json. If present, no @types needed. Otherwise install @types/package-name." },
      { type: "quiz", question: { tr: "@types/node kurulumu ne zaman GEREKLİDİR?", en: "When is it REQUIRED to install @types/node?" }, options: [{ id: "a", text: { tr: "Her TypeScript projesinde otomatik kurulur", en: "It installs automatically in every TypeScript project" } }, { id: "b", text: { tr: "Node.js API'lerini (fs, path, process) TypeScript kodunda kullanırken", en: "When using Node.js APIs (fs, path, process) in TypeScript code" } }, { id: "c", text: { tr: "Yalnızca Playwright projeleri için gereklidir", en: "Only required for Playwright projects" } }, { id: "d", text: { tr: "Yalnızca frontend (React, Vue) projelerinde", en: "Only in frontend (React, Vue) projects" } }], correct: "b", explanation: { tr: "Node.js runtime'ı JavaScript ile yazılmıştır — TypeScript tipleri içermez. @types/node paketi fs.readFileSync, path.join, process.env gibi built-in modüller için tip tanımları sağlar. Playwright projeleri de Node.js API'lerini kullandığından neredeyse her Playwright+TypeScript projesinde @types/node bulunur.", en: "@types/node is required when using Node.js built-in modules (fs, path, process) in TypeScript. The Node.js runtime ships no TypeScript types — @types/node provides them. Most Playwright projects need @types/node since they use Node.js APIs for file I/O, env vars, and path manipulation." } ,
        retryQuestion: {
      "question": {
            "tr": "Neden TypeScript projelerinde 'import fs from \"fs\"' satırı için @types/node paketine ihtiyaç duyarız?",
            "en": "Why do we need the @types/node package when using 'import fs from \"fs\"' in TypeScript projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "TypeScript derleyicisinin Node.js kurulumunu bulmasını sağlar",
                        "en": "It allows the TypeScript compiler to find the Node.js installation"
                  }
            },
            {
                  "id": "a",
                  "text": {
                        "tr": "Node.js modüllerinin TypeScript tarafından anlaşılabilmesi için tip tanımlarını (typings) sunar",
                        "en": "It provides type definitions so that Node.js modules are understandable by TypeScript"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Kodun Node.js yerine tarayıcıda çalışmasını zorunlu kılar",
                        "en": "It forces the code to run in the browser instead of Node.js"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "fs modülünü hızlandırmak için ek bir runtime kütüphanesidir",
                        "en": "It is an additional runtime library to speed up the fs module"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Node.js yerleşik modülleri (fs, path, http vb.) JavaScript ile yazılmıştır. TypeScript'in bu modüllerin metodlarını ve parametre tiplerini anlayabilmesi için harici bir tip tanım paketi olan @types/node gereklidir.",
            "en": "Node.js built-in modules (fs, path, http, etc.) are written in JavaScript. To let TypeScript understand the methods and parameter types of these modules, an external type definition package like @types/node is necessary."
      }
}
},

      // ═══════════════════════════════════════════════════════════════════════
      // Advanced: Conditional & Mapped Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Conditional & Mapped Types", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🗺️", content: { tr: "Conditional type, 'eğer X ise A, değilse B' mantığında çalışan tip. Mapped type, bir nesnenin tüm alanlarını dönüştürür — her alanı opsiyonel yap, her alanı string yap gibi. Partial<T> aslında bir mapped type.", en: "A conditional type works like 'if X then A, else B' for types. A mapped type transforms all fields of an object — make every field optional, make every field a string. Partial<T> is actually a mapped type." } },
      { type: "code", language: "typescript", code: `// Conditional Types — ternary for types
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;   // "yes"
type B = IsString<number>;   // "no"

// NonNullable (built-in utility — implemented as conditional type)
type NonNull<T> = T extends null | undefined ? never : T;

// Mapped Types — transform all properties
interface User { id: number; name: string; active: boolean; }

// Make all fields optional (same as Partial<T>)
type Optional<T> = { [K in keyof T]?: T[K] };

// Make all fields readonly (same as Readonly<T>)
type Immutable<T> = { readonly [K in keyof T]: T[K] };

// Make all fields strings (type transformation)
type Stringified<T> = { [K in keyof T]: string };

type StringUser = Stringified<User>;
const su: StringUser = { id: "1", name: "Alice", active: "true" };

// Practical: validation schema
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;  // null = valid
};

const userValidation: ValidationRules<User> = {
  name: (v) => v.length < 2 ? "Name too short" : null,
  id: (v) => v <= 0 ? "ID must be positive" : null,
};

function validate<T>(obj: T, rules: ValidationRules<T>): string[] {
  const errors: string[] = [];
  for (const key in rules) {
    const rule = rules[key];
    const error = rule ? rule(obj[key]) : null;
    if (error) errors.push(key + ": " + error);
  }
  return errors;
}

const u: User = { id: 1, name: "A", active: true };
console.log(validate(u, userValidation));  // ["name: Name too short"]` },
      { type: "editor", lang: "typescript", defaultCode: `// Build a DeepReadonly mapped type
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: boolean;
  };
  database: {
    url: string;
    poolSize: number;
  };
}

const config: DeepReadonly<Config> = {
  server: { host: "localhost", port: 3000, ssl: true },
  database: { url: "postgres://localhost/testdb", poolSize: 5 },
};

console.log("Host:", config.server.host);
console.log("Port:", config.server.port);

// This would be a TypeScript error:
// config.server.port = 9000;  // Cannot assign to readonly` },
      { type: "quiz", question: { tr: "TypeScript'te { [K in keyof T]?: T[K] } ne yapar?", en: "What does { [K in keyof T]?: T[K] } do in TypeScript?" }, options: [{ id: "a", text: { tr: "T'nin tüm alanlarını siler", en: "Removes all fields from T" } }, { id: "b", text: { tr: "T'nin tüm alanlarını opsiyonel yapar (Partial<T> ile aynı)", en: "Makes all fields of T optional (same as Partial<T>)" } }, { id: "c", text: { tr: "T'nin alanlarını string'e dönüştürür", en: "Converts T's fields to strings" } }, { id: "d", text: { tr: "T'yi array'e dönüştürür", en: "Converts T to an array" } }], correct: "b", explanation: { tr: "[K in keyof T] ile T'nin tüm keylerini iterate edersin. ?: her birini opsiyonel yapar. T[K] ile orijinal tipi korursun. Bu tam olarak Partial<T>'nin implementation'ı.", en: "[K in keyof T] iterates over all keys of T. ?: makes each optional. T[K] preserves the original type. This is exactly how Partial<T> is implemented." } ,
        retryQuestion: {
      "question": {
            "tr": "TypeScript'te Readonly<T> yardımcı tipinin arka planda çalışan eşdeğeri aşağıdakilerden hangisidir?",
            "en": "Which of the following is the underlying equivalent of the Readonly<T> utility type in TypeScript?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "{ readonly [K in keyof T]: T[K] }",
                        "en": "{ readonly [K in keyof T]: T[K] }"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "{ [K in keyof T]: T[K] | null }",
                        "en": "{ [K in keyof T]: T[K] | null }"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "{ [K in keyof T]?: T[K] }",
                        "en": "{ [K in keyof T]?: T[K] }"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "{ [K in keyof T]: T[K] | undefined }",
                        "en": "{ [K in keyof T]: T[K] | undefined }"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Readonly<T> yapısı, bir nesnenin tüm özelliklerini değiştirilemez hale getirir. Bu, mapped type sözdizimi kullanılarak [K in keyof T] üzerinden her anahtarın önüne readonly değiştiricisi eklenerek gerçekleştirilir.",
            "en": "The Readonly<T> utility makes all properties of an object immutable. This is achieved using the mapped type syntax by prepending the readonly modifier to every key via [K in keyof T]."
      }
}
},

      // ─── Interview Questions for Advanced ─────────────────────────────────
      { type: "interview-questions", topic: "TypeScript Advanced", questions: [
        { level: "basic", q: { tr: "TypeScript Generics neden kullanılır? Java'dan farkı nedir?", en: "Why are TypeScript Generics used? How do they differ from Java?" }, a: { tr: "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.", en: "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>." } },
        { level: "intermediate", q: { tr: "Utility types nedir? En çok kullandığın hangisi ve neden?", en: "What are utility types? Which do you use most and why?" }, a: { tr: "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.", en: "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses." } },
        { level: "advanced", q: { tr: "Conditional types ne zaman kullanılmalı?", en: "When should conditional types be used?" }, a: { tr: "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.", en: "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types." } },
      ]},
    ],
  },

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
      {
        type: "heading",
        content: "🏗️ Playwright POM Architecture — Class Hierarchy",
        difficulty: "🟡 Intermediate",
      },
      {
        type: "visual", variant: "flow",
        title: "TypeScript POM Class Hierarchy — Layer by Layer",
        note: "Each layer inherits from the one above. Tests only call public methods — selectors are hidden inside page classes.",
        steps: [
          { num: "1", label: "IPage Interface", desc: "navigate(), login(), getError() — the public contract", highlight: true },
          { num: "2", label: "PageBase (abstract)", desc: "Shared helpers: waitForLoad(), expectUrl(), getLocator()" },
          { num: "3", label: "LoginPage extends PageBase", desc: "Implements IPage — owns all selectors + actions" },
          { num: "4", label: "test fixture (test.extend)", desc: "loginPage: async({page}, use) => { ... }" },
          { num: "5", label: "Test file", desc: "test('login', async({ loginPage }) => { await loginPage.login(...) })", highlight: true },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "❌ Untyped — Runtime Surprises",
          code: `// JavaScript / untyped Playwright
test('login', async ({ page }) => {
  await page.fill('#emal', 'user@test.com');  // typo: #emal
  await page.click('#submit-btn');

  // crashes at runtime — no IDE warning
  const result = await page.locator('.dashbord').textContent();
  //                                  ^ typo — no error until test runs
  expect(result).toBe('Welcome!');
});`,
          note: "Selector typos and wrong method calls discovered at runtime — expensive CI failures",
        },
        right: {
          label: "✅ Typed POM — Caught at Compile Time",
          code: `// TypeScript Playwright POM
export class LoginPage {
  private readonly emailInput: Locator;    // typed field
  constructor(private readonly page: Page) {
    this.emailInput = page.locator('[data-testid="email"]');
  }
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);   // IDE shows fill() options
    // loginPage.fill(email)  ← compiler error: method doesn't exist
  }
}

test('login', async ({ loginPage }) => {
  await loginPage.login('user@test.com', 'pass');
  // loginPage.navigate(42) ← Error: number not assignable to void
});`,
          note: "Selector changes cascade safely — compiler shows every broken call site",
        },
      },
      {
        type: "visual", variant: "boxes",
        title: "Typed Fixture Pipeline — From Config to Test",
        items: [
          { icon: "⚙️", label: "playwright.config.ts", desc: "baseURL, timeout, retries" },
          { arrow: true },
          { icon: "🔧", label: "test.extend<MyFixtures>", desc: "loginPage, testUser, apiBaseUrl" },
          { arrow: true },
          { icon: "📄", label: "LoginPage class", desc: "private Locators, typed methods" },
          { arrow: true },
          { icon: "🧪", label: "Test function", desc: "async ({ loginPage, testUser }) => {}" },
          { arrow: true },
          { icon: "✅", label: "Type-safe assertions", desc: "expect().toHaveURL(), toHaveText()" },
        ],
        note: "Every arrow is a typed boundary — passing wrong types triggers a compile error, not a runtime crash.",
      },
      {
        type: "quiz",
        question: { tr: "Tam tipli bir Page Object Model'in Playwright otomasyonunda sağladığı temel avantaj nedir?", en: "What is the core benefit of a fully-typed Page Object Model in Playwright automation?" },
        options: [
          { id: "a", text: { tr: "Testleri daha hızlı çalıştırır", en: "Makes tests run faster" } },
          { id: "b", text: { tr: "IDE metod/property isimlerini otomatik tamamlar ve yanlış kullanım derleme zamanında yakalanır", en: "The IDE autocompletes method/property names and misuse is caught at compile time" } },
          { id: "c", text: { tr: "Locator'ları otomatik olarak günceller", en: "Automatically updates locators" } },
          { id: "d", text: { tr: "Tarayıcı oturumlarını paylaşır", en: "Shares browser sessions" } },
        ],
        correct: "b",
        explanation: { tr: "Bir Page Object class'ı tam tipli olduğunda, yanlış bir metod adı çağırmak veya yanlış argüman tipini geçirmek testi çalıştırmadan önce derleyici tarafından yakalanır — IDE de her metod/property için otomatik tamamlama gösterir, metod adlarını tahmin etmeye gerek kalmaz. Bu, Java'da bir arayüze (interface) karşı derleme yapmanın IDE/derleyici güvenliğiyle aynı mantıktır.", en: "When a Page Object class is fully typed, calling a wrong method name or passing the wrong argument type is caught by the compiler before the test even runs — the IDE also autocompletes every method/property, so you never have to guess a method name. Same logic as compiling against an interface in Java." },
        retryQuestion: {
          question: { tr: "Tipsiz (plain JS) bir Page Object'te `loginPage.clickLogin()` yazılır ama gerçek metod adı `clickLoginButton()`dır. Bu hata ne zaman fark edilir?", en: "In an untyped (plain JS) Page Object, someone writes `loginPage.clickLogin()` but the real method is `clickLoginButton()`. When is this mistake caught?" },
          options: [
            { id: "a", text: { tr: "Hemen, IDE kırmızı çizgiyle gösterir", en: "Immediately, the IDE flags it with a red squiggly" } },
            { id: "b", text: { tr: "Test çalıştırıldığında, \"clickLogin is not a function\" runtime hatasıyla", en: 'Only when the test runs, with a "clickLogin is not a function" runtime error' } },
            { id: "c", text: { tr: "Asla — JavaScript var olmayan metodları otomatik oluşturur", en: "Never — JavaScript automatically creates missing methods" } },
            { id: "d", text: { tr: "Derleme sırasında, çünkü JavaScript de derlenir", en: "At compile time, because JavaScript is compiled too" } },
          ],
          correct: "b",
          explanation: { tr: 'Plain JavaScript\'te (tip kontrolü olmadan) yanlış bir metod adı sadece o satır gerçekten ÇALIŞTIĞINDA patlar — derleme zamanı diye bir kavram yoktur. Bu, TypeScript\'in tam tipli bir Page Object\'te aynı hatayı yazarken IDE\'de anında yakalamasıyla tam karşıtlık oluşturur; bu fark, "test çalıştırıp hatayı CI\'da görmek" ile "yazarken hatayı görmek" arasındaki temel farktır.', en: 'In plain JavaScript (no type checking), a wrong method name only blows up when that line actually RUNS — there is no compile-time concept at all. This is the exact contrast with TypeScript catching the same mistake instantly in the IDE on a fully-typed Page Object — the difference between "run the test and see the error in CI" versus "see the error while typing."' },
        },
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
      { type: "heading", content: "☕ If You Know Java: Interview Q Bridge" },
      {
        type: "java-compare",
        topic: "interface: Structural vs Nominal Typing (Q2 Deep Dive)",
        why: "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
        why_en: "Q2 covers interface vs type — but the bigger surprise for Java devs is HOW TypeScript interfaces work. Java uses nominal typing (class must say 'implements'). TypeScript uses structural typing — any object with the right shape satisfies an interface automatically.",
        java: `// Java: NOMINAL typing — must explicitly declare
interface Clickable {
    void click();
}

// MUST say "implements Clickable":
class Button implements Clickable {
    public void click() { System.out.println("clicked"); }
}

// This would NOT satisfy Clickable — no "implements":
class Link {
    public void click() { System.out.println("link clicked"); }
}
// new Clickable link = new Link(); // Compile error!`,
        typescript: `// TypeScript: STRUCTURAL typing — shape is all that matters
interface Clickable {
  click(): void;
}

// No "implements" needed — has click() → satisfies Clickable!
class Button {
  click() { console.log("clicked"); }
}

class Link {
  click() { console.log("link clicked"); }
  href = "/home";   // extra props are fine
}

// Both work — structural match is enough:
function doClick(item: Clickable) { item.click(); }
doClick(new Button());  // ✅
doClick(new Link());    // ✅ — extra href is ignored

// Even plain objects work!
doClick({ click: () => console.log("inline") }); // ✅`,
        note: 'This is the most important TypeScript concept for Java devs. You rarely write "implements" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods.',
        note_en: 'This is the most important TypeScript concept for Java devs. You rarely write "implements" in TS — if the shape matches, it satisfies the interface. Great for mocking in tests: just pass an object with the right methods.',
      },
      {
        type: "java-compare",
        topic: "Generics <T>: Java vs TypeScript (Q7 Deep Dive)",
        why: "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
        why_en: "Q7 covers generics — the good news: TypeScript generics look almost identical to Java generics. Same <T> syntax, same extends constraints. Key difference: TypeScript adds union types and conditional types that Java doesn't have.",
        java: `// Java generics — the model TypeScript is based on
interface ApiResponse<T> {
    T getData();
    int getStatus();
    boolean isOk();
}

// Bounded generic (extends):
<T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Generic class:
public class Repository<T> {
    private List<T> items = new ArrayList<>();
    public void add(T item) { items.add(item); }
    public List<T> getAll() { return items; }
}`,
        typescript: `// TypeScript generics — nearly identical syntax!
interface ApiResponse<T> {
  data:   T;       // same as Java getData()
  status: number;
  ok:     boolean;
}

// Bounded generic (extends — same keyword!):
function max<T extends { compareTo(other: T): number }>(
  a: T, b: T
): T {
  return a.compareTo(b) > 0 ? a : b;
}

// Generic class (same syntax):
class Repository<T> {
  private items: T[] = [];
  add(item: T): void  { this.items.push(item); }
  getAll(): T[]       { return this.items; }
}

// TypeScript bonus — Java doesn't have this:
type MaybeNull<T> = T | null;           // union generic
type Keys<T> = keyof T;                 // mapped type key
type Unwrap<T> = T extends Promise<infer R> ? R : T;  // conditional`,
        note: 'If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics.',
        note_en: 'If you know Java generics, TypeScript generics will feel instantly familiar. The extra power (union types, infer, conditional types) comes naturally once you are comfortable with the basics.',
      },
      {
        type: "java-compare",
        topic: "readonly vs final — and Readonly<T> utility (Q10 Deep Dive)",
        why: "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
        why_en: "Q10 covers readonly — Java developers know 'final' prevents reassignment. TypeScript 'readonly' is the compile-time equivalent. Key additions: Readonly<T> utility type makes every property readonly at once, and 'as const' freezes literal values.",
        java: `// Java: final — prevents reassignment
public class LoginPage {
    private final String url;           // must assign in constructor
    private final Page page;

    public LoginPage(Page page) {
        this.url  = "/login";           // must set here
        this.page = page;
    }
    // this.url = "/other"; would be compile error

    // Java has no built-in "make all fields final" utility
    // You manually mark each field final — verbose!
}`,
        typescript: `// TypeScript: readonly — same guarantee, cleaner syntax
class LoginPage {
  readonly url  = "/login";       // like Java final field
  readonly page: Page;            // must assign in constructor

  constructor(page: Page) {
    this.page = page;
    // this.url = "/other";  // Compile error!
  }
}

// Readonly<T> — make EVERY property readonly at once:
interface Config { baseUrl: string; retries: number; }
type FrozenConfig = Readonly<Config>;
const cfg: FrozenConfig = { baseUrl: "https://app.com", retries: 2 };
// cfg.baseUrl = "x";  // Error — no Java equivalent (must mark each field)

// "as const" — literal type + readonly (no Java equivalent):
const STATUS = ["PASS", "FAIL", "SKIP"] as const;
// type: readonly ["PASS", "FAIL", "SKIP"]  — values AND type frozen`,
        note: '"readonly" = Java "final" for fields. "Readonly<T>" = automatic final on all fields — no Java equivalent. "as const" freezes both the type AND the value — very useful for test status enums.',
        note_en: '"readonly" = Java "final" for fields. "Readonly<T>" = automatic final on all fields — no Java equivalent. "as const" freezes both the type AND the value — very useful for test status enums.',
      },
      // ─── Error Dictionary ─────────────────────────────────────────────────
      {
        type: 'error-dictionary',
        framework: 'Playwright TypeScript',
        errors: [
          {
            error: 'TimeoutError: locator.click: Timeout 30000ms exceeded',
            fullMessage: 'TimeoutError: page.locator(\'button[type="submit"]\').click: Timeout 30000ms exceeded.\nWaiting for selector "button[type=\\"submit\\"]" to be visible.',
            cause: { tr: 'Locator hiçbir element bulamadı veya element timeout süresinde tıklanabilir (actionable) olmadı. Nedenler: yanlış selector, element henüz render edilmedi, element başka bir frame içinde.', en: 'The locator matched no element or the element was not actionable within the timeout. Causes: wrong selector, element not yet rendered, element inside a different frame.' },
            solution: { tr: '1) Playwright Inspector ile selectoru doğrula: npx playwright codegen. 2) data-testid attribute ekle ve page.getByTestId() kullan. 3) Timeout\'u artır: locator.click({ timeout: 60000 }). 4) Frame içindeyse: page.frameLocator() kullan.', en: '1) Validate selector with Playwright Inspector: npx playwright codegen. 2) Add data-testid and use page.getByTestId(). 3) Increase timeout: locator.click({ timeout: 60000 }). 4) If inside a frame: use page.frameLocator().' },
            codeWrong: `// YANLIŞ — genel CSS selector, değişime açık
await page.locator('button').click();`,
            codeFixed: `// DOĞRU — data-testid ile stabil locator
await page.getByTestId('submit-btn').click();

// veya rol + isim ile:
await page.getByRole('button', { name: 'Submit' }).click();`
          },
          {
            error: 'Error: strict mode violation: locator resolved to 2 elements',
            fullMessage: 'Error: strict mode violation: locator("input") resolved to 2 elements:\n  1) <input type="text" name="username">\n  2) <input type="email" name="email">',
            cause: { tr: 'Locator sayfada birden fazla element buldu. Playwright strict modda varsayılan olarak tek bir element bekler.', en: 'The locator matched more than one element. Playwright in strict mode expects exactly one element by default.' },
            solution: { tr: 'Daha spesifik selector kullan: getByLabel, getByPlaceholder veya nth(). Ya da all() ile hepsini liste olarak al.', en: 'Use a more specific selector: getByLabel, getByPlaceholder, or nth(). Alternatively use all() to get all matches as a list.' },
            codeWrong: `// YANLIŞ — çok genel, birden fazla eşleşiyor
await page.locator('input').fill('test@example.com');`,
            codeFixed: `// DOĞRU — etiket ile spesifik element
await page.getByLabel('Email address').fill('test@example.com');

// veya nth() ile belirli indeks:
await page.locator('input').nth(1).fill('test@example.com');`
          },
          {
            error: 'Error: page has been closed',
            fullMessage: 'Error: page.goto: page has been closed\nCall log:\n  - navigating to "https://example.com"',
            cause: { tr: 'Test bitiminde browser context veya page zaten kapatılmış. Genellikle fixture teardown sırası yanlış veya bir önceki test başarısız olup page\'i kapattı.', en: 'The browser context or page was already closed when the action was attempted. Usually caused by incorrect fixture teardown order or a previous test failure closing the page.' },
            solution: { tr: 'Playwright fixture\'larını doğru kullan — page fixture\'ı her test için otomatik oluşturulur ve temizlenir. Worker kapsamlı browser fixture\'larında context\'in açık olduğundan emin ol.', en: 'Use Playwright fixtures correctly — the page fixture is automatically created and cleaned up per test. For worker-scoped browser fixtures, ensure the context is still open.' },
            codeWrong: `// YANLIŞ — page'i manuel kapatıp sonra kullanmaya çalışmak
await page.close();
await page.goto('/dashboard'); // Error!`,
            codeFixed: `// DOĞRU — fixture'lar sayfa ömrünü yönetir
test('dashboard loads', async ({ page }) => {
  // page otomatik açılır ve test sonunda kapatılır
  await page.goto('/dashboard');
  await expect(page).toHaveTitle('Dashboard');
}); // page burada otomatik kapanır`
          },
          {
            error: 'net::ERR_CONNECTION_REFUSED',
            fullMessage: 'Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000\nCall log:\n  - navigating to "https://localhost:3000"',
            cause: { tr: 'Hedef URL\'e bağlantı reddedildi. Test çalışmadan önce uygulama başlatılmamış veya port numarası yanlış.', en: 'Connection to the target URL was refused. The application was not started before tests ran, or the port number is wrong.' },
            solution: { tr: '1) Playwright webServer config ile uygulamayı otomatik başlat. 2) baseURL\'i playwright.config.ts içinde doğru ayarla. 3) CI\'da uygulama başlatma adımının test adımından önce geldiğini kontrol et.', en: '1) Use Playwright webServer config to auto-start the app. 2) Set baseURL correctly in playwright.config.ts. 3) In CI, verify the app start step runs before the test step.' },
            codeWrong: `// YANLIŞ — uygulama başlamadan test çalışıyor
await page.goto('http://localhost:3000');`,
            codeFixed: `// DOĞRU — playwright.config.ts
export default defineConfig({
  webServer: {
    command: 'npm run start',       // uygulamayı başlat
    url: 'http://localhost:3000',   // hazır olana dek bekle
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://localhost:3000' },
});`
          },
          {
            error: 'expect(locator).toBeVisible() → Error: Timeout 5000ms exceeded',
            fullMessage: "Error: expect(received).toBeVisible()\nTimeout 5000ms exceeded.\nExpecting locator(\"[data-testid='success-toast']\") to be visible.",
            cause: { tr: 'Assertion timeout\'u doldu — beklenen element görünür olmadı. Animasyon süresi, API yanıt gecikmesi veya yanlış selector nedeniyle olabilir.', en: 'The assertion timeout expired — the expected element was not visible within the timeout. Possible causes: animation delay, API response latency, or wrong selector.' },
            solution: { tr: '1) expect timeout\'unu artır: expect(locator).toBeVisible({ timeout: 10000 }). 2) Önce bir aksiyon bekle (navigation, API yanıtı). 3) waitFor() ile element hazır olana dek bekle.', en: '1) Increase assertion timeout: expect(locator).toBeVisible({ timeout: 10000 }). 2) Await an earlier action (navigation, API response). 3) Use waitFor() to wait until the element is ready.' },
            codeWrong: `// YANLIŞ — aksiyon tamamlanmadan assertion
await page.click('#save-btn');
await expect(page.getByText('Saved!')).toBeVisible(); // çok hızlı`,
            codeFixed: `// DOĞRU — yeterli timeout ile bekle
await page.click('#save-btn');
await expect(page.getByText('Saved!')).toBeVisible({ timeout: 10000 });

// veya response bekliyorsan:
const [response] = await Promise.all([
  page.waitForResponse('/api/save'),
  page.click('#save-btn'),
]);
await expect(page.getByText('Saved!')).toBeVisible();`
          },
          {
            error: "TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'",
            fullMessage: "src/helpers.ts:12:25 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'Browser'.",
            cause: { tr: 'Fonksiyon enum tipi bekliyor ama string geçirildi. TypeScript string\'i enum tipine otomatik olarak dönüştürmez.', en: 'A function expects an enum type but received a plain string. TypeScript does not automatically coerce strings to enum types.' },
            solution: { tr: 'Enum değerini kullan (Browser.CHROMIUM) veya string\'i enum\'a dönüştür. Eğer dışarıdan gelen değeri dönüştürmek gerekiyorsa as ile cast et.', en: 'Use the enum value (Browser.CHROMIUM) or cast the string. If converting external input to enum, use as assertion.' },
            codeWrong: `// YANLIŞ — string enum yerine geçirilemiyor
function runTest(browser: Browser) { ... }
runTest('chromium'); // TS2345 hatası`,
            codeFixed: `// DOĞRU — enum değeri kullan
runTest(Browser.CHROMIUM); // ✅

// veya dışarıdan gelen string'i cast et:
const browserStr = process.env.BROWSER ?? 'chromium';
runTest(browserStr as Browser); // dikkatli kullan — doğrulama ekle`
          },
        ]
      },
      {
        type: "quiz",
        question: { tr: "Test otomasyonunda 'any' tipi kullanmaktan neden kaçınılır ve onun yerine ne önerilir?", en: "Why should the 'any' type be avoided in test automation, and what is recommended instead?" },
        options: [
          { id: "a", text: { tr: "any daha yavaş çalışır", en: "any runs slower" } },
          { id: "b", text: { tr: "any tür denetimini tamamen kapatır, hatalar runtime'da ortaya çıkar; bilmediğin tipte unknown kullan", en: "any disables all type checking, so errors surface at runtime instead; use unknown when the type is genuinely not known" } },
          { id: "c", text: { tr: "any sadece test dosyalarında kullanılabilir", en: "any can only be used in test files" } },
          { id: "d", text: { tr: "any otomatik olarak string'e dönüştürülür", en: "any is automatically converted to string" } },
        ],
        correct: "b",
        explanation: { tr: "`any` bir kaçış kapısıdır — ona her şeyi atayabilir, herhangi bir metodu çağırabilirsin, derleyici hiçbir şeyi kontrol etmez. Bu hatalar çalışma zamanına kadar görünmez kalır, yani TypeScript'in tüm amacı ortadan kalkar. `unknown` ise aynı esnekliği verir ama kullanmadan önce tip daralması (type narrowing, örn. `typeof` kontrolü) yapmaya ZORLAR — bu yüzden bilinmeyen bir API yanıtı için her zaman `any` değil `unknown` kullanılmalı.", en: "`any` is an escape hatch — you can assign anything to it and call any method, and the compiler checks nothing. Those errors stay invisible until runtime, defeating TypeScript's whole purpose. `unknown` offers the same flexibility but FORCES you to narrow the type (e.g. a `typeof` check) before using it — which is why an unknown API response should always use `unknown`, never `any`." },
        retryQuestion: {
          question: { tr: "`let data: unknown = await response.json()` yazdın. `data.name` özelliğine doğrudan erişmeye çalışırsan ne olur?", en: 'You write `let data: unknown = await response.json()`. What happens if you try to access `data.name` directly?' },
          options: [
            { id: "a", text: { tr: "Çalışır, `any` ile aynı davranışı gösterir", en: "It works fine, behaving exactly like any" } },
            { id: "b", text: { tr: "TypeScript derleme hatası verir — önce tip daralması (örn. typeof/in kontrolü) yapman gerekir", en: "TypeScript gives a compile error — you must narrow the type first (e.g. a typeof/in check)" } },
            { id: "c", text: { tr: "Runtime'da sessizce undefined döner", en: "It silently returns undefined at runtime" } },
            { id: "d", text: { tr: "unknown otomatik olarak any'e dönüşür", en: "unknown automatically converts to any" } },
          ],
          correct: "b",
          explanation: { tr: '`unknown`, `any`\'den farklı olarak HİÇBİR property/metoda doğrulama yapmadan erişime izin vermez — derleyici, `data.name`\'e erişmeden önce `typeof data === "object" && data !== null && "name" in data` gibi bir tip daralması ister. Bu, `any` kullanırken atlanan güvenliği geri getirir: bilinmeyen bir API yanıtını kullanmadan önce gerçekten doğrulamaya zorlar.', en: 'Unlike `any`, `unknown` does not allow accessing ANY property/method without validation first — the compiler requires a type narrowing step like `typeof data === "object" && data !== null && "name" in data"` before `data.name` is allowed. This restores the safety that `any` throws away: it forces you to actually validate an unknown API response before using it.' },
        },
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
      {
        type: "quiz",
        question: { tr: "Generic bir `ApiResponse<T>` sarmalayıcı tipi tanımlamanın amacı nedir?", en: "What is the purpose of defining a generic `ApiResponse<T>` wrapper type?" },
        options: [
          { id: "a", text: { tr: "API çağrılarını hızlandırır", en: "It makes API calls faster" } },
          { id: "b", text: { tr: "Her endpoint'in farklı veri şeklini, ortak bir sarmalayıcı yapıyı (status/data/error gibi) tip güvenliğiyle tekrar kullanmayı sağlar", en: "It lets each endpoint's different data shape reuse a common wrapper structure (e.g. status/data/error) with full type safety" } },
          { id: "c", text: { tr: "Sadece string tipindeki yanıtlar için çalışır", en: "It only works for string-type responses" } },
          { id: "d", text: { tr: "Network hatalarını otomatik olarak retry eder", en: "It automatically retries network errors" } },
        ],
        correct: "b",
        explanation: { tr: "`ApiResponse<T>` gibi bir generic tip, `{ status: number, data: T, error?: string }` şeklindeki ortak zarfı BİR kez tanımlar; `T` yerine `User`, `Product`, `OrderResult` gibi her endpoint'in gerçek veri tipini geçirirsin. Java'daki generic bir `ApiResponse<T>` sınıfıyla aynı mantık — kod tekrarı olmadan her endpoint için tip güvenliği kazanırsın.", en: "A generic type like `ApiResponse<T>` defines the common envelope `{ status: number, data: T, error?: string }` ONCE; you substitute `T` with each endpoint's real data type like `User`, `Product`, `OrderResult`. Same logic as a generic `ApiResponse<T>` class in Java — you get type safety per endpoint without duplicating the wrapper." },
        retryQuestion: {
          question: { tr: "`ApiResponse<T>` generic tipi olmadan, her endpoint için (User, Product, Order) AYRI bir response wrapper tipi (UserResponse, ProductResponse, OrderResponse) yazsaydın, temel dezavantajı ne olurdu?", en: 'Without the generic `ApiResponse<T>` type, if you wrote a SEPARATE response wrapper type for each endpoint (UserResponse, ProductResponse, OrderResponse), what would be the main downside?' },
          options: [
            { id: "a", text: { tr: "Derleyici hiçbirini tip kontrolü yapamaz", en: "The compiler could not type-check any of them" } },
            { id: "b", text: { tr: "{status, data, error} zarf şeklini her tipte tekrar yazman gerekirdi — bir alanı değiştirmek N yerde güncelleme ister", en: "You'd have to repeat the {status, data, error} envelope shape in every type — changing one field means updating it in N places" } },
            { id: "c", text: { tr: "TypeScript birden fazla interface tanımlamayı desteklemez", en: "TypeScript does not support defining multiple interfaces" } },
            { id: "d", text: { tr: "API yanıtları artık JSON olarak parse edilemezdi", en: "API responses could no longer be parsed as JSON" } },
          ],
          correct: "b",
          explanation: { tr: 'Generic olmadan, ortak zarf yapısı ({status, data, error}) her ayrı response tipinde KOPYALANIR. Zarfa yeni bir alan eklemen gerekirse (örn. bir `requestId`), bunu UserResponse, ProductResponse, OrderResponse\'un hepsinde tek tek güncellemen gerekir — generic bir `ApiResponse<T>` ile bu değişiklik tek bir yerde yapılır ve her kullanıma otomatik yayılır.', en: 'Without generics, the common envelope shape ({status, data, error}) gets COPIED into every separate response type. If you need to add a field to the envelope (e.g. a `requestId`), you must update UserResponse, ProductResponse, and OrderResponse individually — with a generic `ApiResponse<T>`, that change happens in one place and automatically propagates to every usage.' },
        },
      },
    ],
  },

  // ── 8. JAVA → TYPESCRIPT ──────────────────────────────────────────────────
  {
    title: "☕ Java → TypeScript: Great News — Very Similar!",
    blocks: [
      // 0
      { type: "text", content: "TypeScript is much easier for Java developers than Python! class, interface, access modifiers, generics, enums — all will feel familiar. There are only a few critical differences. This section explains these differences from a Java perspective." },
      // 1
      { type: "heading", text: "1. Basic Types — Very Similar to Java" },
      // 2
      {
        type: "java-compare",
        topic: "Basic Types",
        why: "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf (Java'nın String objesi değil), boolean aynı.",
        java: `// Java: separate numeric types
int count = 5;          // 32-bit integer
long bigNum = 999L;     // 64-bit integer
float rate = 3.14f;     // 32-bit float
double price = 99.99;   // 64-bit double
String name = "test";   // immutable Object
boolean active = true;`,
        typescript: `// TypeScript: simplified!
let count: number = 5;       // ALL numbers: one type
let bigNum: number = 999;    // no 'L' suffix
let rate: number = 3.14;     // no 'f' suffix
let price: number = 99.99;   // same type
let name: string = "test";   // lowercase! (not String)
let active: boolean = true;  // identical!

// Type inference (Java's 'var' equivalent):
let count2 = 5;       // inferred: number
let name2 = "Alice";  // inferred: string`,
        note: '"number" = Java\'nın int/long/float/double hepsi. "string" (küçük harf) ≠ Java String (büyük harf). TypeScript\'te ayrıca "any" (Object gibi, kaçış kapısı — kaçın!) ve "unknown" (daha güvenli any) var.',
        why_en: 'In Java there are separate numeric types: int, long, float, double. TypeScript uses a single type for all numbers: number. string is lowercase (not Java\'s String object), and boolean is identical.',
        note_en: '"number" = all of Java\'s int/long/float/double in one type. "string" (lowercase) ≠ Java String (uppercase). TypeScript also has "any" (like Object — an escape hatch, avoid it!) and "unknown" (safer any).',
      },
      // 3
      { type: "heading", text: "2. Interface — Structural Typing (The Most Important Difference!)" },
      // 4
      {
        type: "java-compare",
        topic: "interface (structural typing!)",
        why: "TypeScript interface Java'dakilere benzer ama kritik bir fark var: TypeScript 'structural typing' (yapısal tipleme) kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape'e sahip her nesne interface'i karşılar.",
        java: `// Java: nominal typing
// Class MUST declare "implements"
interface Testable {
    void run();
    String getName();
    default int getTimeout() { return 30000; }
}

// Explicitly declares: "implements Testable"
public class LoginTest implements Testable {
    public void run() { /* test logic */ }
    public String getName() { return "Login Test"; }
}`,
        typescript: `// TypeScript: structural typing!
interface Testable {
    run(): void;
    getName(): string;
    timeout?: number;  // optional (no 'default' — use ?: instead)
}

// No "implements" needed if shape matches:
const loginTest = {
    run: () => { /* test logic */ },
    getName: () => "Login Test"
};
// ✅ TypeScript accepts loginTest as Testable!

// But you CAN use implements for clarity:
class SignupTest implements Testable {
    run() { /* test logic */ }
    getName() { return "Signup Test"; }
}`,
        note: 'Java = nominal typing ("implements" bildirimi zorunlu). TypeScript = structural typing ("doğru şekle sahip olman yeterli"). Bu TypeScript\'in en güçlü ve en farklı konsepti.',
        why_en: 'TypeScript interfaces look like Java\'s but have one critical difference: TypeScript uses structural typing. An object does NOT need to declare "implements" — any object with the right shape satisfies the interface.',
        note_en: 'Java = nominal typing ("implements" declaration required). TypeScript = structural typing ("having the right shape is enough"). This is TypeScript\'s most powerful and most distinctive concept.',
      },
      // 5
      { type: "heading", text: "3. Classes — Nearly Identical!" },
      // 6
      {
        type: "java-compare",
        topic: "class (nearly identical!)",
        why: "TypeScript class sözdizimi Java'ya o kadar benzer ki sadece küçük farklılıklar var: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign).",
        java: `// Java class
public class PageObject {
    private final WebDriver driver; // final = immutable
    protected String baseUrl;

    public PageObject(WebDriver driver) {
        this.driver = driver;
        this.baseUrl = "https://example.com";
    }

    protected void click(By locator) {
        driver.findElement(locator).click();
    }

    public static PageObject create(WebDriver d) {
        return new PageObject(d);
    }
}`,
        typescript: `// TypeScript class — almost identical!
class PageObject {
    private readonly driver: WebDriver; // readonly = final
    protected baseUrl: string;

    constructor(driver: WebDriver) {    // NOT class name!
        this.driver = driver;
        this.baseUrl = "https://example.com";
    }

    protected click(locator: Locator): void {
        locator.click();
    }

    static create(d: WebDriver): PageObject {
        return new PageObject(d);
    }
}

// Constructor shorthand (saves boilerplate!):
class Test {
    constructor(
        private readonly driver: WebDriver, // declare + assign
        public name: string                 // declare + assign
    ) {}
}`,
        note: '"readonly" = Java "final". Constructor shorthand: "constructor(private x: T)" hem field\'ı tanımlar hem atar — Java\'ya kıyasla büyük boilerplate tasarrufu.',
        why_en: 'TypeScript class syntax is so similar to Java that there are only minor differences: the "constructor" keyword, "readonly" (instead of final), and constructor shorthand (declare and assign in one line).',
        note_en: '"readonly" = Java "final". Constructor shorthand: "constructor(private x: T)" both declares the field and assigns it — a big boilerplate saving compared to Java.',
      },
      // 7
      { type: "heading", text: "4. Access Modifiers — Identical!" },
      // 8
      {
        type: "java-compare",
        topic: "access modifiers (same keywords!)",
        why: "TypeScript access modifier'ları Java ile birebir aynı keyword'ler: public, private, protected. Java'dan farklı olarak 'package-private' kavramı yoktur. Ve iyi haber: Python'un aksine TypeScript gerçekten derleme zamanında zorlar!",
        java: `// Java access modifiers
public class BankTest {
    public String testId;      // anyone
    protected String env;      // subclasses + package
    private String apiKey;     // only this class

    public void run() { }
    protected void setup() { }
    private void loadKey() { }

    // Package-private (no keyword):
    String internalName;
}`,
        typescript: `// TypeScript access modifiers — same keywords!
class BankTest {
    public testId: string;     // anyone (default)
    protected env: string;     // subclasses only
    private apiKey: string;    // only this class
    // No "package-private" in TypeScript

    public run(): void { }
    protected setup(): void { }
    private loadKey(): void { }
}

// Constructor shorthand applies here too:
class ApiTest {
    constructor(
        public name: string,
        private apiKey: string,
        protected env: string = "staging"
    ) {}
}`,
        note: 'TypeScript derleme zamanında private/protected\'ı zorlar (Java gibi). Python\'un aksine bu gerçek bir kısıtlamadır. "package-private" yok — modüllerde internal için "export" kullanılmaz.',
        why_en: 'TypeScript access modifiers use the exact same keywords as Java: public, private, protected. Unlike Java there is no "package-private". And good news: unlike Python, TypeScript actually enforces this at compile time!',
        note_en: 'TypeScript enforces private/protected at compile time (like Java). Unlike Python, this is a real constraint. No "package-private" — for internal module use, simply don\'t export.',
      },
      // 9
      { type: "heading", text: "5. Generics — Very Similar to Java Generics" },
      // 10
      {
        type: "java-compare",
        topic: "Generics <T>",
        why: "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends), ve tip parametresi tümü tanıdık gelecek.",
        java: `// Java Generics
public class ApiResponse<T> {
    private T data;
    private boolean success;
    public T getData() { return data; }
}

// With bounds:
public <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Usage:
ApiResponse<User> resp = service.getUser(1);
User user = resp.getData();`,
        typescript: `// TypeScript Generics — very similar!
interface ApiResponse<T> {
    data: T;
    success: boolean;
}

// With bounds (extends):
function max<T extends { id: number }>(a: T, b: T): T {
    return a.id > b.id ? a : b;
}

// Usage:
const resp: ApiResponse<User> = await api.getUser(1);
const user = resp.data;  // TypeScript knows: User

// Playwright uses generics everywhere:
async function getData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return res.json() as T;
}`,
        note: 'TypeScript generics aynı <T> sözdizimini kullanır. "T extends X" = Java "T extends X". TypeScript ayrıca union types ve mapped types gibi Java\'da olmayan güçlü özellikler ekler.',
        why_en: 'TypeScript generics use nearly identical syntax to Java generics. <T>, constraints (extends), and type parameters will all feel familiar.',
        note_en: 'TypeScript generics use the same <T> syntax. "T extends X" = Java "T extends X". TypeScript also adds powerful features Java lacks, like union types and mapped types.',
      },
      // 11
      { type: "heading", text: "6. Enum — Similar to Java But Different Variants" },
      // 12
      {
        type: "java-compare",
        topic: "enum",
        why: "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric enum (Java'ya benzer) ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir.",
        java: `// Java enum (full-featured class)
public enum TestStatus {
    PASS("✅"), FAIL("❌"), SKIP("⏭️");

    private final String icon;
    TestStatus(String icon) { this.icon = icon; }
    public String getIcon() { return icon; }
}

TestStatus status = TestStatus.PASS;
status.getIcon();  // "✅"
status.name();     // "PASS"`,
        typescript: `// TypeScript: two enum styles + union type

// 1. String enum (most similar to Java):
enum TestStatus {
    PASS = "PASS",    // log'da görünür değer
    FAIL = "FAIL",
    SKIP = "SKIP"
}
TestStatus.PASS // === "PASS"

// 2. Numeric enum (Java numeric enum gibi):
enum Priority { LOW, MEDIUM, HIGH }  // 0, 1, 2

// 3. Union type (TypeScript idiomu — daha yaygın):
type Status = "PASS" | "FAIL" | "SKIP";
// No enum import needed! Compiler checks all cases.`,
        note: 'Java enum = TypeScript string enum. Ama TypeScript\'te union type (type Status = "PASS" | "FAIL") daha kısa ve tree-shakeable. QA\'de string enum kullan — log\'larda "PASS" görünür, 0 değil.',
        why_en: 'Java enums are full-featured classes. TypeScript has numeric enums (similar to Java) and string enums. In QA, string enums are preferred because they produce readable values in logs.',
        note_en: 'Java enum = TypeScript string enum. But TypeScript\'s union type (type Status = "PASS" | "FAIL") is shorter and tree-shakeable. Use string enums in QA — logs show "PASS" not 0.',
      },
      // 13
      { type: "heading", text: "7. Null Safety — Optional → Optional Chaining" },
      // 14
      {
        type: "java-compare",
        topic: "null safety & Optional chaining",
        why: "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa ve temiz handle edilir. Java Optional'ın tüm gücü tek bir operatörde.",
        java: `// Java null — NPE risk
String name = user.getName();  // NPE if user is null!

// Java 8+ Optional (verbose):
Optional.ofNullable(user)
    .map(u -> u.getAddress())
    .map(a -> a.getCity())
    .orElse("Unknown");

// Or null check (long form):
if (user != null && user.getAddress() != null) {
    city = user.getAddress().getCity();
}`,
        typescript: `// TypeScript: optional chaining ?. (much cleaner!)
const name = user?.getName(); // undefined if user is null
const city = user?.address?.city ?? "Unknown";
// No NPE! Returns undefined instead of crashing.

// ?? = nullish coalescing (null/undefined → default)
// Like Java's orElse() built into the language

// TypeScript strict null checks (tsconfig.json):
// "strictNullChecks": true
function greet(user: User | null): string {
    if (user === null) return "Guest"; // must handle null
    return user.getName(); // TypeScript: definitely not null
}`,
        note: '"?." = Java Optional.map(). "??" = Java .orElse(). tsconfig\'da "strictNullChecks: true" aç — Java\'nın null-safety derleme zamanı kontrolü gibi çalışır.',
        why_en: 'In Java, null causes NullPointerException. TypeScript has the same risk but optional chaining (?.) handles it much more concisely. All the power of Java Optional in a single operator.',
        note_en: '"?." = Java Optional.map(). "??" = Java .orElse(). Enable "strictNullChecks: true" in tsconfig — it works like Java\'s compile-time null-safety control.',
      },
      // 15
      { type: "heading", text: "8. Union Types — No Java Equivalent" },
      // 16
      {
        type: "java-compare",
        topic: "union types (no Java equivalent!)",
        why: "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder. Java'da bunu Object veya abstract class ile yapmak zorunda kalırsın.",
        java: `// Java: no union types
// Must use Object (loses type safety):
void handle(Object result) {
    if (result instanceof String s) {
        // string logic
    } else if (result instanceof Integer i) {
        // int logic
    }
    // No compile-time guarantee all cases handled
}

// Sealed classes (Java 17+) are closest:
sealed interface Result permits Ok, Err {}
record Ok(String data) implements Result {}
record Err(String msg) implements Result {}`,
        typescript: `// TypeScript union types — elegant!
type ApiResult =
    | { status: "ok";    data: string  }
    | { status: "error"; message: string };

function handle(result: ApiResult) {
    if (result.status === "ok") {
        console.log(result.data);    // TS knows: has 'data'
    } else {
        console.log(result.message); // TS knows: has 'message'
    }
    // TypeScript ensures ALL cases are covered!
}

// Simple union (very common):
function log(level: "info" | "warn" | "error"): void { ... }
let id: string | number = getIdFromApi();`,
        note: '"Discriminated union" (status field ile) = Java sealed classes, ama çok daha kısa. TypeScript switch/if ile tüm case\'lerin ele alındığını derleme zamanında kontrol eder.',
        why_en: 'One of TypeScript\'s most powerful features compared to Java. Expresses in a type-safe way that a variable can hold more than one type. In Java you\'d have to use Object or an abstract class.',
        note_en: '"Discriminated union" (using a status field) = Java sealed classes, but much shorter. TypeScript verifies at compile time that all cases are handled in switch/if.',
      },
      // 17
      { type: "heading", text: "9. Async/Await — CompletableFuture → Promise" },
      // 18
      {
        type: "java-compare",
        topic: "async/await & Promise",
        why: "TypeScript (ve JavaScript) ağ, dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. TypeScript versiyonu çok daha temizdir. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir.",
        java: `// Java CompletableFuture (verbose)
CompletableFuture<Response> future =
    httpClient.getAsync(url);

future.thenApply(response -> processResponse(response))
      .thenAccept(result -> System.out.println(result))
      .exceptionally(e -> {
          System.err.println("Error: " + e);
          return null;
      });`,
        typescript: `// TypeScript async/await (clean!)
async function fetchTests(url: string): Promise<Test[]> {
    try {
        const response = await fetch(url);   // waits
        const data = await response.json();  // waits
        return data as Test[];
    } catch (error) {
        console.error("Error:", error);
        throw error;  // re-throw
    }
}

// Playwright — all async:
test("login works", async ({ page }) => {
    await page.goto("https://example.com/login");
    await page.fill("#email", "user@test.com");
    await page.click("#submit");
    await expect(page).toHaveURL("/dashboard");
});`,
        note: '"await" = .get() on CompletableFuture (blocker until done). "async function" = CompletableFuture<T>. Playwright, Axios, fetch API tümü async-first. "await" olmadan Promise objesi alırsın, sonuç değil!',
        why_en: 'TypeScript (and JavaScript) uses async/await for network and file operations. The Java equivalent is CompletableFuture. The TypeScript version is much cleaner. Playwright is entirely async-first — every page operation requires await.',
        note_en: '"await" = .get() on CompletableFuture (blocks until done). "async function" returns Promise<T>. Playwright, Axios, and fetch API are all async-first. Without "await" you get a Promise object, not the result!',
      },
      // 19
      { type: "heading", text: "Quick Comparison Table" },
      // 20
      {
        type: "table",
        headers: ["Concept", "Java", "TypeScript", "Similarity"],
        rows: [
          ["Numeric types", "int, long, double", "number", "⚠️ all one 'number' type"],
          ["Text type", "String (capital S)", "string (lowercase s)", "⚠️ lowercase!"],
          ["Boolean", "boolean", "boolean", "✅ identical"],
          ["Class", "class Foo { }", "class Foo { }", "✅ nearly identical"],
          ["Constructor", "public Foo(args)", "constructor(args)", "⚠️ different keyword"],
          ["Interface", "interface I { }", "interface I { }", "⚠️ structural vs nominal"],
          ["Implements", "implements I", "implements I", "✅ same keyword"],
          ["Extends", "extends Base", "extends Base", "✅ same keyword"],
          ["Access modifier", "public/private/protected", "public/private/protected", "✅ same!"],
          ["Final field", "final int x", "readonly x: number", "⚠️ 'readonly' not 'final'"],
          ["Static", "static void foo()", "static foo(): void", "✅ same concept"],
          ["Generics", "class Box<T>", "class Box<T>", "✅ same syntax"],
          ["Enum", "enum Status { A, B }", "enum Status { A = 'A' }", "⚠️ string value required"],
          ["Null", "null", "null / undefined", "⚠️ TS has both null and undefined"],
          ["Optional", "Optional.ofNullable()", "value?.property", "✅ much shorter ?."],
          ["Async", "CompletableFuture<T>", "Promise<T>", "✅ same concept, clean syntax"],
          ["Checked exceptions", "throws IOException", "(none)", "✅ no checked exceptions in TS"],
          ["Union type", "(none — Object/sealed)", "string | number", "🆕 TypeScript exclusive"],
        ],
      },
      { type: 'glossary-section', terms: [
        { term: 'any', definition: { tr: 'TypeScript tip kontrolunu tamamen devre disi birakan tip. Kullanmaktan kacinin — unknown kullanin.', en: 'A TypeScript type that completely disables type checking. Avoid — use unknown instead.' } },
        { term: 'async/await', definition: { tr: 'Promise tabanlı asenkron kodu yazmanin temiz yolu. Playwright de her sayfa islemi await gerektirir.', en: 'The clean way to write Promise-based async code. Every Playwright page operation requires await.' } },
        { term: 'enum', definition: { tr: 'Adlandirilmis sabitler kumesi. Test otomasyonunda string enum tercih edilir (loglarda okunabilir deger uretir).', en: 'A named set of constants. In test automation, string enums are preferred (produce readable values in logs).' } },
        { term: 'fixture', definition: { tr: 'Playwright de test.extend ile tanimlanan, testlere injection edilen yeniden kullanilabilir kurulum/yikim birimi.', en: 'A reusable setup/teardown unit defined with test.extend in Playwright and injected into tests.' } },
        { term: 'generic', definition: { tr: '<T> sozdizimi ile yazilan tip parametresi. Herhangi bir tipte calisan ve o tipin bilgisini koruyan yeniden kullanilabilir kod saglar.', en: 'A type parameter written as <T>. Enables reusable code that works with any type while preserving type information.' } },
        { term: 'interface', definition: { tr: 'Bir nesnenin sekil sozlesmesini tanimlayan TypeScript yapisali. Java interface den farkli olarak yapisal tipleme kullanir.', en: 'A TypeScript construct that defines the shape contract of an object. Unlike Java interfaces, uses structural typing.' } },
        { term: 'Locator', definition: { tr: 'Playwright de bir UI elementini secen nesne. page.locator(\"CSS veya XPath\") ile olusturulur.', en: 'A Playwright object that selects a UI element. Created with page.locator("CSS or XPath").' } },
        { term: 'null / undefined', definition: { tr: 'TypeScript de iki farkli bos deger turu vardir. null = kasitli bos, undefined = hic atanmamis. Java nin null tan farkli olarak ikisi de ayri turlerdir.', en: 'TypeScript has two empty value types. null = intentionally empty, undefined = never assigned. Unlike Java null, both are distinct types.' } },
        { term: 'optional chaining (?.)', definition: { tr: 'Zincirdeki her nesnenin null/undefined olup olmadigini kontrol ederek null reference hatalarini onler. Java Optional.map() e esdegerdir.', en: 'Checks each object in a chain for null/undefined, preventing null reference errors. Equivalent to Java Optional.map().' } },
        { term: 'Page Object Model (POM)', definition: { tr: 'Her sayfanin ayri bir TypeScript sinifi olarak temsil edildigi tasarim deseni. Selector lari ve aksiyonlari testlerden ayirir.', en: 'A design pattern where each page is represented as a TypeScript class. Separates selectors and actions from tests.' } },
        { term: 'Promise', definition: { tr: 'Gelecekte tamamlanacak asenkron islemleri temsil eden nesne. Java CompletableFuture e esdegerdir.', en: 'An object representing an async operation that will complete in the future. Equivalent to Java CompletableFuture.' } },
        { term: 'readonly', definition: { tr: 'Atandiktan sonra degistirilemeyen alan veya degiskeni isaretler. Java final a esdegerdir.', en: 'Marks a field or variable that cannot be changed after assignment. Equivalent to Java final.' } },
        { term: 'structural typing', definition: { tr: 'TypeScript tip sisteminin temeli: bir nesnenin tipini adi degil sekli (ozellikleri ve metodlari) belirler. Java nominal tiplemenin karsitidir.', en: "The foundation of TypeScript's type system: an object's type is determined by its shape (properties and methods), not its name. Opposite of Java's nominal typing." } },
        { term: 'tsconfig.json', definition: { tr: 'TypeScript derleyicisine projeyi nasil derleyecegini soyleyen yapilandirma dosyasi. strict, target, module gibi ayarlari icerir.', en: 'The configuration file that tells the TypeScript compiler how to build the project. Contains settings like strict, target, module.' } },
        { term: 'type alias', definition: { tr: 'type keyword u ile tanimlanan tip kisayolu. Union tipler, tuple lar ve primitive tipler icin interface den daha ifadeseldir.', en: 'A type shortcut defined with the type keyword. More expressive than interface for union types, tuples, and primitive types.' } },
        { term: 'type guard', definition: { tr: 'Typeof, instanceof veya in operatorleri ile bir union tipin belirli bir kolunu dogrulayan kontrol. TypeScript in o kolda ne oldugunu bilmesini saglar.', en: 'A check using typeof, instanceof, or in operators to verify a specific branch of a union type. Lets TypeScript know what is in that branch.' } },
        { term: 'union type (A | B)', definition: { tr: 'Bir degerin birden fazla tipten biri olabilecegini ifade eder. Java sealed classes a benzer ama cok daha kisadir.', en: 'Expresses that a value can be one of multiple types. Similar to Java sealed classes but much more concise.' } },
        { term: 'unknown', definition: { tr: 'any nin daha guvenli alternatifi. Kullanmadan once tip daralttirmasi (type narrowing) yapmak zorundasinizdir.', en: "A safer alternative to any. You must perform type narrowing before using it." } },
      ]},
      {
        type: "quiz",
        question: { tr: "Java'daki interface ile TypeScript'teki interface arasındaki en önemli fark nedir?", en: "What is the most important difference between an interface in Java and an interface in TypeScript?" },
        options: [
          { id: "a", text: { tr: "TypeScript interface'leri metot içeremez", en: "TypeScript interfaces cannot contain methods" } },
          { id: "b", text: { tr: "TypeScript yapısal tipleme kullanır — bir obje açıkça 'implements' demeden, sadece şekli uyuyorsa o interface'e atanabilir; Java nominal tiplemede açık 'implements' ister", en: "TypeScript uses structural typing — an object can satisfy an interface just by having the right shape, without explicitly declaring 'implements'; Java's nominal typing requires explicit 'implements'" } },
          { id: "c", text: { tr: "TypeScript interface'leri sadece bir kez kullanılabilir", en: "TypeScript interfaces can only be used once" } },
          { id: "d", text: { tr: "Java interface'leri generic destekler, TypeScript desteklemez", en: "Java interfaces support generics, TypeScript does not" } },
        ],
        correct: "b",
        explanation: { tr: "Java nominal tiplemeye dayanır: bir sınıfın bir interface'i karşıladığını söylemek için açıkça `implements InterfaceName` yazman gerekir. TypeScript ise yapısal tiplemeye dayanır: bir obje, interface'in beklediği tüm property/metodlara sahipse, hiçbir `implements` bildirimi olmadan o interface tipine atanabilir — derleyici sadece şekle bakar. Bu, TypeScript'i mock obje oluşturmada ve farklı kütüphanelerin tiplerini birbirine uydurmada Java'dan daha esnek yapar.", en: "Java relies on nominal typing: a class must explicitly write `implements InterfaceName` to satisfy an interface. TypeScript relies on structural typing: an object can be assigned to an interface type as long as it has all the required properties/methods — the compiler only checks the shape, with no `implements` declaration needed at all. This makes TypeScript more flexible than Java when building mock objects or reconciling types across different libraries." },
        retryQuestion: {
          question: { tr: "Bir testte `interface Logger { log(msg: string): void }` tipinde bir parametre bekleyen bir fonksiyona, `{ log: (msg) => console.log(msg) }` şeklinde sade bir obje literal'i geçiriyorsun, hiç `implements Logger` yazmadan. TypeScript ne yapar?", en: 'In a test, you pass a plain object literal `{ log: (msg) => console.log(msg) }` to a function expecting an `interface Logger { log(msg: string): void }` parameter, with no `implements Logger` anywhere. What does TypeScript do?' },
          options: [
            { id: "a", text: { tr: "Derleme hatası verir, çünkü hiçbir sınıf açıkça implements Logger demedi", en: "It throws a compile error because no class explicitly said implements Logger" } },
            { id: "b", text: { tr: "Kabul eder — obje, Logger'ın beklediği şekle (bir log metodu) sahip olduğu için geçerlidir", en: "It accepts it — the object has the shape Logger expects (a log method), so it's valid" } },
            { id: "c", text: { tr: "Runtime'da çalışır ama derleme zamanında uyarı verir", en: "It runs at runtime but warns at compile time" } },
            { id: "d", text: { tr: "Sadece class instance'ları interface parametresi olarak kabul edilir", en: "Only class instances are accepted as interface parameters" } },
          ],
          correct: "b",
          explanation: { tr: 'Bu, yapısal tiplemenin (structural typing) tam tanımıdır: obje literal\'i Logger interface\'inin gerektirdiği şekle (bir `log(msg: string): void` metodu) sahip olduğu için, hiçbir `implements` bildirimine ihtiyaç olmadan kabul edilir. Bu, testlerde gerçek bir logger sınıfı oluşturmadan basit obje literal\'leriyle mock/stub yapmayı kolaylaştırır — Java\'da bunun için her zaman interface\'i implement eden gerçek bir sınıf (veya anonim sınıf) gerekirdi.', en: 'This is structural typing in action: the object literal is accepted with no `implements` declaration needed at all, simply because it has the shape Logger requires (a `log(msg: string): void` method). This makes it easy to mock/stub in tests using plain object literals instead of creating a real logger class — Java would always require an actual class (or anonymous class) that implements the interface for this.' },
        },
      },
    ],
  },
  // ─────────────────────────────────────────────
  // SECTION 9 — Test Runners (Vitest / Jest)
  // ─────────────────────────────────────────────
  {
    title: "Test Runners — Vitest & Unit Testing",
    blocks: [
      // 0
      { type: "simple-box", emoji: "🏃", content: {
        tr: "Vitest, bir öğretmenin tüm öğrenci ödevlerini hızlıca tek tek kontrol edip yanına ✅ veya ❌ yazması gibidir. Her test dosyası bir ödev kağıdıdır; Vitest hepsini saniyeler içinde tarar ve hangisinin doğru hangisinin yanlış olduğunu renkli olarak gösterir.",
        en: "Vitest is like a teacher quickly checking every student's homework and marking it ✅ or ❌. Each test file is a homework sheet; Vitest scans them all in seconds and shows, in color, which ones are right and which are wrong.",
      } },
      // 1
      { type: "heading", content: "Vitest: The Vite-Native Test Runner" },
      // 2
      {
        type: "text",
        content:
          "Playwright Test already ships its own test runner for end-to-end browser tests — you don't need Vitest for that. But the moment you write a plain TypeScript helper function (a price formatter, a data parser, a custom wait utility), you want to unit test that function in isolation, without spinning up a browser. That's where Vitest comes in: a fast, Jest-compatible test runner built on top of Vite, with zero-config TypeScript support. Jest is the older, more established alternative — same API shape (describe, it, expect), slower startup, and requires ts-jest to understand TypeScript out of the box.",
      },
      // 3
      {
        type: "code",
        language: "typescript",
        code: `// utils/formatPrice.ts — a plain helper, no browser needed
export function formatPrice(cents: number): string {
  if (cents < 0) throw new Error('Price cannot be negative');
  return \`$\${(cents / 100).toFixed(2)}\`;
}

// utils/formatPrice.test.ts — Vitest unit test
import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats whole dollars', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });

  it('formats cents correctly', () => {
    expect(formatPrice(99)).toBe('$0.99');
  });

  it('throws on negative input', () => {
    expect(() => formatPrice(-50)).toThrow('Price cannot be negative');
  });
});

// Run it:
// npx vitest run`,
      },
      // 4
      {
        type: 'simulation',
        icon: '🏃',
        color: '#729b1e',
        title: { en: 'Vitest — Live Unit Test Run', tr: 'Vitest — Canlı Unit Test Çalıştırma' },
        scenario: 'vitest-runner',
        description: {
          en: 'Click "▶ npx vitest run": watch Vitest collect the test file, execute every "it()" block, and report a pass/fail summary plus a coverage report — the same flow your terminal shows in a real project.',
          tr: '"▶ npx vitest run" butonuna bas: Vitest\'in test dosyasını topladığını, her "it()" bloğunu çalıştırdığını ve bir pass/fail özeti ile coverage raporu verdiğini izle — gerçek bir projede terminalinde gördüğün akışın birebir aynısı.',
        },
        code: `// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: { reporter: ['text', 'html'] },
  },
});

// package.json
// "scripts": { "test:unit": "vitest run --coverage" }`,
      },
      // 5
      {
        type: "java-compare",
        topic: "Unit Test Runner: JUnit vs Vitest",
        why: "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
        why_en: "JUnit is the standard unit test runner in Java, almost always paired with Maven Surefire to produce CI reports. Vitest plays the exact same role for plain TypeScript functions — fast, isolated, no browser needed.",
        java: `// Java — JUnit 5
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FormatPriceTest {
    @Test
    void formatsWholeDollars() {
        assertEquals("$10.00", PriceUtil.format(1000));
    }

    @Test
    void throwsOnNegativeInput() {
        assertThrows(IllegalArgumentException.class,
            () -> PriceUtil.format(-50));
    }
}

// mvn test → target/surefire-reports/*.xml`,
        typescript: `// TypeScript — Vitest
import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats whole dollars', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });

  it('throws on negative input', () => {
    expect(() => formatPrice(-50)).toThrow();
  });
});

// npx vitest run --coverage → coverage/index.html`,
        note: "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite.",
        note_en: "The @Test annotation in Java maps almost 1-to-1 to Vitest's it()/test() — both isolate one behavior per function, both fail loudly with a stack trace, and both plug into CI as a separate step from your end-to-end (Playwright/Selenium) suite.",
      },
      {
        type: "quiz",
        question: { tr: "Playwright Test zaten kendi test runner'ına sahipken, bir QA otomasyon projesinde Vitest'e ne zaman ihtiyaç duyulur?", en: "Given that Playwright Test already has its own test runner, when does a QA automation project actually need Vitest?" },
        options: [
          { id: "a", text: { tr: "Playwright testlerini daha hızlı çalıştırmak için", en: "To make Playwright tests run faster" } },
          { id: "b", text: { tr: "Tarayıcı açmadan, düz bir TypeScript yardımcı fonksiyonunu (formatter, parser, util) izole şekilde unit test etmek için", en: "To unit test a plain TypeScript helper function (a formatter, parser, util) in isolation, without opening a browser" } },
          { id: "c", text: { tr: "Playwright'ın hiç desteklemediği tarayıcılarda test çalıştırmak için", en: "To run tests in browsers Playwright does not support at all" } },
          { id: "d", text: { tr: "CI/CD pipeline'ına ihtiyacı ortadan kaldırmak için", en: "To eliminate the need for a CI/CD pipeline" } },
        ],
        correct: "b",
        explanation: { tr: "Playwright Test, uçtan uca tarayıcı testleri için zaten yeterlidir — Vitest'e gerek yoktur. Ama bir fiyat formatlayıcı veya veri parser'ı gibi düz bir TypeScript fonksiyonu yazdığında, o fonksiyonu tarayıcı açmadan, hızlı ve izole şekilde test etmek istersin — Java'da JUnit'in bir servis sınıfını Selenium'a hiç dokunmadan unit test etmesiyle aynı mantık. Vitest bu rolü TypeScript dünyasında üstlenir.", en: "Playwright Test is already sufficient for end-to-end browser tests — Vitest is not needed there. But the moment you write a plain TypeScript function like a price formatter or data parser, you want to test it fast and in isolation, without spinning up a browser — the same logic as JUnit unit-testing a service class in Java without touching Selenium at all. Vitest fills that role in the TypeScript world." },
        retryQuestion: {
          question: { tr: "Bir `formatPrice(cents: number): string` fonksiyonunu Vitest ile unit test etmenin, onu sadece bir Playwright E2E testi içinde dolaylı olarak test etmeye göre temel avantajı nedir?", en: 'What is the core advantage of unit testing a `formatPrice(cents: number): string` function with Vitest, versus only testing it indirectly inside a Playwright E2E test?' },
          options: [
            { id: "a", text: { tr: "Vitest testleri her zaman daha yüksek coverage verir", en: "Vitest tests always produce higher coverage" } },
            { id: "b", text: { tr: "Tarayıcı açmadan, saniyeler içinde ve fonksiyonu izole ederek çalışır — bir E2E testi başarısız olursa hatanın formatPrice'tan mı yoksa UI'dan mı geldiği belirsiz olur", en: "It runs in seconds with no browser, testing the function in isolation — if an E2E test fails, it's unclear whether the bug is in formatPrice or the UI" } },
            { id: "c", text: { tr: "Vitest, Playwright'ın test edemediği bir sözdizimi kullanır", en: "Vitest uses syntax Playwright cannot test" } },
            { id: "d", text: { tr: "E2E testleri unit test edilebilir fonksiyonları çalıştıramaz", en: "E2E tests cannot execute unit-testable functions at all" } },
          ],
          correct: "b",
          explanation: { tr: 'Bir E2E testi `formatPrice`\'ı sadece DOLAYLI olarak (sayfada doğru fiyatın görünmesi üzerinden) test eder — başarısız olursa, hatanın formatPrice\'ın kendisinde mi yoksa render/UI mantığında mı olduğunu ayırt etmek zordur, ayrıca her assertion için bir tarayıcı başlatmak gerekir (saniyeler/dakikalar). Vitest, fonksiyonu doğrudan, tarayıcısız ve milisaniyeler içinde test eder — hata varsa tam olarak nerede olduğunu hemen gösterir.', en: 'An E2E test only tests `formatPrice` INDIRECTLY (via the correct price appearing on the page) — if it fails, it is hard to tell whether the bug is in formatPrice itself or in rendering/UI logic, and spinning up a browser for every assertion costs seconds/minutes. Vitest tests the function directly, with no browser, in milliseconds — if it fails, it tells you exactly where the bug is.' },
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATION HELPER
// ─────────────────────────────────────────────────────────────────────────────
function applyTr(enSection, overrides) {
  return {
    title: overrides.title ?? enSection.title,
    blocks: enSection.blocks.map((block, i) => {
      const o = overrides.blocks?.[i]
      if (!o) return block
      return { ...block, ...o }
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TURKISH SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
const trSections = [
  applyTr(sections[0], {
    title: "TypeScript Nedir & Neden Kullanmalı?",
    blocks: {
      0: { content: "TypeScript vs JavaScript" },
      1: { content: "TypeScript, Microsoft tarafından geliştirilen, statik olarak tiplenmiş bir JavaScript üst kümesidir. Her geçerli JavaScript dosyası aynı zamanda geçerli bir TypeScript dosyasıdır — tüm kod tabanınızı yeniden yazmadan kademeli olarak benimseyebilirsiniz. TypeScript, tür hatalarını, tanımsız özellik erişimlerini ve yanlış argüman tiplerini kodunuz çalışmadan önce yakalayan bir derleme adımı ekler." },
      2: { content: "Test Otomasyonu için Neden TypeScript?", difficulty: "🟢 Başlangıç" },
      3: { items: [
        { icon: "🐛", label: "Hataları Erken Yakala", desc: "Tür hataları IDE'nizde derleme zamanında ortaya çıkar — CI'da gece 2'de test paketi başarısız olduğunda değil." },
        { icon: "💡", label: "IDE Otomatik Tamamlama", desc: "Playwright'ın Page, Locator, Browser ve kendi Page Object'leriniz için tam IntelliSense — metod adlarını artık tahmin etmek yok." },
        { icon: "🔧", label: "Güvenli Yeniden Düzenleme", desc: "Bir metod adını veya seçici tipini değiştirin; TypeScript etkilenen tüm çağrı noktalarını anında gösterir." },
        { icon: "📖", label: "Kendini Belgeleyen Kod", desc: "Tip imzaları satır içi dokümantasyon görevi görür. `(user: User): Promise<void>` olarak tiplenmiş bir fonksiyon kendini açıklar." },
        { icon: "👥", label: "Takım Ölçeği", desc: "Büyük QA takımları en çok yararlanır — tipli interface'ler page object'ler, fixture'lar ve test data factory'leri arasındaki sözleşmeleri zorunlu kılar." },
        { icon: "🎭", label: "Playwright Native", desc: "Playwright TypeScript ile yazılmıştır ve birinci sınıf .d.ts tanımları içerir. TypeScript, Playwright için resmi olarak önerilen dildir." },
      ]},
      4: { content: "TypeScript vs JavaScript: Özellik Karşılaştırması" },
      5: {
        headers: ["Özellik", "JavaScript", "TypeScript"],
        rows: [
          ["Tür güvenliği", "Yok (dinamik)", "Statik, isteğe bağlı"],
          ["IDE desteği", "Temel", "Tam IntelliSense + otomatik tamamlama"],
          ["Derleme adımı", "Yok — doğrudan çalışır", "tsc ile .js'e derlenir"],
          ["Öğrenme eğrisi", "Düşük", "Düşük→Orta (tipler kavram ekler)"],
          ["Playwright desteği", "Destekleniyor", "Birinci sınıf, önerilen"],
          ["Hata algılama zamanı", "Çalışma zamanı (testler başarısız)", "Derleme zamanı (çalıştırmadan önce)"],
        ]
      },
      6: { content: "Test Ekosisteminde TypeScript" },
      7: {
        headers: ["Araç", "TS Desteği", "Notlar"],
        rows: [
          ["Playwright", "Birinci sınıf", "TS ile yazılmış; tüm tipler pakette mevcut"],
          ["Jest", "Mükemmel (ts-jest ile)", "ts-jest + @types/jest kur"],
          ["Cypress", "İyi", "tsconfig ekle; bazı any-ağırlıklı iç kısımlar"],
          ["Vitest", "Native", "Vite üzerine kurulu; sıfır konfigürasyon TypeScript"],
        ]
      },
      8: { content: "Bugün yeni bir Playwright projesi başlatıyorsanız, ilk `npm init playwright@latest` komutundan TypeScript'i seçin. Büyük bir JS test paketine sonradan tip eklemek, baştan tipli başlamaktan çok daha zordur." },
    }
  }),
  applyTr(sections[1], {
    title: "Kurulum & Yapılandırma",
    blocks: {
      0: { content: "Adım 1 — Node.js LTS Kurulumu", difficulty: "🟢 Başlangıç" },
      1: { content: "TypeScript, Node.js üzerinde çalışır. Her zaman LTS (Uzun Vadeli Destek) sürümünü kurun — bu en kararlı versiyondur ve CI/CD ortamlarının kullandığı sürümdür. https://nodejs.org adresinden indirin ve 'LTS' düğmesini seçin." },
      2: { items: [
        "Windows: nodejs.org'dan .msi yükleyicisini indirin, çalıştırın, tüm varsayılanları bırakın, 'Add to PATH' kutusunu işaretleyin",
        "macOS: Homebrew kullanın — `brew install node` — veya nodejs.org'dan .pkg indirin",
        "Linux (Ubuntu/Debian): `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`",
        "Aşağıdaki komutları çalıştırarak her iki aracın da kurulu olduğunu doğrulayın",
      ]},
      4: { content: "Adım 2 — TypeScript'i Global Kurma" },
      6: { content: "Adım 3 — tsconfig.json Oluşturma" },
      7: { content: "tsconfig.json, TypeScript derleyicisine projenizi nasıl derleyeceğini söyler. Her TypeScript projesi bir tane gerektirir. `tsc --init` ile bir başlangıç şablonu oluşturabilir veya Playwright için optimize edilmiş aşağıdaki açıklamalı şablonu kullanabilirsiniz." },
      9: { content: "Adım 4 — VS Code Uzantıları" },
      10: { items: [
        { label: "TypeScript Language Features", desc: "Uzantı ID: vscode.typescript-language-features — VS Code'da yerleşik, IntelliSense, tanıma gitme ve yeniden düzenleme sağlar." },
        { label: "ESLint", desc: "Uzantı ID: dbaeumer.vscode-eslint — tür hatalarının ötesinde kod kalitesi sorunları için TypeScript'i lint eder." },
        { label: "Prettier", desc: "Uzantı ID: esbenp.prettier-vscode — kayıt sırasında TypeScript'i otomatik biçimlendirir." },
        { label: "Playwright Test for VS Code", desc: "Uzantı ID: ms-playwright.playwright — VS Code içinde doğrudan GUI ile Playwright testlerini çalıştırın ve hata ayıklayın." },
      ]},
      11: { content: "Adım 5 — TypeScript'te Merhaba Dünya" },
      14: { content: "Adım 6 — ts-node: Derleme Adımını Atla" },
      16: { content: "Adım 7 — Playwright TypeScript Projesi Oluştur" },
      17: { items: [
        "Yeni klasör oluştur: `mkdir my-playwright-project && cd my-playwright-project`",
        "Playwright yükleyicisini çalıştır: `npm init playwright@latest`",
        "Soru: 'TypeScript mi JavaScript mi kullanmak istersiniz?' → TypeScript seçin",
        "Soru: 'End-to-end testlerinizi nereye koymak istersiniz?' → Varsayılanı kabul edin: tests",
        "Soru: 'GitHub Actions workflow eklensin mi?' → true seçin (önerilir)",
        "Soru: 'Playwright tarayıcıları kurulsun mu?' → true seçin",
        "Kurulum için bekleyin — Playwright Chromium, Firefox ve WebKit'i indirir",
        "Örnek testi çalıştırın: `npx playwright test`",
        "HTML raporu açın: `npx playwright show-report`",
      ]},
      19: { content: "`npm init playwright@latest` sonrasında `playwright.config.ts` dosyasını açın — zaten tam olarak tiplenmiş. `tests/` klasöründeki testleriniz `.spec.ts` dosyaları olacak. `page`, `expect`, `browser` ve tüm Playwright API'si için anında otomatik tamamlama kullanabilirsiniz." },
    }
  }),
  applyTr(sections[2], {
    title: "TypeScript Temelleri",
    blocks: {
      0: { content: "TypeScript vs JavaScript: Aynı Hata, İki Farklı Sonuç", difficulty: "🟢 Başlangıç" },
      3: { content: "Temel Tipler" },
      5: { content: "Tip Çıkarımı (Type Inference)" },
      7: { content: "Diziler (Array)" },
      9: { content: "Tuple'lar" },
      11: { content: "Enum'lar — String Enum'lar Test için En İyisi" },
      13: { content: "Interface'ler" },
      15: { content: "Type Alias vs Interface" },
      17: { content: "İnteraktif Örnek: TestResult Interface + TestCase Enum" },
      19: { content: "TypeScript vs JavaScript — Yan Yana Karşılaştırma" },
      20: {
        title: "TypeScript Nasıl Derlenir",
        items: [
          { icon: "📝", label: "TypeScript", desc: ".ts kaynak dosyası" },
          { arrow: true },
          { icon: "⚙️", label: "tsc derleyici", desc: "Tür kontrolü", highlight: true },
          { arrow: true },
          { icon: "📦", label: "JavaScript", desc: ".js çıktı dosyası" },
          { arrow: true },
          { icon: "🌐", label: "Tarayıcı/Node", desc: "Çalışma zamanı" },
        ],
        note: "TypeScript hiçbir zaman doğrudan çalışmaz. Düz JavaScript'e derlenir. Tür bilgisi yalnızca derleme zamanında kullanılır ve nihai JS çıktısından silinir.",
      },
      21: {
        left: {
          label: "❌ JavaScript — Çalışma zamanı hatası",
          code: `function sendRequest(url, options) {
  // url her şey olabilir!
  // options undefined olabilir!
  return fetch(url, options);
}

// Yanlış çağrıldı — uyarı yok:
sendRequest(42, "GET");
// Hata yalnızca testler çalışırken bulunur!`,
          note: "Hatalar çalışma zamanında bulunur (çok geç)",
        },
        right: {
          label: "✅ TypeScript — Derleme zamanı hatası",
          code: `interface RequestOptions {
  method: "GET" | "POST";
  timeout?: number;
}

function sendRequest(url: string, opts: RequestOptions) {
  return fetch(url, opts);
}

// sendRequest(42, "GET");
// Hata: number, string tipine atanamaz
// Hata: string, RequestOptions tipine atanamaz`,
          note: "Hatalar çalıştırmadan önce IDE'de bulunur!",
        },
      },
      22: {
        headers: ["TypeScript Özelliği", "Ne Yapar?", "Olmadan Yaşanırdı..."],
        rows: [
          ["Tip açıklamaları", "Değişken/parametre tiplerini bildir", "Çalışma zamanı TypeError'ları"],
          ["interface", "Nesne şeklini tanımla", "Tanımsız özelliklere erişim"],
          ["enum", "Adlandırılmış sabit kümesi", "'PASS'/'FAIL' gibi sihirli stringler"],
          ["optional ?", "Alanları isteğe bağlı yap", "Eksik alanlarda hatalar"],
          ["readonly", "Değişimi önle", "Yanlışlıkla veri değişiklikleri"],
          ["union tip A | B", "Birden fazla tipe izin ver", "Aşırı esnek any tipi"],
          ["generic'ler <T>", "Yeniden kullanılabilir tipli kod", "Tip başına yinelenen fonksiyonlar"],
        ],
      },
      23: {
        question: "TypeScript'te şu interface'de ? sembolü ne anlama gelir: interface Test { errorMessage?: string }",
        options: [
          "errorMessage null olabilir",
          "errorMessage zorunludur ve string olmalıdır",
          "errorMessage isteğe bağlıdır — bulunabilir veya bulunmayabilir",
          "errorMessage herhangi bir tipte olabilir",
        ],
        correct: 2,
        explanation: "? özelliği isteğe bağlı yapar. errorMessage sağlanmış olsun veya olmasın interface geçerlidir. Mevcut olduğunda string olmalıdır; yoksa undefined'dır. Bu, yalnızca başarısız testler için var olan hata mesajları gibi alanlar için mükemmeldir.",
      },
      24: { content: "☕ Java Biliyorsan: Tip Sistemi Köprüsü" },
      25: { topic: "Temel Tipler", why: "Java'da ayrı sayısal tipler vardır (int, long, float, double). TypeScript tüm sayılar için tek 'number' tipini kullanır. 'string' küçük harf (Java'nın String objesi değil), 'boolean' aynı.", note: '"number" Java\'nın int/long/float/double\'ının hepsini karşılar. "string" küçük harf ≠ Java String büyük harf. Ayrıca: "any" (Object gibi — kaçın!) ve "unknown" (daha güvenli any) var.' },
      26: { topic: "interface (yapısal tipleme!)", why: "TypeScript interface'leri Java'dakilere benzer ama kritik bir fark var: yapısal tipleme. Bir sınıfın 'implements' bildirmesi GEREKMİYOR — doğru şekle sahip her nesne interface'i karşılar.", note: 'Java = nominal tipleme ("implements" zorunlu). TypeScript = yapısal tipleme ("doğru şekle sahip olman yeterli"). Bu TypeScript\'in en güçlü ve en farklı konseptidir.' },
      27: { topic: "erişim belirleyicileri (aynı keyword\'ler!)", why: "TypeScript erişim belirleyicileri Java ile birebir aynı keyword'leri kullanır: public, private, protected. Java'dan farklı olarak package-private yok. Python'un aksine TypeScript gerçekten derleme zamanında zorlar!", note: 'TypeScript derleme zamanında private/protected\'ı zorlar (Java gibi). "readonly" = Java "final". Constructor shorthand: "constructor(private x: T)" hem tanımlar hem atar — büyük boilerplate tasarrufu.' },
    }
  }),
  applyTr(sections[3], {
    title: "Orta Seviye TypeScript",
    blocks: {
      0: { content: "Tipli Fonksiyonlar", difficulty: "🟡 Orta Seviye" },
      2: { content: "Union ve Intersection Tipleri" },
      4: { content: "Type Guard'lar" },
      6: { content: "Generic'ler" },
      8: { content: "Access Modifier'lı Class'lar" },
      10: { content: "Abstract Class'lar — Temel POM Kalıbı" },
      12: { content: "Modüller: Export, Import ve Barrel Dosyaları" },
      14: { content: "İnteraktif Örnek: Interface ile Tipli Page Object" },
      16: { content: "☕ Java Biliyorsan: Class ve Generic Köprüsü" },
      17: { topic: "class (neredeyse aynı!)", why: "TypeScript class sözdizimi Java'ya o kadar benzer ki sadece küçük farklılıklar var: 'constructor' keyword'ü, 'final' yerine 'readonly', ve constructor shorthand (tek satırda hem tanımla hem ata).", note: '"readonly" = Java "final". Constructor shorthand: "constructor(private x: T)" hem field\'ı tanımlar hem atar — Java\'ya kıyasla büyük boilerplate tasarrufu.' },
      18: { topic: "Generic\'ler <T>", why: "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır: <T>, kısıtlar (extends), tip parametresi — hepsi tanıdık gelecek. Playwright'ın kendisi de generic'leri yoğun kullanır.", note: 'TypeScript generic\'ler aynı <T> sözdizimini kullanır. "T extends X" = Java "T extends X". TypeScript ayrıca union types ve mapped types ekler — Java\'da olmayan özellikler.' },
      19: {
        left: {
          label: '✅ Union Tip ( | ) — "VEYA"',
          note: 'Union = "bunlardan biri". Türü daraltmak için typeof/instanceof/in guard kullanın.',
        },
        right: {
          label: '✅ Intersection Tip ( & ) — "VE"',
          note: 'Intersection = "hepsi aynı anda". Her tipin her alanı zorunludur.',
        },
      },
      20: {
        title: 'Page Object Model — TypeScript Sınıf Hiyerarşisi',
        note: 'TypeScript, POM yapısını derleme zamanında zorlar: abstract doğrudan oluşturulmasını engeller, interface sözleşmeyi uygular, somut sayfalar her ikisini de uygular.',
        steps: [
          { num: '1', label: 'interface IPage', desc: 'navigate(), isLoaded() sözleşmesi' },
          { num: '2', label: 'abstract PageBase', desc: 'IPage uygular, ortak yardımcılar' },
          { num: '3', label: 'class LoginPage', desc: 'PageBase\'i genişletir, login() ekler', highlight: true },
          { num: '4', label: 'class CheckoutPage', desc: 'PageBase\'i genişletir, fillForm() ekler', highlight: true },
          { num: '5', label: 'test.spec.ts', desc: 'sadece LoginPage ve CheckoutPage kullanır' },
        ],
      },
    }
  }),
  applyTr(sections[4], {
    title: "İleri Seviye TypeScript",
    blocks: {
      // sections[4] headings use `text` property — indices: 0,7,12,17,22,30
      0:  { text: "Temel Generic'ler",                          difficulty: "🔴 İleri" },
      7:  { text: "Utility Type'lar",                           difficulty: "🔴 İleri" },
      12: { text: "Keyof",                                      difficulty: "🔴 İleri" },
      17: { text: "Null Güvenliği",                             difficulty: "🔴 İleri" },
      22: { text: "Definitely Typed & @types Paketleri",        difficulty: "🟡 Orta"  },
      30: { text: "Koşullu & Eşlenmiş Type'lar",                difficulty: "🔴 İleri" },
    }
  }),
  applyTr(sections[5], {
    title: "QA Kullanım Örnekleri",
    blocks: {
      0: { content: "1. Tam Tipli Page Object Model" },
      2: { content: "2. Ortam, Tarayıcı ve Test Durumu için Enum'lar" },
      4: { content: "3. API Yanıtı Doğrulaması için Interface" },
      6: { content: "4. Generic Test Data Factory" },
      8: { content: "5. Partial Override ile Type-Safe Config" },
      10: { content: "6. Tipli Playwright Fixture'ları" },
      12: { content: "7. Partial Override Testi için Utility Type'lar" },
      14: { content: "🏗️ Playwright POM Mimarisi — Sınıf Hiyerarşisi", difficulty: "🟡 Orta Seviye" },
      15: {
        title: "TypeScript POM Sınıf Hiyerarşisi — Katman Katman",
        note: "Her katman üsttekinden miras alır. Testler yalnızca public metodları çağırır — selector'lar sayfa sınıflarının içinde gizlidir.",
        steps: [
          { num: "1", label: "IPage Interface", desc: "navigate(), login(), getError() — public sözleşme", highlight: true },
          { num: "2", label: "PageBase (abstract)", desc: "Paylaşılan yardımcılar: waitForLoad(), expectUrl(), getLocator()" },
          { num: "3", label: "LoginPage extends PageBase", desc: "IPage'i uygular — tüm selector ve aksiyonlara sahip" },
          { num: "4", label: "test fixture (test.extend)", desc: "loginPage: async({page}, use) => { ... }" },
          { num: "5", label: "Test dosyası", desc: "test('login', async({ loginPage }) => { await loginPage.login(...) })", highlight: true },
        ],
      },
      16: {
        left: {
          label: "❌ Tipsiz — Çalışma Zamanı Sürprizleri",
          code: `// JavaScript / tipsiz Playwright
test('login', async ({ page }) => {
  await page.fill('#emal', 'user@test.com');  // yazım hatası
  await page.click('#submit-btn');

  // IDE uyarısı yok — çalışma zamanında çöküyor
  const result = await page.locator('.dashbord').textContent();
  //                                  ^ hata — test çalışana dek fark edilmiyor
  expect(result).toBe('Welcome!');
});`,
          note: "Selector yazım hataları çalışma zamanında ortaya çıkar — pahalı CI başarısızlıkları",
        },
        right: {
          label: "✅ Tipli POM — Derleme Zamanında Yakalanır",
          code: `// TypeScript Playwright POM
export class LoginPage {
  private readonly emailInput: Locator;    // tipli alan
  constructor(private readonly page: Page) {
    this.emailInput = page.locator('[data-testid="email"]');
  }
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);   // IDE fill() seçeneklerini gösterir
    // loginPage.fill(email) ← derleyici hatası: metot yok
  }
}

test('login', async ({ loginPage }) => {
  await loginPage.login('user@test.com', 'pass');
  // loginPage.navigate(42) ← Hata: number, void'e atanamaz
});`,
          note: "Selector değişiklikleri güvenle yayılır — derleyici her hatalı çağrıyı gösterir",
        },
      },
      17: {
        title: "Tipli Fixture Pipeline'ı — Config'den Teste",
        items: [
          { icon: "⚙️", label: "playwright.config.ts", desc: "baseURL, timeout, retries" },
          { arrow: true },
          { icon: "🔧", label: "test.extend<MyFixtures>", desc: "loginPage, testUser, apiBaseUrl" },
          { arrow: true },
          { icon: "📄", label: "LoginPage sınıfı", desc: "private Locator'lar, tipli metodlar" },
          { arrow: true },
          { icon: "🧪", label: "Test fonksiyonu", desc: "async ({ loginPage, testUser }) => {}" },
          { arrow: true },
          { icon: "✅", label: "Type-safe assertion'lar", desc: "expect().toHaveURL(), toHaveText()" },
        ],
        note: "Her ok tipli bir sınırdır — yanlış tip geçilmesi çalışma zamanı hatası değil, derleme hatası tetikler.",
      },
    }
  }),
  applyTr(sections[6], {
    title: "Mülakat Soruları & Cevapları",
    blocks: {
      0: { content: "Temel Sorular (1–5)", difficulty: "🟢 Başlangıç" },
      1: { question: "1. Test otomasyonu için TypeScript ile JavaScript arasındaki temel fark nedir?", answer: "TypeScript, derleme adımı ekleyen statik olarak tiplenmiş bir JavaScript üst kümesidir. Test otomasyonundaki temel avantajlar: tür hataları testler çalışmadan önce yakalanır (gece 3'te CI başarısızlığı yerine); IDE otomatik tamamlaması tüm Playwright API'lerinde, page object'lerde ve fixture'larda çalışır; yeniden düzenleme güvenlidir çünkü derleyici her hatalı çağrı noktasını anında gösterir. JavaScript'in derleme adımı yoktur — tüm tür hataları çalışma zamanı sürprizleri olur. Playwright'ın kendisi TypeScript ile yazılmış ve TypeScript, Playwright projeleri için resmi olarak önerilen dildir." },
      2: { question: "2. TypeScript'te interface ile type alias arasındaki fark nedir?", answer: "Her ikisi de nesne şekillerini tanımlar ancak temel farkları vardır. interface declaration merging destekler — üçüncü taraf tipleri genişletmek için yararlıdır (Playwright'ın TestFixtures'ını genişletmek gibi). type, union tipleri (`string | number`), intersection tipleri (`A & B`), tuple tipleri ve mapped tipleri destekler — daha ifadeseldir.\n\nGenel kural: Class şekilleri ve public API'ler için interface; union'lar, primitifler ve karmaşık hesaplanmış tipler için type kullanın." },
      3: { question: "3. 'any' nedir ve test otomasyonunda neden kaçınılmalıdır?", answer: "any, TypeScript'in tür denetimini tamamen devre dışı bırakan bir kaçış kapısıdır. Ona her şeyi atayabilir ve herhangi bir metodu çağırabilirsiniz — ancak bu hatalar derleme zamanı yerine çalışma zamanında ortaya çıkar. Test otomasyonunda any kullanmak TypeScript'in tüm amacını ortadan kaldırır: otomatik tamamlamayı kaybedersiniz, derleme zamanı güvenliğini kaybedersiniz. Gerçekten tipi bilmediğinizde any yerine unknown kullanın — kullanmadan önce tip daralması (type narrowing) yapmaya zorlar." },
      4: { question: "4. Tip çıkarımı (type inference) nedir ve ne zaman çalışır?", answer: "Tip çıkarımı, TypeScript'in açık bir annotation gerektirmeden değişkenin tipini başlangıç değerinden veya bağlamdan otomatik olarak belirleyebilmesidir. Çalıştığı durumlar: başlangıç değeriyle yapılan değişken bildirimleri, fonksiyon dönüş tipleri, generic tip parametreleri ve dizi/nesne literalleri.\n\nAçık annotation kullanın: değer olmadan bildirim yapıldığında, çıkarılan tip çok geniş olduğunda ve fonksiyon parametrelerinde (hiçbir zaman çıkarılmaz)." },
      5: { question: "5. Enum'lar nedir ve test odaklı bir kullanım örneği verin?", answer: "Enum'lar adlandırılmış sabit kümelerdir. String enum'lar (her üyenin açık bir string değeri olduğu) test otomasyonunda kesinlikle tercih edilir çünkü log ve test raporlarında okunabilir çıktı üretir. 0 değerli bir number enum test hata mesajında anlamsızdır; 'FAIL' değerli bir string enum anında anlaşılır. Yaygın test kullanım örnekleri: test durumu (PASS/FAIL/SKIP/BLOCKED), tarayıcı hedefi (chromium/firefox/webkit), ortam (staging/production). Enum kullanmak derleyicinin 'pase' gibi yazım hatalarını anında yakalamasını sağlar." },
      6: { content: "Orta Seviye Sorular (6–10)", difficulty: "🟡 Orta Seviye" },
      7: { question: "6. Union tipleri ile intersection tipleri arasındaki fark nedir?", answer: "Union tip (`A | B`): değer tiplerden BİRİ veya DİĞERİ olabilir — her iki durumu da ele almanız gerekir (genellikle type guard ile). Intersection tip (`A & B`): değer listelenen TÜM tipleri aynı anda karşılamalıdır — birden fazla tipin özelliklerini tek bir tipte birleştirir.\n\nUnion 'veya' senaryoları içindir; intersection 've' senaryoları içindir. Test otomasyonunda: union tipler birden fazla format kabul eden fonksiyon parametrelerinde yaygındır; intersection tipler bileşik page object veya config tipleri için yaygındır." },
      8: { question: "7. Generic'ler nedir ve test otomasyonunda neden kullanışlıdır?", answer: "Generic'ler (`<T>` olarak yazılan) tip parametreleridir; herhangi bir tipte çalışan ve o tipin bilgisini kod boyunca koruyan fonksiyonlar, class'lar ve interface'ler yazmanızı sağlar. Test otomasyonunda en kullanışlı oldukları yerler: verinin tipini koruyan API yanıt sarmalayıcıları (`ApiResponse<User>` vs `ApiResponse<Product>`), kısmi override ile tipli nesneler oluşturan test data factory'leri ve birden fazla fixture tipi üzerinde çalışması gereken utility fonksiyonları." },
      9: { question: "8. Access modifier'lar (public/private/protected/readonly) Page Object Model'de nasıl yardımcı olur?", answer: "Access modifier'lar POM class'larında kapsüllemeyi (encapsulation) zorunlu kılar. Locator özelliklerindeki private, test dosyalarının selector'lara doğrudan erişemeyeceği anlamına gelir — yalnızca page object metodları DOM ile etkileşir; böylece selector değişiklikleri tüm test dosyalarına yayılmaz. protected, base class'ların sağladığı metodları subclass'ların kullanmasına izin verir. readonly, baseUrl veya bağımlılıkların testler arasında yanlışlıkla değiştirilmesini önler. public, page object'in public API'sini işaretler — test kodunun çağırması gereken tek şeyler bunlardır." },
      10: { question: "9. Type guard nedir ve test otomasyonunda ne zaman kullanılır?", answer: "Type guard'lar, union tipini bir kod dalı içinde belirli bir üyeye daraltan çalışma zamanı kontrolleridir. TypeScript, `typeof`, `instanceof`, `in` operatörü ve özel tip belirleyici fonksiyonları (`value is T`) type guard olarak tanır. Test otomasyonunda en sık görüldükleri yerler: bilinmeyen şekildeki API yanıtlarını doğrulama, birden fazla hata tipini ele alma ve birden fazla formatta gelen test sonuçlarını işleme." },
      11: { question: "10. 'readonly' ne yapar ve test otomasyonunda ne zaman kullanılmalıdır?", answer: "readonly, bir özelliğin başlatmadan sonra yeniden atanmasını önler. Test otomasyonunda readonly en önemli: page object locator'ları (selector'lar construction'dan sonra değişmemeli), konfigürasyon nesneleri (testlerin paylaşılan config'i mutate etmesini önle), fixture'lara geçirilen ortam URL'leri ve kimlik bilgileri, ve factory'ler tarafından oluşturulan test veri nesneleri. `Readonly<T>` utility tipi eşdeğeridir — interface'i yeniden yazmadan mevcut bir tipin tüm özelliklerini readonly yapar." },
      12: { content: "İleri Seviye Sorular (11–15)", difficulty: "🔴 İleri" },
      13: { question: "11. Utility type'lar nedir ve en az dört tanesi için somut otomasyon örnekleri verin?", answer: "Utility type'lar, mevcut tipleri dönüştüren yerleşik generic tiplerdir. Test otomasyonunda en kullanışlılar: Partial<T> — tüm özellikleri isteğe bağlı yapar, config override'ları ve test data factory'leri için kullanılır. Pick<T,K> — belirli özellikleri seçer, tam user interface'inden auth-only fixture tipleri oluşturmak için. Omit<T,K> — özellikleri kaldırır, şifreler olmadan güvenli fixture tipleri için. Record<K,V> — tipli anahtar-değer haritası, ortam URL haritaları veya tarayıcı timeout config'leri için. Readonly<T> — değiştirilemez test config ve fixture verisi için dondurur." },
      14: { question: "12. TypeScript'te olası hata durumlarıyla async fonksiyonlar nasıl doğru şekilde tiplendirilir?", answer: "TypeScript'in yerleşik bir Result/Either tipi yoktur, ancak açıkça modelleyebilirsiniz. Üç ana kalıp: (1) Union dönüş tipi — `Promise<Data | null>` veya `Promise<{ data: T } | { error: string }>`. (2) Tipli exception'lar — özel hata class'ları tanımlayın ve tutarlı kullanın. (3) Generic Result tipi — `type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }`. Kalıp 3 en açık olanıdır ve büyük Playwright framework'lerinde popülerdir. Async fonksiyon dönüş tiplerini her zaman `Promise<T>` olarak açıkça belirtin." },
      15: { question: "13. Mapped type'lar nedir ve bir test framework'ünde nasıl kullanırsınız?", answer: "Mapped type'lar, mevcut bir tipin anahtarları üzerinde iterasyon yaparak her özelliği dönüştürerek yeni bir tip oluşturur. Sözdizimi: `{ [K in keyof T]: NewType }`. Test framework'ünde kullanışlı: form doğrulama hata tipleri oluşturma, mock/spy sarmalayıcı tipleri oluşturma ve config interface'inin env-var parsing için seri hale getirilmiş versiyonları." },
      16: { question: "14. tsconfig.json'da 'strict' modu etkinleştirmek ne yapar ve test otomasyonu için neden önemlidir?", answer: "strict: true bir grup katılık denetimini aynı anda etkinleştirir: noImplicitAny (parametreler sessizce any olamaz), strictNullChecks (null ve undefined kendi tipleridir — açıkça ele almalısınız), strictFunctionTypes, strictBindCallApply ve daha fazlası. Test otomasyonu için strictNullChecks en etkili olanıdır — locator'ların element bulamayabileceği, API yanıtlarının null olabileceği veya isteğe bağlı config değerlerinin undefined olabileceği durumları ele almaya zorlar. Her zaman strict: true ile yeni Playwright projeleri başlatın." },
      17: { question: "15. Büyük bir Playwright framework'ünde TypeScript tiplerini nasıl yapılandırırsınız?", answer: "Ölçeklenebilir yapı, tipleri sorumluluğa göre ayırır: (1) `src/types/` paylaşılan interface'ler ve type alias'lar için — domain'e göre bölün: `user.types.ts`, `api.types.ts`. (2) `src/enums/` string enum'lar için. (3) Her page object dosyası class'ın yanında kendi interface'ini dışa aktarır. (4) Barrel dosyası (`types/index.ts`) her şeyi yeniden dışa aktarır. (5) `playwright.d.ts` özel fixture tipleriyle Playwright'ın TestFixtures interface'ini genişletmek için. (6) Tipleri test dosyalarına asla koymayın. (7) Type-only import'lar için `import type { ... }` kullanın." },
      18: { content: "☕ Java Biliyorsan: Mülakat Soruları Köprüsü" },
      19: {
        topic: "interface: Yapısal vs Nominal Tipleme (S2 Derinlemesine)",
        why: "S2 interface vs type'ı kapsar — ama Java geliştiricileri için asıl sürpriz TypeScript interface'lerinin NASIL çalıştığıdır. Java nominal tipleme kullanır (sınıfın 'implements' demesi gerekir). TypeScript yapısal tipleme kullanır — doğru şekle sahip herhangi bir nesne interface'i otomatik olarak karşılar.",
        note: "Bu Java geliştiricileri için en önemli TypeScript kavramıdır. TS'de neredeyse hiç 'implements' yazmıyorsunuz — şekil eşleşirse, interface'i karşılar. Testlerde mock yapmak için harika: sadece doğru metodlara sahip bir nesne iletin.",
      },
      20: {
        topic: "Generic'ler <T>: Java vs TypeScript (S7 Derinlemesine)",
        why: "S7 generic'leri kapsar — iyi haber: TypeScript generic'leri Java generic'lerine neredeyse aynı görünür. Aynı <T> sözdizimi, aynı extends kısıtlamaları. Temel fark: TypeScript Java'nın sahip olmadığı union type'ları ve conditional type'ları ekler.",
        note: "Java generic'lerini biliyorsanız TypeScript generic'leri anında tanıdık gelecektir. Ekstra güç (union type'lar, infer, conditional type'lar) temellerle rahat olduğunuzda doğal olarak gelir.",
      },
      21: {
        topic: "readonly vs final — ve Readonly<T> utility (S10 Derinlemesine)",
        why: "S10 readonly'i kapsar — Java geliştiricileri 'final'in yeniden atamayı önlediğini bilir. TypeScript 'readonly' derleme zamanı eşdeğeridir. Temel eklemeler: Readonly<T> utility type tüm özellikleri bir anda readonly yapar ve 'as const' literal değerleri dondurur.",
        note: "\"readonly\" = Java \"final\" alanlar için. \"Readonly<T>\" = tüm alanlarda otomatik final — Java eşdeğeri yok. \"as const\" hem tip hem değeri dondurur — test durumu enum'ları için çok kullanışlı.",
      },
    }
  }),
  applyTr(sections[7], {
    title: "Pratik Alıştırmalar & Hızlı Referans",
    blocks: {
      0: { content: "Alıştırma 1 — TestCase Interface Tanımlama", difficulty: "🟢 Başlangıç" },
      1: {
        title: "Enum ve Interface ile TestCase Oluştur",
        description: "LOW, MEDIUM, HIGH, CRITICAL değerlerine sahip `Priority` string enum'u ve PASS, FAIL, SKIP, BLOCKED değerlerine sahip `TestStatus` string enum'u tanımlayın. `TestCase` interface'ini tanımlayın: id (number, readonly), title (string), description (isteğe bağlı string), status (TestStatus), priority (Priority), tags (string dizisi), durationMs (number) ve assignee (isteğe bağlı string). İki TestCase nesnesi oluşturun: biri başarılı bir login testi, diğeri başarısız bir ödeme testi için.",
        hint: "id için readonly, isteğe bağlı özellikler için ? kullanın ve string enum değerlerini Status.PASS = 'PASS' şeklinde yazın. Her iki enum'un da okunabilir test çıktısı için string enum olması gerektiğini unutmayın.",
        explanation: "String enum'lar log ve raporlarda anlaşılmaz sayılar yerine okunabilir değerler ('PASS', 'CRITICAL') üretir. id üzerindeki readonly modifier, testlerin tanımlayıcıyı yanlışlıkla değiştirmesini önler. İsteğe bağlı alanlar (?) gereksiz kod yazmadan minimal test nesneleri oluşturmanıza olanak tanır.",
      },
      3: { content: "Alıştırma 2 — Generic ApiResponse<T> Sarmalayıcı", difficulty: "🟡 Orta Seviye" },
      4: {
        title: "Type Guard ile Generic API Yanıtı Sarmalayıcısı",
        description: "data (T | null), status (number), ok (boolean), error (string | null), requestId (string) alanlarına sahip generic `ApiResponse<T>` interface'i oluşturun. Veri ve durum kodu alan ve doğru doldurulmuş ApiResponse<T> döndüren generic `createApiResponse<T>` factory fonksiyonu yazın. ok true ve data null değilse true döndüren `isSuccessResponse<T>` type guard fonksiyonu yazın. `ApiResponse<unknown>` alan ve bunun bir user olduğunu doğrulayan `parseUserResponse` fonksiyonu yazın.",
        hint: "Type guard'ın imzası `(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>>` olmalıdır. User doğrulama fonksiyonu için 'in' operatörü ve typeof kontrollerini kullanın.",
        explanation: "Generic'ler tek bir `ApiResponse<T>` interface'inin veri alanını User, Product, Order veya herhangi başka bir tip olarak doğru şekilde tiplemesine izin verir. Type guard, kontrol sonrasında data'nın null olmadığını TypeScript'in bilmesi için tipi daraltır.",
      },
      6: { content: "Alıştırma 3 — Tipli Playwright POM Base Class", difficulty: "🔴 İleri" },
      7: {
        title: "Fixture'lı Generic Playwright POM Base Class",
        description: "Constructor'ında Playwright'tan `Page` kabul eden abstract `PageObjectBase` class'ı oluşturun. Şunları içermeli: protected abstract `path` özelliği (string), `page.goto` çağıran `navigate()` metodu, generic `getElement<T extends Locator>(selector: string): T` metodu, protected `waitForSelector` yardımcısı ve `expectUrl` assertion yardımcısı. Ardından `LoginPage` somut class'ını oluşturun. Son olarak `test.extend<{loginPage: LoginPage}>` kullanarak tipli fixture uzantısını gösterin.",
        hint: "`import { type Page, type Locator, test as base } from '@playwright/test'` kullanın. Abstract path özelliği her page'in kendi route'unu bildirmesini zorunlu kılar.",
        explanation: "Abstract class'lar her sayfanın kendi yolunu bildirmesini zorunlu kılar. Yardımcılarda ve locator'larda protected/private erişim, public API'yi temiz tutar — test kodu yalnızca navigate, login, getErrorText ve isLoggedIn gibi public metodları görür. Fixture uzantısı kalıbı, tipli page object'i onu manuel olarak oluşturmadan her testte kullanılabilir kılar.",
      },
      8: { content: "Hızlı Referans: TypeScript Özellikleri", difficulty: "🟢 Başlangıç" },
      9: {
        headers: ["Özellik", "Söz Dizimi", "Ne Zaman Kullanılır"],
        rows: [
          ["String enum", "enum E { A = 'A' }", "Durum, tarayıcı, ortam sabitleri — loglarda okunabilir"],
          ["Interface", "interface Foo { x: string }", "Nesne şekilleri, class sözleşmeleri, POM tipleri"],
          ["Type alias", "type ID = string | number", "Union'lar, primitifler, hesaplanmış/karmaşık tipler"],
          ["İsteğe bağlı özellik", "{ x?: string }", "Config override'lar, kısmi test veri nesneleri"],
          ["Readonly özellik", "{ readonly id: number }", "Değişmemesi gereken ID'ler, URL'ler, token'lar"],
          ["Generic fonksiyon", "function f<T>(x: T): T", "Factory'ler, sarmalayıcılar, utility fonksiyonlar"],
          ["Generic interface", "interface R<T> { data: T }", "API yanıtları, repository'ler, koleksiyonlar"],
          ["Partial<T>", "Partial<Config>", "Config override'lar, isteğe bağlı test data factory'leri"],
          ["Pick<T,K>", "Pick<User, 'email'|'role'>", "Auth-only fixture'lar, ince DTO tipleri"],
          ["Omit<T,K>", "Omit<User, 'password'>", "Hassas alanlar olmadan güvenli fixture tipleri"],
          ["Record<K,V>", "Record<Browser, number>", "Tipli haritalar: tarayıcı başına timeout, ortam başına URL"],
          ["Type guard", "x is MyType", "Çalışma zamanında bilinmeyen API yanıtlarını doğrula"],
          ["Non-null assert", "value!", "Yalnızca değerin kesinlikle null/undefined olmadığından emin olduğunuzda"],
          ["Satisfies", "obj satisfies Type", "Literal tipleri kaybetmeden config doğrula (TS 4.9+)"],
          ["Template literal type", "`${Env}.myapp.com`", "Type-safe URL kalıpları, event adları, route string'leri"],
        ]
      },
      10: { content: "typescriptlang.org/play adresindeki TypeScript Playground'u yer imlerine ekleyin — herhangi bir kod parçasını yapıştırın ve derlenmiş JavaScript'i, tür hatalarını ve hover tiplerini anında görün. Proje kurmadan TypeScript kavramlarını denemenin en hızlı yoludur." },
    }
  }),
  applyTr(sections[8], {
    title: "☕ Java → TypeScript: Harika Haber — Çok Benzer!",
    blocks: {
      0: { content: "TypeScript Java geliştiricileri için Python'dan çok daha kolay! class, interface, access modifiers, generics, enums — hepsi tanıdık gelecek. Sadece birkaç kritik fark var. Bu bölüm bu farkları Java perspektifinden açıklar." },
      1: { text: "1. Temel Tipler — Java'ya Çok Benzer" },
      2: { topic: "Temel Tipler", why: "Java'da int, long, float, double gibi ayrı sayısal tipler vardır. TypeScript'te tüm sayılar için tek tip kullanılır: number. string küçük harf, boolean aynı.", note: '"number" = Java\'nın int/long/float/double hepsi. "string" (küçük harf) ≠ Java String (büyük harf). TypeScript\'te ayrıca "any" (Object gibi — kaçın!) var.' },
      3: { text: "2. Interface — Yapısal Tipleme (En Önemli Fark!)" },
      4: { topic: "interface (yapısal tipleme!)", why: "TypeScript interface Java'dakilere benzer ama kritik fark: TypeScript 'structural typing' kullanır. Nesnenin 'implements' bildirmesine gerek yoktur — doğru shape her nesne interface'i karşılar.", note: "Java = nominal typing ('implements' zorunlu). TypeScript = structural typing ('doğru şekil yeterli'). Bu TypeScript'in en güçlü ve en farklı konsepti." },
      5: { text: "3. Sınıflar — Neredeyse Aynı!" },
      6: { topic: "class (neredeyse aynı!)", why: "TypeScript class sözdizimi Java'ya çok benzer: 'constructor' anahtar kelimesi, 'readonly' (final yerine), ve constructor shorthand (tek satırda hem declare hem assign).", note: '"readonly" = Java "final". Constructor shorthand: "constructor(private x: T)" hem field\'ı tanımlar hem atar — büyük boilerplate tasarrufu.' },
      7: { text: "4. Erişim Belirleyicileri — Birebir Aynı!" },
      8: { topic: "access modifiers (aynı keyword'ler!)", why: "TypeScript access modifier'ları Java ile birebir aynı: public, private, protected. Python'un aksine TypeScript gerçekten derleme zamanında zorlar!", note: 'TypeScript derleme zamanında private/protected\'ı zorlar (Java gibi). "package-private" yok.' },
      9: { text: "5. Generics — Java Generics'e Çok Benzer" },
      10: { topic: "Generics <T>", why: "TypeScript generic'leri Java generic'leri ile neredeyse aynı sözdizimini kullanır. <T>, kısıtlar (extends) tümü tanıdık.", note: "TypeScript aynı <T> sözdizimini kullanır. TypeScript ayrıca Java'da olmayan union types ve mapped types gibi güçlü özellikler ekler." },
      11: { text: "6. Enum — Java'ya Benzer Ama Farklı Çeşitleri Var" },
      12: { topic: "enum", why: "Java enum'ları tam teşekküllü sınıflardır. TypeScript'te numeric ve string enum var. QA'da genellikle string enum tercih edilir çünkü log'larda okunabilir değerler üretir.", note: "Java enum = TypeScript string enum. Ama TypeScript'te union type (type Status = \"PASS\" | \"FAIL\") daha kısa ve tree-shakeable. QA'de string enum kullan." },
      13: { text: "7. Null Safety — Optional → Optional Chaining" },
      14: { topic: "null safety & optional chaining", why: "Java'da null NullPointerException'a yol açar. TypeScript'te de aynı risk var ama optional chaining (?.) ile çok daha kısa handle edilir.", note: '"?." = Java Optional.map(). "??" = Java .orElse(). tsconfig\'da "strictNullChecks: true" aç — Java\'nın null-safety derleme zamanı kontrolü gibi çalışır.' },
      15: { text: "8. Union Types — Java'da Karşılığı Yok" },
      16: { topic: "union types (Java'da yok!)", why: "TypeScript'in Java'ya göre en güçlü özelliklerinden biri. Bir değişkenin birden fazla tip tutabilmesini tip güvenli şekilde ifade eder.", note: '"Discriminated union" = Java sealed classes, ama çok daha kısa. TypeScript tüm case\'lerin ele alındığını derleme zamanında kontrol eder.' },
      17: { text: "9. Async/Await — CompletableFuture → Promise" },
      18: { topic: "async/await & Promise", why: "TypeScript ağ/dosya işlemleri için async/await kullanır. Java'da CompletableFuture karşılığıdır. Playwright tamamen async-first'tir — her sayfa işlemi await gerektirir.", note: '"await" = .get() on CompletableFuture. "async function" = CompletableFuture<T>. Playwright, fetch API tümü async-first. "await" olmadan Promise objesi alırsın!' },
      19: { text: "Hızlı Karşılaştırma Tablosu" },
      20: {
        headers: ["Kavram", "Java", "TypeScript", "Benzerlik"],
        rows: [
          ["Sayısal tipler", "int, long, double", "number", "⚠️ hepsi tek 'number'"],
          ["Metin tipi", "String (büyük S)", "string (küçük s)", "⚠️ küçük harf!"],
          ["Boolean", "boolean", "boolean", "✅ aynı"],
          ["Class", "class Foo { }", "class Foo { }", "✅ neredeyse aynı"],
          ["Constructor", "public Foo(args)", "constructor(args)", "⚠️ farklı anahtar kelime"],
          ["Interface", "interface I { }", "interface I { }", "⚠️ structural vs nominal"],
          ["Implements", "implements I", "implements I", "✅ aynı keyword"],
          ["Extends", "extends Base", "extends Base", "✅ aynı keyword"],
          ["Erişim modifier", "public/private/protected", "public/private/protected", "✅ aynı!"],
          ["Final field", "final int x", "readonly x: number", "⚠️ 'readonly' değil 'final'"],
          ["Static", "static void foo()", "static foo(): void", "✅ aynı kavram"],
          ["Generics", "class Box<T>", "class Box<T>", "✅ aynı sözdizim"],
          ["Enum", "enum Status { A, B }", "enum Status { A = 'A' }", "⚠️ string değer gerekli"],
          ["Null", "null", "null / undefined", "⚠️ TS'de hem null hem undefined"],
          ["Optional", "Optional.ofNullable()", "value?.property", "✅ çok daha kısa ?."],
          ["Async", "CompletableFuture<T>", "Promise<T>", "✅ aynı kavram, temiz sözdizim"],
          ["Checked exceptions", "throws IOException", "(yok)", "✅ TS'de checked exception yok"],
          ["Union type", "(yok — Object/sealed)", "string | number", "🆕 TypeScript'e özgü"],
        ],
      },
    },
  }),
  applyTr(sections[9], {
    title: "Test Runner'lar — Vitest & Unit Test",
    blocks: {
      1: { content: "Vitest: Vite-Native Test Runner" },
      2: { content: "Playwright Test zaten kendi test runner'ı ile geliyor — uçtan uca tarayıcı testleri için Vitest'e ihtiyacın yok. Ama düz bir TypeScript yardımcı fonksiyonu yazdığın an (bir fiyat formatlayıcı, bir veri parser'ı, özel bir wait utility'si), o fonksiyonu tarayıcı açmadan, izole şekilde unit test etmek istersin. İşte burada Vitest devreye girer: Vite üzerine kurulu, hızlı, Jest-uyumlu bir test runner — sıfır konfigürasyonla TypeScript desteği sunar. Jest ise daha eski, daha köklü alternatiftir — aynı API şekli (describe, it, expect), daha yavaş başlangıç, ve TypeScript'i anlaması için ts-jest gerektirir." },
      5: {
        topic: "Unit Test Runner: JUnit vs Vitest",
        why: "Java'da JUnit standart unit test runner'ıdır, neredeyse her zaman CI raporları üretmek için Maven Surefire ile birlikte kullanılır. Vitest, düz TypeScript fonksiyonları için tam olarak aynı rolü oynar — hızlı, izole, tarayıcı gerekmez.",
        note: "Java'daki @Test anotasyonu, Vitest'in it()/test() fonksiyonuna neredeyse birebir karşılık gelir — ikisi de fonksiyon başına tek bir davranışı izole eder, ikisi de stack trace ile gürültülü şekilde başarısız olur, ve ikisi de CI'da uçtan uca (Playwright/Selenium) paketinden ayrı bir adım olarak çalışır.",
      },
    }
  }),
]

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
  "☕ Java → TS",
  "🏃 Test Runner'lar",
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
      "☕ Java → TS",
      "🏃 Test Runners",
    ],
    sections,
  },
  tr: {
    hero: trHero,
    tabs: trTabs,
    sections: trSections,
  },
};
