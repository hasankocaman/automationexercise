export const typescriptData = {
  en: {
    hero: {
      title: "TypeScript for Automation Engineers",
      subtitle: "From Zero to Typed Playwright Tests",
      intro:
        "TypeScript is a strongly-typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language. For automation engineers, TypeScript is the gold standard — Playwright is written in TypeScript and ships first-class type definitions out of the box.",
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
        title: "Introduction to TypeScript",
        blocks: [
          {
            type: "heading",
            text: "What is TypeScript?",
          },
          {
            type: "text",
            text: "TypeScript is an open-source programming language developed by Microsoft and first released in 2012. It is a strict syntactical superset of JavaScript — meaning every valid JavaScript program is also a valid TypeScript program. TypeScript adds optional static type annotations, interfaces, enums, generics, and modern ECMAScript features that compile down to clean, readable JavaScript.",
          },
          {
            type: "heading",
            text: "Why Was TypeScript Created?",
          },
          {
            type: "text",
            text: "As JavaScript applications grew larger and more complex, developers at Microsoft (and across the industry) ran into serious problems: bugs that only appeared at runtime, no IDE autocomplete on custom objects, and codebases that became nearly impossible to refactor safely. Anders Hejlsberg — the designer of C# — led the TypeScript project to bring enterprise-grade tooling to JavaScript without abandoning its ecosystem.",
          },
          {
            type: "list",
            title: "Problems TypeScript Solves",
            icon: "🛠️",
            items: [
              {
                label: "Runtime type errors",
                desc: "JS lets you call .toUpperCase() on a number — TypeScript catches this at compile time before you even run the code.",
              },
              {
                label: "Missing autocomplete",
                desc: "Without types, your editor cannot know what properties an object has. TypeScript powers IntelliSense in VS Code.",
              },
              {
                label: "Unsafe refactoring",
                desc: "Renaming a function in pure JS requires grep-and-hope. TypeScript tracks all usages and highlights every broken reference instantly.",
              },
              {
                label: "Unclear function contracts",
                desc: "TS forces you to declare what a function accepts and returns, making code self-documenting.",
              },
              {
                label: "Team-scale maintenance",
                desc: "Types act as living documentation that is always in sync with the code — unlike comments that get stale.",
              },
            ],
          },
          {
            type: "heading",
            text: "TypeScript Compilation: .ts → .js",
          },
          {
            type: "text",
            text: "TypeScript files use the .ts extension. The TypeScript compiler (tsc) reads these files, performs type checking, and emits plain .js files that any browser or Node.js runtime can execute. The types themselves are completely erased at runtime — they exist only to help you during development.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// hello.ts  (TypeScript source)
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));

// After tsc → hello.js  (compiled output)
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));`,
          },
          {
            type: "heading",
            text: "TypeScript in the Automation World",
          },
          {
            type: "text",
            text: "Playwright — the leading browser automation framework — is written entirely in TypeScript and ships TypeScript type definitions for every API. This means when you write a Playwright test in TypeScript you get autocomplete for every method on Page, Locator, BrowserContext, and more. You also get compile-time errors when you pass the wrong arguments, catching bugs before a single test runs.",
          },
          {
            type: "info",
            text: "Playwright's official documentation shows all examples in TypeScript first. The Playwright VS Code extension is also powered by TypeScript language server features, giving you hover documentation and jump-to-definition on every API.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Playwright test in TypeScript — full type safety
import { test, expect, Page } from '@playwright/test';

test('login page has title', async ({ page }: { page: Page }) => {
  await page.goto('https://example.com/login');
  // IDE autocomplete lists every method on 'page'
  await expect(page).toHaveTitle(/Login/);
});`,
          },
          {
            type: "heading",
            text: "JavaScript vs TypeScript: Side-by-Side Comparison",
          },
          {
            type: "table",
            headers: ["Feature", "JavaScript", "TypeScript"],
            rows: [
              ["Type safety", "None — types are dynamic", "Static types checked at compile time"],
              ["Autocomplete (IntelliSense)", "Limited — depends on JSDoc", "Full — powered by type definitions"],
              ["Refactoring safety", "Risky — no automated tracking", "Safe — compiler tracks all usages"],
              ["Error detection", "Runtime only", "Compile time + runtime"],
              ["Learning curve", "Lower", "Slightly higher, pays off fast"],
              ["Playwright support", "Works but no type hints", "First-class — full type definitions"],
              ["tsconfig.json", "Not applicable", "Configures compilation behavior"],
              ["Declaration files (.d.ts)", "Not applicable", "Describe types of JS libraries"],
              ["Generics", "Not available", "Fully supported"],
              ["Interfaces", "Not available", "Core language feature"],
            ],
          },
          {
            type: "tip",
            text: "You do NOT need to be a TypeScript expert to start using it with Playwright. Even adding basic types to your Page Object Models dramatically improves maintainability and catches bugs early.",
          },
        ],
      },
      {
        title: "Installation & Setup",
        blocks: [
          {
            type: "heading",
            text: "Step 1 — Install Node.js",
          },
          {
            type: "text",
            text: "TypeScript runs on Node.js. Download the LTS release from nodejs.org. After installation, verify both node and npm are available in your terminal.",
          },
          {
            type: "code",
            language: "bash",
            code: `node --version    # v20.x.x or higher recommended
npm --version     # 9.x or higher`,
          },
          {
            type: "heading",
            text: "Step 2 — Install TypeScript Globally",
          },
          {
            type: "code",
            language: "bash",
            code: `npm install -g typescript
tsc --version    # Version 5.x.x`,
          },
          {
            type: "info",
            text: "For project-level installations (recommended for teams), install TypeScript as a devDependency: npm install --save-dev typescript. This ensures everyone uses the same version.",
          },
          {
            type: "heading",
            text: "Step 3 — Initialize tsconfig.json",
          },
          {
            type: "text",
            text: "tsconfig.json is the TypeScript configuration file. It tells the compiler which files to include, what JavaScript version to target, and which strict checks to enable.",
          },
          {
            type: "code",
            language: "bash",
            code: `tsc --init    # Generates tsconfig.json with commented defaults`,
          },
          {
            type: "heading",
            text: "Understanding tsconfig.json Key Options",
          },
          {
            type: "code",
            language: "json",
            code: `{
  "compilerOptions": {
    "target": "ES2020",         // Output JS version (ES5, ES2015, ES2020, ESNext)
    "module": "commonjs",       // Module system (commonjs for Node, ESNext for browser)
    "outDir": "./dist",         // Where compiled JS files go
    "rootDir": "./src",         // Where TypeScript source files live
    "strict": true,             // Enables all strict type checks (RECOMMENDED)
    "esModuleInterop": true,    // Allows default imports from CommonJS modules
    "skipLibCheck": true,       // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,  // Allow importing .json files
    "sourceMap": true           // Generate .map files for debugging
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
          },
          {
            type: "table",
            headers: ["Option", "Purpose", "Recommended Value"],
            rows: [
              ["strict", "Enables strictNullChecks, noImplicitAny, and more", "true"],
              ["target", "JS version emitted by the compiler", "ES2020"],
              ["module", "Module format in output files", "commonjs (Node) / ESNext (browser)"],
              ["outDir", "Output directory for compiled files", "./dist"],
              ["esModuleInterop", "Smoother import of CommonJS modules", "true"],
              ["sourceMap", "Maps compiled JS back to TS for debugging", "true"],
              ["noUnusedLocals", "Error on unused local variables", "true"],
              ["noImplicitReturns", "Error when not all code paths return", "true"],
            ],
          },
          {
            type: "heading",
            text: "Step 4 — VS Code TypeScript Setup",
          },
          {
            type: "text",
            text: "VS Code has TypeScript support built in — no extension required. However, the following extensions greatly improve the experience:",
          },
          {
            type: "list",
            items: [
              { label: "ESLint", desc: "Linting for TypeScript code" },
              { label: "Prettier", desc: "Automatic code formatting" },
              { label: "Playwright Test for VS Code", desc: "Run and debug Playwright tests visually" },
              { label: "TypeScript Hero", desc: "Auto-organize imports" },
            ],
          },
          {
            type: "heading",
            text: "Step 5 — Compile and Run Your First TypeScript File",
          },
          {
            type: "code",
            language: "typescript",
            code: `// src/index.ts
const message: string = "Hello from TypeScript!";
const year: number = new Date().getFullYear();
console.log(\`\${message} Year: \${year}\`);`,
          },
          {
            type: "code",
            language: "bash",
            code: `tsc src/index.ts          # Compiles to src/index.js
node src/index.js         # Runs the compiled file`,
          },
          {
            type: "heading",
            text: "Step 6 — ts-node: Run TypeScript Directly",
          },
          {
            type: "text",
            text: "ts-node is a TypeScript execution engine for Node.js. It compiles and runs .ts files on-the-fly without a separate compile step — perfect for scripts and quick prototyping.",
          },
          {
            type: "code",
            language: "bash",
            code: `npm install -g ts-node
ts-node src/index.ts      # Compiles and runs in one step`,
          },
          {
            type: "tip",
            text: "For Playwright projects, you don't need ts-node — Playwright handles TypeScript compilation internally via its built-in transform. Just run npx playwright test and it works.",
          },
          {
            type: "heading",
            text: "Setting Up a Playwright TypeScript Project from Scratch",
          },
          {
            type: "steps",
            items: [
              "mkdir my-automation && cd my-automation",
              "npm init -y",
              "npm install --save-dev @playwright/test typescript",
              "npx playwright install",
              "Create playwright.config.ts (see Advanced section)",
              "Create tests/example.spec.ts",
              "npx playwright test",
            ],
          },
        ],
      },
      {
        title: "Intermediate TypeScript",
        blocks: [
          {
            type: "heading",
            text: "Primitive Types",
          },
          {
            type: "code",
            language: "typescript",
            code: `// string
let username: string = "Alice";
let template: string = \`Hello \${username}\`;

// number (covers integers AND floats)
let age: number = 30;
let price: number = 9.99;
let hex: number = 0xff;

// boolean
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// null and undefined
let nothing: null = null;
let notSet: undefined = undefined;

// any — AVOID: disables type checking
let wild: any = "anything";
wild = 42;
wild = true;

// unknown — safer alternative to any
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // safe — TS knows it's string here
}

// never — represents values that never occur
function throwError(msg: string): never {
  throw new Error(msg);
}

// void — function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}`,
          },
          {
            type: "table",
            headers: ["Type", "Description", "Use Case"],
            rows: [
              ["string", "Text values", "Names, URLs, messages"],
              ["number", "All numeric values", "IDs, prices, counts"],
              ["boolean", "true / false", "Flags, conditions"],
              ["null", "Intentional absence of value", "Optional DB fields"],
              ["undefined", "Variable declared but not assigned", "Uninitialized state"],
              ["any", "Disables type checking", "Migration from JS (avoid in new code)"],
              ["unknown", "Type must be narrowed before use", "External input, JSON.parse()"],
              ["never", "Code path that never completes", "Exhaustive checks, throw functions"],
              ["void", "No meaningful return value", "Event handlers, side-effect functions"],
            ],
          },
          {
            type: "heading",
            text: "Type Inference",
          },
          {
            type: "text",
            text: "TypeScript can automatically infer types from the values you assign. You don't always need to write type annotations — the compiler is smart enough to figure it out.",
          },
          {
            type: "code",
            language: "typescript",
            code: `let count = 10;          // inferred as number
let name = "Bob";        // inferred as string
let active = true;       // inferred as boolean

// TypeScript now knows count is a number:
count = "hello";         // Error: Type 'string' is not assignable to type 'number'

// Function return type is inferred too
function add(a: number, b: number) {
  return a + b;           // return type inferred as number
}`,
          },
          {
            type: "heading",
            text: "Arrays and Tuples",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Array of objects
const users: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Tuple — fixed length, fixed types at each position
let coordinate: [number, number] = [51.5, -0.1];
let entry: [string, number] = ["age", 30];

// Tuple with labels (TS 4+)
let point: [x: number, y: number] = [10, 20];

// Readonly array
const frozen: readonly string[] = ["a", "b", "c"];
// frozen.push("d"); // Error — cannot mutate readonly array`,
          },
          {
            type: "heading",
            text: "Objects and Interfaces",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Inline object type
let user: { id: number; name: string; email?: string } = {
  id: 1,
  name: "Alice",
  // email is optional — no error if omitted
};

// Interface — reusable, extendable
interface User {
  id: number;
  name: string;
  email?: string;          // optional property
  readonly createdAt: Date; // cannot be changed after creation
}

interface AdminUser extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"],
};`,
          },
          {
            type: "heading",
            text: "Type Aliases vs Interfaces",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Type alias — works for primitives, unions, tuples, and objects
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (error: Error | null, result: string) => void;

// Interface — for object shapes; supports declaration merging
interface Point {
  x: number;
  y: number;
}

// Extending
type Animal = { name: string };
type Dog = Animal & { breed: string };   // type — intersection

interface Animal { name: string }
interface Dog extends Animal { breed: string } // interface — extends

// Use interface for public APIs and class shapes
// Use type for unions, tuples, and complex type expressions`,
          },
          {
            type: "tip",
            text: "Rule of thumb: use interface when describing the shape of an object or class. Use type when you need unions, tuples, or computed/mapped types.",
          },
          {
            type: "heading",
            text: "Union Types and Intersection Types",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Union — value can be one of several types
type Status = "active" | "inactive" | "pending";
type StringOrNumber = string | number;

function formatID(id: string | number): string {
  if (typeof id === "number") return id.toString();
  return id;
}

// Discriminated union — great for state machines
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: ApiState) {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", ");
    case "error":   return \`Error: \${state.message}\`;
  }
}

// Intersection — value must satisfy ALL types
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & WithTimestamps;`,
          },
          {
            type: "heading",
            text: "Enums",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Numeric enum (default — auto-increments)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
const move: Direction = Direction.Up;

// String enum — preferred for readability
enum Status {
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
  Pending  = "PENDING",
}
const userStatus: Status = Status.Active; // "ACTIVE"

// Const enum — completely erased at compile time (best performance)
const enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
}
const browser: Browser = Browser.Chrome;
// Compiled output: const browser = "chrome"; — no enum object generated`,
          },
          {
            type: "heading",
            text: "Functions: Types, Optional, and Default Parameters",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Typed parameters and return type
function multiply(a: number, b: number): number {
  return a * b;
}

// Optional parameter (must come after required params)
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}

