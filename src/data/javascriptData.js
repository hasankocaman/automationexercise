// JavaScript Learning Platform Data
// Fully bilingual structure for TopicPage renderer
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO-SCENE FILMLERİ (Bölüm 9.5) — her sekme için 1 film, tek ağaç (en/tr paylaşımlı)
// ═══════════════════════════════════════════════════════════════════════════

// 🎬 0 — JavaScript Nedir? — V8 motorunun kod çalıştırma akışı
const jsV8EngineFlowFilm = {
  type: "video-scene",
  id: "js-v8-engine-flow-film",
  title: {
    tr: "🎬 console.log Yazınca Perde Arkasında Ne Olur? — V8 Motorunun Yolculuğu",
    en: "🎬 What Happens Behind console.log? — The V8 Engine's Journey",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "source",      emoji: "📄", label: { tr: "JS Kaynak Kodu",      en: "JS Source Code" },      color: "#0ea5e9" },
    { id: "parser",      emoji: "🔎", label: { tr: "Parser",              en: "Parser" },              color: "#f59e0b" },
    { id: "ast",         emoji: "🌳", label: { tr: "AST (Sözdizim Ağacı)", en: "AST (Syntax Tree)" },   color: "#8b5cf6" },
    { id: "ignition",    emoji: "⚡", label: { tr: "Ignition Interpreter", en: "Ignition Interpreter" }, color: "#6366f1" },
    { id: "turbofan",    emoji: "🚀", label: { tr: "TurboFan JIT",         en: "TurboFan JIT" },        color: "#22c55e" },
    { id: "output",      emoji: "🖥️", label: { tr: "Konsol Çıktısı",       en: "Console Output" },      color: "#10b981" },
  ],
  scenes: [
    {
      caption: {
        tr: "Tarayıcıya `console.log(\"Merhaba, LearnQA.dev!\")` yazdığında bu tek satırın arkasında V8 motoru (Chrome/Node.js'in JS motoru) devreye girer.",
        en: "When you write `console.log(\"Hello, LearnQA.dev!\")` in the browser, V8 (Chrome/Node.js's JS engine) kicks into action behind this single line.",
      },
      code: { tr: `console.log("Merhaba, LearnQA.dev!");`, en: `console.log("Hello, LearnQA.dev!");` },
      positions: { source: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Parser kaynağı karakter karakter okur ve sözdizimini kontrol eder. Bir noktalı virgül veya parantez eksikse burada `SyntaxError` fırlatılır ve kod hiç ÇALIŞMAZ.",
        en: "Step 1 — the Parser reads the source character by character and checks syntax. If a semicolon or parenthesis is missing, a `SyntaxError` is thrown here and the code NEVER runs.",
      },
      positions: {
        source: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        parser: { x: 42, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "source", to: "parser" }],
    },
    {
      caption: {
        tr: "Adım 2 — Parser başarılı olursa kodu bir AST'ye (Abstract Syntax Tree) dönüştürür: kodun anlamını taşıyan bir ağaç yapısı. Bu, motorun kodu 'anladığı' andır.",
        en: "Step 2 — if parsing succeeds, the code becomes an AST (Abstract Syntax Tree): a tree structure carrying the code's meaning. This is the moment the engine 'understands' the code.",
      },
      positions: {
        parser: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        ast: { x: 44, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "parser", to: "ast" }],
    },
    {
      caption: {
        tr: "Adım 3 — Ignition Interpreter AST'yi bytecode'a çevirip HEMEN satır satır çalıştırmaya başlar. Amaç: derleme beklemeden ANINDA başlamak — Java'daki JIT derleyicisinin aksine JS önce yorumlar, sonra optimize eder.",
        en: "Step 3 — the Ignition Interpreter converts the AST to bytecode and starts executing it line by line IMMEDIATELY. Goal: start running WITHOUT waiting for compilation — unlike Java's JIT compiler, JS interprets first and optimizes later.",
      },
      positions: {
        ast: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        ignition: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "ast", to: "ignition" }],
    },
    {
      caption: {
        tr: "Adım 4 — Eğer bir fonksiyon defalarca aynı tiplerle (hep number, hep string) çağrılırsa TurboFan JIT devreye girer ve o fonksiyonu ÇOK daha hızlı makine koduna derler — bu yüzden bir döngü ısındıkça hızlanır.",
        en: "Step 4 — if a function is repeatedly called with the same types (always number, always string), TurboFan JIT kicks in and compiles that function into MUCH faster machine code — this is why a hot loop speeds up over time.",
      },
      positions: {
        ignition: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        turbofan: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "ignition", to: "turbofan", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Kontrast — bir fonksiyona bazen number bazen string gönderirsen (tip kararsızlığı), TurboFan optimizasyonu İPTAL EDER (deoptimize) ve kod tekrar YAVAŞ yorumlayıcıya döner. Test kodunda tutarlı tipler kullanmak bu yüzden performans için de önemlidir.",
        en: "Contrast — if you sometimes pass a number and sometimes a string to the same function (type instability), TurboFan CANCELS its optimization (deoptimizes) and execution falls back to the SLOW interpreter. This is why consistent types in test code matter for performance too.",
      },
      positions: {
        turbofan: { x: 30, y: 30, opacity: 0.4, scale: 0.8 },
        ignition: { x: 30, y: 70, scale: 1.1, pulse: true },
      },
      beams: [{ from: "turbofan", to: "ignition", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Final — sonuç konsola yazdırılır: `Merhaba, LearnQA.dev!`. Playwright/Cypress testlerin de tam olarak bu motorun üzerinde, aynı yolculuğu izleyerek çalışır.",
        en: "Final — the result is printed to the console: `Hello, LearnQA.dev!`. Your Playwright/Cypress tests run on this exact same engine, following this exact same journey.",
      },
      positions: {
        ignition: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        output: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "ignition", to: "output", color: "#10b981" }],
    },
  ],
}

// 🎬 1 — Kurulum & Setup — Node.js/npm kurulum + ilk test koşumu akışı
const jsNodeNpmSetupFilm = {
  type: "video-scene",
  id: "js-node-npm-setup-film",
  title: {
    tr: "🎬 Boş Bilgisayardan Çalışan Bir Test Projesine",
    en: "🎬 From an Empty Computer to a Running Test Project",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "installer", emoji: "⬇️", label: { tr: "Node.js Installer",     en: "Node.js Installer" },   color: "#0ea5e9" },
    { id: "node",       emoji: "🟢", label: { tr: "Node.js Runtime",       en: "Node.js Runtime" },     color: "#22c55e" },
    { id: "npm",        emoji: "📦", label: { tr: "npm CLI",               en: "npm CLI" },             color: "#f59e0b" },
    { id: "pkgJson",    emoji: "📋", label: { tr: "package.json",          en: "package.json" },        color: "#8b5cf6" },
    { id: "playwright", emoji: "🎭", label: { tr: "@playwright/test",      en: "@playwright/test" },    color: "#6366f1" },
    { id: "testRun",    emoji: "✅", label: { tr: "İlk Test Koşumu",        en: "First Test Run" },      color: "#10b981" },
  ],
  scenes: [
    {
      caption: {
        tr: "Boş bir bilgisayarda JavaScript kodu tarayıcı dışında ÇALIŞMAZ. Node.js kurulmadan `npx playwright test` diye bir şey yoktur.",
        en: "On an empty computer, JavaScript code CANNOT run outside a browser. Without Node.js installed, there is no such thing as `npx playwright test`.",
      },
      code: { tr: `node --version\n# 'node' komutu tanınmıyor`, en: `node --version\n# 'node' is not recognized` },
      positions: { installer: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — nodejs.org'dan LTS sürümü indirilip kurulur. Kurulum bittiğinde `node --version` ile doğrulama yapılır.",
        en: "Step 1 — the LTS version is downloaded from nodejs.org and installed. After install, `node --version` verifies it.",
      },
      code: { tr: `node --version   # v22.x.x`, en: `node --version   # v22.x.x` },
      positions: {
        installer: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        node: { x: 42, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "installer", to: "node" }],
    },
    {
      caption: {
        tr: "Adım 2 — Node.js kurulunca npm (Node Package Manager) de OTOMATİK gelir. `npm --version` çıktısı npm'in de hazır olduğunu kanıtlar.",
        en: "Step 2 — installing Node.js AUTOMATICALLY brings npm (Node Package Manager). The `npm --version` output proves npm is ready too.",
      },
      code: { tr: `npm --version    # 10.x.x`, en: `npm --version    # 10.x.x` },
      positions: {
        node: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        npm: { x: 44, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "node", to: "npm" }],
    },
    {
      caption: {
        tr: "Adım 3 — `npm init -y` çalıştırılır: projenin kimlik kartı olan `package.json` doğar. Henüz hiçbir kütüphane yok, sadece boş bir iskelet.",
        en: "Step 3 — `npm init -y` runs: `package.json`, the project's identity card, is born. No libraries yet, just an empty skeleton.",
      },
      code: { tr: `npm init -y\n# package.json olusturuldu`, en: `npm init -y\n# package.json created` },
      positions: {
        npm: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        pkgJson: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "npm", to: "pkgJson" }],
    },
    {
      caption: {
        tr: "Adım 4 — `npm init playwright@latest` çalıştırılır. npm, npm Registry üzerinden Playwright'ı indirip `node_modules`'e yerleştirir; `package.json` bu bağımlılığı kaydeder.",
        en: "Step 4 — `npm init playwright@latest` runs. npm fetches Playwright from the npm Registry into `node_modules`; `package.json` records this dependency.",
      },
      code: { tr: `npm init playwright@latest`, en: `npm init playwright@latest` },
      positions: {
        pkgJson: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        playwright: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "pkgJson", to: "playwright" }],
    },
    {
      caption: {
        tr: "Final — `npx playwright test` çalıştırılır: boş bilgisayar artık ÇALIŞAN, tarayıcı otomasyonu koşturan bir test projesi. `X passed` çıktısı bu yolculuğun kanıtıdır.",
        en: "Final — `npx playwright test` runs: the empty computer is now a RUNNING project executing browser automation. The `X passed` output is proof of this journey.",
      },
      code: { tr: `npx playwright test\n# 3 passed (12s)`, en: `npx playwright test\n# 3 passed (12s)` },
      positions: {
        playwright: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        testRun: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "playwright", to: "testRun", color: "#10b981" }],
    },
  ],
}

// 🎬 2 — Değişkenler & Operatörler — var/let/const scope + hoisting farkı
const jsVarScopeFilm = {
  type: "video-scene",
  id: "js-var-let-const-scope-film",
  title: {
    tr: "🎬 var'ın Sızıntısı: Bir Değişken Bloktan Nasıl Kaçar?",
    en: "🎬 The Leak of var: How a Variable Escapes Its Block",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "block",   emoji: "🧱", label: { tr: "if Bloğu",             en: "if Block" },              color: "#94a3b8" },
    { id: "varDecl", emoji: "🪣", label: { tr: "var score (delikli)",  en: "var score (leaky)" },     color: "#ef4444" },
    { id: "leak",    emoji: "💧", label: { tr: "Blok Dışına Sızıntı",   en: "Leak Outside Block" },    color: "#f59e0b" },
    { id: "letDecl", emoji: "📦", label: { tr: "let score (kutu)",     en: "let score (box)" },       color: "#0ea5e9" },
    { id: "tdz",     emoji: "⛔", label: { tr: "ReferenceError (TDZ)", en: "ReferenceError (TDZ)" },   color: "#8b5cf6" },
    { id: "safe",    emoji: "✅", label: { tr: "Korunmuş Kapsam",       en: "Protected Scope" },        color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "`if (true) { var score = 95; }` — score, if bloğunun İÇİNDE tanımlanır. Java'da bu blok bittiğinde değişken yok olur. JavaScript'te `var` için durum FARKLIDIR.",
        en: "`if (true) { var score = 95; }` — score is declared INSIDE the if block. In Java, the variable would die when the block ends. In JavaScript, `var` behaves DIFFERENTLY.",
      },
      code: { tr: `if (true) {\n  var score = 95;\n}`, en: `if (true) {\n  var score = 95;\n}` },
      positions: {
        block: { x: 30, y: 40, scale: 1.1 },
        varDecl: { x: 30, y: 65, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: "`console.log(score)` blok dışında çağrılır — ve `95` YAZDIRILIR! `var`'ın function-scope doğası, değeri bloğun sınırlarını aşarak dışarı sızdırır.",
        en: "`console.log(score)` is called outside the block — and it PRINTS `95`! `var`'s function-scope nature leaks the value past the block boundary.",
      },
      code: { tr: `console.log(score); // 95 — sizdi!`, en: `console.log(score); // 95 — it leaked!` },
      positions: {
        varDecl: { x: 20, y: 65, opacity: 0.6, scale: 0.9 },
        leak: { x: 55, y: 65, scale: 1.25, pulse: true },
      },
      beams: [{ from: "varDecl", to: "leak", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Kontrast — AYNI kodu `let score = 95;` ile yazarsan `let` bloğa MÜHÜRLENİR. Blok dışında `console.log(score)` artık sızıntı değil, doğrudan bir HATA verir.",
        en: "Contrast — write the SAME code with `let score = 95;` and `let` is SEALED to the block. Outside the block, `console.log(score)` no longer leaks — it throws an ERROR instead.",
      },
      code: { tr: `if (true) {\n  let score = 95;\n}\nconsole.log(score); // ReferenceError!`, en: `if (true) {\n  let score = 95;\n}\nconsole.log(score); // ReferenceError!` },
      positions: {
        leak: { x: 18, y: 40, opacity: 0.4, scale: 0.8 },
        letDecl: { x: 30, y: 65, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: "`let` ve `const` tanımlanmadan önce erişilirse Temporal Dead Zone (TDZ) devreye girer ve `ReferenceError` fırlatılır — Java'daki derleme zamanı hatasının, JS'teki çalışma zamanı karşılığı.",
        en: "Accessing `let`/`const` before declaration triggers the Temporal Dead Zone (TDZ), throwing a `ReferenceError` — the runtime equivalent of Java's compile-time error.",
      },
      positions: {
        letDecl: { x: 25, y: 65, opacity: 0.6, scale: 0.9 },
        tdz: { x: 58, y: 65, scale: 1.25, pulse: true },
      },
      beams: [{ from: "letDecl", to: "tdz", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Final — bu yüzden modern JavaScript'te `const` varsayılan tercih, `let` sadece yeniden atama gerektiğinde kullanılır; `var` neredeyse hiç kullanılmaz. Kapsam sızıntısı böyle önlenir.",
        en: "Final — this is why modern JavaScript defaults to `const`, uses `let` only when reassignment is needed, and almost never uses `var`. This is how scope leaks are prevented.",
      },
      positions: {
        tdz: { x: 22, y: 65, opacity: 0.4, scale: 0.8 },
        safe: { x: 55, y: 65, scale: 1.25, pulse: true },
      },
      beams: [{ from: "tdz", to: "safe", color: "#22c55e" }],
    },
  ],
}

// 🎬 3 — Veri Tipleri & Fonksiyonlar — == vs === type coercion tuzağı
const jsTypeCoercionFilm = {
  type: "video-scene",
  id: "js-type-coercion-film",
  title: {
    tr: "🎬 == Tuzağı: Gizli Tip Dönüştürücü Nasıl Yalan Söyler?",
    en: "🎬 The == Trap: How the Hidden Type Converter Lies",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "num5",     emoji: "5️⃣",  label: { tr: "5 (Number)",           en: "5 (Number)" },          color: "#0ea5e9" },
    { id: "str5",     emoji: "🔤", label: { tr: "'5' (String)",         en: "'5' (String)" },        color: "#f59e0b" },
    { id: "coercion", emoji: "🔄", label: { tr: "Tip Dönüştürücü",       en: "Type Coercion Engine" }, color: "#ef4444" },
    { id: "looseEq",  emoji: "❓", label: { tr: "== (Gevşek Eşitlik)",   en: "== (Loose Equality)" },  color: "#94a3b8" },
    { id: "strictEq", emoji: "🔒", label: { tr: "=== (Sıkı Eşitlik)",    en: "=== (Strict Equality)" }, color: "#22c55e" },
    { id: "assertion", emoji: "🧪", label: { tr: "Test Assertion'ı",     en: "Test Assertion" },       color: "#8b5cf6" },
  ],
  scenes: [
    {
      caption: {
        tr: "API'den gelen `statusCode` bazen Number (200) bazen String (\"200\") olabilir. `5 == '5'` yazdığında ne olur?",
        en: "An API's `statusCode` might arrive as a Number (200) or a String (\"200\"). What happens when you write `5 == '5'`?",
      },
      code: { tr: `let a = 5;\nlet b = '5';\nconsole.log(a == b);`, en: `let a = 5;\nlet b = '5';\nconsole.log(a == b);` },
      positions: {
        num5: { x: 22, y: 40, scale: 1.1 },
        str5: { x: 22, y: 70, scale: 1.1 },
      },
    },
    {
      caption: {
        tr: "`==` operatörü, karşılaştırmadan ÖNCE gizlice bir tip dönüşümü (coercion) yapar: String `'5'`'i Number `5`'e çevirir, SONRA karşılaştırır.",
        en: "The `==` operator secretly performs type coercion BEFORE comparing: it converts the String `'5'` into the Number `5`, THEN compares.",
      },
      positions: {
        num5: { x: 18, y: 40, opacity: 0.6, scale: 0.9 },
        str5: { x: 18, y: 70, opacity: 0.6, scale: 0.9 },
        coercion: { x: 48, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "num5", to: "coercion" }, { from: "str5", to: "coercion" }],
    },
    {
      caption: {
        tr: "Dönüşüm sonrası her iki taraf da `5` olur — `==` sonucu `true` döner. Görünüşte doğru ama BİLGİ KAYBI var: tiplerin farklı olduğu gizlendi.",
        en: "After coercion both sides become `5` — `==` returns `true`. It looks correct but INFORMATION IS LOST: the fact that the types differ is hidden.",
      },
      positions: {
        coercion: { x: 22, y: 55, opacity: 0.5, scale: 0.85 },
        looseEq: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "coercion", to: "looseEq", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "Kontrast — daha tehlikeli bir örnek: `[] == false` de `true` döner (boş dizi önce string'e, sonra number'a çevrilir). Bu tür zincirleme dönüşümler assertion'larda SESSİZ bug'lara yol açar.",
        en: "Contrast — a more dangerous example: `[] == false` ALSO returns `true` (an empty array is converted to a string, then to a number). These chained conversions cause SILENT bugs in assertions.",
      },
      code: { tr: `console.log([] == false); // true (!)`, en: `console.log([] == false); // true (!)` },
      positions: {
        looseEq: { x: 30, y: 30, opacity: 0.5, scale: 0.85 },
        coercion: { x: 30, y: 70, scale: 1.15, pulse: true },
      },
      beams: [{ from: "looseEq", to: "coercion", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Final — `===` hiçbir dönüşüm YAPMAZ: tip farklıysa direkt `false` döner. `5 === '5'` → `false`. Test otomasyonunda assertion'lar HER ZAMAN `===` kullanmalı — gizli dönüşüme yer yok.",
        en: "Final — `===` performs NO conversion: if types differ, it is immediately `false`. `5 === '5'` → `false`. Test automation assertions must ALWAYS use `===` — no room for hidden conversion.",
      },
      code: { tr: `console.log(a === b); // false`, en: `console.log(a === b); // false` },
      positions: {
        coercion: { x: 22, y: 55, opacity: 0.4, scale: 0.8 },
        strictEq: { x: 46, y: 45, scale: 1.2, pulse: true },
        assertion: { x: 70, y: 55, scale: 1.15 },
      },
      beams: [{ from: "strictEq", to: "assertion", color: "#22c55e" }],
    },
  ],
}

// 🎬 4 — String & Sayı & Matematik — 0.1 + 0.2 !== 0.3 floating point tuzağı
const jsFloatPrecisionFilm = {
  type: "video-scene",
  id: "js-float-precision-film",
  title: {
    tr: "🎬 0.1 + 0.2 Neden 0.3 Etmez? — İkili Sayıların Sırrı",
    en: "🎬 Why Doesn't 0.1 + 0.2 Equal 0.3? — The Secret of Binary Numbers",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "a01",       emoji: "0️⃣", label: { tr: "0.1 (Ondalık)",        en: "0.1 (Decimal)" },       color: "#0ea5e9" },
    { id: "b02",       emoji: "0️⃣", label: { tr: "0.2 (Ondalık)",        en: "0.2 (Decimal)" },       color: "#f59e0b" },
    { id: "binary",    emoji: "⚙️", label: { tr: "IEEE 754 İkili Temsil", en: "IEEE 754 Binary Repr." }, color: "#8b5cf6" },
    { id: "approx",    emoji: "〰️", label: { tr: "Yaklaşık Değerler",     en: "Approximate Values" },  color: "#ef4444" },
    { id: "sum",       emoji: "➕", label: { tr: "Toplam",                en: "Sum" },                 color: "#6366f1" },
    { id: "expected",  emoji: "🎯", label: { tr: "Beklenen: 0.3",         en: "Expected: 0.3" },       color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "Fiyat testlerinde sık görülen bir assertion: `0.1 + 0.2 === 0.3`. Sezgisel olarak `true` bekliyorsun. Perde arkasında neler oluyor?",
        en: "A common assertion in price tests: `0.1 + 0.2 === 0.3`. You intuitively expect `true`. What happens behind the curtain?",
      },
      code: { tr: `console.log(0.1 + 0.2 === 0.3);`, en: `console.log(0.1 + 0.2 === 0.3);` },
      positions: { a01: { x: 22, y: 40, scale: 1.1 }, b02: { x: 22, y: 70, scale: 1.1 } },
    },
    {
      caption: {
        tr: "JavaScript'te TÜM sayılar IEEE 754 çift-hassasiyet ikili (binary) formatında saklanır. Ama `0.1` ve `0.2` gibi ondalık sayılar ikili sistemde TAM olarak temsil EDİLEMEZ — tıpkı 1/3'ün ondalıkta 0.333... hiç bitmemesi gibi.",
        en: "In JavaScript, ALL numbers are stored as IEEE 754 double-precision binary. But decimal numbers like `0.1` and `0.2` CANNOT be represented EXACTLY in binary — just like 1/3 never terminates as 0.333... in decimal.",
      },
      positions: {
        a01: { x: 18, y: 40, opacity: 0.6, scale: 0.9 },
        b02: { x: 18, y: 70, opacity: 0.6, scale: 0.9 },
        binary: { x: 48, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "a01", to: "binary" }, { from: "b02", to: "binary" }],
    },
    {
      caption: {
        tr: "Bu yüzden `0.1` bellekte aslında `0.1000000000000000055511151231257827...` gibi ÇOK küçük bir yuvarlama hatasıyla saklanır. `0.2` için de aynı durum geçerlidir.",
        en: "So `0.1` is actually stored in memory as something like `0.1000000000000000055511151231257827...` — with a TINY rounding error. The same applies to `0.2`.",
      },
      positions: {
        binary: { x: 22, y: 55, opacity: 0.5, scale: 0.85 },
        approx: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "binary", to: "approx", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "İki yaklaşık değer toplanınca hatalar birikir: sonuç `0.30000000000000004` olur — GÖRÜNÜŞTE 0.3 ama BİTE bite farklı bir sayı! `=== 0.3` bu yüzden `false` döner.",
        en: "Adding two approximations accumulates the error: the result is `0.30000000000000004` — it LOOKS like 0.3 but is bit-for-bit a DIFFERENT number! That's why `=== 0.3` returns `false`.",
      },
      code: { tr: `console.log(0.1 + 0.2); // 0.30000000000000004`, en: `console.log(0.1 + 0.2); // 0.30000000000000004` },
      positions: {
        approx: { x: 25, y: 55, opacity: 0.5, scale: 0.85 },
        sum: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "approx", to: "sum", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "Final — bu Java'da da (double tipinde) AYNI şekilde olur; bu bir JS hatası değil, IEEE 754 standardının doğası. Doğru fiyat karşılaştırması: `Math.abs(a - b) < Number.EPSILON` veya `toFixed(2)` ile string karşılaştırması.",
        en: "Final — this happens IDENTICALLY in Java (with the double type); it is not a JS bug, it is the nature of the IEEE 754 standard. Correct price comparison: `Math.abs(a - b) < Number.EPSILON` or compare as strings via `toFixed(2)`.",
      },
      code: { tr: `console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true`, en: `console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true` },
      positions: {
        sum: { x: 25, y: 55, opacity: 0.4, scale: 0.8 },
        expected: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "sum", to: "expected", color: "#22c55e" }],
    },
  ],
}

// 🎬 5 — Array Metotları — .map()/.filter() immutable zincir vs .forEach() mutasyon
const jsMapFilterChainFilm = {
  type: "video-scene",
  id: "js-map-filter-chain-film",
  title: {
    tr: "🎬 .map() ve .filter() Zinciri: Orijinal Diziye Neden Hiç Dokunulmaz?",
    en: "🎬 The .map()/.filter() Chain: Why the Original Array Is Never Touched",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "original", emoji: "📋", label: { tr: "testResults (Orijinal)", en: "testResults (Original)" }, color: "#0ea5e9" },
    { id: "filterOp", emoji: "🔍", label: { tr: ".filter()",              en: ".filter()" },              color: "#f59e0b" },
    { id: "passedArr", emoji: "✨", label: { tr: "Yeni Dizi: passedTests", en: "New Array: passedTests" }, color: "#22c55e" },
    { id: "mapOp",     emoji: "🗺️", label: { tr: ".map()",                en: ".map()" },                  color: "#8b5cf6" },
    { id: "namesArr",  emoji: "🏷️", label: { tr: "Yeni Dizi: testNames",  en: "New Array: testNames" },   color: "#6366f1" },
    { id: "forEachGhost", emoji: "👻", label: { tr: "forEach + push (Mutasyon Riski)", en: "forEach + push (Mutation Risk)" }, color: "#ef4444" },
  ],
  scenes: [
    {
      caption: {
        tr: "`testResults` dizisi 3 test sonucu içeriyor: Login (passed), Payment (failed), Signup (passed). Bu diziyi filtrelemek ve isimlerini çıkarmak istiyoruz.",
        en: "`testResults` holds 3 test outcomes: Login (passed), Payment (failed), Signup (passed). We want to filter it and extract names.",
      },
      code: { tr: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n  { name: "Signup", status: "passed" }\n];`, en: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n  { name: "Signup", status: "passed" }\n];` },
      positions: { original: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "`.filter(test => test.status === \"passed\")` çağrılır. `testResults` HİÇ değişmez — filter, koşulu geçenleri kopyalayarak TAMAMEN YENİ bir dizi oluşturur.",
        en: "`.filter(test => test.status === \"passed\")` runs. `testResults` is NEVER changed — filter copies the matching items into a BRAND NEW array.",
      },
      code: { tr: `const passedTests = testResults.filter(t => t.status === "passed");`, en: `const passedTests = testResults.filter(t => t.status === "passed");` },
      positions: {
        original: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        filterOp: { x: 42, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: "original", to: "filterOp" }],
    },
    {
      caption: {
        tr: "Sonuç: `passedTests` — sadece Login ve Signup içeren YENİ ve BAĞIMSIZ bir dizi. `testResults` hâlâ orijinal 3 elemanıyla sapasağlam duruyor.",
        en: "Result: `passedTests` — a NEW, INDEPENDENT array containing only Login and Signup. `testResults` still stands intact with its original 3 elements.",
      },
      positions: {
        filterOp: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        passedArr: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "filterOp", to: "passedArr", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Şimdi `passedTests.map(t => t.name)` çağrılır — yine YENİ bir dizi doğar: `testNames`. Zincirleme (`.filter().map()`) her adımda önceki diziyi bozmadan yeni bir tanesini üretir.",
        en: "Now `passedTests.map(t => t.name)` runs — again giving birth to a NEW array: `testNames`. Chaining (`.filter().map()`) produces a fresh array at every step without breaking the previous one.",
      },
      code: { tr: `const testNames = passedTests.map(t => t.name);\n// ["Login", "Signup"]`, en: `const testNames = passedTests.map(t => t.name);\n// ["Login", "Signup"]` },
      positions: {
        passedArr: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        mapOp: { x: 44, y: 50, scale: 1.15, pulse: true },
        namesArr: { x: 68, y: 50, scale: 1.1 },
      },
      beams: [{ from: "passedArr", to: "mapOp" }, { from: "mapOp", to: "namesArr", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Kontrast — `forEach` ile aynı işi yapmaya çalışırsan dışarıdaki bir diziyi `.push()` ile MUTASYONA uğratman gerekir: bu, test kodunda paylaşılan veri üzerinde YAN ETKİ (side effect) riski taşır ve iki test paralel çalışırsa çakışabilir.",
        en: "Contrast — trying to do the same with `forEach` requires MUTATING an outer array via `.push()`: this carries a SIDE EFFECT risk on shared data in test code and can clash when two tests run in parallel.",
      },
      code: { tr: `const names = [];\ntestResults.forEach(t => names.push(t.name)); // mutasyon!`, en: `const names = [];\ntestResults.forEach(t => names.push(t.name)); // mutation!` },
      positions: {
        namesArr: { x: 30, y: 30, opacity: 0.5, scale: 0.85 },
        forEachGhost: { x: 30, y: 70, scale: 1.15, pulse: true },
      },
      beams: [{ from: "namesArr", to: "forEachGhost", color: "#ef4444" }],
    },
  ],
}

// 🎬 6 — Karar Yapıları & Döngüler — for + var + closure/setTimeout tuzağı
const jsLoopClosureTrapFilm = {
  type: "video-scene",
  id: "js-loop-closure-trap-film",
  title: {
    tr: "🎬 Neden Hepsi Son Değeri Yazdırıyor? — Döngü + var + Closure Tuzağı",
    en: "🎬 Why Do They All Print the Last Value? — The Loop + var + Closure Trap",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "loop",     emoji: "🔁", label: { tr: "for (var i = 0; i < 3; i++)", en: "for (var i = 0; i < 3; i++)" }, color: "#94a3b8" },
    { id: "sharedVar", emoji: "🪣", label: { tr: "Paylaşılan var i",     en: "Shared var i" },        color: "#ef4444" },
    { id: "timers",   emoji: "⏰", label: { tr: "3 setTimeout Çağrısı",  en: "3 setTimeout Calls" },   color: "#f59e0b" },
    { id: "wrongOut", emoji: "😱", label: { tr: "Çıktı: 3, 3, 3",        en: "Output: 3, 3, 3" },     color: "#ef4444" },
    { id: "letBinding", emoji: "📦", label: { tr: "let — Her Tur Kendi Kopyası", en: "let — Own Copy Per Iteration" }, color: "#0ea5e9" },
    { id: "rightOut", emoji: "✅", label: { tr: "Çıktı: 0, 1, 2",        en: "Output: 0, 1, 2" },     color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "Sık karşılaşılan bir 'gizemli bug': `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }` — geliştirici `0, 1, 2` bekler.",
        en: "A common 'mystery bug': `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }` — the developer expects `0, 1, 2`.",
      },
      code: { tr: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`, en: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}` },
      positions: { loop: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "`var` fonksiyon kapsamlıdır — döngünün 3 turu da AYNI `i` değişkenini PAYLAŞIR. Her `setTimeout` callback'i bu tek, paylaşılan kutuya bir REFERANS tutar, o anki değeri değil.",
        en: "`var` is function-scoped — all 3 loop iterations SHARE THE SAME `i` variable. Every `setTimeout` callback holds a REFERENCE to this one shared box, not the value at that moment.",
      },
      positions: {
        loop: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        sharedVar: { x: 44, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "loop", to: "sharedVar" }],
    },
    {
      caption: {
        tr: "3 `setTimeout` çağrısı Web API'ye devredilir. Bu sırada Call Stack senkron olarak döngüyü BİTİRİR ve `i` en son `3` değerine ulaşır — döngü koşulu `i < 3` artık YANLIŞ olduğu için durur.",
        en: "All 3 `setTimeout` calls are delegated to the Web API. Meanwhile the Call Stack synchronously FINISHES the loop and `i` reaches its final value of `3` — the loop stops once `i < 3` becomes FALSE.",
      },
      positions: {
        sharedVar: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        timers: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "sharedVar", to: "timers", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "100ms sonra 3 callback de tetiklenir — ama HEPSİ aynı paylaşılan kutuya bakıyor, ve o kutunun içinde artık `3` var. Sonuç: `3, 3, 3` — beklenmedik ve şaşırtıcı.",
        en: "After 100ms all 3 callbacks fire — but they ALL point to the same shared box, which now holds `3`. Result: `3, 3, 3` — unexpected and surprising.",
      },
      code: { tr: `// cikti: 3\n// cikti: 3\n// cikti: 3`, en: `// output: 3\n// output: 3\n// output: 3` },
      positions: {
        timers: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        wrongOut: { x: 55, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "timers", to: "wrongOut", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Kontrast — AYNI kodu `let i` ile yazarsan, `let` her döngü turunda YENİ ve BAĞIMSIZ bir `i` kopyası oluşturur. Her `setTimeout` kendi turunun değerini hatırlar.",
        en: "Contrast — write the SAME code with `let i` and `let` creates a NEW, INDEPENDENT copy of `i` on EVERY iteration. Each `setTimeout` remembers the value from its own turn.",
      },
      code: { tr: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`, en: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}` },
      positions: {
        wrongOut: { x: 20, y: 30, opacity: 0.4, scale: 0.8 },
        letBinding: { x: 50, y: 60, scale: 1.2, pulse: true },
      },
      beams: [{ from: "wrongOut", to: "letBinding", color: "#0ea5e9" }],
    },
    {
      caption: {
        tr: "Final — çıktı artık `0, 1, 2` — beklenen sıra. Bu yüzden CLAUDE.md kuralı gibi projeler `var`'ı yasaklar: asenkron kod içeren döngülerde `let` kullanmak bu klasik tuzağı baştan önler.",
        en: "Final — the output is now `0, 1, 2` — the expected sequence. This is why projects ban `var`: using `let` in loops containing async code prevents this classic trap from the start.",
      },
      positions: {
        letBinding: { x: 22, y: 55, opacity: 0.5, scale: 0.85 },
        rightOut: { x: 55, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: "letBinding", to: "rightOut", color: "#22c55e" }],
    },
  ],
}

// 🎬 7 — Event Loop & Asenkron Yapı — Call Stack → Web API → Callback Queue → Event Loop
const jsEventLoopFlowFilm = {
  type: "video-scene",
  id: "js-event-loop-flow-film",
  title: {
    tr: "🎬 A, D, C, B: Event Loop Sırasının Perde Arkası",
    en: "🎬 A, D, C, B: Behind the Scenes of Event Loop Ordering",
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "callStack", emoji: "📚", label: { tr: "Call Stack",           en: "Call Stack" },           color: "#0ea5e9" },
    { id: "webApi",    emoji: "🌐", label: { tr: "Web API",              en: "Web API" },              color: "#f59e0b" },
    { id: "microtask", emoji: "⚡", label: { tr: "Microtask Queue (Promise)", en: "Microtask Queue (Promise)" }, color: "#8b5cf6" },
    { id: "macrotask", emoji: "⏰", label: { tr: "Macrotask Queue (setTimeout)", en: "Macrotask Queue (setTimeout)" }, color: "#ef4444" },
    { id: "eventLoop", emoji: "🔁", label: { tr: "Event Loop",            en: "Event Loop" },           color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "Kod çalışır: `console.log(\"A\")`, `setTimeout(()=>console.log(\"B\"),0)`, `Promise.resolve().then(()=>console.log(\"C\"))`, `console.log(\"D\")`. Çıktı sırası ne olur?",
        en: "Code runs: `console.log(\"A\")`, `setTimeout(()=>console.log(\"B\"),0)`, `Promise.resolve().then(()=>console.log(\"C\"))`, `console.log(\"D\")`. What order prints?",
      },
      code: { tr: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");`, en: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");` },
      positions: { callStack: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Call Stack senkron kodu SIRAYLA çalıştırır: önce `\"A\"` basılır. `setTimeout` ise Web API'ye HAVALE edilir, Call Stack'i beklemez.",
        en: "Step 1 — the Call Stack runs synchronous code IN ORDER: `\"A\"` prints first. `setTimeout` is DELEGATED to the Web API and does not block the stack.",
      },
      positions: {
        callStack: { x: 16, y: 40, scale: 1.15, pulse: true },
        webApi: { x: 50, y: 70, scale: 1.1 },
      },
      beams: [{ from: "callStack", to: "webApi" }],
    },
    {
      caption: {
        tr: "Adım 2 — `Promise.resolve().then(...)` çağrılır: bu callback hemen Microtask Queue'ya konur (Call Stack'i bloklamaz). Ardından `console.log(\"D\")` senkron olarak çalışır ve `\"D\"` basılır.",
        en: "Step 2 — `Promise.resolve().then(...)` runs: its callback goes straight into the Microtask Queue (does not block the Call Stack). Then `console.log(\"D\")` runs synchronously and `\"D\"` prints.",
      },
      positions: {
        webApi: { x: 18, y: 70, opacity: 0.5, scale: 0.85 },
        microtask: { x: 46, y: 30, scale: 1.15, pulse: true },
        callStack: { x: 20, y: 40, scale: 1.05 },
      },
      beams: [{ from: "callStack", to: "microtask", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Adım 3 — Call Stack artık TAMAMEN boş: senkron kod (`A`, `D`) bitti. Event Loop kuralı gereği ÖNCE Microtask Queue tamamen boşaltılır — `\"C\"` basılır.",
        en: "Step 3 — the Call Stack is now COMPLETELY empty: synchronous code (`A`, `D`) is done. By Event Loop rule, the Microtask Queue is drained FIRST — `\"C\"` prints.",
      },
      positions: {
        microtask: { x: 20, y: 30, opacity: 0.5, scale: 0.85 },
        eventLoop: { x: 46, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "microtask", to: "eventLoop", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Adım 4 — Microtask Queue tamamen boşaldıktan SONRA Event Loop, Macrotask Queue'ya (`setTimeout` callback'i) bakar ve onu Call Stack'e sokar — `\"B\"` en son basılır.",
        en: "Step 4 — only AFTER the Microtask Queue is fully drained does the Event Loop check the Macrotask Queue (`setTimeout` callback) and push it into the Call Stack — `\"B\"` prints last.",
      },
      positions: {
        eventLoop: { x: 20, y: 55, opacity: 0.5, scale: 0.85 },
        macrotask: { x: 52, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "eventLoop", to: "macrotask", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Final — sıra kesinlikle `A → D → C → B`. Playwright'ta `await` unutulursa test kodu bu sırayı yanlış varsayar ve elementin daha hazır olmadığı bir anda assertion çalıştırır — klasik flaky test kaynağı.",
        en: "Final — the order is definitively `A → D → C → B`. In Playwright, forgetting `await` makes test code assume the wrong order and run an assertion before the element is actually ready — the classic flaky test source.",
      },
      code: { tr: `// cikti: A, D, C, B`, en: `// output: A, D, C, B` },
      positions: {
        macrotask: { x: 26, y: 55, opacity: 0.5, scale: 0.85 },
        callStack: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "macrotask", to: "callStack", color: "#22c55e" }],
    },
  ],
}

// 🎬 8 — Promises & Closures — Promise chain / async-await mikro görev sırası
const jsPromiseMicrotaskFilm = {
  type: "video-scene",
  id: "js-promise-microtask-film",
  title: {
    tr: "🎬 Bir Promise'in Üç Hali: Pending → Resolved/Rejected → then/catch",
    en: "🎬 The Three States of a Promise: Pending → Resolved/Rejected → then/catch",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "pending",  emoji: "⏳", label: { tr: "Pending (Bekliyor)",    en: "Pending" },              color: "#94a3b8" },
    { id: "resolve",  emoji: "✅", label: { tr: "resolve()",             en: "resolve()" },            color: "#22c55e" },
    { id: "reject",   emoji: "❌", label: { tr: "reject()",              en: "reject()" },             color: "#ef4444" },
    { id: "thenChain", emoji: "🔗", label: { tr: ".then() Zinciri",       en: ".then() Chain" },        color: "#0ea5e9" },
    { id: "catchBlock", emoji: "🪤", label: { tr: ".catch()",             en: ".catch()" },             color: "#f59e0b" },
    { id: "asyncAwait", emoji: "⌛", label: { tr: "async/await (Şeker)",  en: "async/await (Sugar)" },  color: "#8b5cf6" },
  ],
  scenes: [
    {
      caption: {
        tr: "`new Promise((resolve, reject) => {...})` çağrıldığında Promise `Pending` (beklemede) durumunda doğar — henüz ne başarılı ne başarısız.",
        en: "When `new Promise((resolve, reject) => {...})` is called, the Promise is born `Pending` — neither succeeded nor failed yet.",
      },
      code: { tr: `const iceCreamPromise = new Promise((resolve, reject) => {\n  // ... asenkron islem ...\n});`, en: `const iceCreamPromise = new Promise((resolve, reject) => {\n  // ... async work ...\n});` },
      positions: { pending: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "İşlem BAŞARILI olursa `resolve(value)` çağrılır: Promise artık `Fulfilled` durumuna geçer ve değeri taşır. Bu değer `.then()` callback'ine akıtılır.",
        en: "If the work SUCCEEDS, `resolve(value)` is called: the Promise moves to `Fulfilled` and carries the value. This value flows into the `.then()` callback.",
      },
      positions: {
        pending: { x: 18, y: 40, opacity: 0.5, scale: 0.85 },
        resolve: { x: 50, y: 30, scale: 1.2, pulse: true },
      },
      beams: [{ from: "pending", to: "resolve", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "İşlem BAŞARISIZ olursa `reject(error)` çağrılır: Promise `Rejected` durumuna geçer, hata `.catch()` bloğuna akıtılır — `.then()` bu durumda ATLANIR.",
        en: "If the work FAILS, `reject(error)` is called: the Promise moves to `Rejected`, and the error flows into `.catch()` — `.then()` is SKIPPED in this case.",
      },
      positions: {
        resolve: { x: 22, y: 30, opacity: 0.5, scale: 0.85 },
        reject: { x: 50, y: 70, scale: 1.2, pulse: true },
      },
      beams: [{ from: "pending", to: "reject", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "`.then(value => ...).then(next => ...)` ile zincirleme kurulur: her `.then()` bir önceki `.then()`'in döndürdüğü değeri alır — dominotaşı gibi sırayla akar.",
        en: "Chaining is built with `.then(value => ...).then(next => ...)`: each `.then()` receives the value returned by the previous one — flowing in sequence like dominoes.",
      },
      code: { tr: `iceCreamPromise\n  .then(flavor => pourCone(flavor))\n  .then(cone => addSprinkles(cone))\n  .catch(err => console.log("Hata:", err));`, en: `iceCreamPromise\n  .then(flavor => pourCone(flavor))\n  .then(cone => addSprinkles(cone))\n  .catch(err => console.log("Error:", err));` },
      positions: {
        resolve: { x: 22, y: 30, opacity: 0.4, scale: 0.8 },
        thenChain: { x: 50, y: 40, scale: 1.2, pulse: true },
        catchBlock: { x: 74, y: 60, scale: 1.05 },
      },
      beams: [{ from: "resolve", to: "thenChain", color: "#0ea5e9" }, { from: "thenChain", to: "catchBlock", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "Final — `async/await`, aynı `.then()` zincirini SENKRON görünümlü kodla yazmanı sağlayan sözdizim şekeridir (syntactic sugar). Perde arkasında yine aynı Promise mekanizması, Microtask Queue üzerinden çalışır.",
        en: "Final — `async/await` is syntactic sugar letting you write the SAME `.then()` chain as SYNCHRONOUS-looking code. Behind the curtain it is still the exact same Promise mechanism, running through the Microtask Queue.",
      },
      code: { tr: `async function makeIceCream() {\n  try {\n    const flavor = await iceCreamPromise;\n    const cone = await pourCone(flavor);\n  } catch (err) { console.log("Hata:", err); }\n}`, en: `async function makeIceCream() {\n  try {\n    const flavor = await iceCreamPromise;\n    const cone = await pourCone(flavor);\n  } catch (err) { console.log("Error:", err); }\n}` },
      positions: {
        thenChain: { x: 24, y: 40, opacity: 0.4, scale: 0.8 },
        asyncAwait: { x: 55, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "thenChain", to: "asyncAwait", color: "#8b5cf6" }],
    },
  ],
}

// 🎬 9 — Sınıflar, Modüller & JSON — class + this binding kaybı
const jsThisBindingFilm = {
  type: "video-scene",
  id: "js-this-binding-film",
  title: {
    tr: "🎬 this Kaybolunca: Bir Metodu Callback Olarak Geçirmenin Bedeli",
    en: "🎬 When this Gets Lost: The Cost of Passing a Method as a Callback",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "instance",   emoji: "🏛️", label: { tr: "new LoginPage()",      en: "new LoginPage()" },      color: "#0ea5e9" },
    { id: "directCall", emoji: "👉", label: { tr: "page.fillForm() — Normal Çağrı", en: "page.fillForm() — Direct Call" }, color: "#22c55e" },
    { id: "thisOk",     emoji: "✅", label: { tr: "this === page",         en: "this === page" },        color: "#22c55e" },
    { id: "refCopy",    emoji: "📎", label: { tr: "const fn = page.fillForm", en: "const fn = page.fillForm" }, color: "#f59e0b" },
    { id: "standalone", emoji: "⚠️", label: { tr: "fn() — Bağlamsız Çağrı", en: "fn() — Standalone Call" }, color: "#ef4444" },
    { id: "thisLost",   emoji: "💥", label: { tr: "this === undefined",    en: "this === undefined" },   color: "#ef4444" },
    { id: "arrowFix",   emoji: "🏹", label: { tr: "Arrow / .bind(page) ile Çözüm", en: "Fix with Arrow / .bind(page)" }, color: "#8b5cf6" },
  ],
  scenes: [
    {
      caption: {
        tr: "`const page = new LoginPage();` ile bir nesne örneği oluşturulur. `page.fillForm(...)` NORMAL şekilde çağrıldığında `this`, `page` nesnesinin KENDİSİNİ işaret eder.",
        en: "`const page = new LoginPage();` creates an object instance. When `page.fillForm(...)` is called NORMALLY, `this` points to the `page` object ITSELF.",
      },
      code: { tr: `const page = new LoginPage();\npage.fillForm("hasan", "secret"); // calisir`, en: `const page = new LoginPage();\npage.fillForm("hasan", "secret"); // works` },
      positions: {
        instance: { x: 28, y: 40, scale: 1.1 },
        directCall: { x: 60, y: 40, scale: 1.1, pulse: true },
      },
      beams: [{ from: "instance", to: "directCall" }],
    },
    {
      caption: {
        tr: "`this.url` gibi ifadeler doğru çalışır çünkü çağrı `page.fillForm(...)` NOKTA (dot) ile yapıldı — JS bu noktayı gördüğünde `this`'i çağıran nesneye bağlar.",
        en: "Expressions like `this.url` work correctly because the call `page.fillForm(...)` used the DOT — JS binds `this` to the calling object when it sees that dot.",
      },
      positions: {
        directCall: { x: 22, y: 40, opacity: 0.6, scale: 0.9 },
        thisOk: { x: 55, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: "directCall", to: "thisOk", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Kontrast — metodu bir callback olarak geçirmek için `const fn = page.fillForm;` yazılır. Bu, fonksiyonu nesneden KOPARIR — sadece fonksiyon referansı taşınır, nesne bağlantısı GİTMEZ.",
        en: "Contrast — to pass the method as a callback, `const fn = page.fillForm;` is written. This DETACHES the function from the object — only the function reference travels, the object connection is LOST.",
      },
      code: { tr: `const fn = page.fillForm;\nbutton.addEventListener('click', fn); // this baglanti koptu!`, en: `const fn = page.fillForm;\nbutton.addEventListener('click', fn); // this connection lost!` },
      positions: {
        thisOk: { x: 20, y: 30, opacity: 0.4, scale: 0.8 },
        refCopy: { x: 50, y: 60, scale: 1.15, pulse: true },
      },
      beams: [{ from: "thisOk", to: "refCopy", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "`fn()` NOKTASIZ çağrıldığında (örneğin bir event listener içinde) JS artık hangi nesneye bağlanacağını BİLMEZ — `this` `undefined` olur ve `this.name` erişimi `TypeError` fırlatır.",
        en: "When `fn()` is called WITHOUT a dot (e.g. inside an event listener), JS no longer KNOWS which object to bind to — `this` becomes `undefined` and accessing `this.name` throws a `TypeError`.",
      },
      positions: {
        refCopy: { x: 22, y: 45, opacity: 0.5, scale: 0.85 },
        standalone: { x: 50, y: 45, scale: 1.15, pulse: true },
        thisLost: { x: 76, y: 65, scale: 1.1 },
      },
      beams: [{ from: "refCopy", to: "standalone", color: "#ef4444" }, { from: "standalone", to: "thisLost", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Final — çözüm: `fn.bind(page)` ile `this`'i kalıcı olarak bağlamak, veya çağrıyı bir arrow function içine sarmak (`() => page.fillForm(...)`), çünkü arrow function KENDİ `this`'ini oluşturmaz, çevresinden DEVRALIR.",
        en: "Final — the fix: permanently bind `this` with `fn.bind(page)`, or wrap the call in an arrow function (`() => page.fillForm(...)`), because arrow functions do NOT create their own `this` — they INHERIT it from their surroundings.",
      },
      code: { tr: `button.addEventListener('click', () => page.fillForm("hasan","secret"));`, en: `button.addEventListener('click', () => page.fillForm("hasan","secret"));` },
      positions: {
        thisLost: { x: 24, y: 60, opacity: 0.4, scale: 0.8 },
        arrowFix: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "thisLost", to: "arrowFix", color: "#8b5cf6" }],
    },
  ],
}

// 🎬 10 — Gerçek Hayat QA & DOM — bir Playwright/Selenium testinin arkasındaki DOM sorgu akışı
const jsDomQueryTestFilm = {
  type: "video-scene",
  id: "js-dom-query-test-film",
  title: {
    tr: "🎬 page.click() Yazınca Arka Planda DOM Nasıl Sorgulanır?",
    en: "🎬 What Happens to the DOM When You Write page.click()?",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "testCode", emoji: "🧪", label: { tr: "Test Kodu",             en: "Test Code" },            color: "#0ea5e9" },
    { id: "locator",  emoji: "🎯", label: { tr: "page.locator(selector)", en: "page.locator(selector)" }, color: "#f59e0b" },
    { id: "domTree",  emoji: "🌳", label: { tr: "DOM Ağacı",             en: "DOM Tree" },             color: "#8b5cf6" },
    { id: "queryEngine", emoji: "🔍", label: { tr: "querySelector Motoru", en: "querySelector Engine" }, color: "#6366f1" },
    { id: "matchedEl", emoji: "✅", label: { tr: "Bulunan Element",       en: "Matched Element" },      color: "#22c55e" },
    { id: "clickAction", emoji: "🖱️", label: { tr: ".click()",             en: ".click()" },            color: "#10b981" },
  ],
  scenes: [
    {
      caption: {
        tr: "Test kodun `document.querySelectorAll('.product-card')` çağırır — perde arkasında tarayıcı, canlı DOM ağacını taramaya başlar.",
        en: "Your test code calls `document.querySelectorAll('.product-card')` — behind the curtain, the browser starts scanning the live DOM tree.",
      },
      code: { tr: `const items = document.querySelectorAll('.product-card');`, en: `const items = document.querySelectorAll('.product-card');` },
      positions: { testCode: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "Selector `.product-card`, tarayıcının querySelector motoruna İLETİLİR. Bu, CSS selector kurallarıyla eşleşen elementleri arayan bir eşleştirme motorudur.",
        en: "The selector `.product-card` is HANDED to the browser's querySelector engine. This is a matching engine that searches for elements matching CSS selector rules.",
      },
      positions: {
        testCode: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        locator: { x: 42, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: "testCode", to: "locator" }],
    },
    {
      caption: {
        tr: "Motor DOM ağacını yukarıdan aşağıya (veya optimize edilmiş bir yol) TARAR — her düğümün class, id, attribute'larını kontrol eder. `NodeList` (Array DEĞİL!) olarak eşleşen sonuçları toplar.",
        en: "The engine SCANS the DOM tree top-down (or via an optimized path) — checking each node's class, id, and attributes. It collects matches as a `NodeList` (NOT an Array!).",
      },
      positions: {
        locator: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        domTree: { x: 44, y: 30, scale: 1.15 },
        queryEngine: { x: 44, y: 70, scale: 1.15, pulse: true },
      },
      beams: [{ from: "locator", to: "domTree" }, { from: "domTree", to: "queryEngine" }],
    },
    {
      caption: {
        tr: "Eşleşen elementler bulunur ve `items` değişkenine döner. `Array.from(items).map(...)` ile bu NodeList, gerçek bir Array'e çevrilerek `.map()`/`.filter()` gibi metotlarla işlenebilir hale gelir.",
        en: "Matching elements are found and returned into `items`. `Array.from(items).map(...)` converts this NodeList into a real Array so it can be processed with `.map()`/`.filter()`.",
      },
      code: { tr: `const priceArr = Array.from(items).map(item => item.dataset.price);`, en: `const priceArr = Array.from(items).map(item => item.dataset.price);` },
      positions: {
        queryEngine: { x: 22, y: 60, opacity: 0.5, scale: 0.85 },
        matchedEl: { x: 55, y: 60, scale: 1.2, pulse: true },
      },
      beams: [{ from: "queryEngine", to: "matchedEl", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Final — Playwright/Selenium'daki `page.click(selector)` da AYNI mekanizmayı kullanır: önce element DOM'da bulunur, GÖRÜNÜR/tıklanabilir olduğu doğrulanır, sonra fiziksel bir click event tetiklenir. Element bulunamazsa timeout hatası fırlatılır.",
        en: "Final — Playwright/Selenium's `page.click(selector)` uses the EXACT SAME mechanism: the element is found in the DOM first, verified as visible/clickable, then a physical click event fires. If not found, a timeout error is thrown.",
      },
      positions: {
        matchedEl: { x: 24, y: 60, opacity: 0.5, scale: 0.85 },
        clickAction: { x: 58, y: 60, scale: 1.25, pulse: true },
      },
      beams: [{ from: "matchedEl", to: "clickAction", color: "#10b981" }],
    },
  ],
}

// 🎬 11 — Ekosistem & Araçlar — npm bağımlılık çözümleme (dependency resolution) akışı
const jsNpmDependencyResolveFilm = {
  type: "video-scene",
  id: "js-npm-dependency-resolve-film",
  title: {
    tr: "🎬 npm install Yazınca: Bağımlılık Ağacının Çözülmesi",
    en: "🎬 What npm install Really Does: Resolving the Dependency Tree",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "pkgJson",  emoji: "📋", label: { tr: "package.json",         en: "package.json" },        color: "#0ea5e9" },
    { id: "registry", emoji: "☁️", label: { tr: "npm Registry",          en: "npm Registry" },        color: "#f59e0b" },
    { id: "depTree",  emoji: "🌲", label: { tr: "Bağımlılık Ağacı",       en: "Dependency Tree" },     color: "#8b5cf6" },
    { id: "lockFile", emoji: "🔒", label: { tr: "package-lock.json",      en: "package-lock.json" },   color: "#6366f1" },
    { id: "nodeModules", emoji: "📁", label: { tr: "node_modules",         en: "node_modules" },        color: "#22c55e" },
    { id: "ciGhost",  emoji: "⚠️", label: { tr: "Kilitsiz Kurulum Riski", en: "Unlocked Install Risk" }, color: "#ef4444" },
  ],
  scenes: [
    {
      caption: {
        tr: "`npm install` çalıştırılır. npm önce `package.json`'daki `dependencies`/`devDependencies` listesini OKUR: örneğin `@playwright/test: ^1.48.0`.",
        en: "`npm install` runs. npm first READS the `dependencies`/`devDependencies` list in `package.json`: e.g. `@playwright/test: ^1.48.0`.",
      },
      code: { tr: `npm install`, en: `npm install` },
      positions: { pkgJson: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "npm, npm Registry'ye (bulut deposu) BAĞLANIR ve `@playwright/test` paketini ister. Ama bu paketin de KENDİ bağımlılıkları vardır (örn. playwright-core) — onlar da istenir.",
        en: "npm CONNECTS to the npm Registry (cloud repository) and requests `@playwright/test`. But that package has its OWN dependencies too (e.g. playwright-core) — those are requested as well.",
      },
      positions: {
        pkgJson: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        registry: { x: 44, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: "pkgJson", to: "registry" }],
    },
    {
      caption: {
        tr: "npm bu iç içe bağımlılıkları (bağımlılığın bağımlılığının bağımlılığı...) çözerek dallanan bir AĞAÇ oluşturur — hangi paketin hangi versiyonu gerektiğini hesaplar, çakışmaları uzlaştırır.",
        en: "npm resolves these nested dependencies (a dependency's dependency's dependency...) into a branching TREE — computing which package needs which version, reconciling conflicts.",
      },
      positions: {
        registry: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        depTree: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "registry", to: "depTree", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Bu çözülmüş ağaç `package-lock.json`'a TAM sürüm numaralarıyla YAZILIR — bu, herkesin AYNI paket versiyonlarını kurmasını garanti eder (deterministik kurulum).",
        en: "This resolved tree is WRITTEN to `package-lock.json` with EXACT version numbers — this guarantees everyone installs the SAME package versions (deterministic install).",
      },
      positions: {
        depTree: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        lockFile: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "depTree", to: "lockFile", color: "#6366f1" }],
    },
    {
      caption: {
        tr: "Final — tüm paketler `node_modules` klasörüne İNDİRİLİR. Kontrast: `package-lock.json` yoksa veya git'e commit'lenmediyse, farklı geliştiriciler farklı alt-sürümler kurabilir — klasik 'bende çalışıyor, CI'da çalışmıyor' hatası.",
        en: "Final — all packages are DOWNLOADED into `node_modules`. Contrast: without a committed `package-lock.json`, different developers can install different sub-versions — the classic 'works on my machine, fails in CI' bug.",
      },
      code: { tr: `npm ci   # lock dosyasindan birebir, deterministik kurulum`, en: `npm ci   # exact, deterministic install from the lock file` },
      positions: {
        lockFile: { x: 20, y: 40, opacity: 0.5, scale: 0.85 },
        nodeModules: { x: 50, y: 55, scale: 1.2, pulse: true },
        ciGhost: { x: 76, y: 30, scale: 0.9 },
      },
      beams: [{ from: "lockFile", to: "nodeModules", color: "#22c55e" }],
    },
  ],
}

// 🎬 12 — Hatalar & Debugging — try/catch + stack trace okuma akışı
const jsTryCatchStacktraceFilm = {
  type: "video-scene",
  id: "js-try-catch-stacktrace-film",
  title: {
    tr: "🎬 Bir Hata Fırlatıldığında: try/catch ve Stack Trace'in Yolculuğu",
    en: "🎬 When an Error is Thrown: The Journey Through try/catch and the Stack Trace",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "tryBlock",  emoji: "🛡️", label: { tr: "try { ... }",          en: "try { ... }" },          color: "#0ea5e9" },
    { id: "riskyCall", emoji: "⚠️", label: { tr: "Riskli Çağrı",          en: "Risky Call" },           color: "#f59e0b" },
    { id: "errorThrown", emoji: "💥", label: { tr: "Exception Fırlatıldı", en: "Exception Thrown" },    color: "#ef4444" },
    { id: "catchBlock", emoji: "🧤", label: { tr: "catch (e)",            en: "catch (e)" },            color: "#8b5cf6" },
    { id: "stackTrace", emoji: "📜", label: { tr: "Stack Trace",          en: "Stack Trace" },          color: "#6366f1" },
    { id: "finallyBlock", emoji: "🔚", label: { tr: "finally { ... }",     en: "finally { ... }" },      color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "Bir Playwright testinde `JSON.parse(rawJson)` çağrılır ama `rawJson` bozuk bir string olabilir. `try` bloğu bu riski KUŞATIR.",
        en: "In a Playwright test, `JSON.parse(rawJson)` is called but `rawJson` might be malformed. The `try` block WRAPS this risk.",
      },
      code: { tr: `try {\n  const testData = JSON.parse(rawJson);\n} catch (e) {\n  console.log("Parse hatasi:", e.message);\n}`, en: `try {\n  const testData = JSON.parse(rawJson);\n} catch (e) {\n  console.log("Parse error:", e.message);\n}` },
      positions: { tryBlock: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "`try` bloğu içindeki riskli çağrı çalışır — bozuk JSON parse EDİLMEYE çalışılır. Motor sözdizimini kontrol eder ve GEÇERSİZ olduğunu tespit eder.",
        en: "The risky call inside `try` runs — malformed JSON is ATTEMPTED to be parsed. The engine checks the syntax and detects it is INVALID.",
      },
      positions: {
        tryBlock: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        riskyCall: { x: 44, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: "tryBlock", to: "riskyCall" }],
    },
    {
      caption: {
        tr: "Bir `SyntaxError` nesnesi FIRLATILIR (throw). Bu an, kodun normal akışını KESER — hatanın fırlatıldığı satırdan itibaren bir Stack Trace oluşmaya başlar.",
        en: "A `SyntaxError` object is THROWN. This moment INTERRUPTS normal code flow — a Stack Trace starts forming from the line where the error was thrown.",
      },
      positions: {
        riskyCall: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        errorThrown: { x: 46, y: 30, scale: 1.2, pulse: true },
        stackTrace: { x: 74, y: 55, scale: 1.05 },
      },
      beams: [{ from: "riskyCall", to: "errorThrown", color: "#ef4444" }, { from: "errorThrown", to: "stackTrace", color: "#6366f1" }],
    },
    {
      caption: {
        tr: "Hata, `catch (e)` bloğu tarafından YAKALANIR — `e.message` okunabilir bir açıklama taşır, `e.stack` ise hatanın hangi fonksiyon zincirinden geçtiğini satır satır gösterir.",
        en: "The error is CAUGHT by the `catch (e)` block — `e.message` carries a readable description, while `e.stack` shows line-by-line which function chain the error passed through.",
      },
      positions: {
        errorThrown: { x: 22, y: 30, opacity: 0.5, scale: 0.85 },
        catchBlock: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "errorThrown", to: "catchBlock", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Final — `catch` bloğu çalışsın ya da çalışmasın, `finally` bloğu HER ZAMAN çalışır: örneğin bir tarayıcıyı kapatmak veya test raporuna sonucu kaydetmek için idealdir. `catch` olmadan fırlatılan hata testi ÇÖKERTİR.",
        en: "Final — whether `catch` runs or not, `finally` ALWAYS runs: ideal for closing a browser or logging the test result. An uncaught error CRASHES the test.",
      },
      code: { tr: `finally {\n  console.log("Test temizligi tamamlandi.");\n}`, en: `finally {\n  console.log("Test cleanup complete.");\n}` },
      positions: {
        catchBlock: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        finallyBlock: { x: 56, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "catchBlock", to: "finallyBlock", color: "#22c55e" }],
    },
  ],
}

// 🎬 13 — DOM Olayları — event bubbling/capturing akışı
const jsEventBubblingFilm = {
  type: "video-scene",
  id: "js-event-bubbling-film",
  title: {
    tr: "🎬 Bir Tıklama Nereye Gider? — Capturing ve Bubbling Fazları",
    en: "🎬 Where Does a Click Go? — The Capturing and Bubbling Phases",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "docRoot",  emoji: "📄", label: { tr: "document",             en: "document" },             color: "#94a3b8" },
    { id: "parentDiv", emoji: "📦", label: { tr: "Parent <div>",          en: "Parent <div>" },         color: "#0ea5e9" },
    { id: "childBtn", emoji: "🔘", label: { tr: "Child <button>",        en: "Child <button>" },       color: "#f59e0b" },
    { id: "captureFlow", emoji: "⬇️", label: { tr: "Capturing Fazı",       en: "Capturing Phase" },      color: "#8b5cf6" },
    { id: "bubbleFlow", emoji: "⬆️", label: { tr: "Bubbling Fazı",        en: "Bubbling Phase" },       color: "#22c55e" },
    { id: "stopped",  emoji: "🛑", label: { tr: "stopPropagation()",     en: "stopPropagation()" },    color: "#ef4444" },
  ],
  scenes: [
    {
      caption: {
        tr: "Kullanıcı `<div>` içindeki `<button>`'a TIKLAR. Bu tek tıklama, aslında `document`'tan başlayıp element ağacında İKİ yönde seyahat eden bir yolculuktur.",
        en: "The user CLICKS a `<button>` inside a `<div>`. This single click is actually a journey starting from `document`, traveling in TWO directions through the element tree.",
      },
      code: { tr: `const btn = document.querySelector('#submit-btn');`, en: `const btn = document.querySelector('#submit-btn');` },
      positions: {
        docRoot: { x: 20, y: 30, scale: 1.05 },
        parentDiv: { x: 40, y: 50, scale: 1.05 },
        childBtn: { x: 60, y: 70, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: "Adım 1 — Capturing Fazı: event ÖNCE en üstten (`document`) aşağıya, hedefe doğru İNER: `document → parentDiv → childBtn`. Bu faz genellikle görünmezdir, çoğu kod bunu dinlemez.",
        en: "Step 1 — Capturing Phase: the event goes DOWN from the top (`document`) toward the target FIRST: `document → parentDiv → childBtn`. This phase is usually invisible; most code doesn't listen for it.",
      },
      positions: {
        docRoot: { x: 20, y: 30, scale: 1.1, pulse: true },
        captureFlow: { x: 45, y: 50, scale: 1.15 },
        childBtn: { x: 65, y: 70, scale: 1.05 },
      },
      beams: [{ from: "docRoot", to: "captureFlow" }, { from: "captureFlow", to: "childBtn" }],
    },
    {
      caption: {
        tr: "Adım 2 — Hedef Fazı: event, gerçek hedefi olan `childBtn`'e ULAŞIR ve oradaki click handler ÇALIŞIR (örn. form submit tetiklenir).",
        en: "Step 2 — Target Phase: the event REACHES its actual target, `childBtn`, and its click handler RUNS (e.g. triggering a form submit).",
      },
      positions: {
        captureFlow: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        childBtn: { x: 55, y: 60, scale: 1.25, pulse: true },
      },
      beams: [{ from: "captureFlow", to: "childBtn", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "Adım 3 — Bubbling Fazı: event şimdi TERSİNE dönerek hedeften yukarı doğru KABARCIK gibi yükselir: `childBtn → parentDiv → document`. `parentDiv` üzerine bir click listener eklendiyse, o da TETİKLENİR!",
        en: "Step 3 — Bubbling Phase: the event now reverses, BUBBLING UP from the target: `childBtn → parentDiv → document`. If `parentDiv` has a click listener, it TRIGGERS too!",
      },
      positions: {
        childBtn: { x: 24, y: 70, opacity: 0.6, scale: 0.9 },
        bubbleFlow: { x: 48, y: 50, scale: 1.2, pulse: true },
        parentDiv: { x: 70, y: 30, scale: 1.1 },
      },
      beams: [{ from: "childBtn", to: "bubbleFlow", color: "#22c55e" }, { from: "bubbleFlow", to: "parentDiv", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Final — Kontrast: `event.stopPropagation()` çağrılırsa yükseliş yarıda KESİLİR — üstteki parent listener'lar TETİKLENMEZ. Test otomasyonunda beklenmedik çift-tetiklenen event'lerin sebebi genelde bubbling'in fark edilmemesidir.",
        en: "Final — Contrast: calling `event.stopPropagation()` CUTS the bubbling short — parent listeners above do NOT trigger. In test automation, unexpectedly double-firing events are usually caused by not noticing bubbling.",
      },
      positions: {
        bubbleFlow: { x: 26, y: 50, opacity: 0.5, scale: 0.85 },
        stopped: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "bubbleFlow", to: "stopped", color: "#ef4444" }],
    },
  ],
}

// 🎬 14 — Tarih & Zaman — Date ay indeksinin 0-based olması tuzağı
const jsDateMonthIndexFilm = {
  type: "video-scene",
  id: "js-date-month-index-film",
  title: {
    tr: "🎬 new Date(2025, 5, 1) Neden Temmuz Değil, Haziran'ı Gösteriyor... ya da Tam Tersi?",
    en: "🎬 Why Does new Date(2025, 5, 1) Show June, Not July... or the Reverse?",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "dateCall", emoji: "📅", label: { tr: "new Date(2025, 5, 1)",  en: "new Date(2025, 5, 1)" }, color: "#0ea5e9" },
    { id: "monthArg", emoji: "5️⃣", label: { tr: "Ay Argümanı: 5",        en: "Month Argument: 5" },    color: "#f59e0b" },
    { id: "zeroIndex", emoji: "🔢", label: { tr: "0-Based İndeks (0=Ocak)", en: "0-Based Index (0=Jan)" }, color: "#8b5cf6" },
    { id: "wrongExpect", emoji: "❌", label: { tr: "Yanlış Beklenti: Haziran", en: "Wrong Expectation: June" }, color: "#ef4444" },
    { id: "realResult", emoji: "✅", label: { tr: "Gerçek Sonuç: Haziran (index 5)", en: "Actual Result: June (index 5)" }, color: "#22c55e" },
    { id: "ciFail",   emoji: "🚨", label: { tr: "CI'da Kırmızı Test",     en: "Red Test in CI" },       color: "#ef4444" },
  ],
  scenes: [
    {
      caption: {
        tr: "Bir test verisi hazırlanır: `new Date(2025, 5, 1)`. Geliştirici '5. ay = Mayıs' diye düşünür ama JavaScript'in Date API'sinde ay parametresi 0-BASED'dir.",
        en: "A test fixture is prepared: `new Date(2025, 5, 1)`. The developer thinks '5th month = May' but JavaScript's Date API month parameter is 0-BASED.",
      },
      code: { tr: `const created = new Date(2025, 5, 1);`, en: `const created = new Date(2025, 5, 1);` },
      positions: { dateCall: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "İkinci argüman `5` doğrudan bir ay ismi DEĞİL, 0'dan başlayan bir İNDEKSTİR: `0=Ocak, 1=Şubat, 2=Mart, 3=Nisan, 4=Mayıs, 5=Haziran...`",
        en: "The second argument `5` is NOT a direct month name — it's a ZERO-based INDEX: `0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May, 5=June...`",
      },
      positions: {
        dateCall: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        monthArg: { x: 42, y: 40, scale: 1.15, pulse: true },
        zeroIndex: { x: 68, y: 60, scale: 1.1 },
      },
      beams: [{ from: "dateCall", to: "monthArg" }, { from: "monthArg", to: "zeroIndex", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "Geliştiricinin ZİHNİNDEKİ beklenti '5 = Mayıs'tır — sezgisel olarak insan sayma sistemine göre düşünür (1=Ocak). Bu yanlış varsayım test verisinde YANLIŞ bir tarih üretir.",
        en: "The developer's MENTAL expectation is '5 = May' — intuitively thinking in human counting (1=Jan). This wrong assumption produces the WRONG date in test fixtures.",
      },
      positions: {
        zeroIndex: { x: 20, y: 60, opacity: 0.5, scale: 0.85 },
        wrongExpect: { x: 52, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: "zeroIndex", to: "wrongExpect", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Gerçekte `new Date(2025, 5, 1).getMonth()` çağrıldığında `5` döner ve bu HAZİRAN'DIR (index 5 = 6. ay). Bir test 'Mayıs ayı içinde oluşturulan kayıt' assertion'ı yazmışsa, bu test YANLIŞ tarih üzerinde çalışıyor demektir.",
        en: "In reality, calling `new Date(2025, 5, 1).getMonth()` returns `5`, and that IS JUNE (index 5 = the 6th month). If a test asserts 'record created in May', that test is running against the WRONG date.",
      },
      code: { tr: `console.log(created.getMonth()); // 5 -> Haziran, Mayis DEGIL!`, en: `console.log(created.getMonth()); // 5 -> June, NOT May!` },
      positions: {
        wrongExpect: { x: 24, y: 40, opacity: 0.5, scale: 0.85 },
        realResult: { x: 56, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "wrongExpect", to: "realResult", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Final — bu tuzak CI pipeline'da bir ay farklı beklenen assertion olarak ortaya çıkar: `expect(date.getMonth()).toBe(5)` şeklinde YAZILMASI gerekirken geliştirici `toBe(6)` yazmıştır. Güvenli çözüm: ay isimlerini sabit (`const JUNE = 5`) tanımlamak veya `date-fns`/`Luxon` gibi kütüphaneler kullanmak.",
        en: "Final — this trap surfaces in CI as an off-by-one-month assertion: it should be written `expect(date.getMonth()).toBe(5)` but the developer wrote `toBe(6)`. Safe fix: define named month constants (`const JUNE = 5`) or use libraries like `date-fns`/`Luxon`.",
      },
      positions: {
        realResult: { x: 22, y: 55, opacity: 0.5, scale: 0.85 },
        ciFail: { x: 56, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "realResult", to: "ciFail", color: "#ef4444" }],
    },
  ],
}

// 🎬 15 — RegExp — global flag (g) ve lastIndex durum tuzağı
const jsRegexLastIndexFilm = {
  type: "video-scene",
  id: "js-regex-lastindex-film",
  title: {
    tr: "🎬 Aynı Regex'i İkinci Kez Kullanınca Neden Sonuç Değişir? — lastIndex Tuzağı",
    en: "🎬 Why Does the Same Regex Give a Different Result the Second Time? — The lastIndex Trap",
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "regexObj", emoji: "🔤", label: { tr: "/\\d+/g (global flag)", en: "/\\d+/g (global flag)" }, color: "#0ea5e9" },
    { id: "testCall1", emoji: "1️⃣", label: { tr: ".test() — 1. Çağrı",   en: ".test() — 1st Call" },   color: "#f59e0b" },
    { id: "lastIndex", emoji: "📍", label: { tr: "lastIndex Güncellendi",  en: "lastIndex Updated" },    color: "#8b5cf6" },
    { id: "testCall2", emoji: "2️⃣", label: { tr: ".test() — 2. Çağrı",   en: ".test() — 2nd Call" },   color: "#ef4444" },
    { id: "falseResult", emoji: "❌", label: { tr: "Beklenmedik: false",   en: "Unexpected: false" },    color: "#ef4444" },
    { id: "fixReset",  emoji: "✅", label: { tr: "match() veya Yeni Regex", en: "match() or New Regex" }, color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "`const emailRegex = /\\d+/g;` — `g` (global) flag'i ile tanımlanan bir regex nesnesi, HER ARAMADAN sonra bir DURUM (state) tutar: `lastIndex`.",
        en: "`const emailRegex = /\\d+/g;` — a regex defined with the `g` (global) flag carries STATE after EVERY search: `lastIndex`.",
      },
      code: { tr: `const digitRegex = /\\d+/g;\nconsole.log(digitRegex.test("Kod: 404")); // true`, en: `const digitRegex = /\\d+/g;\nconsole.log(digitRegex.test("Code: 404")); // true` },
      positions: { regexObj: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "İlk `.test(\"Kod: 404\")` çağrısı `true` döner VE regex nesnesinin `lastIndex` özelliğini eşleşmenin BİTTİĞİ pozisyona (7) günceller — bu, klasik regex motorlarında olmayan bir davranıştır.",
        en: "The first `.test(\"Code: 404\")` call returns `true` AND updates the regex object's `lastIndex` property to the position WHERE the match ended (7) — a behavior most classic regex engines don't have.",
      },
      positions: {
        regexObj: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        testCall1: { x: 42, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: "regexObj", to: "testCall1" }],
    },
    {
      caption: {
        tr: "`lastIndex` artık `7` değerini TAŞIR — bu, AYNI regex nesnesinin bir sonraki aramaya nereden BAŞLAYACAĞINI belirler; sıfırdan değil, kaldığı yerden devam eder.",
        en: "`lastIndex` now CARRIES the value `7` — this determines where the SAME regex object will START its next search; not from zero, but from where it left off.",
      },
      positions: {
        testCall1: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        lastIndex: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "testCall1", to: "lastIndex", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "AYNI `digitRegex` nesnesiyle AYNI string üzerinde İKİNCİ kez `.test(\"Kod: 404\")` çağrılır — ama bu sefer arama pozisyon `7`'den başlar, yani string'in sonuna yakın bir yerden. Rakam bulunamaz.",
        en: "Calling `.test(\"Code: 404\")` a SECOND time on the SAME string with the SAME `digitRegex` object — but this time the search starts at position `7`, near the end of the string. No digit is found there.",
      },
      code: { tr: `console.log(digitRegex.test("Kod: 404")); // false (!)`, en: `console.log(digitRegex.test("Code: 404")); // false (!)` },
      positions: {
        lastIndex: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        testCall2: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "lastIndex", to: "testCall2", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Sonuç `false` — aynı string, aynı regex, ama SONUÇ FARKLI! Bu, bir `if (regex.test(x))` içinde aynı regex'i tekrar kullanan validation kodlarında SESSİZ bir bug kaynağıdır.",
        en: "Result `false` — same string, same regex, but a DIFFERENT RESULT! This is a SILENT bug source in validation code that reuses the same regex inside repeated `if (regex.test(x))` checks.",
      },
      positions: {
        testCall2: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        falseResult: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "testCall2", to: "falseResult", color: "#ef4444" }],
    },
    {
      caption: {
        tr: "Final — çözüm: `g` flag'i gereksizse kaldır, veya `str.match(/\\d+/g)` gibi durumsuz (stateless) bir metot kullan, ya da her aramadan önce `regex.lastIndex = 0` ile SIFIRLA.",
        en: "Final — the fix: remove the `g` flag if unnecessary, or use a stateless method like `str.match(/\\d+/g)`, or RESET with `regex.lastIndex = 0` before every search.",
      },
      code: { tr: `digitRegex.lastIndex = 0; // guvenli sifirlama`, en: `digitRegex.lastIndex = 0; // safe reset` },
      positions: {
        falseResult: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        fixReset: { x: 56, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "falseResult", to: "fixReset", color: "#22c55e" }],
    },
  ],
}

// 🎬 16 — Set & Map — dedupe + insertion order akışı
const jsSetMapFlowFilm = {
  type: "video-scene",
  id: "js-set-map-flow-film",
  title: {
    tr: "🎬 Bir Set Tekrarları Nasıl Yutar, Bir Map Sırayı Nasıl Korur?",
    en: "🎬 How a Set Swallows Duplicates and a Map Preserves Order",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "rawArray", emoji: "📋", label: { tr: "rawLogs (Tekrarlı)",     en: "rawLogs (Duplicated)" }, color: "#94a3b8" },
    { id: "setStruct", emoji: "🎯", label: { tr: "new Set(rawLogs)",       en: "new Set(rawLogs)" },     color: "#0ea5e9" },
    { id: "dedupedArr", emoji: "✨", label: { tr: "Benzersiz Dizi",         en: "Unique Array" },         color: "#22c55e" },
    { id: "mapStruct", emoji: "🗺️", label: { tr: "new Map()",              en: "new Map()" },            color: "#8b5cf6" },
    { id: "insertOrder", emoji: "🔢", label: { tr: "Ekleme Sırası Korunur", en: "Insertion Order Preserved" }, color: "#f59e0b" },
  ],
  scenes: [
    {
      caption: {
        tr: "`rawLogs = [\"INFO\", \"ERROR\", \"INFO\", \"WARN\", \"ERROR\"]` — 5 log kaydı ama sadece 3 BENZERSİZ değer var. Tekrarları temizlemek için döngü mü yazacaksın?",
        en: "`rawLogs = [\"INFO\", \"ERROR\", \"INFO\", \"WARN\", \"ERROR\"]` — 5 log entries but only 3 UNIQUE values. Do you need to write a loop to clean duplicates?",
      },
      code: { tr: `const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];`, en: `const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];` },
      positions: { rawArray: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "`new Set(rawLogs)` çağrılır. Set, matematikteki KÜME kavramı gibi: aynı değeri İKİNCİ kez eklemeye çalışırsan sessizce YOK SAYAR — otomatik benzersizlik garantisi.",
        en: "`new Set(rawLogs)` is called. A Set works like the mathematical SET concept: trying to add the same value a SECOND time is silently IGNORED — automatic uniqueness guarantee.",
      },
      positions: {
        rawArray: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        setStruct: { x: 44, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "rawArray", to: "setStruct" }],
    },
    {
      caption: {
        tr: "Set içeriden `INFO`'yu bir kez, `ERROR`'ı bir kez, `WARN`'ı bir kez tutar — tekrarlar tamamen KAYBOLUR. `[...new Set(rawLogs)]` ile bu tekrar tekrar kullanılabilen bir Array'e geri çevrilir.",
        en: "Internally the Set holds `INFO` once, `ERROR` once, `WARN` once — duplicates completely VANISH. `[...new Set(rawLogs)]` spreads it back into a reusable Array.",
      },
      code: { tr: `const uniqueLogs = [...new Set(rawLogs)];\n// ["INFO", "ERROR", "WARN"]`, en: `const uniqueLogs = [...new Set(rawLogs)];\n// ["INFO", "ERROR", "WARN"]` },
      positions: {
        setStruct: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        dedupedArr: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: "setStruct", to: "dedupedArr", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Şimdi farklı bir problem: birden fazla `WebDriver` örneğini isimleriyle eşleştirmek istiyorsun. Düz bir `{}` nesnesi kullanılabilir, ama `new Map()` daha güvenli bir seçenektir.",
        en: "Now a different problem: you want to map multiple `WebDriver` instances by name. A plain `{}` object could work, but `new Map()` is the safer choice.",
      },
      code: { tr: `const drivers = new Map([\n  ["chrome", chromeDriver],\n  ["firefox", firefoxDriver],\n]);`, en: `const drivers = new Map([\n  ["chrome", chromeDriver],\n  ["firefox", firefoxDriver],\n]);` },
      positions: {
        dedupedArr: { x: 22, y: 40, opacity: 0.5, scale: 0.85 },
        mapStruct: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "dedupedArr", to: "mapStruct" }],
    },
    {
      caption: {
        tr: "Final — `Map`, elemanları EKLENDİKLERİ sırayla saklamayı GARANTİ eder ve key olarak herhangi bir tip (string, obje, fonksiyon) kabul eder — düz `{}` nesnesinde bu garantiler yoktur. `.size`, `.get()`, `.has()` gibi net bir API sunar.",
        en: "Final — `Map` GUARANTEES elements are kept in INSERTION order and accepts any type as a key (string, object, function) — plain `{}` objects have no such guarantees. It offers a clean API: `.size`, `.get()`, `.has()`.",
      },
      positions: {
        mapStruct: { x: 24, y: 55, opacity: 0.5, scale: 0.85 },
        insertOrder: { x: 56, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: "mapStruct", to: "insertOrder", color: "#f59e0b" }],
    },
  ],
}

// 🎬 17 — Karma Pratik Oyunlar — interleaving effect (vites değiştirme) mekanizması
const jsInterleavePracticeFilm = {
  type: "video-scene",
  id: "js-interleave-practice-film",
  title: {
    tr: "🎬 Beyin Neden Vites Değiştirince Daha İyi Öğrenir? — Interleaving Etkisi",
    en: "🎬 Why Does the Brain Learn Better When It Shifts Gears? — The Interleaving Effect",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "brain",   emoji: "🧠", label: { tr: "Beyin",                 en: "Brain" },                color: "#8b5cf6" },
    { id: "gameA",   emoji: "🎮", label: { tr: "Oyun A: Array Metotları", en: "Game A: Array Methods" }, color: "#0ea5e9" },
    { id: "gameB",   emoji: "🎲", label: { tr: "Oyun B: Promises",        en: "Game B: Promises" },     color: "#f59e0b" },
    { id: "blockedPractice", emoji: "😴", label: { tr: "Sadece A, A, A (Zayıf Kalıcılık)", en: "Only A, A, A (Weak Retention)" }, color: "#94a3b8" },
    { id: "switchGear", emoji: "🔀", label: { tr: "Vites Değişimi: A→B→A", en: "Gear Shift: A→B→A" },   color: "#22c55e" },
    { id: "retention", emoji: "📈", label: { tr: "Güçlü Kalıcı Öğrenme",  en: "Strong Long-Term Retention" }, color: "#10b981" },
  ],
  scenes: [
    {
      caption: {
        tr: "İki mini oyun var: Oyun A (.map()/.filter() sıralama) ve Oyun B (Promise zinciri kurma). Hangi sırayla oynamak daha iyi öğretir?",
        en: "There are two mini-games: Game A (ordering .map()/.filter()) and Game B (building a Promise chain). Which order teaches better?",
      },
      positions: { gameA: { x: 30, y: 40, scale: 1.05 }, gameB: { x: 70, y: 40, scale: 1.05 } },
    },
    {
      caption: {
        tr: "Kontrast — sadece Oyun A'yı arka arkaya 5 kez oynarsan (`blocked practice`), beyin ezberler ama derinlemesine kavramaz — bir hafta sonra unutma oranı YÜKSEKTİR.",
        en: "Contrast — playing only Game A five times in a row (`blocked practice`), the brain memorizes but doesn't deeply understand — forgetting rate a week later is HIGH.",
      },
      positions: {
        gameA: { x: 30, y: 40, opacity: 0.6, scale: 0.9 },
        blockedPractice: { x: 60, y: 60, scale: 1.15, pulse: true },
      },
      beams: [{ from: "gameA", to: "blockedPractice", color: "#94a3b8" }],
    },
    {
      caption: {
        tr: "Beyin, A'dan B'ye GEÇİŞ yaptığında (vites değiştirdiğinde) her seferinde 'bu hangi kural, hangi mekanizma?' diye AKTİF olarak sınıflandırma yapmak ZORUNDA kalır — bu ekstra zihinsel efor, öğrenmeyi PEKİŞTİRİR.",
        en: "When the brain SWITCHES from A to B (shifts gears), it is FORCED each time to actively classify 'which rule, which mechanism is this?' — this extra mental effort REINFORCES learning.",
      },
      positions: {
        blockedPractice: { x: 20, y: 60, opacity: 0.4, scale: 0.8 },
        brain: { x: 45, y: 40, scale: 1.2, pulse: true },
        gameB: { x: 70, y: 60, scale: 1.1 },
      },
      beams: [{ from: "brain", to: "gameB", color: "#8b5cf6" }],
    },
    {
      caption: {
        tr: "`A → B → A → B` sırasıyla (interleaving) oynamak, beynin her seferinde bağlamı yeniden İNŞA etmesini gerektirir — bu, tek bir konuda köreltici tekrar yerine ESNEK bir zihinsel model kurar.",
        en: "Playing in `A → B → A → B` order (interleaving) requires the brain to RECONSTRUCT context every time — this builds a FLEXIBLE mental model instead of numbing repetition on a single topic.",
      },
      positions: {
        gameB: { x: 22, y: 60, opacity: 0.5, scale: 0.85 },
        switchGear: { x: 55, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: "gameB", to: "switchGear", color: "#22c55e" }],
    },
    {
      caption: {
        tr: "Final — araştırmalar interleaved practice'in blocked practice'e göre uzun vadeli hatırlamada üstün olduğunu gösteriyor. Bu yüzden bu sekme array metotları ile Promise'leri KARIŞTIRARAK sorar — kafa karışıklığı değil, bilinçli bir öğrenme mühendisliği.",
        en: "Final — research shows interleaved practice outperforms blocked practice for long-term recall. This is why this tab MIXES array methods and Promises together — not confusion, but deliberate learning engineering.",
      },
      positions: {
        switchGear: { x: 24, y: 45, opacity: 0.5, scale: 0.85 },
        retention: { x: 56, y: 45, scale: 1.25, pulse: true },
      },
      beams: [{ from: "switchGear", to: "retention", color: "#10b981" }],
    },
  ],
}

// 🎬 18 — Mülakat Soruları — JavaScript zihinsel modelinin tek filmde özeti
const jsInterviewRecapFilm = {
  type: "video-scene",
  id: "js-interview-recap-film",
  title: {
    tr: "🎬 Mülakat Öncesi Son Tekrar: JavaScript'in Zihinsel Modeli Tek Filmde",
    en: "🎬 The Final Review Before the Interview: JavaScript's Mental Model in One Film",
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: "scope",     emoji: "📦", label: { tr: "Scope (var/let/const)", en: "Scope (var/let/const)" }, color: "#0ea5e9" },
    { id: "coercion",  emoji: "🔄", label: { tr: "Tip Dönüşümü (==/===)", en: "Type Coercion (==/===)" }, color: "#f59e0b" },
    { id: "eventLoop", emoji: "🔁", label: { tr: "Event Loop",            en: "Event Loop" },            color: "#8b5cf6" },
    { id: "closures",  emoji: "🎁", label: { tr: "Closures",              en: "Closures" },              color: "#6366f1" },
    { id: "interviewer", emoji: "🎤", label: { tr: "Mülakatçı Sorusu",     en: "Interviewer's Question" }, color: "#94a3b8" },
    { id: "confidentAnswer", emoji: "🏆", label: { tr: "Senaryo Tabanlı, Güçlü Cevap", en: "Scenario-Based, Strong Answer" }, color: "#22c55e" },
  ],
  scenes: [
    {
      caption: {
        tr: "Mülakatçı soruyor: 'JavaScript'te neden bazen `var` sızıntı yapar, neden `0.1+0.2 !== 0.3`, neden `setTimeout(fn,0)` anında çalışmaz?' Bu film, öğrendiğin dört temel mekanizmayı hızla tekrar ettirir.",
        en: "The interviewer asks: 'Why does `var` sometimes leak in JavaScript, why is `0.1+0.2 !== 0.3`, why doesn't `setTimeout(fn,0)` run instantly?' This film quickly re-runs the four core mechanisms you learned.",
      },
      positions: { interviewer: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: "1️⃣ Scope — `var` fonksiyon kapsamlıdır ve sızar; `let`/`const` bloğa mühürlenir. Bir döngüde `var` kullanmak asenkron kodda klasik 'hepsi son değeri yazdırır' hatasına yol açar.",
        en: "1️⃣ Scope — `var` is function-scoped and leaks; `let`/`const` are sealed to their block. Using `var` in a loop with async code causes the classic 'all print the last value' bug.",
      },
      positions: {
        interviewer: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        scope: { x: 50, y: 30, scale: 1.15, pulse: true },
      },
      beams: [{ from: "interviewer", to: "scope", color: "#0ea5e9" }],
    },
    {
      caption: {
        tr: "2️⃣ Tip Dönüşümü — `==` gizlice tip dönüştürür, `===` dönüştürmez. `0.1+0.2 !== 0.3` ise IEEE 754'ün ikili sayı yaklaşıklığından kaynaklanır — bir JS hatası değil.",
        en: "2️⃣ Type Coercion — `==` secretly converts types, `===` does not. `0.1+0.2 !== 0.3` comes from IEEE 754's binary approximation — not a JS bug.",
      },
      positions: {
        scope: { x: 22, y: 30, opacity: 0.5, scale: 0.85 },
        coercion: { x: 55, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: "scope", to: "coercion", color: "#f59e0b" }],
    },
    {
      caption: {
        tr: "3️⃣ Event Loop — Call Stack senkron kodu çalıştırır, Microtask Queue (Promise) HER ZAMAN Macrotask Queue'dan (setTimeout) önce boşalır. 4️⃣ Closures — bir fonksiyon, kendini oluşturan kapsamı hatırlar; bu, module pattern ve encapsulation'ın temelidir.",
        en: "3️⃣ Event Loop — the Call Stack runs sync code, the Microtask Queue (Promise) ALWAYS drains before the Macrotask Queue (setTimeout). 4️⃣ Closures — a function remembers the scope it was created in; this is the foundation of the module pattern and encapsulation.",
      },
      positions: {
        coercion: { x: 24, y: 40, opacity: 0.5, scale: 0.85 },
        eventLoop: { x: 50, y: 55, scale: 1.15, pulse: true },
        closures: { x: 76, y: 35, scale: 1.1 },
      },
      beams: [{ from: "coercion", to: "eventLoop", color: "#8b5cf6" }, { from: "eventLoop", to: "closures", color: "#6366f1" }],
    },
    {
      caption: {
        tr: "Final — güçlü bir mülakat cevabı 'X nedir?' tanımıyla BİTMEZ; gerçek bir senaryoyla başlar ('production'da flaky bir testte bunu gördüm'), mekanizmayı anlatır, sonra ÇÖZÜMÜ verir. Ezber değil, akıl yürütme mülakatı kazandırır.",
        en: "Final — a strong interview answer does NOT end with a 'what is X?' definition; it starts with a real scenario ('I saw this in a flaky production test'), explains the mechanism, then gives the FIX. Reasoning wins interviews, not memorization.",
      },
      positions: {
        closures: { x: 24, y: 35, opacity: 0.5, scale: 0.85 },
        confidentAnswer: { x: 56, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: "closures", to: "confidentAnswer", color: "#22c55e" }],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// EKSİK ANİMASYON/SANDBOX TAMAMLAMALARI (Bölüm 9.5) — elle eklenen bloklar
// ═══════════════════════════════════════════════════════════════════════════

// Sekme 1 (Kurulum & Setup) — sandbox eksikti (bash kodları auto-fill kapsamı dışında)
const jsNodeNpmInstallPractice = {
  type: "code-playground",
  relatedTopicId: "javascript-installation",
  id: "js-node-npm-install-practice-01",
  label: {
    tr: "Micro Lab: package.json'a Playwright'ı devDependency Olarak Ekle",
    en: "Micro Lab: Add Playwright to package.json as a devDependency",
  },
  language: "bash",
  task: {
    tr: "Yukarıdaki filmdeki kurulum zincirini kendin uygula: Node.js kuruldu, package.json oluştu, sıra Playwright'ı devDependency olarak kurmada. TODO satırını doğru komutla tamamla.",
    en: "Apply the install chain from the film above yourself: Node.js is installed, package.json exists, next is installing Playwright as a devDependency. Complete the TODO line with the right command.",
  },
  explanation: {
    tr: "Bu gerçek bir runtime değil; amaç npm install --save-dev komutunun neden test bağımlılıklarını devDependencies'e yazdığını elle pekiştirmek.",
    en: "This is not a real runtime; the goal is to reinforce by hand why npm install --save-dev writes test dependencies into devDependencies.",
  },
  code: {
    tr: `npm init -y\n# cikti: package.json olusturuldu\n\nnpm install --save-dev @playwright/test\n# cikti: added 3 packages, devDependencies'e eklendi\n\nnpx playwright install\n# tarayici binary'leri iniyor...\n\nnpx playwright test\n# 3 passed`,
    en: `npm init -y\n# output: package.json created\n\nnpm install --save-dev @playwright/test\n# output: added 3 packages, added to devDependencies\n\nnpx playwright install\n# downloading browser binaries...\n\nnpx playwright test\n# 3 passed`,
  },
  starterCode: {
    tr: `npm init -y\n# cikti: package.json olusturuldu\n\n# TODO: Playwright'i devDependency olarak kur\n\nnpx playwright install\n# tarayici binary'leri iniyor...\n\nnpx playwright test\n# 3 passed`,
    en: `npm init -y\n# output: package.json created\n\n# TODO: install Playwright as a devDependency\n\nnpx playwright install\n# downloading browser binaries...\n\nnpx playwright test\n# 3 passed`,
  },
  solutionCode: {
    tr: `npm init -y\n# cikti: package.json olusturuldu\n\nnpm install --save-dev @playwright/test\n# cikti: added 3 packages, devDependencies'e eklendi\n\nnpx playwright install\n# tarayici binary'leri iniyor...\n\nnpx playwright test\n# 3 passed`,
    en: `npm init -y\n# output: package.json created\n\nnpm install --save-dev @playwright/test\n# output: added 3 packages, added to devDependencies\n\nnpx playwright install\n# downloading browser binaries...\n\nnpx playwright test\n# 3 passed`,
  },
  expected: {
    tr: "package.json'un devDependencies alanında @playwright/test görünür; npx playwright test komutu artık calisir.",
    en: "The devDependencies field of package.json now shows @playwright/test; npx playwright test now runs.",
  },
  hints: [
    { tr: "Test araçları son kullanıcıya gitmez — bu yüzden --save-dev (veya kısaltması -D) flag'i kullanılır, düz npm install değil.", en: "Test tools don't ship to end users — that's why the --save-dev (or -D) flag is used, not plain npm install." },
    { tr: "Paket adı tam olarak @playwright/test'tir — @ ile başlayan bu isimlere 'scoped package' denir.", en: "The package name is exactly @playwright/test — names starting with @ are called 'scoped packages'." },
    { tr: "TODO satırı tek bir npm install komutudur ve --save-dev flag'ini içermelidir.", en: "The TODO line is a single npm install command and must include the --save-dev flag." },
  ],
  xpReward: 10,
}

// Sekme 2 (Değişkenler & Operatörler) — animasyon eksikti
const jsVarScopeSteps = {
  type: "step-animation",
  id: "js-var-let-const-scope-steps",
  title: { tr: "Adım Adım: var'ın Sızıntısını İzle", en: "Step by Step: Watch var Leak" },
  steps: [
    { id: 1, icon: "🧱", label: { tr: "if bloğu içinde tanımla", en: "Declare inside an if block" }, detail: { tr: "if (true) { var score = 95; } — score, bloğun İÇİNDE doğar.", en: "if (true) { var score = 95; } — score is born INSIDE the block." } },
    { id: 2, icon: "💧", label: { tr: "Blok dışına sız", en: "Leak outside the block" }, detail: { tr: "console.log(score) blok dışında çağrılır ve 95 YAZDIRILIR — var function-scope'tur, block-scope değil.", en: "console.log(score) is called outside the block and PRINTS 95 — var is function-scoped, not block-scoped." } },
    { id: 3, icon: "📦", label: { tr: "let ile aynısını dene", en: "Try the same with let" }, detail: { tr: "if (true) { let score = 95; } — bu sefer console.log(score) blok dışında ReferenceError fırlatır.", en: "if (true) { let score = 95; } — this time console.log(score) outside the block throws a ReferenceError." } },
    { id: 4, icon: "✅", label: { tr: "const ile sabitle", en: "Lock it with const" }, detail: { tr: "const kullanmak hem block scope korumasını hem de yeniden atama korumasını aynı anda sağlar.", en: "Using const gives you both block-scope protection and reassignment protection at once." } },
  ],
}

// Sekme 7 (Event Loop) — animasyon eksikti
const jsEventLoopMechanismSteps = {
  type: "step-animation",
  id: "js-event-loop-mechanism-steps",
  title: { tr: "Adım Adım: Event Loop Mekanizması", en: "Step by Step: The Event Loop Mechanism" },
  steps: [
    { id: 1, icon: "📚", label: { tr: "Call Stack senkron kodu çalıştırır", en: "Call Stack runs sync code" }, detail: { tr: "console.log gibi senkron satırlar sırayla Call Stack üzerinde çalışır.", en: "Synchronous lines like console.log run in order on the Call Stack." } },
    { id: 2, icon: "🌐", label: { tr: "Web API asenkron işi devralır", en: "Web API takes over async work" }, detail: { tr: "setTimeout veya fetch çağrıldığında iş Web API'ye havale edilir, Call Stack bloklanmaz.", en: "When setTimeout or fetch is called, the work is delegated to the Web API — the Call Stack is never blocked." } },
    { id: 3, icon: "⚡", label: { tr: "Microtask Queue önce boşalır", en: "Microtask Queue drains first" }, detail: { tr: "Call Stack boşalınca Event Loop ÖNCE Promise callback'lerini (Microtask) tüketir.", en: "Once the Call Stack is empty, the Event Loop consumes Promise callbacks (Microtasks) FIRST." } },
    { id: 4, icon: "⏰", label: { tr: "Macrotask Queue en son çalışır", en: "Macrotask Queue runs last" }, detail: { tr: "Microtask Queue tamamen boşaldıktan SONRA setTimeout gibi Macrotask'lar Call Stack'e alınır.", en: "Only AFTER the Microtask Queue is fully drained are Macrotasks like setTimeout pushed into the Call Stack." } },
  ],
}

// Sekme 17 (Karma Pratik Oyunlar) — animasyon + sandbox eksikti
const jsInterleavePracticeSteps = {
  type: "step-animation",
  id: "js-interleave-practice-steps",
  title: { tr: "Adım Adım: Interleaving Pratiği Nasıl Kurulur?", en: "Step by Step: How to Set Up Interleaved Practice" },
  steps: [
    { id: 1, icon: "🎮", label: { tr: "Oyun A'yı bir tur oyna", en: "Play Game A for one round" }, detail: { tr: "Array metotlarını (map/filter) sıralama oyununu bir kez tamamla.", en: "Complete the array-method (map/filter) ordering game once." } },
    { id: 2, icon: "🔀", label: { tr: "Vites değiştir: Oyun B'ye geç", en: "Shift gears to Game B" }, detail: { tr: "Hemen ardından Promise zinciri kurma oyununa geç — beyin bağlamı yeniden kurmak zorunda kalır.", en: "Immediately switch to the Promise-chain game — the brain must rebuild context." } },
    { id: 3, icon: "🔁", label: { tr: "A'ya geri dön", en: "Return to Game A" }, detail: { tr: "Tekrar Oyun A'ya dönmek, ilk turdan daha hızlı ve daha doğru olup olmadığını gösterir.", en: "Returning to Game A shows whether you are faster and more accurate than the first round." } },
    { id: 4, icon: "📈", label: { tr: "Kalıcılığı gözlemle", en: "Observe retention" }, detail: { tr: "İki oyun arasında geçiş yapmak, sadece birini tekrar tekrar oynamaktan daha güçlü uzun vadeli hatırlama sağlar.", en: "Switching between two games produces stronger long-term recall than repeating just one." } },
  ],
}

const jsInterleavePracticeLab = {
  type: "code-playground",
  relatedTopicId: "javascript-practice-games",
  id: "js-interleave-practice-lab-01",
  label: {
    tr: "Micro Lab: Array Zincirini ve Promise Zincirini Aynı Egzersizde Kur",
    en: "Micro Lab: Build an Array Chain and a Promise Chain in the Same Exercise",
  },
  language: "javascript",
  task: {
    tr: "İki farklı mekanizmayı arka arkaya kur: önce testResults dizisini filtrele ve isimlerini çıkar, sonra bir Promise'i .then() ile zincirle. TODO satırlarını tamamla.",
    en: "Build two different mechanisms back to back: first filter testResults and extract names, then chain a Promise with .then(). Complete the TODO lines.",
  },
  explanation: {
    tr: "Bu gerçek bir test ortamı değildir; amaç array metotları ile Promise zincirleme arasında vites değiştirerek her ikisinin sözdizimini birlikte pekiştirmektir.",
    en: "This is not a real test environment; the goal is to shift gears between array methods and Promise chaining to reinforce both syntaxes together.",
  },
  code: {
    tr: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\nconst passedNames = testResults.filter(t => t.status === "passed").map(t => t.name);\nconsole.log(passedNames); // ["Login"]\n\nPromise.resolve("hazir").then(msg => console.log(msg));`,
    en: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\nconst passedNames = testResults.filter(t => t.status === "passed").map(t => t.name);\nconsole.log(passedNames); // ["Login"]\n\nPromise.resolve("ready").then(msg => console.log(msg));`,
  },
  starterCode: {
    tr: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\n// TODO: sadece "passed" olanlarin ismini cikar\nconst passedNames = testResults;\nconsole.log(passedNames);\n\nPromise.resolve("hazir").then(msg => console.log(msg));`,
    en: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\n// TODO: extract the name of only the "passed" ones\nconst passedNames = testResults;\nconsole.log(passedNames);\n\nPromise.resolve("ready").then(msg => console.log(msg));`,
  },
  solutionCode: {
    tr: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\nconst passedNames = testResults.filter(t => t.status === "passed").map(t => t.name);\nconsole.log(passedNames);\n\nPromise.resolve("hazir").then(msg => console.log(msg));`,
    en: `const testResults = [\n  { name: "Login", status: "passed" },\n  { name: "Payment", status: "failed" },\n];\nconst passedNames = testResults.filter(t => t.status === "passed").map(t => t.name);\nconsole.log(passedNames);\n\nPromise.resolve("ready").then(msg => console.log(msg));`,
  },
  expected: {
    tr: 'passedNames konsola ["Login"] olarak yazdirilir; Promise then callback\'i "hazir" mesajini basar.',
    en: 'passedNames prints ["Login"] to the console; the Promise then callback prints "ready".',
  },
  hints: [
    { tr: "Önce .filter() ile status === \"passed\" olanları seç, sonra .map() ile sadece name alanını çıkar — zincirleme sırası önemlidir.", en: "First use .filter() to select status === \"passed\", then .map() to extract only the name field — chain order matters." },
    { tr: "testResults.filter(...).map(...) tek bir ifade olarak zincirlenebilir; ara değişkene gerek yoktur.", en: "testResults.filter(...).map(...) can be chained as a single expression; no intermediate variable is needed." },
    { tr: "TODO satırı testResults'u doğrudan passedNames'e atamak yerine filter+map zincirini kurmalıdır.", en: "The TODO line should build the filter+map chain instead of directly assigning testResults to passedNames." },
  ],
  xpReward: 10,
}

// Sekme 18 (Mülakat Soruları) — animasyon + sandbox eksikti
const jsInterviewMechanismSteps = {
  type: "step-animation",
  id: "js-interview-mechanism-steps",
  title: { tr: "Adım Adım: Senaryo Tabanlı Bir Mülakat Cevabı Nasıl Kurulur?", en: "Step by Step: How to Build a Scenario-Based Interview Answer" },
  steps: [
    { id: 1, icon: "👂", label: { tr: "Soruyu mekanizmaya bağla", en: "Tie the question to a mechanism" }, detail: { tr: "Soru hangi konuyu hedefliyor: scope mı, coercion mı, event loop mu, closure mu?", en: "Which topic does the question target: scope, coercion, event loop, or closures?" } },
    { id: 2, icon: "🧭", label: { tr: "Somut bir senaryoyla başla", en: "Start with a concrete scenario" }, detail: { tr: "Soyut tanım yerine 'production'da flaky bir testte bunu gördüm' gibi gerçek bir örnekle aç.", en: "Instead of an abstract definition, open with a real example like 'I saw this in a flaky production test'." } },
    { id: 3, icon: "🔧", label: { tr: "Mekanizmayı adım adım anlat", en: "Explain the mechanism step by step" }, detail: { tr: "Neyin, hangi sırayla, neden öyle çalıştığını akıl yürüterek anlat.", en: "Explain what happens, in what order, and why — through reasoning, not memorization." } },
    { id: 4, icon: "✅", label: { tr: "Çözümle bitir", en: "Close with the fix" }, detail: { tr: "Cevabı somut bir çözümle veya best practice ile kapat — bu, ezber değil derin anlayış gösterir.", en: "End with a concrete fix or best practice — this demonstrates deep understanding, not memorization." } },
  ],
}

const jsInterviewMechanismLab = {
  type: "code-playground",
  relatedTopicId: "javascript-interview",
  id: "js-interview-mechanism-lab-01",
  label: {
    tr: "Micro Lab: var Sızıntısını Senaryo Cevabıyla Düzelt",
    en: "Micro Lab: Fix a var Leak with a Scenario-Based Answer",
  },
  language: "javascript",
  task: {
    tr: "Mülakatta sık sorulan bir kod parçası: bir for döngüsünde var kullanılınca setTimeout callback'leri hep aynı son değeri yazdırıyor. TODO satırını let ile değiştirerek düzelt.",
    en: "A frequent interview snippet: using var in a for loop makes every setTimeout callback print the same last value. Fix the TODO line by switching to let.",
  },
  explanation: {
    tr: "Bu gerçek bir runtime değil; amaç mülakatta karşına çıkabilecek klasik var/let closure sorusunu elinle çözerek pekiştirmek.",
    en: "This is not a real runtime; the goal is to reinforce the classic var/let closure interview question by fixing it yourself.",
  },
  code: {
    tr: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// cikti: 0, 1, 2`,
    en: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// output: 0, 1, 2`,
  },
  starterCode: {
    tr: `// TODO: var yerine dogru keyword'u kullan\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// mevcut hatali cikti: 3, 3, 3`,
    en: `// TODO: use the correct keyword instead of var\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// current buggy output: 3, 3, 3`,
  },
  solutionCode: {
    tr: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// cikti: 0, 1, 2`,
    en: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// output: 0, 1, 2`,
  },
  expected: {
    tr: "Konsol cikisi artik 0, 1, 2 sirasiyla basilir; her setTimeout kendi turunun i degerini hatirlar.",
    en: "The console output now prints 0, 1, 2 in order; each setTimeout remembers the i value from its own iteration.",
  },
  hints: [
    { tr: "var fonksiyon kapsamlıdır ve döngünün 3 turu da AYNI değişkeni paylaşır — sorun keyword seçiminde.", en: "var is function-scoped and all 3 loop iterations SHARE the same variable — the problem is the keyword choice." },
    { tr: "let her iterasyonda YENİ bir bağlama (binding) oluşturur; bu yüzden her closure kendi i'sini hatırlar.", en: "let creates a NEW binding on every iteration; that's why each closure remembers its own i." },
    { tr: "TODO satırı sadece for döngüsündeki 'var' kelimesini 'let' ile değiştirmelidir, başka hiçbir şey değişmez.", en: "The TODO line should only replace the word 'var' with 'let' in the for loop — nothing else changes." },
  ],
  xpReward: 10,
}

const sections = [
  // ─────────────────────────────────────────────
  // SECTION 0 — Intro & Why JS
  // ─────────────────────────────────────────────
  {
    title: { tr: "JavaScript Nedir?", en: "What is JavaScript?" },
    blocks: [
      {
        type: "css-animation",
        kind: "intro",
        label: { tr: "JavaScript — Web'in Evrensel Dili", en: "JavaScript — The Universal Language of the Web" }
      },
      {
        type: "simple-box",
        emoji: "🚀",
        content: {
          tr: "JavaScript, bir binanın elektrik tesisatı gibidir: HTML duvarlar ve döşemedir, CSS boya ve dekor, JavaScript ise ışık anahtarları, asansörler ve otomatik kapılar — kullanıcı bir şeye dokunduğunda bina tepki verir. Peki neden bu kadar önemli? Çünkü tarayıcılar yalnızca JavaScript çalıştırır; başka hiçbir dile alternatif yoktur. Java'da Swing veya JavaFX ile masaüstü UI yazarsın ama tarayıcı içinde Java kodu çalıştıramazsın — orada tek yetkili JavaScript. QA perspektifinden bakınca Playwright ve Cypress testlerin bu nedenle JavaScript/TypeScript üzerinde koşar: test kodun, test ettiği uygulama ile aynı dili konuşur, aralarında çevirmen yoktur, bu da timing sorunlarını ve flaky davranışları dramatik ölçüde azaltır.",
          en: "JavaScript is like a building's electrical wiring: HTML is the walls and floor, CSS is the paint and decor, JavaScript is the light switches, elevators, and automatic doors — the building reacts when a user touches something. Why does this matter? Because browsers run ONLY JavaScript; there is no alternative language. In Java you write desktop UI with Swing or JavaFX, but you cannot run Java code inside a browser — JavaScript is the sole authority there. From a QA perspective, Playwright and Cypress tests run on JavaScript/TypeScript precisely for this reason: your test code speaks the same language as the app it tests, with no translator in between, dramatically reducing timing issues and flaky behavior."
        }
      },
      {
        type: "heading",
        content: { tr: "Neden Test Otomasyonu İçin JavaScript?", en: "Why JavaScript for Test Automation?" }
      },
      {
        type: "text",
        content: {
          tr: "Playwright, Cypress gibi modern test otomasyon kütüphaneleri JavaScript ve TypeScript üzerinde yerel olarak çalışır. Web tarayıcıları doğrudan JavaScript anladığından, testlerinizi tarayıcı motoruyla aynı dilde yazmak size muazzam bir hız ve kontrol kazandırır.",
          en: "Modern test automation frameworks like Playwright and Cypress run natively on JavaScript and TypeScript. Because web browsers understand JavaScript directly, writing tests in the browser's native language gives you incredible speed and control."
        }
      },
      {
        type: "grid",
        cols: 3,
        items: [
          {
            icon: "⚡",
            label: { tr: "Tarayıcı Dostu", en: "Browser Native" },
            desc: { tr: "Tarayıcı motoruyla doğrudan konuşun; ekstra sürücü katmanlarına gerek duymaz.", en: "Speak directly to the browser engine; no extra driver layers needed." }
          },
          {
            icon: "🎭",
            label: { tr: "Playwright & Cypress", en: "First-Class Frameworks" },
            desc: { tr: "Modern test otomasyon dünyasının iki dev kütüphanesini ana dilinde kullanın.", en: "Use two of the biggest modern test automation libraries in their language." }
          },
          {
            icon: "🔄",
            label: { tr: "Asenkron Yapı", en: "Asynchronous Power" },
            desc: { tr: "Aynı anda birden fazla işi yapabilen asenkron model sayesinde ultra hızlı testler çalıştırın.", en: "Run ultra-fast tests thanks to the asynchronous model that handles multiple tasks at once." }
          }
        ]
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "Java", en: "Java" },
          { tr: "JavaScript", en: "JavaScript" }
        ],
        rows: [
          [
            { tr: "Tip Sistemi", en: "Type System" },
            { tr: "Statik Tipli (Strict)", en: "Static (Strict)" },
            { tr: "Dinamik Tipli (Esnek)", en: "Dynamic (Flexible)" }
          ],
          [
            { tr: "Çalışma Modeli", en: "Execution Model" },
            { tr: "Çoklu İş Parçacığı (Threads)", en: "Multi-threaded" },
            { tr: "Tek İş Parçacığı + Event Loop", en: "Single-threaded + Event Loop" }
          ],
          [
            { tr: "Öğrenme Eğrisi", en: "Learning Curve" },
            { tr: "Orta / Yüksek", en: "Medium / High" },
            { tr: "Düşük / Orta", en: "Low / Medium" }
          ]
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "150px",
        defaultCode: {
          tr: `// JavaScript ile ilk kodunuzu çalıştırın!
console.log("LearnQA.dev'e Hoş Geldiniz!");

let x = 10;
let y = 20;
console.log("Toplam Sonuç:", x + y);`,
          en: `// Run your first JavaScript code!
console.log("Welcome to LearnQA.dev!");

let x = 10;
let y = 20;
console.log("Total Sum:", x + y);`
        }
      },
      jsV8EngineFlowFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'in tarayıcıdaki otomasyon testlerinde Java'ya göre en büyük avantajı nedir?",
          en: "What is JavaScript's biggest advantage over Java in browser automation testing?"
        },
        options: [
          { id: "a", text: { tr: "Daha fazla bellek tüketmesi", en: "Consuming more memory" } },
          { id: "b", text: { tr: "Tarayıcı motorlarında doğrudan (natively) çalışabilmesi", en: "Running natively inside browser engines" } },
          { id: "c", text: { tr: "Sadece Windows üzerinde çalışabilmesi", en: "Running only on Windows" } },
          { id: "d", text: { tr: "Derleme süresinin çok uzun olması", en: "Having very long compile times" } }
        ],
        correct: "b",
        explanation: {
          tr: "Web tarayıcıları doğrudan JavaScript çalıştırır. Test kodunu JavaScript ile yazdığınızda tarayıcı içi nesnelere erişmek, DOM manipülasyonu yapmak ve Playwright/Cypress gibi araçları çalıştırmak çok daha hızlı ve pürüzsüz olur.",
          en: "Web browsers run JavaScript natively. Writing tests in JS makes accessing in-browser objects, DOM manipulation, and running tools like Playwright or Cypress much faster and smoother."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te konsola çıktı yazdırmak veya log basmak için hangi fonksiyon kullanılır?",
            en: "Which function is used to print outputs or logs to the console in JavaScript?"
          },
          options: [
            { id: "a", text: "System.out.println()" },
            { id: "b", text: "print()" },
            { id: "c", text: "console.log()" },
            { id: "d", text: "Write-Output" }
          ],
          correct: "c",
          explanation: {
            tr: "JavaScript'te konsola çıktı yazdırmak için `console.log()` kullanılır. Bu, Java'daki `System.out.println()` fonksiyonunun doğrudan karşılığıdır.",
            en: "In JavaScript, `console.log()` is used to print logs to the console. It is the direct equivalent of Java's `System.out.println()`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript, bir restoranın sipariş sistemi gibi çalışır: menü (HTML) ne sunulduğunu listeler, dekor (CSS) ortamın görünümünü belirler, ama müşterinin garsonla konuşup siparişi alması ve mutfağa iletmesi JavaScript'in işidir — etkileşim. Peki neden web'in tek etkileşim dili oldu? Çünkü 1995'te Netscape tarayıcısı canlı bir dil seçmek zorundaydı ve Brendan Eich 10 günde JavaScript'i yarattı; o günden bu yana her tarayıcı bu dili anlıyor. Java'da bir butona tıklama eventi `ActionListener` ile yönetilir; JavaScript'te ise `addEventListener('click', ...)` ile — sözdizim farklı ama mantık aynı. QA'da bu kritik: Selenium'da Java koduyla driver üzerinden tarayıcıyla konuşursun, Playwright'ta ise test kodu doğrudan tarayıcı motoruna erişir; bu fark test hızını ve güvenilirliğini doğrudan etkiler.",
          en: "JavaScript is like a restaurant's ordering system: the menu (HTML) lists what is offered, the decor (CSS) sets the visual tone, but JavaScript is the waiter who takes the customer's order and relays it to the kitchen — interaction. Why did it become the only interactive language of the web? Because in 1995 Netscape needed one live scripting language and Brendan Eich built JavaScript in 10 days; since then every browser understands it. In Java a button click is handled by an `ActionListener`; in JavaScript by `addEventListener('click', ...)` — different syntax, same concept. For QA this is critical: with Selenium in Java you talk to the browser through a driver layer; with Playwright your test code speaks directly to the browser engine, which directly improves test speed and reliability."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden web'de JavaScript dışında başka bir dil kullanılamaz? Düşün: Şehirde elektrik şebekesi kurulduğunda standart bir voltaj (220V) belirlendi ve tüm cihazlar buna göre tasarlandı — sonradan voltajı değiştirmek her cihazın çöpe gitmesi demektir. JavaScript de aynı şekilde 1995'te web'in standart voltajı olarak kabul edildi. WebAssembly, Python ve Rust kodu derlenerek tarayıcıda çalıştırılabilir olsa da bunlar hâlâ JavaScript'in koordinasyonuyla çalışır. Java'da JVM farklı dilleri (Kotlin, Scala, Groovy) çalıştırabilir; ama tarayıcıda JVM yok — sadece JavaScript motoru var. QA mühendisi olarak bunu bilmen şunu sağlar: neden Playwright testlerini TypeScript'te yazsan bile Node.js kurman gerektiğini anlarsın, çünkü JavaScript ekosistemi olmadan tarayıcı otomasyonu başlamaz.",
          en: "Why can no other language replace JavaScript in the browser? Consider: when a city's electrical grid was built, a standard voltage (120V/220V) was chosen and every device was designed around it — changing the voltage later would mean every device becomes garbage. JavaScript was accepted as the web's standard voltage in 1995. WebAssembly allows Python and Rust code to run in the browser when compiled, but these still run under JavaScript's coordination. In Java, the JVM can run multiple languages (Kotlin, Scala, Groovy); but in the browser there is no JVM — only a JavaScript engine. As a QA engineer, knowing this explains why you must install Node.js even when writing Playwright tests in TypeScript: without the JavaScript ecosystem, browser automation does not start."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript hem tarayıcıda hem sunucuda çalışabiliyor? Bir kahve makinesi fabrikasını düşün: fabrika aslında bir ısıtma motoru üretiyor. Bu motoru arabaya koyarsan araç ısıtıcısı, mutfağa koyarsan kahve makinesi olur — motor aynı, ortam farklı. Node.js tam olarak bunu yaptı: Chrome'un V8 JavaScript motorunu 2009'da tarayıcı dışına çıkarıp işletim sistemine bağladı. Artık aynı motor hem tarayıcıda butona tıklamayı işliyor, hem sunucuda dosya okuyup ağ istekleri atıyor. Java'da bu ayrım çok netdir: masaüstü için Swing, backend için Spring — iki ayrı dünya. JavaScript'te ise tek dil, iki farklı runtime. QA için pratik sonuç: Playwright test runner'ı Node.js üzerinde çalışır (backend runtime), ama test ettiğin uygulama tarayıcı runtime'ında koşar — bu farkı anlayan QA mühendisi timing sorunlarını çok daha hızlı teşhis eder.",
          en: "Why can JavaScript run both in the browser and on a server? Think of a motor factory: the factory produces a heating engine. Put it in a car and you get a car heater; put it in a kitchen and you get a coffee maker — same engine, different environments. Node.js did exactly this in 2009: it extracted Chrome's V8 JavaScript engine from the browser and wired it to the operating system. Now the same engine processes button clicks in the browser AND reads files and makes network requests on a server. In Java this split is very clear: Swing for desktop, Spring for backend — two separate worlds. In JavaScript it is one language, two runtimes. Practical QA implication: your Playwright test runner runs on Node.js (backend runtime) but the app you are testing runs in a browser runtime — a QA engineer who understands this distinction diagnoses timing issues far faster."
        }
      },
      {
        type: "quiz",
        question: { tr: "JavaScript'te `typeof null` ifadesinin sonucu nedir?", en: "What does `typeof null` return in JavaScript?" },
        options: [
          { id: "a", text: { tr: "\"null\"", en: "\"null\"" } },
          { id: "b", text: { tr: "\"undefined\"", en: "\"undefined\"" } },
          { id: "c", text: { tr: "\"object\"", en: "\"object\"" } },
          { id: "d", text: { tr: "\"string\"", en: "\"string\"" } }
        ],
        correct: "c",
        explanation: { tr: "`typeof null` ifadesi tarihsel bir hata nedeniyle `\"object\"` döndürür. Bu, JavaScript'in 1.0 versiyonundan gelen ve geriye dönük uyumluluk nedeniyle düzeltilemeyen bilinen bir hatadır.", en: "`typeof null` returns `\"object\"` due to a historical bug from JavaScript 1.0. It cannot be fixed because too many websites depend on this broken behavior — a perfect example of the cost of backwards compatibility." },
        retryQuestion: {
          question: { tr: "JavaScript'i diğer dillerden ayıran en temel özelliği nedir?", en: "What is the most fundamental feature that distinguishes JavaScript from most other languages?" },
          options: [
            { id: "a", text: { tr: "Nesne yönelimli olması", en: "Object-oriented" } },
            { id: "b", text: { tr: "Tarayıcıda çalışan tek dil", en: "Only language running natively in browsers" } },
            { id: "c", text: { tr: "Derlenen bir dil olması", en: "Being a compiled language" } },
            { id: "d", text: { tr: "Tip güvenli olması", en: "Being type-safe" } }
          ],
          correct: "b",
          explanation: { tr: "JavaScript, tarayıcılarda doğal olarak çalışan tek dildir. Bu benzersiz konumu onu web geliştirmenin zorunlu bir parçası yapar.", en: "JavaScript is the only language that runs natively in all web browsers — this unique position makes it an unavoidable part of web development." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain to someone who has never heard of JavaScript why it is used for test automation and how it differs from Java. No jargon!",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript'i hiç duymamış birine neden test otomasyonu için kullanıldığını ve Java'dan ne farkı olduğunu anlat. Teknik terim kullanma!",
        keywords: [
              ["tarayıcı", "browser"],
              ["browser", "fast"],
              ["hız", "direct"],
              ["direkt", "playwright"],
              ["playwright", "cypress"],
              ["cypress", "async"],
              ["asenkron", "native"],
              ["native", "modern"],
              ["modern", "runs"],
              ["çalıştırır", "engine"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 1 — Installation & Setup
  // ─────────────────────────────────────────────
  {
    title: { tr: "Kurulum & Setup", en: "Installation & Setup" },
    blocks: [
      {
        type: "css-animation",
        kind: "install",
        label: { tr: "Terminal — Node.js Kurulum Akışı", en: "Terminal — Node.js Installation Flow" }
      },
      {
        type: "heading",
        content: { tr: "Adım 1: Node.js Kurulumu", en: "Step 1: Install Node.js" }
      },
      {
        type: "text",
        content: {
          tr: "JavaScript tarayıcı dışında Node.js motoru sayesinde çalışır. Node.js bilgisayarınıza yüklendiğinde npm (Node Package Manager) de otomatik kurulur. Node.js, V8 motorunun bilgisayarımızda koşan sürümüdür.",
          en: "JavaScript runs outside the browser thanks to the Node.js runtime. When you install Node.js on your computer, npm (Node Package Manager) is automatically installed as well. Node.js is basically Chrome's V8 engine packaged to run locally on your system."
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Windows (PowerShell / CMD)", en: "Windows (PowerShell / CMD)" },
        content: {
          tr: `# 1. Node.js LTS indir: https://nodejs.org → Windows Installer (.msi)
# 2. Kurulumdan sonra yeni terminal aç ve doğrula:
node --version   # Beklenen: v22.x.x
npm --version    # Beklenen: 10.x.x

# 3. İlk test
node -e "console.log('Node.js çalışıyor!')"
# Beklenen çıktı: Node.js çalışıyor!

# 4. Proje klasörü oluştur
mkdir my-qa-project && cd my-qa-project
npm init -y
# Beklenen: package.json dosyası oluşturuldu`,
          en: `# 1. Download Node.js LTS: https://nodejs.org → Windows Installer (.msi)
# 2. Open a new terminal after install and verify:
node --version   # Expected: v22.x.x
npm --version    # Expected: 10.x.x

# 3. Quick test
node -e "console.log('Node.js is running!')"
# Expected output: Node.js is running!

# 4. Create a project folder
mkdir my-qa-project && cd my-qa-project
npm init -y
# Expected: package.json file created`
        }
      },
      {
        type: "step-animation",
        id: "js-node-verify-step-01",
        title: { tr: "node --version Çıktısı Aslında Neyi Doğrular?", en: "What Does the node --version Output Actually Verify?" },
        steps: [
          { id: 1, icon: "1️⃣", label: { tr: "node --version çalıştırıldığında…", en: "Running node --version…" }, detail: { tr: "node --version çalıştırıldığında terminal, PATH ortam değişkenindeki node.exe dosyasını BULUR ve içine gömülü sürüm bilgisini OKUR — kurulum başarısızsa \"command not found\" hatası bunun yerine gelir.", en: "Running node --version makes the terminal FIND node.exe via the PATH environment variable and READ the version baked into it — if the install failed, you get \"command not found\" instead." } },
          { id: 2, icon: "2️⃣", label: { tr: "npm --version AYRI bir binary'i…", en: "npm --version runs a SEPARATE binary…" }, detail: { tr: "npm --version AYRI bir binary'i (npm.cmd) çalıştırır — Node.js kurulduğunda npm otomatik gelir ama İKİSİ de PATH'te doğru şekilde KAYITLI olmalıdır.", en: "npm --version runs a SEPARATE binary (npm.cmd) — npm ships automatically with Node.js, but BOTH must be correctly REGISTERED on PATH." } },
          { id: 3, icon: "3️⃣", label: { tr: "node -e \"console.log(...)\" ifadesi…", en: "node -e \"console.log(...)\"…" }, detail: { tr: "node -e \"console.log(...)\" ifadesi, -e (evaluate) bayrağıyla dosyaya hiç yazmadan tek satır JavaScript'i DOĞRUDAN çalıştırır — bu, kurulumu bir .js dosyası oluşturmadan HIZLICA test etmenin yoludur.", en: "node -e \"console.log(...)\" uses the -e (evaluate) flag to run a single line of JavaScript DIRECTLY without ever writing a file — a QUICK way to test the install without creating a .js file." } },
          { id: 4, icon: "4️⃣", label: { tr: "mkdir ... && cd ... ifadesindeki && operatörü…", en: "The && operator in mkdir ... && cd ...…" }, detail: { tr: "mkdir my-qa-project && cd my-qa-project ifadesindeki && operatörü, İLK komut BAŞARILI olursa (exit code 0) ikinciyi çalıştırır — mkdir başarısız olursa (klasör zaten varsa) cd hiç ÇALIŞMAZ.", en: "The && operator in mkdir my-qa-project && cd my-qa-project runs the SECOND command only if the FIRST succeeds (exit code 0) — if mkdir fails (folder already exists), cd NEVER runs." } },
          { id: 5, icon: "5️⃣", label: { tr: "npm init -y komutu…", en: "npm init -y…" }, detail: { tr: "npm init -y komutu, HİÇBİR soru sormadan (-y = yes to all) varsayılan değerlerle bir package.json dosyası OLUŞTURUR — bu dosya artık projenin bağımlılık/script kayıt defteridir.", en: "npm init -y CREATES a package.json file with default values, asking NO questions (-y = yes to all) — this file is now the project's dependency/script ledger." } },
        ],
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "macOS (Homebrew)", en: "macOS (Homebrew)" },
        content: {
          tr: `# 1. Homebrew yüklü değilse önce yükle:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Node.js LTS kur
brew install node
# Beklenen: Node.js ve npm birlikte kurulur

# 3. Doğrulama
node --version   # v22.x.x
npm --version    # 10.x.x

# 4. Versiyon yöneticisi (Önerilen — birden fazla proje için)
brew install nvm
nvm install --lts
nvm use --lts`,
          en: `# 1. Install Homebrew if not installed:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js LTS
brew install node
# Expected: Node.js and npm installed together

# 3. Verify
node --version   # v22.x.x
npm --version    # 10.x.x

# 4. Version manager (Recommended — for multiple projects)
brew install nvm
nvm install --lts
nvm use --lts`
        }
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Linux (Ubuntu/Debian)", en: "Linux (Ubuntu/Debian)" },
        content: {
          tr: `# 1. NodeSource deposunu ekle ve Node.js kur
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Beklenen: "Processing triggers for man-db..."

# 2. Doğrulama
node --version   # v22.x.x
npm --version    # 10.x.x

# 3. Global paket izin sorunu varsa (npm EACCES)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# ~/.profile veya ~/.bashrc'ye ekle:
# export PATH=~/.npm-global/bin:$PATH`,
          en: `# 1. Add NodeSource repo and install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Expected: "Processing triggers for man-db..."

# 2. Verify
node --version   # v22.x.x
npm --version    # 10.x.x

# 3. Fix global package permission error (npm EACCES)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add to ~/.profile or ~/.bashrc:
# export PATH=~/.npm-global/bin:$PATH`
        }
      },
      {
        type: "step-animation",
        id: "js-npm-eacces-step-01",
        title: { tr: "npm EACCES Hatası Aslında Neden Olur, mkdir Komutu Bunu Nasıl Çözer?", en: "Why Does npm EACCES Actually Happen, and How Does mkdir Fix It?" },
        steps: [
          { id: 1, icon: "1️⃣", label: { tr: "Varsayılan olarak npm, global paketleri…", en: "By default npm tries to install global packages…" }, detail: { tr: "Varsayılan olarak npm, global paketleri /usr/lib/node_modules gibi SİSTEM SAHİPLİ bir klasöre kurmaya çalışır — normal kullanıcı bu klasöre YAZMA izni olmadığı için npm install -g bir paket EACCES (permission denied) hatasıyla PATLAR.", en: "By default npm tries to install global packages into a SYSTEM-OWNED folder like /usr/lib/node_modules — a regular user has no WRITE permission there, so npm install -g EXPLODES with an EACCES (permission denied) error." } },
          { id: 2, icon: "2️⃣", label: { tr: "mkdir ~/.npm-global komutu…", en: "mkdir ~/.npm-global…" }, detail: { tr: "mkdir ~/.npm-global komutu, kullanıcının KENDİ home dizini altında, kendisine ait (dolayısıyla yazma izni olan) yeni bir klasör OLUŞTURUR.", en: "mkdir ~/.npm-global CREATES a new folder under the user's OWN home directory, one they actually own (and can therefore write to)." } },
          { id: 3, icon: "3️⃣", label: { tr: "npm config set prefix '~/.npm-global' ifadesi…", en: "npm config set prefix '~/.npm-global'…" }, detail: { tr: "npm config set prefix '~/.npm-global' ifadesi, npm'e GLOBAL paketleri artık NEREYE kuracağını söyler — npm'in kendi ayar dosyasına (~/.npmrc) bu tercihi KAYDEDER.", en: "npm config set prefix '~/.npm-global' tells npm WHERE to install global packages from now on — it SAVES this preference into npm's own config file (~/.npmrc)." } },
          { id: 4, icon: "4️⃣", label: { tr: "PATH'e ~/.npm-global/bin EKLENMEDEN…", en: "Without adding ~/.npm-global/bin to PATH…" }, detail: { tr: "PATH'e ~/.npm-global/bin EKLENMEDEN, oraya kurulan komutlar (örn. bir CLI aracı) terminalde TANINMAZ — export PATH=... satırı shell'e \"bu klasördeki çalıştırılabilir dosyalara da BAK\" der.", en: "Without adding ~/.npm-global/bin to PATH, commands installed there (e.g. a CLI tool) are NOT recognized by the terminal — the export PATH=... line tells the shell \"also LOOK for executables in this folder\"." } },
          { id: 5, icon: "5️⃣", label: { tr: "Bu ayar sudo KULLANMADAN…", en: "This setup allows installing global packages…" }, detail: { tr: "Bu ayar sudo KULLANMADAN global paket kurmayı mümkün kılar — sudo npm install -g ile \"hızlıca çözmek\" YAYGIN bir hatadır çünkü dosya sahipliğini root'a çevirir ve SONRAKİ normal npm install komutlarını bozabilir.", en: "This setup makes it possible to install global packages WITHOUT sudo — \"quickly fixing\" it with sudo npm install -g is a COMMON mistake, because it flips file ownership to root and can break SUBSEQUENT normal npm install commands." } },
        ],
      },
      {
        type: "code",
        language: "bash",
        label: { tr: "Playwright Projesi Kurulumu (Tüm OS)", en: "Playwright Project Setup (All OS)" },
        content: {
          tr: `# Yeni Playwright projesi oluştur
npm init playwright@latest

# Beklenen sorular:
# > Where to put your end-to-end tests? tests/
# > Add a GitHub Actions workflow? (y/N) N (şimdilik)
# > Install Playwright browsers? (Y/n) Y

# Kurulum sonrası doğrulama
npx playwright --version        # Playwright v1.x.x
npx playwright test --list      # Test dosyalarını listeler

# İlk testi çalıştır
npx playwright test
# Beklenen çıktı: X passed (Xm Xs)`,
          en: `# Create a new Playwright project
npm init playwright@latest

# Expected prompts:
# > Where to put your end-to-end tests? tests/
# > Add a GitHub Actions workflow? (y/N) N (for now)
# > Install Playwright browsers? (Y/n) Y

# Verify after setup
npx playwright --version        # Playwright v1.x.x
npx playwright test --list      # Lists all test files

# Run first test
npx playwright test
# Expected output: X passed (Xm Xs)`
        }
      },
      {
        type: "step-animation",
        id: "js-playwright-init-step-01",
        title: { tr: "npm init playwright@latest Perde Arkasında Kaç Adım Atar?", en: "How Many Steps Does npm init playwright@latest Take Behind the Scenes?" },
        steps: [
          { id: 1, icon: "1️⃣", label: { tr: "npm init playwright@latest çalıştırıldığında…", en: "Running npm init playwright@latest…" }, detail: { tr: "npm init playwright@latest çalıştırıldığında npm, Playwright'ın kurulum SİHİRBAZI paketini npm registry'den GEÇİCİ olarak indirir ve ÇALIŞTIRIR — bu paket projene kalıcı olarak eklenmez, sadece kurulum ADIMLARINI yürütür.", en: "Running npm init playwright@latest makes npm TEMPORARILY download and RUN Playwright's setup WIZARD package from the npm registry — this package is not permanently added to your project, it just executes the setup STEPS." } },
          { id: 2, icon: "2️⃣", label: { tr: "Sihirbaz \"Where to put your end-to-end tests?\" diye SORDUĞUNDA…", en: "When the wizard asks \"Where to put your end-to-end tests?\"…" }, detail: { tr: "Sihirbaz \"Where to put your end-to-end tests?\" diye SORDUĞUNDA verdiğin cevap (örn. tests/), playwright.config.ts içindeki testDir DEĞERİNİ belirler.", en: "When the wizard asks \"Where to put your end-to-end tests?\", your answer (e.g. tests/) sets the testDir VALUE inside playwright.config.ts." } },
          { id: 3, icon: "3️⃣", label: { tr: "\"Install Playwright browsers?\" sorusuna Y cevabı verilirse…", en: "Answering Y to \"Install Playwright browsers?\"…" }, detail: { tr: "\"Install Playwright browsers?\" sorusuna Y cevabı verilirse, Chromium/Firefox/WebKit binary'leri ~/.cache/ms-playwright dizinine İNDİRİLİR — bu adım internet bağlantısı GEREKTİRİR ve birkaç dakika sürebilir.", en: "Answering Y to \"Install Playwright browsers?\" DOWNLOADS the Chromium/Firefox/WebKit binaries into ~/.cache/ms-playwright — this step REQUIRES an internet connection and can take a few minutes." } },
          { id: 4, icon: "4️⃣", label: { tr: "npx playwright --version, npx'in ÖNCE…", en: "npx playwright --version shows that npx FIRST…" }, detail: { tr: "npx playwright --version, npx'in ÖNCE proje içindeki node_modules/.bin klasöründe Playwright CLI'ını ARADIĞINI, bulamazsa global kuruluma BAKTIĞINI gösterir — bu yüzden proje-bazlı sürüm çakışmaları önlenir.", en: "npx playwright --version shows that npx FIRST LOOKS for the Playwright CLI inside the project's node_modules/.bin folder, and only CHECKS the global install if it's not found there — this is why per-project version conflicts are avoided." } },
          { id: 5, icon: "5️⃣", label: { tr: "npx playwright test çalıştırıldığında…", en: "Running npx playwright test…" }, detail: { tr: "npx playwright test çalıştırıldığında, sihirbazın oluşturduğu örnek test dosyaları (tests/example.spec.ts) OTOMATİK bulunur ve ÇALIŞTIRILIR — \"X passed\" çıktısı, hem kurulumun hem de test runner'ın DOĞRU çalıştığının kanıtıdır.", en: "Running npx playwright test AUTOMATICALLY finds and RUNS the example test files the wizard created (tests/example.spec.ts) — the \"X passed\" output is proof that both the install and the test runner are working CORRECTLY." } },
        ],
      },
      {
        type: "installation",
        title: { tr: "Hızlı Kontrol Listesi", en: "Quick Verification Checklist" },
        steps: [
          {
            cmd: "node --version",
            explanation: {
              tr: "Node.js sürümünü kontrol eder. v18+ LTS sürümü gereklidir. Çıktı örneği: v22.4.0",
              en: "Checks Node.js version. v18+ LTS required. Expected output: v22.4.0"
            }
          },
          {
            cmd: "npm --version",
            explanation: {
              tr: "npm paket yöneticisi sürümünü kontrol eder. Çıktı örneği: 10.8.1",
              en: "Checks npm package manager version. Expected output: 10.8.1"
            }
          },
          {
            cmd: "node -e \"console.log('JS OK')\"",
            explanation: {
              tr: "Node.js'nin düzgün çalıştığını doğrular. Çıktı: JS OK",
              en: "Verifies Node.js is running correctly. Expected output: JS OK"
            }
          },
          {
            cmd: "npx playwright --version",
            explanation: {
              tr: "Playwright kuruluysa sürümünü gösterir. Çıktı örneği: Version 1.48.0",
              en: "Shows Playwright version if installed. Expected output: Version 1.48.0"
            }
          }
        ]
      },
      jsNodeNpmSetupFilm,
      jsNodeNpmInstallPractice,
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'js-node-npm-setup-order-01',
        question: { tr: 'Sıfırdan bir Node.js + Playwright test projesi kurulum sırasını diz.', en: 'Order the steps for setting up a Node.js + Playwright test project from scratch.' },
        items: [
          { id: '1', text: { tr: 'Node.js LTS sürümünü indir ve kur (nodejs.org)', en: 'Download and install the Node.js LTS version (nodejs.org)' }, order: 1 },
          { id: '2', text: { tr: 'node --version ve npm --version ile kurulumu doğrula', en: 'Verify the install with node --version and npm --version' }, order: 2 },
          { id: '3', text: { tr: 'mkdir my-qa-project && cd my-qa-project ile proje klasörü oluştur', en: 'Create the project folder with mkdir my-qa-project && cd my-qa-project' }, order: 3 },
          { id: '4', text: { tr: 'npm init playwright@latest ile Playwright projesini kur', en: 'Set up the Playwright project with npm init playwright@latest' }, order: 4 },
          { id: '5', text: { tr: 'npx playwright test ile ilk örnek testi çalıştır', en: 'Run the first example test with npx playwright test' }, order: 5 },
        ],
        xpReward: 10,
      },
      {
        type: "quiz",
        question: {
          tr: "JavaScript kütüphanelerini (Playwright vb.) projeye eklemek için hangi aracı kullanırız?",
          en: "Which tool do we use to add JavaScript libraries (like Playwright) to our project?"
        },
        options: [
          { id: "a", text: "Maven (pom.xml)" },
          { id: "b", text: "pip install" },
          { id: "c", text: { tr: "npm (Node Package Manager)", en: "npm (Node Package Manager)" } },
          { id: "d", text: "Gradle" }
        ],
        correct: "c",
        explanation: {
          tr: "npm, Node.js ekosisteminin bağımlılık yöneticisidir. Java'daki Maven/pom.xml neyse, Node.js dünyasında da package.json ve npm odur.",
          en: "npm is the dependency manager of the Node.js ecosystem. What Maven/pom.xml is to Java, package.json and npm are to Node.js."
        },
        retryQuestion: {
          question: {
            tr: "Node.js nedir?",
            en: "What is Node.js?"
          },
          options: [
            { id: "a", text: { tr: "Bir tarayıcı eklentisidir", en: "A browser plugin" } },
            { id: "b", text: { tr: "JavaScript'i tarayıcı dışında (sunucu/local) çalıştırma ortamıdır", en: "A runtime to run JavaScript outside the browser" } },
            { id: "c", text: { tr: "Yeni bir veri tabanı türüdür", en: "A new type of database" } },
            { id: "d", text: { tr: "Sadece CSS yazmak için kullanılır", en: "Used only for writing CSS" } }
          ],
          correct: "b",
          explanation: {
            tr: "Node.js, Google Chrome'un V8 motorunu temel alarak JavaScript kodlarının sunucularda veya bilgisayarınızda (local) bağımsız olarak çalışabilmesini sağlar.",
            en: "Node.js builds on Google Chrome's V8 engine to let JavaScript run standalone on servers or local machines."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "npm (Node Package Manager), bir şehrin lojistik merkezi gibidir: dünyada yazılmış milyonlarca JavaScript kütüphanesi burada depolanır ve `npm install playwright` yazdığında sistem o kütüphaneyi bulup projenin `node_modules` deposuna teslim eder. Peki neden böyle bir sisteme ihtiyaç var? Çünkü her projede sıfırdan HTTP client, test runner, linter yazmak hem zaman kaybı hem de hata kaynağıdır. Java'da Maven veya Gradle `pom.xml`/`build.gradle` üzerinden bağımlılıkları yönetir; JavaScript'te `npm + package.json` tam olarak aynı rolü üstlenir. QA'da kritik nokta: `npm install @playwright/test` yazıp `npx playwright install` çalıştırmak, Selenium'da WebDriverManager bağımlılığı ekleyip driver indirmekle aynı mantıktır — ama Playwright bunu tek komutta halleder ve bu fark CI pipeline kurma sürenizi yarıya indirebilir.",
          en: "npm (Node Package Manager) is like a city's logistics hub: millions of JavaScript libraries written around the world are stored here, and when you type `npm install playwright` the system locates that library and delivers it to your project's `node_modules` warehouse. Why is such a system necessary? Because writing an HTTP client, test runner, and linter from scratch in every project wastes time and introduces bugs. In Java, Maven or Gradle manages dependencies via `pom.xml`/`build.gradle`; in JavaScript `npm + package.json` plays exactly the same role. The critical QA point: running `npm install @playwright/test` then `npx playwright install` is logically identical to adding a WebDriverManager dependency in Selenium and downloading drivers — but Playwright handles it in one command, which can cut your CI pipeline setup time in half."
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`node_modules` klasörü, projenin tüm bağımlılık ağacının fiziksel deposudur — yüzlerce MB olabilir ve binlerce dosya içerir. Neden `.gitignore`'a eklenir? Çünkü bu klasörün içeriği `package.json`'dan türetilebilir: `npm install` çalıştırıldığında sıfırdan yeniden oluşturulur. Bu, Java'daki Maven yerel deposuna (`.m2/repository`) benzer — proje kaynak kodu git'te saklanır ama indirilen jar'lar saklanmaz. QA açısından kritik senaryo: CI pipeline'ınızda `node_modules` cache'lenmezse her build'de `npm install` çalışır ve binlerce paketi internetten indirir; bu birkaç dakika sürer. `npm ci` komutu `package-lock.json`'u kullanarak deterministik yükleme yapar ve CI'da tercih edilmelidir — `npm install`'ın aksine lock dosyasından sapma varsa hata verir, böylece CI'daki 'bende çalışıyor ama CI'da çalışmıyor' sorununu önler.",
          en: "`node_modules` is the physical warehouse of the entire dependency tree — it can be hundreds of MB and contain thousands of files. Why add it to `.gitignore`? Because its contents are fully derived from `package.json`: running `npm install` rebuilds it from scratch. This mirrors Java's Maven local repository (`.m2/repository`) — project source goes in git, downloaded jars do not. Critical QA scenario: if `node_modules` is not cached in your CI pipeline, every build runs `npm install` and downloads thousands of packages from the internet, taking several minutes. Use `npm ci` instead — it installs deterministically from `package-lock.json` and errors if the lock file has drifted, preventing the classic 'works on my machine but fails in CI' problem."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Node.js kurmak, bir şehre elektrik santralı kurmak gibidir: santral olmadan şehirdeki hiçbir cihaz çalışmaz; Node.js olmadan da bilgisayarında JavaScript kodu çalıştıramazsın. Peki neden tarayıcıda çalışan JavaScript için ayrıca Node.js kurmak gerekiyor? Çünkü tarayıcı JavaScript'i kendi içinde çalıştırır (güvenlik kısıtlamalarıyla), ama Playwright test runner'ı dosya sistemi erişimine, süreç yönetimine ve ağ soketlerine ihtiyaç duyar — bunlar tarayıcı dışı yetkilerdir ve Node.js bunları sağlar. Java'da JVM'i kurmadan `java -jar` çalıştıramazsın; JavaScript'te Node.js kurulmadan `npx playwright test` çalıştıramazsın — aynı mantık. npm ise bu santralin katalog sistemidir: mevcut tüm JavaScript kütüphanelerini listeler ve sipariş vermenizi sağlar.",
          en: "Installing Node.js is like building a power plant for a city: without the plant no device in the city works; without Node.js you cannot run JavaScript on your computer. But why install Node.js when JavaScript already runs in the browser? Because the browser runs JavaScript with security restrictions — it cannot access file systems or spawn processes. Playwright's test runner needs file system access, process management, and network sockets — those are out-of-browser permissions that Node.js provides. In Java you cannot run `java -jar` without installing the JVM; in JavaScript you cannot run `npx playwright test` without installing Node.js — the exact same logic. npm is the plant's catalog system: it lists all available JavaScript libraries and lets you order them."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`package.json` içindeki `\"dependencies\"` ve `\"devDependencies\"` listesi, bir inşaat projesinin malzeme listesi gibidir — hangi malzemenin hangi versiyonundan gerektiği yazılıdır. `npm install` bu listeyi okuyup her malzemeyi tedarikçiden sipariş eder. Neden iki ayrı liste? `dependencies` son kullanıcıya da giden üretim malzemeleridir (örneğin axios HTTP client); `devDependencies` ise sadece inşaat sırasında kullanılan alet-edevattır (örneğin Playwright, ESLint) — son ürüne dahil edilmez. Java'da Maven'da `<scope>test</scope>` ile test bağımlılıklarını ayırt etmek aynı mantıktır. QA'da bu ayrım önemlidir: Playwright her zaman `devDependencies`'e gitmeli — `dependencies`'e koyarsan production bundle gereksiz yere şişer ve CI maliyetlerin artar.",
          en: "The `\"dependencies\"` and `\"devDependencies\"` lists in `package.json` are like a construction project's materials list — specifying which material and which version is needed. `npm install` reads this list and orders every material from suppliers. Why two separate lists? `dependencies` are production materials that ship to end users (e.g., axios HTTP client); `devDependencies` are tools used only during construction (e.g., Playwright, ESLint) — not included in the final product. This is identical to Maven's `<scope>test</scope>` for separating test dependencies. The QA implication: Playwright should always go in `devDependencies` — putting it in `dependencies` unnecessarily bloats your production bundle and increases CI costs."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden tarayıcıdaki JavaScript dosya sistemine erişemiyor ama Node.js erişebiliyor? Tarayıcıda çalışan JavaScript'e güvenlik duvarı çekilmiştir: ziyaret ettiğin bir web sitesi bilgisayarındaki dosyaları okuyabilseydi bu ciddi bir güvenlik açığı olurdu. Node.js ise tarayıcı dışında çalışır — güvenlik duvarı yoktur, işletim sistemi kaynaklarına doğrudan bağlanır. Bu farkı anlamak QA mühendisi için kritiktir: Playwright'ın `page.screenshot()` ile ekran görüntüsü alması ve bunu diske yazması Node.js'in dosya sistemi erişimi sayesinde mümkündür; aynı kodu tarayıcı içinde çalıştıramazsın. Java'da bu ayrım daha nettir: JVM native API'lere erişirken, Java Applet (artık ölü) tarayıcıda sandbox'ta çalışırdı. JavaScript'te aynı dil için iki ayrı runtime var: tarayıcı (kısıtlı) ve Node.js (tam yetkili).",
          en: "Why can browser JavaScript not access the file system while Node.js can? Browser JavaScript runs behind a security wall: if a website you visit could read your local files, that would be a critical security breach. Node.js runs outside the browser — there is no security wall, it connects directly to OS resources. Understanding this distinction is critical for QA engineers: Playwright's `page.screenshot()` capturing and writing to disk is only possible because of Node.js file system access; you cannot run that same code inside a browser. In Java this split is clearer: the JVM accesses native APIs directly, while Java Applets (now dead) ran sandboxed in browsers. In JavaScript the same language has two runtimes: browser (restricted) and Node.js (full access)."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `npm install --save-dev` ile `npm install` farklı sonuçlar doğuruyor? Bir şantiyeyi düşün: beton, demir, cam (production materials) bina içinde kalır; inşaat iskeleti, kazma, matkap (dev tools) bina teslim edildikten sonra kaldırılır. `npm install` paketi `dependencies`'e kaydeder — son kullanıcıya gider. `npm install --save-dev` ise `devDependencies`'e kaydeder — yalnızca geliştirme ortamında bulunur. Playwright, Jest, ESLint son kullanıcıya neden gönderilmez? Çünkü son kullanıcı testleri çalıştırmaz, kod kalitesini kontrol etmez. Bu ayrımı ihmal etmek, production bundle'ı gereksiz yere şişirir — test framework kütüphaneleri megabytes'larca büyük olabilir. Java'da Maven'in `<scope>provided</scope>` ve `<scope>test</scope>` kavramıyla birebir aynı mantık; production deployment'ta test bağımlılıkları dışarıda bırakılır.",
          en: "Why does `npm install --save-dev` produce different results than `npm install`? Think of a construction site: concrete, steel, glass (production materials) stay inside the building; scaffolding, drills, and hammers (dev tools) are removed after delivery. `npm install` saves the package to `dependencies` — it ships to end users. `npm install --save-dev` saves to `devDependencies` — present only in the development environment. Why shouldn't Playwright, Jest, and ESLint be sent to end users? Because end users do not run tests or check code quality. Neglecting this distinction bloats the production bundle unnecessarily — test framework libraries can be megabytes in size. This is identical in concept to Maven's `<scope>provided</scope>` and `<scope>test</scope>`: test dependencies are excluded from production deployments."
        }
      },
      {
        type: "quiz",
        question: { tr: "`package.json` dosyasındaki bağımlılıkları yeniden yüklemek için hangi komut kullanılır?", en: "Which command reinstalls all dependencies listed in `package.json`?" },
        options: [
          { id: "a", text: { tr: "`node install`", en: "`node install`" } },
          { id: "b", text: { tr: "`npm run build`", en: "`npm run build`" } },
          { id: "c", text: { tr: "`npm install`", en: "`npm install`" } },
          { id: "d", text: { tr: "`node_modules install`", en: "`node_modules install`" } }
        ],
        correct: "c",
        explanation: { tr: "`npm install` komutu, `package.json` dosyasındaki tüm bağımlılıkları okuyarak `node_modules` klasörüne yükler. Klonlanan bir projede her zaman önce bu komut çalıştırılır.", en: "`npm install` reads every dependency listed in `package.json` and installs them all into `node_modules`. Always run this first after cloning a project." },
        retryQuestion: {
          question: { tr: "`npm init -y` komutu ne yapar?", en: "What does `npm init -y` do?" },
          options: [
            { id: "a", text: "Node.js günceller / Updates Node.js" },
            { id: "b", text: { tr: "Tüm soruları otomatik \"evet\" ile geçip package.json oluşturur", en: "Creates package.json with all defaults automatically" } },
            { id: "c", text: "Projeyi siler / Deletes the project" },
            { id: "d", text: "npm'i günceller / Updates npm" }
          ],
          correct: "b",
          explanation: { tr: "`npm init -y` tüm yapılandırma sorularını otomatik varsayılan değerlerle yanıtlayarak bir `package.json` dosyası oluşturur.", en: "`npm init -y` answers all configuration questions with default values and instantly creates a `package.json` file — `-y` means \"yes to all\"." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: What is Node.js and why do we need to install it? What does npm do? How does it relate to Maven in Java?",
        promptTr: "🤖 Mini Kahraman Soruyor: Node.js nedir ve neden bilgisayarımıza kurmak zorundayız? npm ise ne işe yarar? Java'daki Maven ile nasıl bir bağlantısı var?",
        keywords: [
              ["motor", "engine"],
              ["çalıştırma", "runtime"],
              ["dışında", "outside"],
              ["paket", "package"],
              ["bağımlılık", "dependency"],
              ["tarayıcı", "browser"],
              "npm",
              ["kurulum", "install"],
              ["yönetici", "manager"],
              ["proje", "project"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — Variables & Operators
  // ─────────────────────────────────────────────
  {
    title: { tr: "Değişkenler & Operatörler", en: "Variables & Operators" },
    blocks: [
      {
        type: "simple-box",
        emoji: "📦",
        content: {
          tr: "JavaScript'teki `var`, `let` ve `const`, üç farklı depolama kabı gibidir: `var` altı delik bir kova — içine koyduğun değer fonksiyon sınırı dışına sızabilir (hoisting + function scope). `let` kapağı olan bir kutu — değeri değiştirebilirsin ama sadece tanımlandığı blok içinde erişilebilir. `const` ise mühürlenmiş bir kutu — bir kez doldurursun, referansını asla değiştiremezsin. Peki neden üç ayrı keyword var? `var`'ın fonksiyon scope'u, döngülerde beklenmedik davranışlara yol açıyordu: bir `for` döngüsü içindeki `var i` döngü dışında da erişilebilir kalıyordu — bu Java'da asla olmaz çünkü Java'daki tüm değişkenler blok kapsamlıdır. ES6 ile `let` ve `const` bu problemi çözdü. Java'da `final` ile `const`'ı karşılaştırırsan: her ikisi de yeniden atamayı yasaklar, ama `const` bir nesneye referans tutuyorsa nesnenin içeriği değiştirilebilir — Java'da `final List<String> list` listene eleman ekleyebilirsin, aynı şekilde. QA perspektifinden: `const` ile tanımlanan locator değişkeni test boyunca sabit kalır, accidental reassignment'tan korur.",
          en: "JavaScript's `var`, `let`, and `const` are like three different storage containers: `var` is a leaky bucket — its value can seep outside function boundaries (hoisting + function scope). `let` is a lidded box — the value is changeable but only accessible within its declared block. `const` is a sealed box — filled once, the reference can never be changed. Why three keywords? `var`'s function scope caused unexpected behavior in loops: a `var i` inside a `for` loop remained accessible outside — this never happens in Java because all Java variables are block-scoped. ES6 introduced `let` and `const` to fix this. Comparing Java's `final` with `const`: both forbid reassignment, but if `const` holds a reference to an object, the object's contents can still change — just like Java's `final List<String> list` allows you to add elements. QA perspective: a locator variable declared with `const` stays fixed throughout the test, protecting against accidental reassignment."
        }
      },
      {
        type: "js-variables-visual"
      },
      {
        type: "heading",
        content: { tr: "var, let, const Farkları", en: "Differences between var, let, and const" }
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "var", en: "var" },
          { tr: "let", en: "let" },
          { tr: "const", en: "const" }
        ],
        rows: [
          [
            { tr: "Scope (Kapsam)", en: "Scope" },
            { tr: "Function Scope (Sızabilir)", en: "Function Scope" },
            { tr: "Block Scope (Korumalı)", en: "Block Scope" },
            { tr: "Block Scope (Korumalı)", en: "Block Scope" }
          ],
          [
            { tr: "Yeniden Atama", en: "Re-assignment" },
            { tr: "Serbest (Evet)", en: "Allowed (Yes)" },
            { tr: "Serbest (Evet)", en: "Allowed (Yes)" },
            { tr: "Yasak (Hata verir)", en: "Forbidden (Throws error)" }
          ],
          [
            { tr: "Hoisting (Yukarı çekme)", en: "Hoisting" },
            { tr: "Tanımsız (undefined) sızar", en: "undefined leaks" },
            { tr: "Erişilemez (Temporal Dead Zone)", en: "Temporal Dead Zone" },
            { tr: "Erişilemez (Temporal Dead Zone)", en: "Temporal Dead Zone" }
          ]
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Değişkenlerin ve karşılaştırmaların farklarını inceleyin!
let score = 95;
const player = "Lego Hero";
// player = "New Hero"; // Bu satırın başındaki yorum işaretini kaldırırsanız hata verir!

let a = 5;
let b = "5";
console.log("== (Gevşek Eşitlik):", a == b);  // true
console.log("=== (Sıkı Eşitlik):", a === b); // false`,
          en: `// Examine variable scopes and strict comparison operators!
let score = 95;
const player = "Lego Hero";
// player = "New Hero"; // Uncommenting this line will crash the program!

let a = 5;
let b = "5";
console.log("== (Loose Equality):", a == b);   // true
console.log("=== (Strict Equality):", a === b); // false`
        }
      },
      jsVarScopeFilm,
      jsVarScopeSteps,
      {
        type: "quiz",
        question: {
          tr: "Aşağıdakilerden hangisi `const` ile tanımlanmış bir değişkene yeni bir değer atamaya çalışırsa oluşur?",
          en: "What happens if you try to reassign a new value to a `const` variable?"
        },
        options: [
          { id: "a", text: { tr: "Değişken otomatik olarak 'let'e dönüşür", en: "The variable converts to 'let' automatically" } },
          { id: "b", text: { tr: "JavaScript sessizce işlemi görmezden gelir", en: "JavaScript silently ignores the operation" } },
          { id: "c", text: { tr: "TypeError hatası fırlatılır (Çalışma zamanında)", en: "A TypeError is thrown at runtime" } },
          { id: "d", text: { tr: "Değişkenin değeri 0 olur", en: "The variable becomes 0" } }
        ],
        correct: "c",
        explanation: {
          tr: "`const` (constant - sabit), tanımlandıktan sonra yeniden atama (re-assignment) yapılamayan değişken türüdür. Yeniden atama denemesi `TypeError: Assignment to constant variable.` hatasına yol açar.",
          en: "`const` (constant) variables cannot be reassigned after declaration. Attempting to do so throws `TypeError: Assignment to constant variable.`"
        },
        retryQuestion: {
          question: {
            tr: "Hoisting (Yukarı Çekme) durumunda `var` ile `let` arasındaki en büyük fark nedir?",
            en: "What is the biggest difference in hoisting between `var` and `let`?"
          },
          options: [
            { id: "a", text: { tr: "`var` değişkenleri hata fırlatır, `let` undefined döner", en: "`var` throws an error, `let` returns undefined" } },
            { id: "b", text: { tr: "`var` 'undefined' değerle yukarı çekilirken, `let` tanımlanana kadar Temporal Dead Zone'da kalır (hata fırlatır)", en: "`var` is hoisted with 'undefined', while `let` stays in Temporal Dead Zone (throws error) until defined" } },
            { id: "c", text: { tr: "`let` global scope sızıntısı yapar", en: "`let` leaks global scope variables" } },
            { id: "d", text: { tr: "Hiçbir fark yoktur", en: "There is no difference" } }
          ],
          correct: "b",
          explanation: {
            tr: "`var` ile tanımlanan değişkenler kod bloğunun tepesine çekilir ve atanmadan önce okunduğunda `undefined` döndürür. `let` ve `const` ise Temporal Dead Zone'da (TDZ) kalır ve atanmadan erişilirse `ReferenceError` fırlatır.",
            en: "`var` variables are hoisted to the top of their scope and return `undefined` if accessed before initialization. `let` and `const` remain in the Temporal Dead Zone (TDZ) and throw `ReferenceError` if accessed before declaration."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`const`'ı bir kontrat imzalamak gibi düşün: \"bu değer burada kalacak\" diye söz veriyorsun. `let` ise bir ajanda sayfasıdır — bugün ne yazsan yarın değiştirebilirsin. `var` ise tüm ekibin aynı anda düzenlediği paylaşık bir doküman — değer nasıl değişti, kim değiştirdi, hangi satırda? Bulmak debug süreci istiyor. Peki neden `const` varsayılan tercih olmalı? Bir değişkenin `const` olduğunu görünce o değerin hiçbir zaman yeniden atanmayacağını anlarsın — bu bilgi kodu okurken kafa karışıklığını azaltır ve debugging süresini dramatik ölçüde kısaltır. Java'da benzer durum: `final int x = 5;` yazdığında okuyucu bunun sabit bir değer olduğunu anında kavrar. QA'da önem: Playwright'ta `const page = await browser.newPage()` yazılır; `page` referansı test boyunca aynı kalır — `let` kullanmak gereksiz yeniden atama riskini taşır ve code review'da kırmızı bayrak olur.",
          en: "Think of `const` as signing a contract: \"this value will stay here,\" you have promised. `let` is a daily planner page — whatever you write today you can change tomorrow. `var` is a shared document everyone on the team edits at the same time — how did the value change, who changed it, on which line? Finding the answer requires debugging. Why should `const` be the default choice? When you see a variable declared with `const`, you immediately know it will never be reassigned — this knowledge reduces mental load while reading code and dramatically shortens debugging time. Java equivalent: `final int x = 5;` instantly communicates to readers that this is a fixed value. QA importance: in Playwright, `const page = await browser.newPage()` is the standard — the `page` reference stays the same throughout the test. Using `let` introduces unnecessary reassignment risk and is a red flag in code reviews."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `var` kullanımdan kalktı ve modern JavaScript'te neden `let`/`const` tercih edilir? `var`'ın temel sorunu function scope — döngü veya `if` bloğu içinde tanımlanan `var` değişkeni o bloğun dışında da erişilebilir kalır. Java'da böyle bir şey imkansız: blok kapandığında değişken ölür. Örneğin `for (var i = 0; i < 5; i++) {}; console.log(i)` yazarsan `i`'nin değerini döngü dışında hâlâ görebilirsin — bu, test otomasyonunda döngü değişkenlerinin test adımları arasında sızmasına yol açar. Dahası `var` hoisting: JavaScript motoru `var` bildirimlerini scope'un tepesine taşır ve değer atamadan önce okunduğunda `undefined` döner — sessiz bir bug kaynağı. `let` ve `const` bu her iki sorunu da çözdü: block scope ve Temporal Dead Zone (TDZ). TDZ, tanımlanmadan erişilirse `ReferenceError` fırlatır — Java'daki compile-time hatanın runtime karşılığı.",
          en: "Why did `var` fall out of use and why are `let`/`const` preferred in modern JavaScript? The root problem with `var` is function scope — a `var` variable declared inside a loop or `if` block remains accessible outside that block. In Java this is impossible: a variable dies when its block closes. For example, `for (var i = 0; i < 5; i++) {}; console.log(i)` still shows `i`'s value outside the loop — in test automation this means loop variables can leak between test steps. Additionally, `var` hoisting: the JavaScript engine moves `var` declarations to the top of their scope, returning `undefined` if read before assignment — a silent bug source. `let` and `const` solve both problems: block scope and the Temporal Dead Zone (TDZ). TDZ throws a `ReferenceError` if accessed before declaration — the runtime equivalent of Java's compile-time error."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `const` varsayılan tercih olmalı? Bir değişkeni `const` ile tanımlamak, okuyucuya bir söz vermektir: \"bu referans hiçbir zaman değişmeyecek.\" Kodu okuyan bir QA mühendisi `const` gördüğünde değerin nerede değiştiğini izlemek zorunda kalmaz — debug kapsamı daraltılır. Java'da `final` aynı amacı güder: `final WebDriver driver = new ChromeDriver();` yazılmışsa `driver` referansının testin hiçbir adımında değiştirilmediğini bilirsin. Buna karşın `const`'ın bir nüansı var: referans sabittir ama nesnenin içeriği değişebilir. `const arr = []; arr.push(1)` geçerlidir — nesne mutasyona uğrayabilir. Bu, Playwright test suitelerinde önemlidir: `const results = []` ile başlatıp döngüde `results.push(item)` yazabilirsin, `const`'u bozmadan.",
          en: "Why should `const` be the default choice? Declaring a variable with `const` is a promise to the reader: \"this reference will never change.\" A QA engineer reading `const` does not need to trace where the value might be mutated — it narrows the debugging scope immediately. Java's `final` serves the same purpose: `final WebDriver driver = new ChromeDriver();` tells you that `driver` is never reassigned in any test step. There is one nuance though: `const` fixes the reference, not the object's contents. `const arr = []; arr.push(1)` is perfectly valid — the object can still be mutated. This matters in Playwright test suites: you can `const results = []` and then loop `results.push(item)` without breaking the `const` contract."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki kod çalıştırıldığında ne olur?\n```js\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);\n```", en: "What happens when this code runs?\n```js\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);\n```" },
        options: [
          { id: "a", text: { tr: "Hata verir — const değiştirilemez", en: "Throws an error — const cannot be changed" } },
          { id: "b", text: { tr: "`[1, 2, 3, 4]` yazdırır — referans sabittir ama içerik değiştirilebilir", en: "Prints `[1, 2, 3, 4]` — the reference is fixed but contents can mutate" } },
          { id: "c", text: { tr: "`[1, 2, 3]` yazdırır — push çalışmaz", en: "Prints `[1, 2, 3]` — push has no effect" } },
          { id: "d", text: { tr: "`undefined` yazdırır", en: "Prints `undefined`" } }
        ],
        correct: "b",
        explanation: { tr: "`const` yalnızca değişkenin yeniden atanmasını (reassignment) engeller, nesne veya dizinin içeriğinin değiştirilmesini (mutation) engellemez. `arr = [5]` yazsaydın hata alırdın; ama `arr.push(4)` mevcut dizinin içeriğini değiştirir, bu izin verilir.", en: "`const` only prevents reassignment of the variable itself, not mutation of the object or array it points to. `arr = [5]` would throw; but `arr.push(4)` mutates the existing array's contents — that is allowed." },
        retryQuestion: {
          question: { tr: "Hangi keyword yalnızca tanımlandığı blok içinde geçerlidir (block-scoped)?", en: "Which keyword is block-scoped — only accessible within the block where it is declared?" },
          options: [
            { id: "a", text: "var" },
            { id: "b", text: "let ve const / let and const" },
            { id: "c", text: "function" },
            { id: "d", text: "global" }
          ],
          correct: "b",
          explanation: { tr: "`let` ve `const` block-scoped'dır: `if`, `for`, `while` gibi bloklar içinde tanımlandıklarında sadece o blok içinde erişilebilirler.", en: "`let` and `const` are block-scoped: declared inside an `if`, `for`, or `while` block, they are only accessible within that exact block." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How would you explain var, let, and const to someone who has never written code? Can you also connect const to Java's final keyword?",
        promptTr: "🤖 Mini Kahraman Soruyor: var, let ve const'u hiç kod yazmamış birine anlatmak zorunda kalsan nasıl açıklardın? Java'daki final anahtar kelimesiyle const arasındaki bağlantıyı da kurabilir misin?",
        keywords: [
              ["kutu", "box"],
              ["sabit", "fixed"],
              ["kilitli", "locked"],
              ["değiştirilemez", "cannot"],
              ["kapsam", "scope"],
              ["blok", "block"],
              ["sızdırır", "leaks"],
              "const",
              "let",
              "var"
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 3 — Data Types & Functions
  // ─────────────────────────────────────────────
  {
    title: { tr: "Veri Tipleri & Fonksiyonlar", en: "Data Types & Functions" },
    blocks: [
      {
        type: "css-animation",
        kind: "datatypes",
        label: { tr: "Primitive (Stack) vs Reference (Heap) Tipleri", en: "Primitive (Stack) vs Reference (Heap) Types" }
      },
      {
        type: "simple-box",
        emoji: "📊",
        content: {
          tr: "JavaScript veri tipleri iki gruba ayrılır ve bu ayrımı anlamak test otomasyonunda kritiktir. Primitive tipler (String, Number, Boolean, Null, Undefined, Symbol, BigInt) posta pulu gibidir: değerini üzerinde taşır, kopyalandığında tam bağımsız bir kopya oluşur. Reference tipler (Object, Array, Function) ise posta kutusunun anahtarı gibidir: anahtar kopyalandığında iki anahtar da aynı kutuyu açar — birisi içeriği değiştirince diğeri de değişimi görür. Peki bu neden önemli? Java'da primitive (`int`, `boolean`) ile reference (`List`, `Map`) ayrımı aynıdır ve benzer sorunlara yol açar: `int a = b;` değer kopyalar, `List<String> a = b;` referans kopyalar. QA perspektifinden kritik senaryo: test verisi nesnesini iki test arasında paylaşırsan ve biri içeriği değiştirirse diğer test bozulur — flaky test'in klasik kaynağı. Çözüm: her test için `JSON.parse(JSON.stringify(data))` ile derin kopya almak veya spread `{...config}` kullanmak.",
          en: "JavaScript data types split into two groups and understanding this distinction is critical in test automation. Primitive types (String, Number, Boolean, Null, Undefined, Symbol, BigInt) are like postage stamps: the value is carried on the stamp itself, and copying creates a fully independent duplicate. Reference types (Object, Array, Function) are like a key to a mailbox: copying the key gives two keys that open the same box — if one person changes the contents, the other sees the change too. Why does this matter? In Java the primitive (`int`, `boolean`) vs reference (`List`, `Map`) distinction is identical and causes the same issues: `int a = b` copies the value, `List<String> a = b` copies the reference. Critical QA scenario: if you share a test data object between two tests and one mutates it, the other test breaks — the classic source of flaky tests. Solution: use `JSON.parse(JSON.stringify(data))` for deep copy or spread `{...config}` for shallow copy."
        }
      },
      {
        type: "heading",
        content: { tr: "Primitive Tipler — 7 Temel Yapı Taşı", en: "Primitive Types — 7 Building Blocks" }
      },
      {
        type: "table",
        headers: [
          { tr: "Tip", en: "Type" },
          { tr: "Örnek Değer", en: "Example Value" },
          { tr: "typeof Sonucu", en: "typeof Result" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["String",  `"hello"`,      `"string"`,    "String"],
          ["Number",  "42 / 3.14",    `"number"`,    "int / double"],
          ["Boolean", "true / false", `"boolean"`,   "boolean"],
          ["Undefined", "undefined",  `"undefined"`, { tr: "Yok (null benzeri)", en: "N/A (similar to null)" }],
          ["Null",    "null",         `"object"` ,   { tr: "null (dikkat: typeof hatası!)", en: "null (watch out: typeof bug!)" }],
          ["Symbol",  "Symbol('id')", `"symbol"`,    { tr: "Yok (JS özgün)", en: "N/A (JS-specific)" }],
          ["BigInt",  "9007n",        `"bigint"`,    "long / BigInteger"]
        ]
      },
      {
        type: "heading",
        content: { tr: "3 Farklı Fonksiyon Yazım Biçimi", en: "3 Ways to Write Functions" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Function Declaration vs Expression vs Arrow", en: "Function Declaration vs Expression vs Arrow" },
        content: {
          tr: `// ─── 1. Function Declaration (Bildirim) ──────────────────────
// Java'daki public static void / String methodName() gibi
// Hoisting: tanımlanmadan ÖNCE çağrılabilir
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// ─── 2. Function Expression (İfade) ──────────────────────────
// Değişkene atanır; hoisting OLMAZ
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 6)); // 24

// ─── 3. Arrow Function (ES6) ──────────────────────────────────
// Kısa sözdizimi; 'this' bağlamını DEVRALmaz (önemli fark!)
const divide = (a, b) => a / b;           // tek satır → return örtük
const greet  = name => \`Merhaba, \${name}!\`; // tek parametre → parantez opsiyonel

console.log(divide(10, 2)); // 5
console.log(greet("Hasan")); // Merhaba, Hasan!`,
          en: `// ─── 1. Function Declaration ─────────────────────────────────
// Like Java's public static void / String methodName()
// Hoisting: callable BEFORE it is defined
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// ─── 2. Function Expression ───────────────────────────────────
// Assigned to a variable; NO hoisting
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 6)); // 24

// ─── 3. Arrow Function (ES6) ──────────────────────────────────
// Concise syntax; does NOT inherit its own 'this' (key difference!)
const divide = (a, b) => a / b;           // single line → implicit return
const greet  = name => \`Hello, \${name}!\`; // single param → parentheses optional

console.log(divide(10, 2)); // 5
console.log(greet("Hasan")); // Hello, Hasan!`
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Özellik", en: "Feature" },
          { tr: "Function Declaration", en: "Function Declaration" },
          { tr: "Function Expression", en: "Function Expression" },
          { tr: "Arrow Function", en: "Arrow Function" }
        ],
        rows: [
          [
            { tr: "Hoisting (Yukarı çekilir mi?)", en: "Hoisting?" },
            { tr: "✅ Evet", en: "✅ Yes" },
            { tr: "❌ Hayır", en: "❌ No" },
            { tr: "❌ Hayır", en: "❌ No" }
          ],
          [
            { tr: "this bağlamı", en: "this binding" },
            { tr: "Kendi 'this'i var", en: "Has own 'this'" },
            { tr: "Kendi 'this'i var", en: "Has own 'this'" },
            { tr: "Üst kapsamdan devralır", en: "Inherits from outer scope" }
          ],
          [
            { tr: "Sözdizimi kısalığı", en: "Conciseness" },
            { tr: "Uzun", en: "Verbose" },
            { tr: "Orta", en: "Medium" },
            { tr: "✅ En kısa", en: "✅ Shortest" }
          ],
          [
            { tr: "Kullanım alanı", en: "Best use case" },
            { tr: "Genel helper fonksiyonlar", en: "General helper functions" },
            { tr: "Callback, değişken atama", en: "Callbacks, variable assignment" },
            { tr: "Array metodları (.map, .filter)", en: "Array methods (.map, .filter)" }
          ]
        ]
      },
      {
        type: "heading",
        content: { tr: "Fonksiyon & Nesne Tanımlama — Kendin Dene", en: "Functions & Objects — Try It Yourself" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Fonksiyon ve nesne kullanımı!
const robot = {
  name: "Buster",
  role: "QA Tester",
  greet: function() {
    return "Merhaba, ben " + this.name + ", göreve hazırım!";
  }
};
console.log(robot.greet());

// Arrow function ile test sonucu özeti
const summarize = (passed, failed) =>
  \`✅ \${passed} Başarılı | ❌ \${failed} Başarısız | Toplam: \${passed + failed}\`;

console.log(summarize(12, 3));

// typeof ile tip kontrolü
console.log(typeof "test", typeof 42, typeof true, typeof undefined, typeof null);`,
          en: `// Functions and object usage!
const robot = {
  name: "Buster",
  role: "QA Tester",
  greet: function() {
    return "Hi, I am " + this.name + ", ready for action!";
  }
};
console.log(robot.greet());

// Arrow function for test summary
const summarize = (passed, failed) =>
  \`✅ \${passed} Passed | ❌ \${failed} Failed | Total: \${passed + failed}\`;

console.log(summarize(12, 3));

// typeof type check
console.log(typeof "test", typeof 42, typeof true, typeof undefined, typeof null);`
        }
      },
      jsTypeCoercionFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te tanımlanmış ama henüz değer atanmamış bir değişkenin veri tipi (ve değeri) nedir?",
          en: "What is the type (and value) of a declared variable that has not been initialized with a value yet?"
        },
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "undefined" },
          { id: "c", text: "void" },
          { id: "d", text: "empty" }
        ],
        correct: "b",
        explanation: {
          tr: "JavaScript'te tanımlanmış ama henüz atanmamış değişkenler varsayılan olarak `undefined` veri tipine ve değerine sahip olurlar. Java'da böyle bir durum derleme hatası verirken, JavaScript bu durumu geçerli bir değer (`undefined`) olarak kabul eder.",
          en: "In JavaScript, variables declared but not assigned default to type and value `undefined`. Unlike Java which would throw a compile error, JavaScript treats this as a valid state with the `undefined` value."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te `typeof null` ifadesinin döndürdüğü değer nedir? Bu neden beklenmedik bir sonuçtur?",
            en: "What does `typeof null` return in JavaScript, and why is this surprising?"
          },
          options: [
            { id: "a", text: `"null"` },
            { id: "b", text: `"undefined"` },
            { id: "c", text: `"object"` },
            { id: "d", text: `"none"` }
          ],
          correct: "c",
          explanation: {
            tr: "`typeof null` beklenmedik şekilde `'object'` döner. Bu, JavaScript'in ilk sürümlerinden gelen tarihi bir bug olup geriye dönük uyumluluk için düzeltilmemiştir. Null kontrolü için `=== null` kullanılmalıdır.",
            en: "`typeof null` unexpectedly returns `'object'`. This is a historical bug from the first JavaScript release, kept unfixed for backward compatibility. Always use `=== null` to check for null values."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Arrow function ile normal function arasındaki en kritik fark hangisidir?",
          en: "What is the most critical difference between an arrow function and a regular function?"
        },
        options: [
          { id: "a", text: { tr: "Arrow function daha yavaş çalışır", en: "Arrow functions are slower" } },
          { id: "b", text: { tr: "Arrow function kendi 'this' bağlamına sahip değildir; üst kapsamdan devralır", en: "Arrow functions do not have their own 'this'; they inherit it from the enclosing scope" } },
          { id: "c", text: { tr: "Arrow function sadece number döndürebilir", en: "Arrow functions can only return numbers" } },
          { id: "d", text: { tr: "Arrow function parametre alamaz", en: "Arrow functions cannot accept parameters" } }
        ],
        correct: "b",
        explanation: {
          tr: "Normal fonksiyonlar çağrıldıkları bağlama göre kendi `this`'ini oluşturur. Arrow function'lar ise `this`'i tanımlandıkları dış kapsam (lexical scope) üzerinden devralır. Bu fark özellikle class metotlarında ve event listener'larda kritik önem taşır.",
          en: "Regular functions create their own `this` based on how they are called. Arrow functions inherit `this` from the outer (lexical) scope where they are defined. This distinction is critical in class methods and event listeners."
        },
        retryQuestion: {
          question: {
            tr: "Aşağıdaki hangi fonksiyon tanımı hoisting sayesinde tanımlanmadan önce çağrılabilir?",
            en: "Which of the following function definitions can be called before it appears in the code due to hoisting?"
          },
          options: [
            { id: "a", text: "const fn = () => {}" },
            { id: "b", text: "const fn = function() {}" },
            { id: "c", text: "function fn() {}" },
            { id: "d", text: { tr: "Hiçbiri hoisting'e tabi değildir", en: "None of them are hoisted" } }
          ],
          correct: "c",
          explanation: {
            tr: "Yalnızca `function` anahtar kelimesiyle yazılan Function Declaration'lar hoisting'e tabidir ve tanım satırından önce çağrılabilir. `const`, `let` veya `var` ile tanımlanan Function Expression ve Arrow Function'lar hoisting'den yararlanamaz.",
            en: "Only classic `function` keyword declarations are fully hoisted and callable before their definition line. Function Expressions and Arrow Functions assigned to `const`, `let`, or `var` are NOT hoisted."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'teki 7 primitive tip, bir inşaat deposundaki farklı malzeme türleri gibidir: `number` ölçüm aracı (uzunluk, ağırlık), `string` etiket bandı (ne olduğunu açıklar), `boolean` açık/kapalı valfi (iki durum), `null` kasıtlı boş bırakılan alan (henüz inşa edilmedi), `undefined` planlanmamış alan (plana bile alınmadı), `symbol` her yapıda eşsiz seri numarası. Peki neden `null` ile `undefined` ayrı tipler? Java'da yalnızca `null` var — atanmamış referans otomatik `null` olur. JavaScript'te ise `undefined` \"hiç değer almadı\" demek, `null` ise \"bilerek boş bırakıldı\" demek. Bu ayrım test assertion'larında kritiktir: API'den dönen `null` ile hiç gelmemiş bir alan (`undefined`) aynı şey değildir — biri sunucunun bilinçli olarak boş gönderdiği bir alan, diğeri ise alanın yanıtta hiç var olmadığı durumdur.",
          en: "The 7 primitive types in JavaScript are like different materials in a construction warehouse: `number` is a measuring tool (length, weight), `string` is label tape (describes what something is), `boolean` is an on/off valve (two states), `null` is a deliberately left-empty area (not built yet by design), `undefined` is an unplanned area (not even on the blueprint), `symbol` is a unique serial number per building. Why are `null` and `undefined` separate types? In Java there is only `null` — an unassigned reference automatically becomes `null`. In JavaScript, `undefined` means \"never received a value\" while `null` means \"intentionally left empty.\" This distinction is critical in test assertions: a `null` from an API response means the server deliberately sent nothing; an `undefined` field means the field did not exist in the response at all — these are different failure modes to catch."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript'te hem `==` hem `===` var ve bu neden önemli? `==` (loose equality), karşılaştırmadan önce tipleri zorla dönüştürür: `\"5\" == 5` → `true`. Bu, bir teraziyi kullanmadan önce tartının birimini otomatik değiştiren aptal bir terazi gibidir — farklı şeyler aynı görünür. `===` (strict equality) ise hem değer hem tip kontrolü yapar: `\"5\" === 5` → `false`. Java'da bu kafa karışıklığı yoktur: `==` primitifleri karşılaştırır, `.equals()` nesneleri — iki operatör tamamen farklı amaçlar için tasarlanmıştır. Test otomasyonunda `==` kullanmak neden tehlikeli? API'den `\"200\"` (string) döndüğünde `== 200` (number) true verebilir ve assertion geçer, ama gerçekte tip yanlıştır — sessiz yanlış PASS (false positive). `===` bu durumu yakalar. Playwright'ın `expect(value).toBe(200)` assertion'ı tam anlamıyla strict equality uygular; bu yüzden response body'deki değerleri number'a dönüştürmeden assertion yapmamalısın.",
          en: "Why does JavaScript have both `==` and `===`, and why does this matter? `==` (loose equality) coerces types before comparing: `\"5\" == 5` → `true`. It is like a dumb scale that automatically changes its unit before weighing — different things appear the same. `===` (strict equality) checks both value and type: `\"5\" === 5` → `false`. In Java this confusion does not exist: `==` compares primitives, `.equals()` compares objects — two operators designed for completely different purposes. Why is using `==` in test automation dangerous? When an API returns `\"200\"` (string), `== 200` (number) can evaluate to true and your assertion passes — but the type is actually wrong. This is a silent false positive. `===` catches this. Playwright's `expect(value).toBe(200)` applies strict equality precisely; this is why you should not assert on response body values without first converting them to the correct type."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `NaN === NaN` false döndürür — bu bir hata mı? Bu kasıtlı bir tasarım kararıdır: `NaN` (Not a Number), geçersiz bir matematiksel işlemin sonucudur (`\"abc\" / 2`, `Math.sqrt(-1)` gibi). Geçersiz bir sonuç ile başka bir geçersiz sonuç arasında anlamlı bir eşitlik kurulamaz — her ikisi de \"bilinmiyor\" dur ve iki bilinmeyen birbirine eşit olmak zorunda değildir. Bu, IEEE 754 kayan nokta standardının bir gereğidir ve Java'da da aynı davranış görülür: `Double.NaN == Double.NaN` → `false`. Peki `NaN`'ı nasıl kontrol ederiz? `Number.isNaN(value)` tercih edilir — eski `isNaN()` fonksiyonu string'leri zorla dönüştürdüğü için yanlış pozitif üretebilir. Test otomasyonunda önemi: API'den dönen sayısal bir alanı parse ettiğinde `Number.isNaN()` ile kontrol etmezsen, aritmetik işlemlerde sonuç sessizce `NaN` olabilir ve assertion `NaN === 200` → `false` ile test başarısız olur ama hata mesajı kafa karıştırıcıdır.",
          en: "Why does `NaN === NaN` return false — is this a bug? This is an intentional design decision: `NaN` (Not a Number) is the result of an invalid math operation (`\"abc\" / 2`, `Math.sqrt(-1)`). A meaningful equality cannot be established between two invalid results — both are \"unknown\" and two unknowns need not be equal. This is required by the IEEE 754 floating-point standard and the same behavior appears in Java: `Double.NaN == Double.NaN` → `false`. How do we check for `NaN`? Prefer `Number.isNaN(value)` — the older `isNaN()` function coerces strings and can produce false positives. Test automation relevance: when you parse a numeric field from an API response and do not check with `Number.isNaN()`, arithmetic operations can silently produce `NaN`, and the assertion `NaN === 200` → `false` fails with a confusing error message."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How many data types exist in JavaScript and what analogy would you use? How would you explain arrow functions vs regular functions to your neighbor?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript'te kaç çeşit veri tipi var ve onları nasıl bir benzetmeyle anlatırsın? Arrow function ile normal function arasındaki farkı komşuna anlatmak zorunda kalsaydın ne derdin?",
        keywords: [
              ["tip", "type"],
              "primitive",
              ["değer", "value"],
              ["fonksiyon", "function"],
              ["fabrika", "factory"],
              "this",
              "arrow",
              ["ok", "block"],
              ["parça", "brick"],
              ["çalıştır", "runs"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 4 — Strings & Numbers
  // ─────────────────────────────────────────────
  {
    title: { tr: "String & Sayı & Matematik", en: "String, Numbers & Math" },
    blocks: [
      {
        type: "css-animation",
        kind: "strings",
        label: { tr: "Template Literal Birleştirme Animasyonu", en: "Template Literal Concatenation Animation" }
      },
      {
        type: "simple-box",
        emoji: "🔤",
        content: {
          tr: "String ve sayı manipülasyonu, test otomasyonunun günlük ekmeğidir: sayfadan element metnini okursun, trim edip normalize edersin, fiyatları string'den number'a çevirirsin, assertion yazarsın. Template literal (backtick string), bu işleri dramatik ölçüde kolaylaştırır — Java'da `String.format(\"Merhaba %s, skorun %d\", isim, skor)` yazdığın yerde JavaScript'te `` `Merhaba ${isim}, skorun ${skor}` `` yazarsın: çok daha okunabilir ve hata payı daha az. Peki neden bu kadar önemli? Locator string'leri oluştururken: `` `[data-testid=\"user-${userId}\"]` `` şeklinde dinamik selector üretmek, `\"[data-testid=\\\"user-\" + userId + \"\\\"]\"` yazmaktan hem daha net hem de daha güvenlidir. Çok satırlı assertion mesajı yazarken de backtick'ler \n ve string birleştirme cehennemi olmadan çalışır. Java ile arasındaki asıl fark ise sayı tarafındadır ve sinsidir: Java'da `int` ile `double` ayrı tiplerdir, derleyici seni uyarır; JavaScript'te TEK bir `number` tipi vardır ve `\"12\" + 3` sana `\"123\"` verirken `\"12\" - 3` sana `9` verir. Sayfadan okuduğun fiyatı `Number()` ile çevirmeyi unuttuğunda test hata vermez — sessizce yanlış karşılaştırma yapar ve yeşil yanar.",
          en: "String and number manipulation is the daily bread of test automation: you read element text from the page, trim and normalize it, convert price strings to numbers, and write assertions. Template literals (backtick strings) dramatically simplify this — where Java requires `String.format(\"Hello %s, score %d\", name, score)`, JavaScript uses `` `Hello ${name}, score ${score}` ``: far more readable with less room for error. Why does this matter so much? When building locator strings: `` `[data-testid=\"user-${userId}\"]` `` for dynamic selector generation is both clearer and safer than `\"[data-testid=\\\"user-\" + userId + \"\\\"]\"`. Multi-line assertion messages also work without `\\n` escapes or string concatenation hell. The real divergence from Java is on the number side, and it is sneaky: Java has separate `int` and `double` types and a compiler that warns you; JavaScript has a single `number` type, where `\"12\" + 3` yields `\"123\"` while `\"12\" - 3` yields `9`. Forget to wrap a price you scraped from the page in `Number()` and the test raises no error — it silently compares the wrong things and goes green."
        }
      },
      {
        type: "heading",
        content: { tr: "En Sık Kullanılan String Metotları", en: "Most Used String Methods" }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Ne Yapar?", en: "What it does" },
          { tr: "Örnek", en: "Example" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          [".trim()",        { tr: "Baştaki ve sondaki boşlukları siler", en: "Removes leading and trailing spaces" }, `"  hi  ".trim()  → "hi"`,           ".strip()"],
          [".includes()",    { tr: "Alt metin içerip içermediğini kontrol eder", en: "Checks if substring exists" },     `"hello".includes("ell") → true`,    ".contains()"],
          [".startsWith()",  { tr: "Belirtilen metinle başlayıp başlamadığı", en: "Checks prefix match" },              `"Passed".startsWith("P") → true`,   ".startsWith()"],
          [".endsWith()",    { tr: "Belirtilen metinle bitip bitmediği", en: "Checks suffix match" },                   `"test.js".endsWith(".js") → true`,  ".endsWith()"],
          [".toUpperCase()", { tr: "Tüm harfleri büyük yapar", en: "Converts to uppercase" },                           `"hello".toUpperCase() → "HELLO"`,   ".toUpperCase()"],
          [".toLowerCase()", { tr: "Tüm harfleri küçük yapar", en: "Converts to lowercase" },                           `"HELLO".toLowerCase() → "hello"`,   ".toLowerCase()"],
          [".replace()",     { tr: "İlk eşleşmeyi değiştirir", en: "Replaces first match" },                            `"a-b-c".replace("-","/") → "a/b-c"`, ".replace() / replaceFirst()"],
          [".replaceAll()",  { tr: "Tüm eşleşmeleri değiştirir", en: "Replaces all matches" },                          `"a-b-c".replaceAll("-","/") → "a/b/c"`, ".replace()"],
          [".split()",       { tr: "Ayırıcıya göre diziye böler", en: "Splits by separator into array" },               `"a,b,c".split(",") → ["a","b","c"]`, ".split()"],
          [".slice()",       { tr: "Başlangıç-bitiş index ile alt metin alır", en: "Extracts substring by index range" }, `"hello".slice(1,3) → "el"`,        ".substring()"],
          [".indexOf()",     { tr: "Alt metnin ilk index'ini döner", en: "Returns first occurrence index" },             `"hello".indexOf("l") → 2`,          ".indexOf()"],
          [".padStart()",    { tr: "Soldan karakter ekleyerek uzunluğa tamamlar", en: "Pads string from start to length" }, `"5".padStart(3,"0") → "005"`,    { tr: "Yok (String.format ile)", en: "N/A (String.format)" }]
        ]
      },
      {
        type: "heading",
        content: { tr: "Number & Math Metotları", en: "Number & Math Methods" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Sayı Dönüşümleri ve Math Nesnesi", en: "Number Conversions and Math Object" },
        content: {
          tr: `// ─── String → Number dönüşümleri ────────────────────────────
let strNum = "42";
console.log(Number(strNum));      // 42     ← güvenli dönüşüm
console.log(parseInt("42px"));   // 42     ← sayıyı parse eder, sonrasını atar
console.log(parseFloat("3.14")); // 3.14
console.log(+"99");               // 99     ← unary + operatörü (kısa yol)
console.log(Number("hello"));    // NaN    ← geçersiz dönüşüm

// ─── Number metodları ─────────────────────────────────────────
let price = 19.9876;
console.log(price.toFixed(2));         // "19.99" — ondalık yuvarlama (string döner!)
console.log(Number.isNaN(NaN));        // true
console.log(Number.isFinite(1/0));     // false (Infinity)
console.log(Number.isInteger(42.0));   // true

// ─── Math nesnesi ────────────────────────────────────────────
console.log(Math.round(4.6));   // 5
console.log(Math.floor(4.9));   // 4   ← aşağı yuvarla
console.log(Math.ceil(4.1));    // 5   ← yukarı yuvarla
console.log(Math.abs(-15));     // 15  ← mutlak değer
console.log(Math.max(1,9,3));   // 9
console.log(Math.min(1,9,3));   // 1
console.log(Math.random());     // 0–1 arası rastgele sayı
console.log(Math.sqrt(16));     // 4`,
          en: `// ─── String → Number conversions ────────────────────────────
let strNum = "42";
console.log(Number(strNum));      // 42     ← safe conversion
console.log(parseInt("42px"));   // 42     ← parses number, drops rest
console.log(parseFloat("3.14")); // 3.14
console.log(+"99");               // 99     ← unary + shorthand
console.log(Number("hello"));    // NaN    ← invalid conversion

// ─── Number methods ───────────────────────────────────────────
let price = 19.9876;
console.log(price.toFixed(2));         // "19.99" — decimal rounding (returns string!)
console.log(Number.isNaN(NaN));        // true
console.log(Number.isFinite(1/0));     // false (Infinity)
console.log(Number.isInteger(42.0));   // true

// ─── Math object ─────────────────────────────────────────────
console.log(Math.round(4.6));   // 5
console.log(Math.floor(4.9));   // 4   ← floor (round down)
console.log(Math.ceil(4.1));    // 5   ← ceil (round up)
console.log(Math.abs(-15));     // 15  ← absolute value
console.log(Math.max(1,9,3));   // 9
console.log(Math.min(1,9,3));   // 1
console.log(Math.random());     // random number between 0–1
console.log(Math.sqrt(16));     // 4`
        }
      },
      {
        type: "heading",
        content: { tr: "Template Literals & String Metotları — Kendin Dene", en: "Template Literals & String Methods — Try It Yourself" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "200px",
        defaultCode: {
          tr: `// String manipülasyonu ve Template Literals!
let locatorName = "submit-btn";
let xpath = \`//button[@id="\${locatorName}"]\`;
console.log("Xpath:", xpath);

let rawText = "  Rapor: 15 Passed  ";
let cleanText = rawText.trim();
console.log("Temiz Metin:", cleanText);
console.log("Passed içeriyor mu?:", cleanText.includes("Passed"));
console.log("Büyük harf:", cleanText.toUpperCase());
console.log("Parçalar:", cleanText.split(": ")); // ["Rapor", "15 Passed"]`,
          en: `// String manipulation and Template Literals!
let locatorName = "submit-btn";
let xpath = \`//button[@id="\${locatorName}"]\`;
console.log("Computed Xpath:", xpath);

let rawText = "  Report: 15 Passed  ";
let cleanText = rawText.trim();
console.log("Cleaned Text:", cleanText);
console.log("Contains 'Passed'?:", cleanText.includes("Passed"));
console.log("Uppercase:", cleanText.toUpperCase());
console.log("Split parts:", cleanText.split(": ")); // ["Report", "15 Passed"]`
        }
      },
      jsFloatPrecisionFilm,
      {
        type: "quiz",
        question: {
          tr: "Bir string ifadenin karakter uzunluğunu almak için hangi özellik (property) kullanılır?",
          en: "Which property is used to get the character length of a string?"
        },
        options: [
          { id: "a", text: "size()" },
          { id: "b", text: "length()" },
          { id: "c", text: "length" },
          { id: "d", text: "count" }
        ],
        correct: "c",
        explanation: {
          tr: "JavaScript'te string'lerin uzunluğunu almak için `length` salt okunur özelliği (property) kullanılır. Java'daki `.length()` metotunun aksine JS'te parantez kullanılmaz — çünkü `length` bir metot değil, doğrudan bir özellik (property) alanıdır.",
          en: "In JavaScript, `length` is a read-only property (not a method). Unlike Java's `.length()` which uses parentheses, JS string `.length` has no parentheses because it is a property, not a function call."
        },
        retryQuestion: {
          question: {
            tr: "Ters tırnaklar (backticks) ile tanımlanan, satırlar arası geçişe izin veren ve `${değişken}` entegrasyonu sağlayan ES6 özelliği nedir?",
            en: "What is the ES6 feature called that uses backticks, supports multi-line strings, and allows embedding expressions via `${variable}`?"
          },
          options: [
            { id: "a", text: "String Concatenation" },
            { id: "b", text: "Template Literals" },
            { id: "c", text: "Interpolated Strings" },
            { id: "d", text: "JSON Strings" }
          ],
          correct: "b",
          explanation: {
            tr: "Template Literals, JavaScript'te ters tırnaklar (`` ` ``) kullanılarak dinamik metinler oluşturulmasını sağlayan ve otomasyonda dinamik seçiciler için vazgeçilmez olan bir özelliktir. Java'daki `String.format(\"Merhaba %s\", isim)` karşılığıdır.",
            en: "Template Literals use backticks (`` ` ``) for dynamic string building and are essential for writing dynamic locators in automation. They are the JS equivalent of Java's `String.format(\"Hello %s\", name)`."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Otomasyon testinde element metnini okuduk: `'  Login Başarılı  '`. Sadece içeriği almak, tüm harfleri küçük yapmak ve 'başarılı' içerip içermediğini kontrol etmek için doğru method zinciri hangisidir?",
          en: "In an automation test we scraped: `'  Login Successful  '`. Which method chain trims spaces, lowercases, and checks if it contains 'successful'?"
        },
        options: [
          { id: "a", text: `text.strip().lower().has("successful")` },
          { id: "b", text: `text.trim().toLowerCase().includes("successful")` },
          { id: "c", text: `text.clean().toLower().contains("successful")` },
          { id: "d", text: `text.trimAll().lowerCase().search("successful")` }
        ],
        correct: "b",
        explanation: {
          tr: "JavaScript'te doğru zincir: `.trim()` boşlukları temizler → `.toLowerCase()` küçük harfe çevirir → `.includes()` içerip içermediğini kontrol eder. Bu 3 metot otomasyon assertion adımlarında sıkça birlikte kullanılır.",
          en: "The correct JavaScript chain: `.trim()` removes spaces → `.toLowerCase()` converts to lowercase → `.includes()` checks for substring. These 3 methods are frequently chained together in automation assertion steps."
        },
        retryQuestion: {
          question: {
            tr: "`Number('42abc')` ve `parseInt('42abc')` ifadelerinin döndürdüğü değerler nelerdir?",
            en: "What do `Number('42abc')` and `parseInt('42abc')` return respectively?"
          },
          options: [
            { id: "a", text: { tr: "İkisi de 42 döner", en: "Both return 42" } },
            { id: "b", text: { tr: "NaN ve NaN", en: "NaN and NaN" } },
            { id: "c", text: { tr: "NaN ve 42", en: "NaN and 42" } },
            { id: "d", text: { tr: "42 ve NaN", en: "42 and NaN" } }
          ],
          correct: "c",
          explanation: {
            tr: "`Number('42abc')` geçersiz format nedeniyle `NaN` döner. `parseInt('42abc')` ise baştaki sayıyı parse eder ve kalan geçersiz karakterleri yoksayarak `42` döner. Bu fark API yanıtlarından sayı parse ederken kritik önem taşır.",
            en: "`Number('42abc')` returns `NaN` because the full string is not a valid number. `parseInt('42abc')` parses the leading numeric portion and ignores the rest, returning `42`. This difference matters when parsing numbers from API responses."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Template literal'ler, bir doldurmak için tasarlanmış resmi form gibi çalışır: boşluklar form basılırken belirlenir, değerler çalışma zamanında otomatik girer. Neden `+` operatörüyle string birleştirmek yerine template literal tercih edilmeli? `\"URL: \" + baseUrl + \"/api/\" + version + \"/users/\" + userId` şeklinde yazılmış bir locator, 3-4 değişken olduğunda neredeyse okunamaz hale gelir ve parantez sayma hataları çıkar. `` `URL: ${baseUrl}/api/${version}/users/${userId}` `` ise tek bakışta anlaşılır. Java'daki `String.format()` kullanımına aşina olarak gelen biri için template literal çok daha az ceremony gerektirir: format string ayrı yazılmaz, parametre sırası takip edilmez, %s/%d uyumsuzluğu olmaz. Playwright testlerinde URL'leri, API endpoint'lerini ve hata mesajlarını oluştururken template literal kullanmak hem okunabilirliği hem de maintenance'ı iyileştirir.",
          en: "Template literals are like a pre-printed official form: the blank fields are fixed when the form is designed, and values fill them automatically at runtime. Why prefer template literals over `+` string concatenation? `\"URL: \" + baseUrl + \"/api/\" + version + \"/users/\" + userId` becomes nearly unreadable with 3-4 variables and introduces parenthesis-counting errors. `` `URL: ${baseUrl}/api/${version}/users/${userId}` `` is understood at a single glance. For someone coming from Java's `String.format()`, template literals require far less ceremony: no separate format string, no parameter ordering, no `%s`/`%d` mismatch errors. Using template literals for URLs, API endpoints, and error messages in Playwright tests improves both readability and long-term maintenance."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Template literal'lerin bir diğer güçlü özelliği: çok satırlı string yazabilmek. Java'da `\"satır1\\n\" + \"satır2\"` yazmak zorunda kalırsın; JavaScript'te backtick içinde Enter'a basarsan gerçek satır sonu oluşur. Bu özellik test raporlarında ve hata mesajlarında özellikle değerlidir: `const errorMsg = \\`Test başarısız:\\n  Beklenen: ${expected}\\n  Gerçek: ${actual}\\`;` Peki neden backtick kullanmak yerine normal tırnakla escape yazmak sorunlu? Uzun hata mesajlarında kaçış karakterleri (`\\n`, `\\t`, `\\\"`) okunabilirliği bozar ve küçük bir hata tüm string'i kırar. Template literal'de görsel yapı olduğu gibi kodda da görünür — WYSIWYG (What You See Is What You Get) ilkesi. Bu, CI loglarına yazılan hata mesajlarını çok daha debug-friendly hale getirir.",
          en: "Another powerful feature of template literals: multi-line strings. In Java you must write `\"line1\\n\" + \"line2\"`; in JavaScript hitting Enter inside backticks creates a literal newline. This is especially valuable in test reports and error messages: `const errorMsg = \\`Test failed:\\n  Expected: ${expected}\\n  Actual: ${actual}\\`;` Why is writing escape sequences in normal quotes problematic? In long error messages, escape characters (`\\n`, `\\t`, `\\\"`) destroy readability and a single mistake breaks the entire string. With template literals, the visual structure matches the code exactly — WYSIWYG (What You See Is What You Get). This makes error messages written to CI logs much more debug-friendly."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`parseInt()` ve `parseFloat()`, farklı ülkelerin elektrik fişlerini ortak standarda dönüştüren adaptörler gibidir: API'den gelen `\"42.99 TL\"` stringini doğrudan matematiksel işlemde kullanamazsın, ama `parseFloat(\"42.99\")` onu `42.99` sayısına çevirir. Peki `parseInt` ile `Number()` arasındaki fark neden kritik? `parseInt(\"42abc\")` → `42` (baştaki rakamları alır, gerisini atar); `Number(\"42abc\")` → `NaN` (tam geçersiz kabul eder). API yanıtlarından değer parse ederken bu fark büyük önem taşır: eğer alanın değeri `\"200 OK\"` ise `parseInt` `200` verir ama `Number` `NaN` döndürür. Java'da `Integer.parseInt()` ile `Integer.valueOf()` benzer ayrım yapar. Test otomasyonunda: sayısal assertion yazmadan önce `typeof value === 'number'` veya `Number.isNaN(value)` kontrolü yapılmalıdır.",
          en: "`parseInt()` and `parseFloat()` are like travel plug adapters: you cannot use the raw string `\"42.99 USD\"` in math operations directly, but `parseFloat(\"42.99\")` converts it to the number `42.99`. Why is the difference between `parseInt` and `Number()` critical? `parseInt(\"42abc\")` → `42` (takes leading digits, discards the rest); `Number(\"42abc\")` → `NaN` (considers the whole thing invalid). This difference is crucial when parsing API response values: if a field contains `\"200 OK\"`, `parseInt` returns `200` but `Number` returns `NaN`. Java's `Integer.parseInt()` vs `Integer.valueOf()` make a similar distinction. In test automation: always check `typeof value === 'number'` or `!Number.isNaN(value)` before writing numeric assertions."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `\"5\" + 3` ile `\"5\" - 3` farklı sonuçlar verir — bu bir tutarsızlık mı? Bu, JavaScript'in tarihsel tasarım seçiminin sonucudur: `+` operatörü hem string birleştirme hem de aritmetik toplama yapar; string varlığında birleştirme kazanır: `\"5\" + 3 → \"53\"`. `-` operatörü ise yalnızca aritmetik çıkarma yapar, dolayısıyla string'i zorla sayıya çevirir: `\"5\" - 3 → 2`. Java'da bu sorun yoktur: Java statik tiplidir, `String + int` sadece String birleştirmesidir, `String - int` ise compile hatasıdır. QA'da bu kritik bir tuzak: kullanıcı formundan `\"10\"` string değeri alıp doğrudan toplarsan `\"10\" + 5 = \"105\"` olur — toplama değil, birleştirme! Bu, ödeme hesaplamalarını test ederken yanlış PASS (false positive) üretebilir. Çözüm: sayısal alanlarda `Number()` veya `parseInt()` ile tip dönüşümü yaptıktan sonra aritmetik işlem uygula.",
          en: "Why do `\"5\" + 3` and `\"5\" - 3` give different results — is this an inconsistency? This is the result of JavaScript's historical design choice: the `+` operator handles both string concatenation and arithmetic addition; when a string is present, concatenation wins: `\"5\" + 3 → \"53\"`. The `-` operator only does arithmetic subtraction, so it coerces the string to a number: `\"5\" - 3 → 2`. Java does not have this problem: Java is statically typed, `String + int` produces string concatenation, and `String - int` is a compile error. Critical QA trap: if you take a `\"10\"` string from a user form and add directly, `\"10\" + 5 = \"105\"` — concatenation, not addition! This can produce false positives when testing payment calculations. Solution: always apply `Number()` or `parseInt()` type conversion on numeric fields before arithmetic operations."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden primitive string'lerde `toUpperCase()`, `slice()`, `includes()` gibi metodlar çalışıyor — bunlar nesne metodu değil mi? Çünkü JavaScript bir metod çağrıldığında o primitive'i geçici olarak ilgili wrapper sınıfına sarar (autoboxing), metodu çalıştırır, sonra wrapper'ı siler. `\"hello\".toUpperCase()` çalıştığında `new String(\"hello\").toUpperCase()` gerçekleşir, ama geçici `String` nesnesi hiç görünmez. Java'da aynı konsept: `int` → `Integer`, `boolean` → `Boolean` autoboxing ile wrapper sınıfına sarılır. QA'da pratik önemi: `element.textContent.trim().toLowerCase()` gibi zincirleme string metodları kullanırken her adım autoboxing-unboxing yapar — performans açısından önemsiz ama neden çalıştığını anlamak için gerekli. Dikkat: `null.toUpperCase()` veya `undefined.trim()` çağrısı autoboxing yapamaz ve `TypeError: Cannot read properties of null` hatası fırlatır — locator'dan dönen null değerini kontrol etmeden metod zincirleme yapma.",
          en: "Why do methods like `toUpperCase()`, `slice()`, and `includes()` work on primitive strings — aren't those object methods? Because when a method is called on a primitive, JavaScript temporarily wraps it in the corresponding wrapper class (autoboxing), runs the method, then discards the wrapper. `\"hello\".toUpperCase()` internally executes `new String(\"hello\").toUpperCase()`, but the temporary `String` object is never visible. Same concept in Java: `int` → `Integer`, `boolean` → `Boolean` are autoboxed to wrapper classes. Practical QA relevance: when chaining string methods like `element.textContent.trim().toLowerCase()`, each step involves autoboxing — negligible for performance but important to understand. Warning: `null.toUpperCase()` or `undefined.trim()` cannot autobox and throws `TypeError: Cannot read properties of null` — never chain methods on a locator result without first checking for null."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain why we use template literals and describe your 3 favorite string methods with a testing scenario. No technical language!",
        promptTr: "🤖 Mini Kahraman Soruyor: Template literal'leri neden kullandığımızı ve en sevdiğin 3 string metodunu bir otomasyon senaryosuyla birleştirerek anlat. Hiç teknik olmayan bir dille!",
        keywords: [
              ["birleştir", "combine"],
              "trim",
              ["büyük", "upper"],
              ["küçük", "lower"],
              ["içeriyor", "contains"],
              ["dinamik", "dynamic"],
              ["metin", "text"],
              "template",
              "includes",
              "replace"
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 5 — Array Methods
  // ─────────────────────────────────────────────
  {
    title: { tr: "Array Metotları (map, filter)", en: "Array Methods (map, filter)" },
    blocks: [
      {
        type: "css-animation",
        kind: "arrays",
        label: { tr: ".filter() Pipeline — Çift Sayıları Eler", en: ".filter() Pipeline — Eliminates Even Numbers" }
      },
      {
        type: "simple-box",
        emoji: "🍎",
        content: {
          tr: "JavaScript array metodları, bir fabrika montaj hattındaki özelleşmiş istasyonlar gibidir: ham malzeme giriyor, her istasyon kendi işini yapıyor, işlenmiş ürün çıkıyor. `map()` boyama istasyonu — her elemanı dönüştürür, sayı aynı kalır. `filter()` kalite kontrol kapısı — geçemeyenleri geri çevirir, sayı azalabilir. `reduce()` paketleme presi — tüm elemanları tek değere sıkıştırır. Peki neden bunlar önemli? Java'da aynı işi yapabilirsin: `Stream.map()`, `Stream.filter()`, `Stream.reduce()` ile. Ama JavaScript'te bu metodlar dizi üzerinde doğrudan zincirlenir: `testResults.filter(t => t.status === 'failed').map(t => t.name)` — başarısız testlerin isimlerini tek satırda alırsın. QA'da kritik kullanım: API yanıtındaki object array'ini işlemek, test verisi filtrelemek, çoklu locator sonuçlarından koşullu seçim yapmak hep bu metodlarla yapılır.",
          en: "JavaScript array methods are like specialized stations on a factory assembly line: raw material enters, each station does its job, processed product comes out. `map()` is the painting station — transforms each element, count stays the same. `filter()` is the quality control gate — rejects items that fail, count can decrease. `reduce()` is the packaging press — compresses all elements into one value. Why does this matter? In Java you can do the same with `Stream.map()`, `Stream.filter()`, `Stream.reduce()`. But in JavaScript these methods chain directly on the array: `testResults.filter(t => t.status === 'failed').map(t => t.name)` — get the names of failed tests in one line. Critical QA use cases: processing object arrays from API responses, filtering test data, making conditional selections from multiple locator results — all done with these methods."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Array map & filter Örnekleri", en: "Array map & filter Examples" },
        content: {
          tr: `const fruits = ['🍎', '🍏', '🍊', '🍍'];

// 1. map() ile her meyveyi meyve suyuna dönüştür
const juices = fruits.map(fruit => fruit + '🥤');
console.log(juices); // ['🍎🥤', '🍏🥤', '🍊🥤', '🍍🥤']

// 2. filter() ile sadece elma olanları seç
const apples = fruits.filter(fruit => fruit === '🍎' || fruit === '🍏');
console.log(apples); // ['🍎', '🍏']`,
          en: `const fruits = ['🍎', '🍏', '🍊', '🍍'];

// 1. map() — transform each fruit into juice
const juices = fruits.map(fruit => fruit + '🥤');
console.log(juices); // ['🍎🥤', '🍏🥤', '🍊🥤', '🍍🥤']

// 2. filter() — keep only apples
const apples = fruits.filter(fruit => fruit === '🍎' || fruit === '🍏');
console.log(apples); // ['🍎', '🍏']`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Array (Dizi) metotlarını kendiniz deneyin!
const testResults = [
  { id: 1, name: "Login Test", status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test", status: "passed" }
];

// Sadece 'passed' durumundaki testleri filtrele
const passedTests = testResults.filter(test => test.status === "passed");
console.log("Başarılı Testler:", passedTests);

// Testlerin sadece isimlerini içeren yeni bir dizi oluştur (map)
const testNames = testResults.map(test => test.name);
console.log("Test İsimleri:", testNames);`,
          en: `// Try running array iteration methods!
const testResults = [
  { id: 1, name: "Login Test", status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test", status: "passed" }
];

// Filter out only the passed tests
const passedTests = testResults.filter(test => test.status === "passed");
console.log("Passed Tests:", passedTests);

// Map array to names only
const testNames = testResults.map(test => test.name);
console.log("Test Names:", testNames);`
        }
      },
      jsMapFilterChainFilm,
      {
        type: "quiz",
        question: {
          tr: "Eldeki test sonuçları dizisinde sadece 'passed' durumunda olan testleri ayıklamak için hangi array metodu kullanılmalıdır?",
          en: "Which array method should be used to filter only 'passed' tests from a test results array?"
        },
        options: [
          { id: "a", text: "map()" },
          { id: "b", text: "filter()" },
          { id: "c", text: "reduce()" },
          { id: "d", text: "forEach()" }
        ],
        correct: "b",
        explanation: {
          tr: "`filter()` metodu, sağlanan koşulu geçen tüm öğelerle yeni bir dizi oluşturur. Otomasyonda başarılı testleri listelemek, boş değerleri temizlemek veya belirli elementleri ayıklamak için sıkça kullanılır.",
          en: "`filter()` creates a new array filled with elements that pass the test provided by the function. It is widely used in automation to list successful tests, clean empty values, or screen elements."
        },
        retryQuestion: {
          question: {
            tr: "`map()` metodunun temel amacı nedir?",
            en: "What is the primary purpose of the `map()` method?"
          },
          options: [
            { id: "a", text: { tr: "Diziden bazı elemanları silmek", en: "Deleting some elements from the array" } },
            { id: "b", text: { tr: "Her dizi elemanını dönüştürüp (transform) aynı uzunlukta yeni bir dizi oluşturmak", en: "Transforming every element to return a new array of the exact same length" } },
            { id: "c", text: { tr: "Diziyi ters çevirmek", en: "Reversing the array" } },
            { id: "d", text: { tr: "Diziyi tek bir değere indirgemek", en: "Reducing the array to a single value" } }
          ],
          correct: "b",
          explanation: {
            tr: "`map()` dizideki her eleman üzerinde bir fonksiyon çalıştırır ve bu fonksiyonun döndürdüğü sonuçlardan oluşan, orijinal diziyle aynı uzunlukta YENİ bir dizi üretir.",
            en: "`map()` runs a function on every element in the array and returns a NEW array of the exact same length, containing the returned results."
          }
        }
      },
      {
        type: "heading",
        content: { tr: "Genişletilmiş Array API — reduce, find, sort, flat ve diğerleri", en: "Extended Array API — reduce, find, sort, flat and more" }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Dönüş Değeri", en: "Returns" },
          { tr: "QA Kullanımı", en: "QA Usage" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["reduce(fn, init)",   { tr: "Tek birikmiş değer", en: "Single accumulated value" },         { tr: "Toplam süre, hata sayısı", en: "Total duration, error count" },          "stream().reduce()"],
          ["find(fn)",           { tr: "İlk eşleşen eleman (undefined yoksa)", en: "First match (undefined if none)" },     { tr: "İlk başarısız test", en: "First failed test" },                   "stream().findFirst()"],
          ["findIndex(fn)",      { tr: "İlk eşleşmenin index'i (-1 yoksa)", en: "Index of first match (-1 if none)" },     { tr: "Listede element pozisyonu", en: "Element position in list" },    "IntStream.indexOf"],
          ["some(fn)",           { tr: "Boolean — en az biri eşleşirse true", en: "Boolean — true if at least one matches" }, { tr: "Herhangi başarısız test var mı?", en: "Any failed test?" },   "stream().anyMatch()"],
          ["every(fn)",          { tr: "Boolean — hepsi eşleşirse true", en: "Boolean — true if all match" },   { tr: "Tüm testler geçti mi?", en: "Did all tests pass?" },              "stream().allMatch()"],
          ["includes(val)",      { tr: "Boolean — değer var mı?", en: "Boolean — does value exist?" },         { tr: "Hata listesinde spesifik hata var mı?", en: "Is specific error in list?" }, "List.contains()"],
          ["sort(fn)",           { tr: "Orijinali yerinde sıralar", en: "Sorts in-place, mutates original" }, { tr: "Testleri süreye göre sırala", en: "Sort tests by duration" },         "Collections.sort()"],
          ["flat(depth)",        { tr: "İç içe diziyi düzleştirir", en: "Flattens nested array" },              { tr: "İç içe test gruplarını düzleştir", en: "Flatten nested test groups" }, "stream().flatMap()"],
          ["flatMap(fn)",        { tr: "map + flat(1) birleşimi", en: "map + flat(1) combined" },              { tr: "Her testten sub-step dizileri üret", en: "Produce sub-step arrays per test" }, "stream().flatMap()"],
          ["forEach(fn)",        { tr: "undefined (side-effect için)", en: "undefined (for side effects)" }, { tr: "Her test için log yaz", en: "Write log for each test" },           "forEach / for-each loop"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "reduce, find, some, every, sort — QA Örnekleri", en: "reduce, find, some, every, sort — QA Examples" },
        content: {
          tr: `const tests = [
  { name: 'Login',   status: 'passed',  durationMs: 1200 },
  { name: 'Payment', status: 'failed',  durationMs: 3400 },
  { name: 'Signup',  status: 'passed',  durationMs: 900  },
  { name: 'Logout',  status: 'passed',  durationMs: 400  },
];

// ─── reduce(): Toplam süreyi hesapla ─────────────────────────
// Java: stream().mapToInt(t -> t.durationMs).sum()
const totalMs = tests.reduce((acc, t) => acc + t.durationMs, 0);
console.log('Toplam süre:', totalMs + 'ms');   // 5900ms

// ─── find(): İlk başarısız testi bul ─────────────────────────
// Java: stream().filter(t -> t.status.equals("failed")).findFirst()
const firstFail = tests.find(t => t.status === 'failed');
console.log('İlk hata:', firstFail?.name);     // 'Payment'

// ─── some(): Herhangi başarısız test var mı? ─────────────────
// Java: stream().anyMatch(t -> "failed".equals(t.status))
const hasFailed = tests.some(t => t.status === 'failed');
console.log('Başarısız var mı?', hasFailed);   // true

// ─── every(): Hepsi geçti mi? ────────────────────────────────
// Java: stream().allMatch(t -> "passed".equals(t.status))
const allPassed = tests.every(t => t.status === 'passed');
console.log('Hepsi geçti mi?', allPassed);     // false

// ─── sort(): Süreye göre sırala (orijinali değiştirir!) ──────
// Java: Collections.sort(tests, Comparator.comparingInt(t -> t.durationMs))
const sorted = [...tests].sort((a, b) => a.durationMs - b.durationMs);
console.log('En hızlı:', sorted[0].name);      // 'Logout' (400ms)

// ─── flat(): İç içe dizileri düzleştir ───────────────────────
const nested = [['TC-001', 'TC-002'], ['TC-003'], ['TC-004', 'TC-005']];
console.log('Düz liste:', nested.flat());      // ['TC-001','TC-002','TC-003','TC-004','TC-005']`,
          en: `const tests = [
  { name: 'Login',   status: 'passed',  durationMs: 1200 },
  { name: 'Payment', status: 'failed',  durationMs: 3400 },
  { name: 'Signup',  status: 'passed',  durationMs: 900  },
  { name: 'Logout',  status: 'passed',  durationMs: 400  },
];

// ─── reduce(): Sum total duration ────────────────────────────
// Java: stream().mapToInt(t -> t.durationMs).sum()
const totalMs = tests.reduce((acc, t) => acc + t.durationMs, 0);
console.log('Total time:', totalMs + 'ms');    // 5900ms

// ─── find(): Get first failed test ───────────────────────────
// Java: stream().filter(t -> t.status.equals("failed")).findFirst()
const firstFail = tests.find(t => t.status === 'failed');
console.log('First failure:', firstFail?.name); // 'Payment'

// ─── some(): Any test failed? ────────────────────────────────
// Java: stream().anyMatch(t -> "failed".equals(t.status))
const hasFailed = tests.some(t => t.status === 'failed');
console.log('Any failure?', hasFailed);        // true

// ─── every(): Did all pass? ──────────────────────────────────
// Java: stream().allMatch(t -> "passed".equals(t.status))
const allPassed = tests.every(t => t.status === 'passed');
console.log('All passed?', allPassed);         // false

// ─── sort(): Sort by duration (mutates copy!) ────────────────
// Java: Collections.sort(tests, Comparator.comparingInt(t -> t.durationMs))
const sorted = [...tests].sort((a, b) => a.durationMs - b.durationMs);
console.log('Fastest test:', sorted[0].name);  // 'Logout' (400ms)

// ─── flat(): Flatten nested arrays ───────────────────────────
const nested = [['TC-001', 'TC-002'], ['TC-003'], ['TC-004', 'TC-005']];
console.log('Flat list:', nested.flat());      // ['TC-001','TC-002','TC-003','TC-004','TC-005']`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir test dizisinde en az bir testin 'failed' durumunda olup olmadığını kontrol etmek için hangi metod kullanılır?",
          en: "Which array method checks if at least one test in the array has a 'failed' status?"
        },
        options: [
          { id: "a", text: "tests.includes('failed')" },
          { id: "b", text: "tests.some(t => t.status === 'failed')" },
          { id: "c", text: "tests.find(t => t.status === 'failed')" },
          { id: "d", text: "tests.every(t => t.status === 'failed')" }
        ],
        correct: "b",
        explanation: {
          tr: "`some()` metodu, dizideki en az bir elemanın verilen koşulu sağlayıp sağlamadığını `true/false` olarak döner. Java'da `stream().anyMatch()` karşılığıdır. `find()` ise eleman döndürür, boolean değil. `every()` ise tüm elemanların koşulu sağlamasını kontrol eder.",
          en: "`some()` returns `true` if at least one array element satisfies the callback condition. Java equivalent: `stream().anyMatch()`. `find()` returns the element itself (not a boolean). `every()` checks if ALL elements satisfy the condition."
        },
        retryQuestion: {
          question: {
            tr: "Tüm testlerin sürelerini toplayarak toplam süreyi hesaplamak için hangi metod kullanılır?",
            en: "Which array method would you use to sum all test durations into a total?"
          },
          options: [
            { id: "a", text: "tests.sum(t => t.durationMs)" },
            { id: "b", text: "tests.total(t => t.durationMs)" },
            { id: "c", text: "tests.reduce((acc, t) => acc + t.durationMs, 0)" },
            { id: "d", text: "tests.map(t => t.durationMs).join('+')" }
          ],
          correct: "c",
          explanation: {
            tr: "`reduce()` bir diziyi tek bir değere indirger. Biriktirici (accumulator) ve başlangıç değeri ile çalışır: `reduce((acc, curr) => acc + curr.durationMs, 0)`. Java'daki `stream().mapToInt().sum()` veya `stream().reduce(0, Integer::sum)` ile aynı mantıktır.",
            en: "`reduce()` collapses an array into a single value. It works with an accumulator and initial value: `reduce((acc, curr) => acc + curr.durationMs, 0)`. This is identical in concept to Java's `stream().mapToInt().sum()` or `stream().reduce(0, Integer::sum)`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`map()`, `filter()` ve `reduce()` üçlüsünü anlamanın en kolay yolu her birinin ne döndürdüğüne bakmaktır: `map()` her zaman giriş ile aynı sayıda elemanlı yeni bir dizi döndürür; `filter()` koşulu geçen elemanların bir alt kümesini döndürür (sayı eşit veya daha az); `reduce()` ise diziyi tek bir değere — sayı, string, nesne veya başka bir dizi bile olabilir — indirir. Neden bu metodlar `for` döngüsüne tercih edilir? Fonksiyonel stil: orijinal diziyi değiştirmez (immutability), zincirleme yapılabilir (chaining) ve her metod tek bir sorumluluğa sahiptir (single responsibility). Java'da Stream API ile aynı prensip: `list.stream().filter(...).map(...).collect(...)`. Test suitelerinde bu metodları bilmek, test sonuçlarını post-processing etmeyi (başarısız testleri raporlamak, süre istatistiklerini hesaplamak) temiz ve sürdürülebilir hale getirir.",
          en: "The easiest way to understand `map()`, `filter()`, `reduce()` is to look at what each returns: `map()` always returns a new array with the same number of elements as input; `filter()` returns a subset of elements that pass the condition (count equal or less); `reduce()` collapses the array into a single value — which can be a number, string, object, or even another array. Why are these methods preferred over `for` loops? Functional style: they do not mutate the original array (immutability), they can be chained (chaining), and each method has one responsibility (single responsibility). Same principle as Java's Stream API: `list.stream().filter(...).map(...).collect(...)`. In test suites, knowing these methods makes post-processing test results (reporting failed tests, calculating duration statistics) clean and maintainable."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`forEach()` ile `map()` görünürde benzer ama temelden farklıdır: `forEach()` yan etki (side effect) için tasarlanmıştır ve hiçbir şey döndürmez (`undefined`), `map()` ise her elemanı dönüştürüp yeni bir dizi döndürür. Bu farkı ihmal etmek sık yapılan bir hatadır: `const result = testResults.forEach(...)` yaptığında `result` her zaman `undefined` olur — sonucu kullanamazsın. Java'da `Stream.forEach()` da aynı şekilde döndürmez; sonuç toplamak için `collect()` ile `map()` ve `filter()` zinciri gerekir. QA'da pratik kural: sonuç üretmek istiyorsan `map()`/`filter()`/`reduce()` kullan; sadece her eleman için bir şey yapmak (log basmak, dış kaynağı güncellemek) istiyorsan `forEach()` uygundur.",
          en: "`forEach()` and `map()` look similar but are fundamentally different: `forEach()` is designed for side effects and returns nothing (`undefined`); `map()` transforms each element and returns a new array. Overlooking this difference is a frequent mistake: `const result = testResults.forEach(...)` always sets `result` to `undefined` — you cannot use the result. In Java, `Stream.forEach()` also returns nothing; you need `map()` and `filter()` chained with `collect()` to gather results. Practical QA rule: use `map()`/`filter()`/`reduce()` when you need to produce a result; use `forEach()` only when you want to perform an action for each element (logging, updating an external resource) without collecting output."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`spread operator` (`...`), bir dizi veya nesnenin içeriğini açarak başka bir bağlama koymanı sağlar — tıpkı bir torbanın içindekileri başka bir torbaya dökmek gibi. `[...arr1, ...arr2]` iki diziyi birleştirmek için; `{...config, timeout: 5000}` mevcut config'e yeni bir alan eklemek için kullanılır. Peki bu neden derin kopya yapmaz? `spread` yalnızca bir seviye kopyalar (shallow copy): iç içe geçmiş nesneler hâlâ referans paylaşır. Java'da `Collections.unmodifiableList()` benzer bir sığ kopya sunar ama iç içe nesneleri korumaz. QA'da kritik: `const configCopy = {...testConfig}` ile kopyaladığın config'de iç içe `headers` nesnesi varsa, `configCopy.headers.Authorization = 'x'` değişikliği orijinal `testConfig.headers.Authorization`'ı da bozar. Derin kopya için `JSON.parse(JSON.stringify(obj))` veya `structuredClone()` kullan.",
          en: "The `spread operator` (`...`) lets you unpack the contents of an array or object and place them into another context — like emptying one bag into another. `[...arr1, ...arr2]` merges two arrays; `{...config, timeout: 5000}` adds a new field to an existing config object. Why doesn't this create a deep copy? Spread only copies one level (shallow copy): nested objects still share references. Java's `Collections.unmodifiableList()` offers a similar shallow copy that does not protect nested objects. Critical QA scenario: if you copy `const configCopy = {...testConfig}` and `testConfig` has a nested `headers` object, then `configCopy.headers.Authorization = 'x'` also mutates the original `testConfig.headers.Authorization`. Use `JSON.parse(JSON.stringify(obj))` or `structuredClone()` for deep copies."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `forEach()` yerine `map()` tercih edilmeli? Bir ev alımını düşün: `forEach()` her odayı gezerek not alır ama sana yeni bir liste vermez — yalnızca yan etki (side effect) için çalışır. `map()` ise her odayı gezip yenilemiş odalara ait yeni bir listesi sana verir — dönüşümün sonucunu döndürür. Peki fonksiyonel programlamada bu neden önemli? Paylaşılan state (shared state) test suitelerinin en büyük düşmanıdır: orijinal diziyi değiştiren bir `forEach` başka bir test step'i bozabilir. `map()` orijinale dokunmaz, yeni veri üretir — test izolasyonunu korur. Java'da `Stream.map()` ile `Stream.forEach()` arasındaki ayrım aynıdır: `map()` yeni akış döndürür, `forEach()` döndürmez. CI'da başarısız testleri toplayan kod: `const failedNames = results.filter(r => !r.passed).map(r => r.name)` — orijinal `results` dizisi bozulmadan kalır.",
          en: "Why should `map()` be preferred over `forEach()`? Think of house hunting: `forEach()` tours each room and takes notes but gives you no new list — it runs only for side effects. `map()` tours each room and returns a new list of renovated rooms — it returns the transformation result. Why does this matter in functional programming? Shared state is the biggest enemy of test suites: a `forEach()` that mutates the original array can corrupt another test step. `map()` does not touch the original, it produces new data — preserving test isolation. Same distinction as Java's `Stream.map()` vs `Stream.forEach()`: `map()` returns a new stream, `forEach()` does not. Practical CI pattern: `const failedNames = results.filter(r => !r.passed).map(r => r.name)` — the original `results` array remains untouched."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `find()` ile `filter()` ayrı metodlardır — birini kullanmak yeterli olmaz mıydı? `find()` erken çıkış (early exit) stratejisi kullanır: ilk eşleşmeyi bulur ve derhal durur — 10.000 elemanlı dizide 3. elemanda bulursa gerisini taramaz. `filter()` ise tüm diziyi baştan sona tarayıp tüm eşleşmeleri toplar. Bu fark küçük görünebilir ama büyük test veri setlerinde performansı belirler. Dahası dönüş tipleri farklıdır: `find()` element veya `undefined` döner, `filter()` her zaman dizi döner. Java'da `stream().findFirst()` vs `stream().filter().collect()` ayrımı aynıdır. QA kullanım kuralı: Benzersiz bir kayıt arıyorsan (tek bir kullanıcı ID'si, tek bir test senaryosu) → `find()`; birden fazla eşleşme bekliyorsan (tüm başarısız testler, tüm belirli statüsdeki kayıtlar) → `filter()`.",
          en: "Why are `find()` and `filter()` separate methods — couldn't one suffice? `find()` uses an early-exit strategy: it finds the first match and stops immediately — on a 10,000-element array that matches at position 3, it never scans the remaining 9,997 elements. `filter()` scans the entire array from start to finish and collects all matches. This difference seems minor but determines performance on large test data sets. Moreover, their return types differ: `find()` returns an element or `undefined`; `filter()` always returns an array. Same distinction as Java's `stream().findFirst()` vs `stream().filter().collect()`. QA usage rule: searching for a unique record (single user ID, single test scenario) → `find()`; expecting multiple matches (all failed tests, all records with a specific status) → `filter()`."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain map() and filter() to someone with zero programming knowledge using a fruit basket or another everyday analogy. Why prefer them over forEach()?",
        promptTr: "🤖 Mini Kahraman Soruyor: map() ve filter() metodlarını sıfır programlama bilgisi olan birine meyve sepeti ya da başka bir günlük hayat benzetmesiyle anlat. Neden forEach() yerine bunları tercih ederiz?",
        keywords: [
              ["dizi", "array"],
              ["filtrele", "filter"],
              ["dönüştür", "transform"],
              ["seç", "select"],
              ["yeni", "new"],
              ["orijinal", "original"],
              ["süzgeç", "sieve"],
              ["elek", "fruit"],
              ["meyve", "list"],
              ["liste", "keeps"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 6 — Conditions & Loops
  // ─────────────────────────────────────────────
  {
    title: { tr: "Karar Yapıları & Döngüler", en: "Conditions & Loops" },
    blocks: [
      {
        type: "css-animation",
        kind: "loops",
        label: { tr: "for Döngüsü — i Sayacı Adım Adım Artar", en: "for Loop — Counter i Increments Step by Step" }
      },
      {
        type: "simple-box",
        emoji: "🔁",
        content: {
          tr: "Karar yapıları ve döngüler, otomasyon kodunun trafik ışıkları ve kavşak yönlendirme sistemleridir: `if/else` kavşakta hangi yola gidileceğini belirler, döngüler (`for`, `while`, `for...of`) aynı yolu defalarca tekrar etmeyi sağlar. Peki neden JavaScript'te `for`, `for...of`, `for...in` ve `forEach()` gibi birden fazla döngü türü var? Her biri farklı bir senaryo için optimize edilmiştir: klasik `for` dizin kontrolü gerektiğinde, `for...of` iterable değerleri sırayla işlerken, `for...in` nesne anahtarlarını (key) iterate eder, `forEach()` ise yan etki için kullanılır. Java'daki karşılıklar: klasik `for`, enhanced `for-each`, `Iterator`. QA'da sık görülen senaryo: `for...of` ile bir sayfadaki tüm tablo satırlarını taramak: `for (const row of await page.locator('tr').all()) { ... }` — her satır için assertion çalıştırırsın.",
          en: "Conditionals and loops are the traffic lights and junction routing systems of automation code: `if/else` decides which road to take at an intersection, loops (`for`, `while`, `for...of`) let you travel the same road multiple times. Why does JavaScript have multiple loop types — `for`, `for...of`, `for...in`, `forEach()`? Each is optimized for a different scenario: classic `for` when you need index control, `for...of` for processing iterable values in sequence, `for...in` for iterating object keys, `forEach()` for side effects. Java equivalents: classic `for`, enhanced `for-each`, `Iterator`. Common QA scenario: using `for...of` to scan all table rows on a page: `for (const row of await page.locator('tr').all()) { ... }` — you run an assertion for each row."
        }
      },
      {
        type: "heading",
        content: { tr: "if / else if / else & Ternary Operatör", en: "if / else if / else & Ternary Operator" }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Koşul Yapıları Karşılaştırması", en: "Conditional Structures" },
        content: {
          tr: `// ─── if / else if / else ─────────────────────────────────────
let score = 75;

if (score >= 90) {
  console.log("✅ Üst Düzey");
} else if (score >= 60) {
  console.log("⚠️  Orta Düzey");   // Bu çalışır
} else {
  console.log("❌ Başarısız");
}

// ─── Ternary Operatör ─────────────────────────────────────────
// Kısa if/else — Java ile birebir aynı sözdizimi
let status = score >= 60 ? "passed" : "failed";
console.log("Test Durumu:", status); // "passed"

// ─── switch / case ────────────────────────────────────────────
let browser = "chromium";

switch (browser) {
  case "chromium":
    console.log("Chrome Driver yükleniyor...");
    break;          // break yoksa bir sonraki case'e düşer (fall-through)!
  case "firefox":
    console.log("Firefox Driver yükleniyor...");
    break;
  case "webkit":
    console.log("Safari Driver yükleniyor...");
    break;
  default:
    console.log("Bilinmeyen tarayıcı!");
}`,
          en: `// ─── if / else if / else ─────────────────────────────────────
let score = 75;

if (score >= 90) {
  console.log("✅ Advanced");
} else if (score >= 60) {
  console.log("⚠️  Intermediate");  // this branch runs
} else {
  console.log("❌ Failed");
}

// ─── Ternary Operator ─────────────────────────────────────────
// Short if/else — identical syntax to Java
let status = score >= 60 ? "passed" : "failed";
console.log("Test Status:", status); // "passed"

// ─── switch / case ────────────────────────────────────────────
let browser = "chromium";

switch (browser) {
  case "chromium":
    console.log("Loading Chrome Driver...");
    break;          // without break, falls through to next case!
  case "firefox":
    console.log("Loading Firefox Driver...");
    break;
  case "webkit":
    console.log("Loading Safari Driver...");
    break;
  default:
    console.log("Unknown browser!");
}`
        }
      },
      {
        type: "heading",
        content: { tr: "Tüm Döngü Türleri — Karşılaştırma", en: "All Loop Types — Side-by-Side" }
      },
      {
        type: "table",
        headers: [
          { tr: "Döngü", en: "Loop" },
          { tr: "Ne Zaman Kullanılır?", en: "When to Use?" },
          { tr: "Java Karşılığı", en: "Java Equivalent" },
          { tr: "Otomasyon Örneği", en: "Automation Example" }
        ],
        rows: [
          [
            "for (klasik)",
            { tr: "Index'e ihtiyaç varsa, sayaçlı tekrar", en: "When index is needed, counted iterations" },
            "for (int i=0; i<n; i++)",
            { tr: "Sayfa numaralarını gezme", en: "Iterating through page numbers" }
          ],
          [
            "for...of",
            { tr: "Array/iterable değerlerinde dolaşmak için", en: "Iterating values of array/iterable" },
            "for (String item : list)",
            { tr: "Tüm test satırlarını oku", en: "Read all table rows" }
          ],
          [
            "for...in",
            { tr: "Nesne özellik adlarını (key) dolaşmak için", en: "Iterating object property keys" },
            "map.entrySet().forEach()",
            { tr: "Response body field'larını denetle", en: "Validate API response body fields" }
          ],
          [
            "while",
            { tr: "Koşul doğru olduğu sürece tekrar", en: "Repeat while condition is true" },
            "while (cond) {}",
            { tr: "Element görünene kadar bekle", en: "Poll until element appears" }
          ],
          [
            "do...while",
            { tr: "En az 1 kez çalışması garantili", en: "Guaranteed at least 1 execution" },
            "do {} while (cond)",
            { tr: "İlk login denemesini her zaman yap", en: "Always attempt first login" }
          ]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "for...of ve for...in — Otomasyon Kullanımı", en: "for...of and for...in — Automation Usage" },
        content: {
          tr: `const testResults = [
  { id: 1, name: "Login Test",   status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test",  status: "passed" }
];

// for...of — Array değerleri üzerinde dön (Java'daki enhanced for gibi)
for (const test of testResults) {
  const icon = test.status === "passed" ? "✅" : "❌";
  console.log(\`\${icon} \${test.name}\`);
}

// for...in — Nesne key'leri üzerinde dön
const apiResponse = { statusCode: 200, message: "OK", data: [] };
for (const key in apiResponse) {
  console.log(\`\${key}: \${apiResponse[key]}\`);
}

// while — Polling (element görünene kadar bekle simülasyonu)
let retryCount = 0;
while (retryCount < 3) {
  console.log(\`Deneme \${retryCount + 1}: Element aranıyor...\`);
  retryCount++;
}`,
          en: `const testResults = [
  { id: 1, name: "Login Test",   status: "passed" },
  { id: 2, name: "Payment Test", status: "failed" },
  { id: 3, name: "Signup Test",  status: "passed" }
];

// for...of — iterate over array values (like Java's enhanced for)
for (const test of testResults) {
  const icon = test.status === "passed" ? "✅" : "❌";
  console.log(\`\${icon} \${test.name}\`);
}

// for...in — iterate over object keys
const apiResponse = { statusCode: 200, message: "OK", data: [] };
for (const key in apiResponse) {
  console.log(\`\${key}: \${apiResponse[key]}\`);
}

// while — Polling (simulate waiting until element appears)
let retryCount = 0;
while (retryCount < 3) {
  console.log(\`Attempt \${retryCount + 1}: Searching for element...\`);
  retryCount++;
}`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Koşullar ve döngülerin çalışma şekli!
let isElementFound = true;

if (isElementFound) {
  console.log("Element Bulundu: İşlem başlatılıyor.");
} else {
  console.log("Element Bulunamadı: Test fail ediliyor.");
}

// for...of döngüsü ile test sonuçlarını filtrele
const tests = ["passed","failed","passed","passed"];
let failCount = 0;
for (const result of tests) {
  if (result === "failed") failCount++;
}
console.log("Toplam Fail:", failCount, "/ Toplam:", tests.length);`,
          en: `// Run conditions and loop blocks!
let isElementFound = true;

if (isElementFound) {
  console.log("Element Found: Starting action.");
} else {
  console.log("Element Missing: Failing test.");
}

// for...of loop to count failed tests
const tests = ["passed","failed","passed","passed"];
let failCount = 0;
for (const result of tests) {
  if (result === "failed") failCount++;
}
console.log("Total Fails:", failCount, "/ Total:", tests.length);`
        }
      },
      jsLoopClosureTrapFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te bir dizinin (array) elemanları üzerinde doğrudan indeks bilgisi olmadan değer bazlı döngü kurmak için hangi for varyantı kullanılır?",
          en: "Which for loop variant is used to iterate through array values directly without manual index numbers?"
        },
        options: [
          { id: "a", text: "for...in" },
          { id: "b", text: "for...of" },
          { id: "c", text: "while" },
          { id: "d", text: "do...while" }
        ],
        correct: "b",
        explanation: {
          tr: "`for...of` döngüsü dizilerin (veya iterable olan yapıların) değerleri üzerinde doğrudan dönmemizi sağlar. Java'daki enhanced for (`for (String s : list)`) yapısının karşılığıdır. `for...in` ise nesne özellik adları (keys) üzerinde döner.",
          en: "`for...of` iterates through values of iterable structures like arrays — the JavaScript equivalent of Java's enhanced for-each loop (`for (String s : list)`). `for...in` iterates through object property keys/indexes instead."
        },
        retryQuestion: {
          question: {
            tr: "switch/case yapısında `break` ifadesi yazılmazsa ne olur?",
            en: "What happens in a switch/case block if the `break` statement is omitted?"
          },
          options: [
            { id: "a", text: { tr: "SyntaxError fırlatılır", en: "A SyntaxError is thrown" } },
            { id: "b", text: { tr: "Kod durur ve hiçbir şey çalışmaz", en: "The code stops and nothing executes" } },
            { id: "c", text: { tr: "Fall-through: eşleşen case'den sonraki tüm case'ler de çalışır", en: "Fall-through: all cases after the matching one also execute" } },
            { id: "d", text: { tr: "Sadece default bloğu çalışır", en: "Only the default block runs" } }
          ],
          correct: "c",
          explanation: {
            tr: "`break` yazılmadan bırakılan case'lerde 'fall-through' davranışı oluşur: eşleşen case'den sonraki tüm case blokları sırayla çalışır (koşul kontrolü yapılmadan). Bu davranış Java'da da aynıdır ve kasıtlı kullanılmadığı sürece bir bug kaynağıdır.",
            en: "Without `break`, 'fall-through' occurs: every case after the matching one runs sequentially without checking conditions. This behavior is identical in Java and is a common source of bugs unless intentionally used."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Bir API yanıtı nesnesinin (object) tüm alanlarını (key/value çiftleri) listelemek için hangi döngü kullanılmalıdır?",
          en: "Which loop is best suited for listing all fields (key/value pairs) of an API response object?"
        },
        options: [
          { id: "a", text: "for...of" },
          { id: "b", text: "while" },
          { id: "c", text: "for...in" },
          { id: "d", text: "do...while" }
        ],
        correct: "c",
        explanation: {
          tr: "`for...in` döngüsü, bir nesnenin enumerable (sayılabilir) özellik adları (key'leri) üzerinde döner. API yanıt kontrolünde (`{ statusCode: 200, message: 'OK' }` gibi nesnelerde) tüm field'ları listelemek için kullanılır. `for...of` ise dizi (array) değerleri üzerinde çalışır, nesneler üzerinde çalışmaz.",
          en: "`for...in` iterates through the enumerable property keys of an object. It is the right tool for checking all fields of an API response object like `{ statusCode: 200, message: 'OK' }`. `for...of` works on array values, not plain objects."
        },
        retryQuestion: {
          question: {
            tr: "Gövdenin (body) en az bir kez mutlaka çalışmasını garanti eden döngü hangisidir?",
            en: "Which loop guarantees its body executes at least once regardless of the condition?"
          },
          options: [
            { id: "a", text: "for" },
            { id: "b", text: "while" },
            { id: "c", text: "for...of" },
            { id: "d", text: "do...while" }
          ],
          correct: "d",
          explanation: {
            tr: "`do...while` döngüsünde gövde önce çalışır, koşul sonra kontrol edilir. Bu sayede koşul başlangıçta yanlış olsa bile döngü gövdesi en az 1 kez çalışır. Java'da da aynı yapı vardır.",
            en: "In `do...while`, the body executes first and the condition is checked afterward. This guarantees at least one execution even if the condition is false from the start — identical behavior to Java's `do...while`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`for...of` ve `for...in` arasındaki fark, birçok geliştiriciyi tuzağa düşürür. `for...of`, bir müzik listesindeki şarkı değerlerini sırayla verir — her iterasyonda gerçek elementi alırsın. `for...in` ise aynı listenin sıra numaralarını (index veya key) verir — şarkının kendisini değil. Peki neden bu ayrım önemli? `for...in` dizilerle birlikte kullanıldığında prototipin kalıtsal (inherited) özellikleri de dahil edebilir — beklenmedik değerler görünür. Java'da `Iterator<E>` her zaman değeri döndürür, key'i değil; JavaScript'te `for...of` bu davranışı taklit eder. QA senaryosu: `const rows = await page.locator('tr').all()` sonucunda dönen locator array'ini `for...of` ile iterate etmek güvenlidir; `for...in` ise beklenmedik özellik anahtarları ekleyebilir ve testini kırar.",
          en: "`for...of` vs `for...in` trips up many developers. `for...of` gives you the actual values of a list in sequence — each iteration you get the real element. `for...in` gives you the position numbers (index or key) — not the songs themselves. Why does this matter? When `for...in` is used with arrays, it can include inherited prototype properties — unexpected values appear. In Java, `Iterator<E>` always returns the value, not the key; JavaScript's `for...of` mirrors this behavior. QA scenario: iterating the locator array returned by `const rows = await page.locator('tr').all()` using `for...of` is safe; `for...in` can introduce unexpected property keys and break your test."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`while` döngüsü, sabah kahvaltısında tüm yemeği bitirene kadar devam etmek gibidir: kaç lokma atacağını önceden bilmezsin, sadece tabak boşaldığında durursun. Bilinmez tekrar sayısı — koşul kontrol eder. Klasik `for` ise yemek için zamanın 10 dakikan olduğunu bilmek ve her dakikada bir kaşık almak gibidir — adım sayısı bellidir. QA'da `while` hangi senaryoda kullanılır? Sayfa yüklenene kadar beklemek, eleman görünene kadar poll yapmak veya bir işlemin tamamlanmasını beklemek: `while (!isLoaded) { await page.waitForTimeout(100); }`. Ama dikkat: Playwright ve modern test araçları built-in bekleme mekanizmaları sunar (`expect(...).toBeVisible()`) — `while` döngüsüyle manuel polling yazmak hem daha kırılgan hem de daha az okunabilirdir. Java'da `while` yerine `WebDriverWait` kullanmak aynı mantıktır.",
          en: "`while` is like eating breakfast until the plate is empty: you don't know how many bites it will take, you stop only when the plate is cleared — unknown iteration count, condition controls. Classic `for` is knowing you have 10 minutes for breakfast and taking one spoonful each minute — the step count is predetermined. When is `while` used in QA? Waiting for a page to load, polling until an element appears, waiting for an operation to complete: `while (!isLoaded) { await page.waitForTimeout(100); }`. But be careful: Playwright and modern test tools offer built-in waiting mechanisms (`expect(...).toBeVisible()`) — writing manual polling with `while` is both more brittle and less readable. Using `WebDriverWait` instead of a raw `while` loop in Java reflects the same rationale."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`break` ve `continue`, döngüyü kontrol eden iki farklı trafik işareti gibidir: `break` döngüyü tamamen durdurur ve çıkar — kırmızı ışık. `continue` mevcut iterasyonu atlar ve bir sonrakine geçer — sarı ışık, yavaşla ama devam et. Peki Java'dan gelen biri için farklı olan ne? Java'da aynı keyword'ler aynı şekilde çalışır — sözdizim birebir aynı. Ama JavaScript'te `break` ve `continue` labeled döngülerde de kullanılabilir (nadiren görülür): `outerLoop: for (...) { for (...) { break outerLoop; } }` — iç döngüden dış döngüyü kırmak. QA'da `break` kullanım senaryosu: büyük bir test veri setini iterate ederken aranan koşul bulununca durdurmak; `continue` senaryosu: belirli durumları (zaten başarısız işaretlenmiş testleri) atlayıp devam etmek.",
          en: "`break` and `continue` are two different traffic signals controlling the loop: `break` halts the loop completely and exits — red light. `continue` skips the current iteration and moves to the next — yellow light, slow down but keep going. What is different for someone coming from Java? In Java the same keywords work the same way — the syntax is identical. However, in JavaScript `break` and `continue` also work with labeled loops (rarely seen): `outerLoop: for (...) { for (...) { break outerLoop; } }` — breaking out of the outer loop from inside the inner. QA `break` scenario: iterating a large test data set and stopping as soon as the target condition is found. QA `continue` scenario: skipping certain records (tests already marked as failed) and proceeding with the rest."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden dizi iterate ederken `for...in` yerine `for...of` kullanılmalı? `for...in`, bir nesnenin tüm enumerable özelliklerini döndürür — buna prototype zincirinden gelen kalıtsal (inherited) özellikler de dahildir. Bir üçüncü taraf kütüphane `Array.prototype`'a özellik eklemişse, `for...in` bu ekstra özellikleri de döndürür — beklenmedik davranış. `for...of` ise yalnızca iterator protokolüne uyan değerleri döner, prototip kirliliği yoktur. Java'da bu sorun yoktur: enhanced `for` sadece koleksiyonun elemanlarını döndürür, inherited metotları değil. QA'da bunun önemi: eski bir test kütüphanesi veya utility `Array.prototype`'a bir şey eklemişse ve sen `for...in` ile test sonuçlarını iterate edersen, anlamadığın değerler döngüye girer ve assertions yanıltıcı hale gelir.",
          en: "Why should you use `for...of` instead of `for...in` when iterating arrays? `for...in` returns all enumerable properties of an object — including inherited ones from the prototype chain. If a third-party library has added a property to `Array.prototype`, `for...in` returns those extra properties too — unexpected behavior. `for...of` only returns values conforming to the iterator protocol, with zero prototype pollution. In Java this problem does not exist: enhanced `for` returns only the collection's elements, not inherited methods. QA relevance: if an old test library or utility adds something to `Array.prototype` and you iterate test results with `for...in`, unrecognized values enter your loop and assertions become misleading."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden bazı durumlarda döngü yerine rekürsiyon (özyineleme) kullanılır? Döngüler düz listelerde çalışır ama ağaç yapısındaki verilerde (DOM, dosya sistemi, iç içe JSON) derinlik bilinmez — kaç kat iç içe geçmiş olduğunu önceden bilemezsin. Rekürsiyon, problemi kendisinin daha küçük bir kopyasına indirger: `function traverse(node) { process(node); node.children.forEach(child => traverse(child)); }`. Peki neden dikkatli olunmalı? JavaScript'te call stack sınırlıdır: çok derin rekürsiyon `RangeError: Maximum call stack size exceeded` hatasına yol açar — Java'daki `StackOverflowError`. Bu, büyük DOM ağaçlarını test ederken veya derin iç içe geçmiş API yanıtlarını parse ederken önemlidir. Güvenli alternatif: iterative DFS (Depth-First Search) ile explicit stack kullanmak — bu, Java'daki `Deque` ile iterative ağaç traversal mantığıdır.",
          en: "Why use recursion instead of loops in some cases? Loops work for flat lists, but with tree-structured data (DOM, file system, nested JSON) the depth is unknown — you cannot know in advance how many levels of nesting exist. Recursion reduces the problem to a smaller copy of itself: `function traverse(node) { process(node); node.children.forEach(child => traverse(child)); }`. Why must you be careful? JavaScript's call stack is limited: deeply nested recursion leads to `RangeError: Maximum call stack size exceeded` — Java's equivalent `StackOverflowError`. This matters when testing large DOM trees or parsing deeply nested API responses. Safe alternative: iterative DFS (Depth-First Search) using an explicit stack — equivalent to iterative tree traversal with Java's `Deque`."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How do you use if/else and for...of in a real test scenario? Which structures would you choose when scanning a table of test results, and why? No jargon!",
        promptTr: "🤖 Mini Kahraman Soruyor: if/else ve for...of döngüsünü gerçek bir test senaryosunda nasıl kullanırsın? Bir tablodaki test sonuçlarını tararken hangi yapıları seçersin ve neden? Jargonsuz anlat!",
        keywords: [
              ["koşul", "condition"],
              ["döngü", "loop"],
              ["her", "each"],
              ["sıra", "row"],
              ["karar", "decision"],
              ["eğer", "if"],
              ["kontrol", "check"],
              "for",
              "while",
              ["tara", "scan"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 7 — Event Loop & Asynchronous JS
  // ─────────────────────────────────────────────
  {
    title: { tr: "Event Loop & Asenkron Yapı", en: "Event Loop & Asynchronous JS" },
    blocks: [
      {
        type: "simple-box",
        emoji: "🎡",
        content: {
          tr: "JavaScript'in Event Loop'unu anlamak, Playwright testlerindeki timing sorunlarını çözmek için şarttır. JavaScript tek iş parçacıklıdır (single-threaded): aynı anda yalnızca bir işlem yapılabilir — tıpkı tek kasiyer olan bir markette sıraya girmek gibi. Peki bu tek kasiyer ağ istekleri veya zamanlayıcılar gibi uzun işlemleri nasıl bloke etmeden yönetir? Web APIs'e havale eder: `fetch()`, `setTimeout()` gibi işlemler tarayıcının arka plan servislerine devredilir ve tamamlanınca callback kuyruğuna (Callback Queue) alınır. Event Loop, Call Stack boşaldığı anda kuyruktaki işi alır ve çalıştırır. Neden Java'dan farklı? Java multi-thread çalışır: ağ isteği için yeni bir thread açılır. JavaScript tek thread'de asenkron işleri sıra ile yönetir — `async/await` bu sırayı zarif ve okunabilir hale getirir. Playwright `await` kullanmak zorundadır çünkü tüm browser aksiyonları asenkron Promise döndürür.",
          en: "Understanding JavaScript's Event Loop is essential for fixing timing issues in Playwright tests. JavaScript is single-threaded: only one operation can happen at a time — like queuing up at a store with a single cashier. But how does this single cashier manage long operations like network requests or timers without blocking? It delegates them to Web APIs: `fetch()`, `setTimeout()` and similar operations are handed off to browser background services, and when they complete they are placed in the Callback Queue. The Event Loop picks up the next queued task the moment the Call Stack is empty. Why is this different from Java? Java is multi-threaded: a new thread is opened for a network request. JavaScript manages asynchronous work sequentially on a single thread — `async/await` makes this sequence elegant and readable. Playwright must use `await` because all browser actions return asynchronous Promises."
        }
      },
      {
        type: "js-eventloop-visual"
      },
      {
        type: "heading",
        content: { tr: "Event Loop Mekanizması", en: "How the Event Loop Works" }
      },
      {
        type: "steps",
        items: [
          {
            label: { tr: "Call Stack (Çalışma Kuyruğu)", en: "Call Stack" },
            desc: { tr: "O an çalışan senkron kod satırlarının üst üste eklendiği stack. JavaScript tek iş parçacıklı olduğundan stack'te tek seferde tek bir işlem yürütülür.", en: "The stack where synchronous code execution happens. Since JS is single-threaded, only one action runs at a time here." }
          },
          {
            label: { tr: "Web API (Arka Plan Görevleri)", en: "Web APIs" },
            desc: { tr: "Tarayıcının sunduğu `setTimeout`, network istekleri (`fetch`) ve DOM eventleri gibi asenkron ve zaman alan işlerin yönetildiği alan.", en: "Where asynchronous and time-consuming tasks like `setTimeout`, network requests (`fetch`), and DOM events are managed by the browser environment." }
          },
          {
            label: { tr: "Callback Queue (Sıra Bekleyenler)", en: "Callback Queue" },
            desc: { tr: "Web API'de süresi dolan veya işlemi biten asenkron fonksiyonların (callback) Call Stack'e girmeyi beklediği bekleme salonu.", en: "The waiting room where asynchronous callbacks wait to enter the Call Stack once their timers or tasks finish." }
          },
          {
            label: { tr: "Event Loop (Bekçi/Döngü)", en: "Event Loop" },
            desc: { tr: "Call Stack tamamen boşaldığı an devreye girer. Callback Queue'da sırası gelen ilk fonksiyonu (microtask öncelikli olacak şekilde) alır ve Call Stack'e fırlatır.", en: "Wakes up the moment the Call Stack is empty. It grabs the first callback waiting in the queue and pushes it back into the Call Stack." }
          }
        ]
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Asenkron çalışma sırasını canlı izleyin!
console.log("1. Stack Başladı");

setTimeout(() => {
  console.log("2. Zamanlayıcı Tetiklendi (Web API -> Queue)");
}, 500);

console.log("3. Stack Bitti");`,
          en: `// Run this snippet and watch the async print order!
console.log("1. Stack Start");

setTimeout(() => {
  console.log("2. Timer Triggered (Web API -> Queue)");
}, 500);

console.log("3. Stack End");`
        }
      },
      jsEventLoopFlowFilm,
      jsEventLoopMechanismSteps,
      {
        type: "quiz",
        question: {
          tr: "Bir `setTimeout(() => console.log('B'), 0); console.log('A');` kodu çalıştırılırsa konsolda hangi sıra görünür?",
          en: "What sequence is printed in the console for `setTimeout(() => console.log('B'), 0); console.log('A');`?"
        },
        options: [
          { id: "a", text: "B, A" },
          { id: "b", text: "A, B" },
          { id: "c", text: { tr: "Aynı anda basılırlar", en: "Printed simultaneously" } },
          { id: "d", text: { tr: "Sadece B basılır", en: "Only B is printed" } }
        ],
        correct: "b",
        explanation: {
          tr: "`setTimeout` 0 ms bile olsa asenkron bir Web API görevidir. Callback kuyruğuna alınır. Call Stack'teki senkron `console.log('A')` çalışır. Stack boşaldığında Event Loop callback'i ('B') stack'e yükler. Bu yüzden çıktı hep 'A, B' olur.",
          en: "`setTimeout` is an asynchronous Web API task, even with a 0ms delay. It is pushed to the callback queue. The synchronous `console.log('A')` runs first in the Call Stack. Once empty, the Event Loop pushes the callback ('B') into the stack, producing 'A, B'."
        },
        retryQuestion: {
          question: {
            tr: "Event Loop ne zaman Callback Queue'daki bir görevi Call Stack'e taşır?",
            en: "When does the Event Loop move a task from the Callback Queue to the Call Stack?"
          },
          options: [
            { id: "a", text: { tr: "İstediği her an taşıyabilir", en: "Anytime it wants to" } },
            { id: "b", text: { tr: "Yalnızca Call Stack tamamen boşaldığı zaman", en: "Only when the Call Stack is completely empty" } },
            { id: "c", text: { tr: "Tarayıcı kapatıldığı zaman", en: "Only when the browser is closed" } },
            { id: "d", text: { tr: "Farklı bir thread oluştuğunda", en: "When a new thread is spawned" } }
          ],
          correct: "b",
          explanation: {
            tr: "JavaScript'in 'Run-to-completion' kuralı vardır. Call Stack'te yürütülmekte olan senkron kod bitip stack tamamen sıfırlanmadan Event Loop hiçbir callback'i içeri almaz.",
            en: "JavaScript follows a 'Run-to-completion' rule. The Event Loop will never push any callback into the Call Stack until all synchronous code in the stack completes and the stack is completely empty."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Event Loop, tek bir vardiyalı hemşire olan bir acil servise benzer: hemşire (Call Stack) aynı anda yalnızca bir hastaya bakabilir; diğerleri bekleme odasında (Callback Queue) sıraya girer. Laboratuvar sonuçları (ağ isteği/setTimeout) hazır olduğunda, hemşire boşaldığı anda ona çağrılır. Peki neden Java'daki gibi çoklu thread kullanılmıyor? Tarayıcıda çoklu thread DOM'a aynı anda yazmaya çalışırdı — yarış koşulları (race conditions) ve tahmin edilemez UI davranışları. Tek thread bu karmaşıklığı ortadan kaldırır. QA için kritik anlayış: `await page.click('button')` yazarken, click aksiyonu Web API'ye devredilir, Promise resolve olunca Event Loop test koduna geri döner. `await` unutulursa kod bir sonraki satıra geçer ama click henüz gerçekleşmemiştir — klasik timing bug ve flaky test kaynağı.",
          en: "The Event Loop resembles an emergency room with a single on-duty nurse: the nurse (Call Stack) can attend to only one patient at a time; others wait in the waiting room (Callback Queue). When lab results (network request/setTimeout) are ready, the nurse is called as soon as she is free. Why not use multiple threads like Java? Multiple threads writing to the DOM simultaneously would create race conditions and unpredictable UI behavior. A single thread eliminates this complexity entirely. Critical QA understanding: when you write `await page.click('button')`, the click action is delegated to the Web API, and the Event Loop returns control to your test code once the Promise resolves. If `await` is forgotten, code proceeds to the next line but the click has not yet occurred — the classic timing bug and source of flaky tests."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Call Stack, Callback Queue ve Microtask Queue üçlüsünü anlamak, test assertion'larının neden bazen yanlış sırayla çalıştığını açıklar. Call Stack: şu an yürütülen senkron kod. Microtask Queue: Promise callback'leri (`then`, `catch`, `async/await`) — Call Stack boşalınca ÖNCE burası tüketilir. Callback Queue (Macrotask): `setTimeout`, DOM event'leri — Microtask Queue tamamen boşaldıktan sonra buradan iş alınır. Neden bu sıra önemli? `setTimeout(fn, 0)` yazdığında fn anında çalışmaz: önce tüm senkron kod, sonra tüm Promise callback'leri çalışır, en son fn çalışır. Java'da bu tür öncelik kuyruğu yoktur — thread'ler OS scheduler tarafından yönetilir. Playwright testlerinde assertion'lardan önce `await` kullanmak bu sıraya göre doğru zamanlamayı garantiler.",
          en: "Understanding the trio of Call Stack, Callback Queue, and Microtask Queue explains why test assertions sometimes run in unexpected order. Call Stack: currently executing synchronous code. Microtask Queue: Promise callbacks (`then`, `catch`, `async/await`) — drained FIRST when the Call Stack empties. Callback Queue (Macrotask): `setTimeout`, DOM events — work is taken from here only after the Microtask Queue is completely empty. Why does this order matter? Writing `setTimeout(fn, 0)` does not run `fn` immediately: all synchronous code runs first, then all Promise callbacks, and `fn` runs last. Java has no equivalent priority queue — threads are managed by the OS scheduler. Using `await` before assertions in Playwright tests guarantees correct timing according to this sequence."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Microtask Queue (Promise'lar için) ve Macrotask Queue (setTimeout için) iki farklı LEGO parça bandıdır. Çalışan her zaman önce Microtask bandını tamamen bitirir, sonra Macrotask bandından bir iş alır. Bu yüzden `Promise.resolve().then()` her zaman `setTimeout(fn, 0)`'dan önce çalışır.",
          en: "The Microtask Queue (for Promises) and Macrotask Queue (for setTimeout) are two separate LEGO conveyor belts. The worker always empties the Microtask belt completely before picking from the Macrotask belt. That's why `Promise.resolve().then()` always runs before `setTimeout(fn, 0)`."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript tek iş parçacıklıdır ama modern web uygulamaları çok görevli (multi-task) görünür? Tek bir şef, birden fazla tencereyi aynı anda kaynatıyor gibi görünür ama aslında sırayla dikkat eder: ocağa koydun, zamanlayıcı kurar, başka işe geçersin, ötünce geri dönersin. JavaScript de aynı şekilde: uzun işleri Web API'ye havale eder, tamamlanınca geri döner. Gerçek paralel hesaplama gerekiyorsa Web Workers kullanılır — ama DOM'a dokunamazlar, çünkü iki worker aynı anda DOM'u değiştirmeye çalışırsa race condition oluşur. Java'da bu sorun thread synchronization mekanizmaları (`synchronized`, `volatile`, `ReentrantLock`) ile çözülür — ama bu büyük karmaşıklık yaratır. JavaScript, DOM operasyonlarını tek thread'e sınırlayarak bu karmaşıklığı tamamen ortadan kaldırdı. QA'da önemi: Playwright testleri tek thread'de koşar, `await` ile her adımı sırayla bekler — bu tahmin edilebilir test davranışının temelidir.",
          en: "Why is JavaScript single-threaded, yet modern web apps appear to handle many tasks simultaneously? A single chef manages multiple pots — not all at the same time, but by paying sequential attention: put it on the stove, set a timer, do something else, come back when it beeps. JavaScript works the same way: it delegates long operations to Web APIs and returns when they complete. For true parallel computation, Web Workers are used — but they cannot touch the DOM, because two workers simultaneously mutating the DOM creates race conditions. In Java, this problem is solved with thread synchronization mechanisms (`synchronized`, `volatile`, `ReentrantLock`) — introducing major complexity. JavaScript eliminated that complexity entirely by restricting DOM operations to one thread. QA relevance: Playwright tests run on a single thread, awaiting each step in sequence — this is the foundation of predictable test behavior."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `setTimeout(fn, 0)` anında çalışmıyor — 0 milisaniye demek 'hemen' değil mi? Bu, Event Loop'un en yanıltıcı köşesidir. `setTimeout(fn, 0)` callback'i Macrotask Queue'ya koyar — ve Macrotask Queue'dan iş alınabilmesi için hem Call Stack hem de Microtask Queue'nun tamamen boşalması gerekir. Yani `0 ms` gecikme \"mümkün olan en kısa sürede, ama şu anki her şey bitince\" demektir. Bu bilgi Playwright testlerinde kritiktir: `setTimeout` ile yapılan delay'ler tahmin edilemez davranış gösterebilir. Java'da `Thread.sleep(0)` anlık context switch hintı verir ama JavaScript'te `setTimeout(fn, 0)` böyle bir garanti vermez — önce tüm Promise callback'leri (Microtask) tamamlanır. Pratik QA kuralı: test kodunda gecikme gerekiyorsa `await page.waitForTimeout(ms)` veya `expect(...).toBeVisible()` gibi Playwright'ın kendi mekanizmalarını kullan.",
          en: "Why doesn't `setTimeout(fn, 0)` run immediately — doesn't `0 milliseconds` mean 'now'? This is the most misleading corner of the Event Loop. `setTimeout(fn, 0)` puts the callback in the Macrotask Queue — and before anything can be taken from the Macrotask Queue, both the Call Stack AND the Microtask Queue must be completely empty. So `0 ms` delay means \"as soon as possible, but after everything currently running.\" This is critical knowledge for Playwright tests: delays implemented with `setTimeout` can exhibit unpredictable behavior. In Java, `Thread.sleep(0)` gives an instant context switch hint, but JavaScript's `setTimeout(fn, 0)` makes no such guarantee — all Promise callbacks (Microtasks) complete first. Practical QA rule: when a delay is needed in test code, use Playwright's own mechanisms like `await page.waitForTimeout(ms)` or `expect(...).toBeVisible()`."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki çıktı sırası nedir?\n```js\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n```", en: "What is the output order?\n```js\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n```" },
        options: [
          { id: "a", text: { tr: "A, B, C, D", en: "A, B, C, D" } },
          { id: "b", text: { tr: "A, D, C, B", en: "A, D, C, B" } },
          { id: "c", text: { tr: "A, D, B, C", en: "A, D, B, C" } },
          { id: "d", text: { tr: "A, C, D, B", en: "A, C, D, B" } }
        ],
        correct: "b",
        explanation: { tr: "Senkron kodlar önce: A ve D. Sonra Microtask Queue (Promise): C. En son Macrotask Queue (setTimeout): B. Sıra: A → D → C → B.", en: "Synchronous code runs first: A and D. Then Microtask Queue (Promise callbacks): C. Finally Macrotask Queue (setTimeout): B. Order: A → D → C → B." },
        retryQuestion: {
          question: { tr: "Call Stack nedir?", en: "What is the Call Stack?" },
          options: [
            { id: "a", text: { tr: "Asenkron görevlerin beklediği yer", en: "Where async tasks wait" } },
            { id: "b", text: { tr: "JavaScript'in şu anda yürüttüğü fonksiyonların listesi", en: "The list of functions JS is currently executing" } },
            { id: "c", text: { tr: "setTimeout'ları tutan yapı", en: "The structure holding setTimeouts" } },
            { id: "d", text: { tr: "DOM element listesi", en: "List of DOM elements" } }
          ],
          correct: "b",
          explanation: { tr: "Call Stack, JavaScript motoru'nun şu anda yürütmekte olduğu fonksiyonların LIFO (Last In First Out) sırasıyla tutulduğu yapıdır.", en: "The Call Stack is a LIFO (Last In First Out) structure tracking which functions the JavaScript engine is currently executing." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why is JavaScript single-threaded and how does it still handle tasks? Explain the Event Loop to a 5-year-old using an ice cream queue or another analogy.",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript neden tek iş parçacıklıdır ve bu nasıl çalışır? Event Loop'u 5 yaşındaki bir çocuğa dondurma kuyruğu veya başka bir benzetmeyle anlat.",
        keywords: [
              ["sıra", "queue"],
              ["kuyruk", "single"],
              ["tek", "wait"],
              ["bekle", "empty"],
              ["boşaldı", "ice"],
              ["dondurmacı", "back"],
              ["geri", "stack"],
              ["stack", "async"],
              ["asenkron", "order"],
              ["sıralı", "one"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 8 — Promises & Closures
  // ─────────────────────────────────────────────
  {
    title: { tr: "Promises & Closures", en: "Promises & Closures" },
    blocks: [
      {
        type: "css-animation",
        kind: "promises",
        label: { tr: "Promise Akışı — pending → fulfilled/rejected", en: "Promise Flow — pending → fulfilled/rejected" }
      },
      {
        type: "simple-box",
        emoji: "🧬",
        content: {
          tr: "Promise ve Closure, JavaScript'in en temel iki kavramıdır ve ikisi de Playwright testlerinin derininde çalışır. Promise, bir restoran numaracısı gibidir: masaya oturduğunda numara alırsın, yemek hazır olunca titreşir — \"bekle, bitince haber veririm\" sözü. `pending` (hazırlanıyor), `fulfilled` (hazır), `rejected` (iptal) üç durumu vardır. Peki neden Java'da bu kavram yok? Java multi-thread olduğundan `CompletableFuture` benzer bir rol oynar, ama callback zincirleri `.thenApply()/.thenCompose()` syntax'ı Promise kadar okunabilir değildir. Closure ise, çantasını kapıda bırakan birinin ceplerindeki malzemelere (gizli değişkenlere) hâlâ sahip olması gibidir: fonksiyon döndürülmüş, dış scope kapanmış, ama iç fonksiyon dıştaki değişkenleri hatırlamaya devam eder. QA'da closure, test fixture'larını ve config değerlerini fonksiyonlar arasında saklamak için kullanılır.",
          en: "Promise and Closure are JavaScript's two most fundamental concepts and both work deep inside Playwright tests. A Promise is like a restaurant pager: you get a number when seated, it vibrates when your food is ready — \"wait, I'll notify you when done.\" It has three states: `pending` (being prepared), `fulfilled` (ready), `rejected` (cancelled). Why doesn't Java have this concept? Java is multi-threaded so `CompletableFuture` plays a similar role, but callback chains via `.thenApply()/.thenCompose()` are less readable than Promise chains. A Closure is like someone leaving their bag at the door but still having items in their pockets (private variables): the function has been returned, the outer scope has closed, but the inner function continues to remember the outer variables. In QA, closures are used to store test fixture data and config values across functions."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Promise & Closure Örnekleri", en: "Promise & Closure Examples" },
        content: {
          tr: `// 1. Bir Promise Tanımlama (Dondurma Sözü)
const iceCreamPromise = new Promise((resolve, reject) => {
  const isReady = true;
  if (isReady) resolve('🍦 Dondurma Hazır!');
  else reject('😢 Dondurma Kalmadı.');
});

// 2. Closure Örneği (Sırt Çantası / Private Değişken)
function createBackpack() {
  let toy = '🧸 Ayıcık'; // Dışarıdan erişilemeyen private değişken
  return {
    getToy: () => toy,
    setToy: (newToy) => { toy = newToy; }
  };
}
const myBackpack = createBackpack();
console.log(myBackpack.getToy()); // '🧸 Ayıcık'`,
          en: `// 1. Defining a Promise (Ice Cream Pager)
const iceCreamPromise = new Promise((resolve, reject) => {
  const isReady = true;
  if (isReady) resolve('🍦 Ice Cream Ready!');
  else reject('😢 Ice Cream Sold Out.');
});

// 2. Closure Example (Backpack / Private Variable)
function createBackpack() {
  let toy = '🧸 Teddy Bear'; // private variable — not accessible from outside
  return {
    getToy: () => toy,
    setToy: (newToy) => { toy = newToy; }
  };
}
const myBackpack = createBackpack();
console.log(myBackpack.getToy()); // '🧸 Teddy Bear'`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// async/await ve closures yapısını test edin!
const getDelay = (ms) => new Promise(res => setTimeout(res, ms));

async function runTest() {
  console.log("Adım 1: Tarayıcı açılıyor...");
  await getDelay(1000);
  console.log("Adım 2: Sayfa yüklendi (1s bekletildi).");
}
runTest();

// Closure testi
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log("Sayaç 1:", counter());
console.log("Sayaç 2:", counter());`,
          en: `// Experiment with async/await and closures!
const getDelay = (ms) => new Promise(res => setTimeout(res, ms));

async function runTest() {
  console.log("Step 1: Launching browser...");
  await getDelay(1000);
  console.log("Step 2: Page loaded successfully after 1s wait.");
}
runTest();

// Closure test
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log("Count call 1:", counter());
console.log("Count call 2:", counter());`
        }
      },
      jsPromiseMicrotaskFilm,
      {
        type: "quiz",
        question: {
          tr: "Bir fonksiyondan geriye dönen başka bir fonksiyonun, üst scope'taki değişkenleri hafızasında tutma yeteneğine ne ad verilir?",
          en: "What is it called when an inner function remembers and accesses variables from its outer lexical scope?"
        },
        options: [
          { id: "a", text: "Hoisting" },
          { id: "b", text: "Closure" },
          { id: "c", text: "Prototype" },
          { id: "d", text: "Event Loop" }
        ],
        correct: "b",
        explanation: {
          tr: "Closure (Kapanış), bir fonksiyonun kendi dışındaki (parent) kapsamda bulunan değişkenlere, parent fonksiyonu sonlansa dahi erişebilmesidir. JavaScript'te veri gizleme (data encapsulation) amacıyla kullanılır.",
          en: "Closure is when a function remembers and accesses variables from its outer lexical scope, even after the outer function has finished executing. It is often used for data encapsulation."
        },
        retryQuestion: {
          question: {
            tr: "Bir Promise nesnesinin sahip olabileceği üç durum (state) nedir?",
            en: "What are the three possible states of a Promise object?"
          },
          options: [
            { id: "a", text: "Start, Run, Stop" },
            { id: "b", text: "Pending, Fulfilled, Rejected" },
            { id: "c", text: "Stack, Heap, Queue" },
            { id: "d", text: "Create, Compile, Execute" }
          ],
          correct: "b",
          explanation: {
            tr: "Bir Promise henüz sonuçlanmamışken `pending` (beklemede), başarıyla çözüldüğünde `fulfilled` (yerine getirildi) ve hata aldığında `rejected` (reddedildi) durumundadır.",
            en: "A Promise is either `pending` (in progress), `fulfilled` (resolved successfully), or `rejected` (failed with an error)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Closure, bir sandık gibidir: dışarıdan kilitli görünür, ama içindeki işçinin (iç fonksiyon) sandık içindeki araçlara (dış değişkenler) erişimi vardır. Sandık kapandığında (dış fonksiyon döndüğünde) içerdeki araçlar dışarıdan görünmez ama işçi kullanmaya devam edebilir. Neden bu önemli? Counter, ID generator, config holder gibi private state gerektiren her yapıda closure kullanılır. Java'da aynı amacı `private` field'lı class ile sağlarsın: `private int count;` — closure bu encapsulation'ı class yazmadan fonksiyon seviyesinde sunar. QA uygulaması: test suite'inde her test için benzersiz kullanıcı adı üreten bir generator: `function makeUserFactory(prefix) { let id = 0; return () => prefix + (++id); }` — iç fonksiyon dışarıdan erişilemeyen `id` ve `prefix`'i hatırlar.",
          en: "A closure is like a locked chest: it looks sealed from outside, but the worker inside (the inner function) still has access to the tools in the chest (outer variables). When the chest closes (when the outer function returns), the tools are invisible from outside but the worker can continue using them. Why does this matter? Any structure requiring private state — counters, ID generators, config holders — uses closures. In Java you achieve the same thing with a class's `private` field: `private int count;` — closures offer this encapsulation at the function level without writing a class. QA application: a generator producing unique usernames for each test: `function makeUserFactory(prefix) { let id = 0; return () => prefix + (++id); }` — the inner function remembers `id` and `prefix` that are inaccessible from outside."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`async/await`, Promise zincirlerine karşı hangi avantajı sunar? Bir Promise zinciri `.then().then().catch()` yatay büyür ve derin zincirlerde okunabilirlik bozulur. `async/await` aynı asenkron kodu sanki senkronmuş gibi dikey (yukarıdan aşağıya) yazar. `try/catch` ile hata yakalamak Java'daki `try/catch` ile birebir aynı — zihni dönüştürme gerektirmez. Ama neden `await` `async` fonksiyon içinde olmalı? Çünkü `await` bir Promise'in çözülmesini bekler ve bu bekleme süresince motor başka işler yapabilir — ama bu beklemeyi işlemek için fonksiyon `async` olarak işaretlenmiş olmalı, yoksa motor hangi bağlamın beklediğini bilemez. Java'daki `CompletableFuture.get()` blocking bekleme yapar ve thread'i bloke eder; `await` ise Event Loop'u bloke etmez, sadece o async fonksiyonun ilerlemesini durdurur.",
          en: "What advantage does `async/await` offer over Promise chains? A Promise chain `.then().then().catch()` grows horizontally and becomes unreadable in deep chains. `async/await` writes the same async code vertically (top to bottom) as if it were synchronous. Error handling with `try/catch` is identical to Java's `try/catch` — no mental translation required. But why must `await` be inside an `async` function? Because `await` pauses execution until a Promise resolves, and during that wait the engine can do other work — but the function must be marked `async` so the engine knows which context is waiting, otherwise the runtime does not know how to handle the pause. Java's `CompletableFuture.get()` does blocking wait and freezes the thread; `await` does not block the Event Loop — it only pauses that specific async function's progress."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`Promise.all()`, `Promise.race()` ve `Promise.allSettled()` birden fazla asenkron işlemi koordine etmenin farklı stratejileridir. `Promise.all([p1, p2, p3])` tüm Promise'ları paralel başlatır ve hepsi tamamlanınca sonuçları dizi olarak döndürür — biri `reject` olursa hemen `reject` olur. `Promise.race()` ise ilk tamamlananı (hızlı olan kazanır) döndürür — timeout mekanizması için idealdir. `Promise.allSettled()` tüm Promise'ların sonucunu bekler ama birinin başarısız olması diğerlerini etkilemez. QA'da kritik kullanım: birden fazla API endpoint'ini paralel test etmek: `const results = await Promise.allSettled([testLogin(), testLogout(), testDashboard()])` — bir endpoint başarısız olsa diğerleri tamamlanır, tüm sonuçları görebilirsin. Java'da `CompletableFuture.allOf()` benzer paralel koordinasyon sağlar.",
          en: "`Promise.all()`, `Promise.race()`, and `Promise.allSettled()` are different strategies for coordinating multiple async operations. `Promise.all([p1, p2, p3])` starts all Promises in parallel and returns their results as an array when all complete — if any `reject`, it immediately rejects. `Promise.race()` returns whichever finishes first (speed wins) — ideal for timeout mechanisms. `Promise.allSettled()` waits for all Promises but one failing does not affect others. Critical QA use case: testing multiple API endpoints in parallel: `const results = await Promise.allSettled([testLogin(), testLogout(), testDashboard()])` — if one endpoint fails the others still complete and you can see all results. Java's `CompletableFuture.allOf()` provides similar parallel coordination."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `async/await` daha okunaklı ama `async` keyword'ü olmadan `await` kullanamazsın? Düşün ki bir ofiste kıdemli çalışan (async fonksiyon) \"bekle\" (await) diyebilir — ama stajyer (normal fonksiyon) kıdem yetkisi olmadan \"bekle\" diyemez. Teknik açıdan: `await` bir Promise resolve olana kadar o fonksiyonun yürütmesini duraklatır; bu duraklatmanın nasıl yönetileceğini Event Loop'a anlatmak için fonksiyonun `async` olarak işaretlenmesi gerekir. Bir `async` fonksiyon her zaman Promise döndürür: `return 42` otomatik olarak `Promise.resolve(42)` haline gelir. Java analoji: `CompletableFuture.supplyAsync(() -> 42)` benzer şekilde değeri otomatik olarak `Future` içine sarar. QA'da pratik kural: Playwright'taki her test fonksiyonu `async ({ page }) => {}` şeklinde tanımlanır çünkü tüm browser aksiyonları Promise döndürür ve `await` zorunludur.",
          en: "Why is `async/await` more readable, yet you cannot use `await` without the `async` keyword? Think of a senior employee (async function) who has authority to say \"wait\" (await) — but an intern (regular function) cannot say \"wait\" without the authority level. Technically: `await` pauses that function's execution until a Promise resolves; the function must be marked `async` to tell the Event Loop how to manage this pause. An `async` function always returns a Promise: `return 42` automatically becomes `Promise.resolve(42)`. Java analogy: `CompletableFuture.supplyAsync(() -> 42)` similarly wraps the value in a `Future` automatically. Practical QA rule: every Playwright test function is defined as `async ({ page }) => {}` because all browser actions return Promises and `await` is mandatory."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden closure'lar bellek sızıntısına (memory leak) yol açabilir? Closure, dıştaki değişkene referans tuttuğu için garbage collector o değişkeni silmez. Eğer closure event listener olarak DOM'a bağlanırsa ve element DOM'dan kaldırılmazsa, closure da bellekte kalır. Test otomasyonunda cleanup (temizlik) adımları bu yüzden önemlidir.",
          en: "Why can closures cause memory leaks? A closure holds a reference to the outer variable, preventing garbage collection of that variable. If a closure is attached to the DOM as an event listener and the element is never removed, the closure stays in memory indefinitely. This is why cleanup steps matter in test automation."
        }
      },
      {
        type: "quiz",
        question: { tr: "`Promise.all([p1, p2, p3])` ne zaman reject olur?", en: "When does `Promise.all([p1, p2, p3])` reject?" },
        options: [
          { id: "a", text: { tr: "Hiçbir promise başarısız olmadığında", en: "When none of the promises fail" } },
          { id: "b", text: { tr: "Herhangi biri reject olduğunda — hepsi aynı anda başlatılır ama biri başarısız olursa tümü başarısız sayılır", en: "When any ONE rejects — all start simultaneously but one failure fails the whole batch" } },
          { id: "c", text: { tr: "Yalnızca tüm promise'lar aynı anda reject olduğunda", en: "Only when all promises reject simultaneously" } },
          { id: "d", text: { tr: "Hiçbir zaman reject olmaz", en: "It never rejects" } }
        ],
        correct: "b",
        explanation: { tr: "`Promise.all` tüm promise'ları aynı anda başlatır. Hepsi resolve olursa, resolve değerlerinin dizisini döndürür. Herhangi biri reject olursa, ilk reject'in nedenini hemen döndürür — diğerleri iptal edilemez ama sonuçları görmezden gelinir.", en: "`Promise.all` starts all promises simultaneously. If all resolve, it returns an array of resolved values. If any ONE rejects, it immediately returns that rejection reason — the others cannot be cancelled but their results are ignored." },
        retryQuestion: {
          question: { tr: "`async` fonksiyon içinde `return 42` yazdığında ne döner?", en: "What does returning `42` inside an `async` function actually return?" },
          options: [
            { id: "a", text: { tr: "42 (sayı olarak)", en: "42 (as a number)" } },
            { id: "b", text: "Promise.resolve(42)" },
            { id: "c", text: "undefined" },
            { id: "d", text: "Promise.reject(42)" }
          ],
          correct: "b",
          explanation: { tr: "`async` fonksiyonlar HER ZAMAN bir Promise döndürür. `return 42` otomatik olarak `Promise.resolve(42)` haline gelir. Değere erişmek için `await` veya `.then()` kullanmalısın.", en: "`async` functions ALWAYS return a Promise. `return 42` automatically becomes `Promise.resolve(42)`. You must `await` or `.then()` to access the actual value 42." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Promises and Closures using a restaurant or toy factory analogy. How does async/await fit into this system?",
        promptTr: "🤖 Mini Kahraman Soruyor: Promise ve Closure kavramlarını bir restoranı veya oyuncak fabrikasını örnek alarak anlat. async/await bu sisteme nasıl oturuyor?",
        keywords: [
              ["söz", "promise"],
              ["bekle", "wait"],
              ["hazır", "ready"],
              "resolve",
              "closure",
              ["gizli", "hidden"],
              ["sırt", "backpack"],
              "async",
              "await",
              ["zincir", "chain"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 9 — Classes, Modules & JSON
  // ─────────────────────────────────────────────
  {
    title: { tr: "Sınıflar, Modüller & JSON", en: "Classes, Modules & JSON" },
    blocks: [
      {
        type: "css-animation",
        kind: "classes",
        label: { tr: "Sınıf Hiyerarşisi — class Dog extends Animal", en: "Class Hierarchy — class Dog extends Animal" }
      },
      {
        type: "simple-box",
        emoji: "🏛️",
        content: {
          tr: "JavaScript'te modern kod mimarisi nesne yönelimli sınıflar (ES6 Classes), modül yükleyicileri (import/export) ve sunuculardan veri getirdiğimiz JSON formatı üzerine kurulur. Bunu bir mutfak organizasyonu gibi düşün: sınıf, tarifi ve gerekli aletleri bir arada tutan tarif kartıdır; modül, o kartın durduğu çekmecedir; JSON ise siparişin mutfağa ulaşan yazılı hâlidir. Otomasyon testlerinde Page Object Model (POM) yapısı tamamen sınıflarla tasarlanır. Peki test kodunu düz fonksiyonlarla da yazabilecekken neden bu yapıya ihtiyaç duyuyoruz? Çünkü bir login formunun locator'ı değiştiğinde, sınıfsız bir suite'te o selector'ı 40 dosyada aramak zorunda kalırsın; POM'da tek bir `LoginPage` sınıfında değiştirirsin. Java'daki karşılığı birebirdir — `class LoginPage` + `import` yerine `export class LoginPage` + `import` yazarsın; fark şu ki JavaScript'te `import` yolu dosya sistemine bağlıdır, Java'daki gibi package adına değil. QA açısından bu ayrım bakım maliyetinin ta kendisidir: UI'ı sık değişen bir üründe POM'suz yazılmış bir suite, ikinci sprintte silinip yeniden yazılır.",
          en: "Modern JavaScript applications are built on top of object-oriented classes (ES6 Classes), modules (import/export), and JSON text data. Think of it as organising a kitchen: a class is the recipe card holding the method and its tools together; a module is the drawer that card lives in; JSON is the written order that reaches the kitchen. In test automation, the Page Object Model (POM) is designed using ES6 classes. But if plain functions can express the same test code, why do we need this structure at all? Because when a login form's locator changes, a suite without classes forces you to hunt that selector across 40 files; with POM you change it in one `LoginPage`. The Java mapping is one-to-one — `export class LoginPage` + `import` instead of `class LoginPage` + `import` — with one difference: JavaScript resolves imports by file path, not by package name. For QA this distinction *is* the maintenance cost: on a product whose UI shifts often, a suite written without POM gets deleted and rewritten by the second sprint."
        }
      },
      {
        type: "heading",
        content: { tr: "Java Class vs JavaScript ES6 Class — Karşılaştırma", en: "Java Class vs JavaScript ES6 Class — Comparison" }
      },
      {
        type: "table",
        headers: [
          { tr: "Kavram", en: "Concept" },
          { tr: "Java", en: "Java" },
          { tr: "JavaScript (ES6)", en: "JavaScript (ES6)" }
        ],
        rows: [
          [
            { tr: "Sınıf tanımlama", en: "Class definition" },
            "public class BasePage {}",
            "class BasePage {}"
          ],
          [
            { tr: "Constructor", en: "Constructor" },
            "public BasePage(String url) {}",
            "constructor(url) {}"
          ],
          [
            { tr: "Miras alma (extends)", en: "Inheritance" },
            "class LoginPage extends BasePage",
            "class LoginPage extends BasePage"
          ],
          [
            { tr: "Super çağrısı", en: "Super call" },
            "super(url);",
            "super(url);"
          ],
          [
            { tr: "Private alan (ES2022)", en: "Private field" },
            "private String url;",
            "#url; (hash prefix)"
          ],
          [
            { tr: "Static metot", en: "Static method" },
            "public static void reset() {}",
            "static reset() {}"
          ]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "ES6 Module: import / export Kullanımı", en: "ES6 Module: import / export Usage" },
        content: {
          tr: `// ── pageObjects/BasePage.js ──────────────────────
export class BasePage {         // named export
  constructor(url) {
    this.url = url;
  }
  open() {
    console.log("Navigating to:", this.url);
  }
}

export const BASE_URL = "https://learnqa.dev"; // named export (sabit)

// ── pageObjects/LoginPage.js ─────────────────────
import { BasePage, BASE_URL } from './BasePage.js'; // named import

class LoginPage extends BasePage {
  constructor() {
    super(BASE_URL + "/login");   // super() ile parent constructor çağrısı
  }
  fillForm(user, pass) {
    return \`Logging in as \${user}\`;
  }
}

export default LoginPage;        // default export

// ── tests/login.test.js ──────────────────────────
import LoginPage from '../pageObjects/LoginPage.js'; // default import

const page = new LoginPage();
page.open();
console.log(page.fillForm("hasan", "secret123"));`,
          en: `// ── pageObjects/BasePage.js ──────────────────────
export class BasePage {         // named export
  constructor(url) {
    this.url = url;
  }
  open() {
    console.log("Navigating to:", this.url);
  }
}

export const BASE_URL = "https://learnqa.dev"; // named export (constant)

// ── pageObjects/LoginPage.js ─────────────────────
import { BasePage, BASE_URL } from './BasePage.js'; // named import

class LoginPage extends BasePage {
  constructor() {
    super(BASE_URL + "/login");   // calls parent constructor via super()
  }
  fillForm(user, pass) {
    return \`Logging in as \${user}\`;
  }
}

export default LoginPage;        // default export

// ── tests/login.test.js ──────────────────────────
import LoginPage from '../pageObjects/LoginPage.js'; // default import

const page = new LoginPage();
page.open();
console.log(page.fillForm("hasan", "secret123"));`
        }
      },
      {
        type: "heading",
        content: { tr: "Page Object Model ve JSON İşlemleri", en: "Page Object Model & JSON Handlers" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Sınıf ve JSON parser kullanımını test edin!
class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    return "Navigating to: " + this.url;
  }
}

const page = new BasePage("https://learnqa.dev");
console.log(page.open());

// JSON'u nesneye dönüştürme
const rawJson = '{"testId": 101, "browser": "chromium"}';
const testData = JSON.parse(rawJson);
console.log("Tarayıcı Tipi:", testData.browser);`,
          en: `// Run class definitions and JSON operations!
class BasePage {
  constructor(url) {
    this.url = url;
  }
  open() {
    return "Navigating to: " + this.url;
  }
}

const page = new BasePage("https://learnqa.dev");
console.log(page.open());

// Parse JSON string
const rawJson = '{"testId": 101, "browser": "chromium"}';
const testData = JSON.parse(rawJson);
console.log("Parsed Browser:", testData.browser);`
        }
      },
      jsThisBindingFilm,
      {
        type: "quiz",
        question: {
          tr: "Bir JavaScript nesnesini (Object) metin tabanlı bir JSON string'ine dönüştürmek için hangi metot kullanılır?",
          en: "Which method is used to serialize a JavaScript object into a text-based JSON string?"
        },
        options: [
          { id: "a", text: "JSON.parse()" },
          { id: "b", text: "JSON.stringify()" },
          { id: "c", text: "JSON.serialize()" },
          { id: "d", text: "JSON.toString()" }
        ],
        correct: "b",
        explanation: {
          tr: "`JSON.stringify()` nesneyi string'e dönüştürür (serialization). `JSON.parse()` ise JSON string'ini canlı JavaScript nesnesine çevirir (deserialization).",
          en: "`JSON.stringify()` serializes a JS object into a JSON string, while `JSON.parse()` deserializes a JSON string back to a live JS object."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript'te bir sınıftan (class) yeni bir nesne örneği türetmek için hangi anahtar kelime kullanılır?",
            en: "Which keyword is used to instantiate a new object instance from a class in JavaScript?"
          },
          options: [
            { id: "a", text: "create" },
            { id: "b", text: "new" },
            { id: "c", text: "instantiate" },
            { id: "d", text: "make" }
          ],
          correct: "b",
          explanation: {
            tr: "Sınıflardan yeni bir kopya türetmek için Java'da olduğu gibi JavaScript'te de `new` anahtar kelimesi kullanılır (Örn: `const page = new Page();`).",
            en: "Just like in Java, the `new` keyword is used to create an instance of a class in JavaScript (e.g., `const page = new Page();`)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript class'ı, LEGO set'inin talimat kitapçığı gibidir: kitapçık sınıfı tanımlar (nasıl inşa edileceği), her yeni LEGO seti ise o sınıftan türetilmiş nesne (instance). Java'da class kavramı aynı; farkı JavaScript class'larının aslında prototype tabanlı olması, `class` syntax'ının üstüne gelmiş şekerli bir kaplama olmasıdır.",
          en: "A JavaScript class is like a LEGO set's instruction manual: the manual defines the class (how to build), each new assembled set is an object (instance) derived from that class. Java's class concept is identical; the difference is that JavaScript classes are actually prototype-based internally — `class` syntax is syntactic sugar over prototypes."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`extends` keyword'ü, bir LEGO setini temel model üzerine inşa etmek gibidir: `VehiclePage extends BasePage` yazdığında, `BasePage`'in tüm metodlarına (tekerlekler, motor) ek olarak `VehiclePage`'e özgü metodlar (römork bağlantısı) eklersin. `super()` ise temel modelin fabrika konfigürasyonunu başlatan düğmedir.",
          en: "The `extends` keyword is like building a LEGO set on top of a base model: `VehiclePage extends BasePage` gives you all of BasePage's methods (wheels, engine) plus VehiclePage-specific additions (trailer hitch). `super()` is the button that runs the base model's factory configuration."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "JavaScript'te `#privateField` (private class field), LEGO setinin içine gömülmüş gizli bir parçaya benzer: dışarıdan görünmez, yalnızca o setin kendi metodları tarafından erişilebilir. Java'da `private` keyword'ü ile aynı amacı güder ama JS'de `#` prefix ile belirtilir.",
          en: "In JavaScript, `#privateField` (private class field) is like a hidden piece embedded inside a LEGO set: invisible from outside, accessible only by that set's own methods. Same purpose as Java's `private` keyword — but in JS you use the `#` prefix instead."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden Page Object Model (POM) JavaScript class'larıyla yazılır? Test kodu duplication'ını önler: her sayfanın element seçicileri ve aksiyonları tek bir class'ta toplanır. Selector değiştiğinde sadece bir yeri güncellersen yeterlidir. Java'da da POM aynı prensiple çalışır — JavaScript class'ları bu deseni doğal olarak destekler.",
          en: "Why is Page Object Model (POM) written with JavaScript classes? It eliminates test code duplication: every page's selectors and actions are centralized in one class. When a selector changes, you update one place. POM works by the same principle in Java — JavaScript classes support this pattern naturally."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript'te hem `prototype` hem `class` var? `class` syntax'ı ES6 ile geldi, ama altında hâlâ prototype zinciri çalışıyor. `class` sadece daha okunabilir bir arayüz. Bu yüzden `instanceof` kontrolü, prototype zinciri boyunca kontrol yapar — Java'daki gibi nominal typing değil, yapısal bir kontrol.",
          en: "Why does JavaScript have both `prototype` and `class`? `class` syntax arrived in ES6, but prototype chains still power everything underneath. `class` is just a more readable interface. That's why `instanceof` checks walk the prototype chain — not nominal typing like Java, but structural verification."
        }
      },
      {
        type: "quiz",
        question: { tr: "Page Object Model'de `constructor(page)` içinde `this.page = page` yazmak ne sağlar?", en: "What does writing `this.page = page` in the `constructor(page)` of a Page Object provide?" },
        options: [
          { id: "a", text: { tr: "Sayfa nesnesini siler", en: "Deletes the page object" } },
          { id: "b", text: { tr: "Playwright'ın `page` nesnesini sınıfın tüm metodlarında kullanılabilir kılar", en: "Makes Playwright's `page` object accessible in all methods of the class" } },
          { id: "c", text: { tr: "Sayfayı otomatik navigate eder", en: "Automatically navigates the page" } },
          { id: "d", text: { tr: "Constructor'ı private yapar", en: "Makes the constructor private" } }
        ],
        correct: "b",
        explanation: { tr: "`this.page = page` ile constructor'a gelen `page` nesnesi, class instance'ına bağlanır. Böylece `this.page.click()`, `this.page.goto()` gibi çağrılar sınıfın tüm metodlarından yapılabilir.", en: "`this.page = page` binds the `page` argument to the class instance. This means `this.page.click()`, `this.page.goto()`, and all Playwright actions become available in every method of the class." },
        retryQuestion: {
          question: { tr: "JavaScript'te `static` method nedir?", en: "What is a `static` method in JavaScript?" },
          options: [
            { id: "a", text: { tr: "Yalnızca bir instance üzerinden çağrılabilen method", en: "Method callable only on an instance" } },
            { id: "b", text: { tr: "Sınıfın instance'ı oluşturulmadan doğrudan sınıf üzerinden çağrılan method", en: "Method called directly on the class without creating an instance" } },
            { id: "c", text: { tr: "Değiştirilemeyen method", en: "Immutable method" } },
            { id: "d", text: { tr: "Private method", en: "Private method" } }
          ],
          correct: "b",
          explanation: { tr: "`static` method'lar sınıf üzerinden çağrılır: `LoginPage.generateTestEmail()`. Instance oluşturmaya gerek yoktur. Yardımcı (utility) fonksiyonları için idealdir.", en: "`static` methods are called on the class itself: `LoginPage.generateTestEmail()`. No instance needed. Ideal for utility functions that belong conceptually to a class but don't need instance state." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: How different are JavaScript classes from Java classes, really? Can you explain JSON like a letter envelope? Why do modules matter?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript sınıfları (class) Java'daki sınıflardan gerçekten ne kadar farklı? JSON'u bir mektup zarfı gibi anlatabilir misin? Modüller neden önemlidir?",
        keywords: [
              ["sınıf", "class"],
              ["prototip", "prototype"],
              "json",
              ["metin", "text"],
              ["modül", "module"],
              "import",
              "export",
              "new",
              ["miras", "inherit"],
              ["nesne", "object"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 10 — Real World QA & DOM
  // ─────────────────────────────────────────────
  {
    title: { tr: "Gerçek Hayat QA & DOM", en: "Real World QA & DOM" },
    blocks: [
      {
        type: "css-animation",
        kind: "dom",
        label: { tr: "querySelector — DOM'da Element Seçimi", en: "querySelector — Selecting Elements in the DOM" }
      },
      {
        type: "simple-box",
        emoji: "🧪",
        content: {
          tr: "Gerçek otomasyon projelerinde (Playwright veya Cypress), asenkron API çağrılarını ve sayfa yüklenmelerini beklemek kritik önem taşır. `await page.click('button')` yazdığımızda, arkadaki asenkron sözün (Promise) çözülmesini bekleriz. Bunu bir restoranda sipariş vermek gibi düşün: `Thread.sleep(5000)` yazmak, garsonu çağırıp 'yemeğim 5 dakikada gelir herhalde' deyip tam 5 dakika sonra kör bir şekilde masaya uzanmaktır — erken gelirse soğur, geç gelirse elin boşa gider. `await` ise garsonun tabağı masaya bıraktığı ANI beklemektir: ne bir saniye erken, ne bir saniye geç. Peki madem ikisi de bekliyor, sabit bir süre beklemek neden bu kadar kötü? Çünkü sabit süre iki hatayı aynı anda üretir: makine yavaşken YETERSİZ kalır (flaky test), hızlıyken GEREKSİZ uzundur (200 testlik suite'te birikip yarım saate mal olur). Java'da `Thread.sleep()` yerine `WebDriverWait`/`ExplicitWait` kullanmanı söyleyen kural burada da aynıdır; fark şu ki JavaScript'te bekleme dile gömülüdür — `await` yazmayı unuttuğunda kod hata vermez, sadece Promise nesnesinin kendisiyle çalışmaya devam eder ve assertion'ın sessizce geçer. QA açısından flaky test şikâyetlerinin büyük kısmı tam olarak bu iki satırın arasındadır.",
          en: "In real-world automation suites (Playwright/Cypress), waiting for asynchronous API calls and page loads is critical. When writing `await page.click('button')`, we pause execution until the underlying Promise resolves. Think of it as ordering in a restaurant: writing `Thread.sleep(5000)` is telling the waiter \"my food will probably take 5 minutes\" and then blindly reaching for the table at exactly the 5-minute mark — too early and it isn't there, too late and you wasted the wait. `await` waits for the MOMENT the plate lands: not a second early, not a second late. So if both of them wait, why is a fixed delay so much worse? Because a fixed delay produces two failures at once: it is TOO SHORT when the machine is slow (a flaky test) and NEEDLESSLY long when it is fast (multiply that across a 200-test suite and it costs you half an hour). The rule that tells you to prefer `WebDriverWait`/explicit waits over `Thread.sleep()` in Java holds here too — with one difference: in JavaScript waiting is baked into the language, so forgetting `await` raises no error at all; your code simply keeps working with the Promise object itself and the assertion passes silently. For QA, most flaky-test complaints live exactly in the gap between those two lines."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Playwright ile Asenkron Test Yazımı", en: "Asynchronous Test with Playwright" },
        content: {
          tr: `import { test, expect } from '@playwright/test';

test('Asenkron veri yükleme testi', async ({ page }) => {
  // 1. Web sitesine git (Promise döner, await ile yüklenmesini bekle)
  await page.goto('https://example.com');

  // 2. Butona tıkla (Playwright arka planda otomatik olarak elementin hazır olmasını bekler)
  await page.click('#load-data-btn');

  // 3. API'den veri dönüp ekranda belirene kadar bekle
  const welcomeText = page.locator('.welcome-msg');
  await expect(welcomeText).toBeVisible({ timeout: 5000 });
});`,
          en: `import { test, expect } from '@playwright/test';

test('Async data loading test', async ({ page }) => {
  // 1. Navigate to website (returns a Promise, await resolves it)
  await page.goto('https://example.com');

  // 2. Click the button (Playwright auto-waits until element is ready)
  await page.click('#load-data-btn');

  // 3. Wait until API data appears on screen
  const welcomeText = page.locator('.welcome-msg');
  await expect(welcomeText).toBeVisible({ timeout: 5000 });
});`
        }
      },
      {
        type: "step-animation",
        id: "js-await-flakiness-step-01",
        title: { tr: "await Olmadan Bu Test Neden Rastgele Başarısız Olurdu?", en: "Why Would This Test Fail Randomly Without await?" },
        steps: [
          { id: 1, icon: "1️⃣", label: { tr: "await page.goto(...) çalıştığında…", en: "await page.goto(...) blocks…" }, detail: { tr: "await page.goto(...) çalıştığında JavaScript, sayfa TAMAMEN yüklenip Promise ÇÖZÜLENE kadar bir SONRAKİ satıra GEÇMEZ — await olmasaydı kod hemen devam eder, sayfa henüz açılmamış olabilirdi.", en: "await page.goto(...) makes JavaScript NOT MOVE to the next line until the page is FULLY loaded and the Promise RESOLVES — without await, the code would continue immediately, possibly before the page even opened." } },
          { id: 2, icon: "2️⃣", label: { tr: "await page.click(...) çağrısı ÖNCE…", en: "await page.click(...) waits FIRST…" }, detail: { tr: "await page.click(...) çağrısı ÖNCE elementin actionability kontrolünü (görünür/enabled/stable) bekler, SONRA tıklar — bu bekleme Playwright'ın içinde OTOMATİK gerçekleşir, sen ayrıca bir \"sleep\" yazmazsın.", en: "await page.click(...) waits FIRST for the element's actionability check (visible/enabled/stable), THEN clicks — this wait happens AUTOMATICALLY inside Playwright, you never write a separate \"sleep\"." } },
          { id: 3, icon: "3️⃣", label: { tr: "const welcomeText = page.locator(...) satırı…", en: "const welcomeText = page.locator(...) runs…" }, detail: { tr: "const welcomeText = page.locator(...) satırı HENÜZ hiçbir DOM sorgusu ÇALIŞTIRMAZ — locator'lar \"lazy\"dir, gerçek arama await expect(...) çağrılana kadar ERTELENİR.", en: "const welcomeText = page.locator(...) does NOT run any DOM query YET — locators are \"lazy\", the actual search is DEFERRED until await expect(...) is called." } },
          { id: 4, icon: "4️⃣", label: { tr: "await expect(welcomeText).toBeVisible({ timeout: 5000 })…", en: "await expect(welcomeText).toBeVisible({ timeout: 5000 })…" }, detail: { tr: "await expect(welcomeText).toBeVisible({ timeout: 5000 }) BİR KEREYE mahsus kontrol DEĞİLDİR — element görünür olana kadar en fazla 5 saniye boyunca TEKRAR TEKRAR (polling) kontrol eder.", en: "await expect(welcomeText).toBeVisible({ timeout: 5000 }) is NOT a one-shot check — it POLLS repeatedly for up to 5 seconds until the element becomes visible." } },
          { id: 5, icon: "5️⃣", label: { tr: "Eğer await'ler kaldırılsaydı…", en: "If the awaits were removed…" }, detail: { tr: "Eğer await'ler kaldırılsaydı, her satır Promise nesnesini HEMEN döndürür ve script sayfa yüklenmeden/tıklama gerçekleşmeden bir sonraki satıra geçerdi — test bazen geçer bazen RASTGELE FAIL olurdu (klasik \"flaky test\" senaryosu).", en: "If the awaits were removed, every line would return its Promise object IMMEDIATELY and the script would move on before the page loaded or the click happened — the test would pass sometimes and FAIL randomly (a classic flaky-test scenario)." } },
        ],
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Tarayıcı DOM element seçim simülasyonunu çalıştırın!
const fakeDocument = {
  querySelector: function(selector) {
    console.log("DOM tarandı, hedef:", selector);
    return {
      textContent: "Üye Girişi Yapın",
      click: () => console.log("Giriş butonuna başarıyla tıklandı! 🎉")
    };
  }
};

const titleElement = fakeDocument.querySelector("h1.title");
console.log("Bulunan Başlık:", titleElement.textContent);
titleElement.click();`,
          en: `// Simulate document selectors inside browser contexts!
const fakeDocument = {
  querySelector: function(selector) {
    console.log("Scanning DOM for locator target:", selector);
    return {
      textContent: "Submit Form",
      click: () => console.log("Successfully triggered click event! 🎉")
    };
  }
};

const submitBtn = fakeDocument.querySelector("button#submit");
console.log("Scraped button text:", submitBtn.textContent);
submitBtn.click();`
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Otomasyon kodunda `await` anahtar kelimesi ne işe yarar?",
          en: "What is the purpose of the `await` keyword in automation code?"
        },
        options: [
          { id: "a", text: { tr: "Testi arka planda paralel çalıştırmaya zorlar", en: "Forces the test to run in parallel in the background" } },
          { id: "b", text: { tr: "Bir asenkron işlemin (Promise) çözülmesini (resolve) bekler ve kodu orada duraklatır", en: "Pauses execution and waits for an asynchronous Promise to resolve" } },
          { id: "c", text: { tr: "Tarayıcıyı anında kapatır", en: "Closes the browser instantly" } },
          { id: "d", text: { tr: "Kodun JVM üzerinde çalışmasını sağlar", en: "Allows the code to run on the JVM" } }
        ],
        correct: "b",
        explanation: {
          tr: "`await` anahtar kelimesi, bir Promise'in çözülmesini (başarı veya başarısızlıkla) bekler. Sadece `async` fonksiyonlar içinde kullanılabilir ve asenkron kodun tıpkı senkron kod gibi düz bir satır halinde yazılabilmesini sağlar.",
          en: "`await` halts execution until a Promise resolves (either successfully or with a failure). It can only be used inside an `async` function, making async code write and look like synchronous code."
        },
        retryQuestion: {
          question: {
            tr: "Modern web tarayıcılarında bir DOM (HTML) öğesini seçmek için JavaScript içinde en sık kullanılan API metodu hangisidir?",
            en: "Which standard JavaScript API method is most commonly used in browsers to select a DOM element?"
          },
          options: [
            { id: "a", text: "document.getElement" },
            { id: "b", text: "document.querySelector" },
            { id: "c", text: "window.select" },
            { id: "d", text: "document.findByText" }
          ],
          correct: "b",
          explanation: {
            tr: "`document.querySelector('secici')` metodu, CSS seçici kullanarak sayfadaki ilk eşleşen elemente erişim sağlar.",
            en: "`document.querySelector('selector')` returns the first element that matches the specified CSS selector inside the DOM."
          }
        }
      },
      {
        type: "heading",
        content: { tr: "querySelectorAll & NodeList Döngüsü", en: "querySelectorAll & NodeList Iteration" }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`querySelector` şehirde yalnızca ilk belirtilen adresi bulan bir GPS'tir — tek sonuç döner. `querySelectorAll` ise o isimde tüm sokakları listeleyen bir harita uygulaması — eşleşen tüm elementleri `NodeList` olarak döndürür. Playwright'da `page.locator(\".item\")` da benzer şekilde tüm eşleşmeleri bulur.",
          en: "`querySelector` is a GPS that finds only the first matching address — returns one result. `querySelectorAll` is a map app that lists every street with that name — returns all matching elements as a `NodeList`. Playwright's `page.locator(\".item\")` works the same way under the hood."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "querySelectorAll & NodeList üzerinde döngü", en: "querySelectorAll & NodeList Iteration" },
        content: {
          tr: `// querySelectorAll — tüm eşleşen elementleri döndürür (NodeList)
const items = document.querySelectorAll('.product-card');  // NodeList (dizi değil!)

// Yöntem 1: forEach (NodeList doğrudan destekler)
items.forEach(item => console.log(item.textContent));

// Yöntem 2: for...of (NodeList iterable'dır)
for (const item of items) {
  console.log(item.getAttribute('data-price'));
}

// Yöntem 3: Gerçek diziye çevir (dizi metodları kullanmak için)
const priceArr = Array.from(items).map(item => item.dataset.price);

// ⚠️ items.map() ÇALIŞMAZ — NodeList bir Array değildir!
// items.map(...)  ← TypeError: items.map is not a function
// Array.from(items).map(...)  ← ✅ Doğru yol

// Test Otomasyonu (Playwright) — benzer konsept:
// const locators = page.locator('.product-card');
// const count = await locators.count();
// for (let i = 0; i < count; i++) { await locators.nth(i).click(); }`,
          en: `// querySelectorAll — returns all matching elements (NodeList)
const items = document.querySelectorAll('.product-card');  // NodeList (NOT an Array!)

// Method 1: forEach (NodeList supports it natively)
items.forEach(item => console.log(item.textContent));

// Method 2: for...of (NodeList is iterable)
for (const item of items) {
  console.log(item.getAttribute('data-price'));
}

// Method 3: Convert to a real array (to use array methods)
const priceArr = Array.from(items).map(item => item.dataset.price);

// ⚠️ items.map() DOES NOT WORK — NodeList is not an Array!
// items.map(...)  ← TypeError: items.map is not a function
// Array.from(items).map(...)  ← ✅ Correct approach

// Test Automation (Playwright) — same concept:
// const locators = page.locator('.product-card');
// const count = await locators.count();
// for (let i = 0; i < count; i++) { await locators.nth(i).click(); }`
        }
      },
      {
        type: "heading",
        content: { tr: "innerHTML vs textContent — Güvenlik & Performans", en: "innerHTML vs textContent — Security & Performance" }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `innerHTML` yerine `textContent` tercih edilmeli? `innerHTML` HTML etiketlerini çözümleyip DOM'a ekler — kullanıcı verisi içeriyorsa XSS (Cross-Site Scripting) saldırısına kapı açar. `textContent` ise sadece düz metin ekler, HTML etiketleri çözümlenmez, güvenlidir. Test otomasyonunda bir elementin içeriğini okurken `textContent` kullanmak en güvenli yoldur.",
          en: "Why prefer `textContent` over `innerHTML`? `innerHTML` parses and executes HTML markup — if it contains user data, you open the door to XSS (Cross-Site Scripting) attacks. `textContent` inserts plain text only, no HTML parsing, completely safe. When reading element content in test automation, `textContent` is the safest choice."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "innerHTML vs textContent karşılaştırması", en: "innerHTML vs textContent comparison" },
        content: {
          tr: `// ── textContent ─────────────────────────────
const el = document.getElementById('output');

// OKUMA: sadece metin döner (HTML etiketleri soyulur)
el.innerHTML = '<b>Merhaba</b>';
console.log(el.textContent);   // "Merhaba"  ← etiket yok
console.log(el.innerHTML);     // "<b>Merhaba</b>"  ← etiket var

// YAZMA karşılaştırması:
el.textContent = '<b>Bold?</b>';
// Ekranda görünür: <b>Bold?</b>  ← HTML ÇALIŞMAZ, düz metin
el.innerHTML  = '<b>Bold!</b>';
// Ekranda görünür: Bold!  ← HTML çalışır, kalın yazı

// ⚠️ XSS saldırısı örneği — innerHTML ile:
const userInput = '<img src=x onerror="alert(\'XSS!\')">';
// el.innerHTML = userInput;    // ← TEHLIKE! Script çalışır
el.textContent = userInput;     // ← GÜVENLİ: düz metin olarak gösterir

// ✅ Test otomasyonunda metin okuma:
const buttonText = document.querySelector('#submit').textContent.trim();
// Java/Selenium: driver.findElement(By.id("submit")).getText()`,
          en: `// ── textContent ─────────────────────────────
const el = document.getElementById('output');

// READ: returns plain text only (HTML tags are stripped)
el.innerHTML = '<b>Hello</b>';
console.log(el.textContent);   // "Hello"       ← no tags
console.log(el.innerHTML);     // "<b>Hello</b>" ← tags preserved

// WRITE comparison:
el.textContent = '<b>Bold?</b>';
// Visible on screen: <b>Bold?</b>  ← HTML NOT PARSED, plain text
el.innerHTML  = '<b>Bold!</b>';
// Visible on screen: Bold!  ← HTML parsed, bold text rendered

// ⚠️ XSS attack example — with innerHTML:
const userInput = '<img src=x onerror="alert(\'XSS!\')">';
// el.innerHTML = userInput;    // ← DANGER! Script executes
el.textContent = userInput;     // ← SAFE: displayed as plain text

// ✅ Reading text in test automation:
const buttonText = document.querySelector('#submit').textContent.trim();
// Java/Selenium: driver.findElement(By.id("submit")).getText()`
        }
      },
      {
        type: "step-animation",
        id: "js-innerhtml-xss-step-01",
        title: { tr: "el.innerHTML = userInput Satırı Neden Tehlikeli, textContent Neden Değil?", en: "Why Is el.innerHTML = userInput Dangerous, But textContent Isn't?" },
        steps: [
          { id: 1, icon: "1️⃣", label: { tr: "el.innerHTML = '<b>Merhaba</b>' YAZILDIĞINDA…", en: "Writing el.innerHTML = '<b>Hello</b>'…" }, detail: { tr: "el.innerHTML = '<b>Merhaba</b>' YAZILDIĞINDA tarayıcı bu string'i HTML olarak PARSE eder ve gerçek <b> elementini DOM'A ekler — string sadece metin olarak DEĞİL, ÇALIŞTIRILABİLİR bir yapı olarak ele alınır.", en: "Writing el.innerHTML = '<b>Hello</b>' makes the browser PARSE that string as HTML and insert a real <b> element into the DOM — the string is treated as EXECUTABLE structure, NOT just text." } },
          { id: 2, icon: "2️⃣", label: { tr: "el.textContent OKUNDUĞUNDA…", en: "Reading el.textContent…" }, detail: { tr: "el.textContent OKUNDUĞUNDA HTML etiketleri SOYULUR, sadece düz metin (\"Merhaba\") döner — el.innerHTML OKUNDUĞUNDA ise etiketler DAHİL tüm ham HTML metni döner.", en: "Reading el.textContent STRIPS the HTML tags and returns only plain text (\"Hello\") — reading el.innerHTML returns the raw HTML text INCLUDING the tags." } },
          { id: 3, icon: "3️⃣", label: { tr: "el.textContent = '<b>Bold?</b>' YAZILDIĞINDA…", en: "Writing el.textContent = '<b>Bold?</b>'…" }, detail: { tr: "el.textContent = '<b>Bold?</b>' YAZILDIĞINDA bu string HİÇ parse edilmez, ekranda AYNEN \"<b>Bold?</b>\" yazısı GÖRÜNÜR — HTML olarak yorumlanmaz.", en: "Writing el.textContent = '<b>Bold?</b>' NEVER parses that string, the screen shows the LITERAL text \"<b>Bold?</b>\" — it's never interpreted as HTML." } },
          { id: 4, icon: "4️⃣", label: { tr: "userInput değişkeni bir <img ... onerror=...> string'i içeriyorsa…", en: "If userInput holds an <img ... onerror=...> string…" }, detail: { tr: "userInput değişkeni bir <img src=x onerror=\"alert('XSS!')\"> string'i içeriyorsa, bunu innerHTML'e ATAMAK tarayıcının bu script'i GERÇEKTEN ÇALIŞTIRMASINA yol açar — bu klasik bir XSS (Cross-Site Scripting) açığıdır.", en: "If userInput holds an <img src=x onerror=\"alert('XSS!')\"> string, ASSIGNING it to innerHTML makes the browser ACTUALLY EXECUTE that script — this is a textbook XSS (Cross-Site Scripting) vulnerability." } },
          { id: 5, icon: "5️⃣", label: { tr: "AYNI userInput'u textContent'e atamak ise…", en: "Assigning that SAME userInput to textContent instead…" }, detail: { tr: "AYNI userInput'u textContent'e atamak ise onu SADECE görünen bir metin string'i olarak BASAR — <img> etiketi HİÇBİR ZAMAN gerçek bir DOM elementine dönüşmez, onerror ASLA tetiklenmez.", en: "Assigning that SAME userInput to textContent instead just PRINTS it as a visible text string — the <img> tag NEVER becomes a real DOM element, onerror is NEVER triggered." } },
        ],
      },
      {
        type: "heading",
        content: { tr: "MutationObserver — DOM Değişikliklerini Dinlemek", en: "MutationObserver — Watching DOM Changes" }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "MutationObserver, bir güvenlik kamerasına benzer: DOM'un belirli bir bölgesine odaklanır ve her değişiklik olduğunda (yeni element eklendi, sınıf değişti, metin güncellendi) seni haberdar eder. Test otomasyonunda dinamik içeriğin (chatbot mesajı, toast notification, lazy-loaded data) görünmesini beklemek için idealdir.",
          en: "MutationObserver is like a security camera: it focuses on a specific region of the DOM and notifies you every time something changes (element added, class changed, text updated). In test automation it's ideal for waiting for dynamic content (chatbot messages, toast notifications, lazy-loaded data) to appear."
        }
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "MutationObserver ile DOM değişikliği izleme", en: "Watching DOM changes with MutationObserver" },
        content: {
          tr: `// MutationObserver kurulumu
const targetNode = document.getElementById('chat-messages');

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Yeni mesaj eklendi
      const newNodes = mutation.addedNodes;
      newNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('Yeni mesaj:', node.textContent);
        }
      });
    }
    if (mutation.type === 'attributes') {
      console.log('Attribute değişti:', mutation.attributeName);
    }
  }
});

// Hangi değişiklikleri izleyeceğini belirt
observer.observe(targetNode, {
  childList: true,    // alt elementlerin eklenmesi/çıkarılması
  attributes: true,   // attribute değişiklikleri
  subtree: true       // alt ağacı da izle
});

// Gözlemlemeyi durdur (temizlik — bellek sızıntısını önler)
observer.disconnect();

// ─────────────────────────────────────────────────────────────
// Test Otomasyonu ile Bağlantı:
// Playwright'ta benzer bekleme:
// await expect(page.locator('.chat-message').last()).toBeVisible();
//
// Ancak manuel test sayfasında MutationObserver ile:
// 1. "Gönder" butonuna tıkla
// 2. Observer yeni mesaj elementini algılar
// 3. Test assertion çalışır`,
          en: `// MutationObserver setup
const targetNode = document.getElementById('chat-messages');

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // New message added
      const newNodes = mutation.addedNodes;
      newNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('New message:', node.textContent);
        }
      });
    }
    if (mutation.type === 'attributes') {
      console.log('Attribute changed:', mutation.attributeName);
    }
  }
});

// Specify what changes to watch
observer.observe(targetNode, {
  childList: true,    // child elements added/removed
  attributes: true,   // attribute changes
  subtree: true       // also watch the subtree
});

// Stop observing (cleanup — prevents memory leaks)
observer.disconnect();

// ─────────────────────────────────────────────────────────────
// Connection to Test Automation:
// Equivalent wait in Playwright:
// await expect(page.locator('.chat-message').last()).toBeVisible();
//
// With MutationObserver on a manual test page:
// 1. Click "Send" button
// 2. Observer detects new message element
// 3. Test assertion runs`
        }
      },
      jsDomQueryTestFilm,
      {
        type: "quiz",
        question: { tr: "`document.querySelectorAll(\".item\")` ne döndürür?", en: "What does `document.querySelectorAll(\".item\")` return?" },
        options: [
          { id: "a", text: { tr: "İlk eşleşen HTML elementi", en: "The first matching HTML element" } },
          { id: "b", text: { tr: "Bir JavaScript Array'i", en: "A JavaScript Array" } },
          { id: "c", text: { tr: "NodeList — forEach ve for...of destekler ama map() desteklemez", en: "A NodeList — supports forEach and for...of but not map()" } },
          { id: "d", text: { tr: "null — eşleşme yoksa", en: "null — if no match found" } }
        ],
        correct: "c",
        explanation: { tr: "`querySelectorAll` bir NodeList döndürür. NodeList, forEach ve for...of ile iterate edilebilir, ancak `map()`, `filter()` gibi Array metodları desteklenmez. Dizi metodları için `Array.from(nodeList)` kullanılır.", en: "`querySelectorAll` returns a NodeList. It supports `forEach` and `for...of` iteration, but does NOT support array methods like `map()` or `filter()`. Use `Array.from(nodeList)` to convert it to a real array first." },
        retryQuestion: {
          question: { tr: "innerHTML ile XSS saldırısını önlemek için ne kullanılmalıdır?", en: "What should be used instead of innerHTML to prevent XSS attacks?" },
          options: [
            { id: "a", text: "outerHTML" },
            { id: "b", text: "textContent" },
            { id: "c", text: "innerText" },
            { id: "d", text: "nodeValue" }
          ],
          correct: "b",
          explanation: { tr: "`textContent`, kullanıcı verisini HTML olarak işlemez — düz metin olarak ekler. Bu, XSS saldırılarının temel savunmasıdır.", en: "`textContent` never parses user data as HTML — it inserts it as plain text. This is the primary defense against XSS attacks when displaying user-generated content." }
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`querySelector` ve `querySelectorAll`, LEGO parça çantanızı tarayan iki farklı araç gibidir: `querySelector` ilk kırmızı parçayı bulup geri döner, `querySelectorAll` çantadaki tüm kırmızı parçaları bir tepside toplar.",
          en: "`querySelector` and `querySelectorAll` are two different scanning tools for your LEGO parts bin: `querySelector` finds the first red piece and returns immediately, `querySelectorAll` collects every red piece onto a tray."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `MutationObserver` polling'den daha iyi? `setInterval` ile DOM'u sürekli kontrol etmek (polling) CPU'yu gereksiz kullanır ve gecikme yaratır. `MutationObserver` event-driven çalışır — değişiklik olana kadar hiçbir şey yapmaz, değişince anında tetiklenir. Test güvenilirliği açısından polling'den çok üstündür.",
          en: "Why is `MutationObserver` better than polling? Checking the DOM repeatedly with `setInterval` wastes CPU and introduces delay. `MutationObserver` is event-driven — it does nothing until a change happens, then fires instantly. Far superior to polling for test reliability and page-level monitoring."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why is using await in a Playwright test a lifesaver? Explain the DOM and querySelector like searching for an address in a city.",
        promptTr: "🤖 Mini Kahraman Soruyor: Bir Playwright testi yazarken await kullanmak neden hayat kurtarır? DOM'u ve querySelector'ı bir şehirde adres arama gibi anlat.",
        keywords: [
              ["bekle", "wait"],
              "await",
              ["sayfa", "page"],
              ["yükle", "load"],
              "element",
              ["buton", "button"],
              ["tıkla", "click"],
              ["seçici", "selector"],
              "dom",
              ["hazır", "ready"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 11 — Ecosystem & Tools
  // ─────────────────────────────────────────────
  {
    title: { tr: "Ekosistem & Araçlar", en: "Ecosystem & Tools" },
    blocks: [
      {
        type: "css-animation",
        kind: "ecosystem",
        label: { tr: "JavaScript Ekosistemine Genel Bakış", en: "JavaScript Ecosystem Overview" }
      },
      {
        type: "simple-box",
        emoji: "🌱",
        content: {
          tr: "JavaScript ekosistemi devasa bir oyuncak fabrikasıdır. Node.js motorumuzdur, `package.json` ise projemizin kimlik kartı ve hangi oyuncaklara (kütüphanelere) ihtiyaç duyduğumuzun listesidir. npm ise paketleri internetten bilgisayarımıza getiren kuryedir. Java'daki Maven + pom.xml yapısının tüm ekvivalenti burada: `npm + package.json`. Peki fabrikanın kendisi bu kadar hazır parça sunuyorken, hangi parçayı kullanacağına nasıl karar veriyorsun — 'en çok yıldızı olan' yeterli bir ölçüt mü? Değil, ve sebebi QA'i doğrudan ilgilendirir: her eklediğin paket, senin yazmadığın ve gözden geçirmediğin kodu test suite'ine sokar. Java'da bir Maven bağımlılığı eklerken de aynı risk vardır ama JavaScript ekosisteminde bağımlılık ağacı çok daha derindir — tek bir paket arkasında yüzlerce alt bağımlılık gelebilir. Bu yüzden `package-lock.json` dosyası bir ayrıntı değil, testin tekrarlanabilirliğinin kendisidir: onu commit etmezsen, dün yeşil olan pipeline bugün sırf bir alt bağımlılık sürüm yükselttiği için kırılır ve sen kendi kodunda hata ararsın.",
          en: "The JavaScript ecosystem is like a giant toy factory. Node.js is the engine, `package.json` is our project's ID card listing the required toys (libraries), and npm is the delivery driver fetching packages from the web — the full equivalent of Java's Maven + pom.xml setup. But if the factory offers this many ready-made parts, how do you decide which one to use — is \"most stars\" a good enough criterion? It isn't, and the reason concerns QA directly: every package you add pulls code you did not write and did not review into your test suite. Adding a Maven dependency in Java carries the same risk, but JavaScript's dependency trees run far deeper — a single package can drag in hundreds of transitive dependencies. That is why `package-lock.json` is not a detail but the reproducibility of your tests itself: leave it uncommitted and a pipeline that was green yesterday breaks today because some transitive dependency bumped a version, while you hunt for the bug in your own code."
        }
      },
      {
        type: "heading",
        content: { tr: "Temel Proje Dosyaları", en: "Core Project Files" }
      },
      {
        type: "grid",
        cols: 2,
        items: [
          {
            icon: "📝",
            label: "package.json",
            desc: { tr: "Proje adı, versiyonu, script tanımları ve bağımlı olunan tüm kütüphanelerin (Playwright, Jest) listelendiği temel dosya. Java'daki pom.xml karşılığıdır.", en: "The file containing project metadata, custom run scripts, and all installed libraries (Playwright, Jest). The exact equivalent of Maven's pom.xml." }
          },
          {
            icon: "📦",
            label: "node_modules/",
            desc: { tr: "npm install komutu çalıştırıldığında inen kütüphanelerin saklandığı devasa klasör. Java'daki .m2 Maven deposu gibidir ama her projenin kendi içindedir. Asla git'e push edilmez.", en: "The folder holding all downloaded libraries after running npm install. Like Java's ~/.m2 Maven cache, but local to each project. Always added to .gitignore." }
          },
          {
            icon: "🔒",
            label: "package-lock.json",
            desc: { tr: "Tüm bağımlılıkların tam sürümlerini kilitleyen dosya. Bu sayede farklı makinelerde bile aynı paket sürümleri yüklenir. Java'daki Maven Enforcer plugin mantığına benzer.", en: "Locks exact versions of every dependency tree, guaranteeing identical installs across machines. Similar to Maven's dependency locking enforcer configurations." }
          },
          {
            icon: "⚙️",
            label: ".npmrc / .nvmrc",
            desc: { tr: ".npmrc npm davranışını özelleştirir (kayıt URL, scope). .nvmrc ise projenin hangi Node.js sürümüyle çalışacağını tanımlar — CI pipeline'da kritik önem taşır.", en: ".npmrc customizes npm behavior (registry URL, scope). .nvmrc pins the required Node.js version for the project — critical for CI pipeline reproducibility." }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "QA Otomasyonunda Kullanılan Temel Araçlar", en: "Key Tools in QA Automation Ecosystem" }
      },
      {
        type: "grid",
        cols: 3,
        items: [
          {
            icon: "🎭",
            label: "Playwright",
            desc: { tr: "Microsoft'un geliştirdiği, Chromium/Firefox/WebKit'i destekleyen modern e2e test kütüphanesi. async/await doğal desteği ile en popüler JS test aracıdır.", en: "Microsoft's modern e2e test library supporting Chromium, Firefox, and WebKit. The most popular JS test tool with native async/await support." }
          },
          {
            icon: "🌲",
            label: "Cypress",
            desc: { tr: "Tarayıcı içinde doğrudan çalışan, gerçek zamanlı debug ve time-travel debugging sunan e2e test aracı. Dashboard ve component testing için de kullanılır.", en: "Runs directly inside the browser, offering real-time debugging and time-travel replay. Used for both e2e and component testing." }
          },
          {
            icon: "🃏",
            label: "Jest",
            desc: { tr: "Facebook'un geliştirdiği, sıfır konfigürasyonla çalışan JavaScript unit test kütüphanesi. Mock, snapshot ve code coverage desteği sunar.", en: "Facebook's zero-config JavaScript unit test library. Supports mocks, snapshots, and built-in code coverage reporting." }
          },
          {
            icon: "🔧",
            label: "ESLint",
            desc: { tr: "JavaScript/TypeScript kod kalitesini statik olarak analiz eden lint aracı. Otomasyon projelerinde yanlış sözdizimi ve potansiyel bug'ları committen önce yakalar.", en: "Static code analysis tool for JS/TS. Catches syntax errors and potential bugs before they reach CI — essential for any automation project." }
          },
          {
            icon: "✨",
            label: "Prettier",
            desc: { tr: "Kod biçimlendirme (formatting) aracı. Tüm ekibin aynı stil standartlarında kod yazmasını sağlar. ESLint ile birlikte kullanılır.", en: "Opinionated code formatter ensuring consistent style across the entire team. Used alongside ESLint for a complete code quality pipeline." }
          },
          {
            icon: "📊",
            label: "Allure / HTML Reporter",
            desc: { tr: "Test sonuçlarını görsel raporlar halinde sunan araç. Playwright ile `@playwright/test` reporter olarak, Jest ile `jest-allure` eklentisiyle kullanılır.", en: "Generates visual HTML reports from test results. Integrates with Playwright via reporters config and with Jest via jest-allure plugin." }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "Java Maven ↔ JavaScript npm Karşılaştırması", en: "Java Maven ↔ JavaScript npm Comparison" }
      },
      {
        type: "table",
        headers: [
          { tr: "İşlem", en: "Task" },
          { tr: "Java (Maven)", en: "Java (Maven)" },
          { tr: "JavaScript (npm)", en: "JavaScript (npm)" }
        ],
        rows: [
          [
            { tr: "Proje yapılandırma", en: "Project config" },
            { tr: "pom.xml", en: "pom.xml" },
            { tr: "package.json", en: "package.json" }
          ],
          [
            { tr: "Bağımlılık indirme", en: "Install dependencies" },
            { tr: "mvn install", en: "mvn install" },
            { tr: "npm install", en: "npm install" }
          ],
          [
            { tr: "Test çalıştırma", en: "Run tests" },
            { tr: "mvn test", en: "mvn test" },
            { tr: "npm test / npx playwright test", en: "npm test / npx playwright test" }
          ],
          [
            { tr: "Paket ekleme", en: "Add a package" },
            { tr: "pom.xml dependency ekle", en: "Add to pom.xml" },
            { tr: "npm install playwright", en: "npm install playwright" }
          ],
          [
            { tr: "Bağımlılık kilidi", en: "Dependency lock" },
            { tr: "maven-enforcer-plugin", en: "maven-enforcer-plugin" },
            { tr: "package-lock.json", en: "package-lock.json" }
          ]
        ]
      },
      {
        type: "code",
        language: "json",
        label: { tr: "Örnek package.json — Playwright Projesi", en: "Sample package.json — Playwright Project" },
        content: `{
  "name": "my-playwright-suite",
  "version": "1.0.0",
  "scripts": {
    "test":      "npx playwright test",
    "test:ci":   "npx playwright test --reporter=html",
    "lint":      "eslint src/ tests/"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0",
    "eslint":           "^8.57.0"
  }
}`
      },
      jsNpmDependencyResolveFilm,
      {
        type: "quiz",
        question: {
          tr: "Node.js projesinde indirilen kütüphanelerin fiziksel olarak saklandığı klasör hangisidir?",
          en: "Which folder physically stores downloaded dependencies in a Node.js project?"
        },
        options: [
          { id: "a", text: "target/" },
          { id: "b", text: "node_modules/" },
          { id: "c", text: "src/main/" },
          { id: "d", text: ".gradle/" }
        ],
        correct: "b",
        explanation: {
          tr: "`node_modules/` klasörü, projedeki tüm npm paketlerinin kurulduğu yerdir. Git geçmişine yüklenmemesi için `.gitignore` dosyasına mutlaka eklenmesi önerilir.",
          en: "`node_modules/` is the directory where all npm dependencies are downloaded. It is highly recommended to add this folder to your `.gitignore` file."
        },
        retryQuestion: {
          question: {
            tr: "Yeni bir Node.js projesi başlatmak ve package.json dosyası oluşturmak için hangi npm komutu çalıştırılmalıdır?",
            en: "Which npm command initializes a new Node.js project and creates a package.json file?"
          },
          options: [
            { id: "a", text: "npm run dev" },
            { id: "b", text: "npm init" },
            { id: "c", text: "npm install" },
            { id: "d", text: "npm start" }
          ],
          correct: "b",
          explanation: {
            tr: "`npm init` (veya `-y` bayrağıyla varsayılan değerleri onaylayarak), yeni bir Node.js projesi kurar ve projenin kalbi olan package.json dosyasını sıfırdan oluşturur.",
            en: "`npm init` (or `npm init -y` to accept defaults) initializes a new Node.js project and generates the package.json file from scratch."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Playwright projesi kurulumunda, tarayıcı binary'lerini (Chromium, Firefox, WebKit) indirmek için hangi komut çalıştırılır?",
          en: "Which command downloads the browser binaries (Chromium, Firefox, WebKit) after installing Playwright?"
        },
        options: [
          { id: "a", text: "npm install browsers" },
          { id: "b", text: "npx playwright install" },
          { id: "c", text: "npm run setup" },
          { id: "d", text: "playwright download --all" }
        ],
        correct: "b",
        explanation: {
          tr: "`npx playwright install` komutu, Playwright'ın test için ihtiyaç duyduğu tüm tarayıcı binary'lerini (Chromium, Firefox, WebKit) indirir. Java'daki WebDriver Manager'ın yaptığını npm ekosisteminde Playwright kendi yapıyor.",
          en: "`npx playwright install` downloads all required browser binaries (Chromium, Firefox, WebKit). Unlike Java's Selenium where you need WebDriver Manager, Playwright handles this natively via this single command."
        },
        retryQuestion: {
          question: {
            tr: "Bir Playwright testini yalnızca Chromium tarayıcısında çalıştırmak için hangi flag kullanılır?",
            en: "Which CLI flag runs Playwright tests only on the Chromium browser?"
          },
          options: [
            { id: "a", text: "--browser=chrome" },
            { id: "b", text: "--project=chromium" },
            { id: "c", text: "--run chromium" },
            { id: "d", text: "--only-chromium" }
          ],
          correct: "b",
          explanation: {
            tr: "`npx playwright test --project=chromium` yalnızca Chromium profilini çalıştırır. Playwright'ta 'project' kavramı, belirli tarayıcı ve cihaz yapılandırmalarını kapsar.",
            en: "`npx playwright test --project=chromium` runs only the Chromium project profile. In Playwright, a 'project' maps to a browser and device configuration combination."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript ekosistemi, bir şehir altyapısı gibidir: npm paket deposu şehrin toptancı pazarı, package.json şehrin tedarik listesi, Webpack/Vite şehrin inşaat firması (her şeyi paketler ve dağıtır), ESLint şehrin belediye denetçisi (kod standartlarını kontrol eder), Prettier ise şehrin temizlik ekibi.",
          en: "The JavaScript ecosystem is like city infrastructure: npm registry is the wholesale market, package.json is the city's procurement list, Webpack/Vite is the construction company (bundles and ships everything), ESLint is the city building inspector (enforces code standards), Prettier is the city cleaning crew."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Webpack ve Vite, LEGO setlerini kutuya paketleyen iki farklı fabrika gibidir. Webpack, her parçayı tek tek titizlikle paketler (yavaş ama esnek). Vite ise modern LEGO fabrikası — ESM modülleri doğrudan kullanır, geliştirme sürecinde neredeyse anında hazır.",
          en: "Webpack and Vite are two different LEGO packaging factories. Webpack meticulously packs each piece individually (slower but highly configurable). Vite is the modern LEGO factory — uses ESM modules natively, nearly instant during development."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "ESLint kuralları, LEGO kalite kontrol kılavuzu gibidir: kılavuz parçaların hangi ölçülerde, renklerde ve şekillerde olacağını belirler. Her geliştirici kılavuza uyarsa, tüm ekibin ürettiği parçalar birbirine uyumlu olur.",
          en: "ESLint rules are like a LEGO quality control handbook: the handbook specifies which dimensions, colors, and shapes are acceptable. When every developer follows the handbook, all team members' output fits together perfectly."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden bundler (Webpack/Vite) gerekli? Tarayıcılar yüzlerce ayrı JS dosyasını indirmekte yavaşlar (HTTP/1.1'de her istek yeni bağlantı). Bundler, tüm dosyaları tek veya birkaç büyük dosyada birleştirir ve tree-shaking ile kullanılmayan kodları çıkarır — son paket hem küçük hem hızlı olur.",
          en: "Why do we need bundlers (Webpack/Vite)? Browsers are slow at loading hundreds of separate JS files (each HTTP/1.1 request is a new connection). Bundlers merge all files into one or a few large files, and tree-shaking removes unused code — the final bundle is small and fast."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden TypeScript JS ekosisteminde bu kadar yaygınlaştı? Büyük projelerde tip güvenliği (type safety) olmadan refactoring tehlikelidir, IDE desteği zayıftır, runtime hatalar geç ortaya çıkar. TypeScript bu sorunları derleme zamanında çözer ve kod tabanını daha anlaşılır kılar — Playwright varsayılan olarak TypeScript'i destekler.",
          en: "Why has TypeScript become so prevalent in the JS ecosystem? In large projects, refactoring without type safety is risky, IDE support is poor, and runtime errors surface too late. TypeScript solves these at compile time and makes the codebase more understandable — Playwright supports TypeScript by default."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain npm and package.json to someone who has never written code, like a grocery shopping list. What are the 3 most important steps when setting up a Playwright project?",
        promptTr: "🤖 Mini Kahraman Soruyor: npm ve package.json'u hiç yazılım yazmamış birine bir market sepeti veya market alışverişi gibi anlat. Playwright projesi kurarken en önemli 3 adım nedir?",
        keywords: [
              ["paket", "package"],
              ["kütüphane", "library"],
              ["indir", "download"],
              "npm",
              "playwright",
              ["kurulum", "install"],
              ["tarayıcı", "browser"],
              "test",
              ["proje", "project"],
              ["install", "setup"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 12 — Errors & Debugging
  // ─────────────────────────────────────────────
  {
    title: { tr: "Hatalar & Debugging", en: "Errors & Debugging" },
    blocks: [
      {
        type: "css-animation",
        kind: "errors",
        label: { tr: "TypeError → Optional Chain ile Düzeltme", en: "TypeError → Fix with Optional Chaining" }
      },
      {
        type: "simple-box",
        emoji: "🐛",
        content: {
          tr: "Hatalar korkutucu değildir! Kırmızı hata mesajını, arabanın gösterge panelindeki uyarı ışığı gibi düşün: ışık arızanın kendisi değildir, sana kaputun altında nereye bakacağını söyleyen şeydir. `TypeError: Cannot read property 'text' of null` mesajı 'kod bozuk' demez; 'aradığın element sayfada yoktu' der. Peki madem mesaj bu kadar yardımcı, neden bu kadar çok kişi hatayı `try-catch` ile sarıp geçmeyi tercih ediyor? Çünkü hatayı susturmak, çözmekten kısa vadede daha kolaydır — ve testlerde bunun bedeli ağırdır: boş bir `catch` bloğu, kırılması GEREKEN bir testi yeşil gösterir. Java'da `catch (Exception e) {}` yazmanın neden kötü sayıldığını biliyorsun; JavaScript'te aynı kural, üstüne bir de asenkron tuzağıyla geçerlidir — `await` olmadan çağrılan bir asenkron fonksiyonun hatasını `try-catch` HİÇ yakalayamaz, hata sessizce kaybolur. QA açısından kural nettir: hatayı yalnızca ne yapacağını biliyorsan yakala, bilmiyorsan bırak patlasın — patlayan test, sessizce geçen testten çok daha ucuzdur. Şimdi en sık karşılaşılan JavaScript hatalarını ve `try-catch` bloklarını nasıl kullanacağımızı öğrenelim.",
          en: "Errors are not scary! Think of a red error message as a warning light on a car's dashboard: the light is not the fault, it is the thing telling you where to look under the bonnet. `TypeError: Cannot read property 'text' of null` does not say \"your code is broken\"; it says \"the element you asked for was not on the page\". So if the message is this helpful, why do so many people wrap the error in `try-catch` and move on? Because silencing a failure is cheaper than solving it — in the short term. In tests the price is steep: an empty `catch` block turns a test that SHOULD fail into a green one. You already know why `catch (Exception e) {}` is frowned upon in Java; the same rule holds in JavaScript, plus an async trap on top — `try-catch` cannot catch anything thrown by an async function you called without `await`, and the error vanishes silently. The QA rule is blunt: catch an error only when you know what to do about it; otherwise let it explode. An exploding test is far cheaper than a quietly passing one. Let's learn the most common JavaScript errors and how to handle them using `try-catch` blocks."
        }
      },
      {
        type: "error-dictionary",
          relatedTopicId: 'javascript-errors',
        errors: [
          {
            code: "TypeError: Assignment to constant variable",
            description: {
              tr: "const ile tanımlanmış bir değişkene yeni bir değer atamaya çalıştığınızda oluşur.",
              en: "Occurs when trying to reassign a value to a variable declared with const."
            },
            fix: {
              tr: "Değişkenin değerinin değişmesi gerekiyorsa let ile tanımlayın.",
              en: "If the value needs to change over time, declare the variable with let instead."
            }
          },
          {
            code: "ReferenceError: x is not defined",
            description: {
              tr: "Tanımlanmamış veya o anki kapsamda (scope) bulunmayan bir değişkene erişilmeye çalışıldığında oluşur.",
              en: "Thrown when accessing a variable that has not been declared or is out of scope."
            },
            fix: {
              tr: "Değişkenin adını kontrol edin ve let/const ile tanımlandığından emin olun.",
              en: "Check the variable name spelling or verify it was declared using let/const."
            }
          },
          {
            code: "TypeError: Cannot read properties of undefined (reading 'click')",
            description: {
              tr: "Bulunamayan veya tanımsız (undefined) bir elemanın üzerinden fonksiyon çağrıldığında oluşur (Java'daki NullPointerException).",
              en: "Occurs when invoking a method on an undefined object (similar to Java's NullPointerException)."
            },
            fix: {
              tr: "Elementi bulup bulamadığınızı (örneğin locator'ın geçerliliğini ve bekleme süresini) kontrol edin.",
              en: "Verify that the locator matches an active element and that proper waits are used before action."
            }
          },
          {
            code: "SyntaxError: Unexpected token '<'",
            description: {
              tr: "JSON.parse() ile HTML içeriğini parse etmeye çalışıldığında oluşur. API 404 veya hata sayfası döndürdüğünde JSON yerine HTML gelir.",
              en: "Thrown when JSON.parse() encounters HTML content. The API returned a 404 page or error HTML instead of a proper JSON response."
            },
            fix: {
              tr: "`response.ok` kontrolü ekleyin. `Content-Type: application/json` header'ını doğrulayın, ardından parse edin.",
              en: "Check `response.ok` before parsing. Validate the `Content-Type: application/json` header before calling JSON.parse()."
            }
          },
          {
            code: "TypeError: x is not a function",
            description: {
              tr: "Fonksiyon olmayan bir değer (sayı, string, undefined) üzerinde parantezle çağrı yapıldığında oluşur.",
              en: "Thrown when a non-function value (number, string, undefined) is invoked with parentheses as if it were a function."
            },
            fix: {
              tr: "`typeof myFn === 'function'` koruması ekleyin veya değişken adının doğru yazıldığını kontrol edin.",
              en: "Add `typeof myFn === 'function'` guard before the call, or verify the variable name is correctly spelled."
            }
          },
          {
            code: "RangeError: Maximum call stack size exceeded",
            description: {
              tr: "Sonsuz özyineleme (infinite recursion) sonucunda çağrı yığını (call stack) taşar. Java'daki StackOverflowError'ın birebir karşılığıdır.",
              en: "Thrown when infinite recursion overflows the call stack. Equivalent to Java's StackOverflowError."
            },
            fix: {
              tr: "Rekürsif fonksiyona doğru bir taban koşulu (base case) ekleyin veya döngüye (iterative loop) çevirin.",
              en: "Add a proper base case to the recursive function, or convert the recursion to an iterative loop."
            }
          },
          {
            code: "UnhandledPromiseRejection: Promise rejected without .catch()",
            description: {
              tr: "Reddedilen (rejected) bir Promise, `.catch()` veya `try/catch` ile yakalanmadığında fırlatılır. CI pipeline'da sessizce test geçmesine yol açan en sık hatalardan biridir.",
              en: "Thrown when a rejected Promise is not caught by a `.catch()` or `try/catch` block. One of the most common causes of false-pass tests in CI."
            },
            fix: {
              tr: "`async/await` kullanan tüm kod bloklarını `try/catch` ile sarın; `.then()` zincirlerine mutlaka `.catch()` ekleyin.",
              en: "Wrap all `async/await` blocks in `try/catch`, and always chain `.catch()` to every Promise `.then()` handler."
            }
          },
          {
            code: "TypeError: Cannot set properties of null",
            description: {
              tr: "DOM sorgusu null dönen (bulunamayan) bir elementin özelliğini değiştirmeye çalışıldığında oluşur.",
              en: "Occurs when attempting to mutate a property on a null value, meaning the DOM query returned no matching element."
            },
            fix: {
              tr: "Değiştirmeden önce `if (element !== null)` kontrolü veya optional chaining operatörü `element?.style.color` kullanın.",
              en: "Guard with `if (element !== null)` before mutation, or use the optional chaining operator: `element?.style.color`."
            }
          },
          {
            code: "Error: Timeout — Locator not found within 30000ms",
            description: {
              tr: "Playwright/Selenium'da bir locator belirlenen süre içinde DOM'da görünür hale gelmediğinde otomasyon testinin fırlattığı hata. En sık karşılaşılan test flakiness (güvensizlik) kaynağıdır.",
              en: "Thrown by Playwright/Selenium when a locator does not become visible within the configured timeout. One of the most frequent causes of test flakiness in automation suites."
            },
            fix: {
              tr: "Selector'ın güncel ve geçerli olduğunu doğrulayın. Gerekirse `waitFor` süresini artırın; asenkron yükleme varsa uygun `expect(...).toBeVisible()` beklemesi ekleyin.",
              en: "Verify the selector is accurate and up-to-date. Increase `waitFor` timeout if needed, and add proper `expect(...).toBeVisible()` waits for async-loaded elements."
            }
          }
        ]
      },
      {
        type: "heading",
        content: { tr: "Hata Yakalama (Try-Catch)", en: "Error Handling (Try-Catch)" }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "220px",
        defaultCode: {
          tr: `// Hatalı kodları try-catch ile kontrol altına edin!
try {
  console.log("Adım A: Normal İşlem.");
  let x = y; // y tanımlı değil, ReferenceError fırlayacak!
  console.log("Adım B: Burası çalışmayacak.");
} catch (error) {
  console.log("Hata Yakalandı! Mesaj:", error.message);
} finally {
  console.log("Adım C: Burası her halükarda çalışır (Temizlik aşaması).");
}`,
          en: `// Guard risky code statements using try-catch blocks!
try {
  console.log("Step A: Normal Action.");
  let x = y; // y is not defined, throws ReferenceError!
  console.log("Step B: This line is bypassed.");
} catch (error) {
  console.log("Error Intercepted! Message:", error.message);
} finally {
  console.log("Step C: This block always executes (Teardown phase).");
}`
        }
      },
      jsTryCatchStacktraceFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te çalışma zamanında oluşabilecek hataları yakalamak ve test akışının çökmesini engellemek için hangi blok kullanılır?",
          en: "Which syntax block is used to catch runtime exceptions and prevent the test runner from crashing?"
        },
        options: [
          { id: "a", text: "if...else" },
          { id: "b", text: "switch...case" },
          { id: "c", text: "try...catch" },
          { id: "d", text: "throw...error" }
        ],
        correct: "c",
        explanation: {
          tr: "`try...catch` yapısı sayesinde korumasız kodlar `try` içine alınır ve bir hata fırlatıldığında `catch` bloğu çalışarak uygulamanın/testin kontrollü devam etmesini sağlar.",
          en: "`try...catch` runs risky expressions in the `try` block, routing any thrown exception into `catch` to prevent execution crashes."
        },
        retryQuestion: {
          question: {
            tr: "İsteğe bağlı olarak kod içinde özel bir hata (custom exception/error) fırlatmak için hangi anahtar kelime kullanılır?",
            en: "Which keyword is used to explicitly throw a custom exception or error in JavaScript?"
          },
          options: [
            { id: "a", text: "catch" },
            { id: "b", text: "throw" },
            { id: "c", text: "raise" },
            { id: "d", text: "reject" }
          ],
          correct: "b",
          explanation: {
            tr: "`throw` anahtar kelimesi, çalışma zamanında manuel olarak bir hata nesnesi oluşturup fırlatılmasını sağlar (Örn: `throw new Error('Element bulunamadı');`).",
            en: "The `throw` keyword manually spawns and outputs a runtime error (e.g., `throw new Error('Element missing');`)."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'te `try/catch` bloğu, bir yangın tatbikatı gibidir: normal işlem `try` bölgesinde sürer, bir şeyler ters giderse `catch` yangın çıkışından kaçış planını devreye sokar, `finally` ise yanmış olsa da olmasa da kapıları kilitleyip ışıkları kapatır (temizlik işlemi).",
          en: "JavaScript's `try/catch` block is like a fire drill: normal operation continues in `try`, if something goes wrong `catch` activates the emergency exit plan, and `finally` locks the doors and turns off the lights regardless of whether there was a fire (cleanup always runs)."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Hata türleri (Error types), LEGO setindeki farklı arıza kategorileri gibidir: `TypeError` yanlış parça takılmaya çalışıldığında (yanlış tip), `ReferenceError` hiç olmayan parça istendiğinde (tanımsız değişken), `SyntaxError` talimat kitapçığındaki yazım hatası (geçersiz sözdizimi).",
          en: "Error types are like different failure categories in a LEGO build: `TypeError` when you try to attach the wrong piece type, `ReferenceError` when you ask for a piece that doesn't exist (undefined variable), `SyntaxError` when the instruction booklet has a typo (invalid syntax)."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Custom Error sınıfları, standart LEGO hata raporlarını özelleştirmek gibidir: `class ApiError extends Error` yazmak, standart hata formuna şirket logon'u ve API endpoint bilgisini eklemeye benzer — hangi servisin, hangi endpoint'te, hangi kodla başarısız olduğu anında görünür.",
          en: "Custom Error classes are like customizing standard LEGO fault reports: writing `class ApiError extends Error` is like adding your company logo and API endpoint field to the standard form — which service, which endpoint, which status code failed is immediately visible."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `throw new Error()` yerine doğrudan string fırlatmak kötü pratik? `throw \"hata mesajı\"` yazmak, stack trace (hata izi) sağlamaz. `throw new Error(\"mesaj\")` ise hangi fonksiyonun, hangi satırda başarısız olduğunu Stack Trace ile gösterir — debug süresi dramatiğe azalır.",
          en: "Why is throwing a plain string instead of `throw new Error()` bad practice? `throw \"error message\"` provides no stack trace. `throw new Error(\"message\")` shows exactly which function, on which line, failed — dramatically reducing debug time. Always throw proper Error objects."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `finally` bloku her zaman çalışır? `finally`, test temizliği (teardown) için kritiktir: veritabanı bağlantısını kapat, dosyayı sil, browser'ı kapat gibi işlemler test başarılı da olsa başarısız da olsa çalışmalıdır. Java'daki `finally` ile birebir aynı konsept — Playwright'ta `afterEach` hook da aynı amacı güder.",
          en: "Why does `finally` always run? `finally` is critical for test teardown: closing database connections, deleting files, closing the browser must happen whether the test passed or failed. Identical concept to Java's `finally` — Playwright's `afterEach` hook serves the same purpose."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdaki kodda `finally` bloğu ne zaman çalışır?\n```js\ntry { throw new Error(\"hata\"); } catch(e) { console.log(\"yakalandı\"); } finally { console.log(\"temizlik\"); }\n```", en: "When does the `finally` block run?\n```js\ntry { throw new Error(\"error\"); } catch(e) { console.log(\"caught\"); } finally { console.log(\"cleanup\"); }\n```" },
        options: [
          { id: "a", text: { tr: "Yalnızca hata yoksa", en: "Only if there is no error" } },
          { id: "b", text: { tr: "Yalnızca hata varsa", en: "Only if there is an error" } },
          { id: "c", text: { tr: "Her zaman — hata olsa da olmasa da", en: "Always — whether or not an error occurred" } },
          { id: "d", text: { tr: "Hiçbir zaman — throw sonrası ulaşılamaz", en: "Never — unreachable after throw" } }
        ],
        correct: "c",
        explanation: { tr: "`finally` bloğu HER ZAMAN çalışır: `try` başarılı olsa da, `catch` tetiklense de. Bu, veritabanı bağlantısı kapatma veya dosya temizleme gibi zorunlu temizlik işlemleri için mükemmeldir.", en: "`finally` ALWAYS runs: whether `try` succeeds or `catch` triggers. This makes it perfect for mandatory cleanup like closing database connections or deleting temp files." },
        retryQuestion: {
          question: { tr: "Özel hata sınıfı oluşturmak için hangi sözdizimi kullanılır?", en: "What syntax creates a custom error class?" },
          options: [
            { id: "a", text: "class MyError implements Error {}" },
            { id: "b", text: "class MyError extends Error { constructor(msg) { super(msg); } }" },
            { id: "c", text: "function MyError() {}" },
            { id: "d", text: "const MyError = new Error()" }
          ],
          correct: "b",
          explanation: { tr: "`class MyError extends Error` ile Error sınıfından kalıtım alırsın. `super(msg)` çağrısı temel Error sınıfının constructor'ını çalıştırır ve `message`, `stack` özelliklerini ayarlar.", en: "`class MyError extends Error` inherits from the Error class. `super(msg)` runs the base Error constructor, setting the `message` and `stack` properties automatically." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Why do we use try-catch? Why is catching errors in automation tests important? What do you think about learning to read error messages?",
        promptTr: "🤖 Mini Kahraman Soruyor: try-catch bloğunu neden kullanırız? Bir otomasyon testinde hata yakalamak neden önemlidir? Hata mesajlarını okumayı öğrenmek hakkında ne düşünüyorsun?",
        keywords: [
              ["hata", "error"],
              ["yakalamak", "catch"],
              "try",
              ["catch", "crash"],
              ["çökme", "safe"],
              ["güvenli", "message"],
              ["mesaj", "control"],
              ["kontrol", "continue"],
              ["devam", "prevent"],
              ["önlem", "handle"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 13 — DOM Events
  // ─────────────────────────────────────────────
  {
    title: { tr: "DOM Olayları (Events)", en: "DOM Events" },
    blocks: [
      {
        type: "css-animation",
        kind: "events",
        label: { tr: "Event Bubbling — Olayın DOM Ağacında Yukarı Yayılması", en: "Event Bubbling — Event propagates up the DOM tree" }
      },
      {
        type: "simple-box",
        emoji: "🎯",
        content: {
          tr: "DOM eventleri, kullanıcının bir butona tıklaması, klavyeden bir şey yazması veya fareyi hareket ettirmesi gibi eylemler gerçekleştiğinde tetiklenen mesajlardır. Tıpkı kapı zilinin çalınması (event), kapıcının gelmesi (listener) ve kapıyı açması (handler) gibi bir zincirdir. Java'da ActionListener kullanırdık; JavaScript'te ise addEventListener çok daha sade ve güçlüdür. Peki bu zincir bir QA mühendisini neden ilgilendirsin — testte zaten `click()` yazıp geçmiyor muyuz? Tam olarak burada, otomasyonun en can sıkıcı hatalarından biri doğar: Selenium veya Playwright'ın `click()`'i gerçek bir tarayıcı event'i tetikler, ama React gibi framework'ler kendi listener'larını sayfa yüklendikten SONRA bağlar. Element ekranda görünür olduğu hâlde listener henüz bağlanmamışsa, tıklama fiziksel olarak gerçekleşir ama HİÇBİR ŞEY olmaz — ne hata, ne uyarı. Java'daki ActionListener'da bu sorun yoktur çünkü bileşen ile dinleyici aynı anda kurulur; tarayıcıda ise DOM ile JavaScript ayrı zamanlarda hazır olur. Sonuç, klasik flaky test tablosudur: test lokalde geçer, CI'da rastgele kırılır — ve çözüm `sleep` eklemek değil, elementin görünürlüğü yerine gerçekten etkileşime hazır olmasını beklemektir.",
          en: "DOM events are messages triggered when the user does something — clicking a button, typing, or moving the mouse. Think of it like a doorbell ringing (event), the doorman arriving (listener), and opening the door (handler). In Java we'd use ActionListener; in JavaScript addEventListener is far simpler and more powerful. But why should a QA engineer care about this chain — don't we just write `click()` and move on? This is exactly where one of automation's most maddening bugs is born: Selenium's or Playwright's `click()` fires a real browser event, but frameworks like React attach their listeners AFTER the page has loaded. If the element is visible while its listener is not yet bound, the click physically happens and NOTHING occurs — no error, no warning. Java's ActionListener never has this problem, because the component and its listener are constructed together; in a browser the DOM and the JavaScript become ready at different moments. The result is the classic flaky-test picture: passes locally, fails at random in CI — and the fix is not adding a `sleep`, it is waiting for the element to be genuinely interactive rather than merely visible."
        }
      },
      {
        type: "heading",
        content: { tr: "En Sık Kullanılan Event Tipleri", en: "Most Common Event Types" }
      },
      {
        type: "table",
        headers: [
          { tr: "Event", en: "Event" },
          { tr: "Ne Zaman Tetiklenir?", en: "When Triggered?" },
          { tr: "QA Kullanımı", en: "QA Usage" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["click",       { tr: "Element tıklandığında", en: "On element click" },              { tr: "Buton, link testi", en: "Button, link test" },           "ActionListener"],
          ["dblclick",    { tr: "Çift tıklandığında", en: "On double click" },                 { tr: "Tablo satırı seçimi", en: "Table row selection" },        "MouseListener"],
          ["change",      { tr: "Input değeri değiştiğinde", en: "On input value change" },    { tr: "Dropdown, checkbox testi", en: "Dropdown, checkbox test" }, "ItemListener"],
          ["input",       { tr: "Her tuş vuruşunda", en: "On every keystroke" },               { tr: "Canlı arama kutusu", en: "Live search box" },             "KeyListener"],
          ["keydown",     { tr: "Tuşa basıldığında", en: "On key press" },                     { tr: "Klavye kısayol testi", en: "Keyboard shortcut test" },    "KeyListener"],
          ["submit",      { tr: "Form gönderildiğinde", en: "On form submit" },                { tr: "Form doğrulama testi", en: "Form validation test" },       "ActionListener"],
          ["focus/blur",  { tr: "Element odaklandı/odak kaybetti", en: "On focus/blur" },      { tr: "Input validasyon testi", en: "Input validation test" },    "FocusListener"],
          ["mouseover",   { tr: "Fare üstüne geldiğinde", en: "On mouse hover" },              { tr: "Tooltip görünürlük testi", en: "Tooltip visibility test" }, "MouseMotionListener"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "addEventListener — Temel Kullanım", en: "addEventListener — Basic Usage" },
        content: {
          tr: `// ─── addEventListener sözdizimi ──────────────────────────────
// element.addEventListener(eventType, handler, useCapture=false)

// 1. Buton tıklama — en yaygın kullanım
const btn = document.querySelector('#submit-btn');
btn.addEventListener('click', function(event) {
  console.log('Tıklandı! Hedef element:', event.target.id);
  event.preventDefault(); // Formun otomatik gönderilmesini önle
});

// 2. Arrow function (daha kısa — Playwright testlerinde standart)
btn.addEventListener('click', (e) => {
  console.log('Element tipi:', e.type, '| X,Y:', e.clientX, e.clientY);
});

// 3. Input olay takibi (canlı form doğrulama)
const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', (e) => {
  const val = e.target.value;
  const isValid = val.includes('@');
  console.log('E-posta geçerli mi?', isValid ? '✅' : '❌');
});

// 4. Dinleyiciyi kaldırma (bellek sızıntısını önler)
function handleClick(e) { console.log('Tıklandı'); }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // temizle`,
          en: `// ─── addEventListener syntax ─────────────────────────────────
// element.addEventListener(eventType, handler, useCapture=false)

// 1. Button click — most common usage
const btn = document.querySelector('#submit-btn');
btn.addEventListener('click', function(event) {
  console.log('Clicked! Target element:', event.target.id);
  event.preventDefault(); // prevent form auto-submit
});

// 2. Arrow function (shorter — standard in Playwright tests)
btn.addEventListener('click', (e) => {
  console.log('Event type:', e.type, '| X,Y:', e.clientX, e.clientY);
});

// 3. Input event tracking (live form validation)
const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', (e) => {
  const val = e.target.value;
  const isValid = val.includes('@');
  console.log('Email valid?', isValid ? '✅' : '❌');
});

// 4. Removing a listener (prevents memory leaks)
function handleClick(e) { console.log('Clicked'); }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // clean up`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "200px",
        defaultCode: {
          tr: `// Event simülasyonu — sadece console ile çalışır
const mockElement = {
  _listeners: {},
  addEventListener(type, fn) {
    this._listeners[type] = fn;
    console.log("✅ Dinleyici eklendi:", type);
  },
  trigger(type, data = {}) {
    if (this._listeners[type]) {
      this._listeners[type]({ type, target: this, ...data });
    }
  }
};

mockElement.addEventListener('click', (e) => {
  console.log("Tıklama yakalandı! Event tipi:", e.type);
});

mockElement.trigger('click', { clientX: 100, clientY: 200 });`,
          en: `// Event simulation — works with console only
const mockElement = {
  _listeners: {},
  addEventListener(type, fn) {
    this._listeners[type] = fn;
    console.log("✅ Listener added:", type);
  },
  trigger(type, data = {}) {
    if (this._listeners[type]) {
      this._listeners[type]({ type, target: this, ...data });
    }
  }
};

mockElement.addEventListener('click', (e) => {
  console.log("Click captured! Event type:", e.type);
});

mockElement.trigger('click', { clientX: 100, clientY: 200 });`
        }
      },
      jsEventBubblingFilm,
      {
        type: "quiz",
        question: {
          tr: "Bir butonun tıklama olayını dinlemek için doğru yöntem hangisidir?",
          en: "Which is the correct way to listen for a button click event?"
        },
        options: [
          { id: "a", text: `btn.on('click', fn)` },
          { id: "b", text: `btn.addEventListener('click', fn)` },
          { id: "c", text: `btn.listen('click', fn)` },
          { id: "d", text: `btn.onclick = 'fn()'` }
        ],
        correct: "b",
        explanation: {
          tr: "`addEventListener` modern JavaScript'in standart event dinleme yöntemidir. Aynı elemente birden fazla listener eklenebilir ve `removeEventListener` ile temizlenebilir. `onclick = fn` ise yalnızca tek bir handler tanımına izin verir.",
          en: "`addEventListener` is the modern standard for event binding. Multiple listeners can be attached to the same element and cleanly removed with `removeEventListener`. Using `onclick = fn` is the legacy approach, allowing only one handler at a time."
        },
        retryQuestion: {
          question: {
            tr: "Bir form submit olayında `event.preventDefault()` ne işe yarar?",
            en: "What does `event.preventDefault()` do in a form submit handler?"
          },
          options: [
            { id: "a", text: { tr: "Event dinleyiciyi siler", en: "Removes the event listener" } },
            { id: "b", text: { tr: "Sayfanın yeniden yüklenmesini veya formun varsayılan gönderimini engeller", en: "Prevents the page from reloading or the form from submitting by default" } },
            { id: "c", text: { tr: "JavaScript çalışmasını tamamen durdurur", en: "Stops all JavaScript execution" } },
            { id: "d", text: { tr: "Formu siler", en: "Deletes the form" } }
          ],
          correct: "b",
          explanation: {
            tr: "`event.preventDefault()`, tarayıcının olay için yapacağı varsayılan eylemi (form submit'te sayfa yenileme, link'te navigate) iptal eder. Otomasyon testlerinde form gönderim davranışını kontrol etmek için kullanılır.",
            en: "`event.preventDefault()` cancels the browser's default response to the event (page reload on form submit, navigation on link click). It is commonly used in automation tests to intercept form submissions without triggering page navigation."
          }
        }
      },
      {
        type: "quiz",
        question: {
          tr: "Playwright'ta bir form inputuna değer yazıp ardından 'change' event'ini tetiklemek için hangi metod kullanılır?",
          en: "Which Playwright method types into a form input and triggers its change event?"
        },
        options: [
          { id: "a", text: `page.fill('#input', 'value')` },
          { id: "b", text: `page.type('#input', 'value')` },
          { id: "c", text: `page.setValue('#input', 'value')` },
          { id: "d", text: `page.input('#input', 'value')` }
        ],
        correct: "a",
        explanation: {
          tr: "`page.fill()` seçilen input'u temizleyip verilen değeri yazar ve change/input event'lerini otomatik tetikler. `page.type()` ise karakter karakter yazar ve her tuş basışında keydown/keypress/keyup event'lerini tetikler; autocomplete alanları için tercih edilir.",
          en: "`page.fill()` clears and types the given value, automatically triggering change/input events. `page.type()` types character-by-character, firing keydown/keypress/keyup per character — preferred for testing autocomplete inputs."
        },
        retryQuestion: {
          question: {
            tr: "Bir elementin üzerinde klavye tuşuna basma olayını simüle etmek için hangi Playwright metodu kullanılır?",
            en: "Which Playwright method simulates pressing a keyboard key on an element?"
          },
          options: [
            { id: "a", text: `page.keyboard.press('Enter')` },
            { id: "b", text: `page.press('#el', 'Enter')` },
            { id: "c", text: { tr: "Her ikisi de doğrudur", en: "Both are correct" } },
            { id: "d", text: `page.keydown('Enter')` }
          ],
          correct: "c",
          explanation: {
            tr: "Playwright'ta klavye tuşu simülasyonu için hem `page.keyboard.press('Enter')` (global klavye) hem de `page.press('selector', 'Enter')` (belirli element üzerinde) kullanılabilir.",
            en: "Both `page.keyboard.press('Enter')` (global keyboard action) and `page.press('selector', 'Enter')` (element-focused action) are valid Playwright methods for simulating keyboard events."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "DOM event sistemi, bir apartmanın zil sistemi gibidir: `addEventListener` her kapıya zil düğmesi takmak, callback ise biri zile bastığında yapılacaklar listesi. Event delegation ise sadece apartmanın ana girişine bir güvenlik kamerası koymak ve tüm sakinlerin girişini buradan izlemek — her daire kapısına ayrı kamera gerekmez.",
          en: "The DOM event system is like an apartment intercom: `addEventListener` installs a doorbell button on every door, the callback is the list of things to do when someone rings. Event delegation is like putting one security camera at the main entrance only — monitoring all residents from one point instead of installing cameras at every apartment door."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Event delegation, tüm LEGO parçalarını tek bir büyük kutuya koyup kutu üzerindeki etiketle hangi parçanın tıklandığını anlamak gibidir: her parçaya ayrı izleyici (listener) yerine, kutuya tek listener bağlarsın ve `event.target` ile hangi parçaya tıklandığını öğrenirsin.",
          en: "Event delegation is like putting all LEGO pieces in one big labeled box and knowing which piece was touched by reading its label: instead of attaching a separate listener to each piece, you attach one listener to the box and read `event.target` to find out which piece was touched."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Event propagation (kabarcıklanma/capturing), bir LEGO kulesinde tıklama gibidir: en üst katı tıkladığında, event altındaki tüm katlardan da geçer (bubbling). `event.stopPropagation()` ise bir kattaki güvenlik kapısı — event o kattan aşağı inmesini engeller.",
          en: "Event propagation (bubbling/capturing) is like clicking a LEGO tower: clicking the top floor sends the click event through every floor below (bubbling). `event.stopPropagation()` is a security door at one floor — it prevents the event from traveling further down."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden `addEventListener` yerine `onclick` HTML attribute'u kötü pratik? `onclick` HTML attribute'u yalnızca tek bir handler bağlamanıza izin verir — ikinci `onclick` birincinin üzerine yazar. `addEventListener` ile aynı elemente istediğiniz kadar handler ekleyebilirsiniz ve JavaScript'i HTML'den ayırır (separation of concerns).",
          en: "Why is the `onclick` HTML attribute bad practice compared to `addEventListener`? `onclick` only allows one handler — a second assignment overwrites the first. `addEventListener` lets you attach as many handlers as needed to the same element and separates JavaScript from HTML (separation of concerns)."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden event listener'ları temizlemek (removeEventListener) önemli? Bir elemente bağlı event listener, o element DOM'dan kaldırılsa bile garbage collected olmaz. Özellikle SPA (Single Page Application) geçişlerinde eski sayfadan kalan listener'lar memory leak yaratır. Test teardown sırasında ekleyip unuttuğun listener'lar testi kirletebilir.",
          en: "Why is cleaning up event listeners (removeEventListener) important? An event listener attached to an element prevents garbage collection even after the element is removed from the DOM. In SPAs (Single Page Applications), leftover listeners from old pages create memory leaks. In test teardown, forgotten listeners from setup can contaminate other tests."
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain addEventListener and DOM events like a doorbell or alarm system. Why are click and input events critical in automation testing?",
        promptTr: "🤖 Mini Kahraman Soruyor: addEventListener'ı ve DOM eventlerini bir kapı zili sistemi veya alarm sistemi gibi anlat. Otomasyon testlerinde neden click ve input olayları kritik?",
        keywords: [
              ["olay", "event"],
              ["dinle", "listen"],
              ["tıkla", "click"],
              ["tetikle", "trigger"],
              ["event", "listener"],
              ["click", "input"],
              ["listener", "response"],
              ["input", "simulate"],
              ["tepki", "fire"],
              ["simüle", "handler"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 14 — Dates
  // ─────────────────────────────────────────────
  {
    title: { tr: "Tarih & Zaman (Date)", en: "Dates & Time" },
    blocks: [
      {
        type: "css-animation",
        kind: "dates",
        label: { tr: "JavaScript Date — Takvim + Kronometre", en: "JavaScript Date — Calendar + Stopwatch" }
      },
      {
        type: "simple-box",
        emoji: "📅",
        content: {
          tr: "JavaScript'te Date nesnesi bir takvim + saat kombinasyonudur. Test otomasyonunda tarihlerle çok işimiz var: raporlardaki timestamp'leri doğrularız, 'son 30 gün içinde kayıt olan kullanıcı' gibi filtreleri test ederiz, token son kullanma tarihlerini kontrol ederiz. Java'daki `LocalDateTime` veya `Calendar` neyse burada `Date` o. Ama şu soruyu sor: tarih testi neden bu kadar sık kırılır — takvim herkes için aynı değil mi? Değil, ve sebebi `Date`'in bir takvimden çok bir **zaman damgası + görüntüleme tercihi** olmasıdır. Aynı an, testi koşturan makinenin saat diliminde farklı bir tarih olarak yazılır: sunucu UTC'de 00:30 derken senin makinen İstanbul'da ertesi gün 03:30 der. 'Son 30 gün' filtresini lokalde geçen bir test, CI runner'ında sınırda kalıp kırılır — üstelik sadece ayın belirli günlerinde. Java'nın `LocalDate`/`ZonedDateTime` ayrımı bu tuzağı tip düzeyinde görünür kılar; JavaScript'in tek `Date` tipi ise ayrımı gizler, ay indeksinin 0'dan başlaması gibi ek bir sürprizle birlikte (Ocak = 0). QA kuralı: tarih üreten testlerde makinenin 'şimdi'sine güvenme — zamanı sabitle (fixed clock/mock) veya karşılaştırmayı UTC üzerinden yap.",
          en: "The JavaScript Date object combines a calendar and a clock. In test automation we frequently work with dates: validating report timestamps, testing 'registered in last 30 days' filters, checking token expiry. Java's `LocalDateTime` or `Calendar` is what the JS `Date` object is here. But ask yourself: why do date tests break so often — isn't the calendar the same for everyone? It isn't, and the reason is that `Date` is less a calendar than a **timestamp plus a display preference**. The same instant is written as a different date depending on the machine's timezone: the server says 00:30 UTC while your laptop in Istanbul says 03:30 the following day. A \"last 30 days\" filter that passes locally sits right on the boundary in a CI runner and fails — and only on certain days of the month. Java's `LocalDate`/`ZonedDateTime` split makes that trap visible at the type level; JavaScript's single `Date` hides it, and throws in a bonus surprise: month indexes start at 0 (January = 0). The QA rule: never trust the machine's \"now\" in a test that generates dates — freeze the clock (fixed clock/mock) or compare in UTC."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Metot", en: "Method" },
          { tr: "Ne Döner?", en: "Returns" },
          { tr: "Örnek", en: "Example" },
          { tr: "Java Karşılığı", en: "Java Equivalent" }
        ],
        rows: [
          ["new Date()",          { tr: "Şu anki tarih/saat", en: "Current date/time" },           "new Date()",                               "LocalDateTime.now()"],
          ["new Date(ms)",        { tr: "Epoch ms'den Date üretir", en: "Date from epoch ms" },     "new Date(0)",                              "Instant.ofEpochMilli(0)"],
          [".getFullYear()",      { tr: "4 haneli yıl", en: "4-digit year" },                       "d.getFullYear() → 2025",                   ".getYear()"],
          [".getMonth()",         { tr: "Ay (0-11!)", en: "Month (0-11!)" },                        "d.getMonth() + 1 → gerçek ay",             ".getMonthValue() - 1"],
          [".getDate()",          { tr: "Ayın günü (1-31)", en: "Day of month (1-31)" },            "d.getDate() → 15",                         ".getDayOfMonth()"],
          [".getTime()",          { tr: "Epoch ms (Unix timestamp)", en: "Epoch ms (Unix timestamp)" }, "d.getTime() → 1700000000000",         ".toEpochMilli()"],
          [".toISOString()",      { tr: "ISO 8601 string", en: "ISO 8601 string" },                 `"2025-01-15T10:30:00.000Z"`,               ".format(DateTimeFormatter.ISO_INSTANT)"],
          [".toLocaleDateString()", { tr: "Yerel formatlı tarih", en: "Locale-formatted date" },   `"1/15/2025"`,                              ".format(DateTimeFormatter.ofLocalizedDate())"],
          ["Date.now()",          { tr: "Şu anki epoch ms (statik)", en: "Current epoch ms (static)" }, "Date.now()",                         "System.currentTimeMillis()"]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Tarih Karşılaştırma — QA Senaryosu", en: "Date Comparison — QA Scenario" },
        content: {
          tr: `// ─── Şu anki tarihi al ───────────────────────────────────────
const now = new Date();
console.log("Şu an:", now.toISOString());  // 2025-06-24T...

// ─── Tarihler arası gün farkı hesapla ────────────────────────
function daysBetween(d1, d2) {
  const ms = Math.abs(d2 - d1);            // milisaniye farkı
  return Math.floor(ms / (1000 * 60 * 60 * 24)); // gün'e çevir
}

const created = new Date('2025-06-01');
const today   = new Date();
console.log("Geçen gün:", daysBetween(created, today));

// ─── Token expiry kontrolü (30 dakika sonra geçersiz) ────────
const tokenCreated = new Date();
const expiry = new Date(tokenCreated.getTime() + 30 * 60 * 1000);
const isExpired = new Date() > expiry;
console.log("Token süresi dolmuş mu?", isExpired ? "Evet" : "Hayır");

// ─── Uyarı: getMonth() 0-indexed! ────────────────────────────
const d = new Date('2025-03-15');
console.log("Ay (yanlış):", d.getMonth());     // 2 (Mart = index 2!)
console.log("Ay (doğru):",  d.getMonth() + 1); // 3 ✅`,
          en: `// ─── Get current date ───────────────────────────────────────
const now = new Date();
console.log("Now:", now.toISOString());  // 2025-06-24T...

// ─── Calculate days between two dates ────────────────────────
function daysBetween(d1, d2) {
  const ms = Math.abs(d2 - d1);            // difference in milliseconds
  return Math.floor(ms / (1000 * 60 * 60 * 24)); // convert to days
}

const created = new Date('2025-06-01');
const today   = new Date();
console.log("Days elapsed:", daysBetween(created, today));

// ─── Token expiry check (invalid after 30 minutes) ───────────
const tokenCreated = new Date();
const expiry = new Date(tokenCreated.getTime() + 30 * 60 * 1000);
const isExpired = new Date() > expiry;
console.log("Token expired?", isExpired ? "Yes" : "No");

// ─── Warning: getMonth() is 0-indexed! ───────────────────────
const d = new Date('2025-03-15');
console.log("Month (wrong):", d.getMonth());     // 2 (March = index 2!)
console.log("Month (correct):",  d.getMonth() + 1); // 3 ✅`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Tarih manipülasyonunu deneyin!
const now = new Date();
console.log("Tarih:", now.toLocaleDateString('tr-TR'));
console.log("Saat:", now.toLocaleTimeString('tr-TR'));
console.log("Yıl:", now.getFullYear());
console.log("Ay (1-12):", now.getMonth() + 1);
console.log("Gün:", now.getDate());

// 7 gün sonrasını hesapla
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log("7 gün sonra:", nextWeek.toLocaleDateString('tr-TR'));`,
          en: `// Try date manipulation!
const now = new Date();
console.log("Date:", now.toLocaleDateString('en-US'));
console.log("Time:", now.toLocaleTimeString('en-US'));
console.log("Year:", now.getFullYear());
console.log("Month (1-12):", now.getMonth() + 1);
console.log("Day:", now.getDate());

// Calculate 7 days from now
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log("7 days later:", nextWeek.toLocaleDateString('en-US'));`
        }
      },
      jsDateMonthIndexFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te `new Date().getMonth()` Ocak (January) için ne döner?",
          en: "What does `new Date().getMonth()` return for January?"
        },
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "0" },
          { id: "c", text: "January" },
          { id: "d", text: "01" }
        ],
        correct: "b",
        explanation: {
          tr: "`getMonth()` 0'dan başlar (0-indexed): Ocak=0, Şubat=1, ..., Aralık=11. Gerçek ay numarasını almak için her zaman `getMonth() + 1` yapılmalıdır. Bu, Java'da `Calendar.JANUARY == 0` olan benzer tarihsel hatadır.",
          en: "`getMonth()` is zero-indexed: January=0, February=1, ..., December=11. Always add 1 to get the human-readable month number. This mirrors Java's `Calendar.JANUARY == 0` legacy quirk."
        },
        retryQuestion: {
          question: {
            tr: "İki Date nesnesi arasındaki milisaniye farkını bulmak için hangi yöntem kullanılır?",
            en: "How do you find the millisecond difference between two Date objects?"
          },
          options: [
            { id: "a", text: "date1.diff(date2)" },
            { id: "b", text: "date1 - date2" },
            { id: "c", text: "Date.compare(date1, date2)" },
            { id: "d", text: "date1.minus(date2)" }
          ],
          correct: "b",
          explanation: {
            tr: "JavaScript'te Date nesneleri karşılaştırıldığında veya aritmetik yapıldığında otomatik olarak milisaniyeye (.getTime()) dönüştürülür. Bu nedenle `date1 - date2` ifadesi doğrudan milisaniye farkını verir.",
            en: "JavaScript Date objects automatically coerce to their `.getTime()` millisecond value in arithmetic operations. Therefore `date1 - date2` directly returns the millisecond difference between the two dates."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "JavaScript'te `Date` nesnesi, çalışması zor bir analog saat gibidir: kendi zaman diliminizi dikkate almak yerine UTC'yi (Greenwich zamanı) temel alır ve yalnızca her ortamda güvenli bir şekilde doğru zamanı tutabilmek için bunu yapar. `new Date()` yeni bir saat oluşturmak, `.getTime()` milisaniye cinsinden pil ömrünü okumak gibi.",
          en: "JavaScript's `Date` object is like a tricky analog clock: instead of showing your local time by default, it keeps UTC (Greenwich time) internally and converts only when displaying. `new Date()` is like winding up a new clock, `.getTime()` reads the battery counter in milliseconds since 1970."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "`Date.now()` vs `new Date()`: `Date.now()` tek bir sayı döndürür (Unix timestamp) — LEGO inşaatının tam olarak başladığı zaman damgası. `new Date()` ise bu sayıyı gerçek bir saat nesnesine dönüştüren, farklı yüzleri (yıl, ay, gün, saat) olan bir LEGO saati.",
          en: "`Date.now()` vs `new Date()`: `Date.now()` returns one number (Unix timestamp) — like the exact millisecond your LEGO build started. `new Date()` converts that number into a real clock object with multiple faces (year, month, day, hour) you can read separately."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Tarih karşılaştırmaları, LEGO parçalarını etikete göre sıralamak gibidir: `dateA > dateB` yazmak mümkündür çünkü JavaScript tarih nesnelerini sayıya dönüştürerek karşılaştırır. Bu, test raporlarını zamana göre sıralamak veya bir testin belirli bir tarihten önce çalışıp çalışmadığını kontrol etmek için kullanılır.",
          en: "Date comparisons are like sorting LEGO pieces by their manufacturing timestamp: `dateA > dateB` works because JavaScript converts date objects to numbers for comparison. This is used to sort test reports chronologically or verify a test ran before a specific deadline."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden JavaScript tarihlerinde aylar 0'dan başlar (Ocak = 0)? Bu, C dilinin zamanından gelen tarihsel bir miras. `new Date(2024, 0, 15)` 15 Ocak 2024'tür. Bu sezgisizlik, `date-fns` veya `dayjs` gibi kütüphanelerin popülerleşmesinin temel nedenidir — bu kütüphaneler insan dostu bir API sunar.",
          en: "Why do JavaScript months start at 0 (January = 0)? This is a historical artifact inherited from the C language. `new Date(2024, 0, 15)` is January 15, 2024. This counterintuitive design is exactly why libraries like `date-fns` or `dayjs` became popular — they provide a human-friendly API."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden zaman dilimi farkları test ortamlarında hata yaratır? `new Date()` çalıştırıldığı makineye göre local zamanı döndürür. CI server UTC'de çalışırken geliştirici bilgisayarı UTC+3'te çalışıyorsa, tarih karşılaştırmaları farklı sonuçlar üretir. Her zaman UTC'de çalış: `.toISOString()`, `.getUTCHours()` vb. kullan.",
          en: "Why do timezone differences cause test failures across environments? `new Date()` returns local time based on where it runs. If CI runs in UTC but your machine is UTC+3, date comparisons produce different results. Always work in UTC: use `.toISOString()`, `.getUTCHours()`, etc. for timezone-safe test assertions."
        }
      },
      {
        type: "quiz",
        question: { tr: "`new Date(\"2024-01-15\").getMonth()` ne döndürür?", en: "What does `new Date(\"2024-01-15\").getMonth()` return?" },
        options: [
          { id: "a", text: { tr: "1 (Ocak için)", en: "1 (for January)" } },
          { id: "b", text: { tr: "0 (JavaScript'te aylar 0'dan başlar)", en: "0 (months start at 0 in JavaScript)" } },
          { id: "c", text: { tr: "15 (gün)", en: "15 (the day)" } },
          { id: "d", text: { tr: "2024 (yıl)", en: "2024 (the year)" } }
        ],
        correct: "b",
        explanation: { tr: "JavaScript'te `getMonth()` 0'dan başlar: Ocak = 0, Şubat = 1, ..., Aralık = 11. Bu tarihsel bir hata olarak kabul edilir. `date-fns` veya `dayjs` gibi modern kütüphaneler 1'den başlayan ay numaralarını kullanır.", en: "In JavaScript `getMonth()` is zero-indexed: January = 0, February = 1, ..., December = 11. This is widely considered a design error. Modern libraries like `date-fns` or `dayjs` use 1-based month numbers." },
        retryQuestion: {
          question: { tr: "İki tarih arasındaki gün farkını bulmak için en pratik yaklaşım hangisi?", en: "What is the most practical way to find the number of days between two dates?" },
          options: [
            { id: "a", text: { tr: "Her tarihi string'e çevirip karşılaştır", en: "Convert to strings and compare" } },
            { id: "b", text: { tr: "Her iki tarih için getTime() çağır, farkı al ve 86400000 (ms/gün) ile böl", en: "Subtract timestamps and divide by 86400000" } },
            { id: "c", text: { tr: "for döngüsüyle günleri say", en: "Count days with a for loop" } },
            { id: "d", text: { tr: "Mümkün değil", en: "Not possible" } }
          ],
          correct: "b",
          explanation: { tr: "`(dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)` formülü, iki tarih arasındaki gün sayısını verir. `getTime()` Unix timestamp (milisaniye) döndürür.", en: "`(dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)` gives the days between two dates. `getTime()` returns the Unix timestamp in milliseconds." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain the JavaScript Date object to a non-programmer as a calendar + stopwatch. Why does getMonth() start from 0, and how does this cause problems in practice?",
        promptTr: "🤖 Mini Kahraman Soruyor: JavaScript Date nesnesini hiç programlama bilmeyene bir takvim + kronometre olarak anlat. getMonth()'un neden 0'dan başladığını ve bunun pratikte nasıl sorun çıkardığını açıkla.",
        keywords: [
              ["tarih", "date"],
              ["saat", "time"],
              ["ay", "month"],
              ["yıl", "year"],
              ["sıfır", "zero"],
              "timestamp",
              ["karşılaştır", "compare"],
              ["fark", "difference"],
              ["sona", "expire"],
              ["geçerli", "valid"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 15 — RegExp (Regular Expressions)
  // ─────────────────────────────────────────────
  {
    title: { tr: "RegExp (Düzenli İfadeler)", en: "RegExp (Regular Expressions)" },
    blocks: [
      {
        type: "css-animation",
        kind: "regex",
        label: { tr: "Regex Pattern Tarama — Metin İçinde Kalıp Arama", en: "Regex Pattern Scan — Searching patterns in text" }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Regular Expression (Regex), metin içinde belirli kalıpları (pattern) aramak için kullanılan küçük ama güçlü bir dildir. Tıpkı Google'da arama yaparken joker karakter (*) kullanmak gibi ama çok daha güçlü. Test otomasyonunda e-posta formatını doğrularız, hata mesajlarından bilgi çıkarırız, URL kalıplarını kontrol ederiz. Java'da `Pattern.compile()` ve `Matcher` kullanırdık; JS'de ise `/pattern/flags` sözdizimi çok daha basittir. Peki bu kadar güçlü bir araç varken, neden deneyimli mühendisler regex'i kullanmadan önce iki kez düşünür? Çünkü regex'in gücü ile okunabilirliği ters orantılıdır: bugün 20 karakterde yazdığın e-posta doğrulaması, üç ay sonra sen dahil kimsenin okuyamadığı bir duvara dönüşür — ve regex yanlış yazıldığında hata VERMEZ, sadece yanlış eşleşir. Testte bunun anlamı şudur: `expect(text).toMatch(/hata/)` yazan bir assertion, sayfada 'hata' kelimesi geçen HERHANGİ bir metinde geçer; 'hata bulunamadı' cümlesinde bile. Java'da `Pattern.compile()`'ı bir kez derleyip sabit olarak tutma alışkanlığı burada da geçerlidir (JS'de her döngüde yeni regex literal'i oluşturmak performans kaybıdır). QA kuralı: regex'i doğrulama için değil, çıkarım (extraction) için tercih et — 'bu metin doğru mu' sorusunu net karşılaştırmayla, 'bu metnin içinden sipariş numarasını al' sorusunu regex ile çöz.",
          en: "Regular Expression (Regex) is a small but powerful language for searching specific patterns in text. Think of it as Google's wildcard (*) search on steroids. In automation, we validate email formats, extract data from error messages, and check URL patterns. In Java we used `Pattern.compile()` and `Matcher`; JS's `/pattern/flags` syntax is far simpler. So with a tool this powerful available, why do experienced engineers think twice before reaching for it? Because regex trades readability for power: the 20-character email validation you write today becomes a wall nobody — including you — can read three months from now, and a wrong regex raises no error, it simply matches the wrong things. In a test that means `expect(text).toMatch(/error/)` passes against ANY text containing the word \"error\" on the page — including the sentence \"no error found\". The Java habit of compiling a `Pattern` once and holding it as a constant applies here too (creating a fresh regex literal inside a loop costs you performance in JS). The QA rule: prefer regex for extraction, not validation — answer \"is this text correct?\" with an exact comparison, and \"pull the order number out of this text\" with a regex."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Pattern", en: "Pattern" },
          { tr: "Anlamı", en: "Meaning" },
          { tr: "Örnek", en: "Example" }
        ],
        rows: [
          [".", { tr: "Herhangi bir karakter (newline hariç)", en: "Any character except newline" }, `"a.c" → "abc", "a1c"`],
          ["*", { tr: "0 veya daha fazla tekrar", en: "0 or more repetitions" }, `"ab*c" → "ac", "abc", "abbc"`],
          ["+", { tr: "1 veya daha fazla tekrar", en: "1 or more repetitions" }, { tr: `"ab+c" → "abc", "abbc" (ac değil)`, en: `"ab+c" → "abc", "abbc" (not "ac")` }],
          ["?", { tr: "0 veya 1 kez (opsiyonel)", en: "0 or 1 time (optional)" }, `"colou?r" → "color", "colour"`],
          ["\\d", { tr: "Sayı [0-9]", en: "Digit [0-9]" }, `"\\d+" → "123", "42"`],
          ["\\w", { tr: "Harf, sayı, alt çizgi", en: "Word char (letter, digit, _)" }, `"\\w+" → "hello_123"`],
          ["\\s", { tr: "Boşluk karakteri", en: "Whitespace character" }, `"\\s+" → " ", "\\t", "\\n"`],
          ["^", { tr: "Satır başı", en: "Start of string" }, `"^Hello" → "Hello World" ✅`],
          ["$", { tr: "Satır sonu", en: "End of string" }, `"world$" → "Hello world" ✅`],
          ["[abc]", { tr: "a, b veya c karakterlerinden biri", en: "One of a, b, or c" }, `"[aeiou]" → sesli harfler`],
          ["{n,m}", { tr: "n ile m arasında tekrar", en: "Between n and m repetitions" }, `"\\d{3,5}" → "123", "12345"`],
          ["(group)", { tr: "Yakalama grubu", en: "Capturing group" }, `"(\\d+)-(\\d+)" → iki grup`]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "JS Regex Metodları — QA Örnekleri", en: "JS Regex Methods — QA Examples" },
        content: {
          tr: `// ─── 1. test() — Boolean kontrol ─────────────────────────────
// Java: Pattern.compile(re).matcher(str).matches()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com'));  // true
console.log(emailRegex.test('invalid-email'));      // false

// ─── 2. match() — Eşleşmeleri dizi olarak döner ───────────────
// Java: Matcher.group()
const text = 'Hata kodu: 404, yönlendirme: 301';
const codes = text.match(/\\d+/g); // 'g' flag: global, tümünü bul
console.log('Bulunan kodlar:', codes); // ['404', '301']

// ─── 3. replace() — Regex ile değiştirme ─────────────────────
// Java: str.replaceAll(regex, replacement)
const dirty = '  Merhaba   Dünya  ';
const clean = dirty.replace(/\\s+/g, ' ').trim();
console.log('Temiz:', clean); // 'Merhaba Dünya'

// ─── 4. QA — URL format doğrulama ────────────────────────────
const urlRegex = /^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+/;
console.log(urlRegex.test('https://learnqa.dev')); // true
console.log(urlRegex.test('ftp://invalid'));        // false`,
          en: `// ─── 1. test() — Boolean check ──────────────────────────────
// Java: Pattern.compile(re).matcher(str).matches()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('user@example.com'));  // true
console.log(emailRegex.test('invalid-email'));      // false

// ─── 2. match() — Returns matches as an array ─────────────────
// Java: Matcher.group()
const text = 'Error code: 404, redirect: 301';
const codes = text.match(/\\d+/g); // 'g' flag: global, find all
console.log('Found codes:', codes); // ['404', '301']

// ─── 3. replace() — Replace using regex ──────────────────────
// Java: str.replaceAll(regex, replacement)
const dirty = '  Hello   World  ';
const clean = dirty.replace(/\\s+/g, ' ').trim();
console.log('Clean:', clean); // 'Hello World'

// ─── 4. QA — URL format validation ──────────────────────────
const urlRegex = /^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+/;
console.log(urlRegex.test('https://learnqa.dev')); // true
console.log(urlRegex.test('ftp://invalid'));        // false`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Regex'i kendiniz deneyin!
const testString = "Test ID: ABC-123, Durum: PASSED, Süre: 4500ms";

// 1. Sayıları bul
const numbers = testString.match(/\\d+/g);
console.log("Sayılar:", numbers);

// 2. Büyük harf kelimeleri bul
const upperWords = testString.match(/[A-Z]{2,}/g);
console.log("Büyük kelimeler:", upperWords);

// 3. E-posta doğrulama
const email = "test@example.com";
const isValid = /^\\w+@\\w+\\.\\w+$/.test(email);
console.log("E-posta geçerli mi?", isValid);`,
          en: `// Try regex yourself!
const testString = "Test ID: ABC-123, Status: PASSED, Duration: 4500ms";

// 1. Find all numbers
const numbers = testString.match(/\\d+/g);
console.log("Numbers:", numbers);

// 2. Find uppercase words
const upperWords = testString.match(/[A-Z]{2,}/g);
console.log("Uppercase words:", upperWords);

// 3. Validate email
const email = "test@example.com";
const isValid = /^\\w+@\\w+\\.\\w+$/.test(email);
console.log("Email valid?", isValid);`
        }
      },
      jsRegexLastIndexFilm,
      {
        type: "quiz",
        question: {
          tr: "JavaScript'te bir string'in belirli bir regex kalıbıyla eşleşip eşleşmediğini kontrol etmek için hangi metod kullanılır?",
          en: "Which method checks if a string matches a given regex pattern in JavaScript?"
        },
        options: [
          { id: "a", text: "regex.match(string)" },
          { id: "b", text: "regex.test(string)" },
          { id: "c", text: "string.validate(regex)" },
          { id: "d", text: "regex.find(string)" }
        ],
        correct: "b",
        explanation: {
          tr: "`regex.test(string)` yöntemin adından da anlaşıldığı gibi kalıbın string'de bulunup bulunmadığını `true/false` döndürür. Java'da `Pattern.compile(re).matcher(str).find()` karşılığıdır. `string.match(regex)` ise eşleşmeleri dizi olarak döndürür.",
          en: "`regex.test(string)` returns a boolean indicating whether the pattern exists in the string. It is the equivalent of Java's `Pattern.compile(re).matcher(str).find()`. `string.match(regex)` returns an array of matches instead."
        },
        retryQuestion: {
          question: {
            tr: "Regex'te `g` flag'i ne anlama gelir?",
            en: "What does the `g` flag mean in a JavaScript regex?"
          },
          options: [
            { id: "a", text: { tr: "Büyük-küçük harf duyarsız eşleşme", en: "Case-insensitive matching" } },
            { id: "b", text: { tr: "Global: string'deki tüm eşleşmeleri bul (sadece ilkini değil)", en: "Global: find all matches in the string (not just the first)" } },
            { id: "c", text: { tr: "Greedy: mümkün olduğunca uzun eşleşme", en: "Greedy: match as long as possible" } },
            { id: "d", text: { tr: "Group: eşleşme grupları oluştur", en: "Group: create match groups" } }
          ],
          correct: "b",
          explanation: {
            tr: "`/pattern/g` — `g` (global) flag'i sayesinde regex tüm string boyunca arar ve tüm eşleşmeleri döndürür. Bu flag olmadan yalnızca ilk eşleşme bulunur. Otomasyon testlerinde bir sayfadaki tüm hata mesajlarını veya linkleri çekerken kritik öneme sahiptir.",
            en: "The `g` (global) flag makes regex search the entire string and return ALL matches. Without it, only the first match is found. This flag is critical when scraping all error messages or links from a page in automation."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "Regular Expression, bir kelime arama bulmacasındaki şablona benzer: harf, rakam ve özel karakterlerden oluşan bir desen (pattern) tanımlarsın, ve bu desen metindeki eşleşmeleri arar. `\\d{3}-\\d{4}` kalıbı \"3 rakam, tire, 4 rakam\" anlamına gelir — telefon numarası arar.",
          en: "A Regular Expression is like a word-search puzzle template: you define a pattern made of letters, digits, and special characters, and that pattern searches text for matches. The pattern `\\d{3}-\\d{4}` means \"3 digits, hyphen, 4 digits\" — it finds phone numbers."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Regex karakterleri, LEGO parça seçim kuralları gibidir: `\\d` \"herhangi bir rakam rengi\", `\\w` \"herhangi bir harf parçası\", `+` \"bir veya daha fazla\", `*` \"sıfır veya daha fazla\", `?` \"isteğe bağlı\". Bu kuralları birleştirerek çok güçlü eşleşme kalıpları oluşturulur.",
          en: "Regex characters are like LEGO piece selection rules: `\\d` means \"any digit-colored piece\", `\\w` means \"any letter piece\", `+` means \"one or more\", `*` means \"zero or more\", `?` means \"optional\". Combining these rules creates very powerful matching patterns."
        }
      },
      {
        type: "simple-box",
        emoji: "🧱",
        content: {
          tr: "Capturing groups `()`, LEGO parçalarını etiketlenmiş torbalara ayırmak gibidir: `/^(\\d{4})-(\\d{2})-(\\d{2})$/` ile \"2024-01-15\" tarihini eşleştirdiğinde, grup 1 yılı, grup 2 ayı, grup 3 günü ayrı torbalarda tutar — `match[1]`, `match[2]`, `match[3]` ile erişilir.",
          en: "Capturing groups `()` are like sorting LEGO pieces into labeled bags: matching `\"2024-01-15\"` with `/(\\d{4})-(\\d{2})-(\\d{2})/` puts the year in bag 1, month in bag 2, day in bag 3 — accessed via `match[1]`, `match[2]`, `match[3]`."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden test otomasyonunda Regex kullanılır? API yanıtlarındaki e-posta, URL ve UUID doğrulaması; log dosyalarından hata mesajı çekme; form validasyon kurallarını test etme; dinamik URL'lerdeki parametreleri çıkarma. Playwright'ta `expect(page).toHaveURL(/checkout/)` regex ile URL doğrulaması yapar.",
          en: "Why is Regex used in test automation? Validating emails, URLs, and UUIDs in API responses; extracting error messages from log files; testing form validation rules; capturing parameters from dynamic URLs. In Playwright, `expect(page).toHaveURL(/checkout/)` uses a regex to validate the current URL."
        }
      },
      {
        type: "simple-box",
        emoji: "🔍",
        content: {
          tr: "Neden Regex'te `g` (global) flag önemli? `g` olmadan `str.match(pattern)` yalnızca ilk eşleşmeyi döndürür. `g` ile tüm eşleşmeler döner. `str.replace(pattern, replacement)` de `g` olmadan sadece ilk eşleşmeyi değiştirir. Test verisi manipülasyonunda `g` flag'ini unutmak sık yapılan bir hatadır.",
          en: "Why does the `g` (global) flag matter in Regex? Without `g`, `str.match(pattern)` returns only the first match. With `g`, all matches are returned. Similarly, `str.replace(pattern, replacement)` without `g` only replaces the first occurrence. Forgetting the `g` flag during test data manipulation is a very common mistake."
        }
      },
      {
        type: "quiz",
        question: { tr: "`/^test@[a-z]+\\.com$/i` regex'i hangi string'e eşleşir?", en: "Which string matches the regex `/^test@[a-z]+\\.com$/i`?" },
        options: [
          { id: "a", text: { tr: "\"test@example.com\" — tam eşleşme", en: "\"test@example.com\" — exact match" } },
          { id: "b", text: { tr: "\"TEST@EXAMPLE.COM\" — i flag küçük/büyük harf farkını görmezden gelir", en: "\"TEST@EXAMPLE.COM\" — i flag ignores case" } },
          { id: "c", text: { tr: "Her ikisi de", en: "Both of them" } },
          { id: "d", text: { tr: "Hiçbiri", en: "Neither" } }
        ],
        correct: "c",
        explanation: { tr: "`i` flag, büyük/küçük harf duyarsız (case-insensitive) eşleşme sağlar. `^` başlangıç, `$` bitiş bağlayıcısı. `[a-z]+` bir veya daha fazla harf. `\\.` gerçek nokta karakteri (kaçırılmış). Her ikisi de eşleşir.", en: "The `i` flag makes matching case-insensitive. `^` anchors the start, `$` the end. `[a-z]+` matches one or more letters. `\\.` is an escaped literal dot. Both strings match the pattern." },
        retryQuestion: {
          question: { tr: "`str.replace(/foo/g, \"bar\")` ile `str.replace(/foo/, \"bar\")` arasındaki fark nedir?", en: "What is the difference between `str.replace(/foo/g, \"bar\")` and `str.replace(/foo/, \"bar\")`?" },
          options: [
            { id: "a", text: { tr: "Hiçbir fark yoktur", en: "No difference" } },
            { id: "b", text: { tr: "g flag tüm eşleşmeleri değiştirir; g olmadan yalnızca ilki değişir", en: "g flag replaces ALL; without g only the first is replaced" } },
            { id: "c", text: { tr: "g flag regex'i daha hızlı yapar", en: "g flag makes regex faster" } },
            { id: "d", text: { tr: "g flag büyük/küçük harf duyarsız yapar", en: "g flag makes it case-insensitive" } }
          ],
          correct: "b",
          explanation: { tr: "`g` (global) flag olmadan `replace()` yalnızca ilk eşleşmeyi değiştirir. `g` ile tüm eşleşmeler değiştirilir. Çok sayıda yer değiştirme için `g` zorunludur.", en: "Without the `g` (global) flag, `replace()` changes only the first occurrence. With `g`, every occurrence is replaced. `g` is mandatory for bulk replacements." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Regular Expressions like a detective searching text or a sieve filtering it. Why do we use them in automation tests?",
        promptTr: "🤖 Mini Kahraman Soruyor: Regular Expression'ı (Regex) bir metin içinde arama yapan bir dedektif veya bir metin elekten geçiren süzgeç olarak anlat. Otomasyon testlerinde neden kullanırız?",
        keywords: [
              ["kalıp", "pattern"],
              ["arama", "search"],
              ["doğrulama", "validate"],
              ["e-posta", "email"],
              ["bul", "find"],
              ["eşleş", "match"],
              "regex",
              "format",
              ["kontrol", "check"],
              ["çıkar", "extract"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 16 — Sets & Maps (ES6)
  // ─────────────────────────────────────────────
  {
    title: { tr: "Set & Map (ES6)", en: "Set & Map (ES6)" },
    blocks: [
      {
        type: "css-animation",
        kind: "setmap",
        label: { tr: "Array → Set Tekilleştirme + Map Anahtar-Değer Haritası", en: "Array → Set deduplication + Map key-value mapping" }
      },
      {
        type: "simple-box",
        emoji: "🗂️",
        content: {
          tr: "ES6 ile gelen Set ve Map yapıları, düz dizilerin ve nesnelerin yetersiz kaldığı durumlarda devreye girer. Set, benzersiz (unique) değerlerin koleksiyonudur — tekrar eleman kabul etmez. Map ise anahtarların herhangi bir tip olabildiği (sadece string değil) gelişmiş bir anahtar-değer deposudur. Java'daki HashSet ve HashMap'in doğrudan karşılığıdır. Set'i bir davetli listesindeki isim etiketleri gibi düşün: aynı ismi ikinci kez yazmaya çalıştığında liste onu sessizce yutar; Map ise vestiyer fişidir — verdiğin fiş ne olursa olsun (sayı, nesne, hatta bir fonksiyon) karşılığındaki paltoyu getirir. Peki düz bir dizi ve düz bir nesne varken bu iki yapıya neden ihtiyaç var? İki somut sebep: birincisi, düz bir nesnede anahtarlar HER ZAMAN string'e çevrilir — `obj[1]` ile `obj['1']` aynı kutuyu gösterir; ikincisi, bir dizide tekrar aramak `includes()` ile her seferinde baştan tarama demektir, `Set.has()` ise sabit sürede döner. Java'da `HashSet` ile `ArrayList.contains()` arasında öğrendiğin takas burada birebir aynıdır. QA açısından en pratik kullanım tekrar tespitidir: bir listedeki sipariş numaralarını Set'e atıp boyutunu orijinal uzunlukla karşılaştırmak, 'aynı kayıt iki kez oluşturuluyor mu' sorusunu tek satırda cevaplar — ki bu, ödeme ve kayıt akışlarında en pahalı bug sınıflarından biridir.",
          en: "ES6 Set and Map fill the gaps where plain arrays and objects fall short. Set is a collection of unique values — it never accepts duplicates. Map is an advanced key-value store where keys can be any type (not just strings). They are the direct equivalents of Java's HashSet and HashMap. Think of a Set as the name badges at an event: try to write the same name twice and the list quietly swallows it. A Map is the cloakroom ticket — whatever you hand over (a number, an object, even a function), you get the matching coat back. So why do we need these two when plain arrays and plain objects already exist? Two concrete reasons: first, a plain object ALWAYS coerces its keys to strings — `obj[1]` and `obj['1']` point at the same box; second, searching an array with `includes()` rescans from the start every time, whereas `Set.has()` returns in constant time. The trade-off you learned between `HashSet` and `ArrayList.contains()` in Java transfers exactly. For QA the most practical use is duplicate detection: dropping a list of order numbers into a Set and comparing its size against the original length answers \"are we creating the same record twice?\" in a single line — one of the most expensive bug classes in payment and signup flows."
        }
      },
      {
        type: "table",
        headers: [
          { tr: "Yapı", en: "Structure" },
          { tr: "Ne Saklar?", en: "What it stores" },
          { tr: "Tekrar İzin Verir mi?", en: "Allows Duplicates?" },
          { tr: "Java Karşılığı", en: "Java Equivalent" },
          { tr: "QA Kullanımı", en: "QA Usage" }
        ],
        rows: [
          ["Set",    { tr: "Benzersiz değerler", en: "Unique values" },         { tr: "❌ Hayır", en: "❌ No" },  "HashSet<T>",    { tr: "Tekrar eden hataları tekilleştir", en: "Deduplicate repeated errors" }],
          ["Map",    { tr: "Anahtar → Değer çiftleri", en: "Key → Value pairs" }, { tr: "Anahtar başına 1 değer", en: "1 value per key" }, "HashMap<K,V>", { tr: "URL → response kodu eşlemesi", en: "URL → response code mapping" }],
          ["Array",  { tr: "Sıralı değerler (tekrar olabilir)", en: "Ordered values (duplicates allowed)" }, { tr: "✅ Evet", en: "✅ Yes" }, "ArrayList<T>", { tr: "Test adımları listesi", en: "Test step list" }],
          ["Object", { tr: "String anahtar → değer", en: "String key → value" }, { tr: "Anahtar başına 1 değer", en: "1 value per key" }, "HashMap<String,V>", { tr: "Config nesnesi", en: "Config object" }]
        ]
      },
      {
        type: "code",
        language: "javascript",
        label: { tr: "Set & Map — QA Otomasyon Örnekleri", en: "Set & Map — QA Automation Examples" },
        content: {
          tr: `// ─── SET ─────────────────────────────────────────────────────
// Java'da: Set<String> set = new HashSet<>();
const errorSet = new Set();
errorSet.add("ElementNotFound");
errorSet.add("TimeoutError");
errorSet.add("ElementNotFound"); // Tekrar — eklenmez!

console.log("Hata sayısı:", errorSet.size); // 2 (tekrar yok)
console.log("Set içerir mi?", errorSet.has("TimeoutError")); // true

// Diziyi tekilleştirme (Set'in en yaygın kullanımı)
const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];
const uniqueLogs = [...new Set(rawLogs)];
console.log("Tekil loglar:", uniqueLogs); // ['INFO','ERROR','WARN']

// ─── MAP ─────────────────────────────────────────────────────
// Java'da: Map<String,Integer> map = new HashMap<>();
const statusMap = new Map();
statusMap.set('/api/login',  200);
statusMap.set('/api/logout', 200);
statusMap.set('/api/admin',  403);

console.log("Login status:", statusMap.get('/api/login')); // 200
console.log("Toplam route:", statusMap.size);              // 3

// Map üzerinde döngü (Java: entrySet().forEach())
for (const [url, status] of statusMap) {
  const icon = status === 200 ? '✅' : '❌';
  console.log(\`\${icon} \${url} → \${status}\`);
}`,
          en: `// ─── SET ─────────────────────────────────────────────────────
// Java equivalent: Set<String> set = new HashSet<>();
const errorSet = new Set();
errorSet.add("ElementNotFound");
errorSet.add("TimeoutError");
errorSet.add("ElementNotFound"); // Duplicate — ignored!

console.log("Error count:", errorSet.size); // 2 (no duplicates)
console.log("Set contains?", errorSet.has("TimeoutError")); // true

// Deduplicate an array (most common Set use case)
const rawLogs = ["INFO", "ERROR", "INFO", "WARN", "ERROR"];
const uniqueLogs = [...new Set(rawLogs)];
console.log("Unique logs:", uniqueLogs); // ['INFO','ERROR','WARN']

// ─── MAP ─────────────────────────────────────────────────────
// Java equivalent: Map<String,Integer> map = new HashMap<>();
const statusMap = new Map();
statusMap.set('/api/login',  200);
statusMap.set('/api/logout', 200);
statusMap.set('/api/admin',  403);

console.log("Login status:", statusMap.get('/api/login')); // 200
console.log("Total routes:", statusMap.size);              // 3

// Iterate over Map (Java: entrySet().forEach())
for (const [url, status] of statusMap) {
  const icon = status === 200 ? '✅' : '❌';
  console.log(\`\${icon} \${url} → \${status}\`);
}`
        }
      },
      {
        type: "editor",
        lang: "javascript",
        height: "180px",
        defaultCode: {
          tr: `// Set ve Map'i kendiniz deneyin!
// 1. Set ile tekrar eden test ID'lerini tekilleştir
const testIds = ["TC-001", "TC-002", "TC-001", "TC-003", "TC-002"];
const uniqueIds = new Set(testIds);
console.log("Toplam:", testIds.length, "→ Tekil:", uniqueIds.size);

// 2. Map ile browser → driver eşlemesi
const drivers = new Map([
  ["chrome", "ChromeDriver"],
  ["firefox", "GeckoDriver"],
  ["safari", "SafariDriver"]
]);

drivers.forEach((driver, browser) => {
  console.log(browser, "→", driver);
});`,
          en: `// Try Set and Map yourself!
// 1. Deduplicate repeated test IDs using Set
const testIds = ["TC-001", "TC-002", "TC-001", "TC-003", "TC-002"];
const uniqueIds = new Set(testIds);
console.log("Total:", testIds.length, "→ Unique:", uniqueIds.size);

// 2. Map browser → driver mapping
const drivers = new Map([
  ["chrome", "ChromeDriver"],
  ["firefox", "GeckoDriver"],
  ["safari", "SafariDriver"]
]);

drivers.forEach((driver, browser) => {
  console.log(browser, "→", driver);
});`
        }
      },
      jsSetMapFlowFilm,
      {
        type: "quiz",
        question: {
          tr: "Bir dizideki tekrar eden değerleri ortadan kaldırıp benzersiz değerler listesi elde etmek için en kısa JavaScript yöntemi hangisidir?",
          en: "What is the shortest JavaScript method to remove duplicates from an array and get unique values?"
        },
        options: [
          { id: "a", text: "array.unique()" },
          { id: "b", text: "[...new Set(array)]" },
          { id: "c", text: "array.dedupe()" },
          { id: "d", text: "Array.unique(array)" }
        ],
        correct: "b",
        explanation: {
          tr: "`new Set(array)` dizi elemanlarından benzersiz bir Set oluşturur, spread operator `[...]` bu Set'i geri diziye çevirir. Java'da aynı şeyi `new HashSet<>(list)` → `new ArrayList<>(set)` ile yapardık.",
          en: "`new Set(array)` creates a unique Set from array elements, and the spread operator `[...]` converts it back to an array. The Java equivalent is `new HashSet<>(list)` → `new ArrayList<>(set)`."
        },
        retryQuestion: {
          question: {
            tr: "JavaScript Map ve Object arasındaki en önemli fark nedir?",
            en: "What is the main difference between a JavaScript Map and a plain Object?"
          },
          options: [
            { id: "a", text: { tr: "Map'ler daha yavaştır", en: "Maps are slower" } },
            { id: "b", text: { tr: "Map'te anahtarlar herhangi bir tip olabilir (number, object vb.); Object'te anahtarlar sadece string veya Symbol olabilir", en: "Map keys can be any type (number, object, etc.); Object keys are always strings or Symbols" } },
            { id: "c", text: { tr: "Map JSON'a dönüştürülemez", en: "Maps cannot be converted to JSON" } },
            { id: "d", text: { tr: "Hiçbir fark yok", en: "No difference" } }
          ],
          correct: "b",
          explanation: {
            tr: "Map'in en büyük avantajı, anahtar tipinde esnekliktir: sayılar, nesneler veya fonksiyonlar bile anahtar olabilir. Object'te tüm anahtarlar string'e çevrilir. Ayrıca Map'in `.size` property'si vardır, Object'in yoktur.",
            en: "Map's biggest advantage is key type flexibility: numbers, objects, even functions can be keys. Object always converts keys to strings. Map also has a built-in `.size` property, while Object requires `Object.keys(obj).length`."
          }
        }
      },
      {
        type: "simple-box",
        emoji: "💡",
        content: {
          tr: "`Set`, parmak izi koleksiyonuna benzer: her parmak izi benzersizdir, aynı kişinin izini iki kez ekleyemezsin. `Map` ise bir kimlik kartı cüzdanına benzer: her kart farklı bir kişiye aittir (`key`) ve kart üzerinde o kişinin bilgileri (`value`) bulunur. Nesne (`Object`) de benzer çalışır ama key'ler sadece string veya symbol olabilir; `Map`'te key herhangi bir tipte olabilir.",
          en: "`Set` is like a fingerprint collection: each fingerprint is unique, you cannot add the same person's print twice. `Map` is like a wallet of ID cards: each card belongs to a different person (the `key`) and holds that person's information (the `value`). Objects work similarly but keys must be strings or symbols; `Map` keys can be any type."
        }
      },
      {
        type: "quiz",
        question: { tr: "Aşağıdakilerden hangisi `Set`'in temel özelliğidir?", en: "Which is a fundamental property of a `Set`?" },
        options: [
          { id: "a", text: { tr: "Elemanlar index ile erişilir", en: "Elements are accessed by index" } },
          { id: "b", text: { tr: "Yalnızca string değerleri tutabilir", en: "Can only hold string values" } },
          { id: "c", text: { tr: "Her değer yalnızca bir kez tutulur — tekrar ekleme sessizce görmezden gelinir", en: "Each value is stored only once — re-adding is silently ignored" } },
          { id: "d", text: { tr: "Sıralı değerleri depolar", en: "Stores values in sorted order" } }
        ],
        correct: "c",
        explanation: { tr: "`Set`'in temel özelliği benzersizliktir: aynı değeri birden fazla kez ekleyebilirsin ama Set yalnızca bir kez depolar. Bu, dizi `[1,1,2,3,3]`'teki tekrarları `[...new Set([1,1,2,3,3])]` → `[1,2,3]` ile kaldırmak için mükemmeldir.", en: "The fundamental property of `Set` is uniqueness: you can add the same value multiple times but Set stores it only once. This makes it perfect for deduplication: `[...new Set([1,1,2,3,3])]` → `[1,2,3]`." },
        retryQuestion: {
          question: { tr: "`Map` ile nesne (`{}`) arasındaki temel fark nedir?", en: "What is the key difference between `Map` and a plain object (`{}`)?" },
          options: [
            { id: "a", text: { tr: "Map daha yavaştır", en: "Map is slower" } },
            { id: "b", text: { tr: "Map'te key herhangi bir tip olabilir; nesnede yalnızca string/symbol", en: "Map keys can be any type; object keys are only string/symbol" } },
            { id: "c", text: { tr: "Map yalnızca sayısal değerler tutar", en: "Map only holds numeric values" } },
            { id: "d", text: { tr: "Fark yoktur", en: "No difference" } }
          ],
          correct: "b",
          explanation: { tr: "`Map`'te key olarak nesne, fonksiyon, sayı gibi her türlü veri kullanılabilir. Plain nesne `{}`'de key'ler otomatik olarak string'e dönüştürülür. Karmaşık key'ler gerektiğinde `Map` tercih edilir.", en: "In `Map`, any value can be a key — objects, functions, numbers. In a plain object `{}`, keys are automatically converted to strings. Use `Map` when you need complex or non-string keys." }
        }
      },
      {
        type: "feynman-checkpoint",
        prompt: "🤖 Little Hero asks: Explain Set and Map to someone used to plain arrays and objects. Why were they designed as separate data structures? When would you pick Set vs Map?",
        promptTr: "🤖 Mini Kahraman Soruyor: Set ve Map'i düz dizi ve nesne kullanmaya alışmış birine anlat. Neden ayrı veri yapıları olarak tasarlandılar? Hangi durumda Set, hangi durumda Map seçersin?",
        keywords: [
              ["benzersiz", "unique"],
              ["tekrar", "duplicate"],
              ["anahtar", "key"],
              "map",
              "set",
              "hashset",
              "hashmap",
              ["değer", "value"],
              ["tip", "type"],
              ["koleksiyon", "collection"]
        ],
        minScore: 5
      }
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 17 — Interleaving Challenges (Mini Games)
  // ─────────────────────────────────────────────
  {
    title: { tr: "Karma Pratik Oyunlar", en: "Interleaving Games" },
    blocks: [
      {
        type: "simple-box",
        emoji: "🎮",
        content: {
          tr: "Beyin vites değiştirdiğinde (interleaving effect) öğrenme katlanarak artar! Şimdi iki farklı mini oyun arasında geçiş yaparak hem array metotlarımızı hem de asenkron Promises yeteneklerimizi test edeceğiz. Başarılı hamlelerde legolar tık diye oturacak! Peki neden aynı konuyu arka arkaya tekrarlamak yerine iki konu arasında gidip gelmek daha çok işe yarıyor — tekrar öğrenmenin temeli değil mi? Çünkü aynı konuyu üst üste çalışırken beynin bir sonraki adımı hatırlamaz, sadece devam ettirir; asıl öğrenme, hangi aracı kullanacağına KARAR verdiğin anda gerçekleşir. Konular arasında geçiş yaptığında her soruda o kararı yeniden vermek zorunda kalırsın. Java'da bunu zaten yaşadın: `HashMap` derslerini peş peşe çözerken kolay gelen sorular, karışık bir sınavda `List` mi `Map` mi kullanacağını seçmen gerektiğinde birden zorlaşır. QA işinde bu beceri doğrudan işe dönüşür — sahada sorunlar sana etiketli gelmez; 'bu bir timing sorunu mu, locator sorunu mu, yoksa veri sorunu mu' kararını her seferinde sen verirsin.",
          en: "Learning skyrockets when the brain shifts gears (interleaving effect)! We will play two distinct mini-games to test both array methods and asynchronous Promise behaviors. Correct blocks will click into place! But why does bouncing between two topics beat drilling the same one repeatedly — isn't repetition the foundation of learning? Because when you drill one topic back to back, your brain never recalls the next step, it merely continues; the actual learning happens at the moment you DECIDE which tool to reach for. Switching between topics forces you to make that decision fresh on every question. You have felt this in Java already: `HashMap` problems feel easy when solved in a row, then suddenly get hard on a mixed exam where you must first choose between a `List` and a `Map`. In QA work that skill converts directly — problems in the field do not arrive labelled; you are the one deciding, every time, whether this is a timing issue, a locator issue, or a data issue."
        }
      },
      jsInterleavePracticeFilm,
      jsInterleavePracticeSteps,
      {
        type: "js-interleaving-games"
      },
      jsInterleavePracticeLab
    ]
  },

  // ─────────────────────────────────────────────
  // SECTION 18 — 50 Interview Questions
  // ─────────────────────────────────────────────
  {
    title: { tr: "Mülakat Soruları", en: "Interview Q&A" },
    blocks: [
      jsInterviewRecapFilm,
      jsInterviewMechanismSteps,
      jsInterviewMechanismLab,
      {
        type: "interview-questions",
          relatedTopicId: 'javascript',
        topic: "JavaScript",
        questions: [
          // ==========================================
          // BASIC (15 questions)
          // ==========================================
          {
            level: "basic",
            q: { tr: "var, let ve const arasındaki farklar nelerdir? Hangisini ne zaman tercih etmeliyiz?", en: "What is the difference between var, let, and const? When should you use which?" },
            a: {
              tr: "`var` fonksiyon kapsamlıdır (function scope) ve yukarı çekildiğinde (hoisting) `undefined` değeri alır. `let` ve `const` ise blok kapsamlıdır (block scope) ve tanımlanmadan önce erişilmeye çalışıldığında hata verir. `const` tanımlandıktan sonra yeniden atanamaz (read-only), `let` ise yeniden atanabilir. Modern JavaScript'te `var` kullanımı sızıntılara yol açtığı için önerilmez; varsayılan olarak `const`, değeri değişecekse `let` kullanılmalıdır.",
              en: "`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and stay in the Temporal Dead Zone (TDZ) before initialization. `const` cannot be reassigned after declaration, while `let` allows reassignment. In modern JS, `var` is avoided to prevent scoping bugs; prefer `const` by default, and use `let` only when you expect variable updates."
            },
            analogy: {
              tr: "Java'da her değişken blok kapsamlıdır `{}`. JavaScript'teki `let` ve `const` Java'daki değişkenler gibidir; `const` Java'daki `final` anahtar kelimesine denk gelir. `var` ise Java'da bulunmayan, scope sınırlarını aşabilen delikli bir sepete benzer.",
              en: "In Java, all variables are block-scoped `{}`. JavaScript's `let` and `const` behave like Java variables; `const` is the equivalent of Java's `final` keyword. `var` is like a leaky basket that ignores block boundaries, which doesn't exist in Java."
            },
            keyPoints: [
              { tr: "var: Function scope, hoisting ile undefined döner", en: "var: Function-scoped, hoisted as undefined" },
              { tr: "let/const: Block scope, Temporal Dead Zone koruması", en: "let/const: Block-scoped, Temporal Dead Zone protected" },
              { tr: "const: Yeniden atama yapılamaz (Java final)", en: "const: Cannot be reassigned (Java's final equivalent)" }
            ],
            tip: {
              tr: "Mülakatta şöyle deyin: 'Projelerimde scope sızıntılarını ve beklenmedik hataları engellemek için kod kalitemde var kullanımını tamamen yasaklarım. Değişkenleri varsayılan olarak const ile tanımlar, sadece değer güncellemesi gerekiyorsa let kullanırım.'",
              en: "Say in interview: 'To prevent scope leaks and side-effects, I ban var in my code styles. I declare variables with const by default and use let only when reassignment is explicitly needed.'"
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te 'hoisting' (yukarı çekme) nedir? Kodun çalışmasını nasıl etkiler?", en: "What is hoisting in JavaScript? How does it affect execution?" },
            a: {
              tr: "Hoisting, JavaScript motorunun kod yürütülmeden önce değişken ve fonksiyon bildirimlerini bulundukları kapsamın (scope) en tepesine taşıması davranışıdır. `var` ile tanımlanan değişkenler yukarı çekildiğinde bellek ayrılır ama değer atanmadığı için `undefined` döner. Fonksiyon bildirimleri (function declarations) ise gövdesiyle birlikte tamamen yukarı çekilir ve tanımlandıkları satırdan önce çağrılabilirler.",
              en: "Hoisting is the behavior where the JS engine moves variable and function declarations to the top of their enclosing scope during the compilation phase. Variables declared with `var` are hoisted with a value of `undefined`. Function declarations are hoisted completely with their bodies, allowing them to be invoked before they appear in the source code."
            },
            analogy: {
              tr: "Java'da bir değişkeni veya metodu tanımlamadan önce çağıramazsınız; derleyici anında hata verir. JS'teki hoisting davranışı Java geliştiricileri için kafa karıştırıcıdır çünkü JS tanımlanmamış gibi duran kodu hata vermeden çalıştırabilir.",
              en: "In Java, you cannot reference a variable before its declaration; the compiler throws a compile-time error. JS hoisting can surprise Java devs, as it allows referencing variables before they are declared in the code sequence without compile errors."
            },
            keyPoints: [
              { tr: "Hoisting derleme aşamasında bildirimlerin en tepeye taşınmasıdır", en: "Hoisting moves declarations to the top during compilation" },
              { tr: "var ile undefined döner; let/const ise TDZ hatası fırlatır", en: "var returns undefined; let/const throw TDZ errors" },
              { tr: "Function declaration gövdesiyle birlikte çekilir", en: "Function declarations hoist fully with their bodies" }
            ],
            tip: {
              tr: "Hoisting'in pratik etkisini göstermek için mülakatta fonksiyon bildirimleri ile fonksiyon ifadeleri (function expressions) arasındaki hoisting farkını vurgulayın.",
              en: "Highlight the hoisting difference between function declarations and function expressions to impress interviewers."
            }
          },
          {
            level: "basic",
            q: { tr: "`==` ile `===` arasındaki fark nedir? Otomasyon testlerinde hangisini kullanmalıyız?", en: "What is the difference between `==` and `===`? Which should we use in automation?" },
            a: {
              tr: "`==` (loose equality) karşılaştırma yaparken tipleri otomatik olarak birbirine dönüştürmeye çalışır (type coercion). Örneğin, `5 == '5'` true döndürür. `===` (strict equality) ise hem tiplerin hem de değerlerin birebir eşit olmasını şart koşar; tip dönüşümü yapmaz, bu yüzden `5 === '5'` false döner. Test otomasyonunda beklenmedik tip dönüşümü kaynaklı gizli bug'ları önlemek adına her zaman `===` kullanılmalıdır.",
              en: "`==` (loose equality) performs type coercion, converting operand types before comparison (e.g., `5 == '5'` is true). `===` (strict equality) compares both value and type without coercion, returning false for `5 === '5'`. In automation tests, you should always use `===` to prevent hidden bugs caused by implicit type conversions."
            },
            analogy: {
              tr: "Java'da primitive tipler `==` ile karşılaştırılırken nesneler `.equals()` ile karşılaştırılır ve tipler sıkı denetlenir. JS'teki `===` Java'daki tip duyarlı sıkı kontrole benzer; `==` ise Java'da olmayan esnek bir dönüştürücüdür.",
              en: "In Java, primitives are compared with `==` and objects with `.equals()`, enforcing strict types. JS's `===` matches Java's strict, type-safe comparison, whereas `==` acts as a loose converter that has no equivalent in Java."
            },
            keyPoints: [
              { tr: "== tipleri otomatik dönüştürür (type coercion)", en: "== performs implicit type coercion" },
              { tr: "=== hem değeri hem de tipi sıkı kontrol eder", en: "=== checks both value and type strictly" },
              { tr: "Otomasyon assertions adımında her zaman === tercih edilir", en: "Always prefer === in automation assertions" }
            ],
            tip: {
              tr: "Mülakatta `[] == false` veya `' \t\r\n' == 0` gibi karmaşık 'loose equality' örneklerinin kafa karıştırıcı sonuçlar verdiğini belirterek neden sıkı eşitliği (===) tercih ettiğinizi açıklayın.",
              en: "Explain that loose equality leads to confusing edge cases (like `[] == false` returning true), which is why strict equality is the standard for reliable tests."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki veri tipleri (data types) nelerdir?", en: "What are the data types in JavaScript?" },
            a: {
              tr: "JavaScript veri tipleri ikiye ayrılır: 1. Primitive Tipler: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol` ve `BigInt`. 2. Reference Tipler (Objects): Nesneler (`Object`), Diziler (`Array`) ve Fonksiyonlar (`Function`). Primitive değerler bellekte (Stack) doğrudan değerleriyle saklanırken, Reference tipler bellekte (Heap) bir referans adresiyle saklanır.",
              en: "JavaScript types are categorized into: 1. Primitive Types: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, and `BigInt`. 2. Reference Types (Objects): `Object`, `Array`, and `Function`. Primitive types are stored directly in memory (Stack), whereas Reference types store a pointer address pointing to an object in the Heap."
            },
            analogy: {
              tr: "Java'da primitive tipler (int, boolean) ile Object sarmalayıcıları (Integer, String) arasındaki stack/heap ayrımı JavaScript ile hemen hemen aynıdır. Ancak JS'te `undefined` adında, Java'da karşılığı olmayan özel bir primitive tip bulunur.",
              en: "Java's split between primitive values (int, boolean) and reference types (Integer, String) on the stack and heap is very similar to JS. However, JS features a unique primitive type called `undefined` which does not exist in Java."
            },
            keyPoints: [
              { tr: "Primitive tipler (String, Number, Boolean, Null, Undefined vb.)", en: "Primitive types (String, Number, Boolean, Null, Undefined, etc.)" },
              { tr: "Reference tipler (Objects, Arrays, Functions)", en: "Reference types (Objects, Arrays, Functions)" },
              { tr: "Primitive değerler değiştirilemez (immutable) özelliktedir", en: "Primitive values are immutable" }
            ],
            tip: {
              tr: "`typeof null` ifadesinin tarihsel bir hata nedeniyle `'object'` döndürdüğünü mülakatta ek bilgi olarak söylemek derin bir JS bilgisine sahip olduğunuzu gösterir.",
              en: "Mentioning that `typeof null` returns `'object'` due to a legacy bug in the early JS engine is a great way to showcase deep language knowledge."
            }
          },
          {
            level: "basic",
            q: { tr: "null ve undefined arasındaki temel fark nedir?", en: "What is the difference between null and undefined?" },
            a: {
              tr: "`undefined`, bir değişkenin tanımlandığını ama henüz bir değer atanmadığını (değersizlik) belirtir. `null` ise değişkenin kasıtlı olarak boş veya değerinin olmadığını (boş değer) ifade etmek için atanır. `typeof undefined` ifadesi `'undefined'` dönerken, `typeof null` tarihsel nedenlerle `'object'` döndürür.",
              en: "`undefined` means a variable has been declared but has not yet been assigned a value. `null` is an assignment value that represents the intentional absence of any object value. `typeof undefined` is `'undefined'`, while `typeof null` returns `'object'` due to legacy reasons."
            },
            analogy: {
              tr: "Java'da başlatılmamış nesne referansları `null` olur. JavaScript'teki `null` Java'daki `null` ile aynı anlamdadır. Ancak Java'da `undefined` kavramı yoktur; atanmamış primitive değişkenler varsayılan değer alır, nesneler ise null olur.",
              en: "In Java, uninitialized object references evaluate to `null`. JavaScript's `null` behaves exactly like Java's `null`. However, Java has no concept of `undefined`; primitive variables get default values and objects default to null."
            },
            keyPoints: [
              { tr: "undefined: Değişken var ama henüz değer atanmamış", en: "undefined: Variable declared but no value assigned yet" },
              { tr: "null: Kasıtlı olarak boş değer ataması yapılmış", en: "null: Intentional assignment representing no value" },
              { tr: "null == undefined (true) ama null === undefined (false)", en: "null == undefined is true, but null === undefined is false" }
            ],
            tip: {
              tr: "Otomasyon testlerinizde bir API response veya element değerinin bulunmadığını doğrulamak için hem null hem de undefined durumunu kontrol eden gevşek eşitlik (`x == null`) kontrolü yapabilirsiniz.",
              en: "In test assertions, checking if a value is loosely equal to null (`x == null`) is a handy way to check for both null and undefined in one step."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki truthy ve falsy kavramları nedir? Hangi değerler falsy kabul edilir?", en: "What are truthy and falsy values in JavaScript? Which values are falsy?" },
            a: {
              tr: "JavaScript'te bir koşul ifadesinde (`if`) Boolean olmayan değerler otomatik olarak Boolean tipine dönüştürülür. Falsy değerler dışındaki tüm değerler truthy (doğru kabul edilen) olarak yorumlanır. Toplam 6 temel falsy (yanlış kabul edilen) değer vardır: `false`, `0` (ve `-0`, `0n`), `''` (boş string), `null`, `undefined` ve `NaN`. Bunların dışındaki nesneler, diziler (`[]`) ve dolu stringler her zaman truthy'dir.",
              en: "In JavaScript, values evaluated in a conditional statement are implicitly coerced to Boolean. All values are considered truthy unless defined as falsy. There are exactly 6 core falsy values: `false`, `0` (including `-0`, `0n`), `''` (empty string), `null`, `undefined`, and `NaN`. Everything else, including empty objects, empty arrays (`[]`), and non-empty strings, is truthy."
            },
            analogy: {
              tr: "Java'da `if` koşullarının içi kesinlikle `boolean` tipinde olmak zorundadır (`if (x != null)` gibi). JavaScript'te ise tipler gevşek olduğundan nesnelerin doğrudan kendisi (`if (element)`) veya stringler koşul olarak yazılabilir.",
              en: "In Java, conditional expressions must strictly evaluate to a `boolean` type (e.g. `if (x != null)`). In JavaScript, because of weak typing, you can pass objects or strings directly to conditionals (e.g. `if (element)`)."
            },
            keyPoints: [
              { tr: "Falsy değerler: false, 0, '', null, undefined, NaN", en: "Falsy values: false, 0, '', null, undefined, NaN" },
              { tr: "Boş diziler ([]) ve boş nesneler ({}) truthy kabul edilir", en: "Empty arrays ([]) and empty objects ({}) are truthy" },
              { tr: "Koşul ifadelerinde tip dönüşümü (coercion) otomatik tetiklenir", en: "Conditional checks trigger automatic boolean coercion" }
            ],
            tip: {
              tr: "Otomasyon kodunda bir locator'ın text değerinin boş olup olmadığını `if (text)` şeklinde kestirmeden kontrol edebilirsiniz; çünkü boş string falsy, dolu string truthy'dir.",
              en: "You can check if a locator string is empty using `if (text)` because an empty string is falsy while a filled string is truthy."
            }
          },
          {
            level: "basic",
            q: { tr: "NaN nedir? NaN olup olmadığını nasıl doğrularız?", en: "What is NaN? How do you check if a value is NaN?" },
            a: {
              tr: "`NaN` (Not-a-Number), geçersiz bir matematiksel işlemin sonucunu temsil eden özel bir Number tipidir (Örn: `'elma' * 5`). NaN'ın en garip özelliği kendisi dahil hiçbir şeye eşit olmamasıdır (`NaN === NaN` false döner). Bir değerin NaN olduğunu doğrulamak için normal karşılaştırma yerine `Number.isNaN()` veya küresel `isNaN()` fonksiyonu kullanılmalıdır.",
              en: "`NaN` (Not-a-Number) is a special Number type representing an invalid mathematical operation (e.g., `'apple' * 5`). A unique property of NaN is that it is not equal to anything, including itself (`NaN === NaN` is false). To check if a value is NaN, use `Number.isNaN()` or the global `isNaN()` function instead of standard equality operators."
            },
            analogy: {
              tr: "Java'da geçersiz matematiksel işlemlerde genellikle `ArithmeticException` fırlatılır veya float/double işlemlerinde `Double.NaN` döner. JS hata fırlatmak yerine doğrudan NaN değerini üretir.",
              en: "In Java, invalid math operations throw `ArithmeticException` or return `Double.NaN`. Instead of throwing runtime exceptions, JavaScript yields NaN values directly."
            },
            keyPoints: [
              { tr: "NaN, geçersiz matematiksel işlemlerin sayısal sonucudur", en: "NaN represents numeric values computed from invalid math" },
              { tr: "NaN, kendisi dahil hiçbir şeye eşit değildir (NaN === NaN is false)", en: "NaN is unequal to all values, including itself" },
              { tr: "Doğrulama için Number.isNaN(x) kullanılmalıdır", en: "Use Number.isNaN(x) for reliable checks" }
            ],
            tip: {
              tr: "Otomasyon testinde sayısal girdi alanından çekilen verinin geçerli olup olmadığını doğrulamak için `isNaN()` kontrolü yapıp ardından sayıya çevirebilirsiniz.",
              en: "Use `isNaN()` in text input validation steps to check if a scraped UI value can be safely parsed into a number."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te diziler (arrays) nasıl tanımlanır ve en yaygın kullanılan metotları nelerdir?", en: "How are arrays defined in JavaScript and what are their common methods?" },
            a: {
              tr: "JavaScript dizileri köşeli parantezler `[]` kullanılarak tanımlanır ve dinamik boyutludur; içine farklı tiplerde elemanlar konabilir. En yaygın kullanılan metotlar: `push()` (sona eleman ekler), `pop()` (sondan eleman çıkarır), `shift()` (baştan eleman çıkarır), `unshift()` (başa eleman ekler), `slice()` (diziyi böler) ve `splice()` (diziye eleman ekler/çıkarır).",
              en: "JavaScript arrays are declared using square brackets `[]` and are dynamically sized, allowing mixed data types. Common methods include: `push()` (append to end), `pop()` (remove from end), `shift()` (remove from beginning), `unshift()` (insert at beginning), `slice()` (shallow copy a sub-array), and `splice()` (add/remove elements at indices)."
            },
            analogy: {
              tr: "Java'da diziler sabit boyutludur. JS dizileri Java'daki `ArrayList` yapısına benzer; boyutları dinamik büyür ve eleman ekleme çıkarma metotları çok pratiktir.",
              en: "In Java, raw arrays have fixed sizes. JS arrays behave like Java's `ArrayList`, expanding dynamically with built-in helper methods for item manipulation."
            },
            keyPoints: [
              { tr: "Diziler dinamik boyutludur ve farklı tipleri barındırabilir", en: "Arrays are dynamic and can store elements of various types" },
              { tr: "push/pop dizinin sonunu değiştirirken, shift/unshift başını değiştirir", en: "push/pop mutate the end of an array; shift/unshift mutate the beginning" },
              { tr: "Java ArrayList yapısına benzer", en: "Analogous to Java's ArrayList wrapper" }
            ],
            tip: {
              tr: "Playwright testlerinde `page.$$()` veya `locator.all()` metotları bize elementlerin bir JavaScript dizisini döner. Bu dizileri manipüle etmek için array metotlarını iyi bilmeniz gerekir.",
              en: "Playwright APIs like `page.$$()` or `locator.all()` return JavaScript arrays. Mastering array operations makes extracting text from lists very simple."
            }
          },
          {
            level: "basic",
            q: { tr: "Function declaration ile Function expression arasındaki fark nedir?", en: "What is the difference between a function declaration and a function expression?" },
            a: {
              tr: "Function declaration, `function carp(a, b) { return a * b; }` şeklinde yapılan isimli tanımlamadır; hoisting sayesinde kodda tanımlanmadan önce çağrılabilir. Function expression ise bir fonksiyonun değişkene atanmasıdır (`const carp = function(a, b) { ... };`); bunlar değişken atama kurallarına tabi olduklarından tanımlanmadan önce çağrılırlarsa hata fırlatırlar.",
              en: "A function declaration is a named function defined using the `function` keyword (e.g. `function mult(a, b) { return a*b; }`); it is fully hoisted and callable before definition. A function expression assigns a function to a variable (e.g. `const mult = function(a,b){...};`); it is not hoisted and throws errors if invoked before definition."
            },
            analogy: {
              tr: "Java'da tüm metotlar sınıfların içinde tanımlanır ve sırayla bağımsız olarak çağrılabilir (Function declaration gibi). Ancak Java 8 lambda ifadeleri bir değişkene atanabilir ve bu atamadan önce kullanılamaz (Function expression gibi).",
              en: "In Java, all methods belong to classes and are callable regardless of their order (like function declarations). However, Java 8 lambda expressions assigned to variables cannot be accessed before their assignment line (like function expressions)."
            },
            keyPoints: [
              { tr: "Function declaration tamamen hoisted edilir", en: "Function declarations are fully hoisted during compile phase" },
              { tr: "Function expression hoisting kurallarına takılır (TDZ)", en: "Function expressions are bound by variable TDZ rules" },
              { tr: "Modern JS'te fonksiyon ifadeleri ve arrow function kullanımı yaygındır", en: "Modern JS heavily prefers function expressions and arrow functions" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde callback parametresi yazarken temiz görünmesi adına genellikle function expression veya arrow function yapıları tercih edilir.",
              en: "Arrow functions (a type of function expression) are standard for clean callback definitions in Playwright assertions."
            }
          },
          {
            level: "basic",
            q: { tr: "Template literals nedir? Test otomasyonunda dinamik seçiciler (dynamic locators) için nasıl kullanılır?", en: "What are template literals? How do you use them for dynamic locators in testing?" },
            a: {
              tr: "Template literals, ters tırnaklar (backticks - `` ` ``) ile tanımlanan ve içine `${degisken}` yazarak dinamik metin birleştirmeyi sağlayan ES6 özelliğidir. Otomasyon testlerinde, dinamik olarak değişen ID'leri, dinamik xpath/css seçicileri veya API endpoint URL'lerini birleştirmek için artı `+` işareti yerine temiz bir şekilde kullanılır.",
              en: "Template literals are string literals delimited with backticks (`` ` ``), allowing embedded expressions via `${expression}` syntax. In automation, they simplify creating dynamic selectors, XPath expressions, or API endpoints by replacing messy string concatenations with clean templates."
            },
            analogy: {
              tr: "Java'da dinamik string birleştirmek için `String.format()` veya `+` operatörü kullanılır (`\"//div[@id='\" + id + \"']\"`). JS'teki template literals ise Java'daki artı birleştirmesini ortadan kaldıran çok daha okunaklı bir syntax sunar.",
              en: "In Java, dynamic string formatting uses `String.format()` or `+` operators (e.g. `\"//div[@id='\" + id + \"']\"`). JS template literals offer a cleaner inline template syntax compared to Java's string formatting."
            },
            keyPoints: [
              { tr: "Backtick (`` ` ``) karakterleri ile tanımlanır", en: "Enclosed by backtick (`` ` ``) symbols" },
              { tr: "${expression} ile değişken veya fonksiyon çıktısı doğrudan gömülür", en: "Allows embedding variables or expressions using ${expression} syntax" },
              { tr: "Çok satırlı (multiline) metinleri destekler", en: "Supports multi-line strings out of the box" }
            ],
            tip: {
              tr: "Mülakatta dinamik tablo satırı locate etmek için template literals kullandığınızı şu örnekle gösterin: `page.locator(\`//tr[\${rowIndex}]/td\`)`.",
              en: "Demonstrate template literals for dynamic table selectors: `page.locator(\`//tr[\${rowIndex}]/td\`)` during coding interviews."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'teki 'strict mode' (sıkı mod) nedir? Neden önemlidir?", en: "What is 'strict mode' in JavaScript? Why is it important?" },
            a: {
              tr: "Sıkı mod (`\"use strict\";`), JavaScript kodunu daha güvenli ve katı kurallarla çalıştırmayı sağlayan bir direktiftir. Strict mode aktif olduğunda, tanımlanmamış değişkenlere değer atama gibi normalde sessizce geçiştirilen hatalar fırlatılır, gelecekteki JS sürümleri için rezerve edilen kelimelerin değişken adı yapılması engellenir ve bazı performans optimizasyonları kolaylaşır.",
              en: "Strict mode (`\"use strict\";`) is a directive that forces JavaScript to execute under strict syntax rules. When active, it turns silent errors into runtime exceptions (such as assigning values to undeclared variables), bans unsafe actions, and allows V8 to perform better runtime optimizations."
            },
            analogy: {
              tr: "Java derleyicisi yapısı gereği son derece katıdır ve kurallara uymayan kodu derlemez. JS'teki strict mode, normalde gevşek ve hata toleranslı olan JS'i Java'nın o disiplinli, hata yapmayı zorlaştıran güvenli dünyasına yaklaştırma çabasıdır.",
              en: "The Java compiler is naturally strict and will refuse to compile non-compliant code. Strict mode is an effort to bring JavaScript's loose runtime rules closer to Java's type-safe compile-time discipline."
            },
            keyPoints: [
              { tr: "\"use strict\"; ifadesi dosya veya fonksiyon başına konur", en: "Enabled by adding \"use strict\"; at the top of files or functions" },
              { tr: "Sessiz hataları gerçek runtime hatalarına dönüştürür", en: "Converts silent bugs into explicit runtime exceptions" },
              { tr: "ES Modules (ESM) varsayılan olarak strict mode ile çalışır", en: "ES Modules (ESM) run in strict mode by default" }
            ],
            tip: {
              tr: "Modern projelerde ve test framework'lerinde ES6 modülleri (import/export) kullandığımız için sıkı mod arka planda zaten otomatiktir; manuel yazmaya gerek kalmaz.",
              en: "Since modern tests use ES Modules (import/export), strict mode is implicitly active behind the scenes without needing manual directives."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te nesneler (objects) nasıl tanımlanır? Elemanlara nasıl erişilir?", en: "How are objects defined in JavaScript? How do you access their properties?" },
            a: {
              tr: "JavaScript nesneleri süslü parantezler `{}` (object literals) kullanılarak anahtar-değer (key-value) çiftleri şeklinde tanımlanır. Nesne elemanlarına erişmek için Nokta notasyonu (`nesne.ad`) veya Köşeli parantez notasyonu (`nesne['ad']`) kullanılır. Köşeli parantez notasyonu, anahtar adının dinamik veya özel karakter içerdiği durumlarda tercih edilir.",
              en: "JavaScript objects are declared using curly braces `{}` as key-value pairs. Properties can be accessed using either dot notation (`obj.key`) or bracket notation (`obj['key']`). Bracket notation is required when keys are dynamic variables or contain spaces/special characters."
            },
            analogy: {
              tr: "Java'da veri çiftleri tutmak için `HashMap<String, Object>` kullanılır. JavaScript'teki nesneler Java'daki HashMap yapısına çok benzer; ancak sınıf (class) şablonu olmadan havadan anahtar-değer çiftleri oluşturabilme esnekliği sunarlar.",
              en: "In Java, key-value mappings require `HashMap<String, Object>`. JS objects work similarly to Java HashMaps, but allow creating dynamic structures on the fly without declaring class blueprints first."
            },
            keyPoints: [
              { tr: "Object literal {} en yaygın nesne tanımlama yöntemidir", en: "Object literal {} is the standard syntax for creating objects" },
              { tr: "Dinamik key erişimlerinde köşeli parantez nesne[key] kullanılır", en: "Use bracket notation object[key] when keys are dynamic variables" },
              { tr: "JavaScript nesneleri dinamik olarak genişletilebilir", en: "JS objects can have new properties added at runtime" }
            ],
            tip: {
              tr: "Test otomasyonunda konfigürasyon dosyalarını (playwright.config.js) veya test datalarını nesne şeklinde tanımlayıp dinamik değerlerle yönetiriz.",
              en: "We heavily use JS objects in testing to define configurations (e.g. playwright.config.js) and test data inputs."
            }
          },
          {
            level: "basic",
            q: { tr: "Arrow functions (ok fonksiyonları) nedir? Normal fonksiyonlardan farkı nedir?", en: "What are arrow functions? How do they differ from regular functions?" },
            a: {
              tr: "Arrow functions, ES6 ile gelen ve `const topla = (a, b) => a + b;` şeklinde yazılan kısa fonksiyon syntax'ıdır. Normal fonksiyonlardan en büyük farkı, kendi `this`, `arguments`, `super` ve `new.target` bağlamlarına sahip olmamalarıdır. Arrow function içindeki `this`, fonksiyonun tanımlandığı dış kapsamdaki (lexical scope) `this` nesnesine bağlıdır.",
              en: "Arrow functions are a concise syntax introduced in ES6 (e.g. `const add = (a, b) => a + b;`). Their primary difference from regular functions is that they do not bind their own `this`, `arguments`, `super`, or `new.target` contexts. Instead, `this` is lexically bound to the enclosing scope."
            },
            analogy: {
              tr: "Arrow function, Java 8 ile gelen Lambda ifadelerine (`(a, b) -> a + b`) hem görsel hem de işlevsel olarak birebir benzer. Her ikisi de kapsam dışındaki değişkenlere doğrudan erişim (lexical binding) sağlar.",
              en: "Arrow functions are identical in concept and look to Java 8 Lambda expressions (`(a, b) -> a + b`). Both capture the enclosing scope's lexical context without overriding binding."
            },
            keyPoints: [
              { tr: "Kısa ve tek satırlık fonksiyon yazımları için idealdir", en: "Provides a shorter syntax ideal for single-line operations" },
              { tr: "Kendi this bağlamı yoktur; lexical this kullanır", en: "Lacks its own 'this' binding; captures 'this' lexically" },
              { tr: "constructor olarak kullanılamazlar (new ile çağrılamaz)", en: "Cannot be used as constructors (throws error with new)" }
            ],
            tip: {
              tr: "Arrow function'lar, Playwright veya Cypress testlerinde `.then()` zincirlerinde callback yazarken `this` kaymasını engellemek için standart yöntemdir.",
              en: "Arrow functions are the standard choice for writing clean callback chains in Cypress and Playwright to avoid context bugs."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te typeof ve instanceof operatörleri ne işe yarar?", en: "What do typeof and instanceof operators do in JavaScript?" },
            a: {
              tr: "`typeof` operatörü, kendisine verilen ifadenin veri tipini belirten bir string döndürür (Örn: `typeof 'test'` -> `'string'`). `instanceof` operatörü ise bir nesnenin, belirli bir sınıfın (constructor) örneği olup olmadığını kontrol eden bir boolean döndürür (Örn: `element instanceof HTMLElement`).",
              en: "`typeof` is an operator that returns a string indicating the type of the evaluated operand (e.g. `typeof 'test'` -> `'string'`). `instanceof` is an operator that checks if an object is an instance of a class/constructor function, returning a boolean (e.g. `element instanceof HTMLElement`)."
            },
            analogy: {
              tr: "Java'da bir nesnenin tip kontrolü için `instanceof` kullanılır. JS'teki `instanceof` Java'dakine benzer şekilde çalışır. Ancak Java'da `typeof` yoktur; tipler statik olarak bilindiği için çalışma zamanında string tip adı dönen genel bir operatöre gerek duyulmaz.",
              en: "Java uses `instanceof` for object type checks. JS `instanceof` behaves similarly. Java lacks a `typeof` operator because types are known at compile time, eliminating the need for a runtime type name string operator."
            },
            keyPoints: [
              { tr: "typeof: Primitives tiplerin tespiti için kullanılır", en: "typeof: Used to check primitive data types" },
              { tr: "instanceof: Nesne sınıf hiyerarşisi kontrolü için kullanılır", en: "instanceof: Used to check object prototype lineage" },
              { tr: "typeof null, hata nedeniyle 'object' döner", en: "typeof null returns 'object' due to historical baggage" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde gelen parametrenin seçici string mi yoksa bir locator nesnesi mi olduğunu ayırt etmek için `typeof selector === 'string'` kontrolü yapabilirsiniz.",
              en: "In utility wrappers, use `typeof selector === 'string'` to distinguish between raw string selectors and locator objects."
            }
          },
          {
            level: "basic",
            q: { tr: "JavaScript'te scope (kapsam) nedir? Hangi scope türleri vardır?", en: "What is scope in JavaScript? What are the scope types?" },
            a: {
              tr: "Scope, değişkenlerin ve fonksiyonların kodun hangi bölgelerinden erişilebilir olduğunu belirleyen sınırlardır. JavaScript'te 3 temel scope vardır: 1. Global Scope: Her yerden erişilebilen değişkenler. 2. Function Scope: Sadece tanımlandığı fonksiyon içinde erişilebilen değişkenler (`var`). 3. Block Scope: Sadece süslü parantez `{}` bloğu içinde erişilebilen değişkenler (`let`, `const`).",
              en: "Scope determines the accessibility and lifetime of variables and functions in different parts of your code. JavaScript has 3 main scope types: 1. Global Scope: Variables accessible anywhere. 2. Function Scope: Variables accessible only inside their declaring function (`var`). 3. Block Scope: Variables accessible only inside their enclosing curly braces `{}` (`let`, `const`)."
            },
            analogy: {
              tr: "Java'da her şey blok kapsamlıdır; süslü parantez `{}` dışına değişken sızamaz. JS'teki `let` ve `const` Java'nın bu sıkı blok kapsamı kuralını taklit eder, ancak `var` fonksiyon kapsamlı olup blok dışına sızabilir.",
              en: "In Java, scoping is strictly block-scoped; variables cannot leak outside their enclosing braces `{}`. JS's `let` and `const` match this block-scoped model, whereas `var` is function-scoped and escapes block boundaries."
            },
            keyPoints: [
              { tr: "Global, Function ve Block olmak üzere 3 scope vardır", en: "Features Global, Function, and Block scopes" },
              { tr: "let ve const block scope sınırı dışına sızmaz", en: "let and const are strictly trapped by block scopes" },
              { tr: "var değişkenleri blok dışına sızarak hoisting sızıntısı yapabilir", en: "var variables leak out of blocks, causing hoist bugs" }
            ],
            tip: {
              tr: "Test suite'lerinizde test dosyasının en tepesine koyduğunuz değişkenlerin global scope yerine modül scope'unda kalması için import/export modül yapısını kullanın.",
              en: "Use ES modules to ensure top-level variables remain isolated within the module instead of polluting the global scope."
            }
          },

          // ==========================================
          // INTERMEDIATE (20 questions)
          // ==========================================
          {
            level: "intermediate",
            q: { tr: "Closure (kapanış) nedir? Gerçek bir otomasyon senaryosuyla örnekler misiniz?", en: "What is a closure? Give a practical automation test example." },
            a: {
              tr: "Closure, bir fonksiyonun kendi tanımlandığı dış kapsamdaki (lexical scope) değişkenleri, o dış kapsam sonlanmış olsa dahi hatırlaması ve bunlara erişebilmesidir. Otomasyonda, her çağrıldığında sıralı benzersiz ID veya test datası üreten bir sayaç fonksiyonu yazmak için closure kullanılır.",
              en: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment), allowing the inner function to access outer variables even after the outer function has returned. In testing, closures are used to create unique test data generators or stateful counters."
            },
            analogy: {
              tr: "Java'da local inner class'lar veya lambda ifadeleri, tanımlandıkları metottaki değişkenlere erişebilir; ancak bu değişkenlerin `final` veya 'effectively final' (değeri değişmeyen) olması şarttır. JavaScript'te ise closure içindeki dış değişkenlerin değeri serbestçe değiştirilebilir.",
              en: "In Java, lambdas and inner classes can reference outer method variables, but they must be `final` or 'effectively final'. In JavaScript, closures have no such restriction and can freely modify captured variables."
            },
            keyPoints: [
              { tr: "Kapsam dışındaki değişkenleri bellekte tutma yeteneğidir", en: "The ability to preserve references to outer variables in memory" },
              { tr: "Veri gizleme (encapsulation) için kullanılır", en: "Used to emulate private variables (data encapsulation)" },
              { tr: "Java lambdalarından daha esnektir (değişken mutasyonuna izin verir)", en: "More flexible than Java lambdas (allows mutating outer vars)" }
            ],
            tip: {
              tr: "Otomasyon suite'lerinizde benzersiz e-posta üreten stateful bir helper yazarken closure yapısından şu şekilde yararlanabilirsiniz: `const getEmail = createEmailGenerator();`.",
              en: "Use closures to write unique email generator helpers that maintain state without global variable pollution."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te prototip (prototype) ve prototip zinciri (prototype chain) nedir? Kalıtım nasıl sağlanır?", en: "What is prototype and prototype chain in JavaScript? How is inheritance achieved?" },
            a: {
              tr: "JavaScript, sınıf tabanlı kalıtım yerine prototip tabanlı bir kalıtım modeli kullanır. Her JavaScript nesnesinin gizli bir `[[Prototype]]` bağı (kodda `__proto__`) vardır. Bir nesne üzerinde metot arandığında, nesnede bulunamazsa prototipine bakılır; orada da yoksa prototipin prototipine gidilir. Bu zincire prototip zinciri denir ve `null` değerine ulaşana kadar devam eder. ES6 ile gelen `class` anahtar kelimesi, arka planda yine bu prototip yapısını kullanan sentaktik bir şekerdir.",
              en: "JavaScript uses a prototypal inheritance model rather than class-based inheritance. Every object has a private property pointing to another object called its prototype. When accessing a property on an object, JS looks at the object itself first; if not found, it traverses up the prototype chain until it either finds the property or hits `null`. The ES6 `class` syntax is sugar over this prototype system."
            },
            analogy: {
              tr: "Java'da kalıtım, sınıfların (class) derleme zamanında birbirini genişletmesiyle (`extends`) statik olarak kurulur. JS'te ise nesneler çalışma zamanında (runtime) başka nesneleri doğrudan prototip olarak bağlayarak dinamik kalıtım alırlar.",
              en: "In Java, inheritance is established statically at compile time using classes and the `extends` keyword. In JavaScript, inheritance is dynamic and happens at runtime by linking objects directly through prototype reference chains."
            },
            keyPoints: [
              { tr: "Kalıtım prototype zinciri üzerinden dinamik yürütülür", en: "Inheritance is resolved dynamically via prototype chains" },
              { tr: "ES6 classes arka planda prototipleri kullanan şeker yapıdır", en: "ES6 classes are syntactic sugar over prototypal mechanisms" },
              { tr: "Object.prototype zincirin en tepesidir", en: "Object.prototype sits at the top of the chain" }
            ],
            tip: {
              tr: "Playwright test runner'da custom class'lar yazıp Page Object Model kurduğunuzda, arka planda V8 motorunun prototype zincirini çalıştırdığını bilmek önemlidir.",
              en: "When implementing Page Object Models with ES6 classes, keep in mind that the V8 engine is resolving your helper methods via the prototype chain."
            }
          },
          {
            level: "intermediate",
            q: { tr: "`this` anahtar kelimesi JavaScript'te nasıl çalışır? Bağlamı (context) nasıl belirlenir?", en: "How does the `this` keyword work in JavaScript? How is its context determined?" },
            a: {
              tr: "Java'dan farklı olarak, JavaScript'te `this` kelimesinin değeri statik değildir; fonksiyonun nasıl çağrıldığına bağlı olarak çalışma zamanında dinamik belirlenir. 4 temel kural vardır: 1. Default: Global veya window nesnesi. 2. Implicit: Metodun çağrıldığı nesne (Örn: `nesne.metot()` çağrısında `this` nesneyi gösterir). 3. Explicit: `call`, `apply` veya `bind` ile atanan nesne. 4. New binding: `new` ile oluşturulan yeni nesne. Arrow function'lar ise kendi `this` bağlamına sahip olmayıp lexical scope'u yakalarlar.",
              en: "Unlike Java, `this` in JavaScript is not static; its value is determined dynamically at runtime based on how the function is invoked. There are 4 invocation rules: 1. Default: global/window object. 2. Implicit: the object invoking the method (e.g., `obj.method()` binds `this` to `obj`). 3. Explicit: bound using `call`, `apply`, or `bind`. 4. New binding: the newly constructed object via `new`. Arrow functions capture their enclosing execution context's `this` lexically."
            },
            analogy: {
              tr: "Java'da `this`, her zaman içinde bulunulan sınıfın o anki nesne örneğini (instance) gösterir ve değeri asla değişmez. JS'te ise bir fonksiyonu başka bir nesnenin içine ödünç verip `this` bağlamını tamamen değiştirebilirsiniz.",
              en: "In Java, `this` always points to the current instance of the enclosing class, and its binding is static. In JavaScript, you can pass a function between objects, dynamically changing what `this` refers to during execution."
            },
            keyPoints: [
              { tr: "this bağlamı fonksiyonun çağrılma anına (call-site) göre değişir", en: "The value of 'this' is decided at call-time based on invocation context" },
              { tr: "Arrow function'lar lexical this kullanır (this değişmez)", en: "Arrow functions resolve 'this' lexically from their outer scope" },
              { tr: "call/apply/bind ile this manuel olarak kilitlenebilir", en: "call, apply, and bind explicitly force the binding of 'this'" }
            ],
            tip: {
              tr: "Otomasyon sınıflarınızda callback fonksiyonları tanımlarken callback içindeki this değerinin kaybolmasını önlemek için arrow function (`() => { ... }`) yazmayı tercih edin.",
              en: "When passing callbacks inside test utilities, write arrow functions to preserve the outer class 'this' context."
            }
          },
          {
            level: "intermediate",
            q: { tr: "bind, call ve apply metotları arasındaki farklar nelerdir?", en: "What is the difference between bind, call, and apply?" },
            a: {
              tr: "Üç metot da bir fonksiyonun `this` bağlamını manuel olarak ayarlamak için kullanılır. `call()` fonksiyonu hemen çalıştırır ve argümanları virgülle ayrılmış liste şeklinde alır (`fn.call(context, arg1, arg2)`). `apply()` fonksiyonu da hemen çalıştırır ama argümanları bir dizi (array) şeklinde kabul eder (`fn.apply(context, [arg1, arg2])`). `bind()` ise fonksiyonu hemen çalıştırmaz; `this` bağlamı kilitlenmiş YENİ bir fonksiyon kopyası döndürür, böylece ileride çağrılabilir.",
              en: "All three methods explicitly bind the `this` context of a function. `call()` executes the function immediately, accepting arguments as a comma-separated list (`fn.call(ctx, arg1, arg2)`). `apply()` executes the function immediately but accepts arguments as an array (`fn.apply(ctx, [arg1, arg2])`). `bind()` does not execute immediately; it returns a NEW function copy with `this` permanently bound, to be invoked later."
            },
            analogy: {
              tr: "Java'da bir metodun ait olduğu nesne ve çağrıldığı context derleme zamanında katı bir şekilde bağlıdır. JS'te ise `call`/`apply`/`bind` sayesinde metotları sahiplerinden koparıp başka nesnelerin üzerinde esnekçe koşturabilirsiniz.",
              en: "In Java, methods are strictly bound to their parent classes and cannot be detached. JS's `call`/`apply`/`bind` allow detaching methods and executing them against other target objects dynamically."
            },
            keyPoints: [
              { tr: "call: Hemen çalıştırır, argümanlar virgülle", en: "call: Invokes immediately, arguments passed as list" },
              { tr: "apply: Hemen çalıştırır, argümanlar diziyle", en: "apply: Invokes immediately, arguments passed as array" },
              { tr: "bind: Çalıştırmaz, bound edilmiş yeni fonksiyon döner", en: "bind: Returns a new function with bound context, does not execute" }
            ],
            tip: {
              tr: "Otomasyonda, bir helper sınıfın metodunu asenkron bir callback olarak başka bir yere parametre geçerken metot içindeki `this` değerinin kaybolmaması için `.bind(this)` ekleyebilirsiniz.",
              en: "Use `.bind(this)` when passing a class helper method as a callback parameter to ensure it retains its helper class instance context."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki array iterasyon metotları (map, filter, reduce) ile forEach arasındaki fark nedir?", en: "What is the difference between map, filter, reduce, and forEach?" },
            a: {
              tr: "`forEach` sadece dizi elemanları üzerinde döner (döngü yapar) ve geriye bir değer döndürmez (`undefined` döner); genellikle side-effect (ekrana yazma, db'ye yazma) için kullanılır. `map()`, elemanları dönüştürerek aynı uzunlukta YENİ bir dizi döner. `filter()`, koşulu sağlayanlardan oluşan YENİ bir dizi döner. `reduce()` ise diziyi tek bir değere (sayı, nesne vb.) indirger. map, filter ve reduce orijinal diziyi asla değiştirmez (immutable).",
              en: "`forEach` iterates through array elements executing a callback for side-effects, but returns `undefined`. `map()` transforms each element to return a NEW array of the same length. `filter()` returns a NEW sub-array containing elements that pass a test condition. `reduce()` aggregates all items into a single final value (e.g. accumulator). Unlike mutable loops, map, filter, and reduce promote immutability."
            },
            analogy: {
              tr: "Java 8 ile gelen Stream API'deki `.map()`, `.filter()` ve `.reduce()` işlemleri JavaScript'teki bu fonksiyonlarla birebir aynı mantıkta çalışır. Java'daki `forEach` de JS'teki `forEach` gibi sadece döngü yürütür.",
              en: "Java 8's Stream API features `.map()`, `.filter()`, and `.reduce()` operations which mirror JavaScript's array methods. The terminal `.forEach()` in Java Streams behaves exactly like JS `forEach`."
            },
            keyPoints: [
              { tr: "forEach: Orijinal diziyi değiştirebilir, dönüş değeri yoktur", en: "forEach: Iterates for side-effects, returns undefined" },
              { tr: "map/filter: Her zaman yeni bir dizi döner (immutable)", en: "map/filter: Immutable operations returning new arrays" },
              { tr: "reduce: Tüm diziyi tek bir nesneye veya değere indirger", en: "reduce: Accumulates the array into a single target output" }
            ],
            tip: {
              tr: "Otomasyonda elementlerin text değerlerini çekip karşılaştırmak için `map()` kullanın: `const texts = elements.map(el => el.text());`. Sadece döngüyle bir şeyler yapmak için `forEach` tercih edin.",
              en: "Use `map()` in tests to transform element locators into text string arrays: `elements.map(el => el.text())`."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te Promise nedir? Callback cehennemini (callback hell) nasıl çözer?", en: "What is a Promise in JavaScript? How does it solve callback hell?" },
            a: {
              tr: "Promise, asenkron bir işlemin nihai başarı (resolved) veya başarısızlık (rejected) sonucunu temsil eden bir nesnedir. Eskiden asenkron işlemleri iç içe geçmiş callback fonksiyonlarıyla çözmeye çalışmak kodun okunmasını imkansız kılan 'Callback Hell' yapısına yol açıyordu. Promise yapısı, `.then()` ve `.catch()` zincirleri sunarak asenkron akışı yukarıdan aşağıya okunabilir, temiz bir yapıya kavuşturur.",
              en: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. Traditionally, managing async operations relied on nested callbacks, leading to unreadable code structures known as 'Callback Hell'. Promises allow chaining operations using `.then()` and `.catch()`, converting nested structures into linear, readable code."
            },
            analogy: {
              tr: "Java'daki `CompletableFuture` nesnesi, JavaScript'teki Promise nesnesinin doğrudan karşılığıdır. Her iki yapı da asenkron akışları zincirleme metotlarla yönetmeyi sağlar.",
              en: "Java's `CompletableFuture` is the direct equivalent of JavaScript's Promise. Both allow chaining async tasks and handling errors gracefully using completion stages."
            },
            keyPoints: [
              { tr: "Asenkron işlemlerin nihai sonucunu temsil eden nesnedir", en: "An object representing the eventual state of an async action" },
              { tr: "Pending, Fulfilled, Rejected olmak üzere 3 durumu vardır", en: "Has 3 states: Pending, Fulfilled, and Rejected" },
              { tr: "Callback Hell karmaşasını çözerek doğrusal zincirleme sağlar", en: "Eliminates Callback Hell by allowing flat method chaining" }
            ],
            tip: {
              tr: "Mülakatta, modern JavaScript projelerinde artık `.then()` yerine çok daha okunaklı olan `async/await` syntax'ını tercih ettiğinizi belirtin.",
              en: "Stress in interviews that while Promises solve callback hell, modern JS developers prefer the clean `async/await` syntax built on top of Promises."
            }
          },
          {
            level: "intermediate",
            q: { tr: "async/await nedir? Promise zincirlerine göre avantajları nelerdir?", en: "What is async/await? What are its advantages over raw Promise chains?" },
            a: {
              tr: "async/await, Promise'lerin üzerine kurulu, asenkron kodu senkron gibi yazıp okumamızı sağlayan sentaktik bir şekerdir (syntactic sugar). `async` ile işaretlenen fonksiyonlar otomatik olarak Promise döner; `await` ise Promise çözülene kadar fonksiyonun yürütülmesini duraklatır. Ham Promise zincirlerine (`.then()`) göre en büyük avantajı, hata yönetimini standart `try/catch` bloklarıyla yapabilmemiz ve kodun yukarıdan aşağıya okunabilirliğini artırmasıdır.",
              en: "async/await is a syntactic sugar built on top of Promises that allows writing asynchronous code that looks and behaves like synchronous code. Functions marked `async` automatically return a Promise, and `await` pauses execution until the Promise resolves. Its advantages over raw `.then()` chains include cleaner syntax, easier debugging, and using standard `try/catch` for error handling."
            },
            analogy: {
              tr: "Java'da asenkron işlemleri yönetmek için metotları engellemeden zincirler kurmak karmaşıktır. C# ve JavaScript'teki `async/await` yapısı asenkron programlamayı çok kolaylaştırır; Java'da buna birebir benzeyen bir dil anahtarı yoktur.",
              en: "Unlike JS and C#, Java doesn't have native language-level `async`/`await` keywords. Java developers rely on `.thenAccept()` or blocking `future.get()` calls, which are more verbose."
            },
            keyPoints: [
              { tr: "Promise yapısını senkron görünümlü koda dönüştürür", en: "Makes asynchronous code look and read like synchronous code" },
              { tr: "Hata yönetimi standart try/catch ile yapılır", en: "Allows handling errors using standard try/catch blocks" },
              { tr: "await sadece async fonksiyonlar içinde kullanılabilir", en: "The await keyword is only valid inside async functions" }
            ],
            tip: {
              tr: "Playwright testlerindeki adımların neredeyse tamamı birer Promise döndürdüğü için her komut satırının başında `await` kullanmak standart otomasyon pratiklerindendir.",
              en: "Since almost all Playwright browser interactions return Promises, prefixing command lines with `await` is mandatory in modern test designs."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Promise.all, Promise.race ve Promise.allSettled arasındaki farklar nelerdir?", en: "What is the difference between Promise.all, Promise.race, and Promise.allSettled?" },
            a: {
              tr: "`Promise.all()` verilen tüm Promise'lerin başarıyla tamamlanmasını bekler; biri bile hata alırsa anında çöker ve reddedilir. `Promise.race()` ilk sonuçlanan (başarılı veya başarısız) Promise ile döner. `Promise.allSettled()` ise tüm Promise'lerin sonuçlanmasını (başarılı/başarısız fark etmeksizin) bekler og her birinin durumunu içeren bir dizi döndürür.",
              en: "`Promise.all()` waits for all Promises to resolve, but rejects immediately if any single Promise fails. `Promise.race()` resolves or rejects as soon as the first Promise in the array resolves or rejects. `Promise.allSettled()` waits for all input Promises to complete regardless of whether they succeeded or failed, returning an array of status objects."
            },
            analogy: {
              tr: "Java'da birden fazla `CompletableFuture` nesnesini yönetmek için `CompletableFuture.allOf()` veya `anyOf()` metotları kullanılır. JS'teki `Promise.all` ve `Promise.race` bu metotların doğrudan karşılıklarıdır.",
              en: "In Java, `CompletableFuture.allOf()` and `CompletableFuture.anyOf()` serve as the direct equivalents of JavaScript's `Promise.all()` and `Promise.race()`."
            },
            keyPoints: [
              { tr: "Promise.all: Hepsi başarılı olmalı, tek hata çökertir", en: "Promise.all: All must succeed; a single rejection rejects the whole" },
              { tr: "Promise.race: İlk biten (başarı veya hata) kazanır", en: "Promise.race: Resolves/rejects with the fastest Promise" },
              { tr: "Promise.allSettled: Hatalar dahil hepsinin bitmesini bekler", en: "Promise.allSettled: Waits for all to finish, returning status objects" }
            ],
            tip: {
              tr: "Otomasyonda, paralel olarak 5 farklı API isteği atıp hepsinin tamamlandığını doğrulamak için `Promise.all()` kullanarak test sürenizi ciddi oranda kısaltabilirsiniz.",
              en: "To optimize tests, launch multiple independent API requests concurrently using `Promise.all()` to significantly reduce test suite execution times."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki ES Modules (ESM) ile CommonJS (CJS) modül sistemleri arasındaki farklar nelerdir?", en: "What is the difference between ES Modules (ESM) and CommonJS (CJS) modules?" },
            a: {
              tr: "CommonJS Node.js'in eski ve varsayılan modül sistemidir; senkrondur ve `require()` / `module.exports` kullanır. ES Modules (ESM) ise modern ECMAScript standardıdır; asenkron yüklemeyi destekler, statik analiz edilebilir ve `import` / `export` anahtar kelimelerini kullanır. ESM, kullanılmayan kodların build sırasında temizlenmesini (tree-shaking) destekler.",
              en: "CommonJS (CJS) is Node's legacy module system, using synchronous `require()` and `module.exports`. ES Modules (ESM) is the official browser standard, using asynchronous `import` and `export` statements. ESM enables static analysis by compilers, which makes performance optimizations like tree-shaking possible."
            },
            analogy: {
              tr: "Java'daki `import package.Class;` yapısı statiktir ve derleme zamanında çözülür; bu yönüyle ES Modules (import) yapısına benzer. Java'da dinamik class loader'lar dışında CommonJS benzeri senkron dinamik bir yükleme pek kullanılmaz.",
              en: "Java's static `import` statements resolved at compile-time match the behavior of ES Modules. Java lacks a direct runtime equivalent to CommonJS's dynamic synchronous `require()` loader."
            },
            keyPoints: [
              { tr: "CommonJS: require() / module.exports (Senkron)", en: "CommonJS: require() / module.exports (Synchronous)" },
              { tr: "ES Modules: import / export (Asenkron, modern standart)", en: "ES Modules: import / export (Asynchronous, official standard)" },
              { tr: "ES Modules tree-shaking (ölü kod temizleme) destekler", en: "ES Modules support compile-time tree-shaking optimizations" }
            ],
            tip: {
              tr: "Modern Playwright projelerinde package.json dosyasına `\"type\": \"module\"` ekleyerek modern ES Modules (import) yapısını varsayılan hale getirmeniz tavsiye edilir.",
              en: "Set `\"type\": \"module\"` in your package.json to enable modern ES Modules imports directly in your automation workspace."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Event Bubbling (Olay Balonlaşması) ve Event Capturing (Olay Yakalanması) nedir?", en: "What is Event Bubbling and Event Capturing in the DOM?" },
            a: {
              tr: "DOM'da bir elemente tıklandığında olay iki aşamada yayılır. 1. Capturing Phase: Olay en dıştaki parent elementten (document) tıklanan hedef elemente doğru aşağı iner. 2. Bubbling Phase: Olay hedef elementten başlayarak en dıştaki parent elemente doğru yukarı çıkar (balon gibi yükselir). JavaScript'te varsayılan olarak event listener'lar bubbling aşamasında tetiklenir; bunu durdurmak için `event.stopPropagation()` çağrılır.",
              en: "When an event triggers on a DOM element, it propagates in two phases. 1. Capturing Phase: The event travels down from the root document node to the target element. 2. Bubbling Phase: The event bubbles back up from the target element to the document root. By default, JS event listeners trigger during the bubbling phase. You can stop this propagation using `event.stopPropagation()`."
            },
            analogy: {
              tr: "Java masaüstü framework'lerinde (AWT/Swing/JavaFX) de olay yayılım modelleri (event propagation) bulunur. Amaç web sayfalarındaki DOM hiyerarşisi kadar derin bir iç içe geçmiş olay balonlaşması yapısı web otomasyonculara hastır.",
              en: "Desktop GUI toolkits in Java (like Swing or JavaFX) also implement hierarchical event propagation. However, DOM bubbling is unique to web platforms and is a key concept for automation."
            },
            keyPoints: [
              { tr: "Capturing yukarıdan aşağıya, Bubbling aşağıdan yukarıya yayılımdır", en: "Capturing phase flows top-down; bubbling phase flows bottom-up" },
              { tr: "stopPropagation() olayın üst katmanlara yayılmasını keser", en: "stopPropagation() halts the propagation chain immediately" },
              { tr: "Varsayılan olarak bubbling aşaması dinlenir", en: "Event listeners trigger during the bubbling phase by default" }
            ],
            tip: {
              tr: "Cypress veya Playwright ile bir butona tıklarken 'element is covered' hatası alıyorsanız, arka planda event propagation ve parent elementlerin olayı ezmesi gibi durumları incelemelisiniz.",
              en: "If UI actions fail with 'element is covered' errors, check if parent nodes are intercepting events due to DOM bubbling mechanisms."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te 'execution context' (yürütme bağlamı) ve 'lexical environment' nedir?", en: "What is execution context and lexical environment in JavaScript?" },
            a: {
              tr: "Execution Context, JavaScript kodunun derlenip çalıştırıldığı çevre/ortamdır. Lexical Environment ise kod yazılırken değişkenlerin ve fonksiyonların fiziksel olarak nerede tanımlandığını tutan sözlüktür. Kod çalışırken her fonksiyon çağrıldığında yeni bir Execution Context oluşturulur ve bu context kendi Lexical Environment'ı üzerinden üst scope'ların değişken haritalarına (scope chain) erişebilir.",
              en: "An Execution Context is the environment in which JavaScript code is evaluated and executed. A Lexical Environment is a data structure that holds identifier-variable mapping based on the physical location of code during authoring. Every function call pushes a new Execution Context onto the call stack, referencing its Lexical Environment to resolve variables up the scope chain."
            },
            analogy: {
              tr: "Java'da her metot çağrıldığında JVM call stack'inde yeni bir 'stack frame' (yığın çerçevesi) açılır ve lokal değişkenler orada tutulur. JS'teki execution context kavramı JVM'in stack frame yapısının doğrudan eşdeğeridir.",
              en: "In Java, calling a method creates a new stack frame on the JVM call stack to hold local variables. JavaScript's Execution Context is conceptually equivalent to the JVM's stack frame."
            },
            keyPoints: [
              { tr: "Global ve Functional olmak üzere context'ler oluşturulur", en: "Consists of Global and Functional Execution Contexts" },
              { tr: "Lexical Environment kodun yazıldığı fiziksel konumu baz alır", en: "Lexical environment is defined at compile-time by code position" },
              { tr: "Scope Chain bu yapılar sayesinde kurulur", en: "Scope Chain resolution relies on these lexical links" }
            ],
            tip: {
              tr: "Otomasyon kodlarında callback scope'larındaki değişkenlerin neden kaybolmadığını anlamak için lexical environment ve closure teorisini iyi bilmek mülakatta fark yaratır.",
              en: "Understanding how lexical scope resolves variables will help you debug nested callbacks in complex test scenarios."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Spread ve Rest operatörleri nedir? Aralarındaki farklar nelerdir?", en: "What are the Spread and Rest operators? How do they differ?" },
            a: {
              tr: "İki operatör de üç nokta `...` syntax'ını kullanır ancak amaçları terstir. Spread (yayma) operatörü, bir diziyi veya nesneyi tekil elemanlarına ayırır/yayar (Örn: `[...dizi1, ...dizi2]` yeni bir birleşik dizi oluşturur). Rest (toplama) operatörü ise tekil argümanları bir araya getirip tek bir dizi halinde toplar (Örn: `function topla(...sayilar)` ifadesinde `sayilar` bir dizidir).",
              en: "Both operators share the triple-dot `...` syntax but perform opposite tasks. The Spread operator unpacks array/object elements into individual values (e.g., `[...arr1, ...arr2]` merges arrays). The Rest operator packs multiple individual values into a single array structure (e.g., `function sum(...nums)` gathers args)."
            },
            analogy: {
              tr: "Java'daki variable arguments (varargs - `void metot(String... args)`) yapısı JavaScript'teki Rest operatörüyle birebir aynıdır. Amaç nesneleri veya dizileri havadan yaymak (Spread) için hazır bir dil operatörü yoktur.",
              en: "Java's variable arguments syntax (varargs: `void method(String... args)`) is identical to JS's Rest operator. Java lacks a native equivalent to the Spread operator for unpacking collection elements."
            },
            keyPoints: [
              { tr: "Spread: Nesne/Dizi elemanlarını dışarı yayar (dağıtır)", en: "Spread: Unpacks collection elements into single values" },
              { tr: "Rest: Gelen parametreleri bir dizi içinde toplar (toplar)", en: "Rest: Gathers list of parameters into a single array" },
              { tr: "Java varargs = JavaScript Rest operator", en: "Java varargs = JavaScript Rest operator" }
            ],
            tip: {
              tr: "Test otomasyonunda, varsayılan test konfigürasyon nesnesini kopyalayıp bazı değerlerini ezmek için spread operatörünü sıkça kullanırız: `const testConfig = { ...defaultConfig, timeout: 10000 };`.",
              en: "Use the spread operator to easily clone and override default configuration objects in tests: `const config = { ...defaults, retries: 2 };`."
            }
          },
          {
            level: "intermediate",
            q: { tr: "Destructuring (yapı söküm) nedir? Test datası okurken nasıl fayda sağlar?", en: "What is destructuring? How does it help when reading test data?" },
            a: {
              tr: "Destructuring, nesnelerin veya dizilerin içindeki değerleri tek bir hamlede çıkarıp bağımsız değişkenlere atamayı sağlayan pratik bir ES6 özelliğidir. Örneğin, `const { username, password } = testData;` yazarak nesnedeki iki alanı tek satırda değişken haline getirebiliriz. Test otomasyonunda karmaşık JSON dosyalarından veya API yanıtlarından belirli alanları ayıklamak için kod kalabalığını ciddi oranda azaltır.",
              en: "Destructuring is a feature introduced in ES6 that allows unpacking values from arrays or properties from objects into distinct variables in a single statement. E.g. `const { username, password } = testData;`. In testing, it eliminates boilerplate code when extracting fields from nested JSON config files or API payloads."
            },
            analogy: {
              tr: "Java'da bir nesnenin alanlarını değişkenlere atamak için her alan için ayrı getter çağırmak zorundasınız (`String user = data.getUsername();`). JS destructuring ise bu hantal yapıyı tek satıra indirger.",
              en: "In Java, assigning object properties to variables requires separate getter calls (e.g. `String user = data.getUser()`). JS destructuring condenses this verbose assignment pattern into a single expression."
            },
            keyPoints: [
              { tr: "Object destructuring: Nesne alanlarını değişkene atar", en: "Object destructuring: Unpacks object properties into variables" },
              { tr: "Array destructuring: Dizi elemanlarını sırayla değişkene atar", en: "Array destructuring: Unpacks array items by order index" },
              { tr: "Varsayılan değer (default values) tanımlamayı destekler", en: "Supports setting default fallback values during unpack" }
            ],
            tip: {
              tr: "Playwright testlerinde test fonksiyonunun parametresindeki `{ page }` ifadesi aslında bir destructuring örneğidir; context nesnesinden sadece page locator'ını ayıklayıp alır.",
              en: "The `{ page }` parameter passed to Playwright test functions is a direct example of object destructuring from the test context object."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te bir callback fonksiyonu nedir? Senkron ve asenkron callback farkını açıklar mısınız?", en: "What is a callback function? Explain the difference between synchronous and asynchronous callbacks." },
            a: {
              tr: "Callback, başka bir fonksiyona parametre olarak geçilen ve o fonksiyonun içinde yürütülmesi beklenen fonksiyonlardır. Senkron callback'ler anında, sırayla çalıştırılır (Örn: `array.map(fn)` içindeki `fn`). Asenkron callback'ler ise zaman alan bir işlem bittiğinde tetiklenmek üzere arka plana atılır (Örn: `setTimeout(fn, 1000)` veya network isteği bitince çalışan fonksiyonlar).",
              en: "A callback function is a function passed into another function as an argument, intended to be executed inside the outer function. Synchronous callbacks execute immediately and in sequence (e.g., `array.map(callback)`). Asynchronous callbacks are deferred, executing later once a background task completes (e.g. `setTimeout(callback, 1000)` or network API call callbacks)."
            },
            analogy: {
              tr: "Java'da callback'ler genellikle bir Interface (Örn: `Runnable` veya custom Listener) veya Java 8 Functional Interface'ler (Consumer, Function) parametre geçilerek simüle edilir. JS'te ise fonksiyonlar birinci sınıf nesne olduğundan doğrudan parametre olarak aktarılır.",
              en: "In Java, callbacks require implementing an Interface (e.g. `Runnable` or `Callable`) or passing Java 8 Functional Interfaces. JS treats functions as first-class citizens, allowing them to be passed as raw parameters directly."
            },
            keyPoints: [
              { tr: "Callback parametre olarak geçilen standart fonksiyondur", en: "A callback is simply a function passed as an argument" },
              { tr: "Senkron callback anında ve blocking çalışır", en: "Synchronous callbacks run immediately and block further execution" },
              { tr: "Asenkron callback Event Loop sırasına girer (non-blocking)", en: "Asynchronous callbacks register via Event Loop (non-blocking)" }
            ],
            tip: {
              tr: "Otomasyon kütüphanelerinde element aramalarında kullanılan filtreleme adımları veya asenkron `page.route()` intercept işlemlerinde callback yapılarını yoğun şekilde kullanırız.",
              en: "Callbacks are heavily utilized in network interception steps like Playwright's `page.route()` to define custom response mocks."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te closures ve scopes arasındaki fark nedir?", en: "What is the difference between closures and scopes in JavaScript?" },
            a: {
              tr: "Scope (kapsam), değişkenlerin kodun neresinde erişilebilir olduğunu belirleyen kurallar bütünüdür (derleme zamanında netleşir). Closure (kapanış) ise bu scope kuralları sayesinde, bir fonksiyonun kendi dış kapsamındaki değişkenleri referans alarak bu bağı çalışma zamanında (runtime) bellekte korumasıdır. Özetle, scope kuralları sınırı çizer; closure ise bu sınırın içindeki değişkenleri canlı tutan mekanizmadır.",
              en: "Scope refers to the visibility rules of variables in the code hierarchy, determined at compile-time. Closure is the runtime mechanism where a function preserves and carries access to its outer lexical scope variables even after that scope has closed. In short, scope defines the boundaries, while closure is the mechanism that keeps variables within those boundaries alive."
            },
            analogy: {
              tr: "Java'da bir metodun içindeki değişkenler metot bitince yok olur (stack temizlenir). JS'te ise closure sayesinde içteki fonksiyon dıştaki değişkeni referans alıyorsa, dıştaki fonksiyon bitse dahi o değişken garbage collector tarafından silinmez, yaşatılır.",
              en: "In Java, local stack variables are discarded the moment a method execution finishes. In JavaScript, closures protect captured variables from garbage collection as long as the inner function retains a reference to them."
            },
            keyPoints: [
              { tr: "Scope statiktir (kodun yazıldığı yere göre belirlenir)", en: "Scope is static, resolved during lexical compilation phase" },
              { tr: "Closure dinamiktir (çalışma zamanında belleği açık tutar)", en: "Closure is dynamic, keeping lexical variables alive at runtime" },
              { tr: "Tüm JavaScript fonksiyonları doğası gereği birer closure'dır", en: "Technically, all JavaScript functions carry closure capability" }
            ],
            tip: {
              tr: "Mülakatta scope ve closure farkı sorulduğunda: 'Scope kuralları sınırları tanımlar, closure ise bu sınırların içindeki değişkenleri referans yoluyla bellekte yaşatan bir köprüdür' şeklinde özetleyin.",
              en: "Summarize: 'Scope defines variable access rules at compile-time, while closure is the runtime bridge that keeps those variables alive in memory.'"
            }
          },
          {
            level: "intermediate",
            q: { tr: "Debounce ve Throttle teknikleri nedir? Aralarındaki temel fark nedir?", en: "What are Debounce and Throttle? What is the main difference?" },
            a: {
              tr: "İkisi de sık tetiklenen işlemlerin (Örn: pencere boyutunu değiştirme, klavyeden arama kutusuna yazma) performans sorunlarına yol açmasını önlemek için kullanılan kontrol teknikleridir. Debounce, işlem tetiklendikten sonra belirli bir süre sessizlik bekler; o süre dolmadan yeni bir tetikleme gelirse sayacı sıfırlar ve işlemi öteler. Throttle ise işlem ne kadar sık tetiklenirse tetiklensin, işlemi belirli zaman aralıklarında (Örn: her 200ms'de en fazla bir kez) sabit bir ritimle çalıştırır.",
              en: "Both are optimization techniques to limit the rate at least some functions are executed (e.g. window resizing, search box keypresses). Debounce delays the execution of a function until a certain amount of idle time has passed since the last call. Throttle ensures the function is called at most once in a specified time interval, pacing the execution rate."
            },
            analogy: {
              tr: "Java'da bir log kuyruğuna sürekli veri yazarken disk yazma yükünü azaltmak için Buffer mekanizması kullanmaya benzer. Debounce, yazmayı tamamen durunca tek seferde basmaya; Throttle ise saniyede bir kez diske yazmaya benzetilebilir.",
              en: "Similar to Java buffer write streams. Debouncing matches waiting for a pause to flush the buffer at once, while throttling matches flushing the buffer at a fixed rate of once per second."
            },
            keyPoints: [
              { tr: "Debounce: Tetiklenme durunca (bekleme süresi sonunda) çalışır", en: "Debounce: Triggers only after a period of inactivity" },
              { tr: "Throttle: Belirli periyotlarla (ritmik olarak) çalışır", en: "Throttle: Paces execution to trigger at regular time intervals" },
              { tr: "Performans ve ağ isteklerini optimize etmek için kullanılır", en: "Crucial for optimizing heavy DOM updates and API load rates" }
            ],
            tip: {
              tr: "Otomasyon testlerinizde dinamik arama kutularına (autocomplete) yazı yazarken sitenin debounce mekanizmasının çalışıp arama isteklerini doğru attığını doğrulamak için harf geçişleri arasına ufak bekleme süreleri koymalısınız.",
              en: "When testing autocomplete fields, remember that debounce delays require tests to wait briefly before asserting drop-down options."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'teki 'strict mode' etkinleştirildiğinde 'this' bağlamı nasıl etkilenir?", en: "How does 'strict mode' affect the 'this' context in JavaScript?" },
            a: {
              tr: "Normal (non-strict) modda, bir fonksiyon herhangi bir nesne bağlamı olmadan düz çağrıldığında (`fn()`), içindeki `this` varsayılan olarak global nesneyi (`window` veya `global`) gösterir. Ancak 'strict mode' aktif olduğunda, bu durum güvenlik sızıntılarını önlemek amacıyla engellenir ve global nesne yerine `this` değeri `undefined` olur.",
              en: "In non-strict mode, invoking a standalone function (`fn()`) binds its `this` context to the global object (`window` or `global`). When strict mode is enabled, this implicit binding is blocked to prevent accidental global pollutions, making `this` evaluate to `undefined` instead."
            },
            analogy: {
              tr: "Java'da bir static metodun veya sınıf dışı bağımsız bir fonksiyonun içinden sınıf nesnesi referansı (`this`) çağırmak kesinlikle yasaktır ve derleme hatası verir. JS strict mode da bu kuralı taklit ederek global nesneye kaçak erişimi engeller.",
              en: "In Java, using `this` inside static methods is a compilation error. JS strict mode emulates this rule by refusing to fallback to global object targets, preventing silent errors."
            },
            keyPoints: [
              { tr: "Strict mode altında global nesneye this bağlaması yapılmaz", en: "Strict mode prevents default binding of 'this' to the global object" },
              { tr: "Bağlamsız fonksiyon çağrılarında this undefined olur", en: "Unbound function calls evaluate 'this' to undefined" },
              { tr: "Güvenlik ve hata tespiti için kritik bir korumadır", en: "Critical for catching accidental global variable declarations" }
            ],
            tip: {
              tr: "Strict mode altında `this` undefined olacağı için, eğer fonksiyon içinde nesne alanlarına erişmeye çalışırsanız anında TypeError alırsınız. Bu sayede hataları erkenden yakalamış olursunuz.",
              en: "Under strict mode, accessing properties on unbound functions throws TypeError immediately, preventing silent data corruptions."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JSON nesnesi nedir? JavaScript nesnesi (Object) ile farkı nedir?", en: "What is the JSON object? How does it differ from a JavaScript object?" },
            a: {
              tr: "`JSON` (JavaScript Object Notation), verileri metin formatında taşımak için kullanılan dilden bağımsız standart bir formattır. JavaScript nesnesi (Object) ise JavaScript runtime'ında yaşayan canlı bir bellek yapısıdır. Farklar: JSON'da tüm anahtarlar (keys) çift tırnak `\"` içinde olmak zorundadır, fonksiyon veya undefined değerleri taşıyamaz. JavaScript nesnesinde ise anahtarlar tırnaksız olabilir, fonksiyonlar (metotlar) barındırabilir.",
              en: "JSON (JavaScript Object Notation) is a lightweight, language-independent text format for data exchange. A JS Object is a live, in-memory data structure. JSON requires double quotes around keys and string values, and cannot store functions, symbols, or undefined values, whereas JS Objects can hold methods and dynamic references."
            },
            analogy: {
              tr: "Java'daki POJO (Plain Old Java Object) ile bunun serialize edilmiş JSON metni (String) arasındaki fark neyse, JS nesnesi ile JSON string'i arasındaki fark da odur. Dönüşüm için `JSON.stringify()` (serialization) ve `JSON.parse()` (deserialization) kullanılır.",
              en: "The difference matches Java's POJO serialization to a JSON String. We use `JSON.stringify()` to serialize a JS object to a string, and `JSON.parse()` to deserialize a JSON string back into a live JS object."
            },
            keyPoints: [
              { tr: "JSON bir metin formatıdır; JS Object ise canlı bellek nesnesidir", en: "JSON is a serialization text format; JS Object is a memory structure" },
              { tr: "JSON.stringify() -> Nesneyi JSON string'ine çevirir", en: "JSON.stringify() converts JS object to JSON string" },
              { tr: "JSON.parse() -> JSON string'ini canlı nesneye çevirir", en: "JSON.parse() parses JSON string back into JS object" }
            ],
            tip: {
              tr: "API otomasyon testlerinizde request payload'ları oluştururken JavaScript nesnesi yazar, ardından bunu `JSON.stringify()` ile paketleyip HTTP body'sine eklersiniz. Rest-Assured'daki serialization adımları burada bu kadar basittir.",
              en: "In API tests, write payloads as clean JS objects and let your framework serialize them to JSON strings automatically."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te 'currying' nedir? Hangi amaçla kullanılır?", en: "What is currying in JavaScript? What is it used for?" },
            a: {
              tr: "Currying, birden fazla argüman alan bir fonksiyonu, her seferinde tek bir argüman alan ve geriye yeni bir fonksiyon döndüren zincirleme fonksiyonlar yapısına dönüştürme tekniğidir. Örnek: `topla(1, 2)` yerine `topla(1)(2)`. Bu teknik, fonksiyonlerin belirli parametrelerini sabitleyerek yeniden kullanılabilir alt fonksiyonlar (partial application) türetmek için kullanılır.",
              en: "Currying is a transformation technique that translates a function callable as `fn(a, b, c)` into a sequence of nested functions callable as `fn(a)(b)(c)`. It allows fixing some arguments of a function (partial application) to generate highly reusable specialized helper functions."
            },
            analogy: {
              tr: "Java'da currying doğrudan desteklenmez ancak benzer bir yapı Java 8 functional interface'leri birbiri içine yuvalayarak (`Function<Integer, Function<Integer, Integer>>`) kurulabilir; fakat yazımı çok ağırdır.",
              en: "In Java, currying is verbose, requiring nesting of functional interfaces (e.g. `Function<Integer, Function<Integer, Integer>>`). JS's first-class functions make implementing currying natural."
            },
            keyPoints: [
              { tr: "Argümanların kısmi uygulanmasını (partial application) sağlar", en: "Allows partial application of function arguments" },
              { tr: "Closure yeteneğini kullanarak parametreleri hafızada tutar", en: "Utilizes closures to retain parameter states across chains" },
              { tr: "Fonksiyonların yeniden kullanılabilirliğini (reusability) artırır", en: "Enhances helper modularity and functional composition" }
            ],
            tip: {
              tr: "Otomasyonda, belirli bir log seviyesini sabitleyip sürekli aynı etiketle log basan özel fonksiyonlar türetmek için currying yapısını kullanabilirsiniz: `const logError = log('ERROR'); logError('Hata oluştu');`.",
              en: "Use currying to pre-configure testing loggers (e.g. fixing the environment tag or log severity level beforehand)."
            }
          },
          {
            level: "intermediate",
            q: { tr: "JavaScript'te rest parametresi ile arguments nesnesi arasındaki fark nedir?", en: "What is the difference between the rest parameter and the arguments object?" },
            a: {
              tr: "İkisi de fonksiyona geçilen dinamik sayıdaki argümanlara erişmek için kullanılır. Farklar: 1. `arguments` nesnesi ES6 öncesinden gelen, diziye benzer (array-like) ama gerçek dizi metotlarına (map, filter) sahip olmayan hantal bir yapıdır; arrow function'larda bulunmaz. 2. Rest parametresi (`...args`) ise gerçek bir Array nesnesidir, modern standarttır, arrow function'larda çalışır ve sadece geriye kalan parametreleri yakalamak için fonksiyon imzasının sonuna yerleştirilebilir.",
              en: "Buy dynamic module loads conditionally in testing hooks to load massive test data JSON files or OS-specific drivers on demand. CommonJS require() is synchronous, whereas ESM imports can resolve statically or dynamically."
            },
            analogy: {
              tr: "Java'daki varargs (`String...`) doğrudan gerçek bir array gibi davranır. JS'teki rest parametresi de Java'daki varargs gibi temiz ve dizi metotlarıyla doğrudan uyumlu bir yapı sunar.",
              en: "Java's varargs acts as a standard array. JavaScript's Rest parameter mirrors this, providing a clean array wrapper compared to the legacy `arguments` object."
            },
            keyPoints: [
              { tr: "arguments: Array-like nesnedir, gerçek dizi metotları çalışmaz", en: "arguments: Array-like object, lacks native array methods" },
              { tr: "Rest (...args): Gerçek dizi döner, tüm array metotları mevcuttur", en: "Rest (...args): Yields a true array, enabling map/filter" },
              { tr: "Arrow function'lar'da arguments bulunmaz, rest kullanılmalıdır", en: "Arrow functions lack 'arguments'; Rest must be used" }
            ],
            tip: {
              tr: "Modern JavaScript standartlarında `arguments` kullanımı tamamen terk edilmiştir. Dinamik parametre alan tüm fonksiyonlarınızda sadece Rest (`...`) operatörünü kullanmalısınız.",
              en: "In modern JS development, the legacy `arguments` object is deprecated. Always use the Rest (`...`) parameter for variable arguments."
            }
          },

          // ==========================================
          // ADVANCED (15 questions)
          // ==========================================
          {
            level: "advanced",
            q: { tr: "V8 Engine (V8 Motoru) asenkron JavaScript kodunu nasıl derler ve optimize eder? (Ignition, TurboFan)", en: "How does the V8 Engine compile and optimize JavaScript code? (Ignition, TurboFan)" },
            a: {
              tr: "Google Chrome ve Node.js tarafından kullanılan V8, bir Just-In-Time (JIT) derleyicidir. Süreç şu şekilde işler: 1. Parser kodu okur ve Soyut Sözdizimi Ağacı (AST) üretir. 2. 'Ignition' adlı yorumlayıcı AST'yi alır ve hızlıca çalıştırılabilen Bytecode üretir. 3. Kod çalışırken 'TurboFan' adlı profil derleyicisi sıcak noktaları (hot code - sık çalışan fonksiyonlar) izler. Sık kullanılan ve tipi değişmeyen fonksiyonları doğrudan makine koduna (JIT) derleyerek ultra hızlı çalıştırır. Eğer değişken tipi aniden değişirse (deoptimization), optimize kodu çöpe atıp tekrar bytecode yorumlayıcısına geri döner (deopt).",
              en: "V8 (used in Chrome & Node) is a hybrid Just-In-Time (JIT) compiler. First, the parser generates an Abstract Syntax Tree (AST). Next, the interpreter 'Ignition' converts AST into Bytecode for fast startup. During execution, the optimizing compiler 'TurboFan' monitors 'hot' code paths (frequently run functions). If a function runs with stable types, TurboFan compiles it directly into optimized machine code. If a type changes dynamically later, V8 performs deoptimization, discarding machine code and falling back to bytecode."
            },
            analogy: {
              tr: "V8 motorundaki Ignition (yorumlayıcı) ve TurboFan (JIT) yapısı, Java Sanal Makinesindeki (JVM) bytecode yorumlama og C1/C2 JIT derleyici (HotSpot JVM) mimarisiyle neredeyse birebir aynıdır. İkisi de sık koşan kodu gözleyip runtime'da makine diline derler.",
              en: "V8's Ignition and TurboFan architecture is conceptually identical to the HotSpot JVM's interpreter and C1/C2 JIT compilers. Both profile execution at runtime to compile hot bytecode into native CPU instructions."
            },
            keyPoints: [
              { tr: "Ignition: AST'yi hızlıca bytecode'a çeviren interpreter", en: "Ignition: Fast startup interpreter translating AST to bytecode" },
              { tr: "TurboFan: Sıcak kod yollarını makine koduna derleyen JIT", en: "TurboFan: Profile-guided JIT compiler producing optimized machine code" },
              { tr: "Deoptimization: Değişken tipi değişirse optimize kod çöpe atılır", en: "Deoptimization: Triggers fallback to bytecode if types mutate dynamically" }
            ],
            tip: {
              tr: "V8 motorunun JIT optimizasyonunu (TurboFan) bozmamak için fonksiyonlarınıza gönderdiğiniz parametre tiplerinin kararlı (monomorphic) kalmasına dikkat edin; tipleri sürekli değiştirmek deopt tetikler ve kodu yavaşlatır.",
              en: "To keep V8 JIT optimizations active, ensure function parameters are monomorphic (same shapes/types). Changing parameter shapes forces deoptimization."
            }
          },
          {
            level: "advanced",
            q: { tr: "Event Loop microtask ve macrotask kuyrukları arasındaki fark nedir? Yürütme önceliği nasıldır?", en: "What is the difference between the microtask and macrotask queues in the Event Loop?" },
            a: {
              tr: "Asenkron callback'ler iki farklı kuyrukta yönetilir. 1. Macrotasks (Task Queue): `setTimeout`, `setInterval`, `setImmediate`, I/O işlemleri ve DOM eventleri. 2. Microtasks: `Promise.then/catch` callback'leri, `queueMicrotask` ve `process.nextTick` (Node.js). Yürütme Önceliği: Call Stack boşaldığında, Event Loop ÖNCE Microtask kuyruğundaki TÜM görevleri bitirir (kuyruğa yeni eklenenler dahil). Ancak Microtask kuyruğu tamamen sıfırlandıktan sonra tek bir Macrotask yürütülür ve süreç başa döner.",
              en: "Asynchronous callbacks are managed in two distinct queues. 1. Macrotasks: `setTimeout`, `setInterval`, I/O, UI rendering, and events. 2. Microtasks: `Promise.then/catch` callbacks, `queueMicrotask`, and `process.nextTick` (Node.js). Execution Order: Once the Call Stack is empty, the Event Loop executes ALL tasks in the Microtask queue (including those queued during execution). Only when the Microtask queue is completely exhausted does the Event Loop take the first single task from the Macrotask queue."
            },
            analogy: {
              tr: "Java'daki öncelikli kuyruk (PriorityQueue) mantığına benzetilebilir. Microtask'lar yüksek öncelikli VIP misafirler gibidir; dondurma kuyruğu boşaldığında tüm VIP misafirler (microtasks) servis almadan normal sıradaki tek bir kişiye (macrotask) sıra gelmez.",
              en: "Think of it as a VIP Priority Queue. Microtasks are high-priority VIP tickets. The Event Loop will serve all VIP queue requests (microtasks) before serving a single general admission ticket holder (macrotask)."
            },
            keyPoints: [
              { tr: "Microtask önceliklidir; Call Stack boşalınca tüm microtask'ler eriyecektir", en: "Microtasks have absolute priority; all pending microtasks must resolve before next macrotask" },
              { tr: "Promises = Microtask; setTimeout = Macrotask", en: "Promises produce Microtasks; setTimeout produces Macrotasks" },
              { tr: "Her bir macrotask'tan sonra tarayıcı render/paint adımı tetiklenebilir", en: "Browser rendering/painting runs after microtasks, before the next macrotask" }
            ],
            tip: {
              tr: "Mülakatta şu örneği verin: 'Bir loop içinde sürekli Promise çözüp microtask kuyruğunu beslerseniz, macrotask kuyruğundaki setTimeout asla çalışamaz ve sayfa donar.'",
              en: "Explain that endlessly chaining promises creates a microtask loop that starves macrotasks like `setTimeout`, causing UI freezes."
            }
          },
          {
            level: "advanced",
            q: { tr: "V8 Engine'de 'Hidden Classes' (Gizli Sınıflar) ve 'Inline Caching' (Satır İçi Önbellekleme) nedir? Performansı nasıl etkiler?", en: "What are Hidden Classes and Inline Caching in V8? How do they improve performance?" },
            a: {
              tr: "JavaScript dinamik bir dildir ve nesnelerin yapısı runtime'da değişebilir. V8, nesne özelliklerine (properties) hızlı erişmek için arka planda 'Hidden Classes' (veya Shape) yapısı oluşturur. İki nesne aynı sırada aynı alanlarla tanımlanırsa aynı gizli sınıfı paylaşırlar. 'Inline Caching' (IC) ise, bir fonksiyon içindeki nesne erişim konumlarını hafızaya alarak prototype aramalarını atlar. Nesne şekli değişirse (alan ekleme/çıkarma sırası farklıysa) gizli sınıf bağı bozulur (transition) ve IC devre dışı kalır, bu da performansı düşürür.",
              en: "JavaScript lacks compile-time classes, making property lookups slow. V8 resolves this by creating internal 'Hidden Classes' (also called shapes) at runtime. Objects sharing the same properties defined in the exact same order share the same hidden class shape. Inline Caching (IC) uses these shapes to shortcut property offset lookups, skipping prototype chain traversal. If property structures mutate dynamically, V8 splits the hidden class, destroying IC efficiency."
            },
            analogy: {
              tr: "Java'da nesnelerin bellekteki yerleşim planı sınıf (Class) yapısı sayesinde derleme zamanında bellidir; JVM offset adresini doğrudan bilir. V8 motorunun Hidden Classes mimarisi, Java'nın bu hızlı doğrudan bellek erişimi (field offset) avantajını dinamik JavaScript'e kazandırma simülasyonudur.",
              en: "In Java, object memory layouts are declared statically via classes, allowing the JVM to resolve property offsets instantly. V8's Hidden Classes simulate this compile-time memory offset lookup speed within a dynamic runtime environment."
            },
            keyPoints: [
              { tr: "Hidden Classes (Shapes) nesne yapısını V8'e tanıtır", en: "Hidden Classes map object shapes internally within V8 memory" },
              { tr: "Inline Caching offset adresini önbelleğe alıp lookup süresini sıfırlar", en: "Inline Caching stores property offsets to bypass prototype lookup overhead" },
              { tr: "Properties ekleme sırası değişirse yeni bir hidden class türetilir (yavaşlama)", en: "Adding properties in different orders creates mismatched shapes, hurting performance" }
            ],
            tip: {
              tr: "Performans kritik otomasyon script'lerinde nesnelerinizi her zaman aynı nesne yerleşim sırasıyla tanımlayın; alan ekleme sırasını değiştirmek megamorphic aramaya yol açar.",
              en: "Construct objects using uniform factories or exact property sequence templates to prevent V8 from triggering slow megamorphic fallback maps."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'te bellek sızıntıları (memory leaks) nasıl oluşur? V8 çöp toplayıcısı (garbage collector) nasıl çalışır?", en: "How do memory leaks occur in JavaScript? How does the V8 garbage collector work?" },
            a: {
              tr: "Bellek sızıntıları, artık ihtiyaç duyulmayan nesnelerin referanslarının serbest bırakılmaması nedeniyle oluşur. Yaygın nedenler: Global değişken sızıntıları, temizlenmeyen `setInterval` tanımları, silinmiş DOM elemanlarına referans tutan JS nesneleri ve hatalı closure kullanımları. V8 çöp toplayıcısı 'Mark-and-Sweep' (İşaretle ve Süpür) algoritmasını kullanır. Kök nesnelerden (root) başlayarak ulaşılamayan tüm nesneleri bellekten temizler. V8 bellek yönetimini genç (Scavenger) ve yaşlı (Mark-Sweep-Compact) nesne jenerasyonları olarak ikiye ayırır.",
              en: "Memory leaks occur when objects that are no longer needed retain active reference pointers. Common causes: accidental globals, unmanaged `setInterval` loops, detached DOM node references, and closure leakage. V8's Garbage Collector uses the 'Mark-and-Sweep' algorithm. It traverses memory from root nodes (global execution contexts), marking reached elements, and sweeps away unmarked, unreachable memory. It segments memory into Young (Scavenger) and Old generations."
            },
            analogy: {
              tr: "V8 GC jenerasyonel bellek yönetim modeli, Java HotSpot JVM garbage collector (Young/Old Generation, Mark-Sweep-Compact) yapısıyla birebir aynı teorilere dayanır. İkisi de kısa ömürlü nesneleri hızlı temizler, uzun ömürlüleri yaşlı nesne alanına taşır.",
              en: "V8's generational GC model is conceptually identical to the HotSpot JVM's garbage collection (Young/Old generations, compaction phases). Both assume the generational hypothesis: most objects die young."
            },
            keyPoints: [
              { tr: "Ulaşılamayan nesneler Mark-and-Sweep ile temizlenir", en: "Unreachable memory is identified and collected via Mark-and-Sweep" },
              { tr: "Accidental globals ve temizlenmeyen timer'lar sızıntı kaynağıdır", en: "Accidental globals and active timers are primary sources of leaks" },
              { tr: "Scavenger genç nesneleri milisaniyeler içinde hızlıca temizler", en: "The Scavenger sub-collector sweeps young generation nodes ultra-fast" }
            ],
            tip: {
              tr: "Otomasyon script'lerinizde event listener veya setInterval açtıysanız, testin sonunda `clearInterval` veya `removeEventListener` çağrısı yaparak sızıntıları engellemeyi alışkanlık edinin.",
              en: "Always clear timeouts and unsubscribe from event listeners in your test teardown hooks to avoid memory leaks during long CI test suite runs."
            }
          },
          {
            level: "advanced",
            q: { tr: "WeakMap/WeakSet nedir? Map/Set yapılarından farkları nelerdir?", en: "What are WeakMap/WeakSet? How do they differ from Map/Set?" },
            a: {
              tr: "Ana fark bellek yönetimi (garbage collection) ve anahtar tipleriyle ilgilidir. 1. `Map` ve `Set` içinde tutulan nesnelere olan referanslar güçlüdür (strong reference), nesne dışarıda silinse dahi Map içinde tutulduğu için bellekten temizlenmez. 2. `WeakMap` ve `WeakSet` ise zayıf referans (weak reference) tutar; anahtarlar sadece Object olmak zorundadır. Eğer bir anahtar nesneye dışarıda başka hiçbir referans kalmadıysa, garbage collector bu nesneyi WeakMap içinden otomatik olarak siler ve belleği temizler. Ayrıca WeakMap'ler iterable değildir.",
              en: "`Map` and `Set` hold strong references to their keys and values, preventing garbage collection even if all other external references are deleted. `WeakMap` and `WeakSet` hold weak references; keys must strictly be objects. If no other active references to a key object remain, V8's garbage collector automatically reclaims the memory and removes the entry from the WeakMap. WeakMaps are not iterable."
            },
            analogy: {
              tr: "Java'daki `WeakHashMap` nesnesi, JavaScript'teki `WeakMap` yapısının doğrudan karşılığıdır. Her iki dil yapısı da kullanılmayan nesne referanslarının zayıf bağlarla tutulup belleğin şişmesini önlemek için tasarlanmıştır.",
              en: "Java's `WeakHashMap` behaves exactly like JavaScript's `WeakMap`. Both are designed to hold metadata references weakly, permitting automatic garbage collection when objects are discarded externally."
            },
            keyPoints: [
              { tr: "WeakMap anahtarları sadece nesne (Object) olabilir", en: "WeakMap keys must strictly be objects, not primitives" },
              { tr: "Zayıf referanslar nesnenin GC tarafından temizlenmesini engellemez", en: "Weak references permit GC reclamation when all outer pointers disappear" },
              { tr: "WeakMap/WeakSet döngüyle dönülemez (iterable değildir)", en: "WeakMap and WeakSet are non-iterable and lack size properties" }
            ],
            tip: {
              tr: "Mülakatta: 'Önbellek (caching) mekanizmaları kurarken veya DOM nesnelerine özel metadata bağlarken, bellek sızıntılarını önlemek için Map yerine WeakMap tercih ederim' demek mükemmel bir yanıttır.",
              en: "Explain: 'I use WeakMap when attaching private metadata to DOM nodes or managing cache stores to prevent memory leaks if elements are removed from the DOM.'"
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'teki Stack ve Heap bellek yerleşimi nasıldır? Closure değişkenleri nerede saklanır?", en: "How are Stack and Heap memory allocated in JS? Where do closure variables live?" },
            a: {
              tr: "Normal şartlarda primitive değerler og fonksiyon çağrı çerçeveleri (execution contexts) Stack üzerinde hızlıca tahsis edilir; nesneler ve diziler ise dinamik olarak Heap'te saklanır. Ancak, bir fonksiyon içinden bir closure geriye döndürüldüğünde, closure'ın eriştiği dış kapsamdaki (lexical scope) yerel değişkenler Stack temizlendikten sonra da yaşamak zorundadır. Bu yüzden V8 motoru, closure tarafından yakalanan (captured) değişkenleri Stack yerine otomatik olarak Heap bellekte (Context nesnesi içinde) saklar.",
              en: "Typically, primitive values and call stack frames (execution contexts) are allocated on the Stack, while objects and arrays live on the Heap. However, when a function returns a closure, any variables captured by that closure must persist after the parent function's stack frame is popped. V8 detects this and allocates these captured variables in a heap-based 'Context' object instead of the local stack frame."
            },
            analogy: {
              tr: "Java'da lokal değişkenler kesinlikle Stack'tedir; metottan bir nesne dönse dahi lokal değişkenler yaşamaz. JVM nesneleri hep Heap'te oluşturur. JS motoru ise asenkron yapısı ve closure'lar nedeniyle gerektiğinde lokal değişkenleri sessizce Heap'e taşıyabilir (Escape Analysis).",
              en: "In Java, primitive local variables are strictly stored on the stack and discarded when the method exits. In JavaScript, due to closure escape requirements, V8 implicitly hoists stack variables to heap-allocated context scopes dynamically."
            },
            keyPoints: [
              { tr: "Primitive değerler ve frame'ler Stack'te durur", en: "Standard primitives and activation frames reside on the Stack" },
              { tr: "Nesneler Heap'te saklanır", en: "Objects and complex structures reside on the Heap" },
              { tr: "Closure tarafından yakalanan lokal değişkenler Heap'e taşınır (Context)", en: "Captured closure variables escape to heap-allocated Context scopes" }
            ],
            tip: {
              tr: "Mülakatta bu ayrımı vurgulamak, JS motorunun bellek düzeyindeki (memory allocation) çalışma prensiplerine hakim olduğunuzu net bir şekilde kanıtlar.",
              en: "Explaining that V8 moves captured stack variables to the Heap to support closures shows a profound understanding of runtime memory management."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript event loop aşamaları nelerdir? (timers, poll, check fazları)", en: "What are the phases of the JavaScript event loop? (timers, poll, check phases)" },
            a: {
              tr: "Node.js (libuv) ve tarayıcı event loop mimarisi belirli fazlardan oluşur ve sırayla döner. 1. Timers: `setTimeout` ve `setInterval` callback'leri çalıştırılır. 2. Pending Callbacks: Bazı sistem I/O gecikmeleri. 3. Idle, Prepare: İçsel sistem fazları. 4. Poll: Yeni I/O eventleri beklenir ve okunur. 5. Check: `setImmediate` callback'leri çalıştırılır. 6. Close Callbacks: Kapanış eventleri (Örn: `socket.on('close')`). Her faz geçişinde ve event loop her bir callback çalıştırdığında microtask kuyruğu kontrol edilip boşaltılır.",
              en: "The event loop (specifically in libuv/Node.js) runs in structured phases: 1. Timers: executes `setTimeout`/`setInterval` callbacks. 2. Pending Callbacks: executes deferred system I/O callbacks. 3. Idle, Prepare: internal engine tasks. 4. Poll: retrieves new I/O events. 5. Check: executes `setImmediate` callbacks. 6. Close Callbacks: executes socket closing events. Between each phase and after every callback execution, the event loop fully drains the microtask queue."
            },
            analogy: {
              tr: "Java'da iş parçacığı havuzları (ThreadPools) ve asenkron I/O kanalları (NIO) işletim sistemi düzeyindeki event loop (epoll, kqueue) yapılarını doğrudan yönetir. JS ise bu karmaşık kanal yapısını tek bir ana loop üzerinde fazlara bölerek yürütür.",
              en: "Java NIO implements operating system event loop structures (like epoll or kqueue) underneath. JavaScript exposes this event-driven loop structure as a single-threaded runtime lifecycle model."
            },
            keyPoints: [
              { tr: "Event loop belirli fazlar sırasıyla döner (libuv)", en: "The loop iterates through distinct, sequential phases" },
              { tr: "setImmediate check fazında, setTimeout ise timers fazında çalışır", en: "setImmediate runs in the 'check' phase; setTimeout runs in the 'timers' phase" },
              { tr: "Her faz arasında microtask kuyruğu mutlaka eritilir", en: "The microtask queue is fully drained at every phase transition boundary" }
            ],
            tip: {
              tr: "Mülakatta `setTimeout(fn, 0)` ile `setImmediate(fn)` arasındaki farkın, bu fonksiyonların event loop'un timers og check fazlarında farklı sıralarda çalıştırılması olduğunu açıklayın.",
              en: "Differentiate `setTimeout(fn, 0)` from `setImmediate(fn)` by pointing out that they execute in different phases of the event loop."
            }
          },
          {
            level: "advanced",
            q: { tr: "Proxy ve Reflect API nedir? Otomasyon testlerinde ne amaçla kullanılabilir?", en: "What are the Proxy and Reflect APIs? How can they be used in testing?" },
            a: {
              tr: "`Proxy`, bir nesnenin temel işlemlerini (okuma, yazma, arama) araya girerek (intercept) özelleştirmemizi sağlayan bir sarmalayıcı nesnedir. `Reflect` ise JavaScript nesne işlemlerini gerçekleştiren statik metotlar sunar ve Proxy trap'lerinin içinden orijinal davranışı çağırmak için kullanılır. Otomasyonda, sayfa nesnelerinin (Page Objects) çağrılarını izlemek (logging), dinamik locator sarmalayıcıları yazmak veya test datalarında geçersiz atamaları engellemek için mükemmel çözümler sunarlar.",
              en: "The `Proxy` object enables creating a wrapper for another object, intercepting and customizing fundamental operations like property lookups, assignments, and function invocations. `Reflect` is a built-in static object providing methods for interceptable JS operations, making it easy to forward intercepted actions to the target object. In testing, they are used to build dynamic locator proxies, mock APIs, and write diagnostic method loggers."
            },
            analogy: {
              tr: "Java'daki Dynamic Proxy (`java.lang.reflect.Proxy`) ve Reflection API (`java.lang.reflect.*`) yapıları, JavaScript'teki Proxy og Reflect API'lerinin doğrudan karşılığıdır. İkisi de çalışma zamanında nesne davranışlarını dinamik izlemek için kullanılır.",
              en: "Java's Dynamic Proxy (`java.lang.reflect.Proxy`) and Reflection API serve the exact same purpose. Both are used to intercept object behavior and inspect class metadata dynamically at runtime."
            },
            keyPoints: [
              { tr: "Proxy nesne çağrılarını yakalayan bir ara katmandır (trap)", en: "Proxy acts as an interception layer wrapping target objects" },
              { tr: "Reflect orijinal nesne metotlarını güvenle çalıştırmayı sağlar", en: "Reflect provides default object behaviors matching proxy traps" },
              { tr: "Java Reflection/Dynamic Proxy = JS Reflect/Proxy", en: "Java Reflection/Dynamic Proxy = JS Reflect/Proxy" }
            ],
            tip: {
              tr: "Mülakatta: 'Bir Page Object sınıfındaki tüm selector çağrılarını izleyip konsola otomatik log basan veya locator bulunamadığında custom hata fırlatan dinamik bir Proxy sarmalayıcısı yazdım' örneğini verin.",
              en: "Explain how you can use a Proxy wrapper to intercept selector lookups in Page Objects, automatically logging execution steps or injecting retry layers."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'teki async generator'lar ve Symbol.asyncIterator nedir? Hangi senaryolarda tercih edilir?", en: "What are async generators and Symbol.asyncIterator in JavaScript? When are they used?" },
            a: {
              tr: "Async generator'lar, `async function*` şeklinde tanımlanan ve `yield` kullanarak asenkron veri akışlarını parça parça (stream) üreten özel fonksiyonlardır. `Symbol.asyncIterator` ise bir nesneyi asenkron döngülerle (`for await...of`) gezilebilir hale getiren özel bir semboldür. Genellikle sayfalama (pagination) yapan API'lerden veri çekerken, tüm sayfaları belleğe tek seferde yüklemek yerine sayfa sayfa asenkron çekmek için kullanılır.",
              en: "Async generators (`async function*`) are special functions that return an asynchronous iterator, yielding values stream-style. `Symbol.asyncIterator` is a built-in symbol that defines the async iterator protocol for an object, enabling looping via `for await...of`. They are ideal for fetching paginated API results or reading large log streams step-by-step without overloading memory."
            },
            analogy: {
              tr: "Java'daki asenkron reactive stream (Flow API / Publisher-Subscriber) veya Iterator desenine benzer. JS generator'ları, asenkron veriyi çekerken belleği şişirmeden parça parça tüketme kolaylığı sunar.",
              en: "Analogous to Java's Reactive Streams (Flow API / Publisher-Subscriber model) or asynchronous iterators. Both facilitate backpressure-aware processing of paginated or streamed network data."
            },
            keyPoints: [
              { tr: "async function* asenkron veri akışı (stream) üretir", en: "async function* generates asynchronous streams of values" },
              { tr: "for await...of ile asenkron iterasyon gerçekleştirilir", en: "Allows iterating over async collections using for await...of" },
              { tr: "Büyük veri setlerini belleği doldurmadan parça parça işlemek için idealdir", en: "Optimizes memory usage when consuming paginated API data" }
            ],
            tip: {
              tr: "Test otomasyonunda, 100 sayfalık bir veritabanı veya log çıktısını test etmek için tüm veriyi tek seferde belleğe yüklemek yerine async generator ile sayfa sayfa çekerek verimli bellek yönetimi sağlarsınız.",
              en: "Explain that async generators prevent test runner out-of-memory errors by fetching large databases or logs page-by-page dynamically."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript V8 motorundaki 'Monomorphic, Polymorphic, Megamorphic' inline cache durumları nedir? Neden önemlidir?", en: "What are Monomorphic, Polymorphic, and Megamorphic inline caches in V8? Why do they matter?" },
            a: {
              tr: "V8 motoru Inline Caching (IC) ile nesne özelliklerine erişimi hızlandırır. Bu hızlandırma nesne tiplerine (shapes) göre 3 durum alır: 1. Monomorphic: Bir fonksiyon çağrı noktasında sadece TEK bir nesne şekli görüyorsa, V8 doğrudan adresi belleğe kilitler og maksimum hızda çalışır. 2. Polymorphic: Noktada 2 ile 4 arasında farklı nesne şekli görülüyorsa, V8 bunların offsetlerini listeler (hafif yavaşlama). 3. Megamorphic: Noktada 5 veya daha fazla farklı nesne şekli görülüyorsa, V8 önbelleği tamamen kapatır ve yavaş genel arama (global lookup) moduna geçer.",
              en: "Inline Caching (IC) optimization in V8 changes states based on the shapes observed at property lookup sites: 1. Monomorphic: If V8 sees exactly one object shape at a call site, it caches the offset directly (maximum optimization). 2. Polymorphic: If it observes 2 to 4 different shapes, it maintains a small shape table for lookups (minor overhead). 3. Megamorphic: If V8 encounters 5 or more distinct shapes, it disables inline caching, falling back to slow hash map lookups."
            },
            analogy: {
              tr: "Java JVM JIT derleyicisindeki monomorphic ve polymorphic virtual method table (vtable) dispatch optimizasyonlarıyla birebir aynı teoridir. JVM de metot çağrı noktalarında tek bir tip görüyorsa (monomorphic dispatch) inline çağrı yaparak optimize eder.",
              en: "This maps directly to JVM JIT optimization theories around monomorphic and polymorphic virtual method table (vtable) dispatching. JVM inline cache performance drops when method targets are highly polymorphic."
            },
            keyPoints: [
              { tr: "Monomorphic: Tek nesne şekli, maksimum V8 hız optimizasyonu", en: "Monomorphic: One shape, maximum V8 JIT performance" },
              { tr: "Polymorphic: 2-4 nesne şekli, hafif lookup tablosu yavaşlığı", en: "Polymorphic: 2-4 shapes, slight table lookup overhead" },
              { tr: "Megamorphic: 5+ nesne şekli, önbellekleme iptal edilir (en yavaş mod)", en: "Megamorphic: 5+ shapes, caching disabled, falls back to hash table" }
            ],
            tip: {
              tr: "Performans kritik otomasyon script'lerinde nesnelerinizi her zaman aynı nesne yerleşim sırasıyla tanımlayın; alan ekleme sırasını değiştirmek megamorphic aramaya yol açar.",
              en: "Construct objects using uniform factories or exact property sequence templates to prevent V8 from triggering slow megamorphic fallback maps."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript'te asenkron hata yönetimi (async error handling) yaparken sessizce yutulan hataları (unhandled rejections) nasıl yakalarız?", en: "How do you catch unhandled promise rejections in asynchronous JavaScript?" },
            a: {
              tr: "JavaScript'te `try/catch` blokları veya `.catch()` zinciriyle yakalanmayan asenkron Promise hataları 'Unhandled Promise Rejection' durumuna düşer ve sessizce yutulabilir. Bunları yakalamak için global dinleyiciler kurulur: 1. Tarayıcıda: `window.addEventListener('unhandledrejection', event => { ... })`. 2. Node.js ortamında ise: `process.on('unhandledRejection', (reason, promise) => { ... })` dinleyicisi eklenerek sistemin sessizce hata yutması engellenir ve çökmeler/loglar izlenir.",
              en: "Asynchronous Promise errors that are not handled using `try/catch` or `.catch()` chains become Unhandled Promise Rejections. If left unmanaged, they can swallow bugs. To catch them globally: 1. In browsers: register `window.addEventListener('unhandledrejection', callback)`. 2. In Node.js: listen via `process.on('unhandledRejection', callback)` to intercept unhandled failures, print logs, and trigger clean test suites teardowns."
            },
            analogy: {
              tr: "Java'da bir thread içinde fırlatılan ama yakalanmayan exception'ları yakalamak için `Thread.setDefaultUncaughtExceptionHandler()` dinleyicisi kurulur. JS'teki unhandledRejection dinleyici JVM'in bu genel hata yakalama yapısının asenkron dünyadaki karşılığıdır.",
              en: "In Java, unhandled thread exceptions are caught globally using `Thread.setDefaultUncaughtExceptionHandler()`. JS's unhandled rejection listener is the exact equivalent for asynchronous promise executions."
            },
            keyPoints: [
              { tr: "Yakalanmayan asenkron hatalar unhandled rejection yaratır", en: "Unhandled promise rejections are spawned by uncaught async promises" },
              { tr: "process.on('unhandledRejection') Node.js için küresel yakalayıcıdır", en: "process.on('unhandledRejection') provides global catch logs in Node" },
              { tr: "unhandledrejection event'i tarayıcılarda global dinleyici kurar", en: "unhandledrejection event enables global error tracking in browsers" }
            ],
            tip: {
              tr: "Test otomasyon suite'lerinde, testlerin sessizce geçmesini veya yarıda kalmasını önlemek için global asenkron hata dinleyicilerini kurup hataları test raporuna (reporter) doğrudan bağlarız.",
              en: "Configure unhandled rejection hooks in test setups to ensure unexpected background API failures correctly fail the active CI pipeline run."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript ES6 Class yapısı arka planda prototype'a nasıl derlenir?", en: "How does the ES6 Class syntax compile down to prototype objects under the hood?" },
            a: {
              tr: "ES6 `class` yapısı aslında yeni bir nesne modeli getirmez; prototip tabanlı kalıtımı (prototypal inheritance) daha okunaklı yazmamızı sağlayan sentaktik bir şekerdir. Bir `class Person` tanımlandığında, JavaScript motoru bunu geleneksel bir `function Person()` constructor yapısına çevirir. Sınıfın içindeki metotlar (`sayHello()`) ise nesnenin doğrudan kendi içine değil, `Person.prototype.sayHello` nesnesine eklenir. Sınıftaki `static` metotlar ise doğrudan constructor fonksiyonunun (`Person.staticMethod`) üzerine bağlanır.",
              en: "The ES6 `class` syntax is not a new object-oriented inheritance model; it is syntactic sugar over prototypal inheritance. When you declare `class Person`, the engine converts it into a standard `function Person()` constructor. Methods defined inside the class (like `sayHello()`) are mapped to `Person.prototype.sayHello` rather than copied onto instances. `static` methods are attached directly to the constructor function object (`Person.staticMethod`)."
            },
            analogy: {
              tr: "Java'da class yapısı JVM düzeyinde gerçek, katı bir tiptir ve her nesne sınıfın şablonundan türetilir. JS'te ise nesneler havadan türeyebilir; class syntax'ı Java geliştiricileri yabancılık çekmesin diye yazılmış prototip makyajıdır.",
              en: "In Java, classes are compile-time boundaries and JVM types. In JavaScript, classes are just visual decorators over runtime prototypal linkings, designed to look familiar to Java and OOP developers."
            },
            keyPoints: [
              { tr: "Sınıf metotları prototype nesnesine otomatik eklenir", en: "Class methods are automatically attached to the prototype object reference" },
              { tr: "Sınıf alanları (fields) constructor içinde nesneye atanır", en: "Properties are assigned directly to the object instance inside constructor calls" },
              { tr: "Static metotlar doğrudan constructor nesnesine bağlanır", en: "Static methods reside directly on the constructor function itself" }
            ],
            tip: {
              tr: "Babel gibi derleyiciler yardımıyla ES6 kodunun ES5'e nasıl derlendiğini incelemek class yapısının prototiplere nasıl dönüştüğünü görsel olarak anlamanın en iyi yoludur.",
              en: "Use Babel or TypeScript playgrounds to inspect ES5 compilation outputs, verifying that classes compile down to constructor functions."
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript modül yükleme mekanizması (Module Loading) statik ve dinamik olarak nasıl çalışır?", en: "How does JavaScript module loading work statically and dynamically?" },
            a: {
              tr: "Statik import (`import x from 'y'`) kodun en tepesinde yer almak zorundadır ve derleme/parse aşamasında (kod hiç çalışmadan önce) çözülür; bu sayede kullanılmayan kodlar elenir (tree-shaking). Dinamik import (`import('y')`) ise asenkron bir Promise döndürür, kodun herhangi bir yerinde (Örn: if/else bloğu içi, event listener içi) çalışma zamanında (runtime) modül yüklemeyi sağlar. Dinamik import, başlangıç yükleme süresini düşürmek ve modülleri ihtiyaç anında (lazy loading) yüklemek için kullanılır.",
              en: "Static imports (`import x from 'y'`) must be placed at the top-level of a module, resolved during compilation/parsing. This permits static analysis and tree-shaking optimizer runs. Dynamic imports (`import('y')`) return a Promise and resolve asynchronously at runtime, allowing modules to be loaded conditionally inside functions or events. Dynamic imports are key for lazy-loading to optimize initial load times."
            },
            analogy: {
              tr: "Java'da statik `import` derleme zamanı kontrolüdür. Dinamik import ise Java'daki `Class.forName(\"paket.Sınıf\")` dinamik sınıf yükleyicisine benzer; sınıfın çalışma zamanında asenkron veya dinamik olarak projeye dahil edilmesini sağlar.",
              en: "In Java, standard imports are resolved at compile time. Dynamic imports match the behavior of Java's runtime class loader: `Class.forName(\"pack.Class\")`, fetching and linking classes on the fly at runtime."
            },
            keyPoints: [
              { tr: "Statik import derleme aşamasında çözülür ve tree-shaking sağlar", en: "Static imports are resolved during compile pass, allowing tree-shaking" },
              { tr: "Dinamik import() asenkron Promise döner ve runtime'da çalışır", en: "Dynamic import() returns a Promise and executes asynchronously at runtime" },
              { tr: "Dinamik import performansı artırmak için lazy loading sağlar", en: "Dynamic imports support lazy-loading to reduce resource payloads" }
            ],
            tip: {
              tr: "Otomasyon projelerinde, sadece belirli test koşulları oluştuğunda ağır test verisi modüllerini veya platforma özel kütüphaneleri yüklemek için dinamik `import()` tercih edebilirsiniz.",
              en: "Use dynamic `import()` in testing hooks to load massive test data JSON files or OS-specific drivers conditionally on demand."
            }
          },
          {
            level: "advanced",
            q: { tr: "Playwright'ta `page.evaluate()` ve `page.exposeFunction()` ne zaman ve neden kullanılır?", en: "When and why do you use `page.evaluate()` and `page.exposeFunction()` in Playwright?" },
            a: {
              tr: "`page.evaluate()` Node.js test kodundan doğrudan tarayıcı ortamında JavaScript çalıştırmanızı sağlar. DOM manipülasyonu, özel JavaScript metriklerini okuma veya tarayıcı API'lerine erişim gerektiren durumlarda kullanılır. `page.exposeFunction()` ise tersine çalışır: Node.js tarafındaki bir fonksiyonu tarayıcıya açar; böylece tarayıcı içindeki JS kodu `window.myFunction()` ile Node.js tarafındaki callback'i tetikleyebilir. İki metot birlikte, tarayıcı ile test runner arasındaki köprüyü kurar.",
              en: "`page.evaluate()` executes a JavaScript function directly inside the browser context from Node.js test code. It is used for direct DOM manipulation, reading custom JS metrics, or accessing browser APIs not exposed in Playwright's API. `page.exposeFunction()` works in reverse: it exposes a Node.js function to the browser page, allowing in-browser JS to trigger callbacks via `window.myFunction()`. Together they bridge the browser and test runner."
            },
            analogy: {
              tr: "Java Selenium'da `((JavascriptExecutor) driver).executeScript(\"...\")` `page.evaluate()`'ın karşılığıdır. `exposeFunction` ise Selenium'da doğrudan karşılığı olmayan, sadece Playwright'a özgü güçlü bir köprü mekanizmasıdır.",
              en: "Java Selenium's `((JavascriptExecutor) driver).executeScript(\"...\")` is the equivalent of `page.evaluate()`. `exposeFunction` has no direct Selenium counterpart — it is a uniquely powerful Playwright bridge mechanism."
            },
            keyPoints: [
              { tr: "page.evaluate(): Node.js'ten tarayıcıya JS gönderir, sonucu serialize ederek döner", en: "page.evaluate(): Sends and runs JS inside browser from Node.js, returns serialized result" },
              { tr: "page.exposeFunction(): Tarayıcı içinden Node.js callback'i tetikler", en: "page.exposeFunction(): Lets in-browser JS trigger a Node.js callback" },
              { tr: "İkisi birden tarayıcı ↔ test runner köprüsü kurar", en: "Together they bridge the browser context with the test runner" }
            ],
            tip: {
              tr: "Mülakatta 'tarayıcı içinde localStorage'ı temizlemek için' veya 'custom event'ları test runner'a bildirmek için' pratik örnek vererek bu iki metodu birbirinden net ayırın.",
              en: "In interviews, give concrete examples: 'I use page.evaluate() to clear localStorage between tests' and 'page.exposeFunction() to capture custom browser events in my test assertions.'"
            }
          },
          {
            level: "advanced",
            q: { tr: "JavaScript Proxy nesnesi QA otomasyonunda nasıl kullanılabilir?", en: "How can the JavaScript Proxy object be used in QA automation?" },
            a: {
              tr: "JavaScript `Proxy` nesnesi, başka bir nesneye yapılan erişimleri (okuma, yazma, fonksiyon çağrısı) yakalamaya ve özelleştirmeye yarar. QA otomasyonunda üç pratik kullanım alanı öne çıkar: 1. **API mock'lama:** fetch/axios nesnelerini Proxy ile sararak gerçek API yerine sahte yanıtlar döndürebilirsiniz — ayrı mock sunucuya gerek kalmaz. 2. **Deep equality assertion:** Nesne property erişimlerini kayıt altına alan bir Proxy ile hangi alanlara assertion yazıldığını izleyebilirsiniz. 3. **Test data validation:** Test verinizi bir Proxy ile sararak izin verilmeyen alan erişimlerini otomatik olarak TypeError ile engelleyebilirsiniz.",
              en: "The JavaScript `Proxy` object intercepts and customizes operations (reads, writes, function calls) on a target object. In QA automation, three practical use cases stand out: 1. **API mocking:** Wrapping fetch/axios with a Proxy to return fake responses without a separate mock server. 2. **Assertion tracking:** A Proxy that logs every property access tells you which fields are actually covered by your assertions. 3. **Test data validation:** Wrapping test data in a Proxy to automatically throw TypeErrors on invalid or unintended property access."
            },
            analogy: {
              tr: "Java'da benzer kontrol mekanizmaları için AOP (Aspect-Oriented Programming) veya Reflection API kullanılır. JavaScript Proxy'si ise bunlara kıyasla çok daha hafif ve runtime'da dinamik olarak kurulabilir — derleme adımı gerektirmez.",
              en: "In Java, similar interception patterns require AOP (Aspect-Oriented Programming) frameworks or the Reflection API. JavaScript's Proxy achieves the same at runtime with zero setup overhead — no compilation step required."
            },
            keyPoints: [
              { tr: "Proxy: hedef nesneye yapılan tüm erişimleri get/set/apply trap'leriyle yakalar", en: "Proxy: intercepts all operations on a target via get/set/apply traps" },
              { tr: "API mock için fetch nesnesini Proxy ile sarabilirsiniz", en: "Can wrap the fetch object in a Proxy for zero-setup API mocking" },
              { tr: "Test verisi doğrulaması için property erişim denetimi sağlar", en: "Enables property access validation on test data objects" }
            ],
            tip: {
              tr: "Mülakatta 'Jest'in `jest.mock()` veya MSW gibi araçların arka planda benzer bir interception mekanizması kullandığını ve Proxy'nin bu kavramın ham JavaScript implementasyonu olduğunu' söyleyerek kavramı derinleştirin.",
              en: "Deepen your interview answer by noting that tools like `jest.mock()` and MSW use similar interception mechanisms internally, and Proxy is the raw JavaScript building block behind these abstractions."
            }
          }
        ]
      }
    ]
  }
];

export const javascriptData = {
  en: {
    hero: {
      title: "🟨 JavaScript",
      subtitle: "JavaScript for Modern Test Automation",
      intro: "Learn core JavaScript concepts tailored specifically for QA automation (Playwright, Cypress, Selenium) with Pixar-style visual play, interactive blocks, and 50 detailed interview questions with Java analogies."
    },
    tabs: [
      "🎯 Intro & Why",
      "📦 Installation",
      "📦 Variables & Operators",
      "📊 Data Types & Functions",
      "🔤 Strings & Numbers",
      "🍇 Array Methods",
      "🔁 Conditions & Loops",
      "🎡 Event Loop",
      "🧬 Promises & Closures",
      "🏛️ Classes, Modules & JSON",
      "🧪 QA Use Cases & DOM",
      "🌱 Ecosystem & Tools",
      "🐛 Errors & Debugging",
      "📡 DOM Events",
      "📅 Dates & Time",
      "🔍 RegExp",
      "🗂️ Set & Map",
      "🎮 Mini Games",
      "💼 Interview Q&A"
    ],
    sections: sections
  },
  tr: {
    hero: {
      title: "🟨 JavaScript",
      subtitle: "Modern Test Otomasyonu İçin JavaScript",
      intro: "QA otomasyonuna özel (Selenium, Playwright, Cypress) temel JavaScript kavramlarını Pixar tarzı görseller, interaktif lego blokları ve Java analojili 50 mülakat sorusuyla öğren."
    },
    tabs: [
      "🎯 Giriş & Neden",
      "📦 Kurulum",
      "📦 Değişkenler & Operatörler",
      "📊 Veri Tipleri & Fonksiyonlar",
      "🔤 String & Sayı & Matematik",
      "🍇 Array Metotları",
      "🔁 Karar Yapıları & Döngüler",
      "🎡 Event Loop",
      "🧬 Promises & Closures",
      "🏛️ Sınıflar, Modüller & JSON",
      "🧪 QA Kullanım & DOM",
      "🌱 Ekosistem & Araçlar",
      "🐛 Hatalar & Debugging",
      "📡 DOM Olayları",
      "📅 Tarih & Zaman",
      "🔍 RegExp",
      "🗂️ Set & Map",
      "🎮 Mini Oyunlar",
      "💼 Mülakat Soruları"
    ],
    sections: sections
  }
};

fillMissingCodeTrios(javascriptData, 'javascript')