// Default parameter
function createUser(name: string, role: string = "viewer"): User {
  return { id: Date.now(), name, role };
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Function type annotation
type Transformer = (input: string) => string;
const toUpper: Transformer = (s) => s.toUpperCase();

// Arrow function with types
const divide = (a: number, b: number): number => a / b;

// Async function — return type is always Promise<T>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as User;
}`,
          },
          {
            type: "heading",
            text: "Generics — Introduction",
          },
          {
            type: "text",
            text: "Generics allow you to write reusable functions and types that work with any type while still maintaining type safety. Think of them as type parameters.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Without generics — loses type info
function firstItem(arr: any[]): any {
  return arr[0];
}

// With generics — preserves type
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const num = firstItem([1, 2, 3]);       // inferred: number
const str = firstItem(["a", "b", "c"]); // inferred: string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }],
  status: 200,
  message: "OK",
};

// Generic with default type
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}`,
          },
          {
            type: "heading",
            text: "Type Assertions",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Type assertion with 'as' — you tell TS what type it is
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice"; // No error — TS trusts your assertion

// Double assertion (escape hatch — use sparingly)
const value = (someValue as unknown) as string;

// Non-null assertion operator (!)
const el = document.getElementById("app")!; // assert not null
el.innerHTML = "Hello";

// When to use: when you know more than TS does
// e.g., after checking at runtime, or when working with loose APIs
const data = JSON.parse(rawJson) as ApiResponse<User>;`,
          },
          {
            type: "warning",
            text: "Type assertions bypass the compiler's safety checks. Only use them when you are absolutely sure about the type — a wrong assertion causes a runtime error, not a compile-time error.",
          },
        ],
      },
      {
        title: "Advanced TypeScript",
        blocks: [
          {
            type: "heading",
            text: "Utility Types",
          },
          {
            type: "text",
            text: "TypeScript ships a set of built-in generic types that let you transform existing types. These are indispensable in real-world projects.",
          },
          {
            type: "code",
            language: "typescript",
            code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial<T> — all properties become optional
type UpdateUserDTO = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required<T> — all properties become required
type StrictUser = Required<Partial<User>>;

// Readonly<T> — all properties become read-only
type FrozenUser = Readonly<User>;
// frozenUser.name = "Bob"; // Error!

// Pick<T, K> — keep only specified keys
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — remove specified keys
type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string; createdAt: Date }

// Record<K, V> — object with keys K and values V
type RoleMap = Record<string, string[]>;
const roles: RoleMap = { admin: ["read", "write"], viewer: ["read"] };

// Exclude<T, U> — remove from union
type NoNull = Exclude<string | null | undefined, null | undefined>;
// string

// Extract<T, U> — keep matching types from union
type OnlyStrings = Extract<string | number | boolean, string>;
// string

// NonNullable<T> — remove null and undefined
type SafeString = NonNullable<string | null | undefined>;
// string

// ReturnType<T> — extract return type of a function
function getUser() { return { id: 1, name: "Alice" }; }
type UserReturnType = ReturnType<typeof getUser>;
// { id: number; name: string }

// Parameters<T> — extract parameter types of a function
function createOrder(userId: number, items: string[]): void {}
type OrderParams = Parameters<typeof createOrder>;
// [userId: number, items: string[]]`,
          },
          {
            type: "heading",
            text: "Advanced Generics",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Generic constraints — T must have at least these properties
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const name = getProperty(user, "name");   // string
// getProperty(user, "age");              // Error — 'age' not in user

// Multiple type parameters
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 } as A & B;
}

// Conditional types
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Infer in conditional types
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Resolved = UnpackPromise<Promise<string>>; // string
type Plain    = UnpackPromise<number>;           // number

// Mapped types — transform every property
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // remove readonly
};
type Optional<T> = {
  [K in keyof T]?: T[K];          // make all optional
};`,
          },
          {
            type: "heading",
            text: "Classes: Access Modifiers and Abstract Classes",
          },
          {
            type: "code",
            language: "typescript",
            code: `class BankAccount {
  public  readonly id: string;      // accessible everywhere, immutable
  private balance: number;           // only within this class
  protected owner: string;           // this class and subclasses

  constructor(owner: string, initialBalance: number) {
    this.id = crypto.randomUUID();
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  // Shorthand constructor parameter declaration
  // constructor(private balance: number, readonly id: string) {}
}

// Abstract class — cannot be instantiated directly
abstract class BasePage {
  constructor(protected page: import("@playwright/test").Page) {}

  abstract waitForLoad(): Promise<void>; // subclass MUST implement

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  private usernameInput = this.page.locator("#username");
  private passwordInput = this.page.locator("#password");
  private submitButton  = this.page.locator('button[type="submit"]');

  async waitForLoad(): Promise<void> {
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`,
          },
          {
            type: "heading",
            text: "Decorators",
          },
          {
            type: "text",
            text: "Decorators are a stage-3 JavaScript proposal (enabled by default in TypeScript 5+). They are functions that can modify classes and their members at definition time.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Enable in tsconfig: "experimentalDecorators": true (TS < 5)
// TS 5+ supports TC39 decorators natively

// Method decorator — adds logging
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

// Class decorator — adds metadata
function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) return instance;
      super(...args);
      instance = this as any;
    }
  };
}

class UserService {
  @log
  findUser(id: number): string {
    return \`User \${id}\`;
  }
}

@singleton
class DatabaseConnection {
  connect() { console.log("Connected"); }
}`,
          },
          {
            type: "heading",
            text: "TypeScript with Playwright: Typed Page Object Model",
          },
          {
            type: "code",
            language: "typescript",
            code: `// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton   = page.locator('[data-testid="login-btn"]');
    this.errorMessage  = page.locator('[data-testid="error-msg"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");
});`,
          },
          {
            type: "heading",
            text: "Typed Fixtures with test.extend()",
          },
          {
            type: "code",
            language: "typescript",
            code: `// fixtures/index.ts
import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

// Define fixture types
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_EMAIL!,
      process.env.TEST_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from "@playwright/test";

// tests/dashboard.spec.ts
import { test, expect } from "../fixtures";

test("dashboard loads after login", async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL("/dashboard");
});`,
          },
          {
            type: "heading",
            text: "playwright.config.ts",
          },
          {
            type: "code",
            language: "typescript",
            code: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`,
          },
          {
            type: "heading",
            text: "Design Patterns in TypeScript",
          },
          {
            type: "code",
            language: "typescript",
            code: `// ── Builder Pattern ──────────────────────────────────────────
class RequestBuilder {
  private _method: string = "GET";
  private _url: string = "";
  private _headers: Record<string, string> = {};
  private _body?: unknown;

  method(m: string): this { this._method = m; return this; }
  url(u: string): this    { this._url = u;    return this; }
  header(k: string, v: string): this { this._headers[k] = v; return this; }
  body(b: unknown): this  { this._body = b;   return this; }

  build(): Request {
    return new Request(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : undefined,
    });
  }
}

const req = new RequestBuilder()
  .url("/api/users")
  .method("POST")
  .header("Content-Type", "application/json")
  .body({ name: "Alice" })
  .build();

// ── Factory Pattern ───────────────────────────────────────────
interface Notification { send(message: string): void; }
class EmailNotification  implements Notification { send(m: string) { console.log("Email:", m); } }
class SlackNotification  implements Notification { send(m: string) { console.log("Slack:", m); } }

function createNotifier(type: "email" | "slack"): Notification {
  const map = { email: EmailNotification, slack: SlackNotification };
  return new map[type]();
}

// ── Strategy Pattern ──────────────────────────────────────────
interface SortStrategy { sort(data: number[]): number[]; }
class BubbleSort implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => a-b); } }
class QuickSort  implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => b-a); } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  sort(data: number[]) { return this.strategy.sort(data); }
}`,
          },
          {
            type: "heading",
            text: "Declaration Files (.d.ts) and Module Augmentation",
          },
          {
            type: "code",
            language: "typescript",
            code: `// my-library.d.ts — describes a JavaScript library
declare module "my-js-lib" {
  export function parseDate(input: string): Date;
  export interface Config {
    locale: string;
    timezone: string;
  }
}

// Module augmentation — add types to an existing module
declare module "@playwright/test" {
  interface Page {
    // Add a custom method to Playwright's Page type
    fillForm(fields: Record<string, string>): Promise<void>;
  }
}

// global.d.ts — extend global types
declare global {
  interface Window {
    __APP_CONFIG__: { apiUrl: string; version: string };
  }
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      TEST_EMAIL: string;
      TEST_PASSWORD: string;
      CI?: string;
    }
  }
}
export {}; // make this a module`,
          },
        ],
      },
      {
        title: "Interview Q&A",
        blocks: [
          {
            type: "heading",
            text: "TypeScript Interview Questions",
          },
          {
            type: "qa",
            question: "1. What is the difference between TypeScript and JavaScript?",
            answer:
              "TypeScript is a statically typed superset of JavaScript. It adds optional type annotations, interfaces, generics, enums, and access modifiers. TypeScript must be compiled to JavaScript before execution — browsers and Node.js run only JavaScript. The key benefit is that TypeScript catches type errors at compile time (during development), whereas JavaScript only reveals these errors at runtime in production.",
          },
          {
            type: "qa",
            question: "2. What is type inference in TypeScript?",
            answer:
              "Type inference is the compiler's ability to automatically determine the type of a variable based on its initial value, without requiring an explicit type annotation. For example, `let x = 5` infers `x` as `number`. Inference also works for function return types and generic type parameters.",
            code: `let x = 5;           // inferred: number
let s = "hello";     // inferred: string
let arr = [1, 2, 3]; // inferred: number[]

function double(n: number) { return n * 2; }
// return type inferred as number`,
          },
          {
            type: "qa",
            question: "3. What is the difference between interface and type?",
            answer:
              "Both describe object shapes, but they differ in capability. interface supports declaration merging (you can reopen and add to it), is preferred for OOP patterns, and is slightly more performant in the compiler. type supports union types, intersection, tuple types, and mapped types — use it when you need more expressive power. In practice: use interface for public APIs and class shapes, use type for unions, primitives, and computed types.",
            code: `// interface — can be extended and merged
interface Animal { name: string }
interface Animal { age: number } // merges — now has name AND age

// type — more expressive but no merging
type ID = string | number;
type Pair = [string, number];
type ReadonlyUser = Readonly<User>;`,
          },
          {
            type: "qa",
            question: "4. What is the difference between any, unknown, and never?",
            answer:
              "`any` disables type checking entirely — you can do anything with it. Avoid it except during JS migration. `unknown` is the type-safe version of `any` — you must narrow the type (with typeof or instanceof) before using it, which forces you to handle it safely. `never` represents a value that can never exist — used for functions that always throw, infinite loops, or exhaustive type checks.",
            code: `let a: any     = "hello"; a.foo(); // OK — no type check
let u: unknown = "hello"; u.foo(); // Error — must narrow first
if (typeof u === "string") u.toUpperCase(); // OK after narrowing

function fail(msg: string): never { throw new Error(msg); }
function exhaustive(x: never): never { return fail("impossible"); }`,
          },
          {
            type: "qa",
            question: "5. What are generics? Give a practical example.",
            answer:
              "Generics are type parameters that let you write functions, classes, and interfaces that work with any type while preserving type information. They are written inside angle brackets <T>. Without generics you either lose type info (using any) or duplicate code for each type.",
            code: `function identity<T>(value: T): T { return value; }
identity<string>("hello"); // returns string
identity<number>(42);      // returns number

// Practical: typed API wrapper
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}
const users = await fetchJson<User[]>("/api/users");
// users is User[] — fully typed`,
          },
          {
            type: "qa",
            question: "6. Explain Partial, Pick, and Omit utility types.",
            answer:
              "These are built-in generic types that transform existing types. Partial<T> makes all properties optional — useful for update/patch DTOs. Pick<T, K> creates a new type with only the listed keys — useful for view models. Omit<T, K> creates a new type without the listed keys — useful for removing sensitive fields like passwords before sending to the client.",
            code: `interface User { id: number; name: string; email: string; password: string }

type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

type UserCard = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }`,
          },
          {
            type: "qa",
            question: "7. What are union and intersection types?",
            answer:
              "A union type (A | B) means a value can be of type A or type B — at least one. An intersection type (A & B) means a value must satisfy both A and B simultaneously — all properties from both types. Unions are used for 'or' logic (string | number), intersections for combining types (User & Timestamped).",
            code: `type StringOrNum = string | number;
let val: StringOrNum = "hello"; val = 42; // both valid

type Named   = { name: string };
type Aged    = { age: number };
type Person  = Named & Aged;
const p: Person = { name: "Alice", age: 30 }; // must have both`,
          },
          {
            type: "qa",
            question: "8. What is a decorator in TypeScript?",
            answer:
              "A decorator is a special function that can modify or annotate classes, methods, properties, or parameters at definition time. Decorators are written with an @ symbol. They are widely used in frameworks like Angular and NestJS for dependency injection, routing, and validation. Enable them with experimentalDecorators: true in tsconfig (TypeScript < 5) or use TypeScript 5+ which supports the TC39 standard decorators.",
            code: `function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Circle {
  @readonly
  getArea(radius: number): number {
    return Math.PI * radius ** 2;
  }
}`,
          },
          {
            type: "qa",
            question: "9. What does strict mode enable in TypeScript?",
            answer:
              'Setting "strict": true in tsconfig.json enables a collection of strict type-checking flags: strictNullChecks (null/undefined are not assignable to other types), noImplicitAny (error when type is implicitly any), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, and noImplicitThis. Together they eliminate entire categories of runtime bugs.',
            code: `// With strict: true
function greet(name: string) { return "Hello " + name; }
greet(null); // Error: Argument of type 'null' is not assignable to 'string'

// Without strict, this would silently pass and cause "Hello null" at runtime`,
          },
          {
            type: "qa",
            question: "10. What are optional chaining and nullish coalescing?",
            answer:
              "Optional chaining (?.) short-circuits and returns undefined when accessing properties on null or undefined, instead of throwing. Nullish coalescing (??) returns the right-hand value only when the left side is null or undefined (unlike || which also triggers on 0 and empty string). Both are JavaScript features that TypeScript understands and type-checks.",
            code: `const user = getUser(); // User | null

// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city; // undefined if any step is null/undefined

// Nullish coalescing
const displayName = user?.name ?? "Anonymous"; // fallback only on null/undefined
const count = 0 ?? 10;  // 0 — because 0 is not null/undefined
const count2 = 0 || 10; // 10 — because 0 is falsy`,
          },
          {
            type: "qa",
            question: "11. What is a declaration file (.d.ts)?",
            answer:
              "A declaration file describes the types of a JavaScript library without containing any runtime code. It uses the .d.ts extension. When you install @types/node or @types/jest, you are installing declaration files. They give TypeScript information about libraries written in plain JavaScript. You can also write custom .d.ts files to add type information to your own code or augment existing module types.",
            code: `// myLib.d.ts — no implementation, only type descriptions
declare function createUser(name: string): { id: number; name: string };
declare const VERSION: string;

declare module "csv-parser" {
  function parse(options?: { separator?: string }): NodeJS.ReadWriteStream;
  export = parse;
}`,
          },
          {
            type: "qa",
            question: "12. How does TypeScript specifically help with Playwright automation?",
            answer:
              "Playwright ships complete TypeScript type definitions. This means: (1) Full autocomplete for every Playwright API — page methods, locator options, expect matchers. (2) Compile-time errors for wrong argument types — e.g., passing a number where a string is expected. (3) Typed Page Object Models with private/protected locators. (4) Typed custom fixtures via test.extend<MyFixtures>(). (5) Typed playwright.config.ts catches configuration errors before running. (6) Type-safe environment variables via global.d.ts.",
          },
          {
            type: "qa",
            question: "13. What is the difference between compile-time and runtime errors in the TypeScript context?",
            answer:
              "A compile-time error is caught by the TypeScript compiler (tsc) while it is analyzing your source code — before any code executes. These are type errors, missing properties, wrong argument counts. A runtime error occurs when the program is actually running and the JavaScript engine encounters a problem — like calling .toLowerCase() on undefined. TypeScript eliminates most but not all runtime errors: it catches structural mistakes but cannot check things like network failures or user input values.",
            code: `// Compile-time error — tsc catches this immediately
const n: number = "hello"; // Error: Type 'string' not assignable to 'number'

// Runtime error — tsc cannot prevent this
const data = JSON.parse(userInput); // type is 'any' — TS cannot know the shape
data.user.name; // may throw at runtime if 'user' is undefined`,
          },
          {
            type: "qa",
            question: "14. What is module resolution in TypeScript?",
            answer:
              "Module resolution is the algorithm TypeScript uses to find the file that a given import refers to. The two main strategies are: Classic (older, for AMD/SystemJS) and Node (mirrors Node.js resolution — looks for index.ts, package.json main, @types packages). TypeScript 5+ adds Bundler mode which mirrors modern bundler behavior. You configure it with moduleResolution in tsconfig.json. Path mapping (paths option) lets you create import aliases like @/components instead of ../../components.",
            code: `// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16", // or "bundler" for Vite/webpack
    "paths": {
      "@/*": ["./src/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}

// Now you can write:
import { LoginPage } from "@pages/LoginPage";
// instead of: import { LoginPage } from "../../pages/LoginPage";`,
          },
          {
            type: "qa",
            question: "15. How do you type async functions in TypeScript?",
            answer:
              "An async function always returns a Promise. Its return type annotation must be Promise<T> where T is the resolved value type. TypeScript infers the return type automatically from the return statement, so explicit annotation is optional but recommended for public APIs. You can also use Awaited<T> to get the resolved type of a Promise.",
            code: `// Explicit return type
async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("User not found");
  return res.json() as User;
}

// Inferred return type (also Promise<User>)
async function getCurrentUser() {
  return getUser(1); // TS infers Promise<User>
}

// Awaited utility type
type UserType = Awaited<ReturnType<typeof getUser>>; // User

// Async arrow function
const deleteUser = async (id: number): Promise<void> => {
  await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
};

// Error handling pattern
async function safeGetUser(id: number): Promise<User | null> {
  try {
    return await getUser(id);
  } catch {
    return null;
  }
}`,
          },
          {
            type: "divider",
          },
          {
            type: "tip",
            text: "Pro tip for Playwright interviews: mention that TypeScript's strict mode combined with Playwright's typed API makes it nearly impossible to write a test that calls a non-existent method or passes wrong argument types — the compiler rejects it before you even run the tests.",
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: "Otomasyon Mühendisleri için TypeScript",
      subtitle: "Sıfırdan Tipli Playwright Testlerine",
      intro:
        "TypeScript, düz JavaScript'e derlenen, güçlü tipli bir JavaScript üst kümesidir. Dile isteğe bağlı statik tipleme ve sınıf tabanlı nesne yönelimli programlama ekler. Otomasyon mühendisleri için TypeScript altın standarttır — Playwright tamamen TypeScript ile yazılmıştır ve kutudan çıktığı gibi birinci sınıf tip tanımlarıyla gelir.",
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
        title: "TypeScript'e Giriş",
        blocks: [
          {
            type: "heading",
            text: "TypeScript Nedir?",
          },
          {
            type: "text",
            text: "TypeScript, Microsoft tarafından geliştirilen ve ilk olarak 2012 yılında yayımlanan açık kaynaklı bir programlama dilidir. JavaScript'in katı sözdizimsel bir üst kümesidir — yani her geçerli JavaScript programı aynı zamanda geçerli bir TypeScript programıdır. TypeScript; isteğe bağlı statik tür ek açıklamaları, interface'ler, enum'lar, generic'ler ve temiz, okunabilir JavaScript'e derlenen modern ECMAScript özellikleri ekler.",
          },
          {
            type: "heading",
            text: "TypeScript Neden Oluşturuldu?",
          },
          {
            type: "text",
            text: "JavaScript uygulamaları büyüyüp karmaşıklaştıkça, Microsoft'taki (ve sektördeki) geliştiriciler ciddi sorunlarla karşılaştı: yalnızca çalışma zamanında ortaya çıkan hatalar, özel nesnelerde IDE otomatik tamamlaması olmaması ve güvenle yeniden düzenlemesi neredeyse imkânsız hale gelen kod tabanları. C# tasarımcısı olan Anders Hejlsberg, JavaScript ekosistemini terk etmeden enterprise düzeyinde araçları JavaScript'e getirmek için TypeScript projesini yönetti.",
          },
          {
            type: "list",
            title: "TypeScript'in Çözdüğü Sorunlar",
            icon: "🛠️",
            items: [
              {
                label: "Çalışma zamanı tür hataları",
                desc: "JS, bir sayı üzerinde .toUpperCase() çağırmanıza izin verir — TypeScript bunu siz kodu çalıştırmadan derleme zamanında yakalar.",
              },
              {
                label: "Eksik otomatik tamamlama",
                desc: "Tipler olmadan editörünüz bir nesnenin hangi özelliklere sahip olduğunu bilemez. TypeScript, VS Code'daki IntelliSense'i güçlendirir.",
              },
              {
                label: "Güvensiz yeniden düzenleme",
                desc: "Saf JS'de bir fonksiyonu yeniden adlandırmak grep-ve-umut gerektirir. TypeScript tüm kullanımları izler ve her bozuk referansı anında vurgular.",
              },
              {
                label: "Belirsiz fonksiyon sözleşmeleri",
                desc: "TS, bir fonksiyonun neyi kabul ettiğini ve ne döndürdüğünü bildirmenizi zorunlu kılar; bu da kodu kendi kendini belgeler hale getirir.",
              },
              {
                label: "Ekip ölçeğinde bakım",
                desc: "Tipler, kodla her zaman senkronize olan canlı belgeler görevi görür — bayatlamaya mahkûm yorumların aksine.",
              },
            ],
          },
          {
            type: "heading",
            text: "TypeScript Derlemesi: .ts → .js",
          },
          {
            type: "text",
            text: "TypeScript dosyaları .ts uzantısını kullanır. TypeScript derleyicisi (tsc) bu dosyaları okur, tür denetimi gerçekleştirir ve herhangi bir tarayıcı veya Node.js çalışma ortamının çalıştırabileceği düz .js dosyaları oluşturur. Tipler çalışma zamanında tamamen silinir — yalnızca geliştirme aşamasında size yardımcı olmak için vardırlar.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// hello.ts  (TypeScript kaynağı)
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));

// tsc sonrası → hello.js  (derlenmiş çıktı)
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("TypeScript"));`,
          },
          {
            type: "heading",
            text: "Otomasyon Dünyasında TypeScript",
          },
          {
            type: "text",
            text: "Önde gelen tarayıcı otomasyon çerçevesi olan Playwright, tamamen TypeScript ile yazılmıştır ve her API için TypeScript tip tanımları içerir. Bu, TypeScript ile bir Playwright testi yazarken Page, Locator, BrowserContext ve diğerleri üzerindeki her yöntem için otomatik tamamlama alacağınız anlamına gelir. Ayrıca yanlış argüman ilettiğinizde derleme zamanı hataları alırsınız; bu da tek bir test çalıştırmadan önce hataları yakalar.",
          },
          {
            type: "info",
            text: "Playwright'ın resmi belgeleri tüm örnekleri önce TypeScript'te gösterir. Playwright VS Code uzantısı da her API'de üzerine gelme belgeleri ve tanıma atlama sağlayan TypeScript dil sunucusu özellikleriyle güçlendirilmiştir.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// TypeScript'te Playwright testi — tam tür güvenliği
import { test, expect, Page } from '@playwright/test';

test('login page has title', async ({ page }: { page: Page }) => {
  await page.goto('https://example.com/login');
  // IDE otomatik tamamlama 'page' üzerindeki her yöntemi listeler
  await expect(page).toHaveTitle(/Login/);
});`,
          },
          {
            type: "heading",
            text: "JavaScript ve TypeScript: Yan Yana Karşılaştırma",
          },
          {
            type: "table",
            headers: ["Özellik", "JavaScript", "TypeScript"],
            rows: [
              ["Tür güvenliği", "Yok — tipler dinamik", "Derleme zamanında kontrol edilen statik tipler"],
              ["Otomatik tamamlama (IntelliSense)", "Sınırlı — JSDoc'a bağlı", "Tam — tip tanımlarıyla desteklenir"],
              ["Yeniden düzenleme güvenliği", "Riskli — otomatik izleme yok", "Güvenli — derleyici tüm kullanımları izler"],
              ["Hata tespiti", "Yalnızca çalışma zamanı", "Derleme zamanı + çalışma zamanı"],
              ["Öğrenme eğrisi", "Daha düşük", "Biraz daha yüksek, hızla karşılığını verir"],
              ["Playwright desteği", "Çalışır ama tip ipucu yok", "Birinci sınıf — tam tip tanımları"],
              ["tsconfig.json", "Geçerli değil", "Derleme davranışını yapılandırır"],
              ["Bildirim dosyaları (.d.ts)", "Geçerli değil", "JS kütüphanelerinin tiplerini tanımlar"],
              ["Generic'ler", "Mevcut değil", "Tam desteklenir"],
              ["Interface'ler", "Mevcut değil", "Temel dil özelliği"],
            ],
          },
          {
            type: "tip",
            text: "Playwright ile kullanmaya başlamak için TypeScript uzmanı olmanıza gerek yok. Page Object Model'larınıza temel tipler eklemek bile bakım kolaylığını önemli ölçüde artırır ve hataları erkenden yakalar.",
          },
        ],
      },
      {
        title: "Kurulum ve Yapılandırma",
        blocks: [
          {
            type: "heading",
            text: "Adım 1 — Node.js'i Yükle",
          },
          {
            type: "text",
            text: "TypeScript, Node.js üzerinde çalışır. nodejs.org adresinden LTS sürümünü indirin. Kurulumdan sonra terminalde hem node hem npm'in mevcut olduğunu doğrulayın.",
          },
          {
            type: "code",
            language: "bash",
            code: `node --version    # v20.x.x veya üzeri önerilir
npm --version     # 9.x veya üzeri`,
          },
          {
            type: "heading",
            text: "Adım 2 — TypeScript'i Global Olarak Yükle",
          },
          {
            type: "code",
            language: "bash",
            code: `npm install -g typescript
tsc --version    # Version 5.x.x`,
          },
          {
            type: "info",
            text: "Proje düzeyinde kurulum için (ekipler için önerilir) TypeScript'i devDependency olarak kurun: npm install --save-dev typescript. Bu, herkesin aynı sürümü kullanmasını sağlar.",
          },
          {
            type: "heading",
            text: "Adım 3 — tsconfig.json'u Başlat",
          },
          {
            type: "text",
            text: "tsconfig.json, TypeScript yapılandırma dosyasıdır. Derleyiciye hangi dosyaların dahil edileceğini, hangi JavaScript sürümünün hedefleneceğini ve hangi katı denetimlerin etkinleştirileceğini bildirir.",
          },
          {
            type: "code",
            language: "bash",
            code: `tsc --init    # Yorumlu varsayılanlarla tsconfig.json oluşturur`,
          },
          {
            type: "heading",
            text: "tsconfig.json Temel Seçenekleri",
          },
          {
            type: "code",
            language: "json",
            code: `{
  "compilerOptions": {
    "target": "ES2020",         // Çıktı JS sürümü (ES5, ES2015, ES2020, ESNext)
    "module": "commonjs",       // Modül sistemi (Node için commonjs, tarayıcı için ESNext)
    "outDir": "./dist",         // Derlenen JS dosyalarının gideceği yer
    "rootDir": "./src",         // TypeScript kaynak dosyalarının bulunduğu yer
    "strict": true,             // Tüm katı tür denetimlerini etkinleştirir (ÖNERİLEN)
    "esModuleInterop": true,    // CommonJS modüllerinden varsayılan içe aktarmaya izin verir
    "skipLibCheck": true,       // Bildirim dosyalarının tür denetimini atla
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,  // .json dosyalarını içe aktarmaya izin ver
    "sourceMap": true           // Hata ayıklama için .map dosyaları oluştur
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
          },
          {
            type: "table",
            headers: ["Seçenek", "Amacı", "Önerilen Değer"],
            rows: [
              ["strict", "strictNullChecks, noImplicitAny ve daha fazlasını etkinleştirir", "true"],
              ["target", "Derleyicinin yaydığı JS sürümü", "ES2020"],
              ["module", "Çıktı dosyalarındaki modül formatı", "commonjs (Node) / ESNext (tarayıcı)"],
              ["outDir", "Derlenmiş dosyalar için çıktı dizini", "./dist"],
              ["esModuleInterop", "CommonJS modüllerini daha kolay içe aktarma", "true"],
              ["sourceMap", "Derlenmiş JS'yi hata ayıklama için TS'ye geri eşler", "true"],
              ["noUnusedLocals", "Kullanılmayan yerel değişkenlerde hata", "true"],
              ["noImplicitReturns", "Tüm kod yolları return etmediğinde hata", "true"],
            ],
          },
          {
            type: "heading",
            text: "Adım 4 — VS Code TypeScript Kurulumu",
          },
          {
            type: "text",
            text: "VS Code'da TypeScript desteği yerleşik olarak bulunur — uzantı gerekmez. Ancak aşağıdaki uzantılar deneyimi büyük ölçüde iyileştirir:",
          },
          {
            type: "list",
            items: [
              { label: "ESLint", desc: "TypeScript kodu için linting" },
              { label: "Prettier", desc: "Otomatik kod biçimlendirme" },
              { label: "Playwright Test for VS Code", desc: "Playwright testlerini görsel olarak çalıştırın ve hata ayıklayın" },
              { label: "TypeScript Hero", desc: "Otomatik import düzenleme" },
            ],
          },
          {
            type: "heading",
            text: "Adım 5 — İlk TypeScript Dosyanızı Derleyin ve Çalıştırın",
          },
          {
            type: "code",
            language: "typescript",
            code: `// src/index.ts
const message: string = "Hello from TypeScript!";
const year: number = new Date().getFullYear();
console.log(\`\${message} Year: \${year}\`);`,
          },
          {
            type: "code",
            language: "bash",
            code: `tsc src/index.ts          # src/index.js olarak derlenir
node src/index.js         # Derlenmiş dosyayı çalıştırır`,
          },
          {
            type: "heading",
            text: "Adım 6 — ts-node: TypeScript'i Doğrudan Çalıştırın",
          },
          {
            type: "text",
            text: "ts-node, Node.js için bir TypeScript yürütme motorudur. .ts dosyalarını ayrı bir derleme adımı olmadan anında derler ve çalıştırır — betikler ve hızlı prototipleme için mükemmeldir.",
          },
          {
            type: "code",
            language: "bash",
            code: `npm install -g ts-node
ts-node src/index.ts      # Tek adımda derler ve çalıştırır`,
          },
          {
            type: "tip",
            text: "Playwright projeleri için ts-node'a ihtiyacınız yok — Playwright TypeScript derlemesini dahili dönüştürücüsü aracılığıyla halleder. Sadece npx playwright test çalıştırın, hepsi bu.",
          },
          {
            type: "heading",
            text: "Sıfırdan Playwright TypeScript Projesi Kurma",
          },
          {
            type: "steps",
            items: [
              "mkdir my-automation && cd my-automation",
              "npm init -y",
              "npm install --save-dev @playwright/test typescript",
              "npx playwright install",
              "playwright.config.ts oluştur (İleri Seviye bölümüne bakın)",
              "tests/example.spec.ts oluştur",
              "npx playwright test",
            ],
          },
        ],
      },
      {
        title: "Orta Seviye TypeScript",
        blocks: [
          {
            type: "heading",
            text: "İlkel Tipler",
          },
          {
            type: "code",
            language: "typescript",
            code: `// string
let username: string = "Alice";
let template: string = \`Hello \${username}\`;

// number (tam sayıları VE ondalıkları kapsar)
let age: number = 30;
let price: number = 9.99;
let hex: number = 0xff;

// boolean
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

// null ve undefined
let nothing: null = null;
let notSet: undefined = undefined;

// any — KAÇININ: tür denetimini devre dışı bırakır
let wild: any = "anything";
wild = 42;
wild = true;

// unknown — any'nin daha güvenli alternatifi
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // güvenli — TS burada string olduğunu bilir
}

// never — asla oluşmayan değerleri temsil eder
function throwError(msg: string): never {
  throw new Error(msg);
}

// void — fonksiyon hiçbir şey döndürmez
function logMessage(msg: string): void {
  console.log(msg);
}`,
          },
          {
            type: "table",
            headers: ["Tip", "Açıklama", "Kullanım Alanı"],
            rows: [
              ["string", "Metin değerleri", "İsimler, URL'ler, mesajlar"],
              ["number", "Tüm sayısal değerler", "ID'ler, fiyatlar, sayılar"],
              ["boolean", "true / false", "Bayraklar, koşullar"],
              ["null", "Değerin kasıtlı yokluğu", "İsteğe bağlı DB alanları"],
              ["undefined", "Bildirilmiş ama atanmamış değişken", "Başlatılmamış durum"],
              ["any", "Tür denetimini devre dışı bırakır", "JS'den geçiş (yeni kodda kaçının)"],
              ["unknown", "Kullanmadan önce tip daraltılmalı", "Dış girdi, JSON.parse()"],
              ["never", "Hiçbir zaman tamamlanmayan kod yolu", "Kapsamlı denetimler, throw fonksiyonları"],
              ["void", "Anlamlı dönüş değeri yok", "Olay yöneticileri, yan etki fonksiyonları"],
            ],
          },
          {
            type: "heading",
            text: "Tip Çıkarımı",
          },
          {
            type: "text",
            text: "TypeScript, atadığınız değerlerden tipleri otomatik olarak çıkarabilir. Her zaman tip ek açıklamaları yazmanıza gerek yoktur — derleyici bunu kendi başına anlayacak kadar zekidir.",
          },
          {
            type: "code",
            language: "typescript",
            code: `let count = 10;          // number olarak çıkarıldı
let name = "Bob";        // string olarak çıkarıldı
let active = true;       // boolean olarak çıkarıldı

// TypeScript artık count'un number olduğunu biliyor:
count = "hello";         // Hata: 'string' tipi 'number' tipine atanamaz

// Fonksiyon dönüş tipi de çıkarılır
function add(a: number, b: number) {
  return a + b;           // dönüş tipi number olarak çıkarıldı
}`,
          },
          {
            type: "heading",
            text: "Diziler ve Tuple'lar",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Diziler
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Nesne dizisi
const users: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Tuple — sabit uzunluk, her pozisyonda sabit tipler
let coordinate: [number, number] = [51.5, -0.1];
let entry: [string, number] = ["age", 30];

// Etiketli tuple (TS 4+)
let point: [x: number, y: number] = [10, 20];

// Salt okunur dizi
const frozen: readonly string[] = ["a", "b", "c"];
// frozen.push("d"); // Hata — salt okunur dizi değiştirilemez`,
          },
          {
            type: "heading",
            text: "Nesneler ve Interface'ler",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Satır içi nesne tipi
let user: { id: number; name: string; email?: string } = {
  id: 1,
  name: "Alice",
  // email isteğe bağlı — atlanırsa hata yok
};

// Interface — yeniden kullanılabilir, genişletilebilir
interface User {
  id: number;
  name: string;
  email?: string;          // isteğe bağlı özellik
  readonly createdAt: Date; // oluşturulduktan sonra değiştirilemez
}

interface AdminUser extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: AdminUser = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"],
};`,
          },
          {
            type: "heading",
            text: "Type Alias ve Interface Farkı",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Type alias — primitive'ler, union'lar, tuple'lar ve nesneler için çalışır
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (error: Error | null, result: string) => void;

// Interface — nesne şekilleri için; bildirim birleştirmeyi destekler
interface Point {
  x: number;
  y: number;
}

// Genişletme
type Animal = { name: string };
type Dog = Animal & { breed: string };   // type — kesişim

interface Animal { name: string }
interface Dog extends Animal { breed: string } // interface — extends

// Genel API'ler ve sınıf şekilleri için interface kullanın
// Union'lar, tuple'lar ve karmaşık tip ifadeleri için type kullanın`,
          },
          {
            type: "tip",
            text: "Temel kural: bir nesnenin veya sınıfın şeklini tanımlarken interface kullanın. Union'lar, tuple'lar veya hesaplanmış/eşlenmiş tipler için type kullanın.",
          },
          {
            type: "heading",
            text: "Union ve Intersection Tipleri",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Union — değer birkaç tipten biri olabilir
type Status = "active" | "inactive" | "pending";
type StringOrNumber = string | number;

function formatID(id: string | number): string {
  if (typeof id === "number") return id.toString();
  return id;
}

// Ayrımcı union — durum makineleri için mükemmel
type ApiState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function render(state: ApiState) {
  switch (state.status) {
    case "loading": return "Yükleniyor...";
    case "success": return state.data.join(", ");
    case "error":   return \`Hata: \${state.message}\`;
  }
}

// Intersection — değer TÜM tipleri karşılamalıdır
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & WithTimestamps;`,
          },
          {
            type: "heading",
            text: "Enum'lar",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Sayısal enum (varsayılan — otomatik artış)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
const move: Direction = Direction.Up;

// String enum — okunabilirlik için tercih edilir
enum Status {
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
  Pending  = "PENDING",
}
const userStatus: Status = Status.Active; // "ACTIVE"

// Const enum — derleme zamanında tamamen silinir (en iyi performans)
const enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
}
const browser: Browser = Browser.Chrome;
// Derlenmiş çıktı: const browser = "chrome"; — enum nesnesi oluşturulmaz`,
          },
          {
            type: "heading",
            text: "Fonksiyonlar: Tipler, İsteğe Bağlı ve Varsayılan Parametreler",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Tipli parametreler ve dönüş tipi
function multiply(a: number, b: number): number {
  return a * b;
}

// İsteğe bağlı parametre (zorunlu parametrelerden sonra gelmeli)
function greet(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}

// Varsayılan parametre
function createUser(name: string, role: string = "viewer"): User {
  return { id: Date.now(), name, role };
}

// Rest parametreleri
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Fonksiyon tipi ek açıklaması
type Transformer = (input: string) => string;
const toUpper: Transformer = (s) => s.toUpperCase();

// Tipli arrow function
const divide = (a: number, b: number): number => a / b;

// Async fonksiyon — dönüş tipi her zaman Promise<T>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as User;
}`,
          },
          {
            type: "heading",
            text: "Generic'ler — Giriş",
          },
          {
            type: "text",
            text: "Generic'ler, tür güvenliğini korurken herhangi bir tipte çalışan yeniden kullanılabilir fonksiyonlar ve tipler yazmanıza olanak tanır. Tip parametreleri olarak düşünün.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Generic'siz — tip bilgisi kaybolur
function firstItem(arr: any[]): any {
  return arr[0];
}

// Generic ile — tipi korur
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const num = firstItem([1, 2, 3]);       // çıkarıldı: number
const str = firstItem(["a", "b", "c"]); // çıkarıldı: string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<User[]> = {
  data: [{ id: 1, name: "Alice" }],
  status: 200,
  message: "OK",
};`,
          },
          {
            type: "heading",
            text: "Tip Doğrulaması (Type Assertions)",
          },
          {
            type: "code",
            language: "typescript",
            code: `// 'as' ile tip doğrulaması — TS'ye tipin ne olduğunu söylersiniz
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice"; // Hata yok — TS doğrulamanıza güvenir

// Çift doğrulama (kaçış yolu — dikkatli kullanın)
const value = (someValue as unknown) as string;

// Non-null doğrulama operatörü (!)
const el = document.getElementById("app")!; // null olmadığını doğrula
el.innerHTML = "Hello";

// Ne zaman kullanılır: TS'den daha fazlasını bildiğinizde
// örn. çalışma zamanında kontrol ettikten sonra veya gevşek API'lerle çalışırken
const data = JSON.parse(rawJson) as ApiResponse<User>;`,
          },
          {
            type: "warning",
            text: "Tip doğrulamaları derleyicinin güvenlik denetimlerini atlar. Yalnızca tip hakkında kesinlikle emin olduğunuzda kullanın — yanlış bir doğrulama derleme zamanı hatası değil, çalışma zamanı hatasına neden olur.",
          },
        ],
      },
      {
        title: "İleri Seviye TypeScript",
        blocks: [
          {
            type: "heading",
            text: "Utility Tipleri",
          },
          {
            type: "text",
            text: "TypeScript, mevcut tipleri dönüştürmenize olanak tanıyan bir dizi yerleşik generic tip içerir. Bunlar gerçek dünya projelerinde vazgeçilmezdir.",
          },
          {
            type: "code",
            language: "typescript",
            code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial<T> — tüm özellikler isteğe bağlı hale gelir
type UpdateUserDTO = Partial<User>;

// Required<T> — tüm özellikler zorunlu hale gelir
type StrictUser = Required<Partial<User>>;

// Readonly<T> — tüm özellikler salt okunur hale gelir
type FrozenUser = Readonly<User>;

// Pick<T, K> — yalnızca belirtilen anahtarları tut
type UserPreview = Pick<User, "id" | "name">;

// Omit<T, K> — belirtilen anahtarları kaldır
type PublicUser = Omit<User, "password">;

// Record<K, V> — K anahtarları ve V değerleri olan nesne
type RoleMap = Record<string, string[]>;

// Exclude<T, U> — union'dan kaldır
type NoNull = Exclude<string | null | undefined, null | undefined>;

// Extract<T, U> — union'dan eşleşen tipleri tut
type OnlyStrings = Extract<string | number | boolean, string>;

// NonNullable<T> — null ve undefined'ı kaldır
type SafeString = NonNullable<string | null | undefined>;

// ReturnType<T> — bir fonksiyonun dönüş tipini çıkar
function getUser() { return { id: 1, name: "Alice" }; }
type UserReturnType = ReturnType<typeof getUser>;

// Parameters<T> — bir fonksiyonun parametre tiplerini çıkar
function createOrder(userId: number, items: string[]): void {}
type OrderParams = Parameters<typeof createOrder>;`,
          },
          {
            type: "heading",
            text: "İleri Seviye Generic'ler",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Generic kısıtlamalar — T en azından bu özelliklere sahip olmalı
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const name = getProperty(user, "name");   // string
// getProperty(user, "age");              // Hata — 'age' user'da yok

// Birden fazla tip parametresi
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 } as A & B;
}

// Koşullu tipler
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Koşullu tiplerde infer
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type Resolved = UnpackPromise<Promise<string>>; // string

// Eşlenmiş tipler — her özelliği dönüştür
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // readonly'i kaldır
};`,
          },
          {
            type: "heading",
            text: "Sınıflar: Erişim Belirteçleri ve Abstract Sınıflar",
          },
          {
            type: "code",
            language: "typescript",
            code: `class BankAccount {
  public  readonly id: string;      // her yerden erişilebilir, değiştirilemez
  private balance: number;           // yalnızca bu sınıf içinde
  protected owner: string;           // bu sınıf ve alt sınıflar

  constructor(owner: string, initialBalance: number) {
    this.id = crypto.randomUUID();
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) throw new Error("Miktar pozitif olmalı");
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

// Abstract sınıf — doğrudan örneklenemez
abstract class BasePage {
  constructor(protected page: import("@playwright/test").Page) {}

  abstract waitForLoad(): Promise<void>; // alt sınıf MUTLAKA uygulamalı

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForLoad();
  }
}

class LoginPage extends BasePage {
  private usernameInput = this.page.locator("#username");
  private passwordInput = this.page.locator("#password");
  private submitButton  = this.page.locator('button[type="submit"]');

  async waitForLoad(): Promise<void> {
    await this.usernameInput.waitFor({ state: "visible" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`,
          },
          {
            type: "heading",
            text: "Decorator'lar",
          },
          {
            type: "text",
            text: "Decorator'lar, aşama-3 JavaScript önerisidir (TypeScript 5+'da varsayılan olarak etkin). Tanımlama zamanında sınıfları ve üyelerini değiştirebilen fonksiyonlardır.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// tsconfig'de etkinleştir: "experimentalDecorators": true (TS < 5)
// TS 5+ TC39 decorator'larını yerel olarak destekler

// Method decorator — loglama ekler
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

// Class decorator — metadata ekler
function singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) return instance;
      super(...args);
      instance = this as any;
    }
  };
}

class UserService {
  @log
  findUser(id: number): string {
    return \`User \${id}\`;
  }
}

@singleton
class DatabaseConnection {
  connect() { console.log("Bağlandı"); }
}`,
          },
          {
            type: "heading",
            text: "TypeScript ile Playwright: Tipli Page Object Model",
          },
          {
            type: "code",
            language: "typescript",
            code: `// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton   = page.locator('[data-testid="login-btn"]');
    this.errorMessage  = page.locator('[data-testid="error-msg"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("başarılı giriş", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");
});`,
          },
          {
            type: "heading",
            text: "test.extend() ile Tipli Fixture'lar",
          },
          {
            type: "code",
            language: "typescript",
            code: `// fixtures/index.ts
import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

// Fixture tiplerini tanımla
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_EMAIL!,
      process.env.TEST_PASSWORD!
    );
    await use(page);
  },
});

export { expect } from "@playwright/test";`,
          },
          {
            type: "heading",
            text: "playwright.config.ts",
          },
          {
            type: "code",
            language: "typescript",
            code: `import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});`,
          },
          {
            type: "heading",
            text: "TypeScript'te Tasarım Kalıpları",
          },
          {
            type: "code",
            language: "typescript",
            code: `// ── Builder Kalıbı ───────────────────────────────────────────
class RequestBuilder {
  private _method: string = "GET";
  private _url: string = "";
  private _headers: Record<string, string> = {};
  private _body?: unknown;

  method(m: string): this { this._method = m; return this; }
  url(u: string): this    { this._url = u;    return this; }
  header(k: string, v: string): this { this._headers[k] = v; return this; }
  body(b: unknown): this  { this._body = b;   return this; }

  build(): Request {
    return new Request(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : undefined,
    });
  }
}

const req = new RequestBuilder()
  .url("/api/users")
  .method("POST")
  .header("Content-Type", "application/json")
  .body({ name: "Alice" })
  .build();

// ── Factory Kalıbı ────────────────────────────────────────────
interface Notification { send(message: string): void; }
class EmailNotification  implements Notification { send(m: string) { console.log("Email:", m); } }
class SlackNotification  implements Notification { send(m: string) { console.log("Slack:", m); } }

function createNotifier(type: "email" | "slack"): Notification {
  const map = { email: EmailNotification, slack: SlackNotification };
  return new map[type]();
}

// ── Strategy Kalıbı ───────────────────────────────────────────
interface SortStrategy { sort(data: number[]): number[]; }
class BubbleSort implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => a-b); } }
class QuickSort  implements SortStrategy { sort(d: number[]) { return [...d].sort((a,b) => b-a); } }

class Sorter {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  sort(data: number[]) { return this.strategy.sort(data); }
}`,
          },
          {
            type: "heading",
            text: "Bildirim Dosyaları (.d.ts) ve Modül Genişletme",
          },
          {
            type: "code",
            language: "typescript",
            code: `// my-library.d.ts — bir JavaScript kütüphanesini tanımlar
declare module "my-js-lib" {
  export function parseDate(input: string): Date;
  export interface Config {
    locale: string;
    timezone: string;
  }
}

// Modül genişletme — mevcut bir modüle tip ekle
declare module "@playwright/test" {
  interface Page {
    // Playwright'ın Page tipine özel metod ekle
    fillForm(fields: Record<string, string>): Promise<void>;
  }
}

// global.d.ts — global tipleri genişlet
declare global {
  interface Window {
    __APP_CONFIG__: { apiUrl: string; version: string };
  }
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      TEST_EMAIL: string;
      TEST_PASSWORD: string;
      CI?: string;
    }
  }
}
export {};`,
          },
        ],
      },
      {
        title: "Mülakat Soruları ve Cevapları",
        blocks: [
          {
            type: "heading",
            text: "TypeScript Mülakat Soruları",
          },
          {
            type: "qa",
            question: "1. TypeScript ile JavaScript arasındaki fark nedir?",
            answer:
              "TypeScript, statik tipli bir JavaScript üst kümesidir. İsteğe bağlı tip ek açıklamaları, interface'ler, generic'ler, enum'lar ve erişim belirteçleri ekler. TypeScript yürütülmeden önce JavaScript'e derlenmesi gerekir — tarayıcılar ve Node.js yalnızca JavaScript çalıştırır. Temel fayda, TypeScript'in tip hatalarını derleme zamanında (geliştirme sırasında) yakalamasıdır; oysa JavaScript bu hataları yalnızca üretimdeki çalışma zamanında ortaya çıkarır.",
          },
          {
            type: "qa",
            question: "2. TypeScript'te tip çıkarımı nedir?",
            answer:
              "Tip çıkarımı, derleyicinin açık bir tip ek açıklaması gerektirmeden bir değişkenin tipini başlangıç değerine göre otomatik olarak belirleme yeteneğidir. Örneğin `let x = 5` ifadesi `x`'i `number` olarak çıkarır. Çıkarım, fonksiyon dönüş tipleri ve generic tip parametrelerinde de çalışır.",
            code: `let x = 5;           // çıkarıldı: number
let s = "hello";     // çıkarıldı: string
let arr = [1, 2, 3]; // çıkarıldı: number[]

function double(n: number) { return n * 2; }
// dönüş tipi number olarak çıkarıldı`,
          },
          {
            type: "qa",
            question: "3. interface ve type arasındaki fark nedir?",
            answer:
              "Her ikisi de nesne şekillerini tanımlar, ancak yetenekleri farklıdır. interface, bildirim birleştirmeyi destekler (açıp ekleme yapabilirsiniz), OOP kalıpları için tercih edilir ve derleyicide biraz daha performanslıdır. type, union tiplerini, kesişimi, tuple tiplerini ve eşlenmiş tipleri destekler — daha fazla ifade gücüne ihtiyaç duyduğunuzda kullanın. Pratikte: genel API'ler ve sınıf şekilleri için interface, union'lar, primitive'ler ve hesaplanmış tipler için type kullanın.",
            code: `// interface — genişletilebilir ve birleştirilebilir
interface Animal { name: string }
interface Animal { age: number } // birleşir — artık hem name hem age var

// type — daha ifadeli ama birleştirme yok
type ID = string | number;
type Pair = [string, number];
type ReadonlyUser = Readonly<User>;`,
          },
          {
            type: "qa",
            question: "4. any, unknown ve never arasındaki fark nedir?",
            answer:
              "`any`, tür denetimini tamamen devre dışı bırakır — onunla her şeyi yapabilirsiniz. JS geçişi dışında kullanmaktan kaçının. `unknown`, `any`'nin tür güvenli versiyonudur — kullanmadan önce tipi daraltmanız (typeof veya instanceof ile) gerekir, bu da onu güvenli bir şekilde ele almaya zorlar. `never`, hiçbir zaman var olamayan bir değeri temsil eder — her zaman throw eden fonksiyonlar, sonsuz döngüler veya kapsamlı tür denetimleri için kullanılır.",
            code: `let a: any     = "hello"; a.foo(); // OK — tip denetimi yok
let u: unknown = "hello"; u.foo(); // Hata — önce daraltılmalı
if (typeof u === "string") u.toUpperCase(); // daraltma sonrası OK

function fail(msg: string): never { throw new Error(msg); }`,
          },
          {
            type: "qa",
            question: "5. Generic'ler nedir? Pratik bir örnek verin.",
            answer:
              "Generic'ler, tip bilgisini korurken herhangi bir tipte çalışan fonksiyonlar, sınıflar ve interface'ler yazmanıza olanak tanıyan tip parametreleridir. Açı parantezleri içinde <T> şeklinde yazılırlar. Generic'ler olmadan ya tip bilgisi kaybolur (any kullanarak) ya da her tip için kod kopyalanır.",
            code: `function identity<T>(value: T): T { return value; }
identity<string>("hello"); // string döndürür
identity<number>(42);      // number döndürür

// Pratik: tipli API sarmalayıcı
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}
const users = await fetchJson<User[]>("/api/users");
// users tam tipli User[]`,
          },
          {
            type: "qa",
            question: "6. Partial, Pick ve Omit utility tiplerini açıklayın.",
            answer:
              "Bunlar, mevcut tipleri dönüştüren yerleşik generic tiplerdir. Partial<T>, tüm özellikleri isteğe bağlı yapar — güncelleme/yama DTO'ları için kullanışlıdır. Pick<T, K>, yalnızca listelenen anahtarlarla yeni bir tip oluşturur — görünüm modelleri için kullanışlıdır. Omit<T, K>, listelenen anahtarlar olmadan yeni bir tip oluşturur — istemciye göndermeden önce şifre gibi hassas alanları kaldırmak için kullanışlıdır.",
            code: `interface User { id: number; name: string; email: string; password: string }

type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

type UserCard = Pick<User, "id" | "name">;
// { id: number; name: string }

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }`,
          },
          {
            type: "qa",
            question: "7. Union ve intersection tipleri nedir?",
            answer:
              "Union tipi (A | B), bir değerin A veya B tipinde olabileceği anlamına gelir — en az biri. Intersection tipi (A & B), bir değerin hem A hem de B'yi aynı anda karşılaması gerektiği anlamına gelir — her iki tipten tüm özellikler. Union'lar 'veya' mantığı için (string | number), intersection'lar tipleri birleştirmek için (User & Timestamped) kullanılır.",
            code: `type StringOrNum = string | number;
let val: StringOrNum = "hello"; val = 42; // ikisi de geçerli

type Named   = { name: string };
type Aged    = { age: number };
type Person  = Named & Aged;
const p: Person = { name: "Alice", age: 30 }; // ikisi de olmalı`,
          },
          {
            type: "qa",
            question: "8. TypeScript'te decorator nedir?",
            answer:
              "Decorator, tanımlama zamanında sınıfları, metodları, özellikleri veya parametreleri değiştirebilen ya da ek açıklama ekleyebilen özel bir fonksiyondur. @ sembolüyle yazılırlar. Bağımlılık enjeksiyonu, yönlendirme ve doğrulama için Angular ve NestJS gibi çerçevelerde yaygın olarak kullanılırlar. tsconfig'de experimentalDecorators: true ile etkinleştirin (TypeScript < 5) veya TC39 standart decorator'larını destekleyen TypeScript 5+ kullanın.",
            code: `function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Circle {
  @readonly
  getArea(radius: number): number {
    return Math.PI * radius ** 2;
  }
}`,
          },
          {
            type: "qa",
            question: "9. TypeScript'te strict mod ne sağlar?",
            answer:
              'tsconfig.json\'da "strict": true ayarlamak bir dizi katı tip denetim bayrağını etkinleştirir: strictNullChecks (null/undefined diğer tiplere atanamaz), noImplicitAny (tip örtük olarak any olduğunda hata), strictFunctionTypes, strictBindCallApply, strictPropertyInitialization ve noImplicitThis. Birlikte tüm çalışma zamanı hata kategorilerini ortadan kaldırırlar.',
            code: `// strict: true ile
function greet(name: string) { return "Hello " + name; }
greet(null); // Hata: 'null' tipi 'string' tipine atanamaz

// Strict olmadan bu sessizce geçer ve çalışma zamanında "Hello null" üretir`,
          },
          {
            type: "qa",
            question: "10. Optional chaining ve nullish coalescing nedir?",
            answer:
              "Optional chaining (?.), null veya undefined üzerindeki özelliklere erişirken throw etmek yerine undefined döndürerek kısa devre yapar. Nullish coalescing (??), yalnızca sol taraf null veya undefined olduğunda sağ taraftaki değeri döndürür (0 ve boş string'de de tetiklenen || operatörünün aksine). Her ikisi de TypeScript'in anladığı ve tip denetlediği JavaScript özellikleridir.",
            code: `const user = getUser(); // User | null

// Optional chaining ile
const city = user?.address?.city; // herhangi bir adım null/undefined ise undefined

// Nullish coalescing
const displayName = user?.name ?? "Anonim"; // yalnızca null/undefined'da geri dön
const count = 0 ?? 10;  // 0 — çünkü 0, null/undefined değil
const count2 = 0 || 10; // 10 — çünkü 0 falsy`,
          },
          {
            type: "qa",
            question: "11. Bildirim dosyası (.d.ts) nedir?",
            answer:
              "Bildirim dosyası, herhangi bir çalışma zamanı kodu içermeden bir JavaScript kütüphanesinin tiplerini tanımlar. .d.ts uzantısını kullanır. @types/node veya @types/jest kurduğunuzda, bildirim dosyaları kuruyorsunuz demektir. TypeScript'e düz JavaScript ile yazılmış kütüphaneler hakkında bilgi verirler. Kendi kodunuza tip bilgisi eklemek veya mevcut modül tiplerini genişletmek için özel .d.ts dosyaları da yazabilirsiniz.",
            code: `// myLib.d.ts — uygulama yok, yalnızca tip tanımları
declare function createUser(name: string): { id: number; name: string };
declare const VERSION: string;

declare module "csv-parser" {
  function parse(options?: { separator?: string }): NodeJS.ReadWriteStream;
  export = parse;
}`,
          },
          {
            type: "qa",
            question: "12. TypeScript, Playwright otomasyonuna özellikle nasıl yardımcı olur?",
            answer:
              "Playwright, eksiksiz TypeScript tip tanımlarıyla birlikte gelir. Bu şu anlama gelir: (1) Her Playwright API'si için tam otomatik tamamlama — page metodları, locator seçenekleri, expect eşleştiriciler. (2) Yanlış argüman tipleri için derleme zamanı hataları. (3) private/protected locator'larla tipli Page Object Model'lar. (4) test.extend<MyFixtures>() aracılığıyla tipli özel fixture'lar. (5) Yapılandırma hatalarını çalıştırmadan önce yakalayan tipli playwright.config.ts. (6) global.d.ts aracılığıyla tip güvenli ortam değişkenleri.",
          },
          {
            type: "qa",
            question: "13. TypeScript bağlamında derleme zamanı ve çalışma zamanı hataları arasındaki fark nedir?",
            answer:
              "Derleme zamanı hatası, TypeScript derleyicisi (tsc) tarafından herhangi bir kod çalıştırılmadan önce kaynak kodunuzu analiz ederken yakalanır. Bunlar tip hataları, eksik özellikler, yanlış argüman sayılarıdır. Çalışma zamanı hatası, program gerçekten çalışırken ve JavaScript motoru bir sorunla karşılaştığında oluşur — undefined üzerinde .toLowerCase() çağırmak gibi. TypeScript çalışma zamanı hatalarının çoğunu ortadan kaldırır ama hepsini değil: yapısal hataları yakalar ama ağ hatalarını veya kullanıcı giriş değerlerini kontrol edemez.",
            code: `// Derleme zamanı hatası — tsc anında yakalar
const n: number = "hello"; // Hata: 'string' tipi 'number' tipine atanamaz

// Çalışma zamanı hatası — tsc bunu engelleyemez
const data = JSON.parse(userInput); // tipi 'any' — TS şekli bilemez
data.user.name; // 'user' undefined ise çalışma zamanında throw edebilir`,
          },
          {
            type: "qa",
            question: "14. TypeScript'te modül çözümlemesi nedir?",
            answer:
              "Modül çözümlemesi, TypeScript'in belirli bir import'un hangi dosyaya atıfta bulunduğunu bulmak için kullandığı algoritmadır. İki ana strateji vardır: Classic (AMD/SystemJS için eski) ve Node (Node.js çözümlemesini yansıtır — index.ts, package.json main, @types paketlerini arar). TypeScript 5+, modern bundler davranışını yansıtan Bundler modunu ekler. tsconfig.json'daki moduleResolution ile yapılandırırsınız. Yol eşlemesi (paths seçeneği) ../../components yerine @/components gibi import takma adları oluşturmanıza olanak tanır.",
            code: `// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "paths": {
      "@/*": ["./src/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}

// Artık şunu yazabilirsiniz:
import { LoginPage } from "@pages/LoginPage";
// yerine: import { LoginPage } from "../../pages/LoginPage";`,
          },
          {
            type: "qa",
            question: "15. TypeScript'te async fonksiyonları nasıl tiplendirilir?",
            answer:
              "Async fonksiyon her zaman bir Promise döndürür. Dönüş tipi ek açıklaması T'nin çözümlenen değer tipi olduğu Promise<T> olmalıdır. TypeScript, dönüş tipini return ifadesinden otomatik olarak çıkarır, bu nedenle açık ek açıklama isteğe bağlıdır ancak genel API'ler için önerilir. Bir Promise'in çözümlenen tipini almak için Awaited<T> da kullanabilirsiniz.",
            code: `// Açık dönüş tipi
async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Kullanıcı bulunamadı");
  return res.json() as User;
}

// Çıkarılmış dönüş tipi (yine de Promise<User>)
async function getCurrentUser() {
  return getUser(1); // TS Promise<User> olarak çıkarır
}

// Awaited utility tipi
type UserType = Awaited<ReturnType<typeof getUser>>; // User

// Async arrow function
const deleteUser = async (id: number): Promise<void> => {
  await fetch(\`/api/users/\${id}\`, { method: "DELETE" });
};

// Hata yönetimi kalıbı
async function safeGetUser(id: number): Promise<User | null> {
  try {
    return await getUser(id);
  } catch {
    return null;
  }
}`,
          },
          {
            type: "divider",
          },
          {
            type: "tip",
            text: "Playwright mülakataları için profesyonel ipucu: TypeScript'in strict modunun Playwright'ın tipli API'siyle birleştirilmesinin, var olmayan bir metodu çağıran veya yanlış argüman tipleri ileten bir test yazmayı neredeyse imkânsız hale getirdiğini belirtin — derleyici testleri çalıştırmadan önce reddeder.",
          },
        ],
      },
    ],
  },
};
